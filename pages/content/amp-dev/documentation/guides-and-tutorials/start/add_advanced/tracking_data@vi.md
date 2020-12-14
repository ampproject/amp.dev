---
"$title": Theo dõi tương tác bằng công cụ phân tích
"$order": '4'
description: Các nền tảng phân tích thường được tích hợp vào các website thông qua đoạn code JavaScript inline và lệnh gọi chức năng để kích hoạt các sự kiện được gửi trả về hệ thống phân tích.
---

Các nền tảng phân tích thường được tích hợp vào các website thông qua đoạn code JavaScript inline và lệnh gọi chức năng để kích hoạt các sự kiện được gửi trả về hệ thống phân tích. AMP cung cấp một cú pháp cấu hình JSON linh hoạt để sao chép quy trình này cho nhiều đối tác phân tích khác nhau.

Sau đây là một ví dụ về tính năng theo dõi Google Analytics dựa trên JavaScript truyền thống. Chúng ta sẽ chuyển nó sang định dạng JSON [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), nhưng trước hết, hãy xem lối tiếp cận truyền thống:

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

JavaScript này rất đơn giản; nó gửi một thông báo để theo dõi sự kiện xem trang.

Để tái lập chức năng này trong AMP, trước tiên ta cần phải **bao gồm** thư viện thành phần [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) ở trong phần `<head>` của tài liệu:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Sau đó ta hãy **thêm** thành phần [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) vào cuối `body` (thân) tài liệu:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    }
  }
}
</script>
</amp-analytics>
```

Giống như với ví dụ JavaScript ở đầu trang này, đoạn mã [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) này sẽ gửi một tin báo đến Google Analytics cho biết một trang đã được xem.

Để quy định điều này, chúng ta đã thiết lập `type` (loại) thành `googleanalytics` và sau đó trong JSON, chúng ta đã tạo một yếu tố kích hoạt gọi là "default pageview". Yếu tố kích hoạt này sẽ kích hoạt khi trang được hiển thị (nhờ có `"on": "visible"`) và khi nó kích hoạt, chúng ta sẽ gửi một yêu cầu phân tích `pageview` đến Google Analytics với `vars` mà chúng ta đã quy định.

JSON dùng để cấu hình [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) là một định dạng rất linh hoạt để mô tả dữ liệu phân tích nào cần gửi đi và khi nào cần gửi nó. [`Amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) đã hoàn thành các chi tiết trên định dạng này.

Dựa vào ví dụ bên trên, ta có thể **thêm** mã kích hoạt khác mang tên `"click on #header trigger"`:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    },
    "click on #header trigger": {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "examples",
        "eventAction": "clicked-header"
      }
    }
  }
}
</script>
</amp-analytics>
```

Như bạn có thể đoán từ tên của yếu tố kích hoạt mới này, nó sẽ kích hoạt khi yếu tố với ID `"header"` được nhấn (được quy định bởi `"on": "click"` và `"selector": "#header"`). Khi yếu tố kích hoạt này kích hoạt, nó sẽ gửi yêu cầu `event` (sự kiện) cho nhà cung cấp dịch vụ phân tích của chúng ta, quy định một cặp biến số để bao gồm trong yêu cầu.

Nếu bạn có một nền tảng theo dõi tùy chỉnh mà bạn muốn tích hợp, bạn vẫn có thể sử dụng [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) và định nghĩa điểm cuối URL cá nhân của mình để gửi dữ liệu theo dõi đến đó. Tìm hiểu thêm trong tài liệu tham khảo cho thành phần [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **LƯU Ý –**  `“UA-YYYY-Y”` là một tài khoản Google Analytics mẫu; nó cần được thay bằng mã theo dõi Google Analytics cho website của bạn nếu bạn sử dụng ví dụ này trên website của mình. [/tip]

[tip type="tip"] **MẸO –** Nếu bạn quan tâm đến một hệ thống theo dõi đơn giản hơn, bạn có thể tìm hiểu về [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Nếu bạn chỉ cần theo dõi lượt xem trang, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) là một giải pháp nhẹ cân hơn [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) bởi nó chỉ nhằm giải quyết các yêu cầu của việc theo dõi điểm ảnh truyền thống. Tìm hiểu thêm trong [Hướng dẫn cơ bản về Phân tích](../../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
