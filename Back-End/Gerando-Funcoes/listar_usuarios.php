<?php
require 'funcoes.php';
require 'conexao.php';

$usuarios = [];
$erro = '';

try {
    // A senha nunca é selecionada nem exibida na listagem.
    $consulta = conectarBanco()->query('SELECT id, email FROM usuarios ORDER BY id');
    $usuarios = $consulta->fetchAll();
} catch (PDOException $excecao) {
    $erro = 'Não foi possível consultar os usuários. Verifique a conexão com o banco.';
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuários - R.E.P.O</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php echo criarCabecalho('R.E.P.O'); ?>

    <main class="pagina-formulario">
        <section class="formulario">
            <p class="etiqueta">Banco de dados</p>
            <h1>Usuários cadastrados</h1>

            <?php if ($erro != '') { ?>
                <p class="mensagem-erro"><?php echo protegerTexto($erro); ?></p>
            <?php } elseif (count($usuarios) == 0) { ?>
                <p class="texto-apoio">Nenhum usuário cadastrado.</p>
            <?php } else { ?>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($usuarios as $usuario) { ?>
                            <tr>
                                <td><?php echo (int) $usuario['id']; ?></td>
                                <td><?php echo protegerTexto($usuario['email']); ?></td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            <?php } ?>
        </section>
    </main>

    <?php echo criarRodape('Listagem carregada do banco aulas-php.'); ?>
</body>
</html>
