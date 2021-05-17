---
'$title': Biện pháp thực hành tiên tiến nhất để tạo một quảng cáo Câu chuyện Web
$order: 16
description: Câu chuyện Web là một trải nghiệm tương tác toàn màn hình cho phép độc giả có thể đắm chìm vào nội dung. Các quảng cáo trong Câu chuyện Web nên có một thiết kế nhất quán và liền mạch với Web Stories UX.
formats:
  - ads
  - stories
---

Câu chuyện Web là một trải nghiệm tương tác toàn màn hình cho phép độc giả có thể đắm chìm vào nội dung. Các quảng cáo trong Câu chuyện Web nên có một thiết kế nhất quán và liền mạch với Web Stories UX. Việc này giúp đảm bảo trải nghiệm người dùng không bị gián đoạn hay gây bực bội. Hướng dẫn này minh họa cách để xây dựng quảng cáo cho Câu chuyện Web.

## Các nguyên tắc cho quảng cáo Câu chuyện Web

Các định dạng quảng cáo hiện tại, ví dụ như bảng và hộp quảng cáo không tích hợp tốt với định dạng AMP Story. Các quảng cáo truyền thống chậm, gây gián đoạn và cho cảm giác không ăn nhập trong trải nghiệm Story.

Quảng cáo Câu chuyện Web tuân thủ các nguyên tắc sau:

- Quảng cáo AMPHTML hợp lệ: tuân thủ thông số kỹ thuật như một [quảng cáo AMPHTML](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md) truyền thống.
- Ưu tiên hình ảnh: Cuốn hút, táo bạo, có tính mời gọi dựa trên ngữ cảnh.
- Tự nhiên: Trang quảng cáo có cùng kích thước như một trang quảng cáo hữu cơ.
- Mô hình tương tác giống nhau: Người dùng có thể chuyển tiếp sang màn hình tiếp theo như với một trang quảng cáo hữu cơ.
- Nhanh: Quảng cáo không bao giờ được hiển thị cho người dùng trong một trạng thái dở dang.

Để thống nhất với các nguyên tắc này, thời gian chạy Câu chuyện Web sẽ xác định vị trí đặt trang quảng cáo phù hợp trong Câu chuyện Web. Đọc thêm về cơ cấu đặt quảng cáo trong [Quảng cáo trong Câu chuyện Web](advertise_amp_stories.md).

## Mẫu quảng cáo Câu chuyện Web

Quảng cáo Câu chuyện Web là quảng cáo AMPHTML, nhưng có thẻ siêu dữ liệu cần thiết, đáp ứng các thông số cụ thể về bố cục và yếu tố UI. Một quảng cáo Câu chuyện Web sẽ luôn bao gồm một nút kêu gọi hành động (CTA) và một nhãn quảng cáo được hiển thị như một thoả thuận từ chối trách nhiệm ở đầu trang.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Example of an AMP Story ad', caption='Example of an AMP Story ad', align='' ) }}

Để đảm bảo trải nghiệm người dùng được nhất quán, thời gian chạy Câu chuyện Web có trách nhiệm render nhãn quảng cáo và nút CTA.

[tip type="important"] **QUAN TRỌNG –** Người dùng chỉ có thể nhấn vào nút CTA trong một quảng cáo Câu chuyện Web, vậy nên hãy lưu ý điều này khi phát triển quảng cáo của bạn. [/tip]

## Thẻ siêu dữ liệu

Thẻ siêu dữ liệu xác nhận rằng quảng cáo đáp ứng định dạng Câu chuyện Web, thiết lập danh sách trong nút CTA, quy định trang đích của nút và loại trang đó.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

