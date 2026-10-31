import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import JavaScriptObfuscator from 'javascript-obfuscator';

// Custom Vite Rollup plugin for JavaScript Obfuscation
function obfuscatorPlugin(options = {}) {
  return {
    name: 'vite-plugin-javascript-obfuscator',
    apply: 'build',
    enforce: 'post',
    renderChunk(code, chunk) {
      // Skip pure vendor React runtime chunk to maintain highest performance and fiber stability
      if (chunk.fileName.includes('vendor-react')) {
        return null;
      }

      try {
        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
          compact: true,
          controlFlowFlattening: false,
          deadCodeInjection: false,
          debugProtection: false,
          disableConsoleOutput: false,
          identifierNamesGenerator: 'hexadecimal',
          log: false,
          numbersToExpressions: true,
          renameGlobals: false,
          selfDefending: false,
          simplify: true,
          splitStrings: true,
          splitStringsChunkLength: 5,
          stringArray: true,
          stringArrayCallsTransform: true,
          stringArrayEncoding: ['base64'],
          stringArrayIndexShift: true,
          stringArrayRotate: true,
          stringArrayShuffle: true,
          stringArrayWrappersCount: 2,
          stringArrayWrappersChainedCalls: true,
          stringArrayThreshold: 0.8,
          transformObjectKeys: false,
          unicodeEscapeSequence: false,
          ...options
        });

        return {
          code: obfuscationResult.getObfuscatedCode(),
          map: obfuscationResult.getSourceMap() ? JSON.parse(obfuscationResult.getSourceMap()) : null
        };
      } catch (err) {
        console.warn(`[Obfuscator] Warning on ${chunk.fileName}:`, err.message);
        return null;
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    obfuscatorPlugin()
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
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
});
