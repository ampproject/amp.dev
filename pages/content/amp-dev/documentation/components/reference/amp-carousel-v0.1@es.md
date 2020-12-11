---
$title: amp-carousel
$category@: layout
teaser:
  text: Muestra varios fragmentos de contenido similares en un eje horizontal.
---


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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



Carrusel genérico que muestra varios fragmentos de contenido similares en un eje horizontal; es muy flexible y eficaz.

<table>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>
      <ul>
        <li>carousel: fixed, fixed-height y nodisplay</li>
        <li>slides: fill, fixed, fixed-height, flex-item, nodisplay y responsive</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Ejemplos</strong></td>
    <td>Ejemplos de AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">Ejemplo de amp-carousel</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">Galerías de imágenes creadas utilizando amp-carrusel</a></li></ul></td>
    </tr>
  </table>

# Comportamiento <a name="behavior"></a>

Cada uno de los elementos secundarios inmediatos de `amp-carousel` se considera un elemento del propio carrusel. Cada uno de estos nodos también puede tener elementos secundarios HTML arbitrarios.

El carrusel está formado por un número arbitrario de elementos, así como por flechas de navegación opcionales para avanzar o retroceder de un elemento a otro.

El usuario puede desplazarse por los elementos deslizando el dedo, utilizando las teclas de flecha o haciendo clic en una flecha de navegación opcional.

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel width="450"
  height="300">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]

# Avanzar a una diapositiva concreta <a name="advancing-to-a-specific-slide"></a>

Si se configura un método `tap:carousel-id.goToSlide(index=N)` para el atributo `on` de un elemento, un carrusel con el ID "carousel-id" se desplazará a la diapositiva index=N si el usuario toca o hace clic en él (la primera diapositiva se encuentra en index=0; la segunda diapositiva, en index=1, etc.).

En el siguiente ejemplo, tenemos un carrusel de tres imágenes con botones de vista previa justo debajo. Cuando un usuario hace clic en uno de los botones, se muestra el elemento de carrusel correspondiente.

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel id="carousel-with-preview"
    width="450"
    height="300"
    layout="responsive"
    type="slides">
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="apples"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="lemons"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="blueberries"></amp-img>
  </amp-carousel>
  <div class="carousel-preview">
    <button on="tap:carousel-with-preview.goToSlide(index=0)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
        width="60"
        height="40"
        alt="apples"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=1)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
        width="60"
        height="40"
        alt="lemons"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=2)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
        width="60"
        height="40"
        alt="blueberries"></amp-img>
    </button>
  </div>
