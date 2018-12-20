---
$title: Sair
---

Assim como o botão de login, a presença do botão de saída depende do estado do componente `amp-access`:

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Quando você clica no botão "Sair", é direcionado ao URL especificado na configuração JSON `amp-access`, como parte do objeto de login:

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Assim como no caso do login, quando o servidor AMPByExample recebe uma solicitação de saída, ele usa o parâmetro de consulta do URL de retorno incluído automaticamente pela biblioteca AMP e faz o redirecionamento para ele, adicionando `#success=true`. Nesse momento, você volta à página inicial. O cookie AMPByExample criado anteriormente para a página de login (chamado de `ABE_LOGGED_IN`) é apagado.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/add_comment.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/summary.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
