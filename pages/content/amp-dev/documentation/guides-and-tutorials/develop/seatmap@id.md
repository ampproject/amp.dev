---
"$title": Create a seatmap
"$order": '104'
description: Seatmaps are important parts of ticketers web apps, but the implementation in AMP can be difficult. Read on to learn how to implement a seatmap in AMP by
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- pbakaus
---

Seatmap merupakan bagian penting aplikasi web pengurus tiket (ticketer), namun penerapan di AMP bisa jadi sulit. Lanjutkan membaca untuk mempelajari cara menerapkan seatmap di AMP dengan menggunakan kombinasi komponen AMP yang tersedia.

[tip] Sampel live yang menerapkan praktik-praktik yang dijelaskan di bawah ini tersedia [di sini](../../../documentation/examples/documentation/SeatMap.html). [/tip]

## Komponen AMP yang diperlukan

Mari kita mulai dengan mengkaji komponen-komponen yang diperlukan:

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) memungkinkan untuk zoom dengan melebarkan konten melalui ketukan ganda dan cubitan. Komponen ini menjadi dasar untuk penerapan seatmap.

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md) menjemput konten secara dinamis dari endpoint (titik akhir) CORS JSON dan merendernya dengan menggunakan templat yang telah disediakan. Digunakan untuk menjemput ketersediaan seatmap saat ini, sehingga pengguna selalu mendapatkan data terkini.

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md) menambahkan interaktivitas pada halaman. Diperlukan di sini untuk mengetahui berapa jumlah seat yang telah dipilih.

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md) mewakili kontrol yang menyajikan menu opsi atau pilihan, dan memungkinkan pengguna memilih dari situ. Seluruh seatmap dapat dianggap sebagai menu opsi di mana setiap seat merupakan opsi. Ini membuat pengaturan gaya status yang dipilih untuk seat menjadi jauh lebih mudah dengan memungkinkan Anda menggunakan ekspresi CSS. Contohnya: ekspresi berikut ini mengisi suatu seat dengan warna jingga setelah dipilih.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Persyaratan

1. Untuk menggambar sebuah seatmap sebagai sebuah SVG di mana setiap seat diwakili oleh sebuah elemen  `rect`, Anda membutuhkan informasi tentang setiap seat: posisi `x` dan `y`, `width` dan `height` serta mungkin `rx` dan `ry` untuk membulatkan sudut-sudut persegi.
2. Pengenal unik untuk setiap seat yang dapat digunakan untuk melakukan reservasi.
3. Pengukuran seluruh lebar dan tinggi seatmap yang akan digunakan di atribut `viewbox`.

## Menggambar seatmap

Seatmap dirender melalui [`amp-list`](../../../documentation/components/reference/amp-list.md) dan [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md). Setelah menerima data dari panggilan [`amp-list`](../../../documentation/components/reference/amp-list.md) Anda dapat menggunakan data tersebut untuk mengiterasi seat-seat:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Mengatur gaya seat yang tidak tersedia

Di dalam contoh di atas, `{% raw %}{{unavailable}}{% endraw %}` adalah nilai bidang yang dihasilkan oleh endpoint JSON dan digunakan untuk mengatur gaya seat yang tidak tersedia. Pendekatan ini tidak memungkinkan Anda untuk menghapus atribut seperti `option="{{id}}"` jika suatu seat tidak tersedia, karena templat tidak mampu membungkus seluruh elemen `<html>` halaman.

Sebagai alternatif, pendekatan yang lebih berbelit adalah dengan mengulangi tag, sebagai berikut:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Mengatur ukuran seatmap Anda

Kecuali ukuran seatmap Anda tetap, sulit untuk mengatur ukuran [`amp-list`](../../../documentation/components/reference/amp-list.md) yang berisi seatmap tersebut. [`amp-list`](../../../documentation/components/reference/amp-list.md) memerlukan dimensi tetap atau menggunakan `layout="fill"` (untuk menggunakan ruang yang tersedia pada wadah induk). Ada dua cara untuk mengatasi masalah ini:

1. Hitung ruang yang tersedia pada halaman setelah Anda mengetahui ruang yang digunakan oleh komponen lain, seperti bagian kepala dan kaki. Penghitungan ini dapat dilakukan di CSS dengan menggunakan ekspresi `calc` dan menetapkannya sebagai `min-height` div induk dari [`amp-list`](../../../documentation/components/reference/amp-list.md).
2. Gunakan tata letak fleksibel jika mengetahui ketinggian tata letak halaman.

## Mengatur gaya amp-pan-zoom

Jika menggunakan pendekatan yang diuraikan di dalam bagian sebelumnya, [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) perlu menggunakan `layout="fill"` juga.

[tip type="tip"] **KIAT –** Agar ruang putih tetap ada di sekitar seatmap dan masih menjadi bagian area cubit dan zoom:

- Tambahkan div pembungkus untuk svg
- Tambahkan sumpalan (padding)

Jika Anda tidak mempunyai div pembungkus, dan sebaliknya menambahkan margin ke SVG, ini tidak akan membuat margin menjadi bagian dari area cubit dan zoom. [/tip]

## Menangani status

Saat pengguna mengeklik berbagai seat, mungkin untuk terus melacak `id` seat yang dipilih dalam sebuah variabel dengan menggunakan `amp-state`, baik dengan:

- Menambahkan sebuah ekspresi [`amp-bind`](../../../documentation/components/reference/amp-bind.md) bagi setiap seat untuk menambahkan seat yang dipilih ke sebuah daftar
- Atau dengan menggunakan [`amp-selector`](../../../documentation/components/reference/amp-selector.md) dengan tindakan `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` agar semua seat yang dipilih ditambahkan ke sebuah daftar

Meskipun pendekatan yang pertama tidak memerlukan komponen tambahan [`amp-selector`](../../../documentation/components/reference/amp-selector.md), ini dapat membuat seatmap menjadi sangat lambat karena setiap ekspresi [`amp-bind`](../../../documentation/components/reference/amp-bind.md) akan dievaluasi pada setiap seleksi/pembatalan seleksi seat.

Pendekatan kedua juga memungkinkan Anda untuk mengurangi ekspresi [`amp-bind`](../../../documentation/components/reference/amp-bind.md) rangkap untuk setiap seat yang akan dirender oleh templat.

## Struktur HTML akhir

Sebagai referensi, berikut ini adalah HTML akhir untuk seatmap:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
  <amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
    <template type="amp-mustache">
      <amp-pan-zoom layout="fill" class="seatmap">
        <amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
          <div class="svg-container">
            <svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
            {{#seats}}
              <rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
            {{/seats}}
            </svg>
          </div>
        </amp-selector>
      </amp-pan-zoom>
    </template>
  </amp-list>
</div>{% endraw %}
[/sourcecode]
