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

Render phía máy chủ đối với bố cục AMP có tiềm năng lớn nhất trong việc cải thiện hiệu năng tải của trang AMP. Để tránh tình trạng nội dung nhảy giật, AMP yêu cầu website thêm [code soạn sẵn AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) vào phần header. Code soạn sẵn AMP ẩn nội dung trang bằng cách đặt giá trị độ mờ (opacity) cho thân trang là 0. Sau khi AMP được tải, ta có thể tính toán bố cục của trang. Sau đó, AMP đặt độ mờ cho thân trang thành 1, làm cho nội dung trang hiển thị. Không may là phương cách này phải tải xuống khung AMP trước khi nó có thể render trang.

Để cải thiện điều này, bố cục AMP, chẳng hạn bố cục `responsive` hay `fixed-height`, có thể được render ở phía máy chủ trước khi phân phát trang đến tác nhân người dùng. Bằng cách này ta có thể xoá bỏ code soạn sẵn AMP trong khi vẫn tránh được tình trạng [nội dung dịch dời](https://web.dev/cls/) trong suốt quá trình tải trang.

Tác vụ render phía máy chủ làm ba việc sau:

⁣**1. Xoá bỏ code soạn sẵn AMP: ** đối với từng phần tử dùng bố cục AMP, phần đánh dấu dành riêng cho bố cục sẽ được đưa vào.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.css">AMP-runtime CSS styles</a>: &lt;style amp-runtime>...&lt;/style>. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣**3. Bố cục AMP render phía máy chủ: ** đối với từng phần tử dùng bố cục AMP, những phần tử đổi kích cỡ dành riêng cho bố cục sẽ được đưa vào.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Cảnh báo: Không phải lúc nào bạn cũng có thể xoá bỏ code soạn sẵn AMP. Bạn có thể tìm hiểu xem code soạn sẵn đã bị xóa hay chưa, bằng cách kiểm tra xem thuộc tính `i-amphtml-no-boilerplate` có hiện diện trên phần tử `html` hay không. Ví dụ: thành phần `amp-experiment` thay đổi nội dung trang trong thời gian chạy. Để tránh việc nội dung dịch dời, code soạn sẵn AMP cần hiện diện nếu `amp-experiment` được sử dụng trên một trang.

### Tối ưu hoá hình ảnh anh hùng

Bộ tối ưu hoá AMP có thể cải thiện đáng kể thời gian cần có để render hình ảnh ở màn hiển thị đầu tiên. Đây là điều hệ trọng khi tối ưu hoá [thời gian LCP](https://web.dev/lcp/) để đáp ứng được [Core Web Vitals (Chỉ số thiết yếu về web)](https://web.dev/vitals).

Trong AMP, hình ảnh anh hùng có thể được khai báo rõ ràng bằng cách chú thích một `amp-img` với thuộc tính `data-hero` :

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

Những Bộ tối ưu hoá AMP hỗ trợ tối đa hai hình ảnh anh hùng trên một trang để tránh chặn băng thông đối với những tài nguyên quan trọng khác. Nếu giới hạn này không hiệu quả với bạn, [hãy cho chúng tôi biết](https://github.com/ampproject/amp-toolbox/issues).

Bộ tối ưu hoá AMP cũng sẽ tự động phát hiện những hình ảnh anh hùng cho phần tử `amp-img`, `amp-iframe`, `amp-video`, hay `amp-video-iframe` và đưa vào `link rel=preload` cho hình ảnh `src`. Chức năng tự động phát hiện cũng có tác dụng bằng cách phân tích phần đánh dấu HTML và bố cục hình ảnh để phát hiện những hình ảnh kích cỡ lớn hơn trong màn hiển thị đầu tiên.

Trong trường hợp `amp-img`, Bộ tối ưu hoá AMP cũng sẽ thực hiện tác vụ render phía máy chủ đối với thẻ `img` bên trong `amp-img`. Tác vụ này cho phép trình duyệt render hình ảnh ngay lập tức mà không cần đến thời gian chạy AMP.

### Tối ưu hoá hình ảnh

Bộ Tối ưu hoá AMP có thể giúp bạn phân phát hình ảnh đáp ứng được tối ưu hoá, bằng cách tạo các thuộc tính `srcset` dành riêng cho Bố cục AMP. Ví dụ khai báo sau của `amp-img`:

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

Lưu ý: Bản dựng Mô-đun AMP chỉ khả dụng cho AMP đã chuyển đổi vì nó yêu cầu phải CSS Thời gian chạy AMP phải được đặt inline.
