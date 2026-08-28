/* ============================================================
   APP — interfaz, bucle de batalla y pantallas
   ============================================================ */

(() => {

const M = Motor;
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/* ---------- estado de la partida en curso ---------- */
let P = null;

/* =====================================================================
   CABECERA
   ===================================================================== */
function pintarCabecera(){
  const {actual, siguiente} = M.rango();
  $("#rango-icono").textContent = actual.icono;
  $("#rango-nombre").textContent = actual.nombre;
  if(siguiente){
    const rango = siguiente.xp - actual.xp;
    const hecho = M.estado.xp - actual.xp;
    $("#barra-xp-fill").style.width = Math.min(100, hecho/rango*100) + "%";
    $("#rango-xp").textContent = `${M.estado.xp.toLocaleString("es-CL")} / ${siguiente.xp.toLocaleString("es-CL")} XP`;
  }else{
    $("#barra-xp-fill").style.width = "100%";
    $("#rango-xp").textContent = `${M.estado.xp.toLocaleString("es-CL")} XP · máximo rango`;
  }
  $("#racha-num").textContent = M.estado.racha;
  $("#medallas-num").textContent = M.contarMedallas();
  $("#btn-sonido").textContent = M.estado.sonido ? "🔊" : "🔇";
}

/* =====================================================================
   PANTALLAS
   ===================================================================== */
function ir(id){
  $$(".pantalla").forEach(p => p.classList.remove("activa"));
  $("#"+id).classList.add("activa");
  window.scrollTo({top:0, behavior:"instant"});
}

function brindis(txt, ms){
  const b = $("#brindis");
  b.innerHTML = txt;
  b.classList.add("ver");
  clearTimeout(b._t);
  b._t = setTimeout(() => b.classList.remove("ver"), ms || 2600);
}

/* =====================================================================
   HUB
   ===================================================================== */
/* --- cartas de los dos tableros especiales --- */
const ESPECIALES = [
  {id:"tabla", tipo:"qu", emo:"⚗️", color:"var(--qu)", nombre:"Tabla periódica",
   desc:"Los 118 elementos en su rejilla de siempre. Te pregunto nombre, número atómico y peso atómico de cada casilla hasta que la tabla entera esté pintada.",
   prog:() => Especiales.progresoQuimica(), unidad:"elementos",
   abrir:m => Especiales.abrirTabla(m)},
  {id:"atlas", tipo:"ge", emo:"🌍", color:"var(--ge)", nombre:"Atlas del mundo",
   desc:"Un mapa político con los 197 países y sus fronteras. Te pregunto qué país es, cuál es su capital y cuál su bandera, y cada uno se pinta al ganarlo. Se puede filtrar por continente y acercarse con el zoom.",
   prog:() => Especiales.progresoGeo(), unidad:"países",
   abrir:m => Especiales.abrirAtlas(m)}
];

function pintarEspeciales(){
  const cont = $("#especiales");
  cont.innerHTML = "";
  ESPECIALES.forEach(e => {
    const pr = e.prog();
    const pc = pr.total ? Math.round(pr.hechos / pr.total * 100) : 0;
    const div = document.createElement("div");
    div.className = "carta-esp";
    div.style.setProperty("--c", e.color);
    div.innerHTML = `
      <span class="esp-emo">${e.emo}</span>
      <div style="flex:1">
        <h3>${e.nombre}</h3>
        <p>${e.desc}</p>
        <span class="esp-cuenta">${pr.hechos} de ${pr.total} ${e.unidad} · ${pc} %</span>
        <div class="esp-barra"><i style="width:${pc}%"></i></div>
        <div class="esp-botones">
          <button class="btn" data-esp="${e.id}" data-modo="conquista">⚔️ Jugar</button>
          <button class="btn btn-fantasma" data-esp="${e.id}" data-modo="estudio">📖 Estudiar</button>
          <button class="btn btn-fantasma" data-esp="${e.id}" data-modo="perso">⚙️ A tu medida</button>
        </div>
      </div>`;
    cont.appendChild(div);
  });
  cont.querySelectorAll("[data-esp]").forEach(b => {
    b.addEventListener("click", () => {
      M.Sonido.clic();
      const e = ESPECIALES.find(x => x.id === b.dataset.esp);
      if(!e) return;
      if(b.dataset.modo === "perso") abrirPerso(e.tipo);
      else e.abrir(b.dataset.modo);
    });
  });
}

/* --- banda de cuadernos del hub --- */
function pintarBandaCuadernos(){
  const pr = Cuadernos.progreso();
  const fill = $("#cuad-banda-fill");
  const txt  = $("#cuad-banda-txt");
  if(!fill || !txt) return;
  fill.style.width = pr.total ? (pr.leidos / pr.total * 100) + "%" : "0%";
  if(pr.leidos === pr.total){
    txt.innerHTML = `🎓 Los ${pr.total} repasados.`;
  }else{
    const min = Cuadernos.minutosPendientes();
    txt.innerHTML = `${pr.leidos} de ${pr.total} repasados · quedan ~${min} min de lectura`;
  }
}

function pintarHub(){
  pintarEspeciales();
  pintarBandaCuadernos();
  const cont = $("#mundos");
  cont.innerHTML = "";

  Juegos.MUNDOS.forEach(mundo => {
    const juegos = Juegos.JUEGOS.filter(j => j.mundo === mundo.id);
    const div = document.createElement("div");
    div.className = "mundo";
    div.id = "mundo-" + mundo.id;
    const pr = Estudio.progresoMundo(mundo.id);
    div.innerHTML = `
      <div class="mundo-cab">
        <span class="emo">${mundo.emo}</span>
        <h2>${mundo.nombre}</h2>
        <span class="cinta" style="background:${mundo.color}"></span>
        ${Estudio.hayApuntes(mundo.id)
          ? `<button class="btn-estudiar-mundo" data-mundo="${mundo.id}" style="--c:${mundo.color}"
               title="Leer los apuntes de ${mundo.nombre} sin preguntas">📚 Estudiar <b>${pr.leidos}/${pr.total}</b></button>`
          : ""}
      </div>
      <p class="mundo-desc">${mundo.desc}</p>
      <div class="rejilla-juegos"></div>`;
    const rej = div.querySelector(".rejilla-juegos");

    juegos.forEach(j => {
      const carta = document.createElement("div");
      carta.className = "carta";
      carta.style.setProperty("--c", mundo.color);
      let nivelesHtml = "";
      for(let n=1;n<=3;n++){
        const med = M.medallaDe(j.id, n);
        const rec = M.recordDe(j.id, n);
        nivelesHtml += `
          <button class="niv" data-juego="${j.id}" data-nivel="${n}" title="${rec ? "Tu récord: "+rec+" pts" : "Sin jugar todavía"}">
            <span class="medalla ${med?"":"sinmedalla"}">${med ? M.ICONO_MED[med] : "○"}</span>
            ${M.NIVELES[n].nombre}
            <small>${rec ? rec+" pts" : "—"}</small>
          </button>`;
      }
      carta.innerHTML = `
        <h3>${j.emo} ${j.nombre}</h3>
        <p>${j.desc}</p>
        <div class="niveles">${nivelesHtml}</div>
        <button class="niv-perso" data-perso="${j.id}"
          title="Elegir vidas, tiempo y número de preguntas">⚙️ A tu medida</button>`;
      rej.appendChild(carta);
    });

    cont.appendChild(div);
  });

  cont.querySelectorAll(".niv").forEach(b => {
    b.addEventListener("click", () => {
      M.Sonido.clic();
      empezar(b.dataset.juego, +b.dataset.nivel);
    });
  });

  cont.querySelectorAll("[data-perso]").forEach(b => {
    b.addEventListener("click", () => {
      M.Sonido.clic();
      abrirPerso(b.dataset.perso);
    });
  });

  cont.querySelectorAll(".btn-estudiar-mundo").forEach(b => {
    b.addEventListener("click", () => {
      M.Sonido.clic();
      Estudio.pintarIndice(b.dataset.mundo);
    });
  });

  /* aviso de repaso */
  const flojos = M.itemsFlojos();
  const aviso = $("#aviso-repaso");
  if(flojos.length >= 5){
    $("#repaso-cuenta").textContent = flojos.length;
    aviso.classList.remove("oculto");
  }else{
    aviso.classList.add("oculto");
  }

  pintarCabecera();
}

/* =====================================================================
   BATALLA
   ===================================================================== */
/* `perso` es la configuración del nivel a medida ({base,preguntas,vidas,tiempo}).
   Si viene, manda ella: el nivel solo decide de qué preguntas se tira. */
function empezar(juegoId, nivel, esRepaso, perso){
  const cfg = perso ? M.cfgPerso(perso) : M.NIVELES[nivel];
  P = {
    juegoId, nivel, esRepaso: !!esRepaso, perso: perso || null, cfg,
    total: cfg.preguntas,
    idx: 0,
    aciertos: 0,
    vidas: cfg.vidas,
    combo: 0,
    mejorCombo: 0,
    puntos: 0,
    respondida: false,
    pregunta: null,
    timer: null,
    restante: 0,
    construidos: [],
    vistos: new Set()
  };
  ir("pantalla-juego");
  siguientePregunta();
}

function generarPregunta(){
  if(P.esRepaso){
    const q = Juegos.genRepaso(P.nivel);
    if(q) return q;
    /* ya no quedan conceptos flojos: seguimos con un juego cualquiera */
    return Juegos.JUEGOS[Math.floor(Math.random()*Juegos.JUEGOS.length)].gen(P.nivel);
  }
  const j = Juegos.porId(P.juegoId);
  return j.gen(P.nivel);
}

function siguientePregunta(){
  if(P.idx >= P.total || P.vidas <= 0){ terminar(); return; }
  P.respondida = false;
  P.construidos = [];

  /* Evita repetir dentro de la misma batalla: reintenta mientras el banco dé
     de sí. Si el pool del juego es más pequeño que la ronda, acaba cediendo
     en vez de quedarse colgado. El margen crece con la ronda porque en una
     batalla de 118 elementos las últimas preguntas son agujas en un pajar;
     en cuanto el banco se agota de verdad, se deja de insistir. */
  const tope = P.sinBanco ? 12 : Math.min(1400, 40 + P.total * 12);
  let q = generarPregunta(), guarda = 0;
  while(P.vistos.has(q.id) && guarda++ < tope) q = generarPregunta();
  if(P.vistos.has(q.id)) P.sinBanco = true;
  P.pregunta = q;
  P.vistos.add(q.id);

  pintarHUD();
  pintarPregunta(q);
  arrancarCrono();
}

function pintarHUD(){
  $("#hud-vidas").textContent = "❤️".repeat(P.vidas) + "🖤".repeat(Math.max(0, P.cfg.vidas - P.vidas));
  $("#progreso-fill").style.width = (P.idx / P.total * 100) + "%";
  $("#progreso-txt").textContent = `${P.idx} / ${P.total}`;
  const c = $("#hud-combo");
  c.textContent = "×" + multiplicador().toFixed(1).replace(".0","");
  c.style.color = P.combo >= 5 ? "var(--oro)" : P.combo >= 2 ? "var(--ok)" : "var(--texto-2)";
  $("#hud-puntos").textContent = Math.round(P.puntos);
}

function multiplicador(){ return 1 + Math.min(P.combo, 10) * 0.1; }

function pintarPregunta(q){
  const j = Juegos.porId(P.juegoId);
  $("#etiqueta-juego").textContent = (P.esRepaso ? "⚠️ REPASO · " : "") +
      (j ? j.nombre : "") + " · " + P.cfg.nombre + (q.etiqueta ? " · " + q.etiqueta : "");
  $("#enunciado").innerHTML = q.enunciado;
  $("#subenunciado").innerHTML = q.sub || "";

  const pista = $("#pista-caja");
  if(q.pista){ pista.innerHTML = q.pista; pista.classList.remove("oculta"); }
  else pista.classList.add("oculta");

  const zona = $("#zona-respuesta");
  zona.innerHTML = "";

  if(q.tipo === "opciones")      pintarOpciones(zona, q);
  else if(q.tipo === "celda")    pintarCeldas(zona, q);
  else if(q.tipo === "escribir") pintarEscribir(zona, q, false);
  else if(q.tipo === "numero")   pintarEscribir(zona, q, true);
  else if(q.tipo === "ordenar")  pintarOrdenar(zona, q);

  $("#feedback").classList.add("oculto");
  $("#feedback").className = "feedback oculto";
}

/* ---------- tipos de respuesta ---------- */

function pintarOpciones(zona, q){
  const cols = q.cols || (q.opciones.length === 2 ? 2 : (q.opciones.length === 3 && q.opciones.every(o=>o.length<8) ? 3 : 1));
  const div = document.createElement("div");
  div.className = "opciones" + (cols === 2 ? " dos" : cols === 3 ? " tres" : "");
  q.opciones.forEach((o, i) => {
    const b = document.createElement("button");
    b.className = "op";
    b.innerHTML = `<span class="tecla">${i+1}</span><span class="${q.ar?"ar":""}" style="flex:1">${o}</span>`;
    b.addEventListener("click", () => responderOpcion(i));
    div.appendChild(b);
  });
  zona.appendChild(div);
}

function pintarCeldas(zona, q){
  const div = document.createElement("div");
  div.className = "rejilla";
  div.style.gridTemplateColumns = `repeat(${q.cols||4}, 1fr)`;
  div.style.maxWidth = (q.cols||4) * 92 + "px";
  q.opciones.forEach((o, i) => {
    const b = document.createElement("button");
    b.className = "celda";
    b.textContent = o;
    b.addEventListener("click", () => responderOpcion(i));
    div.appendChild(b);
  });
  zona.appendChild(div);
}

function pintarEscribir(zona, q, numerico){
  const div = document.createElement("div");
  div.className = "escribir";
  div.innerHTML = `<input type="text" id="campo" autocomplete="off" autocapitalize="off"
      spellcheck="false" placeholder="${numerico ? "tu resultado…" : "escribe aquí…"}">
    <button class="btn" id="btn-comprobar">Comprobar</button>`;
  zona.appendChild(div);
  const campo = div.querySelector("#campo");
  const enviar = () => numerico ? responderNumero(campo.value) : responderTexto(campo.value);
  div.querySelector("#btn-comprobar").addEventListener("click", enviar);
  campo.addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); enviar(); } });
  setTimeout(() => campo.focus(), 60);
}

