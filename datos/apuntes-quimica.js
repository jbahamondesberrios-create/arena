/* ============================================================
   APUNTES · QUÍMICA — modo estudio (sin preguntas)
   ============================================================ */

window.APUNTES = window.APUNTES || {};

window.APUNTES.quimica = [

/* ================================================================= */
{id:"qu-ap-1", t:"Cómo leer la tabla periódica", emo:"🗺️", min:9,
 res:"Qué significa cada casilla, por qué la tabla tiene esa forma tan rara y qué se puede predecir con solo mirar dónde está un elemento.",
 secciones:[

 {h:"Qué hay en una casilla",
  c:`<p>Cada casilla trae tres datos y los tres significan cosas distintas:</p>
  <table class="tabla">
  <tr><th>Dato</th><th>Qué es</th><th>Ejemplo (carbono)</th></tr>
  <tr><td><b>Número atómico Z</b></td><td>protones del núcleo. Define <i>qué elemento es</i>.</td><td>6</td></tr>
  <tr><td><b>Símbolo</b></td><td>una o dos letras; la primera siempre mayúscula</td><td>C</td></tr>
  <tr><td><b>Masa atómica</b></td><td>media ponderada de los isótopos, en unidades u</td><td>12,011</td></tr>
  </table>
  <p>Si el átomo es <b>neutro</b>, tiene tantos electrones como protones. Los neutrones no aparecen: varían de un isótopo a otro, y por eso la masa no es un entero.</p>
  <p class="tip">💡 La masa se puede leer también como <b>gramos por mol</b>: 12,011 g de carbono contienen 6,022×10²³ átomos. Es el puente entre el mundo atómico y la balanza del laboratorio.</p>`},

 {h:"Por qué la tabla tiene esa forma",
  c:`<p>La forma no es decorativa: <b>es el orden de llenado de los orbitales</b>.</p>
  <ul>
  <li><b>Grupos 1–2</b> (2 columnas) → se llena el orbital <b>s</b>, que admite 2 electrones.</li>
  <li><b>Grupos 13–18</b> (6 columnas) → orbital <b>p</b>, 6 electrones.</li>
  <li><b>Grupos 3–12</b> (10 columnas) → orbital <b>d</b>, 10 electrones.</li>
  <li><b>Las dos filas de abajo</b> (14 columnas) → orbital <b>f</b>, 14 electrones.</li>
  </ul>
  <p>Las anchuras de los bloques son 2, 6, 10 y 14, que son exactamente las capacidades de s, p, d y f. La tabla es un mapa de la mecánica cuántica dibujado sin querer: Mendeléiev la construyó en 1869, cincuenta años antes de que existiera la teoría que la explica.</p>
  <p>Lantánidos y actínidos se dibujan aparte solo por espacio. En la tabla «larga» de 32 columnas van insertados entre los grupos 2 y 3.</p>`},

 {h:"El orden de llenado",
  c:`<div class="formula">1s · 2s · 2p · 3s · 3p · <b>4s</b> · 3d · 4p · <b>5s</b> · 4d · 5p · 6s · 4f · 5d · 6p · 7s · 5f · 6d · 7p</div>
  <p>Lo llamativo es que el <b>4s se llena antes que el 3d</b>. No es un error: la energía de un orbital depende de n + ℓ, no solo de n. Regla de Madelung: <b>gana el menor n+ℓ, y en caso de empate, el menor n</b>.</p>
  <p>Ejemplos que hay que saber escribir:</p>
  <table class="tabla">
  <tr><th>Elemento</th><th>Configuración</th><th>Comentario</th></tr>
  <tr><td>Na (11)</td><td>[Ne]3s¹</td><td>un electrón suelto: por eso reacciona tanto</td></tr>
  <tr><td>Fe (26)</td><td>[Ar]3d⁶4s²</td><td>el 4s se llenó antes pero se escribe después</td></tr>
  <tr><td>Cr (24)</td><td>[Ar]3d⁵4s¹</td><td><b>excepción:</b> d semillena es más estable</td></tr>
  <tr><td>Cu (29)</td><td>[Ar]3d¹⁰4s¹</td><td><b>excepción:</b> d llena es más estable</td></tr>
  </table>
  <p class="tip">⚠️ Cr y Cu son las dos excepciones que caen siempre. Y hay un detalle contraintuitivo: al ionizarse, los metales de transición <b>pierden primero los electrones 4s</b>, aunque fueran los últimos en llenarse.</p>`},

 {h:"Las cuatro tendencias periódicas",
  c:`<table class="tabla">
  <tr><th>Propiedad</th><th>→ hacia la derecha</th><th>↓ hacia abajo</th><th>Por qué</th></tr>
  <tr><td>Radio atómico</td><td>disminuye</td><td>aumenta</td><td>más protones tiran de la misma capa / se añaden capas</td></tr>
  <tr><td>Energía de ionización</td><td>aumenta</td><td>disminuye</td><td>cuesta más arrancar un electrón bien sujeto</td></tr>
  <tr><td>Electronegatividad</td><td>aumenta</td><td>disminuye</td><td>misma lógica; máximo en el flúor</td></tr>
  <tr><td>Carácter metálico</td><td>disminuye</td><td>aumenta</td><td>metálico = tendencia a ceder electrones</td></tr>
  </table>
  <p>Las tres primeras van juntas y apuntan a la <b>esquina superior derecha</b> (el flúor). La cuarta es su espejo y apunta a la <b>esquina inferior izquierda</b> (el francio).</p>
  <p class="tip">🧭 Si solo puedes recordar una cosa: <b>todo apunta al flúor</b>. Radio pequeño, ionización alta, electronegatividad máxima. El resto se deduce.</p>`},

 {h:"Las familias que hay que reconocer",
  c:`<ul>
  <li><b>Grupo 1 · Alcalinos</b> (menos el H): ns¹. Blandos, ligeros, reaccionan violentamente con el agua. Forman iones +1.</li>
  <li><b>Grupo 2 · Alcalinotérreos</b>: ns². Iones +2. Calcio y magnesio son biológicamente esenciales.</li>
  <li><b>Grupos 3–12 · Transición</b>: varios estados de oxidación, compuestos coloreados, buenos catalizadores.</li>
  <li><b>Grupo 16 · Calcógenos</b>: forman iones 2⁻. El oxígeno manda.</li>
  <li><b>Grupo 17 · Halógenos</b>: ns²np⁵, les falta uno para el octeto. Los más reactivos de todos los no metales.</li>
  <li><b>Grupo 18 · Gases nobles</b>: capa completa, prácticamente inertes.</li>
  <li><b>Metaloides</b> (B, Si, Ge, As, Sb, Te): la escalera diagonal entre metales y no metales. Semiconductores.</li>
  </ul>
  <p><b>El hidrógeno es el rebelde:</b> se dibuja en el grupo 1 por tener 1s¹, pero es un no metal gaseoso y no se parece en nada al sodio.</p>`},

 {h:"Qué se puede predecir con solo mirar la posición",
  c:`<p>Dado un elemento y su casilla, sin consultar nada más:</p>
  <ol>
  <li><b>Cuántas capas tiene:</b> el número de periodo.</li>
  <li><b>Cuántos electrones de valencia:</b> el número de grupo (para los grupos principales; en 13–18, el grupo menos 10).</li>
  <li><b>Qué ion formará:</b> los de la izquierda ceden (+1, +2, +3); los de la derecha captan (−3, −2, −1).</li>
  <li><b>Si es metal:</b> a la izquierda de la escalera de metaloides.</li>
  <li><b>Con quién reaccionará:</b> los extremos opuestos se atraen. Grupo 1 + grupo 17 = sal iónica perfecta.</li>
  </ol>
  <p class="tip">🧪 Ejemplo completo. Selenio (Z = 34), periodo 4, grupo 16: cuatro capas, seis electrones de valencia, formará Se²⁻, es un no metal y reaccionará bien con los metales alcalinos. Todo eso sin memorizar nada del selenio.</p>`}
]},

/* ================================================================= */
{id:"qu-ap-2", t:"Átomos, enlaces y moles", emo:"🔗", min:9,
 res:"Lo que hay debajo de la tabla: estructura del átomo, los tres tipos de enlace, cómo se cuentan las partículas y cómo se ajusta una reacción.",
 secciones:[

 {h:"El átomo en tres piezas",
  c:`<table class="tabla">
  <tr><th>Partícula</th><th>Carga</th><th>Masa (u)</th><th>Dónde está</th></tr>
  <tr><td>Protón</td><td>+1</td><td>≈ 1</td><td>núcleo</td></tr>
  <tr><td>Neutrón</td><td>0</td><td>≈ 1</td><td>núcleo</td></tr>
  <tr><td>Electrón</td><td>−1</td><td>1/1836</td><td>orbitales</td></tr>
  </table>
  <p>Casi toda la masa está en el núcleo, y casi todo el volumen es vacío: si el núcleo fuera una canica en el centro de un estadio, los electrones andarían por las gradas.</p>
  <div class="formula">Z = protones · A = protones + neutrones · neutrones = A − Z</div>
  <p><b>Isótopos:</b> mismo Z, distinto A. Carbono-12 y carbono-14 son los dos carbono; el segundo es radiactivo y por eso sirve para datar.</p>
  <p><b>Iones:</b> el número de electrones ha cambiado. Catión = perdió electrones (positivo, más pequeño). Anión = ganó (negativo, más grande).</p>`},

 {h:"Los números cuánticos",
  c:`<table class="tabla">
  <tr><th>Número</th><th>Qué indica</th><th>Valores</th></tr>
  <tr><td>n (principal)</td><td>nivel de energía, tamaño</td><td>1, 2, 3…</td></tr>
  <tr><td>ℓ (azimutal)</td><td>forma del orbital</td><td>0 = s, 1 = p, 2 = d, 3 = f</td></tr>
  <tr><td>m<sub>ℓ</sub> (magnético)</td><td>orientación en el espacio</td><td>de −ℓ a +ℓ</td></tr>
  <tr><td>m<sub>s</sub> (espín)</td><td>giro del electrón</td><td>+½ o −½</td></tr>
  </table>
  <p>Las tres reglas que gobiernan el llenado:</p>
  <ul>
  <li><b>Aufbau:</b> se llenan primero los de menor energía.</li>
  <li><b>Pauli:</b> dos electrones no pueden compartir los cuatro números ⟹ máximo 2 por orbital, con espines opuestos.</li>
  <li><b>Hund:</b> en orbitales de la misma energía, primero uno en cada uno y solo después se aparean.</li>
  </ul>`},

 {h:"Los tres enlaces",
  c:`<table class="tabla">
  <tr><th>Enlace</th><th>Entre</th><th>Qué pasa</th><th>Propiedades típicas</th></tr>
  <tr><td><b>Iónico</b></td><td>metal + no metal</td><td>se transfieren electrones</td><td>sólidos duros, alto punto de fusión, conducen disueltos</td></tr>
  <tr><td><b>Covalente</b></td><td>no metal + no metal</td><td>se comparten electrones</td><td>moléculas, puntos de fusión bajos, no conducen</td></tr>
  <tr><td><b>Metálico</b></td><td>metal + metal</td><td>mar de electrones deslocalizados</td><td>conducen, son dúctiles y maleables</td></tr>
  </table>
  <p><b>El criterio práctico</b> es la diferencia de electronegatividad (ΔEN):</p>
  <ul>
  <li>ΔEN &gt; 1,7 → predominantemente iónico (NaCl: 3,0 − 0,9 = 2,1).</li>
  <li>0,4 &lt; ΔEN &lt; 1,7 → covalente polar (H₂O: 3,5 − 2,1 = 1,4).</li>
  <li>ΔEN &lt; 0,4 → covalente apolar (Cl₂: diferencia 0).</li>
  </ul>
  <p class="tip">💧 El agua es polar por dos motivos a la vez: enlaces O–H polares <b>y</b> geometría angular. Si fuera lineal, los dipolos se cancelarían y no habría vida tal como la conocemos.</p>`},

 {h:"El mol: contar lo que no se puede contar",
  c:`<div class="formula">1 mol = 6,022 × 10²³ partículas (número de Avogadro)</div>
  <p>La gracia del mol es esta: <b>la masa de un mol, en gramos, coincide con la masa atómica de la tabla</b>. Un mol de carbono pesa 12,011 g; un mol de hierro, 55,845 g.</p>
  <p>Las tres conversiones que resuelven casi todos los problemas:</p>
  <div class="formula">n = masa / M &nbsp;·&nbsp; N = n · N<sub>A</sub> &nbsp;·&nbsp; c = n / V</div>
  <p><b>Ejemplo:</b> ¿cuántas moléculas hay en 36 g de agua? M(H₂O) = 2·1,008 + 15,999 = 18,015 g/mol. n = 36/18,015 = 2 mol. N = 2 · 6,022×10²³ = 1,2×10²⁴ moléculas.</p>`},

 {h:"Ajustar reacciones",
  c:`<p>Una ecuación química ajustada respeta la <b>conservación de la masa</b>: el mismo número de átomos de cada elemento a los dos lados.</p>
  <div class="formula">2 H₂ + O₂ → 2 H₂O</div>
  <p>El método que funciona siempre:</p>
  <ol>
  <li>Ajusta primero los elementos que aparecen en <b>una sola</b> especie a cada lado.</li>
  <li>Deja para el final el oxígeno y el hidrógeno, que suelen aparecer en varios sitios.</li>
  <li>Si te salen fracciones, multiplica todo por el denominador.</li>
  <li>Cuenta al terminar. Siempre.</li>
  </ol>
  <p><b>Ejemplo:</b> combustión del metano. CH₄ + O₂ → CO₂ + H₂O. El carbono ya está (1 y 1). Hidrógeno: 4 a la izquierda ⟹ 2 H₂O. Ahora hay 2+2 = 4 oxígenos a la derecha ⟹ 2 O₂.</p>
  <div class="formula">CH₄ + 2 O₂ → CO₂ + 2 H₂O</div>`},

 {h:"Redox en treinta segundos",
  c:`<ul>
  <li><b>Oxidarse</b> = perder electrones = subir el estado de oxidación.</li>
  <li><b>Reducirse</b> = ganar electrones = bajarlo.</li>
  <li>El <b>agente oxidante</b> es el que oxida a otro, y por tanto <b>él se reduce</b>. Y viceversa.</li>
  </ul>
  <p class="tip">🧠 Regla nemotécnica en inglés, que es la que se usa: <b>LEO says GER</b> — <i>Lose Electrons = Oxidation</i>, <i>Gain Electrons = Reduction</i>.</p>
  <p>Reglas rápidas de estado de oxidación: elemento libre = 0 · oxígeno = −2 (salvo peróxidos, −1) · hidrógeno = +1 (salvo hidruros metálicos, −1) · la suma en una especie neutra = 0, y en un ion = su carga.</p>`}
]}

];
