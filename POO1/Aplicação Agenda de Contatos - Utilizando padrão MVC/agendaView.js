import { AgendaController } from "./AgendaController.js";

const inNomeContato = document.getElementById("inNomeContato");
const inEnderecoContato = document.getElementById("inEnderecoContato");
const inTelefoneContato = document.getElementById("inTelefoneContato");
const inCpfContato = document.getElementById("inCpfContato");
const inDataNascContato = document.getElementById("inDataNascContato");
const inDescricaoGrupo = document.getElementById("inDescricaoGrupo");
const selectOpcao = document.getElementById("selectOpcao");
const outSaida = document.getElementById("outSaida");
const btOk = document.getElementById("btOk");
const table = document.querySelector(".table");

const agendaControl = new AgendaController();
document.addEventListener("DOMContentLoaded", agendaControl.carregadorDados());

btOk.addEventListener("click", executarFunc);

selectOpcao.addEventListener("change", function () {
    let opcao = selectOpcao.value;

    if (opcao != "") {
        verificarOpcao(opcao);
    }
    btOk.disabled = false;
});


function verificarOpcao(opcao) {
    inNomeContato.disabled = true;
    inNomeContato.placeholder = "";
    inNomeContato.value = "";

    inEnderecoContato.disabled = true;
    inEnderecoContato.placeholder = "";
    inEnderecoContato.value = "";

    inTelefoneContato.disabled = true;
    inTelefoneContato.placeholder = "";
    inTelefoneContato.value = "";

    inCpfContato.disabled = true;
    inCpfContato.placeholder = "";
    inCpfContato.value = "";

    inDataNascContato.disabled = true;
    inDataNascContato.placeholder = "";
    inDataNascContato.value = "";

    inDescricaoGrupo.disabled = true;
    inDescricaoGrupo.placeholder = "";
    inDescricaoGrupo.value = "";

    outSaida.innerHTML = "";

    switch (opcao) {
        case "Cadastrar-Contato":
            inNomeContato.disabled = false;
            inNomeContato.placeholder = "Insira o Nome";
            inNomeContato.value = "";

            inEnderecoContato.disabled = false;
            inEnderecoContato.placeholder = "Insira o Endereço";
            inEnderecoContato.value = "";

            inTelefoneContato.disabled = false;
            inTelefoneContato.placeholder = "(XX)XXXXX-XXXX";
            inTelefoneContato.value = "";

            inCpfContato.disabled = false;
            inCpfContato.value = "";
            inCpfContato.placeholder = "XXX.XXX.XXX-XX";

            inDataNascContato.disabled = false;
            inDataNascContato.placeholder = "DD/MM/AAAA";
            inDataNascContato.value = "";
            break;

        case "Excluir-Contato":
        case "Exibir-Contato":
            inNomeContato.disabled = false;
            inNomeContato.placeholder = "Insira o Nome";
            inNomeContato.value = "";
            break;

        case "Alterar-Endereco":
            inNomeContato.disabled = false;
            inNomeContato.placeholder = "Insira o Nome";
            inNomeContato.value = "";
            inEnderecoContato.disabled = false;
            inEnderecoContato.placeholder = "Insira o Endereço";
            inEnderecoContato.value = "";
            break;

        case "Alterar-Telefone":
            inNomeContato.disabled = false;
            inNomeContato.placeholder = "Insira o Nome";
            inNomeContato.value = "";
            inTelefoneContato.disabled = false;
            inTelefoneContato.placeholder = "(XX)XXXXX-XXXX";
            inTelefoneContato.value = "";
            break;

        case "Filtrar-Endereço":
            inEnderecoContato.disabled = false;
            inEnderecoContato.placeholder = "Insira o Endereço";
            inEnderecoContato.value = "";
            break;

        case "Cadastrar-Grupo":
        case "Excluir-Grupo":
        case "Listar-Contatos-Grupo":
            inDescricaoGrupo.disabled = false;
            inDescricaoGrupo.placeholder = "Ex: Família, Amigos, Academia, Igreja...";
            inDescricaoGrupo.value = "";
            break;

        case "Incluir-Contato-Grupo":
        case "Excluir-Contato-Grupo":
            inNomeContato.disabled = false;
            inNomeContato.placeholder = "Insira o Nome";
            inNomeContato.value = "";
            inDescricaoGrupo.disabled = false;
            inDescricaoGrupo.placeholder = "Ex: Família, Amigos, Academia, Igreja...";
            inDescricaoGrupo.value = "";
            break;
    }
}


