---
'$title': Reklamlar için AMP spesifikasyonları
$order: 3
formats:
  - ads
teaser:
  text: _Standard üzerinde herhangi bir değişiklik yapmayı teklif ederseniz, lütfen [Uygulama
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

_Standard üzerinde herhangi bir değişiklik yapmayı teklif ederseniz, lütfen [Uygulama Girişimi](https://github.com/ampproject/amphtml/issues/4264) üzerinde yorum yapın_.

AMPHTML reklamları, AMP sayfalarında hızlı ve iyi performanslı reklamlar oluşturma mekanizmasıdır. AMPHTML reklam belgelerinin ("AMP reklam öğeleri") tarayıcıda hızlı ve sorunsuz bir şekilde oluşturulmasını ve kullanıcı deneyimini düşürmemesini sağlamak için AMP reklam öğelerinin bir dizi doğrulama kuralına uyması gerekir. [AMP biçim kurallarına](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml) benzer şekilde, AMPHTML reklamları izin verilen sınırlı sayıda etiket, özellik ve uzantıya erişebilir.

## AMPHTML reklamı biçim kuralları <a name="amphtml-ad-format-rules"></a>

Aşağıda aksi belirtilmedikçe, reklam öğesinin buraya referans olarak dahil edilen [AMP biçim kuralları](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html) tarafından koyulan tüm kurallara uyması gerekir. Örneğin, AMPHTML reklam [Ortak Metni](#boilerplate) AMP standart ortak metninden sapar.

Ayrıca, reklam öğelerinin aşağıdaki kurallara uyması gerekir:

<table>
<thead><tr>
  <th>Kural</th>
  <th>Gerekçe</th>
</tr></thead>
<tbody>
<tr>
<td>
<code>&lt;html ⚡4ads></code> veya <code>&lt;html amp4ads></code> türleri kullanmalıdır</td>
<td>Doğrulayıcıların, bir reklam öğesi belgesini genel bir AMP belgesi veya kısıtlı bir AMPHTML reklam belgesi olarak tanımlamasına ve uygun şekilde göndermesine izin verir.</td>
</tr>
<tr>
<td>Çalışma zamanı betiği olarak <code>https://cdn.ampproject.org/v0.js</code> yerine <code>&lt;script async src="https://cdn.ampproject.org/amp4ads-v0.js">&lt;/script></code> kullanmalıdır.</td>
<td>Kaynaklar arası iframe'lerde sunulan AMPHTML reklamları için özel çalışma zamanı davranışlarına izin verir.</td>
</tr>
<tr>
<td>
<code>&lt;link rel="canonical"></code> etiketi içermemelidir.</td>
<td>Reklam öğelerinde "AMP olmayan standart sürüm" yoktur ve bağımsız olarak arama dizine eklenmez, bu nedenle kendi kendine referans yapmak işe yaramaz.</td>
</tr>
<tr>
<td>HTML head bölümünde <code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code> biçiminde isteğe bağlı üst etiketleri tanımlayıcı olarak içerebilir. Bu üst etiketler <code>amp4ads-v0.js</code> betiğinin hemen öncesine yerleştirilmelidir. <code>vendor</code> ve <code>id</code> değerleri sadece [0-9a-zA-Z_-] içeren metin dizeleridir. <code>type</code> değeri <code>creative-id</code> veya <code>impression-id</code> şeklindedir.</td>
<td>Bu özel tanımlayıcılar, izlenimi veya reklam öğesini tanımlamak için kullanılabilir. Bunlar raporlama ve hata ayıklama için faydalı olabilir.<br><br><p>Örnek:</p>
<pre>
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td> <code>&lt;amp-analytics></code> görüntülenebilirlik izlemesi, <a>Issue #4018</a> ve <a href="https://github.com/ampproject/amphtml/issues/4018">PR #4368</a> bölümlerinde açıklandığı gibi, <code>"visibilitySpec": { "selector": "amp-ad" }</code> yoluyla sadece tam reklam seçiciyi hedefleyebilir. Özel olarak, reklam öğesi içindeki diğer öğeler için herhangi bir seçiciyi hedefleyemez.</td>
<td>Bazı durumlarda AMPHTML, bir reklam öğesini iframe’e dönüştürmeyi tercih edebilir. Bu durumlarda, ana sayfa analizi, sadece iframe’in bütününü hedefleyebilir ve daha incelikli seçicilere erişemez.<br><br> <p>Örnek:</p> <pre>
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
</pre> <p>Bu yapılandırma, çevreleyen reklamın %50’si ekranda 1 saniyeliğine kesintisiz olarak gösterildiğinde <code>https://example.com/nestedAmpAnalytics</code> bölümüne bir istek gönderir.</p>
</td>
</tr>
</tbody>
</table>

### Ortak Metin <a name="boilerplate"></a>

AMPHTML reklam öğeleri [genel AMP belgelerindekinden](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md) farklı ve çok daha basit bir ortak metin stil satırı gerektirir:

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

_Gerekçe:_ `amp-boilerplate` stili, AMP çalışma zamanı hazır olana ve onu gösterene kadar gövde bölümü içeriğini gizler. Javascript devre dışı bırakılırsa veya AMP çalışma zamanı yüklenemezse, varsayılan ortak metin, içeriğin ne olursa olsun sonunda görüntülenmesini sağlar. Ancak AMPHTML reklamlarında, Javascript tamamen devre dışı bırakılırsa, AMPHTML reklamları çalışmaz ve hiçbir reklam gösterilmez, bu nedenle `<noscript>` bölümüne gerek yoktur. AMP çalışma zamanının yokluğunda, AMPHTML reklamlarının dayandığı mekanizmaların çoğu (ör. Görüntülenebilirlij izleme için analiz veya içerik görüntüleme için `amp-img` ) kullanılamayacağından, hatalı bir reklam yerine hiçbir reklam göstermemek daha iyidir.

Son olarak, AMPHTML reklam ortak metni, `amp-boilerplate` yerine `amp-a4a-boilerplate` kullanır böylece doğrulayıcılar onu kolayca tespit edebilir ve geliştiricilere yardım etmek için doğru hata mesajları üretebilir.

[Genel AMP ortak metin](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md) kurallarının aynısının, ortak metin içeriğindeki değişikliklere uygulandığını unutmayın.

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>Kural</th>
  <th>Gerekçe</th>
</tr></thead>
<tbody>
  <tr>
    <td> <code>position:fixed</code> ve <code>position:sticky</code>, reklam öğesi CSS'inde yasaklıdır.</td>
    <td> <code>position:fixed</code> AMPHTML reklamlarının dayandığı gölge DOM'u bozar. Ayrıca, AMP'deki reklamların sabit konum kullanmasına zaten izin verilmez.</td>
  </tr>
  <tr>
    <td> <code>touch-action</code> yasaklanmıştır.</td>
    <td>
<code>touch-action</code> öğesini kullanabilen bir reklam, kullanıcının ana belgeyi kaydırma gücüne de müdahale edebilir.</td>
  </tr>
  <tr>
    <td>Reklam öğesi CSS'i 20.000 bayt ile sınırlıdır.</td>
    <td>Büyük CSS blokları reklam öğesini şişirir, ağ gecikmesini artırır ve sayfa performansını düşürür.</td>
  </tr>
  <tr>
    <td>Geçiş ve animasyon ek kısıtlamalara tabidir.</td>
    <td>AMP, bir reklama ait tüm animasyonları kontrol edebilmelidir, böylece reklam ekranda olmadığında veya sistem kaynakları çok düşük olduğunda onları durdurulabilecektir.</td>
  </tr>
  <tr>
    <td>Satıcıya özgü önekler, doğrulama amacıyla önek olmadan aynı sembol için takma adlar olarak kabul edilir. Yani, bir <code>foo</code> sembolü CSS doğrulama kuralları tarafından yasaklanmışsa, <code>-vendor-foo</code> sembolü de yasaklanacaktır.</td>
    <td>Bazı satıcı önekli özellikler, normalde ilgili kurallar altında yasaklanan veya kısıtlanan özelliklere özdeş işlevsellikler sunar.<br><br><p>Örnek: <code>-webkit-transition</code> ve <code>-moz-transition</code>, <code>transition</code> için kısıtlı takma adlar olarak görülür. Bunlara sadece tek başına <code>transition</code> olduğunda izin verilir (aşağıda <a href="#selectors">Seçiciler</a> bölümüne bakın).</p>
</td>
  </tr>
</tbody>
</table>

#### CSS animasyonları ve geçişler <a name="css-animations-and-transitions"></a>

##### Seçiciler <a name="selectors"></a>

`transition` ve `animation` özelliklerine sadece aşağıdaki şartları karşılayan seçicilerde izin verilir:

- `transition`, `animation`, `transform`, `visibility` veya `opacity` özellikleri içermelidir.

  _Gerekçe:_ Bu, AMP çalışma zamanının sayfa performansı için gerektiğinde animasyonları devre dışı bırakmak üzere bu sınıfı bağlamdan kaldırmasına olanak tanır.

**Doğru**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**Yanlış**

Özelliğe CSS sınıfında izin verilmiyor.

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### Geçiş yapabilme ve animasyona dönüştürebilme özellikleri <a name="transitionable-and-animatable-properties"></a>

Geçilebilen tek özellikler opaklık ve dönüşümdür. ([Gerekçe](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**Doğru**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**Yanlış**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**Doğru**

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

**Yanlış**

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

### İzin verilen AMP uzantıları ve yerleşik öğeler <a name="allowed-amp-extensions-and-builtins"></a>

AMPHTML reklam öğesinde _izin verilen_ AMP uzantı modülleri ve AMP yerleşik etiketleri aşağıda verilmiştir. Listede açıkça belirtilmeyen uzantılar veya yerleşik etiketler, yasaklanmıştır.

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
- amp-mraid, deney amaçlıdır. Onu kullanmayı düşünüyorsanız, lütfen [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new) adresinde bir konu açın.
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

Çıkartmaların çoğu, performans için veya AMPHTML reklamlarının analizini kolaylaştırmak içindir.

_Örnek:_ `<amp-ad>` listeden çıkarılmıştır. Bu bileşene açıkça izin verilmemiştir çünkü bir `<amp-ad>` bileşenine `<amp-ad>` bileşeni içinde izin vermek, potansiyel olarak sınırsız reklam yükleme şelalelerine neden olabilir ki bu da AMPHTML reklam performans hedefleri için uygun değildir.

_Örnek:_ `<amp-iframe>` bu listeden çıkarılmıştır. Reklamlar rasgele Javascript yürütmek ve rastgele içerik yüklemek için kullanabileceğinden ona izin verilmez. Bu özellikleri kullanmak isteyen reklamlara <a>a4aRegistry</a> girişlerinden <code>false</code> yanıtını almalı ve mevcut '3p iframe' reklam oluşturma mekanizmasını kullanmalıdır.

_Örnek:_ `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>` ve `<amp-youtube>` etiketleri de `<amp-iframe>` ile aynı nedenden çıkarılmıştır: Hepsi iframe'ler oluşturur ve potansiyel olarak sınırsız kaynak tüketebilirler.

_Örnek:_ `<amp-ad-network-*-impl>` bu listeden çıkarılmıştır. `<amp-ad>` etiketi, bu uygulama etiketlerine atama işlemini gerçekleştirir; reklam öğeleri bunları doğrudan eklemeye çalışmamalıdır.

_Örnek:_ `<amp-lightbox>` henüz dahil edilmemiştir çünkü bazı AMPHTML reklam öğeleri bile bir iframe'de oluşturulabilir ve şu anda bir reklamın iframe'in ötesine genişlemesi için bir mekanizma yoktur. Gelecekte bunun için ortaya koyulan bir istek varsa destek eklenebilir.

### HTML etiketleri <a name="html-tags"></a>

Aşağıdakiler, bir AMPHTML reklam öğesinde _izin verilen_ etiketlerdir. Açıkça izin verilmeyen etiketler yasaktır. Bu liste, genel [AMP etiketi ek izin](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md) listesinin bir alt kümesidir. Bu liste gibi, [HTML'nin Öğeleri](http://www.w3.org/TR/html5/single-page.html#html-elements) bölüm 4'te, HTML5 özellikleriyle tutarlı olarak sıralanmıştır.

Çıkartmaların çoğu ya performans içindir ya da etiketler HTML5 standardına uygun olmadığı içindir. Örneğin, AMPHTML reklamları JavaScript'in etkinleştirilmesine bağlı olduğundan `<noscript>` çıkarılmıştır, bu nedenle `<noscript>` bloğu hiçbir zaman yürütülmez ve bu yüzden sadece reklam öğesini şişirir, bant genişliği maliyeti doğurur ve gecikmeye neden olur. Benzer şekilde, `<acronym>` , `<big>` vd. HTML5 uyumlu olmadıkları için yasaktır.

#### 4.1 Kök öğesi <a name="41-the-root-element"></a>

4.1.1 `<html>`

- `<html ⚡4ads>` veya `<html amp4ads>` türleri kullanmalıdır

#### 4.2 Belge üst verileri <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- `<link rel=...>` etiketlerine `<link rel=stylesheet>` haricinde izin verilmez.

- **Not:** Genel AMP'den farklı olarak, `<link rel="canonical">` etiketleri yasaklanmıştır.

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Bölümler <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Gruplama İçeriği <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Metin düzeyinde semantik <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Düzenlemeler <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Gömülü İçerik <a name="47-embedded-content"></a>

- Gömülü içerik sadece `<amp-img>` veya `<amp-video>` gibi AMP etiketleri yoluyla desteklenir.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

SVG etiketleri HTML5 ad alanında değildir. Aşağıda bölüm tanımlayıcıları olmadan listelenmişlerdir.

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 Tablo verileri <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Formlar <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 Kodlama <a name="411-scripting"></a>

- Genel bir AMP belgesinde olduğu gibi reklam öğesinin `<head>` etiketi bir `<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>` etiketi içermelidir.
- Genel AMP'den farklı olarak, `<noscript>` yasaklanmıştır.
  - _Gerekçe:_ AMPHTML reklamları, Javascript'in hep çalışabilmesini gerektirdiğinden, `<noscript>` blokları AMPHTML reklamlarında herhangi bir amaca hizmet etmez ve yalnızca ağ bant genişliği maliyeti yaratırlar.
- Genel AMP'den farklı olarak `<script type="application/ld+json">` yasaklanmıştır.
  - _Gerekçe:_ JSON LD, ana sayfalardaki yapılandırılmış veri işaretlemesi için kullanılır, ancak reklam öğeleri bağımsız belgeler değildir ve yapılandırılmış veriler içermezler. İçlerindeki JSON LD blokları sadece ağ bant genişliğine mal olur.
- Diğer tüm kodlama kuralları ve istisnalar genel AMP'den taşınmıştır.
