---
"$title": Tối ưu hoá các trang AMP được lưu trữ của bạn
"$order": '7'
description: The AMP runtime is optimized for speed and if your AMP pages are served by an AMP cache, they are fully optimized and offer the highest loading performance ...
formats:
- websites
- stories
author: sebastianbenz
---

Hướng dẫn này cung cấp mẹo và lời khuyên cho các webmaster về cách tối ưu hoá website AMP được lưu trữ của họ.

### Chẳng phải AMP mặc định đã nhanh rồi sao?

The AMP runtime is [optimized for speed](../../../about/how-amp-works.html) and if your AMP pages are served by an [AMP cache](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md), they are fully optimized and offer the highest loading performance. For example, if your users are coming to your AMP pages from Google Search on mobile, by default the pages are served by an AMP cache.

Tuy nhiên, các trang AMP không phải lúc nào cũng có một bộ nhớ đệm AMP phân phát. Một website có thể quyết định hiển thị các trang AMP từ chính máy chủ của chúng cho những nguồn lưu lượng truy cập khác. Trường hợp sử dụng thường xuyên nhất là những website được dựng hoàn toàn bằng AMP, chẳng hạn [tasty.co](https://tasty.co), tại đó những người dùng đến thẳng website. Nguồn lưu lượng truy cập khác là Twitter, vốn [bắt đầu liên kết với các trang AMP](https://searchengineland.com/twitter-ramps-amp-278300) thay vì truyền phiên bản di động tiêu chuẩn. Điều này nghĩa là nếu một người dùng nhấp vào một liên kết trong một ứng dụng di động của Twitter, liên kết đó sẽ đến phiên bản AMP của trang trên bản gốc của chính bạn (nếu bản đó khả dụng).

As a consequence, you can't always be sure that your AMP pages are only served from an AMP cache. For these cases, where you are serving AMP pages from your own servers, it is important to make sure that your AMP pages offer the optimal loading performance.

Các trang AMP mặc định đã có tốc độ tải nhanh rồi, nhưng có một số biện pháp tối ưu hoá hiệu năng khác mà bạn có thể thực thi để giúp trình duyệt tải trang AMP thậm chí nhanh hơn nữa. Hướng dẫn này miêu tả một vài tối ưu hoá bạn có thể xem xét khi phát hành các trang AMP. Tuy nhiên, trước khi bắt đầu đọc hướng dẫn này, hãy bảo đảm là bạn đã làm xong tất cả [những cách làm tốt nhất cho hiệu năng web cơ bản](#basic-optimizations). Đặc biệt là phần tối ưu hoá hình ảnh có tác động lớn lên hiệu năng tải.

For example, by applying the following optimization techniques:

- [Optimized AMP runtime loading](#optimize-the-amp-runtime-loading)
- [Tải sẵn hình ảnh anh hùng](#preload-hero-images) (bản thân kích cỡ/mã hoá hình ảnh không thay đổi)
- [Tối ưu hoá các phông chữ tùy chỉnh](#optimize-custom-fonts) (trong trường hợp này là các phông Google)

the ["The Scenic" template](../../../documentation/templates/index.html) loads [two seconds faster on a 3G connection](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

Nếu bạn muốn bỏ qua phần chi tiết, hãy xem thử [trình tạo Code soạn sẵn AMP](/boilerplate), cái mà bạn có thể dùng để tạo các trang AMP tùy chỉnh được tối ưu hoá.

### Optimize the AMP Runtime loading <a name="optimize-the-amp-runtime-loading"></a>

Mặc dù AMP khá hạn chế về việc đánh dấu nào được dùng trong phần `<head>`, nhưng vẫn còn chỗ cho tối ưu hoá. Chìa khoá ở đây là cấu trúc phần `<head>` theo cách nào đó sao cho tất cả các đoạn mã chặn kết xuất và các phông chữ tuỳ chỉnh tải càng nhanh càng tốt.

Here is the recommended order for the `<head>` section in an AMP page:

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

Let's go through it step-by-step:

1. Thẻ đầu tiên nên là thẻ `meta charset`, tiếp theo sau là bất kì thẻ `meta` nào còn lại.

2. Tiếp theo, tải trước thẻ `v0.js` `<script>` của thời gian chạy AMP với with `<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>`. Thời gian chạy AMP có thể bắt đầu tải xuống càng nhanh càng tốt vì [code soạn sẵn AMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) ẩn tài liệu thông qua `body { visibility:hidden }` cho đến khi thời gian chạy AMP đã tải. Tác vụ tải trước thời gian chạy AMP sẽ bảo trình duyệt tải xuống đoạn mã này với mức ưu tiên cao hơn. Hãy nhìn vào [server-side-rendering](#server-side-rendering) để tìm hiểu cách tránh điều này. {amp-img6} {/amp-img6}

3. [sourcecode:html]<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-custom-css-0.1.js"><link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"><link as="script" rel="preload" href="https://cdn.ampproject.org/v0/story-1.0.js">[/sourcecode]

4. Sử dụng [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) để tăng tốc kết nối đến nguồn gốc khác khi không biết trước URL tài nguyên đầy đủ, ví dụ, khi sử dụng Google Fonts:

    [sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

5. [sourcecode:html]<script async src="https://cdn.ampproject.org/v0.js"></script>[/sourcecode]

6. Quy định thẻ `<script>` cho các [phần mở rộng làm trễ render](https://github.com/ampproject/amphtml/blob/master/src/render-delaying-services.js) (ví dụ, [`amp-experiment`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md) và [`amp-story`](../../../documentation/components/reference/amp-story.md)

7. Quy định thẻ `<script>` cho phần mở rộng còn lại (ví dụ, [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ...). Các phần mở rộng này không làm chậm việc render và do đó không cần được tải sẵn bởi chúng có thể tiêu tốn băng thông quan trọng cho lần render đầu tiên.

8. Quy định mọi phong cách tùy chỉnh bằng thẻ `<style amp-custom>`.

9. Thêm mọi thẻ khác được cho phép trong phần `<head>`. Cụ thể, mọi phông chữ bên ngoài đều nên được tải cuối cùng bởi chúng sẽ chặn việc render.

10. Cuối cùng, quy định [code soạn sẵn AMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md). Bằng cách đặt code soạn sẵn ở cuối cùng, nó sẽ ngăn mọi phong cách tùy chỉnh khỏi việc ghi đè lên quy tắc css cho code soạn sẵn.

[tip] The AMP Cache performs all these optimizations automatically (and a few more). You can use the AMP Optimizer tool to automatically perform these optimizations on your own origin. [/tip]

### Tải sẵn hình ảnh anh hùng <a name="preload-hero-images"></a>

[AMP HTML uses its own image element: `amp-img`](../../../documentation/components/reference/amp-img.md). While [`amp-img`](../../../documentation/components/reference/amp-img.md) has many advantages over the traditional HTML `img` tag, one disadvantage is that the AMP runtime must be loaded before the image download can start. For some images, such as hero images for a product page, it's critical that the images load as quickly as possible. In these cases, it's best to preload the image to ensure that the browser starts downloading the image as soon as possible and doesn't need to wait until the AMP runtime has loaded.

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

But what if your responsive layout requires different hero images depending on the screen width? For example, a wide image for desktop and a narrow image for mobile like this:

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

Điều tốt ở đây là `link rel=preload` cũng hỗ trợ truy vấn đa phương tiện. Nên ta có thể dùng cùng những truy vấn đa phương tiện trong tuyên bố tải sẵn của mình, như thế này:

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

By the way, the same approach works for [`amp-video`](../../../documentation/components/reference/amp-video.md) poster images:

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

Hãy bảo đảm là bạn đặt lệnh tải sẵn *đằng sau* khai báo màn hiển thị bởi vì trình duyệt cần các kích thước màn hiển thị để xác định độ rộng màn hình:

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] Chỉ tải sẵn những hình thiết yếu, bằng không việc tải xuống hình có thể ngốn băng thông cần thiết cho những tác vụ tải xuống thiết yếu khác. [/tip]

### Xem xét sử dụng một service worker

Giờ đây tất cả [những trình duyệt lớn đều hỗ trợ service worker](https://caniuse.com/#feat=serviceworkers), nên đó là ý hay khi đánh giá liệu việc thêm service worker vào website của bạn có phải là điều có ý nghĩa không.

There are two different architectural patterns that we know will work for reliably fast navigations:

- Đối với những dụng một trang: mô hình Vỏ Ứng dụng (trong ngữ cảnh AMP được sử dụng như [AMP trong PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)). Mẫu hình này cần một service worker để nâng cấp một tài liệu AMP thành trải nghiệm PWA dựa trên vỏ ứng dụng.
- Đối với những ứng dụng nhiều trang: [truyền phát những nguồn tổng hợp](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). Một service worker lưu phần header và footer tĩnh trong bộ nhớ đệm và sử dụng chức năng truyền phát để lập tức trả về một phần phản hồi có trong bộ nhớ đệm trong lúc tải nội dung.

Nếu không cái nào trong số những mẫu hình này được dùng và không thể lưu bộ nhớ đệm đối với toàn bộ website (vốn chỉ hợp lí đối với những website rất nhỏ), service worker có thể có [tác động tiêu cực về mặt hiệu năng](https://developers.google.com/web/updates/2017/02/navigation-preload). Điều tốt nhất trong trường hợp này là **không** dùng service worker.

Tuy nhiên, nếu bạn muốn website mình [có thể cài đặt được từ màn hình chính](https://developers.google.com/web/fundamentals/app-install-banners/), hoặc muốn mang đến trải nghiệm ngoại tuyến, bạn sẽ cần phải dùng một service worker. Trong trường hợp này, quan trọng là dùng [tải sẵn điều hướng](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) để giảm bớt mức độ chậm trễ tiềm năng (lưu ý: hiện tại, tính năng tải sẵn điều hướng chỉ được hỗ trợ trong Chrome).

Nếu website AMP của bạn dùng một service worker, đây là một số biện pháp thực hành tiên tiến nhất:

- Lưu sẵn vào bộ nhớ đệm đối với [thời gian chạy AMP](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) và những phần mở rộng (như [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Lưu sẵn vào bộ nhớ đệm đối với logo, phông chữ và nội dung tĩnh khác vốn được dùng trên hầu hết các trang.
- Phục vụ logo, phông chữ và hình ảnh bằng cách dùng [chiến lược bộ nhớ đệm trước tiên](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- Serve the AMP runtime and extensions by using a [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) strategy.
- Khi dùng chiến lược mạng-trước-tiên cho những yêu cầu điều hướng, hãy bảo đảm là bạn đã kích hoạt [tải sẵn điều hướng](https://developers.google.com/web/updates/2017/02/navigation-preload).

Nếu bạn đang tìm cách bắt đầu với một service worker trong website AMP, hãy xem thử [mẫu](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) này, vốn cung ứng một service worker để thực thi tất cả những biện pháp thực hành tiên tiến nhất này.

[tip type="note"] Thời gian chạy AMP được phục vụ với thời gian tối đa chỉ 50 phút để bảo đảm có được các cập nhật thật nhanh chóng. Để tránh việc có thể bộ nhớ đệm trình duyệt bỏ lỡ, ta nên phân phát thời gian chạy AMP từ một service worker. [/tip]

Lưu sẵn vào bộ nhớ đệm không chỉ phù hợp cho việc chuyển tiếp từ các trang AMP trong bộ nhớ đệm sang các trang không phải AMP từ nguồn gốc của bạn, nhưng còn phù hợp cho việc chuyển tiếp từ các trang AMP trong bộ nhớ đệm sang các trang AMP trên nguồn gốc của bạn. Lí do là bộ nhớ đệm AMP ghi lại các URL thời gian chạy AMP từ URL trường tồn sang phiên bản phát hành mới nhất, ví dụ:

`https://cdn.ampproject.org/v0.js` -> `https://cdn.ampproject.org/rtv/001515617716922/v0.js`.

Hệ quả là một trang AMP được phục vụ từ nguồn gốc của bạn không hưởng lợi từ việc lưu bộ nhớ đệm của trình duyệt và trong trường hợp này phải tải xuống lại thời gian chạy AMP (chưa phân phiên bản nào). Với một service worker, bạn có thể lưu sẵn thời gian chạy AMP chưa phân phiên bản nào vào bộ nhớ đệm và tăng tốc quá trình chuyển tiếp. Để tìm hiểu thêm về lí do bộ nhớ đệm AMP phân thành phiên bản đối với các URL thời gian chạy AMP, hãy đọc [tài liệu này](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime).

[tip type="note"] Trong Safari, có một khác biệt then chốt về cách thực thi các service worker - trong Safari ta không thể cài đặt một service worker cho phần gốc của bạn, nếu trang đó được phân phát từ một bộ nhớ đệm AMP. [/tip]

### Tối ưu hoá các phông chữ tùy chỉnh <a name="optimize-custom-fonts"></a>

Với AMP, có vài thứ bạn có thể làm để tối ưu hoá việc tải phông chữ ([phần lớn chúng không thực sự chuyên biệt đối với AMP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- Nếu được, hãy dùng [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): Cái này sẽ chỉ dùng phông chữ nếu nó đã ở trong bộ nhớ đệm, và quay ngược lại về phông chữ hệ thống nếu phông chữ tùy chỉnh của bạn chưa được tải.
- Tối ưu hoá các phông chữ web của bạn (ví dụ như phục vụ các phông chữ tùy chỉnh bằng WOFF2).

[sourcecode:html]
<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- If you are using Google fonts, or any other font provider with unknown font URLs, preconnect the respective font server: PLACEHOLDER_START10PLACEHOLDER_END

Cuối cùng, nhưng không kém phần quan trọng là việc cố gắng giảm thiểu số phông chữ tùy chỉnh mà bạn dùng trên trang của mình. Nếu được, hãy dùng các phông chữ hệ thống thay vì phông chữ tùy chỉnh vì phông chữ hệ thống làm cho website khớp với hệ điều hành của người dùng, và nó giúp tránh việc tải thêm nhiều tài nguyên.

### Server-Side Rendering AMP Layouts <a name="server-side-rendering"></a>

Render phía máy chủ đối với các bố cục AMP là một kĩ thuật mà bộ nhớ đệm AMP dùng để tăng tốc hơn nữa thời gian tải. Với tác vụ render phía máy chủ, ta có thể xoá bỏ code soạn sẵn AMP sao cho tài liệu AMP có thể được xuất ra mà không cần chạy JavaScript thời gian chạy AMP. Ví dụ: phiên bản được render phía máy chủ của Trình tạo Code soạn sẵn AMP [render nhanh gấp hai lần](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) so với phiên bản AMP bình thường!

If you're publishing an AMP page, you should definitely consider using [AMP Optimizer](amp-optimizer-guide/index.md). AMP Optimizers let you serve optimized AMP pages from your own backend which includes server-side rendering AMP layouts. AMP Optimizer also automatically performs many other optimizations described in this document.

### Basic optimizations <a name="basic-optimizations"></a>

Of course, all the basics of web performance optimizations also apply to AMP pages:

- [Optimize images](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) and videos. Image optimization can have a massive impact on loading performance.
- [Compress and minify CSS & HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). Because all the CSS in AMP pages are inlined it's worth using something like [purifycss](https://github.com/purifycss/purifycss) to strip out unused CSS.
- Use [HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ... and more
