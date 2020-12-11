---
"$title": "Analytics'i Yapılandırma"
"$order": '5'
"$hidden": 'true'
description: "Analitik sağlayıcınız olarak Google Analytics'i kullanıyorsanız, AMP için temel Google Analytics'i nasıl kuracağınızı ve İstemci Kimliği kullanarak AMP ve AMP olmayan içeriği nasıl bağlayacağınızı öğrenin..."
formats:
- websites
- stories
---

[tip] **İPUCU -** Analitik sağlayıcınız olarak Google Analytics'i kullanıyorsanız, [AMP için temel Google Analytics'i](https://developers.google.com/analytics/devguides/collection/amp-analytics/#basic_setup_to_measure_page_views) [nasıl kuracağınızı ve İstemci Kimliği kullanarak AMP ve AMP olmayan içeriği nasıl bağlayacağınızı öğrenin](https://support.google.com/analytics/answer/7486764). [/tip]

## Başlamadan karar verin

Tüm analitik çözümleri, hangi verilere ihtiyacınız olduğunu ve bu verileri nasıl analiz etmeyi düşündüğünüzü bildiğiniz varsayımı üzerine kurulmuştur. Başlamadan önce şunlara karar verin:

- Kullanıcı katılımını analiz etmek için üçüncü şahıs analitik araçlarını mı, yoksa kendi kurum içi çözümünüzü mü kullanacaksınız?
- Kullanıcı katılımını anlamak için hangi kullanıcı davranışlarını ölçeceksiniz?

### Veriler sağlayıcıya mı size mi gönderilsin?

Kullanıcı katılımını ölçmek için kendi kurum içi çözümünüz varsa, AMP analitiğini bu çözüme entegre etmek için ihtiyacınız olan tek şey bir URL'dir. Burası, verilerinizi göndereceğiniz yerdir. Ayrıca birden fazla URL'ye veri gönderebilirsiniz. Örneğin, sayfa görüntüleme verilerini bir URL'ye ve sosyal etkileşim verilerini başka bir URL'ye gönderebilirsiniz.

AMP analitiği, bir kez ölçmek ve birçok kişiye rapor vermek için özel olarak tasarlanmıştır. Halihazırda bir veya daha fazla analitik satıcısıyla çalışıyorsanız, çözümlerini AMP ile entegre edip etmediklerini görmek için [Analytics Sağlayıcılarının](analytics-vendors.md) listesine bakın. Etmişlerse, yapılandırma ayrıntılarını gözden geçirin ve talimatları izleyin.

Analiz sağlayıcısı, AMP ile entegre değilse, sağlayıcıya ulaşarak destek isteyin. Ayrıca, <a>AMP projesinde bir konu oluşturarak</a> sağlayıcının eklenmesini talep etmenizi de öneririz. Ayrıca, <a>Analiz araçlarınızı AMP HTML ile entegre etme</a> konusuna da bakın.

### Hangi verilere ihtiyacınız var?

Etkileşimi ölçmek için kullanıcılarınızla ilgili hangi verileri toplayacaksınız? Yapılandırmadan önce bu verileri tanımlamalısınız.

Dikkate alınması gereken önemli veri noktaları:

- Yalnızca sayfa görünümlerini mi, yoksa ek kullanıcı katılım desenlerini mi izleyeceksiniz (ayrıca bkz. [amp-pixel ya da amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics))?
- Kullanıcılarınız, içeriğiniz, cihazınız veya tarayıcınız hakkında ne tür veriler toplayacaksınız (ayrıca bkz. [Değişken değiştirme](analytics_basics.md#variable-substitution))?
- Kullanıcılarınızı nasıl tanımlayacaksınız (ayrıca bkz. [Kullanıcı tanımlama](analytics_basics.md#user-identification))?

Daha fazlasını öğrenin: [Analytics: Temel Bilgiler](analytics_basics.md) ile analitikler hakkında daha fazlasını öğrenin.
