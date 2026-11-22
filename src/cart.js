// Lógica pura del carrito y del mensaje de WhatsApp (sin React, se prueba con node --test).

const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
export const precio = (n) => clp.format(Math.round(n))
export const kilos = (n) => `${String(n).replace('.', ',')} kg`

export const PASO_KG = 0.5

// Una línea = producto + formato + sabor elegidos.
export const claveLinea = (id, formatoId = '', sabor = '') => [id, formatoId, sabor].join('|')

export function precioUnitario(producto, formatoId) {
  if (!producto.formatos) return producto.precio
  return producto.formatos.find((f) => f.id === formatoId)?.precio ?? producto.formatos[0].precio
}

export function totalLinea(producto, linea) {
  return precioUnitario(producto, linea.formatoId) * linea.cantidad
}

export function nombreLinea(producto, linea) {
  const formato = producto.formatos?.find((f) => f.id === linea.formatoId)?.nombre
  return [producto.nombre, linea.sabor && `sabor ${linea.sabor.toLowerCase()}`, formato].filter(Boolean).join(', ')
}

export function cantidadTexto(producto, cantidad) {
  return producto.venta === 'kg' ? kilos(cantidad) : `${cantidad} ×`
}

// Suma/resta un paso; devuelve el carrito nuevo (sin líneas en cero).
export function cambiar(carrito, producto, { formatoId = '', sabor = '' }, delta) {
  const clave = claveLinea(producto.id, formatoId, sabor)
  const paso = producto.venta === 'kg' ? PASO_KG : 1
  const actual = carrito[clave]?.cantidad ?? 0
  const cantidad = Math.max(0, Math.round((actual + delta * paso) * 2) / 2)
  const { [clave]: _, ...resto } = carrito
  if (cantidad === 0) return resto
  return { ...resto, [clave]: { id: producto.id, formatoId, sabor, cantidad } }
}

export function resumen(carrito, productosPorId) {
  const lineas = Object.entries(carrito)
    .map(([clave, linea]) => ({ clave, linea, producto: productosPorId[linea.id] }))
    .filter((l) => l.producto)
  const total = lineas.reduce((s, l) => s + totalLinea(l.producto, l.linea), 0)
  const hayKilos = lineas.some((l) => l.producto.venta === 'kg')
  const unidades = lineas.reduce((s, l) => s + (l.producto.venta === 'kg' ? 1 : l.linea.cantidad), 0)
  return { lineas, total, hayKilos, unidades }
}

export function mensajePedido({ lineas, total, hayKilos }, { entrega, nombre, apellido, telefono, direccion, comuna, comentario }) {
  const completo = [nombre, apellido].map((t) => t?.trim()).filter(Boolean).join(' ')
  const quien = completo ? `soy ${completo} y ` : ''
  const detalle = lineas.map(({ producto, linea }) => {
    const aprox = producto.venta === 'kg' ? 'aprox. ' : ''
    return `- ${cantidadTexto(producto, linea.cantidad)} ${nombreLinea(producto, linea)}: ${aprox}${precio(totalLinea(producto, linea))}`
  })
  const partes = [
    `Hola Nonna Rosa, ${quien}mi pedido es:`,
    '',
    ...detalle,
    '',
    `Total: ${hayKilos ? 'aprox. ' : ''}${precio(total)}`,
    hayKilos && '(Los productos por kilo se ajustan al peso real.)',
    '',
    entrega === 'delivery'
      ? `Entrega: delivery a ${[direccion, comuna].filter(Boolean).join(', ')}. ¿Cuánto cuesta el despacho a mi zona?`
      : 'Entrega: retiro en el local. ¿Cuándo puedo pasar?',
    telefono?.trim() && `Teléfono: ${telefono.trim()}`,
    comentario && `Comentario: ${comentario}`,
  ]
  return partes.filter((p) => p !== false && p !== undefined && p !== null).join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

export const enlaceWhatsApp = (numero, texto) => `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
