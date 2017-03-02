---
$title: Üçüncü Taraf İçeriği Ekleme
---

Sayfalarınıza üçüncü taraf bileşenlerini nasıl ekleyeceğinizi öğrenin.

[TOC]

## Tweet Yerleştirme

[`amp-twitter`](/docs/reference/extended/amp-twitter.html) öğesini kullanarak bir Twitter Tweet'ini sayfanıza yerleştirebilirsiniz.

Sayfanıza tweet eklemek için öncelikle aşağıdaki komut dosyasını `<head>` bölümüne ekleyin:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Şu anda tweet'ler, sağlanan boyuta sığmaları için otomatik olarak belirli bir oranda ölçeklenmektedir, ancak bu ideal bir görünüm sağlamayabilir.
Sağlanan genişliği ve yüksekliği manuel olarak değiştirebilir veya en boy oranını, ekran genişliğine göre seçmek için medya özniteliğini kullanabilirsiniz.

[twitter.amp örneğindeki](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html) `amp-twitter` örneği:

[sourcecode:html]
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## Instagram Fotoğrafı Yerleştirme

[`amp-instagram`](/docs/reference/extended/amp-instagram.html) öğesini kullanarak bir Instagram fotoğrafını sayfanıza yerleştirebilirsiniz.

Bir Instagram fotoğrafını sayfanıza eklemek için öncelikle aşağıdaki komut dosyasını `<head>` bölümüne ekleyin:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Instagram fotoğrafı URL'sinde bulunan Instagram kısa veri kodunu ekleyin. Örneğin, `https://instagram.com/p/fBwFP` URL'sindeki `fBwFP`, veri kısa kodudur.
Ayrıca, Instagram duyarlı düzenler için sabit bir en boy oranı kullanır. Bu yüzden, genişlik ve yükseklik değeri evrensel olmalıdır

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## Facebook yayını veya videosu gösterme

[`amp-facebook`](/docs/reference/extended/amp-facebook.html) öğesini kullanarak bir Facebook yayınını veya videosunu sayfanızda gösterebilirsiniz.

Aşağıdaki komut dosyasını `<head>` bölümüne eklemeniz gerekir:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

Örnek - Yayın yerleştirme:

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

Örnek - Video yerleştirme:

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## YouTube videosu ekleme

[`amp-youtube`](/docs/reference/extended/amp-youtube.html) öğesini kullanarak bir YouTube videosunu sayfanıza ekleyebilirsiniz.

Aşağıdaki komut dosyasını `<head>` bölümüne eklemeniz gerekir:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Youtube `data-videoid` kodunu her YouTube video sayfası URL'sinde bulabilirsiniz. Örneğin, https://www.youtube.com/watch?v=Z1q71gFeRqM URL'sinin Z1q71gFeRqM kısmı, video kimliğini belirtmektedir.

16:9 en boy oranlı videolar için doğru düzenleri sağlamak üzere `layout="responsive"` kodunu kullanın:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## Reklam gösterme

[`amp-ad`](/docs/reference/amp-ad.html) öğesini kullanarak sayfanızda bir reklam gösterin.
Yalnızca HTTPS aracılığıyla sunulan reklamlar desteklenir.

Reklam ağları tarafından sağlanan JavaScript'in AMP dokümanı içinde çalıştırılmasına izin verilmez.
Bunun yerine, AMP çalışma zamanı farklı bir kaynaktan (iframe korumalı alanı aracılığıyla) bir iframe yükler ve reklam ağının JS'sini o iframe korumalı alanı içinde yürütür.

Reklam genişliği ve yüksekliği ile reklam ağı türünü belirtmeniz gerekir.
`type`, reklam ağının şablonunu tanımlar.
Farklı reklam türleri, farklı `data-*` öznitelikleri gerektirir.

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

Reklam ağı tarafından destekleniyorsa, kullanılabilir reklam olmadığında gösterilmesi için bir `placeholder` ekleyin:

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

AMP, çok çeşitli reklam ağlarını destekler. [Tam liste için referansa](/docs/reference/amp-ad.html#supported-ad-networks) bakın.
