import { useEffect, useMemo, useRef, useState } from 'react'
import { CATEGORIAS, NEGOCIO } from './data.js'
import { supabase } from './supabase.js'
import { FOTOS } from './fotos.js'
import Tablillas, { reducirMovimiento } from './Tablillas.jsx'
import {
  cambiar, claveLinea, desdeFilas, enlaceWhatsApp, hoyChile, kilos, mensajePedido, nombreLinea,
  precio, precioUnitario, resumen, totalLinea,
} from './cart.js'

const CLAVE_STORAGE = 'nonna-rosa-pedido'

function leer(clave, porDefecto) {
  try { return JSON.parse(localStorage.getItem(clave)) ?? porDefecto } catch { return porDefecto }
}
function guardar(clave, valor) {
  try { localStorage.setItem(clave, JSON.stringify(valor)) } catch { /* sin almacenamiento: el canasto vive solo en memoria */ }
}

// navigator.clipboard no existe fuera de https en algunos navegadores; se cae al método antiguo.
async function copiar(texto) {
  try { await navigator.clipboard.writeText(texto); return true } catch { /* sigue abajo */ }
  const t = Object.assign(document.createElement('textarea'), { value: texto })
  t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0'
  document.body.append(t); t.select()
  const ok = document.execCommand('copy'); t.remove()
  return ok
}

/* ---------- Íconos dibujados (un solo trazo, 1.8) ---------- */
const Icono = ({ children, className = 'icono' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
)
const Mas = () => <Icono><path d="M12 5v14M5 12h14" /></Icono>
const Menos = () => <Icono><path d="M5 12h14" /></Icono>
const Cerrar = () => <Icono><path d="M6 6l12 12M18 6L6 18" /></Icono>
const IconoWhatsApp = () => (
  <Icono><path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6z" /><path d="M9.2 9.1c.3 2.6 2.6 4.9 5.6 5.7l1-1.3-1.7-1-.9.8c-1-.4-1.9-1.3-2.4-2.4l.8-.9-1-1.7z" fill="currentColor" stroke="none" /></Icono>
)
const IconoCopiar = () => <Icono><rect x="8" y="8" width="11" height="12" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></Icono>
const Canasto = ({ className }) => (
  <svg className={className} viewBox="0 0 48 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 17c0-8 5.5-13 12-13s12 5 12 13" />
    <path d="M4 17h40l-4.5 18.5a3 3 0 0 1-3 2.5H11.5a3 3 0 0 1-3-2.5z" />
    <path d="M9 24h30M10.5 30.5h27M17 17l1.5 21M24 17v21M31 17l-1.5 21" strokeWidth="1.6" />
  </svg>
)

// Círculo "pintado a mano" que marca un producto ya elegido.
const Marca = () => (
  <svg className="marca" viewBox="0 0 120 120" aria-hidden="true">
    <path d="M62 6C30 4 7 27 8 60c1 31 25 54 55 53 30-1 51-25 50-55C112 30 92 9 60 9 42 9 27 17 19 28" pathLength="1" />
  </svg>
)

function Foto({ id, nombre, className = 'foto' }) {
  return <img className={className} src={FOTOS[id]} alt={nombre} width="360" height="360" decoding="async" />
}

// La foto vuela hasta el canasto al agregar.
function volar(origen) {
  if (!origen || reducirMovimiento()) return
  const a = origen.getBoundingClientRect()
  const destino = document.querySelector('.barra .canasto')?.getBoundingClientRect()
  const bx = destino ? destino.left + destino.width / 2 : 48
  const by = window.innerHeight - 44
  const dx = bx - (a.left + a.width / 2)
  const dy = by - (a.top + a.height / 2)
  const clon = origen.cloneNode(true)
  clon.removeAttribute('alt')
  Object.assign(clon.style, { position: 'fixed', left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px`, margin: 0, zIndex: 50, pointerEvents: 'none', borderRadius: '50%' })
  document.body.append(clon)
  clon.animate(
    [
      { transform: 'translate(0, 0) scale(1) rotate(0)' },
      { transform: `translate(${dx * 0.4}px, ${dy * 0.4 - 110}px) scale(.6) rotate(-20deg)`, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(.14) rotate(-40deg)` },
    ],
    { duration: 720, easing: 'cubic-bezier(.4,.05,.6,.95)' },
  ).onfinish = () => {
    clon.remove()
    document.querySelector('.barra .canasto')?.animate(
      [{ transform: 'rotate(0)' }, { transform: 'rotate(-12deg)' }, { transform: 'rotate(8deg)' }, { transform: 'rotate(0)' }],
      { duration: 420, easing: 'ease-out' },
    )
  }
}

