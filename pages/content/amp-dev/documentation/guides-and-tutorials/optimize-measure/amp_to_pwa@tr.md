---
'$title': "AMP sitenizi PWA'ya dönüştürme"
$order: 10
description: PWA, tarayıcı içindeki kaynakları önbelleğe alarak kullanıcıları etkileşim içinde tutmak ve bilgilendirmek için veriler, varlıklar ve çevrimdışı sayfalar sunabilir.
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

Aşamalı Web Uygulamaları [hizmet çalışanlarının](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), çeşitli ağ güçlerinde zengin çevrimdışı deneyimler ve tutarlı kullanıcı deneyimleri sağlama gücünden yararlanır. PWA, tarayıcı içindeki kaynakları önbelleğe alarak kullanıcıları etkileşim içinde tutmak ve bilgilendirmek için veriler, varlıklar ve çevrimdışı sayfalar sunabilir.

Bu öğretici, bir AMP sitesini bir Web Sunumu ve AMP Hizmet Çalışanı tarafından desteklenen bir Hizmet Çalışanı ekleyerek çevrimdışı özelliklere sahip, kurulabilir bir PWA'ya nasıl dönüştüreceğinizi öğretecektir.

# Başlangıç kodunu indirme ve çalıştırma

[Başlangıç kodunu buradan](/static/files/tutorials/amptopwa.zip) indirin.

Web sitesini önizlemek için yerel bir web sunucusu kullanın.

[tip type="default"] **İPUCU -** Hızlı bir web sunucusu için `python -m SimpleHTTPServer`'ı çalıştırın. [/tip]

Mobile Music Magic festivali Lyrical Lightning'in açılış sayfasını görüntüleyebilmelisiniz. Ana sayfada programı ve grupların hangi sahnede olduğunu görmek için bir bağlantı vardır.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Sitemizin kullanıcıları, programa erişmek istediklerinde muhtemelen kesintili ağ bağlantısına sahip olacaklar. Bu durum, siteyi kullanıcımızın ana ekranına yüklenebilen bir PWA'ya dönüştürmek için harika bir aday yapar ve çevrimdışıyken bile tüm kritik işlevleri sunar.

# Web Uygulama Sunumu Oluşturma

