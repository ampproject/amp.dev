---
'$title': E-posta için AMP en iyi uygulamaları
$order: 1
'$category': Develop
formats:
  - email
---

AMP, e-postalarda heyecan verici, yeni, sürükleyici ve etkileşimli içerik türlerine izin verir! E-postaları tasarlarken, düzgün çalışmalarını, platformlar arasında güvenilir olmalarını ve kullanıcılarınızın beklediği gibi çalışmalarını sağlamak için aşağıdaki en iyi uygulamaları aklınızda bulundurun.

#Hız

Dinamik olarak içerik getirmek için [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) öğesini kullandığınızda, bileşenlerin yapısını bir arada tutmak için bir yer tutucu ekleyin. Yer tutucu, istenen verileri geri gönderdikten sonra, yerleşimde olabildiğince belgeye benzemelidir. Böyle olması, mesaj boyutunun yerleşimi önemli ölçüde değiştirmemesini veya bozmamasını sağlar.

#Kullanılabilirlik ve erişilebilirlik

- • [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email) kullanırken `controls` özniteliğinin ayarlandığından emin olun. Bunu yapmak, akıllı telefon gibi dokunmatik ekranlı cihazları kullanan kullanıcıların döngüde gezinmelerine izin verir.
- [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email) kullanırken, bazı giriş türlerinin iOS'ta desteklenmediğini unutmayın. Daha fazla bilgi için Safari HTML Referansında [Desteklenen Giriş Değerleri](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) sayfasına başvurun.
- Bazı [`autocomplete` öznitelik değerleri](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete), farklı uygulama ve tarayıcılarda desteklenmez. Otomatik tamamlamanın kullanıcılarınız tarafından kullanılamadığını varsayın ve formları kısa tutun.

#Stil Oluşturma

- E-postanızın sadece [E-posta için AMP Destekli CSS](../learn/email-spec/amp-email-css.md?format=email) kullandığından emin olun
- CSS veya HTML'inizin herhangi bir yerinde görünüm penceresi birimleri (`vw`, `vh`, `vmin` ve `vmax`) kullanmaktan kaçının. AMP e-postaları iframe içinde işlendiğinden, e-postanın görünüm penceresi tarayıcının görünüm penceresiyle eşleşmez.
- Farklı tarayıcıların farklı varsayılan CSS stilleri vardır. Gerekirse stilleri normalleştiren bir CSS kütüphanesi kullanın. Varsayılan stiller, stil normalizasyonu ve kullanılabilir kütüphanelerin bir listesi hakkında daha fazla bilgi için, [Yeniden Başlatma, Sıfırlama ve Akıl Yürütme](https://css-tricks.com/reboot-resets-reasoning/) sayfasına bakın.
- CSS'te sınırları taşırmamaya dikkat edin: [AMP yerleşim sınırlaması](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241) yüzünden işlenmeyebilirler.

##Mobil

Cihazı tanımlamak için [CSS medya sorgularını](style_and_layout/control_layout.md?format=email) kullanarak mesajınızın tüm ekran boyutlarında iyi göründüğünden emin olun. Yerleşimin doğru olduğundan ve bileşenlerin beklendiği gibi çalıştığından emin olmak için mesajlar mobil cihazlarda test edilmelidir.

#Diğer Tavsiyeler

E-posta için AMP kullanırken, aşağıdaki ipuçlarını ve püf noktalarını unutmayın:

- E-posta için AMP oyun alanı, XHR'lere ara sunuculuk yapmaz ancak bazı e-posta sağlayıcıları bunu yapar.
- Farklı e-posta istemcileri boyunca maksimum uyumluluğun sağlandığından emin olmak için AMP MIME bölümü, HTML MIME bölümünden önce görünmelidir.
- [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) için `src`, [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email) için [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr), [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email) için `src` veya `<a>` etiketi için href özniteliği, [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email) tarafından değişime uğratılamaz.
- Mesajlarınız, kullanıcının mesajın HTML sürümüne yönlendirilmesi durumunda veya kullanıcının mesajı yönlendirmesi durumunda statik bir HTML sürümü içermelidir
