---
'$title': Üçüncü taraf saldırılarına karşı koruma
$order: 7
description: "AMP sayfalarınızı ve kullanıcılarınızı web'deki güvenlik açıklarından korumak için önlemler alın"
formats:
  - websites
author: CrystalOnScript
---

AMP sayfalarınızı ve kullanıcılarınızı web'deki güvenlik açıklarından korumak için önlemler alın. En uğursuz olanlardan biri [siteler arası komut dosyasıdır](https://www.google.com/about/appsecurity/learning/xss/) (XSS). XSS, saldırganın kullanıcılara görüntülenen HTML sayfalarına kötü amaçlı kod eklemesine izin verebilen bir güvenlik hatasıdır.

Kullanıcıları, bir [İçerik Güvenliği İlkesi (CSP)](https://csp.withgoogle.com/docs/index.html) benimseyerek bu tür saldırılara karşı koruyun. Google AMP Önbelleği gibi AMP Önbellekleri zaten sayfalarınıza CSP ekliyor! Ancak, kendi CSP'nizi eklemezseniz, kullanıcılar önbelleğe alınmış sürümü atladığında sayfalar bu ek koruma katmanından yoksun olur.

# AMP’nin CSP'sini uygulayın

Sayfalarınızın başına uygun meta etiketi ekleyerek bir CSP uygulayın. Aşağıda, sayfanıza yalnızca AMP komut dosyalarının eklenmesine izin veren AMP’nin CSP'si verilmiştir:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://ampjs.org/v0.js https://ampjs.org/v0/ https://ampjs.org/viewer/ https://ampjs.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://ampjs.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Tam örneği buradan görebilirsiniz](https://github.com/ampproject/amphtml/blob/main/examples/csp.amp.html).

[tip type="read-on"] [Güvenlik açıkları ve CSP'lerden korunma hakkında buradan](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) daha fazla bilgiyi edinebilirsiniz. [/tip]
