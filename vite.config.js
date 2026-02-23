import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Isso garante que o FiveM ache os arquivos (./)
  build: {
    outDir: '../ui', // Ele vai jogar a build pronta na pasta UI do seu script
  }
})