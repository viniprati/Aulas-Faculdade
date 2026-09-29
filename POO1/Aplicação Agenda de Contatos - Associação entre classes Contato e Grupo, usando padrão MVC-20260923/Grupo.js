import { Contato } from "./Contato.js";

export class Grupo {
    #descricao;
    #lstContatos;

    constructor(descricao, contato) {
        this.#descricao = descricao.toUpperCase();
        this.#lstContatos = [];
        if (contato != undefined && contato instanceof Contato) {
            this.#lstContatos.push(contato);
        }
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        if (novaDescricao != undefined && novaDescricao != "") {
            this.#descricao = novaDescricao.toUpperCase();
        }
    }

    get quantidadeContatos() {
        return this.#lstContatos.length;
    }

    get lstContatos() {
        //retorna uma cópia da lista de contatos do grupo
        return this.#lstContatos.slice();
    }

    procurarContato(nomeContato) {
        /* O Parâmetro é uma string com o nome do contato
        Retorna o objeto Contato ou undefined se não encontrado
        */
        if (nomeContato != undefined && typeof nomeContato == "string") {
            return this.#lstContatos.find(contato => contato.nome == nomeContato.toUpperCase());
        }
    }

    #procurarIndiceContato(contatoPesquisado) {
        /* O Parâmetro pode ser um objeto Contato ou uma string com o nome do contato
        Retorna o índice do contato na lista de contatos do grupo ou -1 se não encontrado
        */
        if (contatoPesquisado != undefined && contatoPesquisado instanceof Contato) {
            //contato é uma referência para um objeto Contato
            return this.#lstContatos.indexOf(contatoPesquisado);
        } else if (typeof contatoPesquisado == "string") {
            //contato é a string do nome de um contato
            return this.#lstContatos.findIndex(contato => contato.nome == contatoPesquisado.toUpperCase());
        }
    }

    incluirContato(novoContato) {
        if (novoContato != undefined && novoContato instanceof Contato) {
            if (this.#procurarIndiceContato(novoContato) == -1) { //verifica s novoContato já está nesse grupo
                this.#lstContatos.push(novoContato);
                return true;
            }
        }
        return false;
    }

    excluirContato(contato) {
        if (contato != undefined && contato instanceof Contato) {
            let indContato = this.#procurarIndiceContato(contato);
            if (indContato != -1) {
                this.#lstContatos.splice(indContato, 1);
                return true;
            }
        }
        return false;
    }

    toString() {
        let strGrupo = `Grupo: ${this.#descricao}\n` +
            `Quantidade de Contatos: ${this.quantidadeContatos}\n` +
            `Lista de Contatos:\n`;
        this.#lstContatos.forEach(contato => strGrupo += contato.toString() + "\n");
        return strGrupo;
    }

    stringify() {
        let strGrupo = `\n{` +
            `\n\t"descricao": "${this.#descricao}",` +
            `\n\t"lstContatos": [`;
            this.#lstContatos.forEach((contato) =>
                strGrupo += contato.stringify() + ","
            );
        strGrupo = strGrupo.slice(0, -1); //remove a última vírgula
        strGrupo += "]\n}\n";
        return strGrupo;
    }
}