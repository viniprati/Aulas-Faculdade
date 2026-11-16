import {Cliente} from "./Cliente.js";
import {Conta} from "./Conta.js";
import {ContaCorrente} from "./ContaCorrente_Incompleto.js";
import {Poupanca} from "./Poupanca.js";

/*=====================================================================================
  TAREFA 10 - HERANÇA, SOBRESCRITA E POLIMORFISMO EM JAVASCRIPT

  Leia os comentários de cada PARTE na ordem em que aparecem e siga as instruções.
   - Onde houver "Resposta: ______", escreva sua resposta no próprio comentário.
   - Onde houver "DESAFIO", escreva o código pedido.
  Para executar, abra o arquivo testeHerancaPolimorfismo.html no navegador e acompanhe
  as mensagens no console (F12 --> aba Console).
=====================================================================================*/

//Cliente constructor(name, cpf, birthDay)
const cliente1 = new Cliente("Bruno",  "11122233344", "1997/09/03");
const cliente2 = new Cliente("Milton", "99988877766", "1990/05/20");

/*-------------------------------------------------------------------------------------
  PARTE 1 - UM VETOR DE CONTAS

  O vetor abaixo armazena objetos de duas classes diferentes: ContaCorrente e Poupanca.
  Mesmo assim, podemos chamá-lo de "vetor de Contas", pois as duas classes são subclasses
  de Conta: toda ContaCorrente É UMA Conta, e toda Poupanca É UMA Conta.
  Por isso, nas próximas partes, poderemos tratar todos os elementos do vetor da mesma forma,
  chamando os métodos que toda Conta possui.

  OBS: em JavaScript, um Array não tem tipo definido e poderia guardar qualquer valor.
       Cabe a nós, programadores, garantir que nele sejam inseridas apenas Contas.
-------------------------------------------------------------------------------------*/

//ContaCorrente constructor(cliente, saldo, tarifa, limiteCredito, juros)
//Poupanca      constructor(cliente, saldo, rendimento)
const vetContas = new Array(
    new ContaCorrente(cliente1, 500.00, 10.00, 200.00, 15.00),
    new Poupanca(cliente1, 1000.00, 1.0),
    new ContaCorrente(cliente2, 2000.00, 10.00, 250.00, 15.00),
    new Poupanca(cliente2, 500.00, 1.0)
);

/* QUESTÃO 1
   O operador instanceof verifica se um objeto é instância de uma classe (ou de uma de suas subclasses).

   a) Descomente as duas linhas de console.log abaixo e execute a aplicação.
      Copie a mensagem de erro apresentada no console e explique o motivo do erro.
      Resposta: ReferenceError: Conta is not defined.
      O módulo indexPolimorfismo.js não importava a classe Conta. A importação
      de Conta nos arquivos das subclasses não disponibiliza esse nome neste módulo.

   b) Corrija o erro (sem apagar as duas linhas) e execute novamente.
      Explique por que o resultado é true para os dois objetos, sendo que um deles
      é uma ContaCorrente e o outro é uma Poupanca.
      Resposta: Foi acrescentado o import de Conta neste arquivo e as duas linhas foram descomentadas.
      Os dois resultados são true porque ContaCorrente e Poupanca estendem Conta.
      Assim, Conta.prototype faz parte da cadeia de protótipos dos dois objetos.

   ATENÇÃO: enquanto o erro não for corrigido, nenhuma instrução abaixo destas linhas será executada.
*/
console.log("vetContas[0] é uma Conta? " + (vetContas[0] instanceof Conta));
console.log("vetContas[1] é uma Conta? " + (vetContas[1] instanceof Conta));


/*-------------------------------------------------------------------------------------
  PARTE 2 - POLIMORFISMO COM O MÉTODO toString()

  O laço abaixo (for tradicional) chama vetContas[i].toString() para todas as contas do vetor.
  A instrução é sempre a mesma, mas o método executado depende da classe do objeto armazenado
  em cada posição do vetor. Isso é POLIMORFISMO: a mesma chamada de método produz comportamentos
  diferentes, conforme a classe do objeto.

  ANTES de fazer o DESAFIO 1, execute a aplicação e observe a listagem.

  QUESTÃO 2
  a) As Contas Correntes aparecem sem saldo, tarifa, limite e juros. Coloque um breakpoint na
     linha do console.log do laço abaixo e, no debug, use "Step Into" (F11) para entrar no
     toString() da 1ª conta (i = 0). Em qual classe está o método toString() executado?
     Por que ele foi executado, se o objeto é uma ContaCorrente?
     Resposta: Antes do Desafio 1, o método executado está na classe Conta.
     Como ContaCorrente ainda não define toString(), a chamada utiliza o método
     herdado da superclasse Conta.

  DESAFIO 1: implemente o método toString() na classe ContaCorrente
             (veja as orientações no arquivo ContaCorrente_Incompleto.js).

  b) Depois do DESAFIO 1, repita o debug para i = 0 e para i = 1. Liste, na ordem em que são
     executados, os métodos toString() chamados para cada uma dessas contas, indicando a classe
     de cada um.
     Dica: observe o painel "Call Stack" (Pilha de Chamadas) da ferramenta de debug.
     Resposta: Para i = 0: ContaCorrente.toString(), Conta.toString() e Cliente.toString().
     Para i = 1: Poupanca.toString(), Conta.toString() e Cliente.toString().
     Cada subclasse chama super.toString(), e Conta chama toString() do titular.
-------------------------------------------------------------------------------------*/
console.log("Lista de Contas:\n");
for (let i = 0; i < vetContas.length; i++){
    console.log(vetContas[i].toString() + "\n\n");
}


