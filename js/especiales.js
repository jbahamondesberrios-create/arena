/* ============================================================
   ESPECIALES — dos tableros grandes:
     · Tabla periódica  (adivinar nombre, número atómico y peso)
     · Atlas del mundo  (país, capital y bandera sobre el mapa)
   Los dos comparten mecánica: cada casilla se "conquista" cuando
   aciertas todo lo que se pregunta de ella.
   ============================================================ */

const Especiales = (() => {

const M = Motor;
const $ = s => document.querySelector(s);

let api = {ir(){}, brindis(){}, pintarCabecera(){}, volverAlHub(){}};
function init(a){ api = Object.assign(api, a); }

/* =====================================================================
   DIBUJO DE BANDERAS
   ===================================================================== */
let ujN = 0;

function ptsEstrella(cx, cy, r, rot){
  const p = [];
  for(let i=0;i<10;i++){
    const rad = (i % 2) ? r*0.382 : r;
    const a = (-90 + (rot||0) + i*36) * Math.PI/180;
    p.push((cx + rad*Math.cos(a)).toFixed(2) + "," + (cy + rad*Math.sin(a)).toFixed(2));
  }
  return p.join(" ");
}

function estrellaSVG(cx, cy, r, f, rot, st){
  return `<polygon points="${ptsEstrella(cx,cy,r,rot)}" fill="${f||"none"}"${st?` stroke="${st}" stroke-width="1.6"`:""}/>`;
}

function medialunaSVG(cx, cy, r, f, rot){
  const ri = r*0.82, dx = r*0.30;
  const g = rot ? ` transform="rotate(${rot} ${cx} ${cy})"` : "";
  return `<path${g} fill-rule="evenodd" fill="${f}" d="`+
    `M ${cx-r},${cy} a ${r},${r} 0 1,0 ${2*r},0 a ${r},${r} 0 1,0 ${-2*r},0 `+
    `M ${cx+dx-ri},${cy} a ${ri},${ri} 0 1,0 ${2*ri},0 a ${ri},${ri} 0 1,0 ${-2*ri},0"/>`;
}

function unionJack(x, y, w, h){
  const id = "uj" + (++ujN);
  const dw = h*0.30, dr = h*0.13, cw = h*0.30, cr = h*0.17;
  return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`+
    `<g clip-path="url(#${id})">`+
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#012169"/>`+
    `<line x1="${x}" y1="${y}" x2="${x+w}" y2="${y+h}" stroke="#fff" stroke-width="${dw}"/>`+
    `<line x1="${x+w}" y1="${y}" x2="${x}" y2="${y+h}" stroke="#fff" stroke-width="${dw}"/>`+
    `<line x1="${x}" y1="${y}" x2="${x+w}" y2="${y+h}" stroke="#C8102E" stroke-width="${dr}"/>`+
    `<line x1="${x+w}" y1="${y}" x2="${x}" y2="${y+h}" stroke="#C8102E" stroke-width="${dr}"/>`+
    `<rect x="${x+w/2-cw/2}" y="${y}" width="${cw}" height="${h}" fill="#fff"/>`+
    `<rect x="${x}" y="${y+h/2-cw/2}" width="${w}" height="${cw}" fill="#fff"/>`+
    `<rect x="${x+w/2-cr/2}" y="${y}" width="${cr}" height="${h}" fill="#C8102E"/>`+
    `<rect x="${x}" y="${y+h/2-cr/2}" width="${w}" height="${cr}" fill="#C8102E"/>`+
    `</g>`;
}

function capa(s){
  switch(s.k){
    case "c":  return `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="${s.f||"none"}"`+
                      (s.st ? ` stroke="${s.st}" stroke-width="${s.sw||1.4}"` : "") + `/>`;
    case "r":  return `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="${s.f||"none"}"/>`;
    case "p":  return `<polygon points="${s.pts}" fill="${s.f}"/>`;
    case "s":  return estrellaSVG(s.cx, s.cy, s.r, s.f, s.rot, s.st);
    case "m":  return medialunaSVG(s.cx, s.cy, s.r, s.f, s.rot);
    case "sc": return `<path fill="${s.f}" d="M ${s.cx-s.r},${s.cy} A ${s.r},${s.r} 0 0,1 ${s.cx+s.r},${s.cy} Z"/>`;
    case "t":  return `<text x="${s.cx!==undefined?s.cx:30}" y="${s.cy!==undefined?s.cy:20}" `+
                      `font-size="${s.size||12}" fill="${s.f}" text-anchor="middle" `+
                      `dominant-baseline="central" font-family="Segoe UI Symbol, Segoe UI Emoji, serif">${s.t}</text>`;
    case "n": {  /* cruz nórdica */
      let out = `<rect x="17" y="0" width="8" height="40" fill="${s.f}"/>`+
                `<rect x="0" y="16" width="60" height="8" fill="${s.f}"/>`;
      if(s.f2) out += `<rect x="19.5" y="0" width="3" height="40" fill="${s.f2}"/>`+
                      `<rect x="0" y="18.5" width="60" height="3" fill="${s.f2}"/>`;
      return out;
    }
    case "x":  return `<rect x="26" y="9" width="8" height="22" fill="${s.f}"/>`+
                      `<rect x="19" y="16" width="22" height="8" fill="${s.f}"/>`;
    case "a": {  /* arco de estrellas */
      let out = "";
      const n = s.n, ini = s.ini||0, fin = (s.fin===undefined?360:s.fin);
      const paso = (fin - ini) / (fin - ini === 360 ? n : Math.max(1, n-1));
      for(let i=0;i<n;i++){
        const a = (ini + paso*i - 90) * Math.PI/180;
        out += estrellaSVG(s.cx + s.rad*Math.cos(a), s.cy + s.rad*Math.sin(a), s.sr, s.f);
      }
      return out;
    }
    case "ln": {
      let out = "";
      for(let i=0;i<s.n;i++) out += estrellaSVG(s.x + i*s.gap, s.y, s.sr, s.f);
      return out;
    }
    case "gr": {
      let out = "";
      for(let r=0;r<s.rows;r++) for(let c=0;c<s.cols;c++){
        out += estrellaSVG(s.x + (c+0.5)*s.w/s.cols, s.y + (r+0.5)*s.h/s.rows, s.sr, s.f);
      }
      return out;
    }
    case "uj": return unionJack(s.x, s.y, s.w, s.h);
    default:   return "";
  }
}

/* Devuelve el SVG de una bandera. `clase` para el tamaño desde CSS. */
function bandera(spec, clase){
  if(!spec) return "";
  let out = `<svg class="${clase||"bandera"}" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">`;
  const cols = spec.c || [];
  const pesos = spec.w || cols.map(() => 1);
  const total = pesos.reduce((a,b) => a+b, 0) || 1;
  let acc = 0;
  cols.forEach((col, i) => {
    const tam = (spec.t === "v" ? 60 : 40) * pesos[i] / total;
    out += (spec.t === "v")
      ? `<rect x="${acc}" y="0" width="${tam+0.02}" height="40" fill="${col}"/>`
      : `<rect x="0" y="${acc}" width="60" height="${tam+0.02}" fill="${col}"/>`;
    acc += tam;
  });
  (spec.o || []).forEach(s => out += capa(s));
  out += `<rect x=".5" y=".5" width="59" height="39" fill="none" stroke="rgba(10,30,60,.35)" stroke-width="1"/>`;
  return out + `</svg>`;
}

/* =====================================================================
   TABLA PERIÓDICA
   ===================================================================== */
const Q = () => window.QUIMICA;

let quModo = "estudio";     // "estudio" | "conquista"
let quActual = null;        // elemento en curso
let quPaso = 0;             // 0 nombre · 1 número atómico · 2 peso
let quFallos = 0;

function idQu(z){ return "qu-" + z; }

function progresoQuimica(){
  return {hechos: M.contarConquistados("qu-"), total: Q().elementos.length};
}

function pintarTabla(modo){
  if(modo) quModo = modo;
  const pr = progresoQuimica();

  $("#qu-modo-estudio").classList.toggle("activo", quModo === "estudio");
  $("#qu-modo-conquista").classList.toggle("activo", quModo === "conquista");
  $("#qu-progreso-txt").textContent = `${pr.hechos} / ${pr.total} elementos dominados`;
  $("#qu-progreso-fill").style.width = (pr.hechos / pr.total * 100) + "%";

  const rej = $("#qu-rejilla");
  rej.innerHTML = "";

  /* números de grupo */
  for(let g=1; g<=18; g++){
    const t = document.createElement("div");
    t.className = "qu-rot";
    t.style.gridColumn = g + 1;
    t.style.gridRow = 1;
    t.textContent = g;
    rej.appendChild(t);
  }
  /* números de periodo */
  for(let p=1; p<=7; p++){
    const t = document.createElement("div");
    t.className = "qu-rot";
    t.style.gridColumn = 1;
    t.style.gridRow = p + 1;
    t.textContent = p;
    rej.appendChild(t);
  }

  Q().elementos.forEach(el => {
    const b = document.createElement("button");
    const visto = M.conquistado(idQu(el.z));
    b.className = "qu-celda" + (visto ? " dominada" : "") + (quModo === "conquista" && !visto ? " oculta-datos" : "");
    b.style.gridColumn = el.x + 1;
    b.style.gridRow = el.y + 1;
    b.style.setProperty("--c", Q().CATEGORIAS[el.cat].color);
    b.dataset.z = el.z;
    b.title = (quModo === "estudio" || visto) ? `${el.n} · ${el.m}` : "Sin descubrir";
    b.innerHTML = `<i class="qu-z">${el.z}</i>
      <b class="qu-s">${el.s}</b>
      <em class="qu-n">${el.n}</em>
      <small class="qu-m">${el.m}</small>`;
    b.addEventListener("click", () => { M.Sonido.clic(); abrirElemento(el.z); });
    rej.appendChild(b);
  });

  /* separadores de las dos filas de abajo */
  const hueco = document.createElement("div");
  hueco.className = "qu-hueco";
  hueco.style.gridColumn = "1 / span 19";
  hueco.style.gridRow = 9;
  rej.appendChild(hueco);

  ["57–71 · Lantánidos", "89–103 · Actínidos"].forEach((txt, i) => {
    const t = document.createElement("div");
    t.className = "qu-rot qu-rot-larga";
    t.style.gridColumn = "1 / span 3";
    t.style.gridRow = i === 0 ? 10 : 11;
    t.textContent = txt;
    rej.appendChild(t);
  });

  pintarLeyendaQu();
  pintarPanelQu(null);
}

function pintarLeyendaQu(){
  const l = $("#qu-leyenda");
  l.innerHTML = Object.entries(Q().CATEGORIAS).map(([k,v]) =>
    `<span class="qu-lg"><i style="background:${v.color}"></i>${v.nombre}</span>`).join("");
}

function fichaElemento(el){
  const cat = Q().CATEGORIAS[el.cat];
  return `
  <div class="ficha-el" style="--c:${cat.color}">
    <div class="ficha-el-cab">
      <div class="ficha-simbolo"><i>${el.z}</i><b>${el.s}</b><small>${el.m}</small></div>
      <div>
        <h3>${el.n}</h3>
        <p class="ficha-cat">${cat.nombre}</p>
      </div>
    </div>
    <div class="ficha-datos">
      <div><small>Número atómico</small><b>${el.z}</b></div>
      <div><small>Peso atómico</small><b>${el.m}</b></div>
      <div><small>Periodo</small><b>${el.periodo}</b></div>
      <div><small>Grupo</small><b>${el.grupo || "bloque f"}</b></div>
      <div><small>Bloque</small><b>${el.bloque}</b></div>
      <div><small>Estado a 25 °C</small><b>${el.est}</b></div>
    </div>
    <div class="ficha-config"><small>Configuración electrónica</small><b>${el.e}</b></div>
    ${el.grupo && Q().FAMILIAS[el.grupo] ? `<p class="ficha-fam">👪 ${Q().FAMILIAS[el.grupo]}</p>` : ""}
    <p class="ficha-dato">💡 ${el.d}</p>
  </div>`;
}

const PASOS_QU = [
  {p:"¿Cómo se llama este elemento?", ph:"nombre del elemento", tipo:"texto"},
  {p:"¿Cuál es su número atómico (Z)?", ph:"solo el número", tipo:"entero"},
  {p:"¿Cuál es su peso atómico?", ph:"por ejemplo 12,011", tipo:"decimal"}
];

function abrirElemento(z){
  const el = Q().porZ(z);
  if(!el) return;
  quActual = el;
  if(quModo === "estudio" || M.conquistado(idQu(z))){
    pintarPanelQu(el, true);
    return;
  }
  quPaso = 0; quFallos = 0;
  pintarRetoQu();
}

function marcarSeleccion(z){
  document.querySelectorAll("#qu-rejilla .qu-celda").forEach(c =>
    c.classList.toggle("activa", +c.dataset.z === z));
}

function pintarPanelQu(el, abierto){
  const panel = $("#qu-panel");
  marcarSeleccion(el ? el.z : -1);
  if(!el){
    panel.innerHTML = quModo === "estudio"
      ? `<p class="qu-vacio">Toca cualquier casilla para ver la ficha completa del elemento: número atómico, peso, configuración electrónica, familia y un dato para acordarte de él.</p>`
      : `<p class="qu-vacio">Toca una casilla y te preguntaré tres cosas: <b>nombre</b>, <b>número atómico</b> y <b>peso atómico</b>. Si aciertas las tres, el elemento queda conquistado.</p>
         <button class="btn" id="qu-azar">🎲 Elemento al azar</button>`;
    const az = $("#qu-azar");
    if(az) az.addEventListener("click", retoAzarQu);
    return;
  }
  const conq = M.conquistado(idQu(el.z));
  panel.innerHTML = fichaElemento(el) +
    (quModo === "conquista" && conq
      ? `<div class="qu-acciones"><span class="qu-ok">✓ Conquistado</span>
           <button class="btn btn-fantasma" id="qu-repetir">Volver a intentarlo</button>
           <button class="btn" id="qu-azar">🎲 Otro elemento</button></div>`
      : `<div class="qu-acciones"><button class="btn btn-fantasma" id="qu-cerrar">Cerrar</button></div>`);

  const rep = $("#qu-repetir");
  if(rep) rep.addEventListener("click", () => {
    M.rendirCasilla(idQu(el.z));
    pintarTabla();
    abrirElemento(el.z);
  });
  const az = $("#qu-azar");
  if(az) az.addEventListener("click", retoAzarQu);
  const cerrar = $("#qu-cerrar");
  if(cerrar) cerrar.addEventListener("click", () => pintarPanelQu(null));
}

function retoAzarQu(){
  const pend = Q().elementos.filter(e => !M.conquistado(idQu(e.z)));
  const bolsa = pend.length ? pend : Q().elementos;
  const el = M.elegirPesado(bolsa, 1, e => idQu(e.z))[0];
  M.Sonido.clic();
  if(!M.conquistado(idQu(el.z))){ quActual = el; quPaso = 0; quFallos = 0; pintarRetoQu(); }
  else abrirElemento(el.z);
  const celda = document.querySelector(`#qu-rejilla .qu-celda[data-z="${el.z}"]`);
  if(celda) celda.scrollIntoView({block:"nearest", inline:"nearest"});
}

function pintarRetoQu(){
  const el = quActual, paso = PASOS_QU[quPaso];
  const cat = Q().CATEGORIAS[el.cat];
  marcarSeleccion(el.z);
  $("#qu-panel").innerHTML = `
    <div class="reto" style="--c:${cat.color}">
      <div class="reto-cab">
        <div class="reto-icono">${el.s}</div>
        <div>
          <small>Casilla del grupo ${el.grupo || "f"} · periodo ${el.periodo}</small>
          <div class="reto-pasos">${PASOS_QU.map((p,i) =>
            `<span class="${i<quPaso?"hecho":i===quPaso?"actual":""}">${i+1}</span>`).join("")}</div>
        </div>
      </div>
      <h3>${paso.p}</h3>
      <div class="escribir">
        <input type="text" id="reto-campo" autocomplete="off" spellcheck="false" placeholder="${paso.ph}">
        <button class="btn" id="reto-ok">Comprobar</button>
      </div>
      <div id="reto-fb" class="reto-fb"></div>
      <button class="btn btn-fantasma reto-salir" id="reto-salir">Dejarlo por ahora</button>
    </div>`;

  const campo = $("#reto-campo");
  const enviar = () => comprobarQu(campo.value);
  $("#reto-ok").addEventListener("click", enviar);
  campo.addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); enviar(); } });
  $("#reto-salir").addEventListener("click", () => { M.Sonido.clic(); pintarPanelQu(null); });
  setTimeout(() => campo.focus(), 50);
}

