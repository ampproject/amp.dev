---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
toc: true
$title: amp-form
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



<table>
  <tr>
    <td width="40%"><strong>Açıklama</strong></td>
    <td><code>form</code> ve <code>input</code> etiketleri oluşturmanıza olanak tanır.</td>
  </tr>
  <tr>
    <td><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">Desteklenen Düzenler</a></strong></td>
    <td>Yok</td>
  </tr>
  <tr>
    <td><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-form/">amp-form</a> örneklerine bakın.</td>
  </tr>
</table>


# Davranış <a name="behavior"></a>

`amp-form` uzantısı, bir AMP belgesindeki giriş alanlarını göndermek için formlar (`<form>`) oluşturmanıza olanak tanır. `amp-form` uzantısı, tarayıcılardaki bazı eksik davranışlar için [çoklu dolgular](#polyfills) da sağlar.

[tip type="important"]
Formunuzda veri gönderiyorsanız sunucu uç noktanız, [CORS güvenliği](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp) gerekliliklerini uygulamalıdır.
[/tip]

Bir `<form>` oluşturmadan önce, `<amp-form>` uzantısı için gerekli komut dosyasını eklemeniz gerekir; aksi takdirde, dokümanınız geçersiz olur. `input` etiketlerini, değerlerini (ör. `<form>` içinde olmayan girişler) gönderme dışında başka amaçlarla kullanıyorsanız `amp-form` uzantısını yüklemeniz gerekmez.

Temel bir form örneğini burada bulabilirsiniz:

[example preview="inline" playground="true" imports="amp-form" template="amp-mustache"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"{% if not format=='email'%}  
    target="_top"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          required>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          required>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
    <div submit-success>
      <template type="amp-mustache">
        Subscription successful!
      </template>
    </div>
    <div submit-error>
      <template type="amp-mustache">
        Subscription failed!
      </template>
    </div>
  </form>
```
[/example]

# Özellikler <a name="attributes"></a>

# target <a name="target"></a>

Formu gönderdikten sonra form yanıtının görüntüleneceği yeri belirtir. `_blank` veya `_top` değerini almalıdır.

# action <a name="action"></a>

Form girişini işlemek için bir sunucu uç noktası belirtir. Değer bir `https` URL'si (mutlak veya göreli) olmalı ve bir CDN bağlantısı olmamalıdır.

* `method=GET` için: bu özelliği veya [`action-xhr`](#action-xhr) özelliğini kullanın.
* `method=POST` için: [`action-xhr`](#action-xhr) özelliğini kullanın.

[tip type="note"]
`target` ve `action` özellikleri yalnızca xhr dışındaki GET istekleri için kullanılır. AMP çalışma zamanı, istekte bulunmak için `action-xhr` özelliğini kullanır ve `action` ve `target` özelliklerini yoksayar. `action-xhr` sağlanmadığında AMP, `action` uç noktasına bir GET isteğinde bulunur ve yeni bir pencere açmak için `target` özelliğini kullanır (`_blank` değerinde). AMP çalışma zamanı, `amp-form` uzantısının yüklenemediği durumlarda da `action` ve `target` özelliklerini kullanmaya geri dönebilir.
[/tip]

# action-xhr <a name="action-xhr"></a>

Form girişini işlemek ve XMLHttpRequest (XHR) aracılığıyla formu göndermek için bir sunucu uç noktası belirtir. Bir XHR isteği (bazen AJAX isteği olarak da bilinir), tarayıcının sayfa tam yüklenmeden veya yeni bir sayfa açılmadan istekte bulunmasına neden olur. Tarayıcılar, uygun durumlarda isteği [Getirme API'sini](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) kullanarak arka planda gönderir ve eski tarayıcılar için [XMLHttpRequest API'sini](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) kullanır.

[tip type="important"]
XHR uç noktanız, [CORS güvenliği](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp) gerekliliklerini uygulamalıdır.
[/tip]

Bu özellik `method=POST` için gereklidir ve `method=GET` için isteğe bağlıdır.

`action-xhr` değeri, `action` özelliğiyle aynı veya bundan farklı bir uç nokta olabilir ve yukarıdaki `action` gereksinimlerine sahiptir.

Formu başarıyla gönderdikten sonra kullanıcıyı yönlendirme hakkında bilgi edinmek için aşağıdaki [Gönderimden sonra yönlendirme](#redirecting-after-a-submission) bölümüne bakın.

# Diğer form özellikleri <a name="other-form-attributes"></a>

Diğer tüm [form özellikleri](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) isteğe bağlıdır.

# custom-validation-reporting <a name="custom-validation-reporting"></a>

Bu, özel bir doğrulama raporlama stratejisini etkinleştiren ve seçen isteğe bağlı bir özelliktir. Geçerli değerler şunlardan biridir: `show-first-on-submit`, `show-all-on-submit` veya `as-you-go`.

Daha ayrıntılı bilgi için [Özel Doğrulama](#custom-validations) bölümüne bakın.

# Girişler ve alanlar <a name="inputs-and-fields"></a>

**İzin Verilenler**:

* Formla ilgili diğer öğeler; örneğin: `<textarea>`, `<select>`, `<option>`, `<fieldset>`, `<label>`, `<input type=text>`, `<input type=submit>` vb.
* `<form method=POST action-xhr>` içindeki `<input type=password>` ve `<input type=file>`.
* [`amp-selector`](amp-selector.md)

**İzin Verilmeyenler**:

* `<input type=button>`, `<input type=image>`
* Girişlerdeki formla ilgili çoğu özellik; örneğin: `form`, `formaction`, `formtarget`, `formmethod` ve diğerleri.

(Gelecekte bu kurallardan bazılarının gevşetilmesi yeniden değerlendirilebilir; sizin için gerekli olanlar varsa [lütfen bunları bize bildirin](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#suggestions-and-feature-requests) ve kullanım örnekleri sağlayın).

Geçerli girişler ve alanlarla ilgili ayrıntılar için AMP doğrulayıcı spesifikasyonundaki [amp-form kurallarına](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) bakın.

# İşlemler <a name="actions"></a>

`amp-form` öğesi, aşağıdaki işlemleri sunar:

| İşlem | Açıklama |
|--------|-------------|
| `submit` | Örneğin bir bağlantıya dokunulması veya [giriş değiştiğinde bir form gönderilmesi](#input-events) gibi belirli bir işlemde form gönderimini tetiklemenize olanak tanır. |
| `clear` | Formdaki her bir girişin değerlerini boşaltır. Bu, kullanıcıların formları ikinci kez hızlıca doldurmalarına olanak tanıyabilir. |

[tip type="read-on"]
[AMP'de İşlemler ve Etkinlikler](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) hakkında daha fazla bilgi edinin.
[/tip]

# Etkinlikler <a name="events"></a>

`amp-form` aşağıdaki etkinlikleri sunar:

| Etkinlik | Tetiklenme zamanı |
|-------|-------------|
| `submit` | Form gönderildiğinde ve gönderim tamamlanmadan önce. |
| `submit-success` | Form gönderimi bittiğinde ve yanıt başarılı olduğunda. |
| `submit-error` | Form gönderimi bittiğinde ve hata yanıtı alındığında. |
| `verify` | Eşzamansız doğrulama başlatıldığında. |
| `verify-error` | Eşzamansız doğrulama bittiğinde ve hata yanıtı alındığında. |
| `valid` | Formun doğrulama durumu "geçerli" olarak değiştiğinde ([raporlama stratejisine](#reporting-strategies) uygun olarak). |
| `invalid` | Formun doğrulaması "geçersiz" durumunda olduğunda ([raporlama stratejisine](#reporting-strategies) uygun olarak). |

Bu etkinlikler, [`on` özelliği](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on) aracılığıyla kullanılabilir.

Örneğin, aşağıdakiler hem `submit-success` hem de `submit-error` etkinliklerini dinler ve etkinliğe bağlı olarak farklı lightbox'lar gösterir:

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

[Tam örneği burada](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html) görebilirsiniz.

# Giriş etkinlikleri <a name="input-events"></a>

AMP, alt `<input>` öğelerinde `change` ve `input-debounced` etkinliklerini gösterir. Bu, bir giriş değeri değiştiğinde herhangi bir öğede bir işlemi yürütmek için [`on` özelliğini](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on) kullanmanıza olanak tanır.

Örneğin, giriş değişikliğinde (bir anketi yanıtlamak için bir radyo düğmesinin seçilmesi, bir sayfanın çevirisini yapmak için `select` girişinden bir dilin seçilmesi vb.) bir form gönderilmesi yaygın bir kullanım örneğidir.

[example preview="inline" playground="true" imports="amp-form"]
```html
<form id="myform"
    method="post"
    action-xhr="https://example.com/myform"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <input name="answer1"
          value="Value 1"
          type="radio"
          on="change:myform.submit">Value 1
      </label>
      <label>
        <input name="answer1"
          value="Value 2"
          type="radio"
          on="change:myform.submit">Value 2
      </label>
    </fieldset>
  </form>
```
[/example]

[Tam örneği burada](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html) görebilirsiniz.

# Analiz tetikleyicileri <a name="analytics-triggers"></a>

`amp-form` uzantısı, [amp-analytics](amp-analytics.md) yapılandırmanızda izleyebileceğiniz aşağıdaki etkinlikleri tetikler:

| Etkinlik                     | Tetiklenme zamanı                        |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | Bir form isteği başlatıldığında.      |
| `amp-form-submit-success` | Başarılı bir yanıt alındığında (ör. yanıt `2XX` durumuna sahip olduğunda). |
| `amp-form-submit-error`   | Başarısız bir yanıt alındığında (ör. yanıt `2XX` durumuna sahip olmadığında). |

Analizlerinizi aşağıdaki örnekte olduğu gibi bu etkinlikleri gönderecek şekilde yapılandırabilirsiniz:

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "event": "https://www.example.com/analytics/event?eid=${eventId}",
        "searchEvent": "https://www.example.com/analytics/search?formId=${formId}&query=${formFields[query]}"
      },
      "triggers": {
        "formSubmit": {
          "on": "amp-form-submit",
          "request": "searchEvent"
        },
        "formSubmitSuccess": {
          "on": "amp-form-submit-success",
          "request": "event",
          "vars": {
            "eventId": "form-submit-success"
          }
        },
        "formSubmitError": {
          "on": "amp-form-submit-error",
          "request": "event",
          "vars": {
            "eventId": "form-submit-error"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Bu üç etkinlik de belirli bir forma ve formdaki alanlara karşılık gelen bir dizi değişken oluşturur. Bu değişkenler analiz için kullanılabilir.

Örneğin, aşağıdaki formun bir alanı vardır:

```html
<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="Yorum">
    </form>
```

`amp-form-submit`, `amp-form-submit-success` veya `amp-form-submit-error` etkinliği etkinleştiğinde, formda belirtilen değerleri içeren şu değişkenleri oluşturur:

  * `formId`
  * `formFields[comment]`

# Başarı/hata yanıtı oluşturma <a name="successerror-response-rendering"></a>

Formunuzdaki başarı veya hata yanıtlarını, [amp-moustache](amp-mustache.md) gibi [genişletilmiş şablonları](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates) kullanarak veya başarı yanıtlarını, verileri, [amp-bind](amp-bind.md) ve aşağıdaki yanıt özellikleriyle bağlayarak oluşturabilirsiniz:

| Yanıt özelliği | Açıklama |
|-----------|---------------------|
| `submit-success` | Yanıt başarılı olursa (ör. `2XX` durumuna sahipse) bir başarı mesajı görüntülemek için kullanılabilir. |
| `submit-error` | Yanıt başarısız olursa (ör. `2XX` durumuna sahip değilse) bir gönderim hatası görüntülemek için kullanılabilir.  |
| `submitting` | Form gönderilirken bir mesaj görüntülemek için kullanılabilir. Bu özelliğe ait şablonun, görüntüleme amaçlı tüm form giriş alanlarına erişimi vardır. `submitting` özelliğini nasıl kullanacağınızı öğrenmek için lütfen [aşağıdaki tam form örneğine](#example-submitting) bakın. |

# Yanıtları şablonlarla oluşturmak için: <a name="to-render-responses-with-templating"></a>

* `<form>` öğesinin *doğrudan alt öğelerine* bir yanıt özelliği uygulayın.
* İçinde `<template></template>` veya `<script type="text/plain"></script>` etiketiyle bir şablona ekleyerek ya da `template="id_of_other_template"` özelliğiyle bir şablonu referans alarak alt öğede yanıtı oluşturun.
* `submit-success` ve `submit-error` yanıtları için geçerli bir JSON nesnesi sağlayın. Hem başarı hem de hata yanıtlarının `Content-Type: application/json` üstbilgisi olmalıdır.

<a id="example-submitting"></a>

# Örnek: Başarı, hata ve gönderiliyor medjlarını görüntüleyen form <a name="example-form-displays-success-error-and-submitting-messages"></a>

Aşağıdaki örnekte, yanıtlar, formun içindeki bir satır içi şablonda oluşturulur.

```html
{% raw %}<form ...>
  <fieldset>
    <input type="text" name="firstName">
      ...
    </fieldset>
    <div verify-error="">
      <template type="amp-mustache">
        There is a mistake in the form!
        {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting="">
    <template type="amp-mustache">
      Form submitting... Thank you for waiting {{name}}.
    </template>
  </div>
  <div submit-success="">
    <template type="amp-mustache">
      Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
    to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
  </template>
</div>
<div submit-error="">
  <template type="amp-mustache">
    Oops! {{name}}, {{message}}.
  </template>
</div>
</form>
{% endraw %}
```

Yayıncının `action-xhr` uç noktası aşağıdaki JSON yanıtlarını döndürür:

Başarılı olursa:

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

Hata için:
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

`submit-success` ve `submit-error` özelliklerine sahip öğelerde ayarlanmış `template` özelliğinin değeri için şablon kimliğini kullanarak, dokümanın önceki bölümlerinde tanımlanmış bir referans alınan şablonda yanıtları oluşturabilirsiniz.

```html
{% raw %}<template id="submit_success_template" type="amp-mustache">
  Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
</template>
<template id="submit_error_template" type="amp-mustache">
  Oops! {{name}}, {{message}}.
</template></p>

<form ...="">
  <fieldset>
    ...
  </fieldset>
  <div submit-success="" template="submit_success_template"></div>
  <div submit-error="" template="submit_error_template"></div>
</form>
{% endraw %}
```

[Tam örneği burada](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html) görebilirsiniz.

# Veri bağlama ile bir başarılı yanıtı oluşturmak için <a name="to-render-a-successful-response-with-data-binding"></a>

* Form *submit-success* özelliğini [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29) yöntemine bağlamak için [on özelliğini](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) kullanın.
* Yanıt verilerini yakalamak için `event` özelliğini kullanın.
* Form yanıtını bağlamak için durum özelliğini istediğiniz öğeye ekleyin.

Aşağıdaki örnekte [`amp-bind`](amp-bind.md) özelliğiyle oluşturulmuş bir form `submit-success` yanıtı gösterilmektedir:
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
      action-xhr="/components/amp-form/submit-form-input-text-xhr"
      target="_ top"
      on="submit-success: AMP.setState({'subscribe': event.response.name})">
  <div>
    <input type="text"
        name="name"
        placeholder="Name..."
        required>
    <input type="email"
      name="email"
      placeholder="Email..."
      required>
  </div>
  <input type="submit" value="Subscribe">
</form>
```

Form başarıyla gönderildiğinde, aşağıdakine benzer bir JSON yanıtı döndürür:

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
}
```
Ardından, `amp-bind` özelliği `<p>` öğesinin metnini `subscibe` durumuyla eşleşecek şekilde günceller:

```html
...
  <p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
...
```

# Gönderimden sonra yönlendirme <a name="redirecting-after-a-submission"></a>

`AMP-Redirect-To` yanıt üstbilgisini ayarlayarak ve bir yönlendirme URL'si belirterek, başarılı bir form gönderildikten sonra kullanıcıları yeni bir sayfaya yönlendirebilirsiniz. Yönlendirme URL'si bir HTTPS URL'si olmalıdır; aksi takdirde, AMP bir hata bildirir ve yönlendirme gerçekleşmez.  HTTP yanıtı üstbilgileri, sunucunuz aracılığıyla yapılandırılır.

`AMP-Redirect-To` yanıt üstbilgisini izin verilen üstbilgiler listesine eklemek için `Access-Control-Expose-Headers` yanıt üstbilginizi güncellediğinizden emin olun.  Bu başlıklar hakkında daha fazla bilgiyi [AMP'de CORS Güvenliği](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp) sayfasında edinebilirsiniz.

*Örnek yanıt üstbilgileri:*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"]
Form gönderiminden sonra yönlendirmenin kullanımını gösteren Örneklerle AMP [Güncelleme ile Form Gönderimi](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update) ve [Ürün Sayfası](https://ampbyexample.com/samples_templates/product_page/#product-page) bölümlerine göz atın.
[/tip]

# Özel doğrulamalar <a name="custom-validations"></a>

`amp-form` uzantısı, kendi özel doğrulama kullanıcı arayüzünüzü oluşturmak için `custom-validation-reporting` özelliğini ve şu raporlama stratejilerinden birini kullanmanıza olanak tanır: `show-first-on-submit`, `show-all-on-submit` veya `as-you-go`.

Formunuzda özel doğrulamayı belirtmek için:

1. `form` öğenizde `custom-validation-reporting` özelliğini, [doğrulama raporlama stratejilerinden](#reporting-strategies) birine ayarlayın.
1. Özel özelliklerle işaretlenmiş kendi doğrulama kullanıcı arayüzünüzü sağlayın. AMP, özel özellikleri keşfeder ve belirttiğiniz raporlama stratejisine bağlı olarak bunları doğru zamanda bildirir.

Aşağıda bir örnek verilmiştir:

[example preview="inline" playground="true" imports="amp-form"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"
    custom-validation-reporting="show-all-on-submit"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          id="name5"
          required
          pattern="\w+\s\w+">
        <span visible-when-invalid="valueMissing"
          validation-for="name5"></span>
        <span visible-when-invalid="patternMismatch"
          validation-for="name5">
          Please enter your first and last name separated by a space (e.g. Jane Miller)
        </span>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          id="email5"
          required>
        <span visible-when-invalid="valueMissing"
          validation-for="email5"></span>
        <span visible-when-invalid="typeMismatch"
          validation-for="email5"></span>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
  </form>
```
[/example]

Daha fazla örnek için [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html) sayfasına bakın.

Doğrulama mesajlarında, öğenizin içinde herhangi bir metin içeriği yoksa AMP, öğenizi tarayıcının varsayılan doğrulama mesajıyla doldurur. Yukarıdaki örnekte `name5` girişi boş olduğunda ve doğrulama işlemi başlatıldığında (ör. kullanıcı, formu göndermeyi denediğinde) AMP, `<span visible-when-invalid="valueMissing" validation-for="name5"></span>` öğesini, tarayıcının doğrulama mesajıyla doldurur ve bu `span` öğesini kullanıcıya gösterir.

[tip type="important"]
Girişin sahip olabileceği her geçersiz durum türü için kendi doğrulama kullanıcı arayüzünüzü sağlamanız gerekir. Bunlar mevcut değilse kullanıcılar, eksik hata durumu için herhangi bir `custom-validation-reporting` öğesi görmez. Geçerlilik durumları, [resmi W3C HTML doğrulama raporlama dokümanlarında](https://www.w3.org/TR/html50/forms.html#validitystate) bulunabilir.
[/tip]

# Raporlama stratejileri <a name="reporting-strategies"></a>

`custom-validation-reporting` özelliği için aşağıdaki raporlama seçeneklerinden birini belirtin:

# Gönderimde İlkini Göster <a name="show-first-on-submit"></a>

`show-first-on-submit` raporlama seçeneği, varsayılan ilk doğrulama devreye girdiğinde tarayıcının varsayılan davranışını taklit eder. Bulduğu ilk doğrulama hatasını gösterir ve orada durur.

# Gönderimde Tümünü Göster <a name="show-all-on-submit"></a>

`show-all-on-submit` raporlama seçeneği, form gönderildiğinde tüm geçersiz girişlerdeki tüm doğrulama hatalarını gösterir. Bu, doğrulamaların bir özetini göstermek istiyorsanız yararlı olur.

# Devam Ederken <a name="as-you-go"></a>

`as-you-go` raporlama seçeneği, kullanıcınızın girişle etkileşimde bulunurken doğrulama mesajlarını görmesine olanak tanır. Örneğin, kullanıcı geçersiz bir e-posta adresi girerse hatayı hemen görür.  Değeri düzelttikten sonra hata kaybolur.

# Etkileşimde Bulun ve Gönder <a name="interact-and-submit"></a>

`interact-and-submit` raporlama seçeneği, `show-all-on-submit` ve `as-you-go` davranışını birleştirir. Tek tek alanlar, etkileşimlerden hemen sonra hataları gösterir ve gönderimde, form tüm geçersiz alanlardaki hataları gösterir.

# Doğrulama <a name="verification"></a>

HTML5 doğrulaması, yalnızca sayfada bulunan bir değerin belirli bir kalıpla eşleşip eşleşmediği gibi bilgilere dayalı geri bildirimler sağlar. `amp-form` doğrulaması ile kullanıcıya, HTML5 doğrulamasının tek başına sağlayamayacağı bir geri bildirim sunabilirsiniz. Örneğin, bir form, bir e-posta adresinin önceden kayıtlı olup olmadığını kontrol etmek için doğrulamayı kullanabilir. Başka bir kullanım örneği, bir şehir alanı ve posta kodu alanının birbiriyle eşleştiğini doğrulamaktır.

Burada, bir örneği görebilirsiniz:
```html
{% raw %}<h4>Doğrulama örneği</h4>
<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post"{% if not format=='email'%}   target="_blank"{% endif %}>
  <fieldset>
    <label>
      <span>E-posta</span>
      <input type="text" name="email" required="">
      </label>
      <label>
        <span>Posta Kodu</span>
        <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
          <span>Şehir</span>
          <input type="text" name="city" required="">
          </label>
          <label>
            <span>Doküman</span>
            <input type="file" name="document" no-verify="">
            </label>
            <div class="spinner"></div>
            <input type="submit" value="Gönder">
            </fieldset>
            <div submit-success="">
              <template type="amp-mustache">
                <p>Tebrikler! {{email}} e-posta adresi ile kaydoldunuz</p>
              </template>
            </div>
            <div submit-error="">
              <template type="amp-mustache">
                {{#verifyErrors}}
              <p>{{message}}</p>
              {{/verifyErrors}}
            {{^verifyErrors}}
          <p>Bir hata oluştu. Daha sonra tekrar denemek ister misiniz?</p>
          {{/verifyErrors}}
      </template>
    </div>
  </form>
{% endraw %}
```

Form, isteğin bir doğrulama isteği olduğuna ve resmi bir gönderim olmadığına dair sunucuya ipucu vermek için form verilerinin bir parçası olarak bir `__amp_form_verify` alanı gönderir.
Doğrulama ve gönderim için aynı uç nokta kullanılırsa sunucunun doğrulama isteğini kaydetmeyeceğini bilmesi açısından bu faydalı olur.

Bir hata yanıtının doğrulama için nasıl görüneceği burada gösterilmektedir:
```json
  {
    "verifyErrors": [
      {"name": "email", "message": "That email is already taken."},
      {"name": "zip", "message": "The city and zip do not match."}
  ]
}
```

`verify-xhr` isteğinden bir alanı kaldırmak için giriş öğesine `no-verify` özelliğini ekleyin.

Daha fazla örnek için [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html) sayfasına bakın.

# Değişken değişiklikleri <a name="variable-substitutions"></a>

`amp-form` uzantısı, gizli olan ve `data-amp-replace` özelliğine sahip girişler için [platform değişken değişikliklerine](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) olanak tanır. Her form gönderiminde `amp-form`, formun içindeki tüm `input[type=hidden][data-amp-replace]` öğelerini bulur ve değişken değişikliklerini `value` özelliğine uygulayıp bunu, değişikliğin sonucuyla değiştirir.

Her bir girişte, `data-amp-replace` öğesinde kullanılan boşlukla ayrılmış değişken dizesini belirterek her değişiklik için kullandığınız değişkenleri sağlamanız gerekir (aşağıdaki örneğe bakın). AMP, açıkça belirtilmeyen değişkenleri değiştirmez.

Girişlerin, değişikliklerden önce ve sonra nasıl olduğuyla ilgili bir örneği burada bulabilirsiniz (değişken değişikliklerinin platform söz dizimini kullanmanız gerektiğini, analiz olanları kullanmayacağınızı unutmayın):
```html
<!-- Initial Load -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: CANONICAL_URL - RANDOM - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="CLIENT_ID(myid)"
        data-amp-replace="CLIENT_ID">
  ...
</form>
```

Kullanıcı formu göndermeyi denedikten sonra, AMP değişkenleri çözmeye ve tüm alanların alan `value` özelliğini uygun değişikliklerle güncellemeye çalışır. XHR gönderimlerinde, büyük olasılıkla tüm değişkenler değiştirilir ve çözümlenir. Ancak, XHR olmayan GET gönderimlerinde, eşzamansız çözümleme gerektiren değerler, önceden çözümlenmedikleri için kullanılamayabilir. Örneğin, `CLIENT_ID` daha önce çözümlenmemişse ve önbelleğe alınmışsa çözümlenmez.

```html
    <!-- User submits the form, variables values are resolved into fields' value -->
    <form ...>
      <input name="canonicalUrl" type="hidden"
            value="The canonical URL is: https://example.com/hello - 0.242513759125 - CANONICAL_HOSTNAME"
            data-amp-replace="CANONICAL_URL RANDOM">
      <input name="clientId" type="hidden"
            value="amp:asqar893yfaiufhbas9g879ab9cha0cja0sga87scgas9ocnas0ch"
            data-amp-replace="CLIENT_ID">
        ...
    </form>
```

Yukarıdaki `CANONICAL_HOSTNAME` öğesinin, ilk alandaki `data-amp-replace` özelliği aracılığıyla beyaz listeye alınmadığı için değiştirilmemiş olmasına dikkat edin.

Değişiklikler, bir sonraki gönderimde gerçekleşir. [AMP'deki değişken değişiklikleri](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) hakkında daha fazla bilgi edinin.

# Çoklu dolgular <a name="polyfills"></a>

`amp-form` uzantısı, bazı tarayıcılarda eksik olan veya CSS'nin sonraki sürümünde uygulanan davranışlar ve işlevler için çoklu dolgular sağlar.

# Geçersiz gönderim engelleme ve doğrulama mesajı balonu <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

Şu anda (Ağustos 2016 itibarıyla) webkit tabanlı motorlar kullanan tarayıcılar geçersiz form gönderimlerini desteklememektedir. Bu tarayıcılar arasında tüm platformlarda Safari ve tüm iOS tarayıcıları bulunur. `amp-form` uzantısı, geçersiz gönderimleri engellemek ve geçersiz girişlerdeki doğrulama mesajı balonlarını göstermek için bu davranışı gerçekleştirir.

# Kullanıcı etkileşimi sözde sınıfları <a name="user-interaction-pseudo-classes"></a>

`:user-invalid` ve `:user-valid` sözde sınıfları, [gelecekteki CSS Seçicileri 4 spesifikasyonunun](https://drafts.csswg.org/selectors-4/#user-pseudos) parçasıdır ve geçersiz/geçerli alanların birkaç ölçüt temelinde şekillendirilmesine yönelik daha iyi kancalar sağlamak için kullanıma sunulmuştur.

`:invalid` ve `:user-invalid` arasındaki temel farklardan biri, öğeye uygulanma zamanıdır. `:user-invalid` sınıfı, kullanıcının alanla kayda değer bir etkileşiminden sonra uygulanır (ör. kullanıcı bir alana yazı yazar veya alandan uzaklaşır).

`amp-form` uzantısı, bu sözde sınıfları çoklu dolduracak [sınıflar](#classes-and-css-hooks) sağlar. `amp-form` uzantısı, bunları üst `fieldset` öğelerine ve `form` öğesine de yayar.

# `<textarea>` doğrulaması <a name="-validation"></a>

Normal ifade eşleştirme, `<textarea>` haricindeki çoğu giriş öğesinde yerel olarak desteklenen yaygın bir doğrulama özelliğidir. Bu işlevselliğe çoklu dolgu yapar ve `<textarea>` öğelerinde `pattern` özelliğini destekleriz.

AMP Formu, `<textarea>` öğelerine bir `autoexpand` özelliği sağlar. Bu, kullanıcının giriş satırlarına göre metin alanının maksimum boyutuna genişlemesine ve daralmasına olanak tanır. Kullanıcı, alanı manuel olarak yeniden boyutlandırırsa otomatik genişleme davranışı kaldırılır.

```html
<textarea autoexpand></textarea>
```

# Stil <a name="styling"></a>

# Sınıflar ve CSS kancaları <a name="classes-and-css-hooks"></a>

`amp-form` uzantısı, yayıncıların formlarını ve girişlerini şekillendirmeleri için sınıflar ve CSS kancaları sağlar.

Aşağıdaki sınıflar form gönderiminin durumunu belirtmek için kullanılabilir:

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

Aşağıdaki sınıflar, [kullanıcı etkileşimi sözde sınıfları için bir çoklu dolgudur](#user-interaction-pseudo-classes):

* `.user-valid`
* `.user-invalid`

Yayıncılar, girişlerini ve alan ayarlarını kullanıcı işlemlerine duyarlı olacak (ör. kullanıcı ayrıldıktan sonra sonra geçersiz bir girişi kırmızı bir kenarlık ile vurgulama) biçimde şekillendirmek için bu sınıfları kullanabilir.

Bunların kullanımıyla ilgili [tam örneği burada](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html) bulabilirsiniz.

[tip type="success"]
AMP sayfalarınızda kullanabileceğiniz duyarlı, önceden şekillendirilmiş AMP formu öğeleri için [AMP Start](https://ampstart.com/components#form-elements) sayfasını ziyaret edin.
[/tip]

# Güvenlikle ilgili olarak göz önünde bulundurulması gerekenler <a name="security-considerations"></a>

# XSRF'ye karşı koruma <a name="protecting-against-xsrf"></a>

Bir saldırganın, kullanıcının bilgisi olmadan geçerli kullanıcı oturumunu kullanarak yetkisiz komutlar yürütebildiği [XSRF saldırılarına](https://en.wikipedia.org/wiki/Cross-site_request_forgery) karşı koruma sağlamak için [AMP CORS spesifikasyonundaki](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) ayrıntıları uygulamaya ek olarak, lütfen ["Durum değiştirme isteklerini işleme"](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests) konulu bölüme de dikkat edin.

Genel olarak, kullanıcıdan gelen girişleri kabul ederken aşağıdaki noktaları göz önünde bulundurun:

* POST isteklerini yalnızca durum değiştirme istekleri için kullanın.
* XHR olmayan GET isteklerini yalnızca gezinme amacıyla kullanın (ör. Arama).
    * XHR olmayan GET istekleri doğru kaynak/üstbilgiler almaz ve arka uçlar, yukarıdaki mekanizma ile XSRF'ye karşı koruma sağlayamaz.
    * Genel olarak, XHR/XHR olmayan GET isteklerini yalnızca gezinme veya bilgi almak için kullanın.</li>
* AMP dokümanlarında XHR olmayan POST isteklerine izin verilmez. Bunun nedeni, farklı tarayıcılarda bu isteklerdeki `Origin` üstbilgisinin ayarlanmasında tutarsızlıkların olmasıdır. Ayrıca, bunun desteklenmesi, XSRF'ye karşı korumada zorluklara yol açacaktır. Bu durum yeniden değerlendirilebilir ve ileride kullanıma sunulabilir. Bunun gerekli olduğunu düşünüyorsanız lütfen bir sorun bildiriminde bulunun.
