---
$title: CSS compatibles
---

Igual que en todas las páginas web, se aplica estilo a las páginas de AMP con CSS, pero no se puede hacer referencia a hojas de estilo externas
(con la excepción de las [fuentes personalizadas](#the-custom-fonts-exception)).
También hay ciertos estilos que no están permitidos por cuestiones de rendimiento;
los atributos de estilo insertados no están permitidos.

Todos los estilos deben encontrarse en el encabezado del documento
(consulta [Añadir estilos a una página](/docs/guides/validate.html#add-styles-to-a-page)).
Pero se pueden utilizar preprocesadores de CSS y plantillas para crear páginas estáticas
y así administrar mejor el contenido.

**Nota:**
Los componentes de AMP vienen con estilos predeterminados
para facilitar la autoría de las páginas adaptables de forma razonable.
Estos estilos se definen en
[`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css).

[TOC]

## Usar preprocesadores de CSS

La salida generada por los preprocesadores funciona tan bien en AMP como en cualquier otra página web.
Por ejemplo, para el sitio de [ampproject.org](https://www.ampproject.org/) se utiliza
[Sass](http://sass-lang.com/).
(Utilizamos [Grow](http://grow.io/) para construir las páginas estáticas de AMP
que conforman el sitio de [ampproject.org](https://www.ampproject.org/)).

Cuando se utilizan preprocesadores,
se debe prestar especial atención a lo que se incluye, y cargar solo lo que utilicen las páginas.
Por ejemplo,
[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
incluye todas las marcas de AMP y el CSS insertado de los archivos de origen `*.scss`.
También incluye la secuencia de comandos de elemento personalizado para
[`amp-youtube`](/docs/reference/extended/amp-youtube.html), entre otras, por lo que muchas páginas del sitio pueden incluir vídeos de YouTube insertados.

[sourcecode:html] {% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

Para ver cómo se traduce lo anterior en AMP HTML con formato,
consulta la fuente de cualquier página de [ampproject.org](https://www.ampproject.org/).
(En Google Chrome, haz clic con el botón derecho y selecciona `Ver código fuente de la página`).

## Estilos no permitidos

Los siguientes estilos no están permitidos en las páginas de AMP:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Estilo prohibido</th>
      <th data-th="Description">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Atributos de estilo insertados</td>
      <td data-th="Description">Todos los estilos deben estar definidos en la sección <code>&lt;head&gt;</code> de la página,       	dentro de una etiqueta <code>&lt;style amp-custom&gt;</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code> (calificador de importante) </td>
      <td data-th="Description">No está permitido su uso.
      Este es un requisito necesario para que AMP aplique sus normas relativas al tamaño de los elementos.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description">No está permitido, con la excepción de las <a href="#the-custom-fonts-exception">fuentes personalizadas.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (selector universal)</td>
      <td data-th="Description">Tiene implicaciones de rendimiento negativas y podría utilizarse para eludir otras restricciones del selector.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Podría utilizarse para simular el selector universal.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Pseudoselectores, pseudoclases y pseudoelementos</td>
      <td data-th="Description">Los pseudoselectores, pseudoclases y pseudoelementos solo están permitidos en los selectores que contengan nombres de etiquetas que no comiencen con <code>amp-</code>.
      Ejemplo correcto: <code>a:hover, div:last-of-type</code>
      Ejemplo incorrecto: <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style">Clase <code>-amp-</code> y nombres de etiquetas <code>i-amp-</code></td>
      <td data-th="Description">Los nombres de las clases en las hojas de estilo de autor no pueden empezar con la cadena <code>-amp-</code>. Están reservados para uso interno en tiempo de ejecución de AMP. Por tanto, la hoja de estilo del usuario no puede hacer referencia a los selectores de CSS para las clases <code>-amp-</code> y las etiquetas <code>i-amp</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>, <code>-moz-binding</code></td>
      <td data-th="Description">Estas propiedades no están permitidas
      por razones de seguridad.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>filter</code></td>
      <td data-th="Description">Se incluye en la lista negra por problemas de rendimiento.</td>
    </tr>
  </tbody>
</table>

## Propiedades de transición y animación incluidas en la lista blanca

AMP solo permite transiciones y animaciones de propiedades
que puedan ser aceleradas por GPU en los navegadores comunes.
El proyecto de AMP incluye acualmente en la lista blanca `opacity`, `transform`
y `-vendorPrefix-transform`.

En los siguientes ejemplos, `<property>` tiene que estar en la lista blanca:

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

La propiedad `overflow` (y `overflow-y`, `overflow-x`)
no puede tener como estilo “auto” ni “scroll”.
Ningún elemento definido por el usuario en un documento de AMP puede tener una barra de desplazamiento.

## La excepción de las fuentes personalizadas

Las páginas de AMP no pueden incluir hojas de estilo externas, con la excepción de fuentes personalizadas.
Los dos métodos admitidos para hacer referencia a fuentes personalizadas son
las etiquetas de enlace que apuntan a los proveedores de fuentes de la lista blanca y la inclusión de `@font-face`.

Los proveedores de fuentes solo pueden estar en la lista blanca
si son compatibles con las integraciones de CSS exclusivamente y publican en HTTPS.
Actualmente, solo estos orígenes se incluyen en la lista blanca
y pueden publicar fuentes mediante etiquetas de enlace:

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

Ejemplo de etiqueta de enlace que apunta al proveedor de fuente en la lista blanca, Google Fonts:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Como alternativa, se puede usar [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).
Las fuentes incluidas mediante `@font-face` deben obtenerse con
el esquema HTTP o HTTPS.
