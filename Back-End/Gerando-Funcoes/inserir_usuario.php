<?php

function inserirUsuario($email, $senha) {
    $conexao = mysqli_connect('127.0.0.1', 'root', '', 'aulas-php');

    if (!$conexao) {
        return false;
    }

    $email = mysqli_real_escape_string($conexao, $email);
    $senha = mysqli_real_escape_string($conexao, password_hash($senha, PASSWORD_DEFAULT));

    $sql = "INSERT INTO usuarios (email, senha) VALUES ('$email', '$senha')";
    $resultado = mysqli_query($conexao, $sql);

    mysqli_close($conexao);

    return $resultado;
}
