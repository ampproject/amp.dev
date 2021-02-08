---
'$title': Genişletilmiş AMP bileşenleri ekleme
$order: 2
description: AMP bileşen sistemi, makalelerinize en az çaba ile hızlı bir şekilde verimli ve duyarlı özellikler oluşturmanıza olanak tanır. AMP HTML kütüphanesi, AMP bileşenleri için üç sınıflandırmaya sahiptir.
---

AMP bileşen sistemi, makalelerinize en az çaba ile hızlı bir şekilde verimli ve duyarlı özellikler oluşturmanıza olanak tanır. AMP HTML kütüphanesi, AMP bileşenleri için üç sınıflandırmaya sahiptir:

- **kurulu**: Bunlar, [`amp-img`](../../../../documentation/components/reference/amp-img.md) ve [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) gibi temel AMP JavaScript kitaplığında (`<head>` etiketinde belirtilen) bulunan bileşenlerdir. Bu bileşenler bir AMP belgesinde hemen kullanılabilir.

- **genişletilmiş**: Bunlar, belgeye özel öğeler olarak açıkça dahil edilmesi gereken temel kitaplığın eklentileridir. Özel öğeler, `<head>` bölümüne eklenen özel komut dosyaları gerektirir (örneğin, `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md) `...`).

- **deneysel**: Bunlar, serbest bırakılan ancak henüz geniş kullanıma hazır olmayan bileşenlerdir. Geliştiriciler, tamamen piyasaya sürülmeden önce bu özellikleri kullanmayı seçebilirler. [Deneysel özellikler](../../../../documentation/guides-and-tutorials/learn/experimental.md) hakkında daha fazla bilgi edinin.

Örneğimiz zaten yerleşik bir bileşen olan [`amp-img`](../../../../documentation/components/reference/amp-img.md)'yi kullanıyor ve bu bileşenin ["HTML'nizi AMP'ye dönüştürün"](../../../../documentation/guides-and-tutorials/start/converting/index.md) öğreticisinde AMP yerleşim sistemi ile nasıl ilişkili olduğunu keşfettik. Şimdi, haber makalemize yaygın olarak kullanılan bazı **genişletilmiş** AMP bileşenlerini ekleyelim.

## Reklamlarla para kazanma

AMP'deki reklamlar [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşeni kullanılarak oluşturulur. [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşeni, reklamları genişlik, yükseklik ve yerleşim modu gibi çeşitli şekillerde yapılandırmanıza olanak tanır. Bununla birlikte, birçok reklam platformu, reklam ağının hesap kimliği, hangi reklamın sunulması gerektiği veya reklamı hedefleme seçenekleri gibi ek yapılandırma gerektirir. Bu seçenekler, [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşeninde HTML öznitelikleri kullanılarak kolayca belirtilir.

**DoubleClick** reklamının bu örneğine bir göz atın:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static"
>
</amp-ad>
```

Gördüğünüz gibi, bu çok basit bir yapılandırma. Kullanmak istediğimiz reklam platformunun [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşenini bilgilendiren `type` özniteliğine dikkat edin. Bu durumda, [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md) platformunu kullanmak istiyoruz, bu yüzden `doubleclick`'i değer olarak belirttik.

`data-slot` özniteliği daha benzersizdir. [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)'de, `data-` ile başlayan tüm öznitelikler sağlayıcıya özgü özniteliklerdir. Bu, tüm sağlayıcıların mutlaka bu özel özniteliğe ihtiyaç duymayacağı ve sağlanırsa mutlaka tepki vermeyeceği anlamına gelir. Örneğin, yukarıdaki **DoubleClick** örneğini [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md) platformundaki aşağıdaki test reklamıyla karşılaştırın:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Yukarıdaki örneklerin her ikisini de `<header>` etiketinden hemen sonra makalenize **eklemeyi** deneyin.

Tüm bileşenlerin çekirdek AMP kitaplığı JavaScript dosyasına dahil edilmediğini unutmayın. Reklam bileşeni için ek bir JavaScript isteği eklememiz gerekiyor.

Aşağıdaki komut dosyasını `<head>` etiketine **ekleyin**:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

Sayfayı **yenileyin** ve iki test reklamı görmelisiniz:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] **ÖNEMLİ –** Geliştirici konsolunuzda `Mixed Content` veya `XMLHttpRequest cannot load` gibi olabilir. İlk hata muhtemelen A9 reklamıyla ilgilidir, çünkü yüklediği tüm içerik güvenli değildir. Bu, AMP'de sunulan tüm reklamlar için dikkate değer bir gerekliliktir. [/tip]

Aşağıdaki iki [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)s, [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)'ın reklam platformu özelliklerini desteklemek için sağladığı esnekliğin bir örneğini sağlar. Bu durumda, iki DoubleClick test reklamını yalnızca belirli ülkelerde gösterilecek şekilde (DoubleClick'in kontrol panelini kullanarak) yapılandırdık. İlki yalnızca Birleşik Krallık'ta ve ikincisi yalnızca ABD'de gösterilecek. Bu iki coğrafi hedefleme reklam yapılandırmasını AMP belgesine, daha önce eklediğiniz reklamların altına **eklemeyi** deneyin:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk"
>
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us"
>
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

