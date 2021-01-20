---
$title: Animar elementos
---

Puedes animar las entradas de los elementos de una página para mejorar aún más las historias de AMP. Por ejemplo, puedes hacer que el título se desplace desde la parte izquierda, que aparezca en la parte superior de la página, que se desvanezca y mucho más.  El entorno de las historias de AMP ofrece las animaciones predeterminadas que se muestran a continuación.

<table>
<thead>
<tr>
  <th width="50%">Valores predefinidos de animación</th>
  <th width="25%">Duración predeterminada (ms)</th>
  <th width="25%">Retraso predeterminado (ms)</th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

Para aplicar una entrada de animación a un elemento, tienes que añadir <code>animate-in="<em>&lt;animation preset></em>"</code> con uno de los valores predefinidos disponibles.  Por ejemplo, para hacer que un texto caiga en una página, añade 'animate-in="drop"' al elemento de texto:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="success"]

Añade el atributo `animate-in="<animation preset>"` a los elementos de las páginas de historias para explorar los diferentes efectos de animación.

[/tip]

## Duración de la animación

De forma predeterminada, todos los valores predefinidos de las animaciones tienen estos valores temporales:

* **retraso**: el tiempo que se retrasa el inicio de la animación.  Por ejemplo, un retraso de 3 s significa que la animación aparece en la página al cabo de 3 segundos. Un retraso de 0 s significa que la animación empieza al instante.
* **duración**: el tiempo durante el que transcurre la animación.  Por ejemplo, la animación de desvanecimiento dura 500 ms de principio a fin.

Puedes personalizar los valores de tiempo de una animación modificando el retraso o la duración con los atributos `animate-in-delay` y `animate-in-duration`. En el siguiente ejemplo, `my-element` se desplaza hacia la derecha de la página en 3 segundos y entra completamente en 5 segundos.

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
   I'm going to fly into the page from the left!
  </div>
</amp-story-page>
```

## Añadir animaciones en la última página

La última página de nuestra historia de AMP está formada por dos capas: la primera es un collage de imágenes de animales y en la segunda se muestra un banner de texto.  Para crear esta página, **añade** el siguiente fragmento de código justo después de la página anterior de la historia:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img src="assets/cat.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/dog.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/bird.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/rabbit.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```
Vuelve a cargar la historia de AMP en el navegador y comprueba que la página se muestra correctamente y que tiene este aspecto:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Página estática 5' ) }}

Está genial, pero es muy estática. Incluyamos algunas animaciones.

Empezaremos animando la entrada del banner de texto y haremos que entre rápidamente desde la parte derecha de la página. Para hacerlo, añade `animate-in="whoosh-in-right"` al elemento `<p>`:

```html hl_lines="2"
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Vuelve a cargar la página de la historia en el navegador y comprueba que el banner entre rápidamente.

Ahora vamos a hacer que todas las imágenes se desvanezcan. Para hacerlo, añade `animate-in="fade-in"` a todos los elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html hl_lines="4 9 14 19"
<amp-img src="assets/cat.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/dog.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/bird.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/rabbit.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
```

Si actualizas y vuelves a cargar la página, todas las imágenes se desvanecerán.  Está bien, pero apenas se nota el efecto porque todas las imágenes se desvanecen a la vez. Podemos mejorar el efecto visual si modificamos los valores temporales de las animaciones.

Vamos a retrasar la entrada de la primera imagen para que entre justo después del banner de texto, unos 4 s más o menos. Las otras tres imágenes pueden entrar 2 s después de la entrada de la imagen anterior. Para cada uno de los elementos [`amp-img`](../../../../documentation/components/reference/amp-img.md)  añade `animate-in-delay=""` con el valor de retraso temporal correspondiente. El código debería quedar así:

```html hl_lines="5 11 17 23"
<amp-img src="assets/cat.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.4s">
</amp-img>
<amp-img src="assets/dog.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.6s">
</amp-img>
<amp-img src="assets/bird.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay=".8s">
</amp-img>
<amp-img src="assets/rabbit.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="1s">
</amp-img>

```

Actualiza y vuelve a cargar la historia.  La última página tendría que quedar así:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Mosaico de la página 5', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

Las animaciones de las historias de AMP ofrecen muchísimas posibilidades (por ejemplo, combinar o encadenar animaciones) y en este tutorial solo mostramos lo más básico. Para obtener más información sobre las animaciones, consulta la documentación de referencia [`amp-story`](../../../../documentation/components/reference/amp-story.md).