/*-------------------------------------------------------------------------------------
  PARTE 3 - POLIMORFISMO COM sacar(), depositar() E get saldo

  O laço abaixo tenta sacar R$700,00 e depois depositar R$100,00 em todas as contas.
   - ContaCorrente sobrescreve sacar(), depositar() e get saldo, pois permite usar um limite
     de crédito (o valor usado do limite fica registrado como saldo devedor).
   - Poupanca não sobrescreve esses métodos: usa os métodos herdados de Conta.

  QUESTÃO 3
  A 1ª conta (ContaCorrente) e a 4ª conta (Poupanca) começaram com o mesmo saldo (R$500,00) e
  receberam as mesmas operações, mas terminaram com saldos diferentes (R$-100.00 e R$600.00).
  Explique cada um dos resultados, indicando qual método sacar() foi executado em cada caso.
  Resposta: Na 1ª conta, executa-se sacar() de ContaCorrente. O saque de R$700,00
  usa os R$500,00 próprios e R$200,00 do limite, registrando R$200,00 de saldo devedor.
  O depósito de R$100,00 reduz essa dívida para R$100,00; o saldo exibido é R$-100,00.
  Na 4ª conta, executa-se sacar() herdado de Conta. Como R$700,00 supera os R$500,00
  disponíveis, o saque é recusado e o saldo permanece igual. O depósito de R$100,00,
  também pelo método de Conta, eleva o saldo para R$600,00.
-------------------------------------------------------------------------------------*/
console.log("\n\nTentando Sacar R$700,00 e Depositar R$100,00 nas Contas:\n");
for (let i = 0; i < vetContas.length; i++){
    vetContas[i].sacar(700.00);
    vetContas[i].depositar(100.00);
    console.log("Conta " + vetContas[i].id + " - Saldo = R$" + vetContas[i].saldo.toFixed(2) + "\n");
}


/*-------------------------------------------------------------------------------------
  PARTE 4 - POLIMORFISMO COM O MÉTODO viraMes()

  A classe Conta possui o método viraMes(), que não altera o saldo. As subclasses o sobrescrevem:
   - Poupanca: aplica o rendimento (percentual) sobre o saldo;
   - ContaCorrente: cobra a tarifa mensal e os juros sobre o saldo devedor (DESAFIO 2).

  OBS: na instrução console.log(vetContas[i] + "\n\n"), o objeto é concatenado com uma string.
       Nesse caso, o JavaScript chama o método toString() do objeto automaticamente.

  QUESTÃO 4 (responda ANTES de fazer o DESAFIO 2)
  Execute a aplicação: as Poupanças rendem, mas as Contas Correntes não pagam tarifa.
  Coloque um breakpoint na linha vetContas[i].viraMes() e entre (F11) no método para i = 0.
  a) Em qual classe está o método viraMes() executado? Por que a aplicação não apresentou erro,
     se a classe ContaCorrente ainda não possui o método viraMes()?
     Resposta: Antes do Desafio 2, executa-se viraMes() de Conta. Não há erro porque
     ContaCorrente herda esse método, mesmo sem possuir uma implementação própria.
  b) Dentro desse viraMes(), entre (F11) na instrução return this.saldo. Qual get saldo() foi
     executado: o de Conta ou o de ContaCorrente? Por quê?
     Resposta: Executa-se o getter saldo de ContaCorrente, que consulta super.saldo
     e desconta o saldo devedor. O this continua sendo o objeto ContaCorrente,
     mesmo durante a execução do método herdado de Conta. Por isso, this.saldo
     utiliza o getter sobrescrito na subclasse.

  DESAFIO 2: implemente o método viraMes() na classe ContaCorrente
             (veja as orientações no arquivo ContaCorrente.js).
  Depois do DESAFIO 2, confira os saldos mostrados após a virada do mês:
     1ª conta (Corrente) = R$-125.00      2ª conta (Poupança) = R$404.00
     3ª conta (Corrente) = R$1390.00      4ª conta (Poupança) = R$606.00
-------------------------------------------------------------------------------------*/
console.log("\n\nVirando o Mês das Contas:\n");
for (let i = 0; i < vetContas.length; i++){
    vetContas[i].viraMes();
    console.log(vetContas[i] + "\n\n");
}


