/* ============================================================
   GEOGRAFÍA — países, capitales, banderas y mapa del mundo
   Las banderas se dibujan con SVG a partir de una descripción compacta.
   El mapa es una malla de puntos de tierra (proyección equirectangular).
   ============================================================ */

(() => {

/* ---------------------------------------------------------------
   Paleta y constructores de bandera
   Lienzo lógico: 60 × 40
   --------------------------------------------------------------- */
const W="#ffffff", K="#1a1a1a", R="#d7182a", G="#0a8f3c", Y="#f9d616",
      B="#0b4ea2", LB="#4c8fdc", SK="#8fbde8", O="#ee7c25", BR="#7b4a1e",
      MA="#8b1a2b", NV="#0a2351", GD="#c9a227", GY="#b9c0c8", TQ="#0aa3a3";

/* base: franjas horizontales / verticales (w = anchos relativos, opcional) */
const h  = (...c) => ({t:"h", c});
const v  = (...c) => ({t:"v", c});
const hw = (c, w) => ({t:"h", c, w});
const vw = (c, w) => ({t:"v", c, w});
const bg = c => ({t:"h", c:[c]});
/* añade capas encima de la base */
const o  = (base, ...capas) => (base.o = capas, base);

/* capas */
const C  = (cx,cy,r,f,st,sw) => ({k:"c", cx,cy,r,f,st,sw});          // círculo
const RE = (x,y,w,hh,f) => ({k:"r", x,y,w,h:hh,f});                   // rectángulo
const P  = (pts,f) => ({k:"p", pts, f});                              // polígono
const S  = (cx,cy,r,f,rot,st) => ({k:"s", cx,cy,r,f,rot,st});         // estrella 5 puntas
const A  = (cx,cy,rad,n,sr,f,ini,fin) => ({k:"a", cx,cy,rad,n,sr,f,ini,fin}); // arco de estrellas
const GR2= (x,y,w,hh,cols,rows,sr,f) => ({k:"gr", x,y,w,h:hh,cols,rows,sr,f}); // rejilla de estrellas
const T  = (t,f,size,cx,cy) => ({k:"t", t, f, size, cx, cy});         // texto / glifo
const LN = (x,y,n,gap,sr,f) => ({k:"ln", x,y,n,gap,sr,f});            // hilera de estrellas
const SC = (cx,cy,r,f) => ({k:"sc", cx,cy,r,f});                      // semicírculo (sol naciente)
const N  = (f,f2) => ({k:"n", f, f2});                                // cruz nórdica
const CR = (f) => ({k:"x", f});                                       // cruz centrada (Suiza)
const MC = (cx,cy,r,f,rot) => ({k:"m", cx,cy,r,f,rot});               // media luna
const UJ = (x,y,w,hh) => ({k:"uj", x,y,w,h:hh});                      // Union Jack

/* atajos frecuentes */
const lunaEstrella = (cx,cy,r,f) => [MC(cx,cy,r,f), S(cx+r*1.05,cy,r*0.5,f)];

/* ---------------------------------------------------------------
   PAÍSES  ·  [nombre, capital, continente, lat, lon, bandera]
   --------------------------------------------------------------- */
const AS="América del Sur", AN="América del Norte", EU="Europa",
      AF="África", AI="Asia", OC="Oceanía";

const CRUDO = [

/* ---------------- América del Sur ---------------- */
["Argentina","Buenos Aires",AS,-34.6,-58.4, o(h(SK,W,SK), T("☀","#e8b21a",13))],
["Bolivia","Sucre",AS,-19.0,-65.3, h(R,Y,G)],
["Brasil","Brasilia",AS,-15.8,-47.9, o(bg("#0a8f3c"), P("30,3 57,20 30,37 3,20",Y), C(30,20,7.6,"#0b4ea2"))],
["Chile","Santiago",AS,-33.4,-70.6, o(h(W,R), RE(0,0,20,20,B), S(10,10,6.4,W))],
["Colombia","Bogotá",AS,4.7,-74.1, hw([Y,B,R],[2,1,1])],
["Ecuador","Quito",AS,-0.2,-78.5, o(hw([Y,B,R],[2,1,1]), C(30,20,5,"#c8a34a"))],
["Guyana","Georgetown",AS,6.8,-58.2, o(bg(G), P("0,0 44,20 0,40",W), P("0,3.5 39,20 0,36.5",Y), P("0,0 23,20 0,40",K), P("0,3.5 20,20 0,36.5",R))],
["Paraguay","Asunción",AS,-25.3,-57.6, o(h(R,W,B), C(30,20,5,W,"#c8a34a",1.2), S(30,20,3,"#0a8f3c"))],
["Perú","Lima",AS,-12.0,-77.0, v(R,W,R)],
["Surinam","Paramaribo",AS,5.8,-55.2, o(hw([G,W,R,W,G],[2,1,4,1,2]), S(30,20,6,Y))],
["Uruguay","Montevideo",AS,-34.9,-56.2, o(h(W,B,W,B,W,B,W,B,W), RE(0,0,26,17.8,W), T("☀","#e8b21a",11,13,9.6))],
["Venezuela","Caracas",AS,10.5,-66.9, o(h(Y,B,R), A(30,22,10,8,1.7,W,200,340))],

/* ---------------- América del Norte, Central y Caribe ---------------- */
["Antigua y Barbuda","Saint John's",AN,17.1,-61.8, o(bg(R), P("6,0 54,0 30,24",W), P("10,0 50,0 30,20",B), P("13,0 47,0 30,15",K), T("☀","#e8b21a",9,30,9))],
["Bahamas","Nasáu",AN,25.1,-77.3, o(h("#00abc9",Y,"#00abc9"), P("0,0 22,20 0,40",K))],
["Barbados","Bridgetown",AN,13.1,-59.6, o(v(NV,Y,NV), T("♆",K,15))],
["Belice","Belmopán",AN,17.3,-88.8, o(hw([R,B,R],[1,6,1]), C(30,20,10,W,"#0a8f3c",1.4))],
["Canadá","Ottawa",AN,45.4,-75.7, o(vw([R,W,R],[1,2,1]), T("🍁",R,15))],
["Costa Rica","San José",AN,9.9,-84.1, o(hw([B,W,R,W,B],[2,1,2,1,2]), C(17,20,4,W,R,1))],
["Cuba","La Habana",AN,23.1,-82.4, o(h(B,W,B,W,B), P("0,0 21,20 0,40",R), S(8,20,5,W))],
["Dominica","Roseau",AN,15.3,-61.4, o(bg(G), RE(0,17,60,6,Y), RE(22,0,6,40,Y), RE(0,17,60,2,K), RE(24,0,2,40,K), C(30,20,7,R))],
["El Salvador","San Salvador",AN,13.7,-89.2, o(h(B,W,B), C(30,20,5,"#c8a34a"))],
["Estados Unidos","Washington D. C.",AN,38.9,-77.0, o(h(R,W,R,W,R,W,R,W,R,W,R,W,R), RE(0,0,26,21.5,NV), GR2(2,2,22,17.5,6,5,1.2,W))],
["Granada","Saint George's",AN,12.1,-61.8, o(bg(R), P("6,5 54,5 54,35 6,35",Y), P("6,5 54,35 6,35",G), P("6,5 54,5 54,35",G), C(30,20,5,R), S(30,20,3.4,Y))],
["Guatemala","Ciudad de Guatemala",AN,14.6,-90.5, o(v(SK,W,SK), T("🌿","#4a7a3a",11))],
["Haití","Puerto Príncipe",AN,18.5,-72.3, o(h(B,R), RE(22,13,16,14,W))],
["Honduras","Tegucigalpa",AN,14.1,-87.2, o(h("#3a7dd8",W,"#3a7dd8"), A(30,20,7,5,1.6,"#3a7dd8",0,360))],
["Jamaica","Kingston",AN,18.0,-76.8, o(bg(Y), P("0,0 27,20 0,40",G), P("60,0 33,20 60,40",G), P("0,0 30,17 60,0",K), P("0,40 30,23 60,40",K))],
["México","Ciudad de México",AN,19.4,-99.1, o(v(G,W,R), C(30,20,5,BR))],
["Nicaragua","Managua",AN,12.1,-86.3, o(h("#3a7dd8",W,"#3a7dd8"), P("30,14 37,26 23,26",W), C(30,20,4.6,"#3a7dd8","#c8a34a",0.8))],
["Panamá","Ciudad de Panamá",AN,9.0,-79.5, o(bg(W), RE(30,0,30,20,R), RE(0,20,30,20,B), S(15,10,5,B), S(45,30,5,R))],
["República Dominicana","Santo Domingo",AN,18.5,-69.9, o(bg(B), RE(30,0,30,20,R), RE(0,20,30,20,R), RE(26,0,8,40,W), RE(0,16,60,8,W))],
["San Cristóbal y Nieves","Basseterre",AN,17.3,-62.7, o(bg(G), P("0,40 60,0 60,10 0,40",R), P("0,30 60,0 0,40",Y), P("0,40 60,0 60,6 6,40",K), S(20,25,4,W), S(40,13,4,W))],
["San Vicente y las Granadinas","Kingstown",AN,13.2,-61.2, o(vw([B,Y,G],[1,2,1]), T("◆◆◆",G,9))],
["Santa Lucía","Castries",AN,14.0,-61.0, o(bg("#5ac2e8"), P("30,7 46,33 14,33",W), P("30,11 43,33 17,33",K), P("30,20 38,33 22,33",Y))],
["Trinidad y Tobago","Puerto España",AN,10.7,-61.5, o(bg(R), P("0,0 16,0 60,36 60,40 44,40 0,4",W), P("0,0 12,0 60,38 60,40 48,40 0,2",K))],

/* ---------------- Europa ---------------- */
["Albania","Tirana",EU,41.3,19.8, o(bg("#c8102e"), T("🦅",K,15))],
["Alemania","Berlín",EU,52.5,13.4, h(K,R,"#ffce00")],
["Andorra","Andorra la Vieja",EU,42.5,1.5, o(v(B,Y,R), C(30,20,4.6,"#c8a34a"))],
["Austria","Viena",EU,48.2,16.4, h(R,W,R)],
["Bélgica","Bruselas",EU,50.8,4.4, v(K,"#fae042",R)],
["Bielorrusia","Minsk",EU,53.9,27.6, o(hw([R,G],[2,1]), RE(0,0,9,40,W), T("❋",R,9,4.5,20))],
["Bosnia y Herzegovina","Sarajevo",EU,43.9,18.4, o(bg("#002395"), P("18,2 52,2 52,38",Y), A(24,20,20,7,1.6,W,225,225))],
["Bulgaria","Sofía",EU,42.7,23.3, h(W,G,R)],
["Chequia","Praga",EU,50.1,14.4, o(h(W,R), P("0,0 22,20 0,40",B))],
["Chipre","Nicosia",EU,35.2,33.4, o(bg(W), P("20,14 40,14 44,20 34,24 24,22",  "#d57800"), T("🌿","#4a7a3a",7,30,30))],
["Ciudad del Vaticano","Ciudad del Vaticano",EU,41.90,12.45, o(v(Y,W), T("⚜","#c8a34a",12,45,20))],
["Croacia","Zagreb",EU,45.8,16.0, o(h(R,W,B), RE(24,8,12,16,W,"#c8102e"), RE(24,8,12,16,"#c8102e"))],
["Dinamarca","Copenhague",EU,55.7,12.6, o(bg("#c60c30"), N(W))],
["Eslovaquia","Bratislava",EU,48.1,17.1, o(h(W,B,R), RE(12,10,14,20,R), P("12,10 26,10 26,24 19,30 12,24",R))],
["Eslovenia","Liubliana",EU,46.1,14.5, o(h(W,B,R), RE(10,7,13,16,W,B), P("11,9 22,9 16.5,20",B))],
["España","Madrid",EU,40.4,-3.7, o(hw([R,"#f1bf00",R],[1,2,1]), RE(12,14,8,12,"#c8102e"))],
["Estonia","Tallin",EU,59.4,24.8, h("#0072ce",K,W)],
["Finlandia","Helsinki",EU,60.2,24.9, o(bg(W), N("#002f6c"))],
["Francia","París",EU,48.9,2.3, v("#002395",W,"#ed2939")],
["Grecia","Atenas",EU,38.0,23.7, o(h("#0d5eaf",W,"#0d5eaf",W,"#0d5eaf",W,"#0d5eaf",W,"#0d5eaf"), RE(0,0,22.3,22.3,"#0d5eaf"), RE(9,0,4.3,22.3,W), RE(0,9,22.3,4.3,W))],
["Hungría","Budapest",EU,47.5,19.0, h("#ce2939",W,"#477050")],
["Irlanda","Dublín",EU,53.3,-6.3, v("#169b62",W,"#ff883e")],
["Islandia","Reikiavik",EU,64.1,-21.9, o(bg("#02529c"), N(W,"#dc1e35"))],
["Italia","Roma",EU,41.9,12.5, v("#009246",W,"#ce2b37")],
["Kosovo","Pristina",EU,42.7,21.2, o(bg("#244aa5"), P("22,14 38,14 40,27 30,31 20,27",Y), LN(18,7,6,5,1.5,W))],
["Letonia","Riga",EU,56.9,24.1, hw([MA,W,MA],[2,1,2])],
["Liechtenstein","Vaduz",EU,47.1,9.5, o(h("#002b7f","#cf0921"), C(14,10,5,Y))],
["Lituania","Vilna",EU,54.7,25.3, h("#fdb913","#006a44","#c1272d")],
["Luxemburgo","Luxemburgo",EU,49.6,6.1, h("#ed2939",W,"#00a1de")],
["Macedonia del Norte","Skopie",EU,42.0,21.4, o(bg("#d20000"), C(30,20,7,Y), A(30,20,26,8,4,Y,0,360))],
["Malta","La Valeta",EU,35.9,14.5, o(v(W,"#cf142b"), RE(4,4,9,9,"#b0b0b0"))],
["Moldavia","Chisináu",EU,47.0,28.9, o(v("#0046ae","#ffd200","#cc092f"), C(30,20,5,BR))],
["Mónaco","Mónaco",EU,43.7,7.4, h("#ce1126",W)],
["Montenegro","Podgorica",EU,42.4,19.3, o(bg("#c40308"), RE(3,2,54,36,"#c40308","#c8a34a",2.5), T("🦅","#c8a34a",13))],
["Noruega","Oslo",EU,59.9,10.8, o(bg("#ba0c2f"), N(W,"#00205b"))],
["Países Bajos","Ámsterdam",EU,52.4,4.9, h("#ae1c28",W,"#21468b")],
["Polonia","Varsovia",EU,52.2,21.0, h(W,"#dc143c")],
["Portugal","Lisboa",EU,38.7,-9.1, o(vw(["#006600","#ff0000"],[2,3]), C(24,20,6,Y,"#c8a34a",1), C(24,20,3.4,W,"#c8102e",1.2))],
["Reino Unido","Londres",EU,51.5,-0.1, o(bg("#012169"), UJ(0,0,60,40))],
["Rumanía","Bucarest",EU,44.4,26.1, v("#002b7f","#fcd116","#ce1126")],
["Rusia","Moscú",EU,55.8,37.6, h(W,"#0039a6","#d52b1e")],
["San Marino","San Marino",EU,43.9,12.4, o(h(W,"#5eb6e4"), C(30,20,5.5,W,"#c8a34a",1.2))],
["Serbia","Belgrado",EU,44.8,20.5, o(h("#c6363c","#0c4076",W), RE(14,7,13,22,"#c6363c","#c8a34a",0.8))],
["Suecia","Estocolmo",EU,59.3,18.1, o(bg("#006aa7"), N("#fecc00"))],
["Suiza","Berna",EU,46.9,7.4, o(bg("#d52b1e"), CR(W))],
["Ucrania","Kiev",EU,50.5,30.5, h("#0057b7","#ffd700")],

/* ---------------- África ---------------- */
["Angola","Luanda",AF,-8.8,13.2, o(h(R,K), C(30,20,6,Y,"none"), T("⚙",Y,11))],
["Argelia","Argel",AF,36.8,3.1, o(v(G,W), ...lunaEstrella(30,20,7,R))],
["Benín","Portonovo",AF,6.5,2.6, o(h(Y,R), RE(0,0,22,40,G))],
["Botsuana","Gaborone",AF,-24.6,25.9, o(hw(["#75aadb",W,K,W,"#75aadb"],[6,1,3,1,6]))],
["Burkina Faso","Uagadugú",AF,12.4,-1.5, o(h(R,G), S(30,20,7,Y))],
["Burundi","Gitega",AF,-3.4,29.9, o(bg(W), P("0,0 26,20 0,40",R), P("60,0 34,20 60,40",R), P("0,0 30,17 60,0",G), P("0,40 30,23 60,40",G), C(30,20,8,W), A(30,20,4.6,3,2.4,R,270,270))],
["Cabo Verde","Praia",AF,14.9,-23.5, o(hw(["#003893",W,R,W,"#003893"],[6,1,2,1,6]), A(24,22,9,10,1.5,Y,0,360))],
["Camerún","Yaundé",AF,3.9,11.5, o(v(G,R,Y), S(30,20,6,Y))],
["Chad","Yamena",AF,12.1,15.0, v("#002664","#fecb00","#c60c30")],
["Comoras","Moroni",AF,-11.7,43.3, o(h(Y,W,R,"#3a75c4"), P("0,0 26,20 0,40",G), ...lunaEstrella(9,20,5,W))],
["Costa de Marfil","Yamusukro",AF,6.8,-5.3, v("#f77f00",W,"#009e60")],
["Egipto","El Cairo",AF,30.0,31.2, o(h(R,W,K), C(30,20,4.6,"#c8a34a"))],
["Eritrea","Asmara",AF,15.3,38.9, o(bg(G), P("0,20 60,0 60,40",B), P("0,0 44,20 0,40",R), T("🌿",Y,9,12,20))],
["Esuatini","Mbabane",AF,-26.3,31.1, o(hw(["#3e5eb9",Y,"#b10c0c",Y,"#3e5eb9"],[5,1,8,1,5]), RE(16,17,28,6,W,K))],
["Etiopía","Adís Abeba",AF,9.0,38.7, o(h(G,Y,R), C(30,20,8,"#0f47af"), S(30,20,5.5,Y))],
["Gabón","Libreville",AF,0.4,9.5, h(G,Y,"#3a75c4")],
["Gambia","Banjul",AF,13.5,-16.6, hw([R,W,"#0c1c8c",W,G],[6,1,6,1,6])],
["Ghana","Acra",AF,5.6,-0.2, o(h(R,Y,G), S(30,20,6,K))],
["Guinea","Conakri",AF,9.5,-13.7, v(R,Y,G)],
["Guinea-Bisáu","Bisáu",AF,11.9,-15.6, o(h(Y,G), RE(0,0,20,40,R), S(10,20,6,K))],
["Guinea Ecuatorial","Malabo",AF,3.8,8.8, o(h(G,W,R), P("0,0 16,20 0,40","#3e9ade"), C(38,20,4.6,GY))],
["Kenia","Nairobi",AF,-1.3,36.8, o(hw([K,W,R,W,G],[6,1,6,1,6]), P("30,6 34,20 30,34 26,20",R), P("30,8 33,20 30,32 27,20",W))],
["Lesoto","Maseru",AF,-29.3,27.5, o(hw(["#00209f",W,"#009543"],[3,4,3]), T("♟",K,13))],
["Liberia","Monrovia",AF,6.3,-10.8, o(h(R,W,R,W,R,W,R,W,R,W,R), RE(0,0,24,20,"#0c1c8c"), S(12,10,6,W))],
["Libia","Trípoli",AF,32.9,13.2, o(hw([R,K,G],[1,2,1]), ...lunaEstrella(30,20,5,W))],
["Madagascar","Antananarivo",AF,-18.9,47.5, o(h(R,G), RE(0,0,20,40,W))],
["Malaui","Lilongüe",AF,-13.9,33.8, o(h(K,R,G), SC(30,13,7,R))],
["Mali","Bamako",AF,12.6,-8.0, v(G,Y,R)],
["Marruecos","Rabat",AF,34.0,-6.8, o(bg("#c1272d"), S(30,20,9,"none",0,"#006233"))],
["Mauricio","Port Louis",AF,-20.2,57.5, h("#ea2839","#1a206d","#ffd500","#00a551")],
["Mauritania","Nuakchot",AF,18.1,-16.0, o(hw([R,G,R],[1,6,1]), MC(30,24,7,Y,180), S(30,10,4,Y))],
["Mozambique","Maputo",AF,-25.9,32.6, o(hw([G,W,K,W,Y],[4,1,4,1,4]), P("0,0 22,20 0,40",R), S(9,20,5,Y))],
["Namibia","Windhoek",AF,-22.6,17.1, o(bg("#003580"), P("0,40 60,0 60,10 12,40",W), P("0,40 60,0 60,4 6,40","#d21034"), P("60,40 60,32 44,40","#009543"), T("☀",Y,10,13,11))],
["Níger","Niamey",AF,13.5,2.1, o(h("#e05206",W,"#0db02b"), C(30,20,4.6,"#e05206"))],
["Nigeria","Abuya",AF,9.1,7.5, v("#008751",W,"#008751")],
["República Centroafricana","Bangui",AF,4.4,18.6, o(h("#003082",W,"#289728","#ffce00"), RE(26,0,8,40,R), S(9,7,4,Y))],
["República del Congo","Brazzaville",AF,-4.2,15.2, o(bg(Y), P("0,0 24,0 0,40",G), P("60,40 36,40 60,0",R))],
["República Democrática del Congo","Kinsasa",AF,-4.4,15.4, o(bg("#007fff"), P("0,32 48,0 60,0 60,8 12,40 0,40",Y), P("0,34 50,0 57,0 60,3 10,40 3,40",R), S(9,9,5.5,Y))],
["Ruanda","Kigali",AF,-1.9,30.1, o(hw(["#00a1de","#fad201","#20603d"],[2,1,1]), T("☀","#e5be01",10,48,10))],
["Santo Tomé y Príncipe","Santo Tomé",AF,0.3,6.7, o(hw([G,Y,G],[1,2,1]), P("0,0 20,20 0,40",R), S(30,20,4,K), S(42,20,4,K))],
["Senegal","Dakar",AF,14.7,-17.4, o(v(G,Y,R), S(30,20,6,G))],
["Seychelles","Victoria",AF,-4.6,55.5, o(bg("#003f87"), P("0,40 24,0 46,0 0,40",Y), P("0,40 46,0 60,12 0,40",R), P("0,40 60,12 60,26 0,40",W), P("0,40 60,26 60,40",G))],
["Sierra Leona","Freetown",AF,8.5,-13.2, h("#1eb53a",W,"#0072c6")],
["Somalia","Mogadiscio",AF,2.0,45.3, o(bg("#4189dd"), S(30,20,9,W))],
["Sudáfrica","Pretoria",AF,-25.7,28.2, o(bg(W), RE(0,0,60,14,"#de3831"), RE(0,26,60,14,"#002395"), P("0,0 26,20 0,40",W), P("0,3 21,20 0,37",Y), P("0,7 15,20 0,33",K), P("0,15 60,15 60,25 0,25","#007a4d"), P("0,0 26,20 0,40",K), P("0,4 20,20 0,36",Y), P("0,9 13,20 0,31",K), P("13,20 60,14 60,26",  "#007a4d"))],
["Sudán","Jartum",AF,15.5,32.5, o(h(R,W,K), P("0,0 22,20 0,40",G))],
["Sudán del Sur","Yuba",AF,4.9,31.6, o(hw([K,W,R,W,G],[6,1,6,1,6]), P("0,0 22,20 0,40","#0f47af"), S(9,20,4,Y))],
["Tanzania","Dodoma",AF,-6.2,35.7, o(bg("#1eb53a"), P("0,40 60,0 60,14 22,40",K), P("0,40 52,0 60,0 60,4 12,40",Y), P("60,14 60,40 22,40",  "#00a3dd"), P("0,40 60,0 60,3 6,40",Y))],
["Togo","Lomé",AF,6.1,1.2, o(h(G,Y,G,Y,G), RE(0,0,24,24,"#d21034"), S(12,12,6,W))],
["Túnez","Túnez",AF,36.8,10.2, o(bg("#e70013"), C(30,20,10,W), ...lunaEstrella(31,20,6,"#e70013"))],
["Uganda","Kampala",AF,0.3,32.6, o(h(K,Y,R,K,Y,R), C(30,20,7,W), T("🕊",K,8))],
["Yibuti","Yibuti",AF,11.6,43.1, o(h("#6ab2e7","#12ad2b"), P("0,0 22,20 0,40",W), S(9,20,4.6,"#d7141a"))],
["Zambia","Lusaka",AF,-15.4,28.3, o(bg("#198a00"), RE(36,16,8,24,"#de2010"), RE(44,16,8,24,K), RE(52,16,8,24,"#ef7d00"), T("🦅","#ef7d00",10,46,9))],
["Zimbabue","Harare",AF,-17.8,31.1, o(h(G,Y,R,K,R,Y,G), P("0,0 24,20 0,40",W), S(9,20,5.5,"#d40000"))],

/* ---------------- Asia ---------------- */
["Afganistán","Kabul",AI,34.5,69.2, o(v(K,"#d32011",G), C(30,20,6,W,"none"))],
["Arabia Saudí","Riad",AI,24.7,46.7, o(bg("#006c35"), T("لا إله إلا الله",W,7,30,17), RE(14,27,32,2,W))],
["Armenia","Ereván",AI,40.2,44.5, h("#d90012","#0033a0","#f2a800")],
["Azerbaiyán","Bakú",AI,40.4,49.9, o(h("#00b5e2",R,G), ...lunaEstrella(28,20,5,W))],
["Bangladés","Daca",AI,23.8,90.4, o(bg("#006a4e"), C(26,20,10,"#f42a41"))],
["Baréin","Manama",AI,26.2,50.6, o(bg(W), P("18,0 60,0 60,40 18,40 24,36 18,32 24,28 18,24 24,20 18,16 24,12 18,8 24,4","#ce1126"))],
["Birmania (Myanmar)","Naipyidó",AI,19.8,96.1, o(h("#fecb00","#34b233","#ea2839"), S(30,20,9,W))],
["Brunéi","Bandar Seri Begawan",AI,4.9,114.9, o(bg("#f7e017"), P("0,10 60,2 60,14 0,22",W), P("0,14 60,6 60,18 0,26",K), C(30,22,6,"#cf1126","none"))],
["Bután","Timbu",AI,27.5,89.6, o(bg("#ffd520"), P("0,0 60,40 0,40","#ff4e12"), T("🐉",W,13))],
["Camboya","Nom Pen",AI,11.6,104.9, o(hw(["#032ea1","#e00025","#032ea1"],[1,2,1]), T("🏯",W,11))],
["Catar","Doha",AI,25.3,51.5, o(bg("#8a1538"), P("0,0 18,0 12,3 18,6 12,9 18,12 12,15 18,18 12,21 18,24 12,27 18,30 12,33 18,36 12,39 18,40 0,40",W))],
["China","Pekín",AI,39.9,116.4, o(bg("#de2910"), S(11,11,7,Y), S(22,5,2.6,Y), S(27,10,2.6,Y), S(27,17,2.6,Y), S(22,22,2.6,Y))],
["Corea del Norte","Pionyang",AI,39.0,125.8, o(hw(["#024fa2",W,"#ed1c27",W,"#024fa2"],[3,1,8,1,3]), C(18,20,6,W), S(18,20,4.4,"#ed1c27"))],
["Corea del Sur","Seúl",AI,37.6,127.0, o(bg(W), C(30,20,8,"#cd2e3a"), P("22,20 30,12 38,20","#0047a0"), RE(8,10,7,2.2,K), RE(8,14,7,2.2,K), RE(45,26,7,2.2,K), RE(45,30,7,2.2,K))],
["Emiratos Árabes Unidos","Abu Dabi",AI,24.5,54.4, o(h(G,W,K), RE(0,0,15,40,R))],
["Filipinas","Manila",AI,14.6,121.0, o(h("#0038a8","#ce1126"), P("0,0 26,20 0,40",W), T("☀","#fcd116",8,8,20))],
["Georgia","Tiflis",AI,41.7,44.8, o(bg(W), RE(25,0,10,40,R), RE(0,15,60,10,R), T("✚",R,7,13,9), T("✚",R,7,47,9), T("✚",R,7,13,31), T("✚",R,7,47,31))],
["India","Nueva Delhi",AI,28.6,77.2, o(h("#ff9933",W,"#138808"), C(30,20,5.4,"none","#000088",1.4), C(30,20,1.4,"#000088"))],
["Indonesia","Yakarta",AI,-6.2,106.8, h("#ce1126",W)],
["Irak","Bagdad",AI,33.3,44.4, o(h("#ce1126",W,K), T("الله أكبر","#007a3d",8))],
["Irán","Teherán",AI,35.7,51.4, o(h("#239f40",W,"#da0000"), T("۩","#da0000",9))],
["Israel","Jerusalén",AI,31.8,35.2, o(bg(W), RE(0,5,60,5,"#0038b8"), RE(0,30,60,5,"#0038b8"), T("✡","#0038b8",15))],
["Japón","Tokio",AI,35.7,139.7, o(bg(W), C(30,20,10,"#bc002d"))],
["Jordania","Amán",AI,31.9,35.9, o(h(K,W,G), P("0,0 24,20 0,40",R), S(9,20,3.6,W))],
["Kazajistán","Astaná",AI,51.2,71.4, o(bg("#00afca"), T("☀","#fec50c",13,32,17), RE(2,4,3,32,"#fec50c"))],
["Kirguistán","Biskek",AI,42.9,74.6, o(bg("#e8112d"), C(30,20,8,"#ffef00"), A(30,20,11,12,2,"#ffef00",0,360))],
["Kuwait","Kuwait",AI,29.4,48.0, o(h(G,W,R), P("0,0 18,13 18,27 0,40",K))],
["Laos","Vientián",AI,18.0,102.6, o(hw(["#ce1126","#002868","#ce1126"],[1,2,1]), C(30,20,7,W))],
["Líbano","Beirut",AI,33.9,35.5, o(hw([R,W,R],[1,2,1]), T("🌲","#00a651",12))],
["Malasia","Kuala Lumpur",AI,3.1,101.7, o(h(R,W,R,W,R,W,R,W,R,W,R,W,R,W), RE(0,0,30,22.8,"#010066"), MC(11,11,6,Y), S(20,11,3.6,Y))],
["Maldivas","Malé",AI,4.2,73.5, o(bg("#d21034"), RE(11,7,38,26,"#007e3a"), MC(30,20,6,W))],
["Mongolia","Ulán Bator",AI,47.9,106.9, o(vw(["#c4272f","#015197","#c4272f"],[1,1,1]), T("☯",Y,10,10,20))],
["Nepal","Katmandú",AI,27.7,85.3, o(bg("#003893"), P("6,2 40,20 6,20 40,38 6,38","#dc143c"), T("☀",W,6,15,31), MC(15,11,3.4,W))],
["Omán","Mascate",AI,23.6,58.5, o(h(W,R,G), RE(0,0,17,40,R), T("⚔",W,8,8,10))],
["Pakistán","Islamabad",AI,33.7,73.1, o(bg("#01411c"), RE(0,0,15,40,W), ...lunaEstrella(34,20,7,W))],
["Palestina","Ramala",AI,31.9,35.2, o(h(K,W,G), P("0,0 22,20 0,40",R))],
["Singapur","Singapur",AI,1.35,103.8, o(h("#ed2939",W), MC(14,10,6,W), A(19,10,4.6,5,1.6,W,0,360))],
["Siria","Damasco",AI,33.5,36.3, o(h(R,W,K), S(22,20,4.6,G), S(38,20,4.6,G))],
["Sri Lanka","Sri Jayawardenapura Kotte",AI,6.9,79.9, o(bg("#ffbe29"), RE(4,4,10,32,"#00534e"), RE(14,4,10,32,"#eb7400"), RE(26,4,30,32,"#8d153a"), T("🦁","#ffbe29",11,41,21))],
["Tailandia","Bangkok",AI,13.8,100.5, hw([R,W,"#2d2a4a",W,R],[1,1,2,1,1])],
["Taiwán","Taipéi",AI,25.0,121.6, o(bg("#fe0000"), RE(0,0,30,20,"#000095"), S(15,10,7,W))],
["Tayikistán","Dusambé",AI,38.6,68.8, o(hw(["#cc0000",W,"#006600"],[2,3,2]), A(30,20,7,7,1.6,"#f8c300",0,360), C(30,20,4,"#f8c300"))],
["Timor Oriental","Dili",AI,-8.6,125.6, o(bg("#dc241f"), P("0,0 36,20 0,40",K), P("0,0 24,20 0,40",Y), S(11,20,4.6,W))],
["Turkmenistán","Asjabad",AI,37.9,58.4, o(bg("#00843d"), RE(7,0,10,40,"#c8102e"), ...lunaEstrella(32,13,5,W))],
["Turquía","Ankara",AI,39.9,32.9, o(bg("#e30a17"), ...lunaEstrella(22,20,7,W))],
["Uzbekistán","Taskent",AI,41.3,69.2, o(hw(["#0099b5",W,"#1eb53a"],[1,1,1]), MC(12,8,4,W), LN(22,8,5,5,1.5,W))],
["Vietnam","Hanói",AI,21.0,105.8, o(bg("#da251d"), S(30,20,10,"#ffff00"))],
["Yemen","Saná",AI,15.4,44.2, h("#ce1126",W,K)],

/* ---------------- Oceanía ---------------- */
["Australia","Camberra",OC,-35.3,149.1, o(bg("#00008b"), UJ(0,0,30,20), S(15,30,4.6,W), S(45,8,2.6,W), S(50,17,2.6,W), S(44,26,2.6,W), S(52,30,2,W), S(40,17,1.6,W))],
["Fiyi","Suva",OC,-18.1,178.4, o(bg("#68bfe5"), UJ(0,0,30,20), RE(40,10,12,18,W), P("40,10 52,10 46,30",R))],
["Islas Marshall","Majuro",OC,7.1,171.4, o(bg("#003893"), P("0,40 60,4 60,14 0,40","#dd7500"), P("0,40 60,14 60,24 0,40",W), S(13,10,6,W))],
["Islas Salomón","Honiara",OC,-9.4,159.9, o(bg("#0051ba"), P("0,40 60,0 60,6 8,40","#215b33"), P("0,34 56,0 60,0 60,3 6,40",Y), S(8,7,2.4,W), S(17,7,2.4,W), S(8,15,2.4,W), S(17,15,2.4,W))],
["Kiribati","Tarawa Sur",OC,1.3,173.0, o(h("#ce1126","#003f87"), T("🕊",Y,10,30,11), RE(0,22,60,3,W), RE(0,29,60,3,W))],
["Micronesia","Palikir",OC,6.9,158.2, o(bg("#75b2dd"), A(30,20,9,4,2.6,W,0,360))],
["Nauru","Yaren",OC,-0.5,166.9, o(bg("#002b7f"), RE(0,18,60,3,"#ffc61e"), S(16,30,4.6,W))],
["Nueva Zelanda","Wellington",OC,-41.3,174.8, o(bg("#00247d"), UJ(0,0,30,20), S(44,10,2.6,"#cc142b"), S(50,20,2.6,"#cc142b"), S(42,26,2.2,"#cc142b"), S(48,32,2.2,"#cc142b"))],
["Palaos","Ngerulmud",OC,7.5,134.6, o(bg("#4aadd6"), C(26,20,9,"#ffde00"))],
["Papúa Nueva Guinea","Port Moresby",OC,-9.5,147.2, o(bg("#ce1126"), P("0,0 0,40 60,40",K), A(18,30,7,5,1.8,W,0,360), T("🦜",Y,10,40,14))],
["Samoa","Apia",OC,-13.8,-171.8, o(bg("#ce1126"), RE(0,0,30,20,"#002b7f"), S(9,8,2.6,W), S(16,5,2,W), S(18,12,2,W), S(12,15,2,W))],
["Tonga","Nukualofa",OC,-21.1,-175.2, o(bg("#c10000"), RE(0,0,26,18,W), RE(10,3,4,12,"#c10000"), RE(5,7,14,4,"#c10000"))],
["Tuvalu","Funafuti",OC,-8.5,179.2, o(bg("#5b97d1"), UJ(0,0,30,20), A(44,20,11,9,1.8,Y,0,360))],
["Vanuatu","Port Vila",OC,-17.7,168.3, o(h("#d21034","#009543"), P("0,0 26,20 0,40",K), RE(0,17,60,6,K), RE(0,18.4,60,3.2,"#fdce12"), T("🌿","#fdce12",7,9,20))]
];

/* El dibujo del mapa vive en datos/mapa-mundi.js: contornos reales de
   cada país en la misma proyección equirectangular 720 × 360. */

/* ---------------------------------------------------------------
   Preguntas conceptuales de geografía
   --------------------------------------------------------------- */
const conceptos = [
{q:"¿Cuál es el continente más grande en superficie?", r:"Asia", d:["África","América","Europa"], n:1,
 nota:"44,6 millones de km²: casi un tercio de toda la tierra emergida."},
{q:"¿Cuál es el país más grande del mundo?", r:"Rusia", d:["Canadá","China","Estados Unidos"], n:1,
 nota:"17 millones de km², repartidos en 11 husos horarios. Casi el doble que Canadá."},
{q:"¿Y el más pequeño?", r:"Ciudad del Vaticano", d:["Mónaco","Nauru","San Marino"], n:1,
 nota:"0,44 km². Cabría 100 veces dentro del Central Park."},
{q:"¿Cuál es el río más largo del mundo?", r:"El Nilo (o el Amazonas, según la medición)",
 d:["El Yangtsé","El Misisipi","El Danubio"], n:2,
 nota:"Nilo ≈ 6650 km, Amazonas ≈ 6400 km. La discusión sigue abierta según dónde se ponga el nacimiento del Amazonas. En caudal no hay debate: el Amazonas gana por goleada."},
{q:"¿Cuál es la cordillera más larga del planeta (en tierra)?", r:"Los Andes",
 d:["El Himalaya","Las Rocosas","Los Alpes"], n:1,
 nota:"7000 km recorriendo siete países de Sudamérica. La más ALTA es el Himalaya."},
{q:"¿Qué océano es el más grande?", r:"Pacífico", d:["Atlántico","Índico","Ártico"], n:1,
 nota:"Él solo ocupa más superficie que toda la tierra firme del planeta."},
{q:"¿Qué línea imaginaria divide el planeta en hemisferio norte y sur?", r:"El ecuador",
 d:["El meridiano de Greenwich","El trópico de Cáncer","El círculo polar"], n:1,
 nota:"Latitud 0°. Greenwich es la longitud 0° y divide este de oeste."},
{q:"¿Qué mide la latitud?", r:"La distancia angular al ecuador (norte–sur)",
 d:["La distancia a Greenwich","La altura sobre el mar","La distancia al polo magnético"], n:2,
 nota:"De 0° en el ecuador a 90° en los polos. La longitud es la coordenada este–oeste, de 0° a 180°."},
{q:"¿Cuántos países tiene África?", r:"54", d:["48","36","61"], n:2,
 nota:"Es el continente con más países reconocidos por la ONU, por delante de Europa y Asia."},
{q:"¿Qué país tiene más habitantes?", r:"India", d:["China","Estados Unidos","Indonesia"], n:2,
 nota:"India superó a China en 2023. Ambos rondan los 1400 millones."},
{q:"¿Qué país atraviesa más husos horarios?", r:"Francia (con sus territorios de ultramar)",
 d:["Rusia","Estados Unidos","China"], n:3,
 nota:"Francia toca 12 husos gracias a sus territorios; Rusia tiene 11 pero todos continuos. China, siendo enorme, usa una sola hora oficial."},
{q:"¿Cuál es el desierto más grande del mundo?", r:"La Antártida", d:["El Sáhara","El Gobi","El de Atacama"], n:3,
 nota:"Desierto = poca precipitación, no calor. La Antártida es el mayor desierto polar; el Sáhara es el mayor desierto cálido."},
{q:"¿Qué país tiene frontera con más países?", r:"China y Rusia (14 cada uno)",
 d:["Brasil","Alemania","India"], n:3,
 nota:"Brasil lidera en Sudamérica con 10: linda con todos menos Chile y Ecuador."},
{q:"¿Qué capital está a mayor altitud?", r:"La Paz, Bolivia", d:["Quito, Ecuador","Bogotá, Colombia","Katmandú, Nepal"], n:2,
 nota:"3640 m. Sucre es la capital constitucional de Bolivia, pero el gobierno está en La Paz."},
{q:"¿Qué país está en dos continentes a la vez y tiene su capital en el asiático?", r:"Turquía",
 d:["Rusia","Egipto","Kazajistán"], n:2,
 nota:"Ankara está en Anatolia (Asia). Estambul es la que se reparte entre los dos continentes."},
{q:"¿Cuál es el único país que ocupa un continente entero?", r:"Australia",
 d:["Groenlandia","Islandia","Madagascar"], n:1,
 nota:"Groenlandia es una isla y pertenece a Dinamarca; no es un continente."},
{q:"¿Qué estrecho separa Europa de África?", r:"El estrecho de Gibraltar",
 d:["El Bósforo","El canal de la Mancha","El estrecho de Ormuz"], n:1,
 nota:"14 km de ancho. El Bósforo separa las dos mitades de Turquía."},
{q:"¿Qué país tiene la costa más larga del mundo?", r:"Canadá", d:["Rusia","Indonesia","Australia"], n:2,
 nota:"Más de 200 000 km contando su archipiélago ártico: más que los siguientes diez juntos."},
{q:"¿Qué dos países no tienen litoral y están rodeados por un solo país?", r:"Lesoto y San Marino (y el Vaticano)",
 d:["Nepal y Bután","Suiza y Austria","Mongolia y Laos"], n:3,
 nota:"Lesoto está dentro de Sudáfrica; San Marino y el Vaticano, dentro de Italia."},
{q:"¿Cuál es el punto más alto de la Tierra sobre el nivel del mar?", r:"El Everest (8849 m)",
 d:["El K2","El Aconcagua","El Mont Blanc"], n:1,
 nota:"El Aconcagua (6961 m) es el más alto fuera de Asia y está en Argentina."},
{q:"¿Qué país tiene más islas?", r:"Suecia", d:["Indonesia","Filipinas","Noruega"], n:3,
 nota:"Unas 267 000, casi todas diminutas. Indonesia tiene más islas HABITADAS."},
{q:"¿Qué línea marca el cambio de día en el planeta?", r:"La línea internacional de cambio de fecha",
 d:["El ecuador","El meridiano de Greenwich","El trópico de Capricornio"], n:2,
 nota:"Sigue aproximadamente el meridiano 180°, zigzagueando para no partir países."},
{q:"¿Qué mar es en realidad un lago?", r:"El mar Caspio", d:["El mar Rojo","El mar Negro","El mar Muerto"], n:2,
 nota:"El lago más grande del mundo. El mar Muerto también es un lago, pero mucho menor."},
{q:"¿Qué país cambió su capital a una ciudad construida desde cero en 1960?", r:"Brasil",
 d:["Australia","Nigeria","Kazajistán"], n:2,
 nota:"Brasilia. Pero le pasó lo mismo a Australia (Camberra, 1913), Nigeria (Abuya, 1991) y Kazajistán (Astaná, 1997)."},
{q:"¿Qué país tiene tres capitales?", r:"Sudáfrica", d:["Bolivia","Países Bajos","Chile"], n:2,
 nota:"Pretoria (ejecutiva), Ciudad del Cabo (legislativa) y Bloemfontein (judicial)."}
];

const vf = [
{q:"El Amazonas es el río con más caudal del mundo.", v:true, n:1,
 nota:"Descarga más agua que los siguientes siete ríos juntos. En longitud compite con el Nilo."},
{q:"Australia es a la vez país, continente e isla.", v:true, n:1, nota:"El único caso en el planeta."},
{q:"La capital de Estados Unidos es Nueva York.", v:false, n:1, nota:"Es Washington D. C. Nueva York nunca ha sido capital desde 1790."},
{q:"La capital de Turquía es Estambul.", v:false, n:1, nota:"Es Ankara, desde 1923."},
{q:"La capital de Brasil es Río de Janeiro.", v:false, n:1, nota:"Es Brasilia desde 1960. Río lo fue hasta entonces."},
{q:"La capital de Suiza es Zúrich.", v:false, n:2, nota:"Es Berna. Zúrich es la ciudad más grande, que no es lo mismo."},
{q:"La capital de Canadá es Toronto.", v:false, n:2, nota:"Es Ottawa. Toronto es la mayor, pero no la capital."},
{q:"La capital de Australia es Sídney.", v:false, n:1, nota:"Es Camberra, elegida precisamente para zanjar la pelea entre Sídney y Melbourne."},
{q:"El Vaticano es el país más pequeño del mundo.", v:true, n:1, nota:"0,44 km² y unos 800 habitantes."},
{q:"Groenlandia es un país independiente.", v:false, n:2, nota:"Es un territorio autónomo del Reino de Dinamarca."},
{q:"Rusia tiene territorio en Europa y en Asia.", v:true, n:1, nota:"Los Urales marcan la frontera convencional. Moscú está del lado europeo."},
{q:"El Sáhara es el desierto más grande del mundo.", v:false, n:2, nota:"Es el mayor desierto CÁLIDO. El más grande de todos es la Antártida."},
{q:"El monte Everest está entre Nepal y China.", v:true, n:2, nota:"En la frontera con el Tíbet. Los nepalíes lo llaman Sagarmatha; los tibetanos, Chomolungma."},
{q:"Todos los países de Sudamérica hablan español.", v:false, n:1, nota:"Brasil habla portugués, Guyana inglés y Surinam neerlandés."},
{q:"El lago Titicaca está compartido por Perú y Bolivia.", v:true, n:2, nota:"El lago navegable más alto del mundo: 3812 m."},
{q:"Chile limita con Brasil.", v:false, n:1, nota:"Chile solo limita con Perú, Bolivia y Argentina. Brasil linda con todos los sudamericanos menos Chile y Ecuador."},
{q:"La longitud se mide desde el ecuador.", v:false, n:2, nota:"Desde el meridiano de Greenwich. Desde el ecuador se mide la latitud."},
{q:"El estrecho de Magallanes está en el sur de Chile.", v:true, n:1, nota:"Separa el continente de Tierra del Fuego. Lo cruzó Magallanes en 1520."},
{q:"Bolivia y Paraguay son los dos únicos países sin salida al mar de Sudamérica.", v:true, n:2,
 nota:"Bolivia la perdió en la Guerra del Pacífico; Paraguay nunca la tuvo."},
{q:"Ciudad de México es la capital más poblada de América.", v:true, n:2, nota:"Más de 21 millones en su área metropolitana."}
];

/* ---------------------------------------------------------------
   Construcción del objeto final
   --------------------------------------------------------------- */
const paises = CRUDO.map((r,i) => ({
  id:"pa-"+i, n:r[0], cap:r[1], cont:r[2], lat:r[3], lon:r[4], b:r[5]
}));

const CONTINENTES = [
  {id:AS, emo:"🌎", color:"#e8b21a"},
  {id:AN, emo:"🌎", color:"#3fa9e0"},
  {id:EU, emo:"🌍", color:"#7856f5"},
  {id:AF, emo:"🌍", color:"#e0684b"},
  {id:AI, emo:"🌏", color:"#0f9d6e"},
  {id:OC, emo:"🌏", color:"#d94a86"}
];

window.GEOGRAFIA = {paises, CONTINENTES, conceptos, vf,
  porNombre(n){ return paises.find(p => p.n === n); },
  deContinente(c){ return paises.filter(p => p.cont === c); }
};

})();
