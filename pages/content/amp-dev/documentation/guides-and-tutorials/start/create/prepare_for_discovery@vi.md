---
'$title': Chuẩn bị trang của bạn để quảng bá và phân phối
$order: 4
description: 'Trong một số trường hợp, bạn có thể muốn có cả hai phiên bản AMP và không phải AMP của cùng một trang, ví dụ như cho một bài viết tin tức. Hãy cân nhắc: Nếu Google Tìm kiếm...'
author: pbakaus
contributors:
  - bpaduch
---

Trong một số trường hợp, bạn có thể muốn có cả hai phiên bản AMP và không phải AMP của cùng một trang, ví dụ như cho một bài viết tin tức. Hãy cân nhắc: Nếu Google Tìm kiếm tìm thấy phiên bản không phải AMP của trang đó, _liệu họ có biết rằng có một phiên bản AMP "cặp đôi" của nó hay không_?

## Liên kết các trang với `<link>`

Để thiết lập rằng một trang không phải AMP và một trang AMP cần được đối xử như một "cặp", chúng ta sẽ bổ sung thông tin về trang AMP cho trang không phải AMP và ngược lại, dưới dạng các thẻ `<link>` trong phần `<head>`.

Thêm mã sau vào trang không phải AMP:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Và thêm mã này vào trang AMP:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## Điều gì xảy ra nếu tôi chỉ có một trang?

Nếu bạn chỉ có một trang, và đó là một trang AMP, bạn vẫn phải thêm liên kết chính thức cho nó, liên kết này sẽ chỉ vào chính nó:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **ĐỌC TIẾP –** Tìm hiểu thêm về cách Google tìm ra các trang AMP trong [hướng dẫn của Google Tìm kiếm dành cho các trang AMP](https://support.google.com/webmasters/answer/6340290). [/tip]
