<?php
require 'funcoes.php';

$erro = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $erro = cadastrarUsuario($_POST['nome'], $_POST['email'], $_POST['senha']);

    if ($erro == '') {
        header('Location: painel.php');
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
                <input type="text" name="nome" required>
            </label>

            <label>
                E-mail
                <input type="email" name="email" required>
            </label>

            <label>
                Senha
                <input type="password" name="senha" required>
            </label>

            <button class="botao" type="submit">Cadastrar</button>
            <p>Já tem conta? <a href="login.php">Entrar</a></p>
        </form>
    </main>

    <?php echo criarRodape('Cadastro simples usando PHP e arquivo JSON.'); ?>
</body>
</html>
