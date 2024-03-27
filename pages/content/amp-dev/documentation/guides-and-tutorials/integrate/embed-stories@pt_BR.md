---
'$title': Incorpore histórias em páginas web
$order: 3
description: 'O '
formats:
  - websites
  - stories
---

Histórias são uma experiência de imersão em tela cheia. Elas são hospedadas na Web aberta com sua própria URL, tornando-as facilmente compartilháveis. Mas, e se você quiser integrar histórias em seu próprio site, por exemplo, dentro de um blog, descrição de um produto ou artigo de notícias?

O Player de Histórias AMP permite que você incorpore histórias nas quais os usuários poderão tocar ou clicar, dentro de uma página Web. Siga este guia passo-a-passo para aprender como.

# Mostre histórias em uma página não-AMP

Você pode incorporar histórias AMP dentro de uma página não-AMP, permitindo que os usuários toquem ou cliquem ao longo de sua experiência sem sair do documento!

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://ampjs.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://ampjs.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## Como incorporar o player de histórias AMP

A exibição de uma história AMP em uma página não-AMP requer o uso do elemento [`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-story-player.md) element.

### Importe scripts

Inclua os dois scripts necessários no head do seu documento:

```html
<script async src="https://ampjs.org/amp-story-player-v0.js"></script>
<link
  href="https://ampjs.org/amp-story-player-v0.css"
  rel="stylesheet"
  type="text/css"
/>
```

O primeiro script importa a lógica para o player e o segundo define o estilo padrão.

### Especifique uma história

Inclua o elemento `<amp-story-player>` dentro do `body` do documento. Em seguida, especifique a história desejada colocando uma tag `<a>` dentro do elemento `<amp-story-player>`. Aponte o `href` para a localização da história. O `href` pode apontar para a URL de uma história hospedada ou um caminho relativo. Coloque o título da história dentro das etiquetas `<a>`.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
  >
    Stories in AMP - Hello World
  </a>
</amp-story-player>
```

### Redimensione o player

Você pode definir a largura (`width`), altura (`height`) e outros estilos do player de histórias inline ou como você aplicaria qualquer estilo a outro elemento.

```html
<body>
  ...
  <amp-story-player style="width: 360px; height: 600px;">
    ...
  </amp-story-player>
  ...
</body>
```

We recommend maintaining a 3:5 aspect ratio for the best user experience, but you may define any width and height.

#### Redimensionamento responsivo

A responsividade do player de histórias funciona como qualquer outro elemento de bloco. Use CSS para manter relações de largura e altura, como no exemplo abaixo:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;"> ... </amp-story-player>
```

### Forneça um placeholder

Inclua uma imagem de pôster representativa adicionando uma tag `<img>` como filha da tag `<a>` da história com a seguinte configuração. O player de histórias AMP exibe essa imagem ao carregar a história completa.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes this story.
  </a>
</amp-story-player>
```

Para a melhor experiência do usuário, recomendamos fortemente a inclusão de uma imagem de poster. Se você não incluir uma imagem de poster, o player de histórias mostrará um spinner com fundo cinza.

## Incorpore múltiplas histórias

You may add multiple stories in the same `<amp-story-player>` element by defining multiple `<a>` tags. The player presents the second story’s cover page after user’s tap through the first.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

Você pode incorporar quantas instâncias de `<amp-story-player>` desejar. Eles são mostradas como visualizações individuais.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

# Mostre histórias em uma página AMP

Para usar o componente `<amp-story-player>` nas páginas AMP, leia a documentação da [versão AMP do amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories).
