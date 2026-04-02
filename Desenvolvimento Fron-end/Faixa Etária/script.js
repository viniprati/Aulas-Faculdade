function calcular() {
    let jovens = Number(document.getElementById("jovens").value);
    let adultos = Number(document.getElementById("adultos").value);
    let idosos = Number(document.getElementById("idosos").value);

    let total = jovens + adultos + idosos;

    let porcentagemJovens = (jovens * 100) / total;
    let porcentagemAdultos = (adultos * 100) / total;
    let porcentagemIdosos = (idosos * 100) / total;

    document.getElementById("resultado").innerHTML =
        "Jovens: " + porcentagemJovens.toFixed(2) + "%<br>" +
        "Adultos: " + porcentagemAdultos.toFixed(2) + "%<br>" +
        "Idosos: " + porcentagemIdosos.toFixed(2) + "%";
}

function limpar() {
    document.getElementById("jovens").value = "";
    document.getElementById("adultos").value = "";
    document.getElementById("idosos").value = "";
    document.getElementById("resultado").innerHTML = "";
}