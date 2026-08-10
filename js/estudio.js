/* ============================================================
   ESTUDIO — modo lectura, sin preguntas ni cronómetro
   Se alimenta de window.APUNTES[mundoId]
   ============================================================ */

const Estudio = (() => {

const M = Motor;
const $ = s => document.querySelector(s);

/* API que inyecta app.js para no duplicar navegación */
let api = {ir(){}, brindis(){}, pintarCabecera(){}, jugarMundo(){}};

let filtro = null;      // id de mundo, o null = todos
let actual = null;      // {mundo, tema, i}

function init(a){ api = Object.assign(api, a); }

function apuntesDe(mundoId){ return (window.APUNTES && window.APUNTES[mundoId]) || []; }

function hayApuntes(mundoId){ return apuntesDe(mundoId).length > 0; }

/* Cuántos temas leídos / totales de un mundo */
function progresoMundo(mundoId){
  const lista = apuntesDe(mundoId);
  return {leidos: lista.filter(t => M.estaLeido(t.id)).length, total: lista.length};
}

/* =====================================================================
   ÍNDICE
   ===================================================================== */
function pintarIndice(mundoId){
  if(mundoId !== undefined) filtro = mundoId;

  /* chips de filtro */
  const chips = $("#estudio-filtros");
  chips.innerHTML = "";
  const opciones = [{id:null, nombre:"Todos", emo:"📚"}].concat(
    Juegos.MUNDOS.filter(m => hayApuntes(m.id)).map(m => ({id:m.id, nombre:m.nombre, emo:m.emo, color:m.color}))
  );
  opciones.forEach(o => {
    const b = document.createElement("button");
    b.className = "chip" + (filtro === o.id ? " activo" : "");
    if(o.color) b.style.setProperty("--c", o.color);
    b.innerHTML = `${o.emo} ${o.nombre}`;
    b.addEventListener("click", () => { M.Sonido.clic(); pintarIndice(o.id); });
    chips.appendChild(b);
  });

  /* listado */
  const cont = $("#estudio-lista");
  cont.innerHTML = "";

  const mundos = Juegos.MUNDOS.filter(m => hayApuntes(m.id) && (!filtro || m.id === filtro));

  mundos.forEach(mundo => {
    const lista = apuntesDe(mundo.id);
    const pr = progresoMundo(mundo.id);

    const div = document.createElement("div");
    div.className = "mundo";
    div.innerHTML = `
      <div class="mundo-cab">
        <span class="emo">${mundo.emo}</span>
        <h2>${mundo.nombre}</h2>
        <span class="cinta" style="background:${mundo.color}"></span>
        <span class="cuenta-leidos">${pr.leidos}/${pr.total} leídos</span>
      </div>
      <div class="rejilla-temas"></div>`;
    const rej = div.querySelector(".rejilla-temas");

    lista.forEach((t, i) => {
      const leido = M.estaLeido(t.id);
      const carta = document.createElement("button");
      carta.className = "tema" + (leido ? " leido" : "");
      carta.style.setProperty("--c", mundo.color);
      carta.innerHTML = `
        <div class="tema-cab">
          <span class="tema-emo">${t.emo || "📄"}</span>
          <span class="tema-num">${i+1}</span>
          ${leido ? '<span class="tema-tick" title="Ya lo leíste">✓</span>' : ""}
        </div>
        <h3>${t.t}</h3>
        <p>${t.res || ""}</p>
        <small>${t.secciones.length} apartados${t.min ? " · ~"+t.min+" min" : ""}</small>`;
      carta.addEventListener("click", () => { M.Sonido.clic(); abrirTema(mundo.id, t.id); });
      rej.appendChild(carta);
    });

    cont.appendChild(div);
  });

  if(!mundos.length){
    cont.innerHTML = `<p class="vacio">Todavía no hay apuntes para este mundo.</p>`;
  }

  api.ir("pantalla-estudio");
}

/* =====================================================================
   LECTURA
   ===================================================================== */
function abrirTema(mundoId, temaId){
  const lista = apuntesDe(mundoId);
  const i = lista.findIndex(t => t.id === temaId);
  if(i < 0) return;
  const tema = lista[i];
  const mundo = Juegos.MUNDOS.find(m => m.id === mundoId);
  actual = {mundo: mundoId, tema: temaId, i};

  document.documentElement.style.setProperty("--c-lectura", mundo ? mundo.color : "var(--acento)");

  $("#lectura-migas").innerHTML =
    `${mundo ? mundo.emo+" "+mundo.nombre : ""} <span class="sep">›</span> apunte ${i+1} de ${lista.length}`;
  $("#lectura-titulo").innerHTML = `${tema.emo || "📄"} ${tema.t}`;
  $("#lectura-res").textContent = tema.res || "";

  /* índice de apartados */
  const idx = $("#lectura-indice");
  idx.innerHTML = tema.secciones.map((s, k) =>
    `<a href="#ap-${k}" data-k="${k}"><span>${k+1}</span>${s.h}</a>`).join("");
  idx.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const dest = document.getElementById("ap-" + a.dataset.k);
      if(dest) dest.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });

  /* cuerpo */
  $("#lectura-cuerpo").innerHTML = tema.secciones.map((s, k) =>
    `<section class="apartado" id="ap-${k}">
       <h3><span class="ap-num">${k+1}</span>${s.h}</h3>
       <div class="ap-cuerpo">${s.c}</div>
     </section>`).join("");

  /* pie: navegación entre apuntes */
  const ant = lista[i-1], sig = lista[i+1];
  const pie = $("#lectura-nav");
  pie.innerHTML = "";
  if(ant){
    const b = document.createElement("button");
    b.className = "btn btn-fantasma";
    b.innerHTML = `← ${ant.t}`;
    b.addEventListener("click", () => abrirTema(mundoId, ant.id));
    pie.appendChild(b);
  }
  if(sig){
    const b = document.createElement("button");
    b.className = "btn";
    b.innerHTML = `${sig.t} →`;
    b.addEventListener("click", () => abrirTema(mundoId, sig.id));
    pie.appendChild(b);
  }

  pintarBotonLeido();

  $("#btn-lectura-jugar").onclick = () => { M.Sonido.clic(); api.jugarMundo(mundoId); };

  api.ir("pantalla-lectura");
}

