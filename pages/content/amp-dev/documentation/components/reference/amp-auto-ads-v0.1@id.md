---
$title: amp-auto-ads
$category@: ads-analytics
teaser:
  text: Dynamically injects ads into an AMP page by using a remotely-served configuration file.
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



Memasukkan iklan secara dinamis ke halaman AMP dengan menggunakan file konfigurasi yang ditayangkan secara jarak jauh.

<table>
  <tr>
    <td class="col-fourty"><strong>Ketersediaan</strong></td>
    <td>Eksperimental</td>
  </tr>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td>
      <code>
      &lt;script async custom-element="amp-auto-ads"
      src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">&lt;/script>
        </code>
      </td>
    </tr>
    <tr>
      <td class="col-fourty">
        <strong>
          <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">
            Tata Letak yang Didukung
          </a>
        </strong>
      </td>
      <td>T/A</td>
    </tr>
  </table>


## Perilaku

Dengan jumlah penempatan valid yang memadai (yang disediakan dalam konfigurasi), `amp-auto-ads` mencoba memasukkan iklan tambahan dengan tetap mematuhi sejumlah batasan yang ditetapkan oleh jaringan iklan. Batasan tersebut akan membatasi:

* Jumlah total iklan yang dapat dimasukkan
* Jarak minimum yang harus ada di antara iklan yang berdekatan

Selain itu, iklan hanya boleh dimasukkan di lokasi pada halaman yang tidak menyebabkan alur ulang yang tidak dapat diterima (sebagaimana ditentukan oleh attemptChangeSize).

Tag `<amp-auto-ads>` harus ditempatkan sebagai turunan pertama dari `<body>`.

Jenis jaringan iklan dan informasi tambahan apa pun (yang diperlukan oleh jaringan iklan) harus ditentukan di tag.
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
  </amp-auto-ads>
```

## Jaringan iklan yang didukung <a name="supported-ad-networks"></a>

* [AdSense](https://github.com/ampproject/amphtml/blob/master/ads/google/adsense.md)
* [DoubleClick (eksperimental)](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md)

## Atribut

<table>
  <tr>
    <td width="40%"><strong>type (wajib)</strong></td>
    <td>ID untuk jaringan iklan.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>Sebagian besar jaringan iklan memerlukan konfigurasi lebih lanjut, yang dapat diteruskan ke jaringan menggunakan atribut <code>data-</code> HTML. Nama parameter tunduk pada tanda pisah atribut data standar untuk konversi camel case. Misalnya, "data-foo-bar" akan dikirim ke iklan untuk dikonfigurasi sebagai "fooBar". Lihat dokumentasi <a href="#supported-ad-networks">jaringan iklan</a> tentang atribut mana saja yang dapat digunakan.</td>
  </tr>
  <tr>
    <td width="40%"><strong>atribut umum</strong></td>
    <td>Elemen ini mencakup <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atribut umum</a> yang diperluas ke komponen AMP.</td>
  </tr>
</table>

## Spesifikasi Konfigurasi

Konfigurasi menentukan lokasi pada halaman tempat `<amp-auto-ads>` dapat menempatkan iklan. Konfigurasi ini diambil dari jaringan iklan pihak ketiga pada URL yang ditentukan di `ad-network-config.js`. Konfigurasi tersebut harus berupa objek JSON serial yang cocok dengan definisi [`ConfigObj`](#configobj) yang dideskripsikan di bawah.

### Konfigurasi Contoh

Contoh berikut menentukan bahwa iklan harus diposisikan tepat setelah semua elemen `<P class='paragraph'>` yang berada dalam `<DIV id='domId'>` ketiga di halaman itu. Iklan yang ditempatkan di salah satu posisi tersebut harus berjenis BANNER dan memiliki margin atas 4 piksel dan margin bawah 10 piksel.

```json
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#domId",
        "index": 2,
        "sub": {
          "selector": "P.paragraph",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}
