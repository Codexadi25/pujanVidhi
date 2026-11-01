export function renderTicketsPage() {
  return `<section id="tab-tickets" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>PG Failure & Refund Support Tickets</h2>
            <p>Manage customer grievances where amount was deducted but payment dropped, reconciling with Razorpay 7-day SLA.</p>
          </div>
          <button class="btn btn-primary" onclick="openCreateTicketModal()">
            <span>+ Create Support Ticket</span>
          </button>
        </div>

        <div class="card" style="background: var(--bg-elevated); margin-bottom: 20px; padding: 18px 24px; border-left: 4px solid var(--amber);">
          <div style="display: flex; gap: 14px; align-items: center;">
            <span style="font-size: 1.5rem;">ℹ️</span>
            <div>
              <strong style="color: var(--text-main);">Razorpay Auto-Refund Protocol (5-7 Business Days):</strong>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">
                When a payment fails due to bank timeout, user cancellation, or domain risk check, Razorpay automatically pushes a reversal to the devotee's UPI / acquiring bank. If delayed beyond 7 days, check the Bank UTR / RRN or initiate a direct resolution.
              </div>
            </div>
          </div>
        </div>

        <div class="search-filter-bar">
          <input type="text" id="tickets-search" class="input-control" placeholder="Search Ticket ID, email, order ID, Bank UTR..." oninput="loadTickets()">
          <select id="tickets-issue-filter" class="select-control" onchange="loadTickets()">
            <option value="all">All Issue Categories</option>
            <option value="amount_debited_payment_failed">Amount Debited / Payment Failed</option>
            <option value="website_risk_check_blocked">Domain Mismatch (payment_risk_check_failed)</option>
            <option value="refund_not_received_7_days">Refund Delayed (> 7 Days)</option>
            <option value="double_debit">Double Debit</option>
            <option value="access_not_granted">Access Not Granted</option>
          </select>
          <select id="tickets-status-filter" class="select-control" onchange="loadTickets()">
            <option value="all">All Ticket Statuses</option>
            <option value="open">Open (Within 7-day window)</option>
            <option value="under_investigation">Under Investigation</option>
            <option value="refund_verified_pg">Verified by Razorpay PG</option>
            <option value="manual_refund_done">Manual UPI / Bank Refund Done</option>
            <option value="access_granted">Access Granted to Vidhi</option>
            <option value="resolved">Resolved / Closed</option>
          </select>
        </div>

        <div class="card table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Created</th>
                <th>Devotee Contact</th>
                <th>Order / Txn / Bank UTR</th>
                <th>Amount</th>
                <th>Issue Category</th>
                <th>Status</th>
                <th>SLA Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="tickets-tbody">
              <tr><td colspan="9" class="text-center">Loading dispute tickets...</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PANEL 5: Refunds & Reversals Console -->`;
}
