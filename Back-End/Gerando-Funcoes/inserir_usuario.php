<?php
require_once __DIR__ . '/conexao.php';

function inserirUsuario($nome, $email, $senha) {
    try {
        $consulta = conectarBanco()->prepare('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)');
        return $consulta->execute([$nome, $email, password_hash($senha, PASSWORD_DEFAULT)]);
    } catch (PDOException $excecao) {
        return false;
    }
}
