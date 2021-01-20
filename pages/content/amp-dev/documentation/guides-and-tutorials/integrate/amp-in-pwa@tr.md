---
"$title": "AMP'yi PWA'nız için bir veri kaynağı olarak kullanma"
"$order": '1'
description: "AMP'ye yatırım yaptıysanız ancak henüz Aşamalı Web Uygulaması (Progressive Web App) oluşturmadıysanız, AMP Sayfalarınız Aşamalı Web Uygulaması geliştirme sürecinizi önemli ölçüde basitleştirebilir."
formats:
- websites
author: pbakaus
---

AMP'ye yatırım yaptıysanız ancak henüz Aşamalı Web Uygulaması (Progressive Web App) oluşturmadıysanız, AMP Sayfalarınız Aşamalı Web Uygulaması geliştirme sürecinizi önemli ölçüde basitleştirebilir. Bu kılavuzda Aşamalı Web Uygulamanızda AMP'yi nasıl kullanacağınızı ve mevcut AMP Sayfalarınızı veri kaynağı olarak nasıl kullanacağınızı öğreneceksiniz.

## JSON'dan AMP'ye

En yaygın senaryoda, Aşamalı Web Uygulaması Ajax üzerinden bir JSON API'sine bağlanan tek sayfalık bir uygulamadır. Bu JSON API'si, daha sonra gezinmeyi yönlendirmek için veri kümelerini ve makaleleri oluşturmak için gerçek içeriği karşınıza çıkarır.

Daha sonra ham içeriği işleyebilir ve kullanılabilir HTML'e dönüştürebilir ve istemcide oluşturabilirsiniz. Bu işlem maliyetlidir ve sürdürmesi genelde zordur. Bunun yerine, mevcut AMP Sayfalarınızı içerik kaynağı olarak yeniden kullanabilirsiniz. En iyisi de AMP bunu sadece birkaç satır kodla kolay hale getirir.

## Aşamalı Web Uygulamanıza "Gölge AMP" ekleme

İlk adım, Aşamalı Web Uygulamanıza “Gölge AMP” adını verdiğimiz özel bir AMP sürümünü eklemektir. Evet, bu doğru - AMP kütüphanesini üst düzey sayfaya yüklersiniz, ancak bu, üst düzey içeriği gerçekten kontrol etmez. Sadece sayfanızın istediğiniz bölümlerini “güçlendirir”.

Sayfanızın head bölümüne Gölge AMP'yi şu şekilde ekleyin:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### Gölge AMP'nin ne zaman kullanıma hazır olduğunu nasıl bilebilirsiniz?

Gölge AMP kütüphanesini `async` özniteliği varken yüklemenizi tavsiye ediyoruz. Ancak, bu, kütüphanenin ne zaman tam olarak yüklendiğini ve kullanıma hazır olduğunu anlamak için belirli bir yaklaşım kullanmanız gerektiği anlamına gelir.

Gözlemlenecek doğru sinyal, genel `AMP` değişkeninin mevcudiyetidir ve Gölge AMP, bu konuda yardımcı olmak için “[asenkron fonksiyon yükleme yaklaşımı](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)” kullanır. Şu kodu kullanmayı düşünün:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP is now available.
});
[/sourcecode]

Bu kod çalışır ve bu şekilde eklenen herhangi bir geri çağırma sayısı aslında AMP mevcut olduğunda tetiklenir, ama neden?

Bu kod şu anlama gelir:

1. "window.AMP yoksa, bu konumu doldurmak için boş bir dizi oluştur"
2. "daha sonra AMP hazır olduğunda yürütülmesi gereken diziye geri çağırma işlevini gönder"

Bu kod çalışır çünkü Gölge AMP kütüphanesi, gerçek yükleme sonrasında, `window.AMP` altında zaten bir geri çağırma dizisi olduğunu fark ettiğinde, tüm kuyruğu işleme alır. Daha sonra aynı fonksiyonu tekrar yürütürseniz, yine çalışacaktır çünkü Gölge AMP, `window.AMP`'nin yerine kendini ve geri çağırmayı hemen tetikleyen özel bir `gönderme` yöntemini koyar.