```
[/example]

# Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>Especifica la forma en la que se muestran los elementos del carrusel, que puede ser:
      <ul>
        <li><code>carousel</code> (predeterminado): se muestran todas las diapositivas y el usuario se puede desplazar por ellas de forma horizontal. Este tipo solo admite los siguientes diseños: <code>fixed</code>, <code>fixed-height</code> y <code>nodisplay</code>.</li>
        <li><code>slides</code>: muestra una sola diapositiva a la vez. Este tipo admite los siguientes diseños: <code>fill</code>, <code>fixed</code>, <code>fixed-height</code>, <code>flex-item</code>, <code>nodisplay</code> y <code>responsive</code>.</li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>height (obligatorio)</strong></td>
      <td>Define la altura del carrusel en píxeles.</td>
    </tr>
    <tr>
      <td width="40%"><strong>controls (opcional)</strong></td>
      <td>Muestra de forma permanente las flechas para que el usuario pueda desplazarse hacia la izquierda y hacia la derecha por los elementos del carrusel en los dispositivos móviles.
          De forma predeterminada, las flechas de navegación desaparecen al cabo de unos segundos en estos dispositivos.
          La visibilidad de las flechas también se puede controlar mediante las opciones de estilo, y se puede utilizar una media query para que se muestren las flechas solo cuando la pantalla tenga determinadas anchuras. En los ordenadores, las flechas se muestran siempre, a menos que solo haya un elemento secundario.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-next-button-aria-label (opcional)</strong></td>
        <td>Define el atributo aria-label de <code>amp-carousel-button-next</code>. Si no se especifica ningún valor, aria-label cambia de forma predeterminada al siguiente elemento del carrusel.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-prev-button-aria-label (opcional)</strong></td>
        <td>Define el atributo aria-label de <code>amp-carousel-button-prev</code>. Si no se especifica ningún valor, aria-label cambia de forma predeterminada al anterior elemento del carrusel.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-button-count-format (opcional)</strong></td>
        <td>Cadena de formato similar a <code>(%s of %s)</code>, utilizada como sufijo de la aria-label para <code>amp-carousel-button-next</code> o <code>amp-carousel-button-prev</code>. Proporciona información a los usuarios que utilizan un lector de pantalla sobre su ubicación en el carrusel. Si no se especifica ningún valor, el valor predeterminado es "(%s of %s)".</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay (opcional)</strong></td>
        <td>Avanza a la siguiente diapositiva sin la interacción del usuario.<br>
          Si está presente sin un valor:
          <ul>
            <li>De forma predeterminada, avanza a la siguiente diapositiva en intervalos de 5000 milisegundos (5 segundos). Se puede anular mediante el atributo <code>delay</code>.</li>
            <li>Añade el atributo <code>loop</code> a <code>amp-carousel</code> si <code>loop</code> aún no está presente.</li>
            <li>Se necesitan al menos 2 diapositivas para que funcione la reproducción automática.</li>
            <li>Solo se aplica a los carruseles con <code>type=slides</code>.</li>
          </ul>
          Si está presente con un valor:
          <ul>
            <li>Añade el atributo <code>loop</code> a <code>amp-carousel</code> si <code>loop</code> aún no está presente.</li>
            <li>Elimina el atributo <code>loop</code> después de que se haya realizado el número de bucles especificado.</li>
          </ul></td>
        </tr>
        <tr>
          <td width="40%"><strong>delay (opcional)</strong></td>
          <td>Especifica la duración (en milisegundos) que se tarda en avanzar a la siguiente diapositiva cuando se habilita <code>autoplay</code>. El atributo <code>delay</code> solo se aplica a los carruseles con <code>type=slides</code>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop (opcional)</strong></td>
          <td>Permite al usuario avanzar más allá del primer elemento o del último. Debe haber al menos 3 diapositivas para que se produzca el bucle. El atributo <code>loop</code> solo se aplica a los carruseles con <code>type=slides</code>.
            <em>Ejemplo: Muestra un carrusel de diapositivas con controles, bucles y reproducción automática retrasada (es decir, con delay).</em>

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel type="slides"
  width="450"
  height="300"
  controls
  loop
  {% if not format=='email'%}  autoplay
  delay="3000"{% endif %}
  data-next-button-aria-label="Go to next slide"
  data-previous-button-aria-label="Go to previous slide">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]</td>
          </tr>
          <tr>
            <td width="40%"><strong>atributos comunes</strong></td>
            <td>Este elemento incluye <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comunes</a> que se aplican a los componentes de AMP.</td>
          </tr>
        </table>

# Estilo <a name="styling"></a>

* Puedes utilizar el selector de elementos de `amp-carousel` para aplicar un estilo al carrusel.
* Puedes usar el selector de clases de `.amp-carousel-slide` para hacer referencia a elementos del carrusel.
* Los botones de `amp-carousel` permanecen ocultos cuando están inhabilitados.
* De forma predeterminada, `.amp-carousel-button` utiliza un SVG insertado como imagen de fondo de los botones. Puedes anular esta opción con tu propio SVG o tu propia imagen, como en el siguiente ejemplo.

*Ejemplo: SVG insertado predeterminado de `.amp-carousel-button`*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*Ejemplo: Se anula el SVG insertado predeterminado de `.amp-carousel-button`*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# Validación <a name="validation"></a>

Consulta las [reglas de amp-carousel](https://github.com/ampproject/amphtml/blob/master/extensions/amp-carousel/validator-amp-carousel.protoascii) en la especificación de la herramienta de validación de AMP.
