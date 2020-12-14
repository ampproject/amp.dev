---
"$title": Giới thiệu về hoạt họa phức hợp
"$order": '2'
description: Đối với các hình hoạt họa không thể được thúc đẩy bằng cách thêm và xóa lớp, AMP cung cấp một số thành phần dành riêng cho hoạt họa. Các thành phần này áp dụng nguyên tắc của AMP cho hình hoạt họa...
formats:
- websites
- ads
author: CrystalOnScript
---

Đối với các hình hoạt họa không thể được thúc đẩy bằng cách <a class="" href="https://gitlocalize.com/repo/4863/vi/pages/content/amp-dev/documentation/guides-and-tutorials/develop/animations/triggering_css_animations.md">thêm và xóa lớp</a>, AMP cung cấp một số thành phần dành riêng cho hoạt họa. Các thành phần này áp dụng nguyên tắc của AMP cho hình hoạt họa: chúng nhanh, hiệu quả và đặt người dùng làm ưu tiên hàng đầu. AMP giới hạn các thuộc tính CSS được cho phép bên trong keyframe, nhưng cung cấp các lợi ích như kiểm soát chi tiết, hoạt họa liền mạch, và tương thích đa trình duyệt mà không cần xử lý thêm.

Sử dụng amp-animation nếu bạn cần kiểm soát chặt chẽ khả năng phát lại, cũng như hẹn giờ chính xác với nhiều yếu tố được hoạt họa tại cùng một thời điểm.

## Tạo một hình hoạt họa AMP cơ bản

