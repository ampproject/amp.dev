---
"$title": Görüntülü reklamlar sunmak için AMP ile entegrasyon
"$order": '5'
description: Bu kılavuz, AMP sayfalarında görüntülü reklamlar sunmak için AMP ile entegrasyon yapmak isteyen reklam ağları içindir.
formats:
- ads
---

Bu kılavuz, AMP sayfalarında görüntülü reklamlar sunmak için AMP ile entegrasyon yapmak isteyen reklam ağları içindir.

## Genel bakış

Bir reklam sunucusu olarak, AMP sayfalarında geleneksel HTML reklamları sunmanın yanı sıra [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md) reklamları sunmak için de AMP ile entegrasyon sağlayabilirsiniz.

##### Geleneksel HTML reklamları mı sunmak istiyorsunuz?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### AMPHTML reklamları mı sunmak istiyorsunuz?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (geleneksel HTML reklamları sunmak için önceden bir tane oluşturmadıysanız).
2. [AMPHTML reklamları sunmak için bir Hızlı Getirme entegrasyonu oluşturun](#creating-a-fast-fetch-integration) .

## `amp-ad` oluşturma<a name="creating-an-amp-ad"></a>

Bir reklam sunucusu olarak desteklediğiniz yayıncılar, sizin tarafınızdan sağlanan bir JavaScript kitaplığı barındırır ve reklamları getirmek ve yayıncının web sitesinde oluşturmak için bu JavaScript kitaplığına dayanan çeşitli "reklam kod parçacıkları" yerleştirirler. AMP, yayıncıların rastgele JavaScript yürütmesine izin vermediğinden, [`amp-ad`](../../../documentation/components/reference/amp-ad.md) etiketinin reklam sunucunuzdan reklam istemesine izin vermek için AMP açık kaynak koduna katkıda bulunmanız gerekir.

[tip type="note"] **NOT –**  Bu [`amp-ad`](../../../documentation/components/reference/amp-ad.md) uygulamasını, geleneksel HTML reklamları **ve** AMPHTML reklamları göstermek için kullanabilirsiniz. [/tip]

Örneğin, Amazon A9 sunucusu aşağıdaki sözdizimi kullanılarak çağrılabilir:

```html
&lt;amp-ad width="300" height="250"
    type="a9"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302"&gt;
&lt;/amp-ad&gt;
```

Yukarıdaki kodda, `type` özniteliği, bu durumda A9 olan reklam ağını belirtir. `data-*` öznitelikleri, Amazon'un A9 sunucusunun bir reklam yayınlamayı beklediği parametrelere bağlıdır. [`a9.js`](https://github.com/ampproject/amphtml/blob/master/ads/a9.js) dosyası, parametrelerin A9 sunucusunun URL'sine bir JavaScript çağrısı yapmak için nasıl eşlendiğini gösterir. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) etiketi tarafından iletilen ilgili parametreler, bir reklam ile yanıt vermek için URL'ye eklenir.

[`amp-ad`](../../../documentation/components/reference/amp-ad.md) entegrasyonu oluşturmayla ilgili talimatlar için [Reklam ağlarını AMP'ye entegre etme](https://github.com/ampproject/amphtml/blob/master/ads/README.md) bölümüne bakın.

## Hızlı Getirme entegrasyonu oluşturma<a name="creating-a-fast-fetch-integration"></a>

[Hızlı Getirme](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/), reklam isteğini reklam yanıtından ayıran, reklam isteklerinin sayfa yaşam döngüsünde daha erken gerçekleşmesine olanak tanıyan ve reklamları yalnızca kullanıcılar tarafından görüntülenmeleri muhtemel olduğunda oluşturan bir AMP mekanizmasıdır. Hızlı Getirme, doğrulanmış AMPHTML reklamlarına geleneksel HTML reklamlarına göre öncelik verir. Hızlı Getirme içinde, bir reklam doğrulamada başarısız olursa, bu reklam, AMP belgesinin geri kalanından ayrılıp korumalı alana alınmak üzere alanlar arası bir iframe'e sarılır. Tersi durumda, doğrulamayı geçen bir AMPHTML reklamı doğrudan sayfaya yazılır. Hızlı Getirme hem AMP hem de AMP olmayan reklamları işler; Doğrulamada başarısız olan reklamlar için ek reklam isteği gerekmez.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Fast Fetch Integration flow', caption='Fast Fetch Integration flow' ) }}

Reklam sunucunuzdan AMPHTML reklamları sunmak için aşağıdakileri içeren bir Hızlı Getirme entegrasyonu sağlamalısınız:

1. SSL ağ iletişimini destekleme.
2. Reklam isteğini oluşturmak için JavaScript sağlama (örnek uygulamalar: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) ve [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
3. Bir doğrulama hizmeti aracılığıyla reklam öğesini doğrulama ve imzalama. [Cloudflare](https://blog.cloudflare.com/firebolt/), herhangi bir bağımsız reklam sağlayıcısının daha hızlı, daha hafif ve daha ilgi çekici reklamlar sunmasını sağlayan bir AMP reklam doğrulama hizmeti sağlar.

Bir Hızlı Getirme entegrasyonu oluşturmayla ilgili talimatlar için [Hızlı Getirme Ağa Uygulama Kılavuzu'na bakın](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md).

## İlgili kaynaklar

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [Desteklenen reklam sağlayıcıları listesi](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [Hızlı Getirme lansmanını açıklayan blog yazısı](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
