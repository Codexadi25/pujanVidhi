export function renderSettingsPage() {
  return `<section id="tab-settings" class="tab-pane">
        <div class="pane-header">
          <div>
            <h2>Direct Support & Grievance Contacts</h2>
            <p>Manage customer support WhatsApp helpline, support email, and statutory grievance officer credentials.</p>
          </div>
          <button class="btn btn-primary" onclick="saveSettings()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Save Changes to MongoDB
          </button>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px;">
          <!-- Form Section -->
          <div class="card" style="padding: 24px;">
            <h3 style="margin-top: 0; font-size: 1.1rem; color: var(--navy); display: flex; align-items: center; gap: 8px;">
              <span>⚙️</span> Platform Contact & Grievance Configuration
            </h3>
            
            <form id="settings-form" onsubmit="event.preventDefault(); saveSettings();">
              <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  CUSTOMER SUPPORT & WHATSAPP HELPLINE *
                </label>
                <input type="text" id="set-support-phone" class="input-control" placeholder="+919956355567" required oninput="updateSettingsPreview()">
                <small style="color: var(--text-muted); font-size: 0.75rem;">Displayed in checkout, website footer, and privacy policy support cards.</small>
              </div>

              <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  CUSTOMER SUPPORT EMAIL *
                </label>
                <input type="email" id="set-support-email" class="input-control" placeholder="thepoojanvidhi@gmail.com" required oninput="updateSettingsPreview()">
                <small style="color: var(--text-muted); font-size: 0.75rem;">General devotee support and assistance email address.</small>
              </div>

              <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  OFFICER IN CHARGE / GRIEVANCE OFFICER NAME *
                </label>
                <input type="text" id="set-grievance-officer" class="input-control" placeholder="Aditya Sahu" required oninput="updateSettingsPreview()">
                <small style="color: var(--text-muted); font-size: 0.75rem;">Statutory Grievance Officer name as required by Information Technology Rules.</small>
              </div>

              <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  OFFICIAL GRIEVANCE OFFICER EMAIL *
                </label>
                <input type="email" id="set-grievance-email" class="input-control" placeholder="aditya.sahu2557@gmail.com" required oninput="updateSettingsPreview()">
                <small style="color: var(--text-muted); font-size: 0.75rem;">Direct grievance and legal compliance correspondence email.</small>
              </div>

              <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
                  REGISTERED ENTITY / COMPANY NAME *
                </label>
                <input type="text" id="set-entity-name" class="input-control" placeholder="पूजनविधि (PoojanVidhi / Kalyanam Sacred Services)" required oninput="updateSettingsPreview()">
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 700;">
                Update & Publish Platform Contacts
              </button>
            </form>
          </div>

          <!-- Live Preview Box (Matches User's Screenshots) -->
          <div>
            <div class="card" style="padding: 20px; background: #fffcf6; border: 1.5px solid #ecdcc6; border-radius: 12px; margin-bottom: 16px;">
              <h4 style="margin: 0 0 10px; color: #8f211c; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
                <span>📱</span> Live Storefront & Privacy Preview
              </h4>
              <p style="font-size: 0.8rem; color: #6d5345; margin-bottom: 14px;">
                Here is how your contacts will immediately render on <strong>poojanvidhi.web.app</strong>:
              </p>

              <!-- Preview 1: Direct Support & Grievance Contacts Box -->
              <div style="background: #fff; border: 1px solid #ebd9bf; border-radius: 8px; padding: 14px; margin-bottom: 14px;">
                <div style="font-size: 0.85rem; font-weight: 700; color: #8f211c; margin-bottom: 6px;">
                  Direct Support &amp; Grievance Contacts
                </div>
                <div style="font-size: 0.75rem; color: #795d4f; margin-bottom: 10px;">
                  CUSTOMER SUPPORT &amp; WHATSAPP:<br>
                  <strong style="color: #8f211c;" id="prev-support-phone">+919956355567</strong>
                </div>
                <div style="font-size: 0.75rem; color: #795d4f;">
                  OFFICIAL GRIEVANCE OFFICER EMAIL:<br>
                  <strong style="color: #8f211c;" id="prev-grievance-email">aditya.sahu2557@gmail.com</strong>
                </div>
              </div>

              <!-- Preview 2: Statutory Grievance Details Box -->
              <div style="background: #fff; border: 1px solid #ebd9bf; border-radius: 8px; padding: 14px;">
                <div style="font-size: 0.78rem; color: #4a3328; line-height: 1.6;">
                  <strong>Officer in Charge:</strong> <span id="prev-officer-name">Aditya Sahu</span><br>
                  <strong>Entity:</strong> <span id="prev-entity-name">पूजनविधि (PoojanVidhi / Kalyanam Sacred Services)</span><br>
                  <strong>Support Helpline:</strong> <span id="prev-support-phone-2">+919956355567</span><br>
                  <strong>Support &amp; Grievance Email:</strong> <span id="prev-grievance-email-2">aditya.sahu2557@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;
}
