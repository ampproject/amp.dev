---
"$title": Thêm phông chữ
"$order": '6'
description: 'Bạn có thể nhúng các phông chữ tùy chỉnh vào trang AMP của mình theo 2 cách: 1. Thông qua một thẻ <link>: chỉ các nhà cung cấp phông chữ được cho phép. 2. Bằng cách sử dụng...'
---

Trong AMP, để đảm bảo thời gian tải tài liệu là nhanh nhất có thể, bạn không thể bao gồm các stylesheet bên ngoài. Tuy nhiên, có một ngoại lệ cho quy tắc này—**phông chữ**.

Bạn có thể nhúng các phông chữ tùy chỉnh vào trang AMP của mình theo 2 cách:

1. Thông qua một thẻ `<link>`: chỉ các nhà cung cấp phông chữ được cho phép.
2. Bằng cách sử dụng quy tắc CSS `@font-face`: không có hạn chế nào, tất cả các phông chữ đều được cho phép.

Trong bài thực hành này, chúng ta sẽ sử dụng một thẻ `<link>` để thêm phông chữ vào trang của mình. **Thêm** một liên kết stylesheet trong thẻ `<head>` để yêu cầu phông chữ Raleway:

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway">
```

Bây giờ, **cập nhật** bộ chọn CSS `body` của bạn để bao gồm một tham chiếu đến Raleway:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Làm mới** trang của bạn và xem giao diện mới của trang. Đồng thời, hãy kiểm tra đầu ra của bộ xác thực AMP. Sẽ không có lỗi nào cho yêu cầu stylesheet bên ngoài này.

[tip type="note"] Các phông chữ web có thể làm giảm hiệu năng của một website, kể cả trên một website AMP tốc độ cao. Sử dụng đặc tính CSS [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) để tối ưu hành vi tải cho các phông chữ của bạn. [/tip]

Bạn đã hoàn thành bài viết tin tức AMP của mình! Nó trông sẽ như thế này:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}