function pintarOrdenar(zona, q){
  const wrap = document.createElement("div");
  wrap.innerHTML = `<div class="constructor" id="constructor"></div>
                    <div class="banco" id="banco"></div>
                    <div style="margin-top:18px"><button class="btn" id="btn-comprobar">Comprobar</button></div>`;
  zona.appendChild(wrap);

  const banco = wrap.querySelector("#banco");
  const cons  = wrap.querySelector("#constructor");

  q.tokens.forEach((t, i) => {
    const b = document.createElement("button");
    b.className = "ficha" + (q.pasos ? " paso" : "");
    b.textContent = t;
    b.dataset.i = i;
    b.addEventListener("click", () => {
      if(P.respondida) return;
      M.Sonido.clic();
      b.classList.add("usada");
      P.construidos.push({txt:t, ref:b});
      redibujarConstructor();
    });
    banco.appendChild(b);
  });

  function redibujarConstructor(){
    cons.innerHTML = "";
    P.construidos.forEach((c, i) => {
      const f = document.createElement("button");
      f.className = "ficha" + (q.pasos ? " paso" : "");
      f.textContent = (q.pasos ? (i+1)+". " : "") + c.txt;
      f.addEventListener("click", () => {
        if(P.respondida) return;
        c.ref.classList.remove("usada");
        P.construidos.splice(i,1);
        redibujarConstructor();
      });
      cons.appendChild(f);
    });
  }

  wrap.querySelector("#btn-comprobar").addEventListener("click", () => responderOrden());
}

