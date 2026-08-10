# ⚔️ La Arena — mi dojo de entrenamiento

Un juego local para practicar lo que estoy estudiando en `Idiomas/`, `Finanzas/` y matemáticas.
Funciona **sin internet, sin instalar nada y sin cuentas**: es una página web que vive en esta carpeta.

## Cómo jugar

Doble clic en **`Jugar.bat`** (o directamente en `index.html`).

El progreso se guarda solo, en el almacenamiento local del navegador.
Usa **siempre el mismo navegador**, o cada uno tendrá su propio progreso — y si quieres pasar la
partida a otro dispositivo, mira «Llevarme el progreso» más abajo.

## 🌐 Jugar desde el móvil (publicarla en un link)

Son archivos estáticos, sin build ni servidor, así que cualquier hosting los sirve tal cual.
Con **GitHub Pages**:

```
git init && git add . && git commit -m "La Arena"
gh repo create arena --public --source=. --push
# Settings -> Pages -> Deploy from branch: main / (root)
```

Con **Netlify Drop** basta con arrastrar la carpeta al navegador. En los dos casos el link es
público: no hay datos personales dentro, pero conviene saberlo. `Jugar.bat` sigue funcionando
igual en local.

Una vez publicada, la app es una **PWA**: el navegador ofrece «Añadir a la pantalla de inicio»
y a partir de ahí **funciona sin internet** (`sw.js` guarda todo en la primera visita).
Abriéndola con `Jugar.bat` (`file://`) el service worker ni se registra, porque ahí no está
permitido.

> **Al tocar cualquier archivo hay que subir `VERSION` en `sw.js`.** Es lo único que hace que
> los dispositivos que ya la tienen instalada se bajen la versión nueva en vez de servir la vieja
> desde su caché.

Los iconos (`iconos/icono-192.png` y `-512.png`) se generaron fotografiando una página HTML con
Chrome en modo headless, así que no hacen falta programas de dibujo para rehacerlos.

## 💾 Llevarme el progreso a otro dispositivo

En **📊 Mi progreso** hay dos botones: **Guardar copia** descarga un `la-arena-AAAA-MM-DD.json`
y **Restaurar copia** lo vuelve a meter. La restauración **fusiona**, no reemplaza: se queda el
XP mayor, la mejor medalla de cada juego y la unión de todo lo conquistado y lo leído. Como todo
son máximos y uniones, **importar dos veces la misma copia no cambia nada** y no se puede inflar
el XP a base de restaurar.

## 📚 Sala de estudio (repasar sin jugar)

El botón **📚** de la cabecera —o el de cada mundo— abre los **apuntes**: los mismos temas que
salen en los juegos, explicados de corrido. **Sin preguntas, sin cronómetro y sin perder vidas.**
Es para repasar antes de pelear.

- **48 apuntes** repartidos en los 6 mundos (17 solo de matemáticas), con tablas, fórmulas y avisos de las trampas típicas.
- Cada uno lleva índice de apartados y navegación al anterior / siguiente.
- Al terminar de leer, **«Marcar como repasado» da +40 XP** (una sola vez) y deja un ✓ en el índice.
- Desde cualquier apunte hay un botón directo a los juegos de ese mismo mundo.

### ✍️ Ejercicios resueltos

Siete de esos apuntes son **colecciones de ejercicios resueltos paso a paso** (4 de matemáticas
y 3 de finanzas, 76 ejercicios en total). Cada uno trae el enunciado y la solución **plegada**:

> léelo, hazlo en papel y solo entonces abre «Ver el proceso».

Dentro está el desarrollo entero numerado — qué estructura tiene el problema, qué regla toca,
las cuentas y el resultado destacado — más un aviso con el error clásico de ese tipo de ejercicio.

| Apunte | Ejercicios |
|--------|-----------|
| Derivadas | 13 |
| Integrales | 14 |
| Ecuaciones diferenciales | 10 |
| Álgebra lineal | 10 |
| Modelo binomial | 9 |
| Black–Scholes | 9 |
| Itô y martingalas | 10 |

Y otros cinco apuntes **amplían la teoría** de cada bloque: los porqués de las reglas de derivación,
integración avanzada, sistemas de EDO y Laplace, los dos teoremas fundamentales de la valoración,
y tipos de interés con exóticas.

## 🎖️ Juegos especiales

