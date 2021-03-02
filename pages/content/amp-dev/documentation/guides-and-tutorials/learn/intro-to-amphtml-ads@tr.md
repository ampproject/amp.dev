---
'$title': AMPHTML reklamlarına giriş
$order: 1
description: "AMPHTML reklamları, web'de reklam vermenin daha hızlı, daha hafif ve daha güvenli bir yoludur. AMP sayfaları geleneksel HTML reklamlarını desteklese de, bu reklamların yüklenmesi yavaş olabilir."
formats:
  - ads
---

## AMPHTML reklamı nedir?

AMPHTML reklamları, web'de reklam vermenin daha hızlı, daha hafif ve daha güvenli bir yoludur. AMP sayfaları geleneksel HTML reklamlarını desteklese de, bu reklamların yüklenmesi yavaş olabilir. Reklamları AMP sayfasının geri kalanı kadar hızlı hale getirmek için AMPHTML'de reklamlar oluşturabilirsiniz. AMPHTML reklamları, yalnızca doğrulandıktan sonra yayınlanır ve bu da reklamların güvenli ve iyi performanslı olmasını sağlar. Hepsinden önemlisi, bu reklamlar _yalnızca AMP sayfalarında değil_, web'de herhangi bir yerde sunulabilir.

AMPHTML reklamları, [AMPHTML reklamı teknik özelliklerine](a4a_spec.md) (AMPHTML + CSS'in bir çeşidi) göre AMP HTML'de yazılır. Bu durum, reklamların artık, geleneksel olarak düşük reklam performansının bir numaralı nedeni olan keyfi JavaScript çalıştırma özelliğinin ortadan kalkması anlamına gelir. Bu nedenle, tıpkı ana AMP gibi, temel reklam içi JavaScript kullanım durumları, reklamlarda iyi davranışı garanti eden AMP Açık Kaynak projesinin içine yerleştirilmiştir.

### Avantajları

AMPHTML reklamları neden geleneksel reklamlardan daha iyidir?

1. **Daha hızlı**: AMPHTML reklamları daha hızlıdır çünkü reklamlar sayfa oluşturma işleminin başlarında istenir ve kullanıcı tam da reklamı görüntülemek üzereyken hemen görüntülenir. AMPHTML reklamlarının daha küçük dosya boyutu da hızı artırır.
2. **Daha hafif**: AMPHTML reklamları, yaygın olarak kullanılan reklam işlevselliğini birleştirerek reklamın dosya boyutunu azaltır. AMPHTML reklamları sayfada ilk kez oluşturulduktan sonra daha az kaynak tüketir. Örneğin, normal reklamlarda 10 izleyicinin kendileriyle ilgili bilgileri tek tek talep etmesi yerine, AMPHTML reklamları tüm verileri bir kez toplar ve herhangi bir sayıda ilgili izleyiciye dağıtır.
3. **Koordineli**: AMP sayfalarında, [AMP çalışma zamanı](spec/amphtml.md#amp-runtime), en iyi kullanıcı deneyimini sağlamak için bir cep telefonunun sınırlı kaynaklarını doğru zamanda doğru bileşene koordine edebilir. Örneğin, animasyonlu AMPHTML reklamları, reklamlar mevcut görüntü alanında olmadığında duraklatılır.
4. **Daha Etkileşimli**: Kullanıcılar göremedikleri reklamlarla etkileşime giremez. Daha hızlı reklamlar, daha yüksek görüntülenebilirliğe ve dolayısıyla daha yüksek tıklama oranlarına yol açar, bu da sonuçta daha iyi reklam performansı sağlar.
5. **Kötü Amaçlı Yazılımlara Karşı Güvenli**: AMPHTML reklamlarıyla kötü amaçlı yazılımları yaymak imkansızdır çünkü reklamlar sunulmadan önce doğrulanır. Bu nedenle, reklamverenler güvenli bir kullanıcı deneyimi ve olumlu marka algısı sağlayabilir.
6. **Daha Esnek**: AMPHTML reklamları, hem AMP hem de AMP olmayan web sayfalarında ve herhangi bir cihazda çalışacak şekilde tasarlanmıştır.

### Biçimler

AMPHTML reklamları esnek ve dinamiktir, döngü, paralaks ve lightbox gibi birçok yaratıcı biçim içerir. [Şu örneklerdeki](../../../documentation/examples/index.html) açık kaynaklı AMPHTML reklam şablonlarından yararlanarak kullanmaya başlayın.

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Döngü</td>
    <td>Video Paralaks</td>
    <td>Lightbox</td>
  </tr>
</table>

## AMPHTML reklamları nasıl çalışır

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serving AMPHTML ads to AMP pages', align='' ) }}

1. Yayıncılar, kullanmak istedikleri reklam ağını belirterek, AMP sayfalarına [`amp-ad`](../../../documentation/components/reference/amp-ad.md) etiketi aracılığıyla bir reklam alanı ekler.
2. AMP Çalışma Zamanı, reklamı almak için belirtilen reklam ağına bir reklam isteği gönderir. AMPHTML reklamları sunabilen reklam ağları, reklam öğesini doğrulayan ve imzalayan bir [Hızlı Getirme uygulaması](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) sağlar.
3. Reklam ağı, AMPHTML reklamıyla yanıt verir ve AMP Çalışma Zamanı, reklamı AMP sayfasında oluşturur.

[tip type="note"] AMPHTML reklamlarını AMP olmayan sayfalara sunmak için özel bir entegrasyon gerekmez. AMPHTML reklamlarını destekleyip desteklemediklerini öğrenmek için reklam ağınıza danışın. [/tip]

## AMPHTML reklamları sunma

### Yayıncılar

Doğrudan satılan reklam biçimlerinizi AMPHTML'de sunmak için, reklamları [AMPHTML reklam teknik özelliklerine](a4a_spec.md) göre oluşturmanız ve AMPHTML reklam sunumunu destekleyen bir reklam sunucusu kullanarak dağıtmanız gerekir. Şu anda, aşağıdaki reklam sunucuları AMPHTML reklamları desteklemektedir:

- DoubleClick for Publishers
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

AMPHTML reklamlarını dolaylı kanallarınız (ör. exchange, SSP, vb.) üzerinden yayınlamak için, [aşağıdaki listede](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md) yer alan destekleyici bir reklam ağı/reklam sunucusu kullanın.

### Reklam ajansları

Bir reklam ajansıysanız, reklamları [AMPHTML reklam teknik özelliklerine](a4a_spec.md) uygun olarak oluşturmanız gerekir. İlham ve örnekler için, [Şu örneklerdeki](../../../documentation/examples/index.html) açık kaynaklı AMPHTML reklam şablonlarına bakın. Alternatif olarak, AMPHTML reklamları oluşturmak için aşağıdaki araçlardan birini kullanın:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_çok yakında_)

### Reklam ağları/sunucuları

AMPHTML reklamlarını AMP sayfalarında yayınlamak için, ağınız için [Hızlı Getirme reklam istek uygulaması](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) kullanan bir [` amp-ad`](../../../documentation/components/reference/amp-ad.md) uzantısı (halihazırda yoksa) oluşturmanız gerekir. Ayrıntılar için [Görüntülü reklamları sunmak için AMP ile entegrasyon](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md) bölümüne bakın. AMPHTML'yi AMP olmayan sayfalara sunmak için özel bir entegrasyona gerek olmadığını unutmayın.

## AMPHTML reklamları oluşturma

**Sıfırdan**: AMPHTML reklamları, [AMPHTML reklam teknik özelliklerine](a4a_spec.md) uymalıdır. Demolar ve örnekler için [Örnekler](../../../documentation/examples/documentation/amp-ad.html) bölümünde açık kaynak AMPHTML reklam şablonlarına bakın.

**Araçlar kullanma**: AMPHTML reklam öğeleri oluşturmak için aşağıdaki araçlardan herhangi birini kullanabilirsiniz:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_çok yakında_)

