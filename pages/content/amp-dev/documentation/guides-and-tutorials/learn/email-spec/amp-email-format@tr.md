---
'$title': E-Posta Biçimi için AMP
$order: 1
formats:
  - email
teaser:
  text: 'Gerekli işaretleme '
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

AMP, mobil istemcilerde süper hızlı web sayfaları geliştirmek için bilinen bir teknolojidir. AMP, performans ve güvenliğe daha fazla odaklanarak işlevselliği kolayca sağlayan JavaScript tarafından desteklenen bir dizi HTML etiketidir. Resim döngüsü, duyarlı form öğelerine, uzak uç noktalardan taze içerik almaya kadar her şey için [AMP bileşenleri](https://amp.dev/documentation/components/) vardır.

E-posta için AMP biçimi, e-posta mesajlarında kullanabileceğiniz [AMP bileşenlerinin bir alt kümesini](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md) sağlar. AMP e-postalarının alıcıları, doğrudan e-postada AMP bileşenlerini görüntüleyebilir ve bunlarla etkileşim kurabilir.

## Gerekli işaretleme

Aşağıdaki kod, geçerli bir AMP e-posta mesajı oluşturan en az biçimlendirme miktarını temsil eder:

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

Bir AMP e-posta mesajı GEREKLİDİR

- <a name="dctp"></a>`<!doctype html>` doctype ile başlayın. [🔗](#dctp)
- <a name="ampd"></a>üst düzey bir `<html ⚡4email>` etiketi içerir (`<html amp4email>` de kabul edilir). [🔗](#ampd)
- <a name="crps"></a>`<head>` ve `<body>` etiketlerini içerir (Bunlar HTML'de isteğe bağlıdır). [🔗](#crps)
- <a name="chrs"></a>head etiketinin ilk alt öğesi olarak bir `<meta charset="utf-8">` etiketi içerir. [🔗](#chrs)
- <a name="scrpt"></a>head etiketinin ilk alt öğesi olarak bir `<script async src="https://ampjs.org/v0.js"></script>` etiketi içerir. [🔗](#scrpt)
- <a name="boilerplate"></a>içeriği AMP JS yüklenene kadar ilk başta gizlemek için head etiketinin içinde amp4email standart metni (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) içerir. [🔗](#boilerplate)

AMPHTML işaretlemesinin tamamı 200.000 baytı aşmamalıdır.

## Yapı ve işleme <a name="structure-and-rendering"></a>

E-posta için AMP, [RFC 1521, bölüm 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3)'te tanımlandığı gibi standart `multipart/alternative` [MIME](https://en.wikipedia.org/wiki/MIME) alt türüne dayanır.

_Daha fazla bilgi için bkz. [AMP e-postalarının yapısı ve işlenmesi](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md)._

## Desteklenen AMP bileşenleri <a name="supported-amp-components"></a>

_[E-posta Desteklenen Bileşenler için AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md) bakın._

## HTML gereksinimleri <a name="html-requirements"></a>

_[E-posta için AMP'de desteklenen HTML](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-html.md) bakın._

## CSS gereksinimleri <a name="css-requirements"></a>

### Desteklenen seçiciler ve özellikler <a name="supported-selectors-and-properties"></a>

_[E-posta için AMP'de desteklenen CSS](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-css.md) bakın._

### AMP belgesinde CSS belirtme <a name="specifying-css-in-an-amp-document"></a>

Herhangi bir AMP belgesindeki tüm CSS, başlık içindeki `<style amp-custom>` etiketine veya satır içi `style` özniteliklerine dahil edilmelidir.

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

Not: `<style>` etiketinin tamamı 50.000 baytı aşamaz. Doğrulayıcı bunu kontrol edecektir.

## Belge boyutları <a name="document-dimensions"></a>

- **Optimum genişlik**: 800px veya daha az (daha geniş herhangi bir içerik ve bazı istemcilerde beklenmedik bir şekilde kesilebilir).

- **Yükseklik**: değişken, istemci kullanıcının içeriği kaydırmasına için izin verir.

## Doğrulama <a name="validation"></a>

E-posta mesajlarınızın E-posta AMP biçimi için katı kriterleri karşıladığından emin olmak için AMP'nin mevcut doğrulama araçlarını kullanabilirsiniz.

Daha fazla bilgi için [AMP E-postası Doğrulama](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/) bakın.

## Gizlilik ve Güvenlik <a name="privacy-and-security"></a>

### E-posta açılışlarını ve etkileşimlerini izleme <a name="tracking-email-opens-and-interaction"></a>

AMPHTML, normal HTML e-postalarıyla aynı piksel izleme teknikleriyle e-postaların açılmasını izlemenizi sağlar. Dış hizmetlerden gelen veriler için kullanıcı tarafından başlatılan tüm istekler, kullanıcının mesajla etkileşimde bulunduğunu da gösterir. E-posta istemcileri, kullanıcılarına uzak görüntülerin ve diğer harici isteklerin yüklenmesini devre dışı bırakma olanağı sunabilir.

### AMP'ye özgü analitikler <a name="amp-specific-analytics"></a>

Aşağıdaki AMP'ye özgü analitik teknikler desteklenmez:

- [AMP `CLIENT_ID</a>`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [AMP Değişken Değiştirme](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Bileşene özgü hususlar <a name="component-specific-considerations"></a>

[`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) veya [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) içindeki resim istekleri, gönderene kullanıcının mesajla etkileşimde bulunduğunu gösterebilir.

[`<amp-form>`](https://amp.dev/documentation/components/amp-form)'deki yönlendirmelere çalışma zamanında izin verilmez.

## Geri Bildirim ve Destek <a name="feedback--support"></a>

E-posta için AMP ile ilgili destek ve geri bildirim için lütfen aşağıdaki kanalı kullanın: [ongoing-participation](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#ongoing-participation)