[Web uygulama sunumu](https://developers.google.com/web/fundamentals/web-app-manifest/), tarayıcıya web uygulamanız hakkında veri sunan ve kullanıcının mobil cihazına veya masaüstüne "yüklendiğinde" nasıl davranması gerektiğini söyleyen basit bir JSON dosyasıdır. Birçok tarayıcı [Ana Ekrana Ekle istemini](https://developers.google.com/web/fundamentals/app-install-banners/) göstermek için bir web sunumuna sahip olmayı gerekli kılar.

Aşağıdaki kodla bilgi havuzunuza `manifest.json` adlı bir dosya ekleyin:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# AMP Hizmet Çalışanı ekleme

Hizmet çalışanı, tarayıcınızın bir web sayfasından ayrı olarak arka planda çalıştırdığı, performansı iyileştirmek ve çevrimdışı işlevler sağlamak için istekleri önbelleğe alarak tarayıcı özelliklerini genişleten bir betiktir. Sıfırdan bir hizmet çalışanı oluşturmak mümkündür ancak bu, çok zaman alır. Workbox gibi kütüphaneler bunun için yardımcı olur, ancak AMP bir adım ileri giderek [AMP Hizmet Çalışanı](https://github.com/ampproject/amp-sw) sunar; AMP bu şekilde AMP Betiklerinin, varlıkların ve belgelerin önbelleğe alınması ve [gezinme önyüklemesi](https://developers.google.com/web/updates/2017/02/navigation-preload) gibi ortak en iyi uygulamaların ayarlanması dahil birçok adımı otomatikleştirir.

AMP Hizmet Çalışanı [AMP betiklerini](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) ve [belgeleri](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) kurulumdan sonra kullanıcı istedikçe otomatik olarak önbelleğe alır. Temel AMP Hizmet Çalışanını ekleyerek işe başlayacağız.

## Hizmet çalışanı dosyası oluşturma

`sw.js` adlı bir dosya oluşturun ve aşağıdaki kodu ekleyin:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

Yalnızca iki satır kodla, bu işlem, AMP Hizmet Çalışanını Hizmet Çalışanınıza aktarır ve onu başlatır.

## Hizmet çalışanınızı AMP sayfalarınıza otomatik olarak yükleme

AMP web siteleri, kullanıcı içeriğinizin keyfini çıkarırken hizmet çalışanını tarayıcının arka planında yüklemek için [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) bileşenini kullanır.

Gerekli betik etiketini `index.html` başlığına ve `<amp-install-serviceworker>` öğesini `<body>` içine yerleştirin:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Önemli –** Sitenizin tüm içeriğini önbelleğe alabilmesi için hizmet çalışanı kök dizinden (`/sw.js`) sunulmalıdır. [/tip]

`<amp-install-serviceworker>` , bir iframe oluşturarak ve `data-iframe-src` dosyasını çalıştırarak hizmet çalışanını yükler. `install-sw.html` dosyasını oluşturun ve aşağıdaki kodu ekleyin:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

iframe, AMP Hizmet Çalışanı dosyasını tarayıcıya kaydeder.

# Önbelleğe alınanları özelleştirme

AMP Hizmet Çalışanı, uygulamanızın ihtiyaçlarına göre optimize etmek için yapılandırabileceğiniz isteğe bağlı alanlara izin verirken kurulu avantajlarla birlikte gelir.

Müzik festivali uygulamamız görüntü varlıklarımızı önbelleğe alacak, sanatçı sıralaması bağlantısını önceden getirecek ve bir çevrimdışı sayfa belirleyecektir.

## Önbellek Varlıkları

AMP Hizmet Çalışanını görüntüler, videolar ve yazı tipleri gibi [varlıkları önbelleğe alacak](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching) şekilde yapılandırabilirsiniz. Biz onu arka plan resmimizi ve AMP logomuzu önbelleğe almak için kullanacağız. `sw.js` dosyasını açın ve aşağıdaki koda güncelleyin:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

Önbelleğe alma stratejisinin [önbellek öncelikli](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) olmasını istedik. Bu, uygulamanın ağdan herhangi bir şey istemeden önce önbellekten resim sunmaya çalışacağı anlamına gelir. Bu özellikle arka plan resmimizi veya AMP logomuzu güncellemeyeceğimizden bu uygulama için kullanışlıdır.

## Bağlantıları Önceden Getirme

AMP Hizmet Çalışanı,`data-rel=prefetch` özniteliğine sahip bağlantıları önceden getirir. Bu işlem, kullanıcıların sayfaları henüz ziyaret etmemiş olsalar bile çevrimdışı görüntülemelerini sağlar. Özniteliği, `lineup.html` için bağlantı etiketimize ekleyeceğiz.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Çevrimdışı bir sayfa gösterme

Beklenmedik durumlarla veya önceden getirmediğimiz sayfaların bağlantılarına yapılan tıklamalarla başa çıkmak için, genel tarayıcı çevrimdışı sayfasını göstermek yerine "markaya uygun" tutarlı bir kullanıcı deneyimi sunmak için bir çevrimdışı sayfa ekleyeceğiz. [`offline.html` sayfasını buradan](/static/files/tutorials/offline.zip) indirin ve `sw.js` kodunu aşağıdaki kodla güncelleyin:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# PWA'nızı test edin

AMP Hizmet Çalışanınızın gerekli varlıkları önbelleğe aldığını ve [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps) aracılığıyla ideal bir çevrimdışı çözüm sağladığını test edebilirsiniz.

Windows'da `Ctrl + Shift + I` veya Mac'te `Cmd + Opt + I` tuşlarına basıp DevTools panelini açarak Lyrical Lyghtning'i test edeceğiz. Ayrıca sayfada sağ tıklayıp menüden `incele` seçeneğini de seçebilirsiniz. Ardından, hizmet çalışanı kaydınızı görüntülemek için `Uygulama` seçeneğini seçin.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Çevrimdışı moda geçmek için `çevrimdışı` kutusunu tıklayın. Düzgün bir şekilde önbelleğe alınıp alınmadıklarını kontrol etmek için `tüm sanatçı listesini göster` bağlantısını tıklayın ve ` offline.html` sayfasına gidin.

[tip type="default"] **İpucu –** Aşamalı Web Uygulamaları özelliklerinin kapsamlı bir analizi için [ Google'ın Lighthouse aracını](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) çalıştırın ve bir rapor oluşturun. [/tip]

# Tebrikler!

AMP ile başarıyla bir PWA oluşturdunuz! Bu öğreticide şunları öğrendiniz:

- [Web Uygulama Sunumu Oluşturma](https://developers.google.com/web/fundamentals/web-app-manifest/)
- [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) kullanarak AMP'de bir Hizmet Çalışanı yükleme
- [AMP Hizmet Çalışanını](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) özelleştirme
- [Prefetch links ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Çevrimdışı bir sayfa oluşturma

[Hizmet Çalışanları](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) ve [çevrimdışı kullanıcı deneyimi konuları](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux) hakkında daha fazla bilgi edinin. [Analizlerle etkileşimi takip etmeyi](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html) öğrenin ve [AMP sayfalarınız için temel analizi nasıl yapılandıracağınızla](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html) ilgili öğreticiyi izleyin.