function comprobarQu(txt){
  const el = quActual;
  let ok = false, correcto = "";
  if(quPaso === 0){
    correcto = el.n;
    ok = M.normalizar(txt) === M.normalizar(el.n);
  }else if(quPaso === 1){
    correcto = String(el.z);
    ok = parseInt(String(txt).replace(/\D/g,""), 10) === el.z;
  }else{
    correcto = String(el.m);
    const v = parseFloat(String(txt).replace(/\s/g,"").replace(",", "."));
    const tol = Math.max(el.m * 0.005, 0.05);
    ok = !isNaN(v) && Math.abs(v - el.m) <= tol;
  }

  M.registrarItem(idQu(el.z) + "-" + quPaso, ok, el.n + " · " + ["nombre","número atómico","peso atómico"][quPaso], "qu-tabla");
  if(!ok) quFallos++;

  const fb = $("#reto-fb");
  fb.className = "reto-fb " + (ok ? "bien" : "mal");
  fb.innerHTML = ok
    ? `✅ Correcto.`
    : `❌ Era <b>${correcto}</b>.` + (quPaso === 2 ? ` <small>(se admite ±0,5 %)</small>` : "");
  if(ok) M.Sonido.bien(1); else M.Sonido.mal();

  const campo = $("#reto-campo");
  if(campo){ campo.disabled = true; campo.classList.add(ok ? "correcta" : "incorrecta"); }
  $("#reto-ok").disabled = true;

  setTimeout(() => {
    quPaso++;
    if(quPaso < PASOS_QU.length){ pintarRetoQu(); return; }
    cerrarRetoQu();
  }, ok ? 620 : 1500);
}

