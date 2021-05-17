---
'$title': "AMP'yi uygulamanıza entegre etme"
$order: 2
description: Bu kılavuz, AMP sayfalarını entegre etmek ve onlara bağlantı vermek isteyen mobil ve web uygulaması geliştiricileri içindir. Örneğin, kullanıcılarına daha hızlı bir deneyim sağlamak için...
formats:
  - websites
---

Bu kılavuz, AMP sayfalarını entegre etmek ve onlara bağlantı vermek isteyen mobil ve web uygulaması geliştiricileri içindir. Örneğin, kullanıcılarına daha hızlı bir deneyim sağlamak için paylaşılan bir URL'nin AMP sürümünü yükleyen bir mobil sohbet uygulamasını düşünelim.

## Bağlantıları AMP'ye çevirme

AMP ile harici web sitelerini yerel veya mobil web uygulamanızda neredeyse anında oluşturmak mümkündür. Bunu, içeriğinizdeki URL'leri onlara karşılık gelen AMP URL'leriyle (varsa) eşleştirerek ve orijinal sürüm yerine AMP sürümünü açarak gerçekleştirebilirsiniz. Size yardımcı olması için [Google'ın AMP URL API'si](https://developers.google.com/amp/cache/use-amp-url) gibi araçları kullanabilirsiniz.

Örneğin, aşağıdaki mesaj, tüm URL'leri onlara karşılık gelen AMP sürümleriyle değiştirerek (varsa) AMP sürümlerini sunmak üzere dönüştürülebilir. Yükleme süresini azaltmak ve geçerli AMP'nin sunulduğundan emin olmak için AMP Önbelleğinde önbelleğe alınmış AMP sayfalarına bağlantı vermelisiniz.

Orijinal mesaj:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Dönüştürülmüş mesaj:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"] **İPUCU** – Uygulamanızdaki tercih ayarları aracılığıyla kullanıcılara AMP sürümü yerine AMP olmayan sürümü görüntüleme seçeneği sunmayı düşünün. [/tip]

### Bağlantıları dönüştürme yolları

Bağlantıları programlı olarak dönüştürmenin üç yolu vardır:

1. **Yazma zamanı sunucu tarafı (tercih edilen): (tercih edilen)**: Bir URL'nin yazma zamanında AMP URL'sini Google'ın AMP URL API'si yoluyla getirin ve AMP URL'lerini sunucu tarafında depolayın. Orijinal URL paylaşım için gerekli olabileceğinden her iki URL'yi de istemciye iletin. İstemci tarafı ağ isteği sayısı daha az olduğundan bu önerilen yaklaşımdır. Bu yaklaşımı kullanırken, web siteleri AMP biçimini giderek daha fazla benimsediğinden, AMP sürümleri için düzenli olarak (örneğin günlük) tarama bağlantıları önemlidir.
2. **Okuma zamanı sunucu tarafı (bazı kullanımlar):** İçeriği istemcinize göndermeden önce Google'ın AMP URL API'si yoluyla AMP URL'sini getirin. Yukarıda belirtildiği gibi, orijinal URL paylaşım için gerekli olabileceğinden her iki URL'yi (AMP ve AMP olmayan) de istemciye iletin. Bu yöntem düşük çıkış yelpazeli hizmetler için iyidir.
3. **İstemci tarafı (sunucu tarafı mümkün değilse)**: İstemciden Google'ın AMP URL API'si yoluyla AMP URL'sini getirin. Sunucu tarafı URL dönüşümü mümkün değilse (örneğin, uçtan uca şifreleme kullanan mesajlaşma uygulamaları için) bu yaklaşımı kullanın. Herhangi bir kullanıcı etkileşimi gerçekleşmeden önce, içerik kullanılabilir olur olmaz URL dönüşümünü tetiklediğinizden emin olun.

[tip type="important"] **ÖNEMLİ** – Asla kullanıcı etkileşimi sonucunda Google AMP API'si yoluyla AMP URL'leri istemeyin çünkü bu istek, ek bir ağ isteği gerektirdiğinden uygulamanızın performansını düşürür. Bunun yerine yukarıda açıklanan üç yaklaşımdan birini kullanın. [/tip]

#### Google'ın AMP URL API'si

Google, AMP URL API'sini sunarak verili bir URL listesine karşılık gelen AMP HTML URL'lerini getirir ([resmi belgeleme](https://developers.google.com/amp/cache/use-amp-url) / [demo](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html)). URL'lerin standart sürümlerde olması gerekmez. Bir AMP sürümü varsa, yanıt orijinal AMP URL'sini ve Google AMP Önbelleğindeki önbelleğe alınan AMP sayfasının URL'sini içerir.

Örneğin, belirli bir URL listesi için:

```json
{
  "urls": [
    "https://www.example.org/article-with-amp-version",
    "http://www.example.com/no-amp-version.html"
  ]
}
```

Yanıt gövdesi, AMP URL eşlemesini JSON biçiminde içerir:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"] **NOT** – Google Dışı AMP Önbelleklerinde önbelleğe alının AMP sayfalarının URL'leri, AMP URL API'si yoluyla getirilemez. Ancak, döndürülen AMP URL'sinden (ampURL) önbelleğe alınan URL'yi kolayca türetebilirsiniz.

## AMP Önbelleklerini Kullanma

[AMP Önbelleği](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) geçerli AMP belgelerini sunmayı amaçlayan proxy tabanlı bir içerik teslim ağıdır (CDN). AMP Önbellekleri aşağıdaki amaçlarla tasarlanmıştır:

- Yalnızca geçerli AMP sayfaları sunmak.
- AMP sayfalarının verimli ve güvenli şekilde önceden yüklenmesini sağlamak.
- İçerik konusunda kullanıcı için faydalı performans iyileştirmeleri sunmak.

Şu ana iki AMP Önbellek sağlayıcısı vardır:

- [Google AMP Önbelleği](https://developers.google.com/amp/cache/)
- [Bing AMP Önbelleği](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

Bu durum bir uygulamada AMP dosyasını göstermek için kullanılabilecek aşağıdaki iki seçeneği sunar:

1. yayıncının barındırdığı sürüm
2. AMP Önbelleğinde barındırılan sürüm

Aşağıdaki nedenlerle AMP Önbelleğini kullanmanızı tavsiye ediyoruz:

- Daha hızlı yükleme süresi ve düşük gecikme süresi sayesinde daha iyi kullanıcı deneyimi (>1sn daha hızlı yükleme süresi).
- İstemciye bağlı nesnelerin ek önbelleğe alınması sayesinde performans ve bant genişliği avantajları; örneğin istemcinin görünüm penceresi boyutuna bağlı olarak aynı görüntünün farklı sürümlerinin önbelleğe alınması.
- Orijinal AMP dosyası artık geçerli bir AMP olmayabilir ve bu da kötü bir kullanıcı deneyimine yol açabilir. Bu durumda, AMP Önbelleği AMP dosyasının en son geçerli sürümünü sunar.
- Çok düzgün çalışmayan bir yayıncı, AMP Önbellek gezginine ve kullanıcılarına iki farklı belge sunabilir. AMP Önbelleğini kullanmak, kullanıcıların daima Önbellek olarak aynı AMP dosyasını görmesini sağlar.

[tip type = "important"] **ÖNEMLİ** - AMP sayfalarını AMP Önbelleği aracılığıyla sunarken, AMP'nin kaynağını açıkça gösteren ve kullanıcılara standart URL'yi paylaşma olanağı sunan bir görüntüleyici deneyimi sağlayın (bu konu hakkında daha fazlası için aşağıdaki iki bölüme de bakın). [/tip]

## AMP Görüntüleyicisi Ekleme

AMP Çalışma Zamanı, kendisi ile Görüntüleyici arasında mesaj gönderme ve alma amaçlı bir protokol sunan bir Görüntüleyici API'si sunar. Bu API, AMP belgelerinin önceden oluşturulmasını, makaleler arasında kaydırmayı ve AMP Çalışma Zamanı izlemesini kontrol etmeye olanak verir. [AMP sayfalarına AMP Görüntüleyicilerini bağlama kılavuzunda](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) AMP Görüntüleyici API'si hakkında daha fazla bilgi edinebilirsiniz. [Web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) ve [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) için görüntüleyici uygulamalarını [GitHub](https://github.com/ampproject/amp-viewer)'da bulabilirsiniz. Henüz bir Android görüntüleyicisi yoktur, AMP sayfalarını göstermek için bir WebView'i nasıl en iyi şekilde yapılandırabileceğinizi görmek için Stack Overflow'daki [şu yanıta](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) bakın.

Burada bir AMP Görüntüleyicisi eklemek için en iyi uygulamaları bulabilirsiniz:

- AMP sayfasını AMP Önbelleğinden sunun (>1sn daha hızlı yükleme süresi).
- Makalenin yayıncı kaynağını gösterin (örneğin daraltılabilir başlıkta).
- Bir paylaşma eylemi sağlayın (ayrıca aşağıdaki "[AMP İçeriği Paylaşma](#sharing-amp-content)" bölümüne de bakın).
- webView tabanlı görüntüleyicilerde, üçüncü taraf çerezlerini etkinleştirin.
- Platformunuz/uygulamanız için bir yönlendirici ayarlayın.

### AMP İçeriği Paylaşma <a name="sharing-amp-content"></a>

Bir AMP belgesini platformun AMP Görüntüleyicisi içinden paylaşırken, platform teknik olarak mümkün olduğunda standart URL'yi paylaşmalıdır. Örneğin, platformda bir paylaş düğmesi varsa, bu düğmenin standart URL'yi paylaşması gerekir.

AMP Projesi'nin felsefesine göre platformlar kullanıcıya bir belgenin hangi sürümünü sunacağını seçebilmelidir. Bu nedenle, URL'yi farklı bir platformda paylaşırken standart sürümü (AMP sürümü yerine) paylaşmak ve daha sonra hedef platformun doğru seçimi yapmasını beklemek en mantıklısıdır.
