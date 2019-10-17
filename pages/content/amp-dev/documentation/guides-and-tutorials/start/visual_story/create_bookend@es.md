---
$title: Crear el enmarcado
---

Ahora que ya has añadido todas las páginas, veamos la última pantalla de la historia, el "enmarcado".  Esta última pantalla recapitula la historia y te permite compartirla en tus redes sociales y generar enlaces relacionados a ella, de modo que los usuarios puedan compartirla o profundizar en otros contenidos de tu sitio web.

La información de la pantalla del enmarcado se extrae de un archivo JSON especificado en la etiqueta `<amp-story-bookend>`. Para este tutorial ya tenemos un archivo JSON ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) que contiene los datos del enmarcado.

La etiqueta `<amp-story-bookend>` debe ser la última etiqueta de [`amp-story`](../../../../documentation/components/reference/amp-story.md). Así pues, **vamos a añadir** `<amp-story-bookend></amp-story-bookend>` justo antes del final de la etiqueta `</amp-story>`.  En la etiqueta `amp-story-bookend`, dirige el atributo `src` al archivo `bookend.json` y define `layout="nodisplay"`:

```html hl_lines="2"
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

Al actualizar el navegador e ir a la última pantalla, verás este enmarcado:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Enmarcado' ) }}

Echemos un vistazo al archivo JSON.  Abre el archivo [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) en el editor de texto.

Cada pantalla del enmarcado requiere una `bookendVersion`, que en este tutorial es `v1.0`:

```json
"bookendVersion": "v1.0",
```

Los lectores pueden compartir tu contenido en las redes sociales, como Twitter, Facebook, Pinterest y otros, mediante los botones para compartir. Especifica tus proveedores de redes sociales en el objeto shareProviders y crea una matriz que contenga los [nombres de tipo](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) de cada una de las plataformas sociales.

Para este tutorial, hemos escogido Facebook, Twitter y el correo electrónico como proveedores para compartir contenido:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='compartir el enmarcado a través de las redes sociales' ) }}

El resto de la pantalla del enmarcado está dedicado a contenido relacionado,  el cual se almacena en el objeto `components`.

Hay varios componentes que se pueden usar para mostrar contenidos y enlaces relacionados, y cada uno de ellos está especificado con un tipo de atributo. Veamos los componentes disponibles:

<table>
<thead>
<tr>
  <th width="20%">Tipo</th>
  <th>Descripción</th>
</tr>
<tr>
  <td>heading</td>
  <td>Permite indicar un encabezado que agrupe varios artículos.
<pre class="nopreline">
{
  "type": "heading",
  "text": "Más información"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="encabezado del enmarcado"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>small</td>
  <td>Permite enlazar un artículo relacionado con la opción de incluir una imagen pequeña asociada.
<pre class="nopreline">
{
  "type": "small",
  "title": "Más información sobre gatos",
  "url": "https://wikipedia.org/wiki/Cat",
  "image": "assets/bookend_cats.jpg"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="artículo con imagen pequeña en el enmarcado"></amp-img>
  </figure>
</td>
</tr>
<tr>
  <td>landscape</td>
  <td>Permite enlazar artículos u otro contenido, como vídeos. La imagen asociada con este tipo es más grande y aparece en horizontal.
<pre class="nopreline">
{
  "type": "landscape",
  "title": "Más información sobre los Border Collies",
  "url": "https://wikipedia.org/wiki/Border_Collie",
  "image": "assets/bookend_dogs.jpg",
  "category": "Perros"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="artículo con imagen horizontal en el enmarcado"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>portrait</td>
  <td>Permite enlazar historias u otro contenido.  La imagen asociada con este tipo es más grande y aparece en vertical.
<pre class="nopreline">
{
  "type": "portrait",
  "title": "Más información sobre los guacamayos",
  "url": "https://wikipedia.org/wiki/Macaw",
  "image": "assets/bookend_birds.jpg",
  "category": "pájaros"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="artículo con imagen en vertical en el enmarcado"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>cta-link</td>
  <td>Permite indicar enlaces de llamada a la acción, que aparecerán como botones (p. ej., leer más, suscribirse).
<pre class="nopreline">
{
  "type": "cta-link",
  "links": [
    {
      "text": "Más información",
      "url": "https://amp.dev/about/stories.html"
    }
  ]
}
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="llamada a la acción en el enmarcado"></amp-img>
  </figure>
  </td>
</tr>
</thead>
<tbody>
</tbody>
</table>

Puedes aprender más sobre el componente bookend. Para obtener más información, consulta la documentación de referencia de [`amp-story`](../../../../documentation/components/reference/amp-story.md).

Nuestra historia está casi terminada.  Antes de poder publicar nuestro contenido, comprobaremos que el HTML de nuestro AMP es válido.
