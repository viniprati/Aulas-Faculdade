<?php
require 'funcoes.php';

$termo = '';

if (isset($_GET['q'])) {
    $termo = $_GET['q'];
}

if (isset($_GET['destino']) && $_GET['destino'] == 'pinterest') {
    $destino = 'pinterest';
} else {
    $destino = 'google';
}

if (trim($termo) != '') {
    if ($destino == 'pinterest') {
        header('Location: https://br.pinterest.com/search/pins/?q=' . urlencode($termo));
        exit;
    }

    header('Location: https://www.google.com/search?q=' . urlencode($termo));
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesquisa - R.E.P.O</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php echo criarCabecalho('R.E.P.O'); ?>

    <main class="pagina-pesquisa">
        <section class="pesquisa-cabecalho">
            <p class="etiqueta">Busca</p>
            <h1>Pesquisar no navegador</h1>
            <?php echo criarFormularioPesquisa($termo, $destino); ?>
        </section>

        <section>
            <p class="texto-apoio">Digite sua pesquisa e escolha onde buscar.</p>
        </section>
    </main>

    <?php echo criarRodape('Pesquisa usando método GET e redirecionamento em PHP.'); ?>
</body>
</html>
