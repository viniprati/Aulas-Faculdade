const sctMatriz = document.getElementById("sctMatriz");
const inQtAlunos = document.getElementById("inQtAlunos");
const inQtAvaliacoes = document.getElementById("inQtAvaliacoes");
const btIniciar = document.getElementById("btIniciar");

const sctNotas = document.getElementById("sctNotas");
const tblNotas = document.getElementById("tblNotas");
const btSalvar = document.getElementById("btSalvar");
const btAlterar = document.getElementById("btAlterar");
const btNotaFinal = document.getElementById("btNotaFinal");
const btMaioresNotas = document.getElementById("btMaioresNotas");

const outMsg = document.getElementById("outMsg");

var matrizNotas = [];
var qtAlunos;
var qtAvaliacoes;


btIniciar.addEventListener("click", () => {
 
    outMsg.innerHTML = "";
    
    qtAlunos = Number(inQtAlunos.value);
    qtAvaliacoes = Number(inQtAvaliacoes.value);

    if (inQtAlunos.value == "" || qtAlunos <= 0) {
        alert("Informe Quant. Alunos maior que zero!");
        inQtAlunos.focus();
    } else if (inQtAvaliacoes.value == "" || qtAvaliacoes <= 0){
        alert("Informe Quant. Avaliações maior que zero!");
        inQtAvaliacoes.focus();
    } else {
        for (let lin = 0; lin < qtAlunos; lin++) {
            matrizNotas.push([]);
        }
        sctMatriz.hidden = true;
        sctNotas.hidden = false;
        tblNotas.innerHTML = gerarTabelaNotas(qtAlunos, qtAvaliacoes);
    }
});

function gerarTabelaNotas(qtAlunos, qtAvaliacoes) {
    var tabelaNotasHtml = "<thead><th>Aluno</th>";
    for (let col = 0; col < qtAvaliacoes; col++) {
        tabelaNotasHtml += `<th>Av${col + 1}</th>`;
    }
    tabelaNotasHtml += "</thead>";
    
    tabelaNotasHtml += "<tbody>";
    for (let lin = 0; lin < qtAlunos; lin++) {
        tabelaNotasHtml += `<tr><td>Aluno${lin + 1}</td>`;
        for (let col = 0; col < qtAvaliacoes; col++) {
            tabelaNotasHtml += `<td><input type="number" id="inNota${lin}${col}" style="width: 50px;"></td>`;
        }
        tabelaNotasHtml += "</tr>";
    }
    tabelaNotasHtml += "</tbody>";
    return tabelaNotasHtml;
}

btSalvar.addEventListener("click", () => {
    var erroInput = false;

    for (let lin = 0; lin < qtAlunos && !erroInput; lin++) {
        for (let col = 0; col < qtAvaliacoes && !erroInput; col++) {
            let inNotaAlunoAval = document.getElementById(`inNota${lin}${col}`);
            let nota = Number(inNotaAlunoAval.value);
            
            if (inNotaAlunoAval.value == "" || nota < 0 || nota > 100) {
                alert(`Nota de Aluno${lin + 1} - Avaliação${col + 1} deve ser entre 0 e 100.`);
                inNotaAlunoAval.focus();
                erroInput = true;
            } else {
                matrizNotas[lin][col] = nota;
                inNotaAlunoAval.disabled = true;
            }
        }
    }
    if (!erroInput) {
        outMsg.innerHTML = "Notas registradas com sucesso!";
        console.log("Matriz de Notas:\n", matrizNotas);
    }
});

btAlterar.addEventListener("click", () => {
    outMsg.innerHTML = "";

    for (let lin = 0; lin < qtAlunos; lin++) {
        matrizNotas[lin] = [];
        for (let col = 0; col < qtAvaliacoes; col++) {
            let inNotaAlunoAval = document.getElementById(`inNota${lin}${col}`);
            inNotaAlunoAval.disabled = false;
        }
    }
});

btNotaFinal.addEventListener("click", () => {
    var erroMatrizNotas = false;

    matrizNotas.forEach(
        (linha) => {
            if (linha.length < qtAvaliacoes || linha.includes(undefined)) {
                erroMatrizNotas = true;
            }
        }
    );

    if (erroMatrizNotas) {
        alert("Registre todas notas na tabela antes de calcular a nota final.");
    } else {
        var notasFinais = "";
        for (let lin = 0; lin < matrizNotas.length; lin++) {
            notasFinais += `Aluno${lin + 1}: ${calcularNotaFinal(matrizNotas[lin]).toFixed(1)}<br>`;
        }
        outMsg.innerHTML = "Notas Finais:<br>" + notasFinais;
    }
});

btMaioresNotas.addEventListener("click", () => {
    var erroMatrizNotas = false;

    matrizNotas.forEach(
        (linha) => {
            if (linha.length < qtAvaliacoes || linha.includes(undefined)) {
                erroMatrizNotas = true;
            }
        }
    );

    if (erroMatrizNotas) {
        alert("Registre todas notas na tabela antes de identificar as maiores notas.");
    } else {
        var maioresNotas = "";

        for (let col = 0; col < qtAvaliacoes; col++) {
            var maiorNota = matrizNotas[0][col];
            var alunoMaiorNota = 0;

            for (let lin = 1; lin < qtAlunos; lin++) {
                if (matrizNotas[lin][col] > maiorNota) {
                    maiorNota = matrizNotas[lin][col];
                    alunoMaiorNota = lin;
                }
            }

            maioresNotas += `Av${col + 1} - Aluno${alunoMaiorNota + 1}<br>`;
        }

        outMsg.innerHTML = "Maiores Notas por Avaliação:<br>" + maioresNotas;
    }
});

function calcularNotaFinal(vetorNotas) {
    var somaNotas = 0.0;

    vetorNotas.forEach(
        (nota) => {
            somaNotas += nota;
        }
    );

    return somaNotas;
}



