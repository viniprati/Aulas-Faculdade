<?php
require 'funcoes.php';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Missão - R.E.P.O</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php echo criarCabecalho('R.E.P.O'); ?>

    <main class="missao">
        <section class="missao-cabecalho">
            <p class="etiqueta">Detalhes da missão</p>
            <h1>Entre, recupere e volte para a van.</h1>
            <p>A missão é entrar em locais perigosos, buscar itens importantes com a equipe e escapar antes que os monstros acabem com o plano.</p>
        </section>

        <section class="missao-grade">
            <article class="missao-item">
                <img src="img/coleta.png" alt="">
                <h2>Coletar</h2>
                <p>Procure objetos valiosos pelo mapa e leve tudo com cuidado para a área segura.</p>
            </article>

            <article class="missao-item">
                <img src="img/equipe.png" alt="">
                <h2>Cooperar</h2>
                <p>Divida as tarefas com a equipe para carregar itens pesados e proteger o grupo.</p>
            </article>

            <article class="missao-item">
                <img src="img/sobrevivencia.png" alt="">
                <h2>Escapar</h2>
                <p>Fique atento aos perigos, volte para a van e complete a missão vivo.</p>
            </article>
        </section>
    </main>

    <?php echo criarRodape('Missão criada para praticar páginas com PHP.'); ?>
</body>
</html>
