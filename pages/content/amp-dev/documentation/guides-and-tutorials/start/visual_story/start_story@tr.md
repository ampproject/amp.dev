---
"$title": Hikayemize başlama
"$order": '3'
description: Tüm bir Web Hikayesi, bir hikayedeki tüm sayfalar için kapsayıcı görevi gören amp-story bileşeniyle temsil edilir. amp-story bileşeni ayrıca, hareketleri...
author: bpaduch
---

Tüm bir Web Hikayesi, bir hikayedeki tüm sayfalar için kapsayıcı görevi gören [`amp-story`](../../../../documentation/components/reference/amp-story.md) bileşeniyle temsil edilir. [`amp-story`](../../../../documentation/components/reference/amp-story.md) bileşeni ayrıca, hareketleri ve gezinmeyi işleme dahil kullanıcı arayüzü kabuğunun oluşturulmasından da sorumludur.

[`amp-story`](../../../../documentation/components/reference/amp-story.md) bileşeni, özel bir AMP bileşenidir ve tüm özel bileşenler gibi, ilişkili betiği bileşen için AMP belgesine eklemeniz gerekir.

<code>pets.html</code> dosyasını metin düzenleyicinizde <strong>açın</strong> ve `<head>` bölümünde aşağıdaki betiği **ekleyin** :

```html
<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
</head>
```

Belgenizin `<body>` bölümüne `<amp-story>` öğesini **ekleyin** ve zorunlu `standalone` özniteliğini şu şekilde belirtin:

```html
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

Geçerli bir AMP hikayesine sahip olmak için `<body>` öğesinin yalnızca bir alt öğesinin olması gerektiğini unutmayın: [`amp-story`](../../../../documentation/components/reference/amp-story.md) bileşeni; diğer tüm öğeler [`amp-story`](../../../../documentation/components/reference/amp-story.md) içinde yer alır.

## Meta bilgi sunma

Hikayelerin web'de keşfedilmesi adına, hikayenin mini ayrıntılarını sunmak için belirli meta veriler gereklidir, örneğin:

- `title` özniteliğiyle temsil edilen hikaye başlığı (mesela, "Joy of Pets").
- `publisher` özniteliğiyle temsil edilen yayıncı adı (mesela, "AMP öğreticileri").
- `publisher-logo-src` özniteliğiyle temsil edilen yayıncı logosu.  Bu logo, 1x1 en boy oranıyla kare biçimli bir logo resmi URL'sidir.
- `poster-portrait-src` özniteliğiyle temsil edilen, hikayenin poster görüntüsü. Bu bir poster URL'sidir ve resim, 3x4 en boy oranına sahip dikey biçimde olmalıdır.

Bu öznitellikleri [`amp-story`](../../../../documentation/components/reference/amp-story.md) içine ekleyelim:

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

Bu gerekli özniteliklere ek olarak, uygulayabileceğiniz başka öznitelikler de vardır. Daha fazla bilgi edinmek için [<code>amp-story</code>](../../../../documentation/components/reference/amp-story.md#attributes) referans belgelerinin <a>öznitelikler</a> bölümüne bakın.

[tip type="note"] **NOT -** Bu meta veri öznitelikleri sayfadaki Yapılandırılmış Verileri (örneğin JSON-LD) tamamlar ve bunların yerini almaz. Web Hikayelerinizin tüm platformlarda keşfedildiğinden emin olmak için AMP hikayeleri dahil tüm AMP sayfalarınıza [Yapılandırılmış Veriler](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) eklemelisiniz. [/tip]

Bu noktada, içeriği olmayan bir hikaye kabuğuna sahibiz. Şimdi bu sayfayı oluşturalım.
