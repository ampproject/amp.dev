---
$category@: ads-analytics
formats:
- websites
teaser:
  text: Bir reklamın görüntüleneceği kapsayıcı.
---

#amp-ad / amp-embed

Bir reklamın görüntüleneceği kapsayıcı. `amp-embed`, `amp-ad` etiketinin bir diğer adıdır ve bu etiketin tüm işlevlerini farklı bir etiket adıyla alır. Anlam açısından daha doğru olduğunda `amp-embed` etiketini kullanın. AMP dokümanları yalnızca HTTPS aracılığıyla sunulan reklamları/yerleştirmeleri destekler.

# `amp-ad` / `amp-embed`


[tip type="note"]
`amp-ad`/`amp-embed` spesifikasyonu zaman içinde önemli ölçüde gelişebilir. Geçerli yaklaşım, reklamları gösterebilmek için biçimin önyükleneceği şekilde tasarlanmıştır.
[/tip]


<!---
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
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Desteklenen Düzenler</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-ad/">amp-ad örneği</a> sayfasına bakın.</td>
  </tr>
</table>

## Davranış

Reklamlar, AMP dokümanlarındaki diğer tüm kaynaklar gibi `<amp-ad>` adlı özel bir öğeyle yüklenir. Reklam ağları tarafından sağlanan JavaScript'in AMP dokümanı içinde çalıştırılmasına izin verilmez. Bunun yerine, AMP çalışma zamanı AMP dokümanından farklı bir kaynaktan (iframe korumalı alanı aracılığıyla) bir iframe yükler ve reklam ağının JS'sini o iframe korumalı alanı içinde yürütür.

