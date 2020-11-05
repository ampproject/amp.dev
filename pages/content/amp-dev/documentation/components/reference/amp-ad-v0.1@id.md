---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: A container to display an ad.
---



Container untuk menampilkan iklan. `amp-embed` adalah alias untuk tag `amp-ad`, yang memperoleh semua fungsionalitasnya dengan nama tag berbeda. Gunakan `amp-embed` jika secara semantis lebih akurat. Dokumen AMP hanya mendukung iklan/sematan yang ditayangkan melalui HTTPS.


# <a name="amp-ad"></a> amp-ad / amp-embed

[tip type="note"]
Spesifikasi `amp-ad`/`amp-embed` besar kemungkinan akan terus berubah secara signifikan seiring waktu. Pendekatan saat ini dirancang untuk mem-bootstrap format agar dapat menampilkan iklan.
[/tip]


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<table>
  <tr>
    <td class="col-fourty"><strong>Deskripsi</strong></td>
    <td>Container untuk menampilkan iklan. <code>amp-embed</code> adalah alias untuk tag <code>amp-ad</code>, yang memperoleh semua fungsionalitasnya dengan nama tag berbeda. Gunakan <code>amp-embed</code> jika secara semantis lebih akurat. Dokumen AMP hanya mendukung iklan/sematan yang ditayangkan melalui HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;/script></code><br>Catatan: amp-ad tetap dapat berfungsi tanpa skrip ini, namun kami sangat merekomendasikannya demi kompatibilitas dengan versi mendatang</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-ad/">contoh amp-ad</a> di AMP By Example.</td>
  </tr>
</table>

## Perilaku <a name="behavior"></a>

Iklan dimuat seperti semua resource lainnya dalam dokumen AMP, dengan elemen kustom khusus yang disebut `<amp-ad>`. Tidak ada JavaScript yang disediakan jaringan iklan yang diizinkan untuk dijalankan di dalam dokumen AMP. Sebagai gantinya, AMP runtime memuat iframe dari asal yang berbeda (melalui sandbox iframe) sebagai dokumen AMP dan menjalankan JavaScript jaringan iklan di dalam sandbox iframe tersebut.

`<amp-ad>` membutuhkan nilai lebar dan tinggi yang akan ditentukan sesuai [aturan](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors) jenis tata letaknya. Argumen `type` diperlukan untuk memilih jenis jaringan iklan yang akan ditampilkan. Semua atribut `data-*` pada tag ini otomatis diteruskan sebagai argumen ke kode yang nantinya merender iklan. Atribut `data-` apa saja yang diperlukan untuk jenis jaringan tertentu bergantung pada, dan harus didokumentasikan bersama, jaringan iklannya.

#### Contoh: Menampilkan beberapa iklan <a name="example-displaying-a-few-ads"></a>

[example preview="inline" playground="true" imports="amp-ad"]
```html
<amp-ad type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
    width="300"
    height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
  <amp-ad width="300"
    height="250"
    type="industrybrains"
    data-width="300"
    data-height="250"
    data-cid="19626-3798936394">
  </amp-ad>
  <amp-embed type="taboola"
    width="400"
    height="300"
    layout="responsive"
    data-publisher="amp-demo"
    data-mode="thumbnails-a"
    data-placement="Ads Example"
    data-article="auto">
  </amp-embed>
```
[/example]

