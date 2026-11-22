---
name: Nonna Rosa · Carta en línea
description: Puesto de granja a la orilla del camino; carteles de madera pintados sobre una pradera, y el pedido se junta en un canasto.
colors:
  cielo: "#cfe4ea"
  sol: "#f6e7a8"
  loma-1: "#a9c97a"
  loma-2: "#7fab4e"
  loma-3: "#5a8a34"
  pasto: "#e6edcf"
  pasto-hondo: "#d3dfb2"
  hoja: "#f8faef"
  madera: "#8a5a35"
  madera-clara: "#a77446"
  nogal: "#3b2a1c"
  nogal-suave: "#66523c"
  tiza: "#fbf6e9"
  sello: "#b9592a"
  wa: "#1f7a4d"
  foco: "#3f6b22"
  cordel: "#c9b48a"
typography:
  display:
    fontFamily: "Kavoon, Alegreya Sans, Georgia, serif"
    fontSize: "clamp(2rem, 9.5vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "Kavoon, Alegreya Sans, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "Kavoon, Alegreya Sans, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.15
  price:
    fontFamily: "Kavoon, Alegreya Sans, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Alegreya Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Alegreya Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Alegreya Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
  small:
    fontFamily: "Alegreya Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  tablilla: "5px"
  cartel: "6px"
  barra: "10px"
  campo: "0.75rem"
  hoja: "1.25rem"
  pill: "999px"
  redondo: "50%"
spacing:
  gutter: "16px"
  ancho: "46rem"
  fila: "1.5rem"
  categoria: "2.5rem"
components:
  button-agregar:
    backgroundColor: "{colors.foco}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.2rem 0 1rem"
    height: "2.75rem"
  button-enviar-wa:
    backgroundColor: "{colors.wa}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    height: "3.4rem"
  button-enviar-ig:
    backgroundColor: "{colors.nogal}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    height: "3.4rem"
  chip-opcion:
    backgroundColor: "{colors.hoja}"
    textColor: "{colors.nogal}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.95rem"
    height: "2.5rem"
  chip-opcion-elegida:
    backgroundColor: "{colors.loma-1}"
    textColor: "{colors.nogal}"
    rounded: "{rounded.pill}"
  tablilla-precio:
    backgroundColor: "{colors.madera}"
    textColor: "{colors.tiza}"
    typography: "{typography.price}"
    rounded: "{rounded.tablilla}"
    padding: "0.3rem 0.8rem 0.35rem"
  cartel-categoria:
    backgroundColor: "{colors.madera}"
    textColor: "{colors.tiza}"
    typography: "{typography.headline}"
    rounded: "{rounded.tablilla}"
    padding: "0.3rem 1rem 0.4rem"
  input-campo:
    backgroundColor: "#ffffff"
    textColor: "{colors.nogal}"
    rounded: "{rounded.campo}"
    padding: "0.65rem 0.875rem"
    height: "3rem"
  barra-canasto:
    backgroundColor: "{colors.madera}"
    textColor: "{colors.tiza}"
    typography: "{typography.label}"
    rounded: "{rounded.barra}"
    height: "3.75rem"
---

# Design System: Nonna Rosa · Carta en línea

## Overview

**Creative North Star: "El puesto de granja a la orilla del camino"**

La carta es un puesto de campo: una pradera pintada (cielo, tres lomas en capas, cerco, florcitas) sostiene un poste del que cuelga el sello de Nonna Rosa, y todo lo que nombra o cobra es madera veteada pintada a mano. El suelo es pasto seco claro, no blanco ni crema; el texto es nogal oscuro, nunca negro. El pedido no es un carrito: es un canasto de mimbre que se llena.

La densidad es de lista de mercado, una columna de 46rem con filas generosas separadas por una línea de puntadas discontinua. La madera trae la jerarquía (carteles de categoría, tablillas de precio, la barra del canasto, la opción de entrega elegida); el verde pradera trae la acción (Agregar, opción elegida, foco). Los carteles van levemente torcidos (−1.5° a −3°), como clavados a mano.

