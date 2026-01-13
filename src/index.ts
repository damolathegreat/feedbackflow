import { Env, Feedback, FeedbackInput, SentimentResult, DashboardStats } from './types';
import { getDashboardHTML } from './dashboard';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Dashboard UI
      if (path === '/' || path === '/dashboard') {
        const html = getDashboardHTML();
        return new Response(html, {
          headers: { 'Content-Type': 'text/html' },
        });
      }

      // API Routes
      if (path.startsWith('/api/')) {
        const response = await handleAPI(path, request, env);
        // Add CORS headers to API responses
        const headers = new Headers(response.headers);
        Object.entries(corsHeaders).forEach(([key, value]) => {
          headers.set(key, value);
        });
        return new Response(response.body, {
          status: response.status,
          headers,
        });
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('Error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }
  },
};

async function handleAPI(path: string, request: Request, env: Env): Promise<Response> {
  const method = request.method;

  // GET /api/feedback - List all feedback
  if (path === '/api/feedback' && method === 'GET') {
    const url = new URL(request.url);
    const source = url.searchParams.get('source');
    const sentiment = url.searchParams.get('sentiment');
    const status = url.searchParams.get('status');
    const limit = parseInt(url.searchParams.get('limit') || '1000');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const theme = url.searchParams.get('theme');
    const priority = url.searchParams.get('priority');

    let query = `
      SELECT f.*, s.name as source_name, s.icon as source_icon
      FROM feedback f
      JOIN sources s ON f.source_id = s.id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (source) {
      query += ` AND s.name = ?`;
      params.push(source);
    }
    if (sentiment) {
      query += ` AND f.sentiment = ?`;
      params.push(sentiment);
    }
    if (status) {
      query += ` AND f.status = ?`;
      params.push(status);
    }
    if (priority) {
      query += ` AND f.priority = ?`;
      params.push(priority);
    }
    if (theme) {
      const themePatterns: Record<string, string[]> = {
        billing: ['%bill%', '%charge%', '%invoice%', '%pricing%', '%cost%'],
        documentation: ['%doc%', '%README%', '%tutorial%', '%guide%'],
        performance: ['%performance%', '%fast%', '%slow%', '%latency%', '%speed%'],
        features: ['%feature%', '%request%', '%add%', '%new%'],
        bugs: ['%bug%', '%issue%', '%error%', '%broke%', '%fix%'],
        security: ['%secur%', '%vulnerab%', '%auth%', '%compliance%', '%SOC2%', '%HIPAA%'],
      };
      const patterns = themePatterns[theme];
      if (patterns) {
        query += ` AND (${patterns.map(() => 'f.content LIKE ?').join(' OR ')})`;
        params.push(...patterns);
      } else if (theme === 'other') {
        const allPatterns = Object.values(themePatterns).flat();
        query += ` AND NOT (${allPatterns.map(() => 'f.content LIKE ?').join(' OR ')})`;
        params.push(...allPatterns);
      }
    }

    query += ` ORDER BY f.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const result = await env.DB.prepare(query).bind(...params).all<Feedback>();
    return Response.json({ data: result.results, success: true });
  }

  // POST /api/feedback - Create new feedback with sentiment analysis
  if (path === '/api/feedback' && method === 'POST') {
    const input: FeedbackInput = await request.json();

    // Get source ID
    const sourceResult = await env.DB.prepare(
      'SELECT id FROM sources WHERE name = ?'
    ).bind(input.source).first<{ id: number }>();

    if (!sourceResult) {
      return Response.json({ error: 'Invalid source' }, { status: 400 });
    }

    // Analyze sentiment using Workers AI
    const sentiment = await analyzeSentiment(env.AI, input.content);

    // Insert feedback
    const result = await env.DB.prepare(`
      INSERT INTO feedback (source_id, author, author_handle, content, sentiment, sentiment_score, external_id, external_url, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      sourceResult.id,
      input.author || null,
      input.author_handle || null,
      input.content,
      sentiment.sentiment,
      sentiment.score,
      input.external_id || null,
      input.external_url || null,
      input.metadata ? JSON.stringify(input.metadata) : null
    ).run();

    return Response.json({
      success: true,
      id: result.meta.last_row_id,
      sentiment,
    });
  }

  // PUT /api/feedback/:id - Update feedback status/priority
  const feedbackMatch = path.match(/^\/api\/feedback\/(\d+)$/);
  if (feedbackMatch && method === 'PUT') {
    const id = feedbackMatch[1];
    const updates: Partial<Feedback> = await request.json();

    const allowedFields = ['status', 'priority', 'category'];
    const setClauses: string[] = [];
    const values: unknown[] = [];

    for (const field of allowedFields) {
      if (field in updates) {
        setClauses.push(`${field} = ?`);
        values.push(updates[field as keyof Feedback]);
      }
    }

    if (setClauses.length === 0) {
      return Response.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    setClauses.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await env.DB.prepare(`
      UPDATE feedback SET ${setClauses.join(', ')} WHERE id = ?
    `).bind(...values).run();

    return Response.json({ success: true });
  }

  // DELETE /api/feedback/:id - Delete feedback
  if (feedbackMatch && method === 'DELETE') {
    const id = feedbackMatch[1];
    await env.DB.prepare('DELETE FROM feedback WHERE id = ?').bind(id).run();
    return Response.json({ success: true });
  }

  // GET /api/stats - Dashboard statistics
  if (path === '/api/stats' && method === 'GET') {
    const stats = await getDashboardStats(env.DB);
    return Response.json({ data: stats, success: true });
  }

  // GET /api/sources - List all sources
  if (path === '/api/sources' && method === 'GET') {
    const result = await env.DB.prepare('SELECT * FROM sources').all();
    return Response.json({ data: result.results, success: true });
  }

  // POST /api/analyze - Analyze text sentiment (utility endpoint)
  if (path === '/api/analyze' && method === 'POST') {
    const { text } = await request.json() as { text: string };
    const sentiment = await analyzeSentiment(env.AI, text);
    return Response.json({ data: sentiment, success: true });
  }

  return Response.json({ error: 'Not Found' }, { status: 404 });
}

async function analyzeSentiment(ai: Ai, text: string): Promise<SentimentResult> {
  try {
    const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: `You are a sentiment analysis assistant. Analyze the sentiment of the given text and respond with ONLY a JSON object in this exact format: {"sentiment": "positive" | "negative" | "neutral", "score": <number between 0 and 1>}. The score represents confidence. Do not include any other text.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const responseText = (response as { response: string }).response;
    const parsed = JSON.parse(responseText);

    return {
      sentiment: parsed.sentiment,
      score: parsed.score,
    };
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return { sentiment: 'neutral', score: 0.5 };
  }
}

async function getDashboardStats(db: D1Database): Promise<DashboardStats & { byTheme: Record<string, number>; byPriority: Record<string, number> }> {
  const [total, bySource, bySentiment, byStatus, byPriority, recent, byTheme] = await Promise.all([
    db.prepare('SELECT COUNT(*) as count FROM feedback').first<{ count: number }>(),
    db.prepare(`
      SELECT s.name, COUNT(f.id) as count
      FROM sources s
      LEFT JOIN feedback f ON s.id = f.source_id
      GROUP BY s.id
    `).all<{ name: string; count: number }>(),
    db.prepare(`
      SELECT sentiment, COUNT(*) as count
      FROM feedback
      WHERE sentiment IS NOT NULL
      GROUP BY sentiment
    `).all<{ sentiment: string; count: number }>(),
    db.prepare(`
      SELECT status, COUNT(*) as count
      FROM feedback
      GROUP BY status
    `).all<{ status: string; count: number }>(),
    db.prepare(`
      SELECT priority, COUNT(*) as count
      FROM feedback
      GROUP BY priority
    `).all<{ priority: string; count: number }>(),
    db.prepare(`
      SELECT COUNT(*) as count
      FROM feedback
      WHERE created_at > datetime('now', '-24 hours')
    `).first<{ count: number }>(),
    db.prepare(`
      SELECT
        CASE
          WHEN content LIKE '%bill%' OR content LIKE '%charge%' OR content LIKE '%invoice%' OR content LIKE '%pricing%' OR content LIKE '%cost%' THEN 'billing'
          WHEN content LIKE '%doc%' OR content LIKE '%README%' OR content LIKE '%tutorial%' OR content LIKE '%guide%' THEN 'documentation'
          WHEN content LIKE '%performance%' OR content LIKE '%fast%' OR content LIKE '%slow%' OR content LIKE '%latency%' OR content LIKE '%speed%' THEN 'performance'
          WHEN content LIKE '%feature%' OR content LIKE '%request%' OR content LIKE '%add%' OR content LIKE '%new%' THEN 'features'
          WHEN content LIKE '%bug%' OR content LIKE '%issue%' OR content LIKE '%error%' OR content LIKE '%broke%' OR content LIKE '%fix%' THEN 'bugs'
          WHEN content LIKE '%secur%' OR content LIKE '%vulnerab%' OR content LIKE '%auth%' OR content LIKE '%compliance%' OR content LIKE '%SOC2%' OR content LIKE '%HIPAA%' THEN 'security'
          ELSE 'other'
        END as theme,
        COUNT(*) as count
      FROM feedback
      GROUP BY theme
    `).all<{ theme: string; count: number }>(),
  ]);

  return {
    total: total?.count || 0,
    bySource: Object.fromEntries(bySource.results?.map(r => [r.name, r.count]) || []),
    bySentiment: Object.fromEntries(bySentiment.results?.map(r => [r.sentiment, r.count]) || []),
    byStatus: Object.fromEntries(byStatus.results?.map(r => [r.status, r.count]) || []),
    byPriority: Object.fromEntries(byPriority.results?.map(r => [r.priority, r.count]) || []),
    byTheme: Object.fromEntries(byTheme.results?.map(r => [r.theme, r.count]) || []),
    recentCount: recent?.count || 0,
  };
}
