<?php

function criarCabecalho($titulo, $links) {
    $html = '<header class="cabecalho">';
    $html .= '<div class="logo">' . $titulo . '</div>';
    $html .= '<nav class="menu">';

    foreach ($links as $texto => $url) {
        $html .= '<a href="' . $url . '">' . $texto . '</a>';
    }

    $html .= '</nav>';
    $html .= '</header>';

    return $html;
}

function criarPrincipal($titulo, $descricao, $cards) {
    $html = '<main>';
    $html .= '<section class="hero" id="missao">';
    $html .= '<div>';
    $html .= '<p class="etiqueta">Terror cooperativo</p>';
    $html .= '<h1>' . $titulo . '</h1>';
    $html .= '<p>' . $descricao . '</p>';
    $html .= '<a class="botao" href="#coleta">Ver missão</a>';
    $html .= '</div>';
    $html .= '</section>';

    $html .= '<section class="conteudo">';

    foreach ($cards as $card) {
        $html .= '<article class="card" id="' . $card['id'] . '">';
        $html .= '<h2>' . $card['titulo'] . '</h2>';
        $html .= '<p>' . $card['texto'] . '</p>';
        $html .= '</article>';
    }

    $html .= '</section>';
    $html .= '</main>';

    return $html;
}

function criarRodape($texto = '') {
    if ($texto == '') {
        return '<footer class="rodape"></footer>';
    }

    return '<footer class="rodape"><p>' . $texto . '</p></footer>';
}

?>
