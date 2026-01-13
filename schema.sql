-- Feedback sources table
CREATE TABLE IF NOT EXISTS sources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    icon TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default sources
INSERT OR IGNORE INTO sources (name, icon) VALUES
    ('twitter', '𝕏'),
    ('discord', '💬'),
    ('github', '🔧'),
    ('support', '🎧'),
    ('email', '✉️');

-- Main feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id INTEGER NOT NULL,
    author TEXT,
    author_handle TEXT,
    content TEXT NOT NULL,
    sentiment TEXT CHECK(sentiment IN ('positive', 'negative', 'neutral')),
    sentiment_score REAL,
    category TEXT,
    status TEXT DEFAULT 'new' CHECK(status IN ('new', 'reviewed', 'actioned', 'archived')),
    priority TEXT DEFAULT 'normal' CHECK(priority IN ('low', 'normal', 'high', 'urgent')),
    external_id TEXT,
    external_url TEXT,
    metadata TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_id) REFERENCES sources(id)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_feedback_source ON feedback(source_id);
CREATE INDEX IF NOT EXISTS idx_feedback_sentiment ON feedback(sentiment);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback(created_at DESC);

-- Tags table for categorization
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    color TEXT DEFAULT '#6b7280'
);

-- Feedback-tags junction table
CREATE TABLE IF NOT EXISTS feedback_tags (
    feedback_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (feedback_id, tag_id),
    FOREIGN KEY (feedback_id) REFERENCES feedback(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
