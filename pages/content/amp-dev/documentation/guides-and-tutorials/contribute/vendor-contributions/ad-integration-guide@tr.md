---
'$title': "Reklam teknolojilerinizi AMP'ye entegre etme"
$order: 3
formats:
  - ads
teaser:
  text: "AMP HTML'e entegre olmak isteyen bir reklam teknolojisi sağlayıcısıysanız, lütfen aşağıdaki kılavuzlara göz atın."
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

AMP HTML'e entegre olmak isteyen bir reklam teknolojisi sağlayıcısıysanız, lütfen aşağıdaki kılavuzlara göz atın. Gecikmeyi en aza indirdiğinizden ve kaliteyi yüksek tuttuğunuzdan emin olmak için açık kaynaklı AMP projesine çekme isteği göndermeden önce lütfen [burada](https://github.com/ampproject/amphtml/blob/master/ads/../3p/README.md#ads) listelenen talimatları izleyin. AMP'ye nasıl katkı koymaya başlayabileceğinize dair genel bir kılavuz için lütfen [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/ads/../CONTRIBUTING.md) bölümüne bakın.

## Reklam Sunucusu <a name="ad-server"></a>

_Örnekler : DFP, A9_

Bir reklam sunucusu olarak desteklediğiniz yayıncılar, sizin tarafınızdan sunulan bir JavaScript kütüphanesine sahiptir ve reklamları yayıncı web sitesinde göstermek ve işlemek için JavaScript kütüphanesine dayanan çeşitli "reklam kod parçacıkları" yerleştirirler.

AMP, yayıncıların rastgele JavaScript kodlarını yürütmelerine izin vermediğinden, `amp-ad` etiketinin reklam sunucusundan reklam istemesini sağlamak için AMP açık kaynak koduna katkı koymanız gerekecektir.

Örneğin : Amazon A9 sunucusu aşağıdaki sözdizimi kullanılarak çağrılabilir:

[sourcecode:html]
<amp-ad
width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302"

> </amp-ad>
> [/sourcecode]

Unutmayın, `type` değerini izleyen özniteliklerin her biri reklam sunmak için Amazon'un A9 sunucusunun beklediği parametrelere bağımlıdır. [a9.js](https://github.com/ampproject/amphtml/blob/master/ads/./a9.js) dosyası, parametrelerin A9 sunucusunu `https://c.amazon-adsystem.com/aax2/assoc.js` URL'si yoluyla çağıran bir JavaScript çağrısı yapmaya nasıl eşlendiğini gösterir. AMP reklam etiketi tarafından geçilen ilgili parametreler, reklam ile dönüş yapmak için URL'ye eklenir.

