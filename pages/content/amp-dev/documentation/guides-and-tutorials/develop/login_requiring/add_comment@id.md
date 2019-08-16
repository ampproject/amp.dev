---
$title: Menambahkan komentar
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

Di titik ini, pengguna dapat menambahkan komentar menggunakan koleksi [`amp-form`](../../../../documentation/components/reference/amp-form.md). Perhatikan bagaimana kemunculan formulir bersifat kondisional, bergantung pada status komponen [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

Kami menentukan metode POST dan tindakan XHR, karena tindakan non XHR tidak diizinkan dengan metode POST di AMP.
Karena ini adalah demo, kami tidak memberikan banyak komentar, jadi 1 komentar hanya dapat ditambahkan dalam satu kesempatan. Setiap kali komentar ditambahkan, server AMPByExample membalas dengan respons JSON yang berisi teks yang dimasukkan dengan beberapa tambahan, seperti stempel waktu, avatar, dan nama untuk pengguna.

Berikut adalah contoh respons JSON:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

Komponen formulir hanya akan menampilkan nilai di dalam halaman menggunakan [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md) template:

[sourcecode:html]
<div submit-success>
  <template type="amp-mustache">
    <div class="comment-user">
      <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
      <div class="card comment">
        <p><span class="user">{% raw %}{{User}}{% endraw %}</span><span class="date">{% raw %}{{Datetime}}{% endraw %}</span></p>
        <p>{% raw %}{{Text}}{% endraw %}</p>
      </div>
    </div>
  </template>
</div>
[/sourcecode]

Dalam contoh ini, kami hanya memeriksa apakah nilai komentar tidak kosong. Jika nilainya kosong, kami menampilkan error yang menyebabkan kode berikut dijalankan:

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

Sebagai sentuhan tambahan, kami menambahkan atribut `required` untuk menerapkan kehadiran teks komentar sebelum mengirim komentar:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Saat menambahkan komentar dan mengklik tombol kirim, Anda kini harusnya melihat sesuatu yang serupa dengan screenshot berikut:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>
