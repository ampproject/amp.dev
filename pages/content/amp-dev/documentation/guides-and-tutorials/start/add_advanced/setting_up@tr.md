---
"$title": Kurulum
"$order": '0'
description: 'Bu öğreticiye başlamadan önce aşağıdakilere ihtiyacınız olacak: - Temel HTML, CSS ve JavaScript bilgisi - AMP’nin temel kavramlarının temel bir anlayışı'
"$parent": "/content/docs/fundamentals/add_advanced.md"
---

## Ön koşullar

Bu öğreticiye **başlamadan önce** aşağıdakilere ihtiyacınız olacak:

- HTML, CSS ve JavaScript hakkında temel bilgi
- AMP’nin temel kavramlarının temel bir anlayışı (["HTML’nizi AMP’ye dönüştürme"](../../../../documentation/guides-and-tutorials/start/converting/index.md) öğreticisine bakın)
- JavaScript konsolunu inceleyebilen seçtiğiniz bir tarayıcı
- Seçtiğiniz bir metin editörü

## Geliştirme ortamınızı ayarlayın

### 1. Adım: Kodu indirin

Öğretici için örnek kodu bir [ZIP dosyası](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) olarak veya git aracılığıyla indirin:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

Arşiv dosyasını dizine çıkarın (gerekirse) ve bilgisayarınızdaki komut satırı üzerinden proje dizinine gidin:

```shell
cd accelerated-mobile-pages-advanced
```

Proje dizini, birkaç örnek kaynak dosyası ve başlangıç ​​[`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) sayfasını içerir.

### 2. Adım: Örnek sayfayı çalıştırın

Örnek AMP sayfasını test etmek için dosyalara bir web sunucusundan erişmemiz gerekiyor. Test amacıyla geçici bir yerel web sunucusu oluşturmanın birkaç yolu vardır. İşte bazı seçenekler, sizin için en uygun olanı seçin:

- [“Chrome için Web Sunucusu” Google Chrome uygulaması](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Yerel bir HTTP Python sunucusu](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)<br>
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **NOT –** Üretim ortamlarında HTTPS kullanmanız kesinlikle önerilir. HTTPS, SEO dahil güvenliğin ötesinde birçok avantaja sahiptir. [Google Web Yöneticisi blog gönderisinden](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html) bu konu hakkında daha fazla bilgi edinebilirsiniz. [/tip]

Yerel web sunucunuzu kurduktan sonra, tarayıcınız ile [bu URL](http://localhost:8000/article.amp.html)'den örnek makaleye erişin:

```text
http://localhost:8000/article.amp.html
```