/* ---------- cronómetro ---------- */
function arrancarCrono(){
  pararCrono();
  const seg = P.cfg.tiempo;
  const caja = $("#cronometro"), fill = $("#cronometro-fill");
  if(!seg){ caja.classList.add("oculto"); return; }
  caja.classList.remove("oculto");
  P.restante = seg;
  fill.style.width = "100%";
  fill.className = "";
  let avisado = false;
  P.timer = setInterval(() => {
    P.restante -= 0.1;
    const pc = Math.max(0, P.restante/seg*100);
    fill.style.width = pc + "%";
    if(pc < 45 && pc >= 20) fill.className = "aviso-t";
    else if(pc < 20){ fill.className = "urgente"; if(!avisado && pc>0){ avisado = true; } }
    if(P.restante <= 0){ pararCrono(); tiempoAgotado(); }
  }, 100);
}

function pararCrono(){ if(P && P.timer){ clearInterval(P.timer); P.timer = null; } }

function tiempoAgotado(){
  if(P.respondida) return;
  resolver(false, "⏰ ¡Se acabó el tiempo!");
}

/* ---------- respuestas ---------- */
function responderOpcion(i){
  if(P.respondida) return;
  const q = P.pregunta;
  const acierto = (i === q.ok);
  const botones = $$("#zona-respuesta .op, #zona-respuesta .celda");
  botones.forEach((b, k) => {
    b.disabled = true;
    if(k === q.ok) b.classList.add("correcta");
    else if(k === i) b.classList.add("incorrecta");
  });
  resolver(acierto);
}

