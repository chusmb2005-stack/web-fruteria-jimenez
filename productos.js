/* =====================================================================
   FRUTERÍA JIMÉNEZ · DATOS DE LA TIENDA ONLINE
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que hace falta tocar para:
     · cambiar el teléfono de WhatsApp, el pedido mínimo o la zona
     · añadir o quitar frutas, cambiar precios o marcar algo como agotado
     · decidir en qué meses aparece cada fruta

   Cómo editar una fruta:
     nombre:      Nombre visible.
     imagen:      URL o ruta de una foto (ej. "img/caqui.jpg"). Si se deja
                  vacía ("") o la foto no carga, se muestra un fondo de color.
     emoji:       Icono de respaldo cuando no hay foto.
     color:       Color de fondo de respaldo.
     precio:      Precio orientativo en euros por unidad de venta (usa punto: 2.95).
     unidad:      "kg", "unidad", "bandeja" o "manojo".
     paso:        (opcional) De cuánto en cuánto se pide. Por defecto 0.5 en kg y 1 en el resto.
     origen:      Procedencia.
     descripcion: Una frase corta.
     meses:       Meses en que está de temporada (1 = enero … 12 = diciembre).
     activo:      true = disponible · false = aparece como "Agotado".
     stock:       (opcional) Cantidad que te queda, en la misma unidad de venta. Si es 0 aparece
                  "Agotado"; si es baja, aparece "Quedan pocas"; y no deja pedir más de lo que hay.
     aviso:       (opcional) "ultimo-dia" para mostrar "Último día" o "pocas" para "Quedan pocas".
     tipo:        (opcional) "pack" para cestas de regalo y packs cerrados (ver más abajo).
     contenido:   (solo packs) Lista de lo que lleva, separada por " · ".

   Truco: para ver cómo queda la tienda otro mes, abre tienda.html?mes=5
   (cambia el 5 por el número del mes).
   ===================================================================== */

const TIENDA = {
  nombre: "Frutería Jiménez",

  // ⚠️ PON AQUÍ EL NÚMERO DE WHATSAPP: solo los 9 dígitos, sin espacios ni +34.
  // Ejemplo: telefono: "612345678"
  telefono: "[número]",
  prefijoPais: "34",

  direccion: "C. Jaime I el Conquistador, 42, 03440 Ibi (Alicante)",
  zonaReparto: "Ibi (casco urbano y alrededores)",

  // Pedido mínimo en euros. 0 = sin pedido mínimo.
  pedidoMinimo: 0,

  // Días que se pueden reservar por adelantado.
  diasReserva: 14,

  // Redes sociales (deja "" para ocultar el icono).
  instagram: "",
  facebook: "",

  // ---- Catálogo desde Google Sheets (opcional) ----
  // Pega aquí el enlace CSV de tu hoja (Archivo > Compartir > Publicar en la web > CSV).
  // Si lo dejas vacío, la tienda usa el catálogo de este archivo. Si falla la carga,
  // la tienda usa la última copia guardada o, en su defecto, el catálogo de este archivo.
  hojaCSV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7Mtt3vRAfi17d9xRLoGfOt43J2KCjABK2n_1QnE2tFiGfkqtTqB70v3enuWAhrIYOU3tnl76zr0dF/pub?gid=2067121045&single=true&output=csv",

  // Alternativa que funciona también abriendo tienda.html desde tu disco duro (sin servidor):
  // pega aquí el código de tu hoja (lo que va entre /d/ y /edit en la dirección de la hoja
  // normal) y comparte la hoja con "Cualquier persona con el enlace: lector".
  // Si hojaCSV falla, la tienda prueba con esto. hojaGid es el número que sale tras "gid="
  // en la dirección (déjalo vacío para usar la pestaña llamada "Catalogo").
  hojaId: "1loHraUhIIaldS_tm2Vck6mBC1QeXBqUe5YezPs02C3k",
  hojaGid: "2067121045",

  // Cuando el stock (columna "stock") baja de este número, sale el aviso "Quedan pocas".
  umbralPocas: 5,

  // Enlace para que los clientes te dejen una reseña en Google (ficha de Google Business).
  googleResenas: "",

  // ---- Datos legales (los usa legal.html; rellénalos antes de publicar) ----
  legal: {
    titular: "[NOMBRE Y APELLIDOS O RAZÓN SOCIAL]",
    nif: "[NIF/CIF]",
    email: "[CORREO ELECTRÓNICO]",
    actividad: "Comercio minorista de fruta y verdura"
  }
};

