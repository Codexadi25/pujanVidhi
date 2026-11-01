import { renderTelemetryPage } from './views/pages/TelemetryPageView.js';
import { renderOrdersPage } from './views/pages/OrdersPageView.js';
import { renderLifelinePage } from './views/pages/LifelinePageView.js';
import { renderTicketsPage } from './views/pages/TicketsPageView.js';
import { renderRefundsPage } from './views/pages/RefundsPageView.js';
import { renderLogsPage } from './views/pages/LogsPageView.js';
import { renderPricingPage } from './views/pages/PricingPageView.js';
import { renderUsersPage } from './views/pages/UsersPageView.js';
import { renderSettingsPage } from './views/pages/SettingsPageView.js';
import { renderTopbar } from './views/components/TopbarView.js';
import { renderNav } from './views/components/NavView.js';
import { renderModals } from './views/components/ModalsView.js';
import { renderAuthPage } from './views/components/AuthPageView.js';

// Mount all modular views into DOM Shell
function mountAdminApp() {
  const authContainer = document.getElementById('auth-screen-container');
  if (authContainer) authContainer.innerHTML = renderAuthPage();

  const topbarContainer = document.getElementById('topbar-container');
  if (topbarContainer) topbarContainer.innerHTML = renderTopbar();

  const navContainer = document.getElementById('nav-container');
  if (navContainer) navContainer.innerHTML = renderNav();

  const pagesContainer = document.getElementById('pages-container');
  if (pagesContainer) {
    pagesContainer.innerHTML = [
      renderTelemetryPage(),
      renderOrdersPage(),
      renderLifelinePage(),
      renderTicketsPage(),
      renderRefundsPage(),
      renderLogsPage(),
      renderPricingPage(),
      renderUsersPage(),
      renderSettingsPage()
    ].join('\n');
  }

  const modalsContainer = document.getElementById('modals-container');
  if (modalsContainer) modalsContainer.innerHTML = renderModals();
}

mountAdminApp();

