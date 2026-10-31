const getApiBase = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '') + '/api/v1';
  }
  if (typeof window !== 'undefined' && window.location.port === '5173') {
    return 'http://localhost:5000/api/v1';
  }
  return '/api/v1';
};
const API_BASE = getApiBase();

export const adminStorage = {
  getKey: () => sessionStorage.getItem('pv_admin_key') || localStorage.getItem('pv_admin_key') || '',
  setKey: (key) => {
    if (key) {
      sessionStorage.setItem('pv_admin_key', key);
      localStorage.setItem('pv_admin_key', key);
    } else {
      sessionStorage.removeItem('pv_admin_key');
      localStorage.removeItem('pv_admin_key');
    }
  },
  clear: () => {
    sessionStorage.removeItem('pv_admin_key');
    localStorage.removeItem('pv_admin_key');
  }
};

async function adminRequest(endpoint, options = {}) {
  const adminKey = adminStorage.getKey();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(adminKey ? { 'x-admin-key': adminKey } : {}),
    ...(options.headers || {})
  };

  let res;
  try {
    res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
  } catch (err) {
    // Try relative endpoint if API_BASE failed
    res = await fetch(endpoint, {
      ...options,
      headers
    });
  }

  // Fallback if 404
  if (res && res.status === 404) {
    const alternativeUrls = [
      endpoint,
      `/api${endpoint}`,
      endpoint.startsWith('/admin') ? endpoint : `/admin${endpoint}`
    ];
    for (const alt of alternativeUrls) {
      try {
        const altRes = await fetch(alt, { ...options, headers });
        if (altRes.ok || (altRes.status !== 404 && altRes.status !== 502)) {
          res = altRes;
          break;
        }
      } catch {
        // continue
      }
    }
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = data?.message || data?.error || `Admin API Error (${res.status})`;
    const error = new Error(errorMsg);
    error.status = res.status;
    throw error;
  }

  return data;
}

export const adminApi = {
  async login(adminKey) {
    const data = await adminRequest('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ adminKey })
    });
    if (data.adminKey) adminStorage.setKey(data.adminKey);
    return data;
  },

  async getStats() {
    return adminRequest('/admin/stats');
  },

  async getUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return adminRequest(`/admin/users${query ? `?${query}` : ''}`);
  },

  async getUserDetails(id) {
    return adminRequest(`/admin/users/${id}`);
  },

  async toggleUserPaid(id, data = {}) {
    return adminRequest(`/admin/users/${id}/toggle-paid`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  async getProducts() {
    return adminRequest('/admin/products');
  },

  async addProduct(productData) {
    return adminRequest('/admin/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  async updateProduct(id, productData) {
    return adminRequest(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData)
    });
  },

  async deleteProduct(id) {
    return adminRequest(`/admin/products/${id}`, {
      method: 'DELETE'
    });
  },

  async getContent() {
    return adminRequest('/admin/content');
  },

  async updateContent(content) {
    return adminRequest('/admin/content', {
      method: 'PUT',
      body: JSON.stringify({ content })
    });
  },

  logout() {
    adminStorage.clear();
  }
};

