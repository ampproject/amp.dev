---
'$title': Analiz aracınızı AMP ile entegre etme
$order: 1
formats:
  - websites
  - stories
teaser:
  text: Genel bakış
toc: 'true'
---

## Genel bakış <a name="overview"></a>

Yayıncıların trafiğini ve ziyaretçilerini daha iyi anlamaları için bir hizmet olarak yazılım aracı kullanıyorsanız, hizmetinizi `amp-analytics` ile entegre etmek isteyebilirsiniz. Bunu yapmanız, müşterilerinizin AMP HTML sayfalarına ilişkin trafik modellerini görüntülemesini sağlayacaktır.

## Başlamadan önce <a name="before-you-begin"></a>

Analiz hizmetinizi AMP HTML çalışma zamanına eklemeden önce şunları yapmanız gerekebilir:

- Analiz hizmetiniz için bir AMP HTML belgesinde ihtiyaç duyacağınız [değişken](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md) ve [istek](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-analytics.md#requests) türlerini tanımlamak.
- Hizmetinizle ilgili olabilecek bir sayfadan analiz isteklerinin gönderilmesine neden olan tetikleyicileri belirlemek.
- Birinci ve üçüncü taraf AMP bağlamları boyuna [kullanıcıları nasıl takip edeceğinizi veya takip edip etmeyeceğinizi](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md) hesaba katmak.
- Analiz panelinizin AMP trafiğini nasıl işlediğini belirlemek.
- `amp-analytics` içindeki eksik işlevleri belirlemek ve gerekli özellikler için [istekte bulunmak](https://github.com/ampproject/amphtml/issues/new).
- AMP Analytics, değişkenlerini, önceden yapılandırılmış bir uç noktaya gönderir. Halihazırda mevcut bir uç noktanız yoksa, nasıl oluşturulacağına dair genel bir bakış için [bu örneği inceleyin](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample).
  - `iframe` dışındaki tüm aktarım türleri için değişkenler, bir HTTPS isteğinde sorgu dizesi parametreleri olarak gönderilir.
  - `iframe` aktarım türü için bir iframe oluşturulur ve değişkenler ona `window.postMessage` aracılığıyla gönderilir. Bu durumda mesajın bir URL olması gerekmez. Bu seçenek yalnızca MRC onaylı sağlayıcılar tarafından kullanılabilir.
- `amp-analytics` ile entegrasyonun herhangi bir politikayı (özellikle gizlilik politikanızı) veya sahip olabileceğiniz sözleşmeleri nasıl etkileyebileceğini düşünün.

## Yapılandırmanızı AMP HTML çalışma zamanına ekleme<a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Analiz hizmetinizin yapılandırmasını AMP HTML'nin çalışma zamanına ekleyeceğinizi belirten bir [Uygulama Amacı konusu](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features) oluşturun. Açıklamanıza **cc @ampproject/wg-analytics**'i eklediğinizden emin olun.
2. Aşağıdakileri uygulayan bir yama geliştirin:
   1. A new configuration json file <code>${vendorName}.json</code> in the vendors <a>folder</a> including any options above and beyond the default, such as:
      1. `"vars": {}` ek varsayılan değişkenler için.
      2. `"requests": {}` hizmetinizin kullanacağı istekler için.
      3. `"optout":` gerekirse. Şu anda harika bir devre dışı bırakma sistemimiz yok, bu nedenle lütfen size uygun bir sistem tasarlamamıza yardımcı olmak için bize ulaşın.
      4. `"warningMessage":` gerekirse. Konsolda sağlayıcıdan gelen uyarı bilgilerini (kullanımdan kaldırma veya geçiş gibi) görüntüler.
   2. iframe aktarımı kullanıyorsanız iframe-transport-vendors.js'de ANALYTICS_IFRAME_TRANSPORT_CONFIG'e `"*vendor-name*": "*url*"` içeren yeni bir satır da ekleyin
   3. [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html). referansında bir örnek.
   4. [extensions/amp-analytics/0.1/test/vendor-requests.json ](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json) dosyasında bir test.
   5. Analiz hizmetinizi, [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/./analytics-vendors-list.md) dosyasındaki desteklenen sağlayıcılar listesine ekleyin. Kullanım belgelerinizin türünü, açıklamasını ve bağlantısını ekleyin.
3. Örnekteki isabetlerin beklendiği gibi çalıştığından emin olmak için [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) içine koyduğunuz yeni örneği test edin. Örneğin, ihtiyaç duyulan veriler toplanıyor ve analiz panelinizde görüntüleniyor.
4. Bu yama ile Uygulama Amacı konusuna atıfta bulunarak bir Çekme İsteği gönderin.
5. Hizmetinizin kullanım belgelerini güncelleyin ve müşterilerinizi bilgilendirin.
6. [AMP bilgi havuzu dışında bir entegrasyon testi](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests) barındırmanız şiddetle tavsiye edilir.

## Etiket Yöneticileri<a name="tag-managers"></a>

Etiket yönetim hizmetlerinin AMP Analytics ile entegrasyon için iki seçeneği vardır:

- **Uç nokta yaklaşımı:** `amp-analytics` için ek bir uç nokta olarak hareket etmek ve arka uçta pazarlama yönetimi yürütmek.
- **Yapılandırma yaklaşımı:** Her yayıncıya özgü dinamik olarak oluşturulmuş bir JSON yapılandırma dosyası aracılığıyla etiket yönetimi yürütme.

Uç nokta yaklaşımı, önceki bölümde ayrıntılı olarak açıklanan standart yaklaşımla aynıdır. Yapılandırma yaklaşımı, her yayıncıya özgü ve tüm uyumlu analiz paketlerini içeren amp-analytics için benzersiz bir yapılandırma oluşturmayı içerir. Bir yayıncı, yapılandırmayı şuna benzer bir sözdizimi kullanarak ekler:

[sourcecode:html]
<amp-analytics
config="https://my-awesome-tag-manager.example.com/user-id.json"

> </amp-analytics>
> [/sourcecode]

Bu yaklaşımı benimsemek için, yayıncıların AMP Analytics ile entegrasyonuna ilişkin belgeleri inceleyin.

## Diğer Kaynaklar<a name="further-resources"></a>

- Ayrıntılı İnceleme: [Neden sadece bir iframe kullanılmıyor?](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/why-not-iframe.md)
- Ayrıntılı İnceleme: [Kimliği doğrulanmamış kullanıcı durumunu AMP ile yönetme](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md)
- [amp-analytics örneği](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics) referans belgeleri
- [amp-analytics değişkenleri](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md) referans belgeleri
