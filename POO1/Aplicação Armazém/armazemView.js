import { ArmazemController } from "./ArmazemController.js";

const armazemController = new ArmazemController();

const radioProduto = document.getElementById("radioProduto");
const radioFornecedor = document.getElementById("radioFornecedor");
const divProduto = document.getElementById("divProduto");
const divFornecedor = document.getElementById("divFornecedor");
const selectOpcaoProduto = document.getElementById("selectOpcaoProduto");
const selectOpcaoFornecedor = document.getElementById("selectOpcaoFornecedor");
const btProduto = document.getElementById("btProduto");
const btFornecedor = document.getElementById("btFornecedor");
const btSalvar = document.getElementById("btSalvar");
const outResultado = document.getElementById("outResultado");
const sectionResultado = document.getElementById("sectionResultado");

const inDescricaoProduto = document.getElementById("inDescricaoProduto");
const inPrecoCompra = document.getElementById("inPrecoCompra");
const inPrecoVenda = document.getElementById("inPrecoVenda");
const inQuantidadeProduto = document.getElementById("inQuantidadeProduto");
const inMesProduto = document.getElementById("inMesProduto");
const inCnpjFornecedorProduto = document.getElementById("inCnpjFornecedorProduto");

const inRazaoSocial = document.getElementById("inRazaoSocial");
const inCnpjFornecedor = document.getElementById("inCnpjFornecedor");
const inTelefoneFornecedor = document.getElementById("inTelefoneFornecedor");
const inEnderecoFornecedor = document.getElementById("inEnderecoFornecedor");
const inCreditoFornecedor = document.getElementById("inCreditoFornecedor");

const camposProduto = [
    inDescricaoProduto,
    inPrecoCompra,
    inPrecoVenda,
    inQuantidadeProduto,
    inMesProduto,
    inCnpjFornecedorProduto
];

const camposFornecedor = [
    inRazaoSocial,
    inCnpjFornecedor,
    inTelefoneFornecedor,
    inEnderecoFornecedor,
    inCreditoFornecedor
];

radioProduto.addEventListener("change", alternarPainel);
radioFornecedor.addEventListener("change", alternarPainel);
selectOpcaoProduto.addEventListener("change", configurarCamposProduto);
selectOpcaoFornecedor.addEventListener("change", configurarCamposFornecedor);
btProduto.addEventListener("click", executarOperacaoProduto);
btFornecedor.addEventListener("click", executarOperacaoFornecedor);
btSalvar.addEventListener("click", salvarDados);

function alternarPainel() {
    if (radioProduto.checked) {
        divProduto.hidden = false;
        divFornecedor.hidden = true;
    } else {
        divProduto.hidden = true;
        divFornecedor.hidden = false;
    }

    limparSaida();
}

function configurarCamposProduto() {
    desabilitarCampos(camposProduto);
    btProduto.disabled = selectOpcaoProduto.value == "";

    switch (selectOpcaoProduto.value) {
        case "Cadastrar":
            habilitarCampos([
                inDescricaoProduto,
                inPrecoCompra,
                inPrecoVenda,
                inQuantidadeProduto,
                inCnpjFornecedorProduto
            ]);
            break;
        case "Excluir":
        case "Consultar":
        case "TotalVendasAno":
        case "MaisVendidoMes":
            habilitarCampos([inDescricaoProduto]);
            break;
        case "Alterar":
            habilitarCampos([
                inDescricaoProduto,
                inPrecoCompra,
                inPrecoVenda,
                inQuantidadeProduto,
                inCnpjFornecedorProduto
            ]);
            break;
        case "AlterarVendas":
            habilitarCampos([
                inDescricaoProduto,
                inMesProduto,
                inQuantidadeProduto
            ]);
            break;
        case "Comprar":
            habilitarCampos([
                inDescricaoProduto,
                inQuantidadeProduto,
                inPrecoCompra,
                inPrecoVenda,
                inCnpjFornecedorProduto
            ]);
            break;
        case "Vender":
            habilitarCampos([inDescricaoProduto, inQuantidadeProduto]);
            break;
        case "FaturamentoMes":
            habilitarCampos([inMesProduto]);
            break;
        case "ProdutosFornecedor":
            habilitarCampos([inCnpjFornecedorProduto]);
            break;
        case "Listar":
        case "TabelaVendasAnual":
            break;
    }

    limparSaida();
}

