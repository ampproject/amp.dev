---
"$title": Giải quyết các lỗi xác thực
"$order": '2'
description: Trong phần này, chúng ta sẽ xem và giải quyết các lỗi xác thực AMP trong trang AMP của mình. Lưu ý rằng các lỗi này có thể xuất hiện theo thứ tự khác trong bảng điều khiển của bạn.
---

Trong phần này, chúng ta sẽ xem và giải quyết các lỗi xác thực AMP trong trang AMP của mình. Lưu ý rằng các lỗi này có thể xuất hiện theo thứ tự khác trong bảng điều khiển của bạn.

## Bao gồm bộ ký tự

Chúng ta sẽ bắt đầu bằng cách khắc phục lỗi sau:

<pre class="error-text">The mandatory tag 'meta charset=utf-8' is missing or incorrect.</pre>

Để hiển thị đúng văn bản, AMP đòi hỏi bạn nhập bộ ký tự cho trang đó. Thông tin về bộ ký tự siêu dữ liệu cũng phải là con đầu của thẻ `<head>`. Lý do mà thẻ này phải đứng đầu là để tránh diễn giải lại các nội dung đã được thêm trước thẻ bộ ký tự siêu dữ liệu này.

**Thêm** đoạn code sau vào dòng đầu tiên của thẻ `<head>` (đầu đề):

```html
<meta charset="utf-8" />
```

**Lưu** tập tin và tải lại trang. Xác minh rằng không còn lỗi nào liên quan đến bộ ký tự.

## Bao gồm liên kết chính thức

Bây giờ, hãy xem lỗi sau:

<pre class="error-text">The mandatory tag 'link rel=canonical' is missing or incorrect.</pre>

Mỗi tài liệu AMP cần có một liên kết tham chiếu đến phiên bản "chính thức" của tài liệu. Chúng ta sẽ biết thêm về các trang chính thức và những lối tiếp cận khác nhau đến liên kết chính thức trong bước [Quảng bá trang của bạn](discoverable.md) của bài thực hành này.

Ở bài thực hành này, chúng ta sẽ coi bài viết HTML gốc mà chúng ta đang chuyển đổi là trang chính thức.

Hãy **thêm** đoạn code sau bên dưới thẻ `<meta charset="utf-8" />`:

```html
<link rel="canonical" href="/article.html">
```

[tip type="note"] Bạn có thể tạo một trang AMP chính thức độc lập. Bạn vẫn cần liên kết chính thức, nhưng nó nên chỉ đến bài viết AMP:

```html
<link rel="canonical" href="article.amp.html">
```

[/tip]

Bây giờ, hãy **tải lại** trang. Tuy vẫn còn nhiều lỗi cần sửa, nhưng không còn lỗi nào liên quan đến liên kết chính thức.

## Nhập thuộc tính AMP

AMP yêu cầu một thuộc tính trên yếu tố `<html>` gốc của trang để khai báo trang này là một tài liệu AMP.

<pre class="error-text">The mandatory attribute '⚡' is missing in tag 'html ⚡ for top-level html'<br>The mandatory tag 'html ⚡ for top-level html' is missing or incorrect.</pre>

Các lỗi ở trên có thể được giải quyết bằng cách thêm thuộc tính `⚡ ` vào thẻ `<html>` như sau:

```html
<html ⚡ lang="en">
```

Bây giờ, hãy tải lại trang và kiểm tra rằng cả hai lỗi đều đã biến mất.

[tip type="note"] Tuy việc nhập `⚡` là lối tiếp cận được khuyến nghị, nhưng bạn cũng có thể sử dụng thuộc tính `amp` thay cho thuộc tính `⚡`, ví dụ như:

```html
<html amp lang="en">
```

[/tip]

## Quy định một màn hiển thị

Tiếp theo, hãy xử lý lỗi sau đây:

<pre class="error-text">The mandatory tag 'meta name=viewport' is missing or incorrect.</pre>

AMP yêu cầu định nghĩa `width` (chiều rộng) và `minimum-scale` (quy mô nhỏ nhất) cho màn hiển thị. Các giá trị này phải được định nghĩa tương ứng là `device-width` (chiều rộng thiết bị) và `1`. Màn hiển thị là một thẻ thường được bao gồm trong `<head>` của một trang HTML.

Để giải quyết lỗi màn hiển thị, thêm đoạn code HTML sau vào thẻ `<head>`:

```html
<meta name="viewport" content="width=device-width">
```

