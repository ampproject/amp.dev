---
$title: Crear páginas AMP que requieran iniciar sesión
$order: 4
numbered: 1
---
Quizás te interese que los usuarios tengan que iniciar sesión para realizar determinadas acciones en una página, como dejar comentarios. Con AMP, puedes implementar un flujo de inicio de sesión combinando el componente [amp-access](https://www.ampproject.org/es/docs/reference/components/amp-access) con el componente [amp-form](https://www.ampproject.org/es/docs/reference/components/amp-form).
{% call callout('Nota', type='success') %}
Para consultar un ejemplo de implementación, echa un vistazo a una [sección de comentarios de muestra](https://ampbyexample.com/samples_templates/comment_section/), en [ampbyexample.com](https://ampbyexample.com).
{% endcall %}

En la [sección de comentarios de muestra](https://ampbyexample.com/samples_templates/comment_section/), se combinan los componentes `amp-access` y `amp-form` para crear una sección de comentarios que se habilite solo cuando un usuario inicie sesión. Para explicar cómo se ha implementado este ejemplo, vamos a ver el proceso que tiene lugar al acceder a la página.

{% include "/views/partials/sub_nav.html" %}

<div class="prev-next-buttons">
<a class="button" href="/es/docs/tutorials/login_requiring/login.html"><span class="arrow-next">Empezar</span></a>
</div>