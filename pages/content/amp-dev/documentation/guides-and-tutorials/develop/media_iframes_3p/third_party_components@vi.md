---
'$title': Bao gồm nội dung của bên thứ ba
$order: 9
description: Tìm hiểu cách để bao gồm các thành phần của bên thứ ba trong trang của bạn...
formats:
  - websites
components:
  - iframe
  - facebook
author: Meggin
contributors:
  - pbakaus
  - bpaduch
---

Tìm hiểu cách để bao gồm các thành phần của bên thứ ba trong trang của bạn.

## Nhúng một Tweet

Nhúng một Tweet từ Twitter trong trang của bạn sử dụng yếu tố [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

Để nhúng một tweet vào trang của bạn, trước hết hãy bao gồm kịch bản sau trong phần `<head>`:

[sourcecode:html]

<script async custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>

[/sourcecode]

Hiện tại, các tweet sẽ tự động được thu phóng để vừa với kích cỡ được cung cấp, nhưng điều này có thể cho chúng một ngoại hình không lý tưởng. Hãy tinh chỉnh thủ công chiều rộng và chiều cao được cung cấp hay sử dụng thuộc tính đa phương tiện để chọn tỷ lệ khung hình dựa trên chiều rộng màn hình.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]

```html
<amp-twitter
  width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

[/example]

[tip type="tip"] **MẸO –** Xem thêm ví dụ về [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) tại [AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html). [/tip]

## Nhúng một Instagram

Nhúng một Instagram vào trang của bạn sử dụng yếu tố [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Để nhúng một Instagram, trước hết hãy bao gồm kịch bản sau trong phần `<head>`:

[sourcecode:html]

<script async custom-element="amp-instagram"
  src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>

[/sourcecode]

Bao gồm mã ngắn dữ liệu Instagram có trong URL ảnh Instagram. Ví dụ, trong `https://instagram.com/p/fBwFP`, `fBwFP` là mã ngắn dữ liệu. Đồng thời, Instagram sử dụng một tỷ lệ khung hình cố định cho bố cục tương thích, vậy nên giá trị cho chiều rộng và chiều cao sẽ là giá trị chung.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]

```html
<amp-instagram
  data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive"
>
</amp-instagram>
```

[/example]

[tip type="tip"] **MẸO –** Xem thêm ví dụ về [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) tại [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html). [/tip]

## Hiển thị một bài đăng hoặc video Facebook

Hiển thị một bài đăng hoặc video Facebook trong trang của bạn sử dụng yếu tố [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

Bạn cần bao gồm kịch bản sau trong phần `<head>`:

[sourcecode:html]

<script async custom-element="amp-facebook"
  src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>

[/sourcecode]

##### Ví dụ: Nhúng một bài đăng

Nguồn:

```html
<amp-facebook
  width="486"
  height="657"
  layout="responsive"
  data-href="https://www.facebook.com/zuck/posts/10102593740125791"
>
</amp-facebook>
```

Xem trước: {amp-facebook0} {/amp-facebook0}

##### Ví dụ: Nhúng một video

Nguồn:

```html
<amp-facebook
  width="476"
  height="316"
  layout="responsive"
  data-embed-as="video"
  data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"
>
</amp-facebook>
```

Xem trước: {amp-facebook0} {/amp-facebook0}

[tip type="tip"] **MẸO –** Xem thêm ví dụ về [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) tại [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html). [/tip]

## Nhúng một video YouTube

Nhúng một video YouTube vào trang của bạn sử dụng yếu tố [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Bạn cần bao gồm kịch bản sau trong phần `<head>`:

[sourcecode:html]

<script async custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

[/sourcecode]

`data-videoid` YouTube có thể được tìm thấy trong URL của trang video YouTube. Ví dụ, trong `https://www.youtube.com/watch?v=Z1q71gFeRqM`, `Z1q71gFeRqM` là video id.

Sử dụng `layout="responsive"` để cho bố cục phù hợp cho các video có tỷ lệ khung hình 16:9:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

[tip type="tip"] **MẸO –** Xem thêm ví dụ về [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) tại [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html). [/tip]

## Hiển thị một quảng cáo

Hiển thị một quảng cáo trong trang của bạn sử dụng yếu tố [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Chỉ hỗ trợ các quảng cáo được phục vụ qua HTTPS.

JavaScript của mạng lưới quảng cáo không được chạy trong tài liệu AMP. Thay vào đó, thời gian chạy AMP sẽ tải một iframe từ một nguồn khác (thông qua iframe sandbox) và thực thi JS của mạng lưới quảng cáo trong iframe sandbox đó.

Bạn phải quy định chiều rộng và chiều cao của quảng cáo, và loại mạng lưới quảng cáo. `Type` (loại) xác định khuôn mẫu của mạng lưới quảng cáo. Các loại quảng cáo khác nhau yêu cầu các thuộc tính `data-*` khác nhau.

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
</amp-ad>
```

[/example]

Nếu mạng lưới quảng cáo có hỗ trợ, bao gồm một `placeholder` (mã giữ chỗ) trong trường hợp không có quảng cáo nào khả dụng:

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
  <div placeholder>Have a great day!</div>
</amp-ad>
```

[/example]

AMP hỗ trợ nhiều loại mạng lưới quảng cáo. Xem [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) để biết danh sách đầy đủ.

[tip type="read-on"] **ĐỌC TIẾP –** Tìm hiểu thêm về quảng cáo trong hướng dẫn [Phục vụ Quảng cáo trên AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md). [/tip]
