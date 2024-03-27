---
'$title': Especificação AMP para anúncios
$order: 3
formats:
  - ads
teaser:
  text: _Se você gostaria de propor alterações ao padrão, por favor, por favor comente em [Intenção
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

_Se você gostaria de propor alterações ao padrão, por favor, por favor comente em [Intenção de Implementar](https://github.com/ampproject/amphtml/issues/4264)_.

Anúncios AMPHTML são um mecanismo para renderizar anúncios rápidos e eficientes em páginas AMP. Para garantir que os documentos de anúncios AMPHTML ("criativos AMP") possam ser renderizados de forma rápida e suave no navegador e não causem degradação da experiência do usuário, os criativos AMP devem obedecer algumas regras de validação. De forma semelhante às [regras do formato AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml), os anúncios AMPHTML têm acesso a um conjunto limitado de tags, capacidades e extensões permitidas.

## Regras do formato de Anúncio AMPHTML <a name="amphtml-ad-format-rules"></a>

A menos que especificado abaixo de forma diversa, o criativo deve obedecer todas as regras dadas pelas [regras do formato AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html), incluídas aqui por referência. Por exemplo, o [código boilerplate](#boilerplate) de um anúncio AMPHTML difere do boilerplate padrão do AMP.

Além disso, os criativos devem obedecer às seguintes regras:

<table>
<thead><tr>
  <th>Regra</th>
  <th>Justificativa</th>
</tr></thead>
<tbody>
<tr>
<td>Deve ser contido dentro de tags <code>&lt;html ⚡4ads></code> ou <code>&lt;html amp4ads></code>.</td>
<td>Permite que os validadores identifiquem um documento criativo ou como um documento AMP genérico ou um documento de anúncio AMPHTML restrito, para que seja despachado de forma apropriada.</td>
</tr>
<tr>
<td>Deve incluir <code>&lt;script async src="https://ampjs.org/amp4ads-v0.js">&lt;/script></code> como o script de execução em vez de <code>https://ampjs.org/v0.js</code>.</td>
<td>Permite comportamentos personalizados em tempo de execução para anúncios AMPHTML servidos em iframes cross-origin.</td>
</tr>
<tr>
<td>Não deve incluir uma tag <code>&lt;link rel="canonical"></code>.</td>
<td>Criativos de anúncios não possuem uma "versão canônica não-AMP" e não serão independentemente indexados à pesquisas, portanto o auto-referenciamento seria inútil.</td>
</tr>
<tr>
<td>Pode incluir meta tags opcionais no head do HTML como identificadores, no formato  <code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code>. Essas meta tags devem ser colocadas antes do script  <code>amp4ads-v0.js</code>. O valor de <br><code>vendor</code> e <code>id</code>são strings que contêm apenas [0-9a-zA-Z_-]. O valor de <code>type</code> ou é <code>creative-id</code> ou <code>impression-id</code>.</td>
<td>Esses identificadores personalizados podem ser usados para identificar a impressão ou o criativo. Eles podem ser úteis para relatórios e depuração.<br><br><p>Exemplo:</p>
<pre> &lt;meta name="amp4ads-id" content="vendor=adsense,type=creative-id,id=1283474"> &lt;meta name="amp4ads-id" content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>Rastreamento de visibilidade <code>&lt;amp-analytics></code> só poderá ter como alvo o seletor full-ad, via   <code>"visibilitySpec": { "selector": "amp-ad" }</code> como definido em  <a href="https://github.com/ampproject/amphtml/issues/4018">Issue #4018</a> e <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a>. Em particular, não pode conter nenhum seletor para elementos dentro do criativo de anúncio como alvo.</td>
<td>Em alguns casos, anúncios AMPHTML poderão decidir renderizar um criativo de anúncio em um iframe. Nesses casos, as análises da página hospedeira só poderão ter como alvo o iframe inteiro, e não haverá  acesso a quaisquer seletores de menor granularidade.<br><br> <p>Example:</p> <pre>
&lt;amp-analytics id="nestedAnalytics">
  &lt;script type="application/json">
  {
    "requests": {
      "visibility": "https://example.com/nestedAmpAnalytics"
    },
    "triggers": {
      "visibilitySpec": {
      "selector": "amp-ad",
      "visiblePercentageMin": 50,
      "continuousTimeMin": 1000
      }
    }
  }
  &lt;/script>
&lt;/amp-analytics>
</pre> <p>Esta configuração envia uma solicitação para a URL <code>https://example.com/nestedAmpAnalytics</code> URL, quando 50% do anúncio que o contém tem sido continuamente visível na tela por 1 segundo.</p>
</td>
</tr>
</tbody>
</table>

### Boilerplate <a name="boilerplate"></a>

Os criativos de anúncios AMPHTML requerem um estilo de boilerplate diferente e consideravelmente mais simples do que os [documentos gerais do AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md):

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

_Justificativa:_ o estilo `amp-boilerplate` oculta o conteúdo do corpo até que o runtime AMP esteja pronto e possa exibi-lo. Se o Javascript estiver desativado ou o runtime AMP não for carregado, o boilerplate default garante que o conteúdo seja exibido de forma independente. Em anúncios AMPHTML, no entanto, se o JavaScript estiver totalmente desativado, os anúncios AMPHTML não serão executados e nenhum anúncio será mostrado. Portanto, não há necessidade de haver a seção `<noscript>`. Na ausência do runtime AMP, a maioria dos mecanismos dos quais dependem os anúncios AMPHTML (por exemplo, análises para rastreamento de visibilidade ou `amp-img` para exibição de conteúdo) não estará disponível, então é melhor não exibir nenhum anúncio do que um com defeito.

Por fim, o boilerplate do anúncio AMPHTML usa `amp-a4a-boilerplate` em vez de `amp-boilerplate` para que os validadores possam identificá-lo com facilidade e produzir mensagens de erro mais precisas para ajudar os desenvolvedores.

Observe que as mesmas regras sobre alterações para o texto boilerplate se aplicam ao [boilerplate AMP geral](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md).

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>Regra</th>
  <th>Justificativa</th>
</tr></thead>
<tbody>
  <tr>
    <td> <code>position:fixed</code> and <code>position:sticky</code> são proibidas no CSS de criativos.</td>
    <td> <code>position:fixed</code> é extraído do DOM sombra, do qual dependem os anúncios AMPHTML. Os anúncios em AMP já não têm permissão para usar a posição fixed.</td>
  </tr>
  <tr>
    <td> <code>touch-action</code> é proibido.</td>
    <td>Um anúncio que pode manipular <code>touch-action</code> poderá interferir na capacidade do usuário de rolar o documento hospedeiro.</td>
  </tr>
  <tr>
    <td>O CSS de criativos está limitado a 20.000 bytes.</td>
    <td>Grandes blocos CSS incham o criativo, aumentam a latência da rede e degradam o desempenho da página.</td>
  </tr>
  <tr>
    <td>Transições e a animações estão sujeitas a restrições adicionais.</td>
    <td>O AMP deve ser capaz de controlar todas as animações pertencentes a um anúncio, para que ele possa interrompê-los quando o anúncio não estiver na tela ou se os recursos do sistema estiverem muito escassos.</td>
  </tr>
  <tr>
    <td>Para fins de validação, prefixos proprietários de determinados fornecedores são considerados aliases para o mesmo símbolo sem o prefixo. Isto significa que, se um símbolo <code>foo</code>é proibido pelas regras de validação CSS, então o símbolo <code>-fornecedor-foo</code> também será proibido.</td>
    <td>Algumas propriedades prefixadas pelo fornecedor oferecem funcionalidades equivalentes a propriedades que são proibidas ou restringidas sob estas regras.<br><br><p>Exemplo: as propriedades <code>-webkit-transition</code> e <code>-moz-transition</code> são ambas consideradas aliases para <code>transition</code>.  Elas só seriam permitidas em contextos onde <code>transition</code> fosse permitida (veja a seção <a href="#selectors">Seletores</a> abaixo).</p>
</td>
  </tr>
</tbody>
</table>

#### Animações e transições CSS <a name="css-animations-and-transitions"></a>

##### Seletores <a name="selectors"></a>

Finalmente, o boilerplate de um anúncio AMPHTML usa `amp-a4a-boilerplate` em vez de `amp-boilerplate` para que os validadores possam facilmente identificá-lo e produzir mensagens de erro mais precisas para ajudar os desenvolvedores.

- Contém apenas propriedades `transition`, `animation`, `transform`, `visibility` ou `opacity`.

  _Justificativa:_ isto permite que o runtime AMP remova esta classe do contexto para desativar animações, quando isto for necessário para o melhor desempenho da página.

**Bom**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**Ruim**

Propriedade não permitida na classe CSS.

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### Propriedades que podem ser usadas em animações e transições <a name="transitionable-and-animatable-properties"></a>

As únicas propriedades que podem ser usadas em transições são opacity e transform. ([Justificativa](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**Bom**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**Ruim**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**Bom**

[sourcecode:css]
@keyframes turn {
from {
transform: rotate(180deg);
}

to {
transform: rotate(90deg);
}
}
[/sourcecode]

**Ruim**

[sourcecode:css]
@keyframes slidein {
from {
margin-left: 100%;
width: 300%;
}

to {
margin-left: 0%;
width: 100%;
}
}
[/sourcecode]

### Extensões AMP e tags embutidas permitidas <a name="allowed-amp-extensions-and-builtins"></a>

Os módulos de extensão AMP e tags embutidos AMP a seguir são _permitidos_ em anúncios AMPHTML criativos. As extensões ou tags embutidos não listados explicitamente são proibidos.

- [amp-accordion](https://amp.dev/documentation/components/amp-accordion)
- [amp-ad-exit](https://amp.dev/documentation/components/amp-ad-exit)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- [amp-anim](https://amp.dev/documentation/components/amp-anim)
- [amp-animation](https://amp.dev/documentation/components/amp-animation)
- [amp-audio](https://amp.dev/documentation/components/amp-audio)
- [amp-bind](https://amp.dev/documentation/components/amp-bind)
- [amp-carousel](https://amp.dev/documentation/components/amp-carousel)
- [amp-fit-text](https://amp.dev/documentation/components/amp-fit-text)
- [amp-font](https://amp.dev/documentation/components/amp-font)
- [amp-form](https://amp.dev/documentation/components/amp-form)
- [amp-img](https://amp.dev/documentation/components/amp-img)
- [amp-layout](https://amp.dev/documentation/components/amp-layout)
- [amp-lightbox](https://amp.dev/documentation/components/amp-lightbox)
- amp-mraid, de forma experimental. Se você considera usar essa tag, por favor abra um issue em [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new).
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

A maior parte das omissões são ou para garantir o desempenho ou para deixar os anúncios AMPHTML mais fáceis de analisar.

_Example:_ O `<amp-ad>` foi omitido desta lista. Foi explicitamente proibido porque permitir um `<amp-ad>` dentro de outro `<amp-ad>` poderia levar potencialmente a cascatas ilimitadas de carregamento de anúncios, o que não adere às metas de desempenho dos anúncios AMPHTML.

_Exemplo:_ O `<amp-iframe>` foi omitido desta lista. Foi proibido porque os anúncios poderiam usá-lo para executar JavaScript arbitrário e carregar conteúdo arbitrário. Os anúncios que queiram usar tais capacidades devem retornar `false` de [a4aRegistry](https://github.com/ampproject/amphtml/blob/main/ads/_a4a-config.js#L40) e usar o mecanismo de renderização existente para anúncios '3p iframe'.<br><br>

_Exemplo:_ `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>` e `<amp-youtube>` são todos omitidos pelas mesmas razões que `<amp-iframe>`: Todos criam iframes e poderiam potencialmente consumir recursos ilimitados dentro deles.

_Exemplo:_ O `<amp-ad-network-*-impl>` foi omitido desta lista. A tag `<amp-ad>` cuida da delegação para essas tags de implementação; os criativos não devem tentar incluí-las diretamente.

_Exemplo:_ O `<amp-lightbox>` ainda não foi incluído porque mesmo alguns criativos de anúncios AMPHTML poderiam ser renderizados em um iframe e não há, atualmente, nenhum mecanismo para que um anúncio se expanda além de um iframe. Poderá haver suporte para esse recurso no futuro, se houver demanda.

### Tags HTML <a name="html-tags"></a>

As tags a seguir são _permitidas_ em criativos de anúncios AMPHTML. Tags que não foram explicitamente permitidas são proibidas. Esta lista é um subconjunto da [lista geral de adendos permitidos a tags AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md). Assim como nessa lista, a ordenação é consistente com a especificação HTML5 na seção 4 [The Elements of HTML (Os elementos do HTML)](http://www.w3.org/TR/html5/single-page.html#html-elements).

A maior parte das omissões foram motivadas por desempenho ou porque as tags não fazem parte do padrão HTML5. Por exemplo, `<noscript>` é omitida porque os anúncios AMPHTML dependem de JavaScript serem ativados, portanto um bloco `<noscript>` jamais será executado e apenas inchará o criativo, aumentando a latência e o custo de transferência. Da mesma forma, `<acronym>`, `<big>`, etc. são proibidos porque não são compatíveis com HTML5.

#### 4.1 o elemento raiz <a name="41-the-root-element"></a>

4.1.1 `<html>`

- É preciso usar os tipos `<html ⚡4ads>` ou `<html amp4ads>`

#### 4.2 Metadados do documento <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- `<link rel=...>` são proibidas, com exceção de `<link rel=stylesheet>`.

- **Observação:** diferentemente do AMP em geral, tags `<link rel="canonical">` são proibidas.

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Seções <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Agrupamento de Conteúdo <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Semântica de nível de texto <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Edições <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Conteúdo Incorporado <a name="47-embedded-content"></a>

- Conteúdo incorporado é suportado apenas via tags AMP, tais como `<amp-img>` ou `<amp-video>`.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

As tags SVG não fazem parte do espaço de nomes HTML5. Elas estão listados abaixo sem id de seção.

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 Dados tabulares <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Formulários <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 Scripting <a name="411-scripting"></a>

- Como um documento AMP geral, a tag `<head>` do criativo deve conter uma tag `<script async src="https://ampjs.org/amp4ads-v0.js"></script>`.
- Diferentemente do AMP geral, `<noscript>` é proibido.
  - _Justificativa:_ Como anúncios AMPHTML requerem que o Javascript seja ativado para poder funcionar, blocos `<noscript>` não têm nenhuma finalidade em anúncios AMPHTML e apenas aumentam o custo da transferência de rede.
- Diferentemente do AMP geral, `<script type="application/ld+json">` é proibido.
  - _Justificativa:_ O JSON LD é usado para markup de dados estruturados em páginas hospedeiras, mas os criativos de anúncios não são documentos standalone e não contêm dados estruturados. Blocos JSON LD dentro deles aumentariam o custo da transferência pela rede.
- Todas as outras regras de scripting e exclusões são as mesmas do AMP geral.
