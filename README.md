# RAMALC — propuesta de renovación

Primera propuesta navegable para la Red Antimilitarista de América Latina y el Caribe. La composición recoge una retícula constructiva de módulos desiguales, símbolos vectoriales integrados y la orientación «Nuestro norte es el sur». La paleta usa verde bosque, salvia, berenjena, terracota y papel; las imágenes originales conservan sus colores. El mapa invertido protagoniza la portada.

La campaña Encuentro Regional RAMALC 2026 ocupa la portada y enlaza directamente a WhyDonate.

El QR original de la campaña, aportado por el usuario, permanece flotante en todas las secciones: en una esquina en escritorio y en una franja inferior en celular. El QR y «Dona aquí» abren WhyDonate; el control de minimizar conserva un acceso visible para desplegarlo de nuevo. La imagen se mantiene intacta y sobre fondo blanco para facilitar su lectura.

El logo mantiene su proporción original y dispone de 310 px en escritorio y hasta 290 px en celular; en pantallas intermedias se adapta al espacio disponible. Los controles del encabezado tienen una fila propia en móvil.

Los fondos incorporan una textura de papel vectorial, con tonos más saturados y luminosos. Las divisiones principales miden 9 px, tres veces los 3 px anteriores. `paint.js` dibuja bordes irregulares sobre la retícula y los vuelve a ajustar al cambiar el tamaño de pantalla o los filtros; las fotografías y afiches se mantienen intactos.

Los símbolos conservan sus formas originales y se dibujan con grosor variable, bordes irregulares y pequeñas marcas de pincel seco que dejan ver el fondo. Este acabado se aplica en portada, secciones, fichas y controles, incluidos el sol y la luna del cambio de modo.

Las secciones internas comparten módulos de proporciones desiguales, símbolos por formato y una cabecera con el mapa del sur. Multimedia permite filtrar videos, audios y fotografías. Las páginas de lectura conservan el texto completo en una superficie continua.

El modo nocturno utiliza el logo negativo de RAMALC aportado por el usuario, sin modificar el archivo original; el modo claro conserva el logo publicado en el sitio.

El modo nocturno se activa por defecto. El botón de sol/luna alterna los modos claro y nocturno y guarda la preferencia en el navegador.

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