function cerrarRetoQu(){
  const el = quActual;
  if(quFallos === 0){
    const nuevo = M.conquistar(idQu(el.z));
    if(nuevo){
      const subio = M.sumarXP(M.XP_CASILLA);
      M.Sonido.victoria();
      api.pintarCabecera();
      const pr = progresoQuimica();
      api.brindis(subio
        ? `${subio.icono} ¡${el.n} conquistado y subiste a <b>${subio.nombre}</b>!`
        : `⚗️ <b>${el.n}</b> conquistado · +${M.XP_CASILLA} XP · ${pr.hechos}/${pr.total}`, 3000);
      if(pr.hechos === pr.total) setTimeout(() => api.brindis("🏆 ¡Tabla periódica completa! Los 118 elementos son tuyos.", 6000), 3200);
    }
  }else{
    api.brindis(`Casi. Repasa la ficha de <b>${el.n}</b> y vuelve a intentarlo.`, 2600);
  }
  pintarTabla();
  pintarPanelQu(el, true);
}

/* =====================================================================
   ATLAS DEL MUNDO
   ===================================================================== */
const GEO = () => window.GEOGRAFIA;

let geModo = "estudio";
let geCont = null;          // continente filtrado, null = todos
let geActual = null;
let gePaso = 0;
let geFallos = 0;

