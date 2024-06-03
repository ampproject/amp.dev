---
$title: CSS compatível
---

Assim como todas as páginas da Web, as páginas AMP são estilizadas com CSS. Contudo, não é possível fazer referência a folhas de estilos externas (exceto [fontes personalizadas](#the-custom-fonts-exception)). Além disso, alguns estilos não são permitidos devido ao impacto que têm no desempenho. Por exemplo, os atributos de estilo in-line.

Todos os estilos precisam estar no cabeçalho do documento (veja [Adicionar estilos a uma página](index.md#add-styles-to-a-page)). É possível usar pré-processadores e modelos CSS para criar páginas estáticas e gerenciar melhor seu conteúdo.

Observação: Os componentes das AMP possuem estilos padrão para facilitar a criação de páginas responsivas. Esses estilos estão definidos em [`amp.css`](https://github.com/ampproject/amphtml/blob/main/css/amp.css).

## Estilos não permitidos

Os estilos a seguir não são permitidos em páginas AMP:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Estilo banido</th>
      <th data-th="Description">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Atributos de estilo in-line</td>
      <td data-th="Description"> Todos os estilos precisam ser definidos no <code>&lt;head&gt;</code> da página, na tag <code>&lt;style amp-custom&gt;</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Qualificador <code>!important</code></td>
      <td data-th="Description">O uso não é permitido. Este é um requisito necessário para permitir que as AMP executem suas regras de dimensionamento de elementos.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description"> Não são permitidos, exceto <a href="#the-custom-fonts-exception">fontes personalizadas</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Classe <code>-amp-</code> e nomes de tags <code>i-amp-</code></td>
      <td data-th="Description"> Nas folhas de estilo do autor, os nomes de classe não podem iniciar com a string <code>-amp-</code>. Estas strings são reservadas para uso interno no tempo de execução das AMP. A folha de estilo do usuário não pode fazer referência a seletores de CSS para classes <code>-amp-</code> e tags <code>i-amp</code>.</td>
    </tr>
  </tbody>
</table>

## Estilos restritos

Os estilos a seguir são permitidos. Contudo, há restrições em relação à compatibilidade deles com alguns valores:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Estilo restrito</th>
      <th data-th="Description">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style">Propriedade <code>transition</code></td>
      <td data-th="Description"> Somente propriedades aceleradas por GPU (no momento <code>opacity</code>, <code>transform</code> e <code>-vendorPrefix-transform</code>).</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description"> Somente propriedades aceleradas por GPU (no momento <code>opacity</code>, <code>transform</code> e <code>-vendorPrefix-transform</code>).</td>
    </tr>
  </tbody>
</table>

## Exceção: fontes personalizadas <a name="the-custom-fonts-exception"></a>

As páginas AMP não podem incluir folhas de estilos externas, exceto fontes personalizadas.

Continue lendo: Saiba mais sobre [fontes personalizadas nas AMP](custom_fonts.md).

## Como usar pré-processadores de CSS <a name="using-css-preprocessors"></a>

O resultado gerado pelos pré-processadores é tão bom nas AMP como em qualquer outra página da Web. Por exemplo, o site [amp.dev](https://amp.dev/) usa [Sass](http://sass-lang.com/). Usamos [Grow](http://grow.io/) para criar as páginas AMP estáticas que compõem o site [amp.dev](https://amp.dev/).

Tome cuidado com o que você inclui ao usar os pré-processadores. Carregue somente aquilo que as páginas usam. Por exemplo, [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) inclui toda a marcação das AMP necessária e a CSS in-line dos arquivos de origem `*.scss`. Isso também inclui o script do elemento personalizado para [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), entre outros, fazendo com que diversas páginas do site possam incluir vídeos incorporados do YouTube.

[sourcecode:html]{% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>Projeto de AMP</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet">
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
{% endraw %}[/sourcecode]

Para ver como o conteúdo acima se traduz em uma AMP em HTML formatada, veja a fonte de qualquer página em [amp.dev](https://amp.dev/). (No Chrome, clique com o botão direito e `View Page Source`).
