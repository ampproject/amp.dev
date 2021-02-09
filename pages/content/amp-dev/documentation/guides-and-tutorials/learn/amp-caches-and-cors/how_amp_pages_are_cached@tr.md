---
'$title': AMP sayfaları nasıl önbelleğe alınır?
$order: 0
description: Bu belgede, AMP önbelleğinin AMP ekosistemindeki rolü ve AMP sayfanızın nasıl önbelleğe alındığını öğreneceksiniz.
formats:
  - websites
  - stories
  - ads
---

Bu belgede, AMP önbelleğinin AMP ekosistemindeki rolü ve AMP sayfanızın nasıl önbelleğe alındığını öğreneceksiniz.

## AMP Önbelleği nedir?

AMP Önbelleği, geçerli AMP belgelerini sunmayı amaçlayan proxy tabanlı bir içerik dağıtım ağıdır (CDN). AMP Önbellekleri şu amaçla tasarlanmıştır:

1. Sadece geçerli AMP sayfalarını sunun.
2. AMP sayfalarının verimli ve güvenli bir şekilde önceden yüklenmesine izin verin.
3. İçeriğe kullanıcı açısından faydalı ek performans optimizasyonları gerçekleştirin.

[tip type="note"] AMP e-posta belgeleri AMP önbelleğinden muaftır.[/tip]

AMP Önbellekleri hakkında daha fazla bilgi için aşağıdaki YouTube videosunu izleyin veya [AMP Önbellekleri neden var?](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456) blog yazısını okuyun.

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='AMP önbelleklerinin neden var olduğunu öğrenmek için bu videoyu izleyin.']

## Hangi AMP Önbellekleri mevcuttur?

Şu anda iki AMP Önbellek sağlayıcısı vardır:

- [Google AMP Önbelleği](https://developers.google.com/amp/cache/)
- [Bing AMP Önbelleği](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP açık bir ekosistemdir ve AMP Projesi, daha fazla AMP Önbelleğinin geliştirilmesini aktif olarak destekler. AMP Önbellekleri oluşturma hakkında bilgi edinmek için [AMP Önbellek Yönergelerine](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md) bakın.

## Bir AMP önbelleğini nasıl seçerim?

Bir yayıncı olarak, bir AMP önbelleği seçmezsiniz, aslında kullanmak için amp önbelleğini (varsa) seçen _içeriğinize bağlanan platformdur_.

Bu, içerik dağıtımının yayıncının sorumluluğunda olduğu tipik modelin tersine çevrilmesidir. Bununla birlikte, bu model, platformların kullanıcılarına öngörülebilir yük performansı sağlamasına izin verir ve diğer şeylerin yanı sıra, AMP'nin ön oluşturma aşamasında gerekli güvenlik ve gizlilik değişmezlerini sağlamalarına izin verir. AMP Önbellekleri oluşturmak için katı kurallar hakkında bilgi edinmek için bkz. [AMP Önbellek Kuralları](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md).

## Önbelleğe almayı devre dışı bırakabilir miyim?

Önbelleğe alma, AMP ekosisteminin temel bir parçasıdır. Geçerli bir AMP belgesi yayınlamak, belgeyi otomatik olarak önbellek dağıtımına dahil eder.

Belgenizin önbelleğe alınmasını istemiyorsanız, bir seçenek HTML etiketinden `amp` özniteliğini kaldırmaktır. Bu, belgeyi teknik olarak geçersiz kılar ve belgenin işlevselliğini etkilemez.

## Önbelleğe alınmış AMP sayfalarını kim ister?

Önbelleğe alınmış AMP sayfalarına platformlar (Google Arama, Google Haberler ve Bing gibi) ve mobil uygulamalar tarafından erişilir. Mobil uygulamalar, önbelleğe alınmış AMP içeriğine URL aracılığıyla (Google'ın [AMP URL API](https://developers.google.com/amp/cache/use-amp-url)'sine bakın) veya Aşamalı Web Uygulamalarında çapraz kaynaklı XHRs aracılığıyla bağlanabilir (daha fazla bilgi için [AMP'yi veri kaynağı olarak yerleştirme ve kullanma](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## AMP sayfam nasıl önbelleğe alınır?

AMP biçimini kullanarak, içeriğinizi AMP Önbellekleri tarafından önbelleğe alınmaya hazır hale getiriyorsunuz. AMP sayfanızın AMP önbelleğine girmesinin birkaç yolu vardır:

- **Platform keşfi**: Platformlar AMP içeriğinizi `<html ⚡>` veya `<html amp>` etiketi ile keşfedin ve içeriği önbelleğe alın. Örneğin, Google Arama içeriği tarar; tanımlanmış ve geçerli AMP sayfaları için içerik Google AMP önbelleğine eklenir.

- **Önbellek URL isteği**: Platformlar, özellikle AMP Önbellek URL biçimini kullanarak bir AMP sayfası isteyebilir. AMP Önbelleği ters proxy görevi görür, bu nedenle platform sayfaya eriştiğinde sayfanın otomatik olarak önbelleğe alınmasına neden olur.

  - Google AMP Önbellek URL örneği: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **NOT –** AMP Önbellek URL'si kullanıcıya yönelik bir URL değildir, yani kullanıcılar genellikle bu URL'ler aracılığıyla içerik talep etmezler. [/tip]

- **Yayıncı eklenmesi**: Yayıncılar özellikle AMP sayfasını AMP önbelleğine ekleyebilir. Bu seçenek yalnızca Google AMP önbelleği için geçerlidir (bkz. [Google AMP Önbelleği: AMP İçeriğini Güncelleme](https://developers.google.com/amp/cache/update-cache)).

## Ek kaynaklar

- [AMP Projesi'nin AMP Önbellek yönergeleri](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
- [Google AMP Önbelleğine genel bakış](https://developers.google.com/amp/cache/overview)
- [Bing AMP Önbellek belgeleri](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
