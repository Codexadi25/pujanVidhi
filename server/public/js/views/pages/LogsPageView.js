export function renderLogsPage() {
  return `<section id="tab-logs" class="tab-pane">
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

      <!-- PANEL 7: Pricing & Products Catalog -->`;
}
