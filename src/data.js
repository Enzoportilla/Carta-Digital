// Datos fijos del negocio y categorías (docs/referencia/carta.md). Fotos en src/fotos/<imagen>.jpg (ver src/fotos.js).

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

// Los productos, precios y stock viven en Supabase (tabla productos); la semilla está en supabase/schema.sql.
