<?php

// Ajuste usuário e senha conforme a configuração do seu MySQL.
// 127.0.0.1 força a conexão TCP e funciona com o MySQL do XAMPP.
const DB_HOST = '127.0.0.1';
const DB_NAME = 'aulas-php';
const DB_USER = 'root';
const DB_PASS = '';

function conectarBanco() {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';

    return new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
}
