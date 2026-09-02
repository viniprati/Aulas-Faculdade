<?php
require 'funcoes.php';

if (!estaLogado()) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel - R.E.P.O</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php echo criarCabecalho('R.E.P.O'); ?>

    <main class="painel">
        <section>
            <p class="etiqueta">Área logada</p>
            <h1>Bem-vindo, <?php echo protegerTexto($_SESSION['usuario_nome']); ?>.</h1>
            <p>Este painel só aparece para quem fez login.</p>
        </section>
    </main>

    <?php echo criarRodape('Menu privado visível apenas com usuário logado.'); ?>
</body>
</html>
