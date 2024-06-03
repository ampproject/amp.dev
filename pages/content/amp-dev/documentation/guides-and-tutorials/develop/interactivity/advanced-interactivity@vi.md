---
'$title': Cải thiện tính tương tác
$order: 2
description: 'Đoạn code bắt đầu chỉ cung cấp một trải nghiệm người dùng rất cơ bản. Có một vài cách để cải thiện đoạn code này - Thêm một chỉ báo để hiển thị...'
---

Đoạn code bắt đầu chỉ cung cấp một trải nghiệm người dùng rất cơ bản. Có một vài cách để cải thiện đoạn code này:

- Thêm một chỉ báo để hiển thị slide hiện tại và tổng số slide.
- Khi một người dùng chọn một màu áo khác, thay đổi băng chuyền ảnh để hiển thị các ảnh có màu áo được chọn.

Trước khi có thành phần [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), việc bổ sung các tính năng này chưa thể được thực hiện. Hãy thực hành với [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) và thêm các tính năng mới này vào code mẫu của chúng ta!

## Cài đặt thành phần `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) là một thành phần AMP cho phép tương tác tùy chỉnh thông qua ràng buộc dữ liệu và các biểu thức giống JS. Để sử dụng [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), bạn phải cài đặt nó trên trang này.

Mở tập tin [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) và thêm kịch bản sau vào danh sách các thành phần AMP trong phần `<head>` của trang:

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