Thành phần [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) cho phép sử dụng [API Hoạt họa Web](https://www.w3.org/TR/web-animations/) trong AMP.

Một [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) cơ bản là một đối tượng JSON được tạo bằng các thành phần chính yếu sau:

- Yếu tố được hoạt họa bởi thành phần, hoặc `selector` (bộ chọn).
- [Thuộc tính Hẹn giờ](../../../../documentation/components/reference/amp-animation.md#timing-properties)
- [Keyframe](../../../../documentation/components/reference/amp-animation.md#keyframes)
- [Yếu tố Kích hoạt](../../../../documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Bộ chọn

Cũng giống như CSS, thành phần [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) liên kết các thuộc tính hoạt họa với yếu tố bằng cách khai báo tên thẻ, lớp hoặc ID của yếu tố trong trường `"selector"` (bộ chọn). Thành phần này sẽ hoạt họa từng yếu tố với loại thẻ hoặc tên lớp được khai báo. Sử dụng một ID để đảm bảo bạn hoạt họa một yếu tố duy nhất.

### Thuộc tính hẹn giờ

Các [thuộc tính hẹn giờ](../../../../documentation/components/reference/amp-animation.md#timing-properties) kiểm soát thời lượng của một hình hoạt họa, số lần nó được phát, và hướng thực thi keyframe.

Không có thuộc tính hẹn giờ nào là bắt buộc phải có, nhưng một hình hoạt họa có thể không chạy nếu các thuộc tính liên quan đến thời gian và hiển thị bị thiếu, ví dụ như `duration` (thời lượng) và `fill` (lấp đầy).

### Keyframe

Tuy CSS cho phép bạn chuyển từ một trạng thái sang một trạng thái khác thông qua chuyển tiếp, bạn phải khai báo các thuộc tính hoạt họa như là keyframe để triển khai [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) (cũng giống như [hoạt họa CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)). Để đảm bảo phát lại mượt mà và khả năng tương thích với nhiều trình duyệt, [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) [giới hạn các thuộc tính keyframe](../../../../documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) được sử dụng cho các thuộc tính tăng tốc GPU để không bắt tải lại bố cục và có thể hoạt họa trên [luồng compositor (hậu kỳ)](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). Việc này ngăn hình hoạt họa can thiệp vào [tiến trình render](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) của trình duyệt và AMP.

[tip type="note"] Các keyframe được định nghĩa trực tiếp trong một [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) hoặc được tham chiếu từ [`<amp style-keyframe>`](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#keyframes-stylesheet) chừng nào chúng còn tuân thủ các giới hạn về thuộc tính. Đọc thêm về [keyframe trong `amp-animation` ở đây](../../../../documentation/components/reference/amp-animation.md#keyframes). [/tip]

### <a>Yếu tố kích hoạt</a>

Yếu tố kích hoạt bắt đầu trình tự hoạt họa. Phần mở rộng [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) bắt đầu khi `<body>` được hiển thị trên trang hoặc khi kết nối nó với một [hành động hay sự kiện AMP](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)

Việc kích hoạt khi hiển thị `<body>` khá hữu ích khi hình hoạt họa cần chạy ngay khi trang được tải bởi nó xuất hiện "trên bề mặt", hay trong màn hiển thị đầu tiên của trang. Hoạt họa được kích hoạt thông qua hiển thị bằng cách thêm `trigger="visibility"` làm một thuộc tính cho thành phần.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Hoạt họa kết nối với một hành động hay sự kiện bằng cách gán cho thành phần [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) một `id` và liên kết `id` đó với yếu tố kích hoạt sự kiện mong muốn, ví dụ như chạm vào một nút.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Xây dựng các hình hoạt họa phức hợp

Việc xây dựng một hình hoạt họa trong [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) cho phép kiểm soát chi tiết hơn là chỉ bắt đầu và dừng một hình hoạt họa: nó còn có thể tạm dừng, đảo ngược và chuyển hướng đến một điểm cụ thể. Bạn thậm chí còn có thể xâu chuỗi nhiều hình hoạt họa với nhau và hoạt họa các yếu tố theo một trình tự.

### Mục tiêu con

Các yếu tố có cùng thẻ hoặc lớp có thể có các thuộc tính hẹn giờ cụ thể và ghi đè các giá trị biến số được quy định trong hoạt họa cấp cao nhất.

[example preview="top-frame" playground="true" imports="amp-animation"]
```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [{"transform": "translateX(0px)"}, {"transform": "translateX(50%)"}],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">
   start
  </button>
</body>
```
[/example]

### Chuỗi hoạt họa

Nhiều hình hoạt họa có thể kết nối cùng nhau để tạo thành một trình tự lớn. Bạn có thể tạo các hiệu ứng hẹn giờ, ví dụ như hình phủ lên một video, bằng cách viết các hình hoạt họa trong chuỗi `animations` trong thành phần [`amp-animation`](../../../../documentation/components/reference/amp-animation.md).

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>
```

Thiết lập này sẽ phát mỗi hình hoạt họa trong 3 giây trong một trình tự.

Đối với các hình hoạt họa lớn hơn, các hoạt họa trong chuỗi `animations` có thể tham chiếu các thành phần [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) khác.

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### Hoạt họa số yếu tố không xác định

Thông qua việc sử dụng các [biểu thức `var()` và `calc()`](../../../../documentation/components/reference/amp-animation.md) cùng với [phần mở rộng CSS](../../../../documentation/components/reference/amp-animation.md#css-extensions), bạn có thể viết các hình hoạt họa phức hợp và hẹn giờ để hoạt động với số yếu tố bất kỳ. Điều này cho phép dữ liệu năng động do người dùng tạo có thể được hoạt họa một cách dễ dàng và trôi chảy.

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
            {"transform": "translate3d(0px, 0px, 0px)"},
            {"transform": "translate3d(50%, 0px, 100px)"},
            {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
            {"transform": "translate3d(50%, 0px, -100px)"},
            {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex=none role="animation">
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg" layout="fill"></amp-img>
  </div>
</body>
```
[/example]

- Khai báo một biến số, `--duration`, và cho nó giá trị 2 giây.
- Thiết lập `duration` (thời lượng) cho giá trị của var `--duration`.
- Tính độ trễ được áp dụng cho từng yếu tố với lớp `.card`.
    1. [Phần mở rộng `length()`](../../../../documentation/components/reference/amp-animation.md#css-length()-extension) tính số yếu tố `.card` được chọn
    2. Sau đó, độ dài sẽ trừ đi [index()](../../../../documentation/components/reference/amp-animation.md#css-index()-extension) của từng `.card`
    3. Giá trị kết quả sẽ được nhân với var `--duration`
    4. Giá trị cuối cùng tính theo giây sẽ được áp dụng cho độ trễ của yếu tố
- Hình hoạt họa này được áp dụng riêng cho từng yếu tố, để các thẻ được trộn tuần tự thay cho tất cả cùng lúc.

Mở hình hoạt họa trong sân thực hành AMP và thêm các yếu tố [`amp-img`](../../../../documentation/components/reference/amp-img) để kiểm tra hành vi này.

### Chạy tốt ở mọi nơi

Các hình hoạt họa có thể bao gồm [`conditions`](../../../../documentation/components/reference/amp-animation.md#conditions) (điều kiện) cho phép các yếu tố tùy chỉnh. Tùy chỉnh hình hoạt họa cho mọi kích cỡ màn hình thông qua [điều kiện `media` (đa phương tiện)](../../../../documentation/components/reference/amp-animation.md#media-query) và hỗ trợ tương thích ngược với các trình duyệt bằng cách bật [các điều kiện `supports` (hỗ trợ)](../../../../documentation/components/reference/amp-animation.md#supports-condition) trong một [tuyên bố `switch`](../../../../documentation/components/reference/amp-animation.md#animation-switch-statement).

[example preview="top-frame" playground="true"]
```html
<head>
 <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
</head>
<body>
<amp-animation id="mediaAnimation" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "1s",
      "iterations": "4",
      "fill": "both",
      "direction": "alternate",
      "animations": [
        {
          "media": "(min-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(50vw)"
          }
        },
        {
          "media": "(min-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-50vw)"
          }
        }
      ]
    }
  </script>
</amp-animation>
    
  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```
[/example]