/*-------------------------------------------------------------------------------------
  PARTE 5 - POLIMORFISMO "DENTRO" DA SUPERCLASSE

  QUESTÃO 5
  A instrução abaixo transfere R$1.500,00 da 3ª conta (ContaCorrente) para a 4ª conta (Poupanca).
  O método transferir() existe apenas na classe Conta, e o método sacar() de Conta recusaria esse
  saque, pois o saldo da 3ª conta (R$1390.00) é menor que R$1.500,00. Mesmo assim, a transferência
  é realizada. Use o debug para descobrir por quê e explique.
  Dica: dentro de transferir(), entre (F11) nas instruções this.sacar(valor) e contaDestino.depositar(valor).
  Resposta: transferir() é herdado de Conta, mas this representa a 3ª conta,
  um objeto ContaCorrente. Assim, this.sacar(valor) executa sacar() de ContaCorrente,
  que permite usar os R$1390,00 próprios mais o limite de R$250,00. O saque de
  R$1500,00 é aceito, usa R$110,00 do limite e deixa o saldo em R$-110,00.
  contaDestino é a 4ª conta, uma Poupanca, cujo depositar() é herdado de Conta.
  Ela recebe R$1500,00 e passa de R$606,00 para R$2106,00. A transferência retorna true.
  Isso mostra que chamadas feitas dentro de um método da superclasse também
  podem executar métodos sobrescritos conforme o objeto que recebe a chamada.
-------------------------------------------------------------------------------------*/
console.log("\n\nTransferindo R$1.500,00 da 3ª conta para a 4ª conta:\n");
const transferiu = vetContas[2].transferir(1500.00, vetContas[3]);
console.log("Transferência realizada? " + transferiu +
            "\nConta " + vetContas[2].id + " - Saldo = R$" + vetContas[2].saldo.toFixed(2) +
            "\nConta " + vetContas[3].id + " - Saldo = R$" + vetContas[3].saldo.toFixed(2));


/*-------------------------------------------------------------------------------------
  PARTE 6 - A ESTRUTURA forEach

  forEach é um método dos Arrays que percorre o vetor do primeiro ao último elemento e, para cada
  elemento, executa a função passada como parâmetro (chamada de função de callback).

  Sintaxe:   vetor.forEach((elemento, indice) => {
                 instruções que usam o elemento...
             });
   - elemento: o valor armazenado na posição atual do vetor (no código abaixo, chamado de conta);
   - indice: a posição atual no vetor (parâmetro opcional; pode ser omitido, como abaixo).

  Diferenças em relação ao for tradicional:
   - não é preciso declarar nem controlar um índice (let i = 0; i < vetor.length; i++);
   - o forEach sempre percorre o vetor inteiro: não é possível interromper o laço com break.

  No laço abaixo, o rendimento é mostrado apenas para as Poupanças. Repare no teste com instanceof.
-------------------------------------------------------------------------------------*/
console.log("\n\nMostrando o Rendimento apenas das Contas Poupança:\n");
vetContas.forEach((conta) => {
    if (conta instanceof Poupanca) {
        console.log("Conta " + conta.id + " - Rendimento = " + conta.rendimento.toFixed(1) + "%\n");
    }
});

/* QUESTÃO 6
   a) Descomente o trecho abaixo (igual ao anterior, mas sem o if) e execute a aplicação.
      Copie a mensagem de erro apresentada no console e explique o motivo do erro.
      Resposta: TypeError: Cannot read properties of undefined (reading 'toFixed').
      O primeiro objeto é uma ContaCorrente e não possui o getter rendimento.
      Por isso, conta.rendimento resulta em undefined. O erro ocorre ao tentar
      executar toFixed(1) sobre esse valor.
   b) Por que os métodos toString(), sacar() e viraMes() puderam ser chamados para todas as contas
      do vetor sem nenhum teste, mas, para acessar o rendimento, é necessário testar se a conta
      é uma instância de Poupanca?
      Resposta: toString(), sacar() e viraMes() estão disponíveis nas duas subclasses,
      por herança de Conta ou por sobrescrita. Já rendimento é uma propriedade
      específica de Poupanca e não existe em ContaCorrente. O teste instanceof
      seleciona os objetos que oferecem essa propriedade antes de acessá-la.
   Depois de responder, comente novamente o trecho abaixo.
*/
//vetContas.forEach((conta) => {
//    console.log("Conta " + conta.id + " - Rendimento = " + conta.rendimento.toFixed(1) + "%\n");
//});


/*-------------------------------------------------------------------------------------
  PARTE 7 - A ESTRUTURA for...of

  O for...of percorre diretamente os VALORES de um vetor: a cada repetição, a variável declarada
  no laço recebe o próximo elemento do vetor.

  Sintaxe:   for (let elemento of vetor) {
                 instruções que usam o elemento...
             }
   - não há índice: se você precisar da posição do elemento, use o for tradicional
     ou o 2º parâmetro do forEach;

  No laço abaixo, o limite disponível é mostrado apenas para as Contas Correntes.
-------------------------------------------------------------------------------------*/
console.log("\n\nMostrando o Limite Disponível apenas das Contas Corrente:\n");
for (let conta of vetContas) {
    if (conta instanceof ContaCorrente) {
        console.log("Conta " + conta.id + " - Limite Disponível = R$" + conta.limiteDisponivel.toFixed(2) + "\n");
    }
}