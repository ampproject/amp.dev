---
$title: amp-animation
$category@: presentation
teaser:
  text: Define e exibe uma animação.
---


<!--
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



Define e executa animações.

<table>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td><code>&lt;script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layouts compatíveis</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Exemplos</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/master/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>


## Visão geral <a name="overview"></a>

O AMP Animations usa a [API Web Animations](https://www.w3.org/TR/web-animations/) (link em inglês) para definir e executar animações em documentos AMP.

## Formato <a name="format"></a>

Um elemento `amp-animation` define a animação como uma estrutura JSON.

### Especificação de animação de nível superior <a name="top-level-animation-specification"></a>

O objeto de nível superior define um processo geral de animação, que consiste em um número arbitrário de componentes de animação definidos como uma matriz `animations`:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  // Timing properties
  ...
  "animations": [
    {
      // Animation 1
    },
    ...
    {
      // Animation N
    }
  ]
}
</script>
</amp-animation>
```

### Posicionamento no DOM <a name="placement-in-dom"></a>

`<amp-animation>` só pode ser colocado como filho direto do elemento `<body>` se `trigger="visibility"`. Se o `trigger` não for especificado e a reprodução da animação for controlada de modo programático por meio das ações dela, ele poderá ser posicionado em qualquer lugar no DOM.

### Componente de animação <a name="animation-component"></a>

Cada componente de animação tem um [efeito de frame-chave](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect) (link em inglês) e é composto por:

- elementos desejados referenciados por um seletor;
- condições (consulta de mídia e condição de suporte);
- propriedades de tempo;
- frames-chave.

```text
{
  "selector": "#target-id",
  // Conditions
  // Variables
  // Timing properties
  // Subtargets
  ...
  "keyframes": []
}
```

### Condições <a name="conditions"></a>

As condições podem especificar se o componente de animação será incluído na animação final.

#### Consulta de mídia <a name="media-query"></a>

A consulta de mídia pode ser especificada usando a propriedade `media`. Essa propriedade pode conter qualquer expressão permitida para a API [Window.matchMedia](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/matchMedia) e corresponde à regra CSS `@media`.

Se um valor for especificado para um componente de animação, o componente só será incluído se a consulta de mídia corresponder ao ambiente atual.

#### Condição de suporte <a name="supports-condition"></a>

A condição de suporte pode ser especificada usando a propriedade `supports`. Essa propriedade pode conter qualquer expressão permitida para a API [CSS.supports](https://developer.mozilla.org/pt-BR/docs/Web/API/CSS/supports) e corresponde à regra CSS `@supports`.

Se um valor for especificado para um componente de animação, o componente só será incluído se a condição de suporte corresponder ao ambiente atual.

### Declaração de animação `switch` <a name="animation-switch-statement"></a>

Em alguns casos, é recomendável combinar várias [animações condicionais](#conditions) com um padrão opcional em uma única animação. Isso pode ser feito usando a declaração de animação `switch` neste formato:

```
{
  // Optional selector, vars, timing
  ...
  "switch": [
    {
      "media": "(min-width: 320px)",
      "keyframes": {...},
    },
    {
      "supports": "offset-distance: 0",
      "keyframes": {...},
    },
    {
      // Optional default: no conditionals
    }
  ]
}
```

Na animação `switch`, os candidatos são avaliados na ordem definida, e a primeira animação que corresponda às [declarações condicionais](#conditions) é executada, enquanto o restante é ignorado.

Por exemplo, esta animação executa uma animação com trajetória, se compatível, e volta para transformar:
```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```

### Variáveis <a name="variables"></a>

Um componente de animação pode declarar variáveis CSS que serão usadas para valores de tempo e de frames-chave por meio de expressões `var()`. As expressões `var()` são avaliadas usando o contexto de destino atual. As variáveis CSS especificadas nos componentes de animação são propagadas para animações aninhadas, aplicadas a destinos de animação e, assim, substituem as variáveis CSS usadas nas animações finais.

Por exemplo:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "--delay": "0.5s",
  "--x": "100px",
  "animations": [
    {
      "selector": "#target1",
      "delay": "var(--delay)",
      "--x": "150px",
      "keyframes": {"transform": "translate(var(--x), var(--y, 0px)"}
    },
    ...
  ]
}
</script>
</amp-animation>
```

