---
'$title': Thêm băng chuyền
$order: 3
description: Một tính năng phổ biến khác cho các trang di động là băng chuyền. Bạn có thể dễ dàng thêm băng chuyền vào các trang AMP qua thành phần amp-carousel.
---

Một tính năng phổ biến khác cho các trang di động là băng chuyền. Bạn có thể dễ dàng thêm băng chuyền vào các trang AMP qua thành phần [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Hãy bắt đầu bằng một ví dụ đơn giản, ví dụ như băng chuyền ảnh.

## Băng chuyền ảnh đơn giản

Hãy nhớ bao gồm thư viện thành phần [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) bằng cách **thêm** yêu cầu JavaScript sau đây vào thẻ `<head>` của tài liệu:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Sau đó, hãy nhúng một băng chuyền ảnh đơn giản với một bố cục tương thích cùng chiều rộng và chiều cao được định nghĩa sẵn. **Thêm** phần sau vào trang của bạn:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Làm mới** trang của bạn và bạn sẽ thấy một băng chuyền:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

Thành phần [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) có thể được cấu hình theo nhiều cách. Hãy thay đổi UI để chỉ hiển thị một ảnh tại một thời điểm và đặt bố cục tương thích cho băng chuyền.

Để làm điều này, trước hết hãy **đổi** `type` (loại) [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) từ `carousel` (băng chuyền) thành `slides`, **đổi** `layout` (bố cục) thành `responsive` (tương thích) và **đặt** `width` (chiều rộng) thành 300 (đảm bảo nó định nghĩa cả `height` (chiều cao) và `width` (chiều rộng)). **Thêm** thuộc tính `"layout=responsive"` (bố cục=tương thích) vào [`amp-img`](../../../../documentation/components/reference/amp-img.md) con của [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

**Tải lại** trang của bạn. Bây giờ, thay vì một danh sách cuộn các yếu tố, bạn sẽ thấy một yếu tố tại một thời điểm. Hãy thử **vuốt** ngang để di chuyển qua các yếu tố. Nếu bạn vuốt sang yếu tố thứ ba, bạn sẽ không thể vuốt thêm nữa.

Tiếp theo, **thêm** thuộc tính `loop` (vòng lặp). **Làm mới** trang và thử vuốt ngay sang trái. Băng chuyền sẽ có vòng lặp không dừng.

Cuối cùng, hãy cho băng chuyền tự động phát ở tốc độ 2 giây một lần. **Thêm** thuộc tính `autoplay` (tự động phát) và thuộc tính `delay` (độ trễ) với giá trị `2000` (ví dụ, `delay="2000"`) vào [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

Kết quả cuối cùng của bạn sẽ có dạng như sau:

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

Hãy **làm mới** trang và thử ngay!

[tip type="note"] **LƯU Ý –** Bạn có thể đã nhận thấy khi [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) có loại `carousel` (băng chuyền), chúng tôi đã sử dụng loại bố cục `fixed-height` (chiều cao cố định). Có ít loại bố cục được hỗ trợ cho loại `carousel` (băng chuyền); ví dụ loại `carousel` không hỗ trợ bố cục `responsive` (tương thích). Như tên gọi của nó, các yếu tố fixed-height (chiều cao cố định) sẽ chiếm không gian được cung cấp cho chúng, nhưng giữ nguyên chiều cao. Đối với các yếu tố fixed-height, bạn phải quy định thuộc tính `height`, còn thuộc tính `width` nên là `auto` (tự động) hoặc không được đặt. [/tip]

## Nội dung băng chuyền hỗn hợp

Băng chuyền ảnh thì cũng tuyệt đấy, nhưng nếu chúng ta muốn các nội dung phức tạp hơn xuất hiện trong băng chuyền của mình thì sao? Hãy thử pha trộn mọi thứ bằng cách đặt một quảng cáo, một văn bản ngắn, và một ảnh trong cùng một băng chuyền. Liệu [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) có thể xử lý tổ hợp này cùng một lúc? Chắc chắn rồi!

Đầu tiên, hãy **thêm** phong cách này vào `<style amp-custom>` của bạn để đảm bảo các thành phần [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) và [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) hoạt động tốt cùng nhau:

```css
amp-fit-text {
  white-space: normal;
}
```

Bây giờ, **thay thế** băng chuyền đơn giản của bạn bằng:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

**Làm mới** trang này và bạn sẽ thấy một băng chuyền như:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='A carousel of mixed content') }}

Để tìm hiểu thêm, hãy xem tài liệu tham khảo cho thành phần [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[tip type="note"] **LƯU Ý –** Trong ví dụ gần nhất, bạn có thể đã nhận thấy thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) bao gồm một yếu tố `div` con với thuộc tính `placeholder` (mã giữ chỗ). Ở phần trước của bài thực hành này, chúng ta đã gặp một tình huống tương tự với [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) sử dụng một `fallback` (phương án dự phòng). Sự khác biệt giữa mã giữ chỗ và phương án dự phòng là gì? Các yếu tố `Fallback` (phương án dự phòng) xuất hiện khi yếu tố cha không thể tải, nghĩa là không có quảng cáo khả dụng. Các yếu tố `placeholder` (mã giữ chỗ) xuất hiện thay cho yếu tố cha khi nó đang tải. Nói một cách khác, các yếu tố này kê cho quy trình tải của yếu tố cha. Bạn có thể tìm hiểu thêm trong hướng dẫn về [Mã giữ chỗ & phương án dự phòng](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]
