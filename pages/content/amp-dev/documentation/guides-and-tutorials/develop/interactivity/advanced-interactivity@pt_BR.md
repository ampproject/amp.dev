---
'$title': Improving the interactivity
$order: 2
description: 'O código inicial oferece uma experiência do usuário bastante crua. Há algumas maneiras de aprimorá-lo\: - Adicionar um indicador que mostre o ...'
---

O código inicial oferece uma experiência do usuário bastante crua. Há algumas maneiras de aprimorá-lo:

- Adicionar um indicador que mostre o slide atual e o número total de slides.
- Quando o usuário selecionar uma cor diferente de camisa, mudar o carrossel de imagens para mostrar camisas na cor selecionada.

Antes da introdução do componente [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), não era possível adicionar recursos como esses. Vamos colocar o [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) em prática e adicionar esses novos recursos ao nosso código de exemplo.

## Instalar o componente `amp-bind`

O [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) é um componente AMP componente que oferece interatividade personalizada através de mapeamento de dados e expressões semelhantes a JS. Para usar [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), você precisa instalá-lo na página.

Abra o arquivo [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) (em inglês) e adicione o seguinte script à lista de componentes AMP na seção `<head>` da página:

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

## Adicionar o indicador de slide

O [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) vincula atributos de elementos a expressões personalizadas. Essas expressões podem fazer referência ao "estado" (dados JSON mutáveis). Podemos inicializar esse estado usando o componente [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) incluído com o [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

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

É possível acessar os dados dos elementos [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) usando o código associado. Por exemplo, podemos fazer referência a essa variável com o seguinte fragmento de expressão:

```javascript
selected.slide; // Avalia para 0.
```

### Atualizar o estado do slide

Em seguida, vamos atualizar essa variável quando o usuário mudar os slides no carrossel. Para isso, adicionamos a seguinte ação `"on"` ao elemento [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) existente:

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

Agora, sempre que o slide exibido em [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) mudar, a ação `AMP.setState` será chamada com o seguinte argumento:

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

A expressão `event.index` é avaliada com o novo índice de slide, e a ação `AMP.setState()` combina o literal desse objeto com o estado atual. Isso substituirá o valor atual de `selected.slide` pelo valor de `event.index`.

[tip type="tip"] <strong>DICA –</strong> `AMP.setState()` faz uma combinação direta dos literais de objetos aninhados. Para mais detalhes, consulte a documentação de [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).[/tip]

### Vincular os elementos do indicador

Em seguida, vamos usar a variável de estado que rastreia o slide exibido no momento e cria um indicador de slide. Encontre o elemento indicador de slide (procure `<!-- TODO: "Add a slide indicator" -->`) e insira os seguintes mapeamentos aos filhos dele:

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

`[class]` é um mapeamento que altera o atributo `class`. Com ele, é possível adicionar ou remover classes CSS de qualquer elemento.

**Faça um teste**: atualize a página e mude o slide.

Mudar o slide no carrossel fará o seguinte:

1. Acionará o `evento slideChange`.
2. Chamará a ação `AMP.setState`.
3. Atualizará a variável de estado `selected.slide`.
4. Atualizará o mapeamento `[class]` nos elementos `<span>` do indicador.

Muito bem! Agora o indicador de slides já está funcionando.

[tip type="success"]

Tente adicionar uma funcionalidade para que, quando o usuário tocar no ponto indicador de slide, o carrossel de imagens seja atualizado com o item selecionado. Uma dica: use o evento `tap` e o mapeamento `[slide]` em [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Mudar as imagens no carrossel

É bom ver imagens de camisas de cores diferentes quando mudamos a cor selecionada. Com o [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) podemos fazer isso vinculando `[src]` aos elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md) em [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Inicializar o estado do SKU

Primeiro, precisamos inicializar os dados de estado com as URLs de origem das imagens das camisas de cada cor. Vamos fazer isso com um elemento [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) novo:

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

Esse elemento [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) contém um objeto JSON que mapeia uma string de identificação de camisa (ou seja, um SKU) para a cor e URL da imagem da camisa correspondente. Nesse caso, também seria possível usar um array JSON, mas um objeto permite fazer outras coisas legais que você verá em breve.

Agora, podemos acessar a URL da imagem através do identificador de uma camisa. Por exemplo, `shirts['10014'].color` é avaliado como `"dark green"` (verde escuro) e `shirts['10030'].image` retorna a URL da imagem da camisa de cor `"wine"` (vinho).

### Rastrear o SKU selecionado

Ao adicionar outra variável de estado que rastreie o SKU selecionado, podemos vincular uma expressão aos elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md) para atualizar os atributos `src` correspondentes quando o SKU selecionado mudar. Adicione uma nova chave `sku` ao JSON do elemento `amp-state#selected`:

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

Adicione uma ação "on" ao [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) para atualizar a variável `selected.sku` sempre que uma cor nova for selecionada:

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] <strong>DICA –</strong> Você também pode fazer isso adicionando ações `on="tap:AMP.setState(...)` a cada elemento filho de [`amp-img`](../../../../documentation/components/reference/amp-img.md) em [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). Uma das vantagens do [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) é que ele simplifica a marcação dessa forma.[/tip]

### Vinculação de elementos de imagem

Em seguida, adicione mapeamentos aos elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img
  width="200"
  height="250"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="300"
  height="375"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="400"
  height="500"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
```

[tip type="tip"] <strong>OBSERVAÇÃO –</strong> Na prática, é provável que cada imagem do carrossel tenha um "src" diferente. Você pode fazer isto substituindo a imagem única por um array de imagens. Para simplificar, este tutorial usa uma imagem única em diferentes ampliações.[/tip]

**Faça um teste**: atualize a página e selecione uma cor de camisa diferente. Ao fazer isso, as imagens do carrossel serão atualizadas para mostrar as camisas da cor selecionada.
