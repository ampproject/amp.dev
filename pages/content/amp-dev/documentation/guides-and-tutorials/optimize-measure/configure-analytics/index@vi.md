---
"$title": Cấu hình công cụ phân tích
"$order": '5'
"$hidden": 'true'
description: Nếu bạn đang dùng Google Analytics làm nhà cung cấp công cụ phân tích của mình, hãy tìm hiểu cách thiết lập Google Analytics cơ bản cho AMP và cách liên kết nội dung AMP và phi AMP bằng ID Máy khách
formats:
- websites
- stories
---

[tip] **Mẹo –** Nếu bạn đang dùng Google Analytics làm nhà cung cấp công cụ phân tích của mình, hãy tìm hiểu [cách thiết lập Google Analytics cơ bản cho AMP](https://developers.google.com/analytics/devguides/collection/amp-analytics/#basic_setup_to_measure_page_views), và [cách liên kết nội dung AMP và không phải AMP bằng ID Máy khách](https://support.google.com/analytics/answer/7486764). [/tip]

## Quyết định trước khi bạn bắt đầu

Mọi giải pháp phân tích được dựa trên cơ sở là bạn biết dữ liệu gì mình cần đến, và cách bạn dự tính phân tích dữ liệu đó. Hãy quyết định trước khi bắt đầu:

- Bạn sẽ dùng công cụ phân tích của bên thứ ba để phân tích tương tác người dùng, hay dùng giải pháp nội bộ của chính bạn?
- Hành vi người dùng nào mà bạn sẽ đo lường để hiểu mối tương tác người dùng?

### Gửi dữ liệu cho nhà cung cấp hay cho bản thân?

Nếu bạn có giải pháp nội bộ của riêng mình cho việc đo lường mức tương tác người dùng, điều duy nhất bạn sẽ cần tích hợp phân tích AMP với giải pháp đó là một URL. Đây là chỗ bạn sẽ gửi dữ liệu đến. Bạn còn có thể gửi dữ liệu đến nhiều URL khác nhau. Ví dụ như bạn có thể gửi dữ liệu lượt xem trang đến một URL, và dữ liệu tương tác mạng xã hội đến URL khác.

Phân tích AMP được thiết kế đặc biệt để đo lường một lần và gửi báo cáo cho nhiều bên. Nếu bạn đã làm việc với một hay nhiều nhà cung cấp công cụ phân tích, hãy xem danh sách [Nhà cung cấp công cụ phân tích](analytics-vendors.md) để xem liệu họ đã tích hợp giải pháp của mình với AMP chưa. Nếu đã tích hợp, hãy xem lại chi tiết cấu hình của họ và làm theo các chỉ dẫn.

Nếu nhà cung cấp công cụ phân tích chưa tích hợp với AMP, hãy liên hệ với nhà cung cấp đó để yêu cầu họ hỗ trợ. Chúng tôi cũng khuyến khích bạn [tạo một vấn đề trong dự án AMP](https://github.com/ampproject/amphtml/issues/new) yêu cầu nhà cung cấp đó nên được thêm vào. Xem thêm [Tích hợp các công cụ phân tích trong HMTL AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Bạn cần dữ liệu gì?

Dữ liệu gì về người dùng của bạn mà bạn sẽ thu lấy để đo lường mức tương tác? Bạn phải nhận diện dữ liệu này trước khi có thể cấu hình nó.

Những điểm dữ liệu then chốt cần xem xét:

- Bạn sẽ theo dõi chỉ lượt xem trang hay các khuôn mẫu tương tác khác của người dùng (xem thêm [amp-pixel hay amp-analytics](analytics_basics.md#use-amp-pixel-or-amp-analytics))?
- Loại dữ liệu nào bạn sẽ thu lấy về người dùng, nội dung, thiết bị hoặc trình duyệt (xem thêm [Thay thế biến số](analytics_basics.md#variable-substitution))?
- Bạn sẽ nhận diện người dùng bằng cách nào (xem thêm [Nhận diện người dùng](analytics_basics.md#user-identification))?

Tìm hiểu thêm: Tiếp tục để tìm hiểu về phép phân tích với [Công cụ phân tích: Kiến thức cơ bản](analytics_basics.md).
