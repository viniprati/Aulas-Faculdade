import { Fornecedor } from "./Fornecedor.js";
import { Produto } from "./Produto.js";

export class ArmazemController {
    #vetProdutos;
    #vetFornecedores;

    constructor() {
        this.#vetProdutos = [];
        this.#vetFornecedores = [];
        this.carregarDados();
    }

    cadastrarFornecedor(razaoSocial, cnpj, telefone, endereco, creditoDisponibilizado = 0) {
        let resultado = "FORNECEDOR_JA_CADASTRADO";

        if (this.#buscarFornecedor(cnpj) == undefined) {
            const fornecedor = new Fornecedor(
                razaoSocial,
                cnpj,
                telefone,
                endereco,
                creditoDisponibilizado
            );

            this.#vetFornecedores.push(fornecedor);
            resultado = "SUCESSO";
        }

        return resultado;
    }

    excluirFornecedor(cnpj) {
        const indiceFornecedor = this.#buscarIndiceFornecedor(cnpj);
        let resultado = "FORNECEDOR_NAO_ENCONTRADO";

        if (indiceFornecedor != -1) {
            const fornecedor = this.#vetFornecedores[indiceFornecedor];
            const fornecedorVinculado = this.#vetProdutos.some(
                (produto) => produto.fornecedor == fornecedor
            );

            if (fornecedorVinculado) {
                resultado = "FORNECEDOR_VINCULADO_PRODUTO";
            } else {
                this.#vetFornecedores.splice(indiceFornecedor, 1);
                resultado = "SUCESSO";
            }
        }

