---
'$title': "AMP'yi teknolojinize entegre etme"
$order: 0
'$hidden': 'true'
description: "Web'te reklamcılar veya yayıncılar için teknoloji sağlayan bir şirketseniz, sizi AMP'ye destek koymaya davet ediyoruz! Müşterileriniz teknolojinizden yararlanmayı sürdürürken..."
formats:
  - websites
  - ads
  - stories
  - email
---

AMP'ye katkıda bulunmak istediğiniz için teşekkür ederiz! Web'i kullanıcı öncelikli bir platforma dönüştürme sürecine katıldığınız için şükranlarımızı sunuyoruz.

Yayıncılar 750 binden fazla benzersiz alan adında barındırılan 1,4 milyardan fazla AMP belgesi yarattılar. Böyle bir büyüme, AMP'yi halihazırda entegre etmiş olan 100'den fazla üçüncü taraf teknoloji şirketinin desteğiyle mümkün olmaktadır.

Web'te reklamcılar veya yayıncılar için teknoloji sağlayan bir şirketseniz, sizi AMP destek koymaya davet ediyoruz! Müşterileriniz teknolojinizden yararlanmayı sürdürürken daha iyi bir web oluşturma vizyonumuzu başarmak konusunda çalışabilirsiniz.

Bu belge, AMP üçüncü taraf beklentilerini özetler ve katkı seviyelerini tanımlar.

# Katkıda bulunma kılavuzları

Tüm genel katkılar [CONTRIBUTING.md içindeki AMPHTML kılavuzlarına](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md) dayalıdır. Üçüncü tarafların katkılarını çeşitli derecelerde test etmelerini, devam ettirmelerini ve güncellemelerini bekliyoruz.

Tüm katkı seviyelerinin dahil edilme hakkı kazanması için şunları karşılaması gerekir:

