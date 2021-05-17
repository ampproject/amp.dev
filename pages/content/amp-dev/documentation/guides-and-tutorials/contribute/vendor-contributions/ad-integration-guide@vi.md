---
'$title': Tích hợp công nghệ quảng cáo của bạn vào AMP
$order: 3
formats:
  - ads
teaser:
  text: Nếu bạn là một đơn vị cung cấp công nghệ quảng cáo và muốn tích hợp với AMP HTML, hãy xem các hướng dẫn dưới đây.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

Nếu bạn là một đơn vị cung cấp công nghệ quảng cáo và muốn tích hợp với AMP HTML, hãy xem các hướng dẫn dưới đây. Để đảm bảo độ trễ tối thiểu và chất lượng tốt, hãy tuân thủ các hướng dẫn được liệt kê [ở đây](https://github.com/ampproject/amphtml/blob/main/ads/../3p/README.md#ads) trước khi gửi một yêu cầu kéo cho dự án mã nguồn mở AMP. Để biết hướng dẫn chung về cách bắt đầu đóng góp cho AMP, hãy xem <a class="" href="https://github.com/ampproject/amphtml/blob/main/docs/contributing.md">CONTRIBUTING.md</a>.

## Máy chủ Quảng cáo <a name="ad-server"></a>

_Ví dụ: DFP, A9_

Là một máy chủ quảng cáo, các nhà phát hành mà bạn hỗ trợ sẽ bao gồm một thư viện JavaScript do bạn cung cấp và đặt các "đoạn code quảng cáo" khác nhau dựa trên thư viện JavaScript này để truy xuất quảng cáo và hiển thị chúng trên website của nhà phát hành.

Bởi AMP không cho phép các nhà phát hành thực thi JavaScript tùy chỉnh, bạn sẽ cần đóng góp vào mã nguồn mở AMP để cho phép thẻ <code>amp-ad</code> yêu cầu quảng cáo từ máy chủ quảng cáo của bạn.

Ví dụ: Máy chủ Amazon A9 có thể được gọi bằng cách sử dụng cú pháp sau:

[sourcecode:html]
<amp-ad
width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302"

> </amp-ad>
> [/sourcecode]

Lưu ý rằng mỗi thuộc tính theo sau `type` (loại) đều phụ thuộc vào các tham số mà máy chủ Amazon A9 kỳ vọng để cung cấp một quảng cáo. Tập tin [a9.js](https://github.com/ampproject/amphtml/blob/main/ads/./a9.js) hiển thị cho bạn cách các tham số được ánh xạ để thực hiện một lệnh gọi JavaScript và gọi máy chủ A9 thông qua URL `https://c.amazon-adsystem.com/aax2/assoc.js`. Các tham số tương ứng được phê duyệt bởi thẻ quảng cáo AMP sẽ được chèn vào URL để trả về một quảng cáo.

Để biết thêm chi tiết về cách tích hợp mạng lưới quảng cáo của bạn vào AMP, hãy xem [Tích hợp các mạng lưới quảng cáo vào AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## Nền tảng Bên Cung cấp (SSP) hoặc một Sàn Quảng cáo <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

_Ví dụ: Rubicon, Criteo HOẶC Appnexus, Ad-Exchange_

Nếu bạn là một nền tảng bên bán muốn được gọi trực tiếp từ một trang web của nhà phát hành, bạn sẽ cần làm theo hướng dẫn ở trên để tích hợp với một Máy chủ Quảng cáo. Việc thêm giá trị `type` (loại) của riêng bạn vào thẻ amp-ad cho phép bạn phân phối thẻ của mình cho nhà phát hành, để họ có thể chèn trực tiếp thẻ của bạn vào các trang AMP của họ.

Thông dụng hơn, các SSP sẽ làm việc với nhà phát hành để chèn thẻ quảng cáo của SSP vào máy chủ quảng cáo của họ. Trong trường hợp này, hãy đảm bảo mọi tài sản đang được tải bởi kịch bản của bạn trong quảng cáo của máy chủ quảng cáo đều được tạo qua HTTPS. Có một số hạn chế về định dạng quảng cáo như khả năng mở rộng, vậy nên chúng tôi khuyên bạn kiểm tra những định dạng quảng cáo thông dụng nhất với nhà phát hành của mình.

## Công ty Thiết kế Quảng cáo <a name="ad-agency"></a>

_Ví dụ: Essence, Omnicom_

Làm việc với nhà phát hành của bạn để đảm bảo các quảng cáo bạn đang phát triển tuân thủ AMP. Bởi tất cả quảng cáo đều được phục vụ trong iframe với kích cỡ được xác định khi quảng cáo được gọi, hãy đảm bảo quảng cáo của bạn không cố gắng sửa đổi kích cỡ của iframe.

Đảm bảo mọi tài sản thuộc quảng cáo đều được yêu cầu qua HTTPS. Một số định dạng quảng cáo không được hỗ trợ đầy đủ tại thời điểm này và chúng tôi khuyên bạn nên kiểm tra quảng cáo trong một môi trường AMP. Một số ví dụ: Quảng cáo Mở rộng Đa phương tiện Phong phú, Quảng cáo Đan xen, Quảng cáo Cấp độ Trang.

## Trình phát Video <a name="video-player"></a>

_Ví dụ: Brightcove, Ooyala_

Một trình phát video hoạt động trong các trang HTML thông thường sẽ không hoạt động trong AMP và do đó một thẻ cụ thể phải được tạo để cho phép Thời gian chạy AMP tải trình phát của bạn. Brightcove đã tạo một thẻ [amp-brightcove](https://github.com/ampproject/amphtml/blob/main/extensions/amp-brightcove/amp-brightcove.md) cho phép các nội dung đa phương tiện và quảng cáo được phát trong các trang AMP.

Một trình phát Brightcove có thể được gọi như sau:

[sourcecode:html]
<amp-brightcove
data-account="1290862519001"
data-video-id="ref:amp-docs-sample"
data-player="S1Tt8cgaM"
layout="responsive"
width="480"
height="270"

> </amp-brightcove>
> [/sourcecode]

Để biết hướng dẫn về cách phát triển một thẻ amp như Brightcove, hãy xem [yêu cầu kéo này](https://github.com/ampproject/amphtml/pull/1052).

## Mạng lưới Quảng cáo Video <a name="video-ad-network"></a>

_Ví dụ: Tremor, Brightroll_

Nếu bạn là một mạng lưới quảng cáo video, hãy làm việc với nhà phát hành của bạn để đảm bảo rằng:

- Mọi tài sản video đều được phục vụ qua HTTPS
- Trình phát video của nhà phát hành có hỗ trợ AMP

## Nền tảng Quản lý Dữ liệu (DMP) <a name="data-management-platform-dmp"></a>

_Ví dụ: KRUX, Bluekai_

Xem [cách để tăng cường cấu hình quảng cáo tùy chỉnh](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration).

Bạn có thể sử dụng một lối tiếp cận tương tự để tăng cường cho lệnh gọi quảng cáo bằng cách chuyển các phân khúc độc giả mà bạn nhận được từ cookie người dùng vào lệnh gọi quảng cáo.

## Nhà cung cấp Khả năng Xem <a name="viewability-provider"></a>

_Ví dụ: MOAT, Integral Ad Science_

Nhà cung cấp khả năng xem thường tích hợp với các nhà phát hành thông qua hàm bọc quảng cáo của máy chủ quảng cáo. Nếu vậy, hãy đảm bảo hàm bọc quảng cáo tải tất cả các tài sản qua HTTPS.

Ví dụ cho MOAT, đảm bảo rằng `http://js.moatads.com` được chuyển thành `https://z.moatads.com`

Đồng thời, xem lối tiếp cận để sử dụng [mô hình quan sát đa phần](https://github.com/ampproject/amphtml/blob/main/ads/README.md#ad-viewability).

## Nền tảng Khuyến nghị Nội dung <a name="content-recommendation-platform"></a>

_Ví dụ: Taboola, Outbrain_

Hữu ích nếu bạn có một số đoạn JavaScript được nhúng trên website của nhà phát hành hôm nay, nhưng lối tiếp cận này có thể không hoạt động trên các trang AMP. Nếu bạn muốn khuyến nghị nội dung trên một trang AMP, chúng tôi khuyên bạn nên sử dụng [phần mở rộng `amp-embed`](https://amp.dev/documentation/components/amp-ad) để yêu cầu chi tiết nội dung. Vui lòng xem ví dụ về [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md).