Dos tableros grandes que se van pintando a medida que los conquistas. **Sin vidas ni cronómetro**:
aquí se trata de llegar al 100 %. Cada casilla se conquista respondiendo bien **todo** lo que se
pregunta de ella, y da **+25 XP** la primera vez.

- **⚗️ Tabla periódica** — los 118 elementos en su rejilla de siempre.
  En *conquistar* solo se ve el símbolo y hay que decir **nombre, número atómico y peso atómico**
  (el peso se acepta con ±0,5 % de margen). En *estudiar* cada casilla abre su ficha completa:
  periodo, grupo, bloque, estado, configuración electrónica, familia y un dato para recordarlo.
- **🌍 Atlas del mundo** — un mapa político de verdad: los 197 países se dibujan con su
  **contorno y sus fronteras**, cada uno de un tono distinto, y se tocan directamente.
  En *conquistar* hay que decir **qué país es, cuál es su capital y cuál su bandera**;
  el mapa arranca en gris y cada país se pinta al ganarlo.
  En *estudiar*, tocar un país abre la ficha con bandera dibujada, capital y coordenadas.
  Los filtros de continente **hacen zoom** sobre esa zona, que es la única forma de que Europa
  sea manejable. Los microestados (Mónaco, Nauru, Malta…) llevan además un punto y una zona
  tocable más grande, porque a esa escala su contorno no se ve.
  El mapa se **acerca y se arrastra**: rueda del ratón, pellizco con dos dedos, doble clic o
  los botones + / − / ⟲ de la esquina. Sin eso, en un móvil el mundo entero es una tira de
  150 px donde no se puede tocar ningún país.
  Los contornos se regeneran con `node herramientas/generar-mapa.js datos/mapa-mundi.js`
  (necesita bajar antes `countries-50m.json`; el propio archivo explica cómo).

Las banderas no son imágenes: se **dibujan en SVG** a partir de una descripción compacta en
`datos/geografia.js`, así que la app sigue sin depender de ningún archivo externo.

## Cómo funciona

Cada juego tiene tres niveles. No cambia solo la dificultad de las preguntas: cambia el combate entero.

| Nivel | Preguntas | Vidas | Tiempo por pregunta | Opciones | XP base |
|-------|-----------|-------|---------------------|----------|---------|
| 🟢 Fácil | 10 | 5 ❤️ | sin límite | 3 | 10 |
| 🟡 Intermedio | 12 | 3 ❤️ | 16 s | 4 | 18 |
| 🔴 Difícil | 14 | 2 ❤️ | 9 s | 5 | 30 |

### ⚙️ A tu medida (nivel personalizado)

Debajo de los tres niveles, cada juego tiene el botón **⚙️ A tu medida**: ahí se eligen a mano
las **vidas** (1–10), el **tiempo por pregunta** (0 = sin cronómetro, hasta 90 s) y **cuántas
preguntas** tiene la batalla. La dificultad base que se marque arriba sigue decidiendo de qué
preguntas se tira, cuántas opciones tiene cada una y el XP por acierto.

**El tope de preguntas depende del mundo:**

| Mundo | Tope | Por qué |
|-------|------|---------|
| 🌍 Geografía (los 5 juegos) | **197** | uno por cada país del mundo |
| ⚗️ Química (los 4 juegos) | **118** | uno por cada elemento de la tabla |
| Alemán · Árabe · Finanzas · Matemáticas | **40** | tope general |

Una batalla no repite pregunta mientras le queden. Los cinco juegos que van país a país o
elemento a elemento (Capitales, Banderas, ¿Dónde está?, Símbolo ⇄ nombre y Ficha del elemento)
llegan al tope sin repetir ni una **en difícil**; en fácil e intermedio la lista es más corta
(56 / 185 países y 36 / 86 elementos) y el diálogo avisa antes de empezar: «este juego sabe hacer
unas N preguntas distintas en este nivel». El mismo aviso sale en los de conceptos y V/F, que
tienen banco pequeño: se puede pedir igual, sabiendo que algunas se repetirán.

Hay cuatro atajos: 🏃 Maratón, ⚡ Relámpago, 💀 Muerte súbita y 🎯 Banco entero (que pone el tope
del mundo: los 197 países o los 118 elementos de una sentada). La última configuración usada se
recuerda para la próxima vez.

Estas batallas **suman XP y cuentan para la racha diaria**, pero **no dan medallas ni récords**:
esos se siguen ganando solo en los tres niveles de siempre, o bastaría con pedir 10 vidas sin
cronómetro para llenar la vitrina de oros.

