// Guardamos en variables los elementos del HTML que vamos a usar
const html = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

/* ---------- 1. TEMA CLARO / OSCURO ---------- */

// Lee el tema guardado en el navegador (si existe)
function leerTemaGuardado() {
  try {
    return localStorage.getItem("tema");
  } catch (error) {
    return null;
  }
}

// Si no hay tema guardado, usa el que tenga el dispositivo
const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
const temaInicial = leerTemaGuardado() || (prefiereOscuro ? "dark" : "light");
html.setAttribute("data-theme", temaInicial);

// Al hacer clic en el botón, cambia el tema y lo guarda
themeBtn.addEventListener("click", function () {
  const nuevoTema = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", nuevoTema);
  try {
    localStorage.setItem("tema", nuevoTema);
  } catch (error) {
    // Si el navegador no deja guardar, no pasa nada
  }
});

/* ---------- 2. MENÚ EN CELULAR ---------- */

menuBtn.addEventListener("click", function () {
  const abierto = nav.classList.toggle("abierto"); // agrega o quita la clase
  menuBtn.setAttribute("aria-expanded", abierto);
});

// Al tocar un enlace del menú, se cierra
nav.addEventListener("click", function (evento) {
  if (evento.target.tagName === "A") {
    nav.classList.remove("abierto");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

/* ---------- 3. AÑO DEL PIE DE PÁGINA ---------- */

document.getElementById("anio").textContent = new Date().getFullYear();
const copiarBtn = document.getElementById("copiarCorreo");

copiarBtn.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText("juanzuluagaflorez@gmail.com");
    copiarBtn.textContent = "¡Copiado!";
  } catch (error) {
    // Si el navegador no deja copiar, mostramos el correo para que lo copien a mano
    copiarBtn.textContent = "juanzuluagaflorez@gmail.com";
  }
});