function configurarCamposFornecedor() {
    desabilitarCampos(camposFornecedor);
    btFornecedor.disabled = selectOpcaoFornecedor.value == "";

    switch (selectOpcaoFornecedor.value) {
        case "Cadastrar":
            habilitarCampos(camposFornecedor);
            break;
        case "Excluir":
        case "Consultar":
            habilitarCampos([inCnpjFornecedor]);
            break;
        case "Alterar":
            habilitarCampos(camposFornecedor);
            break;
        case "FiltrarCredito":
            habilitarCampos([inCreditoFornecedor]);
            break;
        case "Listar":
            break;
    }

    limparSaida();
}

function executarOperacaoFornecedor() {
    limparSaida();

    try {
        switch (selectOpcaoFornecedor.value) {
            case "Cadastrar":
                cadastrarFornecedor();
                break;
            case "Excluir":
                executarExclusaoFornecedor();
                break;
            case "Alterar":
                executarAlteracaoFornecedor();
                break;
            case "Consultar":
                consultarFornecedor();
                break;
            case "Listar":
                exibirFornecedores(armazemController.listarFornecedores());
                break;
            case "FiltrarCredito":
                filtrarFornecedores();
                break;
        }
    } catch (erro) {
        mostrarMensagem(erro.message, false);
    }
}

function cadastrarFornecedor() {
    if (campoVazio(inRazaoSocial)) {
        mostrarMensagem("Preencha a razão social do fornecedor.", false);
        inRazaoSocial.focus();
    } else if (campoVazio(inCnpjFornecedor)) {
        mostrarMensagem("Preencha o CNPJ do fornecedor.", false);
        inCnpjFornecedor.focus();
    } else {
        const codigo = armazemController.cadastrarFornecedor(
            inRazaoSocial.value,
            inCnpjFornecedor.value,
            inTelefoneFornecedor.value,
            inEnderecoFornecedor.value,
            inCreditoFornecedor.value
        );

        mostrarCodigo(codigo, "Fornecedor cadastrado com sucesso.");
    }
}

function executarExclusaoFornecedor() {
    if (campoVazio(inCnpjFornecedor)) {
        mostrarMensagem("Informe o CNPJ do fornecedor.", false);
        inCnpjFornecedor.focus();
    } else {
        const codigo = armazemController.excluirFornecedor(inCnpjFornecedor.value);
        mostrarCodigo(codigo, "Fornecedor excluído com sucesso.");
    }
}

function executarAlteracaoFornecedor() {
    if (campoVazio(inCnpjFornecedor)) {
        mostrarMensagem("Informe o CNPJ do fornecedor que será alterado.", false);
        inCnpjFornecedor.focus();
    } else {
        const codigo = armazemController.alterarFornecedor(
            inCnpjFornecedor.value,
            inRazaoSocial.value,
            inTelefoneFornecedor.value,
            inEnderecoFornecedor.value,
            inCreditoFornecedor.value
        );

        mostrarCodigo(codigo, "Fornecedor alterado com sucesso.");
    }
}

function consultarFornecedor() {
    if (campoVazio(inCnpjFornecedor)) {
        mostrarMensagem("Informe o CNPJ do fornecedor.", false);
        inCnpjFornecedor.focus();
    } else {
        const fornecedor = armazemController.consultarFornecedor(inCnpjFornecedor.value);

        if (fornecedor == undefined) {
            mostrarMensagem("Fornecedor não encontrado.", false);
        } else {
            exibirFornecedores([fornecedor]);
        }
    }
}

function filtrarFornecedores() {
    if (campoVazio(inCreditoFornecedor)) {
        mostrarMensagem("Informe o valor de crédito usado no filtro.", false);
        inCreditoFornecedor.focus();
    } else {
        const fornecedores = armazemController.filtrarFornecedoresPorCredito(
            inCreditoFornecedor.value
        );
        exibirFornecedores(fornecedores);
    }
}

