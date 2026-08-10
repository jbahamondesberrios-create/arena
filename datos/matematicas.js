/* ============================================================
   DATOS · MATEMÁTICAS
   Cálculo diferencial e integral · Ecuaciones diferenciales · Álgebra lineal
   n = nivel: 1 fácil · 2 intermedio · 3 difícil
   ============================================================ */

window.MATEMATICAS = {

/* ---------- TABLA DE DERIVADAS ---------- */
/* f = función · d = derivada · nota = por qué */
derivadas: [
  {f:"x<sup>n</sup>",        d:"n·x<sup>n−1</sup>",            n:1, nota:"Regla de la potencia. Baja el exponente y réstale uno."},
  {f:"c (constante)",        d:"0",                            n:1, nota:"Una constante no cambia: su tasa de cambio es cero."},
  {f:"x",                    d:"1",                            n:1, nota:"Caso n = 1 de la regla de la potencia."},
  {f:"x²",                   d:"2x",                           n:1, nota:"Potencia con n = 2."},
  {f:"x³",                   d:"3x²",                          n:1, nota:"Potencia con n = 3."},
  {f:"√x",                   d:"1 / (2√x)",                    n:2, nota:"√x = x^(1/2) ⟹ ½·x^(−1/2) = 1/(2√x)."},
  {f:"1/x",                  d:"−1/x²",                        n:2, nota:"1/x = x^(−1) ⟹ −1·x^(−2)."},
  {f:"e<sup>x</sup>",        d:"e<sup>x</sup>",                n:1, nota:"La única función que es su propia derivada. Por eso aparece en todas las EDO."},
  {f:"e<sup>kx</sup>",       d:"k·e<sup>kx</sup>",             n:1, nota:"Cadena: la derivada de dentro (k) multiplica."},
  {f:"a<sup>x</sup>",        d:"a<sup>x</sup>·ln a",           n:3, nota:"Porque a^x = e^(x·ln a)."},
  {f:"ln x",                 d:"1/x",                          n:1, nota:"Solo válida para x &gt; 0. Con |x| vale para x ≠ 0."},
  {f:"ln(kx)",               d:"1/x",                          n:3, nota:"ln(kx) = ln k + ln x: la constante desaparece al derivar."},
  {f:"log<sub>a</sub> x",    d:"1 / (x·ln a)",                 n:3, nota:"Cambio de base: log_a x = ln x / ln a."},
  {f:"sen x",                d:"cos x",                        n:1, nota:"El ciclo es sen → cos → −sen → −cos → sen."},
  {f:"cos x",                d:"−sen x",                       n:1, nota:"Ojo con el signo menos: es el error más común."},
  {f:"tan x",                d:"sec² x = 1 + tan² x",          n:2, nota:"Cociente sen/cos y usa sen² + cos² = 1."},
  {f:"sec x",                d:"sec x · tan x",                n:3, nota:"sec x = (cos x)^(−1), cadena más regla de la potencia."},
  {f:"arcsen x",             d:"1 / √(1 − x²)",                n:3, nota:"Derivada de la inversa: 1 / cos(arcsen x)."},
  {f:"arctan x",             d:"1 / (1 + x²)",                 n:3, nota:"Aparece constantemente al integrar fracciones racionales."},
  {f:"senh x",               d:"cosh x",                       n:3, nota:"Las hiperbólicas no cambian de signo al derivar."},
  {f:"|x|",                  d:"x/|x|  (x ≠ 0)",               n:3, nota:"No es derivable en 0: hay un pico. Clave en el lema de Itô con máx(S−K,0)."},
  {f:"x⁴",                   d:"4x³",                          n:1, nota:"Potencia con n = 4."},
  {f:"x⁵",                   d:"5x⁴",                          n:1, nota:"Potencia con n = 5."},
  {f:"5x",                   d:"5",                            n:1, nota:"Las constantes multiplicativas se quedan tal cual: (cf)′ = c·f′."},
  {f:"x² + 3x",              d:"2x + 3",                       n:1, nota:"La derivación es lineal: se deriva término a término."},
  {f:"e<sup>−x</sup>",       d:"−e<sup>−x</sup>",              n:1, nota:"Cadena con k = −1. El signo se conserva en todas las derivadas sucesivas."},
  {f:"1/x²",                 d:"−2/x³",                        n:2, nota:"1/x² = x^(−2) ⟹ −2·x^(−3)."},
  {f:"1/√x",                 d:"−1/(2x<sup>3/2</sup>)",        n:3, nota:"x^(−1/2) ⟹ −½·x^(−3/2)."},
  {f:"∛x",                   d:"1/(3x<sup>2/3</sup>)",         n:2, nota:"x^(1/3) ⟹ ⅓·x^(−2/3)."},
  {f:"sen(kx)",              d:"k·cos(kx)",                    n:2, nota:"Cadena: la k de dentro sale multiplicando."},
  {f:"cos(kx)",              d:"−k·sen(kx)",                   n:2, nota:"Cadena más el menos del coseno: se acumulan los dos."},
  {f:"e<sup>x²</sup>",       d:"2x·e<sup>x²</sup>",            n:2, nota:"Cadena con dentro = x², cuya derivada es 2x."},
  {f:"x·e<sup>x</sup>",      d:"(x + 1)·e<sup>x</sup>",        n:2, nota:"Producto: 1·eˣ + x·eˣ. Se saca eˣ factor común."},
  {f:"x·ln x",               d:"ln x + 1",                     n:2, nota:"Producto: 1·ln x + x·(1/x). El segundo término se simplifica a 1."},
  {f:"sen² x",               d:"2·sen x·cos x = sen 2x",       n:3, nota:"Cadena con la potencia por fuera. El resultado es justo la fórmula del ángulo doble."},
  {f:"e<sup>x</sup>·sen x",  d:"e<sup>x</sup>(sen x + cos x)",  n:3, nota:"Producto puro. Aparece al resolver EDO de segundo orden con raíces complejas."},
  {f:"√(x² + 1)",            d:"x/√(x² + 1)",                  n:3, nota:"Cadena: ½(x²+1)^(−1/2)·2x. El 2 se cancela con el ½."},
  {f:"ln(f(x))",             d:"f′(x)/f(x)",                   n:3, nota:"<b>Derivada logarítmica.</b> Es el truco para derivar productos largos: toma logaritmos primero."},
  {f:"x<sup>x</sup>",        d:"x<sup>x</sup>(ln x + 1)",      n:3, nota:"Ni potencia ni exponencial: hay que escribirlo como e^(x·ln x) y aplicar la cadena."},
  {f:"cot x",                d:"−csc² x",                      n:3, nota:"Cociente cos/sen. El menos viene de derivar el denominador."},
  {f:"arccos x",             d:"−1 / √(1 − x²)",               n:3, nota:"Exactamente la de arcsen con el signo cambiado: su suma es π/2, constante."},
  {f:"cosh x",               d:"senh x",                       n:3, nota:"Al revés que las trigonométricas, aquí no aparece ningún menos."},
  {f:"tanh x",               d:"sech² x = 1 − tanh² x",        n:3, nota:"Análoga a la de tan x, pero con un menos por la identidad hiperbólica."}
],

/* ---------- TABLA DE INTEGRALES ---------- */
integrales: [
  {f:"x<sup>n</sup>  (n ≠ −1)", d:"x<sup>n+1</sup>/(n+1) + C",     n:1, nota:"Sube el exponente y divide por el nuevo. Al revés que derivar."},
  {f:"1/x",                     d:"ln|x| + C",                     n:1, nota:"El caso que la regla de la potencia no cubre: n = −1."},
  {f:"e<sup>x</sup>",           d:"e<sup>x</sup> + C",             n:1, nota:"Se integra en sí misma."},
  {f:"e<sup>kx</sup>",          d:"e<sup>kx</sup>/k + C",          n:2, nota:"Divide por la derivada de dentro."},
  {f:"a<sup>x</sup>",           d:"a<sup>x</sup>/ln a + C",        n:3, nota:"Inversa de derivar a^x."},
  {f:"sen x",                   d:"−cos x + C",                    n:1, nota:"Aquí sí aparece el menos, al revés que al derivar."},
  {f:"cos x",                   d:"sen x + C",                     n:1, nota:"Sin signo."},
  {f:"sec² x",                  d:"tan x + C",                     n:2, nota:"Lee la tabla de derivadas al revés."},
  {f:"1/(1 + x²)",              d:"arctan x + C",                  n:2, nota:"Patrón que hay que reconocer de inmediato."},
  {f:"1/√(1 − x²)",             d:"arcsen x + C",                  n:3, nota:"El otro patrón inverso trigonométrico."},
  {f:"ln x",                    d:"x·ln x − x + C",                n:3, nota:"Por partes con u = ln x, dv = dx."},
  {f:"1/(x² − a²)",             d:"(1/2a)·ln|(x−a)/(x+a)| + C",    n:3, nota:"Fracciones parciales: 1/((x−a)(x+a))."},
  {f:"x·e<sup>x</sup>",         d:"(x − 1)·e<sup>x</sup> + C",     n:3, nota:"Por partes: u = x, dv = e^x dx."},
  {f:"e<sup>−x²/2</sup>",       d:"no tiene primitiva elemental",  n:3, nota:"Por eso la normal N(x) se tabula o se aproxima. Es la integral de Black–Scholes."},
  {f:"k (constante)",           d:"kx + C",                        n:1, nota:"El área bajo una recta horizontal es base × altura."},
  {f:"x",                       d:"x²/2 + C",                      n:1, nota:"Caso n = 1 de la regla de la potencia al revés."},
  {f:"x²",                      d:"x³/3 + C",                      n:1, nota:"Sube a 3 y divide entre 3."},
  {f:"√x",                      d:"(2/3)·x<sup>3/2</sup> + C",     n:2, nota:"x^(1/2) ⟹ x^(3/2)/(3/2) = (2/3)x^(3/2)."},
  {f:"1/x²",                    d:"−1/x + C",                      n:2, nota:"x^(−2) ⟹ x^(−1)/(−1). El menos es lo que casi todo el mundo olvida."},
  {f:"1/(x + a)",               d:"ln|x + a| + C",                 n:2, nota:"Sustitución trivial u = x + a. Base de las fracciones parciales."},
  {f:"sen(kx)",                 d:"−cos(kx)/k + C",                n:2, nota:"Divide por la derivada de dentro, igual que con e^(kx)."},
  {f:"cos(kx)",                 d:"sen(kx)/k + C",                 n:2, nota:"Sin signo, y dividiendo entre k."},
  {f:"tan x",                   d:"−ln|cos x| + C",                n:3, nota:"Sustitución u = cos x, du = −sen x dx."},
  {f:"csc² x",                  d:"−cot x + C",                    n:3, nota:"La tabla de derivadas leída al revés, con el menos."},
  {f:"1/(a² + x²)",             d:"(1/a)·arctan(x/a) + C",         n:3, nota:"Generalización del arcotangente. El 1/a de fuera es fácil de perder."},
  {f:"1/√(a² − x²)",            d:"arcsen(x/a) + C",               n:3, nota:"Sustitución x = a·sen θ."},
  {f:"x·sen x",                 d:"sen x − x·cos x + C",           n:3, nota:"Por partes con u = x, dv = sen x dx."},
  {f:"x·cos x",                 d:"cos x + x·sen x + C",           n:3, nota:"Por partes con u = x, dv = cos x dx."},
  {f:"sen² x",                  d:"x/2 − sen(2x)/4 + C",           n:3, nota:"Usa la identidad sen²x = (1 − cos 2x)/2 antes de integrar. Nunca lo intentes por partes."},
  {f:"cos² x",                  d:"x/2 + sen(2x)/4 + C",           n:3, nota:"Con cos²x = (1 + cos 2x)/2. Fíjate en que la suma de las dos da x, como debe ser."},
  {f:"senh x",                  d:"cosh x + C",                    n:3, nota:"Las hiperbólicas no cambian de signo en ningún sentido."},
  {f:"1/(x·ln x)",              d:"ln|ln x| + C",                  n:3, nota:"Sustitución u = ln x, du = dx/x. El clásico ejercicio de reconocer patrones."}
],

/* ---------- REGLAS Y CONCEPTOS DE CÁLCULO ---------- */
reglas: [
  {q:"¿Cuál es la <b>regla del producto</b>?", ops:[
    "(f·g)′ = f′g + fg′",
    "(f·g)′ = f′·g′",
    "(f·g)′ = f′g − fg′",
    "(f·g)′ = f′g + f′g′"],
   ok:0, tema:"Derivadas · reglas", n:1,
   nota:"<b>(f·g)′ = f′g + fg′</b>. Deriva el primero por el segundo tal cual, más el primero tal cual por la derivada del segundo."},

  {q:"¿Cuál es la <b>regla del cociente</b>?", ops:[
    "(f/g)′ = (f′g − fg′)/g²",
    "(f/g)′ = (fg′ − f′g)/g²",
    "(f/g)′ = f′/g′",
    "(f/g)′ = (f′g + fg′)/g²"],
   ok:0, tema:"Derivadas · reglas", n:1,
   nota:"<b>(f/g)′ = (f′g − fg′)/g²</b>. El orden importa: el numerador NO es simétrico. Truco: «bajo por derivada de arriba, menos arriba por derivada de abajo, todo sobre abajo al cuadrado»."},

  {q:"¿Cuál es la <b>regla de la cadena</b>?", ops:[
    "(f∘g)′(x) = f′(g(x))·g′(x)",
    "(f∘g)′(x) = f′(x)·g′(x)",
    "(f∘g)′(x) = f′(g′(x))",
    "(f∘g)′(x) = f(g′(x))"],
   ok:0, tema:"Derivadas · reglas", n:1,
   nota:"<b>Derivada de fuera evaluada en dentro, por derivada de dentro.</b> Es la regla que más se olvida a medias: casi siempre falta el ·g′(x)."},

  {q:"Derivada de <b>sen(3x²)</b>", ops:[
    "6x·cos(3x²)",
    "cos(3x²)",
    "6x·sen(3x²)",
    "−6x·cos(3x²)"],
   ok:0, tema:"Cadena", n:2,
   nota:"Fuera: sen → cos. Dentro: 3x² → 6x. Resultado <b>6x·cos(3x²)</b>."},

  {q:"Derivada de <b>e<sup>−x²/2</sup></b>", ops:[
    "−x·e<sup>−x²/2</sup>",
    "e<sup>−x²/2</sup>",
    "−x²·e<sup>−x²/2</sup>",
    "−e<sup>−x²/2</sup>/2"],
   ok:0, tema:"Cadena", n:2,
   nota:"Dentro: −x²/2, cuya derivada es −x. Es exactamente la densidad normal, la que aparece en Black–Scholes."},

  {q:"¿Qué dice el <b>Teorema Fundamental del Cálculo</b>?", ops:[
    "Derivar e integrar son operaciones inversas: d/dx ∫ₐˣ f = f(x)",
    "Toda función continua tiene máximo y mínimo",
    "El área bajo una curva siempre es positiva",
    "Toda derivada es continua"],
   ok:0, tema:"Integrales", n:1,
   nota:"Dos partes: (1) si F(x) = ∫ₐˣ f, entonces F′ = f. (2) ∫ₐᵇ f = F(b) − F(a). <b>Es el puente entre pendiente y área.</b>"},

  {q:"¿Cuándo conviene <b>integración por partes</b>?", ops:[
    "Cuando el integrando es un producto donde una parte se simplifica al derivar",
    "Siempre que haya una raíz cuadrada",
    "Cuando el denominador se factoriza",
    "Cuando el grado del numerador supera al del denominador"],
   ok:0, tema:"Integrales · técnicas", n:2,
   nota:"∫u dv = uv − ∫v du. Típico: x·eˣ, x·sen x, ln x, arctan x. <b>Regla ILATE</b> para elegir u: Inversa trig, Logarítmica, Algebraica, Trigonométrica, Exponencial."},

  {q:"En ∫ 2x·e<sup>x²</sup> dx, ¿qué técnica es la natural?", ops:[
    "Sustitución u = x²",
    "Integración por partes",
    "Fracciones parciales",
    "Sustitución trigonométrica"],
   ok:0, tema:"Integrales · técnicas", n:2,
   nota:"Si ves <b>la derivada de algo multiplicando a ese algo</b>, es sustitución. du = 2x dx ⟹ ∫eᵘ du = e^(x²) + C."},

  {q:"¿Cuándo se usan <b>fracciones parciales</b>?", ops:[
    "Al integrar un cociente de polinomios con denominador factorizable",
    "Cuando hay funciones trigonométricas",
    "Cuando el integrando es exponencial",
    "Cuando la integral es impropia"],
   ok:0, tema:"Integrales · técnicas", n:3,
   nota:"Se descompone P(x)/Q(x) en sumandos A/(x−a) + B/(x−b)… Cada trozo integra a un logaritmo o un arcotangente."},

  {q:"¿Qué significa que una integral sea <b>impropia</b>?", ops:[
    "El intervalo es infinito o el integrando no está acotado",
    "El resultado es negativo",
    "No tiene primitiva elemental",
    "El integrando no es derivable"],
   ok:0, tema:"Integrales", n:3,
   nota:"Se define como límite: ∫₁^∞ f = lím_{b→∞} ∫₁^b f. Converge o diverge. ∫₁^∞ dx/x diverge, ∫₁^∞ dx/x² converge a 1."},

  {q:"¿Qué garantiza el <b>Teorema del Valor Medio</b>?", ops:[
    "Existe c con f′(c) = (f(b) − f(a))/(b − a)",
    "Que f tiene un máximo en (a,b)",
    "Que f es integrable",
    "Que f′ es continua"],
   ok:0, tema:"Derivadas · teoremas", n:2,
   nota:"En algún punto la pendiente instantánea iguala a la pendiente media. Es el motor de casi todas las demostraciones del cálculo."},

  {q:"Si f′(x) &gt; 0 en un intervalo, entonces f…", ops:[
    "es creciente en ese intervalo",
    "es cóncava hacia arriba",
    "tiene un máximo",
    "es constante"],
   ok:0, tema:"Derivadas · aplicaciones", n:1,
   nota:"La <b>primera</b> derivada manda sobre crecer/decrecer. La <b>segunda</b> manda sobre la concavidad."},

  {q:"Si f″(x) &gt; 0, la gráfica de f es…", ops:[
    "cóncava hacia arriba (convexa)",
    "creciente",
    "decreciente",
    "cóncava hacia abajo"],
   ok:0, tema:"Derivadas · aplicaciones", n:2,
   nota:"f″ &gt; 0 ⟹ forma de taza ∪. Un punto con f′ = 0 y f″ &gt; 0 es <b>mínimo local</b>. La convexidad es lo que hace que Jensen y las primas de opciones funcionen."},

  {q:"¿Qué es un <b>punto de inflexión</b>?", ops:[
    "Donde la concavidad cambia de signo",
    "Donde f′ = 0",
    "Donde f no es continua",
    "Donde f alcanza su máximo"],
   ok:0, tema:"Derivadas · aplicaciones", n:2,
   nota:"Normalmente f″ = 0 <b>y cambia de signo</b>. Que f″ = 0 solo no basta: x⁴ en 0 tiene f″ = 0 y no hay inflexión."},

  {q:"El <b>desarrollo de Taylor</b> de f alrededor de a es…", ops:[
    "f(a) + f′(a)(x−a) + ½f″(a)(x−a)² + …",
    "f(a) + f′(x)(x−a) + …",
    "f(x) + f′(a)(x−a) + …",
    "f′(a) + f″(a)(x−a) + …"],
   ok:0, tema:"Taylor", n:2,
   nota:"Coeficiente k-ésimo: f⁽ᵏ⁾(a)/k!. <b>Truncar en el segundo orden es el corazón del lema de Itô</b>: allí el término (dx)² no se puede tirar."},

  {q:"¿Qué es una <b>derivada parcial</b> ∂f/∂x?", ops:[
    "La derivada respecto de x tratando las demás variables como constantes",
    "La derivada de f dividida entre x",
    "El límite de f cuando x → 0",
    "La derivada total de f"],
   ok:0, tema:"Varias variables", n:2,
   nota:"Congelas las demás. El <b>gradiente</b> ∇f junta todas las parciales y apunta en la dirección de máximo crecimiento."},

  {q:"En la regla de la cadena multivariable, df/dt para f(x(t), y(t)) es…", ops:[
    "∂f/∂x · x′(t) + ∂f/∂y · y′(t)",
    "∂f/∂x + ∂f/∂y",
    "∂f/∂x · ∂f/∂y",
    "f′(x)·f′(y)"],
   ok:0, tema:"Varias variables", n:3,
   nota:"Cada camino aporta un sumando. Es la versión determinista de la que el lema de Itô corrige con el término de ½∂²f/∂x²·(dx)²."},

  {q:"¿Qué es la <b>regla de L'Hôpital</b>?", ops:[
    "Si lím f/g da 0/0 o ∞/∞, entonces lím f/g = lím f′/g′",
    "Que toda función continua es derivable",
    "Que el límite de un producto es el producto de límites",
    "Que la derivada de un cociente es el cociente de derivadas"],
   ok:0, tema:"Límites", n:2,
   nota:"<b>Solo</b> para indeterminaciones 0/0 e ∞/∞. Aplicarla fuera de esos casos da resultados falsos."},

  {q:"f es <b>continua</b> en a cuando…", ops:[
    "lím<sub>x→a</sub> f(x) existe y vale f(a)",
    "f está definida en a",
    "el límite existe",
    "f es derivable en a"],
   ok:0, tema:"Límites", n:1,
   nota:"Hacen falta las <b>tres</b> cosas: que f(a) exista, que el límite exista, y que coincidan. Fallar una sola ya rompe la continuidad."},

  {q:"¿Cuánto vale lím<sub>x→0</sub> (sen x)/x?", ops:[
    "1", "0", "∞", "no existe"],
   ok:0, tema:"Límites", n:1,
   nota:"<b>El límite fundamental de la trigonometría.</b> Es lo que hace que la derivada de sen x sea cos x. Cerca de 0, sen x ≈ x."},

  {q:"¿Cuánto vale lím<sub>n→∞</sub> (1 + 1/n)<sup>n</sup>?", ops:[
    "e", "1", "∞", "0"],
   ok:0, tema:"Límites", n:2,
   nota:"<b>Es la definición de e.</b> Financieramente: capitalizar n veces al año y hacer n → ∞ da el interés compuesto continuo."},

  {q:"El <b>teorema del sándwich</b> sirve para…", ops:[
    "calcular un límite encajonando la función entre otras dos con el mismo límite",
    "demostrar que una función es continua",
    "hallar máximos y mínimos",
    "integrar funciones acotadas"],
   ok:0, tema:"Límites", n:2,
   nota:"Si g ≤ f ≤ h y g, h tienden a L, entonces f tiende a L. Se usa para lím x·sen(1/x) = 0, donde L'Hôpital no ayuda."},

  {q:"El <b>Teorema de Rolle</b> dice que si f(a) = f(b) entonces…", ops:[
    "existe c en (a,b) con f′(c) = 0",
    "f es constante",
    "f tiene un máximo en a",
    "f′ es constante"],
   ok:0, tema:"Derivadas · teoremas", n:2,
   nota:"Si sales y vuelves a la misma altura, en algún punto ibas plano. Es el caso particular del Teorema del Valor Medio, y con él se demuestra."},

  {q:"El <b>Teorema del Valor Extremo</b> (Weierstrass) garantiza que…", ops:[
    "una función continua en un intervalo cerrado y acotado alcanza máximo y mínimo",
    "toda función tiene máximo",
    "los extremos están donde f′ = 0",
    "una función derivable es acotada"],
   ok:0, tema:"Derivadas · teoremas", n:3,
   nota:"Las dos hipótesis son necesarias: en (0,1) abierto, f(x) = x no alcanza ni máximo ni mínimo."},

  {q:"La <b>derivación implícita</b> consiste en…", ops:[
    "derivar los dos lados respecto de x tratando y como función de x",
    "despejar y antes de derivar",
    "derivar respecto de y",
    "usar derivadas parciales"],
   ok:0, tema:"Derivadas · reglas", n:2,
   nota:"Cada y que derives suelta un <b>y′</b> por la cadena. En x² + y² = 1: 2x + 2y·y′ = 0 ⟹ y′ = −x/y."},

  {q:"La derivada de la <b>función inversa</b> es…", ops:[
    "(f<sup>−1</sup>)′(y) = 1 / f′(f<sup>−1</sup>(y))",
    "(f<sup>−1</sup>)′(y) = −f′(y)",
    "(f<sup>−1</sup>)′(y) = 1/f(y)",
    "(f<sup>−1</sup>)′(y) = f′(1/y)"],
   ok:0, tema:"Derivadas · reglas", n:3,
   nota:"Reflejar la gráfica en la diagonal invierte las pendientes. De ahí salen las derivadas de ln x, arcsen x y arctan x."},

  {q:"La <b>linealización</b> de f en a es…", ops:[
    "L(x) = f(a) + f′(a)(x − a)",
    "L(x) = f′(a)·x",
    "L(x) = f(a)·(x − a)",
    "L(x) = f(a) + f(x)(x − a)"],
   ok:0, tema:"Taylor", n:2,
   nota:"La recta tangente usada como aproximación. Es Taylor de grado 1, y la base de todas las «griegas» de primer orden."},

  {q:"El método de <b>Newton–Raphson</b> itera con la fórmula…", ops:[
    "x<sub>n+1</sub> = x<sub>n</sub> − f(x<sub>n</sub>)/f′(x<sub>n</sub>)",
    "x<sub>n+1</sub> = x<sub>n</sub> + f(x<sub>n</sub>)",
    "x<sub>n+1</sub> = f(x<sub>n</sub>)/f′(x<sub>n</sub>)",
    "x<sub>n+1</sub> = x<sub>n</sub> − f′(x<sub>n</sub>)/f(x<sub>n</sub>)"],
   ok:0, tema:"Métodos numéricos", n:3,
   nota:"Sigue la tangente hasta que corta el eje. Converge <b>cuadráticamente</b> si empiezas cerca. Es como se calcula la volatilidad implícita a partir del precio de mercado."},

  {q:"La serie de Taylor de <b>e<sup>x</sup></b> es…", ops:[
    "1 + x + x²/2! + x³/3! + …",
    "1 + x + x² + x³ + …",
    "x − x³/3! + x⁵/5! − …",
    "1 − x + x²/2! − x³/3! + …"],
   ok:0, tema:"Taylor", n:2,
   nota:"Converge para <b>todo</b> x. Los factoriales del denominador crecen tan rápido que dominan cualquier potencia."},

  {q:"La suma de la <b>serie geométrica</b> Σ r<sup>n</sup> (n desde 0) con |r| &lt; 1 es…", ops:[
    "1/(1 − r)",
    "r/(1 − r)",
    "1/(1 + r)",
    "(1 − r)"],
   ok:0, tema:"Series", n:2,
   nota:"Si empieza en n = 1 en vez de 0, vale r/(1−r). Es la fórmula detrás de una perpetuidad y del valor de un flujo constante descontado."},

  {q:"El <b>criterio de la razón</b> dice que Σaₙ converge si…", ops:[
    "lím |a<sub>n+1</sub>/a<sub>n</sub>| &lt; 1",
    "lím aₙ = 0",
    "lím |a<sub>n+1</sub>/a<sub>n</sub>| = 1",
    "aₙ es decreciente"],
   ok:0, tema:"Series", n:3,
   nota:"Si el límite es exactamente 1, el criterio <b>no decide</b> y hay que buscar otro. Que aₙ → 0 es necesario pero no suficiente: la armónica Σ1/n diverge."},

  {q:"La <b>matriz Hessiana</b> de f recoge…", ops:[
    "todas las segundas derivadas parciales",
    "todas las primeras derivadas parciales",
    "el gradiente y el laplaciano",
    "los puntos críticos"],
   ok:0, tema:"Varias variables", n:3,
   nota:"Con ∇f = 0: Hessiana definida positiva ⟹ mínimo · definida negativa ⟹ máximo · autovalores de distinto signo ⟹ <b>punto de silla</b>."},

  {q:"Los <b>multiplicadores de Lagrange</b> resuelven…", ops:[
    "optimización con restricciones, imponiendo ∇f = λ∇g",
    "sistemas de ecuaciones lineales",
    "integrales múltiples",
    "ecuaciones diferenciales"],
   ok:0, tema:"Varias variables", n:3,
   nota:"En el óptimo, los gradientes son <b>paralelos</b>. El λ mide cuánto mejora el objetivo si relajas la restricción: es el «precio sombra»."},

  {q:"El <b>teorema de Fubini</b> permite…", ops:[
    "calcular una integral doble como dos integrales sucesivas, y cambiar el orden",
    "derivar bajo el signo integral",
    "integrar por partes en varias variables",
    "cambiar de coordenadas"],
   ok:0, tema:"Varias variables", n:3,
   nota:"Válido si la función es integrable sobre la región. Cambiar el orden puede convertir una integral imposible en una trivial."},

  {q:"¿Qué mide el <b>gradiente</b> ∇f?", ops:[
    "la dirección de máximo crecimiento y su tasa",
    "la curvatura de la superficie",
    "el área bajo la superficie",
    "la variación total de f"],
   ok:0, tema:"Varias variables", n:2,
   nota:"Su módulo es la pendiente máxima, y siempre es <b>perpendicular</b> a las curvas de nivel. Todo el descenso de gradiente vive de esto."},

  {q:"Una función tiene una <b>asíntota horizontal</b> y = L cuando…", ops:[
    "lím<sub>x→±∞</sub> f(x) = L",
    "f(L) = 0",
    "f′(x) = 0 en el infinito",
    "el denominador se anula en L"],
   ok:0, tema:"Límites", n:1,
   nota:"Las <b>verticales</b> aparecen donde el denominador se anula sin que lo haga el numerador. Las oblicuas, cuando el grado de arriba supera en 1 al de abajo."}
],

/* ---------- ECUACIONES DIFERENCIALES ---------- */
edo: [
  {q:"¿Qué es el <b>orden</b> de una ecuación diferencial?", ops:[
    "El de la derivada más alta que aparece",
    "El grado del polinomio en y",
    "El número de condiciones iniciales dadas",
    "El número de variables independientes"],
   ok:0, tema:"Clasificación", n:1,
   nota:"y″ + 3y′ + 2y = 0 es de <b>orden 2</b>. Una EDO de orden n necesita n condiciones para fijar la solución."},

  {q:"Una EDO es <b>lineal</b> cuando…", ops:[
    "y y sus derivadas aparecen a la primera potencia y sin multiplicarse entre sí",
    "la solución es una recta",
    "los coeficientes son constantes",
    "es de primer orden"],
   ok:0, tema:"Clasificación", n:1,
   nota:"y′ + p(x)y = q(x) es lineal aunque p y q sean horribles. <b>y′ = y²</b> o <b>y·y′ = x</b> NO lo son."},

  {q:"y′ = f(x)·g(y) se resuelve por…", ops:[
    "separación de variables",
    "factor integrante",
    "coeficientes indeterminados",
    "transformada de Laplace"],
   ok:0, tema:"Métodos", n:1,
   nota:"dy/g(y) = f(x)dx e integras los dos lados. <b>Es el primer método que hay que probar siempre.</b>"},

  {q:"Para y′ + p(x)y = q(x), el <b>factor integrante</b> es…", ops:[
    "μ(x) = e^∫p(x)dx",
    "μ(x) = e^∫q(x)dx",
    "μ(x) = ∫p(x)dx",
    "μ(x) = e^(−∫q(x)dx)"],
   ok:0, tema:"Métodos", n:2,
   nota:"Al multiplicar por μ, el lado izquierdo se convierte en (μy)′ exacto. Entonces μy = ∫μq dx + C."},

  {q:"La solución general de <b>y′ = ky</b> es…", ops:[
    "y = C·e^(kt)",
    "y = kt + C",
    "y = C·t^k",
    "y = e^(kt) + C"],
   ok:0, tema:"Primer orden", n:1,
   nota:"<b>Crecimiento exponencial.</b> Es la EDO más importante de todas: interés compuesto continuo, decaimiento radiactivo, y el activo sin riesgo dB = rB dt."},

  {q:"La EDO del <b>activo libre de riesgo</b> dB = rB dt tiene solución…", ops:[
    "B(t) = B₀·e^(rt)",
    "B(t) = B₀(1 + rt)",
    "B(t) = B₀·r^t",
    "B(t) = B₀ + rt"],
   ok:0, tema:"Aplicaciones", n:2,
   nota:"Capitalización continua. Su inversa, e^(−rt), es el <b>factor de descuento</b> que usas en todo Shreve."},

  {q:"Para y″ + by′ + cy = 0, la <b>ecuación característica</b> es…", ops:[
    "r² + br + c = 0",
    "r² + b + c = 0",
    "br² + cr = 0",
    "r² − br + c = 0"],
   ok:0, tema:"Segundo orden", n:2,
   nota:"Se prueba y = e^(rt) y sale sola. Las raíces r₁, r₂ mandan sobre la forma de la solución."},

  {q:"Si la característica tiene raíces reales distintas r₁ ≠ r₂, la solución es…", ops:[
    "y = C₁e^(r₁t) + C₂e^(r₂t)",
    "y = (C₁ + C₂t)e^(r₁t)",
    "y = e^(αt)(C₁cos βt + C₂sen βt)",
    "y = C₁t^(r₁) + C₂t^(r₂)"],
   ok:0, tema:"Segundo orden", n:2,
   nota:"Dos exponenciales independientes. <b>Sistema sobreamortiguado</b>: vuelve al equilibrio sin oscilar."},

  {q:"Si la característica tiene una raíz <b>doble</b> r, la solución es…", ops:[
    "y = (C₁ + C₂t)·e^(rt)",
    "y = C₁e^(rt) + C₂e^(rt)",
    "y = C₁e^(rt) + C₂t",
    "y = C₁cos(rt) + C₂sen(rt)"],
   ok:0, tema:"Segundo orden", n:3,
   nota:"Hace falta el factor <b>t</b> para tener dos soluciones independientes. Si no, C₁e^(rt) + C₂e^(rt) sería una sola. Caso <b>críticamente amortiguado</b>."},

  {q:"Si las raíces son complejas α ± βi, la solución es…", ops:[
    "y = e^(αt)(C₁cos βt + C₂sen βt)",
    "y = C₁e^(αt) + C₂e^(βt)",
    "y = (C₁ + C₂t)e^(αt)",
    "y = C₁cos αt + C₂sen βt"],
   ok:0, tema:"Segundo orden", n:3,
   nota:"Por la fórmula de Euler e^(iβt) = cos βt + i·sen βt. La parte real α controla si la <b>oscilación</b> crece o se amortigua."},

  {q:"La solución general de una EDO lineal no homogénea es…", ops:[
    "y = y_homogénea + y_particular",
    "y = y_homogénea · y_particular",
    "solo y_particular",
    "y = y_particular − y_homogénea"],
   ok:0, tema:"No homogéneas", n:2,
   nota:"<b>Principio de superposición.</b> Primero resuelves la homogénea (con las constantes), luego cazas una particular cualquiera y sumas."},

  {q:"M(x,y)dx + N(x,y)dy = 0 es <b>exacta</b> cuando…", ops:[
    "∂M/∂y = ∂N/∂x",
    "M = N",
    "∂M/∂x = ∂N/∂y",
    "M·N = 0"],
   ok:0, tema:"Exactas", n:3,
   nota:"Es la condición para que exista un potencial F con F_x = M y F_y = N. La solución es F(x,y) = C."},

  {q:"Una <b>EDP</b> se distingue de una EDO en que…", ops:[
    "aparecen derivadas parciales respecto de dos o más variables",
    "no tiene solución analítica",
    "es de orden superior a 2",
    "es siempre no lineal"],
   ok:0, tema:"EDP", n:2,
   nota:"La <b>ecuación de Black–Scholes</b> es una EDP: ∂v/∂t + rx∂v/∂x + ½σ²x²∂²v/∂x² = rv, con la condición final v(T,x) = pago."},

  {q:"La <b>ecuación del calor</b> u_t = k·u_xx describe…", ops:[
    "difusión: los picos se suavizan con el tiempo",
    "oscilaciones que se propagan sin perder energía",
    "crecimiento exponencial",
    "un equilibrio estático"],
   ok:0, tema:"EDP", n:3,
   nota:"Black–Scholes se transforma en la ecuación del calor con un cambio de variable. Por eso la fórmula lleva una normal dentro."},

  {q:"¿Qué es un <b>problema de valor inicial</b>?", ops:[
    "Una EDO más el valor de la solución (y derivadas) en un punto",
    "Una EDO sin solución única",
    "Una EDO con condiciones en los dos extremos",
    "Una EDO homogénea"],
   ok:0, tema:"Clasificación", n:1,
   nota:"Las condiciones fijan las constantes C. El teorema de Picard–Lindelöf garantiza <b>existencia y unicidad</b> si f y ∂f/∂y son continuas."},

  {q:"En dX = μX dt + σX dW (movimiento browniano geométrico), la solución es…", ops:[
    "X(t) = X₀·exp((μ − ½σ²)t + σW(t))",
    "X(t) = X₀·exp(μt + σW(t))",
    "X(t) = X₀ + μt + σW(t)",
    "X(t) = X₀·exp(μt) + σW(t)"],
   ok:0, tema:"EDO estocásticas", n:3,
   nota:"El <b>−½σ²</b> es la corrección de Itô: sin ella la respuesta es la ingenua y está mal. Es el puente entre tus matemáticas y Shreve."},

  {q:"¿Cuántas constantes arbitrarias tiene la solución general de una EDO de orden 3?", ops:[
    "3", "1", "2", "ninguna"],
   ok:0, tema:"Clasificación", n:1,
   nota:"Una por cada integración. Y por tanto hacen falta <b>3 condiciones</b> para fijar una solución concreta."},

  {q:"y′ = 3y es una ecuación…", ops:[
    "lineal, de primer orden, homogénea y separable",
    "no lineal de primer orden",
    "lineal de segundo orden",
    "exacta pero no separable"],
   ok:0, tema:"Clasificación", n:1,
   nota:"Cumple todo a la vez, por eso es el ejemplo con el que se explica todo. Solución: y = Ce^(3t)."},

  {q:"En y′ = ky con <b>k &lt; 0</b>, la solución…", ops:[
    "decae exponencialmente hacia 0",
    "crece sin límite",
    "oscila",
    "se mantiene constante"],
   ok:0, tema:"Primer orden", n:1,
   nota:"<b>Decaimiento exponencial</b>: vida media, enfriamiento de Newton, amortiguación. La vida media es ln2/|k|."},

  {q:"Una ecuación de <b>Bernoulli</b> y′ + p(x)y = q(x)y<sup>n</sup> se resuelve…", ops:[
    "sustituyendo v = y<sup>1−n</sup> para volverla lineal",
    "separando variables directamente",
    "con la ecuación característica",
    "por coeficientes indeterminados"],
   ok:0, tema:"Métodos", n:3,
   nota:"Ese cambio de variable la convierte en lineal en v, y ya se ataca con factor integrante."},

  {q:"La <b>ecuación logística</b> y′ = ry(1 − y/K) describe…", ops:[
    "crecimiento que se frena al acercarse a la capacidad K",
    "crecimiento exponencial puro",
    "decaimiento hacia cero",
    "una oscilación amortiguada"],
   ok:0, tema:"Aplicaciones", n:2,
   nota:"Empieza casi exponencial y se aplana en K. Es no lineal pero separable, y su solución es la <b>curva sigmoide</b>."},

  {q:"En una EDO lineal no homogénea, si el término independiente es e<sup>2t</sup>, se propone como solución particular…", ops:[
    "y<sub>p</sub> = A·e<sup>2t</sup>",
    "y<sub>p</sub> = A·t·e<sup>2t</sup> siempre",
    "y<sub>p</sub> = A + Bt",
    "y<sub>p</sub> = A·sen 2t"],
   ok:0, tema:"No homogéneas", n:3,
   nota:"<b>Coeficientes indeterminados</b>: propón algo del mismo tipo y ajusta A. Salvo que e^(2t) ya sea solución de la homogénea: entonces hay que multiplicar por t."},

  {q:"Se llama <b>resonancia</b> a lo que ocurre cuando…", ops:[
    "el término forzante coincide con una solución de la homogénea",
    "las raíces son complejas",
    "el discriminante es cero",
    "no hay condiciones iniciales"],
   ok:0, tema:"No homogéneas", n:3,
   nota:"La solución particular necesita un factor <b>t</b> y la amplitud crece sin límite. Es lo que rompe puentes y lo que hace vibrar una copa."},

  {q:"El <b>Wronskiano</b> de dos soluciones sirve para comprobar…", ops:[
    "si son linealmente independientes",
    "si la ecuación es exacta",
    "si la solución es estable",
    "el orden de la ecuación"],
   ok:0, tema:"Segundo orden", n:3,
   nota:"W = y₁y₂′ − y₂y₁′. Si W ≠ 0 en algún punto, forman una base y su combinación es la solución general."},

  {q:"Un sistema lineal X′ = AX se resuelve…", ops:[
    "con los autovalores y autovectores de A",
    "integrando cada ecuación por separado",
    "con la ecuación característica de segundo orden",
    "por separación de variables"],
   ok:0, tema:"Sistemas", n:3,
   nota:"Cada autovalor λ con autovector v aporta un término <b>v·e^(λt)</b>. Aquí es donde el álgebra lineal y las EDO se convierten en la misma asignatura."},

  {q:"En X′ = AX, el origen es <b>estable</b> cuando…", ops:[
    "todos los autovalores tienen parte real negativa",
    "el determinante es positivo",
    "todos los autovalores son reales",
    "la traza es positiva"],
   ok:0, tema:"Sistemas", n:3,
   nota:"Parte real negativa ⟹ e^(λt) → 0. Si alguna es positiva, esa dirección explota. Si son imaginarias puras, órbitas cerradas (centro)."},

  {q:"El <b>método de Euler</b> aproxima la solución con…", ops:[
    "y<sub>n+1</sub> = y<sub>n</sub> + h·f(t<sub>n</sub>, y<sub>n</sub>)",
    "y<sub>n+1</sub> = y<sub>n</sub> + f(t<sub>n</sub>, y<sub>n</sub>)",
    "y<sub>n+1</sub> = y<sub>n</sub>·h·f(t<sub>n</sub>, y<sub>n</sub>)",
    "y<sub>n+1</sub> = h·f(t<sub>n</sub>, y<sub>n</sub>)"],
   ok:0, tema:"Métodos numéricos", n:2,
   nota:"Avanzar en línea recta con la pendiente actual. Error de orden h: <b>malísimo</b>, pero es la base. Runge–Kutta 4 promedia cuatro pendientes y da error de orden h⁴."},

  {q:"El <b>teorema de Picard–Lindelöf</b> garantiza…", ops:[
    "existencia y unicidad si f y ∂f/∂y son continuas",
    "que la solución es global",
    "que la solución es explícita",
    "que la EDO es lineal"],
   ok:0, tema:"Clasificación", n:3,
   nota:"Unicidad <b>local</b>, no global: y′ = y² con y(0) = 1 tiene solución única, pero se dispara al infinito en t = 1."},

  {q:"La <b>transformada de Laplace</b> es útil en EDO porque…", ops:[
    "convierte la ecuación diferencial en una ecuación algebraica",
    "elimina las condiciones iniciales",
    "reduce el orden en uno",
    "linealiza ecuaciones no lineales"],
   ok:0, tema:"Métodos", n:3,
   nota:"L{y′} = sY(s) − y(0): la derivada se vuelve multiplicar por s, e incorpora la condición inicial sola. Resuelves en s y antitransformas."},

  {q:"La ecuación <b>de onda</b> u<sub>tt</sub> = c²u<sub>xx</sub> se distingue de la del calor en que…", ops:[
    "propaga perturbaciones sin suavizarlas, a velocidad c",
    "siempre tiene solución constante",
    "no admite condiciones iniciales",
    "es de primer orden"],
   ok:0, tema:"EDP", n:3,
   nota:"Hiperbólica, no parabólica. El calor <b>difunde y suaviza</b>; la onda <b>transporta</b> la forma. Black–Scholes es del tipo calor."},

  {q:"¿Cuál de estas ecuaciones es <b>separable</b>?", ops:[
    "y′ = x·y",
    "y′ + y = x",
    "y″ + y = 0",
    "y′ = x + y"],
   ok:0, tema:"Métodos", n:1,
   nota:"y′ = x·y se escribe como dy/y = x dx. Las otras mezclan x e y de forma que no se pueden separar en dos lados."},

  {q:"¿Qué es la <b>solución general</b> de una EDO?", ops:[
    "la familia de todas las soluciones, con constantes arbitrarias",
    "la solución que cumple la condición inicial",
    "la solución más sencilla",
    "la solución constante"],
   ok:0, tema:"Clasificación", n:1,
   nota:"La <b>particular</b> es la que sale al fijar las constantes con las condiciones iniciales. General = familia, particular = un miembro."},

  {q:"La solución de y′ = k (constante) es…", ops:[
    "y = kt + C",
    "y = C·e^(kt)",
    "y = k·e^t",
    "y = kt² + C"],
   ok:0, tema:"Primer orden", n:1,
   nota:"Aquí la derivada es constante, no proporcional a y: el crecimiento es <b>lineal</b>, no exponencial. Es el error más común de todos."},

  {q:"¿Qué es una <b>solución de equilibrio</b>?", ops:[
    "una solución constante, donde y′ = 0",
    "la solución con C = 0",
    "la solución que pasa por el origen",
    "la solución de la ecuación homogénea"],
   ok:0, tema:"Clasificación", n:1,
   nota:"Se hallan resolviendo y′ = 0. En la logística y′ = ry(1−y/K), los equilibrios son y = 0 y y = K."},

  {q:"y″ = 0 tiene como solución general…", ops:[
    "y = C₁t + C₂",
    "y = C·e^t",
    "y = C₁ + C₂t²",
    "y = 0"],
   ok:0, tema:"Segundo orden", n:1,
   nota:"Dos integraciones seguidas de 0 dan una recta. Orden 2 ⟹ <b>dos</b> constantes. Físicamente: aceleración nula = velocidad constante."},

  {q:"¿Qué es una <b>condición inicial</b>?", ops:[
    "el valor de la solución (o sus derivadas) en un punto dado",
    "el primer término de la ecuación",
    "el valor de la constante C",
    "el orden de la ecuación"],
   ok:0, tema:"Clasificación", n:1,
   nota:"Es lo que convierte una familia infinita de curvas en <b>una sola</b>. Sin ella, la respuesta lleva constantes sueltas."},

  {q:"El proceso de <b>Ornstein–Uhlenbeck</b> dX = θ(μ − X)dt + σdW se caracteriza por…", ops:[
    "reversión a la media μ con fuerza θ",
    "crecimiento exponencial",
    "trayectorias no aleatorias",
    "varianza que crece sin límite"],
   ok:0, tema:"EDO estocásticas", n:3,
   nota:"Cuanto más lejos está X de μ, más fuerte tira hacia ella. Es <b>exactamente el modelo de Vasicek</b> para tipos de interés."}
],

/* ---------- ÁLGEBRA LINEAL ---------- */
lineal: [
  {q:"Un conjunto de vectores es <b>linealmente independiente</b> si…", ops:[
    "la única combinación lineal que da 0 es la que tiene todos los coeficientes 0",
    "ninguno es el vector nulo",
    "todos son ortogonales entre sí",
    "todos tienen norma 1"],
   ok:0, tema:"Independencia", n:1,
   nota:"Equivale a que ninguno se puede escribir con los otros. Ortogonales ⟹ independientes, pero <b>no al revés</b>."},

  {q:"Una <b>base</b> de un espacio vectorial es…", ops:[
    "un conjunto linealmente independiente que genera todo el espacio",
    "cualquier conjunto de n vectores",
    "un conjunto de vectores ortonormales",
    "el conjunto de todas las soluciones"],
   ok:0, tema:"Bases", n:1,
   nota:"Independencia + generación. Todas las bases de un espacio tienen el <b>mismo número</b> de vectores: esa es la dimensión."},

  {q:"El <b>rango</b> de una matriz es…", ops:[
    "el número de columnas (o filas) linealmente independientes",
    "el número de filas",
    "el mayor de sus elementos",
    "el número de autovalores"],
   ok:0, tema:"Rango", n:1,
   nota:"Rango por filas = rango por columnas, <b>siempre</b>. Es la dimensión de la imagen."},

  {q:"El <b>teorema del rango-nulidad</b> dice que, para A de n columnas…", ops:[
    "rango(A) + dim(núcleo A) = n",
    "rango(A) = dim(núcleo A)",
    "rango(A) · dim(núcleo A) = n",
    "rango(A) + n = dim(núcleo A)"],
   ok:0, tema:"Rango", n:2,
   nota:"Lo que no sobrevive a la transformación (núcleo) más lo que sí (imagen) da el total de dimensiones de entrada."},

  {q:"Una matriz cuadrada A es <b>invertible</b> si y solo si…", ops:[
    "det(A) ≠ 0",
    "A es simétrica",
    "todos sus elementos son no nulos",
    "A tiene autovalores positivos"],
   ok:0, tema:"Determinante", n:1,
   nota:"Equivalencias: det ≠ 0 ⟺ rango completo ⟺ núcleo = {0} ⟺ columnas independientes ⟺ ningún autovalor es 0."},

  {q:"det(AB) es igual a…", ops:[
    "det(A)·det(B)",
    "det(A) + det(B)",
    "det(A)/det(B)",
    "no hay fórmula general"],
   ok:0, tema:"Determinante", n:2,
   nota:"Es multiplicativo. Consecuencia directa: det(A⁻¹) = 1/det(A)."},

  {q:"Geométricamente, |det(A)| representa…", ops:[
    "el factor por el que A escala volúmenes",
    "la longitud de la diagonal",
    "la suma de los autovalores",
    "la distancia al origen"],
   ok:0, tema:"Determinante", n:2,
   nota:"det = 0 significa que la transformación <b>aplasta</b> el espacio a una dimensión menor: por eso no se puede invertir."},

  {q:"El determinante de una matriz 2×2 [[a,b],[c,d]] es…", ops:[
    "ad − bc",
    "ab − cd",
    "ac − bd",
    "ad + bc"],
   ok:0, tema:"Determinante", n:1,
   nota:"Diagonal principal menos diagonal secundaria. Para 3×3, regla de Sarrus o desarrollo por cofactores."},

  {q:"La <b>inversa</b> de [[a,b],[c,d]] es…", ops:[
    "(1/det)·[[d,−b],[−c,a]]",
    "(1/det)·[[a,−b],[−c,d]]",
    "(1/det)·[[d,b],[c,a]]",
    "[[1/a,1/b],[1/c,1/d]]"],
   ok:0, tema:"Inversa", n:2,
   nota:"<b>Intercambia la diagonal principal, cambia el signo de la otra, divide por el determinante.</b> Vale la pena memorizarla."},

  {q:"λ es un <b>autovalor</b> de A cuando…", ops:[
    "existe v ≠ 0 con Av = λv",
    "det(A) = λ",
    "A·λ = 0",
    "λ está en la diagonal de A"],
   ok:0, tema:"Autovalores", n:1,
   nota:"El vector v solo se <b>estira</b>, no gira. Se hallan resolviendo det(A − λI) = 0."},

  {q:"Para una matriz 2×2, la suma de autovalores es…", ops:[
    "la traza (suma de la diagonal)",
    "el determinante",
    "el rango",
    "la suma de todos los elementos"],
   ok:0, tema:"Autovalores", n:2,
   nota:"<b>λ₁ + λ₂ = traza</b> y <b>λ₁·λ₂ = determinante</b>. Con eso resuelves cualquier 2×2 mentalmente: λ² − (tr)λ + det = 0."},

  {q:"Una matriz es <b>diagonalizable</b> cuando…", ops:[
    "tiene una base completa de autovectores",
    "es simétrica",
    "su determinante es 1",
    "todos sus autovalores son distintos de cero"],
   ok:0, tema:"Diagonalización", n:2,
   nota:"A = PDP⁻¹, con D los autovalores y P los autovectores en columnas. Sirve para calcular <b>Aⁿ = PDⁿP⁻¹</b> en un paso."},

  {q:"El <b>teorema espectral</b> garantiza que toda matriz simétrica real…", ops:[
    "es diagonalizable con autovalores reales y autovectores ortogonales",
    "tiene determinante positivo",
    "es invertible",
    "tiene todos sus autovalores distintos"],
   ok:0, tema:"Diagonalización", n:3,
   nota:"Por eso las <b>matrices de covarianza</b> (siempre simétricas) siempre se diagonalizan: es la base del PCA y de la descomposición de riesgo."},

  {q:"Una matriz es <b>definida positiva</b> si…", ops:[
    "xᵀAx > 0 para todo x ≠ 0",
    "todos sus elementos son positivos",
    "su determinante es positivo",
    "su traza es positiva"],
   ok:0, tema:"Formas cuadráticas", n:3,
   nota:"Equivale a que <b>todos los autovalores sean > 0</b>. Toda matriz de covarianza válida lo es (o al menos semidefinida)."},

  {q:"El <b>producto punto</b> u·v es cero cuando…", ops:[
    "los vectores son ortogonales",
    "los vectores son paralelos",
    "uno de ellos es unitario",
    "tienen la misma norma"],
   ok:0, tema:"Producto interno", n:1,
   nota:"u·v = ‖u‖‖v‖cos θ. Ortogonal ⟺ cos θ = 0 ⟺ 90°. En estadística, ortogonal ⟺ <b>correlación nula</b>."},

  {q:"La <b>proyección</b> de v sobre u es…", ops:[
    "(u·v / u·u)·u",
    "(u·v)·u",
    "(u·v / ‖v‖)·u",
    "(u·v)·v"],
   ok:0, tema:"Producto interno", n:3,
   nota:"La sombra de v en la dirección de u. Es exactamente la fórmula del <b>coeficiente de regresión</b> β = cov/var."},

  {q:"El proceso de <b>Gram–Schmidt</b> sirve para…", ops:[
    "convertir una base cualquiera en una base ortonormal",
    "calcular el determinante",
    "hallar los autovalores",
    "invertir una matriz"],
   ok:0, tema:"Ortogonalidad", n:3,
   nota:"Vas restando a cada vector sus proyecciones sobre los anteriores y normalizas. Da la <b>descomposición QR</b>."},

  {q:"Un sistema Ax = b tiene <b>solución única</b> si…", ops:[
    "A es cuadrada e invertible",
    "b es el vector nulo",
    "A tiene más filas que columnas",
    "el rango de A es menor que n"],
   ok:0, tema:"Sistemas", n:1,
   nota:"Si det(A) = 0, o no hay solución o hay infinitas. Compara rango(A) con rango(A|b): iguales ⟹ compatible."},

  {q:"La <b>descomposición de Cholesky</b> escribe una matriz definida positiva como…", ops:[
    "A = LLᵀ con L triangular inferior",
    "A = PDP⁻¹",
    "A = QR",
    "A = UΣVᵀ"],
   ok:0, tema:"Descomposiciones", n:3,
   nota:"Es <b>la raíz cuadrada de una matriz</b>. Se usa para simular vectores gaussianos correlacionados en Montecarlo: x = Lz con z normales independientes."},

  {q:"En la <b>descomposición SVD</b> A = UΣVᵀ, los valores de Σ son…", ops:[
    "las raíces de los autovalores de AᵀA",
    "los autovalores de A",
    "los elementos diagonales de A",
    "siempre 1"],
   ok:0, tema:"Descomposiciones", n:3,
   nota:"Los <b>valores singulares</b>, siempre ≥ 0. Existe para cualquier matriz, incluso no cuadrada. Es la base de la compresión y del PCA."},

  {q:"Una <b>transformación lineal</b> T cumple…", ops:[
    "T(au + bv) = aT(u) + bT(v)",
    "T(u·v) = T(u)·T(v)",
    "T(u) = u para todo u",
    "T(0) puede ser cualquier vector"],
   ok:0, tema:"Transformaciones", n:1,
   nota:"Respeta sumas y escalados. Consecuencia inmediata: <b>T(0) = 0</b> siempre. Toda transformación lineal es una matriz, y toda matriz es una transformación lineal."},

  {q:"El determinante de una matriz <b>triangular</b> es…", ops:[
    "el producto de la diagonal",
    "la suma de la diagonal",
    "siempre 1",
    "el producto de la primera fila"],
   ok:0, tema:"Determinante", n:1,
   nota:"Por eso la eliminación gaussiana es la forma práctica de calcular determinantes: triangulas y multiplicas la diagonal."},

  {q:"La <b>traza</b> cumple la propiedad…", ops:[
    "tr(AB) = tr(BA), aunque AB ≠ BA",
    "tr(AB) = tr(A)·tr(B)",
    "tr(A + B) = tr(A)·tr(B)",
    "tr(A) = det(A)"],
   ok:0, tema:"Traza", n:3,
   nota:"Sorprendente y muy útil: el producto no conmuta pero su traza sí. De ahí que matrices semejantes P⁻¹AP tengan la misma traza."},

  {q:"Una matriz Q es <b>ortogonal</b> cuando…", ops:[
    "Q<sup>T</sup>Q = I, es decir Q<sup>−1</sup> = Q<sup>T</sup>",
    "det(Q) = 0",
    "Q es simétrica",
    "todas sus entradas son 0 o 1"],
   ok:0, tema:"Ortogonalidad", n:2,
   nota:"Sus columnas son ortonormales. <b>Preserva longitudes y ángulos</b>: son las rotaciones y reflexiones. Su determinante vale ±1."},

  {q:"En <b>mínimos cuadrados</b>, la solución de Ax ≈ b sale de…", ops:[
    "las ecuaciones normales A<sup>T</sup>Ax = A<sup>T</sup>b",
    "x = A<sup>−1</sup>b",
    "det(A)x = b",
    "Ax = 0"],
   ok:0, tema:"Sistemas", n:3,
   nota:"Cuando no hay solución exacta, proyectas b sobre el espacio columna de A. <b>Es literalmente la regresión lineal</b>, escrita en álgebra."},

  {q:"El <b>teorema de Cayley–Hamilton</b> dice que toda matriz…", ops:[
    "satisface su propio polinomio característico",
    "es diagonalizable",
    "tiene inversa",
    "tiene autovalores reales"],
   ok:0, tema:"Autovalores", n:3,
   nota:"Si p(λ) = λ² − trλ + det, entonces A² − tr·A + det·I = 0. Permite escribir A⁻¹ y cualquier potencia como combinación de I y A."},

  {q:"Dos matrices son <b>semejantes</b> (B = P<sup>−1</sup>AP) cuando…", ops:[
    "representan la misma transformación en bases distintas",
    "tienen las mismas entradas reordenadas",
    "tienen el mismo tamaño",
    "una es la traspuesta de la otra"],
   ok:0, tema:"Diagonalización", n:3,
   nota:"Comparten autovalores, traza, determinante y rango. Diagonalizar es buscar la base donde la transformación se ve <b>lo más simple posible</b>."},

  {q:"Los <b>cuatro subespacios fundamentales</b> de A son…", ops:[
    "espacio columna, espacio fila, núcleo y núcleo izquierdo",
    "filas, columnas, diagonal y traza",
    "autovalores, autovectores, imagen y rango",
    "dominio, codominio, imagen y núcleo"],
   ok:0, tema:"Rango", n:3,
   nota:"El núcleo es <b>ortogonal</b> al espacio fila, y el núcleo izquierdo al espacio columna. Esa ortogonalidad es lo que hace funcionar los mínimos cuadrados."},

  {q:"La desigualdad de <b>Cauchy–Schwarz</b> afirma que…", ops:[
    "|u·v| ≤ ‖u‖·‖v‖",
    "‖u + v‖ ≤ ‖u‖ + ‖v‖",
    "u·v ≥ 0",
    "‖u‖ ≤ u·v"],
   ok:0, tema:"Producto interno", n:2,
   nota:"Es lo que garantiza que cos θ = u·v/(‖u‖‖v‖) esté entre −1 y 1. En estadística es exactamente <b>|correlación| ≤ 1</b>."},

  {q:"Una matriz de <b>proyección</b> P cumple…", ops:[
    "P² = P (idempotente)",
    "P² = I",
    "P<sup>T</sup> = −P",
    "det(P) = 1"],
   ok:0, tema:"Ortogonalidad", n:3,
   nota:"Proyectar dos veces es proyectar una. Sus autovalores solo pueden ser <b>0 o 1</b>. La matriz sombrero de la regresión, A(AᵀA)⁻¹Aᵀ, es una de ellas."},

  {q:"¿Cuál es el rango de un <b>producto</b> AB?", ops:[
    "como mucho el mínimo de rango(A) y rango(B)",
    "siempre rango(A)·rango(B)",
    "siempre el máximo de los dos",
    "siempre igual a rango(A)"],
   ok:0, tema:"Rango", n:3,
   nota:"Multiplicar nunca <b>añade</b> dimensiones: solo puede aplastar. Por eso un producto de matrices de rango bajo tiene rango bajo."},

  {q:"El <b>producto vectorial</b> u × v en ℝ³ da…", ops:[
    "un vector perpendicular a los dos, de módulo ‖u‖‖v‖sen θ",
    "un escalar igual a ‖u‖‖v‖cos θ",
    "un vector en la dirección de u",
    "la proyección de u sobre v"],
   ok:0, tema:"Producto interno", n:2,
   nota:"Su módulo es el <b>área</b> del paralelogramo. Anticonmutativo: u × v = −v × u. Solo existe en 3 dimensiones."},

  {q:"El <b>número de condición</b> de una matriz mide…", ops:[
    "cuánto amplifica los errores al resolver un sistema",
    "su determinante normalizado",
    "cuántos autovalores tiene",
    "la distancia a la identidad"],
   ok:0, tema:"Descomposiciones", n:3,
   nota:"Cociente entre el mayor y el menor valor singular. Condición alta = matriz <b>casi singular</b> = resultados numéricos poco fiables."},

  {q:"El <b>espacio columna</b> de A es…", ops:[
    "el conjunto de todos los vectores b para los que Ax = b tiene solución",
    "el conjunto de x con Ax = 0",
    "el conjunto de todas las columnas de A",
    "el complemento del núcleo"],
   ok:0, tema:"Rango", n:2,
   nota:"Es la <b>imagen</b> de la transformación: todo lo que A puede producir. Su dimensión es el rango."},

  {q:"¿Qué es la <b>matriz identidad</b> I?", ops:[
    "la que cumple AI = IA = A, con unos en la diagonal y ceros fuera",
    "la matriz de todos unos",
    "la matriz de todos ceros",
    "la matriz cuyo determinante es 0"],
   ok:0, tema:"Transformaciones", n:1,
   nota:"El 1 de la multiplicación de matrices: la transformación que no hace nada. Su determinante es 1 y todos sus autovalores valen 1."},

  {q:"Para poder multiplicar A·B hace falta que…", ops:[
    "el número de columnas de A sea igual al de filas de B",
    "A y B sean cuadradas",
    "A y B tengan el mismo tamaño",
    "det(A) = det(B)"],
   ok:0, tema:"Transformaciones", n:1,
   nota:"Si A es m×n y B es n×p, el resultado es m×p. Las dos n del medio tienen que coincidir y desaparecen."},

  {q:"La <b>traspuesta</b> A<sup>T</sup> se obtiene…", ops:[
    "intercambiando filas por columnas",
    "cambiando el signo de todos los elementos",
    "invirtiendo la matriz",
    "reordenando la diagonal"],
   ok:0, tema:"Transformaciones", n:1,
   nota:"(AB)ᵀ = BᵀAᵀ: el orden se invierte, igual que con la inversa. Una matriz es <b>simétrica</b> si A = Aᵀ."},

  {q:"El <b>núcleo</b> de A es…", ops:[
    "el conjunto de vectores x con Ax = 0",
    "el conjunto de columnas de A",
    "el conjunto de autovectores",
    "el conjunto de imágenes de A"],
   ok:0, tema:"Rango", n:1,
   nota:"Lo que la transformación <b>aplasta a cero</b>. Si solo contiene el vector nulo, la matriz es invertible."},

  {q:"La <b>dimensión</b> de un espacio vectorial es…", ops:[
    "el número de vectores de cualquiera de sus bases",
    "el número de vectores que contiene",
    "el número de coordenadas de cada vector",
    "el rango de su matriz"],
   ok:0, tema:"Bases", n:1,
   nota:"Está bien definida precisamente porque <b>todas</b> las bases tienen el mismo número de elementos."},

  {q:"Si A es 3×5, entonces el sistema Ax = 0…", ops:[
    "tiene infinitas soluciones",
    "tiene solución única",
    "no tiene solución",
    "depende del determinante"],
   ok:0, tema:"Sistemas", n:2,
   nota:"Más incógnitas (5) que ecuaciones (3): el rango es como mucho 3, así que el núcleo tiene dimensión ≥ 2. <b>Un sistema homogéneo con más incógnitas que ecuaciones siempre tiene soluciones no triviales.</b>"}
],

/* ---------- VERDADERO / FALSO ---------- */
vf: [
  {q:"Toda función continua es derivable.", v:false, n:1,
   nota:"Al revés sí: derivable ⟹ continua. Pero |x| es continua en 0 y no derivable allí."},
  {q:"Si f′(c) = 0, entonces f tiene un máximo o mínimo en c.", v:false, n:2,
   nota:"Es <b>punto crítico</b>, no necesariamente extremo. f(x) = x³ tiene f′(0) = 0 y allí solo hay una inflexión."},
  {q:"La derivada de una suma es la suma de derivadas.", v:true, n:1,
   nota:"La derivación es lineal: (af + bg)′ = af′ + bg′. Pero <b>no</b> es multiplicativa: por eso existe la regla del producto."},
  {q:"∫(f·g) dx = ∫f dx · ∫g dx", v:false, n:1,
   nota:"Rotundamente falso. La integral es lineal en sumas, no en productos. Para productos: por partes o sustitución."},
  {q:"Toda función continua en [a,b] es integrable en [a,b].", v:true, n:2,
   nota:"La continuidad basta. También son integrables funciones con un número finito de discontinuidades de salto."},
  {q:"Una integral definida siempre representa un área positiva.", v:false, n:1,
   nota:"Es <b>área con signo</b>: donde f &lt; 0, contribuye en negativo. Para área geométrica hay que integrar |f|."},
  {q:"Una EDO de orden n necesita n condiciones iniciales para tener solución única.", v:true, n:2,
   nota:"Cada integración introduce una constante. n integraciones, n constantes, n condiciones."},
  {q:"y′ = y² es una ecuación diferencial lineal.", v:false, n:2,
   nota:"El y² la rompe. Es <b>no lineal</b>, pero sí separable: dy/y² = dx ⟹ y = −1/(x + C)."},
  {q:"Si dos matrices tienen el mismo determinante, son iguales.", v:false, n:1,
   nota:"El determinante es un solo número: aplasta muchísima información. La identidad y cualquier matriz de rotación tienen det = 1."},
  {q:"El producto de matrices es conmutativo: AB = BA.", v:false, n:1,
   nota:"Casi nunca lo es. Componer transformaciones en distinto orden da resultados distintos: rotar y luego escalar ≠ escalar y luego rotar."},
  {q:"Si det(A) = 0, el sistema Ax = 0 tiene soluciones distintas de la trivial.", v:true, n:2,
   nota:"det = 0 ⟺ núcleo no trivial ⟺ columnas dependientes. Hay infinitas soluciones."},
  {q:"Los autovectores asociados a autovalores distintos son linealmente independientes.", v:true, n:3,
   nota:"Por eso n autovalores distintos ⟹ diagonalizable. Con autovalores repetidos puede fallar."},
  {q:"Toda matriz cuadrada es diagonalizable.", v:false, n:2,
   nota:"[[1,1],[0,1]] no lo es: tiene λ = 1 doble pero un solo autovector independiente. Se necesita la forma de Jordan."},
  {q:"La traza de una matriz es la suma de sus autovalores.", v:true, n:2,
   nota:"Y el determinante es su producto. Dos invariantes gratis, sin resolver nada."},
  {q:"Si u·v = 0 con u, v no nulos, entonces son ortogonales.", v:true, n:1,
   nota:"Es la definición de ortogonalidad en un espacio con producto interno."},
  {q:"El rango de una matriz puede superar al menor de sus dimensiones.", v:false, n:2,
   nota:"rango(A) ≤ mín(filas, columnas). Una matriz 3×5 tiene rango como mucho 3."},
  {q:"La regla de L'Hôpital se puede aplicar a cualquier límite de un cociente.", v:false, n:2,
   nota:"Solo ante 0/0 o ∞/∞. Aplicada a lím (x+1)/x en x=1 daría 1 en vez de 2."},
  {q:"e^x es la única función (salvo constante multiplicativa) que es su propia derivada.", v:true, n:2,
   nota:"y′ = y ⟹ y = Ce^x. Esa unicidad es lo que hace a e la base natural."},
  {q:"Si f es derivable en a, entonces f es continua en a.", v:true, n:1,
   nota:"Esta dirección sí vale. La recíproca no: |x| es continua en 0 pero no derivable."},
  {q:"La derivada del producto es el producto de las derivadas.", v:false, n:1,
   nota:"Error clásico. Es f′g + fg′. Compruébalo con f = g = x: (x²)′ = 2x, no 1."},
  {q:"Si lím aₙ = 0, entonces la serie Σaₙ converge.", v:false, n:3,
   nota:"Es condición <b>necesaria pero no suficiente</b>. La armónica Σ1/n tiene términos que van a 0 y aun así diverge."},
  {q:"Toda función acotada es integrable en un intervalo cerrado.", v:false, n:3,
   nota:"La función de Dirichlet (1 en racionales, 0 en irracionales) está acotada y no es integrable Riemann. Sí lo es en el sentido de Lebesgue."},
  {q:"Un punto crítico con f″ = 0 es siempre un punto de inflexión.", v:false, n:2,
   nota:"x⁴ en 0 tiene f′ = 0 y f″ = 0, y es un <b>mínimo</b>, no una inflexión. Hace falta que f″ cambie de signo."},
  {q:"El gradiente es perpendicular a las curvas de nivel.", v:true, n:2,
   nota:"Moverse a lo largo de una curva de nivel no cambia f, así que la derivada direccional es 0 en esa dirección: ortogonal al gradiente."},
  {q:"Si A y B son invertibles, entonces (AB)⁻¹ = A⁻¹B⁻¹.", v:false, n:2,
   nota:"El orden se <b>invierte</b>: (AB)⁻¹ = B⁻¹A⁻¹. Igual que al deshacer: primero te quitas los zapatos, luego los calcetines."},
  {q:"Una matriz con determinante negativo no es invertible.", v:false, n:1,
   nota:"Solo importa que sea <b>distinto de cero</b>. El signo negativo únicamente indica que la transformación invierte la orientación."},
  {q:"Toda matriz simétrica real tiene autovalores reales.", v:true, n:2,
   nota:"Teorema espectral. Además sus autovectores son ortogonales. Por eso las matrices de covarianza se comportan tan bien."},
  {q:"Si un sistema tiene más ecuaciones que incógnitas, no tiene solución.", v:false, n:2,
   nota:"Puede tenerla si las ecuaciones sobrantes son redundantes. Lo que decide es comparar rango(A) con rango(A|b), no contar filas."},
  {q:"Multiplicar una fila por un escalar k multiplica el determinante por k.", v:true, n:3,
   nota:"Por eso det(kA) = kⁿ·det(A) para una matriz n×n: multiplicas <b>las n filas</b>."},
  {q:"Una EDO separable siempre es lineal.", v:false, n:2,
   nota:"y′ = y² es separable y no lineal. Son dos clasificaciones independientes: hay separables no lineales y lineales no separables."},
  {q:"El método de Euler da la solución exacta si el paso h es suficientemente pequeño.", v:false, n:3,
   nota:"Solo converge <b>en el límite</b> h → 0. Con h finito siempre hay error de truncamiento, y además se acumula error de redondeo si h es diminuto."},
  {q:"Cambiar el orden de integración en una integral doble nunca cambia el resultado.", v:false, n:3,
   nota:"Con Fubini y función integrable, no cambia. Pero si la integral no converge absolutamente, el orden <b>sí</b> puede alterar el resultado."},
  {q:"La regla de la cadena solo se aplica a funciones de una variable.", v:false, n:2,
   nota:"También existe la versión multivariable, df/dt = Σ ∂f/∂xᵢ · xᵢ′(t), y su corrección estocástica es el lema de Itô."},
  {q:"La derivada de una constante es cero.", v:true, n:1,
   nota:"Una constante no cambia, así que su tasa de cambio es nula. Por eso al integrar aparece un +C: se perdió esa información."},
  {q:"∫f dx tiene una única respuesta.", v:false, n:1,
   nota:"Hay infinitas primitivas, todas iguales salvo una constante. De ahí el <b>+C</b>, que no es un adorno."},
  {q:"La derivada de sen x es −cos x.", v:false, n:1,
   nota:"Es <b>+cos x</b>. El menos aparece al derivar el <b>coseno</b>. Es el signo que más errores cuesta en todo el cálculo."},
  {q:"Toda matriz cuadrada tiene inversa.", v:false, n:1,
   nota:"Solo si su determinante es distinto de cero. Si det = 0 la transformación aplasta el espacio y no hay forma de deshacerla."},
  {q:"El determinante solo está definido para matrices cuadradas.", v:true, n:1,
   nota:"No tiene sentido para una 3×5. Para matrices no cuadradas lo análogo son los valores singulares de la SVD."},
  {q:"Una EDO de primer orden tiene una sola solución.", v:false, n:1,
   nota:"Tiene una <b>familia</b> de soluciones con una constante. Solo hay una si además das una condición inicial."},
  {q:"La suma de dos vectores linealmente independientes es siempre no nula.", v:true, n:2,
   nota:"Si u + v = 0 entonces v = −u, y serían dependientes. Es aplicar la definición directamente."},
  {q:"Integrar y derivar son operaciones inversas.", v:true, n:1,
   nota:"Es el Teorema Fundamental del Cálculo. Con el matiz de la constante: derivar pierde información que integrar no puede recuperar."}
],

/* ---------- SECUENCIAS DE MÉTODO ---------- */
secuencias: [
  {titulo:"Resolver y′ = f(x)·g(y) por separación de variables", n:1,
   pasos:[
     "Separar: dy/g(y) = f(x)·dx",
     "Integrar los dos lados",
     "Sumar la constante C en un solo lado",
     "Despejar y en función de x",
     "Usar la condición inicial para fijar C"],
   nota:"Comprueba siempre si g(y) = 0 da soluciones constantes extra que la división se comió."},

  {titulo:"Resolver y′ + p(x)y = q(x) con factor integrante", n:2,
   pasos:[
     "Escribirla en forma estándar y′ + p(x)y = q(x)",
     "Calcular μ(x) = e^∫p(x)dx",
     "Multiplicar toda la ecuación por μ(x)",
     "Reconocer el lado izquierdo como (μy)′",
     "Integrar: μy = ∫μq dx + C",
     "Despejar y = (∫μq dx + C)/μ"],
   nota:"El factor integrante existe precisamente para que el lado izquierdo colapse en una derivada de producto."},

  {titulo:"Resolver y″ + by′ + cy = 0", n:2,
   pasos:[
     "Plantear la ecuación característica r² + br + c = 0",
     "Calcular el discriminante b² − 4c",
     "Hallar las raíces r₁, r₂",
     "Elegir la forma de la solución según el tipo de raíces",
     "Aplicar las dos condiciones iniciales para fijar C₁ y C₂"],
   nota:"Tres casos: reales distintas → dos exponenciales · doble → hace falta el factor t · complejas → exponencial por seno y coseno."},

  {titulo:"Integrar por partes ∫u dv", n:2,
   pasos:[
     "Elegir u siguiendo ILATE y dv con el resto",
     "Derivar u para obtener du",
     "Integrar dv para obtener v",
     "Aplicar ∫u dv = uv − ∫v du",
     "Resolver la integral restante (o repetir por partes)"],
   nota:"La elección buena es la que deja una integral MÁS FÁCIL. Si empeora, cambia u y dv."},

  {titulo:"Diagonalizar una matriz A", n:3,
   pasos:[
     "Plantear det(A − λI) = 0",
     "Resolver el polinomio característico y hallar los autovalores",
     "Para cada λ, resolver (A − λI)v = 0",
     "Comprobar que hay tantos autovectores independientes como dimensiones",
     "Formar P con los autovectores en columnas y D con los autovalores",
     "Escribir A = PDP⁻¹"],
   nota:"Si faltan autovectores, la matriz no es diagonalizable y hay que ir a la forma de Jordan."},

  {titulo:"Resolver Ax = b por eliminación gaussiana", n:1,
   pasos:[
     "Escribir la matriz aumentada (A | b)",
     "Hacer ceros bajo el primer pivote",
     "Repetir hacia abajo hasta llegar a forma escalonada",
     "Comparar rango(A) con rango(A|b)",
     "Despejar por sustitución hacia atrás"],
   nota:"Si rango(A) &lt; rango(A|b) el sistema es incompatible. Si son iguales pero menores que n, hay infinitas soluciones."},

  {titulo:"Ortonormalizar una base con Gram–Schmidt", n:3,
   pasos:[
     "Tomar el primer vector y normalizarlo",
     "Al segundo vector restarle su proyección sobre el primero",
     "Normalizar el resultado",
     "Repetir restando las proyecciones sobre todos los anteriores",
     "Comprobar que el conjunto final es ortonormal"],
   nota:"El resultado es la Q de la descomposición QR; los coeficientes de las proyecciones forman la R."},

  {titulo:"Estudiar los extremos de f con el cálculo", n:1,
   pasos:[
     "Calcular f′(x)",
     "Resolver f′(x) = 0 para hallar los puntos críticos",
     "Calcular f″(x)",
     "Evaluar f″ en cada punto crítico",
     "Clasificar: f″ > 0 mínimo · f″ < 0 máximo · f″ = 0 no concluye"],
   nota:"Si f″ = 0 hay que mirar el signo de f′ a ambos lados, o subir a la tercera derivada."},

  {titulo:"Integrar por sustitución", n:1,
   pasos:[
     "Buscar una parte u cuya derivada aparezca multiplicando",
     "Calcular du = u′(x)dx",
     "Reescribir toda la integral en términos de u",
     "Cambiar también los límites si la integral es definida",
     "Integrar en u y deshacer el cambio (o usar los límites nuevos)"],
   nota:"Si al reescribir queda alguna x suelta, el cambio elegido no era el bueno."},

  {titulo:"Resolver un sistema 2×2 por la regla de Cramer", n:2,
   pasos:[
     "Escribir la matriz de coeficientes A y comprobar que det(A) ≠ 0",
     "Formar Aₓ sustituyendo la columna de x por el término independiente",
     "Calcular x = det(Aₓ)/det(A)",
     "Formar A_y sustituyendo la columna de y",
     "Calcular y = det(A_y)/det(A)"],
   nota:"Elegante para 2×2 y 3×3, pero inviable para tamaños grandes: cuesta muchísimo más que la eliminación gaussiana."},

  {titulo:"Invertir una matriz por Gauss–Jordan", n:2,
   pasos:[
     "Escribir la matriz aumentada (A | I)",
     "Hacer ceros por debajo de cada pivote",
     "Hacer ceros por encima de cada pivote",
     "Dividir cada fila para dejar unos en la diagonal",
     "Leer la inversa en el bloque derecho: (I | A⁻¹)"],
   nota:"Si en el proceso aparece una fila entera de ceros a la izquierda, la matriz no es invertible."},

  {titulo:"Aproximar una raíz con Newton–Raphson", n:3,
   pasos:[
     "Escribir la ecuación en la forma f(x) = 0",
     "Calcular f′(x)",
     "Elegir un punto inicial x₀ razonablemente cerca",
     "Iterar x_{n+1} = x_n − f(x_n)/f′(x_n)",
     "Parar cuando dos iteraciones sucesivas casi coincidan"],
   nota:"Converge cuadráticamente si arrancas cerca: cada paso duplica los decimales correctos. Si f′ se acerca a 0, se descontrola."},

  {titulo:"Optimizar con multiplicadores de Lagrange", n:3,
   pasos:[
     "Escribir el objetivo f y la restricción como g(x,y) = 0",
     "Plantear ∇f = λ∇g",
     "Añadir la propia restricción al sistema de ecuaciones",
     "Resolver el sistema en x, y y λ",
     "Evaluar f en cada candidato y quedarse con el mejor"],
   nota:"El λ que sale no es basura: mide cuánto mejora el óptimo si relajas la restricción una unidad. Es el precio sombra."},

  {titulo:"Derivar una función compuesta con la regla de la cadena", n:1,
   pasos:[
     "Identificar la función de fuera y la de dentro",
     "Derivar la de fuera dejando la de dentro intacta",
     "Derivar la función de dentro",
     "Multiplicar las dos derivadas",
     "Simplificar el resultado"],
   nota:"El paso que más se olvida es el cuarto: multiplicar por la derivada de dentro."},

  {titulo:"Calcular una integral definida", n:1,
   pasos:[
     "Hallar una primitiva F del integrando",
     "Evaluar F en el límite superior",
     "Evaluar F en el límite inferior",
     "Restar F(b) − F(a)"],
   nota:"En una integral definida la constante C se cancela al restar: por eso no hace falta escribirla."},

  {titulo:"Derivar un cociente", n:1,
   pasos:[
     "Identificar el numerador f y el denominador g",
     "Calcular f′ y g′",
     "Formar el numerador f′g − fg′",
     "Dividir todo entre g²",
     "Simplificar"],
   nota:"El orden del numerador no es simétrico: invertirlo cambia el signo de toda la derivada."},

  {titulo:"Comprobar si una serie geométrica converge y sumarla", n:1,
   pasos:[
     "Identificar la razón r entre términos consecutivos",
     "Comprobar que |r| < 1",
     "Aplicar la fórmula a/(1 − r) con a el primer término",
     "Interpretar el resultado"],
   nota:"Si |r| ≥ 1 la serie diverge y la fórmula no significa nada, aunque dé un número."},

  {titulo:"Calcular un límite indeterminado con L'Hôpital", n:2,
   pasos:[
     "Sustituir y comprobar que sale 0/0 o ∞/∞",
     "Derivar el numerador por separado",
     "Derivar el denominador por separado",
     "Calcular el límite del nuevo cociente",
     "Repetir si vuelve a salir indeterminado"],
   nota:"Nunca se deriva como un cociente: son dos derivadas independientes. Y si no hay indeterminación, la regla no es aplicable."},

  {titulo:"Clasificar un punto crítico en varias variables", n:3,
   pasos:[
     "Calcular el gradiente ∇f",
     "Resolver ∇f = 0 para hallar los puntos críticos",
     "Construir la matriz Hessiana",
     "Evaluar la Hessiana en cada punto crítico",
     "Clasificar según el signo de sus autovalores"],
   nota:"Autovalores todos positivos → mínimo · todos negativos → máximo · de signos distintos → punto de silla."},

  {titulo:"Resolver un sistema X′ = AX", n:3,
   pasos:[
     "Calcular los autovalores de A",
     "Hallar un autovector para cada autovalor",
     "Escribir un término v·e^(λt) por cada pareja",
     "Sumar todos los términos con constantes arbitrarias",
     "Aplicar la condición inicial para fijar las constantes"],
   nota:"Aquí es donde el álgebra lineal y las ecuaciones diferenciales resultan ser la misma asignatura."},

  {titulo:"Estudiar una función completa", n:2,
   pasos:[
     "Hallar el dominio y los cortes con los ejes",
     "Buscar asíntotas verticales, horizontales y oblicuas",
     "Estudiar el signo de f′ para crecimiento y extremos",
     "Estudiar el signo de f″ para concavidad e inflexiones",
     "Dibujar la gráfica con toda la información"],
   nota:"El orden importa: sin el dominio, los puntos críticos que encuentres pueden no existir siquiera."}
]

};
