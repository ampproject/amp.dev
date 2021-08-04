---
'$title': Sayfanızı keşfedilebilir hale getirme
$order: 3
description: Arama motorlarının normal HTML standart belgemiz ile AMP belgemiz arasındaki ilişkiyi anlaması için bu çift yönlü bağlantıyı kurmak gerekir.
---

Artık AMP'de bir haber makalesi hazırladığınıza göre, kullanıcıların içeriğinizi bulup keşfedebilmesini sağlayalım.

## AMP içeriğini bağlama

Web siteniz tamamen veya kısmen AMP sayfalarından oluşabilir veya hiç AMP sayfası içermez. Öğreticinin bu bölümü, AMP'yi web sitenizin yapısına nasıl dahil edeceğinizi ele alacaktır.

Normal HTML sayfalarında standart bağlantı, birden çok sayfa aynı içeriği içerdiğinde hangi sayfanın tercih edilen sayfa olarak kabul edilmesi gerektiğini bildirmek için kullanılan yaygın bir tekniktir.

Bir web sitesine AMP eklerken yaygın bir yaklaşım, geleneksel AMP olmayan HTML sayfalarının AMP sürümlerini oluşturmaktır. Her iki versiyon da genellikle aynı içeriğe sahiptir (örneğin bir makalenin metni) ancak farklı sunumlara sahip olabilir. Bu senaryoda, geleneksel HTML sayfalarını "standart" sayfalar olarak görmeli ve AMP sayfalarını bu HTML sayfalarıyla eşleştirmelisiniz.

Yapabiliyorsanız, sitenizi oluşturmak için AMP'yi diğer JavaScript kitaplıkları gibi kullanın ve standart bağlantıyı unutun. Bir web sitesinin tamamını oluşturmak için AMP kullanmak, bakım yükünüzü önemli ölçüde azaltır.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Linking AMP content') }}

Bu öğreticinin amaçları doğrultusunda, bir sayfanın AMP ve AMP olmayan sürümüne sahip olduğunuz duruma odaklanacağız. Bu öğreticide web sitemizde AMP olmayan bir HTML sayfasına (`article.html`) ve onun AMP sürümüne (`article.amp.html`) sahip bir haber makalesi kullanacağız. Bu sayfaları `link` aracılığıyla eşleştireceğiz.

AMP belgemizde bunu başarmak için ilk adımı, standart sayfaya geri dönmek için `<head>` bölümüne bir bağlantı etiketi ekleyerek atmıştık:

```html
<link rel="canonical" href="/article.html" />
```

Sonraki adım, standart makaleyi AMP sayfasına bağlamaktır. Bu, standart makalenin `<head>` bölümüne bir `<link rel="amphtml">` etiketi eklenerek yapılır.

`article.html` dosyasında, aşağıdaki kodu `<head>` bölümüne <strong>ekleyin</strong> :

```html
<link rel="amphtml" href="/article.amp.html" />
```

Aşağıdaki diyagram, bağlantı etiketlerinin yönlerini göstermektedir:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Linking AMP content') }}

Arama motorlarının normal HTML standart belgemiz ile AMP belgemiz arasındaki ilişkiyi anlaması için bu çift yönlü bağlantıyı kurmak gerekir. Bağlantı sağlanmadıysa, veri gezgini hangi makalelerin normal HTML belgelerinin "AMP sürümleri" olduğunu net olarak bilemez. Bu bağlantıları açıkça sağlayarak belirsizlik olmamasını sağlıyoruz!

## Yapılandırılmış veri ekleme

Geçerli AMP sayfaları, [schema.org](http://schema.org/) sitesine göre yapılandırılmış verileri gerektirmez, ancak Google Arama gibi bazı platformlar, En çok okunan haberler döngüsü gibi belirli deneyimler için bunu gerekli kılar. Yapılandırılmış verileri eklemek genellikle iyi bir fikirdir. Yapılandırılmış veriler, arama motorlarının web sayfanızı daha iyi anlamasına ve içeriğinizi Arama Motoru Sonuç Sayfalarında (örneğin, zengin kod parçacıklarında) daha iyi görüntülemesine yardımcı olur. Yapılandırılmış veriler, bir `application/ld+json` türü betik etiketi aracılığıyla AMP sayfanızın `<head>` etiketine dahil edilir.

Haber makalemiz için AMP belgesinin `<head>` bölümünün altına aşağıdaki yapılandırılmış verileri **ekleyin**:

```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://example.com/my-article.html"
    },
    "headline": "My First AMP Article",
    "image": {
      "@type": "ImageObject",
      "url": "https://example.com/article_thumbnail1.jpg",
      "height": 800,
      "width": 800
    },
    "datePublished": "2015-02-05T08:00:00+08:00",
    "dateModified": "2015-02-05T09:20:00+08:00",
    "author": {
      "@type": "Person",
      "name": "John Doe"
    },
    "publisher": {
      "@type": "Organization",
      "name": "⚡ AMP Times",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/amptimes_logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "description": "My first experience in an AMPlified world"
  }
</script>
```

[tip type="note"] **NOT -** İçerik her zaman aynı olmalıdır. Haber makaleleri için "NewsArticle" türünü belirtin. Başlık, makalenizin başlığıyla eşleşmelidir. Görüntü nesnesi, makalenin başlık görüntüsünü ifade eder. [/tip]

Sayfayı tarayıcınızda **yeniden yükleyin** ve hiçbir AMP Doğrulama hatası yapılmadığını doğrulayın.

[tip type="note"] Schema.org sitesiyle yapılandırılmış veri biçimine ek olarak, arama motorları ve sosyal medya ağları tarafından desteklenen başka biçimler de vardır. Desteklenen belgelere bakın:

- [Twitter Cards meta etiketleri](https://dev.twitter.com/cards/overview)
- [Facebook Open Graph meta etiketleri](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### Yapılandırılmış verileri doğrulama

Yapılandırılmış verilerinizin doğru olduğunu teyit etmek için birçok platform, doğrulama araçları sağlar. Bu öğreticide, yapılandırılmış verilerimizi [Google Yapılandırılmış Veri Doğrulama Aracı](https://developers.google.com/structured-data/testing-tool/) ile doğrulayacağız.

1. Yeni bir tarayıcı penceresinde [Google Yapılandırılmış Veri Doğrulama Aracı'nı açın](https://developers.google.com/structured-data/testing-tool/).
2. **Kod Parçacığı** sekmesini seçin.
3. Tam kaynak kodunu AMP sayfanızdan kopyalayıp doğrulama aracının metin editörü paneline yapıştırın.
4. **Testi Çalıştır** düğmesine tıklayın.

Yapılandırılmış verileriniz geçerliyse, **0 hata** ve **0 uyarı** görmelisiniz.

[tip type="read-on"] **OKUMAYA DEVAM EDİN -** Sayfa keşfedilebilirliği hakkında daha fazla bilgi edinmek için [Sayfanızı keşfedilebilir hale getirme](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) kılavuzuna bakın. [/tip]

Mükemmel bir işti! AMP haber makalenizi tamamladınız.
