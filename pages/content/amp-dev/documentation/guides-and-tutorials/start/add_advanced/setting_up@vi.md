---
'$title': Thiết lập
$order: 0
description: 'Trước khi bắt đầu bài thực hành này, bạn sẽ cần: - Kiến thức cơ bản về HTML, CSS và JavaScript - Kiến thức cơ bản về các khái niệm cốt lõi của AMP, xem...'
'$parent': '/content/docs/fundamentals/add_advanced.md'
---

## Yêu cầu trước khi tiến hành

**Trước khi bắt đầu** bài thực hành này, bạn sẽ cần:

- Kiến thức cơ bản về HTML, CSS và JavaScript
- Kiến thức cơ bản về các khái niệm cốt lõi của AMP (xem bài thực hành ["Chuyển đổi HTML sang AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md))
- Một trình duyệt có thể kiểm tra bảng điều khiển JavaScript
- Một trình soạn văn bản tùy theo bạn chọn

## Thiết lập môi trường phát triển của bạn

### Bước 1. Tải về đoạn code

Tải đoạn code mẫu cho bài thực hành dưới dạng [tập tin ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) hoặc qua git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

Giải nén tập nén (nếu cần) và điều hướng đến thư mục dự án thông qua dòng lệnh trên máy tính của bạn:

```shell
cd accelerated-mobile-pages-advanced
```

Thư mục dự án chứa nhiều tập tin tài nguyên mẫu và trang [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) bắt đầu.

### Bước 2. Chạy trang mẫu

Để kiểm tra trang AMP mẫu, chúng ta cần truy cập các tập tin từ một máy chủ web. Có nhiều cách khác nhau để tạo một máy chủ web cục bộ tạm thời vì mục đích kiểm tra. Sau đây là một số tùy chọn, chọn mục phù hợp nhất với bạn:

- [Ứng dụng “Web Server for Chrome” của Google Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Một máy chủ HTTP Python cục bộ](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] **LƯU Ý –** Chúng tôi đặc biệt khuyến nghị bạn sử dụng HTTPS trong môi trường sản xuất. HTTPS có nhiều lợi ích khác nhau ngoài bảo mật, bao gồm cả SEO. Bạn có thể đọc thêm về chủ đề này trong [bài đăng blog Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html). [/tip]

Sau khi thiết lập máy chủ web cục bộ của bạn, hãy truy cập bài viết mẫu cho trình duyệt tại [URL này](http://localhost:8000/article.amp.html):

```text
http://localhost:8000/article.amp.html
```
