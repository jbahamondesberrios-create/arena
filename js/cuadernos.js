/* ============================================================
   CUADERNOS — los cinco resúmenes del MicroMasters

   No son apuntes del modo estudio: cada uno es una página entera con su
   propio diseño, así que en vez de pintarlos dentro de la app se abren
   como documento. Lo que vive aquí es el índice y el registro de leídos.

   Se apoya en Motor.leidos (la misma tabla que los apuntes), así que la
   copia del progreso entre dispositivos ya los lleva sin tocar nada.
   ============================================================ */

const Cuadernos = (() => {

const M = Motor;
const $ = s => document.querySelector(s);

let api = {ir(){}, brindis(){}, pintarCabecera(){}, volverAlHub(){}};

function init(a){ api = Object.assign(api, a); }

function lista(){ return window.CUADERNOS || []; }

function progreso(){
  const l = lista();
  return {leidos: l.filter(c => M.estaLeido(c.id)).length, total: l.length};
}

/* Minutos de lectura que quedan por delante, para la banda del hub */
function minutosPendientes(){
  return lista().filter(c => !M.estaLeido(c.id)).reduce((s,c) => s + (c.min||0), 0);
}

/* =====================================================================
   ÍNDICE
   ===================================================================== */
function pintar(){
  const cont = $("#cuadernos-lista");
  const pr = progreso();

  $("#cuadernos-cuenta").textContent = `${pr.leidos} de ${pr.total} repasados`;
  $("#cuadernos-barra").style.width = pr.total ? (pr.leidos / pr.total * 100) + "%" : "0%";

  cont.innerHTML = "";

  lista().forEach(c => {
    const leido = M.estaLeido(c.id);
    const art = document.createElement("article");
    art.className = "carta-cuad" + (leido ? " leido" : "");
    art.style.setProperty("--c", c.color);
    art.innerHTML = `
      <div class="cuad-orden">${c.orden}</div>
      <div class="cuad-cuerpo">
        <div class="cuad-cab">
          <span class="cuad-emo">${c.emo}</span>
          <div>
            <span class="cuad-cod">${c.cod}</span>
            <h3>${c.t}</h3>
          </div>
          ${leido ? '<span class="cuad-tick" title="Ya lo repasaste">✓</span>' : ""}
        </div>
        <p class="cuad-res">${c.res}</p>
        <ul class="cuad-temas">${c.temas.map(t => `<li>${t}</li>`).join("")}</ul>
        <div class="cuad-datos">
          <span title="Profesor del curso">👤 ${c.prof}</span>
          <span title="Módulos que cubre">📦 ${c.modulos} módulos</span>
          <span title="Ejemplos resueltos paso a paso">✏️ ${c.ejemplos} ejemplos</span>
          <span title="Retos con solución escondida">🎯 ${c.retos} retos</span>
          <span title="Tiempo de lectura estimado">⏱️ ~${c.min} min</span>
        </div>
        <small class="cuad-pre">${c.pre}</small>
        <div class="cuad-botones">
          <a class="btn" href="${c.arch}">📖 Abrir el cuaderno</a>
          <button class="btn btn-fantasma" data-leer="${c.id}" ${leido ? "disabled" : ""}>
            ${leido ? "✓ Repasado" : `✅ Marcar repasado <small>+${M.XP_CUADERNO} XP</small>`}
          </button>
        </div>
      </div>`;
    cont.appendChild(art);
  });

  cont.querySelectorAll("[data-leer]").forEach(b => {
    b.addEventListener("click", () => marcar(b.dataset.leer));
  });

  api.ir("pantalla-cuadernos");
}

/* =====================================================================
   MARCAR COMO REPASADO
   ===================================================================== */
function marcar(id){
  const c = lista().find(x => x.id === id);
  if(!c) return;
  if(!M.marcarLeido(id)) return;              // ya estaba: sin XP

  const subio = M.sumarXP(M.XP_CUADERNO);
  M.Sonido.victoria();
  api.pintarCabecera();
  pintar();

  const pr = progreso();
  let txt = subio
    ? `${subio.icono} +${M.XP_CUADERNO} XP · ¡Subiste a <b>${subio.nombre}</b>!`
    : `📕 +${M.XP_CUADERNO} XP por <b>${c.cod}</b>.`;
  if(pr.leidos === pr.total) txt = `🎓 ¡Los cinco cuadernos repasados! +${M.XP_CUADERNO} XP`;

  api.brindis(txt, 3400);
  if(subio) setTimeout(() => M.Sonido.subirRango(), 500);
}

/* =====================================================================
   EVENTOS
   ===================================================================== */
function conectar(){
  $("#btn-cuadernos-volver").addEventListener("click", () => api.volverAlHub());
}

return {init, conectar, pintar, progreso, minutosPendientes,
        get total(){ return lista().length; }};

})();
