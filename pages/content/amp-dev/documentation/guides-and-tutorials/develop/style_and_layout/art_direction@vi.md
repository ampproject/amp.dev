---
'$title': Ảnh tương thích với srcset, kích cỡ & chiều cao
$order: 4
description: Sử dụng thuộc tính srcset để kiểm soát các tài sản của một yếu tố dựa trên các biểu thức đa phương tiện khác nhau. Cụ thể, sử dụng nó cho tất cả các thẻ amp-img để quy định...
formats:
  - websites
  - email
  - ads
  - stories
components:
  - iframe
author: pbakaus
contributors:
  - bpaduch
---

## srcset

Sử dụng thuộc tính `srcset` để kiểm soát các tài sản của một yếu tố dựa trên các biểu thức đa phương tiện khác nhau. Cụ thể, sử dụng nó cho tất cả các thẻ [`amp-img`](../../../../documentation/components/reference/amp-img.md) để quy định các tài sản ảnh nào sẽ được sử dụng dựa trên các kích cỡ màn hình khác nhau. AMP sẽ tự động tạo một thuộc tính `sizes` (kích cỡ) <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img" data-md-type="link">đáp ứng định nghĩa của HTML5 về `sizes` (kích cỡ)</a> cho tất cả các thẻ `<img>` trong nền của `<amp-img>` nếu `<amp-img>` có một thuộc tính `srcset` nhưng không có `sizes` (kích cỡ).

Trong ví dụ đơn giản này, `srcset` quy định các ảnh sẽ được sử dụng dựa trên chiều rộng màn hình. Ký hiệu `w` cho trình duyệt biết chiều rộng của mỗi ảnh trong danh sách:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
>
</amp-img>
```

[/example]

[tip type="note"] **LƯU Ý –** AMP hỗ trợ srcset với ký hiệu `w` trong mọi trình duyệt. [/tip]

Tìm hiểu thêm về việc tạo các ảnh tương thích sử dụng `srcset` trong [Sử dụng Ảnh Tương thích (Ngay bây giờ)](http://alistapart.com/article/using-responsive-images-now).

## sizes (kích cỡ)

Bạn cũng có thể sử dụng thuộc tính `sizes` (kích cỡ) không bắt buộc của AMP, cùng với `srcset`. Thuộc tính `sizes` (kích cỡ) của AMP mô tả cách để tính kích cỡ yếu tố dựa trên một biểu thức đa phương tiện bất kỳ. <strong data-md-type="raw_html">Việc định nghĩa `sizes` (kích cỡ) trên bất kỳ Yếu tố AMP nào sẽ khiến AMP đặt một phong cách inline về chiều rộng cho yếu tố đó theo truy vấn đa phương tiện liên quan.</strong> Dựa trên kích cỡ tính được của yếu tố, user agent sẽ lựa chọn nguồn tương đối nhất được cung cấp bởi thuộc tính `srcset`.

Cân nhắc ví dụ sau:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw"
>
</amp-img>
```

[/example]

Thuộc tính `sizes` (kích cỡ) định nghĩa chiều rộng của yếu tố là 50% kích cỡ của màn hiển thị khi màn hiển thị có chiều rộng 650px hoặc hơn. Ví dụ, nếu màn hiển thị là 800px, chiều rộng của yếu tố sẽ là 400px. Sau đó, trình duyệt sẽ chọn tài nguyên `srcset` tương đương với 400px, giả sử rằng tỷ lệ điểm ảnh của thiết bị là 1, trong trường hợp này là `hummingbird-narrow.jpg` (320px).

[tip type="important"] **QUAN TRỌNG –** Khi thuộc tính sizes (kích cỡ) được quy định cùng với chiều rộng và chiều cao, bố cục sẽ được đặt mặc định là <code>responsive</code> (tương thích). [/tip]

Đọc thêm về [thuộc tính `sizes` (kích cỡ) của AMP ở đây](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

## heights (chiều cao)

Mọi yếu tố tùy chỉnh AMP cho phép bố cục `responsive` (tương thích), đồng thời cũng hỗ trợ thuộc tính `heights` (chiều cao). Giá trị của thuộc tính này là biểu thức sizes (kích cỡ) dựa trên biểu thức đa phương tiện tương tự với [thuộc tính img sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), nhưng với 2 điểm khác biệt chính:

1. Nó áp dụng chiều cao chứ không phải là chiều rộng của yếu tố.
2. Nó cho phép giá trị phần trăm, ví dụ như `86%`. Nếu giá trị phần trăm được sử dụng, nó sẽ chỉ báo phần trăm chiều rộng của yếu tố.

Khi thuộc tính `heights` (chiều cao) được quy định với `width` (chiều rộng) và `height` (chiều cao), `layout` (bố cục) sẽ được đặt mặc định là `responsive` (tương thích).

Một ví dụ:

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%"
>
</amp-img>
```

[/example]

Trong ví dụ này, chiều cao của yếu tố theo mặc định sẽ là 80% chiều rộng, nhưng đối với màn hiển thị rộng hơn `500px`, nó sẽ được giới hạn ở `200px`.
