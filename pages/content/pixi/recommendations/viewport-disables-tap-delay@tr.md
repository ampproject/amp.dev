---
'$title': Dokunma gecikmesini devre dışı bırakma
$order: 50
tags:
  - fid
---

FID'yi artırabilecek dokunma gecikmesini devre dışı bırakmak için görüntü alanı genişliğini cihaz genişliğiyle eşleşecek şekilde ayarlayın. Bu 300-350msn dokunma gecikmesini kaldırmak için, sayfanızın `<head>` kısmındaki görüntü alanı bildirimini şu şekilde değiştirin:

```
<meta name="viewport" content="width=device-width">
```

Bu işlem, görüntü alanı genişliğini cihazla aynı olacak şekilde ayarlar ve genellikle mobil cihazlar için optimize edilmiş siteler için en iyi uygulamadır. [Dokunma gecikmesini devre dışı bırakma hakkında daha fazla bilgiyi web.dev adresinde okuyabilirsiniz](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
