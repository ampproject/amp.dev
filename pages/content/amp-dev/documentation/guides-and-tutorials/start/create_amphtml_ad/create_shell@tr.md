---
"$title": Reklam için kabuk oluşturma
"$order": '0'
description: 'Favori metin editörünüzü kullanarak my-amphtml-ad.html adında bir HTML dosyası oluşturun. Aşağıdaki HTML biçimlendirmesini bu dosyaya kopyalayın: ...'
---

[AMPHTML reklamı](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) için [gereken HTML, AMP sayfası için gerekli AMPHTML'nin](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) bir çeşididir. AMPHTML reklamımızın kabuğunu oluşturarak gerekli kodu öğrenelim.

Favori metin editörünüzü kullanarak **`my-amphtml-ad.html`** adında bir HTML dosyası oluşturun. Aşağıdaki HTML biçimlendirmesini bu dosyaya kopyalayın:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
</head>
<body>
</body>
</html>
```

Bu işaretleme, geçerli, temel bir HTML dosyası içindir. <a>Duyarlı bir görüntü alanımız</a> olması için <code>meta</code> görüntü alanı etiketini eklediğimize dikkat edin.

Şimdi, HTML'yi AMPHTML reklamına dönüştürecek şekilde değiştirelim.

`<html>` etiketine, belgeyi bir AMPHTML reklamı olarak tanımlayan `⚡4ads` özelliğini ekleyin. Alternatif olarak, yine geçerli olan `amp4ads` özelliğini de belirtebilirsiniz.

```html
<!doctype html>
<html ⚡4ads>
<head>
...
```

[tip type="note"] **NOT -** AMP sayfalarının aksine, [AMPHTML reklamları `<link rel="canonical">` etiketi gerektirmez](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

AMPHTML reklamları kendi AMP çalışma zamanı sürümünü gerektirir, bu nedenle aşağıdaki `<script>` etiketini belgenizin `<head>` bölümüne ekleyin:

```html
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

AMPHTML reklam öğeleri, AMP sayfalarından farklı ve oldukça basit bir [standart metin](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) stil satırı gerektirir. Aşağıdaki kodu `<head>` bölümünüze ekleyin:

```html
<style amp4ads-boilerplate>body{visibility:hidden}</style>
```

AMPHTML reklamınızı biçimlendirmek için CSS'nizin `<head>` bölümündeki `<style amp-custom></style>` etiketleri kullanılarak AMPHTML belgesine satır içi olarak yerleştirilmesi gerekir. Temel bir görüntü reklamı oluşturduğumuz için herhangi bir CSS'ye ihtiyacımız olmadığından bu etiketleri eklemeyeceğiz.

[tip type="note"] **NOT -** AMPHTML reklamları için satır içi stil sayfasının maksimum boyutu *20 kilobayttır*. [AMPHTML reklam teknik özelliklerinde CSS gereksinimleri](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css) hakkında daha fazla bilgi edinin. [/tip]

HTML dosyanızın tam kodu aşağıdadır:

```html
<!doctype html>
<html ⚡4ads>
<head>
  <meta charset="utf-8">
  <title>My amphtml ad</title>
  <meta name="viewport" content="width=device-width">
  <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
  <style amp4ads-boilerplate>body{visibility:hidden}</style>
</head>
<body>
</body>
</html>
```

Boş da olsa artık geçerli bir AMPHTML reklamınız var. Görüntü reklamımızı oluşturalım.
