---
'$title': AMP ve PWA arasında nasıl bir ilişki vardır?
$order: 7
description: Aşamalı Web Uygulamaları ve AMP sayfaları birlikte harika çalışır. Aslında, çoğu durumda, birbirlerini şu ya da bu şekilde tamamlarlar. Aşağıdaki adımlarla şunları öğrenin...
formats:
  - websites
components:
  - youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='Watch the intro to combining AMP and PWA.']

Aşamalı Web Uygulamaları ve AMP sayfaları birlikte harika çalışır. Aslında, çoğu durumda, birbirlerini şu ya da bu şekilde tamamlarlar. Aşağıdaki adımlarla şunları öğrenin:

1. AMP sayfalarınız için [PWA özelliklerini etkinleştirme](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md)
2. AMP'den PWA'ya kadar [ilgi çekici, süper hızlı bir kullanıcı yolculuğu](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) oluşturma
3. AMP'nin gücünü kullanarak [PWA'nızı sadeleştirme](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)

[tip type="note"]

Web Temelleri'nde [Aşamalı Web Uygulamaları](https://developers.google.com/web/progressive-web-apps/) hakkında daha fazla bilgi edinin.

[/tip]

## PWA özelliklerine sahip AMP sayfaları

AMP Sayfaları, AMP Önbelleği yerine kaynağınızdan (sitenizin alan adı) sunulduğu sürece birçok PWA özelliğini kendi başlarına kullanabilir. Bu, PWA özelliklerinin Google veya Bing gibi bir platformda bir AMP Sayfasını tüketirken devreye girmeyeceği, ancak ileriye dönük yolculukta veya kullanıcılar AMP sayfalarınıza doğrudan gittiğinde bu özelliklerin devreye gireceği anlamına gelir.

[tip type="read-on"] **OKUMAYA DEVAM EDİN - ** AMP Sayfalarınız için [PWA özelliklerini nasıl etkinleştireceğinizi](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md) öğrenin. [/tip]

## PWA'nıza giriş noktası olarak AMP

AMP'yi benzersiz kılan özelliği, **neredeyse anında yüklenmesidir**; bu, AMP'yi sitenizle ilk kullanıcı etkileşimi için mükemmel hale getiren bir özelliktir. _Aşamalı web uygulamaları_ çok **daha fazla etkileşim ve katılım sağlayan özellik sunar** , ancak sitenin Hizmet Çalışanı'nın ve dolayısıyla varlıklarının ve uygulama kabuğunun yalnızca sonraki yüklemelerde teslimatı hızlandırması nedeniyle ilk yüklemeleri engellenir.

Sitenize giriş noktasını bir AMP sayfası haline getirmek, ardından perde arkasında PWA'yı ısıtmak ve ileriye dönük yolculuk için ona geçmek iyi bir stratejidir.

[tip type="read-on"] **OKUMAYA DEVAM EDİN –** [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) yoluyla [AMP'yi PWA'ya](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md) nasıl bağlayabileceğinizi öğrenin. [/tip]

## PWA'nız için veri kaynağı olarak AMP

AMP Sayfalarının temel özelliklerinden biri eklemesinin kolay ve güvenli olmasıdır; bu nedenle, gittikçe artan sayıda platform bunları memnuniyetle dağıtma ve sunmaktadır.

Bir Aşamalı Web Uygulaması **oluşturuyorsanız, AMP Sayfalarınızı PWA'nız için veri kaynağı olarak yeniden kullanarak** aynı avantajları elde edebilir ve arka uç ve istemci karmaşıklığınızı önemli ölçüde azaltabilirsiniz.

[tip type="read-on"] **OKUMAYA DEVAM EDİN –** [PWA içinde AMP sayfalarını nasıl tüketebileceğinizi](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md) öğrenin. [/tip]
