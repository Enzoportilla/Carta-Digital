# Decisiones del proyecto

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-11-22 | Desarrollo dentro de un dev container (Node 22 + Claude Code) | Entorno aislado y reproducible |
| 2026-11-22 | Stack: Vite + React como PWA (vite-plugin-pwa) | Liviano, mobile-first, instalable; sin servidor en v1 |
| 2026-11-22 | v1 envía el pedido por WhatsApp (mensaje prellenado), pago fuera de la app | Reemplaza el flujo actual PDF + mensaje sin backend de pagos |
| 2026-11-22 | Build en un solo archivo (`dist/index.html`, vite-plugin-singlefile) con fotos y fuentes incrustadas | La carta se comparte como archivo y debe abrir sin servidor ni internet |
| 2026-11-22 | Mundo visual "puesto de granja": pradera, madera, canasto | Pedido del usuario: "de granja: madera, praderas" |
| 2026-11-22 | Sin envío por Instagram; nombre, apellido y teléfono obligatorios en el canasto | Pedido del usuario: el pedido llega solo por WhatsApp y con datos de contacto completos |
| 2026-11-23 | Publicación en GitHub Pages con GitHub Actions (`.github/workflows/deploy.yml`), rutas con HashRouter | Pages no reescribe rutas; el hash funciona también al abrir el archivo sin servidor |
| 2026-11-23 | Productos, precios y stock en Supabase (`supabase/schema.sql`); la carta se arma desde la tabla `productos` | El local controla stock y precios sin tocar código |
| 2026-11-23 | La carta necesita internet para cargar (antes abría offline) | Es el costo de tener stock en vivo |
| 2026-11-23 | RLS: el público solo lee productos activos con stock > 0; solo usuarios autenticados escriben. Registro público desactivado en Supabase Auth | "Autenticado" sería cualquiera si el registro quedara abierto |
| 2026-11-23 | Formatos y sabores son filas separadas, con su propio precio y stock; filas con igual categoría y nombre se muestran como una ficha con opciones | Poder agotar un sabor o tamaño por separado |
| 2026-11-23 | El stock no baja solo con cada pedido (sigue llegando por WhatsApp): se ajusta en `#/admin` con +/− | El público no puede escribir en la base |
| 2026-11-23 | `imagen` guarda el nombre de la foto incluida en la app (`src/fotos/<imagen>.jpg`) | Subir fotos desde el admin (Supabase Storage) queda para después |
| 2026-11-23 | Se descarta vite-plugin-pwa por ahora | El build en un solo archivo cubre el uso actual |
| 2026-11-23 | Retiro en General Córdova 1249, Providencia (`NEGOCIO.retiro`), con fecha opcional que viaja en el mensaje de WhatsApp | Pedido del usuario; sin fecha, el mensaje sigue preguntando cuándo pasar |
| 2026-11-23 | Catálogo v7: solo productos nuevos, en `supabase/catalogo-2026-7.sql`; categorías nuevas Despensa y Licores | No tocar precios ni stock ya cargados; las promociones (combos) quedan fuera |
