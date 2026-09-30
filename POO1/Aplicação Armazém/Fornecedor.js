export class Fornecedor {
    #razaoSocial;
    #cnpj;
    #telefone;
    #endereco;
    #creditoDisponibilizado;

    constructor(razaoSocial, cnpj, telefone, endereco, creditoDisponibilizado = 0) {
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
        if (novaRazaoSocial != undefined) {
            if (novaRazaoSocial.trim() != "") {
                this.#razaoSocial = novaRazaoSocial.trim().toUpperCase();
            }
        }
    }
    get cnpj() {
        return this.#cnpj;
    }
    set cnpj(novoCnpj) {
        if (novoCnpj != undefined) {
            if (novoCnpj.trim() != "") {
                this.#cnpj = novoCnpj.trim();
            }
        }
    }
    get telefone() {
        return this.#telefone;
    }
    set telefone(novoTelefone) {
        if (novoTelefone != undefined) {
            if (novoTelefone.trim() != "") {
                this.#telefone = novoTelefone.trim();
            }
        }
    }
    get endereco() {
        return this.#endereco;
    }
    set endereco(novoEndereco) {
        if (novoEndereco != undefined) {
            if (novoEndereco.trim() != "") {
                this.#endereco = novoEndereco.trim().toUpperCase();
            }
        }
    }
    get creditoDisponibilizado() {
        return this.#creditoDisponibilizado;
    }
    set creditoDisponibilizado(novoCredito) {
        const creditoNumerico = Number(novoCredito);

        if (Number.isNaN(creditoNumerico) == false) {
            if (creditoNumerico >= 0) {
                this.#creditoDisponibilizado = creditoNumerico;
            }
        }
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