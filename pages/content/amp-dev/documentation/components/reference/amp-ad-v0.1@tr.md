---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: Bir reklamın görüntüleneceği kapsayıcı.
---

Bir reklamın görüntüleneceği kapsayıcı. `amp-embed`, `amp-ad` etiketinin bir diğer adıdır ve bu etiketin tüm işlevlerini farklı bir etiket adıyla alır. Anlam açısından daha doğru olduğunda `amp-embed` etiketini kullanın. AMP dokümanları yalnızca HTTPS aracılığıyla sunulan reklamları/yerleştirmeleri destekler.

# <a name="amp-ad"></a> amp-ad / amp-embed


[tip type="note"]
`amp-ad`/`amp-embed` spesifikasyonu zaman içinde önemli ölçüde gelişebilir. Geçerli yaklaşım, reklamları gösterebilmek için biçimin önyükleneceği şekilde tasarlanmıştır.
[/tip]


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<table>
  <tr>
    <td class="col-fourty"><strong>Açıklama</strong></td>
    <td>Bir reklamın görüntüleneceği kapsayıcı. <code>amp-embed</code>, <code>amp-ad</code> etiketinin bir diğer adıdır ve bu etiketin tüm işlevlerini farklı bir etiket adıyla alır. Anlam açısından daha doğru olduğunda <code>amp-embed</code> etiketini kullanın. AMP dokümanları yalnızca HTTPS aracılığıyla sunulan reklamları/yerleştirmeleri destekler.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;/script></code><br>Not: amp-ad, bu komut dosyası olmadan da çalışmaya devam edebilir ancak ileriye dönük uyumluluk için bunu önemle tavsiye ediyoruz</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-ad/">amp-ad örneği</a> sayfasına bakın.</td>
  </tr>
</table>

## Davranış <a name="behavior"></a>

Reklamlar, AMP dokümanlarındaki diğer tüm kaynaklar gibi `<amp-ad>` adlı özel bir öğeyle yüklenir. Reklam ağları tarafından sağlanan JavaScript'in AMP dokümanı içinde çalıştırılmasına izin verilmez. Bunun yerine, AMP çalışma zamanı AMP dokümanından farklı bir kaynaktan (iframe korumalı alanı aracılığıyla) bir iframe yükler ve reklam ağının JS'sini o iframe korumalı alanı içinde yürütür.

`<amp-ad>`, düzen türünün [kuralına](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors) göre belirtilecek genişlik ve yükseklik değerlerinin bildirilmesini gerektirir. Hangi reklam ağının görüntüleneceğini seçen bir `type` bağımsız değişkeni gerektirir. Etiketteki tüm `data-*` özellikleri, sonunda reklamı oluşturan kodu otomatik olarak bağımsız değişken biçiminde geçirir. Belirli bir ağ türü için hangi `data-` özelliklerinin gerekli olduğu değişiklik gösterir ve reklam ağıyla belgelenmelidir.

#### Örnek: Birkaç reklam görüntüleme <a name="example-displaying-a-few-ads"></a>

[example preview="inline" playground="true" imports="amp-ad"]
```html
<amp-ad type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
    width="300"
    height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
  <amp-ad width="300"
    height="250"
    type="industrybrains"
    data-width="300"
    data-height="250"
    data-cid="19626-3798936394">
  </amp-ad>
  <amp-embed type="taboola"
    width="400"
    height="300"
    layout="responsive"
    data-publisher="amp-demo"
    data-mode="thumbnails-a"
    data-placement="Ads Example"
    data-article="auto">
  </amp-embed>
```
[/example]

