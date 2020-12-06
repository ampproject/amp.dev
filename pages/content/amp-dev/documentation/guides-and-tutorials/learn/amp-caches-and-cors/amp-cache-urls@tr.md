---
"$title": AMP Önbellek URL Biçimi ve İstek İşleme
"$order": '9'
toc: 'false'
formats:
- websites
- stories
- ads
author: Gregable
contributors:
- sebastianbenz
---

Bu belgede, AMP Önbellek URL biçimi ve istekleri nasıl işlediği hakkında bilgi edineceksiniz.

## URL Biçimi

When possible, the Google AMP Cache will create a subdomain for each AMP document's domain by first converting it from [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) to UTF-8. The caches replaces every `-` (dash) with `--` (2 dashes) and replace every `.` (dot) with `-` (dash). For example, `pub.com` will map to `pub-com.cdn.ampproject.org`.

Bir URL'yi AMP önbellek sürümüne dönüştürmek için bu URL hesaplayıcısını kullanabilirsiniz:

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] Bir URL'yi kaynak noktasından AMP Önbellek URL biçimine çevirmek için [AMP-Önbellek URL Araç Kutusu](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) [Node.js](https://nodejs.org) modülünü kullanın. [/tip]

Bu belge şunları açıklar:

- AMP önbelleğindeki URL yapısı.
- URL'lerinizin bir AMP önbelleğinde nasıl görüneceğini tahmin etme.
- Yayıncı etki alanının ne olduğunu belirlemek için bir AMP Önbellek Kaynak başlığını nasıl ters çevirirsiniz?

## Etki Alanı Adı Protokolü

Tüm belgeler AMP önbelleklerinde https protokolünü kullanır.

## Etki Alanı Adı Soneki

Tüm AMP Önbellekleri, [AMPHTML Deposu](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json) üzerinde çevrimiçi olarak bulunan bir JSON dosyasına kaydedilir. Bu dosyadaki örnek bir önbellek kaydı şöyle görünecektir:

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

Bir AMP önbelleği, `cacheDomain` tarafından belirtilen etki alanındaki kayıtları sunar. Bu durumda, etki alanı `cdn.ampproject.org` olur.

Bu belge, örnek olarak `cdn.ampproject.org` içeren URL'leri kullanır, ancak diğer önbellekler genellikle benzer bir URL yapısı kullanır.

## Etki Alanı Adı Öneki

An AMP Cache serves documents on an altered URL, such as `example-com.cdn.ampproject.org`. The first dotted component of the original domain name in the example, `example.com`, becomes `example-com`. This document refers to this non-dotted string, `example-com`, as the “domain prefix”. See below for the algorithm that performs this transformation.

https (TLS) sertifikalarının kısıtlanması nedeniyle bu önekde `example.com.cdn.ampproject.org` gibi birden çok noktalı bileşen kullanılmaz, [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1):

```
Adlar, herhangi bir tek alan adı bileşeni veya bileşen parçasıyla eşleştiği düşünülen joker karakteri * içerebilir. Örneğin, *.a.com, foo.a.com ile eşleşir ama bar.foo.a.com ile eşleşmez.
```

Yayıncı alanlarının uzunluğu 255 karaktere kadar olabilirken, her alan öneki 63 karakterle sınırlıdır, [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11)'e göre:

```
Herhangi bir etiketin uzunluğu 1 ile 63 sekizlik arasında sınırlıdır. Tam alan adı 255 sekizliyle (ayırıcılar dahil) sınırlıdır.
```

Tüm yayıncı etki alanları benzersiz bir etki alanı önekiyle eşleşir. Bunu yapmak için kullanılan algoritma, eşlemeyi insan tarafından okunabilir hale getirmeye çalışır. Ancak, eşleme, çok uzunsa ve aşağıda açıklanan durumlarda yayıncı etki alanları için güvenli bir karma kullanmaya geri döner:

### Temel Algoritma

Bir yayıncı etki alanını, etki alanı önekine dönüştürmek için temel algoritma aşağıdaki gibidir:

