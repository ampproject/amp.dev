---
"$title": E-postaları işlemek için AMP Görüntüleyiciyi kullanma
"$order": '5'
author: alabiaga
formats:
- email
---

E-posta için AMP'yi desteklemek isteyen e-posta istemcileri, e-göndericilerinin AMP e-postalarını barındırmak için [AMP Görüntüleyiciyi](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) kullanmalıdır. [AMP Görüntüleyici kütüphanesiyle oluşturulmuş](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration) bir görüntüleyici, bir AMP belgesini sarmalar ve postMessage aracılığıyla AMP belgesiyle çift yönlü iletişime olanak tanıyan [özellikleri](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/CAPABILITIES.md) etkinleştirir. Bu özellikler arasında e-postanın görünürlüğünün kontrolünün verilmesi, kullanıcı ölçümlerinin aktarılması ve e-postadan yapılan XHR isteklerinin güvenliğinin sağlanması için araçlar sağlanması vardır.

## Görüntüleyici XHR müdahalesi

AMP Görüntüleyici kütüphanesinin `xhrInterceptor` özelliği, izleyicinin giden XHR isteklerine müdahale etmesine olanak tanır. AMP Görüntüleyici, kullanıcılarının korunmasını ve gizliliğini sağlamak adına bir isteğin geçerliliğini ve amacını incelemek için iç gözlem yapabilir.

#### XHR istekleri

[`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) ve [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) gibi AMP bileşenleri, verileri göndermek veya almak için uç noktalara çağrı yapılmasını gerektirir. Bu çağrılar XHR istekleri olarak sınıflandırılır.

#### Görüntüleyici ve AMP belge iletişimi

Görüntüleyici ile AMP belgesi arasındaki iletişim için kullanılan protokol, [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) aracılığıyla gerçekleştirilir. Aşağıda, bir görüntüleyicinin bir AMP belgesinden gönderilen xhr postMessage'ı işlediği ve özel bir yanıt döndürdüğü XHR müdahalesi kullanım örneğinde, postMessage'ı iş başında gösteren küçük bir örnek verilmiştir.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
   const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {type: 'application/json'});
   const response = new Reponse(blob, {status: 200});
   return response;
};
```

### XHR müdahalesini etkinleştirme

Görüntüleyiciyi başlatma sırasında xhrInterceptor özelliğine dahil ederek xhr müdahalesini etkinleştirin. Lütfen bunun nasıl yapıldığına dair görüntüleyici örneğine ve xhr müdahalesi örneğine bakın. AMP belgesi daha sonra XHR müdahalesine izin vermeyi seçmelidir. Belgeler, `allow-xhr-interception` özniteliğini `<html amp4email>` etiketine ekleyerek etkinleştirir. E-posta istemcisi, bu öznitelik kasıtlı olarak geçersiz bir öznitelik olduğundan ve AMP belgesi doğrulaması sırasında bu şekilde işaretleneceğinden, işlemeden önce AMP belgesinde bu özniteliği ayarlamalıdır.

```html
<!doctype html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Görüntüleyici sunucu tarafı şablonu oluşturma

`viewerRenderTemplate` özelliği görüntüleyicinin [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) ve [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) şablon işlemesini yönetmeye izin verir. Bu özellik etkinleştirildiğinde, AMP çalışma zamanı, orijinal XHR çağrısını, şablon verilerini ve bileşen içeriklerini görüntüleyicide işlemek için gereken diğer ayrıntıları içeren bir isteği ara sunucuya alır. Bu, izleyicinin uç nokta veri içeriğine iç gözlem yapmasına ve verileri doğrulamak ve sterilize etmek için şablonların [mustache](https://mustache.github.io/) oluşturmasını yönetmesine olanak tanır. Bu özellik xhrInterceptor ile birlikte amp-form ve amp-list bileşeninde etkinleştirilirse, görüntüleyiciye yönelik istekleri de ara sunucuya alan ` viewerRenderTemplate` özelliğinin xhrInterceptor'ınkinden daha üstün olacağını unutmayın.

[viewer.html](https://github.com/ampproject/amphtml/blob/master/examples/viewer.html) örneği, AMP belgesinden gönderilen `viewerRenderTemplate` mesajının nasıl işlenebileceğini gösterir. Bu örnekte, Viewer.prototype.processRequest_, `viewerRenderTemplate ` mesajını yakalar ve istekte bulunan amp bileşen türünü temel alarak, aşağıdaki JSON biçiminde oluşturulacak html'yi geri gönderir.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) => Promise.resolve({
  "html":
    "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>"
      + "<div class='product' role='listitem'>Apple</div>"
      + "</div>",
  "body" : "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
});
```

Bu, [mustache](https://mustache.github.io/) kütüphane bağımlılığının veya içerik temizliğinin olmadığı küçük bir örnektir.

Aşağıdaki şema, `viewerRenderTemplate` özelliğine sahip bir e-posta istemcisi görüntüleyicisindeki bir AMP belgesinin [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) şablonunun oluşturulmasını nasıl işleyebileceğine dair daha gerçekçi bir örneği göstermektedir.

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

AMP çalışma zamanı, [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) bileşen veri getirme isteğini görüntüleyiciye aktarır ve o da bu isteği bir e-posta istemci sunucusuna iletir. Sunucu, bu URL'yi ve URL getirme sonuçlarını çeşitli hizmetler aracılığıyla besler, muhtemelen URL geçerliliğini, bu URL'den döndürülen verilerin içeriğini inceler ve [mustache](https://mustache.github.io/) şablonlarını bu verilerle işler. Daha sonra işlenmiş şablonu döndürür ve aşağıdaki JSON yanıt biçiminde görüntüleyiciye geri gönderir.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
}
```

JSON yükündeki html değeri, işleme için AMP belgesine enjekte edilen değer olacaktır.

Aşağıdaki tablo, özellikleri ve etkilenen bileşenleri özetlemektedir:

<table>
  <thead>
    <tr>
      <th width="30%">Görüntüleyici özelliği</th>
      <th>Etkilenen bileşenler</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>
