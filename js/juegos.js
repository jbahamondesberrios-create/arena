/* ============================================================
   JUEGOS — un generador de preguntas por juego
   Cada gen(nivel) devuelve un objeto pregunta que app.js sabe pintar.
   ============================================================ */

const Juegos = (() => {

const M = Motor;
const mez = M.mezclar, eleg = M.elegir;

/* ---------- utilidades ---------- */

/* Filtra por nivel: 1 → solo n≤1 · 2 → n≤2 · 3 → todo
   `min` es el tamaño mínimo aceptable del banco: si el filtro deja menos,
   se abre a todo el pool. Sin esto, los juegos con pocos ítems fáciles
   acaban repitiendo la misma pregunta dentro de una sola ronda. */
function porNivel(arr, nivel, min){
  const f = arr.filter(x => (x.n||1) <= nivel);
  return f.length >= (min || 4) ? f : arr;
}

/* Baraja opciones y devuelve {opciones, ok} */
function barajarOps(correcta, distr){
  const ops = mez([correcta, ...distr]);
  return {opciones: ops, ok: ops.indexOf(correcta)};
}

function nOpciones(nivel){ return M.NIVELES[nivel].opciones; }

/* Función de distribución normal estándar (Abramowitz & Stegun 26.2.17) */
function N(x){
  if(x < 0) return 1 - N(-x);
  const b1=.319381530,b2=-.356563782,b3=1.781477937,b4=-1.821255978,b5=1.330274429,
        p=.2316419,c=.39894228;
  const t = 1/(1+p*x);
  return 1 - c*Math.exp(-x*x/2)*t*(t*(t*(t*(t*b5+b4)+b3)+b2)+b1);
}

function red(x, d){ const f = Math.pow(10, d==null?4:d); return Math.round(x*f)/f; }
function fmt(x, d){ return red(x, d).toLocaleString("es-CL", {maximumFractionDigits: d==null?4:d}); }

/* Genera distractores numéricos plausibles alrededor de un valor */
function distrNum(v){
  const f = [1.25, .8, 1.5, .6, 2];
  return mez(f).slice(0,3).map(k => red(v*k, 4));
}

/* =====================================================================
   ALEMÁN
   ===================================================================== */

const A = () => window.ALEMAN;

/* --- 1. Der · Die · Das --- */
function deGenero(nivel){
  const pool = porNivel(A().sustantivos, nivel);
  const s = M.elegirPesado(pool, 1, x => "de-gen-"+x.w)[0];
  const ops = ["der","die","das"];
  return {
    id:"de-gen-"+s.w, juego:"de-genero", etiqueta:s.w,
    tipo:"opciones", cols:3,
    enunciado:`<span class="grande">${s.w}</span>`,
    sub:s.es,
    opciones:ops, ok:ops.indexOf(s.g),
    pista: nivel === 1 && s.pista ? "💡 " + s.pista : null,
    nota:`<b>${s.g} ${s.w}</b> — ${s.es}.` + (s.pista ? ` <br>${s.pista}` : "") +
         `<br><i>Regla de oro: nunca aprendas un sustantivo solo. Memoriza siempre el artículo con él.</i>`
  };
}

/* --- 2. Conjugación relámpago --- */
function deConjug(nivel){
  const pool = porNivel(A().verbos, nivel);
  const v = M.elegirPesado(pool, 1, x => "de-verb-"+x.inf)[0];
  const i = Math.floor(Math.random()*6);
  const pr = A().pronombres[i];
  const correcta = v.f[i];
  const id = "de-conj-"+v.inf+"-"+i;

  const base = {
    id, juego:"de-conjug", etiqueta:`${pr} ${v.inf}`,
    enunciado:`<span class="clave">${pr}</span> + <i>${v.inf}</i>`,
    sub:`${v.es} — conjuga en presente`,
    nota:`<b>${pr} ${correcta}</b>. ` + (v.nota || "Terminaciones regulares: -e · -st · -t · -en · -t · -en.")
  };

  if(nivel === 3){
    return Object.assign(base, {tipo:"escribir", respuesta:correcta,
      alternativas:[correcta.replace(/ß/g,"ss")]});
  }

  /* distractores: otras formas del mismo verbo + formas de otro verbo parecido */
  let cand = v.f.filter(f => f !== correcta);
  const otro = eleg(A().verbos.filter(x => x.inf !== v.inf && (x.modal||false) === (v.modal||false)));
  cand = cand.concat(otro.f);
  cand = [...new Set(cand)].filter(f => f !== correcta);
  const {opciones, ok} = barajarOps(correcta, mez(cand).slice(0, nOpciones(nivel)-1));
  return Object.assign(base, {tipo:"opciones", opciones, ok});
}

/* --- 3. Vocabulario alemán --- */
function deVocab(nivel){
  const pool = porNivel(A().vocab, nivel);
  const v = M.elegirPesado(pool, 1, x => "de-voc-"+x.de)[0];
  const alDe = Math.random() < (nivel===1 ? .4 : .55);
  const id = "de-voc-"+v.de;

  /* escribir a mano solo si es una palabra suelta (o artículo + palabra):
     hacerte teclear una frase entera sería castigo, no entrenamiento */
  if(nivel === 3 && alDe && v.de.split(" ").length <= 2){
    return {
      id, juego:"de-vocab", etiqueta:v.de, tipo:"escribir",
      enunciado:`<span class="grande">${v.es}</span>`,
      sub:"escríbelo en alemán",
      respuesta:v.de, alternativas:[v.de.replace(/^(der|die|das)\s+/,"")],
      nota:`<b>${v.de}</b> = ${v.es}.` + (v.nota ? `<br>⚠️ ${v.nota}` : "")
    };
  }

  const correcta = alDe ? v.de : v.es;
  const distr = mez(pool.filter(x => x !== v)).slice(0, nOpciones(nivel)-1)
                 .map(x => alDe ? x.de : x.es);
  const {opciones, ok} = barajarOps(correcta, distr);
  return {
    id, juego:"de-vocab", etiqueta:v.de, tipo:"opciones",
    enunciado:`<span class="grande">${alDe ? v.es : v.de}</span>`,
    sub: alDe ? "¿cómo se dice en alemán?" : "¿qué significa?",
    opciones, ok,
    nota:`<b>${v.de}</b> = ${v.es}.` + (v.nota ? `<br>⚠️ ${v.nota}` : "")
  };
}

/* --- 4. Arma la frase --- */
function deFrase(nivel){
  const pool = porNivel(A().frases, nivel);
  const f = M.elegirPesado(pool, 1, x => "de-fr-"+x.sol)[0];
  let tokens = f.sol.split(" ");
  let barajado = mez(tokens);
  let guarda = 0;
  while(barajado.join(" ") === f.sol && guarda++ < 12) barajado = mez(tokens);
  return {
    id:"de-fr-"+f.sol, juego:"de-frase", etiqueta:f.sol, tipo:"ordenar",
    enunciado:`<span style="font-size:.78em">${f.es}</span>`,
    sub:"ordena las piezas para construir la frase alemana",
    tokens:barajado,
    soluciones:[f.sol].concat(f.alt||[]),
    nota:`<b>${f.sol}</b><br>${f.nota}`
  };
}

/* --- 5. Reglas y casos (gramática + participios generados) --- */
function deGramatica(nivel){
  /* 1 de cada 3 preguntas es un participio generado */
  if(Math.random() < .34){
    const pool = porNivel(A().partizip, nivel);
    const p = M.elegirPesado(pool, 1, x => "de-p2-"+x.inf)[0];
    const preguntaAux = Math.random() < .35;

    if(preguntaAux){
      const ops = ["haben","sein"];
      return {
        id:"de-aux-"+p.inf, juego:"de-gramatica", etiqueta:"aux "+p.inf, tipo:"opciones", cols:2,
        enunciado:`Ich ___ … <span class="clave">${p.p2}</span>`,
        sub:`¿<i>haben</i> o <i>sein</i>? — <i>${p.inf}</i> (${p.es})`,
        opciones:ops, ok:ops.indexOf(p.aux),
        nota:`<b>${p.aux === "sein" ? "sein" : "haben"}</b> + ${p.p2}. ` +
             (p.nota || "El 90 % de los verbos usan <i>haben</i>. <i>sein</i> solo con movimiento A→B, cambio de estado, o las excepciones sein/bleiben.")
      };
    }

    const distr = mez(A().partizip.filter(x => x.inf !== p.inf)).slice(0, nOpciones(nivel)-1).map(x => x.p2);
    /* trampa morfológica: el error típico para ese tipo de verbo */
    const trampa = p.sep ? p.p2.replace("ge","")            // separable sin el ge- infijo
                 : p.p2.startsWith("ge") ? p.p2.slice(2)    // regular sin ge-
                 : "ge"+p.p2;                               // -ieren/inseparable con ge- de más
    const cand = mez([...new Set(distr.concat(trampa))]).slice(0, nOpciones(nivel)-1);
    const {opciones, ok} = barajarOps(p.p2, cand);
    return {
      id:"de-p2-"+p.inf, juego:"de-gramatica", etiqueta:"Partizip "+p.inf, tipo:"opciones",
      enunciado:`Partizip II de <span class="clave">${p.inf}</span>`,
      sub:p.es,
      opciones, ok,
      nota:`<b>${p.p2}</b> (aux. <i>${p.aux}</i>). ` + (p.nota || "Regular: ge- + raíz + -t.")
    };
  }

  const pool = porNivel(A().gramatica, nivel);
  const g = M.elegirPesado(pool, 1, x => "de-gr-"+x.q)[0];
  const correcta = g.ops[g.ok];
  const distr = mez(g.ops.filter((_,i) => i !== g.ok)).slice(0, Math.max(1, nOpciones(nivel)-1));
  const {opciones, ok} = barajarOps(correcta, distr);
  return {
    id:"de-gr-"+g.q, juego:"de-gramatica", etiqueta:g.tema, tipo:"opciones",
    enunciado:g.q, sub:g.tema, opciones, ok, nota:g.nota
  };
}

/* =====================================================================
   ÁRABE
   ===================================================================== */

const R = () => window.ARABE;

/* --- 1. Caza la letra (rejilla tipo mapa) --- */
function arLetras(nivel){
  const todas = R().letras;
  const pool = porNivel(todas, nivel);
  const L = M.elegirPesado(pool, 1, x => "ar-let-"+x.ch)[0];
  const tam = nivel === 1 ? 6 : nivel === 2 ? 12 : 20;

  /* en difícil, priorizamos distractores de la MISMA familia visual */
  let cand = todas.filter(x => x.ch !== L.ch);
  if(nivel === 3){
    const fam = cand.filter(x => x.fam === L.fam);
    cand = mez(fam).concat(mez(cand.filter(x => x.fam !== L.fam)));
  }else{
    cand = mez(cand);
  }
  const otros = cand.slice(0, tam-1);
  const celdas = mez([L, ...otros]);

  const pregunta = nivel === 3
    ? `Encuentra la letra que suena <span class="clave">${L.son}</span>`
    : `Encuentra <span class="clave">${L.nombre}</span> — suena <span class="clave">${L.son}</span>`;

  return {
    id:"ar-let-"+L.ch, juego:"ar-letras", etiqueta:L.nombre, tipo:"celda",
    enunciado:pregunta,
    sub: nivel === 3 ? "" : L.desc,
    opciones:celdas.map(x => x.ch), ok:celdas.indexOf(L),
    cols: nivel === 1 ? 3 : nivel === 2 ? 4 : 5,
    ar:true,
    nota:`<span class="ar ar-grande">${L.ch}</span> <b>${L.nombre}</b> = ${L.son} · ${L.desc}` +
         `<br>Formas: inicial <span class="ar">${L.ini}</span> · medial <span class="ar">${L.med}</span> · final <span class="ar">${L.fin}</span>` +
         (L.conecta ? "" : "<br>⚠️ Es una de las 6 letras que <b>no se conectan</b> hacia adelante.")
  };
}

/* --- 2. Formas conectadas --- */
function arFormas(nivel){
  const pool = porNivel(R().letras, nivel);
  const L = M.elegirPesado(pool, 1, x => "ar-for-"+x.ch)[0];
  const posiciones = [
    {k:"ini", nom:"INICIAL", desc:"al principio de la palabra"},
    {k:"med", nom:"MEDIAL",  desc:"en medio, unida por ambos lados"},
    {k:"fin", nom:"FINAL",   desc:"al final, unida solo por la derecha"}
  ];
  const p = eleg(posiciones);
  const inversa = nivel === 3 && Math.random() < .5;

  if(inversa){
    /* dada la forma, ¿qué letra es? */
    const distr = mez(R().letras.filter(x => x.ch !== L.ch && x.fam === L.fam))
                    .concat(mez(R().letras.filter(x => x.ch !== L.ch && x.fam !== L.fam)))
                    .slice(0, nOpciones(nivel)-1).map(x => x.ch);
    const {opciones, ok} = barajarOps(L.ch, distr);
    return {
      id:"ar-forinv-"+L.ch+p.k, juego:"ar-formas", etiqueta:L.nombre+" "+p.nom, tipo:"opciones", cols:3, ar:true,
      enunciado:`<span class="ar ar-gigante">${L[p.k]}</span>`,
      sub:`esta es la forma ${p.nom.toLowerCase()} · ¿de qué letra?`,
      opciones, ok,
      nota:`Es <b>${L.nombre}</b> (${L.son}) en posición ${p.nom.toLowerCase()}. Aislada: <span class="ar">${L.ch}</span>`
    };
  }

  const distr = mez(R().letras.filter(x => x.ch !== L.ch)).slice(0, nOpciones(nivel)-1).map(x => x[p.k]);
  const {opciones, ok} = barajarOps(L[p.k], distr);
  return {
    id:"ar-for-"+L.ch+p.k, juego:"ar-formas", etiqueta:L.nombre+" "+p.nom, tipo:"opciones", cols:3, ar:true,
    enunciado:`<span class="ar ar-gigante">${L.ch}</span> <span style="font-size:.6em">${L.nombre}</span>`,
    sub:`¿cuál es su forma <b>${p.nom}</b>? (${p.desc})`,
    opciones, ok,
    nota:`<b>${L.nombre}</b> en ${p.nom.toLowerCase()}: <span class="ar ar-grande">${L[p.k]}</span>` +
         `<br>Aislada <span class="ar">${L.ch}</span> · inicial <span class="ar">${L.ini}</span> · medial <span class="ar">${L.med}</span> · final <span class="ar">${L.fin}</span>` +
         (L.conecta ? "" : "<br>⚠️ No se conecta hacia adelante: por eso inicial y aislada son iguales.")
  };
}

/* --- 3. Lectura vocalizada --- */
function arLectura(nivel){
  /* mezcla palabras vocalizadas con identificación de marcas */
  if(Math.random() < .25){
    const pool = porNivel(R().marcas, nivel);
    const m = M.elegirPesado(pool, 1, x => "ar-mar-"+x.nombre)[0];
    const distr = mez(R().marcas.filter(x => x !== m)).slice(0, nOpciones(nivel)-1).map(x => x.nombre);
    const {opciones, ok} = barajarOps(m.nombre, distr);
    return {
      id:"ar-mar-"+m.nombre, juego:"ar-lectura", etiqueta:m.nombre, tipo:"opciones",
      enunciado:`<span class="ar ar-gigante">${m.ch}</span>`,
      sub:"¿qué marca lleva esta letra?",
      opciones, ok,
      nota:`<b>${m.nombre}</b> → ${m.son}. ${m.desc}`
    };
  }

  const pool = porNivel(R().lectura, nivel);
  const w = M.elegirPesado(pool, 1, x => "ar-lec-"+x.ar)[0];
  const pideSignificado = Math.random() < .35;

  if(pideSignificado){
    const distr = mez(R().lectura.filter(x => x !== w)).slice(0, nOpciones(nivel)-1).map(x => x.es);
    const {opciones, ok} = barajarOps(w.es, distr);
    return {
      id:"ar-lecs-"+w.ar, juego:"ar-lectura", etiqueta:w.tr, tipo:"opciones",
      enunciado:`<span class="ar ar-gigante">${w.ar}</span>`,
      sub:"léela en voz alta (der → izq) y di qué significa",
      opciones, ok,
      nota:`<span class="ar ar-grande">${w.ar}</span> <b>${w.tr}</b> = ${w.es}.` + (w.nota ? `<br>💡 ${w.nota}` : "")
    };
  }

  /* transliteración, con distractores generados perturbando vocales */
  const perturbar = t => {
    const cambios = [[/a/,"i"],[/i/,"u"],[/u/,"a"],[/ā/,"a"],[/ī/,"i"],[/ū/,"u"],[/a/,"ā"]];
    for(const [de,a] of mez(cambios)){ if(de.test(t)) return t.replace(de, a); }
    return t + "a";
  };
  let cand = mez(R().lectura.filter(x => x !== w)).slice(0, Math.max(0, nOpciones(nivel)-3)).map(x => x.tr);
  cand = cand.concat([perturbar(w.tr), perturbar(perturbar(w.tr))]);
  cand = [...new Set(cand)].filter(x => x !== w.tr);
  /* si las perturbaciones colapsaron, rellenamos con otras palabras del pool */
  const relleno = mez(R().lectura.filter(x => x !== w).map(x => x.tr));
  for(const t of relleno){
    if(cand.length >= nOpciones(nivel)-1) break;
    if(t !== w.tr && !cand.includes(t)) cand.push(t);
  }
  cand = cand.slice(0, nOpciones(nivel)-1);
  const {opciones, ok} = barajarOps(w.tr, cand);
  return {
    id:"ar-lec-"+w.ar, juego:"ar-lectura", etiqueta:w.tr, tipo:"opciones",
    enunciado:`<span class="ar ar-gigante">${w.ar}</span>`,
    sub:"¿cómo se lee? (aplica cada marquita)",
    opciones, ok,
    nota:`<b>${w.tr}</b> = ${w.es}.` + (w.nota ? `<br>💡 ${w.nota}` : "")
  };
}

/* --- 4. Solar o lunar --- */
function arSolar(nivel){
  if(nivel === 3 && Math.random() < .4){
    /* dada una letra suelta, ¿solar o lunar? */
    const L = M.elegirPesado(R().letras, 1, x => "ar-sl-"+x.ch)[0];
    const ops = ["☀️ Solar (la ل se funde)","🌙 Lunar (la ل se pronuncia)"];
    return {
      id:"ar-sl-"+L.ch, juego:"ar-solar", etiqueta:L.nombre, tipo:"opciones", cols:2,
      enunciado:`<span class="ar ar-gigante">${L.ch}</span> <span style="font-size:.55em">${L.nombre}</span>`,
      sub:"¿es una letra solar o lunar?",
      opciones:ops, ok: L.solar ? 0 : 1,
      nota:`<b>${L.nombre}</b> es ${L.solar ? "☀️ <b>solar</b>: la ل no se pronuncia y la letra se dobla con shadda" : "🌙 <b>lunar</b>: la ل se pronuncia claramente"}.` +
           `<br>💡 Truco fonético: si la punta de la lengua toca cerca de donde se hace la 'l' → solar. Labios o garganta → lunar.`
    };
  }

  const pool = porNivel(R().articulo, nivel);
  const w = M.elegirPesado(pool, 1, x => "ar-art-"+x.ar)[0];

  /* la transliteración es siempre "prefijo-palabra": todo lo que sigue al primer
     guion es la palabra desnuda, con la que fabricamos la pronunciación errónea */
  const desnuda = w.tr.split("-").slice(1).join("-");
  const digrafo = /^(kh|gh|th|dh|sh)/.exec(desnuda);
  const inicial = digrafo ? digrafo[1] : desnuda[0];
  const falso = w.solar
      ? "al-" + desnuda                    // error: pronunciar la ل de una solar
      : "a" + inicial + "-" + desnuda;     // error: asimilar una lunar
  const distr = [falso];
  if(nOpciones(nivel) > 2){
    const otros = mez(R().articulo.filter(x => x !== w)).slice(0, nOpciones(nivel)-2).map(x => x.tr);
    distr.push(...otros);
  }
  const {opciones, ok} = barajarOps(w.tr, [...new Set(distr)].filter(x => x !== w.tr));
  return {
    id:"ar-art-"+w.ar, juego:"ar-solar", etiqueta:w.tr, tipo:"opciones",
    enunciado:`<span class="ar ar-gigante">${w.ar}</span>`,
    sub:"se escribe siempre igual… pero ¿cómo se PRONUNCIA?",
    opciones, ok,
    nota:`<b>${w.tr}</b> = ${w.es}. La <span class="ar">${w.ini}</span> es ${w.solar ? "☀️ <b>solar</b> → la ل enmudece y la consonante se dobla" : "🌙 <b>lunar</b> → la ل se pronuncia"}.` +
         (w.nota ? `<br>⚠️ ${w.nota}` : "")
  };
}

/* --- 5. Vocabulario árabe --- */
function arVocab(nivel){
  const usarFrase = Math.random() < .28;
  const pool = porNivel(usarFrase ? R().frases : R().vocab, nivel);
  const w = M.elegirPesado(pool, 1, x => "ar-voc-"+x.ar)[0];
  const alArabe = Math.random() < .45;
  const id = "ar-voc-"+w.ar;

  const correcta = alArabe ? w.ar : w.es;
  const distr = mez(pool.filter(x => x !== w)).slice(0, nOpciones(nivel)-1)
                 .map(x => alArabe ? x.ar : x.es);
  const {opciones, ok} = barajarOps(correcta, distr);

  return {
    id, juego:"ar-vocab", etiqueta:w.tr, tipo:"opciones", ar:alArabe,
    enunciado: alArabe
      ? `<span class="grande">${w.es}</span>`
      : `<span class="ar ar-gigante">${w.ar}</span>`,
    sub: alArabe ? "¿cómo se dice en árabe?" : (nivel === 1 ? `<i>${w.tr}</i> — ¿qué significa?` : "¿qué significa?"),
    opciones, ok,
    nota:`<span class="ar ar-grande">${w.ar}</span> <b>${w.tr}</b> = ${w.es}.` +
         (w.gen ? `<br>Género: <b>${w.gen === "f" ? "femenino" : "masculino"}</b>` : "")
  };
}

/* --- 6. Gramática y verbos árabes --- */
function arGramatica(nivel){
  const r = Math.random();

  /* conjugación de verbo en pasado */
  if(r < .3){
    const pool = porNivel(R().verbos, nivel);
    const v = M.elegirPesado(pool, 1, x => "ar-verb-"+x.base)[0];
    const i = Math.floor(Math.random()*8);
    const pr = R().pronombres[i];
    const correcta = v.f[i];
    const distr = mez(v.f.filter(f => f !== correcta)).slice(0, nOpciones(nivel)-1);
    const {opciones, ok} = barajarOps(correcta, distr);
    return {
      id:"ar-verb-"+v.base+i, juego:"ar-gramatica", etiqueta:`${v.tr} · ${pr.tr}`, tipo:"opciones", ar:true, cols:2,
      enunciado:`<span class="ar ar-grande">${pr.ar}</span> <span style="font-size:.55em">(${pr.es})</span> + <span class="ar ar-grande">${v.base}</span>`,
      sub:`«${v.es}» en pasado · raíz ${v.raiz}`,
      opciones, ok,
      nota:`<span class="ar ar-grande">${correcta}</span> <b>${v.ftr[i]}</b><br>La raíz no se toca: solo cambia la terminación <b>${pr.trSuf}</b>.` +
           (v.nota ? `<br>💡 ${v.nota}` : "")
    };
  }

  /* números */
  if(r < .45){
    const pool = R().numeros;
    const num = M.elegirPesado(pool, 1, x => "ar-num-"+x.n)[0];
    const modo = Math.random() < .5 ? "cifra" : "palabra";
    if(modo === "cifra"){
      const distr = mez(pool.filter(x => x !== num)).slice(0, nOpciones(nivel)-1).map(x => String(x.n));
      const {opciones, ok} = barajarOps(String(num.n), distr);
      return {
        id:"ar-numc-"+num.n, juego:"ar-gramatica", etiqueta:"cifra "+num.n, tipo:"opciones", cols:3,
        enunciado:`<span class="ar ar-gigante">${num.cifra}</span>`,
        sub:"¿qué número es? (las cifras se leen de izquierda a derecha)",
        opciones, ok,
        nota:`<b>${num.n}</b> = <span class="ar">${num.ar}</span> <i>${num.tr}</i>`
      };
    }
    const distr = mez(pool.filter(x => x !== num)).slice(0, nOpciones(nivel)-1).map(x => x.ar);
    const {opciones, ok} = barajarOps(num.ar, distr);
    return {
      id:"ar-nump-"+num.n, juego:"ar-gramatica", etiqueta:"número "+num.n, tipo:"opciones", ar:true, cols:2,
      enunciado:`<span class="grande">${num.n}</span>`,
      sub:"¿cómo se dice en árabe?",
      opciones, ok,
      nota:`<span class="ar ar-grande">${num.ar}</span> <b>${num.tr}</b> = ${num.n}`
    };
  }

  /* colores con concordancia */
  if(r < .58){
    const c = M.elegirPesado(R().colores, 1, x => "ar-col-"+x.es)[0];
    const fem = Math.random() < .5;
    const correcta = fem ? c.f : c.m;
    const distr = mez(R().colores.filter(x => x !== c)).slice(0, nOpciones(nivel)-2).map(x => fem ? x.f : x.m);
    distr.push(fem ? c.m : c.f);   // la trampa de concordancia
    const {opciones, ok} = barajarOps(correcta, [...new Set(distr)].filter(x=>x!==correcta));
    return {
      id:"ar-col-"+c.es+(fem?"f":"m"), juego:"ar-gramatica", etiqueta:c.es+(fem?" (f)":" (m)"), tipo:"opciones", ar:true, cols:2,
      enunciado:`<span class="grande">${c.es}</span>`,
      sub: fem ? "forma <b>femenina</b> (para سَيَّارَة, مَدْرَسَة…)" : "forma <b>masculina</b> (para بَيْت, قَلَم…)",
      opciones, ok,
      nota:`<span class="ar ar-grande">${correcta}</span> <b>${fem ? c.ftr : c.mtr}</b> = ${c.es} (${fem?"fem.":"masc."})` +
           `<br>💡 Los masculinos empiezan por <span class="ar">أَ</span> y los femeninos terminan en <span class="ar">ـَاء</span>.`
    };
  }

  /* género de un sustantivo */
  if(r < .7){
    const pool = porNivel(R().vocab.filter(x => x.gen), nivel);
    const w = M.elegirPesado(pool, 1, x => "ar-gen-"+x.ar)[0];
    const ops = ["Masculino","Femenino"];
    return {
      id:"ar-gen-"+w.ar, juego:"ar-gramatica", etiqueta:"género "+w.tr, tipo:"opciones", cols:2,
      enunciado:`<span class="ar ar-gigante">${w.ar}</span>`,
      sub:`<i>${w.tr}</i> — ${w.es}`,
      opciones:ops, ok: w.gen === "f" ? 1 : 0,
      nota:`<b>${w.tr}</b> es ${w.gen === "f" ? "<b>femenino</b>" : "<b>masculino</b>"}.` +
           `<br>💡 La ة final marca femenino. También son femeninas (sin ة) شَمْس، نَار، أَرْض، رِيح y las partes del cuerpo pares: يَد، عَيْن، أُذُن، رِجْل.`
    };
  }

  /* gramática estática */
  const pool = porNivel(R().gramatica, nivel);
  const g = M.elegirPesado(pool, 1, x => "ar-gr-"+x.q)[0];
  const correcta = g.ops[g.ok];
  const distr = mez(g.ops.filter((_,i) => i !== g.ok)).slice(0, Math.max(1, nOpciones(nivel)-1));
  const {opciones, ok} = barajarOps(correcta, distr);
  return {
    id:"ar-gr-"+g.q, juego:"ar-gramatica", etiqueta:g.tema, tipo:"opciones", ar:!!g.ar, cols: g.ar?2:1,
    enunciado:g.q, sub:g.tema, opciones, ok, nota:g.nota
  };
}

/* =====================================================================
   FINANZAS
   ===================================================================== */

const F = () => window.FINANZAS;

/* --- 1. Conceptos clave --- */
function fiConceptos(nivel){
  const pool = porNivel(F().conceptos, nivel);
  const c = M.elegirPesado(pool, 1, x => "fi-con-"+x.q)[0];
  const correcta = c.ops[c.ok];
  const distr = mez(c.ops.filter((_,i) => i !== c.ok)).slice(0, Math.max(1, nOpciones(nivel)-1));
  const {opciones, ok} = barajarOps(correcta, distr);
  return {
    id:"fi-con-"+c.q, juego:"fi-conceptos", etiqueta:c.cap, tipo:"opciones",
    enunciado:c.q, sub:c.cap, opciones, ok, nota:c.nota
  };
}

/* --- 2. Fórmula rota --- */
function fiFormulas(nivel){
  const pool = porNivel(F().formulas, nivel);
  const f = M.elegirPesado(pool, 1, x => "fi-for-"+x.q)[0];
  const correcta = f.ops[f.ok];
  const distr = mez(f.ops.filter((_,i) => i !== f.ok)).slice(0, Math.max(1, nOpciones(nivel)-1));
  const {opciones, ok} = barajarOps(correcta, distr);
  return {
    id:"fi-for-"+f.q, juego:"fi-formulas", etiqueta:"fórmula", tipo:"opciones",
    enunciado:f.q, sub:"completa el hueco", opciones, ok, nota:f.nota
  };
}

/* --- 3. Calculadora de no-arbitraje (problemas generados) --- */
const PROBLEMAS = {

1: [
  /* probabilidad neutral al riesgo */
  () => {
    const u = eleg([1.5, 2, 1.25, 1.6]), d = eleg([0.5, 0.8, 0.75, 0.625]);
    let r = eleg([0.25, 0.1, 0.05, 0.2]);
    if(!(d < 1+r && 1+r < u)) r = 0.25;
    const p = (1+r-d)/(u-d);
    return {
      id:"fi-cal-ptilde",
      enunciado:`Modelo binomial de una etapa: <span class="clave">u = ${u}</span>, <span class="clave">d = ${d}</span>, <span class="clave">r = ${(r*100).toFixed(0)}%</span>.<br>Calcula la probabilidad neutral al riesgo <b>p̃</b>.`,
      sub:"4 decimales · usa punto o coma decimal",
      valor:p, dec:4,
      nota:`p̃ = (1+r − d)/(u − d) = (${(1+r)} − ${d})/(${u} − ${d}) = <b>${fmt(p)}</b>` +
           `<br>q̃ = 1 − p̃ = ${fmt(1-p)}. Están entre 0 y 1 porque d < 1+r < u (no-arbitraje).`
    };
  },
  /* rendimiento de un bono a partir de su precio */
  () => {
    const P = eleg([0.95, 0.9, 0.8, 0.98]), T = eleg([1, 2, 5]);
    const v = -Math.log(P)/T;
    return {
      id:"fi-cal-yield",
      enunciado:`Un bono cupón cero a <span class="clave">${T} ${T===1?"año":"años"}</span> cotiza a <span class="clave">${P}</span>.<br>Calcula su <b>rendimiento continuo</b> y.`,
      sub:"4 decimales · en tanto por uno",
      valor:v, dec:4,
      nota:`De P = e^(−yT) se despeja y = −ln P / T = −${fmt(Math.log(P),4)} / ${T} = <b>${fmt(v)}</b>` +
           `<br>Precio y rendimiento se mueven siempre en <b>sentidos opuestos</b>.`
    };
  },
  /* rentabilidad simple */
  () => {
    const S0 = eleg([50, 100, 20]), S1 = eleg([55, 110, 90, 25, 18]);
    const v = (S1 - S0)/S0;
    return {
      id:"fi-cal-retorno",
      enunciado:`Una acción pasa de <span class="clave">${S0}</span> a <span class="clave">${S1}</span>.<br>Calcula su <b>rentabilidad simple</b> del período.`,
      sub:"4 decimales · en tanto por uno",
      valor:v, dec:4,
      nota:`(${S1} − ${S0})/${S0} = <b>${fmt(v)}</b> (es decir, ${fmt(v*100,2)} %)` +
           `<br>La rentabilidad <b>logarítmica</b> sería ln(${S1}/${S0}) = ${fmt(Math.log(S1/S0),4)}: es la que se suma bien en el tiempo, y siempre queda por debajo.`
    };
  },
  /* factor de descuento */
  () => {
    const r = eleg([0.25, 0.1, 0.05, 0.2, 0.04]);
    const v = 1/(1+r);
    return {
      id:"fi-cal-desc",
      enunciado:`La tasa de un período es <span class="clave">r = ${(r*100).toFixed(0)}%</span>.<br>¿Cuál es el <b>factor de descuento</b> de un período?`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`1/(1+r) = 1/${1+r} = <b>${fmt(v)}</b>. Todo precio de hoy es una esperanza futura multiplicada por este factor.`
    };
  },
  /* pago de una opción */
  () => {
    const S = eleg([2,4,8,16,10,12]), K = eleg([5,8,10,6]);
    const esCall = Math.random() < .5;
    const v = esCall ? Math.max(S-K,0) : Math.max(K-S,0);
    return {
      id:"fi-cal-pago",
      enunciado:`Al vencimiento la acción vale <span class="clave">S = ${S}</span> y el strike es <span class="clave">K = ${K}</span>.<br>¿Cuánto paga un <b>${esCall?"call":"put"}</b>?`,
      sub:"pago = " + (esCall ? "máx(S − K, 0)" : "máx(K − S, 0)"),
      valor:v, dec:2,
      nota:`${esCall ? `máx(${S} − ${K}, 0)` : `máx(${K} − ${S}, 0)`} = <b>${v}</b>. ` +
           (v === 0 ? "La opción vence sin valor (out of the money)." : "La opción vence in the money.")
    };
  },
  /* q tilde */
  () => {
    const u = eleg([1.5, 2, 1.25, 1.6]), d = eleg([0.5, 0.8, 0.75, 0.625]);
    let r = eleg([0.25, 0.1, 0.05, 0.2]);
    if(!(d < 1+r && 1+r < u)) r = 0.25;
    const q = (u - 1 - r)/(u - d);
    return {
      id:"fi-cal-qtilde",
      enunciado:`Modelo binomial: <span class="clave">u = ${u}</span>, <span class="clave">d = ${d}</span>, <span class="clave">r = ${(r*100).toFixed(0)}%</span>.<br>Calcula <b>q̃</b>, la probabilidad neutral al riesgo de <b>bajar</b>.`,
      sub:"4 decimales",
      valor:q, dec:4,
      nota:`q̃ = (u − 1 − r)/(u − d) = (${u} − ${1+r})/(${u} − ${d}) = <b>${fmt(q)}</b>` +
           `<br>Comprobación: p̃ = ${fmt(1-q)} y las dos suman 1.`
    };
  },
  /* capitalización a n períodos */
  () => {
    const C0 = eleg([100, 1000, 50]), r = eleg([.05, .1, .25]), n = eleg([1,2,3,4]);
    const v = C0*Math.pow(1+r, n);
    return {
      id:"fi-cal-capit",
      enunciado:`Depositas <span class="clave">${C0}</span> en la cuenta bancaria al <span class="clave">${(r*100).toFixed(0)}%</span> por período.<br>¿Cuánto tienes tras <b>${n} ${n===1?"período":"períodos"}</b>?`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`${C0}·(1 + ${r})^${n} = ${C0}·${fmt(Math.pow(1+r,n),4)} = <b>${fmt(v)}</b>` +
           `<br>La cuenta bancaria es el <b>numerario</b> por defecto: todo se mide en múltiplos de esto.`
    };
  },
  /* valor presente de un flujo */
  () => {
    const F = eleg([100, 250, 1000]), r = eleg([.05, .1, .25]), n = eleg([1,2,3]);
    const v = F/Math.pow(1+r, n);
    return {
      id:"fi-cal-vp",
      enunciado:`Vas a cobrar <span class="clave">${F}</span> dentro de <span class="clave">${n} ${n===1?"período":"períodos"}</span>. La tasa es <span class="clave">${(r*100).toFixed(0)}%</span>.<br>¿Cuál es su <b>valor presente</b>?`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`VP = ${F}/(1 + ${r})^${n} = <b>${fmt(v)}</b>` +
           `<br>Descontar es lo contrario de capitalizar. Este número es lo que estarías dispuesto a pagar hoy por ese flujo cierto.`
    };
  },
  /* precio del subyacente tras un movimiento */
  () => {
    const S0 = eleg([4, 8, 10, 100]), u = eleg([1.25, 1.5, 2]), sube = Math.random() < .5;
    const d = red(1/u, 4);
    const v = sube ? S0*u : S0*d;
    return {
      id:"fi-cal-arbolS",
      enunciado:`S₀ = <span class="clave">${S0}</span>, con u = ${u} y d = 1/u = ${d}.<br>¿Cuánto vale <b>S₁</b> si la acción <b>${sube?"sube":"baja"}</b>?`,
      sub:"4 decimales",
      valor:v, dec:4, tolRel:.01,
      nota:`S₁(${sube?"H":"T"}) = ${S0} · ${sube?u:d} = <b>${fmt(v)}</b>` +
           `<br>Con d = 1/u el árbol es <b>recombinante</b>: subir-bajar y bajar-subir llevan al mismo nodo, y eso reduce muchísimo el cálculo.`
    };
  },
  /* esperanza descontada de dos pagos */
  () => {
    const vH = eleg([0, 2, 4, 6]), vT = eleg([0, 1, 3]), r = eleg([.25, .1, .05]);
    const p = .5;
    const v = (p*vH + (1-p)*vT)/(1+r);
    return {
      id:"fi-cal-espdesc",
      enunciado:`Un derivado paga <span class="clave">${vH}</span> si sube y <span class="clave">${vT}</span> si baja. Con p̃ = q̃ = 0,5 y r = ${(r*100).toFixed(0)}%.<br>Calcula su <b>precio hoy</b>.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`V₀ = [0,5·${vH} + 0,5·${vT}] / ${1+r} = ${fmt(p*vH+(1-p)*vT,4)} / ${1+r} = <b>${fmt(v)}</b>` +
           `<br>Esperanza bajo la medida neutral al riesgo, multiplicada por el factor de descuento. Esa es toda la receta.`
    };
  },
  /* delta de una etapa */
  () => {
    const S0 = 4, u = 2, d = .5, K = eleg([5, 3, 6]);
    const sH = u*S0, sT = d*S0;
    const vH = Math.max(sH-K,0), vT = Math.max(sT-K,0);
    const delta = (vH-vT)/(sH-sT);
    return {
      id:"fi-cal-delta",
      enunciado:`S₀ = ${S0}, sube a S₁(H) = ${sH} o baja a S₁(T) = ${sT}. Call con <span class="clave">K = ${K}</span>.<br>Calcula la <b>delta de cobertura Δ₀</b>.`,
      sub:"4 decimales",
      valor:delta, dec:4,
      nota:`V₁(H) = máx(${sH}−${K},0) = ${vH} · V₁(T) = máx(${sT}−${K},0) = ${vT}` +
           `<br>Δ₀ = (${vH} − ${vT})/(${sH} − ${sT}) = <b>${fmt(delta)}</b>` +
           `<br>Son las acciones que hay que tener para replicar el pago.`
    };
  }
],

2: [
  /* precio del call en una etapa */
  () => {
    const S0 = eleg([4, 8, 100]), u = 2, d = .5, r = .25;
    const K = S0 === 100 ? 120 : (S0 === 8 ? 10 : 5);
    const p = (1+r-d)/(u-d);
    const vH = Math.max(u*S0-K,0), vT = Math.max(d*S0-K,0);
    const v0 = (p*vH + (1-p)*vT)/(1+r);
    return {
      id:"fi-cal-v0",
      enunciado:`S₀ = ${S0}, u = ${u}, d = ${d}, r = 25%. Call con <span class="clave">K = ${K}</span>.<br>Calcula el <b>precio de no-arbitraje V₀</b>.`,
      sub:"4 decimales",
      valor:v0, dec:4,
      nota:`p̃ = q̃ = ${fmt(p,2)} · V₁(H) = ${vH} · V₁(T) = ${vT}` +
           `<br>V₀ = [${fmt(p,2)}·${vH} + ${fmt(1-p,2)}·${vT}] / ${1+r} = <b>${fmt(v0)}</b>` +
           `<br>La probabilidad <b>real</b> de subir no interviene en ningún paso.`
    };
  },
  /* bono cupón cero */
  () => {
    const r = eleg([.05, .04, .06, .03]), T = eleg([1,2,3,5]);
    const v = Math.exp(-r*T);
    return {
      id:"fi-cal-bono",
      enunciado:`Tasa continua constante <span class="clave">r = ${(r*100).toFixed(0)}%</span>, plazo <span class="clave">T = ${T}</span> años.<br>Precio de un <b>bono cupón cero</b> que paga 1 en T.`,
      sub:"4 decimales · P = e^(−rT)",
      valor:v, dec:4,
      nota:`P(0,${T}) = e^(−${r}·${T}) = e^(${red(-r*T,3)}) = <b>${fmt(v)}</b>` +
           `<br>Su rendimiento continuo es y = −ln P / T = ${fmt(r,4)}, que es justo r.`
    };
  },
  /* forward */
  () => {
    const S = eleg([100, 80, 50, 120]), r = eleg([.05, .04, .03]), T = eleg([1, .5, 2]);
    const v = S*Math.exp(r*T);
    return {
      id:"fi-cal-forward",
      enunciado:`Acción S₀ = <span class="clave">${S}</span>, tasa <span class="clave">r = ${(r*100).toFixed(0)}%</span>, sin dividendos, vencimiento <span class="clave">T = ${T}</span>.<br>Calcula el <b>precio forward</b>.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`F = S₀·e^(rT) = ${S}·e^(${red(r*T,3)}) = <b>${fmt(v)}</b>` +
           `<br>Es el valor de entrega que hace nulo el costo inicial del contrato. Bajo la medida forward, F(t,T) es una martingala.`
    };
  },
  /* precio de mercado del riesgo */
  () => {
    const a = eleg([.10, .12, .08, .15]), r = eleg([.05, .04, .03]), s = eleg([.20, .25, .30]);
    const v = (a-r)/s;
    return {
      id:"fi-cal-theta",
      enunciado:`Una acción tiene tendencia real <span class="clave">α = ${(a*100).toFixed(0)}%</span>, volatilidad <span class="clave">σ = ${(s*100).toFixed(0)}%</span>. Tasa libre de riesgo <span class="clave">r = ${(r*100).toFixed(0)}%</span>.<br>Calcula el <b>precio de mercado del riesgo Θ</b>.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`Θ = (α − r)/σ = (${a} − ${r})/${s} = <b>${fmt(v)}</b>` +
           `<br>Por cada unidad de riesgo, el mercado exige ${fmt(v,3)} de exceso de rendimiento. Bajo Girsanov, W̃ = W + Θt y la acción pasa a rendir r.`
    };
  },
  /* browniano: probabilidad */
  () => {
    const t = eleg([1,4,9,16]), a = eleg([1,2,3]);
    const v = 1 - N(a/Math.sqrt(t));
    return {
      id:"fi-cal-brownP",
      enunciado:`W es un movimiento browniano. Calcula <span class="clave">P(W<sub>${t}</sub> > ${a})</span>.`,
      sub:"4 decimales · W_t ~ N(0, t)",
      valor:v, dec:4,
      nota:`W<sub>${t}</sub> ~ N(0, ${t}), desviación típica √${t} = ${Math.sqrt(t)}.` +
           `<br>P = 1 − N(${a}/${Math.sqrt(t)}) = 1 − N(${fmt(a/Math.sqrt(t),4)}) = <b>${fmt(v)}</b>`
    };
  },
  /* Poisson */
  () => {
    const lam = eleg([1,2,3]), k = eleg([0,1,2,3]);
    const fact = n => n<=1 ? 1 : n*fact(n-1);
    const v = Math.exp(-lam)*Math.pow(lam,k)/fact(k);
    return {
      id:"fi-cal-poisson",
      enunciado:`Los saltos llegan según un Poisson de intensidad <span class="clave">λ = ${lam}</span> por año.<br>Calcula <b>P(N₁ = ${k})</b>.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`P(N₁ = k) = e^(−λ)·λ^k/k! = e^(−${lam})·${lam}^${k}/${fact(k)} = <b>${fmt(v)}</b>` +
           `<br>Recuerda: E[N₁] = Var(N₁) = λ = ${lam}, y N_t − λt es una martingala.`
    };
  }
],

3: [
  /* d+ de Black-Scholes */
  () => {
    const S = eleg([100, 90, 110]), K = 100, r = .05, s = .20, T = eleg([.5, 1, .25]);
    const v = (Math.log(S/K) + (r + s*s/2)*T)/(s*Math.sqrt(T));
    return {
      id:"fi-cal-dplus",
      enunciado:`S = ${S}, K = ${K}, r = 5%, σ = 20%, T = ${T} años.<br>Calcula <span class="clave">d₊</span> de Black–Scholes.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`d₊ = [ln(S/K) + (r + ½σ²)T] / (σ√T)` +
           `<br>= [${fmt(Math.log(S/K),4)} + (${r} + ${s*s/2})·${T}] / (${s}·${fmt(Math.sqrt(T),4)}) = <b>${fmt(v)}</b>` +
           `<br>Y d₋ = d₊ − σ√T = ${fmt(v - s*Math.sqrt(T))}.`
    };
  },
  /* precio call BS */
  () => {
    const S = eleg([100, 95, 105]), K = 100, r = .05, s = .20, T = eleg([.5, 1]);
    const dp = (Math.log(S/K) + (r + s*s/2)*T)/(s*Math.sqrt(T));
    const dm = dp - s*Math.sqrt(T);
    const v = S*N(dp) - K*Math.exp(-r*T)*N(dm);
    return {
      id:"fi-cal-bs",
      enunciado:`S = ${S}, K = ${K}, r = 5%, σ = 20%, T = ${T} años, sin dividendos.<br>Calcula el <b>precio del call</b> (Black–Scholes).`,
      sub:"2 decimales",
      valor:v, dec:2, tolRel:.01,
      nota:`d₊ = ${fmt(dp,4)} → N(d₊) = ${fmt(N(dp),4)}` +
           `<br>d₋ = ${fmt(dm,4)} → N(d₋) = ${fmt(N(dm),4)}` +
           `<br>c = ${S}·${fmt(N(dp),4)} − ${K}·e^(−${r}·${T})·${fmt(N(dm),4)} = <b>${fmt(v,2)}</b>` +
           `<br>Su delta de cobertura es Δ = N(d₊) = ${fmt(N(dp),4)} acciones.`
    };
  },
  /* paridad put-call */
  () => {
    const S = 100, K = 100, r = .05, T = .5, c = 6.89;
    const v = c - S + K*Math.exp(-r*T);
    return {
      id:"fi-cal-paridad",
      enunciado:`Un call vale <span class="clave">c = ${c}</span> con S = ${S}, K = ${K}, r = 5%, T = ${T}.<br>Calcula el <b>precio del put</b> por paridad.`,
      sub:"2 decimales",
      valor:v, dec:2, tolRel:.02,
      nota:`p = c − S + K·e^(−rT) = ${c} − ${S} + ${fmt(K*Math.exp(-r*T),2)} = <b>${fmt(v,2)}</b>` +
           `<br>La paridad put–call es puro no-arbitraje: no depende del modelo.`
    };
  },
  /* put americano perpetuo */
  () => {
    const K = eleg([10, 20, 50]), r = eleg([.04, .05]), s = .20;
    const g = 2*r/(s*s);
    const L = g*K/(1+g);
    return {
      id:"fi-cal-perpetuo",
      enunciado:`Put americano <b>perpetuo</b>: K = ${K}, r = ${(r*100).toFixed(0)}%, σ = 20%.<br>Calcula la <b>barrera de ejercicio óptima L*</b>.`,
      sub:"4 decimales · γ = 2r/σ² y L* = γK/(1+γ)",
      valor:L, dec:4,
      nota:`γ = 2r/σ² = 2·${r}/${red(s*s,4)} = ${fmt(g,4)}` +
           `<br>L* = γK/(1+γ) = ${fmt(g,4)}·${K}/${fmt(1+g,4)} = <b>${fmt(L)}</b>` +
           `<br>Si la acción cae a L* o menos, es óptimo ejercer de inmediato (allí v = K − S).`
    };
  },
  /* tasa forward */
  () => {
    const y1 = eleg([.05, .04, .045]), y2 = eleg([.055, .05, .06]);
    const P1 = Math.exp(-y1*1), P2 = Math.exp(-y2*2);
    const f = (Math.log(P1) - Math.log(P2))/1;
    return {
      id:"fi-cal-fwdrate",
      enunciado:`Del mercado: <span class="clave">P(0,1) = ${fmt(P1,4)}</span> y <span class="clave">P(0,2) = ${fmt(P2,4)}</span>.<br>Calcula la <b>tasa forward continua</b> entre el año 1 y el 2.`,
      sub:"4 decimales · en tanto por uno (ej. 0,06)",
      valor:f, dec:4,
      nota:`f = [ln P(0,1) − ln P(0,2)] / (T₂ − T₁) = [${fmt(Math.log(P1),4)} − ${fmt(Math.log(P2),4)}] / 1 = <b>${fmt(f)}</b>` +
           `<br>Contado a 1 año: ${fmt(y1,4)} · a 2 años: ${fmt(y2,4)}. Curva ${y2>y1?"creciente ⟹ forward por encima":"decreciente ⟹ forward por debajo"} de las contado.`
    };
  },
  /* probabilidad de tocar barrera */
  () => {
    const m = eleg([1,2,3]), T = eleg([1,4,9]);
    const v = 2*(1 - N(m/Math.sqrt(T)));
    return {
      id:"fi-cal-barrera",
      enunciado:`El log-precio se modela como un browniano W. Calcula la <b>probabilidad de tocar el nivel m = ${m}</b> antes de T = ${T}.`,
      sub:"4 decimales · usa el principio de reflexión",
      valor:v, dec:4,
      nota:`P(máx W ≥ m) = 2·P(W_T ≥ m) = 2·[1 − N(${m}/√${T})] = 2·${fmt(1-N(m/Math.sqrt(T)),4)} = <b>${fmt(v)}</b>` +
           `<br>Es el <b>doble</b> de la probabilidad de terminar por encima (${fmt(1-N(m/Math.sqrt(T)),4)}): una trayectoria puede tocar y luego retroceder.`
    };
  },
  /* árbol de dos pasos: europeo vs americano */
  () => {
    const S0 = 4, u = 2, d = .5, r = .25, K = 5;
    const p = .5, disc = 1/(1+r);
    const s2 = [u*u*S0, u*d*S0, d*u*S0, d*d*S0];       // 16, 4, 4, 1
    const pay = s2.map(s => Math.max(K-s,0));           // 0, 1, 1, 4
    const cH = disc*(p*pay[0] + p*pay[1]);              // en S1(H)=8
    const cT = disc*(p*pay[2] + p*pay[3]);              // en S1(T)=2
    const euro = disc*(p*cH + p*cT);
    const ameH = Math.max(Math.max(K-u*S0,0), cH);
    const ameT = Math.max(Math.max(K-d*S0,0), cT);
    const ame = disc*(p*ameH + p*ameT);
    const pideAmericano = Math.random() < .5;
    const v = pideAmericano ? ame : euro;
    return {
      id:"fi-cal-arbol2",
      enunciado:`Árbol de 2 pasos: S₀ = ${S0}, u = ${u}, d = ${d}, r = 25%. Put con <span class="clave">K = ${K}</span>.<br>Calcula el precio del put <b>${pideAmericano?"AMERICANO":"EUROPEO"}</b>.`,
      sub:"4 decimales",
      valor:v, dec:4, tolRel:.01,
      nota:`Pagos en t=2 (S = 16, 4, 4, 1): ${pay.join(", ")}.` +
           `<br>Continuación en S₁(H)=8: ${fmt(cH,4)} · en S₁(T)=2: ${fmt(cT,4)}` +
           `<br><b>Europeo</b> = ${fmt(euro,4)}` +
           `<br><b>Americano</b>: en S₁(T) el intrínseco ${K-d*S0} supera la continuación ${fmt(cT,2)} → conviene ejercer. Valor = ${fmt(ame,4)}` +
           `<br>La diferencia (${fmt(ame-euro,4)}) es el valor del derecho a ejercer antes.`
    };
  }
]
};

function fiCalculo(nivel){
  /* los niveles altos también incluyen problemas de los bajos, con menos peso */
  let bolsa = PROBLEMAS[nivel].slice();
  if(nivel >= 2) bolsa = bolsa.concat(PROBLEMAS[1]);
  if(nivel === 3) bolsa = bolsa.concat(PROBLEMAS[2]);
  const p = eleg(bolsa)();
  return {
    id:p.id, juego:"fi-calculo", etiqueta:"cálculo", tipo:"numero",
    enunciado:p.enunciado, sub:p.sub,
    valor:p.valor, dec:p.dec, tolRel:p.tolRel || .005,
    nota:p.nota
  };
}

/* --- 4. Verdadero o falso --- */
function fiVF(nivel){
  const pool = porNivel(F().vf, nivel);
  const v = M.elegirPesado(pool, 1, x => "fi-vf-"+x.q)[0];
  const ops = ["✅ Verdadero","❌ Falso"];
  return {
    id:"fi-vf-"+v.q, juego:"fi-vf", etiqueta:"V/F", tipo:"opciones", cols:2,
    enunciado:v.q, sub:"¿verdadero o falso?",
    opciones:ops, ok: v.v ? 0 : 1,
    nota:`<b>${v.v ? "Verdadero" : "Falso"}.</b> ${v.nota}`
  };
}

/* --- 5. Secuencia lógica --- */
function fiSecuencia(nivel){
  const pool = porNivel(F().secuencias, nivel, 16);
  const s = M.elegirPesado(pool, 1, x => "fi-sec-"+x.titulo)[0];
  let barajado = mez(s.pasos);
  let guarda = 0;
  while(barajado.join("|") === s.pasos.join("|") && guarda++ < 12) barajado = mez(s.pasos);
  return {
    id:"fi-sec-"+s.titulo, juego:"fi-secuencia", etiqueta:s.titulo, tipo:"ordenar", pasos:true,
    enunciado:`<span style="font-size:.75em">${s.titulo}</span>`,
    sub:"pon los pasos en el orden correcto",
    tokens:barajado,
    soluciones:[s.pasos.join(" ")],
    solucionLista:s.pasos,
    nota:s.pasos.map((p,i) => `<span class="paso"><b>${i+1}.</b> ${p}</span>`).join("") + `<br>💡 ${s.nota}`
  };
}

/* =====================================================================
   MATEMÁTICAS
   ===================================================================== */

const X = () => window.MATEMATICAS;

/* Dibuja una matriz con corchetes */
function matriz(m){
  const cols = m[0].length;
  return `<span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(${cols},auto)">` +
         m.reduce((a,f)=>a.concat(f),[]).map(x => `<b>${x}</b>`).join("") +
         `</span></span>`;
}

/* Entero no nulo en [-lim, lim] */
function ent(lim){
  let v = 0;
  while(v === 0) v = Math.round((Math.random()*2-1)*lim);
  return v;
}

/* Distractores únicos a partir de un pool, evitando repetir la correcta.
   Dos funciones distintas pueden tener la MISMA derivada (ln x y ln 3x → 1/x),
   así que hay que deduplicar por texto, no por objeto. */
function distrUnicos(pool, correcta, k, campo){
  const vistos = new Set([correcta]);
  const out = [];
  for(const x of mez(pool)){
    const v = x[campo];
    if(vistos.has(v)) continue;
    vistos.add(v);
    out.push(v);
    if(out.length >= k) break;
  }
  return out;
}

/* Baraja una pregunta de las listas {q, ops, ok, tema, nota} */
function deLista(lista, nivel, juego, prefijo, subDefecto){
  const pool = porNivel(lista, nivel);
  const g = M.elegirPesado(pool, 1, x => prefijo+x.q)[0];
  const correcta = g.ops[g.ok];
  const distr = mez(g.ops.filter((_,i) => i !== g.ok)).slice(0, Math.max(1, nOpciones(nivel)-1));
  const {opciones, ok} = barajarOps(correcta, distr);
  return {
    id:prefijo+g.q, juego, etiqueta:g.tema, tipo:"opciones",
    enunciado:g.q, sub:g.tema || subDefecto, opciones, ok, nota:g.nota
  };
}

/* --- 1. Derivadas --- */
function maDerivadas(nivel){
  /* mitad tabla, mitad reglas conceptuales */
  if(Math.random() < .55){
    const pool = porNivel(X().derivadas, nivel);
    const d = M.elegirPesado(pool, 1, x => "ma-der-"+x.f)[0];
    const alReves = nivel === 3 && Math.random() < .35;

    if(alReves){
      /* dada la derivada, ¿de qué función viene? */
      const distr = distrUnicos(X().derivadas.filter(x => x.d !== d.d), d.f, nOpciones(nivel)-1, "f");
      const {opciones, ok} = barajarOps(d.f, distr);
      return {
        id:"ma-derinv-"+d.f, juego:"ma-derivadas", etiqueta:"inversa", tipo:"opciones",
        enunciado:`¿De qué función es derivada <span class="clave">${d.d}</span>?`,
        sub:"lee la tabla al revés",
        opciones, ok,
        nota:`d/dx [ <b>${d.f}</b> ] = ${d.d}. ${d.nota}`
      };
    }

    const distr = distrUnicos(X().derivadas, d.d, nOpciones(nivel)-1, "d");
    const {opciones, ok} = barajarOps(d.d, distr);
    return {
      id:"ma-der-"+d.f, juego:"ma-derivadas", etiqueta:"tabla", tipo:"opciones",
      enunciado:`d/dx [ <span class="clave">${d.f}</span> ]`,
      sub:"¿cuál es su derivada?",
      opciones, ok,
      nota:`d/dx [ ${d.f} ] = <b>${d.d}</b><br>${d.nota}`
    };
  }

  const temas = ["Derivadas · reglas","Cadena","Derivadas · teoremas","Derivadas · aplicaciones",
                 "Taylor","Varias variables","Límites","Series","Métodos numéricos"];
  return deLista(X().reglas.filter(r => temas.includes(r.tema)), nivel, "ma-derivadas", "ma-regd-");
}

/* --- 2. Integrales --- */
function maIntegrales(nivel){
  if(Math.random() < .55){
    const pool = porNivel(X().integrales, nivel);
    const it = M.elegirPesado(pool, 1, x => "ma-int-"+x.f)[0];
    const distr = distrUnicos(X().integrales, it.d, nOpciones(nivel)-1, "d");
    const {opciones, ok} = barajarOps(it.d, distr);
    return {
      id:"ma-int-"+it.f, juego:"ma-integrales", etiqueta:"tabla", tipo:"opciones",
      enunciado:`∫ <span class="clave">${it.f}</span> dx`,
      sub:"¿cuál es la primitiva?",
      opciones, ok,
      nota:`∫ ${it.f} dx = <b>${it.d}</b><br>${it.nota}`
    };
  }
  const temas = ["Integrales","Integrales · técnicas"];
  return deLista(X().reglas.filter(r => temas.includes(r.tema)), nivel, "ma-integrales", "ma-regi-");
}

/* --- 3. Ecuaciones diferenciales --- */
function maEDO(nivel){
  return deLista(X().edo, nivel, "ma-edo", "ma-edo-");
}

/* --- 4. Álgebra lineal --- */
function maLineal(nivel){
  return deLista(X().lineal, nivel, "ma-lineal", "ma-lin-");
}

/* --- 5. Sala de cálculo (problemas numéricos generados) --- */
const PROB_MAT = {

1: [
  /* derivada de un polinomio en un punto */
  () => {
    const a = ent(4), b = ent(5), c = ent(6), x0 = ent(3);
    const v = 3*a*x0*x0 + 2*b*x0 + c;
    return {
      id:"ma-cal-derpol",
      enunciado:`f(x) = ${a}x³ ${b<0?"−":"+"} ${Math.abs(b)}x² ${c<0?"−":"+"} ${Math.abs(c)}x<br>Calcula <span class="clave">f′(${x0})</span>.`,
      sub:"entero",
      valor:v, dec:0,
      nota:`f′(x) = ${3*a}x² ${2*b<0?"−":"+"} ${Math.abs(2*b)}x ${c<0?"−":"+"} ${Math.abs(c)}` +
           `<br>f′(${x0}) = ${3*a}·${x0*x0} ${2*b<0?"−":"+"} ${Math.abs(2*b*x0)} ${c<0?"−":"+"} ${Math.abs(c)} = <b>${v}</b>` +
           `<br>Regla de la potencia término a término.`
    };
  },
  /* integral definida de un polinomio */
  () => {
    const a = ent(4), c = ent(5), b = eleg([1,2,3]);
    const v = a*b*b/2 + c*b;
    return {
      id:"ma-cal-intpol",
      enunciado:`Calcula <span class="clave">∫<sub>0</sub><sup>${b}</sup> (${a}x ${c<0?"−":"+"} ${Math.abs(c)}) dx</span>`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`Primitiva: ${a/2 === Math.round(a/2) ? a/2 : a+"/2"}·x² ${c<0?"−":"+"} ${Math.abs(c)}x` +
           `<br>Evaluada entre 0 y ${b}: ${fmt(a*b*b/2)} ${c<0?"−":"+"} ${Math.abs(c*b)} = <b>${fmt(v)}</b>`
    };
  },
  /* determinante 2x2 */
  () => {
    const a = ent(6), b = ent(6), c = ent(6), d = ent(6);
    const v = a*d - b*c;
    return {
      id:"ma-cal-det2",
      enunciado:`Calcula el determinante de ${matriz([[a,b],[c,d]])}`,
      sub:"entero",
      valor:v, dec:0,
      nota:`det = ad − bc = (${a})(${d}) − (${b})(${c}) = ${a*d} − ${b*c} = <b>${v}</b>` +
           (v === 0 ? "<br>⚠️ det = 0: la matriz <b>no</b> es invertible, sus columnas son dependientes." : "<br>Como det ≠ 0, la matriz es invertible.")
    };
  },
  /* producto punto */
  () => {
    const u = [ent(5), ent(5), ent(5)], w = [ent(5), ent(5), ent(5)];
    const v = u[0]*w[0] + u[1]*w[1] + u[2]*w[2];
    return {
      id:"ma-cal-punto",
      enunciado:`u = (${u.join(", ")}) · v = (${w.join(", ")})<br>Calcula el <b>producto punto</b> u·v.`,
      sub:"entero",
      valor:v, dec:0,
      nota:`u·v = ${u.map((x,i)=>`(${x})(${w[i]})`).join(" + ")} = <b>${v}</b>` +
           (v === 0 ? "<br>Es cero: los vectores son <b>ortogonales</b>." : "")
    };
  },
  /* norma */
  () => {
    const u = [ent(6), ent(6), ent(6)];
    const v = Math.sqrt(u[0]*u[0] + u[1]*u[1] + u[2]*u[2]);
    return {
      id:"ma-cal-norma",
      enunciado:`Calcula la <b>norma</b> ‖u‖ del vector u = (${u.join(", ")}).`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`‖u‖ = √(${u.map(x=>x*x).join(" + ")}) = √${u.reduce((s,x)=>s+x*x,0)} = <b>${fmt(v)}</b>`
    };
  },
  /* recta tangente: valor de f en un punto */
  () => {
    const a = ent(4), b = ent(5), x0 = ent(4);
    const v = a*x0*x0 + b;
    return {
      id:"ma-cal-evalpol",
      enunciado:`f(x) = ${a}x² ${b<0?"−":"+"} ${Math.abs(b)}<br>Calcula <span class="clave">f(${x0})</span>.`,
      sub:"entero",
      valor:v, dec:0,
      nota:`f(${x0}) = ${a}·${x0*x0} ${b<0?"−":"+"} ${Math.abs(b)} = <b>${v}</b>` +
           `<br>La recta tangente en ese punto sería y = ${v} + ${2*a*x0}(x − ${x0}).`
    };
  },
  /* derivada de una combinación trigonométrica */
  () => {
    const a = ent(4), b = ent(4);
    const x0 = eleg([0, Math.PI/2, Math.PI]);
    const nom = x0 === 0 ? "0" : x0 === Math.PI ? "π" : "π/2";
    const v = a*Math.cos(x0) - b*Math.sin(x0);
    return {
      id:"ma-cal-dertrig",
      enunciado:`f(x) = ${a}·sen x ${b<0?"−":"+"} ${Math.abs(b)}·cos x<br>Calcula <span class="clave">f′(${nom})</span>.`,
      sub:"entero",
      valor:v, dec:0,
      nota:`f′(x) = ${a}·cos x ${-b<0?"−":"+"} ${Math.abs(b)}·sen x` +
           `<br>En x = ${nom}: cos = ${red(Math.cos(x0),0)}, sen = ${red(Math.sin(x0),0)}` +
           `<br>f′(${nom}) = <b>${v}</b>. Recuerda: al derivar, el menos lo lleva el coseno.`
    };
  },
  /* traza */
  () => {
    const m = [[ent(6),ent(6)],[ent(6),ent(6)]];
    const v = m[0][0] + m[1][1];
    return {
      id:"ma-cal-traza",
      enunciado:`Calcula la <b>traza</b> de ${matriz(m)}`,
      sub:"entero",
      valor:v, dec:0,
      nota:`traza = ${m[0][0]} + ${m[1][1]} = <b>${v}</b>` +
           `<br>Es también la <b>suma de los autovalores</b>, sin necesidad de calcularlos.`
    };
  },
  /* integral de x^2 */
  () => {
    const b = eleg([1,2,3]), k = eleg([1,3,6]);
    const v = k*b*b*b/3;
    return {
      id:"ma-cal-intcuad",
      enunciado:`Calcula <span class="clave">∫<sub>0</sub><sup>${b}</sup> ${k===1?"":k}x² dx</span>`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`Primitiva: ${k===3?"":k+"·"}x³/3` +
           `<br>Entre 0 y ${b}: ${k}·${b*b*b}/3 = <b>${fmt(v)}</b>`
    };
  },
  /* pendiente de la recta secante */
  () => {
    const a = ent(4), b = ent(5);
    let x1, x2;
    do{ x1 = ent(4); x2 = ent(4); }while(x1 === x2);
    const f = x => a*x*x + b*x;
    const v = (f(x2) - f(x1))/(x2 - x1);
    return {
      id:"ma-cal-secante",
      enunciado:`f(x) = ${a}x² ${b<0?"−":"+"} ${Math.abs(b)}x<br>Calcula la <b>pendiente media</b> entre x = ${x1} y x = ${x2}.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`[f(${x2}) − f(${x1})] / (${x2} − ${x1}) = (${f(x2)} − ${f(x1)}) / ${x2-x1} = <b>${fmt(v)}</b>` +
           `<br>Por el Teorema del Valor Medio, existe un punto donde f′ vale exactamente eso: aquí, x = ${fmt((x1+x2)/2,4)}.`
    };
  },
  /* área de un rectángulo transformado / suma de matrices */
  () => {
    const A = [[ent(5),ent(5)],[ent(5),ent(5)]], B = [[ent(5),ent(5)],[ent(5),ent(5)]];
    const pos = eleg([[0,0],[0,1],[1,0],[1,1]]);
    const v = A[pos[0]][0]*B[0][pos[1]] + A[pos[0]][1]*B[1][pos[1]];
    return {
      id:"ma-cal-prodmat",
      enunciado:`A = ${matriz(A)} B = ${matriz(B)}<br>Calcula la entrada <span class="clave">(${pos[0]+1}, ${pos[1]+1})</span> de <b>A·B</b>.`,
      sub:"entero",
      valor:v, dec:0,
      nota:`Fila ${pos[0]+1} de A por columna ${pos[1]+1} de B:` +
           `<br>(${A[pos[0]][0]})(${B[0][pos[1]]}) + (${A[pos[0]][1]})(${B[1][pos[1]]}) = <b>${v}</b>` +
           `<br>Cada entrada del producto es un producto punto: fila por columna.`
    };
  },
  /* interés compuesto continuo */
  () => {
    const C0 = eleg([100, 500, 1000]), r = eleg([.03, .05, .08]), T = eleg([1,2,5,10]);
    const v = C0*Math.exp(r*T);
    return {
      id:"ma-cal-compuesto",
      enunciado:`Un capital de <span class="clave">${C0}</span> crece de forma continua al <span class="clave">${(r*100).toFixed(0)}%</span> anual.<br>¿Cuánto vale al cabo de <b>${T} ${T===1?"año":"años"}</b>?`,
      sub:"4 decimales",
      valor:v, dec:4, tolRel:.005,
      nota:`Es la EDO y′ = ry, cuya solución es y = C₀·e^(rt)` +
           `<br>${C0}·e^(${red(r*T,4)}) = <b>${fmt(v)}</b>` +
           `<br>La misma ecuación que dB = rB dt del activo libre de riesgo.`
    };
  },
  /* norma de una suma de vectores */
  () => {
    const u = [ent(4), ent(4)], w = [ent(4), ent(4)];
    const s = [u[0]+w[0], u[1]+w[1]];
    const v = Math.sqrt(s[0]*s[0] + s[1]*s[1]);
    return {
      id:"ma-cal-normasuma",
      enunciado:`u = (${u.join(", ")}) · v = (${w.join(", ")})<br>Calcula <b>‖u + v‖</b>.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`u + v = (${s.join(", ")})` +
           `<br>‖u+v‖ = √(${s[0]*s[0]} + ${s[1]*s[1]}) = <b>${fmt(v)}</b>` +
           `<br>Ojo: ‖u+v‖ ≤ ‖u‖+‖v‖ = ${fmt(Math.hypot(u[0],u[1])+Math.hypot(w[0],w[1]),4)} (desigualdad triangular).`
    };
  }
],

2: [
  /* regla de la cadena */
  () => {
    const k = eleg([1,2,3,-1,-2]), x0 = eleg([0,1,-1,2]);
    const v = 2*k*x0*Math.exp(k*x0*x0);
    return {
      id:"ma-cal-cadena",
      enunciado:`f(x) = e<sup>${k===1?"":k===-1?"−":k}x²</sup><br>Calcula <span class="clave">f′(${x0})</span>.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`Cadena: f′(x) = e^(${k}x²)·(${2*k}x)` +
           `<br>f′(${x0}) = ${2*k}·${x0}·e^(${k*x0*x0}) = <b>${fmt(v)}</b>` +
           `<br>Primero derivas lo de fuera, después multiplicas por la derivada de dentro.`
    };
  },
  /* regla del producto */
  () => {
    const k = eleg([1,2,-1]), x0 = eleg([0,1,2]);
    const v = (2*x0 + k*x0*x0) * Math.exp(k*x0);
    return {
      id:"ma-cal-producto",
      enunciado:`f(x) = x²·e<sup>${k===1?"":k===-1?"−":k}x</sup><br>Calcula <span class="clave">f′(${x0})</span>.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`Producto: f′ = 2x·e^(${k}x) + x²·${k}e^(${k}x) = (2x + ${k}x²)e^(${k}x)` +
           `<br>En x = ${x0}: (${2*x0} + ${k*x0*x0})·e^(${k*x0}) = <b>${fmt(v)}</b>`
    };
  },
  /* sustitución */
  () => {
    const b = eleg([1, 1.5, 2]);
    const v = Math.exp(b*b) - 1;
    return {
      id:"ma-cal-sust",
      enunciado:`Calcula <span class="clave">∫<sub>0</sub><sup>${b}</sup> 2x·e<sup>x²</sup> dx</span>`,
      sub:"4 decimales",
      valor:v, dec:4, tolRel:.01,
      nota:`Sustitución u = x², du = 2x dx. Los límites pasan a 0 y ${red(b*b,4)}.` +
           `<br>∫₀^${red(b*b,4)} eᵘ du = e^${red(b*b,4)} − 1 = <b>${fmt(v)}</b>` +
           `<br>Se reconoce porque 2x es exactamente la derivada de x².`
    };
  },
  /* determinante 3x3 */
  () => {
    const m = [[ent(4),ent(4),ent(4)],[ent(4),ent(4),ent(4)],[ent(4),ent(4),ent(4)]];
    const [[a,b,c],[d,e,f],[g,h,i]] = m;
    const v = a*(e*i-f*h) - b*(d*i-f*g) + c*(d*h-e*g);
    return {
      id:"ma-cal-det3",
      enunciado:`Calcula el determinante de ${matriz(m)}`,
      sub:"entero",
      valor:v, dec:0,
      nota:`Desarrollo por la primera fila:` +
           `<br>${a}·(${e}·${i} − ${f}·${h}) − (${b})·(${d}·${i} − ${f}·${g}) + (${c})·(${d}·${h} − ${e}·${g})` +
           `<br>= ${a*(e*i-f*h)} − ${b*(d*i-f*g)} + ${c*(d*h-e*g)} = <b>${v}</b>`
    };
  },
  /* crecimiento exponencial y' = ky */
  () => {
    const k = eleg([.05, .1, -.2, .3, -.05]), y0 = eleg([100, 50, 2, 1000]), T = eleg([1,2,3,5]);
    const v = y0*Math.exp(k*T);
    return {
      id:"ma-cal-expo",
      enunciado:`Resuelve <span class="clave">y′ = ${k}y</span> con y(0) = ${y0}.<br>¿Cuánto vale <b>y(${T})</b>?`,
      sub:"4 decimales",
      valor:v, dec:4, tolRel:.005,
      nota:`Separación de variables: y = y₀·e^(kt)` +
           `<br>y(${T}) = ${y0}·e^(${red(k*T,4)}) = <b>${fmt(v)}</b>` +
           `<br>Es la misma ecuación que dB = rB dt del activo sin riesgo.`
    };
  },
  /* mayor autovalor de una 2x2 */
  () => {
    let a, b, c, d, disc;
    do{
      a = ent(5); b = ent(4); c = ent(4); d = ent(5);
      disc = (a+d)*(a+d) - 4*(a*d - b*c);
    }while(disc <= 0);
    const tr = a+d, det = a*d - b*c;
    const v = (tr + Math.sqrt(disc))/2;
    return {
      id:"ma-cal-autoval",
      enunciado:`Halla el <b>mayor autovalor</b> de ${matriz([[a,b],[c,d]])}`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`traza = ${tr} · det = ${det}` +
           `<br>λ² − ${tr}λ + (${det}) = 0 ⟹ λ = [${tr} ± √${red(disc,4)}]/2` +
           `<br>λ<sub>máx</sub> = <b>${fmt(v)}</b> · λ<sub>mín</sub> = ${fmt((tr-Math.sqrt(disc))/2)}` +
           `<br>Comprobación: suman ${tr} (la traza) y multiplican ${det} (el determinante).`
    };
  },
  /* límite por L'Hôpital */
  () => {
    const a = eleg([2,3,5,-2]), b = eleg([1,2,4]);
    const v = a/b;
    return {
      id:"ma-cal-lhopital",
      enunciado:`Calcula <span class="clave">lím<sub>x→0</sub> (e<sup>${a}x</sup> − 1) / (${b}x)</span>`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`Es una indeterminación 0/0, así que vale L'Hôpital.` +
           `<br>Derivando arriba y abajo: ${a}·e^(${a}x) / ${b} → ${a}/${b} = <b>${fmt(v)}</b>` +
           `<br>También sale de e^u ≈ 1 + u cerca de 0.`
    };
  },
  /* integral de 1/x */
  () => {
    const a = eleg([1,2]), b = eleg([3,4,5,10]);
    const v = Math.log(b/a);
    return {
      id:"ma-cal-intlog",
      enunciado:`Calcula <span class="clave">∫<sub>${a}</sub><sup>${b}</sup> dx/x</span>`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`Primitiva: ln|x|` +
           `<br>ln ${b} − ln ${a} = ln(${b}/${a}) = <b>${fmt(v)}</b>` +
           `<br>Es el único caso que la regla de la potencia no cubre (n = −1).`
    };
  },
  /* segunda derivada */
  () => {
    const a = ent(4), b = ent(5), x0 = ent(3);
    const v = 6*a*x0 + 2*b;
    return {
      id:"ma-cal-der2",
      enunciado:`f(x) = ${a}x³ ${b<0?"−":"+"} ${Math.abs(b)}x²<br>Calcula <span class="clave">f″(${x0})</span>.`,
      sub:"entero",
      valor:v, dec:0,
      nota:`f′(x) = ${3*a}x² ${2*b<0?"−":"+"} ${Math.abs(2*b)}x · f″(x) = ${6*a}x ${2*b<0?"−":"+"} ${Math.abs(2*b)}` +
           `<br>f″(${x0}) = <b>${v}</b>` +
           `<br>${v > 0 ? "f″ > 0: ahí la curva es cóncava hacia arriba (∪)." : v < 0 ? "f″ < 0: cóncava hacia abajo (∩)." : "f″ = 0: posible punto de inflexión."}`
    };
  },
  /* sistema 2x2 por Cramer */
  () => {
    let a, b, c, d, det;
    do{ a = ent(4); b = ent(4); c = ent(4); d = ent(4); det = a*d - b*c; }while(det === 0);
    const e = ent(6), f = ent(6);
    const v = (e*d - b*f)/det;
    return {
      id:"ma-cal-cramer",
      enunciado:`Resuelve el sistema y da el valor de <span class="clave">x</span>:<br>` +
                `${a}x ${b<0?"−":"+"} ${Math.abs(b)}y = ${e}<br>${c}x ${d<0?"−":"+"} ${Math.abs(d)}y = ${f}`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`det(A) = (${a})(${d}) − (${b})(${c}) = ${det}` +
           `<br>det(Aₓ) = (${e})(${d}) − (${b})(${f}) = ${e*d - b*f}` +
           `<br>x = ${e*d-b*f}/${det} = <b>${fmt(v)}</b>` +
           `<br>Regla de Cramer: sustituyes la columna de x por el término independiente.`
    };
  },
  /* coseno del ángulo entre vectores */
  () => {
    const u = [ent(4), ent(4), ent(4)], w = [ent(4), ent(4), ent(4)];
    const uv = u[0]*w[0]+u[1]*w[1]+u[2]*w[2];
    const nu = Math.hypot(u[0],u[1],u[2]), nw = Math.hypot(w[0],w[1],w[2]);
    const v = uv/(nu*nw);
    return {
      id:"ma-cal-coseno",
      enunciado:`u = (${u.join(", ")}) · v = (${w.join(", ")})<br>Calcula el <b>coseno del ángulo</b> entre los dos.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`cos θ = u·v / (‖u‖·‖v‖) = ${uv} / (${fmt(nu,4)}·${fmt(nw,4)}) = <b>${fmt(v)}</b>` +
           `<br>Ángulo ≈ ${fmt(Math.acos(Math.max(-1,Math.min(1,v)))*180/Math.PI,1)}°. Por Cauchy–Schwarz siempre está entre −1 y 1.`
    };
  },
  /* serie geométrica */
  () => {
    const r = eleg([.5, .25, .8, .9, .1]);
    const v = 1/(1-r);
    return {
      id:"ma-cal-geom",
      enunciado:`Calcula la suma de la serie geométrica <span class="clave">1 + ${r} + ${r}² + ${r}³ + …</span>`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`Σrⁿ = 1/(1 − r) = 1/${red(1-r,4)} = <b>${fmt(v)}</b>` +
           `<br>Converge porque |r| < 1. Es la fórmula de una perpetuidad: cuanto más cerca de 1 esté r, mayor la suma.`
    };
  }
],

3: [
  /* integración por partes */
  () => {
    const b = eleg([1, 2, 3]);
    const v = (b-1)*Math.exp(b) + 1;
    return {
      id:"ma-cal-partes",
      enunciado:`Calcula <span class="clave">∫<sub>0</sub><sup>${b}</sup> x·e<sup>x</sup> dx</span>`,
      sub:"4 decimales",
      valor:v, dec:4, tolRel:.005,
      nota:`Por partes con u = x, dv = eˣdx ⟹ du = dx, v = eˣ` +
           `<br>∫x eˣ dx = x eˣ − ∫eˣ dx = (x − 1)eˣ` +
           `<br>Entre 0 y ${b}: (${b-1})·e^${b} − (−1) = <b>${fmt(v)}</b>`
    };
  },
  /* EDO lineal con factor integrante, coeficientes constantes */
  () => {
    const a = eleg([1, 2, .5]), q = eleg([2, 4, 10]), y0 = eleg([0, 1, 5]), T = eleg([1, 2]);
    const est = q/a;
    const v = est + (y0 - est)*Math.exp(-a*T);
    return {
      id:"ma-cal-factint",
      enunciado:`Resuelve <span class="clave">y′ + ${a}y = ${q}</span> con y(0) = ${y0}.<br>¿Cuánto vale <b>y(${T})</b>?`,
      sub:"4 decimales",
      valor:v, dec:4, tolRel:.005,
      nota:`Factor integrante μ = e^(${a}t). Solución general: y = ${fmt(est,4)} + C·e^(−${a}t)` +
           `<br>Con y(0) = ${y0}: C = ${fmt(y0-est,4)}` +
           `<br>y(${T}) = ${fmt(est,4)} + ${fmt(y0-est,4)}·e^(−${red(a*T,4)}) = <b>${fmt(v)}</b>` +
           `<br>El estado estacionario es q/p = ${fmt(est,4)}: hacia ahí converge siempre.`
    };
  },
  /* EDO de segundo orden, raíces reales distintas */
  () => {
    let r1, r2;
    do{ r1 = ent(3); r2 = ent(3); }while(r1 === r2);
    const y0 = eleg([1, 2, 0]), v0 = eleg([0, 1, -1, 2]);
    const b = -(r1+r2), c = r1*r2;
    const C1 = (v0 - r2*y0)/(r1 - r2);
    const C2 = y0 - C1;
    const T = eleg([0.5, 1]);
    const v = C1*Math.exp(r1*T) + C2*Math.exp(r2*T);
    return {
      id:"ma-cal-edo2",
      enunciado:`Resuelve <span class="clave">y″ ${b<0?"−":"+"} ${Math.abs(b)}y′ ${c<0?"−":"+"} ${Math.abs(c)}y = 0</span><br>con y(0) = ${y0}, y′(0) = ${v0}. Calcula <b>y(${T})</b>.`,
      sub:"4 decimales",
      valor:v, dec:4, tolRel:.005,
      nota:`Característica: r² ${b<0?"−":"+"} ${Math.abs(b)}r ${c<0?"−":"+"} ${Math.abs(c)} = 0 ⟹ r = ${r1}, ${r2}` +
           `<br>y = C₁e^(${r1}t) + C₂e^(${r2}t), con C₁ = ${fmt(C1,4)} y C₂ = ${fmt(C2,4)}` +
           `<br>y(${T}) = <b>${fmt(v)}</b>`
    };
  },
  /* entrada de la inversa 2x2 */
  () => {
    let a, b, c, d, det;
    do{ a = ent(5); b = ent(5); c = ent(5); d = ent(5); det = a*d - b*c; }while(det === 0);
    const cual = eleg([[0,0,d,"d"],[0,1,-b,"−b"],[1,0,-c,"−c"],[1,1,a,"a"]]);
    const v = cual[2]/det;
    return {
      id:"ma-cal-inv2",
      enunciado:`Sea A = ${matriz([[a,b],[c,d]])}<br>Calcula la entrada <span class="clave">(${cual[0]+1}, ${cual[1]+1})</span> de <b>A<sup>−1</sup></b>.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`A⁻¹ = (1/det)·[[d, −b], [−c, a]] con det = ${det}` +
           `<br>Entrada (${cual[0]+1},${cual[1]+1}) = ${cual[3]}/det = ${cual[2]}/${det} = <b>${fmt(v)}</b>` +
           `<br>Regla: intercambia la diagonal principal, cambia el signo de la otra, divide por el determinante.`
    };
  },
  /* proyección escalar */
  () => {
    const u = [ent(4), ent(4), ent(4)], w = [ent(4), ent(4), ent(4)];
    const uv = u[0]*w[0] + u[1]*w[1] + u[2]*w[2];
    const uu = u[0]*u[0] + u[1]*u[1] + u[2]*u[2];
    const v = uv/uu;
    return {
      id:"ma-cal-proy",
      enunciado:`u = (${u.join(", ")}) · v = (${w.join(", ")})<br>Calcula el <b>coeficiente</b> de la proyección de v sobre u, es decir (u·v)/(u·u).`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`u·v = ${uv} · u·u = ${uu}` +
           `<br>coeficiente = ${uv}/${uu} = <b>${fmt(v)}</b>` +
           `<br>La proyección completa es ese número por u. Es la misma fórmula que β = cov/var en regresión.`
    };
  },
  /* Taylor de segundo orden */
  () => {
    const x0 = eleg([0.1, 0.2, 0.5, -0.3]);
    const v = 1 + x0 + x0*x0/2;
    return {
      id:"ma-cal-taylor",
      enunciado:`Aproxima <span class="clave">e<sup>${x0}</sup></span> con el <b>polinomio de Taylor de grado 2</b> en a = 0.`,
      sub:"4 decimales · usa la aproximación, no la calculadora",
      valor:v, dec:4,
      nota:`e^x ≈ 1 + x + x²/2` +
           `<br>= 1 + ${x0} + ${fmt(x0*x0/2,4)} = <b>${fmt(v)}</b>` +
           `<br>Valor real: ${fmt(Math.exp(x0),4)} · error ${fmt(Math.abs(Math.exp(x0)-v),4)}. El error se dispara al alejarte de a = 0.`
    };
  },
  /* norma de un vector tras transformación: escalado de área */
  () => {
    let a, b, c, d, det;
    do{ a = ent(4); b = ent(4); c = ent(4); d = ent(4); det = a*d - b*c; }while(det === 0);
    const area = eleg([1, 2, 5, 10]);
    const v = Math.abs(det)*area;
    return {
      id:"ma-cal-area",
      enunciado:`La transformación A = ${matriz([[a,b],[c,d]])} se aplica a una figura de área <span class="clave">${area}</span>.<br>¿Cuál es el <b>área de la imagen</b>?`,
      sub:"entero",
      valor:v, dec:0,
      nota:`|det(A)| = |${det}| = ${Math.abs(det)} es el factor de escala de áreas.` +
           `<br>Área final = ${Math.abs(det)} · ${area} = <b>${v}</b>` +
           `<br>Si det fuera 0, la figura se aplastaría a un segmento y el área sería 0.`
    };
  },
  /* una iteración de Newton-Raphson para √k */
  () => {
    const k = eleg([2, 3, 5, 7, 10]);
    const x0 = Math.round(Math.sqrt(k));
    const v = x0 - (x0*x0 - k)/(2*x0);
    return {
      id:"ma-cal-newton",
      enunciado:`Aproxima <span class="clave">√${k}</span> con <b>una iteración</b> de Newton–Raphson sobre f(x) = x² − ${k}, partiendo de x₀ = ${x0}.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`x₁ = x₀ − f(x₀)/f′(x₀) = ${x0} − (${x0*x0} − ${k})/(${2*x0}) = <b>${fmt(v)}</b>` +
           `<br>Valor real: ${fmt(Math.sqrt(k),4)} · error ${fmt(Math.abs(Math.sqrt(k)-v),4)}. Una sola iteración y ya casi está.`
    };
  },
  /* integración por partes con seno */
  () => {
    const b = eleg([Math.PI, Math.PI/2]);
    const nom = b === Math.PI ? "π" : "π/2";
    const v = Math.sin(b) - b*Math.cos(b);
    return {
      id:"ma-cal-partestrig",
      enunciado:`Calcula <span class="clave">∫<sub>0</sub><sup>${nom}</sup> x·sen x dx</span>`,
      sub:"4 decimales",
      valor:v, dec:4, tolRel:.01,
      nota:`Por partes con u = x, dv = sen x dx ⟹ v = −cos x` +
           `<br>∫x·sen x dx = −x·cos x + ∫cos x dx = sen x − x·cos x` +
           `<br>Entre 0 y ${nom}: <b>${fmt(v)}</b>`
    };
  },
  /* determinante de una potencia */
  () => {
    let a, b, c, d, det;
    do{ a = ent(4); b = ent(4); c = ent(4); d = ent(4); det = a*d - b*c; }while(det === 0 || Math.abs(det) > 12);
    const p = eleg([2, 3]);
    const v = Math.pow(det, p);
    return {
      id:"ma-cal-detpot",
      enunciado:`Sea A = ${matriz([[a,b],[c,d]])}<br>Calcula <span class="clave">det(A<sup>${p}</sup>)</span>.`,
      sub:"entero",
      valor:v, dec:0,
      nota:`El determinante es multiplicativo: det(A^n) = det(A)^n.` +
           `<br>det(A) = ${det} ⟹ det(A^${p}) = ${det}^${p} = <b>${v}</b>` +
           `<br>No hace falta calcular A^${p}: sería mucho más trabajo para el mismo número.`
    };
  },
  /* Taylor de sen x de grado 3 */
  () => {
    const x0 = eleg([0.2, 0.5, 1, -0.4]);
    const v = x0 - x0*x0*x0/6;
    return {
      id:"ma-cal-taylorsen",
      enunciado:`Aproxima <span class="clave">sen(${x0})</span> con el polinomio de Taylor de <b>grado 3</b> en 0.`,
      sub:"4 decimales · x en radianes",
      valor:v, dec:4,
      nota:`sen x ≈ x − x³/6` +
           `<br>= ${x0} − ${fmt(x0*x0*x0/6,4)} = <b>${fmt(v)}</b>` +
           `<br>Real: ${fmt(Math.sin(x0),4)} · error ${fmt(Math.abs(Math.sin(x0)-v),5)}. La serie solo tiene potencias impares porque el seno es impar.`
    };
  },
  /* método de Euler, un paso */
  () => {
    const k = eleg([1, 2, -1, .5]), y0 = eleg([1, 2, 5]), h = eleg([.1, .2, .5]);
    const v = y0 + h*k*y0;
    const exacto = y0*Math.exp(k*h);
    return {
      id:"ma-cal-euler",
      enunciado:`Resuelve y′ = ${k}y con y(0) = ${y0} por el <b>método de Euler</b> con paso h = ${h}.<br>¿Cuánto vale la aproximación de <span class="clave">y(${h})</span>?`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`y₁ = y₀ + h·f(t₀,y₀) = ${y0} + ${h}·(${k}·${y0}) = <b>${fmt(v)}</b>` +
           `<br>Valor exacto: ${y0}·e^(${red(k*h,4)}) = ${fmt(exacto,4)} · error ${fmt(Math.abs(exacto-v),4)}` +
           `<br>Euler avanza en línea recta con la pendiente inicial: siempre se queda ${k>0?"corto":"largo"} en una exponencial.`
    };
  },
  /* proyección: norma de la componente */
  () => {
    const u = [ent(4), ent(4)], w = [ent(4), ent(4)];
    const uv = u[0]*w[0] + u[1]*w[1];
    const nu = Math.hypot(u[0], u[1]);
    const v = Math.abs(uv)/nu;
    return {
      id:"ma-cal-proynorma",
      enunciado:`u = (${u.join(", ")}) · v = (${w.join(", ")})<br>Calcula la <b>longitud de la proyección</b> de v sobre u.`,
      sub:"4 decimales",
      valor:v, dec:4,
      nota:`longitud = |u·v| / ‖u‖ = |${uv}| / ${fmt(nu,4)} = <b>${fmt(v)}</b>` +
           `<br>Es la sombra de v sobre la recta de u. El vector proyección completo es (u·v/u·u)·u.`
    };
  }
]
};

function maCalculo(nivel){
  let bolsa = PROB_MAT[nivel].slice();
  if(nivel >= 2) bolsa = bolsa.concat(PROB_MAT[1]);
  if(nivel === 3) bolsa = bolsa.concat(PROB_MAT[2]);
  const p = eleg(bolsa)();
  return {
    id:p.id, juego:"ma-calculo", etiqueta:"cálculo", tipo:"numero",
    enunciado:p.enunciado, sub:p.sub,
    valor:p.valor, dec:p.dec, tolRel:p.tolRel || .005,
    nota:p.nota
  };
}

/* --- 6. Verdadero o falso --- */
function maVF(nivel){
  const pool = porNivel(X().vf, nivel);
  const v = M.elegirPesado(pool, 1, x => "ma-vf-"+x.q)[0];
  const ops = ["✅ Verdadero","❌ Falso"];
  return {
    id:"ma-vf-"+v.q, juego:"ma-vf", etiqueta:"V/F", tipo:"opciones", cols:2,
    enunciado:v.q, sub:"¿verdadero o falso?",
    opciones:ops, ok: v.v ? 0 : 1,
    nota:`<b>${v.v ? "Verdadero" : "Falso"}.</b> ${v.nota}`
  };
}

/* --- 7. Método paso a paso --- */
function maSecuencia(nivel){
  /* hay pocas secuencias marcadas como fáciles: mejor abrir el banco que repetir */
  const pool = porNivel(X().secuencias, nivel, 16);
  const s = M.elegirPesado(pool, 1, x => "ma-sec-"+x.titulo)[0];
  let barajado = mez(s.pasos);
  let guarda = 0;
  while(barajado.join("|") === s.pasos.join("|") && guarda++ < 12) barajado = mez(s.pasos);
  return {
    id:"ma-sec-"+s.titulo, juego:"ma-secuencia", etiqueta:s.titulo, tipo:"ordenar", pasos:true,
    enunciado:`<span style="font-size:.75em">${s.titulo}</span>`,
    sub:"pon los pasos del método en el orden correcto",
    tokens:barajado,
    soluciones:[s.pasos.join(" ")],
    solucionLista:s.pasos,
    nota:s.pasos.map((p,i) => `<span class="paso"><b>${i+1}.</b> ${p}</span>`).join("") + `<br>💡 ${s.nota}`
  };
}

/* =====================================================================
   QUÍMICA
   ===================================================================== */

const QU = () => window.QUIMICA;

/* pool de elementos según nivel: fácil = los 36 primeros, medio = 86, difícil = todos */
function elemsNivel(nivel){
  const tope = nivel === 1 ? 36 : nivel === 2 ? 86 : 118;
  return QU().elementos.filter(e => e.z <= tope);
}

/* --- 1. Símbolo ⇄ nombre --- */
function quSimbolos(nivel){
  const pool = elemsNivel(nivel);
  const e = M.elegirPesado(pool, 1, x => "qu-sim-"+x.z)[0];
  const alReves = Math.random() < 0.5;
  const k = nOpciones(nivel) - 1;

  if(alReves){
    const distr = M.distractores(pool, e, k).map(x => x.s);
    const {opciones, ok} = barajarOps(e.s, distr);
    return {
      id:"qu-sim-"+e.z, juego:"qu-simbolos", etiqueta:e.n, tipo:"opciones", cols:3,
      enunciado:`<span class="grande">${e.n}</span>`, sub:"¿cuál es su símbolo químico?",
      opciones, ok, nota:`<b>${e.n} = ${e.s}</b> · Z = ${e.z} · ${e.m} u. ${e.d}`
    };
  }
  const distr = M.distractores(pool, e, k).map(x => x.n);
  const {opciones, ok} = barajarOps(e.n, distr);
  return {
    id:"qu-sim-"+e.z, juego:"qu-simbolos", etiqueta:e.s, tipo:"opciones",
    enunciado:`<span class="grande">${e.s}</span>`, sub:"¿qué elemento es?",
    opciones, ok, nota:`<b>${e.s} = ${e.n}</b> · Z = ${e.z} · ${e.m} u. ${e.d}`
  };
}

/* --- 2. Ficha del elemento (Z, masa, grupo, periodo, familia) --- */
function quDatos(nivel){
  const pool = elemsNivel(nivel);
  const e = M.elegirPesado(pool, 1, x => "qu-dat-"+x.z)[0];
  const k = nOpciones(nivel) - 1;
  const tipos = ["z", "masa", "periodo", "cat"];
  if(nivel >= 2) tipos.push("bloque", "estado");
  const t = eleg(tipos);

  if(t === "z"){
    if(nivel === 3){
      return {
        id:"qu-dat-z-"+e.z, juego:"qu-datos", etiqueta:e.n, tipo:"numero",
        enunciado:`<span class="grande">${e.s}</span>`, sub:`número atómico de ${e.n}`,
        valor:e.z, dec:0, tolRel:0,
        nota:`<b>Z = ${e.z}</b> · ${e.n}, periodo ${e.periodo}, ${e.grupo ? "grupo "+e.grupo : "bloque f"}.`
      };
    }
    const distr = M.distractores(pool, e, k).map(x => String(x.z));
    const {opciones, ok} = barajarOps(String(e.z), distr);
    return {
      id:"qu-dat-z-"+e.z, juego:"qu-datos", etiqueta:e.n, tipo:"opciones", cols:3,
      enunciado:`<span class="grande">${e.s}</span>`, sub:`¿cuál es el número atómico de ${e.n}?`,
      opciones, ok, nota:`<b>Z = ${e.z}</b>: tiene ${e.z} protones y, si es neutro, ${e.z} electrones.`
    };
  }

  if(t === "masa"){
    return {
      id:"qu-dat-m-"+e.z, juego:"qu-datos", etiqueta:e.n, tipo:"numero",
      enunciado:`<span class="grande">${e.s}</span>`, sub:`peso atómico de ${e.n} (u)`,
      valor:e.m, dec:3, tolRel:.006,
      nota:`<b>${e.n}: ${e.m} u</b>. Es la media ponderada de sus isótopos, por eso casi nunca sale un número redondo.`
    };
  }

  if(t === "periodo"){
    const distr = mez([1,2,3,4,5,6,7].filter(p => p !== e.periodo)).slice(0,k).map(String);
    const {opciones, ok} = barajarOps(String(e.periodo), distr);
    return {
      id:"qu-dat-p-"+e.z, juego:"qu-datos", etiqueta:e.n, tipo:"opciones", cols:3,
      enunciado:`<span class="grande">${e.s}</span>`, sub:`¿en qué periodo (fila) está ${e.n}?`,
      opciones, ok, nota:`<b>Periodo ${e.periodo}</b>: tiene ${e.periodo} capas electrónicas ocupadas. ${e.e}`
    };
  }

  if(t === "bloque"){
    const distr = ["s","p","d","f"].filter(b => b !== e.bloque).slice(0,k);
    const {opciones, ok} = barajarOps(e.bloque, distr);
    return {
      id:"qu-dat-b-"+e.z, juego:"qu-datos", etiqueta:e.n, tipo:"opciones", cols:2,
      enunciado:`<span class="grande">${e.s}</span>`, sub:`¿a qué bloque pertenece ${e.n}?`,
      opciones, ok, nota:`<b>Bloque ${e.bloque}</b> · ${e.e}. El bloque lo marca el último orbital que se llena.`
    };
  }

  if(t === "estado"){
    const distr = ["sólido","líquido","gas","sintético"].filter(x => x !== e.est).slice(0,k);
    const {opciones, ok} = barajarOps(e.est, distr);
    return {
      id:"qu-dat-e-"+e.z, juego:"qu-datos", etiqueta:e.n, tipo:"opciones", cols:2,
      enunciado:`<span class="grande">${e.s}</span>`, sub:`¿en qué estado está ${e.n} a 25 °C?`,
      opciones, ok, nota:`<b>${e.n}: ${e.est}</b>. ${e.d}`
    };
  }

  const cat = QU().CATEGORIAS[e.cat].nombre;
  const otras = mez(Object.values(QU().CATEGORIAS).map(c => c.nombre).filter(c => c !== cat)).slice(0,k);
  const {opciones, ok} = barajarOps(cat, otras);
  return {
    id:"qu-dat-c-"+e.z, juego:"qu-datos", etiqueta:e.n, tipo:"opciones",
    enunciado:`<span class="grande">${e.s}</span>`, sub:`¿a qué familia pertenece ${e.n}?`,
    opciones, ok, nota:`<b>${e.n} es un ${cat.toLowerCase()}</b>. ${e.d}`
  };
}

/* --- 3. Conceptos de la tabla --- */
function quConceptos(nivel){
  const pool = porNivel(QU().conceptos, nivel, 16);
  const c = M.elegirPesado(pool, 1, x => "qu-con-"+x.q)[0];
  const distr = mez(c.d).slice(0, nOpciones(nivel) - 1);
  const {opciones, ok} = barajarOps(c.r, distr);
  return {
    id:"qu-con-"+c.q, juego:"qu-conceptos", etiqueta:"concepto", tipo:"opciones",
    enunciado:c.q, opciones, ok, nota:`<b>${c.r}.</b> ${c.nota}`
  };
}

/* --- 4. Verdadero o falso --- */
function quVF(nivel){
  const pool = porNivel(QU().vf, nivel, 12);
  const v = M.elegirPesado(pool, 1, x => "qu-vf-"+x.q)[0];
  return {
    id:"qu-vf-"+v.q, juego:"qu-vf", etiqueta:"V/F", tipo:"opciones", cols:2,
    enunciado:v.q, sub:"¿verdadero o falso?",
    opciones:["✅ Verdadero","❌ Falso"], ok: v.v ? 0 : 1,
    nota:`<b>${v.v ? "Verdadero" : "Falso"}.</b> ${v.nota}`
  };
}

/* =====================================================================
   GEOGRAFÍA
   ===================================================================== */

const GE = () => window.GEOGRAFIA;

/* los países "grandes/conocidos" salen antes: se ordenan por continente
   y en nivel 1 se limita a los más habituales */
const GE_FACILES = ["Argentina","Bolivia","Brasil","Chile","Colombia","Ecuador","Perú","Uruguay","Venezuela","Paraguay",
  "México","Estados Unidos","Canadá","Cuba","Guatemala","Costa Rica","Panamá",
  "España","Portugal","Francia","Italia","Alemania","Reino Unido","Irlanda","Países Bajos","Bélgica","Suiza","Austria",
  "Grecia","Suecia","Noruega","Dinamarca","Finlandia","Polonia","Rusia","Ucrania","Turquía",
  "Marruecos","Egipto","Argelia","Nigeria","Kenia","Sudáfrica","Etiopía",
  "China","Japón","India","Corea del Sur","Indonesia","Tailandia","Vietnam","Israel","Arabia Saudí","Irán",
  "Australia","Nueva Zelanda"];

function paisesNivel(nivel){
  if(nivel === 1) return GE().paises.filter(p => GE_FACILES.indexOf(p.n) >= 0);
  if(nivel === 2) return GE().paises.filter(p => p.cont !== "Oceanía" || GE_FACILES.indexOf(p.n) >= 0);
  return GE().paises;
}

/* --- 1. Capitales, en las dos direcciones --- */
function geCapitales(nivel){
  const pool = paisesNivel(nivel);
  const p = M.elegirPesado(pool, 1, x => "ge-cap-"+x.id)[0];
  const k = nOpciones(nivel) - 1;
  const alReves = Math.random() < 0.4;

  if(nivel === 3 && !alReves){
    return {
      id:"ge-cap-"+p.id, juego:"ge-capitales", etiqueta:p.cont, tipo:"escribir",
      enunciado:`<span class="grande">${p.n}</span>`, sub:"escribe su capital",
      respuesta:p.cap, nota:`<b>${p.n} → ${p.cap}</b> · ${p.cont}.`
    };
  }
  if(alReves){
    const distr = M.distractores(pool, p, k).map(x => x.n);
    const {opciones, ok} = barajarOps(p.n, distr);
    return {
      id:"ge-cap-"+p.id, juego:"ge-capitales", etiqueta:p.cont, tipo:"opciones",
      enunciado:`<span class="grande">${p.cap}</span>`, sub:"¿de qué país es capital?",
      opciones, ok, nota:`<b>${p.cap} es la capital de ${p.n}</b> (${p.cont}).`
    };
  }
  const distr = M.distractores(pool, p, k).map(x => x.cap);
  const {opciones, ok} = barajarOps(p.cap, distr);
  return {
    id:"ge-cap-"+p.id, juego:"ge-capitales", etiqueta:p.cont, tipo:"opciones",
    enunciado:`<span class="grande">${p.n}</span>`, sub:"¿cuál es su capital?",
    opciones, ok, nota:`<b>${p.n} → ${p.cap}</b> · ${p.cont}.`
  };
}

/* Banderas que a este tamaño son indistinguibles: nunca deben coincidir en la
   misma pregunta, o habría dos opciones válidas. */
const GE_GEMELAS = {
  "Indonesia":["Mónaco"], "Mónaco":["Indonesia"],
  "Chad":["Rumanía"],     "Rumanía":["Chad"]
};

/* --- 2. Banderas --- */
function geBanderas(nivel){
  const pool = paisesNivel(nivel);
  const p = M.elegirPesado(pool, 1, x => "ge-ban-"+x.id)[0];
  const k = nOpciones(nivel) - 1;
  const alReves = Math.random() < 0.45;

  /* descarta las gemelas y cualquiera con la bandera literalmente igual */
  const gemelas = GE_GEMELAS[p.n] || [];
  const mia = JSON.stringify(p.b);
  const limpio = pool.filter(x => x.id !== p.id &&
                                  gemelas.indexOf(x.n) < 0 &&
                                  JSON.stringify(x.b) !== mia);

  if(alReves){
    /* dado el país, elegir la bandera */
    const otros = mez(limpio).slice(0, k);
    const todos = mez([p, ...otros]);
    return {
      id:"ge-ban-"+p.id, juego:"ge-banderas", etiqueta:p.cont, tipo:"opciones",
      cols: todos.length <= 4 ? 2 : 3,
      enunciado:`<span class="grande">${p.n}</span>`, sub:"¿cuál es su bandera?",
      opciones: todos.map(x => Especiales.bandera(x.b, "bandera bandera-op")),
      ok: todos.indexOf(p),
      nota:`Esa es la bandera de <b>${p.n}</b>. Capital: ${p.cap}.`
    };
  }
  const distr = mez(limpio).slice(0, k).map(x => x.n);
  const {opciones, ok} = barajarOps(p.n, distr);
  return {
    id:"ge-ban-"+p.id, juego:"ge-banderas", etiqueta:p.cont, tipo:"opciones",
    enunciado: Especiales.bandera(p.b, "bandera bandera-xl"),
    sub:"¿de qué país es esta bandera?",
    opciones, ok, nota:`<b>${p.n}</b> · capital ${p.cap} · ${p.cont}.`
  };
}

/* --- 3. Continentes y ubicación --- */
function geContinentes(nivel){
  const pool = paisesNivel(nivel);
  const p = M.elegirPesado(pool, 1, x => "ge-con-"+x.id)[0];
  const k = Math.min(nOpciones(nivel) - 1, 5);
  const conts = GE().CONTINENTES.map(c => c.id);
  const distr = mez(conts.filter(c => c !== p.cont)).slice(0, k);
  const {opciones, ok} = barajarOps(p.cont, distr);
  const hemi = p.lat >= 0 ? "norte" : "sur";
  return {
    id:"ge-con-"+p.id, juego:"ge-continentes", etiqueta:"ubicación", tipo:"opciones",
    enunciado:`<span class="grande">${p.n}</span>`, sub:"¿en qué continente está?",
    opciones, ok,
    nota:`<b>${p.n}</b> está en ${p.cont}, hemisferio ${hemi}. Su capital es ${p.cap}.`
  };
}

/* --- 4. Conceptos de geografía --- */
function geConceptos(nivel){
  const pool = porNivel(GE().conceptos, nivel, 14);
  const c = M.elegirPesado(pool, 1, x => "ge-cpt-"+x.q)[0];
  const distr = mez(c.d).slice(0, nOpciones(nivel) - 1);
  const {opciones, ok} = barajarOps(c.r, distr);
  return {
    id:"ge-cpt-"+c.q, juego:"ge-conceptos", etiqueta:"mundo", tipo:"opciones",
    enunciado:c.q, opciones, ok, nota:`<b>${c.r}.</b> ${c.nota}`
  };
}

/* --- 5. Verdadero o falso --- */
function geVF(nivel){
  const pool = porNivel(GE().vf, nivel, 12);
  const v = M.elegirPesado(pool, 1, x => "ge-vf-"+x.q)[0];
  return {
    id:"ge-vf-"+v.q, juego:"ge-vf", etiqueta:"V/F", tipo:"opciones", cols:2,
    enunciado:v.q, sub:"¿verdadero o falso?",
    opciones:["✅ Verdadero","❌ Falso"], ok: v.v ? 0 : 1,
    nota:`<b>${v.v ? "Verdadero" : "Falso"}.</b> ${v.nota}`
  };
}

/* =====================================================================
   CATÁLOGO
   ===================================================================== */

const MUNDOS = [
  {id:"aleman", nombre:"Alemán", emo:"🇩🇪", color:"var(--de)",
   desc:"14 lecciones · de A0 a A1 completo. Género, casos, orden de la frase y Perfekt."},
  {id:"arabe", nombre:"Árabe fusha", emo:"🇸🇦", color:"var(--ar)",
   desc:"18 lecciones · alfabeto completo, vocalización, artículo y primer verbo."},
  {id:"finanzas", nombre:"Finanzas cuantitativas", emo:"📈", color:"var(--fi)",
   desc:"Shreve Vol. I y II · del árbol binomial a Black–Scholes, Girsanov y saltos."},
  {id:"matematicas", nombre:"Matemáticas", emo:"🧮", color:"var(--ma)",
   desc:"Derivadas, integrales, ecuaciones diferenciales y álgebra lineal. La caja de herramientas de todo lo demás."},
  {id:"quimica", nombre:"Química", emo:"⚗️", color:"var(--qu)",
   desc:"Los 118 elementos y la lógica de la tabla periódica: periodicidad, enlaces y configuración electrónica."},
  {id:"geografia", nombre:"Geografía", emo:"🌍", color:"var(--ge)",
   desc:"Países, capitales, banderas y continentes. Todo lo que hay en el atlas, en formato duelo."}
];

const JUEGOS = [
  /* --- alemán --- */
  {id:"de-genero",    mundo:"aleman", emo:"🎯", nombre:"Der · Die · Das",
   desc:"El terror del alemán, a contrarreloj. Acierta el género antes de que se acabe el tiempo.", gen:deGenero},
  {id:"de-conjug",    mundo:"aleman", emo:"⚡", nombre:"Conjugación relámpago",
   desc:"Pronombre + verbo → forma correcta. En difícil se escribe a mano.", gen:deConjug},
  {id:"de-vocab",     mundo:"aleman", emo:"📖", nombre:"Vocabulario",
   desc:"Español ⇄ alemán en las dos direcciones, que es lo que de verdad fija.", gen:deVocab},
  {id:"de-frase",     mundo:"aleman", emo:"🧩", nombre:"Arma la frase",
   desc:"Coloca las piezas: verbo en 2ª posición, TeKaMoLo y paréntesis verbal.", gen:deFrase},
  {id:"de-gramatica", mundo:"aleman", emo:"⚔️", nombre:"Casos y reglas",
   desc:"Akkusativ, Dativ, nicht vs kein, modales, Perfekt y separables.", gen:deGramatica},

  /* --- árabe --- */
  {id:"ar-letras",    mundo:"arabe", emo:"🗺️", nombre:"Caza la letra",
   desc:"Te doy el nombre y el sonido; encuentra la letra en la rejilla. Como el juego de las capitales.", gen:arLetras},
  {id:"ar-formas",    mundo:"arabe", emo:"🔗", nombre:"Formas conectadas",
   desc:"Inicial, medial o final: la misma letra con distinto gancho.", gen:arFormas},
  {id:"ar-lectura",   mundo:"arabe", emo:"👁️", nombre:"Lectura vocalizada",
   desc:"Harakat, sukun, shadda y tanwin. Descífralo tal cual suena.", gen:arLectura},
  {id:"ar-solar",     mundo:"arabe", emo:"🌞", nombre:"Solar o lunar",
   desc:"Se escribe siempre الـ, pero ¿se dice al- o se funde? Duelo de velocidad.", gen:arSolar},
  {id:"ar-vocab",     mundo:"arabe", emo:"💬", nombre:"Vocabulario y frases",
   desc:"Las 100 primeras palabras y las frases hechas de cortesía.", gen:arVocab},
  {id:"ar-gramatica", mundo:"arabe", emo:"🏛️", nombre:"Gramática y verbos",
   desc:"Frase nominal, género, demostrativos, números, colores y el pasado.", gen:arGramatica},

  /* --- finanzas --- */
  {id:"fi-conceptos", mundo:"finanzas", emo:"🧠", nombre:"Conceptos clave",
   desc:"Arbitraje, martingala, Girsanov, Feynman–Kac, numerario… capítulo por capítulo.", gen:fiConceptos},
  {id:"fi-formulas",  mundo:"finanzas", emo:"🔣", nombre:"Fórmula rota",
   desc:"Falta una pieza en la fórmula. Complétala antes de que suene la campana.", gen:fiFormulas},
  {id:"fi-calculo",   mundo:"finanzas", emo:"🧮", nombre:"Sala de cálculo",
   desc:"Problemas numéricos generados al azar: p̃, delta, Black–Scholes, Vasicek, barreras. Nunca se repiten.", gen:fiCalculo},
  {id:"fi-vf",        mundo:"finanzas", emo:"⚖️", nombre:"Verdadero o falso",
   desc:"Afirmaciones que suenan bien pero no siempre lo son. Ronda rápida.", gen:fiVF},
  {id:"fi-secuencia", mundo:"finanzas", emo:"🪜", nombre:"Secuencia lógica",
   desc:"Ordena los pasos de una deducción completa. Aquí se ve si entendiste el argumento.", gen:fiSecuencia},

  /* --- matemáticas --- */
  {id:"ma-derivadas",  mundo:"matematicas", emo:"📉", nombre:"Derivadas",
   desc:"La tabla completa más las reglas del producto, cociente y cadena. En difícil, también al revés.", gen:maDerivadas},
  {id:"ma-integrales", mundo:"matematicas", emo:"∫", nombre:"Integrales",
   desc:"Primitivas de memoria y la decisión que importa: ¿sustitución, partes o fracciones parciales?", gen:maIntegrales},
  {id:"ma-edo",        mundo:"matematicas", emo:"🌀", nombre:"Ecuaciones diferenciales",
   desc:"Clasificar, elegir método y reconocer la forma de la solución. Primer y segundo orden, y EDP.", gen:maEDO},
  {id:"ma-lineal",     mundo:"matematicas", emo:"🧱", nombre:"Álgebra lineal",
   desc:"Rango, determinantes, inversas, autovalores, diagonalización y descomposiciones.", gen:maLineal},
  {id:"ma-calculo",    mundo:"matematicas", emo:"🧮", nombre:"Sala de cálculo",
   desc:"Problemas numéricos generados al azar: derivadas, integrales definidas, EDO y matrices. Nunca se repiten.", gen:maCalculo},
  {id:"ma-vf",         mundo:"matematicas", emo:"⚖️", nombre:"Verdadero o falso",
   desc:"Afirmaciones que suenan razonables y no lo son. Aquí se cazan las intuiciones falsas.", gen:maVF},
  {id:"ma-secuencia",  mundo:"matematicas", emo:"🪜", nombre:"Método paso a paso",
   desc:"Ordena las etapas de un método completo: factor integrante, por partes, diagonalizar, Gram–Schmidt.", gen:maSecuencia},

  /* --- química --- */
  {id:"qu-simbolos",  mundo:"quimica", emo:"🔤", nombre:"Símbolo ⇄ nombre",
   desc:"Del símbolo al nombre y del nombre al símbolo. Fácil llega al 36, difícil abarca los 118.", gen:quSimbolos},
  {id:"qu-datos",     mundo:"quimica", emo:"🎫", nombre:"Ficha del elemento",
   desc:"Número atómico, peso, periodo, bloque, estado y familia. En difícil, el peso se escribe a mano.", gen:quDatos},
  {id:"qu-conceptos", mundo:"quimica", emo:"🧠", nombre:"Cómo funciona la tabla",
   desc:"Periodicidad, radios, electronegatividad, orbitales, enlaces y moles.", gen:quConceptos},
  {id:"qu-vf",        mundo:"quimica", emo:"⚖️", nombre:"Verdadero o falso",
   desc:"Las trampas clásicas de química: el hidrógeno, los isótopos, el osmio y el cobre.", gen:quVF},

  /* --- geografía --- */
  {id:"ge-capitales",   mundo:"geografia", emo:"🏛️", nombre:"Capitales",
   desc:"País → capital y capital → país. En difícil se escribe la capital de memoria.", gen:geCapitales},
  {id:"ge-banderas",    mundo:"geografia", emo:"🚩", nombre:"Banderas",
   desc:"Reconoce la bandera y elige el país, o al revés. Dibujadas una a una.", gen:geBanderas},
  {id:"ge-continentes", mundo:"geografia", emo:"🧭", nombre:"¿Dónde está?",
   desc:"Coloca cada país en su continente. La base para no perderse en el mapa.", gen:geContinentes},
  {id:"ge-conceptos",   mundo:"geografia", emo:"🌐", nombre:"El mundo en datos",
   desc:"Ríos, cordilleras, océanos, coordenadas y récords geográficos.", gen:geConceptos},
  {id:"ge-vf",          mundo:"geografia", emo:"⚖️", nombre:"Verdadero o falso",
   desc:"Las confusiones típicas: Sídney, Estambul, Río, Zúrich y Toronto.", gen:geVF}
];

function porId(id){ return JUEGOS.find(j => j.id === id); }

/* Modo repaso: mezcla juegos donde tengas ítems flojos */
function genRepaso(nivel){
  const flojos = M.itemsFlojos();
  if(!flojos.length) return null;
  const juegosConDeuda = [...new Set(flojos.map(f => f.ju))].filter(Boolean);
  const jid = eleg(juegosConDeuda.length ? juegosConDeuda : JUEGOS.map(j=>j.id));
  const j = porId(jid);
  return j ? j.gen(nivel) : null;
}

return {MUNDOS, JUEGOS, porId, genRepaso};

})();
