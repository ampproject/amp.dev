---
$title: AMP HTML Sayfanızı Oluşturun
---

Aşağıdaki işaretleme uygun bir başlangıç noktası veya standart metindir.
Bunu kopyalayın veya .html uzantılı bir dosyaya kaydedin.

[sourcecode:html]
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Buraya kadarki gövde içeriği oldukça anlaşılırdır. Ancak sayfanın başında hemen anlaşılır olmayan birçok ek kod bulunmaktadır. İstenen işaretlemeyi yapılarına ayırıp analiz edelim.

## İstenen işaretleme

AMP HTML belgeleri şu özelliklere sahip olmalıdır:

  - Belge tipiyle `<!doctype html>` başlamalıdır.
  - Üst seviye bir `<html ⚡>` etiketi içermelidir (`<html amp>` de kabul edilir).
  - `<head>` ve `<body>` etiketleri içermelidir (HTML›de isteğe bağlıdır).
  - Başında AMP HTML belgesinin düzenli HTML sürümünü ya da böyle bir HTML versiyonu mevcut değilse kendisini gösteren bir `<link rel="canonical" href="$SOME_URL">` etiketi içerir.
  - Baş etiketin ilk ürünü olarak `<meta charset="utf-8">` etiketini içerir.
  - Baş etiketin içerisinde bir `<meta name="viewport" content="width=device-width">`1›in de eklenmesi önerilir.
  - Başında en son öge olarak`<script async src="https://cdn.ampproject.org/v0.js"></script>` etiketini içerir (Buna AMP JS kitaplığı da eklenip yüklenir).
  - `<head>` etiketinde aşağıdakileri içerir:
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## Opsiyonel meta-veri

Açık gerekliliklerin yanı sıra, verdiğimiz örnekte baştaki Schema.org tanımı da yer alır; bu AMP için katı bir gereklilik değildir, ancak içeriğinizin belli yerlere dağıtılması için, örneğin [Google Arama haberler karusel demosuna (telefonunuzda deneyin)](https://g.co/ampdemo) bir gerekliliktir.

Twitter vb. diğer çeşitli yerlerde ihtiyacını olan tüm meta-veriler hakkında daha fazla bilgi için, [örneklerimizi inceleyin](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples). Spesifik olarak Google Arama›daki AMP hakkında öğrenmek için, bkz. [En İyi AMP Hikayeleri](https://developers.google.com/structured-data/carousels/top-stories).

<hr>

İyi haber! İlk AMP sayfamızı oluşturmak için gerekli olan tek şey bu, fakat tabii ki gövdede devam eden daha birçok şey var. Bir sonraki bölümde görüntü, özel AMP ögeleri gibi temel unsurların nasıl ekleneceğini, sayfanızın nasıl biçimlendirileceğini ve nasıl etkileşimli bir düzen geliştirileceği üzerinde duracağız.