function idGe(p){ return "ge-" + p.id; }

function progresoGeo(){
  return {hechos: M.contarConquistados("ge-"), total: GEO().paises.length};
}

/* proyección equirectangular: 720 × 360 */
function px(lon, oceania){
  let l = lon;
  if(oceania && l < -150) l += 360;
  return (l + 180) * 2;
}
function py(lat){ return (90 - lat) * 2; }

const MAPA = () => window.MAPA_MUNDI;

/* El marco del mapa siempre tiene la misma proporción; el viewBox de cada
   continente se calcula desde las capitales que contiene, así el zoom sigue a
   los países y no a números escritos a mano. Como el SVG usa "meet", lo que
   sobra del marco no queda en blanco: se ve el vecindario del continente. */
const ENCUADRES = {};
function encuadre(cont){
  const clave = cont || "mundo";
  if(ENCUADRES[clave]) return ENCUADRES[clave];
  let vb;
  if(!cont){
    vb = [0, 6, 720, 288];                      // el mundo, sin la Antártida
  }else{
    const oce = cont === "Oceanía";
    const lista = GEO().deContinente(cont);
    const xs = lista.map(p => px(p.lon, oce)), ys = lista.map(p => py(p.lat));
    let x0 = Math.min(...xs), x1 = Math.max(...xs);
    let y0 = Math.min(...ys), y1 = Math.max(...ys);
    /* hasta dónde puede estirarse la vista para meter los contornos: sin este
       tope, Siberia se cuela en Europa y la isla de Pascua en Sudamérica */
    const mx = Math.max(14, (x1 - x0) * 0.3), my = Math.max(12, (y1 - y0) * 0.3);
    const lim = [x0 - mx, y0 - my, x1 + mx, y1 + my];
    lista.forEach(p => {
      const c = MAPA().cajas[p.n];
      if(!c) return;
      const d = px(p.lon, oce) - px(p.lon);          // el desplazamiento de Oceanía
      x0 = Math.min(x0, Math.max(lim[0], c[0] + d));
      y0 = Math.min(y0, Math.max(lim[1], c[1]));
      x1 = Math.max(x1, Math.min(lim[2], c[2] + d));
      y1 = Math.max(y1, Math.min(lim[3], c[3]));
    });
    vb = [x0 - 6, y0 - 5, x1 - x0 + 12, y1 - y0 + 10];
  }
  /* el marco se adapta al continente, pero sin llegar a ser una columna
     (América del Sur) ni una tira (el mundo entero) */
  vb.asp = Math.min(2.5, Math.max(1.45, vb[2] / vb[3]));
  /* ancho que se acaba viendo de verdad: manda el lado que peor encaja */
  vb.escala = Math.max(vb[2], vb[3] * vb.asp);
  ENCUADRES[clave] = vb;
  return vb;
}

/* Un solo color por continente deja Europa como una mancha uniforme. Cada país
   recibe una variante del color de su continente según su posición en la
   lista, que va en orden geográfico: los vecinos casi nunca coinciden. */
function tono(hex, i){
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min;
  let h = 0;
  if(d){
    h = max === r ? ((g-b)/d + (g < b ? 6 : 0)) : max === g ? (b-r)/d + 2 : (r-g)/d + 4;
    h *= 60;
  }
  const l = (max + min) / 2;
  const s = d ? d / (1 - Math.abs(2*l - 1)) : 0;
  const dh = [0, 16, -14, 8, -22, 26][i % 6];
  const dl = [0, -9, 7, -16, 12, -4][i % 6];
  return `hsl(${(h + dh + 360) % 360} ${Math.round(s*100)}% ${Math.min(72, Math.max(26, Math.round(l*100) + dl))}%)`;
}

/* meridianos y paralelos cada 30°. Se dibujan sobre todo el lienzo (y hasta
   360° de longitud, porque la vista de Oceanía repite el mapa a la derecha)
   para que también cubran lo que asoma fuera del viewBox. */
function rejilla(){
  let g = "";
  for(let lon = -180; lon <= 350; lon += 30) g += `<path d="M${px(lon)} -60V420"/>`;
  for(let lat = -80; lat <= 80; lat += 30)   g += `<path d="M-360 ${py(lat)}H1440"/>`;
  return `<g class="ge-rejilla">${g}</g>`;
}

