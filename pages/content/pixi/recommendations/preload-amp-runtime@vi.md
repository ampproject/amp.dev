---
$title: Tải sẵn Thời gian chạy AMP
$order: 30
tags:
- lcp
- fid
---

Việc tải sẵn các tài sản cần thiết sẽ cải thiện hiệu năng bằng cách đảm bảo chúng luôn khả dụng trước tiên. Một trang AMP đòi hỏi JavaScript của khung, vậy nên hãy đảm bảo chúng được tải sẵn! Sử dụng một [Bộ tối ưu AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) để tự động thêm đoạn mã sau vào trang của bạn, hoặc làm điều này một cách thủ công:

```
<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>
```
