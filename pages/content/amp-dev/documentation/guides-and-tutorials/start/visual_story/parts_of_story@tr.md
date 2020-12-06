---
"$title": Bir AMP hikayesinin bölümlerini anlama
"$order": '2'
description: Web Hikayesi, bilgileri görüntüler, videolar, grafikler, ses ve daha fazlasıyla aktaran tam ekran bir görsel hikaye anlatma deneyimidir. Küçük boyutlu, görsel açıdan zengin içerik isteyen...
author: bpaduch
---

Web Hikayesi, bilgileri görüntüler, videolar, grafikler, ses ve daha fazlasıyla aktaran tam ekran bir görsel hikaye anlatma deneyimidir. Küçük boyutlu, görsel açıdan zengin içerik isteyen kullanıcılar için mükemmeldir.

Bir Web Hikayesinde bulunan temel bileşenler ayrı **sayfalardır**. Bu sayfalar da, temel HTML ve AMP **öğelerini** içeren ayrı **katmanlardan** oluşur.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Bu bileşenlerin her biri, hikayenin [`amp-story`](../../../../documentation/components/reference/amp-story.md) ile temsil edildiği, sayfanın `amp-story-page` ile temsil edildiği ve katmanların `amp-story-grid-layer` ile temsil edildiği AMP bileşenlerine çevrilir.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Web Hikayemizi [`amp-story`](../../../../documentation/components/reference/amp-story.md) kapsayıcıyla oluşturmaya başlayalım.
