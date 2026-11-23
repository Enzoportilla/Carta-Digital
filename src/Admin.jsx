import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase.js'
import { CATEGORIAS } from './data.js'
import { kilos } from './cart.js'

function Login() {
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const entrar = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setEnviando(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email: f.get('correo'), password: f.get('clave') })
    setEnviando(false)
    if (error) setError(error.status === 400 ? 'Correo o contraseña incorrectos.' : 'No se pudo iniciar sesión. Revisa tu conexión.')
  }

  return (
    <form className="admin__login" onSubmit={entrar}>
      <h1>Entrar al panel</h1>
      <label className="campo"><span>Correo</span><input name="correo" type="email" autoComplete="username" required /></label>
      <label className="campo"><span>Contraseña</span><input name="clave" type="password" autoComplete="current-password" required /></label>
      <button type="submit" className="agregar" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button>
      <p className="aviso" role="alert">{error}</p>
    </form>
  )
}

const coma = (n) => String(n).replace('.', ',')

function Fila({ p, onGuardar }) {
  const kg = p.unidad_venta === 'kg'
  const [stockTxt, setStockTxt] = useState(coma(p.stock))
  const [precioTxt, setPrecioTxt] = useState(String(p.precio_clp))
  useEffect(() => setStockTxt(coma(p.stock)), [p.stock])
  useEffect(() => setPrecioTxt(String(p.precio_clp)), [p.precio_clp])

  // kg en pasos de ½; unidades enteras.
  const guardarStock = (n) => {
    const v = Math.max(0, kg ? Math.round(n * 2) / 2 : Math.round(n))
    if (!Number.isFinite(v)) return setStockTxt(coma(p.stock))
    setStockTxt(coma(v))
    if (v !== Number(p.stock)) onGuardar(p.id, { stock: v })
  }
  const guardarPrecio = () => {
    const v = Number.parseInt(precioTxt.replace(/\D/g, ''), 10)
    if (!Number.isFinite(v)) return setPrecioTxt(String(p.precio_clp))
    setPrecioTxt(String(v))
    if (v !== p.precio_clp) onGuardar(p.id, { precio_clp: v })
  }
  const nombre = [p.nombre, p.formato].filter(Boolean).join(' · ')
  const agotado = !(Number(p.stock) > 0)

  return (
    <li className={`admin__fila${!p.activo || agotado ? ' admin__fila--oculta' : ''}`}>
      <p className="admin__nombre">{nombre}
        <small>{!p.activo ? 'Oculto' : agotado ? 'Sin stock: no se muestra' : `Stock ${kg ? kilos(Number(p.stock)) : p.stock}`}</small>
      </p>
      <div className="paso" role="group" aria-label={`Stock de ${nombre}`}>
        <button type="button" onClick={() => guardarStock(Number(p.stock) - (kg ? 0.5 : 1))} aria-label={`Restar stock de ${nombre}`}>−</button>
        <input className="admin__num" inputMode="decimal" value={stockTxt} aria-label={`Stock de ${nombre}${kg ? ' en kilos' : ''}`}
          onChange={(e) => setStockTxt(e.target.value)} onBlur={() => guardarStock(Number(stockTxt.replace(',', '.')))}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()} />
        <button type="button" onClick={() => guardarStock(Number(p.stock) + (kg ? 0.5 : 1))} aria-label={`Sumar stock de ${nombre}`}>+</button>
      </div>
      <label className="admin__precio">
        <span>$</span>
        <input className="admin__num" inputMode="numeric" value={precioTxt} aria-label={`Precio de ${nombre}${kg ? ' por kilo' : ''}`}
          onChange={(e) => setPrecioTxt(e.target.value)} onBlur={guardarPrecio}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()} />
        {kg && <small>/kg</small>}
      </label>
      <label className="admin__activo">
        <input type="checkbox" checked={p.activo} onChange={(e) => onGuardar(p.id, { activo: e.target.checked })} />
        <span>Visible</span>
      </label>
    </li>
  )
}

function Panel() {
  const [filas, setFilas] = useState(null)
  const [aviso, setAviso] = useState('')

  const cargar = async () => {
    const { data, error } = await supabase.from('productos').select('*').order('orden')
    if (error) return setAviso('No se pudo cargar la lista. Revisa tu conexión.')
    setFilas(data)
  }
  useEffect(() => { cargar() }, [])

  // Optimista: se ve al tiro; si falla se avisa y se recarga lo que hay en la base.
  const guardar = async (id, cambios) => {
    setFilas((fs) => fs.map((f) => (f.id === id ? { ...f, ...cambios } : f)))
    const { error } = await supabase.from('productos').update(cambios).eq('id', id)
    if (error) { setAviso('No se guardó el cambio. Inténtalo de nuevo.'); cargar() } else setAviso('Guardado')
  }

  const nombreCat = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c.nombre]))
  const cats = [...new Set((filas ?? []).map((f) => f.categoria))]

  return (
    <>
      <header className="admin__cabeza">
        <h1>Stock y precios</h1>
        <Link to="/">Ver carta</Link>
        <button type="button" className="copiar" onClick={() => supabase.auth.signOut()}>Salir</button>
      </header>
      <p className="aviso" role="status">{aviso}</p>
      {!filas && !aviso && <p>Cargando…</p>}
      {cats.map((c) => (
        <section key={c} className="admin__cat">
          <h2>{nombreCat[c] ?? c}</h2>
          <ul>{filas.filter((f) => f.categoria === c).map((f) => <Fila key={f.id} p={f} onGuardar={guardar} />)}</ul>
        </section>
      ))}
    </>
  )
}

export default function Admin() {
  const [sesion, setSesion] = useState(undefined) // undefined = revisando
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSesion(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSesion(s))
    return () => data.subscription.unsubscribe()
  }, [])

  return (
    <main className="admin">
      {sesion === undefined ? <p>Cargando…</p> : sesion ? <Panel /> : <Login />}
    </main>
  )
}
