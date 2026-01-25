FeedbackFlow is a centralized feedback management dashboard built on Cloudflare Workers and D1, created as part of the Cloudflare Product Manager internship assignment.

**Live Demo:** [feedbackflow.damola-feedback.workers.dev](https://feedbackflow.damola-feedback.workers.dev)

## Overview

FeedbackFlow helps product teams aggregate, analyze, and visualize customer feedback from multiple sources. Filter by sentiment, priority, and theme to quickly identify critical issues and make data-driven decisions.

### Key Features

- **Real-time Filtering** - Filter by sentiment (positive/neutral/negative), priority levels, and feedback themes
- **Visual Analytics** - Time-series charts showing feedback volume trends throughout the day
- **Fast Performance** - Sub-100ms query response times, deployed globally to 300+ edge locations
- **Serverless Architecture** - Zero infrastructure management, automatic scaling

## Architecture

FeedbackFlow uses Cloudflare's edge platform:

- **Runtime:** Cloudflare Workers (TypeScript)
- **Database:** Cloudflare D1 (serverless SQLite)
- **Frontend:** Vanilla JavaScript with Chart.js
- **Deployment:** Wrangler CLI

- ## Getting Started

### Prerequisites

- Node.js 16.17.0 or later
- npm or yarn
- Cloudflare account (free tier works)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/damolathegreat/feedbackflow.git
   cd feedbackflow
```

2. **Install dependencies**
```bash
   npm install
```

3. **Authenticate with Cloudflare**
```bash
   npx wrangler login
```

4. **Create D1 database**
```bash
   npx wrangler d1 create feedbackflow-db
```

5. **Update `wrangler.toml`**
   
   Copy the database ID from the output above and add to `wrangler.toml`:
```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "feedbackflow-db"
   database_id = "YOUR_DATABASE_ID_HERE"
```

6. **Set up database schema (local)**
```bash
   npx wrangler d1 execute feedbackflow-db --local --file=./schema.sql
   npx wrangler d1 execute feedbackflow-db --local --file=./seed.sql
```

7. **Run locally**
```bash
   npm run dev
```

   Visit `http://localhost:8787`

---

## Deployment

### Deploy to Production

1. **Set up production database**
```bash
   npx wrangler d1 execute feedbackflow-db --remote --file=./schema.sql
   npx wrangler d1 execute feedbackflow-db --remote --file=./seed.sql
```

2. **Deploy Worker**
```bash
   npm run deploy
```

3. **Access your live app**
```
   https://feedbackflow.YOUR_SUBDOMAIN.workers.dev
```

---

## 📊 Database Schema
```sql
CREATE TABLE Feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  content TEXT NOT NULL,
  sentiment TEXT CHECK(sentiment IN ('positive', 'negative', 'neutral')),
  priority TEXT CHECK(priority IN ('high', 'medium', 'low')),
  theme TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sentiment ON Feedback(sentiment);
CREATE INDEX idx_priority ON Feedback(priority);
CREATE INDEX idx_created_at ON Feedback(created_at);
```

---



└── README.md
```
Author

Damola Agboola
- GitHub: [@damolathegreat](https://github.com/damolathegreat)
- Twitter: [@damola](https://twitter.com/0xdamola)
- LinkedIn: [Damola Agboola](https://linkedin.com/in/damola-agboola)

Acknowledgments
- Built with [Cloudflare Workers](https://workers.cloudflare.com/)
- Database powered by [Cloudflare D1](https://developers.cloudflare.com/d1/)
- Charts by [Chart.js](https://www.chartjs.org/)
- Developed with assistance from [Claude Code](https://claude.ai/code)
