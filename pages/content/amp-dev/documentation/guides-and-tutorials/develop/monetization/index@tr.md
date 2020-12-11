---
"$title": AMP sayfanızdan reklamlarla para kazanma
"$order": '0'
description: "Bu kılavuz, AMP sayfalarınızda reklam görüntülemeye yönelik talimatları ve en iyi uygulamaları sunuyor. Bu nedenle, AMP'de reklam görüntülemek için özel amp-ad bileşenini..."
formats:
- websites
---

Bu kılavuz, AMP sayfalarınızda reklam görüntülemeye yönelik talimatları ve en iyi uygulamaları sunuyor.

## Sayfanıza reklam ekleme

AMP olmayan sayfalarda (geleneksel HTML), sayfanızda reklam görüntülemek isterseniz, reklam ağınızdan reklam sunmak için bir JavaScript kod parçacığı eklemeniz gerekir. Performans ve güvenlik nedenleriyle, AMP sayfalarına üçüncü taraf JavaScript ekleyemezsiniz. Bu nedenle, AMP'de reklam görüntülemek için özel [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşenini AMP sayfanıza eklemeniz gerekir.

[tip type="tip"] **İPUCU -** Bir AMP sayfasına amp-ad etiketi eklemeyi gösteren [canlı bir demo için AMP By Example](../../../../documentation/components/reference/amp-ad.md) bölümüne bakın. [/tip]

AMP sayfanızda reklam görüntüleyebilmek için bileşeni ekleme adımlarını birlikte inceleyelim.

### 1. Adım: amp-ad betiğini ekleme

