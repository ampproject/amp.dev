---
"$title": Etkileşimi geliştirme
"$order": '2'
description: 'Başlangıç kodu oldukça basit bir kullanıcı deneyimi sağlar. Bunu iyileştirmenin birkaç yolu var\: - Geçerli slaydı ve toplam slayt sayısını gösteren bir gösterge ekleyin.'
---

Başlangıç kodu oldukça basit bir kullanıcı deneyimi sağlar. Bunu iyileştirmenin birkaç yolu var:

- Geçerli slaydı ve toplam slayt sayısını gösteren bir gösterge ekleyin.
- Kullanıcı farklı bir gömlek rengi seçtiğinde, gömlek resimlerini seçilen renkte göstermek için resim döngüsünü değiştirin.

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) bileşeninin tanıtımından önce, bunun gibi özellikler eklemek mümkün değildi. [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) ile uygulamalı bir deneyim yaşayalım ve bu yeni özellikleri örnek kodumuza ekleyelim!

## `amp-bind` bileşenini yükleme

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md), veri bağlama ve JS benzeri ifadeler yoluyla özel etkileşim sağlayan bir AMP bileşenidir. [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) kullanmak için, onu sayfaya yüklemelisiniz.

[`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) dosyasını açın ve aşağıdaki komut dosyasını sayfanın `<head>` bölümündeki AMP bileşenleri listesine ekleyin:

```html
<script async custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

## Slayt göstergesi ekleme

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md), öğe özniteliklerini özel ifadelere bağlayarak çalışır. Bu ifadeler "duruma" (değiştirilebilir JSON verileri) referans verebilir. Bu durumu [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)'in içerdiği [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) bileşeni aracılığıyla başlatabiliriz.

### Slayt durumunu başlatma

Resim döngüsünde halihazırda görüntülenen slaydın dizinini takip etmek için bir durum değişkenini başlatalım. [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) dosyasını açın ve sayfanın `<body>` üst kısmına aşağıdakileri ekleyin (`<header>` öncesi):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) öğelerindeki verilere, ilişkili ID ile erişilebilir. Örneğin, bu değişkene aşağıdaki ifade parçası ile başvurabiliriz:

```javascript
selected.slide // Evaluates to 0.
```

### Slayt durumunu güncelleme

Ardından, kullanıcı mevcut [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) öğesine aşağıdaki `"on"` eylemini ekleyerek resim döngüsü üzerindeki slaytları değiştirdiğinde bu değişkeni güncelleyelim:

```html
<amp-carousel type="slides" layout="fixed-height" height=250 id="carousel"
    on="slideChange:AMP.setState({selected: {slide: event.index}})">
```

Şimdi, [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) için görüntülenen slayt değiştiğinde, `AMP.setState` eylemi aşağıdaki bağımsız değişkenle çağrılacaktır:

```javascript
{
  selected: {
    slide: event.index
  }
}
```

`event.index` ifadesi, yeni slayt dizini olarak değerlendirilir ve  `AMP.setState()` eylemi, bu nesneyi gerçek durumuyla birleştirir. Bu, `selected.slide`'in geçerli değerini `event.index` değeriyle değiştirir.

[tip type="tip"] **İPUCU –** `AMP.setState()`, iç içe geçmiş nesne değişmezlerinin derin bir birleşimini gerçekleştirir. Daha fazla ayrıntı için [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) belgelerine bakın. [/tip]

### Gösterge öğelerini bağlama

