---
"$title": Yazı tipi ekleme
"$order": '6'
description: 'AMP sayfanıza özel yazı tiplerini iki şekilde yerleştirebilirsiniz: 1. Bir <link> etiketi aracılığıyla: yalnızca izin verilen yazı tipi sağlayıcıları için. ...'
---

AMP'de, belgelerin yükleme sürelerini mümkün olduğunca hızlı tutmak için harici stil sayfalarını ekleyemezsiniz. Ancak, bu kuralın bir istisnası vardır. **Yazı tipleri**.

AMP sayfanıza özel yazı tiplerini iki şekilde yerleştirebilirsiniz:

1. Bir `<link>` etiketi aracılığıyla: yalnızca izin verilen yazı tipi sağlayıcıları için.
2. `@font-face` CSS kuralını kullanarak: herhangi bir kısıtlama yoktur, tüm yazı tiplerine izin verilir.

Bu öğreticide, sayfamıza yazı tipleri eklemek için bir `<link>` etiketi kullanacağız. Raleway yazı tipini istemek için <code><head></code> dosyasına bir stil sayfası bağlantısı **ekleyin**:

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway">
```

Şimdi, CSS `body` seçicinizi Raleway'e bir referans içerecek şekilde **güncelleyin**:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

Sayfanızı **yenileyin** ve sayfanızın yeni görünümünü kontrol edin. Ayrıca, AMP doğrulayıcının çıkışını kontrol edin. Bu dış stil sayfası isteği için herhangi bir hata olmamalıdır.

[tip type="note"] Web yazı tipleri, aksi takdirde hızlı bir AMP sitesinde bile bir web sitesinin performansına zararlı olabilir. Yazı tiplerinizin yükleme davranışını optimize etmek için [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) CSS özelliğini kullanın. [/tip]

AMP haber makalenizi tamamladınız! İşte nasıl görünmesi gerektiği burada:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}
