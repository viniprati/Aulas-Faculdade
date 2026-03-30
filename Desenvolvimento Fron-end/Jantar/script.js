//Primeiro passo: Criar referências para elementos do HTML
const inValorConta = document.getElementById("inValorConta")
const btTotalizar = document.getElementById("btTotalizar")
const outTotalConta = document.getElementById("outTotalConta")

//Segundo passo: 
btTotalizar.addEventListener("click",totalizarConta)
function totalizarConta(){
    var valorConta = Number(inValorConta.value);
    var txGarcom = valorConta * 0.1;
    var totalConta = valorConta + txGarcom;

    outTotalConta.innerHTML= "Taxa de Garçom = R$" + txGarcom.toFixed(2) + 
    "<br>Total a pagar = R$" + totalConta.toFixed(2);
 }
