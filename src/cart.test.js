import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cambiar, resumen, mensajePedido, precio, enlaceWhatsApp, desdeFilas } from './cart.js'

const fila = (id, categoria, nombre, formato, unidad_venta, precio_clp, stock = 5, activo = true) =>
  ({ id, categoria, nombre, formato, unidad_venta, precio_clp, stock, activo, imagen: id, descripcion: null })

const FILAS = [
  fila('queso-fresco', 'quesos', 'Queso Fresco', 'Pieza 500 g', 'unidad', 10000),
  fila('queso-mantecoso', 'quesos', 'Queso Mantecoso', 'Por kilo', 'kg', 16000, '2.5'), // numeric puede llegar como texto
  fila('queso-semimaduro', 'quesos', 'Queso Semimaduro', 'Por kilo', 'kg', 22000, 0),
  fila('yogurt-1l', 'yogurt', 'Yogurt', '1 litro', 'unidad', 7500),
  fila('yogurt-05l', 'yogurt', 'Yogurt', '½ litro', 'unidad', 4000),
  fila('manjar-nuez', 'manjar', 'Manjar', 'Nuez', 'unidad', 6000),
  fila('manjar-lucuma', 'manjar', 'Manjar', 'Lúcuma', 'unidad', 6000),
  fila('manjar-solo', 'manjar', 'Manjar', 'Solo', 'unidad', 6000, 3, false),
]
const productos = desdeFilas(FILAS)
const porId = Object.fromEntries(productos.map((p) => [p.id, p]))
const P = { fresco: 'quesos|Queso Fresco', mantecoso: 'quesos|Queso Mantecoso', yogurt: 'yogurt|Yogurt', manjar: 'manjar|Manjar' }

test('precio en CLP sin decimales', () => {
  assert.equal(precio(12990).replace(/\s/g, ''), '$12.990')
})

test('filas → fichas: agrupa opciones y oculta sin stock o inactivas', () => {
  assert.deepEqual(productos.map((p) => p.id), Object.values(P))
  assert.equal(porId[P.fresco].precio, 10000)
  assert.deepEqual(porId[P.yogurt].formatos.map((f) => f.id), ['yogurt-1l', 'yogurt-05l'])
  assert.deepEqual(porId[P.manjar].formatos.map((f) => f.nombre), ['Nuez', 'Lúcuma'])
})

test('carrito: unidades, formatos y kilos', () => {
  let c = {}
  c = cambiar(c, porId[P.fresco], {}, 1)
  c = cambiar(c, porId[P.fresco], {}, 1)
  c = cambiar(c, porId[P.yogurt], { formatoId: 'yogurt-05l' }, 1)
  c = cambiar(c, porId[P.manjar], { formatoId: 'manjar-lucuma' }, 1)
  c = cambiar(c, porId[P.mantecoso], {}, 3) // 1,5 kg
  const r = resumen(c, porId)
  assert.equal(r.total, 20000 + 4000 + 6000 + 24000)
  assert.equal(r.hayKilos, true)

  c = cambiar(c, porId[P.manjar], { formatoId: 'manjar-lucuma' }, -1)
  assert.equal(Object.keys(c).length, 3, 'línea en cero se elimina')
})

test('si un formato se agota, su línea sale del canasto (no se cobra a otro precio)', () => {
  const c = cambiar({}, porId[P.yogurt], { formatoId: 'yogurt-1l' }, 1)
  const sinLitro = Object.fromEntries(desdeFilas(FILAS.map((f) => f.id === 'yogurt-1l' ? { ...f, stock: 0 } : f)).map((p) => [p.id, p]))
  assert.equal(resumen(c, sinLitro).lineas.length, 0)
})

test('mensaje de WhatsApp lleva detalle, total y entrega', () => {
  let c = cambiar({}, porId[P.mantecoso], {}, 3)
  c = cambiar(c, porId[P.manjar], { formatoId: 'manjar-nuez' }, 2)
  const msg = mensajePedido(resumen(c, porId), { entrega: 'delivery', nombre: 'Ana', apellido: 'Pérez', telefono: '+56 9 1234 5678', direccion: 'Los Aromos 12', comuna: 'Ñuñoa', comentario: '' })
  assert.match(msg, /1,5 kg Queso Mantecoso: aprox\. \$\s?24\.000/)
  assert.match(msg, /2 × Manjar, Nuez/)
  assert.match(msg, /Total: aprox\. \$\s?36\.000/)
  assert.match(msg, /delivery a Los Aromos 12, Ñuñoa/)
  assert.ok(msg.startsWith('Hola Nonna Rosa, soy Ana Pérez y mi pedido es:'))
  assert.match(msg, /Teléfono: \+56 9 1234 5678/)
  assert.doesNotMatch(msg, /Comentario/)
  assert.ok(enlaceWhatsApp('56978900650', msg).startsWith('https://wa.me/56978900650?text=Hola'))
})
