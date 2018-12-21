---
$title: Añadir más páginas
---

Ahora que ya sabes cómo añadir una página a una historia de AMP, verás que añadir las páginas siguientes a la historia de las mascotas es muy parecido. Basándote en la información que se incluye a continuación, **crea el resto de las páginas** aplicando lo que has aprendido.  Si te atascas, consulta el (<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">código completo</a>).

[tip type="success"]

Recuerda que cada página necesita un atributo "id" único (por ejemplo, `id="page1"`).

[/tip]

## Página 1: Gatos

Explica cómo mostrar una imagen y texto en una sola capa.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>Contiene 1 capa:
      <ul>
        <li>Implementa la plantilla <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#vertical"><code>vertical</code></a>.</li>
        <li>Contiene 3 elementos:
          <ul>
            <li>Un elemento <code>&lt;h1></code> con el título <em>Cats</em>.</li>
            <li>Un componente <a href="/es/docs/reference/components/amp-img.html">amp-img</a> adaptable (<code class="filename">cat.jpg</code>, 720x1280px).</li>
            <li>Un elemento <code><q></code> para incluir la siguiente cita: <em>Dogs come when they're called. Cats take a message and get back to you. —Mary Bly</em></li>
          </ul>
        </li>
      </ul></li></ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Página 1: Gatos' ) }}</td>
  </tr>
</table>

## Página 2: Perros

Explica cómo organizar el texto y mostrar una imagen que ocupe toda la pantalla con dos capas.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>Contiene 2 capas:
      <ul>
        <li><b>Capa 1:</b> Implementa la plantilla <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#fill"><code>fill</code></a> y contiene un componente <a href="{{g.doc('/content/amp-dev/documentation/components/I/amp-img.md', locale=doc.locale).url.path}}">amp-img adaptable</a> (<code class="filename">dog.jpg</code>, 720x1280px).</li>
        <li><b>Capa 2:</b> Implementa la plantilla <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#thirds"><code>thirds</code></a> y contiene 2 elementos:
          <ul>
            <li>Un elemento <code>&lt;h1></code> con el título <em>Dogs</em>.</li>
            <li>Un elemento <code>&lt;p></code> que incluye el atributo <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#thirds"><code>grid-area</code></a> con el valor <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#thirds"><code>lower-third</code></a> y contiene el siguiente texto: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em></li>
          </ul>
        </li>
      </ul></li></ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Página 2: Perros' ) }}</td>
  </tr>
</table>

## Página 3: Pájaros

Explica cómo organizar un texto, mostrar una imagen que ocupe toda la pantalla y añadir un audio de fondo a la página.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contiene 3 capas:
      <ul>
        <li><b>Capa 1:</b> Implementa la plantilla <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#fill"><code>fill</code></a> y contiene un componente <a href="/es/docs/reference/components/amp-img.html">amp-img</a> adaptable (<code class="filename">bird.jpg</code>, 720x1280px).</li>
        <li><b>Capa 2:</b> Implementa la plantilla <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#vertical"><code>vertical</code></a> y contiene un elemento:
          <ul>
            <li>Un elemento <code><h1></code> con el título <em>Birds</em>.</li>
          </ul>
        </li>
        <li><b>Capa 3:</b> Implementa la plantilla <a href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}#vertical"><code>vertical</code></a> y contiene un elemento:
          <ul>
            <li>Un elemento <code>&lt;q></code> que incluya la siguiente cita: <em>A bird is three things: Feathers, flight and song, And feathers are the least of these. —Marjorie Allen Seiffert</em>.</li>
            <li>Esta tercera capa incluye <code>class="bottom"</code> para alinear los elementos secundarios en la parte inferior de la pantalla.</li>
          </ul>
        </li>
      </ul></li>
      <li>Reproduce un archivo de audio de fondo mientras se muestra la página. Puedes reproducirlo en toda la historia o solo en una página. Para reproducirlo solo en una, añade el atributo <code>background-audio="assets/bird-singing.mp3"</code> al elemento <code><amp-story-page></code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Página 3: Pájaros' ) }}</td>
  </tr>
</table>

## Página 4: Conejos

Explica cómo organizar texto y mostrar un vídeo que ocupe toda la pantalla en la página.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>Contiene 3 capas:
      <ul>
        <li><b>Capa 1:</b> Implementa la plantilla <code>fill</code> y contiene un componente <a href="/es/docs/reference/components/amp-video.html">amp-video</a> adaptable (<code class="filename">rabbit.mp4</code>).
          <ul>
            <li>Recuerda añadir el <strong>script necesario</strong> del componente <a href="/es/docs/reference/components/amp-video.html">amp-video</a> a la sección <code>&lt;head></code> de la página para que se muestre el vídeo.</li>
            <li>Indica una imagen de póster con <code>poster</code> (<code class="filename">rabbit.jpg</code>). Este atributo es necesario<strong></strong> para que las historias de AMP sean válidas.</li>
            <li>Configura el vídeo para que se reproduzca automáticamente con el atributo <code>autoplay</code>. Este atributo es necesario<strong></strong> para que las historias de AMP sean válidas.</li>
            <li>Configura el vídeo para que se reproduzca en bucle con el atributo <code>loop</code>.</li>
            <li>Establece las dimensiones <code>width="720"</code> <code>height="1280"</code> y el diseño <code>layout="responsive"</code>.</li>
          </ul></li>
        <li><b>Capa 2:</b> Implementa la plantilla <code>vertical</code> y contiene un elemento:
          <ul>
            <li>Un elemento <code>&lt;h1></code> con el título <em>Rabbits</em>.</li>
          </ul>
        </li>
        <li><b>Capa 3:</b> Implementa la plantilla <code>vertical</code> y contiene un elemento:
          <ul>
            <li>Un elemento <code>&lt;p></code> que contiene siguiente el texto: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful.</em></li>
            <li>Aplica la clase CSS <code>bottom</code> a la capa para alinear los elementos secundarios en la parte inferior de la pantalla.</li>
          </ul>
        </li></ul></li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Página 4: Conejos' ) }}</td>
  </tr>
</table>

Ya casi hemos acabado la historia de las mascotas. Usaremos animaciones en la última página para reunir a todas las mascotas.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_cover_page.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/animating_elements.md', locale=doc.locale).url.path}}"><span class="arrow-next">Siguiente</span></a>
</div>
 
