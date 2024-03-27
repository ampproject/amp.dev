---
$title: amp-access-laterpay
$category@: dynamic-content
teaser:
  text: Allows publishers to easily integrate with the LaterPay micropayments platform.
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



Memungkinkan penayang untuk berintegrasi lebih mudah dengan platform pembayaran mikro [LaterPay](https://www.laterpay.net). `amp-access-laterpay` didasarkan pada, dan memerlukan [AMP Access](amp-access.md).

<table>
  <tr>
    <td class="col-fourty"><strong>Skrip yang Diperlukan</strong></td>
    <td>
      <small>Perhatikan bahwa Anda memerlukan skrip untuk "amp-access-laterpay", "amp-access", dan "amp-analytics".</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://ampjs.org/v0/amp-access-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://ampjs.org/v0/amp-access-laterpay-0.2.js"></script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>Contoh</strong></td>
    <td>Lihat contoh <a href="https://ampbyexample.com/components/amp-access-laterpay/">amp-access-laterpay yang dianotasi</a> di AMP By Example.</td>
  </tr>
</table>


## Perilaku <a name="behavior"></a>

[LaterPay](https://laterpay.net) adalah platform pembayaran mikro yang memungkinkan pengguna membeli konten online apa pun hanya dengan dua klik, dan mendapatkan akses langsung – tanpa pembayaran, data pribadi, atau pendaftaran di muka. Pengguna hanya membayar setelah pembelian mereka mencapai total $5 atau €5 di berbagai situs. Penyedia konten dapat menjual item tertentu atau akses berkala, yang memungkinkan akses tarif tetap atau akses berbatas waktu ke konten.

Jika mengintegrasikan LaterPay melalui [integrasi Skrip Konektor](https://docs.laterpay.net/connector/), Anda tidak akan dapat menggunakan integrasi tersebut di halaman AMP. Sama seperti Skrip Konektor, `amp-access-laterpay` menyediakan kumpulan fitur serupa tetapi dibuat untuk halaman AMP.

Ada juga kemungkinan untuk menjual konten melalui LaterPay hanya dengan menggunakan `amp-access-laterpay` sebagai satu-satunya metode integrasi.

Komponen `amp-access-laterpay` menggunakan AMP Access secara internal untuk memberikan perilaku yang mirip dengan AMP Access, tetapi disesuaikan untuk penggunaan dengan layanan LaterPay.

Jika Anda memiliki layanan paywall sendiri yang ingin Anda gunakan dengan AMP Access, dan Anda ingin menggunakannya bersama dengan LaterPay di halaman yang sama, [hal itu juga dapat dilakukan](#using-amp-access-laterpay-together-with-amp-access).

Komponen `amp-access-laterpay` tidak memerlukan konfigurasi pingback atau otorisasi, karena telah dikonfigurasi sebelumnya untuk berfungsi dengan layanan LaterPay. Komponen ini juga tidak memerlukan penyiapan link login secara manual.

Opsi pembelian yang berbeda dapat dikonfigurasi di akun LaterPay penayang, dan komponen akan mengambil konfigurasi serta membuat daftar opsi pembelian yang tersedia.

Anda dapat membaca dokumentasi tentang cara mengonfigurasi [Konektor LaterPay](https://docs.laterpay.net/connector/configuration/), integrasi front-end LaterPay yang ada, untuk mempelajari cara mengonfigurasi opsi pembelian.

Daftar yang dihasilkan dapat diberi gaya dan ditampilkan sesuai dengan preferensi penayang.

Komponen ini juga mengandalkan [Markup Konten Akses](amp-access.md#access-content-markup) untuk menampilkan dan menyembunyikan konten.

## Konfigurasi <a name="configuration"></a>

Konfigurasi mirip dengan AMP Access, tetapi tanpa memerlukan otorisasi, pingback, dan link login.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>

```

Nilai berikut dapat ditetapkan dalam objek konfigurasi `laterpay`:

<table>
  <tr>
    <th class="col-fourty">Properti</th>
    <th class="col-twenty">Nilai</th>
    <th class="col-fourty">Deskripsi</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>Pemilih CSS <strong>diperlukan</strong></td>
    <td>Pemilih CSS yang menentukan elemen di halaman yang memuat judul artikel. Properti ini memastikan halaman yang ditampilkan untuk pembelian artikel akan memuat judul ini sehingga pengguna mengetahui apa yang mereka beli.</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>Daftar ID yang dipisahkan koma</td>
    <td>Secara default, URL artikel digunakan untuk mencocokkannya dengan opsi pembelian, tetapi bukannya menentukan jalur URL untuk opsi pembelian, Anda dapat menetapkan ID Artikel di UI Konektor LaterPay, dan kemudian menggunakan properti <code>articleId</code> untuk mencocokkan artikel dengan opsi pembelian.
      <br>
        Hal ini penting dalam kasus ketika pencocokan opsi pembelian menurut URL artikel dianggap tidak cukup fleksibel. Lihat <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">halaman konfigurasi Konektor LaterPay()</a> untuk melihat beberapa contoh skenario yang berguna.</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>Token JWT untuk konfigurasi pembayaran dinamis</td>
        <td>Opsi ini memungkinkan Anda menentukan Token Web JSON yang ditandatangani dengan konfigurasi untuk konten berbayar yang tersedia. Ini artinya Anda dapat menyediakan suatu konfigurasi dalam halaman yang dibuat secara terprogram di halaman Anda, bukannya menentukannya secara manual pada antarmuka Admin Connector LaterPay. Hal ini dapat sangat berguna ketika mengonfigurasi Pembelian Tunggal untuk banyak artikel berbeda.
          <br>
            Jika Anda menginginkan informasi lebih lanjut tentang cara membuat token ini dan konten apa yang dapat ditentukan di dalamnya, silakan baca dokumentasi <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">JWT Paid Content API</a> LaterPay untuk integrasi Skrip Konektor.
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>string</td>
          <td>Menentukan gaya pemformatan harga yang sesuai untuk lokal tersebut.</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>objek</td>
          <td>Memungkinkan penayang menyesuaikan atau melokalkan teks yang ada dalam daftar opsi pembelian yang dihasilkan. Lihat bagian <a href="#localization">Pelokalan</a> untuk informasi lebih lanjut.</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>boolean</td>
          <td>Jika ditetapkan ke true, men-scroll halaman ke atas setelah proses otorisasi berhasil. Hal ini dapat membantu jika tempat Anda menampilkan dialog berada jauh di bawah halaman dan pengguna mungkin dibingungkan dengan posisi scroll mereka saat ini setelah kembali ke halaman.</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>string</td>
          <td>Menentukan apakah Anda berada di <a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">wilayah LaterPay</a> <code>eu</code> atau <code>us</code>.</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>boolean</td>
          <td>Hanya diperlukan jika Anda menggunakan mode sandbox untuk menguji konfigurasi server. Anda juga harus menggunakan <a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">mode pengembangan</a> AMP.</td>
        </tr>
      </table>

## Menggunakan Markup Konten Akses dan menampilkan daftar pembelian <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

Markup Konten Akses harus digunakan dengan cara yang sama seperti AMP Access.

Elemen dengan ID `amp-access-laterpay-dialog` akan merender daftar opsi pembelian jika pengguna tidak memiliki akses ke artikel. Daftar ini memiliki penataan gaya yang sangat dasar dan dapat disesuaikan agar lebih terintegrasi di halaman penayang.

Pastikan Anda menambahkan class `amp-access-laterpay` jika ingin menggunakan penataan gaya default.

```html
<section amp-access="NOT error AND NOT access" amp-access-hide="">
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  Oops... Something broke.
</section>

<div amp-access="access" amp-access-hide="">
  <p>...article content...</p>
</div>

```

## Penataan gaya <a name="styling"></a>

Beberapa class diterapkan pada beberapa elemen dalam markup yang dihasilkan. Elemen yang tidak memiliki class dapat dirujuk dengan jelas melalui pemilih elemen CSS.

Beberapa CSS tata letak dasar sudah tersedia, tetapi sebaiknya penayang menata gayanya agar cocok dengan tampilan dan nuansa halamannya.

Struktur yang dibuat untuk dialog terlihat seperti berikut:

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Optional, appears if header locale message is defined.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">Purchase option title</span>
              <p class="amp-access-laterpay-description">Purchase option description</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">0.15</span>
            <sup class="amp-access-laterpay-currency">USD</sup>
          </p>
        </li>
        <!-- ... more list items for other purchase options ... -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">Beli Sekarang</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="...">I already bought this</a>
      </p>
      <p class="amp-access-laterpay-footer">
        Optional, appears if footer locale message is defined.
      </p>
    </div>
    <p class="amp-access-laterpay-badge">Powered by <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
  </div>

```

## Pelokalan <a name="localization"></a>

Teks yang ditampilkan dalam dialog untuk opsi pembelian akan ditentukan oleh penayang di UI Konektor LaterPay.

Teks lainnya adalah bagian dari komponen yang diperluas dan dapat diubah serta dilokalkan melalui opsi konfigurasi sebagai berikut:

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

Kunci pesan berikut dapat diterjemahkan atau disesuaikan, tetapi perhatikan bahwa kunci pesan tersebut harus mempertahankan makna dan maksud aslinya.

<table>
  <tr>
    <th class="col-fourty">Kunci</th>
    <th class="col-fourty">Deskripsi</th>
    <th>Nilai default</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>Teks yang ditampilkan di tombol beli untuk opsi yang dapat dibayar nanti.</td>
    <td>'Buy Now, Pay Later'</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>Teks yang ditampilkan di tombol beli untuk opsi yang harus dibayar pada saat pembelian.</td>
    <td>'Buy Now'</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>Teks default yang ditampilkan di tombol beli sebelum opsi apa pun dipilih.</td>
    <td>'Buy Now'</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>Jika pernah membeli artikel ini tetapi kehilangan cookie-nya (atau menggunakan perangkat lain), pengguna dapat menggunakan link ini untuk login ke LaterPay dan mengambil pembelian mereka.</td>
    <td>'I already bought this'</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>Teks header opsional.</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>Teks footer opsional.</td>
    <td></td>
  </tr>
</table>

## Analisis <a name="analytics"></a>

Karena didasarkan pada `amp-access`, `amp-access-laterpay` mendukung semua [peristiwa analisis](amp-access.md#integration-with-amp-analytics) yang dikirim oleh `amp-access`.

Semua contoh di [https://ampexample.laterpay.net/](https://ampexample.laterpay.net/) dikonfigurasi untuk mengirimkan peristiwa analisis ini jika Anda ingin melihat contoh lengkap penggunaan sebenarnya.

## Menggunakan LaterPay AMP Access bersama dengan AMP Access <a name="using-amp-access-laterpay-together-with-amp-access"></a>

Jika sudah memiliki sistem langganan dan ingin menggunakan LaterPay hanya untuk penjualan artikel tertentu, Anda dapat menerapkan kedua metode penjualan di halaman yang sama, menggunakan AMP Access dan LaterPay AMP Access bersama.

Pertama-tama, pelajari dokumentasi [AMP Access](amp-access.md) untuk mengetahui cara mengonfigurasi AMP Access dengan paywall yang ada.

Bagian [banyak penyedia](amp-access.md#multiple-access-providers) menjelaskan cara menyiapkan banyak penyedia dengan namespace.

Saat menggunakannya dengan LaterPay dan integrasi paywall yang ada, konfigurasi yang diperlukan dapat terlihat seperti ini:

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

Sedangkan markup akses konten dapat terlihat seperti ini:

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Login here to access your PublisherName subscription.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  Oops... Something broke.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...article content...</p>
</div>

```

Anda dapat menemukan contoh yang lebih lengkap di [https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html)

## Dokumentasi Terkait <a name="related-documentation"></a>

* [AMP Access](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay: Cara kami menjalankan Pembayaran Mikro](https://docs.laterpay.net/how_we_do_micropayments/)
* [Konektor LaterPay](https://connectormwi.laterpay.net/docs/index.html) - Mirip dengan AMP Access LaterPay tetapi untuk halaman non-AMP.

## Validasi <a name="validation"></a>

Lihat [aturan amp-access-laterpay](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii) dalam spesifikasi validator AMP.
