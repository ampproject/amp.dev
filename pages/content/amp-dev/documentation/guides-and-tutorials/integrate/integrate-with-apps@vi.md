---
'$title': Tích hợp AMP với ứng dụng của bạn
$order: 2
description: Hướng dẫn này dành cho các nhà phát triển ứng dụng di động và web muốn tích hợp và liên kết đến các trang AMP. Ví dụ, hãy cân nhắc một ứng dụng trò chuyện di động...
formats:
  - websites
---

Hướng dẫn này dành cho các nhà phát triển ứng dụng di động và web muốn tích hợp và liên kết đến các trang AMP. Ví dụ, hãy cân nhắc một ứng dụng trò chuyện di động tải phiên bản AMP của một URL được chia sẻ để đảm bảo một trải nghiệm nhanh hơn cho người dùng.

## Chuyển đổi liên kết sang AMP

Với AMP, bạn có thể render gần như tức thì các website bên ngoài từ trong ứng dụng web di động hoặc tự nhiên của bạn. Bạn có thể đạt được điều này bằng cách khớp các URL trong nội dung của bạn với các URL AMP tương ứng của chúng (nếu có) và mở phiên bản AMP thay cho phiên bản gốc. Bạn có thể sử dụng các công cụ như [API AMP URL của Google](https://developers.google.com/amp/cache/use-amp-url) để hỗ trợ việc này.

Ví dụ, các tin nhắn sau có thể được chuyển đổi để phục vụ phiên bản AMP bằng cách thay đổi tất cả URL bằng phiên bản AMP tương ứng (nếu có). Để giảm thời gian tải và đảm bảo rằng AMP hợp lệ được phục vụ, bạn nên liên kết với các trang AMP được lưu trong Bộ nhớ đệm AMP.

Thông điệp nguyên bản:

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

Thông điệp được chuyển đổi:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="tip"] **MẸO –** Hãy cân nhắc việc cung cấp cho người dùng tùy chọn sử dụng phiên bản không phải AMP thay cho phiên bản AMP trong phần cài đặt tùy chọn của ứng dụng. [/tip]

### Các cách để chuyển đổi liên kết

Có 3 cách để chuyển đổi liên kết theo chương trình:

1. **Thời gian ghi phía máy chủ (ưu tiên)**: Truy xuất URL AMP thông qua API AMP URL của Google tại thời gian ghi của một URL và lưu các URL AMP trên máy chủ. Truyền tải cả hai URL đến máy khách bởi URL gốc có thể cần được chia sẻ. Đây là lối tiếp cận được khuyến nghị bởi sẽ có ít yêu cầu mạng ở phía máy khách hơn. Khi thực hiện lối tiếp cận này, bạn cần định kỳ (ví dụ như là hàng ngày) quét các liên kết để tìm phiên bản AMP bởi ngày càng nhiều các website sử dụng định dạng AMP.
2. **Thời gian đọc phía máy chủ (một số ứng dụng)**: Truy xuất URL AMP thông qua API AMP URL của Google trước khi truyền tải nội dung đến máy khách của bạn. Như đã nói ở trên, truyền tải cả hai URL (AMP và không phải AMP) đến máy khách bởi URL gốc có thể cần được chia sẻ. Phương thức này có thể hữu ích cho các dịch vụ ít tín hiệu đầu ra.
3. **Phía máy khách (nếu phía máy chủ không khả thi)**: Truy xuất URL AMP thông qua API AMP URL của Google từ máy khách. Sử dụng lối tiếp cận này nếu không thể chuyển đổi URL phía máy chủ (ví dụ, đối với các ứng dụng nhắn tin sử dụng mã hóa xuyên suốt). Đảm bảo bạn kích hoạt việc chuyển đổi URL ngay khi nội dung khả dụng, trước khi bất kỳ tương tác người dùng nào xảy ra.

[tip type="important"] **QUAN TRỌNG –** Không bao giờ yêu cầu URL AMP thông qua API AMP của Google do tương tác người dùng bởi điều này sẽ làm suy giảm hiệu năng của ứng dụng bởi nó giới thiệu một yêu cầu mạng bổ sung. Thay vào đó, hãy sử dụng một trong ba lối tiếp cận được mô tả ở trên. [/tip]

#### API AMP URL của Google

