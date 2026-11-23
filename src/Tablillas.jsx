import { useEffect, useRef, useState } from 'react'

export const reducirMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Barra pegajosa de categorías: cada una debe tener en la página una sección con su mismo id.
export default function Tablillas({ categorias }) {
  const barra = useRef(null)
  const [visible, setVisible] = useState(null)
  const ids = categorias.map((c) => c.id).join()
  const activa = categorias.some((c) => c.id === visible) ? visible : categorias[0]?.id

  useEffect(() => {
    const lista = ids.split(',')
    // Activa = la última sección cuyo inicio ya pasó bajo la barra (sirve también con secciones muy bajas).
    const revisar = () => {
      // Al fondo de la página la última puede no alcanzar a subir hasta la barra.
      const alFondo = scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 2
      setVisible(alFondo ? lista.at(-1) : lista.findLast((id) => document.getElementById(id)?.getBoundingClientRect().top <= 100))
    }
    revisar()
    window.addEventListener('scroll', revisar, { passive: true })
    return () => window.removeEventListener('scroll', revisar)
  }, [ids])
  useEffect(() => {
    // Centra la tablilla moviendo solo la barra: scrollIntoView también desplaza la página y en el celular corta el deslizamiento del dedo y los saltos a cada categoría.
    const b = barra.current
    const a = b.querySelector('a[aria-current]')
    if (a) b.scrollTo({ left: a.offsetLeft - (b.clientWidth - a.offsetWidth) / 2, behavior: reducirMovimiento() ? 'auto' : 'smooth' })
  }, [activa])

  return (
    <nav className="tablillas" aria-label="Categorías" ref={barra}>
      {categorias.map((c) => (
        // Con HashRouter el # es la ruta: se desplaza a mano en vez de navegar.
        <a key={c.id} href={`#${c.id}`} aria-current={activa === c.id ? 'true' : undefined}
          onClick={(e) => { e.preventDefault(); document.getElementById(c.id)?.scrollIntoView({ behavior: reducirMovimiento() ? 'auto' : 'smooth' }) }}>{c.nombre}</a>
      ))}
    </nav>
  )
}
