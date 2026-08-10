/* ============================================================
   APUNTES · ÁRABE FUSHA — modo estudio (sin preguntas)
   Resumen de las 18 lecciones de Idiomas/Arabe
   ============================================================ */

window.APUNTES = window.APUNTES || {};

window.APUNTES.arabe = [

/* ================================================================= */
{id:"ar-ap-1", t:"Cómo funciona la escritura árabe", emo:"📜", min:6,
 res:"Las cinco cosas que hay que aceptar antes de empezar. Con esto la escritura deja de parecer un muro.",
 secciones:[

 {h:"Cinco reglas de juego",
  c:`<ol>
  <li><b>Se escribe de derecha a izquierda.</b> Los libros se abren «al revés», pero las <b>cifras</b> se leen de izquierda a derecha, como las nuestras.</li>
  <li><b>28 letras, todas consonantes</b> (más tres que hacen de vocal larga). No hay mayúsculas ni minúsculas.</li>
  <li><b>Siempre se escribe en cursiva</b>: las letras se enganchan entre sí. No existe la «letra de imprenta suelta».</li>
  <li>Cada letra tiene hasta <b>4 formas</b> según dónde esté: aislada, inicial, medial, final. Es la misma letra, con distinto gancho.</li>
  <li><b>Las vocales cortas no se escriben</b> en textos normales. Se sobreentienden. Solo aparecen en el Corán, poesía y libros para aprender.</li>
  </ol>`},

 {h:"Por qué eso último no es tan grave",
  c:`<p>Parece imposible leer sin vocales, pero funciona porque el árabe se construye sobre <b>raíces de tres consonantes</b> con significado. La raíz <span class="ar">ك ت ب</span> (k-t-b) tiene que ver con escribir. A partir de ella:</p>
  <table class="tabla">
  <tr><th>Palabra</th><th>Lectura</th><th>Significado</th></tr>
  <tr><td class="ar">كَتَبَ</td><td>kataba</td><td>él escribió</td></tr>
  <tr><td class="ar">كِتَاب</td><td>kitāb</td><td>libro</td></tr>
  <tr><td class="ar">مَكْتَب</td><td>maktab</td><td>oficina, escritorio</td></tr>
  <tr><td class="ar">مَكْتَبَة</td><td>maktaba</td><td>biblioteca</td></tr>
  <tr><td class="ar">كَاتِب</td><td>kātib</td><td>escritor</td></tr>
  </table>
  <p>Ver las tres consonantes te da el <b>campo semántico</b>; el patrón de vocales te da el matiz exacto. Por eso un árabe lee sin vocales sin esfuerzo.</p>`},

 {h:"Cómo estudiar el alfabeto",
  c:`<p>No lo estudies alfabéticamente: estúdialo por <b>familias visuales</b>. Muchas letras son el mismo esqueleto con distinto número y posición de puntos. Si dominas el esqueleto, aprendes tres letras de golpe.</p>
  <p class="tip">💡 El juego «Caza la letra» de la Arena está construido justo para eso: en nivel difícil te pone como distractores las letras de la <b>misma familia</b>.</p>`}
]},

/* ================================================================= */
{id:"ar-ap-2", t:"El alfabeto por familias", emo:"🔤", min:10,
 res:"Las 28 letras agrupadas por esqueleto compartido. Aprende el trazo una vez y cuenta los puntos.",
 secciones:[

 {h:"Familia del diente: ب ت ث",
  c:`<table class="tabla">
  <tr><th>Letra</th><th>Nombre</th><th>Suena</th><th>Puntos</th></tr>
  <tr><td class="ar">ب</td><td>bāʾ</td><td>b</td><td>1 debajo</td></tr>
  <tr><td class="ar">ت</td><td>tāʾ</td><td>t</td><td>2 encima</td></tr>
  <tr><td class="ar">ث</td><td>thāʾ</td><td>th (inglés <i>think</i>)</td><td>3 encima</td></tr>
  </table>
  <p>Mismo cuenco. Solo cambian los puntos. Añade <span class="ar">ن</span> (nūn, «n», cuenco más hondo con 1 punto encima) y <span class="ar">ي</span> (yāʾ, «y/i», 2 puntos debajo).</p>`},

 {h:"Familia del gancho: ج ح خ",
  c:`<table class="tabla">
  <tr><th>Letra</th><th>Nombre</th><th>Suena</th></tr>
  <tr><td class="ar">ج</td><td>jīm</td><td>«y» de <i>yo</i> rioplatense / j inglesa</td></tr>
  <tr><td class="ar">ح</td><td>ḥāʾ</td><td>h muy fuerte, desde la garganta, sin vibrar</td></tr>
  <tr><td class="ar">خ</td><td>khāʾ</td><td>«j» española de <i>jamón</i></td></tr>
  </table>
  <p class="tip">⚠️ <span class="ar">ح</span> es el sonido más difícil para un hispanohablante: es como empañar un cristal con la garganta apretada. <b>No</b> es la j española: esa es <span class="ar">خ</span>.</p>`},

 {h:"Las silbantes y enfáticas",
  c:`<table class="tabla">
  <tr><th>Suave</th><th>Enfática</th><th>Diferencia</th></tr>
  <tr><td class="ar">س (s)</td><td class="ar">ص (ṣ)</td><td rowspan="4">La enfática se pronuncia con la <b>lengua plana y la boca abierta</b>, y oscurece la vocal siguiente hacia «o/a grave»</td></tr>
  <tr><td class="ar">د (d)</td><td class="ar">ض (ḍ)</td></tr>
  <tr><td class="ar">ت (t)</td><td class="ar">ط (ṭ)</td></tr>
  <tr><td class="ar">ذ (dh)</td><td class="ar">ظ (ẓ)</td></tr>
  </table>
  <p>Añade <span class="ar">ز</span> (zāy, «z» zumbada como en <i>rosa</i> inglés) y <span class="ar">ش</span> (shīn, «sh»).</p>
  <p class="tip">💡 Al árabe le llaman <b>«la lengua de la ض»</b> porque ese sonido es prácticamente único suyo.</p>`},

 {h:"Las guturales y el resto",
  c:`<ul>
  <li><span class="ar">ع</span> <b>ʿayn</b> — la letra estrella: un apretón de garganta con voz. No existe en español. Suena como si te estrangularan suavemente mientras dices «a».</li>
  <li><span class="ar">غ</span> <b>ghayn</b> — como una «r» francesa o el gargarismo suave.</li>
  <li><span class="ar">ق</span> <b>qāf</b> — «k» hecha muy atrás, casi en la campanilla. Distinta de <span class="ar">ك</span> (kāf), que es la «k» normal.</li>
  <li><span class="ar">ه</span> <b>hāʾ</b> — «h» aspirada suave, como la <i>h</i> inglesa de <i>hello</i>.</li>
  <li><span class="ar">ف ل م ر</span> — fāʾ (f), lām (l), mīm (m), rāʾ (r vibrante como en <i>pero</i>).</li>
  </ul>`},

 {h:"Las seis que NO conectan hacia adelante",
  c:`<div class="formula"><span class="ar" style="font-size:1.4em">ا · د · ذ · ر · ز · و</span></div>
  <p>Estas seis <b>reciben</b> conexión por la derecha, pero <b>no dan</b> conexión por la izquierda. Consecuencia práctica: después de una de ellas, la siguiente letra empieza como si fuera <b>inicial</b>, y se abre un hueco visible dentro de la palabra.</p>
  <p>Ejemplo: <span class="ar ar-grande">وَرْد</span> (ward, «rosas») — la <span class="ar">و</span> y la <span class="ar">ر</span> cortan la cadena. Reconocer esos huecos es la clave para <b>separar palabras</b> al leer.</p>`}
]},

/* ================================================================= */
{id:"ar-ap-3", t:"Formas conectadas", emo:"🔗", min:7,
 res:"La misma letra con cuatro caras. Cómo reconocerla siempre, esté donde esté.",
 secciones:[

 {h:"Las cuatro posiciones",
  c:`<table class="tabla">
  <tr><th>Posición</th><th>Cuándo</th><th>Ejemplo con ع</th></tr>
  <tr><td><b>Aislada</b></td><td>sola, o tras letra que no conecta</td><td class="ar">ع</td></tr>
  <tr><td><b>Inicial</b></td><td>al principio, conecta hacia la izquierda</td><td class="ar">عـ</td></tr>
  <tr><td><b>Medial</b></td><td>en medio, unida por los dos lados</td><td class="ar">ـعـ</td></tr>
  <tr><td><b>Final</b></td><td>al final, unida solo por la derecha</td><td class="ar">ـع</td></tr>
  </table>
  <p>La <span class="ar">ع</span> es el caso extremo: sus cuatro formas parecen cuatro letras distintas. La mayoría cambia mucho menos.</p>`},

 {h:"El patrón general",
  c:`<ul>
  <li><b>Inicial y medial</b> suelen ser la versión <b>comprimida</b>: pierden la cola y se quedan con lo esencial. <span class="ar">ب → بـ ـبـ</span></li>
  <li><b>Final y aislada</b> conservan la <b>cola larga</b>. <span class="ar">ـب ب</span></li>
  <li>En las <b>seis que no conectan</b>, inicial = aislada, porque no hay nada que enganchar por la izquierda.</li>
  </ul>`},

 {h:"Casos que hay que mirar dos veces",
  c:`<ul>
  <li><span class="ar">هـ ـهـ ـه ه</span> — <b>hāʾ</b> cambia radicalmente. La medial <span class="ar">ـهـ</span> parece un ojal.</li>
  <li><span class="ar">كـ ـكـ ـك ك</span> — <b>kāf</b>: la inicial y medial son un ángulo, la aislada lleva la «vela» dentro.</li>
  <li><span class="ar">مـ ـمـ ـم م</span> — <b>mīm</b>: siempre un círculo, pero la cola solo aparece al final.</li>
  <li><span class="ar">لا</span> — <b>lām-alif</b>: la única <b>ligadura obligatoria</b>. Se escribe así siempre, nunca por separado.</li>
  </ul>
  <p class="tip">💡 Truco de lectura: identifica primero los <b>puntos</b> (arriba/abajo, cuántos) y después el esqueleto. Los puntos discriminan más rápido que la forma.</p>`}
]},

/* ================================================================= */
{id:"ar-ap-4", t:"Vocalización: harakat, sukūn, shadda y tanwīn", emo:"👁️", min:8,
 res:"Las marquitas que convierten un esqueleto de consonantes en algo pronunciable.",
 secciones:[

 {h:"Las tres vocales cortas (harakāt)",
  c:`<table class="tabla">
  <tr><th>Marca</th><th>Nombre</th><th>Posición</th><th>Suena</th></tr>
  <tr><td class="ar">بَ</td><td><b>fatḥa</b></td><td>rayita encima</td><td>a</td></tr>
  <tr><td class="ar">بِ</td><td><b>kasra</b></td><td>rayita debajo</td><td>i</td></tr>
  <tr><td class="ar">بُ</td><td><b>ḍamma</b></td><td>como una «و» pequeña encima</td><td>u</td></tr>
  </table>
  <p>Solo hay <b>tres</b> vocales en árabe clásico: a, i, u. No existen «e» ni «o» como fonemas propios (aparecen como variantes junto a enfáticas).</p>`},

 {h:"Vocales largas",
  c:`<p>Se forman con la vocal corta <b>más</b> una letra de prolongación. Duran el doble, y la diferencia <b>cambia el significado</b>:</p>
  <table class="tabla">
  <tr><th>Combinación</th><th>Suena</th><th>Ejemplo</th></tr>
  <tr><td>fatḥa + <span class="ar">ا</span></td><td>ā</td><td class="ar">بَاب (bāb, puerta)</td></tr>
  <tr><td>kasra + <span class="ar">ي</span></td><td>ī</td><td class="ar">كَبِير (kabīr, grande)</td></tr>
  <tr><td>ḍamma + <span class="ar">و</span></td><td>ū</td><td class="ar">نُور (nūr, luz)</td></tr>
  </table>
  <p class="tip">⚠️ Alarga de verdad al pronunciar. <i>kalb</i> (perro) y <i>kālb</i> no son lo mismo, y hay pares donde el error es embarazoso.</p>`},

 {h:"Sukūn y shadda",
  c:`<ul>
  <li><b>Sukūn</b> <span class="ar">بْ</span> — circulito encima: <b>ausencia de vocal</b>. La consonante se pega directamente a la siguiente. <span class="ar">مَكْتَب</span> = mak-tab.</li>
  <li><b>Shadda</b> <span class="ar">بّ</span> — una «w» pequeña encima: la consonante se <b>duplica</b> y se mantiene el doble de tiempo. <span class="ar">مُدَرِّس</span> = mu-<b>darr</b>-is.</li>
  </ul>
  <p>La shadda no es decorativa: <span class="ar">دَرَسَ</span> (darasa, «estudió») y <span class="ar">دَرَّسَ</span> (darrasa, «enseñó») son verbos distintos.</p>`},

 {h:"Tanwīn y tāʾ marbūṭa",
  c:`<p><b>Tanwīn</b> = la vocal doblada al final de palabra, que añade un sonido <b>-n</b>. Marca la palabra como <b>indeterminada</b> («un/una»):</p>
  <ul>
  <li><span class="ar">ــًا</span> = <b>-an</b> · <span class="ar">ــٍ</span> = <b>-in</b> · <span class="ar">ــٌ</span> = <b>-un</b></li>
  <li><span class="ar">كِتَابٌ</span> kitābun = «un libro» · <span class="ar">الكِتَابُ</span> al-kitābu = «el libro»</li>
  </ul>
  <p><b>Tāʾ marbūṭa</b> <span class="ar">ة</span> — la «t atada»: marca casi siempre el <b>femenino</b>. Se pronuncia <b>-a</b> al parar, y <b>-at</b> si la frase sigue en estado constructo.</p>
  <div class="formula"><span class="ar">مَدْرَسَة</span> = madrasa (escuela) · <span class="ar">مَدْرَسَة الأَوْلَاد</span> = madrasat al-awlād</div>`}
]},

/* ================================================================= */
{id:"ar-ap-5", t:"El artículo الـ: solares y lunares", emo:"🌞", min:6,
 res:"Se escribe siempre igual y se pronuncia de dos maneras. La regla es fonética, no arbitraria.",
 secciones:[

 {h:"La regla",
  c:`<p>El artículo determinado es <span class="ar ar-grande">الـ</span> (al-) y se <b>pega</b> a la palabra. Siempre se escribe igual. Pero:</p>
  <ul>
  <li><b>Letra lunar</b> 🌙 → la <span class="ar">ل</span> <b>se pronuncia</b>: <span class="ar">القَمَر</span> = <b>al</b>-qamar (la luna).</li>
  <li><b>Letra solar</b> ☀️ → la <span class="ar">ل</span> <b>enmudece</b> y la consonante siguiente se <b>dobla</b>: <span class="ar">الشَمْس</span> = a<b>sh-sh</b>ams (el sol), no «al-shams».</li>
  </ul>
  <p>Los nombres vienen justo de esos dos ejemplos: <i>qamar</i> (luna) y <i>shams</i> (sol).</p>`},

 {h:"Las 14 solares",
  c:`<div class="formula"><span class="ar" style="font-size:1.3em">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</span></div>
  <p>Las otras 14 son lunares: <span class="ar">أ ب ج ح خ ع غ ف ق ك م ه و ي</span></p>`},

 {h:"El truco para no memorizarlas",
  c:`<p>No hace falta la lista. La regla es <b>articulatoria</b>:</p>
  <div class="formula">Si la lengua toca <b>cerca de donde se hace la «l»</b> (dientes o alvéolos) → <b>solar</b></div>
  <p>Todas las solares son dentales, alveolares o sibilantes: t, th, d, dh, r, z, s, sh, ṣ, ḍ, ṭ, ẓ, l, n. Pronúncialas y notarás la punta de la lengua en la misma zona que la «l».</p>
  <p>Las lunares se hacen con los <b>labios</b> (b, f, m, w), en la <b>garganta</b> (ʾ, ḥ, kh, ʿ, gh, h, q) o en el <b>paladar</b> (j, k, y). Zonas lejanas a la «l», así que la «l» sobrevive.</p>
  <p class="tip">💡 En la escritura vocalizada lo ves directamente: si la primera letra lleva <b>shadda</b>, es solar.</p>`}
]},

/* ================================================================= */
{id:"ar-ap-6", t:"Frase nominal, género y demostrativos", emo:"🏛️", min:8,
 res:"Cómo decir «esto es un libro» sin usar el verbo ser — porque en presente no existe.",
 secciones:[

 {h:"En presente no hay verbo «ser»",
  c:`<p>La <b>frase nominal</b> se construye juntando dos cosas, sin verbo. El «es» se sobreentiende:</p>
  <div class="formula"><span class="ar ar-grande">البَيْتُ كَبِيرٌ</span></div>
  <p><i>al-baytu kabīrun</i> = «la casa (es) grande». Fíjate en la asimetría clave:</p>
  <ul>
  <li>El <b>sujeto</b> va <b>determinado</b> (con الـ).</li>
  <li>El <b>predicado</b> va <b>indeterminado</b> (con tanwīn).</li>
  </ul>
  <p>Si pones los dos determinados — <span class="ar">البَيْتُ الكَبِيرُ</span> — ya no es una frase: es «la casa grande», un sintagma. <b>Esa distinción es toda la gramática de este punto.</b></p>`},

 {h:"Género",
  c:`<ul>
  <li>Regla básica: si acaba en <b>ة</b> (tāʾ marbūṭa), es <b>femenino</b>.</li>
  <li>Femeninas sin ة, hay que memorizarlas: <span class="ar">شَمْس</span> (sol), <span class="ar">نَار</span> (fuego), <span class="ar">أَرْض</span> (tierra), <span class="ar">رِيح</span> (viento).</li>
  <li>Las <b>partes del cuerpo que van en pares</b> son femeninas: <span class="ar">يَد</span> (mano), <span class="ar">عَيْن</span> (ojo), <span class="ar">أُذُن</span> (oreja), <span class="ar">رِجْل</span> (pierna).</li>
  <li>Los nombres de países y ciudades suelen ser femeninos.</li>
  </ul>
  <p>El adjetivo <b>concuerda</b>: <span class="ar">بَيْتٌ كَبِيرٌ</span> (bayt kabīr) vs <span class="ar">مَدْرَسَةٌ كَبِيرَةٌ</span> (madrasa kabīra).</p>`},

 {h:"Demostrativos y pronombres",
  c:`<table class="tabla">
  <tr><th>Árabe</th><th>Lectura</th><th>Uso</th></tr>
  <tr><td class="ar">هٰذَا</td><td>hādhā</td><td>este (masc.)</td></tr>
  <tr><td class="ar">هٰذِهِ</td><td>hādhihi</td><td>esta (fem.)</td></tr>
  <tr><td class="ar">ذٰلِكَ</td><td>dhālika</td><td>aquel</td></tr>
  <tr><td class="ar">أَنَا</td><td>anā</td><td>yo</td></tr>
  <tr><td class="ar">أَنْتَ / أَنْتِ</td><td>anta / anti</td><td>tú (m / f)</td></tr>
  <tr><td class="ar">هُوَ / هِيَ</td><td>huwa / hiya</td><td>él / ella</td></tr>
  <tr><td class="ar">نَحْنُ</td><td>naḥnu</td><td>nosotros</td></tr>
  </table>
  <div class="formula"><span class="ar ar-grande">هٰذَا كِتَابٌ</span> — hādhā kitābun — «esto es un libro»</div>`},

 {h:"Preguntas",
  c:`<ul>
  <li><span class="ar">مَا</span> <b>mā</b> — ¿qué? (para cosas) · <span class="ar">مَا هٰذَا؟</span></li>
  <li><span class="ar">مَنْ</span> <b>man</b> — ¿quién?</li>
  <li><span class="ar">أَيْنَ</span> <b>ayna</b> — ¿dónde?</li>
  <li><span class="ar">كَيْفَ</span> <b>kayfa</b> — ¿cómo? · <span class="ar">كَيْفَ حَالُكَ؟</span> (¿cómo estás?)</li>
  <li><span class="ar">لِمَاذَا</span> <b>limādhā</b> — ¿por qué?</li>
  <li><span class="ar">هَلْ</span> <b>hal</b> — partícula para preguntas de sí/no. Va al principio y no se traduce.</li>
  </ul>`}
]},

/* ================================================================= */
{id:"ar-ap-7", t:"Números, colores y el primer verbo", emo:"🔢", min:7,
 res:"Cifras que se leen al revés que las letras, colores con patrón fijo y la conjugación del pasado.",
 secciones:[

 {h:"Las cifras",
  c:`<table class="tabla">
  <tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>
  <tr><td class="ar">٠</td><td class="ar">١</td><td class="ar">٢</td><td class="ar">٣</td><td class="ar">٤</td><td class="ar">٥</td><td class="ar">٦</td><td class="ar">٧</td><td class="ar">٨</td><td class="ar">٩</td></tr>
  </table>
  <p class="tip">⚠️ Aunque el texto va de derecha a izquierda, los <b>números se leen de izquierda a derecha</b>, igual que los nuestros. <span class="ar">٢٠٢٦</span> es 2026.</p>
  <p>Nombres: <span class="ar">وَاحِد</span> wāḥid (1), <span class="ar">اِثْنَان</span> ithnān (2), <span class="ar">ثَلَاثَة</span> thalātha (3), <span class="ar">أَرْبَعَة</span> arbaʿa (4), <span class="ar">خَمْسَة</span> khamsa (5), <span class="ar">سِتَّة</span> sitta (6), <span class="ar">سَبْعَة</span> sabʿa (7), <span class="ar">ثَمَانِيَة</span> thamāniya (8), <span class="ar">تِسْعَة</span> tisʿa (9), <span class="ar">عَشَرَة</span> ʿashara (10).</p>`},

 {h:"Colores: un patrón, no una lista",
  c:`<p>Los colores básicos siguen una plantilla fija:</p>
  <div class="formula">Masculino: <b>أَفْعَل</b> (aFʿaL) · Femenino: <b>فَعْلَاء</b> (FaʿLāʾ)</div>
  <table class="tabla">
  <tr><th>Color</th><th>Masculino</th><th>Femenino</th></tr>
  <tr><td>blanco</td><td class="ar">أَبْيَض (abyaḍ)</td><td class="ar">بَيْضَاء (bayḍāʾ)</td></tr>
  <tr><td>negro</td><td class="ar">أَسْوَد (aswad)</td><td class="ar">سَوْدَاء (sawdāʾ)</td></tr>
  <tr><td>rojo</td><td class="ar">أَحْمَر (aḥmar)</td><td class="ar">حَمْرَاء (ḥamrāʾ)</td></tr>
  <tr><td>verde</td><td class="ar">أَخْضَر (akhḍar)</td><td class="ar">خَضْرَاء (khaḍrāʾ)</td></tr>
  <tr><td>azul</td><td class="ar">أَزْرَق (azraq)</td><td class="ar">زَرْقَاء (zarqāʾ)</td></tr>
  <tr><td>amarillo</td><td class="ar">أَصْفَر (aṣfar)</td><td class="ar">صَفْرَاء (ṣafrāʾ)</td></tr>
  </table>
  <p>Si te sabes el patrón, solo tienes que recordar las <b>tres consonantes</b> de cada color.</p>`},

 {h:"El verbo en pasado",
  c:`<p>La forma de diccionario de un verbo árabe es <b>«él hizo»</b>, en pasado, tercera persona masculina. <span class="ar">كَتَبَ</span> kataba = «él escribió» — eso es lo que buscas en el diccionario, no un infinitivo.</p>
  <p>Se conjuga <b>añadiendo terminaciones</b>, sin tocar la raíz:</p>
  <table class="tabla">
  <tr><th>Pronombre</th><th>Terminación</th><th>كَتَبَ</th></tr>
  <tr><td>anā (yo)</td><td>-tu</td><td class="ar">كَتَبْتُ</td></tr>
  <tr><td>anta (tú m.)</td><td>-ta</td><td class="ar">كَتَبْتَ</td></tr>
  <tr><td>anti (tú f.)</td><td>-ti</td><td class="ar">كَتَبْتِ</td></tr>
  <tr><td>huwa (él)</td><td>—</td><td class="ar">كَتَبَ</td></tr>
  <tr><td>hiya (ella)</td><td>-at</td><td class="ar">كَتَبَتْ</td></tr>
  <tr><td>naḥnu (nos.)</td><td>-nā</td><td class="ar">كَتَبْنَا</td></tr>
  <tr><td>antum (vos.)</td><td>-tum</td><td class="ar">كَتَبْتُمْ</td></tr>
  <tr><td>hum (ellos)</td><td>-ū</td><td class="ar">كَتَبُوا</td></tr>
  </table>
  <p class="tip">💡 <b>La raíz no se toca nunca.</b> Solo cambia lo que va detrás. Si reconoces las tres consonantes, reconoces el verbo aunque la terminación te sea nueva.</p>`},

 {h:"Frases de cortesía que se usan a diario",
  c:`<ul>
  <li><span class="ar">السَّلَامُ عَلَيْكُمْ</span> as-salāmu ʿalaykum — «la paz sea contigo». Se responde <span class="ar">وَعَلَيْكُمُ السَّلَام</span>.</li>
  <li><span class="ar">صَبَاحُ الخَيْر</span> ṣabāḥu l-khayr — buenos días. Respuesta: <span class="ar">صَبَاحُ النُّور</span>.</li>
  <li><span class="ar">شُكْرًا</span> shukran — gracias. Respuesta: <span class="ar">عَفْوًا</span> ʿafwan.</li>
  <li><span class="ar">مِنْ فَضْلِكَ</span> min faḍlika — por favor.</li>
  <li><span class="ar">إِنْ شَاءَ الله</span> in shāʾa llāh — si Dios quiere. Se usa constantemente para cualquier plan futuro.</li>
  </ul>`}
]}

];
