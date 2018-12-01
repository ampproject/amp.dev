---
$title: Estilo e layout
---
[TOC]

O estilo e o layout nas páginas AMP em HTML são muito semelhantes aos de páginas HTML normais. Nos dois casos, você usará CSS.

No entanto, as AMP limitam o uso de CSS por motivos de desempenho e usabilidade ao mesmo tempo em que ampliam os recursos do design responsivo com recursos como [marcadores e substitutos]({{g.doc('/content/docs/design/responsive_amp/placeholders.md', locale=doc.locale).url.path}}), [direção artística avançada por meio de srcset]({{g.doc('/content/docs/design/responsive_amp/art_direction.md', locale=doc.locale).url.path}}) e o [atributo de layout]({{g.doc('/content/docs/design/responsive_amp/control_layout.md', locale=doc.locale).url.path}}) para controlar melhor a forma que os elementos são exibidos.

Dica: É muito fácil tornar os elementos responsivos nas AMP. Simplesmente coloque `layout="responsive"` neles. Para saber mais sobre o design responsivo nas AMP, acesse [Criar páginas AMP responsivas](/pt_br/docs/design/responsive/responsive_design.html).

{{ youtube('y6kA3u3GIws', 480, 270, caption='Veja o que a equipe da UpperQuad tem a dizer sobre a reforma do site AMPproject e os desafios de usar AMP pela primeira vez.') }}

## Adicionar estilos a uma página

Adicione todos os CSS dentro de uma tag `<style amp-custom>` no cabeçalho do documento. Por exemplo:

[sourcecode:html]
<!doctype html>
<head>
  ...
  <style amp-custom>
    /* any custom styles go here. */
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
  ...
</head>
[/sourcecode]

Importante: Sua página pode ter somente uma tag `<style amp-custom>`, pois não é permitido ter mais de uma nas AMP.

Defina os estilos de componentes com seletores de classe ou elemento usando propriedades CSS comuns. Por exemplo:

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

Importante: Verifique se os seus estilos são compatíveis com as AMP. Alguns estilos não são por motivos de desempenho (veja também [CSS compatível]({{g.doc('/content/docs/design/responsive_amp/style_pages.md', locale=doc.locale).url.path}})).

## Elementos de layout responsivos

Especifique o tamanho e a posição de todos os elementos AMP visíveis fornecendo os atributos `width` e `height`. Esses atributos indicam a proporção do elemento, que pode ser dimensionado com o contêiner.

Defina o layout como responsivo. Isso dimensionará o elemento para a largura do seu elemento de contêiner e redimensionará a altura automaticamente para a proporção indicada nos atributos de largura e altura.

Leia mais: Saiba mais sobre [os layouts compatíveis com as AMP]({{g.doc('/content/docs/design/responsive_amp/control_layout.md', locale=doc.locale).url.path}})

## Use marcadores e substitutos

A compatibilidade interna com marcadores e substitutos permite que seus usuários nunca precisem olhar novamente para uma tela em branco.

Leia mais: Saiba mais sobre [Marcadores e substitutos]({{g.doc('/content/docs/design/responsive_amp/placeholders.md', locale=doc.locale).url.path}})

## Seja o diretor de arte das suas imagens

As AMP são compatíveis com os atributos `srcset` e `sizes` para que você tenha controle preciso sobre as imagens que serão carregadas em cada cenário.

Leia mais: Saiba mais sobre [a direção artística com srcset e tamanhos]({{g.doc('/content/docs/design/responsive_amp/art_direction.md', locale=doc.locale).url.path}})

## Validar seus estilos e layout

Use o validador de AMP para testar o CSS e os valores de layout da sua página.

O validador confirma se o CSS da sua página não ultrapassa o limite de 50 mil bytes, verifica os estilos desativados e garante que o layout da página seja compatível e formatado corretamente. Veja também esta lista completa de [erros de estilo e layout](/pt_br/docs/troubleshooting/validation_errors.html#style-and-layout-errors).

Exemplo de erro no console de uma página com CSS que ultrapassa o limite de 50 mil bytes:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Leia mais: Saiba mais sobre como [validar e corrigir suas páginas AMP]({{g.doc('/content/docs/fundamentals/validate.md', locale=doc.locale).url.path}})
