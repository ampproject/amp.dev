---
"$title": Tích hợp công nghệ của bạn với AMP
"$order": '0'
"$hidden": 'true'
description: Nếu bạn là một đơn vị cung cấp công nghệ cho các nhà phát hành hay nhà quảng cáo trên web, chúng tôi mời bạn bổ sung hỗ trợ cho AMP để các khách hàng của bạn có thể tiếp tục...
formats:
- websites
- ads
- stories
- email
---

Cảm ơn bạn đã quan tâm đến việc đóng góp cho AMP! Chúng tôi rất coi trọng việc bạn tham gia để thúc đẩy một nền tảng web ưu tiên đến người dùng.

Các nhà phát hành đã tạo ra hơn 1,4 tỷ tài liệu AMP, được lưu trữ trên hơn 750 nghìn tên miền riêng. Sự tăng trưởng này chỉ có thể được hiện thực hóa với sự hỗ trợ của hơn 100 công ty công nghệ thuộc bên thứ ba, đã được tích hợp với AMP.

Nếu bạn là một đơn vị cung cấp công nghệ cho các nhà phát hành hay nhà quảng cáo trên web, chúng tôi mời bạn bổ sung hỗ trợ cho AMP! Các khách hàng của bạn có thể tiếp tục sử dụng công nghệ của bạn, đồng thời làm việc để hiện thực hóa tầm nhìn xây dựng một web tốt hơn của chúng tôi.

Tài liệu này mô tả các kỳ vọng cho AMP bên thứ ba và định nghĩa các cấp đóng góp.

# Hướng dẫn đóng góp

Mọi đóng góp chung đều cần tuân thủ [Hướng dẫn chung về AMPHTML trong CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md). Chúng tôi kỳ vọng bên thứ ba sẽ kiểm tra, duy trì và cập nhật đóng góp của họ theo nhiều mức độ khác nhau.

Để đủ điều kiện được bao gồm, mọi cấp độ đóng góp đều phải:

