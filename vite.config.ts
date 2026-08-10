import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],clearScreen:false,server:{port:1420,strictPort:true,proxy:{
  '/api/openai':{target:'https://api.openai.com',changeOrigin:true,rewrite:p=>p.replace(/^\/api\/openai/,'')},
  '/api/anthropic':{target:'https://api.anthropic.com',changeOrigin:true,rewrite:p=>p.replace(/^\/api\/anthropic/,'')}
}}});
