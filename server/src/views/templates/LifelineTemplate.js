let React;
try {
  React = require('react');
} catch (e) {
  try {
    React = require('../../../../client/node_modules/react');
  } catch (e2) {
    try {
      React = require('../../../client/node_modules/react');
    } catch (e3) {
      React = {
        createElement: (type, props, ...children) => ({
          type,
          props: { ...props, children: children.flat() },
          children: children.flat()
        })
      };
    }
  }
}
const h = React.createElement;

function LifelineTemplate({ initialQuery = {}, user = {} }) {
  return h('html', { lang: 'en', 'data-theme': 'dark' },
    h('head', null,
      h('meta', { charSet: 'UTF-8' }),
      h('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      h('title', null, 'PoojanVidhi Lifeline & Order Investigation Hub'),
      h('link', { rel: 'icon', type: 'image/jpeg', href: '/images/PoojanVidhi_Logo.jpeg' }),
      h('link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
      h('link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }),
      h('link', {
        href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap',
        rel: 'stylesheet'
      }),
      h('style', {
        dangerouslySetInnerHTML: {
          __html: `
        :root {
          --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          --radius: 10px;
        }

        /* Dark Theme Default */
        [data-theme="dark"] {
          --bg-root: #070d1e;
          --bg-surface: #0b152d;
          --bg-card: #0f1c3d;
          --bg-elevated: #162650;
          --bg-input: #081024;
          --border: #1a2c5a;
          --border-strong: #253d7a;
          --text-main: #f1f5f9;
          --text-muted: #94a3b8;
          --navy: #0e1b3d;
          --primary-blue: #3b5bff;
          --primary-hover: #2949eb;
          --emerald: #10b981;
          --emerald-text: #34d399;
          --emerald-bg: rgba(16, 185, 129, 0.12);
          --amber: #f59e0b;
          --amber-text: #fbbf24;
          --amber-bg: rgba(245, 158, 11, 0.12);
          --rose: #ef4444;
          --rose-text: #f87171;
          --rose-bg: rgba(239, 68, 68, 0.12);
          --chip-bg: #142247;
          --chip-border: #233a72;
          --chip-text: #93c5fd;
        }

        /* Light Theme Exact Strivers Match */
        [data-theme="light"] {
          --bg-root: #f4f6fa;
          --bg-surface: #ffffff;
          --bg-card: #ffffff;
          --bg-elevated: #f0f3f9;
          --bg-input: #ffffff;
          --border: #dbe2ea;
          --border-strong: #c4d1e0;
          --text-main: #131b2e;
          --text-muted: #46517a;
          --navy: #0e1b3d;
          --primary-blue: #2f4bff;
          --primary-hover: #1e3aec;
          --emerald: #059669;
          --emerald-text: #047857;
          --emerald-bg: #ecfdf5;
          --amber: #d97706;
          --amber-text: #b45309;
          --amber-bg: #fffbeb;
          --rose: #dc2626;
          --rose-text: #b91c1c;
          --rose-bg: #fef2f2;
          --chip-bg: #eff6ff;
          --chip-border: #bfdbfe;
          --chip-text: #1d4ed8;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: var(--font-sans);
          background: var(--bg-root);
          color: var(--text-main);
          min-height: 100vh;
          line-height: 1.5;
        }

        /* Top Navigation Header */
        .top-navbar {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-logo-badge {
          background: #7a1230;
          color: #fff;
          font-weight: 800;
          font-size: 0.78rem;
          padding: 6px 12px;
          border-radius: 6px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .nav-right-actions {
          display: flex;
          gap: 10px;
        }
        .nav-pill-btn {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 7px 14px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .nav-pill-btn:hover {
          color: var(--text-main);
          border-color: var(--border-strong);
        }

        /* Main Container */
        .main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 20px 60px;
        }

        /* Search Hero Card */
        .search-hero-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .search-row {
          display: flex;
          gap: 12px;
          margin-top: 14px;
        }
        .search-input {
          flex: 1;
          background: var(--bg-input);
          border: 1.5px solid var(--border);
          border-radius: 6px;
          padding: 12px 16px;
          color: var(--text-main);
          font-family: var(--font-mono);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(59, 91, 255, 0.15);
        }
        .search-btn {
          background: var(--primary-blue);
          color: #fff;
          border: none;
          padding: 0 24px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .search-btn:hover {
          background: var(--primary-hover);
        }

        /* 2-Column Grid */
        .investigation-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        @media (max-width: 860px) {
          .investigation-grid { grid-template-columns: 1fr; }
        }

        /* Cards */
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
        }
        .card-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Diag Banner */
        .diag-banner {
          background: var(--rose-bg);
          border-left: 4px solid var(--rose);
          padding: 14px 18px;
          border-radius: 6px;
          margin-bottom: 20px;
        }
        .diag-banner.success {
          background: var(--emerald-bg);
          border-left-color: var(--emerald);
        }
        .diag-banner strong {
          display: block;
          font-size: 0.95rem;
          color: var(--text-main);
        }
        .diag-banner p {
          color: var(--text-muted);
          font-size: 0.86rem;
          margin-top: 4px;
        }

        /* Meta Tables */
        .meta-table {
          width: 100%;
          border-collapse: collapse;
        }
        .meta-table td {
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          font-size: 0.88rem;
        }
        .meta-table td:first-child {
          color: var(--text-muted);
          width: 40%;
        }
        .meta-table td:last-child {
          font-weight: 600;
        }

        /* Click Chips */
        .click-chip {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          background: var(--chip-bg);
          border: 1px solid var(--chip-border);
          color: var(--chip-text);
          padding: 2px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .click-chip:hover { opacity: 0.8; }

        /* Pills */
        .pill {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .pill-success { background: var(--emerald-bg); color: var(--emerald-text); }
        .pill-warning { background: var(--amber-bg); color: var(--amber-text); }
        .pill-failed { background: var(--rose-bg); color: var(--rose-text); }
        .pill-primary { background: rgba(59, 91, 255, 0.15); color: var(--primary-blue); }

        /* Action Buttons */
        .btn-action {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-green { background: var(--emerald); color: #fff; }
        .btn-red { background: var(--rose); color: #fff; }
        .btn-action:hover { opacity: 0.9; }

        /* Orders Table */
        .orders-table th {
          background: var(--bg-elevated);
          padding: 10px 12px;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }
        .orders-table td {
          padding: 12px;
          border-bottom: 1px solid var(--border);
          font-size: 0.85rem;
        }
        .order-row:hover {
          background: var(--bg-elevated);
        }
        .btn-inspect {
          background: var(--bg-elevated);
          border: 1px solid var(--border-strong);
          color: var(--primary-blue);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-inspect:hover {
          background: var(--primary-blue);
          color: #fff;
        }

        #toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #1e293b;
          color: #fff;
          padding: 10px 18px;
          border-radius: 6px;
          font-size: 0.85rem;
          display: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          z-index: 1000;
        }
        `
        }
      })
    ),
    h('body', null,
      h('header', { className: 'top-navbar' },
        h('div', { className: 'nav-logo-wrap' },
          h('div', { className: 'nav-logo-badge' }, '🕉️ POOJANVIDHI'),
          h('span', { className: 'nav-title' }, 'Lifeline & Order Investigation Hub')
        ),
        h('div', { className: 'nav-right-actions' },
          h('button', {
            className: 'nav-pill-btn',
            id: 'theme-toggle-btn',
            onClick: 'toggleTheme()'
          }, '🌓 Toggle Theme'),
          h('a', { className: 'nav-pill-btn', href: '/admin' }, 'Back to Control Center')
        )
      ),

      h('main', { className: 'main-container' },
        h('section', { className: 'search-hero-card' },
          h('h2', { style: { fontSize: '1.25rem', fontWeight: '800' } }, 'Diagnostic Investigation Engine'),
          h('p', { style: { color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' } },
            'Search customer order transactions, PG gateway timeouts, devotee access status, and dispute telemetry via contact number, email, or Kalyanam ID.'
          ),
          h('div', { className: 'search-row' },
            h('input', {
              id: 'investigate-input',
              className: 'search-input',
              defaultValue: initialQuery.q || '',
              placeholder: 'Enter Contact No. (e.g. 9876543210), Email, Kalyanam ID (KLYxxx) or Order ID (order_xxx)...',
              onKeyDown: 'if(event.key==="Enter") investigate()'
            }),
            h('button', { className: 'search-btn', onClick: 'investigate()' }, '🔍 Investigate')
          )
        ),

        h('div', { id: 'investigation-results', className: 'investigation-grid' },
          /* Left Column: Diagnostics */
          h('div', null,
            h('div', { className: 'card' },
              h('div', { className: 'card-title' }, '📊 Transaction Diagnostics & Root Cause'),
              h('div', { id: 'diag-banner', className: 'diag-banner' },
                h('strong', { id: 'diag-category' }, 'Awaiting Query'),
                h('p', { id: 'diag-summary', style: { fontSize: '0.88rem', marginTop: '4px' } },
                  'Enter an identifier above to run real-time PG gateway and MongoDB verification.'
                )
              ),
              h('table', { className: 'meta-table' },
                h('tbody', null,
                  h('tr', null,
                    h('td', null, 'Order ID:'),
                    h('td', null, h('span', { id: 'res-order-id', className: 'click-chip', onClick: 'copyChip(this)' }, '--'))
                  ),
                  h('tr', null,
                    h('td', null, 'Payment ID:'),
                    h('td', null, h('span', { id: 'res-payment-id', className: 'click-chip', onClick: 'copyChip(this)' }, '--'))
                  ),
                  h('tr', null,
                    h('td', null, 'Amount & Currency:'),
                    h('td', { id: 'res-amount' }, '--')
                  ),
                  h('tr', null,
                    h('td', null, 'Gateway Status:'),
                    h('td', null, h('span', { id: 'res-status', className: 'pill pill-warning' }, '--'))
                  ),
                  h('tr', null,
                    h('td', null, 'Component At Fault:'),
                    h('td', { id: 'res-component' }, '--')
                  )
                )
              )
            )
          ),

          /* Right Column: Devotee Profile */
          h('div', null,
            h('div', { className: 'card' },
              h('div', { className: 'card-title' }, '👤 Devotee Profile & Access State'),
              h('table', { className: 'meta-table' },
                h('tbody', null,
                  h('tr', null,
                    h('td', null, 'Devotee Name:'),
                    h('td', { id: 'dev-name', style: { fontWeight: '700' } }, '--')
                  ),
                  h('tr', null,
                    h('td', null, 'Kalyanam ID:'),
                    h('td', null, h('span', { id: 'dev-kalyanam', className: 'click-chip', onClick: 'copyChip(this)' }, '--'))
                  ),
                  h('tr', null,
                    h('td', null, 'Email Address:'),
                    h('td', { id: 'dev-email' }, '--')
                  ),
                  h('tr', null,
                    h('td', null, 'Phone Number:'),
                    h('td', { id: 'dev-phone' }, '--')
                  ),
                  h('tr', null,
                    h('td', null, 'Active Plan:'),
                    h('td', { id: 'dev-plan' }, '--')
                  ),
                  h('tr', null,
                    h('td', null, 'Puja Access State:'),
                    h('td', null, h('span', { id: 'dev-access-pill', className: 'pill pill-warning' }, '--'))
                  )
                )
              ),
              h('div', { style: { marginTop: '16px', display: 'flex', gap: '10px' } },
                h('button', {
                  id: 'btn-grant',
                  className: 'btn-action btn-green',
                  onClick: 'grantDevoteeAccess()'
                }, '🔓 Grant Full Access'),
                h('button', {
                  id: 'btn-revoke',
                  className: 'btn-action btn-red',
                  onClick: 'revokeDevoteeAccess()'
                }, '🔒 Revoke Access')
              )
            )
          )
        ),

        /* Below Section: Customer Orders & Payment Ledger */
        h('section', { className: 'card', style: { marginTop: '24px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' } },
            h('div', null,
              h('h3', { style: { margin: 0, fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' } },
                '📦 Customer Orders & Payment Ledger'
              ),
              h('small', { id: 'orders-summary-label', style: { color: 'var(--text-muted)' } }, 'All order transactions associated with this customer')
            ),
            h('span', { id: 'orders-count-badge', className: 'pill pill-primary', style: { fontSize: '0.8rem', padding: '4px 10px' } }, '0 Orders Found')
          ),
          h('div', { style: { overflowX: 'auto' } },
            h('table', { className: 'orders-table', style: { width: '100%', borderCollapse: 'collapse' } },
              h('thead', null,
                h('tr', null,
                  h('th', null, 'Order ID'),
                  h('th', null, 'Payment ID'),
                  h('th', null, 'Amount'),
                  h('th', null, 'Plan'),
                  h('th', null, 'Gateway Status'),
                  h('th', null, 'Created Timestamp'),
                  h('th', null, 'Actions')
                )
              ),
              h('tbody', { id: 'orders-tbody' },
                h('tr', null,
                  h('td', { colSpan: 7, style: { textAlign: 'center', padding: '24px', color: 'var(--text-muted)' } },
                    'Enter a Contact No., Email, or Kalyanam ID above to load all orders.'
                  )
                )
              )
            )
          )
        )
      ),

      h('div', { id: 'toast' }, 'Copied to clipboard'),

      h('script', {
        dangerouslySetInnerHTML: {
          __html: `
        let currentUserId = null;
        let currentKalyanamId = null;
        let allOrders = [];

        function copyChip(el) {
          const text = el.innerText.trim();
          if (!text || text === '--') return;
          navigator.clipboard.writeText(text);
          const toast = document.getElementById('toast');
          toast.innerText = 'Copied: ' + text;
          toast.style.display = 'block';
          setTimeout(() => { toast.style.display = 'none'; }, 2000);
        }

        function toggleTheme() {
          const current = document.documentElement.getAttribute('data-theme') || 'dark';
          const next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('poojanvidhi_admin_theme', next);
        }

        const savedTheme = localStorage.getItem('poojanvidhi_admin_theme');
        if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

        function displayOrderDiagnostics(p) {
          document.getElementById('res-order-id').innerText = p?.orderId || 'N/A';
          document.getElementById('res-payment-id').innerText = p?.paymentId || 'Pending / N/A';
          document.getElementById('res-amount').innerText = p?.amount ? ('₹' + p.amount + ' ' + (p.currency || 'INR')) : '₹0';
          
          const statusEl = document.getElementById('res-status');
          const status = p?.status || 'created';
          statusEl.innerText = status.toUpperCase();
          statusEl.className = 'pill ' + (status === 'captured' ? 'pill-success' : (status === 'failed' ? 'pill-failed' : 'pill-warning'));

          const banner = document.getElementById('diag-banner');
          const isOk = status === 'captured';
          banner.className = 'diag-banner ' + (isOk ? 'success' : '');
          document.getElementById('diag-category').innerText = p?.diagnostics?.failureCategory || (isOk ? 'Captured Successfully' : 'Diagnostic Inspection');
          document.getElementById('diag-summary').innerText = p?.diagnostics?.diagnosticSummary || (isOk ? 'Payment verified and active.' : 'Order initiated but payment not captured.');
          document.getElementById('res-component').innerText = p?.diagnostics?.failedComponent || (isOk ? 'None' : 'Razorpay Gateway / User Action');
        }

        function selectOrderForDiagnosis(orderId) {
          const p = allOrders.find(o => o.orderId === orderId || o.paymentId === orderId);
          if (!p) return;
          displayOrderDiagnostics(p);
          document.querySelectorAll('.order-row').forEach(r => {
            r.style.background = (r.dataset.orderId === p.orderId) ? 'rgba(59, 91, 255, 0.12)' : '';
          });
        }

        async function investigate() {
          const query = document.getElementById('investigate-input').value.trim();
          if (!query) return;

          let token = localStorage.getItem('poojanvidhi_admin_token') || sessionStorage.getItem('poojanvidhi_admin_token') || localStorage.getItem('pv_admin_token');
          const headers = { 'Accept': 'application/json' };
          if (token) headers['Authorization'] = 'Bearer ' + token;

          try {
            let res = await fetch('/api/v1/admin/lifeline?q=' + encodeURIComponent(query), { headers });
            
            // If unauthorized, prompt admin for passkey and retry
            if (res.status === 401 || res.status === 403) {
              const passkey = prompt('Admin passkey required for Lifeline investigation:');
              if (!passkey) return;
              localStorage.setItem('poojanvidhi_admin_token', passkey);
              headers['Authorization'] = 'Bearer ' + passkey;
              res = await fetch('/api/v1/admin/lifeline?q=' + encodeURIComponent(query), { headers });
            }

            const data = await res.json();
            if (!data.success) {
              alert(data.message || 'No records found matching query');
              return;
            }

            const inv = data.investigation;
            const p = inv.payment;
            const u = inv.user;
            allOrders = inv.orders || (p ? [p] : []);

            // 1. Devotee profile
            if (u) {
              currentUserId = u._id;
              currentKalyanamId = u.kalyanamId;
              document.getElementById('dev-name').innerText = u.name || 'Devotee';
              document.getElementById('dev-kalyanam').innerText = u.kalyanamId || 'N/A';
              document.getElementById('dev-email').innerText = u.email || 'N/A';
              document.getElementById('dev-phone').innerText = u.phone || 'N/A';
              document.getElementById('dev-plan').innerText = u.plan === 'video_kit' ? 'Complete Video Kit' : 'Digital Kit';
              
              const accEl = document.getElementById('dev-access-pill');
              accEl.innerText = u.paid ? 'UNLOCKED / PAID' : 'PENDING PAYMENT';
              accEl.className = 'pill ' + (u.paid ? 'pill-success' : 'pill-warning');
            } else {
              document.getElementById('dev-name').innerText = p?.userEmail ? 'Guest Devotee' : '--';
              document.getElementById('dev-kalyanam').innerText = p?.kalyanamId || '--';
              document.getElementById('dev-email').innerText = p?.userEmail || '--';
              document.getElementById('dev-phone').innerText = p?.userPhone || '--';
              document.getElementById('dev-plan').innerText = p?.plan || '--';
            }

            // 2. Primary Diagnostic banner
            displayOrderDiagnostics(p || allOrders[0]);

            // 3. Orders Ledger List
            const tbody = document.getElementById('orders-tbody');
            const badge = document.getElementById('orders-count-badge');
            const summaryLabel = document.getElementById('orders-summary-label');

            badge.innerText = allOrders.length + ' Orders Found';
            if (u) summaryLabel.innerText = 'All order transactions for ' + (u.name || u.email);

            if (allOrders.length === 0) {
              tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: var(--text-muted);">No orders found for this customer.</td></tr>';
            } else {
              tbody.innerHTML = allOrders.map((o, idx) => {
                const isSelected = (p && o.orderId === p.orderId) || idx === 0;
                const rowBg = isSelected ? 'background: rgba(59, 91, 255, 0.12);' : '';
                const st = (o.status || 'created').toLowerCase();
                const pillClass = st === 'captured' ? 'pill-success' : (st === 'failed' ? 'pill-failed' : 'pill-warning');
                const dt = o.createdAt ? new Date(o.createdAt).toLocaleString('en-IN') : '--';
                return '<tr class="order-row" data-order-id="' + o.orderId + '" style="' + rowBg + '">' +
                  '<td><span class="click-chip" onclick="copyChip(this)">' + (o.orderId || 'N/A') + '</span></td>' +
                  '<td><span class="click-chip" onclick="copyChip(this)">' + (o.paymentId || 'Pending') + '</span></td>' +
                  '<td><strong>₹' + (o.amount || 0) + '</strong></td>' +
                  '<td>' + (o.plan === 'video_kit' ? 'Video Kit' : 'Digital Kit') + '</td>' +
                  '<td><span class="pill ' + pillClass + '">' + st.toUpperCase() + '</span></td>' +
                  '<td style="font-size: 0.8rem; color: var(--text-muted);">' + dt + '</td>' +
                  '<td><button class="btn-inspect" onclick="selectOrderForDiagnosis(\'' + o.orderId + '\')">Inspect</button></td>' +
                  '</tr>';
              }).join('');
            }
          } catch (err) {
            alert('Investigation request failed: ' + err.message);
          }
        }

        async function grantDevoteeAccess() {
          if (!currentUserId) return alert('Please search for a devotee first');
          let token = localStorage.getItem('poojanvidhi_admin_token') || prompt('Enter Admin Passkey:');
          if (!token) return;
          const res = await fetch('/api/v1/admin/users/' + currentUserId + '/toggle-paid', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ paid: true })
          });
          const d = await res.json();
          if (d.success) {
            alert('Devotee access granted successfully');
            investigate();
          } else alert(d.message);
        }

        async function revokeDevoteeAccess() {
          if (!currentUserId) return alert('Please search for a devotee first');
          let token = localStorage.getItem('poojanvidhi_admin_token') || prompt('Enter Admin Passkey:');
          if (!token) return;
          const res = await fetch('/api/v1/admin/users/' + currentUserId + '/toggle-paid', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ paid: false })
          });
          const d = await res.json();
          if (d.success) {
            alert('Devotee access revoked');
            investigate();
          } else alert(d.message);
        }

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('q')) investigate();
        `
        }
      })
    )
  );
}

module.exports = LifelineTemplate;
