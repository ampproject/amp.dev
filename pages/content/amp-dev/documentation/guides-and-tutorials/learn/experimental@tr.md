---
$title: Deneysel Bileşenler
---

[AMP deneysel bileşenleri](https://github.com/ampproject/amphtml/tree/main/tools/experiments), henüz yaygın kullanım için hazır olmadıklarından bir deneysel durumla korunan yayınlanmış özelliklerdir.

Geliştiriciler ve kullanıcılar, tam olarak yayınlanmadan bu özelliklerin kullanımını etkinleştirebilirler.
Ancak hataları veya beklenmedik yan etkileri olabileceği için dikkatli bir şekilde kullanılmaları gerekir.

## AMP Yeni Geliştirilenler Kanalı'nı etkinleştirme

AMP Yeni Geliştirilenler Konsol Kanalı, tarayıcıda AMP JS kitaplıklarının daha yeni bir sürümünü kullanmayı etkinleştirmenin bir yoludur.

Tarayıcınızda AMP Yeni Geliştirilenler Kanalı'nı etkinleştirmek için [AMP deneyleri sayfasına](https://cdn.ampproject.org/experiments.html) gidin ve "AMP Yeni Geliştirilenler Kanalı" deneyini etkinleştirin.

## Bir deneysel bileşeni etkinleştirme

[https://cdn.ampproject.org](https://cdn.ampproject.org) adresinden sunulan içerik için [AMP deneyleri sayfasına](https://cdn.ampproject.org/experiments.html) gidin ve açık (veya kapalı) durumuna getirerek deneysel bileşenleri etkinleştirin (veya devre dışı bırakın). Etkinleştirme sonrasında tarayıcınızda, Google AMP Önbelleği üzerinden sunulan tüm AMP sayfalarında deneyi etkinleştirecek bir çerez ayarlanır.

Geliştirme modu etkin durumdayken diğer alanlardan sunulan içerik için deneyler, geliştirme araçları konsolundan şu kod kullanılarak etkinleştirilebilir:

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]

Deneysel özellik içeren AMP dosyalarının [AMP doğrulaması](validation-workflow/validate_amp.md) başarısız olur.
Üretim sürümü hazır AMP dokümanları için bu deneysel bileşenleri kaldırın.
