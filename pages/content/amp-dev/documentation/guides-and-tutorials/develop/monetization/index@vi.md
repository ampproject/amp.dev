---
'$title': Kiếm tiền từ trang AMP của bạn với quảng cáo
$order: 0
description: Hướng dẫn này cung cấp các chỉ đẫn và biện pháp thực hành tiên tiến nhất để hiển thị quảng cáo trên trang AMP của bạn. Vậy nên, để hiển thị quảng cáo trong AMP, bạn cần thêm thành phần amp-ad tùy chỉnh...
formats:
  - websites
---

Hướng dẫn này cung cấp các chỉ đẫn và biện pháp thực hành tiên tiến nhất để hiển thị quảng cáo trên trang AMP của bạn.

## Thêm quảng cáo vào trang của bạn

Trong các trang không phải AMP (trang HTML truyền thống), nếu bạn muốn hiển thị quảng cáo trên trang của mình, bạn cần bao gồm một đoạn code JavaScript để phục vụ quảng cáo từ mạng lưới quảng cáo của mình. Vì các lý do hiệu năng và bảo mật, bạn không thể bao gồm JavaScript của bên thứ ba trong các trang AMP. Vậy nên, để hiển thị quảng cáo trong AMP, bạn cần thêm thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) tùy chỉnh vào trang AMP của mình.

[tip type="tip"] **MẸO –** Đọc [AMP By Example để tham khảo một bản demo trực tiếp](../../../../documentation/components/reference/amp-ad.md) về việc thêm một thẻ amp-ad vào một trang AMP. [/tip]

Hãy thực hiện các bước để thêm thành phần này, để bạn có thể hiển thị quảng cáo trên trang AMP của mình.

### Bước 1: Thêm kịch bản amp-ad

Thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) là một phần mở rộng quảng cáo tùy chỉnh cho thư viện AMP. Chạy ngầm bên dưới [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) là JavaScript tùy chỉnh, đã được thiết kế kỹ lưỡng để tối ưu hiệu năng. Để chạy thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), bạn phải thêm JavaScript cần thiết cho thành phần này vào phần `head` của trang AMP của mình:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

### Bước 2: Thêm thẻ amp-ad vào trang AMP của bạn

Có hơn 100 [máy chủ và mạng lưới quảng cáo](ads_vendors.md) cung cấp khả năng tích hợp với AMP. Để thêm một quảng cáo cho một mạng lưới quảng cáo nhất định, bạn cần thêm thẻ [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) và quy định mạng lưới trong thuộc tính `type`.

Trong ví dụ này, chúng ta cần thêm một ô quảng cáo để phục vụ quảng cáo từ mạng lưới a9:

```html
<amp-ad type="a9"> </amp-ad>
```

### Bước 3: Quy định kích cỡ cho đơn vị quảng cáo

