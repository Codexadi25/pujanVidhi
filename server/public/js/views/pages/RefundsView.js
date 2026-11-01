export function renderRefunds() { return `<div class="card table-responsive">
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
        </div>`; }
