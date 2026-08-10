/* ============================================================
   DATOS · FINANZAS CUANTITATIVAS
   Basado en la Guía de Shreve (Vol. I binomial · Vol. II tiempo continuo)
   n = nivel: 1 fácil · 2 intermedio · 3 difícil
   ============================================================ */

window.FINANZAS = {

/* ---------- CONCEPTOS (opción múltiple) ---------- */
conceptos: [
  {q:"¿Qué es un <b>arbitraje</b>?", ops:[
    "Ganar dinero sin arriesgar nada",
    "Una estrategia de alta rentabilidad",
    "Comprar barato y vender caro con riesgo",
    "El precio esperado de un derivado"],
   ok:0, cap:"Vol. I · Cap. 1",
   nota:"Toda la maquinaria de los dos volúmenes existe para hacer preciso este argumento: si el precio no es el de la cartera replicante, existiría un arbitraje.", n:1},

  {q:"El precio de no-arbitraje de un derivado es…", ops:[
    "el costo inicial de la cartera que lo replica",
    "el valor esperado del pago bajo la probabilidad real",
    "el pago máximo posible descontado",
    "el precio de mercado del activo subyacente"],
   ok:0, cap:"Vol. I · Cap. 1",
   nota:"<b>Valoración por replicación</b>. Si con acción + efectivo negociados dinámicamente reproduces el pago en todos los escenarios, ese es el precio.", n:1},

  {q:"Una <b>martingala</b> es un proceso donde…", ops:[
    "el valor esperado futuro dada la información de hoy es el valor de hoy",
    "el valor siempre crece a la tasa libre de riesgo",
    "la varianza es constante",
    "el valor esperado es cero"],
   ok:0, cap:"Vol. I · Cap. 2",
   nota:"Un 'juego justo': E<sub>n</sub>[M<sub>n+1</sub>] = M<sub>n</sub>. Bajo la medida neutral al riesgo, el precio <b>descontado</b> de la acción es una martingala.", n:1},

  {q:"La <b>medida neutral al riesgo</b> es…", ops:[
    "una reponderación de probabilidades bajo la cual el precio descontado es martingala",
    "la probabilidad real de que la acción suba",
    "la probabilidad que maximiza el rendimiento",
    "una medida de la aversión al riesgo del inversor"],
   ok:0, cap:"Vol. I · Cap. 2",
   nota:"No son las probabilidades reales: son un <b>artificio de cálculo</b>. Bajo ellas, todo activo tiende a la tasa libre de riesgo.", n:1},

  {q:"En el modelo binomial, la condición de no-arbitraje es…", ops:[
    "0 < d < 1+r < u",
    "u > d > 0",
    "p̃ = ½",
    "u·d = 1"],
   ok:0, cap:"Vol. I · Cap. 1",
   nota:"Es exactamente lo que garantiza que p̃ = (1+r−d)/(u−d) esté entre 0 y 1.", n:2},

  {q:"La <b>esperanza condicional</b> E<sub>n</sub>[X] es…", ops:[
    "el mejor pronóstico de X con la información hasta el instante n",
    "el promedio histórico de X",
    "el valor de X en el instante n",
    "la varianza de X dada la información"],
   ok:0, cap:"Vol. I · Cap. 2",
   nota:"Sus reglas se usan sin cesar: linealidad, sacar lo conocido, torre iterada e independencia.", n:1},

  {q:"La regla de la <b>torre iterada</b> dice que…", ops:[
    "E_m[E_n[X]] = E_m[X] para m ≤ n",
    "E[X·Y] = E[X]·E[Y]",
    "E_n[X] = X si X es conocido",
    "E[E[X]] = 0"],
   ok:0, cap:"Vol. I · Cap. 2",
   nota:"Condicionar dos veces equivale a condicionar con la información más gruesa (la más antigua).", n:3},

  {q:"Un proceso es de <b>Markov</b> si…", ops:[
    "el valor presente resume toda la información relevante para el futuro",
    "es una martingala",
    "tiene incrementos independientes",
    "su varianza es finita"],
   ok:0, cap:"Vol. I · Cap. 2",
   nota:"Por eso el precio de un derivado NO dependiente de la trayectoria se escribe como función v<sub>n</sub>(s) del precio actual.", n:2},

  {q:"La <b>derivada de Radon–Nikodym</b> Z…", ops:[
    "traduce esperanzas entre dos medidas: Ẽ[X] = E[Z·X]",
    "es la derivada del precio respecto al tiempo",
    "mide la sensibilidad de la opción",
    "es el factor de descuento"],
   ok:0, cap:"Vol. I · Cap. 3",
   nota:"Es una variable positiva con E[Z] = 1: el cociente de probabilidades trayectoria a trayectoria.", n:2},

  {q:"Un <b>precio de estado</b> ζ es…", ops:[
    "el valor hoy de recibir 1 peso solo si ocurre una trayectoria concreta",
    "el precio de la acción en un nodo",
    "la probabilidad neutral al riesgo",
    "el valor intrínseco de la opción"],
   ok:0, cap:"Vol. I · Cap. 3",
   nota:"Combina descuento y cambio de medida. Con ellos se recupera exactamente el mismo precio que por replicación.", n:2},

  {q:"Valorar un derivado <b>americano</b> es un problema de…", ops:[
    "parada óptima",
    "programación lineal",
    "optimización de cartera",
    "calibración de volatilidad"],
   ok:0, cap:"Vol. I · Cap. 4",
   nota:"El precio es el supremo, sobre todos los tiempos de parada τ, de la esperanza neutral al riesgo del pago descontado.", n:1},

  {q:"En cada nodo, el precio de un americano es…", ops:[
    "el máximo entre ejercer ya y el valor de continuación",
    "el valor de continuación",
    "el valor intrínseco",
    "el promedio de ambos"],
   ok:0, cap:"Vol. I · Cap. 4",
   nota:"Ese proceso de precios es la <b>envoltura de Snell</b> del pago. El tiempo óptimo es el primer instante en que conviene ejercer.", n:2},

  {q:"Un put americano vale…", ops:[
    "más o igual que el europeo equivalente",
    "menos que el europeo",
    "exactamente lo mismo que el europeo",
    "lo mismo solo si r = 0"],
   ok:0, cap:"Vol. I · Cap. 4",
   nota:"La diferencia es el <b>valor del derecho a ejercer antes</b>. En el ejemplo de la guía: americano 1,36 vs europeo 0,96.", n:2},

  {q:"El <b>principio de reflexión</b> sirve para…", ops:[
    "obtener la distribución conjunta del paseo (o el browniano) y su máximo",
    "calcular la volatilidad implícita",
    "invertir la matriz de covarianzas",
    "descontar flujos futuros"],
   ok:0, cap:"Vol. I · Cap. 5",
   nota:"Un truco de conteo: por cada trayectoria que tras tocar un nivel termina por encima, hay una 'reflejada' simétrica. Es la base de las opciones de <b>barrera</b>.", n:2},

  {q:"Cuando la tasa corta es aleatoria, el descuento se vuelve…", ops:[
    "un producto de factores 1/(1+R_n) aleatorios",
    "una constante",
    "una exponencial determinista",
    "irrelevante"],
   ok:0, cap:"Vol. I · Cap. 6",
   nota:"Y aparecen los derivados de renta fija: bonos cupón cero, tasas forward, caps y swaps.", n:2},

  {q:"Bajo la <b>medida forward</b> (bono como numerario)…", ops:[
    "el precio forward es una martingala",
    "la acción crece a la tasa r",
    "la volatilidad es cero",
    "el bono vale 1"],
   ok:0, cap:"Vol. I · Cap. 6",
   nota:"Es el <b>cambio de numerario</b>. Elegir bien la unidad de cuenta hace que ciertos precios pierdan tendencia.", n:3},

  {q:"Forward y futuros difieren porque…", ops:[
    "la tasa de interés es aleatoria (corrección por convexidad)",
    "los futuros tienen más comisiones",
    "los forwards no se pueden replicar",
    "los futuros vencen antes"],
   ok:0, cap:"Vol. I · Cap. 6",
   nota:"Si la tasa fuera determinista, coincidirían.", n:3},

  {q:"En tiempo continuo hace falta teoría de la medida porque…", ops:[
    "el espacio muestral es infinito y sumar ya no basta",
    "los precios pueden ser negativos",
    "las opciones son americanas",
    "la volatilidad cambia"],
   ok:0, cap:"Vol. II · Cap. 1",
   nota:"La esperanza pasa a ser una integral de Lebesgue: E[X] = ∫ X dℙ.", n:1},

  {q:"Dos medidas son <b>equivalentes</b> si…", ops:[
    "coinciden en qué sucesos tienen probabilidad cero",
    "asignan las mismas probabilidades",
    "tienen la misma media",
    "provienen del mismo espacio"],
   ok:0, cap:"Vol. II · Cap. 1",
   nota:"Se reponderar la aleatoriedad <b>sin cambiar lo que es posible</b>. Es la semilla del teorema de Girsanov.", n:3},

  {q:"Una <b>filtración</b> {ℱ_t} representa…", ops:[
    "la acumulación de información en el tiempo",
    "el conjunto de precios posibles",
    "la volatilidad instantánea",
    "el conjunto de estrategias admisibles"],
   ok:0, cap:"Vol. II · Cap. 2",
   nota:"Un proceso es <b>adaptado</b> si cada X_t es ℱ_t-medible: no usa información del futuro.", n:1},

  {q:"El movimiento browniano W tiene incrementos…", ops:[
    "independientes y normales: W_t − W_s ~ N(0, t−s)",
    "independientes y uniformes",
    "correlacionados y normales",
    "deterministas"],
   ok:0, cap:"Vol. II · Cap. 3",
   nota:"De ahí E[W_t] = 0 y Cov(W_s, W_t) = mín(s, t). Y es una martingala.", n:1},

  {q:"La <b>variación cuadrática</b> del browniano en [0,T] vale…", ops:[
    "T (finita y determinista)",
    "0",
    "infinita",
    "σ²T"],
   ok:0, cap:"Vol. II · Cap. 3",
   nota:"[W,W]_T = T. A diferencia de la varianza de una suma cualquiera, el límite <b>no fluctúa</b>. De ahí (dW)² = dt.", n:1},

  {q:"Las trayectorias del browniano son…", ops:[
    "continuas pero en ningún punto diferenciables",
    "continuas y suaves",
    "discontinuas",
    "diferenciables casi seguramente"],
   ok:0, cap:"Vol. II · Cap. 3",
   nota:"Por eso la integral ordinaria no funciona y hace falta una nueva: la de Itô.", n:2},

  {q:"La integral de Itô se define evaluando el integrando…", ops:[
    "en el extremo IZQUIERDO de cada subintervalo",
    "en el extremo derecho",
    "en el punto medio",
    "en el máximo del intervalo"],
   ok:0, cap:"Vol. II · Cap. 4",
   nota:"Es lo que la hace <b>no anticipativa</b> — y por tanto una martingala. Evaluar en el punto medio da la integral de Stratonovich, que no sirve para finanzas.", n:3},

  {q:"La <b>isometría de Itô</b> dice que…", ops:[
    "E[(∫Δ dW)²] = E[∫Δ² dt]",
    "∫Δ dW = Δ·W",
    "E[∫Δ dW] = ∫Δ dt",
    "Var(W_t) = t²"],
   ok:0, cap:"Vol. II · Cap. 4",
   nota:"Convierte el momento de segundo orden de una integral estocástica en una integral ordinaria.", n:3},

  {q:"La fórmula de <b>Itô–Doeblin</b> es…", ops:[
    "la regla de la cadena del cálculo estocástico",
    "la fórmula del interés compuesto",
    "el teorema del límite central",
    "la ecuación de la cartera replicante"],
   ok:0, cap:"Vol. II · Cap. 4",
   nota:"Conserva el término de <b>segundo orden</b> porque (dW)² = dt es del mismo orden que dt, no despreciable.", n:1},

  {q:"La solución del browniano geométrico dS = αS dt + σS dW es…", ops:[
    "S_t = S₀·exp((α − ½σ²)t + σW_t)",
    "S_t = S₀·exp(αt + σW_t)",
    "S_t = S₀·(1 + αt + σW_t)",
    "S_t = S₀·exp(αt)·W_t"],
   ok:0, cap:"Vol. II · Cap. 4",
   nota:"El término <b>−½σ²</b> es la corrección de Itô. El precio resulta log-normal.", n:2},

  {q:"El teorema de <b>Girsanov</b> permite…", ops:[
    "quitarle la tendencia a un browniano cambiando de medida",
    "resolver ecuaciones diferenciales parciales",
    "calcular la variación cuadrática",
    "replicar opciones americanas"],
   ok:0, cap:"Vol. II · Cap. 5",
   nota:"Reponderando con una martingala exponencial Z_t, un browniano con tendencia se vuelve un browniano sin tendencia bajo ℙ̃.", n:1},

  {q:"El <b>precio de mercado del riesgo</b> es…", ops:[
    "Θ = (α − r)/σ",
    "Θ = α·σ",
    "Θ = r/σ²",
    "Θ = σ/(α − r)"],
   ok:0, cap:"Vol. II · Cap. 5",
   nota:"El exceso de rendimiento exigido <b>por unidad de riesgo</b>. Eligiendo ese Θ, la tendencia de la acción pasa de α a r.", n:1},

  {q:"El teorema de <b>representación de martingalas</b> garantiza que…", ops:[
    "todo derivado se replica con una estrategia dinámica (mercado completo)",
    "toda martingala es constante",
    "el precio es único siempre",
    "no hay arbitraje"],
   ok:0, cap:"Vol. II · Cap. 5",
   nota:"Es la pieza que convierte 'el precio es una esperanza' en 'el vendedor puede cubrirse'.", n:2},

  {q:"Primer Teorema Fundamental del Activo:", ops:[
    "no hay arbitraje ⟺ existe una medida neutral al riesgo",
    "no hay arbitraje ⟺ la medida es única",
    "el mercado es completo ⟺ no hay arbitraje",
    "el precio es único ⟺ el mercado es eficiente"],
   ok:0, cap:"Vol. II · Cap. 5",
   nota:"Y el <b>Segundo</b>: el mercado es completo ⟺ esa medida es <b>única</b>.", n:2},

  {q:"El teorema de <b>Feynman–Kac</b> conecta…", ops:[
    "valorar por esperanza con resolver una EDP",
    "el browniano con el paseo aleatorio",
    "forwards con futuros",
    "volatilidad con varianza"],
   ok:0, cap:"Vol. II · Cap. 6",
   nota:"Unifica las dos deducciones de Black–Scholes y justifica los métodos de <b>diferencias finitas</b>.", n:1},

  {q:"En el modelo de <b>Vasicek</b>, la tasa corta sigue…", ops:[
    "dr = a(b − r)dt + σ dW",
    "dr = μ r dt + σ r dW",
    "dr = σ dW",
    "dr = a r dt + σ√r dW"],
   ok:0, cap:"Vol. II · Cap. 6",
   nota:"Reversión a la media: <i>a</i> es la velocidad y <i>b</i> el nivel de largo plazo. Con σ√r sería Cox–Ingersoll–Ross.", n:2},

  {q:"Las opciones <b>asiáticas</b> son las más difíciles porque…", ops:[
    "el promedio no es markoviano: hay que ampliar el estado",
    "tienen barrera",
    "se ejercen antes del vencimiento",
    "dependen de dos activos"],
   ok:0, cap:"Vol. II · Cap. 7",
   nota:"Las de barrera se resuelven con reflexión y las lookback con el máximo; el promedio obliga a resolver una EDP en más dimensiones.", n:3},

  {q:"Una opción <b>lookback</b> depende de…", ops:[
    "el máximo o mínimo alcanzado por el precio",
    "el precio promedio",
    "el precio final",
    "la volatilidad realizada"],
   ok:0, cap:"Vol. II · Cap. 7",
   nota:"Se valora con la distribución del máximo del browniano — otra vez el principio de reflexión.", n:2},

  {q:"La condición de <b>contacto suave</b> (smooth pasting) determina…", ops:[
    "la barrera de ejercicio óptima L*",
    "la volatilidad implícita",
    "la tasa libre de riesgo",
    "el valor intrínseco"],
   ok:0, cap:"Vol. II · Cap. 8",
   nota:"Valor y derivada coinciden en L*. Con vencimiento finito no hay fórmula cerrada: es un problema de <b>frontera libre</b>.", n:3},

  {q:"Un <b>numerario</b> es…", ops:[
    "cualquier activo positivo usado como unidad de medida",
    "el dinero en efectivo",
    "el bono cupón cero a 1 año",
    "el índice de mercado"],
   ok:0, cap:"Vol. II · Cap. 9",
   nota:"A cada numerario le corresponde una medida bajo la cual los precios medidos en él son martingalas.", n:2},

  {q:"En el modelo <b>HJM</b> se modela…", ops:[
    "la dinámica de todas las tasas forward a la vez",
    "solo la tasa corta",
    "el precio de la acción",
    "la volatilidad estocástica"],
   ok:0, cap:"Vol. II · Cap. 10",
   nota:"La condición de no-arbitraje de HJM <b>fija su tendencia</b> en función de sus volatilidades.", n:3},

  {q:"El modelo <b>LIBOR forward (BGM)</b> se apoya en…", ops:[
    "el cambio de numerario: cada tasa es martingala bajo su medida forward",
    "la fórmula de Black–Scholes directamente",
    "el modelo binomial",
    "simulación de Monte Carlo obligatoria"],
   ok:0, cap:"Vol. II · Cap. 10",
   nota:"Es la base de la valoración de caps, floors y swaptions.", n:3},

  {q:"En el proceso de Poisson N_t con intensidad λ, el proceso <b>compensado</b> es…", ops:[
    "N_t − λt",
    "N_t + λt",
    "N_t/λ",
    "λN_t"],
   ok:0, cap:"Vol. II · Cap. 11",
   nota:"Restarle su tendencia lo convierte en martingala. E[N_t] = Var(N_t) = λt.", n:2},

  {q:"Cuando el precio puede dar <b>saltos</b>…", ops:[
    "el mercado deja de ser completo y la medida neutral al riesgo no es única",
    "la fórmula de Black–Scholes sigue siendo exacta",
    "no hay arbitraje posible",
    "los derivados no se pueden valorar"],
   ok:0, cap:"Vol. II · Cap. 11",
   nota:"La lección clave del último capítulo: sin completitud, hay un <b>rango</b> de precios libres de arbitraje.", n:2},

  {q:"La <b>delta</b> de cobertura en Black–Scholes para un call es…", ops:[
    "N(d₊)",
    "N(d₋)",
    "e^{−rT}N(d₋)",
    "d₊ − d₋"],
   ok:0, cap:"Vol. II · Cap. 4",
   nota:"Es la contraparte continua del cociente de diferencias Δ₀ = (V₁(H)−V₁(T))/(S₁(H)−S₁(T)) del Volumen I.", n:1},

  {q:"La <b>paridad put–call</b> dice que…", ops:[
    "p = c − S + K·e^{−rT}",
    "p = c + S − K",
    "p = c·e^{−rT}",
    "p + c = S"],
   ok:0, cap:"Vol. II · Cap. 4",
   nota:"Es puro no-arbitraje: no depende del modelo.", n:2},

  {q:"La idea única que une los dos volúmenes es:", ops:[
    "el precio es la esperanza del pago descontado bajo la medida neutral al riesgo",
    "el precio sigue un movimiento browniano",
    "el mercado siempre es eficiente",
    "la volatilidad es constante"],
   ok:0, cap:"Introducción",
   nota:"Aparece con lanzamientos de moneda en el Vol. I y con integrales de Itô en el Vol. II. <b>La misma historia, contada dos veces.</b>", n:1},

  {q:"En el Vol. I la herramienta clave es la esperanza condicional (sumas). En el Vol. II es…", ops:[
    "la integral de Itô",
    "la integral de Riemann",
    "la transformada de Fourier",
    "el método de Newton"],
   ok:0, cap:"Introducción",
   nota:"Y el cambio de medida pasa de Radon–Nikodym (un cociente) a <b>Girsanov</b>.", n:2},

  {q:"La <b>inducción hacia atrás</b> en el árbol binomial es la versión discreta de…", ops:[
    "una ecuación en derivadas parciales",
    "la integral de Itô",
    "el teorema de Girsanov",
    "la ley de los grandes números"],
   ok:0, cap:"Vol. I · Cap. 1",
   nota:"El cociente de diferencias se vuelve derivada; la inducción hacia atrás, una EDP; la esperanza sobre 2^N trayectorias, una integral gaussiana.", n:3}
],

/* ---------- FÓRMULAS (completar el hueco) ---------- */
formulas: [
  {q:"Pago de un <b>call</b> al vencimiento:<br><span class='mono clave'>máx( ___ , 0 )</span>",
   ops:["S − K","K − S","S + K","S · K"], ok:0,
   nota:"Solo se ejerce si la acción supera al strike. El put es el simétrico: máx(K − S, 0).", n:1},

  {q:"Pago de un <b>put</b> al vencimiento:<br><span class='mono clave'>máx( ___ , 0 )</span>",
   ops:["K − S","S − K","S + K","1 − S/K"], ok:0,
   nota:"Gana cuando la acción cae por debajo del strike. Su valor máximo es K: la acción no baja de cero.", n:1},

  {q:"Factor de descuento a un período:<br><span class='mono clave'>1 / ( ___ )</span>",
   ops:["1 + r","r","1 − r","e^r"], ok:0,
   nota:"En tiempo continuo el equivalente es e^(−rT). Todo precio de hoy es una esperanza futura por este factor.", n:1},

  {q:"Capitalización continua de la cuenta bancaria:<br><span class='mono clave'>B(t) = B₀ · ___</span>",
   ops:["e^(rt)","(1+r)t","r·t","e^(−rt)"], ok:0,
   nota:"Es la solución de dB = rB dt. Su inversa e^(−rt) es el factor de descuento.", n:1},

  {q:"Condición de no-arbitraje en el modelo binomial:<br><span class='mono clave'>0 &lt; d &lt; ___ &lt; u</span>",
   ops:["1 + r","r","p̃","u·d"], ok:0,
   nota:"Si 1+r quedara fuera, el bono dominaría a la acción o al revés: dinero gratis.", n:1},

  {q:"Precio de un bono cupón cero con tasa continua:<br><span class='mono clave'>P(0,T) = ___</span>",
   ops:["e^(−rT)","e^(rT)","1/(rT)","1 − rT"], ok:0,
   nota:"Paga 1 en T. Su rendimiento continuo es y = −ln P / T, que aquí es justo r.", n:1},

  {q:"Precio forward de una acción sin dividendos:<br><span class='mono clave'>F = S₀ · ___</span>",
   ops:["e^(rT)","e^(−rT)","(1+r)","N(d₊)"], ok:0,
   nota:"Es el valor de entrega que hace nulo el coste inicial del contrato.", n:1},

  {q:"Relación entre p̃ y q̃:<br><span class='mono clave'>q̃ = ___</span>",
   ops:["1 − p̃","p̃","1/p̃","p̃ − 1"], ok:0,
   nota:"Son las dos probabilidades neutrales al riesgo y suman 1, como toda probabilidad de dos escenarios.", n:1},

  {q:"Probabilidad neutral al riesgo (binomial):<br><span class='mono clave'>p̃ = ( ___ − d ) / (u − d)</span>",
   ops:["1+r","r","u","1−r"], ok:0,
   nota:"p̃ = (1+r−d)/(u−d) y q̃ = 1−p̃ = (u−1−r)/(u−d). Están entre 0 y 1 justo porque d < 1+r < u.", n:1},

  {q:"Razón <b>delta</b> de cobertura en una etapa:<br><span class='mono clave'>Δ₀ = (V₁(H) − V₁(T)) / ( ___ )</span>",
   ops:["S₁(H) − S₁(T)","S₀","u − d","1+r"], ok:0,
   nota:"Cuántas acciones tener para que la cartera siga al derivado. En el continuo se convierte en la derivada c_s = N(d₊).", n:1},

  {q:"Precio de no-arbitraje en una etapa:<br><span class='mono clave'>V₀ = ___ · [ p̃·V₁(H) + q̃·V₁(T) ]</span>",
   ops:["1/(1+r)","(1+r)","e^{rT}","1"], ok:0,
   nota:"Esperanza neutral al riesgo del pago, <b>descontada</b>. Esta fórmula se repetirá cientos de veces en los dos libros.", n:1},

  {q:"Propiedad de martingala del precio descontado:<br><span class='mono clave'>S₀ = ___ · Ẽ[S₁]</span>",
   ops:["1/(1+r)","(1+r)","p̃","1"], ok:0,
   nota:"Solo bajo p̃ ocurre esto. Con la probabilidad real la esperanza descontada NO coincide con el precio de hoy.", n:2},

  {q:"Verificación de la derivada de Radon–Nikodym:<br><span class='mono clave'>E[Z] = ___</span>",
   ops:["1","0","p̃","1+r"], ok:0,
   nota:"Z > 0 con E[Z] = 1 define una nueva medida: Ẽ[X] = E[Z·X].", n:2},

  {q:"Regla de oro del cálculo de Itô:<br><span class='mono clave'>(dW)² = ___ , dW·dt = 0</span>",
   ops:["dt","0","dW","t"], ok:0,
   nota:"Que (dW)² sea del mismo orden que dt (y no despreciable) es lo que obliga a conservar el término de segundo orden en la fórmula de Itô.", n:1},

  {q:"Covarianza del browniano:<br><span class='mono clave'>Cov(W_s, W_t) = ___</span>",
   ops:["mín(s, t)","máx(s, t)","s·t","|t − s|"], ok:0,
   nota:"Y Var(W_t) = t, con W_t − W_s ~ N(0, t−s).", n:2},

  {q:"Fórmula de Itô–Doeblin para dX = μ dt + σ dW:<br><span class='mono clave'>df = f_t dt + f_x dX + ___ f_xx (dX)²</span>",
   ops:["½","1","2","σ"], ok:0,
   nota:"El ½f_xx σ² dt es la <b>corrección de Itô</b>: la diferencia entre el cálculo ordinario y el estocástico.", n:2},

  {q:"Browniano geométrico resuelto:<br><span class='mono clave'>S_t = S₀·exp( (α − ___ )t + σW_t )</span>",
   ops:["½σ²","σ²","σ","2σ²"], ok:0,
   nota:"Sin ese −½σ² el precio no tendría tendencia α. Consecuencia: S_t es <b>log-normal</b>.", n:2},

  {q:"Black–Scholes, d₊:<br><span class='mono clave'>d₊ = [ ln(S/K) + (r + ___ )T ] / (σ√T)</span>",
   ops:["½σ²","−½σ²","σ²","σ"], ok:0,
   nota:"Y d₋ = d₊ − σ√T. El signo del ½σ² es la diferencia entre los dos.", n:2},

  {q:"Precio del call europeo:<br><span class='mono clave'>c = S·N(d₊) − K·___·N(d₋)</span>",
   ops:["e^{−rT}","e^{rT}","1","e^{−σT}"], ok:0,
   nota:"El strike se descuenta; el precio spot no. N(d₊) es además la <b>delta</b> de cobertura.", n:1},

  {q:"Precio de mercado del riesgo (Girsanov):<br><span class='mono clave'>Θ = ( ___ ) / σ</span>",
   ops:["α − r","α + r","r − α","α·r"], ok:0,
   nota:"Exceso de rendimiento por unidad de riesgo. Bajo ℙ̃, W̃_t = W_t + Θt es un browniano y la acción rinde r.", n:1},

  {q:"Fórmula maestra de valoración neutral al riesgo:<br><span class='mono clave'>V(0) = Ẽ[ ___ · V(T) ]</span>",
   ops:["e^{−rT}","e^{rT}","1","N(d₊)"], ok:0,
   nota:"Esperanza (bajo la medida neutral al riesgo) del pago <b>descontado</b>. La brújula de los dos volúmenes.", n:1},

  {q:"Paridad put–call:<br><span class='mono clave'>p = c − S + ___</span>",
   ops:["K·e^{−rT}","K","K·e^{rT}","S·e^{−rT}"], ok:0,
   nota:"Puro no-arbitraje: vale en cualquier modelo, no solo en Black–Scholes.", n:2},

  {q:"Bono en el modelo de Vasicek:<br><span class='mono clave'>P(0,T) = exp( −B·r₀ + ___ )</span>",
   ops:["A","B","r₀","σ²"], ok:0,
   nota:"Exponencial-afín en r₀. A combina reversión y volatilidad; Feynman–Kac da fórmulas cerradas para A y B.", n:3},

  {q:"Probabilidad de tocar una barrera m antes de T (reflexión):<br><span class='mono clave'>P(máx W ≥ m) = ___ · P(W_T ≥ m)</span>",
   ops:["2","1","½","√T"], ok:0,
   nota:"El doble. Una trayectoria puede tocar el nivel y luego retroceder — esa distinción es la esencia de las opciones de barrera.", n:2},

  {q:"Proceso de Poisson compensado (martingala):<br><span class='mono clave'>M_t = N_t − ___</span>",
   ops:["λt","λ","t","N₀"], ok:0,
   nota:"E[N_t] = Var(N_t) = λt, así que restarle λt lo centra.", n:2},

  {q:"Tasa forward continua entre T₁ y T₂:<br><span class='mono clave'>f = [ ln P(0,T₁) − ln P(0,T₂) ] / ( ___ )</span>",
   ops:["T₂ − T₁","T₂ + T₁","T₂·T₁","T₁"], ok:0,
   nota:"Con curva creciente, la forward queda por encima de las tasas contado.", n:3},

  {q:"Rendimiento continuo de un bono cupón cero:<br><span class='mono clave'>y = ___ / T</span>",
   ops:["−ln P(0,T)","ln P(0,T)","P(0,T)","1 − P(0,T)"], ok:0,
   nota:"Ejemplo de la guía: P = 0,8963 a 3 años → y = −ln(0,8963)/3 ≈ 3,65%.", n:2},

  {q:"Put americano perpetuo, exponente:<br><span class='mono clave'>γ = ___ / σ²</span>",
   ops:["2r","r","r²","σ"], ok:0,
   nota:"Y la barrera óptima es L* = γK/(1+γ). Por debajo de L* conviene ejercer de inmediato.", n:3},

  {q:"Precio de un derivado en el árbol multi-etapa se calcula por…",
   ops:["inducción hacia atrás nodo por nodo","simulación directa","integración numérica","interpolación lineal"], ok:0,
   nota:"Se conoce el pago en el vencimiento y se aplica la fórmula de una etapa de derecha a izquierda, recalculando la delta local.", n:1},

  {q:"Martingala exponencial usada en el cambio de medida:<br><span class='mono clave'>Z = exp( θX − ___ )</span>",
   ops:["½θ²","θ²","θ","½X²"], ok:0,
   nota:"Para X ~ N(0,1), E[e^{θX}] = e^{θ²/2}, así que ese −½θ² es justo lo que hace E[Z] = 1.", n:3}
],

/* ---------- VERDADERO / FALSO ---------- */
vf: [
  {q:"La probabilidad <b>real</b> de que la acción suba interviene en el precio del derivado.", v:false,
   nota:"No interviene. En el ejemplo de la guía, con p real = 2/3 el precio del call sigue siendo 1,20, calculado con p̃ = ½.", n:1},
  {q:"Bajo la medida neutral al riesgo, el precio <b>descontado</b> de la acción es una martingala.", v:true,
   nota:"Es la definición operativa de esa medida, y lo que convierte valorar en 'solo' tomar una esperanza.", n:1},
  {q:"El precio de un derivado es el costo de la cartera que lo replica.", v:true,
   nota:"Si no lo fuera, existiría un arbitraje.", n:1},
  {q:"Un put americano nunca puede valer más que el europeo equivalente.", v:false,
   nota:"Al revés: vale <b>más o igual</b>. La diferencia es el valor del derecho a ejercer antes.", n:1},
  {q:"El browniano tiene trayectorias continuas y diferenciables.", v:false,
   nota:"Continuas sí, pero <b>en ningún punto diferenciables</b>. Por eso hace falta la integral de Itô.", n:1},
  {q:"La variación cuadrática del browniano en [0,T] es aleatoria.", v:false,
   nota:"Es <b>determinista</b>: [W,W]_T = T exactamente. No fluctúa.", n:2},
  {q:"E[W_t | ℱ_s] = W_s para s ≤ t.", v:true,
   nota:"El mejor pronóstico del browniano es su valor actual: es una martingala.", n:1},
  {q:"Si X_t = μt + σW_t con μ ≠ 0, X sigue siendo una martingala.", v:false,
   nota:"No: E[X_t | ℱ_s] = X_s + μ(t−s). La tendencia rompe la propiedad.", n:2},
  {q:"La integral de Itô evalúa el integrando en el punto medio del subintervalo.", v:false,
   nota:"En el extremo <b>izquierdo</b>. Eso la hace no anticipativa y por tanto martingala.", n:3},
  {q:"El teorema de Girsanov cambia la volatilidad del proceso.", v:false,
   nota:"Cambia la <b>tendencia</b>, no la volatilidad. Reponderar con Z desplaza la media sin tocar la varianza.", n:2},
  {q:"No hay arbitraje ⟺ existe una medida neutral al riesgo.", v:true,
   nota:"Primer Teorema Fundamental del Activo.", n:1},
  {q:"Mercado completo ⟺ la medida neutral al riesgo es única.", v:true,
   nota:"Segundo Teorema Fundamental del Activo.", n:2},
  {q:"Con saltos, la medida neutral al riesgo sigue siendo única.", v:false,
   nota:"Con saltos el mercado deja de ser completo y hay un <b>rango</b> de medidas (y de precios) libres de arbitraje.", n:2},
  {q:"Feynman–Kac dice que valorar por esperanza y resolver una EDP son equivalentes.", v:true,
   nota:"Unifica las dos deducciones de Black–Scholes y justifica las diferencias finitas.", n:1},
  {q:"En Black–Scholes, la delta del call es N(d₋).", v:false,
   nota:"Es <b>N(d₊)</b>. N(d₋) es la probabilidad neutral al riesgo de ejercicio.", n:2},
  {q:"La paridad put–call depende del modelo que uses.", v:false,
   nota:"No depende: es puro no-arbitraje.", n:2},
  {q:"El precio de un forward con tasa r constante y sin dividendos es S₀·e^{rT}.", v:true,
   nota:"El valor de entrega que hace nulo el costo inicial del contrato.", n:2},
  {q:"En el modelo binomial de varias etapas se avanza hacia adelante desde t=0.", v:false,
   nota:"Se hace <b>inducción hacia atrás</b>: del vencimiento hacia el presente.", n:1},
  {q:"El proceso de precios de un americano es la envoltura de Snell del pago.", v:true,
   nota:"El menor supermartingala que domina al pago. El tiempo óptimo es el primer instante en que valor = intrínseco.", n:3},
  {q:"La condición 0 < d < 1+r < u es equivalente a la ausencia de arbitraje en el binomial.", v:true,
   nota:"Es exactamente lo que hace que p̃ esté entre 0 y 1.", n:2},
  {q:"El tanto forward y el tanto de futuros coinciden siempre.", v:false,
   nota:"Difieren cuando la tasa de interés es aleatoria: es la <b>corrección por convexidad</b>.", n:3},
  {q:"Las opciones asiáticas son markovianas en el precio actual.", v:false,
   nota:"El promedio no es markoviano: hay que <b>ampliar el estado</b> y resolver una EDP en más dimensiones.", n:3},
  {q:"Un numerario debe ser necesariamente la cuenta de efectivo.", v:false,
   nota:"Puede ser <b>cualquier activo positivo</b>. Con un bono cupón cero se obtiene la medida forward.", n:2},
  {q:"En el modelo HJM la tendencia de las tasas forward se elige libremente.", v:false,
   nota:"La condición de no-arbitraje de HJM la <b>fija</b> en función de sus volatilidades.", n:3},
  {q:"Para el proceso de Poisson, E[N_t] = Var(N_t) = λt.", v:true,
   nota:"Media y varianza coinciden. Es una firma característica del Poisson.", n:2},
  {q:"La probabilidad de tocar una barrera es igual a la de terminar por encima de ella.", v:false,
   nota:"Es el <b>doble</b> (principio de reflexión). Una trayectoria puede tocar y luego retroceder.", n:2},
  {q:"El Volumen II introduce ideas económicas nuevas respecto al Volumen I.", v:false,
   nota:"No añade ideas económicas: reconstruye las mismas en tiempo continuo, con más matemática y fórmulas explícitas.", n:1},
  {q:"El precio de estado ζ(H) del ejemplo (r=25%, p̃=½) es 0,40.", v:true,
   nota:"ζ(H) = p̃/(1+r) = 0,5/1,25 = 0,40. Y V₀ = 0,40·3 + 0,40·0 = 1,20, idéntico al de replicación.", n:3},
  {q:"En el ejemplo de Vasicek de la guía (r₀=3%, b=5%), la curva de rendimientos sube.", v:true,
   nota:"El bono a 3 años rinde ≈3,65%, por encima del 3% actual: la tasa revierte hacia la media de largo plazo b = 5%.", n:3},
  {q:"El sukun… — perdón, esto es finanzas: la delta se recalcula en cada nodo del árbol.", v:true,
   nota:"Es la <b>cobertura dinámica</b>: la delta local cambia nodo a nodo.", n:1}
],

/* ---------- SECUENCIAS LÓGICAS (ordenar pasos) ---------- */
secuencias: [
  {titulo:"Comprobar que un mercado binomial no admite arbitraje", n:1,
   pasos:[
     "Identificar u, d y la tasa r del período",
     "Comprobar que d < 1 + r",
     "Comprobar que 1 + r < u",
     "Concluir que p̃ = (1+r−d)/(u−d) cae entre 0 y 1"],
   nota:"La condición de no-arbitraje es exactamente lo que hace que p̃ sea una probabilidad legítima."},

  {titulo:"Calcular el pago de una opción al vencimiento", n:1,
   pasos:[
     "Mirar el precio del subyacente en el vencimiento",
     "Compararlo con el strike K",
     "Aplicar máx(S − K, 0) si es un call, o máx(K − S, 0) si es un put",
     "Concluir si vence dentro o fuera del dinero"],
   nota:"El pago nunca es negativo: por eso una opción es un derecho y no una obligación."},

  {titulo:"Descontar un flujo futuro a valor de hoy", n:1,
   pasos:[
     "Identificar el flujo y el momento en que se cobra",
     "Elegir la tasa libre de riesgo del plazo",
     "Calcular el factor de descuento e^(−rT) o 1/(1+r)ⁿ",
     "Multiplicar el flujo por ese factor"],
   nota:"Todo el resto de la teoría es refinar QUÉ esperanza descontar; el descuento en sí no cambia."},

  {titulo:"Construir la cartera replicante en una etapa", n:1,
   pasos:[
     "Calcular el pago del derivado en el escenario al alza",
     "Calcular el pago en el escenario a la baja",
     "Obtener Δ₀ como la diferencia de pagos entre la diferencia de precios",
     "Despejar la parte en efectivo que completa la cartera",
     "Sumar ambos componentes: ese es el precio"],
   nota:"El precio no sale de una opinión sobre el futuro, sino del coste de copiar el pago."},

  {titulo:"Aplicar el lema de Itô a una función del precio", n:2,
   pasos:[
     "Escribir la dinámica dX del proceso subyacente",
     "Calcular las derivadas parciales f_t, f_x y f_xx",
     "Escribir df = f_t dt + f_x dX + ½f_xx (dX)²",
     "Sustituir (dW)² = dt y descartar dt·dW y (dt)²",
     "Agrupar los términos en dt y en dW"],
   nota:"El término de ½f_xx es lo único que distingue esto de un desarrollo de Taylor normal, y es de donde sale el −½σ²."},

  {titulo:"Cubrir dinámicamente una posición vendida en opciones", n:2,
   pasos:[
     "Vender la opción y cobrar la prima",
     "Comprar Δ = ∂v/∂S acciones con ese dinero",
     "Financiar el resto en la cuenta bancaria a la tasa r",
     "Reajustar Δ cada vez que el precio se mueve",
     "Al vencimiento, la cartera vale exactamente el pago"],
   nota:"Gamma alta significa que Δ cambia rápido y hay que reajustar mucho: ahí es donde la cobertura se vuelve cara."},

  {titulo:"Valorar un call en el modelo binomial de UNA etapa",
   pasos:[
     "Calcular los precios finales S₁(H) = u·S₀ y S₁(T) = d·S₀",
     "Obtener los pagos V₁(H) y V₁(T) = máx(S₁ − K, 0)",
     "Calcular la probabilidad neutral al riesgo p̃ = (1+r−d)/(u−d)",
     "Calcular la delta de cobertura Δ₀ = (V₁(H) − V₁(T))/(S₁(H) − S₁(T))",
     "Descontar la esperanza: V₀ = [p̃·V₁(H) + q̃·V₁(T)]/(1+r)"],
   nota:"Fíjate en que la probabilidad <b>real</b> de subir no aparece por ningún lado.", n:1},

  {titulo:"Valorar un derivado americano en el árbol",
   pasos:[
     "Calcular el pago en todos los nodos del vencimiento",
     "Retroceder un período y calcular el valor de continuación descontado",
     "Comparar continuación con el valor intrínseco de ejercer ya",
     "Tomar el máximo de los dos en cada nodo",
     "Repetir hacia atrás hasta llegar a t = 0"],
   nota:"Eso es construir la <b>envoltura de Snell</b>. El tiempo óptimo de parada es el primer nodo donde el intrínseco gana.", n:2},

  {titulo:"Deducir Black–Scholes desde la cobertura",
   pasos:[
     "Modelar el precio como browniano geométrico dS = αS dt + σS dW",
     "Aplicar Itô–Doeblin a f(t,S) para obtener la dinámica de la opción",
     "Construir una cartera de cobertura con Δ acciones y efectivo",
     "Igualar la evolución de la cartera con la de la opción para eliminar el riesgo",
     "Obtener la EDP de Black–Scholes–Merton y resolverla con la condición final"],
   nota:"Eliminar el término en dW es exactamente lo que hace desaparecer α del precio.", n:3},

  {titulo:"Valorar por el camino neutral al riesgo (tiempo continuo)",
   pasos:[
     "Calcular el precio de mercado del riesgo Θ = (α − r)/σ",
     "Aplicar Girsanov: definir W̃_t = W_t + Θt bajo la nueva medida ℙ̃",
     "Comprobar que bajo ℙ̃ la acción tiene tendencia r y el precio descontado es martingala",
     "Escribir el precio como Ẽ[e^{−rT}·pago]",
     "Evaluar la esperanza (integral gaussiana) para obtener la fórmula cerrada"],
   nota:"Esta ℙ̃ es la que produce el mismo 6,89 del call que la vía de la EDP.", n:3},

  {titulo:"Obtener la curva de tasas a partir de bonos",
   pasos:[
     "Observar los precios de mercado P(0,T₁) y P(0,T₂)",
     "Calcular las tasas contado y = −ln P(0,T)/T para cada plazo",
     "Calcular la tasa forward f = [ln P(0,T₁) − ln P(0,T₂)]/(T₂ − T₁)",
     "Comparar la forward con las contado para leer la pendiente de la curva",
     "Usar esas forward para valorar caps, floors y swaps"],
   nota:"Curva creciente ⟹ la forward queda por encima de las contado.", n:2},

  {titulo:"Cambiar de medida en el modelo binomial (Vol. I, Cap. 3)",
   pasos:[
     "Partir de las probabilidades reales p y q sobre cada trayectoria",
     "Calcular las probabilidades neutrales al riesgo p̃ y q̃",
     "Formar la derivada de Radon–Nikodym Z = p̃/p en cada rama",
     "Verificar que E[Z] = 1",
     "Obtener los precios de estado descontando y ponderando por Z"],
   nota:"Los precios de estado y la replicación son <b>dos caras de la misma moneda</b>: dan el mismo número.", n:3},

  {titulo:"El arco completo de los dos volúmenes",
   pasos:[
     "Vol. I: no-arbitraje y replicación en el árbol binomial",
     "Vol. I: martingalas, cambio de medida y parada óptima con sumas finitas",
     "Vol. II: teoría de la medida y movimiento browniano",
     "Vol. II: integral de Itô y fórmula de Black–Scholes",
     "Vol. II: Girsanov, Feynman–Kac y las aplicaciones (exóticas, tasas, saltos)"],
   nota:"El Vol. II no añade economía nueva: reconstruye lo mismo con más matemática y a cambio da fórmulas explícitas.", n:1},

  {titulo:"Valorar una opción de barrera",
   pasos:[
     "Modelar el log-precio como un browniano con tendencia",
     "Necesitar la distribución conjunta del browniano y su máximo",
     "Aplicar el principio de reflexión para obtenerla",
     "Escribir el pago condicionado a haber tocado (o no) la barrera",
     "Tomar la esperanza neutral al riesgo descontada"],
   nota:"La probabilidad de <b>tocar</b> es el doble de la de terminar por encima: esa es toda la diferencia.", n:3}
]

};
