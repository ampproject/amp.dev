---
$title: amp-mustache
$category@: dynamic-content
teaser:
  text: Mustache.js şablonlarının oluşturulmasına izin verir.
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



[Mustache.js](https://github.com/janl/mustache.js/) oluşturulmasına izin verir.

<table>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-mustache/">ek açıklamalı amp-mustache</a> örneğine bakın.</td>
  </tr>
</table>


## Sürüm notları <a name="version-notes"></a>

| Sürüm | Açıklama |
|-------|-----|
| 0.2 | `<svg>` öğeleri için destek ve daha küçük paket boyutu (12,2 KB - 20,5 KB, gzip ile sıkıştırılmış).<br><br> Daha modern bir temiz HTML kitaplığına (Caja'dan DOMPurify'a) geçiş. Bu, etiket ve özellik beyaz listesi oluşturmadaki farklılıklar nedeniyle zarar veren küçük değişikliklere neden olabilir. Oluşturulan işaretlemedeki değişikliklerin işlevselliği etkilemediğinden emin olmak için üretim kanalına aktarmadan önce sayfalarınızı test etmenizi öneririz. |
| 0.1 | İlk uygulama. |

## Söz dizimi <a name="syntax"></a>

Mustache, mantık içermeyen bir şablon söz dizimidir. Daha ayrıntılı bilgi için [Mustache.js dokümanlarına](https://github.com/janl/mustache.js/) bakın. Temel Mustache etiketlerinden bazıları şunlardır:

* {% raw %}`{{variable}}`{% endraw %}: Bir değişken etiketi. Bir değişkenin çıkış karakterli HTML değerini verir.
*  {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: Bir bölüm etiketi. Bir değişkenin varlığını test edebilir ve bir dizi olması halinde testi tekrarlayabilir.
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: Ters çevrilmiş bir etiket. Bir değişkenin var olmayışını test edebilir.
* {% raw %}`{{{unescaped}}}`{% endraw %}: Çıkış karaktersiz HTML. Sağlayabileceği işaretlemede kısıtlanmıştır (aşağıdaki "Kısıtlamalar" konusuna bakın).

## Kullanım <a name="usage"></a>

`amp-mustache` şablonu, [AMP Şablon Spesifikasyonu](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md)'na göre tanımlanmalı ve kullanılmalıdır.

Öncelikle `amp-mustache` şu şekilde beyan edilmeli/yüklenmelidir:

```html
<script src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js" async="" custom-template="amp-mustache"></script>
```

Daha sonra, Mustache şablonları bir `script` veya `template` etiketinde şu şekilde tanımlanabilir:

[sourcecode:html]
{% raw %}<!-- Şablon etiketi kullanma. -->
<template type="amp-mustache">
  Hello {{world}}!
  {% endraw %}[/sourcecode]

veya

<!-- Komut dosyası etiketi kullanma. -->
[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}[/sourcecode]

AMP doğrulaması yararlı dev-x ipuçları sağladığından, mümkün olan her yerde `template` etiketini kullanın. Uç durumlar ve tablo bağlamında şablon oluşturma sorunları için `script` şablonunu kullanın. Aşağıdaki "Tablolar" bölümüne bakın.

Şablonların nasıl keşfedileceğine, ne zaman oluşturulacağına ve verilerin nasıl sağlanacağına, içeriğini oluşturmak için bu şablonu kullanan hedef AMP öğesi (ör. bir [amp-list](amp-list.md), [amp-form](amp-form.md) vb.) karar verir.

## Kısıtlamalar <a name="restrictions"></a>

### Doğrulama <a name="validation"></a>

Tüm AMP şablonları gibi `amp-mustache` şablonlarının da iyi biçimlendirilmiş DOM parçaları olmalıdır. Bu, diğer noktaların yanı sıra, `amp-mustache` etiketini şunlar için kullanamayacağınız anlamına gelir:

* Etiket adını hesaplama. Örneğin, {% raw %}`<{{tagName}}>`{% endraw %} öğesine izin verilmez.
* Özellik adını hesaplama. Örneğin, {% raw %}`<div {{attrName}}=something>`{% endraw %} öğesine izin verilmez.

"Üçlü mustache"ın sonucu yalnızca şu etiketlere izin verecek şekilde temizlenir: `a`, `b`, `br`, `caption`, `colgroup`, `code`, `del`, `div`, `em`, `i`, `ins`, `li`, `mark`, `ol`, `p`, `q`, `s`, `small`, `span`, `strong`, `sub`, `sup`, `table`, `tbody`, `time`, `td`, `th`, `thead`, `tfoot`, `tr`, `u`, `ul`.

### Temizleme <a name="sanitization"></a>

Mustache çıktısı, güvenlik nedenleriyle ve AMP'nin geçerliliğini korumak için temizlenir. Bu, belirli öğelerin ve özelliklerin haber verilmeden kaldırılmasına neden olabilir.

## Güçlükler <a name="pitfalls"></a>

### İç içe yerleştirilmiş şablonlar <a name="nested-templates"></a>

AMP Doğrulaması'na göre `<template>` öğeleri, diğer `<template>` öğelerinin alt öğeleri olmamalıdır. Bu durum, `amp-list` ve `amp-form` gibi, şablonları kullanan iki bileşen iç içe yerleştirilirken ortaya çıkabilir.

Bu sorunu geçici olarak çözmek için `<template>` öğeleri, bileşendeki `template` özelliği aracılığıyla `id` bilgilerine göre referans alınabilir. Örneğin:

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]

Şu şekilde de gösterilebilir:

[sourcecode:html]
{% raw %}<!-- İç içe yerleştirmeyi önlemek için şablonları dışlama. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]

### Tablolar <a name="tables"></a>

AMP şablon dizelerinin `<template>` öğelerinde belirtilmesi gerektiğinden bu durum, tarayıcı ayrıştırması nedeniyle beklenmeyen davranışlara neden olabilir. Örneğin, `<table>` öğelerinin, metnin [koruyucu üst öğesi](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables) olmasına neden olabilir. Aşağıdaki örnekte:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</template>
{% endraw %}[/sourcecode]

Tarayıcı, {% raw %}`{{#foo}}`{% endraw %} ve {% raw %}`{{/foo}}`{% endraw %} metin düğümlerinin koruyucu üst öğesi olur:

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}
<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]