/* =====================================================================
   RESEÑAS DE CLIENTES
   Añade aquí SOLO opiniones reales (con permiso del cliente). Mientras la lista
   esté vacía, la sección de reseñas muestra solo el botón "Déjanos tu opinión".
   Ejemplo:
     { nombre: "María L.", texto: "La mejor fruta de Ibi.", estrellas: 5, fecha: "2026-09" }
   ===================================================================== */
const RESENAS = [
];

const CATALOGO = [
  // ---------------- OTOÑO ----------------
  { id: "caqui", nombre: "Caqui persimon", emoji: "🍊", color: "#F6C9A4",
    imagen: "",
    precio: 2.95, unidad: "kg", origen: "Ribera del Xúquer (Valencia)",
    descripcion: "Dulce y firme, se come como una manzana. Pídelo blando si lo quieres de cuchara.",
    meses: [10, 11, 12], activo: true },

  { id: "granada", nombre: "Granada mollar", emoji: "🔴", color: "#F2B5AE",
    imagen: "",
    precio: 3.20, unidad: "kg", origen: "Elche (Alicante) · DOP",
    descripcion: "La mollar de Elche: grano tierno, dulce y casi sin pepita.",
    meses: [9, 10, 11, 12], activo: true },

  { id: "mandarina", nombre: "Mandarina clementina", emoji: "🍊", color: "#FAD39B",
    imagen: "",
    precio: 2.40, unidad: "kg", origen: "La Plana (Castellón)",
    descripcion: "Primeras clementinas de la temporada, fáciles de pelar y sin pepitas.",
    meses: [10, 11, 12, 1, 2], activo: true },

  { id: "uva", nombre: "Uva de mesa embolsada", emoji: "🍇", color: "#D9CBE8",
    imagen: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=700&q=70",
    precio: 3.50, unidad: "kg", origen: "Vinalopó (Alicante) · DOP",
    descripcion: "Madurada en su bolsa en la parra, de piel fina y muy dulce.",
    meses: [8, 9, 10, 11, 12], activo: true },

  { id: "manzana", nombre: "Manzana Royal Gala", emoji: "🍎", color: "#F4B9AE",
    imagen: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=70",
    precio: 2.60, unidad: "kg", origen: "Lleida",
    descripcion: "Crujiente y jugosa. La de siempre para el almuerzo de los peques.",
    meses: [8, 9, 10, 11, 12, 1, 2, 3, 4, 5], activo: true },

  { id: "pera", nombre: "Pera conferencia", emoji: "🍐", color: "#DDE6B3",
    imagen: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&w=700&q=70",
    precio: 2.80, unidad: "kg", origen: "Lleida",
    descripcion: "Mantecosa y aromática. Te la elegimos más firme o más madura, como prefieras.",
    meses: [8, 9, 10, 11, 12, 1, 2, 3], activo: true },

  { id: "membrillo", nombre: "Membrillo", emoji: "🍐", color: "#F3E3A1",
    imagen: "",
    precio: 2.20, unidad: "kg", origen: "Puente Genil (Córdoba)",
    descripcion: "Para hacer dulce de membrillo en casa. Muy aromático.",
    meses: [9, 10, 11], activo: false },

  { id: "kiwi", nombre: "Kiwi", emoji: "🥝", color: "#D6E3B5",
    imagen: "",
    precio: 3.95, unidad: "kg", origen: "Asturias",
    descripcion: "Kiwi verde nacional, en su punto de acidez y dulzor.",
    meses: [10, 11, 12, 1, 2, 3, 4, 5], activo: true },

  { id: "chirimoya", nombre: "Chirimoya", emoji: "🍈", color: "#D5E4C4",
    imagen: "",
    precio: 4.50, unidad: "kg", origen: "Costa Tropical (Granada) · DOP",
    descripcion: "Cremosa y muy dulce. Se come con cuchara cuando cede al apretar.",
    meses: [10, 11, 12, 1, 2], activo: true },

  { id: "higo", nombre: "Higo", emoji: "🟣", color: "#D8C3D9",
    imagen: "",
    precio: 3.50, unidad: "bandeja", origen: "Comarca de l'Alcoià (Alicante)",
    descripcion: "Bandeja de 500 g de higos de la zona. Delicados: mejor comerlos en 2 días.",
    meses: [8, 9, 10], activo: true, aviso: "ultimo-dia" },

  { id: "castana", nombre: "Castaña", emoji: "🌰", color: "#E3CDB4",
    imagen: "",
    precio: 6.90, unidad: "kg", origen: "Ourense (Galicia)",
    descripcion: "Gorda y sana, perfecta para asar en casa.",
    meses: [10, 11, 12], activo: true, stock: 4 },

  // ---------------- TODO EL AÑO ----------------
  { id: "platano", nombre: "Plátano de Canarias", emoji: "🍌", color: "#F7E3A0",
    imagen: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=70",
    precio: 2.50, unidad: "kg", origen: "Canarias · IGP",
    descripcion: "Con sus motitas. Dinos si lo quieres verdoso o listo para comer.",
    meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], activo: true },

  { id: "limon", nombre: "Limón", emoji: "🍋", color: "#F8EAA0",
    imagen: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=700&q=70",
    precio: 1.95, unidad: "kg", origen: "Vega Baja (Alicante)",
    descripcion: "Limón fino de la Vega Baja, con mucho zumo.",
    meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], activo: true },

  { id: "aguacate", nombre: "Aguacate Hass", emoji: "🥑", color: "#CFDDB6",
    imagen: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=700&q=70",
    precio: 1.20, unidad: "unidad", origen: "Axarquía (Málaga)",
    descripcion: "Te lo elegimos para comer hoy o para dentro de unos días.",
    meses: [10, 11, 12, 1, 2, 3, 4, 5], activo: true },

  // ---------------- INVIERNO ----------------
  { id: "naranja", nombre: "Naranja de mesa", emoji: "🍊", color: "#FAC898",
    imagen: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=700&q=70",
    precio: 1.80, unidad: "kg", origen: "La Ribera (Valencia)",
    descripcion: "Navelina recién cogida: dulce, sin pepitas y fácil de pelar.",
    meses: [11, 12, 1, 2, 3, 4, 5], activo: true },

  { id: "naranja-zumo", nombre: "Naranja para zumo", emoji: "🍊", color: "#FBD2A6",
    imagen: "",
    precio: 1.30, unidad: "kg", origen: "La Ribera (Valencia)",
    descripcion: "Pequeña y con mucho zumo. La de los desayunos.",
    meses: [12, 1, 2, 3, 4, 5, 6], activo: true },

  { id: "pomelo", nombre: "Pomelo", emoji: "🍊", color: "#F7C4B6",
    imagen: "",
    precio: 2.30, unidad: "kg", origen: "Murcia",
    descripcion: "Pomelo rosado, refrescante y poco amargo.",
    meses: [11, 12, 1, 2, 3, 4], activo: true },

  // ---------------- PRIMAVERA ----------------
  { id: "fresa", nombre: "Fresa", emoji: "🍓", color: "#F6B8B8",
    imagen: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=70",
    precio: 2.95, unidad: "bandeja", origen: "Huelva",
    descripcion: "Bandeja de 500 g. Roja hasta el centro y muy perfumada.",
    meses: [2, 3, 4, 5, 6], activo: true },

  { id: "nispero", nombre: "Níspero", emoji: "🟠", color: "#F9D59B",
    imagen: "",
    precio: 3.90, unidad: "kg", origen: "Callosa d'en Sarrià (Alicante) · DOP",
    descripcion: "El níspero de la Marina Alta: jugoso, dulce y con un punto ácido.",
    meses: [4, 5, 6], activo: true },

  { id: "esparrago", nombre: "Espárrago verde", emoji: "🌿", color: "#D3E2BE",
    imagen: "",
    precio: 2.50, unidad: "manojo", origen: "Huerta de la zona",
    descripcion: "Manojo de espárrago triguero de temporada (sí, también hay verdura).",
    meses: [3, 4, 5], activo: true },

  { id: "arandano", nombre: "Arándanos", emoji: "🫐", color: "#C9CDE6",
    imagen: "",
    precio: 2.50, unidad: "bandeja", origen: "Huelva",
    descripcion: "Bandeja de 125 g. Para el yogur, el bizcocho o comer a puñados.",
    meses: [4, 5, 6, 7], activo: true },

  { id: "cereza", nombre: "Cereza", emoji: "🍒", color: "#EDB0B4",
    imagen: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=700&q=70",
    precio: 6.90, unidad: "kg", origen: "Montaña de Alicante",
    descripcion: "Cereza de la Vall de Gallinera: crujiente, oscura y dulcísima.",
    meses: [5, 6, 7], activo: true },

  { id: "albaricoque", nombre: "Albaricoque", emoji: "🍑", color: "#FAD0A0",
    imagen: "",
    precio: 3.50, unidad: "kg", origen: "Vega del Segura (Murcia)",
    descripcion: "Búlida de toda la vida, para comer o para mermelada.",
    meses: [5, 6, 7], activo: true },

  // ---------------- VERANO ----------------
  { id: "breva", nombre: "Breva", emoji: "🟣", color: "#D9C6DC",
    imagen: "",
    precio: 3.90, unidad: "bandeja", origen: "Comarca de l'Alcoià (Alicante)",
    descripcion: "Bandeja de 500 g. Solo unas semanas al año: no te quedes sin ellas.",
    meses: [6, 7], activo: true },

  { id: "melocoton", nombre: "Melocotón", emoji: "🍑", color: "#F9C7A8",
    imagen: "",
    precio: 2.90, unidad: "kg", origen: "Cieza (Murcia)",
    descripcion: "Amarillo, carnoso y con ese olor a verano.",
    meses: [6, 7, 8, 9], activo: true },

  { id: "paraguayo", nombre: "Paraguayo", emoji: "🍑", color: "#F7D3B8",
    imagen: "",
    precio: 3.20, unidad: "kg", origen: "Cieza (Murcia)",
    descripcion: "Chato, muy dulce y fácil de comer sin pelar.",
    meses: [6, 7, 8], activo: true },

  { id: "nectarina", nombre: "Nectarina", emoji: "🍑", color: "#F4B7A4",
    imagen: "",
    precio: 2.90, unidad: "kg", origen: "Lleida",
    descripcion: "Piel fina sin pelusa y carne jugosa.",
    meses: [6, 7, 8, 9], activo: true },

  { id: "ciruela", nombre: "Ciruela", emoji: "🟣", color: "#D7BFD6",
    imagen: "",
    precio: 2.80, unidad: "kg", origen: "Vegas del Guadiana (Extremadura)",
    descripcion: "Roja y amarilla, dulce con un toque ácido.",
    meses: [6, 7, 8, 9], activo: true },

  { id: "sandia", nombre: "Sandía sin pepitas", emoji: "🍉", color: "#F5BDBD",
    imagen: "",
    precio: 1.20, unidad: "kg", origen: "Campo de Cartagena (Murcia)",
    descripcion: "La pesamos entera o te la partimos por la mitad, tú decides.",
    meses: [6, 7, 8, 9], activo: true },

  { id: "melon", nombre: "Melón piel de sapo", emoji: "🍈", color: "#D9E6B8",
    imagen: "",
    precio: 4.50, unidad: "unidad", origen: "La Mancha",
    descripcion: "Pieza de unos 2,5–3 kg, elegida a mano para que salga dulce.",
    meses: [6, 7, 8, 9], activo: true },

  { id: "mango", nombre: "Mango", emoji: "🥭", color: "#F9D894",
    imagen: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=70",
    precio: 1.90, unidad: "unidad", origen: "Axarquía (Málaga)",
    descripcion: "Mango nacional, madurado en el árbol. Sin fibras.",
    meses: [8, 9, 10], activo: true }
];

