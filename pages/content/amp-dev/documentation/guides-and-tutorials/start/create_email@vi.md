---
'$title': Tạo Email AMP đầu tiên của bạn
$order: 0
description: Tìm hiểu điều gì tạo nên sự khác biệt cho các email AMP bằng cách tạo email đầu tiên của bạn.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

AMP cho Email cho phép người gửi email sử dụng AMP trong các email của họ để hỗ trợ nhiều tính năng mới. Email được viết bằng AMP có thể chứa các yếu tố tương tác như băng chuyền ảnh hoặc accordion, nội dung luôn được cập nhật trong thư, và có thể cho phép người nhận thực hiện hành động như trả lời một biểu mẫu, tất cả mà không cần rời khỏi hộp thư của họ.

AMP cho Email tương thích với các email hiện có. Phiên bản AMP của thư được nhúng trong một email như một thành phần MIME mới, ngoài phần HTML và văn bản thường, đảm bảo sự tương thích trên mọi trình khách email.

Mẹo: Để xem danh sách các nền tảng email (ESP), các máy khách và nhà cung cấp hỗ trợ AMP cho Email, tham khảo [Các Nền tảng Email được Hỗ trợ](../../../support/faq/email-support.md) trong FAQ.

Làm theo bài thực hành này để xây dựng và gửi cho chúng tôi email động đầu tiên của bạn với AMP. Bạn có thể xem đoạn code hoàn thiện [ở đây](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).

# Bắt đầu với code soạn sẵn email AMP

