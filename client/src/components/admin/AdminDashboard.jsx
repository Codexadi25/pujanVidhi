import React, { useState, useEffect } from 'react';
import {
  ThemeProvider, createTheme, CssBaseline, Box, Container, Grid, Paper,
  Typography, Button, IconButton, TextField, Tabs, Tab, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TablePagination, Chip,
  Switch, Dialog, DialogTitle, DialogContent, DialogActions, Card,
  CardContent, CardHeader, Divider, Alert, Snackbar, CircularProgress,
  InputAdornment, Select, MenuItem, FormControl, InputLabel,
  FormControlLabel, Tooltip, Stack, AppBar, Toolbar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory2 as ProductsIcon,
  People as UsersIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  ArrowBack as ArrowBackIcon,
  CurrencyRupee as RupeeIcon,
  PlayCircle as VideoIcon,
  Key as KeyIcon,
  ContentCopy as CopyIcon,
  Storefront as StoreIcon,
  Close as CloseIcon,
  MenuBook as MenuBookIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { adminApi, adminStorage } from '../../services/adminApi';

// Custom Material UI Theme matching Diwali brand aesthetic
const theme = createTheme({
  palette: {
    primary: {
      main: '#8f211c',
      dark: '#671410',
      light: '#b33e38',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#c69a43',
      dark: '#9c7325',
      light: '#e2ba6e',
      contrastText: '#351608'
    },
    background: {
      default: '#fbf7f0',
      paper: '#ffffff'
    },
    text: {
      primary: '#38231b',
      secondary: '#6d5345'
    },
    success: {
      main: '#2e7d32'
    },
    warning: {
      main: '#ed6c02'
    }
  },
  typography: {
    fontFamily: '"Lato", "Noto Sans Devanagari", sans-serif',
    h5: {
      fontWeight: 700,
      fontFamily: '"Cormorant Garamond", "Noto Serif Devanagari", serif'
    },
    h6: {
      fontWeight: 700,
      fontFamily: '"Cormorant Garamond", "Noto Serif Devanagari", serif'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 700
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: '1px solid #ebd9c8'
        }
      }
    }
  }
});

