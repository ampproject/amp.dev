---
'$title': AMP Önbellek URL Biçimi ve İstek İşleme
$order: 9
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

Mümkün olduğunda, Google AMP Önbelleği, önce [IDN'den (punycode)](https://en.wikipedia.org/wiki/Punycode) UTF-8'e dönüşüm yaparak her AMP belgesinin alan adı için bir alt alan adı oluşturur. Önbellekler her `-` (tireyi) `--` (2 tire) ile değiştirir ve her `.` (noktayı) `-` (tire) ile değiştirir. Örneğin, `pub.com`, `pub-com.cdn.ampproject.org` ile eşleşecektir.

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

AMP Önbelleği, `example-com.cdn.ampproject.org` gibi değiştirilmiş bir URL'deki belgeleri sunar. Orjinal etki alanı adının ilk noktalı bileşeni olan `example.com`, `example-com` olur. Bu belge, “etki alanı öneki” olarak bu noktalı olmayan dizeye, `example-com`'a başvurur. Bu dönüşümü gerçekleştiren algoritma için aşağıya bakın.

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
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
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
3. 2.adımın çıktısından son 4 karakteri kaldırın, bunlar her zaman `=` (equals) (eşittir) karakterleridir.

Geri dönüş algoritması, `-` (tire) olmadan aşağıdaki gibi 52 karakterlik bir dize üretecektir:<br>`v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### Kombine Algoritma

Kombine algoritma aşağıdaki gibidir:

1. Temel algoritmayı çalıştırın. Çıktı geçerli bir DNS etiketi ise, Önbellek etki alanı sonekini ekleyin ve döndürün, örneğin `example-com.cdn.ampproject.org`. Aksi takdirde 2.adıma geçin.
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

Öncelikle, protokol önekini (<code>https://</code>) ve <code>.cdn.ampproject.org</code> gibi AMP Önbellek alanı sonekini kaldırın. Sonek, <a>caches.json</a> dosyasında listelenen önbelleklerden herhangi birinden olabilir. Kalan dize “etki alanı öneki”olacaktır. Yukarıdaki iki örnek durumunda, "etki alanı öneki" şu şekildedir:

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

Ardından, “etki alanı öneki”nin en az bir ‘`-`’ (kısa çizgi) içerip içermediğini kontrol edin. Bir veya daha fazla kısa çizgi içermesi en yaygın durumdur. "Etki alanı öneki" en az bir ‘`-`’ (kısa çizgi) içermiyorsa, AMP Önbellek Kaynağı doğrudan tersine çevrilemez. Bunun yerine, olası yayıncı etki alanları kümesini biliyorsanız, bu belgede yukarıda belirtilen etki alanı adı algoritmasını kullanarak AMP Önbellek Kaynakları kümesini oluşturabilirsiniz. Daha sonra sabit kümeye karşı doğrulayabilirsiniz.

Algoritmanın geri kalanı, “etki alanı öneki”nin en az bir ‘`-`’ (kısa çizgi) içerdiğini varsayar.

1. Etki alanı öneki `xn--` ile başlarsa, punycode “etki alanı öneki” kodunu çözer. Örneğin, `xn---com-p33b41770a`, `⚡😊-com` olur. Punycode için bkz. [RFC 3492](https://tools.ietf.org/html/rfc3492)
2. Etki alanı öneki "`0-`" ile başlar ve "`-0`" ile sona ererse, hem "`0-`" önekini hem de "-0" sonekini çıkarın.
3. 2.adımda çıkarılan karakterleri sırayla tekrarlayın ve karşılaşıldığı gibi yayınlayın. Bir "`-`" (kısa çizgi) ile karşılaştığınızda, aşağıdaki karaktere bakın. Aşağıdaki karakter de bir "`-`" (kısa çizgi) ise, her iki karakteri de girdiden atlayın ve tek bir `-` "(kısa çizgi) verin. Aşağıdaki karakter başka bir karakter ise, yalnızca geçerli tek "`-`" (kısa çizgiyi) atlayın ve bir "`.`" (nokta) koyun. Örneğin, `a--b-example-com`, `a-b.example.com` olur.
4. Punycode 3. adımın sonucunu kodlayın. Punycode için bkz. [RFC 3492](https://tools.ietf.org/html/rfc3492).

5. Adımın sonucu Yayıncı Etki Alanı olacaktır. Protokol, etki alanının kendisinde kullanılamıyor, ancak ya `http` ya da `https`. Bağlantı noktası her zaman protokol için varsayılandır.

## Yönlendirme ve Hata İşleme

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
