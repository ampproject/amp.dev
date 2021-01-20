---
"$title": Srcset, boyutlar ve yüksekliklere sahip duyarlı resimler
"$order": '4'
description: Bir öğenin varlıklarını değişen medya ifadelerine göre kontrol etmek için srcset özniteliğini kullanın. Özellikle, bunu, değişen ekran boyutlarına göre...
formats:
- websites
- email
- ads
- stories
components:
- iframe
author: pbakaus
contributors:
- bpaduch
---

## srcset

Bir öğenin varlıklarını değişen medya ifadelerine göre kontrol etmek için `srcset` özniteliğini kullanın. Özellikle, bunu, değişen ekran boyutlarına göre hangi resim öğelerinin kullanılacağını belirtmek için tüm [`amp-img`](../../../../documentation/components/reference/amp-img.md) etiketlerinde kullanın. AMP, `<amp-img>` bir `srcset` içeriyor ancak `sizes` içermiyorsa, `<amp-img>` bileşeninde altta yatan tüm `<img>` etiketleri için <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img" data-md-type="link">HTML5 `sizes` tanımını karşılayan</a> bir  `sizes` özniteliğini otomatik olarak oluşturacaktır.

Bu basit örnekte `srcset` , ekran genişliğine bağlı olarak hangi görüntünün kullanılacağını belirtir. `w` tanımlayıcısı, tarayıcıya listedeki her görüntünün genişliğini söyler:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

[tip type="note"] **NOT -** AMP, tüm tarayıcılarda `w` tanımlayıcısı ile srcset'i destekler. [/tip]

<a>Duyarlı Görüntüleri Kullanma (Şimdi)</a> bölümünde <code>srcset</code> kullanarak duyarlı görüntüler oluşturma hakkında daha fazla bilgi edinin.

## sizes (boyutlar)

`srcset` ile birlikte isteğe bağlı AMP `sizes` özniteliğini de kullanabilirsiniz. AMP `sizes` özniteliği, herhangi bir medya ifadesine göre öğe boyutunun nasıl hesaplanacağını açıklar. <strong data-md-type="raw_html">Herhangi bir AMP Öğesinde `sizes` tanımlanması, AMP'nin, eşleşen medya sorgusuna göre bu öğedeki genişlik için bir satır içi stil ayarlamasını tetikler. </strong>Öğenin hesaplanan boyutuna bağlı olarak, kullanıcı aracısı `srcset` özniteliği tarafından sağlanan en göreli kaynağı seçer.

Aşağıdaki örneği düşünün:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

`sizes` özniteliği, görüntü alanı 650 piksel veya daha fazla olduğunda öğenin genişliğini görüntü alanının boyutunun %50'si olacak şekilde tanımlar. Örneğin, görüntü alanı 800 piksel ise, öğenin genişliği 400 piksel olarak ayarlanır. Tarayıcı daha sonra, cihazın piksel oranının 1 olduğunu varsayarak 400px'e göre `srcset` kaynağını seçer, bu örnekte `hummingbird-dar.jpg` (320px).

[tip type="important"] **ÖNEMLİ -**Boyutlar özniteliği genişlik ve yükseklikle birlikte belirtildiğinde, yerleşim varsayılan olarak `responsive`. [/tip]

[AMP `sizes` özniteliği hakkında daha fazlasını buradan okuyabilirsiniz](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

## heights (yükseklikler)

`responsive` yerleşimine izin veren tüm AMP özel öğeleri, aynı zamanda `heights` özniteliğini de destekler. Bu özniteliğin değeri, [img sizes özniteliğine](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) benzer şekilde medya ifadelerine dayalı bir boyut ifadesidir, ancak iki temel fark vardır:

1. Bu, öğenin genişliğine değil yüksekliğine uygulanır.
2. Yüzde değerlerine izin verilir, örneğin `%86`. Yüzde değeri kullanılırsa, öğe genişliğinin yüzdesini gösterir.

`heights` özniteliği `width` ve `height` ile birlikte belirtildiğinde, `layout` varsayılan olarak `responsive` olarak ayarlanır.

Bir örnek:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

Bu örnekte, öğenin yüksekliği varsayılan olarak genişliğin %80'i olacaktır, ancak `500px`'den daha geniş olan görüntü alanı için `200px` ile sınırlanacaktır.
