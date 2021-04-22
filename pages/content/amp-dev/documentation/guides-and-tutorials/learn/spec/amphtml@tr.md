---
'$title': AMP HTML Teknik Özellikleri
$order: 8
formats:
  - websites
teaser:
  text: AMP HTML, belirli temel performans özelliklerini garanti edecek şekilde haber makaleleri gibi içerik sayfaları yazmayı sağlayan bir HTML alt kümesidir.
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/amp-html-format.md.
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

AMP HTML, belirli temel performans özelliklerini garanti edecek şekilde haber makaleleri gibi içerik sayfaları yazmayı sağlayan bir HTML alt kümesidir.

HTML'nin bir alt kümesi olarak, HTML aracılığıyla kullanılabilen tüm etiketlere ve işlevlere bazı kısıtlamalar getirir, ancak yeni işleme motorlarının geliştirilmesini gerektirmez: var olan kullanıcı aracıları, AMP HTML'yi tıpkı diğer tüm HTML'ler oluşturabilir.

[tip type="read-on"] Öncelikli olarak AMP'de nelere izin verildiği ve neyin yasak olduğu ile ilgileniyorsanız, [AMP sınırlamaları hakkındaki ana videomuzu](https://www.youtube.com/watch?v=Gv8A4CktajQ) izleyin. [/tip]

Ayrıca, AMP HTML belgeleri bir web sunucusuna yüklenebilir ve diğer herhangi bir HTML belgesi gibi sunulabilir; sunucu için özel bir konfigürasyona gerek yoktur. Bununla birlikte, bu belgeler isteğe bağlı olarak AMP belgelerine proxy sağlayan özel AMP sunum sistemleri aracılığıyla sunulacak şekilde tasarlanmıştır. Bu sistemler belgeleri kendi kök dizinlerinden sunar ve ek performans faydaları sağlayan belge dönüştürmeleri uygulamalarına izin verilir. Böyle bir sunum sisteminin yapabileceği optimizasyonların tam kapsamlı olmayan listesi aşağıda sunulmuştur:

- Görüntü referanslarını, izleyicinin görüntü alanına göre boyutlandırılmış görüntülerle değiştirme.
- Ekranın üst kısmında görünen satır içi görüntüler.
- Satır içi CSS değişkenleri.
- Genişletilmiş bileşenleri önceden yükleme.
- HTML ve CSS'yi küçültme.

AMP HTML, bir AMP HTML belgesinde bulunabilecek görüntü galerileri gibi gelişmiş işlevleri uygulamak için katkı olarak eklenmiş ancak merkezi olarak yönetilen ve barındırılan bir dizi özel öğe kullanır. Bu öğe dizisi, belgenin özel CSS kullanılarak stilize edilmesine izin verirken, belgenin performans hedeflerine ulaşması için özel öğeler aracılığıyla sağlananın ötesinde yazar tarafından oluşturulmuş JavaScript'e izin vermez.

İçerik üreticileri AMP biçimini kullanarak AMP dosyalarındaki içeriği taranmaya (robots.txt kısıtlamalarına tabi olara), önbelleğe alınmaya ve üçüncü taraflarca görüntülenmeye uygun hale getiriyor.

## Performans <a name="performance"></a>

Tahmin edilebilir performans, AMP HTML için temel bir tasarım hedefidir. Öncelikle, bir sayfanın içeriğinin kullanıcı tarafından tüketilmesine / kullanılmasına kadar geçen süreyi azaltmayı hedefliyoruz. Somut bir ifadeyle bu şu anlama geliyor:

- Belgenin işlenmesi ve tam olarak düzenlenmesi için gerekli HTTP istekleri en aza indirilmelidir.
- Resimler veya reklamlar gibi kaynaklar, yalnızca kullanıcı tarafından görülme olasılığı yüksekse indirilmelidir.
- Tarayıcılar, ilgili kaynağı getirmeden sayfadaki her kaynak için ihtiyaç duyulan alanı hesaplayabilmelidir.

## AMP HTML biçimi <a name="the-amp-html-format"></a>

### Örnek belge <a name="sample-document"></a>

[sourcecode:html]

