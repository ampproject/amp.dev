---
$title: AMP Doğrulama Hataları
---

Geçerli AMP dokümanları hiçbir doğrulama hatası içermemelidir.
Bu dokümanın amacı, [AMP sayfalarınızı doğrularken](validate_amp.md) karşılaştığınız doğrulama hatalarını daha iyi anlamanıza ve düzeltmenize yardımcı olmaktır.
Doğrulama hatalarıyla ilgili eksiksiz bir genel bakış için [AMP doğrulayıcı spesifikasyonuna](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) bakın.

## AMP HTML etiketi ve öznitelik hataları

### Zorunlu etiket eksik

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The mandatory tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Zorunlu HTML etiketini ekleyin (veya düzeltin).</td>
  </tr>
</table>

Tüm AMP dokümanlarında aşağıdaki etiketler bulunmalıdır:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Bu zorunlu etiketlerin [AMP doğrulayıcı spesifikasyonunda](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) bir `mandatory: true` alanı olur; bunlara [AMP spesifikasyonunda](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) da başvuruda bulunulur.

### Başka bir etiketin gerektirdiği etiket eksik

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">TAG_REQUIRED_BY_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The '%1' tag is missing or incorrect, but required by '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Gerekli HTML etiketini ekleyin (veya düzeltin).</td>
  </tr>
</table>

Doğrulayıcı, AMP dokümanında genişletilmiş bir bileşen bulduğunda `TAG_REQUIRED_BY_MISSING` hatasını bildirir, ancak `<script>` eşdeğerini bulmaz.

[Genişletilmiş bileşenlerin](../../../../documentation/components/index.html), AMP dokümanına açık bir şekilde özel öğe olarak eklenmeleri gerekir.
Bu hataları düzeltmek için genişletilmiş bileşenin referans sayfasına gidin, gerekli komut dosyasını kopyalayın ve AMP dokümanı `<head>` etiketine yapıştırın.

### İzin verilmeyen etiket

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The tag '%1' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>İzin verilmeyen etiketi kaldırın.</td>
  </tr>
</table>

Etiketler beyaz listede yer alır, bu yüzden izin verilmeyen tüm etiketlerin tanımlandığı bir liste yoktur; ancak, izin verilmeyen etiketler grubu [AMP spesifikasyonunda](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) geniş bir şekilde tanımlanmaktadır.

### Zorunlu öznitelik eksik

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">MANDATORY_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The mandatory attribute '%1' is missing in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Zorunlu özniteliği etikete ekleyin.</td>
  </tr>
</table>

