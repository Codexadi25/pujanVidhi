let React;
try {
  React = require('react');
} catch (e) {
  try {
    React = require('../../../../client/node_modules/react');
  } catch (e2) {
    React = {
      createElement: (type, props, ...children) => ({
        type,
        props: { ...props, children: children.flat() },
        children: children.flat()
      })
    };
  }
}
const h = React.createElement;

function AdminDashboardTemplate({ title = 'PoojanVidhi Server Control Center | Backend Admin & Telemetry Hub' }) {
  return h('html', { lang: 'en', 'data-theme': 'dark' },
    h('head', null,
      h('meta', { charSet: 'UTF-8' }),
      h('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      h('title', null, title),
      h('link', { rel: 'icon', type: 'image/jpeg', href: '/images/PoojanVidhi_Logo.jpeg' }),
      h('link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
      h('link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }),
      h('link', {
        href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        rel: 'stylesheet'
      }),
      h('link', { rel: 'stylesheet', href: '/css/admin.css' }),
      h('script', {
        dangerouslySetInnerHTML: {
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('poojanvidhi_admin_theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })();
          `
        }
      })
    ),
    h('body', {
      dangerouslySetInnerHTML: {
        __html: `</head>
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

  <!-- Top Navigation Header (Exact Strivers Style) -->
  <header class="topbar">
    <div class="topbar-left">
      <span class="telemetry-pill">
        <span class="pulse-dot green"></span>
        <strong>Server Port:</strong> <span id="topbar-port">10000 (Express)</span>
      </span>
      <span class="telemetry-pill">
        <span class="pulse-dot blue"></span>
        <strong>Database:</strong> <span id="topbar-mongo">Atlas Connected</span>
      </span>
      <span class="telemetry-pill">
        <span class="pulse-dot purple"></span>
        <strong>Gateway:</strong> <span id="topbar-razorpay">Razorpay Live</span>
      </span>
    </div>

    <div class="topbar-right">
      <!-- Light / Dark Mode Toggle Switcher -->
      <button id="theme-toggle-btn" class="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Theme (Light / Dark)">
        <span class="theme-toggle-slider">
          <svg class="sun-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="moon-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </span>
        <span class="theme-label-text" id="theme-mode-label">Dark</span>
      </button>

      <button class="btn btn-secondary btn-sm" onclick="syncLiveData()" title="Sync live MongoDB and gateway data">
        <svg id="sync-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        <span>Sync Live Data</span>
      </button>

      <span class="server-time" id="server-clock">--:--:--</span>

      <button class="btn btn-secondary btn-sm" onclick="openPasswordModal()" title="Update MongoDB Admin Password">
        🔑 Passkey
      </button>

      <button class="btn btn-outline-danger btn-sm" onclick="handleLogout()" title="Logout from Control Center">
        Logout
      </button>
    </div>
  </header>

  <!-- App Body Layout -->
  <div class="app-layout">
    
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-icon">🕉️</div>
        <div class="brand-text">
          <h1>PoojanVidhi</h1>
          <span class="badge-role">SERVER CONTROL</span>
        </div>
      </div>

      <nav class="nav-menu">
        <button class="nav-item active" data-tab="telemetry" onclick="switchTab('telemetry')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>System Telemetry</span>
          <span class="pill-highlight">LIVE</span>
        </button>

        <button class="nav-item" data-tab="orders" onclick="switchTab('orders')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span>Orders & Payments</span>
        </button>

        <button class="nav-item" data-tab="lifeline" onclick="switchTab('lifeline')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          <span>Lifeline Hub</span>
          <span class="pill-highlight" style="background: rgba(16, 185, 129, 0.2); color: var(--emerald-text);">REACT</span>
        </button>

        <button class="nav-item" data-tab="tickets" onclick="switchTab('tickets')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <span>PG Failure & Tickets</span>
          <span class="pill-highlight" style="background: var(--amber-bg); color: var(--amber-text);">DISPUTES</span>
        </button>

        <button class="nav-item" data-tab="refunds" onclick="switchTab('refunds')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          <span>Refunds Console</span>
        </button>

        <button class="nav-item" data-tab="logs" onclick="switchTab('logs')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span>Audit & Security Logs</span>
        </button>

        <button class="nav-item" data-tab="pricing" onclick="switchTab('pricing')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <span>Pricing & Products</span>
        </button>

        <button class="nav-item" data-tab="settings" onclick="switchTab('settings')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Support & Grievance</span>
        </button>

        <button class="nav-item" data-tab="users" onclick="switchTab('users')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Devotee Access</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="user-chip">
          <div class="user-avatar" id="admin-avatar">AD</div>
          <div class="user-meta">
            <span class="user-email" id="sidebar-admin-email">admin@poojanvidhi.com</span>
            <span class="user-status"><span class="pulse-dot green"></span> Live Root Admin</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area with 8 Panels -->
    <main class="content-area">

      <!-- PANEL 1: System Telemetry & Platform Overview -->
      <section id="tab-telemetry" class="tab-pane active">
        <div class="pane-header">
          <div>
            <h2>System Telemetry & Platform Overview</h2>
            <p>Real-time server metrics, database connection health, revenue, and active subscriptions.</p>
          </div>
          <a href="/lifeline" target="_blank" class="btn btn-secondary btn-sm">
            <span>⚡ Open SSR Lifeline View</span>
          </a>
        </div>

        <!-- KPI Grid -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon emerald">₹</div>
            <div class="kpi-content">
              <span class="kpi-label">Total Revenue</span>
              <span class="kpi-value" id="kpi-revenue">₹0</span>
              <span class="kpi-sub green">Captured in production</span>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon blue">💳</div>
            <div class="kpi-content">
              <span class="kpi-label">Captured Payments</span>
              <span class="kpi-value" id="kpi-transactions">0</span>
              <span class="kpi-sub">Verified Razorpay transactions</span>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon indigo">👥</div>
            <div class="kpi-content">
              <span class="kpi-label">Active Devotees</span>
              <span class="kpi-value" id="kpi-devotees">0</span>
              <span class="kpi-sub">Unlocked sacred Vidhi access</span>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon amber">🎫</div>
            <div class="kpi-content">
              <span class="kpi-label">Open PG Tickets</span>
              <span class="kpi-value" id="kpi-tickets">0</span>
              <span class="kpi-sub">Payment disputes & SLA timer</span>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-icon purple">🛡️</div>
            <div class="kpi-content">
              <span class="kpi-label">Audit Logs</span>
              <span class="kpi-value" id="kpi-logs">0</span>
              <span class="kpi-sub">Forensic events recorded</span>
            </div>
          </div>
        </div>

        <!-- 2 Column Diagnostics -->
        <div class="grid-2col">
          <div class="card">
            <div class="card-header">
              <h3>Server Runtime Diagnostics</h3>
            </div>
            <div class="telemetry-list" id="server-telemetry-list">
              <div class="telemetry-row"><span>Node Version:</span><span id="tel-node">--</span></div>
              <div class="telemetry-row"><span>Server Port:</span><span id="tel-port">--</span></div>
              <div class="telemetry-row"><span>Process Uptime:</span><span id="tel-uptime">--</span></div>
              <div class="telemetry-row"><span>Memory RSS:</span><span id="tel-mem-rss">--</span></div>
              <div class="telemetry-row"><span>Memory Heap Used:</span><span id="tel-mem-heap">--</span></div>
              <div class="telemetry-row"><span>Host Platform:</span><span id="tel-platform">--</span></div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3>Gateway & Database Status</h3>
            </div>
            <div class="telemetry-list" id="gateway-telemetry-list">
              <div class="telemetry-row"><span>MongoDB Atlas:</span><span id="tel-mongo-status">Connected</span></div>
              <div class="telemetry-row"><span>Database Name:</span><span id="tel-db-name">pujanVidhi</span></div>
              <div class="telemetry-row"><span>Payment Gateway:</span><span>Razorpay Standard PG</span></div>
              <div class="telemetry-row"><span>Key ID Masked:</span><span id="tel-key-id">rzp_live_••••••</span></div>
              <div class="telemetry-row"><span>Webhook Route:</span><span>/api/v1/webhook/razorpay</span></div>
              <div class="telemetry-row"><span>SSL / TLS Encryption:</span><span style="color: var(--emerald-text);">Active & Verified</span></div>
            </div>
          </div>
        </div>

        <!-- Recent System Activities Stream -->
        <div class="card">
          <div class="card-header">
            <h3>Recent System Activities</h3>
            <span class="text-muted" style="font-size: 0.8rem;">Live forensic stream</span>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>User / Email</th>
                  <th>Client IP</th>
                  <th>Timestamp</th>
                  <th>Metadata</th>
                </tr>
              </thead>
              <tbody id="telemetry-activities-tbody">
                <tr><td colspan="5" class="text-center">Loading live activity stream...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- PANEL 2: Orders & Payment Transactions -->
      <section id="tab-orders" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Orders & Payment Transactions</h2>
            <p>Real-time Razorpay ledger tracking captured, failed, and refunded puja kit orders.</p>
          </div>
        </div>

        <div class="search-filter-bar">
          <input type="text" id="orders-search" class="input-control" placeholder="Search Order ID, Payment ID, Email, Kalyanam ID..." oninput="debounceOrders()">
          <select id="orders-status-filter" class="select-control" onchange="loadOrders()">
            <option value="all">All Payment Statuses</option>
            <option value="captured">Captured (Success)</option>
            <option value="failed">Failed / Dropped</option>
            <option value="refunded">Refunded</option>
            <option value="created">Created (Incomplete)</option>
          </select>
        </div>

        <div class="card table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Payment ID</th>
                <th>Devotee Name</th>
                <th>Kalyanam ID</th>
                <th>Amount</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="orders-tbody">
              <tr><td colspan="9" class="text-center">Loading transactions ledger...</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PANEL 3: Lifeline Template & Investigation Engine -->
      <section id="tab-lifeline" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Lifeline Template & Investigation Engine</h2>
            <p>Diagnostic search engine to investigate failed payments, network aborts, and devotee access state.</p>
          </div>
          <a href="/lifeline" target="_blank" class="btn btn-secondary btn-sm">
            <span>⚡ Open Dedicated SSR Lifeline Template</span>
          </a>
        </div>

        <div class="card" style="background: var(--bg-card); padding: 24px; border-left: 4px solid var(--accent);">
          <div style="font-size: 0.95rem; font-weight: 700; margin-bottom: 8px;">Quick Diagnostic Query</div>
          <div style="display: flex; gap: 10px;">
            <input type="text" id="inline-lifeline-input" class="input-control" style="flex: 1;" placeholder="Enter Order ID (order_xxx), Payment ID, Devotee Email, Phone or Kalyanam ID (KLYxxx)..." onkeydown="if(event.key==='Enter') runInlineInvestigation()">
            <button class="btn btn-primary" onclick="runInlineInvestigation()">🔍 Run Diagnostic</button>
          </div>
        </div>

        <div id="inline-lifeline-result" style="display: none;">
          <div class="grid-2col">
            <div class="card">
              <div class="card-header">
                <h3>Transaction Root Cause & Diagnostics</h3>
              </div>
              <div id="ll-diag-banner" style="padding: 14px 18px; border-radius: 8px; margin-bottom: 16px; background: rgba(239, 68, 68, 0.12); border-left: 4px solid #ef4444;">
                <strong id="ll-diag-category">Diagnostic Evaluation</strong>
                <p id="ll-diag-summary" style="font-size: 0.86rem; margin-top: 4px; color: var(--text-muted);"></p>
              </div>
              <div class="telemetry-list">
                <div class="telemetry-row"><span>Order ID:</span><span id="ll-order-id" class="click-chip" onclick="copyChip(this)">--</span></div>
                <div class="telemetry-row"><span>Payment ID:</span><span id="ll-payment-id" class="click-chip" onclick="copyChip(this)">--</span></div>
                <div class="telemetry-row"><span>Amount:</span><span id="ll-amount">--</span></div>
                <div class="telemetry-row"><span>Gateway Status:</span><span id="ll-status">--</span></div>
                <div class="telemetry-row"><span>Component At Fault:</span><span id="ll-component">--</span></div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h3>Devotee Access & Sacred Plan</h3>
              </div>
              <div class="telemetry-list">
                <div class="telemetry-row"><span>Name:</span><span id="ll-dev-name">--</span></div>
                <div class="telemetry-row"><span>Kalyanam ID:</span><span id="ll-dev-kalyanam" class="click-chip" onclick="copyChip(this)">--</span></div>
                <div class="telemetry-row"><span>Email:</span><span id="ll-dev-email">--</span></div>
                <div class="telemetry-row"><span>Phone:</span><span id="ll-dev-phone">--</span></div>
                <div class="telemetry-row"><span>Plan:</span><span id="ll-dev-plan">--</span></div>
                <div class="telemetry-row"><span>Access State:</span><span id="ll-dev-access">--</span></div>
              </div>
              <div style="margin-top: 18px; display: flex; gap: 10px;">
                <button id="btn-ll-grant" class="btn btn-primary btn-sm" onclick="toggleLifelineUserAccess(true)">🔓 Grant Access</button>
                <button id="btn-ll-revoke" class="btn btn-outline-danger btn-sm" onclick="toggleLifelineUserAccess(false)">🔒 Revoke Access</button>
              </div>
            </div>
          </div>

          <!-- Customer Orders & Payment Ledger Table -->
          <div class="card" style="margin-top: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <h3 style="margin: 0; font-size: 1.05rem; display: flex; align-items: center; gap: 8px;">
                  📦 Customer Orders & Payment Ledger
                </h3>
                <small id="ll-orders-summary-label" style="color: var(--text-muted);">All order transactions associated with this customer</small>
              </div>
              <span id="ll-orders-count-badge" class="badge badge-primary" style="font-size: 0.8rem; padding: 4px 10px;">0 Orders Found</span>
            </div>
            <div class="table-container" style="overflow-x: auto;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>PAYMENT ID</th>
                    <th>PLAN</th>
                    <th>AMOUNT</th>
                    <th>GATEWAY STATUS</th>
                    <th>DATE & TIME</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody id="ll-orders-tbody">
                  <tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 24px;">Run diagnostic query above to retrieve customer order transactions</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      <!-- PANEL 4: PG Failure & Refund Support Tickets -->
      <section id="tab-tickets" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>PG Failure & Refund Support Tickets</h2>
            <p>Manage customer grievances where amount was deducted but payment dropped, reconciling with Razorpay 7-day SLA.</p>
          </div>
          <button class="btn btn-primary" onclick="openCreateTicketModal()">
            <span>+ Create Support Ticket</span>
          </button>
        </div>

        <div class="card" style="background: var(--bg-elevated); margin-bottom: 20px; padding: 18px 24px; border-left: 4px solid var(--amber);">
          <div style="display: flex; gap: 14px; align-items: center;">
            <span style="font-size: 1.5rem;">ℹ️</span>
            <div>
              <strong style="color: var(--text-main);">Razorpay Auto-Refund Protocol (5-7 Business Days):</strong>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">
                When a payment fails due to bank timeout, user cancellation, or domain risk check, Razorpay automatically pushes a reversal to the devotee's UPI / acquiring bank. If delayed beyond 7 days, check the Bank UTR / RRN or initiate a direct resolution.
              </div>
            </div>
          </div>
        </div>

        <div class="search-filter-bar">
          <input type="text" id="tickets-search" class="input-control" placeholder="Search Ticket ID, email, order ID, Bank UTR..." oninput="loadTickets()">
          <select id="tickets-issue-filter" class="select-control" onchange="loadTickets()">
            <option value="all">All Issue Categories</option>
            <option value="amount_debited_payment_failed">Amount Debited / Payment Failed</option>
            <option value="website_risk_check_blocked">Domain Mismatch (payment_risk_check_failed)</option>
            <option value="refund_not_received_7_days">Refund Delayed (> 7 Days)</option>
            <option value="double_debit">Double Debit</option>
            <option value="access_not_granted">Access Not Granted</option>
          </select>
          <select id="tickets-status-filter" class="select-control" onchange="loadTickets()">
            <option value="all">All Ticket Statuses</option>
            <option value="open">Open (Within 7-day window)</option>
            <option value="under_investigation">Under Investigation</option>
            <option value="refund_verified_pg">Verified by Razorpay PG</option>
            <option value="manual_refund_done">Manual UPI / Bank Refund Done</option>
            <option value="access_granted">Access Granted to Vidhi</option>
            <option value="resolved">Resolved / Closed</option>
          </select>
        </div>

        <div class="card table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Created</th>
                <th>Devotee Contact</th>
                <th>Order / Txn / Bank UTR</th>
                <th>Amount</th>
                <th>Issue Category</th>
                <th>Status</th>
                <th>SLA Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="tickets-tbody">
              <tr><td colspan="9" class="text-center">Loading dispute tickets...</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PANEL 5: Refunds & Reversals Console -->
      <section id="tab-refunds" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Refunds & Reversals Console</h2>
            <p>Issue full or partial refunds for Razorpay orders and track transaction reversal history.</p>
          </div>
          <button class="btn btn-danger" onclick="openDirectRefundModal()">
            <span>Issue Direct Refund</span>
          </button>
        </div>

        <div class="card table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Refund ID</th>
                <th>Order ID</th>
                <th>Devotee Email</th>
                <th>Amount Refunded</th>
                <th>Reason</th>
                <th>Method</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody id="refunds-tbody">
              <tr><td colspan="8" class="text-center">No refund records found.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PANEL 6: Platform Audit & Security Event Logs -->
      <section id="tab-logs" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Platform Audit & Security Event Logs</h2>
            <p>Immutable forensic audit trail of admin logins, password updates, price changes, and access grants.</p>
          </div>
        </div>

        <div class="search-filter-bar">
          <input type="text" id="logs-search" class="input-control" placeholder="Filter by email, client IP, action..." oninput="debounceLogs()">
          <select id="logs-action-filter" class="select-control" onchange="loadLogs()">
            <option value="all">All Audit Events</option>
            <option value="ADMIN_LOGIN">ADMIN_LOGIN</option>
            <option value="PASSWORD_CHANGE">PASSWORD_CHANGE</option>
            <option value="PRICE_UPDATED">PRICE_UPDATED</option>
            <option value="PAYMENT_SUCCESS">PAYMENT_SUCCESS</option>
            <option value="ACCESS_GRANTED">ACCESS_GRANTED</option>
            <option value="ACCESS_REVOKED">ACCESS_REVOKED</option>
            <option value="REFUND_PROCESSED">REFUND_PROCESSED</option>
            <option value="SECURITY_BREACH_ATTEMPT">SECURITY_BREACH_ATTEMPT</option>
          </select>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 8px;">
            <button class="btn btn-secondary btn-xs" onclick="changeLogsPage(-1)">&lt; Prev</button>
            <span id="logs-page-indicator" style="font-size: 0.8rem; font-weight: 700;">Page 1</span>
            <button class="btn btn-secondary btn-xs" onclick="changeLogsPage(1)">Next &gt;</button>
          </div>
        </div>

        <div class="card table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event Action</th>
                <th>Operator / Email</th>
                <th>Client IP</th>
                <th>Event Metadata</th>
              </tr>
            </thead>
            <tbody id="logs-tbody">
              <tr><td colspan="5" class="text-center">Loading audit log stream...</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PANEL 7: Pricing & Products Catalog -->
      <section id="tab-pricing" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Pricing & Products Catalog</h2>
            <p>Manage puja kit offerings, dynamic price updates, strikethrough rates, and features.</p>
          </div>
          <button class="btn btn-primary" onclick="openAddProductModal()">
            <span>+ Add New Product</span>
          </button>
        </div>

        <div class="card table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product Name & Subtitle</th>
                <th>Price (₹)</th>
                <th>Original Price (₹)</th>
                <th>Plan Key</th>
                <th>Badge</th>
                <th>Video Access</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="pricing-tbody">
              <tr><td colspan="8" class="text-center">Loading products catalog...</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PANEL 8: Devotee & User Access Control -->
      <section id="tab-users" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Devotee Access Control</h2>
            <p>Search devotee registrations, Kalyanam IDs, toggle paid status, and manage active plans.</p>
          </div>
        </div>

        <div class="search-filter-bar">
          <input type="text" id="users-search" class="input-control" placeholder="Search by Name, Email, Phone, Kalyanam ID..." oninput="debounceUsers()">
          <select id="users-status-filter" class="select-control" onchange="loadUsers(),
          loadSettings()">
            <option value="all">All Devotees</option>
            <option value="paid">Paid / Unlocked</option>
            <option value="pending">Pending Payment</option>
          </select>
        </div>

        <div class="card table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Devotee Name</th>
                <th>Kalyanam ID</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Plan</th>
                <th>Access Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="users-tbody">
              <tr><td colspan="8" class="text-center">Loading devotees...</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PANEL 9: Direct Support & Grievance Contacts -->
      <section id="tab-settings" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Direct Support & Grievance Contacts</h2>
            <p>Manage customer support WhatsApp helpline, support email, and statutory grievance officer credentials.</p>
          </div>
          <button class="btn btn-primary" onclick="saveSettings()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Save Changes to MongoDB
          </button>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px;">
          <!-- Form Section -->
          <div class="card" style="padding: 24px;">
            <h3 style="margin-top: 0; font-size: 1.1rem; color: var(--navy); display: flex; align-items: center; gap: 8px;">
              <span>⚙️</span> Platform Contact & Grievance Configuration
            </h3>
            
            <form id="settings-form" onsubmit="event.preventDefault(); saveSettings();">
              <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  CUSTOMER SUPPORT & WHATSAPP HELPLINE *
                </label>
                <input type="text" id="set-support-phone" class="input-control" placeholder="+919956355567" required oninput="updateSettingsPreview()">
                <small style="color: var(--text-muted); font-size: 0.75rem;">Displayed in checkout, website footer, and privacy policy support cards.</small>
              </div>

              <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  CUSTOMER SUPPORT EMAIL *
                </label>
                <input type="email" id="set-support-email" class="input-control" placeholder="thepoojanvidhi@gmail.com" required oninput="updateSettingsPreview()">
                <small style="color: var(--text-muted); font-size: 0.75rem;">General devotee support and assistance email address.</small>
              </div>

              <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  OFFICER IN CHARGE / GRIEVANCE OFFICER NAME *
                </label>
                <input type="text" id="set-grievance-officer" class="input-control" placeholder="Aditya Sahu" required oninput="updateSettingsPreview()">
                <small style="color: var(--text-muted); font-size: 0.75rem;">Statutory Grievance Officer name as required by Information Technology Rules.</small>
              </div>

              <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  OFFICIAL GRIEVANCE OFFICER EMAIL *
                </label>
                <input type="email" id="set-grievance-email" class="input-control" placeholder="aditya.sahu2557@gmail.com" required oninput="updateSettingsPreview()">
                <small style="color: var(--text-muted); font-size: 0.75rem;">Direct grievance and legal compliance correspondence email.</small>
              </div>

              <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  REGISTERED ENTITY / COMPANY NAME *
                </label>
                <input type="text" id="set-entity-name" class="input-control" placeholder="पूजनविधि (PoojanVidhi / Kalyanam Sacred Services)" required oninput="updateSettingsPreview()">
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 700;">
                Update & Publish Platform Contacts
              </button>
            </form>
          </div>

          <!-- Live Preview Box (Matches User's Screenshots) -->
          <div>
            <div class="card" style="padding: 20px; background: #fffcf6; border: 1.5px solid #ecdcc6; border-radius: 12px; margin-bottom: 16px;">
              <h4 style="margin: 0 0 10px; color: #8f211c; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
                <span>📱</span> Live Storefront & Privacy Preview
              </h4>
              <p style="font-size: 0.8rem; color: #6d5345; margin-bottom: 14px;">
                Here is how your contacts will immediately render on <strong>poojanvidhi.web.app</strong>:
              </p>

              <!-- Preview 1: Direct Support & Grievance Contacts Box -->
              <div style="background: #fff; border: 1px solid #ebd9bf; border-radius: 8px; padding: 14px; margin-bottom: 14px;">
                <div style="font-size: 0.85rem; font-weight: 700; color: #8f211c; margin-bottom: 6px;">
                  Direct Support &amp; Grievance Contacts
                </div>
                <div style="font-size: 0.75rem; color: #795d4f; margin-bottom: 10px;">
                  CUSTOMER SUPPORT &amp; WHATSAPP:<br>
                  <strong style="color: #8f211c;" id="prev-support-phone">+919956355567</strong>
                </div>
                <div style="font-size: 0.75rem; color: #795d4f;">
                  OFFICIAL GRIEVANCE OFFICER EMAIL:<br>
                  <strong style="color: #8f211c;" id="prev-grievance-email">aditya.sahu2557@gmail.com</strong>
                </div>
              </div>

              <!-- Preview 2: Statutory Grievance Details Box -->
              <div style="background: #fff; border: 1px solid #ebd9bf; border-radius: 8px; padding: 14px;">
                <div style="font-size: 0.78rem; color: #4a3328; line-height: 1.6;">
                  <strong>Officer in Charge:</strong> <span id="prev-officer-name">Aditya Sahu</span><br>
                  <strong>Entity:</strong> <span id="prev-entity-name">पूजनविधि (PoojanVidhi / Kalyanam Sacred Services)</span><br>
                  <strong>Support Helpline:</strong> <span id="prev-support-phone-2">+919956355567</span><br>
                  <strong>Support &amp; Grievance Email:</strong> <span id="prev-grievance-email-2">aditya.sahu2557@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>

  <!-- MODAL: Change Master Password -->
  <div id="modal-password" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3>🔑 Update Admin Master Password</h3>
        <button class="modal-close" onclick="closeModal('modal-password')">&times;</button>
      </div>
      <form onsubmit="handlePasswordChange(event)">
        <div class="form-group">
          <label>Current Password</label>
          <input type="password" id="pw-current" required placeholder="Enter current passkey...">
        </div>
        <div class="form-group">
          <label>New Password (min 6 characters)</label>
          <input type="password" id="pw-new" required minlength="6" placeholder="Enter new strong password...">
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
          <button type="button" class="btn btn-secondary" onclick="closeModal('modal-password')">Cancel</button>
          <button type="submit" class="btn btn-primary">Save to MongoDB</button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL: Add / Edit Product -->
  <div id="modal-product" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3 id="product-modal-title">Add New Product</h3>
        <button class="modal-close" onclick="closeModal('modal-product')">&times;</button>
      </div>
      <form onsubmit="handleProductSubmit(event)">
        <input type="hidden" id="prod-id">
        <div class="form-group">
          <label>Product Name</label>
          <input type="text" id="prod-name" required placeholder="e.g. Poojan Vidhi Kit">
        </div>
        <div class="form-group">
          <label>Subtitle / Description</label>
          <input type="text" id="prod-subtitle" placeholder="Short description">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label>Price (₹)</label>
            <input type="number" id="prod-price" required min="1">
          </div>
          <div class="form-group">
            <label>Original Price (₹)</label>
            <input type="number" id="prod-orig-price" placeholder="e.g. 199">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label>Plan Key</label>
            <select id="prod-type">
              <option value="digital_kit">digital_kit</option>
              <option value="video_kit">video_kit</option>
            </select>
          </div>
          <div class="form-group">
            <label>Badge</label>
            <input type="text" id="prod-badge" placeholder="e.g. Most Recommended">
          </div>
        </div>
        <div class="form-group">
          <label>Features (1 per line)</label>
          <textarea id="prod-features" rows="4" placeholder="Enter features..."></textarea>
        </div>
        <div style="display: flex; gap: 18px; margin-bottom: 16px;">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.85rem;">
            <input type="checkbox" id="prod-video" style="width: auto;"> Includes Video Access
          </label>
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.85rem;">
            <input type="checkbox" id="prod-active" checked style="width: auto;"> Active in Store
          </label>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary" onclick="closeModal('modal-product')">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Product</button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL: Create Support Ticket -->
  <div id="modal-ticket" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Create Support Dispute Ticket</h3>
        <button class="modal-close" onclick="closeModal('modal-ticket')">&times;</button>
      </div>
      <form onsubmit="handleCreateTicket(event)">
        <div class="form-group">
          <label>Devotee Email</label>
          <input type="email" id="tck-email" required placeholder="devotee@gmail.com">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label>Devotee Name</label>
            <input type="text" id="tck-name" placeholder="Devotee name">
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="text" id="tck-phone" placeholder="+91...">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label>Razorpay Order ID</label>
            <input type="text" id="tck-order" required placeholder="order_xxx">
          </div>
          <div class="form-group">
            <label>Amount (₹)</label>
            <input type="number" id="tck-amount" required value="121">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label>Payment ID / Bank UTR</label>
            <input type="text" id="tck-payid" placeholder="pay_xxx or UTR">
          </div>
          <div class="form-group">
            <label>Issue Category</label>
            <select id="tck-issue">
              <option value="amount_debited_payment_failed">Amount Debited / Payment Failed</option>
              <option value="website_risk_check_blocked">Domain Mismatch (payment_risk_check_failed)</option>
              <option value="refund_not_received_7_days">Refund Delayed (> 7 Days)</option>
              <option value="double_debit">Double Debit</option>
              <option value="access_not_granted">Access Not Granted</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Issue Description</label>
          <textarea id="tck-desc" rows="3" placeholder="Devotee grievance description..."></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary" onclick="closeModal('modal-ticket')">Cancel</button>
          <button type="submit" class="btn btn-primary">File Ticket</button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL: Update Support Ticket Status -->
  <div id="modal-update-ticket" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Update Support Ticket</h3>
        <button class="modal-close" onclick="closeModal('modal-update-ticket')">&times;</button>
      </div>
      <form onsubmit="handleUpdateTicket(event)">
        <input type="hidden" id="upt-ticket-id">
        <div class="form-group">
          <label>Ticket Status</label>
          <select id="upt-status">
            <option value="open">Open (In 7-day SLA window)</option>
            <option value="under_investigation">Under Investigation</option>
            <option value="refund_verified_pg">Verified Auto-Refund by Razorpay</option>
            <option value="manual_refund_done">Manual UPI / Bank Refund Done</option>
            <option value="access_granted">Access Granted to Puja Vidhi</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div class="form-group">
          <label>Admin Remarks & Investigation Log</label>
          <textarea id="upt-remarks" rows="3" placeholder="Add resolution notes..."></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-secondary" onclick="closeModal('modal-update-ticket')">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Updates</button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL: Issue Direct Refund -->
  <div id="modal-refund" class="modal-backdrop">
    <div class="modal-box">
      <div class="modal-header">
        <h3>Issue Direct Refund Reversal</h3>
        <button class="modal-close" onclick="closeModal('modal-refund')">&times;</button>
      </div>
      <form onsubmit="handleProcessRefund(event)">
        <div class="form-group">
          <label>Order ID or Payment ID</label>
          <input type="text" id="rf-order-id" required placeholder="order_xxx or pay_xxx">
        </div>
        <div class="form-group">
          <label>Refund Amount (₹)</label>
          <input type="number" id="rf-amount" placeholder="Leave empty for full order amount">
        </div>
        <div class="form-group">
          <label>Reason for Refund</label>
          <input type="text" id="rf-reason" value="Devotee requested reversal" required>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
          <button type="button" class="btn btn-secondary" onclick="closeModal('modal-refund')">Cancel</button>
          <button type="submit" class="btn btn-danger">Process Reversal</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Toast Container -->
  <div id="toast-container" class="toast-container"></div>

  <!-- Application Logic -->\n<script src="/js/admin.js?v=3.0"></script>`
      }
    })
  );
}

module.exports = AdminDashboardTemplate;
