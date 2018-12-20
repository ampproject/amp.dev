---
$title: Adicionar um comentário
---

<amp-img src="/static/img/comment.png" alt="Adicionar comentário" height="325" width="300"></amp-img>

Nesse momento, o usuário pode adicionar um comentário usando a biblioteca `amp-form`. A presença do formulário é condicional. Ela depende do estado do componente `amp-access`:

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

Especificamos um método POST e uma ação XHR, porque as AMP não permitem ações que não sejam XHR com métodos POST.
Como esta é apenas uma demonstração, só é possível adicionar um comentário no momento. Sempre que um comentário for adicionado, o servidor AMPByExample enviará uma resposta JSON com o texto inserido e algumas adições, como o carimbo de data/hora, o avatar e o nome do usuário.

Veja um exemplo de resposta JSON:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

O componente do formulário exibirá esses valores dentro da página usando o modelo [amp-mustache](/pt_br/docs/reference/components/amp-mustache.html):

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

Neste exemplo, apenas verificamos se o valor do comentário não está vazio. Caso esteja, retornaremos um erro que fará com que o seguinte código seja executado:

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

Além disso, adicionamos o atributo `required` para exigir que o comentário tenha algum texto antes do envio:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Seu comentário…" required>
[/sourcecode]

Após inserir um comentário e clicar no botão para enviá-lo, você verá algo semelhante à seguinte captura de tela:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/login.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/logout.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
