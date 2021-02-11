---
'$title': Bắt đầu câu chuyện
$order: 3
description: Một Câu chuyện web hoàn chỉnh được thể hiện bằng thành phần amp-story vốn có vai trò như một container cho tất cả các trang trong một câu chuyện. Thành phần amp-story cũng chịu trách nhiệm cho ...
author: bpaduch
---

Một Câu chuyện web hoàn chỉnh được thể hiện bằng thành phần [`amp-story`](../../../../documentation/components/reference/amp-story.md) vốn có vai trò như một container cho tất cả các trang trong một câu chuyện. Thành phần [`amp-story`](../../../../documentation/components/reference/amp-story.md) cũng chịu trách nhiệm cho việc tạo vỏ giao diện người dùng, bao gồm việc xử lí những cử chỉ và điều hướng.

Thành phần [`amp-story`](../../../../documentation/components/reference/amp-story.md) là một thành phần AMP tùy chỉnh, và giống như tất cả các thành phần tùy chỉnh, kịch bản liên kết cho thành phần đó phải được thêm vào tài liệu AMP.

**Mở** tập tin `pets.html` trong trình soạn thảo văn bản, và trong phần `<head>`, **thêm** kịch bản sau:

```html
<head>
  <script
    async
    custom-element="amp-story"
    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
  ></script>
</head>
```

**Thêm** phần tử `<amp-story>` vào `<body>` của tài liệu, và chỉ định thuộc tính bắt buộc `standalone`, như thế này:

```html
<body>
  <amp-story standalone> </amp-story>
</body>
```

Điều quan trọng là cần lưu ý rằng để có một câu chuyện AMP hợp lệ, phần tử `<body>` cần phải có duy nhất một phần tử con—thành phần [`amp-story`](../../../../documentation/components/reference/amp-story.md); tất cả những phần tử khác được bao hàm trong [`amp-story`](../../../../documentation/components/reference/amp-story.md).

## Cung cấp siêu thông tin

Để câu chuyện được nhiều người khám phá trên web, ta cần có siêu dữ liệu nhất định để cung cấp những chi tiết nhỏ của câu chuyện, như:

- Tiêu đề câu chuyện, thể hiện bằng thuộc tính `title` (Ví dụ: "Niềm vui của thú cưng").
- Tên của nhà phát hành, thể hiện bằng thuộc tính `publisher` (ví dụ: "hướng dẫn về AMP").
- Logo của nhà phát hành, thể hiện bằng thuộc tính `publisher-logo-src`. Đây là một URL cho hình ảnh logo, ở định dạng vuông với tỉ lệ khung hình 1x1.
- Hình ảnh người đăng câu chuyện, thể hiện bằng thuộc tính `poster-portrait-src`. Đây là một URL cho người đăng, và hình ảnh phải ở định dạng theo phương dọc (dạng ảnh chân dung) với tỉ lệ khung hình 3x4.

Ta hãy thêm những thuộc tính này vào thẻ [`amp-story`](../../../../documentation/components/reference/amp-story.md):

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
></amp-story>
```

Ngoài các thuộc tính bắt buộc này, bạn có thể áp dụng các thuộc tính khác. Để tìm hiểu thêm, xem phần [thuộc tính](../../../../documentation/components/reference/amp-story.md#attributes) của tài liệu tham khảo [`amp-story`](../../../../documentation/components/reference/amp-story.md) .

[tip type="note"] **LƯU Ý –** Các thuộc tính siêu dữ liệu này bổ sung và không thay thế bất kì Dữ liệu có cấu trúc nào (ví dụ như JSON-LD) trên trang. Để bảo đảm Câu chuyện web của bạn được khám phá trên tất cả các nền tảng, bạn cần thêm [Dữ liệu có cấu trúc](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) vào tất cả các trang AMP, bao gồm câu chuyện AMP. [/tip]

Lúc này, ta có vỏ của câu chuyện mà chưa có nội dung. Ta hãy tạo trang đó nào.
