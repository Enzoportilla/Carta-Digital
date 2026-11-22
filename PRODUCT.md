# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Vite + React, compilado a un solo HTML autocontenido (vite-plugin-singlefile). Es liviano, mobile-first y no necesita servidor para la v1 porque el pedido se envía por WhatsApp. Frontend en el puerto 5173; el 3000 queda reservado para una API futura (panel del local). Elegido por Claude por encargo del usuario el 2026-11-22.

## Users

- **Clientes frecuentes** que hoy reciben el catálogo en PDF y piden por mensaje. Ya conocen los productos y quieren repetir pedidos rápido desde el celular.
- **Clientes nuevos** que llegan a Nonna Rosa por primera vez. Necesitan entender qué venden (quesos de cabra artesanales y productos de campo), cómo se pide y cómo se entrega.
- **El local (Nonna Rosa)**: recibe los pedidos y mantiene el catálogo (productos, precios, fotos, disponibilidad).

## Product Purpose

Reemplazar el catálogo en PDF y el pedido por mensaje con una carta en línea: el cliente navega por categorías, arma un carrito, elige retiro o delivery y envía el pedido. Hay éxito cuando el pedido llega completo y sin ambigüedad (productos, cantidades, total, modalidad, datos de contacto), así el local no tiene que ir y volver por chat para confirmarlo.

## Positioning

Es el catálogo propio de Quesería Nonna Rosa (quesos finos de cabra y productos de campo) convertido en una forma directa de pedir, sin intermediarios ni comisiones de apps de delivery.

## Operating Context

- Hoy el catálogo es un PDF que se actualiza por fecha (referencia: `docs/referencia/catalogo-nonna-rosa-2026-11-11.pdf`, 13 páginas) y los pedidos llegan por mensaje.
- v1: el canasto pide nombre, apellido y teléfono (obligatorios) y arma el mensaje "Hola Nonna Rosa, soy {nombre} {apellido} y mi pedido es: …" con el teléfono al final. WhatsApp se abre con el mensaje prellenado (`wa.me/56978900650`); también se puede solo copiar. Sin envío por Instagram (decisión del usuario). El pago se hace fuera de la app.
- La carta se entrega como **un solo archivo HTML** (`dist/index.html`, con fotos y fuentes incrustadas) que se puede enviar a terceros y abrir sin servidor ni internet.
- Se usa casi siempre en el celular.

## Capabilities and Constraints

- Carta por categorías, carrito, elección retiro/delivery y envío del pedido por WhatsApp.
- Edición del catálogo por el local: necesaria según el objetivo del proyecto. **Por decidir** cómo se hace en la v1 (archivo de datos, panel o CMS).
- Español de Chile; precios en CLP sin decimales (`$12.990`); zona horaria `America/Santiago`.
- Mobile-first. PWA instalable: pendiente (no aplica al archivo HTML que se comparte).
- Pagos en línea: fuera de la v1. Si se agregan, siempre con un proveedor (Mercado Pago, Webpay/Transbank, Flow); nunca se manejan tarjetas directamente.
- Contacto: WhatsApp +56 9 7890 0650, Instagram @queserianonnarosa.
- **Por decidir**: zonas y costo de delivery (hoy "se consulta"), horario de retiro, pedido mínimo, plazos de entrega.

## Brand Commitments

- Nombre: **Nonna Rosa**.
- Datos de productos y marca: `docs/referencia/carta.md`; referencia visual: `docs/referencia/paginas/`. Logo redondo crema con borde terracota y una cabra.
- Mundo visual pedido por el usuario: "de granja: madera, praderas".

## Evidence on Hand

- `docs/referencia/catalogo-nonna-rosa-2026-11-11.pdf` y su transcripción `docs/referencia/carta.md`; las fotos de producto de la web son recortes de ese catálogo (`src/fotos/`).
- No hay fotos individuales en alta resolución, logo vectorial ni testimonios. No inventar productos, precios, reseñas ni datos de contacto.

## Product Principles

1. **Pedir debe ser más fácil que escribir por WhatsApp.** Pocos pasos desde abrir la carta hasta enviar el pedido.
2. **Pedido claro antes que pedido rápido.** El mensaje que recibe el local tiene que poder despacharse sin preguntas.
3. **La carta es la verdad.** Precios y disponibilidad siempre al día. Si un producto está agotado, se muestra, no se esconde.
4. **Funcionar para quien ya compra y para quien recién llega.** Repetir es rápido y lo básico (qué es, cómo se entrega) se entiende a primera vista.
