---
$title: Sayfanızı Bulunabilir Yapma
---

Bazı durumlarda, aynı sayfanın (örneğin, bir haber makalesinin) hem AMP olmayan hem de AMP sürümüne sahip olmak isteyebilirsiniz. Şunu düşünün: Google Arama, o sayfanın AMP olmayan sürümünü bulursa bunun bir AMP sürümünün olduğunu nasıl bilebilir?

### Sayfaları `<link>` ile bağlama

Bu sorunu çözmek için `<head>` bölümündeki `<link>` etiketlerini kullanarak AMP sayfasıyla ilgili bilgileri AMP olmayan sayfaya veya AMP olmayan sayfayla ilgili bilgileri AMP sayfasına ekleriz.

AMP olmayan sayfaya aşağıdakileri ekleyin:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Şimdi de bunu AMP sayfasına ekleyin:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### Yalnızca bir sayfa varsa ne olur?

Yalnızca bir sayfanız varsa ve bu sayfa bir AMP sayfasıysa yine de standart bağlantıyı sayfaya eklemeniz gerekir. Bu bağlantı, yine sayfanın kendisini işaret edecektir:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## Ek meta veriler aracılığıyla üçüncü taraf platformlarıyla entegrasyon <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Bazen bir üçüncü taraf sitesinin (AMP sayfanızı yerleştiren veya AMP sayfanızın bağlantılarını içeren), sayfanızın bir AMP sayfası olduğunu bilmek dışında sayfanızla ilgili daha fazla şeyi öğrenmesi gerekir. Platformlar, sayfanızla ilgili olarak "Haber makalesi mi?", "Video mu?" veya "Ekran görüntünüz ve kısa açıklamanız var mı?" gibi şeyleri sorabilir.

Bu sadece AMP sayfalarıyla değil, tüm web sayfalarıyla ilgilidir. Bazı platformlar için bu meta veriler ek olarak istenir, bazıları içinse zorunludur, yani **doğru meta verileri içermezseniz içeriğinizin bağlantılarını göstermezler**. İçeriğinizin görünmesini istediğiniz platformlar için doğru meta verileri içerdiğinizden emin olun.

### Çoğu arama motoru için Schema.org'u kullanma

[Schema.org](http://schema.org/), her türden içeriğe meta veri eklemek için açık sözlükler sunar. AMP örneğinde, bağlam dahilinde anlamlı olan özellikler belirli içerik türlerini (ör. "haber makalesi"), başlığı, yayınlandığı tarihi ve ilişkili önizleme resimlerini içerir.

Örnek:

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

HTML özniteliği alternatif sözdizimini de içeren daha fazla örneği [ampproject örnekleri klasöründe](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples) bulabilirsiniz.

Not: Bu Schema.org tanımı, içeriğinizin [Google Arama haber atlı karıncası (mobil cihazda deneyin)](https://g.co/ampdemo) tanıtımında görünmeye uygun hale getirilmesi için gereklidir.
Ayrıca, [AMP ile En Çok Okunan Haberler](https://developers.google.com/structured-data/carousels/top-stories) ve [Yapısal Veri Testi Aracı](https://developers.google.com/structured-data/testing-tool/) konularına da bakın.

### Daha da fazla platform için diğer meta veriler

Bulunması ve dağıtılması için içeriğinizi hazırlamanın diğer tüm yollarıyla ilgili bilgi edinmek üzere [Web'in Temelleri'ndeki Sosyal Keşif kılavuzu](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) sayfasına gidin.
