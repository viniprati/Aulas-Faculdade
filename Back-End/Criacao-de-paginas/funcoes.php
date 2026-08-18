<?php

function criarHeader($cabecalho) {
        $html = '<header>' .$cabecalho. '</header>';
    return $html;
}

function criarMain($contexto) {
    $html = '<main>' .$contexto. '</main>';
    return $html;

}

function criarFooter($rodape) {
        $html = '<footer>' .$rodape. '</footer>';
    return $html;
}
/*
echo criarHeader('Back-End - Criação de páginas');
echo criarMain("<a href=teste.php>Clique aqui para próxima página");
echo criarFooter("Página desenvolvida durante o aprendizado de criação de páginas na matéria de BackEnd");
*/
?>