// State Management
    let adminToken = localStorage.getItem('poojanvidhi_admin_token') || '';
    let currentTab = 'telemetry';
    let logsPage = 1;
    let inlineInvestigateUserId = null;

    // Toast Notification
    function showToast(msg, isSuccess = true) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = (isSuccess ? '✅ ' : '⚠️ ') + msg;
      container.appendChild(toast);
      setTimeout(() => { toast.remove(); }, 3000);
    }

    function copyChip(el) {
      const text = el.innerText.trim();
      if (!text || text === '--') return;
      navigator.clipboard.writeText(text);
      showToast('Copied: ' + text);
    }

    // Strivers Theme Service: Light & Dark Mode
    function getActiveTheme() {
      return localStorage.getItem('poojanvidhi_admin_theme') || 'dark';
    }

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('poojanvidhi_admin_theme', theme);
      const label = document.getElementById('theme-mode-label');
      if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }

    function toggleTheme() {
      const next = getActiveTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      showToast('Theme switched to ' + next + ' mode');
    }

    // Initialize Theme
    applyTheme(getActiveTheme());

    // Live Clock
    setInterval(() => {
      const clock = document.getElementById('server-clock');
      if (clock) {
        const d = new Date();
        clock.textContent = d.toLocaleTimeString('en-IN', { hour12: true });
      }
    }, 1000);

    // API Request Wrapper
    async function apiRequest(endpoint, options = {}) {
      const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
      if (adminToken) headers['Authorization'] = 'Bearer ' + adminToken;
      
      const res = await fetch(endpoint, { ...options, headers });
      if (res.status === 401) {
        showAuthScreen();
        throw new Error('Unauthorized');
      }
      return res.json();
    }

    function showAuthScreen() {
      document.getElementById('auth-overlay').style.display = 'flex';
    }

    function hideAuthScreen() {
      document.getElementById('auth-overlay').style.display = 'none';
    }

    async function handleAuthSubmit(e) {
      e.preventDefault();
      const key = document.getElementById('auth-input-key').value.trim();
      const errEl = document.getElementById('auth-error');
      errEl.style.display = 'none';

      try {
        const res = await fetch('/api/v1/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminKey: key })
        });
        const data = await res.json();
        if (data.success && data.token) {
          adminToken = data.token;
          localStorage.setItem('poojanvidhi_admin_token', adminToken);
          hideAuthScreen();
          showToast('Authenticated as Master Admin');
          syncLiveData();
        } else {
          errEl.textContent = data.message || 'Invalid passkey';
          errEl.style.display = 'block';
        }
      } catch (err) {
        errEl.textContent = 'Auth request failed: ' + err.message;
        errEl.style.display = 'block';
      }
    }

    function handleLogout() {
      adminToken = '';
      localStorage.removeItem('poojanvidhi_admin_token');
      showToast('Logged out');
      showAuthScreen();
    }

    // Modal Helpers
    function openModal(id) {
      document.getElementById(id).classList.add('active');
    }
    function closeModal(id) {
      document.getElementById(id).classList.remove('active');
    }

    function openPasswordModal() { openModal('modal-password'); }
    function openAddProductModal() {
      document.getElementById('product-modal-title').innerText = 'Add New Product';
      document.getElementById('prod-id').value = '';
      document.getElementById('prod-name').value = '';
      document.getElementById('prod-subtitle').value = '';
      document.getElementById('prod-price').value = '';
      document.getElementById('prod-orig-price').value = '';
      document.getElementById('prod-badge').value = '';
      document.getElementById('prod-features').value = '';
      document.getElementById('prod-video').checked = false;
      document.getElementById('prod-active').checked = true;
      openModal('modal-product');
    }
    function openCreateTicketModal() { openModal('modal-ticket'); }
    function openDirectRefundModal() { openModal('modal-refund'); }

    // Tab Navigation
    function switchTab(tabId) {
      currentTab = tabId;
      document.querySelectorAll('.nav-item').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tabId);
      });
      document.querySelectorAll('.tab-pane').forEach(p => {
        p.classList.toggle('active', p.id === 'tab-' + tabId);
      });

      if (tabId === 'telemetry') loadTelemetry();
      else if (tabId === 'orders') loadOrders();
      else if (tabId === 'tickets') loadTickets();
      else if (tabId === 'refunds') loadRefunds();
      else if (tabId === 'logs') loadLogs();
      else if (tabId === 'pricing') loadPricing();
      else if (tabId === 'users') loadUsers();
      else if (tabId === 'settings') loadSettings();
    }

    // Sync Live Data
    async function syncLiveData() {
      const icon = document.getElementById('sync-icon');
      if (icon) icon.style.animation = 'pulseAnim 0.8s infinite';
      try {
        await Promise.all([
          loadTelemetry(),
          loadOrders(),
          loadTickets(),
          loadRefunds(),
          loadLogs(),
          loadPricing(),
          loadUsers()
        ]);
        showToast('All platforms & ledgers synced');
      } catch (e) {
        console.warn('Sync notice:', e);
      } finally {
        if (icon) icon.style.animation = '';
      }
    }

    // 1. TELEMETRY PANEL
    async function loadTelemetry() {
      try {
        const data = await apiRequest('/api/v1/admin/telemetry');
        if (!data.success) return;

        const tel = data.telemetry;
        document.getElementById('kpi-revenue').textContent = '₹' + (tel.kpis?.totalRevenue || 0).toLocaleString('en-IN');
        document.getElementById('kpi-transactions').textContent = tel.kpis?.capturedPayments || 0;
        document.getElementById('kpi-devotees').textContent = tel.kpis?.activeDevotees || 0;
        document.getElementById('kpi-tickets').textContent = tel.kpis?.openTickets || 0;
        document.getElementById('kpi-logs').textContent = tel.kpis?.totalLogs || 0;

        document.getElementById('topbar-port').textContent = tel.server?.port + ' (Express)';
        document.getElementById('topbar-mongo').textContent = tel.database?.status || 'Connected';
        document.getElementById('topbar-razorpay').textContent = tel.gateway?.status || 'Live';

        document.getElementById('tel-node').textContent = tel.server?.nodeVersion;
        document.getElementById('tel-port').textContent = tel.server?.port;
        document.getElementById('tel-uptime').textContent = tel.server?.uptimeFormatted;
        document.getElementById('tel-mem-rss').textContent = tel.server?.memoryRssMb + ' MB';
        document.getElementById('tel-mem-heap').textContent = tel.server?.memoryHeapUsedMb + ' MB';
        document.getElementById('tel-platform').textContent = tel.server?.platform;

        document.getElementById('tel-mongo-status').textContent = tel.database?.status;
        document.getElementById('tel-db-name').textContent = tel.database?.name;
        document.getElementById('tel-key-id').textContent = tel.gateway?.keyIdMasked || 'rzp_live_••••••';

        // Render recent activities
        const tbody = document.getElementById('telemetry-activities-tbody');
        if (tel.recentActivities && tel.recentActivities.length > 0) {
          tbody.innerHTML = tel.recentActivities.map(a => `
            <tr>
              <td><span class="badge ${getEventBadgeClass(a.action)}">${a.action}</span></td>
              <td><strong>${escapeHtml(a.userEmail || 'admin')}</strong></td>
              <td><code>${escapeHtml(a.ipAddress || '127.0.0.1')}</code></td>
              <td class="text-muted">${new Date(a.createdAt).toLocaleString('en-IN')}</td>
              <td><span class="code-cell" title='${escapeHtml(JSON.stringify(a.metaData || {}))}'>${escapeHtml(JSON.stringify(a.metaData || {}).substring(0, 45))}</span></td>
            </tr>
          `).join('');
        } else {
          tbody.innerHTML = '<tr><td colspan="5" class="text-center">No recent activities recorded.</td></tr>';
        }
      } catch (err) {
        console.error('Telemetry error:', err);
      }
    }

    // 2. ORDERS PANEL
    let ordersDebounce = null;
    function debounceOrders() {
      clearTimeout(ordersDebounce);
      ordersDebounce = setTimeout(loadOrders, 300);
    }

    async function loadOrders() {
      const q = document.getElementById('orders-search').value.trim();
      const status = document.getElementById('orders-status-filter').value;
      const tbody = document.getElementById('orders-tbody');

      try {
        const url = `/api/v1/admin/orders?q=${encodeURIComponent(q)}&status=${status}`;
        const data = await apiRequest(url);
        if (!data.orders || data.orders.length === 0) {
          tbody.innerHTML = '<tr><td colspan="9" class="text-center">No transactions found matching criteria.</td></tr>';
          return;
        }

        tbody.innerHTML = data.orders.map(o => `
          <tr>
            <td><span class="click-chip" onclick="copyChip(this)" title="Click to copy Order ID">${escapeHtml(o.orderId || 'N/A')}</span></td>
            <td><span class="click-chip" onclick="copyChip(this)" title="Click to copy Payment ID">${escapeHtml(o.paymentId || 'N/A')}</span></td>
            <td>
              <strong>${escapeHtml(o.userName || 'Devotee')}</strong>
              <div style="font-size: 0.76rem; color: var(--text-muted);">${escapeHtml(o.userEmail || o.userPhone || '')}</div>
            </td>
            <td><span class="click-chip" onclick="copyChip(this)">${escapeHtml(o.kalyanamId || 'N/A')}</span></td>
            <td><strong>₹${o.amount || 0}</strong></td>
            <td><span class="code-cell">${o.plan === 'video_kit' ? 'Video Kit' : 'Digital Kit'}</span></td>
            <td><span class="badge ${o.status === 'captured' ? 'badge-success' : (o.status === 'failed' ? 'badge-danger' : (o.status === 'refunded' ? 'badge-warning' : 'badge-secondary'))}">${escapeHtml(o.status || 'created')}</span></td>
            <td class="text-muted" style="font-size: 0.78rem;">${new Date(o.createdAt).toLocaleString('en-IN')}</td>
            <td>
              <button class="btn btn-secondary btn-xs" onclick="investigateOrder('${escapeHtml(o.orderId)}')">🔍 Diagnose</button>
            </td>
          </tr>
        `).join('');
      } catch (err) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center" style="color: var(--danger-text);">Failed to load orders: ${err.message}</td></tr>`;
      }
    }

    function investigateOrder(orderId) {
      switchTab('lifeline');
      document.getElementById('inline-lifeline-input').value = orderId;
      runInlineInvestigation();
    }

    // 3. LIFELINE INLINE INVESTIGATION
    async function runInlineInvestigation() {
      const q = document.getElementById('inline-lifeline-input').value.trim();
      if (!q) return;

      try {
        const data = await apiRequest('/api/v1/admin/lifeline?q=' + encodeURIComponent(q));
        if (!data.success) {
          showToast(data.message || 'No records found', false);
          return;
        }

        const inv = data.investigation;
        const p = inv.payment;
        const u = inv.user;

        document.getElementById('inline-lifeline-result').style.display = 'block';
        document.getElementById('ll-order-id').innerText = p?.orderId || u?.orderId || 'N/A';
        document.getElementById('ll-payment-id').innerText = p?.paymentId || u?.paymentId || 'Pending / N/A';
        document.getElementById('ll-amount').innerText = p?.amount ? ('₹' + p.amount + ' ' + (p.currency || 'INR')) : '₹0';
        
        const status = p?.status || (u?.paid ? 'captured' : 'created');
        const stEl = document.getElementById('ll-status');
        stEl.innerText = status.toUpperCase();
        stEl.className = 'badge ' + (status === 'captured' ? 'badge-success' : (status === 'failed' ? 'badge-danger' : 'badge-warning'));

        const banner = document.getElementById('ll-diag-banner');
        const isOk = status === 'captured' || u?.paid;
        banner.style.background = isOk ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)';
        banner.style.borderLeftColor = isOk ? '#10b981' : '#ef4444';
        document.getElementById('ll-diag-category').innerText = inv.diagnostics?.failureCategory || 'Diagnostic Overview';
        document.getElementById('ll-diag-summary').innerText = inv.diagnostics?.diagnosticSummary || 'No errors reported.';
        document.getElementById('ll-component').innerText = inv.diagnostics?.failedComponent || 'Razorpay PG';

        if (u) {
          inlineInvestigateUserId = u._id;
          document.getElementById('ll-dev-name').innerText = u.name || 'Devotee';
          document.getElementById('ll-dev-kalyanam').innerText = u.kalyanamId || 'N/A';
          document.getElementById('ll-dev-email').innerText = u.email || 'N/A';
          document.getElementById('ll-dev-phone').innerText = u.phone || 'N/A';
          document.getElementById('ll-dev-plan').innerText = u.plan === 'video_kit' ? 'Complete Video Kit' : 'Digital Kit';
          
          const accEl = document.getElementById('ll-dev-access');
          accEl.innerText = u.paid ? 'UNLOCKED / PAID' : 'PENDING PAYMENT';
          accEl.className = 'badge ' + (u.paid ? 'badge-success' : 'badge-warning');
        }
      } catch (err) {
        showToast('Investigation error: ' + err.message, false);
      }
    }

    async function toggleLifelineUserAccess(paid) {
      if (!inlineInvestigateUserId) return showToast('Please search for a devotee first', false);
      try {
        const d = await apiRequest(`/api/v1/admin/users/${inlineInvestigateUserId}/toggle-paid`, {
          method: 'PUT',
          body: JSON.stringify({ paid })
        });
        if (d.success) {
          showToast(paid ? 'Devotee access granted' : 'Access revoked');
          runInlineInvestigation();
        }
      } catch (e) {
        showToast(e.message, false);
      }
    }

    // 4. TICKETS PANEL
    async function loadTickets() {
      const q = document.getElementById('tickets-search').value.trim();
      const issueType = document.getElementById('tickets-issue-filter').value;
      const status = document.getElementById('tickets-status-filter').value;
      const tbody = document.getElementById('tickets-tbody');

      try {
        const url = `/api/v1/admin/tickets?q=${encodeURIComponent(q)}&issueType=${issueType}&status=${status}`;
        const data = await apiRequest(url);
        if (!data.tickets || data.tickets.length === 0) {
          tbody.innerHTML = '<tr><td colspan="9" class="text-center">No support tickets found.</td></tr>';
          return;
        }

        tbody.innerHTML = data.tickets.map(t => `
          <tr>
            <td><span class="click-chip" onclick="copyChip(this)">${escapeHtml(t.ticketId)}</span></td>
            <td class="text-muted" style="font-size: 0.78rem;">${new Date(t.createdAt).toLocaleDateString('en-IN')}</td>
            <td>
              <strong>${escapeHtml(t.customerName || 'Devotee')}</strong>
              <div style="font-size: 0.76rem; color: var(--text-muted);">${escapeHtml(t.userEmail)}</div>
            </td>
            <td>
              <span class="click-chip" onclick="copyChip(this)">${escapeHtml(t.razorpayOrderId)}</span>
              ${t.bankRrn ? `<div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">UTR: ${escapeHtml(t.bankRrn)}</div>` : ''}
            </td>
            <td><strong>₹${t.amount}</strong></td>
            <td><span class="code-cell">${escapeHtml(t.issueType)}</span></td>
            <td><span class="badge ${getTicketBadgeClass(t.status)}">${escapeHtml(t.status)}</span></td>
            <td style="font-size: 0.78rem;">${new Date(t.slaDeadline).toLocaleDateString('en-IN')}</td>
            <td>
              <button class="btn btn-secondary btn-xs" onclick="openUpdateTicketModal('${t._id}', '${t.status}', '${escapeHtml(t.adminRemarks || '')}')">Update</button>
            </td>
          </tr>
        `).join('');
      } catch (err) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center" style="color: var(--danger-text);">${err.message}</td></tr>`;
      }
    }

    function openUpdateTicketModal(id, status, remarks) {
      document.getElementById('upt-ticket-id').value = id;
      document.getElementById('upt-status').value = status;
      document.getElementById('upt-remarks').value = remarks;
      openModal('modal-update-ticket');
    }

    async function handleUpdateTicket(e) {
      e.preventDefault();
      const id = document.getElementById('upt-ticket-id').value;
      const status = document.getElementById('upt-status').value;
      const adminRemarks = document.getElementById('upt-remarks').value;

      try {
        const res = await apiRequest(`/api/v1/admin/tickets/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status, adminRemarks })
        });
        if (res.success) {
          showToast('Ticket updated successfully');
          closeModal('modal-update-ticket');
          loadTickets();
        }
      } catch (err) {
        showToast(err.message, false);
      }
    }

    async function handleCreateTicket(e) {
      e.preventDefault();
      const payload = {
        userEmail: document.getElementById('tck-email').value.trim(),
        customerName: document.getElementById('tck-name').value.trim(),
        userPhone: document.getElementById('tck-phone').value.trim(),
        razorpayOrderId: document.getElementById('tck-order').value.trim(),
        amount: Number(document.getElementById('tck-amount').value),
        razorpayPaymentId: document.getElementById('tck-payid').value.trim(),
        issueType: document.getElementById('tck-issue').value,
        description: document.getElementById('tck-desc').value.trim()
      };

      try {
        const res = await apiRequest('/api/v1/admin/tickets', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        if (res.success) {
          showToast('Dispute ticket ' + res.ticket.ticketId + ' filed successfully');
          closeModal('modal-ticket');
          loadTickets();
        }
      } catch (err) {
        showToast(err.message, false);
      }
    }

    // 5. REFUNDS PANEL
    async function loadRefunds() {
      const tbody = document.getElementById('refunds-tbody');
      try {
        const data = await apiRequest('/api/v1/admin/refunds');
        if (!data.refunds || data.refunds.length === 0) {
          tbody.innerHTML = '<tr><td colspan="8" class="text-center">No refund records logged yet.</td></tr>';
          return;
        }

        tbody.innerHTML = data.refunds.map(r => `
          <tr>
            <td><span class="click-chip" onclick="copyChip(this)">${escapeHtml(r._id)}</span></td>
            <td><span class="click-chip" onclick="copyChip(this)">${escapeHtml(r.orderId)}</span></td>
            <td><strong>${escapeHtml(r.userEmail || 'N/A')}</strong></td>
            <td><strong style="color: var(--danger-text);">₹${r.amount}</strong></td>
            <td>${escapeHtml(r.reason)}</td>
            <td><span class="code-cell">${escapeHtml(r.method)}</span></td>
            <td><span class="badge badge-success">${escapeHtml(r.status)}</span></td>
            <td class="text-muted" style="font-size: 0.78rem;">${new Date(r.createdAt).toLocaleString('en-IN')}</td>
          </tr>
        `).join('');
      } catch (err) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="color: var(--danger-text);">${err.message}</td></tr>`;
      }
    }

    async function handleProcessRefund(e) {
      e.preventDefault();
      const orderId = document.getElementById('rf-order-id').value.trim();
      const amount = document.getElementById('rf-amount').value.trim();
      const reason = document.getElementById('rf-reason').value.trim();

      try {
        const res = await apiRequest('/api/v1/admin/refunds/process', {
          method: 'POST',
          body: JSON.stringify({ orderId, amount: amount ? Number(amount) : undefined, reason })
        });
        if (res.success) {
          showToast(res.message);
          closeModal('modal-refund');
          loadRefunds();
          loadOrders();
        }
      } catch (err) {
        showToast(err.message, false);
      }
    }

    // 6. LOGS PANEL
    let logsDebounce = null;
    function debounceLogs() {
      clearTimeout(logsDebounce);
      logsDebounce = setTimeout(loadLogs, 300);
    }

    function changeLogsPage(delta) {
      logsPage = Math.max(1, logsPage + delta);
      document.getElementById('logs-page-indicator').textContent = 'Page ' + logsPage;
      loadLogs();
    }

    async function loadLogs() {
      const q = document.getElementById('logs-search').value.trim();
      const action = document.getElementById('logs-action-filter').value;
      const tbody = document.getElementById('logs-tbody');

      try {
        const url = `/api/v1/admin/logs?page=${logsPage}&limit=20&q=${encodeURIComponent(q)}&action=${action}`;
        const data = await apiRequest(url);
        if (!data.logs || data.logs.length === 0) {
          tbody.innerHTML = '<tr><td colspan="5" class="text-center">No audit events found.</td></tr>';
          return;
        }

        tbody.innerHTML = data.logs.map(l => `
          <tr>
            <td class="text-muted" style="font-size: 0.78rem;">${new Date(l.createdAt).toLocaleString('en-IN')}</td>
            <td><span class="badge ${getEventBadgeClass(l.action)}">${escapeHtml(l.action)}</span></td>
            <td><strong>${escapeHtml(l.userEmail || 'admin')}</strong></td>
            <td><code>${escapeHtml(l.ipAddress || '127.0.0.1')}</code></td>
            <td><span class="code-cell" title='${escapeHtml(JSON.stringify(l.metaData || {}))}'>${escapeHtml(JSON.stringify(l.metaData || {}).substring(0, 60))}</span></td>
          </tr>
        `).join('');
      } catch (err) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center" style="color: var(--danger-text);">${err.message}</td></tr>`;
      }
    }

    // 7. PRICING PANEL
    async function loadPricing() {
      const tbody = document.getElementById('pricing-tbody');
      try {
        const data = await apiRequest('/api/v1/admin/products');
        if (!data.products || data.products.length === 0) {
          tbody.innerHTML = '<tr><td colspan="8" class="text-center">No products found.</td></tr>';
          return;
        }

        tbody.innerHTML = data.products.map(p => `
          <tr>
            <td>
              <strong>${escapeHtml(p.name)}</strong>
              <div style="font-size: 0.76rem; color: var(--text-muted);">${escapeHtml(p.subtitle || '')}</div>
            </td>
            <td>
              <input type="number" value="${p.price}" style="width: 75px; padding: 4px; border-radius: 4px; font-weight: 700; background: var(--bg-input); border: 1px solid var(--border-strong); color: var(--text-main);" onchange="updateProductPrice('${p._id}', this.value)">
            </td>
            <td><span class="text-muted" style="text-decoration: line-through;">₹${p.origPrice || '--'}</span></td>
            <td><span class="code-cell">${escapeHtml(p.type)}</span></td>
            <td><span class="badge badge-secondary">${escapeHtml(p.badge || '--')}</span></td>
            <td>${p.hasVideoAccess ? '✅ HD Video' : '📄 Guide Only'}</td>
            <td><span class="badge ${p.isActive ? 'badge-success' : 'badge-secondary'}">${p.isActive ? 'Active' : 'Draft'}</span></td>
            <td>
              <button class="btn btn-secondary btn-xs" onclick='openEditProductModal(${JSON.stringify(p).replace(/'/g, "&apos;")})'>Edit</button>
              <button class="btn btn-outline-danger btn-xs" onclick="deleteProduct('${p._id}')">Delete</button>
            </td>
          </tr>
        `).join('');
      } catch (err) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="color: var(--danger-text);">${err.message}</td></tr>`;
      }
    }

    async function updateProductPrice(id, newPrice) {
      try {
        const res = await apiRequest(`/api/v1/admin/products/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ price: Number(newPrice) })
        });
        if (res.success) showToast('Price updated to ₹' + newPrice);
      } catch (e) {
        showToast(e.message, false);
      }
    }

    function openEditProductModal(p) {
      document.getElementById('product-modal-title').innerText = 'Edit Product';
      document.getElementById('prod-id').value = p._id;
      document.getElementById('prod-name').value = p.name || '';
      document.getElementById('prod-subtitle').value = p.subtitle || '';
      document.getElementById('prod-price').value = p.price || '';
      document.getElementById('prod-orig-price').value = p.origPrice || '';
      document.getElementById('prod-type').value = p.type || 'digital_kit';
      document.getElementById('prod-badge').value = p.badge || '';
      document.getElementById('prod-features').value = (p.features || []).join('\n');
      document.getElementById('prod-video').checked = Boolean(p.hasVideoAccess);
      document.getElementById('prod-active').checked = Boolean(p.isActive);
      openModal('modal-product');
    }

    async function handleProductSubmit(e) {
      e.preventDefault();
      const id = document.getElementById('prod-id').value;
      const payload = {
        name: document.getElementById('prod-name').value.trim(),
        subtitle: document.getElementById('prod-subtitle').value.trim(),
        price: Number(document.getElementById('prod-price').value),
        origPrice: document.getElementById('prod-orig-price').value ? Number(document.getElementById('prod-orig-price').value) : null,
        type: document.getElementById('prod-type').value,
        badge: document.getElementById('prod-badge').value.trim(),
        features: document.getElementById('prod-features').value.split('\n').map(s => s.trim()).filter(Boolean),
        hasVideoAccess: document.getElementById('prod-video').checked,
        isActive: document.getElementById('prod-active').checked
      };

      try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/v1/admin/products/${id}` : '/api/v1/admin/products';
        const res = await apiRequest(url, { method, body: JSON.stringify(payload) });
        if (res.success) {
          showToast(id ? 'Product updated' : 'Product created');
          closeModal('modal-product');
          loadPricing();
        }
      } catch (err) {
        showToast(err.message, false);
      }
    }

    async function deleteProduct(id) {
      if (!confirm('Are you sure you want to delete this product?')) return;
      try {
        const res = await apiRequest(`/api/v1/admin/products/${id}`, { method: 'DELETE' });
        if (res.success) {
          showToast('Product removed');
          loadPricing();
        }
      } catch (err) {
        showToast(err.message, false);
      }
    }

    // 8. USERS PANEL
    let usersDebounce = null;
    function debounceUsers() {
      clearTimeout(usersDebounce);
      usersDebounce = setTimeout(loadUsers, 300);
    }

    async function loadUsers() {
      const q = document.getElementById('users-search').value.trim();
      const status = document.getElementById('users-status-filter').value;
      const tbody = document.getElementById('users-tbody');

      try {
        const url = `/api/v1/admin/users?q=${encodeURIComponent(q)}&status=${status}`;
        const data = await apiRequest(url);
        if (!data.users || data.users.length === 0) {
          tbody.innerHTML = '<tr><td colspan="8" class="text-center">No devotees found.</td></tr>';
          return;
        }

        tbody.innerHTML = data.users.map(u => `
          <tr>
            <td><strong>${escapeHtml(u.name || 'Devotee')}</strong></td>
            <td><span class="click-chip" onclick="copyChip(this)">${escapeHtml(u.kalyanamId || 'N/A')}</span></td>
            <td>${escapeHtml(u.email)}</td>
            <td>${escapeHtml(u.phone || 'N/A')}</td>
            <td>
              <select class="select-control" style="padding: 2px 6px; font-size: 0.78rem;" onchange="updateDevoteePlan('${u._id}', this.value)">
                <option value="digital_kit" ${u.plan === 'digital_kit' ? 'selected' : ''}>Digital Kit</option>
                <option value="video_kit" ${u.plan === 'video_kit' ? 'selected' : ''}>Video Kit</option>
              </select>
            </td>
            <td>
              <button class="btn btn-xs ${u.paid ? 'btn-primary' : 'btn-secondary'}" onclick="toggleDevoteePaid('${u._id}', ${!u.paid})">
                ${u.paid ? '✅ UNLOCKED' : '🔒 LOCKED'}
              </button>
            </td>
            <td class="text-muted" style="font-size: 0.78rem;">${new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
            <td>
              <button class="btn btn-outline-danger btn-xs" onclick="deleteDevotee('${u._id}')">Remove</button>
            </td>
          </tr>
        `).join('');
      } catch (err) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center" style="color: var(--danger-text);">${err.message}</td></tr>`;
      }
    }

    async function toggleDevoteePaid(id, paid) {
      try {
        const res = await apiRequest(`/api/v1/admin/users/${id}/toggle-paid`, {
          method: 'PUT',
          body: JSON.stringify({ paid })
        });
        if (res.success) {
          showToast(paid ? 'Devotee access granted' : 'Access revoked');
          loadUsers();
        }
      } catch (e) {
        showToast(e.message, false);
      }
    }

    async function updateDevoteePlan(id, plan) {
      try {
        const res = await apiRequest(`/api/v1/admin/users/${id}/plan`, {
          method: 'PUT',
          body: JSON.stringify({ plan, hasVideoAccess: plan === 'video_kit' })
        });
        if (res.success) showToast('Plan updated to ' + plan);
      } catch (e) {
        showToast(e.message, false);
      }
    }

    async function deleteDevotee(id) {
      if (!confirm('Are you sure you want to permanently remove this devotee?')) return;
      try {
        const res = await apiRequest(`/api/v1/admin/users/${id}`, { method: 'DELETE' });
        if (res.success) {
          showToast('Devotee removed');
          loadUsers();
        }
      } catch (e) {
        showToast(e.message, false);
      }
    }

    // Password Update
    async function handlePasswordChange(e) {
      e.preventDefault();
      const currentPassword = document.getElementById('pw-current').value;
      const newPassword = document.getElementById('pw-new').value;

      try {
        const res = await apiRequest('/api/v1/admin/change-password', {
          method: 'POST',
          body: JSON.stringify({ currentPassword, newPassword })
        });
        if (res.success) {
          adminToken = res.token;
          localStorage.setItem('poojanvidhi_admin_token', adminToken);
          showToast('Password updated and saved in MongoDB!');
          closeModal('modal-password');
          document.getElementById('pw-current').value = '';
          document.getElementById('pw-new').value = '';
        }
      } catch (err) {
        showToast(err.message, false);
      }
    }

    // Helpers
    function escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function getEventBadgeClass(action) {
      if (action.includes('SUCCESS') || action.includes('GRANTED')) return 'badge-success';
      if (action.includes('BREACH') || action.includes('REVOKED') || action.includes('FAILED')) return 'badge-danger';
      if (action.includes('PRICE') || action.includes('PASSWORD') || action.includes('REFUND')) return 'badge-warning';
      return 'badge-info';
    }

    function getTicketBadgeClass(status) {
      if (status === 'resolved' || status === 'refund_verified_pg' || status === 'access_granted') return 'badge-success';
      if (status === 'under_investigation') return 'badge-warning';
      if (status === 'open') return 'badge-danger';
      return 'badge-secondary';
    }

    // Initialize application on load
    window.addEventListener('DOMContentLoaded', () => {
      if (!adminToken) {
        showAuthScreen();
      } else {
        syncLiveData();
      }
    });
