import { Fornecedor } from "./Fornecedor.js";

export class Produto {
    #descricao;
    #precoCompra;
    #precoVenda;
    #quantidadeEstoque;
    #vendasMensais;
    #fornecedor;

    constructor(descricao, precoCompra, precoVenda, quantidadeEstoque, vendasMensais = []) {
        this.descricao = descricao;
        this.precoCompra = precoCompra;
        this.precoVenda = precoVenda;
        this.quantidadeEstoque = quantidadeEstoque;
        this.#vendasMensais = this.#criarVetorVendas(vendasMensais);
        this.#fornecedor = undefined;
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

    get precoCompra() {
        return this.#precoCompra;
    }

    set precoCompra(novoPrecoCompra) {
        this.#validarPreco(novoPrecoCompra, "O preco de compra");
        this.#precoCompra = Number(novoPrecoCompra);
    }

    get precoVenda() {
        return this.#precoVenda;
    }

    set precoVenda(novoPrecoVenda) {
        this.#validarPreco(novoPrecoVenda, "O preco de venda");
        this.#precoVenda = Number(novoPrecoVenda);
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

    get fornecedor() {
        return this.#fornecedor;
    }

    set fornecedor(novoFornecedor) {
        if (novoFornecedor == undefined) {
            this.#fornecedor = undefined;
        } else {
            if (novoFornecedor instanceof Fornecedor) {
                this.#fornecedor = novoFornecedor;
            } else {
                throw new Error("O fornecedor deve ser um objeto da classe Fornecedor.");
            }
        }
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
        let dadosFornecedor = "Fornecedor: NAO VINCULADO";

        if (this.#fornecedor != undefined) {
            dadosFornecedor = `Fornecedor: ${this.#fornecedor.razaoSocial} | CNPJ: ${this.#fornecedor.cnpj}`;
        }

        return `Produto: ${this.#descricao} | ` +
               `Preco de compra: R$ ${this.#precoCompra.toFixed(2)} | ` +
               `Preco de venda: R$ ${this.#precoVenda.toFixed(2)} | ` +
               `Estoque: ${this.#quantidadeEstoque} | ` +
               `Vendas no ano: ${this.consultarQuantidadeVendidaAno()} | ` +
               dadosFornecedor;
    }

    stringify() {
        let cnpjFornecedor;

        if (this.#fornecedor != undefined) {
            cnpjFornecedor = this.#fornecedor.cnpj;
        }

        const produtoLiteral = {
            descricao: this.#descricao,
            precoCompra: this.#precoCompra,
            precoVenda: this.#precoVenda,
            quantidadeEstoque: this.#quantidadeEstoque,
            vendasMensais: [...this.#vendasMensais],
            cnpjFornecedor: cnpjFornecedor
        };

        return JSON.stringify(produtoLiteral);
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

    #validarPreco(preco, nomeCampo) {
        const precoNumerico = Number(preco);

        if (Number.isNaN(precoNumerico) || precoNumerico < 0) {
            throw new Error(`${nomeCampo} deve ser maior ou igual a zero.`);
        }
    }
}
