---
$title: Agregar un comentario
$order: 1
---

<amp-img src="/static/img/comment.png" alt="Agregar un comentario" height="325" width="300"></amp-img>

En este punto, el usuario puede agregar un comentario utilizando la librería `amp-form`. Observe cómo la presencia del formulario es condicional, dependiendo del estado del componente de `amp-access`:

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

Especificamos un método POST y una acción XHR, ya que las acciones no XHR no están permitidas con los métodos POST en AMP. Debido a que se trata de una demostración, no estamos persistiendo comentarios, por lo que sólo es posible añadir un comentario en el momento; cada vez que se agrega un comentario, el servidor AMPByExample responde con una respuesta JSON que contiene el texto introducido con algunas adiciones, como una marca de tiempo, un avatar y un nombre para el usuario.

He aquí un ejemplo de respuesta JSON:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

El componente de formulario simplemente mostrará esos valores dentro de la página usando la plantilla [amp-mustache](https://www.ampproject.org/docs/reference/components/amp-mustache):

[sourcecode:html]
<div submit-success>
  <template type="amp-mustache">
    <div class="comment-user">
      <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
      <div class="card comment">
        <p><span class="user">{% raw %}{{User}}{% endraw %}</span><span class="date">{% raw %}{{Datetime}}{% endraw %}</span></p>
        <p>{% raw %}{{Text}}{% endraw %}</p>
      </div>
    </div>
  </template>
</div>
[/sourcecode]

En este ejemplo, sólo estamos comprobando si el valor del comentario no está vacío; si el valor está vacío, devolvemos un error que hace que el código siguiente se ejecute

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

Como un toque extra, añadimos el atributo `required` para reforzar la presencia del texto del comentario antes de enviar el comentario:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Cuando añada un comentario y haga clic en el botón Enviar, debería ver algo similar a la siguiente captura de pantalla:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>

<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/login_requiring/login.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/login_requiring/logout.html"><span class="arrow-next">Próximo</span></a>
</div>
