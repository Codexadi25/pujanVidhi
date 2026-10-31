const { React } = require('../engine/reactEngine');

const h = React ? React.createElement : (tag, props, ...children) => ({ tag, props, children });

/**
 * PoojanVidhi Dedicated Server-Side React Lifeline Template
 * Rendered by Express React View Engine
 */
function LifelineTemplate(props) {
  const initialQuery = props.initialQuery || { type: 'orderId', q: '' };
  const user = props.user || {
    name: 'Devotee Investigation',
    email: 'admin@poojanvidhi.com',
    watermark: 'POOJANVIDHI | VERIFIED SERVER LIFELINE',
  };

  return h('html', { lang: 'en', 'data-theme': 'dark' },
    h('head', null,
      h('meta', { charSet: 'UTF-8' }),
      h('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      h('title', null, 'PoojanVidhi Lifeline & Order Investigation Hub'),
      h('link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
      h('link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }),
      h('link', {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
      }),
      h('style', {
        dangerouslySetInnerHTML: {
          __html: `
        :root, [data-theme="dark"] {
          --bg-page: #0a0f1d;
          --bg-card: #131d33;
          --bg-surface: #0f172a;
          --bg-elevated: #18243e;
          --border: rgba(220, 227, 240, 0.12);
          --border-sub: rgba(220, 227, 240, 0.2);
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --navy: #0e1b3d;
          --primary-blue: #3b5bff;
          --accent-green: #10b981;
          --green-pill-bg: rgba(16, 185, 129, 0.16);
          --green-pill-text: #34d399;
          --blue-pill-bg: rgba(59, 91, 255, 0.16);
          --blue-pill-text: #60a5fa;
          --red-pill-bg: rgba(239, 68, 68, 0.16);
          --red-pill-text: #f87171;
          --orange-pill-bg: rgba(245, 158, 11, 0.16);
          --orange-pill-text: #fbbf24;
          --font-main: 'Plus Jakarta Sans', system-ui, sans-serif;
          --font-mono: 'IBM Plex Mono', monospace;
          --font-brand: 'Cinzel', serif;
        }

        [data-theme="light"] {
          --bg-page: #f2f5fa;
          --bg-card: #ffffff;
          --bg-surface: #ffffff;
          --bg-elevated: #f8fafc;
          --border: #e2e8f0;
          --border-sub: #cbd5e1;
          --text-main: #0e1b3d;
          --text-muted: #46517a;
          --navy: #0e1b3d;
          --primary-blue: #2f4bff;
          --accent-green: #059669;
          --green-pill-bg: #e8f5e9;
          --green-pill-text: #2e7d32;
          --blue-pill-bg: #eff6ff;
          --blue-pill-text: #2563eb;
          --red-pill-bg: #fee2e2;
          --red-pill-text: #dc2626;
          --orange-pill-bg: #fef3c7;
          --orange-pill-text: #d97706;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background-color: var(--bg-page);
          color: var(--text-main);
          font-family: var(--font-main);
          line-height: 1.5;
          min-height: 100vh;
        }

        /* Top Navigation Header (Exact Strivers Style) */
        .top-navbar {
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          padding: 12px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .nav-logo-badge {
          background: #7a1230;
          color: #d9a852;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-brand);
          font-size: 0.95rem;
          border: 1px solid rgba(217, 168, 82, 0.4);
        }
        .nav-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
        }
        .nav-right-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-pill-btn {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 6px 14px;
          border-radius: 99px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          transition: all 0.15s;
          cursor: pointer;
        }
        .nav-pill-btn:hover {
          color: var(--text-main);
          border-color: var(--border-sub);
        }

        .main-container {
          max-width: 1300px;
          margin: 24px auto;
          padding: 0 20px;
        }

        .search-hero-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .search-row {
          display: flex;
          gap: 12px;
          margin-top: 14px;
        }
        .search-input {
          flex: 1;
          padding: 12px 16px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-main);
          font-family: var(--font-mono);
          font-size: 0.95rem;
        }
        .search-btn {
          background: var(--primary-blue);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .investigation-grid {
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 20px;
        }

        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .card-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .diag-banner {
          border-radius: 8px;
          padding: 16px 20px;
          margin-bottom: 16px;
          background: rgba(239, 68, 68, 0.1);
          border-left: 4px solid #ef4444;
        }
        .diag-banner.success {
          background: rgba(16, 185, 129, 0.1);
          border-left: 4px solid #10b981;
        }

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
          width: 38%;
        }

        .click-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-elevated);
          padding: 3px 8px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          border: 1px solid var(--border);
          cursor: pointer;
          user-select: all;
        }
        .click-chip:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
        }

        .pill {
          padding: 3px 10px;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .pill-success { background: var(--green-pill-bg); color: var(--green-pill-text); }
        .pill-failed { background: var(--red-pill-bg); color: var(--red-pill-text); }
        .pill-warning { background: var(--orange-pill-bg); color: var(--orange-pill-text); }

        .btn-action {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-green { background: #10b981; color: white; }
        .btn-red { background: #ef4444; color: white; }

        /* Toast */
        #toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #1e293b;
          color: #f8fafc;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 0.85rem;
          display: none;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          z-index: 9999;
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
          h('a', { className: 'nav-pill-btn', href: '/admin' }, '← Back to Control Center')
        )
      ),

      h('main', { className: 'main-container' },
        h('section', { className: 'search-hero-card' },
          h('h2', { style: { fontSize: '1.25rem', fontWeight: '800' } }, 'Diagnostic Investigation Engine'),
          h('p', { style: { color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' } },
            'Search order transactions, PG gateway timeouts, devotee access status, and dispute telemetry.'
          ),
          h('div', { className: 'search-row' },
            h('input', {
              id: 'investigate-input',
              className: 'search-input',
              defaultValue: initialQuery.q || '',
              placeholder: 'Enter Order ID (order_xxx), Payment ID, Devotee Email, Phone or Kalyanam ID (KLYxxx)...',
              onKeyDown: 'if(event.key==="Enter") investigate()'
            }),
            h('button', { className: 'search-btn', onClick: 'investigate()' }, '🔍 Investigate')
          )
        ),

        h('div', { id: 'investigation-results', className: 'investigation-grid' },
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
        )
      ),

      h('div', { id: 'toast' }, 'Copied to clipboard'),

      h('script', {
        dangerouslySetInnerHTML: {
          __html: `
        let currentUserId = null;
        let currentKalyanamId = null;

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

        async function investigate() {
          const query = document.getElementById('investigate-input').value.trim();
          if (!query) return;

          try {
            const res = await fetch('/api/v1/admin/lifeline?q=' + encodeURIComponent(query));
            const data = await res.json();
            if (!data.success) {
              alert(data.message || 'No records found');
              return;
            }

            const inv = data.investigation;
            const p = inv.payment;
            const u = inv.user;

            document.getElementById('res-order-id').innerText = p?.orderId || u?.orderId || 'N/A';
            document.getElementById('res-payment-id').innerText = p?.paymentId || u?.paymentId || 'Pending / N/A';
            document.getElementById('res-amount').innerText = p?.amount ? ('₹' + p.amount + ' ' + (p.currency || 'INR')) : '₹0';
            
            const statusEl = document.getElementById('res-status');
            const status = p?.status || (u?.paid ? 'captured' : 'created');
            statusEl.innerText = status.toUpperCase();
            statusEl.className = 'pill ' + (status === 'captured' ? 'pill-success' : (status === 'failed' ? 'pill-failed' : 'pill-warning'));

            const banner = document.getElementById('diag-banner');
            const isOk = status === 'captured' || u?.paid;
            banner.className = 'diag-banner ' + (isOk ? 'success' : '');
            document.getElementById('diag-category').innerText = inv.diagnostics?.failureCategory || 'Diagnostic Inspection';
            document.getElementById('diag-summary').innerText = inv.diagnostics?.diagnosticSummary || 'No failure detected.';
            document.getElementById('res-component').innerText = inv.diagnostics?.failedComponent || 'Razorpay Gateway';

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
            }
          } catch (err) {
            alert('Investigation request failed: ' + err.message);
          }
        }

        async function grantDevoteeAccess() {
          if (!currentUserId) return alert('Please search for a devotee first');
          const token = localStorage.getItem('poojanvidhi_admin_token') || prompt('Enter Admin Passkey:');
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
          const token = localStorage.getItem('poojanvidhi_admin_token') || prompt('Enter Admin Passkey:');
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

