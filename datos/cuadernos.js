/* ============================================================
   CUADERNOS DEL MICROMASTERS (MITx Finance)

   Los cinco resúmenes de curso que se leen enteros, fuera del motor de
   juego: cada uno es una página propia en cuadernos/, generada desde el
   archivo original del curso con herramientas/generar-cuadernos.js.

   Aquí solo va la ficha que se ve en el índice. El orden es el de
   ESTUDIO recomendado del programa, que no coincide con el número de
   carpeta: Contabilidad no tiene prerrequisitos y va primero.

   `id` se usa como clave de leído en Motor.leidos, así que no se cambia.
   ============================================================ */

window.CUADERNOS = [

  {
    id:"cuad-15516x",
    cod:"15.516x",
    t:"Contabilidad financiera",
    emo:"📗",
    color:"#8f2b2b",
    prof:"John Core",
    modulos:10, ejemplos:24, retos:10, min:66,
    orden:1,
    pre:"Sin prerrequisitos",
    res:"Cómo se construyen y se leen los estados financieros, y sobre todo cómo sacar de ahí los insumos de los modelos de valoración de los otros cursos.",
    temas:["Devengo y ecuación del balance","Ingresos, inventarios y activo fijo","Flujo de efectivo e intangibles",
           "Adquisiciones y goodwill","Ratios, DuPont e impuestos diferidos","Deuda, leasing, patrimonio y EPS"],
    arch:"cuadernos/15516x-contabilidad.html",
    url:"https://claude.ai/code/artifact/3a44700b-57b4-48a0-8f89-4f3ea4064c12"
  },

  {
    id:"cuad-154151x",
    cod:"15.415.1x",
    t:"Fundamentos de finanzas modernas I",
    emo:"📐",
    color:"#26468c",
    prof:"Kogan y Wang",
    modulos:10, ejemplos:19, retos:10, min:59,
    orden:2,
    pre:"Cálculo y álgebra lineal",
    res:"La base de todo el programa: el valor de un activo es el valor de mercado de sus flujos. De ahí salen bonos, acciones, riesgo y presupuesto de capital.",
    temas:["Arbitraje y precios de estado","Valor presente, anualidades y APR/EAR","Renta fija: curva, duración y convexidad",
           "Acciones: Gordon y PVGO","Riesgo, diversificación y APT","Eficiencia de mercado y NPV"],
    arch:"cuadernos/154151x-fundamentos-i.html",
    url:"https://claude.ai/code/artifact/5b0d3562-6433-4db1-933d-c41c83b7e26e"
  },

  {
    id:"cuad-154152x",
    cod:"15.415.2x",
    t:"Fundamentos de finanzas modernas II",
    emo:"⚖️",
    color:"#6b2d5c",
    prof:"Kogan y Wang",
    modulos:10, ejemplos:16, retos:10, min:73,
    orden:3,
    pre:"Requiere 15.415.1x",
    res:"La segunda mitad: cómo replicar cualquier pago (derivados) y si el lado derecho del balance cambia el valor de la empresa (Modigliani-Miller).",
    temas:["Forwards, futuros y swaps","Opciones y árbol binomial","Black-Scholes y neutralidad al riesgo",
           "Frontera eficiente y CAPM","Opciones reales y estructura de capital","APV, WACC, payout y cobertura"],
    arch:"cuadernos/154152x-fundamentos-ii.html",
    url:"https://claude.ai/code/artifact/1504b12b-bd73-407e-9f9b-c54622c74850"
  },

  {
    id:"cuad-15455x",
    cod:"15.455x",
    t:"Métodos matemáticos para finanzas cuantitativas",
    emo:"∫",
    color:"#0f5f7a",
    prof:"Paul Mende",
    modulos:9, ejemplos:11, retos:9, min:61,
    orden:4,
    pre:"Cálculo multivariable, probabilidad, álgebra lineal",
    res:"El puente entre la teoría y el código: probabilidad, series de tiempo, cálculo de Itô, el teorema fundamental del pricing y optimización.",
    temas:["Probabilidad, momentos y el TCL","Random walk y razón de varianzas","AR(1) y calibración del árbol binomial",
           "Movimiento browniano y lema de Itô","Cobertura dinámica y la PDE de BSM","FTAP, optimización y Bellman"],
    arch:"cuadernos/15455x-metodos-matematicos.html",
    url:"https://claude.ai/code/artifact/40e4cff4-cd26-45d5-9fcb-fa828a5ab6f2"
  },

  {
    id:"cuad-15435x",
    cod:"15.435x",
    t:"Mercados de derivados",
    emo:"📈",
    color:"#0d6e5c",
    prof:"Deborah Lucas",
    modulos:10, ejemplos:23, retos:10, min:56,
    orden:5,
    pre:"Recomienda 415.x y 455x",
    res:"Todo lo que se valora aquí sale de una sola idea: no arbitraje. Forwards, swaps, opciones, griegas, exóticas, crédito y titulización.",
    temas:["Forwards y cash-and-carry","Futuros, swaps y duración","Árbol binomial y opciones americanas",
           "Black-Scholes y las griegas","Volatilidad, exóticas y Monte Carlo","Riesgo de crédito y titulización"],
    arch:"cuadernos/15435x-derivados.html",
    url:"https://claude.ai/code/artifact/ec729626-8292-4544-84ac-f8d02e27ce1d"
  }

];
