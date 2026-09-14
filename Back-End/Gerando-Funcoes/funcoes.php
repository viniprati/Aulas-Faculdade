<?php

iniciarSessao();

function iniciarSessao() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
}

function protegerTexto($texto) {
    return htmlspecialchars($texto, ENT_QUOTES, 'UTF-8');
}

function criarLinksMenu() {
    return [
        'Início' => 'index.php',
        'Missão' => 'missao.php',
        'Equipe' => 'index.php#equipe',
        'Perigo' => 'perigo.php',
        'Pesquisar' => 'pesquisa.php'
    ];
}

function criarCabecalho($titulo, $links = []) {
    if ($links == []) {
        $links = criarLinksMenu();
    }

    $html = '<header class="cabecalho">';
    $html .= '<div class="logo">';
    $html .= '<img class="logo-icone" src="img/android.png" alt="">';
    $html .= protegerTexto($titulo);
    $html .= '</div>';

    $html .= '<div class="menus">';
    $html .= criarMenuPrincipal($links);

    if (estaLogado()) {
        $html .= criarMenuLogado();
    } else {
        $html .= criarMenuVisitante();
    }

    $html .= '</div>';
    $html .= '</header>';

    return $html;
}

function criarMenuPrincipal($links) {
    $html = '<nav class="menu">';

    foreach ($links as $texto => $url) {
        $html .= criarLinkMenu($url, '', $texto);
    }

    $html .= '</nav>';

    return $html;
}

function criarMenuVisitante() {
    $html = '<nav class="menu menu-login">';
    $html .= criarLinkMenu('login.php', '', 'Login');
    $html .= criarLinkMenu('cadastro.php', '', 'Cadastro');
    $html .= '</nav>';

    return $html;
}

function criarMenuLogado() {
    $html = '<nav class="menu menu-logado">';
    $html .= '<span class="usuario-nome">Olá, ' . protegerTexto($_SESSION['usuario_nome']) . '</span>';
    $html .= criarLinkMenu('painel.php', '', 'Painel');
    $html .= criarLinkMenu('perfil.php', '', 'Perfil');
    $html .= criarLinkMenu('logout.php', '', 'Sair');
    $html .= '</nav>';

    return $html;
}

function criarPrincipal($titulo, $descricao, $cards) {
    $html = '<main>';
    $html .= '<section class="hero" id="missao">';
    $html .= '<div>';
    $html .= '<p class="etiqueta">Terror cooperativo</p>';
    $html .= '<h1>' . protegerTexto($titulo) . '</h1>';
    $html .= '<p>' . protegerTexto($descricao) . '</p>';
    $html .= '<a class="botao" href="missao.php">Ver missão</a>';
    $html .= '</div>';
    $html .= '</section>';

    $html .= '<section class="conteudo">';

    foreach ($cards as $card) {
        $html .= '<article class="card" id="' . protegerTexto($card['id']) . '">';

        if ($card['icone'] != '') {
            $html .= '<img class="card-icone" src="' . protegerTexto($card['icone']) . '" alt="">';
        }

        $html .= '<h2>' . protegerTexto($card['titulo']) . '</h2>';
        $html .= '<p>' . protegerTexto($card['texto']) . '</p>';
        $html .= '</article>';
    }

    $html .= '</section>';
    $html .= '</main>';

    return $html;
}

