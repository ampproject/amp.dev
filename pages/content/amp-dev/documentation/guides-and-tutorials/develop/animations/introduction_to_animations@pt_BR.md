---
"$title": Introdução a animações complexas
"$order": '2'
description: Para animações que não podem ser acionadas pela adição e remoção de classes, o AMP oferece vários componentes específicos para animação. Esses componentes aplicam os princípios da AMP às animações ...
formats:
- websites
- ads
author: CrystalOnScript
---

Para animações que não podem ser [acionadas pela adição e remoção de classes](triggering_css_animations.md), o AMP oferece vários componentes específicos para animação. Esses componentes aplicam os princípios da AMP às animações: eles são rápidos, eficientes e colocam o usuário em primeiro lugar. O AMP restringe quais propriedades CSS são permitidas dentro dos keyframes, mas concede benefícios tais, como controle detalhado, animações sem interrupções e compatibilidade entre navegadores, sem trabalho adicional.

Use amp-animation quando você precisar ter controle rigoroso sobre a reprodução e temporização precisa com vários elementos animados ao mesmo tempo.

## Como criar uma animação AMP básica

O componente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) ativa o uso da [API de Animação Web](https://www.w3.org/TR/web-animations/) no AMP.

Um [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) básico é um objeto JSON object que consiste das seguintes partes fundamentais:

- O elemento que o componente está animando, ou `seletor`.
- [Propriedades de temporização](../../../../documentation/components/reference/amp-animation.md#timing-properties)
- [Keyframes](../../../../documentation/components/reference/amp-animation.md#keyframes)
- [Trigger](../../../../documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Seletor

De forma bastante similar ao CSS, o componente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) vincula as propriedades da animação ao elemento declarando o nome, a classe ou o ID da tag do elemento, no campo `"selector"`. O componente anima cada elemento com o tipo de tag ou o nome da classe declarado. Use um ID para garantir a animação de um único elemento.

### Propriedades de temporização

As [propriedades de temporização](../../../../documentation/components/reference/amp-animation.md#timing-properties) controlam quanto tempo dura uma animação, a quantidade de vezes que é reproduzida e em qual direção são executados os keyframes.

Nenhuma propriedade de temporização é necessária, mas uma animação pode não ser executada se estiverem faltando propriedades relacionadas à duração e exibição, como `duration` e `fill`.

### Keyframes

Embora o CSS permita que você faça a transformação de um estado para outro através de transições, você precisa declarar as propriedades da animação como keyframes para implementar [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) (semelhante a [animações CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)). Para garantir uma reprodução suave e compatibilidade entre navegadores, [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) [restringe quais propriedades de keyframe](../../../../documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) podem ser usadas pelas propriedades aceleradas por GPU, que não forçam um novo layout da página e que podem executar a animação no [thread compositor](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). Isto evita que as animações interfiram no AMP e no [processo de renderização](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) do navegador.

[tip type="note"] Keyframes ou são declarados diretamente no [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) ou referenciados a partir de [`<amp style-keyframe>`](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#keyframes-stylesheet) desde que sigam as restrições de propriedade. Leia mais [aqui sobre keyframes nas `amp-animações`](../../../../documentation/components/reference/amp-animation.md#keyframes). [/tip]

### Trigger

O trigger é o gatilho que inicia a sequência de animação. A extensão [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) começa quando o  `<body>` torna-se visível na página ou conectando-o a uma [ação ou evento AMP](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)

Iniciar a animação a partir da visibilidade do `<body>` é útil quando a animação deve ser executada assim que a página carregar, porque aparece "acima da dobra" ou na primeira janela de exibição da página. As animações são acionadas através da visibilidade acrescentando `trigger="visibility"` como atributo do componente.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

As animações conectam-se a uma ação ou evento atribuindo um `id` ao componente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) e associando esse `id` ao trigger de evento desejado, como por exemplo, o ato de tocar em um botão.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Criando animações complexas

A criação de uma animação em [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) permite um controle refinado que vai além de iniciar e parar uma animação: também pode pausar, reproduzir de trás para frente e direcionar a um ponto específico. Você pode até encadear várias animações e animar elementos em sequência.

### Alvos subordinados

Elementos da mesma tag ou classe podem ter propriedades de temporização especificadas e substituir os valores das variáveis definidas na animação de nível superior.

[example preview="top-frame" playground="true" imports="amp-animation"]
```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [{"transform": "translateX(0px)"}, {"transform": "translateX(50%)"}],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">
   start
  </button>
</body>
```
[/example]

### Animações encadeadas

Várias animações podem ser encadeadas uma nas outras para formar uma grande sequência. Você pode criar efeitos cronometrados, como sobreposições em um vídeo, escrevendo animações no array `animations` dentro do componente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md).

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>
```

Essa configuração reproduz cada animação por 3 segundos em sequência.

Para animações maiores, as animações dentro do array `animations` são capazes de referenciar outros componentes [`amp-animation`](../../../../documentation/components/reference/amp-animation.md).

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### Animando uma quantidade desconhecida de elementos

Utilizando as [expressões `var()` e `calc()`](../../../../documentation/components/reference/amp-animation.md) junto com [extensões CSS](../../../../documentation/components/reference/amp-animation.md#css-extensions), você pode escrever animações complexas e temporizadas que funcionam com qualquer quantidade de elementos. Isto permite que dados dinâmicos e gerados pelo usuário possam ser animados com facilidade e fluidez.

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
            {"transform": "translate3d(0px, 0px, 0px)"},
            {"transform": "translate3d(50%, 0px, 100px)"},
            {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
            {"transform": "translate3d(50%, 0px, -100px)"},
            {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex=none role="animation">
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg" layout="fill"></amp-img>
  </div>
</body>
```
[/example]

- Declara uma variável `--duration` e atribui a ela o valor de dois segundos.
- Declara como valor da propriedade `duration` o valor da variável `--duration`.
- Calcula o atraso (propriedade delay) aplicado a cada elemento que corresponde ao seletor `.card`.
    1. A [extensão `length()`](../../../../documentation/components/reference/amp-animation.md#css-length()-extension) calcula quantos elementos `.card` foram selecionados
    2. Depois subtrai desse total o [index()](../../../../documentation/components/reference/amp-animation.md#css-index()-extension) de cada `.card`
    3. O valor resultante é multiplicado pela variável `--duration`
    4. O total final é aplicado à propriedade delay desse elemento, em segundos
- A animação é aplicada a cada elemento individualmente, para que os cartões sejam embaralhados um após o outro, em vez de todos ao mesmo tempo.

Abra a animação no playground AMP e adicione mais elementos [`amp-img`](../../../../documentation/components/reference/amp-img) para testar esse comportamento.

### Uma aparência excelente, em qualquer lugar

Animações podem incluir [`conditions`](../../../../documentation/components/reference/amp-animation.md#conditions) (condições) que permitem efeitos personalizados. Ajuste animações para que se adaptem a qualquer tamanho de tela através da [condição `media`](../../../../documentation/components/reference/amp-animation.md#media-query) e ofereça suporte à compatibilidade reversa do navegador ativando as [condições `supports`](../../../../documentation/components/reference/amp-animation.md#supports-condition) na [declaração `switch`](../../../../documentation/components/reference/amp-animation.md#animation-switch-statement).

[example preview="top-frame" playground="true"]
```html
<head>
 <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
</head>
<body>
<amp-animation id="mediaAnimation" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "1s",
      "iterations": "4",
      "fill": "both",
      "direction": "alternate",
      "animations": [
        {
          "media": "(min-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(50vw)"
          }
        },
        {
          "media": "(min-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-50vw)"
          }
        }
      ]
    }
  </script>
</amp-animation>
    
  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```
[/example]
