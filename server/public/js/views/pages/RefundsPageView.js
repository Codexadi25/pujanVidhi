export function renderRefundsPage() {
  return `<section id="tab-refunds" class="tab-pane">
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

      <!-- PANEL 6: Platform Audit & Security Event Logs -->`;
}
