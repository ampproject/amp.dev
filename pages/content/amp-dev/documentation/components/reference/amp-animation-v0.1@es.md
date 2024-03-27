---
$title: amp-animation
$category@: presentation
teaser:
  text: Define y muestra una animación.
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



Define y ejecuta animaciones.

<table>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-animation" src="https://ampjs.org/v0/amp-animation-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/main/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>


## Descripción general <a name="overview"></a>

Las animaciones de AMP se basan en la [API de Web Animations](https://www.w3.org/TR/web-animations/) para definir y ejecutar animaciones en documentos de AMP.

## Formato <a name="format"></a>

Los elementos `amp-animation` definen las animaciones como una estructura JSON.

### Especificación de la animación de nivel superior <a name="top-level-animation-specification"></a>

El objeto de nivel superior define un proceso de animación que consta de un número arbitrario de componentes de animación definidos como una matriz `animations`:
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

### Ubicación en DOM <a name="placement-in-dom"></a>

`<amp-animation>` solo se puede colocar como elemento secundario directo del elemento `<body>` si se cumple que `trigger="visibility"`. Se puede colocar en cualquier parte del DOM si no se define `trigger` y la reproducción de la animación se controla de forma automática a través de sus acciones.

### Componentes de animación <a name="animation-component"></a>

Cada componente de la animación es un [efecto de fotogramas clave (keyframe effect)](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect) compuesto por:

- Elementos "target", a los que se hace referencia mediante un selector
- Condiciones: media query y condición "supports"
- Propiedades de tiempo
- Fotogramas clave

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

### Condiciones <a name="conditions"></a>

Las condiciones pueden definir si este componente de animación se incluye en la animación final.

#### Media query <a name="media-query"></a>

La media query se puede especificar mediante la propiedad `media`, que puede contener cualquier expresión permitida de la API de [Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), y que se corresponde con la regla de CSS `@media`.

Si se define un valor de un componente de animación, dicho componente solo se incluirá si la media query coincide con el entorno actual.

#### Condición "supports" <a name="supports-condition"></a>

Esta condición se puede especificar utilizando la propiedad `supports`. Puede contener cualquier expresión permitida para el API de [CSS.supports](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) y se corresponde con la regla de CSS `@supports`.

Si se define un valor de un componente de animación, dicho componente solo se incluirá si la condición "supports" coincide con el entorno actual.

### Instrucción de animación `switch` <a name="animation-switch-statement"></a>

En algunos casos, es conveniente combinar en una única animación varias [animaciones condicionales](#conditions) con un valor predeterminado opcional. Esto se puede hacer mediante la declaración de animación `switch`, siguiendo este formato:

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

En la animación `switch`, los candidatos se evalúan en el orden definido y se ejecuta la primera animación que coincida con las [declaraciones condicionales](#conditions), mientras que el resto se ignoran.

Por ejemplo, esta animación ejecuta la animación de trayectoria de movimiento si se admite; de lo contrario, utiliza la propiedad "transform" como respaldo:
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

### Variables <a name="variables"></a>

Los componentes de animación pueden declarar variables de CSS que se utilizarán para los valores de tiempo y de fotogramas clave mediante las expresiones `var()`, ``que se evalúan mediante el contexto actual del target. Las variables de CSS especificadas en los componentes de animación se propagan a animaciones anidadas y se aplican a los targets de animación. Como consecuencia, estas serán las que se utilicen en las animaciones finales.

Por ejemplo:
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

En este ejemplo:

- `--delay` se propaga a las animaciones anidadas y se utiliza como retraso de la animación de `#target1`.
- `--x` se propaga a las animaciones anidadas, pero se anula mediante la animación `#target1` y se utiliza posteriormente para la propiedad `transform`.
- `--y` no se ha especificado en ninguna parte de `<amp-animation>` y, por lo tanto, se consultará en el elemento `#target1`. Si no se define en CSS, el valor predeterminado es `0px`.

Para obtener más información sobre `var()`, consulta la [sección sobre `var()` y `calc()`](#var-and-calc-expressions).

### Propiedades de tiempo <a name="timing-properties"></a>

Los componentes de animación y animación de nivel superior pueden contener propiedades de tiempo, las cuales se definen detalladamente en el diccionario de [AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties) de la especificación de Web Animation. El conjunto de propiedades permitidas incluye:

<table>
  <tr>
    <th class="col-twenty">Propiedad</th>
    <th class="col-twenty">Tipo</th>
    <th class="col-twenty">Valor predeterminado</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>hora</td>
    <td>0</td>
    <td>Duración de la animación. Puede ser un valor numérico en milisegundos o un valor de tiempo de CSS, como `2s`.</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>hora</td>
    <td>0</td>
    <td>Retraso antes de que la animación comience a ejecutarse. Puede ser un valor numérico en milisegundos o un valor de tiempo de CSS, como `2s`.</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>hora</td>
    <td>0</td>
    <td>Tiempo posterior a la finalización de la animación que tiene que transcurrir para que se considere del todo finalizada. Puede ser un valor numérico en milisegundos o un valor de tiempo de CSS, como `2s`.</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>número o<br>"Infinity" o<br>"infinite"</td>
    <td>1</td>
    <td>Número de veces que se repite el efecto de animación.</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>número o CSS</td>
    <td>0</td>
    <td>Compensación horaria tras la cual se activa el efecto de animación.</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>cadena</td>
    <td>"linear"</td>
    <td><a href="https://www.w3.org/TR/web-animations/#timing-function">Función de tiempo</a> que se utiliza para modificar el transcurso del tiempo para producir efectos de easing.</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>cadena</td>
    <td>"normal" </td>
    <td>Uno de los siguientes valores: "normal", "reverse", "alternate" o "alternate-reverse".</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>cadena</td>
    <td>"none"</td>
    <td>Uno de los siguientes valores: "none", "forwards", "backwards", "both" o "auto".</td>
  </tr>
</table>

Todas las propiedades de tiempo admiten valores numéricos o de cadena directos, así como de CSS. Por ejemplo, "duration" se puede definir como `1000`, `1s` o `1000ms`. Además, también se admiten las expresiones `calc()`, `var()` y otras expresiones de CSS.

Ejemplo de propiedades de tiempo en JSON:
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

Los componentes de animación heredan las propiedades de tiempo especificadas para la animación de nivel superior.

### Subtargets <a name="subtargets"></a>

En cualquier lugar donde se pueda especificar `selector`, también es posible especificar `subtargets: []`. Los subtargets pueden anular las propiedades de tiempo o las variables que se definen en la animación de subtargets específicos indicados mediante un índice o un selector de CSS.

Por ejemplo:
```text
{
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

En este ejemplo, todos los targets que coincidan con ".target" tendrán de forma predeterminada un retraso de 100 ms y un "--y" de 100 píxeles. Sin embargo, se anula el primer target (`index: 0`) para tener 200 ms de retraso, y los targets impares se anulan para tener un "--y" de 200 píxeles.

Ten en cuenta que varios subtargets pueden coincidir con un target.

### Fotogramas clave (keyframes) <a name="keyframes"></a>

Los fotogramas clave se pueden especificar de las formas que se describen en la [sección de fotogramas clave](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) de la especificación de Web Animations o como una cadena que haga referencia al nombre `@keyframes` en el CSS.

A continuación, se muestran algunos ejemplos típicos de definiciones de fotogramas clave.

El formato abreviado de notación de objeto "to" define el estado final en 100 %:
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

El formato abreviado de notación de objeto "from-to" define los estados inicial y final en 0 y 100 %:
```text
{
  "keyframes": {
    "opacity": [1, 0],
  "transform": ["scale(1)", "scale(2)"]
}
}
```

El formato abreviado de notación de objeto "value-array" define varios valores para las compensaciones de estado inicial, de estado final y múltiples (con espaciado equidistante):
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
    "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
  }
}
```

El formato de notación de matriz define los fotogramas clave. Las compensaciones se asignan automáticamente a 0, 100 % y con espaciado equidistante:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
    {"opacity": 0, "transform": "scale(2)"}
  ]
}
```

El formato de notación de matriz también puede incluir" "offset" (compensación) de forma explícita:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

El formato de notación de matriz también puede incluir "easing":
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Para obtener más información sobre los formatos de fotogramas clave, consulta [la especificación de Web Animations](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument).

Los valores de propiedad admiten cualquier valor de CSS válido, como `calc()`, `var()` y otras expresiones.

#### Fotogramas clave de CSS <a name="keyframes-from-css"></a>

Los fotogramas clave también se pueden especificar en la hoja de estilo del documento (etiqueta `<style>`) como reglas de CSS `@keyframes`. Por ejemplo:
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

Los `@keyframes` de CSS son, en su mayoría, equivalentes a la definición de fotogramas clave insertados del JSON, tal y como se describe en la [especificación de Web Animations](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument). Sin embargo, hay algunos matices:

- Para lograr la compatibilidad con una amplia variedad de plataformas, pueden ser necesarios los prefijos de proveedor, como `@-ms-keyframes {}` o `-moz-transform`. No son necesarios y no se admiten en el formato JSON, pero podrían requerirse en CSS.
- Las plataformas que no admiten `calc()` y `var()` no podrán aprovechar las ventajas de los polyfills de `amp-animation` cuando se especifiquen los fotogramas clave en CSS. Por lo tanto, se recomienda incluir siempre valores de respaldo en CSS.
- No se pueden utilizar las extensiones de CSS como [`width()`, `height()`, `num()`, `rand()`, `index()` y `length()`](#css-extensions).

#### Propiedades de fotogramas clave incluidas en la lista blanca <a name="allow-listed-properties-for-keyframes"></a>

No se pueden utilizar todas las propiedades de CSS en los fotogramas clave, ya que solo aparecen en la lista blanca las que los navegadores modernos pueden optimizar y animar rápidamente. Esta lista aumentará a medida que se confirme el buen rendimiento de otras propiedades. Por ahora, la lista incluye:
- [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)

Ten en cuenta que el uso de propiedades de CSS con prefijo de proveedor no es necesario ni está permitido.

### Formas abreviadas de la configuración de animación <a name="abbreviated-forms-of-animation-configuration"></a>

Si la animación se compone de un único elemento y solo hace falta un efecto de fotogramas clave, la configuración se puede limitar a este componente de animación. Por ejemplo:
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

Si la animación está formada por una lista de componentes, pero no tiene una animación de nivel superior, la configuración se puede limitar a una matriz de componentes. Por ejemplo:
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

### Composición de la animación <a name="animation-composition"></a>

Las animaciones pueden hacer referencia a otras animaciones, combinando así varias declaraciones `amp-animation` en una única animación final. Este procedimiento es parecido a la anidación. Separar las animaciones en diferentes elementos tiene la ventaja de poder reutilizar la misma animación en varios lugares o de hacer que cada declaración de animación sea más pequeña y fácil de gestionar.

Por ejemplo:
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

En este ejemplo, se incluye la animación "anim2" como parte de "anim1". "anim2" se incluye sin un target (`selector`). En ese caso, la intención es que la animación incluida haga referencia a su propio target.

Otro procedimiento permite que la animación incluida proporcione uno o varios targets. En ese caso, la animación incluida se ejecuta para cada target que coincida. Por ejemplo:
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

En este caso, tanto si ".target-class" coincide con un elemento, con varios o con ninguno, "anim2" se ejecuta para cada target con el que coincida.

Las variables y las propiedades de tiempo especificadas en la animación de llamada también se transmiten a la animación incluida.

### Expresiones `var()` y `calc()` <a name="var-and-calc-expressions"></a>

`amp-animation` permite el uso de las expresiones `var()` y `calc()` para los valores de tiempo y los fotogramas clave.

Por ejemplo:
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

Tanto `var()` como `calc()` añaden un polyfill en las plataformas que no las admiten directamente. Las propiedades de `var()` se extraen de los elementos target correspondientes. Sin embargo, es imposible proporcionar un polyfill completo para `var()`. Por lo tanto, si la compatibilidad es importante, se recomienda encarecidamente incluir valores predeterminados en las expresiones `var()`. Por ejemplo:
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

Los componentes de animación pueden definir sus propias variables como campos `--var-name`. Estas variables se propagan a las animaciones anidadas y anulan las variables de los elementos target especificados en la hoja de estilo (etiqueta `<style>`). Las expresiones `var()` intentan en primer lugar resolver los valores de las variables definidas en las animaciones y, a continuación, consultan los estilos target.

### Extensiones de CSS <a name="css-extensions"></a>

`amp-animation` proporciona varias extensiones de CSS para las necesidades típicas de las animaciones: `rand()`, `num()`, `width()` y `height()`. Estas funciones se pueden utilizar en los lugares que admiten valores de CSS dentro de `amp-animation`, incluidos los valores de tiempo y de fotogramas clave.

#### Extensión `index()` de CSS <a name="css-index-extension"></a>

La función `index()` devuelve un índice del elemento target actual del efecto de animación. Es especialmente útil cuando se utilizan varios targets animados con el mismo efecto mediante la propiedad `selector`. El primer target que coincida con el selector tendrá el índice `0` , el segundo tendrá el índice `1` y así sucesivamente.

Entre otras cosas, esta propiedad se puede combinar con expresiones `calc()` y utilizar para crear un efecto escalonado. Por ejemplo:
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
}
```

#### Extensión `length()` de CSS <a name="css-length-extension"></a>

La función `length()` devuelve el número de elementos target incluidos en el efecto de animación. Es más útil cuando se combina con `index()`:

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### Extensión `rand()` de CSS <a name="css-rand-extension"></a>

La función `rand()` devuelve un valor de CSS aleatorio. Se puede utilizar de dos maneras:

La primera no incluye argumentos, y devuelve simplemente un número aleatorio entre 0 y 1.
```
{
  "delay": "calc(10s * rand())"
  }
```

La segunda incluye dos argumentos, y devuelve un valor aleatorio que se encuentra entre ellos.
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### Extensiones `width()` y `height()` de CSS <a name="css-width-and-height-extensions"></a>

Las extensiones `width()` y `height()` devuelven respectivamente la anchura y la altura del elemento animado o del elemento que especifica el selector, en píxeles (p. ej., `100px`).

Se admiten los siguientes formatos:

- `width()` y `height()`: anchura o altura del elemento animado.
- `width('.selector')` y `height('.selector')`: anchura o altura del elemento que especifica el selector. Se puede utilizar cualquier selector de CSS, como `width('#container &gt; li')`.
- `width(closest('.selector'))` y `height(closest('.selector'))`: anchura o altura del elemento que especifica el selector más cercano.

`width()` y `height()` son especialmente útiles para las transformaciones. Las propiedades de CSS como `left` y `top` que pueden utilizar valores con `%` para definir las proporciones de las animaciones respecto al tamaño del contenedor. Sin embargo, la propiedad `transform` interpreta los valores `%` de forma diferente: como un porcentaje del elemento seleccionado. Por lo tanto, `width()` y `height()` se pueden utilizar para definir transformaciones en las animaciones en lo que respecta a elementos contenedores u otros similares.

Estas funciones se pueden combinar con `calc()`, `var()` y otras expresiones de CSS. Por ejemplo:
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### Extensión `num()` de CSS <a name="css-num-extension"></a>

La función `num()` devuelve una representación numérica de un valor de CSS. Por ejemplo:

- `num(11px)` devuelve `11`
- `num(110ms)` devuelve `110`
- etc.

Por ejemplo, la siguiente expresión calcula el retraso en segundos proporcional a la anchura del elemento:
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### Animaciones SVG <a name="svg-animations"></a>

El formato SVG es excelente y, por ello, recomendamos su uso en las animaciones.

Las animaciones con SVG se basan en las mismas propiedades de CSS que se describen en la sección [Propiedades de fotogramas clave incluidas en la lista blanca](#allow-listed-properties-for-keyframes), con algunos matices:

* Los elementos SVG de IE y Edge [no son compatibles con el CSS de las propiedades `transform`](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/). La propia animación de `transform` utiliza un polyfill. Sin embargo, no se aplica el estado inicial definido en una hoja de estilo. Si el estado de transformación inicial es importante para IE o Edge, se recomienda duplicarlo mediante el [atributo `transform` de SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform).
* Aunque se incluye un polyfill del CSS de `transform` para IE y Edge, no se puede incluir para `transform-origin`. Por lo tanto, cuando se quiera lograr la compatibilidad con IE o Edge, se recomienda utilizar únicamente la forma predeterminada de `transform-origin`.
* Actualmente, la mayoría de los navegadores tienen problemas para interpretar correctamente el CSS de `transform-origin`. Para obtener más información, consulta los problemas habituales en [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300), [Safari](https://bugs.webkit.org/show_bug.cgi?id=174285) y [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340). La mayor parte de esta confusión se debería solucionar una vez que se implemente el CSS de [`transform-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box). Si `transform-origin` tiene importancia, se recomienda incluir también el CSS de `transform-box` que se necesite, por cuestiones de compatibilidad futura.

## Activar la animación <a name="triggering-animation"></a>

La animación se puede activar mediante un atributo `trigger` o una acción `on`.

### Atributo `trigger` <a name="trigger-attribute"></a>

Actualmente, `visibility` es el único valor disponible para el atributo `trigger`. `visibility` se activa cuando el documento o la inserción subyacente están visibles en el viewport.

Por ejemplo:
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
    ...
  </amp-animation>
```

### Activar mediante la acción `on` <a name="triggering-via-on-action"></a>

Por ejemplo:

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## Acciones de `on` <a name="on-actions"></a>

El elemento `amp-animation` exporta las siguientes acciones:

* `start`: inicia la animación si aún no se está ejecutando. Las propiedades y las variables de tiempo se pueden especificar como argumentos de acción; por ejemplo, `anim1.start(delay=-100, --scale=2)`.
* `restart`: inicia la animación o reinicia la que se está ejecutando. Las propiedades y las variables de tiempo se pueden especificar como argumentos de acción; por ejemplo, `anim1.start(delay=-100, --scale=2)`.
* `pause`: pausa la animación que se está ejecutando.
* `resume`: reactiva la animación que se está ejecutando.
* `togglePause`: alterna entre las acciones de pausa y reactivación.
* `seekTo`: detiene la animación y busca el momento especificado por el argumento `time` en milisegundos o por el argumento `percent` como un punto porcentual en la línea de tiempo.
* `reverse`: invierte la animación.
* `finish`: finaliza la animación.
* `cancel`: cancela la animación.
