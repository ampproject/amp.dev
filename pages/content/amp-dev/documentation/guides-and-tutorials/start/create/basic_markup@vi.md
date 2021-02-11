---
'$title': Tạo trang AMP HTML của bạn
$order: 1
description: 'Sử dụng HTTPS: Khi tạo các trang và nội dung AMP, bạn nên cân nhắc sử dụng giao thức HTTPS (thay cho HTTP). Tuy bản thân tài liệu không bắt buộc sử dụng HTTPS...'
author: pbakaus
contributors:
  - bpaduch
---

Các đánh dấu sau là một điểm bắt đầu hay code soạn sẵn tốt. Hãy sao chép và lưu chúng vào một tập tin với phần mở rộng .html.

[sourcecode:html]

<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Nội dung của phần body (thân), đến hiện tại, vẫn còn khá đơn giản. Nhưng có rất nhiều mã bổ sung trong phần head (đầu đề) của trang mà có thể không quá rõ ràng. Hãy cùng phân tích đánh dấu bắt buộc.

Sử dụng HTTPS: Khi tạo các trang và nội dung AMP, bạn nên cân nhắc sử dụng giao thức HTTPS (thay cho HTTP). Tuy bản thân tài liệu hay các ảnh và phông chữ không bắt buộc sử dụng HTTPS, nhưng có rất nhiều tính năng cần HTTPS (ví dụ như video, iframe, v.v.). Để đảm bảo các trang AMP của bạn tận dụng được tất cả các tính năng AMP, hãy sử dụng giao thức HTTPS. Bạn có thể tìm hiểu thêm về HTTPS trong bài ["Tầm quan trọng của HTTPS"](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

[tip type="tip"] Sử dụng [Trình tạo Code soạn sẵn AMP](/boilerplate) để nhanh chóng bắt đầu tạo các trang AMP mới. [/tip]

## Đánh dấu bắt buộc

Các tài liệu AMP HTML PHẢI:

| Quy tắc                                                                                                                                                                                                            | Mô tả                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bắt đầu với loại tài liệu `<!doctype html>`.                                                                                                                                                                       | Tiêu chuẩn cho HTML.                                                                                                                                                                                                                                  |
| Chứa một thẻ `<html ⚡>` cấp cao nhất <br>(`<html amp>` cũng được chấp nhận).                                                                                                                                      | Xác định trang này là có nội dung AMP.                                                                                                                                                                                                                |
| Chứa các thẻ `<head>` và `<body>`.                                                                                                                                                                                 | Chúng là tùy chọn trong HTML nhưng là bắt buộc trong AMP.                                                                                                                                                                                             |
| Chứa một thẻ `<meta charset="utf-8">` như con đầu tiên của thẻ `<head>`.                                                                                                                                           | Thẻ này xác định mã hóa cho trang.                                                                                                                                                                                                                    |
| Chứa một thẻ `<script async src="https://cdn.ampproject.org/v0.js"></script>` trong thẻ `<head>`. Theo biện pháp thực hành tiên tiến nhất, bạn nên bao gồm kịch bản này càng sớm càng tốt trong `<head>` (đầu đề). | Bao gồm và tải thư viện AMP JS.                                                                                                                                                                                                                       |
| Chứa một thẻ `<link rel="canonical" href="$SOME_URL">` trong phần `<head>`.                                                                                                                                        | Chỉ đến phiên bản HTML thông thường của tài liệu AMP HTML này hoặc đến chính nó nếu phiên bản HTML đó không tồn tại. Tìm hiểu thêm trong phần [Quảng bá trang của bạn](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). |
| Chứa một thẻ `<meta name="viewport" content="width=device-width>`. Bạn cũng nên bao gồm initial-scale=1.                                                                                                           | Quy định một màn hiển thị tương thích. Tìm hiểu thêm trong bài [Tạo các trang AMP tương thích](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).                                                         |
| Chứa [code soạn sẵn AMP](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) trong thẻ <code><head></code>.                                                                              | Một đoạn code soạn sẵn CSS để ẩn nội dung từ đầu cho đến khi AMP JS được tải.                                                                                                                                                                         |

## Siêu dữ liệu tùy chọn

Ngoài các yêu cầu tối thiểu, đoạn code mẫu của chúng ta cũng bao gồm một định nghĩa Schema.org ở phần head (đầu đề), vốn không phải là yêu cầu bắt buộc cho AMP, nhưng cần để phân phối nội dung của bạn ở một số nơi (ví dụ, trong băng chuyền câu chuyện hàng đầu của Google Tìm kiếm).

[tip type="read-on"] Truy cập các tài nguyên này để tìm hiểu thêm:

- [Bắt đầu với AMP trên Google Tìm kiếm](https://developers.google.com/amp/docs) - tìm hiểu để chuẩn bị các trang AMP của bạn cho Google Tìm kiếm.
- [Mẫu siêu dữ liệu](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples) - tìm hiểu thêm về tất cả các siêu dữ liệu mà bạn sẽ cần ở các nơi khác nhau (ví dụ: Twitter). [/tip]

<hr>

Tin tốt đây! Đó là tất cả những gì chúng ta cần để tạo trang AMP đầu tiên, nhưng dĩ nhiên, chưa có nhiều nội dung trong phần body (thân). Ở phần tiếp theo, chúng ta sẽ bàn về cách để thêm các nội dung cơ bản như ảnh, yếu tố AMP tùy chỉnh, cách để tạo phong cách cho trang của bạn và áp dụng một bố cục tương thích.
