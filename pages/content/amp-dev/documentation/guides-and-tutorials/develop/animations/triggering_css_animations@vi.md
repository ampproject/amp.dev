---
'$title': Kích hoạt hình hoạt họa & chuyển tiếp CSS
$order: 1
description: Kích hoạt hình hoạt họa CSS trên các trang phụ thuộc vào việc thêm và xóa các lớp, và được thực hiện qua JavaScript. Bạn có thể đạt được hành vi này trên các trang AMP bằng cách sử dụng hành động toggleClass...
formats:
  - websites
  - ads
---

Các hình hoạt họa CSS cho phép yếu tố web chuyển tiếp giữa các cấu hình phong cách CSS khác nhau. Trình duyệt có thể bắt đầu các hình hoạt họa được định nghĩa khi tải, nhưng các hình hoạt họa CSS được kích hoạt bởi sự kiện [phụ thuộc vào việc thêm và xóa các lớp](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP hỗ trợ cả hai loại hoạt họa.

Sử dụng CSS khi bạn có một hình hoạt họa nhỏ, chứa bên trong và không cần hẹn giờ chính xác.

## Định nghĩa CSS và keyframe

Bạn có thể định nghĩa CSS trong AMP theo các cách sau:

[filter formats="websites, stories"]

- Trong thẻ `<style amp-custom>` ở trong đầu mục tài liệu. Giới hạn 75.000 byte.
- Phong cách inline. Mỗi trường hợp của một phong cách inline có giới hạn là 1.000 byte. Các phong cách inline được tính vào giới hạn 75.000 byte `<style amp-custom>`.
- Trong thẻ `<style amp-keyframes>` ở trong đầu mục tài liệu. Giới hạn 500.000 byte. Giới hạn cho các thuộc tính keyframe.

[/filter]

[filter formats="ads"]

- Trong thẻ `<style amp-custom>` ở trong đầu mục tài liệu. Giới hạn 20.000 byte.
- Phong cách inline. Mỗi trường hợp của một phong cách inline có giới hạn là 1.000 byte. Các phong cách inline được tính vào giới hạn 20.000 byte `<style amp-custom>`.
- Trong thẻ `<style amp-keyframes>` ở trong đầu mục tài liệu. Giới hạn 500.000 byte. Giới hạn cho các thuộc tính keyframe.

[/filter]

[tip type="read-on"] Đọc thêm trong phần [Phong cách & bố cục](../style_and_layout/index.md) về việc sử dụng CSS trong AMP. [/tip]

[filter formats="websites, stories"] Để đảm bảo trang web của bạn luôn tinh gọn và tải nhanh, AMP đã áp đặt giới hạn 75.000 byte CSS cho thẻ `<amp style-custom>`. Tuy bạn có thể sử dụng nó để định nghĩa các phong cách hoạt họa, giới hạn 500.000 byte trong thẻ `<amp style-keyframes>` cho phép các hình hoạt họa chi tiết hơn và không chiếm tài nguyên phong cách quý giá của website. [/filter]

[filter formats="ads"] Để đảm bảo quảng cáo của bạn luôn tinh gọn và tải nhanh, AMP đã áp đặt giới hạn 20.000 byte CSS cho thẻ `<amp style-custom>`. Tuy bạn có thể sử dụng nó để định nghĩa các phong cách hoạt họa, giới hạn 500.000 byte trong thẻ `<amp style-keyframes>` cho phép các hình hoạt họa chi tiết hơn và không chiếm tài nguyên phong cách quý giá của website. [/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## Thêm, xóa và chuyển đổi các lớp

Hành động AMP, `toggleClass` cho phép thêm và xóa các lớp cho các yếu tố được định nghĩa.

```js
elementName.toggleClass(class="className")
```

Bạn có thể chuyển đổi một lớp trên một yếu tố mà bạn muốn người dùng tương tác, ví dụ như menu hamburger có hình hoạt họa.

```html
<div
  id="hamburger"
  tabindex="1"
  role="button"
  on="tap:hamburger.toggleClass(class='close')"
></div>
```

Hành động `toggleClass` cũng có thể được áp dụng cho các yếu tố khác và chuyển đổi giữa hai lớp bằng cách thêm thuộc tính `force`.

```html
<button
  on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)"
>
  Disappear
</button>
<button
  on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)"
>
  Reappear
</button>
```

Nếu bạn cần xóa một lớp và cấm nó được áp dụng lại, hãy thêm thuộc tính `force` với giá trị `false`. Nếu bạn cần thêm một lớp và cấm nó bị xóa, hãy thêm thuộc tính `force` với giá trị `true`.

## Hoạt họa với CSS và trạng thái

Bạn có thể thêm và xóa số lớp CSS bất kỳ với các trạng thái sử dụng [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
  ></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px);
    }
    .right {
      transform: translatex(50px);
    }
    button {
      margin-top: 1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"></div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
</body>
```

[/example]

Định nghĩa hình hoạt họa nhiều lớp bằng cách thêm một danh sách các lớp CSS trong thẻ `<style amp-custom>` ở trong phần `head` (đầu mục) tài liệu.

```css
.visible {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
.left {
  transform: translatex(-50px);
}
.right {
  transform: translatex(50px);
}
```

Sau đó ghép đôi mỗi lớp với một trạng thái:

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

Và liên kết yếu tố với các lớp:

```html
<div [class]="magicBox[animateBox].className"></div>
```

Các trạng thái sẽ thay đổi từ một hành động hoặc sự kiện AMP được liên kết. Ví dụ sau đây thay đổi trạng thái từ tương tác người dùng:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
```

Việc sử dụng [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) bằng cách này sẽ thiết lập lớp thành lớp được định nghĩa một cách rõ ràng. Bạn sẽ không phải buộc nó xóa các lớp khác.
