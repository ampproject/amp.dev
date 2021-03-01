---
'$title': Quảng cáo trong Câu chuyện Web
$order: 3
description: Câu chuyện Web là một trải nghiệm tương tác toàn màn hình cho phép độc giả có thể đắm chìm vào nội dung. AMP Story Ad cho phép quảng cáo được tích hợp liền mạch và không gián đoạn...
formats:
  - stories
author: CrystalOnScript
---

Câu chuyện Web là một trải nghiệm tương tác toàn màn hình cho phép độc giả có thể đắm chìm vào nội dung. Câu chuyện Web cho phép quảng cáo được tích hợp liền mạch và không gián đoạn vào hành trình của người dùng, đảm bảo sự gắn kết và trải nghiệm thú vị của họ trên nền tảng.

## Vị trí đặt Quảng cáo

Web Stories sử dụng một thành phần [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) để quyết định số lượng và vị trí đặt quảng cáo.

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) là một hàm bọc quanh thành phần [`amp-ad`](../../../documentation/components/reference/amp-ad.md). Hàm này sẽ chèn động một hoặc nhiều quảng cáo khi người dùng đang xem nội dung câu chuyện. Để đảm bảo trải nghiệm người dùng tốt nhất:

1. Các quảng cáo được render sẵn bởi thời gian chạy Câu chuyện Web, sau đó được chèn vào. Việc này đảm bảo người dùng sẽ không bao giờ bị cho xem một quảng cáo trống hay chưa tải xong.

2. Mật độ quảng cáo được tối ưu với tỷ lệ nội dung để ngăn bão hòa quá mức. Thành phần [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) quyết định thời gian và vị trí chèn quảng cáo khi người dùng xem tiếp.

Một Câu chuyện Web đặt quảng cáo đầu tiên sau hai trang đầu tiên với mục tiêu tối ưu doanh thu và trải nghiệm người dùng.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] LƯU Ý – Một Câu chuyện Web dài hơn thường sẽ tạo nhiều cơ hội để đặt quảng cáo hơn. Thuật toán đặt quảng cáo sẽ tiếp tục được tối ưu theo thời gian. [/tip]

## Tương tác Người dùng

Người dùng có thể đi qua quảng cáo như các câu chuyện thông thường; bằng cách chạm vào 2/3 màn hình ở bên phải.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='Image showing the area users can tap to skip an ad', caption='Users can progress past ads by tapping the right two thirds of the screen.', align='' ) }}

Người dùng có thể tương tác trực tiếp với quảng cáo bằng cách chạm vào nút [kêu gọi hành động](story_ads_best_practices.md#call-to-action-button-text-enum) được render bởi hệ thống, xuất hiện ở 1/3 dưới cùng của các quảng cáo Câu chuyện Web. Nút này có thể được cấu hình để gửi người dùng đến một URL tùy ý (hoặc đến cửa hàng ứng dụng liên quan).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Image showing that usersare redirected to an ad landing destination, but can return to the story.', caption='Users are redirected to an ad landing destination, but can return to the story.', align='' ) }}

## Cấu hình một Câu chuyện Web cho quảng cáo

Các Câu chuyện Web không thể hỗ trợ [`amp-ad`](../../../documentation/components/reference/amp-ad.md) trực tiếp trên trang. Thay vào đó, tất cả quảng cáo đều được truy xuất và hiển thị bởi thành phần [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md). Thành phần [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) phải được đặt như một yếu tố con trực tiếp của [`amp-story`](../../../documentation/components/reference/amp-story.md).

[sourcecode:html]
<amp-story>
<amp-story-auto-ads>
<script type="application/json">
{
"ad-attributes": {
// ad server configuration
}
}
</script>
</amp-story-auto-ads>
<amp-story-page>
...
</amp-story>
[/sourcecode]

Khác với một [`amp-ad`](../../../documentation/components/reference/amp-ad.md) thông thường, không cần `<fallback>` (phương án dự phòng) hay `<placeholder>` (mã giữ chỗ), bởi các quảng cáo Câu chuyện Web sẽ chỉ được hiển thị sau khi đã được render toàn bộ.

## Bắt đầu với Quảng cáo dưới dạng Câu chuyện

Cách dễ nhất để bao gồm quảng cáo trong Câu chuyện Web của bạn là phục vụ quảng cáo từ một máy chủ quảng cáo được hỗ trợ.

Các nền tảng quảng cáo hiện hỗ trợ quảng cáo Câu chuyện Web:

- Google Ad Manager <a name="google-ad-manager"></a>
  - [Quảng cáo được bán trực tiếp](https://support.google.com/admanager/answer/9038178)
  - [Quảng cáo theo lập trình](https://support.google.com/admanager/answer/9416436)
- Sắp có quảng cáo Google AdSense
- Các nền tảng quảng cáo khác có thể tích hợp (vui lòng liên hệ với chúng tôi để biết [chi tiết qua Github](https://github.com/ampproject/amphtml/issues/30769))

Nếu bạn là một nhà quảng cáo và muốn chạy quảng cáo của mình trong Câu chuyện Web, hãy [liên hệ](mailto:story-ads-wg@google.com) để biết thêm thông tin.

Các nhà phát hành cũng có thể đặt quảng cáo tùy chỉnh nếu họ đã thiết lập máy chủ quảng cáo của riêng mình. [Quy trình được mô tả chi tiết ở đây](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"] Đọc [Lưu thông quảng cáo tùy chỉnh trong Câu chuyện Web](https://support.google.com/admanager/answer/9038178) để biết thêm thông tin về việc tải quảng cáo lên Google Ad Manager và tham khảo hướng dẫn của chúng tôi về [Biện pháp thực hành tiên tiến nhất để tạo một AMP Story Ad](story_ads_best_practices.md). [/tip]
