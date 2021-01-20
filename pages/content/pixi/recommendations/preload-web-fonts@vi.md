---
$title: Tải sẵn phông chữ web
$order: 140
tags:
- lcp
---

Tính năng tải sẵn thông báo với trình duyệt về các tài nguyên thiết yếu mà bạn muốn tải trong thời gian sớm nhất có thể. Kể cả trước khi chúng được phát hiện trong mã HTML! Điều này đặc biệt hữu ích cho các tài nguyên được sử dụng trong màn hiển thị đầu tiên và trong suốt trang, ví dụ như phông chữ. Làm điều này bằng cách thêm thuộc tính `rel="preload"` vào các tài nguyên này, ví dụ như:

```
<link href="font.woff2" rel="preload">
```
