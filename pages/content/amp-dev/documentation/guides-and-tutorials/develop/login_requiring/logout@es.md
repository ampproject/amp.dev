---
$title: Cerrar sesión
---

El botón para cerrar sesión, igual que el botón para iniciar sesión, se muestra en función del estado del componente `amp-access`:

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Al hacer clic en el botón Cerrar sesión, se redirige a los usuarios a la URL que se haya indicado en la configuración JSON del componente `amp-access`, en el objeto "login":

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Cuando el servidor AMPByExample recibe una solicitud para cerrar sesión, tiene lugar un proceso similar al de inicio de sesión: se lee el parámetro de consulta "returnURL" que ha añadido automáticamente la biblioteca AMP y, a continuación, se redirige a los usuarios a dicha URL, a la que se añade `#success=true`. Una vez completado el proceso, el usuario que ha cerrado sesión vuelve a encontrarse en la página inicial, momento en el que se elimina la cookie de AMPByExample que se había creado al iniciar sesión (llamada `ABE_LOGGED_IN`).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/add_comment.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/summary.md', locale=doc.locale).url.path}}"><span class="arrow-next">Siguiente</span></a>
</div>
