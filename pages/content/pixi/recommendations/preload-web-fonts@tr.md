---
$title: Web yazı tiplerini önceden yükleyin
$order: 140
tags:
- lcp
---

Önceden yükleme, tarayıcıya mümkün olan en kısa sürede yüklemek istediğiniz kritik kaynaklar hakkında bilgi vermenizi sağlar. Hatta bunlar HTML'de keşfedilmeden önce bile! Bu, yazı tipleri gibi ilk görünüm alanında ve sayfanın tamamında kullanılan kaynaklar için özellikle harikadır. Bunu, aşağıdaki gibi, bu kaynaklara `rel="preload"` özniteliğini ekleyerek yapın:

```
<link href="font.woff2" rel="preload">
```
