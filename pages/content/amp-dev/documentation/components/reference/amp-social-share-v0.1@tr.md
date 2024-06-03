---
$title: amp-social-share
$category@: ads-analytics
teaser:
  text: Paylaşım izleme özelliği geliştirme aşamasındadır.
---



<!--
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



Bir sosyal paylaşım düğmesi görüntüler.



<table>
  <tr>
    <td class="col-fourty"><strong>Zorunlu Komut Dosyası</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Desteklenen Düzenler</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Örnekler</strong></td>
    <td>Örneklerle AMP <a href="https://ampbyexample.com/components/amp-social-share/">amp-social-share örneği</a> sayfasına bakın.</td>
  </tr>
</table>

## Genel Bakış <a name="overview"></a>

`amp-social-share` bileşeni, çeşitli sosyal platform sağlayıcıları için bir sosyal paylaşım düğmesi görüntüler.

## Örnekler <a name="examples"></a>

**Örnek: Temel sosyal paylaşım düğmesi**

Paylaşım düğmesi, sizin adınıza önceden yapılandırılmış sağlayıcıların bazılarını içeren bazı varsayılanlar tahmin eder. Geçerli doküman standart URL'sinin paylaşmak istediğiniz URL ve sayfa başlığının, paylaşmak istediğiniz metin olduğunu varsayar.

```html
<amp-social-share type="twitter"></amp-social-share>
```

**Örnek: Parametreleri geçirme**

Parametreleri paylaşım uç noktasına geçirmek istediğinizde, paylaşım uç noktasına eklenecek `data-param-<attribute>` değerini belirtebilirsiniz.
```html
<amp-social-share type="linkedin" width="60" height="44"
    data-param-text="Hello world"
    data-param-url="https://example.com/">
</amp-social-share>
```

Linkedin önceden yapılandırılmış sağlayıcılardan biridir; dolayısıyla, `data-share-endpoint` özelliğini sağlamanız gerekmez.

## Özellikler <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (gerekli)</strong></td>
    <td>Bir sağlayıcı türü seçer. Bu, hem önceden yapılandırılmış hem de yapılandırılmamış sağlayıcılar için gereklidir.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>Hedefin içinde açılacağı hedefi belirtir. iOS'te e-posta/SMS dışındaki tüm durumlar için <code>&#95;blank</code> varsayılan ayardır; e-posta/SMS durumunda hedef <code>&#95;top</code> değerine ayarlanır.
        Bu geçersiz kılmayı yalnızca e-posta için kullanmanızı önerdiğimizi lütfen unutmayın.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td>Bu özellik, <strong>yapılandırılmamış sağlayıcılar için gereklidir</strong>.
        <br>
          Bazı popüler sağlayıcıların önceden yapılandırılmış paylaşım uç noktaları vardır. Ayrıntılar için <a href="#pre-configured-providers">Önceden Yapılandırılmış Sağlayıcılar</a> bölümüne bakın. Yapılandırılmamış sağlayıcılar için paylaşım uç noktasını belirtmeniz gerekir.</td>
        </tr>
        <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td><code>data-param-*</code> önekli tüm özellikler URL parametrelerine dönüştürülür ve paylaşım uç noktasına geçirilir.</td>
        </tr>
      </table>

## Önceden yapılandırılmış sağlayıcılar <a name="pre-configured-providers"></a>

`amp-social-share` bileşeni, bazı varsayılan parametrelerin yanı sıra kendi paylaşım uç noktalarını bilen [bazı önceden yapılandırılmış sağlayıcılar](0.1/amp-social-share-config.js) sunar.

