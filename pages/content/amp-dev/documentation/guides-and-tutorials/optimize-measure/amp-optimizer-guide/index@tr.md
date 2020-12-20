---
"$title": AMP Optimizer kullanma
"$order": '2'
"$hidden": 'true'
description: "AMP Optimizer'lar, AMP Önbellek optimizasyonlarını sitenize taşıyan araçlardır. AMP Optimizer kullanmak, harika bir sayfa deneyimi oluşturmanın ve Hayati Ana Web değerleri uyumluluğunu sağlamanın anahtarıdır. Bu kılavuz, AMP sayfalarınızı optimize etmek için bir AMP Optimizer'ı en iyi şekilde nasıl kullanacağınızı açıklıyor."
formats:
- websites
- stories
author: sebastianbenz
---

AMP Optimizer'lar, AMP Önbellek optimizasyonlarını sitenize taşıyan araçlardır. AMP Optimizer kullanmak, harika bir [sayfa deneyimi](https://developers.google.com/search/docs/guides/page-experience) oluşturmanın ve [Hayati Ana Web değerleri](https://web.dev/vitals/) uyumluluğunu sağlamanın anahtarıdır. Bir AMP Optimizer'larının nasıl çalıştığı hakkında daha fazla bilgi edinmek istiyorsanız [ayrıntılı AMP Optimizasyon Kılavuzumuza](explainer.md) göz atın.

## AMP halihazırda hızlı değil mi?

Şunu düşünüyor olabilirsiniz: Durun bir dakika - AMP'nin ilk andan itibaren hızlı olması gerekmiyor mu? Haklısınız: AMP çalışma zamanı hız için optimize edilmiştir ve tüm geçerli AMP sayfaları hızlı yüklenir. Ancak, tarayıcının AMP sayfalarını daha da hızlı yüklemesine yardımcı olmak için sunucunuzda uygulayabileceğiniz ek performans optimizasyonları vardır.

Başlangıçta, AMP önbellekleri AMP sayfalarının çoğuna hizmet ediyordu. Bu önbellekler, güçlü bir kullanıcı deneyimi sağlamak için sayfalarda ek optimizasyonlar gerçekleştiriyordu. Ancak zamanla, daha fazla yüzey, AMP sayfalarına bağlanmaya başladı ve geliştiriciler AMP ile web sitelerinin tamamını oluşturmaya başladı. Bu nedenle AMP ekibi, herkesin AMP Önbelleği gibi bir performansa sahip AMP sayfalarını kendi kaynaklarında sunmasına izin vermek için AMP Optimizer'lar üzerinde çalışmaya başladı.

## AMP Optimizer entegre etme

AMP optimizer üç şekilde kullanılabilir:

1. Kurulu bir optimize edici entegrasyonuna sahip bir site oluşturucu veya CMS kullanın.
2. Derleme sisteminize veya sunucunuza AMP Optimizer'ı entegre edin.
3. AMP Optimizer'ı barındırma ortamınıza entegre edin.

### CMS ve Site Oluşturucular

Optimize edilmiş AMP yayını yapmanın en iyi yolu, kurulu bir AMP Optimizer desteğine sahip bir site oluşturucu veya CMS kullanmaktır. Bu durumda, AMP sayfalarınız otomatik olarak optimize edilecektir. Şu anda, aşağıdaki site oluşturucular ve CMS'ler AMP Optimizer'ı entegre etmektedir:

- [AMP WordPress Eklentisi](https://wordpress.org/plugins/amp/) aracılığıyla [WordPress](https://wordpress.org/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/) yoluyla [Eleventy](https://www.11ty.dev/)
- [Sizinkini eklemek ister misiniz?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Özel Derleme veya Sunucu Entegrasyonları

Kendiniz de bir AMP Optimizer'ı entegre edebilirsiniz. Birden fazla açık kaynaklı AMP Optimizer uygulaması mevcuttur:

- [AMP Optimizer (Node.js)](node-amp-optimizer.md): Optimize edilmiş AMP oluşturmak için Node.js temelli bir kütüphane. Burada amp.dev içinde başlangıç kılavuzumuza göz atın. Uygulamanın devamlılığını, AMP ekibi sağlamaktadır.
- [AMP Optimizer (PHP)](https://github.com/ampproject/amp-wp/tree/develop/lib/optimizer): Optimize edilmiş AMP oluşturmak için PHP temelli bir kütüphane. Uygulamanın devamlılığını, AMP ekibi sağlamaktadır.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): Node AMP Optimizer için bir Python portu.

Sunucunuz tarafından dinamik olarak oluşturulan sayfalar ve statik siteler için farklı entegrasyonlar vardır:

1. **Derleme süresi** : Statik siteler için, derlemenin bir parçası olarak AMP sayfalarını optimize etmek en iyisidir. AMP sayfalarını optimize etmek sunum performansını etkilemediği için bu yaklaşım idealdir. [AMP Optimizer + Gulp entegrasyonu için bu örneğe göz atın](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp) .
2. **Oluşturma süresi** : Web siteleri daha dinamik bir yapıya sahipse veya dönüşümleri statik olarak uygulayamıyorsa optimizasyon, AMP belgeleri sunucuda oluşturulduktan sonra gerçekleştirilebilir. Bu durumda, hızlı sunum süreleri sağlamak için, dönüştürülmüş sayfaları sonraki istekler için önbelleğe almak en iyisidir. Önbelleğe alma, CDN düzeyinde, sitenin dahili altyapısında (örneğin: Memcached) veya hatta sayfa grubu belleğe sığacak kadar küçükse sunucunun kendisinde gerçekleşebilir. Bu yaklaşım hakkında daha fazla bilgi edinmek için [AMP Optimizer'ı Express.JS'ye entegre eden bu demoya](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express) göz atın.

### Barındırma Sağlayıcısı Entegrasyonları

Bazı barındırma sağlayıcıları, bir web sayfasını dağıtırken veya sunarken özel mantık çalıştırmaya izin verir. Bu, AMP Optimizer'ı entegre etmek için harika bir seçenek olabilir. Örnek entegrasyonlar:

- [Netlify AMP Optimizer Eklentisi](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Çalışanları](https://workers.cloudflare.com/) ([yakında gelecek](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Görüntüsü ([yakında gelecek](https://github.com/ampproject/amp-toolbox/issues/879))
- [Sizinkini eklemek ister misiniz?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
