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
    <title>Perfil - R.E.P.O</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php echo criarCabecalho('R.E.P.O'); ?>

    <main class="painel">
        <section>
            <p class="etiqueta">Meu perfil</p>
            <h1>Olá, <?php echo protegerTexto($_SESSION['usuario_nome']); ?>.</h1>
            <p>Você está logado no site.</p>
            <p><strong>E-mail:</strong> <?php echo protegerTexto($_SESSION['usuario_email']); ?></p>
            <a class="botao" href="logout.php">Sair da conta</a>
        </section>
    </main>

    <?php echo criarRodape('Página básica de perfil para usuário logado.'); ?>
</body>
</html>
