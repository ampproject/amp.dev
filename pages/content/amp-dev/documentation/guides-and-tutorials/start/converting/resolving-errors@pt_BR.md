---
'$title': Corrigir erros de validação
$order: 2
description: Nesta seção, analisaremos e resolveremos os erros de validação de AMP na nossa página AMP.  Esses erros podem aparecer em outra ordem no seu console.
---

Nesta seção, analisaremos e resolveremos os erros de validação de AMP na nossa página AMP. Esses erros podem aparecer em outra ordem no seu console.

## Incluir charset

Para começar, corrigiremos o seguinte erro:

<pre class="error-text">
The mandatory tag 'meta charset=utf-8' is missing or incorrect.
</pre>

Para que o texto seja exibido corretamente, é necessário especificar o charset das páginas AMP. As informações do meta charset também precisam ser o primeiro filho da tag `<head> `. Essa tag precisa ser a primeira para evitar a reinterpretação de conteúdo adicionado antes da tag meta charset.

**Adicione** o código a seguir como a primeira linha da tag `<head>`:

```html
<meta charset="utf-8" />
```

**Salve** o arquivo e atualize a página. Verifique se o erro de charset ainda ocorre.

## Incluir link canônico

Agora, veja este erro:

<pre class="error-text">
The mandatory tag 'link rel=canonical' is missing or incorrect.
</pre>

Todo documento AMP precisa ter um link que faça referência à respectiva versão "canônica". Veja mais sobre o que é uma página canônica e quais são as diferentes abordagens para vincular o conteúdo canônico na etapa deste tutorial sobre [como fazer com que a página seja detectável](discoverable.md).

Neste tutorial, o artigo HTML original que estamos convertendo será a página canônica.

**Adicione** o código a seguir à tag `<meta charset="utf-8" />`:

```html
<link rel="canonical" href="/article.html" />
```

[tip type="note"] É possível criar uma página AMP canônica independente. Nesse caso, o link canônico ainda é necessário, mas precisa levar ao próprio artigo AMP:

```html
<link rel="canonical" href="article.amp.html" />
```

[/tip]

Agora, **atualize** a página. Embora ainda haja muitos erros para corrigir, o erro do link canônico não está mais presente.

## Especificar o atributo AMP

A AMP exige um atributo no elemento raiz `<html>` das páginas para declarar que elas são documentos AMP.

<pre class="error-text">
The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'
The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.
</pre>

Para corrigir os erros acima, basta adicionar o atributo `⚡` à tag `<html>` da seguinte forma:

```html
<html ⚡ lang="en"></html>
```

Agora, atualize a página e verifique se os erros desapareceram.

[tip type="note"] A abordagem recomendada é especificar `⚡`, mas também é possível usar o atributo `amp` no lugar do atributo `⚡`. Veja este exemplo:

```html
<html amp lang="en"></html>
```

[/tip]

## Especificar uma janela de visualização

Agora, vejamos o seguinte erro:

<pre class="error-text">
The mandatory tag 'meta name=viewport' is missing or incorrect.
</pre>

A AMP exige a definição de `width` e `minimum-scale` para a janela de visualização. Esses valores precisam ser definidos como `device-width` e `1`, respectivamente. A janela de visualização é uma tag comum incluída no elemento `<head>` de uma página HTML.

Para corrigir o erro na janela de visualização, adicione o seguinte snippet HTML à tag `<head>`:

```html
<meta name="viewport" content="width=device-width" />
```

