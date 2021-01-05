---
"$title": Praktik-praktik terbaik AMP untuk Email
"$order": '1'
"$category": Develop
formats:
- email
---

AMP memungkinkan jenis-jenis baru yang menarik untuk konten yang lebih menghanyutkan dan menyenangkan di email! Saat mendesain email, ingatlah untuk mengikuti praktik-praktik terbaik untuk memastikan email tersebut efektif, dapat diandalkan di seluruh platform, dan bekerja sesuai harapan pengguna Anda.

#Kecepatan

Saat menggunakan [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email)untuk secara dinamis menjemput konten, sertakan placeholder (sediaan tempat) untuk menjaga integritas struktur komponen. Placeholder tersebut harus semirip mungkin tata letaknya dengan dokumen setelah dikembalikan ke data yang diminta. Ini memastikan ukuran pesan tidak berubah atau memutasi tata letak secara drastis.

#Kegunaan dan aksesibilitas

- Saat menggunakan [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email), pastikan bahwa atribut `controls` sudah ditetapkan. Ini memungkinkan pengguna perangkat layar sentuh, seperti ponsel cerdas, untuk bernavigasi di korsel (carousel).
- Saat menggunakan [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), ingatlah bahwa tidak semua jenis input didukung di iOS. Kunjungi [Nilai-Nilai Input yang Didukung](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) di Referensi HTML Safari untuk mendapatkan informasi selengkapnya.
- Tidak semua [ nilai-nilai atribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) `autocomplete`  didukung di semua aplikasi dan browser yang berbeda. Anggap bahwa pengisian otomatis tidak tersedia bagi pengguna Anda dan jaga agar formulir singkat.

#Pengaturan gaya

- Pastikan bahwa email Anda hanya menggunakan [CSS yang Didukung AMP untuk Email](../learn/email-spec/amp-email-css.md?format=email)
- Hindari menggunakan unit viewport (`vw`, `vh`, `vmin`, dan `vmax`) di mana pun di CSS dan HTML Anda. Karena email AMP merender di dalam sebuah iframe, viewport email tidak sesuai dengan viewport browser.
- Browser berbeda mempunyai pengaturan gaya CSS default yang berbeda. Gunakan perpustakaan CSS yang menormalkan gaya jika diperlukan. Untuk mendapatkan informasi selengkapnya tentang gaya default atau standar, normalisasi gaya, dan daftar perpustakaan yang tersedia, kunjungi [Reboot, Reset, dan Alasan](https://css-tricks.com/reboot-resets-reasoning/).
- Berhati-hatilah dengan margin yang berlebihan di CSS: ini mungkin tidak dapat dirender karena [pembatasan tata letak AMP](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

##Perangkat seluler

Pastikan pesan Anda tampil bagus di semua ukuran layar dengan menggunakan [kueri media CSS](style_and_layout/control_layout.md?format=email) untuk mengidentifikasi perangkat. Pesan-pesan harus diuji pada perangkat seluler untuk memastikan bahwa tata letak sudah benar dan komponen berfungsi sesuai perkiraan.

#Gotcha Lainnya

Saat mengerjakan AMP untuk Email, ingatlah kiat dan trik berikut ini:

- Playground AMP untuk Email tidak mewakili XHR, namun beberapa penyedia email melakukannya.
- Bagian MIME AMP harus muncul sebelum bagian MIME HTML di email Anda untuk memastikan kompatibilitas maksimal di semua klien email.
- Atribut `src` dari [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email), [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) dari [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email), `src` untuk [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email), atau atribut href dari sebuah tag `<a>` tidak dapat dimutasi dengan [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email).
- Pesan-pesan Anda harus menyertakan versi HTML statis di dalam peristiwa di mana pengguna dibawa ke versi HTML pesan, atau jika pengguna itu meneruskan pesan tersebut.
