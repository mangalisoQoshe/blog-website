import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:4000", // Replace with your Go server URL
        changeOrigin: true,
        //rewrite: path => path.replace(/^\/v1/, ''), // Remove the /api prefix
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow requests from any origin
        },
      },
    },
  },
  // some other configuration
  define: { "import.meta.env": import.meta.env },
});
