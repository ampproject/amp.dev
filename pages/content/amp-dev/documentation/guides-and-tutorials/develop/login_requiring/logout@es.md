---
"$title": Cerrar sesión
"$order": '3'
description: El botón para cerrar sesión, igual que el botón para iniciar sesión, se muestra de acuerdo con el estado del componente amp-access...
---

El botón para cerrar sesión, igual que el botón para iniciar sesión, se muestra de acuerdo con el estado del componente [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Al hacer clic en el botón Cerrar sesión, se redirige a los usuarios a la URL que se haya indicado en la configuración JSON del componente [`amp-access`](../../../../documentation/components/reference/amp-access.md), en el objeto "login":

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Cuando el servidor AMPByExample recibe una solicitud para cerrar sesión, ocurre un proceso similar al del inicio de sesión: se lee el parámetro de consulta "returnURL" que agregó automáticamente la biblioteca AMP y, a continuación, se redirige a los usuarios a dicha URL, a la que se añade `#success=true`. Una vez que se complete el proceso, el usuario que cerró sesión vuelve a encontrarse en la página inicial, momento en el que se elimina la cookie de AMPByExample que se había creado al iniciar sesión (llamada `ABE_LOGGED_IN`).