function responderTexto(txt){
  if(P.respondida) return;
  const q = P.pregunta;
  const dado = M.normalizar(txt);
  const validas = [q.respuesta].concat(q.alternativas||[]).map(M.normalizar);
  const acierto = validas.includes(dado) && dado !== "";
  const campo = $("#campo");
  if(campo){ campo.disabled = true; campo.classList.add(acierto ? "correcta":"incorrecta"); }
  const btn = $("#btn-comprobar"); if(btn) btn.disabled = true;
  resolver(acierto, acierto ? null : `Escribiste «${txt || "—"}». La respuesta era <b>${q.respuesta}</b>.`);
}

function responderNumero(txt){
  if(P.respondida) return;
  const q = P.pregunta;
  const limpio = (txt||"").toString().replace(/\s/g,"").replace("%","").replace(",",".");
  const v = parseFloat(limpio);
  const tol = Math.max(Math.abs(q.valor) * (q.tolRel||.005), Math.pow(10, -(q.dec||4)) * 1.2);
  const acierto = !isNaN(v) && Math.abs(v - q.valor) <= tol;
  const campo = $("#campo");
  if(campo){ campo.disabled = true; campo.classList.add(acierto ? "correcta":"incorrecta"); }
  const btn = $("#btn-comprobar"); if(btn) btn.disabled = true;
  const exacto = q.valor.toLocaleString("es-CL", {maximumFractionDigits:q.dec||4});
  resolver(acierto, acierto ? `Valor exacto: <b>${exacto}</b>` : `Tu respuesta: ${isNaN(v)?"—":limpio}. El valor correcto es <b>${exacto}</b>.`);
}

function responderOrden(){
  if(P.respondida) return;
  const q = P.pregunta;
  const dado = P.construidos.map(c => c.txt).join(" ");
  const acierto = (q.soluciones||[]).some(s => M.normalizar(s) === M.normalizar(dado));
  const cons = $("#constructor");
  if(cons) cons.classList.add(acierto ? "correcta" : "incorrecta");
  $$("#zona-respuesta .ficha").forEach(f => f.disabled = true);
  const btn = $("#btn-comprobar"); if(btn) btn.disabled = true;
  resolver(acierto, acierto ? null : (P.construidos.length ? `Tu orden: «${dado}»` : "No colocaste ninguna pieza."));
}

/* ---------- resolución común ---------- */
function resolver(acierto, extra){
  P.respondida = true;
  pararCrono();
  const q = P.pregunta;

  M.registrarItem(q.id, acierto, q.etiqueta || q.id, q.juego || P.juegoId);

  let ganados = 0;
  if(acierto){
    P.aciertos++;
    P.combo++;
    if(P.combo > P.mejorCombo) P.mejorCombo = P.combo;
    const bonoTiempo = P.cfg.tiempo ? (1 + 0.5 * Math.max(0, P.restante) / P.cfg.tiempo) : 1;
    ganados = P.cfg.xpBase * multiplicador() * bonoTiempo;
    P.puntos += ganados;
    M.Sonido.bien(P.combo);
    if(P.combo === 5)  brindis("🔥 ¡Racha de 5! Multiplicador ×1,5");
    if(P.combo === 10) brindis("⚡ ¡Racha de 10! Multiplicador al máximo ×2");
  }else{
    P.combo = 0;
    P.vidas--;
    M.Sonido.mal();
    $("#zona-pregunta").classList.add("sacude");
    setTimeout(() => $("#zona-pregunta").classList.remove("sacude"), 400);
  }

  P.idx++;
  pintarHUD();

  const fb = $("#feedback");
  fb.className = "feedback " + (acierto ? "bien" : "mal");
  $("#feedback-cabecera").innerHTML = acierto
    ? `✅ ¡Correcto!  <span style="color:var(--oro);font-size:.8em">+${Math.round(ganados)} pts</span>` +
      (P.combo > 1 ? ` <span style="color:var(--texto-2);font-size:.7em">· racha ${P.combo}</span>` : "")
    : `❌ ${extra && extra.startsWith("⏰") ? extra : "No era esa"}` +
      (P.vidas > 0 ? ` <span style="color:var(--texto-2);font-size:.7em">· te quedan ${P.vidas} ${P.vidas===1?"vida":"vidas"}</span>`
                   : ` <span style="color:var(--mal);font-size:.7em">· sin vidas</span>`);

  let nota = q.nota || "";
  if(extra && !extra.startsWith("⏰")) nota = `<span style="color:var(--texto)">${extra}</span><br>` + nota;
  $("#feedback-nota").innerHTML = nota;

  $("#btn-siguiente").textContent = (P.idx >= P.total || P.vidas <= 0) ? "Ver resultado →" : "Siguiente →";
  fb.classList.remove("oculto");
  setTimeout(() => $("#btn-siguiente").focus(), 50);
}

/* =====================================================================
   FIN DE BATALLA
   ===================================================================== */
