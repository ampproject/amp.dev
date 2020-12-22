---
"$title": Membuat bookend
"$order": '7'
description: Setelah Anda menambahkan semua halaman Anda, mari kita lihat layar terakhir dari cerita ini, bookend. Layar terakhir ini mengakhiri cerita ....
author: bpaduch
---

Setelah Anda menambahkan semua halaman Anda, mari kita lihat layar terakhir dari cerita ini, "bookend". Layar terakhir ini mengakhiri cerita, dan memungkinkan Anda untuk menampilkan opsi berbagi di media sosial dan tautan terkait di cerita Anda agar pengguna dapat membagikan berita tersebut atau mencari informasi lebih lanjut tentang konten lain di situs Anda.

The information on the bookend screen comes from a JSON file that's specified in the `<amp-story-bookend>` tag. For our tutorial, we already have a JSON file ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) that contains the bookend data.

Tag `<amp-story-bookend>` harus menjadi tag terakhir dalam [`amp-story`](../../../../documentation/components/reference/amp-story.md). Jadi, mari kita **tambahkan** `<amp-story-bookend></amp-story-bookend>` tepat sebelum tag `</amp-story>` penutup. Pada tag `amp-story-bookend`, arahkan atribut `src` ke berkas `bookend.json` dan tetapkan `layout="nodisplay"`:

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

Jika Anda memuat ulang browser dan menuju ke layar terakhir, Anda akan melihat bookend berikut ini:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

Let's look at the JSON file.  Open the [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) file in your text editor.

Every bookend screen requires a `bookendVersion`, which is `v1.0` for this tutorial:

```json
"bookendVersion": "v1.0",
```

Tombol berbagi sosial memungkinkan pembaca untuk membagikan konten Anda melalui platform media sosial, seperti Twitter, Facebook, Pinterest, dan lain-lain. Anda dapat menentukan penyedia berbagi sosial dalam objek shareProviders, dan membuat deretan atau rangkaian yang berisi [nama jenis](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) untuk setiap platform media sosial.

Untuk tutorial ini, kita memilih Facebook, Twitter, dan email sebagai penyedia kegiatan berbagi kita:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

The rest of the bookend screen is for related content.  All related content is contained in a `components` object.

Ada berbagai komponen yang dapat Anda gunakan untuk menampilkan tautan dan konten terkait; setiap komponen ditentukan dengan atribut jenis. Mari kita lihat komponen yang tersedia:

<table>
<thead><tr>
  <th width="20%">Type</th>
  <th>Description</th>
</tr></thead>
<tbody>
  <tr>
    <td>heading</td>
    <td>Memungkinkan Anda menentukan tajuk untuk mengelompokkan artikel.   <pre class="nopreline">
  {
    "type": "heading",
    "text": "More to read"
  },
  </pre>     <br>     <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
    </figure></td>
  </tr>
  <tr>
    <td>small</td>
    <td>Memungkinkan Anda untuk menautkan ke artikel terkait dengan opsi untuk menyertakan gambar kecil yang terkait.   <pre class="nopreline">
  {
    "type": "small",
    "title": "Learn about cats",
    "url": "https://wikipedia.org/wiki/Cat",
    "image": "assets/bookend_cats.jpg"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>landscape</td>
    <td>Memungkinkan Anda untuk menautkan ke artikel atau konten lain, seperti video. Gambar yang terkait dengan jenis ini berukuran lebih besar dan berformat lanskap.   <pre class="nopreline">
  {
    "type": "landscape",
    "title": "Learn about border collies",
    "url": "https://wikipedia.org/wiki/Border_Collie",
    "image": "assets/bookend_dogs.jpg",
    "category": "Dogs"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>portrait</td>
    <td>Memungkinkan Anda untuk menautkan ke berita atau konten lain.  Gambar yang terkait dengan jenis ini berukuran lebih besar dan berformat potret.  <pre class="nopreline">
  {
    "type": "portrait",
    "title": "Learn about macaws",
    "url": "https://wikipedia.org/wiki/Macaw",
    "image": "assets/bookend_birds.jpg",
    "category": "birds"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>cta-link</td>
    <td>Memungkinkan Anda untuk menentukan tautan ajakan aksi yang ditampilkan sebagai tombol (cth.: baca selengkapnya, Berlangganan).   <pre class="nopreline">
  {
    "type": "cta-link",
    "links": [
      {
        "text": "Learn more",
        "url": "https://amp.dev/about/stories.html"
      }
    ]
  }
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
    </figure></pre>
</td>
  </tr>
</tbody>
</table>

There's more to learn about the bookend component. For details, see the [`amp-story`](../../../../documentation/components/reference/amp-story.md) reference documentation.

Cerita kita hampir jadi. Sebelum kita memublikasikannya, mari pastikan bahwa HTML AMP kita telah valid.