function executarOperacaoProduto() {
    limparSaida();

    try {
        switch (selectOpcaoProduto.value) {
            case "Cadastrar":
                cadastrarProduto();
                break;
            case "Excluir":
                executarExclusaoProduto();
                break;
            case "Alterar":
                executarAlteracaoProduto();
                break;
            case "Consultar":
                consultarProduto();
                break;
            case "AlterarVendas":
                alterarVendas();
                break;
            case "Comprar":
                comprarProduto();
                break;
            case "Vender":
                venderProduto();
                break;
            case "TotalVendasAno":
                consultarTotalVendasAno();
                break;
            case "MaisVendidoMes":
                consultarMaisVendidoMes();
                break;
            case "FaturamentoMes":
                consultarFaturamentoMes();
                break;
            case "Listar":
                exibirProdutos(armazemController.listarProdutos());
                break;
            case "TabelaVendasAnual":
                exibirTabelaVendasAnual();
                break;
            case "ProdutosFornecedor":
                exibirProdutosFornecedor();
                break;
        }
    } catch (erro) {
        mostrarMensagem(erro.message, false);
    }
}

function cadastrarProduto() {
    if (campoVazio(inDescricaoProduto)) {
        mostrarMensagem("Preencha a descrição do produto.", false);
        inDescricaoProduto.focus();
    } else {
        const codigo = armazemController.cadastrarProduto(
            inDescricaoProduto.value,
            inPrecoCompra.value,
            inPrecoVenda.value,
            inQuantidadeProduto.value,
            inCnpjFornecedorProduto.value
        );

        mostrarCodigo(codigo, "Produto cadastrado com sucesso.");
    }
}

function executarExclusaoProduto() {
    if (campoVazio(inDescricaoProduto)) {
        mostrarMensagem("Informe a descrição do produto.", false);
        inDescricaoProduto.focus();
    } else {
        const codigo = armazemController.excluirProduto(inDescricaoProduto.value);
        mostrarCodigo(codigo, "Produto excluído com sucesso.");
    }
}

function executarAlteracaoProduto() {
    if (campoVazio(inDescricaoProduto)) {
        mostrarMensagem("Informe a descrição do produto que será alterado.", false);
        inDescricaoProduto.focus();
    } else {
        const codigo = armazemController.alterarProduto(
            inDescricaoProduto.value,
            inPrecoCompra.value,
            inPrecoVenda.value,
            inQuantidadeProduto.value,
            inCnpjFornecedorProduto.value
        );

        mostrarCodigo(codigo, "Produto alterado com sucesso.");
    }
}

function consultarProduto() {
    if (campoVazio(inDescricaoProduto)) {
        mostrarMensagem("Informe a descrição do produto.", false);
        inDescricaoProduto.focus();
    } else {
        const produto = armazemController.consultarProduto(inDescricaoProduto.value);

        if (produto == undefined) {
            mostrarMensagem("Produto não encontrado.", false);
        } else {
            exibirProdutos([produto]);
        }
    }
}

function alterarVendas() {
    if (campoVazio(inDescricaoProduto)) {
        mostrarMensagem("Informe a descrição do produto.", false);
        inDescricaoProduto.focus();
    } else {
        const codigo = armazemController.alterarVendas(
            inDescricaoProduto.value,
            inMesProduto.value,
            inQuantidadeProduto.value
        );

        mostrarCodigo(codigo, "Quantidade vendida alterada com sucesso.");
    }
}

function comprarProduto() {
    if (campoVazio(inDescricaoProduto)) {
        mostrarMensagem("Informe a descrição do produto.", false);
        inDescricaoProduto.focus();
    } else if (campoVazio(inQuantidadeProduto)) {
        mostrarMensagem("Informe a quantidade comprada.", false);
        inQuantidadeProduto.focus();
    } else {
        const codigo = armazemController.comprarProduto(
            inDescricaoProduto.value,
            inQuantidadeProduto.value,
            inPrecoCompra.value,
            inPrecoVenda.value,
            inCnpjFornecedorProduto.value
        );

        mostrarCodigo(codigo, "Compra registrada e estoque atualizado.");
    }
}

