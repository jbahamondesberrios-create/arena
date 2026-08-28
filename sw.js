/* ============================================================
   SERVICE WORKER — hace que La Arena funcione sin internet
   Solo entra en juego cuando la app está publicada (http/https);
   abriéndola con Jugar.bat (file://) el navegador ni lo registra.

   Al tocar cualquier archivo de la app hay que subir VERSION: es lo único
   que hace que los navegadores que ya la tienen instalada se actualicen.
   ============================================================ */
const VERSION = "arena-v7";

/* El esqueleto que se guarda en la instalación. Si algún día se añade un
   archivo nuevo y se olvida esta lista, no se rompe nada: lo de abajo lo
   cachea igual la primera vez que se pide con internet. */
const ESQUELETO = [
  ".",
  "index.html",
  "manifest.webmanifest",
  "css/estilos.css",
  "css/especiales.css",
  "js/motor.js",
  "js/juegos.js",
  "js/estudio.js",
  "js/cuadernos.js",
  "js/especiales.js",
  "js/app.js",
  "datos/aleman.js",
  "datos/arabe.js",
  "datos/finanzas.js",
  "datos/matematicas.js",
  "datos/quimica.js",
  "datos/geografia.js",
  "datos/mapa-mundi.js",
  "datos/apuntes-aleman.js",
  "datos/apuntes-arabe.js",
  "datos/apuntes-finanzas.js",
  "datos/apuntes-matematicas.js",
  "datos/apuntes-quimica.js",
  "datos/apuntes-geografia.js",
  "datos/cuadernos.js",
  "datos/ejercicios-matematicas.js",
  "datos/ejercicios-finanzas.js",
  "iconos/icono-192.png",
  "iconos/icono-512.png",

  /* Los cinco cuadernos del MicroMasters. Pesan ~530 KB entre todos, pero
     son justo lo que hay que poder leer sin internet. Las tipografías que
     enlazan son de Google: al ser de otro origen el fetch de abajo no las
     toca, y sin red caen a la familia de respaldo. */
  "cuadernos/15516x-contabilidad.html",
  "cuadernos/154151x-fundamentos-i.html",
  "cuadernos/154152x-fundamentos-ii.html",
  "cuadernos/15455x-metodos-matematicos.html",
  "cuadernos/15435x-derivados.html"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSION)
      /* uno a uno: si un archivo faltara, addAll entero fallaría y la app
         se quedaría sin instalar */
      .then(c => Promise.all(ESQUELETO.map(u => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Primero la caché (abre al instante y funciona sin red); si el archivo no
   estaba, se pide a la red y se guarda para la próxima. */
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(hit => {
      if(hit) return hit;
      return fetch(req).then(res => {
        if(res && res.ok && res.type === "basic"){
          const copia = res.clone();
          caches.open(VERSION).then(c => c.put(req, copia));
        }
        return res;
      }).catch(() => caches.match("index.html"));   // sin red y sin caché: el dojo
    })
  );
});
