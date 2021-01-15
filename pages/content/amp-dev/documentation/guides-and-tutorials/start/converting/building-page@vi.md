---
"$title": Xây dựng một trang HTML thông thường
"$order": '1'
description: Trong thư mục dự án, bạn sẽ thấy một tập tin tên là article.html. Đây là bài viết tin tức đang được chúng ta tạo một trang AMP tương đương...
---

Trong thư mục dự án, bạn sẽ thấy một tập tin tên là [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). Đây là bài viết tin tức đang được chúng ta tạo một trang AMP tương đương.

1. **Sao chép** toàn bộ đoạn mã từ tập tin `article.html` và dán nó vào một tập tin mới.
2. **Lưu** tập tin mới là `article.amp.html`.

[tip type="note"] **LƯU Ý –** Bạn không phải đặt tên tập tin AMP của mình là `.amp.html`. Trên thực tế, các tập tin AMP có thể có bất kỳ phần mở rộng nào mà bạn muốn. Các nhà phát hành thường phân biệt trang AMP với các phiên bản chính thức bằng cách sử dụng tham số trong URL. Ví dụ: `http://publisher.com/article.html?amp`. [/tip]

Tập tin `article.amp.html` của bạn nên có dạng như sau:

```html
<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

Đây là một trang đơn giản với các yếu tố bài viết tin tức tĩnh thông dụng: CSS, JavaScript, cùng một thẻ ảnh.

Hiện tại, phiên bản AMP của bài viết chỉ là bản sao của bài viết gốc. Hãy chuyển đổi nó sang dạng AMP.

Để bắt đầu, chúng ta sẽ thêm tập tin thư viện AMP. Bản thân việc này sẽ không biến tập tin mới của bạn thành một trang AMP hợp lệ, nhưng chúng ta sẽ thấy dưới đây cách thư viện AMP có thể giúp chúng ta hiểu mình cần làm gì để khắc phục điều đó.

Để bao gồm thư viện AMP, hãy **bổ sung** dòng này vào cuối thẻ `<head>`:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Tải** trang `article.amp.html` mới trong trình duyệt của bạn tại [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html) và sau đó, **mở** [Bảng điều khiển Nhà phát triển](https://developer.chrome.com/devtools/docs/console) trong Chrome (hoặc trình duyệt ưa thích của bạn).

Khi bạn kiểm tra đầu ra JavaScript trong Bảng điều khiển Nhà phát triển (hãy đảm bảo bạn đã chọn tab Console (Bảng điều khiển)), bạn sẽ thấy mục nhật ký này:

```text
Powered by AMP ⚡ HTML
```

Thư viện AMP bao gồm một [bộ xác thực AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) sẽ cho bạn biết vấn đề nào đang ngăn trang của bạn trở thành một tài liệu AMP hợp lệ. **Bật** bộ xác thực AMP bằng cách thêm mẩu mã định danh này vào URL tài liệu của bạn:

```text
#development=1
```

Ví dụ:

```text
http://localhost:8000/article.amp.html#development=1
```

Trong Bảng điều khiển Nhà phát triển, bạn sẽ nhận một vài lỗi xác thực (bạn có thể cần làm mới thủ công trang này trong trình duyệt để thấy chúng):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='AMP validation errors for our sample') }}

Để biến trang này thành một tài liệu AMP hợp lệ, chúng ta sẽ phải sửa tất cả các lỗi này--đó là điều chúng ta sẽ làm trong bài codelab này.

Trước đó, hãy **giả lập** một trải nghiệm thiết bị di động trong công cụ phát triển của trình duyệt, bởi chúng ta đang làm việc với một bài viết tin tức trên di động. Ví dụ, trong Chrome DevTools, nhấn vào biểu tượng điện thoại di động, và chọn một thiết bị di động từ menu.

Bạn sẽ thấy một độ phân giải giả lập di động trong trình duyệt, ví dụ như:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Mobile simulation of our AMP page') }}

Bây giờ thì chúng ta đã sẵn sàng làm việc! Hãy kiểm tra lần lượt từng lỗi xác thực và xem chúng liên quan đến AMP như thế nào.
