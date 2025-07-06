const btn = document.getElementById("lanzar-btn");
const resultadoTexto = document.getElementById("resultado-texto");
const dadoImg = document.getElementById("dado-img");
const historialList = document.getElementById("historial");
const nombreInput = document.getElementById("nombre-jugador");

const sonido = new Audio("/static/sounds/dice_roll.mp3");

let historial = [];

btn.addEventListener("click", () => {
    const nombreJugador = nombreInput.value.trim() || "Jugador";

    dadoImg.style.opacity = 0;
    resultadoTexto.textContent = "";

    sonido.pause();
    sonido.currentTime = 0;
    sonido.volume = 1;

    const playPromise = sonido.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log("Sonido reproducido correctamente");
            })
            .catch((error) => {
                console.error("Error al reproducir sonido:", error);
            });
    }

    setTimeout(() => {
        fetch("/api/lanzar", { method: "POST" })
            .then((response) => response.json())
            .then((data) => {
                const resultado = data.resultado;
                resultadoTexto.textContent = `🎲 ${nombreJugador} ha lanzado un ${resultado}!`;
                dadoImg.src = `/static/dados/dado_${resultado}.png`;
                dadoImg.style.opacity = 1;

                historial.push(`${nombreJugador} → ${resultado}`);
                renderHistorial();
            })
            .catch((error) => {
                resultadoTexto.textContent = "Error al lanzar el dado.";
                console.error("Error en la petición:", error);
            });
    }, 500);
});

function renderHistorial() {
    historialList.innerHTML = "";
    historial.forEach((entrada, index) => {
        const li = document.createElement("li");
        li.textContent = `Tirada ${index + 1}: ${entrada}`;
        historialList.appendChild(li);
    });
}
