---
'$title': Chi tiết kỹ thuật của Câu chuyện Web
$order: 1
description: Chi tiết kỹ thuật của Câu chuyện Web
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

Hướng dẫn này giải thích mọi chi tiết kỹ thuật và biện pháp thực hành tiên tiến nhất mà bạn cần biết để tạo nên các Câu chuyện Web với AMP.

## AMP Hợp lệ

Một Câu chuyện Web về mặt kỹ thuật là một trang web đơn lẻ được xây dựng với AMP và tuân thủ các thông số của AMP:

- Bắt đầu với loại tài liệu `<!doctype html>`.
- Chứa một thẻ `<html ⚡>` hoặc `<html amp>` cấp cao nhất.
- Chứa thẻ `<head>` và `<body>`.
- Chứa một thẻ `<meta charset="utf-8">` như con đầu tiên của thẻ `<head>`.
- Chứa một thẻ `<script async src="https://cdn.ampproject.org/v0.js"></script>` trong thẻ `<head>`. Theo biện pháp thực hành tiên tiến nhất, bạn nên bao gồm kịch bản này càng sớm càng tốt trong `<head>` (đầu đề).
- Chứa một thẻ `<link rel="canonical" href="page/url">` trong phần `<head>` (đầu đề), với href chỉ đến URL Câu chuyện Web.
- Chứa một thẻ `<meta name="viewport" content="width=device-width">` trong thẻ `<head>` (đầu đề). Bạn cũng nên bao gồm initial-scale=1.
- Chứa một [code soạn sẵn AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) trong thẻ `<head>`.

Khác biệt giữa một trang web AMP và một Câu chuyện Web được xây dựng với AMP là thành phần [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories). Nó là con trực tiếp duy nhất của phần `<body>` (thân) tài liệu và phải chứa thuộc tính `standalone` (độc lập). Tất cả các trang, lớp và yếu tố của Câu chuyện Web đều được định nghĩa trong các thẻ `<amp-story>`.

```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
    ></script>
    <style amp-custom>
      ...;
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="assets/cover.jpg"
    >
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="assets/cover.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="assets/cat.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

Làm theo [Bài thực hành tạo Câu chuyện Web đầu tiên](../start/visual_story/?format=stories) và [đọc tài liệu tham khảo về amp-story](../../components/reference/amp-story/?format=stories) để biết thêm.

## Hiệu năng đỉnh và trải nghiệm người dùng

Người dùng có thể xem các Câu chuyện Web ở các khu vực có kết nối mạng chậm hoặc trên các thiết bị cũ. Đảm bảo họ có một trải nghiệm tốt bằng cách tuân thủ các biện pháp thực hành tiên tiến nhất này.

### Màu nền

Quy định màu nền cho mỗi trang Câu chuyện Web. Việc có một màu nền là một phương án dự phòng tốt nếu điều kiện của người dùng ngăn họ tải về các tài sản ảnh hoặc video. Chọn một màu đại diện cho tông màu chính của tài sản nền dự kiến của trang, hoặc sử dụng một chủ đề màu thống nhất cho tất cả các trang câu chuyện. Đảm bảo màu nền khác với văn bản để cho dễ đọc.

Định nghĩa màu nền cho các trang trong thẻ `<style amp-custom>` trong phần head (đầu đề) của tài liệu Câu chuyện Web hoặc inline trên thành phần [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories).

### Phân lớp cho các yếu tố

Đầu đề hệ thống chứa các nút điều khiển như biểu tượng tắt tiếng và chia sẻ. Nó xuất hiện ở chỉ số z cao hơn so với ảnh nền và video. Đảm bảo không có thông tin thiết yếu nào bị các biểu tượng này che mất.

### Tỷ lệ khung hình

Thiết kế các tài sản Câu chuyện Web ở tỷ lệ khung hình 9:16. Bởi chiều cao và chiều rộng của trang thay đổi trên các trình duyệt và thiết bị, đừng đặt các nội dung thiết yếu ở gần lề trang.

### Ảnh poster

Một ảnh poster được hiển thị cho người dùng trong khi video đang được tải về. Ảnh poster này nên đại diện cho nội dung video để cho phép chuyển tiếp mượt hơn. Quy định một ảnh poster bằng cách bổ sung thuộc tính `poster` cho yếu tố amp-video của bạn và chỉ nó đến vị trí của ảnh.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Video

Tất cả video đều phải được thêm thông qua [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories).

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### Độ phân giải và chất lượng

Mã hóa các video để điều chỉnh chất lượng cho các biện pháp tối ưu khuyến nghị sau:

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

Cố gắng duy trì thời lượng các phân khúc HLS ngắn hơn 10 giây.

### Định dạng và kích cỡ

Giữ các video nhỏ hơn 4MB để đảm bảo hiệu năng tối ưu. Cân nhắc việc chia nhỏ các video lớn thành nhiều trang khác nhau.

Nếu bạn chỉ có thể cung cấp một định dạng video duy nhất, hãy cung cấp MP4. Nếu có thể, hãy sử dụng video HLS và quy định MP4 làm một phương án dự phòng để đảm bảo độ tương thích cho trình duyệt. Sử dụng video codec sau:

<table>
  <tr>
   <td>MP4, HLS và DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### <source> so với src</source>

Sử dụng yếu tố con `<source>` (nguồn) trong thành phần `<amp-video>` để quy định nguồn video thay cho thuộc tính `src`. Việc sử dụng yếu tố `<source>` cho phép bạn quy định loại video và bổ sung các nguồn video dự phòng. Bạn phải sử dụng thuộc tính `type` (loại) để quy định loại MIME. Sử dụng `application/x-mpegurl` hoặc `application/vnd.apple.mpegurl` cho các video HLS. Đối với tất cả các loại video khác, sử dụng tiền tố MIME `video/` và theo sau là định dạng video, ví dụ như `”video/mp4”`.

```html
<amp-video
  id="video-page1"
  autoplay
  loop
  layout="fill"
  poster="https://example.com/media/poster.jpg"
>
  <source
    src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl"
  />
  <source src="https://amp-example.com/media/movie.mp4" type="video/mp4" />
</amp-video>
```

### Tự động chuyển tiếp sau video

Thuộc tính [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) được hiển thị bởi amp-story-page quy định liệu và khi nào thì một trang câu chuyện nên chuyển tiếp mà không cần người dùng tương tác. Để chuyển tiếp sau một video, hãy chỉ thuộc tính đến ID video.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## Trải nghiệm trên máy tính để bàn

Định dạng Câu chuyện Web hỗ trợ một [trải nghiệm không bắt buộc trên máy tính để bàn](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). Nó thay đổi trải nghiệm máy tính để bàn thành một chế độ in tràn mép đắm chìm, thay thế trải nghiệm 3 màn hình dọc mặc định và cho phép người dùng di động xem câu chuyện đó khi thiết bị của họ được cầm ngang.

Đăng ký hỗ trợ máy tính để bàn bằng cách thêm thuộc tính `supports-landscape` vào thành phần `<amp-story>`.

```html
<amp-story
  standalone
  supports-landscape
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
</amp-story>
```
