---
$title: amp-access
$category@: dynamic-content
teaser:
  text: Oferece um paywall AMP e compatibilidade com assinaturas.
---



O AMP Access ou "paywall AMP e compatibilidade com assinaturas" oferece aos editores controle sobre qual conteúdo pode ser acessado por um leitor e com quais restrições, com base no status da assinatura do leitor, no número de visualizações e em outros fatores.

# amp-access <a name="amp-access"></a>



<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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
    <td><strong>Disponibilidade</strong></td>
    <td>Estável</td>
  </tr><tr>
  <td class="col-fourty"><strong>Script obrigatório</strong></td>
  <td>
    <div>
      <code>&lt;script async custom-element="amp-access" src="https://ampjs.org/v0/amp-access-0.1.js">&lt;/script></code>
    </div>
  </td>
</tr>
<tr>
  <td class="col-fourty"><strong>Exemplos</strong></td>
  <td><a href="https://ampbyexample.com/components/amp-access/">Exemplo de código com notas para amp-access</a></td>
</tr>
</table>

## Relacionamento com `amp-subscriptions` <a name="relationship-to-amp-subscriptions"></a>

A extensão [`amp-subscriptions`](amp-subscriptions.md) oferece recursos semelhantes a `amp-access`. No entanto, ela é compatível com um protocolo de paywall de acesso mais especializado. Algumas diferenças notáveis são:

1. A resposta de direitos `amp-subscriptions` é semelhante à autorização de amp-access, mas é definida e padronizada de forma rígida.
1. A extensão `amp-subscriptions` permite que vários serviços sejam configurados para que a página participe das decisões de acesso/paywall. Eles são executados simultaneamente e priorizados com base no serviço que retorna a resposta positiva.
1. Como prova de acesso, os visualizadores de AMP têm permissão para fornecer ao `amp-subscriptions` uma resposta de autorização assinada, baseada em um contrato independente com editores.
1. A marcação de conteúdo do `amp-subscriptions` é padronizada, permitindo que apps e rastreadores detectem com facilidade as seções de conteúdo premium.

Devido à padronização da marcação, à compatibilidade com vários provedores e à compatibilidade aprimorada com o visualizador, é recomendável que as novas implementações do editor e do provedor de paywall usem `amp-subscriptions`.

## Solução <a name="solution"></a>

A solução proposta fornece controle ao editor sobre as decisões e os fluxos a seguir:
- Criar e manter usuários
- Controle de limite (permitir determinado número de visualizações gratuitas)
- Responsabilidade pelo fluxo de login
- Responsabilidade pela autenticação do usuário
- Responsabilidade pelas regras e autorização de acesso
- Flexibilidade para os parâmetros de acesso por documento

A solução é composta pelos seguintes componentes:

