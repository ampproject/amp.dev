---
'$title': Resim döngüsü ekleme
$order: 3
description: Mobil sayfalardaki diğer bir yaygın özellik de resim döngüsüdür. amp-carousel bileşenini kullanarak AMP sayfalarına kolayca resim döngüleri ekleyebilirsiniz.
---

Mobil sayfalardaki diğer bir yaygın özellik de resim döngüsüdür. [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) bileşenini kullanarak AMP sayfalarına kolayca resim döngüleri ekleyebilirsiniz. Görüntülerin döngüsü gibi basit bir örnekle başlayalım.

## Basit resim döngüsü

Belgenizin `<head>` etiketine aşağıdaki JavaScript isteğini **ekleyerek** [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) bileşen kitaplığını eklemeyi unutmayın:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

Ardından, duyarlı bir yerleşim ve önceden tanımlanmış bir genişlik ve yükseklik ile basit bir resim döngüsü yerleştirelim. Sayfanıza aşağıdakileri **ekleyin**:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

Sayfanızı **yenileyin** ve bir resim döngüsü görmelisiniz:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

[`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) bileşeni çeşitli şekillerde yapılandırılabilir. Kullanıcı arayüzünü bir seferde yalnızca tek bir görüntü gösterecek şekilde değiştirelim ve resim döngüsü yerleşimini duyarlı hale getirelim.

Bunu yapmak için, önce [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) `type` `carousel` `slides` **değiştirin**, `layout` `responsive` olarak değiştirin ve `width` 300 olarak **ayarlayın** (hem yükseklik hem de genişlik tanımlı olduğundan emin olun). [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) [`amp-img`](../../../../documentation/components/reference/amp-img.md) alt öğelerine `"layout=responsive"` özniteliğini **ekleyin**.

Sayfanızı **yeniden yükleyin**. Şimdi, kaydırma öğeleri listesi yerine, her seferinde bir öğe göreceksiniz. Öğeler arasında hareket etmek için parmağınızı yatay olarak **kaydırmayı** deneyin. Üçüncü öğeye hızlıca kaydırırsanız, daha fazla kaydıramazsınız.

Ardından, `loop` özniteliğini **ekleyin**. Sayfayı **yenileyin** ve hemen sola kaydırmayı deneyin. Resim döngüsü durmadan döngü yapar.

Son olarak, bu atlı karıncayı 2 saniyede bir otomatik oynatalım. `autoplay` özniteliğini ve `delay` özniteliğini `2000` değeriyle (ör. `delay="2000"`) [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)'e <strong>ekleyin</strong>.

Nihai sonucunuz böyle bir şeye benzemelidir:

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

Sayfayı **yenileyin** ve onu döndürün!

[tip type="note"] **NOT –** [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) `carousel` türüne sahip olduğunda, `fixed-height` yerleşim türünü kullandığımızı fark etmiş olabilirsiniz. `carousel` türü için desteklenen yerleşim türleri sınırlıdır. Örneğin, `carousel` türü `responsive` yerleşimi desteklemez. Adından da anlaşılacağı gibi, sabit yükseklikteki elemanlar mevcut alanı kaplar, ancak yüksekliği değişmeden tutar. Sabit yükseklikteki öğeler için, `height` özniteliğini tanımlamanız gerekir, ancak `width` özniteliği `auto` olmalı veya ayarlanmamalıdır. [/tip]

## Karma resim döngüsü içeriği

Resim döngüsü harika, ama resim döngüsü içinde daha karmaşık içeriğin görünmesini istiyorsak ne olur? Bir reklamı, bir metni ve bir resmi tek bir resim döngüsü içine yerleştirerek işleri biraz karıştırmaya çalışalım. [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) böyle bir karışımı gerçekten aynı anda idare edebilir mi? Kesinlikle!

İlk olarak, [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) ve [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) bileşenlerinin birlikte güvenli bir şekilde çalışmasını sağlamak için bu stili `<style amp-custom>`'a **ekleyelim**:

```css
amp-fit-text {
  white-space: normal;
}
```

Şimdi basit resim döngünüzü bununla **değiştirin**:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

Sayfayı **yenileyin** ve böyle bir şey görmelisiniz:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='A carousel of mixed content') }}

Daha fazla bilgi için [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) bileşen referans belgelerine bakın.

[tip type="note"] **NOT –** Son örneğimizde, [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bileşeninin `placeholder` özniteliğine sahip bir alt `div` öğesi içerdiğini fark etmiş olabilirsiniz. Öğreticide daha önce, bir `fallback` kullanarak [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) ile benzer bir senaryoyla karşılaştık. Yer tutucu ve geri dönüş arasındaki fark nedir? `Fallback` öğeler, üst öğe yüklenemediğinde, yani kullanılabilir reklam yoksa görünür. `placeholder` öğeler, yüklenirken ana öğenin yerine görünür. Bir anlamda, bu öğeler ana öğenin yükleme işlemini kaydeder. Daha fazla bilgiyi [Yer tutucular ve geri dönüşler](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) kılavuzundan öğrenebilirsiniz. [/tip]
