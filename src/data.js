// Semilla de la carta, tomada de docs/referencia/carta.md (catálogo 11 nov 2026).
// Las fotos viven en src/fotos/<id>.jpg (ver src/fotos.js).

export const NEGOCIO = {
  nombre: 'Nonna Rosa',
  whatsapp: '56978900650',
  whatsappVisible: '+56 9 7890 0650',
  instagram: 'queserianonnarosa',
  resolucion: 'Resolución sanitaria N°1695 del 18/07/2003',
}

export const CATEGORIAS = [
  { id: 'quesos', nombre: 'Quesos' },
  { id: 'yogurt', nombre: 'Yogurt' },
  { id: 'mantequilla', nombre: 'Mantequilla' },
  { id: 'manjar', nombre: 'Manjar' },
  { id: 'huevos', nombre: 'Huevos' },
  { id: 'palta', nombre: 'Palta' },
  { id: 'miel', nombre: 'Miel' },
  { id: 'mermeladas', nombre: 'Mermeladas' },
]

// venta: 'unidad' (cantidad entera) o 'kg' (pasos de ½ kg, precio referencial)
// formatos: misma ficha con distinto tamaño y precio. sabores: variantes al mismo precio.
export const PRODUCTOS = [
  {
    id: 'queso-fresco', cat: 'quesos', nombre: 'Queso Fresco Nonna Rosa', subtitulo: 'De cabra',
    formato: 'Pieza redonda de 500 g aprox.', venta: 'unidad', precio: 10000,
    desc: 'Con notas saladas que intensifican su sabor. Ideal para desayunos, onces y ensaladas.',
  },
  {
    id: 'queso-dona-peti', cat: 'quesos', nombre: 'Queso Doña Peti', subtitulo: 'De cabra',
    formato: 'Pieza de 500 g aprox.', venta: 'unidad', precio: 15000,
    desc: 'Pasta firme y suave al paladar, con corteza de moho blanco que le da intensidad y carácter. Para aperitivos, con vino blanco, pescados y sobre todo con miel en panal.',
  },
  {
    id: 'queso-semimaduro', cat: 'quesos', nombre: 'Queso Semimaduro', subtitulo: 'De cabra',
    formato: 'Por kilo', venta: 'kg', precio: 22000, agotado: false,
  },
  {
    id: 'queso-mantecoso', cat: 'quesos', nombre: 'Queso Mantecoso', subtitulo: 'De vaca',
    formato: 'Por kilo, en piezas de ½ kg y 1 kg aprox.', venta: 'kg', precio: 16000,
    desc: 'Elaboración artesanal de Osorno, sin aditivos ni preservantes.',
  },
  {
    id: 'yogurt-cabra', cat: 'yogurt', nombre: 'Yogurt Leche de Cabra', venta: 'unidad',
    formatos: [{ id: '1l', nombre: '1 litro', precio: 7500 }, { id: '05l', nombre: '½ litro', precio: 4000 }],
    desc: '100% leche de cabra. Una alternativa bien tolerada por personas con alergia a la proteína de leche de vaca (APLV), por su distinta composición proteica.',
  },
  {
    id: 'mantequilla', cat: 'mantequilla', nombre: 'Mantequilla de Campo', formato: '250 g',
    venta: 'unidad', precio: 4000,
    desc: 'Artesanal de Osorno, con ingredientes naturales y sin aditivos. Cremosa y firme, fácil de untar, con un leve toque salado.',
  },
  {
    id: 'manjar', cat: 'manjar', nombre: 'Manjar de Leche de Vaca', formato: '650 g aprox.',
    venta: 'unidad', precio: 6000, sabores: ['Nuez', 'Lúcuma', 'Solo'],
  },
  {
    id: 'huevos', cat: 'huevos', nombre: 'Huevos de Campo', formato: 'Bandeja de 30 huevos',
    venta: 'unidad', precio: 10000,
  },
  {
    id: 'palta', cat: 'palta', nombre: 'Palta Hass orgánica', formato: 'Por kilo',
    venta: 'kg', precio: 4000,
  },
  {
    id: 'miel-pura', cat: 'miel', nombre: 'Miel Pura PhiBee', formato: 'Frasco de 1 kg',
    venta: 'unidad', precio: 10000, desc: '100% miel de abejas.',
  },
  {
    id: 'miel-panal', cat: 'miel', nombre: 'Miel en Panal', venta: 'unidad',
    formatos: [{ id: '100', nombre: '100 g', precio: 3500 }, { id: '200', nombre: '200 g', precio: 5500 }],
    desc: 'Ideal para tablas y para acompañar queso de cabra.',
  },
  {
    id: 'mermelada', cat: 'mermeladas', nombre: 'Mermelada', formato: '650 g aprox.',
    venta: 'unidad', precio: 6000, sabores: ['Frutilla', 'Alcayota nuez', 'Ciruela'],
  },
]
