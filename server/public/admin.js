const $ = i => document.getElementById(i), api = '/api/v1/';
const load = () => fetch(api + 'price').then(r => r.json()).then(d => $('cur').textContent = '₹' + d.price);
$('go').onclick = async () => {
  const r = await fetch(api + 'admin/price', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-admin-key': $('key').value }, body: JSON.stringify({ price: $('price').value }) });
  $('msg').textContent = r.ok ? 'Updated ✔' : (await r.json()).error; if (r.ok) load();
};
load();
