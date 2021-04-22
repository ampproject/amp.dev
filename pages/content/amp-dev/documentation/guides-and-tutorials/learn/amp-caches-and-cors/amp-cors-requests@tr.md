---
'$title': "AMP'de CORS"
$order: 12
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: Birçok AMP bileşeni ve uzantısı, kökler arası kaynak paylaşımı (CORS) isteklerini kullanarak uzak uç noktalardan yararlanır
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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

Birçok AMP bileşeni ve uzantısı, kökler arası kaynak paylaşımı (CORS) isteklerini kullanarak uzak uç noktalardan yararlanır. Bu belge, AMP'de CORS kullanmanın temel yönlerini açıklamaktadır. CORS hakkında bilgi edinmek için bkz: [W3 CORS Teknik Özellikleri](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin" data-md-type="link">Kaynağım için neden CORS'a ihtiyacım var?</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">CORS istekleri için çerezleri kullanma</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">AMP'de CORS güvenliği</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">CORS isteklerini doğrulama</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) Belirli CORS kaynakları için isteklere izin verme</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) same-origin isteklere izin verme</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">CORS yanıt başlıklarını gönderme</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<a href="#access-control-allow-origin-origin" data-md-type="link">Kaynağa Erişime İzin Verme: </a><origin data-md-type="raw_html"></origin>
</li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Durum değiştirme isteklerini işleme</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="https://gitlocalize.com/repo/4863/tr/pages/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link" class="">Örnek izlenecek yol: CORS isteklerini ve yanıtlarını teslim etme</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">AMP'de CORS testi</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## Kaynağım için neden CORS'a ihtiyacım var? <a id="why-do-i-need-cors-for-my-own-origin"></a>

Kendi kaynağınıza yönelik talepler için neden CORS'a ihtiyacınız olduğu konusunda kafanız karışabilir, hadi konuyu inceleyelim.

Dinamik verilerini (ör. amp-form, amp-list vb.) alan AMP bileşenleri, verileri almak için uzak uç noktalara CORS isteklerinde bulunur. AMP sayfanız bu tür bileşenler içeriyorsa, bu isteklerin başarısız olmaması için CORS'u işlemeniz gerekir.

Bunu bir örnekle gösterelim:

Fiyatları olan ürünleri listeleyen bir AMP sayfanız olduğunu varsayalım. Sayfadaki fiyatları güncellemek için, kullanıcı bir json uç noktasından en son fiyatları alan bir düğmeye tıklar (amp-list bileşeni aracılığıyla yapılır). JSON sizin etki alanınızda.

Tamam, yani sayfa _etki alanımda_ ve JSON'da _etki alanımda_. Ben bir sorun göremiyorum!

Peki, ama kullanıcınız AMP sayfanıza nasıl ulaştı? Eriştikleri önbelleğe alınmış bir sayfa mı? Kullanıcınız büyük olasılıkla AMP sayfanıza doğrudan erişmemiş, bunun yerine sayfanızı başka bir platform aracılığıyla keşfetmiştir. Örneğin, Google Araması, AMP sayfalarını hızlı bir şekilde oluşturmak için Google AMP önbelleğini kullanır; bunlar, _farklı_ etki alanı olan Google AMP Önbelleğinden sunulan önbelleğe alınmış sayfalardır. Kullanıcınız sayfanızdaki fiyatları güncellemek için düğmeye tıkladığında, önbelleğe alınmış AMP sayfası, kaynaklar (önbellek -> kaynak etki alanı) arasında bir uyumsuzluk olan fiyatları almak için kaynak etki alanınıza bir istek gönderir. Bu tür çapraz kaynaklı isteklere izin vermek için CORS'u işlemeniz gerekir, aksi takdirde istek başarısız olur.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS ve Önbellek" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**Peki, ne yapmalıyım?**