1. Punycode yayıncı etki alanının kodunu çözün. [RFC 3492](https://tools.ietf.org/html/rfc3492) bakın
2. 1. adımın çıktısındaki herhangi bir "`-`" (kısa çizgi) karakterini "`--`" (iki kısa çizgi) ile değiştirin.
3. 2. adımın çıktısındaki herhangi bir "`.`" (nokta) karakterini "`-`" (kısa çizgi) ile değiştirin.
4. 3.adımın çıktısı 3 ve 4 konumlarının her ikisinde de "`-`" (kısa çizgi) içeriyorsa, adım 3'ün çıktısına "`0-`" önekini ekleyin ve "`-0`"sonekini ekleyin. Arka plan için [#26205](https://github.com/ampproject/amphtml/issues/26205)'e bakın.
5. Punycode 3.adımın çıktısını kodlar. [RFC 3492](https://tools.ietf.org/html/rfc3492) bakın

Temel algoritmanın birkaç örneği:

<table>
  <tr>
   <td>
<strong>Yayıncı Etki Alanı</strong>
   </td>
   <td>
<strong>Etki Alanı Öneki</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)    </td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)    </td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

Temel algoritmayı çalıştırdıktan sonra, yalnızca etki alanı öneki geçerli bir DNS etiketi değilse, aşağıda açıklanan geri dönüş algoritmasını çalıştırırız.

Etki alanı öneki, 63 karakterden uzunsa geçerli bir DNS etiketi değildir

### Geri Dönüş Algoritması

Bir yayıncı etki alanını bir etki alanı önekine dönüştürmek için geri dönüş algoritması aşağıdaki gibidir:

1. SHA256 kullanarak yayıncının etki alanını hash haline getirin.
2. Base32 1.adımın çıktısından çıkar.
3. Remove the last 4 characters from the output of step 2, which are always `=` (equals) characters.

Geri dönüş algoritması, `-` (tire) olmadan aşağıdaki gibi 52 karakterlik bir dize üretecektir:<br>`v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Kombine Algoritma

Kombine algoritma aşağıdaki gibidir:

1. Run the Basic Algorithm. If the output is a valid DNS label, append the Cache domain suffix and return, for example `example-com.cdn.ampproject.org`. Otherwise continue to step 2.
2. Geri dönüş algoritmasını çalıştırın. Önbellek etki alanı sonekini ekleyin ve döndürün, örneğin: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

## URL Yolu

AMP önbelleğindeki bir URL'nin "yolu" her zaman `/c` gibi bir veya daha fazla önek dizininden ve ardından yalnızca yayıncı URL'si http `s` ise ve ardından protokol olmadan yayıncı belgesinin URL'si ise bir `/s` orta ekinden oluşur.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Önbelleğe alınmış URL biçimlerini gösteren görüntü') }}

`/c` gibi önek dizinleri, AMP önbelleğinin gerçekleştirebileceği farklı hizmet türlerine karşılık gelir. Farklı AMP Önbellekleri farklı servis türlerini destekleyebilir ve bu kapsamlı bir liste değildir:

- `/c` - <strong>C</strong>ontent: Bu, bazı arayüzlerde doğrudan bağlanabilen, bağımsız bir sayfa olarak sunulan bir AMP belgedir.
- `/v` - <strong>V</strong>iewer: Bu aynı zamanda bir AMP belgesidir, ancak bir Arama Sonucu Sayfası veya başka bir arayüz bağlamında bir AMP belgesini görüntüleyen bir çerçeve ortamı olan [AMP Görüntüleyici](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer) de sunular.
- `/wp` - <strong>W</strong>eb <strong>P</strong>ackage: Bu, bir web paketi teknolojisi olan [İmzalı Değişim](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) olarak hizmet veren bir AMP belgesidir. Bu URL'ler, yayıncının kendi kaynağına yönlendirmeler gibi davranır.
- `/cert` - <strong>Cert</strong>ificate: Bu, [İmzalı Değişim](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) ile kullanılmak üzere genel bir sertifikadır.
- `/i` - <strong>I</strong>mage: Bu, genellikle bir belge alt kaynağı olarak AMP önbelleği tarafından sunulan bir görüntüdür.
- `/ii` - <strong>I</strong>mage: Bu aynı zamanda AMP önbelleği tarafından sunulan bir görüntüdür, ancak genellikle belgenin talep ettiği maksimum genişliği gösteren `/ii/w800` gibi diğer önbellek yapılandırma parametreleriyle birleştirilebilir. Önbellek, tarayıcı için bant genişliğinden tasarruf etmek için burada farklı bir ölçekte görüntüler üretebilir.

Ayrıca, AMP Önbellekleri, yayıncı belge sorgusunun bir parçası olmayan belge URL'sine özel sorgu parametreleri eklemeyi seçebilir. Örneğin [`<amp-live-list>`](../../../components/reference/amp-live-list.md), `amp_latest_update_time<` parametresiyle bir belgeyi getirerek yenileme isteklerinde bulunur. Belge tarandığında bu parametreler kaynağa iletilmez, ancak AMP Önbelleğinde isteği yapılandırmak için kesinlikle bulunur.

## CORS Kaynakları

Birçok yayıncı, ek veri almak için AMP belgelerinden CORS isteklerini kullanır. CORS istekleri, isteği yapan belgenin kaynağını belirten istekte bir `Origin:` HTTP üstbilgisi göndererek çalışır. Yukarıda görüldüğü gibi, belgenin kaynağı bir AMP Önbelleğindeki orijinal belgeden farklıdır. Yukarıdaki etki alanı adı bölümlerinde, bir yayıncı URL'si verilen bir AMP Önbellek URL'sinin Kaynağını belirlemeye yönelik algoritmayı bulabilirsiniz. Aşağıda, CORS `Origin:` istek üstbilgisini orijinal yayıncı etki alanına geri döndürmek için ters algoritmayı belirtiyoruz.

### Yayıncı Etki Alanına AMP Önbellek Kaynağı

Bir AMP Önbellek Kaynağı başlık değeri aşağıdaki örneklerden biri gibi görünecektir:

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

First, remove the protocol prefix (`https://`) and the AMP Cache domain suffix, such as `.cdn.ampproject.org`. The suffix may be from any one of the caches listed in [caches.json](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/caches.json). The remaining string will be the “domain prefix”. In the case of the above two examples, the “domain prefix is:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Next, check to see if the “domain prefix” contains at least one ‘`-`’ (hyphen). Containing one or more hyphens is the most common case by far. If the “domain prefix” does not contain at least one ‘`-`’ (hyphen), the AMP Cache Origin cannot be reversed directly. Instead, if you know the set of possible publisher domains, you can create the set of AMP Cache Origins using the Domain Name algorithm further above in this document. You can then validate against the fixed set.

