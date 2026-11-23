-- Carta Nonna Rosa: tabla de productos con stock, RLS y semilla.
-- Ejecutar completo en Supabase → SQL Editor. Se puede volver a correr sin duplicar datos.

create table if not exists public.productos (
  id           text primary key,            -- slug, p. ej. 'yogurt-cabra-1l'
  categoria    text not null,                -- id de categoría (ver src/data.js)
  nombre       text not null,                -- filas con igual categoría+nombre se muestran como una ficha con opciones
  formato      text,                         -- tamaño o sabor; es la opción elegible cuando la ficha tiene varias filas
  unidad_venta text not null check (unidad_venta in ('unidad', 'kg')),
  precio_clp   integer not null check (precio_clp >= 0),
  stock        numeric not null default 0 check (stock >= 0),  -- unidades o kilos
  descripcion  text,
  imagen       text,                         -- nombre de la foto en src/fotos/<imagen>.jpg
  orden        integer not null default 0,
  activo       boolean not null default true
);

alter table public.productos enable row level security;

drop policy if exists "publico ve disponibles" on public.productos;
drop policy if exists "admin lee todo" on public.productos;
drop policy if exists "admin inserta" on public.productos;
drop policy if exists "admin actualiza" on public.productos;
drop policy if exists "admin borra" on public.productos;

create policy "publico ve disponibles" on public.productos
  for select to anon using (activo = true and stock > 0);
-- Ojo: "authenticated" es cualquier usuario con sesión; el registro público debe estar desactivado en Auth.
create policy "admin lee todo" on public.productos
  for select to authenticated using (true);
create policy "admin inserta" on public.productos
  for insert to authenticated with check (true);
create policy "admin actualiza" on public.productos
  for update to authenticated using (true) with check (true);
create policy "admin borra" on public.productos
  for delete to authenticated using (true);

grant select on public.productos to anon;
grant select, insert, update, delete on public.productos to authenticated;

-- Semilla desde docs/referencia/carta.md (catálogo 11 nov 2026).
-- Stock inicial de ejemplo (10 unidades / 10 kg): ajustarlo en #/admin.
-- Semimaduro parte en 0: el PDF lo marcaba como agotado.
insert into public.productos (id, categoria, nombre, formato, unidad_venta, precio_clp, stock, descripcion, imagen, orden) values
  ('queso-fresco',     'quesos', 'Queso Fresco Nonna Rosa', 'De cabra. Pieza redonda de 500 g aprox.', 'unidad', 10000, 10, 'Con notas saladas que intensifican su sabor. Ideal para desayunos, onces y ensaladas.', 'queso-fresco', 10),
  ('queso-dona-peti',  'quesos', 'Queso Doña Peti', 'De cabra. Pieza de 500 g aprox.', 'unidad', 15000, 10, 'Pasta firme y suave al paladar, con corteza de moho blanco que le da intensidad y carácter. Para aperitivos, con vino blanco, pescados y sobre todo con miel en panal.', 'queso-dona-peti', 20),
  ('queso-semimaduro', 'quesos', 'Queso Semimaduro', 'De cabra. Por kilo', 'kg', 22000, 0, null, 'queso-semimaduro', 30),
  ('queso-mantecoso',  'quesos', 'Queso Mantecoso', 'De vaca. Por kilo, en piezas de ½ kg y 1 kg aprox.', 'kg', 16000, 10, 'Elaboración artesanal de Osorno, sin aditivos ni preservantes.', 'queso-mantecoso', 40),
  ('yogurt-cabra-1l',  'yogurt', 'Yogurt Leche de Cabra', '1 litro', 'unidad', 7500, 10, '100% leche de cabra. Una alternativa bien tolerada por personas con alergia a la proteína de leche de vaca (APLV), por su distinta composición proteica.', 'yogurt-cabra', 50),
  ('yogurt-cabra-05l', 'yogurt', 'Yogurt Leche de Cabra', '½ litro', 'unidad', 4000, 10, '100% leche de cabra. Una alternativa bien tolerada por personas con alergia a la proteína de leche de vaca (APLV), por su distinta composición proteica.', 'yogurt-cabra', 51),
  ('mantequilla',      'mantequilla', 'Mantequilla de Campo', '250 g', 'unidad', 4000, 10, 'Artesanal de Osorno, con ingredientes naturales y sin aditivos. Cremosa y firme, fácil de untar, con un leve toque salado.', 'mantequilla', 60),
  ('manjar-nuez',      'manjar', 'Manjar de Leche de Vaca', 'Nuez', 'unidad', 6000, 10, 'Frasco de 650 g aprox.', 'manjar', 70),
  ('manjar-lucuma',    'manjar', 'Manjar de Leche de Vaca', 'Lúcuma', 'unidad', 6000, 10, 'Frasco de 650 g aprox.', 'manjar', 71),
  ('manjar-solo',      'manjar', 'Manjar de Leche de Vaca', 'Solo', 'unidad', 6000, 10, 'Frasco de 650 g aprox.', 'manjar', 72),
  ('huevos',           'huevos', 'Huevos de Campo', 'Bandeja de 30 huevos', 'unidad', 10000, 10, null, 'huevos', 80),
  ('palta',            'palta', 'Palta Hass orgánica', 'Por kilo', 'kg', 4000, 10, null, 'palta', 90),
  ('miel-pura',        'miel', 'Miel Pura PhiBee', 'Frasco de 1 kg', 'unidad', 10000, 10, '100% miel de abejas.', 'miel-pura', 100),
  ('miel-panal-100',   'miel', 'Miel en Panal', '100 g', 'unidad', 3500, 10, 'Ideal para tablas y para acompañar queso de cabra.', 'miel-panal', 110),
  ('miel-panal-200',   'miel', 'Miel en Panal', '200 g', 'unidad', 5500, 10, 'Ideal para tablas y para acompañar queso de cabra.', 'miel-panal', 111),
  ('mermelada-frutilla',      'mermeladas', 'Mermelada', 'Frutilla', 'unidad', 6000, 10, 'Frasco de 650 g aprox.', 'mermelada', 120),
  ('mermelada-alcayota-nuez', 'mermeladas', 'Mermelada', 'Alcayota nuez', 'unidad', 6000, 10, 'Frasco de 650 g aprox.', 'mermelada', 121),
  ('mermelada-ciruela',       'mermeladas', 'Mermelada', 'Ciruela', 'unidad', 6000, 10, 'Frasco de 650 g aprox.', 'mermelada', 122)
on conflict (id) do nothing;
