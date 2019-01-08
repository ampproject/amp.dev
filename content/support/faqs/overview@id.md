---
$title: Ringkasan Accelerated Mobile Pages

cta:
  title: FAQ Selanjutnya
  link_text: Keterlibatan Platform dan Perusahaan Teknologi
  link_url: /content/support/faqs/platform-involvement.md

faq:
  - title: Apa yang dimaksud dengan project Accelerated Mobile Pages?
    answer: |
      Project Accelerated Mobile Pages (“AMP”) adalah inisiatif open source yang merupakan hasil diskusi penayang dan perusahaan teknologi tentang kebutuhan untuk meningkatkan seluruh ekosistem konten seluler untuk semua orang -- penayang, platform pelanggan, pengiklan, pembuat, dan pengguna.

      Saat ini, harapannya adalah konten harus dimuat dengan sangat cepat dan mudah diakses. Kenyataannya, konten memerlukan beberapa detik untuk dimuat, atau, karena pengguna meninggalkan halaman yang lambat untuk dimuat, konten tidak pernah dimuat penuh. Accelerated Mobile Pages adalah halaman yang dirancang untuk dimuat hampir secara instan -- sebuah langkah untuk membuat web seluler menjadi lebih baik bagi semua pihak.
  - title: Apa manfaat Accelerated Mobile Pages?
    answer: |
      Kecepatan sangatlah penting dan dimuat secara instan adalah idealnya. Penelitian menunjukkan bahwa rasio pantulan yang lebih tinggi terkait dengan halaman web yang dimuat lebih lambat. Menggunakan format AMP akan membuat pengguna jauh lebih tertarik untuk melihat dan terlibat dengan lebih banyak konten. Tetapi ini bukan hanya tentang kecepatan dan performa. Kami juga ingin mempromosikan distribusi yang disempurnakan sehingga penayang dan pengiklan dapat mengambil keuntungan dari potensi web terbuka agar konten mereka muncul di mana saja dengan cepat -- pada berbagai platform dan aplikasi -- yang dapat menghasilkan lebih banyak pendapatan.
  - title: Bagaimana cara kerja Accelerated Mobile Pages?
    answer: |
      Accelerated Mobile Pages sama seperti halaman HTML lainnya, tetapi dengan serangkaian fungsi teknis diizinkan yang terbatas, yang ditetapkan dan diatur oleh spesifikasi AMP open source. Sama seperti semua halaman web, Accelerated Mobile Pages akan dimuat di browser modern atau webview aplikasi apa pun.

      File AMP memanfaatkan berbagai pendekatan teknis dan arsitektur yang memprioritaskan kecepatan untuk memberikan pengalaman yang lebih cepat bagi pengguna. Developer AMP dapat menggunakan library komponen web yang kaya dan berkembang yang menawarkan kemampuan untuk menyematkan objek multimedia seperti video dan postingan sosial, menampilkan iklan, atau mengumpulkan analisis. Tujuannya bukan untuk menyeragamkan tampilan dan nuansa konten, tetapi untuk membangun inti teknis yang lebih umum di antara halaman yang mempercepat waktu muat.

      Selain itu, file AMP dapat disimpan dalam cloud untuk mengurangi waktu muat konten bagi pengguna perangkat seluler. Dengan menggunakan format AMP, pembuat konten membuat konten dalam file AMP yang dapat disimpan dalam cache oleh pihak ketiga. Pada jenis framework ini, penayang dan pengiklan terus mengontrol konten mereka, tetapi platform dapat menyimpan dalam cache atau mencerminkan konten dengan mudah untuk kecepatan penayangan yang optimal bagi pengguna. Google memberikan [Cache AMP Google](https://developers.google.com/amp/cache/) yang dapat digunakan gratis oleh siapa pun, dan semua AMP akan disimpan dalam cache oleh Cache AMP Google. Perusahaan lain juga dapat membuat cache AMP mereka sendiri.

      Singkatnya, tujuannya adalah kombinasi fungsi teknis terbatas dengan sistem distribusi yang dibuat dengan penyimpanan dalam cache akan menghasilkan halaman yang memiliki performa lebih baik, dan meningkatkan pengembangan audiens.
  - title: Mengapa Project Accelerated Mobile Pages melakukan pendekatan open source?
    answer: |
      Perusahaan yang terlibat dalam project ingin membuat web seluler berfungsi lebih baik untuk semua -- tidak hanya untuk satu platform, sekumpulan teknologi, sekumpulan penayang, atau sekumpulan pengiklan. Membuat project sumber terbuka memungkinkan orang-orang untuk berkontribusi dan berbagi ide serta kode mereka untuk mempercepat web seluler. Kami masih berada di awal perjalanan ini dan berharap perusahaan teknologi, pengiklan, dan penayang lainnya bergabung bersama kami.
  - title: Siapa yang dapat menggunakan Accelerated Mobile Pages?
    answer: |
      Project ini terbuka untuk semua pemeran dalam ekosistem - penayang, platform pelanggan, pengiklan, dan pembuat. Untuk mengetahui perusahaan dan situs apa saja yang menggunakan AMP, buka [halaman Siapa](/support/faqs/supported-platforms.html).
  - title: Apa konsekuensi penggunaan Accelerated Mobile Pages?
    answer: |
      Dengan menggunakan format AMP, pembuat konten membuat konten dalam file AMP yang dapat di-crawl, diindeks & ditampilkan (tunduk pada protokol pengecualian robot), dan disimpan dalam cache oleh pihak ketiga.
  - title: Apa tanggung jawab saya saat menggunakan Accelerated Mobile Pages?
    answer: |
      Jika penayang atau pengiklan mengumpulkan data dari pengguna yang melihat halaman AMP-nya, pengumpulan data tersebut diatur oleh kebijakan privasinya.  Penayang atau pengiklan bertanggung jawab untuk mengungkapkan kebijakan privasinya, idealnya dengan menyertakan link ke kebijakan tersebut pada tiap halaman AMP-nya.

      Selain itu, hukum di banyak wilayah hukum, seperti di Uni Eropa, mewajibkan situs memberikan informasi tentang cookie dan bentuk penyimpanan lokal lainnya yang digunakan di situs (termasuk halaman AMP) kepada pengunjung. Biasanya, hukum ini juga mewajibkan situs untuk mendapatkan izin.  Situs bertanggung jawab untuk menentukan, berdasarkan penggunaan cookie-nya, jenis pemberitahuan apa yang sesuai.  Informasi tambahan dan fitur untuk menghasilkan pemberitahuan cookie dapat dilihat di www.cookiechoices.org.  Perhatikan bahwa komponen AMP [amp-user-notification](/id/docs/reference/components/amp-user-notification.html) memberikan cara untuk menampilkan notifikasi yang dapat ditutup kepada pengguna.

      Jika halaman AMP ditampilkan dalam penampil pada platform pihak ketiga, seperti Google AMP Viewer di Google Penelusuran, penampil dapat berupa lingkungan campuran tempat halaman AMP dan platform pihak ketiga dapat mengumpulkan data tentang pengguna.  Dalam kasus seperti itu, pengumpulan data oleh masing-masing pihak diatur oleh kebijakan privasi pihak tersebut (yaitu, dalam lingkungan penampil campuran, data yang dikumpulkan oleh halaman AMP diatur oleh kebijakan privasinya dan data yang dikumpulkan oleh platform pihak ketiga diatur oleh kebijakan privasi platform).  Masing-masing pihak bertanggung jawab untuk mengungkapkan kebijakan privasinya dan mematuhi peraturan data yang relevan, termasuk hukum Eropa yang terkait dengan penggunaan cookie.
  - title: Jenis konten apa yang dapat berfungsi paling baik menggunakan Accelerated Mobile Pages?
    answer: |
      Tujuan project ini adalah agar semua konten, dari artikel berita hingga video dan dari blog hingga halaman niaga dan GIF, dapat berfungsi menggunakan Accelerated Mobile Pages.
  - title: Apakah memerlukan lebih banyak usaha untuk membuat konten saya berfungsi pada Accelerated Mobile Pages?
    answer: |
      Singkatnya, tidak banyak. Karena “HTML AMP” secara keseluruhan dibuat dari teknologi web yang sudah ada, proses pengembangannya mencerminkan proses yang sudah digunakan penayang dan pengiklan saat ini. Penayang dan pengiklan dapat mempelajari [spesifikasi HTML AMP](/id/docs/fundamentals/spec.html) di GitHub. Bagi mereka yang terbiasa dengan proses saat ini, kami tidak mengharapkan kurva pembelajaran yang signifikan.
  - title: Bagaimana cara penayang atau pengiklan mengubah konten menjadi HTML AMP?
    answer: |
      Penayang dan penyedia Sistem Pengelolaan Konten (CMS) dapat mengembangkan integrasi dengan CMS mereka untuk membuat konten AMP. Automattic sudah menerbitkan [plugin AMP WordPress](https://wordpress.org/plugins/amp/) dan kami berharap semua sistem pengelolaan konten akan menambah dukungan untuk halaman HTML AMP.
  - title: Apakah AMP hanya ditujukan untuk perangkat seluler?
    answer: |
      AMP awalnya dirancang dengan mempertimbangkan responsivitas agar berfungsi di *semua* ukuran layar.  Namun, beberapa fitur untuk platform pihak ketiga (misalnya, carousel Berita Utama Google) hanya dapat dirancang untuk perangkat seluler.  Hubungi platform pihak ketiga untuk menanyakan cara mereka menggunakan AMP.  Untuk informasi selengkapnya tentang halaman AMP seluler dan desktop, lihat postingan blog Paul Bakaus di [Tentang ‘seluler’ dalam Accelerated Mobile Pages](https://paulbakaus.com/2016/07/01/about-that-mobile-in-accelerated-mobile-pages/).

---
