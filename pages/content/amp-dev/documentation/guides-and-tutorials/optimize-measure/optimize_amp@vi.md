---
"$title": Tối ưu hoá các trang AMP được lưu trữ của bạn
"$order": '7'
description: Thời gian chạy AMP được tối ưu hoá cho tốc độ và nếu các trang AMP được một bộ nhớ đệm AMP phân phát, chúng sẽ được tối ưu hoá hoàn toàn và mang đến hiệu năng tải cao nhất...
formats:
- websites
- stories
author: sebastianbenz
---

Hướng dẫn này cung cấp mẹo và lời khuyên cho các webmaster về cách tối ưu hoá website AMP được lưu trữ của họ.

### Chẳng phải AMP mặc định đã nhanh rồi sao?

Thời gian chạy AMP được [tối ưu hoá cho tốc độ](../../../about/how-amp-works.html) và nếu các trang AMP pages được một [bộ nhớ đệm AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) phân phát, chúng sẽ được tối ưu hoá hoàn toàn và mang đến hiệu năng tải cao nhất. Ví dụ nếu người dùng từ Google Tìm kiếm trên di động đến các trang AMP của bạn, theo mặc định những trang này được một bộ nhớ đệm AMP phân phát.

Tuy nhiên, các trang AMP không phải lúc nào cũng có một bộ nhớ đệm AMP phân phát. Một website có thể quyết định hiển thị các trang AMP từ chính máy chủ của chúng cho những nguồn lưu lượng truy cập khác. Trường hợp sử dụng thường xuyên nhất là những website được dựng hoàn toàn bằng AMP, chẳng hạn [tasty.co](https://tasty.co), tại đó những người dùng đến thẳng website. Nguồn lưu lượng truy cập khác là Twitter, vốn [bắt đầu liên kết với các trang AMP](https://searchengineland.com/twitter-ramps-amp-278300) thay vì truyền phiên bản di động tiêu chuẩn. Điều này nghĩa là nếu một người dùng nhấp vào một liên kết trong một ứng dụng di động của Twitter, liên kết đó sẽ đến phiên bản AMP của trang trên bản gốc của chính bạn (nếu bản đó khả dụng).

Hệ quả là bạn không thể lúc nào cũng bảo đảm được rằng các trang AMP chỉ được phân phát từ một bộ nhớ đệm AMP. Trong những trường hợp này, tại chỗ bạn đang phân phát các trang AMP từ chính máy chủ của mình, điều quan trọng là chắc chắn rằng các trang AMP cung ứng được hiệu năng tải tối ưu.

Các trang AMP mặc định đã có tốc độ tải nhanh rồi, nhưng có một số biện pháp tối ưu hoá hiệu năng khác mà bạn có thể thực thi để giúp trình duyệt tải trang AMP thậm chí nhanh hơn nữa. Hướng dẫn này miêu tả một vài tối ưu hoá bạn có thể xem xét khi phát hành các trang AMP. Tuy nhiên, trước khi bắt đầu đọc hướng dẫn này, hãy bảo đảm là bạn đã làm xong tất cả [những cách làm tốt nhất cho hiệu năng web cơ bản](#basic-optimizations). Đặc biệt là phần tối ưu hoá hình ảnh có tác động lớn lên hiệu năng tải.

Chẳng hạn như bằng cách áp dụng các kĩ thuật tối ưu hoá sau:

- [Tối ưu hoá thời gian chạy AMP đã tải ](#optimize-the-amp-runtime-loading)
- [Tải sẵn hình ảnh anh hùng](#preload-hero-images) (bản thân kích cỡ/mã hoá hình ảnh không thay đổi)
- [Tối ưu hoá các phông chữ tùy chỉnh](#optimize-custom-fonts) (trong trường hợp này là các phông Google)

[Khuôn mẫu "The Scenic"](../../../documentation/templates/index.html) tải [nhanh hơn hai giây bằng kết nối 3G](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

Nếu bạn muốn bỏ qua phần chi tiết, hãy xem thử [trình tạo Code soạn sẵn AMP](/boilerplate), cái mà bạn có thể dùng để tạo các trang AMP tùy chỉnh được tối ưu hoá.

### Tối ưu hoá thời gian chạy AMP đã tải <a name="optimize-the-amp-runtime-loading"></a>

Mặc dù AMP khá hạn chế về việc đánh dấu nào được dùng trong phần `<head>`, nhưng vẫn còn chỗ cho tối ưu hoá. Chìa khoá ở đây là cấu trúc phần `<head>` theo cách nào đó sao cho tất cả các đoạn mã chặn kết xuất và các phông chữ tuỳ chỉnh tải càng nhanh càng tốt.

Đây là trật tự đề xuất cho phần `<head>` trong một trang AMP:

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

Ta hãy xét kĩ đoạn mã này theo từng bước:

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

[tip] Bộ nhớ đệm AMP tự động thực hiện tất cả những tối ưu hoá này (và vài cái khác). Bạn có thể dùng công cụ Tối ưu hoá AMP để tự động thực hiện những tối ưu hoá này ở phần gốc của bạn. [/tip]

### Tải sẵn hình ảnh anh hùng <a name="preload-hero-images"></a>

[HTML AMP sử dụng yếu tố hình ảnh của chính nó: `amp-img`](../../../documentation/components/reference/amp-img.md). Mặc dù [`amp-img`](../../../documentation/components/reference/amp-img.md) có nhiều điểm lợi so với thẻ `img` HTML truyền thống, những một điểm bất lợi là thời gian chạy AMP cần phải được tải trước khi có thể bắt đầu tải xuống hình ảnh. Đối với một số hình ảnh, chẳng hạn như những hình ảnh anh hùng đối với một trang sản phẩm, điều trọng yếu là hình ảnh tải càng nhanh càng tốt. Trong những trường hợp này, tốt nhất nên tải trước hình ảnh để bảo đảm rằng trình duyệt bắt đầu tải xuống hình ảnh càng sớm càng tốt và không cần phải chờ đến khi thời gian chạy AMP đã tải.

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

Nhưng nếu như bố cục tương tác của bạn cần đến hai hình ảnh anh hùng khác nhau tuỳ vào độ rộng màn hình? Ví dụ, một hình rộng cho máy tính bàn và hình hẹp cho thiết bị di động như thế này:

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

Nhân tiện, cùng phương cách đó cũng hiệu quả cho hình ảnh poster [`amp-video`](../../../documentation/components/reference/amp-video.md):

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

Có hai mẫu hình kiến trúc khác nhau mà ta biết sẽ hoạt động hiệu quả cho những điều hướng nhanh một cách đáng tin cậy:

- Đối với những dụng một trang: mô hình Vỏ Ứng dụng (trong ngữ cảnh AMP được sử dụng như [AMP trong PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)). Mẫu hình này cần một service worker để nâng cấp một tài liệu AMP thành trải nghiệm PWA dựa trên vỏ ứng dụng.
- Đối với những ứng dụng nhiều trang: [truyền phát những nguồn tổng hợp](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). Một service worker lưu phần header và footer tĩnh trong bộ nhớ đệm và sử dụng chức năng truyền phát để lập tức trả về một phần phản hồi có trong bộ nhớ đệm trong lúc tải nội dung.

Nếu không cái nào trong số những mẫu hình này được dùng và không thể lưu bộ nhớ đệm đối với toàn bộ website (vốn chỉ hợp lí đối với những website rất nhỏ), service worker có thể có [tác động tiêu cực về mặt hiệu năng](https://developers.google.com/web/updates/2017/02/navigation-preload). Điều tốt nhất trong trường hợp này là **không** dùng service worker.

Tuy nhiên, nếu bạn muốn website mình [có thể cài đặt được từ màn hình chính](https://developers.google.com/web/fundamentals/app-install-banners/), hoặc muốn mang đến trải nghiệm ngoại tuyến, bạn sẽ cần phải dùng một service worker. Trong trường hợp này, quan trọng là dùng [tải sẵn điều hướng](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) để giảm bớt mức độ chậm trễ tiềm năng (lưu ý: hiện tại, tính năng tải sẵn điều hướng chỉ được hỗ trợ trong Chrome).

Nếu website AMP của bạn dùng một service worker, đây là một số biện pháp thực hành tiên tiến nhất:

- Lưu sẵn vào bộ nhớ đệm đối với [thời gian chạy AMP](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) và những phần mở rộng (như [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Lưu sẵn vào bộ nhớ đệm đối với logo, phông chữ và nội dung tĩnh khác vốn được dùng trên hầu hết các trang.
- Phục vụ logo, phông chữ và hình ảnh bằng cách dùng [chiến lược bộ nhớ đệm trước tiên](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- Phục vụ thời gian chạy AMP và các phần mở rộng bằng cách dùng chiến lược [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate).
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

- Nếu bạn đang sử dụng Google Fonts hoặc bất kỳ nhà cung cấp phông chữ nào khác có URL phông chữ không xác định, hãy kết nối sẵn với máy chủ phông chữ tương ứng: PLACEHOLDER_START10PLACEHOLDER_END

Cuối cùng, nhưng không kém phần quan trọng là việc cố gắng giảm thiểu số phông chữ tùy chỉnh mà bạn dùng trên trang của mình. Nếu được, hãy dùng các phông chữ hệ thống thay vì phông chữ tùy chỉnh vì phông chữ hệ thống làm cho website khớp với hệ điều hành của người dùng, và nó giúp tránh việc tải thêm nhiều tài nguyên.

### Render phía máy chủ đối với các bố cục AMP <a name="server-side-rendering"></a>

Render phía máy chủ đối với các bố cục AMP là một kĩ thuật mà bộ nhớ đệm AMP dùng để tăng tốc hơn nữa thời gian tải. Với tác vụ render phía máy chủ, ta có thể xoá bỏ code soạn sẵn AMP sao cho tài liệu AMP có thể được xuất ra mà không cần chạy JavaScript thời gian chạy AMP. Ví dụ: phiên bản được render phía máy chủ của Trình tạo Code soạn sẵn AMP [render nhanh gấp hai lần](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) so với phiên bản AMP bình thường!

Nếu bạn phát hành một trang AMP, bạn chắc chắn nên xem xét việc dùng đến [Tối ưu hoá AMP](amp-optimizer-guide/index.md). Tối ưu hoá AMP cho phép bạn phân phát những trang AMP được tối ưu hoá từ backend vốn bao gồm việc render phía máy chủ đối với các bố cục AMP. Tối ưu hoá AMP còn tự động thực hiện những tác vụ tối ưu hoá khác được miêu tả trong tài liệu này.

### Những tác vụ tối ưu hoá cơ bản <a name="basic-optimizations"></a>

Dĩ nhiên, tất cả những điểm cơ bản của tác vụ tối ưu hoá hiệu năng web đều áp dụng được cho các trang AMP:

- [Tối ưu hoá hình ảnh](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) và video. Tối ưu hoá hình ảnh có thể có tác động lớn lên hiệu năng tải.
- [Nén và giảm thiểu CSS & HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). Vì toàn bộ CSS trong các trang AMP đều dạng nội tuyến, nên cũng đáng dùng một cái như [purifycss](https://github.com/purifycss/purifycss) để loại bỏ những CSS không dùng đến.
- Sử dụng [HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ...và nhiều cái khác
