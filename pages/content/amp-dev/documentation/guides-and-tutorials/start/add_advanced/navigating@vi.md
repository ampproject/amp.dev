---
"$title": Điều hướng trong website của bạn
"$order": '5'
description: Hầu hết các website di động đều bao gồm một menu điều hướng trong website. Các menu này có thể có nhiều dạng khác nhau. Trong bài thực hành này, chúng ta sẽ thử các ví dụ sau đây để...
---

Hầu hết các website di động đều bao gồm một menu điều hướng trong website. Các menu này có thể có nhiều dạng khác nhau. Trong bài thực hành này, chúng ta sẽ thử các ví dụ sau đây để điều hướng trong các trang AMP:

- Một liên kết quay về trang chủ của bạn - tùy chọn đơn giản nhất.
- Một thanh điều hướng bên sử dụng thành phần [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

## Liên kết về trang chủ

Cách đơn giản nhất để người dùng truy cập các tùy chọn điều hướng thông thường của website là dẫn họ về trang chủ của bạn!

Hãy thử **thay thế** thẻ `<header>` với phiên bản này, bao gồm một liên kết:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img class="home-button" src="icons/home.png" width="36" height="36"></amp-img>
  </a>
 <div class="site-name">News Site</div>
</header>
```

Và **thêm** các quy tắc phong cách này vào CSS inline của bạn:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

Bây giờ, hãy **làm mới** trang này. Bạn sẽ thấy một liên kết ở góc trên bên trái của trang chỉ đến `homepage.html`. Nếu bạn nhấn vào biểu tượng trang chủ, bạn sẽ nhanh chóng phát hiện rằng nó không dẫn đến đâu cả (bởi chúng ta không có một tập tin `homepage.html`).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Home icon navigation') }}

Liên kết này có thể được thay bằng URL của trang chủ website để cho phép người dùng của bạn điều hướng đến các phần khác của website thông qua tính năng điều hướng hiện có của website.

Đây là lối tiếp cận đơn giản nhất sử dụng tính năng điều hướng hiện có của website. Tiếp theo, chúng ta sẽ khám phá một tùy chọn thông dụng để điều hướng trong website.

## Điều hướng với một thanh bên

Một kỹ thuật điều hướng thông dụng là thêm một biểu tượng menu mà khi được nhấn, sẽ cho thấy một nhóm các liên kết điều hướng (từ bên trang). Trong AMP, chúng ta có thể tạo tính năng điều hướng này với thành phần [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

Trước tiên, chúng ta phải **add** JavaScript của thành phần [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) vào thẻ `<head>`:

```html
<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
```

Tiếp theo, chúng ta sẽ muốn hiển thị một biểu tượng menu. Khi biểu tượng này được nhấn, nó sẽ mở ra thanh bên. **Thay** phần `<header>` bằng mã sau để hiển thị một biểu tượng ["hamburger"](https://en.wikipedia.org/wiki/Hamburger_button) thay cho biểu tượng trang chủ:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">☰</div>
  <div class="site-name">News Site</div>
</header>
```

Trong mã ở trên, chúng ta sẽ `toggle` (bật/tắt) thanh bên thông qua thuộc tính hành động [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) (bật) trên yếu tố  [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md), được xác định bởi ID `sidebar1`. Hãy thêm thanh bên.

**Thêm** HTML sau ngay sau phần `</header>`:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div role="button" aria-label="close sidebar" on="tap:sidebar1.toggle" tabindex="0" class="close-sidebar">✕</div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Thanh bên của chúng ta sẽ bị ẩn, nhưng khi người dùng nhấn vào biểu tượng hamburger, menu này sẽ xuất hiện ở bên trái màn hình. Để đóng menu, người dùng có thể chạm vào biểu tượng X.

Cuối cùng, **thêm** các quy tắc phong cách này vào CSS inline của bạn:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom:10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

OK, hãy xem thanh bên của chúng ta. **Làm mới** và tải lại trang AMP của bạn. Nó sẽ trông như thế này:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Sidebar menu navigation') }}

Trang của chúng ta trông thật tuyệt! Hãy bổ sung một nét hoàn thiện—phông chữ tùy chỉnh.
