export function renderTickets() { return `<div style="margin-top: 18px; display: flex; gap: 10px;">
                <button id="btn-ll-grant" class="btn btn-primary btn-sm" onclick="toggleLifelineUserAccess(true)">🔓 Grant Access</button>
                <button id="btn-ll-revoke" class="btn btn-outline-danger btn-sm" onclick="toggleLifelineUserAccess(false)">🔒 Revoke Access</button>
              </div>`; }
