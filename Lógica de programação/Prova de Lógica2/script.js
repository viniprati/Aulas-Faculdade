const campoNome = document.getElementById("nome");
const campoCargo = document.getElementById("cargo");
const campoSexo = document.getElementById("sexo");
const campoSalario = document.getElementById("salario");
const saida = document.getElementById("saida");

const colaboradores = [];
let quantidadeColaboradores = 0;

document.getElementById("btnRegistrar").addEventListener("click", registrarColaborador);
document.getElementById("btnConsultarNome").addEventListener("click", consultarNome);
document.getElementById("btnMostrarVendedores").addEventListener("click", mostrarVendedores);
document.getElementById("btnMediaSalariosSexo").addEventListener("click", calcularMediaSalariosSexo);

function registrarColaborador() {
    const nome = campoNome.value.trim();
    const cargo = campoCargo.value.trim();
    const sexo = campoSexo.value;
    const salarioTexto = campoSalario.value.trim();
    const salario = Number(salarioTexto);

    if (nome === "") {
        alert("Informe o nome.");
        campoNome.focus();
    } else if (/[0-9]/.test(nome)) {
        alert("O nome não pode conter números.");
        campoNome.focus();
    } else if (cargo === "") {
        alert("Informe o cargo.");
        campoCargo.focus();
    } else if (sexo === "") {
        alert("Informe o sexo biológico.");
        campoSexo.focus();
    } else if (salarioTexto === "" || salario <= 0 || isNaN(salario)) {
        alert("Informe um salário válido.");
        campoSalario.focus();
    } else {
        colaboradores[quantidadeColaboradores] = {
            nome: nome,
            cargo: cargo,
            sexo: sexo,
            salario: salario
        };

        quantidadeColaboradores++;

        saida.textContent = "Dados do(a) Colaborador(a) foram registrados !";

        campoNome.value = "";
        campoCargo.value = "";
        campoSexo.value = "";
        campoSalario.value = "";
        campoNome.focus();
    }
}

function consultarNome() {
    const nomeConsultado = campoNome.value.trim();
    let encontrou = false;
    let texto = "";

    if (nomeConsultado === "") {
        alert("Informe o nome para consultar.");
        campoNome.focus();
    } else if (/[0-9]/.test(nomeConsultado)) {
        alert("O nome não pode conter números.");
        campoNome.focus();
    } else {
        for (let i = 0; i < quantidadeColaboradores; i++) {
            if (colaboradores[i].nome.toLowerCase() === nomeConsultado.toLowerCase()) {
                texto += "Colaborador(a) encontrado(a):\n\n";
                texto += "Nome: " + colaboradores[i].nome + "\n";
                texto += "Cargo: " + colaboradores[i].cargo + "\n";
                texto += "Sexo biológico: " + colaboradores[i].sexo + "\n";
                texto += "Salário: R$ " + colaboradores[i].salario.toFixed(2) + "\n";
                texto += "\n";
                encontrou = true;
            }
        }

        if (encontrou === false) {
            saida.textContent = "Colaborador(a) não encontrado(a).";
            campoNome.focus();
        } else {
            saida.textContent = texto;
        }
    }
}

function mostrarVendedores() {
    let encontrou = false;
    let texto = "Vendedores(as) cadastrados(as):\n\n";

    if (quantidadeColaboradores === 0) {
        saida.textContent = "Nenhum colaborador cadastrado.";
    } else {
        for (let i = 0; i < quantidadeColaboradores; i++) {
            if (colaboradores[i].cargo === "Vendedor") {
                texto += "Nome: " + colaboradores[i].nome + "\n";
                texto += "Sexo biológico: " + colaboradores[i].sexo + "\n";
                texto += "Salário: R$ " + colaboradores[i].salario.toFixed(2) + "\n";
                texto += "\n";
                encontrou = true;
            }
        }

        if (encontrou === false) {
            saida.textContent = "Nenhum(a) vendedor(a) cadastrado(a).";
        } else {
            saida.textContent = texto;
        }
    }
}

function calcularMediaSalariosSexo() {
    let somaFeminino = 0;
    let somaMasculino = 0;
    let somaInterSexo = 0;
    let quantidadeFeminino = 0;
    let quantidadeMasculino = 0;
    let quantidadeInterSexo = 0;
    let texto = "Média salarial por sexo:\n\n";

    if (quantidadeColaboradores === 0) {
        saida.textContent = "Nenhum colaborador cadastrado.";
    } else {
        for (let i = 0; i < quantidadeColaboradores; i++) {
            if (colaboradores[i].sexo === "Feminino") {
                somaFeminino += colaboradores[i].salario;
                quantidadeFeminino++;
            } else if (colaboradores[i].sexo === "Masculino") {
                somaMasculino += colaboradores[i].salario;
                quantidadeMasculino++;
            } else if (colaboradores[i].sexo === "InterSexo") {
                somaInterSexo += colaboradores[i].salario;
                quantidadeInterSexo++;
            }
        }

        if (quantidadeFeminino === 0) {
            texto += "Sexo Feminino: não há registro de colaborador(a) desse sexo.\n";
        } else {
            texto += "Sexo Feminino: R$ " + (somaFeminino / quantidadeFeminino).toFixed(2) + "\n";
        }

        if (quantidadeMasculino === 0) {
            texto += "Sexo Masculino: não há registro de colaborador(a) desse sexo.\n";
        } else {
            texto += "Sexo Masculino: R$ " + (somaMasculino / quantidadeMasculino).toFixed(2) + "\n";
        }

        if (quantidadeInterSexo === 0) {
            texto += "Sexo InterSexo: não há registro de colaborador(a) desse sexo.\n";
        } else {
            texto += "Sexo InterSexo: R$ " + (somaInterSexo / quantidadeInterSexo).toFixed(2) + "\n";
        }

        saida.textContent = texto;
    }
}
