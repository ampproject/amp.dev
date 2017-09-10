---
$title: Cerrar Sesión
$order: 2
---

De forma similar al botón de inicio de sesión, la presencia del botón de cierre de sesión depende condicionalmente del estado del componente `amp-access`:

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Al hacer clic en el botón Cerrar sesión, se le dirige a la URL que especificó en la configuración de JSON `amp-access`, como parte del objeto de inicio de sesión:

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Similar al inicio de sesión, cuando el servidor AMPByExample recibe una solicitud de cierre de sesión, utiliza el parámetro de consulta de URL de retorno añadido automáticamente por la biblioteca de AMP y los redirecciona añadiendo `#success=true`. En este momento, estás de vuelta en la página inicial; La cookie AMPByExample creada previamente para la página de inicio de sesión (llamada `ABE_LOGGED_IN`) se borraría en este momento.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/login_requiring/add_comment.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/login_requiring/summary.html"><span class="arrow-next">Próximo</span></a>
</div>
