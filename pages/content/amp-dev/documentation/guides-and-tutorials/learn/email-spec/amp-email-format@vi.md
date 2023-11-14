---
'$title': Định dạng AMP cho Email
$order: 1
formats:
  - email
teaser:
  text: 'Đánh dấu bắt buộc '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

AMP là một công nghệ nổi tiếng để phát triển các trang web siêu nhanh cho các máy khách di động. AMP là một nhóm các thẻ HTML được hỗ trợ bởi JavaScript có thể dễ dàng cho phép các chức năng với một trọng tâm lớn hơn đến hiệu năng và bảo mật. Có các [thành phần AMP](https://amp.dev/documentation/components/) cho mọi thứ từ băng chuyền, đến các yếu tố biểu mẫu tương thích để truy xuất nội dung mới từ các điểm cuối từ xa.

Định dạng AMP cho Email cung cấp một [nhóm con các thành phần AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md) mà bạn có thể sử dụng trong các tin nhắn email. Người nhận email AMP có thể xem và tương tác trực tiếp với các thành phần AMP trong email.

## Đánh dấu bắt buộc

Đoạn code sau đây đại diện cho số đánh dấu tối thiểu tạo thành một email AMP hợp lệ:

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://ampjs.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

Một email AMP PHẢI

- <a name="dctp"></a>bắt đầu với doctype `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>chứa một thẻ `<html ⚡4email>` cấp cao nhất (`<html amp4email>` cũng được chấp nhận). [🔗](#ampd)
- <a name="crps"></a>chứa các thẻ `<head>` và `<body>` (Chúng là không bắt buộc trong HTML). [🔗](#crps)
- <a name="chrs"></a>chứa một thẻ `<meta charset="utf-8">` như con đầu tiên của thẻ head. [🔗](#chrs)
- <a name="scrpt"></a>chứa một thẻ `<script async src="https://ampjs.org/v0.js"></script>` bên trong thẻ head. [🔗](#scrpt)
- <a name="boilerplate"></a>chứa code soạn sẵn amp4email (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) trong thẻ head để ẩn nội dung ban đầu cho đến khi AMP JS được tải. [🔗](#boilerplate)

Toàn bộ đánh dấu AMPHTML phải không vượt quá 200,000 byte.

## Cấu trúc và render <a name="structure-and-rendering"></a>

AMP cho Email phụ thuộc vào loại con [MIME](https://en.wikipedia.org/wiki/MIME) `multipart/alternative` như được định nghĩa trong [RFC 1521, phần 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

_Để biết thêm thông tin, xem [Cấu trúc và render các email AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md)._

## Các thành phần AMP được hỗ trợ <a name="supported-amp-components"></a>

_Xem [Các Thành phần được Hỗ trợ của AMP cho Email](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-components.md)._

## Yêu cầu với HTML <a name="html-requirements"></a>

_Xem [HTML được Hỗ trợ trong AMP cho Email](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-html.md)._

## Yêu cầu với CSS <a name="css-requirements"></a>

### Các bộ chọn và thuộc tính được hỗ trợ <a name="supported-selectors-and-properties"></a>

_Xem [CSS được Hỗ trợ trong AMP cho Email](https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-css.md)._

### Quy định CSS trong một tài liệu AMP <a name="specifying-css-in-an-amp-document"></a>

Mọi CSS trong một tài liệu AMP bất kỳ đều phải được bao gồm trong một thẻ `<style amp-custom>` trong phần header hoặc như các thuộc tính `style` (phong cách) inline.

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

Lưu ý: Toàn bộ thẻ `<style>` (phong cách) không được vượt quá 50.000 byte. Bộ xác thực sẽ kiểm tra điều này.

## Kích thước tài liệu <a name="document-dimensions"></a>

- **Chiều rộng tối ưu**: 800px hoặc nhỏ hơn (nếu rộng hơn thì nội dung có thể bị cắt bớt trên một số máy khách).

- **Chiều cao**: biến số, máy khách cho phép người dùng cuộn qua nội dung.

## Xác thực <a name="validation"></a>

Để đảm bảo email của bạn đáp ứng tiêu chí nghiêm ngặt của định dạng AMP cho Email, bạn có thể sử dụng các công cụ xác thực AMP hiện có.

Xem [Xác thực Email AMP](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/) để biết thêm thông tin.

## Quyền Riêng tư và Bảo mật <a name="privacy-and-security"></a>

### Theo dõi lượt mở email và tương tác <a name="tracking-email-opens-and-interaction"></a>

AMPHTML cho phép theo dõi các lượt mở email với kỹ thuật theo dõi điểm ảnh, cũng như trên các email HTML thông thường. Mọi yêu cầu dữ liệu của người dùng từ các dịch vụ bên ngoài cũng sẽ cho thấy người dùng đang tương tác với thư. Các trình khách email có thể cho người dùng khả năng tắt các ảnh từ xa, và các yêu cầu bên ngoài khác.

### Phân tích chuyên dụng cho AMP <a name="amp-specific-analytics"></a>

Các kỹ thuật phân tích chuyên dụng cho AMP sau đây không được hỗ trợ:

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [Tác vụ thay thế biến số](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Các cân nhắc dành riêng cho thành phần <a name="component-specific-considerations"></a>

Yêu cầu cho các ảnh bên trong [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) hoặc [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) có thể thông báo cho người gửi rằng người dùng đang tương tác với email.

Việc chuyển hướng trong [`<amp-form>`](https://amp.dev/documentation/components/amp-form) bị cấm tại thời gian chạy.

## Phản hồi & Hỗ trợ <a name="feedback--support"></a>

Để được hỗ trợ và phản hồi trong AMP cho Email, hãy sử dụng kênh sau đây: [ongoing-participation](https://github.com/ampproject/amphtml/blob/main/docs/contributing.md#ongoing-participation)
