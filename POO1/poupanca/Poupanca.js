import { Conta } from "./Conta.js";

export class Poupanca extends Conta {
    #rendimento;
   
    constructor(cliente, saldo = 0.0, rendimento = 0.0) {
        super (cliente, saldo);
        this.rendimento = rendimento;
    }

    get rendimento() {
        return this.#rendimento;
    }
    set rendimento(valor) {
        if (valor < 0.0) {
            this.#rendimento = 0.0;
        } else {
            this.#rendimento = valor;
        }
    }

    viraMes(){
        let acrescimo = super.saldo * (this.#rendimento/100);
        super.depositar(acrescimo);
        return super.saldo;
    }
    
    toString() {
        return ("Poupança:\n" +
             super.toString() +
            "\nSaldo = R$" + super.saldo.toFixed(2) +
            "\nRendimento = " + this.#rendimento.toFixed(1) + "%");
    }
}