function terminar(){
  pararCrono();
  const gano = P.vidas > 0;
  const precision = P.idx ? Math.round(P.aciertos / P.idx * 100) : 0;
  const perfecto = gano && P.aciertos === P.total;

  let estrellas = 0;
  if(gano){
    estrellas = 1;
    if(precision >= 85) estrellas = 2;
    if(perfecto) estrellas = 3;
  }

  let medalla = null;
  if(gano) medalla = perfecto ? "oro" : (precision >= 85 ? "plata" : "bronce");

  const xp = Math.round(P.puntos);
  const subio = M.sumarXP(xp);
  M.registrarPartida(P.aciertos, P.idx, P.mejorCombo);
  const rachaNueva = M.marcarDia();

  const logros = [];
  if(P.perso){
    /* Las medallas y los récords siguen siendo de los tres niveles de siempre:
       si contaran aquí, bastaría con pedir 10 vidas y sin cronómetro para
       llenar la vitrina de oros. El XP sí cuenta, que es lo que se suda. */
    logros.push(`⚙️ Batalla a tu medida: <b>${P.total} preguntas</b> · ${P.cfg.vidas} ${P.cfg.vidas===1?"vida":"vidas"} · ` +
                (P.cfg.tiempo ? `${P.cfg.tiempo} s por pregunta` : "sin cronómetro"));
  }
  if(!P.esRepaso && !P.perso){
    const mejorada = M.registrarMedalla(P.juegoId, P.nivel, medalla);
    if(mejorada) logros.push(`${M.ICONO_MED[medalla]} Nueva medalla de <b>${medalla}</b> en este juego y nivel`);
    if(M.registrarRecord(P.juegoId, P.nivel, xp)) logros.push(`📈 ¡Nuevo récord personal: <b>${xp} puntos</b>!`);
  }
  if(rachaNueva) logros.push(`🔥 Racha diaria: <b>${M.estado.racha} ${M.estado.racha===1?"día":"días"} seguidos</b>`);
  if(subio) logros.push(`${subio.icono} ¡Subiste a rango <b>${subio.nombre}</b>!`);
  if(perfecto) logros.push(`💎 Batalla <b>perfecta</b>: ni un solo fallo`);
  if(P.mejorCombo >= 8) logros.push(`⚡ Racha máxima de <b>${P.mejorCombo}</b> aciertos seguidos`);
  M.guardar();

  $("#fin-estrellas").innerHTML =
    [1,2,3].map(i => `<span class="${i<=estrellas?"":"apagada"}">★</span>`).join("");
  $("#fin-titulo").textContent = perfecto ? "¡Batalla perfecta!" : gano ? "¡Victoria!" : "Derrota";
  $("#fin-sub").innerHTML = gano
    ? (perfecto ? "Sin un solo error. Esto ya lo tienes dominado." : "Batalla ganada. Sigue apretando.")
    : "Te quedaste sin vidas. Revisa la explicación de cada fallo y vuelve a entrar.";
  $("#fin-aciertos").textContent = `${P.aciertos}/${P.idx}`;
  $("#fin-precision").textContent = precision + "%";
  $("#fin-combo").textContent = P.mejorCombo;
  $("#fin-xp").textContent = "+" + xp;

  $("#fin-logros").innerHTML = logros.map(l => `<div class="logro">${l}</div>`).join("");

  if(gano) M.Sonido.victoria(); else M.Sonido.derrota();
  if(subio) setTimeout(() => M.Sonido.subirRango(), 700);

  pintarCabecera();
  ir("pantalla-fin");
}

/* =====================================================================
   PERFIL
   ===================================================================== */
function totalApuntes(){
  return Juegos.MUNDOS.reduce((s,m) => s + Estudio.progresoMundo(m.id).total, 0);
}

function pintarPerfil(){
  const E = M.estado;
  const prec = E.totalPreguntas ? Math.round(E.totalAciertos/E.totalPreguntas*100) : 0;
  $("#perfil-resumen").innerHTML = `
    <div class="res-caja"><b>${E.totalPartidas}</b><small>batallas</small></div>
    <div class="res-caja"><b>${E.totalPreguntas}</b><small>preguntas</small></div>
    <div class="res-caja"><b>${prec}%</b><small>precisión global</small></div>
    <div class="res-caja"><b>${E.mejorCombo}</b><small>mejor racha</small></div>
    <div class="res-caja destacada"><b>${E.xp.toLocaleString("es-CL")}</b><small>XP total</small></div>
    <div class="res-caja"><b>🔥 ${E.racha}</b><small>días seguidos</small></div>
    <div class="res-caja"><b>📚 ${M.contarLeidos()}/${totalApuntes()}</b><small>apuntes repasados</small></div>
    <div class="res-caja"><b>⚗️ ${Especiales.progresoQuimica().hechos}/${Especiales.progresoQuimica().total}</b><small>elementos dominados</small></div>
    <div class="res-caja"><b>🌍 ${Especiales.progresoGeo().hechos}/${Especiales.progresoGeo().total}</b><small>países dominados</small></div>`;

  /* vitrina */
  const vit = document.createElement("div");
  vit.className = "vitrina";
  let alguna = false;
  Juegos.JUEGOS.forEach(j => {
    const meds = [1,2,3].map(n => {
      const m = M.medallaDe(j.id, n);
      return m ? M.ICONO_MED[m] : "○";
    });
    if(meds.some(m => m !== "○")) alguna = true;
    const el = document.createElement("div");
    el.className = "vit";
    el.innerHTML = `<span style="font-size:18px">${j.emo}</span>
      <div style="flex:1"><div>${j.nombre}</div>
      <div class="meds" style="opacity:.9">${meds.join(" ")}</div></div>`;
    vit.appendChild(el);
  });
  $("#perfil-medallas").innerHTML = "";
  $("#perfil-medallas").appendChild(vit);
  if(!alguna){
    const p = document.createElement("p");
    p.className = "vacio";
    p.style.marginTop = "10px";
    p.textContent = "Todavía no tienes medallas. Gana una batalla en cualquier juego y nivel para estrenar la vitrina.";
    $("#perfil-medallas").appendChild(p);
  }

  /* flojos */
  const flojos = M.itemsFlojos().slice(0, 20);
  const cont = $("#perfil-flojos");
  if(!flojos.length){
    cont.innerHTML = `<p class="vacio">Nada pendiente por ahora. Cuando falles algo, aparecerá aquí y el juego te lo repetirá más seguido.</p>`;
  }else{
    cont.innerHTML = flojos.map(f => {
      const j = Juegos.porId(f.ju);
      return `<div class="flojo">
        <span>${j ? j.emo+" " : ""}${f.et}</span>
        <span class="marca-f">${f.f} ${f.f===1?"fallo":"fallos"} · ${f.a} ${f.a===1?"acierto":"aciertos"}</span>
      </div>`;
    }).join("");
  }

  ir("pantalla-perfil");
}

