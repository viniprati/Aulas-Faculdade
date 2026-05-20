const inPreco = document.getElementById("inPreco");
const inQuantidade = document.getElementById("inQuantidade");
const btSomar = document.getElementById("btSomar");
const btZerar = document.getElementById("btZerar");
const outTotal = document.getElementById("outTotal");

let totalCompra = 0;

function atualizarSaida() {
    outTotal.textContent = "Total = R$" + totalCompra.toFixed(2);
}

function somarProduto() {
    const precoTexto = inPreco.value.trim();
    const quantidadeTexto = inQuantidade.value.trim();

    if (precoTexto === "" || quantidadeTexto === "") {
        alert("Preencha o valor e a quantidade do produto.");
        return;
    }

    const preco = Number(precoTexto);
    const quantidade = Number(quantidadeTexto);

    if (!Number.isFinite(preco) || !Number.isFinite(quantidade) || preco <= 0 || quantidade <= 0 || !Number.isInteger(quantidade)) {
        alert("Informe valores validos. O preco deve ser maior que zero e a quantidade deve ser um numero inteiro positivo.");
        return;
    }

    totalCompra += preco * quantidade;
    atualizarSaida();

    inPreco.value = "";
    inQuantidade.value = "";
    inPreco.focus();
}

function zerarCompra() {
    totalCompra = 0;
    inPreco.value = "";
    inQuantidade.value = "";
    atualizarSaida();
    inPreco.focus();
}

btSomar.addEventListener("click", somarProduto);
btZerar.addEventListener("click", zerarCompra);

atualizarSaida();
