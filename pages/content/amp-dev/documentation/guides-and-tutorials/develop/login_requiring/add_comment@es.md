---
'$title': Adición de un comentario
$order: 2
description: En este momento, un usuario puede añadir un comentario utilizando la biblioteca amp-form. Observe cómo la presencia de la forma es condicional, dependiendo del estado del componente amp-access...
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

En este momento, un usuario puede añadir un comentario utilizando la biblioteca [`amp-form`](../../../../documentation/components/reference/amp-form.md). Observe cómo la presencia de la forma es condicional, dependiendo del estado del componente [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]

<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

Determinamos un método POST y una acción XHR, porque las acciones que no son XHR no están permitidas en los métodos POST de AMP. Al ser una demostración, no se guardan los comentarios, así que solo es posible añadir un comentario en cada ocasión. Cuando se añade un comentario, el servidor AMPByExample envía una respuesta JSON que contiene el texto introducido con información adicional, como una marca de tiempo, un avatar y un nombre de usuario.

Este es un ejemplo de respuesta JSON:

[sourcecode:json] {"Datetime":"09:34:21", "User":"Charlie", "Text":"Hello!", "UserImg":"/img/ic_account_box_black_48dp_1x.png"} [/sourcecode]

Esos valores simplemente se mostrarán en la página utilizando la plantilla [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md):

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

En este ejemplo, solo comprobamos que el valor del comentario no esté vacío. En caso contrario, devolvemos un error que hace que se ejecute el código siguiente:

[sourcecode:html]

<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

Adicionalmente, añadimos el atributo `required` para exigir que el comentario tenga texto antes de que pueda enviarse:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Cuando agrega un comentario y hace clic en el botón para enviarlo, aparece algo similar a lo que se ve en esta captura de pantalla:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>
