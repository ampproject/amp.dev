---
"$title": Keluar (Logout)
"$order": '3'
description: Serupa dengan tombol masuk (login), keberadaan tombol keluar (logout) bergantung secara kondisional pada status komponen amp-access ....
---

Serupa dengan tombol masuk (login), keberadaan tombol keluar (logout) bergantung secara kondisional pada status komponen [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

[sourcecode:html] <button amp-access="loggedIn" amp-access-hide="" tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button> [/sourcecode]

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

Saat mengklik tombol Logout, Anda akan diarahkan ke URL yang telah ditentukan dalam konfigurasi JSON [`amp-access`](../../../../documentation/components/reference/amp-access.md), sebagai bagian dari objek login:
