# RAMALC — propuesta de renovación

Primera propuesta navegable para la Red Antimilitarista de América Latina y el Caribe. La composición recoge una retícula constructiva de módulos desiguales, símbolos vectoriales integrados y la orientación «Nuestro norte es el sur». La paleta usa verde bosque, salvia, berenjena, terracota y papel; las imágenes originales conservan sus colores. El mapa invertido protagoniza la portada.

La campaña Encuentro Regional RAMALC 2026 ocupa la portada y enlaza directamente a WhyDonate.

## Contenido

- 127 publicaciones recuperadas de la interfaz pública de ramalc.org.
- Archivos de Novedades, Artículos, Comunicados y Multimedia.
- Páginas de la red, Rompiendo Filas, Publicaciones y Contacto.
- Textos y fragmentos del sitio original, con enlaces de procedencia.
- Imágenes originales guardadas en `assets/`; correspondencias en `sources-assets.json`.

Los contenidos se conservan como documentos publicados por RAMALC. Las fechas, afirmaciones históricas, contactos y enlaces proceden del sitio y no implican una actualización editorial de sus fuentes. Cinco imágenes históricas no pudieron recuperarse. Los audios, videos, documentos y la campaña requieren conexión y conservan sus enlaces externos.

La página original de Contacto devolvía una página inexistente. Esta propuesta reúne el correo y los enlaces publicados en otras páginas de RAMALC.

## Uso

Sitio estático sin dependencias de compilación. Servir esta carpeta con cualquier servidor HTTP; por ejemplo:

```sh
python3 -m http.server 8765
```

Las rutas internas usan fragmentos `#/` para funcionar en GitHub Pages. `data.json` contiene las publicaciones y páginas; `app.js` controla navegación, búsqueda y filtros; `style.css` contiene el diseño adaptable a móvil.

## Fuentes

- https://ramalc.org/
- https://ramalc.org/encuentro-regional-ramalc-2026/
- https://ramalc.org/wp-json/wp/v2/posts
- https://ramalc.org/wp-json/wp/v2/pages
- https://whydonate.com/es/fundraising/encuentro-antimilitarismo-desde-abajo-resistencias-a-la-militarizacion?v=16fcfyo

El mapa invertido incorporado a la composición fue aportado por el usuario como referencia visual.

Los derechos de los textos, imágenes y publicaciones corresponden a sus titulares originales. Esta propuesta no sustituye el dominio ramalc.org.
