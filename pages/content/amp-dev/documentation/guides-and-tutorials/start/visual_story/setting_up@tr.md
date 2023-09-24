---
'$title': Kurulum
$order: 1
description: "Geliştirme ortamınızı ayarlama: 1. Adım. Kodu indirin. Aşağıdaki URL'den bir zip dosyası olarak sıkıştırılmış öğretici kodunu indirin..."
author: bpaduch
---

## Ön koşullar

Bu öğreticiye başlamadan önce aşağıdakilere ihtiyacınız olacak:

- HTML, CSS ve JavaScript hakkında temel bilgi
- AMP temel kavramlarına dair temel bir anlayış (["HTML'nizi AMP'ye dönüştürme"](../../../../documentation/guides-and-tutorials/start/converting/index.md?format=websites) öğreticisine bakın)
- Seçtiğiniz bir tarayıcı
- Seçtiğiniz bir metin editörü

## Geliştirme ortamınızı ayarlama

#### 1. Adım. Kodu indirin

1. Aşağıdaki URL'den bir zip dosyası olarak sıkıştırılmış öğretici kodunu indirin: <a href="/static/files/tutorials/amp-pets-story.zip">/static/files/tutorials/amp-pets-story.zip</a>

2. Zip dosyasının içeriğini çıkarın. **amp-pets-story** dizininde, hikayemizi oluşturmak için kullanacağımız resimler, video, ses ve veri dosyaları bulunuyor. **pets.html** dosyası, hikaye için başlangıç noktamızdır. Hikayenin tamamlanmış hali, [pets-completed.html](https://github.com/ampproject/amp.dev/blob/legacy-master/tutorial_source/amp-pets-story/pets-completed.html) dosyasında bulunabilir.

#### 2. Adım. Örnek sayfayı çalıştırın

Örnek Web Hikayemizi test etmek için dosyalara bir web sunucusundan erişmemiz gerekiyor. Test amacıyla geçici bir yerel web sunucusu oluşturmanın birkaç yolu vardır. İşte bazı seçenekler, sizin için en uygun olanı seçin:

- [“Web Server for Chrome” Google Chrome uygulaması](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Yerel bir HTTP Python sunucusu](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Yerel web sunucunuzu kurduktan sonra, aşağıdaki <a href="http://localhost:8000/pets-completed.html">URL'ye</a> erişerek bu eğiticinin sonunda tamamlanmış Web Hikayemizin nasıl görüneceğine bir göz atın:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **ÖNEMLİ –** URL'nin `localhost` üzerinden sunulduğundan emin olun, aksi takdirde Web Hikayesi doğru şekilde yüklenemez ve `"source" " https://" veya "//" ile başlamalı ya da göreli olmalı ve https veya localhost üzerinden sunulmalı` şekilde hatalarla karşılaşabilirsiniz. [/tip]

Tamamlanan hikayeye tıklayın ve ne yaratacağımıza dair bir fikir edinin.