/* =====================================================================
   NIVEL PERSONALIZADO
   Vidas, tiempo y número de preguntas los pone él. El mismo diálogo sirve
   para los 32 juegos y para los dos tableros:
     · juego   → una batalla normal con esas reglas. El tope de preguntas
                 es 40, salvo geografía (197 países) y química (118).
     · tablero → una "expedición": las mismas 3 preguntas por casilla de
                 siempre, pero encadenando N casillas con vidas y reloj.
                 El tope son los elementos o los países que hay.
   ===================================================================== */
let perso = null;          // {D:destino, cfg:{base,preguntas,vidas,tiempo}}

const PRESETS = [
  {nombre:"🏃 Maratón",       hacer:(c,t) => ({base:c.base, preguntas:Math.min(t,30), vidas:10, tiempo:0})},
  {nombre:"⚡ Relámpago",     hacer:(c,t) => ({base:c.base, preguntas:Math.min(t,15), vidas:3,  tiempo:8})},
  {nombre:"💀 Muerte súbita", hacer:(c,t) => ({base:c.base, preguntas:Math.min(t,20), vidas:1,  tiempo:12})},
  {nombre:"🎯 Banco entero",  hacer:(c,t) => ({base:c.base, preguntas:t, vidas:10, tiempo:0})}
];

/* en los tableros se escribe la respuesta a mano, así que los relojes son
   más largos y los atajos cuentan casillas, no preguntas sueltas */
const PRESETS_TABLERO = [
  {nombre:"🏃 Maratón",        hacer:(c,t) => ({base:c.base, preguntas:Math.min(t,25), vidas:10, tiempo:0})},
  {nombre:"⚡ Relámpago",      hacer:(c,t) => ({base:c.base, preguntas:Math.min(t,12), vidas:3,  tiempo:20})},
  {nombre:"💀 Muerte súbita",  hacer:(c,t) => ({base:c.base, preguntas:Math.min(t,20), vidas:1,  tiempo:30})},
  {nombre:"🎯 Tablero entero", hacer:(c,t) => ({base:c.base, preguntas:t, vidas:10, tiempo:0})}
];

const TABLEROS = {
  qu:{emo:"⚗️", nombre:"Tabla periódica", unidad:"Elementos", uno:"elemento", cosas:"elementos de la tabla",
      pasos:"nombre, número atómico y peso"},
  ge:{emo:"🌍", nombre:"Atlas del mundo",  unidad:"Países",    uno:"país",     cosas:"países del mapa",
      pasos:"qué país es, su capital y su bandera"}
};

/* por qué esos mundos pasan de 40 */
const TOPE_PORQUE = {
  geografia: ": uno por cada país del mundo",
  quimica:   ": uno por cada elemento de la tabla"
};

/* `ref` es el id de un juego, o "qu"/"ge" para los tableros */
function destinoPerso(ref){
  if(TABLEROS[ref]){
    return Object.assign({tablero:ref, tope:Especiales.totalCasillas(ref)}, TABLEROS[ref]);
  }
  const j = Juegos.porId(ref);
  if(!j) return null;
  return {juego:j.id, mundo:j.mundo, emo:j.emo, nombre:j.nombre,
          unidad:"Preguntas", tope:Juegos.topePreguntas(j.id)};
}

function topeActual(){ return perso.D.tope; }

function abrirPerso(ref){
  const D = destinoPerso(ref);
  if(!D) return;
  perso = {D, cfg: M.limpiarPerso(M.ajustePerso(), D.tope)};
  $("#perso-juego").innerHTML = D.tablero
    ? `${D.emo} <b>${D.nombre}</b> — una expedición con tus reglas.`
    : `${D.emo} <b>${D.nombre}</b> — tú pones las reglas.`;
  pintarPerso();
  $("#perso").classList.remove("oculto");
  $("#perso .modal-caja").scrollTop = 0;
  /* sin preventScroll, en el móvil el diálogo se abre ya desplazado hasta el
     botón de empezar y no se ve ni el título */
  setTimeout(() => $("#perso-empezar").focus({preventScroll:true}), 60);
}

function cerrarPerso(){
  $("#perso").classList.add("oculto");
  perso = null;
}

function txtTiempo(s){ return s ? s + " s" : "sin límite"; }

