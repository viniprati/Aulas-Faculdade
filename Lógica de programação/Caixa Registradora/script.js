var total = 0;

function registrar() {
    var preco = Number(document.getElementById("inPreco").value);
    var quantidade = Number(document.getElementById("inQuantidade").value);

    if (preco <= 0 || quantidade <= 0) {
        alert("Digite um preco e uma quantidade validos.");
        return;
    }

    total = total + (preco * quantidade);
    document.getElementById("outTotal").innerHTML = "Total: R$ " + total.toFixed(2).replace(".", ",");

    document.getElementById("inPreco").value = "";
    document.getElementById("inQuantidade").value = "";
    document.getElementById("inPreco").focus();
}

function reiniciar() {
    total = 0;
    document.getElementById("outTotal").innerHTML = "Total: R$ 0,00";
    document.getElementById("inPreco").value = "";
    document.getElementById("inQuantidade").value = "";
    document.getElementById("inPreco").focus();
}

document.getElementById("btRegistrar").onclick = registrar;
document.getElementById("btReiniciar").onclick = reiniciar;
