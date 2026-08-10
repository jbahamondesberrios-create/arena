/* ============================================================
   APUNTES · FINANZAS CUANTITATIVAS — modo estudio (sin preguntas)
   Resumen de la Guía de Shreve (Vol. I binomial · Vol. II continuo)
   ============================================================ */

window.APUNTES = window.APUNTES || {};

window.APUNTES.finanzas = [

/* ================================================================= */
{id:"fi-ap-1", t:"La idea central: no-arbitraje y replicación", emo:"🧠", min:7,
 res:"Los dos volúmenes de Shreve existen para hacer preciso un solo argumento. Este es ese argumento.",
 secciones:[

 {h:"El argumento completo, en cuatro líneas",
  c:`<ol>
  <li>Un <b>arbitraje</b> es ganar dinero sin arriesgar nada: coste inicial cero, pérdida imposible, ganancia con probabilidad positiva.</li>
  <li>En un mercado que funciona, los arbitrajes <b>no existen</b> (si aparecen, alguien los cierra en segundos).</li>
  <li>Si consigues construir una cartera de acción + efectivo que <b>replique exactamente</b> el pago de un derivado en todos los escenarios…</li>
  <li>…entonces el precio del derivado <b>tiene que ser</b> el coste de montar esa cartera. Cualquier otro precio sería un arbitraje.</li>
  </ol>
  <p class="tip">📌 Todo lo demás —martingalas, Itô, Girsanov, Feynman–Kac— es maquinaria para poder ejecutar el paso 3 en modelos cada vez más realistas.</p>`},

 {h:"Lo que NO interviene",
  c:`<p>La <b>probabilidad real</b> de que la acción suba <b>no aparece en ningún paso</b>. Esto choca con la intuición y es el punto que más cuesta aceptar.</p>
  <p>La razón: si replicas el pago en <b>todos</b> los escenarios, da igual cuál ocurra. No estás apostando sobre el futuro, estás copiándolo. Por eso dos inversores que discrepen totalmente sobre hacia dónde va la acción tienen que estar de acuerdo en el precio de la opción.</p>`},

 {h:"La probabilidad neutral al riesgo",
  c:`<p>Resulta que el resultado de la replicación se puede escribir como una <b>esperanza descontada</b>, pero bajo unas probabilidades <b>artificiales</b> p̃, q̃, no las reales:</p>
  <div class="formula">V₀ = (1/(1+r)) · [ p̃·V₁(H) + q̃·V₁(T) ]</div>
  <p>Esas p̃ y q̃ son un <b>artificio de cálculo</b>, no una creencia sobre el mundo. Bajo ellas, todo activo rinde exactamente r. De ahí el nombre: es el mundo que verían inversores indiferentes al riesgo.</p>`},

 {h:"El teorema que lo organiza todo",
  c:`<ul>
  <li><b>Primer teorema fundamental</b>: no hay arbitraje ⟺ existe al menos una medida neutral al riesgo.</li>
  <li><b>Segundo teorema fundamental</b>: el mercado es <b>completo</b> (todo derivado es replicable) ⟺ esa medida es <b>única</b>.</li>
  </ul>
  <p>Cuando la medida no es única, hay derivados que no se pueden cubrir perfectamente y aparece un <b>rango</b> de precios sin arbitraje en vez de un número.</p>`}
]},

/* ================================================================= */
{id:"fi-ap-2", t:"El modelo binomial", emo:"🌳", min:8,
 res:"El laboratorio donde todo se ve sin ecuaciones diferenciales. Si lo dominas aquí, el continuo es traducción.",
 secciones:[

 {h:"Una etapa",
  c:`<p>La acción vale S₀ y en un período sube a u·S₀ o baja a d·S₀. La tasa del período es r. Condición de <b>no-arbitraje</b>:</p>
  <div class="formula">0 &lt; d &lt; 1 + r &lt; u</div>
  <p>Si 1+r quedara fuera del intervalo, el bono dominaría a la acción o al revés, y habría dinero gratis. Con esa condición:</p>
  <div class="formula">p̃ = (1 + r − d)/(u − d)  ·  q̃ = 1 − p̃ = (u − 1 − r)/(u − d)</div>
  <p>Y ambas caen automáticamente entre 0 y 1. <b>La condición de no-arbitraje es exactamente la que hace que p̃ sea una probabilidad.</b></p>`},

 {h:"La cartera replicante y la delta",
  c:`<p>Buscas Δ₀ acciones y el resto en efectivo tal que la cartera valga lo mismo que el derivado en los dos escenarios. Resolviendo el sistema:</p>
  <div class="formula">Δ₀ = [ V₁(H) − V₁(T) ] / [ S₁(H) − S₁(T) ]</div>
  <p>Es una <b>pendiente</b>: cuánto cambia el valor del derivado por cada unidad que cambia la acción. En el continuo será la derivada ∂v/∂x. Ese es todo el salto conceptual.</p>`},

 {h:"Varias etapas",
  c:`<p>Se resuelve <b>hacia atrás</b>. En los nodos finales conoces el pago. En cada nodo anterior:</p>
  <div class="formula">V<sub>n</sub> = (1/(1+r))·[ p̃·V<sub>n+1</sub>(H) + q̃·V<sub>n+1</sub>(T) ]</div>
  <p>Repites hasta la raíz. El resultado es el precio, y las Δ que vas calculando en cada nodo forman la <b>estrategia de cobertura dinámica</b>: cuántas acciones tener en cada momento y en cada escenario.</p>`},

 {h:"Americanas: la única diferencia",
  c:`<p>En una opción americana, en cada nodo comparas y te quedas con lo mejor:</p>
  <div class="formula">V<sub>n</sub> = máx( valor intrínseco , valor de continuación )</div>
  <p>El valor intrínseco es lo que ganas ejerciendo ya; el de continuación es la esperanza descontada. La diferencia entre el precio americano y el europeo es el <b>valor del derecho a ejercer antes</b>, y nunca es negativa.</p>
  <p class="tip">💡 Un <b>call americano sobre acción sin dividendos nunca se ejerce antes</b>: vale lo mismo que el europeo. Con puts sí conviene, y por eso no hay fórmula cerrada tipo Black–Scholes para ellos.</p>`},

 {h:"Al límite",
  c:`<p>Si haces los pasos infinitamente pequeños con u = e^(σ√Δt) y d = 1/u, el árbol binomial <b>converge</b> a Black–Scholes. Literalmente: la fórmula continua es el límite de este procedimiento discreto.</p>`}
]},

/* ================================================================= */
{id:"fi-ap-3", t:"Esperanza condicional y martingalas", emo:"⚖️", min:8,
 res:"El lenguaje con el que se escribe «lo que sé hasta hoy». Sin esto, nada del Vol. II se sostiene.",
 secciones:[

 {h:"Esperanza condicional",
  c:`<p>E<sub>n</sub>[X] es el <b>mejor pronóstico de X con la información disponible en el instante n</b>. No es un número: es una variable aleatoria, porque depende de lo que haya pasado hasta n.</p>
  <p>Cinco reglas que se usan sin parar:</p>
  <ul>
  <li><b>Linealidad</b>: E<sub>n</sub>[aX + bY] = aE<sub>n</sub>[X] + bE<sub>n</sub>[Y]</li>
  <li><b>Sacar lo conocido</b>: si X ya se conoce en n, E<sub>n</sub>[XY] = X·E<sub>n</sub>[Y]</li>
  <li><b>Torre iterada</b>: E<sub>m</sub>[E<sub>n</sub>[X]] = E<sub>m</sub>[X] para m ≤ n</li>
  <li><b>Independencia</b>: si X es independiente de la información en n, E<sub>n</sub>[X] = E[X]</li>
  <li><b>Jensen condicional</b>: si φ es convexa, φ(E<sub>n</sub>[X]) ≤ E<sub>n</sub>[φ(X)]</li>
  </ul>
  <p class="tip">💡 La torre iterada es la más útil: dice que <b>no puedes pronosticar mejor hoy tu pronóstico de mañana</b> de lo que pronosticas hoy directamente.</p>`},

 {h:"Martingala",
  c:`<div class="formula">E<sub>n</sub>[M<sub>n+1</sub>] = M<sub>n</sub></div>
  <p>Un <b>juego justo</b>: en promedio, mañana vale lo que vale hoy. No tiene tendencia. Variantes: <b>submartingala</b> (≥, tiende a subir) y <b>supermartingala</b> (≤, tiende a bajar).</p>`},

 {h:"El resultado que importa",
  c:`<p>Bajo la medida neutral al riesgo, el <b>precio descontado</b> de cualquier activo es una martingala:</p>
  <div class="formula">S<sub>n</sub>/(1+r)<sup>n</sup> es martingala bajo P̃</div>
  <p>Esto reformula todo el problema: <b>valorar = calcular una esperanza bajo la medida correcta</b>. Y por la torre iterada, esa esperanza se puede calcular por etapas, que es exactamente el algoritmo hacia atrás del árbol.</p>`},

 {h:"Procesos adaptados y tiempos de parada",
  c:`<ul>
  <li><b>Adaptado</b>: su valor en n solo depende de información hasta n. No mira el futuro. Toda estrategia de inversión legítima lo es.</li>
  <li><b>Previsible</b>: se decide en n−1 y se aplica en n. Las posiciones Δ<sub>n</sub> son previsibles: eliges cuántas acciones tener <b>antes</b> de ver el movimiento.</li>
  <li><b>Tiempo de parada</b>: una regla de «cuándo salir» que solo usa información pasada. «Vender cuando la acción toque 100» vale; «vender en el máximo del año» no.</li>
  </ul>
  <p>El <b>teorema de muestreo opcional</b>: si M es martingala y τ es tiempo de parada acotado, E[M<sub>τ</sub>] = M₀. Traducción: <b>ninguna regla de salida convierte un juego justo en uno ganador.</b></p>`}
]},

/* ================================================================= */
{id:"fi-ap-4", t:"Browniano e integral de Itô", emo:"🌊", min:9,
 res:"El salto al tiempo continuo. La regla (dW)² = dt y por qué obliga a reescribir el cálculo entero.",
 secciones:[

 {h:"Movimiento browniano",
  c:`<p>W(t) es un browniano si: W(0) = 0, tiene <b>incrementos independientes</b>, W(t) − W(s) ~ N(0, t−s), y sus trayectorias son <b>continuas</b>.</p>
  <p>Propiedades que hay que tener presentes:</p>
  <ul>
  <li>Es una <b>martingala</b>: E<sub>s</sub>[W(t)] = W(s).</li>
  <li>Var(W(t)) = t. La desviación típica crece como <b>√t</b>, no como t.</li>
  <li>Sus trayectorias son continuas pero <b>en ningún punto derivables</b>.</li>
  <li>Su <b>variación cuadrática</b> en [0,T] es exactamente T, no es aleatoria.</li>
  </ul>`},

 {h:"La regla que lo cambia todo",
  c:`<div class="formula">(dW)² = dt · dW·dt = 0 · (dt)² = 0</div>
  <p>En cálculo normal, los términos de segundo orden se desprecian. Aquí <b>no se puede</b>: (dW)² es de primer orden en dt. Esa es la única diferencia técnica entre el cálculo de siempre y el de Itô, y de ella sale absolutamente todo lo demás.</p>`},

 {h:"Lema de Itô",
  c:`<div class="formula">df(t, X) = f<sub>t</sub> dt + f<sub>x</sub> dX + ½ f<sub>xx</sub> (dX)²</div>
  <p>Es un Taylor de segundo orden donde el término ½f″ <b>sobrevive</b>. Para X = W:</p>
  <div class="formula">df(W) = f′(W) dW + ½ f″(W) dt</div>
  <p>Ejemplo clave — el <b>movimiento browniano geométrico</b> dS = μS dt + σS dW. Aplicando Itô a ln S:</p>
  <div class="formula">d(ln S) = (μ − ½σ²) dt + σ dW  ⟹  S(t) = S₀·e<sup>(μ − ½σ²)t + σW(t)</sup></div>
  <p class="tip">⚠️ Ese <b>−½σ²</b> es la firma de Itô. Es la razón de que el rendimiento esperado del <b>logaritmo</b> sea menor que μ, aunque E[S(t)] = S₀e^(μt). No es una corrección cosmética: es la diferencia entre la media y la mediana en una lognormal.</p>`},

 {h:"La integral de Itô",
  c:`<p>∫Δ(t)dW(t) es la ganancia acumulada de una estrategia Δ. Como W no es derivable, no se puede definir trayectoria a trayectoria: se define como límite en media cuadrática de sumas donde <b>Δ se evalúa al principio</b> de cada intervalo.</p>
  <p>Que se evalúe al principio no es un detalle técnico: es lo que hace que la integral sea una <b>martingala</b>, y financieramente significa que <b>decides tu posición antes de ver el movimiento</b>. Es la versión continua de «previsible».</p>
  <div class="formula">Isometría de Itô:  E[(∫Δ dW)²] = E[∫Δ² dt]</div>`}
]},

/* ================================================================= */
{id:"fi-ap-5", t:"Black–Scholes", emo:"📐", min:8,
 res:"De dónde sale la EDP, qué significa cada pieza de la fórmula y qué pasa cuando el modelo se rompe.",
 secciones:[

 {h:"La EDP",
  c:`<p>Montas una cartera con Δ = ∂v/∂x acciones que replique la opción, aplicas Itô, e impones que el término aleatorio se cancele. Lo que queda es determinista y debe rendir r:</p>
  <div class="formula">v<sub>t</sub> + r·x·v<sub>x</sub> + ½σ²x²·v<sub>xx</sub> = r·v</div>
  <p>Con condición <b>final</b> v(T,x) = pago. El tiempo corre hacia atrás: conoces el final y buscas el principio.</p>
  <p class="tip">📌 Fíjate en lo que <b>no</b> está: μ, la tendencia real de la acción. Desapareció al cancelar el riesgo. Por eso el precio no depende de tu opinión sobre el mercado.</p>`},

 {h:"La fórmula",
  c:`<div class="formula">c = S·N(d₊) − K·e<sup>−rT</sup>·N(d₋)</div>
  <div class="formula">d₊ = [ ln(S/K) + (r + ½σ²)T ] / (σ√T)  ·  d₋ = d₊ − σ√T</div>
  <p>Lectura de cada pieza:</p>
  <ul>
  <li><b>N(d₊) = Δ</b>, la delta: cuántas acciones hay que tener para cubrir.</li>
  <li><b>N(d₋)</b> = probabilidad neutral al riesgo de acabar <i>in the money</i>.</li>
  <li><b>K·e^(−rT)</b> = strike descontado: lo que hay que reservar hoy para pagarlo.</li>
  </ul>
  <p>Es «tener N(d₊) acciones financiadas con un préstamo de K·e^(−rT)·N(d₋)». La fórmula <b>es</b> la cartera replicante escrita en una línea.</p>`},

 {h:"Paridad put-call",
  c:`<div class="formula">c − p = S − K·e<sup>−rT</sup></div>
  <p>Es <b>puro no-arbitraje</b>: no depende del modelo, ni de σ, ni de la distribución. Sale de que «call largo + put corto» tiene exactamente el mismo pago que un forward. Si el mercado la viola, hay dinero gratis.</p>`},

 {h:"Las griegas",
  c:`<table class="tabla">
  <tr><th>Griega</th><th>Es</th><th>Mide</th></tr>
  <tr><td>Delta Δ</td><td>∂v/∂S</td><td>sensibilidad al subyacente = cobertura</td></tr>
  <tr><td>Gamma Γ</td><td>∂²v/∂S²</td><td>cuánto cambia la delta; coste de recubrir</td></tr>
  <tr><td>Vega</td><td>∂v/∂σ</td><td>sensibilidad a la volatilidad</td></tr>
  <tr><td>Theta Θ</td><td>∂v/∂t</td><td>desgaste por paso del tiempo</td></tr>
  <tr><td>Rho ρ</td><td>∂v/∂r</td><td>sensibilidad al tipo de interés</td></tr>
  </table>
  <p>Gamma alta = la delta cambia rápido = hay que reajustar mucho la cobertura. La relación gamma–theta es el intercambio central del que vive un trader de opciones.</p>`},

 {h:"Dónde falla el modelo",
  c:`<p>Black–Scholes asume σ constante. El mercado dice otra cosa: si inviertes la fórmula para obtener la <b>volatilidad implícita</b> de opciones reales, no sale un número plano sino una <b>sonrisa/sesgo</b>: los strikes bajos cotizan con volatilidad implícita más alta.</p>
  <p>Traducción: el mercado cree en <b>colas más gordas</b> y en caídas bruscas más de lo que admite una lognormal. Los modelos posteriores (volatilidad local, estocástica, saltos) existen para arreglar exactamente eso.</p>`}
]},

/* ================================================================= */
{id:"fi-ap-6", t:"Girsanov, numerarios y tipos de interés", emo:"🔀", min:8,
 res:"Cambiar de medida es cambiar de punto de vista. Elegir bien el numerario elimina la mitad del álgebra.",
 secciones:[

 {h:"Precio de mercado del riesgo",
  c:`<div class="formula">Θ = (α − r)/σ</div>
  <p>Exceso de rendimiento <b>por unidad de riesgo</b>. Es lo que el mercado paga por soportar volatilidad. Con varios activos impulsados por los mismos brownianos, todos deben compartir el mismo Θ — si no, hay arbitraje.</p>`},

 {h:"Teorema de Girsanov",
  c:`<div class="formula">W̃(t) = W(t) + ∫₀<sup>t</sup> Θ(s) ds</div>
  <p>Bajo una medida nueva P̃, ese W̃ es un browniano estándar. Lo que ha ocurrido es que <b>se ha reasignado probabilidad a las trayectorias</b> para eliminar la tendencia: bajo P̃, todos los activos rinden r.</p>
  <p>Punto crucial: la medida nueva y la vieja son <b>equivalentes</b> — coinciden en qué es imposible. Cambiar de medida cambia las probabilidades, <b>no</b> los escenarios posibles ni la volatilidad.</p>
  <p>El <b>derivado de Radon–Nikodým</b> Z = dP̃/dP es el factor de conversión, y es una martingala bajo P.</p>`},

 {h:"Feynman–Kac",
  c:`<p>El puente entre EDP y esperanzas: la solución de una EDP parabólica se puede escribir como una esperanza sobre trayectorias, y al revés.</p>
  <div class="formula">v(t,x) = Ẽ[ e<sup>−r(T−t)</sup> · pago | X(t) = x ]</div>
  <p>Por eso <b>hay dos caminos para valorar</b>: resolver la ecuación diferencial (métodos numéricos, diferencias finitas) o simular trayectorias y promediar (Montecarlo). Dan lo mismo, y eliges según qué sea más barato.</p>`},

 {h:"Cambio de numerario",
  c:`<p>Un <b>numerario</b> es la unidad en la que mides. Normalmente es la cuenta bancaria, pero puedes elegir otra cosa y todo sigue funcionando, con la medida ajustada:</p>
  <table class="tabla">
  <tr><th>Numerario</th><th>Medida</th><th>Qué se vuelve martingala</th></tr>
  <tr><td>cuenta bancaria</td><td>neutral al riesgo P̃</td><td>precios descontados</td></tr>
  <tr><td>bono cupón cero P(t,T)</td><td>medida forward T</td><td>precios forward F(t,T)</td></tr>
  <tr><td>otro activo</td><td>la asociada a él</td><td>cocientes de precios</td></tr>
  </table>
  <p class="tip">💡 Bajo la <b>medida forward</b>, el descuento sale fuera de la esperanza y el forward es martingala. Eso es lo que hace que la fórmula de Black para opciones sobre tipos salga en tres líneas en vez de treinta.</p>`},

 {h:"Modelos de tipos",
  c:`<ul>
  <li><b>Vasicek</b>: dR = (α − βR)dt + σdW. Reversión a la media, R gaussiano — <b>puede volverse negativo</b>, y hay solución cerrada.</li>
  <li><b>CIR</b>: dR = (α − βR)dt + σ√R dW. La √R apaga el ruido cuando R baja, así que <b>R ≥ 0</b>. Más realista, más difícil.</li>
  <li><b>HJM</b>: modela toda la curva forward a la vez, e impone una condición de no-arbitraje que <b>fija la tendencia</b> en función de la volatilidad.</li>
  </ul>
  <p>Relaciones básicas: P(0,T) = e^(−y·T) define el rendimiento y; la tasa forward entre T₁ y T₂ es f = [ln P(0,T₁) − ln P(0,T₂)]/(T₂ − T₁).</p>`}
]},

/* ================================================================= */
{id:"fi-ap-7", t:"Americanas, exóticas y saltos", emo:"💥", min:7,
 res:"Lo que queda cuando el pago deja de depender solo del precio final.",
 secciones:[

 {h:"Opciones americanas",
  c:`<p>El titular elige <b>cuándo</b> ejercer: hay que optimizar sobre <b>tiempos de parada</b>.</p>
  <div class="formula">V(t) = sup<sub>τ</sub> Ẽ[ e<sup>−rτ</sup> · pago(τ) ]</div>
  <p>El precio descontado es una <b>supermartingala</b> (tiende a bajar por el desgaste temporal) y coincide con una martingala mientras <b>no</b> sea óptimo ejercer. La frontera entre las dos regiones es la <b>frontera de ejercicio</b>, y hay que hallarla junto con el precio: por eso es un problema de frontera libre.</p>
  <p>Caso resoluble a mano: el <b>put perpetuo</b>. Con γ = 2r/σ², la barrera óptima es L* = γK/(1+γ). Si S ≤ L*, ejerce ya.</p>`},

 {h:"Exóticas dependientes del camino",
  c:`<ul>
  <li><b>Barrera</b> (knock-in / knock-out): se activa o muere al tocar un nivel. Se valoran con el <b>principio de reflexión</b>.</li>
  <li><b>Lookback</b>: el pago usa el máximo o mínimo del período.</li>
  <li><b>Asiática</b>: el pago usa la <b>media</b> del precio. No hay fórmula cerrada bajo lognormal (la suma de lognormales no es lognormal), así que se va a Montecarlo.</li>
  </ul>
  <div class="formula">Reflexión:  P(máx<sub>[0,T]</sub> W ≥ m) = 2·P(W(T) ≥ m)</div>
  <p>El factor <b>2</b> tiene una lectura directa: por cada trayectoria que toca m y acaba por encima, hay otra igual de probable que toca y retrocede.</p>`},

 {h:"Saltos",
  c:`<p>Un <b>proceso de Poisson</b> N(t) cuenta saltos que llegan con intensidad λ. E[N(t)] = Var(N(t)) = λt, y <b>N(t) − λt es una martingala</b> (el proceso compensado).</p>
  <p>Al añadir saltos al modelo, aparece una consecuencia grande: <b>el mercado deja de ser completo</b>. Con acción y bono no puedes cubrir simultáneamente el riesgo de difusión y el de salto. La medida neutral al riesgo <b>ya no es única</b>, y en vez de un precio obtienes un intervalo de precios sin arbitraje.</p>
  <p class="tip">📌 Ahí es donde la teoría deja de dar una respuesta única y empieza la modelización con criterio. Los saltos también explican parte de la sonrisa de volatilidad.</p>`},

 {h:"Mapa mental para repasar",
  c:`<ul>
  <li><b>Vol. I</b> — árbol binomial: replicación, p̃, martingalas discretas, americanas, paseo aleatorio.</li>
  <li><b>Vol. II 1–4</b> — probabilidad general, browniano, Itô, Black–Scholes.</li>
  <li><b>Vol. II 5–6</b> — Girsanov, representación de martingalas, Feynman–Kac.</li>
  <li><b>Vol. II 7–8</b> — exóticas y americanas en continuo.</li>
  <li><b>Vol. II 9–11</b> — cambio de numerario, tipos de interés, saltos.</li>
  </ul>
  <p>Si tuvieras que quedarte con tres cosas: <b>replicación ⟹ precio</b>, <b>(dW)² = dt</b>, y <b>valorar = esperanza descontada bajo la medida correcta</b>.</p>`}
]}

];
