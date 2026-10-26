import { Contato } from './Contato.js';
import { Grupo } from './Grupo.js';

export class AgendaController {
    #vetContatos;
    #vetGrupos;

    constructor() {
        this.#vetContatos = [];
        this.#vetGrupos = [];
    }



    cadastrarContato(nome, endereco, telefone, cpf, dtNascimento) {
        /* Cadastra um novo contato no vetor de contatos, retornando um boolean para indicar se o cadastro foi bem sucedido.
           Caso já exista outro contato no vetor com o mesmo nome ou telefone, retorna false,
           pois não devem ser permitidos dois contatos com o mesmo nome ou telefone.
        */
        let contato = this.pesquisarContatoNome(nome);

        if (contato == undefined) { //indica que não existe contato com mesmo nome em #vetContatos
            if (this.pesquisarContatoTelefone(telefone) == undefined) {
                //Se não existe contato com mesmo nome e telefone, então cadastra o novo contato
                this.#vetContatos.push(new Contato(nome, endereco, telefone, cpf, dtNascimento));
                return true;
            }
        }
        return false;
    }

    pesquisarContatoNome(nome) {
        //retorna o contato pesquisado ou undefined se não encontrado
        return this.#vetContatos.find(
            (contato) => contato.nome.toUpperCase() == nome.toUpperCase()
        );
    }

    pesquisarContatoTelefone(telefone) {
        //retorna o contato pesquisado ou undefined se não encontrado
        return this.#vetContatos.find(
            (contato) => contato.telefone == telefone
        );
    }

    excluirContato(nomeContato) {

        let indContato = this.#vetContatos.findIndex((contato) =>
            contato.nome == nomeContato.toUpperCase()
        );

        if (indContato == -1) {
            return false;
        } else {

            //remoção das referêcias para o contato em todos os grupos que ele possa estar
            this.#vetGrupos.forEach((grupo) => {
                grupo.excluirContato(this.#vetContatos[indContato]);
            });

            //remoção do contato do vetor de contatos
            this.#vetContatos.splice(indContato, 1);
            return true;
        }
    }

    alterarEndereco(nomeContato, endereco) {
        let objContato = this.#vetContatos.find((contato) =>
            contato.nome == nomeContato.toUpperCase()
        );

        if (objContato != undefined) {
            objContato.endereco = endereco;
            return true;
        }
        return false;
    }

    alterarTelefone(nomeContato, telefone) {
        let objContato = this.#vetContatos.find((contato) =>
            contato.nome == nomeContato.toUpperCase()
        );

        if (objContato != undefined) {
            objContato.telefone = telefone; //só aceita alterar se formato (XX)XXXXX-XXXX
            if (objContato.telefone == telefone) {
                return true;
            }
        }
        return false;
    }

    consultarContato(nomeContato) {
        /* Retorna um objeto literal com os dados de um contato, 
            ou undefined se não encontrar o contato.
        */

        let objContato = this.#vetContatos.find((contato) =>
            contato.nome == nomeContato.toUpperCase()
        );

        if (objContato != undefined) {
            return {               // objeto literal — não é um Contato
                nome: objContato.nome,
                telefone: objContato.telefone,
                endereco: objContato.endereco,
                cpf: objContato.cpf,
                dataNasc: objContato.dataNasc
            };
        }
        return undefined;
    }


    filtrarEndereco(enderecoFiltro) {
        /* Retorna um vetor de objetos literais com os dados dos contatos que possuem o endereço igual ao endereçoFiltro.
              Se não houver contatos com o endereço informado, retorna um vetor vazio.
        */
        var vetContatosFiltrados = this.#vetContatos.filter(contato => contato.endereco == enderecoFiltro.toUpperCase());
        var vetObjetosLiteraisContato = []; //vetor de objetos literais
        vetContatosFiltrados.forEach((contato) => {
            vetObjetosLiteraisContato.push(
                {
                    nome: contato.nome,
                    telefone: contato.telefone,
                    endereco: contato.endereco,
                    cpf: contato.cpf,
                    dataNasc: contato.dataNasc
                }
            );
        });
        return vetObjetosLiteraisContato;
    }


    listarContatos() {
        /* Retorna um vetor de objetos literais com os dados de todos os contatos.
              Se não houver contatos cadastrados, retorna um vetor vazio.
        */

        var vetObjetosLiteraisContato = []; //vetor de objetos literais
        this.#vetContatos.forEach((contato) => {
            vetObjetosLiteraisContato.push(
                {
                    nome: contato.nome,
                    telefone: contato.telefone,
                    endereco: contato.endereco,
                    cpf: contato.cpf,
                    dataNasc: contato.dataNasc
                }
            );
        });
        return vetObjetosLiteraisContato;
    }


    cadastrarGrupo(descricaoGrupo) {
        /* Insere um novo grupo no vetor de Grupos, retornando um boolean para indicar se o cadastro foi bem sucedido.
           Caso já exista outro grupo no vetor com a mesma descrição, retorna false,
           pois não devem ser permitidos dois grupos com a mesma descrição.
        */
        let objGrupo = this.#vetGrupos.find(grupo => grupo.descricao == descricaoGrupo.toUpperCase());

        if (objGrupo == undefined) { //não permite cadastrar outro grupo com a mesma descrição
            objGrupo = new Grupo(descricaoGrupo);
            this.#vetGrupos.push(objGrupo);
            return true;
        }
        return false;
    }

    excluirGrupo(descricaoGrupo) {
        /* Exclui um grupo do vetor de Grupos, retornando um boolean para indicar se a exclusão foi bem sucedido.
           Caso não exista um grupo com aquela descrição no vetor para ser excluído, retorna false.
        */
        let indGrupo = this.#vetGrupos.findIndex(grupo => grupo.descricao == descricaoGrupo.toUpperCase());

        if (indGrupo == -1) {
            return false;
        }
        this.#vetGrupos.splice(indGrupo, 1);
        return true;
    }

    incluirContatoGrupo(nomeContato, descricaoGrupo) {
        /* Inclui o contato no grupo.
           Retorna uma string informando os possíveis resultados da operação:
           - "Sucesso! Contato incluído no Grupo"
           - "Falha! Contato já se encontrava incluído no Grupo"
           - "Falha! Não existe Grupo com descrição informada"
           - "Falha! Não existe Contato com nome informado"
        */
        let objContato = this.#vetContatos.find(contato => contato.nome == nomeContato.toUpperCase());
        if (objContato != undefined) {

            let objGrupo = this.#vetGrupos.find(grupo => grupo.descricao == descricaoGrupo.toUpperCase());
            if (objGrupo != undefined) {
                if (objGrupo.incluirContato(objContato)) {
                    return "SUCESSO";
                } else {
                    return "CONTATO_JA_NO_GRUPO";
                }
            } else {
                return "GRUPO_NAO_ENCONTRADO";
            }
        } else {
            return "CONTATO_NAO_ENCONTRADO";
        }
    }

    excluirContatoGrupo(nomeContato, descricaoGrupo) {
        /* Desenvolver uma function que exclui um contato da lista de contatos do grupo informado,
           retornando uma string para indicar se a exclusão foi bem sucedido, ou se houve alguma das seguintes falhas: 
            ▪	“Falha! Não existe Contato com nome informado",
            ▪	"Falha! Não existe Grupo com descrição informada" ou 
            ▪	"Falha! Contato não estava incluído no Grupo".
        */

        let objContato = this.#vetContatos.find(contato => contato.nome == nomeContato.toUpperCase());
        if (objContato != undefined) {

            let objGrupo = this.#vetGrupos.find(grupo => grupo.descricao == descricaoGrupo.toUpperCase());
            if (objGrupo != undefined) {
                if (objGrupo.excluirContato(objContato)) {
                    return "SUCESSO";
                } else {
                    return "CONTATO_NAO_ESTA_NO_GRUPO";
                }
            } else {
                return "GRUPO_NAO_ENCONTRADO";
            }
        } else {
            return "CONTATO_NAO_ENCONTRADO";
        }

    }

    listarContatosGrupo(descricaoGrupo) {
        /* Retorna um um vetor de objetos literais com os dados de todos os contatos que
          estão vinculados ao grupo informado.
            Se não houver contatos vinculados ao grupo informado, retorna um vetor vazio.
       */

        var vetObjetosLiteraisContato = []; //vetor de objetos literais

        let grupoPesquisado = this.#vetGrupos.find((grupo) =>
            grupo.descricao == descricaoGrupo.toUpperCase()
        );
        if (grupoPesquisado != undefined) {

            grupoPesquisado.lstContatos.forEach((contato) => {
                vetObjetosLiteraisContato.push(
                    {
                        nome: contato.nome,
                        telefone: contato.telefone,
                        endereco: contato.endereco,
                        cpf: contato.cpf,
                        dataNasc: contato.dataNasc
                    }
                );
            });
        }
        return vetObjetosLiteraisContato;
    }

    carregadorDados() {
        let vetContatosSalvos = [];
        let vetGruposSalvos = [];

        if (localStorage.hasOwnProperty("contatosSalvos")) {
            let strJSONVetContatos = localStorage.getItem("contatosSalvos");
            vetContatosSalvos = JSON.parse(strJSONVetContatos);
        }
        if (vetContatosSalvos.length > 0) {
            vetContatosSalvos.forEach((objLitContato) => {
                this.#vetContatos.push(new Contato(objLitContato.nome, objLitContato.endereco,
                    objLitContato.telefone, objLitContato.cpf, objLitContato.dataNasc));
            });
        } else {
            this.#vetContatos = [
                new Contato("Allan", "(28)99885-9003", "Patrimônio", "132.681.077-45", "23/08/2002"),
                new Contato("Elder", "(27)99959-1247", "Itapuã", "121.861.088-75", "23/05/1974"),
                new Contato("Zoroastro", "(27)99712-5413", "Maracanã", "132.456.123-05", "13/09/1990")
            ];
        }

        if (localStorage.hasOwnProperty("gruposSalvos")) {
            let strJSONVetGrupos = localStorage.getItem("gruposSalvos");
            vetGruposSalvos = JSON.parse(strJSONVetGrupos);
        }
        if (vetGruposSalvos.length > 0) {
            vetGruposSalvos.forEach((objLitGrupo, indice) => {
                this.#vetGrupos.push(new Grupo(objLitGrupo.descricao));
                objLitGrupo.lstContatos.forEach((objLitContato) => {
                    let objContato = this.#vetContatos.find((contato) =>
                        contato.nome == objLitContato.nome.toUpperCase()
                    );
                    if (objContato != undefined) {
                        this.#vetGrupos[indice].incluirContato(objContato);
                    }
                });
            });
        } else {
            this.#vetGrupos = [
                new Grupo("Escola", this.#vetContatos[2]),
                new Grupo("Família", this.#vetContatos[1])
            ];
            this.#vetGrupos[0].incluirContato(this.#vetContatos[0]);
            this.#vetGrupos[1].incluirContato(this.#vetContatos[0]);
        }

    }

    salvarLocalStorage() {
        if (this.#vetContatos.length > 0) {
            var strJSONVetContatos = "[" + this.#vetContatos[0].stringify();
            for (let i = 1; i < this.#vetContatos.length; i++) {
                strJSONVetContatos += "," + this.#vetContatos[i].stringify();
            }
            strJSONVetContatos += "\n]";

            localStorage.setItem("contatosSalvos", strJSONVetContatos)

        }

        if (this.#vetGrupos.length > 0) {
            var strJSONVetGrupos = "[" + this.#vetGrupos[0].stringify();
            for (let i = 1; i < this.#vetGrupos.length; i++) {
                strJSONVetGrupos += "," + this.#vetGrupos[i].stringify();
            }
            strJSONVetGrupos += "\n]";

            localStorage.setItem("gruposSalvos", strJSONVetGrupos)
        }
    }
}