- Đáp ứng [yêu cầu về đáng chú ý của Wikipedia Tiếng Anh](https://en.wikipedia.org/wiki/Wikipedia:Notability).
- Duy trì hoặc cải thiện cùng cấp độ dịch vụ như lời hứa của AMP cho cả các nhà phát hành và người dùng.
- Được tạo với chất lượng tốt.
- Tạo một kênh khắc phục sự cố cho các khách hàng của họ.
- Cung cấp kiểm tra tích hợp tốt cho cả các bản phát hành production và canary của AMP.
- Đáp ứng một mục đích chưa tồn tại.

Có 3 cấp độ đóng góp của bên thứ ba. Các cấp độ này phụ thuộc vào lượng lôgic được thêm:

- Lôgic thành phần: Các đoạn code quyết định tính năng và chức năng cốt lõi của thành phần AMP.
- Lôgic bên thứ ba: Các đoạn code dành riêng cho bên thứ ba. Lôgic này cho phép thành phần sử dụng dịch vụ của bên thứ ba.

Càng nhiều lôgic được bổ sung vào kho lưu trữ AMP, đặc biệt là các lôgic dành riêng cho bên thứ ba, thì cấp độ đóng góp càng tăng. Một cấp độ đóng góp cao đòi hỏi nhiều cam kết từ bên thứ ba.

Các đóng góp cấp 1 và cấp 2 chia sẻ thành phần giữa các bên thứ ba. Nếu có một thành phần đáp ứng một mục đích giống với việc kinh doanh của bạn, hãy cân nhắc việc tái sử dụng thành phần đó. Việc này đòi hỏi ít công sức hơn và dễ bảo trì dài hạn hơn.

Sau khi quyết định cấp độ đóng góp phù hợp với trường hợp sử dụng của bạn, hãy mở một [vấn đề GitHub](https://github.com/ampproject/amphtml/issues/new) để bắt đầu.

## Đóng góp cấp 1

Đóng góp cấp 1 sử dụng lôgic tính năng của các thành phần hiện có. Chúng tải các lôgic dành riêng cho bên thứ ba dưới dạng JavaScript tùy chỉnh trong một iframe gốc chéo. Ví dụ, nhiều mạng lưới quảng cáo cung cấp quảng cáo thông qua thành phần [`amp-ad`](../../../components/reference/amp-ad.md), nhưng kiểm soát cách render quảng cáo thông qua lôgic của riêng họ.

Các bên thứ ba thêm cấu hình hoặc tính năng vào các phần mở rộng hiện có sử dụng API được cung cấp để triển khai chức năng của họ. Nếu thành phần này không tồn tại, họ có thể đề xuất một thành phần mới.

Lôgic dành riêng cho bên thứ ba duy nhất được duyệt vào kho lưu trữ AMP là một cấu hình của bên thứ ba. Việc thêm một bên thứ ba mới vào một đóng góp cấp 1 hiện có thường sẽ không cần xem lại thiết kế. Các bên thứ ba có thể làm theo tài liệu tích hợp của thành phần, ví dụ như [Tích hợp mạng lưới quảng cáo vào AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

### Các kỳ vọng cho bên thứ ba

- Tự duy trì và phục vụ JavaScript tùy chỉnh của nhà cung cấp.
- Kiểm tra các cấu hình của họ và trả lời các vấn đề.
- Cung cấp một kênh khắc phục sự cố cho các nhà phát triển.
- Trả lời mọi báo cáo lỗi liên quan đến dịch vụ của họ.

### Ví dụ cấp 1

[**amp-ad**](../../../components/reference/amp-ad.md)

Các nhà cung cấp quảng cáo nên đọc [tổng quan về phát triển](https://github.com/ampproject/amphtml/tree/master/ads#overview) và [hướng dẫn cho nhà phát triển](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) về việc bổ sung hỗ trợ cho [`amp-ad`](../../../components/reference/amp-ad.md). Tùy thuộc vào công nghệ quảng cáo mà công ty của bạn cung cấp, bạn có thể thấy [các hướng dẫn tích hợp này](/content/amp-dev/documentation/guides-and-tutorials/contribute/vendor-contributions/ad-integration-guide.md?format=ads) hữu ích.

Có rất nhiều đơn vị cung cấp quảng cáo đã bổ sung hỗ trợ cho các tính năng liên quan đến quảng cáo như amp-ad. Sau đây là một [yêu cầu kéo mẫu](https://github.com/ampproject/amphtml/pull/2299) từ mạng lưới quảng cáo [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

## Đóng góp cấp 2

Đóng góp cấp 2 sử dụng lôgic tính năng của các thành phần hiện có. Mọi lôgic đều được duyệt vào kho lưu trữ AMP, và không có JavaScript tùy chỉnh nào có thể được tải vào một iframe. Ví dụ, các nhà cung cấp dịch vụ phân tích thêm cấu hình của họ vào thành phần [`amp-analytics`](../../../components/reference/amp-analytics.md), nhưng bao gồm điểm cuối để theo dõi dữ liệu, ví dụ như nhấp chuột của người dùng.

Các bên thứ ba thêm cấu hình hoặc tính năng, ví dụ như các API mới, vào các thành phần hiện có để triển khai chức năng của họ. Nếu thành phần này không tồn tại, họ có thể đề xuất một thành phần mới.

Mọi lôgic kinh doanh đều được duyệt vào kho lưu trữ AMP, nhưng lôgic dành riêng cho bên thứ ba duy nhất được duyệt là cấu hình của bên thứ ba. Nếu thành phần hoạt động với một tập tin cấu hình do bên thứ ba cung cấp, nó sẽ không cần xem lại thiết kế. Nếu cấu hình của bên thứ ba triển khai một tính năng mới hoặc thành phần mới, nó sẽ cần vượt qua khâu xem lại thiết kế của AMP.

### Các kỳ vọng đối với bên thứ ba

- Việc thêm một dịch vụ bên thứ ba mới vào một đóng góp cấp 2 hiện có thường sẽ không cần xem lại thiết kế. Bên thứ ba có thể làm theo tài liệu của thành phần đó.
- Việc đề xuất một thành phần mới cho đóng góp cấp 2 sẽ cần lôgic tính năng được chia sẻ bởi các dịch vụ bên thứ ba khác.

### Ví dụ cấp 2

[**amp-analytics**](../../../components/reference/amp-analytics.md)

Dịch vụ phân tích AMP cho phép bạn gửi các sự kiện về máy chủ dựa trên các yếu tố kích hoạt mà bạn đã cấu hình. Chúng tôi đã viết một [hướng dẫn tích hợp phân tích](../../optimize-measure/configure-analytics/index.md) để giúp bạn bắt đầu.

Nếu bạn chỉ cần thêm một điểm ảnh theo dõi với các tham số động vào URL theo dõi của mình, hãy xem [`amp-pixel`](../../../components/reference/amp-pixel.md). Hãy nhớ ghi chép việc sử dụng trên trang hỗ trợ của bạn cho các nhà phát triển có thể muốn sử dụng công nghệ của bạn với AMP.

Có rất nhiều đơn vị cung cấp dịch vụ phân tích đã bổ sung hỗ trợ cho amp-analytics. Sau đây là một [yêu cầu kéo mẫu](https://github.com/ampproject/amphtml/pull/1595) từ đơn vị cung cấp dịch vụ phân tích [Parse.ly](https://www.parsely.com/help/integration/google-amp/).

[**amp-call-tracking**](../../../components/reference/amp-call-tracking.md)

Nếu bạn cung cấp các dịch vụ đo lường theo dõi cuộc gọi, trường hợp sử dụng của bạn có thể được hỗ trợ bởi [`amp-call-tracking`](../../../components/reference/amp-call-tracking.md). Thành phần này sẽ thay đổi năng động một số điện thoại trong một siêu liên kết để cho phép theo dõi cuộc gọi, bằng cách thực hiện một yêu cầu CORS để thay số này.

Để tìm hiểu thêm về cách thành phần này có thể giúp bạn, hãy xem [tài liệu tham khảo](../../../components/reference/amp-call-tracking.md).

## Đóng góp cấp 3

Một đóng góp cấp 3 giới thiệu một thành phần dành riêng cho bên thứ ba mới. Nó chỉ được áp dụng nếu các bên thứ ba không thể:

- Tìm một thành phần phù hợp cho trường hợp sử dụng của họ.
- Yêu cầu cải thiện tính năng để đáp ứng trường hợp sử dụng của họ.
- Đề xuất một thành phần áp dụng cho các dịch vụ bên thứ ba khác.

### Các kỳ vọng đối với bên thứ ba

- Viết và đề xuất việc xem lại thiết kế.
- Các kiểm tra phải có thể phát hiện lỗi gãy.
- Khắc phục, hoặc yêu cầu trợ giúp nếu thành phần bị gãy.
- Cung cấp các tài liệu với mẫu code.
- Duy trì và cập nhật tài liệu.
- Cung cấp một kênh khắc phục sự cố để các nhà phát triển AMP có thể yêu cầu hỗ trợ.
