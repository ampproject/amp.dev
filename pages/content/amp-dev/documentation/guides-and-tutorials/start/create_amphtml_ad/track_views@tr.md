---
'$title': Reklam görüntülemelerini izleme
$order: 2
description: AMPHTML reklamlarında, amp-pixel veya amp-analytics bileşenlerini kullanarak metrikleri izleyebilirsiniz. Temel örneğimizde, amp-pixel bileşeniyle sayfa görüntülemelerini izleme...
---

AMPHTML reklamlarında, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) veya [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) bileşenlerini kullanarak metrikleri izleyebilirsiniz. Temel örneğimizde, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) bileşeniyle sayfa görüntülemelerini izleme özelliğini ekleyeceğiz ve sayfa görüntülemelerini kayıt günlüklerine kaydeden bir URL'ye (bu durumda, hayali bir URL) yönlendireceğiz:

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
  <amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

Hepsi bu kadar; AMPHTML reklamınızı oluşturdunuz!

Reklamınızı reklam sunucunuza yüklemeden önce, atmanız gereken son bir adım var - sözdiziminizin geçerliliğinden emin olmak.