Geçici çözümler arasında Mustache bölümlerinin HTML yorumlarında sarmalanmasını (ör. {% raw %}`<!-- {{#bar}} -->`{% endraw %}), bunun yerine `<div>` gibi tablo dışı öğelerin veya şablonlarınızı tanımlamak için bir `<script type="text/plain">` etiketinin kullanılmasını içerir.

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</script>
{% endraw %}[/sourcecode]

### Çıkış karakterlerini alıntılama <a name="quote-escaping"></a>

Özellik değerlerini hesaplamak için `amp-mustache` kullanılırken çıkış karakterlerini alıntılama bir sorun olabilir. Örneğin:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
<!-- foo değişkenindeki bir çift tırnak (") HTML'nin bozulmasına yol açar. -->
<amp-img alt="{{foo}}" src="example.jpg" width="100" height="100"></amp-img>

<!-- bar değişkenindeki bir tek tırnak (') veya çift tırnak (") AMP çalışma zamanı ayrıştırma hatasına neden olur. -->
<button on="tap:AMP.setState({foo: '{{bar}}'})">Click me</button>
</template>
{% endraw %}[/sourcecode]

Mustache HTML `&amp;` çıkış karakterlerini kullanacağından (ör. `&quot;` -&gt; `&amp;quot;`) {% raw %}`{{foo}}`{% endraw %} veya {% raw %}`{{bar}}`{% endraw %} değişkenlerinde HTML karakter kodlarının kullanılması işe yaramaz. Bir geçici çözüm ise ′ (`&prime;`) ve ″ (`&Prime;`) gibi tıpkı basım karakterlerin kullanılmasıdır.

Bunun yerine, bu değişikliğin `amp-mustache` içinde gerçekleştirilmesi için [açık bir teklif](https://github.com/ampproject/amphtml/issues/8395) vardır. Bu teklifi desteklemek isterseniz lütfen konu hakkında yorum yapın.

### HTML varlıkları <a name="html-entities"></a>

HTML varlıkları, `<template>` öğelerinde korunmaz.

Kullanıcı tarafından oluşturulmuş metin içeren bir `<template>` öğesinin sunucu tarafında oluşturulmasını isterseniz, {% raw %}`{{`, `}}`, `{{{`, `}}}`{% endraw %} içeren kullanıcı tarafından oluşturulmuş metin bir Mustache bölümü olarak işleneceğinden bir soruna neden olabilir. Örneğin, {% raw %}`{{`{% endraw %} karakterlerinin `&lcub;&lcub;` HTML varlıklarıyla değiştirilmesi, tarayıcı `<template>` öğesini ayrıştırdığında bu varlıklar korunmayacağı için işe yaramaz.

Geçici çözümler, {% raw %}`{{`{% endraw %} gibi dizeleri farklı karakterlerle değiştirmeyi veya bunları kullanıcı tarafından oluşturulmuş içerikten bütünüyle ayırmayı içerir.

## Doğrulama <a name="validation-1"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-mustache kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mustache/validator-amp-mustache.protoascii) bakın.