```

### Definisi Objek

#### ConfigObj <a name="configobj"></a>

Kolom yang perlu ditentukan dalam objek konfigurasi:

<table>
  <tr>
    <th class="col-thirty">Nama Kolom</th>
    <th class="col-thirty">Jenis</th>
    <th class="col-fourty">Deskripsi</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Array&lt;!PlacementObj&gt;</td>
    <td>Kolom <strong>wajib</strong> yang menunjukkan tempat potensial di mana iklan dapat dimasukkan di halaman.</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Objek&lt;string, string&gt;</td>
    <td>Kolom <em>opsional</em> yang menentukan pemetaan dari nama atribut ke nilai atribut yang akan diterapkan ke semua elemen <code>&lt;amp-ad&gt;</code> yang dimasukkan menggunakan konfigurasi ini. Hanya nama atribut berikut yang diizinkan:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (artinya, sembarang atribut data)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
      Kolom <em>opsional</em> yang menentukan batasan yang harus digunakan saat menempatkan iklan di halaman. Jika tidak ditentukan, maka <code>amp-auto-ads</code> akan mencoba menggunakan batasan default yang ditentukan dalam [ad-network-config.js](0,1/ad-network-config.js).
    </td>
  </tr>
</table>

#### PlacementObj

Kolom yang perlu ditentukan dalam objek konfigurasi `placements`:

<table>
  <tr>
    <th class="col-thirty">Nama Kolom</th>
    <th class="col-thirty">Jenis</th>
    <th class="col-fourty">Deskripsi</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td>Kolom <strong>wajib</strong> yang menyediakan informasi yang digunakan untuk mencari elemen di halaman tempat posisi penempatan ditautkan.
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td>Kolom <strong>wajib</strong> yang menunjukkan posisi penempatan relatif terhadap elemen anchor-nya.</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td>Kolom <strong>wajib</strong> yang menunjukkan jenis penempatan.</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>Kolom <em>opsional</em> yang menunjukkan gaya yang harus diterapkan pada iklan yang dimasukkan dalam posisi penempatan ini.
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Objek&lt;string, string&gt;</td>
    <td>Kolom <em>opsional</em> yang menentukan pemetaan dari nama atribut ke nilai atribut yang akan diterapkan ke semua elemen <code>&lt;amp-ad&gt;</code> yang dimasukkan menggunakan penempatan ini. Atribut yang ditentukan di sini mengganti semua atribut dengan nama yang sama yang juga ditentukan pada <code>ConfigObj</code> induk. Hanya nama atribut berikut yang diizinkan:
      <ul>
        <li>jenis</li>
        <li>tata letak</li>
        <li>data-* (artinya, sembarang atribut data)</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

Kolom yang perlu ditentukan dalam objek konfigurasi `anchor`:

<table>
  <tr>
    <th class="col-thirty">Nama Kolom</th>
    <th class="col-thirty">Jenis</th>
    <th class="col-fourty">Deskripsi</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>string</td>
    <td>Kolom <strong>wajib</strong> yang menentukan pemilih CSS untuk memilih elemen pada level definisi anchor ini.
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>angka</td>
    <td>Kolom <em>opsional</em> untuk menentukan indeks elemen yang dipilih oleh pemilih yang menjadi batas dari level definisi anchor ini. Secara default, nilainya ditetapkan ke 0 (jika kolom <code>all</code> ditetapkan ke false).</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>boolean</td>
    <td>Diabaikan jika kolom <code>index</code> telah ditentukan. Jika ditetapkan ke <code>true</code>, semua elemen yang dipilih oleh pemilih harus disertakan; jika tidak tetapkan ke <code>false</code>.
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>angka</td>
    <td>Kolom <em>opsional</em> yang menentukan panjang minimum properti textContent elemen agar dapat disertakan. Nilai defaultnya adalah 0.</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td>Kolom <em>opsional</em> yang menentukan <code>AnchorObj</code> berulang yang akan memilih elemen dalam setiap elemen yang dipilih pada level definisi anchor ini.
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

Kolom yang perlu ditentukan dalam objek konfigurasi `style`:

<table>
  <tr>
    <th class="col-twenty">Nama Kolom</th>
    <th class="col-twenty">Jenis</th>
    <th class="col-fourty">Deskripsi</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>angka</td>
    <td>Kolom <em>opsional</em> yang menunjukkan margin atas dalam piksel yang harus dimiliki oleh iklan yang dimasukkan dalam posisi ini. Nilai defaultnya 0.
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>angka</td>
    <td>Kolom <em>opsional</em> yang menunjukkan margin bawah dalam piksel yang harus dimiliki oleh iklan yang dimasukkan dalam posisi ini. Nilai defaultnya 0.
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

Nilai ENUM untuk kolom `pos` dalam objek konfigurasi `placements`:

<table>
  <tr>
    <th class="col-fourty">Nama</th>
    <th class="col-twenty">Nilai</th>
    <th class="col-fourty">Deskripsi</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>Iklan harus segera dimasukkan sebagai kerabat tepat sebelum anchor.</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>Iklan harus dimasukkan sebagai turunan pertama dari anchor.</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>Iklan harus dimasukkan sebagai turunan terakhir dari anchor.</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>Iklan harus dimasukkan sebagai kerabat tepat segera setelah anchor.</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

Nilai ENUM untuk kolom `type` dalam objek konfigurasi `placements`:

<table>
  <tr>
    <th class="col-fourty">Nama</th>
    <th class="col-twenty">Nilai</th>
    <th class="col-fourty">Deskripsi</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>Penempatan mendeskripsikan posisi iklan banner.</td>
  </tr>
</table>

#### AdConstraintsObj

Kolom yang perlu ditentukan dalam objek konfigurasi `adConstraints`:

<table>
  <tr>
    <th class="col-twenty">Nama Kolom</th>
    <th class="col-twenty">Jenis</th>
    <th class="col-fourty">Deskripsi</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>string</td>
    <td>
      Kolom <strong>wajib</strong> yang menunjukkan jarak minimum iklan dari iklan lain yang sudah ada di halaman itu (baik yang ditempatkan secara manual atau ditempatkan sebelumnya oleh atribut amp-auto-ads) pada saat iklan dimasukkan.
      Nilai dinyatakan sebagai angka dengan prefiks satuan. Misalnya, "10px" berarti 10 piksel, atau "0.5vp" berarti setengah tinggi viewport. Nilai negatif tidak valid. Satuan yang didukung adalah:
      <ul>
        <li>px - piksel</li>
        <li>vp - kelipatan dari tinggi viewport</li>
      </ul>
      Nilai ini hanya berlaku jika jumlah iklan yang sudah ada di halaman itu kurang dari <code>adCount</code> matcher yang ditentukan dalam kolom subsequentMinSpacing.
    </td>
  </tr>
  <tr>
    <td><code>subsequentMinSpacing</code></td>
    <td>Array&lt;!SubsequentMinSpacingObj&gt;</td>
    <td>
      Kolom <em>opsional</em> yang menentukan jarak iklan yang harus diterapkan berdasarkan jumlah iklan yang sudah ada di halaman itu pada saat iklan dimasukkan.
    </td>
  </tr>
  <tr>
    <td><code>maxAdCount</code></td>
    <td>angka</td>
    <td>
      Kolom <strong>wajib</strong> yang menentukan jumlah maksimum iklan yang dapat ditempatkan <code>amp-auto-ads</code> di halaman itu. Baik iklan yang ditempatkan secara manual maupun yang ditempatkan oleh atribut <code>amp-auto-ads</code> akan memengaruhi jumlah total ini.
      Misalnya, jika kolom ini ditetapkan ke 5 dan ada 3 iklan yang ditempatkan secara manual di halaman itu, maka <code>amp-auto-ads</code> bisa menempatkan maksimal 2 iklan tambahan.
    </td>
  </tr>
</table>

#### SubsequentMinSpacingObj

Kolom yang perlu ditentukan dalam objek konfigurasi `subsequentMinSpacing`. Entri `subsequentMinSpacing` dapat digunakan untuk mengubah jarak yang diperlukan antara iklan tambahan berdasarkan jumlah iklan yang sudah ada di halaman itu. Sebagai contoh, perhatikan skenario berikut:

* 2 iklan sudah ada di halaman
* Kolom subsequentMinSpacing adalah:
<code>
  [
    {adCount: 3, spacing: "500px"},
    {adCount: 5, spacing: "1000px"},
  ]
</code>

Pada awalnya, sudah ada 2 iklan di halaman itu, jadi tidak ada pemetaan yang cocok.
Oleh karena itu, jarak minimum dalam objek `AdConstraints` didefaultkan ke initialMinSpacing.
Atribut `amp-auto-ads` akan terus mencoba untuk menempatkan iklan hingga penempatan yang dapat digunakan habis tanpa melanggar `adContraints`.
Setelah `amp-auto-ads` menempatkan iklan pertamanya, sekarang ada 3 iklan di halaman itu. Karena ada pemetaan untuk 3 (atau lebih) iklan dalam `subsequentMinSpacing`, jarak minimalnya sekarang menjadi 500 piksel.
Hal ini akan berlaku hingga jumlah iklan di halaman itu mencapai 5 buah, karena adanya aturan 5 iklan. Memasukkan iklan ke-6 atau seterusnya akan mengharuskan dihapusnya iklan lain hingga setidaknya 1000 piksel.

<table>
  <tr>
    <th class="col-twenty">Nama Kolom</th>
    <th class="col-twenty">Jenis</th>
    <th class="col-fourty">Deskripsi</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>angka</td>
    <td>
      Kolom <strong>wajib</strong>.
      Jumlah minimum iklan yang sudah ada di halaman yang menyebabkan aturan ini berlaku (dengan asumsi tidak ada aturan lain yang lebih cocok). Lihat deskripsi di atas untuk penjelasan lebih lengkap.
    </td>
  </tr>
  <tr>
    <td><code>spacing</code></td>
    <td>string</td>
    <td>
      Kolom <strong>wajib</strong> yang menentukan jarak minimum iklan yang berlaku ketika aturan ini terpenuhi berdasarkan <code>adCount</code>.
      Nilai dinyatakan sebagai angka dengan prefiks satuan. Misalnya, "10px" berarti 10 piksel, atau "0.5vp" berarti setengah tinggi viewport. Nilai negatif tidak valid. Satuan yang didukung adalah:
      <ul>
        <li>px - piksel</li>
        <li>vp - kelipatan dari tinggi viewport</li>
      </ul>
    </td>
  </tr>
</table>

## Validasi

Lihat [aturan iklan otomatis AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii) dalam spesifikasi validator AMP.
