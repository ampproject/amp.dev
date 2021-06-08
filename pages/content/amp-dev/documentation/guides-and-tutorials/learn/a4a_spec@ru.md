---
'$title': Спецификация AMP для рекламы
$order: 3
formats:
  - ads
teaser:
  text: _Если вы хотите предложить изменения в стандарт, оставьте комментарий к задаче [Intent
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

_Если вы хотите предложить изменения в стандарт, оставьте комментарий к задаче [Intent to Implement](https://github.com/ampproject/amphtml/issues/4264)_.

«Реклама AMPHTML» — это механизм отображения быстрой и высокоэффективной рекламы на AMP-страницах. Чтобы рекламные документы AMPHTML («AMP-креативы») могли быстро и без проблем отображаться в браузере и не ухудшали пользовательский интерфейс, AMP-креативы должны соблюдать ряд валидационных правил. Подобно AMP (см. [правила форматирования AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml)), реклама AMPHTML имеет доступ только к ограниченному набору разрешенных тегов, возможностей и расширений.

## Правила форматирования рекламы AMPHTML <a name="amphtml-ad-format-rules"></a>

Креатив должен соблюдать все правила, указанные в [правилах форматирования AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html), если иное не указано ниже (например, [шаблонный код](#boilerplate) рекламы AMPHTML отличается от стандартного шаблонного кода AMP).

Кроме того, креативы должны соблюдать следующие правила:

<table>
<thead><tr>
  <th>Правило</th>
  <th>Обоснование</th>
</tr></thead>
<tbody>
<tr>
<td>Должны использовать <code><html ⚡4ads></code> или <code><html amp4ads></code> в качестве закрывающих тегов.</td>
<td>Позволяет валидаторам идентифицировать документ креатива либо как AMP-документ общей направленности, либо как документ рекламы AMPHTML с ограниченным доступом), и обрабатывать его соответствующим образом.</td>
</tr>
<tr>
<td>Должны включать скрипт среды выполнения <code><script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script></code> вместо <code>https://cdn.ampproject.org/v0.js</code>.</td>
<td>Позволяет гибко настраивать runtime-поведение рекламы AMPHTML, размещаемой в кросс-доменных iframe.</td>
</tr>
<tr>
<td>Не должен содержать тег <code><link rel="canonical"></code>.</td>
<td>Рекламные креативы не имеют «канонической версии, не использующей AMP», и не будут независимо индексироваться поиском, поэтому ссылаться на себя же не имеет смысла.</td>
</tr>
<tr>
<td>Может содержать в HTML-элементе head опциональные теги meta, используемые в качестве идентификаторов, в формате <code><meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code>. Такие теги следует размещать перед скриптом <code>amp4ads-v0.js</code>. Значения  <code>vendor</code> и <code>id</code> — строки, содержащие только символы [0-9a-zA-Z_-]. Значение <code>type</code> либо <code>creative-id</code>, либо <code>impression-id</code>.</td>
<td>Эти специальные идентификаторы можно использовать для идентификации показа или креатива. Они могут быть полезны для создания отчетов и отладки.<br><br><p>Пример:</p>
<pre>
<meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
<meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>Механизм отслеживания видимости с помощью <code><amp-analytics></amp-analytics></code> может использовать только селектор, обозначающий все рекламное объявление ( <code>"visibilitySpec": { "selector": "amp-ad" }</code>), как определено в <a href="https://github.com/ampproject/amphtml/issues/4018">Issue #4018</a> и <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a>. Соответственно, он не может использовать селекторы каких-либо элементов, расположенных внутри креатива рекламы.</td>
<td>Иногда реклама AMPHTML может выполнять рендеринг креатива в элементе iframe. В таких случаях аналитические функции хост-страницы могут выбирать целью только iframe целиком, не имея доступа к более детальным селекторам.<br><br> <p>Пример:</p> <pre>
<amp-analytics id="nestedAnalytics">
  <script type="application/json">
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
  </script>
</amp-analytics>
</pre> <p>Эта конфигурация отправляет запрос на URL <code>https://example.com/nestedAmpAnalytics</code>, после того как 50% площади родительской рекламы непрерывно находилось в видимой области экрана в течение 1 секунды.</p>
</td>
</tr>
</tbody>
</table>

### Шаблон <a name="boilerplate"></a>

Рекламные креативы AMPHTML требуют применения другого, значительно более простого, шаблонного кода, по сравнению с [обычными AMP-документами](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md):

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

_Обоснование:_ стиль `amp-boilerplate` скрывает содержимое элемента body до тех пор, пока среда выполнения AMP не будет готова его отобразить. Если JavaScript отключен или среда выполнения AMP не загружается, стандартный шаблонный код гарантирует, что в конечном итоге содержимое все равно будет отображено. Однако если JavaScript полностью отключен для рекламы AMPHTML, реклама не будет отображаться вовсе, поэтому раздел `<noscript>` не нужен. В отсутствие времени выполнения AMP большинство механизмов, на которых основывается реклама AMPHTML (например, аналитика для контроля видимости или `amp-img` для отображения контента), будут недоступны, поэтому лучше не показывать рекламу вовсе, чем показывать ее в частично неработающем виде.

Кроме того, в шаблонном коде рекламы AMPHTML вместо `amp-boilerplate` используется `amp-a4a-boilerplate`, — это делается для того, чтобы валидаторы могли с легкостью идентифицировать рекламу и генерировать более точные сообщения об ошибках для помощи разработчикам.

Обратите внимание, что в тексте шаблона допускаются только те же изменения, что и в [общем шаблонном коде AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md).

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>Правило</th>
  <th>Обоснование</th>
</tr></thead>
<tbody>
  <tr>
    <td>
<code>position:fixed</code> и <code>position:sticky</code> запрещены в CSS креативов.</td>
    <td>
<code>position:fixed</code> выводит процесс из теневого DOM, от которого зависит реклама AMPHTML. Кроме того, реклама в AMP не может использовать фиксированную позицию.</td>
  </tr>
  <tr>
    <td>Свойство <code>touch-action</code> запрещено.</td>
    <td>Реклама, способная манипулировать <code>touch-action</code>, может помешать пользователю прокручивать основной документ.</td>
  </tr>
  <tr>
    <td>Размер CSS креатива ограничен 20 000 байт.</td>
    <td>Большие блоки CSS приводят к разрастанию креатива, увеличивают задержку в сети и снижают производительность страницы.</td>
  </tr>
  <tr>
    <td>На переходы и анимации накладываются дополнительные ограничения.</td>
    <td>AMP должен иметь возможность контролировать все анимации, относящиеся к рекламе, чтобы суметь остановить их, если реклама оказывается вне видимой зоны или системные ресурсы на исходе.</td>
  </tr>
  <tr>
    <td>В целях валидации специфичные для поставщика префиксы считаются псевдонимами одного и того же символа без префикса. Это означает, что если символ <code>foo</code> запрещен правилами валидации CSS, то символ <code>-vendor-foo</code> будет также запрещен.</td>
    <td>Некоторые свойства с префиксом поставщика являются функционально эквивалентными свойствам, которые запрещены или ограничены в соответствии с этими правилами. <br><br><p> Пример: <code>-webkit-transition</code> и <code>-moz-transition</code> являются псевдонимами для <code>transition</code>. Они будут разрешены только в тех случаях, когда разрешен обычный <code>transition</code> (см. Раздел «<a href="#selectors">Селекторы</a>» ниже). </p>
</td>
  </tr>
</tbody>
</table>

#### CSS-анимация и переходы <a name="css-animations-and-transitions"></a>

##### Селекторы<a name="selectors"></a>

Свойства `transition` и `animation` разрешены только для селекторов, которые:

- Содержат только свойства `transition`, `animation`, `transform`, `visibility` или `opacity`.

  _Обоснование:_ это позволяет среде выполнения AMP удалить этот класс из контекста, чтобы отключить анимацию, когда это необходимо для сохранения производительности страницы.

**Хорошо**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**Плохо**

Свойство запрещено в классе CSS.

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### Переходные и анимируемые свойства<a name="transitionable-and-animatable-properties"></a>

Единственными свойствами, которые можно использовать в переходах, являются opacity и transform. ([Обоснование](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**Хорошо**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**Плохо**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**Хорошо**

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

**Плохо**

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

### Разрешенные расширения и встроенные теги AMP <a name="allowed-amp-extensions-and-builtins"></a>

Ниже перечислены модули расширения AMP и встроенные теги AMP, которые _разрешены_ в рекламном объявлении AMPHTML. Расширения или встроенные теги, не указанные явно, запрещены.

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
- amp-mraid (на экспериментальной основе). Если вы планируете использовать его, создайте задачу в [wg-ads](https://github.com/ampproject/wg-monetization/issues/new).
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

Большинство неуказанных модулей не используются либо из-за влияния на производительность, либо для упрощения анализа рекламы AMPHTML.

_Пример:_ `<amp-ad>` исключен из этого списка. Он явно запрещен, поскольку использование `<amp-ad>` внутри `<amp-ad>` может потенциально привести к неограниченной каскадной загрузке рекламы, что не соответствует целям рекламы AMPHTML в плане производительности.

_Пример:_ `<amp-iframe>` отсутствует в этом списке. Он запрещен, потому что реклама может использовать его для выполнения произвольного Javascript и загрузки произвольного контента. Рекламные объявления, которые желают использовать такие возможности, должны возвращать значение `false` из своей записи [a4aRegistry](https://github.com/ampproject/amphtml/blob/main/ads/_a4a-config.js#L40) и использовать существующий механизм рендеринга рекламы «3p iframe».

_Пример:_ `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>` и `<amp-youtube>` исключены по той же причине, что и `<amp-iframe>`: они создают элементы iframe и могут потенциально потреблять неограниченные ресурсы в их рамках.

_Пример:_ теги типа `<amp-ad-network-*-impl>` отсутствуют в этом списке — делегирование этим тегам осуществляет тег `<amp-ad>`: креативы не должны использовать их напрямую.

_Пример:_ `<amp-lightbox>` еще не включен, потому что даже рекламные креативы AMPHTML могут отображаться в iframe, а механизма расширения рекламы за пределы iframe пока не существует. Поддержка данного тега может быть добавлена в будущем, если она наберет достаточно сторонников.

### HTML-теги <a name="html-tags"></a>

Ниже перечислены _разрешенные_ теги для рекламы AMPHTML. Теги, которые явно не разрешены, запрещены. Этот список является подмножеством общего [списка разрешенных в AMP тегов](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md). Подобно ему, данный список упорядочен в соответствии с 4-м разделом спецификации HTML5 («[Элементы HTML](http://www.w3.org/TR/html5/single-page.html#html-elements)»).

Большинство отсутствующих тегов опущены либо для обеспечения нужной производительности, либо потому, что эти теги не соответствуют стандарту HTML5. Например, `<noscript>` опущен, потому что реклама AMPHTML работает только со включенным JavaScript; таким образом блок `<noscript>` не будет выполняться никогда и, следовательно, будет только увеличивать размер креатива, что приведет к увеличению сетевой задержки и ненужному расходованию пропускной способности сети. `<acronym>` , `<big>` и другие подобные теги запрещены, потому что они не совместимы с HTML5.

#### 4.1 Корневой элемент <a name="41-the-root-element"></a>

4.1.1 `<html>`

- Должны использовать `<html ⚡4ads>` или `<html amp4ads>`

#### 4.2 Метаданные документа <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- Теги `<link rel=...>` запрещены, за исключением `<link rel=stylesheet>`.

- **Примечание.** В отличие от обычного AMP, теги `<link rel="canonical">` запрещены.

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Разделы <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>` и `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Группировка контента <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Семантика текстового уровня <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Правки <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Встраиваемый контент<a name="47-embedded-content"></a>

- Встроенный контент поддерживается только с помощью тегов AMP, таких как `<amp-img>` или `<amp-video>`.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

Теги SVG не находятся в пространстве имен HTML5, поэтому они указаны без номеров разделов.

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 Табличные данные<a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Формы<a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11. Скрипты <a name="411-scripting"></a>

- Как и в обычных документах AMP, тег `<head>` креатива должен содержать тег `<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>`.
- В отличие от обычного кода AMP, `<noscript>` запрещен.
  - _Обоснование._ Поскольку реклама AMPHTML вообще не работает без включенного JavaScript, блоки `<noscript>` не имеют смысла в рекламе AMPHTML и только расходуют пропускную способность сети.
- В отличие от обычного кода AMP, `<noscript>` запрещен.
  - _Обоснование._ JSON-LD используется для компоновки структурированных данных на хост-страницах, но рекламные креативы не являются отдельными документами и не содержат структурированных данных. Размещенные в них блоки JSON-LD будут впустую расходовать пропускную способность сети.
- Все остальные исключения и правила для скриптов соответствуют стандартному AMP.
