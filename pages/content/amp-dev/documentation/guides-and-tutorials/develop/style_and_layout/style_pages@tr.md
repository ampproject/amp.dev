---
$title: Desteklenen CSS
---

Tüm web sayfaları gibi AMP sayfalarının stili de CSS ile belirlenir, ancak ([özel yazı tipleri](#the-custom-fonts-exception) haricinde) harici stil sayfalarını referans alamazsınız.
Ayrıca, performans üzerindeki etkilerinden dolayı belirli stillere izin verilmez; satır içi stil özniteliklerine izin verilmemektedir.

Tüm stiller, dokümanın head bölümünde yer almalıdır (bkz. [Sayfaya stil ekleme](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)).
Ancak, içeriğinizi daha iyi yönetmek amacıyla statik sayfalar oluşturmak için CSS ön işlemcilerini ve şablonlarını kullanabilirsiniz.

**Not:** Duyarlı sayfaları yazmayı makul bir düzeyde kolaylaştırmak için AMP bileşenleri varsayılan stillerle birlikte gelir.
Bu stiller, [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css) içinde tanımlanır.

## CSS ön işlemcilerini kullanma <a name="using-css-preprocessors"></a>

Ön işlemcilerin oluşturduğu çıktı, diğer web sayfalarında olduğu gibi AMP'de sorunsuz bir şekilde çalışır.
Örneğin, [amp.dev](https://amp.dev/) sitesi [Sass](http://sass-lang.com/)'ı kullanır.
([amp.dev](https://amp.dev/) sitesini meydana getiren statik AMP sayfalarını oluşturmak için biz <a href="http://grow.io/"><span class="notranslate">Grow</span></a> kullanıyoruz.)

Ön işlemcileri kullanırken neleri eklediğinize ayrıca dikkat etmeniz gerekir; yalnızca sayfalarınızın kullandığı öğeleri ekleyin.
Örneğin, [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) kodu gerekli tüm AMP biçimlendirmesini ve `*.scss` kaynak dosyalarındaki satır içi CSS'yi içerir.
Diğerlerinin yanı sıra [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) için özel öğe komut dosyasını da içerir. Böylece, sitedeki birçok sayfaya yerleşik YouTube videoları eklenebilir.

[sourcecode:html] {% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

Yukarıdaki kodun biçimlendirilmiş AMP HTML'sine nasıl çevrildiğini görmek için [amp.dev](https://amp.dev/)'daki herhangi bir sayfanın kaynağını görüntüleyin.
(Chrome'da sağ tıklayın ve `Sayfa Kaynağını Görüntüle`'yi seçin.)

## İzin verilmeyen stiller

Aşağıdaki stillere AMP sayfalarında izin verilmez:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Yasaklanan stil</th>
      <th data-th="Description">Açıklama</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Satır içi stil öznitelikleri</td>
      <td data-th="Description">Tüm stiller sayfanın <code>&lt;head&gt;</code> öğesinde, bir <code>&lt;style amp-custom&gt;</code> etiketinin içinde tanımlanmalıdır.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code>önemli niteleyici </td>
      <td data-th="Description">Kullanımına izin verilmez.
      Bu, AMP'nin öğe boyutlandırma kurallarını uygulamasını sağlama açısından önemli bir gereksinimdir.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description"><a href="#özel-yazı-tipleri-istisnası">Özel yazı tipleri</a> istisnasıyla izin verilmez.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (evrensel seçici)</td>
      <td data-th="Description">Negatif performans etkileri vardır ve diğer seçici kısıtlamalarını aşmak için kullanılabilir.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Evrensel seçiciyi simüle etmek için kullanılabilir.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Sözde seçiciler, sözde sınıflar ve sözde öğeler</td>
      <td data-th="Description">Sözde seçicilere, sözde sınıflara ve sözde öğelere yalnızca <code>amp-</code> ile başlamayan etiket adları içeren seçicilerde izin verilir.
      Doğru kullanım örneği: <code>a:hover, div:last-of-type</code> Yanlış kullanım örneği: <code>amp-img:hover, amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>-amp-</code> sınıfı ve <code>i-amp-</code> etiket adları</td>
      <td data-th="Description">Yazar stil sayfalarındaki sınıf adları, <code>-amp-</code> dizesiyle başlayamaz. Bunlar, AMP çalışma zamanı tarafından dahili kullanım için ayrılmıştır. Kullanıcı stil sayfasının <code>-amp-</code> sınıflarına ve <code>i-amp</code> etiketlerine ilişkin CSS seçicilerini referans alamayacağı kuralına uyar.</td>
    </tr>
  </tbody>
</table>

## Beyaz listedeki geçiş ve animasyon özellikleri <a name="the-custom-fonts-exception"></a>

AMP yalnızca yaygın kullanılan tarayıcılarda GPU hızlandırmalı olabilecek geçiş ve animasyon özelliklerine izin verir.
AMP projesi şu anda `opacity`, `transform` ve `-vendorPrefix-transform` özelliklerini beyaz listeye almıştır.

Aşağıdaki örneklerde, `<property>` etiketinin beyaz listede olması gerekir:

- `transition <property> (Also -vendorPrefix-transition)`
- @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

`overflow` özelliğinin (ve `overflow-y`, `overflow-x`) stili <span class="notranslate">“auto”</span> veya <span class="notranslate">“scroll”</span> olarak belirlenemez.
AMP dokümanlarında hiçbir kullanıcı tanımlı öğenin kaydırma çubuğu olamaz.

## Özel yazı tipleri istisnası <a name="özel-yazı-tipleri-istisnası"></a>

AMP sayfaları harici stil sayfaları içeremez. Bunun tek istisnası özel yazı tipleridir.
Özel yazı tiplerine referansta bulunmak için desteklenen iki yöntem, beyaz listedeki yazı tipi sağlayıcılarını işaret eden bağlantı etiketlerini ve `@font-face` öğesini dahil etmektir.

Yazı tipi sağlayıcıları, yalnızca CSS entegrasyonlarını desteklediklerinde ve HTTPS üzerinde sunum yaptıklarında beyaz listeye eklenebilir. Şu anda yalnızca aşağıdaki kaynaklar beyaz listeye alınmıştır ve bağlantı etiketleri aracılığıyla yazı tipi sunumu için bu kaynaklara izin verilmektedir:

- [https://fast.fonts.net](https://fast.fonts.net)
- [https://fonts.googleapis.com](https://fonts.googleapis.com)

Beyaz listedeki Google Fonts yazı tipi sağlayıcısını işaret eden örnek bağlantı etiketi:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Alternatif olarak, [`@font-face`](https://developer.mozilla.org/tr/docs/Web/CSS/%40font-face) öğesini kullanabilirsiniz.
`@font-face` aracılığıyla dahil edilen yazı tipleri, HTTP veya HTTPS şeması aracılığıyla getirilmelidir.