function pintarAtlas(modo){
  if(modo) geModo = modo;
  const pr = progresoGeo();

  $("#ge-modo-estudio").classList.toggle("activo", geModo === "estudio");
  $("#ge-modo-conquista").classList.toggle("activo", geModo === "conquista");
  $("#ge-progreso-txt").textContent = `${pr.hechos} / ${pr.total} países dominados`;
  $("#ge-progreso-fill").style.width = (pr.hechos / pr.total * 100) + "%";

  /* chips de continente */
  const chips = $("#ge-continentes");
  chips.innerHTML = "";
  const ops = [{id:null, nombre:"Todo el mundo", emo:"🌐"}].concat(
    GEO().CONTINENTES.map(c => ({id:c.id, nombre:c.id, emo:c.emo, color:c.color})));
  ops.forEach(c => {
    const n = c.id ? GEO().deContinente(c.id).length : GEO().paises.length;
    const hechos = c.id
      ? GEO().deContinente(c.id).filter(p => M.conquistado(idGe(p))).length
      : pr.hechos;
    const b = document.createElement("button");
    b.className = "chip" + (geCont === c.id ? " activo" : "");
    if(c.color) b.style.setProperty("--c", c.color);
    b.innerHTML = `${c.emo} ${c.nombre} <b style="opacity:.7">${hechos}/${n}</b>`;
    b.addEventListener("click", () => { M.Sonido.clic(); geCont = c.id; pintarAtlas(); });
    chips.appendChild(b);
  });

  pintarMapa();
  pintarPanelGe(null);
}

/* =====================================================================
   ZOOM Y ARRASTRE DEL MAPA
   En un móvil el mundo entero es una tira de 150 px: sin acercarse no hay
   forma de tocar un país. La vista actual es un viewBox propio que parte del
   encuadre del continente y se mueve con los dedos, la rueda o los botones.
   ===================================================================== */
let geVista = null;      // [x, y, ancho, alto] en curso
let geVistaDe = "";      // de qué continente es, para reiniciarla al cambiar
let geEscala = 720;      // ancho visible efectivo: manda el tamaño de puntos
let geArrastrado = false;
let geRepintar = null;
let geMarcado = "";      // país señalado, para no perderlo al repintar

const ZOOM_MAX = 14;

function vistaActual(){
  const base = encuadre(geCont);
  const clave = geCont || "mundo";
  if(!geVista || geVistaDe !== clave){ geVista = base.slice(0, 4); geVistaDe = clave; }
  return geVista;
}

/* Encaja una vista candidata: respeta la proporción del marco, no deja alejarse
   más allá del encuadre del continente ni acercarse más de ZOOM_MAX. */
function fijarVista(v){
  const base = encuadre(geCont);
  const prop = base[2] / base[3];
  let w = Math.min(base[2], Math.max(base[2] / ZOOM_MAX, v[2]));
  let h = w / prop;
  /* el margen se encoge con el zoom: alejado del todo la vista vuelve a
     encajar exactamente en el encuadre, sin quedarse descentrada */
  const mx = Math.max(0, base[2] - w) * 0.1, my = Math.max(0, base[3] - h) * 0.1;
  const x = Math.min(Math.max(v[0], base[0] - mx), base[0] + base[2] + mx - w);
  const y = Math.min(Math.max(v[1], base[1] - my), base[1] + base[3] + my - h);
  geVista = [x, y, w, h];
  const svg = $("#ge-svg");
  if(svg) svg.setAttribute("viewBox", geVista.map(n => n.toFixed(1)).join(" "));
  /* el repintado (tamaño de los puntos, qué país necesita diana) es caro:
     se hace al soltar, no en cada fotograma */
  clearTimeout(geRepintar);
  geRepintar = setTimeout(pintarMapa, 200);
}

/* punto de pantalla -> coordenadas del mapa, teniendo en cuenta el "meet" */
function aMapa(svg, cx, cy){
  const p = svg.createSVGPoint();
  p.x = cx; p.y = cy;
  return p.matrixTransform(svg.getScreenCTM().inverse());
}

/* acerca (f>1) o aleja (f<1) dejando quieto el punto (fx, fy) del mapa */
function acercar(f, fx, fy){
  const v = vistaActual(), nw = v[2] / f;
  if(fx === undefined){ fx = v[0] + v[2]/2; fy = v[1] + v[3]/2; }
  fijarVista([fx - (fx - v[0]) * (nw / v[2]),
              fy - (fy - v[1]) * (nw / v[2]), nw, 0]);
}

function conectarGestos(svg){
  const dedos = new Map();
  let previo = null;                 // {x, y} o {d, cx, cy} según haya 1 o 2 dedos

  svg.addEventListener("wheel", e => {
    e.preventDefault();
    const p = aMapa(svg, e.clientX, e.clientY);
    acercar(e.deltaY < 0 ? 1.22 : 1/1.22, p.x, p.y);
  }, {passive:false});

  svg.addEventListener("dblclick", e => {
    const p = aMapa(svg, e.clientX, e.clientY);
    acercar(1.9, p.x, p.y);
  });

  svg.addEventListener("pointerdown", e => {
    dedos.set(e.pointerId, {x:e.clientX, y:e.clientY});
    svg.setPointerCapture(e.pointerId);
    geArrastrado = false;
    previo = null;
  });

  svg.addEventListener("pointermove", e => {
    if(!dedos.has(e.pointerId)) return;
    dedos.set(e.pointerId, {x:e.clientX, y:e.clientY});
    const ds = [...dedos.values()];

    if(ds.length === 1){
      const p = aMapa(svg, ds[0].x, ds[0].y);
      if(previo){
        const v = vistaActual();
        if(Math.abs(p.x - previo.x) + Math.abs(p.y - previo.y) > v[2] / 400) geArrastrado = true;
        fijarVista([v[0] - (p.x - previo.x), v[1] - (p.y - previo.y), v[2], 0]);
      }
      /* el punto de agarre se recalcula tras mover la vista: así el dedo
         se queda pegado al mismo trozo de mapa */
      previo = aMapa(svg, ds[0].x, ds[0].y);
    }else if(ds.length === 2){
      const d = Math.hypot(ds[0].x - ds[1].x, ds[0].y - ds[1].y);
      const c = aMapa(svg, (ds[0].x + ds[1].x)/2, (ds[0].y + ds[1].y)/2);
      if(previo && previo.d) acercar(d / previo.d, c.x, c.y);
      geArrastrado = true;
      previo = {d, x:c.x, y:c.y};
    }
  });

  const soltar = e => {
    dedos.delete(e.pointerId);
    previo = null;
    if(!dedos.size) setTimeout(() => geArrastrado = false, 0);
  };
  svg.addEventListener("pointerup", soltar);
  svg.addEventListener("pointercancel", soltar);
}

