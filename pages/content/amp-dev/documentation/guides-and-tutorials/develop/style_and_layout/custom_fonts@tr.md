---
'$title': Özel yazı tipleri ekleme
$order: 6
description: AMP sayfaları, özel yazı tipleri dışında harici stil sayfaları içeremez. Özel yazı tiplerini sayfanıza iki şekilde gömebilirsiniz...
formats:
  - websites
  - ads
  - stories
author: pbakaus
---

AMP sayfaları, özel yazı tipleri dışında harici stil sayfaları içeremez. Özel yazı tiplerini sayfanıza iki şekilde gömebilirsiniz:

1. Bir `<link>` etiketi aracılığıyla (yalnızca izin verilen listelenen yazı tipi sağlayıcıları)
2. `@font-face` aracılığıyla (kısıtlama yoktur, tüm yazı tiplerine izin verilir)

### 1. `<link>` kullanma

Aşağıdaki gibi bir `<link>` etiketi (genellikle sayfanızın başında) kullanın:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Aşağıdaki kaynakların listesine izin verilir ve bağlantı etiketleri aracılığıyla yazı tipi sunmalarına olanak verilir:

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. `@font-face` kullanma

Alternatif olarak, AMP stil sayfanızda [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) kullanabilirsiniz:

[sourcecode:html]

<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>

[/sourcecode]

[tip type="note"] **NOT –** `@font-face` yoluyla dahil edilen yazı tipleri HTTP veya HTTPS şeması yoluyla getirilmelidir. [/tip]
