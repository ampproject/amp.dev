---
'$title': Giới thiệu về quảng cáo AMPHTML
$order: 1
description: Các quảng cáo AMPHTML là một cách nhanh, nhẹ và bảo mật hơn để quảng cáo trên web. Tuy các trang AMP vẫn hỗ trợ quảng cáo HTML truyền thống, tốc độ tải cho các quảng cáo này có thể chậm.
formats:
  - ads
---

## Quảng cáo AMPHTML là gì?

Các quảng cáo AMPHTML là một cách nhanh, nhẹ và bảo mật hơn để quảng cáo trên web. Tuy các trang AMP vẫn hỗ trợ quảng cáo HTML truyền thống, tốc độ tải cho các quảng cáo này có thể chậm. Để các quảng cáo có tốc độ nhanh như phần còn lại của trang AMP, bạn có thể tạo quảng cáo trong AMPHTML. Quảng cáo AMPHTML chỉ được hiển thị sau khi đã được xác thực, đảm bảo rằng chúng được bảo mật và có hiệu năng cao. Quan trọng nhất, các quảng cáo này có thể được cung cấp ở bất cứ đâu trên web, _không chỉ trên các trang AMP_.

Các quảng cáo AMP được viết bằng AMP HTML theo [thông số quảng cáo AMPHTML](a4a_spec.md) (một biến thể của AMP HTML + CSS). Điều này có nghĩa các quảng cáo không còn có khả năng chạy JavaScript tùy chỉnh, vốn là lý do hàng đầu làm giảm hiệu năng quảng cáo. Do đó, cũng như AMP cốt lõi, các trường hợp sử dụng JavaScript quảng cáo cốt lõi được tích hợp vào trong dự án Mã nguồn mở AMP để đảm bảo các quảng cáo luôn có hành vi phù hợp.

### Lợi ích

Vì sao quảng cáo AMPHTML lại tốt hơn quảng cáo truyền thống?