Thêm thuộc tính `width` và `height` vào thẻ [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Việc này sẽ quy định kích cỡ của quảng cáo trên trang AMP của bạn:

```html
<amp-ad type="a9"> width="300" height="250" </amp-ad>
```

### Bước 4: Thiết lập các tham số cho mạng lưới quảng cáo

Mỗi mạng lưới có các thuộc tính dữ liệu cụ thể mà họ cần để phục vụ quảng cáo. Tham khảo tài liệu [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) của mạng lưới quảng cáo và thêm các thuộc tính cần thiết. Trong ví dụ sau, mạng lưới a9 cần các tham số bổ sung để quy định kích cỡ của quảng cáo, cùng các chi tiết khác:

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

### Bước 5: (Không bắt buộc) Quy định một mã giữ chỗ

Tùy thuộc vào mạng lưới quảng cáo, bạn có thể chọn hiển thị một mã giữ chỗ cho đến khi quảng cáo có thể được xem. Việc này cung cấp một trải nghiệm người dùng tốt hơn bằng cách ngăn ngừa một không gian trống. Để quy định một mã giữ chỗ, hãy thêm một yếu tố con với thuộc tính `placeholder` (mã giữ chỗ). Tìm hiểu thêm trong [Mã giữ chỗ & phương án dự phòng](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Bước 6: (Không bắt buộc) Quy định một phương án dự phòng

Tùy thuộc vào mạng lưới quảng cáo, bạn có thể chọn hiển thị một yếu tố phương án dự phòng nếu không có quảng cáo nào có thể được phục vụ. Để quy định một phương án dự phòng, hãy thêm một yếu tố con với thuộc tính `fallback` (phương án dự phòng). Tìm hiểu thêm trong [Mã giữ chỗ & phương án dự phòng](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

Chúc mừng! Bạn đang phục vụ quảng cáo trên trang AMP của mình!

## Phục vụ các quảng cáo AMPHTML bán hàng trực tiếp

Thành phần [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) phục vụ quảng cáo từ mạng lưới mà bạn đã chọn. Các quảng cáo này có thể là quảng cáo HTML tiêu chuẩn hay quảng cáo AMPHTML, với điều kiện mạng lưới quảng cáo này hỗ trợ quảng cáo AMPHTML. Để phục vụ các quảng cáo bán hàng trực tiếp của bạn dưới dạng quảng cáo AMPHTML, hãy tạo quảng cáo trong AMP HTML theo yêu cầu về [thông số quảng cáo AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) và sử dụng một [máy chủ quảng cáo phục vụ các quảng cáo AMPHTML](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/a4a-readme.md#publishers).

## Tăng cường dữ liệu mục tiêu cho các yêu cầu quảng cáo

Như một phần của cơ cấu phục vụ Fast Fetch (Truy xuất Nhanh), tính năng Cấu hình trong Thời gian Thực (RTC) cho phép các nhà pahst hành tăng cường những yêu cầu quảng cáo với thông tin mục tiêu của bên thứ nhất và bên thứ ba, được truy xuất tại thời gian chạy. RTC cho phép 5 cuộc gọi ra ngoài đến các máy chủ mục tiêu cho từng ô quảng cáo riêng lẻ, kết quả của nó sẽ được chèn vào yêu cầu quảng cáo. Để sử dụng RTC trên các quảng cáo của bạn, mạng lưới quảng cáo mà bạn sử dụng phải hỗ trợ RTC và Fast Fetch.

Bạn có thể tìm hiểu thêm về RTC từ video YouTube này:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Watch Effective AMP Monetization with Header Bidding.']

Hoặc, tìm hiểu thêm từ các tài nguyên RTC này:

- [Hướng dẫn triển khai cho nhà phát hành AMP RTC](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-publisher-implementation-guide.md)
- [Cấu hình trong Thời gian Thực AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md)

## Biện pháp thực hành tiên tiến nhất

Sau đây là một số mẹo để tối ưu hóa hiệu quả quảng cáo cho các trang AMP của bạn:

### Đặt & kiểm soát: tối ưu vị trí đặt quảng cáo của bạn

- **Đặt số lượng quảng cáo giống nhau** trên các Trang AMP và Trang không phải AMP để cho doanh thu tối đa trên mỗi trang.
- **Đặt quảng cáo đầu tiên ngay bên dưới màn hiển thị thứ nhất **("dưới bề mặt") để cung cấp một trải nghiệm người dùng tối ưu.
- Trừ khi bạn đang sử dụng các truy vấn CSS hoặc nội dung đa phương tiện nâng cao, **hãy đảm bảo đơn vị quảng cáo của bạn được đặt chính giữa trang** để cung cấp cho người dùng một trải nghiệm web di động tối ưu.
- Cho phép các [yêu cầu quảng cáo nhiều kích cỡ](https://github.com/ampproject/amphtml/blob/main/ads/README.md#support-for-multi-size-ad-requests) trên kho AMP của bạn để tăng áp lực đấu giá quảng cáo và thúc đẩy doanh thu.

### Nhu cầu & định giá: nhận giá tốt cho quảng cáo của bạn

- **Bán các đơn vị quảng cáo trên trang AMP của bạn trên tất cả các kênh quảng cáo**, bao gồm trực tiếp và gián tiếp để tối đa hóa tính cạnh tranh cho kho quảng cáo của bạn trên các trang AMP.
- **Định giá kho quảng cáo của bạn trên các trang AMP** bằng với trên các trang không phải AMP. Giám sát hiệu năng và điều chỉnh giá tương ứng.
- **Đảm bảo tất cả các kênh quảng cáo đều cạnh tranh** để có được kho quảng cáo trên trang AMP của bạn.

### Loại quảng cáo: Phục vụ loại quảng cáo tốt nhất

- **Tránh các quảng cáo nặng** theo [hướng dẫn IAB](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf).
- **Tránh quảng cáo interstitial (đan xen)** hay các định dạng quảng cáo khác khiến nội dung phải được định hướng lại khi tải quảng cáo.
- **Tối ưu khả năng xem** bằng cách thiết lập chiến lược tải quảng cáo thành ưu tiên khả năng xem hơn lượt xem.
- **Đặt quảng cáo trong nội dung video** của bạn thông qua các [trình phát được hỗ trợ](../../../../documentation/components/index.html#media) hay [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) để cho phép doanh thu trên mọi loại nội dung.
- **Triển khai các quảng cáo tự nhiên** để cạnh tranh với quảng cáo hiển thị sử dụng các yêu cầu quảng cáo nhiều kích cỡ, tăng áp lực về nhu cầu, đồng thời cho độc giả của bạn một trải nghiệm người dùng cao cấp.

### Đổi mới: Cung cấp các sản phẩm quảng cáo cuốn hút nhất

- **Triển khai quảng cáo trên các trang AMP phụ trợ** để tạo doanh thu tăng dần:
  - [Quảng cáo trong một băng chuyền](../../../../documentation/examples/documentation/Carousel_Ad.html)
  - [Quảng cáo trong một lightbox](../../../../documentation/examples/documentation/Lightbox_Ad.html)
  - ... và [nhiều hơn thế nữa](../../../../documentation/examples/index.html)
- **Triển khai các định dạng mới cho quảng cáo bán hàng trực tiếp** để trang bị cho đội ngũ bán hàng của bạn với những sản phẩm quảng cáo sáng tạo, tác động mạnh:
  - [Quảng cáo Dính](../../../../documentation/examples/documentation/amp-sticky-ad.html)
  - [Thảm bay](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Tài nguyên bổ sung

- [Khuôn mẫu quảng cáo AMPHTML](../../../../documentation/examples/index.html)
- [Demo: Cách để thêm `amp-ad` vào trang AMP của bạn](../../../../documentation/components/reference/amp-ad.md)
