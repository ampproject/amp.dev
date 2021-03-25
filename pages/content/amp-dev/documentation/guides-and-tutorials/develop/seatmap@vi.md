---
'$title': Tạo một sơ đồ chỗ ngồi
$order: 104
description: Sơ đồ chỗ ngồi là một phần quan trọng của các ứng dụng bán vé trên web, nhưng việc triển khai chúng trong AMP có thể khó khăn. Đọc tiếp để biết cách triển khai một sơ đồ chỗ ngồi trong AMP
tutorial: 'true'
formats:
  - websites
author: kul3r4
contributors:
  - pbakaus
---

Sơ đồ chỗ ngồi là một phần quan trọng của các ứng dụng bán vé trên web, nhưng việc triển khai chúng trong AMP có thể khó khăn. Đọc tiếp để biết cách triển khai một sơ đồ chỗ ngồi trong AMP bằng cách sử dụng một tổ hợp các thành phần AMP có sẵn.

[tip] Một mẫu trực tiếp triển khai các biện pháp thực hành được mô tả dưới đây được cung cấp [ở đây](../../../documentation/examples/documentation/SeatMap.html). [/tip]

## Các thành phần AMP cần thiết

Hãy bắt đầu với việc xem lại các thành phần cần thiết:

### amp-pan-zoom