En difícil, además, varios juegos pasan de elegir a **escribir la respuesta a mano**, y los
distractores dejan de ser aleatorios: son los errores que de verdad se cometen (letras árabes de
la misma familia visual, participios sin el `ge-` en su sitio, pronunciar la ل de una letra solar).

**Recompensas**
- **Racha (combo):** cada acierto seguido sube el multiplicador, hasta ×2 con 10 seguidos.
- **Bono de tiempo:** responder rápido suma hasta un 50 % extra.
- **Estrellas:** ★ ganar · ★★ 85 % de precisión · ★★★ batalla perfecta.
- **Medallas:** 🥉 bronce por ganar, 🥈 plata por 85 %, 🥇 oro por batalla perfecta. Una por juego y nivel: **69 en total**.
- **Rangos:** Novato → Aprendiz → Iniciado → Adepto → Veterano → Experto → Maestro → Gran Maestro → 🐉 Leyenda.
- **Racha diaria:** 🔥 días seguidos entrenando.

**Repaso inteligente.** Lo que fallas se guarda y vuelve a salir más seguido. Cuando acumulas
5 conceptos flojos aparece el botón de **Duelo de repaso**, que solo pregunta lo que te está costando.
En 📊 puedes ver la lista exacta.

**Sin repeticiones dentro de una ronda.** Una pregunta ya vista no vuelve a salir en la misma batalla
mientras queden otras disponibles. Todos los juegos tienen banco suficiente para una ronda entera en
los tres niveles; si alguno se quedara corto al añadir contenido, la comprobación está en la última
sección de este README.

## Los 32 juegos

### 🇩🇪 Alemán — de las Lecciones 01 a 14
| Juego | Qué entrena |
|-------|-------------|
| 🎯 **Der · Die · Das** | El género de ~115 sustantivos, con las pistas de terminación (-ung, -chen, -ling…) y las trampas (die Sonne, der Mond, das Mädchen) |
| ⚡ **Conjugación relámpago** | 29 verbos: *sein*, *haben*, regulares, variaciones ortográficas (*du arbeitest*, *du heißt*) y los 6 modales |
| 📖 **Vocabulario** | ~130 entradas en las dos direcciones (que es lo que de verdad fija) |
| 🧩 **Arma la frase** | Verbo en 2ª posición, inversión, TeKaMoLo, paréntesis verbal y Perfekt — colocando las piezas |
| ⚔️ **Casos y reglas** | Akkusativ, Dativ, *nicht* vs *kein*, DOGFU, modales, separables y los 47 participios con su auxiliar |

### 🇸🇦 Árabe fusha — de las Lecciones 01 a 18
| Juego | Qué entrena |
|-------|-------------|
| 🗺️ **Caza la letra** | Te doy nombre y sonido, encuentras la letra en una rejilla de 6, 12 o 20. *El juego de las capitales, con el alfabeto árabe* |
| 🔗 **Formas conectadas** | Las 4 formas de cada letra: inicial, medial, final — y al revés |
| 👁️ **Lectura vocalizada** | Harakat, sukun, shadda, tanwin y ة sobre 30 palabras reales |
| 🌞 **Solar o lunar** | 34 palabras con الـ: ¿se dice *al-* o se funde? Y las 28 letras clasificadas |
| 💬 **Vocabulario y frases** | Las ~100 primeras palabras y las 15 frases hechas de cortesía |
| 🏛️ **Gramática y verbos** | Frase nominal, género (incluidos los femeninos que engañan), demostrativos, números ١٢٣, colores y 7 verbos en pasado completos |

### 📈 Finanzas cuantitativas — Guía de Shreve, Vol. I y II
| Juego | Qué entrena |
|-------|-------------|
| 🧠 **Conceptos clave** | 46 conceptos capítulo por capítulo: arbitraje, martingala, Radon–Nikodym, Girsanov, Feynman–Kac, numerario, envoltura de Snell, saltos |
| 🔣 **Fórmula rota** | 22 fórmulas con una pieza faltante: p̃, delta, Itô, d±, Θ, Vasicek, reflexión |
| 🧮 **Sala de cálculo** | **Problemas numéricos generados al azar**: nunca se repiten. p̃, delta, precio binomial, bonos, forward, Black–Scholes, put perpetuo, tasas forward, barreras, Poisson. Con la resolución paso a paso al terminar |
| ⚖️ **Verdadero o falso** | 30 afirmaciones que suenan bien pero no siempre lo son |
| 🪜 **Secuencia lógica** | Ordena los pasos de una deducción completa. Aquí se ve si entendiste el argumento, no si te lo memorizaste |