Rechaza dos cosas, confirmadas en la dirección: la tienda online de tarjetas blancas idénticas, y el "rústico" de fondo crema con serif.

**Key Characteristics:**
- Madera veteada (SVG feTurbulence estirado sobre degradé madera-clara → madera) como único material de cartel.
- Letra pintada Kavoon en blanco tiza sobre madera; Alegreya Sans para todo lo que se lee.
- Fotos de producto redondas con aro de hoja, como platos o etiquetas de frasco.
- Carteles torcidos y colgados (pita, clavo, cordel), nunca rectos y flotando.
- Movimiento con rebote amortiguado: el letrero se mece, las lomas suben, el círculo se pinta.

## Colors

Una pradera de verdes cálidos y pasto seco, con madera y nogal de contrapunto y una sola gota de terracota.

### Primary
- **Madera de Cartel** (madera / madera-clara): base de todo cartel, siempre con la veta encima en degradé de madera-clara arriba a madera abajo. Pestaña de categoría activa, cartel de categoría, tablilla de precio, barra del canasto, cabeza de la hoja, opción de entrega elegida, poste y brazo del letrero.

### Secondary
- **Loma Honda** (loma-3): el verde de la acción. Borde y glifos del control de cantidad, borde de la opción elegida y del campo enfocado.
- **Loma Tierna** (loma-1): relleno de la opción elegida, anillo de foco en campos, aviso de copiado, selección de texto.
- **Loma Media** (loma-2): capa media del paisaje y borde de opción en hover.

### Tertiary
- **Sello Terracota** (sello): reservado a la marca y a la cuenta del canasto (la pastilla con el número sobre el mimbre).
- **Verde WhatsApp** (wa): solo el botón "Enviar por WhatsApp".
- **Verde Foco** (foco): fondo de "Agregar", contorno de foco de teclado (3px) y caret de los campos.

### Neutral
- **Pasto Seco** (pasto): fondo de página, de la barra de categorías y de la hoja del canasto.
- **Pasto Hondo** (pasto-hondo): líneas de puntadas discontinuas, bordes de opción y campo en reposo, hover de pestañas, fondo de foto mientras carga.
- **Hoja** (hoja): aro de las fotos, fondo de chips de opción, control de cantidad, botón cerrar, vista previa del mensaje.
- **Nogal** (nogal): todo el texto; la marca pintada a mano del producto elegido.
- **Nogal Suave** (nogal-suave): texto secundario (formato del producto, notas, precios de línea, legal).
- **Tiza** (tiza): letra sobre madera y aro del sello.
- **Cielo / Sol** (cielo, sol): solo en el cabezal pintado.
- **Cordel** (cordel): pitas y cordeles de los que cuelgan sello y tablillas.

### Named Rules
**The Una Gota de Terracota Rule.** El sello terracota aparece solo en la marca y en la cuenta del canasto. El círculo pintado de "elegido" es nogal, no terracota.

