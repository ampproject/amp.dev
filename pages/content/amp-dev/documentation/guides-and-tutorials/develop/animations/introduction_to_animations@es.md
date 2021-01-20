---
"$title": Introducción a las animaciones complejas
"$order": '2'
description: Para las animaciones que no pueden basarse en integrar y eliminar clases, AMP ofrece varios componentes específicos para generar animaciones. Estos componentes implementan los principios de AMP para las animaciones ...
formats:
- websites
- ads
author: CrystalOnScript
---

Para las animaciones que no pueden basarse en [integrar y eliminar clases](triggering_css_animations.md), AMP ofrece varios componentes específicos para generar animaciones. Estos componentes implementan los principios de AMP para las animaciones: rapidez, eficiencia y dar prioridad al usuario. AMP restringe las propiedades de CSS dentro de los fotogramas clave autorizados, pero otorga beneficios como el control detallado, animaciones impecables y compatibilidad entre navegadores sin esfuerzos adicionales.

Utilice amp-animation si necesita controlar con firmeza la reproducción, así como tener una sincronización precisa con varios elementos de animación al mismo tiempo.

## Crear una animación básica en AMP

El componente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) permite el uso de la [Web Animation API](https://www.w3.org/TR/web-animations/) en AMP.

Una parte básica de [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) es un objeto JSON hecho de las siguientes partes esenciales:

- El elemento en que el componente genera la animación, o `selector`.
- [Propiedades de sincronización](../../../../documentation/components/reference/amp-animation.md#timing-properties)
- [Fotogramas clave](../../../../documentation/components/reference/amp-animation.md#keyframes)
- [Activador](../../../../documentation/components/reference/amp-animation.md#triggering-animation)

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

### Selector

Al igual que el CSS, el componente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) crea un enlace de las propiedades de la animación hacia el elemento al declarar el nombre de la etiqueta en el elemento, clase o id en el campo del `"selector"`. El componente genera una animación de cada elemento con el tipo de etiqueta o nombre de clase declarado. Utilice una id para garantizar que genera animaciones de un solo elemento.

### Propiedades de sincronización

El control de las [propiedades de sincronización](../../../../documentation/components/reference/amp-animation.md#timing-properties), la duración de una animación, la cantidad de veces que se reproduce y la dirección en la que se ejecutan los fotogramas clave.

No se necesitan propiedades de sincronización, pero una animación no podría ejecutarse si hacen falta propiedades relacionadas con la sincronización y la visualización, como `duration` y `fill`.

### Fotogramas clave

A la vez que CSS le permite pasar de un estado a otro a través de transiciones, debe declarar las propiedades de la animación como los fotogramas clave para implementar [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) (de forma parecida a las [animaciones CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)). Para garantizar una reproducción fluida y compatibilidad entre navegadores, [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) [restringe qué propiedades del fotograma clave](../../../../documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) se utilizan en las propiedades de aceleración por GPU que no producen un rediseño y generar animaciones en el [subproceso compositor](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). Esto evita que las animaciones interfieran con AMP y el [proceso de renderización](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) del navegador.

[tip type="note"] Los fotogramas clave se definen directamente en un [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) o se toman como referencia desde  [`<amp style-keyframe>`](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#keyframes-stylesheet), siempre y cuando sigan las restricciones de la propiedad. Lea más [aquí sobre los fotogramas clave en `amp-animation`](../../../../documentation/components/reference/amp-animation.md#keyframes). [/tip]

### Activador

El activador inicia la secuencia de animación. La extensión [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) comienza cuando el `<body>` se vuelve visible en la página o conectándolo a una [acción de AMP o evento](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).

Activar la visibilidad de `<body>` es útil cuando la animación debe ejecutarse tan pronto como se carga la página porque aparece “en la primera parte de la página”, o dentro de la primera ventana de visualización de la página. Las animaciones se activan a través de la visibilidad al agregar `trigger="visibility"` como un atributo del componente.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Las animaciones se conectan a una acción o evento asignando el componente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) una `id` y creando un enlace de esa `id` al evento de activación deseado, como presionar un botón.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Creando animaciones complejas

La creación de una animación en [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) permite un control detallado que no se limita a iniciar y detener una animación: también puede dar pausa, regresar y dirigirse a un punto específico. Incluso puede encadenar varias animaciones y crear animaciones de elementos en una secuencia.

### Subobjetivos

Los elementos de la misma etiqueta o clase pueden tener propiedades de sincronización específicas y anular los valores de las variables definidas en la animación de nivel superior.

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

### Encadenar animaciones

Varias animaciones pueden conectarse entre sí para integrar una gran secuencia. Puede crear efectos de sincronización mediante sobreposiciones en un video, al elaborar animaciones en el arreglo `animations` que se encuentra dentro del componente [`amp-animation`](../../../../documentation/components/reference/amp-animation.md).

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

Con esta configuración se reproduce cada animación de forma secuencial durante 3 segundos.

En el caso de las animaciones más amplias, las animaciones que estén dentro del arreglo `animations` están aptas para hacer referencia a otros componentes como [`amp-animation`](../../../../documentation/components/reference/amp-animation.md).

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

### Generar animaciones de una cantidad desconocida de elementos

Mediante el uso de las [expresiones](../../../../documentation/components/reference/amp-animation.md)`var()` y `calc()`  junto con las [extensiones CSS](../../../../documentation/components/reference/amp-animation.md#css-extensions), puede elaborar animaciones complejas y elaboradas que funcionen con cualquier cantidad de elementos. Esto permite que los datos dinámicos y generados por el usuario produzcan animaciones de forma sencilla y natural.

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

- Declarar una variable, `--duration`, y asignarle un valor de dos segundos.
- Establecer `duration` con el valor de la variable `--duration`.
- Calcular el retraso implementado en cada elemento con el que se agrupa el selector `.card`.
    1. En la [extensión](../../../../documentation/components/reference/amp-animation.md#css-length()-extension)`length()` se calcula cuántos elementos `.card` se seleccionaron.
    2. A continuación, length resta cada [index()](../../../../documentation/components/reference/amp-animation.md#css-index()-extension) de `.card`.
    3. El valor que resulta se multiplica por la variable `--duration`.
    4. La suma total se implementa en los segundos que se retrasa ese elemento.
- La animación se implementa de forma individual en cada elemento para que los cards se reorganicen de forma sucesiva en lugar de que lo hagan al mismo tiempo.

Abra la animación en el reproductor de AMP y agregue más elementos [`amp-img`](../../../../documentation/components/reference/amp-img) para probar este comportamiento.

### Lucen geniales en cualquier lugar

Las animaciones pueden incluir [`conditions`](../../../../documentation/components/reference/amp-animation.md#conditions) que permiten efectos personalizados. Ajuste las animaciones para cualquier tamaño de pantalla mediante la [condicional `media`](../../../../documentation/components/reference/amp-animation.md#media-query) para que sean compatibles con las versiones anteriores de los navegadores al habilitar las [condicionales `supports` ](../../../../documentation/components/reference/amp-animation.md#supports-condition) en un [estado`switch` ](../../../../documentation/components/reference/amp-animation.md#animation-switch-statement).

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
