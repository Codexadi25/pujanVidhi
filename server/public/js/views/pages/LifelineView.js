export function renderLifeline() { return `<div class="card table-responsive">
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
        </div>`; }
