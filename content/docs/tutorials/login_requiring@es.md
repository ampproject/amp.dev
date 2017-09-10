---
$title: Crear una página AMP que requiere login
$order: 3
numbered: 1
---
Algunas interacciones del usuario con una página, como dejar un comentario, podrían estar condicionadas por un flujo de inicio de sesión. Puede implementar un flujo de inicio de sesión con AMP utilizando el componente [amp-access](https://www.ampproject.org/docs/reference/components/amp-access) combinado con el componente [amp-form](https://www.ampproject.org/docs/reference/components/amp-form).

{% call callout('Tip', type='success') %}
Para ver una implementación de ejemplo, visite la [sección de comentarios de ejemplo](https://ampbyexample.com/samples_templates/comment_section/) en [ampbyexample.com](https://ampbyexample.com).
{% endcall %}

La [muestra de la sección de comentarios](https://ampbyexample.com/samples_templates/comment_section/) combina el `amp-access` y el `amp-form` para crear una sección de comentario que está habilitada sólo cuando un usuario ha iniciado sesión. Para explicar cómo funciona este ejemplo, sigamos el conjunto de acciones que se llevarán a cabo una vez que aterricas en la pagina.

{% include "/views/partials/sub_nav.html" %}

<div class="prev-next-buttons">
<a class="button" href="/es/docs/tutorials/login_requiring/login.html"><span class="arrow-next">Empecemos</span></a>
</div>
