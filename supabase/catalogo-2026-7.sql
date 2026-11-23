-- Productos nuevos del catálogo 2026 v7 (docs/referencia/catalogo-2026-7/carta.md).
-- Ejecutar en Supabase → SQL Editor, después de schema.sql. No toca productos ya cargados y se puede volver a correr.
-- Stock inicial de ejemplo (10): ajustarlo en #/admin. Agotados y no disponibles parten en 0.
-- Parten ocultos: Queso Maduro (el catálogo no trae precio) y Miel La Abejita (podría ser la misma Miel Pura PhiBee).
insert into public.productos (id, categoria, nombre, formato, unidad_venta, precio_clp, stock, descripcion, imagen, orden, activo) values
  ('queso-fresco-oregano', 'quesos', 'Queso Fresco con Especias', 'Orégano', 'unidad', 10000, 10, 'De cabra. El queso fresco Nonna Rosa, cubierto de especias.', 'queso-fresco-especias', 11, true),
  ('queso-fresco-merken',  'quesos', 'Queso Fresco con Especias', 'Merkén', 'unidad', 10000, 10, 'De cabra. El queso fresco Nonna Rosa, cubierto de especias.', 'queso-fresco-especias', 12, true),
  ('queso-cendre',   'quesos', 'Queso Céndre', 'De cabra. Pieza', 'unidad', 12000, 10, 'Afinado con ceniza de olivillo, de aspecto elegante y carácter refinado. Pasta firme pero fundente, con aromas lácticos limpios y un ligero matiz mineral.', 'queso-cendre', 22, true),
  ('queso-romance',  'quesos', 'Queso Romance', 'De cabra. Pieza en forma de corazón', 'unidad', 10000, 10, 'De pasta láctica y corteza blanca. Suave y cremoso, con notas frescas y delicadas. Para compartir en celebraciones.', 'queso-romance', 23, true),
  ('queso-vendange', 'quesos', 'Queso Vendange', 'De cabra. Pieza', 'unidad', 12000, 10, 'Envuelto en hojas de parra y afinado con un sutil marmoleado en vino especiado con cáscaras de naranja. Sabor complejo y elegante.', 'queso-vendange', 24, true),
  ('queso-maduro',   'quesos', 'Queso Maduro', 'De cabra', 'unidad', 0, 0, null, 'queso-maduro', 31, false),
  ('queso-azul',     'quesos', 'Queso Azul Santa Fe', 'De vaca. ¼ kg', 'unidad', 6000, 10, 'Pasta semiblanda con vetas de Penicillium roqueforti, que le dan su sabor fuerte y distintivo.', 'queso-azul', 41, true),
  ('melk-nimbus',    'quesos', 'Queso Nimbus', 'Cremería Familiar Melk. 110 g', 'unidad', 10000, 10, 'Cremoso queso de pasta blanda madurado en cenizas de nogal, con una fina corteza florecida.', 'melk-nimbus', 42, true),
  ('melk-undam',     'quesos', 'Queso Undam', 'Cremería Familiar Melk. 250 g', 'unidad', 12000, 0, 'Cremoso queso de pasta blanda con corteza florecida, madurado desde 21 días. Su cremosidad avanza día a día hacia el corazón del queso.', 'melk-undam', 43, true),
  ('melk-ligno',     'quesos', 'Queso Ligno', 'Cremería Familiar Melk. 200 g', 'unidad', 10000, 0, 'Queso curado, de textura firme y granular. Intenso, ligeramente salado y dulce, con notas picantes y nogadas. Madurado al menos 6 meses.', 'melk-ligno', 44, true),
  ('manjar-cabra',   'manjar', 'Manjar Artesanal de Leche de Cabra', '250 g', 'unidad', 6000, 10, '100% leche de cabra, con toques de canela y clavo de olor.', 'manjar-cabra', 73, true),
  ('miel-abejita',   'miel', 'Miel La Abejita de Caleu', 'Frasco de 1 kg', 'unidad', 10000, 10, null, 'miel-pura', 101, false),
  ('abejologa-panal-100',   'miel', 'Miel en Panal La Abejóloga', '100 g', 'unidad', 3000, 10, 'Miel orgánica de floraciones nativas de la cordillera de la Costa, Región de Valparaíso. Ideal para tablas y para acompañar queso de cabra.', 'abejologa-panal', 112, true),
  ('abejologa-panal-400',   'miel', 'Miel en Panal La Abejóloga', '400 g', 'unidad', 7000, 10, 'Miel orgánica de floraciones nativas de la cordillera de la Costa, Región de Valparaíso. Ideal para tablas y para acompañar queso de cabra.', 'abejologa-panal', 113, true),
  ('abejologa-pet-500',     'miel', 'Miel La Abejóloga, envase PET', '500 g', 'unidad', 5000, 10, 'Miel orgánica, cosechada y envasada en frío, de floraciones nativas de la cordillera de la Costa, Región de Valparaíso.', 'abejologa-pet', 114, true),
  ('abejologa-pet-1000',    'miel', 'Miel La Abejóloga, envase PET', '1 kg', 'unidad', 9000, 10, 'Miel orgánica, cosechada y envasada en frío, de floraciones nativas de la cordillera de la Costa, Región de Valparaíso.', 'abejologa-pet', 115, true),
  ('abejologa-pet-1500',    'miel', 'Miel La Abejóloga, envase PET', '1,5 kg', 'unidad', 13500, 10, 'Miel orgánica, cosechada y envasada en frío, de floraciones nativas de la cordillera de la Costa, Región de Valparaíso.', 'abejologa-pet', 116, true),
  ('abejologa-vidrio-400',  'miel', 'Miel La Abejóloga, envase de vidrio', '400 g', 'unidad', 4500, 10, 'Miel orgánica, cosechada y envasada en frío, de floraciones nativas de la cordillera de la Costa, Región de Valparaíso.', 'miel-pura', 117, true),
  ('abejologa-vidrio-1000', 'miel', 'Miel La Abejóloga, envase de vidrio', '1 kg', 'unidad', 9500, 10, 'Miel orgánica, cosechada y envasada en frío, de floraciones nativas de la cordillera de la Costa, Región de Valparaíso.', 'miel-pura', 118, true),
  ('abejologa-vidrio-3000', 'miel', 'Miel La Abejóloga, envase de vidrio', '3 kg', 'unidad', 25000, 10, 'Miel orgánica, cosechada y envasada en frío, de floraciones nativas de la cordillera de la Costa, Región de Valparaíso.', 'miel-pura', 119, true),
  ('aceite-oliva-500',  'despensa', 'Aceite de Oliva', '500 cc', 'unidad', 9000, 10, 'Artesanal de Til-Til. Acidez 0,2%.', 'aceite-oliva', 130, true),
  ('aceite-oliva-1000', 'despensa', 'Aceite de Oliva', '1.000 cc', 'unidad', 15000, 10, 'Artesanal de Til-Til. Acidez 0,2%.', 'aceite-oliva', 131, true),
  ('charqui-llama',     'despensa', 'Charqui de Llama', '100 g', 'unidad', 10000, 10, 'Artesanal del Altiplano de Arica.', 'charqui-llama', 140, true),
  ('licor-manjar-cabra', 'licores', 'Licor de Crema de Manjar de Cabra', 'Botella', 'unidad', 12000, 10, 'Artesanal de Til-Til. Aguardiente macerado en tuna con manjar de leche de cabra. Cremoso.', 'licor-manjar', 150, true)
on conflict (id) do nothing;
