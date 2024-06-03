---
'$title': Kolay çevrimdışı erişim ve iyileştirilmiş performans
$order: 11
description: Hizmet Çalışanı, sayfanız ile sunucunuz arasında yer alan ve harika çevrimdışı deneyimler ve hızlı yüklenen uygulama kabuğu senaryoları oluşturmak ve anlık bildirimler göndermek için kullanılan...
formats:
  - websites
author: CrystalOnScript
contributors:
  - pbakaus
---

[Hizmet çalışanları](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), çeşitli ağ güçlerinde zengin çevrimdışı deneyimler ve tutarlı kullanıcı deneyimleri sağlar. Bir web uygulaması, tarayıcı içindeki kaynakları önbelleğe alarak, kullanıcıların etkileşimlerini devam ettirmek ve bilgiler sunmak için veriler, varlıklar ve çevrimdışı sayfalar sağlayabilir.

Unutmayın: Hizmet Çalışanı, sayfanızın AMP önbelleğe alınmış sürümüyle etkileşim kuramaz. Çıkış noktanızdan ileriye doğru olan yolculuklar için kullanın.

## Hizmet Çalışanı Kurma

Hizmet Çalışanı, sayfanız ile sunucunuz arasında yer alan ve harika çevrimdışı deneyimler ve hızlı yüklenen uygulama kabuğu senaryoları oluşturmak ve anlık bildirimler göndermek için kullanılan bir istemci tarafı bir proxy'sidir.

