---
"$title": "AMP sayfalarınızdan PWA'nızı önceden yükleme"
"$order": '1'
description: "Web sitenize giriş noktasını bir AMP sayfası yapmak, daha sonra PWA'yı arka planda hazırlamak ve yolculuğun devamında..."
formats:
- websites
author: pbakaus
---

**Web sitenize giriş noktasını bir AMP sayfası** yapmak, daha sonra **PWA'yı arka planda hazırlamak** ve yolculuğun devamında ona geçmek iyi bir stratejidir:

- Tüm içerik "yaprak" sayfaları (özet sayfalar değil, belirli bir içerik içerenler), neredeyse anında yükleme deneyimi için AMP sayfaları olarak yayınlanır.
- Bu AMP'ler, kullanıcı içerikle etkileşime girerken önbelleği ve PWA kabuğunu hazırlamak için AMP'nin  [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) özel öğesini kullanır.
- Kullanıcı web sitenizdeki başka bir bağlantıya tıkladığında (örneğin, daha çok uygulama tarzı bir deneyim için alttaki eylem çağrısı), hizmet çalışanı isteğe müdahale eder, sayfanın sorumluluğunu üstlenir ve bunun yerine PWA kabuğunu yükler.

Bu geliştirici örüntüsünü neden ve nasıl kullanacağınızı öğrenmek için okumaya devam edin.

## PWA'ya bağlanırken kullanıcı yolculuğunu geliştirme

### İlk kullanıcı edinimi için AMP

AMP, kullanıcılarınızın bir arama motoru, bir arkadaşın gönderdiği paylaşılan bağlantı veya başka bir sitedeki bağlantı yoluyla organik olarak bulduğu **yaprak sayfalar** adı verilen sayfalar için ideal bir çözümdür. AMP'nin [özel önceden oluşturması](../../../about/how-amp-works.html) sayesinde AMP sayfaları oldukça hızlı yüklenir, bu daha az oturumu terk etme anlamına gelir (yakın zamanlı [DoubleClick çalışması](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/), 3 saniyeden sonra **kullanıcıların %53'ünden fazlasının oturumu terk edeceğini** gösteriyor).

### Zengin interaktiflik ve etkileşim

Aşamalı Web Uygulamaları, diğer yandan, daha fazla interaktifliğe ve etkileşime izin verir ancak bir AMP sayfasının *anında ilk yüklenme özelliklerine* sahip değildir. Merkezlerinde Hizmet Çalışanı adı verilen ve sayfanız için tüm varlık türlerini önbelleğe almaya izin veren bir istemci tarafı proxy teknolojisi vardır ancak bahsi geçen Hizmet Çalışanı, yalnızca ilk yüklemeden *sonra* etkinleşir.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='The pros and cons of AMP vs. PWA.') }}

## `amp-install-serviceworker` ile PWA'nızı hazırlama

AMP, Aşamalı Web Uygulamanızın Hizmet Çalışanını bir AMP sayfasından yükleyebilir - evet, bu AMP sayfası bir AMP Önbelleğinden sunulsa bile bunu yapabilir! Doğru şekilde yapılırsa, AMP sayfasına ilk sıçramaya benzer şekilde, PWA'nıza (AMP sayfalarınızdan birinden) giden bir bağlantı neredeyse anında olmuş gibi hissedilecektir.

[tip type="tip"] **İPUCU** – Henüz Hizmet Çalışanına aşina değilseniz,  Jake Archibald’ın [Udacity kursunu](https://www.udacity.com/course/offline-web-applications--ud899) almanızı kesinlikle tavsiye ediyorum. [/tip]

Öncelikle, sayfanızın `<head>` bölümündeki betik yoluyla bileşeni ekleyerek [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) kullanarak tüm AMP Sayfanızda hizmet çalışanını yükleyin.

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

Daha sonra aşağıdaki kodu `<body>` öğenizin içinde bir yere ekleyin (gerçek Hizmet Çalışanınıza yönlendirmek için değiştirin):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Son olarak, hizmet çalışanının kurulum adımında PWA'nın ihtiyaç duyacağı kaynakları önbelleğe alın:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

[tip type="tip"] **İPUCU** – Hizmet Çalışanını kullanmanın daha kolay yolları vardır.  [Hizmet Çalışanı yardımcı kütüphanelerine](https://github.com/GoogleChrome/sw-helpers) bir göz atın. [/tip]

## AMP Sayfasındaki tüm bağlantıların PWA'ya gitmesini sağlama

Muhtemelen AMP sayfalarınızdaki çoğu bağlantı, daha fazla içerik sayfasına yönlendirme yapar. Sonraki bağlantı tıklamalarının Aşamalı Web Uygulamasında bir "yükseltmeye" neden olmasını sağlamak için [AMP'yi kullanma biçiminize bağlı olmak üzere](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) iki strateji vardır:

### 1. Standart sayfalarınızı AMP sayfalarıyla eşlerseniz

Bu durumda standart bir web siteniz (AMP olmayan) vardır ve bu standart sayfalara bağlı AMP sayfaları oluşturursunuz. Bu, şu anda AMP'nin en yaygın kullanım şeklidir ve AMP sayfalarınızdaki bağlantıların büyük olasılıkla sitenizin standart sürümüne bağlanacağı anlamına gelir. **İyi haber: Standart siteniz PWA'nızsa, hazırsınız demektir**.

### 2. Standart siteniz AMP ise

Bu durumda standart sayfalarınız *sizin* AMP sayfalarınızdır: Tüm web sitenizi AMP ile oluşturuyorsunuz ve AMP'yi bir kütüphane olarak kullanıyorsunuz (eğlenceli bilgi: bunu okuduğunuz site bu şekilde oluşturulmuştur). **Bu senaryoda, AMP sayfalarınızdaki çoğu bağlantı diğer AMP sayfalarına yönlendirir.**

Artık PWA'nızı `your-domain.com/pwa` gibi ayrı bir veri yoluna koyabilir ve bir kullanıcı **AMP Sayfasındaki bir bağlantıya tıkladığında tarayıcı gezinmesine müdahale etmek için çalışan** Hizmet Çalışanını kullanabilirsiniz:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

Bu teknikle ilgili özellikle ilginç olan şey, artık AMP'den PWA'ya gitmek için aşamalı iyileştirme kullanmanızdır. Ancak, bu durum, henüz hizmet çalışanlarını desteklemeyen tarayıcıların PWA'ya asla gitmeden AMP'den AMP'ye sıçrayacakları anlamına da gelir.

AMP bunu [kabuk URL yeniden yazımı](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite) adlı bir şeyle çözer.  [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) etiketine yedek bir URL örüntüsü ekleyerek, AMP'ye, hiçbir hizmet çalışanı desteği tespit edilmezse, başka bir eski kabuk bağlantısına gitmek için verili bir sayfadaki tüm bağlantıları yeniden yazma talimatı verirsiniz.

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Bu öznitelikler eklendiğinde, AMP'deki sonraki tüm tıklamalar herhangi bir hizmet çalışanına bakılmaksızın PWA'nıza gidecektir.

[tip type="read-on"] **OKUMAYA DEVAM EDİN** – Şimdiden epey ilerlediniz. Var olan AMP sayfalarınızı yeniden kullanarak kendi PWA'nızı yapmaya ne dersiniz? [Şu şekilde yapabilirsiniz](amp-in-pwa.md). [/tip]
