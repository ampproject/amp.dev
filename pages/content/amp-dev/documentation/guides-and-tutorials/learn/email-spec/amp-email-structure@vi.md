---
'$title': Cấu trúc và render cho các email AMP
$order: 2
formats:
  - email
teaser:
  text: 'Email được cấu trúc là một '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md.
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

Email được cấu trúc là một cây MIME. Cây MIME chứa nội dung email và mọi tập tin đính kèm email.

Để nhúng AMP trong một email, bạn chỉ cần bổ sung một phần MIME mới với loại nội dung là `text/x-amp-html` làm con cháu của `multipart/alternative`. Nó phải cùng tồn tại với các phần `text/html` hoặc `text/plain` hiện có. Điều này đảm bảo nội dung email sẽ hoạt động trên tất cả các máy khách.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/master/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="Sơ đồ bộ phận AMP cho Email MIME" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

Để biết thêm thông tin về loại con `multipart/alternative`, hãy tham khảo [RFC 1521, phần 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## Thông tin bổ sung <a name="additional-information"></a>

Phần `text/x-amp-html` phải được lồng trong một node `multipart/alternative`. Một email không thể có nhiều hơn một phần `text/x-amp-html` trong một node `multipart/alternative`.

`Multipart/alternative` phải chứa ít nhất một node không phải AMP (`text/plain` hoặc `text/html`) ngoài node `text/x-amp-html`. Nó sẽ được hiển thị cho người dùng mà trình khách email không hỗ trợ AMP hoặc những người đã hủy đăng ký thông qua cài đặt của nhà cung cấp dịch vụ email.

Lưu ý: Một số trình khách email[[1]](https://openradar.appspot.com/radar?id=6054696888303616) sẽ chỉ render phần MIME cuối cùng, vậy nên chúng tôi khuyên bạn nên đặt phần MIME `text/x-amp-html` _trước_ phần MIME `text/html`.

### Ngữ nghĩa trả lời/chuyển tiếp <a name="replyingforwarding-semantics"></a>

Trình khách email loại bỏ phần `text/x-amp-html` của cây MIME khi một người dùng trả lời hoặc chuyển tiếp một email AMP.

### Hết hạn <a name="expiry"></a>

Trình khách email có thể ngừng hiển thị phần AMP của một email sau một khoảng thời gian nhất định, ví dụ như 30 ngày. Trong trường hợp này, email sẽ hiển thị phần `text/html` hoặc `text/plain`.

## Ví dụ <a name="example"></a>

<!-- prettier-ignore-start -->

[sourcecode:html]
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae--
[/sourcecode]

<!-- prettier-ignore-end -->