[tip type="note"] **NOT -** Hizmet Çalışanları kavramı sizin için yeniyse, [WebFundamentals'daki giriş](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) bölümünü okuyun. [/tip]

Hizmet Çalışanınızın belirli bir sayfada kayıtlı olması gerekir, aksi takdirde tarayıcı onu bulamaz veya çalıştırmaz. Varsayılan olarak, bu işlem [biraz JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration) yardımı ile yapılır. AMP Sayfalarında, aynı işlemi yapmak için [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) bileşeni kullanılır.

Bunun için sayfanızın `<head>` bölümüne [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) bileşenini betiği yoluyla ekleyin:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Ardından `<body>` içinde bir yere aşağıdakileri ekleyin (gerçek Hizmet Çalışanınızı gösterecek şekilde değiştirin):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Kullanıcı, kaynağınızdaki AMP sayfalarınıza giderse (genellikle bir AMP Önbelleğinden sunulan ilk tıklamanın aksine), Hizmet Çalışanı görevi devralır ve [sayısız harika şey yapabilir](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux) .

## AMP Hizmet Çalışanı

Buradaysanız, AMP ile sayfalar oluşturuyorsunuz demektir. AMP ekibi, kullanıcıyı birinci sıraya koymaya ve onlara birinci sınıf bir web deneyimi sunmaya son derece önem veriyor. Bu deneyimleri tutarlı kılmak için AMP ekibi, özellikle AMP için bir hizmet çalışanı oluşturdu!

[tip type="default"] **İPUCU -** [PWA'nızda AMP Hizmet Çalışanı](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md) kullanmayı öğrenmek için öğreticimizi izleyin. [/tip]

### AMP Hizmet Çalışanını Yükleme

AMP Hizmet Çalışanını minimum sayıda adımla kurun:

- [sourcecode:js] importScripts('https://cdn.ampproject.org/sw/amp-sw.js'); [/sourcecode]

- [sourcecode:js]
  AMP_SW.init();
  [/sourcecode]

- Bitti.

### Otomatik Önbelleğe Alma

AMP Hizmet Çalışanı, AMP betiklerini ve AMP belgelerini otomatik olarak önbelleğe alır. Önbelleğe alınan AMP betik dosyaları, kullanıcı tarayıcısında anında kullanılabilir hale gelir ve kesintili ağlarda çevrimdışı işlevlere ve daha hızlı sayfalara olanak tanırlar.

Uygulamanız belirli türde belgeleri önbelleğe almayı gerektiriyorsa, AMP Hizmet Çalışanı özelleştirmeye izin verir. Ağdan her zaman talep edilmesi gereken belgeler için bir reddetme listesi eklemek gibi. Aşağıdaki örnekte, `Array<RegExp>` içeriğini, önbelleğe almaktan kaçınmak istediğiniz belgeleri içeren bir dizi normal ifadeyle değiştirin.

[sourcecode:js]
AMP_SW.init(
documentCachingOptions: {
denyList?: Array<RegExp>;
}
);
[/sourcecode]

[Belge önbelleğe alma işlemini özelleştirme hakkında daha fazlasını buradan](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) okuyun.

### AMP Hizmet Çalışanını Optimize Etme

AMP Hizmet Çalışanını tüm özellikleriyle kullanmak için, isteğe bağlı alanlar gerekli varlıkları önbelleğe alacak ve bağlantıları önceden getirecek şekilde yapılandırılmalıdır.

Video, önemli resimler veya indirilebilir PDF gibi kullanıcının bir sayfayı ziyaret etmesini sağlayan varlıklar, kullanıcı çevrimdışıysa tekrar erişilebilmeleri için önbelleğe alınmalıdır.

[sourcecode:js]
AMP_SW.init(
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
);
[/sourcecode]

Önbelleğe alma stratejisini özelleştirebilir ve bir reddetme listesi tanımlayabilirsiniz.

Kullanıcılarınızın ziyaret etmeleri gerekebilecek sayfaların bağlantıları önceden getirilerek, çevrimdışıyken erişmelerine izin verilebilir. Bu işlem, bağlantı etiketine bir `data-prefetch` özniteliği eklenerek yapılır.

[sourcecode:html]
<a href='....' data-rel='prefetch' />
[/sourcecode]

### Çevrimdışı Deneyim

Kullanıcılara çevrimdışı olduklarını ve çevrimdışı bir sayfa ekleyerek tekrar çevrimiçi olduklarında siteyi yeniden yüklemeyi denemeleri gerektiğini bildirin. AMP Hizmet Çalışanı, hem sayfayı hem de varlıklarını önbelleğe alabilir.

[sourcecode:js] AMP_SW.init({ offlinePageOptions: { url: '/offline.html'; assets: ['/images/offline-header.jpg']; } }) [/sourcecode]

Başarılı bir çevrimdışı sayfa, uygulamanın geri kalanıyla tutarlı bir kullanıcı arayüzüne sahip olduğu için sitenizin bir parçası gibi görünür.

### Zorunlu Güncelleme

Ekip, AMP Hizmet Çalışanınızın devre dışı bırakılması veya kullanıcılara yönelik bir dağıtımın yanlış çalışması durumunda değiştirilmesi gerekiyorsa, zorunlu güncelleme/kaldırma özelliği uygulamak için çalışıyor.

Bir sunucu çalışanını etkili şekilde yönetmek için, [standart HTTP önbelleğe almanın, hizmet çalışanınızın JavaScript'inin güncel tutulma biçimini nasıl etkilediğini](https://developers.google.com/web/updates/2018/06/fresher-sw) anlamanız gerekir. Uygun HTTP önbelleğe alma yönergeleriyle sunulan hizmet çalışanları, uygun değişiklikleri yaparak ve hizmet çalışanınızı barındırma ortamınıza yeniden dağıtarak küçük hata düzeltmelerini çözebilir. Bir hizmet çalışanını kaldırmanız gerekirse, aşağıdaki gibi basit, [işlemsiz](https://en.wikipedia.org/wiki/NOP) bir hizmet çalışanı dosyasını elinizin altında bulundurmanız iyi bir fikirdir:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"] Dağıtılmış hizmet çalışanlarını yönetmeye dair [daha fazlasını okuyun](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776). [/tip]

## Özel Hizmet Çalışanı Yazma

AMP web sitenize çevrimdışı erişimi etkinleştirmek için yukarıdaki tekniği kullanabilir, ayrıca sayfalarınızı **başlangıç noktasından sunuldukları anda** genişletebilirsiniz. Bunun nedeni, yanıtı Hizmet Çalışanının `fetch` olayı aracılığıyla değiştirebilmeniz ve istediğiniz yanıtı verebilmenizdir:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open('mysite').then(function(cache) {
return cache.match(event.request).then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})

        // Modify the response here before it goes out..
        ...

        return response || fetchPromise;
      })
    })

);
});
[/sourcecode]

Bu tekniği kullanarak AMP Sayfanızda, aksi halde [AMP doğrulamasından](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) geçemeyecek her türlü ek işlevselliği değiştirebilirsiniz, örneğin:

- Özel JS gerektiren dinamik özellikler.
- Özelleştirilmiş/yalnızca sitenizle alakalı bileşenler.
