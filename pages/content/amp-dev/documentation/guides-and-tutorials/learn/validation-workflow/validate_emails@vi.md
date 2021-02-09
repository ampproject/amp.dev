---
'$title': Xác thực các Email AMP
$order: 1
author: CrystalOnScript
formats:
  - email
---

AMP Email phụ thuộc vào thư viện AMP JS để cho phép các trải nghiệm tương tác phong phú và năng động cho độc giả. Vì lý do này, các nhà cung cấp dịch vụ email đòi hỏi các thư của bạn được xác thực. Các đánh dấu AMP hợp lệ đảm bảo rằng các email là an toàn và vượt quá tiêu chuẩn về trải nghiệm người dùng.

# Làm thế nào tôi có thể kiểm tra rằng email của mình có phải AMP hợp lệ hay không?

Có một vài cách để xác thực một email là một Email AMP hợp lệ. Tất cả đều cho kết quả giống hệt nhau, vậy nên hãy chọn cách phù hợp với phong cách phát triển của bạn nhất!

## Bộ xác thực trên web

[Bộ xác thực AMP trên web](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) hỗ trợ nền tảng AMP cho Email. Sử dụng bộ xác thực trên web bằng cách dán Email AMP của bạn vào công cụ này. Nó sẽ đánh dấu mọi lỗi xác thực ngay trong văn bản.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## Bộ xác thực dòng lệnh

Bạn có thể xác thực Email AMP bằng cách sử dụng [công cụ dòng lệnh của bộ xác thực AMP HTML](https://www.npmjs.com/package/amphtml-validator).

### Cài đặt

1. Đảm bảo bạn có [Node.js với trình quản lý gói 'npm'](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) trên hệ thống của mình.
2. Cài đặt công cụ dòng lệnh của bộ xác thực AMP HTML bằng cách chạy dòng lệnh sau: `npm install -g amphtml-validator`.

### Sử dụng

Sau khi cài đặt công cụ dòng lệnh, chạy lệnh sau đây sau khi đã thay `<amphtml file>` bằng tập tin chứa nội dung Email AMP của bạn.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

Nếu email này là hợp lệ, công cụ dòng lệnh sẽ cho kết quả `PASS` (ĐẠT). Nếu không hợp lệ, nó sẽ trả về lỗi mà nó tìm thấy.

## Sân thực hành AMP

Bạn cũng có thể xác thực Email AMP bằng cách sử dụng [sân thực hành AMP](https://playground.amp.dev/?runtime=amp4email). Tương tự với bộ xác thực trên web, dán Email AMP của bạn vào công cụ, và nền tảng này sẽ đánh dấu mọi lỗi xác thực ngay trong văn bản.

### Xác thực các email đã giao

Đôi khi các Email AMP đã giao của bạn có thể không hợp lệ ngay cả khi các đánh dấu email mà bạn viết đã được xác thực bởi các công cụ được liệt kê trong trang này. Lý do phổ biến nhất cho trường hợp này là bởi [ESP](https://amp.dev/support/faq/email-support/) của bạn đã sửa đổi các đánh dấu trong email và khiến nó trở nên không hợp lệ sau khi bạn đã gửi email của mình cho ESP để giao. Ví dụ, nếu ESP của bạn là SparkPost và bạn chưa cấu hình điểm ảnh theo dõi HTTPS với SparkPost, SparkPost sẽ thêm một điểm ảnh theo dõi HTTP không bảo mật vào email của bạn. Bởi các Email AMP chỉ cho phép ảnh HTTPS, điều này sẽ khiến Email AMP của bạn trở nên không hợp lệ.

Để kiểm tra liệu một email được giao đến hộp thư của bạn có phải AMP hợp lệ hay không:

1. [Tải về Email AMP dưới dạng một tập tin `.eml`](https://www.codetwo.com/kb/export-email-to-file) từ trình khách email của bạn.
2. Mở [sân thực hành AMP](https://playground.amp.dev/?runtime=amp4email).
3. Nhấn vào "IMPORT EMAIL" (NHẬP EMAIL) và chọn tập tin `.eml` mà bạn vừa tải về.

Sân thực hành sẽ nhập email AMP mà bạn vừa tải về vào trình biên tập inline và đánh dấu mọi lỗi xác thực.

# Điều gì xảy ra nếu email của tôi không hợp lệ?

Bộ xác thực AMP không chỉ tiện lợi cho bạn trong quá trình phát triển, mà các nhà cung cấp dịch vụ email hỗ trợ Email AMP sẽ tự động cung cấp phương án dự phòng cho loại MIME HTML hoặc Văn bản thường được cung cấp. Một Email AMP chỉ nên được gửi đi nếu nó đạt tiêu chuẩn của bộ xác thực.
