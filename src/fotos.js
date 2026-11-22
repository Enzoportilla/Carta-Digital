// Recortes de las fotos del catálogo PDF (docs/referencia/paginas), 360×360 px; cada JPG lleva su origen incrustado (impeccable embed-prompt --read).
// Vite las incrusta como data URI para que dist/index.html funcione sin servidor.
const archivos = import.meta.glob('./fotos/*.jpg', { eager: true, import: 'default' })
export const FOTOS = Object.fromEntries(Object.entries(archivos).map(([ruta, url]) => [ruta.slice(8, -4), url]))
