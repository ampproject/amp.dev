---
'$title': Memahami bagian dari cerita AMP
$order: 2
description: Sebuah Cerita Web adalah pengalaman bercerita dengan visual dan layar penuh yang menyampaikan informasi dengan gambar, video, grafik, audio, dan masih banyak lagi. Ini sangat cocok bagi pengguna ....
author: bpaduch
---

Sebuah Cerita Web adalah pengalaman bercerita dengan visual dan layar penuh yang menyampaikan informasi dengan gambar, video, grafik, audio, dan masih banyak lagi. Ini sangat cocok bagi pengguna yang menginginkan konten berukuran mungil dengan visual yang kaya.

Bahan-bahan dasar yang digunakan di dalam sebuah Cerita Web adalah **halaman-halaman** terpisah. Halaman-halaman ini, pada gilirannya, terdiri atas **lapisan-lapisan** terpisah yang berisi **elemen-elemen** HTML dan AMP dasar.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Masing-masing bahan tersebut diterjemahkan menjadi komponen AMP, di mana cerita diwakili oleh [`amp-story`](../../../../documentation/components/reference/amp-story.md), halaman ini diwakili oleh `amp-story-page`, dan lapisan diwakili oleh `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Mari mulai membuat Cerita Web kita dengan wadah [`amp-story`](../../../../documentation/components/reference/amp-story.md).
