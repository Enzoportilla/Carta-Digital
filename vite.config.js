import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// El build es un solo dist/index.html con JS, CSS, fuentes y fotos dentro: se puede enviar y abrir sin internet.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  // La carpeta viene montada desde Windows (WSL): sin polling, Vite no ve los cambios.
  server: { watch: { usePolling: true } },
})