Reklam ağınızı AMP'ye nasıl entegre edebileceğinize dair daha fazla bilgi için [Reklam ağlarını AMP'ye entegre etme](https://github.com/ampproject/amphtml/blob/master/ads/README.md) bölümüne bakın.

## Tedarik Tarafı Platformu (SSP) veya Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

_Örnekler : Rubicon, Criteo OR Appnexus, Ad-Exchange_

Doğrudan yayıncı web sayfası tarafından çağrılmak isteyen bir satış tarafı platformuysanız, bir Reklam Sunucusu ile entegrasyon için yukarıda listelenen talimatların aynısını izlemeniz gerekir. Amp-ad etiketine kendi `type` değerinizi eklemek, etiketinizi doğrudan yayıncıya sunmanızı sağlar, böylece yayıncı da kendi AMP sayfalarına doğrudan sizin etiketinizi koyabilir.

Genelde SSP'ler, kendi reklam sunucularında SSP reklam etiketlerini gönderip almak için yayıncılarla çalışır. Bu durumda, reklam sunucusu reklam öğesi bölümünde betiğiniz tarafından yüklenen tüm varlıkların HTTPS üzerinden yapıldığından emin olun. Genişletilebilir öğeler gibi bazı reklam biçimleriyle ilgili bazı kısıtlamalar olduğundan, yayıncılarınızla en sık yayınlanan reklam öğesi biçimlerini test etmenizi öneririz.

## Reklam Ajansı <a name="ad-agency"></a>

_Örnekler : Essence, Omnicom_

Geliştirdiğiniz reklam öğelerinin AMP uyumlu olduğundan emin olmak için yayıncınızla birlikte çalışın. Tüm reklam öğeleri, reklam çağrıldığında boyutu belirlenen iframe'lere sunulduğundan, reklam öğenizin iframe'in boyutunu değiştirmeye çalışmadığından emin olun.

Reklam öğesinin parçası olan tüm varlıkların HTTPS kullanarak istendiğinden emin olun. Bazı reklam biçimleri şu anda tam olarak desteklenmemektedir ve reklam öğelerini AMP ortamında test etmenizi öneririz. Bazı örnekler : Zengin Medya Genişletilebilir Öğeleri, Geçiş Reklamları, Sayfa Düzeyinde Reklamlar.

## Video Oynatıcı <a name="video-player"></a>

_Örnekler : Brightcove, Ooyala_

Normal HTML sayfalarında çalışan bir video oynatıcı AMP'de çalışmaz ve bu nedenle AMP Çalışma Zamanının oynatıcınızı yüklemesine izin veren belirli bir etiket oluşturulmalıdır. Brightcove, medya ve reklamların AMP sayfalarında oynatılmasını sağlayan özel bir [amp-brightcove](https://github.com/ampproject/amphtml/blob/master/extensions/amp-brightcove/amp-brightcove.md) etiketi oluşturdu.

Brightcove oynatıcısı aşağıdaki şekilde çağrılabilir:

[sourcecode:html]
<amp-brightcove
data-account="1290862519001"
data-video-id="ref:amp-docs-sample"
data-player="S1Tt8cgaM"
layout="responsive"
width="480"
height="270"

> </amp-brightcove>
> [/sourcecode]

Brightcove gibi bir amp etiketinin nasıl geliştirileceğiyle ilgili talimatlar için [bu çekme isteğine](https://github.com/ampproject/amphtml/pull/1052) bakın.

## Video Reklam Ağı <a name="video-ad-network"></a>

_Örnekler : Tremor, Brightroll_

Bir video reklam ağıysanız, lütfen aşağıdakileri sağlamak için yayıncınızla birlikte çalışın:

- Tüm video varlıkları HTTPS üzerinden sunulmalıdır
- Yayıncının video oynatıcısında AMP desteği olmalıdır

## Veri Yönetimi Platformu (DMP) <a name="data-management-platform-dmp"></a>

_Örnekler : KRUX, Bluekai_

[Özel reklam yapılandırmasını nasıl geliştireceğinizi](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration) öğrenin.

Kullanıcı çerezinden aldığınız kitle segmentlerini reklam çağrısına aktararak reklam çağrısını zenginleştirmek için benzer bir yaklaşım kullanabilirsiniz.

## Görüntülenebilirlik Sağlayıcısı <a name="viewability-provider"></a>

_Örnekler : MOAT, Integral Ad Science_

Görüntülenebilirlik sağlayıcıları genellikle reklam sunucusunun reklam sarmalayıcıları aracılığıyla yayıncılara entegre olur. Bu durumda, reklam sarmalayıcısının, tüm öğeleri HTTPS üzerinden yüklediğinden emin olun.

Örneğin MOAT için `http://js.moatads.com` bağlantısının `https://z.moatads.com` ile değiştirildiğinden emin olun

Ayrıca, [kesişimsel gözlemci örüntüsü](https://github.com/ampproject/amphtml/blob/master/ads/README.md#ad-viewability) kullanım yaklaşımına göz atın.

## İçerik Tavsiye Platformu <a name="content-recommendation-platform"></a>

_Örnekler : Taboola, Outbrain_

Şu anda yayıncı web sitesinde JavaScript ekli parçalarınız varsa faydalıdır ancak yaklaşım, AMP sayfalarında çalışmaz. AMP sayfasında içerik önermek isterseniz, içerik ayrıntılarını istemek için [`amp-embed` uzantısını](https://amp.dev/documentation/components/amp-ad) kullanmanızı öneririz. Lütfen [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md) örneğine bakın.