Google cung cấp API AMP URL để truy xuất URL AMP HTML liên quan cho một danh sách các URL cụ thể ([tài liệu chính thức](https://developers.google.com/amp/cache/use-amp-url) / [demo](../../../documentation/examples/documentation/Using_the_AMP_URL_API.html)). Các URL không cần phải là phiên bản chính thức. Nếu một phiên bản AMP tồn tại, hồi đáp sẽ bao gồm AMP URL gốc và URL cho trang AMP đã lưu trong Bộ nhớ đệm AMP của Google.

Ví dụ, đối với một danh sách URL cụ thể:

```json
{
  "urls": [
    "https://www.example.org/article-with-amp-version",
    "http://www.example.com/no-amp-version.html"
  ]
}
```

Nội dung hồi đáp sẽ chứa ánh xạ AMP URL trong định dạng JSON:

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"] **LƯU Ý –** Các URL cho trang AMP được lưu trong Bộ nhớ đệm AMP ngoài Google không thể được truy xuất thông qua API AMP URL. Tuy nhiên, bạn có thể dễ dàng suy ra URL đã lưu trong bộ nhớ đệm từ AMP URL được trả về (ampURL). [/tip]

## Sử dụng Bộ nhớ đệm AMP

Một [Bộ nhớ đệm AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) là một mạng lưới truyền tải nội dung (CDN) thông qua proxy để cung cấp các tài liệu AMP hợp lệ. Các Bộ nhớ đệm AMP được thiết kế để:

- Chỉ phục vụ các trang AMP hợp lệ.
- Cho phép các trang AMP được tải sẵn một cách hiệu quả và an toàn.
- Thực hiện các kỹ thuật tối ưu hiệu năng bổ sung cho nội dung để phục vụ người dùng.

Hiện tại, có 2 nhà cung cấp Bộ nhớ đệm AMP:

- [Bộ nhớ đệm của Google](https://developers.google.com/amp/cache/)
- [Bộ nhớ đệm AMP của Bing](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

Điều này mang đến 2 lựa chọn để hiển thị một tập tin AMP trong một ứng dụng bằng:

1. phiên bản được lưu trữ bởi nhà phát hành
2. phiên bản được lưu trữ trong Bộ nhớ đệm AMP

Chúng tôi khuyên bạn sử dụng Bộ nhớ đệm AMP vì các lý do sau:

- Trải nghiệm người dùng tốt hơn do thời gian tải nhanh hơn và độ trễ thấp (thời gian tải nhanh hơn >1 giây).
- Các lợi ích về hiệu năng và băng thông do lưu các điểm nhiễu phụ thuộc vào máy khách trong bộ nhớ đệm, ví dụ như lưu các phiên bản khác nhau của cùng một ảnh trong bộ nhớ đệm tùy thuộc vào kích cỡ màn hiển thị của máy khách.
- Tập tin AMP gốc có thể không còn là AMP hợp lệ, điều này có thể đẫn đến một trải nghiệm người dùng tồi tệ. Trong trường hợp này, Bộ nhớ đệm AMP sẽ phục vụ phiên bản hợp lệ cuối cùng của tập tin AMP.
- Một nhà phát hành bất tín có thể phục vụ 2 tài liệu khác nhau cho crawler của Bộ nhớ đệm AMP và cho người dùng của bạn. Việc sử dụng Bộ nhớ đệm AMP đảm bảo rằng người dùng luôn có thể truy cập cùng một tập tin với Bộ nhớ đệm.

[tip type="important"] **QUAN TRỌNG –** Khi phục vụ các trang AMP thông qua Bộ nhớ đệm AMP, cung cấp cho người xem một trải nghiệm hiển thị rõ nguồn gốc của AMP và cho phép họ chia sẻ URL chính thức (xem 2 phần sau để biết thêm thông tin về việc này). [/tip]

## Triển khai một Trình xem AMP

Thời gian chạy AMP cung cấp một API Trình xem, vốn cung cấp một giao thức để gửi và nhận tin nhắn giữa Thời gian chạy AMP và Trình xem. Điều này cho phép bạn có thể kiểm soát việc render sẵn các tài liệu AMP, chuyển đổi giữa các bài viết, và dụng cụ Thời gian chạy AMP. Bạn có thể tìm hiểu thêm về API Trình xem AMP trong hướng dẫn [Kết nối Trình xem AMP với các trang AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md). Thông tin triển khai Trình xem cho [web](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md) và [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios) cũng có sẵn trên [GitHub](https://github.com/ampproject/amp-viewer). Một trình xem Android hiện chưa có sẵn, hãy xem [câu trả lời này](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038) trên Stack Overflow để biết cách tốt nhất để cấu hình một WebView cho việc hiển thị các trang AMP.

Sau đây là các biện pháp thực hành tiên tiến nhất nói chung để triển khai một Trình xem AMP:

- Phục vụ trang AMP từ một Bộ nhớ đệm AMP (thời gian tải nhanh hơn >1 giây).
- Hiển thị nguồn gốc nhà phát hành của bài viết (ví dụ, trong một đầu mục thu gọn được).
- Cung cấp một hành động chia sẻ (xem thêm phần "[Chia sẻ Nội dung AMP](#sharing-amp-content)" dưới đây).
- Trong các trình xem dựa trên webView, bật các cookie của bên thứ ba.
- Thiết lập trình giới thiệu cho nền tảng/ứng dụng của bạn.

### Chia sẻ Nội dung AMP <a name="sharing-amp-content"></a>

Khi chia sẻ một tài liệu AMP từ bên trong Trình xem AMP của nền tảng, nền tảng đó nên chia sẻ URL chính thức nếu khả thi về mặt kỹ thuật. Ví dụ, nếu nền tảng cung cấp một nút chia sẻ, nút này cần chia sẻ URL chính thức.

Triết lý của Dự án AMP là các nền tảng nên có khả năng lựa chọn phiên bản của tài liệu được trình bày cho người dùng. Vì lý do này, bạn nên chia sẻ phiên bản chính thức (phân biệt với phiên bản AMP) khi chia sẻ đến một nền tảng khác, và sau đó kỳ vọng nền tảng mục tiêu đó đưa ra lựa chọn đúng đắn.
