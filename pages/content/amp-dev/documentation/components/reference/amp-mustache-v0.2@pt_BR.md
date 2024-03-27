---
$title: amp-mustache
$category@: dynamic-content
teaser:
  text: Permite a renderização de modelos Mustache.js.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



Permite a renderização de [Mustache.js](https://github.com/janl/mustache.js/).

<table>
  <tr>
    <td width="40%"><strong>Script obrigatório</strong></td>
    <td>
      <div>
      <code>&lt;script async custom-template="amp-mustache" src="https://ampjs.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Exemplos</strong></td>
    <td>Veja um exemplo de <a href="https://ampbyexample.com/components/amp-mustache/">amp-mustache</a> com anotações no site AMP By Example.</td>
  </tr>
</table>



## Notas de versão <a name="version-notes"></a>

| Versão | Descrição |
|-------|-----|
| 0.2 | Compatibilidade com elementos `<svg>` e tamanho de pacote reduzido (12,2 KB versus 20,5 KB, compactado com Gzip).<br><br>Migra para uma biblioteca de limpeza de HTML mais moderna (de Caja para DOMPurify). Isso pode causar pequenas alterações interruptivas devido a diferenças na lista de permissões de tags e atributos. Recomendamos que você teste suas páginas antes de enviá-las para a produção para garantir que as alterações na marcação gerada não afetem a funcionalidade. |
| 0.1 | Implementação inicial. |

## Sintaxe <a name="syntax"></a>

Mustache é uma sintaxe de modelo sem lógica. Consulte os [documentos sobre Mustache.js](https://github.com/janl/mustache.js/) (em inglês) para ver mais detalhes. Algumas das principais tags de Mustache são:

*  {% raw %}`{{variable}}`{% endraw %}: uma tag de variável. Gera o valor HTML com escape de uma variável.
* {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: uma tag de seção. Pode testar a existência de uma variável e iterá-la se for uma matriz.
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: uma tag invertida. Pode testar a inexistência de uma variável.
* {% raw %}`{{{unescaped}}}`{% endraw %}: HTML sem escape. Fica restrito à marcação que pode gerar (consulte “Restrições” abaixo).

## Uso <a name="usage"></a>

O modelo `amp-mustache` precisa ser definido e usado de acordo com a [especificação de modelo de AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-templates.md) (link em inglês).

Primeiro, o `amp-mustache` precisa ser declarado/carregado desta forma:

```html
<script src="https://ampjs.org/v0/amp-mustache-0.2.js" async="" custom-template="amp-mustache"></script>
```

Em seguida, os modelos Mustache podem ser definidos em uma tag `script` ou `template` como esta:

[sourcecode:html]
{% raw %}<!-- Using template tag. -->
<template type="amp-mustache">
  Hello {{world}}!
</template>
{% endraw %}[/sourcecode]
ou

<!-- Using script tag. -->
[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}[/sourcecode]

Use a tag `template` sempre que possível, porque a validação de AMP fornece dicas úteis sobre dev-x. Use o modelo `script` para casos extremos e problemas com modelos no contexto de tabelas. Veja a seção "Tabelas" abaixo.

A maneira como os modelos são descobertos, quando são renderizados e a forma como os dados são fornecidos é algo decidido pelo elemento AMP de destino que usa esse modelo para renderizar o conteúdo (por exemplo, em [amp-list](amp-list.md), [amp-form](amp-form.md) etc.).

## Restrições <a name="restrictions"></a>

### Validação <a name="validation"></a>

Como todos os modelos de AMP, os modelos `amp-mustache` precisam ser fragmentos DOM bem formados. Isso significa que, entre outras coisas, não é possível usar o `amp-mustache` para:

* calcular o nome da tag. Por exemplo, {% raw %}`<{{tagName}}>`{% endraw %} não é permitido;
* calcular o nome do atributo. Por exemplo, {% raw %}`<div {{attrName}}=something>`{% endraw %} não é permitido.

A saída de "triple-mustache" é limpa para permitir somente as seguintes tags: `a`, `b`, `br`, `caption`, `colgroup`, `code`, `del`, `div`, `em`, `i`, `ins`, `li`, `mark`, `ol`, `p`, `q`, `s`, `small`, `span`, `strong`, `sub`, `sup`, `table`, `tbody`, `time`, `td`, `th`, `thead`, `tfoot`, `tr`, `u`, `ul`.

### Limpeza <a name="sanitization"></a>

A saída de mustache é limpa por motivos de segurança e para manter a validade de AMP. Isso pode resultar na remoção silenciosa de alguns elementos e atributos.

## Armadilhas <a name="pitfalls"></a>

### Modelos aninhados <a name="nested-templates"></a>

De acordo com a validação de AMP, os elementos `<template>` não podem ser filhos de outros elementos `<template>`. Isso pode acontecer ao aninhar dois componentes que usam modelos, como `amp-list` e `amp-form`.

Para resolver isso, os elementos `<template>` também podem ser referenciados por `id` por meio do atributo de `template` no componente. Exemplo:

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]

Ele também pode ser representado como:

[sourcecode:html]
{% raw %}<!-- Externalize templates to avoid nesting. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]

### Tabelas <a name="tables"></a>

Como as strings de modelo de AMP precisam ser especificadas nos elementos `<template>`, isso pode causar um comportamento inesperado devido à análise do navegador. Por exemplo, os elementos `<table>` podem causar [foster parenting](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables) do texto (link em inglês). No exemplo a seguir:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</template>
{% endraw %}[/sourcecode]

O navegador promoverá os nós de texto {% raw %}`{{#foo}}`{% endraw %} e {% raw %}`{{/foo}}`{% endraw %}:

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}
<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]

