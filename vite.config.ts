import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  FIREBASE_KEY: process.env.VITE_FIREBASE_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT: process.env.VITE_FIREBASE_PROJECT,
  FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  FIREBASE_SENDER_ID: process.env.VITE_FIREBASE_SENDER_ID,
  FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
  API_URL: process.env.VITE_API_URL,
})
