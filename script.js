// 🎵 Reproductor de música
const audio = document.getElementById("audioMenu");
const boton = document.getElementById("botonMusica");
const iconPlay = document.getElementById("iconPlay");
const nombreCancion = document.getElementById("nombreCancion");
let reproduciendo = false;

const canciones = [
  { nombre: "Slowdive", ruta: "musica-fondo.mp3.mp3" },
  { nombre: "Drowning the Light", ruta: "www.joeemilio.co.za - Drowning the Light - The Longing (320 KBps).mp3" },
  { nombre: "Saturnus", ruta: "All Alone.mp3" }
];
let indice = 0;

function cargarCancion() {
  const cancion = canciones[indice];
  audio.src = cancion.ruta;
  nombreCancion.textContent = cancion.nombre;
  audio.load();
  if (reproduciendo) {
    audio.play().catch(e => console.log("Error al reproducir:", e));
  }
}

function toggleMusica() {
  if (reproduciendo) {
    audio.pause();
    iconPlay.innerHTML = '<path d="M8 5V19L19 12L8 5Z" fill="#f0e6ff"/>';
  } else {
    audio.play().then(() => {
      iconPlay.innerHTML = `
        <rect x="6" y="5" width="4" height="14" fill="#f0e6ff"/>
        <rect x="14" y="5" width="4" height="14" fill="#f0e6ff"/>
      `;
    }).catch(e => console.log("Error:", e));
  }
  reproduciendo = !reproduciendo;
}

function siguienteCancion() {
  indice = (indice + 1) % canciones.length;
  cargarCancion();
}

function anteriorCancion() {
  indice = (indice - 1 + canciones.length) % canciones.length;
  cargarCancion();
}

audio.addEventListener("ended", siguienteCancion);
window.addEventListener("DOMContentLoaded", cargarCancion);

// 📚 Catálogo de libros
const libros = [
  {
    titulo: "Vivir para un destino ya escrito",
    precio: 45000,
    portada: "img/WhatsApp Image 2025-09-29 at 1.20.01 AM.jpeg"
  },
  {
    titulo: "Susurros de una muerte inmortal",
    precio: 38000,
    portada: "img/WhatsApp Image 2025-09-29 at 12.59.54 AM.jpeg"
  },
  {
    titulo: "La libertad del condenado",
    precio: 52000,
    portada: "img/portada1.jpg.jpeg"
  }
];

const contenedor = document.getElementById("libros");
const buscador = document.getElementById("buscador");

window.addEventListener("load", () => {
  const bienvenida = document.querySelector(".bienvenida");
  bienvenida.style.opacity = "0";
  bienvenida.style.transition = "opacity 2s ease";
  setTimeout(() => {
    bienvenida.style.opacity = "1";
  }, 300);

  mostrarLibros();
});

function mostrarLibros(filtro = "") {
  contenedor.innerHTML = "";
  libros
    .filter(libro => libro.titulo.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((libro, index) => {
      const div = document.createElement("div");
      div.className = "libro";
      div.style.animationDelay = `${index * 0.1}s`;
      div.innerHTML = `
        <img src="${libro.portada}" alt="${libro.titulo}" />
        <h3>${libro.titulo}</h3>
        <p>$${libro.precio.toLocaleString()} COP</p>
        <button onclick="pagar('${libro.titulo}', ${libro.precio})">Comprar</button>
      `;
      contenedor.appendChild(div);
    });
}

buscador.addEventListener("input", e => {
  mostrarLibros(e.target.value);
});

function pagar(titulo, precio) {
  alert(`Gracias por tu compra de "${titulo}" por $${precio.toLocaleString()} COP. ¡Tu pedido está en camino!`);
}

