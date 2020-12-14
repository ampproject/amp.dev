---
"$title": Hiểu về những phần thuộc một câu chuyện AMP
"$order": '2'
description: Một Câu chuyện web là trải nghiệm kể chuyện bằng hình ảnh trải rộng toàn màn hình, trong đó thông tin được truyền tải bằng hình ảnh, video, đồ hoạ, âm thanh, v.v. Đây là chức năng hoàn hảo cho những người dùng ...
author: bpaduch
---

Một Câu chuyện web là trải nghiệm kể chuyện bằng hình ảnh trải rộng toàn màn hình, trong đó thông tin được truyền tải bằng hình ảnh, video, đồ hoạ, âm thanh, v.v. Đây là chức năng hoàn hảo cho những người dùng nào muốn có nội dung ngắn gọn và có hình ảnh phong phú.

Các yếu tố cơ bản được đưa vào Web Story là những **trang** riêng lẻ. Đến lượt mình, những trang này bao gồm các **lớp** riêng lẻ bao hàm những **phần tử** HTML và AMP cơ bản.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Mỗi yếu tố đó được dịch thành các thành phần AMP, trong đó câu chuyện được thể hiện bằng [`amp-story`](../../../../documentation/components/reference/amp-story.md) , trang được thể hiện bằng `amp-story-page` và các lớp được thể hiện bằng `amp-story-grid-layer` .

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Ta hãy tạo Câu chuyện web bằng container [`amp-story`](../../../../documentation/components/reference/amp-story.md).
