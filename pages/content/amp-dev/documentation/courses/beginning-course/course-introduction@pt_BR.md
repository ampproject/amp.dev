---
$title: Introdução do Curso
$order: 2
leveled: true
---

[filter level="beginner"]

## Para quem é este curso?

Este curso é projetado para aspirantes a desenvolvedores web iniciantes e desenvolvedores experientes que procuram construir sites de alto desempenho. Ao longo deste e dos seguintes cursos, você irá:

- Conhecer as diferenças entre as páginas AMP e os sites tradicionais.

- Criar incrementalmente um projeto de exemplo usando componentes AMP reais e boas práticas.

- Aprender estratégias para construir sites modernos.

## Pré-requisitos

Para obter o máximo desses cursos, você deve ter um conhecimento básico de HTML e CSS. É suficiente ser capaz de reconhecer o código HTML e CSS, e ser capaz de fazer pequenos acréscimos e alterações conforme as instruções dos exercícios. Entenda que ensinar esses conceitos está além do escopo deste curso. Se necessário, você pode encontrar um reforço sobre HTML [aqui](https://developer.mozilla.org/pt-BR/docs/Web/HTML) e sobre CSS [aqui](https://developer.mozilla.org/pt-BR/docs/Web/CSS).

## Siga o código do curso com Glitch

Para completar os exemplos de código incluídos nestes cursos, estaremos usando <a href="https://glitch.com/" target="_blank">Glitch</a>. Glitch é um editor de código online que permite criar e visualizar sites sem a necessidade de instalar nada no seu computador. Também permite que você crie um servidor, tudo dentro da interface do Glitch.

O ambiente do editor de código Glitch se parece com este:

{{ image('/static/img/courses/beginner/image13.png', 926, 517,  align='center', caption='O editor online do Glitch') }}

A caixa vermelha acima indica o editor online onde você digitará HTML e CSS. A caixa verde indica o botão que o levará para a versão online da página que você está criando. A caixa amarela é o botão que permite criar uma cópia deste projeto e editá-lo. A caixa azul indica os arquivos que você tem disponíveis. Na pasta de assets, você pode encontrar suas imagens.

Ao longo desses cursos, você precisará de várias imagens para completar os exercícios. Todas as imagens de que você precisa para concluir esses cursos estão contidas em nossos projetos Glitch. Para visualizar as imagens em seu projeto, clique na entrada de ativos na lista de arquivos no lado esquerdo do editor de Glitch. Para obter o link de qualquer imagem, selecione a imagem na lista de ativos no lado direito. Clique no botão “copiar” ao lado do URL no pop-up que aparece. Você pode usar esse link em qualquer lugar em que uma imagem seja necessária.

{{ image('/static/img/courses/beginner/image8.png', 843, 468,  align='center', caption='A visualização de ativos no Glitch') }}

{{ image('/static/img/courses/beginner/image12.png', 371, 354,  align='center', caption='O pop-up de detalhes (incluindo URL) para uma imagem na coleção de ativos') }}

Neste curso, começaremos com uma página HTML básica. Criamos um projeto vazio no Glitch contendo algumas imagens, o código do servidor que você precisará mais tarde e um arquivo index.html com um título e uma única imagem.

Abra <a href="https://glitch.com/edit/#!/nosy-leech" target="_blank">esse projeto</a> para começar. Clique no botão “Remix to edit” no lado superior direito para criar um novo projeto que você pode editar. Você pode continuar a usar este editor para este e futuros cursos. Cada curso futuro também lhe dará a oportunidade de começar com uma versão de referência da solução até aquele ponto.

Você não precisa usar o Glitch para concluir esses treinamentos. No entanto, parte do código necessário para completar os exercícios está contido apenas nos exemplos de Glitch. Se desejar usar outro editor, ainda pode ser necessário usar os exemplos de Glitch para encontrar este código.

## Configurando o AMP Validator <a name="setting-up-the-amp-validator"></a>

Para detectar erros em nossas páginas AMP, temos uma ferramenta valiosa ao nosso alcance: o validador de AMP. Escrever páginas AMP válidas é a chave para acessar todos os benefícios do framework. O validador de AMP pode ser acessado de duas maneiras: por meio de uma extensão do Chrome ou adicionando um parâmetro ao nosso URL para que nossa página AMP use o validador integrado. Para os fins deste curso, sugerimos que você use a extensão do Chrome, pois é mais fácil de usar e acessar enquanto você constrói seu site.

- Para instalar a extensão do Chrome, visite o link [aqui](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc/related?hl=pt_br).

- Para usar o validador de AMP integrado, adicione `#development=1` no final do URL da página AMP e abra o console do desenvolvedor em seu navegador para ver os resultados. Você não precisa adicionar esse parâmetro se estiver usando a extensão do Chrome.

## O que vamos construir

Ao longo de nossos três cursos, você construirá um site para a Loja de Bicicletas de Queijo do Chico. O Chico desenvolveu uma bicicleta revolucionária feita inteiramente de queijo. A demanda por bicicletas novas é tão alta que o Chico precisa criar um site o mais rápido possível. Quando terminarmos esses cursos, o site do Chico se parecerá com este:

{{ image('/static/img/courses/beginner/image14.png', 311, 550, align='center third', caption='Como irá ficar o site no final do Curso Avançado') }}

Você pode clicar neste <a href="https://nice-consonant.glitch.me/" target="_blank">link</a> para ver uma prévia on-line. Dê uma olhada no site. Temos vídeos, formulário de inscrição, carrossel de imagens e maneiras de compartilhar nosso site nas redes sociais. Abra o menu de navegação clicando no ícone formado por três linhas (também chamado de “ícone do menu de hambúrguer”) no canto superior esquerdo. Assim que o menu se expandir, clique no link “Nossos Produtos” para navegar até uma lista de produtos. Tente classificar a lista de produtos por preço e filtrar a lista de produtos por categoria de produto.

Escolhemos o site do Chico como nosso modelo porque oferece uma coleção de recursos que comumente vemos em sites populares hoje. Foi construído inteiramente em AMP. Ao longo dessas lições, você construirá este site do zero.
[/filter]
[filter level="advanced"]

## Para quem é este curso?

Este curso foi criado para desenvolvedores que desejam criar sites de alto desempenho ou simplesmente entender AMP. Todos os três cursos presumem que você conhece HTML e CSS, e os cursos intermediário e avançado presumem alguma experiência com JavaScript.

## Siga o código do curso com Glitch

Para completar os exemplos de código incluídos nestes cursos, usaremos <a href="https://glitch.com/" target="_blank"> Glitch </a>. Glitch é um editor de código online que permite criar e visualizar sites sem executar um servidor em seu computador. Em vez disso, seu servidor fica dentro do Glitch!

O ambiente do editor de código Glitch é semelhante a este:

{{ image('/static/img/courses/beginner/image13.png', 926, 517,  align='center', caption='O editor online do Glitch') }}

A caixa vermelha acima indica o editor online onde você digitará HTML e CSS. A caixa verde indica o botão que o levará para a versão online da página que você está criando. A caixa amarela é o botão que permite criar uma cópia deste projeto e editá-lo. A caixa azul indica os arquivos que você tem disponíveis. Na pasta de assets, você pode encontrar suas imagens.

Ao longo desses cursos, você precisará de várias imagens para completar os exercícios. Todas as imagens de que você precisa para concluir esses cursos estão contidas em nossos projetos Glitch. Para visualizar as imagens em seu projeto, clique na entrada de ativos na lista de arquivos no lado esquerdo do editor de Glitch. Para obter o link para qualquer imagem única, selecione a imagem na lista de ativos no lado direito. Clique no botão "copiar" ao lado do URL no pop-up que aparece. Você pode usar esse link em qualquer lugar em que uma imagem seja necessária.

{{ image('/static/img/courses/beginner/image8.png', 1686, 936,  align='center', caption='A visualização de ativos no Glitch') }}

{{ image('/static/img/courses/beginner/image12.png', 1484, 1416,  align='center', caption='O pop-up de detalhes (incluindo URL) para uma imagem na coleção de ativos') }}

Neste curso, começaremos com uma página HTML básica. Criamos um projeto vazio no Glitch contendo algumas imagens, o código do servidor que você vai precisar mais tarde e um arquivo ʻindex.html` com um título e uma imagem.

Abra <a href="https://glitch.com/edit/#!/nosy-leech" target="_blank"> este projeto </a> para começar. Clique no botão "Remix to Edit" no lado superior direito para criar um novo projeto que você possa editar. Você pode continuar a usar este editor para este e futuros cursos. Cada curso futuro também lhe dará a oportunidade de começar com uma versão de referência da solução até aquele ponto.

Você não precisa usar o Glitch para concluir esses treinamentos. No entanto, parte do código necessário para completar os exercícios está contido apenas nos exemplos de Glitch. Se desejar usar outro editor, ainda pode ser necessário usar os exemplos de Glitch para encontrar este código.

## Configurando o AMP Validator

Para detectar erros em nossas páginas AMP, temos uma ferramenta valiosa ao nosso alcance: o validador de AMP. Escrever páginas AMP válidas é a chave para acessar todos os benefícios do framework. O AMP Validator pode ser acessado de várias maneiras. Aqui estão duas das mais simples:

- Instale a extensão do Chrome [aqui] (https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc/related?hl=pt_BR.

- Simplesmente use o validador de AMP integrado. Adicione `#development=1` ao final do URL da página AMP e abra o console do desenvolvedor em seu navegador para acessar o validador.

## O que vamos construir

Ao longo de nossos três cursos, você construirá um site para a Loja de Bicicletas de Queijo do Chico. O Chico desenvolveu uma bicicleta revolucionária feita inteiramente de queijo! A demanda por bicicletas novas é tão alta que o Chico precisa criar um site o mais rápido possível. Quando terminarmos esses cursos, o site do Chico se parecerá com este:

{{ image('/static/img/courses/beginner/image14.png', 311, 550, align='center third', caption='Como irá ficar o site no final do Curso Avançado') }}

Você pode clicar <a href="https://nice-consonant.glitch.me/" target="_blank"> neste link </a> para ver uma prévia ao vivo. Escolha "Nossos Produtos" no menu para ver a página do produto.

Escolhemos o site do Chico como nosso modelo porque oferece uma coleção de recursos que comumente vemos em sites populares hoje. Foi construído inteiramente em AMP. Ao longo dessas lições, você construirá este site do zero.
[/filter]
