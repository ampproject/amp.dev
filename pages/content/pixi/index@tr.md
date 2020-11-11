---
$title: AMP Sayfa Deneyimi Kılavuzu
staticText:
  inputBar:
    headline: AMP sayfanızı analiz edin
    fieldPlaceholder: URL girin
    button: Analiz et
  infoDialog:
    open: Daha fazlasını öğrenin
    close: Kapat
  scrollToTop: Yukarı kaydır
  shareDialog:
    headline: URL'yi kopyala yapıştır
    close: Gezinmeyi kapat
    copyToClipboard: Panoya kopyala
    success: Başarılı
  statusIntro:
    headline: Lütfen bir süre bekleyin
    headline2: Şu anda sayfanızı analiz ediyoruz
    loadingCopy: ${finishedChecks} / ${totalChecks} kontrol tamamlandı
    buttonShare: Paylaş
    buttonInvestigate: İncele
  coreWebVitals:
    headline: Temel Web Hayati Değerleri
    tabsAriaLabel: Alan ve laboratuvar verileri sekmeleri
    fieldData: Alan verileri
    labData: Laboratuvar verileri
    fieldDataExplainer: Bu veriler, 28 günlük dönem için günlük olarak güncellenir.
    labDataExplainer: Bu veriler sentetik testlerden elde edilir ve sayfa deneyimini etkilemez.
    loadingSpeed: Yükleme hızı
    interactivity: Etkileşim
    visualStability: Görsel kararlılık
    pageLoads: Sayfa yüklemeleri
    thresholdMarker: 75. yüzdebirlik
    resultLabels:
      scorePercentile: 75. yüzdebirlikte puan
      score: Puan
      opportunity: İyileştirme fırsatı
      pagesPassing: Geçen sayfalar
      action: Harekete geç
  additionalChecks:
    headline: Ek kontroller
    safeBrowsing: Güvenli Tarama
    https: HTTPS
    mobileFriendliness: Mobil Uyumluluk
    intrusiveInterstitials: Araya Giren Geçiş Reklamları
    checkManually: Manuel olarak kontrol et
  recommendations:
    headline: Harekete geçin. AMP sitenizi iyileştirin
    nextAdvice: Sonraki tavsiye
  tags:
    all: Tümü
scriptText:
  inputBar:
    fieldError: Lütfen geçerli bir adres girin
  status:
    analyzing: Analiz ediliyor
    calculating: Hesaplanıyor
    error: Analiz başarısız
    failed: Başarısız
    passed: Başarılı
    passedAddition: başarılı
    none: Yok
    nothingToDo: Gerekli eylem yok &#x1F389;
    fileAnIssue: AMP ile sorun bildir
    recommendation: öneri
    recommendations: öneriler
  buttonFixIt: Şimdi onar
  buttonMakeImprovements: İyileştirmeler yap
  detailsHeadlineImages: Dikkate alınacak resimler
  detailsHeadlineOther: Etkilenen kaynaklar
  thumbnail: Küçük resim
  categories:
    fast: İyi
    average: İyileştirilmesi Gerekiyor
    slow: Kötü
  tags:
    lcp: LCP
    fid: FID ve TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: Mobil Uyumluluk
    safeBrowsing: Güvenli Tarama
    intrusiveInterstitials: Araya Giren Geçiş Reklamları
---

AMP sayfa deneyim kılavuzu, AMP geliştiricilerine AMP sayfalarının Google Arama sayfası deneyimi sıralama sinyaline göre nasıl performans sergilediğini gösteren ve nasıl iyileştirilebilecekleri konusunda işlem yapılabilir geri bildirimler sağlayan bir araçtır. Size işlem yapılabilir içgörüler sağlayamıyorsak, lütfen mevcut bilgi istemlerini kullanarak [GitHub'da bir sorun bildirin](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue) böylece ekibimiz AMP sayfalarınızın nasıl iyileştirilebileceğini anlamanıza yardımcı olabilir. [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=tr), [Güvenli Gezinti](https://developers.google.com/safe-browsing/v4/lookup-api?hl=tr) ve [Mobil Uyumluluk Testi](https://search.google.com/test/mobile-friendly?hl=tr) gibi herkese açık API'leri kullanıyoruz.
