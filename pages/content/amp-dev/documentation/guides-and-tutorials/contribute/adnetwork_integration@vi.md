---
'$title': Tích hợp với AMP để hiển thị quảng cáo
$order: 5
description: Hướng dẫn này dành cho các mạng lưới quảng cáo muốn tích hợp với AMP để hiển thị quảng cáo cho các trang AMP.
formats:
  - ads
---

Hướng dẫn này dành cho các mạng lưới quảng cáo muốn tích hợp với AMP để hiển thị quảng cáo cho các trang AMP.

## Tổng quan

Là một máy chủ quảng cáo, bạn có thể tích hợp với AMP để phục vụ các quảng cáo HTML truyền thống cho các trang AMP, cũng như phục vụ các quảng cáo [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### Bạn muốn phục vụ các quảng cáo HTML truyền thống?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### Bạn muốn phục vụ các quảng cáo AMPHTML?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (ví dụ, nếu bạn chưa tạo chức năng này để phục vụ các quảng cáo HTML truyền thống).
2. [Tạo một tích hợp Fast Fetch để phục vụ các quảng cáo AMPHTML](#creating-a-fast-fetch-integration).

## Tạo một `amp-ad` <a name="creating-an-amp-ad"></a>

Là một máy chủ quảng cáo, các nhà phát hành mà bạn hỗ trợ sẽ bao gồm một thư viện JavaScript do bạn cung cấp và đặt các "đoạn code quảng cáo" khác nhau dựa trên thư viện JavaScript này để truy xuất quảng cáo và hiển thị chúng trên website của nhà phát hành. Bởi AMP không cho phép các nhà phát hành thực thi JavaScript tùy chỉnh, bạn sẽ cần đóng góp vào mã nguồn mở AMP để cho phép thẻ [`amp-ad`](../../../documentation/components/reference/amp-ad.md) yêu cầu quảng cáo từ máy chủ quảng cáo của bạn.

[tip type="note"] **LƯU Ý** – Bạn có thể sử dụng triển khai [`amp-ad`](../../../documentation/components/reference/amp-ad.md) này để hiển thị các quảng cáo HTML truyền thống **cũng như** quảng cáo AMPHTML. [/tip]

Ví dụ, máy chủ Amazon A9 có thể được gọi bằng cách sử dụng cú pháp sau:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Trong đoạn mã trên, thuộc tính `type` (loại) quy định mạng lưới quảng cáo, trong trường hợp này là A9. Thuộc tính `data-*` phụ thuộc vào các tham số được máy chủ Amazon A9 kỳ vọng để phục vụ một quảng cáo. Tập tin [`a9.js`](https://github.com/ampproject/amphtml/blob/master/ads/a9.js) hiển thị cách các tham số được ánh xạ để tạo một lệnh gọi JavaScript cho URL của máy chủ A9. Các tham số tương ứng được phê duyệt bởi thẻ [`amp-ad`](../../../documentation/components/reference/amp-ad.md) sẽ được chèn vào URL để trả về một quảng cáo.

Để được hướng dẫn về việc tạo một tích hợp [`amp-ad`](../../../documentation/components/reference/amp-ad.md), hãy xem [Tích hợp các mạng lưới quảng cáo vào AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

## Tạo một tích hợp Fast Fetch <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) là một cơ cấu AMP chia tách yêu cầu quảng cáo với hồi đáp quảng cáo, cho phép các yêu cầu quảng cáo xảy ra sớm hơn trong vòng đời của trang, và chỉ render quảng cáo khi chúng có nhiều khả năng được người dùng xem. Fast Fetch ưu tiên xử lý các quảng cáo AMPHTML đã được xác minh so với các quảng cáo HTML truyền thống. Với Fast Fetch, nếu một quảng cáo không vượt qua khâu xác thực, quảng cáo đó sẽ được bọc trong một iframe khác tên miền để tách biệt nó khỏi phần còn lại của tài liệu AMP. Tương tự, một quảng cáo AMPHTML vượt qua xác thực sẽ được ghi trực tiếp vào trang. Fast Fetch xử lý cả các quảng cáo AMP và không phải AMP; không có yêu cầu quảng cáo bổ sung nào là cần thiết cho các quảng cáo không vượt qua xác thực.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Fast Fetch Integration flow', caption='Fast Fetch Integration flow' ) }}

Để phục vụ quảng cáo AMPHTML từ máy chủ quảng cáo của bạn, bạn phải cung cấp một tích hợp Fast Fetch bao gồm:

1. Hỗ trợ giao tiếp mạng SSL.
2. Cung cấp JavaScript để xây dựng yêu cầu quảng cáo (ví dụ triển khai: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) & [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
3. Xác thực và ký kết cho quảng cáo thông qua một dịch vụ xác thực. [Cloudflare](https://blog.cloudflare.com/firebolt/) cung cấp một dịch vụ xác minh quảng cáo AMP, cho phép mọi nhà cung cấp quảng cáo độc lập có thể cung cấp các quảng cáo nhanh, nhẹ và cuốn hút hơn.

Để được hướng dẫn về việc tạo tích hợp Fast Fetch, hãy xem [Hướng dẫn Triển khai Mạng lưới Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md).

## Các tài nguyên liên quan

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [Danh sách các nhà cung cấp quảng cáo được hỗ trợ](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [Bài đăng blog giới thiệu về Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