Os valores especificados para `width` e `minimum-scale` são obrigatórios na AMP. A definição de `initial-scale` não é obrigatória, mas é recomendada e costuma ser incluída no desenvolvimento da Web para dispositivos móveis. Leia mais sobre a janela de visualização e o design responsivo em [Defina a janela de visualização](https://developers.google.com/speed/docs/insights/ConfigureViewport).

Assim como antes, **atualize** a página e verifique se o erro desapareceu.

## Substituir folhas de estilo externas

O erro a seguir está relacionado com o uso de folhas de estilo:

<pre class="error-text">
The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.
</pre>

Especificamente, este erro se refere à seguinte tag de link da folha de estilo na tag `<head>`:

```html
<link href="base.css" rel="stylesheet" />
```

O problema é que essa é uma referência de folha de estilo externa. Na AMP, para carregar documentos com a maior velocidade possível, não inclua folhas de estilo externas. Em vez disso, todas as regras de folha de estilo precisam ser adicionadas in-line ao documento AMP usando as tags `<style amp-custom></ style>`.

```html
<style amp-custom>
  /* The content from base.css */
</style>
```

Então, corrija o erro:

1. **Remova** a tag `<link>` que direciona para a folha de estilo na tag `<head>` e a substitua por uma tag in-line `<style amp-custom></style>`. O atributo `amp-custom` na tag de estilo é obrigatório.
2. **Copie** todos os estilos do arquivo [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) para as tags `<style amp-custom></style>`.

Mais uma vez, **atualize** a página e verifique se o erro das folhas de estilo desapareceu.

Observação: O estilo in-line é obrigatório. Além disso, há um limite de tamanho de arquivo de 50 kilobytes para todas as informações de estilo. Use pré-processadores de CSS, como o [SASS](http://sass-lang.com/) (em inglês), para reduzir o CSS antes de realizar a inserção in-line dele nas páginas AMP.

Importante: É possível ter somente uma tag de estilo em todo o documento AMP. Se várias folhas de estilo externas forem referenciadas pelas páginas AMP, será necessário agrupá-las em um único conjunto de regras. Para saber quais regras de CSS são válidas na AMP, leia [CSS compatível](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Excluir JavaScript de terceiros

É relativamente fácil alterar as folhas de estilo inserindo CSS in-line, mas isso não se aplica ao JavaScript.

<pre class="error-text">
The tag 'script' is disallowed except in specific forms.
</pre>

Em geral, os scripts só são permitidos na AMP quando cumprem dois requisitos principais:

1. Todo JavaScript precisa ser assíncrono (ou seja, incluir o atributo `async` na tag de script).
2. O JavaScript é para a biblioteca AMP e para qualquer componente AMP na página.

Isso exclui efetivamente o uso de todo JavaScript gerado por usuários/terceiros na AMP, exceto no caso indicado abaixo.

[tip type="note"] As únicas exceções à restrição a scripts gerados por usuários/terceiros são:

1. Scripts que adicionam metadados à página ou configuram componentes AMP: terão o atributo de tipo `application/ld+json` ou `application/json`.
2. Scripts incluídos em iframes: só inclua JavaScript em um iframe em último caso. Sempre que possível, substitua os recursos JavaScript usando os [Componentes AMP](../../../../documentation/components/index.html). Veremos nosso primeiro componente AMP na próxima seção. [/tip]

Tente abrir o arquivo externo [`base.js`] (https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js). O que você vê? O arquivo deverá estar vazio, sem qualquer código JavaScript, e incluir apenas um comentário com informações como esta:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Considerando que esse arquivo JavaScript externo não é um componente funcional do site, é possível remover a referência inteira com segurança.

**Remova** a seguinte referência externa de JavaScript do documento:

```html
<script type="text/javascript" src="base.js"></script>
```

Agora, **atualize** a página e verifique se o erro do script desapareceu.

## Incluir CSS padrão da AMP

Os seguintes erros se referem à ausência de código boilerplate:

<pre class="error-text">
The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.
The mandatory tag 'head > style : boilerplate' is missing or incorrect.
The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.
</pre>

Todo documento AMP exige o seguinte código boilerplate correspondente:

```html
<style amp-boilerplate>
  body {
    -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
    animation: -amp-start 8s steps(1, end) 0s 1 normal both;
  }
  @-webkit-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-moz-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-ms-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @-o-keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }
  @keyframes -amp-start {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
    }
  }</style
><noscript
  ><style amp-boilerplate>
    body {
      -webkit-animation: none;
      -moz-animation: none;
      -ms-animation: none;
      animation: none;
    }
  </style></noscript
>
```

**Adicione** o código boilerplate à parte inferior da tag `<head>` do documento.

Inicialmente, a tag `<style amp-boilerplate>` oculta o conteúdo do corpo até que a biblioteca JavaScript da AMP seja carregada. Em seguida, o conteúdo é renderizado. Isso acontece nas AMP para evitar a renderização de conteúdo sem estilo, também conhecida como Flash Of Unstyled Content (FOUC). Isso ajuda a garantir que a experiência do usuário seja realmente instantânea, porque o conteúdo da página é exibido de uma só vez e tudo acima da dobra é renderizado em conjunto. A segunda tag inverterá essa lógica se o JavaScript estiver desativado no navegador.

## Substituir`<img>` por `<amp-img>`

A AMP não é compatível com os elementos HTML padrão correspondentes à exibição de mídia, o que explica este erro:

<pre class="error-text">
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
</pre>

A AMP tem um componente Web criado especificamente para substituir a tag `<img>`, a tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Substitua** a tag `<img>` pela tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) acima e repita a validação. Vários novos erros serão exibidos:

<pre class="error-text">
Layout not supported: container
The implied layout 'CONTAINER' is not supported by tag 'amp-img'.
</pre>

Por que o `amp-img` acionou outro erro? Porque `amp-img` não é um substituto direto da tag HTML img tradicional. Existem requisitos adicionais ao usar o `amp-img`.

### Sistema de layout AMP

O erro de layout informa que `amp-img` não é compatível com o tipo de layout `container`. Um dos conceitos mais importantes do design da AMP é o foco na redução do reflow de DOM necessário para renderizar páginas da Web.

A fim de reduzir o reflow de DOM, a AMP inclui um sistema para garantir que o layout da página seja identificado o quanto antes no ciclo de vida de download e renderização da página.

A imagem abaixo faz uma comparação entre o layout normal de uma página HTML com a abordagem aplicada pela AMP. Observe na abordagem à esquerda como o texto faz reflow toda vez que um anúncio ou imagem é carregado. A abordagem da AMP para o layout evita que o texto se mova, mesmo que as imagens e os anúncios demorem muito para serem carregados.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="Comparação entre o layout normal do conteúdo e a abordagem da AMP") }}

