/* ============================================================
   APUNTES · GEOGRAFÍA — modo estudio (sin preguntas)
   ============================================================ */

window.APUNTES = window.APUNTES || {};

window.APUNTES.geografia = [

/* ================================================================= */
{id:"ge-ap-1", t:"Cómo memorizar el mundo sin volverte loco", emo:"🧠", min:8,
 res:"Un método por continentes y bloques, con las trampas típicas y las capitales que casi todo el mundo falla.",
 secciones:[

 {h:"El método: por bloques, nunca alfabético",
  c:`<p>Aprenderse 195 países de una lista alfabética no funciona: la memoria necesita <b>ganchos espaciales</b>. El orden que sí funciona es este:</p>
  <ol>
  <li><b>Empieza por lo que ya sabes.</b> Sudamérica: 12 países, y probablemente ya te sabes 10.</li>
  <li><b>Ve por vecindad, no por alfabeto.</b> Recorre el mapa como si viajaras: de norte a sur, de la costa al interior.</li>
  <li><b>Bloques de 8–10.</b> Más de eso y se mezclan. Domina un bloque antes de pasar al siguiente.</li>
  <li><b>Tres datos por país siempre juntos:</b> nombre, capital y bandera. Aprenderlos por separado es hacer el triple de trabajo.</li>
  <li><b>Repasa lo viejo antes de añadir lo nuevo.</b> Cinco minutos de repaso valen más que veinte de material nuevo.</li>
  </ol>
  <p class="tip">🎯 El tablero del Atlas está pensado justo para esto: filtra por continente y no salgas de ahí hasta que la barra llegue al 100 %.</p>`},

 {h:"El reparto: cuántos hay en cada sitio",
  c:`<table class="tabla">
  <tr><th>Continente</th><th>Países</th><th>Dificultad real</th></tr>
  <tr><td>África</td><td>54</td><td>alta: muchos y poco familiares</td></tr>
  <tr><td>Asia</td><td>~48</td><td>media: los grandes son conocidos</td></tr>
  <tr><td>Europa</td><td>~45</td><td>media: los Balcanes y el Báltico son el lío</td></tr>
  <tr><td>América del Norte y Central</td><td>23</td><td>baja, salvo el Caribe</td></tr>
  <tr><td>Oceanía</td><td>14</td><td>baja en número, alta en rareza</td></tr>
  <tr><td>América del Sur</td><td>12</td><td>la más fácil para empezar</td></tr>
  </table>
  <p><b>Orden recomendado:</b> Sudamérica → América del Norte y Central → Europa occidental → Europa del este → Asia → Oceanía → África. África al final, porque para entonces ya habrás cogido el ritmo.</p>`},

 {h:"Las capitales que casi todos fallan",
  c:`<table class="tabla">
  <tr><th>País</th><th>La respuesta correcta</th><th>Lo que suele decirse</th></tr>
  <tr><td>Estados Unidos</td><td>Washington D. C.</td><td>Nueva York</td></tr>
  <tr><td>Canadá</td><td>Ottawa</td><td>Toronto</td></tr>
  <tr><td>Australia</td><td>Camberra</td><td>Sídney</td></tr>
  <tr><td>Brasil</td><td>Brasilia</td><td>Río de Janeiro</td></tr>
  <tr><td>Turquía</td><td>Ankara</td><td>Estambul</td></tr>
  <tr><td>Suiza</td><td>Berna</td><td>Zúrich o Ginebra</td></tr>
  <tr><td>Marruecos</td><td>Rabat</td><td>Casablanca</td></tr>
  <tr><td>Nigeria</td><td>Abuya</td><td>Lagos</td></tr>
  <tr><td>India</td><td>Nueva Delhi</td><td>Bombay o Delhi a secas</td></tr>
  <tr><td>Vietnam</td><td>Hanói</td><td>Ho Chi Minh</td></tr>
  <tr><td>Nueva Zelanda</td><td>Wellington</td><td>Auckland</td></tr>
  <tr><td>Costa de Marfil</td><td>Yamusukro</td><td>Abiyán</td></tr>
  <tr><td>Bolivia</td><td>Sucre (constitucional)</td><td>La Paz (sede del gobierno)</td></tr>
  <tr><td>Myanmar</td><td>Naipyidó</td><td>Rangún</td></tr>
  </table>
  <p class="tip">📌 El patrón: <b>la capital casi nunca es la ciudad más grande</b> cuando el país la eligió a propósito para evitar rivalidades (Camberra, Brasilia, Abuya, Astaná) o por razones históricas (Ankara, Wellington).</p>`},

 {h:"Los casos raros que conviene tener claros",
  c:`<ul>
  <li><b>Sudáfrica tiene tres capitales:</b> Pretoria (ejecutiva), Ciudad del Cabo (legislativa) y Bloemfontein (judicial).</li>
  <li><b>Bolivia tiene dos:</b> Sucre es la constitucional; el gobierno está en La Paz.</li>
  <li><b>Países Bajos:</b> Ámsterdam es la capital, pero el gobierno reside en La Haya.</li>
  <li><b>Países sin salida al mar rodeados por uno solo:</b> Lesoto (dentro de Sudáfrica), San Marino y el Vaticano (dentro de Italia).</li>
  <li><b>Países transcontinentales:</b> Rusia y Turquía (Europa/Asia), Egipto (África/Asia), Kazajistán.</li>
  <li><b>Islas que no son países:</b> Groenlandia (Dinamarca), Puerto Rico (EE. UU.), Hong Kong (China).</li>
  </ul>`},

 {h:"Trampas de nombres parecidos",
  c:`<table class="tabla">
  <tr><th>No confundir</th><th>Con</th><th>Truco</th></tr>
  <tr><td>Austria (Viena)</td><td>Australia (Camberra)</td><td>Austria está en Europa y no tiene canguros</td></tr>
  <tr><td>Eslovenia (Liubliana)</td><td>Eslovaquia (Bratislava)</td><td>Eslovenia toca el mar Adriático; Eslovaquia no tiene costa</td></tr>
  <tr><td>Níger (Niamey)</td><td>Nigeria (Abuya)</td><td>Níger es el del norte y el desierto; Nigeria, la del golfo y el petróleo</td></tr>
  <tr><td>República del Congo (Brazzaville)</td><td>R. D. del Congo (Kinsasa)</td><td>las dos capitales se miran cara a cara desde las orillas del río</td></tr>
  <tr><td>Guinea (Conakri)</td><td>Guinea-Bisáu, Guinea Ecuatorial, Papúa N. G.</td><td>hay cuatro «Guineas»: dos en África occidental, una en el golfo y una en Oceanía</td></tr>
  <tr><td>Mauritania (Nuakchot)</td><td>Mauricio (Port Louis)</td><td>Mauritania es el desierto africano; Mauricio, la isla del Índico</td></tr>
  <tr><td>Dominica (Roseau)</td><td>República Dominicana (Santo Domingo)</td><td>Dominica es la islita pequeña; la República comparte isla con Haití</td></tr>
  </table>`}
]},

/* ================================================================= */
{id:"ge-ap-2", t:"Cómo leer una bandera", emo:"🚩", min:8,
 res:"Los patrones que se repiten, los colores que significan algo y los grupos de banderas que se parecen tanto que hay que distinguirlas a propósito.",
 secciones:[

 {h:"Los patrones básicos",
  c:`<ul>
  <li><b>Tricolor vertical:</b> herencia de la Revolución francesa. Francia, Italia, Irlanda, Bélgica, Rumanía, Chad, Malí, Nigeria (bicolor), México.</li>
  <li><b>Tricolor horizontal:</b> herencia de la bandera neerlandesa. Países Bajos, Rusia, Alemania, Hungría, Bulgaria, Colombia, Venezuela, Ecuador.</li>
  <li><b>Cruz nórdica:</b> desplazada hacia el mástil. Dinamarca, Suecia, Noruega, Finlandia, Islandia. Cinco países y ninguno más.</li>
  <li><b>Union Jack en el cantón:</b> pasado británico. Australia, Nueva Zelanda, Fiyi, Tuvalu.</li>
  <li><b>Media luna y estrella:</b> tradición otomana, hoy asociada al islam. Turquía, Túnez, Argelia, Pakistán, Malasia, Mauritania, Azerbaiyán.</li>
  <li><b>Panafricanos:</b> rojo, amarillo y verde, tomados de Etiopía, el único país africano que nunca fue colonizado. Ghana, Malí, Senegal, Camerún, Guinea, Benín.</li>
  <li><b>Paneslavos:</b> blanco, azul y rojo, tomados de Rusia. Serbia, Eslovenia, Eslovaquia, Chequia, Croacia.</li>
  </ul>`},

 {h:"Qué suelen significar los colores",
  c:`<table class="tabla">
  <tr><th>Color</th><th>Significado habitual</th></tr>
  <tr><td>Rojo</td><td>la sangre derramada, la lucha por la independencia</td></tr>
  <tr><td>Verde</td><td>la tierra, la agricultura y, en el mundo islámico, el propio islam</td></tr>
  <tr><td>Azul</td><td>el mar, los ríos, el cielo</td></tr>
  <tr><td>Amarillo / dorado</td><td>la riqueza mineral, el sol</td></tr>
  <tr><td>Blanco</td><td>la paz, la nieve, la pureza</td></tr>
  <tr><td>Negro</td><td>el pasado colonial superado; en las panárabes, la dinastía abasí</td></tr>
  </table>
  <p><b>Los cuatro colores panárabes</b> (rojo, blanco, negro y verde) aparecen combinados en Egipto, Siria, Irak, Yemen, Jordania, Sudán, Kuwait, Emiratos y Palestina. Si ves esos cuatro, estás en el mundo árabe casi seguro.</p>`},

 {h:"Los pares que se confunden",
  c:`<table class="tabla">
  <tr><th>Se parecen</th><th>Cómo distinguirlas</th></tr>
  <tr><td>Chad y Rumanía</td><td>prácticamente idénticas; el azul de Chad es más oscuro</td></tr>
  <tr><td>Indonesia y Mónaco</td><td>rojo sobre blanco las dos; la de Mónaco es más cuadrada</td></tr>
  <tr><td>Irlanda y Costa de Marfil</td><td>Irlanda lleva el verde <b>junto al mástil</b>; Costa de Marfil, el naranja</td></tr>
  <tr><td>Países Bajos y Luxemburgo</td><td>el azul de Luxemburgo es claro; el neerlandés, oscuro</td></tr>
  <tr><td>Australia y Nueva Zelanda</td><td>Australia tiene 6 estrellas y una es grande de 7 puntas; Nueva Zelanda solo 4, y rojas</td></tr>
  <tr><td>Noruega e Islandia</td><td>colores invertidos: Noruega es roja con cruz azul; Islandia, azul con cruz roja</td></tr>
  <tr><td>Senegal y Malí</td><td>las dos verde-amarillo-rojo verticales; Senegal lleva una estrella verde en medio</td></tr>
  <tr><td>Colombia, Ecuador y Venezuela</td><td>las tres amarillo-azul-rojo, herencia de la Gran Colombia. Ecuador lleva escudo; Venezuela, estrellas; Colombia, nada</td></tr>
  </table>
  <p class="tip">🔍 Cuando dos banderas se parecen, casi siempre hay una razón histórica: fueron el mismo país, o una copió a la otra a propósito. Recordar la historia fija la diferencia mejor que el dibujo.</p>`},

 {h:"Las banderas que se reconocen a la primera",
  c:`<ul>
  <li><b>Nepal:</b> la única que no es rectangular. Dos banderines superpuestos, con sol y luna.</li>
  <li><b>Suiza y el Vaticano:</b> las dos únicas cuadradas.</li>
  <li><b>Canadá:</b> la hoja de arce, una de las pocas con un símbolo natural único.</li>
  <li><b>Japón:</b> un círculo rojo sobre blanco. Nada más.</li>
  <li><b>Chipre:</b> lleva dibujado el propio mapa del país. Solo la comparte con Kosovo.</li>
  <li><b>Bután:</b> un dragón sobre la diagonal.</li>
  <li><b>Brasil:</b> el cielo estrellado de Río la noche del 15 de noviembre de 1889.</li>
  <li><b>Mozambique:</b> la única con un fusil de asalto moderno.</li>
  </ul>`}
]},

/* ================================================================= */
{id:"ge-ap-3", t:"Coordenadas, husos y relieve", emo:"🧭", min:8,
 res:"Cómo funciona la cuadrícula del planeta, por qué las horas van como van y los récords geográficos que siempre caen.",
 secciones:[

 {h:"Latitud y longitud",
  c:`<table class="tabla">
  <tr><th></th><th>Latitud</th><th>Longitud</th></tr>
  <tr><td>Mide desde</td><td>el ecuador</td><td>el meridiano de Greenwich</td></tr>
  <tr><td>Rango</td><td>0° a 90° N o S</td><td>0° a 180° E u O</td></tr>
  <tr><td>Líneas</td><td>paralelos (círculos)</td><td>meridianos (de polo a polo)</td></tr>
  <tr><td>¿Se cruzan?</td><td>nunca</td><td>en los dos polos</td></tr>
  </table>
  <p><b>Truco para no confundirlas:</b> la la<b>tit</b>ud son las líneas que van <i>tumbadas</i>, como los peldaños de una escalera. La longitud es la que va de arriba abajo, y es la <i>larga</i>.</p>
  <p>Un grado de latitud son siempre unos <b>111 km</b>. Un grado de longitud vale 111 km en el ecuador y se va estrechando hasta 0 en los polos.</p>
  <p>Los paralelos con nombre: <b>trópico de Cáncer</b> (23,5° N), <b>trópico de Capricornio</b> (23,5° S) y los dos <b>círculos polares</b> (66,5°). Ese 23,5° es exactamente la inclinación del eje terrestre, que es lo que provoca las estaciones.</p>`},

 {h:"Husos horarios",
  c:`<p>360° / 24 horas = <b>15° por huso</b>. Cada 15° hacia el este, una hora más.</p>
  <ul>
  <li>La <b>línea internacional de cambio de fecha</b> va aproximadamente por el meridiano 180°, zigzagueando para no partir países en dos días distintos.</li>
  <li><b>China</b> ocupa cinco husos geográficos pero usa una sola hora oficial en todo el país.</li>
  <li><b>Rusia</b> tiene 11 husos, el récord en territorio continuo.</li>
  <li>Algunos países usan desfases de media hora (India, Irán) o incluso de 45 minutos (Nepal).</li>
  </ul>
  <p class="tip">🕐 Regla práctica: al cruzar la línea de cambio de fecha hacia el <b>oeste</b> se pierde un día; hacia el <b>este</b> se gana. Es el truco con el que acaba <i>La vuelta al mundo en ochenta días</i>.</p>`},

 {h:"Los récords que siempre preguntan",
  c:`<table class="tabla">
  <tr><th>Récord</th><th>Respuesta</th><th>Matiz</th></tr>
  <tr><td>País más grande</td><td>Rusia</td><td>17 M km², 11 husos</td></tr>
  <tr><td>País más pequeño</td><td>Ciudad del Vaticano</td><td>0,44 km²</td></tr>
  <tr><td>Más poblado</td><td>India</td><td>superó a China en 2023</td></tr>
  <tr><td>Río más largo</td><td>Nilo (o Amazonas)</td><td>según dónde se sitúe el nacimiento</td></tr>
  <tr><td>Río más caudaloso</td><td>Amazonas</td><td>aquí no hay discusión</td></tr>
  <tr><td>Montaña más alta</td><td>Everest, 8849 m</td><td>medida sobre el nivel del mar</td></tr>
  <tr><td>Cordillera más larga</td><td>los Andes, 7000 km</td><td>en tierra; bajo el mar gana la dorsal atlántica</td></tr>
  <tr><td>Desierto más grande</td><td>la Antártida</td><td>desierto = poca lluvia, no calor</td></tr>
  <tr><td>Desierto cálido más grande</td><td>el Sáhara</td><td>9 M km²</td></tr>
  <tr><td>Lago más grande</td><td>mar Caspio</td><td>es un lago, pese al nombre</td></tr>
  <tr><td>Lago más profundo</td><td>Baikal, 1642 m</td><td>tiene el 20 % del agua dulce líquida del planeta</td></tr>
  <tr><td>Océano más grande</td><td>Pacífico</td><td>mayor que toda la tierra firme junta</td></tr>
  <tr><td>Costa más larga</td><td>Canadá</td><td>más que los diez siguientes sumados</td></tr>
  <tr><td>Capital más alta</td><td>La Paz, 3640 m</td><td>sede de gobierno de Bolivia</td></tr>
  <tr><td>Más fronteras</td><td>China y Rusia, 14 cada uno</td><td>Brasil lidera América con 10</td></tr>
  </table>`},

 {h:"Los estrechos y canales que hay que ubicar",
  c:`<ul>
  <li><b>Gibraltar:</b> entre España y Marruecos. Une el Atlántico con el Mediterráneo. 14 km.</li>
  <li><b>Bósforo y Dardanelos:</b> parten Turquía en dos y comunican el mar Negro con el Mediterráneo.</li>
  <li><b>Ormuz:</b> entre Irán y Omán. Por ahí pasa un tercio del petróleo marítimo mundial.</li>
  <li><b>Malaca:</b> entre Malasia e Indonesia. La ruta comercial más transitada de Asia.</li>
  <li><b>Magallanes:</b> en el sur de Chile, entre el continente y Tierra del Fuego.</li>
  <li><b>Drake:</b> entre Sudamérica y la Antártida. El mar más bravo del planeta.</li>
  <li><b>Bering:</b> entre Rusia y Alaska. 82 km separan los dos continentes.</li>
  <li><b>Canal de Panamá</b> (Atlántico–Pacífico) y <b>canal de Suez</b> (Mediterráneo–mar Rojo): los dos atajos artificiales que cambiaron el comercio mundial.</li>
  </ul>`}
]}

];
