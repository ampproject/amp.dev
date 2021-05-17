---
'$title': Características que deben tener los anuncios de AMP
$order: 3
formats:
  - ads
teaser:
  text: _Si desea proponer cambios en el formato estándar, agregue un comentario en el artículo [Intent
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

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

_Si desea proponer cambios en el formato estándar, agregue un comentario en el artículo [Intento para implementarlo](https://github.com/ampproject/amphtml/issues/4264)_.

Los anuncios AMPHTML son un mecanismo para renderizar anuncios rápidamente y de manera eficaz en las páginas de AMP. Para garantizar que los documentos de los anuncios AMPHTML ("Creativos de AMP") puedan renderizarse de forma rápida y sin contratiempos en el navegador, y que no afecten la experiencia del usuario, los creativos de AMP deben cumplir todo un conjunto de reglas para su validación. Al igual que las [reglas de formato para AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml), los anuncios AMPHTML tienen acceso a un conjunto limitado de etiquetas, funciones y extensiones permitidas.

## Reglas de formato para los anuncios AMPHTML <a name="amphtml-ad-format-rules"></a>

A menos que se especifique lo contrario, el creativo debe cumplir todas las reglas establecidas por las [reglas de formato para AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html), las cuales se incluyen aquí como referencia. Por ejemplo, el [código reutilizable](#boilerplate) para los anuncios AMPHTML difiere del código reutilizable estándar que se usa en AMP.

Adicionalmente, los creativos deben cumplir las siguientes reglas:

<table>
<thead><tr>
  <th>Regla</th>
  <th>Justificación</th>
</tr></thead>
<tbody>
<tr>
<td>Debe utilizar <code><html ⚡4ads></code> o <code><html amp4ads></code> como etiquetas adjuntas.</td>
<td>Permite que los validadores identifiquen un documento creativo, ya sea como un documento de AMP general o como un anuncio AMPHTML restringido, y lo envíen apropiadamente.</td>
</tr>
<tr>
<td>Debe incluir <code><script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script></code> como el script que controla el tiempo de ejecución en lugar de <code>https://cdn.ampproject.org/v0.js</code>.</td>
<td>Permite personalizar el comportamiento del tiempo de ejecución en el caso de los anuncios AMPHTML que se ocupan como iframes de origen cruzado.</td>
</tr>
<tr>
<td>No debe incluir una etiqueta <code><link rel="canonical"></code>.</td>
<td>En los anuncios, los creativos carecen de una "versión no canónica de AMP" y la indexación en los buscadores no se realizará de manera independiente, por lo tanto, la auto-referencia no sería útil.</td>
</tr>
<tr>
<td>Puede incluir metaetiquetas opcionales en el encabezado del HTML que funcionen como identificadores en el formato de <code><meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code>. Esas metaetiquetas deben colocarse antes del script <code>amp4ads-v0.js</code>. Los valores de <code>vendor</code> e <code>id</code> son cadenas que solo contienen [0-9a-zA-Z_-]. El valor de <code>type</code> puede ser tanto <code>creative-id</code> como <code>impression-id</code>.</td>
<td>Estos identificadores personalizados pueden utilizarse para identificar la impresión o la creatividad. Pueden ser útiles para presentar informes y la depuración.<br><br><p>Por ejemplo:</p>
<pre> <meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
<meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>
<code><amp-analytics></code> el seguimiento de la visibilidad solo puede dirigirse al selector de anuncios completo, a través de <code>"visibilitySpec": { "selector": "amp-ad" }</code> como se define en la <a href="https://github.com/ampproject/amphtml/issues/4018">Problemática #4018</a> y <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a>. En particular, es posible que no se dirija a ningún selector de elementos dentro de la creatividad del anuncio.</td>
<td>Algunas veces, en los anuncios AMPHTML puede selelecionarse renderizar un anuncio creativo en un iframe. En esos casos, el análisis de la página del host solo puede orientar el iframe completo y no tendrá acceso a ningún seleccionador de grano fino.<br><br> <p>Por ejemplo:</p> <pre> <amp-analytics id="nestedAnalytics"> <script type="application/json"> { "requests": { "visibility": "https://example.com/nestedAmpAnalytics" }, "triggers": { "visibilitySpec": { "selector": "amp-ad", "visiblePercentageMin": 50, "continuousTimeMin": 1000 } } } </script> </amp-analytics> </pre> <p> Esta configuración envía una solicitud a la <code>https://example.com/nestedAmpAnalytics</code> URL cuando el 50% del anuncio adjunto pudo visualizarse de forma continua en la pantalla durante 1 segundo.</p>
</td>
</tr>
</tbody>
</table>

### Código repetitivo <a name="boilerplate"></a>

Los creativos de los anuncios AMPHTML requieren de un código repetitivo diferente y con un estilo considerablemente más simple en comparación con lo que [hacen los documentos generales de AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md):

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

<em>Justificación: </em> El estilo <code>amp-boilerplate </code> oculta el contenido del cuerpo hasta que el tiempo de ejecución de AMP está listo y puede mostrarlo. Si Javascript está desactivado o el tiempo de ejecución de AMP no se carga, el texto estándar predeterminado garantiza que el contenido se seguirá mostrando independientemente. Sin embargo, en los anuncios AMPHTML, si Javascript está completamente deshabilitado, los anuncios AMPHTML no se ejecutarán y no se mostrará ningún anuncio, por lo que no es necesaria la sección <code><noscript></code>. En ausencia del tiempo de ejecución de AMP, la mayoría de la maquinaria en la que se basan los anuncios AMPHTML (por ejemplo, los análisis para el seguimiento de la visibilidad o <code>amp-img</code> para la visualización de contenido) no estarán disponibles, por lo que es preferible no mostrar ningún anuncio que uno defectuoso.

Por último, el código repetitivo del anuncio AMPHTML utiliza <code>amp-a4a-boilerplate</code> en lugar de <code>amp-boilerplate</code> para que los validadores puedan identificarlo fácilmente y generar mensajes de error más precisos para ayudar a los desarrolladores.

Tenga en cuenta que las mismas reglas sobre los cambios en el texto del código reutilizable se aplicaran como en el <a class="" href="">código repetitivo general de AMP</a>.

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>Regla</th>
  <th>Justificación</th>
</tr></thead>
<tbody>
  <tr>
    <td>
<code>position:fixed</code> y <code>position:sticky</code> están prohibidos en el creativo de CSS.</td>
    <td> <code>position:fixed</code> se desencadena de shadow DOM, que depende de los anuncios de AMPHTML. En tal caso, a los anuncios de AMP ya no se les permite utilizar una posición fija.</td>
  </tr>
  <tr>
    <td>
<code>touch-action</code> está prohibido.</td>
    <td>Un anuncio que puede utilizar <code>touch-action</code>podría interferir con la capacidad del usuario para desplazarse dentro del documento host.</td>
  </tr>
  <tr>
    <td>El creativo de CSS está restringido a 20,000 bytes.</td>
    <td>Los grandes bloques de CSS obstaculizan el tamaño del creativo, incrementan el tiempo de espera de la red, y disminuyen el rendimiento de las páginas.</td>
  </tr>
  <tr>
    <td>La transición y la animación están sujetas a restricciones adicionales.</td>
    <td>AMP debe ser capaz de controlar todas las animaciones que pertenecen a un anuncio, para poder detenerlos cuando el anuncio no aparece en la pantalla o los recursos del sistema son muy bajos.</td>
  </tr>
  <tr>
    <td>Los prefijos específicos de los proveedores se consideran sobrenombres para el mismo símbolo sin la necesidad de un prefijo con fines de validación. Esto quiere decir que si un símbolo <code>foo</code> está prohibido por las reglas de validación de CSS, entonces el símbolo <code>-vendor-foo</code> también estará prohibido.</td>
    <td>Algunas propiedades con prefijos del proveedor proporcionan funciones equivalentes a las propiedades que de otra forma estarían prohibidas o restringidas por estas reglas.<br><br><p>Por ejemplo: <code>-webkit-transition</code> y <code>-moz-transition</code> se consideran sobrenombres de <code>transition</code>.  Solo se admitirán en contextos donde se permitiría que <code>transition</code> fuera simple (consulte la sección <a href="#selectors">Seleccionadores</a> que se encuentra más adelante).</p>
</td>
  </tr>
</tbody>
</table>

#### Animaciones y transiciones en CSS <a name="css-animations-and-transitions"></a>

##### Seleccionadores <a name="selectors"></a>

Las propiedades `transition` y `animation` solo se permiten en los seleccionadores que:

- Solo contienen las propiedades `transition`, `animation`, `transform`, `visibility`, u `opacity`.

  _Justificación:_ Esto permite que el tiempo de ejecución de AMP elimine esta clase de contexto para desactivar las animaciones, mientras sea necesario para el rendimiento de la página.

**Correcto**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**Incorrecto**

Esta propiedad no esta permitida para la clase CSS.

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### Propiedades transitorias y animadas <a name="transitionable-and-animatable-properties"></a>

Las únicas propiedades que pueden ser transitorias son la opacidad y la transformación. ([Justificación](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**Correcto**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**Incorrecto**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**Correcto**

[sourcecode:css]
@keyframes turn {
from {
transform: rotate(180deg);
}

to {
transform: rotate(90deg);
}
}
[/sourcecode]

**Incorrecto**

[sourcecode:css]
@keyframes slidein {
from {
margin-left: 100%;
width: 300%;
}

to {
margin-left: 0%;
width: 100%;
}
}
[/sourcecode]

### Extensiones e incorporaciones permitidas en AMP <a name="allowed-amp-extensions-and-builtins"></a>

Se _permiten_ los siguientes módulos de extensiones de AMP y etiquetas integradas AMP en un anuncio creativo Se prohíben las extensiones o etiquetas incorporadas que no se enumeren explícitamente.

- [amp-accordion](https://amp.dev/documentation/components/amp-accordion)
- [amp-ad-exit](https://amp.dev/documentation/components/amp-ad-exit)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- [amp-anim](https://amp.dev/documentation/components/amp-anim)
- [amp-animation](https://amp.dev/documentation/components/amp-animation)
- [amp-audio](https://amp.dev/documentation/components/amp-audio)
- [amp-bind](https://amp.dev/documentation/components/amp-bind)
- [amp-carousel](https://amp.dev/documentation/components/amp-carousel)
- [amp-fit-text](https://amp.dev/documentation/components/amp-fit-text)
- [amp-font](https://amp.dev/documentation/components/amp-font)
- [amp-form](https://amp.dev/documentation/components/amp-form)
- [amp-img](https://amp.dev/documentation/components/amp-img)
- [amp-layout](https://amp.dev/documentation/components/amp-layout)
- [amp-lightbox](https://amp.dev/documentation/components/amp-lightbox)
- amp-mraid, es experimental. Si está considerando utilizarlo, abra una problemática en [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new).
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

La mayoría de las omisiones son consecuencia ya sea del rendimiento o para que los anuncios AMPHTML sean más fáciles de analizar.

_Por ejemplo:_ `<amp-ad>` se omite de esta lista. Se prohíbe explícitamente porque permitiría que un `<amp-ad>` estuviera dentro de un `<amp-ad>` que potencialmente conduciría a cascadas ilimitadas de carga de anuncios, los cuales no cumplen con los objetivos de rendimiento para los anuncios de AMPHTML.

_Por ejemplo:_ `<amp-iframe>` se omite de esta lista. Se prohíbe porque los anuncios podrían utilizarlo para ejecutar injustificadamente Javascript y cargar contenido arbitrario. Los anuncios que quieran utilizar esas funciones deben devolver `false` de su entrada [a4aRegistry](https://github.com/ampproject/amphtml/blob/main/ads/_a4a-config.js#L40) y utilizar el mecanismo actual de renderización de anuncios “3p iframe”.

_Por ejemplo:_ `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>`, y `<amp-youtube>` se omiten por la misma razón que `<amp-iframe>`: Todos crean iframes y potencialmente pueden consumir recursos ilimitados en ellos mismos.

_Por ejemplo:_ `<amp-ad-network-*-impl>` se omite de esta lista. La etiqueta `<amp-ad>` administra la autorización en estas etiquetas de implementación, los creativos no deben tratar de incluirlos inmediatamente.

_Por ejemplo:_ `<amp-lightbox>` aún no se incluye porque todavía algunos creativos en los anuncios de AMPHTML pueden renderizarse en un iframe y actualmente no hay ningún mecanismo para que un anuncio se expanda más allá de un iframe. Próximamente puede agregarse la compatibilidad, si se existe el deseo de hacerlo.

### Etiquetas HTML <a name="html-tags"></a>

Las siguientes etiquetas están _permitidas_ en los creativos para los anuncios de AMPHTML. Están prohibidas las etiquetas que no están explícitamente permitidas. Esta lista es un subconjunto general en la [lista de elementos permitidos para la etiqueta de AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md). De esa forma la lista se ordena según las especificaciones para HTML5 que se encuentran en la sección 4 [Los elementos de HTML](http://www.w3.org/TR/html5/single-page.html#html-elements).

La mayoría de las omisiones se deben al rendimiento o porque las etiquetas no son estándares para HTML5. Por ejemplo, `<noscript>` se omite debido a que los anuncios de AMPHTML dependen de que JavaScript se haya habilitado, así que un bloque `<noscript>` nunca se ejecutará y, por lo tanto, solo obstaculizará al creativo, el costo del ancho de banda y los tiempos de espera. De forma similar, `<acronym>`, `<big>`, y otros están prohibidos debido a que no son compatibles con HTML5.

#### 4.1 El elemento raíz <a name="41-the-root-element"></a>

4.1.1 `<html>`

- Debe utilizar los tipos `<html ⚡4ads>` o `<html amp4ads>`

#### 4.2 Metadatos de los documentos <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- las etiquetas `<link rel=...>` están prohibidas, excepto para `<link rel=stylesheet>`.

- **Tenga en cuenta:** A diferencia del AMP general, las etiquetas `<link rel="canonical">` están prohibidas.

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Secciones <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Agrupación del contenido <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Semántica a nivel de texto <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Modificaciones <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Contenido incrustado <a name="47-embedded-content"></a>

- El contenido incrustado es compatible solo mediante las etiquetas de AMP, como `<amp-img>` o `<amp-video>`.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

Las etiquetas de los SVG no están en el espacio de nombres de HTML5. Se detallan a continuación sin un ID de sección.

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 Tabla de datos <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Formularios <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 Lenguajes de programación <a name="411-scripting"></a>

- Al igual que un documento general de AMP, la etiqueta del creativo `<head>` debe incluir una etiqueta `<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>`.
- A diferencia del AMP general, el `<noscript>` está prohibido.
  - _Justificación:_ Dado que los anuncios AMPHTML requieren que Javascript esté habilitado para funcionar, los bloques de `<noscript>` no tendrían ninguna utilidad en los anuncios de AMPHTML y su costo solo es el ancho de banda de la red.
- A diferencia del AMP general, el `<script type="application/ld+json">` está prohibido.
  - _Justificación:_ JSON LD se utiliza para marcar datos estructurados en páginas host, pero los creativos de los anuncios no son documentos independientes y no contienen datos estructurados. En los bloques JSON LD solo tendría costo el ancho de banda de la red.
- Todas las demás exclusiones y reglas en los lenguajes de programación se transfieren del AMP general.
