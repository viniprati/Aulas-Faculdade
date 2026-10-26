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

// Na MDN, estas classes se chamam Person e Teacher.
// Aqui, o mesmo exemplo foi traduzido para Pessoa e Professor.
class Pessoa {
  constructor(primeiroNome, sobrenome, idade, genero, interesses) {
    this.nome = { primeiro: primeiroNome, sobrenome };
    this.idade = idade;
    this.genero = genero;
    this.interesses = interesses;
  }

  cumprimentar() {
    return `Olá! Eu sou ${this.nome.primeiro}.`;
  }

  despedir() {
    return `${this.nome.primeiro} foi embora. Até logo!`;
  }
}

class Professor extends Pessoa {
  constructor(primeiroNome, sobrenome, idade, genero, interesses, disciplina, serie) {
    super(primeiroNome, sobrenome, idade, genero, interesses);
    this._disciplina = disciplina;
    this.serie = serie;
  }

  get disciplina() {
    return this._disciplina;
  }

  set disciplina(novaDisciplina) {
    this._disciplina = novaDisciplina;
  }
}

const han = new Pessoa("Han", "Solo", 25, "masculino", ["Contrabando"]);
const leia = new Pessoa("Leia", "Organa", 19, "feminino", ["Governo"]);
const professor = new Professor(
  "Severus", "Snape", 58, "masculino", ["Poções"], "Artes das Trevas", 5,
);
const disciplinaInicial = professor.disciplina;
professor.disciplina = "Escultura de balões";

const resultadoMdn = [
  han.cumprimentar(),
  leia.despedir(),
  professor.cumprimentar(),
  professor.despedir(),
  `Idade: ${professor.idade}; disciplina inicial: ${disciplinaInicial}`,
  `Disciplina após alteração: ${professor.disciplina}`,
].join("\n");

console.log(`=== Sistema bancário ===\n${resultadoBanco}`);
console.log(`\n=== Exemplo da MDN ===\n${resultadoMdn}`);
if (typeof document !== "undefined") {
  document.getElementById("resultado").textContent = resultadoBanco;
  document.getElementById("resultado-mdn").textContent = resultadoMdn;
}
