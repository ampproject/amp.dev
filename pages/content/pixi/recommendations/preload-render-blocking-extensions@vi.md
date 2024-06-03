---
$title: Tải sẵn các thành phần chặn render
$order: 40
tags:
- lcp
- fid
---

Cho phép người dùng xem và tương tác với nội dung trong thời gian sớm nhất bằng cách tải sẵn các thành phần có thể chặn lần render đầu tiên. Các thành phần chặn render mà bạn cần chú ý bao gồm [`amp-experiment`](https://amp.dev/documentation/components/amp-experiment/?format=websites) và [`amp-dynamic-css-classes`](https://amp.dev/documentation/components/amp-dynamic-css-classes/). Tải sẵn các thành phần này bằng cách bao gồm thuộc tính `rel="preload"` trên kịch bản nhập chúng:

```
<link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
```

Sử dụng một [Bộ tối ưu AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/) để tự động làm việc này!
