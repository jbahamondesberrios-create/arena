/* ============================================================
   FINANZAS CUANTITATIVAS · EJERCICIOS RESUELTOS + AMPLIACIÓN
   Se añaden al final de window.APUNTES.finanzas
   ============================================================ */

window.APUNTES = window.APUNTES || {};
window.APUNTES.finanzas = window.APUNTES.finanzas || [];

window.APUNTES.finanzas.push(

/* =================================================================
   1 · BINOMIAL RESUELTO
   ================================================================= */
{id:"fi-ej-1", t:"Modelo binomial · 9 ejercicios resueltos", emo:"🌳", min:18,
 res:"Todo el árbol con números concretos: replicación, probabilidad riesgo-neutral, dos periodos, americana, paridad y delta. Con un solo juego de datos para poder comparar.",
 secciones:[

 {h:"Los datos que usaremos en todo el apunte",
  c:`<p>Para que se puedan comparar los ejercicios entre sí, todos usan el mismo mercado:</p>
  <div class="formula">S₀ = 100 · u = 1,2 · d = 0,8 · r = 5 % por periodo (1 + r = 1,05)</div>
  <p>Árbol de precios:</p>
  <table class="tabla">
  <tr><th>t = 0</th><th>t = 1</th><th>t = 2</th></tr>
  <tr><td rowspan="3">100</td><td rowspan="2">120</td><td>144</td></tr>
  <tr><td rowspan="2">96</td></tr>
  <tr><td>80</td></tr>
  <tr><td></td><td></td><td>64</td></tr>
  </table>
  <p class="tip">⚠️ Antes de nada, comprueba siempre <b>d &lt; 1+r &lt; u</b>. Aquí 0,8 &lt; 1,05 &lt; 1,2 ✓. Si fallara, habría arbitraje puro y el modelo no tendría sentido.</p>`},

 {h:"Ejercicio 1 · La probabilidad riesgo-neutral",
  c:`<div class="ejer"><div class="ejer-enun">Calcula p̃ y explica qué significa.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>De dónde sale:</b> se exige que el precio descontado sea martingala, es decir, que S₀ = [p̃·uS₀ + (1−p̃)·dS₀]/(1+r).</li>
  <li>Divide por S₀: 1 + r = p̃u + (1−p̃)d.</li>
  <li>Despeja: <b>p̃ = (1 + r − d)/(u − d)</b>.</li>
  <li>Sustituye: p̃ = (1,05 − 0,8)/(1,2 − 0,8) = 0,25/0,4.</li>
  </ol>
  <div class="resultado-ej">p̃ = 0,625 y 1 − p̃ = 0,375</div>
  <p><b>Qué NO es:</b> no es la probabilidad de que la acción suba. Es un artificio de cálculo — el único juego de pesos con el que descontar a la tasa sin riesgo da el precio correcto. La probabilidad real p no aparece por ningún lado en el precio de la opción, y ese es el resultado más sorprendente de todo el modelo.</p>
  </details></div>`},

 {h:"Ejercicio 2 · Precio de una call por replicación",
  c:`<div class="ejer"><div class="ejer-enun">Call europea a un periodo con K = 100. Halla la cartera que la replica y su precio.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Pagos:</b> si sube, S = 120 ⟹ C<sub>u</sub> = 20. Si baja, S = 80 ⟹ C<sub>d</sub> = 0.</li>
  <li><b>Delta</b> (cuántas acciones): Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) = 20/40 = <b>0,5</b>.</li>
  <li><b>Dinero en el banco:</b> impón que la cartera valga lo mismo que la opción en un estado. En el estado bajo: 0,5·80 + B·1,05 = 0 ⟹ B = −40/1,05 = −38,10.</li>
  <li><b>Comprueba en el otro estado:</b> 0,5·120 − 38,10·1,05 = 60 − 40 = 20 ✓</li>
  <li><b>Precio hoy</b> = coste de montar la cartera: 0,5·100 − 38,10.</li>
  </ol>
  <div class="resultado-ej">Δ = 0,5 · B = −38,10 (pides prestado) · C₀ = 11,90</div>
  <p class="tip">🧠 Esto es el corazón de todo Shreve: <b>el precio no se «estima», se construye</b>. Si alguien te vendiera esa call a 11, montarías la cartera y tendrías beneficio seguro.</p>
  </details></div>`},

 {h:"Ejercicio 3 · El mismo precio, por la fórmula riesgo-neutral",
  c:`<div class="ejer"><div class="ejer-enun">Recalcula la call del ejercicio 2 con la esperanza riesgo-neutral.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Fórmula: C₀ = [p̃·C<sub>u</sub> + (1−p̃)·C<sub>d</sub>]/(1+r).</li>
  <li>= [0,625·20 + 0,375·0]/1,05 = 12,5/1,05.</li>
  </ol>
  <div class="resultado-ej">C₀ = 11,9048 — el mismo número que por replicación</div>
  <p>Que los dos caminos coincidan <b>no es casualidad</b>: es el primer teorema fundamental de la valoración. La medida riesgo-neutral no es más que la contabilidad comprimida de la cartera replicante.</p>
  </details></div>`},

 {h:"Ejercicio 4 · Call europea a dos periodos",
  c:`<div class="ejer"><div class="ejer-enun">Call europea con K = 100 y vencimiento en t = 2.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Pagos en t = 2:</b> 144 → 44 · 96 → 0 (está por debajo del strike) · 64 → 0.</li>
  <li><b>Nodo alto (S = 120):</b> C<sub>u</sub> = [0,625·44 + 0,375·0]/1,05 = 27,5/1,05 = 26,19.</li>
  <li><b>Nodo bajo (S = 80):</b> los dos pagos siguientes son 0 ⟹ C<sub>d</sub> = 0.</li>
  <li><b>Raíz:</b> C₀ = [0,625·26,19 + 0,375·0]/1,05 = 16,369/1,05.</li>
  </ol>
  <div class="resultado-ej">C₀ = 15,59</div>
  <p class="tip">📌 Método general: <b>siempre hacia atrás</b>, desde las hojas del árbol hasta la raíz, aplicando la misma fórmula en cada nodo. Ese es todo el algoritmo.</p>
  </details></div>`},

 {h:"Ejercicio 5 · Put europea y paridad put-call",
  c:`<div class="ejer"><div class="ejer-enun">Put europea a un periodo con K = 100. Calcúlala de dos formas.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Directo:</b> pagos 0 (si sube a 120) y 20 (si baja a 80). P₀ = [0,625·0 + 0,375·20]/1,05 = 7,5/1,05 = 7,1429.</li>
  <li><b>Por paridad:</b> C − P = S₀ − K/(1+r).</li>
  <li>S₀ − K/(1+r) = 100 − 100/1,05 = 100 − 95,238 = 4,762.</li>
  <li>P = C − 4,762 = 11,9048 − 4,762 = 7,1429 ✓</li>
  </ol>
  <div class="resultado-ej">P₀ = 7,1429 por los dos caminos</div>
  <p><b>Por qué la paridad es cierta sin ningún modelo:</b> comprar una call y vender una put da exactamente el mismo pago que comprar la acción a plazo con precio K. Si los precios no cuadran, hay arbitraje. No hace falta suponer binomial ni Black–Scholes.</p>
  </details></div>`},

 {h:"Ejercicio 6 · Put americana: cuándo conviene ejercer",
  c:`<div class="ejer"><div class="ejer-enun">Put <b>americana</b> con K = 100 y vencimiento en t = 2. Compárala con la europea.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Pagos finales:</b> 144 → 0 · 96 → 4 · 64 → 36.</li>
  <li><b>Nodo alto (S = 120):</b> continuación = [0,625·0 + 0,375·4]/1,05 = 1,5/1,05 = 1,43. Intrínseco = máx(100−120, 0) = 0. <b>No se ejerce</b>, valor 1,43.</li>
  <li><b>Nodo bajo (S = 80):</b> continuación = [0,625·4 + 0,375·36]/1,05 = 16/1,05 = 15,24. Intrínseco = 100 − 80 = <b>20</b>. Como 20 &gt; 15,24, <b>se ejerce ya</b>. Valor 20.</li>
  <li><b>Raíz:</b> continuación = [0,625·1,43 + 0,375·20]/1,05 = 8,393/1,05 = 7,99. Intrínseco = 0 ⟹ no se ejerce.</li>
  <li><b>Europea, para comparar:</b> en el nodo bajo valdría 15,24 (sin poder ejercer), y en la raíz [0,625·1,43 + 0,375·15,24]/1,05 = 6,29.</li>
  </ol>
  <div class="resultado-ej">Americana ≈ 7,99 · Europea ≈ 6,29 · prima de ejercicio anticipado ≈ 1,70</div>
  <p class="tip">🧭 En cada nodo de una americana: <b>valor = máx(intrínseco, continuación)</b>. Y recuerda el resultado clásico: una <i>call</i> americana sobre acción sin dividendos <b>nunca</b> se ejerce antes, así que vale lo mismo que la europea. Con la put no pasa: aquí se ve por qué.</p>
  </details></div>`},

 {h:"Ejercicio 7 · La cartera de cobertura, periodo a periodo",
  c:`<div class="ejer"><div class="ejer-enun">Has vendido la call europea a dos periodos del ejercicio 4. ¿Cómo te cubres?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>En t = 0:</b> Δ₀ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) = (26,19 − 0)/(120 − 80) = 0,655. Compras 0,655 acciones con los 15,59 cobrados más 49,91 prestados.</li>
  <li><b>Si sube (S = 120):</b> tu cartera vale 0,655·120 − 49,91·1,05 = 78,57 − 52,40 = 26,17 ≈ C<sub>u</sub> ✓. Rebalanceas: Δ₁ = (44 − 0)/(144 − 96) = <b>0,9167</b>.</li>
  <li><b>Si baja (S = 80):</b> la cartera vale 0,655·80 − 52,40 = 52,40 − 52,40 = 0 ≈ C<sub>d</sub> ✓. Δ₁ = 0: te sales del todo, la opción ya no vale nada.</li>
  </ol>
  <div class="resultado-ej">Δ₀ = 0,655 → Δ₁ = 0,9167 (rama alta) o 0 (rama baja)</div>
  <p><b>Autofinanciación:</b> en cada rebalanceo no metes ni sacas dinero; solo cambias acciones por deuda. Esa es la condición técnica que hace que la replicación sea legítima, y es lo que en tiempo continuo se convierte en dX = Δ dS + r(X − ΔS)dt.</p>
  </details></div>`},

 {h:"Ejercicio 8 · Un mercado con arbitraje",
  c:`<div class="ejer"><div class="ejer-enun">Si u = 1,2, d = 0,8 y r = 30 %, ¿qué pasa?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>1 + r = 1,3, que es <b>mayor que u = 1,2</b>. Se rompe la condición d &lt; 1+r &lt; u.</li>
  <li>p̃ = (1,3 − 0,8)/0,4 = 1,25: una «probabilidad» mayor que 1. Señal inequívoca de que algo está mal.</li>
  <li><b>El arbitraje explícito:</b> vende la acción en corto por 100, mete el dinero al 30 %. En t = 1 tienes 130 y debes como mucho 120. Beneficio seguro ≥ 10, sin poner nada.</li>
  </ol>
  <div class="resultado-ej">No existe medida riesgo-neutral ⟺ hay arbitraje</div>
  <p class="tip">🔗 Eso es literalmente el <b>primer teorema fundamental</b>: la existencia de p̃ ∈ (0,1) equivale a la ausencia de arbitraje. Cuando p̃ se sale del intervalo, el modelo te está avisando.</p>
  </details></div>`},

 {h:"Ejercicio 9 · Del árbol a Black–Scholes",
  c:`<div class="ejer"><div class="ejer-enun">¿Cómo se eligen u, d y r para que el árbol converja al modelo continuo?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Parte el tiempo T en n pasos: Δt = T/n.</li>
  <li><b>Calibración de Cox–Ross–Rubinstein:</b> u = e<sup>σ√Δt</sup> y d = 1/u = e<sup>−σ√Δt</sup>.</li>
  <li>Factor de capitalización por paso: e<sup>rΔt</sup>, así que p̃ = (e<sup>rΔt</sup> − d)/(u − d).</li>
  <li>Al hacer n → ∞, el logaritmo del precio final es una suma de n variables i.i.d. Por el <b>teorema central del límite</b>, converge a una normal.</li>
  <li>Y la fórmula del árbol converge exactamente a la de Black–Scholes.</li>
  </ol>
  <div class="resultado-ej">u = e<sup>σ√Δt</sup>, d = e<sup>−σ√Δt</sup>, p̃ = (e<sup>rΔt</sup> − d)/(u − d)</div>
  <p class="tip">💡 Fíjate en el <b>√Δt</b>: la volatilidad escala con la raíz del tiempo, no con el tiempo. Es la firma del movimiento browniano y explica que doblar el horizonte solo multiplique el riesgo por √2.</p>
  </details></div>`}
]},

/* =================================================================
   2 · BLACK–SCHOLES RESUELTO
   ================================================================= */
{id:"fi-ej-2", t:"Black–Scholes · 9 ejercicios resueltos", emo:"📐", min:18,
 res:"Un solo caso numérico llevado hasta el final: d₁, d₂, precio de la call, de la put, todas las griegas y qué pasa al mover cada parámetro.",
 secciones:[

 {h:"El caso base",
  c:`<div class="formula">S = 100 · K = 100 · r = 5 % · σ = 20 % · T = 1 año</div>
  <p>Y la fórmula, con la notación de siempre:</p>
  <div class="formula">C = S·N(d₁) − K·e<sup>−rT</sup>·N(d₂)</div>
  <div class="formula">d₁ = [ln(S/K) + (r + σ²/2)T] / (σ√T) &nbsp;·&nbsp; d₂ = d₁ − σ√T</div>
  <p class="tip">📖 Lectura de la fórmula: N(d₂) es la <b>probabilidad riesgo-neutral de que la opción acabe dentro del dinero</b>; N(d₁) es el delta, y también la probabilidad bajo la medida que usa la acción como numerario.</p>`},

 {h:"Ejercicio 1 · Calcular d₁ y d₂",
  c:`<div class="ejer"><div class="ejer-enun">Con los datos del caso base, halla d₁ y d₂.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>ln(S/K) = ln(1) = 0, porque la opción está exactamente <i>at the money</i>.</li>
  <li>σ²/2 = 0,04/2 = 0,02. Así que r + σ²/2 = 0,05 + 0,02 = 0,07.</li>
  <li>Numerador: 0 + 0,07·1 = 0,07. Denominador: σ√T = 0,2·1 = 0,2.</li>
  <li>d₁ = 0,07/0,2 = 0,35.</li>
  <li>d₂ = 0,35 − 0,2 = 0,15.</li>
  </ol>
  <div class="resultado-ej">d₁ = 0,35 · d₂ = 0,15</div>
  <p class="tip">⚠️ Error clásico: poner r − σ²/2 en d₁. La corrección −σ²/2 aparece en <b>d₂</b> (o, equivalentemente, en el exponente de S<sub>T</sub>), no en d₁.</p>
  </details></div>`},

 {h:"Ejercicio 2 · Precio de la call",
  c:`<div class="ejer"><div class="ejer-enun">Calcula C con d₁ = 0,35 y d₂ = 0,15.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>De la tabla normal: N(0,35) = 0,6368 y N(0,15) = 0,5596.</li>
  <li>Primer término: 100 · 0,6368 = 63,68.</li>
  <li>Descuento: e<sup>−0,05</sup> = 0,9512.</li>
  <li>Segundo término: 100 · 0,9512 · 0,5596 = 53,23.</li>
  <li>C = 63,68 − 53,23.</li>
  </ol>
  <div class="resultado-ej">C ≈ 10,45</div>
  <p><b>Regla de bolsillo para una ATM:</b> C ≈ 0,4·S·σ·√T = 0,4·100·0,2 = 8. Se queda corta porque no cuenta el efecto del tipo de interés, pero da el orden de magnitud en dos segundos.</p>
  </details></div>`},

 {h:"Ejercicio 3 · La put por paridad",
  c:`<div class="ejer"><div class="ejer-enun">Halla el precio de la put con el mismo strike y vencimiento.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Paridad: C − P = S − K·e<sup>−rT</sup>.</li>
  <li>K·e<sup>−rT</sup> = 100·0,9512 = 95,12.</li>
  <li>P = C − S + 95,12 = 10,45 − 100 + 95,12.</li>
  </ol>
  <div class="resultado-ej">P ≈ 5,57</div>
  <p>La call vale más que la put estando las dos <i>at the money</i>: el tipo de interés inclina la balanza, porque comprar la call permite retrasar el pago del strike.</p>
  </details></div>`},

 {h:"Ejercicio 4 · Delta y cobertura",
  c:`<div class="ejer"><div class="ejer-enun">¿Cuál es el delta de la call? ¿Y qué haces si has vendido 100 contratos?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Δ<sub>call</sub> = N(d₁) = N(0,35) = <b>0,637</b>.</li>
  <li>Interpretación: si la acción sube 1 €, la opción sube unos 0,64 €.</li>
  <li>Si vendiste 100 contratos de 100 acciones = 10 000 opciones, tu delta es −6 370.</li>
  <li><b>Para quedar neutro compras 6 370 acciones.</b></li>
  <li>Δ<sub>put</sub> = N(d₁) − 1 = −0,363 (negativo: la put sube cuando la acción baja).</li>
  </ol>
  <div class="resultado-ej">Δ<sub>call</sub> = 0,637 · Δ<sub>put</sub> = −0,363 · comprar 6 370 acciones</div>
  <p class="tip">🔁 El delta cambia continuamente, así que la cobertura hay que rehacerla. Ese rebalanceo constante es la versión continua del ejercicio 7 del apunte binomial.</p>
  </details></div>`},

 {h:"Ejercicio 5 · Gamma",
  c:`<div class="ejer"><div class="ejer-enun">Calcula la gamma y explica por qué importa.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Γ = φ(d₁)/(S·σ·√T), donde φ es la <b>densidad</b> normal, no la acumulada.</li>
  <li>φ(0,35) = (1/√(2π))·e<sup>−0,35²/2</sup> = 0,3989·e<sup>−0,06125</sup> = 0,3989·0,9406 = 0,3752.</li>
  <li>Γ = 0,3752/(100·0,2·1) = 0,3752/20.</li>
  </ol>
  <div class="resultado-ej">Γ ≈ 0,0188 por euro de movimiento</div>
  <p><b>Qué significa:</b> si la acción sube 1 €, tu delta pasa de 0,637 a ≈ 0,656. Gamma alta = cobertura que se desajusta rápido = hay que rebalancear más a menudo. Es máxima <i>at the money</i> y cerca del vencimiento, que es justo cuando cubrir es más caro.</p>
  </details></div>`},

 {h:"Ejercicio 6 · Vega, theta y rho",
  c:`<div class="ejer"><div class="ejer-enun">Completa las griegas del caso base.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Vega</b> = S·φ(d₁)·√T = 100·0,3752·1 = 37,52 por unidad de volatilidad ⟹ <b>0,375 por cada punto porcentual</b>.</li>
  <li><b>Theta</b> = −S·φ(d₁)·σ/(2√T) − r·K·e<sup>−rT</sup>·N(d₂)<br>
      = −(100·0,3752·0,2/2) − (0,05·95,12·0,5596) = −3,75 − 2,66 = <b>−6,41 al año</b>, es decir unos −0,018 al día.</li>
  <li><b>Rho</b> = K·T·e<sup>−rT</sup>·N(d₂) = 100·1·0,9512·0,5596 = 53,2 por unidad de r ⟹ <b>0,53 por cada punto porcentual</b>.</li>
  </ol>
  <div class="resultado-ej">Vega 0,375/pp · Theta −6,41/año · Rho 0,53/pp</div>
  <p class="tip">⚖️ Theta y gamma van siempre en sentidos opuestos: si estás largo de opciones ganas convexidad (gamma positiva) pero pagas el paso del tiempo (theta negativa). <b>Comprar opciones es alquilar convexidad.</b></p>
  </details></div>`},

 {h:"Ejercicio 7 · Sensibilidad: qué pasa si…",
  c:`<div class="ejer"><div class="ejer-enun">Estima el nuevo precio de la call si la volatilidad sube del 20 % al 25 %, sin recalcular la fórmula.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Vega = 0,375 por punto porcentual. Suben 5 puntos.</li>
  <li>ΔC ≈ 0,375 · 5 = 1,88.</li>
  <li>C ≈ 10,45 + 1,88 = 12,33.</li>
  <li><b>Comprobación exacta:</b> con σ = 0,25 sale d₁ = (0,05+0,03125)/0,25 = 0,325, d₂ = 0,075, y C ≈ 12,34. El error de la aproximación lineal es de un céntimo.</li>
  </ol>
  <div class="resultado-ej">C(σ = 25 %) ≈ 12,33 (exacto 12,34)</div>
  <p>La aproximación por griegas funciona muy bien para cambios pequeños. Para saltos grandes hay que añadir el término de segundo orden (gamma para S, «volga» para σ).</p>
  </details></div>`},

 {h:"Ejercicio 8 · Volatilidad implícita",
  c:`<div class="ejer"><div class="ejer-enun">La call cotiza en el mercado a 12,34. ¿Cuál es la volatilidad implícita?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>La volatilidad implícita es el σ que, metido en Black–Scholes, <b>reproduce el precio de mercado</b>. No se despeja: la fórmula no es invertible analíticamente.</li>
  <li>Se resuelve numéricamente. Con Newton–Raphson: σ<sub>n+1</sub> = σ<sub>n</sub> − [C(σ<sub>n</sub>) − mercado]/Vega(σ<sub>n</sub>).</li>
  <li>Empieza en σ = 0,20: C = 10,45, error = −1,89, vega = 37,52 ⟹ σ₁ = 0,20 + 1,89/37,52 = 0,2504.</li>
  <li>Una sola iteración ya clava el resultado, porque C es casi lineal en σ y monótona creciente.</li>
  </ol>
  <div class="resultado-ej">σ<sub>implícita</sub> ≈ 25 %</div>
  <p class="tip">🧭 La volatilidad implícita es <b>la fórmula usada al revés</b>: se ha convertido en el idioma en que se cotizan las opciones. Y el hecho de que no salga igual para todos los strikes — la <i>sonrisa</i> de volatilidad — es la prueba empírica de que el modelo no es literalmente cierto.</p>
  </details></div>`},

 {h:"Ejercicio 9 · Deducir la EDP desde la cobertura",
  c:`<div class="ejer"><div class="ejer-enun">Reconstruye el argumento que lleva a la ecuación de Black–Scholes.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Supón dS = μS dt + σS dW y una opción con valor V(t, S).</li>
  <li><b>Lema de Itô:</b> dV = (V<sub>t</sub> + μS·V<sub>S</sub> + ½σ²S²·V<sub>SS</sub>)dt + σS·V<sub>S</sub>·dW.</li>
  <li><b>Monta la cartera</b> Π = V − Δ·S y elige Δ = V<sub>S</sub>.</li>
  <li>Con esa elección el término en dW <b>se cancela por completo</b>: dΠ = (V<sub>t</sub> + ½σ²S²V<sub>SS</sub>)dt. La cartera ya no tiene riesgo.</li>
  <li><b>No-arbitraje:</b> algo sin riesgo tiene que rentar r: dΠ = rΠ dt = r(V − S·V<sub>S</sub>)dt.</li>
  <li>Iguala las dos expresiones y ordena.</li>
  </ol>
  <div class="resultado-ej">V<sub>t</sub> + ½σ²S²V<sub>SS</sub> + rS·V<sub>S</sub> − rV = 0</div>
  <p><b>Lo más importante de todo:</b> μ ha desaparecido. El precio de la opción no depende de si esperas que la acción suba o baje, solo de su volatilidad. Por eso funciona la valoración riesgo-neutral.</p>
  </details></div>`}
]},

/* =================================================================
   3 · ITÔ Y MARTINGALAS RESUELTOS
   ================================================================= */
{id:"fi-ej-3", t:"Itô y martingalas · 10 ejercicios resueltos", emo:"🌊", min:17,
 res:"El lema de Itô aplicado paso a paso, variación cuadrática, comprobar si algo es martingala, Girsanov con números y la esperanza de un browniano geométrico.",
 secciones:[

 {h:"La regla operativa",
  c:`<p>Para f(t, X) con dX = a dt + b dW:</p>
  <div class="formula">df = (f<sub>t</sub> + a·f<sub>x</sub> + ½b²·f<sub>xx</sub>) dt + b·f<sub>x</sub> dW</div>
  <p>Es Taylor de segundo orden con una única regla nueva:</p>
  <div class="formula">(dW)² = dt · dW·dt = 0 · (dt)² = 0</div>
  <p class="tip">🧠 Todo el cálculo estocástico cabe en esa línea. El término ½b²f<sub>xx</sub> es <b>lo único</b> que no habría en el cálculo ordinario, y es el responsable de cada corrección extraña que verás.</p>`},

 {h:"Ejercicio 1 · d(W²)",
  c:`<div class="ejer"><div class="ejer-enun">Calcula d(W<sub>t</sub>²).</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>f(x) = x², con X = W ⟹ a = 0, b = 1.</li>
  <li>f<sub>x</sub> = 2x = 2W · f<sub>xx</sub> = 2 · f<sub>t</sub> = 0.</li>
  <li>df = (0 + 0 + ½·1·2)dt + 1·2W dW.</li>
  </ol>
  <div class="resultado-ej">d(W²) = 2W dW + dt</div>
  <p>El cálculo ordinario habría dado solo 2W dW. <b>Ese dt de más es Itô.</b> En forma integral: ∫₀<sup>T</sup>W dW = ½W<sub>T</sub>² − ½T, y no ½W<sub>T</sub>² como cabría esperar.</p>
  </details></div>`},

 {h:"Ejercicio 2 · W² − t es martingala",
  c:`<div class="ejer"><div class="ejer-enun">Demuestra que M<sub>t</sub> = W<sub>t</sub>² − t es una martingala.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Criterio rápido:</b> un proceso de Itô es martingala ⟺ su término en dt (la <i>deriva</i>) es cero.</li>
  <li>dM = d(W²) − dt = (2W dW + dt) − dt = 2W dW.</li>
  <li>Sin deriva ⟹ martingala.</li>
  <li><b>Comprobación directa:</b> E[W<sub>t</sub>²|ℱ<sub>s</sub>] = E[(W<sub>s</sub> + (W<sub>t</sub>−W<sub>s</sub>))²|ℱ<sub>s</sub>] = W<sub>s</sub>² + 0 + (t−s). Al restar t queda W<sub>s</sub>² − s ✓</li>
  </ol>
  <div class="resultado-ej">dM = 2W dW ⟹ M es martingala</div>
  <p class="tip">🔑 <b>«Sin deriva ⟺ martingala»</b> es el atajo que más se usa en todo Shreve. Memorízalo: convierte una pregunta de probabilidad en un cálculo mecánico.</p>
  </details></div>`},

 {h:"Ejercicio 3 · d(ln S), la clave del modelo",
  c:`<div class="ejer"><div class="ejer-enun">Con dS = μS dt + σS dW, calcula d(ln S) y resuelve la ecuación.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>f(x) = ln x ⟹ f<sub>x</sub> = 1/S, f<sub>xx</sub> = −1/S². Aquí a = μS y b = σS.</li>
  <li>Deriva: a·f<sub>x</sub> = μ · ½b²f<sub>xx</sub> = ½σ²S²·(−1/S²) = <b>−σ²/2</b>.</li>
  <li>Difusión: b·f<sub>x</sub> = σS·(1/S) = σ.</li>
  <li>d(ln S) = (μ − σ²/2)dt + σ dW. Ahora ya se integra directamente.</li>
  <li>ln S<sub>T</sub> = ln S₀ + (μ − σ²/2)T + σW<sub>T</sub>.</li>
  </ol>
  <div class="resultado-ej">S<sub>T</sub> = S₀·exp[(μ − σ²/2)T + σW<sub>T</sub>]</div>
  <p class="tip">💡 Es <b>lognormal</b>: nunca puede ser negativo, que es justo lo que se le pide al precio de una acción. Y el −σ²/2 explica que la mediana quede por debajo de la media.</p>
  </details></div>`},

 {h:"Ejercicio 4 · La media y la mediana no coinciden",
  c:`<div class="ejer"><div class="ejer-enun">Calcula E[S<sub>T</sub>] y compárala con la mediana. Datos: S₀ = 100, μ = 10 %, σ = 30 %, T = 1.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Necesitas E[e<sup>σW<sub>T</sub></sup>]. Como σW<sub>T</sub> ~ N(0, σ²T), la fórmula de la lognormal da E[e<sup>X</sup>] = e<sup>media + varianza/2</sup> = e<sup>σ²T/2</sup>.</li>
  <li>E[S<sub>T</sub>] = S₀e<sup>(μ−σ²/2)T</sup>·e<sup>σ²T/2</sup> = <b>S₀e<sup>μT</sup></b>: los dos σ²/2 se cancelan.</li>
  <li>Numéricamente: 100·e<sup>0,10</sup> = 110,52.</li>
  <li><b>Mediana:</b> es donde W<sub>T</sub> = 0, o sea S₀e<sup>(μ−σ²/2)T</sup> = 100·e<sup>0,10−0,045</sup> = 100·e<sup>0,055</sup> = 105,65.</li>
  </ol>
  <div class="resultado-ej">E[S<sub>T</sub>] = 110,52 · mediana = 105,65</div>
  <p>La media está por encima de la mediana porque la distribución tiene <b>cola derecha larga</b>: unos pocos escenarios muy buenos tiran de la media hacia arriba. Confundir las dos es un error caro en la práctica.</p>
  </details></div>`},

 {h:"Ejercicio 5 · Variación cuadrática",
  c:`<div class="ejer"><div class="ejer-enun">¿Cuánto vale [W, W](T)? ¿Y qué implica?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Parte [0,T] en n trozos y suma los cuadrados de los incrementos: Σ(ΔW<sub>i</sub>)².</li>
  <li>Cada incremento tiene media 0 y varianza Δt, así que E[(ΔW)²] = Δt.</li>
  <li>La suma de las esperanzas es n·(T/n) = T, y la varianza de la suma tiende a 0.</li>
  </ol>
  <div class="resultado-ej">[W, W](T) = T, con probabilidad 1</div>
  <p><b>Consecuencia brutal:</b> para una función derivable normal, esa suma tendería a cero. Que aquí dé T significa que el browniano <b>no es derivable en ningún punto</b>. Por eso hizo falta inventar una integral nueva, y por eso (dW)² = dt.</p>
  </details></div>`},

 {h:"Ejercicio 6 · Producto de dos procesos",
  c:`<div class="ejer"><div class="ejer-enun">Calcula d(S²) con dS = μS dt + σS dW.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>f(x) = x² ⟹ f<sub>x</sub> = 2S, f<sub>xx</sub> = 2.</li>
  <li>Deriva: 2S·μS + ½·σ²S²·2 = 2μS² + σ²S².</li>
  <li>Difusión: σS·2S = 2σS².</li>
  </ol>
  <div class="resultado-ej">d(S²) = (2μ + σ²)S²dt + 2σS²dW</div>
  <p>De aquí se lee que E[S<sub>T</sub>²] = S₀²e<sup>(2μ+σ²)T</sup>, y combinándolo con E[S<sub>T</sub>] = S₀e<sup>μT</sup> sale la varianza: Var = S₀²e<sup>2μT</sup>(e<sup>σ²T</sup> − 1).</p>
  </details></div>`},

 {h:"Ejercicio 7 · Vasicek: la media revierte",
  c:`<div class="ejer"><div class="ejer-enun">Con dr = a(b − r)dt + σ dW, calcula E[r<sub>t</sub>]. Datos: a = 0,5, b = 4 %, r₀ = 6 %, t = 2.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Toma esperanzas en la ecuación: el término en dW desaparece (la integral de Itô es martingala).</li>
  <li>Queda una EDO ordinaria: m′(t) = a(b − m(t)), con m(0) = r₀.</li>
  <li>Es lineal: cambio u = m − b ⟹ u′ = −a·u ⟹ u = u₀e<sup>−at</sup>.</li>
  <li>m(t) = b + (r₀ − b)e<sup>−at</sup>.</li>
  <li>Numéricamente: 0,04 + 0,02·e<sup>−1</sup> = 0,04 + 0,02·0,3679 = 0,0474.</li>
  </ol>
  <div class="resultado-ej">E[r₂] = 4,74 %, tendiendo a b = 4 % a largo plazo</div>
  <p class="tip">⚠️ El problema conocido de Vasicek: al ser gaussiano, <b>permite tipos negativos</b>. Durante décadas se consideró un defecto fatal… hasta que en 2014 los tipos se volvieron negativos de verdad.</p>
  </details></div>`},

 {h:"Ejercicio 8 · Girsanov con números",
  c:`<div class="ejer"><div class="ejer-enun">Con μ = 10 %, r = 4 % y σ = 25 %, halla el precio de mercado del riesgo y el drift bajo la medida riesgo-neutral.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Precio de mercado del riesgo:</b> θ = (μ − r)/σ = (0,10 − 0,04)/0,25 = <b>0,24</b>. Es el exceso de rentabilidad por unidad de riesgo — el ratio de Sharpe del activo.</li>
  <li><b>Girsanov:</b> define W̃<sub>t</sub> = W<sub>t</sub> + θt. Bajo la nueva medida Q, W̃ es un browniano estándar.</li>
  <li>Sustituye dW = dW̃ − θdt en la dinámica: dS = μS dt + σS(dW̃ − θdt) = (μ − σθ)S dt + σS dW̃.</li>
  <li>μ − σθ = 0,10 − 0,25·0,24 = 0,10 − 0,06 = 0,04 = <b>r</b>.</li>
  </ol>
  <div class="resultado-ej">θ = 0,24 y bajo Q: dS = rS dt + σS dW̃</div>
  <p class="tip">🔑 Girsanov <b>cambia la deriva pero no la volatilidad</b>. Por eso el precio de una opción depende de σ y no de μ: el cambio de medida se lleva μ por delante, pero σ sobrevive intacta.</p>
  </details></div>`},

 {h:"Ejercicio 9 · Comprobar si es martingala",
  c:`<div class="ejer"><div class="ejer-enun">¿Es M<sub>t</sub> = exp(σW<sub>t</sub> − σ²t/2) una martingala?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Aplica Itô a f(t, W) = e<sup>σW − σ²t/2</sup>.</li>
  <li>f<sub>t</sub> = −(σ²/2)·f · f<sub>w</sub> = σ·f · f<sub>ww</sub> = σ²·f.</li>
  <li>Deriva total: f<sub>t</sub> + ½·1·f<sub>ww</sub> = −(σ²/2)f + (σ²/2)f = <b>0</b>.</li>
  <li>dM = σM dW: sin deriva.</li>
  </ol>
  <div class="resultado-ej">Sí: es la martingala exponencial, con E[M<sub>t</sub>] = 1 para todo t</div>
  <p>Este proceso <b>es</b> la derivada de Radon–Nikodym de Girsanov. Que sea martingala con esperanza 1 es exactamente lo que la convierte en un cambio de medida legítimo.</p>
  </details></div>`},

 {h:"Ejercicio 10 · Integral de Itô simple",
  c:`<div class="ejer"><div class="ejer-enun">Calcula E[∫₀<sup>T</sup> W<sub>t</sub> dW<sub>t</sub>] y Var[∫₀<sup>T</sup> W<sub>t</sub> dW<sub>t</sub>].</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>Del ejercicio 1: ∫₀<sup>T</sup>W dW = ½(W<sub>T</sub>² − T).</li>
  <li><b>Esperanza:</b> E[W<sub>T</sub>²] = T ⟹ E = ½(T − T) = 0. Como debía ser: toda integral de Itô tiene media cero.</li>
  <li><b>Varianza por isometría de Itô:</b> Var[∫ f dW] = ∫E[f²]dt = ∫₀<sup>T</sup>E[W<sub>t</sub>²]dt = ∫₀<sup>T</sup>t dt = T²/2.</li>
  </ol>
  <div class="resultado-ej">Media = 0 · Varianza = T²/2</div>
  <p class="tip">📐 La <b>isometría de Itô</b> convierte una varianza estocástica en una integral ordinaria. Es la herramienta de cálculo más útil después del propio lema.</p>
  </details></div>`}
]},

/* =================================================================
   4 · AMPLIACIÓN · LOS DOS TEOREMAS Y EL MARCO GENERAL
   ================================================================= */
{id:"fi-ap-8", t:"El marco completo: los dos teoremas fundamentales", emo:"🏛️", min:12,
 res:"Qué se está haciendo realmente al valorar: filtraciones, medidas equivalentes, completitud y por qué todo el edificio se sostiene en el no-arbitraje.",
 secciones:[

 {h:"El vocabulario, en orden",
  c:`<table class="tabla">
  <tr><th>Objeto</th><th>Qué es</th><th>Para qué sirve</th></tr>
  <tr><td>Ω</td><td>todos los escenarios posibles</td><td>el «mundo»</td></tr>
  <tr><td>ℱ<sub>t</sub></td><td>filtración: lo que se sabe en t</td><td>formaliza la información</td></tr>
  <tr><td>ℙ</td><td>medida real (física)</td><td>lo que pasa de verdad</td></tr>
  <tr><td>ℚ</td><td>medida riesgo-neutral</td><td>lo que sirve para poner precio</td></tr>
  <tr><td>adaptado</td><td>proceso que solo usa información pasada</td><td>prohíbe hacer trampas</td></tr>
  <tr><td>martingala</td><td>E[X<sub>t</sub>|ℱ<sub>s</sub>] = X<sub>s</sub></td><td>«juego justo»</td></tr>
  </table>
  <p><b>Equivalente</b> (ℚ ~ ℙ) significa que las dos medidas coinciden en qué es imposible. Cambian las probabilidades, no el conjunto de escenarios. Es la condición mínima para que el cambio de medida no invente ni destruya mundos.</p>`},

 {h:"Primer teorema fundamental",
  c:`<div class="formula">No hay arbitraje ⟺ existe al menos una medida ℚ ~ ℙ bajo la cual los precios descontados son martingalas</div>
  <p>En el binomial de un periodo, esa ℚ es el par (p̃, 1−p̃). En Black–Scholes, es la medida que Girsanov construye. En los dos casos, la existencia de ℚ <b>es</b> la ausencia de arbitraje: no son dos hechos que casualmente coinciden.</p>
  <p>La consecuencia práctica es la fórmula que se usa siempre:</p>
  <div class="formula">V<sub>t</sub> = E<sup>ℚ</sup>[ e<sup>−r(T−t)</sup>·V<sub>T</sub> | ℱ<sub>t</sub> ]</div>
  <p class="tip">📌 Lee la fórmula con cuidado: la esperanza es <b>bajo ℚ</b> y el descuento es a la tasa <b>sin riesgo</b>. Mezclar la esperanza real con el descuento sin riesgo es el error conceptual más frecuente.</p>`},

 {h:"Segundo teorema fundamental",
  c:`<div class="formula">El mercado es completo ⟺ la medida ℚ es única</div>
  <p><b>Completo</b> quiere decir que <i>todo</i> pago se puede replicar con una cartera. Y si se puede replicar, su precio está determinado sin ambigüedad.</p>
  <ul>
  <li><b>Binomial de un periodo con 2 estados y 2 activos:</b> completo. p̃ es única.</li>
  <li><b>Trinomial con 3 estados y 2 activos:</b> incompleto. Hay infinitas ℚ, e infinitos precios compatibles con la ausencia de arbitraje — solo se obtiene una banda.</li>
  <li><b>Black–Scholes:</b> completo, gracias al teorema de representación de martingalas.</li>
  <li><b>Modelos con saltos o volatilidad estocástica:</b> incompletos. Hay que elegir ℚ con un criterio extra, normalmente calibrando contra precios de mercado.</li>
  </ul>
  <p class="tip">🧭 Regla mental: <b>número de fuentes de aleatoriedad ≤ número de activos negociables independientes</b> ⟹ completo. Añadir una fuente de ruido sin añadir un instrumento rompe la completitud.</p>`},

 {h:"Representación de martingalas",
  c:`<p>Es la pieza técnica que hace que Black–Scholes funcione: si M es una martingala respecto de la filtración de un browniano, entonces existe un proceso Γ tal que</p>
  <div class="formula">M<sub>t</sub> = M₀ + ∫₀<sup>t</sup> Γ<sub>s</sub> dW<sub>s</sub></div>
  <p>Traducido: <b>toda martingala se puede escribir como el resultado de una estrategia de inversión</b>. Ese Γ es, salvo constantes, el delta de cobertura. Sin este teorema sabríamos que el precio existe, pero no que se puede replicar.</p>`},

 {h:"Numerario: el precio siempre es relativo",
  c:`<p>Un <b>numerario</b> es cualquier activo con precio positivo que se usa como unidad de cuenta. Con la cuenta bancaria B<sub>t</sub> = e<sup>rt</sup> se obtiene la medida riesgo-neutral, pero se puede elegir otro:</p>
  <table class="tabla">
  <tr><th>Numerario</th><th>Medida</th><th>Dónde se usa</th></tr>
  <tr><td>cuenta bancaria B<sub>t</sub></td><td>riesgo-neutral ℚ</td><td>caso estándar</td></tr>
  <tr><td>bono cupón cero P(t,T)</td><td>forward ℚ<sup>T</sup></td><td>tipos de interés, opciones sobre bonos</td></tr>
  <tr><td>la propia acción S<sub>t</sub></td><td>medida acción</td><td>simplifica el término S·N(d₁)</td></tr>
  </table>
  <p><b>El teorema de cambio de numerario</b> dice que el precio es el mismo se elija el que se elija. Es una herramienta de conveniencia: se escoge el numerario que hace desaparecer los términos molestos. En modelos de tipos, usar el bono como numerario elimina el descuento estocástico de dentro de la esperanza — y eso es lo que hace tratable el mercado de tipos.</p>`},

 {h:"Feynman–Kac: el puente entre esperanza y EDP",
  c:`<p>Une los dos lenguajes de todo el curso. Si</p>
  <div class="formula">dX = a(t,X)dt + b(t,X)dW &nbsp;·&nbsp; V(t,x) = E[ e<sup>−r(T−t)</sup>h(X<sub>T</sub>) | X<sub>t</sub> = x ]</div>
  <p>entonces V resuelve</p>
  <div class="formula">V<sub>t</sub> + a·V<sub>x</sub> + ½b²·V<sub>xx</sub> − rV = 0, con V(T,x) = h(x)</div>
  <p>Con a = rS y b = σS sale exactamente la EDP de Black–Scholes. Y al revés: se puede resolver la EDP <b>simulando</b> trayectorias y promediando, que es la base de todo Montecarlo.</p>
  <p class="tip">🔁 Dos caminos, un precio: <b>esperanza</b> (probabilidad, Montecarlo) o <b>EDP</b> (análisis, diferencias finitas). Feynman–Kac garantiza que dan lo mismo, y te deja elegir el que sea más fácil de calcular en cada caso.</p>`}
]},

/* =================================================================
   5 · AMPLIACIÓN · TIPOS, BONOS Y EXÓTICAS
   ================================================================= */
{id:"fi-ap-9", t:"Tipos de interés y exóticas · con ejercicios", emo:"🏦", min:13,
 res:"Curva, bonos cupón cero, tipos forward, los modelos clásicos de tipos y cómo se valoran las opciones que dependen del camino.",
 secciones:[

 {h:"Lo básico de la curva",
  c:`<p>El <b>bono cupón cero</b> P(t,T) es el precio hoy de recibir 1 € en T. Con tipo constante r vale e<sup>−r(T−t)</sup>. Con tipos estocásticos:</p>
  <div class="formula">P(t,T) = E<sup>ℚ</sup>[ exp(−∫<sub>t</sub><sup>T</sup> r<sub>s</sub> ds) | ℱ<sub>t</sub> ]</div>
  <p>Fíjate en que <b>el descuento está dentro de la esperanza</b>: r ya no se puede sacar fuera. Ese es todo el problema técnico del mercado de tipos.</p>
  <p>De P se derivan las demás magnitudes:</p>
  <ul>
  <li><b>Tipo spot:</b> R(t,T) = −ln P(t,T)/(T−t).</li>
  <li><b>Tipo forward:</b> el tipo pactado hoy para prestar entre T₁ y T₂.</li>
  <li><b>Tipo instantáneo forward:</b> f(t,T) = −∂ln P(t,T)/∂T.</li>
  </ul>`},

 {h:"Ejercicio 1 · Del bono al tipo forward",
  c:`<div class="ejer"><div class="ejer-enun">P(0,1) = 0,97 y P(0,2) = 0,93. Halla el tipo forward simple entre el año 1 y el 2.</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li><b>Argumento de no-arbitraje:</b> invertir a 2 años debe dar lo mismo que invertir a 1 año y reinvertir al forward.</li>
  <li>1/P(0,2) = [1/P(0,1)]·(1 + f).</li>
  <li>1 + f = P(0,1)/P(0,2) = 0,97/0,93 = 1,04301.</li>
  </ol>
  <div class="resultado-ej">f = 4,30 %</div>
  <p>Los tipos spot correspondientes: R(0,1) = −ln0,97 = 3,05 % y R(0,2) = −ln(0,93)/2 = 3,63 %. La curva sube, y por eso el forward (4,30 %) queda por encima de los dos.</p>
  </details></div>`},

 {h:"Ejercicio 2 · Bono en Vasicek",
  c:`<div class="ejer"><div class="ejer-enun">¿Por qué en Vasicek el precio del bono tiene forma cerrada?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>dr = a(b−r)dt + σdW es un proceso <b>gaussiano</b>: r<sub>t</sub> es normal en todo instante.</li>
  <li>La integral ∫r<sub>s</sub>ds es una suma (límite) de normales, luego también es normal.</li>
  <li>Y la esperanza de la exponencial de una normal se conoce: E[e<sup>X</sup>] = e<sup>μ + σ²/2</sup>.</li>
  <li>De ahí sale la forma <b>afín</b>: P(t,T) = A(t,T)·e<sup>−B(t,T)·r<sub>t</sub></sup>, con B(t,T) = (1 − e<sup>−a(T−t)</sup>)/a.</li>
  </ol>
  <div class="resultado-ej">P(t,T) = A(t,T)·exp[−B(t,T)·r<sub>t</sub>]</div>
  <p class="tip">📌 Los <b>modelos afines</b> (Vasicek, CIR, Hull–White) son justamente los que admiten esta forma. Es lo que los hace utilizables: sin fórmula cerrada habría que simular para cada punto de la curva.</p>
  </details></div>`},

 {h:"Los modelos de tipos, comparados",
  c:`<table class="tabla">
  <tr><th>Modelo</th><th>Dinámica</th><th>Ventaja</th><th>Problema</th></tr>
  <tr><td>Vasicek</td><td>a(b−r)dt + σdW</td><td>fórmula cerrada, reversión a la media</td><td>permite r &lt; 0</td></tr>
  <tr><td>CIR</td><td>a(b−r)dt + σ√r dW</td><td>r ≥ 0 garantizado si 2ab ≥ σ²</td><td>matemáticamente más pesado</td></tr>
  <tr><td>Hull–White</td><td>a(b(t)−r)dt + σdW</td><td>encaja la curva actual exactamente</td><td>hay que recalibrar b(t)</td></tr>
  <tr><td>HJM</td><td>modela toda la curva forward</td><td>marco general</td><td>la deriva queda determinada por la volatilidad</td></tr>
  </table>
  <p>El resultado central de <b>HJM</b> es que, una vez eliges la volatilidad de la curva forward, la deriva ya no es libre: viene forzada por el no-arbitraje. No se pueden elegir las dos.</p>`},

 {h:"Ejercicio 3 · Una opción asiática",
  c:`<div class="ejer"><div class="ejer-enun">¿Por qué una call asiática vale menos que una europea con el mismo strike?</div>
  <details><summary>Ver el proceso</summary>
  <ol class="pasos-res">
  <li>El pago es (media(S) − K)⁺ en vez de (S<sub>T</sub> − K)⁺.</li>
  <li>Promediar <b>reduce la varianza</b>: la media de la trayectoria oscila mucho menos que el valor final.</li>
  <li>El valor de una opción crece con la volatilidad del subyacente de referencia.</li>
  <li>Menos volatilidad efectiva ⟹ menos valor.</li>
  </ol>
  <div class="resultado-ej">Asiática &lt; europea, y además es mucho más difícil de manipular al vencimiento</div>
  <p>No tiene fórmula cerrada exacta (la media de lognormales no es lognormal), así que se valora por Montecarlo o con aproximaciones analíticas.</p>
  </details></div>`},

 {h:"Exóticas: el mapa",
  c:`<table class="tabla">
  <tr><th>Tipo</th><th>Pago</th><th>Depende del camino</th><th>Cómo se valora</th></tr>
  <tr><td>Europea</td><td>(S<sub>T</sub> − K)⁺</td><td>no</td><td>fórmula cerrada</td></tr>
  <tr><td>Americana</td><td>ejercicio en cualquier momento</td><td>no, pero hay decisión</td><td>árbol / diferencias finitas</td></tr>
  <tr><td>Asiática</td><td>(media − K)⁺</td><td>sí</td><td>Montecarlo</td></tr>
  <tr><td>Barrera</td><td>se activa o cancela al tocar B</td><td>sí</td><td>fórmula cerrada (principio de reflexión) o Montecarlo</td></tr>
  <tr><td>Lookback</td><td>usa el máximo o el mínimo</td><td>sí</td><td>Montecarlo</td></tr>
  <tr><td>Digital</td><td>paga 1 si S<sub>T</sub> &gt; K</td><td>no</td><td>e<sup>−rT</sup>N(d₂)</td></tr>
  </table>
  <p class="tip">💡 La digital es la más instructiva: su precio es <b>exactamente</b> e<sup>−rT</sup>N(d₂), lo que confirma que N(d₂) es la probabilidad riesgo-neutral de acabar dentro del dinero. También es la que peor se cubre: cerca del strike y del vencimiento su delta se dispara.</p>`},

 {h:"Cuando el modelo se rompe: saltos y sonrisa",
  c:`<p>Black–Scholes supone trayectorias continuas y σ constante. El mercado dice otra cosa:</p>
  <ul>
  <li><b>La sonrisa de volatilidad:</b> la implícita no es plana en el strike. Los puts fuera del dinero cotizan más caros de lo que dice el modelo — el mercado paga por protegerse de las caídas.</li>
  <li><b>Colas gruesas:</b> los movimientos extremos son mucho más frecuentes de lo que predice una normal.</li>
  <li><b>Saltos (Merton):</b> añadir un proceso de Poisson reproduce las colas, pero <b>rompe la completitud</b>: el riesgo de salto no se puede cubrir con la acción.</li>
  <li><b>Volatilidad estocástica (Heston):</b> σ pasa a ser un proceso propio, con reversión a la media, y genera la sonrisa de forma natural. También incompleto: hace falta un segundo instrumento para cubrir la vega.</li>
  </ul>
  <p class="tip">🧭 Lección de fondo: el modelo no es la realidad, es un <b>lenguaje</b>. La volatilidad implícita es el precio traducido a ese lenguaje, y la sonrisa es la parte de la realidad que el lenguaje no sabe decir.</p>`}
]}

);