## Özellikler <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>tür (gerekli)</strong></td>
    <td><a href="#supported-ad-networks">Reklam ağı</a> için bir tanımlayıcı belirtir. <code>type</code> özelliği, reklam etiketi için kullanılacak şablonu seçer.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src (isteğe bağlı)</strong></td>
    <td>Belirtilen reklam ağı için bir komut dosyası etiketi yüklemek üzere bu özelliği kullanın. Bu özellik, sayfaya tam olarak tek bir komut dosyası etiketinin eklenmesini gerektiren reklam ağları için kullanılabilir. <code>src</code> değeri, belirtilen reklam ağı için beyaz listeye alınmış bir öneke sahip olmalı ve değer, <code>https</code> protokolünü kullanmalıdır.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>Çoğu reklam ağı, HTML <code>data-</code> özelliklerini kullanarak ağa geçirilebilecek ek yapılandırma gerektirir. Parametre adlarında, standart veri özelliği çizgisi büyük/küçük harfe dönüştürülür. Örneğin, "data-foo-bar" adı, yapılandırma için reklama "fooBar" olarak gönderilir. Özelliklerin kullanılabileceği <a href="#supported-ad-networks">reklam ağı</a> ile ilgili dokümanlara bakın.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td><code>data-vars-</code> ile başlayan özellikler <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute"><code>amp-analytics</code> var öğeleri</a> için ayrılmıştır.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (isteğe bağlı)</strong></td>
    <td>Bir yapılandırmayı reklama rastgele şekilde karmaşık bir JSON nesnesi olarak geçirmek için bu özelliği kullanın. Nesne, adlar herhangi bir şekilde bozulmadan, olduğu gibi reklama geçirilir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (isteğe bağlı)</strong></td>
    <td>Değer sağlanırsa kullanıcının "AMP istemci kimliği" (çereze benzer) reklama geçirilinceye kadar <a href="amp-user-notification.md">amp-user-notification</a> özelliğinin belirtilen HTML kimliği ile onaylanmasını gerektirir. Bu, kullanıcı bildirimi onaylayana kadar reklam oluşturmanın bekletileceği anlamına gelir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy (isteğe bağlı)</strong></td>
    <td>Reklamın, geçerli görüntü alanından belirtilen görüntü alanı sayısı kadar uzakta olduğunda yüklenmeye başlamasını bildirir. <code>data-loading-strategy</code> özelliği olmadan, varsayılan olarak 3 değeri kullanılır. [0, 3] aralığında bir hareketli değer belirtebilirsiniz (Değer belirtilmezse değer 1,25 olarak ayarlanır). Daha yüksek bir görüntülenebilirlik derecesi elde etmek (ör. bir reklamın yüklendikten sonra görülme olasılığını artırmak) için daha küçük bir değer kullanın. Ancak bu durumda, daha az gösterim oluşturma (ör. daha az reklam yüklenmesi) riski de artar. Özellik belirtilir ancak değer boş bırakılırsa sistem, gösterim sayısını önemli ölçüde etkilemeden görüntülenebilirliği optimize eden bir hareketli reklam değeri atar. Değer olarak <code>prefer-viewability-over-views</code> seçeneğinin belirlenmesinin görüntülenebilirliği de otomatik olarak optimize edeceğini unutmayın.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id (isteğe bağlı)</strong></td>
    <td>Daraltma girişimi olması durumunda, reklama kapsayıcı bileşeni kimliğini bildirir. Kapsayıcı bileşeni, reklamın üst öğesi olan bir <code>&lt;amp-layout&gt;</code> bileşeni olmalıdır. <code>data-ad-container-id</code> belirtildiğinde ve böyle bir <code>&lt;amp-layout&gt;</code> kapsayıcı bileşeni bulunduğunda, AMP çalışma zamanı, dolgu yokken reklam bileşeni yerine kapsayıcı bileşenini daraltmayı dener. Bu özellik, bir reklam göstergesinin var olması durumunda faydalı olabilir.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>Bu öğe, AMP bileşenlerine genişletilmiş <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">ortak özellikleri</a> içerir.</td>
  </tr>
</table>

## Yer Tutucu <a name="placeholder"></a>

İsteğe bağlı olarak `amp-ad`, `placeholder` özelliğine sahip bir alt öğeyi destekler. Reklam ağı tarafından desteklenirse bu öğe, reklam görüntülenmeye hazır olana kadar gösterilir. [Yer Tutucu ve Yedekler](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md) hakkında daha fazla bilgi edinin.

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Reklam yok <a name="no-ad-available"></a>