`<amp-ad>`, düzen türünün [kuralına](https://www.ampproject.org/docs/design/amp-html-layout#%28tl;dr%29-summary-of-layout-requirements-&amp;-behaviors) göre belirtilecek genişlik ve yükseklik değerlerinin bildirilmesini gerektirir. Hangi reklam ağının görüntüleneceğini seçen bir `type` bağımsız değişkeni gerektirir. Etiketteki tüm `data-*` özellikleri, sonunda reklamı oluşturan kodu otomatik olarak bağımsız değişken biçiminde geçirir. Belirli bir ağ türü için hangi `data-` özelliklerinin gerekli olduğu değişiklik gösterir ve reklam ağıyla belgelenmelidir.

#### Örnek: Birkaç reklam görüntüleme

<!--yerleşik örnek - ampproject.org'da görüntülenir -->

<div>
  <amp-iframe height="522" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampad.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Daha fazla göster" overflow="" tabindex="0" role="button">Tam kodu göster</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

## Özellikler

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
    <td>Değer sağlanırsa kullanıcının "AMP istemci kimliği" (çereze benzer) reklama geçirilinceye kadar <a href="https://www.ampproject.org/docs/reference/components/amp-user-notification.html">amp-user-notification</a> özelliğinin belirtilen HTML kimliği ile onaylanmasını gerektirir. Bu, kullanıcı bildirimi onaylayana kadar reklam oluşturmanın bekletileceği anlamına gelir.</td>
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
    <td>Bu öğe, AMP bileşenlerine genişletilmiş <a href="https://www.ampproject.org/docs/reference/common_attributes">ortak özellikleri</a> içerir.</td>
  </tr>
</table>

## Yer Tutucu

İsteğe bağlı olarak `amp-ad`, `placeholder` özelliğine sahip bir alt öğeyi destekler. Reklam ağı tarafından desteklenirse bu öğe, reklam görüntülenmeye hazır olana kadar gösterilir. [Yer Tutucu ve Yedekler](https://www.ampproject.org/docs/guides/responsive/placeholders) hakkında daha fazla bilgi edinin.

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Reklam yok

Alan için kullanılabilir reklam yoksa AMP, (`display: none` değerine ayarlanmış) `amp-ad` öğesini daraltmaya çalışır. AMP, bu işlemin kullanıcının kaydırma konumunu etkilemeden gerçekleştirilebileceğini belirler. Reklam geçerli görüntü alanındaysa kullanıcının kaydırma konumunu etkileyeceği için daraltılmaz; ancak, reklam geçerli görüntü alanının dışındaysa daraltılır.

Daraltma girişimi başarısız olması durumunda. `amp-ad` bileşeni, `fallback` özelliğine sahip bir alt öğeyi destekler. Bir yedek öğe varsa özelleştirilmiş yedek öğe gösterilir. Aksi takdirde, AMP bir varsayılan yedeği uygular.

Yedek içeren örnek:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Video reklamlar sunma

Video reklamlarla AMP'deki videolardan para kazanmanın 3 yolu vardır:

1. AMP, reklamlardan para kazanabilen BrightCove, DailyMotion gibi çeşitli video oynatıcıları destekler. Tam liste için [medya](https://www.ampproject.org/docs/reference/components#media) bileşenlerine bakın.

1. Yerleşik bir IMA SDK ve HTML5 video oynatıcısıyla gelen [amp-ima-video](https://www.ampproject.org/docs/reference/components/amp-ima-video.html) bileşenini kullanın
1. AMP'de desteklenmeyen bir video oynatıcı kullanıyorsanız özel oynatıcınızı, [amp-iframe](https://ampbyexample.com/components/amp-iframe/) kullanarak sunabilirsiniz.
`amp-iframe` yaklaşımını kullanırken:

    * Oynatıcıyı ilk görüntü alanına yüklüyorsanız bir poster olduğundan emin olun. [Ayrıntılar](https://www.ampproject.org/docs/reference/components/amp-iframe#iframe-with-placeholder).
    * Video ve poster, HTTPS üzerinden sunulmalıdır.</li>

## Reklamları bir özel alandan yayınlama

AMP, kendi alanınız gibi bir özel alandan reklam yüklemek için kullanılan önyükleme iframe'inin yüklenmesini destekler.

Bunu etkinleştirmek için [remote.html](../../3p/remote.html) dosyasını web sunucunuza kopyalayın. Ardından, AMP dosyalarınıza aşağıdaki meta etiketi ekleyin:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  Meta etiketin `content` özelliği, web sunucunuzdaki remote.html dosya kopyasının mutlak URL'sidir. Bu URL bir "https" şeması kullanmalıdır. AMP dosyalarınızla aynı kaynakta bulunamaz. Örneğin, `www.example.com` adresinde AMP dosyaları barındırırsanız bu URL, `www.example.com` adresinde olmamalı; bunun yerine, `something-else.example.com` gibi bir adreste olmalıdır. iframe'ler için izin verilen kaynaklar hakkında daha fazla bilgi için ["Iframe kaynak politikası"](../../spec/amp-iframe-origin-policy.md) konusuna bakın.

### Güvenlik

iframe'inizin yalnızca beklenen şeyleri yaptığından emin olmak için gelen verileri `draw3p` işlevine geçirmeden önce **doğrulayın**. Bu durum, bilhassa özel JavaScript yerleştirmeye izin veren reklam ağları için geçerlidir.

Iframe'ler, yalnızca iframe içine almaları beklenen kaynakları iframe içine almalıdır. Kaynaklar şunlar olabilir:

* kendi kaynaklarınız
* AMP önbelleği için `https://cdn.ampproject.org`

AMP önbelleği için "kaynak kökenin" (cdn.ampproject.org tarafından sunulan dokümanın kaynağı) kaynaklarınızdan biri olduğunu kontrol etmeniz de gerekir.

Kaynakların uygulanması `draw3p` için 3. bağımsız değişkenle yapılabilir ve ayrıca, tam tarayıcı desteği için [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) yönergesi kullanılarak yapılmalıdır.

### Gelen reklam yapılandırmasını geliştirme

Bu tamamen isteğe bağlıdır: Bazen reklam isteğini reklam sunucusuna göndermeden önce reklam isteğinin geliştirilmesi istenir.

Reklam ağınız [hızlı getirmeyi](https://www.ampproject.org/docs/ads/adnetwork_integration#creating-an-amp-ad-implementation) destekliyorsa lütfen [Gerçek Zamanlı Yapılandırmayı](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC) kullanın. (ör. DoubleClick ve AdSense entegrasyonları, hızlı getirme ve RTC'yi destekler)

Reklam ağınızda gecikmeli getirme kullanılıyorsa [remote.html](../../3p/remote.html) dosyasındaki `draw3p` işlev çağrısına bir geri çağırma geçirebilirsiniz. Geri çağırma, gelen yapılandırmayı ilk bağımsız değişken ve daha sonra, bir başka geri çağırmayı ikinci bağımsız değişken olarak alır (aşağıdaki örnekte `done` olarak gösterilmiştir). Reklam oluşturmanın devam etmesi için bu geri çağırma, güncellenmiş yapılandırma ile yapılmalıdır.

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

## Stil

`<amp-ad>` öğelerinin kendileri CSS `position: fixed` değerine ayarlanmış kapsayıcılara sahip olamaz veya böyle kapsayıcıların içine yerleştirilemez (`amp-lightbox` hariç).
Bunun nedeni, tam sayfa yer paylaşımlı reklamların kullanıcı deneyimi açısından yarattığı zorluklardır. Gelecekte, belirli kullanıcı deneyimi değişmez değerlerini sağlayan AMP kontrollü kapsayıcıların içinde benzer reklam biçimlerine izin verme seçeneği değerlendirilebilir.

## Doğrulama

AMP doğrulayıcı spesifikasyonundaki [amp-ad kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) bakın.

## Desteklenen reklam ağları

* [A8](../../ads/a8.md)
* [A9](../../ads/a9.md)
* [AccessTrade](../../ads/accesstrade.md)
* [Adblade](../../ads/adblade.md)
* [AdButler](../../ads/adbutler.md)
* [Adform](../../ads/adform.md)
* [AdFox](../../ads/adfox.md)
* [Ad Generation](../../ads/adgeneration.md)
* [Adhese](../../ads/adhese.md)
* [Adincube](../../ads/adincube.md)
* [ADITION](../../ads/adition.md)
* [Adman](../../ads/adman.md)
* [AdmanMedia](../../ads/admanmedia.md)
* [Admixer](../../ads/admixer.md)
* [AdOcean](../../ads/adocean.md)
* [AdPicker](../../ads/adpicker.md)
* [AdPlugg](../../ads/adplugg.md)
* [Adpon](../../ads/adpon.md)
* [AdReactor](../../ads/adreactor.md)
* [AdSense](../../ads/google/adsense.md)
* [AdSensor](../../ads/adsensor.md)
* [AdsNative](../../ads/adsnative.md)
* [AdSpeed](../../ads/adspeed.md)
* [AdSpirit](../../ads/adspirit.md)
* [AdStir](../../ads/adstir.md)
* [AdTech](../../ads/adtech.md)
* [AdThrive](../../ads/adthrive.md)
* [AdUnity](../../ads/adunity.md)
* [Ad Up Technology](../../ads/aduptech.md)
* [Adventive](../../ads/adventive.md)
* [Adverline](../../ads/adverline.md)
* [Adverticum](../../ads/adverticum.md)
* [Advertserve](../../ads/advertserve.md)
* [Adyoulike](../../ads/adyoulike.md)
* [Affiliate-B](../../ads/affiliateb.md)
* [AMoAd](../../ads/amoad.md)
* [AppNexus](../../ads/appnexus.md)
* [AppVador](../../ads/appvador.md)
* [Atomx](../../ads/atomx.md)
* [Baidu](../../ads/baidu.md)
* [BeOpinion](../amp-beopinion/amp-beopinion.md)
* [Bidtellect](../../ads/bidtellect.md)
* [brainy](../../ads/brainy.md)
* [Broadstreet Ads](../../ads/broadstreetads.md)
* [CA A.J.A. Infeed](../../ads/caajainfeed.md)
* [CA-ProFit-X](../../ads/caprofitx.md)
* [Cedato](../../ads/cedato.md)
* [Chargeads](../../ads/chargeads.md)
* [Colombia](../../ads/colombia.md)
* [Connatix](../../ads/connatix.md)
* [Content.ad](../../ads/contentad.md)
* [Criteo](../../ads/criteo.md)
* [CSA](../../ads/google/csa.md)
* [CxenseDisplay](../../ads/eas.md)
* [Dianomi](../../ads/dianomi.md)
* [Directadvert](../../ads/directadvert.md)
* [DistroScale](../../ads/distroscale.md)
* [Dot and Media](../../ads/dotandads.md)
* [DoubleClick](../../ads/google/doubleclick.md)
* [eADV](../../ads/eadv.md)
* [E-Planning](../../ads/eplanning.md)
* [Ezoic](../../ads/ezoic.md)
* [Felmat](../../ads/felmat.md)
* [FlexOneELEPHANT](../../ads/f1e.md)
* [FlexOneHARRIER](../../ads/f1h.md)
* [Flite](../../ads/flite.md)
* [fluct](../../ads/fluct.md)
* [FreeWheel](../../ads/freewheel.md)
* [Karma](../../ads/fusion.md)
* [GenieeSSP](../../ads/genieessp.md)
* [Giraff](../../ads/giraff.md)
* [GMOSSP](../../ads/gmossp.md)
* [GumGum](../../ads/gumgum.md)
* [Holder](../../ads/holder.md)
* [i-mobile](../../ads/imobile.md)
* [Imonomy](../../ads/imonomy.md)
* [iBillboard](../../ads/ibillboard.md)
* [Imedia](../../ads/imedia.md)
* [Improve Digital](../../ads/improvedigital.md)
* [Index Exchange](../../ads/ix.md)
* [Industrybrains](../../ads/industrybrains.md)
* [InMobi](../../ads/inmobi.md)
* [Innity](../../ads/innity.md)
* [Kargo](../../ads/kargo.md)
* [Kiosked](../../ads/kiosked.md)
* [Kixer](../../ads/kixer.md)
* [Kuadio](../../ads/kuadio.md)
* [Ligatus](../../ads/ligatus.md)
* [LockerDome](../../ads/lockerdome.md)
* [LOKA](../../ads/loka.md)
* [MADS](../../ads/mads.md)
* [MANTIS](../../ads/mantis.md)
* [Media.net](../../ads/medianet.md)
* [MediaImpact](../../ads/mediaimpact.md)
* [Mediavine](../../ads/mediavine.md)
* [Medyanet](../../ads/medyanet.md)
* [Meg](../../ads/meg.md)
* [MicroAd](../../ads/microad.md)
* [MixiMedia](../../ads/miximedia.md)
* [Mixpo](../../ads/mixpo.md)
* [Monetizer101](../../ads/monetizer101.md)
* [mox](../../ads/mox.md)
* [myTarget](../../ads/mytarget.md)
* [myWidget](../../ads/mywidget.md)
* [Nativo](../../ads/nativo.md)
* [Navegg](../../ads/navegg.md)
* [Nend](../../ads/nend.md)
* [NETLETIX](../../ads/netletix.md)
* [Noddus](../../ads/noddus.md)
* [Nokta](../../ads/nokta.md)
* [OneAD](../../ads/onead.md)
* [OnNetwork](../../ads/onnetwork.md)
* [Open AdStream (OAS)](../../ads/openadstream.md)
* [OpenX](../../ads/openx.md)
* [Pixels](../../ads/pixels.md)
* [plista](../../ads/plista.md)
* [polymorphicAds](../../ads/polymorphicads.md)
* [popin](../../ads/popin.md)
* [Pressboard](../../ads/pressboard.md)
* [PromoteIQ](../../ads/promoteiq.md)
* [PubGuru](../../ads/pubguru.md)
* [PubMatic](../../ads/pubmatic.md)
* [Pubmine](../../ads/pubmine.md)
* [PulsePoint](../../ads/pulsepoint.md)
* [Purch](../../ads/purch.md)
* [Rambler&amp;Co](../../ads/capirs.md)
* [RbInfoxSg](../../ads/rbinfox.md)
* [Realclick](../../ads/realclick.md)
* [recomAD](../../ads/recomad.md)
* [Red for Publishers](../../ads/rfp.md)
* [Relap](../../ads/relap.md)
* [Revcontent](../../ads/revcontent.md)
* [RevJet](../../ads/revjet.md)
* [Rubicon Project](../../ads/rubicon.md)
* [RUNative](../../ads/runative.md)
* [SAS CI 360 Match](../../ads/sas.md)
* [Sekindo](../../ads/sekindo.md)
* [Sharethrough](../../ads/sharethrough.md)
* [Sklik](../../ads/sklik.md)
* [SlimCut Media](../../ads/slimcutmedia.md)
* [Smart AdServer](../../ads/smartadserver.md)
* [smartclip](../../ads/smartclip.md)
* [sogou Ad](../../ads/sogouad.md)
* [Sortable](../../ads/sortable.md)
* [SOVRN](../../ads/sovrn.md)
* [Speakol](../../ads/speakol.md)
* [SpotX](../../ads/spotx.md)
* [SunMedia](../../ads/sunmedia.md)
* [Swoop](../../ads/swoop.md)
* [TcsEmotion](../../ads/tcsemotion.md)
* [Teads](../../ads/teads.md)
* [torimochi](../../ads/torimochi.md)
* [TripleLift](../../ads/triplelift.md)
* [Trugaze](../../ads/trugaze.md)
* [UZOU](../../ads/uzou.md)
* [ValueCommerce](../../ads/valuecommerce.md)
* [video intelligence](../../ads/videointelligence.md)
* [Videonow](../../ads/videonow.md)
* [Viralize](../../ads/viralize.md)
* [UAS](../../ads/uas.md)
* [ucfunnel](../../ads/ucfunnel.md)
* [Unruly](../../ads/unruly.md)
* [VMFive](../../ads/vmfive.md)
* [Webediads](../../ads/webediads.md)
* [Weborama](../../ads/weborama.md)
* [Widespace](../../ads/widespace.md)
* [Wisteria](../../ads/wisteria.md)
* [WPMedia](../../ads/wpmedia.md)
* [Xlift](../../ads/xlift.md)
* [Yahoo](../../ads/yahoo.md)
* [YahooJP](../../ads/yahoojp.md)
* [Yandex](../../ads/yandex.md)
* [Yengo](../../ads/yengo.md)
* [Yieldbot](../../ads/yieldbot.md)
* [Yieldmo](../../ads/yieldmo.md)
* [Yieldone](../../ads/yieldone.md)
* [Yieldpro](../../ads/yieldpro.md)
* [Zedo](../../ads/zedo.md)
* [Zucks](../../ads/zucks.md)

## Desteklenen yerleştirme türleri

* [24smi](../../ads/24smi.md)
* [AJA](../../ads/aja.md)
* [Bringhub](../../ads/bringhub.md)
* [Dable](../../ads/dable.md)
* [Engageya](../../ads/engageya.md)
* [Epeex](../../ads/epeex.md)
* [Jubna](../../ads/jubna.md)
* [Outbrain](../../ads/outbrain.md)
* [Postquare](../../ads/postquare.md)
* [PubExchange](../../ads/pubexchange.md)
* [Smi2](../../ads/smi2.md)
* [Taboola](../../ads/taboola.md)
* [Zen](../../ads/zen.md)
* [ZergNet](../../ads/zergnet.md)
