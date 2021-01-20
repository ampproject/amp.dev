---
$title: amp-iframe
$category@: layout
teaser:
  text: Displays an iframe.
---


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



Menampilkan iframe.


<table>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Contoh</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">Contoh kode beranotasi untuk amp-iframe</a></td>
  </tr>
</table>

# Perilaku <a name="behavior"></a>

`amp-iframe` memiliki beberapa perbedaan penting dibandingkan iframe vanilla yang dirancang untuk menjadikannya lebih aman dan menghindari file AMP yang didominasi oleh iframe tunggal:

* `amp-iframe` tidak akan muncul di dekat bagian atas dokumen (kecuali untuk iframe yang menggunakan `placeholder` seperti dijelaskan [di bawah](#iframe-with-placeholder)). iframe harus berjarak 600 piksel dari atas, atau tidak dalam 75% pertama dari viewport saat di-scroll ke atas, salah satu yang lebih kecil.
* Secara default, amp-iframe ditempatkan dalam sandbox (lihat [detail](#sandbox)).
* `amp-iframe` hanya boleh meminta resource melalui HTTPS, dari data-URI, atau melalui atribut `srcdoc`.
* `amp-iframe` tidak boleh berada dalam asal yang sama dengan container kecuali jika `allow-same-origin` tidak diizinkan dalam atribut `sandbox`. Lihat dokumen [“Kebijakan asal iframe”](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md) untuk penjelasan selengkapnya mengenai asal yang diizinkan untuk iframe.

*Contoh: Menyematkan Google Map di dalam amp-iframe*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

Dirender sebagai:

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&amp;q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="success"]
Untuk melihat demo `amp-iframe` lainnya, buka [AMP By Example](https://ampbyexample.com/components/amp-iframe/).
[/tip]

# Penggunaan amp-iframe untuk iklan <a name="usage-of-amp-iframe-for-advertising"></a>

`amp-iframe` **tidak boleh** digunakan dengan maksud utama untuk menampilkan iklan. Anda BOLEH menggunakan `amp-iframe` untuk menampilkan video, di mana bagian dari video tersebut merupakan iklan. Kebijakan AMP ini dapat diberlakukan dengan tidak merender iframe yang terkait.

Untuk kasus penggunaan iklan, gunakan [`amp-ad`](amp-ad.md).

Alasan penggunaan kebijakan ini adalah:

* `amp-iframe` memberlakukan sandboxing dan sandbox juga diterapkan pada iframe turunan. Artinya, halaman landing mungkin rusak, meskipun iklan itu sendiri tampak berfungsi.
* `amp-iframe` tidak menyediakan mekanisme apa pun untuk meneruskan konfigurasi ke iframe.
* `amp-iframe` tidak memiliki mekanisme pengubahan ukuran terkontrol iframe sepenuhnya.
* Informasi visibilitas mungkin tidak tersedia untuk `amp-iframe`.

# Atribut <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Atribut <code>src</code> berperilaku sangat mirip dengan iframe standar dengan satu pengecualian: fragmen <code>#amp=1</code> ditambahkan ke URL untuk memberi tahu dokumen sumber bahwa ia disematkan dalam konteks AMP. Fragmen ini hanya akan ditambahkan jika URL yang ditentukan oleh <code>src</code> belum memiliki fragmen.</td>
  </tr>
  <tr>
    <td width="40%"><strong>srcdoc, frameborder, allowfullscreen, allowpaymentrequest, allowtransparency, referrerpolicy</strong></td>
    <td>Semua atribut ini berperilaku dengan cara yang sama seperti pada iframe standar.
      <br>
        Jika <code>frameborder</code> tidak ditentukan, secara default, nilainya akan ditetapkan ke <code>0</code>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
        <td>iframe yang dibuat oleh <code>amp-iframe</code> selalu memiliki atribut <code>sandbox</code> yang ditentukan. Secara default, nilainya adalah kosong, yang berarti bahwa nilai tersebut adalah "nilai maksimum sandbox". Dengan menetapkan nilai <code>sandbox</code>, pengguna dapat memilih agar iframe tidak terlalu diamankan dalam sandbox. Semua nilai yang didukung oleh browser diizinkan. Contohnya, menetapkan <code>sandbox="allow-scripts"</code> akan memungkinkan iframe menjalankan JavaScript, atau <code>sandbox="allow-scripts allow-same-origin"</code> akan memungkinkan iframe menjalankan JavaScript, membuat non-CORS XHR, dan membaca/menulis cookie.
          <br><br>
            Jika Anda membingkai dokumen dengan iframe yang tidak dibuat secara khusus dengan memperhatikan penerapan sandbox, besar kemungkinan Anda harus menambahkan <code>allow-scripts allow-same-origin</code> ke atribut <code>sandbox</code> dan mungkin perlu mengizinkan kemampuan tambahan.
            <br><br>
              Perhatikan juga bahwa sandbox berlaku untuk semua jendela yang dibuka dari iframe dalam sandbox. Ini termasuk jendela baru yang dibuat oleh link dengan <code>target=_blank</code> (tambahkan <code>allow-popups</code> untuk memungkinkan terjadinya hal ini). Dengan menambahkan <code>allow-popups-to-escape-sandbox</code> ke atribut <code>sandbox</code>, jendela baru tersebut akan berperilaku seperti jendela baru yang tidak berada dalam sandbox. Kemungkinan besar inilah perilaku yang Anda inginkan dan harapkan. Sayangnya, pada saat penulisan artikel ini, <code>allow-popups-to-escape-sandbox</code> hanya didukung oleh Chrome.
              <br><br>
                Lihat <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox">dokumen di MDN</a> untuk penjelasan selengkapnya mengenai atribut sandbox.</td>
              </tr>
              <tr>
                <td width="40%"><strong>atribut umum</strong></td>
                <td>Elemen ini mencakup <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atribut umum</a> yang diperluas ke komponen AMP.</td>
              </tr>
            </table>

# iframe dengan placeholder <a name="iframe-with-placeholder"></a>

Anda dapat memunculkan `amp-iframe` di bagian atas dokumen jika `amp-iframe` memiliki elemen `placeholder` seperti ditunjukkan pada contoh di bawah.

* `amp-iframe` harus memuat elemen dengan atribut `placeholder`, (misalnya elemen `amp-img`) yang akan dirender sebagai placeholder sampai iframe siap ditampilkan.
* Kesiapan iframe dapat diketahui dengan mendeteksi `onload` iframe atau `embed-ready` `postMessage`, yang akan dikirim oleh dokumen iframe, salah satu yang terjadi lebih dahulu.

*Contoh: iframe dengan placeholder*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow<-same-origin"
    src="https://foo.com/iframe"
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*Contoh: Permintaan iframe siap disematkan*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# Pengubahan ukuran iframe <a name="iframe-resizing"></a>

`amp-iframe` harus menggunakan tata letak statis seperti halnya elemen AMP lainnya. Namun, Anda dapat mengubah ukuran `amp-iframe` saat runtime. Untuk melakukannya:

1. `amp-iframe` harus ditetapkan dengan atribut `resizable`.
1. `amp-iframe` harus memiliki elemen turunan `overflow`.
1. `amp-iframe` harus menetapkan atribut sandbox `allow-same-origin`.
1. Dokumen iframe harus mengirimkan permintaan `embed-size` sebagai pesan jendela.
1. Permintaan `embed-size` akan ditolak jika tinggi permintaan kurang dari ambang batas tertentu (100 piksel).

Perhatikan bahwa `resizable` mengganti nilai `scrolling` ke `no`.

*Contoh: `amp-iframe` dengan elemen `overflow`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*Contoh: permintaan pengubahan ukuran iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

Setelah pesan ini diterima, AMP runtime akan mencoba mengakomodasi permintaan tersebut sesegera mungkin, tetapi dengan memperhitungkan di mana pembaca sedang membaca, apakah scroll sedang berlangsung, dan faktor UX atau performa lainnya. Jika runtime tidak dapat memenuhi permintaan pengubahan ukuran, `amp-iframe` akan menampilkan elemen `overflow`. Mengklik elemen `overflow` akan langsung mengubah ukuran `amp-iframe` karena dipicu oleh tindakan pengguna.

Berikut ini beberapa faktor yang memengaruhi seberapa cepat pengubahan ukuran akan dieksekusi:

* Apakah pengubahan ukuran dipicu oleh tindakan pengguna.
* Apakah pengubahan ukuran diminta untuk iframe yang sedang aktif.
* Apakah pengubahan ukuran diminta untuk iframe yang berada di bawah, atau di atas viewport.

# Visibilitas iframe <a name="iframe-viewability"></a>

iframe dapat mengirim pesan `send-intersections` kepada induknya agar mulai menerima [catatan perubahan](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) gaya IntersectionObserver untuk intersection iframe dengan viewport induk.

*Catatan: Dalam contoh berikut, kami menganggap skrip berada dalam iframe yang dibuat, dengan `window.parent` menjadi jendela paling atas. Jika skrip berada di iframe bertingkat, ubah `window.parent` ke jendela AMP paling atas.*

*Contoh: permintaan `send-intersections` iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

iframe dapat mendeteksi pesan `intersection` dari jendela induk untuk menerima data intersection.

*Contoh: permintaan `send-intersections` iframe*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

Pesan intersection akan dikirim oleh induk ke iframe saat iframe bergerak masuk atau keluar dari viewport (atau terlihat sebagian), ketika iframe di-scroll atau diubah ukurannya.

# iframe pelacakan/analisis <a name="trackinganalytics-iframes"></a>

Kami sangat merekomendasikan penggunaan [`amp-analytics`](amp-analytics.md) untuk keperluan analisis, karena solusi ini jauh lebih tangguh, lengkap, dan efisien yang dapat dikonfigurasi untuk berbagai vendor analisis.

AMP hanya mengizinkan satu iframe yang digunakan untuk keperluan pelacakan dan analisis, per halaman. Untuk menghemat resource, iframe ini akan dihapus dari DOM 5 detik setelah dimuat, yang mestinya cukup untuk menyelesaikan pekerjaan apa pun yang perlu dilakukan.

iframe diidentifikasi sebagai iframe pelacakan/analisis jika tampaknya tidak memiliki kegunaan pengguna langsung apa pun, misalnya iframe yang tidak terlihat atau kecil.

# Panduan: Prioritaskan komponen AMP yang ada daripada amp-iframe <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

Komponen `amp-iframe` harus dianggap sebagai fallback jika pengalaman pengguna yang diperlukan tidak dimungkinkan melalui cara lain di AMP; artinya, belum ada [komponen AMP](../../../documentation/components/index.html) untuk kasus penggunaan itu. Hal ini karena ada banyak manfaat dari penggunaan komponen AMP yang disesuaikan dengan kasus penggunaan tertentu seperti:

* Pengelolaan dan performa resource yang lebih baik
* Pada kasus tertentu, komponen kustom dapat memberikan gambar placeholder built-in. Dengan begitu pengguna dapat, misalnya, mendapatkan thumbnail video yang tepat sebelum video dimuat, dan mengurangi upaya coding untuk menambahkan placeholder secara manual.
* Pengubahan ukuran built-in. Hal ini berarti konten iframe dengan ukuran yang tidak dapat diprediksi dapat ditampilkan lebih sering kepada pengguna seolah-olah konten tersebut native untuk halaman itu, bukan dalam frame yang dapat di-scroll
* Fitur tambahan lainnya dapat tersedia secara built-in (misalnya, fitur autoplay untuk pemutar video)

# Validasi <a name="validation"></a>

Lihat [aturan amp-iframe](https://github.com/ampproject/amphtml/blob/master/extensions/amp-iframe/validator-amp-iframe.protoascii) dalam spesifikasi validator AMP.
