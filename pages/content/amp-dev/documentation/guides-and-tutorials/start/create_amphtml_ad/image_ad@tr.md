---
'$title': Görüntü reklamı oluşturma
$order: 1
description: 'Reklamımız, reklamı yapılan siteye bağlantı içeren basit bir görüntüdür. Görüntüyü amp-img etiketini kullanarak göstereceğiz. Kod aşağıdadır: ...'
---

AMPHTML reklam belgenizin `<body>` bölümüne HTML ve AMP etiketleri ekleyebilirsiniz; ancak tüm etiketlere izin verilmez. İzin verilen etiketlerin listesi için [AMPHTML reklam teknik özelliklerine](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins) bakın.

Reklamımız, reklamı yapılan siteye bağlantı içeren basit bir görüntüdür. Görüntüyü [`amp-img`](../../../../documentation/components/reference/amp-img.md) etiketini kullanarak göstereceğiz. Kod aşağıdadır:

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img
      width="300"
      height="250"
      alt="Learn amp"
      src="/static/img/docs/ads/amp-300x250.png"
    ></amp-img>
  </a>
</body>
```

Tarayıcınızda html dosyanızı açarsanız, aşağıdaki görüntüyü göreceksiniz:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Görüntü reklamına tıklarsanız, sizi reklamı yapılan siteye (yani AMP Projesi sitesine) götürür.
