---
$title: "Vendor Analitik"
$order: 4
toc: true
---
[TOC]

Dokumen ini mencantumkan vendor analitik yang sudah memiliki konfigurasi untuk digunakan dengan komponen [`amp-analytics`](/id/docs/reference/components/amp-analytics.html).

Dengan menentukan nama vendor analitik dengan atribut `type`, Anda dapat dengan cepat mengonfigurasi `amp-analytics` untuk menggunakan produk masing-masing. Konfigurasi tambahan (misalnya ID pengguna Anda) mungkin tetap diperlukan.

Harap baca dokumentasi vendor Anda, yang mungkin ditautkan pada bagian di bawah. Anda juga dapat melihat file [vendors.js](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/0.1/vendors.js) untuk informasi selengkapnya terkait konfigurasi setiap vendor.

**Misalnya:**

Berikut cuplikan yang menentukan `type` untuk penyedia analitik yang disebut `XYZ`:

```html
<amp-analytics type="XYZ"> ... </amp-analytics>
```


{% call callout('Baca terus', type='read') %}
Pelajari lebih lanjut cara melacak analitik dengan [`amp-analytics`](/id/docs/reference/components/amp-analytics.html)
.{% endcall %}

## Vendor

### Acquia Lift

Nilai atribut type: `acquialift`

