import { Produto } from "./Produto.js";

export class ProdutoController {
    #produtos;
    #meses;

    constructor() {
        this.#meses = [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
        ];
        this.#produtos = this.#carregarProdutos();
    }

    cadastrarProduto(descricao, preco = 0, quantidadeEstoque = 0) {
        let produtoCadastrado = false;

        if (this.#buscarProduto(descricao) !== undefined) {
            produtoCadastrado = false;
        } else {
            this.#produtos.push(new Produto(descricao, preco, quantidadeEstoque));
            produtoCadastrado = true;
        }

        return produtoCadastrado;
    }

    excluirProduto(descricao) {
        const indiceProduto = this.#buscarIndiceProduto(descricao);
        let produtoExcluido = false;

        if (indiceProduto === -1 || this.#produtos[indiceProduto].quantidadeEstoque > 0) {
            produtoExcluido = false;
        } else {
            this.#produtos.splice(indiceProduto, 1);
            produtoExcluido = true;
        }

        return produtoExcluido;
    }

    alterarProduto(descricao, mes, quantidadeVendida) {
        const produto = this.#buscarProduto(descricao);
        let produtoAlterado;

        if (produto === undefined) {
            produtoAlterado = undefined;
        } else {
            produto.setQtdVendasMes(mes, quantidadeVendida);
            produtoAlterado = produto;
        }

        return produtoAlterado;
    }

    consultarQtd(descricao, mesInicial = 1, mesFinal = 12) {
        const produto = this.#buscarProduto(descricao);
        let total = -1;

        if (produto === undefined) {
            total = -1;
        } else {
            total = 0;

            for (let mes = mesInicial; mes <= mesFinal; mes++) {
                total += produto.getQtdVendasMes(mes);
            }
        }

        return total;
    }

    produtoMaisVendidoMes(mes) {
        let produtoMaisVendido;

        if (this.#produtos.length === 0) {
            produtoMaisVendido = undefined;
        } else {
            produtoMaisVendido = this.#produtos[0];

            for (const produto of this.#produtos) {
                if (produto.getQtdVendasMes(mes) > produtoMaisVendido.getQtdVendasMes(mes)) {
                    produtoMaisVendido = produto;
                }
            }
        }

        return produtoMaisVendido;
    }

    criarTableHtml() {
        const tabela = document.createElement("table");
        const cabecalho = document.createElement("tr");
        const colunas = ["Produto", ...this.#meses, "Total", "Estoque"];

        for (const coluna of colunas) {
            const th = document.createElement("th");
            th.textContent = coluna;
            cabecalho.appendChild(th);
        }

        tabela.appendChild(cabecalho);

        for (const produto of this.#produtos) {
            tabela.appendChild(this.#criarLinhaProduto(produto));
        }

        return tabela;
    }

    filtrarProdsQuantEstoque(quantidadeEstoque) {
        const produtosFiltrados = this.#produtos.filter((produto) => produto.quantidadeEstoque <= quantidadeEstoque);
        let tabela;

        if (produtosFiltrados.length === 0) {
            tabela = undefined;
        } else {
            tabela = document.createElement("table");
            const cabecalho = document.createElement("tr");

            for (const coluna of ["Produto", "Preco", "Estoque"]) {
                const th = document.createElement("th");
                th.textContent = coluna;
                cabecalho.appendChild(th);
            }

            tabela.appendChild(cabecalho);

            for (const produto of produtosFiltrados) {
                const linha = document.createElement("tr");
                const dados = [
                    produto.descricao,
                    `R$ ${produto.preco.toFixed(2)}`,
                    produto.quantidadeEstoque
                ];

                for (const dado of dados) {
                    const td = document.createElement("td");
                    td.textContent = dado;
                    linha.appendChild(td);
                }

                tabela.appendChild(linha);
            }
        }

        return tabela;
    }

    salvarProdutos() {
        const produtos = this.#produtos.map((produto) => ({
            descricao: produto.descricao,
            preco: produto.preco,
            quantidadeEstoque: produto.quantidadeEstoque,
            vendasMensais: produto.vendasMensais
        }));

        localStorage.setItem("produtosArmazem", JSON.stringify(produtos));
        return true;
    }

    #criarLinhaProduto(produto) {
        const linha = document.createElement("tr");
        const dados = [
            produto.descricao,
            ...produto.vendasMensais,
            produto.consultarQuantidadeVendidaAno(),
            produto.quantidadeEstoque
        ];

        for (const dado of dados) {
            const td = document.createElement("td");
            td.textContent = dado;
            linha.appendChild(td);
        }

        return linha;
    }

    #carregarProdutos() {
        const produtosSalvos = localStorage.getItem("produtosArmazem");
        let produtosCarregados;

        if (produtosSalvos === null) {
            produtosCarregados = [
                new Produto("ARROZ", 27.9, 30, [12, 8, 15, 10, 7, 18, 9, 11, 14, 13, 16, 20]),
                new Produto("FEIJAO", 8.5, 20, [9, 13, 11, 14, 8, 10, 15, 12, 9, 16, 10, 13]),
                new Produto("MACARRAO", 5.75, 15, [20, 18, 22, 19, 17, 21, 16, 23, 18, 20, 19, 24])
            ];
        } else {
            const produtos = JSON.parse(produtosSalvos);

            produtosCarregados = produtos.map((produto) => new Produto(
                produto.descricao,
                produto.preco,
                produto.quantidadeEstoque,
                produto.vendasMensais
            ));
        }

        return produtosCarregados;
    }

    #buscarProduto(descricao) {
        return this.#produtos.find((produto) => produto.descricao === descricao.trim().toUpperCase());
    }

    #buscarIndiceProduto(descricao) {
        return this.#produtos.findIndex((produto) => produto.descricao === descricao.trim().toUpperCase());
    }
}
