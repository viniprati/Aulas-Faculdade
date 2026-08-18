<?php 
// Include tenta incluir, mas se não houver arquivo ele continua naturalmente
// require_once é o comando que usamos para incluir um arquivo externo
include 'funcoes.php';
// require necessita da existência do arquivo
require 'funcoes.php';

echo criarHeader('Página Inicial','Back-End - Criação de páginas');
echo criarMain("<a href=teste.php>Clique aqui para próxima página");
echo criarFooter("Página desenvolvida durante o aprendizado de criação de páginas na matéria de BackEnd");

?>