## Thêm một chỉ báo slide

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) hoạt động bằng cách ràng buộc các thuộc tính yếu tố với các biểu thức tùy chỉnh. Các biểu thức này có thể tham chiếu "state" (trạng thái - dữ liệu JSON tắt được). Chúng ta có thể kích hoạt trạng thái này thông qua thành phần [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) bao gồm với [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### Kích hoạt trạng thái slide

Hãy kích hoạt một biến số trạng thái để theo dõi thứ tự của slide đang được hiển thị trong băng chuyền ảnh. Mở [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) và thêm đoạn code sau vào phần trên cùng của phần `<body>` trang (trước phần `<header>`):

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

Dữ liệu trong yếu tố [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) có thể được truy cập bằng ID liên kết của chúng. Ví dụ, chúng ta có thể tham chiếu biến số này theo đoạn biểu thức sau:

```javascript
selected.slide; // Evaluates to 0.
```

### Cập nhật trạng thái slide

Tiếp theo, hãy cập nhật biến số này khi người dùng thay đổi slide trên băng chuyền bằng cách thêm hành động `"on"` sau đây vào yếu tố [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) sẵn có:

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

Bây giờ, mỗi khi slide hiển thị cho [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) được thay đổi, hành động `AMP.setState` sẽ được gọi với tham số sau:

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

Biểu thức `event.index` sẽ cập nhật thứ tự slide mới, và hành động `AMP.setState()` hợp nhất object literal này vào trạng thái hiện tại. Nó sẽ thay giá trị hiện tại của `selected.slide` bằng giá trị của `event.index`.

[tip type="tip"] **MẸO –** `AMP.setState()` sẽ hợp nhất sâu cho object literal lồng. Để biết thêm chi tiết, hãy xem tài liệu [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

### Ràng buộc các yếu tố chỉ báo

Tiếp theo, hãy tận dụng biến số trạng thái này để theo dõi slide đang được hiển thị, và tạo một chỉ báo slide. Tìm yếu tố chỉ báo slide (tìm `<!-- TODO: "Add a slide indicator" -->`) và thêm các ràng buộc sau cho con của nó:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` là một ràng buộc thay đổi thuộc tính `class` và bạn có thể sử dụng nó để thêm hoặc xóa các lớp CSS từ mọi yếu tố.

**Thử ngay**: Làm mới trang và thay đổi slide!

Thông qua việc thay đổi slide trên băng chuyền, nó sẽ:

1. Kích hoạt `slideChange event` (sự kiện slideChange)...
2. Việc này sẽ gọi hành động `AMP.setState`...
3. Nó sẽ cập nhật biến số trạng thái `selected.slide` ...
4. Việc này sẽ cập nhật ràng buộc `[class]` trên các yếu tố chỉ báo `<span>`!

Tốt lắm! Bây giờ chúng ta đã có một chỉ báo slide dùng được.

[tip type="success"]

Hãy xem liệu bạn có thể thêm chức năng để khi một người dùng chạm vào chấm chỉ báo của slide, nó sẽ cập nhật băng chuyền ảnh với mục đã chọn. Gợi ý: sử dụng sự kiện `tap` (chạm) và ràng buộc `[slide]` trên [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Thay đổi ảnh trong băng chuyền

Sẽ tốt hơn nếu chúng ta có thể thấy các ảnh màu áo khác nhau khi thay đổi màu đã chọn. Với [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), chúng ta có thể làm việc này bằng cách ràng buộc `[src]` trên các yếu tố [`amp-img`](../../../../documentation/components/reference/amp-img.md) trong [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Kích hoạt trạng thái SKU

Đầu tiên, chúng ta cần kích hoạt dữ liệu trạng thái với các URL nguồn ảnh của mỗi màu áo. Hãy làm việc này với một yếu tố [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) mới:

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

Yếu tố [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) này chứa một đối tượng JSON ánh xạ một chuỗi định danh áo (nghĩa là một SKU) với màu và URL ảnh của chiếc áo tương ứng. Một chuỗi JSON cũng có thể được dùng ở đây, nhưng việc sử dụng một đối tượng sẽ cho phép chúng ta làm nhiều việc thú vị hơn mà bạn sẽ sớm thấy.

Bây giờ chúng ta có thể truy cập URL ảnh thông qua mã định danh của áo. Ví dụ, `shirts['10014'].color` sẽ cập nhật thành `"dark green"` (xanh lá sẫm) và `shirts['10030'].image ` sẽ trả về URL ảnh cho màu áo `"wine"` (rượu vang).

### Theo dõi SKU đã chọn

Nếu chúng ta bổ sung một biến số trạng thái khác để theo dõi SKU đã chọn, chúng ta có thể ràng buộc một biểu thức cho các yếu tố [`amp-img`](../../../../documentation/components/reference/amp-img.md) để cập nhật thuộc tính `src` của chúng khi SKU đã chọn được thay đổi. Thêm một khóa `sku` mới vào JSON của yếu tố `amp-state#selected` hiện tại:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### Cập nhật trạng thái SKU

Thêm một hành động "on" vào [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) để cập nhật biến số `selected.sku` mỗi khi một màu mới được chọn:

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] **MẸO –** Việc này cũng có thể được thực hiện bằng cách thêm hành động `on="tap:AMP.setState(...)` vào mỗi [`amp-img`](../../../../documentation/components/reference/amp-img.md) con trong [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). Một ưu điểm của [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) là nó sẽ đơn giản hóa cách đánh dấu như thế này. [/tip]

### Ràng buộc các yếu tố hình ảnh

Sau đó, bổ sung ràng buộc cho [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img
  width="200"
  height="250"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="300"
  height="375"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="400"
  height="500"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
```

[tip type="note"] **LƯU Ý –** Trong thực tế, nhiều khả năng mỗi ảnh trong băng chuyền sẽ đều có một `src` khác nhau. Việc này có thể được thực hiện bằng cách thay ảnh đơn bằng một chuỗi ảnh. Để đơn giản, bài thực hành này chỉ sử dụng một ảnh đơn ở các cấp độ thu phóng khác nhau. [/tip]

**Thử ngay**: Làm mới trang và chọn một màu áo khác. Khi đó, ảnh của băng chuyền sẽ được cập nhật để hiển thị các áo có màu đã chọn.
