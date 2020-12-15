---
"$title": Activar las animaciones y transiciones CSS
"$order": '1'
description: La activación de animaciones CSS en páginas se basa en integrar y eliminar clases hechas mediante JavaScript. Puede lograr el mismo comportamiento en las AMP pages utilizando la acción toggleClass ...
formats:
- websites
- ads
---

Las animaciones CSS permiten que los elementos web hagan la transición desde una configuración a otra en los estilos CSS. El navegador puede iniciar con animaciones predeterminadas dependiendo de lo que cargue, pero las animaciones CSS que se activan por eventos [se basan en integrar y eliminar clases](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP es compatible con ambos tipos de animación.

Utilice CSS cuando tenga una animación más pequeña e incorporada que no necesite de una sincronización precisa.

## Definir CSS y los fotogramas clave

Puede definir CSS en AMP de las siguientes formas:

[filter formats="websites, stories"]

- En la etiqueta `<style amp-custom>` que está en el interior del encabezado del documento, tendrá un límite de 75,000 bytes.
- Estilos en línea. Cada instancia de un estilo en línea tiene un límite de 1,000 bytes. Los estilos en línea se incluyen en el límite de 75,000 bytes de `<style amp-custom>`.
- En la etiqueta `<style amp-keyframes>` que está en el interior del encabezado del documento, tendrá un límite de 500,000 bytes. Restringido a las propiedades de los fotogramas clave.

[/filter]

[filter formats="ads"]

- En la etiqueta `<style amp-custom>` que está en el interior del encabezado del documento, tendrá un límite de 20,000 bytes.
- Estilos en línea. Cada instancia de un estilo en línea tiene un límite de 1,000 bytes. Los estilos en línea se incluyen en el límite de 20,000 bytes de `<style amp-custom>`.
- En la etiqueta `<style amp-keyframes>` que está en el interior del encabezado del documento, tendrá un límite de 500,000 bytes. Restringido a las propiedades de los fotogramas clave.

[/filter]

[tip type="read-on"] Obtenga más información sobre el uso de CSS en AMP en [Estilo y diseño](../style_and_layout/index.md). [/tip]

[filter formats="websites, stories"] Para mantener sus páginas austeras y rápidas, AMP asignó un límite de 75,000 bytes a CSS mediante la etiqueta `<amp style-custom>`. No obstante, puede utilizar esto para definir estilos de animación; el límite de 500,000 bytes que le proporciona el uso de la etiqueta `<amp style-keyframes>` le permitirá generar animaciones más detalladas que no le quitarán recursos valiosos de estilo en el sitio. [/filter]

[filter formats="ads"] Para que sus anuncios sigan siendo sencillos y rápidos, AMP asignó un límite de 20,000 bytes a CSS mediante la etiqueta `<amp style-custom>`. No obstante, puede utilizar esto para definir estilos de animación; el límite de 500,000 bytes que le proporciona el uso de la etiqueta `<amp style-keyframes>` le permitirá generar animaciones más detalladas que no le quitarán recursos valiosos de estilo en el sitio. [/filter]

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

## Agregar, eliminar y alternar clases

En la acción `toggleClass` de AMP se habilita la incorporación y eliminación de clases en los elementos que están establecidos.

```js
elementName.toggleClass(class="className")
```

Puede alternar una clase en el mismo elemento de su elección para que los usuarios interactúen entre sí, como un menú animado “hamburguer”.

```html
 <div id="hamburger" tabindex=1 role=button on="tap:hamburger.toggleClass(class='close')">
```

En la acción `toggleClass` además se pueden implementar otros elementos y alternar entre dos clases mediante la incorporación del atributo `force`.

```html
<button on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)">
  Disappear
</button>
<button on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)">
  Reappear
</button>
```

Si necesita eliminar una clase y rechazar su reinstauración, agregue el atributo `force` con el valor `false`. Si necesita agregar una clase y rechazar su eliminación, añada `force` con el valor `true`.

## Generar animaciones con CSS y estado

Puede integrar y eliminar cualquier cantidad de clases CSS con estados mediante el uso de [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
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
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
    button {
      margin-top:  1rem;
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
  <div [class]="magicBox[animateBox].className"> </div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">
    Move Right
  </button>
</body>
```
[/example]

Defina las animaciones de varias clases al agregar primero una lista de clases CSS en la etiqueta `<style amp-custom>` que está en el interior del `head` del documento:

```css
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
```

Después forme parejas de cada clase con un estado:

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

Y forme un enlace del elemento con las clases:

```html
  <div [class]="magicBox[animateBox].className"> </div>
```

Los estados cambian a partir de una acción o evento de AMP que tenga un enlace. En el siguiente ejemplo se cambia el estado de la interacción con el usuario:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">
  Move Right
</button>
```

Al utilizar [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) de esta manera se establece la clase de forma explícita en la clase establecida. No tendrá que indicarle que elimine otras clases.
