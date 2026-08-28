/* ============================================================
   MOTOR — estado, progreso, XP, medallas, repaso espaciado, audio
   ============================================================ */

const Motor = (() => {

const CLAVE = "arena_joaquin_v1";

/* ---------- Rangos ---------- */
const RANGOS = [
  {xp:0,     nombre:"Novato",       icono:"🌱"},
  {xp:500,   nombre:"Aprendiz",     icono:"🪶"},
  {xp:1500,  nombre:"Iniciado",     icono:"🗡️"},
  {xp:3500,  nombre:"Adepto",       icono:"🛡️"},
  {xp:7000,  nombre:"Veterano",     icono:"⚔️"},
  {xp:12000, nombre:"Experto",      icono:"🏹"},
  {xp:20000, nombre:"Maestro",      icono:"👑"},
  {xp:32000, nombre:"Gran Maestro", icono:"🔱"},
  {xp:50000, nombre:"Leyenda",      icono:"🐉"}
];

/* ---------- Config por dificultad ---------- */
const NIVELES = {
  1:{nombre:"Fácil",      preguntas:10, vidas:5, tiempo:0,  xpBase:10, opciones:3, icono:"🟢"},
  2:{nombre:"Intermedio", preguntas:12, vidas:3, tiempo:16, xpBase:18, opciones:4, icono:"🟡"},
  3:{nombre:"Difícil",    preguntas:14, vidas:2, tiempo:9,  xpBase:30, opciones:5, icono:"🔴"}
};

/* ---------- Nivel personalizado ----------
   El tope de preguntas no es fijo: lo decide el juego (Juegos.topePreguntas),
   porque en países y elementos el límite real es cuántos hay. TOPE_PREGUNTAS
   es solo el valor por defecto para todo lo demás. */
const TOPE_PREGUNTAS = 40;
const LIMITES = {
  preguntas:{min:3,  max:TOPE_PREGUNTAS},
  vidas:    {min:1,  max:10},
  tiempo:   {min:0,  max:90}      // 0 = sin cronómetro
};
const PERSO_DEF = {base:2, preguntas:15, vidas:5, tiempo:0};

function acotar(v, min, max, porDefecto){
  v = Math.round(Number(v));
  if(!isFinite(v)) return porDefecto;
  return Math.min(max, Math.max(min, v));
}

/* Deja una configuración dentro de los límites. `topePreg` lo pasa quien
   sabe cuántas preguntas distintas tiene ese juego. */
function limpiarPerso(p, topePreg){
  p = p || {};
  const tope = topePreg || LIMITES.preguntas.max;
  return {
    base:      [1,2,3].indexOf(+p.base) >= 0 ? +p.base : PERSO_DEF.base,
    preguntas: acotar(p.preguntas, LIMITES.preguntas.min, tope,                    Math.min(PERSO_DEF.preguntas, tope)),
    vidas:     acotar(p.vidas,     LIMITES.vidas.min,     LIMITES.vidas.max,       PERSO_DEF.vidas),
    tiempo:    acotar(p.tiempo,    LIMITES.tiempo.min,    LIMITES.tiempo.max,      PERSO_DEF.tiempo)
  };
}

/* La última configuración usada, para no volver a moverlo todo cada vez */
function ajustePerso(){ return limpiarPerso(E.perso || PERSO_DEF); }

function guardarPerso(p){ E.perso = limpiarPerso(p); guardar(); return E.perso; }

/* Convierte la configuración en un cfg igual al de los niveles fijos:
   el contenido y los puntos salen del nivel base, el resto lo pone él. */
function cfgPerso(p){
  const b = NIVELES[p.base] || NIVELES[2];
  return {
    nombre:"A tu medida", icono:"⚙️", personalizado:true, base:p.base,
    preguntas:p.preguntas, vidas:p.vidas, tiempo:p.tiempo,
    xpBase:b.xpBase, opciones:b.opciones
  };
}

/* ---------- Estado persistente ---------- */
let E = {
  xp:0,
  totalPartidas:0,
  totalAciertos:0,
  totalPreguntas:0,
  mejorCombo:0,
  racha:0,
  ultimoDia:null,
  sonido:true,
  medallas:{},   // "juego|nivel" -> "bronce"|"plata"|"oro"
  records:{},    // "juego|nivel" -> puntos
  items:{},      // idItem -> {a:aciertos, f:fallos, et:etiqueta, ju:juego}
  leidos:{},     // idApunte -> true (modo estudio)
  conquista:{},  // idCasilla -> true (tabla periódica / atlas)
  perso:null     // última configuración del nivel personalizado
};

let almacenOK = true;

function cargar(){
  try{
    const raw = localStorage.getItem(CLAVE);
    if(raw) E = Object.assign(E, JSON.parse(raw));
  }catch(e){ almacenOK = false; }
  revisarRacha();
}

function guardar(){
  if(!almacenOK) return;
  try{ localStorage.setItem(CLAVE, JSON.stringify(E)); }
  catch(e){ almacenOK = false; }
}

function hoyStr(){
  const d = new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}

function diasEntre(a,b){
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

/* Si pasó más de un día sin jugar, la racha se rompe */
function revisarRacha(){
  if(!E.ultimoDia) return;
  const d = diasEntre(E.ultimoDia, hoyStr());
  if(d > 1) E.racha = 0;
}

/* Se llama al terminar una batalla */
function marcarDia(){
  const h = hoyStr();
  if(E.ultimoDia === h) return false;          // ya contó hoy
  const d = E.ultimoDia ? diasEntre(E.ultimoDia, h) : 99;
  E.racha = (d === 1) ? E.racha + 1 : 1;
  E.ultimoDia = h;
  return true;                                  // racha nueva hoy
}

/* ---------- Rango ---------- */
function rango(){
  let r = RANGOS[0], sig = null;
  for(let i=0;i<RANGOS.length;i++){
    if(E.xp >= RANGOS[i].xp){ r = RANGOS[i]; sig = RANGOS[i+1] || null; }
  }
  return {actual:r, siguiente:sig};
}

function sumarXP(n){
  const antes = rango().actual.nombre;
  E.xp += n;
  const ahora = rango().actual;
  guardar();
  return (ahora.nombre !== antes) ? ahora : null;   // devuelve el rango nuevo si subió
}

/* ---------- Medallas ---------- */
const ORDEN_MED = {bronce:1, plata:2, oro:3};
const ICONO_MED = {bronce:"🥉", plata:"🥈", oro:"🥇"};

function registrarMedalla(juego, nivel, medalla){
  if(!medalla) return false;
  const k = juego+"|"+nivel;
  const previa = E.medallas[k];
  if(!previa || ORDEN_MED[medalla] > ORDEN_MED[previa]){
    E.medallas[k] = medalla;
    guardar();
    return true;      // medalla mejorada
  }
  return false;
}

function medallaDe(juego, nivel){ return E.medallas[juego+"|"+nivel] || null; }

function contarMedallas(){ return Object.keys(E.medallas).length; }

function registrarRecord(juego, nivel, puntos){
  const k = juego+"|"+nivel;
  if(!E.records[k] || puntos > E.records[k]){
    E.records[k] = puntos;
    guardar();
    return true;
  }
  return false;
}

function recordDe(juego, nivel){ return E.records[juego+"|"+nivel] || 0; }

/* ---------- Repaso espaciado (ligero) ---------- */
function registrarItem(id, acierto, etiqueta, juego){
  if(!id) return;
  if(!E.items[id]) E.items[id] = {a:0, f:0, et:etiqueta||id, ju:juego||""};
  if(acierto) E.items[id].a++; else E.items[id].f++;
  E.items[id].et = etiqueta || E.items[id].et;
  E.items[id].ju = juego || E.items[id].ju;
}

/* Un ítem está "flojo" si tiene más fallos que aciertos y al menos 1 fallo */
function itemsFlojos(juego){
  return Object.entries(E.items)
    .filter(([id,d]) => d.f > 0 && d.f >= d.a && (!juego || d.ju === juego))
    .map(([id,d]) => ({id, ...d, deuda:d.f - d.a}))
    .sort((x,y) => y.deuda - x.deuda || y.f - x.f);
}

/* Peso para elegir preguntas: los ítems fallados salen más */
function pesoItem(id){
  const d = E.items[id];
  if(!d) return 1.6;                    // nunca visto: prioridad media-alta
  if(d.f === 0 && d.a >= 3) return 0.35; // ya dominado
  return 1 + d.f * 1.4 - d.a * 0.2;
}

/* ---------- Modo estudio ---------- */
/* Un apunte se marca leído la primera vez que llegas al final. Da XP una sola vez. */
const XP_APUNTE = 40;

function estaLeido(id){ return !!(E.leidos && E.leidos[id]); }

function marcarLeido(id){
  if(!E.leidos) E.leidos = {};
  if(E.leidos[id]) return false;      // ya estaba leído: sin XP
  E.leidos[id] = true;
  guardar();
  return true;                        // primera vez
}

function contarLeidos(){ return Object.keys(E.leidos || {}).length; }

/* Un cuaderno del MicroMasters es un curso entero, no un apartado: paga
   más que un apunte. Comparte la tabla `leidos`, así que la copia del
   progreso entre dispositivos ya lo lleva. */
const XP_CUADERNO = 120;

/* ---------- Conquista (tablero de química y atlas) ---------- */
/* Una casilla se conquista cuando aciertas TODO lo que se pregunta de ella. */
const XP_CASILLA = 25;

function conquistado(id){ return !!(E.conquista && E.conquista[id]); }

function conquistar(id){
  if(!E.conquista) E.conquista = {};
  if(E.conquista[id]) return false;    // ya estaba: sin XP
  E.conquista[id] = true;
  guardar();
  return true;                          // primera vez
}

function contarConquistados(prefijo){
  return Object.keys(E.conquista || {}).filter(k => !prefijo || k.indexOf(prefijo) === 0).length;
}

function rendirCasilla(id){             // para poder reintentar una casilla ya conquistada
  if(E.conquista) delete E.conquista[id];
  guardar();
}

/* ---------- Estadísticas ---------- */
function registrarPartida(aciertos, total, mejorCombo){
  E.totalPartidas++;
  E.totalAciertos += aciertos;
  E.totalPreguntas += total;
  if(mejorCombo > E.mejorCombo) E.mejorCombo = mejorCombo;
}

/* ---------- Audio (WebAudio, sin archivos) ---------- */
let ctxAudio = null;
function ctx(){
  if(!ctxAudio){
    try{ ctxAudio = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e){ return null; }
  }
  if(ctxAudio.state === "suspended") ctxAudio.resume();
  return ctxAudio;
}

function tono(freq, inicio, dur, vol, tipo){
  const c = ctx(); if(!c) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = tipo || "sine";
  o.frequency.setValueAtTime(freq, c.currentTime + inicio);
  g.gain.setValueAtTime(0.0001, c.currentTime + inicio);
  g.gain.exponentialRampToValueAtTime(vol, c.currentTime + inicio + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + inicio + dur);
  o.connect(g); g.connect(c.destination);
  o.start(c.currentTime + inicio);
  o.stop(c.currentTime + inicio + dur + 0.02);
}

const Sonido = {
  bien(combo){
    if(!E.sonido) return;
    const base = 560 + Math.min(combo||0, 10) * 34;
    tono(base, 0, 0.11, 0.16, "triangle");
    tono(base*1.5, 0.07, 0.14, 0.13, "triangle");
  },
  mal(){
    if(!E.sonido) return;
    tono(180, 0, 0.16, 0.16, "sawtooth");
    tono(120, 0.09, 0.2, 0.13, "sawtooth");
  },
  clic(){
    if(!E.sonido) return;
    tono(440, 0, 0.04, 0.07, "square");
  },
  victoria(){
    if(!E.sonido) return;
    [523,659,784,1047].forEach((f,i)=> tono(f, i*0.1, 0.28, 0.15, "triangle"));
  },
  derrota(){
    if(!E.sonido) return;
    [392,330,262].forEach((f,i)=> tono(f, i*0.14, 0.32, 0.15, "sine"));
  },
  subirRango(){
    if(!E.sonido) return;
    [523,659,784,1047,1319].forEach((f,i)=> tono(f, i*0.09, 0.4, 0.16, "triangle"));
  },
  tic(){
    if(!E.sonido) return;
    tono(900, 0, 0.03, 0.05, "square");
  }
};

function alternarSonido(){ E.sonido = !E.sonido; guardar(); return E.sonido; }

/* ---------- Utilidades ---------- */
function mezclar(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function elegir(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* Elige n elementos distintos usando pesos por id (repaso espaciado) */
function elegirPesado(arr, n, fnId){
  const pool = arr.map(x => ({x, p: fnId ? pesoItem(fnId(x)) : 1}));
  const out = [];
  const usados = new Set();
  let intentos = 0;
  while(out.length < n && intentos < n*60 && usados.size < arr.length){
    const total = pool.reduce((s,e)=> usados.has(e.x) ? s : s + Math.max(e.p, .05), 0);
    let r = Math.random()*total;
    for(const e of pool){
      if(usados.has(e.x)) continue;
      r -= Math.max(e.p, .05);
      if(r <= 0){ usados.add(e.x); out.push(e.x); break; }
    }
    intentos++;
  }
  // si el pool era más chico que n, repetimos mezclando
  while(out.length < n && arr.length){
    out.push(elegir(arr));
  }
  return out;
}

/* Devuelve `k` distractores distintos de `correcto` */
function distractores(pool, correcto, k, iguales){
  const cand = pool.filter(x => !iguales ? x !== correcto : !iguales(x, correcto));
  return mezclar(cand).slice(0, k);
}

function normalizar(s){
  return (s||"").toString().toLowerCase().trim()
    .replace(/\s+/g," ")
    .replace(/ß/g,"ss").replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue")
    .replace(/[áàâ]/g,"a").replace(/[éèê]/g,"e").replace(/[íìî]/g,"i")
    .replace(/[óòô]/g,"o").replace(/[úùû]/g,"u")
    .replace(/[.,;:!?¡¿'"()]/g,"");
}

/* ---------------------------------------------------------------
   COPIA DE PROGRESO
   El progreso vive en el localStorage de cada navegador, así que no viaja
   solo entre el PC y el móvil. Estas dos funciones lo empaquetan en un
   archivo y lo vuelven a meter.

   La fusión usa siempre máximos y uniones, nunca sumas: importar dos veces
   el mismo archivo deja exactamente el mismo resultado que importarlo una,
   y no se puede inflar el XP a base de restaurar copias.
   --------------------------------------------------------------- */
const FORMATO = 1;

function exportar(){
  return JSON.stringify({arena:FORMATO, fecha:hoyStr(), estado:E}, null, 1);
}

const mayor = (a, b) => (b === undefined ? a : a === undefined ? b : Math.max(a, b));

function importar(texto){
  let d;
  try{ d = JSON.parse(texto); }
  catch(e){ return {ok:false, msg:"Ese archivo no es una copia de La Arena."}; }
  if(!d || !d.arena || !d.estado) return {ok:false, msg:"Ese archivo no es una copia de La Arena."};
  if(d.arena > FORMATO) return {ok:false, msg:"Esa copia es de una versión más nueva de la app."};

  const o = d.estado, antes = contarConquistados("") + contarLeidos();

  ["xp","totalPartidas","totalAciertos","totalPreguntas","mejorCombo","racha"]
    .forEach(k => E[k] = mayor(E[k], o[k]) || 0);
  if(o.ultimoDia && (!E.ultimoDia || o.ultimoDia > E.ultimoDia)) E.ultimoDia = o.ultimoDia;

  Object.keys(o.medallas || {}).forEach(k => {
    if(!E.medallas[k] || ORDEN_MED[o.medallas[k]] > ORDEN_MED[E.medallas[k]])
      E.medallas[k] = o.medallas[k];
  });
  Object.keys(o.records || {}).forEach(k => E.records[k] = mayor(E.records[k], o.records[k]));
  Object.keys(o.leidos || {}).forEach(k => { if(o.leidos[k]) E.leidos[k] = true; });
  Object.keys(o.conquista || {}).forEach(k => { if(o.conquista[k]) E.conquista[k] = true; });
  Object.keys(o.items || {}).forEach(k => {
    const mio = E.items[k], suyo = o.items[k];
    E.items[k] = mio
      ? {a:mayor(mio.a, suyo.a), f:mayor(mio.f, suyo.f), et:mio.et || suyo.et, ju:mio.ju || suyo.ju}
      : suyo;
  });

  revisarRacha();
  guardar();
  const ganado = contarConquistados("") + contarLeidos() - antes;
  return {ok:true, msg:`Copia del ${d.fecha || "?"} restaurada.`+
    (ganado > 0 ? ` Se añadieron ${ganado} casillas y apuntes nuevos.` : " Ya lo tenías todo.")};
}

function borrarTodo(){
  E = {xp:0,totalPartidas:0,totalAciertos:0,totalPreguntas:0,mejorCombo:0,
       racha:0,ultimoDia:null,sonido:E.sonido,medallas:{},records:{},items:{},
       leidos:{},conquista:{},perso:E.perso};
  guardar();
}

cargar();

return {
  get estado(){ return E; },
  NIVELES, RANGOS, ICONO_MED, XP_APUNTE, XP_CASILLA, XP_CUADERNO,
  LIMITES, TOPE_PREGUNTAS, limpiarPerso, ajustePerso, guardarPerso, cfgPerso,
  guardar, rango, sumarXP, marcarDia,
  estaLeido, marcarLeido, contarLeidos,
  conquistado, conquistar, contarConquistados, rendirCasilla,
  registrarMedalla, medallaDe, contarMedallas,
  registrarRecord, recordDe,
  registrarItem, itemsFlojos, pesoItem, registrarPartida,
  Sonido, alternarSonido,
  mezclar, elegir, elegirPesado, distractores, normalizar,
  exportar, importar, borrarTodo,
  get almacenOK(){ return almacenOK; }
};

})();