The rest of the algorithm assumes that the “domain prefix” contains at least one ‘`-`’ (hyphen).

1. Etki alanı öneki `xn--` ile başlarsa, punycode “etki alanı öneki” kodunu çözer. Örneğin, `xn---com-p33b41770a`, `⚡😊-com` olur. Punycode için bkz. [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Etki alanı öneki "`0-`" ile başlar ve "`-0`" ile sona ererse, hem "`0-`" önekini hem de "-0" sonekini çıkarın.
3. 2.adımda çıkarılan karakterleri sırayla tekrarlayın ve karşılaşıldığı gibi yayınlayın. Bir "`-`" (kısa çizgi) ile karşılaştığınızda, aşağıdaki karaktere bakın. Aşağıdaki karakter de bir "`-`" (kısa çizgi) ise, her iki karakteri de girdiden atlayın ve tek bir `-` "(kısa çizgi) verin. Aşağıdaki karakter başka bir karakter ise, yalnızca geçerli tek "`-`" (kısa çizgiyi) atlayın ve bir "`.`" (nokta) koyun. Örneğin, `a--b-example-com`, `a-b.example.com` olur.
4. Punycode 3. adımın sonucunu kodlayın. Punycode için bkz. [RFC 3492](https://tools.ietf.org/html/rfc3492).

The result of Step 4 will be the Publisher Domain. The protocol is unavailable from the domain itself, but is either `http` or `https`. The port is always the default for the protocol.

## Redirect & Error Handling

AMP önbelleğinin yönlendirmeleri ve hataları nasıl ele aldığına dair bazı örnekler:

**Yönlendirmeler**

AMP önbelleği, AMP URL'lerini çözerken yönlendirmeleri takip eder. Örneğin, bir URL başka bir AMP URL'sine yönlendirilirse:

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

Daha sonra AMP önbelleği, orijinal URL için çözülmüş yönlendirmenin içeriğini döndürür.

Örnek: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

Önemli: Sunucunuzdaki AMP dosyalarının konumunu taşırsanız, eski konumdan yenisine bir yönlendirme ayarladığınızdan emin olun.

**Bulunamadı**

AMP önbelleğinde bir sayfa bulunmadığında, bir hata sayfası gösterecek ve bir 404 durumu döndürecektir.

Örnek: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**Geçersiz AMP**

Bir sayfa geçersiz AMP olduğunda, AMP önbelleği standart sayfaya yönlendirilir.

Örnek: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**Sunucu Hataları**

URL bir 5xx sunucu hatası döndürürse, AMP Çnbelleği bir 404 durumu döndürür.

Örnek: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
