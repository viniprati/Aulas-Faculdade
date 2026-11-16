// Versão didática criada para este projeto; não é o arquivo oficial do AVA.
export class Cliente {
    #name;
    #cpf;
    #birthDay;

    constructor(name, cpf, birthDay) {
        if (typeof name != "string" || name.trim() == "") {
            throw new Error("O nome do cliente deve ser preenchido.");
        }
        if (typeof cpf != "string" || cpf.trim() == "") {
            throw new Error("O CPF do cliente deve ser preenchido.");
        }
        if (typeof birthDay != "string" || birthDay.trim() == "") {
            throw new Error("A data de nascimento deve ser preenchida.");
        }

        this.#name = name.trim();
        this.#cpf = cpf.trim();
        this.#birthDay = birthDay.trim();
    }

    get name() {
        return this.#name;
    }

    get cpf() {
        return this.#cpf;
    }

    get birthDay() {
        return this.#birthDay;
    }

    toString() {
        return "Nome: " + this.#name +
            "\nCPF: " + this.#cpf +
            "\nData de nascimento: " + this.#birthDay;
    }
}
