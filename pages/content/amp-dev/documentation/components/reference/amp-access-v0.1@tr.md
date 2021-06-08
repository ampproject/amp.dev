---
$title: amp-access
$category@: dynamic-content
teaser:
  text: AMP ödeme duvarı ve abonelik desteği sağlar.
---



AMP Access veya "AMP ödeme duvarı ve abonelik desteği", Yayıncılara, abonelik durumu, görüntüleme sayısı ve diğer faktörlere dayalı olarak bir Okuyucunun hangi içeriğe hangi kısıtlamalarla erişilebileceğini kontrol etme imkanı sağlar.

# amp-access <a name="amp-access"></a>


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
    <td><strong>Durum</strong></td>
    <td>Kararlı</td>
  </tr><tr>
  <td class="col-fourty"><strong>Zorunlu Komut Dosyası</strong></td>
  <td>
    <div>
      <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js">&lt;/script></code>
    </div>
  </td>
</tr>
<tr>
  <td class="col-fourty"><strong>Örnekler</strong></td>
  <td><a href="https://ampbyexample.com/components/amp-access/">amp-access için ek açıklamalı kod örneği</a></td>
</tr>
</table>

## `amp-subscriptions` ilişkisi <a name="relationship-to-amp-subscriptions"></a>

[`amp-subscriptions`](amp-subscriptions.md) uzantısı, `amp-access` için benzer özellikler sunar. Bununla birlikte, daha özel bir Access ödeme duvarı protokolünü destekler. Bazı önemli farklılıklar şunlardır:

1. `amp-subscriptions` yetki verme yanıtı, amp-access yetkilendirmesine benzer ancak sıkı bir şekilde tanımlanmış ve standart hale getirilmiştir.
1. `amp-subscriptions` uzantısı, sayfanın Access ödeme duvarı kararlarına katılması için birden çok hizmetin yapılandırılmasına olanak tanır. Bu hizmetler eşzamanlı olarak yürütülür ve olumlu yanıt döndüren hizmete göre öncelikli olan hizmet belirlenir.
1. AMP görüntüleyicilerinin, erişim kanıtı olarak yayıncılarla yapılan bağımsız bir sözleşmeye göre `amp-subscriptions` öğesine imzalı bir yetkilendirme yanıtı sağlamasına izin verilir.
1. `amp-subscriptions` öğesinde içerik işaretlemesi, uygulamaların ve tarayıcıların premium içerik bölümlerini kolayca tespit etmesine olanak tanıyacak şekilde standartlaştırılmıştır.

İşaretlemenin standartlaştırılmasından dolayı birden çok sağlayıcı, görüntüleyiciyi desteklemekte ve görüntüleyici desteğini iyileştirmektedir. Yeni yayıncı ve ödeme duvarı sağlayıcısı uygulamalarının `amp-subscriptions` kullanması önerilir.

## Çözüm <a name="solution"></a>

Önerilen çözüm Yayıncının aşağıdaki kararlar ve akışlar üzerinde kontrol sahibi olmasını sağlar:

- Kullanıcı oluşturma ve sağlama
- Ölçüm kontrolü (belirli sayıda ücretsiz görüntülemeye izin verme)
- Giriş akışının sorumluluğu
- Kullanıcı kimliği doğrulamasının sorumluluğu
- Erişim kurallarının ve yetkilendirmenin sorumluluğu
- Doküman temelinde erişim parametrelerinde esneklik

Çözüm aşağıdaki bileşenlerden oluşur:

1. [**AMP Okuyucu Kimliği**](#amp-reader-id): AMP ekosistemi tarafından sağlanan bu bileşen, AMP tarafından görüldüğü şekliyle Okuyucu benzersiz tanımlayıcısıdır.
1. [**Access İçerik İşaretlemesi**](#access-content-markup): Yayıncı tarafından yazılır, bir dokümanın hangi bölümlerinin hangi durumlarda görülebileceğini tanımlar.
1. [**Yetkilendirme uç noktası**](#authorization-endpoint): Yayıncı tarafından sağlanır, Okuyucunun bir dokümanın hangi bölümünü kullanabileceğini açıklayan yanıtı döndürür.
1. [**Pingback uç noktası**](#pingback-endpoint): Yayıncı tarafından sağlanır, bir dokümanın “görünüm” gösterimini göndermek için kullanılır.
1. [**Giriş Bağlantısı ve Giriş Sayfası**](#login-page-and-login-link): Yayıncının, Okuyucunun kimliğini doğrulamasına ve Okuyucu kimliğini, AMP Okuyucu Kimliğine bağlamasına olanak tanır.

Google AMP Önbelleği, bazı bölümleri Access İçerik İşaretlemesi ile kapatılmış bir şekilde dokümanı Okuyucuya döndürür. AMP Çalışma Zamanı, Yetkilendirme uç noktasını çağırır ve yanıtı, Access İçerik İşaretlemesi ile tanımlandığı şekliyle farklı bölümleri gizlemek veya göstermek için kullanır. Doküman Okuyucuya gösterildikten sonra AMP Çalışma Zamanı, Yayıncının geri sayım sayacını (kullanılan ücretsiz görüntüleme sayısı) güncellemek için kullanabileceği Pingback uç noktasını çağırır.

Çözüm, Yayıncının AMP dokümanına, Okuyucunun kimliğini doğrulayabileceği ve sistemindeki Okuyucu kimliğini, AMP Okuyucu Kimliği ile ilişkilendirebileceği Giriş/Abone Olma sayfasını açan bir Giriş Bağlantısı yerleştirmesine de olanak tanır.

Temel biçiminde bu çözüm, dokümanı eksiksiz (ancak bazı bölümleri kapatılmış) olarak Okuyucuya gönderir ve sadece Yetkilendirme yanıtına göre kısıtlı bölümleri gösterir/gizler. Bununla birlikte, çözüm, kısıtlanmış bölümlerin ilk doküman yayınına dahil edilmediği ve yalnızca yetkilendirme onaylandıktan sonra indirilebildiği "sunucu" seçeneğini de sağlar.

AMP Access'in desteklenmesi, Yayıncının yukarıda açıklanan bileşenleri uygulamasını gerektirir. Access İçerik İşaretlemesi ve Yetkilendirme uç noktası zorunludur. Pingback uç noktası ve Giriş Sayfası isteğe bağlıdır.

### AMP Okuyucu Kimliği <a name="amp-reader-id"></a>

Erişim hizmetlerine ve kullanım alanlarına yardımcı olmak için AMP Access, *Okuyucu Kimliği* kavramını kullanıma sunmuştur.

Okuyucu Kimliği, AMP ekosistemi tarafından oluşturulan anonim ve benzersiz bir kimliktir. Bu kimlik, her Okuyucu/Yayıncı çifti için benzersizdir. Bir Okuyucu, iki farklı Yayıncı için farklı şekillerde tanımlanır. Bu, geri alınamayan bir kimliktir. Okuyucu Kimliği, tüm AMP/Yayıncı iletişimlerine dahil edilir ve çok yüksek entropiye sahiptir. Yayıncılar, Okuyucuyu tanımlamak ve kendi kimlik sistemleriyle eşlemek için Okuyucu Kimliğini kullanabilir.

Okuyucu Kimliği, kullanıcı cihazında oluşturulur ve uzun ömürlü olacak şekilde tasarlanmıştır. Bununla birlikte, gizli pencereler için olanlar da dahil olmak üzere normal tarayıcı depolama kurallarına uyar. Okuyucu Kimliğinin istenilen ömrü, kullanımlar arasında 1 yıl veya kullanıcı çerezlerini temizleyene kadardır. Okuyucu Kimlikleri şu anda cihazlar arasında paylaşılmamaktadır.

Okuyucu Kimliği, [burada](https://docs.google.com/document/d/1f7z3X2GM_ASb3ZCI_7tngglxwS6WoWi1EB3aKzdf6vo/edit#heading=h.hb9q0wpwwhuf) açıklanan ExternalCID öğesini oluşturmak için kullanılan mekanizmaya benzer şekilde oluşturulur. Örnek bir Okuyucu Kimliği şöyledir: `amp-OFsqR4pPKynymPyMmplPNMvxSTsNQob3TnK-oE3nwVT0clORaZ1rkeEz8xej-vV6`.

### AMP Access ve Çerezler <a name="amp-access-and-cookies"></a>

Yayıncılar kendi kimlik doğrulama çerezlerini veya Kullanıcı Kimliğini ya da bu ikisinin bir kombinasyonunu kullanabilir.

### Access İçerik İşaretlemesi <a name="access-content-markup"></a>

Access İçerik İşaretlemesi, Yetkilendirme uç noktasından döndürülen Yetkilendirme yanıtına göre hangi bölümlerin görünür veya gizli olacağını belirler. Özel işaretleme özellikleriyle açıklanır.

### Yetkilendirme Uç Noktası <a name="authorization-endpoint"></a>

Yetkilendirme, yayıncı tarafından sağlanan ve AMP Çalışma Zamanı veya Google AMP Önbelleği tarafından çağrılan bir uç noktadır. Kimlik bilgisi içeren bir CORS GET uç noktasıdır. Bu uç nokta, dokümanın farklı bölümlerini gizlemek veya göstermek için İçerik İşaretlemesi tarafından kullanılabilecek erişim parametrelerini döndürür.

### Pingback Uç Noktası <a name="pingback-endpoint"></a>

Pingback, yayıncı tarafından sağlanan ve AMP Çalışma Zamanı veya Google AMP Önbelleği tarafından çağrılan bir uç noktadır. Kimlik bilgisi içeren bir CORS POST uç noktasıdır. Okuyucu dokümanı görüntülemeye başladığında AMP Çalışma Zamanı, bu uç noktayı otomatik olarak çağırır. Bu uç nokta, Okuyucu Giriş Akışını başarıyla tamamladıktan sonra da çağrılır. Pingback'in ana hedeflerinden biri, Yayıncının ölçüm bilgilerini güncellemesidir.

Pingback isteğe bağlıdır. `noPingback` yapılandırma özelliği `true` değerine ayarlanarak devre dışı bırakılabilir.

### Giriş Sayfası ve Giriş Bağlantısı <a name="login-page-and-login-link"></a>

Giriş Sayfası, Yayıncı tarafından uygulanıp sunulur ve AMP Çalışma Zamanı tarafından çağrılır. Normalde bir tarayıcı iletişim kutusu olarak gösterilir.

Giriş Sayfası, Yayıncı tarafından dokümanın herhangi bir yerine yerleştirilebilen Giriş Bağlantısına Okuyucu dokunduğunda tetiklenir.

## Spesifikasyon v0.1 <a name="specification-v01"></a>

### Yapılandırma <a name="configuration"></a>

Tüm uç noktalar, AMP dokümanının HEAD bölümünde bir JSP nesnesi olarak yapılandırılır:

```html

<script id="amp-access" type="application/json">
  {
    "property": value,
    ...
    }
</script>

```

Bu yapılandırmada aşağıdaki özellikler tanımlanır:

<table>
  <tr>
    <th>Mülk</th>
    <th>Değerler</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorization</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>Yetkilendirme uç noktasının HTTPS URL'si.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>pingback</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>Pingback uç noktasının HTTPS URL'si.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>noPingback</code></td>
    <td>true/false</td>
    <td>True değerinde, pingback'i devre dışı bırakır.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>login</code></td>
    <td class="col-twenty"><code>&lt;URL&gt;</code> veya<br><code>&lt;Map[string, URL]&gt;</code></td>
    <td>Giriş Sayfası için HTTPS URL'si veya farklı türlerdeki giriş sayfaları için bir URL kümesi.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationFallbackResponse</code></td>
    <td><code>&lt;object&gt;</code></td>
    <td>Başarısız olursa yetkilendirme yanıtının yerine kullanılacak JSON nesnesi.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationTimeout</code></td>
    <td><code>&lt;number&gt;</code></td>
    <td>Sonrasında yetkilendirme isteğinin başarısız olarak kabul edileceği (milisaniye cinsinden) zaman aşımı değeri. Varsayılan 3000'dir. 3000'den büyük değerlere yalnızca geliştirme ortamında izin verilir. </td>
  </tr>
  <tr>
    <td class="col-fourty"><code>type</code></td>
    <td>"client" veya "server"</td>
    <td>Varsayılan değer “client” değeridir. "Server" seçeneğinin tasarım tartışması devam etmektedir ve hazır olduğunda, bu dokümanlar güncellenecektir.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>namespace</code></td>
    <td>string</td>
    <td>Varsayılan değer boş olmasıdır. Ad alanı, birden çok erişim sağlayıcısı belirtilirse zorunlu olur.</td>
  </tr>
</table>

*`<URL>`* değerleri, HTTPS URL'lerini değişiklik değişkenleriyle belirtir. Değişiklik değişkenleri, aşağıdaki [Access URL'si Değişkenleri](#access-url-variables) bölümünde daha ayrıntılı olarak ele alınmaktadır.

Bir örnek AMP Access yapılandırmasını burada görebilirsiniz:

```html

<script id="amp-access" type="application/json">
{
  "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
  "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
  "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
  "authorizationFallbackResponse": {"error": true}
}
</script>

```

#### Birden fazla erişim sağlayıcı <a name="multiple-access-providers"></a>

Tek bir nesne yerine bir dizi kullanan ve her giriş için bir `namespace` sağlayan birden fazla erişim sağlayıcı belirtmek mümkündür.

```html

<script id="amp-access" type="application/json">
[
  {
    "property": value,
    ...
    "namespace": value
  },
  ...
]
</script>
```

### Access URL'si Değişkenleri <a name="access-url-variables"></a>

Çeşitli uç noktalar için URL'leri yapılandırırken, Yayıncı değişiklik değişkenlerini kullanabilir. Bu değişkenlerin tam listesi, [AMP Var Spesifikasyonu](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)'nda tanımlanmaktadır. Buna ek olarak, bu spesifikasyon `READER_ID` ve `AUTHDATA` gibi erişime özel birkaç değişken de ekler. En alakalı değişkenlerden bazıları aşağıdaki tabloda açıklanmıştır:

<table>
  <tr>
    <th>Değişken</th>
    <th>Açıklama</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>READER_ID</code></td>
    <td>AMP Okuyucu Kimliği.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AUTHDATA(field)</code></td>
    <td>Yetkilendirme yanıtındaki alanın değeri.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RETURN_URL</code></td>
    <td>Bir Giriş İletişim Kutusunun dönmesi için AMP çalışma zamanı tarafından belirtilen geri dönüş URL'si için yer tutucu.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>SOURCE_URL</code></td>
    <td>Bu AMP dokümanının Kaynak URL'si. Doküman bir CDN'den sunulduysa AMPDOC_URL bir CDN URL'si olurken SOURCE_URL, orijinal kaynak URL'si olur.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AMPDOC_URL</code></td>
    <td>Bu AMP dokümanının URL'si.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>CANONICAL_URL</code></td>
    <td>Bu AMP dokümanının standart URL'si.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>DOCUMENT_REFERRER</code></td>
    <td>Yönlendiren URL.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>VIEWER</code></td>
    <td>AMP Görüntüleyici'nin URL'si.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RANDOM</code></td>
    <td>Rastgele bir sayı. Tarayıcı önbelleğine almayı engellemek için kullanışlıdır.</td>
  </tr>
</table>

Okuyucu Kimliği, Standart URL, Yönlendirme bilgisi ve rastgele önbellek engelleme bilgileriyle genişletilmiş bir URL örneğini burada bulabilirsiniz:
```text
https://pub.com/access?
  rid=READER_ID
  &url=CANONICAL_URL
  &ref=DOCUMENT_REFERRER
  &_=RANDOM
```

AUTHDATA değişkeni, Pingback ve Giriş URL'leri için kullanılabilir. Değişken, herhangi bir alanın yetkilendirme yanıtında bir URL parametresi olarak geçirilmesine olanak tanır. Ör. `AUTHDATA(isSubscriber)`. `AUTHDATA(other.isSubscriber)` gibi iç içe yerleştirilmiş ifadelere de izin verilir. Ad alanları kullanılıyorsa bunlar alanın önüne eklenebilir; örneğin, `AUTHDATA(anamespace.afield)`.

### Access İçerik İşaretlemesi <a name="access-content-markup-1"></a>

Access İçerik İşaretlemesi, hangi bölümlerin görünür veya gizli olduğunu açıklar. İki AMP özelliğinden oluşur: herhangi bir HTML öğesine yerleştirilebilen `amp-access` ve `amp-access-hide`.

`amp-access` özelliği, Yetkilendirme uç noktası tarafından döndürülen yetkilendirme yanıtına göre doğru veya yanlış sonucu veren ifadeyi sağlar. Sonuç değeri, öğenin ve içeriğinin görünür olup olmayacağını belirtir.

`amp-access` değeri, SQL benzeri bir dilde tanımlanan bir boole ifadesidir. Dilbilgisi, [Ek A](#appendix-a-amp-access-expression-grammar)'da tanımlanmıştır. Şu şekilde tanımlanır:
```html

<div amp-access="expression">...</div>
```
Özellikler ve değerler, Yetkilendirme uç noktası tarafından döndürülen Yetkilendirme yanıtının özelliklerini ve değerlerini belirtir. Bu, farklı erişim senaryolarını desteklemek için esnek bir sistem sağlar. Ad alanları kullanılıyorsa bunları "anamespace.aproperty" gibi özellik adlarının önüne eklemeniz yeterli olur.

"amp-access-hide" özelliği, Yetkilendirme yanıtı alınmadan önce öğeyi iyimser bir şekilde gizlemek için kullanılabilir. Yetkilendirme yanıtı, öğenin gösterilmesini sağlayabilir. “Varsayılan olarak görünmez” anlamını sağlar. Yetkilendirme tarafından daha sonra döndürülen yetkilendirme yanıtı, bu varsayılan ayarı iptal edebilir ve bölümü görünür hale getirebilir. "amp-access-hide" özelliği atlandığında, bölüm varsayılan olarak gösterilir/dahil edilir. "amp-access-hide" özelliği yalnızca "amp-access" özelliğiyle birlikte kullanılabilir.
```html
<div amp-access="expression" amp-access-hide>...</div>
```

Yetkilendirme isteği başarısız olursa "amp-access" ifadeleri değerlendirilmez ve bir bölümün görünür veya gizli olup olmadığı, başlangıçta doküman tarafından sağlanan `amp-access-hide` özelliğinin varlığıyla belirlenir.

"amp-access-*" özellik grubunu, farklı kod karartma ve oluşturma gereksinimlerini desteklemek için gereken şekilde genişletebiliriz.*

Yetkilendirme isteği başarısız olursa ve dokümanlarda "authorizationFallbackResponse" yanıtı belirtilmemişse "amp-access" ifadeleri değerlendirilmez ve bir bölümün görünür veya gizli olup olmadığı, başlangıçta doküman tarafından sağlanan `amp-access-hide` özelliğinin varlığıyla belirlenir.

Abonelik durumuna göre giriş bağlantısının veya tam içeriğin gösterildiği bir örneği burada bulabilirsiniz:
```html
<header>
  Title of the document
</header>
<div>
  First snippet in the document.
</div>

<div amp-access="NOT subscriber" amp-access-hide>
  <a on="tap:amp-access.login">Become a subscriber now!</a>
</div>

<div amp-access="subscriber">
  Full content.
</div>

```
Burada:
- *subscriber*, Yetkilendirme uç noktası tarafından döndürülen yetkilendirme yanıtındaki bir boole alanıdır. Bu bölüm varsayılan olarak gizlidir ve isteğe bağlıdır.
- Bu örnekte, içeriğin tamamının iyimser olarak gösterilmesi seçilmiştir.

Burada, Okuyucuya ölçüm durumuyla ilgili sorumluluk reddi beyanını gösteren bir başka örneği görebilirsiniz:
```html
{% raw %}
<section amp-access="views <= maxViews">
  <template amp-access-template type="amp-mustache">
    You are reading article {{views}} out of {{maxViews}}.
  </template>
</section>
{% endraw %}
```

Son olarak burada, premium abonelere ek içerik gösteren bir örnek bulunmaktadır:
```html
<section amp-access="subscriptonType = 'premium'">
  Shhh… No one but you can read this content.
</section>
```

### Yetkilendirme Uç Noktası <a name="authorization-endpoint-1"></a>

Yetkilendirme, [AMP Access Yapılandırması](#configuration) bölümündeki `authorization` özelliği aracılığıyla yapılandırılır. Kimlik bilgisi içeren bir CORS GET uç noktasıdır. Bu isteğin nasıl güvenli hale getirileceğini öğrenmek için [CORS Kaynak Güvenliği](#cors-origin-security) konusuna bakın.

Yetkilendirme, [Access URL'si Değişkenleri](#access-url-variables) bölümünde tanımlanan parametreleri alabilir. Örneğin, AMP Okuyucu Kimliği ve doküman URL'sini geçirebilir. Yayıncı, URL parametrelerinin yanı sıra Okuyucunun IP adresi gibi HTTP protokolü aracılığıyla doğal olarak sunulan bilgileri kullanabilir. `READER_ID` öğesinin eklenmesi zorunludur.

Bu uç nokta, içeriğin farklı bölümlerini göstermek/gizlemek için içerik işaretleme ifadelerinde kullanılabilecek yetkilendirme yanıtını üretir.

İstek biçimi:
```text
https://publisher.com/amp-access.json?
rid=READER_ID
&url=SOURCE_URL</code>

Yanıt, serbest biçimli bir JSON nesnesidir: Birkaç sınırlamaya sahip tüm özellikleri ve değerleri içerebilir. Sınırlamalar şunlardır:

- Özellik adlarının, <code>amp-access</code> ifadeleri dilbilgisinin tanımladığı kısıtlamalara uyması gerekir (<a href="#appendix-a-amp-access-expression-grammar">Ek A</a>'ya bakın). Bu, çoğunlukla özellik adlarının boşluk, kısa çizgi ve “amp-access” spesifikasyonuna uymayan diğer karakterler gibi karakterleri içeremeyeceği anlamına gelir.
- Özellik değerleri yalnızca şu türlerden biri olabilir: dize, sayı, boole.
- Değerler, aynı türdeki değerlere sahip nesneler olarak iç içe yerleştirilebilir: dize, sayı, boole.
- Serileştirilmiş yetkilendirme yanıtının toplam boyutu 500 bayttan fazla olamaz.
- Lütfen yanıtın kimlik bilgileri (PII) veya kişisel veriler içermediğinden emin olun.

Yetkilendirme uç noktasından döndürülebilecek özellikler için olası fikirlerin küçük bir listesini burada görebilirsiniz:

    - Ölçüm bilgileri: İzin verilen maksimum görüntüleme sayısı ve geçerli görüntüleme sayısı.
    - Okuyucunun giriş yapıp yapmadığı veya bir abone olup olmadığı.
    - Abonelik türünün daha ayrıntılı bilgisi: temel, premium
    - Coğrafya: ülke, bölge, özel yayın bölgesi</p>

Okuyucunun abone olmadığı ve ayda 10 makale okuma hakkı varken halihazırda 6 makale görüntülediğinin ölçüldüğü bir yanıt örneğini burada görebilirsiniz:
```json
{
  "maxViews": 10,
  "currentViews": 6,
  "subscriber": false
}
```
Okuyucunun giriş yaptığı ve bir premium abonelik türüne sahip olduğu bir yanıt örneğini burada görebilirsiniz:
```json
{
  "loggedIn": true,
  "subscriptionType": "premium"
}
```
Bu RPC, ön oluşturma aşamasında çağrılabilir; dolayısıyla, Okuyucu dokümanı gerçekten hiç görmemiş olabileceğinden, geri sayım ölçümü için kullanılmamalıdır.

Dikkat edilmesi gereken bir başka önemli nokta da, bazı durumlarda AMP çalışma zamanının, her doküman gösterimi için Yetkilendirme uç noktasını birden çok kez çağırması olabilir. AMP Çalışma Zamanı, Okuyucunun erişim parametrelerinin, örneğin başarılı bir Giriş Akışından sonra önemli ölçüde değiştiğini düşündüğünde bu durum ortaya çıkabilir.

Yetkilendirme yanıtı, AMP Çalışma Zamanı ve uzantılar tarafından üç farklı amaçla kullanılabilir:

1. `amp-access` ifadeleri değerlendirilirken.
2. `amp-mustache` gibi `<template>` şablonları değerlendirilirken.
3. Pingback ve giriş URL'lerine `AUTHDATA(field)` kullanarak ek değişkenler sağlarken.

Yetkilendirme uç noktası, AMP Çalışma Zamanı tarafından, kimlik bilgileri içeren bir CORS uç noktası olarak çağrılır. Bu nedenle, CORS protokolü uygulanmalıdır. [CORS Kaynak Güvenliği](#cors-origin-security)'nde açıklandığı gibi bu hizmete erişimi kısıtlamak için CORS Kaynağını ve kaynak kökenini kullanmalıdır. Bu uç nokta, gereksinimleri için Yayıncı çerezlerini kullanabilir. Örneğin, Okuyucu Kimliği ve Yayıncının kendi kullanıcı kimliği arasındaki bağlamayı ilişkilendirebilir. AMP'nin bunu bilmesine gerek yoktur (ve tercih de etmez). Daha fazla ayrıntı için [AMP Okuyucu Kimliği](#amp-reader-id) ve [AMP Access ve Çerezler](#amp-access-and-cookies) dokümanlarına bakın.

AMP Çalışma Zamanı (daha doğrusu, tarayıcı), Yetkilendirme uç noktasını çağırırken önbellek yanıt üstbilgilerini gözlemler. Böylece, önbelleğe alınan yanıtlar yeniden kullanılabilir. Bu istenen bir durum olabilir veya olmayabilir. Bu istenen bir durum değilse Yayıncı, uç nokta URL'si için uygun önbellek kontrol üstbilgilerini ve/veya `RANDOM` değişken değişikliğini kullanabilir.

Yetkilendirme isteği başarısız olursa ve yapılandırmada belirtilmişse AMP Çalışma Zamanı, "authorizationFallbackResponse" öğesini devreye alır. Bu durumda, yetkilendirme akışı, yetkilendirme yanıtının yerine "authorizationFallbackResponse" özelliğinin değeriyle normal şekilde devam eder. "authorizationFallbackResponse" belirtilmezse yetkilendirme akışı başarısız olur. Bu durumda, `amp-access` ifadeleri değerlendirilmez ve bir bölümün görünür veya gizli olup olmayacağı, başlangıçta doküman tarafından sağlanan `amp-access-hide` özelliğinin varlığıyla belirlenir.

3 saniye sonra Yetkilendirme isteği otomatik olarak zaman aşımına uğrar ve başarısız olduğu varsayılır.

AMP Çalışma Zamanı yetkilendirme akışı sırasında şu CSS sınıflarını kullanır:

1. Yetkilendirme akışı başladığında, `amp-access-loading` CSS sınıfı doküman köküne ayarlanır ve akış tamamlandığında veya başarısız olduğunda kaldırılır.
2. Yetkilendirme akışı başarısız olduğunda, `amp-access-error` CSS sınıfı doküman kökünde ayarlanır.

*server* seçeneğinde, Yetkilendirme uç noktasına yapılan çağrı, basit bir HTTPS uç noktası olarak Google AMP Önbelleği tarafından yapılır. Bu, Yayıncı çerezlerinin bu durumda teslim edilemeyeceği anlamına gelir.

### Pingback Uç Noktası <a name="pingback-endpoint-1"></a>

Pingback, [AMP Access Yapılandırması](#configuration) bölümündeki `pingback` özelliği aracılığıyla yapılandırılır. Kimlik bilgisi içeren bir CORS POST uç noktasıdır. Bu isteğin nasıl güvenli hale getirileceğini öğrenmek için [CORS Kaynak Güvenliği](#cors-origin-security) konusuna bakın.

Pingback URL'si isteğe bağlıdır. `"noPingback": true` değeriyle devre dışı bırakılabilir.

Pingback, [Access URL'si Değişkenleri](#access-url-variables) bölümünde tanımlanan parametreleri alabilir. Örneğin, AMP Okuyucu Kimliği ve doküman URL'sini geçirebilir. `READER_ID` değişkeninin eklenmesi zorunludur.

Pingback bir yanıt oluşturmaz; yanıtlar, AMP çalışma zamanı tarafından yoksayılır.

Pingback uç noktası, Okuyucu dokümanı görüntülemeye başladığında ve Giriş Akışını başarıyla tamamladıktan sonra çağrılır.

Yayıncı şunları yapmak için Pingback kullanabilir:
- sayfanın ücretsiz görüntüleme sayısını geriye doğru sayma
- Pingback, kimlik bilgileri içeren bir CORS uç noktası olarak Yayıncı çerezlerini içerebileceğinden, AMP Okuyucu Kimliğini Yayıncının kimliğine eşleme

İstek biçimi şöyledir:
```text
https://publisher.com/amp-pingback?
rid=READER_ID
&url=SOURCE_URL
```

### Giriş Sayfası <a name="login-page"></a>

Giriş Sayfalarının URL'si, `AMP Access Yapılandırması` bölümündeki [login](#configuration) özelliği aracılığıyla yapılandırılır.

Yapılandırma, tek bir Giriş URL'si belirtebilir veya giriş türü tarafından girilen Giriş URL'lerinin bir eşlemesini belirtebilir. Tek bir Giriş URL'si örneği:
```json
{
  "login": "https://publisher.com/amp-login.html?rid={READER_ID}"
  }
```

Birden çok Giriş URL'si örneği:
```json
{
  "login": {
    "signin": "https://publisher.com/signin.html?rid={READER_ID}",
    "signup": "https://publisher.com/signup.html?rid={READER_ID}"
    }
  }
```

URL, [Access URL'si Değişkenleri](#access-url-variables) bölümünde tanımlanan parametreleri alabilir. Örneğin, AMP Okuyucu Kimliği ve doküman URL'sini geçirebilir. `RETURN_URL` sorgu değişikliği, dönüş URL'si (ör. `?ret=RETURN_URL`) sorgu parametresini belirtmek için kullanılabilir. Dönüş URL'si zorunludur ve `RETURN_URL` değişikliği belirtilmezse "return" varsayılan sorgu parametresi adıyla otomatik olarak eklenir.

Giriş Sayfası, [tarayıcı iletişim kutusu](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) olarak düzgün çalışmasının gerekmesi dışında, özel bir iletişim kısıtlaması olmayan normal bir web sayfasıdır. Daha fazla ayrıntı için [Giriş Akışı](#login-flow) bölümüne bakın.

İstek biçimi şöyledir:
```text
https://publisher.com/amp-login.html?
rid=READER_ID
&url=SOURCE_URL
&return=RETURN_URL
```
`RETURN_URL` değişikliği belirtilmezse AMP Çalışma Zamanının "return" URL parametresini otomatik olarak eklediğine dikkat edin. Giriş Sayfası çalışmasını tamamladıktan sonra, belirtilen "Dönüş URL'si"ne aşağıdaki biçimle geri yönlendirme yapması gerekir:
```text
RETURN_URL#success=true|false
```
"success" URL karma parametresinin kullanıldığına dikkat edin. Değer, girişin başarılı olup olmamasına veya çıkılıp çıkılmamasına bağlı olarak "true" veya "false" olur. İdeal olarak, Giriş Sayfası mümkünse hem başarılı hem de başarısız durumlarda sinyal gönderir.

`success=true` sinyali döndürülürse AMP Çalışma Zamanı, dokümanın durumunu güncellemek ve yeni erişim profiliyle “görüntüleme”yi bildirmek için Yetkilendirme ve Pingback uç noktalarına yapılan çağrıları tekrar eder.

#### Giriş Bağlantısı <a name="login-link"></a>

Yayıncı, Giriş Bağlantısını dokümanın içeriğinde herhangi bir yere yerleştirebilir.

Bir veya daha fazla Giriş URL'si, [AMP Access Yapılandırması](#configuration) bölümündeki "login" özelliği aracılığıyla yapılandırılır.

Giriş bağlantısı, “on” özelliğine izin veren herhangi bir HTML öğesinde bildirilebilir. Bu genellikle bir sabit veya düğme öğesi olur. Tek bir Giriş URL'si yapılandırıldığında şu biçim kullanılır:
```html
<a on="tap:amp-access.login">Login or subscribe</a>
```

Birden çok Giriş URL'si yapılandırıldığında biçim, `tap:amp-access.login-{type}` şeklinde olur. Örnek:
```html
<a on="tap:amp-access.login-signup">Subscribe</a>
```

Ad alanları kullanıldığında biçim `tap:amp-access.login-{namespace}` veya `tap:amp-access.login-{namespace}-{type}` şeklindedir.

AMP, giriş yapma ve abone olma arasında bir ayrım yapmaz. Bu ayrım, birden çok Giriş URL'si/bağlantısı kullanan Yayıncı tarafından veya Yayıncı tarafında yapılandırılabilir.

## *amp-analytics* ile entegrasyon <a name="integration-with-amp-analytics"></a>

*amp-analytics* ile entegrasyon, [amp-access-analytics.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) dosyasında belgelenmiştir.

## CORS Kaynak Güvenliği <a name="cors-origin-security"></a>

Yetkilendirme ve Pingback uç noktaları, CORS uç noktalarıdır ve [AMP CORS Güvenlik Spesifikasyonu](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)'nda açıklanan güvenlik protokolünü uygulamalıdır.

## Ölçme <a name="metering"></a>

Ölçme, Okuyucuya belirli bir dönemde bazı doküman görünümlerinin ücretsiz premium içeriğinin gösterildiği sistemdir. Belirlenen kotaya ulaşıldığında, Okuyucuya ödeme duvarının etkin hale geldiği ve premium içerik yerine, üst düzeye geçiş mesajı ve kayıt/giriş bağlantısıyla kısmi içerik gösterilir. Örneğin, ölçme, “Okuyucu her ay ücretsiz olarak 10 makale okuyabilir” şeklinde tanımlanabilir.

AMP Access, ölçülen erişimi uygulamak için aşağıdaki olanakları sağlar:

1. READER_ID, ölçme bilgilerini kaydetmek için kullanılmalıdır. Yayıncı, çerezleri her zaman bir 3. taraf bağlamında ayarlayabileceğine güvenemeyeceğinden bu veriler sunucu tarafında depolanmalıdır.
2. “Okuma sayısı” yalnızca Pingback uç noktasında güncellenebilir.
3. Yalnızca benzersiz dokümanlar kotaya dahil edilebilir. Diğer bir deyişle, aynı dokümanın on kez yenilenmesi tek bir görüntüleme sayılır. Bu amaçla, Yetkilendirme ve Pingback uç noktaları `SOURCE_URL` veya benzer URL değişkenlerini ekleyebilir. [Access URL'si Değişkenleri](#access-url-variables) konusuna bakın.

## İlk Tıklama Ücretsiz <a name="first-click-free"></a>

Google'ın İlk Tıklama Ücretsiz (veya FCF) politikasını [burada](https://support.google.com/news/publisher/answer/40543) bulabilirsiniz. Daha ayrıntılı açıklanmış en yeni güncellemesi de [burada](https://googlewebmastercentral.blogspot.com/2015/09/first-click-free-update.html) bulunmaktadır.

FCF'yi uygulamak için Yayıncının (1) her görüntüleme için yönlendirme hizmetini belirleyebilmesi ve (2) her okuyucunun günlük görüntüleme sayısını sayabilmesi gerekir.

Her iki adım da AMP Access spesifikasyonunda ele alınmaktadır. Yönlendirme, [Access URL'si Değişkenleri](#access-url-variables) konusunda açıklandığı şekilde `DOCUMENT_REFERRER` URL'si değişikliği kullanılarak Yetkilendirme ve Pingback URL'lerine eklenebilir. Görüntüleme sayımı, sunucu tarafında Pingback uç noktası kullanılarak yapılabilir. Bu, [Ölçme](#metering) konusunda açıklanan ölçme uygulamasına çok benzer.

## Giriş Akışı <a name="login-flow"></a>

AMP, Giriş İletişim Kutusunu bir 1. taraf penceresi, pop-up veya sekme olarak başlatır. Mümkün olduğunda, AMP Görüntüleyicileri, üst düzey tarayıcı API'lerinden yararlanabilmek için Giriş İletişim Kutusunu tarayıcı bağlamında başlatmayı denemelidir.

Giriş akışı, Okuyucu Giriş Bağlantısını etkinleştirdiğinde AMP Çalışma Zamanı tarafından başlatılır ve tanımlayıcı bir şekilde, aşağıdaki adımları uygular:

1. Giriş İletişim Kutusu (1. taraf penceresi), AMP Çalışma Zamanı veya Görüntüleyici tarafından belirtilen Giriş URL'si için açılır. URL, fazladan bir "Dönüş URL'si" URL sorgu parametresi (`&amp;return=RETURN_URL`) içerir. Okuyucu Kimliği gibi başka parametreler de URL'ye genişletilebilir. Daha ayrıntılı bilgi için [Giriş Sayfası](#login-page) bölümüne bakın.
2. Yayıncı serbest biçimli bir Giriş sayfası görüntüler.
3. Okuyucu, kullanıcı adı/şifre girme veya sosyal giriş bilgileri kullanma gibi giriş adımlarını izler.
4. Okuyucu giriş bilgilerini gönderir. Yayıncı kimlik doğrulamasını tamamlar, çerezleri ayarlar ve son olarak, Okuyucuyu daha önce istenen "Dönüş URL'si"ne yönlendirir. Yönlendirme, `true` veya `false` değerini alabilen bir `success` URL karma parametresi içerir.
5. Giriş İletişim Kutusu, "Dönüş URL'si"ne yönlendirmeyi izler.
6. AMP Çalışma Zamanı, dokümanı yeniden yetkilendirir.

Yalnızca 2-5. adımların Yayıncı tarafından işlenmesi gerekir: Yayıncı yalnızca kendi Giriş Sayfasını sağlar ve işlem tamamlandığında yönlendirmenin doğruluğundan emin olur. İletişim kutusu olarak düzgün çalışması dışında, giriş sayfasında uygulanacak herhangi bir özel kısıtlama yoktur.

Her zamanki gibi Okuyucu Kimliği, Giriş Sayfasına yapılan çağrıya dahil edilmelidir ve kimlik eşleme için Yayıncı tarafından kullanılabilir. 1. taraf penceresi olarak, Yayıncı kendi çerezlerini de alır ve bunları ayarlayabilir. Okuyucunun Yayıncı tarafında önceden oturum açmış olduğu ortaya çıkarsa yayıncı hemen `success=true` yanıtıyla "Dönüş URL'si"ne yönlendirme yapar.

## AMP Sözlüğü <a name="amp-glossary"></a>

* **AMP Dokümanı**: AMP biçimine uygun ve AMP Doğrulayıcı tarafından doğrulanan HTML dokümanı. AMP Dokümanları, Google AMP Önbelleği tarafından önbelleğe alınabilir.
* **AMP Doğrulayıcı**: Bir HTML dokümanının statik analizini gerçekleştiren ve dokümanın AMP biçimine uyup uymamasına bağlı olarak başarı veya hata sonucu döndüren bilgisayar programı.
* **AMP Çalışma Zamanı**: AMP Dokümanını yürüten JavaScript çalışma zamanı.
* **Google AMP Önbelleği**: AMP dokümanları için proxy uygulama önbelleği.
* **AMP Görüntüleyici**: AMP Dokümanlarını görüntüleyen/yerleştiren Web uygulaması veya yerel uygulama.
* **Publisher.com**: bir AMP yayıncısının sitesi.
* **CORS uç noktası**: kaynaklar arası HTTPS uç noktası. Daha fazla bilgi için [https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) adresine bakın. Bu tür isteklerin güvenliğinin nasıl sağlanabileceğiyle ilgili olarak [CORS Kaynak Güvenliği](#cors-origin-security) konusuna bakın.
* **Okuyucu** - AMP dokümanlarını görüntüleyen gerçek kişi.
* **AMP Ön Oluşturması**: AMP Görüntüleyicileri, gizli bir dokümanı gösterilmeden önce oluşturan ön oluşturma işleminden yararlanabilir. Bu, önemli bir performans artışı sağlar. Ancak, Okuyucu gerçekte dokümanı hiçbir zaman görmeyebileceğinden dokümanın önceden oluşturulmasının bir görüntüleme sayılmadığının dikkate alınması önemlidir.

## Düzeltmeler <a name="revisions"></a>

* 2 Eylül 2016: “noPingback” yapılandırma özelliği ve isteğe bağlı Pingback.
* 3 Mart 2016: Giriş yaptıktan sonra Pingback'i yeniden gönderme (v0.5).
* 19 Şubat 2016: URL var değişikliklerinden `{}` karakterlerinin kaldırılması için örnekler düzeltildi.
* 15 Şubat 2016: [Yapılandırma](#configuration) ve [Yetkilendirme Uç Noktası](#authorization-endpoint) artık yetkilendirme başarısız olduğunda kullanılabilecek "authorizationFallbackResponse" özelliğine izin verir.
* 11 Şubat 2016: [Yetkilendirme Uç Noktasında](#authorization-endpoint) yetkilendirme isteği zaman aşımı.
* 11 Şubat 2016: `object.field` gibi iç içe yerleştirilmiş alan başvurularına artık izin verilmektedir.
* 9 Şubat 2016: [İlk tıklama ücretsiz](#first-click-free) ve [Ölçme](#metering) bölümleri.
* 3 Şubat 2016: "Kaynak kökeni" güvenliğiyle ilgili spesifikasyon [CORS Kaynak güvenliği](#cors-origin-security) bölümüne eklendi.
* 1 Şubat 2016: Giriş Sayfası için "return" sorgu parametresi, RETURN_URL URL değişikliği kullanılarak özelleştirilebilir.

## Ek A: “amp-access” ifadesi dil bilgisi <a name="appendix-a-amp-access-expression-grammar"></a>

En yeni BNF dilbilgisi, [access-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/0.1/access-expr-impl.jison) dosyasında mevcuttur.

Bu dil bilgisinin en önemli kısmı şöyledir:

```javascript
search_condition:
  search_condition OR search_condition
  | search_condition AND search_condition
  | NOT search_condition
  | '(' search_condition ')'
  | predicate

predicate:
    comparison_predicate | truthy_predicate

comparison_predicate:
    scalar_exp '=' scalar_exp
    | scalar_exp '!=' scalar_exp
    | scalar_exp '<' scalar_exp
    | scalar_exp '<=' scalar_exp
    | scalar_exp '&gt;' scalar_exp
    | scalar_exp '&gt;=' scalar_exp

truthy_predicate: scalar_exp

scalar_exp: literal | field_ref

field_ref: field_ref '.' field_name | field_name

literal: STRING | NUMERIC | TRUE | FALSE | NULL
```

`amp-access` ifadelerinin AMP Çalışma Zamanı ve Google AMP Önbelleği tarafından değerlendirildiğine dikkat edin. Bu, Yayıncının uygulaması gereken spesifikasyonun bir parçası DEĞİLDİR. Burada yalnızca bilgilendirme amaçlı olarak sağlanmıştır.

## Ayrıntılı Tartışma <a name="detailed-discussion"></a>

Bu bölümde, amp-access spesifikasyonunun altında yatan tasarımın ayrıntılı bir açıklaması sağlanacak ve tasarım seçenekleri açıklanacaktır. Çok yakında.

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-access kurallarına](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/validator-amp-access.protoascii) bakın.
