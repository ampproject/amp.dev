---
'$title': Navegación por su sitio
$order: 5
description: La mayoría de los sitios web para móviles incluyen un menú de navegación del sitio. Estos menús pueden tener muchas formas diferentes. En este tutorial, veremos los siguientes ejemplos para...
---

La mayoría de los sitios web para móviles incluyen un menú de navegación del sitio. Estos menús pueden tomar muchas formas diferentes. En este tutorial, veremos los siguientes ejemplos para presentar la navegación en las páginas de AMP:

- Un enlace a su página de inicio - La opción más simple.
- Una barra de navegación lateral utilizando el componente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md)

## Enlace para volver a Inicio

La forma más sencilla de lograr que los usuarios accedan a las opciones de navegación habituales de su sitio web es simplemente enviarlos de vuelta a su página principal.

Trate de **reemplazar** su etiqueta `<header>` con esta versión que incluye un enlace:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img
      class="home-button"
      src="icons/home.png"
      width="36"
      height="36"
    ></amp-img>
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
  margin: auto;
}
article {
  margin-top: 50px;
}
```

Ahora **actualice** la página. Debería ver un enlace en la esquina superior izquierda de la página que apunta a `homepage.html`. Si hace clic en el icono de inicio, descubrirá rápidamente que no conduce a ninguna parte (porque no tenemos un archivo `homepage.html`).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Icono de navigacion al home') }}

Este enlace se puede reemplazar por la URL de la página principal de su sitio web para permitir que sus usuarios naveguen a otras partes del mismo mediante la navegación de su sitio web actual.

Este es el enfoque más sencillo que aprovecha la navegación de su sitio web existente. A continuación, exploraremos una opción popular para la navegación del sitio.

## Navegación con una barra lateral

Una técnica de navegación común es agregar un icono de menú en el que al hacer clic, muestra un conjunto de enlaces de navegación (desde el lado de la página). En AMP podemos crear dicha navegación con el componente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

Primero, debemos **agregar** el componente [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) de JavaScript a la etiqueta `<head>`:

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
></script>
```

A continuación, queremos mostrar un icono de menú. Cuando se pulse el icono, se abrirá la barra lateral. **Reemplace** el `<header>` con el código siguiente para mostrar un icono de ["hamburguesa"](https://en.wikipedia.org/wiki/Hamburger_button) en vez de un icono de inicio:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

En el código anterior, `toggle` la barra lateral mediante el atributo de acción [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) en el elemento <code>amp-sidebar</code>, que se identifica con el ID `sidebar1`. Agreguemos la barra lateral.

**Agregue** el siguiente HTML justo después del `</header>`:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div
    role="button"
    aria-label="close sidebar"
    on="tap:sidebar1.toggle"
    tabindex="0"
    class="close-sidebar"
  >
    ✕
  </div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Nuestra barra lateral estará oculta, pero cuando el usuario pulse el icono de hamburguesa, el menú aparecerá en el lado izquierdo de la pantalla. Para cerrar el menú, el usuario puede tocar el icono X.

Por último, **agregue** estas reglas de estilo a su CSS:

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
  margin-bottom: 10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Muy bien, ahora veamos nuestra barra lateral. **Actualice** y vuelva a cargar su página de AMP. Debería ver algo como esto:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Navegación por el menú de la barra lateral') }}

¡Nuestra página se ve muy bien! Agreguemos un toque final - ¡Una fuente personalizada!