<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <style amp-custom>
      h1 {
        color: red;
      }
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Article headline",
        "image": ["thumbnail1.jpg"],
        "datePublished": "2015-02-05T08:00:00+08:00"
      }
    </script>
    <script
      async
      custom-element="amp-carousel"
      src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-ad"
      src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
    ></script>
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>
      Some text
      <amp-img src="sample.jpg" width="300" height="300"></amp-img>
    </p>
    <amp-ad
      width="300"
      height="250"
      type="a9"
      data-aax_size="300x250"
      data-aax_pubname="test123"
      data-aax_src="302"
    >
    </amp-ad>
  </body>
</html>
[/sourcecode]

### Gerekli işaretleme <a name="required-markup"></a>

AMP HTML belgelerinde şunlar ZORUNLUDUR:

- <a name="dctp"></a>`<!doctype html>` belge türü ile başlamak. [🔗](#dctp)
- <a name="ampd"></a> üst düzey bir `<html ⚡>` etiketi içermek ( `<html amp>` de kabul edilir). [🔗](#ampd)
- <a name="crps"></a> `<head>` ve `<body>` etiketleri içermek (bunlar HTML'de isteğe bağlıdır). [🔗](#crps)
- <a name="canon"></a> AMP HTML belgesinin normal HTML sürümüne veya böyle bir HTML sürümü yoksa kendi kendisine işaret eden bir `<link rel="canonical" href="$SOME_URL">` etiketi başlık (head) bölümünde içermek. [🔗](#canon)
- <a name="chrs"></a>başlık (head) etiketinin ilk alt öğesi olarak bir `<meta charset="utf-8">` etiketi içermek. [🔗](#chrs)
- <a name="vprt"></a> head (başlık) etiketlerinin içinde bir `<meta name="viewport" content="width=device-width">` etiketi içermek. Ayrıca `minimum-scale=1` ve `initial-scale=1` dahil edilmesi önerilir. [🔗](#vprt)
- <a name="scrpt"></a> head (başlık) etiketlerinin içinde bir `<script async src="https://cdn.ampproject.org/v0.js"></script>` etiketi içermek. [🔗](#scrpt)
- <a name="boilerplate"></a> head (başlık) etiketinde [AMP ortak metin kodunu](https://github.com/ampproject/amphtml/blob/main/spec/amp-boilerplate.md) ( `head > style[amp-boilerplate]` ve `noscript > style[amp-boilerplate]` ) içermek. [🔗](#boilerplate)

### Meta veriler <a name="metadata"></a>

AMP HTML belgelerinin standartlaştırılmış meta verilerle açıklanması önerilir: <a class="" href="http://ogp.me/">Açık Grafik Protokolü</a>, <a class="" href="https://dev.twitter.com/cards/overview">Twitter Cards</a> vb.

Ayrıca, AMP HTML belgelerinin [schema.org/CreativeWork](https://schema.org/CreativeWork) veya [schema.org/NewsArticle](https://schema.org/NewsArticle) veya [schema.org/BlogPosting](https://schema.org/BlogPosting) gibi daha spesifik türlerinden herhangi biriyle işaretlenmesini öneririz.

### HTML Etiketleri <a name="html-tags"></a>

HTML etiketleri, AMP HTML'de değiştirilmeden kullanılabilir. Bazı etiketlerin özel eşdeğer etiketleri varken ( `<img>` ve `<amp-img>` gibi) bazı etiketler tamamen yasaktır:

<table>
  <tr>
    <th width="30%">Etiket</th>
    <th>AMP HTML'deki durum</th>
  </tr>
  <tr>
    <td width="30%">script</td>
    <td>Tür <code>application/ld+json</code> , <code>application/json</code> veya <code>text/plain</code> olmadığı sürece yasaktır. (Gerektiğinde diğer yürütülebilir olmayan değerler eklenebilir.) Genişletilmiş bileşenleri yüklemek için AMP çalışma zamanını ve komut dosyası etiketlerini yüklemek için zorunlu komut dosyası etiketi bir istisnadır.</td>
  </tr>
  <tr>
    <td width="30%">noscript</td>
    <td>İzin verilir. Belgenin herhangi bir yerinde kullanılabilir. Belirtilirse, JavaScript kullanıcı tarafından devre dışı bırakılmışsa <code>&lt;noscript></code> öğesinin içindeki içerik görüntülenir.</td>
  </tr>
  <tr>
    <td width="30%">base</td>
    <td>Yasaktır.</td>
  </tr>
  <tr>
    <td width="30%">img</td>
    <td>
<code>amp-img</code> ile değiştirilir.<br>         Lütfen unutmayın: <code>&lt;img></code>, <a href="https://www.w3.org/TR/html5/syntax.html#void-elements">HTML5'e göre bir Boş Öğedir</a>, bu yüzden bir kapama etiketi yoktur. Ancak,<code>&lt;amp-img></code> bir kapatma etiketine sahiptir <code>&lt;/amp-img></code>.</td>
  </tr>
    <tr>
    <td width="30%">picture</td>
    <td>Yasaktır. <a href="https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders?format=websites">fallback</a> özniteliğini kullanarak farklı resim biçimleri sunun ya da <a href="https://amp.dev/documentation/components/amp-img#attributes"><code>&lt;amp-img></code> üzerinde çoklu <code>srcset</code></a> ekleyin.</td>
  </tr>
  <tr>
    <td width="30%">video</td>
    <td>
<code>amp-video</code> ile değiştirildi.</td>
  </tr>
  <tr>
    <td width="30%">audio</td>
    <td>
<code>amp-audio</code> ile değiştirildi.</td>
  </tr>
  <tr>
    <td width="30%">iframe</td>
    <td>
<code>amp-iframe</code> ile değiştirildi.</td>
  </tr>
    <tr>
    <td width="30%">frame</td>
    <td>Yasaktır.</td>
  </tr>
  <tr>
    <td width="30%">frameset</td>
    <td>Yasaktır.</td>
  </tr>
  <tr>
    <td width="30%">object</td>
    <td>Yasaktır.</td>
  </tr>
  <tr>
    <td width="30%">param</td>
    <td>Yasaktır.</td>
  </tr>
  <tr>
    <td width="30%">applet</td>
    <td>Yasaktır.</td>
  </tr>
  <tr>
    <td width="30%">embed</td>
    <td>Yasaktır.</td>
  </tr>
  <tr>
    <td width="30%">form</td>
    <td>İzin verilir. <a href="https://amp.dev/documentation/components/amp-form">amp-form</a> uzantısının dahil edilmesi gerekir.</td>
  </tr>
  <tr>
    <td width="30%">giriş öğeleri</td>
    <td>Çoğunlukla izin verilir, ancak <a href="https://amp.dev/documentation/components/amp-form#inputs-and-fields">bazı giriş türlerinde istisnalar vardır</a>, yani <code>&lt;input type="button"></code>, <code>&lt;button type="image"></code> geçersizdir. İlgili bazı etiketlere de izin verilir: <code>&lt;fieldset></code>, <code>&lt;label></code>
</td>
  </tr>
  <tr>
    <td width="30%">button</td>
    <td>İzin verilir.</td>
  </tr>
  <tr>
    <td width="30%"><code><a name="cust"></a>style</code></td>
    <td>
<a href="#boilerplate">amp-boilerplate için gerekli stil etiketi</a> . Özel stil oluşturmak amacıyla başlık (head) etiketinde ek bir stil etiketine izin verilir. Bu stil etiketi, <code>amp-custom</code> özniteliğine sahip olmalıdır. <a href="#cust">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">link</td>
    <td>
<a>microformats.org'da</a> kayıtlı <code>rel</code> değerlerine izin verilir. Beyaz listemizde bir <code>rel</code> değeri eksikse, <a href="https://github.com/ampproject/amphtml/issues/new">lütfen bir sorun konusu gönderin</a> . <code>stylesheet</code> ve tarayıcıda yan etkileri olan <code>preconnect</code> , <code>prerender</code> ve <code>prefetch</code> gibi diğer değerlere izin verilmez. Beyaz listedeki yazı tipi sağlayıcılarından stil sayfalarını getirmek için özel bir durum eklenmiştir.</td>
  </tr>
  <tr>
    <td width="30%">meta</td>
    <td>
<code>http-equiv</code> özniteliği, izin verilen belirli değerler için kullanılabilir; ayrıntılar için <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">AMP doğrulayıcı teknik özelliklerine</a> bakın.</td>
  </tr>
  <tr>
    <td width="30%"><code><a name="ancr"></a>a</code></td>
    <td>
<code>href</code> öznitelik değeri <code>javascript:</code> ile başlamamalıdır. Ayarlandığı takdirde, <code>target</code> öznitelik değeri <code>_blank</code> olmalıdır. Aksi halde izin verilir. <a href="#ancr">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">svg</td>
    <td>Çoğu SVG öğesine izin verilir.</td>
  </tr>
</table>

Doğrulayıcı uygulamaları, yukarıdaki etiketler kaldırılarak HTML5 teknik özelliklerine dayalı bir beyaz liste kullanmalıdır. [AMP Etiketi Eki'ne](https://github.com/ampproject/amphtml/blob/main/spec/amp-tag-addendum.md) bakın.

### Yorumlar <a name="comments"></a>

Koşullu HTML yorumlarına izin verilmez.

### HTML öznitellikleri <a name="html-attributes"></a>

`on` ile başlayan öznitelik isimlerine (örneğin `onclick` veya `onmouseover`) AMP HTML'de izin verilmez. Tek başına `on` isimli özniteliğe (hiçbir sonek olmadan) izin verilir.

xmlns, xml:lang, xml:base ve xml:space gibi XML ile ilgili özniteliklere AMP HTML'de izin verilmez.

AMP HTML'de `i-amp-` ön ekine sahip dahili AMP özniteliklerine izin verilmez.

### Sınıflar <a name="classes"></a>

AMP HTML'de `-amp-` ve `i-amp-` ön ekine sahip dahili AMP sınıf adlarına izin verilmez.

<code>amp-</code> ön ekine sahip sınıf adlarının anlamı için <a class="" href="https://github.com/ampproject/amphtml/blob/main/spec/amp-css-classes.md">AMP belgelerine</a> bakın. Bu sınıfların kullanımına izin verilir ve AMP çalışma zamanı ve uzantılarının bazı özelliklerinin özelleştirilmesine izin verilmesi amaçlanır.

AMP HTML işaretlemesinde diğer tüm özel olarak oluşturulmuş sınıf adlarına izin verilir.

### Kimlikler <a name="ids"></a>

AMP HTML'de `-amp-` ve `i-amp-` ön ekli kimlikler gibi, dahili AMP kimlikleriyle çakışabilecek belirli kimlik adlarına izin verilmez.

`amp-access` gibi uzantıların sunduğu özelliklerle çakışmayı önlemek için `amp-` ve `AMP` kimliklerini kullanmadan önce bu uzantılara dair AMP belgelerine göz atın.

<a class="" href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">Burada</a> <code>mandatory-id-attr</code> araması yaparakizin verilmeyen kimlik adlarının tam listesini görüntüleyin.

### Bağlantılar <a></a>

`javascript:` şemaya izin verilmez.

### Stil sayfaları <a name="stylesheets"></a>

Büyük semantik etiketler ve AMP özel öğeleri, duyarlı bir belge oluşturmayı makul ölçüde kolaylaştırmak için varsayılan stillerle birlikte gelir. Varsayılan stilleri devre dışı bırakma seçeneği gelecekte eklenebilir.

#### @ kuralları <a name="-rules"></a>

Aşağıdaki @ kurallarına stil sayfalarında izin verilir:

`@font-face`, `@keyframes`, `@media`, `@page`, `@supports`.

`@import` öğesine izin verilmez. Gelecekte diğerleri eklenebilir.

#### Yazar stil sayfaları <a name="author-stylesheets"></a>

Yazarlar, belgenin başlığında veya satır içi stillerde tek bir `<style amp-custom>` etiketi kullanarak bir belgeye özel stiller ekleyebilir.

`@keyframes` kurallarına `<style amp-custom>` içinde izin verilir. Ancak, sayıları fazlaysa, bunların AMP belgesinin sonunda yer alması gereken ek `<style amp-keyframes>` etiketine yerleştirilmesi önerilir. Ayrıntılar için bu belgenin [Ana Kareler stil sayfası](#keyframes-stylesheet) bölümüne bakın.

#### Seçiciler <a name="selectors"></a>

Yazar tarafından oluşturulan stil sayfalarındaki seçiciler için aşağıdaki kısıtlamalar geçerlidir:

##### Sınıf ve etiket adları <a name="class-and-tag-names"></a>

Yazar tarafından oluşturulan stil sayfalarındaki sınıf adları, kimlikler, etiket adları ve öznitelikler `-amp-` ve `i-amp-` dizesiyle başlayamaz. Bunlar, AMP çalışma zamanı tarafından dahili kullanım için ayrılmıştır. Buna göre, kullanıcının stil sayfası `-amp-` sınıfları, `i-amp-` kimlikleri ve `i-amp-` etiketleri için CSS seçicilere ve özniteliklere başvuramaz. Bu sınıflar, kimlikler ve etiket/öznitelik adlarının yazarlar tarafından özelleştirilmesi amaçlanmamıştır. Ancak yazarlar, `amp-` sınıflarının stillerini ve bu bileşenlerin teknik şartları tarafından açıkça yasaklanmayan tüm CSS özellikleri için etiketlerini geçersiz kılabilir.

Özellik seçicilerin sınıf adı sınırlamalarını aşmak üzere kullanılmasını önlemek için CSS seçicilerinin `-amp-` ve `i-amp-` ile başlayan belirteçler ve dizeler içermesine genellikle izin verilmez.

#### Önemli <a name="important"></a>

`!important` niteleyicisinin kullanımına izin verilmez. Bu, AMP'nin öğe boyutlandırma değişmezlerini uygulamasını sağlamak için zorunlu bir gerekliliktir.

#### Özellikler <a name="properties"></a>

AMP yalnızca genel tarayıcılarda GPU ile hızlandırılabilen özelliklerin geçişlerine ve animasyonlarına izin verir. Şu anda aşağıdakileri beyaz listeye alıyoruz: `opacity`, `transform` (ayrıca `-vendorPrefix-transform`).

Aşağıdaki örneklerde `<property>` yukarıdaki beyaz listede yer almalıdır.

- `transition <property>` (ayrıca -vendorPrefix-transition)
- `@keyframes name { from: {<property>: value} to {<property: value>} }` (ayrıca `@-vendorPrefix-keyframes`)

#### En büyük boyut <a name="maximum-size"></a>

Yazar stil sayfası veya satır içi stillerin birlikte 75.000 bayttan büyük olması bir doğrulama hatasıdır.

### Ana kareler stil sayfası <a name="keyframes-stylesheet"></a>

Yazarlar, `<style amp-custom>` etiketine ek olarak, özellikle ana kare animasyonları için izin verilen `<style amp-keyframes>` etiketini de ekleyebilir.

`<style amp-keyframes>` etiketi için aşağıdaki kısıtlamalar geçerlidir:

1. Yalnızca belgenin `<body>` öğesinin son alt öğesi olarak yerleştirilebilir.
2. Yalnızca `@keyframes` , `@media` , `@supports` kuralları ve bunların kombinasyonunu içerebilir.
3. 500.000 bayttan büyük olamaz.

`<style amp-keyframes>` etiketinin var olmasının nedeni, animasyon karesi kurallarının orta derecede karmaşık animasyonlar için bile genellikle hantal olmasıdır, ki bu da yavaş CSS ayrıştırmasına ve ilk içerikli boyamaya neden olur. Ancak bu tür kurallar genellikle `<style amp-custom>` üzerinde uygulanan boyut sınırını aşar. Bu tür animasyon karesi bildirimlerini `<style amp-keyframes>` içinde belgenin altına koymak, boyut sınırlamalarını aşmalarına olanak tanır. Ve bunu yapmak, ana kareler sayfa oluşturmayı engellemediğinden, bunları ayrıştırmak için ilk içerikli boyamanın engellenmesini de önler.

Örnek:

[sourcecode:html]

<style amp-keyframes>
@keyframes anim1 {}

@media (min-width: 600px) {
  @keyframes anim1 {}
}
</style>
</body>
[/sourcecode]

### Özel yazı tipleri <a name="custom-fonts"></a>

Yazarlar, özel yazı tipleri için stil sayfaları ekleyebilir. Desteklenen 2 yöntem, beyaz listedeki yazı tipi sağlayıcılarına bağlantı veren link etiketleri ve `@font-face` ekleme işlemedir.

Örnek:

[sourcecode:html]

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Tangerine"
/>
[/sourcecode]

Yazı tipi sağlayıcıları, yalnızca CSS entegrasyonlarını destekliyorsa ve HTTPS üzerinden hizmet veriyorsa beyaz listeye alınabilir. Aşağıdaki kaynaklara şu anda bağlantı etiketleri aracılığıyla yazı tipi sunulmasına izin verilmektedir:

- Fonts.com: `https://fast.fonts.net`
- Google Fonts: `https://fonts.googleapis.com`
- Font Awesome: `https://maxcdn.bootstrapcdn.com, https://use.fontawesome.com`
- [Typekit](https://helpx.adobe.com/typekit/using/google-amp.html): `https://use.typekit.net/kitId.css` (`kitId` öğesini uygun şekilde değiştirin)

UYGULAYICILAR NOT: Bu listeye ekleme yapmak, AMP Önbelleği CSP kuralında bir değişiklik gerektirir.

Yazarlar, kendi özel CSS'leri yoluyla bir <code>@font-face</code> CSS talimatı aracılığıyla tüm özel yazı tiplerini eklemekte özgürdür. <code>@font-face</code> aracılığıyla eklenen yazı tipleri, HTTP veya HTTPS şeması aracılığıyla getirilmelidir.

## AMP çalışma zamanı <a name="amp-runtime"></a>

AMP çalışma zamanı, her AMP belgesinin içinde çalışan bir JavaScript parçasıdır. AMP özel öğeleri için uygulamalar sağlar, kaynak yüklemesini ve önceliklendirmeyi yönetir ve isteğe bağlı olarak geliştirme sırasında kullanılmak üzere AMP HTML için bir çalışma zamanı doğrulayıcısı içerir.

AMP çalışma zamanı, AMP belgesi `<head>` etiketindeki zorunlu `<script src="https://cdn.ampproject.org/v0.js"></script>` etiketi aracılığıyla yüklenir.

AMP çalışma zamanı, herhangi bir sayfa için bir geliştirme moduna yerleştirilebilir. Geliştirme modu, gömülü sayfada AMP doğrulamasını tetikler ve bu işlem, doğrulama durumunu ve JavaScript geliştirici konsoluna yönelik tüm hataları gösterir. Geliştirme modu, sayfanın URL'sine `#development=1` eklenerek tetiklenebilir.

## Kaynaklar <a name="resources"></a>

Resimler, videolar, ses dosyaları veya reklamlar gibi kaynaklar, `<amp-img>` gibi özel öğeler aracılığıyla bir AMP HTML dosyasına eklenmelidir. Bunlara "yönetilen kaynaklar" diyoruz çünkü bunların yüklenip yüklenmeyeceğine ve kullanıcıya ne zaman görüntüleneceğine AMP çalışma zamanı tarafından karar verilir.

AMP çalışma zamanının yükleme davranışına ilişkin belirli bir garanti yoktur, ancak genellikle kaynakları yeterince hızlı yüklemeye çalışmalıdır, kullanıcı mümkünse bunları görmek istediği zaman, yüklenmiş olmalıdırlar. Çalışma zamanı, şu anda görünüm alanında bulunan kaynaklara öncelik vermeli ve görünüm alanındaki değişiklikleri tahmin etmeye ve kaynakları buna göre önceden yüklemeye çalışmalıdır.

AMP çalışma zamanı, herhangi bir zamanda, halihazırda görünüm alanında olmayan kaynakları kaldırmaya veya genel RAM tüketimini azaltmak için iframe'ler gibi kaynak kapsayıcılarını yeniden kullanmaya karar verebilir.

## AMP Bileşenleri <a name="amp-components"></a>

AMP HTML, `<img>` ve `<video>` gibi yerleşik kaynak yükleme etiketlerini değiştirmek ve resim lightbox'ları veya döngüler gibi karmaşık etkileşimli özellikleri uygulamak için "AMP bileşenleri" adı verilen özel öğeler kullanır.

Desteklenen bileşenlerle ilgili ayrıntılar için [AMP bileşen teknik özelliklerine](https://github.com/ampproject/amphtml/blob/main/spec/./amp-html-components.md) bakın.

Desteklenen 2 tür AMP bileşeni vardır:

1. Yerleşik
2. Genişletilmiş

Yerleşik bileşenler her zaman bir AMP belgesinde bulunur ve `<amp-img>` gibi özel bir öğeye sahiptir. Genişletilmiş bileşenler, belgeye açıkça dahil edilmelidir.

### Ortak öznitelikler <a name="common-attributes"></a>

#### `layout`, `width`, `height`, `media`, `placeholder`, `fallback` <a name="layout-width-height-media-placeholder-fallback"></a>

Bu öznitelikler bir öğenin yerleşimini tanımlar. Buradaki temel amaç, herhangi bir JavaScript veya uzak kaynak indirilmeden önce alanının uygun şekilde rezerve edilebilmesini ve öğenin görüntülenebilmesini sağlamaktır.

Yerleşim sistemi hakkında ayrıntılar için [AMP Yerleşim Sistemine](https://github.com/ampproject/amphtml/blob/main/spec/./amp-html-layout.md) göz atın.

#### `on` <a name="on"></a>

`on` özniteliği, öğelerde olay işleyicisi yüklemek için kullanılır. Desteklenen olaylar, öğelere bağlıdır.

Sözdiziminin değeri, formun etki alanına özgü basit bir dilidir:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

Örnek: `on="tap:fooId.showLightbox"`

`methodName` atlanırsa, varsayılan yöntem öğe için tanımlandığı takdirde çalıştırılır. Örnek: `on="tap:fooId"`

Belgelendikleri takdirde bazı eylemler argümanlar kabul edebilir. Bağımsız değişkenler, <code>key=value</code> gösteriminde parantezler arasında tanımlanır. Kabul edilen değerler şunlardır:

- basit tırnak işaretsiz dizeler: `simple-value`;
- tırnak işaretli dizeler: `"dize değeri"` veya `'dize değeri'`;
- boole değerleri: `true` veya `false`;
- sayılar: `11` veya `1.1` .

İki olayı noktalı virgülle ayırarak bir öğedeki birden çok olayı dinleyebilirsiniz `;`.

Örnek: `on="submit-success:lightbox1;submit-error:lightbox2"`

[AMP Eylemleri ve Olayları](https://github.com/ampproject/amphtml/blob/main/spec/./amp-actions-and-events.md) hakkında daha fazla bilgi edinin.

### Genişletilmiş bileşenler <a name="extended-components"></a>

Genişletilmiş bileşenler, AMP çalışma zamanıyla birlikte gönderilmesi gerekmeyen bileşenlerdir. Bunun yerine, belgeye açıkça dahil edilmelidirler.

Genişletilmiş bileşenler, aşağıdaki gibi belgenin başlığına bir `<script>` etiketi eklenerek yüklenirler:

[sourcecode:html]

<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>

[/sourcecode]

`<script>` etiketi bir `async` özniteliğine ve öğe adına referans veren `custom-element` özniteliğine sahip olmalıdır.

Çalışma zamanı uygulamaları, bu öğelere yer tutucular oluşturmak için adı kullanabilir.

Betik URL'si `https://cdn.ampproject.org` ile başlamalı ve çok sıkı bir `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js` örüntüsü izlemelidir.

##### URL <a name="url"></a>

Genişletilmiş bileşenlerin URL'si şu biçimdedir:

[sourcecode:http]
https://cdn.ampproject.org/$RUNTIME_VERSION/$ELEMENT_NAME-$ELEMENT_VERSION.js
[/sourcecode]

##### Sürüm oluşturma <a name="versioning"></a>

[AMP sürüm oluşturma politikasına](https://github.com/ampproject/amphtml/blob/main/spec/amp-versioning-policy.md) bakın.

### Şablonlar <a name="templates"></a>

Şablonlar, dile özgü şablona ve sağlanan JSON verilerine göre HTML içeriğini oluşturur.

Desteklenen şablonlarla ilgili ayrıntılar için [AMP şablon teknik özelliklerine](https://github.com/ampproject/amphtml/blob/main/spec/./amp-html-templates.md) bakın.

Şablonlar, AMP çalışma zamanıyla birlikte gönderilmez ve genişletilmiş öğelerde olduğu gibi indirilmeleri gerekir. Genişletilmiş bileşenler, aşağıdaki gibi belgenin başlığına bir `<script>` etiketi eklenerek yüklenir:

[sourcecode:html]

<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
></script>

[/sourcecode]

`<script>` etiketi bir `async` özniteliği içermeli ve şablon türüne referans veren bir `custom-template` özniteliğine sahip olmalıdır. Betik URL'si `https://cdn.ampproject.org` ile başlamalı ve çok sıkı `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js` örüntüsünü izlemelidir.

Şablonlar belgede şu şekilde bildirilir:

[sourcecode:html]
<template type="amp-mustache" id="template1">
Hello {% raw %}{{you}}{% endraw %}!
</template>
[/sourcecode]

`type` özniteliği gereklidir ve bildirilmiş bir `custom-template` betiğe referans vermelidir.

`id` özniteliği isteğe bağlıdır. Bağımsız AMP öğeleri kendi şablonlarını keşfeder. Tipik senaryolar, alt öğeleri arasında veya kimlik ile referans vererek `<template>` arayan bir AMP öğesini içerir.

Şablon öğesi içindeki sözdizimi, belirli bir şablon diline bağlıdır. Bununla birlikte, şablon dili AMP içinde kısıtlanabilir. Örneğin, "template" öğesine göre, tüm oluşturmaların geçerli, iyi biçimlendirilmiş bir DOM üzerinde olması gerekir. Tüm şablon çıktıları, AMP için geçerli çıktı oluşturulduğundan emin olmak için temizlenir.

Bir şablonun sözdizimi ve kısıtlamaları hakkında bilgi edinmek için [şablonun belgelerine](https://github.com/ampproject/amphtml/blob/main/spec/./amp-html-templates.md#templates) bakın.

##### URL <a name="url-1"></a>

Genişletilmiş bileşenlerin URL'si şu biçimdedir:

[sourcecode:http]
https://cdn.ampproject.org/$RUNTIME_VERSION/$TEMPLATE_TYPE-$TEMPLATE_VERSION.js
[/sourcecode]

##### Sürüm oluşturma <a name="versioning-1"></a>

Daha fazla ayrıntı için özel öğelerin sürümlerine bakın.

## Güvenlik <a name="security"></a>

AMP HTML belgeleri, `unsafe-inline` ve `unsafe-eval` anahtar kelimelerini içermeyen bir İçerik Güvenlik Politikası ile sunulduğunda hataları tetiklememelidir.

AMP HTML biçimi, her zaman böyle olacak şekilde tasarlanmıştır.

Tüm AMP şablon öğeleri, AMP havuzuna gönderilmeden önce AMP güvenlik incelemesinden geçmelidir.

## SVG <a name="svg"></a>

Şu anda aşağıdaki SVG öğelerine izin verilmektedir:

- temel öğeler: "g", "glyph", "glyphRef", "image", "marker", "metadata", "path", "solidcolor", "svg", "switch", "view"
- şekiller: "circle", "ellipse", "line", "polygon", "polyline", "rect"
- metin: "text", "textPath", "tref", "tspan"
- işleme: "clipPath", "filter", "hkern", "linearGradient", "mask", "pattern", "radialGradient", "vkern"
- özel: "defs" (üstteki tüm alt öğelere burada izin verilir), "symbol", "use"
- filtre: "feColorMatrix", "feComposite", "feGaussianBlur", "feMerge", "feMergeNode", "feOffset", "foreignObject"
- ARIA: "desc", "title"

Bu özniteliklerin yanı sıra:

- "xlink:href": yalnızca "#" ile başlayan URI'lara izin verilir
- "style"

## AMP belge keşfi <a name="amp-document-discovery"></a>

Aşağıda açıklanan mekanizma, standart bir belgenin AMP sürümünün var olup olmadığını yazılımın keşfetmesi için standartlaştırılmış bir yol sunar.

Standart bir belgenin alternatif bir temsili olan bir AMP belgesi mevcutsa, standart belge <a class="" href="http://microformats.org/wiki/existing-rel-values#HTML5_link_type_extensions">"amphtml" ilişkisine</a> sahip bir <code>link</code> etiketi aracılığıyla AMP belgesine referans vermelidir.

Örnek:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html" />
[/sourcecode]

AMP belgesinin kendisinin, "standart" ilişkiye sahip bir `link` etiketi aracılığıyla kendi standart belgesine geri referans vermesi beklenir.

Örnek:

[sourcecode:html]

<link
  rel="canonical"
  href="https://www.example.com/url/to/canonical/document.html"
/>
[/sourcecode]

(Tek bir kaynak aynı anda AMP _ve_ standart belge ise, standart ilişki kendi kendisine işaret etmelidir - "amphtml" ilişkisi gerekmez.)

AMP tüketen sistemlerle en geniş uyumluluk için, JavaScript'i çalıştırmadan "amphtml" ilişkisini okumanın mümkün olması gerektiğini unutmayın. (Diğer bir deyişle, etiket ham HTML'de bulunmalı ve JavaScript aracılığıyla enjekte edilmemelidir.)