Nên chọn thẻ amp-cta-type từ [các tùy chọn văn bản Nút CTA khả dụng](#call-to-action-button-text-enum). AMP sẽ tự động bản địa hóa các tùy chọn được quy định sẵn nếu phù hợp.

Bạn có thể nhập văn bản tùy chỉnh, nhưng sẽ cần tự cung cấp bản dịch.

## Danh sách trong nút kêu gọi hành động <a name="call-to-action-button-text-enum"></a>

Nút kêu gọi hành động có thể được cấu hình từ một số lựa chọn được quy định sẵn:

- `APPLY_NOW`: "Đăng ký ngay"
- `BOOK_NOW`: "Đặt chỗ"
- `BUY_TICKETS`: "Mua vé"
- `DOWNLOAD`: "Tải về"
- `EXPLORE`: "Khám phá ngay"
- `GET_NOW`: "Tải ngay"
- `INSTALL`: "Cài đặt ngay"
- `LISTEN`: "Nghe ngay"
- `MORE`: "Xem thêm"
- `OPEN_APP`: "Mở Ứng dụng"
- `ORDER_NOW`: "Đặt mua ngay"
- `PLAY`: "Chơi"
- `READ`: "Đọc ngay"
- `SHOP`: "Mua ngay"
- `SHOWTIMES`: "Thời gian bắt đầu"
- `SIGN_UP`: "Đăng ký"
- `SUBSCRIBE`: "Đăng ký theo dõi ngay"
- `USE_APP`: "Sử dụng Ứng dụng"
- `VIEW`: "Xem"
- `WATCH`: "Xem"
- `WATCH_EPISODE`: "Xem Tập"

[tip type="note"] **LƯU Ý –** Không hỗ trợ liên kết sâu đến ứng dụng, nhưng liên kết đến trang App Store hoặc trang Google Play Store được hỗ trợ thông qua http/https. Danh sách nút CTA được quy định trong trọng tải hồi đáp của quảng cáo. [/tip]

Nếu bạn cần hỗ trợ một danh sách nút CTA mới, hãy mở một [vấn đề trong GitHub](https://github.com/ampproject/amphtml/issues/new).

## Trang đích đến cho quảng cáo

Bạn có thể quy định một trong ba tùy chọn cho một trang đích đến của quảng cáo Câu chuyện Web.

- `STORY`: • Trang đích đến là một {1}câu chuyện được tài trợ.
- `AMP`: • Trang đích đến là một Trang AMP hợp lệ.
- `NONAMP`: • Mọi loại trang web khác.

## Bố cục

Các AMP Story có chiều ngang và kích cỡ toàn màn hình. Các quảng cáo dưới dạng câu chuyện phải khớp với định dạng này để cung cấp một trải nghiệm người dùng nhất quán.

## Kích thước màn hình phủ

Nhãn quảng cáo sẽ phủ một thanh građien tối màu trên toàn bộ chiều rộng của quảng cáo và kéo dài từ phía trên cùng đến xuống 46px.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstration of ad overlay', caption='The ad overlay sits at the top', align='' ) }}

CTA sẽ cách phần dưới cùng 32px và được đặt ở chính giữa theo chiều ngang. Nó có kích thước 120px x 36px.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstration of the CTA Button', caption='The CTA Button sits near the bottom', align='' ) }}

## Ảnh và video

Ảnh và video có trong một AMP Story Ad nên có tỷ lệ toàn màn hình tiêu chuẩn là 4:3. Các quảng cáo bao gồm video nên sử dụng một [áp phích](../../../documentation/components/reference/amp-video.md#poster). Kích thước khuyến nghị cho một ảnh áp phích là 720p (rộng 720px x cao 1280px) .

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### Ảnh

Các ảnh nền có thể được phóng tỷ lệ lên toàn màn hình. Đoạn mã CSS sau là một cách hiệu quả để cắt cúp và đặt video và ảnh vào chính giữa.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### Video

#### So sánh `<source>` và `src`

Khi quy định nguồn cho một [`amp-video`](../../../documentation/components/reference/amp-video.md)

Ví dụ: Quy định nhiều tập tin nguồn

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### Kích cỡ & Thời lượng của video

Để đảm bảo hiệu quả tối ưu, bạn nên cung cấp các video có dung lượng tối đa là 4 MB. Các tập tin có kích cỡ nhỏ hơn cho phép tải về nhanh hơn, vậy nên hãy đảm bảo mọi thứ đều nhỏ nhất có thể.

#### Định dạng video

Nếu bạn chỉ có thể cung cấp một định dạng video duy nhất, hãy cung cấp **MP4**. Tuy nhiên, nếu có thể, hãy sử dụng video **HLS** và quy định MP4 làm một phương án dự phòng cho các trình duyệt chưa hỗ trợ video HLS. HLS có tính năng bitrate phát sóng thích ứng, trong đó chất lượng của video có thể được sửa đổi để phù hợp với kết nối mạng của người dùng.

[tip type="note"] **LƯU Ý –** Định dạng video HLS không được hỗ trợ trong trình duyệt Chrome cho Máy tính để bàn (kể cả qua giả lập), vậy nên bạn cần quy định một phương án dự phòng MP4 cho mọi lưu lượng máy tính để bàn đến trang của mình. Để gỡ lỗi cho video HLS, bạn sẽ cần sử dụng một thiết bị di động thực tế thông qua USB-debugging. [/tip]

#### Độ phân giải video

Các video Câu chuyện Web luôn có chiều dọc, với tỷ lệ khung hình khuyến nghị là 16:9. Sử dụng độ phân giải khuyến nghị cho loại video phát sóng:

<table>
  <thead>
    <tr>
     <th>Loại video phát sóng</th>
     <th>Độ phân giải</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Không thích ứng</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Thích ứng</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **LƯU Ý –** Đối với các thiết bị di động có tỷ lệ khung hình khác 16:9, video có thể sẽ được cắt cúp theo chiều ngang hoặc chiều dọc để vừa với màn hiển thị. [/tip]

#### Video codec

1. Đối với MP4, hãy sử dụng `H.264`.
2. Đối với WEBM, hãy sử dụng `VP9`.
3. Đối với HLS hoặc DASH, hãy sử dụng `H.264`.

#### Chất lượng video

##### Tối ưu chuyển mã

Có nhiều công cụ mà bạn có thể sử dụng để mã hóa video và điều chỉnh chất lượng của video trong quá trình mã hóa. Đây là một vài ví dụ:

<table>
  <thead>
    <tr>
     <th>Công cụ</th>
     <th>Ghi chú</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>Thiết lập tối ưu được khuyến nghị:       <ul>         <li>Đối với MP4, sử dụng <code>-crf 23</code>.</li>         <li>Đối với WEBM, sử dụng <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>Thiết lập tối ưu được khuyến nghị:       <ul>         <li>Đối với MP4, sử dụng <code>-crf 23</code>.</li>         <li>Đối với WEBM, sử dụng <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>Một trình mã hóa có thể xuất định dạng HLS bao gồm danh sách phát.</td>
    </tr>
  </tbody>
</table>

##### Kích cỡ đoạn HLS

Đảm bảo các đoạn HLS có kích cỡ tối đa thông thường là 10 giây.

## Hình hoạt họa

Có một vài điều cần lưu ý về hình hoạt họa trong các câu chuyện, ví dụ như khái niệm về nội dung được "hiển thị". Ví dụ, trong chế độ xem "3 khung" của chúng tôi, quảng cáo của bạn có thể được hiển thị trên trang nhưng chưa phải là tiêu điểm. Điều này có thể là một vấn đề nếu hiệu ứng mong muốn là bắt đầu hoạt họa khi trang này trở thành tiêu điểm chính.

Để cải thiện, AMP sẽ thêm một thuộc tính đặc biệt `amp-story-visible` vào nội dung quảng cáo của bạn khi nó trở thành tiêu điểm trong mọi ngữ cảnh phục vụ. Bạn nên kích hoạt hình hoạt họa của mình dựa trên tín hiệu này.

Ví dụ: hình hoạt họa này sẽ kích hoạt khi trang trở thành tiêu điểm, và khởi động lại nếu người dùng nhấn vào một trang khác trong câu chuyện và quay lại.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## Câu chuyện được Tài trợ <a name="sponsored-story"></a>

Một Câu chuyện được Tài trợ sẽ xuất hiện dưới dạng một URL trên web, cho phép điều hướng lưu lượng người dùng đến Câu chuyện được Tài trợ từ nút kêu gọi hành động trên một AMP Story Ad. Một Câu chuyện được Tài trợ là một AMP Story, nhưng tập trung vào một trải nghiệm quảng cáo đắm chìm và mở rộng.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='CTA button directs to a Sponsored Story', caption='CTA button directs to a Sponsored Story', align='' ) }}

Đọc thêm về việc tạo ra một [Câu chuyện Web tại đây](../start/create_successful_stories.md).
