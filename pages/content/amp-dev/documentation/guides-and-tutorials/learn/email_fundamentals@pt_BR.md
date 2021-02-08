---
'$title': Fundamentos de AMP para E-mail
$order: 1
description: Tudo o que você precisa saber para começar a escrever E-mails AMP válidos.
author: CrystalOnScript
formats:
  - email
---

Se você conhece o AMP, temos ótimas notícias! O AMP para e-mails é simplesmente um subconjunto da biblioteca AMP HTML. Se você não conhece o AMP, também temos uma ótima notícia! Este guia contém tudo o que você precisa saber para começar a escrever E-mails para AMP válidos!

## Requisitos de markup

Os E-mails AMP parecem e-mails HTML clássicos, mas com algumas poucas diferenças. Abaixo está o código mínimo necessário para fazer com que um e-mail seja um e-mail AMP válido.

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    Hello, AMP4EMAIL world.
  </body>
</html>
```

Os provedores de email que suportam os E-mails AMP configuraram verificações de segurança para garantir que os usuários tenham uma experiência agradável e segura. Um e-mail construído com o AMP deve atender a todos os requisitos a seguir:

- Iniciar com o `<!doctype html>` doctype. Isto também é padrão para HTML.
- Conter uma tag top-level `<html amp4email>` ou uma tag `<html ⚡4email>` se o seu e-mail for super sofisticado. Isto identifica o documento como um E-mail AMP para que possa ser tratado como tal.
- Definir as tags `<head>` e `<body>`. Isto é opcional em HTML, mas o AMP mantém tudo intacto!
- Incluir uma tag `<meta charset="utf-8>` como primeiro elemento filho do bloco `<head>`. Isto identifica a codificação de caracteres (encoding) para a página.
- A biblioteca AMP é importada através de uma tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` incluída dentro do `<head>`. Sem ela, nenhuma das funcionalidades impressionantes e dinâmicas do AMP irá funcionar! Como prática recomendada, essa tag deve ser incluída bem no início do bloco `<head>`, logo abaixo da tag `<meta charset="utf-8">`.
- Inicialmente, mantenha oculto o conteúdo do e-mail até que a biblioteca AMP seja carregada, mantendo o código boilerplate do AMP para E-mail no `<head>`.

```html
<head>
  ...
  <style amp4email-boilerplate>
    body {
      visibility: hidden;
    }
  </style>
</head>
```

### Substituições de tags específicas do AMP

Como a biblioteca AMP para E-mail é um subconjunto da biblioteca AMP HTML, muitas das mesmas regras são aplicadas; As tags específicas do AMP substituem as tags HTML mais pesadas e requerem que largura e altura sejam definidas. Isto permite ao código boilerplate do AMP ocultar o conteúdo até que tenha uma idéia de como ele se apresentará no dispositivo do usuário.

#### Imagens

Para renderizar a página de forma eficiente, todas as tags `<img>` são substituídas por [`<amp-img>`](../../../documentation/components/reference/amp-img.md). A tag `<amp-img>` possui atributos obrigatórios de largura (width) e altura (height) e suporta [o sistema de layout do AMP](amp-html-layout/index.md)

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

A tag `<amp-img>` vem com formas poderosas e integradas de controlar o design responsivo e definir fallbacks.

[tip type="note"] Leia mais sobre o uso de [layout e media queries](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) do AMP e como configurar [fallbacks para imagens](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

#### GIFs

O AMP criou [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email), uma tag específica para imagens GIF que permite ao runtime do AMP reduzir o uso da CPU quando a animação está off-screen. Assim como em `<amp-img>`, a largura (width) e altura (height) precisa ser definida e o elemento precisa incluir uma tag de fechamento.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

Além disso, ele suporta um elemento-filho opcional`placeholder` opcional para ser mostrado enquanto o arquivo do `src` está sendo carregado, e também suporta o sistema de layout do AMP.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## E-mails, com estilo<a name="emails-with-style"></a>

Como todos os clientes de e-mail, o AMP permite atributos `style` inline, mas também suporta CSS dentro da tag `<style amp-custom>` no bloco <head> do e-mail.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

Como os e-mails HTML, o AMP para E-mail suporta um subconjunto limitado de seletores e propriedades do CSS.

Veja [AMP para E-mail: CSS Suportado](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) para uma lista completa do CSS permitido em clientes de e-mail que suportam AMP.

[tip type="important"]O AMP impõe um limite de tamanho de 75.000 bytes para estilos. [/tip]

## Componentes AMP permitidos

Os recursos dinâmicos, visuais e de interatividade dos componentes AMP são o que faz dos e-mails AMP o futuro do e-mail.

A lista completa de [componentes suportados em AMP para E-mail](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) está disponível como parte da especificação AMP para E-mail.

## Autenticação de requisições

Conteúdos dinâmicos e personalizados de e-mail frequentemente requerem autenticação do usuário. No entanto, para proteger os dados do usuário, todas as solicitações HTTP feitas a partir de e-mails AMP podem ser intermediadas por um proxy e ter todos os cookies removidos.

Para autenticar solicitações feitas a partir de e-mails AMP, você pode usar tokens de acesso.

### Tokens de acesso

Você pode usar tokens de acesso para autenticar o usuário. Tokens de acesso são fornecidos e verificados pelo remetente do e-mail. O remetente usa os tokens para garantir que apenas aqueles com acesso ao e-mail AMP possam fazer as solicitações contidas nesse email. Os tokens de acesso devem ser seguros com criptografia e limitados em tempo e escopo. Eles estão incluídos na URL da solicitação.

Este exemplo demonstra o uso de `<amp-list>` para exibir dados autenticados:

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache"> ... </template>
</amp-list>
```

