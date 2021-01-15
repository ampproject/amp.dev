---
"$title": Tạo ảnh quảng cáo
"$order": '1'
description: '"Quảng cáo của chúng ta chỉ là một ảnh đơn giản với siêu liên kết đến website được quảng cáo. Chúng ta sẽ hiển thị quảng cáo sử dụng thẻ amp-img. Đây là đoạn mã: ..."'
---

Bên trong phần `<body>` của tài liệu quảng cáo AMPHTML của bạn, bạn có thể bao gồm các thẻ HTML và AMP; tuy nhiên, không phải thẻ nào cũng được cho phép. Tham khảo [thông số quảng cáo AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins) để biết danh sách các thẻ được cho phép.

Quảng cáo của chúng ta chỉ là một ảnh đơn giản với siêu liên kết đến website được quảng cáo. Chúng ta sẽ hiển thị quảng cáo sử dụng thẻ [`amp-img`](../../../../documentation/components/reference/amp-img.md). Đây là đoạn mã:

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

Nếu bạn mở tập tin HTML của mình trong trình duyệt, bạn sẽ thấy ảnh sau:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Nếu bạn nhấn vào ảnh quảng cáo, nó sẽ đưa bạn đến website được quảng cáo (nghĩa là, website của Dự án AMP).
