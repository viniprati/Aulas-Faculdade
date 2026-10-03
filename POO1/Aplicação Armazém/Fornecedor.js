export class Fornecedor {
    #razaoSocial;
    #cnpj;
    #telefone;
    #endereco;
    #creditoDisponibilizado;

    constructor(razaoSocial, cnpj, telefone = "", endereco = "", creditoDisponibilizado = 0) {
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.telefone = telefone;
        this.endereco = endereco;
        this.creditoDisponibilizado = creditoDisponibilizado;
    }

    get razaoSocial() {
        return this.#razaoSocial;
    }

    set razaoSocial(novaRazaoSocial) {
        if (typeof novaRazaoSocial != "string" || novaRazaoSocial.trim() == "") {
            throw new Error("A razão social do fornecedor deve ser preenchida.");
        }

        this.#razaoSocial = novaRazaoSocial.trim().toUpperCase();
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        if (typeof novoCnpj != "string" || novoCnpj.trim() == "") {
            throw new Error("O CNPJ do fornecedor deve ser preenchido.");
        }

        this.#cnpj = novoCnpj.trim();
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        if (typeof novoTelefone != "string") {
            throw new Error("O telefone do fornecedor deve ser um texto.");
        }

        this.#telefone = novoTelefone.trim();
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        if (typeof novoEndereco != "string") {
            throw new Error("O endereço do fornecedor deve ser um texto.");
        }

        this.#endereco = novoEndereco.trim().toUpperCase();
    }

    get creditoDisponibilizado() {
        return this.#creditoDisponibilizado;
    }

    set creditoDisponibilizado(novoCredito) {
        const creditoNumerico = Number(novoCredito);

        if (!Number.isFinite(creditoNumerico) || creditoNumerico < 0) {
            throw new Error("O crédito disponibilizado deve ser um número maior ou igual a zero.");
        }

        this.#creditoDisponibilizado = creditoNumerico;
    }

    toString() {
        return `Razão Social: ${this.#razaoSocial}\n` +
               `CNPJ: ${this.#cnpj}\n` +
               `Telefone: ${this.#telefone}\n` +
               `Endereço: ${this.#endereco}\n` +
               `Crédito Disponibilizado: R$ ${this.#creditoDisponibilizado.toFixed(2)}`;
    }

    stringify() {
        const fornecedorLiteral = {
            razaoSocial: this.#razaoSocial,
            cnpj: this.#cnpj,
            telefone: this.#telefone,
            endereco: this.#endereco,
            creditoDisponibilizado: this.#creditoDisponibilizado
        };

        return JSON.stringify(fornecedorLiteral);
    }
}