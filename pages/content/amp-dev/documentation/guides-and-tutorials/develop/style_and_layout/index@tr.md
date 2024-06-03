---
$title: Duyarlı AMP Sayfaları Oluşturma
---

AMP'de duyarlı öğeleri son derece kolay bir şekilde oluşturabilirsiniz. Bunun için öğelere `layout=responsive` kodunu eklemeniz yeterlidir.

## Duyarlı resimler oluşturma

Resimler de dahil olmak üzere harici olarak yüklenen tüm kaynakların belirli bir boyutunun ve konumunun olması gerekir. Böylece, kaynaklar yüklendikçe sayfa atlamaz ve yeniden düzenlenmez.

Duyarlı resimler oluşturmak için genişliği ve yüksekliği belirtin, düzeni duyarlı olarak ayarlayın ve [`srcset`](style_pages.md) ile değişen ekran boyutlarına göre kullanılacak resim öğesini belirtin:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Bu [`amp-img`](../../../../documentation/components/reference/amp-img.md) öğesi, kapsayıcı öğesinin genişliğine otomatik olarak sığar ve yüksekliği, belirtilen genişlik ve yüksekliğe göre belirlenen en boy oranına otomatik olarak ayarlanır:

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857" layout="responsive"></amp-img>

Ayrıca [Örneklerle AMP `amp-img`](../../../../documentation/components/reference/amp-img.md) konusuna bakabilirsiniz.

## Sayfaya stil ekleme

Tüm stilleri, dokümanın head bölümündeki `<style amp-custom>` etiketinin içine ekleyin.
Örneğin:

[sourcecode:html]

<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
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
    <script async src="https://cdn.ampproject.org/v0.js"></script>

  </head>
[/sourcecode]

**Önemli:** Sayfanızda yalnızca bir `<style amp-custom>` etiketinin bulunduğundan emin olun; AMP'de bu etiketin birden fazla kullanılmasına izin verilmez.

Ortak CSS özelliklerini kullanarak sınıf veya öğe seçicilerle bileşen stillerini tanımlayın. Örneğin:

[sourcecode:html]

<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**Önemli:** Stillerinizin AMP'de desteklendiğinden emin olun. Bazı stiller performans nedeniyle desteklenmemektedir (ayrıca bkz. [Desteklenen CSS](style_pages.md)).

## Boyut ve konum öğeleri

AMP, doküman düzenini kaynak yüklemesinden ayırır. Böylece AMP, kaynakların indirilmesini beklemeden sayfanın düzenini yükleyebilir.

Bir `width` ve `height` özniteliği sağlayarak tüm görünür AMP öğeleri için boyutu ve konumu belirtin.
Bu öznitelikler, öğenin en boy oranına işaret eder ve daha sonra, kapsayıcıyla ölçeklenebilir.

Düzeni duyarlı değerine ayarlayın.
Bu seçim, öğenin boyutunu kapsayıcı öğesinin genişliğine ayarlar ve yüksekliğini, otomatik olarak genişlik ve yükseklik öznitelikleri tarafından belirtilen en boy oranına göre yeniden boyutlandırır.

[AMP'de desteklenen düzenler](control_layout.md) hakkında daha fazla bilgi edinin.

## Stillerinizi ve düzeninizi doğrulama

Sayfanızın CSS ve düzen değerlerini test etmek için AMP doğrulayıcıyı kullanın.

Doğrulayıcı, sayfanızın CSS'sinin 50.000 bayt sınırını aşmadığını doğrular, izin verilmeyen stilleri kontrol eder ve sayfa düzeninin desteklenip doğru bir şekilde biçimlendirildiğinden emin olur.
Ayrıca buradaki [Stil ve düzen hatalarının](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md#stil-ve-düzen-hataları) tam listesine de bakabilirsiniz.

50.000 bayt sınırını aşan CSS'ye sahip sayfa için konsolda gösterilen hata örneği:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Stil hatalarının bulunup düzeltilmesi de dahil olmak üzere [AMP sayfalarınızı nasıl doğrulayacağınız](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) konusunda daha fazla bilgi edinin.