## Atribut <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (wajib)</strong></td>
    <td>Menentukan ID untuk <a href="#supported-ad-networks">jaringan iklan</a>. Atribut <code>type</code> memilih template yang akan digunakan untuk tag iklan.</td>
  </tr>
  <tr>
    <td width="40%"><strong>src (opsional)</strong></td>
    <td>Gunakan atribut ini untuk memuat tag skrip untuk jaringan iklan yang ditentukan. Atribut ini dapat digunakan untuk jaringan iklan yang memerlukan persis satu tag skrip untuk disisipkan di halaman. Nilai <code>src</code> harus memiliki awalan yang diizinkan untuk jaringan iklan yang ditentukan, dan nilai ini harus menggunakan protokol <code>https</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>Sebagian besar jaringan iklan memerlukan konfigurasi lebih lanjut, yang dapat diteruskan ke jaringan menggunakan atribut <code>data-</code> HTML. Nama parameter tunduk pada tanda pisah atribut data standar untuk konversi camel case. Misalnya, "data-foo-bar" akan dikirim ke iklan untuk dikonfigurasi sebagai "fooBar". Lihat dokumentasi untuk <a href="#supported-ad-networks">jaringan iklan</a> tempat atribut dapat digunakan.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td>Atribut yang dimulai dengan <code>data-vars-</code> dicadangkan untuk <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute">var <code>amp-analytics</code></a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>json (opsional)</strong></td>
    <td>Gunakan atribut ini untuk meneruskan konfigurasi ke iklan sebagai objek JSON kompleks arbitrer. Objek diteruskan ke iklan apa adanya tanpa penyesuaian pada namanya.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id (opsional)</strong></td>
    <td>Jika disediakan, <a href="amp-user-notification.md">amp-user-notification</a> harus dikonfirmasi dengan ID-HTML yang diberikan hingga "ID klien AMP" untuk pengguna tersebut (mirip dengan cookie) diteruskan ke iklan. Ini berarti rendering iklan ditunda sampai pengguna mengonfirmasi notifikasi.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy (ostional)</strong></td>
    <td>Menginstruksikan iklan untuk mulai memuat ketika iklan berada dalam sejumlah viewport yang ditentukan, dari viewport saat ini. Tanpa atribut <code>data-loading-strategy</code>, jumlahnya adalah 3 secara default. Anda dapat menentukan nilai mengambang dalam rentang [0, 3](Jika tidak ditentukan, nilai akan ditetapkan ke 1.25). Gunakan nilai yang lebih kecil untuk mendapatkan tingkat visibilitas yang lebih tinggi (iklan lebih berpeluang terlihat, setelah dimuat), tetapi dengan risiko menghasilkan jumlah tayangan yang lebih sedikit (artinya, lebih sedikit iklan yang dimuat). Jika atribut ini ditentukan tetapi nilainya dibiarkan kosong, sistem akan menetapkan nilai mengambang, yang mengoptimalkan visibilitas tanpa memengaruhi jumlah tayangan secara drastis. Perhatikan, menentukan <code>prefer-viewability-over-views</code> sebagai nilai juga otomatis mengoptimalkan visibilitas.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id (opsional)</strong></td>
    <td>Memberitahukan ID komponen container kepada iklan saat terjadi percobaan untuk menciutkan komponen. Komponen container harus berupa komponen <code>&lt;amp-layout&gt;</code> yang merupakan induk dari iklan. Jika <code>data-ad-container-id</code> ditetapkan, dan komponen container <code>&lt;amp-layout&gt;</code> ditemukan, AMP runtime akan mencoba menciutkan komponen container, bukan komponen iklan, saat tidak ada isian. Fitur ini berguna saat indikator iklan ada.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>atribut umum</strong></td>
    <td>Elemen ini mencakup <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atribut umum</a> yang diperluas ke komponen AMP.</td>
  </tr>
</table>

## Placeholder <a name="placeholder"></a>

Secara opsional, `amp-ad` mendukung elemen turunan dengan atribut `placeholder`. Jika didukung oleh jaringan iklan, elemen ini diperlihatkan hingga iklan tersedia untuk ditampilkan. Pelajari lebih lanjut di [Placeholder &amp; Fallback](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad width=300 height=250
    type="foo"&gt;
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Tidak ada iklan yang tersedia <a name="no-ad-available"></a>

Jika tidak ada iklan yang tersedia untuk slot, AMP akan mencoba menciutkan elemen `amp-ad` (artinya, menetapkan elemen ke `display: none`). AMP menentukan bahwa operasi ini dapat dijalankan tanpa memengaruhi posisi scroll pengguna. Jika sedang berada di viewport aktif, iklan tidak akan diciutkan karena hal tersebut dapat memengaruhi posisi scroll pengguna; namun, jika berada di luar viewport aktif, iklan akan diciutkan.

Dalam kasus upaya menciutkan gagal. Komponen `amp-ad` mendukung elemen turunan dengan atribut `fallback`. Jika elemen fallback tersedia, elemen fallback yang disesuaikan akan ditampilkan. Jika tidak, AMP akan menerapkan fallback default.

Contoh dengan fallback:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Menayangkan iklan video <a name="serving-video-ads"></a>

Ada 3 cara untuk memonetisasi video di AMP dengan iklan video:

1. AMP secara native mendukung sejumlah pemutar video seperti BrightCove, DailyMotion, dll. yang dapat memonetisasi iklan. Untuk daftar lengkapnya, lihat komponen [media](../../../documentation/components/index.html#media).

2. Gunakan komponen [amp-ima-video](amp-ima-video.md) yang dilengkapi dengan IMA SDK dan pemutar video HTML5 built-in
3. Jika Anda menggunakan pemutar video yang tidak didukung di AMP, Anda dapat menayangkan pemutar kustom menggunakan [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Saat menggunakan pendekatan `amp-iframe`:

    * Pastikan ada poster jika memuat pemutar di viewport pertama. [Detail](amp-iframe.md#iframe-with-placeholder).
    * Video dan poster harus ditayangkan melalui HTTPS.</li>

## Menjalankan iklan dari domain kustom <a name="running-ads-from-a-custom-domain"></a>

AMP mendukung pemuatan iframe bootstrap yang digunakan untuk memuat iklan dari domain kustom seperti domain Anda sendiri.

Untuk mengaktifkan ini, salin file [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html) ke server web Anda. Selanjutnya, tambahkan tag meta berikut ke file AMP Anda:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  Atribut `content` tag meta adalah URL mutlak bagi salinan file remote.html di server web Anda. URL ini harus menggunakan skema "https". URL ini tidak boleh berada pada asal yang sama dengan file AMP Anda. Misalnya, jika Anda menghosting file AMP di `www.example.com`, URL ini tidak boleh ada di `www.example.com`, tetapi boleh di `something-else.example.com`. Lihat [“Kebijakan asal iframe”](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md) untuk penjelasan selengkapnya tentang asal iframe yang diizinkan.

### Keamanan <a name="security"></a>

**Validasi data yang masuk** sebelum meneruskannya ke fungsi `draw3p`, untuk memastikan bahwa iframe hanya menjalankan fungsi yang diharapkan. Hal ini penting khususnya pada jaringan iklan yang mengizinkan injeksi JavaScript kustom.

iframe juga harus menegaskan bahwa mereka hanya di-iframe-kan ke asal tempat mereka diharapkan untuk di-iframe-kan. Asal tersebut adalah:

* asal Anda sendiri
* `https://cdn.ampproject.org` untuk cache AMP

Dalam kasus cache AMP, Anda juga harus memeriksa apakah "asal sumber" (asal dokumen yang ditayangkan oleh cdn.ampproject.org) merupakan salah satu asal Anda.

Penerapan asal dapat dilakukan dengan argumen ke-3 pada `draw3p` dan harus dilakukan menggunakan perintah [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) untuk dukungan browser lengkap.

### Memperkaya konfigurasi iklan masuk <a name="enhance-incoming-ad-configuration"></a>

Konfigurasi ini sepenuhnya opsional: Terkadang, permintaan iklan perlu diperkaya sebelum permintaan iklan dibuat ke server iklan.

Jika jaringan iklan Anda mendukung [fast fetch](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad), gunakan [Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC). (Sebagai contoh, integrasi DoubleClick dan AdSense keduanya mendukung fast fetch dan RTC)

Jika jaringan iklan Anda menggunakan delayed fetch, Anda dapat meneruskan callback ke panggilan fungsi `draw3p` dalam file [remote.html](https://github.com/ampproject/amphtml/blob/master/3p/remote.html). Callback ini akan menerima konfigurasi yang masuk sebagai argumen pertama, kemudian menerima callback lain sebagai argumen kedua (Disebut `done` pada contoh di bawah). Callback ini harus dipanggil dengan konfigurasi yang telah diperbarui agar rendering iklan dapat dilanjutkan.

Contoh:

```JS
draw3p(function(config, done) {
  config.targeting = Math.random() > 0.5 ? 'sport' : 'fashion';
  // Don't actually call setTimeout here. This should only serve as an
  // example that is OK to call the done callback asynchronously.
  setTimeout(function() {
    done(config);
  }, 100)
}, ['allowed-ad-type'], ['your-domain.com']);
```

## Penataan gaya <a name="styling"></a>

Elemen `<amp-ad>` tidak dengan sendirinya memiliki atau ditempatkan dalam container dengan CSS yang ditetapkan ke `position: fixed` (kecuali `amp-lightbox`).
Hal ini karena implikasi UX dari iklan overlay sehalaman penuh. Anda dapat mempertimbangkan untuk mengizinkan format iklan serupa di masa mendatang dalam container yang dikontrol AMP yang mempertahankan invarian UX tertentu.

## Validasi <a name="validation"></a>

Lihat [aturan amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) dalam spesifikasi validator AMP.

## Jaringan iklan yang didukung <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/master/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/master/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/master/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/master/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/master/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/master/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/master/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/master/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/master/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/master/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/master/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/master/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/master/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/master/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/master/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/master/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/master/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/master/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/master/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/master/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/master/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/master/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/master/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/master/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/master/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/master/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/master/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/master/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/master/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/master/ads/adverticum.md)
* [AdvertServe](https://github.com/ampproject/amphtml/blob/master/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/master/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/master/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/master/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/master/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/master/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/master/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/master/ads/atomx.md)
* [Baidu](https://github.com/ampproject/amphtml/blob/master/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/master/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/master/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/master/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/master/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/master/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/master/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/master/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/master/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/master/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/master/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/master/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/master/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/master/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/master/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/master/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/master/ads/dotandads.md)
* [Doubleclick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/master/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/master/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/master/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/master/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/master/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/master/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/master/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/master/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/master/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/master/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/master/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/master/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/master/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/master/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/master/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/master/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/master/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/master/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/master/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/master/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/master/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/master/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/master/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/master/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/master/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/master/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/master/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/master/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/master/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/master/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/master/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/master/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/master/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/master/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/master/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/master/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/master/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/master/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/master/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/master/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/master/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/master/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/master/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/master/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/master/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/master/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/master/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/master/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/master/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/master/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/master/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/master/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/master/ads/onnetwork.md)
* [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/master/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/master/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/master/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/master/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/master/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/master/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/master/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/master/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/master/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/master/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/master/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/master/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/master/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/master/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/master/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/master/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/master/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/master/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/master/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/master/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/master/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/master/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/master/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/master/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/master/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/master/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/master/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/master/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/master/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/master/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/master/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/master/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/master/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/master/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/master/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/master/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/master/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/master/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/master/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/master/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/master/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/master/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/master/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/master/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/master/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/master/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/master/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/master/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/master/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/master/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/master/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/master/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/master/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/master/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/master/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/master/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/master/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/master/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/master/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/master/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/master/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/master/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/master/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/master/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/master/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/master/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/master/ads/zucks.md)

## Jenis sematan yang didukung <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/master/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/master/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/master/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/master/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/master/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/master/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/master/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/master/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/master/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/master/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/master/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/master/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/master/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/master/ads/zergnet.md)