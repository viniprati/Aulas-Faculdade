<?php
require 'funcoes.php';

$erro = '';
$nome = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $erro = cadastrarUsuario($nome, $email, $_POST['senha']);

    if ($erro == '') {
        header('Location: perfil.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - R.E.P.O</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php echo criarCabecalho('R.E.P.O'); ?>

    <main class="pagina-formulario">
        <form class="formulario" method="post">
            <h1>Criar conta</h1>

            <?php if ($erro != '') { ?>
                <p class="mensagem-erro"><?php echo protegerTexto($erro); ?></p>
            <?php } ?>

            <label>
                Nome
                <input type="text" name="nome" value="<?php echo protegerTexto($nome); ?>" required>
            </label>

            <label>
                E-mail
                <input type="email" name="email" value="<?php echo protegerTexto($email); ?>" required>
            </label>

            <label class="label-senha" for="senha">Senha</label>
            <div class="campo-senha">
                <input id="senha" type="password" name="senha" minlength="8" required>
                <button class="botao-secundario" id="gerarSenha" type="button">Gerar senha</button>
            </div>

            <div class="regras-senha" id="regrasSenha">
                <p>A senha precisa ter:</p>
                <span data-regra="tamanho">8 caracteres</span>
                <span data-regra="maiuscula">letra maiúscula</span>
                <span data-regra="minuscula">letra minúscula</span>
                <span data-regra="numero">número</span>
                <span data-regra="especial">caractere especial</span>
            </div>

            <button class="botao" type="submit">Cadastrar</button>
            <p>Já tem conta? <a href="login.php">Entrar</a></p>
        </form>
    </main>

    <?php echo criarRodape('Cadastro simples usando PHP e arquivo JSON.'); ?>
    <script>
        const campoSenha = document.getElementById('senha');
        const botaoGerarSenha = document.getElementById('gerarSenha');
        const regrasSenha = document.querySelectorAll('#regrasSenha span');

        function sortearCaractere(caracteres) {
            const numeros = new Uint32Array(1);
            crypto.getRandomValues(numeros);

            return caracteres[numeros[0] % caracteres.length];
        }

        function embaralharTexto(texto) {
            const letras = texto.split('');

            for (let i = letras.length - 1; i > 0; i--) {
                const numeros = new Uint32Array(1);
                crypto.getRandomValues(numeros);
                const j = numeros[0] % (i + 1);
                const temporario = letras[i];
                letras[i] = letras[j];
                letras[j] = temporario;
            }

            return letras.join('');
        }

        function gerarSenhaForte() {
            const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const minusculas = 'abcdefghijklmnopqrstuvwxyz';
            const numeros = '0123456789';
            const especiais = '!@#$%&*?';
            const todos = maiusculas + minusculas + numeros + especiais;
            let senha = '';

            senha += sortearCaractere(maiusculas);
            senha += sortearCaractere(minusculas);
            senha += sortearCaractere(numeros);
            senha += sortearCaractere(especiais);

            while (senha.length < 12) {
                senha += sortearCaractere(todos);
            }

            return embaralharTexto(senha);
        }

        function atualizarRegrasSenha() {
            const senha = campoSenha.value;
            const regras = {
                tamanho: senha.length >= 8,
                maiuscula: /[A-Z]/.test(senha),
                minuscula: /[a-z]/.test(senha),
                numero: /[0-9]/.test(senha),
                especial: /[^a-zA-Z0-9]/.test(senha)
            };

            regrasSenha.forEach(function (regra) {
                if (regras[regra.dataset.regra]) {
                    regra.classList.add('ok');
                } else {
                    regra.classList.remove('ok');
                }
            });
        }

        botaoGerarSenha.addEventListener('click', function () {
            campoSenha.value = gerarSenhaForte();
            campoSenha.type = 'text';
            atualizarRegrasSenha();
            campoSenha.focus();
        });

        campoSenha.addEventListener('input', atualizarRegrasSenha);
        atualizarRegrasSenha();
    </script>
</body>
</html>
