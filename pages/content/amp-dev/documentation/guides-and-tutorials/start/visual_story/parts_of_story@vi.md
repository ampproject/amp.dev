---
"$title": Hiểu về những phần thuộc một câu chuyện AMP
"$order": '2'
description: "A Web Story is a full-screen visual storytelling experience that conveys information with images, videos, graphics, audio, and more. It's perfect for users ..."
author: bpaduch
---

A Web Story is a full-screen visual storytelling experience that conveys information with images, videos, graphics, audio, and more. It's perfect for users who want bite-sized, visually-rich content.

Các yếu tố cơ bản được đưa vào Web Story là những **trang** riêng lẻ. Đến lượt mình, những trang này bao gồm các **lớp** riêng lẻ bao hàm những **phần tử** HTML và AMP cơ bản.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Mỗi yếu tố đó được dịch thành các thành phần AMP, trong đó câu chuyện được thể hiện bằng [`amp-story`](../../../../documentation/components/reference/amp-story.md) , trang được thể hiện bằng `amp-story-page` và các lớp được thể hiện bằng `amp-story-grid-layer` .

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Ta hãy tạo Câu chuyện web bằng container [`amp-story`](../../../../documentation/components/reference/amp-story.md).