function pintarBotonLeido(){
  const b = $("#btn-marcar-leido");
  if(!actual) return;
  if(M.estaLeido(actual.tema)){
    b.className = "btn btn-fantasma hecho";
    b.innerHTML = "✓ Apunte repasado";
    b.disabled = true;
  }else{
    b.className = "btn btn-grande";
    b.innerHTML = `✅ Marcar como repasado <small>+${M.XP_APUNTE} XP</small>`;
    b.disabled = false;
  }
}

function marcarActual(){
  if(!actual) return;
  if(!M.marcarLeido(actual.tema)) return;
  const subio = M.sumarXP(M.XP_APUNTE);
  M.Sonido.victoria();
  api.pintarCabecera();
  pintarBotonLeido();
  api.brindis(subio
    ? `${subio.icono} +${M.XP_APUNTE} XP · ¡Subiste a <b>${subio.nombre}</b>!`
    : `📚 +${M.XP_APUNTE} XP por repasar. Ahora sí, a la arena.`, 3200);
  if(subio) setTimeout(() => M.Sonido.subirRango(), 500);
}

/* =====================================================================
   EVENTOS
   ===================================================================== */
function conectar(){
  $("#btn-marcar-leido").addEventListener("click", marcarActual);
  $("#btn-lectura-volver").addEventListener("click", () => { M.Sonido.clic(); pintarIndice(); });
  $("#btn-estudio-volver").addEventListener("click", () => api.volverAlHub());
}

return {init, conectar, pintarIndice, abrirTema, hayApuntes, progresoMundo,
        get enLectura(){ return !!actual; },
        volverAlIndice(){ pintarIndice(); }};

})();