function pintarMapa(){
  clearTimeout(geRepintar);
  const mm = MAPA();
  const base = encuadre(geCont);
  const vb = vistaActual();
  const oce = geCont === "Oceanía";
  const lista = geCont ? GEO().deContinente(geCont) : GEO().paises;
  const foco = new Set(lista.map(p => p.n));

  /* a qué tamaño un país deja de verse (y de poder tocarse) en esta vista */
  vb.escala = Math.max(vb[2], vb[3] * base.asp);
  vb.asp = base.asp;
  geEscala = vb.escala;
  const area = vb.escala * vb.escala / vb.asp;
  const UMBRAL_PUNTO = area / 70000;
  const UMBRAL_TOQUE = area / 12000;
  const rPunto = vb.escala / 260;
  const rToque = vb.escala / 170;

  const porNombre = {}, color = {};
  GEO().CONTINENTES.forEach(c => GEO().deContinente(c.id).forEach((p, i) => color[p.n] = tono(c.color, i)));
  GEO().paises.forEach(p => porNombre[p.n] = p);

  let fuera = "", dentro = "", puntos = "", toques = [];
  Object.keys(mm.paises).forEach(n => {            // ya vienen de mayor a menor
    const p = porNombre[n];
    const d = mm.paises[n];
    if(!p) return;
    if(!foco.has(n)){ fuera += `<path d="${d}"/>`; return; }
    const conq = M.conquistado(idGe(p));
    dentro += `<path class="ge-pais${conq ? " dominado" : ""}" data-id="${p.id}" `+
      `fill="${color[p.n]}" d="${d}"><title>`+
      `${geModo === "estudio" || conq ? p.n : "¿?"}</title></path>`;
  });

  /* los diminutos: un punto para verlos y un círculo invisible para tocarlos */
  lista.forEach(p => {
    const a = mm.areas[p.n];
    const x = px(p.lon, oce).toFixed(1), y = py(p.lat).toFixed(1);
    const conq = M.conquistado(idGe(p));
    if(a === undefined || a < UMBRAL_PUNTO){
      puntos += `<circle class="ge-punto${conq ? " dominado" : ""}" data-id="${p.id}" `+
        `cx="${x}" cy="${y}" r="${rPunto.toFixed(2)}" fill="${color[p.n]}">`+
        `<title>${geModo === "estudio" || conq ? p.n : "¿?"}</title></circle>`;
    }
    if(a === undefined || a < UMBRAL_TOQUE)
      toques.push([a === undefined ? 0 : a,
        `<circle class="ge-toque" data-id="${p.id}" cx="${x}" cy="${y}" r="${rToque.toFixed(2)}"/>`]);
  });
  /* el más pequeño arriba del todo, para que no se lo coma un vecino */
  toques = toques.sort((a, b) => b[0] - a[0]).map(t => t[1]).join("");

  const capas =
    `<g class="ge-otros"><path d="${mm.otros}"/>${fuera}</g>
     <g class="ge-paises">${dentro}</g>
     <g class="ge-puntos">${puntos}</g>
     <g class="ge-toques">${toques}</g>`;

  $("#ge-mapa").innerHTML =
    `<svg id="ge-svg" class="${geModo}" viewBox="${vb.map(v => v.toFixed(1)).join(" ")}"
          style="aspect-ratio:${base.asp.toFixed(2)}"
          preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
       ${rejilla()}
       ${capas}
       ${oce ? `<g transform="translate(720,0)">${capas}</g>` : ""}
       <circle id="ge-marca" r="0" style="display:none"/>
     </svg>
     <div class="ge-zoom">
       <button id="ge-mas" title="Acercar">+</button>
       <button id="ge-menos" title="Alejar">−</button>
       <button id="ge-reset" title="Ver el mapa entero">⟲</button>
     </div>`;

  const svg = $("#ge-svg");
  svg.addEventListener("click", e => {
    const el = e.target.closest("[data-id]");
    if(!el || geArrastrado) return;         // arrastrar el mapa no es elegir país
    M.Sonido.clic();
    abrirPais(el.dataset.id);
  });
  conectarGestos(svg);

  $("#ge-mas").addEventListener("click", () => { M.Sonido.clic(); acercar(1.6); });
  $("#ge-menos").addEventListener("click", () => { M.Sonido.clic(); acercar(1/1.6); });
  $("#ge-reset").addEventListener("click", () => {
    M.Sonido.clic();
    geVista = null;
    pintarMapa();
  });

  if(geMarcado) marcarPunto(geMarcado);       // el zoom repinta: no perder la señal
}

function fichaPais(p){
  const cont = GEO().CONTINENTES.find(c => c.id === p.cont);
  return `
  <div class="ficha-pa" style="--c:${cont ? cont.color : "var(--acento)"}">
    <div class="ficha-pa-cab">
      ${bandera(p.b, "bandera bandera-g")}
      <div><h3>${p.n}</h3><p class="ficha-cat">${cont ? cont.emo : ""} ${p.cont}</p></div>
    </div>
    <div class="ficha-datos">
      <div><small>Capital</small><b>${p.cap}</b></div>
      <div><small>Continente</small><b>${p.cont}</b></div>
      <div><small>Latitud</small><b>${p.lat > 0 ? p.lat.toFixed(1)+"° N" : (-p.lat).toFixed(1)+"° S"}</b></div>
      <div><small>Longitud</small><b>${p.lon > 0 ? p.lon.toFixed(1)+"° E" : (-p.lon).toFixed(1)+"° O"}</b></div>
    </div>
  </div>`;
}

const PASOS_GE = [
  {p:"¿Qué país está marcado en el mapa?", ph:"nombre del país", tipo:"texto"},
  {p:"¿Cuál es su capital?", ph:"nombre de la capital", tipo:"texto"},
  {p:"¿Cuál es su bandera?", tipo:"bandera"}
];

function abrirPais(id){
  const p = GEO().paises.find(x => x.id === id);
  if(!p) return;
  geActual = p;
  if(geModo === "estudio" || M.conquistado(idGe(p))){ pintarPanelGe(p); return; }
  gePaso = 0; geFallos = 0;
  pintarRetoGe();
}