<table>
  <tr>
    <th class="col-twenty">Sağlayıcı</th>
    <th class="col-twenty">Tür</th>
    <th>Parametreler</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">Web Paylaşımı API'si</a> (OS paylaşım iletişim kutusunu tetikler)</td>
    <td><code>sistem</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: isteğe bağlı, varsayılan değeri: "Geçerli sayfa başlığı"</li>
        <li><code>data-mode</code>: isteğe bağlı, <code>replace</code> değerine ayarlanırsa diğer tüm paylaşım seçenekleri kaldırılır.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>E-posta</td>
    <td><code>e-posta</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>: isteğe bağlı, varsayılan değeri: Geçerli sayfa başlığı</li>
        <li><code>data-param-body</code>: isteğe bağlı, varsayılan değeri: <code>rel=canonical</code> URL'si</li>
        <li><code>data-param-recipient</code>: isteğe bağlı, varsayılan değeri: '' (boş dize)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>: <strong>gerekli</strong> , varsayılan değeri: none. Bu parametre, <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">Facebook Paylaşımı iletişim kutusu</a> için gerekli olan Facebook <code>app_id</code> bilgisidir.</li>
        <li><code>data-param-href</code>: isteğe bağlı, varsayılan değeri: <code>rel=canonical</code> URL'si</li>
        <li><code>data-param-quote</code>: isteğe bağlı. Bir alıntıyı veya metni paylaşmak için kullanılabilir.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: isteğe bağlı, varsayılan değeri: <code>rel=canonical</code> URL'si</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>: isteğe bağlı (ancak ayarlanması önemle tavsiye edilir), varsayılan değeri: none. Pinterest'te paylaşılacak medyanın URL'si. Ayarlanmazsa son kullanıcının Pinterest aracılığıyla bir medya yüklemesi istenir.</li>
        <li><code>data-param-url</code>: isteğe bağlı, varsayılan değeri: <code>rel=canonical</code> URL'si</li>
        <li><code>data-param-description</code>: isteğe bağlı, varsayılan değeri: Geçerli sayfa başlığı</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>G+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: isteğe bağlı, varsayılan değeri: <code>rel=canonical</code> URL'si</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: isteğe bağlı, varsayılan değeri: <code>rel=canonical</code> URL'si</li>
        <li><code>data-param-text</code>: isteğe bağlı, varsayılan değeri: Geçerli sayfa başlığı</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: isteğe bağlı, varsayılan değeri: <code>rel=canonical</code> URL'si</li>
        <li><code>data-param-text</code>: isteğe bağlı, varsayılan değeri: Geçerli sayfa başlığı</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Whatsapp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: isteğe bağlı, varsayılan değeri: "Geçerli sayfa başlığı - geçerli sayfa URL'si"</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: isteğe bağlı, varsayılan değeri: <code>rel=canonical</code> URL'si</li>
        <li><code>data-param-text</code>: isteğe bağlı, varsayılan değeri: Geçerli sayfa başlığı</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SMS</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>: isteğe bağlı, varsayılan değeri: <code>rel=title - rel=canonical</code> URL'si</li></ul>
      </td>
    </tr>
  </table>

## Yapılandırılmamış sağlayıcılar <a name="non-configured-providers"></a>

Önceden yapılandırılmış sağlayıcılara ek olarak, `amp-social-share` bileşeninde ek özellikler belirterek yapılandırılmamış sağlayıcıları da kullanabilirsiniz.

**Örnek: Yapılandırılmamış bir sağlayıcı için paylaşım düğmesi oluşturma**

Aşağıdaki örnekte, `data-share-endpoint` özelliğinin Facebook Messenger özel protokolü için doğru uç noktaya ayarlanmasıyla Facebook Messenger üzerinden bir paylaşım düğmesi oluşturulmaktadır.

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

Bu sağlayıcılar önceden yapılandırılmadığından, sağlayıcı için uygun düğme resmini ve stillerini oluşturmanız gerekir.

## Stiller <a name="styles"></a>

### Varsayılan Stiller <a name="default-styles"></a>

Varsayılan olarak, `amp-social-share` bileşeni bazı popüler önceden yapılandırılmış sağlayıcıları içerir. Bu sağlayıcıların düğmeleri, sağlayıcının resmi rengi ve logosuyla şekillendirilmiştir. Varsayılan genişlik 60 piksel ve varsayılan yükseklik 44 pikseldir.

[tip type="success"]
AMP sayfalarınızda kullanabileceğiniz duyarlı, önceden şekillendirilmiş paylaşım bağlantıları için [AMP Start](https://ampstart.com/components#links-and-sharing) sayfasını ziyaret edin.
[/tip]

### Özel Stiller <a name="custom-styles"></a>

Bazen kendi stilinizi sağlamak istersiniz. Bunun için sağlanan stilleri aşağıda gösterilen şekilde geçersiz kılabilirsiniz:
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## Değişken Değişikliği <a name="variable-substitution"></a>

`<amp-social-share>` öğesinde [genel AMP değişkeni değişikliklerini](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) kullanabilirsiniz. Aşağıdaki örnekte, `TITLE` değişkeni, doküman başlığı ve `CANONICAL_URL` değişkeni, dokümanın standart URL'si ile değiştirilmiştir.

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## Doğrulama <a name="validation"></a>

AMP doğrulayıcı spesifikasyonundaki [amp-social-share kurallarına](https://github.com/ampproject/amphtml/blob/main/extensions/amp-social-share/validator-amp-social-share.protoascii) bakın.