function venderProduto() {
    if (campoVazio(inDescricaoProduto)) {
        mostrarMensagem("Informe a descrição do produto.", false);
        inDescricaoProduto.focus();
    } else if (campoVazio(inQuantidadeProduto)) {
        mostrarMensagem("Informe a quantidade vendida.", false);
        inQuantidadeProduto.focus();
    } else {
        const resultado = armazemController.venderProduto(
            inDescricaoProduto.value,
            inQuantidadeProduto.value
        );

        if (resultado.codigo == "SUCESSO") {
            mostrarMensagem(
                `Venda registrada. Total a pagar: ${formatarMoeda(resultado.totalPagar)}.`,
                true
            );
        } else {
            mostrarCodigo(resultado.codigo, "");
        }
    }
}

function consultarTotalVendasAno() {
    if (campoVazio(inDescricaoProduto)) {
        mostrarMensagem("Informe a descrição do produto.", false);
        inDescricaoProduto.focus();
    } else {
        const resultado = armazemController.consultarTotalVendasAno(
            inDescricaoProduto.value
        );

        if (resultado == undefined) {
            mostrarMensagem("Produto não encontrado.", false);
        } else {
            mostrarMensagem(
                `${resultado.descricao} vendeu ${resultado.totalVendido} unidades no ano.`,
                true
            );
        }
    }
}

function consultarMaisVendidoMes() {
    if (campoVazio(inDescricaoProduto)) {
        mostrarMensagem("Informe a descrição do produto.", false);
        inDescricaoProduto.focus();
    } else {
        const resultado = armazemController.consultarMaisVendidoMes(
            inDescricaoProduto.value
        );

        if (resultado == undefined) {
            mostrarMensagem("Produto não encontrado.", false);
        } else {
            mostrarMensagem(
                `${resultado.descricao} teve mais vendas em ${resultado.nomeMes}: ` +
                `${resultado.quantidadeVendida} unidades.`,
                true
            );
        }
    }
}

function consultarFaturamentoMes() {
    const resultado = armazemController.consultarFaturamentoMes(inMesProduto.value);

    if (resultado == undefined) {
        mostrarMensagem("Informe um mês válido, de 1 a 12.", false);
        inMesProduto.focus();
    } else {
        mostrarMensagem(
            `Faturamento do mês ${resultado.mes}: ${formatarMoeda(resultado.faturamento)}.`,
            true
        );
    }
}

function exibirTabelaVendasAnual() {
    const produtos = armazemController.listarTabelaVendasAnual();

    if (produtos.length == 0) {
        mostrarMensagem("Não há produtos cadastrados.", false);
    } else {
        const cabecalhos = [
            "Produto", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez", "Total"
        ];
        const linhas = produtos.map((produto) => [
            produto.descricao,
            ...produto.vendasMensais,
            produto.totalVendido
        ]);

        sectionResultado.appendChild(gerarTabela(cabecalhos, linhas));
    }
}

function exibirProdutosFornecedor() {
    if (campoVazio(inCnpjFornecedorProduto)) {
        mostrarMensagem("Informe o CNPJ do fornecedor.", false);
        inCnpjFornecedorProduto.focus();
    } else {
        const resultado = armazemController.listarProdutosFornecedor(
            inCnpjFornecedorProduto.value
        );

        if (resultado == undefined) {
            mostrarMensagem("Fornecedor não encontrado.", false);
        } else if (resultado.produtos.length == 0) {
            mostrarMensagem("O fornecedor não possui produtos vinculados.", false);
        } else {
            mostrarMensagem(
                `Produtos fornecidos por ${resultado.fornecedor.razaoSocial}.`,
                true
            );
            exibirProdutos(resultado.produtos);
        }
    }
}

function exibirFornecedores(fornecedores) {
    if (fornecedores.length == 0) {
        mostrarMensagem("Nenhum fornecedor encontrado.", false);
    } else {
        const cabecalhos = [
            "Razão social", "CNPJ", "Telefone", "Endereço", "Crédito"
        ];
        const linhas = fornecedores.map((fornecedor) => [
            fornecedor.razaoSocial,
            fornecedor.cnpj,
            fornecedor.telefone,
            fornecedor.endereco,
            formatarMoeda(fornecedor.creditoDisponibilizado)
        ]);

        sectionResultado.appendChild(gerarTabela(cabecalhos, linhas));
    }
}

