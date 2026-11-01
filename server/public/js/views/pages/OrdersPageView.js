export function renderOrdersPage() {
  return `<section id="tab-orders" class="tab-pane">
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

      <!-- PANEL 3: Lifeline Template & Investigation Engine -->`;
}
