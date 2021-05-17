---
'$title': Cách các trang AMP được lưu trong bộ nhớ đệm
$order: 0
description: Trong tài liệu này, bạn sẽ tìm hiểu về vai trò của Bộ nhớ đệm AMP trong hệ sinh thái AMP, và cách trang AMP của bạn được lưu trong bộ nhớ đệm.
formats:
  - websites
  - stories
  - ads
---

Trong tài liệu này, bạn sẽ tìm hiểu về vai trò của Bộ nhớ đệm AMP trong hệ sinh thái AMP, và cách trang AMP của bạn được lưu trong bộ nhớ đệm.

## Bộ nhớ đệm AMP là gì?

Một Bộ nhớ đệm AMP là một mạng lưới truyền tải nội dung (CDN) thông qua proxy để cung cấp các tài liệu AMP hợp lệ. Các Bộ nhớ đệm AMP được thiết kế để:

1. Chỉ phục vụ các trang AMP hợp lệ.
2. Cho phép các trang AMP được tải sẵn một cách hiệu quả và an toàn.
3. Thực hiện các kỹ thuật tối ưu hiệu năng bổ sung cho nội dung để phục vụ người dùng.

[tip type="note"] Các tài liệu email AMP được miễn từ bộ nhớ đệm AMP. [/tip]

Tìm hiểu về Bộ nhớ đệm AMP trong video YouTube dưới đây, hoặc trong bài đăng blog [Vì sao Bộ nhớ đệm AMP Tồn tại](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456).

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='Watch this video to learn why AMP Caches exist.']

## Có những Bộ nhớ đệm AMP nào?

Hiện tại, có 2 nhà cung cấp Bộ nhớ đệm AMP:

- [Bộ nhớ đệm của Google](https://developers.google.com/amp/cache/)
- [Bộ nhớ đệm AMP của Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP là một hệ sinh thái mở và Dự án AMP tích cực khuyến khích việc phát triển các Bộ nhớ đệm AMP khác. Để tìm hiểu thêm về việc tạo ra các Bộ nhớ đệm AMP, hãy xem [Hướng dẫn về Bộ nhớ đệm AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md).

## Làm thế nào để chọn một Bộ nhớ đệm AMP?

Là một nhà phát hành, bạn không cần chọn một Bộ nhớ đệm AMP, nó _chính là nền tảng_ liên kết đến nội dung đã chọn Bộ nhớ đệm AMP (nếu có) của bạn.

Điều này ngược với một mô hình thông thường mà ở đó việc cung cấp nội dung là trách nhiệm của nhà phát hành. Tuy nhiên, mô hình này cho phép các nền tảng cung cấp cho người dùng của họ hiệu năng tải dự đoán được cùng những tính năng khác mang đến độ bảo mật và quyền riêng tư đảm bảo, thống nhất trong giai đoạn tiền render AMP. Để tìm hiểu thêm về các hướng dẫn nghiêm ngặt đối với việc tạo ra các Bộ nhớ đệm AMP, hãy xem [Hướng dẫn về Bộ nhớ đệm AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md).

## Liệu tôi có thể bỏ đăng ký lưu bộ nhớ đệm không?

Bộ nhớ đệm là một phần cốt lõi của hệ sinh thái AMP. Việc phát hành một tài liệu AMP hợp lệ sẽ tự động đăng ký nó cho một bộ nhớ đệm.

Nếu bạn không muốn lưu tài liệu của mình trong bộ nhớ đệm, một tùy chọn là xóa thuộc tính `amp` khỏi thẻ HTML. Điều này khiến tài liệu trở thành một AMP không hợp lệ về mặt kỹ thuật, nhưng vẫn không ảnh hưởng đến chức năng của tài liệu.

## Ai yêu cầu các trang AMP trong bộ nhớ đệm?

Bộ nhớ đệm AMP được truy cập bởi các nền tảng (như Google Search, Google News, và Bing) và ứng dụng di động. Các ứng dụng di động có thể liên kết đến nội dung AMP trong bộ nhớ đệm thông qua URL (xem [API AMP URL](https://developers.google.com/amp/cache/use-amp-url) của Google) hoặc thông qua các XHR chéo nguồn gốc trong Ứng dụng Web Lũy tiến (tìm hiểu thêm trong phần [Nhúng & sử dụng AMP như một nguồn dữ liệu](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## Trang AMP của tôi được lưu trong bộ nhớ đệm như thế nào?

Thông qua việc sử dụng định dạng AMP, bạn đang thiết lập nội dung của mình để được lưu trong Bộ nhớ đệm AMP. Có một số cách mà trang AMP của bạn có thể được lưu trong một Bộ nhớ đệm AMP:

- **Khám phá nền tảng**: Các nền tảng khám phá nội dung AMP của bạn thông qua thẻ `<html ⚡>` hoặc `<html amp>` và lưu nội dung này trong bộ nhớ đệm. Ví dụ, Google Search dò tìm nội dung; đối với mọi trang AMP đã được xác nhận và hợp lệ, nội dung này sẽ được thêm vào Bộ nhớ đệm AMP của Google.

- **Yêu cầu URL trong Bộ nhớ đệm**: Các nền tảng có thể yêu cầu cụ thể một trang AMP bằng cách sử dụng định dạng URL Bộ nhớ đệm AMP. Bộ nhớ đệm AMP hoạt động như một proxy ngược, do đó, khi nền tảng truy cập trang này, nó sẽ khiến trang được lưu tự động trong bộ nhớ đệm.

  - Ví dụ về URL trong Bộ nhớ đệm AMP của Google: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

[tip type="note"] **LƯU Ý –** URL Bộ nhớ đệm AMP không phải là một URL cho người dùng, do đó, người dùng thường không yêu cầu nội dung qua các URL này. [/tip]

- **Bổ sung từ nhà phát hành**: Các nhà phát hành có thể thêm trang AMP cụ thể vào Bộ nhớ đệm AMP. Tùy chọn này chỉ khả dụng cho Bộ nhớ đệm AMP của Google (xem [Bộ nhớ đệm AMP của Google: Cập nhật Nội dung AMP](https://developers.google.com/amp/cache/update-cache)).

## Tài nguyên bổ sung

- [Hướng dẫn Bộ nhớ đệm AMP của Dự án AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md)
- [Tổng quan về Bộ nhớ đệm AMP của Google](https://developers.google.com/amp/cache/overview)
- [Tài liệu Bộ nhớ đệm AMP của Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
