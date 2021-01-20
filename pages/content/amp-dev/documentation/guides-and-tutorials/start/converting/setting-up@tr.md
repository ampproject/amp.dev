---
"$title": Kurulum
"$order": '0'
description: Geliştirme ortamınızı ayarlama 1. Adım. Kodu indirin. Öğreticinin başlangıç kodunu ZIP dosyası olarak veya git aracılığıyla...
"$parent": "/documentation/guides-and-tutorials/start/converting/setting-up.md"
---

## Ön koşullar

Bu öğreticiye **başlamadan** önce aşağıdakilere ihtiyacınız olacak:

- HTML, CSS ve JavaScript hakkında temel bilgi
- JavaScript konsolunu inceleyebilen seçtiğiniz bir tarayıcı
- Seçtiğiniz bir metin editörü

## Geliştirme ortamınızı ayarlama

### 1. Adım. Kodu indirin

Öğretici için örnek kodu [ZIP dosyası](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip) olarak veya git aracılığıyla indirin:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

Arşiv dosyasını dizine çıkarın (gerekirse) ve bilgisayarınızdaki komut satırı üzerinden proje dizinine gidin:

```shell
cd accelerated-mobile-pages-foundations
```

Proje dizini, birkaç örnek kaynak dosyası ve başlangıç [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) sayfasını içerir.

### 2. Adım. Örnek sayfayı çalıştırın

Örnek sayfamızı test etmek için dosyalara bir web sunucusundan erişmemiz gerekiyor. Test amacıyla geçici bir yerel web sunucusu oluşturmanın birkaç yolu vardır. İşte bazı seçenekler, sizin için en uygun olanı seçin:

- [“Web Server for Chrome” Google Chrome uygulaması](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Yerel bir HTTP Python sunucusu](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **NOT -** Üretim ortamlarında HTTPS kullanmanız şiddetle önerilir. HTTPS, SEO dahil güvenliğin ötesinde birçok avantaja sahiptir. Bu [Google Web Yöneticisi blog gönderisinde](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html) bu konu hakkında daha fazla bilgi edinebilirsiniz. [/tip]

Yerel web sunucunuzu kurduktan sonra, tarayıcınızdaki örnek makaleye [şu URL'den](http://localhost:8000/article.html) erişin:

```text
http://localhost:8000/article.html
```
