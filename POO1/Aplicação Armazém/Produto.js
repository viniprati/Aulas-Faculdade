export class Produto {
    #descricao;
    #preco;
    #quantidadeEstoque;
    #vendasMensais;

    constructor(descricao, preco, quantidadeEstoque, vendasMensais = []) {
        this.descricao = descricao;
        this.preco = preco;
        this.quantidadeEstoque = quantidadeEstoque;
        this.#vendasMensais = this.#criarVetorVendas(vendasMensais);
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(descricao) {
        if (typeof descricao !== "string" || descricao.trim() === "") {
            throw new Error("A descricao do produto deve ser preenchida.");
        }

        this.#descricao = descricao.trim().toUpperCase();
    }

    get preco() {
        return this.#preco;
    }

    set preco(preco) {
        const precoProduto = Number(preco);

        if (Number.isNaN(precoProduto) || precoProduto < 0) {
            throw new Error("O preco do produto deve ser maior ou igual a zero.");
        }

        this.#preco = precoProduto;
    }

    get quantidadeEstoque() {
        return this.#quantidadeEstoque;
    }

    set quantidadeEstoque(quantidadeEstoque) {
        this.#validarQuantidade(quantidadeEstoque, "A quantidade em estoque");
        this.#quantidadeEstoque = Number(quantidadeEstoque);
    }

    get vendasMensais() {
        return [...this.#vendasMensais];
    }

    set vendasMensais(vendasMensais) {
        this.#vendasMensais = this.#criarVetorVendas(vendasMensais);
    }

    getQtdVendasMes(mes) {
        this.#validarMes(mes);
        return this.#vendasMensais[mes - 1];
    }

    setQtdVendasMes(mes, quantidadeVendida) {
        this.#validarMes(mes);
        this.#validarQuantidade(quantidadeVendida, "A quantidade vendida");
        this.#vendasMensais[mes - 1] = Number(quantidadeVendida);
    }

    comprar(quantidade) {
        this.#validarQuantidade(quantidade, "A quantidade comprada");
        this.#quantidadeEstoque += Number(quantidade);
    }

    vender(quantidade, mes) {
        this.#validarQuantidade(quantidade, "A quantidade vendida");

        if (Number(quantidade) > this.#quantidadeEstoque) {
            throw new Error("Nao ha quantidade suficiente em estoque para realizar a venda.");
        }

        this.#validarMes(mes);
        this.#quantidadeEstoque -= Number(quantidade);
        this.#vendasMensais[mes - 1] += Number(quantidade);
    }

    consultarQuantidadeVendidaAno() {
        return this.#vendasMensais.reduce((total, quantidade) => total + quantidade, 0);
    }

    toString() {
        return `Produto: ${this.#descricao} | Preco: R$ ${this.#preco.toFixed(2)} | Estoque: ${this.#quantidadeEstoque} | Vendas no ano: ${this.consultarQuantidadeVendidaAno()}`;
    }

    #criarVetorVendas(vendasMensais) {
        const vendas = Array(12).fill(0);

        for (let i = 0; i < vendasMensais.length && i < vendas.length; i++) {
            this.#validarQuantidade(vendasMensais[i], "A quantidade vendida");
            vendas[i] = Number(vendasMensais[i]);
        }

        return vendas;
    }

    #validarMes(mes) {
        if (!Number.isInteger(Number(mes)) || Number(mes) < 1 || Number(mes) > 12) {
            throw new Error("O mes deve estar entre 1 e 12.");
        }
    }

    #validarQuantidade(quantidade, nomeCampo) {
        if (!Number.isInteger(Number(quantidade)) || Number(quantidade) < 0) {
            throw new Error(`${nomeCampo} deve ser um numero inteiro maior ou igual a zero.`);
        }
    }
}