function exibirProdutos(produtos) {
    if (produtos.length == 0) {
        mostrarMensagem("Nenhum produto encontrado.", false);
    } else {
        const cabecalhos = [
            "Produto", "Preço de compra", "Preço de venda", "Estoque",
            "CNPJ do fornecedor", "Fornecedor"
        ];
        const linhas = produtos.map((produto) => [
            produto.descricao,
            formatarMoeda(produto.precoCompra),
            formatarMoeda(produto.precoVenda),
            produto.quantidadeEstoque,
            textoOuTraco(produto.cnpjFornecedor),
            textoOuTraco(produto.razaoSocialFornecedor)
        ]);

        sectionResultado.appendChild(gerarTabela(cabecalhos, linhas));
    }
}

function gerarTabela(cabecalhos, linhas) {
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const linhaCabecalho = document.createElement("tr");
    const tbody = document.createElement("tbody");

    for (const cabecalho of cabecalhos) {
        const th = document.createElement("th");
        th.textContent = cabecalho;
        linhaCabecalho.appendChild(th);
    }

    thead.appendChild(linhaCabecalho);
    tabela.appendChild(thead);

    for (const dadosLinha of linhas) {
        const tr = document.createElement("tr");

        for (const dado of dadosLinha) {
            const td = document.createElement("td");
            td.textContent = textoOuTraco(dado);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    tabela.appendChild(tbody);
    return tabela;
}

function mostrarCodigo(codigo, mensagemSucesso) {
    const mensagens = {
        "FORNECEDOR_JA_CADASTRADO": "Já existe fornecedor com esse CNPJ.",
        "FORNECEDOR_NAO_ENCONTRADO": "Fornecedor não encontrado.",
        "FORNECEDOR_VINCULADO_PRODUTO": "O fornecedor possui produtos vinculados e não pode ser excluído.",
        "FORNECEDOR_NAO_VINCULADO": "O produto não possui fornecedor vinculado.",
        "PRODUTO_JA_CADASTRADO": "Já existe produto com essa descrição.",
        "PRODUTO_NAO_ENCONTRADO": "Produto não encontrado.",
        "QUANTIDADE_INVALIDA": "Informe uma quantidade válida.",
        "MES_INVALIDO": "Informe um mês válido, de 1 a 12.",
        "PRECO_COMPRA_INVALIDO": "O preço de compra é inválido.",
        "PRECO_VENDA_INVALIDO": "O preço de venda é inválido.",
        "CREDITO_INSUFICIENTE": "O fornecedor não possui crédito suficiente.",
        "ESTOQUE_INSUFICIENTE": "Não existe estoque suficiente para realizar a venda.",
        "LOCAL_STORAGE_INDISPONIVEL": "Não foi possível acessar o armazenamento local."
    };

    if (codigo == "SUCESSO") {
        mostrarMensagem(mensagemSucesso, true);
    } else {
        let mensagem = mensagens[codigo];

        if (mensagem == undefined) {
            mensagem = `Não foi possível realizar a operação: ${codigo}.`;
        }

        mostrarMensagem(mensagem, false);
    }
}

function salvarDados() {
    try {
        const codigo = armazemController.salvarDados();
        mostrarCodigo(codigo, "Dados salvos com sucesso.");
    } catch (erro) {
        mostrarMensagem(erro.message, false);
    }
}

function habilitarCampos(campos) {
    for (const campo of campos) {
        campo.disabled = false;
    }
}

function desabilitarCampos(campos) {
    for (const campo of campos) {
        campo.disabled = true;
        campo.value = "";
    }
}

function campoVazio(campo) {
    return campo.value.trim() == "";
}

function limparSaida() {
    outResultado.textContent = "";
    sectionResultado.replaceChildren();
}

function mostrarMensagem(mensagem, sucesso) {
    outResultado.textContent = mensagem;

    if (sucesso) {
        outResultado.className = "mensagem-sucesso";
    } else {
        outResultado.className = "mensagem-erro";
    }
}

function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function textoOuTraco(valor) {
    let texto = valor;

    if (valor == undefined) {
        texto = "-";
    }

    if (valor === "") {
        texto = "-";
    }

    return texto;
}
