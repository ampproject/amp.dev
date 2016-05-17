---
layout: page
title: AMP Performansı Nasıl Arttırılır
order: 2
locale: tr
---

AMP sayfalarının bu kadar hızlı olmasının ve anında yüklenmesinin nedeni aşağıdaki optimizasyonların bir araya gelmesidir.

{% include toc.html %}

Okumak yerine dinlemeyi tercih ediyorsanız, AMP baş mühendisi Malte Ubl tarafından hazırlanan aşağıdaki video aşağıdaki paragraflara benzer genel bir özet sunmaktadır.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## Yalnızca eşzamansız komut dosyalarına izin verir

JavaScript güçlüdür,
sayfanın tüm özelliklerini değiştirebilir,
ancak aynı zamanda DOM yapısını da engelleyebilir ve sayfa işlemeyi geciktirebilir
(ayrıca bkz. [JavaScript etkileşimi ekleme](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
JavaScript›in sayfa işlemesini geciktirmesini engellemek için,
AMP yalnızca eşzamansız JavaScript›e izin verir. 

AMP sayfaları yazar tarafından yazılan JavaScript içeremez.
JavaScript kullanmak yerine,
etkileşimli sayfa özellikleri özel AMP ögelerinde kullanılır.
Özel AMP ögeleri JavaScript içerebilir,
ancak performans bozulmalarına neden olmayacak şekilde dikkatlice tasarlanmıştır.

Bilgi iletim birimlerinde üçüncü şahıs JS›e izin verilse de,
işlemeyi engelleyemez.
Örneğin, üçüncü şahıs JS 
[çok kötü performanslı`document.write` API](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/) kullanıyorsa,
ana sayfa işlemeyi engellemez.

## Tüm kaynakları statik olarak boyutlandırın

Görüntü, reklam veya bilgi iletim birimleri gibi harici kaynakların HTML›de boyutları belirtilmelidir
bu sayede kaynaklar indirilmeden önce AMP her ögenin boyutunu ve pozisyonunu belirleyebilir.
AMP kaynakların indirilmesini beklemeden sayfa düzenini yükler.

AMP belge düzenini kaynak düzeninden ayırır.
Tüm belgenin düzeni için yalnızca bir HTTP isteği gereklidir
([+fonts](#font-triggering-must-be-efficient)).
AMP, tarayıcıdaki pahalı yeniden biçim hesaplamaları ve düzenlerden kaçınmak amacıyla optimize edildiği için,
kaynaklar yüklendiğinde yeniden düzenleme olmayacaktır.

## Uzantı mekanizmalarının işlemeyi engellemesine izin vermeyin

AMP, uzantı mekanizmalarının işlemeyi engellemesine izin vermez
AMP, 
[ışık kutuları](/docs/reference/extended/amp-lightbox.html),
[instagram yerleştirmeleri](/docs/reference/extended/amp-instagram.html),
[tweet›ler](/docs/reference/extended/amp-twitter.html), vb. şeylerin uzantılarını destekler.
Bunlar ek HTTP istekleri gerektirdiği için,
bu istekler sayfa düzenini ve işlemeyi engellemez. 

Özel bir komut dosyası kullanan tüm sayfalar AMP sistemine
zamanla özel bir etiketi olacağını belirtmelidir.
Örneğin, [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
komut dosyası sisteme bir `amp-iframe` etiketi olacağını belirtir.
AMP, daha ne içereceğini bilmeden bilgi iletim birimi kutucuğunu oluşturur: 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## Tüm üçüncü şahıs JavaScript›i kritik yolun dışında tutun

Üçüncü şahıs JS eşzamanlı JS yüklemesi kullanmaktan hoşlanır.
Bunlar aynı zamanda daha senkronize komut dosyaları `document.write` yazmaktan hoşlanır.
Örneğin, beş reklamınız varsa ve her biri
1 saniye gecikme bağlantısıyla üç senkronize yükleme yapıyorsa,
yalnızca JS yüklemesi için 18 saniye yükleme süresindesiniz. 

AMP sayfaları üçüncü şahıs JavaScript›e yalnızca korumalı alana alınmış bilgi iletim birimlerinde izin verir.
Bilgi iletim birimlerini yasaklayarak, ana sayfanın uygulanmasını engelleyemezler.
Birden çok biçim yeniden hesaplaması tetikleseler bile,
küçük bilgi iletim birimlerinde çok az DOM vardır. 

Biçim yeniden hesaplamaları ve düzenler DOM boyutuna özgüdür,
bu nedenle bilgi iletim birimlerinin yeniden hesaplaması
sayfanın yeniden hesaplama biçimleri ve düzenine kıyasla çok hızlıdır.

## Tüm CSS satır içi ve boyut kısıtlamalı olmalıdır

CSS işlemenin tamamını engeller, sayfa yüklemesini engeller ve şişme eğilimi gösterir.
AMP HTML sayfalarında, yalnızca satır içi biçimlere izin verilir.
Bu, web sayfalarına kıyasla
1 ya da daha fazla HTTP isteğini kritik işleme yolundan kaldırır.

Aynı zamanda, satır içi biçim sayfasının maksimum 50 kilobayt boyutu vardır.
Bu boyut çok karmaşık sayfalar için yeterli büyüklükte olsa da,
sayfa yazarının yine de iyi CSS temizliği uygulamasını gerektirir.

## Yazı tipi tetiklemesi etkili olmalıdır

Web yazı tipleri çok büyüktür, bu nedenle 
[web yazı tipi optimizasyonu](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
performans için son derece önemlidir.
Birkaç senkronizasyon komut dosyası ve birkaç harici biçim sayfasına sahip normal bir sayfada,
tarayıcı bütün bunlar olana kadar bu kocaman yazı tiplerinin indirilmesi başlayana kadar bekler.

AMP sistemi, yazı tipleri indirilmeye başlayana kadar sıfır HTTP isteği belirtir.
Bu yalnızca AMP›deki tüm JS›lerde eşzamansız özelliği olduğu
ve yalnızca satır içi biçim sayfalarına izin verildiği için mümkündür;
tarayıcının yazı tipi indirmesini engelleyen bir HTTP isteği bulunmaz.

## Biçim yeniden hesaplamalarını en aza indirin

Her ölçüm yaptığınızda, biçim yeniden hesaplamaları tetiklenir, bu da tarayıcının sayfanın
tamamını düzenlemesi gerektiği için pahalı bir işlemdir.
AMP sayfalarında, tüm DOM okumaları tüm yazma işlemlerinden önce gerçekleşir.
Bu çerçeve başına maks. bir biçim yeniden hesaplama olmasını sağlamaktadır.


[İşleme performansı](https://developers.google.com/web/fundamentals/performance/rendering/) bölümünde biçim ve düzen yeniden hesaplamalarının etkisi hakkında daha fazla öğrenin.

## Yalnızca GPU ile hızlandırılmış animasyonları çalıştırın

Hızlı optimizasyon sağlamanın tek yolu GPU üzerinde çalıştırmaktır.
GPU, katmanları ve bu katmanlar üzerinde nasıl bir şeyler gerçekleştirileceğini bilir,
bunları hareket ettirebilir, karartabilir, ancak sayfa düzenini güncelleyemez;
bu görevi tarayıcıya aktarır ve bu iyi değildir.

Animasyonla ilgili CSS kuralları, animasyonların GPU ile hızlandırılmasını sağlar.
Sayfa düzeninin gerekli olmaması için, AMP özel olarak yalnızca dönüşüm ve opaklık
ile canlandırma ve geçişe izin verir.

[Canlandırma değişiklikleri için dönüşüm ve opaklık kullanımı](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count) hakkında daha fazlasını öğrenin.

## Kaynak yüklemeyi önceliklendirin

AMP tüm kaynak indirmeleri kontrol eder: kaynak yüklemeyi önceliklendirir,
yalnızca gerekli olanları yükler ve tembel yüklü kaynakları ön belleğe alır. 

AMP kaynakları indirdiğinde, mevcut en önemli kaynaklar en önce indirilecek
şekilde indirilenleri optimize eder.
Görüntü ve reklamlar yalnızca kullanıcı tarafından görülme ihtimali olduğunda,
klasör üzerinden, ya da kullanıcının hızlıca kaydırma ihtimali olduğunda indirilir.  

AMP aynı zamanda tembel yüklü kaynakları ön belleğe alır.
Kaynaklar mümkün olduğunca geç yüklenir, ancak mümkün olduğunca erken ön belleğe alınır.
Bu şekilde, hızlı yükleme gerçekleştirilir ancak CPU yalnızca
kaynaklar gerçekten kullanıcılara gösterildiğinde kullanılır.

## Sayfaları anında yükleme

Yeni [preconnect API](http://www.w3.org/TR/resource-hints/#dfn-preconnect)
HTTP isteklerinin oluşturulurken mümkün olduğunca hızlı olmasını sağlamak için yoğun olarak kullanılır.
Bununla birlikte,
kullanıcı açık bir şekilde sayfaya gezinmek istediğini belirtmeden önce işlenebilir;
sayfa kullanıcı tarafından gerçekten seçilene kadar halihazırda kullanılabilir olabilir
ve anında yüklenir.

Ön belleğe alma tüm web içeriğine uygulanabilir,
aynı zamanda çok fazla bant genişliği ve CPU da kullanabilir. AMP bu faktörlerin her ikisini de azaltacak şekilde optimize edilmiştir. Ön belleğe alma kaynakları yalnızca klasör üzerinden indirir
ve CPU bakımından pahalı olabilecek şeyleri işlemez.

AMP belgeleri hızlı yükleme için ön belleğe alındığında,
yalnızca klasör üzerindeki kaynaklar gerçekten indirilir.
AMP belgeleri hızlı yükleme için ön belleğe alındığında,
çok fazla CPU kullanma ihtimali olan kaynaklar (üçüncü şahıs bilgi iletim birimleri gibi) indirilmez. 


[AMP HTML›nin ön yükleme tarayıcısından neden faydalanmadığı](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e) hakkında daha fazla öğrenin.

## AMP›yi hızlandırmamıza yardım edin
AMP açık kaynaklı bir çalışmadır.
AMP›yi daha da hızlı hale getirmek için sizin yardımınıza ihtiyacımız var.
[Nasıl katkı sağlayacağınızı](/docs/support/contribute.html) öğrenin.
