import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', //PERMITIR CUALQUIER IP
    allowedHosts: ['ia.wisensor.cl'],  //PERMITIR ACCESO DESDE CUALQUIER HOST DE LA RED
  },
});
