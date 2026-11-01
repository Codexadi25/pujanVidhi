export function renderPricingPage() {
  return `<section id="tab-pricing" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Pricing & Products Catalog</h2>
            <p>Manage puja kit offerings, dynamic price updates, strikethrough rates, and features.</p>
          </div>
          <button class="btn btn-primary" onclick="openAddProductModal()">
            <span>+ Add New Product</span>
          </button>
        </div>

        <div class="card table-responsive">
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
        </div>
      </section>

      <!-- PANEL 8: Devotee & User Access Control -->`;
}
