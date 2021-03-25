---
'$title': Xem trước và xác thực
$order: 5
description: 'Xem trước trang AMP cũng như cách bạn xem trước mọi website HTML tĩnh khác. Không cần bước xây dựng hay tiền xử lý nào. Bạn có thể chọn: ...'
author: pbakaus
contributors:
  - bpaduch
---

## Xem trước

Xem trước trang AMP cũng như cách bạn xem trước mọi website HTML tĩnh khác. Không cần bước xây dựng hay tiền xử lý nào. Bạn có thể chọn:

- **Mở trực tiếp trang này trong trình duyệt từ hệ thống tập tin** (một số yếu tố nhất định có thể không hoạt động do lỗi XMLHttpRequests).
- **Sử dụng một máy chủ web cục bộ như Apache 2 hoặc Nginx**. _(Mẹo: Để thiết lập nhanh một máy chủ web, hãy chạy <code>python -m SimpleHTTPServer</code>.)_

## Xác thực

Tiếp theo, đảm bảo trang AMP của bạn **là một trang AMP hợp lệ**, nếu không, nó sẽ không được khám phá và phân phối bởi các nền tảng của bên thứ ba như Google Tìm kiếm. Để xác thực:

1. Mở trang của bạn trong trình duyệt.
2. Thêm "`#development=1`" vào URL, ví dụ như, `http://localhost:8000/released.amp.html#development=1`.
3. Mở [bảng điều khiển Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/debug/console/) và kiểm tra lỗi xác thực.

[tip type="read-on"] **ĐỌC TIẾP –** [Tìm hiểu thêm về xác thực](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), và những việc cần làm khi bạn gặp lỗi. [/tip]
