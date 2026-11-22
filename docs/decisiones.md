# Decisiones del proyecto

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-11-22 | Desarrollo dentro de un dev container (Node 22 + Claude Code) | Entorno aislado y reproducible |
| 2026-11-22 | Stack: Vite + React como PWA (vite-plugin-pwa) | Liviano, mobile-first, instalable; sin servidor en v1 |
| 2026-11-22 | v1 envía el pedido por WhatsApp (mensaje prellenado), pago fuera de la app | Reemplaza el flujo actual PDF + mensaje sin backend de pagos |
| 2026-11-22 | Build en un solo archivo (`dist/index.html`, vite-plugin-singlefile) con fotos y fuentes incrustadas | La carta se comparte como archivo y debe abrir sin servidor ni internet |
| 2026-11-22 | Mundo visual "puesto de granja": pradera, madera, canasto | Pedido del usuario: "de granja: madera, praderas" |
| 2026-11-22 | Sin envío por Instagram; nombre, apellido y teléfono obligatorios en el canasto | Pedido del usuario: el pedido llega solo por WhatsApp y con datos de contacto completos |
