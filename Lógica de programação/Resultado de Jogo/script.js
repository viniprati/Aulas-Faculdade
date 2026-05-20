var timeA = document.getElementById("timeA");
var timeB = document.getElementById("timeB");
var botao = document.getElementById("btnResultado");
var resultado = document.getElementById("resultado");

botao.addEventListener("click", function () {
    var golsA = Number(timeA.value);
    var golsB = Number(timeB.value);

    if (timeA.value === "" || timeB.value === "" || golsA < 0 || golsB < 0) {
        alert("Informe valores validos. Os campos nao podem ficar vazios ou menores que zero.");
        resultado.textContent = "";
    } else if (golsA === golsB) {
        resultado.textContent = "Empate";
    } else if (golsA > golsB) {
        if (golsA - golsB > 2) {
            resultado.textContent = "Time A venceu de goleada";
        } else {
            resultado.textContent = "Time A venceu";
        }
    } else {
        if (golsB - golsA > 2) {
            resultado.textContent = "Time B venceu de goleada";
        } else {
            resultado.textContent = "Time B venceu";
        }
    }
});