1. [**Código do leitor de AMP**](#amp-reader-id): fornecido pelo ecossistema de AMP, é um identificador exclusivo do leitor visto pela AMP.
1. [**Marcação de conteúdo de acesso**](#access-content-markup): criada pelo editor, define quais partes de um documento ficam visíveis em quais circunstâncias.
1. [**Endpoint de autorização**](#authorization-endpoint): fornecido pelo editor, retorna a resposta que explica qual parte de um documento o leitor pode consumir.
1. [**Endpoint de pingback**](#pingback-endpoint): fornecido pelo editor, é usado para enviar a impressão de “visualização” de um documento.
1. [**Link de login e página de login**](#login-page-and-login-link): permitem que o editor autentique o leitor e conecte a identidade dele ao código do leitor de AMP.

O Google AMP Cache retorna o documento ao leitor com algumas seções obscurecidas usando a marcação de conteúdo de acesso. O ambiente de tempo de execução de AMP chama o endpoint de autorização e usa a resposta para ocultar ou mostrar seções diferentes, conforme definido pela marcação de conteúdo de acesso. Depois que o documento é exibido para o leitor, o ambiente de tempo de execução de AMP chama o endpoint de pingback, que pode ser usado pelo editor para atualizar o medidor de contagem regressiva (número de visualizações gratuitas usadas).

A solução também permite que o editor coloque no documento AMP um link de login que inicie a página de login/inscrição, na qual o editor pode autenticar o leitor e associar a identidade dele ao código do leitor de AMP.

Na forma básica, essa solução envia o documento completo (embora obscurecido) para o leitor e simplesmente mostra/oculta seções restritas com base na resposta de autorização. No entanto, a solução também fornece a opção "server", em que as seções restritas podem ser excluídas da entrega inicial do documento e transferidas por download somente após a confirmação da autorização.

Para que haja compatibilidade com o AMP Access, é necessário que o editor implemente os componentes descritos acima. A marcação de conteúdo de acesso e o endpoint de autorização são obrigatórios. O endpoint de pingback e a página de login são opcionais.

### Código do leitor de AMP <a name="amp-reader-id"></a>

Para auxiliar os serviços de acesso e casos de uso, o AMP Access introduz o conceito de *código do leitor*.

O código do leitor é um código anônimo e exclusivo criado pelo ecossistema de AMP. Ele é exclusivo para cada par de leitor/editor, ou seja, um leitor é identificado de forma diferente para dois editores distintos. É um código não reversível. O código do leitor está incluído em todas as comunicações do AMP/editor e tem entropia muito alta. Os editores podem usar o código do leitor para identificá-lo e mapeá-lo para os próprios sistemas de identidade.

O código do leitor é construído no dispositivo do usuário e tem longa duração. No entanto, ele segue as regras normais de armazenamento de navegador, incluindo aquelas para janelas anônimas. O ciclo de vida pretendido de um código do leitor é de um ano entre os usos ou até que o usuário limpe os cookies. No momento, os códigos do leitor não são compartilhados entre dispositivos.

O código do leitor é construído de forma semelhante ao mecanismo usado para criar o ExternalCID [descrito aqui](https://docs.google.com/document/d/1f7z3X2GM_ASb3ZCI_7tngglxwS6WoWi1EB3aKzdf6vo/edit#heading=h.hb9q0wpwwhuf) (link em inglês). Um exemplo de código de leitor é `amp-OFsqR4pPKynymPyMmplPNMvxSTsNQob3TnK-oE3nwVT0clORaZ1rkeEz8xej-vV6`.

### Cookies e AMP Access <a name="amp-access-and-cookies"></a>

Os editores podem usar os próprios cookies de autenticação, o código do leitor ou uma combinação dos dois.

### Marcação de conteúdo de acesso <a name="access-content-markup"></a>

A marcação de conteúdo de acesso determina quais seções ficam visíveis ou ocultas com base na resposta de autorização retornada pelo endpoint de autorização. Ela é descrita por atributos de marcação especiais.

### Endpoint de autorização <a name="authorization-endpoint"></a>

Autorização é um endpoint fornecido pelo editor e chamado pelo ambiente de tempo de execução de AMP ou pelo Google AMP Cache. É um endpoint CORS GET credenciado. Esse endpoint retorna os parâmetros de acesso que podem ser usados pela marcação de conteúdo para ocultar ou mostrar diferentes partes do documento.

### Endpoint de pingback <a name="pingback-endpoint"></a>

O pingback é um endpoint fornecido pelo editor e chamado pelo ambiente de tempo de execução de AMP ou pelo Google AMP Cache. É um endpoint CORS POST credenciado. O ambiente de tempo de execução de AMP chama esse endpoint automaticamente quando o leitor começa a visualizar o documento. Esse endpoint também é chamado depois que o leitor conclui o fluxo de login. Um dos principais objetivos do pingback é fazer com que o editor atualize as informações de limite.

Pingback opcional. Ele pode ser desativado configurando a propriedade de configuração `noPingback` como `true`.

### Página de login e link de login <a name="login-page-and-login-link"></a>

A página de login é implementada e exibida pelo editor e chamada pelo ambiente de tempo de execução de AMP. Ela geralmente é exibida como uma caixa de diálogo do navegador.

A página de login é acionada quando o leitor toca no link de login, que pode ser colocado pelo editor em qualquer lugar do documento.

## Especificações da v0.1 <a name="specification-v01"></a>

### Configuração <a name="configuration"></a>

Todos os endpoints são configurados no documento AMP como um objeto JSON no HEAD do documento:

```html

<script id="amp-access" type="application/json">
  {
    "property": value,
    ...
    }
</script>

```

As seguintes propriedades são definidas nessa configuração:

<table>
  <tr>
    <th>Propriedade</th>
    <th>Valores</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorization</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>O URL de HTTPS para o endpoint de autorização.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>pingback</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>O URL de HTTPS para o endpoint de pingback.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>noPingback</code></td>
    <td>true/false</td>
    <td>Quando configurada como true, desativa o pingback.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>login</code></td>
    <td class="col-twenty"><code>&lt;URL&gt;</code> ou<br><code>&lt;Map[string, URL]&gt;</code></td>
    <td>O URL de HTTPS para a página de login ou um conjunto de URLs para diferentes tipos de páginas de login.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationFallbackResponse</code></td>
    <td><code>&lt;object&gt;</code></td>
    <td>O objeto JSON a ser usado no lugar da resposta de autorização, se ela falhar.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationTimeout</code></td>
    <td><code>&lt;number&gt;</code></td>
    <td>Tempo limite (em milissegundos) depois do qual a solicitação de autorização é considerada com falha. O valor padrão é 3000. Valores superiores a 3000 são permitidos somente no ambiente de desenvolvimento. </td>
  </tr>
  <tr>
    <td class="col-fourty"><code>type</code></td>
    <td>"client" ou "server"</td>
    <td>O padrão é "client". A opção "server" está em discussão para design, e estes documentos serão atualizados quando ela for concluída.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>namespace</code></td>
    <td>string</td>
    <td>O padrão é vazio. O namespace é necessário se vários provedores de acesso forem especificados.</td>
  </tr>
</table>

Os valores de *`<URL>`* especificam URLs HTTPS com variáveis de substituição. As variáveis de substituição são abordadas com mais detalhes na seção abaixo [Variáveis de URL de acesso](#access-url-variables).

Veja um exemplo da configuração do AMP Access:

```html

<script id="amp-access" type="application/json">
{
  "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
  "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
  "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
  "authorizationFallbackResponse": {"error": true}
}
</script>

```

#### Vários provedores de acesso <a name="multiple-access-providers"></a>

É possível especificar vários provedores de acesso usando uma matriz, em vez de um único objeto, e fornecendo um `namespace` para cada entrada.

```html

<script id="amp-access" type="application/json">
[
  {
    "property": value,
    ...
    "namespace": value
  },
  ...
]
</script>
```

### Variáveis de URL de acesso <a name="access-url-variables"></a>

Ao configurar os URLs para vários endpoints, o editor pode usar variáveis de substituição. A lista completa dessas variáveis é definida nas [especificações de variáveis de AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) (link em inglês). Essas especificações adicionam algumas variáveis específicas para acesso, como `READER_ID` e `AUTHDATA`. Algumas das variáveis mais relevantes são descritas na tabela abaixo:

<table>
  <tr>
    <th>Var</th>
    <th>Descrição</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>READER_ID</code></td>
    <td>O código do leitor de AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AUTHDATA(field)</code></td>
    <td>O valor do campo na resposta de autorização.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RETURN_URL</code></td>
    <td>O marcador para o URL de retorno especificado pelo ambiente de tempo de execução de AMP para o qual uma caixa de diálogo de login precisa retornar.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>SOURCE_URL</code></td>
    <td>O URL de origem do documento AMP. Se o documento for exibido a partir de um CDN, o AMPDOC_URL será um URL do CDN, enquanto SOURCE_URL será o URL da fonte original.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AMPDOC_URL</code></td>
    <td>O URL do documento AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>CANONICAL_URL</code></td>
    <td>O URL canônico do documento AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>DOCUMENT_REFERRER</code></td>
    <td>O URL de referência.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>VIEWER</code></td>
    <td>O URL do visualizador de AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RANDOM</code></td>
    <td>Um número aleatório. É útil para evitar o processo de cache do navegador.</td>
  </tr>
</table>

Veja um exemplo do URL estendido com o código do leitor, o URL canônico, as informações de referência e o cachebuster aleatório:
```text
https://pub.com/access?
  rid=READER_ID
  &url=CANONICAL_URL
  &ref=DOCUMENT_REFERRER
  &_=RANDOM
```

A variável AUTHDATA está disponível para pingback e URLs de login. Ela permite passar qualquer campo da resposta de autorização como um parâmetro de URL. Por exemplo, `AUTHDATA(isSubscriber)`. Expressões aninhadas também são permitidas, como `AUTHDATA(other.isSubscriber)`. Se namespaces forem usados, eles poderão ser anexados ao campo, por exemplo, `AUTHDATA(anamespace.afield)`.

### Marcação de conteúdo de acesso <a name="access-content-markup-1"></a>

A marcação de conteúdo de acesso descreve quais seções ficam visíveis ou ocultas. Ela é composta por dois atributos de AMP: `amp-access` e `amp-access-hide`, que podem ser colocados em qualquer elemento HTML.

O atributo `amp-access` fornece a expressão que resulta em true ou false, com base na resposta de autorização retornada pelo endpoint de autorização. O valor resultante indica se o elemento e o respectivo conteúdo estão visíveis ou não.

O valor `amp-access` é uma expressão booleana definida em uma linguagem semelhante a SQL. A gramática é definida no [Apêndice A](#appendix-a-amp-access-expression-grammar) da seguinte forma:
```html

<div amp-access="expression">…</div>
```
As propriedades e os valores se referem às propriedades e aos valores da resposta de autorização retornada pelo endpoint de autorização. Isso fornece um sistema flexível, compatível com diferentes cenários de acesso. Se estiver usando namespaces, adicione-os aos nomes de propriedades, por exemplo, `anamespace.aproperty`.

O atributo `amp-access-hide` pode ser usado para ocultar o elemento de maneira otimista antes que a resposta de autorização seja recebida, o que pode mostrá-lo. Ele fornece a semântica de "invisível por padrão". A resposta de autorização retornada posteriormente pela autorização pode rescindir esse padrão e tornar a seção visível. Quando o atributo `amp-access-hide` é omitido, a seção é mostrada/incluída por padrão. O atributo `amp-access-hide` só pode ser usado em conjunto com o atributo `amp-access`.
```html
<div amp-access="expression" amp-access-hide>…</div>
```

Se houver falha na solicitação de autorização, as expressões `amp-access` não serão avaliadas, e a definição de se uma seção ficará visível ou oculta será feita pela presença do atributo `amp-access-hide` fornecido inicialmente pelo documento.

Podemos estender o conjunto de atributos `amp-access-*` conforme necessário para que seja compatível com diferentes necessidades de ofuscação e renderização.

Se houver falha na solicitação de autorização e a resposta "authorizationFallbackResponse" não for especificada no documento, as expressões `amp-access` não serão avaliadas, e a definição de se uma seção ficará visível ou oculta será feita pela presença do atributo `amp-access-hide` fornecido inicialmente pelo documento.

Veja um exemplo que mostra o link de login ou o conteúdo completo, com base no status da assinatura:
```html
<header>
  Title of the document
</header>
<div>
  First snippet in the document.
</div>

<div amp-access="NOT subscriber" amp-access-hide>
  <a on="tap:amp-access.login">Become a subscriber now!</a>
</div>

<div amp-access="subscriber">
  Full content.
</div>

```
Aqui:
- *subscriber* é um campo booleano da resposta de autorização retornado pelo endpoint de autorização. Essa seção fica oculta por padrão, o que é opcional.
- Esse exemplo opta por mostrar todo o conteúdo de maneira otimista.

Veja outro exemplo que mostra ao leitor a exoneração de responsabilidade sobre o estado do limite:
```html
{% raw %}
<section amp-access="views <= maxViews">
  <template amp-access-template type="amp-mustache">
    You are reading article {{views}} out of {{maxViews}}.
  </template>
</section>
{% endraw %}
```

E este é um exemplo que mostra conteúdo adicional para os assinantes premium:
```html
<section amp-access="subscriptonType = 'premium'">
  Shhh… No one but you can read this content.
</section>
```

### Endpoint de autorização <a name="authorization-endpoint-1"></a>

A autorização é configurada pela propriedade `authorization` na seção [Configuração de AMP Access](#configuration). É um endpoint CORS GET credenciado. Consulte [Segurança de origem do CORS](#cors-origin-security) para saber como essa solicitação precisa ser protegida.

A autorização aceita qualquer parâmetro, conforme definido na seção [Variáveis de URL de acesso](#access-url-variables). Por exemplo, ela pode passar o código do leitor de AMP e o URL do documento. Além dos parâmetros de URL, o editor pode usar qualquer informação fornecida naturalmente pelo protocolo HTTP, como o endereço IP do leitor. A inclusão de `READER_ID` é obrigatória.

Esse endpoint produz a resposta de autorização que pode ser usada na marcação de conteúdo para mostrar/ocultar diferentes partes do conteúdo.

O formato da solicitação é:
```text
https://publisher.com/amp-access.json?
rid=READER_ID
&url=SOURCE_URL
```
A resposta é um objeto JSON de formato livre: pode conter quaisquer propriedades e valores, com poucas limitações. As limitações são:
- Os nomes de propriedades precisam obedecer às restrições definidas pela gramática de expressões de `amp-access` (consulte o [Apêndice A](#appendix-a-amp-access-expression-grammar)). Isso significa, principalmente, que os nomes de propriedades não podem conter caracteres como espaços, traços e outros caracteres que não obedeçam às especificações de "amp-access".

- Os valores da propriedade podem ser apenas de um destes tipos: string, number, boolean.

- Os valores também podem ser aninhados como objetos com valores dos mesmos tipos: string, number, boolean.

- O tamanho total da resposta de autorização serializada não pode ser superior a 500 bytes.

- A resposta não pode incluir informações de identificação pessoal (PII, na sigla em inglês) ou dados pessoais.

Veja uma pequena lista de ideias possíveis para propriedades que podem ser retornadas a partir do endpoint de autorização:
- Informações de limite: número máximo permitido de visualizações e o número atual de visualizações.

- Se o leitor está conectado ou é um assinante.

- Um tipo mais detalhado da assinatura: básico, premium.
- Informação geográfica: país, região, região de publicação personalizada.

Veja um exemplo de resposta quando o leitor não é assinante, tem um limite de 10 artigos/mês e já visualizou seis:
```json
{
  "maxViews": 10,
  "currentViews": 6,
  "subscriber": false
}
```
Este é um exemplo de resposta quando o leitor está conectado e tem uma assinatura do tipo premium:
```json
{
  "loggedIn": true,
  "subscriptionType": "premium"
}
```
O RPC pode ser chamado na fase de pré-renderização e, portanto, não precisa ser usado para a contagem regressiva do limite, considerando que o leitor pode nunca chegar a ver o documento.

Outra consideração importante é que, em alguns casos, o ambiente de tempo de execução de AMP precisa chamar o endpoint de autorização várias vezes em cada impressão de documento. Isso pode acontecer quando o ambiente de tempo de execução de AMP acredita que os parâmetros de acesso do leitor foram alterados significativamente, por exemplo, após um fluxo de login bem-sucedido.

A resposta de autorização pode ser usada pelo ambiente de tempo de execução de AMP e por extensões para três finalidades:

1. Ao avaliar expressões de `amp-access`.
2. Ao avaliar modelos `<template>`, como `amp-mustache`.
3. Ao fornecer variáveis adicionais para pingback e URLs de login usando `AUTHDATA(field)`.

O endpoint de autorização é chamado pelo ambiente de tempo de execução de AMP como um endpoint CORS credenciado. Por isso, ele precisa implementar o protocolo CORS. Ele precisa usar a origem do CORS e a origem da fonte para restringir o acesso ao serviço, conforme descrito em [Segurança de origem do CORS](#cors-origin-security). Esse endpoint pode usar os cookies do editor para o que precisar. Por exemplo, ele pode associar a vinculação entre o código do leitor e a identidade do usuário do editor. A própria AMP não precisa saber disso (e prefere não saber). Para ver mais detalhes, consulte a documentação [Código do leitor de AMP](#amp-reader-id) e [Cookies e AMP Access](#amp-access-and-cookies).

O ambiente de tempo de execução de AMP (ou o navegador) observa os cabeçalhos de resposta do cache ao chamar o endpoint de autorização. Assim, as respostas armazenadas em cache podem ser reutilizadas. Isso pode ser desejado ou não. Se não for, o editor poderá usar os cabeçalhos de controle de cache apropriados e/ou a substituição de variável `RANDOM` para o URL do endpoint.

Se a solicitação de autorização falhar, o ambiente de tempo de execução de AMP a substituirá pela "authorizationFallbackResponse", se ela estiver especificada na configuração. Nesse caso, o fluxo de autorização continuará normalmente com o valor da propriedade "authorizationFallbackResponse" no lugar da resposta de autorização. Se a "authorizationFallbackResponse" não for especificada, o fluxo de autorização falhará. Nesse caso, as expressões de `amp-access` não serão avaliadas, e a presença do atributo `amp-access-hide` fornecida pelo documento determinará se uma seção ficará visível ou oculta.

A solicitação de autorização expira automaticamente, e presume-se que ela falhou após três segundos.

O ambiente de tempo de execução de AMP usa as seguintes classes CSS durante o fluxo de autorização:

1. A classe CSS `amp-access-loading` é configurada na raiz do documento quando o fluxo de autorização é iniciado e é removida quando o fluxo termina ou falha.

2. A classe CSS `amp-access-error` é configurada na raiz do documento quando o fluxo de autorização falha.

Na opção *server*, a chamada para o endpoint de autorização é feita pelo Google AMP Cache como um endpoint HTTPS simples. Isso significa que, nesse caso, os cookies do editor não podem ser entregues.

### Endpoint de pingback <a name="pingback-endpoint-1"></a>

O pingback é configurado por meio da propriedade `pingback` na seção [Configuração de AMP Access](#configuration). É um endpoint CORS POST credenciado. Consulte [Segurança de origem do CORS](#cors-origin-security) para saber como essa solicitação precisa ser protegida.

O URL de pingback é opcional. Ele pode ser desativado com `"noPingback": true`.

O URL de pingback aceita qualquer parâmetro, conforme definido na seção [Variáveis de URL de acesso](#access-url-variables). Por exemplo, ele pode passar o código do leitor de AMP e o URL do documento. A inclusão de `READER_ID` é obrigatória.

O pingback não produz uma resposta. Qualquer resposta é ignorada pelo ambiente de tempo de execução de AMP.

O endpoint de pingback é chamado quando o leitor começa a visualizar o documento e depois que ele conclui o fluxo de login.

O editor pode usar o pingback:
- para fazer contagem regressiva do número de visualizações gratuitas da página;
- para mapear o código do leitor de AMP para a identidade do editor, considerando que, pelo fato de o pingback ser um endpoint CORS credenciado, ele pode conter cookies do editor.

O formato da solicitação é:
```text
https://publisher.com/amp-pingback?
rid=READER_ID
&url=SOURCE_URL
```

### Página de login <a name="login-page"></a>

O URL da página de login é configurado por meio da propriedade `login` na seção [Configuração de acesso AMP](#configuration).

A configuração pode especificar um único URL de login ou um mapa de URLs de login codificados pelo tipo de login. Um exemplo de URL de login:
```json
{
  "login": "https://publisher.com/amp-login.html?rid={READER_ID}"
  }
```

Um exemplo de vários URLs de login:
```json
{
  "login": {
    "signin": "https://publisher.com/signin.html?rid={READER_ID}",
    "signup": "https://publisher.com/signup.html?rid={READER_ID}"
    }
  }
```

O URL aceita qualquer parâmetro, conforme definido na seção [Variáveis de URL de acesso](#access-url-variables). Por exemplo, ele pode passar o código do leitor de AMP e o URL do documento. A substituição de consulta `RETURN_URL` pode ser usada para especificar o parâmetro de consulta para o URL de retorno, por exemplo, `?ret=RETURN_URL`. O URL de retorno é obrigatório. Se a substituição `RETURN_URL` não for especificada, ela será injetada automaticamente com o nome do parâmetro de consulta padrão "return".

A página de login é uma página da Web normal sem restrições especiais, além de precisar funcionar bem como uma [caixa de diálogo do navegador](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/open). Consulte a seção [Fluxo de login](#login-flow) para ver mais detalhes.

O formato da solicitação é:
```text
https://publisher.com/amp-login.html?
rid=READER_ID
&url=SOURCE_URL
&return=RETURN_URL
```
Observe que o parâmetro de URL "return" será adicionado pelo ambiente de tempo de execução de AMP automaticamente se a substituição `RETURN_URL` não for especificada. Depois que a página de login concluir o trabalho, ela precisará redirecionar para o "Return URL" especificado, com o seguinte formato:
```text
RETURN_URL#success=true|false
```
Observe o uso do parâmetro de hash de URL “success”. O valor é “true” ou “false”, dependendo de se o login é bem-sucedido ou abandonado. O ideal é que a página de login, quando possível, envie o sinal em casos de sucesso ou falha.

Se o sinal `success=true` for retornado, o ambiente de tempo de execução de AMP repetirá as chamadas para os endpoints de autorização e pingback para atualizar o estado do documento e informar a "view" com o novo perfil de acesso.

#### Link de login <a name="login-link"></a>

O editor pode colocar o link de login em qualquer parte do conteúdo do documento.

Um ou mais URLs de login são configurados por meio da propriedade "login" na seção [Configuração do AMP Access](#configuration).

O link de login pode ser declarado em qualquer elemento HTML que aceite o atributo “on”. Normalmente, é um elemento de botão ou âncora. Quando um único URL de login é configurado, o formato é:
```html
<a on="tap:amp-access.login">Login or subscribe</a>
```

Quando vários URLs de login são configurados, o formato é `tap:amp-access.login-{type}`. Exemplo:
```html
<a on="tap:amp-access.login-signup">Subscribe</a>
```

Quando namespaces são usados, o formato é `tap:amp-access.login-{namespace}` ou `tap:amp-access.login-{namespace}-{type}`.

A AMP não faz distinção entre login e assinatura. Essa distinção pode ser configurada pelo editor usando vários URLs/links de login ou no lado do editor.

## Integração com *amp-analytics* <a name="integration-with-amp-analytics"></a>

A integração com *amp-analytics* está documentada em [amp-access-analytics.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md).

## Segurança de origem do CORS <a name="cors-origin-security"></a>

Os endpoints de autorização e pingback são endpoints CORS e precisam implementar o protocolo de segurança descrito nas [Especificações de segurança de AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

## Limite <a name="metering"></a>

Limite é o sistema em que o leitor tem acesso a conteúdo premium gratuitamente para várias visualizações de documentos em determinado período. Quando a cota é atingida, o paywall é exibido e o leitor vê um conteúdo parcial com uma mensagem de venda e um link de assinatura/login. Por exemplo, o limite pode ser definido como “o leitor pode ler 10 artigos por mês gratuitamente”.

O AMP Access oferece os seguintes recursos para a implementação de acesso limitado:

1. O READER_ID precisa ser usado para armazenar informações de limite. Como o editor não pode depender da possibilidade de definir cookies em um contexto de terceiros, esses dados precisam ser armazenados no lado do servidor.

2. A “contagem de leitura” só pode ser atualizada no endpoint de pingback.

3. Somente documentos exclusivos podem ser contabilizados na cota. Ou seja, a atualização do mesmo documento dez vezes é contada como uma única visualização. Para essa finalidade, os endpoints de autorização e pingback podem injetar `SOURCE_URL` ou variáveis de URL semelhantes. Consulte [Variáveis de URL de acesso](#access-url-variables).

## Primeiro clique grátis <a name="first-click-free"></a>

A política do Google de Primeiro clique grátis (FCF, na sigla em inglês) é [descrita aqui](https://support.google.com/news/publisher/answer/40543), com a atualização mais recente descrita em mais detalhes [nesta postagem](https://googlewebmastercentral.blogspot.com/2015/09/first-click-free-update.html) (link em inglês).

Para implementar o FCF, o editor precisa: (1) conseguir determinar o serviço de referência para cada visualização, e (2) conseguir contar o número de visualizações por dia para cada leitor.

As duas etapas são abordadas nas especificações do AMP Access. O referenciador pode ser injetado nos URLs de pingback e autorização usando a substituição de URL `DOCUMENT_REFERRER`, conforme descrito em [Variáveis de URL de acesso](#access-url-variables). A contagem de visualizações pode ser feita usando o endpoint de pingback no lado do servidor. Isso é muito parecido com a implementação de limite descrita em [Limite](#metering).

## Fluxo de login <a name="login-flow"></a>

O AMP inicia uma caixa de diálogo como uma janela própria, um pop-up ou uma guia. Sempre que possível, os visualizadores de AMP precisam tentar iniciar a caixa de diálogo de login no navegador para que possam aproveitar as APIs de nível superior do navegador.

O fluxo de login é iniciado pelo ambiente de tempo de execução de AMP quando o leitor ativa o link de login e segue descritivamente as seguintes etapas:

1. A caixa de diálogo (janela própria) é aberta pelo ambiente de tempo de execução de AMP ou pelo visualizador para o URL de login especificado. O URL contém um parâmetro de consulta extra de URL "Return URL" (`&amp;return=RETURN_URL`). Vários outros parâmetros também podem ser expandidos no URL, como o código do leitor. Para ver mais detalhes, consulte a seção [Página de login](#login-page).

2. O editor exibe uma página de login de formato livre.

3. O leitor segue as etapas de login, como inserir nome de usuário/senha ou usar um login social.

4. O leitor envia o login. O editor conclui a autenticação, define cookies e, por fim, redireciona o leitor para o "Return URL" solicitado anteriormente. O redirecionamento contém o parâmetro hash de URL `success`, que pode ser `true` ou `false`.

5. A caixa de diálogo segue o redirecionamento para o "Return URL".

6. O ambiente de tempo de execução de AMP autoriza novamente o documento.

Somente as etapas de 2 a 5 exigem ação do editor, que fornece a própria página de login e garante o redirecionamento correto após a conclusão. Não há restrições especiais impostas à página de login, exceto que ela precisa funcionar bem como uma caixa de diálogo.

Como de costume, o código do leitor precisa ser incluído na chamada para a página de login e pode ser usado pelo editor para mapeamento de identidade. Como uma janela própria, o editor também receberá os cookies e poderá defini-los. Se o leitor já estiver conectado no lado do editor, é recomendável que o editor redirecione imediatamente de volta para o "Return URL" com a resposta `success=true`.

## Glossário de AMP <a name="amp-glossary"></a>

* **Documento AMP**: o documento HTML que segue o formato AMP e é validado pelo validador de AMP. Os documentos AMP podem ser armazenados em cache pelo Google AMP Cache.
* **Validador de AMP**: o programa de computador que faz uma análise estática de um documento HTML e retorna sucesso ou falha, dependendo de se o documento obedece ou não ao formato AMP.
* **Ambiente de tempo de execução de AMP**: o tempo de execução do JavaScript que executa o documento AMP.
* **Google AMP Cache**: o cache de proxy para documentos AMP.
* **Visualizador de AMP**: o aplicativo da Web ou nativo que exibe/incorpora documentos AMP.
* **Publisher.com**: o site de um editor de AMP.
* **Endpoint CORS**: endpoint HTTPS de origem cruzada. Consulte [https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) para ver mais informações. Consulte [Segurança de origem do CORS](#cors-origin-security) para saber como essas solicitações precisam ser protegidas.
* **Leitor**: a pessoa que visualiza os documentos AMP.
* **Pré-renderização de AMP**: os visualizadores de AMP podem usar a pré-renderização, que renderiza um documento oculto antes de ele ser exibido. Isso proporciona uma melhora significativa no desempenho. No entanto, é importante levar em conta que a pré-renderização do documento não constitui uma visualização, já que o leitor pode nunca chegar a ver o documento.

## Revisões <a name="revisions"></a>

* 02/09/2016: propriedade de configuração "noPingback" "e pingback opcional.
* 03/03/2016: reenvio de pingback após o login (v0.5).
* 19/02/2016: amostras corrigidas para remover `{}` das substituições de variáveis de URL.
* 15/02/2016: o [endpoint de configuração](#configuration) e [de autorização](#authorization-endpoint) agora permitem a propriedade "authorizationFallbackResponse", que pode ser usada quando a autorização falha.
* 11/02/2016: tempo limite da solicitação de autorização no [endpoint de autorização](#authorization-endpoint).
* 11/02/2016: referências de campos aninhadas, como `object.field`, agora são permitidas.
* 09/02/2016: seções [Primeiro clique grátis](#metering) e [Limite](#first-click-free).
* 03/02/2016: especificação para segurança da "origem da fonte" adicionada a [Segurança de origem do CORS](#cors-origin-security).
* 01/02/2016: o parâmetro de consulta "return" da página de login pode ser personalizado usando a substituição de URL RETURN_URL.

## Apêndice A: gramática de expressões “amp-access” <a name="appendix-a-amp-access-expression-grammar"></a>

A gramática BNF mais recente está disponível no arquivo [access-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/0.1/access-expr-impl.jison).

O principal trecho dessa gramática é este:

```javascript
search_condition:
  search_condition OR search_condition
  | search_condition AND search_condition
  | NOT search_condition
  | '(' search_condition ')'
  | predicate

predicate:
    comparison_predicate | truthy_predicate

comparison_predicate:
    scalar_exp '=' scalar_exp
    | scalar_exp '!=' scalar_exp
    | scalar_exp '<' scalar_exp
    | scalar_exp '<=' scalar_exp
    | scalar_exp '>' scalar_exp
    | scalar_exp '>=' scalar_exp

truthy_predicate: scalar_exp

scalar_exp: literal | field_ref

field_ref: field_ref '.' field_name | field_name

literal: STRING | NUMERIC | TRUE | FALSE | NULL
```

As expressões de `amp-access` são avaliadas pelo ambiente de tempo de execução de AMP e pelo Google AMP Cache. Isso NÃO faz parte das especificações que o editor precisa implementar. É apenas para fins informativos.

## Discussão detalhada <a name="detailed-discussion"></a>

Esta seção conterá uma explicação detalhada do design subjacente às especificações do amp-access e esclarecerá as opções de design. Em breve.

## Validação <a name="validation"></a>

Consulte as [regras do amp-access](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/validator-amp-access.protoascii) (link em inglês) nas especificações do validador de AMP.
