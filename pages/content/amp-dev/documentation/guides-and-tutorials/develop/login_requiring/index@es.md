---
$title: Crear páginas AMP que requieran iniciar sesión
---

Quizás te interese que los usuarios tengan que iniciar sesión para realizar determinadas acciones en una página, como dejar comentarios. Con AMP, puedes implementar un flujo de inicio de sesión combinando el componente [amp-access]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}}) con el componente [amp-form]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}).

[tip type="tip"]
**TIP –** Para consultar un ejemplo de implementación, echa un vistazo a una [sección de comentarios de muestra](https://ampbyexample.com/samples_templates/comment_section/), en [ampbyexample.com](https://ampbyexample.com).
[/tip]

En la [sección de comentarios de muestra](https://ampbyexample.com/samples_templates/comment_section/), se combinan los componentes `amp-access` y `amp-form` para crear una sección de comentarios que se habilite solo cuando un usuario inicie sesión. Para explicar cómo se ha implementado este ejemplo, vamos a ver el proceso que tiene lugar al acceder a la página.
