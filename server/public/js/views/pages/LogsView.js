export function renderLogs() { return `<div class="card table-responsive">
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
        </div>`; }