Ardından, şu anda görüntülenen slaytı izleyen bu durum değişkenini kullanalım ve bir slayt göstergesi oluşturalım. Slayt göstergesi öğesini (`<!-- TODO: "Add a slide indicator" -->` için) bulun ve alt öğelerine aşağıdaki bağları ekleyin:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]`, `class` özniteliğini değiştiren bir bağdır ve herhangi bir öğeden CSS sınıfları eklemek veya kaldırmak için kullanabilirsiniz.

**Deneyin**: Sayfayı yenileyin ve slaytı değiştirin!

Resim döngüsündeki slaydı değiştirerek:

1. `slideChange event` tetikler...
2. Bu `AMP.setState` eylemini çağırıyor...
3. `selected.slide` durum değişkenini günceller...
4. `<span>` eleman göstergesindeki `[class]` bağını günceller!

Güzel! Şimdi çalışan bir slayt göstergemiz var.

[tip type="success"]

Bir kullanıcı bir slaydın gösterge noktasına dokunduğunda, resim döngüsünün seçilen öğeyle güncellemesi için işlevsellik ekleyip ekleyemeyeceğinizi görün. Bir ipucu olarak, [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) üzerindeki `tap` olayını ve `[slide]` bağlamasını kullanın.

[/tip]

## Resim döngülerini değiştirme

Seçilen rengi değiştirdiğimizde farklı gömlek renklerinin resimlerini görebilseydik güzel olurdu. Bunu [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) ile, `[src]`'yi <a><code>amp-carousel</code></a> içindeki [`amp-img`](../../../../documentation/components/reference/amp-carousel.md) öğelerine bağlayarak yapabiliriz.

### SKU durumunu başlatma

İlk olarak, durum verilerini her renkli gömleğin görüntü kaynak URL'leri ile başlatmamız gerekir. Bunu yeni bir [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) öğesi ile yapalım:

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

Bu [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) öğesi, bir gömlek tanımlayıcı dizesini (yani bir SKU) ilgili gömleğin renk ve görüntü URL'sine eşleyen bir JSON nesnesi içerir. Bir JSON dizisi de burada çalışır, ancak bir nesne kullanmak, yakında göreceğiniz bazı harika şeyler yapmamızı sağlar.

Artık görüntü URL'sine bir gömlek tanımlayıcısı aracılığıyla erişebiliriz. Örneğin, `shirts['10014'].color` `"dark green"` olarak değerlendirilir ve `shirts['10030'].image ` `"wine"` rengi gömlek için görüntü URL'sini döndürür.

### Seçili SKU'yu izleme

Seçilen SKU'yu izleyen başka bir durum değişkeni eklersek, seçilen SKU değiştiğinde `src` özniteliklerini güncellemek için bir ifadeyi [`amp-img`](../../../../documentation/components/reference/amp-img.md) öğelerine bağlayabiliriz. Mevcut `amp-state#selected` öğesinin JSON'ununa yeni bir `sku` anahtarı ekleyin:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### SKU durumunu güncelleme

[`amp-selector`](../../../../documentation/components/reference/amp-selector.md)'e, yeni bir renk seçildiğinde `selected.sku` değişkenini güncelleyen bir "on" eylemi ekleyin:

```html
<amp-selector name="color"
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

[tip type="tip"] **İPUCU –** Bu, [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) içindeki her bir [`amp-img`](../../../../documentation/components/reference/amp-img.md) alt öğesine `on="tap:AMP.setState(...)` eylemleri eklenerek de yapılabilir. [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) ile ilgili harika şeylerden biri, bu gibi şekillerde işaretlemeyi basitleştirmesidir. [/tip]

### Görüntü öğelerini bağlama

Ardından, [`amp-img`](../../../../documentation/components/reference/amp-img.md)'e bağlar ekleyin:

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

[tip type="note"] **NOT –**  Uygulamada, resim döngüsü içindeki her görüntü muhtemelen farklı bir `src` sahip olacaktır. Bu, tek görüntüyü bir dizi görüntü ile değiştirerek yapılabilir. Basit olması için, bu öğretici farklı büyütmelerde tek bir görüntü kullanır. [/tip]

**Deneyin**: Sayfayı yenileyin ve gömlek için farklı bir renk seçin. Bunu yaptığınızda, resim döngüsündeki görüntüler seçilen renkteki gömlekleri gösterecek şekilde güncellenir.
