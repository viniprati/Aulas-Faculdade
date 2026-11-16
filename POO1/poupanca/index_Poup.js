import {Cliente} from "./Cliente.js";
import {Poupanca} from "./Poupanca.js";
//Observe que não é importada a superclasse Conta, pois ela é herdada pela subclasse Poupanca.

//Cliente constructor(name, cpf, birthDay)
const cliente1 = new Cliente("Bruno",  "111222333", "1997/09/03");
const cliente2 = new Cliente("Milton", "999888777", "1990/05/20");
const cliente3 = new Cliente("Isa",    "987654321", "1995/03/12");

//Poupanca constructor(cliente, saldo = 0.0, rendimento = 0.0)
const poup1 = new Poupanca(cliente1, 1000.00, 1.0);
const poup2 = new Poupanca(cliente2, 500.00, 1.1);

/*Mostrar a Quantidade de Contas Criadas e os dados dos objetos poup1 e poup2.
  OBS: #qtContas é um atributo static e privado da classe Conta, a qual disponiliza o método público static get qtContas.
       Como Poupanca é subclasse de Conta, ela herda tanto o atributo privado static #qtContas,
       quanto o método público static get qtContas. 

  Observe que a instrução a seguir está errada.
  *Comente na linha abaixo a mensagem de erro apresentada no console durante o debug da aplicação e
   explique o motivo de tal erro:
   Resposta: ReferenceError: Conta is not defined.
   Conta não foi importada neste módulo. A importação em Poupanca.js
   não disponibiliza esse nome aqui. Usamos Poupanca.qtContas para acessar
   o getter estático herdado, conforme a correção solicitada abaixo.
*/
//console.log("\n\nQuantidade de Contas: " + Conta.qtContas);
//Para corrigir o erro, comente a linha acima e descomente a linha abaixo
console.log("\n\nQuantidade de Contas: " + Poupanca.qtContas);
console.log("\n\nDados das Poupanças:");
console.log ("\n" + poup1);
console.log ("\n" + poup2);

/*Efetuar Saque no objeto poup2 e mostrar seu saldo alterado.
  OBS: Como a classe Poupanca não possui o método sacar, nem get saldo,
       são executados os métodos da superclasse Conta.
*/
poup2.sacar(200.00);
console.log ("\n\nExecutado o Saque na Poupança 2." +
             "\nSaldo da Poupança 2 = R$" + poup2.saldo.toFixed(2));

/*Efetuar Transferência do objeto poup1 para o poup2 e mostrar seus saldos alterados.
  OBS: Como a classe Poupanca não possui o método transferir, nem get saldo,
       são executados os métodos da superclasse Conta.
*/
let valorTransf = 600.00;
poup1.transferir(valorTransf, poup2);
console.log ("\n\nExecutada a Transferência de Poupança 1 para Poupança 2." +
             "\nSaldo da Poupança 1 = R$" + poup1.saldo.toFixed(2) +
             "\nSaldo da Poupança 2 = R$" + poup2.saldo.toFixed(2));

/*Efetuar Alteração de Titular do objeto poup2 e mostrar seus dados alterados.
  OBS: Como a classe Poupanca não possui o método set titular,
       é executado o método da superclasse Conta.
*/
poup2.titular = cliente3;
console.log ("\n\nExecutada a Alteração de Titular da Poupança 2." +
             "\n" + poup2.toString());