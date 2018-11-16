---
$title: Üçüncü Taraf İçeriği Ekleme
---

Sayfalarınıza üçüncü taraf bileşenlerini nasıl ekleyeceğinizi öğrenin.

[TOC]

## Tweet Yerleştirme

[`amp-twitter`](/docs/reference/components/amp-twitter.html) öğesini kullanarak bir Twitter Tweet'ini sayfanıza yerleştirebilirsiniz.

Sayfanıza tweet eklemek için öncelikle aşağıdaki komut dosyasını `<head>` bölümüne ekleyin:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Şu anda tweet'ler, sağlanan boyuta sığmaları için otomatik olarak belirli bir oranda ölçeklenmektedir, ancak bu ideal bir görünüm sağlamayabilir.
Sağlanan genişliği ve yüksekliği manuel olarak değiştirebilir veya en boy oranını, ekran genişliğine göre seçmek için medya özniteliğini kullanabilirsiniz.

<!-- embedded twitter example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.twitter.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>


## Instagram Fotoğrafı Yerleştirme

[`amp-instagram`](/docs/reference/components/amp-instagram.html) öğesini kullanarak bir Instagram fotoğrafını sayfanıza yerleştirebilirsiniz.

Bir Instagram fotoğrafını sayfanıza eklemek için öncelikle aşağıdaki komut dosyasını `<head>` bölümüne ekleyin:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Instagram fotoğrafı URL'sinde bulunan Instagram kısa veri kodunu ekleyin. Örneğin, `https://instagram.com/p/fBwFP` URL'sindeki `fBwFP`, veri kısa kodudur.
Ayrıca, Instagram duyarlı düzenler için sabit bir en boy oranı kullanır. Bu yüzden, genişlik ve yükseklik değeri evrensel olmalıdır

<!-- embedded Instagram example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.instagram.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>


## Facebook yayını veya videosu gösterme

[`amp-facebook`](/docs/reference/components/amp-facebook.html) öğesini kullanarak bir Facebook yayınını veya videosunu sayfanızda gösterebilirsiniz.

Aşağıdaki komut dosyasını `<head>` bölümüne eklemeniz gerekir:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Örnek - Yayın yerleştirme

Source: 
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Preview: 
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### Örnek - Video yerleştirme

Source: 
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Preview: 
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

## YouTube videosu ekleme

[`amp-youtube`](/docs/reference/components/amp-youtube.html) öğesini kullanarak bir YouTube videosunu sayfanıza ekleyebilirsiniz.

Aşağıdaki komut dosyasını `<head>` bölümüne eklemeniz gerekir:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Youtube `data-videoid` kodunu her YouTube video sayfası URL'sinde bulabilirsiniz. Örneğin, https://www.youtube.com/watch?v=Z1q71gFeRqM URL'sinin Z1q71gFeRqM kısmı, video kimliğini belirtmektedir.

16:9 en boy oranlı videolar için doğru düzenleri sağlamak üzere `layout="responsive"` kodunu kullanın:

<!-- embedded youtube example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Reklam gösterme

[`amp-ad`](/docs/reference/components/amp-ad.html) öğesini kullanarak sayfanızda bir reklam gösterin.
Yalnızca HTTPS aracılığıyla sunulan reklamlar desteklenir.

Reklam ağları tarafından sağlanan JavaScript'in AMP dokümanı içinde çalıştırılmasına izin verilmez.
Bunun yerine, AMP çalışma zamanı farklı bir kaynaktan (iframe korumalı alanı aracılığıyla) bir iframe yükler ve reklam ağının JS'sini o iframe korumalı alanı içinde yürütür.

Reklam genişliği ve yüksekliği ile reklam ağı türünü belirtmeniz gerekir.
`type`, reklam ağının şablonunu tanımlar.
Farklı reklam türleri, farklı `data-*` öznitelikleri gerektirir.

<!-- embedded ad example -->
<div>
<amp-iframe height="212"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Reklam ağı tarafından destekleniyorsa, kullanılabilir reklam olmadığında gösterilmesi için bir `placeholder` ekleyin:

<!-- embedded ad example -->
<div>
<amp-iframe height="232"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-placeholder.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

AMP, çok çeşitli reklam ağlarını destekler. [Tam liste için referansa](/docs/reference/components/amp-ad.html#supported-ad-networks) bakın.
