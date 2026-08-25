<?php
require 'funcoes.php';

$links = [
    'Missão' => '#missao',
    'Equipe' => '#equipe',
    'Perigo' => '#perigo'
];

$cards = [
    [
        'id' => 'coleta',
        'titulo' => 'Coleta',
        'texto' => 'Entre no local e procure itens valiosos.'
    ],
    [
        'id' => 'equipe',
        'titulo' => 'Equipe',
        'texto' => 'Jogue em grupo e carregue os objetos juntos.'
    ],
    [
        'id' => 'perigo',
        'titulo' => 'Sobrevivência',
        'texto' => 'Cuidado com os monstros e volte para a van.'
    ]
];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>R.E.P.O - Página Inspirada</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php
    echo criarCabecalho('R.E.P.O', $links);

    echo criarPrincipal(
        'Recupere itens. Fuja vivo.',
        'Página simples inspirada no jogo R.E.P.O.',
        $cards
    );

    echo criarRodape();
    ?>
</body>
</html>
