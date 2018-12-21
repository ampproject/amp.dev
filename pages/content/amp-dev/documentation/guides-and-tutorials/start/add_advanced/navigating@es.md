---
$title: Navegando por su sitio
---

[TOC]

La mayoría de los sitios web para móviles incluyen un menú de navegación del sitio. Estos menús pueden tomar muchas formas diferentes. En este tutorial, probaremos los siguientes ejemplos para presentar la navegación en las páginas de AMP:

- Un enlace a su página de inicio - la opción más simple.
- Una barra de navegación lateral utilizando el componente [amp-sidebar](/es/docs/reference/components/amp-sidebar.html)

## Link de vuelta al home

La forma más sencilla de conseguir que los usuarios accedan a las opciones de navegación habituales de su sitio web es simplemente enviarlos de vuelta a su página principal!

Intente **agregar** este enlace HTML a la etiqueta `<header>`:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img class="home-button" src="icons/home.png" width="36" height="36"></amp-img>
  </a>
 <div class="site-name">News Site</div>
</header>
```

Y **agregue** estas reglas de estilo en su CSS:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  flex: 1;
  margin-left: -36px;
}
article {
  margin-top: 50px;
}
```

Ahora **actualice** la página. Debería ver un enlace en la esquina superior izquierda de la página que apunta a `homepage.html`. Si hace clic en el icono de inicio, descubrirá rápidamente que no conduce a ninguna parte (porque no tenemos un archivo `homepage.html`).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Icono de navigacion al home') }}

Este enlace se puede reemplazar por la URL de la página principal de su sitio web para permitir a sus usuarios navegar a otras partes de su sitio a través de la navegación de su sitio web actual.

Este es el enfoque más sencillo que aprovecha la navegación de su sitio web existente. A continuación, exploraremos una opción popular para la navegación del sitio.

## Navegar con una barra lateral

Una técnica de navegación común es agregar un icono de menú que al hacer clic en el botón muestra un conjunto de enlaces de navegación (desde el lado de la página). En AMP, podemos crear dicha navegación con el componente [amp-sidebar](/es/docs/reference/components/amp-sidebar.html).

Primero, debemos **agregar** el componente `amp-sidebar` de JavaScript a la etiqueta `<head>`:

```html
<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
```

A continuación, queremos mostrar un icono de menú. Cuando se pulsa el icono, se abrirá la barra lateral. **Reemplace** el `<header>` con el código siguiente para mostrar un icono de ["hamburger"](https://en.wikipedia.org/wiki/Hamburger_button) en lugar de un icono de inicio:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">☰</div>
  <div class="site-name">News Site</div>
</header>
```

En el código anterior,  `toggle` la barra lateral a través del atributo de acción [`on`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md', locale=doc.locale).url.path}}) en el elemento de barra lateral de amplificador, que se identifica por el ID `sidebar1`. Vamos a agregar la barra lateral.

**Agregue** el siguiente HTML justo después del `</header>`:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div role="button" aria-label="close sidebar" on="tap:sidebar1.toggle" tabindex="0" class="close-sidebar">✕</div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Nuestra barra lateral estará oculta, pero cuando el usuario toque el icono de la hamburguesa, el menú aparecerá desde el lado izquierdo de la pantalla. Para cerrar el menú, el usuario puede tocar el icono X.

Finalmente, **agregue** estas reglas de estilo a su CSS:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom:10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Bueno, veamos nuestra barra lateral. **Actualiza** y vuelve a cargar tu página de AMP. Debería ver algo como esto:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Navegación por el menú de la barra lateral') }}

Nuestra página se ve muy bien! Añadamos un toque final: una fuente personalizada!

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/tracking_data.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/fonts.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próximo</span></a>
</div>