### AMPHTML reklam sözdizimini doğrulama

AMPHTML reklamınızı oluşturduktan sonra, reklamın doğru AMPHTML sözdizimini kullandığından emin olmalısınız. Geliştirme ortamınıza bağlı olarak, AMPHTML reklamlarınızı doğrulamanız için birkaç seçenek vardır:

- Doğrulamayı derleme CI'nıza entegre etmek için [AMP validator NPM](https://www.npmjs.com/package/amphtml-validator) modülünü kullanın.
- Tek seferlik testler için [AMP doğrulayıcıyı](https://validator.ampproject.org/) kullanın.
- [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) ile işbirliği yapıp açık doğrulayıcı uç noktalarını kullanın.

[tip type="note"] **NOT -** AMPHTML reklamlarını AMP sayfalarında hızlı bir şekilde oluşturmak için (yani, Hızlı Getirme'de tercihli oluşturmayı kullanarak) sözdiziminin doğru olması gerekir. Sözdizimi geçerli değilse, reklam, o kadar hızlı olmasa da, yine de oluşturulacaktır. [/tip]

## RTB'de AMPHTML reklamlarını destekleme

Gerçek Zamanlı Teklif Verme (RTB) ortamında AMPHTML reklamlarını desteklemek isteyen SSP'ler ve reklam borsaları için ayrıntılar için [RTB Reklam Borsaları Uygulama Kılavuzu'na](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) bakın.

## SSS

#### AMPHTML reklam örnekleri var mı?

Evet. [Örnekler](../../../documentation/examples/documentation/amp-ad.html) bölümünde bir dizi harika görünümlü AMPHTML reklam şablonu bulunabilir. Bu örnekler, AMP'de gelişmiş bileşenleri kullanır.

#### AMPHTML reklamları, üçüncü taraf doğrulamayı ve görüntülenebilirlik algılamayı destekliyor mu?

Evet, [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) kullanarak doğrulama ve görüntülenebilirlik algılama için yerel destek vardır (ör. Google'ın ActiveView bu şekilde entegre olur). MOAT gibi bunun için aktif destek sunan başka sağlayıcılar da vardır.

#### AMPHTML reklamları zaman çizelgesine dayalı animasyonu destekliyor mu?

Evet. [`amp-animation`](../../../documentation/components/reference/amp-animation.md) bileşenine bakın.

#### Çoğu reklamın dokunulabilir hedefleri ve yapılandırılabilir reklam çıkışları vardır. AMPHTML reklamlarının benzer bir mekanizması var mı?

Evet. [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md) bileşenine bakın.

#### İhtiyacım olanı bulamıyorum, nereye soru sorabilirim?

- [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html), AMP ile ilgili soruların yanıtlarını bulmanız için önerdiğimiz yerdir; AMP Projesi topluluk üyeleri Stack Overflow'u düzenli olarak takip ettiğinden, sorularınıza muhtemelen en hızlı yanıtı orada alacaksınız.
- Çözümler ve yanıtlar için [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) kanalına katılın.
- AMP'de bir hatayla karşılaşırsanız veya AMP için bir özellik isteğiniz varsa, sorun bildirme hakkında bilgi için [AMP ile ilgili sorunları bildirme](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) bölümüne bakın.
