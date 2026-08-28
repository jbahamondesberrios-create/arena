/* ============================================================
   GENERAR CUADERNOS

   Los cinco cuadernos del MicroMasters se escriben en la carpeta de su
   curso (Desktop/Joaquín/Finanzas/estudios/MIT program/…) y desde allí se
   publican como Artifact. Esos archivos son FRAGMENTOS: empiezan por
   <title> y no traen <html>, <head> ni <body>, porque el Artifact los
   envuelve al publicarlos.

   Para servirlos desde La Arena hay que envolverlos aquí. Sin <meta
   charset> el navegador los abre con la codificación del sistema y todas
   las tildes se rompen — eso es lo que arregla este guion, además de
   añadir la barra para volver al dojo.

   La fuente de verdad sigue siendo el archivo del curso: si se edita un
   cuaderno, se vuelve a correr esto y se sube VERSION en sw.js.

       node herramientas/generar-cuadernos.js

   ============================================================ */

const fs = require("fs");
const path = require("path");

const RAIZ    = path.resolve(__dirname, "..");
const DESTINO = path.join(RAIZ, "cuadernos");
const ORIGEN  = path.resolve(RAIZ, "..", "Finanzas", "estudios", "MIT program");

/* Cada cuaderno: de dónde sale y cómo se llama aquí. El orden es el de
   estudio recomendado del programa, no el de las carpetas. */
const CUADERNOS = [
  {salida:"15516x-contabilidad.html",
   fuente:"03 - 15.516x Financial Accounting/Resumen-15516x-Contabilidad.html"},
  {salida:"154151x-fundamentos-i.html",
   fuente:"01 - 15.415.1x Foundations of Modern Finance I/Resumen-154151x-Fundamentos-I.html"},
  {salida:"154152x-fundamentos-ii.html",
   fuente:"02 - 15.415.2x Foundations of Modern Finance II/Resumen-154152x-Fundamentos-II.html"},
  {salida:"15455x-metodos-matematicos.html",
   fuente:"04 - 15.455x Mathematical Methods for Quantitative Finance/Resumen-15455x-Metodos-Matematicos.html"},
  {salida:"15435x-derivados.html",
   fuente:"05 - 15.435x Derivatives Markets/Resumen-15435x-Derivados.html"}
];

/* La barra de volver es sticky, así que hay que bajar el índice lateral
   del cuaderno, que también lo es y vive en top:0. Todo lo que toca este
   bloque lleva el prefijo `arena-` para no chocar con los estilos del
   cuaderno, que son suyos y no se tocan. */
const ALTO = 46;

const ESTILO = `
<style id="arena-barra-estilo">
  .arena-volver{
    position:sticky; top:0; z-index:9999;
    display:flex; align-items:center; gap:10px;
    height:${ALTO}px; padding:0 18px;
    background:#12243f; color:#e6f1fd;
    font-family:"Segoe UI",system-ui,-apple-system,Roboto,sans-serif;
    font-size:13.5px; box-shadow:0 1px 0 rgba(0,0,0,.25);
  }
  .arena-volver a{
    color:#e6f1fd; text-decoration:none; font-weight:600;
    display:inline-flex; align-items:center; gap:7px;
    padding:5px 12px; border-radius:99px; border:1px solid rgba(230,241,253,.28);
    transition:.15s;
  }
  .arena-volver a:hover{ background:rgba(230,241,253,.14); }
  .arena-volver .arena-curso{ color:rgba(230,241,253,.62); font-size:12.5px; }
  @media print{ .arena-volver{ display:none; } }

  /* el índice del cuaderno también es sticky: se baja para que no quede
     tapado por la barra */
  nav.toc{ top:${ALTO}px !important; max-height:calc(100vh - ${ALTO}px) !important; }
</style>`;

function barra(codigo){
  return `<div class="arena-volver">
  <a href="../index.html#cuadernos">← La Arena</a>
  <span class="arena-curso">MITx MicroMasters in Finance · ${codigo}</span>
</div>`;
}

/* El fragmento empieza por <title>…</title>; lo que va desde ahí hasta el
   cierre de </style> es cabecera, y el resto es cuerpo. */
function partir(html){
  const fin = html.lastIndexOf("</style>");
  if(fin < 0) throw new Error("no encuentro el </style> de cierre");
  return {cabeza: html.slice(0, fin + 8), cuerpo: html.slice(fin + 8)};
}

function titulo(html){
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? m[1].trim() : "Cuaderno";
}

function codigo(html){
  const m = html.match(/<title>\s*Cuaderno\s+([0-9.a-zA-Z]+)/);
  return m ? m[1] : "";
}

function envolver(html){
  const {cabeza, cuerpo} = partir(html);
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#12243f">
<link rel="icon" href="../iconos/icono-192.png">
${cabeza}
${ESTILO}
</head>
<body>
${barra(codigo(html))}
${cuerpo.trim()}
</body>
</html>
`;
}

/* ---------------------------------------------------------------- */
function main(){
  if(!fs.existsSync(DESTINO)) fs.mkdirSync(DESTINO, {recursive:true});

  let ok = 0;
  CUADERNOS.forEach(c => {
    const orig = path.join(ORIGEN, c.fuente);
    if(!fs.existsSync(orig)){
      console.log(`  ✗ falta: ${c.fuente}`);
      return;
    }
    const html = fs.readFileSync(orig, "utf8");
    const salida = envolver(html);
    fs.writeFileSync(path.join(DESTINO, c.salida), salida, "utf8");
    console.log(`  ✓ ${c.salida.padEnd(34)} ${titulo(html).padEnd(20)} ${(salida.length/1024).toFixed(0)} KB`);
    ok++;
  });
  console.log(`\n${ok} de ${CUADERNOS.length} cuadernos generados en cuadernos/`);
  if(ok) console.log("Recuerda subir VERSION en sw.js.");
}

main();
