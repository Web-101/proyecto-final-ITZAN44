function formatearDuracion(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return `${horas}h ${resto}min`;
}

const parametros = new URLSearchParams(window.location.search);
const pelicula = peliculas.find((p) => p.id === parametros.get("id"));

if (!pelicula) {
  window.location.href = "index.html";
} else {
  document.title = `${pelicula.titulo} — CINEPLEX`;

  const hero = document.querySelector(".hero");
  hero.style.backgroundImage = `linear-gradient(to bottom, rgba(19, 19, 22, 0.1), var(--color-fondo)), url("${pelicula.poster}")`;

  document.querySelector(".hero-titulo").textContent = pelicula.titulo;
  document.querySelector(".hero-metadata").textContent = `${pelicula.genero} · ${formatearDuracion(pelicula.duracionMinutos)} · ${pelicula.clasificacion}`;
  document.querySelector(".sinopsis p").textContent = pelicula.sinopsis;

  const grillaFunciones = document.querySelector(".grilla-funciones");
  pelicula.funciones.forEach((funcion) => {
    const enlace = document.createElement("a");
    enlace.className = "funcion";
    enlace.href = `asientos.html?id=${pelicula.id}&funcion=${funcion.id}`;
    enlace.innerHTML = `
      <span class="hora">${funcion.hora}</span>
      <span class="sala">${funcion.sala} · $${funcion.precio}</span>`;
    grillaFunciones.appendChild(enlace);
  });
}