function marcarPunto(id){
  geMarcado = id || "";
  document.querySelectorAll("#ge-mapa [data-id]").forEach(c =>
    c.classList.toggle("activo", c.dataset.id === id));

  /* aro que late sobre la capital: sin él, un país pequeño marcado pasa
     desapercibido justo cuando la pregunta es "¿cuál es este país?" */
  const marca = $("#ge-marca");
  if(!marca) return;
  const p = GEO().paises.find(x => x.id === id);
  if(!p){ marca.style.display = "none"; return; }
  let x = px(p.lon, geCont === "Oceanía");
  if(x < vistaActual()[0]) x += 720;           // la copia derecha en Oceanía
  marca.setAttribute("cx", x.toFixed(1));
  marca.setAttribute("cy", py(p.lat).toFixed(1));
  marca.setAttribute("r", (geEscala / 55).toFixed(2));
  marca.style.display = "";
}

/* En pantallas estrechas el panel cae debajo del mapa, así que lo que acabas
   de tocar (la ficha o la pregunta) aparece fuera de la vista. */
function acercarPanel(){
  if(window.innerWidth > 1000) return;
  const panel = $("#ge-panel");
  if(panel) setTimeout(() => panel.scrollIntoView({behavior:"smooth", block:"nearest"}), 40);
}

function pintarPanelGe(p){
  const panel = $("#ge-panel");
  marcarPunto(p ? p.id : "");
  if(p) acercarPanel();
  if(!p){
    panel.innerHTML = geModo === "estudio"
      ? `<p class="qu-vacio">Toca cualquier país del mapa para ver su capital y su bandera. Usa los filtros de arriba para acercarte a un continente.</p>`
      : `<p class="qu-vacio">Toca un país del mapa y te preguntaré tres cosas: <b>qué país es</b>, <b>su capital</b> y <b>cuál es su bandera</b>. Las tres bien y queda conquistado.</p>
         <button class="btn" id="ge-azar">🎲 País al azar</button>`;
    const az = $("#ge-azar");
    if(az) az.addEventListener("click", retoAzarGe);
    return;
  }
  const conq = M.conquistado(idGe(p));
  panel.innerHTML = fichaPais(p) +
    (geModo === "conquista" && conq
      ? `<div class="qu-acciones"><span class="qu-ok">✓ Conquistado</span>
           <button class="btn btn-fantasma" id="ge-repetir">Volver a intentarlo</button>
           <button class="btn" id="ge-azar">🎲 Otro país</button></div>`
      : `<div class="qu-acciones"><button class="btn btn-fantasma" id="ge-cerrar">Cerrar</button></div>`);

  const rep = $("#ge-repetir");
  if(rep) rep.addEventListener("click", () => { M.rendirCasilla(idGe(p)); pintarAtlas(); abrirPais(p.id); });
  const az = $("#ge-azar");
  if(az) az.addEventListener("click", retoAzarGe);
  const cerrar = $("#ge-cerrar");
  if(cerrar) cerrar.addEventListener("click", () => pintarPanelGe(null));
}

function retoAzarGe(){
  const lista = geCont ? GEO().deContinente(geCont) : GEO().paises;
  const pend = lista.filter(p => !M.conquistado(idGe(p)));
  const bolsa = pend.length ? pend : lista;
  const p = M.elegirPesado(bolsa, 1, x => idGe(x))[0];
  M.Sonido.clic();
  geActual = p;
  if(!M.conquistado(idGe(p))){ gePaso = 0; geFallos = 0; pintarRetoGe(); }
  else pintarPanelGe(p);
}

function pintarRetoGe(){
  const p = geActual, paso = PASOS_GE[gePaso];
  const cont = GEO().CONTINENTES.find(c => c.id === p.cont);
  marcarPunto(p.id);
  if(gePaso === 0) acercarPanel();

  let cuerpo;
  if(paso.tipo === "bandera"){
    /* fuera las banderas idénticas a la suya: si no, habría dos respuestas buenas */
    const mia = JSON.stringify(p.b);
    const otras = M.mezclar(GEO().paises.filter(x => x.id !== p.id && JSON.stringify(x.b) !== mia)).slice(0,3);
    const ops = M.mezclar([p].concat(otras));
    geActual._ops = ops;
    cuerpo = `<div class="ge-banderas">${ops.map((x,i) =>
      `<button class="ge-op-bandera" data-i="${i}"><span class="tecla">${i+1}</span>${bandera(x.b,"bandera bandera-m")}</button>`).join("")}</div>`;
  }else{
    cuerpo = `<div class="escribir">
        <input type="text" id="reto-campo" autocomplete="off" spellcheck="false" placeholder="${paso.ph}">
        <button class="btn" id="reto-ok">Comprobar</button>
      </div>`;
  }

  $("#ge-panel").innerHTML = `
    <div class="reto" style="--c:${cont ? cont.color : "var(--acento)"}">
      <div class="reto-cab">
        <div class="reto-icono">${cont ? cont.emo : "🌐"}</div>
        <div>
          <small>${gePaso === 0 ? "Mira el país marcado en el mapa" : p.n}</small>
          <div class="reto-pasos">${PASOS_GE.map((x,i) =>
            `<span class="${i<gePaso?"hecho":i===gePaso?"actual":""}">${i+1}</span>`).join("")}</div>
        </div>
      </div>
      <h3>${paso.p}</h3>
      ${cuerpo}
      <div id="reto-fb" class="reto-fb"></div>
      <button class="btn btn-fantasma reto-salir" id="reto-salir">Dejarlo por ahora</button>
    </div>`;

  if(paso.tipo === "bandera"){
    $("#ge-panel").querySelectorAll(".ge-op-bandera").forEach(b => {
      b.addEventListener("click", () => comprobarGeBandera(+b.dataset.i, b));
    });
  }else{
    const campo = $("#reto-campo");
    const enviar = () => comprobarGe(campo.value);
    $("#reto-ok").addEventListener("click", enviar);
    campo.addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); enviar(); } });
    setTimeout(() => campo.focus(), 50);
  }
  $("#reto-salir").addEventListener("click", () => { M.Sonido.clic(); pintarPanelGe(null); });
}

