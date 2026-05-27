const inpEmprestimo = document.getElementById("inpEmprestimo");
const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");
const tblResultado = document.getElementById("tblResultado");
const tbResultados = document.getElementById("tbResultados");

btnCalcular.addEventListener("click", calcularEmprestimo);
btnLimpar.addEventListener("click", limpar);

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function calcularEmprestimo() {
    const valorInicial = Number(inpEmprestimo.value);

    if (inpEmprestimo.value === "" || isNaN(valorInicial) || valorInicial <= 0) {
        alert("Informe um valor de empréstimo maior que zero.");
        inpEmprestimo.focus();
        return;
    }

    tbResultados.innerHTML = "";

    let percentualJuros = 5;

    for (let parcelas = 3; parcelas <= 30; parcelas += 3) {
        const valorJuros = valorInicial * percentualJuros / 100;
        const valorDivida = valorInicial + valorJuros;
        const valorParcela = valorDivida / parcelas;

        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${parcelas}</td>
            <td>${formatarMoeda(valorDivida)}</td>
            <td>${formatarMoeda(valorJuros)}</td>
            <td>${formatarMoeda(valorParcela)}</td>
        `;

        tbResultados.appendChild(linha);
        percentualJuros += 5;
    }

    tblResultado.hidden = false;
}

function limpar() {
    inpEmprestimo.value = "";
    tbResultados.innerHTML = "";
    tblResultado.hidden = true;
    inpEmprestimo.focus();
}