1. **Nhanh hơn**: Các quảng cáo AMPHTML nhanh hơn bởi quảng cáo được yêu cầu sớm hơn trong quy trình render trang, và được hiển thị ngay trước khi người dùng xem quảng cáo. Kích cỡ của quảng cáo AMPHTML cũng nhỏ hơn, giúp tăng tốc độ.
2. **Nhẹ hơn**: Các quảng cáo AMPHTML kết hợp những chức năng quảng cáo thông dụng, giúp giảm kích cỡ tập tin quảng cáo. Khi được hiển thị trên trang, các quảng cáo AMPHTML cũng làm tiêu tốn ít tài nguyên hơn. Ví dụ, thay vì 10 bộ theo dõi yêu cầu thông tin cho riêng chúng trong các quảng cáo thông thường, các quảng cáo AMPHTML sẽ thu thập toàn bộ dữ liệu cùng lúc và phân phối nó cho mọi bộ theo dõi quan tâm.
3. **Phối hợp**: Trên các trang AMP, [thời gian chạy AMP](spec/amphtml.md#amp-runtime) có thể phối hợp tài nguyên giới hạn của điện thoại di động đến thành phần phù hợp ở thời điểm phù hợp để cho trải nghiệm người dùng tốt nhất. Ví dụ, các quảng cáo AMPHTML với hình hoạt họa sẽ bị tạm dừng khi quảng cáo đang không ở trong màn hiển thị hiện tại.
4. **Tương tác hơn**: Người dùng sẽ không thể tương tác với những quảng cáo mà họ không nhìn thấy. Quảng cáo được tải nhanh hơn cho khả năng xem cao hơn, dẫn đến tỷ lệ nhấp chuột cao hơn, đồng nghĩa với hiệu năng quảng cáo tốt hơn.
5. **Không bị Phần mềm độc hại**: Không thể phân tán phần mềm độc hại với các quảng cáo AMPHTML bởi các quảng cáo đều được xác minh trước khi được phục vụ. Do đó, các nhà quảng cáo có thể đảm bảo một trải nghiệm người dùng an toàn và cảm nhận tích cực về thương hiệu.
6. **Linh hoạt hơn**: Các quảng cáo AMPHTML được thiết kế để hoạt động trên các trang web AMP và không phải AMP, cũng như trên mọi thiết bị.

### Định dạng

Quảng cáo AMPHTML rất linh hoạt và năng động, cho phép nhiều định dạng quảng cáo khác nhau như băng chuyền, parallax và lightbox, v.v... Bắt đầu bằng cách tận dụng khuôn mẫu quảng cáo AMPHTML mã nguồn mở trong phần [Các ví dụ](../../../documentation/examples/index.html).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Băng chuyền</td>
    <td>Video Parallax</td>
    <td>Lightbox</td>
  </tr>
</table>

## Cách thức hoạt động của quảng cáo AMPHTML

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serving AMPHTML ads to AMP pages', align='' ) }}

1. Các nhà phát hành chèn một ô quảng cáo trên trang AMP của họ thông qua thẻ [`amp-ad`](../../../documentation/components/reference/amp-ad.md), quy định mạng lưới quảng cáo mà họ muốn sử dụng.
2. Thời gian chạy AMP gửi một yêu cầu quảng cáo đến mạng lưới quảng cáo được quy định để truy xuất quảng cáo. Các mạng lưới quảng cáo có khả năng phục vụ quảng cáo AMPHTML sẽ [triển khai Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) để xác thực và phê duyệt quảng cáo.
3. Mạng lưới quảng cáo hồi đáp với quảng cáo AMPHTML và Thời gian chạy AMP sẽ render quảng cáo trên trang AMP.

[tip type="note"] Không cần tích hợp đặc biệt để phục vụ các quảng cáo AMPHTML trên các trang không phải AMP. Hãy kiểm tra với mạng lưới quảng cáo của bạn để xem họ có hỗ trợ quảng cáo AMPHTML hay không. [/tip]

## Phục vụ các quảng cáo AMPHTML

### Nhà phát hành

Để phục vụ định dạng quảng cáo bán hàng trực tiếp của bạn trong AMPHTML, bạn phải tạo quảng cáo theo [thông số quảng cáo AMPHTML](a4a_spec.md) và phục vụ chúng qua một máy chủ quảng cáo hỗ trợ quảng cáo AMPHTML. Hiện tại, các máy chủ quảng cáo sau hỗ trợ quảng cáo AMPHTML:

- DoubleClick for Publishers
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

Để phục vụ quảng cáo AMPHTML thông qua các kênh gián tiếp (ví dụ như sàn giao dịch, SSP, v.v.), hãy sử dụng một mạng lưới quảng cáo/máy chủ quảng cáo được hỗ trợ trong [danh sách sau đây](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### Các đơn vị thiết kế quảng cáo

Nếu bạn là một đơn vị thiết kế quảng cáo, bạn phải tạo quảng cáo theo [thông số quảng cáo AMPHTML](a4a_spec.md). Để được truyền cảm hứng và xem ví dụ, hãy tham khảo các khuôn mẫu quảng cáo AMPHTML mã nguồn mở trong phần [Các ví dụ](../../../documentation/examples/index.html). Hoặc, sử dụng một trong các công cụ sau đây để tạo các quảng cáo AMPHTML:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_sắp có_)

### Mạng lưới/máy chủ quảng cáo

Để cung cấp quảng cáo AMPHTML cho các trang AMP, bạn cần tạo một phần mở rộng [`amp-ad`](../../../documentation/components/reference/amp-ad.md) cho mạng lưới của mình (trừ khi bạn đã có rồi), sử dụng [triển khai yêu cầu quảng cáo Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md). Tham khảo [Tích hợp với AMP để hiển thị quảng cáo](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md) để biết thêm chi tiết. Hãy nhớ rằng bạn không cần tích hợp đặc biệt để phục vụ các quảng cáo AMPHTML trên các trang không phải AMP.

## Tạo quảng cáo AMPHTML

**Từ đầu**: Các quảng cáo AMPHTML phải tuân theo [thông số quảng cáo AMPHTML](a4a_spec.md). Để xem các bản demo và ví dụ, hãy tham khảo các khuôn mẫu quảng cáo AMPHTML mã nguồn mở trong phần [Các ví dụ](../../../documentation/examples/documentation/amp-ad.html).

**Sử dụng công cụ**: Bạn có thể sử dụng bất kỳ công cụ nào sau đây để xây dựng các quảng cáo AMPHTML:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (_sắp có_)

### Xác thực cú pháp quảng cáo AMPHTML

Sau khi tạo quảng cáo AMPHTML của bạn, bạn cần đảm bảo rằng quảng cáo sử dụng đúng cú pháp AMPHTML. Tùy thuộc vào môi trường phát triển của bạn, có một số tùy chọn bạn có thể sử dụng để xác thực các quảng cáo AMPHTML của mình:

- Sử dụng mô-đun [AMP validator NPM](https://www.npmjs.com/package/amphtml-validator) để tích hợp việc xác thực vào CI bản dựng của bạn.
- Sử dụng [bộ xác thực AMP](https://validator.ampproject.org/) để thỉnh thoảng kiểm tra.
- Hợp tác với [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) và sử dụng điểm cuối xác thực công khai của họ.

[tip type="note"] **LƯU Ý –** Để render nhanh quảng cáo AMPHTML trên các trang AMP (ví dụ, sử dụng tùy chọn render trong Fast Fetch), cú pháp quảng cáo phải đúng. Nếu cú pháp không hợp lệ, quảng cáo vẫn sẽ render, chỉ có điều không nhanh. [/tip]

## Hỗ trợ quảng cáo AMPHTML trong RTB

Đối với các SSP và sàn giao dịch quảng cáo muốn hỗ trợ quảng cáo AMPHTML trong một môi trường Đấu giá trong Thời gian thực (RTB), hãy tham khảo [Hướng dẫn Triển khai cho Sàn giao dịch Quảng cáo RTB](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) để biết thêm chi tiết.

## Câu hỏi thường gặp

#### Liệu có mẫu quảng cáo AMPHTML nào không?

Có. Bạn có thể tìm thấy rất nhiều khuôn mẫu quảng cáo AMPHTML tuyệt đẹp trong [Các ví dụ](../../../documentation/examples/documentation/amp-ad.html). Các mẫu này sử dụng những thành phần nâng cao trong AMP.

#### Liệu các quảng cáo AMPHTML có hỗ trợ xác minh bên thứ 3 và phát hiện khả năng xem?

Có, có hỗ trợ tự nhiên để xác minh và phát hiện khả năng xem với [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (ví dụ, Google ActiveView tích hợp phương thức này). Ngoài ra, cũng có các nhà cung cấp khác như MOAT đang tích cực triển khai hỗ trợ cho nó.

#### Liệu các quảng cáo AMPHTML có hỗ trợ hình hoạt họa dựa trên dòng thời gian?

Có. Xem [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### Hầu hết các quảng cáo đều có các mục tiêu chạm được và điểm thoát quảng cáo cấu hình được. Liệu các quảng cáo AMPHTML đều có cơ cấu giống nhau không?

Có. Xem [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### Tôi không thể tìm thấy thứ mình cần, tôi có thể đặt câu hỏi ở đâu?

- Chúng tôi khuyến nghị [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) để tìm câu trả lời cho các thắc mắc về AMP; bởi các thành viên của cộng đồng Dự án AMP thường xuyên theo dõi Stack Overflow, bạn sẽ có nhiều khả năng nhận được câu trả lời nhanh chóng cho các câu hỏi của mình trên đó.
- Tham gia kênh [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) để xem các giải pháp và câu trả lời.
- Nếu bạn gặp một lỗi trong AMP hoặc có một yêu cầu tính năng đối với AMP, hãy xem phần [Báo cáo các vấn đề với AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) để biết thêm thông tin về việc gửi đi một vấn đề.