/* algunos nombres admiten variantes */
const ALIAS = {
  "Estados Unidos":["eeuu","ee uu","usa","estados unidos de america"],
  "Reino Unido":["inglaterra","gran bretana","uk"],
  "Países Bajos":["holanda"],
  "Chequia":["republica checa","checoslovaquia no","chequia"],
  "Birmania (Myanmar)":["birmania","myanmar"],
  "República Democrática del Congo":["rd congo","congo kinsasa","rdc","zaire"],
  "República del Congo":["congo","congo brazzaville"],
  "Esuatini":["suazilandia","swazilandia"],
  "Costa de Marfil":["cote divoire"],
  "Ciudad del Vaticano":["vaticano"],
  "Emiratos Árabes Unidos":["emiratos arabes","eau"],
  "Corea del Sur":["corea"],
  "Sri Lanka":["ceilan"],
  "Timor Oriental":["timor"],
  "Macedonia del Norte":["macedonia"],
  "Bosnia y Herzegovina":["bosnia"],
  "San Cristóbal y Nieves":["san cristobal"],
  "San Vicente y las Granadinas":["san vicente"],
  "Antigua y Barbuda":["antigua"],
  "Trinidad y Tobago":["trinidad"],
  "Papúa Nueva Guinea":["papua"],
  "Santo Tomé y Príncipe":["santo tome"],
  "República Centroafricana":["centroafrica","republica centro africana"],
  "Nueva Delhi":["delhi"],
  "Washington D. C.":["washington","washington dc"],
  "Ciudad de México":["mexico df","cdmx","df"],
  "Ciudad de Guatemala":["guatemala"],
  "Ciudad de Panamá":["panama"],
  "Sri Jayawardenapura Kotte":["kotte","colombo"],
  "Nasáu":["nassau"],
  "Puerto España":["port of spain"],
  "Puerto Príncipe":["port au prince"]
};

function aciertaNombre(dado, correcto){
  const d = M.normalizar(dado);
  if(!d) return false;
  if(d === M.normalizar(correcto)) return true;
  const al = ALIAS[correcto];
  return !!(al && al.some(a => M.normalizar(a) === d));
}

function comprobarGe(txt){
  const p = geActual;
  const correcto = gePaso === 0 ? p.n : p.cap;
  const ok = aciertaNombre(txt, correcto);
  M.registrarItem(idGe(p) + "-" + gePaso, ok, p.n + " · " + (gePaso === 0 ? "país" : "capital"), "ge-atlas");
  if(!ok) geFallos++;

  const fb = $("#reto-fb");
  fb.className = "reto-fb " + (ok ? "bien" : "mal");
  fb.innerHTML = ok ? "✅ Correcto." : `❌ Era <b>${correcto}</b>.`;
  if(ok) M.Sonido.bien(1); else M.Sonido.mal();
  const campo = $("#reto-campo");
  if(campo){ campo.disabled = true; campo.classList.add(ok ? "correcta" : "incorrecta"); }
  $("#reto-ok").disabled = true;

  setTimeout(avanzarGe, ok ? 620 : 1500);
}

function comprobarGeBandera(i, boton){
  const p = geActual, ops = p._ops || [];
  const ok = ops[i] && ops[i].id === p.id;
  M.registrarItem(idGe(p) + "-2", ok, p.n + " · bandera", "ge-atlas");
  if(!ok) geFallos++;

  document.querySelectorAll(".ge-op-bandera").forEach((b,k) => {
    b.disabled = true;
    if(ops[k] && ops[k].id === p.id) b.classList.add("correcta");
    else if(k === i) b.classList.add("incorrecta");
  });
  const fb = $("#reto-fb");
  fb.className = "reto-fb " + (ok ? "bien" : "mal");
  fb.innerHTML = ok ? "✅ Esa es." : `❌ La bandera de <b>${p.n}</b> era la marcada en verde.`;
  if(ok) M.Sonido.bien(1); else M.Sonido.mal();
  setTimeout(avanzarGe, ok ? 700 : 1700);
}

function avanzarGe(){
  gePaso++;
  if(gePaso < PASOS_GE.length){ pintarRetoGe(); return; }
  const p = geActual;
  if(geFallos === 0){
    if(M.conquistar(idGe(p))){
      const subio = M.sumarXP(M.XP_CASILLA);
      M.Sonido.victoria();
      api.pintarCabecera();
      const pr = progresoGeo();
      api.brindis(subio
        ? `${subio.icono} ¡${p.n} conquistado y subiste a <b>${subio.nombre}</b>!`
        : `🌍 <b>${p.n}</b> conquistado · +${M.XP_CASILLA} XP · ${pr.hechos}/${pr.total}`, 3000);
      if(pr.hechos === pr.total) setTimeout(() => api.brindis("🏆 ¡Atlas completo! Te sabes el mundo entero.", 6000), 3200);
    }
  }else{
    api.brindis(`Casi. Mírate la ficha de <b>${p.n}</b> y vuelve a por él.`, 2600);
  }
  pintarAtlas();
  pintarPanelGe(p);
}

/* =====================================================================
   NAVEGACIÓN
   ===================================================================== */
function abrirTabla(modo){ pintarTabla(modo || quModo); api.ir("pantalla-tabla"); }
function abrirAtlas(modo){ pintarAtlas(modo || geModo); api.ir("pantalla-atlas"); }

function conectar(){
  $("#qu-modo-estudio").addEventListener("click", () => { M.Sonido.clic(); pintarTabla("estudio"); });
  $("#qu-modo-conquista").addEventListener("click", () => { M.Sonido.clic(); pintarTabla("conquista"); });
  $("#qu-volver").addEventListener("click", () => api.volverAlHub());
  $("#ge-modo-estudio").addEventListener("click", () => { M.Sonido.clic(); pintarAtlas("estudio"); });
  $("#ge-modo-conquista").addEventListener("click", () => { M.Sonido.clic(); pintarAtlas("conquista"); });
  $("#ge-volver").addEventListener("click", () => api.volverAlHub());
}

return {init, conectar, abrirTabla, abrirAtlas, bandera,
        progresoQuimica, progresoGeo};

})();
