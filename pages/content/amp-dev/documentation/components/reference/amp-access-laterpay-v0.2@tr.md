---
$title: amp-access-laterpay
$category@: dynamic-content
teaser:
  text: Yayıncıların LaterPay mikro ödeme platformuna kolayca entegre olmasına olanak tanır.
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



Yayıncıların [LaterPay](https://www.laterpay.net) mikro ödeme platformuna kolayca entegre olmasına olanak tanır. `amp-access-laterpay` bileşeni [AMP Access](amp-access.md)'i temel alır ve gerektirir.

<table>
  <tr>
    <td class="col-fourty"><strong>Zorunlu Komut Dosyaları</strong></td>
    <td>
      <small>"amp-access-laterpay", "amp-access" ve "amp-analytics" ile ilgili komut dosyalarına ihtiyacınız olacaktır.</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://ampjs.org/v0/amp-access-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://ampjs.org/v0/amp-access-laterpay-0.2.js"></script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-access-laterpay/">ek açıklamalı amp-access-laterpay</a> örneğine bakın.</td>
  </tr>
</table>


## Davranış <a name="behavior"></a>

[LaterPay](https://laterpay.net), kullanıcıların herhangi bir dijital içeriği önceden kayıt olmadan, kişisel veri sağlamadan veya ödeme yapmadan, sadece iki tıklama ile satın alıp anında erişim sağlamasına olanak tanıyan bir mikro ödeme platformudur. Kullanıcılar yalnızca web sitelerinden yaptıkları toplam alışveriş 5 $ veya 5 € tutarına ulaştığında ödeme yapar. İçerik sağlayıcılar, tek tek öğeler veya süreli pasolar satıp içeriklerine sabit ücretli ya da süre sınırlamalı erişime olanak tanıyabilirler.

LaterPay'i [Connector Script entegrasyonu](https://docs.laterpay.net/connector/) aracılığıyla entegre ediyorsanız bu entegrasyonu AMP sayfalarında kullanamazsınız. `amp-access-laterpay`, sağladığı benzer özelliklerle Connector Script'i andırır ancak AMP sayfaları için tasarlanmıştır.

Ayrıca, tek entegrasyon yöntemi olarak `amp-access-laterpay` bileşenini kullanarak LaterPay aracılığıyla içerik satmak da mümkündür.

`amp-access-laterpay` bileşeni, AMP Access'e benzer ancak LaterPay hizmetiyle kullanıma uyarlanmış bir davranış sağlamak için dahili olarak AMP Access'i kullanır.

AMP Access ile kullanmak istediğiniz kendinize ait bir ödeme duvarına sahipseniz ve bu ödeme duvarını, aynı sayfada LaterPay ile birlikte kullanmak istiyorsanız bunu [yapmanız da mümkündür](#using-amp-access-laterpay-together-with-amp-access).

`amp-access-laterpay` bileşeni LaterPay hizmetiyle çalışmak üzere önceden yapılandırılmış olduğundan yetkilendirme veya geriye pingleme yapılandırması gerektirmez. Ayrıca, giriş bağlantılarının manuel kurulumunu da gerektirmez.

Yayıncının LaterPay hesabında farklı satın alma seçenekleri yapılandırılabilir ve bileşen, yapılandırmayı alıp kullanılabilir satın alma seçeneklerinin bir listesini oluşturur.

Satın alma seçeneklerini nasıl yapılandıracağınızı öğrenmek için LaterPay'in mevcut kullanıcı arabirimi entegrasyonu olan [LaterPay Connector](https://docs.laterpay.net/connector/configuration/)'ın yapılandırılmasıyla ilgili dokümanlara bakabilirsiniz.

Oluşturulan liste, yayıncının tercihine göre şekillendirilip sunulabilir.

Bu bileşen, içeriği göstermek ve gizlemek için [Access İçerik İşaretlemesi](amp-access.md#access-content-markup) de kullanır.

## Yapılandırma <a name="configuration"></a>

Yapılandırma, AMP Access'e benzer ancak yetkilendirme, geriye pingleme ve giriş bağlantıları gerektirmez.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>

```

`laterpay` yapılandırma nesnesinde aşağıdaki değerler ayarlanabilir:

<table>
  <tr>
    <th class="col-fourty">Mülk</th>
    <th class="col-twenty">Değerler</th>
    <th class="col-fourty">Açıklama</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>CSS seçici <strong>gerekir</strong></td>
    <td>Sayfada, ürünün başlığını içeren öğeyi belirleyen bir CSS seçici. Bu, ürünün satın alınması için sunulan sayfanın, kullanıcının ne satın almakta olduğunun farkında olması için bu başlığı içermesini sağlar.</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>Virgülle ayrılmış tanımlayıcı listesi</td>
    <td>Varsayılan olarak, bir ürünü bir satın alma seçeneğiyle eşleştirmek için ürünün URL'si kullanılır; ancak, satın alma seçeneği için bir URL yolu belirtmek yerine LaterPay Connector kullanıcı arayüzünde bir Ürün Kimliği ayarlayabilir ve daha sonra, ürünü satın alma seçeneğiyle eşleştirmek için <code>articleId</code> özelliğini kullanabilirsiniz.
      <br>
        Bir satın alma seçeneğini bir ürünün URL'sine göre eşleştirmenin yeterince esneklik sağlamadığı durumlarda bunun yapılması gerekir. Bu yöntemin faydalı olduğu bazı örnek senaryolar hakkında bilgi almak için <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">LaterPay Connector() yapılandırma sayfasına</a> bakın.</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>Dinamik ödeme yapılandırması için JWT jetonu</td>
        <td>Bu seçenek, kullanılabilir ücretli içerik için bir yapılandırma ile imzalı bir JSON Web Jetonu belirtmenize olanak tanır. Bu, yapılandırmayı LaterPay Connector Yönetici arayüzünde manuel olarak belirtmek yerine, sayfalarınızda programlı olarak oluşturulan bir sayfa içi yapılandırma sağlayabileceğiniz anlamına gelir. Bu, özellikle çok sayıda farklı ürün için Tek Satın Alma işlemleri yapılandırırken yararlı olabilir.
          <br>
            Bu jetonu nasıl oluşturacağınız ve içinde hangi içeriğin belirtilebileceği hakkında daha fazla bilgi isterseniz lütfen Connector Script entegrasyonuyla ilgili LaterPay <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">JWT Ücretli İçerik API'si</a> dokümanlarına bakın.
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>dize</td>
          <td>Yerel ayar için uygun fiyat biçimlendirmesi stilini tanımlar.</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>nesne</td>
          <td>Yayıncının, oluşturulan satın alma seçenekleri listesinde yer alan metni özelleştirmesine veya yerelleştirmesine olanak tanır. Daha fazla bilgi için <a href="#localization">Yerelleştirme</a> bölümünü inceleyin.</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>boole</td>
          <td>True (doğru) değerine ayarlanırsa yetkilendirme işlemi başarılı olduktan sonra sayfayı en başa kaydırır. İletişim kutusunu gösterdiğiniz yer sayfada oldukça aşağıdaysa ve kullanıcının sayfaya döndükten sonra geçerli kaydırma konumundan kafası karışabilecekse bu özelliğin kullanılması yararlı olabilir.</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>dize</td>
          <td><code>eu</code> veya <code>us</code> <a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">LaterPay bölgesindeyseniz</a> belirtin.</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>boole</td>
          <td>Yalnızca sunucu yapılandırmanızı test etmek için korumalı alan modunu kullanıyorsanız gereklidir. AMP'nin <a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">geliştirme modunu</a> kullanmanız da gerekir.</td>
        </tr>
      </table>

## Access İçerik İşaretlemesi'ni kullanma ve satın alma listesini gösterme <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

Access İçerik İşaretlemesi, AMP Access ile aynı şekilde kullanılmalıdır.

Kullanıcının ürüne erişimi olmadığında, `amp-access-laterpay-dialog` kimliğine sahip öğe satın alma seçeneklerinin yer aldığı bir listeyi oluşturur. Bu liste son derece basit bir stile sahiptir ve yayıncının sayfasına daha entegre görünmesi için özelleştirilebilir.

Varsayılan stili kullanmak istiyorsanız `amp-access-laterpay` sınıfını eklediğinizden emin olun.

```html
<section amp-access="NOT error AND NOT access" amp-access-hide="">
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  Oops... Something broke.
</section>

<div amp-access="access" amp-access-hide="">
  <p>...article content...</p>
</div>

```

## Stil <a name="styling"></a>

Oluşturulan işaretlemedeki bazı öğelere birden çok sınıf uygulanır. Sınıf içermeyen öğelere, CSS öğe seçicileri aracılığıyla açık bir biçimde başvurulabilir.

Bazı temel CSS düzenleri zaten vardır ancak yayıncıların, sayfalarının görünüm ve tarzıyla uyumlu hale getirmek için bunları şekillendirmeleri önerilir.

İletişim kutusu için oluşturulan yapı şöyle görünür:

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Optional, appears if header locale message is defined.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">Purchase option title</span>
              <p class="amp-access-laterpay-description">Purchase option description</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">0.15</span>
            <sup class="amp-access-laterpay-currency">USD</sup>
          </p>
        </li>
        <!-- ... more list items for other purchase options ... -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">Şimdi Satın Al</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="...">I already bought this</a>
      </p>
      <p class="amp-access-laterpay-footer">
        Optional, appears if footer locale message is defined.
      </p>
    </div>
    <p class="amp-access-laterpay-badge">Powered by <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
  </div>

```

## Yerelleştirme <a name="localization"></a>

İletişim kutusunda satın alma seçenekleri için gösterilen metin, LaterPay Connector kullanıcı arayüzünde yayıncı tarafından tanımlanır.

Kalan metin, genişletilmiş bileşenin bir parçasıdır ve yapılandırma seçenekleri aracılığıyla aşağıdaki gibi değiştirilebilir ve yerelleştirilebilir:

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

Aşağıdaki mesaj anahtarları çevrilebilir veya özelleştirilebilir ancak orijinal anlamlarını ve amaçlarını korumaları gerektiğini unutmayın.

<table>
  <tr>
    <th class="col-fourty">Anahtar</th>
    <th class="col-fourty">Açıklama</th>
    <th>Varsayılan değer</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>Daha sonra ödeme yapılabilecek seçenekler için satın alma düğmesinde gösterilen metin.</td>
    <td>"Buy Now, Pay Later"</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>Satın alma sırasında ödenmesi gereken seçenekler için satın alma düğmesinde gösterilen metin.</td>
    <td>"Buy Now"</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>Herhangi bir seçenek belirlenmeden önce satın alma düğmesinde gösterilen varsayılan metin.</td>
    <td>"Buy Now"</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>Kullanıcı ürünü geçmişte satın aldıysa ancak çerezlerini kaybettiyse (veya farklı bir cihazdaysa) LaterPay'e giriş yapmak ve satın alma işlemlerini almak için bu bağlantıyı kullanabilir.</td>
    <td>"I already bought this"</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>İsteğe bağlı üstbilgi metni.</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>İsteğe bağlı altbilgi metni.</td>
    <td></td>
  </tr>
</table>

## Analiz <a name="analytics"></a>

`amp-access` bileşenine dayandığı göz önünde bulundurulduğunda, `amp-access-laterpay`, `amp-access` tarafından gönderilen tüm [analiz etkinliklerini](amp-access.md#integration-with-amp-analytics) destekler.

Uygulamada bunun nasıl görüneceğine dair daha eksiksiz bir örnek görmek isterseniz [https://ampexample.laterpay.net/](https://ampexample.laterpay.net/) adresindeki örneklerin tamamı, bu analiz etkinliklerini göndermek üzere yapılandırılmıştır.

## AMP Access LaterPay'i AMP Access ile birlikte kullanma <a name="using-amp-access-laterpay-together-with-amp-access"></a>

Mevcut bir abonelik sisteminiz varsa ve LaterPay'i yalnızca tek tek ürün satışı için kullanmayı amaçlıyorsanız AMP Access ve AMP Access LaterPay'i birlikte kullanılmasıyla her iki satış yönteminin de aynı sayfada bir arada bulunması mümkündür.

Öncelikle AMP Access'i mevcut ödeme duvarınızla nasıl yapılandıracağınızı öğrenmek için lütfen [AMP Access](amp-access.md) dokümanlarına bakın.

[Birden fazla sağlayıcı](amp-access.md#multiple-access-providers) bölümünde, birden fazla sağlayıcının ad alanlarıyla nasıl ayarlanacağı açıklanmaktadır.

Bunu LaterPay ve mevcut bir ödeme duvarı entegrasyonu ile kullanırken gerekli yapılandırma aşağıdaki gibi görünebilir:

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

İçerik erişimi işaretlemesi ise şu şekilde görünebilir:

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Login here to access your PublisherName subscription.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  Oops... Something broke.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...article content...</p>
</div>

```

Daha eksiksiz bir örneği [https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html) adresinde bulabilirsiniz.

## İlgili Dokümanlar <a name="related-documentation"></a>

* [AMP Access](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay: Mikro Ödemeleri nasıl yapıyoruz?](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay Connector](https://connectormwi.laterpay.net/docs/index.html) - AMP Access LaterPay'e benzer ancak AMP olmayan sayfalar için.

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-access-laterpay kurallarına](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii) bakın.
