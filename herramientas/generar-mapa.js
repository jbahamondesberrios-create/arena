/* Uso:
     curl -L -o countries-50m.json https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json
     node herramientas/generar-mapa.js datos/mapa-mundi.js

   Genera datos/mapa-mundi.js: contornos SVG de cada país (proyección
   equirectangular 720×360) a partir de world-atlas 50m (Natural Earth, dominio
   público). Se simplifica a nivel de ARCO topológico para que las fronteras
   compartidas encajen exactamente. */
const fs = require("fs");
const topo = require(require("path").resolve("countries-50m.json"));

global.window = {};
require(require("path").resolve("datos/geografia.js"));
const PAISES = new Set(window.GEOGRAFIA.paises.map(p => p.n));

/* ---------- nombres Natural Earth -> nombres del juego ---------- */
const MAP = {
"Brazil":"Brasil","Peru":"Perú","Suriname":"Surinam","Belize":"Belice","Canada":"Canadá",
"United States of America":"Estados Unidos","Grenada":"Granada","Haiti":"Haití","Mexico":"México",
"Panama":"Panamá","Dominican Rep.":"República Dominicana","St. Kitts and Nevis":"San Cristóbal y Nieves",
"St. Vin. and Gren.":"San Vicente y las Granadinas","Saint Lucia":"Santa Lucía",
"Trinidad and Tobago":"Trinidad y Tobago","Antigua and Barb.":"Antigua y Barbuda",
"Germany":"Alemania","Belgium":"Bélgica","Belarus":"Bielorrusia","Bosnia and Herz.":"Bosnia y Herzegovina",
"Czechia":"Chequia","Cyprus":"Chipre","Vatican":"Ciudad del Vaticano","Croatia":"Croacia",
"Denmark":"Dinamarca","Slovakia":"Eslovaquia","Slovenia":"Eslovenia","Spain":"España",
"Finland":"Finlandia","France":"Francia","Greece":"Grecia","Hungary":"Hungría","Ireland":"Irlanda",
"Iceland":"Islandia","Italy":"Italia","Latvia":"Letonia","Lithuania":"Lituania","Luxembourg":"Luxemburgo",
"Macedonia":"Macedonia del Norte","Moldova":"Moldavia","Monaco":"Mónaco","Norway":"Noruega",
"Netherlands":"Países Bajos","Poland":"Polonia","United Kingdom":"Reino Unido","Romania":"Rumanía",
"Russia":"Rusia","Sweden":"Suecia","Switzerland":"Suiza","Ukraine":"Ucrania",
"Algeria":"Argelia","Benin":"Benín","Botswana":"Botsuana","Cameroon":"Camerún","Comoros":"Comoras",
"Côte d'Ivoire":"Costa de Marfil","Egypt":"Egipto","eSwatini":"Esuatini","Ethiopia":"Etiopía",
"Gabon":"Gabón","Guinea-Bissau":"Guinea-Bisáu","Eq. Guinea":"Guinea Ecuatorial","Kenya":"Kenia",
"Lesotho":"Lesoto","Libya":"Libia","Malawi":"Malaui","Morocco":"Marruecos","Mauritius":"Mauricio",
"Niger":"Níger","Central African Rep.":"República Centroafricana","Congo":"República del Congo",
"Dem. Rep. Congo":"República Democrática del Congo","Rwanda":"Ruanda",
"São Tomé and Principe":"Santo Tomé y Príncipe","Sierra Leone":"Sierra Leona","South Africa":"Sudáfrica",
"Sudan":"Sudán","S. Sudan":"Sudán del Sur","Tunisia":"Túnez","Djibouti":"Yibuti","Zimbabwe":"Zimbabue",
"Afghanistan":"Afganistán","Saudi Arabia":"Arabia Saudí","Azerbaijan":"Azerbaiyán","Bangladesh":"Bangladés",
"Bahrain":"Baréin","Myanmar":"Birmania (Myanmar)","Brunei":"Brunéi","Bhutan":"Bután","Cambodia":"Camboya",
"Qatar":"Catar","North Korea":"Corea del Norte","South Korea":"Corea del Sur",
"United Arab Emirates":"Emiratos Árabes Unidos","Philippines":"Filipinas","Iraq":"Irak","Iran":"Irán",
"Japan":"Japón","Jordan":"Jordania","Kazakhstan":"Kazajistán","Kyrgyzstan":"Kirguistán","Lebanon":"Líbano",
"Malaysia":"Malasia","Maldives":"Maldivas","Oman":"Omán","Pakistan":"Pakistán","Palestine":"Palestina",
"Singapore":"Singapur","Syria":"Siria","Thailand":"Tailandia","Taiwan":"Taiwán","Tajikistan":"Tayikistán",
"Timor-Leste":"Timor Oriental","Turkmenistan":"Turkmenistán","Turkey":"Turquía","Uzbekistan":"Uzbekistán",
"Fiji":"Fiyi","Marshall Is.":"Islas Marshall","Solomon Is.":"Islas Salomón","New Zealand":"Nueva Zelanda",
"Palau":"Palaos","Papua New Guinea":"Papúa Nueva Guinea"
};
/* territorios que Natural Earth cuelga de una metrópoli pero que en el mapa del
   juego no deben pintarse con el color de ese país (quedan como tierra neutra) */
