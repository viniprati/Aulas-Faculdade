function calcular() {
    let peso = Number(document.getElementById("peso").value)
    let altura = Number(document.getElementById("altura").value)

    let imc = peso / (altura * altura)

    document.getElementById("resultado").innerHTML =
        "O IMC calculado é: " + imc.toFixed(2)
}