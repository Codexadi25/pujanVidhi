import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendPort = env.VITE_BACKEND_PORT || '5000';
  const backendUrl = env.VITE_API_URL || `http://localhost:${backendPort}`;

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 600,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@mui') || id.includes('@emotion')) {
                return 'vendor-mui';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              if (id.includes('firebase')) {
                return 'vendor-firebase';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
