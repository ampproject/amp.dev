---
"$title": Cách hoạt động của Bộ tối ưu hoá AMP
"$order": '1'
description: Một Bộ tối ưu hoá AMP tiếp nhận tài liệu HTML AMP hợp lệ làm đầu vào và chuyển nó thành một phiên bản được tối ưu hoá bằng cách áp dụng những tối ưu hoá bổ sung vốn cồng kềnh nếu làm thủ công. Hướng dẫn này giải thích chi tiết cách hoạt động của Bộ tối ưu hoá AMP.
formats:
- websites
- stories
author: sebastianbenz
---

Một Bộ tối ưu hoá AMP tiếp nhận tài liệu HTML AMP hợp lệ làm đầu vào và chuyển nó thành một phiên bản được tối ưu hoá bằng cách áp dụng những tối ưu hoá bổ sung vốn cồng kềnh nếu làm thủ công. Bạn có thể nhận thấy kết quả “**AMP được biến đổi**” trong phần tử `html` qua thuộc tính `transformed`:

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self;v=1">
```

Lưu ý: bộ nhớ đệm AMP sử dụng một cờ hiệu được biến đổi khác, chẳng hạn bộ nhớ đệm AMP của Google thêm vào `transformed=google;v=1`.

Bộ Tối ưu hoá AMP thực hiện nhiều tác vụ tối ưu hoá khác nhau trên một tài liệu AMP, từ việc render bố cục phía máy chủ cho đến tối ưu hoá hình ảnh. Đây là một ví dụ cho thấy những khác biệt giữa một trang AMP với phiên bản tối ưu hoá của nó ([nhấp để thấy phiên bản lớn hơn](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

Trong phần còn lại của hướng dẫn này, chúng tôi sẽ giới thiệu chi tiết những tác vụ tối ưu hoá này.

### Render phía máy chủ đối với bố cục AMP

Server-side rendering AMP layouts has the biggest potential to improve the loading performance of your AMP page. To avoid content jumps, AMP requires websites to add the [AMP-boilerplate code](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) in the header. The AMP-boilerplate hides the page content by setting the page body's opacity to 0. Once AMP has been loaded, it is able to calculate the layout of the page. After that, AMP sets the body's opacity to 1 making the page content visible. Unfortunately, this approach must download the AMP framework before it can render the page.

To improve this, AMP layouts, such as the `responsive` or `fixed-height` layout, can be rendered server-side before serving the page to the user agent. This way it becomes possible to remove the AMP-boilerplate while still avoiding [content shifts](https://web.dev/cls/) during page load.

Tác vụ render phía máy chủ làm ba việc sau:

⁣**1. Remove the AMP boilerplate: ** for each element using an AMP layout, the layout-specific markup gets injected.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.css">AMP-runtime CSS styles</a>: <style amp-runtime>...</style>. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣**3. Server-side rendered AMP layouts: ** for each element using an AMP layout, the layout-specific sizer elements gets injected.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Warning: The AMP boilerplate cannot always be removed. You can find out if the boilerplate has been removed, by checking if the `i-amphtml-no-boilerplate` attribute is present on the`html` element. For example, the `amp-experiment` component changes page content at runtime. To avoid content shifts requires the AMP-boilerplate code needs to be present if `amp-experiment` is used on a page.

### Tối ưu hoá hình ảnh anh hùng

An AMP Optimizer can significantly improve the time it takes to render images in the first viewport. This is critical when optimizing the [LCP times](https://web.dev/lcp/) to meet the [Core Web Vitals](https://web.dev/vitals).

Trong AMP, hình ảnh anh hùng có thể được khai báo rõ ràng bằng cách chú thích một `amp-img` với thuộc tính `data-hero` :

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

Những Bộ tối ưu hoá AMP hỗ trợ tối đa hai hình ảnh anh hùng trên một trang để tránh chặn băng thông đối với những tài nguyên quan trọng khác. Nếu giới hạn này không hiệu quả với bạn, [hãy cho chúng tôi biết](https://github.com/ampproject/amp-toolbox/issues).

AMP Optimizers will also auto-detect hero images for `amp-img`, `amp-iframe`, `amp-video`, or `amp-video-iframe` elements and inject `link rel=preload` for the image `src`. Auto-detecting works by analysing HTML markup and image layouts to detect large images in the first viewport.

In case of `amp-img`, AMP Optimizers will also server-side render the `img` tag inside the `amp-img`. This enables the browser to render the image straight away without the AMP runtime being required.

### Tối ưu hoá hình ảnh

AMP Optimizers can help you serve optimized responsive images by generating AMP Layout specific `srcset` attributes. For example, the following `amp-img` declaration:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

được cải tiến bằng định nghĩa sau của `srcset`:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

Để phần này hoạt động, môi trường bản dựng/máy chủ cần hỗ trợ việc đặt kích thước lại/tối ưu hoá hình ảnh. Hãy xem những hướng dẫn về bộ tối ưu hoá riêng lẻ về cách tốt nhất tích hợp tác vụ tối ưu hoá hình ảnh.

### Bản dựng Mô-đun AMP (sẽ sớm ra mắt)

Có một phiên bản nhỏ hơn của Thời gian chạy AMP và những thành phần khả dụng dựa trên [Mô-đun JavaScript](https://v8.dev/features/modules#browser) vốn yêu cầu người dùng tải xuống ít JavaScript hơn khi xem một trang AMP. Bộ tối ưu hoá AMP theo mặc định kích hoạt bản dựng Mô-đun AMP, bằng cách biến đổi:

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

thành:

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

Những trình duyệt nào hiểu `type="module"` sẽ bỏ qua đoạn mã có một thuộc tính `nomodule`. Điều này nghĩa là người dùng với trình duyệt hiện đại sẽ hưởng lợi từ những gói thời gian chạy nhỏ hơn, trong khi người dùng trên trình duyệt cũ sẽ quay về lại phiên bản không có mô-đun của thời gian chạy AMP.

Note: the AMP Module Build is only available for transformed AMP as it requires the AMP Runtime CSS to be inlined.
