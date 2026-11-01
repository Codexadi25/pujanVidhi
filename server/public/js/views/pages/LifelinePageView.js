 export function renderLifelinePage() {
  return `<section id="tab-lifeline" class="tab-pane">
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
      
</section>

      <!-- PANEL 4: PG Failure & Refund Support Tickets -->`;
}