**The Nunca Negro Rule.** El texto más oscuro es nogal (#3b2a1c). Las sombras son de tierra tostada (rgb 40 25 10), no grises.

**The La Madera Nombra, el Verde Actúa Rule.** Lo que nombra o cobra (categoría, precio, canasto) es madera. Lo que se toca para agregar o elegir es verde pradera. No intercambiarlos.

## Typography

**Display Font:** Kavoon (con Alegreya Sans, Georgia)
**Body Font:** Alegreya Sans 400/500/700 (con system-ui)

**Character:** Kavoon es letra de cartel pintado con pincel grueso, redonda y alegre; Alegreya Sans es humanista y cálida, legible a 17px en el celular. Ambas van incrustadas en el HTML (woff2 latin).

### Hierarchy
- **Display** (Kavoon 400, clamp(2rem, 9.5vw, 3.6rem), 1): solo el tablón del cabezal, en tiza sobre madera.
- **Headline** (Kavoon 400, 1.75rem, 1.1): carteles de categoría; 1.6rem en la cabeza del canasto.
- **Title** (Kavoon 400, 1.375rem, 1.15): nombre de producto, en nogal sobre pasto.
- **Price** (Kavoon 400, 1.3rem, 1.1): monto en la tablilla y total de la barra; 1.6rem para el total del canasto.
- **Lead** (Alegreya Sans 500, 1.25rem, 1.4, máx. 36ch): la frase de bienvenida.
- **Body** (Alegreya Sans 400, 1.0625rem, 1.55, máx. 46–52ch): descripciones y texto corrido.
- **Label** (Alegreya Sans 700, 1.0625rem): botones, pestañas, rótulos de campo.
- **Small** (Alegreya Sans 400, 0.9375rem): notas, ayudas y legal, en nogal suave.

### Named Rules
**The Pintado Solo en Kavoon Rule.** Kavoon va siempre en peso 400 y solo en títulos y montos. Nunca en párrafos, botones ni rótulos.

**The Cifras Parejas Rule.** Cantidades, cuentas y precios de línea usan `font-variant-numeric: tabular-nums`. Precios en CLP sin decimales ($12.990).

## Layout

Mobile-first en una sola columna centrada de 46rem (ancho) con 16px de margen lateral (gutter). El cabezal es un paisaje a todo el ancho, alto clamp(26rem, 92vw, 34rem). Debajo, la barra de categorías se pega arriba (sticky) y se desliza en horizontal con un desvanecido a la derecha; el scroll deja 4.25rem de colchón para que el cartel de categoría no quede tapado.

Cada producto es una fila de dos columnas (foto 6.5rem | cuerpo), 1.5rem de aire vertical y puntada discontinua entre filas; las categorías se separan 2.5rem. Desde 40rem la foto crece a 9rem y el hueco a 1.5rem; desde 64rem las pestañas se centran.

La barra del canasto es fija abajo (máx. 30rem), entra desde abajo cuando hay algo y respeta el safe-area. La hoja del canasto es un dialog que sube desde abajo (máx. 92dvh); desde 64rem se vuelve panel lateral derecho de 28rem a toda la altura.

## Elevation & Depth

Profundidad de objeto físico, no de interfaz: los carteles de madera proyectan sombras cálidas, difusas y con spread negativo hacia abajo, como tablas colgadas a unos centímetros de la pared. El suelo (pasto) es plano; solo la madera, las fotos y la barra se levantan.

### Shadow Vocabulary
- **Tablilla colgada** (`box-shadow: 0 6px 12px -6px rgb(40 25 10 / .6)`): tablillas de precio y carteles de categoría (variante `0 6px 14px -8px`).
- **Tablón** (`box-shadow: 0 10px 22px -10px rgb(40 25 10 / .6)`): el tablón del cabezal.
- **Barra** (`box-shadow: 0 14px 30px -12px rgb(40 25 10 / .75)`): la barra flotante del canasto.
- **Foto con aro** (`box-shadow: 0 0 0 4px var(--hoja), 0 8px 18px -10px rgb(40 25 10 / .55)`): fotos de producto; el sello usa el mismo patrón con aro tiza de 5px.
- **Pestaña activa** (`box-shadow: 0 4px 8px -5px rgb(40 25 10 / .6)`): pestaña y opción de entrega elegidas.

### Named Rules
**The Solo la Madera Flota Rule.** El pasto, los chips y los campos son planos. Las sombras pertenecen a madera, fotos y la barra.

## Shapes

Tres familias de forma. Madera: rectángulos con esquinas apenas gastadas (5–6px; la barra 10px) y rotación leve. Toque: píldoras completas (999px) para botones, chips y control de cantidad, y círculos para botones de ícono. Campos: esquinas suaves de 0.75rem. Las fotos y el sello son círculos perfectos con aro claro. Las divisiones son puntadas discontinuas de 2px en pasto hondo; la única línea sólida es el filete nogal de 2px sobre el total. Los carteles cuelgan: la tablilla de precio lleva un arco de pita y un clavo arriba; el sello, dos cordeles al brazo del poste.

## Components

### Buttons
Táctiles y redondos, con hundimiento al tocar.
- **Shape:** píldora completa (999px); botones de ícono circulares de 2.75rem.
- **Agregar:** foco (#3f6b22, contraste AA con blanco) con texto blanco 700, alto 2.75rem, ícono + a la izquierda. Hover un verde más hondo; active `scale(.95)`.
- **Enviar:** píldoras de 3.4rem a todo el ancho, 1.125rem 700. WhatsApp en wa. Hover `brightness(1.08)`.
- **Terciario (Solo copiar):** sin fondo, texto madera 700 con ícono.
- **Destructivo (Vaciar canasto):** texto nogal suave subrayado, centrado y separado del bloque de envío.
- **Focus:** contorno foco de 3px a 3px de distancia en todo lo interactivo.

### Chips (opciones de formato y sabor)
- **Style:** píldora de 2.5rem de alto, fondo hoja, borde 2px pasto hondo, 500.
- **State:** hover borde loma-2; elegido (aria-checked) relleno loma-1, borde loma-3, 700. Se comportan como radiogroup.

### Inputs / Fields
- **Style:** fondo blanco, borde 2px pasto hondo, radio 0.75rem, alto mínimo 3rem; rótulo 700 encima y ayuda en small nogal suave.
- **Focus:** borde loma-3 más anillo de 3px loma-1; caret foco.
- **Entrega (retiro / delivery):** dos opciones en grilla 1fr 1fr con el mismo estilo de campo; la elegida se vuelve madera con letra tiza.

### Navigation (tablillas de categorías)
- Barra pegajosa sobre pasto con filete pasto hondo y sombra suave. Pestañas 700 nogal, radio 6px; hover pasto hondo; la categoría en que estás (aria-current) es una tablilla de madera con letra tiza.

### Tablilla de precio (firma)
Una tablilla de madera torcida −3° colgada de una pita (arco cordel de 2px) con un clavo metálico arriba. Monto en Kavoon tiza; "el kilo" en Alegreya 500 al lado. La misma tablilla muestra el total del canasto.

### Foto de producto y círculo pintado (firma)
Foto redonda con aro hoja. Al elegir un producto se dibuja encima un círculo a mano en nogal (trazo 4px, girado −8°) que se pinta en 520ms. Agotado: foto en gris al 60% y el aviso en texto.

### Barra y hoja del canasto (firma)
La barra es una tabla de madera de 3.75rem: canasto de mimbre dibujado a la izquierda con la cuenta en una pastilla sello (late al cambiar), "Ver mi canasto" y el total en Kavoon. Al agregar, la foto vuela al canasto. La hoja repite el cartel de madera en su cabeza, lista las líneas con foto mini y control de cantidad, y cierra con total, datos, entrega, vista previa del mensaje y envío.

## Do's and Don'ts

### Do:
- **Do** poner todo cartel, precio y canasto sobre la madera veteada (veta + degradé madera-clara → madera), con letra tiza.
- **Do** torcer los carteles entre −1.5° y −3° y colgarlos de algo (pita, cordel, poste).
- **Do** usar foco para el botón Agregar, loma-3 para bordes de acción y loma-1 para lo elegido.
- **Do** escribir todo el texto en nogal o nogal suave sobre pasto, hoja o blanco.
- **Do** separar filas y secciones con la puntada discontinua de 2px en pasto hondo.
- **Do** dar a todo lo tocable al menos 2.5rem de alto (2.75rem en botones principales) y el contorno foco de 3px.
- **Do** animar con la curva de salida (cubic-bezier(.16, 1, .3, 1)) y dejar todo inmóvil con prefers-reduced-motion.

### Don't:
- **Don't** usar tarjetas blancas idénticas con sombra para los productos; el producto es una fila sobre pasto.
- **Don't** usar fondo crema con serif como "rústico"; el suelo es pasto seco y el título es Kavoon pintado.
- **Don't** usar negro puro ni sombras grises.
- **Don't** usar el sello terracota fuera de la marca y la cuenta del canasto.
- **Don't** poner Kavoon en botones, rótulos o párrafos.
- **Don't** traer imágenes externas para la madera o el paisaje; son SVG generados y van incrustados en el HTML.
