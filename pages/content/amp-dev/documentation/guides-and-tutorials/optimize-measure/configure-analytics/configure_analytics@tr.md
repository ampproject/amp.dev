---
$title: Analytics›i Yapılandırın
---

## Başlamadan karar verin

Tüm analitik çözümler hangi verilere ihtiyacınız olduğunu
ve bu verileri nasıl analiz etmeyi planladığınızı bilme üzerine oluşturulmuştur. Başlamadan karar verin:

* Kullanıcı katılımını analiz etmek için üçüncü şahıs analitik araçlarını mı,
yoksa kendi kurum içi çözümünüzü mü kullanacaksınız?
* Kullanıcı katılımını anlamak için hangi kullanıcı davranışlarını ölçeceksiniz?

### Veriler satıcıya mı size mi gönderilsin?

Kullanıcı katılımını ölçmek için kendi kurum içi çözümünüz varsa,
AMP analitiklerini bu çözümle entegre etmeniz için gereken tek şey bir URL›dir.
Verileriniz buraya gönderilir.
Verileri aynı zamanda çeşitli URL›lere de gönderebilirsiniz.
Örneğin, sayfa görünümü verilerini bir URL›ye,
sosyal katılım verilerini başka bir URL›ye gönderebilirsiniz.

AMP analitikleri bir kez ölçüm yapacak ve birden fazla yere bildirecek verecek şekilde özel olarak tasarlanmıştır.
Halihazırda bir ya da daha fazla analitik satıcı ile çalışıyorsanız,
çözümlerinin AMP ile entegreli olup olmadığını görmek için
[amp-analitik spesifikasyonu]({{g.doc('/content/amp-dev/documentation/components/reference/amp-analytics.md', locale=doc.locale).url.path}})
bölümüne göz atın.
Entegreli ise, spesifikasyon bölümünden belgelerine gidip
aşağıdaki talimatları takip etmeye başlayabilirsiniz.

Analitik satıcısı AMP ile entegreli değilse,
satıcı ile iletişime geçerek destek isteyin.
Ayrıca, satıcı ekleme isteğine ilişkin [AMP projesinde bir konu oluşturmanızı](https://github.com/ampproject/amphtml/issues/new)
öneririz.
Ayrıca bkz.
[AMP HTML›deki analitik araçların entegrasyonu](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Hangi verilere ihtiyacınız var?

Katılımı ölçmek için kullanıcılarınızla ilgili hangi verileri toplayacaksınız?
Yapılandırmadan önce bu verileri tanımlamanız gerekmektedir.

Dikkate alınması gereken ana veri noktaları:

* Yalnızca sayfa görünümlerini mi, yoksa ek kullanıcı katılım desenlerini mi izleyeceksiniz
(ayrıca bkz. [amp-piksel ya da amp-analitik]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md', locale=doc.locale).url.path}}#amp-piksel-veya-amp-analitik-kullanıyor-musunuz?))?
* Kullanıcılarınız, içeriğiniz,
cihazınız veya tarayıcınız hakkında ne tür veriler toplayacaksınız (ayrıca bkz. [Değişken değiştirme]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md', locale=doc.locale).url.path}}#değişken-değiştirme))?
* Kullanıcılarınızı nasıl tanımlayacaksınız (ayrıca bkz. [Kullanıcı tanımlama]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md', locale=doc.locale).url.path}}#kullanıcı-tanımlama))?