function pintarPerso(){
  const c = perso.cfg, D = perso.D, tope = topeActual();
  if(c.preguntas > tope) c.preguntas = tope;

  /* dificultad base — en los tableros no existe: las tres preguntas de cada
     casilla son siempre las mismas y se escriben a mano */
  $("#perso-campo-base").classList.toggle("oculto", !!D.tablero);
  const base = $("#perso-base");
  base.innerHTML = [1,2,3].map(n =>
    `<button class="chip ${n===c.base?"activo":""}" data-base="${n}">${M.NIVELES[n].icono} ${M.NIVELES[n].nombre}</button>`
  ).join("");
  base.querySelectorAll("[data-base]").forEach(b => b.addEventListener("click", () => {
    M.Sonido.clic();
    c.base = +b.dataset.base;
    pintarPerso();
  }));
  $("#perso-base-nota").textContent =
    `Marca de qué preguntas se tira y cuántas opciones tiene cada una (${M.NIVELES[c.base].opciones}). ` +
    `También manda en los puntos: ${M.NIVELES[c.base].xpBase} XP base por acierto.`;

  /* deslizadores */
  const sp = $("#perso-preguntas"), sv = $("#perso-vidas"), st = $("#perso-tiempo");
  sp.max = tope;  sp.value = c.preguntas;
  sv.max = M.LIMITES.vidas.max; sv.value = c.vidas;
  st.max = M.LIMITES.tiempo.max; st.value = c.tiempo;
  $("#perso-preguntas-tit").textContent = D.unidad;
  $("#perso-preguntas-val").textContent = c.preguntas;
  $("#perso-vidas-val").textContent = c.vidas;
  $("#perso-tiempo-val").textContent = txtTiempo(c.tiempo);

  /* de cuánto material dispone */
  const notaP = $("#perso-preguntas-nota");
  if(D.tablero){
    const pend = D.tope - (D.tablero === "qu" ? Especiales.progresoQuimica() : Especiales.progresoGeo()).hechos;
    notaP.textContent = `Máximo ${D.tope}: todos los ${D.cosas}. Cada ${D.uno} son 3 preguntas ` +
      `(${D.pasos}) y salen primero los que te faltan por conquistar: ahora mismo, ${pend}.`;
    notaP.className = "";
  }else{
    const banco = Juegos.tamBanco(D.juego, c.base);
    if(c.preguntas > banco && banco <= tope){
      notaP.textContent = `⚠️ Este juego sabe hacer unas ${banco} preguntas distintas en ${M.NIVELES[c.base].nombre.toLowerCase()}: ` +
                          `a partir de ahí alguna se repetirá. Máximo ${tope}.`;
      notaP.className = "aviso-banco";
    }else{
      notaP.textContent = `Máximo ${tope} preguntas por batalla${TOPE_PORQUE[D.mundo] || ""}.`;
      notaP.className = "";
    }
  }

  $("#perso-vidas-nota").textContent = c.vidas === 1
    ? (D.tablero ? "Una sola: el primer fallo acaba la expedición." : "Una sola: el primer fallo acaba la batalla.")
    : D.tablero
      ? `Fallas ${c.vidas} veces y la expedición termina. Fuera de aquí, el tablero no tiene vidas.`
      : `Fallas ${c.vidas} veces y se acabó. Los tres niveles de siempre dan 5, 3 y 2.`;

  $("#perso-tiempo-nota").textContent = c.tiempo
    ? (D.tablero ? "Ojo: aquí las respuestas se escriben a mano, y el reloj corre en cada una de las 3 preguntas."
                 : "Con cronómetro, responder rápido suma hasta un 50 % más de puntos.")
    : "Sin cronómetro: piensas lo que haga falta.";

  /* atajos */
  const lista = D.tablero ? PRESETS_TABLERO : PRESETS;
  const pre = $("#perso-presets");
  pre.innerHTML = lista.map((p,i) => `<button class="chip" data-preset="${i}">${p.nombre}</button>`).join("");
  pre.querySelectorAll("[data-preset]").forEach(b => b.addEventListener("click", () => {
    M.Sonido.clic();
    perso.cfg = M.limpiarPerso(lista[+b.dataset.preset].hacer(perso.cfg, topeActual()), topeActual());
    pintarPerso();
  }));

  const reglas = `${c.vidas} ${c.vidas===1?"vida":"vidas"} · ` +
                 `${c.tiempo ? c.tiempo+" s por pregunta" : "sin cronómetro"}.`;
  $("#perso-resumen").innerHTML = D.tablero
    ? `<b>${D.emo} ${c.preguntas} ${c.preguntas===1 ? D.uno : D.unidad.toLowerCase()}</b> seguidos · ${reglas}<br>` +
      `<small style="color:var(--texto-2)">Cada casilla que aciertes entera se conquista y suma ${M.XP_CASILLA} XP, como al tocarla a mano.</small>`
    : `<b>${M.NIVELES[c.base].icono} ${M.NIVELES[c.base].nombre}</b> · ${c.preguntas} preguntas · ${reglas}<br>` +
      `<small style="color:var(--texto-2)">Suma XP y cuenta para la racha, pero las medallas y los récords se ganan solo en los tres niveles de siempre.</small>`;
}

["#perso-preguntas","#perso-vidas","#perso-tiempo"].forEach(sel => {
  $(sel).addEventListener("input", e => {
    if(!perso) return;
    perso.cfg[sel.replace("#perso-","")] = +e.target.value;
    pintarPerso();
  });
});

$("#perso-empezar").addEventListener("click", () => {
  if(!perso) return;
  const D = perso.D;
  const cfg = M.guardarPerso(M.limpiarPerso(perso.cfg, topeActual()));
  M.Sonido.clic();
  cerrarPerso();
  if(D.tablero) Especiales.expedicion(D.tablero, {casillas:cfg.preguntas, vidas:cfg.vidas, tiempo:cfg.tiempo});
  else empezar(D.juego, cfg.base, false, cfg);
});

$("#perso-cerrar").addEventListener("click", () => { M.Sonido.clic(); cerrarPerso(); });
$("#perso-cancelar").addEventListener("click", () => { M.Sonido.clic(); cerrarPerso(); });
$("#perso").addEventListener("click", e => { if(e.target.id === "perso") cerrarPerso(); });

/* =====================================================================
   EVENTOS GLOBALES
   ===================================================================== */
$("#btn-siguiente").addEventListener("click", () => {
  $("#feedback").classList.add("oculto");
  siguientePregunta();
});

$("#btn-salir").addEventListener("click", () => {
  if(P && P.idx > 0 && P.idx < P.total){
    if(!confirm("¿Abandonar la batalla? Perderás los puntos de esta ronda.")) return;
  }
  pararCrono();
  pintarHub();
  ir("pantalla-inicio");
});

$("#btn-otra").addEventListener("click", () => {
  M.Sonido.clic();
  empezar(P.juegoId, P.nivel, P.esRepaso, P.perso);
});

$("#btn-volver").addEventListener("click", () => { pintarHub(); ir("pantalla-inicio"); });
$("#ir-inicio").addEventListener("click", () => { pararCrono(); volverAlHub(); });
$("#btn-perfil").addEventListener("click", () => { pararCrono(); pintarPerfil(); });
$("#btn-perfil-volver").addEventListener("click", () => { pintarHub(); ir("pantalla-inicio"); });

/* ---------- modo estudio ---------- */
function volverAlHub(mundoId){
  Especiales.abandonar();          // si había una expedición en marcha, se corta aquí
  pintarHub();
  ir("pantalla-inicio");
  if(mundoId){
    const dest = document.getElementById("mundo-" + mundoId);
    if(dest) setTimeout(() => dest.scrollIntoView({behavior:"smooth", block:"start"}), 60);
  }
}

