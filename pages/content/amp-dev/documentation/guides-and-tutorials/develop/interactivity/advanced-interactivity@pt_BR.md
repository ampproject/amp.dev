---
$title: Aprimoramento da interatividade
---

[TOC]

O código inicial oferece uma experiência do usuário bastante crua. Há algumas maneiras de aprimorá-lo:

- Adicionar um indicador que mostre o slide atual e o número total de slides.
- Quando o usuário selecionar uma cor diferente de camisa, mudar o carrossel de imagens para mostrar camisas na cor selecionada.

Antes da introdução do componente `<amp-bind>`, não era possível adicionar recursos como esses. Vamos colocar o `<amp-bind>` em prática e adicionar esses novos recursos ao nosso código de exemplo.

## Instalar a extensão `<amp-bind>`

O [`<amp-bind>`](/pt_br/docs/reference/components/amp-bind.html) é um novo componente AMP que oferece interatividade personalizada por meio da vinculação de dados e expressões semelhantes às do JavaScript. Instale o `<amp-bind>` na página para usá-lo.

Abra o arquivo [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) (em inglês) e adicione o seguinte script à lista de componentes AMP na seção `<head>` da página:

```html
<script async custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

## Adicionar o indicador de slide

O `<amp-bind>` vincula atributos de elementos a expressões personalizadas. Essas expressões podem fazer referência ao "estado" (dados JSON mutáveis). Podemos inicializar esse estado usando o componente [`<amp-state>`](/pt_br/docs/reference/components/amp-bind.html#state) incluído com o `<amp-bind>`.

### Inicializar o estado do slide

Vamos inicializar uma variável de estado para acompanhar o índice do slide em exibição no carrossel de imagens. Abra [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) (em inglês) e adicione o código a seguir na parte superior da seção `<body>` da página (antes de `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

É possível acessar os dados dos elementos `<amp-state>` usando o código associado. Por exemplo, podemos fazer referência a essa variável com o seguinte fragmento de expressão:

```javascript
selected.slide // Avalia para 0.
```

### Atualizar o estado do slide

Em seguida, vamos atualizar essa variável quando o usuário mudar os slides no carrossel. Para isso, adicionamos a seguinte ação `"on"` ao elemento [`<amp-carousel>`](/pt_br/docs/reference/components/amp-carousel.html) existente:

```html
<amp-carousel type="slides" layout="fixed-height" height=250 id="carousel"
    on="slideChange:AMP.setState({selected: {slide: event.index}})">
```

Agora, sempre que o slide exibido em `<amp-carousel>` mudar, a ação `AMP.setState` será chamada com o seguinte argumento:

```javascript
{
  selected: {
    slide: event.index
  }
}
```

A expressão `event.index` é avaliada com o novo índice de slide, e a ação `AMP.setState()` combina o literal desse objeto com o estado atual. Isso substituirá o valor atual de `selected.slide` pelo valor de `event.index`.

Dica: `AMP.setState()` faz uma combinação direta dos literais de objetos aninhados. Para mais detalhes, consulte a documentação de [`<amp-bind>`](/pt_br/docs/reference/components/amp-bind.html).

### Vincular os elementos do indicador

Em seguida, vamos usar a variável de estado que rastreia o slide exibido no momento e cria um indicador de slide. Encontre o elemento indicador de slide (procure `<!-- TODO: "Add a slide indicator" -->`) e insira as seguintes vinculações aos filhos dele:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` é uma vinculação que altera o atributo `class`. Com ela, é possível adicionar ou remover classes CSS de qualquer elemento.

**Faça um teste**: atualize a página e mude o slide.

Mudar o slide no carrossel fará o seguinte:

1.  Acionará o `evento slideChange`.
2.  Chamará a ação `AMP.setState`.
3.  Atualizará a variável de estado `selected.slide`.
4.  Atualizará a vinculação `[class]` nos elementos `<span>` do indicador.

Muito bem! Agora o indicador de slides já está funcionando.

[tip type="success"]

Tente adicionar uma funcionalidade para que, quando o usuário tocar no ponto indicador de slide, o carrossel de imagens seja atualizado com o item selecionado. Uma dica: use o evento `tap` e a vinculação `[slide]` em [`<amp-carousel>`](/pt_br/docs/reference/components/amp-carousel.html).

[/tip]

## Mudar as imagens no carrossel

É bom ver imagens de camisas de cores diferentes quando mudamos a cor selecionada. Com o amp-bind, podemos fazer isso vinculando `[src]` aos elementos `<amp-img>` em `<amp-carousel>`.


### Inicializar o estado do SKU

Primeiro, precisamos inicializar os dados de estado com os URLs de origem das imagens das camisas de cada cor. Vamos fazer isso com um elemento `<amp-state>` novo:

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

Esse elemento `<amp-state> `contém um objeto JSON que mapeia uma string de identificação de camisa (ou seja, um SKU) para a cor e o URL da imagem da camisa correspondente. Nesse caso, também seria possível usar uma matriz JSON, mas com um objeto, podemos fazer outras coisas legais que você verá em breve.

Agora, podemos acessar o URL da imagem por meio do identificador de uma camisa. Por exemplo, `shirts['10014'].color` é avaliado como `"dark green"` (verde escuro) e `shirts['10030'].image` retorna o URL da imagem da camisa de cor `"wine"` (vinho).

### Rastrear o SKU selecionado

Ao adicionar outra variável de estado que rastreie o SKU selecionado, podemos vincular uma expressão aos elementos `<amp-img>` para atualizar os atributos `src` correspondentes quando o SKU selecionado mudar. Adicione uma nova chave `sku` ao JSON do elemento `amp-state#selected`:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### Atualizar o estado do SKU

Adicione uma ação "on" ao [`<amp-selector>`](/pt_br/docs/reference/components/amp-selector.html) para atualizar a variável `selected.sku` sempre que uma cor nova for selecionada:

```html
<amp-selector name="color"
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

Dica: Você também pode fazer isso adicionando ações `on="tap:AMP.setState(...)` a cada elemento filho de `<amp-img>` em `<amp-selector>`. Uma das vantagens do `<amp-selector>` é que ele simplifica a marcação dessa forma.

### Vinculação de elementos de imagem

Em seguida, adicione vinculações aos elementos [`<amp-img>`](/pt_br/docs/reference/components/amp-img.html) em `<amp-carousel>` (procure `<!-- TODO: "Changing images in amp-carousel-->"`):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

Observação: Na prática, é provável que cada imagem do carrossel tenha um "src" diferente. Você pode fazer isso substituindo a imagem única por uma matriz de imagens. Para simplificar, este tutorial usa uma imagem única em diferentes ampliações.

**Faça um teste**: atualize a página e selecione uma cor de camisa diferente. Ao fazer isso, as imagens do carrossel serão atualizadas para mostrar as camisas da cor selecionada.


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/get-familiar.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/remote-data.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>

