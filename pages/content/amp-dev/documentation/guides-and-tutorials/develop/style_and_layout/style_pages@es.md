---
"$title": Supported CSS
description: Al igual que el resto de las páginas web, las páginas AMP extraen su estilo de un elemento CSS, pero en ellas no se puede hacer referencia a hojas de estilo externasб salvo en el caso de las fuentes personalizadas. Además, algunos estilos no están permitidos ...
formats:
- websites
- email
- ads
- stories
author: Meggin
contributors:
- pbakaus
- CrystalOnScript
- bpaduch
- choumx
---

[filter format = "email"] Nota: AMP para correo electrónico especifica restricciones de CSS adicionales que se describen en <a class="" href="https://gitlocalize.com/repo/4863/es/pages/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md">AMP para CSS compatible con correo electrónico</a>. [/filter]

Al igual que el resto de las páginas web, las páginas AMP extraen su estilo de un elemento CSS, pero en ellas no se puede hacer referencia a hojas de estilo externas (salvo en el caso de las fuentes personalizadas). Además, algunos estilos no están permitidos porque afectan al rendimiento. Por ejemplo, los atributos de estilo insertados no se admiten.

Los estilos pueden estar en el encabezado del documento o como atributos de <code>style</code> línea (consulte <a>Agregar estilos a una página</a>). Pero puede usar preprocesadores CSS y plantillas para crear páginas estáticas para administrar mejor su contenido.

[tip type="note"] **&nbsp;NOTA –** Los componentes de AMP incluyen estilos predeterminados para facilitar en gran medida la creación de páginas adaptables. Estos estilos están definidos en el atributo [`amp.css`](https://github.com/ampproject/amphtml/blob/main/css/amp.css). [/tip]

## Disallowed styles

The following styles aren’t allowed in AMP pages:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Estilo prohibido</th>
      <th data-th="Description">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Calificador <code>!important</code>  &nbsp;</td>
      <td data-th="Description">Su uso no está permitido. Este es un requisito necesario para habilitar que AMP aplique sus normas relativas al tamaño de los elementos.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”></code></td>
      <td data-th="Description"> No está permitido, salvo en el caso de las <a href="#the-custom-fonts-exception">fuentes personalizadas</a>.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Nombres de las clases <code>-amp-</code>  y de las etiquetas <code>i-amp-</code> &nbsp;</td>
      <td data-th="Description"> Los nombres de las clases que se incluyan en las hojas de estilo del autor no pueden empezar con la cadena <code>-amp-</code>. Están reservados para usarse internamente durante el tiempo de ejecución de AMP. Además, la hoja de estilo del usuario no puede hacer referencia a los selectores de CSS de las clases <code>-amp-</code> y las etiquetas <code>i-amp</code>.</td>
    </tr>
  </tbody>
</table>

## Recomendaciones de desempeño

These allowed styles should restrict values to the following for an optimal performance:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Estilo restringido</th>
      <th data-th="Description">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style">Propiedad <code>transition</code> &nbsp;</td>
      <td data-th="Description"> Solo propiedades aceleradas por GPU (actualmente <code>opacity</code>, <code>transform</code> y <code>-vendorPrefix-transform</code>).</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description"> Solo propiedades aceleradas por GPU (actualmente <code>opacity</code>, <code>transform</code> y <code>-vendorPrefix-transform</code>).</td>
    </tr>
  </tbody>
</table>

## La excepción de las fuentes personalizadas <a name="the-custom-fonts-exception"></a>

AMP pages can’t include external stylesheets, with the exception of custom fonts.

[tip type="read-on"] **Más artículos –** Consulta más información [sobre las fuentes personalizadas en AMP](custom_fonts.md). [/tip]

## Usar preprocesadores CSS <a name="using-css-preprocessors"></a>

El resultado generado de los preprocesadores funciona tan bien en AMP como en cualquier otra página web. Por ejemplo, el sitio web [amp.dev](https://amp.dev/) emplea [Sass](http://sass-lang.com/). Nosotros utilizamos [Grow](http://grow.io/) para crear las páginas AMP estáticas que conforman el sitio web [amp.dev](https://amp.dev/).

Cuando utilices preprocesadores, presta especial atención a los elementos que incluyes. Debes cargar solo lo que utilicen tus páginas. Por ejemplo, [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) incluye todas las etiquetas AMP que se necesitan y el CSS insertado de los archivos de origen de `*.scss`. También incluye la secuencia de comandos personalizada de [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), entre otras, para que muchas páginas del sitio web puedan incluir vídeos de YouTube insertados.

[sourcecode:html]{% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://ampjs.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://ampjs.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://ampjs.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://ampjs.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %}[/sourcecode]

Para ver cómo este código se convierte en código AMP HTML con formato, observa el código de cualquier página de [amp.dev](https://amp.dev/). (En Chrome, haz clic con el botón derecho y selecciona `View Page Source`.)
