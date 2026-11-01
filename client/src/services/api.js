const getApiBase = () => {
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '') + '/api/v1';
  }
  if (import.meta.env?.VITE_BACKEND_PORT) {
    const protocol = import.meta.env.VITE_BACKEND_PROTOCOL || 'http';
    const host = import.meta.env.VITE_BACKEND_HOST || 'localhost';
    return `${protocol}://${host}:${import.meta.env.VITE_BACKEND_PORT}/api/v1`;
  }
  if (typeof window !== 'undefined' && window.location.port === '5173') {
    return 'http://localhost:5000/api/v1';
  }
  return '/api/v1';
};
const API_BASE = getApiBase();

export const authStorage = {
  getToken: () => localStorage.getItem('pv_token') || '',
  setToken: (token) => {
    if (token) localStorage.setItem('pv_token', token);
    else localStorage.removeItem('pv_token');
  },
  getUser: () => {
    try {
      const data = localStorage.getItem('pv_user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => {
    if (user) localStorage.setItem('pv_user', JSON.stringify(user));
    else localStorage.removeItem('pv_user');
  },
  clear: () => {
    localStorage.removeItem('pv_token');
    localStorage.removeItem('pv_user');
  }
};

async function apiRequest(endpoint, options = {}) {
  const token = authStorage.getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  let res;
  try {
    res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
  } catch (err) {
    // If relative or configured API_BASE failed on dev port, try direct localhost:5000
    if (API_BASE !== 'http://localhost:5000/api/v1') {
      res = await fetch(`http://localhost:5000/api/v1${endpoint}`, {
        ...options,
        headers
      });
    } else {
      throw err;
    }
  }

  // If 404 on Vite proxy, retry with direct localhost:5000
  if (res && res.status === 404 && !API_BASE.includes('5000')) {
    try {
      const retryRes = await fetch(`http://localhost:5000/api/v1${endpoint}`, {
        ...options,
        headers
      });
      if (retryRes.ok || retryRes.status !== 404) {
        res = retryRes;
      }
    } catch {
      // ignore retry error
    }
  }

  const contentType = res.headers.get('content-type') || '';
  let data;
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const errorMsg = typeof data === 'object' && data?.message
      ? data.message
      : typeof data === 'string' && data
      ? data
      : `Request failed with status ${res.status}`;
    const error = new Error(errorMsg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  async register({ name, email, phone, password }) {
    const data = await apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, password })
    });
    if (data.token) authStorage.setToken(data.token);
    if (data.user) authStorage.setUser(data.user);
    return data;
  },

  async login({ email, password }) {
    const data = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) authStorage.setToken(data.token);
    if (data.user) authStorage.setUser(data.user);
    return data;
  },

  async access({ phone }) {
    const data = await apiRequest('/access', {
      method: 'POST',
      body: JSON.stringify({ phone })
    });
    if (data.token) authStorage.setToken(data.token);
    if (data.user) authStorage.setUser(data.user);
    return data;
  },

  async getMe() {
    const data = await apiRequest('/me');
    if (data.user) authStorage.setUser(data.user);
    return data;
  },

  async getProducts() {
    return apiRequest('/products');
  },

  async getSettings() {
    return apiRequest('/settings');
  },

  async createOrder({ plan, productId }) {
    return apiRequest('/order', {
      method: 'POST',
      body: JSON.stringify({ plan, productId })
    });
  },

  async verifyPayment({ orderId, paymentId, signature, plan, productId }) {
    const data = await apiRequest('/verify', {
      method: 'POST',
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        plan,
        productId
      })
    });
    if (data.user) authStorage.setUser(data.user);
    return data;
  },

  async payTest({ plan }) {
    const data = await apiRequest('/pay-test', {
      method: 'POST',
      body: JSON.stringify({ plan })
    });
    if (data.user) authStorage.setUser(data.user);
    return data;
  },

  async getContent() {
    return apiRequest('/content', {
      headers: { 'Accept': 'application/json' }
    });
  },

  async ping() {
    try {
      const data = await apiRequest('/ping');
      return data?.status === 1 || data === 1 || data === '1';
    } catch {
      try {
        const rootUrl = API_BASE.replace(/\/api\/v1\/?$/, '');
        const res = await fetch(`${rootUrl || ''}/ping`);
        const text = await res.text();
        return text === '1' || text.includes('"status":1');
      } catch {
        return false;
      }
    }
  },

  logout() {
    authStorage.clear();
  }
};