export default function AdminDashboard({ onBackToStore }) {
  const [adminKey, setAdminKey] = useState(adminStorage.getKey());
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(adminKey));
  const [keyInput, setKeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [currentTab, setCurrentTab] = useState(0);

  // Stats
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Products state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    subtitle: '',
    price: 51,
    origPrice: 199,
    badge: '',
    type: 'digital_kit',
    hasVideoAccess: false,
    isActive: true,
    featuresText: ''
  });

  // Users state
  const [users, setUsers] = useState([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userModalOpen, setUserModalOpen] = useState(false);

  // Content Editor state
  const [contentHtml, setContentHtml] = useState('');
  const [loadingContent, setLoadingContent] = useState(false);
  const [savingContent, setSavingContent] = useState(false);

  // Alerts
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  // Check key on mount
  useEffect(() => {
    if (adminKey) {
      loadAllData();
    }
  }, [adminKey]);

  const loadAllData = async () => {
    loadStats();
    loadProducts();
    loadUsers();
    loadContent();
  };

  const loadContent = async () => {
    try {
      setLoadingContent(true);
      const res = await adminApi.getContent();
      if (res?.content) setContentHtml(res.content);
    } catch (err) {
      console.warn('Failed to load content for editor:', err);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleSaveContent = async () => {
    try {
      setSavingContent(true);
      await adminApi.updateContent(contentHtml);
      showToast('Sacred Vidhi content updated and saved on server!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save content', 'error');
    } finally {
      setSavingContent(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      await adminApi.login(keyInput);
      setAdminKey(keyInput);
      setIsAuthenticated(true);
      showToast('Welcome, Administrator!', 'success');
    } catch (err) {
      setAuthError(err.message || 'Invalid Passkey. Please try again.');
    }
  };

  const handleAdminLogout = () => {
    adminApi.logout();
    setAdminKey('');
    setIsAuthenticated(false);
  };

  // Stats
  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const data = await adminApi.getStats();
      setStats(data);
    } catch (err) {
      if (err.status === 403) setIsAuthenticated(false);
    } finally {
      setLoadingStats(false);
    }
  };

  // Products
  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await adminApi.getProducts();
      setProducts(data.products || []);
    } catch (err) {
      showToast(err.message || 'Error fetching products', 'error');
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      subtitle: '',
      price: 51,
      origPrice: 199,
      badge: '',
      type: 'digital_kit',
      hasVideoAccess: false,
      isActive: true,
      featuresText: ''
    });
    setProductDialog(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name || '',
      subtitle: prod.subtitle || '',
      price: prod.price || 0,
      origPrice: prod.origPrice || 0,
      badge: prod.badge || '',
      type: prod.type || 'digital_kit',
      hasVideoAccess: Boolean(prod.hasVideoAccess),
      isActive: prod.isActive !== undefined ? prod.isActive : true,
      featuresText: Array.isArray(prod.features) ? prod.features.join('\n') : ''
    });
    setProductDialog(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: productForm.name,
        subtitle: productForm.subtitle,
        price: Number(productForm.price),
        origPrice: Number(productForm.origPrice),
        badge: productForm.badge,
        type: productForm.type,
        hasVideoAccess: productForm.hasVideoAccess,
        isActive: productForm.isActive,
        features: productForm.featuresText.split('\n').filter(f => f.trim())
      };

      if (editingProduct) {
        await adminApi.updateProduct(editingProduct._id, payload);
        showToast('Product updated successfully!');
      } else {
        await adminApi.addProduct(payload);
        showToast('New Product added successfully!');
      }

      setProductDialog(false);
      loadProducts();
      loadStats();
    } catch (err) {
      showToast(err.message || 'Failed to save product', 'error');
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await adminApi.deleteProduct(id);
      showToast('Product removed');
      loadProducts();
      loadStats();
    } catch (err) {
      showToast(err.message || 'Failed to delete product', 'error');
    }
  };

  // Users
  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const params = {
        q: searchQuery,
        status: userStatusFilter,
        page: page + 1,
        limit: rowsPerPage
      };
      const data = await adminApi.getUsers(params);
      setUsers(data.users || []);
      setTotalUsersCount(data.total || 0);
    } catch (err) {
      showToast(err.message || 'Error loading users', 'error');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        loadUsers();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, userStatusFilter, page, rowsPerPage, isAuthenticated]);

  const handleToggleUserPaid = async (user) => {
    try {
      const newStatus = !user.paid;
      await adminApi.toggleUserPaid(user._id, { paid: newStatus });
      showToast(`User marked as ${newStatus ? 'PAID' : 'PENDING'}`);
      loadUsers();
      loadStats();
    } catch (err) {
      showToast(err.message || 'Failed to update user', 'error');
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} copied to clipboard!`, 'info');
  };

  // If not authenticated, show Material UI Admin Passkey Card
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at 50% 40%, #fff7eb 0%, #ecd7be 100%)',
            p: 3
          }}
        >
          <Paper
            elevation={4}
            sx={{
              maxWidth: 440,
              width: '100%',
              p: 4,
              textAlign: 'center',
              border: '2px solid #c69a43'
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: '#8f211c15',
                color: 'primary.main',
                display: 'grid',
                placeItems: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <LockIcon sx={{ fontSize: 32 }} />
            </Box>

            <Typography variant="h5" color="primary" gutterBottom>
              Poojan Vidhi Admin
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your backend administrator passkey to access product management and user records.
            </Typography>

            {authError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {authError}
              </Alert>
            )}

            <form onSubmit={handleAdminLogin}>
              <TextField
                fullWidth
                type="password"
                label="Admin Passkey"
                placeholder="Enter passkey (e.g. admin@123)"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                autoFocus
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon sx={{ color: 'secondary.main' }} />
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                sx={{ py: 1.5, mb: 2 }}
              >
                Access Administration
              </Button>
            </form>

            <Button
              variant="text"
              color="inherit"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={onBackToStore}
            >
              Back to Storefront
            </Button>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
        {/* Top Navigation Bar */}
        <AppBar position="sticky" color="inherit" elevation={1} sx={{ bgcolor: '#fff9ef', borderBottom: '1px solid #e7d5c2' }}>
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  border: '1.5px solid #c69a43',
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#c69a43',
                  fontWeight: 800,
                  fontSize: 20
                }}
              >
                ॐ
              </Box>
              <Box>
                <Typography variant="h6" color="primary" sx={{ lineHeight: 1.2 }}>
                  Poojan Vidhi Admin
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, textTransform: 'uppercase' }}>
                  MVC Backend Control Center
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<StoreIcon />}
                onClick={onBackToStore}
              >
                Storefront
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleAdminLogout}
              >
                Logout
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {/* Main Navigation Tabs */}
          <Paper sx={{ mb: 3, bgcolor: '#fff' }}>
            <Tabs
              value={currentTab}
              onChange={(_, v) => setCurrentTab(v)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard Overview" />
              <Tab icon={<ProductsIcon />} iconPosition="start" label={`Products (${products.length})`} />
              <Tab icon={<UsersIcon />} iconPosition="start" label={`User Details (${totalUsersCount})`} />
              <Tab icon={<MenuBookIcon />} iconPosition="start" label="Vidhi Content Editor" />
            </Tabs>
          </Paper>

          {/* TAB 0: DASHBOARD OVERVIEW */}
          {currentTab === 0 && (
            <Box>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#8f211c15', color: 'primary.main' }}>
                      <UsersIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                        Total Users
                      </Typography>
                      <Typography variant="h5" color="primary">
                        {loadingStats ? <CircularProgress size={20} /> : (stats?.totalUsers || 0)}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#2e7d3215', color: 'success.main' }}>
                      <CheckCircleIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                        Paid Members
                      </Typography>
                      <Typography variant="h5" color="success.main">
                        {loadingStats ? <CircularProgress size={20} /> : (stats?.paidUsers || 0)}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#c69a4320', color: 'secondary.dark' }}>
                      <RupeeIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                        Total Revenue
                      </Typography>
                      <Typography variant="h5" color="secondary.dark">
                        {loadingStats ? <CircularProgress size={20} /> : `₹${stats?.estimatedRevenue || 0}`}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#1976d215', color: '#1976d2' }}>
                      <ProductsIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700 }}>
                        Active Products
                      </Typography>
                      <Typography variant="h5" color="#1976d2">
                        {loadingStats ? <CircularProgress size={20} /> : (stats?.activeProducts || 0)}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* Quick Actions & Recent Users Preview */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Quick Administrative Actions
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                      Manage catalog items, monitor client registrations, and verify active kit access.
                    </Typography>
                    <Stack spacing={1.5}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => { setCurrentTab(1); handleOpenAddProduct(); }}
                      >
                        Add New Kit / Product
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<UsersIcon />}
                        onClick={() => setCurrentTab(2)}
                      >
                        Search &amp; Inspect Users
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<RefreshIcon />}
                        onClick={loadAllData}
                      >
                        Refresh Database Stats
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={7}>
                  <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" color="primary">
                        Recent Registrations
                      </Typography>
                      <Button size="small" onClick={() => setCurrentTab(2)}>
                        View All
                      </Button>
                    </Box>

                    {users.slice(0, 5).map((u) => (
                      <Box key={u._id} sx={{ py: 1.5, borderBottom: '1px solid #f0e6dc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {u.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {u.email} • {u.phone}
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={u.paid ? 'PAID' : 'PENDING'}
                          color={u.paid ? 'success' : 'warning'}
                          variant="outlined"
                        />
                      </Box>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* TAB 1: PRODUCT MANAGEMENT MODULE */}
          {currentTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" color="primary">
                  Sacred Kits &amp; Products
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddProduct}
                  >
                    Add Product
                  </Button>
                  <IconButton onClick={loadProducts} title="Refresh Products">
                    <RefreshIcon />
                  </IconButton>
                </Stack>
              </Box>

              {loadingProducts ? (
                <Box sx={{ textAlign: 'center', py: 6 }}><CircularProgress /></Box>
              ) : (
                <Grid container spacing={3}>
                  {products.map((prod) => (
                    <Grid item xs={12} md={6} key={prod._id}>
                      <Paper sx={{ p: 3, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {prod.badge && (
                          <Chip
                            size="small"
                            label={prod.badge}
                            color="primary"
                            sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 700 }}
                          />
                        )}

                        <Box sx={{ pr: 10 }}>
                          <Typography variant="h6" color="primary" gutterBottom>
                            {prod.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {prod.subtitle}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
                          <Typography variant="h4" color="primary" sx={{ fontWeight: 800 }}>
                            ₹{prod.price}
                          </Typography>
                          {prod.origPrice > 0 && (
                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                              ₹{prod.origPrice}
                            </Typography>
                          )}
                          <Chip
                            size="small"
                            label={prod.hasVideoAccess ? 'VIDEO + KIT' : 'DIGITAL KIT'}
                            color={prod.hasVideoAccess ? 'secondary' : 'default'}
                            variant="outlined"
                            sx={{ ml: 1, fontWeight: 700 }}
                          />
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', mb: 1, display: 'block' }}>
                          Included Features:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3, flex: 1 }}>
                          {prod.features?.map((f, i) => (
                            <Chip key={i} size="small" label={f} sx={{ bgcolor: '#fff5e6', fontSize: 11 }} />
                          ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid #f0e6dc' }}>
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                checked={prod.isActive}
                                onChange={async (e) => {
                                  await adminApi.updateProduct(prod._id, { isActive: e.target.checked });
                                  loadProducts();
                                  loadStats();
                                }}
                              />
                            }
                            label={<Typography variant="caption">{prod.isActive ? 'Active' : 'Draft'}</Typography>}
                          />

                          <Box>
                            <IconButton size="small" color="primary" onClick={() => handleOpenEditProduct(prod)} title="Edit">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDeleteProduct(prod._id, prod.name)} title="Delete">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {/* TAB 2: USER DETAILS & ACCESS MANAGEMENT */}
          {currentTab === 2 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" color="primary">
                  Customer &amp; Access Directory
                </Typography>
                <IconButton onClick={loadUsers} title="Refresh User List">
                  <RefreshIcon />
                </IconButton>
              </Box>

              {/* Filters & Search */}
              <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Search by Customer Name, Email, Phone, or Kalyanam ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                      <Chip
                        label="All Users"
                        clickable
                        color={userStatusFilter === 'all' ? 'primary' : 'default'}
                        onClick={() => setUserStatusFilter('all')}
                      />
                      <Chip
                        label="Paid Members"
                        clickable
                        color={userStatusFilter === 'paid' ? 'success' : 'default'}
                        onClick={() => setUserStatusFilter('paid')}
                      />
                      <Chip
                        label="Pending"
                        clickable
                        color={userStatusFilter === 'pending' ? 'warning' : 'default'}
                        onClick={() => setUserStatusFilter('pending')}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>

              {/* Users Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ bgcolor: '#fbf4eb' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Kalyanam ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Name &amp; Contact</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Plan Type</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Payment Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Registered</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loadingUsers ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                          <CircularProgress size={32} />
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                          <Typography color="text.secondary">No users found matching your criteria.</Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((u) => (
                        <TableRow key={u._id} hover>
                          <TableCell>
                            <Chip
                              size="small"
                              label={u.kalyanamId || 'N/A'}
                              onClick={() => copyToClipboard(u.kalyanamId, 'Kalyanam ID')}
                              onDelete={() => copyToClipboard(u.kalyanamId, 'Kalyanam ID')}
                              deleteIcon={<CopyIcon fontSize="small" />}
                              variant="outlined"
                              sx={{ fontWeight: 700 }}
                            />
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {u.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                              {u.email}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              📞 {u.phone}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Chip
                              size="small"
                              label={u.plan === 'video_kit' ? 'Video + Kit' : 'Puja Kit'}
                              color={u.plan === 'video_kit' ? 'secondary' : 'default'}
                              variant="outlined"
                              sx={{ fontWeight: 700 }}
                            />
                          </TableCell>

                          <TableCell>
                            <Chip
                              size="small"
                              icon={u.paid ? <CheckCircleIcon /> : <PendingIcon />}
                              label={u.paid ? 'PAID' : 'PENDING'}
                              color={u.paid ? 'success' : 'warning'}
                              sx={{ fontWeight: 800 }}
                            />
                          </TableCell>

                          <TableCell>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(u.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </Typography>
                          </TableCell>

                          <TableCell align="right">
                            <Tooltip title="View Complete Profile">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => { setSelectedUser(u); setUserModalOpen(true); }}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title={u.paid ? 'Revoke Paid Access' : 'Mark as Paid'}>
                              <Button
                                size="small"
                                variant={u.paid ? 'text' : 'contained'}
                                color={u.paid ? 'warning' : 'success'}
                                onClick={() => handleToggleUserPaid(u)}
                                sx={{ ml: 1, fontSize: 11, py: 0.5 }}
                              >
                                {u.paid ? 'Revoke' : 'Mark Paid'}
                              </Button>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  component="div"
                  count={totalUsersCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(_, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                  }}
                />
              </TableContainer>
            </Box>
          )}

          {/* TAB 3: SACRED VIDHI CONTENT EDITOR */}
          {currentTab === 3 && (
            <Box>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MenuBookIcon /> Sacred Poojan Vidhi Content Editor
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Edit the Hindi &amp; English Vidhi instructions, Samagri list, and Mantras delivered to paid clients. Changes take effect on the server immediately.
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      startIcon={<RefreshIcon />}
                      onClick={loadContent}
                      disabled={loadingContent}
                    >
                      Reload
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveContent}
                      disabled={savingContent || loadingContent}
                    >
                      {savingContent ? 'Saving Changes...' : 'Save Content to Server'}
                    </Button>
                  </Stack>
                </Box>

                {loadingContent ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress color="primary" />
                  </Box>
                ) : (
                  <TextField
                    fullWidth
                    multiline
                    rows={22}
                    value={contentHtml}
                    onChange={(e) => setContentHtml(e.target.value)}
                    placeholder="Sacred Vidhi HTML / Content template..."
                    sx={{
                      '& .MuiInputBase-root': {
                        fontFamily: 'Consolas, "Courier New", monospace',
                        fontSize: 13,
                        lineHeight: 1.6,
                        bgcolor: '#faf8f5'
                      }
                    }}
                  />
                )}
              </Paper>
            </Box>
          )}
        </Container>

        {/* MODAL: ADD / EDIT PRODUCT */}
        <Dialog open={productDialog} onClose={() => setProductDialog(false)} maxWidth="sm" fullWidth>
          <form onSubmit={handleSaveProduct}>
            <DialogTitle color="primary" sx={{ borderBottom: '1px solid #eee' }}>
              {editingProduct ? 'Edit Kit / Product' : 'Add New Kit / Product'}
            </DialogTitle>

            <DialogContent sx={{ pt: 2.5 }}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Product Title *"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Complete Diwali Maha Puja Kit"
                  required
                />

                <TextField
                  fullWidth
                  label="Subtitle / Tagline"
                  value={productForm.subtitle}
                  onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                  placeholder="e.g. Masterclass with Vedic Mantras & Video"
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Selling Price (INR) *"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="MRP / Original Price (INR)"
                      value={productForm.origPrice}
                      onChange={(e) => setProductForm({ ...productForm, origPrice: e.target.value })}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Product Type</InputLabel>
                      <Select
                        value={productForm.type}
                        label="Product Type"
                        onChange={(e) => {
                          const val = e.target.value;
                          setProductForm({
                            ...productForm,
                            type: val,
                            hasVideoAccess: val === 'video_kit' ? true : productForm.hasVideoAccess
                          });
                        }}
                      >
                        <MenuItem value="digital_kit">Digital Guide Kit</MenuItem>
                        <MenuItem value="video_kit">Video + Guide Kit</MenuItem>
                        <MenuItem value="physical_kit">Physical Samagri Kit</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Highlight Badge"
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                      placeholder="e.g. 🌟 Most Popular"
                    />
                  </Grid>
                </Grid>

                <FormControlLabel
                  control={
                    <Switch
                      checked={productForm.hasVideoAccess}
                      onChange={(e) => setProductForm({ ...productForm, hasVideoAccess: e.target.checked })}
                    />
                  }
                  label="Includes Online Video Guide Access"
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Features List (one feature per line)"
                  value={productForm.featuresText}
                  onChange={(e) => setProductForm({ ...productForm, featuresText: e.target.value })}
                  placeholder="Step-by-step Lakshmi-Ganesh Vidhi&#10;Sacred Sanskrit Mantras&#10;Samagri Checklist"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={productForm.isActive}
                      onChange={(e) => setProductForm({ ...productForm, isActive: e.target.checked })}
                    />
                  }
                  label="Product Active / Available in Store"
                />
              </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2.5, borderTop: '1px solid #eee' }}>
              <Button onClick={() => setProductDialog(false)} color="inherit">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {editingProduct ? 'Save Changes' : 'Create Product'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* MODAL: VIEW USER DETAILS */}
        <Dialog open={userModalOpen} onClose={() => setUserModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Customer Profile &amp; Access</span>
            <IconButton onClick={() => setUserModalOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {selectedUser && (
              <Stack spacing={2.5}>
                <Box sx={{ p: 2, bgcolor: '#fbf5ed', borderRadius: 2, border: '1px solid #e7d4be' }}>
                  <Typography variant="h6" color="primary">
                    {selectedUser.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Registered: {new Date(selectedUser.createdAt).toLocaleString()}
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Kalyanam ID</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>{selectedUser.kalyanamId || 'None'}</Typography>
                      <IconButton size="small" onClick={() => copyToClipboard(selectedUser.kalyanamId, 'Kalyanam ID')}>
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Payment Status</Typography>
                    <Chip
                      size="small"
                      label={selectedUser.paid ? 'PAID / ACTIVE' : 'PENDING'}
                      color={selectedUser.paid ? 'success' : 'warning'}
                      sx={{ fontWeight: 800, mt: 0.5 }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Email Address</Typography>
                    <Typography variant="body2">{selectedUser.email}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                    <Typography variant="body2">📞 {selectedUser.phone}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Purchased Plan</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {selectedUser.plan === 'video_kit' ? 'Poojan Vidhi Video + Kit' : 'Poojan Vidhi Kit'}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Order Reference</Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {selectedUser.orderId || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">
                    Online DRM Access: <strong>{selectedUser.paid ? 'Granted' : 'Revoked / Inactive'}</strong>
                  </Typography>

                  <Button
                    variant="contained"
                    color={selectedUser.paid ? 'warning' : 'success'}
                    size="small"
                    onClick={() => {
                      handleToggleUserPaid(selectedUser);
                      setUserModalOpen(false);
                    }}
                  >
                    {selectedUser.paid ? 'Revoke Access' : 'Grant Paid Access'}
                  </Button>
                </Box>
              </Stack>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setUserModalOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Global Toast */}
        <Snackbar
          open={toast.open}
          autoHideDuration={3500}
          onClose={() => setToast({ ...toast, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}>
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