O sistema de layout AMP permite que os elementos da página sejam posicionados e dimensionados de várias maneiras: dimensões fixas, design responsivo, altura fixa e muito mais.

No caso do nosso artigo, o sistema de layout inferiu que o layout de `amp-img` é do tipo `container`. No entanto, o tipo `container` só é aplicável a elementos que tenham elementos filhos. O tipo `container` é incompatível com a tag `amp-img`, o que causa esse erro.

Por que o tipo `container` foi inferido? Porque não especificamos um atributo `height` para a tag `amp-img`. No HTML, sempre especifique largura e altura fixas para os elementos da página a fim de reduzir o reflow. Na AMP, é necessário definir a largura e a altura dos elementos do <a href="../../../../documentation/components/reference/amp-img.md" data-md-type="link">`amp-img`</a> para que a AMP possa predeterminar a proporção do elemento.

**Adicione** `width` e `height` à tag [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) da seguinte forma:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Atualize a página e verifique o validador, que não deverá exibir mais erros.

Agora você tem um documento AMP válido, mas a imagem está posicionada na página de uma maneira estranha. Por padrão, quando você especificar a altura e a largura de um [`amp-img`](../../../../documentation/components/reference/amp-img.md), a AMP corrigirá as dimensões fornecidas. Mas não seria ótimo se a AMP dimensionasse a imagem para se estender de maneira _responsiva_ e se ajustar à página independentemente do tamanho da tela?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="A imagem não é responsiva.") }}

Mesmo assim, a AMP consegue determinar a proporção dos elementos com base na largura e na altura especificadas. Isso permite que o sistema de layout AMP posicione e dimensione o elemento de diversas maneiras. O atributo `layout` informa à AMP como você quer que o elemento seja posicionado e dimensionado.

**Defina** o atributo layout como `responsive` para que a imagem seja redimensionada:

```html
<amp-img
  src="mountains.jpg"
  layout="responsive"
  width="266"
  height="150"
></amp-img>
```

Pronto! A imagem está na proporção correta e preenche responsivamente a largura da tela.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Agora a imagem é responsiva!") }}

Leia mais: Saiba mais sobre o sistema de layout AMP na [especificação de layout AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

## Pronto!

O documento AMP será parecido com isto:

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

Atualize a página e observe o resultado do console. Você verá a seguinte mensagem:

<pre class="success-text">
AMP validation successful.
</pre>

### Perguntas frequentes

- [O que é o reflow DOM?](http://stackoverflow.com/a/27637245)
- [O que acontece se o atributo layout não estiver especificado?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [O que acontece se largura e a altura não estiverem definidas?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
