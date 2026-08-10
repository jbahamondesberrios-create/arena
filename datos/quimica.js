/* ============================================================
   QUÍMICA — los 118 elementos + conceptos de la tabla periódica
   Formato compacto: [Z, símbolo, nombre, masa, categoría, config, estado, dato]
   La posición (x,y) en la tabla se calcula, no se escribe.
   ============================================================ */

(() => {

const E = [
[1,"H","Hidrógeno",1.008,"nometal","1s¹","gas","El 90 % de los átomos del universo son de hidrógeno."],
[2,"He","Helio",4.0026,"noble","1s²","gas","Se descubrió en el Sol antes que en la Tierra."],
[3,"Li","Litio",6.94,"alcalino","[He]2s¹","sólido","El metal más ligero: flota en el agua… mientras reacciona con ella."],
[4,"Be","Berilio",9.0122,"alcalinoterreo","[He]2s²","sólido","Transparente a los rayos X: se usa en ventanas de detectores."],
[5,"B","Boro",10.81,"metaloide","[He]2s²2p¹","sólido","Absorbe neutrones: barras de control en reactores."],
[6,"C","Carbono",12.011,"nometal","[He]2s²2p²","sólido","Grafito y diamante son el mismo elemento con distinta estructura."],
[7,"N","Nitrógeno",14.007,"nometal","[He]2s²2p³","gas","78 % del aire. Su triple enlace es de los más fuertes que existen."],
[8,"O","Oxígeno",15.999,"nometal","[He]2s²2p⁴","gas","El elemento más abundante de la corteza terrestre."],
[9,"F","Flúor",18.998,"halogeno","[He]2s²2p⁵","gas","El elemento más electronegativo de todos (4,0 en Pauling)."],
[10,"Ne","Neón",20.180,"noble","[He]2s²2p⁶","gas","El rojo-naranja de los letreros luminosos."],
[11,"Na","Sodio",22.990,"alcalino","[Ne]3s¹","sólido","Se corta con cuchillo y arde al tocar el agua."],
[12,"Mg","Magnesio",24.305,"alcalinoterreo","[Ne]3s²","sólido","El átomo central de la clorofila."],
[13,"Al","Aluminio",26.982,"postransicion","[Ne]3s²3p¹","sólido","El metal más abundante de la corteza; en 1850 valía más que el oro."],
[14,"Si","Silicio",28.085,"metaloide","[Ne]3s²3p²","sólido","La base de toda la electrónica y del vidrio."],
[15,"P","Fósforo",30.974,"nometal","[Ne]3s²3p³","sólido","El fósforo blanco arde solo al contacto con el aire."],
[16,"S","Azufre",32.06,"nometal","[Ne]3s²3p⁴","sólido","Amarillo, quebradizo, y el olor de los volcanes."],
[17,"Cl","Cloro",35.45,"halogeno","[Ne]3s²3p⁵","gas","Gas verde-amarillo; con sodio forma la sal de mesa."],
[18,"Ar","Argón",39.95,"noble","[Ne]3s²3p⁶","gas","1 % del aire: el gas noble más abundante en la Tierra."],
[19,"K","Potasio",39.098,"alcalino","[Ar]4s¹","sólido","Imprescindible para el impulso nervioso."],
[20,"Ca","Calcio",40.078,"alcalinoterreo","[Ar]4s²","sólido","El 99 % del calcio de tu cuerpo está en huesos y dientes."],
[21,"Sc","Escandio",44.956,"transicion","[Ar]3d¹4s²","sólido","Mendeléiev predijo su existencia y sus propiedades antes de hallarlo."],
[22,"Ti","Titanio",47.867,"transicion","[Ar]3d²4s²","sólido","Tan fuerte como el acero pero un 45 % más ligero."],
[23,"V","Vanadio",50.942,"transicion","[Ar]3d³4s²","sólido","Sus disoluciones cambian de color según el estado de oxidación."],
[24,"Cr","Cromo",51.996,"transicion","[Ar]3d⁵4s¹","sólido","Excepción al llenado: prefiere 3d⁵4s¹ (subcapa semillena)."],
[25,"Mn","Manganeso",54.938,"transicion","[Ar]3d⁵4s²","sólido","El permanganato (MnO₄⁻) es de un violeta intensísimo."],
[26,"Fe","Hierro",55.845,"transicion","[Ar]3d⁶4s²","sólido","El núcleo más estable: por eso las estrellas se apagan en hierro."],
[27,"Co","Cobalto",58.933,"transicion","[Ar]3d⁷4s²","sólido","Da el azul del vidrio cobalto y está en la vitamina B12."],
[28,"Ni","Níquel",58.693,"transicion","[Ar]3d⁸4s²","sólido","Pesa menos que el cobalto aunque su Z sea mayor."],
[29,"Cu","Cobre",63.546,"transicion","[Ar]3d¹⁰4s¹","sólido","Segundo mejor conductor eléctrico, tras la plata."],
[30,"Zn","Zinc",65.38,"transicion","[Ar]3d¹⁰4s²","sólido","Galvanizar = cubrir de zinc para que se oxide él y no el hierro."],
[31,"Ga","Galio",69.723,"postransicion","[Ar]3d¹⁰4s²4p¹","sólido","Se funde en la mano: su punto de fusión es 29,8 °C."],
[32,"Ge","Germanio",72.630,"metaloide","[Ar]3d¹⁰4s²4p²","sólido","El primer transistor de la historia era de germanio, no de silicio."],
[33,"As","Arsénico",74.922,"metaloide","[Ar]3d¹⁰4s²4p³","sólido","Sublima: pasa de sólido a gas sin ser líquido."],
[34,"Se","Selenio",78.971,"nometal","[Ar]3d¹⁰4s²4p⁴","sólido","Su conductividad depende de la luz: las primeras fotocélulas."],
[35,"Br","Bromo",79.904,"halogeno","[Ar]3d¹⁰4s²4p⁵","líquido","Junto al mercurio, el único elemento líquido a 25 °C."],
[36,"Kr","Kriptón",83.798,"noble","[Ar]3d¹⁰4s²4p⁶","gas","Durante años el metro se definió con una línea espectral suya."],
[37,"Rb","Rubidio",85.468,"alcalino","[Kr]5s¹","sólido","Se funde con el calor del cuerpo (39 °C)."],
[38,"Sr","Estroncio",87.62,"alcalinoterreo","[Kr]5s²","sólido","El rojo de los fuegos artificiales."],
[39,"Y","Itrio",88.906,"transicion","[Kr]4d¹5s²","sólido","Clave en los superconductores de alta temperatura (YBCO)."],
[40,"Zr","Circonio",91.224,"transicion","[Kr]4d²5s²","sólido","Casi no absorbe neutrones: vainas de combustible nuclear."],
[41,"Nb","Niobio",92.906,"transicion","[Kr]4d⁴5s¹","sólido","Los imanes del LHC son de niobio-titanio."],
[42,"Mo","Molibdeno",95.95,"transicion","[Kr]4d⁵5s¹","sólido","Otra excepción: 4d⁵5s¹."],
[43,"Tc","Tecnecio",98,"transicion","[Kr]4d⁵5s²","sintético","El primer elemento fabricado por el ser humano. Todo él es radiactivo."],
[44,"Ru","Rutenio",101.07,"transicion","[Kr]4d⁷5s¹","sólido","Endurece el platino y el paladio en aleaciones."],
[45,"Rh","Rodio",102.91,"transicion","[Kr]4d⁸5s¹","sólido","Más caro que el oro: catalizadores de coches."],
[46,"Pd","Paladio",106.42,"transicion","[Kr]4d¹⁰","sólido","El único elemento sin electrones s en su capa externa."],
[47,"Ag","Plata",107.87,"transicion","[Kr]4d¹⁰5s¹","sólido","El mejor conductor eléctrico y térmico que existe."],
[48,"Cd","Cadmio",112.41,"transicion","[Kr]4d¹⁰5s²","sólido","Tóxico y acumulativo; se usó en pigmentos amarillos."],
[49,"In","Indio",114.82,"postransicion","[Kr]4d¹⁰5s²5p¹","sólido","El ITO de las pantallas táctiles es óxido de indio y estaño."],
[50,"Sn","Estaño",118.71,"postransicion","[Kr]4d¹⁰5s²5p²","sólido","Cobre + estaño = bronce, la aleación que dio nombre a una era."],
[51,"Sb","Antimonio",121.76,"metaloide","[Kr]4d¹⁰5s²5p³","sólido","Su símbolo Sb viene del latín stibium."],
[52,"Te","Telurio",127.60,"metaloide","[Kr]4d¹⁰5s²5p⁴","sólido","Pesa más que el yodo aunque va antes: por eso Mendeléiev ordenó por propiedades."],
[53,"I","Yodo",126.90,"halogeno","[Kr]4d¹⁰5s²5p⁵","sólido","Sublima en vapores violetas. Esencial para la tiroides."],
[54,"Xe","Xenón",131.29,"noble","[Kr]4d¹⁰5s²5p⁶","gas","Rompió el mito: sí forma compuestos (XeF₄, 1962)."],
[55,"Cs","Cesio",132.91,"alcalino","[Xe]6s¹","sólido","El segundo se define con la frecuencia del cesio-133."],
[56,"Ba","Bario",137.33,"alcalinoterreo","[Xe]6s²","sólido","El «papilla de bario» de las radiografías es sulfato, insoluble."],
[57,"La","Lantano",138.91,"lantanido","[Xe]5d¹6s²","sólido","Da nombre a toda la serie de las tierras raras."],
[58,"Ce","Cerio",140.12,"lantanido","[Xe]4f¹5d¹6s²","sólido","La tierra rara más abundante, tanto como el cobre."],
[59,"Pr","Praseodimio",140.91,"lantanido","[Xe]4f³6s²","sólido","Tiñe de verde el vidrio de las gafas de soldador."],
[60,"Nd","Neodimio",144.24,"lantanido","[Xe]4f⁴6s²","sólido","Los imanes más potentes del mundo (NdFeB)."],
[61,"Pm","Prometio",145,"lantanido","[Xe]4f⁵6s²","sintético","La única tierra rara sin isótopos estables."],
[62,"Sm","Samario",150.36,"lantanido","[Xe]4f⁶6s²","sólido","Imanes SmCo que aguantan altísimas temperaturas."],
[63,"Eu","Europio",151.96,"lantanido","[Xe]4f⁷6s²","sólido","Fluoresce en los billetes de euro como marca antifalsificación."],
[64,"Gd","Gadolinio",157.25,"lantanido","[Xe]4f⁷5d¹6s²","sólido","Contraste de las resonancias magnéticas."],
[65,"Tb","Terbio",158.93,"lantanido","[Xe]4f⁹6s²","sólido","El verde de los tubos de rayos catódicos."],
[66,"Dy","Disprosio",162.50,"lantanido","[Xe]4f¹⁰6s²","sólido","Su nombre significa «difícil de obtener» en griego."],
[67,"Ho","Holmio",164.93,"lantanido","[Xe]4f¹¹6s²","sólido","El momento magnético más alto de todos los elementos."],
[68,"Er","Erbio",167.26,"lantanido","[Xe]4f¹²6s²","sólido","Amplifica la señal en la fibra óptica intercontinental."],
[69,"Tm","Tulio",168.93,"lantanido","[Xe]4f¹³6s²","sólido","La tierra rara natural más escasa."],
[70,"Yb","Iterbio",173.05,"lantanido","[Xe]4f¹⁴6s²","sólido","Relojes atómicos aún más precisos que los de cesio."],
[71,"Lu","Lutecio",174.97,"lantanido","[Xe]4f¹⁴5d¹6s²","sólido","El más duro y denso de los lantánidos."],
[72,"Hf","Hafnio",178.49,"transicion","[Xe]4f¹⁴5d²6s²","sólido","Justo lo contrario del circonio: devora neutrones."],
[73,"Ta","Tantalio",180.95,"transicion","[Xe]4f¹⁴5d³6s²","sólido","Los condensadores de tu móvil llevan tantalio."],
[74,"W","Wolframio",183.84,"transicion","[Xe]4f¹⁴5d⁴6s²","sólido","El punto de fusión más alto de todos los metales: 3422 °C."],
[75,"Re","Renio",186.21,"transicion","[Xe]4f¹⁴5d⁵6s²","sólido","El último elemento estable en ser descubierto (1925)."],
[76,"Os","Osmio",190.23,"transicion","[Xe]4f¹⁴5d⁶6s²","sólido","El elemento más denso: 22,59 g/cm³."],
[77,"Ir","Iridio",192.22,"transicion","[Xe]4f¹⁴5d⁷6s²","sólido","La capa de iridio en el suelo delató el meteorito que mató a los dinosaurios."],
[78,"Pt","Platino",195.08,"transicion","[Xe]4f¹⁴5d⁹6s¹","sólido","Tan inerte que no lo ataca ningún ácido salvo el agua regia."],
[79,"Au","Oro",196.97,"transicion","[Xe]4f¹⁴5d¹⁰6s¹","sólido","Su color amarillo es un efecto relativista de sus electrones."],
[80,"Hg","Mercurio",200.59,"transicion","[Xe]4f¹⁴5d¹⁰6s²","líquido","El único metal líquido a temperatura ambiente."],
[81,"Tl","Talio",204.38,"postransicion","[Xe]4f¹⁴5d¹⁰6s²6p¹","sólido","Insípido y letal: el veneno favorito de las novelas policiales."],
[82,"Pb","Plomo",207.2,"postransicion","[Xe]4f¹⁴5d¹⁰6s²6p²","sólido","Final de todas las cadenas de desintegración naturales."],
[83,"Bi","Bismuto",208.98,"postransicion","[Xe]4f¹⁴5d¹⁰6s²6p³","sólido","Se creyó estable hasta 2003: su vida media supera la edad del universo."],
[84,"Po","Polonio",209,"metaloide","[Xe]4f¹⁴5d¹⁰6s²6p⁴","sólido","El primer elemento que descubrió Marie Curie, y lo llamó por Polonia."],
[85,"At","Astato",210,"halogeno","[Xe]4f¹⁴5d¹⁰6s²6p⁵","sintético","El elemento natural más raro: hay menos de 30 g en toda la corteza."],
[86,"Rn","Radón",222,"noble","[Xe]4f¹⁴5d¹⁰6s²6p⁶","gas","Gas noble radiactivo que se filtra desde el suelo a los sótanos."],
[87,"Fr","Francio",223,"alcalino","[Rn]7s¹","sintético","El más inestable de los 92 primeros: su isótopo mejor dura 22 minutos."],
[88,"Ra","Radio",226,"alcalinoterreo","[Rn]7s²","sólido","Brilla en la oscuridad; se pintaban relojes con él hasta que enfermaron las obreras."],
[89,"Ac","Actinio",227,"actinido","[Rn]6d¹7s²","sólido","Da nombre a la serie de los actínidos."],
[90,"Th","Torio",232.04,"actinido","[Rn]6d²7s²","sólido","Combustible nuclear alternativo, tres veces más abundante que el uranio."],
[91,"Pa","Protactinio",231.04,"actinido","[Rn]5f²6d¹7s²","sólido","Se desintegra en actinio: de ahí el «prot-»."],
[92,"U","Uranio",238.03,"actinido","[Rn]5f³6d¹7s²","sólido","El elemento natural más pesado en cantidad apreciable."],
[93,"Np","Neptunio",237,"actinido","[Rn]5f⁴6d¹7s²","sintético","El primer transuránico, bautizado como el planeta tras Urano."],
[94,"Pu","Plutonio",244,"actinido","[Rn]5f⁶7s²","sintético","Un kilo libera la energía de 20 000 toneladas de TNT."],
[95,"Am","Americio",243,"actinido","[Rn]5f⁷7s²","sintético","Tu detector de humo lleva una pizca de americio-241."],
[96,"Cm","Curio",247,"actinido","[Rn]5f⁷6d¹7s²","sintético","Nombrado por Marie y Pierre Curie."],
[97,"Bk","Berkelio",247,"actinido","[Rn]5f⁹7s²","sintético","Por Berkeley, donde se sintetizó casi toda esta fila."],
[98,"Cf","Californio",251,"actinido","[Rn]5f¹⁰7s²","sintético","Emite tantos neutrones que sirve para arrancar reactores."],
[99,"Es","Einstenio",252,"actinido","[Rn]5f¹¹7s²","sintético","Apareció en los restos de la primera bomba de hidrógeno."],
[100,"Fm","Fermio",257,"actinido","[Rn]5f¹²7s²","sintético","El último que se puede fabricar por captura de neutrones."],
[101,"Md","Mendelevio",258,"actinido","[Rn]5f¹³7s²","sintético","En honor a Mendeléiev, el padre de la tabla."],
[102,"No","Nobelio",259,"actinido","[Rn]5f¹⁴7s²","sintético","Su descubrimiento fue disputado durante veinte años."],
[103,"Lr","Lawrencio",266,"actinido","[Rn]5f¹⁴7s²7p¹","sintético","Cierra los actínidos; rompe el patrón con un electrón 7p."],
[104,"Rf","Rutherfordio",267,"transicion","[Rn]5f¹⁴6d²7s²","sintético","Primer transactínido. Dura segundos."],
[105,"Db","Dubnio",268,"transicion","[Rn]5f¹⁴6d³7s²","sintético","Por Dubna, el laboratorio ruso rival de Berkeley."],
[106,"Sg","Seaborgio",269,"transicion","[Rn]5f¹⁴6d⁴7s²","sintético","Único elemento nombrado por alguien vivo en ese momento."],
[107,"Bh","Bohrio",270,"transicion","[Rn]5f¹⁴6d⁵7s²","sintético","Por Niels Bohr y su modelo atómico."],
[108,"Hs","Hassio",269,"transicion","[Rn]5f¹⁴6d⁶7s²","sintético","Por Hesse, el estado alemán donde se creó."],
[109,"Mt","Meitnerio",278,"transicion","[Rn]5f¹⁴6d⁷7s²","sintético","Por Lise Meitner, que explicó la fisión nuclear."],
[110,"Ds","Darmstatio",281,"transicion","[Rn]5f¹⁴6d⁸7s²","sintético","Por Darmstadt, donde se sintetizaron seis elementos."],
[111,"Rg","Roentgenio",282,"transicion","[Rn]5f¹⁴6d⁹7s²","sintético","Por Röntgen, el de los rayos X."],
[112,"Cn","Copernicio",285,"transicion","[Rn]5f¹⁴6d¹⁰7s²","sintético","Se sospecha que sería gas: efectos relativistas extremos."],
[113,"Nh","Nihonio",286,"postransicion","[Rn]5f¹⁴6d¹⁰7s²7p¹","sintético","Primer elemento descubierto en Asia (Nihon = Japón)."],
[114,"Fl","Flerovio",289,"postransicion","[Rn]5f¹⁴6d¹⁰7s²7p²","sintético","Candidato a la «isla de estabilidad»."],
[115,"Mc","Moscovio",290,"postransicion","[Rn]5f¹⁴6d¹⁰7s²7p³","sintético","Por la región de Moscú."],
[116,"Lv","Livermorio",293,"postransicion","[Rn]5f¹⁴6d¹⁰7s²7p⁴","sintético","Por el laboratorio Lawrence Livermore."],
[117,"Ts","Teneso",294,"halogeno","[Rn]5f¹⁴6d¹⁰7s²7p⁵","sintético","Por Tennessee. El halógeno más pesado… en teoría."],
[118,"Og","Oganesón",294,"noble","[Rn]5f¹⁴6d¹⁰7s²7p⁶","sintético","El último de la tabla. Solo se han fabricado unos pocos átomos."]
];

/* posición en la rejilla estándar de 18 columnas */
function pos(z){
  if(z === 1) return [1,1];
  if(z === 2) return [18,1];
  if(z <= 4)   return [z-2, 2];
  if(z <= 10)  return [z+8, 2];
  if(z <= 12)  return [z-10, 3];
  if(z <= 18)  return [z, 3];
  if(z <= 36)  return [z-18, 4];
  if(z <= 54)  return [z-36, 5];
  if(z <= 56)  return [z-54, 6];
  if(z <= 71)  return [z-54, 9];    /* lantánidos: fila aparte */
  if(z <= 86)  return [z-68, 6];
  if(z <= 88)  return [z-86, 7];
  if(z <= 103) return [z-86, 10];   /* actínidos */
  return [z-100, 7];
}

function periodo(z){
  const [x,y] = pos(z);
  if(y === 9)  return 6;
  if(y === 10) return 7;
  return y;
}

function grupo(z){
  const [x,y] = pos(z);
  if(y === 9 || y === 10) return null;   /* el bloque f no tiene grupo numerado */
  return x;
}

function bloque(z){
  const [x,y] = pos(z);
  if(y === 9 || y === 10) return "f";
  if(z === 2) return "s";
  if(x <= 2) return "s";
  if(x >= 13) return "p";
  return "d";
}

const CATEGORIAS = {
  alcalino:        {nombre:"Metal alcalino",        color:"#f0743a"},
  alcalinoterreo:  {nombre:"Alcalinotérreo",        color:"#e8a33d"},
  transicion:      {nombre:"Metal de transición",   color:"#4f9de0"},
  postransicion:   {nombre:"Metal del bloque p",    color:"#5fbfa8"},
  metaloide:       {nombre:"Metaloide",             color:"#8b78e6"},
  nometal:         {nombre:"No metal",              color:"#3fb27f"},
  halogeno:        {nombre:"Halógeno",              color:"#d3577f"},
  noble:           {nombre:"Gas noble",             color:"#7d8fd6"},
  lantanido:       {nombre:"Lantánido",             color:"#c46bb0"},
  actinido:        {nombre:"Actínido",              color:"#b5776a"}
};

const elementos = E.map(r => {
  const [x,y] = pos(r[0]);
  return {
    z:r[0], s:r[1], n:r[2], m:r[3], cat:r[4], e:r[5], est:r[6], d:r[7],
    x, y, periodo:periodo(r[0]), grupo:grupo(r[0]), bloque:bloque(r[0])
  };
});

/* nombres de las familias por grupo, para el modo estudio */
const FAMILIAS = {
  1:"Alcalinos (menos el H)", 2:"Alcalinotérreos", 3:"Familia del escandio",
  4:"Familia del titanio", 5:"Familia del vanadio", 6:"Familia del cromo",
  7:"Familia del manganeso", 8:"Familia del hierro", 9:"Familia del cobalto",
  10:"Familia del níquel", 11:"Metales de acuñar", 12:"Familia del zinc",
  13:"Térreos / familia del boro", 14:"Carbonoideos", 15:"Nitrogenoideos",
  16:"Calcógenos / anfígenos", 17:"Halógenos", 18:"Gases nobles"
};

/* ---------------------------------------------------------------
   Preguntas conceptuales (para los juegos normales del mundo)
   n = nivel (1 fácil, 2 intermedio, 3 difícil)
   --------------------------------------------------------------- */
const conceptos = [
{q:"¿Qué ordena de verdad la tabla periódica moderna?", r:"El número atómico Z (protones)",
 d:["La masa atómica","El número de neutrones","La fecha de descubrimiento"], n:1,
 nota:"Mendeléiev ordenó por masa y tuvo que hacer excepciones (Te antes que I). Moseley demostró en 1913 que el orden real es por carga nuclear."},
{q:"¿Qué comparten todos los elementos de un mismo grupo (columna)?", r:"El número de electrones de valencia",
 d:["El número de capas","La masa atómica","El estado físico"], n:1,
 nota:"Misma configuración externa ⇒ química parecida. Por eso Li, Na y K reaccionan igual con el agua."},
{q:"¿Qué comparten los elementos de un mismo periodo (fila)?", r:"El número de capas electrónicas",
 d:["Los electrones de valencia","La electronegatividad","La valencia típica"], n:1,
 nota:"El periodo n indica cuántos niveles de energía hay ocupados."},
{q:"Al bajar en un grupo, el radio atómico…", r:"aumenta",
 d:["disminuye","no cambia","primero baja y luego sube"], n:1,
 nota:"Cada periodo añade una capa entera. Más capas = átomo más grande."},
{q:"Al avanzar hacia la derecha en un periodo, el radio atómico…", r:"disminuye",
 d:["aumenta","no cambia","se duplica"], n:2,
 nota:"Se añaden protones a la misma capa: la carga nuclear efectiva tira más fuerte de los electrones y encoge el átomo."},
{q:"¿Dónde está el elemento más electronegativo?", r:"Arriba a la derecha (flúor)",
 d:["Abajo a la izquierda (francio)","En el centro (hierro)","En el bloque f"], n:1,
 nota:"La electronegatividad crece hacia arriba y hacia la derecha. Máximo: F = 4,0. Mínimo: Fr/Cs."},
{q:"¿Qué es la energía de ionización?", r:"La energía para arrancar un electrón",
 d:["La energía para añadir un electrón","La energía de un enlace","El calor de formación"], n:2,
 nota:"Crece hacia arriba y hacia la derecha, igual que la electronegatividad. Los gases nobles tienen la más alta de su periodo."},
{q:"¿Por qué los gases nobles casi no reaccionan?", r:"Tienen la capa de valencia completa",
 d:["Son muy pesados","No tienen electrones","Su núcleo es inestable"], n:1,
 nota:"ns²np⁶ (8 electrones) es una configuración de energía muy baja. El helio la logra con solo 1s²."},
{q:"¿Qué bloque ocupa el grupo de los metales de transición?", r:"Bloque d",
 d:["Bloque s","Bloque p","Bloque f"], n:2,
 nota:"Grupos 3 a 12: se está llenando el orbital d de la capa n−1."},
{q:"Lantánidos y actínidos pertenecen al…", r:"bloque f",
 d:["bloque d","bloque p","bloque s"], n:2,
 nota:"14 elementos por serie, correspondientes a los 7 orbitales f (14 electrones)."},
{q:"¿Cuántos electrones caben en un subnivel p?", r:"6", d:["2","10","14"], n:2,
 nota:"3 orbitales p × 2 electrones cada uno. s→2, p→6, d→10, f→14."},
{q:"¿Cuántos electrones caben en un subnivel d?", r:"10", d:["6","2","14"], n:2,
 nota:"5 orbitales d × 2. Por eso los metales de transición son 10 columnas."},
{q:"¿Qué dice el principio de exclusión de Pauli?", r:"Dos electrones no pueden tener los 4 números cuánticos iguales",
 d:["Los electrones llenan primero el nivel más bajo","Los orbitales degenerados se llenan de uno en uno","La energía está cuantizada"], n:3,
 nota:"Consecuencia directa: máximo 2 electrones por orbital, y con espines opuestos."},
{q:"¿Qué dice la regla de Hund?", r:"En orbitales de igual energía se coloca un electrón en cada uno antes de aparear",
 d:["Se llena primero el orbital de menor n","Ningún orbital puede tener 2 electrones","Los electrones giran en el mismo sentido"], n:3,
 nota:"Minimiza la repulsión. Es la razón de que Cr y Cu rompan el orden de llenado: 3d⁵ y 3d¹⁰ son especialmente estables."},
{q:"¿Por qué el cromo es [Ar]3d⁵4s¹ y no [Ar]3d⁴4s²?", r:"Una subcapa d semillena es más estable",
 d:["El 4s no existe en el cromo","Porque tiene 24 protones","Por el principio de Pauli"], n:3,
 nota:"Lo mismo le pasa al cobre: 3d¹⁰4s¹ (subcapa d llena). Son las dos excepciones que siempre caen en el examen."},
{q:"Un catión (ion positivo) respecto de su átomo neutro es…", r:"más pequeño",
 d:["más grande","del mismo tamaño","más pesado"], n:2,
 nota:"Perdió electrones: menos repulsión y a menudo una capa entera menos. Los aniones, al revés, son más grandes."},
{q:"¿Qué tipo de enlace se forma entre un metal y un no metal?", r:"Iónico",
 d:["Covalente","Metálico","De hidrógeno"], n:1,
 nota:"Gran diferencia de electronegatividad (>1,7 aprox.): el metal cede y el no metal capta. NaCl es el caso de manual."},
{q:"¿Qué explica que los metales conduzcan la electricidad?", r:"Sus electrones de valencia están deslocalizados",
 d:["Sus núcleos se mueven","Tienen muchos neutrones","Sus enlaces son iónicos"], n:2,
 nota:"El «mar de electrones»: los cationes forman una red fija y los electrones circulan libremente."},
{q:"Isótopos de un mismo elemento se diferencian en…", r:"el número de neutrones",
 d:["el número de protones","el número de electrones","la carga eléctrica"], n:1,
 nota:"Mismo Z, distinto A. El carbono-12 y el carbono-14 son los dos carbono, pero uno es radiactivo."},
{q:"¿Por qué la masa atómica del cloro es 35,45 y no un número entero?", r:"Es la media ponderada de sus isótopos",
 d:["Porque los protones no pesan 1","Por errores de medición","Porque incluye los electrones"], n:2,
 nota:"El cloro es ~75 % Cl-35 y ~25 % Cl-37. 0,75·35 + 0,25·37 ≈ 35,5."},
{q:"¿Qué es un mol?", r:"6,022×10²³ partículas", d:["1 gramo de sustancia","1 litro de gas","El peso de un átomo"], n:1,
 nota:"Número de Avogadro. Un mol de cualquier elemento pesa, en gramos, su masa atómica."},
{q:"¿Cuántos gramos pesa un mol de agua (H₂O)?", r:"18 g", d:["10 g","2 g","32 g"], n:2,
 nota:"2·1,008 + 15,999 ≈ 18,0 g/mol."},
{q:"¿Qué elemento tiene el punto de fusión más alto?", r:"Wolframio (W)", d:["Hierro (Fe)","Platino (Pt)","Osmio (Os)"], n:2,
 nota:"3422 °C. Por eso se usaba en los filamentos de las bombillas."},
{q:"¿Cuál es el elemento más denso?", r:"Osmio (Os)", d:["Plomo (Pb)","Oro (Au)","Uranio (U)"], n:3,
 nota:"22,59 g/cm³, seguido de cerca por el iridio. El plomo, con fama de pesado, se queda en 11,3."},
{q:"¿Qué dos elementos son líquidos a 25 °C?", r:"Mercurio y bromo", d:["Mercurio y galio","Bromo y yodo","Cesio y francio"], n:2,
 nota:"El galio y el cesio se funden con el calor de la mano, pero a 25 °C aún son sólidos."},
{q:"¿Qué grupo forma iones 2⁻ con facilidad?", r:"Grupo 16 (calcógenos)", d:["Grupo 1","Grupo 17","Grupo 18"], n:2,
 nota:"Les faltan 2 electrones para el octeto: O²⁻, S²⁻."},
{q:"El estado de oxidación típico de los alcalinos es…", r:"+1", d:["+2","−1","0"], n:1,
 nota:"Tienen un solo electrón de valencia (ns¹) y lo sueltan sin resistencia."},
{q:"¿Qué es la afinidad electrónica?", r:"La energía que se libera al captar un electrón",
 d:["La energía para arrancar un electrón","La fuerza de un enlace","El radio del anión"], n:3,
 nota:"Máxima en los halógenos: al capturar un electrón alcanzan configuración de gas noble."},
{q:"¿Qué predice la regla del octeto?", r:"Los átomos tienden a rodearse de 8 electrones de valencia",
 d:["Todo enlace tiene 8 electrones","Hay 8 grupos principales","Los orbitales son 8"], n:1,
 nota:"Funciona bien en el periodo 2. A partir del 3 hay excepciones (SF₆, PCl₅) porque entran los orbitales d."},
{q:"¿Cuál es el elemento más abundante del universo?", r:"Hidrógeno", d:["Helio","Oxígeno","Carbono"], n:1,
 nota:"~75 % de la masa bariónica. En la corteza terrestre, en cambio, gana el oxígeno."},
{q:"¿Y el más abundante en la corteza terrestre?", r:"Oxígeno", d:["Silicio","Hierro","Aluminio"], n:2,
 nota:"Casi la mitad en masa, casi todo en forma de silicatos. Le siguen Si, Al y Fe."},
{q:"¿Qué elemento se descubrió primero en el Sol que en la Tierra?", r:"Helio", d:["Hidrógeno","Neón","Argón"], n:2,
 nota:"En 1868, por una línea espectral desconocida durante un eclipse. De ahí su nombre: helios."},
{q:"El grupo 17 se llama…", r:"halógenos", d:["calcógenos","gases nobles","alcalinos"], n:1,
 nota:"«Formadores de sales»: con los metales dan haluros como NaCl o KBr."},
{q:"¿Qué elemento es la base de toda la química orgánica?", r:"Carbono", d:["Silicio","Nitrógeno","Oxígeno"], n:1,
 nota:"Forma 4 enlaces covalentes fuertes y cadenas indefinidamente largas: nada más en la tabla hace eso tan bien."},
{q:"En una reacción redox, el agente reductor…", r:"se oxida (cede electrones)",
 d:["se reduce (capta electrones)","no cambia","siempre es un no metal"], n:3,
 nota:"Regla nemotécnica: el reductor reduce a otro, y al hacerlo él se oxida. LEO says GER: Lose Electrons = Oxidation."},
{q:"¿Qué tienen en común Tc, Pm y todos los elementos con Z > 92?", r:"No tienen isótopos estables",
 d:["Son gases","Son metales de transición","Se descubrieron en el siglo XIX"], n:3,
 nota:"El tecnecio y el prometio son los dos huecos radiactivos dentro de la zona estable de la tabla."},
{q:"¿Qué mide la electronegatividad?", r:"La tendencia de un átomo a atraer los electrones del enlace",
 d:["La carga del núcleo","Cuántos electrones tiene","La energía de ionización"], n:1,
 nota:"Escala de Pauling: F 4,0 · O 3,5 · N 3,0 · C 2,5 · H 2,1. Si la diferencia es grande, el enlace es iónico."},
{q:"¿Cuántos elementos hay reconocidos oficialmente?", r:"118", d:["92","103","120"], n:1,
 nota:"Del hidrógeno (Z=1) al oganesón (Z=118). Los últimos cuatro se nombraron en 2016."},
{q:"¿Cuántos son de origen natural (no sintéticos)?", r:"Unos 94", d:["118","57","78"], n:3,
 nota:"Hasta el plutonio (Z=94) se encuentran en la naturaleza, aunque algunos en cantidades ínfimas. Del 95 en adelante, todos de laboratorio."}
];

/* Verdadero o falso */
const vf = [
{q:"El número atómico es el número de protones del núcleo.", v:true, n:1,
 nota:"Y en el átomo neutro coincide con el número de electrones."},
{q:"La masa atómica que aparece en la tabla es la de un solo átomo en gramos.", v:false, n:2,
 nota:"Es la masa media ponderada de los isótopos, en unidades de masa atómica (u) o en g/mol."},
{q:"El radio atómico aumenta al bajar en un grupo.", v:true, n:1,
 nota:"Cada periodo añade una capa completa."},
{q:"El radio atómico aumenta al avanzar hacia la derecha en un periodo.", v:false, n:2,
 nota:"Disminuye: más protones tirando de la misma capa."},
{q:"Todos los gases nobles son químicamente inertes en cualquier condición.", v:false, n:2,
 nota:"El xenón y el kriptón forman compuestos (XeF₄, KrF₂). El helio y el neón sí que son prácticamente inertes."},
{q:"El hidrógeno pertenece al grupo de los metales alcalinos.", v:false, n:2,
 nota:"Está en el grupo 1 por su configuración 1s¹, pero es un no metal. Es el rebelde de la tabla."},
{q:"El mercurio es el único metal líquido a temperatura ambiente.", v:true, n:1,
 nota:"El bromo también es líquido, pero es un no metal."},
{q:"Los isótopos de un elemento tienen distinto número de protones.", v:false, n:1,
 nota:"Distinto número de NEUTRONES. Si cambiaran los protones sería otro elemento."},
{q:"La energía de ionización crece de izquierda a derecha en un periodo.", v:true, n:2,
 nota:"Cuesta más arrancar un electrón cuando la carga nuclear efectiva es mayor."},
{q:"Los metales de transición ocupan el bloque d.", v:true, n:1,
 nota:"Grupos 3 a 12, llenando el orbital (n−1)d."},
{q:"Un anión es más pequeño que su átomo neutro.", v:false, n:2,
 nota:"Es más GRANDE: gana electrones y aumenta la repulsión entre ellos. El catión es el que encoge."},
{q:"El osmio es más denso que el plomo.", v:true, n:2,
 nota:"22,6 frente a 11,3 g/cm³: el doble. El plomo tiene fama inmerecida."},
{q:"Todos los elementos con Z mayor que 92 son artificiales.", v:true, n:2,
 nota:"Se detectan trazas naturales de Np y Pu, pero prácticamente todo lo que existe de ellos es de laboratorio."},
{q:"En un mismo grupo, los elementos tienen el mismo número de electrones de valencia.", v:true, n:1,
 nota:"Es exactamente lo que hace que se parezcan químicamente."},
{q:"Los lantánidos y los actínidos se dibujan aparte solo por comodidad tipográfica.", v:true, n:3,
 nota:"En la tabla «larga» de 32 columnas van insertados entre los grupos 2 y 3. Se sacan abajo para que quepa en una hoja."},
{q:"El flúor es el elemento más electronegativo de la tabla.", v:true, n:1,
 nota:"4,0 en la escala de Pauling. Nadie le arranca un electrón."},
{q:"El wolframio tiene el punto de fusión más alto de todos los elementos.", v:false, n:3,
 nota:"El más alto de todos los METALES. El carbono en forma de grafito sublima por encima, a unos 3600 °C."},
{q:"Un mol de cualquier elemento contiene el mismo número de átomos.", v:true, n:1,
 nota:"6,022×10²³. Lo que cambia es cuánto pesa ese mol."},
{q:"El cobre tiene configuración [Ar]3d⁹4s².", v:false, n:3,
 nota:"Es [Ar]3d¹⁰4s¹: la subcapa d llena gana. Misma excepción que el cromo."},
{q:"El teluro (Z=52) pesa más que el yodo (Z=53).", v:true, n:3,
 nota:"127,60 frente a 126,90. Fue la anomalía que obligó a ordenar por número atómico y no por masa."}
];

window.QUIMICA = {elementos, CATEGORIAS, FAMILIAS, conceptos, vf,
  porZ(z){ return elementos.find(e => e.z === z); },
  porSimbolo(s){ return elementos.find(e => e.s.toLowerCase() === String(s).toLowerCase()); }
};

})();
