---
"$title": Cerrar sesión
"$order": '3'
description: El botón para cerrar sesión, igual que el botón para iniciar sesión, se muestra de acuerdo con el estado del componente amp-access...
---

El botón para cerrar sesión, igual que el botón para iniciar sesión, se muestra de acuerdo con el estado del componente [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

[sourcecode:html] <button amp-access="loggedIn" amp-access-hide="" tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button> [/sourcecode]

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Al hacer clic en el botón Cerrar sesión, se redirige a los usuarios a la URL que se haya indicado en la configuración JSON del componente [`amp-access`](../../../../documentation/components/reference/amp-access.md), en el objeto "login":
