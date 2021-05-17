---
'$title': Kullanıcı etkileşimini geliştirme
$order: 6
description: AMP ile kullanıcı etkileşimini geliştirmek için bazı hızlı ipuçları. Okuyucuların AMP ve AMP olmayan sayfalarda tutarlı markalaşma ve zengin içerikle sizi tanımlamasına yardımcı olun
formats:
  - websites
---

AMP ile kullanıcı etkileşimini geliştirmek için bazı hızlı ipuçları.

### Okuyucuların AMP ve AMP olmayan sayfalarda tutarlı markalaşma ve zengin içerikle sizi tanımlamasına yardımcı olun

- **Markanızı AMP sayfalarında yansıtın.** Sayfalarınızın tanınabilir ve meşru görünmesini sağlamak için AMP olmayan sayfalarınızda olduğu gibi aynı başlığı ve tasarım şemasını (ör. renkler, boşluklar, yazım stilleri) kullanın.

- Sayfalarınızı dönüştürürken **en ilgi çekici içeriğinizi öne çıkarın**. Resimler, videolar, yerleştirmeler, yapılandırılmış veriler, yorumlar ve sosyal medya gibi temel sayfa öğelerini ekleyin. [Üçüncü taraf içeriği nasıl dahil edeceğinizi](../../../documentation/guides-and-tutorials/develop/media_iframes_3p/third_party_components.md) öğrenin.

- **AMP sayfalarını güncel tutun.** [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) ile canlı blogları dinamik olarak güncelleyin.

### Kullanıcı etkileşimi ve saklama için optimize edin

- AMP sayfalarınızda **etkileşimli deneyimler sağlayın**. Zengin resim döngüleri oluşturmak için [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md) ve AMP'nin yerel olarak desteklemediği etkileşimli öğeleri dahil etmek için [`amp-iframe`](../../../documentation/components/reference/amp-iframe.md) gibi bileşenleri kullanın.

- **Kişiselleştirilmiş kullanıcı yolculukları oluşturun.** Bir oturum açma düğmesi sunun ve içeriğiniz bir ödeme duvarının arkasında bulunuyorsa, [`amp-access`](../../../documentation/components/reference/amp-access.md) bileşenini kullanarak kurallarınızı ve tekliflerinizi uygulayın.

- **İleriye dönük yolculukları uzatın.** Sitenizin ilgili veya önerilen makalelerine ve diğer ilgili bölümlerine bağlantı verin.

- [`amp-list`](../../../documentation/components/reference/amp-list.md) aracılığıyla öneriler de dahil olmak üzere **içeriği kişiselleştirin**.

- Kullanıcıları sitenizin geri kalanına göz atmaya teşvik etmek için <a><code data-md-type="codespan">amp-sidebar</code></a> içeren **bir menü uygulayın**.

- [`amp-social-share`](../../../documentation/components/reference/amp-social-share.md) ve kendi paylaşım düğmelerinizle **okuyucuların içeriğinizi paylaşmasına yardımcı olun**.

- [`amp-form`](../../../documentation/components/reference/amp-form.md) ile potansiyel müşteri oluşturma, haber bülteni kaydı ve yorum desteği gibi **yeni etkileşimler geliştirin**.

- **İyi bir okuyucu deneyimi sunan reklam türlerini hedefleyin.** [`amp-sticky-ad`](../../../documentation/components/reference/amp-sticky-ad.md) ve [`amp-fx-flying-carpet`](../../../documentation/components/reference/amp-fx-flying-carpet.md) gibi AMP reklam biçimlerini keşfedin. Reklamlardan para kazanma [en iyi uygulamalarını](../../../documentation/guides-and-tutorials/develop/monetization/index.md) takip edin.

- **Uygulama indirme sayısını artırın.** [`amp-app-banner`](../../../documentation/components/reference/amp-app-banner.md) ile bir banner'a uygulama yükleme bağlantısı ekleyin.

- Okuyucular için AMP Aşamalı Web Uygulaması (PWA) olmayan sitenize **hızlı bir geçiş sağlayın.** Önbelleğinizi doldurmak için [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) kullanın.

### Gelişimini şekillendirmeye yardımcı olmak için açık kaynaklı AMP projesine katılın

- [Yol haritasındaki](../../../community/roadmap.html) güncellemeler ve özellikler için **AMP yol haritasını izleyin.**

- **Dahil olun.** Kaynak kodu, dosya hataları ile katkıda bulunun veya [GitHub](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md)'da geri bildirimde bulunun. AMP hakkındaki görüşlerinizi [Stack Overflow](https://stackoverflow.com/questions/tagged/amp-html)'da paylaşın.

- AMP bileşenlerini [örneklerle](../../../documentation/examples/index.html) nasıl kullanacağınızı **öğrenin.**
