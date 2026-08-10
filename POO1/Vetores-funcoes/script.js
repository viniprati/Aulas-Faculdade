const sltOpcoes = document.getElementById("sltOpcoes");
const inValor = document.getElementById("inValor");
const inPosicao = document.getElementById("inPosicao");
const btExecutar = document.getElementById("btExecutar");
const outSaida = document.getElementById("outSaida");

btExecutar.addEventListener("click", executarFunc);

const vetNumeros = [31, 7, 53, 18, 24, 9];

function executarFunc(){
    let opcao = sltOpcoes.value;
    let valor = Number(inValor.value);
    let posicao = Number(inPosicao.value);

    switch (opcao){
        case "MOSTRAR":
            outSaida.innerHTML = "Elementos do Vetor:<br>" + toString(vetNumeros);
            break;
        case "INCLUIR":
            if(inValor.value != ""){
                let inseriu = inserirElemento(vetNumeros, valor);
                if (inseriu == true){
                    outSaida.innerHTML = "Sucesso! Elemento inserido!";
                } else {
                    outSaida.innerHTML = "Não Inserido! Elemento já existe no vetor!";
                }
            }
            break;
        case "EXCLUIR":
            if(inValor.value != ""){
                let excluiu = excluirElemento(vetNumeros, valor);
                if (excluiu == true){
                    outSaida.innerHTML = "Sucesso! Elemento excluído!";
                } else {
                    outSaida.innerHTML = "Não excluído! Elemento não existe no vetor!";
                }
            }
            break;
        case "ALTERAR":
            if(inValor.value != "" && inPosicao.value != ""){
                let alterou = alterarElemento(vetNumeros, posicao, valor);
                if (alterou == true){
                    outSaida.innerHTML = "Sucesso! Elemento alterado!";
                } else {
                    outSaida.innerHTML = "Não alterado! A posição não existe ou o valor já existe no vetor!";
                }
            }
            break;
        case "PROCURAR":
            if(inValor.value != ""){
                let posicaoEncontrada = procurarElemento(vetNumeros, valor);
                if (posicaoEncontrada >= 0){
                    outSaida.innerHTML = `Elemento encontrado na posição ${posicaoEncontrada}.`;
                } else {
                    outSaida.innerHTML = "Elemento não existe no vetor!";
                }
            }
            break;
        case "SOMAR":
            outSaida.innerHTML = `Soma dos elementos: ${somarElementos(vetNumeros)}`;
            break;
        case "MENOR":
            let posicaoMenor = indexMenorElemento(vetNumeros);
            outSaida.innerHTML = `Menor elemento: ${vetNumeros[posicaoMenor]}<br>Índice: ${posicaoMenor}`;
            break;
        case "MAIOR":
            let posicaoMaior = indexMaiorElemento(vetNumeros);
            outSaida.innerHTML = `Maior elemento: ${vetNumeros[posicaoMaior]}<br>Índice: ${posicaoMaior}`;
            break;
        case "MEDIA":
            outSaida.innerHTML = `Média dos elementos: ${calcularMedia(vetNumeros)}`;
            break;
        case "ORDENAR":
            outSaida.innerHTML = "Elementos ordenados:<br>" + ordenarElementos(vetNumeros);
            break;
    }
}

function toString(vetor){
    let strVetor = "";
    vetor.forEach(
        (numero, ind) => {
            strVetor += `[${ind}]: ${numero}<br>`;
        }
    );
    return strVetor;
}

function inserirElemento(vetor, elemento){
    if (vetor.includes(elemento) == false){
        vetor.push(elemento);
        return true;
    } else {
        return false;
    }
}

function excluirElemento(vetor, elemento){
    let posicao = vetor.indexOf(elemento);
    if (posicao >= 0){
        vetor.splice(posicao, 1);
        return true;
    } else {
        return false;
    }
}

function somarElementos(vetor){
    var acumuladora = 0;

    vetor.forEach(
        (numero) => {
            acumuladora += numero;
        }
    );
    return acumuladora;
}

function indexMenorElemento(vetor){
    var indexMenor = 0;

    for (let ind = 1; ind < vetor.length; ind++){
        if (vetor[ind] < vetor[indexMenor]){
            indexMenor = ind;
        }
    }
    return indexMenor;
}

function alterarElemento(vetor, posicao, elemento){
    if (posicao < 0 || posicao >= vetor.length){
        return false;
    } else if (vetor.includes(elemento)){
        return false;
    } else {
        vetor[posicao] = elemento;
        return true;
    }
}

function procurarElemento(vetor, elemento){
    return vetor.indexOf(elemento);
}

function indexMaiorElemento(vetor){
    var indexMaior = 0;

    for (let ind = 1; ind < vetor.length; ind++){
        if (vetor[ind] > vetor[indexMaior]){
            indexMaior = ind;
        }
    }
    return indexMaior;
}

function calcularMedia(vetor){
    return somarElementos(vetor) / vetor.length;
}

function ordenarElementos(vetor){
    let copiaVetor = vetor.slice();
    copiaVetor.sort(
        (a, b) => a - b
    );
    return toString(copiaVetor);
}
