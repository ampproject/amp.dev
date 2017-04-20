---
$title: CSS compatível
---

Como todas as páginas da Web, as páginas AMP são estilizadas com CSS,
mas não é possível fazer referência a folhas de estilo externas
(com exceção de [fontes personalizadas](#a-exceção-das-fontes-personalizadas)).
Além disso, certos estilos não são permitidos devido a implicações de desempenho.
Os atributos de estilo in-line não são permitidos.

Todos os estilos devem estar no cabeçalho do documento
(leia [Adicionar estilos a uma página](/pt_br/docs/guides/debug/validate.html).
Contudo, você pode usar pré-processadores e modelos CSS para criar páginas estáticas
e gerenciar melhor seu conteúdo.

**Observação:**
Os componentes da AMP vêm com estilos padrão
para tornar razoavelmente fácil a criação das páginas responsivas.
Esses estilos estão definidos na [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).

[TOC]

## Uso de pré-processadores CSS

O resultado gerado pelos pré-processadores funciona na AMP tão bem como em qualquer outra página da Web.
Por exemplo, o site [ampproject.org](https://www.ampproject.org/) usa
[Sass](http://sass-lang.com/).
Nós usamos <a href="http://grow.io/">Grow</a> para criar as páginas AMP estáticas
que compõem o site [ampproject.org](https://www.ampproject.org/).

Ao usar os pré-processadores, 
dê atenção especial ao que será incluído: carregue apenas o que as suas páginas usam.
Por exemplo, [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
inclui toda a marcação de AMP necessária e a CSS in-line dos arquivos de origem `*.scss`.
Ele também inclui o script do elemento personalizado para
[`amp-youtube`](/docs/reference/extended/amp-youtube.html), entre outros,
de modo que muitas páginas em todo o site podem incluir vídeos incorporados do YouTube.

[sourcecode:html] {% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

Para ver como o conteúdo acima se traduz em um HTML de AMP formatado,
veja o código-fonte de qualquer página em [ampproject.org](https://www.ampproject.org/).
No Google Chrome, clique com o botão direito e selecione `Exibir código-fonte da página`.

## Estilos não permitidos

Os seguintes estilos não são permitidos em páginas AMP:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Estilo proibido</th>
      <th data-th="Description">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Atributos de estilo in-line</td>
      <td data-th="Description">Todos os estilos devem ser definidos no <code>&lt;head&gt;</code> da página,
      	dentro de uma tag <code>&lt;style amp-custom&gt;</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code>qualificador importante </td>
      <td data-th="Description">Uso não permitido.
      Este é um requisito necessário para permitir que a AMP coloque em vigor suas regras de dimensionamento de elementos.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">Não permitido, com exceção de <a href="#a-exceção-das-fontes-personalizadas">fontes personalizadas</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (seletor universal)</td>
      <td data-th="Description">Implicações de desempenho negativo e poderia ser usado
      para violar outras restrições de seletor.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Poderia ser usado para simular o seletor universal.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Pseudosseletores, pseudoclasses e pseudoelementos</td>
      <td data-th="Description">Pseudosseletores, pseudoclasses e pseudoelementos só são permitidos
      em seletores que contêm nomes de tags. Esses nomes de tags não podem iniciar com <code>amp-</code>.
      Exemplo correto: <code>a:hover, div:last-of-type</code>
      Exemplo incorreto: <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style">Classe <code>-amp-</code> e nomes de tags com <code>i-amp-</code></td>
      <td data-th="Description">Os nomes de classe, nas folhas de estilo de criação, podem não começar com a string <code>-amp-</code>. Estes são reservados para uso interno no tempo de execução da AMP. A folha de estilo do usuário pode não fazer referência a seletores de CSS para classes <code>-amp-</code> e tags <code>i-amp</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>, <code>-moz-binding</code></td>
      <td data-th="Description">Estas propriedades não são permitidas
      por razões de segurança.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>filter</code></td>
      <td data-th="Description">O elemento é adicionado à lista negra devido a preocupações de desempenho.</td>
    </tr>
  </tbody>
</table>

## Propriedades de transição e animação na lista de permissões

A AMP só permite transições e animações de propriedades
que podem ser aceleradas por GPU em navegadores comuns.
No momento, a lista de permissões do projeto de AMP inclui `opacity`, `transform`
e `-vendorPrefix-transform`.

Nos exemplos a seguir, `<property>` precisa estar na lista de permissões.

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

A propriedade `overflow` (incluindo `overflow-y` e `overflow-x`)
não pode ser estilizada como “auto” nem “scroll”.
Nenhum elemento definido pelo usuário em um documento de AMP pode ter uma barra de rolagem.

## A exceção das fontes personalizadas

As páginas AMP não podem incluir folhas de estilo externas, com exceção de fontes personalizadas.
Os dois métodos compatíveis para a referência a fontes personalizadas são
as tags de links que levam a fornecedores de fontes na lista de permissões e a inclusão de `@font-face`.

Os fornecedores de fontes só serão colocados na lista de permissões
se oferecerem suporte a integrações "somente CSS" e veicularem por HTTPS.
Atualmente, apenas estas origens estão na lista de permissões
e podem veicular fontes via tags de link:

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

Exemplo de tag de link que leva ao fornecedor de fontes na lista de permissões, o Google Fonts:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Como alternativa, use [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).
As fontes incluídas via `@font-face` devem ser buscadas
por meio do esquema HTTP ou HTTPS.
