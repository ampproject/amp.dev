---
'$title': Ortak öğe nitelikleri
$order: 1
description: AMP, birçok AMP bileşenine (ve HTML öğelerine) genişletilmiş bir dizi ortak öznitelik sağlar. Bu belgede, ortak özniteliklerin her biri açıklanmaktadır.
toc: 'true'
---

AMP, birçok AMP bileşenine (ve HTML öğelerine) genişletilmiş bir dizi ortak öznitelik sağlar. Bu belgede, ortak özniteliklerin her biri açıklanmaktadır.

## fallback

Fallback (yedek), öğenin okuyucuya, tarayıcının öğeyi desteklemediğini veya temeldeki kaynağı yüklemenin başarısız olduğunu bildirmesine izin veren bir kuraldır. `fallback` özniteliği, yedekleri destekleyen bir AMP öğesinin doğrudan alt öğesi olan herhangi bir HTML öğesine yerleştirilebilir. Fallback ile ilgili kesin davranış, öğenin uygulanmasına bağlıdır, ancak tipik olarak fallback öğesi, normal öğenin yerine gösterilecektir.

Genellikle şunlarla kullanılır: resimler, animasyonlar, ses ve videolar

Örnek:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
```

Daha fazla bilgi için, [Yer tutucular ve yedekler](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) bölümüne bakın.

## heights

`responsive` yerleşimi destekleyen tüm AMP öğeleri, aynı zamanda `heights` özniteliğini de destekler. Bu özniteliğin değeri, medya ifadelerine dayalı bir sizes ifadesidir, [`img` etiketlerindeki sizes özniteliğine](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) benzerdir, ancak iki temel fark vardır:

1. Değer, öğenin genişliğine değil, yüksekliğe uygulanır.
2. Yüzde değerlerine izin verilir. Yüzde değeri, öğenin genişliğinin yüzdesini gösterir. Örneğin, `80%` değeri, öğenin yüksekliğinin öğe genişliğinin %80'i olacağını belirtir.

Not: `heights` özniteliği `width` ve `height` birlikte belirtildiğinde, `layout` varsayılan olarak `responsive` şekilde ayarlanır.

Örnek:

```html
<amp-img
  src="amp.png"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

Daha fazla bilgi için [srcset, boyutlar ve yüksekliklerle sanat yönetmenliği](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md) bölümüne bakın.

## layout

AMP, belge yerleşiminde bir AMP bileşeninin nasıl davranacağını belirten bir dizi [yerleşim](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) biçimi sunar. `layout` özniteliğini öğe için desteklenen yerleşim değerlerinden biriyle birlikte ekleyerek bir bileşen için bir yerleşimi belirleyebilirsiniz (hangi değerlerin desteklendiğini öğrenmek için öğenin belgelerine bakın).

Örnek:

```html
<amp-img
  src="/img/amp.jpg"
  width="1080"
  height="610"
  layout="responsive"
  alt="an image"
>
</amp-img>
```

Daha fazla bilgi için [Yerleşim ve Medya sorguları](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) ve [Yerleşim Teknik Özellikleri](amp-html-layout/index.md) bölümlerine bakın.

## media <a name="media"></a>

Çoğu AMP öğesi, `media` özniteliğini destekler. `media` değeri bir medya sorgusudur. Sorgu eşleşmezse, öğe oluşturulmaz ve kaynaklar ve potansiyel olarak alt kaynaklar getirilmez. Tarayıcı penceresinin boyutu veya yönü değişirse, medya sorguları yeniden değerlendirilir ve öğeler gizlenir ve yeni sonuçlara göre gösterilir.

Örnek:

```html
<amp-img
  media="(min-width: 650px)"
  src="wide.jpg"
  width="466"
  height="355"
  layout="responsive"
></amp-img>
<amp-img
  media="(max-width: 649px)"
  src="narrow.jpg"
  width="527"
  height="193"
  layout="responsive"
></amp-img>
```

Daha fazla bilgi için [Yerleşim ve Medya sorguları](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries) bölümüne bakın.

## noloading

`noloading` özniteliği, ilgili öğe için "yükleme göstergesinin" **kapatılıp kapatılmayacağını** belirtir. Çoğu AMP öğesi, öğenin henüz tam olarak yüklenmediğini gösteren temel bir animasyon olarak bir "yükleme göstergesi" gösterir.

Genellikle şunlarla kullanılır: resimler, animasyonlar, videolar ve reklamlar

Örnek:

```html
<amp-img src="card.jpg" noloading height="190" width="297" layout="responsive">
</amp-img>
```

## on

`on` özniteliği, öğelerde olay işleyicisi yüklemek için kullanılır. Desteklenen olaylar, öğelere bağlıdır.

Genellikle şunlarla kullanılır: lightbox'lar, kenar çubukları, canlı listeler ve formlar

Sözdizimi:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

Örnek:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay"> ... </amp-lightbox>
```

Daha fazla bilgi için [AMP'de Eylemler ve Olaylar](amp-actions-and-events.md) bölümüne bakın.

## placeholder

`placeholder` özniteliği, bu öznitelikle işaretlenen öğenin üst AMP öğesi için bir yer tutucu görevi gördüğünü belirtir. Öznitelik, yer tutucuları destekleyen bir AMP öğesinin doğrudan alt öğesi olan herhangi bir HTML öğesine yerleştirilebilir. Varsayılan olarak yer tutucu, AMP öğesinin kaynakları indirilmemiş veya başlatılmamış olsa bile AMP öğesi için hemen gösterilir. AMP öğesi hazır olduğunda genellikle yer tutucusunu gizler ve içeriği gösterir. Yer tutucuya göre tam davranış, öğenin uygulanmasına bağlıdır.

Genellikle şunlarla kullanılır: resimler, animasyonlar, videolar ve reklamlar

Örnek:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

Daha fazla bilgi için, [Yer tutucular ve yedekler](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) bölümüne bakın.

## sizes

`responsive` yerleşimi destekleyen tüm AMP öğeleri, aynı zamanda `sizes` özniteliğini de destekler. AMP `sizes` özniteliğinin değeri, geçerli pencere boyutuna göre medya sorgusuna karşılık gelen tanımlı boyutu seçen bir sizes ifadesidir. <strong>Ayrıca AMP, öğedeki <code>width</code> için bir satır içi stil ayarlar</strong>.

Örnek:

```html
<amp-img
  src="amp.png"
  width="400"
  height="300"
  layout="responsive"
  sizes="(min-width: 320px) 320px, 100vw"
>
</amp-img>
```

Aşağıdaki iç içe geçmiş `img` etiketini üretecektir:

```html
<img
  decoding="async"
  src="amp.png"
  sizes="(min-width: 320px) 320px, 100vw"
  class="i-amphtml-fill-content i-amphtml-replaced-content"
/>
```

Daha fazla bilgi için [srcset, boyutlar ve yüksekliklerle sanat yönetmenliği](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md) bölümüne bakın.

## width ve height

Bazı [yerleşimler](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) için, AMP bileşenlerinin tamsayı piksel değerini içeren bir `width` ve `height` özniteliğine sahip olması gerekir.

Örnek:

```html
<amp-anim width="245" height="300" src="/img/cat.gif" alt="cat animation">
</amp-anim>
```

Daha fazla bilgi için [Yerleşim ve Medya sorguları](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) ve [Yerleşim Teknik Özellikleri](amp-html-layout/index.md) bölümlerine bakın.
