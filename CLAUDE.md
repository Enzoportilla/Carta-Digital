# Carta en línea

Página web / app que muestra una **carta o menú de comida** y permite **hacer pedidos en línea**.

## Objetivo
- Cliente: ve la carta por categorías, agrega productos a un carrito, elige retiro o delivery y envía el pedido.
- Local: recibe los pedidos y puede editar la carta (productos, precios, fotos, disponibilidad).
- Debe funcionar bien en celular (mobile-first) y poder instalarse como app (PWA).

## Idioma y región
- Interfaz y textos en **español (Chile)**.
- Precios en **CLP**, sin decimales, formato `$12.990` (`Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })`).
- Zona horaria: `America/Santiago`.

## Cliente y carta de referencia
Primer cliente: **Quesería Nonna Rosa** (quesos de cabra artesanales y productos de campo).
- **Catálogo más reciente (23 nov 2026, 29 págs.):** `docs/referencia/catalogo-2026-7/carta.md` — fuente de verdad para productos, precios, promociones y disponibilidad; imágenes en `docs/referencia/catalogo-2026-7/paginas/`.
- Catálogo anterior (11 nov): `docs/referencia/carta.md` (marca, contacto y estética siguen vigentes; precios reemplazados por el más reciente).
- Referencia visual del catálogo anterior: `docs/referencia/paginas/`; PDFs originales en cada carpeta.
Usa estos datos para la carta inicial (semilla) y toma la estética como inspiración, no como copia literal.

## Estructura
- `src/` — código de la aplicación
- `public/` — imágenes y archivos estáticos
- `docs/` — decisiones y notas del proyecto (ver `docs/decisiones.md`)
- `.devcontainer/devcontainer.json` — contenedor de desarrollo (Node 22 + Claude Code); plantilla en `docs/devcontainer.json`

## Stack
Aún por decidir. Proponer opciones antes de crear el esqueleto y registrar la elección en `docs/decisiones.md`.
Puertos reservados en el contenedor: `5173` (frontend) y `3000` (API).

## Convenciones
- Commits pequeños y descriptivos en español.
- No guardar claves ni datos de pago en el repo; usar `.env` (ignorado por git) y dejar `.env.example`.
- Pagos: nunca manejar números de tarjeta directamente; usar un proveedor (p. ej. Mercado Pago, Webpay/Transbank, Flow).
- Antes de dar algo por terminado: correr lint/tests y probar el flujo de pedido en vista móvil.
