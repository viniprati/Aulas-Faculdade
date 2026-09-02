<?php
require 'funcoes.php';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perigo - R.E.P.O</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php echo criarCabecalho('R.E.P.O'); ?>

    <main class="missao">
        <section class="missao-cabecalho">
            <p class="etiqueta">Zona de perigo</p>
            <h1>Cuidado com os monstros.</h1>
            <p>Durante a missão, o maior risco é fazer barulho, se separar da equipe e demorar demais para voltar para a van.</p>
        </section>

        <section class="missao-grade">
            <article class="missao-item">
                <img src="img/sobrevivencia.png" alt="">
                <h2>Fique atento</h2>
                <p>Observe os sons e movimentos do ambiente para perceber quando algo perigoso está por perto.</p>
            </article>

            <article class="missao-item">
                <img src="img/equipe.png" alt="">
                <h2>Não vá sozinho</h2>
                <p>Andar em grupo aumenta a chance de escapar e ajuda na hora de carregar objetos pesados.</p>
            </article>

            <article class="missao-item">
                <img src="img/coleta.png" alt="">
                <h2>Não seja ganancioso</h2>
                <p>Se a situação ficar perigosa demais, volte para a van. Sobreviver vale mais que pegar todos os itens.</p>
            </article>
        </section>
    </main>

    <?php echo criarRodape('Página de perigo criada para continuar o exercício.'); ?>
</body>
</html>
