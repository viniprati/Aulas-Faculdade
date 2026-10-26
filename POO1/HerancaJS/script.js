// Exemplo didático de herança em um sistema bancário.
class ContaBancaria {
  #saldo;

  constructor(titular, saldo) {
    if (!Number.isFinite(saldo) || saldo < 0) {
      throw new Error("Saldo inicial inválido.");
    }
    this.titular = titular;
    this.#saldo = saldo;
  }

  depositar(valor) {
    if (Number.isFinite(valor) && valor > 0) {
      this.#saldo += valor;
    }
  }

  consultarSaldo() {
    return this.#saldo;
  }

  formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  sacar(valor) {
    let mensagem;

    if (!Number.isFinite(valor) || valor <= 0) {
      mensagem = "Valor inválido para saque.";
    } else if (valor > this.#saldo) {
      mensagem = "Saldo insuficiente.";
    } else {
      this.#saldo -= valor;
      mensagem = `Saque de ${this.formatarValor(valor)} realizado.`;
    }

    return mensagem;
  }

  mostrarDados() {
    return `${this.titular} - Saldo: ${this.formatarValor(this.#saldo)}`;
  }
}

class ContaPoupanca extends ContaBancaria {
  constructor(titular, saldo, taxa) {
    super(titular, saldo); // Chama o construtor de ContaBancaria.
    if (!Number.isFinite(taxa) || taxa < 0) {
      throw new Error("Taxa inválida.");
    }
    this.taxa = taxa;
  }

  aplicarRendimento() {
    const rendimento = this.consultarSaldo() * this.taxa;
    this.depositar(rendimento); // Reutiliza o método herdado.
    return `Rendimento: ${this.formatarValor(rendimento)}.`;
  }

  mostrarDados() {
    const dados = super.mostrarDados(); // Chama o método da classe pai.
    return `${dados} | Conta poupança`;
  }
}

const contaAna = new ContaBancaria("Ana", 100);
const poupancaBruno = new ContaPoupanca("Bruno", 200, 0.05);

const resultadoBanco = [
  contaAna.mostrarDados(),
  contaAna.sacar(30),
  contaAna.mostrarDados(),
  contaAna.sacar(100),
  contaAna.sacar(0),
  poupancaBruno.mostrarDados(),
  poupancaBruno.aplicarRendimento(),
  poupancaBruno.mostrarDados(),
].join("\n");

// Exemplo da seção "Classes ECMAScript 2015" da MDN, adaptado para a página.
class Person {
  constructor(first, last, age, gender, interests) {
    this.name = { first, last };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  greeting() {
    return `Hi! I'm ${this.name.first}`;
  }

  farewell() {
    return `${this.name.first} has left the building. Bye for now!`;
  }
}

class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade) {
    super(first, last, age, gender, interests);
    this._subject = subject;
    this.grade = grade;
  }

  get subject() {
    return this._subject;
  }

  set subject(newSubject) {
    this._subject = newSubject;
  }
}

const han = new Person("Han", "Solo", 25, "male", ["Smuggling"]);
const leia = new Person("Leia", "Organa", 19, "female", ["Government"]);
const snape = new Teacher(
  "Severus", "Snape", 58, "male", ["Potions"], "Dark arts", 5,
);
const materiaInicial = snape.subject;
snape.subject = "Balloon animals";

const resultadoMdn = [
  han.greeting(),
  leia.farewell(),
  snape.greeting(),
  snape.farewell(),
  `Idade: ${snape.age}; matéria inicial: ${materiaInicial}`,
  `Matéria após o setter: ${snape.subject}`,
].join("\n");

console.log(`=== Sistema bancário ===\n${resultadoBanco}`);
console.log(`\n=== Exemplo da MDN ===\n${resultadoMdn}`);
if (typeof document !== "undefined") {
  document.getElementById("resultado").textContent = resultadoBanco;
  document.getElementById("resultado-mdn").textContent = resultadoMdn;
}