Entre as soluções estão o agrupamento de seções de Mustache em comentários HTML (por exemplo, {% raw %}`<!-- {{#bar}} -->`{% endraw %}), usando elementos que não são de tabela, como `<div>`, ou usando uma tag `<script type="text/plain">` para definir seus modelos.

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</script>
{% endraw %}[/sourcecode]

### Escape de citação <a name="quote-escaping"></a>

Ao usar `amp-mustache` para calcular valores de atributos, fazer escape de citação pode ser um problema. Exemplo:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <!-- A double-quote (") in foo will cause malformed HTML. -->
  <amp-img alt="{{foo}}" src="example.jpg" width=100 height=100></amp-img>

  <!-- A single-quote (') or double-quote (") in bar will cause an AMP runtime parse error. -->
  <button on="tap:AMP.setState({foo: '{{bar}}'})">Click me</button>
</template>
{% endraw %}[/sourcecode]

O uso de códigos de caracteres HTML nas variáveis {% raw %}`{{foo}}`{% endraw %} ou {% raw %}`{{bar}}`{% endraw %} não funcionará, porque o Mustache fará escape de HTML dos caracteres `&amp;` (por exemplo, `&quot;` -&gt; `&amp;quot;`). Uma solução é usar caracteres de fax, por exemplo, ′ (`&prime;`) e ″ (`&Prime;`).

Há uma [proposta aberta](https://github.com/ampproject/amphtml/issues/8395) para fazer essa substituição em `amp-mustache`. Se você quiser apoiá-la, comente sobre o problema.

### Entidades HTML <a name="html-entities"></a>

As entidades HTML não são preservadas em elementos `<template>`.

Isso pode ser um problema se você quiser renderizar no lado do servidor um `<template>` contendo texto gerado pelo usuário, porque o texto que contiver {% raw %}`{{`, `}}`, `{{{`, `}}}`{% endraw %} será tratado como uma seção de Mustache. Por exemplo, a substituição de{% raw %} `{{` {% endraw %}pelas entidades HTML `&lcub;&lcub;` não funcionará, porque elas não serão preservadas quando o navegador analisar o `<template>`.

As soluções incluem substituir strings como {% raw %} `{{` {% endraw %} por caracteres diferentes ou a removê-las diretamente do conteúdo gerado pelo usuário.

## Validação <a name="validation-1"></a>

Consulte as [regras do amp-mustache](https://github.com/ampproject/amphtml/blob/main/extensions/amp-mustache/validator-amp-mustache.protoascii) (link em inglês) na especificação do validador de AMP.
