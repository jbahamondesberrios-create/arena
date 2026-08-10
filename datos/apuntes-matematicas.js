/* ============================================================
   APUNTES · MATEMÁTICAS — modo estudio (sin preguntas)
   ============================================================ */

window.APUNTES = window.APUNTES || {};

window.APUNTES.matematicas = [

/* ================================================================= */
{id:"ma-ap-1", t:"Derivadas: la máquina de pendientes", emo:"📉", min:8,
 res:"Qué mide una derivada, la tabla que hay que tener en la cabeza y las tres reglas que resuelven el 95 % de los casos.",
 secciones:[

 {h:"La idea en una frase",
  c:`<p>La derivada es la <b>pendiente instantánea</b>. Si f(t) es la posición, f′(t) es la velocidad. Si f(x) es el precio de una opción, f′(x) es su <b>delta</b>: cuánto se mueve por cada unidad que se mueve el subyacente.</p>
  <div class="formula">f′(x) = lím<sub>h→0</sub> [ f(x+h) − f(x) ] / h</div>
  <p>Todo lo demás son atajos para no tener que calcular ese límite nunca más.</p>`},

 {h:"La tabla que hay que saber de memoria",
  c:`<table class="tabla">
  <tr><th>f(x)</th><th>f′(x)</th><th>por qué</th></tr>
  <tr><td>x<sup>n</sup></td><td>n·x<sup>n−1</sup></td><td>regla de la potencia</td></tr>
  <tr><td>constante</td><td>0</td><td>no cambia</td></tr>
  <tr><td>e<sup>x</sup></td><td>e<sup>x</sup></td><td>su propia derivada</td></tr>
  <tr><td>e<sup>kx</sup></td><td>k·e<sup>kx</sup></td><td>cadena: baja la k</td></tr>
  <tr><td>ln x</td><td>1/x</td><td>x &gt; 0</td></tr>
  <tr><td>sen x</td><td>cos x</td><td rowspan="2">ciclo de 4: sen→cos→−sen→−cos</td></tr>
  <tr><td>cos x</td><td>−sen x</td></tr>
  <tr><td>tan x</td><td>sec² x = 1 + tan² x</td><td>vía cociente</td></tr>
  <tr><td>√x</td><td>1/(2√x)</td><td>potencia con n = ½</td></tr>
  <tr><td>1/x</td><td>−1/x²</td><td>potencia con n = −1</td></tr>
  <tr><td>arctan x</td><td>1/(1 + x²)</td><td>sale mucho al integrar</td></tr>
  </table>
  <p class="tip">💡 El error nº 1 de todo el cálculo: olvidar el <b>menos</b> en la derivada del coseno.</p>`},

 {h:"Las tres reglas",
  c:`<div class="formula">Producto:  (f·g)′ = f′g + fg′</div>
  <div class="formula">Cociente:  (f/g)′ = (f′g − fg′) / g²</div>
  <div class="formula">Cadena:   (f∘g)′(x) = f′(g(x)) · g′(x)</div>
  <p>El cociente <b>no es simétrico</b>: si inviertes el orden del numerador, cambias el signo del resultado. Cantinela útil: <i>«abajo por derivada de arriba, menos arriba por derivada de abajo, todo sobre abajo al cuadrado»</i>.</p>
  <p>La cadena es la que más se hace a medias. Ejemplo completo:</p>
  <div class="formula">d/dx [ e<sup>−x²/2</sup> ] = e<sup>−x²/2</sup> · (−x) = −x·e<sup>−x²/2</sup></div>
  <p>Primero derivas lo de fuera dejando lo de dentro intacto, <b>después</b> multiplicas por la derivada de dentro.</p>`},

 {h:"Para qué sirve: máximos, mínimos y forma",
  c:`<ul>
  <li><b>f′ &gt; 0</b> → la función crece · <b>f′ &lt; 0</b> → decrece.</li>
  <li><b>f′ = 0</b> → punto crítico. Candidato a extremo, <i>no garantía</i>: x³ tiene f′(0) = 0 y no hay ni máximo ni mínimo.</li>
  <li><b>f″ &gt; 0</b> → cóncava hacia arriba (∪), y si además f′ = 0 es un <b>mínimo</b>.</li>
  <li><b>f″ &lt; 0</b> → cóncava hacia abajo (∩), y si f′ = 0 es un <b>máximo</b>.</li>
  <li><b>Inflexión</b>: f″ cambia de signo. Que f″ = 0 no basta por sí solo.</li>
  </ul>
  <p class="tip">🔗 La convexidad (f″ &gt; 0) es la razón de que las opciones valgan más de lo que sugiere la intuición lineal: es la desigualdad de Jensen actuando.</p>`},

 {h:"Derivadas parciales y gradiente",
  c:`<p>Con varias variables, <b>∂f/∂x</b> es derivar respecto de x <b>congelando</b> las demás. El gradiente ∇f = (∂f/∂x, ∂f/∂y) apunta en la dirección de máximo crecimiento.</p>
  <p>Regla de la cadena multivariable, si x e y dependen de t:</p>
  <div class="formula">df/dt = ∂f/∂x · x′(t) + ∂f/∂y · y′(t)</div>
  <p>Cada camino por el que t llega a f aporta un sumando.</p>`},

 {h:"Taylor: aproximar por polinomios",
  c:`<div class="formula">f(x) ≈ f(a) + f′(a)(x−a) + ½f″(a)(x−a)² + …</div>
  <p>Truncar en el primer orden es «aproximar por la recta tangente». Truncar en el <b>segundo</b> orden es lo que hace el lema de Itô — con la diferencia de que allí el término (dx)² <b>no se puede despreciar</b>, porque (dW)² = dt. Ese es literalmente todo el misterio del cálculo estocástico.</p>`}
]},

/* ================================================================= */
{id:"ma-ap-2", t:"Integrales: acumular y deshacer", emo:"∫", min:8,
 res:"El Teorema Fundamental, la tabla básica y cómo decidir en 5 segundos qué técnica usar.",
 secciones:[

 {h:"Dos caras de la misma moneda",
  c:`<p>Una integral es una <b>suma de trocitos infinitesimales</b>: área bajo la curva, distancia recorrida, valor acumulado. La <b>primitiva</b> es la operación inversa de derivar. El Teorema Fundamental dice que son lo mismo:</p>
  <div class="formula">d/dx ∫<sub>a</sub><sup>x</sup> f(t) dt = f(x)  ·  ∫<sub>a</sub><sup>b</sup> f = F(b) − F(a)</div>
  <p>Esto es lo que convierte un problema geométrico difícil (área) en uno algebraico fácil (buscar una primitiva).</p>`},

 {h:"Tabla básica",
  c:`<table class="tabla">
  <tr><th>∫ f dx</th><th>resultado</th></tr>
  <tr><td>x<sup>n</sup> (n ≠ −1)</td><td>x<sup>n+1</sup>/(n+1) + C</td></tr>
  <tr><td>1/x</td><td>ln|x| + C</td></tr>
  <tr><td>e<sup>x</sup></td><td>e<sup>x</sup> + C</td></tr>
  <tr><td>e<sup>kx</sup></td><td>e<sup>kx</sup>/k + C</td></tr>
  <tr><td>sen x</td><td>−cos x + C</td></tr>
  <tr><td>cos x</td><td>sen x + C</td></tr>
  <tr><td>sec² x</td><td>tan x + C</td></tr>
  <tr><td>1/(1+x²)</td><td>arctan x + C</td></tr>
  <tr><td>ln x</td><td>x·ln x − x + C</td></tr>
  </table>
  <p class="tip">💡 Fíjate en el cruce de signos: al <b>derivar</b> el menos aparece en el coseno; al <b>integrar</b> aparece en el seno.</p>`},

 {h:"Qué técnica usar — árbol de decisión",
  c:`<ul>
  <li><b>¿Ves la derivada de algo, multiplicando a ese algo?</b> → <b>sustitución</b>. Ej. ∫2x·e^(x²)dx con u = x².</li>
  <li><b>¿Es un producto donde una parte se simplifica al derivar?</b> → <b>por partes</b>. Ej. x·eˣ, x·sen x, ln x.</li>
  <li><b>¿Es un cociente de polinomios con denominador factorizable?</b> → <b>fracciones parciales</b>.</li>
  <li><b>¿Aparece √(a² − x²) o √(x² + a²)?</b> → <b>sustitución trigonométrica</b>.</li>
  </ul>
  <div class="formula">Por partes:  ∫u dv = uv − ∫v du</div>
  <p>Para elegir u, la regla <b>ILATE</b> por orden de prioridad: <b>I</b>nversa trigonométrica, <b>L</b>ogarítmica, <b>A</b>lgebraica, <b>T</b>rigonométrica, <b>E</b>xponencial. Si la integral que queda es peor que la original, elegiste mal: cambia u por dv.</p>`},

 {h:"Integrales definidas e impropias",
  c:`<p>La integral definida es un <b>área con signo</b>: donde f &lt; 0, resta. Para área geométrica real hay que integrar |f|.</p>
  <p>Una integral es <b>impropia</b> si el intervalo es infinito o el integrando se dispara. Se define como límite:</p>
  <div class="formula">∫<sub>1</sub><sup>∞</sup> f = lím<sub>b→∞</sub> ∫<sub>1</sub><sup>b</sup> f</div>
  <p>Caso de referencia: ∫₁^∞ dx/x <b>diverge</b>, ∫₁^∞ dx/x² <b>converge a 1</b>. La frontera está justo en el exponente 1.</p>`},

 {h:"La integral que no se puede resolver",
  c:`<p>∫e^(−x²/2)dx <b>no tiene primitiva elemental</b>. Ninguna combinación de polinomios, exponenciales, logaritmos y trigonométricas la da. Por eso se define una función nueva:</p>
  <div class="formula">N(x) = (1/√2π) ∫<sub>−∞</sub><sup>x</sup> e<sup>−z²/2</sup> dz</div>
  <p>Esa N es la que aparece en Black–Scholes. No es que nadie haya sabido resolverla: es que <b>demostradamente</b> no se puede en términos elementales. Se tabula o se aproxima numéricamente.</p>`}
]},

/* ================================================================= */
{id:"ma-ap-3", t:"Ecuaciones diferenciales", emo:"🌀", min:10,
 res:"Clasificar en 10 segundos, resolver primer orden por dos métodos y el recetario completo de segundo orden.",
 secciones:[

 {h:"Qué es y cómo se clasifica",
  c:`<p>Una EDO relaciona una función desconocida con sus derivadas. Resolverla es <b>encontrar la función</b>, no un número. Antes de intentar nada, clasifícala:</p>
  <ul>
  <li><b>Orden</b>: el de la derivada más alta. y″ + 3y′ = 0 es de orden 2.</li>
  <li><b>Lineal</b>: y y sus derivadas aparecen a la primera potencia y sin multiplicarse entre sí. y′ + p(x)y = q(x) es lineal por horribles que sean p y q. <b>y′ = y²</b> no lo es.</li>
  <li><b>Homogénea</b>: el término independiente es 0.</li>
  <li><b>Separable</b>: se puede escribir y′ = f(x)·g(y).</li>
  </ul>
  <p>Una EDO de orden n necesita <b>n condiciones</b> para tener solución única (una por cada constante de integración).</p>`},

 {h:"Primer orden: separación de variables",
  c:`<p>Si y′ = f(x)·g(y), separa y integra:</p>
  <div class="formula">dy / g(y) = f(x) dx  ⟹  ∫ dy/g(y) = ∫ f(x) dx + C</div>
  <p><b>Ejemplo canónico:</b> y′ = ky.</p>
  <div class="formula">dy/y = k dx ⟹ ln|y| = kt + C ⟹ <b>y = C·e<sup>kt</sup></b></div>
  <p>Esta es la EDO más importante que existe: interés compuesto continuo, decaimiento radiactivo, crecimiento de poblaciones, y el activo libre de riesgo dB = rB dt ⟹ B(t) = B₀e^(rt).</p>
  <p class="tip">⚠️ Al dividir entre g(y) puedes perder soluciones. Comprueba siempre si g(y) = 0 da soluciones constantes extra.</p>`},

 {h:"Primer orden lineal: factor integrante",
  c:`<p>Para y′ + p(x)y = q(x), el truco es multiplicar por algo que haga colapsar el lado izquierdo en una derivada de producto:</p>
  <div class="formula">μ(x) = e<sup>∫p(x)dx</sup></div>
  <p>Al multiplicar, el lado izquierdo se convierte exactamente en (μy)′. Entonces:</p>
  <div class="formula">(μy)′ = μq  ⟹  y = [ ∫μq dx + C ] / μ</div>
  <p>No es magia: μ está construido justo para que μ′ = pμ, que es lo que hace funcionar la regla del producto al revés.</p>`},

 {h:"Segundo orden con coeficientes constantes",
  c:`<p>Para y″ + by′ + cy = 0, prueba y = e^(rt) y sale la <b>ecuación característica</b>:</p>
  <div class="formula">r² + br + c = 0</div>
  <table class="tabla">
  <tr><th>Raíces</th><th>Solución general</th><th>Comportamiento</th></tr>
  <tr><td>reales distintas r₁ ≠ r₂</td><td>C₁e<sup>r₁t</sup> + C₂e<sup>r₂t</sup></td><td>sobreamortiguado</td></tr>
  <tr><td>doble r</td><td>(C₁ + C₂t)·e<sup>rt</sup></td><td>críticamente amortiguado</td></tr>
  <tr><td>complejas α ± βi</td><td>e<sup>αt</sup>(C₁cos βt + C₂sen βt)</td><td>oscila; α decide si crece o se apaga</td></tr>
  </table>
  <p>El caso de la raíz doble necesita el factor <b>t</b> obligatoriamente: sin él las dos soluciones serían la misma y no formarían base.</p>`},

 {h:"No homogéneas: superposición",
  c:`<div class="formula">y<sub>general</sub> = y<sub>homogénea</sub> + y<sub>particular</sub></div>
  <p>Primero resuelves la homogénea (ahí viven las constantes), luego cazas <b>una</b> solución particular cualquiera y las sumas. Para hallar la particular:</p>
  <ul>
  <li><b>Coeficientes indeterminados</b>: si el término independiente es polinomio, exponencial o seno/coseno, propón algo del mismo tipo con coeficientes por determinar.</li>
  <li><b>Variación de parámetros</b>: método general, más pesado, siempre funciona.</li>
  </ul>`},

 {h:"Exactas y EDP",
  c:`<p>M dx + N dy = 0 es <b>exacta</b> si ∂M/∂y = ∂N/∂x. Entonces existe F con F_x = M, F_y = N, y la solución es F(x,y) = C.</p>
  <p>Cuando aparecen derivadas respecto de <b>dos o más</b> variables, es una <b>EDP</b>. Las dos que importan aquí:</p>
  <div class="formula">Calor:  u<sub>t</sub> = k·u<sub>xx</sub></div>
  <div class="formula">Black–Scholes:  v<sub>t</sub> + rx·v<sub>x</sub> + ½σ²x²·v<sub>xx</sub> = rv</div>
  <p class="tip">🔗 Con un cambio de variable, Black–Scholes <b>se convierte</b> en la ecuación del calor. Por eso la solución acaba llevando una distribución normal dentro: es la difusión suavizando el pago inicial.</p>`}
]},

/* ================================================================= */
{id:"ma-ap-4", t:"Álgebra lineal I: vectores, bases y sistemas", emo:"🧱", min:9,
 res:"Independencia, base, dimensión, rango y cómo saber si un sistema tiene 0, 1 o infinitas soluciones.",
 secciones:[

 {h:"Independencia lineal",
  c:`<p>Un conjunto de vectores es <b>linealmente independiente</b> si la única combinación que da el vector nulo es la trivial:</p>
  <div class="formula">c₁v₁ + c₂v₂ + … + c<sub>k</sub>v<sub>k</sub> = 0  ⟹  todos los c<sub>i</sub> = 0</div>
  <p>Traducido: <b>ninguno es redundante</b>, ninguno se puede construir con los demás. Ortogonales ⟹ independientes, pero <b>no al revés</b>.</p>`},

 {h:"Base y dimensión",
  c:`<p>Una <b>base</b> = independiente + genera todo el espacio. Es un sistema de coordenadas: cada vector se escribe de <b>una única</b> manera en esa base.</p>
  <p>Hecho no obvio y fundamental: todas las bases de un mismo espacio tienen el <b>mismo número</b> de vectores. Ese número es la <b>dimensión</b>.</p>`},

 {h:"Rango y núcleo",
  c:`<p>El <b>rango</b> de A es el número de columnas independientes = la dimensión de la imagen. El <b>núcleo</b> es el conjunto de x con Ax = 0: lo que la transformación aplasta a cero.</p>
  <div class="formula">rango(A) + dim(núcleo A) = nº de columnas</div>
  <p>Teorema del <b>rango-nulidad</b>: lo que sobrevive más lo que se destruye da el total. Y siempre rango(A) ≤ mín(filas, columnas).</p>
  <p class="tip">💡 Rango por filas = rango por columnas. Siempre. No es evidente y es muy útil.</p>`},

 {h:"Sistemas Ax = b",
  c:`<table class="tabla">
  <tr><th>Situación</th><th>Soluciones</th></tr>
  <tr><td>rango(A) &lt; rango(A|b)</td><td><b>ninguna</b> — incompatible</td></tr>
  <tr><td>rango(A) = rango(A|b) = nº incógnitas</td><td><b>una única</b></td></tr>
  <tr><td>rango(A) = rango(A|b) &lt; nº incógnitas</td><td><b>infinitas</b></td></tr>
  </table>
  <p>Para A cuadrada, todo se reduce a un número: <b>det(A) ≠ 0 ⟺ solución única</b>.</p>
  <p>Método estándar: <b>eliminación gaussiana</b>. Matriz aumentada (A|b) → ceros bajo cada pivote → forma escalonada → sustitución hacia atrás.</p>`},

 {h:"Producto punto, norma y ortogonalidad",
  c:`<div class="formula">u·v = Σ u<sub>i</sub>v<sub>i</sub> = ‖u‖‖v‖·cos θ</div>
  <ul>
  <li><b>‖u‖ = √(u·u)</b> es la longitud.</li>
  <li><b>u·v = 0</b> ⟺ ortogonales (90°).</li>
  <li><b>Proyección</b> de v sobre u: (u·v / u·u)·u — la «sombra» de v en la dirección de u.</li>
  </ul>
  <p class="tip">🔗 Esa fórmula de proyección es idéntica a la del coeficiente de regresión β = cov(x,y)/var(x). En estadística, «ortogonal» significa <b>correlación cero</b>, y la regresión es literalmente una proyección ortogonal.</p>`}
]},

/* ================================================================= */
{id:"ma-ap-5", t:"Álgebra lineal II: determinantes y autovalores", emo:"🔷", min:9,
 res:"Determinante como factor de volumen, inversa 2×2 de memoria, y el truco traza-determinante para autovalores.",
 secciones:[

 {h:"Determinante",
  c:`<div class="formula">det [[a,b],[c,d]] = ad − bc</div>
  <p>Para 3×3, regla de Sarrus o desarrollo por cofactores. Lo importante no es calcularlo sino <b>qué significa</b>: |det(A)| es el factor por el que A <b>escala volúmenes</b>. Y el signo dice si invierte la orientación.</p>
  <p>Por eso <b>det = 0</b> significa que la transformación aplasta el espacio a una dimensión menor: se pierde información, y por eso no se puede invertir.</p>
  <p>Propiedad clave: <b>det(AB) = det(A)·det(B)</b>, de donde det(A⁻¹) = 1/det(A).</p>`},

 {h:"La cadena de equivalencias",
  c:`<p>Para A cuadrada n×n, todas estas afirmaciones son <b>la misma</b>:</p>
  <ul>
  <li>det(A) ≠ 0</li>
  <li>A es invertible</li>
  <li>rango(A) = n</li>
  <li>núcleo(A) = {0}</li>
  <li>las columnas son linealmente independientes</li>
  <li>Ax = b tiene solución única para todo b</li>
  <li>ningún autovalor es 0</li>
  </ul>
  <p>Si te dan una de ellas, tienes todas las demás gratis.</p>`},

 {h:"Inversa 2×2 — memorízala",
  c:`<div class="formula">[[a,b],[c,d]]<sup>−1</sup> = (1/(ad−bc)) · [[d,−b],[−c,a]]</div>
  <p><b>Intercambia la diagonal principal, cambia el signo de la otra, divide por el determinante.</b> Se usa constantemente y es de las pocas fórmulas que vale la pena tener automatizada.</p>`},

 {h:"Autovalores y autovectores",
  c:`<div class="formula">Av = λv,  v ≠ 0</div>
  <p>Direcciones que la transformación solo <b>estira</b>, sin girarlas. Se hallan resolviendo el polinomio característico det(A − λI) = 0.</p>
  <p><b>Atajo para 2×2:</b></p>
  <div class="formula">λ₁ + λ₂ = traza(A)  ·  λ₁ · λ₂ = det(A)</div>
  <p>De donde λ² − (traza)λ + det = 0. Con eso resuelves cualquier 2×2 mentalmente, sin montar el determinante simbólico.</p>`},

 {h:"Diagonalización",
  c:`<div class="formula">A = P D P<sup>−1</sup></div>
  <p>D lleva los autovalores en la diagonal y P los autovectores en columnas. Solo funciona si hay una <b>base completa</b> de autovectores. Autovalores distintos ⟹ autovectores independientes ⟹ diagonalizable. Pero [[1,1],[0,1]] tiene λ = 1 doble y un solo autovector: no es diagonalizable.</p>
  <p>Para qué sirve: <b>A<sup>n</sup> = P D<sup>n</sup> P<sup>−1</sup></b>, y elevar una diagonal es elevar cada número. Convierte un problema iterativo en uno de una línea.</p>
  <p><b>Teorema espectral:</b> toda matriz <b>simétrica real</b> es diagonalizable, con autovalores reales y autovectores ortogonales. Sin excepciones.</p>`},

 {h:"Descomposiciones y para qué se usan",
  c:`<table class="tabla">
  <tr><th>Descomposición</th><th>Forma</th><th>Se usa para</th></tr>
  <tr><td>Diagonalización</td><td>A = PDP⁻¹</td><td>potencias, sistemas dinámicos</td></tr>
  <tr><td>QR (Gram–Schmidt)</td><td>A = QR</td><td>mínimos cuadrados, regresión</td></tr>
  <tr><td>Cholesky</td><td>A = LLᵀ</td><td>simular gaussianas correlacionadas</td></tr>
  <tr><td>SVD</td><td>A = UΣVᵀ</td><td>PCA, compresión; existe siempre</td></tr>
  </table>
  <p class="tip">🔗 <b>Cholesky es la raíz cuadrada de una matriz.</b> Si quieres simular activos con matriz de covarianza Σ: generas z normales independientes y calculas x = Lz. Eso es Montecarlo multivariante en una línea. Y funciona porque toda matriz de covarianza es simétrica definida positiva.</p>`}
]},

/* ================================================================= */
{id:"ma-ap-7", t:"Límites y continuidad", emo:"🎯", min:7,
 res:"El cimiento sobre el que se apoya todo lo demás. Los límites que hay que reconocer de memoria y cuándo se puede usar L'Hôpital.",
 secciones:[

 {h:"Qué es un límite",
  c:`<p>lím<sub>x→a</sub> f(x) = L significa que puedes hacer f(x) tan cerca de L como quieras, sin más que acercar x a a lo suficiente. <b>No importa qué pasa exactamente en a</b>: importa lo que pasa alrededor.</p>
  <p>Por eso una función puede tener límite en un punto donde ni siquiera está definida. (sen x)/x en x = 0 es el ejemplo canónico: no existe f(0), pero el límite vale 1.</p>`},

 {h:"Continuidad: tres condiciones",
  c:`<p>f es continua en a si se cumplen las tres:</p>
  <ol>
  <li>f(a) <b>existe</b></li>
  <li>lím<sub>x→a</sub> f(x) <b>existe</b></li>
  <li>los dos <b>coinciden</b></li>
  </ol>
  <p>Fallar una sola rompe la continuidad. Los tres tipos de rotura: <b>evitable</b> (un agujero rellenable), de <b>salto</b> (los límites laterales difieren) e <b>infinita</b> (una asíntota vertical).</p>
  <p class="tip">💡 Derivable ⟹ continua, pero <b>no al revés</b>. |x| es continua en 0 y no derivable: la continuidad no exige suavidad, solo que no haya cortes.</p>`},

 {h:"Los límites que hay que saber de memoria",
  c:`<table class="tabla">
  <tr><th>Límite</th><th>Vale</th><th>Por qué importa</th></tr>
  <tr><td>lím<sub>x→0</sub> (sen x)/x</td><td><b>1</b></td><td>de aquí sale que (sen x)′ = cos x</td></tr>
  <tr><td>lím<sub>x→0</sub> (1 − cos x)/x²</td><td><b>½</b></td><td>el término de segundo orden</td></tr>
  <tr><td>lím<sub>x→0</sub> (e<sup>x</sup> − 1)/x</td><td><b>1</b></td><td>de aquí sale que (eˣ)′ = eˣ</td></tr>
  <tr><td>lím<sub>x→0</sub> ln(1+x)/x</td><td><b>1</b></td><td>de aquí sale que (ln x)′ = 1/x</td></tr>
  <tr><td>lím<sub>n→∞</sub> (1 + 1/n)<sup>n</sup></td><td><b>e</b></td><td>la definición de e; interés continuo</td></tr>
  <tr><td>lím<sub>n→∞</sub> (1 + r/n)<sup>n</sup></td><td><b>e<sup>r</sup></b></td><td>capitalizar infinitas veces al año</td></tr>
  </table>
  <p>Todos dicen lo mismo con distinta ropa: <b>cerca de 0, sen x ≈ x, eˣ ≈ 1 + x y ln(1+x) ≈ x</b>. Son los desarrollos de Taylor de primer orden.</p>`},

 {h:"L'Hôpital: cuándo sí y cuándo no",
  c:`<div class="formula">Si lím f/g da <b>0/0</b> o <b>∞/∞</b>:  lím f/g = lím f′/g′</div>
  <ul>
  <li><b>Comprueba primero</b> que hay indeterminación. Aplicarla sin ella da resultados falsos: lím<sub>x→1</sub>(x+1)/x vale 2, pero derivando saldría 1.</li>
  <li>Se derivan numerador y denominador <b>por separado</b>. No es la regla del cociente.</li>
  <li>Se puede repetir si vuelve a salir indeterminado.</li>
  <li>Otras indeterminaciones (0·∞, ∞−∞, 1^∞) hay que <b>reescribirlas</b> primero como cociente.</li>
  </ul>`},

 {h:"El teorema del sándwich",
  c:`<p>Si g(x) ≤ f(x) ≤ h(x) cerca de a, y g y h tienden al mismo L, entonces f también.</p>
  <div class="formula">−|x| ≤ x·sen(1/x) ≤ |x|  ⟹  lím<sub>x→0</sub> x·sen(1/x) = 0</div>
  <p>Ahí L'Hôpital no sirve de nada, porque sen(1/x) oscila infinitas veces. El sándwich lo resuelve en una línea.</p>`},

 {h:"Asíntotas",
  c:`<ul>
  <li><b>Vertical</b> en x = a: el denominador se anula y el numerador no.</li>
  <li><b>Horizontal</b> y = L: lím<sub>x→±∞</sub> f(x) = L. Los dos lados pueden dar cosas distintas.</li>
  <li><b>Oblicua</b> y = mx + n: aparece cuando el grado del numerador supera en exactamente 1 al del denominador. m = lím f(x)/x, n = lím [f(x) − mx].</li>
  </ul>
  <p class="tip">⚠️ Horizontal y oblicua son <b>excluyentes</b>: o una o la otra, nunca las dos en el mismo lado.</p>`}
]},

/* ================================================================= */
{id:"ma-ap-8", t:"Series y aproximación", emo:"➕", min:7,
 res:"Sumar infinitos términos y que dé un número finito. Cuándo se puede, y para qué sirve una serie de Taylor.",
 secciones:[

 {h:"La serie geométrica",
  c:`<div class="formula">1 + r + r² + r³ + … = 1/(1 − r),  válido si |r| &lt; 1</div>
  <p>Si empieza en r en vez de en 1, la suma es r/(1−r). Si |r| ≥ 1 <b>diverge</b>: la fórmula sigue dando un número, pero ese número no significa nada.</p>
  <p class="tip">🔗 Es la fórmula de una <b>perpetuidad</b>: un flujo constante C descontado para siempre a la tasa i vale C/i. Salen de la misma serie.</p>`},

 {h:"Convergencia: los criterios útiles",
  c:`<ul>
  <li><b>Condición necesaria</b>: si aₙ no tiende a 0, la serie diverge seguro. Pero que tienda a 0 <b>no basta</b>.</li>
  <li><b>Serie p</b>: Σ1/n^p converge si p &gt; 1 y diverge si p ≤ 1. La armónica (p = 1) <b>diverge</b>, aunque sus términos vayan a cero.</li>
  <li><b>Criterio de la razón</b>: si lím|a<sub>n+1</sub>/aₙ| &lt; 1 converge, si &gt; 1 diverge, si = 1 <b>no decide</b>.</li>
  <li><b>Alternadas</b> (Leibniz): si los términos decrecen a 0 en valor absoluto, converge.</li>
  </ul>`},

 {h:"Series de Taylor de memoria",
  c:`<table class="tabla">
  <tr><th>Función</th><th>Serie</th><th>Converge</th></tr>
  <tr><td>e<sup>x</sup></td><td>1 + x + x²/2! + x³/3! + …</td><td>todo x</td></tr>
  <tr><td>sen x</td><td>x − x³/3! + x⁵/5! − …</td><td>todo x</td></tr>
  <tr><td>cos x</td><td>1 − x²/2! + x⁴/4! − …</td><td>todo x</td></tr>
  <tr><td>ln(1+x)</td><td>x − x²/2 + x³/3 − …</td><td>−1 &lt; x ≤ 1</td></tr>
  <tr><td>1/(1−x)</td><td>1 + x + x² + x³ + …</td><td>|x| &lt; 1</td></tr>
  <tr><td>(1+x)<sup>α</sup></td><td>1 + αx + α(α−1)x²/2 + …</td><td>|x| &lt; 1</td></tr>
  </table>
  <p>El seno solo tiene potencias <b>impares</b> y el coseno solo <b>pares</b>: es su simetría escrita en coeficientes.</p>`},

 {h:"Para qué sirve truncar",
  c:`<p>Quedarte con los primeros términos convierte algo intratable en un polinomio:</p>
  <ul>
  <li><b>Grado 1</b> — la recta tangente. Es la <b>linealización</b>, y en finanzas es la delta.</li>
  <li><b>Grado 2</b> — añade curvatura. En finanzas es delta + gamma; en cálculo estocástico es el lema de Itô.</li>
  </ul>
  <div class="formula">f(x + h) ≈ f(x) + f′(x)h + ½f″(x)h²</div>
  <p>El error de truncar en grado n es del orden de h^(n+1): por eso las aproximaciones son buenísimas cerca del punto y basura lejos.</p>`},

 {h:"Dos aplicaciones que se usan a diario",
  c:`<p><b>Aproximaciones rápidas para h pequeño:</b></p>
  <div class="formula">e<sup>h</sup> ≈ 1 + h · ln(1+h) ≈ h · (1+h)<sup>α</sup> ≈ 1 + αh</div>
  <p>De ahí que una rentabilidad del 3 % dé casi lo mismo calculada de forma simple que continua: ln(1,03) = 0,0296.</p>
  <p><b>Radio de convergencia.</b> Una serie de potencias converge dentro de un intervalo centrado en a y diverge fuera. En los extremos hay que comprobarlo caso por caso.</p>`}
]},

/* ================================================================= */
{id:"ma-ap-9", t:"Cálculo en varias variables", emo:"🗻", min:8,
 res:"Parciales, gradiente, Hessiana y optimización con restricciones. Aquí es donde el cálculo se vuelve útil de verdad.",
 secciones:[

 {h:"Derivadas parciales",
  c:`<p><b>∂f/∂x</b>: derivas respecto de x <b>congelando</b> las demás variables. Nada nuevo, solo disciplina.</p>
  <p>Las <b>cruzadas</b> coinciden si f es suficientemente regular (teorema de Schwarz):</p>
  <div class="formula">∂²f/∂x∂y = ∂²f/∂y∂x</div>
  <p>Por eso la matriz Hessiana es <b>simétrica</b>, y por el teorema espectral siempre se diagonaliza con autovalores reales.</p>`},

 {h:"Gradiente",
  c:`<div class="formula">∇f = (∂f/∂x, ∂f/∂y, …)</div>
  <ul>
  <li>Apunta en la dirección de <b>máximo crecimiento</b>.</li>
  <li>Su módulo es esa pendiente máxima.</li>
  <li>Es <b>perpendicular a las curvas de nivel</b>: moverte por una curva de nivel no cambia f.</li>
  <li>La derivada en una dirección unitaria u es ∇f · u.</li>
  </ul>
  <p class="tip">🔗 Todo el «descenso de gradiente» del aprendizaje automático es esto: dar pasitos en dirección −∇f.</p>`},

 {h:"Optimizar sin restricciones",
  c:`<ol>
  <li>Resolver <b>∇f = 0</b> → puntos críticos.</li>
  <li>Construir la <b>Hessiana</b> H con las segundas parciales.</li>
  <li>Evaluarla en cada punto crítico y mirar sus autovalores:</li>
  </ol>
  <table class="tabla">
  <tr><th>Autovalores de H</th><th>Es un…</th></tr>
  <tr><td>todos &gt; 0 (definida positiva)</td><td>mínimo local</td></tr>
  <tr><td>todos &lt; 0 (definida negativa)</td><td>máximo local</td></tr>
  <tr><td>de signos mezclados</td><td><b>punto de silla</b></td></tr>
  <tr><td>alguno = 0</td><td>no concluye</td></tr>
  </table>
  <p>Para 2×2 hay un atajo: con D = f<sub>xx</sub>f<sub>yy</sub> − f<sub>xy</sub>², si D &gt; 0 y f<sub>xx</sub> &gt; 0 es mínimo; si D &gt; 0 y f<sub>xx</sub> &lt; 0 es máximo; si D &lt; 0 es silla.</p>`},

 {h:"Multiplicadores de Lagrange",
  c:`<p>Para optimizar f sujeto a g = 0:</p>
  <div class="formula">∇f = λ∇g,  junto con  g(x,y) = 0</div>
  <p>La intuición: en el óptimo, la curva de nivel de f es <b>tangente</b> a la restricción. Si se cruzaran, podrías deslizarte por la restricción y mejorar.</p>
  <p class="tip">💡 El λ no es basura de cálculo: es el <b>precio sombra</b>. Mide cuánto mejora el óptimo si relajas la restricción una unidad. En optimización de carteras, λ es exactamente la prima de riesgo.</p>`},

 {h:"Integrales múltiples",
  c:`<p>Una integral doble suma sobre una región del plano. Por <b>Fubini</b>, se calcula como dos integrales sucesivas, y se puede <b>cambiar el orden</b> si la función es integrable:</p>
  <div class="formula">∬<sub>R</sub> f dA = ∫∫ f dx dy = ∫∫ f dy dx</div>
  <p>Cambiar el orden a veces convierte una integral imposible en una trivial. Y al cambiar de coordenadas hay que multiplicar por el <b>jacobiano</b>: en polares, dA = r·dr·dθ. Ese r que aparece de la nada es lo que hace que la integral gaussiana se pueda resolver.</p>`}
]},

/* ================================================================= */
{id:"ma-ap-10", t:"Métodos numéricos", emo:"🖩", min:6,
 res:"Qué hacer cuando no hay fórmula cerrada. Que es, en la práctica, casi siempre.",
 secciones:[

 {h:"Por qué hacen falta",
  c:`<p>La mayoría de las ecuaciones que aparecen en la vida real <b>no se resuelven a mano</b>. No porque nadie sea suficientemente listo: porque se ha demostrado que no se puede. ∫e^(−x²/2)dx no tiene primitiva elemental, y un put americano no tiene fórmula cerrada.</p>
  <p>La respuesta no es rendirse: es aproximar con control del error.</p>`},

 {h:"Newton–Raphson: encontrar raíces",
  c:`<div class="formula">x<sub>n+1</sub> = x<sub>n</sub> − f(x<sub>n</sub>) / f′(x<sub>n</sub>)</div>
  <p>Sigues la tangente hasta que corta el eje, y repites. Converge <b>cuadráticamente</b>: cada iteración duplica los decimales correctos.</p>
  <ul>
  <li>Necesita un punto de partida razonable, o se va a otra raíz o diverge.</li>
  <li>Si f′ se acerca a 0, el paso se dispara.</li>
  </ul>
  <p class="tip">🔗 Así se calcula la <b>volatilidad implícita</b>: tienes el precio de mercado, tienes Black–Scholes, y buscas la σ que los iguala. No hay forma de despejarla.</p>`},

 {h:"Euler y Runge–Kutta: resolver EDO",
  c:`<div class="formula">Euler:  y<sub>n+1</sub> = y<sub>n</sub> + h·f(t<sub>n</sub>, y<sub>n</sub>)</div>
  <p>Avanzar en línea recta con la pendiente actual. Es lo más simple que existe y su error es de orden h: para ganar un decimal hay que dividir el paso por diez.</p>
  <p><b>Runge–Kutta 4</b> promedia cuatro estimaciones de la pendiente dentro de cada paso y consigue error de orden h⁴. Es el caballo de batalla estándar: mucho mejor por un coste apenas mayor.</p>
  <p class="tip">⚠️ Reducir h no mejora indefinidamente: el error de truncamiento baja pero el de <b>redondeo</b> se acumula. Hay un h óptimo.</p>`},

 {h:"Integración numérica",
  c:`<table class="tabla">
  <tr><th>Método</th><th>Idea</th><th>Error</th></tr>
  <tr><td>Rectángulos</td><td>altura constante en cada trozo</td><td>orden h</td></tr>
  <tr><td>Trapecios</td><td>une los extremos con una recta</td><td>orden h²</td></tr>
  <tr><td>Simpson</td><td>ajusta una parábola cada dos trozos</td><td>orden h⁴</td></tr>
  </table>
  <p>Simpson es exacto para polinomios de grado ≤ 3, lo cual es gratis y sorprendentemente potente.</p>`},

 {h:"Montecarlo",
  c:`<p>Cuando hay muchas dimensiones, todos los métodos anteriores se hunden. Montecarlo simula miles de escenarios al azar y promedia:</p>
  <div class="formula">E[f(X)] ≈ (1/N) · Σ f(x<sub>i</sub>)</div>
  <p>Su error decrece como <b>1/√N</b>: lento (para un decimal más, cien veces más simulaciones) pero <b>independiente de la dimensión</b>. Por eso es la única opción para opciones asiáticas o cestas de muchos activos.</p>
  <p class="tip">🔗 Para simular activos correlacionados: generas normales independientes z y aplicas <b>x = Lz</b> con L la Cholesky de la matriz de covarianza. Ahí es donde el álgebra lineal se vuelve indispensable.</p>`}
]},

/* ================================================================= */
{id:"ma-ap-6", t:"El puente hacia Shreve", emo:"🌉", min:6,
 res:"Dónde exactamente aparece cada pieza de matemáticas en el cálculo estocástico. Léelo antes de mezclar los dos mundos.",
 secciones:[

 {h:"Por qué este apunte existe",
  c:`<p>Las matemáticas y las finanzas cuantitativas no son dos mundos: son <b>el mismo</b>. Este apunte marca los cinco puntos exactos donde se tocan, para que cuando estudies Shreve reconozcas el terreno.</p>`},

 {h:"1 · Taylor de segundo orden → lema de Itô",
  c:`<p>En cálculo normal, al desarrollar f(x + dx) tiras el término (dx)² porque es despreciable. Con un browniano <b>no puedes</b>: (dW)² = dt, que es de primer orden.</p>
  <div class="formula">df = f′(X)dX + ½f″(X)(dX)²</div>
  <p>Ese ½f″ superviviente es todo el lema de Itô. Es la razón del <b>−½σ²</b> en el movimiento browniano geométrico, y de que un activo con tendencia μ tenga crecimiento esperado del logaritmo μ − ½σ².</p>`},

 {h:"2 · EDO lineal → activo sin riesgo y descuento",
  c:`<p>dB = rB dt es exactamente y′ = ky. Solución B(t) = B₀e^(rt). Su inversa e^(−rt) es el <b>factor de descuento</b> que multiplica cada esperanza en toda la teoría de valoración.</p>`},

 {h:"3 · EDP del calor → Black–Scholes",
  c:`<p>v_t + rx·v_x + ½σ²x²·v_xx = rv es una EDP parabólica. Con el cambio de variable adecuado se convierte en u_t = u_xx, la <b>ecuación del calor</b>. La condición «inicial» es el pago al vencimiento, y el tiempo corre hacia atrás: el precio de hoy es el pago futuro <b>difundido</b>.</p>`},

 {h:"4 · Integral sin primitiva → la N de la fórmula",
  c:`<p>N(d₊) y N(d₋) no son coeficientes de ajuste: son integrales de e^(−z²/2) que no tienen primitiva elemental. Que la fórmula de Black–Scholes «lleve normales dentro» es una consecuencia directa de que el logaritmo del precio sea gaussiano.</p>`},

 {h:"5 · Álgebra lineal → covarianza y simulación",
  c:`<p>Con varios activos, todo se vuelve matricial. La matriz de covarianza Σ es simétrica y definida positiva, así que el <b>teorema espectral</b> te da sus componentes principales (PCA de la curva de tipos) y <b>Cholesky</b> te da la manera de simularla. La regresión de coberturas es una <b>proyección ortogonal</b>.</p>
  <p class="tip">📌 Resumen: derivadas te dan las griegas, integrales te dan las esperanzas, las EDO/EDP te dan la dinámica y el álgebra lineal te da el multivariante. No hay una sola pieza decorativa.</p>`}
]}

];
