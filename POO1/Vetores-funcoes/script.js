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
    /*  Converte o vetor em uma string formatada e retorna essa string
        Cada elemento do vetor é exibido em uma linha, com seu índice e valor
        Exemplo: [0]: 31
                 [1]: 7
                 [2]: 53
    */
    let strVetor = "";
    vetor.forEach(
        (numero, ind) => {
            strVetor += `[${ind}]: ${numero}<br>`;
        }
    );
    return strVetor;
}

function inserirElemento(vetor, elemento){
    /*  Insere um elemento no vetor, caso ele não exista
        Retorna true se o elemento foi inserido, false caso contrário
    */
    if (vetor.includes(elemento) == false){
        vetor.push(elemento);
        return true;
    }
    return false; // elemnento não incluído, pois já existe no vetor
}

function excluirElemento(vetor, elemento){
    /*  Exclui um elemento do vetor, caso ele exista
        Retorna true se o elemento foi excluido, false caso contrário
    */
    let posicao = vetor.indexOf(elemento);
    if (posicao >= 0){
        vetor.splice(posicao, 1);
        return true;
    }
    return false;
}

function somarElementos(vetor){
    /*  Retorna a soma de todos os elementos do vetor
    */
    var acumuladora = 0;

    vetor.forEach(
        (numero) => {
            acumuladora += numero;
        }
    );
    return acumuladora;
}

function indexMenorElemento(vetor){
    /*  Retorna o índice do menor elemento do vetor
    */
    var indexMenor = 0;

    for (let ind = 1; ind < vetor.length; ind++){
        if (vetor[ind] < vetor[indexMenor]){
            indexMenor = ind;
        }
    }
    return indexMenor;
}

function alterarElemento(vetor, posicao, elemento){
    /*  Altera o elemento da posição informada, caso a posição exista
        e o novo elemento ainda não exista no vetor.
        Retorna true se o elemento foi alterado, false caso contrário.
    */
    if (posicao >= 0 && posicao < vetor.length && vetor.includes(elemento) == false){
        vetor[posicao] = elemento;
        return true;
    }
    return false;
}

function procurarElemento(vetor, elemento){
    /*  Retorna o índice do elemento procurado.
        Se o elemento não existir, retorna -1.
    */
    return vetor.indexOf(elemento);
}

function indexMaiorElemento(vetor){
    /*  Retorna o índice do maior elemento do vetor
    */
    var indexMaior = 0;

    for (let ind = 1; ind < vetor.length; ind++){
        if (vetor[ind] > vetor[indexMaior]){
            indexMaior = ind;
        }
    }
    return indexMaior;
}

function calcularMedia(vetor){
    /*  Retorna a média dos elementos do vetor
    */
    return somarElementos(vetor) / vetor.length;
}

function ordenarElementos(vetor){
    /*  Retorna uma string com os elementos do vetor em ordem crescente,
        sem alterar a ordem original do vetor.
    */
    let copiaVetor = vetor.slice();
    copiaVetor.sort(
        (a, b) => a - b
    );
    return toString(copiaVetor);
}
