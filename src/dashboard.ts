export function getDashboardHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FeedbackFlow</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg-page: #f5f5f5;
      --bg-card: #ffffff;
      --text-primary: #1f2937;
      --text-secondary: #6b7280;
      --text-tertiary: #9ca3af;
      --border: #e5e7eb;
      --border-hover: #d1d5db;
      --blue: #3b82f6;
      --green: #10b981;
      --red: #ef4444;
      --orange: #f59e0b;
      --purple: #8b5cf6;
      --gray: #9ca3af;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-page);
      color: var(--text-primary);
      line-height: 1.5;
    }

    /* Header */
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: #ffffff;
      border-bottom: 1px solid var(--border);
      padding: 0 32px;
      display: flex;
      align-items: center;
      z-index: 100;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .logo-icon {
      width: 28px;
      height: 28px;
    }

    .btn-refresh {
      margin-left: auto;
      background: none;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 8px;
      cursor: pointer;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .btn-refresh:hover {
      background: #f9fafb;
      color: var(--text-primary);
      border-color: var(--border-hover);
    }

    .btn-refresh.refreshing svg {
      animation: spin 0.8s linear infinite;
    }

    /* Layout */
    .layout {
      display: flex;
      padding-top: 64px;
      min-height: 100vh;
    }

    /* Sidebar */
    .sidebar {
      position: fixed;
      top: 64px;
      left: 0;
      width: 260px;
      height: calc(100vh - 64px);
      background: #ffffff;
      border-right: 1px solid var(--border);
      padding: 20px;
      overflow-y: auto;
    }

    .filter-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      margin-bottom: 14px;
    }

    .filter-section {
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
    }

    .filter-section:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .filter-section-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .filter-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 3px 0;
      cursor: pointer;
      font-size: 14px;
      color: var(--text-primary);
    }

    .filter-option input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: var(--text-primary);
      border: 1px solid var(--border);
      border-radius: 3px;
      appearance: none;
      -webkit-appearance: none;
      background: white;
      position: relative;
      flex-shrink: 0;
    }

    .filter-option input[type="checkbox"]:checked {
      background: var(--text-primary);
      border-color: var(--text-primary);
    }

    .filter-option input[type="checkbox"]:checked::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 2px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .filter-count {
      margin-left: auto;
      font-size: 13px;
      color: var(--text-tertiary);
    }

    /* Main Content */
    .main-content {
      margin-left: 260px;
      flex: 1;
      padding: 32px;
      min-width: 0;
    }

    /* Cards */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 28px;
      margin-bottom: 24px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
    }

    .card-date {
      font-size: 13px;
      color: var(--text-secondary);
    }

    /* Chart Controls */
    .chart-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .chart-tab {
      padding: 6px 14px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-secondary);
      background: white;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .chart-tab:hover {
      border-color: var(--border-hover);
    }

    .chart-tab.active {
      background: var(--text-primary);
      color: white;
      border-color: var(--text-primary);
    }

    /* Chart */
    .chart-container {
      position: relative;
      height: 280px;
    }

    /* AI Triage Card */
    .ai-triage-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 28px 32px;
      margin-bottom: 24px;
    }

    .triage-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .triage-left {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
    }

    .triage-icon {
      width: 36px;
      height: 36px;
      background: var(--text-primary);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .triage-icon svg {
      width: 18px;
      height: 18px;
    }

    .triage-content {
      flex: 1;
    }

    .triage-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 2px;
    }

    .triage-description {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.4;
      margin: 0;
    }

    .triage-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .triage-stats {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .triage-stat {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--text-tertiary);
    }

    .triage-stat svg {
      width: 14px;
      height: 14px;
    }

    .run-triage-button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 9px 18px;
      background: var(--text-primary);
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .run-triage-button:hover {
      background: #374151;
    }

    .run-triage-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .run-triage-button svg {
      width: 14px;
      height: 14px;
    }

    .run-triage-button .spinner {
      width: 12px;
      height: 12px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Proposed Actions */
    .proposed-actions {
      display: none;
    }

    .proposed-actions.visible {
      display: block;
    }

    .actions-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 24px;
    }

    .action-card {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      background: #f9fafb;
      margin-bottom: 16px;
      transition: all 0.15s ease;
    }

    .action-card.approved {
      border-color: var(--green);
      background: #f0fdf4;
    }

    .action-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .action-icon {
      width: 20px;
      height: 20px;
    }

    .action-type {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
    }

    .action-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .action-desc {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
    }

    .btn-preview {
      padding: 8px 16px;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: white;
      color: var(--text-primary);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-preview:hover {
      background: #f9fafb;
    }

    .btn-approve {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      background: var(--text-primary);
      color: white;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-width: 90px;
      justify-content: center;
    }

    .btn-approve:hover {
      background: #374151;
    }

    .btn-approve.loading {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .btn-approve .approve-spinner {
      width: 12px;
      height: 12px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      display: none;
    }

    .btn-approve.loading .approve-spinner {
      display: block;
    }

    .btn-approve.approved {
      background: var(--green);
      cursor: default;
    }

    .approved-text {
      display: none;
      color: var(--green);
      font-size: 14px;
      font-weight: 500;
    }

    .action-card.approved .approved-text {
      display: block;
    }

    .action-card.approved .action-buttons {
      display: none;
    }

    /* Feedback Section */
    .feedback-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .feedback-title {
      font-size: 16px;
      font-weight: 600;
    }

    .feedback-showing {
      font-size: 13px;
      color: var(--text-secondary);
    }

    /* Feedback Cards - Clean Style */
    .feedback-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .feedback-card:hover {
      border-color: var(--border-hover);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    .feedback-card.expanded {
      border-color: var(--border-hover);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .feedback-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      text-transform: capitalize;
    }

    /* Source badges */
    .badge-twitter { background: #e0f2fe; color: #0369a1; }
    .badge-discord { background: #f3e8ff; color: #7e22ce; }
    .badge-github { background: #f3f4f6; color: #374151; }
    .badge-support { background: #ccfbf1; color: #0f766e; }
    .badge-email { background: #ffedd5; color: #c2410c; }

    /* Theme badge */
    .badge-theme { background: #e0e7ff; color: #4338ca; }

    /* Urgency badges */
    .badge-urgent, .badge-high { background: #fee2e2; color: #b91c1c; }
    .badge-normal { background: #fef3c7; color: #b45309; }
    .badge-low { background: #f3f4f6; color: #374151; }

    .feedback-content {
      font-size: 16px;
      color: var(--text-primary);
      line-height: 1.6;
      margin-top: 16px;
    }

    .feedback-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
    }

    .feedback-meta {
      font-size: 14px;
      color: var(--text-tertiary);
    }

    .feedback-link {
      font-size: 14px;
      color: var(--blue);
      text-decoration: none;
      transition: all 0.15s ease;
    }

    .feedback-link:hover {
      text-decoration: underline;
    }

    .feedback-expanded-content {
      display: none;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }

    .feedback-card.expanded .feedback-expanded-content {
      display: block;
    }

    .expanded-row {
      display: flex;
      gap: 24px;
      margin-bottom: 12px;
    }

    .expanded-item {
      flex: 1;
    }

    .expanded-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }

    .expanded-value {
      font-size: 14px;
      color: var(--text-primary);
    }

    /* Pagination */
    .pagination {
      display: flex;
      justify-content: center;
      gap: 6px;
      margin-top: 24px;
    }

    .page-btn {
      padding: 8px 16px;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: white;
      color: var(--text-primary);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .page-btn:hover {
      background: #f9fafb;
    }

    .page-btn.active {
      background: var(--text-primary);
      color: white;
      border-color: var(--text-primary);
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
    }

    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .modal {
      background: white;
      border-radius: 12px;
      width: 100%;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      margin: 20px;
      transform: scale(0.95);
      transition: transform 0.2s ease;
    }

    .modal-overlay.active .modal {
      transform: scale(1);
    }

    .modal-header {
      padding: 24px 32px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      font-size: 18px;
      font-weight: 600;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 24px;
      color: var(--text-tertiary);
      cursor: pointer;
      padding: 4px;
      line-height: 1;
    }

    .modal-close:hover {
      color: var(--text-primary);
    }

    .modal-body {
      padding: 32px;
    }

    .modal-field {
      margin-bottom: 20px;
    }

    .modal-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      margin-bottom: 6px;
    }

    .modal-value {
      font-size: 14px;
      color: var(--text-primary);
      padding: 12px;
      background: #f9fafb;
      border-radius: 6px;
    }

    .modal-value.message {
      white-space: pre-wrap;
      line-height: 1.6;
    }

    /* Loading State */
    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--border);
      border-top-color: var(--text-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-secondary);
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">
      <svg class="logo-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="6" fill="#1f2937"/>
        <path d="M7 14h14M14 7v14" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <circle cx="14" cy="14" r="4" stroke="white" stroke-width="2" fill="none"/>
      </svg>
      <span>FeedbackFlow</span>
    </div>
    <button class="btn-refresh" onclick="refreshData()" title="Refresh data">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
        <path d="M21 21v-5h-5"/>
      </svg>
    </button>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <div class="filter-title">FILTERS</div>

      <div class="filter-section">
        <div class="filter-section-title">Sentiment</div>
        <label class="filter-option" data-filter="sentiment" data-value="positive">
          <input type="checkbox" name="sentiment" value="positive">
          <span>Positive</span>
          <span class="filter-count" id="count-sentiment-positive">50</span>
        </label>
        <label class="filter-option" data-filter="sentiment" data-value="negative">
          <input type="checkbox" name="sentiment" value="negative">
          <span>Negative</span>
          <span class="filter-count" id="count-sentiment-negative">16</span>
        </label>
        <label class="filter-option" data-filter="sentiment" data-value="neutral">
          <input type="checkbox" name="sentiment" value="neutral">
          <span>Neutral</span>
          <span class="filter-count" id="count-sentiment-neutral">34</span>
        </label>
      </div>

      <div class="filter-section">
        <div class="filter-section-title">Theme</div>
        <label class="filter-option" data-filter="theme" data-value="features">
          <input type="checkbox" name="theme" value="features">
          <span>Features</span>
          <span class="filter-count" id="count-theme-features">21</span>
        </label>
        <label class="filter-option" data-filter="theme" data-value="other">
          <input type="checkbox" name="theme" value="other">
          <span>Other</span>
          <span class="filter-count" id="count-theme-other">32</span>
        </label>
        <label class="filter-option" data-filter="theme" data-value="documentation">
          <input type="checkbox" name="theme" value="documentation">
          <span>Documentation</span>
          <span class="filter-count" id="count-theme-documentation">14</span>
        </label>
        <label class="filter-option" data-filter="theme" data-value="billing">
          <input type="checkbox" name="theme" value="billing">
          <span>Billing</span>
          <span class="filter-count" id="count-theme-billing">10</span>
        </label>
        <label class="filter-option" data-filter="theme" data-value="bugs">
          <input type="checkbox" name="theme" value="bugs">
          <span>Bugs</span>
          <span class="filter-count" id="count-theme-bugs">9</span>
        </label>
        <label class="filter-option" data-filter="theme" data-value="performance">
          <input type="checkbox" name="theme" value="performance">
          <span>Performance</span>
          <span class="filter-count" id="count-theme-performance">8</span>
        </label>
        <label class="filter-option" data-filter="theme" data-value="security">
          <input type="checkbox" name="theme" value="security">
          <span>Security</span>
          <span class="filter-count" id="count-theme-security">6</span>
        </label>
      </div>

      <div class="filter-section">
        <div class="filter-section-title">Priority</div>
        <label class="filter-option" data-filter="priority" data-value="urgent">
          <input type="checkbox" name="priority" value="urgent">
          <span>Urgent</span>
          <span class="filter-count" id="count-priority-urgent">0</span>
        </label>
        <label class="filter-option" data-filter="priority" data-value="high">
          <input type="checkbox" name="priority" value="high">
          <span>High</span>
          <span class="filter-count" id="count-priority-high">0</span>
        </label>
        <label class="filter-option" data-filter="priority" data-value="normal">
          <input type="checkbox" name="priority" value="normal">
          <span>Normal</span>
          <span class="filter-count" id="count-priority-normal">0</span>
        </label>
        <label class="filter-option" data-filter="priority" data-value="low">
          <input type="checkbox" name="priority" value="low">
          <span>Low</span>
          <span class="filter-count" id="count-priority-low">0</span>
        </label>
      </div>
    </aside>

    <main class="main-content">
      <!-- 1. Recent Feedback (First) -->
      <div class="card">
        <div class="feedback-header">
          <h2 class="feedback-title">Recent Feedback</h2>
          <span class="feedback-showing" id="feedback-showing">Showing 1-6 of 100</span>
        </div>
        <div id="feedback-container">
          <div class="loading-container">
            <div class="loading-spinner"></div>
          </div>
        </div>
        <div class="pagination" id="pagination"></div>
      </div>

      <!-- 2. Themes Chart (Second) -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Themes Dashboard</h2>
          <span class="card-date" id="current-date">Sunday, January 12, 2026</span>
        </div>
        <div class="chart-controls">
          <button class="chart-tab active" data-view="theme">Theme</button>
          <button class="chart-tab" data-view="sentiment">Sentiment</button>
          <button class="chart-tab" data-view="priority">Priority</button>
        </div>
        <div class="chart-container">
          <canvas id="themesChart"></canvas>
        </div>
      </div>

      <!-- 3. AI Triage Assistant (Third) -->
      <div class="ai-triage-card">
        <div class="triage-header">
          <div class="triage-left">
            <div class="triage-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/>
              </svg>
            </div>
            <div class="triage-content">
              <h3 class="triage-title">AI Triage Assistant</h3>
              <p class="triage-description">Analyze urgent feedback and propose actions for Slack, GitHub, and Jira.</p>
            </div>
          </div>
          <div class="triage-right">
            <div class="triage-stats">
              <div class="triage-stat">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="8" cy="8" r="6"/>
                  <path d="M8 5V8L10 10"/>
                </svg>
                <span id="last-run-text">Never run</span>
              </div>
              <div class="triage-stat">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 8L7 11L12 5"/>
                </svg>
                <span id="actions-approved-text">0 approved</span>
              </div>
            </div>
            <button class="run-triage-button" id="btn-triage" onclick="runAITriage()">
              <span id="triage-text">Run Triage</span>
              <svg id="triage-arrow" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 3L11 8L6 13V3Z"/>
              </svg>
              <div class="spinner" id="triage-spinner" style="display: none;"></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Proposed Actions -->
      <div class="card proposed-actions" id="proposed-actions">
        <h3 class="actions-title">Proposed Actions (3)</h3>

        <div class="action-card" id="action-slack">
          <div class="action-header">
            <svg class="action-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#6b7280"/>
            </svg>
            <span class="action-type">Slack Message</span>
          </div>
          <h4 class="action-title">Urgent: Payment Gateway Issues</h4>
          <p class="action-desc">Multiple users reporting failed transactions in the last hour. Billing team attention required.</p>
          <div class="action-buttons">
            <button class="btn-preview" onclick="openPreview('slack')">Preview</button>
            <button class="btn-approve" onclick="approveAction('slack')"><span class="approve-spinner"></span><span>Approve</span></button>
          </div>
          <div class="approved-text">✓ Action approved and queued</div>
        </div>

        <div class="action-card" id="action-github">
          <div class="action-header">
            <svg class="action-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="#6b7280"/>
            </svg>
            <span class="action-type">GitHub Issue</span>
          </div>
          <h4 class="action-title">Bug: API Rate Limiting Not Working</h4>
          <p class="action-desc">Rate limiting middleware failing to enforce limits on /api/v2 endpoints. Priority: High</p>
          <div class="action-buttons">
            <button class="btn-preview" onclick="openPreview('github')">Preview</button>
            <button class="btn-approve" onclick="approveAction('github')"><span class="approve-spinner"></span><span>Approve</span></button>
          </div>
          <div class="approved-text">✓ Action approved and queued</div>
        </div>

        <div class="action-card" id="action-jira">
          <div class="action-header">
            <svg class="action-icon" viewBox="0 0 24 24" fill="none">
              <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005z" fill="#6b7280"/>
              <path d="M17.364 5.746H5.793a5.218 5.218 0 0 0 5.232 5.216h2.13v2.057a5.216 5.216 0 0 0 5.214 5.209V6.751a1.005 1.005 0 0 0-1.005-1.005z" fill="#6b7280" opacity="0.8"/>
              <path d="M23.157 0H11.586a5.218 5.218 0 0 0 5.233 5.215h2.129v2.058A5.216 5.216 0 0 0 24.162 12.5V1.005A1.005 1.005 0 0 0 23.157 0z" fill="#6b7280" opacity="0.6"/>
            </svg>
            <span class="action-type">Jira Ticket</span>
          </div>
          <h4 class="action-title">Feature Request: Bulk Export</h4>
          <p class="action-desc">15 users requested bulk data export functionality. Consider for Q2 roadmap.</p>
          <div class="action-buttons">
            <button class="btn-preview" onclick="openPreview('jira')">Preview</button>
            <button class="btn-approve" onclick="approveAction('jira')"><span class="approve-spinner"></span><span>Approve</span></button>
          </div>
          <div class="approved-text">✓ Action approved and queued</div>
        </div>
      </div>
    </main>
  </div>

  <!-- Preview Modal -->
  <div class="modal-overlay" id="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title" id="modal-title">Preview</h3>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body" id="modal-body"></div>
    </div>
  </div>

  <script>
    // State
    let allFeedback = [];
    let filteredFeedback = [];
    let stats = {};
    let currentPage = 1;
    const itemsPerPage = 6;
    let currentFilters = {
      sentiment: [],
      theme: [],
      priority: []
    };
    let expandedCardId = null;
    let currentChartView = 'theme';

    // Theme patterns for client-side classification
    const themePatterns = {
      billing: ['bill', 'charge', 'invoice', 'pricing', 'cost'],
      documentation: ['doc', 'readme', 'tutorial', 'guide'],
      performance: ['performance', 'fast', 'slow', 'latency', 'speed'],
      features: ['feature', 'request', 'add', 'new'],
      bugs: ['bug', 'issue', 'error', 'broke', 'fix'],
      security: ['secur', 'vulnerab', 'auth', 'compliance', 'soc2', 'hipaa']
    };

    // Initialize
    document.addEventListener('DOMContentLoaded', async () => {
      updateDate();
      await Promise.all([loadStats(), loadFeedback()]);
      setupFilters();
      setupChartTabs();
      initChart();
    });

    function updateDate() {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    }

    async function refreshData() {
      const btn = document.querySelector('.btn-refresh');
      btn.classList.add('refreshing');

      await Promise.all([loadStats(), loadFeedback()]);

      setTimeout(() => {
        btn.classList.remove('refreshing');
      }, 500);
    }

    async function loadStats() {
      try {
        const res = await fetch('/api/stats');
        const { data } = await res.json();
        stats = data;

        // Update filter counts
        document.getElementById('count-sentiment-positive').textContent = stats.bySentiment?.positive || 0;
        document.getElementById('count-sentiment-negative').textContent = stats.bySentiment?.negative || 0;
        document.getElementById('count-sentiment-neutral').textContent = stats.bySentiment?.neutral || 0;

        document.getElementById('count-theme-features').textContent = stats.byTheme?.features || 0;
        document.getElementById('count-theme-other').textContent = stats.byTheme?.other || 0;
        document.getElementById('count-theme-documentation').textContent = stats.byTheme?.documentation || 0;
        document.getElementById('count-theme-billing').textContent = stats.byTheme?.billing || 0;
        document.getElementById('count-theme-bugs').textContent = stats.byTheme?.bugs || 0;
        document.getElementById('count-theme-performance').textContent = stats.byTheme?.performance || 0;
        document.getElementById('count-theme-security').textContent = stats.byTheme?.security || 0;

        document.getElementById('count-priority-urgent').textContent = stats.byPriority?.urgent || 0;
        document.getElementById('count-priority-high').textContent = stats.byPriority?.high || 0;
        document.getElementById('count-priority-normal').textContent = stats.byPriority?.normal || 0;
        document.getElementById('count-priority-low').textContent = stats.byPriority?.low || 0;
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    }

    async function loadFeedback() {
      const container = document.getElementById('feedback-container');
      container.innerHTML = '<div class="loading-container"><div class="loading-spinner"></div></div>';

      try {
        const res = await fetch('/api/feedback');
        const { data } = await res.json();
        allFeedback = data || [];
        applyFilters();
      } catch (err) {
        console.error('Failed to load feedback:', err);
        container.innerHTML = '<div class="empty-state">Failed to load feedback</div>';
      }
    }

    function applyFilters() {
      filteredFeedback = allFeedback.filter(item => {
        if (currentFilters.sentiment.length > 0) {
          if (!currentFilters.sentiment.includes(item.sentiment)) return false;
        }
        if (currentFilters.theme.length > 0) {
          const itemTheme = classifyTheme(item.content);
          if (!currentFilters.theme.includes(itemTheme)) return false;
        }
        if (currentFilters.priority.length > 0) {
          if (!currentFilters.priority.includes(item.priority)) return false;
        }
        return true;
      });
      currentPage = 1;
      renderFeedback();
    }

    function classifyTheme(content) {
      const lowerContent = content.toLowerCase();
      for (const [theme, patterns] of Object.entries(themePatterns)) {
        if (patterns.some(p => lowerContent.includes(p))) {
          return theme;
        }
      }
      return 'other';
    }

    function renderFeedback() {
      const container = document.getElementById('feedback-container');
      const showingEl = document.getElementById('feedback-showing');
      const total = filteredFeedback.length;

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, total);
      const pageItems = filteredFeedback.slice(startIndex, endIndex);

      showingEl.textContent = total > 0
        ? \`Showing \${startIndex + 1}-\${endIndex} of \${total}\`
        : 'No items';

      if (pageItems.length === 0) {
        container.innerHTML = '<div class="empty-state">No feedback found</div>';
        renderPagination(0);
        return;
      }

      container.innerHTML = pageItems.map(item => {
        const theme = classifyTheme(item.content);
        const isExpanded = expandedCardId === item.id;

        return \`
          <div class="feedback-card \${isExpanded ? 'expanded' : ''}" data-id="\${item.id}" onclick="toggleCard(\${item.id})">
            <div class="feedback-badges">
              <span class="badge badge-\${item.source_name || 'email'}">\${item.source_name || 'Unknown'}</span>
              <span class="badge badge-theme">\${theme}</span>
              <span class="badge badge-\${item.priority || 'normal'}">\${item.priority || 'Normal'}</span>
            </div>
            <div class="feedback-content">\${escapeHtml(item.content)}</div>
            <div class="feedback-footer">
              <span class="feedback-meta">\${item.author || 'Anonymous'} · \${formatTime(item.created_at)}</span>
              \${item.external_url ? \`<a href="\${item.external_url}" target="_blank" class="feedback-link" onclick="event.stopPropagation()">View source →</a>\` : ''}
            </div>
            <div class="feedback-expanded-content">
              <div class="expanded-row">
                <div class="expanded-item">
                  <div class="expanded-label">Author Handle</div>
                  <div class="expanded-value">\${item.author_handle || 'N/A'}</div>
                </div>
                <div class="expanded-item">
                  <div class="expanded-label">Created</div>
                  <div class="expanded-value">\${new Date(item.created_at).toLocaleString()}</div>
                </div>
                <div class="expanded-item">
                  <div class="expanded-label">ID</div>
                  <div class="expanded-value">#\${item.id}</div>
                </div>
              </div>
            </div>
          </div>
        \`;
      }).join('');

      renderPagination(total);
    }

    function toggleCard(id) {
      expandedCardId = expandedCardId === id ? null : id;
      renderFeedback();
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.feedback-card') && expandedCardId !== null) {
        expandedCardId = null;
        renderFeedback();
      }
    });

    function renderPagination(total) {
      const totalPages = Math.ceil(total / itemsPerPage);
      const paginationEl = document.getElementById('pagination');

      if (totalPages <= 1) {
        paginationEl.innerHTML = '';
        return;
      }

      let html = '';
      const maxVisible = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);

      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      if (currentPage > 1) {
        html += \`<button class="page-btn" onclick="goToPage(\${currentPage - 1})">Prev</button>\`;
      }

      for (let i = startPage; i <= endPage; i++) {
        html += \`<button class="page-btn \${i === currentPage ? 'active' : ''}" onclick="goToPage(\${i})">\${i}</button>\`;
      }

      if (endPage < totalPages) {
        html += \`<span style="padding: 8px;">...</span>\`;
      }

      if (currentPage < totalPages) {
        html += \`<button class="page-btn" onclick="goToPage(\${currentPage + 1})">Next</button>\`;
      }

      paginationEl.innerHTML = html;
    }

    function goToPage(page) {
      currentPage = page;
      expandedCardId = null;
      renderFeedback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setupFilters() {
      document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          const filterType = e.target.closest('.filter-option').dataset.filter;
          const value = e.target.value;

          if (e.target.checked) {
            if (!currentFilters[filterType].includes(value)) {
              currentFilters[filterType].push(value);
            }
          } else {
            currentFilters[filterType] = currentFilters[filterType].filter(v => v !== value);
          }

          applyFilters();
        });
      });
    }

    function setupChartTabs() {
      document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          currentChartView = tab.dataset.view;
          updateChartData();
        });
      });
    }

    let chartInstance = null;

    function initChart() {
      const ctx = document.getElementById('themesChart').getContext('2d');

      const chartData = getChartData('theme');
      const maxValue = Math.max(...Object.values(chartData).map(d => d.final));
      const yMax = Math.ceil(maxValue / 5) * 5;

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
          datasets: Object.entries(chartData).map(([label, { final, color }]) => ({
            label: label.charAt(0).toUpperCase() + label.slice(1),
            data: generateCumulativeData(final),
            borderColor: color,
            backgroundColor: 'transparent',
            tension: 0.4,
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'rect',
                boxWidth: 8,
                boxHeight: 8,
                padding: 16,
                font: { size: 13, weight: '500' },
                color: '#6b7280'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: yMax,
              grid: { color: '#f3f4f6' },
              ticks: { font: { size: 12 }, color: '#6b7280' }
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 12 }, color: '#6b7280' }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
    }

    function getChartData(view) {
      if (view === 'theme') {
        return {
          features: { final: stats.byTheme?.features || 21, color: '#8b5cf6' },
          other: { final: stats.byTheme?.other || 32, color: '#9ca3af' },
          documentation: { final: stats.byTheme?.documentation || 14, color: '#10b981' },
          billing: { final: stats.byTheme?.billing || 10, color: '#3b82f6' },
          bugs: { final: stats.byTheme?.bugs || 9, color: '#ef4444' },
          performance: { final: stats.byTheme?.performance || 8, color: '#f59e0b' },
          security: { final: stats.byTheme?.security || 6, color: '#1e40af' }
        };
      } else if (view === 'sentiment') {
        return {
          positive: { final: stats.bySentiment?.positive || 50, color: '#10b981' },
          neutral: { final: stats.bySentiment?.neutral || 34, color: '#9ca3af' },
          negative: { final: stats.bySentiment?.negative || 16, color: '#ef4444' }
        };
      } else {
        return {
          normal: { final: stats.byPriority?.normal || 85, color: '#f59e0b' },
          high: { final: stats.byPriority?.high || 10, color: '#ef4444' },
          urgent: { final: stats.byPriority?.urgent || 5, color: '#dc2626' },
          low: { final: stats.byPriority?.low || 0, color: '#9ca3af' }
        };
      }
    }

    function updateChartData() {
      if (!chartInstance) return;

      const chartData = getChartData(currentChartView);
      const maxValue = Math.max(...Object.values(chartData).map(d => d.final));
      const yMax = Math.ceil(maxValue / 5) * 5;

      chartInstance.data.datasets = Object.entries(chartData).map(([label, { final, color }]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        data: generateCumulativeData(final),
        borderColor: color,
        backgroundColor: 'transparent',
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2
      }));

      chartInstance.options.scales.y.max = yMax;
      chartInstance.update();
    }

    function generateCumulativeData(final) {
      if (final === 0) return [0, 0, 0, 0, 0, 0];
      const points = [0];
      let remaining = final;
      for (let i = 1; i < 5; i++) {
        const add = Math.floor(remaining * (0.15 + Math.random() * 0.25));
        points.push(points[i-1] + add);
        remaining -= add;
      }
      points.push(final);
      return points;
    }

    // AI Triage
    let actionsApprovedToday = 0;

    function runAITriage() {
      const btn = document.getElementById('btn-triage');
      const text = document.getElementById('triage-text');
      const spinner = document.getElementById('triage-spinner');
      const arrow = document.getElementById('triage-arrow');

      btn.disabled = true;
      text.textContent = 'Analyzing...';
      spinner.style.display = 'block';
      arrow.style.display = 'none';

      setTimeout(() => {
        btn.disabled = false;
        text.textContent = 'Run Triage';
        spinner.style.display = 'none';
        arrow.style.display = 'block';
        document.getElementById('proposed-actions').classList.add('visible');
        document.getElementById('last-run-text').textContent = 'Just now';
      }, 2000);
    }

    function approveAction(actionId) {
      const card = document.getElementById('action-' + actionId);
      const btn = card.querySelector('.btn-approve');

      // Show loading state
      btn.classList.add('loading');
      btn.querySelector('span:last-child').textContent = 'Approving...';

      // Simulate API call
      setTimeout(() => {
        card.classList.add('approved');
        btn.classList.remove('loading');
        actionsApprovedToday++;
        document.getElementById('actions-approved-text').textContent = actionsApprovedToday + ' approved';
      }, 1500);
    }

    // Preview Modal
    const previewData = {
      slack: {
        title: 'Slack Message Preview',
        fields: [
          { label: 'Channel', value: '#billing-alerts' },
          { label: 'Recipients', value: '@billing-team' },
          { label: 'Priority', value: 'Urgent' },
          { label: 'Message', value: \`🚨 *Urgent: Payment Gateway Issues*

Multiple users are reporting failed transactions in the last hour.

*Summary:*
• 12 failed transaction reports in the past 60 minutes
• Affected regions: US-East, EU-West
• Error codes: PG-5001, PG-5003

*Action Required:*
Please investigate the payment gateway integration immediately.

*Related Feedback IDs:* #1234, #1235, #1238, #1241\`, isMessage: true }
        ]
      },
      github: {
        title: 'GitHub Issue Preview',
        fields: [
          { label: 'Repository', value: 'feedbackflow/api' },
          { label: 'Labels', value: 'bug, priority-high, middleware' },
          { label: 'Assignee', value: '@backend-team' },
          { label: 'Description', value: \`## Bug Report: API Rate Limiting Not Working

### Description
The rate limiting middleware is not properly enforcing limits on \\\`/api/v2\\\` endpoints.

### Steps to Reproduce
1. Make 100+ requests to \\\`/api/v2/feedback\\\` within 1 minute
2. Observe that no 429 responses are returned
3. Check rate limit headers - they show incorrect values

### Expected Behavior
Requests should be rate limited to 60/minute per API key.

### Actual Behavior
No rate limiting is being applied.

### Impact
- Potential for API abuse
- Increased infrastructure costs
- Risk of DoS attacks

### Related Feedback
- User reports: #789, #792, #795\`, isMessage: true }
        ]
      },
      jira: {
        title: 'Jira Ticket Preview',
        fields: [
          { label: 'Project', value: 'FEED' },
          { label: 'Issue Type', value: 'Feature Request' },
          { label: 'Priority', value: 'Medium' },
          { label: 'Epic', value: 'Q2 Roadmap - Data Management' },
          { label: 'Description', value: \`## Feature Request: Bulk Export Functionality

### Summary
15 users have requested the ability to bulk export feedback data in various formats.

### User Stories
- As an admin, I want to export all feedback to CSV so I can analyze it in Excel
- As a team lead, I want to export filtered feedback to share with stakeholders
- As a data analyst, I want to export to JSON for custom processing

### Requested Export Formats
1. CSV (most requested - 12 users)
2. JSON (5 users)
3. PDF reports (3 users)

### Acceptance Criteria
- [ ] Users can select date range for export
- [ ] Users can filter by sentiment, source, status before export
- [ ] Export includes all metadata fields
- [ ] Large exports are processed asynchronously with email notification

### Business Value
- Reduces support tickets for data access
- Enables self-service analytics
- Improves customer satisfaction\`, isMessage: true }
        ]
      }
    };

    function openPreview(type) {
      const data = previewData[type];
      const modal = document.getElementById('modal-overlay');
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-body').innerHTML = data.fields.map(f => \`
        <div class="modal-field">
          <div class="modal-label">\${f.label}</div>
          <div class="modal-value \${f.isMessage ? 'message' : ''}">\${escapeHtml(f.value)}</div>
        </div>
      \`).join('');
      modal.classList.add('active');
    }

    function closeModal() {
      document.getElementById('modal-overlay').classList.remove('active');
    }

    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function formatTime(dateStr) {
      const date = new Date(dateStr);
      const now = new Date();
      const diff = (now - date) / 1000;

      if (diff < 60) return 'Just now';
      if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
      if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
      if (diff < 604800) return Math.floor(diff / 86400) + 'd ago';
      return date.toLocaleDateString();
    }
  </script>
</body>
</html>`;
}
