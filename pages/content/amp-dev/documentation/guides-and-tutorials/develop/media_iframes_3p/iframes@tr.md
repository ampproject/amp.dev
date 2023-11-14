---
'$title': "iframe'leri ekleme"
$order: 10
description: "Sayfalarınıza eklenen medya içeriğini nasıl görüntüleyeceğinizi ve gelişmiş içeriği AMP sınırlamalarının dışında görüntülemek için iframe'leri nasıl kullanacağınızı öğrenin."
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Temel bilgiler

[`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) bileşenini kullanarak sayfanızda bir iframe görüntüleyebilirsiniz.

Iframe'ler, AMP'de, kullanıcı tarafından yazılan JavaScript gerektiren içerikler gibi ana sayfa bağlamında desteklenmeyen içerikleri görüntülemek için özellikle yararlıdır.

### `amp-iframe` için gereklilikler

- En az **600 piksel** veya en üstten uzak olarak ilk görüntü alanının **%75'i** kadar olmalıdır ([`placeholder`](#using-placeholders) kullanan iframe'ler hariç).
- Kaynakları yalnızca HTTPS aracılığıyla talep edebilir ve aynı kök kaynağa izin vermeyi belirtmedikleri müddetçe kapsayıcıyla aynı başlangıç noktasında olmamalıdır.

[tip type="read-on"] **OKUMAYA DEVAM EDİN -** [`amp-iframe` özelliklerinin tamamı hakkında](../../../../documentation/components/reference/amp-iframe.md) daha fazla bilgi edinin. [/tip]

### Betik ekleme

Sayfanıza bir [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) eklemek için, önce aşağıdaki betiği `<head>` dahil edin; bu betik, genişletilmiş bileşen için ek kodu yükler:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Biçimlendirme yazma

Aşağıdaki örnekte, [Google Maps Embed API](../../../../documentation/components/reference/amp-iframe.md) aracılığıyla bir Google Haritasını yerleştirmek için duyarlı bir <a><code>amp-iframe</code></a> oluşturduk:

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## Yer tutucuları kullanma <a name="using-placeholders"></a>

[`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) , iframe hazır olana kadar yer tutucu olarak görüntülenecek `placeholder` özniteliğine sahip bir öğe (örneğin, bir [`amp-img`](../../../../documentation/components/reference/amp-img.md) öğesi) içermesi koşuluyla, bir belgenin üstünde bir [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) görüntüleyebilirsiniz.

[tip type="read-on"] **OKUMAYA DEVAM EDİN -**: [Yer tutuculu iframe'deki](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder) yer tutucular hakkında daha fazla bilgi edinin. [/tip]

Yer tutuculu örnek:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

Şu şekilde oluşturulur:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Örnekler

Daha gelişmiş [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) örneklerini [AMP By Example](../../../../documentation/examples/documentation/amp-iframe.html) içinde bulabilirsiniz.
