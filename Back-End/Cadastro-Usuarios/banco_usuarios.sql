-- Execute este arquivo já dentro do banco que você criou.
CREATE TABLE IF NOT EXISTS usuarios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Cadastre os seus 10 usuários descomentando e substituindo os valores abaixo.
-- No PHP, a senha será salva de forma segura com password_hash().
/*
INSERT INTO usuarios (email, senha) VALUES
('usuario1@email.com', 'senha_do_usuario_1'),
('usuario2@email.com', 'senha_do_usuario_2'),
('usuario3@email.com', 'senha_do_usuario_3'),
('usuario4@email.com', 'senha_do_usuario_4'),
('usuario5@email.com', 'senha_do_usuario_5'),
('usuario6@email.com', 'senha_do_usuario_6'),
('usuario7@email.com', 'senha_do_usuario_7'),
('usuario8@email.com', 'senha_do_usuario_8'),
('usuario9@email.com', 'senha_do_usuario_9'),
('usuario10@email.com', 'senha_do_usuario_10');
*/
