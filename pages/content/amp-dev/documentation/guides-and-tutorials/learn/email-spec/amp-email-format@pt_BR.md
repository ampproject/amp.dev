---
'$title': Formato AMP para E-mail
$order: 1
formats:
  - email
teaser:
  text: 'Marcação obrigatória '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

AMP é uma tecnologia conhecida pelo desenvolvimento de páginas web super rápidas em clientes móveis. O AMP é um conjunto de tags HTML com implementação em JavaScript que habilita funcionalidades com um foco adicional no desempenho e segurança, com facilidade. Existem [componentes AMP](https://amp.dev/documentation/components/) para tudo, desde carousels a elementos de formulário responsivos e obtenção de conteúdo a partir de endpoints remotos.

O formato AMP para E-mail oferece [um subconjunto dos componentes AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md) que você pode usar em mensagens de e-mail. Os destinatários de e-mails de AMP podem visualizar e interagir com os componentes de AMP diretamente no e-mail.

## Marcação necessária

O código a seguir representa a quantidade mínima de marcação que compõe uma mensagem de e-mail AMP válida:

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

Uma mensagem de e-mail AMP DEVE

- <a name="dctp"></a>iniciar com o doctype `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>conter uma tag top-level `<html ⚡4email>` (`<html amp4email>` também é aceito). [🔗](#ampd)
- <a name="crps"></a>conter as tags `<head>` e `<body>` (São opcionais em HTML). [🔗](#crps)
- <a name="chrs"></a>conter uma tag `<meta charset="utf-8">` como primeiro elemento filho da tag head. [🔗](#chrs)
- <a name="scrpt"></a>conter uma tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` dentro da tag head. [🔗](#scrpt)
- <a name="boilerplate"></a>conter bolierplate amp4email (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) dentro da tag head para inicialmente ocultar o conteúdo até que o AMP JS seja carregado. [🔗](#boilerplate)

A marcação AMPHTML inteira não pode exceder 200.000 bytes.

## Estrutura e renderização <a name="structure-and-rendering"></a>

O AMP para Email é baseado no subtipo padrão `multipart/alternative` [MIME](https://en.wikipedia.org/wiki/MIME), como definido em [RFC 1521, seção 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

_Para mais informações, veja [Estrutura e renderização de E-mails AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md)._

## Componentes AMP suportados <a name="supported-amp-components"></a>

_Veja [AMP para E-mail: Componentes Suportados](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md)._

## Requisitos de HTML <a name="html-requirements"></a>

_Veja [HTML Suportado em AMP para Email](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-html.md)._

## Requisitos de CSS <a name="css-requirements"></a>

### Seletores and propriedades suportados <a name="supported-selectors-and-properties"></a>

_Veja [CSS Suportado em AMP para Email](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-css.md)._

### Especificando CSS em um documento AMP<a name="specifying-css-in-an-amp-document"></a>

Todo CSS em qualquer documento AMP deve ser incluído numa tag `<style amp-custom>` dentro do head ou inline em atributos `style`.

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

Observação: A tag `<style>` inteira não pode ultrapassar 50,000 bytes. O validador irá verificar isto.

## Dimensões do documento <a name="document-dimensions"></a>

- **Largura ideal**: 800px ou menos (se for mais largo o conteúdo poderá ser inesperadamente truncado em alguns clientes).

- **Altura**: variável, o cliente permite que o usuário role através do conteúdo.

## Validação <a name="validation"></a>

Para garantir que suas mensagens de e-mail atendam aos critérios rigorosos do formato AMP para e-mail, você pode usar as ferramentas de validação existentes do AMP.

Veja [Validação de E-mails AMP](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/) para mais detalhes.

## Privacidade e Segurança <a name="privacy-and-security"></a>

### Rastreando abertura de e-mails e interação <a name="tracking-email-opens-and-interaction"></a>

O AMPHTML permite o rastreamento de e-mails abertos com técnicas de rastreamento de pixels, da mesma forma que os e-mails HTML comuns. Qualquer solicitação de dados de serviços externos iniciada pelo usuário também indicará que o usuário está interagindo com a mensagem. Os clientes de e-mail podem oferecer a seus usuários a capacidade de desativar o carregamento de imagens remotas e outras solicitações externas.

### Análises específicas do AMP <a name="amp-specific-analytics"></a>

As seguintes técnicas de análise, específicas do AMP não são suportadas:

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [Substituição de variáveis ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Considerações para componentes específicos <a name="component-specific-considerations"></a>

Solicitações para imagens dentro de [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) ou [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) podem indicar ao remetente que o usuário está interagindo com a mensagem.

Redirecionamentos no [`<amp-form>`](https://amp.dev/documentation/components/amp-form) não são permitidos em tempo de execução.

## Feedback e suporte <a name="feedback--support"></a>

Para obter suporte e feedback sobre o AMP para E-mail, por favor, utilize o seguinte canal: [ongoing-participation](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#ongoing-participation)
