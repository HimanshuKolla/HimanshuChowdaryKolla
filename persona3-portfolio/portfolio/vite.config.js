import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' works on Vercel (and any normal web host).
// For VS Code Live Server (which serves from a subfolder), build with:
//   npm run build -- --base=./
// or set BASE=./ in the environment.
export default defineConfig({
  base: process.env.BASE || '/',
  plugins: [react()],
})