Neste exemplo:

 `--delay` é propagado para animações aninhadas e usado como um atraso da animação `#target1`.
- `--x` é propagado para animações aninhadas, mas substituído pela animação `#target1` e depois usado para a propriedade `transform`.
- `--y` não é especificado em nenhum lugar do `<amp-animation>` e, portanto, será consultado no elemento `#target1`. O padrão será `0px` se não for definido no CSS.

Para mais informações sobre `var()`, consulte a seção [`var()` e `calc()`](#var-and-calc-expressions).

### Propriedades de tempo <a name="timing-properties"></a>

Os componentes de animação e de animação de nível superior podem conter propriedades de tempo. Essas propriedades são definidas em detalhes no [AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties) (link em inglês) da especificação da Web Animation. O conjunto de propriedades permitidas inclui:

<table>
  <tr>
    <th class="col-twenty">Propriedade</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-twenty">Padrão</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>tempo</td>
    <td>0</td>
    <td>A duração da animação. Um valor numérico em milissegundos ou um valor de tempo CSS, por exemplo, `2s`.</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>tempo</td>
    <td>0</td>
    <td>O atraso antes da execução da animação. Um valor numérico em milissegundos ou um valor de tempo CSS, por exemplo, `2s`.</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>tempo</td>
    <td>0</td>
    <td>O atraso após a conclusão da animação e antes de ela ser considerada realmente concluída. Um valor numérico em milissegundos ou um valor de tempo CSS, por exemplo, `2s`.</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>número ou<br>"Infinity" ou<br>"infinite"</td>
    <td>1</td>
    <td>O número de vezes que o efeito de animação se repete.</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>número/CSS</td>
    <td>0</td>
    <td>O ajuste de horário em que o efeito começa a ficar animado.</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>string</td>
    <td>"linear"</td>
    <td>A <a href="https://www.w3.org/TR/web-animations/#timing-function">função de tempo</a> (link em inglês) usada para dimensionar o tempo para produzir efeitos de easing.</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>string</td>
    <td>"normal" </td>
    <td>"normal", "reverse", "alternate" ou "alternate-reverse".</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>string</td>
    <td>"none"</td>
    <td>"none", "forwards", "backwards", "both" ou "auto".</td>
  </tr>
</table>

Todas as propriedades de tempo permitem valores diretos numéricos/de strings ou valores CSS. Por exemplo, "duration" pode ser especificado como `1000`, `1s` ou `1000ms`. Além disso, `calc()` e `var()` e outras expressões CSS também são permitidas.

Um exemplo de propriedades de tempo em JSON:
```text
{
  ...
  "duration": "1s",
  "delay": 100,
  "endDelay": "var(--end-delay, 10ms)",
  "easing": "ease-in",
  "fill": "both"
  ...
  }
```

Os componentes de animação herdam as propriedades de tempo especificadas para a animação de nível superior.

### Subdestinos <a name="subtargets"></a>

Em todos os locais em que o `selector` pode ser especificado, também é possível especificar `subtargets: []`. Os subdestinos podem modificar as propriedades de tempo ou variáveis definidas na animação para subdestinos específicos, indicados por meio de um seletor de CSS ou um índice.

Por exemplo:
```text

  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

Nesse exemplo, por padrão, todos os destinos correspondentes a ".target" têm um atraso de 100 ms e "--y" "de 100 px. No entanto, o primeiro destino (`index: 0`) é modificado para ter um atraso de 200 ms, e os destinos ímpares são modificados para terem "--y" de 200 px.

Observe que vários subdestinos podem corresponder a um único elemento de destino.

### Frames-chave <a name="keyframes"></a>

Os frames-chave podem ser especificados de várias maneiras, descritas na [seção de frames-chave](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) da especificação da API Web Animations ou como uma string que se refere ao nome dos `@keyframes` no CSS.

Veja abaixo alguns exemplos típicos de definições de frames-chave.

O formato de objeto abreviado "to" especifica o estado final em 100%:
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

O formato de objeto abreviado "from-to" especifica os estados inicial e final, em 0% e 100%:
```text
{
  "keyframes": {
    "opacity": [1, 0],
  "transform": ["scale(1)", "scale(2)"]
}
}
```

O formato de objeto abreviado "value-array" especifica vários valores para os estados inicial e final e para vários ajustes (com espaços iguais):
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
    "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
}
}
```

O formato de matriz especifica os frames-chave. Os ajustes são atribuídos automaticamente a 0, 100% e espaçados de maneira uniforme entre si:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

O formato de matriz também pode incluir o "offset" de modo explícito:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

O formato de matriz também pode incluir "easing":
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Para outros formatos de frames-chave, consulte a [especificação da Web Animations](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) (link em inglês).

Os valores de propriedades permitem qualquer valor CSS válido, incluindo `calc()`, `var()` e outras expressões CSS.

#### Frames-chave do CSS <a name="keyframes-from-css"></a>

Outra maneira de especificar frames-chave é na folha de estilo do documento (tag `<style>`) como uma regra de `@keyframes` do CSS. Por exemplo:
```html
<style amp-custom>
  @keyframes keyframes1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<amp-animation layout="nodisplay">
<script type="application/json">
{
  "duration": "1s",
  "keyframes": "keyframes1"
}
</script>
</amp-animation>
```

`@keyframes` do CSS são equivalentes a aplicar in-line à definição das frames-chave no JSON de acordo com as [especificações da Web Animations](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) (link em inglês). No entanto, há algumas nuances:

- Para compatibilidade com várias plataformas, podem ser necessários prefixos de fornecedor, como `@-ms-keyframes {}` ou `-moz-transform`. Os prefixos de fornecedores não são necessários nem permitidos no formato JSON, mas no CSS eles podem ser necessários.
- As plataformas que não compatíveis com `calc()` e `var()` não poderão usar polyfills do `amp-animation` quando forem especificados frames-chave no CSS. Portanto, é sempre recomendável incluir valores substitutos no CSS.
- Extensões de CSS, como [`width()`, `height()`, `num()`, `rand()`, `index()` e `length()`](#css-extensions), não podem ser usadas no CSS.

#### Propriedades permitidas para frames-chave <a name="allow-listed-properties-for-keyframes"></a>

Nem todas as propriedades do CSS podem ser usadas em frames-chave. Somente as propriedades CSS que os navegadores modernos podem otimizar e animar de forma rápida são incluídas na lista de permissões. Essa lista aumentará à medida que mais propriedades forem confirmadas como geradoras de bom desempenho. No momento, a lista contém:
- [`opacity`](https://developer.mozilla.org/pt-BR/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/pt-BR/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/pt-BR/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/pt-BR/docs/Web/CSS/offset-distance)

Observe que o uso de propriedades CSS com prefixos do fornecedor não é necessário nem permitido.

### Formas abreviadas de configuração de animação <a name="abbreviated-forms-of-animation-configuration"></a>

Se a animação envolver apenas um único elemento, e um único efeito de frames-chave for suficiente, a configuração poderá ser reduzida a esse único componente de animação. Por exemplo:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "selector": "#target-id",
  "duration": "1s",
  "keyframes": {"opacity": 1}
}
</script>
</amp-animation>
```

Se a animação for composta por uma lista de componentes, mas não tiver animação de nível superior, a configuração poderá ser reduzida a uma matriz de componentes. Por exemplo:
```html
  <amp-animation layout="nodisplay">
  <script type="application/json">
  [
    {
      "selector": ".target-class",
      "duration": 1000,
      "keyframes": {"opacity": 1}
    },
    {
      "selector": ".target-class",
      "duration": 600,
      "delay": 400,
      "keyframes": {"transform": "scale(2)"}
    }
  ]
  </script>
  </amp-animation>
```

### Composição de animação <a name="animation-composition"></a>

As animações podem fazer referência a outras animações, combinando várias declarações de `amp-animation` em uma única animação final. Fazer referência a uma animação a partir de outra animação é basicamente o mesmo que aninhar. O motivo para dividir animações em elementos diferentes seria reutilizar a mesma animação em vários lugares ou simplesmente tornar cada declaração de animação menor e mais gerenciável.

Por exemplo:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

Esse exemplo de animação combina a animação "anim2" "como parte de "anim1". "anim2" é incluído sem um destino (`selector`). Nesse caso, a animação incluída provavelmente fará referência ao próprio destino.

Outro formato permite que a animação incluída forneça um destino ou vários. Nesse caso, a animação incluída é executada para cada destino correspondente. Por exemplo:
  ```html
  <amp-animation id="anim1" layout="nodisplay">
  <script type="application/json">
  {
    "selector": ".target-class",
    "animation": "anim2",
    "duration": 1000,
    "--scale": 2
  }
  </script>
  </amp-animation>

  <amp-animation id="anim2" layout="nodisplay">
  <script type="application/json">
  {
    "keyframes": {"transform": "scale(var(--scale))"}
  }
  </script>
  </amp-animation>
```

Aqui, se "target-class" corresponder a um elemento, vários ou nenhum, o "anim2' será executado para cada destino correspondente.

As variáveis e as propriedades de tempo especificadas na animação de autor da chamada também são transmitidas para a animação incluída.

### Expressões `var()` e `calc()` <a name="var-and-calc-expressions"></a>

O `amp-animation` permite o uso de expressões `var()` e `calc()` para valores de tempo e frames-chave.

Por exemplo:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay)",
    "--y": "var(--other-y, 100px)",
    "keyframes": {"transform": "translate(calc(100vh + 20px), var(--y))"}
  }
]
</script>
</amp-animation>
```

O polyfill é aplicado às expressões `var()` e `calc()` em plataformas que não são diretamente compatíveis com elas. As propriedades de `var()` são extraídas dos elementos de destino correspondentes. No entanto, não é possível aplicar totalmente o polyfill a `var()`. Assim, quando a compatibilidade for importante, é recomendável incluir valores padrão nas expressões `var()`. Por exemplo:
```html
  <amp-animation layout="nodisplay">
  <script type="application/json">
  [
    {
      "selector": ".target-class",
      "duration": "4s",
      "delay": "var(--delay, 100ms)",
    }
  ]
  </script>
  </amp-animation>
```

Os componentes de animação podem especificar as próprias variáveis como campos `--var-name`. Essas variáveis são propagadas em animações aninhadas e substituem variáveis de elementos de destino especificadas pela folha de estilo (tag `<style>`). As expressões `var()` primeiro tentam resolver os valores de variáveis especificados nas animações e depois consultam os estilos de destino.

### Extensões CSS <a name="css-extensions"></a>

O `amp-animation` fornece várias extensões CSS para necessidades típicas de animações: `rand()`, `num()`, `width()` e `height()`. Essas funções podem ser usadas em todos os lugares em que os valores de CSS possam ser utilizados no `amp-animation`, incluindo valores de tempo e de frames-chave.

#### Extensão CSS `index()` <a name="css-index-extension"></a>

A função `index()` retorna um índice do elemento de destino atual no efeito de animação. Isso é mais relevante quando vários destinos são animados com o mesmo efeito usando a propriedade `selector`. O primeiro destino correspondido pelo seletor terá o índice `0`, o segundo terá o índice `1` e assim por diante.

Entre outras coisas, essa propriedade pode ser combinada com expressões `calc()` e ser usada para criar efeito escalonado. Por exemplo:
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
  }
```

#### Extensão CSS `length()` <a name="css-length-extension"></a>

A função `length()` retorna o número de elementos de destino no efeito de animação. Isso é mais relevante quando combinado com `index()`:

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### Extensão CSS `rand()` <a name="css-rand-extension"></a>

A função `rand()` retorna um valor CSS aleatório. Existem dois formatos.

A forma sem argumentos simplesmente retorna o número aleatório entre 0 e 1.
```
{
  "delay": "calc(10s * rand())"
  }
```

O segundo formato tem dois argumentos e retorna o valor aleatório entre eles.
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### Extensões CSS `width()` e `height()` <a name="css-width-and-height-extensions"></a>

As extensões `width()` e `height()` retornam a largura/altura do elemento animado ou o elemento especificado pelo seletor. O valor retornado está em pixels, por exemplo, `100px`.

Os seguintes formatos são aceitos:

- `width()` e `height()` - largura/altura do elemento animado.
- `width('.selector')` e `height('.selector')` - largura/altura do elemento especificado pelo seletor. Qualquer seletor de CSS pode ser usado. Por exemplo, `width('#container &gt; li')`.
- `width(closest('.selector'))` e `height(closest('.selector'))` - largura/altura do elemento especificado pelo seletor mais próximo.

`width()` e `height()` são especialmente úteis para transformações. As propriedades CSS `left`, `top` e semelhantes que podem usar valores em `%` para expressar animações proporcionais ao tamanho do contêiner. No entanto, a propriedade `transform` interpreta os valores em `%` de forma diferente: como uma porcentagem do elemento selecionado. Assim, `width()` e `height()` podem ser usados para expressar animações de transformação em termos de elementos de contêiner e similares.

Essas funções podem ser combinadas com `calc()`, `var()` e outras expressões CSS. Por exemplo:
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### Extensão CSS `num()` <a name="css-num-extension"></a>

A função `num()` retorna uma representação numérica de um valor CSS. Por exemplo:

- `num(11px)` gera `11`
- `num(110ms)` gera `110`
- etc.

Por exemplo, a expressão a seguir calcula o atraso em segundos proporcional à largura do elemento:
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### Animações SVG <a name="svg-animations"></a>

SVGs são incríveis e certamente recomendamos o uso deles em animações.

As animações SVG são compatíveis usando as mesmas propriedades CSS descritas em [Propriedades permitidas para frames-chave](#allow-listed-properties-for-keyframes), com algumas nuances:

* Os elementos SVG do IE/Edge [não são compatíveis com as propriedades CSS `transform`](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/) (link em inglês). A própria animação `transform` tem polyfill aplicado. No entanto, o estado inicial definido em uma folha de estilo não é aplicado. Se o estado transformado inicial for importante no IE/Edge, é recomendável duplicá-lo por meio do [atributo `transform` do SVG](https://developer.mozilla.org/pt-BR/docs/Web/SVG/Attribute/transform).
* Embora o CSS `transform` tenha polyfill aplicado para o IE/Edge, não é possível transformar `transform-origin` em um polypill. Assim, quando a compatibilidade com o IE/Edge é desejada, recomenda-se usar somente o `transform-origin` padrão.
* A maioria dos navegadores atuais tem problemas para interpretar o CSS `transform-origin` corretamente. Veja os problemas do [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300), [Safari](https://bugs.webkit.org/show_bug.cgi?id=174285) e [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340). A maior parte dessa confusão provavelmente é resolvida depois que o [CSS `transform-box`](https://developer.mozilla.org/pt-BR/docs/Web/CSS/transform-box) é implementado. Quando `transform-origin` é importante, recomenda-se incluir também o CSS `transform-box` desejado para compatibilidade futura.

## Acionar animação <a name="triggering-animation"></a>

A animação pode ser acionada por meio do atributo `trigger` ou da ação `on`.

### Atributo `trigger` <a name="trigger-attribute"></a>

Atualmente, `visibility` é o único valor disponível para o atributo `trigger`. O `visibility` é acionado quando o documento subjacente ou a incorporação está visível (na janela de visualização).

Por exemplo:
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
    ...
  </amp-animation>
```

### Acionar usando a ação `on` <a name="triggering-via-on-action"></a>

Por exemplo:

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## Ações `on` <a name="on-actions"></a>

O elemento `amp-animation` exporta as seguintes ações:

* `start`: inicia a animação se ela ainda não estiver sendo executada. As propriedades e variáveis de tempo podem ser especificadas como argumentos de ação. Por exemplo: `anim1.start(delay=-100, --scale=2)`.
* `restart`: inicia a animação ou reinicia a animação em execução no momento. As propriedades e variáveis de tempo podem ser especificadas como argumentos de ação. Por exemplo: `anim1.start(delay=-100, --scale=2)`.
* `pause`: pausa a animação em execução no momento.
* `resume`: retoma a animação em execução no momento.
* `togglePause`: alterna entre pausar e retomar ações.
* `seekTo`: pausa a animação e busca o ponto de tempo especificado pelo argumento `time`, em milissegundos, ou no argumento `percent`, como um ponto da porcentagem na linha do tempo.
* `reverse`: reverte a animação.
* `finish`: conclui a animação.
* `cancel`: cancela a animação.
