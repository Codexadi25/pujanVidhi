export function renderOrders() { return `<div class="table-responsive">
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
          </div>`; }
