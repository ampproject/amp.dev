---
'$title': AMP yayınlama kontrol listesi
$order: 0
description: Duyarlı web tasarımı, cihazınızın ekran boyutuna ve yönüne uyan kullanıcılarınızın ihtiyaçlarına cevap veren akıcı web sayfaları oluşturmakla ilgilidir.
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

Web sitenize en iyi AMP deneyimini sunmak için bu kontrol listesini takip edin!

# AMP Teknik Özellik Doğrulamasını Sağlama

AMP, AMP Önbelleklerinden içeriği önceden yükleyerek kullanıcı bekleme süresini azaltmak gibi bir ton yerleşik avantajla birlikte gelir. Bu avantajları elde etmek için sayfaların geçerli AMP belgeleri olması gerekir. AMP doğrulayıcı tarafından bildirilen hatalarla yayınlanan sayfalar, AMP Önbellekleri tarafından dizine eklenmez ve muhtemelen hata sayfaları olarak sunulur.

Bu araçları kullanarak geçersiz bir AMP sayfasını bir daha asla yayınlamayın:

- [AMP sayfalarını doğrulayın](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [AMP Doğrulayıcı ](https://validator.ampproject.org/)
- [Google AMP Tester](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [AMP Araçları](../../../documentation/tools.html?format=websites)

# Önbelleğe alınmış AMP sayfaları sunucusuna erişim izni verin

Harika bir haber, geçerli AMP sayfaları otomatik olarak mevcut tüm AMP Önbelleklerini etkinleştirir! Bu, kullanıcılarınızın verimli ve güvenli bir şekilde yüklenen içeriği deneyimlediği anlamına gelir. Bu tür optimizasyonlar harikadır, ancak küçük bir sorunla gelir. Bazı kullanıcılara, sizinkiyle eşleşmeyen alan adlarından AMP sayfaları sunulacaktır. Bu, [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) veya [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites) gibi dinamik AMP bileşenlerini kullanırken sayfaların site verilerine erişimini kaybetmesine neden olabilir. Bu tür hatalar, Kökler Arası Kaynak Paylaşımı veya CORS sorunlarıdır. Mevcut tüm [AMP önbelleklerinden](https://cdn.ampproject.org/caches.json) CORS isteklerini etkinleştirerek ona karşı değil, güven içinde çalışın! Arka ucunuzda Node.js kullanıyorsanız, [amp-cors ara yazılımını](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) kullanabilirsiniz.

Sunucuya erişim verme hakkında daha fazla bilgi edinin:

- [AMP sayfaları nasıl önbelleğe alınır? ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [AMP'de CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- Node.js için [AMP CORS Ara Yazılımı](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors)

# İmzalı değişimlerle güvenli ve paylaşılabilir içerik

İmzalı değişimler (SXG) aracılığıyla içerik paylaşırken alan adınızın URL'sini saklayın ve analizi basitleştirin. Dijital imzalar, AMP sayfalarını SXG ile sunarak, belgeyi talep edilen URL'sine bağlayarak bilgilerinizi korur. Bu davranış, kullanıcı oturumlarını ve tanımlama bilgilerini birinci taraf olarak değerlendirerek olası analitik boşlukları kapatır. SXG'nin uygulanması, normal AMP içeriği yerine imzalı AMP içeriği sunar.

İmzalı değişimleri uygulama hakkında daha fazla bilgi edinin:

- [İmzalı değişimleri kullanarak AMP sunun](signed-exchange.md?format=websites)
- [İmzalı HTTP değişimleri](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [Cloudflare AMP Gerçek URL](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Daha iyi AMP URL'leri ve daha kolay analiz için imzalanmış değişimler (AMP Konf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Önbelleğe alınmış sayfaları test etme

AMP Önbellekleri, kullanıcılara içeriğinizi istedikleri anda sunmak için görüntüleri, yazı tiplerini ve sayfa içeriğini saklar. Bu, AMP sayfalarınızın bir AMP önbelleğinden sunulduğunda beklendiği gibi göründüğünü ve çalıştığını test etmeyi önemli kılar.

AMP sayfalarını bir AMP Önbelleğine eklerken, [tarayıcınızın geliştirici araçlarıyla](https://developers.google.com/web/tools/chrome-devtools/) tüm harici kaynakların yüklenebilir olduğunu kontrol edin. İşte akılda tutulması gereken bir liste:

- görüntüler
- videolar
- amp-analytics uç noktaları
- amp-pixel uç noktaları
- özel yazı tipleri
- iframes

AMP önbellekleri hakkında daha fazla bilgi edinin:

- [Google AMP Önbelleğini Kullanma](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [Google'da AMP, Google AMP Önbelleği](https://developers.google.com/amp/cache/overview)
- [Hata ayıklama AMP Önbellek sorunları](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [AMP Önbellek URL Biçimi ve İstek İşleme](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# AMP dosyalarınızın arama motorları tarafından keşfedilebilir olduğundan emin olun

Sayfalar yalnızca AMP'de (önce AMP) oluşturulur ve AMP çiftli (eşleştirilmiş AMP) sayfaların tümünün keşfedilebilir olduğundan emin olmalıdır! Tüm AMP sayfalarının `<head>` kısmında `<link rel="canonical" href="$SOME_URL">` olması gerekiyordu. AMP ilk sayfalarının kendilerine bağlanması gerekir ve AMP olmayan bir sayfayla eşlenen AMP sayfalarının birbirine bağlanması gerekir.

[Schema.org](https://schema.org/) meta verilerinizin yararlı bilgiler eklediğinden emin olun! Diğer siteler ve arama motorları içeriğinizi paylaşmak için buna ihtiyaç duyabilir.

Web Robotları, Web Gezgini, Tarayıcılar veya Örümcekler, içerik arayan programların adlarıdır. Web'i dolaşarak arama motorlarının web içeriğini dizinlemesine yardımcı olurlar. Böylece kullanıcının sorguları doğru sonuçları ortaya çıkarabilir! `robots.txt` dosyasına uygun talimatları ekleyerek ve uygun başlıkları ayarlayarak arayanların sitenizi bulabileceğinden emin olun.

Tarayıcıları [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en) dosyanız aracılığıyla HARİÇ TUTMAYIN.

```
User-agent: *
Disallow: /amp/                            <= don't!
```

AMP HTML dosyalarınıza robots `noindex` meta etiketi EKLEMEYİN.

```
<meta name="robots" content="noindex" />   <= don't!
```

AMP dosyalarınız için X-Robots-Tag HTTP üst bilgisi olarak `noindex`'i İÇERMESİN.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Sayfalarınızı nasıl keşfedilebilir hale getireceğinizi öğrenin:

- [Sayfanızı bulunabilir hale getirin ](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Robots meta etiketi ve X-Robots-Tag HTTP başlık teknik özellikleri](https://developers.google.com/search/reference/robots_meta_tag)
- [AMP Dizinleme SSS'leri](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Kullanıcı trafiğini ve yolculuklarını ölçme

Doğru metrikleri toplamak, yararlı analizler için çok önemlidir. AMP'yi sitenize tanıtmanın kullanıcıları nasıl etkilediğini test ederken, doğru şeyleri ölçtüğünüzden emin olun. Analitik, AMP'nin yaratabileceği farklılıkları hesaba katmazsa, yanlış negatifler, yanlış pozitifler veya alakasız sonuçlar ortaya çıkabilir. Ne arayacağınızı ve nasıl ölçeceğinizi anladığınızdan emin olun!

AMP için uygun analitiği ayarlama hakkında daha fazla bilgi edinin:

- [Yani AMP testiniz çalışmıyor - şimdi ne olacak?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Önbellek ve önbellek olmayan analiz](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [AMP önbelleğinde ve web sitenizde kullanıcı yolculuklarını ölçme](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Başarı ölçümü: AMP analitiği ve deneylerinde yenilikler (AMP Konf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Daha iyi AMP URL'leri ve daha kolay analiz için imzalanmış değişimler (AMP Konf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