const RECORTE = {
  "Francia":  [[-20,40,25,55]],            // solo Europa continental + Córcega
  "Países Bajos":[[-10,45,15,56]],
  "Reino Unido":[[-25,45,10,65]]
};

/* ---------- decodificar topojson ---------- */
const {scale:[sx,sy], translate:[tx,ty]} = topo.transform;
const arcs = topo.arcs.map(arc => {
  let x = 0, y = 0;
  return arc.map(d => { x += d[0]; y += d[1]; return [x*sx+tx, y*sy+ty]; });
});

/* ---------- simplificación Douglas-Peucker por arco ---------- */
const TOL = 0.055;                 // en grados de longitud/latitud
function dp(pts, tol){
  if(pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length-1] = 1;
  const pila = [[0, pts.length-1]];
  while(pila.length){
    const [a, b] = pila.pop();
    let peor = 0, idx = -1;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx-ax, dy = by-ay, len = Math.hypot(dx, dy);
    for(let i = a+1; i < b; i++){
      const [px, py] = pts[i];
      const d = len < 1e-12
        ? Math.hypot(px-ax, py-ay)
        : Math.abs(dy*px - dx*py + bx*ay - by*ax) / len;
      if(d > peor){ peor = d; idx = i; }
    }
    if(peor > tol && idx > 0){ keep[idx] = 1; pila.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const simples = arcs.map(a => dp(a, TOL));

function anillo(indices){
  const pts = [];
  indices.forEach(i => {
    const inv = i < 0;
    const arc = simples[inv ? ~i : i];
    const trozo = inv ? arc.slice().reverse() : arc;
    trozo.forEach((p, k) => { if(k || !pts.length) pts.push(p); });
  });
  return pts;
}

/* ---------- proyección y utilidades ---------- */
const PX = lon => (lon + 180) * 2;
const PY = lat => (90 - lat) * 2;
const area = r => {                                  // área con signo, en px²
  let s = 0;
  for(let i = 0, j = r.length-1; i < r.length; j = i++)
    s += (PX(r[j][0]) * PY(r[i][1])) - (PX(r[i][0]) * PY(r[j][1]));
  return s / 2;
};
const AREA_MIN = 0.03;                               // px² — islotes irrelevantes
const dentroCaja = (r, cajas) => {
  const lon = r.reduce((a,p) => a+p[0], 0) / r.length;
  const lat = r.reduce((a,p) => a+p[1], 0) / r.length;
  return cajas.some(c => lon >= c[0] && lat >= c[1] && lon <= c[2] && lat <= c[3]);
};
/* Rusia y Fiyi tienen anillos que saltan de +180° a -180°. Sin partirlos, el
   salto se dibuja como una banda que cruza el mapa entero. */
function partir(r){
  const trozos = [[]];
  r.forEach((p, i) => {
    if(i && Math.abs(p[0] - r[i-1][0]) > 150) trozos.push([]);
    trozos[trozos.length-1].push(p);
  });
  return trozos.filter(t => t.length >= 3);
}
const aPath = anillos => anillos.flatMap(partir).map(r =>
  "M" + r.map(p => `${PX(p[0]).toFixed(1)} ${PY(p[1]).toFixed(1)}`).join("L") + "Z").join("");

/* ---------- recorrer geometrías ---------- */
const porPais = {};      // nombre español -> [anillos]
const neutros = [];      // tierra sin país jugable
const SIN_TIERRA = new Set(["Antarctica"]);   // se pinta aparte, opcional

topo.objects.countries.geometries.forEach(g => {
  const en = g.properties.name;
  const es = MAP[en] || en;
  const listas = g.type === "Polygon" ? [g.arcs] : g.arcs;
  let anillos = [];
  listas.forEach(poly => poly.forEach((idx, k) => {
    const r = anillo(idx);
    if(r.length < 4) return;
    if(k > 0) return;                     // huecos: se ignoran (Lesoto etc. van encima)
    if(Math.abs(area(r)) < AREA_MIN) return;
    anillos.push(r);
  }));
  if(!anillos.length) return;
  if(SIN_TIERRA.has(en)) return;

  if(PAISES.has(es)){
    const caja = RECORTE[es];
    if(caja){
      const fuera = anillos.filter(r => !dentroCaja(r, caja));
      anillos = anillos.filter(r => dentroCaja(r, caja));
      neutros.push(...fuera);
    }
    porPais[es] = (porPais[es] || []).concat(anillos);
  }else{
    neutros.push(...anillos);
  }
});

/* ---------- salida ---------- */
const faltan = [...PAISES].filter(n => !porPais[n]);
const areaDe = n => porPais[n].reduce((s, r) => s + Math.abs(area(r)), 0);
/* de mayor a menor: los enclaves (Lesoto, San Marino) se pintan encima */
const orden = Object.keys(porPais).sort((a, b) => areaDe(b) - areaDe(a));
const paisesTxt = orden.map(n => `"${n}":"${aPath(porPais[n])}"`).join(",\n");
/* superficie dibujada, en px²: sirve para decidir a qué zoom un país es tan
   pequeño que necesita además un punto para poder verlo y tocarlo */
const areasTxt = orden.map(n => `"${n}":${areaDe(n).toFixed(2)}`).join(",");
/* caja del trozo más grande de cada país (la masa principal, sin islas
   lejanas): con ella el zoom de un continente no corta la Patagonia */
const cajaTxt = orden.map(n => {
  const r = porPais[n].reduce((a, b) => Math.abs(area(b)) > Math.abs(area(a)) ? b : a);
  const xs = r.map(p => PX(p[0])), ys = r.map(p => PY(p[1]));
  return `"${n}":[${Math.min(...xs).toFixed(0)},${Math.min(...ys).toFixed(0)},`+
         `${Math.max(...xs).toFixed(0)},${Math.max(...ys).toFixed(0)}]`;
}).join(",");
const micro = orden.filter(n => areaDe(n) < 2.5).concat(faltan).sort();

const out = `/* ============================================================
   MAPA MUNDI · contornos de países
   Generado desde Natural Earth 1:50m (dominio público) en proyección
   equirectangular sobre un lienzo de 720 × 360:  x = (lon+180)*2,
   y = (90-lat)*2.  Las fronteras compartidas encajan exactamente porque
   la simplificación se hizo sobre los arcos topológicos.
   ============================================================ */
window.MAPA_MUNDI = {
  ancho: 720, alto: 360,
  /* tierra sin país jugable (Groenlandia, Sáhara Occidental, territorios…) */
  otros: "${aPath(neutros)}",
  /* países sin contorno propio a esta escala: solo se marcan con un punto */
  sinContorno: ${JSON.stringify(faltan)},
  /* superficie dibujada de cada país, en px² del lienzo */
  areas: {${areasTxt}},
  /* caja [x0,y0,x1,y1] de su masa principal */
  cajas: {${cajaTxt}},
  /* de mayor a menor superficie: así los enclaves quedan encima */
  paises: {
${paisesTxt}
  }
};
`;
fs.writeFileSync(process.argv[2], out);
console.log("bytes:", out.length, "| países:", orden.length,
  "| sin contorno:", faltan.join(", ") || "ninguno", "\n| micro:", micro.join(", "));
