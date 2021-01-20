---
"$title": Specyfikacja AMP dla reklam
order: '3'
formats:
- ads
teaser:
  text: _Jeśli chcesz zaproponować zmiany w standardzie, umieść komentarz na [Intent
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md.
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

*Jeśli chcesz zaproponować zmiany w standardzie, umieść komentarz na stronie [Intent to Implement](https://github.com/ampproject/amphtml/issues/4264)*.

Reklamy AMPHTML to mechanizm służący do renderowania szybkich, wydajnych reklam na stronach AMP. Aby umożliwić szybkie i płynne renderowanie dokumentów reklamowych AMPHTML („kreacji AMP”) w przeglądarce i nie pogarszać komfortu użytkowania, kreacje AMP muszą być zgodne z zestawem reguł walidacji. Podobnie, w duchu [reguł formatu AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml) reklamy AMPHTML mają dostęp do ograniczonego zestawu dozwolonych znaczników, możliwości i rozszerzeń.

## Reguły formatu reklam AMPHTML <a name="amphtml-ad-format-rules"></a>

O ile poniżej nie określono inaczej, kreacja musi przestrzegać wszystkich zasad podanych w [regułach formatu AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html), zawartych tutaj poprzez odniesienie. Na przykład reklama AMPHTML [Boilerplate](#boilerplate) odbiega od standardowego kodu AMP.

Ponadto kreacje muszą być zgodne z następującymi regułami:

<table>
<thead><tr>
  <th>Reguła</th>
  <th>Uzasadnienie</th>
</tr></thead>
<tbody>
<tr>
<td>Musi być ujęta w znaczniki <code>&lt;html ⚡4ads></code> lub <code>&lt;html amp4ads></code>.</td>
<td>Pozwala walidatorom zidentyfikować dokument kreacji jako ogólny dokument AMP lub ograniczony dokument reklamy AMPHTML i odpowiednio go wysłać.</td>
</tr>
<tr>
<td>Musi zawierać <code>&lt;script async src="https://cdn.ampproject.org/amp4ads-v0.js">&lt;/script></code> jako skrypt uruchomieniowy, zamiast <code>https://cdn.ampproject.org/v0.js</code>.</td>
<td>Umożliwia dostosowane do serwowanych w ramkach iframe reklam AMPHTML o różnym pochodzeniu sposoby działania środowiska uruchomieniowego.</td>
</tr>
<tr>
<td>Nie może zawierać znacznika <code>&lt;link rel="canonical"></code>.</td>
<td>Kreacje reklamowe nie mają „wersji kanonicznej bez AMP” i nie będą niezależnie indeksowane przez wyszukiwarkę, więc odwołania do samej siebie byłyby bezużyteczne.</td>
</tr>
<tr>
<td>Może zawierać w sekcji head kodu HTML opcjonalne tagi meta jako identyfikatory, w formacie <code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code>. Te tagi meta muszą być umieszczone przed skryptem <code>amp4ads-v0.js</code>. Wartości <code>vendor</code> i <code>id</code> to ciągi zawierające jedynie znaki [0-9a-zA-Z_-]. Wartość <code>type</code> to albo <code>creative-id</code>, albo <code>impression-id</code>.</td>
<td>Za pomocą tych niestandardowych identyfikatorów można zidentyfikować wyświetlenie lub kreację. Mogą być pomocne przy zgłaszaniu i debugowaniu.<br><br><p>Przykład:</p>
<pre>
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>Śledzenie widoczności za pomocą składnika <code>&lt;amp-analytics>&lt;/amp-analytics></code> może dotyczyć jedynie selektora całej reklamy, <code>"visibilitySpec": { "selector": "amp-ad" }</code> zgodnie z definicją w <a href="https://github.com/ampproject/amphtml/issues/4018">Issue #4018</a> i <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a>. W szczególności nie może ono być skierowane na żadne selektory elementów w kreacji reklamowej.</td>
<td>W niektórych przypadkach reklamy AMPHTML mogą decydować się na wyrenderowanie reklamy w ramce iframe. W tych przypadkach analiza strony hosta może być ukierunkowana tylko na całą ramkę iframe i nie będzie miała dostępu do żadnych precyzyjniejszych selektorów.<br><br> <p>Przykład:</p> <pre>
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
</pre> <p>Ta konfiguracja wysyła żądanie do adresu URL  <code>https://example.com/nestedAmpAnalytics</code>, gdy 50% załączonej reklamy było stale widoczne na ekranie przez 1 sekundę.</p>
</td>
</tr>
</tbody>
</table>

### Boilerplate <a name="boilerplate"></a>

Kreacje reklamowe AMPHTML wymagają innej i znacznie prostszej linii stylu boilerplate niż [ogólne dokumenty AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md):

[sourcecode:html]
<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>
[/sourcecode]

*Uzasadnienie:* styl `amp-boilerplate` ukrywa zawartość sekcji body aż do momentu, gdy środowisko uruchomieniowe AMP jest gotowe i może ją pokazać. Jeśli obsługa JavaScript jest wyłączona lub załadowanie środowiska uruchomieniowego AMP nie powiodło się, domyślny gotowy kod zapewnia, że mimo to zawartość zostanie ostatecznie wyświetlona. Jeśli jednak JavaScript jest całkowicie wyłączony, reklamy AMPHTML nie będą uruchamiane i nigdy nie zostanie wyświetlona żadna reklama, więc nie ma potrzeby stosowania sekcji `<noscript>`. W przypadku braku środowiska uruchomieniowego AMP większość maszynerii, na której opierają się reklamy AMPHTML (jak analityka śledzenia widoczności lub składnik `amp-img` do wyświetlania treści) nie będzie dostępna, więc lepiej jest nie wyświetlać żadnej reklamy niż reklamę działającą wadliwie.

Wreszcie, w standardowym kodzie AMPHTML reklamy używany jest składnik `amp-a4a-boilerplate`, zamiast `amp-boilerplate`, aby walidatory mogły go z łatwością zidentyfikować i wygenerować dokładniejsze komunikaty o błędach, pomocne dla programistów.

Należy pamiętać, że obowiązują te same zasady dotyczące modyfikacji tekstu standardowego, co w przypadku [ogólnego kodu standardowego AMP ](https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md).

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>Reguła</th>
  <th>Uzasadnienie</th>
</tr></thead>
<tbody>
  <tr>
    <td>Właściwości <code>position:fixed</code> i <code>position:sticky</code> są zabronione w CSS kreacji.</td>
    <td>Właściwość <code>position:fixed</code> wyłamuje się z modelu DOM z hierarchią towarzyszącą, od którego zależą reklamy AMPHTML. Reklamy w AMP nie mogą już używać stałej pozycji.</td>
  </tr>
  <tr>
    <td> Właściwość <code>touch-action</code> jest zabroniona.</td>
    <td>Reklama, która może manipulować właściwością <code>touch-action</code> może zakłócać możliwość przewijania dokumentu hosta przez użytkownika.</td>
  </tr>
  <tr>
    <td>Kod CSS kreacji jest ograniczony do 20 000 bajtów.</td>
    <td>Duże bloki CSS rozdymają kreację, zwiększają opóźnienie sieci i obniżają wydajność strony.</td>
  </tr>
  <tr>
    <td>Przejścia i animacje podlegają dodatkowym ograniczeniom.</td>
    <td>AMP musi być w stanie kontrolować wszystkie animacje należące do reklamy, tak aby mógł je zatrzymać, gdy reklama nie znajduje się na ekranie lub zasoby systemowe są bardzo małe.</td>
  </tr>
  <tr>
    <td>Prefiksy zależne od dostawcy są do celów walidacji uznawane za aliasy tego samego symbolu bez prefiksu. To znaczy, że jeśli symbol <code>foo</code> jest zabroniony przez reguły walidacji CSS, symbol <code>-vendor-foo</code> będzie również zabroniony.</td>
    <td>Niektóre właściwości poprzedzone prefiksami dostawcy zapewniają funkcjonalność równoważną z właściwościami, które są w inny sposób zakazane lub ograniczone przez te reguły.<br><br><p>Przykład: zarówno <code>-webkit-transition</code> i <code>-moz-transition</code> są uznawane za aliasy symbolu <code>transition</code>. Będą one dozwolone tylko w kontekstach, w których dozwolony będzie sam element <code>transition</code> (patrz  sekcja <a href="#selectors">Selektory</a> poniżej).</p> </td>
  </tr>
</tbody>
</table>

#### Animacje i przejścia CSS <a name="css-animations-and-transitions"></a>

##### Selektory <a name="selectors"></a>

Właściwości `transition` i `animation` są dozwolone tylko w selektorach, które:

- Zawierają tylko właściwości `transition`, `animation`, `transform`, `visibility` lub `opacity`.

    *Uzasadnienie:* pozwala to na usunięcie tej klasy z kontekstu w celu dezaktywowania animacji, gdy jest to konieczne do działania strony.

**Dobrze**

[sourcecode:css]
.box {
  transform: rotate(180deg);
  transition: transform 2s;
}
[/sourcecode]

**Źle**

Właściwość niedozwolona w klasie CSS.

[sourcecode:css]
.box {
  color: red; // non-animation property not allowed in animation selector
  transform: rotate(180deg);
  transition: transform 2s;
}
[/sourcecode]

##### Właściwości podlegające przejściu i i animacji <a name="transitionable-and-animatable-properties"></a>

Jedynymi właściwościami, które podlegają przejściu są opacity i transform. ([Uzasadnienie](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**Dobrze**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**Źle**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**Dobrze**

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

**Źle**

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

### Dozwolone rozszerzenia i wbudowane obiekty AMP <a name="allowed-amp-extensions-and-builtins"></a>

Poniżej widnieją *dozwolone* moduły rozszerzeń AMP i znaczniki AMP wbudowywane w reklamę AMPHTML. Rozszerzenia lub wbudowane znaczniki, których nie ma na liście, są zabronione.

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
- amp-mraid, na zasadzie eksperymentu. Jeśli rozważasz jego użycie, otwórz zgłoszenie w [wg-monetization](https://github.com/ampproject/wg-ads/issues/new).
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

Większość pominięć wynika z kwestii wydajności albo uproszczenia analizy reklam AMPHTML.

*Przykład:* `<amp-ad>` pominięto na tej liście. Jest jednoznacznie niedozwolony, ponieważ zezwalanie na `<amp-ad>` w `<amp-ad>` może doprowadzić do ładowania nieograniczonych kaskad reklam, które nie spełniają celów wydajnościowych reklam AMPHTML.

*Przykład:* `<amp-iframe>` pominięto na tej liście. Jest niedozwolony, ponieważ reklamy mogą go użyć do wykonania dowolnego kodu JavaScript i załadowania dowolnej zawartości. Reklamy chcące korzystać z takich możliwości powinny zwracać wartość `false` ze swojego wpisu [a4aRegistry](https://github.com/ampproject/amphtml/blob/master/ads/_a4a-config.js#L40) i używać istniejącego mechanizmu renderowania reklam „3p iframe”.

*Przykład:* `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>` i `<amp-youtube>` pominięto z tego samego powodu, co `<amp-iframe>`: wszystkie one tworzą ramki iframe i mogą w nich używać nieograniczonych zasobów.

*Przykład:* `<amp-ad-network-*-impl>` pominięto na tej liście. Znacznik `<amp-ad>` obsługuje delegację do tych znaczników implementacji; kreacje nie powinny próbować dołączać ich bezpośrednio.

*Przykład:* `<amp-lightbox>` nie jest jeszcze uwzględniony, ponieważ nawet niektóre kreacje reklam AMPHTML mogą być renderowane w ramce iframe i obecnie nie ma mechanizmu, który umożliwiałby rozszerzenie reklamy poza ramkę iframe. Obsługa może zostać dodana w przyszłości, jeśli zostanie wykazane zapotrzebowanie na nią.

### Znaczniki HTML <a name="html-tags"></a>

Poniżej znajdują się znaczniki *dozwolone* w kreacji reklamowej AMPHTML. Znaczniki, które nie są jawnie dozwolone, są zabronione. Ta lista jest podzbiorem ogólnej [listy dozwolonych znaczników AMPHTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/../../spec/amp-tag-addendum.md). Podobnie jak ta lista, są uporządkowane zgodnie ze specyfikacją HTML5 w sekcji 4 [Elementy HTML](http://www.w3.org/TR/html5/single-page.html#html-elements).

Większość pominięć wynika z kwestii wydajności albo tego, że znaczniki nie są w standardzie HTML5. Na przykład `<noscript>` pominięto, ponieważ reklamy AMPHTML zależą od włączenia obsługi JavaScript, więc blok `<noscript>` nigdy nie jest wykonywany, zatem jedynie zaśmieca kreację, obciąża łącze i zwiększa latencję. Podobnie znaczniki `<acronym>`, `<big>` itd. są zabronione, ponieważ nie są zgodne z HTML5.

#### 4.1 Element główny <a name="41-the-root-element"></a>

4.1.1 `<html>`

- Musi mieć typ `<html ⚡4ads>` albo `<html amp4ads>`

#### 4.2 Metadane dokumentu <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- Znaczniki `<link rel=...>` są niedozwolone, z wyjątkiem `<link rel=stylesheet>`.

- **Uwaga:** w odróżnieniu od ogólnego AMP, znaczniki `<link rel="canonical">` są zabronione.

    4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Sekcje <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>` i `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Grupowanie zawartości <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Semantyka na poziomie tekstu <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Edycje <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Zawartość osadzona <a name="47-embedded-content"></a>

- Zawartość osadzona jest obsługiwana tylko za pomocą znaczników AMP, takich jak `<amp-img>` lub `<amp-video>`.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

Tagi SVG nie znajdują się w przestrzeni nazw HTML5. Są one wymienione poniżej bez identyfikatorów sekcji.

`<svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title>`

#### 4.9 Dane tabelaryczne <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Formularze <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 Obsługa skryptów <a name="411-scripting"></a>

- Podobnie jak ogólny dokument AMP, znacznik `<head>` kreacji musi zawierać znacznik `<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>`.
- W odróżnieniu od ogólnego AMP, znacznik `<noscript>` jest zabroniony.
    - *Uzasadnienie:* reklamy AMPHTML wymagają do działania włączenia obsługi JavaScript, więc bloki `<noscript>` są bezcelowe w reklamach AMPHTML i jedynie obciążają sieć.
- W odróżnieniu od ogólnego AMP, właściwość `<script type="application/ld+json">` jest zabroniona.
    - *Uzasadnienie:* JSON LD jest używany do strukturalnego oznaczania danych na stronach hosta, ale kreacje reklamowe nie są samodzielnymi dokumentami i nie zawierają danych strukturalnych. Bloki JSON LD w nich tylko obciążałyby sieć.
- Wszystkie inne reguły obsługi skryptów i wykluczenia są przeniesione z ogólnego AMP.