De forma similar, quando usar `<amp-form>`, coloque seu token de acesso na URL `action-xhr`.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### Exemplo

O exemplo a seguir considera um serviço de anotações hipotético que permite que usuários conectados adicionem anotações às suas contas e os visualizem mais tarde. O serviço deseja enviar um e-mail para um usuário, `jane@example.com`, que inclui uma lista de anotações feitas anteriormente. A lista das anotações do usuário atual está disponível no endpoint `https://example.com/personal-notes` em formato JSON.

Antes de enviar o email, o serviço gera um token de acesso de uso limitado e criptografado para `jane@example.com: A3a4roX9x`. O token de acesso é incluído no nome do campo `exampletoken` dentro da query da URL:

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

O endpoint `https://example.com/personal-notes` é responsável por validar o parâmetro exampletoken e encontrar o usuário associado ao token.

### Tokens de acesso de uso limitado

Os tokens de acesso de uso limitado garantem proteção contra falsificação de solicitação (request spoofing) e [ataques de repetição (replay attacks)](https://en.wikipedia.org/wiki/Replay_attack), garantindo que a ação só seja executada pelo usuário para o qual a mensagem foi enviada. A proteção é obtida adicionando um parâmetro de token exclusivo aos parâmetros da solicitação e verificando-o quando a ação é chamada.

O parâmetro de token deve ser gerado como uma chave que só possa ser usada para uma ação específica e um usuário específico. Antes que a ação solicitada seja executada, você deve verificar se o token é válido e corresponde ao que você gerou para o usuário. Se o token corresponder, a ação poderá ser executada e o token se tornará inválido para solicitações futuras.

Tokens de acesso devem ser enviados ao usuário como parte da propriedade url do HttpActionHandler. Por exemplo, se sua aplicação manipular solicitações de aprovação em `http://www.example.com/approve?requestId=123`, você deve considerar incluir nele de um parâmetro `accessToken` adicional e monitorar solicitações enviadas para `http://www.example.com/approve?requestId=123&accessToken=xyz`.

A combinação `requestId=123` e `accessToken=xyz` é o que você precisa gerar de antemão, certificando-se que o `accessToken` não possa ser deduzido do `requestId`. Qualquer solicitação de aprovação com `requestId=123` e nenhum `accessToken` ou com um `accessToken` que não seja idêntico a `xyz` deve ser rejeitada. Depois que essa solicitação for concluída, qualquer solicitação futura com o mesmo ID e token de acesso também deverá ser rejeitada.

## Testando clientes de e-mail específicos

Clientes de email que oferecem suporte ao AMP para E-mail fornecem sua própria documentação e ferramentas de teste para ajudá-lo com sua integração.

Veja [Testando E-mails AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md) para mais informações e links para documentação para clientes de e-mail específicos.
