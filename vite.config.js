// Arquivo: vite.config.js (Versão MODERNA)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Importa nosso 'app' do Express (agora ambos são modernos)
import expressApp from './api/index.js';

// Um plugin simples para usar nosso app Express
const expressMiddleware = () => ({
  name: 'express-middleware',
  configureServer(server) {
    // Diz ao Vite para usar nosso app Express
    server.middlewares.use(expressApp);
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), expressMiddleware()],
})