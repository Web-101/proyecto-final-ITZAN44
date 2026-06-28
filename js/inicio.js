const grilla = document.querySelector(".grilla-peliculas");

peliculas.forEach((pelicula) => {
  const tarjeta = document.createElement("a");
  tarjeta.className = "tarjeta-pelicula";
  tarjeta.href = `detalle.html?id=${pelicula.id}`;
  tarjeta.innerHTML = `
    <img class="poster" src="${pelicula.poster}" alt="Póster de ${pelicula.titulo}">
    <h3 class="titulo-pelicula">${pelicula.titulo}</h3>
    <p class="info"><span class="duracion">${pelicula.duracionMinutos} min</span> <span class="genero">${pelicula.genero}</span></p>`;
  grilla.appendChild(tarjeta);
});
