---
$title: Üçüncü Taraf İçeriği Ekleme
---

Sayfalarınıza üçüncü taraf bileşenlerini nasıl ekleyeceğinizi öğrenin.

## Tweet Yerleştirme

[`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) öğesini kullanarak bir Twitter Tweet'ini sayfanıza yerleştirebilirsiniz.

Sayfanıza tweet eklemek için öncelikle aşağıdaki komut dosyasını `<head>` bölümüne ekleyin:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://ampjs.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Şu anda tweet'ler, sağlanan boyuta sığmaları için otomatik olarak belirli bir oranda ölçeklenmektedir, ancak bu ideal bir görünüm sağlamayabilir.
Sağlanan genişliği ve yüksekliği manuel olarak değiştirebilir veya en boy oranını, ekran genişliğine göre seçmek için medya özniteliğini kullanabilirsiniz.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

## Instagram Fotoğrafı Yerleştirme

[`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) öğesini kullanarak bir Instagram fotoğrafını sayfanıza yerleştirebilirsiniz.

Bir Instagram fotoğrafını sayfanıza eklemek için öncelikle aşağıdaki komut dosyasını `<head>` bölümüne ekleyin:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://ampjs.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Instagram fotoğrafı URL'sinde bulunan Instagram kısa veri kodunu ekleyin. Örneğin, `https://instagram.com/p/fBwFP` URL'sindeki `fBwFP`, veri kısa kodudur.
Ayrıca, Instagram duyarlı düzenler için sabit bir en boy oranı kullanır. Bu yüzden, genişlik ve yükseklik değeri evrensel olmalıdır

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

## Facebook yayını veya videosu gösterme

[`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) öğesini kullanarak bir Facebook yayınını veya videosunu sayfanızda gösterebilirsiniz.

Aşağıdaki komut dosyasını `<head>` bölümüne eklemeniz gerekir:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://ampjs.org/v0/amp-facebook-0.1.js"></script>
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

[`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) öğesini kullanarak bir YouTube videosunu sayfanıza ekleyebilirsiniz.

Aşağıdaki komut dosyasını `<head>` bölümüne eklemeniz gerekir:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Youtube `data-videoid` kodunu her YouTube video sayfası URL'sinde bulabilirsiniz. Örneğin, https://www.youtube.com/watch?v=Z1q71gFeRqM URL'sinin Z1q71gFeRqM kısmı, video kimliğini belirtmektedir.

16:9 en boy oranlı videolar için doğru düzenleri sağlamak üzere `layout="responsive"` kodunu kullanın:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

## Reklam gösterme

[`amp-ad`](../../../../documentation/components/reference/amp-ad.md) öğesini kullanarak sayfanızda bir reklam gösterin.
Yalnızca HTTPS aracılığıyla sunulan reklamlar desteklenir.

Reklam ağları tarafından sağlanan JavaScript'in AMP dokümanı içinde çalıştırılmasına izin verilmez.
Bunun yerine, AMP çalışma zamanı farklı bir kaynaktan (iframe korumalı alanı aracılığıyla) bir iframe yükler ve reklam ağının JS'sini o iframe korumalı alanı içinde yürütür.

Reklam genişliği ve yüksekliği ile reklam ağı türünü belirtmeniz gerekir.
`type`, reklam ağının şablonunu tanımlar.
Farklı reklam türleri, farklı `data-*` öznitelikleri gerektirir.

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

Reklam ağı tarafından destekleniyorsa, kullanılabilir reklam olmadığında gösterilmesi için bir `placeholder` ekleyin:

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

AMP, çok çeşitli reklam ağlarını destekler. [Tam liste için referansa](../../../../documentation/components/reference/amp-ad.md#supported-ad-networks) bakın.
