---
'$title': Melacak penayangan iklan
$order: 2
description: Di dalam iklan HTML AMP, Anda dapat melacak metrik dengan menggunakan komponen amp-pixel atau amp-analytics. Di dalam sampel dasar, kita akan menambahkan kemampuan untuk melacak tampilan halaman ....
---

Di dalam iklan HTML AMP, Anda dapat melacak metrik dengan menggunakan komponen [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) atau [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Di dalam sampel dasar, kita akan menambahkan kemampuan untuk melacak tampilan halaman dengan komponen [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) dan mengarahkan ke URL yang mencatat riwayat tampilan halaman (di dalam hal ini, URL khayal):

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

Begitu saja, Anda sudah membuat iklan HTML AMP Anda!

Sebelum mengunggah iklan Anda ke server iklan Anda, ada satu langkah terakhir yang harus Anda lakukan—memastikan bahwa sintaksis Anda valid.
