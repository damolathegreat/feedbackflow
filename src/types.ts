export interface Env {
  DB: D1Database;
  AI: Ai;
  ENVIRONMENT: string;
}

export interface Feedback {
  id: number;
  source_id: number;
  source_name?: string;
  source_icon?: string;
  author: string | null;
  author_handle: string | null;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral' | null;
  sentiment_score: number | null;
  category: string | null;
  status: 'new' | 'reviewed' | 'actioned' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  external_id: string | null;
  external_url: string | null;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

export interface Source {
  id: number;
  name: string;
  icon: string | null;
  created_at: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface FeedbackInput {
  source: string;
  author?: string;
  author_handle?: string;
  content: string;
  external_id?: string;
  external_url?: string;
  metadata?: Record<string, unknown>;
}

export interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}

export interface DashboardStats {
  total: number;
  bySource: Record<string, number>;
  bySentiment: Record<string, number>;
  byStatus: Record<string, number>;
  recentCount: number;
}
