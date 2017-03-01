---
$title: Criar páginas AMP responsivas
toc: true
---

É muito fácil gerar elementos responsivos nas AMP.
Basta incluir `layout=responsive` neles.

[TOC]

## Criar imagens responsivas

Todos os recursos que são carregados externamente, incluindo as imagens,
precisam ter um tamanho e uma posição previamente especificados
para que a página não "pule" nem passe por refluxo.

Crie imagens responsivas
especificando a largura e altura,
ajustando o layout para o modo responsivo
e indicando com [`srcset`](/docs/guides/responsive/style_pages.html)
qual recurso de imagem será usado conforme diferentes tamanhos de tela:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

O elemento `amp-img` ajusta-se automaticamente à largura
do seu elemento contêiner,
e sua altura é automaticamente definida para a proporção
determinada pela largura e altura fornecidas:

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857" layout="responsive"></amp-img>

Veja também [AMP pelo amp-img de exemplo](https://ampbyexample.com/components/amp-img/).

## Adicionar estilos a uma página

Adicione todos os estilos dentro da tag `<style amp-custom>`
no cabeçalho do documento.
Por exemplo:

[sourcecode:html]
<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html" >
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
[/sourcecode]

**Importante:**
Certifique-se de que haja só uma tag `<style amp-custom>` na sua página,
pois a AMP não permite mais de uma delas.

Defina os estilos dos componentes com os seletores de classe ou elemento
usando as propriedades comuns de CSS. Por exemplo:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**Importante:**
Verifique se seus estilos são compatíveis com AMP.
Alguns estilos não têm suporte por conta do desempenho deles
(veja também [CSS com suporte](/docs/guides/responsive/style_pages.html)).

## Elementos de tamanho e posição

A AMP desacopla o layout do documento do carregamento de recursos
para que ela possa carregar o layout da página sem ter que esperar pelo download dos recursos.

Especifique o tamanho e a posição de todos os elementos visíveis da AMP,
fornecendo um atributo `width` e `height`.
Esses atributos implicam a proporção do elemento,
o que pode ser dimensionado de acordo com o contêiner.

Defina o layout como responsivo.
Isso redimensiona o elemento de acordo com a largura do seu elemento contêiner e redimensiona a sua altura automaticamente de acordo com a proporção determinada pelos atributos de largura e altura.

Saiba mais sobre [layouts compatíveis com AMP](/docs/guides/responsive/control_layout.html).

## Validar seus estilos e layout

Use o validador de AMP para testar
os valores de CSS e layout da sua página.

O validador confere se a CSS da sua página não ultrapassa o limite de 50.000 bytes,
verifica a existência de estilos não permitidos e garante que o layout da página seja compatível e esteja formatado corretamente.
Veja também esta lista completa de [erros de estilo e layout](/docs/reference/validation_errors.html#style-and-layout-errors).

Exemplo de erro no console em uma página com CSS que ultrapassa o limite de 50.000 bytes:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Saiba mais sobre como [validar suas páginas AMP](/docs/guides/validate.html),
incluindo como rastrear e corrigir erros de estilo.
