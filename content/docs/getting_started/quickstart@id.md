---
$title: Panduan mulai cepat
---

[TOC]

{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

Panduan ini berisi referensi utama untuk membantu Anda agar dapat menggunakan AMP tanpa kendala.  Untuk informasi yang mendalam, silakan baca [Dokumentasi AMP](/id/docs/) atau [channel YouTube](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw) kami. 

<hr>

## Memulai penggunaan AMP

Terapkan langkah-langkah utama berikut untuk membantu Anda agar dapat menggunakan AMP tanpa kendala:

1.  [Buat halaman AMP](#create-your-amp-pages)
2.  [Validasi halaman AMP Anda](#validate-and-test-amp-pages)
3  [Buat agar konten Anda dapat ditemukan](#make-your-content-discoverable)

## Menggunakan AMP sehari-hari

Jaga momentum AMP Anda dengan semua referensi yang ditawarkan oleh AMP.

<a class="button" href="#amp-day-to-day-resources"> Lihat referensi</a>

<hr>

### Buat halaman AMP

Lihat bagian yang relevan di bawah untuk: [menggunakan CMS](#using-a-cms?), [memulai dari awal](#starting-from-scratch?), atau [mengonversi konten yang sudah ada](#converting-existing-content?).

#### Menggunakan CMS?

AMP mendukung integrasi dengan banyak platform publikasi pihak ketiga. Lihat cara membuat halaman AMP pada dokumentasi untuk platform publikasi Anda.

<div>
  {% for section in who.tech_companies.sections %}
    {% if section.title == 'CMS' %}
      <ul>
        {% for item in section.section_items %}
          <li class="item">
            {% if item.link %}
              <a href="{{item.link}}">{{item.title}}</a>
            {% else %}
              {{item.title}}
            {% endif %}
          </li>
        {% endfor %}
        </ul>
    {% endif %}
  {% endfor %}
</div>

#### Memulai dari awal?

Jika Anda membuat halaman AMP atau materi iklan dari awal, lihat referensi berikut:

*   [Tutorial: Membuat halaman AMP pertama Anda](/id/docs/getting_started/create.html)
*   [Tutorial: Menambahkan fitur AMP lanjutan](/id/docs/fundamentals/add_advanced.html)
*   [Spesifikasi HTML AMP](/id/docs/fundamentals/spec.html#the-amp-html-format): *meliputi boilerplate, markup yang diperlukan, HTML yang diizinkan*
*   [Format Iklan AMPHTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md): *memberikan detail tentang cara membuat iklan dengan performa bagus di AMP*
*   [Video YouTube: Apa yang diizinkan dan tidak diizinkan di AMP?](https://youtu.be/Gv8A4CktajQ)
*   [Template dari AMP Start](https://www.ampstart.com/): *Coba beberapa template halaman AMP yang siap pakai*

#### Mengonversi konten yang sudah ada?

Jika Anda mengonversi halaman HTML yang sudah ada ke AMPHTML, buka referensi berikut:

*   [Tutorial: Mengonversi HTML menjadi AMP](/id/docs/fundamentals/converting.html)
*   [Video YouTube: Menggunakan HTML AMP untuk situs Anda yang sudah ada](https://youtu.be/OO9oKhs80aI)

### Validasi dan uji halaman AMP

Sebelum memublikasikan konten, pastikan halaman AMP Anda sudah valid.  Berikut beberapa referensi yang dapat digunakan:

*   [Memvalidasi halaman AMP](/id/docs/fundamentals/validate.html): *memberikan daftar petunjuk dan fitur validasi untuk memvalidasi halaman Anda*
*   [Video YouTube: Cara memvalidasi & men-debug halaman AMP](https://www.youtube.com/watch?v=npum8JsITQE&t=13s)
*   [Menguji CORS di AMP](/id/docs/fundamentals/amp-cors-requests.html#testing-cors-in-amp)

### Buat agar konten Anda dapat ditemukan

Pastikan pengguna dapat menemukan konten Anda di platform pihak ketiga (misalnya, Twitter, Google, Bing, dll.). Berikut ini beberapa referensi yang bermanfaat:

*   [Membuat halaman dapat ditemukan](/id/docs/fundamentals/discovery.html): *tips untuk menautkan halaman AMP dan menggunakan metadata*
*   [Panduan Google Penelusuran untuk halaman AMP](https://support.google.com/webmasters/answer/6340290)

<hr>

## Referensi AMP sehari-hari

Referensi berikut akan membantu Anda dalam menggunakan AMP sehari-hari:

*   Pastikan [daftar komponen AMP](/id/docs/reference/components.html) selalu tersedia.  Setiap halaman referensi komponen berisi informasi terperinci tentang cara mengintegrasikan dan menggunakan komponen pada halaman AMP Anda.
*   Ingin melihat contoh dan demonya?  Buka [AMP By Example](https://ampbyexample.com/), yang memberikan contoh langsung dan peragaan tentang cara menggunakan komponen AMP.
*   Perlu inspirasi?
    *   [AMP Start](https://www.ampstart.com/) memberikan komponen dan template yang telah diberi gaya sebelumnya, yang dapat digunakan untuk membuat situs AMP bergaya mulai dari awal.
    *   [Showcase](/learn/showcases/) kami menyoroti halaman AMP yang perlu diperhatikan dalam praktiknya.
*   Perlu bantuan? Lihat referensi [Mendapatkan Dukungan](/support/developer/get_support.html).
*   Ikuti terus kabar terbaru tentang AMP:
    *   Silakan berlangganan [blog kami](https://amphtml.wordpress.com/)
    *   Silakan berlangganan [AMP Channel di YouTube](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw)
    *   Ikuti kami di Twitter  [@AMPhtml](https://twitter.com/amphtml)
 
