---
$title: Bekerja dengan data jarak jauh
---

Bagaimana jika data Anda yang dapat diikat terlalu besar atau kompleks untuk diambil saat pemuatan halaman? Atau, bagaimana jika setiap SKU memiliki harga yang butuh waktu lama untuk dicari? Mencari harga SKU untuk item yang tidak dilihat adalah pekerjaan yang sia-sia.

[tip type="success"]

[`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state) mendukung pengambilan data jarak jauh melalui atribut [`src`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#attributes)miliknya, yang mengambil JSON dari titik akhir CORS. Pengambilan ini dilakukan sekali saat pemuatan halaman, dan berguna untuk memastikan baru tidaknya data (khususnya jika ditayangkan dari cache).

Anda juga dapat mengikat atribut `src` untuk elemen [`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state). Hal ini berarti tindakan pengguna dapat memicu pengambilan data JSON jarak jauh ke status halaman yang dapat diikat.

[/tip]

## Mengambil ukuran kemeja yang tersedia

Mari kita manfaatkan kemampuan pengambilan data jarak jauh untuk mencari harga SKU di contoh. Server pengembangan Express.js di `app.js` telah memiliki titik akhir `/shirts/sizesAndPrices?shirt=<sku>` yang, jika diberi SKU kemeja, menampilkan ukuran yang tersedia dan harga untuk setiap ukuran. Server pengembangan ini mengirimkan respons dengan penundaan buatan selama 1 detik untuk menyimulasikan latensi jaringan.

|  Permintaan                              |  Respons |
|---------------------------------------|-----------|
| `GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}` |

Serupa dengan data JSON dalam elemen [`<amp-state>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}#state), data jarak jauh yang ditampilkan dari pengambilan ini digabungkan dan tersedia di atribut `id` elemen. Misalnya, data yang ditampilkan dari contoh respons di atas dapat diakses di ekspresi:

|  Ekspresi                  |  Hasil |
|------------------------------|---------|
| `shirts['1001'].sizes['XS']` | `8.99`  |

### Mengikat data

Sekarang, mari kita terapkan hal ini ke contoh e-commerce. Pertama-tama, ambil data kemeja ini ketika SKU baru dipilih. Tambahkan pengikatan `[src]` ke elemen `amp-state#shirts`:

```html
<!-- Jika `selected.sku` berubah, update atribut `src` dan ambil
     JSON di URL baru. Kemudian, gabungkan data tersebut pada `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Menunjukkan ukuran yang tidak tersedia

Selanjutnya, mari tandai dengan jelas ukuran yang tidak tersedia untuk SKU tertentu. Kelas CSS `"unavailable"` menambahkan garis diagonal pada elemen -- kita dapat menambahkannya ke elemen dalam `[`amp-selector`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-selector.md', locale=doc.locale).url.path}}) name="size"]` yang terkait dengan ukuran yang tidak tersedia:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- Jika ukuran 'XS' tersedia untuk SKU yang dipilih, tampilkan string kosong.
           Jika tidak, tampilkan 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Sekarang, muat ulang halaman dan cobalah. Memilih SKU baru (warna kemeja) akan menyebabkan ukuran yang tidak tersedia dicoret (setelah penundaan singkat).

### Menentukan status awal

Namun ada sedikit masalah -- bagaimana dengan kemeja hitam, yaitu warna default yang dipilih?  Kita perlu menambahkan data ukuran dan harga kemeja hitam ke `amp-state#shirts` karena [`amp-bind`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}) hanya akan berjalan sebagai tanggapan terhadap tindakan pengguna yang eksplisit:

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

Selain itu, kita perlu mengupdate status default elemen yang relevan:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- Jika ukuran 'XS' tersedia untuk SKU yang dipilih, tampilkan string kosong.
           Jika tidak, tampilkan 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Tambahkan kelas 'unavailable' ke 3 elemen <td> berikutnya
           agar konsisten dengan ukuran SKU default yang tersedia. -->
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Catatan: [`amp-bind`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}) tidak berjalan saat pemuatan halaman, melainkan hanya sebagai tanggapan terhadap tindakan pengguna yang eksplisit. Hal ini memastikan pemuatan halaman awal tetap cepat pada semua halaman, terlepas dari penggunaan [`amp-bind`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-bind.md', locale=doc.locale).url.path}}).

## Harga kemeja variabel

Setelah kita menampilkan ukuran yang tersedia dengan benar, pastikan harga yang benar juga ditampilkan.

Toko AMPPAREL kita tidak biasa karena harga kemeja berbeda berdasarkan warna maupun ukuran. Artinya kita perlu variabel baru untuk melacak ukuran yang dipilih pengguna. Tambahkan tindakan baru ke elemen [`amp-selector`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-selector.md', locale=doc.locale).url.path}}) ukuran:

```html
<!-- Jika elemen dipilih, setel variabel `selectedSize` ke
     nilai atribut "option" elemen yang dipilih.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Perhatikan bahwa kita tidak menginisialisasi nilai `selectedSize` melalui elemen `amp-state#selected`. Hal ini karena kita sengaja tidak memberikan ukuran default yang dipilih, dan ingin mendorong pengguna untuk memilih ukuran.

Tips: Selain untuk mengubah variabel yang ada, `AMP.setState()` juga dapat digunakan untuk menentukan variabel baru. Ekspresi akan mengevaluasi variabel yang tidak ditentukan menjadi `null`.

Tambahkan elemen `<span>` baru yang mencakup label harga dan ubah teks defaultnya menjadi "---" karena tidak ada pilihan ukuran default.

```html
<h6>PRICE :
  <!-- Tampilkan harga kemeja yang dipilih untuk ukuran yang dipilih jika tersedia.
       Jika tidak, tampilkan teks placeholder '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

Dan kita memiliki harga yang benar! Cobalah.

## Tombol yang diaktifkan secara kondisional

Kita hampir selesai. Mari nonaktifkan tombol "Tambahkan ke keranjang" jika ukuran yang dipilih tidak tersedia:

```html
<!-- Nonaktifkan tombol "ADD TO CART" jika:
     1. Ukuran tidak dipilih, ATAU
     2. Ukuran yang tersedia untuk SKU terpilih belum diambil
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Cobalah**:  Jika memilih ukuran yang tidak tersedia, Anda tidak dapat menambahkannya ke keranjang.
