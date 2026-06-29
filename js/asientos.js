const parametros = new URLSearchParams(window.location.search);
const pelicula = peliculas.find((p) => p.id === parametros.get("id"));
const funcion = pelicula?.funciones.find((f) => f.id === parametros.get("funcion"));

if (!pelicula || !funcion) {
  window.location.href = "index.html";
} else {
  document.querySelector(".titulo-funcion").textContent = pelicula.titulo;
  document.querySelector(".subtitulo-funcion").textContent = `Hoy ${funcion.hora} · ${funcion.sala}`;

  const filas = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columnas = 8;
  const mapa = document.querySelector(".mapa");

  const esquina = document.createElement("span");
  esquina.className = "esquina";
  mapa.appendChild(esquina);

  for (let numero = 1; numero <= columnas; numero++) {
    const cabecera = document.createElement("span");
    cabecera.className = "numero";
    cabecera.textContent = numero;
    mapa.appendChild(cabecera);
  }

  filas.forEach((fila) => {
    const letra = document.createElement("span");
    letra.className = "letra";
    letra.textContent = fila;
    mapa.appendChild(letra);

    for (let numero = 1; numero <= columnas; numero++) {
      const id = `${fila}${numero}`;
      const asiento = document.createElement("button");
      asiento.type = "button";
      asiento.className = "asiento";
      asiento.dataset.asiento = id;
      asiento.setAttribute("aria-label", `Asiento ${id}`);

      if (funcion.asientosOcupados.includes(id)) {
        asiento.classList.add("ocupado");
        asiento.disabled = true;
      }

      mapa.appendChild(asiento);
    }
  });

  const resumenValor = document.querySelector(".resumen-valor");
  const resumenTotal = document.querySelector(".resumen-total");
  const botonContinuar = document.querySelector(".boton-continuar");

  function asientosElegidos() {
    return [...mapa.querySelectorAll(".asiento.seleccionado")].map((boton) => boton.dataset.asiento);
  }

  function actualizarResumen() {
    const elegidos = asientosElegidos();
    resumenValor.textContent = elegidos.length ? elegidos.join(", ") : "—";
    resumenTotal.textContent = `$${(elegidos.length * funcion.precio).toFixed(2)}`;
    botonContinuar.disabled = elegidos.length === 0;
  }

  mapa.addEventListener("click", (evento) => {
    const asiento = evento.target.closest(".asiento");
    if (!asiento || asiento.disabled) return;
    asiento.classList.toggle("seleccionado");
    actualizarResumen();
  });

  actualizarResumen();

  botonContinuar.addEventListener("click", () => {
    const elegidos = asientosElegidos();
    const compra = {
      peliculaId: pelicula.id,
      titulo: pelicula.titulo,
      genero: pelicula.genero,
      duracionMinutos: pelicula.duracionMinutos,
      fecha: "Hoy",
      hora: funcion.hora,
      sala: funcion.sala,
      asientos: elegidos,
      total: elegidos.length * funcion.precio,
    };
    sessionStorage.setItem("compra", JSON.stringify(compra));
    window.location.href = "formulario.html";
  });

  document.querySelector(".boton-volver").addEventListener("click", () => {
    window.history.back();
  });
}
