/* ============================================================
   MATEMÁTICAS · EJERCICIOS RESUELTOS + AMPLIACIÓN DE CONCEPTOS
   Se añaden al final de window.APUNTES.matematicas
   ============================================================ */

window.APUNTES = window.APUNTES || {};
window.APUNTES.matematicas = window.APUNTES.matematicas || [];

window.APUNTES.matematicas.push(

/* =================================================================
   1 · DERIVADAS RESUELTAS
   ================================================================= */
{id:"ma-ej-1", t:"Derivadas · 13 ejercicios resueltos", emo:"✍️", min:16,
 res:"Cada ejercicio con el proceso entero: qué estructura tiene, qué regla toca, el desarrollo y el resultado. Intenta hacerlo tú antes de abrir la solución.",
 secciones:[

 {h:"Cómo usar este apunte",
  c:`<p>Cada ejercicio está plegado. <b>Léelo, hazlo en papel y solo entonces abre la solución.</b> Si abres antes, tu cerebro solo reconoce, no reconstruye — y en el examen hay que reconstruir.</p>
  <p>El orden de lectura de toda derivada es siempre el mismo:</p>
  <ol>
  <li><b>¿Qué estructura tiene?</b> ¿Suma, producto, cociente, composición?</li>
  <li><b>¿Qué regla mata esa estructura?</b> Suma → término a término. Producto → f′g+fg′. Cociente → (f′g−fg′)/g². Composición → cadena.</li>
  <li><b>Aplica y simplifica.</b></li>
  </ol>`},

 {h:"Ejercicio 1 · Polinomio",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = 3x⁵ − 7x³ + 2x − 9. Calcula f′(x).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Estructura:</b> suma de potencias. La derivada es lineal, así que se deriva término a término.</li>
  <li><b>Regla de la potencia</b> en cada uno: (xⁿ)′ = n·xⁿ⁻¹.<br>
      3x⁵ → 15x⁴ · −7x³ → −21x² · 2x → 2 · −9 → 0</li>
  <li>La constante desaparece: una constante no cambia, y la derivada mide el cambio.</li>
  </ol>
  <div class="resultado-ej">f′(x) = 15x⁴ − 21x² + 2</div></details></div>`},

 {h:"Ejercicio 2 · Producto",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = x²·e<sup>x</sup>. Calcula f′(x).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Estructura:</b> producto de dos funciones. Nombra las piezas: u = x², v = e<sup>x</sup>.</li>
  <li>u′ = 2x · v′ = e<sup>x</sup> (la exponencial es su propia derivada).</li>
  <li><b>Regla del producto:</b> f′ = u′v + uv′ = 2x·e<sup>x</sup> + x²·e<sup>x</sup>.</li>
  <li><b>Factoriza</b> siempre que puedas: sale e<sup>x</sup> común.</li>
  </ol>
  <div class="resultado-ej">f′(x) = e<sup>x</sup>(x² + 2x) = x·e<sup>x</sup>(x + 2)</div>
  <p class="tip">🔎 Comprobación rápida: en x = 0 debería valer 0, y efectivamente e⁰(0+0) = 0. La función tiene ahí un mínimo local.</p>
  </details></div>`},

 {h:"Ejercicio 3 · Cociente",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = (3x + 1)/(x² + 2). Calcula f′(x).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>u = 3x+1 → u′ = 3 · v = x²+2 → v′ = 2x.</li>
  <li><b>Regla del cociente:</b> f′ = (u′v − uv′)/v².</li>
  <li>Numerador: 3(x²+2) − (3x+1)(2x) = 3x² + 6 − (6x² + 2x) = −3x² − 2x + 6.</li>
  <li>Denominador: (x²+2)².</li>
  </ol>
  <div class="resultado-ej">f′(x) = (−3x² − 2x + 6) / (x² + 2)²</div>
  <p class="tip">⚠️ El error clásico es invertir el orden del numerador. Recuerda: <i>primero la derivada de arriba por abajo</i>, y luego se resta.</p>
  </details></div>`},

 {h:"Ejercicio 4 · Cadena simple",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = sen(5x²). Calcula f′(x).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Estructura:</b> composición. Lo de fuera es el seno; lo de dentro, g(x) = 5x².</li>
  <li>Derivada de fuera <b>dejando lo de dentro tal cual</b>: cos(5x²).</li>
  <li>Por la derivada de dentro: g′(x) = 10x.</li>
  </ol>
  <div class="resultado-ej">f′(x) = 10x·cos(5x²)</div>
  <p class="tip">💡 Si el resultado no contiene la derivada de lo de dentro, te has dejado la cadena a medias. Es el fallo nº 1 de todo el cálculo.</p>
  </details></div>`},

 {h:"Ejercicio 5 · Logaritmo compuesto",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = ln(x² + 1). Calcula f′(x).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Fuera: ln(u) con derivada 1/u. Dentro: u = x² + 1, u′ = 2x.</li>
  <li>Cadena: f′ = (1/u)·u′.</li>
  </ol>
  <div class="resultado-ej">f′(x) = 2x / (x² + 1)</div>
  <p>Patrón general que conviene memorizar: <b>[ln(u)]′ = u′/u</b>. Todo logaritmo derivado es «derivada de dentro partido por dentro».</p>
  </details></div>`},

 {h:"Ejercicio 6 · La derivada de la campana de Gauss",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = e<sup>−x²/2</sup>. Calcula f′(x) y di dónde está su máximo.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Fuera: e<sup>u</sup> → e<sup>u</sup>. Dentro: u = −x²/2 → u′ = −x.</li>
  <li>Cadena: f′ = e<sup>−x²/2</sup>·(−x).</li>
  <li><b>Máximo:</b> f′ = 0 ⟺ x = 0 (la exponencial nunca se anula). Como f′ &gt; 0 a la izquierda y f′ &lt; 0 a la derecha, es un máximo.</li>
  </ol>
  <div class="resultado-ej">f′(x) = −x·e<sup>−x²/2</sup>, con máximo en x = 0</div>
  <p class="tip">🔗 Esta función, dividida por √(2π), es la densidad normal estándar. Aparece dentro de la fórmula de Black–Scholes: N′(d) es exactamente esto.</p>
  </details></div>`},

 {h:"Ejercicio 7 · Potencia de un paréntesis",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = (2x − 1)⁷. Calcula f′(x).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>No desarrolles el binomio: sería una barbaridad. Es una composición.</li>
  <li>Fuera: u⁷ → 7u⁶. Dentro: u = 2x−1 → u′ = 2.</li>
  </ol>
  <div class="resultado-ej">f′(x) = 7(2x−1)⁶·2 = 14(2x−1)⁶</div>
  </details></div>`},

 {h:"Ejercicio 8 · Raíz",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = √(x² + 9). Calcula f′(x).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Reescribe la raíz como potencia: f = (x²+9)<sup>1/2</sup>. <b>Este paso es el truco</b>: casi ninguna raíz se deriva bien sin reescribirla.</li>
  <li>Fuera: ½·u<sup>−1/2</sup>. Dentro: u′ = 2x.</li>
  <li>f′ = ½(x²+9)<sup>−1/2</sup>·2x = x/√(x²+9).</li>
  </ol>
  <div class="resultado-ej">f′(x) = x / √(x² + 9)</div>
  </details></div>`},

 {h:"Ejercicio 9 · Derivación logarítmica (xˣ)",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = x<sup>x</sup> con x &gt; 0. Calcula f′(x).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Aquí <b>no sirve</b> ni la regla de la potencia (el exponente no es constante) ni la de la exponencial (la base tampoco lo es).</li>
  <li><b>Truco:</b> toma logaritmos. y = x<sup>x</sup> ⟹ ln y = x·ln x.</li>
  <li>Deriva los dos lados respecto de x, con cadena a la izquierda:<br> y′/y = ln x + x·(1/x) = ln x + 1.</li>
  <li>Despeja y′ y sustituye y = x<sup>x</sup>.</li>
  </ol>
  <div class="resultado-ej">f′(x) = x<sup>x</sup>·(ln x + 1)</div>
  <p class="tip">💡 Este método vale para cualquier f(x)<sup>g(x)</sup>. También sirve para simplificar productos largos: el log convierte productos en sumas.</p>
  </details></div>`},

 {h:"Ejercicio 10 · Derivación implícita",
  c:`<div class="ejer"><div class="ejer-enun">La circunferencia x² + y² = 25. Calcula dy/dx y la pendiente en el punto (3, 4).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>y no está despejada, pero <b>depende de x</b>. Deriva los dos lados respecto de x tratando y como función: cada y arrastra un y′ por la cadena.</li>
  <li>2x + 2y·y′ = 0.</li>
  <li>Despeja: y′ = −x/y.</li>
  <li>En (3,4): y′ = −3/4.</li>
  </ol>
  <div class="resultado-ej">dy/dx = −x/y · pendiente en (3,4) = −0,75</div>
  <p>Tiene sentido geométrico: el radio va en dirección (3,4) y la tangente es perpendicular a él.</p>
  </details></div>`},

 {h:"Ejercicio 11 · Producto con trigonométrica y logaritmo",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = tan(x)·ln(x). Calcula f′(x).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>u = tan x → u′ = sec²x = 1 + tan²x. v = ln x → v′ = 1/x.</li>
  <li>Producto: f′ = sec²x·ln x + tan x·(1/x).</li>
  </ol>
  <div class="resultado-ej">f′(x) = sec²(x)·ln(x) + tan(x)/x</div>
  </details></div>`},

 {h:"Ejercicio 12 · Análisis completo de una función",
  c:`<div class="ejer"><div class="ejer-enun">f(x) = x³ − 3x² + 4. Encuentra máximos, mínimos y puntos de inflexión.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Primera derivada:</b> f′(x) = 3x² − 6x = 3x(x − 2). Se anula en x = 0 y x = 2. Son los <i>candidatos</i>.</li>
  <li><b>Segunda derivada:</b> f″(x) = 6x − 6.</li>
  <li>f″(0) = −6 &lt; 0 → cóncava hacia abajo → <b>máximo local</b> en x = 0, con f(0) = 4.</li>
  <li>f″(2) = +6 &gt; 0 → cóncava hacia arriba → <b>mínimo local</b> en x = 2, con f(2) = 8 − 12 + 4 = 0.</li>
  <li><b>Inflexión:</b> f″ = 0 en x = 1, y f″ cambia de signo ahí. f(1) = 1 − 3 + 4 = 2.</li>
  </ol>
  <div class="resultado-ej">Máximo (0, 4) · Mínimo (2, 0) · Inflexión (1, 2)</div>
  <p class="tip">📋 Guion completo de un estudio de función: dominio → cortes con los ejes → asíntotas → f′ (crecimiento y extremos) → f″ (concavidad e inflexión) → dibujo.</p>
  </details></div>`},

 {h:"Ejercicio 13 · Optimización aplicada",
  c:`<div class="ejer"><div class="ejer-enun">Una caja sin tapa, de base cuadrada, ha de tener 32 cm³ de volumen. ¿Qué medidas gastan menos material?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Nombra las variables:</b> lado de la base x, altura h.</li>
  <li><b>Función objetivo</b> (lo que se minimiza): superficie A = x² + 4xh (base + cuatro paredes, sin tapa).</li>
  <li><b>Restricción:</b> V = x²h = 32 ⟹ h = 32/x².</li>
  <li><b>Sustituye para dejar una sola variable:</b> A(x) = x² + 4x·32/x² = x² + 128/x.</li>
  <li><b>Deriva e iguala a cero:</b> A′(x) = 2x − 128/x² = 0 ⟹ 2x³ = 128 ⟹ x³ = 64 ⟹ x = 4.</li>
  <li><b>Comprueba que es mínimo:</b> A″(x) = 2 + 256/x³ &gt; 0 siempre. Lo es.</li>
  <li>h = 32/16 = 2. Superficie mínima: 16 + 32 = 48 cm².</li>
  </ol>
  <div class="resultado-ej">Base 4 × 4 cm, altura 2 cm, superficie 48 cm²</div>
  <p class="tip">🧭 Toda optimización sigue estos cinco pasos: variables → objetivo → restricción → una sola variable → derivar. El 90 % de los fallos está en no usar la restricción para eliminar una variable.</p>
  </details></div>`}
]},

/* =================================================================
   2 · INTEGRALES RESUELTAS
   ================================================================= */
{id:"ma-ej-2", t:"Integrales · 14 ejercicios resueltos", emo:"🧾", min:18,
 res:"Del polinomio elemental a la sustitución trigonométrica, las fracciones parciales y las impropias. Con el criterio de qué técnica elegir en cada caso.",
 secciones:[

 {h:"El árbol de decisión, otra vez",
  c:`<p>Antes de integrar nada, pregúntate <b>en este orden</b>:</p>
  <ol>
  <li>¿Está en la <b>tabla</b>? → hecho.</li>
  <li>¿Veo una función <b>y su derivada</b> multiplicando? → sustitución.</li>
  <li>¿Es un <b>producto</b> de dos familias distintas (polinomio × exponencial, polinomio × trigonométrica, log solo)? → por partes.</li>
  <li>¿Es un <b>cociente de polinomios</b>? → fracciones parciales (o división si el grado de arriba ≥ el de abajo).</li>
  <li>¿Hay <b>√(a²−x²), √(a²+x²), √(x²−a²)</b>? → sustitución trigonométrica.</li>
  <li>¿Solo senos y cosenos? → identidades de ángulo doble.</li>
  </ol>`},

 {h:"Ejercicio 1 · Tabla directa",
  c:`<div class="ejer"><div class="ejer-enun">∫ (4x³ − 6x + 5) dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Término a término, con ∫xⁿdx = x<sup>n+1</sup>/(n+1).</li>
  <li>4x³ → 4·x⁴/4 = x⁴ · −6x → −6·x²/2 = −3x² · 5 → 5x.</li>
  <li><b>No olvides la constante.</b> Es la firma de que hay infinitas primitivas.</li>
  </ol>
  <div class="resultado-ej">x⁴ − 3x² + 5x + C</div>
  <p class="tip">✔️ Comprobación universal: deriva el resultado. Si te sale el integrando, está bien. Siempre.</p>
  </details></div>`},

 {h:"Ejercicio 2 · Sustitución",
  c:`<div class="ejer"><div class="ejer-enun">∫ x·e<sup>x²</sup> dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Detección:</b> dentro de la exponencial hay x², y fuera hay una x — que es (salvo constante) su derivada. Señal inequívoca de sustitución.</li>
  <li>u = x² ⟹ du = 2x dx ⟹ x dx = du/2.</li>
  <li>La integral se convierte en ∫ e<sup>u</sup> · du/2 = ½∫e<sup>u</sup>du = ½e<sup>u</sup>.</li>
  <li><b>Deshaz el cambio.</b></li>
  </ol>
  <div class="resultado-ej">½·e<sup>x²</sup> + C</div>
  </details></div>`},

 {h:"Ejercicio 3 · Por partes",
  c:`<div class="ejer"><div class="ejer-enun">∫ x·e<sup>x</sup> dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Fórmula: ∫u dv = uv − ∫v du.</li>
  <li><b>Elección de u:</b> regla ILATE (Inversas, Logarítmicas, Algebraicas, Trigonométricas, Exponenciales) — se elige como u la primera de la lista que aparezca. Aquí, la algebraica: u = x.</li>
  <li>u = x → du = dx · dv = e<sup>x</sup>dx → v = e<sup>x</sup>.</li>
  <li>∫x e<sup>x</sup>dx = x e<sup>x</sup> − ∫e<sup>x</sup>dx = x e<sup>x</sup> − e<sup>x</sup>.</li>
  </ol>
  <div class="resultado-ej">e<sup>x</sup>(x − 1) + C</div>
  <p class="tip">💡 La idea de por partes: cambiar una integral difícil por otra más fácil. Si eliges mal u, la nueva integral sale peor — cámbiala y vuelve a empezar.</p>
  </details></div>`},

 {h:"Ejercicio 4 · El logaritmo solo",
  c:`<div class="ejer"><div class="ejer-enun">∫ ln x dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Parece que no hay producto, pero sí: ln x · <b>1</b>.</li>
  <li>u = ln x → du = dx/x · dv = dx → v = x.</li>
  <li>∫ln x dx = x·ln x − ∫x·(1/x)dx = x ln x − ∫dx = x ln x − x.</li>
  </ol>
  <div class="resultado-ej">x·ln x − x + C = x(ln x − 1) + C</div>
  <p>Es de los pocos resultados que compensa memorizar tal cual.</p>
  </details></div>`},

 {h:"Ejercicio 5 · Fracciones parciales",
  c:`<div class="ejer"><div class="ejer-enun">∫ dx/(x² − 1)</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Factoriza el denominador:</b> x² − 1 = (x−1)(x+1).</li>
  <li>Plantea la descomposición: 1/((x−1)(x+1)) = A/(x−1) + B/(x+1).</li>
  <li>Multiplica todo por (x−1)(x+1): 1 = A(x+1) + B(x−1).</li>
  <li><b>Truco de las raíces:</b> pon x = 1 ⟹ 1 = 2A ⟹ A = ½. Pon x = −1 ⟹ 1 = −2B ⟹ B = −½.</li>
  <li>∫ = ½∫dx/(x−1) − ½∫dx/(x+1) = ½ln|x−1| − ½ln|x+1|.</li>
  </ol>
  <div class="resultado-ej">½·ln|(x−1)/(x+1)| + C</div>
  </details></div>`},

 {h:"Ejercicio 6 · Seno al cuadrado",
  c:`<div class="ejer"><div class="ejer-enun">∫ sen²x dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Ni tabla ni sustitución: la potencia par de un seno se baja con la <b>identidad de ángulo doble</b>: sen²x = (1 − cos 2x)/2.</li>
  <li>∫sen²x dx = ½∫dx − ½∫cos 2x dx.</li>
  <li>La segunda vale ½·(sen 2x)/2 = sen 2x/4 (ojo con el 2 de dentro: la cadena al revés).</li>
  </ol>
  <div class="resultado-ej">x/2 − sen(2x)/4 + C</div>
  <p class="tip">📐 Las dos identidades que resuelven casi todo: sen²x = (1−cos2x)/2 y cos²x = (1+cos2x)/2.</p>
  </details></div>`},

 {h:"Ejercicio 7 · Definida sencilla",
  c:`<div class="ejer"><div class="ejer-enun">∫₀¹ x² dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Primitiva: x³/3.</li>
  <li><b>Regla de Barrow:</b> evalúa arriba menos abajo: 1³/3 − 0³/3.</li>
  </ol>
  <div class="resultado-ej">1/3</div>
  <p>En una definida <b>no hace falta la C</b>: se cancela al restar.</p>
  </details></div>`},

 {h:"Ejercicio 8 · La que da un arcotangente",
  c:`<div class="ejer"><div class="ejer-enun">∫ dx/(x² + 4)</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Forma tipo: ∫dx/(x²+a²) = (1/a)·arctan(x/a) + C, con a = 2.</li>
  <li>Si prefieres verlo: saca 4 factor común abajo → ¼∫dx/((x/2)²+1) y sustituye u = x/2, dx = 2du.</li>
  </ol>
  <div class="resultado-ej">½·arctan(x/2) + C</div>
  <p class="tip">⚠️ Distingue: si abajo hubiera x² − 4 (con menos) serían fracciones parciales y saldría un logaritmo, no un arcotangente.</p>
  </details></div>`},

 {h:"Ejercicio 9 · Sustitución trigonométrica",
  c:`<div class="ejer"><div class="ejer-enun">∫ √(1 − x²) dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Con √(a²−x²) se sustituye <b>x = a·sen θ</b>. Aquí a = 1: x = sen θ, dx = cos θ dθ.</li>
  <li>√(1 − sen²θ) = cos θ.</li>
  <li>∫cos θ·cos θ dθ = ∫cos²θ dθ = θ/2 + sen(2θ)/4.</li>
  <li><b>Vuelve a x:</b> θ = arcsen x; sen2θ = 2senθcosθ = 2x√(1−x²).</li>
  </ol>
  <div class="resultado-ej">½·arcsen(x) + ½·x·√(1 − x²) + C</div>
  <p>Entre −1 y 1 esta integral vale π/2: es el área del semicírculo de radio 1. Buena comprobación.</p>
  </details></div>`},

 {h:"Ejercicio 10 · Integral impropia",
  c:`<div class="ejer"><div class="ejer-enun">∫₀<sup>∞</sup> e<sup>−λx</sup> dx, con λ &gt; 0</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Es impropia: el límite superior es infinito. <b>Se define como un límite:</b> lím<sub>b→∞</sub> ∫₀<sup>b</sup>.</li>
  <li>Primitiva: −(1/λ)e<sup>−λx</sup>.</li>
  <li>Evalúa: −(1/λ)e<sup>−λb</sup> + (1/λ)·e⁰.</li>
  <li>Cuando b → ∞, e<sup>−λb</sup> → 0 porque λ &gt; 0.</li>
  </ol>
  <div class="resultado-ej">1/λ</div>
  <p class="tip">🔗 Esta es exactamente la esperanza de la distribución exponencial y el valor de un flujo continuo descontado a tasa λ para siempre — una perpetuidad.</p>
  </details></div>`},

 {h:"Ejercicio 11 · Tangente",
  c:`<div class="ejer"><div class="ejer-enun">∫ tan x dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Escríbela como sen x / cos x.</li>
  <li>u = cos x ⟹ du = −sen x dx ⟹ sen x dx = −du.</li>
  <li>∫ = ∫(−du)/u = −ln|u|.</li>
  </ol>
  <div class="resultado-ej">−ln|cos x| + C = ln|sec x| + C</div>
  </details></div>`},

 {h:"Ejercicio 12 · Logaritmo escondido",
  c:`<div class="ejer"><div class="ejer-enun">∫ (2x + 3)/(x² + 3x + 5) dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Mira el denominador y derívalo mentalmente: (x²+3x+5)′ = 2x+3. <b>Es justo el numerador.</b></li>
  <li>Patrón ∫u′/u dx = ln|u| + C.</li>
  </ol>
  <div class="resultado-ej">ln|x² + 3x + 5| + C</div>
  <p class="tip">💡 Antes de lanzarte a fracciones parciales, comprueba siempre si el numerador es la derivada del denominador. Ahorra media página.</p>
  </details></div>`},

 {h:"Ejercicio 13 · Área entre dos curvas",
  c:`<div class="ejer"><div class="ejer-enun">Área encerrada entre y = 2x e y = x².</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Puntos de corte:</b> 2x = x² ⟹ x(x−2) = 0 ⟹ x = 0 y x = 2. Esos son los límites.</li>
  <li><b>¿Cuál va por arriba?</b> En x = 1: 2·1 = 2 frente a 1² = 1. Gana la recta.</li>
  <li>Área = ∫₀² (2x − x²) dx = [x² − x³/3]₀².</li>
  <li>= (4 − 8/3) − 0 = 12/3 − 8/3 = 4/3.</li>
  </ol>
  <div class="resultado-ej">Área = 4/3 ≈ 1,333</div>
  <p class="tip">📏 Regla de oro: <b>arriba menos abajo</b>, y el resultado sale positivo. Si te sale negativo, las tenías cambiadas.</p>
  </details></div>`},

 {h:"Ejercicio 14 · La integral gaussiana",
  c:`<div class="ejer"><div class="ejer-enun">Demuestra que ∫<sub>−∞</sub><sup>∞</sup> e<sup>−x²/2</sup> dx = √(2π).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>e<sup>−x²/2</sup> <b>no tiene primitiva elemental</b>. El truco es no buscarla: se calcula el cuadrado de la integral.</li>
  <li>Sea I la integral. Entonces I² = ∫∫ e<sup>−(x²+y²)/2</sup> dx dy sobre todo el plano.</li>
  <li><b>Pasa a polares:</b> x²+y² = r², dx dy = r dr dθ.</li>
  <li>I² = ∫₀<sup>2π</sup>dθ · ∫₀<sup>∞</sup> r·e<sup>−r²/2</sup>dr = 2π · [−e<sup>−r²/2</sup>]₀<sup>∞</sup> = 2π·1.</li>
  <li>Luego I = √(2π).</li>
  </ol>
  <div class="resultado-ej">∫<sub>−∞</sub><sup>∞</sup> e<sup>−x²/2</sup> dx = √(2π)</div>
  <p class="tip">🔗 Ese √(2π) es exactamente la constante que normaliza la densidad normal, y es la razón de que aparezca en Black–Scholes. La aparición del <b>r</b> del jacobiano es lo que hace que la integral sea resoluble.</p>
  </details></div>`}
]},

/* =================================================================
   3 · EDO RESUELTAS
   ================================================================= */
{id:"ma-ej-3", t:"Ecuaciones diferenciales · 10 ejercicios resueltos", emo:"🌀", min:15,
 res:"Separables, lineales con factor integrante, de segundo orden homogéneas y no homogéneas, y dos aplicaciones reales.",
 secciones:[

 {h:"Cómo se ataca una EDO",
  c:`<ol>
  <li><b>Orden:</b> la derivada más alta que aparece.</li>
  <li><b>¿Lineal?</b> ¿Aparecen y, y′, y″ solo en primera potencia y sin multiplicarse entre sí?</li>
  <li><b>Primer orden:</b> ¿se pueden separar las variables? Si no, ¿está en forma y′ + p(x)y = q(x)? → factor integrante.</li>
  <li><b>Segundo orden con coeficientes constantes:</b> ecuación característica.</li>
  <li><b>No homogénea:</b> solución general = homogénea + una particular.</li>
  </ol>`},

 {h:"Ejercicio 1 · Crecimiento exponencial",
  c:`<div class="ejer"><div class="ejer-enun">y′ = k·y con y(0) = y₀. Resuélvela.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Separa:</b> dy/y = k dt.</li>
  <li><b>Integra los dos lados:</b> ln|y| = kt + C.</li>
  <li><b>Exponencia:</b> y = e<sup>kt+C</sup> = A·e<sup>kt</sup> con A = e<sup>C</sup>.</li>
  <li><b>Condición inicial:</b> y(0) = A = y₀.</li>
  </ol>
  <div class="resultado-ej">y(t) = y₀·e<sup>kt</sup></div>
  <p class="tip">🔗 Con k = r es el valor de una cuenta bancaria con capitalización continua: dB = rB dt ⟹ B(t) = B₀e<sup>rt</sup>. Es la EDO más importante de las finanzas.</p>
  </details></div>`},

 {h:"Ejercicio 2 · Separable",
  c:`<div class="ejer"><div class="ejer-enun">dy/dx = x·y con y(0) = 3.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Separa: dy/y = x dx.</li>
  <li>Integra: ln|y| = x²/2 + C.</li>
  <li>y = A·e<sup>x²/2</sup>.</li>
  <li>y(0) = A = 3.</li>
  </ol>
  <div class="resultado-ej">y(x) = 3·e<sup>x²/2</sup></div>
  </details></div>`},

 {h:"Ejercicio 3 · Lineal con factor integrante",
  c:`<div class="ejer"><div class="ejer-enun">y′ + 2y = 6, con y(0) = 1.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Está en la forma y′ + p(x)y = q(x) con p = 2, q = 6.</li>
  <li><b>Factor integrante:</b> μ = e<sup>∫p dx</sup> = e<sup>2x</sup>.</li>
  <li>Multiplica toda la ecuación por μ: e<sup>2x</sup>y′ + 2e<sup>2x</sup>y = 6e<sup>2x</sup>.</li>
  <li><b>El lado izquierdo es siempre (μy)′.</b> Ese es todo el truco: (y·e<sup>2x</sup>)′ = 6e<sup>2x</sup>.</li>
  <li>Integra: y·e<sup>2x</sup> = 3e<sup>2x</sup> + C.</li>
  <li>Despeja: y = 3 + C·e<sup>−2x</sup>. Con y(0) = 1: 1 = 3 + C ⟹ C = −2.</li>
  </ol>
  <div class="resultado-ej">y(x) = 3 − 2·e<sup>−2x</sup></div>
  <p>Cuando x → ∞, y → 3: el <b>estado estacionario</b>, que es justo q/p.</p>
  </details></div>`},

 {h:"Ejercicio 4 · Factor integrante con coeficiente variable",
  c:`<div class="ejer"><div class="ejer-enun">y′ + y/x = x², para x &gt; 0.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>p(x) = 1/x ⟹ ∫p dx = ln x ⟹ μ = e<sup>ln x</sup> = x.</li>
  <li>Multiplica: x·y′ + y = x³, y el izquierdo es (x·y)′.</li>
  <li>Integra: x·y = x⁴/4 + C.</li>
  </ol>
  <div class="resultado-ej">y(x) = x³/4 + C/x</div>
  </details></div>`},

 {h:"Ejercicio 5 · Segundo orden, raíces reales distintas",
  c:`<div class="ejer"><div class="ejer-enun">y″ − 5y′ + 6y = 0.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Ecuación característica:</b> sustituye y = e<sup>rx</sup> ⟹ r² − 5r + 6 = 0.</li>
  <li>Raíces: r = 2 y r = 3.</li>
  <li>Dos raíces reales distintas ⟹ dos exponenciales independientes.</li>
  </ol>
  <div class="resultado-ej">y = C₁e<sup>2x</sup> + C₂e<sup>3x</sup></div>
  </details></div>`},

 {h:"Ejercicio 6 · Raíces complejas",
  c:`<div class="ejer"><div class="ejer-enun">y″ + 4y = 0.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>r² + 4 = 0 ⟹ r = ±2i.</li>
  <li>Raíces α ± βi ⟹ solución e<sup>αx</sup>(C₁cos βx + C₂sen βx). Aquí α = 0, β = 2.</li>
  </ol>
  <div class="resultado-ej">y = C₁·cos(2x) + C₂·sen(2x)</div>
  <p>Es el oscilador armónico: raíces imaginarias puras ⟹ oscilación sin amortiguar.</p>
  </details></div>`},

 {h:"Ejercicio 7 · Raíz doble",
  c:`<div class="ejer"><div class="ejer-enun">y″ − 2y′ + y = 0.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>r² − 2r + 1 = (r−1)² = 0 ⟹ r = 1 doble.</li>
  <li>Con raíz doble solo tendrías <b>una</b> solución, y hacen falta dos independientes. La segunda se consigue multiplicando por x.</li>
  </ol>
  <div class="resultado-ej">y = (C₁ + C₂x)·e<sup>x</sup></div>
  </details></div>`},

 {h:"Ejercicio 8 · No homogénea",
  c:`<div class="ejer"><div class="ejer-enun">y″ − y = e<sup>2x</sup>.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Homogénea primero:</b> r² − 1 = 0 ⟹ r = ±1 ⟹ y<sub>h</sub> = C₁e<sup>x</sup> + C₂e<sup>−x</sup>.</li>
  <li><b>Particular por coeficientes indeterminados:</b> como el término de la derecha es e<sup>2x</sup> y 2 no es raíz de la característica, prueba y<sub>p</sub> = A·e<sup>2x</sup>.</li>
  <li>y<sub>p</sub>″ = 4Ae<sup>2x</sup>. Sustituye: 4Ae<sup>2x</sup> − Ae<sup>2x</sup> = e<sup>2x</sup> ⟹ 3A = 1 ⟹ A = 1/3.</li>
  <li><b>Suma las dos.</b></li>
  </ol>
  <div class="resultado-ej">y = C₁e<sup>x</sup> + C₂e<sup>−x</sup> + ⅓·e<sup>2x</sup></div>
  <p class="tip">⚠️ Si el exponente de la derecha <i>sí</i> fuera raíz de la característica, hay que multiplicar el ensayo por x (resonancia).</p>
  </details></div>`},

 {h:"Ejercicio 9 · Enfriamiento de Newton (aplicación)",
  c:`<div class="ejer"><div class="ejer-enun">Un café a 90 °C se deja en una sala a 20 °C. A los 10 minutos está a 60 °C. ¿A qué temperatura estará a los 20 minutos?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Modelo:</b> la velocidad de enfriamiento es proporcional a la diferencia con el ambiente: T′ = −k(T − 20).</li>
  <li>Cambio de variable u = T − 20 ⟹ u′ = −k·u ⟹ u = u₀e<sup>−kt</sup>.</li>
  <li>u₀ = 90 − 20 = 70 ⟹ T(t) = 20 + 70·e<sup>−kt</sup>.</li>
  <li><b>Calibra k con el dato:</b> 60 = 20 + 70e<sup>−10k</sup> ⟹ e<sup>−10k</sup> = 40/70 = 4/7.</li>
  <li>A los 20 minutos: e<sup>−20k</sup> = (e<sup>−10k</sup>)² = (4/7)² = 16/49.</li>
  <li>T(20) = 20 + 70·16/49 = 20 + 22,86.</li>
  </ol>
  <div class="resultado-ej">T(20) ≈ 42,9 °C</div>
  <p class="tip">💡 Fíjate en que <b>no hizo falta despejar k</b>: bastó con elevar al cuadrado. En los ejercicios de decaimiento, buscar la constante suele ser un rodeo innecesario.</p>
  </details></div>`},

 {h:"Ejercicio 10 · La EDO que lleva al movimiento browniano geométrico",
  c:`<div class="ejer"><div class="ejer-enun">Resuelve dS = μS dt (la versión sin ruido del modelo de Black–Scholes) y compara con la versión estocástica.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Separable: dS/S = μ dt ⟹ ln S = μt + C ⟹ <b>S(t) = S₀e<sup>μt</sup></b>.</li>
  <li>La versión real añade ruido: dS = μS dt + σS dW.</li>
  <li>Ahí ya no vale separar: al aplicar el <b>lema de Itô</b> a ln S aparece un término extra −½σ²dt que no existe en el cálculo ordinario.</li>
  <li>El resultado es S(t) = S₀·exp[(μ − ½σ²)t + σW<sub>t</sub>].</li>
  </ol>
  <div class="resultado-ej">Determinista: S₀e<sup>μt</sup> · Estocástico: S₀e<sup>(μ−σ²/2)t+σW<sub>t</sub></sup></div>
  <p class="tip">🔗 Esa corrección de −σ²/2 es <b>toda la diferencia</b> entre el cálculo que ya sabes y el cálculo de Itô. Si entiendes de dónde sale, entiendes Shreve.</p>
  </details></div>`}
]},

/* =================================================================
   4 · ÁLGEBRA LINEAL RESUELTA
   ================================================================= */
{id:"ma-ej-4", t:"Álgebra lineal · 10 ejercicios resueltos", emo:"🔢", min:15,
 res:"Determinantes, inversas, Gauss, autovalores, diagonalización, proyecciones, mínimos cuadrados y la descomposición de Cholesky que usarás para simular.",
 secciones:[

 {h:"Ejercicio 1 · Determinante 3×3",
  c:`<div class="ejer"><div class="ejer-enun">Calcula el determinante de A = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(3,auto)"><b>1</b><b>2</b><b>3</b><b>4</b><b>5</b><b>6</b><b>7</b><b>8</b><b>10</b></span></span></div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Desarrollo por la primera fila</b>, alternando signos + − +.</li>
  <li>1·(5·10 − 6·8) = 1·(50 − 48) = 2.</li>
  <li>−2·(4·10 − 6·7) = −2·(40 − 42) = +4.</li>
  <li>+3·(4·8 − 5·7) = 3·(32 − 35) = −9.</li>
  <li>Suma: 2 + 4 − 9.</li>
  </ol>
  <div class="resultado-ej">det(A) = −3</div>
  <p>Al ser distinto de cero, A es invertible, su rango es 3 y el sistema Ax = b tiene solución única para cualquier b.</p>
  </details></div>`},

 {h:"Ejercicio 2 · Inversa 2×2",
  c:`<div class="ejer"><div class="ejer-enun">Invierte A = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>4</b><b>7</b><b>2</b><b>6</b></span></span></div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Fórmula:</b> para <span class="mono">[[a,b],[c,d]]</span> la inversa es (1/det)·<span class="mono">[[d,−b],[−c,a]]</span>. Es decir: <i>cambia la diagonal principal, cambia de signo la otra y divide por el determinante</i>.</li>
  <li>det = 4·6 − 7·2 = 24 − 14 = 10.</li>
  <li>A⁻¹ = (1/10)·<span class="mono">[[6,−7],[−2,4]]</span>.</li>
  </ol>
  <div class="resultado-ej">A⁻¹ = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>0,6</b><b>−0,7</b><b>−0,2</b><b>0,4</b></span></span></div>
  <p class="tip">✔️ Comprueba siempre multiplicando: A·A⁻¹ debe dar la identidad.</p>
  </details></div>`},

 {h:"Ejercicio 3 · Sistema 3×3 por Gauss",
  c:`<div class="ejer"><div class="ejer-enun">x + y + z = 6 · 2x − y + z = 3 · x + 2y − z = 2</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>De la primera: x = 6 − y − z.</li>
  <li>Sustituye en la segunda: 2(6−y−z) − y + z = 3 ⟹ 12 − 3y − z = 3 ⟹ <b>3y + z = 9</b>.</li>
  <li>Sustituye en la tercera: (6−y−z) + 2y − z = 2 ⟹ 6 + y − 2z = 2 ⟹ <b>y = 2z − 4</b>.</li>
  <li>Junta: 3(2z−4) + z = 9 ⟹ 7z = 21 ⟹ z = 3.</li>
  <li>Hacia atrás: y = 2·3 − 4 = 2 · x = 6 − 2 − 3 = 1.</li>
  <li><b>Verifica en las tres:</b> 1+2+3 = 6 ✓ · 2−2+3 = 3 ✓ · 1+4−3 = 2 ✓</li>
  </ol>
  <div class="resultado-ej">x = 1, y = 2, z = 3</div>
  </details></div>`},

 {h:"Ejercicio 4 · Autovalores y autovectores",
  c:`<div class="ejer"><div class="ejer-enun">Halla los autovalores y autovectores de A = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>2</b><b>1</b><b>1</b><b>2</b></span></span></div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Ecuación característica:</b> det(A − λI) = 0 ⟹ (2−λ)² − 1 = 0.</li>
  <li>(2−λ)² = 1 ⟹ 2−λ = ±1 ⟹ λ = 1 y λ = 3.</li>
  <li><b>Atajo de control:</b> la suma de autovalores es la traza (2+2 = 4 = 1+3 ✓) y el producto es el determinante (4−1 = 3 = 1·3 ✓).</li>
  <li>Para λ = 3: (A−3I)v = 0 ⟹ −v₁ + v₂ = 0 ⟹ v = (1, 1).</li>
  <li>Para λ = 1: v₁ + v₂ = 0 ⟹ v = (1, −1).</li>
  </ol>
  <div class="resultado-ej">λ₁ = 3 con v = (1,1) · λ₂ = 1 con v = (1,−1)</div>
  <p>Los autovectores salen ortogonales porque A es simétrica: eso pasa <b>siempre</b> con matrices simétricas.</p>
  </details></div>`},

 {h:"Ejercicio 5 · Diagonalizar",
  c:`<div class="ejer"><div class="ejer-enun">Diagonaliza A = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>4</b><b>1</b><b>2</b><b>3</b></span></span></div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Traza = 7, determinante = 12 − 2 = 10 ⟹ λ² − 7λ + 10 = 0 ⟹ λ = 5 y λ = 2.</li>
  <li>λ = 5: (4−5)v₁ + v₂ = 0 ⟹ v₂ = v₁ ⟹ v = (1,1).</li>
  <li>λ = 2: (4−2)v₁ + v₂ = 0 ⟹ v₂ = −2v₁ ⟹ v = (1,−2).</li>
  <li><b>Monta P con los autovectores en columna</b> y D con los autovalores en el mismo orden.</li>
  </ol>
  <div class="resultado-ej">P = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>1</b><b>1</b><b>1</b><b>−2</b></span></span> · D = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>5</b><b>0</b><b>0</b><b>2</b></span></span> · A = PDP⁻¹</div>
  <p class="tip">💡 Diagonalizar es cambiar a la base en la que la matriz solo estira los ejes. Y entonces A<sup>n</sup> = PD<sup>n</sup>P⁻¹, que es una potencia trivial.</p>
  </details></div>`},

 {h:"Ejercicio 6 · Potencia de una matriz",
  c:`<div class="ejer"><div class="ejer-enun">Con A = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>2</b><b>1</b><b>1</b><b>2</b></span></span>, calcula A⁵ sin multiplicar cinco veces.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Del ejercicio 4: λ = 3 y λ = 1, con autovectores (1,1) y (1,−1).</li>
  <li>A<sup>n</sup> = P·D<sup>n</sup>·P⁻¹, con D<sup>n</sup> = diag(3<sup>n</sup>, 1).</li>
  <li>Haciendo las cuentas, para esta matriz sale el patrón A<sup>n</sup> = ½·<span class="mono">[[3ⁿ+1, 3ⁿ−1],[3ⁿ−1, 3ⁿ+1]]</span>.</li>
  <li>Con n = 5: 3⁵ = 243 ⟹ ½·<span class="mono">[[244,242],[242,244]]</span>.</li>
  </ol>
  <div class="resultado-ej">A⁵ = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>122</b><b>121</b><b>121</b><b>122</b></span></span></div>
  <p>Comprueba el patrón con n = 2: ½[[10,8],[8,10]] = [[5,4],[4,5]], que es justo A².</p>
  </details></div>`},

 {h:"Ejercicio 7 · Rango",
  c:`<div class="ejer"><div class="ejer-enun">Calcula el rango de <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(3,auto)"><b>1</b><b>2</b><b>3</b><b>2</b><b>4</b><b>6</b><b>1</b><b>1</b><b>1</b></span></span></div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Mira antes de calcular:</b> la fila 2 es exactamente el doble de la fila 1. Son dependientes.</li>
  <li>F₂ → F₂ − 2F₁ deja una fila entera de ceros.</li>
  <li>Quedan dos filas no nulas y no proporcionales entre sí: (1,2,3) y (1,1,1).</li>
  </ol>
  <div class="resultado-ej">rango = 2 (y por tanto det = 0: la matriz no es invertible)</div>
  </details></div>`},

 {h:"Ejercicio 8 · Proyección ortogonal",
  c:`<div class="ejer"><div class="ejer-enun">Proyecta b = (4, 2) sobre la dirección a = (1, 1).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Fórmula:</b> proj<sub>a</sub>b = (a·b / a·a)·a.</li>
  <li>a·b = 4 + 2 = 6 · a·a = 1 + 1 = 2.</li>
  <li>Coeficiente: 6/2 = 3.</li>
  <li>Proyección: 3·(1,1) = (3,3).</li>
  <li><b>El residuo</b> b − proj = (1,−1) es perpendicular a a: (1)(1)+(−1)(1) = 0 ✓</li>
  </ol>
  <div class="resultado-ej">proj = (3, 3), con residuo ortogonal (1, −1)</div>
  <p class="tip">🔗 Esta idea es exactamente la de la <b>esperanza condicional</b>: proyectar sobre el espacio de lo que ya sabes, y que el error sea ortogonal a esa información.</p>
  </details></div>`},

 {h:"Ejercicio 9 · Mínimos cuadrados",
  c:`<div class="ejer"><div class="ejer-enun">Ajusta la recta por el origen y = m·x a los puntos (1,2), (2,3) y (3,5).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Se busca m que minimice Σ(y<sub>i</sub> − m·x<sub>i</sub>)².</li>
  <li>Deriva respecto de m e iguala a cero: −2Σx<sub>i</sub>(y<sub>i</sub> − m x<sub>i</sub>) = 0.</li>
  <li>Despeja: <b>m = Σx<sub>i</sub>y<sub>i</sub> / Σx<sub>i</sub>²</b>.</li>
  <li>Σxy = 1·2 + 2·3 + 3·5 = 2 + 6 + 15 = 23. Σx² = 1 + 4 + 9 = 14.</li>
  </ol>
  <div class="resultado-ej">m = 23/14 ≈ 1,643</div>
  <p>En forma matricial es exactamente m = (XᵀX)⁻¹Xᵀy: la ecuación normal de toda regresión.</p>
  </details></div>`},

 {h:"Ejercicio 10 · Cholesky (para simular correlación)",
  c:`<div class="ejer"><div class="ejer-enun">Descompón Σ = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>1</b><b>ρ</b><b>ρ</b><b>1</b></span></span> como L·Lᵀ con L triangular inferior.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Escribe L = <span class="mono">[[a,0],[b,c]]</span> e impón L·Lᵀ = Σ.</li>
  <li>Elemento (1,1): a² = 1 ⟹ a = 1.</li>
  <li>Elemento (2,1): a·b = ρ ⟹ b = ρ.</li>
  <li>Elemento (2,2): b² + c² = 1 ⟹ c = √(1 − ρ²).</li>
  </ol>
  <div class="resultado-ej">L = <span class="mat"><span class="mat-cuerpo" style="grid-template-columns:repeat(2,auto)"><b>1</b><b>0</b><b>ρ</b><b>√(1−ρ²)</b></span></span></div>
  <p class="tip">🔗 Uso directo: si Z₁ y Z₂ son normales estándar independientes, entonces X₁ = Z₁ y X₂ = ρZ₁ + √(1−ρ²)Z₂ tienen correlación exactamente ρ. Así se simulan activos correlacionados en Montecarlo. Fíjate en que Cholesky solo existe si Σ es <b>definida positiva</b>, es decir, si |ρ| &lt; 1.</p>
  </details></div>`}
]},

/* =================================================================
   5 · AMPLIACIÓN · POR QUÉ FUNCIONAN LAS REGLAS
   ================================================================= */
{id:"ma-ap-11", t:"Los porqués: de dónde salen las reglas", emo:"🧩", min:11,
 res:"Las demostraciones cortas de las reglas que usas a diario. Entenderlas es la diferencia entre aplicar recetas y saber cuándo dejan de valer.",
 secciones:[

 {h:"La derivada es un límite, no una fórmula",
  c:`<p>Todo sale de aquí:</p>
  <div class="formula">f′(x) = lím<sub>h→0</sub> [f(x+h) − f(x)] / h</div>
  <p>El cociente de dentro es la pendiente de la recta que une dos puntos de la curva (la <b>secante</b>). Al acercar el segundo punto al primero, la secante se convierte en la <b>tangente</b>. Toda regla de derivación es un cálculo de este límite hecho una vez y para siempre.</p>`},

 {h:"Regla de la potencia",
  c:`<p>Para f(x) = x², el numerador es (x+h)² − x² = 2xh + h². Divide por h: 2x + h. Haz h → 0: queda 2x.</p>
  <p>Para x<sup>n</sup> el binomio de Newton da (x+h)ⁿ = xⁿ + n·xⁿ⁻¹h + (términos con h²…). Al restar xⁿ y dividir por h, todos los términos con h² o más siguen teniendo una h y se anulan. Sobrevive n·xⁿ⁻¹.</p>
  <p class="tip">💡 Esa idea — <b>los términos de orden h² desaparecen</b> — es exactamente la que <i>deja de ser cierta</i> en el cálculo de Itô, donde (dW)² = dt no es despreciable. Ahí está la raíz de toda la diferencia.</p>`},

 {h:"Regla del producto",
  c:`<p>El numerador de f(x+h)g(x+h) − f(x)g(x) se manipula sumando y restando el mismo término:</p>
  <div class="formula">f(x+h)g(x+h) − f(x)g(x+h) + f(x)g(x+h) − f(x)g(x)</div>
  <p>Agrupa: g(x+h)·[f(x+h)−f(x)] + f(x)·[g(x+h)−g(x)]. Divide por h y haz h → 0: el primer corchete tiende a f′, el segundo a g′, y g(x+h) → g(x).</p>
  <div class="formula">(fg)′ = f′g + fg′</div>
  <p>El truco de «sumar y restar lo mismo» es una de las tres o cuatro técnicas que reaparecen en todas las demostraciones del análisis.</p>`},

 {h:"Regla de la cadena, en una línea",
  c:`<p>Escribe el cociente incremental multiplicando y dividiendo por el incremento de dentro:</p>
  <div class="formula">Δf/Δx = (Δf/Δg) · (Δg/Δx)</div>
  <p>Al hacer los incrementos infinitesimales, el primer factor tiende a f′(g(x)) y el segundo a g′(x). La demostración rigurosa tiene que cuidar el caso Δg = 0, pero la intuición es esa: <b>las tasas de cambio se multiplican en cadena</b>.</p>`},

 {h:"Teorema del valor medio: el caballo de batalla",
  c:`<p>Si f es continua en [a,b] y derivable en (a,b), existe algún c dentro con</p>
  <div class="formula">f′(c) = [f(b) − f(a)] / (b − a)</div>
  <p>En algún punto, la pendiente instantánea coincide con la media. Si condujiste 100 km en 1 hora, en algún instante ibas exactamente a 100 km/h.</p>
  <p>De aquí salen, casi como corolarios:</p>
  <ul>
  <li>Si f′ = 0 en todo un intervalo, f es constante ahí.</li>
  <li>Si f′ &gt; 0, f es estrictamente creciente.</li>
  <li>Dos funciones con la misma derivada difieren en una constante — <b>que es exactamente por qué existe la «+C»</b> de las integrales.</li>
  </ul>`},

 {h:"El teorema fundamental del cálculo",
  c:`<p>Tiene dos mitades y conviene no confundirlas:</p>
  <div class="formula">(1)  d/dx ∫<sub>a</sub><sup>x</sup> f(t)dt = f(x)</div>
  <div class="formula">(2)  ∫<sub>a</sub><sup>b</sup> f(x)dx = F(b) − F(a),  con F′ = f</div>
  <p>La primera dice que <b>derivar deshace integrar</b>. La segunda, la regla de Barrow, es la que usas para calcular. La demostración de (1) es directa: el área añadida entre x y x+h es aproximadamente f(x)·h, así que el cociente incremental tiende a f(x).</p>
  <p class="tip">🔗 En cálculo estocástico este teorema <b>no</b> tiene análogo directo: la integral de Itô no se calcula con una primitiva, porque el browniano no es derivable en ningún punto. Por eso hace falta el lema de Itô.</p>`},

 {h:"Por qué e es la base natural",
  c:`<p>De todas las exponenciales a<sup>x</sup>, la derivada es siempre proporcional a la propia función: (a<sup>x</sup>)′ = k·a<sup>x</sup> con k = ln a. <b>e es el único número para el que esa constante vale 1</b>, y por eso es la base que simplifica todo.</p>
  <div class="formula">e = lím<sub>n→∞</sub> (1 + 1/n)<sup>n</sup> ≈ 2,71828</div>
  <p>Esa misma expresión es la de una cuenta que capitaliza n veces al año: cuando n → ∞ se obtiene la <b>capitalización continua</b>, y de ahí que el descuento financiero se escriba e<sup>−rT</sup>.</p>`},

 {h:"Continuidad y derivabilidad no son lo mismo",
  c:`<ul>
  <li><b>Derivable ⟹ continua.</b> Siempre.</li>
  <li><b>Continua ⟹ derivable.</b> Falso: |x| es continua en 0 pero tiene un pico.</li>
  <li>Existen funciones continuas <b>en todos los puntos y derivables en ninguno</b>: la función de Weierstrass es el ejemplo clásico… y las trayectorias del movimiento browniano son otro.</li>
  </ul>
  <p class="tip">🔗 Que el browniano sea continuo pero no derivable es lo que obliga a inventar una integral nueva. No es una rareza teórica: es el motivo de que exista el cálculo de Itô.</p>`}
]},

/* =================================================================
   6 · AMPLIACIÓN · INTEGRACIÓN AVANZADA
   ================================================================= */
{id:"ma-ap-12", t:"Integración avanzada: las técnicas que faltaban", emo:"🛠️", min:12,
 res:"Fracciones parciales con todos sus casos, sustitución trigonométrica completa, por partes cíclica, y cuándo converge una impropia.",
 secciones:[

 {h:"Fracciones parciales: los cuatro casos",
  c:`<p>Para integrar P(x)/Q(x), primero: <b>si grado(P) ≥ grado(Q), divide</b>. Después, factoriza Q y monta la descomposición según lo que salga:</p>
  <table class="tabla">
  <tr><th>Factor en Q</th><th>Qué se pone</th></tr>
  <tr><td>(x − a) simple</td><td>A/(x − a)</td></tr>
  <tr><td>(x − a)<sup>k</sup> repetido</td><td>A₁/(x−a) + A₂/(x−a)² + … + A<sub>k</sub>/(x−a)<sup>k</sup></td></tr>
  <tr><td>(x² + bx + c) irreducible</td><td>(Ax + B)/(x² + bx + c)</td></tr>
  <tr><td>(x² + bx + c)<sup>k</sup></td><td>una fracción de ese tipo por cada potencia</td></tr>
  </table>
  <p><b>Cómo hallar los coeficientes:</b> multiplica por el denominador común y o bien sustituye las raíces (rápido para factores simples) o bien iguala coeficientes de cada potencia (siempre funciona).</p>`},

 {h:"Ejemplo con factor repetido",
  c:`<div class="ejer"><div class="ejer-enun">∫ (3x + 5)/((x−1)²(x+2)) dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Descomposición: A/(x−1) + B/(x−1)² + C/(x+2).</li>
  <li>3x+5 = A(x−1)(x+2) + B(x+2) + C(x−1)².</li>
  <li>x = 1 ⟹ 8 = 3B ⟹ B = 8/3.</li>
  <li>x = −2 ⟹ −1 = 9C ⟹ C = −1/9.</li>
  <li>Coeficiente de x²: 0 = A + C ⟹ A = 1/9.</li>
  <li>Integra cada trozo: los de grado 1 dan logaritmos; el repetido da una potencia negativa.</li>
  </ol>
  <div class="resultado-ej">(1/9)ln|x−1| − (8/3)/(x−1) − (1/9)ln|x+2| + C</div>
  </details></div>`},

 {h:"Sustitución trigonométrica: la tabla",
  c:`<table class="tabla">
  <tr><th>Si ves…</th><th>Sustituye</th><th>Y queda</th></tr>
  <tr><td>√(a² − x²)</td><td>x = a·sen θ</td><td>a·cos θ</td></tr>
  <tr><td>√(a² + x²)</td><td>x = a·tan θ</td><td>a·sec θ</td></tr>
  <tr><td>√(x² − a²)</td><td>x = a·sec θ</td><td>a·tan θ</td></tr>
  </table>
  <p>La lógica es siempre la misma: usar una identidad pitagórica para que la raíz desaparezca. Al final hay que <b>volver a x</b>, y para eso se dibuja el triángulo rectángulo correspondiente.</p>
  <p class="tip">⚠️ Antes de sustituir, comprueba si el numerador ya es la derivada de lo de dentro. ∫x/√(1−x²)dx sale con una sustitución simple u = 1−x², no hace falta trigonometría.</p>`},

 {h:"Por partes cíclica",
  c:`<div class="ejer"><div class="ejer-enun">∫ e<sup>x</sup>·sen x dx</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Llama I a la integral. Por partes con u = sen x, dv = e<sup>x</sup>dx: I = e<sup>x</sup>sen x − ∫e<sup>x</sup>cos x dx.</li>
  <li>Por partes otra vez en la nueva: ∫e<sup>x</sup>cos x dx = e<sup>x</sup>cos x + ∫e<sup>x</sup>sen x dx = e<sup>x</sup>cos x + I.</li>
  <li>Sustituye: I = e<sup>x</sup>sen x − e<sup>x</sup>cos x − I.</li>
  <li><b>Despeja I como si fuera una incógnita:</b> 2I = e<sup>x</sup>(sen x − cos x).</li>
  </ol>
  <div class="resultado-ej">I = ½·e<sup>x</sup>(sen x − cos x) + C</div>
  <p class="tip">💡 Cuando por partes te devuelve la integral original, no has fracasado: <b>tienes una ecuación</b>. Despeja.</p>
  </details></div>`},

 {h:"Integrales impropias y convergencia",
  c:`<p>Hay dos tipos y ambos se definen con un límite:</p>
  <ul>
  <li><b>Intervalo infinito:</b> ∫<sub>a</sub><sup>∞</sup> f = lím<sub>b→∞</sub>∫<sub>a</sub><sup>b</sup> f.</li>
  <li><b>Integrando que explota:</b> ∫₀¹ dx/√x, con una asíntota en 0.</li>
  </ul>
  <p>El criterio que hay que tener grabado es el de las potencias:</p>
  <div class="formula">∫₁<sup>∞</sup> dx/x<sup>p</sup> converge ⟺ p &gt; 1 &nbsp;&nbsp;·&nbsp;&nbsp; ∫₀¹ dx/x<sup>p</sup> converge ⟺ p &lt; 1</div>
  <p>Fíjate en que son <b>condiciones opuestas</b>: en el infinito hace falta que la cola caiga rápido; en el origen, que la singularidad sea suave. El caso p = 1 (la hipérbola 1/x) diverge en los dos extremos.</p>
  <p><b>Criterio de comparación:</b> si 0 ≤ f ≤ g y ∫g converge, ∫f también. Es la herramienta práctica: acota tu integrando por uno conocido.</p>`},

 {h:"Integrales que no tienen primitiva elemental",
  c:`<p>Estas aparecen constantemente y <b>no se pueden resolver</b> con funciones elementales, por mucho que lo intentes:</p>
  <table class="tabla">
  <tr><th>Integral</th><th>Qué se hace</th></tr>
  <tr><td>∫e<sup>−x²</sup>dx</td><td>se define la función error erf(x) y se tabula (es la N(·) de Black–Scholes)</td></tr>
  <tr><td>∫(sen x)/x dx</td><td>seno integral Si(x)</td></tr>
  <tr><td>∫dx/ln x</td><td>logaritmo integral li(x)</td></tr>
  <tr><td>∫√(1 + x⁴)dx</td><td>integrales elípticas</td></tr>
  </table>
  <p class="tip">🧭 Reconocerlas ahorra horas. Si en un examen te topas con e<sup>−x²</sup>, o hay límites que permiten el truco polar, o la respuesta se deja en términos de N(·).</p>`}
]},

/* =================================================================
   7 · AMPLIACIÓN · SISTEMAS DE EDO Y ESTABILIDAD
   ================================================================= */
{id:"ma-ap-13", t:"Sistemas de EDO, estabilidad y Laplace", emo:"📡", min:11,
 res:"Cuando hay varias funciones acopladas: matriz del sistema, autovalores como destino, plano de fases y la transformada de Laplace.",
 secciones:[

 {h:"Un sistema lineal es una matriz",
  c:`<p>Dos ecuaciones acopladas se escriben de un plumazo:</p>
  <div class="formula">x′ = ax + by · y′ = cx + dy &nbsp;&nbsp;⟺&nbsp;&nbsp; <b>v′ = A·v</b></div>
  <p>Y la solución es la copia exacta del caso escalar:</p>
  <div class="formula">v(t) = e<sup>At</sup>·v(0)</div>
  <p>Si A es diagonalizable con autovalores λᵢ y autovectores vᵢ, la solución general es una combinación de <b>modos</b>:</p>
  <div class="formula">v(t) = c₁e<sup>λ₁t</sup>v₁ + c₂e<sup>λ₂t</sup>v₂</div>
  <p>Cada autovector es una dirección que el sistema no mezcla: si empiezas ahí, te quedas ahí, solo cambia la escala.</p>`},

 {h:"Los autovalores deciden el destino",
  c:`<table class="tabla">
  <tr><th>Autovalores</th><th>Comportamiento</th><th>Nombre</th></tr>
  <tr><td>ambos reales &lt; 0</td><td>todo tiende al origen</td><td>nodo estable</td></tr>
  <tr><td>ambos reales &gt; 0</td><td>todo se escapa</td><td>nodo inestable</td></tr>
  <tr><td>signos opuestos</td><td>atrae por una dirección, repele por otra</td><td>punto de silla</td></tr>
  <tr><td>complejos con parte real &lt; 0</td><td>espiral hacia dentro</td><td>foco estable</td></tr>
  <tr><td>complejos con parte real &gt; 0</td><td>espiral hacia fuera</td><td>foco inestable</td></tr>
  <tr><td>imaginarios puros</td><td>órbitas cerradas</td><td>centro</td></tr>
  </table>
  <p class="tip">📌 Regla que resume todo: <b>el signo de la parte real manda la estabilidad; la parte imaginaria manda la oscilación.</b></p>`},

 {h:"Ejemplo resuelto",
  c:`<div class="ejer"><div class="ejer-enun">x′ = x + 2y, y′ = 2x + y. Clasifica y resuelve.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>A = <span class="mono">[[1,2],[2,1]]</span>. Traza 2, determinante −3.</li>
  <li>λ² − 2λ − 3 = 0 ⟹ λ = 3 y λ = −1. <b>Signos opuestos ⟹ punto de silla</b>, inestable.</li>
  <li>λ = 3: (1−3)x + 2y = 0 ⟹ y = x ⟹ v = (1,1) (dirección que se escapa).</li>
  <li>λ = −1: 2x + 2y = 0 ⟹ y = −x ⟹ v = (1,−1) (dirección que colapsa al origen).</li>
  </ol>
  <div class="resultado-ej">v(t) = c₁e<sup>3t</sup>(1,1) + c₂e<sup>−t</sup>(1,−1)</div>
  <p>Salvo que empieces exactamente sobre la recta y = −x, a la larga domina el término e<sup>3t</sup> y todo se va por la diagonal y = x.</p>
  </details></div>`},

 {h:"Transformada de Laplace: el atajo",
  c:`<p>La idea: convertir una ecuación diferencial en una <b>ecuación algebraica</b>.</p>
  <div class="formula">ℒ{f}(s) = ∫₀<sup>∞</sup> e<sup>−st</sup>f(t)dt</div>
  <table class="tabla">
  <tr><th>f(t)</th><th>ℒ{f}(s)</th></tr>
  <tr><td>1</td><td>1/s</td></tr>
  <tr><td>e<sup>at</sup></td><td>1/(s−a)</td></tr>
  <tr><td>t<sup>n</sup></td><td>n!/s<sup>n+1</sup></td></tr>
  <tr><td>sen(ωt)</td><td>ω/(s²+ω²)</td></tr>
  <tr><td>cos(ωt)</td><td>s/(s²+ω²)</td></tr>
  <tr><td><b>f′(t)</b></td><td><b>s·F(s) − f(0)</b></td></tr>
  <tr><td>f″(t)</td><td>s²F(s) − s·f(0) − f′(0)</td></tr>
  </table>
  <p>La fila clave es la de f′: <b>derivar se convierte en multiplicar por s</b>, y las condiciones iniciales entran solas. Método: transformar → despejar F(s) → descomponer en fracciones parciales → antitransformar.</p>`},

 {h:"Ejemplo con Laplace",
  c:`<div class="ejer"><div class="ejer-enun">y′ + 3y = 0 con y(0) = 2.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Transforma: [sY(s) − 2] + 3Y(s) = 0.</li>
  <li>Agrupa: Y(s)(s + 3) = 2.</li>
  <li>Despeja: Y(s) = 2/(s + 3).</li>
  <li>Antitransforma con la tabla: 1/(s−a) ↔ e<sup>at</sup>, con a = −3.</li>
  </ol>
  <div class="resultado-ej">y(t) = 2·e<sup>−3t</sup></div>
  <p class="tip">💡 Para una EDO tan simple es matar moscas a cañonazos, pero con entradas discontinuas (un escalón, un impulso) Laplace es imbatible: no hay que trocear el problema.</p>
  </details></div>`},

 {h:"Cuándo NO son lineales",
  c:`<p>Si el sistema no es lineal, no hay fórmula cerrada. Lo que se hace es <b>linealizar alrededor de los puntos de equilibrio</b>:</p>
  <ol>
  <li>Encuentra los puntos donde x′ = 0 e y′ = 0.</li>
  <li>Calcula la <b>matriz jacobiana</b> de las derivadas parciales en ese punto.</li>
  <li>Clasifica sus autovalores con la tabla de arriba.</li>
  </ol>
  <p>Cerca del equilibrio, el sistema no lineal se comporta como su linealización — salvo en el caso frontera de los imaginarios puros, donde la linealización no decide.</p>`}
]}

);
