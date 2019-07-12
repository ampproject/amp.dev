---
$category@: ads-analytics
formats:
- websites
teaser:
  text: A container to display an ad.
---

# amp-ad/amp-embed

Container untuk menampilkan iklan. `amp-embed` adalah alias untuk tag `amp-ad`, yang memperoleh semua fungsionalitasnya dengan nama tag berbeda. Gunakan `amp-embed` jika secara semantis lebih akurat. Dokumen AMP hanya mendukung iklan/sematan yang ditayangkan melalui HTTPS.

# `amp-ad` / `amp-embed`

[tip type="note"]
Spesifikasi `amp-ad`/`amp-embed` besar kemungkinan akan terus berubah secara signifikan seiring waktu. Pendekatan saat ini dirancang untuk mem-bootstrap format agar dapat menampilkan iklan.
[/tip]


<!---
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
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Tata Letak yang Didukung</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td>Lihat <a href="https://ampbyexample.com/components/amp-ad/">contoh amp-ad</a> di AMP By Example.</td>
  </tr>
</table>

## Perilaku

Iklan dimuat seperti semua resource lainnya dalam dokumen AMP, dengan elemen kustom khusus yang disebut `<amp-ad>`. Tidak ada JavaScript yang disediakan jaringan iklan yang diizinkan untuk dijalankan di dalam dokumen AMP. Sebagai gantinya, AMP runtime memuat iframe dari asal yang berbeda (melalui sandbox iframe) sebagai dokumen AMP dan menjalankan JavaScript jaringan iklan di dalam sandbox iframe tersebut.

