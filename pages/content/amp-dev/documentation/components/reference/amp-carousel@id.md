---
$category@: layout
formats:
- websites
- email
- ads
teaser:
  text: Displays multiple similar pieces of content along a horizontal axis.
---


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

# amp-carousel

Carousel generik untuk menampilkan beberapa konten serupa secara bergantian sepanjang sumbu horizontal; yang dimaksudkan untuk memiliki fleksibilitas dan performa tinggi.

<table>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Tata Letak yang Didukung</a></strong></td>
    <td>
      <ul>
        <li>carousel: fixed, fixed-height, dan nodisplay.</li>
        <li>slide: fill, fixed, fixed-height, flex-item, nodisplay, dan responsive.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Contoh</strong></td>
    <td>AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">Contoh amp-carousel</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">Galeri gambar dengan amp-carousel</a></li></ul></td>
    </tr>
  </table>

# Perilaku

Setiap turunan langsung komponen `amp-carousel` dianggap sebagai item dalam carousel. Masing-masing node ini mungkin juga memiliki sembarang turunan HTML.

Carousel terdiri dari sejumlah item, juga panah navigasi opsional untuk maju atau mundur satu item.

Carousel berpindah-pindah item jika pengguna menggeser, menggunakan tombol panah, atau mengklik panah navigasi opsional.

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="313" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Berpindah ke slide tertentu

Apabila metode untuk atribut `on` pada suatu elemen ditetapkan ke `tap:carousel-id.goToSlide(index=N)`, saat pengguna menge-tap atau mengklik, carousel dengan ID "carousel-id" akan menuju ke slide yang berada pada index=N (slide pertama berada pada index=0, slide kedua berada pada index=1, dan seterusnya).

Pada contoh berikut, terdapat carousel tiga gambar dengan tombol pratinjau di bawah carousel. Saat pengguna mengklik salah satu tombol, item carousel yang terkait akan ditampilkan.

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="878" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.advance-slide.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Atribut

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>Menentukan jenis tampilan untuk item carousel, yang dapat berupa:
      <ul>
        <li><code>carousel</code> (default): Semua slide ditampilkan dan dapat di-scroll secara horizontal. Jenis ini hanya mendukung tata letak berikut: <code>fixed</code>, <code>fixed-height</code> dan <code>nodisplay</code>.</li>
        <li><code>slides</code> : Menampilkan slide per satu. Jenis ini mendukung tata letak berikut: <code>fill</code>, <code>fixed</code>, <code>fixed-height</code>, <code>flex-item</code>, <code>nodisplay</code>, dan <code>responsive</code>.</li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>height (wajib)</strong></td>
      <td>Menentukan tinggi carousel, dalam piksel.</td>
    </tr>
    <tr>
      <td width="40%"><strong>controls (opsional)</strong></td>
      <td>Menampilkan panah kiri dan kanan secara permanen agar pengguna dapat menavigasi item carousel di perangkat seluler.
          Pada perangkat seluler, secara default panah navigasi akan menghilang setelah beberapa detik.
          Visibilitas panah juga dapat dikontrol melalui penataan gaya, dan kueri media dapat digunakan untuk hanya menampilkan panah pada lebar layar tertentu. Pada perangkat desktop, panah selalu ditampilkan kecuali jika hanya ada satu turunan.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-next-button-aria-label (opsional)</strong></td>
        <td>Menetapkan aria-label untuk <code>amp-carousel-button-next</code>. Jika tidak ada nilai yang ditentukan, aria-label akan didefaultkan ke 'Item berikutnya dalam carousel'.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-prev-button-aria-label (opsional)</strong></td>
        <td>Menetapkan aria-label untuk <code>amp-carousel-button-prev</code>. Jika tidak ada nilai yang ditentukan, aria-label akan didefaultkan ke 'Item sebelumnya dalam carousel'.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-button-count-format (opsional)</strong></td>
        <td>String format yang terlihat seperti <code>(%s of %s)</code>, digunakan sebagai akhiran aria-label untuk <code>amp-carousel-button-next</code>/<code>amp-carousel-button-prev</code>. Nilai ini memberikan informasi kepada pengguna pembaca layar tentang progres mereka dalam carousel. Jika tidak ada nilai yang ditentukan, atribut ini akan didefaultkan ke '(%s dari %s)'.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay (opsional)</strong></td>
        <td>Memindahkan slide ke slide berikutnya tanpa interaksi pengguna.<br>
          Jika atribut ini ada tanpa nilai:
          <ul>
            <li>Secara default, slide berpindah dalam interval 5000 milidetik (5 detik); nilai ini dapat diganti dengan atribut <code>delay</code>.</li>
            <li>Atribut <code>loop</code> ditambahkan ke <code>amp-carousel</code> jika <code>loop</code> belum ada.</li>
            <li>Perlu setidaknya 2 slide agar autoplay dapat berjalan.</li>
            <li>Hanya berlaku untuk carousel dengan <code>type=slides</code>.</li>
          </ul>
          Jika atribut ini ada dengan nilai:
          <ul>
            <li>Atribut <code>loop</code> ditambahkan ke<code>amp-carousel</code> jika <code>loop</code> belum ada.</li>
            <li>Atribut <code>loop</code> dihapus setelah jumlah loop yang diperlukan dilakukan.</li>
          </ul></td>
        </tr>
        <tr>
          <td width="40%"><strong>delay (opsional)</strong></td>
          <td>Menentukan durasi (dalam milidetik) untuk menunda perpindahan ke slide berikutnya saat <code>autoplay</code> diaktifkan. Atribut <code>delay</code> hanya berlaku untuk carousel dengan <code>type=slides</code>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop (opsional)</strong></td>
          <td>Memungkinkan pengguna berpindah melewati item pertama atau item akhir. Harus ada minimal 3 slide agar loop dapat dilakukan. Atribut <code>loop</code> hanya berlaku untuk carousel dengan <code>type=slides</code>.
            <em>Contoh: Menampilkan carousel slide dengan kontrol, loop, dan autoplay tertunda.</em>
            <!--embedded example - displays in ampproject.org -->
            <div>
              <amp-iframe height="446" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.controls.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
                <div aria-label="Tampilkan selengkapnya" overflow="" tabindex="0" role="button">Tampilkan kode lengkap</div>
                <div placeholder=""></div>
              </amp-iframe>
            </div></td>
          </tr>
          <tr>
            <td width="40%"><strong>atribut umum</strong></td>
            <td>Elemen ini mencakup <a href="https://www.ampproject.org/docs/reference/common_attributes">atribut umum</a> yang diperluas ke komponen AMP.</td>
          </tr>
        </table>

# Penataan gaya

* Anda dapat menggunakan pemilih elemen `amp-carousel` untuk menata gayanya dengan bebas.
* Anda dapat menggunakan pemilih class `.amp-carousel-slide` untuk menargetkan item carousel.
* Status visual tombol `amp-carousel` saat nonaktif disembunyikan.
* Secara default, `.amp-carousel-button` menggunakan SVG inline sebagai gambar latar tombol. Anda dapat menggantinya dengan SVG atau gambar Anda sendiri seperti pada contoh di bawah ini.

*Contoh: SVG inline `.amp-carousel-button` default*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*Contoh: Mengganti SVG inline `.amp-carousel-button` default*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# Validasi

Lihat [aturan amp-carousel](https://github.com/ampproject/amphtml/blob/master/extensions/amp-carousel/validator-amp-carousel.protoascii) dalam spesifikasi validator AMP.