        return resultado;
    }

    alterarFornecedor(cnpj, razaoSocial, telefone, endereco, creditoDisponibilizado) {
        const fornecedor = this.#buscarFornecedor(cnpj);
        let resultado = "FORNECEDOR_NAO_ENCONTRADO";

        if (fornecedor != undefined) {
            if (this.#campoInformado(razaoSocial)) {
                fornecedor.razaoSocial = razaoSocial;
            }

            if (this.#campoInformado(telefone)) {
                fornecedor.telefone = telefone;
            }

            if (this.#campoInformado(endereco)) {
                fornecedor.endereco = endereco;
            }

            if (this.#campoInformado(creditoDisponibilizado)) {
                fornecedor.creditoDisponibilizado = creditoDisponibilizado;
            }

            resultado = "SUCESSO";
        }

        return resultado;
    }

    consultarFornecedor(cnpj) {
        const fornecedor = this.#buscarFornecedor(cnpj);
        let fornecedorDTO;

        if (fornecedor != undefined) {
            fornecedorDTO = this.#criarFornecedorDTO(fornecedor);
        }

        return fornecedorDTO;
    }

    listarFornecedores() {
        return this.#vetFornecedores.map(
            (fornecedor) => this.#criarFornecedorDTO(fornecedor)
        );
    }

    filtrarFornecedoresPorCredito(valorCredito) {
        const credito = Number(valorCredito);
        let fornecedores = [];

        if (Number.isNaN(credito) == false) {
            fornecedores = this.#vetFornecedores
                .filter((fornecedor) => fornecedor.creditoDisponibilizado > credito)
                .map((fornecedor) => this.#criarFornecedorDTO(fornecedor));
        }

        return fornecedores;
    }

    cadastrarProduto(
        descricao,
        precoCompra = 0,
        precoVenda = 0,
        quantidadeEstoque = 0,
        cnpjFornecedor
    ) {
        let resultado = "PRODUTO_JA_CADASTRADO";

        if (this.#buscarProduto(descricao) == undefined) {
            let fornecedor;
            let fornecedorValido = true;

            if (this.#campoInformado(cnpjFornecedor)) {
                fornecedor = this.#buscarFornecedor(cnpjFornecedor);

                if (fornecedor == undefined) {
                    fornecedorValido = false;
                    resultado = "FORNECEDOR_NAO_ENCONTRADO";
                }
            }

            if (fornecedorValido) {
                const produto = new Produto(
                    descricao,
                    precoCompra,
                    precoVenda,
                    quantidadeEstoque
                );

                if (fornecedor != undefined) {
                    produto.fornecedor = fornecedor;
                }

                this.#vetProdutos.push(produto);
                resultado = "SUCESSO";
            }
        }

        return resultado;
    }

    excluirProduto(descricao) {
        const indiceProduto = this.#buscarIndiceProduto(descricao);
        let resultado = "PRODUTO_NAO_ENCONTRADO";

        if (indiceProduto != -1) {
            this.#vetProdutos.splice(indiceProduto, 1);
            resultado = "SUCESSO";
        }

        return resultado;
    }

    alterarProduto(
        descricao,
        precoCompra,
        precoVenda,
        quantidadeEstoque,
        cnpjFornecedor
    ) {
        const produto = this.#buscarProduto(descricao);
        let resultado = "PRODUTO_NAO_ENCONTRADO";

        if (produto != undefined) {
            let fornecedor;
            let fornecedorValido = true;

            if (this.#campoInformado(cnpjFornecedor)) {
                fornecedor = this.#buscarFornecedor(cnpjFornecedor);

                if (fornecedor == undefined) {
                    fornecedorValido = false;
                    resultado = "FORNECEDOR_NAO_ENCONTRADO";
                }
            }

            if (fornecedorValido) {
                if (this.#campoInformado(precoCompra)) {
                    produto.precoCompra = precoCompra;
                }

                if (this.#campoInformado(precoVenda)) {
                    produto.precoVenda = precoVenda;
                }

                if (this.#campoInformado(quantidadeEstoque)) {
                    produto.quantidadeEstoque = quantidadeEstoque;
                }

                if (fornecedor != undefined) {
                    produto.fornecedor = fornecedor;
                }

                resultado = "SUCESSO";
            }
        }

        return resultado;
    }

    consultarProduto(descricao) {
        const produto = this.#buscarProduto(descricao);
        let produtoDTO;

        if (produto != undefined) {
            produtoDTO = this.#criarProdutoDTO(produto);
        }

        return produtoDTO;
    }

    alterarVendas(descricao, mes, quantidadeVendida) {
        const produto = this.#buscarProduto(descricao);
        let resultado = "PRODUTO_NAO_ENCONTRADO";

        if (produto != undefined) {
            if (this.#mesValido(mes) == false) {
                resultado = "MES_INVALIDO";
            } else if (this.#quantidadeValida(quantidadeVendida, true) == false) {
                resultado = "QUANTIDADE_INVALIDA";
            } else {
                produto.setQtdVendasMes(Number(mes), Number(quantidadeVendida));
                resultado = "SUCESSO";
            }
        }

        return resultado;
    }

    comprarProduto(
        descricao,
        quantidade,
        precoCompra,
        precoVenda,
        cnpjFornecedor
    ) {
        const produto = this.#buscarProduto(descricao);
        let resultado = "PRODUTO_NAO_ENCONTRADO";

        if (produto != undefined) {
            if (this.#quantidadeValida(quantidade, false) == false) {
                resultado = "QUANTIDADE_INVALIDA";
            } else {
                let fornecedor = produto.fornecedor;
                let dadosValidos = true;
                let novoPrecoCompra = produto.precoCompra;

                if (this.#campoInformado(cnpjFornecedor)) {
                    fornecedor = this.#buscarFornecedor(cnpjFornecedor);

                    if (fornecedor == undefined) {
                        resultado = "FORNECEDOR_NAO_ENCONTRADO";
                        dadosValidos = false;
                    }
                }

                if (dadosValidos) {
                    if (fornecedor == undefined) {
                        resultado = "FORNECEDOR_NAO_VINCULADO";
                        dadosValidos = false;
                    }
                }

                if (dadosValidos) {
                    if (this.#campoInformado(precoCompra)) {
                        novoPrecoCompra = Number(precoCompra);

                        if (this.#precoValido(novoPrecoCompra) == false) {
                            resultado = "PRECO_COMPRA_INVALIDO";
                            dadosValidos = false;
                        }
                    }
                }

                if (dadosValidos) {
                    if (this.#campoInformado(precoVenda)) {
                        if (this.#precoValido(precoVenda) == false) {
                            resultado = "PRECO_VENDA_INVALIDO";
                            dadosValidos = false;
                        }
                    }
                }

                if (dadosValidos) {
                    const custoCompra = Number(quantidade) * novoPrecoCompra;

                    if (custoCompra > fornecedor.creditoDisponibilizado) {
                        resultado = "CREDITO_INSUFICIENTE";
                    } else {
                        produto.fornecedor = fornecedor;
                        produto.precoCompra = novoPrecoCompra;

                        if (this.#campoInformado(precoVenda)) {
                            produto.precoVenda = precoVenda;
                        }

                        produto.comprar(Number(quantidade));
                        fornecedor.creditoDisponibilizado =
                            fornecedor.creditoDisponibilizado - custoCompra;
                        resultado = "SUCESSO";
                    }
                }
            }
        }

        return resultado;
    }

    venderProduto(descricao, quantidade, mes = new Date().getMonth() + 1) {
        const produto = this.#buscarProduto(descricao);
        let resultado = { codigo: "PRODUTO_NAO_ENCONTRADO" };

        if (produto != undefined) {
            if (this.#quantidadeValida(quantidade, false) == false) {
                resultado = { codigo: "QUANTIDADE_INVALIDA" };
            } else if (this.#mesValido(mes) == false) {
                resultado = { codigo: "MES_INVALIDO" };
            } else if (Number(quantidade) > produto.quantidadeEstoque) {
                resultado = { codigo: "ESTOQUE_INSUFICIENTE" };
            } else {
                const totalPagar = Number(quantidade) * produto.precoVenda;
                produto.vender(Number(quantidade), Number(mes));

                resultado = {
                    codigo: "SUCESSO",
                    descricao: produto.descricao,
                    quantidadeVendida: Number(quantidade),
                    totalPagar: totalPagar
                };
            }
        }

        return resultado;
    }

    consultarTotalVendasAno(descricao) {
        const produto = this.#buscarProduto(descricao);
        let vendaDTO;

        if (produto != undefined) {
            vendaDTO = {
                descricao: produto.descricao,
                totalVendido: produto.consultarQuantidadeVendidaAno()
            };
        }

        return vendaDTO;
    }

    consultarMaisVendidoMes(descricao) {
        const produto = this.#buscarProduto(descricao);
        let vendaDTO;

        if (produto != undefined) {
            const meses = [
                "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];
            let mesMaisVendido = 1;

            for (let mes = 2; mes <= 12; mes++) {
                if (produto.getQtdVendasMes(mes) > produto.getQtdVendasMes(mesMaisVendido)) {
                    mesMaisVendido = mes;
                }
            }

            vendaDTO = {
                descricao: produto.descricao,
                mes: mesMaisVendido,
                nomeMes: meses[mesMaisVendido - 1],
                quantidadeVendida: produto.getQtdVendasMes(mesMaisVendido)
            };
        }

        return vendaDTO;
    }

    consultarFaturamentoMes(mes) {
        let faturamentoDTO;

        if (this.#mesValido(mes)) {
            let faturamento = 0;

            for (const produto of this.#vetProdutos) {
                faturamento += produto.getQtdVendasMes(Number(mes)) * produto.precoVenda;
            }

            faturamentoDTO = {
                mes: Number(mes),
                faturamento: faturamento
            };
        }

        return faturamentoDTO;
    }

    listarProdutos() {
        return this.#vetProdutos.map(
            (produto) => this.#criarProdutoDTO(produto)
        );
    }

    listarTabelaVendasAnual() {
        return this.#vetProdutos.map((produto) => ({
            descricao: produto.descricao,
            vendasMensais: produto.vendasMensais,
            totalVendido: produto.consultarQuantidadeVendidaAno()
        }));
    }

    listarProdutosFornecedor(cnpj) {
        const fornecedor = this.#buscarFornecedor(cnpj);
        let resultadoDTO;

        if (fornecedor != undefined) {
            const produtos = this.#vetProdutos
                .filter((produto) => produto.fornecedor == fornecedor)
                .map((produto) => this.#criarProdutoDTO(produto));

            resultadoDTO = {
                fornecedor: this.#criarFornecedorDTO(fornecedor),
                produtos: produtos
            };
        }

        return resultadoDTO;
    }

    salvarDados() {
        let resultado = "LOCAL_STORAGE_INDISPONIVEL";

        if (typeof localStorage != "undefined") {
            const fornecedores = this.#vetFornecedores.map(
                (fornecedor) => JSON.parse(fornecedor.stringify())
            );
            const produtos = this.#vetProdutos.map(
                (produto) => JSON.parse(produto.stringify())
            );

            localStorage.setItem(
                "fornecedoresArmazem",
                JSON.stringify(fornecedores)
            );
            localStorage.setItem(
                "produtosArmazem",
                JSON.stringify(produtos)
            );
            resultado = "SUCESSO";
        }

        return resultado;
    }

    carregarDados() {
        let resultado = "LOCAL_STORAGE_INDISPONIVEL";

        if (typeof localStorage != "undefined") {
            const fornecedoresSalvos = localStorage.getItem("fornecedoresArmazem");
            const produtosSalvos = localStorage.getItem("produtosArmazem");

            this.#vetFornecedores = [];
            this.#vetProdutos = [];

            if (fornecedoresSalvos != null) {
                const fornecedores = JSON.parse(fornecedoresSalvos);

                for (const fornecedor of fornecedores) {
                    this.#vetFornecedores.push(new Fornecedor(
                        fornecedor.razaoSocial,
                        fornecedor.cnpj,
                        fornecedor.telefone,
                        fornecedor.endereco,
                        fornecedor.creditoDisponibilizado
                    ));
                }
            }

            if (produtosSalvos != null) {
                const produtos = JSON.parse(produtosSalvos);

                for (const produtoSalvo of produtos) {
                    let precoCompra = produtoSalvo.precoCompra;
                    let precoVenda = produtoSalvo.precoVenda;

                    if (precoCompra == undefined) {
                        precoCompra = produtoSalvo.preco;
                    }

                    if (precoVenda == undefined) {
                        precoVenda = produtoSalvo.preco;
                    }

                    const produto = new Produto(
                        produtoSalvo.descricao,
                        precoCompra,
                        precoVenda,
                        produtoSalvo.quantidadeEstoque,
                        produtoSalvo.vendasMensais
                    );

                    if (this.#campoInformado(produtoSalvo.cnpjFornecedor)) {
                        const fornecedor = this.#buscarFornecedor(
                            produtoSalvo.cnpjFornecedor
                        );

                        if (fornecedor != undefined) {
                            produto.fornecedor = fornecedor;
                        }
                    }

                    this.#vetProdutos.push(produto);
                }
            }

            resultado = "SUCESSO";
        }

        return resultado;
    }

    #buscarFornecedor(cnpj) {
        let fornecedor;

        if (this.#campoInformado(cnpj)) {
            fornecedor = this.#vetFornecedores.find(
                (item) => item.cnpj == String(cnpj).trim()
            );
        }

        return fornecedor;
    }

    #buscarIndiceFornecedor(cnpj) {
        let indice = -1;

        if (this.#campoInformado(cnpj)) {
            indice = this.#vetFornecedores.findIndex(
                (item) => item.cnpj == String(cnpj).trim()
            );
        }

        return indice;
    }

    #buscarProduto(descricao) {
        let produto;

        if (this.#campoInformado(descricao)) {
            produto = this.#vetProdutos.find(
                (item) => item.descricao == String(descricao).trim().toUpperCase()
            );
        }

        return produto;
    }

    #buscarIndiceProduto(descricao) {
        let indice = -1;

        if (this.#campoInformado(descricao)) {
            indice = this.#vetProdutos.findIndex(
                (item) => item.descricao == String(descricao).trim().toUpperCase()
            );
        }

        return indice;
    }

    #criarFornecedorDTO(fornecedor) {
        return {
            razaoSocial: fornecedor.razaoSocial,
            cnpj: fornecedor.cnpj,
            telefone: fornecedor.telefone,
            endereco: fornecedor.endereco,
            creditoDisponibilizado: fornecedor.creditoDisponibilizado
        };
    }

    #criarProdutoDTO(produto) {
        let cnpjFornecedor;
        let razaoSocialFornecedor;

        if (produto.fornecedor != undefined) {
            cnpjFornecedor = produto.fornecedor.cnpj;
            razaoSocialFornecedor = produto.fornecedor.razaoSocial;
        }

        return {
            descricao: produto.descricao,
            precoCompra: produto.precoCompra,
            precoVenda: produto.precoVenda,
            quantidadeEstoque: produto.quantidadeEstoque,
            vendasMensais: produto.vendasMensais,
            cnpjFornecedor: cnpjFornecedor,
            razaoSocialFornecedor: razaoSocialFornecedor
        };
    }

    #campoInformado(valor) {
        let informado = valor != undefined;

        if (informado) {
            informado = String(valor).trim() != "";
        }

        return informado;
    }

    #quantidadeValida(quantidade, permiteZero) {
        const quantidadeNumerica = Number(quantidade);
        let valida = Number.isInteger(quantidadeNumerica);

        if (valida) {
            if (permiteZero) {
                valida = quantidadeNumerica >= 0;
            } else {
                valida = quantidadeNumerica > 0;
            }
        }

        return valida;
    }

    #precoValido(preco) {
        const precoNumerico = Number(preco);
        let valido = Number.isNaN(precoNumerico) == false;

        if (valido) {
            valido = precoNumerico >= 0;
        }

        return valido;
    }

    #mesValido(mes) {
        const mesNumerico = Number(mes);
        let valido = Number.isInteger(mesNumerico);

        if (valido) {
            valido = mesNumerico >= 1;
        }

        if (valido) {
            valido = mesNumerico <= 12;
        }

        return valido;
    }
}