AMP etiketlerine ilişkin zorunlu öznitelikler [AMP'nin doğrulayıcı spesifikasyonunda](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) tanımlanmıştır.
Etiketi aramanız, listelenen öznitelikleri görüntüleyip `mandatory: true` alanını kontrol etmeniz yeterlidir.
Her bir AMP etiketinin zorunlu öznitelikleri etiketin spesifikasyonu içinde de listelenir.

### Geçersiz öznitelik değeri

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">INVALID_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Öznitelik değerini geçerli bir değerle düzeltin.</td>
  </tr>
</table>

Bu hata, bir HTML etiketinin izin verilen bir ada, ancak izin verilmeyen bir değere sahip bir özniteliğinin olduğunu belirtir.
Örneğin, yaygın şekilde bu hatayı tetikleyen şeylerden biri URL'lere ilişkin geçersiz değerlerdir. Tüm URL değerlerinin (`href` ve `src` özniteliklerindeki), bu [olası öznitelik değerlerinin](http://www.w3schools.com/tags/att_a_href.asp) biriyle eşleşmesi gerekir.

<strong>ÖNEMLİ:</strong> AMP'deki birçok URL değeri HTTPS kullanılmasını gerektirir. Bu hatayı alıyorsanız ve neden olduğundan emin değilseniz özniteliğin HTTPS gerektirip gerektirmediğini öğrenmek için ilgili AMP etiketinin spesifikasyonunu kontrol edin.

### İzin verilmeyen öznitelik

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">DISALLOWED_ATTR</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The attribute '%1' may not appear in tag '%2'."</span></td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Özniteliği HTML etiketinden kaldırın.</td>
  </tr>
</table>

Öznitelikler beyaz listede yer alır, bu yüzden izin verilmeyen tüm özniteliklerin tanımlandığı bir liste yoktur.
Belirli bir etikete ilişkin desteklenen öznitelikleri kontrol etmek için HTML etiketini ve ardından [AMP doğrulayıcı spesifikasyonunda](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) `attrs` özniteliğini arayın.

Her bir etikete ilişkin belirli özniteliklerin yer aldığı beyaz listeye ek olarak, tüm AMP etiketleri `$GLOBAL_ATTRS` altında beyaz listeye eklenen tüm öznitelikleri kullanabilir; `"data-"` önekli tüm öznitelikler de beyaz listede yer alır.

### Zorunlu metin eksik veya yanlış

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">MANDATORY_CDATA_MISSING_OR_INCORRECT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Zorunlu metni etikete ekleyin veya etiket içindeki zorunlu metni düzeltin.</td>
  </tr>
</table>

CDATA, başlangıç ve bitiş HTML etiketi arasındaki içerik verisidir ve şu anda hem beyaz listeler hem de kara listelerle değerlendirilmektedir.
Zorunlu CDATA içeren etiketler şunlardır:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

ve

[sourcecode:html]
<style amp-custom>
[/sourcecode]

Buna ilişkin ayrıntılı ileti aşağıdakilerden biri olabilir:

* "Zorunlu stil standart metni (js etkin)"
* "Zorunlu stil standart metni (noscript)"
* "İzin verilmeyen -amp- CSS sınıf adı öneki"
* "CSS'de izin verilmeyen !important özelliği"
* "CSS'de izin verilmeyen @charset"
* "CSS'de izin verilmeyen @import"
* "CSS'de izin verilmeyen @namespace"
* "CSS'de izin verilmeyen @supports"
* "CSS'de izin verilmeyen @document"
* "CSS'de izin verilmeyen @page"
* "CSS'de izin verilmeyen @viewport"

### Etiket içinde izin verilmeyen metin

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">CDATA_VIOLATES_DENYLIST</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>İzin verilmeyen metni kaldırın.</td>
  </tr>
</table>

Belirli CSS verileri, önemli CSS AMP kurallarını doğrulamak için kara listeye eklenmiştir.

Aşağıda, kara listeye alınan CSS verilerinin listesini görebilirsiniz (ayrıca, [AMP doğrulayıcı spesifikasyonunda `disallowed_cdata_regex` öğesine de bakın](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)):

* `"\\.i?-amp-"` ("CSS -amp- sınıf adı öneki")
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Etiketteki özniteliğin içinde izin verilmeyen özellik

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">DISALLOWED_PROPERTY_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is disallowed."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Belirtilen öznitelikteki izin verilmeyen özelliği kaldırın.</td>
  </tr>
</table>

Bu hata, bir özniteliğin içindeki özellik adına izin verilmediğinde ortaya çıkar.
Bu bağlamdaki terim özelliği, bir öznitelik içindeki yapısal anahtar/değer verisi anlamına gelir.
Örneğin, `<meta name="viewport content="width=device-width;minimum-scale=1">` etiketindeki `width` ve `minimum-scale` özellik adlarıdır.

Aşağıdaki etiket, bir DISALLOWED_PROPERTY_IN_ATTR_VALUE hatasıyla sonuçlanır:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Başka bir örnek olarak, aşağıdaki etiket bir hatayla sonuçlanır:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

Şu şekilde olmalıdır: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Geçersiz özellik değeri

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Geçersiz özellik değerini düzeltin.</td>
  </tr>
</table>

Bu hata, bir öznitelik içindeki özellik değeri geçersiz olduğunda ortaya çıkar.
Bu bağlamdaki terim özelliği, bir öznitelik içindeki yapısal anahtar/değer verisi anlamına gelir.
Örneğin, `<meta name="viewport content="width=device-width;minimum-scale=1">` etiketindeki `device-width` ve `1` özellik değerleridir.

Aşağıdaki kod, bir INVALID_PROPERTY_VALUE_IN_ATTR_VALUE hatasıyla sonuçlanır:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Başka bir örnek olarak, aşağıdaki etiket bir hatayla sonuçlanır:

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

Şu şekilde olmalıdır: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### Eksik URL

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td><span class="notranslate">MISSING_URL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Biçim</strong></td>
    <td><span class="notranslate">"Missing URL for attribute '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Düzeltme</strong></td>
    <td>Geçerli URL'yi ekleyin.</td>
  </tr>
</table>

Bu hata, URL gerektiren bir öznitelikte URL eksikse (ör. boş bir `href` veya `src` özniteliği) ortaya çıkar.

### Geçersiz URL

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Biçim</strong></td>
    <td><span class="notranslate">"Malformed URL '%3' for attribute '%1' in tag '%2'"</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Düzeltme</strong></td>
    <td>Bozuk URL'yi düzeltin.</td>
  </tr>
</table>

Bu hata, bir özniteliğin URL'si varsa, ancak URL geçersizse ortaya çıkar.

### Geçersiz URL protokolü

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td><span class="notranslate">INVALID_URL_PROTOCOL</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Biçim</strong></td>
    <td><span class="notranslate">Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Düzeltme</strong></td>
    <td>Geçerli bir protokolle değiştirin; örneğin, `http` protokolünün `https` olması gerekiyor olabilir.</td>
  </tr>
</table>

Bu hata, `href` veya `src` özniteliğinin belirli protokollere atanması gereken etiketler için belirtilir.
Örneğin, birçok etiket `https` gerektirir.

### Öznitelikte zorunlu özellik eksik

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The property '%1' is missing from attribute '%2' in tag '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Eksik özelliği ekleyin.</td>
  </tr>
</table>

Şu anda bu hata, şu zorunlu özellikler eksikse ortaya çıkmaktadır:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

Bunlar beklenen etiketlere başvuruda bulunur:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### Aynı anda kullanılamayan (ayrışık) öznitelikler

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">MUTUALLY_EXCLUSIVE_ATTRS</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Aynı anda kullanılamayan (ayrışık) özniteliklerden birini kaldırın.</td>
  </tr>
</table>

Bu hata, bir etiket aynı anda kullanılamayan (ayrışık) özniteliklerin her ikisine de sahip olduğunda ortaya çıkar.
Örneğin, aşağıdaki etiketler için yalnızca birine izin verilir:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` veya `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` veya `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` veya `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` veya `data-videoid`

### Listede zorunlu öznitelik eksik

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">MANDATORY_ONEOF_ATTR_MISSING</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The tag '%1' is missing a mandatory attribute - pick one of %2." </span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Sağlanan öznitelik seçenekleri arasından eksik zorunlu özniteliği ekleyin.</td>
  </tr>
</table>

Bu hata, bir etikette birden çok seçenek arasından gerekli bir öznitelik eksik olduğunda ortaya çıkar.
Örneğin, şu etiketler iki olası seçenekten bir özniteliğin bulunmasını gerektirir:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` veya `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` veya `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` veya `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` veya `data-videoid`

### Yanlış üst etiket

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">WRONG_PARENT_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The parent tag of tag '%1' is '%2', but it can only be '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Etiketi, gerekli üst öğenin doğrudan bir alt öğesi yapın.</td>
  </tr>
</table>

Belirli etiketler, yakın bir üst etiket gerektirir (uzak bir üst etiket değil).
Aşağıda, belirli etiketler için gerekli üst etiketler listelenmiştir (etiket, üst etiket):

* `!doctype`, `root` üst etiketini gerektirir.
* `html`, `!doctype` üst etiketini gerektirir.
* `head`, `html` üst etiketini gerektirir.
* `body`, `html` üst etiketini gerektirir.
* `link`, `head` üst etiketini gerektirir.
* `meta`, `head` üst etiketini gerektirir.
* `style amp-custom`, `head` üst etiketini gerektirir.
* `style`, `boilerplate (noscript)` üst etiketini gerektirir.
* `noscript`, `head` üst etiketini gerektirir.
* `script`, `head` üst etiketini gerektirir.
* `source`, bir medya etiketi ([`amp-audio`](../../../../documentation/components/reference/amp-audio.md), [`amp-video`](../../../../documentation/components/reference/amp-video.md) vb.) gerektirir.

### İzin verilmeyen etiket üst etiketi

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">DISALLOWED_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The tag '%1' may not appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>İzin verilmeyen iç içe yerleştirilmiş etiketi kaldırın (veya taşıyın).</td>
  </tr>
</table>

Bu hata, bir etiket doğrulanmayan bir başka etiketin alt etiketi olduğunda ortaya çıkar.
Şu anda tek örnek bir `template` etiketidir. Bu etiket, başka bir `template` etiketinin altında iç içe yerleştirilemez.

### Zorunlu etiket üst etiketi

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Etiketi kaldırın veya belirtilen etiketin bir alt etiketi yapın.</td>
  </tr>
</table>

Zorunlu alt etiketler, [AMP doğrulayıcı spesifikasyonunda](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) `mandatory_ancestor` olarak tanımlanır.

Hata, aşağıdaki etiketlerin `mandatory_ancestor` (etiket, üst etiket) özniteliği eksik olduğunda ortaya çıkar:

* `img`, `noscript` etiketinin bir alt etiketi olmalıdır.
* `video`, `noscript` etiketinin bir alt etiketi olmalıdır.
* `audio`, `noscript` etiketinin bir alt etiketi olmalıdır.
* `noscript`, `body` etiketinin bir alt etiketi olmalıdır.

### İpuçlu zorunlu etiket üst etiketi

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">MANDATORY_TAG_ANCESTOR_WITH_HINT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Etiketi kaldırın, belirtilen etiketin alt etiketi yapın veya etiketi, ipuçlu etiketle değiştirin.</td>
  </tr>
</table>

Hata, AMP dokümanında aşağıdaki etiketlerden biri bulunduğunda ve zorunlu üst etiketiyle doğru bir şekilde iç içe yerleştirilmediğinde ortaya çıkar:

* `img`, `noscript` üst etiketinin içinde değildir.
* `video`, `noscript` üst etiketinin içinde değildir.
* `audio`, `noscript` üst etiketinin içinde değildir.
* `noscript`, `body` üst etiketinin içinde değildir.

### Yinelenen benzersiz etiket

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">DUPLICATE_UNIQUE_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The tag '%1' appears more than once in the document."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>AMP dokümanındaki yinelenen etiketlerden birini kaldırın.</td>
  </tr>
</table>

Bu hata, etiketin yalnızca bir örneğine izin verildiği ve yinelenen bir etiketin bulunduğu durumlarda ortaya çıkar.

Benzersiz etiketlerin tam listesi bilinmektedir:

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

## Stil ve düzen hataları <a name="stil-ve-düzen-hataları"></a>

Stil ve düzen hatalarına ayrıntılı bir şekilde girmeden önce, [stil](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) ve [düzenin](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) AMP'de nasıl çalıştığının anlaşılması iyi olur. AMP sayfaları birer HTML sayfası olduğundan stil, herhangi bir HTML sayfasıyla büyük ölçüde aynıdır.
Ancak, sayfaların hızlı yüklenmesini sağlayan bazı kısıtlamalar söz konusudur ve AMP doğrulayıcı, bu kısıtlamaları uygular.

Düzen, AMP sayfalarında daha fazla denetlenir.
Sayfada görüntülenen herhangi bir etiketin önceden tanımlanmış bir yüksekliği ve genişliği olmalıdır. Bu, oluşturma ve kaydırma olumsuzluklarını önemli ölçüde azaltır.
Bununla birlikte, bu öznitelikleri manuel olarak eklemeniz gerekmez.
Belirli düzen türlerinde, varsayılan değerler kabul edildiğinden AMP doğrulayıcı hata bildirmez.

Her AMP etiketinin, [AMP doğrulayıcı spesifikasyonunda](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) tanımlanana benzer bir `supported_layouts` listesi vardır.
Doğrulayıcı, desteklenmeyen düzenler için hatalar bildirir ve önceden tanımlanmış düzene ilişkin doğrulama kurallarını kontrol eder.

### Stil sayfası çok uzun

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">STYLESHEET_TOO_LONG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Stil sayfasının boyutunu 50.000 baytın altında olacak şekilde küçültün.</td>
  </tr>
</table>

AMP doğrulayıcı, `<style amp-custom>` içindeki stil içeriğinin 50.000 bayt sınırını aştığı tespit edildiğinde bu hatayı bildirir.

### CSS sözdizimi hatası

<table>
   <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - %2."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>CSS sözdizimi hatasını düzeltin.</td>
  </tr>
</table>

Bu hata, belirtilen etikette CSS sözdizimi hataları olduğunda ortaya çıkar.
Hataya neyin neden olduğundan emin değilseniz, örneğin [csslint](http://csslint.net/) gibi bir çevrimiçi CSS doğrulayıcıyla CSS'yi incelemeyi deneyin.

### Belirli bir kuralda CSS sözdizimi hatası

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">CSS_SYNTAX_INVALID_AT_RULE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Belirtilen CSS sözdizimi hatasını düzeltin.</td>
  </tr>
</table>

Bu hata, CSS içindeki @ kurallarına gönderme yapar. AMP, bunlar için yalnızca bir avuç kurala izin vermektedir.
(ayrıca [AMP spesifikasyonuna](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) da bakın).
Örneğin, `@import` kuralına izin verilmez.
Doğrulama hatası özel olarak geçersiz olan kuralı size bildirerek söz konusu kuralın düzeltilmesini kolaylaştırır.

### İşaret edilen düzen AMP etiketi tarafından desteklenmiyor

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">IMPLIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The implied layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Etiket için geçerli bir düzen özniteliği sağlayın.</td>
  </tr>
</table>

Bu hata, AMP etiketi için bir düzen belirtmediğinizde ve işaret edilen düzen (genişlik, yükseklik ve boyutlara göre) desteklenmediğinde ortaya çıkar.
[AMP doğrulayıcı spesifikasyonunda](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii), etikete ilişkin `supported_layout` değerlerini kontrol edin.

Gerçek düzen davranışı, `layout` özniteliği tarafından belirlenir.
Düzenin nasıl çalıştığıyla ilgili daha fazla bilgi için [Düzen Nasıl Kontrol Edilir?](../../develop/style_and_layout/control_layout.md) konusuna ve [AMP HTML düzeni sistem spesifikasyonuna](../../../../documentation/components/reference/amp-layout.md) bakın.

**Not:** Düzeni belirtmezseniz ve `width` ile `height` değerlerini dahil etmezseniz düzen, varsayılan olarak CONTAINER değerine ayarlanır. CONTAINER hiçbir AMP etiketinde desteklenmediğinden doğrulayıcı bir hata bildirir.
CONTAINER dışında bir düzen belirtir veya bir `width` ve/veya `height` değeri bildirirseniz hata kaybolur.

### İşaret edilen düzen, özniteliğe izin vermiyor

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Biçim</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Düzeltme</strong></td>
    <td>İzin verilmeyen özniteliği etiketten kaldırın veya bu özniteliğe izin veren bir düzen belirtin.</td>
  </tr>
</table>

Bu hata, AMP etiketi için bir düzen belirtmediğinizde ve işaret edilen düzen izin verilmeyen bir öznitelik içerdiğinde ortaya çıkar.
Düzen türleri için izin verilmeyen öznitelikler [AMP HTML düzeni sistem spesifikasyonunda](../../../../documentation/components/reference/amp-layout.md) açıklanmıştır.

### Belirtilen düzen AMP etiketi tarafından desteklenmiyor

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">SPECIFIED_LAYOUT_INVALID</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The specified layout '%1' is not supported by tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Etiket tarafından desteklenen bir düzen belirtin.</td>
  </tr>
</table>

Bu hata, etiket için belirtilen düzen desteklenmediğinde ortaya çıkar.
[AMP doğrulayıcı spesifikasyonunda](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii), etikete ilişkin `supported_layout` değerlerini kontrol edin.

Gerçek düzen davranışı, `layout` özniteliği tarafından belirlenir.
Düzenin nasıl çalıştığıyla ilgili daha fazla bilgi için [Düzen Nasıl Kontrol Edilir?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) konusuna ve [AMP HTML düzeni sistem spesifikasyonuna](../../../../documentation/components/reference/amp-layout.md) bakın.

### Belirtilen düzen, özniteliğe izin vermiyor

<table>
  <tr>
    <td class="col-thirty"><strong>Kod</strong></td>
    <td><span class="notranslate">ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Biçim</strong></td>
    <td><span class="notranslate">"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</span></td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Düzeltme</strong></td>
    <td>İzin verilmeyen özniteliği etiketten kaldırın veya bu özniteliğe izin veren bir düzen belirtin.</td>
  </tr>
</table>

Bu hata, AMP etiketi için bir düzen belirttiğinizde ve düzen izin verilmeyen bir öznitelik içerdiğinde ortaya çıkar.
Düzen türleri için izin verilmeyen öznitelikler [AMP HTML düzeni sistem spesifikasyonunda](../../../../documentation/components/reference/amp-layout.md) açıklanmıştır.

### Düzenin gerektirdiği öznitelik için geçersiz değer

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">ATTR_VALUE_REQUIRED_BY_LAYOUT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Özniteliği belirtilen değere ayarlayın.</td>
  </tr>
</table>

Bu hata, öznitelik değeri belirtilen düzen için geçersiz olduğunda ortaya çıkar.
Bu hatayı neyin tetiklediğini anlamak için [düzenlerin farklı davranışları](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) hakkında bilgi sahibi olmanız gerekir.

Örneğin, düzeni `fixed-height` olacak şekilde ayarladığınızı ve hem `height` hem de `width` için sayısal değerler eklediğinizi düşünelim.
`fixed-height` düzeni, bir `height` değeri alır.
`width` özniteliği mevcut olmamalı veya `auto` değerine ayarlanmış olmalıdır.
Doğrulayıcı, ATTR_VALUE_REQUIRED_BY_LAYOUT hatasını bildirir.

### Genişlik ve yükseklik için tutarsız birimler

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Tutarlı birim genişlikleri ve yükseklikleri sağlayın.</td>
  </tr>
</table>

`layout=fixed` dışında, genişlik ve yükseklik özniteliklerinin aynı birimlerde ifade edilmesi gerekir.
Aynı birimlerde ifade edilmediklerinde bu hata tetiklenir.

Örneğin, `<amp-img src="" layout="responsive" width="42px" height="42rem">` etiketi şu hata iletisiyle sonuçlanır:

"'amp-img' etiketinde genişlik ve yükseklik için tutarsız birimler kullanıldı - genişlik 'px', yükseklik 'rem' olarak belirtildi."

## Şablon oluşturma hataları

AMP sayfaları şablon oluşturma sözdizimini içeremez. Bunun için, sözdiziminin [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md) gibi özellikle şablonları içermek üzere tasarlanmış bir AMP etiketi içinde olması gerekir.

Şablonları kaynak dosyalarınıza dahil etmeniz bir sıkıntı oluşturmaz, ancak sorun olmaması için bu dosyaların oluşturulan çıktısının şablonları içermemesi gerekir ([CSS ön işlemcilerini kullanma](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) konusuna da bakın).

### Öznitelik, şablon sözdizimi içeriyor

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">TEMPLATE_IN_ATTR_NAME</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"Mustache template syntax in attribute name '%1' in tag '%2'."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Mustache şablonu sözdizimini şablondan kaldırın.</td>
  </tr>
</table>

Bu hata, doğrulayıcı bir öznitelik değerinde [Mustache şablonu sözdizimini](https://mustache.github.io/mustache.5.html) bulduğunda ortaya çıkar.

### Öznitelik, çıkış yapılmamış şablon sözdizimi içeriyor

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">UNESCAPED_TEMPLATE_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Mustache şablonundan çıkış yapın.</td>
  </tr>
</table>

Bu hata, doğrulayıcı bir öznitelik değerinde [Mustache şablonu sözdiziminden çıkış yapılmadığını](https://mustache.github.io/mustache.5.html) belirlediğinde ortaya çıkar.

### Öznitelik, şablon parçası içeriyor

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">TEMPLATE_PARTIAL_IN_ATTR_VALUE</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Mustache parçasını kaldırın.</td>
  </tr>
</table>

Bu hata, doğrulayıcı bir öznitelik değerinde [Mustache şablonu parçası](https://mustache.github.io/mustache.5.html) bulduğunda ortaya çıkar.

## Kullanımdan kaldırma hataları

### Kullanımdan kaldırılmış etiket

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">DEPRECATED_TAG</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">No error message defined as yet (no deprecated tags).</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>Kullanımdan kaldırılan etiketi kaldırın.</td>
  </tr>
</table>

Bu uyarı, AMP dokümanında önceden geçerli olan bir AMP etiketi bulunduğunda ortaya çıkar.
Bu yalnızca bir uyarıdır: Uyarılar içeren AMP dokümanlarının geçerliliği devam eder.
Şu anda kullanımdan kaldırılmış herhangi bir etiket yoktur; uyarı, ileride olabilecek kullanımdan kaldırmalar için ayrılmıştır.

### Kullanımdan kaldırılmış öznitelik

<table>
  <tr>
  	<td class="col-thirty"><strong>Kod</strong></td>
  	<td><span class="notranslate">DEPRECATED_ATTR</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Biçim</strong></td>
  	<td><span class="notranslate">"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</span></td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Düzeltme</strong></td>
  	<td>İyi bir uygulama olarak kullanımdan kaldırılan özniteliği kaldırın.</td>
  </tr>
</table>

Bu uyarı, AMP dokümanında önceden geçerli olan bir AMP özniteliği bulunduğunda ortaya çıkar.
Bu yalnızca bir uyarıdır: Uyarılar içeren AMP dokümanlarının geçerliliği devam eder.

[AMP doğrulayıcı spesifikasyonunda](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) `deprecation` terimini arayarak her bir AMP etiketi için kullanımdan kaldırılan öznitelikleri tanımlayın.
