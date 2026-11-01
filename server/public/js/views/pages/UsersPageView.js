export function renderUsersPage() {
  return `<section id="tab-users" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Devotee Access Control</h2>
            <p>Search devotee registrations, Kalyanam IDs, toggle paid status, and manage active plans.</p>
          </div>
        </div>

        <div class="search-filter-bar">
          <input type="text" id="users-search" class="input-control" placeholder="Search by Name, Email, Phone, Kalyanam ID..." oninput="debounceUsers()">
          <select id="users-status-filter" class="select-control" onchange="loadUsers(),
          loadSettings()">
            <option value="all">All Devotees</option>
            <option value="paid">Paid / Unlocked</option>
            <option value="pending">Pending Payment</option>
          </select>
        </div>

        <div class="card table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Devotee Name</th>
                <th>Kalyanam ID</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Plan</th>
                <th>Access Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="users-tbody">
              <tr><td colspan="8" class="text-center">Loading devotees...</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PANEL 9: Direct Support & Grievance Contacts -->`;
}
