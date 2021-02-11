---
'$title': Tạo vỏ cho quảng cáo
$order: 0
description: 'Sử dụng trình soạn văn bản ưa thích của bạn, tạo một tập tin HTML tên là my-amphtml-ad.html. Sao chép đánh dấu HTML sau vào tập tin đó: ...'
---

[HTML cần thiết cho một quảng cáo AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) là một biến thể của [AMPHTML cần thiết cho một trang AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md). Hãy làm quen với đoạn mã cần thiết bằng cách tạo vỏ cho quảng cáo AMPHTML của chúng ta.

Sử dụng trình soạn văn bản ưa thích của bạn, tạo một tập tin HTML tên là **`my-amphtml-ad.html`**. Sao chép đánh dấu HTML sau vào tập tin đó:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
  </head>
  <body></body>
</html>
```

Đánh dấu này dành cho một tập tin HTML cơ bản, hợp lệ. Lưu ý rằng chúng ta đã bao gồm thẻ `meta` (siêu dữ liệu) của màn hiển thị, để chúng ta có một [màn hiển thị tương thích](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport).

Bây giờ, hãy sửa đổi HTML để biến nó thành một quảng cáo AMPHTML.

Trong thẻ `<html> `, thêm thuộc tính `⚡4ads`, xác định tài liệu này là một quảng cáo AMPHTML. Hoặc, bạn cũng có thể quy định thuộc tính `amp4ads`, cũng là một lựa chọn hợp lệ.

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    ...
  </head>
</html>
```

[tip type="note"] **LƯU Ý –** Khác với các trang AMP, [các quảng cáo AMPHTML không cần một thẻ `<link rel="canonical">`](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

Các quảng cáo AMPHTML cần phiên bản riêng của thời gian chạy AMP, vậy nên hãy thêm thẻ `<script>` sau vào phần `<head>` trong tài liệu của bạn:

```html
<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
```

Các quảng cáo AMPHTML đòi hỏi một kiểu phong cách [code soạn sẵn](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) khác, và đơn giản hơn đáng kể so với các trang AMP. Thêm mã sau vào phần <code><head></code> của bạn.

```html
<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>
```

Để tạo phong cách cho quảng cáo AMPHTML của bạn, mã CSS của bạn phải được nhúng inline trong tài liệu AMPHTML sử dụng thẻ <code><style amp-custom></style></code> trong phần <code><head></code>. Khi chúng ta render một ảnh quảng cáo cơ bản, chúng ta không cần CSS nào, vậy nên chúng ta sẽ không thêm các thẻ này.

[tip type="note"] **LƯU Ý –** Đối với các quảng cáo AMPHTML, kích cỡ tối đa cho một stylesheet inline là _20 KB_. Tìm hiểu thêm về [Các yêu cầu đối với CSS trong thông số quảng cáo AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css). [/tip]

Đây là đoạn mã hoàn chỉnh cho tập tin HTML của bạn:

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
    <style amp4ads-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body></body>
</html>
```

Bây giờ bạn đã có một quảng cáo AMPHTML hợp lệ, thay cho một quảng cáo rỗng. Hãy tạo một ảnh quảng cáo.