`<amp-ad>` membutuhkan nilai lebar dan tinggi yang akan ditentukan sesuai [aturan](https://www.ampproject.org/docs/design/amp-html-layout#%28tl;dr%29-summary-of-layout-requirements-&amp;-behaviors) jenis tata letaknya. Argumen `type` diperlukan untuk memilih jenis jaringan iklan yang akan ditampilkan. Semua atribut `data-*` pada tag ini otomatis diteruskan sebagai argumen ke kode yang nantinya merender iklan. Atribut `data-` apa saja yang diperlukan untuk jenis jaringan tertentu bergantung pada, dan harus didokumentasikan bersama, jaringan iklannya.

#### Contoh: Menampilkan beberapa iklan

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="522" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampad.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

## Atribut

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
    <td>Jika disediakan, <a href="https://www.ampproject.org/docs/reference/components/amp-user-notification.html">amp-user-notification</a> harus dikonfirmasi dengan ID-HTML yang diberikan hingga "ID klien AMP" untuk pengguna tersebut (mirip dengan cookie) diteruskan ke iklan. Ini berarti rendering iklan ditunda sampai pengguna mengonfirmasi notifikasi.</td>
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
    <td>Elemen ini mencakup <a href="https://www.ampproject.org/docs/reference/common_attributes">atribut umum</a> yang diperluas ke komponen AMP.</td>
  </tr>
</table>

## Placeholder

Secara opsional, `amp-ad` mendukung elemen turunan dengan atribut `placeholder`. Jika didukung oleh jaringan iklan, elemen ini diperlihatkan hingga iklan tersedia untuk ditampilkan. Pelajari lebih lanjut di [Placeholder &amp; Fallback](https://www.ampproject.org/docs/guides/responsive/placeholders).

```html
<amp-ad width=300 height=250
    type="foo"&gt;
    <div placeholder>Loading ...</div>
</amp-ad>
```

## Tidak ada iklan yang tersedia

Jika tidak ada iklan yang tersedia untuk slot, AMP akan mencoba menciutkan elemen `amp-ad` (artinya, menetapkan elemen ke `display: none`). AMP menentukan bahwa operasi ini dapat dijalankan tanpa memengaruhi posisi scroll pengguna. Jika sedang berada di viewport aktif, iklan tidak akan diciutkan karena hal tersebut dapat memengaruhi posisi scroll pengguna; namun, jika berada di luar viewport aktif, iklan akan diciutkan.

Dalam kasus upaya menciutkan gagal. Komponen `amp-ad` mendukung elemen turunan dengan atribut `fallback`. Jika elemen fallback tersedia, elemen fallback yang disesuaikan akan ditampilkan. Jika tidak, AMP akan menerapkan fallback default.

Contoh dengan fallback:

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## Menayangkan iklan video

Ada 3 cara untuk memonetisasi video di AMP dengan iklan video:

1. AMP secara native mendukung sejumlah pemutar video seperti BrightCove, DailyMotion, dll. yang dapat memonetisasi iklan. Untuk daftar lengkapnya, lihat komponen [media](https://www.ampproject.org/docs/reference/components#media).

2. Gunakan komponen [amp-ima-video](https://www.ampproject.org/docs/reference/components/amp-ima-video.html) yang dilengkapi dengan IMA SDK dan pemutar video HTML5 built-in
3. Jika Anda menggunakan pemutar video yang tidak didukung di AMP, Anda dapat menayangkan pemutar kustom menggunakan [amp-iframe](https://ampbyexample.com/components/amp-iframe/).
Saat menggunakan pendekatan `amp-iframe`:

    * Pastikan ada poster jika memuat pemutar di viewport pertama. [Detail](https://www.ampproject.org/docs/reference/components/amp-iframe#iframe-with-placeholder).
    * Video dan poster harus ditayangkan melalui HTTPS.</li>

## Menjalankan iklan dari domain kustom

AMP mendukung pemuatan iframe bootstrap yang digunakan untuk memuat iklan dari domain kustom seperti domain Anda sendiri.

Untuk mengaktifkan ini, salin file [remote.html](../../3p/remote.html) ke server web Anda. Selanjutnya, tambahkan tag meta berikut ke file AMP Anda:

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  Atribut `content` tag meta adalah URL mutlak bagi salinan file remote.html di server web Anda. URL ini harus menggunakan skema "https". URL ini tidak boleh berada pada asal yang sama dengan file AMP Anda. Misalnya, jika Anda menghosting file AMP di `www.example.com`, URL ini tidak boleh ada di `www.example.com`, tetapi boleh di `something-else.example.com`. Lihat [“Kebijakan asal iframe”](../../spec/amp-iframe-origin-policy.md) untuk penjelasan selengkapnya tentang asal iframe yang diizinkan.

### Keamanan

**Validasi data yang masuk** sebelum meneruskannya ke fungsi `draw3p`, untuk memastikan bahwa iframe hanya menjalankan fungsi yang diharapkan. Hal ini penting khususnya pada jaringan iklan yang mengizinkan injeksi JavaScript kustom.

iframe juga harus menegaskan bahwa mereka hanya di-iframe-kan ke asal tempat mereka diharapkan untuk di-iframe-kan. Asal tersebut adalah:

* asal Anda sendiri
* `https://cdn.ampproject.org` untuk cache AMP

Dalam kasus cache AMP, Anda juga harus memeriksa apakah "asal sumber" (asal dokumen yang ditayangkan oleh cdn.ampproject.org) merupakan salah satu asal Anda.

Penerapan asal dapat dilakukan dengan argumen ke-3 pada `draw3p` dan harus dilakukan menggunakan perintah [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) untuk dukungan browser lengkap.

### Memperkaya konfigurasi iklan masuk

Konfigurasi ini sepenuhnya opsional: Terkadang, permintaan iklan perlu diperkaya sebelum permintaan iklan dibuat ke server iklan.

Jika jaringan iklan Anda mendukung [fast fetch](https://www.ampproject.org/docs/ads/adnetwork_integration#creating-an-amp-ad-implementation), gunakan [Real Time Config](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (RTC). (Sebagai contoh, integrasi DoubleClick dan AdSense keduanya mendukung fast fetch dan RTC)

Jika jaringan iklan Anda menggunakan delayed fetch, Anda dapat meneruskan callback ke panggilan fungsi `draw3p` dalam file [remote.html](../../3p/remote.html). Callback ini akan menerima konfigurasi yang masuk sebagai argumen pertama, kemudian menerima callback lain sebagai argumen kedua (Disebut `done` pada contoh di bawah). Callback ini harus dipanggil dengan konfigurasi yang telah diperbarui agar rendering iklan dapat dilanjutkan.

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

## Penataan gaya

Elemen `<amp-ad>` tidak dengan sendirinya memiliki atau ditempatkan dalam container dengan CSS yang ditetapkan ke `position: fixed` (kecuali `amp-lightbox`).
Hal ini karena implikasi UX dari iklan overlay sehalaman penuh. Anda dapat mempertimbangkan untuk mengizinkan format iklan serupa di masa mendatang dalam container yang dikontrol AMP yang mempertahankan invarian UX tertentu.

## Validasi

Lihat [aturan amp-ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad/validator-amp-ad.protoascii) dalam spesifikasi validator AMP.

## Jaringan iklan yang didukung

* [A8](../../ads/a8.md)
* [A9](../../ads/a9.md)
* [AccessTrade](../../ads/accesstrade.md)
* [Adblade](../../ads/adblade.md)
* [AdButler](../../ads/adbutler.md)
* [Adform](../../ads/adform.md)
* [Adfox](../../ads/adfox.md)
* [Ad Generation](../../ads/adgeneration.md)
* [Adhese](../../ads/adhese.md)
* [Adincube](../../ads/adincube.md)
* [ADITION](../../ads/adition.md)
* [Adman](../../ads/adman.md)
* [AdmanMedia](../../ads/admanmedia.md)
* [Admixer](../../ads/admixer.md)
* [AdOcean](../../ads/adocean.md)
* [AdPicker](../../ads/adpicker.md)
* [AdPlugg](../../ads/adplugg.md)
* [Adpon](../../ads/adpon.md)
* [AdReactor](../../ads/adreactor.md)
* [AdSense](../../ads/google/adsense.md)
* [AdSensor](../../ads/adsensor.md)
* [AdsNative](../../ads/adsnative.md)
* [AdSpeed](../../ads/adspeed.md)
* [AdSpirit](../../ads/adspirit.md)
* [AdStir](../../ads/adstir.md)
* [AdTech](../../ads/adtech.md)
* [AdThrive](../../ads/adthrive.md)
* [AdUnity](../../ads/adunity.md)
* [Ad Up Technology](../../ads/aduptech.md)
* [Adventive](../../ads/adventive.md)
* [Adverline](../../ads/adverline.md)
* [Adverticum](../../ads/adverticum.md)
* [AdvertServe](../../ads/advertserve.md)
* [Adyoulike](../../ads/adyoulike.md)
* [Affiliate-B](../../ads/affiliateb.md)
* [AMoAd](../../ads/amoad.md)
* [AppNexus](../../ads/appnexus.md)
* [AppVador](../../ads/appvador.md)
* [Atomx](../../ads/atomx.md)
* [Baidu](../../ads/baidu.md)
* [BeOpinion](../amp-beopinion/amp-beopinion.md)
* [Bidtellect](../../ads/bidtellect.md)
* [brainy](../../ads/brainy.md)
* [Broadstreet Ads](../../ads/broadstreetads.md)
* [CA A.J.A. Infeed](../../ads/caajainfeed.md)
* [CA-ProFit-X](../../ads/caprofitx.md)
* [Cedato](../../ads/cedato.md)
* [Chargeads](../../ads/chargeads.md)
* [Colombia](../../ads/colombia.md)
* [Connatix](../../ads/connatix.md)
* [Content.ad](../../ads/contentad.md)
* [Criteo](../../ads/criteo.md)
* [CSA](../../ads/google/csa.md)
* [CxenseDisplay](../../ads/eas.md)
* [Dianomi](../../ads/dianomi.md)
* [Directadvert](../../ads/directadvert.md)
* [DistroScale](../../ads/distroscale.md)
* [Dot and Media](../../ads/dotandads.md)
* [Doubleclick](../../ads/google/doubleclick.md)
* [eADV](../../ads/eadv.md)
* [E-Planning](../../ads/eplanning.md)
* [Ezoic](../../ads/ezoic.md)
* [Felmat](../../ads/felmat.md)
* [FlexOneELEPHANT](../../ads/f1e.md)
* [FlexOneHARRIER](../../ads/f1h.md)
* [Flite](../../ads/flite.md)
* [fluct](../../ads/fluct.md)
* [FreeWheel](../../ads/freewheel.md)
* [Fusion](../../ads/fusion.md)
* [GenieeSSP](../../ads/genieessp.md)
* [Giraff](../../ads/giraff.md)
* [GMOSSP](../../ads/gmossp.md)
* [GumGum](../../ads/gumgum.md)
* [Holder](../../ads/holder.md)
* [I-Mobile](../../ads/imobile.md)
* [Imonomy](../../ads/imonomy.md)
* [iBillboard](../../ads/ibillboard.md)
* [Imedia](../../ads/imedia.md)
* [Improve Digital](../../ads/improvedigital.md)
* [Index Exchange](../../ads/ix.md)
* [Industrybrains](../../ads/industrybrains.md)
* [InMobi](../../ads/inmobi.md)
* [Innity](../../ads/innity.md)
* [Kargo](../../ads/kargo.md)
* [Kiosked](../../ads/kiosked.md)
* [Kixer](../../ads/kixer.md)
* [Kuadio](../../ads/kuadio.md)
* [Ligatus](../../ads/ligatus.md)
* [LockerDome](../../ads/lockerdome.md)
* [LOKA](../../ads/loka.md)
* [MADS](../../ads/mads.md)
* [MANTIS](../../ads/mantis.md)
* [Media.net](../../ads/medianet.md)
* [MediaImpact](../../ads/mediaimpact.md)
* [Mediavine](../../ads/mediavine.md)
* [Medyanet](../../ads/medyanet.md)
* [Meg](../../ads/meg.md)
* [MicroAd](../../ads/microad.md)
* [MixiMedia](../../ads/miximedia.md)
* [Mixpo](../../ads/mixpo.md)
* [Monetizer101](../../ads/monetizer101.md)
* [mox](../../ads/mox.md)
* [myTarget](../../ads/mytarget.md)
* [myWidget](../../ads/mywidget.md)
* [Nativo](../../ads/nativo.md)
* [Navegg](../../ads/navegg.md)
* [Nend](../../ads/nend.md)
* [NETLETIX](../../ads/netletix.md)
* [Noddus](../../ads/noddus.md)
* [Nokta](../../ads/nokta.md)
* [OneAD](../../ads/onead.md)
* [OnNetwork](../../ads/onnetwork.md)
* [Open AdStream (OAS)](../../ads/openadstream.md)
* [OpenX](../../ads/openx.md)
* [Pixels](../../ads/pixels.md)
* [plista](../../ads/plista.md)
* [polymorphicAds](../../ads/polymorphicads.md)
* [popin](../../ads/popin.md)
* [Pressboard](../../ads/pressboard.md)
* [PromoteIQ](../../ads/promoteiq.md)
* [PubGuru](../../ads/pubguru.md)
* [PubMatic](../../ads/pubmatic.md)
* [Pubmine](../../ads/pubmine.md)
* [PulsePoint](../../ads/pulsepoint.md)
* [Purch](../../ads/purch.md)
* [Rambler&amp;Co](../../ads/capirs.md)
* [RbInfoxSg](../../ads/rbinfox.md)
* [Realclick](../../ads/realclick.md)
* [recomAD](../../ads/recomad.md)
* [Red for Publishers](../../ads/rfp.md)
* [Relap](../../ads/relap.md)
* [Revcontent](../../ads/revcontent.md)
* [RevJet](../../ads/revjet.md)
* [Rubicon Project](../../ads/rubicon.md)
* [RUNative](../../ads/runative.md)
* [SAS CI 360 Match](../../ads/sas.md)
* [Sekindo](../../ads/sekindo.md)
* [Sharethrough](../../ads/sharethrough.md)
* [Sklik](../../ads/sklik.md)
* [SlimCut Media](../../ads/slimcutmedia.md)
* [Smart AdServer](../../ads/smartadserver.md)
* [smartclip](../../ads/smartclip.md)
* [sogou Ad](../../ads/sogouad.md)
* [Sortable](../../ads/sortable.md)
* [SOVRN](../../ads/sovrn.md)
* [Speakol](../../ads/speakol.md)
* [SpotX](../../ads/spotx.md)
* [SunMedia](../../ads/sunmedia.md)
* [Swoop](../../ads/swoop.md)
* [TcsEmotion](../../ads/tcsemotion.md)
* [Teads](../../ads/teads.md)
* [torimochi](../../ads/torimochi.md)
* [TripleLift](../../ads/triplelift.md)
* [Trugaze](../../ads/trugaze.md)
* [UZOU](../../ads/uzou.md)
* [ValueCommerce](../../ads/valuecommerce.md)
* [video intelligence](../../ads/videointelligence.md)
* [Videonow](../../ads/videonow.md)
* [Viralize](../../ads/viralize.md)
* [UAS](../../ads/uas.md)
* [ucfunnel](../../ads/ucfunnel.md)
* [Unruly](../../ads/unruly.md)
* [VMFive](../../ads/vmfive.md)
* [Webediads](../../ads/webediads.md)
* [Weborama](../../ads/weborama.md)
* [Widespace](../../ads/widespace.md)
* [Wisteria](../../ads/wisteria.md)
* [WPMedia](../../ads/wpmedia.md)
* [Xlift](../../ads/xlift.md)
* [Yahoo](../../ads/yahoo.md)
* [YahooJP](../../ads/yahoojp.md)
* [Yandex](../../ads/yandex.md)
* [Yengo](../../ads/yengo.md)
* [Yieldbot](../../ads/yieldbot.md)
* [Yieldmo](../../ads/yieldmo.md)
* [Yieldone](../../ads/yieldone.md)
* [Yieldpro](../../ads/yieldpro.md)
* [Zedo](../../ads/zedo.md)
* [Zucks](../../ads/zucks.md)

## Jenis sematan yang didukung

* [24smi](../../ads/24smi.md)
* [AJA](../../ads/aja.md)
* [Bringhub](../../ads/bringhub.md)
* [Dable](../../ads/dable.md)
* [Engageya](../../ads/engageya.md)
* [Epeex](../../ads/epeex.md)
* [Jubna](../../ads/jubna.md)
* [Outbrain](../../ads/outbrain.md)
* [Postquare](../../ads/postquare.md)
* [PubExchange](../../ads/pubexchange.md)
* [Smi2](../../ads/smi2.md)
* [Taboola](../../ads/taboola.md)
* [Zen](../../ads/zen.md)
* [ZergNet](../../ads/zergnet.md)