- [İngilizce Wikipedia kayda değerlik gerekliliklerini](https://en.wikipedia.org/wiki/Wikipedia:Notability) karşılamak.
- AMP'nin yayıncılara ve kullanıcılara söz verdiğiyle aynı hizmet seviyesi türünü devam ettirmek veya geliştirmek.
- İyi kaliteye sahip olmak.
- Müşteriler için sorun giderme kanalı oluşturmak.
- AMP'nin üretim ve kanarya sürümleri karşısında iyi entegrasyonlu test kapsamı sunmak.
- Var olmayan bir amacı yerine getirmek.

3 adet üçüncü taraf katkı seviyesi vardır. Seviyeler eklenen mantığın miktarına bağlıdır:

- Bileşen mantığı: AMP bileşeninin temel özelliklerini ve işlevselliğini belirleyen kod.
- Üçüncü taraf mantığı: Üçüncü tarafa özgü kod. Bu mantık, bileşenin üçüncü taraf hizmetinden yararlanmasını sağlar.

AMP bilgi havuzuna ne kadar çok mantık eklenirse (özellikle üçüncü taraf özgün mantığı), katkı seviyesi o kadar artar. Yüksek katkı seviyesi, üçüncü tarafın daha fazla bağlılığını gerektirir.

Seviye 1 ve seviye 2 katkıları, bileşenleri üçüncü taraflar arasında paylaşır. İşletmenizinkine benzer bir amacı yerine getiren bir bileşen varsa, bileşeni yeniden kullanmayı düşünün. Bu çok daha az çaba gerektirir ve uzun süreli devam ettirilmesi daha kolaydır.

Hangi katkının kullanım durumunuzu karşıladığına karar verdikten sonra, başlamak için bir [GitHub konusu](https://github.com/ampproject/amphtml/issues/new) açın.

## Seviye 1 katkısı

Seviye 1 katkıları mevcut bileşenlerin özellik mantığından yararlanır. Üçüncü tarafa özgü mantığı, çapraz kökenli iframe'de özel JavaScript olarak yüklerler. Örneğin, birçok reklam ağı [`amp-ad`](../../../components/reference/amp-ad.md) bileşeni aracılığıyla reklamlar sağlar, ancak reklamların nasıl oluşturulduğunu kendi mantıklarıyla kontrol eder.

Üçüncü taraflar, işlevlerini uygulamak için sağlanan API'leri kullanarak mevcut uzantılara yapılandırmalar veya özellikler eklerler. Eğer böyle bir bileşen mevcut değilse, yeni bir bileşen önerebilirler.

AMP bilgi havuzunda kontrol edilen tek üçüncü tarafa özgü mantık, bir üçüncü taraf yapılandırmasıdır. Var olan bir 1. seviye katkısına yeni bir üçüncü taraf eklemek genellikle bir tasarım incelemesine ihtiyaç duymaz. Üçüncü taraflar, [Reklam ağlarını AMP'ye entegre etme](https://github.com/ampproject/amphtml/blob/main/ads/README.md) gibi bileşen entegrasyon belgelerini izleyebilir.

### Üçüncü taraftan beklentiler

- Tedarikçi özel JavaScript'ini bağımsız olarak sürdürmek ve sunmak.
- Yapılandırmaları için testler sunmak ve sorunlara yanıt vermek.
- Geliştiriciler için sorun giderme kanalı sunmak.
- Hizmetle ilişkili her türlü hata belgelemesine yanıt vermek.

### Seviye 1 örneği

[**amp-ad**](../../../components/reference/amp-ad.md)

Reklam sağlayıcıları, [<code>amp-ad</code>](https://github.com/ampproject/amphtml/tree/main/ads#overview) adına destek eklemek için [geliştirmeye genel bakış](../../../components/reference/amp-ad.md) ve <a>geliştirici talimatları</a> belgelerini okumalıdır. Şirketinizin sunduğu reklam teknolojisine bağlı olarak [bu entegrasyon talimatlarını ](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads) faydalı bulabilirsiniz.

Birçok reklam sağlayıcısı amp-ad gibi reklamla alakalı özellikler için destek eklemiştir. Burada reklam ağı [Criteo](https://github.com/ampproject/amphtml/pull/2299) tarafından gerçekleştirilen [örnek çekme isteğini](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md) görebilirsiniz.

## Seviye 2 katkısı

Seviye 2 katkıları mevcut bileşenlerin özellik mantığından yararlanır. Tüm mantık, AMP bilgi havuzundan kontrol edilir ve iframe'e özel hiçbir Javascript eklenemez. Örneğin, analiz sağlayıcıları yapılandırmalarını [`amp-analytics`](../../../components/reference/amp-analytics.md) bileşenine eklerler ama son noktayı kullanıcı tıklamaları gibi takip edilen verilere dahil ederler.

Üçüncü taraflar, işlevlerini uygulamak için mevcut bileşenlere yeni API'ler gibi yapılandırmalar veya özellikler eklerler. Eğer böyle bir bileşen mevcut değilse, yeni bir bileşen önerebilirler.

Tüm iş mantığı AMP bilgi havuzunda kontrol edilir, ancak kontrol edilen üçüncü tarafa özgü tek mantık, üçüncü taraf yapılandırmasıdır. Bileşen, üçüncü tarafça sağlanan bir yapılandırma dosyasıyla çalışıyorsa, tasarım incelemesi gerekmez. Üçüncü taraf yapılandırması yeni bir özellik veya yeni bileşen uygularsa, AMP'nin tasarım incelemesinden geçmesi gerekir.

### Üçüncü tarafların beklentileri

- Var olan bir 2. seviye katkısına yeni bir üçüncü taraf hizmeti eklemek genellikle bir tasarım incelemesine ihtiyaç duymaz. Üçüncü taraf, söz konusu bileşenin belgelerini takip edebilir.
- Seviye 2 katkısına yeni bir bileşen önermek için, diğer üçüncü taraf hizmetleri tarafından paylaşılabilen özellik mantığına sahip olmak gerekecektir.

### Seviye 2 örnekleri

[**amp-analytics**](../../../components/reference/amp-analytics.md)

AMP analizi, sizin yapılandırdığınız tetikleyicilere göre etkinlikleri sunucunuza geri göndermenizi sağlar. Başlamanızı sağlamak için bir [analiz entegrasyon kılavuzu](../../optimize-measure/configure-analytics/index.md) hazırladık.

İzleme URL'nize yalnızca dinamik parametrelere sahip bir izleme pikseli eklemeniz gerekiyorsa [`amp-pixel`](../../../components/reference/amp-pixel.md) bileşenine göz atın. Teknolojinizi AMP ile kullanmak isteyebilecek geliştiriciler için destek sayfalarınızda kullanımı belgelediğinizden emin olun.

Amp-analytics için destek eklemiş olan analiz sağlayıcıları vardır. Analiz sağlayıcısı [Parse.ly](https://github.com/ampproject/amphtml/pull/1595) tarafından gerçekleştirilen [örnek çekme isteğini](https://www.parsely.com/help/integration/google-amp/) burada görebilirsiniz.

[**amp-call-tracking**](../../../components/reference/amp-call-tracking.md)

Çağrı izleme ölçüm hizmetleri sağlıyorsanız, kullanım durumunuz [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md) ile desteklenebilir. Bu bileşen, numara yerine bir CORS isteği yürüterek çağrı izlemeyi etkinleştirmek için köprü adresindeki bir telefon numarasını dinamik olarak değiştirir.

Bu bileşenin sizin için nasıl çalışabileceği hakkında daha fazla bilgi edinmek için lütfen [referans belgelerine](../../../components/reference/amp-call-tracking.md) bakın.

## Seviye 3 katkısı

Seviye 3 katkısı, üçüncü bir tarafa özgü yeni bir bileşen sunar. Bu bileşen sadece üçüncü taraf şunları yapamadığında geçerlidir:

- Kullanım durumu için var olan bileşeni bulmak.
- Kendi kullanım durumunu karşılamak için özellik geliştirmesi istemek.
- Diğer üçüncü taraf hizmetleri için geçerli bir bileşen teklif etmek.

### Üçüncü tarafların beklentileri

- Bir tasarım incelemesi yazın ve önerin
- Testler çökmeyi yakalayabilmelidir
- Bileşen çökerse, düzeltin veya yardım isteyin.
- Kod örnekleriyle belgeleme sunun.
- Belgelemeyi devam ettirin ve güncelleyin.
- AMP geliştiricilerinin yardım isteyebilmesi için sorun giderme kanalı sunun
