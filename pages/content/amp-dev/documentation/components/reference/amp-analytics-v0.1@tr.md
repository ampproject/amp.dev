---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: Bir AMP dokümanındaki analiz verilerini yakalar.
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

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



Bir AMP dokümanındaki analiz verilerini yakalar.

<table>
  <tr>
    <td class="col-fourty"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"&gt;&lt;/script></code&gt;</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-analytics/">amp-analytics örneği</a> sayfasına bakın.</td>
  </tr>
</table>


## Analizleri bir tedarikçi firmaya mı gönderiyorsunuz, yoksa şirket içi çözüm mü kullanıyorsunuz? <a name="sending-analytics-to-a-vendor-or-in-house"></a>

Sitenizde AMP Analytics'i kullanmaya başlamadan önce, kullanıcı etkileşimini analiz etmek için üçüncü taraf analiz araçlarını mı yoksa kendi şirket içi çözümünüzü mü kullanacağınıza karar vermeniz gerekir.

[tip type="read-on"]
[Analytics'i Yapılandırma](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md) kılavuzunda AMP Analytics ile ilgili tüm bilgileri bulabilirsiniz.
[/tip]

### Bir analiz tedarikçi firmasına veri gönderme <a name="analytics-vendors"></a>

AMP Analytics, bir kez ölçmek ve çok sayıda kullanıcıya rapor göndermek üzere özel olarak tasarlanmıştır. Bir veya daha fazla analiz tedarikçi firmasıyla çalışıyorsanız çözümlerini AMP ile entegre edip etmediklerini öğrenmek için [Analiz Tedarikçi Firmaları](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) listesine bakın.

Entegre AMP Analytics tedarikçi firmaları için:

1. `<amp-analytics>` etiketine, `type` özelliğini ekleyin ve değerini, belirtilen [tedarikçi firma](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) bilgisine ayarlayın.
1. Yakalamak ve izlemek istediğiniz verileri belirleyin ve bu ayrıntıları, yapılandırma verilerinde belirtin. Analiz verilerinin nasıl yakalanacağıyla ilgili talimatlar için tedarikçi firmanın dokümanlarına bakın.

Analiz tedarikçi firması AMP ile entegre değilse tedarikçi firmaya ulaşıp destek sağlamalarını isteyin. Ayrıca, tedarikçi firmanın eklenmesini isteyen AMP projesinde bir sorun oluşturmanızı da öneririz. Ayrıca, [Analiz araçlarınızı AMP HTML ile entegre etme](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md) konusuna da bakın. Alternatif olarak, tedarikçi firmanızla birlikte çalışarak verileri belirttikleri URL'lere gönderin. Aşağıdaki [Verileri şirket içinde gönderme](#sending-data-in-house) bölümünde daha fazla bilgi edinebilirsiniz.

*Örnek: Verileri bir üçüncü taraf analiz tedarikçi firmasına gönderme*

Aşağıdaki örnekte, analiz verileri, AMP ile entegre olmuş bir üçüncü taraf analiz sağlayıcısı olan Nielsen'a gönderilir. Nielsen için analiz verilerinin yapılandırılmasıyla ilgili ayrıntılar, [Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API) dokümanlarında bulunabilir.

```html
<amp-analytics type="nielsen">
  <script type="application/json">
  {
    "vars": {
      "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "apv": "1.0",
      "apn": "My AMP Website",
      "section": "Entertainment",
      "segA": "Music",
      "segB": "News",
      "segC": "Google AMP"
    }
  }
  </script>
</amp-analytics>
```

### Şirket içinde veri gönderme <a name="sending-data-in-house"></a>

Kullanıcı etkileşimini ölçmek için kendi şirket içi çözümünüz varsa AMP Analytics'i bu çözümle entegre etmek için yalnızca bir URL'ye ihtiyacınız olur. Bu URL, verileri göndereceğiniz URL'dir. Verileri, çeşitli URL'lere de gönderebilirsiniz. Örneğin, sayfa görüntüleme verilerini bir URL'ye ve sosyal etkileşim verilerini başka bir URL'ye gönderebilirsiniz.

[tip type="note"]
Şirket içi çözümünüz, AMP ile entegre olmayan bir analiz tedarikçi firmasıyla çalışmayı içeriyorsa hangi yapılandırma bilgilerinin gerekli olduğunu belirlemek için tedarikçi firma ile birlikte çalışın.
[/tip]

Belirli bir URL'ye veri göndermek için:

1. Yakalamak ve izlemek istediğiniz verileri belirleyin ve [bu ayrıntıları, yapılandırma verilerinde belirtin](#specifying-configuration-data).
1. [`requests`](#requests) yapılandırma nesnesinde, izlenecek istek türünü (ör. sayfa görüntüleme, özel tetiklenen etkinlikler gibi) ve izleme verilerini göndermek istediğiniz yerin URL'lerini belirtin.

[tip type="note"]
Analiz isteklerinin yönlendirme üstbilgisindeki AMP URL'leri işlenirken `usqp` parametresini çıkarın veya yoksayın. Bu parametre, Google tarafından Google AMP Önbelleği denemelerinin tetiklenmesi amacıyla kullanılır.
[/tip]

*Örnek: Verileri bir URL'ye gönderme*

Burada, sayfa görüntülemelerini izleyen basit bir örnek verilmiştir.  Bir sayfanın görünür hale geldiği her seferinde, tetikleyici etkinlik etkinleşir ve sayfa görüntüleme verilerini rastgele bir kimlikle birlikte tanımlanmış bir URL'ye gönderir.

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

  [tip type="success"]
Bazı yaygın izleme kullanım alanları (ör. sayfa görüntülemeleri, sayfa tıklamaları, kaydırma vb.) için [Analytics: Kullanım Alanları](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md) konusuna bakın.
[/tip]

## Yapılandırma verilerini belirtme <a name="specifying-configuration-data"></a>

`<amp-analytics>` öğesinde, neyin ölçüleceğine ve analiz verilerinin nereye gönderileceği ile ilgili ayrıntıları içeren bir JSON yapılandırma nesnesi belirtirsiniz.

`<amp-analytics>` için yapılandırma nesnesi şu biçimi kullanır:

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### Satır içi veya uzak yapılandırma <a name="inline-or-remote-configuration"></a>

Yapılandırma verileri satır içinde belirtilebilir veya `config` özelliğinde bir URL belirtilerek uzaktan getirilebilir. Buna ek olarak, popüler analiz tedarikçi firmaları için yerleşik yapılandırma, `type` özelliği kullanılarak seçilebilir.

Bu kaynakların birden fazlasına ait yapılandırma verileri kullanılırsa yapılandırma nesneleri (değişkenler, istekler ve tetikleyiciler) şu şekilde birleştirilir:

1. Uzak yapılandırma, satır içi yapılandırmadan önceliklidir ve
1. Satır içi yapılandırma, tedarikçi firma yapılandırmasından önceliklidir.

#### Uzak yapılandırma yükleme <a name="loading-remote-configuration"></a>

Bir uzak yapılandırmayı yüklemek için `<amp-analytics>` öğesinde `config` özelliğini ve yapılandırma verilerinin URL'sini belirtin. Belirtilen URL, HTTPS şemasını kullanmalıdır. URL, [AMP URL değişkenlerini](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) içerebilir. Çerezlere erişmek için [`data-credentials`](#data-credentials) özelliğine bakın. Yanıt, [AMP CORS güvenlik yönergelerine](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) uygun olmalıdır.

Bu örnekte, belirtilen URL'den yapılandırma verilerini yüklemek için `config` özelliğini belirtiriz.

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

#### Yapılandırma Yeniden Yazıcı <a name="configuration-rewriter"></a>

Yapılandırma yeniden yazıcı özelliği, analiz sağlayıcılarının sağlanan bir yapılandırmayı dinamik olarak yeniden yazmasına olanak tanımak amacıyla tasarlanmıştır. Bu, uzak yapılandırma özelliğine benzer ancak buna ek olarak, sunucuya yapılan istekte kullanıcı tarafından sağlanan yapılandırmayı içerir. Bu özellik, şu anda yalnızca analiz tedarikçi firması tarafından etkinleştirilebilir.

Bir analiz tedarikçi firması, bir sunucu URL'si ile bir configRewriter özelliği belirtir.
```js
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
    },
    ...
}
```

Çalışma zamanı, sağlanan uzak yapılandırmayla birleştirilmiş, satır içine yerleştirilen yapılandırmayı içeren bir isteği satıcı tarafından verilen configRewriter uç noktasına gönderir. Tedarikçi firma, bu veri sunucusunu yapım için kullanır ve yeniden yazılmış yeni bir yapılandırma döndürür.

Ardından, çalışma zamanı, nihai yapılandırmayı belirlemek için sağlanan tüm yapılandırmaları en yüksek öncelikten en düşüğe doğru birleştirir:

1. Yeniden Yazılmış Yapılandırma
1. Satır İçine Yerleştirilmiş Yapılandırma
1. Tedarikçi firma tarafından tanımlanmış yapılandırma

##### Değişken Grupları <a name="variable-groups"></a>

Değişken Grupları, analiz sağlayıcılarının, kullanıcının kolayca etkinleştirebileceği önceden tanımlanmış bir değişken grubunu gruplamalarına olanak tanıyan bir özelliktir. Daha sonra, bu değişkenler çözümlenir ve belirtilen `configRewriter` uç noktasına gönderilir.

Analiz sağlayıcılarının, bu özelliği etkinleştirmek için `configRewriter` yapılandırmasının içinde yeni bir `varGroups` nesnesi oluşturması gerekir. Böylece yayıncılar, analiz yapılandırmalarında etkinleştirmek istedikleri analiz sağlayıcı tarafından oluşturulan adlandırılmış `varGroups` nesnesini ekleyebilir. [AMP HTML Değişiklik Kılavuzu](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) tarafından desteklenen tüm değişkenler kullanılabilir. *Önemli not*: ${varName} çeşitleri kullanılamaz.

Örneğin, yapılandırması şöyle görünen bir tedarikçi firmamız olabilir:
```js
// This is predefined by vendor.
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
      'varGroups' : {
        'group1': {
          'referrer': 'DOCUMENT_REFERRER',
          'source': 'SOURCE_URL',
        'group2': {
          'title': 'TITLE',
        },
      },
    },
  },
    ...
}
```

Sağlayıcının `<amp-analytics>` yapılandırmasında, belirtilen `varGroups` nesnesi için `{enabled: true}` değerini ekleyerek hangi değişken gruplarının etkinleştirileceğini belirtebilirsiniz. `enabled`, ayrılmış bir kelimedir ve değişken adı olarak kullanılamaz.

Aşağıdaki örnekte hem `group1` hem de `group2` etkinleştirilmiştir. Özel olarak etkinleştirilmemiş gruplar yoksayılır. Ardından, çalışma zamanı tüm bu etkinleştirilmiş değişkenleri çözümler ve yapılandırma yeniden yazıcı URL'sine gönderilecek olan tek bir `configRewriter.vars` nesnesinde birleştirir.

```html
  /* Included on publisher page */
  <amp-analytics type="myVendor" id="myVendor" data-credentials="include">
    <script type="application/json">
    {
      "configRewriter": {
        "varGroups": {
          "group1": {
            "enabled": true
          },
          "group2": {
            "enabled": true
          }
        }
      }
    }
    </script>
  </amp-analytics>
```

Bu örnekte, istek gövdesi aşağıdaki gibir görünür:
```json
  /* Sent to configuration rewriter server. */
  "configRewriter": {
    "vars": {
      "referrer": "https://www.example.com",
      "source": "https://www.amp.dev",
      "title": "Cool Amp Tips"
    }
  }
```

### Yapılandırma veri nesneleri <a name="configuration-data-objects"></a>

#### Talepler <a name="requests"></a>

`requests` yapılandırma nesnesi, verilerin bir analiz platformuna aktarılması için kullanılan URL'lerin yanı sıra isteğin toplu işlem veya raporlama davranışını da belirtir. `request-name`, belirli bir etkinliğe (ör. `pageview`, `event` vb.) yanıt olarak hangi isteğin gönderilmesi gerektiğini belirtir. `request-value` bir https URL'si içeriyorsa değer, diğer isteklere veya değişkenlere başvurabilen yer tutucu jetonlar içerebilir. `request-value`, isteğe bağlı istek yapılandırmaları içeren bir nesne de olabilir.

##### İstek yapılandırmaları <a name="request-configs"></a>

Nesneye sahip bir isteği tanımlamaya yönelik özellikler şunlardır:

- `baseUrl`: İsteğin URL'sini tanımlar (zorunlu).
- `reportWindow`: Raporlama isteklerini durdurma zamanını (saniye cinsinden) belirtmek için kullanılan isteğe bağlı bir özellik. `important: true` değerine sahip tetikleyici, maksimum rapor aralığı kısıtlamasını geçersiz kılar.

Bu örnekteki tüm istekler geçerlidir.

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

Bazı analiz sağlayıcıları, `type` özelliği aracılığıyla kullandığınız önceden sağlanan bir yapılandırmaya sahiptir. Bir analiz sağlayıcısı kullanıyorsanız istek bilgilerini eklemeniz gerekmeyebilir. İsteklerin yapılandırılmasının gerekip gerekmediğini ve nasıl yapılandırılacaklarını öğrenmek için tedarikçi firmanızın dokümanlarına bakın.

##### Toplu işleme yapılandırmaları <a name="batching-configs"></a>

İstek pinglerinin sayısını azaltmak için istek yapılandırmasında toplu işleme davranışları belirtebilirsiniz. Aynı isteği kullanan `triggers` nesnesinin [`extraUrlParams`](#extra-url-params) öğeleri, isteğin `baseUrl` öğesine eklenir.

Toplu işleme özellikleri şunlardır:

- `batchInterval`: Bu özellik, istek sırasındaki istek pinglerini temizleme zaman aralığını (saniye cinsinden) belirtir. `batchInterval`, bir sayı veya bir sayı dizisi olabilir (minimum zaman aralığı 200 ms'dir). İstek, dizideki her değere uyar ve ardından, dizinin sonuna ulaştığında son aralık değerini (veya tek değeri) tekrar eder.

Örneğin, aşağıdaki yapılandırma 2 saniyede bir tek bir istek pingi gönderir ve bir örnek istek pingi `https://example.com/analytics?rc=1&rc=2` gibi görünür.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

Aşağıdaki yapılandırma, 1 saniye sonra ilk istek pingini göndermesinin ardından her 3 saniyede bir, bir istek pingi gönderir. İlk istek pingi `https://example.com/analytics?rc=1`, ikinci istek pingi `https://example.com/analytics?rc=2&rc=3&rc=4` gibi görünür.
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### Değişkenler <a name="vars"></a>

`amp-analytics` bileşeni, isteklerde kullanılabilecek birçok temel değişken tanımlar. Bu değişkenlerin tamamını içeren bir listeyi [`amp-analytics` Değişkenler Kılavuzu](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md)'nda bulabilirsiniz. Buna ek olarak, [AMP HTML Değişiklik Kılavuzu](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) tarafından desteklenen tüm değişkenler de desteklenir.

`vars` yapılandırma nesnesi, yeni anahtar/değer çiftlerini tanımlamak veya `request` değerlerinde başvurulabilecek mevcut değişkenleri geçersiz kılmak için kullanılabilir. Yeni değişkenler, yaygın olarak yayıncıya özel bilgileri belirtmek için kullanılır.  Diziler, virgül sınırlayıcısını korurken, URL kodlaması ayrı olarak yapılması gereken bir değer listesi belirtmek için kullanılabilir.

```javascript
"vars": {
  "account": "ABC123",
  "countryCode": "tr",
  "tags": ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### Ek URL Parametreleri <a name="extra-url-params"></a>

`extraUrlParams` yapılandırma nesnesi, isteğe dahil edilecek ek parametreleri belirtir. Varsayılan olarak, ek URL parametreleri her zamanki "&amp;foo=baz" kuralı aracılığıyla bir istek URL'sinin sorgu dizesine eklenir.

Bir isteğe `&a=1&b=2&c=3` parametrelerini ekleyecek bir örneği burada bulabilirsiniz:

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

`useBody` etkinse ve istek, `beacon` veya `xhrpost` aktarım yöntemi aracılığıyla gönderilirse `extraUrlParams`, URL'nin yerine istek gövdesi aracılığıyla gönderilebilir. Bu durumda, parametreler URL kodlamalı olmaz veya birleştirilmez. Daha ayrıntılı bilgi için [Ek URL Parametreleri için Gövdeyi Kullanma](#use-body-for-extra-url-params) konusuna bakın.

`extraUrlParamsReplaceMap` özelliği, `extraUrlParams` yapılandırmasında anahtarları önceden işlemek için `String.replace()` işleminde parametre görevi gören bir anahtar ve değer eşlemesi belirtir. Örneğin, bir `extraUrlParams` yapılandırması `"page.title": "The title of my page"` ve `extraUrlParamsReplaceMap`, `"page.": "_p_"` değerini tanımlarsa isteğin sonuna `&_p_title=The%20title%20of%20my%20page%20` eklenir.

`extraUrlParams` kullanmak için `extraUrlParamsReplaceMap` öğesinin kullanılması gerekmez. `extraUrlParamsReplaceMap` tanımlanmazsa herhangi bir dize değişikliği olmaz ve `extraUrlParams` içinde tanımlanan dizeler oldukları gibi kullanılır.

`useBody` etkinse ve istek, `beacon` veya `xhrpost` aktarım yöntemi aracılığıyla gönderilirse `extraUrlParamsReplaceMap` dize değişikliği, yalnızca `extraUrlParams` yapılandırmasının üst düzey anahtarlarında gerçekleştirilir.

#### Tetikleyiciler <a name="triggers"></a>

`triggers` yapılandırma nesnesi, bir analiz isteğinin gönderilmesi gerektiği zamanı açıklar. `triggers` özelliği, tetikleyici adı ve tetikleyici yapılandırmasının anahtar/değer çiftini içerir. Tetikleyici adı, alfasayısal karakterlerden (a-zA-Z0-9) oluşan herhangi bir dize olabilir. Daha düşük önceliğe sahip bir yapılandırmadaki tetikleyiciler, daha yüksek önceliğe sahip bir yapılandırmada bulunan, aynı adlara sahip tetikleyiciler tarafından geçersiz kılınır.

* `on` (zorunlu) Dinlenecek etkinlik. Geçerli değerler şunlardır: `render-start`, `ini-load`, `click`, `scroll`, `timer`, `visible`, `hidden`, `user-error`, [`access-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) ve [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)
* `request` (zorunlu) Gönderilecek isteğin adı (`requests` bölümünde belirtildiği gibi).
* `vars` Üst düzey yapılandırmada tanımlanmış `vars` değerini geçersiz kılmak veya bu tetikleyiciye özel vars değeri belirtmek için kullanılan anahtar/değer çiftlerini içeren bir nesne.
* Toplu işleme davranışını veya rapor aralığını destekleyen isteklerle çalışmak için `important` öğesi belirtilebilir. `important` öğesinin `true` değerine ayarlanması, toplu istek sırasının bazı tetikleyicilerle temizlenmesine yardımcı olabilir. Bu durumda, önemli tetikleme etkinliklerini kaybetmeden istek ping sayısını azaltmak mümkündür. `important` öğesinin `true` değerine ayarlanması, önemli istek pinglerine gönderilen isteğin `reportWindow` değerini de geçersiz kılabilir.
* `selector` ve `selectionMethod`, `click` ve `visible` gibi bazı tetikleyiciler için belirtilebilir. Ayrıntılar için [Öğe seçici](#element-selector) konusuna bakın.
* `scrollSpec` (`on` özelliği `scroll` değerine ayarlandığında zorunludur) Bu yapılandırma, `scroll` tetikleyicisi ile birlikte kullanılır. Ayrıntılar için lütfen aşağıdakilere göz atın.
* `timerSpec` (`on` özelliği `timer` değerine ayarlandığında zorunludur) Bu yapılandırma, `timer` tetikleyicisiyle birlikte kullanılır. Ayrıntılar için lütfen aşağıdakilere göz atın.
* `sampleSpec` Bu nesne, isteklerin gönderilmeden önce nasıl örneklenebileceğini tanımlamak için kullanılır. Bu ayar, rastgele girdi veya diğer platform destekli değişkenlere dayalı örneklemeye olanak tanır. Nesne, bir karma oluşturmak için kullanılan bir giriş ve karmanın karşılaması gereken bir eşiği belirten yapılandırmayı içerir.
    * `sampleOn` Bu dize şablonu, platform değişkenlerinin doldurulmasıyla genişletilir ve ardından, aşağıdaki eşik altında açıklanan örnekleme mantığının amacına uygun bir sayı üretmek üzere karma oluşturulur.
    * `threshold` Bu yapılandırma, belirli ölçütlere uymayan istekleri filtrelemek için kullanılır: Bir isteğin analiz tedarikçi firmasına ulaşması için aşağıdaki mantık gerçek `HASH(sampleOn) < threshold` olmalıdır.</li>
* `videoSpec` (`on` özelliği `video-*` olarak ayarlandığında kullanılır) Bu yapılandırma, [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md) tetikleyicileriyle birlikte kullanılır.

Örneğin, aşağıdaki yapılandırma rastgele girişe dayalı isteklerin %50'sinde veya istemci kimliğine göre %1'de örnekleme yapmak için kullanılabilir.

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### Öğe seçici <a name="element-selector"></a>

`click` ve `visible` gibi bazı tetikleyiciler, seçici özelliklerini kullanarak tek bir öğenin veya bir öğe koleksiyonunun belirtilmesine olanak tanır. Farklı tetikleyiciler, bir seçicinin eşleşen tüm öğelere mi yoksa ilk öğeye mi uygulandığını veya tüm öğelerin mi yoksa yalnızca AMP öğelerinin eşleştirilebileceği gibi seçili öğeler üzerinde farklı sınırlamalar ve yorumlar uygulayabilir. Daha fazla ayrıntı için ilgili her bir tetikleyicinin dokümanlarına bakın.

Seçici özellikleri şunlardır:

- `selector` Bu özellik, CSS/DOM sorgusu kullanan bir öğeyi veya öğe koleksiyonunu bulmak için kullanılır. Öğenin eşleştirilme şeklinin anlamı, `selectionMethod` kullanılarak değiştirilebilir. Bu özelliğin değeri şunlardan biri olabilir:
    - geçerli bir CSS seçici, ör. `#ad1` veya `amp-ad`.
    - `:root` - doküman köküyle eşleşen özel bir seçici.
- `selectionMethod` Belirtildiğinde, bu özellik şu iki değerden birini alabilir: `scope` veya `closest`. `scope`, `amp-analytics` etiketinin üst öğesinin içinde öğe seçimine izin verir. `closest`, belirtilen seçiciyi karşılayan `amp-analytics` etiketinin en yakın üst öğesini arar. Varsayılan değer, `scope` değeridir.

##### Yerleştirme oluşturma başlangıç tetikleyicisi <a name="embed-render-start-trigger"></a>

Diğer dokümanları iframe'lerin (ör. reklamlar) içine yerleştiren AMP öğeleri, bir oluşturma başlangıç etkinliği (`"on": "render-start"`) bildirebilir. Bu etkinlik genellikle yerleştirilmiş dokümanın oluşturulmasına başlandığını onaylamak mümkün olur olmaz yayınlanır. Belirli bir AMP öğesinin bu etkinliği yayınlayıp yayınlamadığını öğrenmek için öğenin dokümanlarına bakın.

Yerleştirme öğesinin tetikleyicisi, yerleştirmeyi yapan öğeye işaret eden bir [`seçici`](#element-selector) içermelidir:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

Oluşturma başlangıç etkinliği, dokümanın kendisi tarafından da yayınlanabilir ve şu şekilde yapılandırılabilir:
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}
```

##### İlk yükleme tetikleyicisi <a name="initial-load-trigger"></a>

İlk yükleme etkinliği (`"on": "ini-load"`), bir AMP öğesinin veya AMP dokümanının ilk içeriği yüklendiğinde tetiklenir.

"İlk yükleme", kapsayıcı ve başlangıç boyutuyla ilişkili olarak tanımlanır.
Daha kesin belirtmek gerekirse:

- Bir doküman için: ilk görüntü alanında bulunan tüm öğeler.
- Bir yerleştirme öğesi için: Yerleştirme dokümanında, yerleştirme öğesinin başlangıç boyutu içinde konumlandırılan tüm içerik öğeleri.
- Basit bir AMP öğesi (ör. `amp-img`) için: resim veya video gibi kaynakların kendisi.

Bir yerleştirme veya AMP öğesinin tetikleyicisi, öğeye işaret eden bir [`seçici`](#element-selector) içermelidir:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

İlk yükleme etkinliği, dokümanın kendisi tarafından da yayınlanabilir ve şu şekilde yapılandırılabilir:
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### Sayfa ve öğe görünürlüğü tetikleyicisi <a name="page-and-element-visibility-trigger"></a>

Sayfa görünür hale geldiğinde bir isteği etkinleştirmek için sayfa görünürlüğü tetikleyicisini (`"on": "visible"`) kullanın. Bu tetikleyicinin etkinleşmesi, `visibilitySpec` kullanılarak yapılandırılabilir.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

Öğe görünürlüğü tetikleyicisi, [`seçici`](#element-selector) kullanılarak herhangi bir AMP öğesi veya bir doküman kökü için yapılandırılabilir. Belirtilen öğe, `visibilitySpec` kullanılarak özelleştirilebilen görünürlük parametreleriyle eşleştiğinde tetikleyici etkinleşir.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* optional visibility spec */}
  }
}
```

Seçicinin bir koleksiyonu değil, yalnızca tek bir öğeyi belirtmek için kullanılabileceğini unutmayın. Öğe, [AMP genişletilmiş öğesi](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-tag-addendum.md#amp-specific-tags) veya bir doküman kökü olabilir.

Öğe görünürlüğü tetikleyicisi, öğenin görünürlüğünü izlemeden önce `visibilitySpec` öğesindeki `waitFor` özelliğiyle belirtilen sinyali bekler. `waitFor` değeri belirtilmezse öğenin [`ini-load`](#initial-load-trigger) sinyalini bekler. Daha fazla ayrıntı için `waitFor` dokümanlarına bakın.
`reportWhen` değeri belirtilirse tetikleyici, etkinliği göndermeden önce bu sinyali bekler. Bu, örneğin, sayfa kapatıldığında analiz etkinliklerini gönderme açısından yararlıdır.

##### Hata tetikleyicisi <a name="error-trigger"></a>

Sayfanın yazarı veya sayfanın yayınlanmasında kullanılan yazılımla ilişkilendirilebilen bir hata oluştuğunda kullanıcı hatası etkinliği (`"on": "user-error"`) tetiklenir. Bu durum, bir AMP bileşeninin yanlış yapılandırmasını, hatalı yapılandırılmış reklamları veya başarısız onaylamaları içerir ancak bunlarla sınırlı değildir. Kullanıcı hataları, geliştirici konsolunda da bildirilir.

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```

NOTE: A4A iframe yerleştirmelerinden, sayfayla alakası olmayan hatalar bildirmeye devam ettiği [bilinen bir sorun](https://github.com/ampproject/amphtml/issues/10891) vardır.

**<a id="visibility-spec"></a>Görünürlük Spesifikasyonu**

`visibilitySpec`, `visible` veya `hidden` tetikleyicisinin etkinleştiğinde değişmesi için uygulanabilecek bir koşullar ve özellikler grubudur. Birden çok özellik belirtilirse bir isteğin etkinleşmesi için bu özelliklerin tümünün doğru olması gerekir. `visibilitySpec` içinde desteklenen yapılandırma özellikleri şunlardır:

- `waitFor`: Bu özellik, görünürlük tetikleyicisinin görünürlüğü izlemeden önce belirli bir sinyal için beklemesini bildirir. `none`, `ini-load` ve `render-start` değerleri desteklenir. `waitFor` tanımlanmazsa seçici belirtildiğinde varsayılan olarak [`ini-load`](#initial-load-trigger) veya aksi halde `none` değerine ayarlanır.
- `reportWhen`: Bu özellik, görünürlük tetikleyicisinin tetikleyiciyi göndermeden önce belirli bir sinyal için beklemesini bildirir. Yalnızca `documentExit` değeri desteklenir. `reportWhen` ve `repeat` aynı visibilitySpec içinde birlikte kullanılamaz. `reportWhen` belirtildiğinde, görünürlük gereksinimleri o sırada veya daha önceden karşılanmamış olsa bile raporun sinyal verildiği anda gönderileceğini unutmayın. Tüm alakalı değişkenler (`totalVisibleTime` vb.), bu `visibilitySpec` öğesindeki görünürlük gereksinimlerine göre doldurulur.
- `continuousTimeMin` ve `continuousTimeMax`: Bu özellikler, bir öğe (veya bir kısmı) belirtilen minimum ve maksimum zamanlar arasında sürekli bir süre için görüntü alanının içinde bulunduğunda bir isteğin etkinleşmesi gerektiğini belirtir. Süreler milisaniye cinsinden ifade edilir. `continuousTimeMin` belirtilmezse varsayılan olarak 0 değerine ayarlanır.
- `totalTimeMin` ve `totalTimeMax`: Bu özellikler, bir öğe (veya bir kısmı) belirtilen minimum ve maksimum zamanlar arasında bir toplam süre için görüntü alanının içinde bulunduğunda bir isteğin etkinleşmesi gerektiğini belirtir. Süreler milisaniye cinsinden ifade edilir. `totalTimeMin` belirtilmezse varsayılan olarak 0 değerine ayarlanır.
- `visiblePercentageMin` ve `visiblePercentageMax`: Bu özellikler, bir öğenin bir kısmı belirtilen minimum ve maksimum yüzdeler arasında görüntü alanının içinde görünür olduğunda bir isteğin etkinleşmesi gerektiğini belirtir. 0 ile 100 arasındaki yüzde değerleri geçerlidir. Üst sınırın (`visiblePercentageMax`) kapsayıcı olduğunu unutmayın. Her iki sınır 0'a veya 100'e ayarlanmadıkça alt sınır (`visiblePercentageMin`) dışlayıcıdır. Her iki sınır da 0'a ayarlanırsa öğe görünmediğinde tetikleyici etkinleşir. Her iki sınır da 100 değerine ayarlanırsa öğe tam olarak görünür olduğunda tetikleyici etkinleşir. Bu özellikler, zamanlamayla ilgili diğer özelliklerle birlikte tanımlandığında, yalnızca bu özelliklerin karşılandığı zaman sayılır. `visiblePercentageMin` için varsayılan değer 0 ve `visiblePercentageMax` için varsayılan değer 100'dür.
- `repeat`: Bu özellik `true` değerine ayarlanırsa `visibilitySpec` koşullarının karşılandığı her seferinde tetikleyici etkinleşir. Aşağıdaki örnekte, öğe görünümde %51'e, sonra %49'a, ardından tekrar %51'i sayfaya kaydırılırsa tetikleyici iki kez etkinleşir. Ancak, `repeat` için `false` değeri belirlenmişse tetikleyici bir kez etkinleşir. `repeat` öğesinin varsayılan değeri `false` değeridir. `reportWhen` ve `repeat`, aynı visibilitySpec öğesi içinde birlikte kullanılamaz.

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
  }
```

`visiblePercentageThresholds`, yalnızca `visiblePercentageMin` ve `visiblePercentageMax` değerleri farklı olan birden fazla `visibilitySpec` örneği oluştururken kestirme olarak kullanılabilir. Örneğin, aşağıdakiler eşdeğerdir:

```javascript
// Two triggers with visibilitySpecs that only differ in visiblePercentageMin and visiblePercentageMax:
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// A single trigger equivalent to both of the above:
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```

Yukarıdaki koşullara ek olarak, `visibilitySpec`, [burada](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#visibility-variables) belgelenen bazı değişkenleri de etkinleştirir.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "waitFor": "ini-load",
      "reportWhen": "documentExit",
      "visiblePercentageMin": 20,
      "totalTimeMin": 500,
      "continuousTimeMin": 200
    }
  }
}
```
Tetikleyicilerin bir parçası olarak sağlanan değişkenlere ek olarak, [veri özelliği olarak ek değişkenler/değişken geçersiz kılmaları](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute) da belirtebilirsiniz. Bu veri özellikleri kullanılırsa [`seçici`](#element-selector) olarak belirtilen öğenin bir parçası olmaları gerekir.

##### Tıklama tetikleyicisi <a name="click-trigger"></a>

Belirtilen bir öğe tıklandığında bir isteği etkinleştirmek için tıklama tetikleyicisini (`"on": "click"`) kullanın. Hangi öğelerin bu isteğin etkinleşmesine neden olacağını denetlemek için [`seçiciyi`](#element-selector) kullanın. Tetikleyici, belirtilen seçicinin eşleştirdiği tüm öğeler için tetiklenir.

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

Tetikleyicilerin bir parçası olarak sağlanan değişkenlere ek olarak, [veri özelliği olarak ek değişkenler/değişken geçersiz kılmaları](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute) da belirtebilirsiniz. Bu veri özellikleri kullanılırsa `selector` olarak belirtilen öğenin bir parçası olmaları gerekir

##### Kaydırma tetikleyicisi <a name="scroll-trigger"></a>

Sayfa kaydırıldığında belirli koşullar altında bir isteği etkinleştirmek için kaydırma tetikleyicisini (`"on": "scroll"`) kullanın. Bu tetikleyici, bir isteğin gönderilmesini tetikleyen sınırları belirten [özel değişkenler](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#interaction) sağlar. Bunun etkinleşeceği zamanı kontrol etmek için `scrollSpec` nesnesini kullanın:

- `scrollSpec` Bu nesne, `verticalBoundaries` ve `horizontalBoundaries` öğelerini içerebilir. Bir kaydırma etkinliğinin etkinleşmesi için iki özellikten en az biri gereklidir. Özelliğin her ikisi için değerler, bir kaydırma etkinliğinin oluşturulduğu sınırları içeren sayı dizileri olmalıdır. Örneğin, aşağıdaki kod snippet'inde, sayfa dikey olarak %25, %50 ve %90 oranında kaydırıldığında kaydırma etkinliği etkinleşir. Buna ek olarak, sayfa kaydırma genişliğinin %90'ına yatay olarak kaydırıldığında etkinlik de tetiklenir. Sayfa performansını korumak için kaydırma sınırları `5`'in en yakın katına yuvarlanır.

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### Zamanlayıcı tetikleyicisi <a name="timer-trigger"></a>

Bir isteğinde düzenli aralıklarla etkinleşmesi için zamanlayıcı tetikleyicisini (`"on": "timer"`) kullanın. Bunun etkinleşeceği zamanı denetlemek için `timerSpec` öğesini kullanın:

- `timerSpec` `timer` tetikleyici türüyle ilgili spesifikasyon. Bir `startSpec` belirtilmezse zamanlayıcı hemen (varsayılan olarak, ayar kaldırılabilir) ve daha sonra, belirtilen bir aralıkta tetiklenir.
    - `interval` Zamanlayıcı aralığının saniye cinsinden uzunluğu.
    - `maxTimerLength` Saniye cinsinden zamanlayıcının etkinleşeceği maksimum süre. `maxTimerLength` değerine ulaşıldığında bir ek istek tetiklenir. Varsayılan değer 2 saattir. Bir `stopSpec` değeri varsa ancak maxTimerLength belirtilmediyse varsayılan değer sonsuzdur.
    - `immediate` Zamanlayıcının hemen tetiklenip tetiklenmeyeceği. Boole değeri, varsayılan olarak true değerini alır

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

Kullanıcı etkinliklerinin kullandığı zamanları belirleyen bir zamanlayıcıyı yapılandırmak için:

- `startSpec` Bir zamanlayıcının başlamasını tetiklemeyle ilgili spesifikasyon. Belirli etkinlikleri izlemek için `on` ve `selector` değerini kullanın. `startSpec` değeri içeren ancak `stopSpec` değeri içermeyen bir yapılandırma yalnızca `maxTimerLength` değerine ulaşıldıktan sonra durur.
- `stopSpec` Zamanlayıcı durduğunda tetiklemeyle ilgili spesifikasyon. `stopSpec` değeri içeren ancak `startSpec` değeri içermeyen bir yapılandırma zamanlayıcıyı hemen başlatır ancak yalnızca belirtilen etkinlikte durdurur.

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

İç içe yerleştirilmiş zamanlayıcı tetikleyicileri oluşturma hakkında ayrıntılar için [tetikleyiciler](#triggers) ile ilgili spesifikasyona bakın. Zamanlayıcıyı başlatmak veya durdurmak için bir zamanlayıcı tetikleyicisinin kullanılmasına izin verilmediğini unutmayın.

##### Gizli tetikleyici <a name="hidden-trigger"></a>

Sayfa gizlendiğinde bir isteği etkinleştirmek için gizli tetikleyiciyi (`"on": "hidden"`) kullanın.

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

Bir isteğin yalnızca görünürlük süresi koşulları karşılanırsa etkinleşmesi için bir [`visibilitySpec`](#visibility-spec) eklenebilir.
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
Yukarıdaki yapılandırma şöyle çevrilir:

<blockquote>
Sayfa gizlendiğinde, #anim-id öğesi toplamda 3 saniyeden uzun süreyle görünür (görüntü alanının %20'sinden fazla) kaldıysa bir istek tetiklenir.
</blockquote>

##### Erişim tetikleyicileri <a name="access-triggers"></a>

AMP Access sistemi, erişim akışında farklı durumlar için çok sayıda etkinlik yayınlar. Erişim tetikleyicileri (`"on": "access-*"`) hakkında ayrıntılı bilgi için [AMP Access ve Analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) konusuna bakın.

#### Video analizi tetikleyicileri <a name="video-analytics-triggers"></a>

Video analizi, yayıncıların bir videonun yaşam döngüsü sırasında gerçekleşen farklı etkinlikleri izlemek için kullanabilecekleri çeşitli tetikleyiciler (`"on": "video-*"`) sağlar. [AMP Video Analizi](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md) konusunda daha fazla ayrıntı bulabilirsiniz.

#### Taşıma <a name="transport"></a>

`transport` yapılandırma nesnesi, bir isteğin nasıl gönderileceğini belirtir. Değer, hangi taşıma yöntemlerinin kabul edilebilir olduğunu belirten alanlara sahip bir nesnedir.

* `beacon` İsteği iletmek için [`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) öğesinin kullanılabileceğini belirtir. Bu işlem, kimlik bilgilerini içeren bir POST isteği gönderir. `useBody` öğesi true değerine ayarlanmamışsa istek, boş bir gövdeyle gönderilir. `useBody` hakkında daha fazla bilgi için [Ek URL Parametreleri için Gövdeyi Kullanma](#use-body-for-extra-url-params) konusuna bakın.
* `xhrpost` İsteği iletmek için `XMLHttpRequest` öğesinin kullanılabileceğini belirtir. Bu işlem, kimlik bilgilerini içeren bir POST isteği gönderir. `useBody` öğesi true değerine ayarlanmamışsa istek, boş bir gövdeyle gönderilir. `useBody` hakkında daha fazla bilgi için [Ek URL Parametreleri için Gövdeyi Kullanma](#use-body-for-extra-url-params) konusuna bakın.
* `image` İsteğin bir `Image` etiketi oluşturularak gönderilebileceğini belirtir. Bu işlem bir GET isteği gönderir. Boş yanıtlar veya istek hatalarından dolayı konsol uyarılarını gizlemek için `"image": {"suppressWarnings": true}` değerini ayarlayın.

MRC tarafından onaylanan tedarikçi firmalar, iframe-transport-vendors.js dosyasına bir URL dizesi ekleyerek dördüncü bir taşıma mekanizması olan "iframe transport"tan yararlanabilir. Bu dize, `src` özelliği bu URL'ye ayarlanmış bir iframe'in oluşturulması gerektiğini ve isteklerin, `window.postMessage()` aracılığıyla bu iframe'e gönderileceğini belirtir. Bu durumda, isteklerin tam donanımlı URL'ler olması gerekmez. `iframe` yalnızca `iframe-transport-vendors.js` içinde belirtilebilir, `amp-analytics` etiketinin içinde satır içi olarak veya uzak yapılandırma aracılığıyla belirtilemez. Ayrıca, tedarikçi firma çerçevesi, amp-ad-exit tarafından kullanılacak bir yanıt gönderebilir. [analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) ve [fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html) dosyalarına bakın: İlk dosya, {'collected-data': 'abc'} öğesinin bir yanıt JSON nesnesini gönderir ve ikinci dosya, finalUrl öğesindeki 'abc' değerini 'bar_' olarak değiştirmek için bu nesneyi kullanır.

Yukarıdaki taşıma yöntemlerinin birden fazlası etkinse öncelik `iframe` &gt; `beacon` `xhrpost` &gt; `image` şeklinde belirlenir. Yalnızca bir taşıma yöntemi kullanılır ve bu, izin verilen ve kullanılabilecek en yüksek öncelikli yöntem olur. İstemcinin kullanıcı aracısı bir yöntemi desteklemiyorsa etkinleştirilmiş olan bir sonraki en yüksek öncelikli yöntem kullanılır. Varsayılan olarak, yukarıdaki dört yöntem de etkinleştirilir.

Aşağıdaki örnekte bir `iframe` URL'si belirtilmemiştir ve `beacon` ile `xhrpost`, `false` değerine ayarlandığından, `image` yöntemine göre daha yüksek önceliğe sahip olmalarına rağmen kullanılmaz. `image` varsayılan olarak `true` değerine ayarlanır ancak burada açıkça belirtilmiştir. İstemcinin kullanıcı aracısı `image` yöntemini destekliyorsa bu yöntem kullanılır; aksi takdirde, herhangi bir istek gönderilmez.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

Daha fazla bilgi edinmek için [iframe taşıma istemci API'sinin uygulandığı bu örneğe](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) ve [söz konusu iframe'i kullanan bu örnek sayfaya](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport.amp.html) bakın. Örnek, `amp-analytics` etiketini içeren [sahte bir reklam](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html) yükler. Sahte reklam içeriğinin, uyulması gereken bazı ek yapılandırma talimatları içerdiğini unutmayın.

##### Ek URL Parametreleri için Gövdeyi Kullanma <a name="use-body-for-extra-url-params"></a>

`useBody` yapılandırma seçeneği, `extraUrlParams` öğesinin URL kodlamalı sorgu parametreleri olarak URL'ye eklenmesi yerine POST istek gövdesine eklenip eklenmeyeceğini belirtir.

`useBody` yalnızca `beacon` ve `xhrpost` taşıma yöntemleri için kullanılabilir. `useBody` öğesi true (doğru) değerine ayarlanırsa ve bu taşıma yöntemlerinden biriyle birlikte kullanılırsa `extraUrlParams`, POST isteği gövdesinde gönderilir. Aksi takdirde, istek boş bir gövdeyle gönderilir ve `extraUrlParams`, URL parametreleri olarak eklenir.

`useBody` öğesini kullanarak, `extraUrlParams` öğesine iç içe yerleştirilmiş nesneler ekleyebilirsiniz. Ancak, istek `useBody` öğesini desteklemeyen diğer taşıma seçeneklerini (ör. `image`) kullanırsa iç içe yerleştirilmiş bu nesneler, `[object Object]` olarak URL'ye dizeselleştirilir.

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### Yönlendirme Politikası <a name="referrer-policy"></a>

Yönlendirme politikası, `transport` yapılandırmasında `referrerPolicy` alanı olarak belirtilebilir. Şu anda yalnızca `no-referrer` değeri desteklenmektedir.
Yönlendirme politikası yalnızca `image` taşıması için kullanılabilir. `referrerPolicy: no-referrer` belirtilirse `beacon` ve `xhrpost` taşımaları geçersiz kılınarak `false` değerine ayarlanır.

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true,
  "referrerPolicy": "no-referrer"
}
```

#### Bağlayıcılar <a name="linkers"></a>

`linkers` özelliği, alanlar arası kimlik senkronizasyonunu etkinleştirmek için kullanılır. `amp-analytics`, sayfada belirtilen giden bağlantılara URL parametresi olarak eklenecek bir “bağlayıcı dizesi” oluşturmak için bir [yapılandırma nesnesi](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md#format) kullanır. Bir kullanıcı bu bağlantılardan birini tıkladığında, hedef sayfa, kimlik senkronizasyonu gerçekleştirmek için URL parametresindeki bağlayıcı dizesini okur. Bu genellikle bir AMP proxy alanı ve yayıncı alanındaki kullanıcı oturumlarını birleştirmek için kullanılır.

Bağlayıcı yapılandırmanızı ayarlamayla ilgili ayrıntılar [Bağlayıcı Kimliği Yönlendirme](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md) konusunda ana hatlarıyla açıklanmıştır

Bu parametreyi kullanmanız gerekirse bu parametrenin nasıl oluşturulduğuna ilişkin bilgiler [Bağlayıcı Kimliği Alma](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md) bölümünde gösterilmektedir.

#### Çerezler <a name="cookies"></a>

`cookies` özelliği, doküman URL'sinden [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#query-parameter) ve [`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#linker-param) bilgilerini ayıklayarak çerezleri orijinal alana yazmayı destekler. AMP proxy'si uygulanan alandan bir yayıncı alanındaki AMP sayfalarına kimlik senkronizasyonu gerçekleştirmek için `linkers` özellikleriyle birlikte kullanılabilir.

`cookies` yapılandırmasını ayarlamayla ilgili ayrıntıları [AMP Sayfalarında Bağlayıcı Parametreleri Alma](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages) bölümünde bulabilirsiniz.

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-analytics kurallarına](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/validator-amp-analytics.protoascii) bakın.

### `<amp-analytics>` için geçerli özellikler <a name="valid-attributes-for-"></a>

Bunlar, `amp-analytics` bileşeninin geçerli özellikleridir:

**type**

Tedarikçi firmanın türünü belirtir.  Ayrıntılar için [Analytics tedarikçi firmaları](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md) listesine bakın.

Örnek:

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

Bu, belirtilen uzak bir URL'den bir yapılandırmayı yüklemek için kullanılabilen isteğe bağlı bir özelliktir. Belirtilen URL, HTTPS şemasını kullanmalıdır. Ayrıca, aşağıdaki `data-include-credentials` özelliğine bakın. URL, [AMP URL değişkenlerini](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) içerebilir. Yanıt, [AMP CORS güvenlik yönergelerine](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) uygun olmalıdır.

Örnek:

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

`include` değerine ayarlanırsa `config` özelliğiyle belirtilen istekte çerez okuma ve yazma özelliği etkinleştirir. Bu, isteğe bağlı bir özelliktir.

**data-consent-notification-id**

Değer sağlanırsa sayfa, belirtilen HTML öğesi kimliğine sahip bir [amp-user-notification](amp-user-notification.md) kullanıcı tarafından onaylanıncaya (kabul edilinceye) kadar analiz isteklerini işlemez. Bu, isteğe bağlı bir özelliktir.

## AMP bileşenleri için analiz <a name="analytics-for-amp-components"></a>

AMP bileşeni geliştiricileri, AMP Analytics'i kullanarak veri koleksiyonunu uygulayabilir. Daha fazla bilgi için lütfen [AMP bileşenleri için analizleri uygulama](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-components-analytics.md) konusuna bakın