function criarConteudosPesquisa() {
    return [
        [
            'titulo' => 'Início',
            'descricao' => 'Página inicial do site R.E.P.O com informações sobre coleta, equipe e sobrevivência.',
            'url' => 'index.php',
            'imagem' => 'img/android.png',
            'palavras' => 'home começo inicial repo jogo'
        ],
        [
            'titulo' => 'Coleta',
            'descricao' => 'Entre no local e procure itens valiosos para completar a missão.',
            'url' => 'index.php#coleta',
            'imagem' => 'img/coleta.png',
            'palavras' => 'itens dinheiro objeto valor loot procurar'
        ],
        [
            'titulo' => 'Equipe',
            'descricao' => 'Jogue em grupo e carregue os objetos junto com outros jogadores.',
            'url' => 'index.php#equipe',
            'imagem' => 'img/equipe.png',
            'palavras' => 'time grupo amigos coop cooperativo jogadores'
        ],
        [
            'titulo' => 'Sobrevivência',
            'descricao' => 'Cuidado com os monstros e volte para a van antes que seja tarde.',
            'url' => 'index.php#perigo',
            'imagem' => 'img/sobrevivencia.png',
            'palavras' => 'monstro fugir van perigo medo'
        ],
        [
            'titulo' => 'Missão',
            'descricao' => 'Veja os objetivos principais da missão e como sobreviver durante a partida.',
            'url' => 'missao.php',
            'imagem' => 'img/coleta.png',
            'palavras' => 'objetivo missão tarefa campanha'
        ],
        [
            'titulo' => 'Perigo',
            'descricao' => 'Conheça os riscos da exploração e os cuidados necessários para escapar.',
            'url' => 'perigo.php',
            'imagem' => 'img/sobrevivencia.png',
            'palavras' => 'risco ameaça criatura dano alerta'
        ],
        [
            'titulo' => 'Login',
            'descricao' => 'Entre na sua conta para acessar a área privada do site.',
            'url' => 'login.php',
            'imagem' => 'img/android.png',
            'palavras' => 'entrar conta usuário senha acesso'
        ],
        [
            'titulo' => 'Cadastro',
            'descricao' => 'Crie uma conta nova para usar as funcionalidades do site.',
            'url' => 'cadastro.php',
            'imagem' => 'img/equipe.png',
            'palavras' => 'registrar criar conta novo usuário'
        ]
    ];
}

function normalizarPesquisa($texto) {
    $texto = strtolower($texto);

    return strtr($texto, [
        'á' => 'a',
        'à' => 'a',
        'ã' => 'a',
        'â' => 'a',
        'é' => 'e',
        'ê' => 'e',
        'í' => 'i',
        'ó' => 'o',
        'õ' => 'o',
        'ô' => 'o',
        'ú' => 'u',
        'ç' => 'c'
    ]);
}

function calcularPontuacaoPesquisa($conteudo, $termo) {
    $pontuacao = 0;
    $termo = normalizarPesquisa($termo);
    $titulo = normalizarPesquisa($conteudo['titulo']);
    $descricao = normalizarPesquisa($conteudo['descricao']);
    $palavras = normalizarPesquisa($conteudo['palavras']);

    if (stripos($titulo, $termo) !== false) {
        $pontuacao += 3;
    }

    if (stripos($descricao, $termo) !== false) {
        $pontuacao += 2;
    }

    if (stripos($palavras, $termo) !== false) {
        $pontuacao += 1;
    }

    return $pontuacao;
}

function pesquisarNoSite($termo) {
    $termo = trim($termo);

    if ($termo == '') {
        return [];
    }

    $resultados = [];
    $conteudos = criarConteudosPesquisa();

    foreach ($conteudos as $conteudo) {
        $pontuacao = calcularPontuacaoPesquisa($conteudo, $termo);

        if ($pontuacao > 0) {
            $conteudo['pontuacao'] = $pontuacao;
            $resultados[] = $conteudo;
        }
    }

    usort($resultados, function ($a, $b) {
        return $b['pontuacao'] - $a['pontuacao'];
    });

    return $resultados;
}

