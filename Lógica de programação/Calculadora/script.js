const selOperacao = document.getElementById("selOperacao");
const inpOperando1 = document.getElementById("inpOperando1");
const inpOperando2 = document.getElementById("inpOperando2");
const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");
const pSaida = document.getElementById("pSaida");

btnCalcular.addEventListener("click", calcular);
btnLimpar.addEventListener("click", limpar);

function calcular() {
    const operacao = selOperacao.value;
    const operando1 = Number(inpOperando1.value);
    const operando2 = Number(inpOperando2.value);
    let resultado;
    let mensagem;

    if (inpOperando1.value === "" || isNaN(operando1)) {
        alert("Informe um valor numérico para o Operando 1.");
        inpOperando1.focus();
        return;
    }

    if (operacao !== "SQRT" && (inpOperando2.value === "" || isNaN(operando2))) {
        alert("Informe um valor numérico para o Operando 2.");
        inpOperando2.focus();
        return;
    }

    switch (operacao) {
        case "+":
            resultado = operando1 + operando2;
            mensagem = `${operando1} + ${operando2} = ${resultado}`;
            break;

        case "-":
            resultado = operando1 - operando2;
            mensagem = `${operando1} - ${operando2} = ${resultado}`;
            break;

        case "*":
            resultado = operando1 * operando2;
            mensagem = `${operando1} * ${operando2} = ${resultado}`;
            break;

        case "/":
            if (operando2 === 0) {
                pSaida.textContent = "ERRO... Divisão por ZERO impossivel!";
                inpOperando2.focus();
                return;
            }

            resultado = operando1 / operando2;
            mensagem = `${operando1} / ${operando2} = ${resultado}`;
            break;

        case "^":
            resultado = operando1 ** operando2;
            mensagem = `${operando1} ^ ${operando2} = ${resultado}`;
            break;

        case "SQRT":
            if (operando1 < 0) {
                pSaida.textContent = "ERRO... Raiz Quadrada de valor negativo não é um número Real!";
                inpOperando1.focus();
                return;
            }

            resultado = Math.sqrt(operando1);
            mensagem = `SQRT(${operando1}) = ${resultado}`;
            break;

        default:
            alert("Escolha uma operação válida.");
            return;
    }

    pSaida.textContent = mensagem;
}

function limpar() {
    selOperacao.value = "+";
    inpOperando1.value = "";
    inpOperando2.value = "";
    pSaida.textContent = "";
    inpOperando1.focus();
}