Menambahkan dukungan untuk Acquia Lift. `decisionApiUrl`, `accountId`, dan `siteId` harus ditentukan. Informasi selengkapnya tentang Acquia Lift dapat ditemukan di [https://docs.acquia.com/lift](https://docs.acquia.com/lift).

### Adobe Analytics

Nilai atribut type: `adobeanalytics`

Menambahkan dukungan untuk Adobe Analytics. Detail selengkapnya tentang cara menambahkan dukungan Adobe Analytics dapat ditemukan di [marketing.adobe.com](https://marketing.adobe.com/resources/help/en_US/sc/implement/accelerated-mobile-pages.html).

### AFS Analytics

Nilai atribut type: `afsanalytics`

Menambahkan dukungan untuk AFS Analytics. Selain itu, variabel `websiteid` dan `server` harus ditentukan. Detail selengkapnya tentang cara menambahkan dukungan AFS Analytics dapat ditemukan di [afsanalytics.com](https://www.afsanalytics.com/articles/developers/).

### AT Internet

Nilai atribut type: `atinternet`

Menambahkan dukungan untuk AT Internet. Detail selengkapnya tentang cara menambahkan dukungan AT Internet dapat ditemukan di [developers.atinternet-solutions.com](http://developers.atinternet-solutions.com/javascript-en/advanced-features-javascript-en/accelerated-mobile-pages-amp-javascript-en/).

### Baidu Analytics

Nilai atribut type: `baiduanalytics`

Menambahkan dukungan untuk Baidu Analytics. Detail selengkapnya tentang cara menambahkan dukungan Baidu Analytics dapat ditemukan di [tongji.baidu.com/](http://tongji.baidu.com/web/help/article?id=268&type=0).

### Burt

Nilai atribut type: `burt`

Menambahkan dukungan untuk Burt. Selain itu, variabel `trackingKey` harus ditentukan. Variabel opsional `category` dan `subCategory` juga dapat ditentukan. Detail selengkapnya dapat ditemukan di [burtcorp.com](http://burtcorp.com).

### Chartbeat

Nilai atribut type: `chartbeat`

Menambahkan dukungan untuk Chartbeat. Detail selengkapnya tentang cara menambahkan dukungan Chartbeat dapat ditemukan di [support.chartbeat.com](http://support.chartbeat.com/docs/integrations.html#amp).

### Clicky Web Analytics

Nilai atribut type: `clicky`

 Menambahkan dukungan untuk Clicky Web Analytics. Detail selengkapnya tentang cara menambahkan dukungan Clicky Web Analytics dapat ditemukan di [clicky.com](https://clicky.com/help/apps-plugins).

### comScore

Nilai atribut type: `comscore`

 Menambahkan dukungan untuk analitik pageview comScore Unified Digital Measurement&trade;. Wajib menetapkan*var*  `c2` dengan*c2 id* yang disediakan comScore. Informasi selengkapnya dapat ditemukan di [comscore.com](http://www.comscore.com).

### Cxense

Nilai atribut type: `cxense`

 Menambahkan dukungan untuk analitik Cxense Insight. Wajib menetapkan*var*  `siteId` dengan*siteId* yang disediakan Cxense. Detail selengkapnya dapat ditemukan di [wiki.cxense.com](https://wiki.cxense.com/display/cust/Accelerated+Mobile+Pages+%28AMP%29+integration).

### Dynatrace

Nilai atribut type: `dynatrace`

Menambahkan dukungan untuk pemantauan pengguna nyata Dynatrace. Wajib menetapkan*var*  `app` dengan*application id*  yang disediakan Dynatrace dan*var*  `tenant` dengan*environment identifier* yang disediakan Dynatrace. Detail selengkapnya tentang cara menambahkan pemantauan pengguna nyata Dynatrace dapat ditemukan di [dynatrace.com](https://www.dynatrace.com/technologies/web/amp-monitoring/).

### Eulerian Analytics

Nilai atribut type: `euleriananalytics`

Menambahkan dukungan untuk Eulerian Technologies Analytics. Wajib menetapkan*var*  `analyticsHost` dengan domain yang didelegasikan Eulerian. Detail selengkapnya dapat ditemukan di [eulerian.wiki](https://eulerian.wiki).

### Gemius

Nilai atribut type: `gemius`

Menambahkan dukungan untuk analitik Gemius Audience/Prism. Selain itu, variabel `prefix` dan `identifier` yang disediakan gemius harus ditentukan. Variabel opsional `extraparams` (key1=value1|key2=value2) juga dapat ditentukan. Detail selengkapnya dapat ditemukan di [gemius.com](https://www.gemius.com).

### Google AdWords

Nilai atribut type: `googleadwords`

Menambahkan dukungan untuk pelacakan konversi dan pemasaran ulang Google AdWords. Lihat detail selengkapnya terkait [pelacakan konversi](https://support.google.com/adwords/answer/1722054?hl=en)  yang disediakan Dynatrace dan  [pemasaran ulang](https://support.google.com/adwords/answer/2453998?hl=en)di pusat bantuan AdWords. Kedua tag dapat digunakan secara mandiri untuk masing-masing.

### Google Analytics

Nilai atribut type: `googleanalytics`

Menambahkan dukungan untuk Google Analytics. Detail selengkapnya tentang cara menambahkan dukungan Google Analytics dapat ditemukan di [developers.google.com](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### INFOnline / IVW

Nilai atribut type: `infonline`

Menambahkan dukungan untuk [INFOnline](https://www.infonline.de) / [IVW](http://www.ivw.de). Wajib memerlukan salinan [amp-analytics-infonline.html](https://3p.ampproject.net/custom/amp-analytics-infonline.html) di subdomain lain selain file AMP ([why?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md)) yang disertakan. File harus ditayangkan melalui HTTPS. Contoh, jika file AMP Anda dihosting di `www.example.com`, `amp-analytics-infonline.html` harus berada di subdomain lain misalnya `iframe.example.com` atau `assets.example.com`.

Selain itu, variabel berikut harus ditentukan:

* `st`: Angebotskennung
* `co`: komentar
* `cp`: kode
* `url`: lokasi HTTPS `amp-analytics-infonline.html`

Detail selengkapnya tentang cara menambahkan dukungan INFOnline / IVW dapat ditemukan di [www.infonline.de](https://www.infonline.de/downloads/web-mew-und-ctv/).

### Krux

Nilai atribut type: `krux`

Menambahkan dukungan untuk Krux. Konfigurasi selengkapnya dapat ditemukan di [help.krux.com](https://konsole.zendesk.com/hc/en-us/articles/216596608).

### Linkpulse

Nilai atribut type: `linkpulse`

Menambahkan dukungan untuk Linkpulse. Konfigurasi selengkapnya dapat ditemukan di [docs.linkpulse.com](http://docs.linkpulse.com).

### Lotame

Nilai atribut type: `lotame`

Menambahkan dukungan untuk Lotame. Informasi dan konfigurasi selengkapnya dapat ditemukan di [mylotame.force.com](https://mylotame.force.com/s/article/Google-AMP).

### Médiamétrie

Nilai atribut type: `mediametrie`

Menambahkan dukungan untuk halaman pelacakan Médiamétrie. Diwajibkan menetapkan *var* `serial`. Var `level1` hingga `level4` bersifat opsional. Informasi selengkapnya dapat ditemukan di [mediametrie.com](http://www.mediametrie.com/).

### mParticle

Nilai atribut type: `mparticle`

Menambahkan dukungan untuk mParticle. Detail selengkapnya tentang cara menambahkan dukungan mParticle dapat ditemukan di [docs.mparticle.com](http://docs.mparticle.com/?javascript#amp).

### Nielsen

Nilai atribut type: `nielsen`

Menambahkan dukungan untuk Nielsen DCR. Silakan hubungi perwakilan Nielsen untuk melakukan penyiapan terkait `apid` serta bantuan untuk menetapkan parameter lain di bagian `vars`. Untuk informasi selengkapnya, lihat [Dokumentasi dukungan Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API).

### OEWA

Nilai atribut type: `oewa`

Menambahkan dukungan untuk [OEWA](https://www.oewa.at) . Wajib memerlukan salinan [amp-analytics-oewa.html](http://www.oewa.at/fileadmin/downloads/amp-analytics-oewa.html) di subdomain lain selain file AMP ([why?](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md) ). File harus ditayangkan melalui HTTPS. Contoh, jika file AMP Anda dihosting di `www.example.com`, `amp-analytics-oewa.html` harus berada di subdomain lain misalnya `oewa-amp.example.com`. Detail selengkapnya tentang cara menambahkan dukungan OEWA dapat ditemukan [di sini](http://www.oewa.at/basic/implementierung).

Selain itu, variabel berikut harus ditentukan:

Di bagian `vars`:

- `s`: tawaran
- `cp`: path kategori

Di bagian `requests`:

- `url`: lokasi HTTPS `amp-analytics-oewa.html`

{% call callout('Catatan', type='caution') %}
Terdapat variasi yang disebut `oewadirect` yang tidak menggunakan solusi iframe-ping dan memiliki deteksi klien yang lebih baik dengan menggunakan `AMP CLIENT_ID`. Variasi ini masih bersifat EKSPERIMENTAL, dan dilarang oleh OEWA karena tidak menggunakan `oewa2.js`.
{% endcall %}

### Parsely

Nilai atribut type: `parsely`

Menambahkan dukungan untuk Parsely. Konfigurasi selengkapnya dapat ditemukan di [parsely.com/docs](http://parsely.com/docs/integration/tracking/google-amp.html).

### Piano

Nilai atribut type: `piano`

Menambahkan dukungan untuk Piano. Konfigurasi selengkapnya dapat ditemukan di [vx.piano.io](http://vx.piano.io/javascript-tracking-amp).

### Quantcast Measurement

Nilai atribut type: `quantcast`

Menambahkan dukungan untuk Quantcast Measurement. Detail selengkapnya tentang cara menambahkan dukungan Quantcast Measurement dapat ditemukan di [quantcast.com](https://www.quantcast.com/help/guides/)

### Segment

Nilai atribut type: `segment`

Menambahkan dukungan untuk acara dan pageview segmen. Untuk melihat daftar lengkap kolom yang dapat Anda kirim, lihat [Segment Spec](https://segment.com/docs/spec/).

### SOASTA mPulse

Nilai atribut type: `mpulse`

Menambahkan dukungan untuk [SOASTA mPulse](https://www.soasta.com/mPulse).
Konfigurasi selengkapnya dapat ditemukan di [docs.soasta.com](http://docs.soasta.com/).

### SimpleReach

Nilai atribut type: `simplereach`

Menambahkan dukungan untuk SimpleReach. Konfigurasi selengkapnya dapat ditemukan di [simplereach.com/docs](http://docs.simplereach.com/dev-guide/implementation/google-amp-implementation).

### Snowplow Analytics

Nilai atribut type: `snowplow`

Menambahkan dukungan untuk Snowplow Analytics. Detail selengkapnya tentang cara menambahkan dukungan Snowplow Analytics dapat ditemukan di [github.com/snowplow/snowplow/wiki](https://github.com/snowplow/snowplow/wiki/Google-AMP-Tracker).

### Rambler/TOP-100

Nilai atribut type: `top100`

Menambahkan dukungan untuk Rambler/TOP-100. Konfigurasi selengkapnya dapat ditemukan di [top100.rambler.ru](https://top100.rambler.ru/docs).

### Webtrekk

Nilai atribut type: `webtrekk`

Menambahkan dukungan untuk Webtrekk. Konfigurasi selengkapnya dapat ditemukan di [supportcenter.webtrekk.com](https://supportcenter.webtrekk.com/en/public/amp-analytics.html).

### Yandex Metrica

Nilai atribut type: `metrika`

Menambahkan dukungan untuk Yandex Metrica. Konfigurasi selengkapnya dapat ditemukan di [Yandex Support](https://yandex.com/support/metrica/code/install-counter-amp.xml).