[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşeni, AMP kitaplığına özel bir reklam uzantısıdır. [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) altında, performansı optimize etmek için dikkatle tasarlanmış özel JavaScript bulunur. [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşenini çalıştırmak için, AMP sayfanızın `head` bölümüne bu bileşen için gerekli JavaScript'i eklemeniz gerekir:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### 2. Adım: amp-ad etiketini AMP sayfanıza ekleme

100'den fazla [reklam sunucusu ve ağ](ads_vendors.md), AMP ile yerleşik entegrasyonlar sağlar. Belirli bir reklam ağına bir reklam eklemek için, [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) etiketini ekleyin ve `type` özniteliğinde ağı belirtin.

Bu örnekte, a9 ağından reklam sunmak için bir reklam alanı ekliyoruz:

```html
<amp-ad type="a9">
</amp-ad>
```

### 3. Adım: Reklam biriminin boyutunu belirtme

`width` ve `height` özniteliklerini [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) etiketine ekleyin. Bunlar, AMP sayfanızdaki reklamın boyutunu belirtir:

```html
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### 4. Adım: Reklam ağı parametrelerini ayarlama

Her ağın, reklamları sunmak için ihtiyaç duyduğu belirli veri öznitelikleri vardır. Reklam ağının [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) belgelerine bakın ve gerekli öznitelikleri ekleyin. Aşağıdaki örnekte, a9 ağı, reklamın boyutunu ve diğer ayrıntıları belirtmek için ek parametreler gerektiriyor:

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### 5. Adım: (İsteğe bağlı) Bir yer tutucu belirtme

Reklam ağına bağlı olarak, reklam görüntülenmeye hazır olana kadar bir yer tutucu göstermeyi tercih edebilirsiniz. Bu, boş bir alanın görünmesini önleyerek daha iyi bir kullanıcı deneyimi sağlar. Bir yer tutucu belirtmek için, `placeholder` özelliğine sahip bir alt öğe ekleyin. [Yer tutucular ve yedekler hakkında](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) daha fazla bilgi edinin.

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### 6. Adım: (İsteğe bağlı) Bir yedek belirtme

Reklam ağına bağlı olarak, sunulacak reklam yoksa bir yedek öğe göstermeyi tercih edebilirsiniz. Bir yedek belirtmek için, `fallback` özelliğine sahip bir alt öğe ekleyin. [Yer tutucular ve yedekler hakkında](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) daha fazla bilgi edinin.

```html
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

Tebrikler! Artık AMP sayfanızda reklam sunuyorsunuz!

## Doğrudan satılan AMPHTML reklamları sunma

[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşeni, belirttiğiniz ağdaki reklamları sunar. Bu reklamlar, reklam ağının AMPHTML reklamları desteklemesi koşuluyla standart HTML reklamları veya AMPHTML reklamları olabilir. Doğrudan satılan reklamlarınızı AMPHTML reklamları olarak sunmak için, reklamı AMP HTML'de [AMPHTML reklam teknik özelliklerinin](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) gereksinimlerine göre oluşturun ve [AMPHTML reklamları sunan bir reklam sunucusu](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/a4a-readme.md#publishers) kullanın.

## Reklam isteklerine ilişkin hedefleme verilerini artırma

Hızlı Getirme (Fast Fetch) sunum mekanizmasının bir parçası olarak, Gerçek Zamanlı Yapılandırma (RTC) özelliği, yayıncıların çalışma zamanında alınan birinci taraf ve üçüncü taraf hedefleme bilgileriyle reklam isteklerini artırmasına olanak tanır. RTC, her bir reklam alanı için sunucuları hedeflemek için en fazla 5 açıklama balonuna izin verir ve bunların sonuçları reklam isteğine eklenir. Reklamlarınızda RTC kullanmak için, kullandığınız reklam ağının RTC ve Hızlı Getirmeyi desteklemesi gerekir.

Bu YouTube videosundan RTC hakkında daha fazla bilgi edinebilirsiniz:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Watch Effective AMP Monetization with Header Bidding.']

Veya bu RTC kaynaklarından daha fazla bilgi edinin:

- [AMP RTC yayıncı uygulama kılavuzu](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [AMP Gerçek Zamanlı Yapılandırması](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md)

## En iyi uygulamalar

AMP sayfalarınızdaki reklamların etkinliğini en üst düzeye çıkarmak için bazı ipuçları aşağıda verilmiştir:

### Yerleşim ve kontroller: reklam yerleşimlerinizi optimize edin

- Sayfa başına maksimum gelir elde etmek için AMP sayfalarına AMP olmayan sayfalarınızla **aynı sayıda reklam yerleştirin.**
- Optimum kullanıcı deneyimi sağlamak için **ilk reklamı ilk görüntü alanının hemen altına yerleştirin** ("ekranın alt kısmı").
- Gelişmiş CSS veya medya sorguları kullanmıyorsanız, kullanıcılarınıza en iyi mobil web deneyimini **sağlamak için reklam birimlerinizin sayfada ortalandığından emin olun**.
- Reklam açık artırma baskısını artırmak ve geliri artırmak için AMP envanterinizde [çok boyutlu reklam isteklerini](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests) etkinleştirin.

### Talep ve fiyatlandırma: Reklamlarınız için doğru fiyatı alma

- AMP sayfalarındaki envanteriniz için rekabeti en üst düzeye çıkarmak için doğrudan ve dolaylı da dahil olmak üzere **AMP sayfalarınızda tüm satış kanallarında reklam birimleri satın**.
- **Reklam envanterinizi AMP olmayan sayfalardaki envanterinize benzer AMP sayfalarında fiyatlandırın**. Performansı izleyin ve fiyatı buna göre ayarlayın.
- Rekabeti artırmak amacıyla AMP sayfalarınızdaki reklam envanteri için **tüm reklam talebi kanallarının rekabet ettiğinden emin olun **.

### Reklam türleri: En iyi reklam türlerini sunma

- <a>IAB yönergelerine göre</a><strong>ağır reklamlardan kaçının</strong>.
- Reklam yüklenirken içeriğin yeniden akmasına neden olan **geçiş reklamlarından** veya diğer reklam biçimlerinden kaçının.
- Veri yükleme stratejisini, görüntülenebilirlik tercihine göre ayarlayarak **görüntülenebilirliği optimize edin**.
- Tüm içerik türlerinden gelir elde etmek için <a>desteklenen oynatıcılar</a> veya [<code>amp-iframe</code>](../../../../documentation/components/index.html#media) aracılığıyla <strong>&nbsp;video içeriğinize reklamlar yerleştirin</strong>.
- Çok boyutlu reklam istekleri kullanarak görüntülü reklamlarla rekabet etmek için **yerel reklamları** uygulayın ve okuyucularınıza birinci sınıf bir kullanıcı deneyimi sağlarken talep baskısı ekleyin.

### Yenilik: En ilgi çekici reklam ürünlerini sunma

- Artımlı gelir elde etmek için **reklamları yardımcı AMP sayfalarına** uygulayın:
    - [Döngüdeki reklamlar](../../../../documentation/examples/documentation/Carousel_Ad.html)
    - [Lightbox'taki reklamlar](../../../../documentation/examples/documentation/Lightbox_Ad.html)
    - ...ve [daha fazlası](../../../../documentation/examples/index.html)
- Satış ekibinizi yüksek etkili, yenilikçi reklam ürünleriyle donatmak **&nbsp;adına doğrudan satılan reklamlar için yeni biçimler uygulayın** :
    - [Yapışkan Reklamlar](../../../../documentation/examples/documentation/amp-sticky-ad.html)
    - [Ucan Halı](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Ek kaynaklar

- [AMPHTML reklam şablonları](../../../../documentation/examples/index.html)
- [Demo: AMP sayfanıza nasıl `amp-ad` ekleyeceğinizi gösterir](../../../../documentation/components/reference/amp-ad.md)