1. Dinamik veri getiren AMP sayfaları için, bu sayfaların önbelleğe alınmış sürümünü test ettiğinizden emin olun; _sadece kendi etki alanınızda test etmeyin_. (Aşağıdaki [AMP'de CORS'u Test Etme](#testing-cors-in-amp) bölümüne bakın)
2. CORS isteklerini ve yanıtlarını işlemek için bu belgedeki yönergeleri izleyin.

## CORS istekleri için çerezleri kullanma <a id="utilizing-cookies-for-cors-requests"></a>

CORS isteklerini kullanan çoğu AMP bileşeni, [kimlik bilgileri modunu](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) otomatik olarak ayarlar veya yazarın isteğe bağlı olarak etkinleştirmesine izin verir. Örneğin, [`amp-list`](https://amp.dev/documentation/components/amp-list) bileşeni, bir cors JSON uç noktasından dinamik içerik getirir ve yazarın `credentials` özniteliği aracılığıyla kimlik bilgisi modunu ayarlamasına izin verir.

_Örnek: Çerezler aracılığıyla bir amp-list öğesine kişiselleştirilmiş içerik eklemek_

[sourcecode:html]
<amp-list
credentials="include"
src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"

>   <template type="amp-mustache">

    Your personal offer: ${% raw %}{{price}}{% endraw %}

  </template>
</amp-list>
[/sourcecode]

Kimlik bilgileri modunu belirterek; kaynak, CORS isteğine çerezleri ekleyebilir ve ayrıca yanıtta çerezler ayarlayabilir ([üçüncü taraf çerez kısıtlamalarına](#third-party-cookie-restrictions) tabidir).

### Üçüncü taraf çerez kısıtlamaları <a name="third-party-cookie-restrictions"></a>

Tarayıcıda belirtilen aynı üçüncü taraf çerez kısıtlamaları, AMP'deki credentialed CORS istekleri için de geçerlidir. Bu kısıtlamalar tarayıcıya ve platforma bağlıdır, ancak bazı tarayıcılar için kaynak, yalnızca kullanıcı daha önce kaynağı 1.taraf (üst) bir pencerede ziyaret ettiyse çerezleri ayarlayabilir. Veya başka bir deyişle, yalnızca kullanıcı kaynak web sitesini doğrudan ziyaret ettikten sonra. Bu göz önüne alındığında, CORS aracılığıyla erişilen bir hizmet, varsayılan olarak çerezleri ayarlayabileceğini varsayamaz.

## AMP'de CORS güvenliği <a name="cors-security-in-amp"></a>

AMP sayfalarınız için geçerli ve güvenli istek ve yanıtlar sağlamak için şunları yapmanız gerekir:

1. [İsteği doğrulayın](#verify-cors-requests).
2. [Uygun yanıt başlıklarını gönderin](#send-cors-response-headers).

Arka uçta bir Node kullanıyorsanız, [AMP Toolbox](https://github.com/ampproject/amp-toolbox)'ın bir parçası olan [AMP CORS ara katman yazılımını](https://www.npmjs.com/package/amp-toolbox-cors) kullanabilirsiniz.

### CORS isteklerini doğrulama <a id="verify-cors-requests"></a>

Bitiş noktanız bir CORS isteği aldığında:

1. [CORS <code>Origin</code> başlığının izin verilen bir kaynak olduğunu doğrulayın (yayıncının kaynağı + AMP önbellekleri)](#verify-cors-header).
2. [Bir Origin Başlığı yoksa, isteğin aynı kaynaktan (`AMP-Same-Origin` aracılığıyla) olup olmadığını kontrol edin.](#allow-same-origin-requests)

#### 1) Belirli CORS kaynakları için isteklere izin verme <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

CORS uç noktaları, `Origin` HTTP üstbilgisi aracılığıyla istekte bulunan kaynağı alır. Uç noktalar yalnızca aşağıdaki isteklere izin vermelidir: (1) yayıncının kendi kaynağı ve (2) [https://cdn.ampproject.org/caches.json](https://cdn.ampproject.org/caches.json)'da listelenen her `cacheDomain` kaynağı.

Örneğin, uç noktalar isteklere izin vermelidir:

- Google AMP Önbelleği alt etki alanı: `https://<publisher's domain>.cdn.ampproject.org` <br> (örneğin, `https://nytimes-com.cdn.ampproject.org` )

[tip type="read-on"] AMP Önbellek URL biçimleri hakkında daha fazla bilgi için şu kaynaklara bakın:

- [Google AMP Önbelleğine Genel Bakış](https://developers.google.com/amp/cache/overview) [/tip]

#### 2) same-origin isteklerine izin verme <a id="2-allow-same-origin-requests"></a>

<span id="allow-same-origin-requests"></span>

<code>Origin</code> başlığının eksik olduğu aynı kaynak istekleri için AMP aşağıdaki özel başlığı ayarlar:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

Bu özel başlık, aynı kaynaktan bir XHR isteği yapıldığında AMP Çalışma Zamanı tarafından gönderilir (yani, önbellek olmayan bir URL'den sunulan belge). `AMP-Same-Origin:true` başlığını içeren isteklere izin verin.

### CORS yanıt başlıklarını gönderme <a id="send-cors-response-headers"></a>

CORS isteğini doğruladıktan sonra, ortaya çıkan HTTP yanıtı aşağıdaki üstbilgileri içermelidir:

##### Access-Control-Allow-Origin: <origin> </origin><a name="access-control-allow-origin-origin"></a>

Bu başlık, bir <a href="https://www.w3.org/TR/cors/">W3 CORS Teknik Özellikleri</a> gereksinimidir. Burada <code>origin</code>, CORS <code>Origin</code> istek başlığı aracılığıyla izin verilen talep kaynağı anlamına gelir. (Örneğin, <code>"https://<publisher's subdomain>.cdn.ampproject.org"</code>).

W3 CORS teknik özellikleri, yanıtta <code>\*</code> değerinin döndürülmesine izin verse de, daha iyi güvenlik için şunları yapmalısınız:

- `Origin` başlığı varsa, <code>Origin</code> başlığının değerini doğrulayın ve yineleyin.

### Durum değiştirme isteklerini işleme <a id="processing-state-changing-requests"></a>

[tip type="important"] İsteği işlemeden _önce_ bu doğrulama kontrollerini gerçekleştirin. Bu doğrulama, CSRF saldırılarına karşı koruma sağlamaya yardımcı olur ve güvenilmeyen kaynak taleplerinin işlenmesini önler. [/tip]

Sisteminizin durumunu değiştirebilecek istekleri işlemeden önce (Örneğin, bir kullanıcı bir posta listesine abone olur veya abonelikten çıkar), aşağıdakileri kontrol edin:

**`Origin` başlığı ayarlanmışsa**:

1. Kaynak aşağıdaki değerlerden biriyle eşleşmiyorsa, durdurun ve bir hata yanıtı döndürün:

   - `<publisher's domain>.cdn.ampproject.org`
   - yayıncının kaynağı (yani sizinki)

   burada `*` gerçek bir yıldız işaretini ( \* ) değil, bir joker karakter eşleşmesini temsil eder.

2. Aksi takdirde, isteği işleyin.

**`Origin` bağlığı AYARLANMAMIŞSA**:

1. İsteğin `AMP-Same-Origin: true` başlığını içerdiğini doğrulayın. İstek bu başlığı içermiyorsa, durdurun ve bir hata yanıtı verin.
2. Aksi takdirde, isteği işleyin.

## Örnek izlenecek yol: CORS isteklerini ve yanıtlarını işleme <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

Uç noktanıza CORS isteklerini hesaba katmak için iki senaryo vardır:

1. Aynı kaynaktan gelen bir istek.
2. Önbelleğe alınmış bir kaynaktan (AMP önbelleğinden) bir istek.

Bu senaryoları bir örnekle ele alalım. Örneğimizde, `article-amp.html.` adlı bir AMP sayfasını barındıran `example.com` sitesini yönetiyoruz. AMP sayfası, yine `example.com`'da barındırılan bir `data.json` dosyasından dinamik verileri almak için bir a`amp-list` içeriyor. AMP sayfamızdan gelen `data.json` dosyamıza gelen istekleri işlemek istiyoruz. Bu istekler, aynı kaynaktaki (önbelleğe alınmamış) AMP sayfasından veya farklı bir kaynaktaki (önbelleğe alınmış) AMP sayfasından olabilir.

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="CORS örneği" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### İzin verilen kaynaklar <a name="allowed-origins"></a>

CORS ve AMP hakkında bildiklerimize dayanarak (yukarıdaki [CORS isteklerini doğrulamak](#verify-cors-requests)), örneğimiz için aşağıdaki etki alanlarından gelen isteklere izin vereceğiz:

- `example.com` --- Yayıncının etki alanı
- `example-com.cdn.ampproject.org` --- Google AMP Önbelleği alt etki alanı

### İzin verilen istekler için yanıt başlıkları <a name="response-headers-for-allowed-requests"></a>

İzin verilen kaynaklardan gelen istekler için yanıtımız aşağıdaki başlıkları içerecektir:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

Bunlar, CORS yanıtımıza dahil edebileceğimiz ek yanıt başlıklarıdır:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### Sözde CORS mantığı <a name="pseudo-cors-logic"></a>

CORS isteklerini ve yanıtlarını işleme mantığımız aşağıdaki sözde kodda basitleştirilebilir:

[sourcecode:text]
IF CORS header present
IF origin IN allowed-origins
allow request & send response
ELSE
deny request
ELSE
IF "AMP-Same-Origin: true"
allow request & send response
ELSE
deny request
[/sourcecode]

#### CORS örnek kodu <a name="cors-sample-code"></a>

CORS isteklerini ve yanıtlarını işlemek için kullanabileceğimiz örnek bir JavaScript işlevi:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var origin;
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
'https://cdn.ampproject.org',
];
var allowedSourceOrigin = 'https://example.com'; //publisher's origin
// If same origin
if (req.headers['amp-same-origin'] == 'true') {
origin = sourceOrigin;
// If allowed CORS origin & allowed source origin
} else if (
allowedOrigins.indexOf(req.headers.origin) != -1 &&
sourceOrigin == allowedSourceOrigin
) {
origin = req.headers.origin;
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}

res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Not**: Çalışan bir kod örneği için bkz. [amp-cors.js](https://github.com/ampproject/amphtml/blob/main/build-system/server/amp-cors.js).

### Senaryo 1: Aynı kaynaktaki AMP sayfasından istek alma <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

Aşağıdaki senaryoda, `article-amp.html` sayfası `data.json` dosyasını ister; kaynaklar aynıdır.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="CORS örneği" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

İsteği incelersek şunları bulacağız:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

Bu istek aynı kaynaktan geldiğinden, `Origin` başlığı yoktur, ancak `AMP-Same-Origin: true` özel AMP istek başlığı mevcuttur. Aynı kaynaktan olduğu için bu talebe izin verebiliriz (`https://example.com`).

Yanıt başlıklarımız şöyle olacaktır:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Senaryo 2: Önbelleğe alınmış AMP sayfasından istek alma <a name="scenario-2-get-request-from-cached-amp-page"></a>

Aşağıdaki senaryoda, Google AMP Önbelleğinde önbelleğe alınan `article-amp.html` sayfası `data.json` dosyasını ister; kaynaklar farklıdır.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="CORS örneği" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

İsteği incelersek şunları bulacağız:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

Bu istek bir `Origin` başlığı içerdiğinden, izin verilen bir kaynaktan olduğunu doğrularız. İzin verilen bir kaynaktan olduğu için bu isteğe izin verebiliriz.

Yanıt başlıklarımız şöyle olacaktır:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Önbelleğe alınmış yazı tipleri ile çalışma <a name="working-with-cached-fonts"></a>

Google AMP Önbelleği, AMP sayfasının hızını optimize etmek için AMP HTML belgelerini, resimlerini ve yazı tiplerini önbelleğe alır. AMP sayfasını hızlı hale getirirken, önbelleğe alınmış kaynakların güvenliğini sağlamada da dikkatli olmak istiyoruz. AMP önbelleğinin kaynağının `Access-Control-Allow-Origin` değerine dikkat ederek, genellikle yazı tipleri için önbelleğe alınmış kaynaklara nasıl yanıt verdiğine dair bir değişiklik yapacağız.

### Geçmiş davranış (Ekim 2019'dan önce) <a name="past-behavior-before-october-2019"></a>

Bir AMP sayfası `@font-face src` özniteliğinden `https://example.com/some/font.ttf` yüklerken, AMP Önbelleği yazı tipi dosyasını önbelleğe alacak ve aşağıdaki gibi joker karakter `Access-Control-Allow-Origin`'e sahip olarak kaynağı sunacaktır.

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: \*

### Yeni davranış (Ekim 2019 ve sonrası) <a name="new-behavior-october-2019-and-after"></a>

Mevcut uygulama izin verici olsa da, bu, çapraz kaynak sitelerden yazı tiplerinin beklenmedik şekilde kullanılmasına yol açabilir. Bu değişiklikte AMP Önbelleği, kaynak sunucunun yanıt verdiği aynı `Access-Control-Allow-Origin` değeriyle yanıt vermeye başlayacaktır. Yazı tiplerini önbelleğe alınmış AMP belgesinden düzgün şekilde yüklemek için, AMP Önbelleği kaynağını başlık aracılığıyla kabul etmeniz gerekir.

Örnek bir uygulama şöyle olacaktır:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
];
// If allowed CORS origin
if (allowedOrigins.indexOf(req.headers.origin) != -1) {
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}
}
[/sourcecode]

Örnek olarak, `https://example.com/amp.html`'de /some/font.ttf dosyasını yüklemek isterseniz, kaynak sunucu aşağıdaki gibi Access-Control-Allow-Origin başlığıyla yanıt vermelidir.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="CORS yazı tipi örneği" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] Yazı tipi dosyanıza herhangi bir kaynaktan erişilebiliyorsa, joker karakter `Access-Control-Allow-Origin` ile yanıt verebilirsiniz, AMP Önbelleği de bu değeri yansıtacaktır. Yani bu, `Access-Control-Allow-Origin: *` ile yanıt vereceği anlamına gelir. Zaten bu ayara sahipseniz, hiçbir şeyi değiştirmeye gerek yoktur. [/tip]

Bu değişikliği Ekim 2019 ortalarında yapmayı planlıyoruz ve kendi kendine barındırılan yazı tiplerini kullanan her AMP yayıncısının etkilenip etkilenmediğini kontrol etmesini bekliyoruz.

#### Yayın planı <a name="roll-out-plan"></a>

- 30-09-2019: Sürüm, bu değişikliğin hangi etki alanları için geçerli olduğu konusunda daha kesin denetim içerir. Bu derleme, bu hafta içinde kullanıma sunulacaktır.
- 07/10/2019: Manuel test için test alanları etkinleştirilecektir.
- 14/10/2019: Özellik genel olarak kullanıma sunulacaktır. (Ancak testin nasıl gittiğine bağlı olarak).

İlgili [sorununu buradan](https://github.com/ampproject/amphtml/issues/24834) takip edin.

## AMP'de CORS'u test etme <a name="testing-cors-in-amp"></a>

AMP sayfalarınızı test ederken, AMP sayfalarınızın önbelleğe alınmış sürümlerinden testler eklediğinizden emin olun.

### Sayfayı önbellek URL'si ile doğrulayın <a name="verify-the-page-via-the-cache-url"></a>

Önbelleğe alınmış AMP sayfanızın doğru şekilde oluşturulduğundan ve çalıştığından emin olmak için:

1. Tarayıcınızdan, AMP Önbelleğinin AMP sayfanıza erişmek için kullanacağı URL'yi açın. Önbellek URL biçimini [bu araçtan Örneklerle AMP'den](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/) belirleyebilirsiniz.

   Örneğin:

   - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
   - AMP Önbelleği URL biçimi: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Tarayıcınızın geliştirme araçlarını açın; hata olmadığını ve tüm kaynakların doğru yüklendiğini doğrulayın.

### Sunucu yanıtı başlıklarınızı doğrulayın <a name="verify-your-server-response-headers"></a>

Sunucunuzun doğru HTTP yanıt başlıklarını gönderdiğini doğrulamak için `curl` komutunu kullanabilirsiniz. `curl` komutunda, istek URL'sini ve eklemek istediğiniz özel başlıkları belirtin.

**Sözdizimi**: `curl <request-url> -H <custom-header> - I`

#### Aynı kaynaktan test isteği <a name="test-request-from-same-origin"></a>

Aynı kaynaklı bir istekte, AMP sistemi özel `AMP-Same-Origin:true` başlığını ekler.

İşte `https://ampbyexample.com`'dan `examples.json` dosyasına (aynı etki alanında) bir isteği test etmek için curl komutumuz:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

Komuttan elde edilen sonuçlar doğru yanıt başlıklarını gösterir (not: fazla bilgiler kırpılmıştır):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Önbelleğe alınmış AMP sayfasından test isteği <a name="test-request-from-cached-amp-page"></a>

Aynı etki alanından (yani önbellek) olmayan bir CORS isteğinde, `origin` başlığı isteğin bir parçasıdır.

Google AMP Önbelleğinde önbelleğe alınmış AMP sayfasından `examples.json{/code0 dosyasına bir isteği test etmek için curl komutumuz şu şekildedir:`

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

Komuttan elde edilen sonuçlar doğru yanıt başlıklarını gösterir:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