### 🧮 Matemáticas — cálculo, EDO y álgebra lineal
| Juego | Qué entrena |
|-------|-------------|
| 📉 **Derivadas** | La tabla completa (potencias, exponenciales, logaritmos, trigonométricas, inversas) más producto, cociente, cadena, Taylor y parciales. En difícil también al revés: te doy la derivada y buscas la función |
| ∫ **Integrales** | Primitivas de memoria y la decisión que de verdad importa: ¿sustitución, por partes (ILATE) o fracciones parciales? Incluye impropias y la integral que no tiene primitiva elemental |
| 🌀 **Ecuaciones diferenciales** | Clasificar (orden, lineal, separable, exacta), separación de variables, factor integrante, los tres casos de segundo orden, superposición y las EDP (calor y Black–Scholes) |
| 🧱 **Álgebra lineal** | Independencia, base, rango-nulidad, determinantes, inversas, autovalores, diagonalización, teorema espectral, Gram–Schmidt, Cholesky y SVD |
| 🧮 **Sala de cálculo** | **Problemas numéricos generados al azar**: derivadas en un punto, integrales definidas, cadena, sustitución, por partes, determinantes 2×2 y 3×3, autovalores, inversas, proyecciones, EDO de primer y segundo orden. Con la resolución paso a paso |
| ⚖️ **Verdadero o falso** | 18 afirmaciones que suenan razonables y no lo son. Caza intuiciones falsas |
| 🪜 **Método paso a paso** | Ordena las etapas de un método completo: factor integrante, integración por partes, diagonalizar, Gram–Schmidt, eliminación gaussiana |

### ⚗️ Química — los 118 elementos y la lógica de la tabla
| Juego | Qué entrena |
|-------|-------------|
| 🔤 **Símbolo ⇄ nombre** | En las dos direcciones. Fácil llega hasta el Z=36, intermedio hasta el 86 y difícil abarca los 118 |
| 🎫 **Ficha del elemento** | Número atómico, peso, periodo, bloque, estado a 25 °C y familia. En difícil, Z y peso se escriben a mano |
| 🧠 **Cómo funciona la tabla** | 39 conceptos: periodicidad, radios, electronegatividad, orbitales, Hund, Pauli, enlaces, moles y redox |
| ⚖️ **Verdadero o falso** | 20 trampas clásicas: el hidrógeno, los isótopos, el osmio, el cobre y el teluro |

### 🌍 Geografía — países, capitales y banderas
| Juego | Qué entrena |
|-------|-------------|
| 🏛️ **Capitales** | País → capital y capital → país. En difícil se escribe la capital de memoria |
| 🚩 **Banderas** | Reconoce la bandera y elige el país, o al revés. Las banderas van dibujadas |
| 🧭 **¿Dónde está?** | Coloca cada país en su continente |
| 🌐 **El mundo en datos** | 25 preguntas de ríos, cordilleras, océanos, coordenadas y récords |
| ⚖️ **Verdadero o falso** | 20 confusiones típicas: Sídney, Estambul, Río, Zúrich y Toronto |

El último apunte del mundo, **🌉 El puente hacia Shreve**, marca los cinco puntos exactos donde estas
matemáticas se convierten en finanzas cuantitativas (Taylor → Itô, EDO lineal → descuento,
calor → Black–Scholes, integral sin primitiva → la N, covarianza → Cholesky).

## Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `1` – `6` | Responder / colocar pieza |
| `Enter` | Comprobar y continuar |
| `Esc` | Volver atrás (de la batalla, la lectura, el índice o el perfil) y cerrar «A tu medida» |

## Si quiero añadir contenido

Todo el material está en `datos/` en español y en formato legible. Añadir una palabra, una regla o
un concepto es agregar una línea al array correspondiente — la lógica del juego no se toca.

- `datos/aleman.js` → `sustantivos`, `verbos`, `partizip`, `vocab`, `frases`, `gramatica`
- `datos/arabe.js` → `letras`, `marcas`, `vocab`, `frases`, `lectura`, `articulo`, `verbos`, `numeros`, `colores`, `gramatica`
- `datos/finanzas.js` → `conceptos`, `formulas`, `vf`, `secuencias`
- `datos/matematicas.js` → `derivadas`, `integrales`, `reglas`, `edo`, `lineal`, `vf`, `secuencias`
- `datos/quimica.js` → tabla `E` de los 118 elementos (`[Z, símbolo, nombre, masa, categoría, config, estado, dato]`), más `conceptos` y `vf`
- `datos/geografia.js` → tabla `CRUDO` de países (`[nombre, capital, continente, lat, lon, bandera]`), `conceptos` y `vf`
- `datos/mapa-mundi.js` → contornos de los países en SVG, generados desde Natural Earth 1:50m
  (dominio público) en proyección equirectangular 720×360, con `areas` y `cajas` de cada uno

