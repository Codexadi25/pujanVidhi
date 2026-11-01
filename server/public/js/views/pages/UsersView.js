export function renderUsers() { return `<div class="card table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product Name & Subtitle</th>
                <th>Price (₹)</th>
                <th>Original Price (₹)</th>
                <th>Plan Key</th>
                <th>Badge</th>
                <th>Video Access</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="pricing-tbody">
              <tr><td colspan="8" class="text-center">Loading products catalog...</td></tr>
            </tbody>
          </table>
        </div>`; }
