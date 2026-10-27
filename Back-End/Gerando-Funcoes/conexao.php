<?php

// Ajuste usuário e senha conforme a configuração do seu MySQL.
// 127.0.0.1 força a conexão TCP e funciona com o MySQL do XAMPP.
function conectarBanco() {
    $nome = getenv('DB_NAME') ?: 'aulas-php';
    $socket = getenv('DB_SOCKET');
    $dsn = $socket
        ? 'mysql:unix_socket=' . $socket . ';dbname=' . $nome . ';charset=utf8mb4'
        : 'mysql:host=' . (getenv('DB_HOST') ?: '127.0.0.1') . ';dbname=' . $nome . ';charset=utf8mb4';

    return new PDO($dsn, getenv('DB_USER') ?: 'root', getenv('DB_PASS') ?: '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
}
