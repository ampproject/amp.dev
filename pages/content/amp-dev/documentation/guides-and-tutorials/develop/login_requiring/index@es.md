---
'$title': Creación de páginas AMP que requieren inicio de sesión
$order: 0
description: Algunas interacciones del usuario con una página, como dejar un comentario, podrían estar condicionadas por un flujo de entrada. Puede implementar un flujo de inicio de sesión...
numbered: '1'
'$hidden': 'true'
formats:
  - websites
---

Algunas interacciones del usuario con una página, como dejar un comentario, podrían estar condicionadas por un flujo de entrada. Con AMP puede implementar un flujo de inicio de sesión usando el componente [`amp-access`](../../../../documentation/components/reference/amp-access.md) combinado con el componente <a><code>amp-form</code></a>.

[tip type="tip"] **CONSEJO:** Para consultar un ejemplo de implementación, dele un vistazo a la [sección de comentarios de muestra](../../../../documentation/examples/documentation/Comment_Section.html), en [ampbyexample.com](../../../../documentation/examples/index.html). [/tip]

En la [sección de comentarios de muestra](../../../../documentation/examples/documentation/Comment_Section.html), se combinan los componentes [`amp-access`](../../../../documentation/components/reference/amp-access.md) y [`amp-form`](../../../../documentation/components/reference/amp-form.md) para crear una sección de comentarios que se habilite solo cuando un usuario inicie sesión. Para explicar cómo funciona este ejemplo, veamos el proceso que ocurre al acceder a la página.