Sân thực hành AMP hỗ trợ định dạng AMP cho Email, cho phép bạn phát triển, kiểm tra và xác thực các Email AMP của mình. Mở [Sân thực hành AMP](https://playground.amp.dev/?runtime=amp4email) và đảm bảo rằng định dạng được thiết lập thành `AMP cho Email` ở góc trên bên trái. Bạn sẽ thấy đoạn code sau:

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

Nó chứa tất cả các đánh dấu cần thiết và đoạn code tối thiểu để được coi là một email AMP hợp lệ. Đồng thời, hãy lưu ý rất nhiều ví dụ khác về các khuôn mẫu email hợp lệ trong danh sách thả xuống ở menu góc trên bên phải.

Hãy dành một chút thời gian để lưu ý một số điểm khác biệt so với email HTML truyền thống:

- Các email AMP phải tự xác nhận bằng cách bao gồm `⚡4email`, hoặc `amp4email`, trong thẻ HTML.
- Thẻ `<head>` (đầu đề) cũng phải chứa một thẻ `<script>` (kịch bản) để tải thời gian chạy AMP. `<script async src="https://ampjs.org/v0.js"></script>`
- Một đoạn code soạn sẵn CSS để ẩn nội dung từ đầu cho đến khi AMP được tải. ` <style amp4email-boilerplate>body{visibility:hidden}</style>`

Nếu trước đây bạn đã làm việc với email, ý tưởng đặt một kịch bản vào một email có thể phát ra những hồi chuông cảnh báo trong đầu bạn! Hãy yên tâm, các nhà cung cấp email hỗ trợ email AMP sẽ áp đặt các biện pháp kiểm tra bảo mật nghiêm ngặt để chỉ cho phép những kịch bản AMP đã được phê duyệt mới được chạy trên máy khách của họ. Điều này cho phép các tính năng động và tương tác có thể được chạy trực tiếp trong hộp thư của người nhận mà không có lỗ hổng bảo mật nào! Đọc thêm về đánh dấu bắt buộc cho Email AMP ở đây.

[tip type="important"] Chỉ kịch bản AMP cho [các thành phần được hỗ trợ](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) mới có thể được bao gồm trong Email AMP. [/tip]

# Bao gồm một ảnh

Hầu hết các thẻ HTML được sử dụng trong email đều có thể được sử dụng trong các email AMP. Tuy nhiên, một số thẻ như `<img>` sẽ được thay bằng thẻ AMP tương đương, [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

Thẻ `<amp-img>` yêu cầu chiều rộng và chiều cao của một ảnh được định nghĩa, và khác với `<img>`, `<amp-img>` phải được đóng rõ ràng bằng `</amp-img>`.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

Thêm vào đó, các tập tin GIF được hỗ trợ thông qua [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

Bởi các email không được lưu trữ trên máy chủ của bạn, các URL phải sử dụng đường dẫn tuyệt đối trong các email AMP và phải là HTTPS.

[Placekitten](https://placekitten.com/) là một website sử dụng các ảnh mèo con làm ảnh giữ chỗ. Họ cho phép bạn chọn trực tiếp kích cỡ của một ảnh ngay trong URL!

Chúng ta có thể bao gồm một ảnh trong email đầu tiên của mình bằng cách thêm mã dưới đây.

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## Tạo sự tương thích

Các email được xem trên nhiều thiết bị và kích thước màn hình khác nhau, và AMP đi kèm với một hệ thống bố cục tích hợp sẵn! Với hệ thống [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) và các truy vấn đa phương tiện, rất dễ để triển khai các email tương thích. Để đổi kích thước ảnh mèo con đã đặt cho phù hợp với màn hình, hãy thêm thuộc tính `layout="responsive"` (bố cục="tương thích") cho thẻ `<amp-image>` của bạn.

[tip type="read-on"] [Đọc thêm về hoạt động của AMP với bố cục và truy vấn đa phương tiện](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Phóng to và thu nhỏ cửa sổ trình duyệt để thấy ảnh này đổi kích thước! Xem [danh sách các thành phần bố cục được hỗ trợ ở đây](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Sửa đổi trình bày và bố cục

Một ảnh thì được, nhưng nếu chúng ta muốn hiển thị nhiều hơn thì sao? AMP cho Email hỗ trợ các yếu tố bố cục, ví dụ như accordion và thanh bên.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

Ở bài thực hành này, chúng ta sẽ sử dụng [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) để hiển thị ảnh các chú mèo có thể nhận nuôi.

Thêm kịch bản `amp-carousel` vào phần head của email của bạn.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Sau đó bọc ảnh đầu tiên của chúng ta trong các thẻ `<amp-carousel>`.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

Bạn có thể nhận thấy rằng không có gì được thay đổi, và đó là một điều tốt! Băng chuyền của chúng ta đã được cho thuộc tính `type=slides`, điều đó có nghĩa nó sẽ hiển thị một ảnh cùng lúc. Bởi chúng ta chỉ đặt một ảnh trong các thẻ, nó sẽ không hiển thị mũi tên thanh trượt cho người dùng.

Sau đó, thay ảnh mèo con đã đặt bằng các ảnh AMP mèo để nhận nuôi trong `<amp-carousel>` của bạn.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

Bây giờ bạn sẽ có thể thay đổi ảnh bằng cách nhấn vào mũi tên điều hướng ở bên trái hoặc bên phải của băng chuyền!

## Gửi đi với phong cách

AMP cho phép tạo phong cách trong phần head của tài liệu trong thẻ `<style amp-custom>`. Ngoài ra, các lớp và lớp giả CSS đã bị cấm trước đó hiện có thể được sử dụng. [Đọc toàn bộ danh sách ở đây](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Hãy cập nhật `Hello, AMP4EMAIL world` thành một tiêu đề thật sự.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

Và sau đó thêm một số phong cách vào phần head.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Thêm Chức năng Động

Các email truyền thống chỉ cho phép nội dung tĩnh. Thông qua AMP, các email sẽ được mở ra một thế giới tiềm năng hoàn toàn mới! Người dùng hiện đã có thể trả lời các [biểu mẫu](/content/amp-dev/documentation/components/reference/amp-form.md), tải [danh sách có nội dung được cập nhật động](/content/amp-dev/documentation/components/reference/amp-list.md), và tương tác với nội dung.

Trong bài thực hành này, chúng ta sẽ sử dụng [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) để hiển thị tên cùng mô tả cho chú mèo có thể được nhận nuôi của chúng ta khi người dùng đang xem slide của chú mèo đó. Bắt đầu với việc bao gồm kịch bản `amp-bind` trong phần head của email.

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

Tiếp đó, chúng ta sẽ khai báo một biến số ràng buộc AMP "myState" dưới dạng một chuỗi JSON trong một thẻ [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). Bởi chúng ta có 4 ảnh mèo, chúng ta sẽ bao gồm trạng thái cho cả 4.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[Các hành động và sự kiện AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) kích hoạt các trạng thái khác nhau. Trong trường hợp của chúng ta, chúng ta muốn cập nhật trạng thái khi người dùng nhấn vào các mũi tên điều hướng băng chuyền. Amp-carousel sẽ kích hoạt một sự kiện [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides) (thay đổi slide), trong đó chúng ta sẽ cập nhật biến số `currentCat` bằng `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

Đoạn code này đặt trạng thái của `currentCat` để phù hợp với ảnh mèo ở thứ tự băng chuyền. Vậy nên nếu chúng ta đang ở slide `event.index=2`, trạng thái sẽ ánh xạ đến mục thứ 2 của dãy.

Việc duy nhất còn lại là hiển thị tên và mô tả cho chú mèo của chúng ta. Thêm đoạn code sau đây bên dưới thẻ đóng `amp-carousel`.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

Phần mở rộng `amp-bind` sử dụng các [biểu thức](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) và [ràng buộc](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) để thay đổi năng động nội dung. Đoạn code mẫu ở trên sử dụng ràng buộc `[text]` để cập nhật văn bản trong thẻ `<span>` mỗi khi trạng thái này được thay đổi bằng cách đánh giá biểu thức `"myState.cats[currentCat].name"`.

[tip type="note"] Để đảm bảo hiệu năng và tránh nguy cơ nhảy nội dung ngoài mong muốn, amp-bind không đánh giá các biểu thức khi tải trang. Điều này có nghĩa các yếu tố thị giác nên được cho một trạng thái mặc định và không phụ thuộc vào amp-bind cho lần render ban đầu. [/tip]

Đừng quên thêm mô tả cho chú mèo của chúng ta sau thẻ `</div>`!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Bây giờ, khi bạn đổi ảnh mèo trong băng chuyền, tên và mô tả của chúng cũng sẽ được cập nhật!

# Gửi email AMP của bạn

Để biết cách gửi email vào hộp thư của bạn, [tìm hiểu thêm về việc thử nghiệm các email AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Chúc mừng! Bạn đã gửi email AMP đầu tiên của mình!

Ở bước tiếp theo, [đọc thêm về các nguyên lý cơ bản của AMP cho Email](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
