---
$category@: presentation
formats:
- websites
teaser:
  text: Formato enriquecido de narrativa de marca con elementos visuales.
---



<!---
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

# amp-story

<table>
  <tr>
    <td width="40%"><strong>Descripción</strong></td>
    <td>Formato enriquecido de narrativa de marca con elementos visuales.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Disponibilidad</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">Experimental</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Diseños admitidos</a></strong></td>
    <td>ninguno</td>
  </tr>
  <tr>
    <td width="40%"><strong>Ejemplos</strong></td>
    <td><ul>
      <li>Consulta el ejemplo <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> de AMP By Example.</li>
      <li>Echa un vistazo al tutorial <a href="https://www.ampproject.org/docs/tutorials/visual_story">Crear una historia AMP visual</a>.</li>
    </ul></td>
  </tr>
</table>

[tip type="caution"]
Este componente es experimental y se encuentra en proceso de desarrollo. Si tienes algún problema, [envía una incidencia en GitHub](https://github.com/ampproject/amphtml/issues/new).
[/tip]

## Notas de la versión

| Versión | Descripción                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | Versión actual, desde el 16/07/2018.                                     |
| 0.1     | Implementación inicial.  Está obsoleta y se eliminará el 19/03/2019. |

## Migrar de 0.1 a 1.0

Desde el 16/07/2018, la versión 0.1 se considera obsoleta y se eliminará el 19/03/2019.  Esto puede provocar pequeños puntos de ruptura, ya que las historias se actualizarán automáticamente para que utilicen la versión 1.0.  Recomendamos migrar las páginas de forma manual a la versión 1.0 antes de esta fecha para asegurar que su funcionamiento y diseño sean los correctos.

### Nuevas funciones de enmarcado

Hemos añadido nuevas funciones al enmarcado de amp-stories, lo que permite una mayor compatibilidad con los componentes y diseños visuales más completos. Algunos de los cambios son:

* Los proveedores de redes sociales se ordenan de acuerdo con la configuración de JSON.
* Nuevos componentes de enmarcado:
    * Enlaces de llamada a la acción
    * Cuadro de texto
    * Tarjetas verticales y horizontales</li>

Para utilizar estas nuevas funciones, añade una etiqueta `<amp-story-bookend>` como último elemento secundario de tu `<amp-story>` con los atributos obligatorios, de la siguiente manera:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` and `layout=nodisplay` are required. -->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
<amp-story>
```

Obtén más información sobre los nuevos componentes y cómo especificarlos en la configuración de JSON en la sección [amp-story-bookend](#bookend-amp-story-bookend).

### Nuevos requisitos de metadatos

Hemos añadido nuevos atributos de metadatos al elemento `<amp-story>`, que se utilizarán para mostrar una vista previa de la historia en el ecosistema de historias AMP. Estos atributos se pueden utilizar, por ejemplo, para renderizar un enlace de vista previa atractivo en el enmarcado de una historia relacionada. Si proporcionas estos atributos, también podrás asegurarte de que tu historia está preparada para proporcionar experiencias aún más enriquecidas e integradas en los soportes de historias AMP del futuro.

[sourcecode:html]
<!-- pronto se requerirá </code>title<code>, </code>publisher<code>, </code>publisher-logo-src<code> y </code>poster-portrait-src.  -->
<amp-story title="My Story" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> y <code>poster-landscape-src</code> son opcionales, pero se recomienda su uso. -->
<amp-story title="My Story" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
[/sourcecode]

  Ten en cuenta que estos atributos de metadatos complementan a los datos estructurados (por ejemplo, JSON-LD) de la página, pero no los sustituyen. Te recomendamos que añadas [datos estructurados](https://developers.google.com/search/docs/data-types/article#amp-sd) a todas tus páginas AMP, incluidas las de historias.

  Los nuevos atributos son:

  | ATRIBUTO | DESCRIPCIÓN |
  |--|--|
  | `title` [obligatorio] | Título de la historia. |
  | `publisher` [obligatorio] | Nombre del editor de la historia. |
  | `publisher-logo-src` [obligatorio] | Logotipo del editor en formato cuadrado (relación de aspecto de 1x1). |
  | `poster-portrait-src` [obligatorio] | Póster de la historia en formato vertical (relación de aspecto de 3x4). |
  | `poster-square-src` | Póster de la historia en formato cuadrado (relación de aspecto de 1x1). |
  | `poster-landscape-src` | Póster de la historia en formato horizontal (relación de aspecto de 4x3). |

#### Directrices de `publisher-logo-src`

Las siguientes directrices afectan a la imagen del logotipo del editor:

* El archivo debe ser una imagen de trama, como `.jpg`, `.png` o `.gif`.  Evita los archivos vectoriales, como `.svg` o `.eps`.
* Se deben evitar las imágenes animadas, como los gifs.
* El color de fondo no debe impedir que se pueda leer la parte gráfica del logotipo.

<table>
  <tr>
    <td>
      <amp-img alt="Logo with blue text on white background" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="Logo with blue text on white background" src="img/publisher-logo-1.png">
          </noscript>
        </amp-img>
        Adecuado
      </td>
      <td>
        <amp-img alt="Logo with white text on blue background" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
          <noscript>
            <img alt="Logo with white text on blue background" src="img/publisher-logo-2.png">
            </noscript>
          </amp-img>
          Adecuado
        </td>
        <td>
          <amp-img alt="Logo with blue text on blue background" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
            <noscript>
              <img alt="Logo with blue text on blue background" src="img/publisher-logo-3.png">
              </noscript>
            </amp-img>
            No adecuado
          </td>
        </tr>
      </table>

      * La forma del logotipo debe ser un cuadrado, no un rectángulo.
      * El color de fondo no debe ser transparente.
      * Utiliza un logotipo por cada marca; debe ser el mismo en todas las historias AMP.
      * El logotipo debe ser de al menos 96x96 píxeles.

#### Directrices de imágenes de póster (para `poster-portrait-src`, `poster-landscape-src` y `poster-square-src`)

Las siguientes directrices se aplican a las imágenes de póster de las historias:

* La imagen de póster debe ser representativa de la historia AMP en su conjunto.
* El usuario debe poder verla al iniciar la historia AMP.  Sin embargo, la URL del archivo de imagen utilizada en los metadatos no tiene que coincidir con la URL utilizada en la primera página de la historia,  ya que, con el objetivo de lograr la vista previa deseada, la primera puede incluir cambios de tamaño o de estilo, o puede ser un recorte.
* Debe ser un archivo de imagen de trama, como `.jpg`, `.png` o `.gif`.  Evita los archivos de imágenes vectoriales, como `.svg` o `.eps`.
* Debe tener una relación de aspecto de 3x4 en el formato vertical, de 4x3 en el horizontal y de 1x1 en el cuadrado.
* Si se deriva de un marco de un vídeo, la miniatura debe ser representativa del vídeo. Por ejemplo, el primer marco de un vídeo no suele ser representativo.
* Debe cumplir el tamaño mínimo recomendado:
    * Vertical: 696x928 píxeles
    * Horizontal: 928x696 píxeles
    * Cuadrado: 928x928 píxeles</li>

## Descripción general

La extensión `amp-story` proporciona un formato nuevo para mostrar contenido visual y combinarlo para crear una experiencia narrativa. Las historias AMP sirven para proporcionar a los usuarios contenido e información visualmente atractivos y en pequeñas dosis.

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="AMP Story Example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

## Formato de historia AMP

Una [historia AMP](#story%3a-amp-story) es un documento AMP HTML completo que se compone de [páginas](#pages%3a-amp-story-page), dentro de las cuales hay diferentes [capas](#layers%3a-amp-story-grid-layer), en las que se incluyen elementos de AMP y de HTML, como contenido multimedia, analíticas, texto, etc.

<amp-img alt="AMP story tag hierarchy" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="AMP story tag hierarchy" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
    </noscript>
  </amp-img>

### Plantilla

El siguiente código es un buen punto de partida o plantilla. Cópialo y guárdalo en un archivo con extensión `.html`.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>Hello, amp-story</title>
    <link rel="canonical" href="http://example.ampproject.org/my-story.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal
    both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none
        }
      </style>
    </noscript>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="my-first-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>Hello, amp-story!</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="my-second-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg2.gif" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>The End</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-bookend src="bookendv1.json" layout="nodisplay">
      </amp-story-bookend>
    </amp-story>
  </body>
</html>
```

El contenido del cuerpo crea una historia con 2 páginas.  Cada página tiene una imagen de fondo con sangrado completo y una sencilla cadena de texto encima.

### Marcado obligatorio de amp-story

El formato HTML de una historia AMP sigue los [mismos requisitos de marcado que un documento AMP HTML válido](https://www.ampproject.org/docs/reference/spec#required-markup), junto con los siguientes requisitos adicionales:

| REGLA | DESCRIPCIÓN |
|----|---|
| El elemento `<amp-story standalone>` es el único elemento secundario de `<body>`. | Identifica que el documento es una historia AMP. |
| Incluye una etiqueta `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` como tercer elemento secundario de `<head>`. | Incluye y carga la biblioteca JS de amp-story. |
| Incluye una etiqueta `<link rel="canonical" href="$STORY_URL">` dentro de `<head>`. | El enlace dirige a la propia historia y la identifica como el documento canónico. |

## Historia: `amp-story`

El componente `amp-story` representa una historia completa.  Se encarga de implementar el esqueleto de la UI, que incluye la gestión de los gestos y del desplazamiento, y la inserción de la UI del esqueleto de la aplicación (controles, barra de progreso, etc.).

<figure class="centered-fig">
  <amp-anim alt="amp-story example" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="amp-story example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

### Ejemplo

```html
<amp-story
    standalone
    title="My Story"
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg"
    background-audio="my.mp3">
    <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-bookend src="./related.json"></amp-story-bookend>
</amp-story>
```

### Atributos

##### standalone [obligatorio]

Identifica que el documento AMP es una historia.

##### title [obligatorio]

Título de la historia.

##### publisher [obligatorio]

Nombre del editor de la historia.

##### publisher-logo-src [obligatorio]

URL que dirige al logotipo del editor de la historia en formato cuadrado (relación de aspecto de 1x1). Por ejemplo, `publisher-logo-src="https://example.com/logo/1x1.png"`, en la cual 1x1.png es un logotipo de 36x36 píxeles.

##### poster-portrait-src [obligatorio]

URL que dirige al [póster de la historia](#posters) en formato vertical (relación de aspecto de 3x4).

##### supports-landscape [opcional]

Habilita la compatibilidad con la posición horizontal en los dispositivos móviles y ofrece un modo inmersivo de sangrado completo en los ordenadores.

##### background-audio [opcional]

URL que dirige a un archivo de audio que se reproduce mientras dura la historia.

##### poster-square-src [opcional]

URL que dirige al [póster de la historia](#posters) en formato cuadrado (relación de aspecto de 1x1).

##### poster-landscape-src [opcional]

URL que dirige al [póster de la historia](#posters) en formato horizontal (relación de aspecto de 4x3).

### Pósteres

El "póster" es una imagen que se muestra en la UI hasta que se carga la historia. Suele ser la primera pantalla de la historia, aunque puedes utilizar cualquier imagen que sea representativa de ella.

### Elementos secundarios de amp-story

El componente `<amp-story>` contiene uno o varios componentes [`<amp-story-page>`](#pages%3a-amp-story-page), en los que se incluyen cada una de las pantallas de la historia.  La primera página que especifiques en el orden del documento será la primera página que se muestre en la historia.

### Habilitar la orientación horizontal y la experiencia de escritorio con sangrado completo

Si se especifica el atributo `supports-landscape` en el elemento `<amp-story>`:

* La historia se podrá ver cuando un dispositivo móvil esté en posición horizontal.
* Se cambiará el diseño en ordenadores a un modo inmersivo con sangrado completo, sustituyendo al diseño predeterminado de tres paneles verticales.

Uso: `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">Antes:</span>
  <amp-anim alt="Desktop three panels experience" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">Después:</span>
  <amp-anim alt="Desktop full bleed experience" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## Páginas: `amp-story-page`

El componente `<amp-story-page>` representa el contenido que se mostrará en una sola página de la historia.

<figure class="centered-fig">
  <amp-anim alt="Page 1 example" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="Page 1 example" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
  </figure>
  <figure class="centered-fig">
    <amp-anim alt="Page 2 example" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
      <noscript>
        <img alt="Page 2 example" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
        </noscript>
      </amp-anim>
    </figure>

### Ejemplo

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>These are the Top 5 World's Most...</h1>
    <p>Jon Bersch</p>
    <p>May 18</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### Atributos

##### id [obligatorio]

Identificador único de la página que se puede utilizar para aplicar estilo a esta y a sus descendientes en CSS, y que también se utiliza para identificar de forma exclusiva la página en el fragmento de URL.

##### auto-advance-after [opcional]

Especifica cuándo se pasa automáticamente a la siguiente página.  Si se omite, no se pasa de página automáticamente. El valor de `auto-advance-after` debe ser uno de estos dos:

* Un valor positivo de [tiempo](https://developer.mozilla.org/en-US/docs/Web/CSS/time) de espera antes de pasar automáticamente de página.
* El ID de un [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) o de un video-interface cuya finalización hará que se pase automáticamente de página.

Por ejemplo:

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio [opcional]

URI que dirige a un archivo de audio que se reproduce mientras el usuario se encuentra en esa página.

Por ejemplo:

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### Elementos secundarios de amp-story-page

El componente `<amp-story-page>` contiene una o varias [capas](#layers)  que se apilan de abajo a arriba (la primera capa especificada en el DOM está en la parte inferior; y la última, en la parte superior).

## Capas

Las capas se apilan unas sobre otras para crear el efecto visual deseado.

### `amp-story-grid-layer`

El componente `<amp-story-grid-layer>` configura sus elementos secundarios en una cuadrícula.  Su implementación se basa en la [especificación de CSS Grid](https://www.w3.org/TR/css-grid-1/).

<div class="flex-images">
  <amp-img alt="Layer 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Layer 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
    <span class="special-char">+</span>
    <amp-img alt="Layer 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
      <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
      <span class="special-char">=</span>
      <amp-img alt="Todas las capas" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
        <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
      </div>

#### Atributos

##### template [obligatorio]

El atributo `template` determina el diseño de la capa de cuadrícula. Las plantillas disponibles se describen en la sección [Plantillas](#templates) que aparece más abajo.

##### grid-area [opcional]

Este atributo se especifica en los elementos secundarios de `<amp-story-grid-layer>`. ``Especifica el área con nombre (a partir de una `template` que las define) en la que debe aparecer el elemento que contiene este atributo.

Ejemplo:

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Plantillas

A continuación, se indican las plantillas que se pueden aplicar al diseño de la capa de cuadrícula.

[tip type="success"]
Para ver cómo se usan las plantillas de diseño, consulta los [ejemplos de diseños en AMP By Example](https://ampbyexample.com/stories/features/layouts/).
[/tip]

##### fill

La plantilla `fill` muestra su primer sangrado completo secundario. El resto de los elementos secundarios no se muestran.

Áreas con nombre: (ninguna)

Ejemplo:

<amp-img alt="Fill template example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal template example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
    </noscript>
  </amp-img>

```html
  <amp-story-grid-layer template="fill">
    <amp-img src="cat.jpg"></amp-img>
  </amp-story-grid-layer>
```

##### vertical

La plantilla `vertical` distribuye sus elementos a lo largo del eje y.  De forma predeterminada, sus elementos están alineados con la parte superior y pueden ocupar toda la pantalla a lo largo del eje x.

Áreas con nombre: (ninguna)

<amp-img alt="Vertical template example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal template example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### horizontal

La plantilla `horizontal` distribuye sus elementos a lo largo del eje x. De forma predeterminada, sus elementos están alineados con el principio de la línea y pueden ocupar toda la pantalla a lo largo del eje y.

Áreas con nombre: (ninguna)

<amp-img alt="Horizontal template example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal template example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### thirds

La plantilla `thirds` divide la pantalla en tres filas de igual tamaño que puedes rellenar con contenido.

Áreas con nombre:

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="Horizontal template example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Thirds template example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Elementos secundarios

`amp-story-grid-layer` puede contener cualquiera de los siguientes elementos:

**Nota**: Esta lista se ampliará con el tiempo.

<table>
  <tr>
    <th width="40%">Área
    </th><th>Etiquetas admitidas </th>
  </tr>
  <tr>
    <td>Medios</td>
    <td>
      <ul>
        <li><code>&lt;amp-audio></code></li>
        <li><code>&lt;amp-gfycat></code></li>
        <li><code>&lt;amp-google-vrview-image></code></li>
        <li><code>&lt;amp-img></code></li>
        <li><code>&lt;amp-video></code></li>
        <li><code>&lt;source></code></li>
        <li><code>&lt;svg></code></li>
        <li><code>&lt;track></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Analíticas y medición</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Seccionamiento</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-&lt;h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Texto</td>
    <td>
      <ul>
        <li><code>&lt;abbr></code></li>
        <li><code>&lt;amp-fit-text></code></li>
        <li><code>&lt;amp-font></code></li>
        <li><code>&lt;amp-gist></code></li>
        <li><code>&lt;b></code></li>
        <li><code>&lt;bdi></code></li>
        <li><code>&lt;bdo></code></li>
        <li><code>&lt;blockquote></code></li>
        <li><code>&lt;br></code></li>
        <li><code>&lt;cite></code></li>
        <li><code>&lt;code></code></li>
        <li><code>&lt;data></code></li>
        <li><code>&lt;del></code></li>
        <li><code>&lt;dfn></code></li>
        <li><code>&lt;div></code></li>
        <li><code>&lt;em></code></li>
        <li><code>&lt;figcaption></code></li>
        <li><code>&lt;figure></code></li>
        <li><code>&lt;hr></code></li>
        <li><code>&lt;i></code></li>
        <li><code>&lt;ins></code></li>
        <li><code>&lt;kbd></code></li>
        <li><code>&lt;main></code></li>
        <li><code>&lt;mark></code></li>
        <li><code>&lt;p></code></li>
        <li><code>&lt;pre></code></li>
        <li><code>&lt;q></code></li>
        <li><code>&lt;rp></code></li>
        <li><code>&lt;rt></code></li>
        <li><code>&lt;rtc></code></li>
        <li><code>&lt;ruby></code></li>
        <li><code>&lt;s></code></li>
        <li><code>&lt;samp></code></li>
        <li><code>&lt;small></code></li>
        <li><code>&lt;span></code></li>
        <li><code>&lt;strong></code></li>
        <li><code>&lt;sub></code></li>
        <li><code>&lt;sup></code></li>
        <li><code>&lt;time></code></li>
        <li><code>&lt;u></code></li>
        <li><code>&lt;var></code></li>
        <li><code>&lt;wbr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Listas</td>
    <td>
      <ul>
        <li><code>&lt;amp-list></code></li>
        <li><code>&lt;amp-live-list></code></li>
        <li><code>&lt;dd></code></li>
        <li><code>&lt;dl></code></li>
        <li><code>&lt;dt></code></li>
        <li><code>&lt;li></code></li>
        <li><code>&lt;ol></code></li>
        <li><code>&lt;ul></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tablas</td>
    <td>
      <ul>
        <li><code>&lt;caption></code></li>
        <li><code>&lt;col></code></li>
        <li><code>&lt;colgroup></code></li>
        <li><code>&lt;table></code></li>
        <li><code>&lt;tbody></code></li>
        <li><code>&lt;td></code></li>
        <li><code>&lt;tfoot></code></li>
        <li><code>&lt;th></code></li>
        <li><code>&lt;thead></code></li>
        <li><code>&lt;tr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Otro</td>
    <td>
      <ul>
      <li><code>&lt;amp-install-serviceworker></code></li>
      <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

El componente `<amp-story-cta-layer>` permite utilizar elementos `<a>` y `<button>` dentro de `<amp-story-page>`.

#### Restricciones

* Si se especifica, el elemento `<amp-story-cta-layer>` debe ser la última capa dentro de `<amp-story-page>`. Como resultado, cada `<amp-story-page>` puede tener, como mucho, un `<amp-story-cta-layer>`.
* La posición y el tamaño de esta capa no se pueden controlar: su anchura siempre es el 100 % de la página y su altura, el 20 %; siempre está alineada con la parte inferior de la página.

#### Ejemplo

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">Paragraph 1</div>
    <div class="content" grid-area="middle-third">Paragraph 2</div>
    <div class="content" grid-area="lower-third">Paragraph 3</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">Outlink here!</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="CTA Layer" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
    </noscript>
  </amp-img>

  [Ejemplo completo del directorio de ejemplos](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### Elementos secundarios

`amp-story-cta-layer` admite prácticamente los mismos elementos secundarios que `amp-story-grid-layer` junto con las etiquetas `<a>` y `<button>`.

Para obtener una lista actualizada de los elementos secundarios admitidos, asegúrate de echar un vistazo al campo [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) en las reglas de validación.

## Archivos adjuntos a la página

### `amp-story-page-attachment`

<amp-img alt="AMP Story page attachment" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="AMP Story page attachment" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
    </noscript>
  </amp-img>

  Puedes adjuntar contenido adicional a la página de una historia.

  Adjuntar archivos a las páginas de las historias te permite añadir contenido de AMP HTML adicional. Los usuarios pueden hacer que se muestre este contenido con un gesto de deslizamiento hacia arriba o tocando el elemento de llamada a la acción.
  Se mostrará un mensaje en la parte inferior de las páginas en las que se haya añadido un archivo adjunto invitando al usuario a abrirlo.

  `<amp-story-page-attachment>` debe ser el último elemento secundario de `<amp-story-page>` y tener el atributo `layout="nodisplay"`. Se espera que el contenido AMP HTML adjunto se inserte directamente en tu historia AMP, dentro de esta etiqueta `<amp-story-page-attachment>`.

### Contenido y componentes permitidos

Los archivos adjuntos de una página de historia admiten los mismos elementos HTML que AMP Story junto con otros componentes como reproductores de vídeo de terceros o elementos insertados de redes sociales. Esto significa que puedes añadir contenido adicional que incluye demasiado texto o que no está permitido en las páginas de AMP Story.

<details>
  <summary>Lista de los componentes de AMP que se pueden incluir en un archivo adjunto</summary>

  * `<amp-3d-gltf>`
  * `<amp-3q-player>`
  * `<amp-accordion>`
  * `<amp-audio>`
  * `<amp-beopinion>`
  * `<amp-bodymovin-animation>`
  * `<amp-brid-player>`
  * `<amp-brightcove>`
  * `<amp-byside-content>`
  * `<amp-call-tracking>`
  * `<amp-carousel>`
  * `<amp-dailymotion>`
  * `<amp-date-countdown>`
  * `<amp-embedly-card>`
  * `<amp-facebook>`
  * `<amp-facebook-comments>`
  * `<amp-facebook-like>`
  * `<amp-facebook-page>`
  * `<amp-fit-text>`
  * `<amp-fx-collection>`
  * `<amp-fx-flying-carpet>`
  * `<amp-gfycat>`
  * `<amp-gfycat>`
  * `<amp-gist>`
  * `<amp-gist>`
  * `<amp-google-document-embed>`
  * `<amp-google-vrview-image>`
  * `<amp-google-vrview-image>`
  * `<amp-hulu>`
  * `<amp-ima-video>`
  * `<amp-image-slider>`
  * `<amp-img>`
  * `<amp-imgur>`
  * `<amp-instagram>`
  * `<amp-izlesene>`
  * `<amp-jwplayer>`
  * `<amp-kaltura-player>`
  * `<amp-list>`
  * `<amp-list>`
  * `<amp-live-list>`
  * `<amp-live-list>`
  * `<amp-mathml>`
  * `<amp-mowplayer>`
  * `<amp-nexxtv-player>`
  * `<amp-o2-player>`
  * `<amp-ooyala-player>`
  * `<amp-pan-zoom>`
  * `<amp-pinterest>`
  * `<amp-playbuzz>`
  * `<amp-powr-player>`
  * `<amp-reach-player>`
  * `<amp-reddit>`
  * `<amp-riddle-quiz>`
  * `<amp-soundcloud>`
  * `<amp-springboard-player>`
  * `<amp-timeago>`
  * `<amp-twitter>`
  * `<amp-video>`
  * `<amp-video-iframe>`
  * `<amp-vimeo>`
  * `<amp-vine>`
  * `<amp-viqeo-player>`
  * `<amp-vk>`
  * `<amp-wistia-player>`
  * `<amp-yotpo>`
  * `<amp-youtube>`

</details>

### Ejemplo

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
  </amp-story-grid-layer>
  <amp-story-page-attachment layout="nodisplay">
  <h1>My title</h1>
  <p>Lots of interesting text with <a href="https://example.ampproject.org">links</a>!</p>
  <p>More text and a YouTube video!</p>
  <amp-youtube
      data-videoid="b4Vhdr8jtx0"
      layout="responsive"
      width="480" height="270">
  </amp-youtube>
  <p>And a tweet!</p>
  <amp-twitter
    data-tweetid="885634330868850689"
    layout="responsive"
    width="480" height="270">
  </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## Animaciones

Cualquier elemento de una `<amp-story-page>` puede tener una animación de entrada.

Puedes definir animaciones especificando un conjunto de [atributos de animación](#animation-attributes) en el elemento, no hace falta ninguna otra extensión ni configuración de AMP.

### Efectos de animación

Los siguientes efectos de animación están disponibles como preajustes para las historias AMP:

| Nombre del preajuste       | Duración predeterminada (ms) | Retraso predeterminado (ms) |
|-----------------|---------------------| ------------------ |
| `drop`            | 1600                  | 0 |
| `fade-in`         | 500                   | 0 |
| `fly-in-bottom`   | 500                   | 0 |
| `fly-in-left`     | 500                   | 0 |
| `fly-in-right`    | 500                   | 0 |
| `fly-in-top`      | 500                   | 0 |
| `pulse`           | 500                   | 0 |
| `rotate-in-left`  | 700                   | 0 |
| `rotate-in-right` | 700                   | 0 |
| `twirl-in`        | 1000                  | 0 |
| `whoosh-in-left`  | 500                   | 0 |
| `whoosh-in-right` | 500                   | 0 |
| `pan-left`        | 1000                  | 0 |
| `pan-right`       | 1000                  | 0 |
| `pan-down`        | 1000                  | 0 |
| `pan-up`          | 1000                  | 0 |
| `zoom-in`         | 1000                  | 0 |
| `zoom-out`        | 1000                  | 0 |

[tip type="success"]
Consulta un [ejemplo de animaciones de historias AMP](https://ampbyexample.com/stories/features/animations/) en AMP By Example.
[/tip]

### Atributos de animación

##### animate-in [obligatorio]

Utiliza este atributo para especificar el nombre del [preajuste de animación de entrada](#animation-effects).

*Ejemplo*: Un título que vuela desde la parte izquierda de la página.

```html

<h2 animate-in="fly-in-left">
  Fly from left!
</h2>

```

##### animate-in-duration [opcional]

Utiliza este atributo para especificar la duración de la animación de entrada, en segundos o milisegundos (p. ej., "0.2s" o "200ms"). La duración predeterminada depende del preajuste de animación que hayas especificado.

*Ejemplo*: Un título vuela desde la parte izquierda de la página y la animación termina en medio segundo.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  Fly from left!
</h2>

```

##### animate-in-delay [opcional]

Utiliza este atributo para especificar el retraso antes de iniciar la animación. El valor debe ser igual o superior a 0, en segundos o milisegundos (por ejemplo, "0.2s" o "200ms"). El retraso predeterminado depende del preajuste de animación que hayas especificado.

*Ejemplo*: Después de 0,4 segundos, un título vuela desde la parte izquierda de la página y completa su entrada en 0,5 segundos.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  Fly from left!
</h2>

```

[tip type="note"]
No se asegura que el tiempo de retraso de la animación vaya a ser exacto. Es posible que se produzcan retrasos adicionales al cargar la extensión `amp-animation` en segundo plano cuando se haya escaneado el primer elemento animado. El contrato de atributo se define como *retrasa esta animación durante al menos N milisegundos*. Esto se afecta a todos los elementos, incluidos los que tienen un retraso de 0 segundos.
[/tip]

##### animate-in-after [opcional]

Utiliza este atributo en un elemento para encadenar o secuenciar animaciones (por ejemplo, animation2 se inicia cuando termina animation1). Especifica el ID del elemento animado que irá antes que él, que debe estar presente en la misma `<amp-story-page>`. El retraso se aplica después de que la animación del elemento anterior haya finalizado. Para obtener más información, consulta la sección [Secuenciar animaciones](#sequencing-animations) que aparece más abajo.

Por ejemplo, en el código siguiente, `object2` se anima después de que `object1` haya completado su entrada:

```html
<amp-story-page id="page1">
  <amp-story-grid-layer template="vertical">
    <div id="object1"
        animate-in="rotate-in-left">
      1
    </div>
    <div id="object2"
        animate-in="fly-in-right"
        animate-in-after="object1">
      2. <!-- will start after object1 has finished -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

##### scale-start, scale-end [opcional, solo funciona con las animaciones `zoom-in` y `zoom-out`]

Utiliza estos dos atributos para dar más detalles sobre los parámetros de las animaciones de ampliar y reducir. El valor debe ser igual o superior a 0, y se admiten los decimales. El valor predeterminado es "scale-start: 1" y "scale-start: 3" para ampliar la imagen y los valores inversos para reducirla.

*Ejemplo*: Una imagen que crece de tamaño de 2 a 5 veces a lo largo de 4 segundos.

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [opcional, solo funciona con las animaciones `pan-left` y `pan-right`]

Utiliza este atributo para especificar el desplazamiento horizontal de la animación de la imagen, hacia la izquierda o hacia la derecha. El valor debe ser igual o superior a 0, en píxeles. El valor predeterminado hace que el desplazamiento sea por la anchura completa de la imagen especificada.

*Ejemplo*: Una imagen que se desplaza 200 píxeles a la izquierda a lo largo de 10 segundos.

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [opcional, solo funciona con las animaciones `pan-up` y `pan-down`]

Utiliza este atributo para especificar el desplazamiento vertical de la animación de la imagen, hacia arriba o hacia abajo. El valor debe ser igual o superior a 0, en píxeles. El valor predeterminado hace que el desplazamiento sea por la altura completa de la imagen especificada.

*Ejemplo*: Una imagen que se desplaza 50 píxeles hacia abajo a lo largo de 15 segundos.

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### Secuenciar animaciones

Para encadenar animaciones en una secuencia, utiliza el atributo `animate-in-after`. Todos los elementos de una cadena determinada deben estar presentes en el mismo `<amp-story-page>`. Los elementos sin el atributo `animate-in-after` no pertenecen a una cadena de secuencia, y comenzarán de forma independiente al entrar en la página.

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
        1. <!-- will start independently -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
        2. <!-- will start after fade-in-obj has finished -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
        3. <!-- will start after rotate-in-left-obj has finished -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
        1. <!-- will start independently -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### Combinar varias animaciones

Puedes aplicar varias animaciones de entrada a un mismo elemento. Por ejemplo, puedes hacer que un elemento vuele a la página y se vaya fundiendo con ella al mismo tiempo. No se puede asignar más de un preajuste de animación a cada elemento; no obstante, los elementos con diferentes animaciones de entrada se pueden anidar para combinarlos en uno solo.

```html
<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    I will fly-in and fade-in!
  </div>
</div>
```

[tip type="note"]
Si una animación compuesta tiene que empezar después del final de la animación de otro elemento, asegúrate de que todos los elementos anidados que componen la animación tengan el atributo `animate-in-after` asociado al mismo `id`.
[/tip]

## Enmarcado: `amp-story-bookend`

`amp-story-bookend` es la última pantalla de la historia. Contiene opciones para compartir, enlaces relacionados y de llamada a la acción, y mucho más.

<figure class="centered-fig">
  <amp-anim alt="related article example" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="related article example" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
      </noscript>
    </amp-anim>
  </figure>

  Para utilizarlo, incluye una etiqueta `<amp-story-bookend>` como elemento secundario de `<amp-story>` con el atributo obligatorio `layout=nodisplay`.
  A continuación, puedes especificar la configuración de JSON en un archivo independiente e importarla mediante el atributo `src` o bien insertarla directamente.

  Así se importa la configuración de JSON a través del atributo `src`:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `layout=nodisplay` is required. -->
  <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
<amp-story>
```

Si no quieres recuperar la configuración del enmarcado desde un servidor, también puedes insertarla:

```html
  <amp-story standalone>
    ...
    <amp-story-bookend layout=nodisplay>
      <script type="application/json">
        {
          bookendVersion: "v1.0",
          shareProviders: [ ... ],
        components: [ ... ]
      }
  </script>
</amp-story-bookend>
<amp-story>
```

  A continuación, debes rellenar la configuración de JSON, que es donde puedes personalizar el enmarcado. La estructura general de la configuración es la siguiente:

```text
  {
  bookendVersion: "v1.0",
  shareProviders: [
    ...
  ],
  components: [
    ...
  ]
}
```

Es necesario incluir la primera línea para especificar que estás utilizando la versión v. 1.0.

#### Componentes del enmarcado

El enmarcado se compone de varios componentes, que pueden ser artículos, enlaces de llamada a la acción, texto, etc.

Se especifican en el campo `components` del archivo de configuración JSON. Para ver un ejemplo, consulta la sección [Ejemplo de respuesta JSON](#example-json-response) que aparece más abajo.

##### heading

El componente `heading` tiene un campo `text` que se puede utilizar para añadir un título a un grupo de artículos.

```json
{
  type: "heading",
  text: "More to Read"
}
```

<amp-img alt="Bookend heading component" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
    <img alt="Bookend heading component" src="img/amp-story-bookend-component-heading.png">
    </noscript>
  </amp-img>

##### small

El componente `small` se puede utilizar para enlazar con artículos relacionados. Requiere los siguientes campos: `title`, `url` y, de forma opcional, `image`.

```json
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Bookend small component" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="Bookend small component" src="img/amp-story-bookend-component-small.png">
    </noscript>
  </amp-img>

##### landscape

El componente `landscape` se puede utilizar con formatos alternativos de contenido, como vídeos. Requiere los campos `title`, `url` e `image` y, de forma opcional, puedes añadir un campo `category`, que hace que se muestre un subtítulo encima del título.

```json
{
  type: "landscape",
  title: "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  url: "http://example.com/article.html",
  category: "astronomy",
  image: "http://placehold.it/256x128"
  }
```

<amp-img alt="Bookend landscape component" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="Bookend landscape component" src="img/amp-story-bookend-component-landscape.png">
    </noscript>
  </amp-img>

##### portrait

El componente `portrait` puede utilizarse para enlazar con otras historias. Requiere los campos `title`, `url` e `image` y, de forma opcional, puedes añadir un campo `category`, que hace que se muestre un subtítulo encima del título.

```json
{
  type: "portrait",
  category: "Science",
  title: "New discovery found",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="Bookend portrait component" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="Bookend portrait component" src="img/amp-story-bookend-component-portrait.png">
    </noscript>
  </amp-img>

##### cta-link

El componente <code>cta-link</code> permite especificar enlaces de llamadas a la acción (p. ej., <code>Read More</code> o <code>Subscribe</code>). Este componente tiene una clave <code>links</code>, que especifica una matriz de enlaces. Cada enlace es un objeto con los valores ```text</code> y <code>url</code>.

```json
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup"
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
}
```

<amp-img alt="Bookend cta-links component" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="Bookend cta-links component" src="img/amp-story-bookend-component-cta-links.png">
    </noscript>
  </amp-img>

##### textbox

El componente ```textbox</code> permite incluir texto dentro del enmarcado (por ejemplo, los créditos de foto). Este componente requiere una matriz <code>text</code> cuyos elementos son líneas de texto.

```json
{
  type: "textbox",
  text: [
    Food by Enrique McPizza,
    Choreography by Gabriel Filly,
    Script by Alan Ecma S.,
    Direction by Jon Tarantino
  ]
}
```

<amp-img alt="Bookend textbox component" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Bookend textbox component" src="img/amp-story-bookend-component-textbox.png">
    </noscript>
  </amp-img>

  **Enlaces de AMP a AMP**

  Los enlaces de documentos que se muestran en un visor de AMP se suelen abrir en la misma ventana (`_top`) o en una nueva. Sin embargo, los enlaces a páginas AMP pueden seguir mostrándose en el visor. Para habilitar este funcionamiento, añade `"amphtml": true` a un componente que admita enlaces. Por ejemplo:

```json
...
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/my-amp-document.html",
  image: "http://placehold.it/256x128",
  amphtml: true
},
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup",
      amphtml: true
    },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
},
...
```

#### Compartir contenido en las redes sociales

La configuración para compartir contenido en las redes sociales se define en el campo `shareProviders` del objeto de respuesta, y es opcional.

Este campo se compone de cadenas, y cada una de ellas representa el nombre de un proveedor en el que se puede compartir contenido (p. ej., `twitter`).

Cuando se requieren parámetros adicionales, se debe utilizar un objeto con pares clave-valor. El objeto debe contener una clave `provider` con un valor (por ejemplo, `facebook`) que corresponda al nombre del proveedor. Los siguientes pares clave-valor dependerán del proveedor en cuestión.

La lista de proveedores disponibles es la misma que la del componente [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share).

Cada uno de estos proveedores tiene disponible un conjunto de parámetros distinto ([consulta más información sobre `data-param-*`](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)). El objeto de configuración toma estos parámetros excluyendo el prefijo `data-param-` (por ejemplo, `data-param-app_id` aparecerá en el objeto de configuración como `app_id`).

#### Configuración JSON

`<amp-story-bookend>` debe tener un atributo `src` que apunte a la configuración JSON del enmarcado. Es un punto de conexión de URL que acepta solicitudes GET y devuelve una respuesta JSON con el contenido del enmarcado.  Si se omite, el componente amp-story renderiza una interfaz predeterminada para la pantalla final. El sistema es responsable de recuperar los datos necesarios para renderizar artículos relacionados y de tendencias.  Puede servirse desde un archivo JSON estático o generarse de forma dinámica (p. ej., para calcular las tendencias actuales).

#### Ejemplo de respuesta JSON

```text
{
  // You must specify version v1.0.
  bookendVersion: "v1.0",
  shareProviders: [
    email,
    tumblr,
    {
      provider: "twitter",
      // You can add custom sharing parameters depending on the social platform.
      text: "This is custom share text that I would like for the Twitter platform"
    },
    {
      provider: "facebook",
      // Facebook requires an</code>app_id` param
      app_id: "MY_FACEBOOK_APP_ID"
    }
  ],
  components: [
    {
      type: "heading",
      text: "More to read"
    },
    {
      type: "small",
      title: "This is India an the best places you should go",
      url: "<a href="http://example.com/article.html">http://example.com/article.html</a>",
      image: "<a href="http://placehold.it/256x128">http://placehold.it/256x128</a>"
    },
    ...
  ]
}
```

## Otros componentes que se pueden utilizar en las historias AMP

A continuación, se indican otros componentes que se pueden utilizar en las historias AMP y que tienen ciertos requisitos específicos para su uso.

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

Para obtener más información sobre los componentes que se utilizan más habitualmente, consulta la [lista de elementos secundarios admitidos](https://www.ampproject.org/docs/reference/components/amp-story#children).

## Validación

Consulta las [reglas de amp-story](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) en la especificación de la herramienta de validación de AMP.

## Localización

Para localizar una historia, incluye el código de idioma en el atributo `lang` de su etiqueta `<html>` como, por ejemplo, `<html lang="en">` para inglés.  Los códigos de idioma admitidos son:

* ar (árabe)
* de (alemán)
* en-GB (inglés del Reino Unido)
* es (inglés de EE. UU.)
* es-419 (español latinoamericano)
* es (español de España)
* fr-CA (francés de Canadá)
* fr (francés de Francia)
* hi (hindú)
* id (indonesio)
* it (italiano)
* ja (japonés)
* ko (coreano)
* nl (neerlandés)
* no (noruego)
* pt-BR (portugués de Brasil)
* pt (portugués de Portugal)
* ru (ruso)
* tr (turco)
* vi (vietnamita)
* zh-TW (chino tradicional)
* zh (chino simplificado)

Además, para los idiomas que se escriben de derecha a izquierda, debes incluir el atributo `dir="rtl"` en la etiqueta `<html>` de la historia.  También se puede utilizar junto con el código de idioma; por ejemplo: `<html lang="ar" dir="rtl">`.

## Recursos relacionados

* [Tutorial: Crear una historia AMP visual](https://www.ampproject.org/docs/tutorials/visual_story)
* [Ejemplos de AMP By Example](https://ampbyexample.com/stories/#stories/introduction)
* [Prácticas recomendadas para crear historias AMP](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>
