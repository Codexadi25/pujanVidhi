export function renderTelemetryPage() {
  return `<section id="tab-telemetry" class="tab-pane active">
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

      <!-- PANEL 2: Orders & Payment Transactions -->`;
}