function criarFormularioPesquisa($termo = '', $destino = 'google') {
    $html = '<form class="formulario-pesquisa" action="pesquisa.php" method="get">';
    $html .= '<input type="search" name="q" placeholder="Pesquisar no navegador" value="' . protegerTexto($termo) . '">';
    $html .= '<div class="opcoes-pesquisa">';
    $html .= '<select name="destino">';
    $html .= '<option value="google"';

    if ($destino == 'google') {
        $html .= ' selected';
    }

    $html .= '>Google</option>';
    $html .= '<option value="pinterest"';

    if ($destino == 'pinterest') {
        $html .= ' selected';
    }

    $html .= '>Pinterest</option>';
    $html .= '</select>';
    $html .= '<button class="botao" type="submit">Pesquisar</button>';
    $html .= '</div>';
    $html .= '</form>';

    return $html;
}

function criarTiposPesquisa($termo, $tipoAtual) {
    $urlGoogle = 'pesquisa.php?tipo=google&q=' . urlencode($termo);
    $urlPinterest = 'pesquisa.php?tipo=pinterest&q=' . urlencode($termo);

    $html = '<div class="tipos-pesquisa">';
    $html .= '<a href="' . protegerTexto($urlGoogle) . '"';

    if ($tipoAtual == 'google') {
        $html .= ' class="ativo"';
    }

    $html .= '>Google</a>';
    $html .= '<a href="' . protegerTexto($urlPinterest) . '"';

    if ($tipoAtual == 'pinterest') {
        $html .= ' class="ativo"';
    }

    $html .= '>Pinterest</a>';
    $html .= '</div>';

    return $html;
}

function criarResultadosPesquisaGoogle($resultados) {
    $html = '<div class="resultados-pesquisa">';

    foreach ($resultados as $resultado) {
        $html .= '<article class="resultado-pesquisa">';
        $html .= '<a href="' . protegerTexto($resultado['url']) . '">' . protegerTexto($resultado['titulo']) . '</a>';
        $html .= '<p>' . protegerTexto($resultado['descricao']) . '</p>';
        $html .= '<span>' . protegerTexto($resultado['url']) . '</span>';
        $html .= '</article>';
    }

    $html .= '</div>';

    return $html;
}

function criarResultadosPesquisaPinterest($resultados) {
    $html = '<div class="grade-pinterest">';

    foreach ($resultados as $resultado) {
        $html .= '<a class="pin-pesquisa" href="' . protegerTexto($resultado['url']) . '">';
        $html .= '<img src="' . protegerTexto($resultado['imagem']) . '" alt="">';
        $html .= '<strong>' . protegerTexto($resultado['titulo']) . '</strong>';
        $html .= '<p>' . protegerTexto($resultado['descricao']) . '</p>';
        $html .= '</a>';
    }

    $html .= '</div>';

    return $html;
}

function criarResultadosPesquisa($termo, $resultados, $tipo = 'google') {
    if (trim($termo) == '') {
        return '<p class="texto-apoio">Digite uma palavra para pesquisar no site.</p>';
    }

    if (count($resultados) == 0) {
        return '<p class="texto-apoio">Nenhum resultado encontrado para "' . protegerTexto($termo) . '".</p>';
    }

    $html = '<p class="texto-apoio">' . count($resultados) . ' resultado(s) encontrado(s) para "' . protegerTexto($termo) . '".</p>';

    if ($tipo == 'pinterest') {
        $html .= criarResultadosPesquisaPinterest($resultados);
    } else {
        $html .= criarResultadosPesquisaGoogle($resultados);
    }

    return $html;
}

function criarRodape($texto = '') {
    if ($texto == '') {
        $texto = 'Página desenvolvida durante o aprendizado de funções em PHP.';
    }

    $html = '<footer class="rodape">';
    $html .= '<p>&copy; ' . date('Y') . ' R.E.P.O</p>';
    $html .= '<p>' . protegerTexto($texto) . '</p>';
    $html .= '</footer>';

    return $html;
}

function linkAtivo($pagina = '') {
    $paginaAtual = basename($_SERVER['PHP_SELF']);

    if ($paginaAtual == $pagina) {
        return ' class="ativo"';
    }

    return '';
}