/* =====================================================================
   CESTAS DE REGALO Y PACKS CERRADOS
   Precio fijo por cesta/pack. Para el pedido se tratan igual que cualquier producto
   (se ven en la tienda con la etiqueta "Pack"). Pon meses: [1,2,...,12] para todo el año.
   El contenido de los packs de fruta puede variar según la temporada: indícalo en
   la descripción. ===================================================================== */
const PACKS = [
  { id: "cesta-regalo-clasica", tipo: "pack", nombre: "Cesta regalo clásica", emoji: "🎁", color: "#F8DDB8",
    imagen: "",
    precio: 24.90, unidad: "cesta", origen: "Preparada en tienda",
    descripcion: "Cesta de mimbre con fruta de temporada seleccionada a mano y lazo. Ideal para regalar.",
    contenido: "Unos 3 kg de fruta de temporada · Cesta de mimbre · Tarjeta con dedicatoria",
    meses: [1,2,3,4,5,6,7,8,9,10,11,12], activo: true },

  { id: "cesta-regalo-premium", tipo: "pack", nombre: "Cesta regalo premium", emoji: "🧺", color: "#F6D6A8",
    imagen: "",
    precio: 39.90, unidad: "cesta", origen: "Preparada en tienda",
    descripcion: "Fruta de temporada de primera con frutos secos y un producto gourmet.",
    contenido: "Unos 3 kg de fruta de temporada · Frutos secos · Producto gourmet · Cesta de mimbre",
    meses: [1,2,3,4,5,6,7,8,9,10,11,12], activo: true },

  { id: "pack-desayuno", tipo: "pack", nombre: "Pack desayuno", emoji: "🥣", color: "#FBE7B0",
    imagen: "",
    precio: 9.90, unidad: "pack", origen: "Fruta de temporada de aquí",
    descripcion: "Todo lo necesario para empezar la semana: fruta variada y naranjas para el zumo.",
    contenido: "1 kg de naranjas de zumo · 1 kg de fruta de temporada · 500 g de fruta de bandeja",
    meses: [10,11,12,1,2,3,4,5], activo: true },

  { id: "pack-semanal", tipo: "pack", nombre: "Pack fruta de la semana", emoji: "🍎", color: "#F5C6BD",
    imagen: "",
    precio: 14.90, unidad: "pack", origen: "Fruta de temporada de aquí",
    descripcion: "Unos 5 kg de fruta variada para toda la semana, elegida por nosotros según lo que esté mejor.",
    contenido: "Unos 5 kg: 4 o 5 variedades de temporada",
    meses: [1,2,3,4,5,6,7,8,9,10,11,12], activo: true },

  { id: "pack-zumo", tipo: "pack", nombre: "Pack zumo y vitaminas", emoji: "🍊", color: "#FBD3A0",
    imagen: "",
    precio: 7.50, unidad: "pack", origen: "Valencia y Alicante",
    descripcion: "Naranjas y mandarinas para exprimir, más limones para el toque ácido.",
    contenido: "3 kg de naranjas de zumo · 1 kg de mandarinas · 500 g de limones",
    meses: [11,12,1,2,3,4,5], activo: true }
];