Estudio.init({
  ir,
  brindis,
  pintarCabecera,
  volverAlHub: () => { M.Sonido.clic(); volverAlHub(); },
  jugarMundo: mundoId => volverAlHub(mundoId)
});
Estudio.conectar();

Especiales.init({
  ir,
  brindis,
  pintarCabecera,
  volverAlHub: () => { M.Sonido.clic(); volverAlHub(); },
  abrirPerso                                   // el botón "otra expedición" del final
});
Especiales.conectar();

Cuadernos.init({
  ir,
  brindis,
  pintarCabecera,
  volverAlHub: () => { M.Sonido.clic(); volverAlHub(); }
});
Cuadernos.conectar();

$("#btn-estudiar").addEventListener("click", () => { pararCrono(); M.Sonido.clic(); Estudio.pintarIndice(); });
$("#btn-ir-estudio").addEventListener("click", () => { M.Sonido.clic(); Estudio.pintarIndice(); });

$("#btn-ir-cuadernos").addEventListener("click", () => { pararCrono(); M.Sonido.clic(); Cuadernos.pintar(); });
$("#btn-estudio-cuadernos").addEventListener("click", () => { M.Sonido.clic(); Cuadernos.pintar(); });

$("#btn-sonido").addEventListener("click", () => {
  const on = M.alternarSonido();
  $("#btn-sonido").textContent = on ? "🔊" : "🔇";
  if(on) M.Sonido.bien(0);
});

$("#btn-repaso").addEventListener("click", () => {
  M.Sonido.clic();
  empezar("repaso", 2, true);
});

/* ---------- copia del progreso entre dispositivos ---------- */
function avisoCopia(txt, mal){
  const p = $("#copia-aviso");
  p.textContent = txt;
  p.className = "copia-aviso " + (mal ? "mal" : "bien");
}

$("#btn-exportar").addEventListener("click", () => {
  M.Sonido.clic();
  const hoy = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(new Blob([M.exportar()], {type:"application/json"}));
  const a = document.createElement("a");
  a.href = url;
  a.download = `la-arena-${hoy}.json`;
  a.click();
  /* el objeto URL se libera después: si se revoca en el acto, algunos
     navegadores móviles cancelan la descarga a medias */
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  avisoCopia(`Copia guardada como la-arena-${hoy}.json. Ábrela en el otro dispositivo con "Restaurar copia".`);
});

$("#btn-importar").addEventListener("click", () => { M.Sonido.clic(); $("#campo-copia").click(); });

$("#campo-copia").addEventListener("change", e => {
  const f = e.target.files[0];
  if(!f) return;
  const lector = new FileReader();
  lector.onload = () => {
    const r = M.importar(lector.result);
    avisoCopia(r.msg, !r.ok);
    if(r.ok){
      M.Sonido.victoria();
      pintarCabecera();
      pintarPerfil();             // rellena resumen, medallas y flojos; no toca este aviso
      avisoCopia(r.msg);
    }else M.Sonido.mal();
  };
  lector.onerror = () => avisoCopia("No se pudo leer el archivo.", true);
  lector.readAsText(f);
  e.target.value = "";            // así se puede volver a elegir el mismo archivo
});

$("#btn-borrar").addEventListener("click", () => {
  if(confirm("Esto borra XP, medallas, récords y racha. No se puede deshacer. ¿Seguro?")){
    M.borrarTodo();
    pintarHub();
    ir("pantalla-inicio");
    brindis("Progreso borrado. Empiezas de cero.");
  }
});

/* teclado */
document.addEventListener("keydown", e => {
  const enJuego = $("#pantalla-juego").classList.contains("activa");

  /* el diálogo del nivel a medida se come las teclas mientras está abierto */
  if(perso){
    if(e.key === "Escape"){ e.preventDefault(); cerrarPerso(); }
    else if(e.key === "Enter"){
      /* Enter arranca la batalla salvo que el foco esté en otro botón, que
         entonces lo que quiere es pulsar ese */
      const f = document.activeElement;
      if(!f || f.tagName !== "BUTTON" || f.id === "perso-empezar"){
        e.preventDefault();
        $("#perso-empezar").click();
      }
    }
    return;
  }

  if(e.key === "Escape"){
    if(enJuego){ pararCrono(); volverAlHub(); }
    else if($("#pantalla-lectura").classList.contains("activa")) Estudio.volverAlIndice();
    else if($("#pantalla-estudio").classList.contains("activa")) volverAlHub();
    else if($("#pantalla-cuadernos").classList.contains("activa")) volverAlHub();
    else if($("#pantalla-perfil").classList.contains("activa")) volverAlHub();
    else if($("#pantalla-tabla").classList.contains("activa")) volverAlHub();
    else if($("#pantalla-atlas").classList.contains("activa")) volverAlHub();
    return;
  }
  if(!enJuego) return;

  if(!$("#feedback").classList.contains("oculto")){
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      $("#feedback").classList.add("oculto");
      siguientePregunta();
    }
    return;
  }

  if(document.activeElement && document.activeElement.tagName === "INPUT") return;

  if(/^[1-9]$/.test(e.key)){
    const i = +e.key - 1;
    /* en "ordenar" solo el banco responde a las teclas, no las piezas ya colocadas */
    const botones = $$("#zona-respuesta .op, #zona-respuesta .celda, #banco .ficha");
    if(botones[i] && !botones[i].disabled) botones[i].click();
  }
  if(e.key === "Enter"){
    const b = $("#btn-comprobar");
    if(b && !b.disabled){ e.preventDefault(); b.click(); }
  }
});

/* aviso si no hay almacenamiento */
if(!M.almacenOK){
  setTimeout(() => brindis("⚠️ Tu navegador bloquea el guardado local: el progreso no se conservará al cerrar.", 6000), 900);
}

/* arranque */
pintarHub();
ir("pantalla-inicio");

})();