function executarFunc() {

    let opcao = selectOpcao.value;

    outSaida.innerHTML = "";
    table.innerHTML = "";

    switch (opcao) {
        case "Cadastrar-Contato":
            if (inNomeContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Nome Vazio";
                inNomeContato.focus();
            } else if (inCpfContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo CPF Vazio";
                inCpfContato.focus();
            } else if (inDataNascContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Data Nascimento Vazio";
                inDataNascContato.focus();
            } else {
                if (agendaControl.cadastrarContato(inNomeContato.value, inTelefoneContato.value, inEnderecoContato.value, inCpfContato.value, inDataNascContato.value)) {
                    outSaida.style.color = "blue";
                    outSaida.innerHTML = "Contato Cadastrado!";

                } else {
                    outSaida.style.color = "red";
                    outSaida.innerHTML = "Erro! o Contato Já Existe!";
                }
            }
            break;

        case "Excluir-Contato":
            if (inNomeContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Nome Vazio!";
                inNomeContato.focus()
            } else {

                if (agendaControl.excluirContato(inNomeContato.value)) {
                    outSaida.style.color = "blue";
                    outSaida.innerHTML = "Contato Excluido com Sucesso!";
                } else {
                    outSaida.style.color = "red";
                    outSaida.innerHTML = "Contato não encontrado!";
                }
            }
            break;

        case "Alterar-Endereco":
            if (inNomeContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Nome Vazio!";
                inNomeContato.focus()
            } else if (inEnderecoContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Endereço Vazio!";
                inEnderecoContato.focus();
            } else {
                if (agendaControl.alterarEndereco(inNomeContato.value, inEnderecoContato.value)) {

                    outSaida.style.color = "blue";
                    outSaida.innerHTML = "Endereço Alterado com Sucesso!";

                } else {
                    outSaida.style.color = "red";
                    outSaida.innerHTML = "O Contato Não existe!";
                }
            }
            break;

        case "Alterar-Telefone":
            if (inNomeContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Nome Vazio!";
                inNomeContato.focus()
            } else if (inTelefoneContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Telefone Vazio!";
                inTelefoneContato.focus();
            } else {
                if (agendaControl.alterarTelefone(inNomeContato.value, inTelefoneContato.value)) {

                    outSaida.style.color = "blue";
                    outSaida.innerHTML = "Telefone Alterado com Sucesso!";

                } else {
                    outSaida.style.color = "red";
                    outSaida.innerHTML = "O Contato Não existe ou Telefone em formato inválido (XX) XXXXX-XXXX!";
                }
            }
            break;

        case "Exibir-Contato":
            if (inNomeContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Nome Vazio!";
                inNomeContato.focus()
            } else {
                let objLiteralContato = agendaControl.consultarContato(inNomeContato.value);
                if (objLiteralContato != undefined) {
                    outSaida.style.color = "blue";
                    outSaida.innerHTML =
                        `Nome: ${objLiteralContato.nome}` +
                        `\nTelefone: ${objLiteralContato.telefone}` +
                        `\nEndereço: ${objLiteralContato.endereco}` +
                        `\nCPF: ${objLiteralContato.cpf}` +
                        `\nData de Nascimento: ${objLiteralContato.dataNasc}`;
                }
                else {
                    outSaida.style.color = "red";
                    outSaida.innerHTML = "O Contato não existe!";
                }
            }
            break;

        case "Filtrar-Endereço":
            if (inEnderecoContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Endereço Vazio!";
                inEnderecoContato.focus();
            } else {

                let vetObjetosLiteraisContato = agendaControl.filtrarEndereco(inEnderecoContato.value);

                if (vetObjetosLiteraisContato.length > 0) {
                    table.appendChild(gerarTabelaHtmlContatos(vetObjetosLiteraisContato));
                } else {
                    outSaida.style.color = "red";
                    outSaida.innerHTML = "Nenhum Contato com o Endereço informado!";
                }
            }
            break;

        case "Listar-Contatos":

            let vetObjetosLiteraisContato = agendaControl.listarContatos();

            if (vetObjetosLiteraisContato.length > 0) {
                table.appendChild(gerarTabelaHtmlContatos(vetObjetosLiteraisContato));
            } else {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Nenhum Contato Cadastrado!";
            }
            break;

        case "Cadastrar-Grupo":
            if (inDescricaoGrupo.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Descrição do Grupo Vazio!";
                inDescricaoGrupo.focus();
            } else {
                if (agendaControl.cadastrarGrupo(inDescricaoGrupo.value)) {
                    outSaida.style.color = "blue";
                    outSaida.innerHTML = "Grupo Cadastrado!";

                } else {
                    outSaida.style.color = "red";
                    outSaida.innerHTML = "Erro! O Grupo já existe!";
                }
            }
            break;

        case "Excluir-Grupo":
            if (inDescricaoGrupo.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Descrição do Grupo Vazio!";
                inDescricaoGrupo.focus();
            } else {
                if (agendaControl.excluirGrupo(inDescricaoGrupo.value)) {
                    outSaida.style.color = "blue";
                    outSaida.innerHTML = "Grupo Excluído com Sucesso!";
                } else {
                    outSaida.style.color = "red";
                    outSaida.innerHTML = "Não existe Grupo com a descrição informada!";
                }
            }
            break;

        case "Incluir-Contato-Grupo":
            if (inNomeContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Nome Vazio!";
                inNomeContato.focus()
            } else if (inDescricaoGrupo.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Descrição do Grupo Vazio!";
                inDescricaoGrupo.focus();
            } else {
                const mensagens = {
                    "SUCESSO": { cor: "blue", texto: "Sucesso! Contato incluído no Grupo." },
                    "CONTATO_JA_NO_GRUPO": { cor: "red", texto: "Falha! Contato já estava incluído no Grupo." },
                    "GRUPO_NAO_ENCONTRADO": { cor: "red", texto: "Falha! Não existe Grupo com a descrição informada." },
                    "CONTATO_NAO_ENCONTRADO": { cor: "red", texto: "Falha! Não existe Contato com o nome informado." }
                };
                let resultado = agendaControl.incluirContatoGrupo(inNomeContato.value, inDescricaoGrupo.value);
                outSaida.style.color = mensagens[resultado].cor;
                outSaida.innerHTML = mensagens[resultado].texto;
            }
            break;

        case "Excluir-Contato-Grupo":
            if (inNomeContato.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Nome Vazio!";
                inNomeContato.focus()
            } else if (inDescricaoGrupo.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Descrição do Grupo Vazio!";
                inDescricaoGrupo.focus();
            } else {
                const mensagens = {
                    "SUCESSO": { cor: "blue", texto: "Sucesso! Contato excluído no Grupo." },
                    "CONTATO_NAO_ESTA_NO_GRUPO": { cor: "red", texto: "Falha! Contato não está incluído no Grupo!" },
                    "GRUPO_NAO_ENCONTRADO": { cor: "red", texto: "Falha! Não existe Grupo com a descrição informada." },
                    "CONTATO_NAO_ENCONTRADO": { cor: "red", texto: "Falha! Não existe Contato com o nome informado." }
                };
                let resultado = agendaControl.excluirContatoGrupo(inNomeContato.value, inDescricaoGrupo.value);
                outSaida.style.color = mensagens[resultado].cor;
                outSaida.innerHTML = mensagens[resultado].texto;
            }
            break;

        case "Listar-Contatos-Grupo":
            if (inDescricaoGrupo.value == "") {
                outSaida.style.color = "red";
                outSaida.innerHTML = "Campo Descrição do Grupo Vazio!";
                inDescricaoGrupo.focus();
            } else {
                let vetObjetosLiteraisContato = agendaControl.listarContatosGrupo(inDescricaoGrupo.value);
                if (vetObjetosLiteraisContato.length > 0) {
                    table.appendChild(gerarTabelaHtmlContatos(vetObjetosLiteraisContato));
                } else {
                    outSaida.style.color = "red";
                    outSaida.innerHTML = "Não existe Grupo com a descrição informada ou o Grupo não possui contatos!";
                }
            }
            break;

        case "Salvar":
            agendaControl.salvarLocalStorage();
            break;
    }
}

