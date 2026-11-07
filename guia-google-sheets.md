# Cómo gestionar el catálogo desde Google Sheets

La tienda puede leer los productos, precios y stock de una hoja de Google. Así los dueños cambian
un precio o marcan algo como agotado desde el móvil, sin tocar código.

## Puesta en marcha (una sola vez)
1. Entra en Google Drive → **Nuevo → Hoja de cálculo de Google**.
2. **Archivo → Importar → Subir** y elige `plantilla-catalogo.csv`. Marca «Reemplazar hoja de cálculo».
3. **Archivo → Compartir → Publicar en la web**. Elige la hoja, formato **Valores separados por comas (.csv)** y pulsa **Publicar**.
4. Copia el enlace que te da y pégalo en `productos.js`, en `hojaCSV: "…"`.
5. Sube de nuevo `productos.js` a la web. Listo.

> Publicar en la web solo hace públicos los datos del catálogo (precios, productos). No pongas nada privado en esa hoja.

## Columnas
| Columna | Qué poner |
|---|---|
| id | Nombre corto sin espacios ni tildes (caqui, cesta-regalo). No lo repitas. |
| tipo | `fruta` o `pack` (cestas de regalo y packs cerrados). |
| nombre | Lo que ve el cliente. |
| precio | Con coma o punto: 2,95. |
| unidad | `kg`, `unidad`, `bandeja`, `manojo` y, para packs, `cesta` o `pack`. |
| stock | Lo que te queda, en esa unidad. Vacío = sin control. `0` = agotado. Por debajo de 5 sale «Quedan solo…». |
| activo | `si` o `no` (`no` = aparece como Agotado). |
| aviso | Vacío, `ultimo dia` o `pocas`. |
| meses | `todo`, o los números de mes: `10,11,12`, o un rango: `10-12` / `11-2`. |
| origen, descripcion | Textos que ve el cliente. |
| contenido | Solo packs: qué lleva, separado por « · ». |
| imagen | Enlace o ruta de la foto (opcional). |
| emoji, color | Icono y color de fondo si no hay foto. |
| paso | Opcional: de cuánto en cuánto se pide (0,5 en kg, 1 en el resto). |

## Cosas a saber
- Google tarda unos minutos en reflejar los cambios publicados.
- Si la hoja falla o no hay internet, la tienda usa la última copia que guardó, y si no hay, el catálogo de `productos.js`.
- Solo se muestran los productos cuyo mes está en la columna `meses`.

## Si abres la tienda desde tu disco duro (sin web)
Los navegadores bloquean a veces la lectura de la hoja cuando abres `tienda.html` haciendo doble clic. Solución:
1. Comparte la hoja: Compartir → Acceso general → «Cualquier persona con el enlace» → Lector.
2. Copia el código de la hoja: en la dirección normal `https://docs.google.com/spreadsheets/d/ESTE-CÓDIGO/edit`, es lo que va entre `/d/` y `/edit`.
3. Pégalo en `productos.js`, en `hojaId: ""`.
4. Abre `tienda.html?debug=1` para comprobar de dónde lee los datos.