[`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) cho phép thu phóng và kéo nội dung thông qua thao tác nhấn đúp và véo. Thành phần này là cơ sở để triển khai sơ đồ chỗ ngồi.

### amp-list

[`amp-list`](../../../documentation/components/reference/amp-list.md) truy xuất nội dung một cách năng động từ một điểm cuối CORS JSON và render nó sử dụng khuôn mẫu được cung cấp. Được sử dụng để truy xuất tình trạng sẵn có của sơ đồ chỗ ngồi hiện tại, để người dùng luôn nhận được dữ liệu mới nhất.

### amp-bind

[`amp-bind`](../../../documentation/components/reference/amp-bind.md) bổ sung tính tương tác cho trang. Cần để theo dõi số chỗ ngồi đã được chọn.

### amp-selector

[`amp-selector`](../../../documentation/components/reference/amp-selector.md) đại diện cho một biện pháp kiểm soát cung cấp một menu tùy chọn và cho phép người dùng chọn từ nó. Toàn bộ sơ đồ chỗ ngồi có thể được coi là một menu tùy chọn mà ở đó mỗi chỗ ngồi là một tùy chọn. Nó giúp bạn dễ tạo phong cách cho trạng thái được chọn của chỗ ngồi bằng cách cho phép bạn sử dụng các biểu thức CSS. Ví dụ, biểu thức sau đây điền màu cam cho một chỗ ngồi đã được chọn.

```css
rect[selected].seat {
  fill: var(--orange-theme);
}
```

## Yêu cầu

1. Để vẽ một sơ đồ chỗ ngồi như một tập tin SVG mà ở đó mỗi chỗ ngồi được đại diện bởi một yếu tố `rect`, bạn cần thông tin về mỗi chỗ ngồi: vị trí `x` và `y`, `width` (chiều rộng) và `height` (chiều cao), và có thể là `rx` và `ry` để bo tròn các góc của hình chữ nhật.
2. Một mã định danh riêng cho mỗi chỗ ngồi có thể được sử dụng để đặt chỗ.
3. Một số đo toàn bộ chiều rộng và chiều cao của sơ đồ chỗ ngồi để sử dụng trong thuộc tính `viewbox`.

## Vẽ sơ đồ chỗ ngồi

Sơ đồ chỗ ngồi được render thông qua [`amp-list`](../../../documentation/components/reference/amp-list.md) và [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md). Sau khi nhận dữ liệu từ cuộc gọi [`amp-list`](../../../documentation/components/reference/amp-list.md), bạn có thể sử dụng dữ liệu này để chạy hàm lặp cho từng chỗ ngồi:

[sourcecode:html]
{% raw %}<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button" tabindex="0" class="seat {{unavailable}}" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>{% endraw %}
[/sourcecode]

## Tạo phong cách cho các chỗ ngồi không có sẵn

Trong ví dụ ở trên, `{% raw %}{{unavailable}}{% endraw %}` là giá trị của trường được điểm cuối JSON trả về và được sử dụng để tạo phong cách cho một chỗ ngồi không có sẵn. Lối tiếp cận này không cho phép bạn xóa các thuộc tính như `option="{{id}}"` trong trường hợp một chỗ ngồi không có sẵn, bởi khuôn mẫu này không thể bọc toàn bộ yếu tố `<html>` của cả trang.

Một lối tiếp cận thay thế, chi tiết hơn là lặp lại các thẻ như sau:

[sourcecode:html]
{% raw %}{{#available }}{% endraw %}
<rect option="{{id}}" role="button" tabindex="0" class="seat" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}

{% raw %}{{^available}}{% endraw %}<rect role="button" tabindex="0" class="seat unavailable" x="{{x}}" y="{{y}}" width="{{width}}" height="{{height}}" rx="{{rx}}" ry="{{ry}}"/>{% raw %}{{/available }}{% endraw %}
[/sourcecode]

## Đổi kích cỡ sơ đồ chỗ ngồi của bạn

Trừ khi kích cỡ của sơ đồ chỗ ngồi là cố định, khó có thể đổi kích cỡ [`amp-list`](../../../documentation/components/reference/amp-list.md) có chứa sơ đồ chỗ ngồi. [`amp-list`](../../../documentation/components/reference/amp-list.md) cần kích thước cố định hoặc sử dụng `layout="fill"` (để sử dụng không gian có sẵn của container cha). Có 2 cách để xử lý vấn đề này:

1. Tính không gian có sẵn trên trang sau khi bạn đã biết không gian được sử dụng bởi các thành phần khác như đầu trang và chân trang. Tính toán này có thể được thực hiện trong CSS sử dụng biểu thức `calc` và gán nó làm `min-height` của một div cha của [`amp-list`](../../../documentation/components/reference/amp-list.md).
2. Sử dụng bố cục linh hoạt khi biết chiều cao của bố cục trang.

## Tạo phong cách cho amp-pan-zoom

Nếu dùng lối tiếp cận được mô tả trong phần trước, [`amp-pan-zoom`](../../../documentation/components/reference/amp-pan-zoom.md) cũng sẽ cần sử dụng `layout="fill"`.

[tip type="tip"] **MẸO –** Để giữ không gian trắng quanh sơ đồ chỗ ngồi mà vẫn đặt nó thành một phần của khu vực véo và thu phóng:

- Thêm một div bọc cho svg
- Thêm padding

Nếu bạn không có một div bọc mà lại thêm lề vào SVG, lề đó sẽ không phải là một phần của khu vực véo và thu phóng. [/tip]

## Trạng thái xử lý

Khi người dùng nhấn vào các chỗ ngồi khác nhau, bạn có thể theo dõi `id` của chỗ ngồi được chọn bằng cách sử dụng `amp-state`:

- Thêm một biểu thức [`amp-bind`](../../../documentation/components/reference/amp-bind.md) cho mỗi chỗ ngồi để thêm chỗ ngồi được chọn vào danh sách
- Hoặc sử dụng [`amp-selector`](../../../documentation/components/reference/amp-selector.md) với hành động `on="select:AMP.setState({selectedSeats: event.selectedOptions})"` để tất cả các chỗ ngồi được chọn đều được thêm vào một danh sách

Tuy lối tiếp cận ban đầu không cần thành phần bổ sung [`amp-selector`](../../../documentation/components/reference/amp-selector.md), nó có thể khiến sơ đồ chỗ ngồi trở nên rất chậm bởi mỗi biểu thức [`amp-bind`](../../../documentation/components/reference/amp-bind.md) đều sẽ được đánh giá ở mỗi lần chọn/bỏ chọn chỗ ngồi.

Lối tiếp cận thứ hai cũng cho phép bạn giảm việc trùng lặp biểu thức [`amp-bind`](../../../documentation/components/reference/amp-bind.md) cho mỗi chỗ ngồi sẽ được render bởi khuôn mẫu.

## Cấu trúc HTML cuối cùng

Để tham khảo, đây là HTML cuối cùng cho sơ đồ chỗ ngồi:

[sourcecode:html]
{% raw %}<div class="seatmap-container">
<amp-list layout="fill" src="/json/seats.json" binding="no" items="." single-item noloading>
<template type="amp-mustache">
<amp-pan-zoom layout="fill" class="seatmap">
<amp-selector multiple on="select:AMP.setState({
          selectedSeats: event.selectedOptions
        })" layout="fill">
<div class="svg-container">
<svg preserveAspectRatio="xMidYMin slice" viewBox="0 0 {{width}} {{height}}">
{{#seats}}
<rect option="{{id}}" role="button"
               tabindex="0" class="seat {{unavailable}}"
              x="{{x}}" y="{{y}}"
              width="{{width}}" height="{{height}}"
              rx="{{rx}}" ry="{{ry}}"/>
{{/seats}}
</svg>
</div>
</amp-selector>
</amp-pan-zoom>
</template>
</amp-list>

</div>{% endraw %}
[/sourcecode]
