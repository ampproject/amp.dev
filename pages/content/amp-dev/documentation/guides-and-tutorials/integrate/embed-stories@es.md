---
'$title': Cómo insertar historias en páginas web
$order: 3
description: El Reproductor de historias de AMP le permite insertar historias donde los usuarios pueden presionar o hacer clic dentro de una página web. Siga esta guía detallada para aprender cómo hacerlo.
formats:
  - websites
  - stories
---

Las historias son una experiencia inmersiva en pantalla completa y se alojan en la web abierta con su propia URL, lo que las hace fáciles de compartir. Pero, ¿qué sucede si quiere integrar las historias en su propia página, por ejemplo, dentro de un blog, la descripción de un producto o un reportaje?

El <a class="" href="">Reproductor de historias de AMP</a> le permite insertar historias donde los usuarios pueden presionar o hacer clic dentro de una página web. Siga esta guía detallada para aprender cómo hacerlo.

# Cómo mostrar historias en una página que no es parte de AMP

Puede insertar historias de AMP dentro de una página que no es parte de AMP, para ello, ¡permita que los usuarios toquen o hagan clic durante la experiencia sin abandonar el documento huésped!

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## Cómo insertar el reproductor de historias de AMP

Mostrar una historia de AMP dentro una página que no es parte de AMP requiere el uso del elemento [`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md).

### Importar scripts

Incluya los dos scripts necesarios en el encabezado de su documento:

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link
  href="https://cdn.ampproject.org/amp-story-player-v0.css"
  rel="stylesheet"
  type="text/css"
/>
```

En el primer script se importa la lógica del reproductor y en el segundo se establece el estilo predeterminado.

### Cómo especificar una historia

Incluya el elemento `<amp-story-player>` dentro del `body` del documento. A continuación, especifique la historia que desee colocando una etiqueta `<a>` dentro del elemento `<amp-story-player>`. Indique el elemento `href` en la ubicación de la historia. El `href` puede señalar la URL de una historia alojada o una ruta relativa. Coloque el título de la historia dentro de las etiquetas `<a>`.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
  >
    Stories in AMP - Hello World
  </a>
</amp-story-player>
```

### Cómo definir el tamaño del reproductor

Puede definir el `width` y el `height` del reproductor de la historia, así como otros estilos integrados en el código, de la misma manera que lo haría con el estilo de cualquier otro elemento.

```html
<body>
  ...
  <amp-story-player style="width: 360px; height: 600px;">
    ...
  </amp-story-player>
  ...
</body>
```

We recommend maintaining a 3:5 aspect ratio for the best user experience, but you may define any width and height.

#### Eficiencia para definir el tamaño

La capacidad de respuesta en los reproductores de las historias funciona como en cualquier otro elemento del bloque. Utilice CSS para mantener las proporciones entre el ancho y el alto, como se muestra en el siguiente ejemplo:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;"> ... </amp-story-player>
```

### Establecer un marcador de posición

Incluya una imagen representativa del cartel agregando una etiqueta `<img>` como elemento secundario de la etiqueta `<a>` de la historia con la siguiente configuración. El Reproductor de historias AMP muestra esta imagen mientras carga la historia completa.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes this story.
  </a>
</amp-story-player>
```

Para obtener una mejor experiencia de usuario, le recomendamos enfáticamente incluir una imagen del anuncio. Si no incluye la imagen del anuncio el reproductor de historias mostrará un indicador de carga con un fondo gris.

## Cómo insertar varias historias

You may add multiple stories in the same `<amp-story-player>` element by defining multiple `<a>` tags. The player presents the second story’s cover page after user’s tap through the first.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

Puede insertar `<amp-story-player>` tantas veces como desee. Estos se mostrarán como visualizadores individuales.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

# Cómo mostrar historias en una página de AMP

Para utilizar el componente `<amp-story-player>` en las páginas AMP, lea la documentación de la [versión de AMP para el amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories) .
