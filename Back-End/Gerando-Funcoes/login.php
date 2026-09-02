<?php
require 'funcoes.php';

$erro = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $erro = fazerLogin($_POST['email'], $_POST['senha']);

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
    <title>Login - R.E.P.O</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php echo criarCabecalho('R.E.P.O'); ?>

    <main class="pagina-formulario">
        <form class="formulario" method="post">
            <h1>Entrar</h1>

            <?php if ($erro != '') { ?>
                <p class="mensagem-erro"><?php echo protegerTexto($erro); ?></p>
            <?php } ?>

            <label>
                E-mail
                <input type="email" name="email" required>
            </label>

            <label>
                Senha
                <input type="password" name="senha" required>
            </label>

            <button class="botao" type="submit">Entrar</button>
            <p>Não tem conta? <a href="cadastro.php">Cadastrar</a></p>
        </form>
    </main>

    <?php echo criarRodape('Login simples usando sessão em PHP.'); ?>
</body>
</html>
