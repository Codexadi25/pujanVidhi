export function renderAuthPage() {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PoojanVidhi Server Control Center | Backend Admin & Telemetry Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="https://poojanvidhi.web.app/images/mandala.svg">
  <style>
    /* ==========================================================================
       Strivers Server Architecture & Design System Tokens (Dark & Light Mode)
       ========================================================================== */
    :root, [data-theme="dark"] {
      --color-scheme: dark;
      --bg-base: #0a0f1d;
      --bg-surface: #0f172a;
      --bg-card: #131d33;
      --bg-card-hover: #192744;
      --bg-elevated: #18243e;
      --bg-subtle: rgba(255, 255, 255, 0.04);
      --bg-input: #0b1224;
      --bg-code: rgba(56, 189, 248, 0.12);

      --border-subtle: rgba(220, 227, 240, 0.08);
      --border-strong: rgba(220, 227, 240, 0.18);
      --border-focus: #3b5bff;

      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-faint: #64748b;
      --text-inverse: #0e1b3d;

      --accent: #3b5bff;
      --accent-hover: #2f4bff;
      --gold: #d9a852;
      --gold-light: #fbe2aa;
      --crimson: #7a1230;

      --emerald: #10b981;
      --emerald-bg: rgba(16, 185, 129, 0.14);
      --emerald-border: rgba(16, 185, 129, 0.32);
      --emerald-text: #34d399;

      --amber: #f59e0b;
      --amber-bg: rgba(245, 158, 11, 0.14);
      --amber-border: rgba(245, 158, 11, 0.32);
      --amber-text: #fbbf24;

      --danger: #ef4444;
      --danger-bg: rgba(239, 68, 68, 0.14);
      --danger-border: rgba(239, 68, 68, 0.32);
      --danger-text: #f87171;

      --info: #38bdf8;
      --info-bg: rgba(56, 189, 248, 0.14);
      --info-border: rgba(56, 189, 248, 0.32);
      --info-text: #7dd3fc;

      --font-main: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'IBM Plex Mono', monospace;
      --font-brand: 'Cinzel', serif;
    }

    [data-theme="light"] {
      --color-scheme: light;
      --bg-base: #f2f5fa;
      --bg-surface: #ffffff;
      --bg-card: #ffffff;
      --bg-card-hover: #f8fafc;
      --bg-elevated: #f8fafc;
      --bg-subtle: #f1f5f9;
      --bg-input: #ffffff;
      --bg-code: #eff6ff;

      --border-subtle: #e2e8f0;
      --border-strong: #cbd5e1;
      --border-focus: #2f4bff;

      --text-main: #0e1b3d;
      --text-muted: #46517a;
      --text-faint: #64748b;
      --text-inverse: #ffffff;

      --accent: #2f4bff;
      --accent-hover: #1f37e0;
      --gold: #b8860b;
      --gold-light: #855800;
      --crimson: #991b1b;

      --emerald: #059669;
      --emerald-bg: #e8f5e9;
      --emerald-border: #a7f3d0;
      --emerald-text: #065f46;

      --amber: #d97706;
      --amber-bg: #fef3c7;
      --amber-border: #fde68a;
      --amber-text: #92400e;

      --danger: #dc2626;
      --danger-bg: #fee2e2;
      --danger-border: #fecaca;
      --danger-text: #991b1b;

      --info: #0284c7;
      --info-bg: #e0f2fe;
      --info-border: #bae6fd;
      --info-text: #0369a1;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-base);
      color: var(--text-main);
      font-family: var(--font-main);
      min-height: 100vh;
      line-height: 1.5;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    /* Topbar Navigation (Exact Strivers Style) */
    .topbar {
      height: 64px;
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-subtle);
      padding: 0 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .topbar-left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .telemetry-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      padding: 5px 12px;
      border-radius: 99px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-muted);
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
    }
    .pulse-dot::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      opacity: 0.5;
      animation: pulseAnim 2s infinite;
    }
    .pulse-dot.green { background: #10b981; }
    .pulse-dot.green::after { border: 2px solid #10b981; }
    .pulse-dot.blue { background: #3b82f6; }
    .pulse-dot.blue::after { border: 2px solid #3b82f6; }
    .pulse-dot.purple { background: #a855f7; }
    .pulse-dot.purple::after { border: 2px solid #a855f7; }
    @keyframes pulseAnim {
      0% { transform: scale(0.9); opacity: 0.7; }
      50% { transform: scale(1.6); opacity: 0; }
      100% { transform: scale(0.9); opacity: 0.7; }
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    /* Strivers Theme Toggle Switcher */
    .theme-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-strong);
      padding: 5px 12px;
      border-radius: 99px;
      cursor: pointer;
      color: var(--text-main);
      font-size: 0.82rem;
      font-weight: 700;
      transition: all 0.2s;
    }
    .theme-toggle-btn:hover {
      background: var(--bg-card-hover);
      border-color: var(--accent);
    }
    .theme-toggle-slider {
      display: flex;
      align-items: center;
      color: var(--gold);
    }
    [data-theme="light"] .sun-icon { display: block; color: #d97706; }
    [data-theme="light"] .moon-icon { display: none; }
    [data-theme="dark"] .sun-icon { display: none; }
    [data-theme="dark"] .moon-icon { display: block; color: #60a5fa; }

    .server-time {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--text-muted);
      padding: 5px 10px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 7px 15px;
      border-radius: 6px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.15s;
      text-decoration: none;
    }
    .btn-sm { padding: 5px 10px; font-size: 0.78rem; }
    .btn-xs { padding: 3px 8px; font-size: 0.72rem; }
    .btn-primary { background: var(--accent); color: white; border-color: var(--accent); }
    .btn-primary:hover { background: var(--accent-hover); }
    .btn-secondary { background: var(--bg-elevated); color: var(--text-main); border-color: var(--border-strong); }
    .btn-secondary:hover { background: var(--bg-card-hover); }
    .btn-danger { background: var(--danger); color: white; }
    .btn-danger:hover { opacity: 0.9; }
    .btn-outline-danger { background: transparent; color: var(--danger-text); border-color: var(--danger-border); }
    .btn-outline-danger:hover { background: var(--danger-bg); }
    .btn-gold { background: var(--gold); color: #1e0907; font-weight: 800; }
    .btn-gold:hover { filter: brightness(1.1); }

    /* Layout: Sidebar + Main Content */
    .app-layout {
      display: flex;
      min-height: calc(100vh - 64px);
    }

    .sidebar {
      width: 275px;
      background: var(--bg-surface);
      border-right: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: sticky;
      top: 64px;
      height: calc(100vh - 64px);
      overflow-y: auto;
    }

    .brand {
      padding: 22px 20px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .brand-icon {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      background: linear-gradient(135deg, #7a1230, #2c0908);
      border: 1px solid rgba(217, 168, 82, 0.4);
      display: grid;
      place-items: center;
      color: #d9a852;
      font-size: 1.4rem;
    }
    .brand-text h1 {
      font-size: 1.15rem;
      font-weight: 800;
      font-family: var(--font-brand);
      letter-spacing: 0.5px;
      color: var(--text-main);
    }
    .badge-role {
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 1.2px;
      padding: 2px 7px;
      border-radius: 4px;
      background: var(--crimson);
      color: #ffd700;
      border: 1px solid rgba(217, 168, 82, 0.3);
      display: inline-block;
      margin-top: 2px;
    }

    .nav-menu {
      padding: 14px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 8px;
      color: var(--text-muted);
      font-size: 0.84rem;
      font-weight: 600;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s;
      text-decoration: none;
    }
    .nav-item:hover {
      background: var(--bg-card-hover);
      color: var(--text-main);
    }
    .nav-item.active {
      background: var(--bg-elevated);
      color: var(--accent);
      border-left: 3px solid var(--accent);
      font-weight: 700;
    }
    .nav-item svg { flex-shrink: 0; }
    .pill-highlight {
      margin-left: auto;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 99px;
      background: var(--emerald-bg);
      color: var(--emerald-text);
      border: 1px solid var(--emerald-border);
    }

    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .user-chip {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--accent);
      color: white;
      font-weight: 800;
      display: grid;
      place-items: center;
      font-size: 0.85rem;
    }
    .user-meta {
      overflow: hidden;
    }
    .user-email {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-main);
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .user-status {
      font-size: 0.72rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 5px;
    }

    /* Main Content Area */
    .content-area {
      flex: 1;
      padding: 28px 34px;
      overflow-y: auto;
    }
    .tab-pane {
      display: none;
      animation: fadeIn 0.2s ease forwards;
    }
    .tab-pane.active {
      display: block;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .pane-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .pane-header h2 {
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.01em;
    }
    .pane-header p {
      font-size: 0.88rem;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* KPI Cards */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 18px;
      margin-bottom: 24px;
    }
    .kpi-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: transform 0.15s, border-color 0.15s;
    }
    .kpi-card:hover {
      transform: translateY(-2px);
      border-color: var(--border-strong);
    }
    .kpi-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      font-size: 1.3rem;
      font-weight: 800;
      flex-shrink: 0;
    }
    .kpi-icon.emerald { background: var(--emerald-bg); color: var(--emerald-text); }
    .kpi-icon.blue { background: var(--info-bg); color: var(--info-text); }
    .kpi-icon.indigo { background: rgba(99, 102, 241, 0.14); color: #818cf8; }
    .kpi-icon.purple { background: rgba(168, 85, 247, 0.14); color: #c084fc; }
    .kpi-icon.amber { background: var(--amber-bg); color: var(--amber-text); }
    .kpi-content {
      display: flex;
      flex-direction: column;
    }
    .kpi-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .kpi-value {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--text-main);
      font-family: var(--font-mono);
      margin: 2px 0;
    }
    .kpi-sub {
      font-size: 0.72rem;
      color: var(--text-muted);
    }
    .kpi-sub.green { color: var(--emerald-text); font-weight: 700; }

    /* Cards & Grids */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 22px;
      margin-bottom: 24px;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .card-header h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-main);
    }
    .grid-2col {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
    }

    /* Telemetry List */
    .telemetry-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .telemetry-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-subtle);
      font-size: 0.86rem;
    }
    .telemetry-row span:first-child {
      color: var(--text-muted);
    }
    .telemetry-row span:last-child {
      font-family: var(--font-mono);
      font-weight: 600;
      color: var(--text-main);
    }

    /* Search & Filter Toolbar */
    .search-filter-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .input-control, .select-control {
      background: var(--bg-input);
      border: 1px solid var(--border-strong);
      color: var(--text-main);
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s;
    }
    .input-control:focus, .select-control:focus {
      border-color: var(--border-focus);
    }
    .input-control { min-width: 260px; }
    .select-control { cursor: pointer; }

    /* Tables */
    .table-responsive {
      overflow-x: auto;
      padding: 0 !important;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.85rem;
    }
    .data-table th {
      background: var(--bg-elevated);
      color: var(--text-muted);
      font-weight: 700;
      padding: 12px 18px;
      border-bottom: 1px solid var(--border-strong);
      text-transform: uppercase;
      font-size: 0.72rem;
      letter-spacing: 0.5px;
    }
    .data-table td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-main);
      vertical-align: middle;
    }
    .data-table tbody tr:hover {
      background: var(--bg-card-hover);
    }

    /* Badges & Pills */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .badge-success { background: var(--emerald-bg); color: var(--emerald-text); border: 1px solid var(--emerald-border); }
    .badge-danger { background: var(--danger-bg); color: var(--danger-text); border: 1px solid var(--danger-border); }
    .badge-warning { background: var(--amber-bg); color: var(--amber-text); border: 1px solid var(--amber-border); }
    .badge-info { background: var(--info-bg); color: var(--info-text); border: 1px solid var(--info-border); }
    .badge-secondary { background: var(--bg-elevated); color: var(--text-muted); border: 1px solid var(--border-strong); }

    .code-cell {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      background: var(--bg-code);
      color: var(--info-text);
      padding: 2px 7px;
      border-radius: 5px;
      display: inline-block;
    }
    .click-chip {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      padding: 3px 8px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      user-select: all;
    }
    .click-chip:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    /* Auth Screen Modal */
    .auth-overlay {
      position: fixed;
      inset: 0;
      background: rgba(10, 15, 29, 0.95);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .auth-card {
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      border-radius: 16px;
      padding: 36px 30px;
      max-width: 420px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .auth-card h2 {
      font-size: 1.4rem;
      font-weight: 800;
      font-family: var(--font-brand);
      color: var(--text-main);
      margin: 12px 0 6px;
    }
    .auth-card p {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 24px;
    }

    /* General Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 9990;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-backdrop.active { display: flex; }
    .modal-box {
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      border-radius: 14px;
      width: 100%;
      max-width: 540px;
      padding: 26px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      animation: modalPop 0.15s ease forwards;
    }
    @keyframes modalPop {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }
    .modal-header h3 { font-size: 1.15rem; font-weight: 800; }
    .modal-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.4rem;
      cursor: pointer;
    }
    .modal-close:hover { color: var(--text-main); }
    .form-group {
      margin-bottom: 16px;
      text-align: left;
    }
    .form-group label {
      display: block;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .form-group input, .form-group textarea, .form-group select {
      width: 100%;
      background: var(--bg-input);
      border: 1px solid var(--border-strong);
      color: var(--text-main);
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.88rem;
      font-family: inherit;
      outline: none;
    }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
      border-color: var(--border-focus);
    }

    /* Toast Notification */
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toast {
      background: var(--bg-surface);
      border: 1px solid var(--border-strong);
      color: var(--text-main);
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideIn 0.2s ease forwards;
    }
    @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    @media (max-width: 900px) {
      .app-layout { flex-direction: column; }
      .sidebar { width: 100%; height: auto; position: static; }
      .topbar { height: auto; padding: 12px 16px; flex-direction: column; gap: 12px; }
      .content-area { padding: 18px 16px; }
      .grid-2col { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- Auth Screen Overlay -->
  <div id="auth-overlay" class="auth-overlay" style="display: none;">
    <div class="auth-card">
      <div style="font-size: 2.4rem;">🕉️</div>
      <h2>PoojanVidhi Server</h2>
      <p>Secure Backend Administration & Investigation Hub</p>
      <form onsubmit="handleAuthSubmit(event)">
        <div class="form-group">
          <label>Admin Master Passkey</label>
          <input type="password" id="auth-input-key" placeholder="Enter master passkey..." required autofocus autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 11px;">
          Authenticate & Unlock Hub
        </button>
      </form>
      <div id="auth-error" style="color: var(--danger-text); font-size: 0.8rem; margin-top: 14px; display: none;"></div>
    </div>
  </div>

  <!-- Top Navigation Header (Exact Strivers Style) -->`;
}
