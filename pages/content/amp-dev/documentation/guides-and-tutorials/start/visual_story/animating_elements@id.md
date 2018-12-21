---
$title: Elemen animasi
---

Anda dapat menyempurnakan artikel AMP lebih lanjut dengan menyertakan animasi ke elemen di dalam halaman. Misalnya, Anda dapat membuat judul terbang dari kiri, atau jatuh ke halaman, atau muncul perlahan, dan seterusnya.  Framework artikel AMP memberikan animasi yang di-preset berikut:

<table>
<thead>
<tr>
  <th width="50%">Preset animasi</th>
  <th width="25%">Durasi default (md)</th>
  <th width="25%">Penundaan default (md)</th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

Untuk menerapkan penggunaan animasi pada elemen, Anda harus menetapkan <code>animate-in="<em>&lt;animation preset></em>"</code> dengan salah satu nilai preset animasi.  Misalnya, untuk menjatuhkan beberapa teks ke halaman, tambahan `animate-in="drop"` ke elemen teks:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="success"]

Cari tahu efek animasi yang berbeda dengan menambahkan atribut `animate-in="<animation preset>"` ke elemen di halaman artikel Anda.

[/tip]

## Pengaturan waktu animasi

Setiap preset animasi memiliki nilai waktu default bawaan untuk:

* **penundaan**: Ini adalah jumlah waktu untuk menunda proses memulai animasi.  Misalnya, penundaan selama .3s berarti animasi akan memasuki halaman setelah 0,3 detik. Penundaan selama 0s (0 detik) berarti animasi akan langsung masuk ke halaman.
* **durasi**: Ini adalah jumlah waktu animasi ditampilkan.  Misalnya, animasi memudar dari awal hingga akhir membutuhkan waktu 500ms (500 milidetik).

Anda dapat menyesuaikan waktu animasi dengan mengubah penundaan atau durasi melalui atribut `animate-in-delay` dan `animate-in-duration`. Dalam contoh berikut, `my-element` terbang dari kiri halaman setelah 0,3 detik, dan selesai terbang masuk dalam waktu 0,5 detik:

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </div>
</amp-story-page>
```

## Menganimasikan halaman terakhir kita

Halaman artikel AMP terakhir kita terdiri dari dua lapisan: lapisan pertama adalah kolase gambar hewan, sedangkan lapisan kedua menampilkan beberapa teks banner.  Untuk membuat halaman ini, **tambahkan** kode berikut tepat setelah halaman artikel Anda sebelumnya:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img src="assets/cat.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/dog.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/bird.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/rabbit.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```
Muat ulang artikel AMP di browser Anda, dan pastikan halaman tersebut dirender dengan benar dan terlihat seperti ini:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

Kelihatannya bagus, tapi semuanya tampak statis! Ayo kita animasikan!

Kita akan mulai dengan menganimasikan titik masuk teks banner dan menyetelnya agar melesat masuk dari kanan halaman. Tambahkan `animate-in="whoosh-in-right"` ke elemen `<p>` seperti berikut:

```html hl_lines="2"
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Muat ulang halaman artikel Anda di browser, dan pastikan banner bergerak cepat. 

Selanjutnya, mari kita buat semua gambar muncul perlahan. Tambahkan `animate-in="fade-in"` ke setiap elemen `amp-img` agar kode tampak seperti ini:

```html hl_lines="4 9 14 19"
<amp-img src="assets/cat.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/dog.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/bird.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/rabbit.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
```


Jika Anda memuat ulang halaman, masing-masing gambar akan muncul perlahan.  Itu akan tampak bagus, tetapi Anda hampir tidak dapat melihat efeknya karena semua gambar muncul perlahan secara bersamaan. Kita dapat meningkatkan efek visual dengan mengubah pengaturan waktu animasi ini.

Mari kita tunda masuknya gambar pertama sehingga gambar akan dimunculkan setelah banner teks masuk, misalnya .4s (0,4 detik). Tiga gambar yang tersisa dapat muncul .2s (0,2 detik) setelah gambar sebelumnya masuk. Untuk setiap elemen amp-img, tambahkan `animate-in-delay=""` dengan nilai waktu tunda yang sesuai. Kode Anda akan terlihat seperti ini:

```html hl_lines="5 11 17 23"
<amp-img src="assets/cat.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in" 
    animate-in-delay="0.4s">
</amp-img>
<amp-img src="assets/dog.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in" 
    animate-in-delay="0.6s">
</amp-img>
<amp-img src="assets/bird.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay=".8s">
</amp-img>
<amp-img src="assets/rabbit.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="1s">
</amp-img>

```

Muat ulang artikel Anda.  Halaman terakhir Anda akan terlihat seperti ini:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

Ada banyak kemungkinan yang bisa dilakukan pada animasi dalam artikel AMP (misalnya, menggabungkan animasi, membuat animasi berantai), dan tutorial ini hanya menjelaskan sebagian kecil saja. Untuk mempelajari animasi lebih lanjut, lihat dokumentasi referensi [amp-story](/id/docs/reference/components/amp-story.html#animations).


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/add_more_pages.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Sebelumnya</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_bookend.md', locale=doc.locale).url.path}}"><span class="arrow-next">Berikutnya</span></a>
</div>
 
