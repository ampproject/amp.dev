---
"$title": Bekerja dengan data jarak jauh
"$order": '3'
description: Bagaimana jika data Anda yang dapat diikat terlalu besar atau kompleks untuk diambil saat halaman dimuat? Atau bagaimana jika setiap SKU memiliki harga yang membutuhkan ....
toc: 'true'
---

Bagaimana jika data Anda yang dapat diikat terlalu besar atau kompleks untuk diambil saat halaman dimuat? Atau bagaimana jika setiap SKU memiliki harga yang membutuhkan waktu yang lama untuk mencarinya? Mencari harga SKU untuk item yang tidak dilihat adalah pekerjaan yang sia-sia.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) mendukung pengambilan data jarak jauh melalui atribut [`src`](../../../../documentation/components/reference/amp-bind.md#attributes)miliknya, yang mengambil JSON dari titik akhir (endpoint) CORS. Pengambilan ini dilakukan sekali dan saat pemuatan halaman serta berguna untuk memastikan kesegaran data (khususnya jika disajikan dari cache).

Anda juga dapat mengikat atribut `src` untuk elemen [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state). Hal ini berarti tindakan pengguna dapat memicu pengambilan data JSON jarak jauh ke status halaman yang dapat diikat.

[/tip]

## Mengambil ukuran baju yang tersedia

Mari kita manfaatkan kemampuan pengambilan data jarak jauh untuk mencari harga SKU di contoh. Server pengembangan Express.js di `app.js` telah memiliki titik akhir `/shirts/sizesAndPrices?shirt=<sku>` yang, jika diberi SKU kemeja, menampilkan ukuran yang tersedia dan harga untuk setiap ukuran. Server pengembangan ini mengirimkan respons dengan penundaan buatan selama satu detik untuk menirukan latensi jaringan.

Permintaan | Respons
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

Serupa dengan data JSON dalam elemen [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), data jarak jauh yang ditampilkan dari pengambilan ini digabungkan dan tersedia di atribut `id` elemen. Contoh: data yang ditampilkan dari contoh respons di atas dapat diakses dalam ekspresi:

Ekspresi | Hasil
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### Mengikat data

Sekarang, mari kita terapkan hal ini ke contoh niaga-e (e-commerce). Pertama-tama, ambil data baju ini ketika SKU baru dipilih. Tambahkan pengikatan `[src]` ke elemen `amp-state#shirts`:

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Menunjukkan ukuran yang tidak tersedia

Selanjutnya, mari tandai dengan jelas ukuran yang tidak tersedia untuk SKU tertentu. Kelas CSS `"unavailable"` menambahkan garis diagonal pada elemen -- kita dapat menambahkannya ke elemen dalam [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) yang terkait dengan ukuran yang tidak tersedia:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
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

Sekarang, muat ulang halaman dan cobalah. Memilih SKU baru (warna baju) akan menyebabkan ukuran yang tidak tersedia dicoret (setelah penundaan singkat).

### Menentukan status awal

Namun ada sedikit masalah -- bagaimana dengan baju hitam, yaitu warna standar yang dipilih? Kita perlu menambahkan data ukuran dan harga baju hitam ke `amp-state#shirts` karena [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) hanya akan berjalan sebagai tanggapan terhadap tindakan pengguna yang eksplisit:

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

Selain itu, kita perlu memperbarui status standar elemen yang relevan:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Add the 'unavailable' class to the next three <td> elements
           to be consistent with the available sizes of the default SKU. -->
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

[tip type="note"] **CATATAN -** [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) tidak berjalan saat pemuatan halaman -- hanya sebagai respons terhadap tindakan pengguna yang eksplisit. Ini memastikan pemuatan halaman awal secara konsisten cepat di seluruh halaman, terlepas dari penggunaan [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

## Harga baju variabel

Setelah kita menampilkan ukuran yang tersedia dengan benar, pastikan harga yang benar juga ditampilkan.

Toko AMPPAREL kita tidak biasa karena harga baju berbeda berdasarkan warna DAN ukuran. Artinya, kita perlu variabel baru untuk melacak ukuran yang dipilih pengguna. Tambahkan tindakan baru ke elemen [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) ukuran:

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Perhatikan bahwa kita tidak menginisialisasi nilai `selectedSize` melalui elemen `amp-state#selected`. Hal ini karena kita sengaja tidak memberikan ukuran standar yang dipilih, dan ingin mendorong pengguna untuk memilih ukuran.

[tip type="tip"] **KIAT –** `AMP.setState()` dapat digunakan untuk menentukan variabel baru selain untuk mengubah variabel yang sudah ada. Ekspresi akan mengevaluasi variabel yang tidak ditentukan menjadi `null`. [/tip]

Tambahkan elemen `<span>` baru yang mencakup label harga dan ubah teks standarnya menjadi "---" karena tidak ada pilihan ukuran standar.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

Kini harganya sudah benar! Cobalah.

## Tombol yang diaktifkan bersyarat

Hampir selesai! Mari nonaktifkan tombol "Tambahkan ke keranjang" jika ukuran yang dipilih tidak tersedia:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Cobalah**:  Jika memilih ukuran yang tidak tersedia, Anda tidak dapat menambahkannya ke keranjang.
