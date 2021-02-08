---
'$title': Theo dõi các lượt xem quảng cáo
$order: 2
description: Trong các quảng cáo AMPHTML, bạn có thể theo dõi các số liệu với thành phần amp-pixel hoặc amp-analytics. Trong đoạn code mẫu cơ bản của chúng ta, chúng ta sẽ bổ sung khả năng theo dõi lượt xem trang...
---

Trong các quảng cáo AMPHTML, bạn có thể theo dõi các số liệu với thành phần [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) hoặc [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Trong đoạn code mẫu cơ bản của chúng ta, chúng ta sẽ bổ sung khả năng theo dõi lượt xem trang với thành phần [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) và chỉ đến một URL ghi lại lượt xem trang (trong trường hợp này, một URL giả):

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img
      width="300"
      height="250"
      alt="Learn amp"
      src="/static/img/docs/ads/amp-300x250.png"
    ></amp-img>
  </a>
  <amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

Chỉ vậy thôi, bạn đã tạo được quảng cáo AMPHTML của mình!

Trước khi tải quảng cáo của bạn lên máy chủ quảng cáo, bạn cần thực hiện một bước cuối cùng—đảm bảo cú pháp của bạn là hợp lệ.