function gerarTabelaHtmlContatos(vetObjLiteraisContato) {
    /* Gera uma tabela HTML com os contatos do vetor passado como parâmetro.
       Retorna o elemento <table>.
    */
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    thead.appendChild(document.createElement("th")).innerHTML = "Nome";
    thead.appendChild(document.createElement("th")).innerHTML = "Telefone";
    thead.appendChild(document.createElement("th")).innerHTML = "Endereço";
    thead.appendChild(document.createElement("th")).innerHTML = "CPF";
    thead.appendChild(document.createElement("th")).innerHTML = "Data Nasc.";

    table.appendChild(thead);

    vetObjLiteraisContato.forEach((objLitContato) => {
        let linha = document.createElement("tr");

        let tdNome = document.createElement("td");
        let tdTel = document.createElement("td");
        let tdEndereco = document.createElement("td");
        let tdCPF = document.createElement("td");
        let tdNasc = document.createElement("td");

        tdNome.innerHTML = objLitContato.nome;
        tdTel.innerHTML = objLitContato.telefone;
        tdEndereco.innerHTML = objLitContato.endereco;
        tdCPF.innerHTML = objLitContato.cpf;
        tdNasc.innerHTML = objLitContato.dataNasc;

        linha.appendChild(tdNome);
        linha.appendChild(tdTel);
        linha.appendChild(tdEndereco);
        linha.appendChild(tdCPF);
        linha.appendChild(tdNasc);

        tbody.appendChild(linha);
    });

    table.appendChild(tbody);

    return table;
}