Các giá trị được quy định cho `width` (chiều rộng) và `minimum-scale` (quy mô tối thiểu) là các giá trị cần thiết trong AMP. Bạn không cần định nghĩa `initial-scale` (quy mô ban đầu), nhưng thuộc tính này thường được bao gồm trong quá trình phát triển web di động và nên được sử dụng. Bạn có thể đọc thêm về màn hiển thị và thiết kế tương thích trong [Cấu hình Màn hiển thị](https://developers.google.com/speed/docs/insights/ConfigureViewport).

Như mọi khi, **tải lại** trang và kiểm tra xem lỗi đã biến mất chưa.

## Thay stylesheet bên ngoài

Lỗi sau đây liên quan đến stylesheet của chúng ta:

<pre class="error-text">The attribute 'href' in tag 'link rel=stylesheet for fonts' is set to the invalid value 'base.css'.</pre>

Cụ thể, lỗi này than phiền về thẻ liên kết stylesheet sau đây trong thẻ `<head>` của chúng ta:

```html
<link href="base.css" rel="stylesheet" />
```

Vấn đề ở chỗ đây là một tham chiếu đến stylesheet bên ngoài. Trong AMP, để đảm bảo thời gian tải tài liệu là nhanh nhất có thể, bạn không thể bao gồm các stylesheet bên ngoài. Thay vào đó, tất cả các quy tắc stylesheet đều phải được nhúng trong tài liệu AMP sử dụng thẻ `<style amp-custom></style>`, hoặc dưới dạng các phong cách inline.

```html
<style amp-custom>

/* The content from base.css */

</style>
```

Vậy nên, hãy giải quyết lỗi này:

1. **Xóa** thẻ `<link>` chỉ đến stylesheet trong phần `<head>` và thay nó bằng một thẻ `<style amp-custom></style>` inline. Thuộc tính `amp-custom` trên thẻ style (phong cách) là bắt buộc.
2. **Sao chép** tất cả các phong cách từ tập tin [`base.css`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.css) vào các thẻ `<style amp-custom></style>`.

Một lần nữa, **tải lại** trang và kiểm tra rằng lỗi stylesheet đã biến mất.

[tip type="note"] **LƯU Ý –** Phong cách nhúng là bắt buộc, và có một giới hạn kích cỡ tập tin là 50 KB cho mọi thông tin phong cách. Bạn nên sử dụng các bộ tiền xử lý CSS như [SASS](http://sass-lang.com/) để tối giản CSS của mình trước khi đặt CSS inline trong các trang AMP. [/tip]

[tip type="important"] **QUAN TRỌNG –** Bạn chỉ nên có một thẻ style (phong cách) trong toàn bộ tài liệu AMP của mình. Nếu bạn có nhiều stylesheet bên ngoài được tham chiếu bởi các trang AMP, bạn sẽ cần hợp nhất các stylesheet này thành một bộ quy tắc đơn nhất. Để xem quy tắc CSS nào là hợp lệ trong AMP, hãy đọc [CSS được hỗ trợ](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md). [/tip]

## Loại trừ JavaScript của bên thứ ba

Tuy các stylesheet có thể được tái xử lý khá dễ dàng với AMP bằng cách đặt CSS inline, điều này không áp dụng cho JavaScript.

<pre class="error-text">The tag 'script' is disallowed except in specific forms.</pre>

Nhìn chung, các kịch bản trong AMP chỉ được cho phép nếu chúng tuân thủ 2 yêu cầu chính:

1. Mọi JavaScript đều phải là không đồng bộ (nghĩa là, bao gồm thuộc tính `async` (không đồng bộ) trong thẻ script (kịch bản)).
2. Mã JavaScript là cho thư viện AMP và mọi thành phần AMP trên trang.

Điều này về cơ bản là loại bỏ việc sử dụng tất cả các JavaScript của người dùng/bên thứ ba trong AMP, ngoại trừ như được ghi nhận dưới đây.

[tip type="note"] Ngoại lệ duy nhất cho hạn chế đối với các kịch bản của người dùng/bên thứ ba là:

1. Các kịch bản bổ sung siêu dữ liệu vào trang hoặc cấu hình các thành phần AMP. Chúng sẽ có thuộc tính loại  `application/ld+json` hoặc  `application/json`.
2. Các kịch bản được bao gồm trong các iframe. Việc bao gồm JavaScript trong một iframe chỉ nên được coi là một biện pháp cuối cùng. Bất cứ khi nào có thể, các chức năng JavaScript chỉ nên được thay bằng [các thành phần AMP](../../../../documentation/components/index.html). Chúng ta sẽ khám phá thành phần AMP đầu tiên của mình trong phần tiếp theo. [/tip]

Hãy thử mở tập tin [`base.js`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/base.js) bên ngoài. Bạn thấy gì? Tập tin này không nên chứa bất kỳ mã JavaScript nào và chỉ bao gồm một nhận xét mang tính thông tin như sau:

```javascript
/*

This external JavaScript file is intentionally empty.

Its purpose is merely to demonstrate the AMP validation error related to the
use of external JavaScript files.

*/
```

Bởi lẽ tập tin JavaScript bên ngoài này không phải là một thành phần chức năng của website chúng ta, chúng ta có thể xóa hoàn toàn tham chiếu đến nó.

**Xóa** tham chiếu đến JavaScript bên ngoài sau đây khỏi tài liệu của bạn:

```html
<script type="text/javascript" src="base.js"></script>
```

Bây giờ, **tải lại** trang và kiểm tra rằng lỗi kịch bản đã biến mất.

## Bao gồm code soạn sẵn CSS cho AMP

Các lỗi sau đây liên quan đến việc thiếu code soạn sẵn:

<pre class="error-text">The mandatory tag 'noscript enclosure for boilerplate' is missing or incorrect.<br>The mandatory tag 'head > style : boilerplate' is missing or incorrect.<br>The mandatory tag 'noscript > style : boilerplate' is missing or incorrect.</pre>

Mọi tài liệu AMP đều cần các code soạn sẵn AMP sau:

```html
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
```

**Thêm** code soạn sẵn vào cuối thẻ `<head>` của tài liệu của bạn.

Thẻ `<style amp-boilerplate>` ban đầu ẩn nội dung của phần body (thân) cho đến khi thư viện JavaScript AMP đã được tải, sau đó nội dung của nó sẽ được render. AMP làm việc này để ngăn các nội dung không có phong cách được render, còn được gọi là Flash Of Unstyled Content (Chớp nội dung không có phong cách - FOUC). Việc này giúp đảm bảo người dùng có trải nghiệm tức thì khi nội dung của trang xuất hiện đồng thời và mọi thứ trên bề mặt đều được render cùng nhau. Thẻ thứ hai chuyển ngược lôgic này nếu JavaScript bị tắt trong trình duyệt.

## Thay `<img>` bằng `<amp-img>`

AMP không hỗ trợ việc sử dụng các thẻ HTML mặc định tương ứng để hiển thị nội dung đa phương tiện, điều này giải thích cho lỗi sau:

<pre class="error-text">The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?</pre>

AMP có một thành phần web được thiết kế cụ thể để thay thẻ `<img>` tên là [`<amp-img>`](../../../../documentation/components/reference/amp-img.md):

```html
<amp-img src="mountains.jpg"></amp-img>
```

**Thay** thẻ `<img>` bằng thẻ [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) ở trên và chạy lại bộ xác thực. Bạn sẽ nhận được một vài lỗi mới:

<pre class="error-text">Layout not supported: container<br>The implied layout 'CONTAINER' is not supported by tag 'amp-img'.</pre>

Vì sao [`amp-img`](../../../../documentation/components/reference/amp-img.md) lại kích hoạt một lỗi khác? Bởi [`amp-img`](../../../../documentation/components/reference/amp-img.md) không thay thế trực tiếp cho thẻ img HTML truyền thống. Có một số yêu cầu bổ sung khi sử dụng [`amp-img`](../../../../documentation/components/reference/amp-img.md).

### Hệ thống bố cục AMP

Lỗi bố cục cho chúng ta biết rằng [`amp-img`](../../../../documentation/components/reference/amp-img.md) không hỗ trợ lại bố cục `container` (hộp chứa). Một trong những khái niệm quan trọng nhất trong thiết kế của AMP là tập trung vào việc giảm thiểu các luồng định hướng lại DOM để render các trang web của nó.

Để giảm luồng định hướng lại DOM, AMP bao gồm một hệ thống bố cục để đảm bảo bố cục của trang được xác định càng sớm càng tốt trong vòng đời tải về và render trang.

Ảnh dưới đây so sánh cách bày biện thông dụng cho một trang HTML so với lối tiếp cận được AMP thực thi. Lưu ý rằng trong lối tiếp cận ở bên trái, văn bản sẽ được định hướng lại mỗi khi một quảng cáo hay ảnh được tải. Lối tiếp cận của AMP đến bố cục là giữ văn bản không bị dịch chuyển--kể cả nếu các ảnh và quảng cáo cần nhiều thời gian để tải.

{{ image('/static/img/docs/tutorials/tut-convert-html-layout-system.png', 837, 394, align='', caption="A comparison between how content is normally laid out and AMP's approach") }}

Hệ thống bố cục AMP cho phép các yếu tố trên một trang được điều chỉnh vị trí và thu phóng theo nhiều cách khác nhau -- kích thước cố định, thiết kế tương thích, chiều cao cố định, v.v...

Trong trường hợp bài viết của chúng ta, hệ thống bố cục sẽ ngầm định loại bố cục cho [`amp-img`](../../../../documentation/components/reference/amp-img.md) là loại `container` (hộp chứa). Tuy nhiên, loại `container` chỉ áp dụng cho các yếu tố có chứa các yếu tố con. Loại `container` không tương thích với thẻ [`amp-img`](../../../../documentation/components/reference/amp-img.md), vốn là lý do cho lỗi này.

Vì sao loại `container` (hộp chứa) lại được ngầm định? Bởi chúng ta đã không quy định một thuộc tính `height` (chiều cao) cho thẻ [`amp-img`](../../../../documentation/components/reference/amp-img.md). Trong HTML, các luồng định hướng lại có thể được giảm bằng cách luôn quy định một chiều rộng và chiều cao cố định cho các yếu tố trên một trang. Trong AMP, bạn cần định nghĩa chiều rộng và chiều cao cho các yếu tố [`amp-img`](../../../../documentation/components/reference/amp-img.md) để AMP có thể xác định sẵn tỷ lệ khung hình của yếu tố này.

**Thêm** `width` (chiều rộng) và `height` (chiều cao) vào thẻ [`amp-img`](../../../../documentation/components/reference/amp-img.md) của bạn như sau:

```html
<amp-img src="mountains.jpg" width="266" height="150"></amp-img>
```

Làm mới trang và kiểm tra bộ xác thực; bạn sẽ không thấy lỗi nào nữa!

Bây giờ bạn đã có một tài liệu AMP hợp lệ, nhưng ảnh có chất lượng không tốt lắm bởi nó được đặt ở vị trí không hợp lý trên trang. Theo mặc định, khi bạn quy định chiều cao và chiều rộng cho một thẻ [`amp-img`](../../../../documentation/components/reference/amp-img.md), AMP sẽ chỉnh kích thước theo quy định của bạn--nhưng nếu AMP có thể thu phóng ảnh một cách *tương thích* và vừa với trang dù kích cỡ màn hình như thế nào thì sao?

{{ image('/static/img/docs/tutorials/tut-convert-html-not-responsive.png', 412, 660, align='center third', caption="Our image isn't responsive.") }}

Rất may, AMP có thể suy diễn tỷ lệ khung hình của các yếu tố từ chiều rộng & chiều cao mà bạn đã quy định. Điều này cho phép hệ thống bố cục AMP điều chỉnh vị trí và thu phóng yếu tố theo nhiều cách khác nhau. Thuộc tính `layout` (bố cục) cho AMP biết cách bạn muốn điều chỉnh vị trí và thu phóng yếu tố.

Hãy **đặt** thuộc tính bố cục là `responsive` (tương thích) để ảnh của chúng ta thu phóng và đổi kích cỡ:

```html
<amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
```

Hoan hô! Ảnh của chúng ta có tỷ lệ khung hình chính xác và lấp đầy một cách tương thích chiều rộng của màn hình.

{{ image('/static/img/docs/tutorials/tut-convert-html-responsive.png', 412, 660, align='center third', caption="Our image is now responsive!") }}

[tip type="read-on"] **ĐỌC TIẾP –** Tìm hiểu thêm về Hệ thống Bố cục AMP trong [Thông số Bố cục của AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md). [/tip]

## Thành công!

Bây giờ tài liệu AMP của bạn sẽ có dạng như sau:

```html
<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width">

    <link rel="canonical" href="/article.html">
    <link rel="shortcut icon" href="amp_favicon.png">

    <title>News Article</title>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: Tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>

      <amp-img src="mountains.jpg" layout="responsive" width="266" height="150"></amp-img>
    </article>
  </body>
</html>
```

Làm mới trang và xem đầu ra bảng điều khiển. Bạn sẽ thấy thông điệp sau:

<pre class="success-text">AMP validation successful.</pre>

### Các câu hỏi thường gặp

- [Luồng định hướng lại DOM là gì?](http://stackoverflow.com/a/27637245)
- [Điều gì xảy ra nếu thuộc tính <code>layout</code> (bố cục) không được quy định?](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified)
- [Điều gì xảy ra nếu chiều rộng và chiều cao không được định nghĩa? ](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-width-and-height-are-undefined)
