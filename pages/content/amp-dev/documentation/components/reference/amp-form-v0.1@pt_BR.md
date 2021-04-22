---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
toc: true
$title: amp-form
---

<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



<table>
  <tr>
    <td width="40%"><strong>Descrição</strong></td>
    <td>Permite a criação de tags <code>form</code> e <code>input</code>.</td>
  </tr>
  <tr>
    <td><strong>Script obrigatório</strong></td>
      <td><code>&lt;script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">Layouts compatíveis</a></strong></td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><strong>Exemplos</strong></td>
    <td>Veja um exemplo de <a href="https://ampbyexample.com/components/amp-form/">amp-form</a> no site AMP By Example.</td>
  </tr>
</table>


# Comportamento <a name="behavior"></a>

A extensão `amp-form` permite que você crie formulários (`<form>`) para enviar campos de entrada em um documento AMP. A extensão `amp-form` também fornece [polyfills](#polyfills) para alguns comportamentos ausentes em navegadores.

[tip type="important"]
se você enviar dados no seu formulário, o endpoint do servidor precisará implementar os requisitos para a [segurança do CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Antes de criar um `<form>`, é preciso incluir o script exigido para a extensão `<amp-form>`. Se você não fizer isso, seu documento será inválido. Se você está usando tags `input` para finalidades que não sejam o envio dos valores delas (por exemplo, entradas que não estejam dentro de um `<form>`), não é necessário carregar a extensão `amp-form`.

Veja um exemplo de formulário básico:

[example preview="inline" playground="true" imports="amp-form" template="amp-mustache"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"{% if not format=='email'%}  
    target="_top"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          required>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          required>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
    <div submit-success>
      <template type="amp-mustache">
        Subscription successful!
      </template>
    </div>
    <div submit-error>
      <template type="amp-mustache">
        Subscription failed!
      </template>
    </div>
  </form>
```
[/example]

# Atributos <a name="attributes"></a>

# target <a name="target"></a>

Indica onde exibir a resposta do formulário após o envio dele. O valor precisa ser `_blank` ou `_top`.

# action <a name="action"></a>

Especifica um endpoint do servidor para processar a entrada do formulário. O valor precisa ser um URL `https` (absoluto ou relativo) e não pode ser um link para uma CDN.

* Para `method=GET`: use este atributo ou [`action-xhr`](#action-xhr).
* Para `method=POST`: use o atributo [`action-xhr`](#action-xhr).

[tip type="note"]
os atributos `target` e `action` são usados apenas para solicitações GET que não sejam xhr. O ambiente de tempo de execução de AMP usará `action-xhr` para fazer a solicitação e ignorará `action` e `target`. Quando o `action-xhr` não é fornecido, a AMP faz uma solicitação GET para o endpoint `action` e usa `target` para abrir uma nova janela (se `_blank`). O ambiente de tempo de execução de AMP também pode ser substituído usando `action` e `target` nos casos em que a extensão `amp-form` não for carregada.
[/tip]

# action-xhr <a name="action-xhr"></a>

Especifica um endpoint do servidor para processar a entrada do formulário e enviar o formulário via XMLHttpRequest (XHR). Uma solicitação XHR (às vezes chamada de solicitação AJAX) é o local em que o navegador faz a solicitação sem carregar totalmente a página ou ao abrir uma nova página. Os navegadores enviam a solicitação em segundo plano usando a [API Fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API), quando disponível, que é substituída pela [API XMLHttpRequest](https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHttpRequest) no caso dos navegadores mais antigos.

[tip type="important"]
seu endpoint XHR precisa implementar os requisitos de [segurança do CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Esse atributo é obrigatório para `method=POST` e opcional para `method=GET`.

O valor de `action-xhr` pode ser o mesmo endpoint de `action` ou outro e tem os mesmos requisitos de `action` descritos acima.

Para saber mais sobre como redirecionar o usuário após o envio do formulário, consulte a seção [Redirecionamento após um envio](#redirecting-after-a-submission) abaixo.

# Outros atributos de formulário <a name="other-form-attributes"></a>

Todos os outros [atributos de formulário](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/form) são opcionais.

# custom-validation-reporting <a name="custom-validation-reporting"></a>

Este é um atributo opcional que ativa e seleciona uma estratégia personalizada de relatórios de validação. Os valores válidos são: `show-first-on-submit`, `show-all-on-submit` ou `as-you-go`.

Consulte a seção [Validações personalizadas](#custom-validations) para ver mais detalhes.

# Entradas e campos <a name="inputs-and-fields"></a>

**Permitidos**:

* Outros elementos relacionados a formulário, incluindo: `<textarea>`, `<select>`, `<option>`, `<fieldset>`, `<label>`, `<input type=text>`, `<input type=submit>` e assim por diante.
* `<input type=password>` e `<input type=file>` dentro de `<form method=POST action-xhr>`.
* [`amp-selector.`](amp-selector.md)

**Não permitidos**:

* `<input type=button>`, `<input type=image>`.
* A maioria dos atributos relacionados a formulários em entradas, incluindo: `form`, `formaction`, `formtarget`, `formmethod` e outros.

É possível que algumas dessas regras sejam flexibilizadas no futuro. Se você precisa de algum desses itens, [entre em contato](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#suggestions-and-feature-requests) e forneça casos de uso.

Para ver detalhes sobre entradas e campos válidos, consulte [as regras de amp-form](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) nas especificações do validador de AMP.

# Ações <a name="actions"></a>

O elemento `amp-form` expõe as seguintes ações:

| Ação | Descrição |
|--------|-------------|
| `submit` | Permite acionar o envio de formulário em uma ação específica, por exemplo, ao tocar em um link ou [enviar um formulário na alteração de entrada](#input-events). |
| `clear` | Esvazia os valores de cada entrada do formulário. Isso permite que os usuários preencham formulários rapidamente pela segunda vez. |

[tip type="read-on"]
saiba mais sobre [ações e eventos em AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).
[/tip]

# Eventos <a name="events"></a>

O `amp-form` expõe os seguintes eventos:

| Event | Disparado quando |
|-------|-------------|
| `submit` | O formulário é enviado e antes da conclusão do envio. |
| `submit-success` | O envio do formulário é concluído, e a resposta é um sucesso. |
| `submit-error` | O envio do formulário é concluído, e a resposta é um erro. |
| `verify` | A verificação assíncrona é iniciada. |
| `verify-error` | A verificação assíncrona é concluída, e a resposta é um erro. |
| `valid` | O estado de validação do formulário muda para “válido” (de acordo com a [estratégia de relatório](#reporting-strategies) dele). |
| `invalid` | O estado de validação do formulário é "inválido" "(de acordo com a [estratégia de relatório](#reporting-strategies) dele). |

Esses eventos podem ser usados por meio do [atributo `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on).

Por exemplo, o código a seguir escuta os eventos `submit-success` e `submit-error` e mostra lightboxes diferentes dependendo do evento:

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

Veja o [exemplo completo aqui](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Eventos de entrada <a name="input-events"></a>

O AMP expõe eventos `change` e `input-debounced` em elementos `<input>` filhos. Isso permite que você use o [atributo `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on) para executar uma ação em qualquer elemento quando um valor de entrada for alterado.

Por exemplo, um caso de uso comum é enviar um formulário quando houver alteração da entrada (ao selecionar um botão de opção para responder a uma pesquisa, escolher um idioma em uma entrada `select` para traduzir uma página etc.).

[example preview="inline" playground="true" imports="amp-form"]
```html
<form id="myform"
    method="post"
    action-xhr="https://example.com/myform"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <input name="answer1"
          value="Value 1"
          type="radio"
          on="change:myform.submit">Value 1
      </label>
      <label>
        <input name="answer1"
          value="Value 2"
          type="radio"
          on="change:myform.submit">Value 2
      </label>
    </fieldset>
  </form>
```
[/example]

Veja o [exemplo completo aqui](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Acionadores de análise <a name="analytics-triggers"></a>

A extensão `amp-form` aciona os seguintes eventos, que você pode acompanhar na configuração de [amp-analytics](amp-analytics.md):

| Evento                     | Disparado quando                        |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | Uma solicitação de formulário é iniciada.      |
| `amp-form-submit-success` | Uma resposta de sucesso é recebida (ou seja, quando a resposta tem o status `2XX`). |
| `amp-form-submit-error`   | Uma resposta de falha é recebida (ou seja, quando a resposta não tem o status `2XX`). |

Você pode configurar sua análise para que envie esses eventos, como no exemplo a seguir:

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "event": "https://www.example.com/analytics/event?eid=${eventId}",
        "searchEvent": "https://www.example.com/analytics/search?formId=${formId}&query=${formFields[query]}"
      },
      "triggers": {
        "formSubmit": {
          "on": "amp-form-submit",
          "request": "searchEvent"
        },
        "formSubmitSuccess": {
          "on": "amp-form-submit-success",
          "request": "event",
          "vars": {
            "eventId": "form-submit-success"
          }
        },
        "formSubmitError": {
          "on": "amp-form-submit-error",
          "request": "event",
          "vars": {
            "eventId": "form-submit-error"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Os três eventos geram um conjunto de variáveis que correspondem ao formulário específico e aos campos do formulário. Essas variáveis podem ser usadas para análise.

Por exemplo, o formulário a seguir tem um único campo:

```html
<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="Comentar">
    </form>
```

Quando o evento `amp-form-submit`, `amp-form-submit-success` ou `amp-form-submit-error` é acionado, ele gera as seguintes variáveis com os valores especificados no formulário:

  * `formId`
  * `formFields[comment]`

# Renderização de resposta de sucesso/erro <a name="successerror-response-rendering"></a>

Você pode renderizar respostas de sucesso ou erro no seu formulário usando [modelos estendidos](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates), como [amp-mustache](amp-mustache.md). Também é possível renderizar respostas de sucesso por meio da vinculação de dados com [amp-bind](amp-bind.md) e os seguintes atributos de resposta:

| Atributo de resposta | Descrição |
|-----------|---------------------|
| `submit-success` | Pode ser usado para exibir uma mensagem de sucesso se a resposta for bem-sucedida (ou seja, tiver status `2XX`). |
| `submit-error` | Pode ser usado para exibir um erro de envio se a resposta for malsucedida (ou seja, não tiver o status `2XX`).  |
| `submitting` | Pode ser usado para exibir uma mensagem quando o formulário está sendo enviado. O modelo desse atributo tem acesso aos campos de entrada do formulário para fins de exibição. Consulte o [exemplo completo de formulário abaixo](#example-submitting) para saber como usar o atributo `submitting`. |

# Para renderizar respostas com modelos: <a name="to-render-responses-with-templating"></a>

* aplique um atributo de resposta a *qualquer filho direto* do elemento `<form>`;
* renderize a resposta no elemento filho incluindo um modelo nela por meio da tag `<template></template>` ou `<script type="text/plain"></script>` ou fazendo referência a um modelo com o atributo `template="id_of_other_template"`;
* forneça um objeto JSON válido para as respostas para `submit-success` e `submit-error`. As respostas de sucesso e erro precisam ter um cabeçalho `Content-Type: application/json`.

<a id="example-submitting"></a>

# Exemplo: o formulário exibe mensagens de sucesso, erro e envio <a name="example-form-displays-success-error-and-submitting-messages"></a>

No exemplo a seguir, as respostas são renderizadas em um modelo in-line dentro do formulário.

```html
{% raw %}<form ...>
  <fieldset>
    <input type="text" name="firstName">
      …
    </fieldset>
    <div verify-error="">
      <template type="amp-mustache">
        There is a mistake in the form!
        {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting="">
    <template type="amp-mustache">
      Form submitting... Thank you for waiting {{name}}.
    </template>
  </div>
  <div submit-success="">
    <template type="amp-mustache">
      Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
    to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
  </template>
</div>
<div submit-error="">
  <template type="amp-mustache">
    Oops! {{name}}, {{message}}.
  </template>
</div>
</form>
{% endraw %}
```

O endpoint `action-xhr` do editor retorna as seguintes respostas JSON:

Se houver sucesso:

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

Se houver erro:
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

Você pode renderizar as respostas em um modelo referenciado definido anteriormente no documento, usando o código do modelo como o valor do atributo `template`, definido nos elementos com os atributos `submit-success` e `submit-error`.

```html
{% raw %}<template id="submit_success_template" type="amp-mustache">
  Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
</template>
<template id="submit_error_template" type="amp-mustache">
  Oops! {{name}}, {{message}}.
</template></p>

<form ...="">
  <fieldset>
    …
  </fieldset>
  <div submit-success="" template="submit_success_template"></div>
  <div submit-error="" template="submit_error_template"></div>
</form>
{% endraw %}
```

Veja o [exemplo completo aqui](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Para renderizar uma resposta de sucesso com a vinculação de dados <a name="to-render-a-successful-response-with-data-binding"></a>

* Use o [atributo on](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) para vincular o atributo *submit-success* do formulário a [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29).
* Use a propriedade `event` para capturar os dados da resposta.
* Adicione o atributo de estado ao elemento desejado para vincular a resposta do formulário.

O exemplo a seguir demonstra uma resposta <code>submit-success</code> do formulário com o <a href="amp-bind.md"><code>amp-bind</code></a>:
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
      action-xhr="/components/amp-form/submit-form-input-text-xhr"
      target="_ top"
      on="submit-success: AMP.setState({'subscribe': event.response.name})">
  <div>
    <input type="text"
        name="name"
        placeholder="Name..."
        required>
    <input type="email"
      name="email"
      placeholder="Email..."
      required>
  </div>
  <input type="submit" value="Subscribe">
</form>
```

Quando o formulário for enviado com sucesso, ele retornará uma resposta JSON semelhante a esta:

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
}
```
Em seguida, `amp-bind` atualizará o texto do elemento `<p>` para que corresponda ao estado `subscribe`:

```html
...
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
...
```

# Redirecionamento após um envio <a name="redirecting-after-a-submission"></a>

Você pode redirecionar os usuários para uma nova página após o envio de um formulário com sucesso. Para isso, basta configurar o cabeçalho de resposta `AMP-Redirect-To` e especificar um URL de redirecionamento, que precisa ser um URL HTTPS. Caso contrário, a AMP gerará um erro, e o redirecionamento não ocorrerá.  Os cabeçalhos de resposta HTTP são configurados por meio do seu servidor.

Atualize o cabeçalho de resposta `Access-Control-Expose-Headers`, incluindo `AMP-Redirect-To` na lista de cabeçalhos permitidos.  Saiba mais sobre esses cabeçalhos em [Segurança do CORS em AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp) (link em inglês).

*Exemplos de cabeçalhos de resposta:*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"]
para ver como usar o redirecionamento após o envio de um formulário, confira as páginas [Envio de formulário com atualização](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update) e [Página de produto](https://ampbyexample.com/samples_templates/product_page/#product-page) do site AMP By Example (ambas em inglês).
[/tip]

# Validações personalizadas <a name="custom-validations"></a>

A extensão `amp-form` permite que você crie sua própria IU de validação personalizada usando o atributo `custom-validation-reporting` junto com as seguintes estratégias de relatório: `show-first-on-submit`, `show-all-on-submit` ou `as-you-go`.

Para especificar a validação personalizada no seu formulário:

1. Configure o atributo `custom-validation-reporting` no `form` como uma das [estratégias de relatório de validação](#reporting-strategies).
2. Forneça sua própria IU de validação marcada com atributos especiais. O AMP descobrirá os atributos especiais e os informará no momento certo, dependendo da estratégia de relatório especificada.

Veja um exemplo:

[example preview="inline" playground="true" imports="amp-form"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"
    custom-validation-reporting="show-all-on-submit"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          id="name5"
          required
          pattern="\w+\s\w+">
        <span visible-when-invalid="valueMissing"
          validation-for="name5"></span>
        <span visible-when-invalid="patternMismatch"
          validation-for="name5">
          Please enter your first and last name separated by a space (e.g. Jane Miller)
        </span>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          id="email5"
          required>
        <span visible-when-invalid="valueMissing"
          validation-for="email5"></span>
        <span visible-when-invalid="typeMismatch"
          validation-for="email5"></span>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
  </form>
```
[/example]

Para ver mais exemplos, consulte [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

Para mensagens de validação, se seu elemento não tiver conteúdo textual, o AMP o preencherá com a mensagem de validação padrão do navegador. No exemplo acima, quando a entrada `name5` estiver vazia e a validação for iniciada (ou seja, quando o usuário tiver tentado enviar o formulário), o AMP preencherá `<span visible-when-invalid="valueMissing" validation-for="name5"></span>` com a mensagem de validação do navegador e mostrará esse `span` para o usuário.

[tip type="important"]
você precisa fornecer sua própria IU de validação para cada tipo de estado inválido que a entrada possa ter. Se eles não estiverem presentes, os usuários não verão `custom-validation-reporting` para o estado de erro ausente. Os estados de validade podem ser encontrados na [documentação oficial de relatórios de validação HTML do W3C](https://www.w3.org/TR/html50/forms.html#validitystate) (link em inglês).
[/tip]

# Estratégias de relatórios <a name="reporting-strategies"></a>

Especifique uma das seguintes opções de relatório para o atributo `custom-validation-reporting`:

# Show First on Submit <a name="show-first-on-submit"></a>

A opção de relatório `show-first-on-submit` simula o comportamento padrão do navegador quando a validação padrão é iniciada. Ela mostra o primeiro erro de validação encontrado e para nele.

# Show All on Submit <a name="show-all-on-submit"></a>

A opção de relatório `show-all-on-submit` mostra todos os erros de validação em todas as entradas inválidas quando o formulário é enviado. Isso é útil se você quiser mostrar um resumo de validações.

# As You Go <a name="as-you-go"></a>

A opção de relatório `as-you-go` permite que o usuário veja as mensagens de validação enquanto interage com a entrada. Por exemplo, se o usuário digitar um endereço de e-mail inválido, ele verá o erro imediatamente.  Depois de corrigir o valor, o erro desaparecerá.

# Interact and Submit <a name="interact-and-submit"></a>

A opção de relatório `interact-and-submit` combina o comportamento de `show-all-on-submit` e `as-you-go`. Os campos mostrarão erros imediatamente após as interações. Quando o formulário for enviado, serão exibidos erros em todos os campos inválidos.

# Verificação <a name="verification"></a>

A validação de HTML5 fornece feedback com base apenas nas informações disponíveis na página, como, por exemplo, se um valor corresponde a determinado padrão. Com a verificação de `amp-form`, você pode dar ao usuário um feedback que a validação de HTML5 por si só não pode. Por exemplo, um formulário pode usar a verificação para confirmar se um endereço de e-mail já foi registrado. Outro caso de uso é verificar se um campo de cidade corresponde a um campo de CEP.

Veja um exemplo:
```html
{% raw %}<h4>Verification example</h4>
<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post"{% if not format=='email'%}   target="_blank"{% endif %}>
  <fieldset>
    <label>
      <span>Email</span>
      <input type="text" name="email" required="">
      </label>
      <label>
        <span>Zip Code</span>
        <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
          <span>City</span>
          <input type="text" name="city" required="">
          </label>
          <label>
            <span>Document</span>
            <input type="file" name="document" no-verify="">
            </label>
            <div class="spinner"></div>
            <input type="submit" value="Enviar">
            </fieldset>
            <div submit-success="">
              <template type="amp-mustache">
                <p>Congratulations! You are registered with {{email}}</p>
              </template>
            </div>
            <div submit-error="">
              <template type="amp-mustache">
                {{#verifyErrors}}
              <p>{{message}}</p>
              {{/verifyErrors}}
            {{^verifyErrors}}
          <p>Something went wrong. Try again later?</p>
          {{/verifyErrors}}
      </template>
    </div>
  </form>
{% endraw %}
```

O formulário envia um campo `__amp_form_verify` junto com os dados do formulário como uma dica para o servidor de que a solicitação é de verificação, e não um envio formal.
Isso é útil para que o servidor não armazene a solicitação de verificação se o mesmo endpoint for usado para verificação e envio.

Veja um exemplo de resposta de erro para verificação:
```json
  {
    "verifyErrors": [
      {"name": "email", "message": "That email is already taken."},
      {"name": "zip", "message": "The city and zip do not match."}
    ]
  }
```

Para remover um campo da solicitação `verify-xhr`, adicione o atributo `no-verify` ao elemento de entrada.

Para ver mais exemplos, consulte [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Substituições de variáveis <a name="variable-substitutions"></a>

A extensão `amp-form` permite [substituições de variáveis de plataforma](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md) (link em inglês) para entradas ocultas e que tenham o atributo `data-amp-replace`. Em cada envio de formulário, o `amp-form` encontra todas as `input[type=hidden][data-amp-replace]` dentro do formulário, aplica substituições de variáveis ao atributo `value` e o troca pelo resultado da substituição.

Você precisa fornecer as variáveis que está usando para cada substituição em cada entrada, especificando uma string separada por espaços das variáveis usadas em `data-amp-replace` (veja o exemplo abaixo). O AMP não substitui as variáveis que não são explicitamente especificadas.

Veja um exemplo da aparência das entradas antes e depois das substituições (é preciso usar a sintaxe da plataforma para substituição de variáveis, e não para análise):
```html
<!-- Initial Load -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: CANONICAL_URL - RANDOM - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="CLIENT_ID(myid)"
        data-amp-replace="CLIENT_ID">
  ...
</form>
```

Quando o usuário tentar enviar o formulário, o AMP tentará resolver as variáveis e atualizar o atributo `value` de todos os campos com as substituições apropriadas. No caso de envios de XHR, é provável que todas as variáveis sejam substituídas e resolvidas. No entanto, em envios GET que não sejam XHR, os valores que exigem resolução assíncrona podem não estar disponíveis por não terem sido resolvidos anteriormente. `CLIENT_ID`, por exemplo, não seria resolvido se não tivesse sido resolvido e armazenado em cache anteriormente.

```html
<!-- User submits the form, variables values are resolved into fields' value -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: https://example.com/hello - 0.242513759125 - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="amp:asqar893yfaiufhbas9g879ab9cha0cja0sga87scgas9ocnas0ch"
        data-amp-replace="CLIENT_ID">
    ...
</form>
```

Observe como o `CANONICAL_HOSTNAME` acima não foi substituído porque não estava na lista de permissões do atributo `data-amp-replace` no primeiro campo.

As substituições ocorrerão em todos os envios subsequentes. Leia mais sobre [substituições de variáveis em AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md).

# Polyfills <a name="polyfills"></a>

A extensão `amp-form` fornece polyfills para comportamentos e funcionalidades ausentes em alguns navegadores ou que serão implementados na próxima versão do CSS.

# Bloqueio de envio inválido e balão de mensagem de validação <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

Os navegadores que atualmente usam mecanismos baseados em webkit (desde agosto de 2016) não são compatíveis com envios de formulários inválidos. Isso inclui o Safari em todas as plataformas e todos os navegadores para iOS. A extensão `amp-form` fornece polyfills para esse comportamento a fim de bloquear envios inválidos e mostrar balões de mensagens de validação em entradas inválidas.

# Pseudoclasses de interação com o usuário <a name="user-interaction-pseudo-classes"></a>

As pseudoclasses `:user-invalid` e `:user-valid` fazem parte da [futura especificação do CSS Selectors 4](https://drafts.csswg.org/selectors-4/#user-pseudos) e foram lançadas para permitir melhores ganchos para estilizar campos inválidos/válidos com base em alguns critérios.

Uma das principais diferenças entre `:invalid` e `:user-invalid` é quando elas são aplicadas ao elemento. A classe `:user-invalid` é aplicada após uma interação significativa do usuário com o campo (por exemplo, quando o usuário digita em um campo ou desfoca-o).

A extensão `amp-form` fornece [classes](#classes-and-css-hooks) para acrescentar polyfills para essas pseudoclasses. A extensão `amp-form` também propaga as classes para os elementos `fieldset` ancestrais e `form`.

# Validação de `<textarea>` <a name="-validation"></a>

A correspondência de expressão regular é um recurso comum de validação compatível nativamente com a maioria dos elementos de entrada, exceto `<textarea>`. Fornecemos um polyfill para essa funcionalidade e aceitamos o atributo `pattern` em elementos `<textarea>`.

O formulário AMP fornece um atributo `autoexpand` para elementos `<textarea>`. Isso permite que a área de texto se expanda e recolha para acomodar as linhas de entrada do usuário, até o tamanho máximo do campo. Se o usuário redimensionar manualmente o campo, o comportamento de expansão automática será removido.

```html
<textarea autoexpand></textarea>
```

# Estilo <a name="styling"></a>

# Ganchos de classes e CSS <a name="classes-and-css-hooks"></a>

A extensão `amp-form` fornece ganchos de CSS e de classes para os editores definirem o estilo de formulários e entradas.

As seguintes classes podem ser usadas para indicar o estado do envio do formulário:

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

As seguintes classes são um [polyfill para as pseudoclasses de interação do usuário](#user-interaction-pseudo-classes):

* `.user-valid`
* `.user-invalid`

Os editores podem usar essas classes para definir o estilo de entradas e conjuntos de campos para que respondam às ações do usuário (por exemplo, destacar uma entrada inválida com uma borda vermelha após o usuário desfocá-la).

Veja [aqui um exemplo completo ](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html) de como usar essas classes.

[tip type="success"]
visite o site [AMP Start](https://ampstart.com/components#form-elements) para os elementos de formulário AMP responsivos e pré-estilizados que você pode usar nas suas páginas AMP.
[/tip]

# Considerações sobre segurança <a name="security-considerations"></a>

# Proteção contra XSRF <a name="protecting-against-xsrf"></a>

Além de seguir os detalhes das [especificações CORP AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md), preste atenção especial à seção [Processar solicitações de alteração de estado](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests) (link em inglês) para se proteger contra [ataques XSRF](https://pt.wikipedia.org/wiki/Cross-site_request_forgery), em que um invasor pode executar comandos não autorizados usando a sessão atual do usuário sem o conhecimento dele.

Em geral, lembre-se dos seguintes pontos ao aceitar informações do usuário:

* Use somente POST para solicitações de alteração de estado.
* Use GET que não seja XHR apenas para fins de navegação (por exemplo, para pesquisa).
    * As solicitações GET que não sejam XHR não receberão origem/cabeçalhos precisos, e os back-ends não poderão se proteger contra XSRF com o mecanismo acima.
    * Em geral, use solicitações GET XHR/não XHR apenas para navegação ou recuperação de informações.</li>
* Solicitações POST que não sejam XHR não são permitidas em documentos AMP. Isso ocorre devido a inconsistências na configuração do cabeçalho `Origin` dessas solicitações nos navegadores. Além disso, a compatibilidade traria complicações para a proteção contra XSRF. Isso pode ser reconsiderado e introduzido posteriormente. Registre um problema se achar necessário.
