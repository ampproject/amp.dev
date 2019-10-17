---
$title: Vendor analisis
---

Dokumen ini mencantumkan daftar vendor analisis yang menyediakan konfigurasi terpasang untuk digunakan dengan komponen [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Untuk mengirim data analisis ke vendor pihak ketiga:

1. Pada tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), tambahkan atribut `type` dan setel nilainya sesuai vendor yang ditentukan, seperti dijelaskan pada bagian [*Vendor*](#vendors) di bawah.
2. Tentukan data yang ingin Anda ambil dan pantau, dan tetapkan detail tersebut dalam data konfigurasi. Lihat dokumentasi vendor untuk mengetahui cara mengambil data analisis.

Pada contoh berikut, kita akan mengirim data pageview ke [Google Analytics](#google-analytics), sebuah penyedia analisis pihak ketiga yang memiliki konfigurasi terpasang untuk [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)

```html
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

[tip type="success"]

Jika Anda sudah terbiasa mengutak-atik kode, Anda dapat mempelajari konfigurasi mentah dalam file [`vendors.js`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/0.1/vendors.js).

[/tip]

[tip type="note"]

Vendor yang ingin mengintegrasikan layanannya dengan [`<amp-analytics>`](../../../../documentation/components/reference/amp-analytics.md) sebaiknya mempelajari detail dalam [Mengintegrasikan fitur analisis dengan AMP](../../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md).

[/tip]

<hr>

## Vendor <a name="vendors"></a>

### Acquia Lift

Nilai atribut type: `acquialift`

Menambahkan dukungan untuk Acquia Lift. Variabel `decisionApiUrl`, `accountId`, dan `siteId` harus ditetapkan. Informasi lebih lanjut tentang Acquia Lift dapat dilihat di [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics

Nilai atribut type: `adobeanalytics`

Menambahkan dukungan untuk Adobe Analytics. Detail selengkapnya tentang menambahkan dukungan Adobe Analytics dapat dilihat di [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics

Nilai atribut type: `afsanalytics`

Menambahkan dukungan untuk AFS Analytics. Selain itu, variabel `websiteid` dan `server` harus ditetapkan. Detail selengkapnya tentang menambahkan dukungan AFS Analytics dapat dilihat di [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### Alexa Internet

Nilai atribut type: `alexametrics`

Menambahkan dukungan untuk Alexa Certified Site Metrics. Variabel `atrk_acct` dan `domain` harus ditetapkan. Informasi lebih lanjut dapat dilihat di [FAQ Metrik Tersertifikasi Alexa](https://support.alexa.com/hc/en-us/sections/200063374-Certified-Site-Metrics).

### AT Internet

Nilai atribut type: `atinternet`

Menambahkan dukungan untuk AT Internet. Detail selengkapnya tentang menambahkan dukungan AT Internet dapat dilihat di [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics

Nilai atribut type: `baiduanalytics`

Menambahkan dukungan untuk Baidu Analytics. Detail selengkapnya tentang menambahkan dukungan Baidu Analytics dapat dilihat di [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### Burt

Nilai atribut type: `burt`

Menambahkan dukungan untuk Burt. Selain itu, variabel `trackingKey` harus ditetapkan. Ada juga kemungkinan untuk menetapkan variabel opsional `category` dan `subCategory`. Detail selengkapnya dapat dilihat di [burtcorp.com](http://burtcorp.com).

### Chartbeat

Nilai atribut type: `chartbeat`

Menambahkan dukungan untuk Chartbeat. Detail selengkapnya tentang menambahkan dukungan Chartbeat dapat dilihat di [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics

Nilai atribut type: `clicky`

Menambahkan dukungan untuk Clicky Web Analytics. Detail selengkapnya tentang menambahkan dukungan Clicky dapat dilihat di [clicky.com](https://clicky.com/help/apps-plugins).

### comScore

Nilai atribut type: `comscore`

Menambahkan dukungan untuk analisis pageview Unified Digital Measurement™ comScore. *Var* `c2` harus ditetapkan dengan *c2 id* yang disediakan comScore. Informasi lebih lanjut dapat dilihat di [comscore.com](http://www.comscore.com).

### Cxense

Nilai atribut type: `cxense`

Menambahkan dukungan untuk analisis Cxense Insight. *Var* `siteID` harus ditetapkan dengan *siteId* yang disediakan Cxense. Detail selengkapnya dapat dilihat di [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Dynatrace

Nilai atribut type: `dynatrace`

Menambahkan dukungan untuk pemantauan pengguna sebenarnya Dynatrace. *Var* `app` harus ditetapkan dengan *application id* yang disediakan Dynatrace, dan `tenant` *var* dengan *environment identifier* yang disediakan Dynatrace. Detail selengkapnya tentang menambahkan dukungan pemantauan pengguna sebenarnya Dynatrace dapat dilihat di [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### Eulerian Analytics

Nilai atribut type: `euleriananalytics`

Menambahkan dukungan untuk Eulerian Technologies Analytics. *Var* `analyticsHost` harus ditetapkan dengan domain yang didelegasikan oleh Eulerian. Detail selengkapnya dapat dilihat di [eulerian.wiki](https://eulerian.wiki).

### Facebook Pixel

Nilai atribut type: `facebookpixel`

Menambahkan dukungan untuk [Facebook Pixel](https://www.facebook.com/business/a/facebook-pixel). Pada konfigurasi [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), Anda harus menetapkan Pixel ID sebagai `pixelId: YOUR-PIXEL-ID`. Peristiwa yang didukung dan nilai peristiwa terkait yang dapat ditetapkan dijelaskan dalam [dokumentasi developer Facebook Pixel](https://developers.facebook.com/docs/ads-for-websites/pixel-events).

### Gemius

Nilai atribut type: `gemius`

Menambahkan dukungan untuk analisis Gemius Audience/Prism. Selain itu, variabel `prefix` dan `identifier` yang disediakan Gemius harus ditetapkan. Ada juga kemungkinan untuk menetapkan variabel opsional `extraparams` (key1=value1|key2=value2). Detail selengkapnya dapat dilihat di [gemius.com](https://www.gemius.com).

### Google AdWords

Nilai atribut type: `googleadwords`

Menambahkan dukungan untuk tracking konversi dan pemasaran ulang Google AdWords. Lihat detail selengkapnya di pusat bantuan AdWords untuk [tracking konversi](https://support.google.com/adwords/answer/1722054?hl=id) dan [pemasaran ulang](https://support.google.com/adwords/answer/2453998?hl=id). Kedua tag ini dapat digunakan independen satu sama lain.

### Google Analytics <a name="google-analytics"></a>

Nilai atribut type: `googleanalytics`

Menambahkan dukungan untuk Google Analytics. Detail selengkapnya tentang menambahkan dukungan Google Analytics dapat dilihat di [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### INFOnline / IVW

Nilai atribut type: `infonline`

Menambahkan dukungan untuk [INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de). Memerlukan salinan [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) di subdomain yang berbeda dengan file AMP yang mencakupnya ([mengapa?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). File harus ditayangkan melalui HTTPS. Sebagai contoh, jika file AMP Anda dihosting di `www.example.com`, maka `amp-analytics-infonline.html` harus berada di subdomain lain, misalnya `iframe.example.com` atau `assets.example.com`.

Selain itu, variabel berikut harus ditetapkan:

* `st`: Angebotskennung
* `co`: komentar
* `cp`: kode
* `url`: lokasi HTTPS untuk `amp-analytics-infonline.html`

Detail selengkapnya tentang menambahkan dukungan INFOnline / IVW dapat dilihat di [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/).

### Krux

Nilai atribut type: `krux`

Menambahkan dukungan untuk Krux. Detail konfigurasi dapat dilihat di [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

### Linkpulse

Nilai atribut type: `linkpulse`

Menambahkan dukungan untuk Linkpulse. Detail konfigurasi dapat dilihat di [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame

Nilai atribut type: `lotame`

Menambahkan dukungan untuk Lotame. Informasi lebih lanjut dan detail konfigurasi dapat dilihat di [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP).

### Médiamétrie

Nilai atribut type: `mediametrie`

Menambahkan dukungan untuk halaman pelacakan Médiamétrie. *Var* `serial` harus ditetapkan. Variabel `level1` hingga `level4` bersifat opsional.  Informasi lebih lanjut dapat dilihat di [mediametrie.com](http://www.mediametrie.com/).

### mediarithmics

Nilai atribut type: `mediarithmics`

Menambahkan dukungan untuk mediarithmics. Informasi lebih lanjut dan detail konfigurasi dapat dilihat di [developer.mediarithmics.com](https://developer.mediarithmics.com/).

### mParticle

Nilai atribut type: `mparticle`

Menambahkan dukungan untuk mParticle. Detail selengkapnya tentang menambahkan dukungan mParticle dapat dilihat di [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### New Relic

Nilai atribut type: `newrelic`

Menambahkan dukungan untuk New Relic Browser untuk mengukur throughput dan performa AMP. Setelah menambahkan nilai atribut `newrelic`, Anda harus menambahkan `app ID` dan `license key` dari akun New Relic Browser untuk mulai mengambil data. Detail selengkapnya dapat dilihat di halaman dokumentasi New Relic Browser AMP di [docs.newrelic.com](https://docs.newrelic.com/docs/browser/new-relic-browser/installation/monitor-amp-pages-new-relic-browser).

### Nielsen

Nilai atribut type: `nielsen`

Menambahkan dukungan untuk Nielsen DCR. Silakan hubungi perwakilan Nielsen untuk menyiapkan `apid` dan menentukan parameter lainnya di bagian `vars`. Untuk informasi lebih lanjut, lihat [dokumentasi dukungan Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### Nielsen Marketing Cloud

Nilai atribut type: `nielsen-marketing-cloud`

Menambahkan dukungan untuk Nielsen Marketing Cloud. Detail selengkapnya dapat dilihat di [Nielsen Marketing Cloud](http://www.nielsen.com/us/en/solutions/capabilities/nielsen-marketing-cloud.html).

### OEWA

Nilai atribut type: `oewa`

Menambahkan dukungan untuk [OEWA](https://www.oewa.at). Memerlukan salinan [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) di subdomain yang berbeda dengan file AMP yang mencakupnya ([mengapa?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)). File harus ditayangkan melalui HTTPS. Sebagai contoh, jika file AMP Anda dihosting di `www.example.com`, maka `amp-analytics-oewa.html` harus berada di subdomain lain, misalnya `oewa-amp.example.com`. Detail selengkapnya tentang menambahkan dukungan OEWA dapat dilihat [di sini](http://www.oewa.at/Implementierung).

Selain itu, variabel berikut harus ditetapkan:

Di bagian `vars`:

- `s`: penawaran
- `cp`: lokasi kategori

Di bagian `requests`:

- `url`: lokasi HTTPS untuk `amp-analytics-oewa.html`

[tip type="note"]

Tersedia variasi dengan nama `oewadirect` yang tidak menggunakan solusi iframe-ping dan memiliki deteksi klien yang lebih baik , yakni menggunakan `AMP CLIENT_ID`.  Variasi ini masih bersifat EKSPERIMENTAL, dan dilarang oleh OEWA karena tidak menggunakan `oewa2.js`.

[/tip]

### Parsely

Nilai atribut type: `parsely`

Menambahkan dukungan untuk Parsely. Detail konfigurasi dapat dilihat di [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Piano

Nilai atribut type: `piano`

Menambahkan dukungan untuk Piano.  Detail konfigurasi dapat dilihat di [vx.piano.io](http://vx.piano.io/javascript-tracking-amp).

### Quantcast Measurement

Nilai atribut type: `quantcast`

Menambahkan dukungan untuk Quantcast Measurement. Detail selengkapnya tentang menambahkan dukungan Quantcast Measurement dapat dilihat di [quantcast.com](https://www.quantcast.com/help/guides/)

### Segment

Nilai atribut type: `segment`

Menambahkan dukungan untuk pageview dan peristiwa Segment.
Untuk melihat daftar lengkap kolom yang dapat Anda kirim, buka [Spesifikasi Segment](https://segment.com/docs/spec/).

### SOASTA mPulse

Nilai atribut type: `mpulse`

Menambahkan dukungan untuk [SOASTA mPulse](https://www.soasta.com/mPulse). Detail konfigurasi dapat dilihat di [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach

Nilai atribut type: `simplereach`

Menambahkan dukungan untuk SimpleReach. Detail konfigurasi dapat dilihat di [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation).

### Snowplow Analytics

Nilai atribut type: `snowplow`

Menambahkan dukungan untuk Snowplow Analytics. Detail selengkapnya tentang menambahkan dukungan Snowplow Analytics dapat dilihat di [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Rambler/TOP-100

Nilai atribut type: `top100`

Menambahkan dukungan untuk Rambler/TOP-100. Detail konfigurasi dapat dilihat di [top100.rambler.ru](https://top100.rambler.ru/docs).

### Top.Mail.Ru

Nilai atribut type: `topmailru`

Menambahkan dukungan untuk Top.Mail.Ru. Detail konfigurasi dapat dilihat di [Bantuan Top.Mail.Ru](https://help.mail.ru/top/amp-analytics).

### Umeng+ Analytics

Nilai atribut type: `umenganalytics`

Menambahkan dukungan untuk Umeng+ Analytics. Detail selengkapnya tentang menambahkan dukungan Umeng+ Analytics dapat dilihat di [dev.umeng.com](http://dev.umeng.com/udplus/js-sdkdoc#5).

### Treasure Data

Nilai atribut type: `treasuredata`

Menambahkan dukungan untuk Treasure Data. Detail konfigurasi dapat dilihat di [treasuredata.com](https://docs.treasuredata.com/articles/javascript-sdk-google-amp).

### Webtrekk

Nilai atribut ~~`webtrekk`~~ tidak digunakan lagi (akan dihapus pada 31/12/2018) - sebagai gantinya, gunakan `webtrekk_2`

Menambahkan dukungan untuk Webtrekk. Detail konfigurasi dapat dilihat di [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Yandex Metrica

Nilai atribut type: `metrika`

Menambahkan dukungan untuk Yandex Metrica. Detail konfigurasi dapat dilihat di [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml).