El campo `n` de cada entrada es su nivel (1 fácil, 2 intermedio, 3 difícil).
Los problemas de cálculo son generadores en `js/juegos.js` (objetos `PROBLEMAS` y `PROB_MAT`).

**La posición de cada elemento en la tabla periódica no se escribe**: la calcula la función `pos(z)`
de `datos/quimica.js` a partir del número atómico. Un elemento nuevo solo necesita su fila de datos.

**Las banderas** se describen con constructores compactos en `datos/geografia.js`:
`h(...)` y `v(...)` para franjas horizontales o verticales, `hw(colores, pesos)` cuando no son
iguales, y `o(base, ...capas)` para añadir círculos `C`, rectángulos `RE`, polígonos `P`,
estrellas `S`, arcos de estrellas `A`, medias lunas `MC`, cruces nórdicas `N` o el Union Jack `UJ`.
El intérprete que las convierte en SVG está en `js/especiales.js` (función `capa`).

**Los apuntes** viven aparte, en `datos/apuntes-*.js`, uno por mundo (más `datos/ejercicios-*.js`,
que hacen `push` sobre el array del mundo). Cada apunte es
`{id, t: título, emo, res: resumen, min, secciones:[{h: encabezado, c: HTML}]}`. Dentro del HTML
se pueden usar las clases `formula`, `tabla` y `tip` (el recuadro amarillo de aviso), y `ar` para
texto en árabe. Añadir un apunte es añadir un objeto al array: no hay que tocar nada más.

**Un ejercicio resuelto** es este bloque dentro del HTML de una sección:

```html
<div class="ejer">
  <div class="ejer-enun">El enunciado.</div>
  <details><summary>Ver el proceso</summary>
    <ol class="pasos-res"><li><b>Paso.</b> Explicación.</li></ol>
    <div class="resultado-ej">El resultado</div>
    <p class="tip">💡 El error clásico de este tipo de ejercicio.</p>
  </details>
</div>
```

⚠️ Como la app se abre con `file://`, **`fetch` está bloqueado**: todo el contenido tiene que
cargarse con `<script src>` asignando a `window.X`, nunca como JSON.

### Comprobar que ningún juego se queda sin preguntas

Cada ronda son 10, 12 o 14 preguntas según el nivel, y no se repite ninguna. Si un banco tiene menos
ítems que eso, la ronda acaba repitiendo. Para verificarlo tras añadir contenido, desde esta carpeta:

```bash
node -e "
const vm=require('vm'),fs=require('fs');const store={};
const ctx={localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v},setTimeout,clearTimeout,console,Math,JSON,Date};
ctx.window=ctx; vm.createContext(ctx);
for(const f of ['datos/aleman.js','datos/arabe.js','datos/finanzas.js','datos/matematicas.js',
                'datos/quimica.js','datos/geografia.js',
                'js/motor.js','js/juegos.js','js/especiales.js'])
  vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const J=vm.runInContext('Juegos',ctx);
const NIV={1:10,2:12,3:14}; let malos=0;
for(const j of J.JUEGOS) for(const n of [1,2,3]){
  const s=new Set(); for(let i=0;i<8000;i++) s.add(j.gen(n).id);
  if(s.size<NIV[n]){ malos++; console.log('  X '+j.id+' n'+n+': '+s.size+' / ronda '+NIV[n]); }
}
console.log(malos?malos+' bancos cortos':'OK: los '+J.JUEGOS.length+' juegos alcanzan');
"
```

⚠️ Ojo con `ctx.window=ctx` y con leer `Juegos` mediante `vm.runInContext`: los datos se cuelgan de
`window`, pero `const Juegos = …` de los módulos **no** aparece como propiedad del objeto global.

Si algún juego sale corto, hay dos arreglos: añadir ítems con `n:1` a su array, o pasarle un mínimo
al filtro de nivel — `porNivel(pool, nivel, 16)` — para que abra el banco entero en los niveles bajos
en vez de repetir.