function Paso({ producto, cantidad, onCambiar, etiqueta }) {
  return (
    <div className="paso" role="group" aria-label={`Cantidad de ${etiqueta}`}>
      <button type="button" onClick={() => onCambiar(-1)} aria-label={`Quitar ${etiqueta}`}><Menos /></button>
      <output aria-live="polite">{producto.venta === 'kg' ? kilos(cantidad) : cantidad}</output>
      <button type="button" onClick={() => onCambiar(1)} aria-label={`Agregar ${etiqueta}`}><Mas /></button>
    </div>
  )
}

function Producto({ producto, carrito, onCambiar }) {
  const [formatoId, setFormatoId] = useState(producto.formatos?.[0].id ?? '')
  const sabor = ''
  const fotoRef = useRef(null)
  const linea = carrito[claveLinea(producto.id, formatoId, sabor)]
  const elegido = Object.values(carrito).some((l) => l.id === producto.id)
  const unitario = precioUnitario(producto, formatoId)
  const etiqueta = nombreLinea(producto, { formatoId, sabor })

  const cambiarAqui = (delta) => {
    if (delta > 0) volar(fotoRef.current?.querySelector('.foto'))
    onCambiar(producto, { formatoId, sabor }, delta, etiqueta)
  }

  return (
    <article className={`producto${elegido ? ' producto--elegido' : ''}`}>
      <div className="producto__foto" ref={fotoRef}>
        <Foto id={producto.foto} nombre={producto.nombre} />
        {elegido && <Marca />}
      </div>
      <div className="producto__cuerpo">
        <h3>{producto.nombre}</h3>
        <p className="producto__formato">{[producto.subtitulo, producto.formato].filter(Boolean).join('. ')}</p>
        {producto.desc && <p className="producto__desc">{producto.desc}</p>}

        {producto.formatos && (
          <div className="opciones" role="radiogroup" aria-label={`Opciones de ${producto.nombre}`}>
            {producto.formatos.map((f) => (
              <button key={f.id} type="button" role="radio" aria-checked={f.id === formatoId} onClick={() => setFormatoId(f.id)}>{f.nombre}</button>
            ))}
          </div>
        )}

        <div className="producto__pie">
          <p className="tablilla">
            <span className="tablilla__precio">{precio(unitario)}</span>
            {producto.venta === 'kg' && <span className="tablilla__unidad">el kilo</span>}
          </p>
          {linea ? (
            <Paso producto={producto} cantidad={linea.cantidad} onCambiar={cambiarAqui} etiqueta={etiqueta} />
          ) : (
            <button type="button" className="agregar" onClick={() => cambiarAqui(1)}>
              <Mas /> {producto.venta === 'kg' ? 'Agregar ½ kg' : 'Agregar'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

function Pradera() {
  return (
    <svg className="pradera" viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <circle className="pradera__sol" cx="330" cy="52" r="26" />
      <path className="loma loma--1" d="M0 120C60 92 120 86 190 100s130 4 210-22v142H0z" />
      <path className="loma loma--2" d="M0 150c70-30 150-34 230-14 60 15 110 8 170-12v96H0z" />
      <g className="loma loma--3">
        <path d="M0 178c90-20 190-24 280-10 50 8 90 4 120-4v56H0z" />
        <g className="cerco">
          <path d="M0 184c90-14 190-16 280-6 50 5 90 2 120-4M0 196c90-14 190-16 280-6 50 5 90 2 120-4" />
          {[20, 70, 120, 170, 220, 270, 320, 370].map((x) => <path key={x} d={`M${x} ${172 - Math.sin(x / 60) * 4}v34`} />)}
        </g>
        {[[34, 206], [58, 212], [96, 204], [150, 210], [204, 205], [252, 213], [300, 207], [352, 211], [382, 204]].map(([x, y]) => (
          <g key={x} className="flor"><circle cx={x} cy={y} r="2.6" /><circle cx={x} cy={y} r="1" /></g>
        ))}
      </g>
    </svg>
  )
}

function Pedido({ abierto, onCerrar, res, onCambiar, onVaciar }) {
  const dialogo = useRef(null)
  const formulario = useRef(null)
  const [datos, setDatos] = useState(() => ({
    ...leer(`${CLAVE_STORAGE}-datos`, { entrega: 'delivery', nombre: '', apellido: '', telefono: '', direccion: '', comuna: '', comentario: '' }),
    fecha: '', // la fecha es de cada pedido: no se arrastra de una visita anterior
  }))
  const [aviso, setAviso] = useState('')
  useEffect(() => guardar(`${CLAVE_STORAGE}-datos`, datos), [datos])

  useEffect(() => {
    const d = dialogo.current
    if (abierto && !d.open) { setAviso(''); d.showModal() }
    if (!abierto && d.open) d.close()
  }, [abierto])

  const campo = (k) => ({ value: datos[k] ?? '', onChange: (e) => setDatos({ ...datos, [k]: e.target.value }) })
  const mensaje = mensajePedido(res, datos)
  const valido = () => formulario.current.reportValidity()

  const porWhatsApp = (e) => {
    e.preventDefault()
    window.open(enlaceWhatsApp(NEGOCIO.whatsapp, mensaje), '_blank', 'noopener')
  }
  const soloCopiar = async () => {
    if (!valido()) return
    setAviso((await copiar(mensaje)) ? 'Mensaje copiado. Pégalo donde quieras enviarlo.' : 'No se pudo copiar. Abre "Ver el mensaje" y cópialo a mano.')
  }

  return (
    <dialog ref={dialogo} className="pedido" onClose={onCerrar} onClick={(e) => e.target === dialogo.current && onCerrar()} aria-labelledby="pedido-titulo">
      <form ref={formulario} className="pedido__hoja" onSubmit={porWhatsApp}>
        <header className="pedido__cabeza">
          <Canasto className="pedido__canasto" />
          <h2 id="pedido-titulo"><span>Tu canasto</span></h2>
          <button type="button" className="cerrar" onClick={onCerrar} aria-label="Cerrar canasto"><Cerrar /></button>
        </header>

        {res.lineas.length === 0 ? (
          <p className="pedido__vacio">Tu canasto está vacío. Vuelve a la carta y toca Agregar en lo que quieras pedir.</p>
        ) : (
          <>
            <ul className="lineas">
              {res.lineas.map(({ clave, linea, producto }) => (
                <li key={clave}>
                  <Foto id={producto.foto} nombre="" className="foto foto--mini" />
                  <div>
                    <p className="lineas__nombre">{nombreLinea(producto, linea)}</p>
                    <p className="lineas__precio">{producto.venta === 'kg' ? 'aprox. ' : ''}{precio(totalLinea(producto, linea))}</p>
                  </div>
                  <Paso producto={producto} cantidad={linea.cantidad} etiqueta={nombreLinea(producto, linea)}
                    onCambiar={(d) => onCambiar(producto, linea, d, nombreLinea(producto, linea))} />
                </li>
              ))}
            </ul>

            <p className="total">
              <span>Total{res.hayKilos ? ' aproximado' : ''}</span>
              <span className="tablilla"><span className="tablilla__precio">{precio(res.total)}</span></span>
            </p>
            {res.hayKilos && <p className="nota">Lo que se vende por kilo se cobra según el peso real de la pieza.</p>}

            <fieldset className="datos">
              <legend>Tus datos</legend>
              <div className="campos-dos campos-dos--parejo">
                <label className="campo">
                  <span>Nombre</span>
                  <input required autoComplete="given-name" {...campo('nombre')} />
                </label>
                <label className="campo">
                  <span>Apellido</span>
                  <input required autoComplete="family-name" {...campo('apellido')} />
                </label>
              </div>
              <label className="campo">
                <span>Teléfono</span>
                {/* 8 a 12 dígitos, con o sin +56, espacios o guiones */}
                <input required type="tel" inputMode="tel" autoComplete="tel" placeholder="+56 9 1234 5678"
                  pattern="\+?[0-9 \-]{8,16}" title="Escribe tu teléfono, por ejemplo +56 9 1234 5678" {...campo('telefono')} />
              </label>
            </fieldset>

            <fieldset className="entrega">
              <legend>¿Cómo lo recibes?</legend>
              {[['delivery', 'Delivery'], ['retiro', 'Lo retiro']].map(([v, t]) => (
                <label key={v} className="entrega__op">
                  <input type="radio" name="entrega" value={v} checked={datos.entrega === v} onChange={campo('entrega').onChange} />
                  <span>{t}</span>
                </label>
              ))}
            </fieldset>
            {datos.entrega === 'retiro' && (
              <>
                <p className="nota">Retira en <strong>{NEGOCIO.retiro}</strong>.</p>
                <label className="campo">
                  <span>Fecha de retiro <small>(opcional)</small></span>
                  <input type="date" min={hoyChile()} {...campo('fecha')} />
                </label>
              </>
            )}
            {datos.entrega === 'delivery' && (
              <>
                <p className="nota">El despacho se cobra según tu zona; Nonna Rosa te confirma el valor.</p>
                <div className="campos-dos">
                  <label className="campo">
                    <span>Dirección</span>
                    <input required autoComplete="street-address" {...campo('direccion')} />
                  </label>
                  <label className="campo">
                    <span>Comuna</span>
                    <input required autoComplete="address-level2" {...campo('comuna')} />
                  </label>
                </div>
              </>
            )}
            <label className="campo">
              <span>Algo más <small>(opcional)</small></span>
              <textarea rows={2} {...campo('comentario')} placeholder="Ej.: prefiero piezas de ½ kg" />
            </label>

            <details className="vista">
              <summary><Icono><path d="M9 6l6 6-6 6" /></Icono> Ver el mensaje</summary>
              <pre>{mensaje}</pre>
            </details>

            <div className="pedido__acciones">
              <button type="submit" className="enviar enviar--wa"><IconoWhatsApp /> Enviar por WhatsApp</button>
              <button type="button" className="copiar" onClick={soloCopiar}><IconoCopiar /> Solo copiar el mensaje</button>
              <p className="aviso" role="status">{aviso}</p>
            </div>
            <p className="nota">El pago y la entrega se coordinan con Nonna Rosa en la conversación.</p>
            <button type="button" className="vaciar" onClick={onVaciar}>Vaciar canasto</button>
          </>
        )}
      </form>
    </dialog>
  )
}

export default function App() {
  const [carrito, setCarrito] = useState(() => leer(CLAVE_STORAGE, {}))
  const [abierto, setAbierto] = useState(false)
  const [aviso, setAviso] = useState('')
  const [productos, setProductos] = useState(null) // null = cargando
  const [error, setError] = useState(false)
  useEffect(() => guardar(CLAVE_STORAGE, carrito), [carrito])

  const cargar = async () => {
    setError(false)
    const { data, error } = await supabase.from('productos').select('*').order('orden')
    if (error) { console.error(error); setError(true); return }
    setProductos(desdeFilas(data))
  }
  useEffect(() => { cargar() }, [])

  const porId = useMemo(() => Object.fromEntries((productos ?? []).map((p) => [p.id, p])), [productos])
  const categorias = CATEGORIAS.filter((c) => productos?.some((p) => p.cat === c.id))
  // Sin cargar aún, el canasto guardado no se toca ni se muestra (resumen vacío).
  const res = useMemo(() => resumen(carrito, porId), [carrito, porId])
  const onCambiar = (producto, eleccion, delta, etiqueta) => {
    setCarrito((c) => cambiar(c, producto, eleccion, delta))
    setAviso(`${delta > 0 ? 'Agregaste' : 'Quitaste'} ${etiqueta}`)
  }

  return (
    <>
      <header className="portada">
        <Pradera />
        <div className="portada__escena">
          <div className="poste" aria-hidden="true" />
          <div className="letrero">
            <img className="letrero__sello" src={FOTOS.logo} alt="Nonna Rosa, quesos finos de cabra" width="360" height="360" />
          </div>
          <h1 className="tablon"><span>Quesos finos de cabra</span></h1>
        </div>
      </header>

      <section className="bienvenida" aria-label="Cómo pedir">
        <p className="bienvenida__lema">Productos artesanales con leche de cabra 100% natural, y lo mejor del campo: mantequilla, huevos, miel y más.</p>
        <p className="bienvenida__como">Echa al canasto lo que quieras, deja tus datos y te armamos el mensaje para mandarlo por WhatsApp.</p>
      </section>

      <Tablillas categorias={categorias} />

      <main className="carta">
        {error && (
          <p className="carta__estado" role="alert">
            No pudimos cargar la carta. Revisa tu conexión a internet.{' '}
            <button type="button" className="copiar" onClick={cargar}>Reintentar</button>
          </p>
        )}
        {!error && !productos && <p className="carta__estado" role="status">Cargando la carta…</p>}
        {productos?.length === 0 && <p className="carta__estado">Por ahora no hay productos disponibles. Escríbenos por WhatsApp.</p>}
        {categorias.map((c) => (
          <section key={c.id} id={c.id} className="categoria" aria-labelledby={`${c.id}-t`}>
            <h2 id={`${c.id}-t`} className="categoria__cartel"><span>{c.nombre}</span></h2>
            {productos.filter((p) => p.cat === c.id).map((p) => (
              <Producto key={p.id} producto={p} carrito={carrito} onCambiar={onCambiar} />
            ))}
          </section>
        ))}
      </main>

      <footer className="pie">
        <p>
          WhatsApp <a href={`https://wa.me/${NEGOCIO.whatsapp}`}>{NEGOCIO.whatsappVisible}</a><br />
          Instagram <a href={`https://instagram.com/${NEGOCIO.instagram}`}>@{NEGOCIO.instagram}</a>
        </p>
        <p className="pie__legal">{NEGOCIO.resolucion}</p>
      </footer>

      <div className={`barra${res.lineas.length ? ' barra--visible' : ''}`} aria-hidden={res.lineas.length ? undefined : true}>
        <button type="button" onClick={() => setAbierto(true)} tabIndex={res.lineas.length ? 0 : -1}>
          <span className="barra__canasto">
            <Canasto className="canasto" />
            <span className="barra__cuenta" key={res.unidades}>{res.unidades}</span>
          </span>
          <span className="barra__texto">Ver mi canasto</span>
          <span className="barra__total">{precio(res.total)}</span>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">{aviso}</p>

      <Pedido abierto={abierto} onCerrar={() => setAbierto(false)} res={res}
        onCambiar={onCambiar} onVaciar={() => { setCarrito({}); setAbierto(false) }} />
    </>
  )
}
