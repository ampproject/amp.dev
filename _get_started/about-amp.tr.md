---
layout: page
title: AMP Nedir?
order: 0
locale: tr
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP, hızlı sonuç veren statik içerik için web sayfalarını oluşturmanın bir yoludur.
AMP eylem olarak üç farklı kısımdan oluşur:

{% include toc.html %}

**AMP HTML** güvenilir performans için bazı kısıtlamalar ve 
temel HTML›in ötesinde zengin içerikler oluşturmak için bazı uzantılar içeren bir HTML›dir.
**AMP JS** kitaplığı AMP HTML sayfalarının hızlı sonuç vermesini sağlar.
**Google AMP Cache** (isteğe bağlı) AMP HTML sayfalarını getirir.

## AMP HTML

AMP HTML temel olarak özel AMP özellikleri ile uzantılı bir HTML›dir.
En basit AMP HTML dosyası aşağıdaki gibi görünmektedir:

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Bir AMP HTML sayfasındaki etiketlerin çoğu düzenli HTML etiketleri olsa da,
bazı HTML etiketleri AMP›ye özgü etiketlerle değiştirilmektedir (ayrıca bkz. 
[AMP spesifikasyonundaki HTML Etiketleri](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
AMP HTML bileşenleri olarak adlandırılan bu özel ögeler,
yaygın desenlerin başarılı bir şekilde uygulanmasını kolaylaştırmıştır.

Örneğin, [`amp-img`](/docs/reference/amp-img.html) etiketi
bu özelliği henüz desteklemeyen tarayıcılarda bile tam `srcset` desteği sağlamaktadır.
[İlk AMP HTML sayfanızı nasıl oluşturacağınızı] öğrenin(/docs/get_started/create_page.html).

## AMP JS

[AMP JS kitaplığı], sayfanızın hızlı işlenmesi için, (https://github.com/ampproject/amphtml/tree/master/src) 
tüm [AMP›nin en iyi performans uygulamalarını](/docs/get_started/technical_overview.html) uygular,
kaynak yüklemeyi yönetir ve yukarıda bahsi geçen özel etiketleri sunar
.

En büyük optimizasyonlardan bir tanesi, harici kaynaklardan gelen her şeyi eşzamansız hale getirmesidir, bu sayede sayfadaki hiçbir şeyin işlenmesi engelenemez.

Diğer performans teknikleri içerisinde tüm bilgi iletim birimlerinin korumalı alana alınması, kaynaklar yüklenmeden önce sayfadaki her öge düzeninin önceden hesaplanması ve yavaş CCS selektörlerinin devre dışı bırakılması yer almaktadır.

[Optimizasyonların] yanı sıra (/docs/get_started/technical_overview.html) kısıtlamalar hakkında da ayrıntılı bilgi için, [AMP HTML spesifikasyonunu okuyun](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Google AMP Cache

Google AMP Cache, tüm geçerli AMP belgelerinin sağlanması için
proxy tabanlı bir içerik dağıtım ağıdır.
AMP HTML sayfalarını getirir, kaşaler ve sayfa performansını otomatik olarak iyileştirir.
Google AMP Cache kullanılırken, belgeler, tüm JS dosyaları ve görüntüler 
maksimum verimlilik için 
[HTTP 2.0](https://http2.github.io/) kullanan aynı kaynaktan yüklenir.

Önbellek aynı zamanda 
sayfanın garanti şekilde çalışacağını 
ve harici kaynaklara bağlı olmayacağını doğrulayan dahili bir 
[validasyon sistemi](https://github.com/ampproject/amphtml/tree/master/validator) ile birlikte gelir.
Validasyon sistemi, sayfa işaretlerinin AMP HTML spesifikasyonunu karşıladığını doğrulayan 
bir dizi bildiri çalıştırır.

Bir diğer onaylayıcı sürümü her AMP sayfasıyla paket halinde gelir. Bu sürüm, sayfa işlendiğinde validasyon hatalarını doğrudan tarayıcı konsoluna kaydeder,
bu sayede kodunuzdaki karmaşık değişikliklerin
performansı ve kullanıcı deneyimini nasıl etkilediğini görmenizi sağlar.

[AMP HTML sayfalarınızı test etme](/docs/guides/validate.html) ile ilgili daha fazla öğrenin.
