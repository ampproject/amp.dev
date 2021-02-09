---
'$title': Thêm phông chữ tùy chỉnh
$order: 6
description: Các trang AMP không thể bao gồm các stylesheet bên ngoài, ngoại trừ các phông chữ tùy chỉnh. Bạn có thể nhúng các phông chữ tùy chỉnh vào trang của mình theo 2 cách...
formats:
  - websites
  - ads
  - stories
author: pbakaus
---

Các trang AMP không thể bao gồm các stylesheet bên ngoài, ngoại trừ các phông chữ tùy chỉnh. Bạn có thể nhúng các phông chữ tùy chỉnh vào trang của mình theo 2 cách:

1. Thông qua một thẻ `<link>` (chỉ các nhà cung cấp phông chữ được cho phép)
2. Thông qua `@font-face` (không có hạn chế, mọi phông chữ đều được cho phép)

### 1. Sử dụng `<link>`

Sử dụng một thẻ `<link>` (thường là ở phần head của trang), ví dụ như:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Các nguồn gốc sau đây được cho phép và có thể phục vụ phông chữ thông qua thẻ liên kết:

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. Sử dụng `@font-face`

Hoặc, bạn có thể sử dụng [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) trong stylesheet AMP của mình:

[sourcecode:html]

<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>

[/sourcecode]

[tip type="note"] **LƯU Ý –** Các phông chữ được bao gồm qua `@font-face` phải được truy xuất thông qua giao thức HTTP hoặc HTTPS. [/tip]