Alan için kullanılabilir reklam yoksa AMP, (`display: none` değerine ayarlanmış) `amp-ad` öğesini daraltmaya çalışır. AMP, bu işlemin kullanıcının kaydırma konumunu etkilemeden gerçekleştirilebileceğini belirler. Reklam geçerli görüntü alanındaysa kullanıcının kaydırma konumunu etkileyeceği için daraltılmaz; ancak, reklam geçerli görüntü alanının dışındaysa daraltılır.

Daraltma girişimi başarısız olması durumunda. `amp-ad` bileşeni, `fallback` özelliğine sahip bir alt öğeyi destekler. Bir yedek öğe varsa özelleştirilmiş yedek öğe gösterilir. Aksi takdirde, AMP bir varsayılan yedeği uygular.

Yedek içeren örnek:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Video reklamlar sunma <a name="serving-video-ads"></a>

Video reklamlarla AMP'deki videolardan para kazanmanın 3 yolu vardır:

1. AMP, reklamlardan para kazanabilen BrightCove, DailyMotion gibi çeşitli video oynatıcıları destekler. Tam liste için [medya](../../../documentation/components/index.html#media) bileşenlerine bakın.

1. Yerleşik bir IMA SDK ve HTML5 video oynatıcısıyla gelen [amp-ima-video](amp-ima-video.md) bileşenini kullanın
1. AMP'de desteklenmeyen bir video oynatıcı kullanıyorsanız özel oynatıcınızı, [amp-iframe](https://ampbyexample.com/components/amp-iframe/) kullanarak sunabilirsiniz.
`amp-iframe` yaklaşımını kullanırken:

    * Oynatıcıyı ilk görüntü alanına yüklüyorsanız bir poster olduğundan emin olun. [Ayrıntılar](amp-iframe.md#iframe-with-placeholder).
    * Video ve poster, HTTPS üzerinden sunulmalıdır.</li>

## Reklamları bir özel alandan yayınlama <a name="running-ads-from-a-custom-domain"></a>

AMP, kendi alanınız gibi bir özel alandan reklam yüklemek için kullanılan önyükleme iframe'inin yüklenmesini destekler.

Bunu etkinleştirmek için [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html) dosyasını web sunucunuza kopyalayın. Ardından, AMP dosyalarınıza aşağıdaki meta etiketi ekleyin:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  Meta etiketin `content` özelliği, web sunucunuzdaki remote.html dosya kopyasının mutlak URL'sidir. Bu URL bir "https" şeması kullanmalıdır. AMP dosyalarınızla aynı kaynakta bulunamaz. Örneğin, `www.example.com` adresinde AMP dosyaları barındırırsanız bu URL, `www.example.com` adresinde olmamalı; bunun yerine, `something-else.example.com` gibi bir adreste olmalıdır. iframe'ler için izin verilen kaynaklar hakkında daha fazla bilgi için ["Iframe kaynak politikası"](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md) konusuna bakın.

### Güvenlik <a name="security"></a>

iframe'inizin yalnızca beklenen şeyleri yaptığından emin olmak için gelen verileri `draw3p` işlevine geçirmeden önce **doğrulayın**. Bu durum, bilhassa özel JavaScript yerleştirmeye izin veren reklam ağları için geçerlidir.

Iframe'ler, yalnızca iframe içine almaları beklenen kaynakları iframe içine almalıdır. Kaynaklar şunlar olabilir:

* kendi kaynaklarınız
* AMP önbelleği için `https://cdn.ampproject.org`

AMP önbelleği için "kaynak kökenin" (cdn.ampproject.org tarafından sunulan dokümanın kaynağı) kaynaklarınızdan biri olduğunu kontrol etmeniz de gerekir.

Kaynakların uygulanması `draw3p` için 3. bağımsız değişkenle yapılabilir ve ayrıca, tam tarayıcı desteği için [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) yönergesi kullanılarak yapılmalıdır.

### Gelen reklam yapılandırmasını geliştirme <a name="enhance-incoming-ad-configuration"></a>

Bu tamamen isteğe bağlıdır: Bazen reklam isteğini reklam sunucusuna göndermeden önce reklam isteğinin geliştirilmesi istenir.

Reklam ağınız [hızlı getirmeyi](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad) destekliyorsa lütfen [Gerçek Zamanlı Yapılandırmayı](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC) kullanın. (ör. DoubleClick ve AdSense entegrasyonları, hızlı getirme ve RTC'yi destekler)

Reklam ağınızda gecikmeli getirme kullanılıyorsa [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html) dosyasındaki `draw3p` işlev çağrısına bir geri çağırma geçirebilirsiniz. Geri çağırma, gelen yapılandırmayı ilk bağımsız değişken ve daha sonra, bir başka geri çağırmayı ikinci bağımsız değişken olarak alır (aşağıdaki örnekte `done` olarak gösterilmiştir). Reklam oluşturmanın devam etmesi için bu geri çağırma, güncellenmiş yapılandırma ile yapılmalıdır.

Örnek:

```JS
draw3p(function(config, done) {
  config.targeting = Math.random() > 0.5 ? 'sport' : 'fashion';
  // Don't actually call setTimeout here. This should only serve as an
  // example that is OK to call the done callback asynchronously.
  setTimeout(function() {
    done(config);
  }, 100)
}, ['allowed-ad-type'], ['your-domain.com']);
```

## Stil <a name="styling"></a>

`<amp-ad>` öğelerinin kendileri CSS `position: fixed` değerine ayarlanmış kapsayıcılara sahip olamaz veya böyle kapsayıcıların içine yerleştirilemez (`amp-lightbox` hariç).
Bunun nedeni, tam sayfa yer paylaşımlı reklamların kullanıcı deneyimi açısından yarattığı zorluklardır. Gelecekte, belirli kullanıcı deneyimi değişmez değerlerini sağlayan AMP kontrollü kapsayıcıların içinde benzer reklam biçimlerine izin verme seçeneği değerlendirilebilir.

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-ad kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) bakın.

## Desteklenen reklam ağları <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/master/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/master/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/master/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/master/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/master/ads/adform.md)
* [AdFox](https://github.com/ampproject/amphtml/blob/master/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/master/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/master/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/master/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/master/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/master/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/master/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/master/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/master/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/master/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/master/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/master/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/master/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/master/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/master/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/master/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/master/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/master/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/master/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/master/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/master/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/master/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/master/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/master/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/master/ads/adverticum.md)
* [Advertserve](https://github.com/ampproject/amphtml/blob/master/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/master/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/master/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/master/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/master/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/master/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/master/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/master/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/master/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/master/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/master/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/master/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/master/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/master/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/master/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/master/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/master/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/master/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/master/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/master/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/master/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/master/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/master/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/master/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/master/ads/dotandads.md)
* [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/master/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/master/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/master/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/master/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/master/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/master/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/master/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/master/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/master/ads/freewheel.md)
* [Karma](https://github.com/ampproject/amphtml/blob/master/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/master/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/master/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/master/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/master/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/master/ads/holder.md)
* [i-mobile](https://github.com/ampproject/amphtml/blob/master/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/master/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/master/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/master/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/master/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/master/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/master/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/master/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/master/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/master/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/master/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/master/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/master/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/master/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/master/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/master/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/master/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/master/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/master/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/master/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/master/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/master/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/master/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/master/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/master/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/master/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/master/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/master/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/master/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/master/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/master/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/master/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/master/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/master/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/master/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/master/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/master/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/master/ads/onnetwork.md)
* [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/master/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/master/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/master/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/master/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/master/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/master/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/master/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/master/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/master/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/master/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/master/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/master/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/master/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/master/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/master/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/master/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/master/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/master/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/master/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/master/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/master/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/master/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/master/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/master/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/master/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/master/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/master/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/master/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/master/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/master/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/master/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/master/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/master/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/master/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/master/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/master/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/master/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/master/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/master/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/master/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/master/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/master/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/master/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/master/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/master/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/master/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/master/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/master/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/master/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/master/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/master/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/master/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/master/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/master/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/master/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/master/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/master/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/master/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/master/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/master/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/master/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/master/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/master/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/master/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/master/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/master/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/master/ads/zucks.md)

## Desteklenen yerleştirme türleri <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/master/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/master/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/master/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/master/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/master/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/master/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/master/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/master/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/master/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/master/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/master/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/master/ads/zergnet.md)