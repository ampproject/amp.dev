---
$title: Erros de validação das AMP
---

<!---
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

Os documentos AMP válidos não podem incluir erros de validação.
O objetivo deste documento é ajudar você a entender melhor
e corrigir esses erros
ao [validar suas páginas AMP](../../../../documentation/guides-and-tutorials/start/create_amphtml_ad/validate.md).
Para ter uma visão geral completa dos erros de validação,
consulte as [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (em inglês).

## Erros de atributos e tags HTML para AMP

### Tag obrigatória ausente

<table>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Adicione ou corrija a tag HTML obrigatória.</td>
  </tr>
</table>

As seguintes tags precisam estar presentes em todos os documentos AMP:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> ou <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Essas tags obrigatórias incluem um campo `mandatory: true` nas <a href="https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii">especificações do validador de AMP</a> (em inglês).
Elas também são mencionadas nas [especificações das AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md).

### A tag exigida por outra tag está ausente

<table>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Adicione ou corrija a tag HTML exigida.</td>
  </tr>
</table>

O validador informa o erro `TAG_REQUIRED_BY_MISSING`
quando encontra um componente estendido no documento AMP,
mas não o `<script>` equivalente.

Os [componentes estendidos](../../../../documentation/components/index.html)
precisam ser explicitamente incluídos no documento AMP como elementos personalizados.
Para corrigir esses erros, acesse a página de referência do componente estendido,
copie e cole o script necessário na tag `<head>` do documento AMP.

### Tag não permitida

<table>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>DISALLOWED_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova a tag não permitida.</td>
  </tr>
</table>

As tags são colocadas na lista de permissões. Por isso, não há uma lista definitiva de todas as tags não permitidas.
No entanto, as [especificações das AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)
definem amplamente o conjunto de tags não permitidas.

### Não é permitido usar JavaScript personalizado

<table>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>DISALLOWED_SCRIPT_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"Custom JavaScript is not allowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova as tags JavaScript.</td>
  </tr>
</table>

O formato AMP não permite que JavaScript personalizado seja adicionado às páginas, exceto os arquivos JavaScript
fornecidos pelo próprio Projeto AMP. Muitos usos comuns de JavaScript têm
implementações equivalentes na biblioteca de HTML para AMP. Consulte os [componentes
AMP](../../../../documentation/components/index.html) para conhecer o conjunto de componentes que podem ser
usados para aprimorar as páginas HTML para AMP.

Nos casos de uso que não estão previstos aqui, também é possível contribuir com novos
componentes no Projeto AMP. Consulte o documento sobre
[contribuições ao Projeto AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md) (em inglês)
para mais informações.

### Atributo obrigatório ausente

<table>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Adicione o atributo necessário à tag.</td>
  </tr>
</table>

Os atributos obrigatórios para as tags AMP são definidos nas
[especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (em inglês).
Basta pesquisar a tag,
visualizar os atributos listados
e procurar `mandatory: true`.
Os atributos obrigatórios para cada tag AMP também estão listados
nas especificações da tag.

### Valor de atributo inválido

<table>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Corrija o valor do atributo para um que seja válido.</td>
  </tr>
</table>

Esse erro indica que uma tag HTML tem um atributo com um nome permitido,
mas um valor não permitido.
Por exemplo, uma causa comum desse erro são valores inválidos para URLs.
Todos os valores de URL (nos atributos `href` e `src`) precisam corresponder a um desses
[possíveis valores de atributos](http://www.w3schools.com/tags/att_a_href.asp) (em inglês).

<strong>IMPORTANTE:</strong> muitos valores de URL nas AMP exigem HTTPS.
Se você estiver recebendo esse erro e não souber ao certo o motivo,
verifique as especificações relevantes da tag AMP
para ver se o atributo requer HTTPS.

### Atributo não permitido

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova o atributo da tag HTML.</td>
  </tr>
</table>

Os atributos são colocados na lista de permissões. Por isso, não há uma lista definitiva de todos os atributos não permitidos.
Para verificar os atributos compatíveis com cada tag específica,
procure a tag HTML e depois o atributo `attrs`
nas [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (em inglês).

Além de uma lista de permissões de atributos específicos para cada tag,
todas as tags AMP podem usar qualquer um dos atributos da lista de permissões `$GLOBAL_ATTRS`.
Todos os atributos com o prefixo "data-" também estão na lista de permissões.

### Texto obrigatório ausente ou incorreto

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Adicione ou corrija o texto obrigatório dentro da tag.</td>
  </tr>
</table>

CDATA representa os dados de conteúdo entre uma tag HTML inicial e final,
e atualmente é avaliado tanto com a lista de permissões quanto com a lista negra.
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
* "Disallowed &#64;charset in CSS"
* "Disallowed &#64;import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### Texto não permitido dentro da tag

<table>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova o texto não permitido.</td>
  </tr>
</table>

Os dados de CSS específicos foram colocados na lista negra
para validar regras essenciais de CSS das AMP.

A lista a seguir inclui os dados de CSS na lista negra.
Veja também [`disallowed_cdata_regex` nas especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (em inglês):

* `"\\.i?-amp-"` ("CSS -amp- class name prefix")
* `"!important"`
* `"charset"`
* `"&#64;import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Propriedade não permitida dentro do atributo na tag

<table>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova a propriedade não permitida no atributo especificado.</td>
  </tr>
</table>

Esse erro ocorre quando o nome da propriedade dentro de um atributo não é permitido.
A propriedade do termo neste contexto faz referência aos dados estruturados chave/valor dentro de um atributo.
Por exemplo, em
`<meta name="viewport content="width=device-width;minimum-scale=1">`,
`width` e `minimum-scale` são nomes de propriedades.

O seguinte exemplo resultará em um erro DISALLOWED_PROPERTY_IN_ATTR_VALUE:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Como outro exemplo,
o seguinte resultaria em um erro:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

O código correto seria: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Valor de propriedade inválido

<table>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Corrija o valor de propriedade inválido.</td>
  </tr>
</table>

Esse erro ocorre quando o valor da propriedade dentro de um atributo é inválido.
A propriedade do termo neste contexto faz referência aos dados estruturados chave/valor dentro de um atributo.
Por exemplo, em
`<meta name="viewport content="width=device-width;minimum-scale=1">`,
`device-width` e `1` são valores de propriedades.

O seguinte resultaria em um erro INVALID_PROPERTY_VALUE_IN_ATTR_VALUE:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Se você estiver tentando usar um atributo sem valor (como `autoplay`, `controls` ou `loop` para o componente [`amp-video`](../../../../documentation/components/reference/amp-video.md)), mas o processo de criação de HTML gerar um valor padrão (mas inválido) como `true` (por exemplo, o React produzirá `<amp-video autoplay="true" ...>` [por padrão](https://reactjs.org/docs/jsx-in-depth.html#props-default-to-true) (em inglês)), é possível usar o nome do atributo como valor. Por exemplo: `<amp-video autoplay="autoplay" ...>`.

### URL ausente

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Adicione o URL válido.</td>
  </tr>
</table>

Esse erro ocorre quando um atributo requer um URL que está ausente,
como um atributo `href` ou `src` vazio.

### URL inválido

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Corrija o URL incorreto.</td>
  </tr>
</table>

Esse erro ocorre quando um atributo tem um URL,
mas ele é inválido.

### Protocolo de URL inválido

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Use um protocolo válido. Por exemplo, talvez seja necessário usar `https` em vez de `http`.</td>
  </tr>
</table>

Esse erro ocorre com tags que têm um `href` ou `src`
que precisa ser definido para certos protocolos.
Por exemplo, muitas tags exigem `https`.

### Propriedade obrigatória ausente no atributo

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Adicione a propriedade ausente.</td>
  </tr>
</table>

Atualmente, esse erro ocorre quando as seguintes propriedades obrigatórias estão ausentes:

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
                <td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova um dos atributos mutuamente exclusivos.</td>
  </tr>
</table>

Esse erro ocorre quando uma tag tem os dois atributos mutuamente exclusivos.
Por exemplo, somente um é permitido para as seguintes tags:

* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` ou `srcdoc`
* [`amp-jwplayer`](../../../../documentation/components/reference/amp-jwplayer.md): `data-media-id` ou `data-playlist-id`

### Atributo obrigatório ausente na lista

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Adicione o atributo obrigatório ausente nas opções de atributo fornecidas.</td>
  </tr>
</table>

Esse erro ocorre quando um atributo obrigatório de várias opções
está ausente na tag.
Por exemplo, estas tags exigem um atributo de uma das duas opções possíveis:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` ou `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` ou `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` ou `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` ou `data-videoid`

### Tag pai incorreta

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Torne a tag uma derivada direta da tag pai exigida.</td>
  </tr>
</table>

As tags específicas requerem um pai imediato (em vez do ancestral distante).
A lista a seguir exibe o pai necessário para tags específicas
(tag, pai):

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
* `source` requer uma tag de mídia ([`amp-audio`](../../../../documentation/components/reference/amp-audio.md), [`amp-video`](../../../../documentation/components/reference/amp-video.md) etc.).

### Tag ancestral não permitida

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova (ou mova) a tag aninhada não permitida.</td>
  </tr>
</table>

Esse erro ocorre quando uma tag é descendente de outra tag
inválida.
Atualmente, o único exemplo é uma tag <code>template</code>,
que não pode ser aninhada em outra tag <code>template</code>.

### Tag ancestral obrigatória

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova a tag ou torne-a descendente da tag específica.</td>
  </tr>
</table>

As descendentes obrigatórias são definidas nas
[especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (em inglês)
como `mandatory_ancestor`.

O erro ocorre quando as seguintes tags
estão sem `mandatory_ancestor` (tag, ancestral):

* `img` precisa ser descendente de `noscript`.
* `video` precisa ser descendente de `noscript`.
* `audio` precisa ser descendente de `noscript`.
* `noscript` precisa ser descendente de `body`.

### Tag ancestral obrigatória com dica

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova a tag, torne-a descendente da tag específica ou troque-a pela tag da dica.</td>
  </tr>
</table>

O erro ocorre quando uma das seguintes tags é encontrada no documento AMP
e não está devidamente aninhada na ancestral obrigatória:

* `img` não está no pai `noscript`.
* `video` não está no pai `noscript`.
* `audio` não está no pai `noscript`.
* `noscript` não está no pai `body`.

### Tag única duplicada

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova uma das tags duplicadas do documento AMP.</td>
  </tr>
</table>

Esse erro ocorre quando somente uma instância da tag é permitida,
mas é encontrada uma cópia dela.

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

## Erros de estilo e layout <a name="style-and-layout-errors"></a>

Antes de nos aprofundarmos em erros de estilo e layout,
é importante compreender como os
[estilos](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) e o
[layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) funcionam nas AMP.
Como as páginas AMP são HTML, os estilos são muito parecidos com os de qualquer página HTML.
No entanto, existem algumas restrições para garantir que as páginas sejam carregadas rapidamente,
e o validador de AMP aplica essas restrições.

O layout é mais controlado em páginas AMP.
Qualquer tag exibida na página
requer uma altura e largura predefinidas,
reduzindo significativamente os problemas de renderização e de rolagem.
Isso não significa que você precise incluir manualmente esses atributos.
Para certos tipos de layout,
o validador de AMP não detecta erros,
porque os valores padrão são considerados.

Cada tag AMP tem uma lista de `supported_layouts`,
conforme definido nas
[especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (em inglês)
O validador informará erros de layouts não compatíveis
e verificará as regras de validação para o layout predefinido.

### Folha de estilos muito longa

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Reduza o tamanho da folha de estilo para menos de 50.000 bytes.</td>
  </tr>
</table>

O validador de AMP informa esse erro
quando detecta que o tamanho do conteúdo de estilo
em `<style amp-custom>` ultrapassa o limite de 50.000 bytes.

### Erro de sintaxe CSS

<table>
   <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>CSS_SYNTAX</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Corrija o erro de sintaxe CSS.</td>
  </tr>
</table>

Esse erro ocorre quando existem erros de sintaxe CSS
na tag especificada.
Se você não tiver certeza do que está gerando o erro,
verifique o CSS
por meio de um validador on-line desse formato, como o
[csslint](http://csslint.net/) (em inglês).

### Erro de sintaxe CSS em uma regra específica

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Corrija o erro de sintaxe CSS específico.</td>
  </tr>
</table>

Esse erro se refere às regras "@" no CSS.
A tecnologia AMP permite somente algumas regras desse tipo
(consulte também as [especificações das AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).
Por exemplo, <code>@import</code> não é permitido.
O erro de validação diz especificamente
que a regra é inválida,
facilitando a correção dela.

### O layout implícito não é compatível com a tag AMP

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Forneça um atributo de layout válido para a tag.</td>
  </tr>
</table>

Esse erro ocorre quando você não especifica um layout para a tag AMP,
e o layout implícito (com base na largura, na altura e nos tamanhos) não é compatível.
Verifique os valores `supported_layout` para a tag
nas [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (em inglês).

O comportamento real do layout é determinado pelo atributo `layout`.
Para saber mais sobre como funciona o layout,
consulte [Como controlar o layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) e
as [Especificações do sistema de layout de HTML para AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

**Observação:** se você não especificar o layout
e não incluir os valores `width` e `height`,
o layout será CONTAINER por padrão.
O validador informará um erro,
já que CONTAINER não é compatível com todas as tags AMP.
Especifique um layout diferente de CONTAINER
ou adicione um valor `width` e/ou `height`, e o erro desaparecerá.

### Atributo não permitido pelo layout implícito

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Remova o atributo não permitido da tag
      ou especifique um layout que permita isso.</td>
  </tr>
</table>

Esse erro ocorre quando você não especifica um layout para a tag AMP,
e o layout implícito tem um atributo não permitido.
Os atributos não permitidos por tipos de layout são descritos nas
[Especificações do sistema de layout do HTML para AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

### O layout especificado não é compatível com a tag AMP

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Especifique um layout compatível com a tag.</td>
  </tr>
</table>

Esse erro ocorre quando o layout especificado
para a tag não é compatível.
Verifique os valores `supported_layout` para a tag
nas [especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (em inglês).

O comportamento real do layout é determinado pelo atributo `layout`.
Para saber mais sobre como funciona o layout,
consulte [Como controlar o layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) e
as [Especificações do sistema de layout de HTML para AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

### Atributo não permitido pelo layout especificado

<table>
  <tr>
    <td class="col-thirty"><strong>Código</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correção</strong></td>
    <td>Remova o atributo não permitido da tag
      ou especifique um layout que permita isso.</td>
  </tr>
</table>

Esse erro ocorre quando você especifica um layout para a tag AMP
e ele tem um atributo não permitido.
Os atributos não permitidos por tipos de layout são descritos nas
[Especificações do sistema de layout do HTML para AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md).

### Valor inválido para o atributo exigido pelo layout

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Defina o atributo para o valor especificado.</td>
  </tr>
</table>

Esse erro ocorre quando o valor do atributo é inválido para o layout especificado.
Para entender o que causa esse erro,
é necessário conhecer
os [diferentes comportamentos de layouts](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute).

Vamos supor que você definiu o layout como `fixed-height` e
incluiu valores numéricos para `height` e `width`.
O layout `fixed-height` assumirá o valor de `height`.
O atributo `width` não pode estar presente ou precisa ser definido como `auto`.
O validador informa ATTR_VALUE_REQUIRED_BY_LAYOUT.

### Unidades inconsistentes de largura e altura

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Forneça larguras e alturas com unidades consistentes.</td>
  </tr>
</table>

Com exceção de `layout=fixed`,
os atributos de largura e altura precisam ser expressos nas mesmas unidades.
Quando isso não acontecer, esse erro ocorrerá.

Por exemplo, `<amp-img src="" layout="responsive" width="42px" height="42rem">`,
resulta nesta mensagem de erro:

"Unidades inconsistentes para largura e altura na tag '[`amp-img`](../../../../documentation/components/reference/amp-img.md) . A largura é especificada em 'px' enquanto a altura é especificada em 'rem'."

## Erros de modelos

As páginas AMP não podem incluir a sintaxe de modelos,
a menos que essa sintaxe esteja dentro de uma tag AMP
projetada especificamente para incluir modelos, como
[`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md).

É possível incluir modelos nos seus arquivos de origem,
desde que a saída gerada por esses arquivos não tenha os modelos
(veja também
[Como usar pré-processadores CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md#using-css-preprocessors)).

### O atributo contém sintaxe de modelo

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova do atributo a sintaxe de modelo Mustache.</td>
  </tr>
</table>

Esse erro ocorre sempre que o validador encontra uma
[sintaxe de modelo Mustache](https://mustache.github.io/mustache.5.html) (em inglês)
em um valor de atributo.

### O atributo contém sintaxe de modelo sem escape

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Faça o escape do modelo Mustache.</td>
  </tr>
</table>

Esse erro ocorre sempre que o validador encontra uma
[sintaxe de modelo Mustache sem escape](https://mustache.github.io/mustache.5.html) (em inglês)
em um valor de atributo.

### O atributo contém um modelo parcial

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova o modelo Mustache parcial.</td>
  </tr>
</table>

Esse erro ocorre sempre que o validador encontra um
[modelo Mustache parcial](https://mustache.github.io/mustache.5.html) (em inglês)
em um valor de atributo.

## Erros de suspensão de uso

### Tag com uso suspenso

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>DEPRECATED_TAG</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Remova a tag com uso suspenso.</td>
  </tr>
</table>

Esse aviso ocorre quando uma tag AMP que era válida anteriormente é encontrada no documento AMP.
É somente um aviso, e os documentos de AMP com avisos continuam sendo válidos.
No momento, não existem tags com uso suspenso. A advertência é reservada para futuras suspensões de uso.

### Atributo com uso suspenso

<table>
  <tr>
                <td class="col-thirty"><strong>Código</strong></td>
                <td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Formato</strong></td>
                <td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
                <td class="col-thirty"><strong>Correção</strong></td>
                <td>Como prática recomendada, remova o atributo com uso suspenso.</td>
  </tr>
</table>

Esse aviso ocorre quando um atributo das AMP que era válido anteriormente é encontrado no documento AMP.
É somente um aviso, e os documentos AMP com avisos continuam sendo válidos.

Identifique atributos com uso suspenso para cada tag AMP
pesquisando `deprecation` nas
[especificações do validador de AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) (em inglês)