[tip type="tip"] **İPUCU –** – Yukarıdaki kod örneğini pratik hale getirmek için, onu bir Promise ile sarmanızı, daha sonra AMP API'si ile çalışmadan önce her zaman ilgili Promise'i kullanmanızı tavsiye ediyoruz. Örnek olarak [React demo koduna](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) göz atın. [/tip]

## Aşamalı Web Uygulamanızda gezinmeyi halletme

Bu adımı da manuel olarak uygulamanız gerekir. Sonuçta, gezinme konseptinizdeki içeriğe bağlantıları nasıl sunacağınız size kalmıştır. Birkaç liste mi? Birkaç kart mı?

Yaygın bir senaryoda, bazı üst verilerle sıralı URL'leri geri gönderen JSON dosyaları getirmeniz gerekir. Sonunda kullanıcı, bağlantılardan birine tıkladığında tetiklenen bir fonksiyon geri çağırması elde edeceksiniz; belirtilen geri çağırma, istenen AMP sayfasının URL'sini içermelidir. Bunlar varsa, son adım için hazırsınız.

## Gölge AMP API'sini bir sayfayı satır içi olarak işlemek için kullanma

Son olarak, bir kullanıcı eyleminden sonra içerik göstermek istediğinizde, ilgili AMP belgesini getirme ve Gölge AMP'nin işi üstlenmesine izin verme zamanı gelir. Öncelikle, aşağıdaki örneğe benzer şekilde sayfayı getirmek için fonksiyonu uygulayın:

[sourcecode:javascript]
function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

[tip type="important"] **ÖNEMLİ** – Yukarıdaki kod örneğini basitleştirmek için, hata işlemeyi geçiyoruz. Hataları yakalayıp uygun şekilde işlediğinizden her zaman emin olmalısınız. [/tip]

Kullanıma hazır `Document` nesnesine sahip olduğumuza göre artık AMP'nin sorumluluğu üstlenme ve işlemi yapma zamanı gelmiştir. AMP belgesi için kapsayıcı görevi gören DOM öğesine referans verin, daha sonra `AMP.attachShadowDoc()` fonksiyonu şu şekilde çağırın:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
  // Let AMP take over and render the page
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] **İPUCU –** – Belgeyi AMP'ye teslim etmeden önce, AMP sayfasını tek başına görüntülerken anlamlı olan, ancak gömülü modda olmayan sayfa öğelerini kaldırmanın tam zamanıdır: Örneğin, altbilgi ve üstbilgiler. [/tip]

Hepsi bu kadar! AMP sayfanız, genel Aşamalı Web Uygulamanızın bir alt öğesi olarak oluşturulur.

## Arkanızı temizleyin

Muhtemelen kullanıcınız Aşamalı Web Uygulamanızda AMP'den AMP'ye gezinecektir. Önceden oluşturulan AMP Sayfasını kaldırırken, AMP'ye bunu aşağıdaki gibi bildirmeyi asla unutmayın:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

Bu kod, AMP'ye ilgili belgeyi artık kullanmadığınızı bildirir ve hafıza ve CPU yükünü boşaltır.

## Çalışırken görün

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Oluşturduğumuz [React örneği](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) içinde "PWA'da AMP" örüntüsünü çalışırken görebilirsiniz. Gezinme sırasında pürüzsüz geçişler gösteriyor ve yukarıdaki adımları sarmalayan basit bir React bileşeniyle birlikte geliyor. Bir taşla iki kuş vuruyorsunuz: Aşamalı Web Uygulamasında esnek, özel JavaScript ve içeriği yönlendirecek AMP.

- Kaynak kodu buradan alın: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- Npm ile React bileşenini tek başına kullanın: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- Burada çalışırken görün: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (en iyi telefonunuzda veya mobil öykünmesinde çalışır)

Polymer çerçevesi kullanarak da PWA ve AMP'nin bir örneğini görebilirsiniz. Örnek, AMP sayfaları eklemek için [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) kullanır.

- Kodu buradan alın: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- Burada çalışırken görün: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
