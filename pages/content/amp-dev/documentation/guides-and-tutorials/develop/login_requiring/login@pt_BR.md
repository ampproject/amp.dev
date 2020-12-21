---
"$title": Login
"$order": '1'
description: Na primeira vez em que chegar na página, você verá dois comentários e um botão de login. Se procurar pelo botão de login no código, você verá o seguinte...
---

Na primeira vez em que chegar na página, você verá dois comentários e um botão de login.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Se procurar pelo botão de login no código, você verá o seguinte:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

O comportamento de atributos relacionados a [`amp-access`](../../../../documentation/components/reference/amp-access.md) dependem de uma configuração em toda a página de [`amp-access`](../../../../documentation/components/reference/amp-access.md). Neste caso, a seguinte:

[sourcecode:html]
<script id="amp-access" type="application/json">
  {
    "authorization": "https://ampbyexample.com/samples_templates/comment_section/authorization?rid=READER_ID&url=CANONICAL_URL&ref=DOCUMENT_REFERRER&_=RANDOM",
    "noPingback": "true",
    "login": {
      "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
      "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
    },
    "authorizationFallbackResponse": {
      "error": true,
      "loggedIn": false
    }
  }
</script>
[/sourcecode]

O endpoint de autorização é implantado como parte do AMPByExample. O fornecimento desse endpoint é de responsabilidade do editor da página. No caso desse exemplo, por questões de simplicidade, implementamos uma lógica básica para que, quando a solicitação for recebida, o servidor leia o valor de um cookie chamado `ABE_LOGGED_IN`. Se o cookie não estiver lá, retornaremos uma resposta JSON com `loggedIn = false`. Como resultado, na primeira vez em que um usuário acessar a página, a solicitação retornará `loggedIn = false` e o botão de login será exibido.

Ao usar `on="tap:amp-access.login-sign-in"` para verificar novamente o código HTML do botão, determinamos que, assim que o usuário tocar no botão, a URL especificado no JSON acima deve ser usada:

[sourcecode:json]
{
	"login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

[tip type="note"] <strong>OBSERVAÇÃO –</strong> É possível definir URLs diferentes dentro do nó de login. Neste caso, estamos definindo `sign-in` e depois definiremos `sign-out`.[/tip]

A página de login não é AMP e, para simplificar o processo, é onde preenchemos os valores de login e senha. O tipo de entrada oculta `returnURL` é preenchido pelo servidor AMPByExample por meio de modelos do servidor. O servidor lê esse valor de um parâmetro chamado `return`, adicionado automaticamente pela biblioteca AMP à URL de login.

No exemplo abaixo, o valor do parâmetro `return` é adicionado à solicitação assim que você clica no botão de login. Explore esse valor usando o console do Chrome DevTools e acessando a guia "Rede".

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Quando o servidor AMPByExample receber a solicitação POST da página de login, e o login e a senha estiverem corretos, ele redirecionará a solicitação para o `returnURL` mencionado acima e anexará o parâmetro `#success=true`. Depois disso, o runtime AMP poderá autorizar a página e, por fim, permitir que você adicione um comentário.

É importante entender o que o runtime AMP faz e o que o servidor deveria estar fazendo, já que a implementação do servidor é de responsabilidade do editor da página.

Veja abaixo um breve resumo:

- O runtime AMP adiciona automaticamente o parâmetro de retorno à solicitação de login especificada no objeto JSON de login.
- O runtime AMP fecha a página de login e faz o redirecionamento para a página especificada pelo parâmetro da URL de retorno.
- O servidor deve coordenar a resposta assim que o usuário clicar no botão de login.

Dica: Veja uma explicação detalhada sobre esse fluxo na [`amp-access`](../../../../documentation/components/reference/amp-access.md).