function criarLinkMenu($pagina, $icone, $nome) {
    $html = '<a href="' . protegerTexto($pagina) . '"' . linkAtivo($pagina) . '>';

    if ($icone != '') {
        $html .= '<span class="icone">' . protegerTexto($icone) . '</span>';
    }

    $html .= protegerTexto($nome);
    $html .= '</a>';

    return $html;
}

function estaLogado() {
    return isset($_SESSION['usuario_email']);
}

function caminhoArquivoUsuarios() {
    return __DIR__ . '/usuarios.json';
}

function buscarUsuarios() {
    if (!file_exists(caminhoArquivoUsuarios())) {
        return [];
    }

    $conteudo = file_get_contents(caminhoArquivoUsuarios());
    $usuarios = json_decode($conteudo, true);

    if ($usuarios == null) {
        return [];
    }

    return $usuarios;
}

function guardarUsuarios($usuarios) {
    $json = json_encode($usuarios, JSON_PRETTY_PRINT);
    file_put_contents(caminhoArquivoUsuarios(), $json, LOCK_EX);
}

function salvarLogin($nome, $email) {
    $_SESSION['usuario_nome'] = $nome;
    $_SESSION['usuario_email'] = $email;
}

function validarSenhaForte($senha) {
    if (strlen($senha) < 8) {
        return 'A senha precisa ter pelo menos 8 caracteres.';
    }

    if (!preg_match('/[A-Z]/', $senha)) {
        return 'A senha precisa ter pelo menos uma letra maiúscula.';
    }

    if (!preg_match('/[a-z]/', $senha)) {
        return 'A senha precisa ter pelo menos uma letra minúscula.';
    }

    if (!preg_match('/[0-9]/', $senha)) {
        return 'A senha precisa ter pelo menos um número.';
    }

    if (!preg_match('/[^a-zA-Z0-9]/', $senha)) {
        return 'A senha precisa ter pelo menos um caractere especial.';
    }

    return '';
}

function senhaEstaCriptografada($senha) {
    $informacoes = password_get_info($senha);

    return $informacoes['algo'] != 0;
}

function senhaConfere($senhaDigitada, $senhaSalva) {
    if (senhaEstaCriptografada($senhaSalva)) {
        return password_verify($senhaDigitada, $senhaSalva);
    }

    return hash_equals($senhaSalva, $senhaDigitada);
}

function cadastrarUsuario($nome, $email, $senha) {
    $nome = trim($nome);
    $email = strtolower(trim($email));

    if ($nome == '' || $email == '' || $senha == '') {
        return 'Preencha todos os campos.';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return 'Digite um e-mail válido.';
    }

    $erroSenha = validarSenhaForte($senha);

    if ($erroSenha != '') {
        return $erroSenha;
    }

    $usuarios = buscarUsuarios();

    foreach ($usuarios as $usuario) {
        if (strtolower($usuario['email']) == $email) {
            return 'Este e-mail já está cadastrado.';
        }
    }

    $novoUsuario = [
        'nome' => $nome,
        'email' => $email,
        'senha' => password_hash($senha, PASSWORD_DEFAULT)
    ];

    $usuarios[] = $novoUsuario;
    guardarUsuarios($usuarios);
    salvarLogin($nome, $email);

    return '';
}

function fazerLogin($email, $senha) {
    $email = strtolower(trim($email));
    $usuarios = buscarUsuarios();

    foreach ($usuarios as $indice => $usuario) {
        if (strtolower($usuario['email']) == $email && senhaConfere($senha, $usuario['senha'])) {
            if (!senhaEstaCriptografada($usuario['senha'])) {
                $usuarios[$indice]['senha'] = password_hash($senha, PASSWORD_DEFAULT);
                guardarUsuarios($usuarios);
            }

            salvarLogin($usuario['nome'], $usuario['email']);
            return '';
        }
    }

    return 'E-mail ou senha inválidos.';
}

function sairDoSite() {
    session_destroy();
}

?>
