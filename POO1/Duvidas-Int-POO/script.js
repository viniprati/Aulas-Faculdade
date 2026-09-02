class Contato {
    constructor(nome, telefone) {
        this.nome = nome;
        this.telefone = telefone;
    }
}

class Agenda {
    contatos = [];

    cadastrar(nome, telefone) {
        const existe = this.contatos.some(
            contato => contato.telefone === telefone
        );

        if (existe) {
            return false;
        }

        this.contatos.push(
            new Contato(nome, telefone)
        );

        return true;
    }

    pesquisar(nome) {
        return this.contatos.filter(
            contato =>
                contato.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }
}

const agenda = new Agenda();

const form = document.querySelector("#form-contato");
const lista = document.querySelector("#lista-contatos");
const mensagem = document.querySelector("#mensagem");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const telefone = document.querySelector("#telefone").value;

    const cadastrou = agenda.cadastrar(nome, telefone);

    if (!cadastrou) {
        mensagem.textContent = "Telefone já cadastrado.";
        return;
    }

    mensagem.textContent = "Contato cadastrado.";

    lista.innerHTML += `
        <li>${nome} - ${telefone}</li>
    `;

    form.reset();
});