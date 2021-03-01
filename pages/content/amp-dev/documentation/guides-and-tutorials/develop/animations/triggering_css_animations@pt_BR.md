---
'$title': Acionando animações e transições CSS
$order: 1
description: O acionamento de animações CSS nas páginas depende da adição e remoção de classes via JavaScript. Você pode obter o mesmo comportamento nas páginas AMP usando a ação toggleClass ...
formats:
  - websites
  - ads
---

As animações CSS permitem que elementos da Web façam a transição de uma configuração de estilo CSS para outra. O navegador pode iniciar animações definidas durante a carga, mas animações CSS acionadas por eventos [dependem da adição e remoção de classes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP suporta os dois tipos de animação.

Use CSS quando tiver uma animação menor e contida que não precise ser cronometrada com precisão.

## Definindo CSS e keyframes

Você pode definir CSS no AMP das seguintes maneiras:

[filter formats="websites, stories"]

- Dentro da tag `<style amp-custom>` no interior do bloco head do documento. Limite de 75,000 bytes.
- Estilos inline. Cada instância de um estilo inline tem um limite de 1.000 bytes. Os estilos inline contam para o limite de 75.000 bytes do `<style amp-custom>`.
- Dentro da tag `<style amp-keyframes>` no interior do bloco head do documento. Limite de 500.000 bytes. Restrito a propriedades de keyframe.

[/filter]

[filter formats="ads"]

- Dentro da tag `<style amp-custom>` no interior do bloco head do documento. Limite de 20.000 bytes.
- Estilos inline. Cada instância de um estilo inline tem um limite de 1.000 bytes. Os estilos inline contam para o limite de 20.000 bytes do `<style amp-custom>`.
- Dentro da tag `<style amp-keyframes>` no interior do bloco head do documento. Limite de 500.000 bytes. Restrito a propriedades de keyframe.

[/filter]

[tip type="read-on"] Leia mais em [Estilo e layout](../style_and_layout/index.md) sobre como usar CSS no AMP. [/tip]

[filter formats="websites, stories"] Para manter suas páginas magras e velozes, o AMP impôs um limite de 75.000 bytes ao CSS na tag `<amp style-custom>`. Embora você possa definir estilos de animação usando essa tag, o limite de 500.000 bytes na tag `<amp style-keyframes>` permite animações mais detalhadas que não tiram recursos preciosos dos estilos do site. [/filter]

[filter formats="ads"] Para manter suas páginas magras e velozes, o AMP impôs um limite de 20.000 bytes ao CSS na tag `<amp style-custom>`. Embora você possa definir estilos de animação usando essa tag, o limite de 500.000 bytes na tag `<amp style-keyframes>` permite animações mais detalhadas que não tiram recursos preciosos dos estilos do site. [/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## Adicionando, removendo e alternando classes

A ação AMP, `toggleClass` ativa a adição e remoção de classes em elementos definidos.

```js
elementName.toggleClass(class="className")
```

Você pode alternar uma classe no mesmo elemento com o qual você quer que os usuários interajam, como, por exemplo, um menu de hambúrguer animado.

```html
<div
  id="hamburger"
  tabindex="1"
  role="button"
  on="tap:hamburger.toggleClass(class='close')"
></div>
```

A ação `toggleClass` também pode ser aplicada a outros elementos e alternar entre duas classes adicionando o atributo `force`.

```html
<button
  on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)"
>
  Disappear
</button>
<button
  on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)"
>
  Reappear
</button>
```

Se você precisar remover uma classe e impedir a reaplicação, adicione o atributo `force` com valor `false`. Se você precisar adicionar uma classe e impedir a remoção, adicione `force` com valor `true`.

## Animações com CSS e estado

Você pode adicionar e remover qualquer quantidade de classes CSS com estados usando [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
  ></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px);
    }
    .right {
      transform: translatex(50px);
    }
    button {
      margin-top: 1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"></div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
</body>
```

[/example]

Defina múltiplas animações de classe primeiro adicionando uma lista de classes CSS na tag `<style amp-custom>` no bloco `head` do documento:

```css
.visible {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
.left {
  transform: translatex(-50px);
}
.right {
  transform: translatex(50px);
}
```

Em seguida, emparelhe cada classe com um estado:

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

E associe o elemento às classes:

```html
<div [class]="magicBox[animateBox].className"></div>
```

Os estados mudam em uma ação ou evento AMP associado. O exemplo a seguir altera o estado a partir da interação do usuário:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
```

Usando [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) dessa maneira, defina a classe explicitamente para a classe definida. Você não precisa mandá-la remover as outras classes.
