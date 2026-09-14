/*
Autor: Henrique, Paulo Cesar, Archimedes
Versão: 3.0 - 09/09/2026
Descrição: Aplicação para gerenciamento de um armazém utilizando matrizes
 */

import {ProdutoController} from "./ProdutoController.js";
//import {Produto} from "./Produto.js";

const inProduto = document.getElementById("inProduto");
const inMes = document.getElementById("inMes");
const inQtd = document.getElementById("inQtd");
const btOk = document.getElementById("btOk");
const outResultado = document.getElementById("outResultado");
const selectOpcao = document.getElementById("selectOpcao");
const sectionResultado = document.querySelector(".sectionResultado");

const produtoController = new ProdutoController();

btOk.addEventListener("click", executarFunc);

selectOpcao.addEventListener("change", function () {
    let opcao = selectOpcao.value;

    if (opcao != "") {
        verificarOpcao(opcao);
    }
});

function verificarOpcao(opcao) {
    inProduto.disabled = true;
    inProduto.placeholder = "";
    inProduto.value = "";
    inQtd.disabled = true;
    inQtd.placeholder = "";
    inQtd.value = "";
    inMes.disabled = true;
    inMes.placeholder = "";
    inMes.value = "";

    outResultado.innerHTML = "";
    sectionResultado.innerHTML = "";


    switch (opcao) {
        case "Cadastrar":
        case "Excluir":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            break;
        case "Alterar":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            inMes.disabled = false;
            inMes.placeholder = "Digite um mês [1-12]";
            inQtd.disabled = false;
            inQtd.placeholder = "Digite a quantidade vendida no mês";
            break;
        case "ConsultarQtd":
            inProduto.disabled = false;
            inProduto.placeholder = "Digite um produto";
            break;
        case "ConsultarProd":
            inMes.disabled = false;
            inMes.placeholder = "Digite um mês [1-12]";
            break;
        case "FiltrarQtdEst":
            inQtd.disabled = false;
            inQtd.placeholder = "Digite filtro quant. estoque";
    }
}

function executarFunc() {
    let opcao = selectOpcao.value;
    let descrProduto = (inProduto.value).toUpperCase();
    let mes = Number(inMes.value);
    let quantidade = Number (inQtd.value); 
    outResultado.innerHTML = "";
    sectionResultado.innerHTML = "";

    switch (opcao) {
        case "Cadastrar":
        
            if (descrProduto == "") {
                outResultado.style.color = "red";
                outResultado.innerHTML = "Para cadastrar produto novo, o campo deve ser preenchido!";
                inProduto.focus();
            } else {
                if (produtoController.cadastrarProduto(descrProduto) == true) {
                    outResultado.style.color = "blue";
                    outResultado.innerHTML = "O novo produto foi cadastrado com sucesso!";
                } else {
                    outResultado.style.color = "red";
                    outResultado.innerHTML = "Erro! O produto " + descrProduto + " já estava cadastrado!";
                    inProduto.focus();
                }
            }
            break;

        case "Excluir":
            if (descrProduto == ""){
                outResultado.style.color = "red";
                outResultado.innerHTML = "Para excluir um produto, o campo deve ser preenchido!";
                inProduto.focus();
            } else {
                if (produtoController.excluirProduto(descrProduto)){
                    outResultado.style.color = "blue";
                    outResultado.innerHTML = "O produto " + descrProduto + " foi excluído dos registros do Armazém!";
                } else {
                    outResultado.style.color = "red";
                    outResultado.innerHTML = "O produto que deseja excluir não está cadastrado ou tem quantidade em estoque!";
                }
            }
            break;

        case "Alterar": 
            if(mes < 1 || mes > 12){
                outResultado.style.color = "red";
                outResultado.innerHTML = "Ops, digite um mês de 1-12!";
                inMes.focus();
            } else {
                if (inQtd.value == "" || quantidade < 0){
                    outResultado.style.color = "red";
                    outResultado.innerHTML = "Para alterar quantidade vendida, o campo Quantidade deve ser preenchido com valor >= 0 !";
                    inQtd.focus();
                }else {
                    let produto = produtoController.alterarProduto(descrProduto,mes,quantidade);
                    if (produto != undefined){
                        outResultado.style.color = "blue";
                        outResultado.innerHTML = "O produto " + produto.descricao + " foi alterado no mês " + mes + " tendo como quantidade vendida : " + produto.getQtdVendasMes(mes);
                    } else {
                        outResultado.style.color = "red";
                        outResultado.innerHTML = "O produto que deseja alterar não está cadastrado";
                    }   
                }
            }
            break;
        
        case "Listar":
            let htmlTable = produtoController.criarTableHtml();
            if (htmlTable != undefined){
                sectionResultado.appendChild(htmlTable);
            } else {
                outResultado.style.color = "red";
                outResultado.innerHTML = "Erro! Divergência entre os dados do vetor de Produtos e de Mêses!";
            }
            break;

        case "ConsultarQtd":
            
                if (descrProduto == "") {
                    outResultado.style.color = "red";
                    outResultado.innerHTML = "Para consultar a quantidade deve-se preencher o campo Produto!";
                    inProduto.focus();
    
                } else {
                    let somaVendasProduto = produtoController.consultarQtd(descrProduto, 1, 12);
                    if (somaVendasProduto >= 0) {
                        outResultado.style.color = "blue";
                        outResultado.innerHTML = "O produto " + descrProduto + " vendeu " + somaVendasProduto + " unidades no ano."
                    } else {
                        outResultado.style.color = "red";
                        outResultado.innerHTML = "Erro! O produto " + descrProduto + " não existe!";
                        inProduto.focus();
                    }
                }
                break;

        case "ConsultarProd" :
            if(mes <= 0 || mes > 12){
                outResultado.style.color = "red";
                outResultado.innerHTML = "Ops! digite o mês de 1-12";
                inMes.focus();
            } else {
                let produto = produtoController.produtoMaisVendidoMes(mes);

                if (produto != undefined) {
                    outResultado.style.color = "blue";
                    outResultado.innerHTML = "O produto mais vendido no mês " + mes + " foi: "
                                                + produto.descricao
                                                + " => " + produto.getQtdVendasMes(mes) + " unidades";
                } else {
                    outResultado.style.color = "red";
                    outResultado.innerHTML = "Erro! Nao ha produtos cadastrados.";
                }
            }
        break;
        case "FiltrarQtdEst":
            if (inQtd.value == "" || quantidade < 0){
                outResultado.style.color = "red";
                outResultado.innerHTML = "Para filtrar produtos por quant. em estoque, o campo Quantidade deve ser preenchido com valor >= 0 !";
                inQtd.focus();
            }else {
                let htmlTable = produtoController.filtrarProdsQuantEstoque(quantidade);
                if (htmlTable != undefined){
                    sectionResultado.appendChild(htmlTable);
                } else {
                    outResultado.style.color = "red";
                    outResultado.innerHTML = "Erro! Não há produtos com até " + quantidade + " unidades em estoque!";
                }   
            }
        break;
        case "SalvarProdutos":
            if (produtoController.salvarProdutos()){
                outResultado.style.color = "blue";
                outResultado.innerHTML = "Produtos salvos com sucesso!";
            } else {
                outResultado.style.color = "red";
                outResultado.innerHTML = "Erro! Não foi possível salvar os produtos!";
            }
        break;
    }
}
