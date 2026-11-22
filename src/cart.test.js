import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cambiar, resumen, mensajePedido, precio, enlaceWhatsApp } from './cart.js'
import { PRODUCTOS } from './data.js'

const porId = Object.fromEntries(PRODUCTOS.map((p) => [p.id, p]))

test('precio en CLP sin decimales', () => {
  assert.equal(precio(12990).replace(/\s/g, ''), '$12.990')
})

test('carrito: unidades, formatos, sabores y kilos', () => {
  let c = {}
  c = cambiar(c, porId['queso-fresco'], {}, 1)
  c = cambiar(c, porId['queso-fresco'], {}, 1)
  c = cambiar(c, porId['yogurt-cabra'], { formatoId: '05l' }, 1)
  c = cambiar(c, porId['manjar'], { sabor: 'Lúcuma' }, 1)
  c = cambiar(c, porId['queso-mantecoso'], {}, 3) // 1,5 kg
  const r = resumen(c, porId)
  assert.equal(r.total, 20000 + 4000 + 6000 + 24000)
  assert.equal(r.hayKilos, true)

  c = cambiar(c, porId['manjar'], { sabor: 'Lúcuma' }, -1)
  assert.equal(Object.keys(c).length, 3, 'línea en cero se elimina')
})

test('mensaje de WhatsApp lleva detalle, total y entrega', () => {
  let c = cambiar({}, porId['queso-mantecoso'], {}, 3)
  c = cambiar(c, porId['manjar'], { sabor: 'Nuez' }, 2)
  const msg = mensajePedido(resumen(c, porId), { entrega: 'delivery', nombre: 'Ana', apellido: 'Pérez', telefono: '+56 9 1234 5678', direccion: 'Los Aromos 12', comuna: 'Ñuñoa', comentario: '' })
  assert.match(msg, /1,5 kg Queso Mantecoso: aprox\. \$\s?24\.000/)
  assert.match(msg, /2 × Manjar de Leche de Vaca, sabor nuez/)
  assert.match(msg, /Total: aprox\. \$\s?36\.000/)
  assert.match(msg, /delivery a Los Aromos 12, Ñuñoa/)
  assert.ok(msg.startsWith('Hola Nonna Rosa, soy Ana Pérez y mi pedido es:'))
  assert.match(msg, /Teléfono: \+56 9 1234 5678/)
  assert.doesNotMatch(msg, /Comentario/)
  assert.ok(enlaceWhatsApp('56978900650', msg).startsWith('https://wa.me/56978900650?text=Hola'))
})
