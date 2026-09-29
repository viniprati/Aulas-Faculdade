export class Contato {
    #nome;
    #telefone;
    #endereco;
    #cpf;
    #dataNasc;

    constructor(nome, telefone, endereco, cpf, dataNasc="01/01/2000") {
        this.#nome = nome.toUpperCase();
        this.#endereco = endereco.toUpperCase();
        this.#telefone = telefone; //formato (XX)XXXXX-XXXX
        this.#cpf = cpf; //formato XXX.XXX.XXX-XX
        this.#dataNasc = dataNasc; //formato DD/MM/AAAA
    }

    get nome() {
        return this.#nome;
    }

    set nome(_nome) {
        if(_nome != "")
            this.#nome = _nome.toUpperCase();
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(_telefone) {
        if(_telefone.length == 14) //formato (XX)XXXXX-XXXX
            this.#telefone = _telefone;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(_endereco) {
        if(_endereco != "")
            this.#endereco = _endereco.toUpperCase();
    }

    get cpf() {
        return this.#cpf;
    }

    get dataNasc() {
        return this.#dataNasc;
    }

    set dataNasc(_dataNasc) {
        if(_dataNasc.length == 10) //formato DD/MM/AAAA
            this.#dataNasc = _dataNasc;
    }

    toString() {
        return `Nome: ${this.#nome}\n`+
               `Endereço: ${this.#endereco}\n`+
               `Telefone: ${this.#telefone}\n` + 
               `CPF: ${this.#cpf}\n` + 
               `Data de Nascimento: ${this.#dataNasc}`;
    }

    stringify(){
        return '\n{' + 
                '\n\t"nome" : "' + this.#nome + '" ,' + 
                '\n\t"endereco" : "' + this.#endereco + '" ,' +
                '\n\t"telefone" : "' + this.#telefone + '" ,' +
                '\n\t"cpf" : "' + this.#cpf + '" ,' +
                '\n\t"dataNasc" : "' + this.#dataNasc + '"' +
                '\n}'; 
    }
}