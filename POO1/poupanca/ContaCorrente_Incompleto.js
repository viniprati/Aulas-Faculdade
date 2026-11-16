import { Conta } from "./Conta.js";

export class ContaCorrente extends Conta {
    #tarifa;
    #limiteCredito;
    #juros;
    #saldoDevedor;
    constructor(cliente, saldo = 0.0, tarifa = 0.0, limiteCredito = 100.0, juros = 0.0) {
        super (cliente, saldo);
        this.tarifa = tarifa;
        this.limiteCredito = limiteCredito;
        this.juros = juros;
        this.#saldoDevedor = 0.0;
    }

    get limiteCredito() {
        return this.#limiteCredito;
    }

    set limiteCredito(valor) {
        if (valor < 0.0) {
            this.#limiteCredito = 0.0;
        } else {
            this.#limiteCredito = valor;
        }
    }

    get tarifa() {
        return this.#tarifa;
    }
    set tarifa(valor) {
        if (valor < 0.0) {
            this.#tarifa = 0.0;
        } else {
            this.#tarifa = valor;
        }
    }

    get juros(){
        return this.#juros;
    }
    set juros(valor) {
        if (valor < 0.0) {
            this.#juros = 0.0;
        } else {
            this.#juros = valor;
        }
    }
    
    get saldo(){
        return (super.saldo - this.#saldoDevedor);
    }

    get limiteDisponivel() {
        return (this.#limiteCredito + super.saldo - this.#saldoDevedor);
    }

    sacar(valor) {
        if (valor > 0.00 && 
            valor <= (super.saldo + this.#limiteCredito - this.#saldoDevedor) ){
            if (!super.sacar(valor)){ // se não conseguiu sacar
                valor -= super.saldo;
                super.sacar(super.saldo);
                this.#saldoDevedor += valor;
            }
            return true;
        }
        return false;
    }

    depositar(valor) {
        if (valor > 0.00) {
            if (this.#saldoDevedor > 0.00){
                if (valor > this.#saldoDevedor){
                    valor -= this.#saldoDevedor;
                    this.#saldoDevedor = 0.00;
                    super.depositar(valor);
                } else {
                    this.#saldoDevedor -= valor;
                }
            } else {
                super.depositar(valor);
            }
            return true;
        }
        return false;
    }

    /* DESAFIO 1 - método toString()
       Sobrescreva o método toString() herdado de Conta. Ele deve retornar uma string no formato:
          Conta Corrente:
          <dados retornados pelo toString() da superclasse Conta>
          Saldo = R$<saldo, com 2 casas decimais>
          Tarifa = R$<tarifa, com 2 casas decimais>
          Limite de Crédito = R$<limite de crédito, com 2 casas decimais>
          Juros = <juros, com 1 casa decimal>%
       ATENÇÃO: reutilize o toString() da superclasse, sem repetir o código de Conta.
       Pense: o saldo deve ser obtido com super.saldo ou com this.saldo? Por quê?
    */


    toString() {
        // O saldo da conta corrente inclui o desconto do saldo devedor.
        return ("Conta Corrente:\n" +
            super.toString() +
            "\nSaldo = R$" + this.saldo.toFixed(2) +
            "\nTarifa = R$" + this.#tarifa.toFixed(2) +
            "\nLimite de Crédito = R$" + this.#limiteCredito.toFixed(2) +
            "\nJuros = " + this.#juros.toFixed(1) + "%");
    }

    /* DESAFIO 2 - método viraMes()
       Sobrescreva o método viraMes() herdado de Conta. Na virada do mês, a Conta Corrente deve:
        1. cobrar o valor da tarifa de manutenção mensal;
        2. se existir saldo devedor, cobrar também os juros (percentual) sobre o valor do saldo devedor;
        3. retirar o valor cobrado do saldo; se o saldo não for suficiente, a parte que faltar deve
           ser somada ao saldo devedor (a cobrança é feita mesmo que ultrapasse o limite de crédito);
        4. retornar o saldo atualizado, assim como fazem os métodos viraMes() de Conta e de Poupanca.
       Dicas:
        - observe como o método sacar() desta classe trata o saldo devedor;
        - cuidado com o caso em que não há nada a cobrar (tarifa zero e nenhum saldo devedor):
          o método sacar() de Conta recusa valores menores ou iguais a zero.
    */

    viraMes() {
        let valorCobrado = this.#tarifa;
        if (this.#saldoDevedor > 0.00) {
            valorCobrado += this.#saldoDevedor * (this.#juros / 100);
        }

        // Sem cobrança, não há saque nem alteração no saldo devedor.
        if (valorCobrado > 0.00) {
            if (!super.sacar(valorCobrado)) {
                // Usa o saldo próprio e registra a parte que faltar como dívida.
                // A cobrança mensal pode ultrapassar o limite de crédito.
                valorCobrado -= super.saldo;
                super.sacar(super.saldo);
                this.#saldoDevedor += valorCobrado;
            }
        }
        return this.saldo;
    }
}