Sayfayı **yenileyin** ve bir göz atın. Aşağıdaki ekran görüntüsü Kanada'dan alındı, bu yüzden hiçbir reklam yüklenmedi:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] **NOT –** Bu [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) etiketlerinin içinde, `fallback` adlı bir özniteliğe sahip ek `div` etiketleri olduğunu fark edebilirsiniz. `fallback` özniteliğinin neyi ifade ettiğini tahmin edebilir misiniz? AMP yükleme sistemini, yalnızca ana öğe başarıyla yüklenemediğinde bu öğenin içeriğini göstermesi için bilgilendirir. [Yer tutucular ve geri dönüşler](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) hakkında daha fazla bilgi edinin. [/tip]

[tip type="read-on"] **OKUYUN –** Desteklenen en son reklam ağlarını görmek için [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşeninin referans belgelerini okuyun. [/tip]

[tip type="note"] **NOT –** AMP belgesinin içinde reklam ağı tarafından sağlanan JavaScript'in çalışmasına izin verilmez. Bunun yerine, AMP çalışma zamanı, AMP belgesi olarak farklı bir kaynaktan (bir iframe sanal alanı aracılığıyla) bir iframe yükler ve reklam ağının JS'sini bu iframe sanal alanının içinde yürütür. [/tip]

AMP belgemiz artık bir hikaye anlatmak ve içeriğinizden para kazanmak için önemli bileşenler olan sayfaya gömülü metin, resim ve reklam içeriyor. Bununla birlikte, modern web siteleri genellikle sadece resim ve metinden daha fazla işlevsellik içerir.

AMP belgemizi bir sonraki seviyeye taşıyalım ve haber makalelerinde yaygın olarak bulunan daha gelişmiş web işlevselliği ekleyelim:

- YouTube videoları
- Tweetler
- Makale alıntıları

## Bir YouTube videosu yerleştirin

Belgeye bir YouTube videosu yerleştirmeyi deneyelim. AMP belgenizdeki `<header>` öğesinden hemen sonra aşağıdaki kodu **ekleyin** (yeni eklediğiniz [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)s üstünde):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270"
>
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

Sayfayı **yenileyin**. Videonun yerine şu metni göreceksiniz: _"Video yüklenemedi."_

Tarayıcınız YouTube videolarını sorunsuz bir şekilde gösterebilse bile, yine de bu hatayı alırsınız. Neden? Video aslında yüklenemedi, daha ziyade bileşenin kendisi başarısız oldu.

Tüm bileşenlerin çekirdek AMP kitaplığı JavaScript dosyasına dahil edilmediğini unutmayın. YouTube bileşeni için ek bir JavaScript isteği eklememiz gerekiyor.

[tip type="note"] **NOT –** Geliştirici konsolunuz hala açıksa ve URL'nizde `#development=1` varsa, bu noktada [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) JavaScript'ini eklemenizi hatırlatan bir AMP validator hatası ve eklenecek `script` etiketini size bildiren belgelere bir bağlantı görürsünüz. [/tip]

Aşağıdaki komut dosyasını `<head>` etiketine **ekleyin**:

```html
<script
  async
  custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
></script>
```

Sayfayı **yenileyin** ve YouTube videosunu görmelisiniz:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

Sayfadaki diğer öğelerde olduğu gibi, AMP yerleşim sisteminin en boy oranını hesaplayabilmesi için videonun `width` ve `height` özniteliklerini belirttik. Ayrıca, `layout` `responsive` olarak ayarlıyoruz, böylece video ana öğesinin genişliğini dolduruyor.

YouTube videolarını yerleştirme hakkında daha fazla bilgi edinmek için [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) bileşen belgelerini okuyun. Daha fazla video ve medya bileşeni için [medya AMP bileşenlerinin listesine](../../../../documentation/components/index.html#media) göz atın.

[tip type="tip"] **İPUCU –** Bir bileşen yüklenemiyorsa veya bileşen tarayıcılarında desteklenmiyorsa kullanıcıları bilgilendirmek için [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks) özniteliğini kullanın. [/tip]

## Bir Tweet görüntüleme

Twitter'dan önceden biçimlendirilmiş tweet'leri yerleştirmek, haber makalelerindeki yaygın bir özelliktir. [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) bileşeni bu işlevselliği kolaylıkla sağlayabilir.

Belgenizin `<head>` etiketine aşağıdaki JavaScript isteğini ekleyerek başlayın:

```html
<script
  async
  custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
></script>
```

Şimdi, makalenize Tweet yerleştirmek için bu kodu **ekleyin**:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

`data-tweetid` özniteliği, belirli bir platformun gerektirdiği özel bir özniteliğin başka bir örneğidir. Bu durumda Twitter, `data-tweetid` özniteliğinin değerini belirli bir Tweet ile ilişkilendirir.

Tarayıcınızı **yenileyin** ve sayfaya bir göz atın. Tweetin göründüğünü görmelisiniz:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

Twitter tweet'lerini yerleştirme hakkında daha fazla bilgi edinmek için [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) bileşen belgelerini okuyun.

[tip type="tip"] **İPUCU –** AMP, sosyal ağlardan içerik yerleştirmek için daha fazla bileşen sağlar. En son [sosyal AMP bileşenlerine](../../../../documentation/components/index.html#social) bakın. [/tip]

## Bir makale alıntısını vurgulayın

Haber makalelerinde ortak bir özellik, makaleden özellikle ilgi çekici metin parçacıklarını vurgulamaktır. Örneğin, belirli bir kaynaktan bir alıntı veya önemli bir gerçek, okuyucunun dikkatini çekmek için daha büyük bir yazı tipinde tekrarlanabilir.

Bununla birlikte, tüm metin parçacıkları mutlaka aynı karakter uzunluğuna sahip değildir, bu da metnin sayfada tükettiği alan miktarıyla daha büyük bir yazı tipi boyutunu dengelemeyi zorlaştırabilir.

AMP, bu tür bir durum için özel olarak tasarlanmış başka bir bileşen sağlar, buna [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) bileşeni denir. [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) bileşeni, sabit bir genişlik ve yükseklik öğesinin yanı sıra maksimum yazı tipi boyutunu tanımlamanıza olanak tanır. Bileşen, metni kullanılabilir genişlik ve yüksekliğe **sığdırmak** için yazı tipi boyutunu akıllıca ölçeklendirir.

Bunu bir deneyelim. İlk olarak, bileşenin kitaplığını `<head>` etiketine **ekleyin**:

```html
<script
  async
  custom-element="amp-fit-text"
  src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
></script>
```

Sayfanıza aşağıdakileri ekleyin:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

Sayfayı **yenileyin** ve sonuca bakın!

Şimdi, daha fazla deney yapın. Alıntı çok daha kısaysa ne olur?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Ya da alıntı daha uzunsa ne olur?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  And the Raven, never flitting, still is sitting, still is sitting. On the
  pallid bust of Pallas just above my chamber door; And his eyes have all the
  seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming
  throws his shadow on the floor; And my soul from out that shadow that lies
  floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

[`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) ile yapılan son bir deney olarak, çok daha büyük bir yüksekliğe (örneğin, 400 değeri) sahip "Merhaba" gibi kısa bir metin parçası oluşturmayı ve maksimum yazı tipi boyutu öznitelik değerini 42 olarak korumayı deneyin. Ortaya çıkan sayfa nasıl görünecektir? Metin dikey olarak ortalanmış mı? Veya [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) etiketinin yüksekliği maksimum yazı tipi boyutuna uyacak şekilde küçülüyor mu? AMP'nin yerleşim sistemi hakkında zaten bildiklerinizi kullanarak, kodla oynamadan önce soruyu yanıtlamaya çalışın!

[`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) hakkında daha fazla bilgiyi [AMP by Example'ın canlı demosundan](../../../../documentation/examples/documentation/amp-fit-text.html) öğrenebilirsiniz.
