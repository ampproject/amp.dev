---
$title: Erros de validação das AMP
---

Os documentos válidos de AMP não podem incluir erros de validação.
O objetivo deste documento é ajudar você a entender melhor e corrigir erros de validação que encontrar ao [validar suas páginas AMP](/pt_br/docs/guides/validate.html).
Para ter uma visão geral completa dos erros de validação, consulte as [especificações do validador das AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

[TOC]

## Erros de atributos e tag HTML das AMP

### Tag obrigatória ausente

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The mandatory tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Adicionar (ou corrigir) a tag HTML obrigatória.</td>
  </tr>
</table>

As seguintes tags precisam estar presentes em todos os documentos de AMP:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Essas tags obrigatórias incluem um campo `mandatory: true` nas [especificações do validador das AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii). Elas também são referidas nas [especificações das AMP](/docs/reference/spec.html).

### A tag exigida por outra tag está ausente

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">TAG_REQUIRED_BY_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The '%1' tag is missing or incorrect, but required by '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Adicionar (ou corrigir) a tag HTML exigida.</td>
  </tr>
</table>

O validador informa o erro `TAG_REQUIRED_BY_MISSING` quando encontra um componente estendido no documento de AMP, mas não encontra o `<script>` equivalente.

Os [componentes estendidos](/docs/reference/components.html) precisam ser explicitamente incluídos no documento de AMP como elementos personalizados.
Para corrigir esses erros, acesse a página de referência do componente estendido, copie o script necessário e cole-lo no `<head>` do documento de AMP.

### Tag não permitida

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The tag '%1' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover a tag não permitida.</td>
  </tr>
</table>

As tags são colocadas na lista de permissões, por isso não há uma lista definitiva de todas as tags não permitidas. No entanto, as [especificações das AMP](/docs/reference/spec.html) definem amplamente o conjunto de tags não permitidas.

### Atributo obrigatório ausente

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">MANDATORY_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The mandatory attribute '%1' is missing in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Adicionar atributo obrigatório à tag.</td>
  </tr>
</table>

Os atributos obrigatórios para as tags AMP são definidos nas [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
Basta pesquisar a tag, visualizar os atributos listados e procurar `mandatory: true`.
Os atributos obrigatórios para cada tag AMP também estão listados nas especificações da tag.

### Valor de atributo inválido

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">INVALID_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Corrigir o valor do atributo para um que seja válido.</td>
  </tr>
</table>

Este erro indica que uma tag HTML tem um atributo com um nome permitido, mas com um valor não permitido.
Por exemplo, um acionador comum para esse erro são valores inválidos para URLs. Todos os valores de URL (nos atributos `href` e `src`) precisam corresponder a um desses [possíveis valores de atributos](http://www.w3schools.com/tags/att_a_href.asp).

<strong>IMPORTANTE:</strong> Muitos valores de URL nas AMP exigem HTTPS. Se você estiver recebendo este erro e não souber ao certo o motivo, verifique as especificações relevantes da tag AMP para ver se o atributo requer HTTPS.

### Atributo não permitido

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">DISALLOWED_ATTR</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The attribute '%1' may not appear in tag '%2'."</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover o atributo da tag HTML.</td>
  </tr>
</table>

Os atributos são colocados na lista de permissões, portanto não há uma lista definitiva de todos os atributos não permitidos.
Para verificar os atributos compatíveis com cada tag específica, procure a tag HTML e depois o atributo `attrs` nas [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Além de uma lista de permissões de atributos específicos para cada tag, todas as tags AMP podem usar qualquer um dos atributos da lista de permissões `$GLOBAL_ATTRS`. Todos os atributos com o prefixo `"data-"` também estão na lista de permissões.

### Texto obrigatório ausente ou incorreto

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">MANDATORY_CDATA_MISSING_OR_INCORRECT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Adicionar ou corrigir o texto obrigatório dentro da tag.</td>
  </tr>
</table>

CDATA representa os dados de conteúdo entre uma tag HTML inicial e final, e atualmente é avaliado tanto com a lista de permissões quanto com a lista negra.
As tags com CDATA obrigatório incluem:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

e

[sourcecode:html]
<style amp-custom>
[/sourcecode]

As mensagens detalhadas para isso podem ser uma das seguintes:

* "Mandatory style boilerplate (js enabled)"
* "Mandatory style boilerplate (noscript)"
* "Disallowed -amp- CSS class name prefix"
* "Disallowed !important attribute in CSS"
* "Disallowed @charset in CSS"
* "Disallowed @import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### Texto não permitido dentro da tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">CDATA_VIOLATES_BLACKLIST</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover o texto não permitido.</td>
  </tr>
</table>

Os dados de CSS específicos foram colocados na lista negra para validar regras essenciais de CSS das AMP.

A lista a seguir inclui os dados de CSS na lista negra (ver também [`blacklisted_cdata_regex` nas especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)):

* `"\\.i?-amp-"` ("CSS -amp- class name prefix")
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Propriedade não permitida dentro do atributo na tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">DISALLOWED_PROPERTY_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover a propriedade não permitida no atributo especificado.</td>
  </tr>
</table>

Este erro ocorre quando o nome da propriedade dentro de um atributo não é permitido.
A propriedade do termo neste contexto faz referência aos dados estruturados chave/valor dentro de um atributo.
Por exemplo, em `<meta name="viewport content="width=device-width;minimum-scale=1">`, `width` e `minimum-scale` são nomes de propriedade.

O seguinte exemplo resultará em um erro DISALLOWED_PROPERTY_IN_ATTR_VALUE:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Como outro exemplo, o seguinte resultaria em um erro:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

Ele deveria ser: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Valor de propriedade inválido

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Corrigir o valor da propriedade inválido.</td>
  </tr>
</table>

Este erro ocorre quando o valor da propriedade dentro de um atributo é inválido.
A propriedade do termo neste contexto faz referência aos dados estruturados chave/valor dentro de um atributo.
Por exemplo, em `<meta name="viewport content="width=device-width;minimum-scale=1">`, `device-width` e `1` são os valores de propriedade.

O seguinte resultaria em um erro NVALID_PROPERTY_VALUE_IN_ATTR_VALUE:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Como outro exemplo, o seguinte resultaria em um erro:

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

Ele deveria ser: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### URL ausente

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td><span class="notranslate">MISSING_URL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td><span class="notranslate">"Missing URL for attribute '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Adicionar o URL válido.</td>
  </tr>
</table>

Este erro ocorre quando um atributo requer um URL que está ausente, por exemplo, um atributo `href` ou `src` vazio.

### URL inválido

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td><span class="notranslate">"Malformed URL '%3' for attribute '%1' in tag '%2'"</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Corrigir o URL incorreto.</td>
  </tr>
</table>

Este erro ocorre quando um atributo tem um URL, mas ele é inválido.

### Protocolo de URL inválido

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td><span class="notranslate">Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Alterar para um protocolo válido, por exemplo, talvez `http` precise ser `https`.</td>
  </tr>
</table>

Este erro ocorre para as tags que têm um `href` ou `src` que precisa ser definido para certos protocolos.
Por exemplo, muitas tags exigem `https`.

### Propriedade obrigatória ausente no atributo

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The property '%1' is missing from attribute '%2' in tag '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Adicionar a propriedade ausente.</td>
  </tr>
</table>

Atualmente, este erro ocorre se as seguintes propriedades obrigatórias estão ausentes:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

Elas fazem referência a tags esperadas:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### Atributos mutuamente exclusivos

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">MUTUALLY_EXCLUSIVE_ATTRS</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover um dos atributos mutuamente exclusivos.</td>
  </tr>
</table>

Este erro ocorre quando uma tag tem os dois atributos mutuamente exclusivos.
Por exemplo, somente um é permitido para as seguintes tags:

* [amp-twitter](/docs/reference/extended/amp-twitter.html): `data-tweetid` ou `src`
* [amp-instagram](/docs/reference/extended/amp-instagram.html): `data-shortcode` ou `src`
* [amp-iframe](/docs/reference/extended/amp-iframe.html): `src` ou `srcdoc`
* [amp-youtube](/docs/reference/extended/amp-youtube.html): `src` ou `data-videoid`

### Atributo obrigatório ausente na lista

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">MANDATORY_ONEOF_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The tag '%1' is missing a mandatory attribute - pick one of %2." </span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Adicionar o atributo obrigatório ausente nas opções de atributo fornecidas.</td>
  </tr>
</table>

Este erro ocorre quando um atributo obrigatório de várias opções está ausente na tag.
Por exemplo, estas tags exigem um atributo de uma das duas opções possíveis:

* [amp-twitter](/docs/reference/extended/amp-twitter.html): `data-tweetid` ou `src`
* [amp-instagram](/docs/reference/extended/amp-instagram.html): `data-shortcode` ou `src`
* [amp-iframe](/docs/reference/extended/amp-iframe.html): `src` ou `srcdoc`
* [amp-youtube](/docs/reference/extended/amp-youtube.html): `src` ou `data-videoid`

### Tag pai incorreta

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">WRONG_PARENT_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The parent tag of tag '%1' is '%2', but it can only be '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Tornar a tag uma derivada direta da tag pai exigida.</td>
  </tr>
</table>

As tags específicas requerem um pai imediato (em vez do ancestral distante).
A lista a seguir exibe o pai necessário para tags específicas (tag, pai):

* `!doctype` requer a tag pai `root`.
* `html` requer a tag pai `!doctype`.
* `head` requer a tag pai `html`.
* `body` requer a tag pai `html`.
* `link` requer a tag pai `head`.
* `meta` requer a tag pai `head`.
* `style amp-custom` requer a tag pai `head`.
* `style` requer a tag pai `boilerplate (noscript)`.
* `noscript` requer a tag pai `head`.
* `script` requer a tag pai `head`.
* `source` requer uma tag de mídia (`amp-audio`, `amp-video` etc.).

### Tag ancestral não permitida

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The tag '%1' may not appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover (ou mover) a tag aninhada não permitida.</td>
  </tr>
</table>

Este erro ocorre quando uma tag é descendente de outra tag inválida.
Atualmente, o único exemplo é uma tag `template`, que não pode ser aninhada em outra tag `template`.

### Tag ancestral obrigatória

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover a tag ou torná-la uma descendente da tag específica.</td>
  </tr>
</table>

As descendentes obrigatórias são definidas nas [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) como `mandatory_ancestor`.

O erro ocorre quando as seguintes tags estão sem `mandatory_ancestor` (tag ancestral):

* `img` precisa ser descendente de `noscript`.
* `video` precisa ser descendente de `noscript`.
* `audio` precisa ser descendente de `noscript`.
* `noscript` precisa ser descendente de `body`.

### Tag ancestral obrigatória com dica

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR_WITH_HINT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover a tag, torná-la uma descendente da tag específica ou substituí-la pela tag com dica.</td>
  </tr>
</table>

O erro ocorre quando uma das seguintes tags é encontrada no documento de AMP e não está devidamente aninhada na ancestral obrigatória:

* `img` não está no pai `noscript`.
* `video` não está no pai `noscript`.
* `audio` não está no pai `noscript`.
* `noscript` não está no pai `body`.

### Tag única duplicada

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">DUPLICATE_UNIQUE_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The tag '%1' appears more than once in the document."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover uma das tags duplicadas do documento de AMP.</td>
  </tr>
</table>

Este erro ocorre quando somente uma instância da tag é permitida, e uma cópia for encontrada.

A lista completa de tags únicas é conhecida:

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

## Erros de estilo e layout

Antes de nos aprofundarmos em erros de estilo e layout, é importante compreender como os [estilos](/pt_br/docs/guides/responsive/style_pages.html) e o [layout](/pt_br/docs/guides/responsive/control_layout.html) funcionam nas AMP. Como as páginas AMP são páginas HTML, os estilos são muito parecidos com os de qualquer página HTML.
No entanto, existem algumas restrições para garantir que as páginas sejam carregadas rapidamente, e o validador de AMP impõe essas restrições.

O layout é mais controlado em páginas AMP.
Qualquer tag exibida na página requer uma altura e largura predefinidas, reduzindo significativamente os problemas de renderização e de rolagem.
Isso não significa que você precise incluir manualmente esses atributos.
Para certos tipos de layout, o validador de AMP não detecta erros, pois há a previsão dos valores padrão.

Cada tag AMP tem uma lista de `supported_layouts`, conforme definido nas [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
O validador informará erros de layouts não compatíveis e verificará as regras de validação para o layout predefinido.

### Folha de estilos muito longa

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">STYLESHEET_TOO_LONG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Reduzir o tamanho da folha de estilo para menos de 50.000 bytes.</td>
  </tr>
</table>

O validador de AMP informa este erro quando detecta que o tamanho do conteúdo estilos dentro `<style amp-custom>` ultrapassa o limite de 50.000 bytes.

### Erro de sintaxe CSS

<table>
   <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Corrigir o erro de sintaxe CSS.</td>
  </tr>
</table>

Este erro ocorre quando existem erros de sintaxe CSS na tag especificada.
Se você não tem certeza do que está gerando o erro, tente executar o CSS por meio de um validador CSS on-line, por exemplo, [csslint](http://csslint.net/).

### Erro de sintaxe CSS em uma regra específica

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX_INVALID_AT_RULE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Corrigir o erro de sintaxe CSS especificado.</td>
  </tr>
</table>

Este erro se refere às regras "@" dentro do CSS, para os quais a AMP só permite algumas regras
(veja também as [especificações das AMP](/docs/reference/spec.html)).
Por exemplo, `@import` não é permitido.
O erro de validação especificamente diz que a regra é inválida, facilitando a correção dela.

### O layout implícito não é compatível com a tag AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">IMPLIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The implied layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Fornecer um atributo de layout válido para a tag.</td>
  </tr>
</table>

Este erro ocorre quando você não especifica um layout para a tag AMP, e o layout implícito (com base na largura, na altura e nos tamanhos) não é compatível.
Verifique os valores `supported_layout` para a tag nas [especificações do validador AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

O comportamento real do layout é determinado pelo atributo `layout`.
Para saber mais sobre como funciona o layout, consulte [Como controlar o layout](/pt_br/docs/guides/responsive/control_layout.html) e as [Especificações do sistema de layout das AMP em HTML](/docs/reference/spec/amp-html-layout.html).

**Observação:** se você não especificar o layout e não incluir os valores `width` e `height`, o layout será CONTAINER por padrão. O validador informará um erro, já que CONTAINER não é compatível com todas as tags AMP.
Especifique um layout diferente de CONTAINER ou adicione um valor de `width` e/ou `height`, e o erro desaparecerá.

### Atributo não permitido pelo layout implícito

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Remover o atributo não permitido da tag ou especificar um layout que permita isso.</td>
  </tr>
</table>

Este erro ocorre quando você não especifica um layout para a tag AMP, e o layout implícito tem um atributo não permitido.
Os atributos não permitidos por tipos de layout são descritos nas [Especificações do sistema de layout das AMP em HTML](/docs/reference/spec/amp-html-layout.html).

### O layout especificado não é compatível com a tag AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">SPECIFIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The specified layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Especificar um layout compatível com a tag.</td>
  </tr>
</table>

Este erro ocorre quando o layout especificado para a tag não é compatível.
Verifique os valores `supported_layout` para a tag nas [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

O comportamento real do layout é determinado pelo atributo `layout`.
Para saber mais sobre como funciona o layout, consulte [Como controlar o layout](/pt_br/docs/guides/responsive/control_layout.html) e as [Especificações do sistema de layout das AMP em HTML](/docs/reference/spec/amp-html-layout.html).

### Atributo não permitido pelo layout especificado

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Remover o atributo não permitido da tag ou especificar um layout que permita isso.</td>
  </tr>
</table>

Este erro ocorre quando você especifica um layout para a tag AMP, e ele tem um atributo não permitido.
Os atributos não permitidos por tipos de layout são descritos nas [Especificações do sistema de layout das AMP em HTML](/docs/reference/spec/amp-html-layout.html).

### Valor inválido para o atributo exigido pelo layout

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">ATTR_VALUE_REQUIRED_BY_LAYOUT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Definir o atributo para o valor especificado.</td>
  </tr>
</table>

Este erro ocorre quando o valor do atributo é inválido para o layout especificado.
Para entender o que aciona esse erro, é necessário conhecer os [diferentes comportamentos de layouts](/pt_br/docs/guides/responsive/control_layout.html).

Vamos supor que você definiu o layout como `fixed-height` e incluiu valores numéricos para `height` e `width`.
O layout de `fixed-height` assume um valor de `height`.
O atributo `width` não pode estar presente ou deve ser definido como `auto`.
O validador informa ATTR_VALUE_REQUIRED_BY_LAYOUT.

### Unidades inconsistentes de largura e altura

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Fornecer larguras e alturas de unidades consistentes.</td>
  </tr>
</table>

Com exceção de `layout=fixed`, os atributos de largura e altura precisam ser expressos nas mesmas unidades.
Quando isso não acontece, esse erro é acionado.

Por exemplo, `<amp-img src="" layout="responsive" width="42px" height="42rem">` resulta nesta mensagem de erro:

"Unidades inconsistentes para largura e altura na tag 'amp-img'. A largura é especificada em 'px' enquanto a altura é especificada em 'rem'."

## Erros de modelos

As páginas AMP não podem incluir a sintaxe de modelos, a menos que essa sintaxe esteja dentro de uma tag AMP projetada especificamente para incluir modelos, como [amp-mustache](/docs/reference/extended/amp-mustache.html).

É possível incluir modelos em seus arquivos de origem, desde que a saída gerada por esses arquivos não tenha os modelos (veja também [Como usar pré-processadores CSS](/pt_br/docs/guides/responsive/style_pages.html)).

### O atributo contém sintaxe de modelo

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">TEMPLATE_IN_ATTR_NAME</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"Mustache template syntax in attribute name '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover do atributo a sintaxe de modelo Mustache.</td>
  </tr>
</table>

Este erro ocorrerá sempre que o validador encontrar a [sintaxe de modelo Mustache](https://mustache.github.io/mustache.5.html) em um valor de atributo.

### O atributo contém sintaxe de modelo sem escape

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">UNESCAPED_TEMPLATE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Realizar o escape do modelo Mustache.</td>
  </tr>
</table>

Este erro ocorrerá sempre que o validador encontrar a [sintaxe do modelo Mustache sem escape](https://mustache.github.io/mustache.5.html) em um valor de atributo.

### O atributo contém modelo parcial

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">TEMPLATE_PARTIAL_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover o modelo Mustache parcial.</td>
  </tr>
</table>

Este erro ocorre sempre que o validador encontrar um [modelo Mustache parcial](https://mustache.github.io/mustache.5.html) em um valor de atributo.

## Erros de suspensão de uso

### Tag com uso suspenso

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">DEPRECATED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">No error message defined as yet (no deprecated tags).</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Remover a tag com uso suspenso.</td>
  </tr>
</table>

Este aviso ocorre quando uma tag AMP anteriormente válida é encontrada no documento de AMP.
É somente um aviso, e os documentos de AMP com avisos continuam sendo válidos.
No momento, não existem tags com uso suspenso. A advertência é reservada para futuras suspensões de uso.

### Atributo com uso suspenso

<table>
  <tr>
  	<td class="col-thirty"><strong>Código</strong></td>
  	<td><span class="notranslate">DEPRECATED_ATTR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correção</strong></td>
  	<td>Como prática recomendada, remover o atributo com uso suspenso.</td>
  </tr>
</table>

Este aviso ocorre quando um atributo das AMP anteriormente válido é encontrado no documento de AMP.
É somente um aviso, e os documentos de AMP com avisos continuam sendo válidos.

Identifique atributos com uso suspenso para cada tag AMP pesquisando `deprecation` nas [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
</body>
</html>
