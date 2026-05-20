const inpNumero = document.getElementById("inpNumero");
const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");
const pSaida = document.getElementById("pSaida");

btnCalcular.addEventListener("click", calcularFatorial);
btnLimpar.addEventListener("click", limpar);

function calcularFatorial() {
    const numero = Number(inpNumero.value);

    if (inpNumero.value === "" || isNaN(numero)) {
        alert("Informe um valor numérico inteiro para N.");
        inpNumero.focus();
        return;
    }

    if (!Number.isInteger(numero)) {
        alert("N deve ser um número inteiro.");
        inpNumero.focus();
        return;
    }

    if (numero < 0) {
        alert("N deve ser maior ou igual a zero.");
        inpNumero.focus();
        return;
    }

    let fatorial = 1;
    const fatores = [];

    for (let i = numero; i >= 1; i--) {
        fatorial *= i;
        fatores.push(i);
    }

    if (numero === 0 || numero === 1) {
        pSaida.textContent = `${numero}! = 1`;
        return;
    }

    pSaida.textContent = `${numero}! = ${fatores.join(" * ")} = ${fatorial}`;
}

function limpar() {
    inpNumero.value = "";
    pSaida.textContent = "";
    inpNumero.focus();
}
