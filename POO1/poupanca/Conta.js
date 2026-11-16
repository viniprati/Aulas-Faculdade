import { Cliente } from "./Cliente.js";

export class Conta {
    static #qtContas = 0; //atributo estático, da classe e não da instância da classe
    #titular;
    #saldo;
    #id;
    constructor(cliente, saldoInicial = 0.0) {
        this.titular = cliente; //ATENÇÃO: chama o método set titular
        if (saldoInicial < 0.0) {
            this.#saldo = 0;
        } else {
            this.#saldo = saldoInicial;
        }
        Conta.#qtContas++;
        this.#id = ""+ new Date().getFullYear() + Conta.#qtContas;
    }

    static get qtContas() {
        return Conta.#qtContas;
    }

    get id() {
        return this.#id;
    }

    get titular() {
        return this.#titular;
    }

    set titular(cliente) {
        if (cliente != undefined && cliente instanceof Cliente) {
            this.#titular = cliente;
        }
    }

    get saldo() {
        return this.#saldo;
    }

    sacar(valor) {
        if (valor > 0.00 && valor <= this.#saldo) {
            this.#saldo -= valor;
            return true;
        }
        return false;
    }

    depositar(valor) {
        if (valor > 0.00){
            this.#saldo += valor;
            return true;
        }
        return false;
    }

    transferir(valor, contaDestino) {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }

    viraMes() {
        /* Fechamento mensal da conta: retorna o saldo após a virada do mês.
           Cada tipo de conta define o que acontece nessa virada sobrescrevendo este método.
           Na classe Conta não há tarifa nem rendimento, por isso o saldo não se altera.
        */
       return this.saldo;
    }

    toString() {
        return ("N° Conta = " + this.#id +
            "\nTitular:\n" +
            this.#titular.toString()
        );
    }
}