---
'$title': Biến website AMP của bạn thành một PWA
$order: 10
description: Bằng cách lưu vào bộ nhớ đệm những tài nguyên bên trong trình duyệt, PWA có thể cung ứng dữ liệu, tài sản và những trang ngoại tuyến để người dùng duy trì nối kết và trạng thái cập nhật với chúng.
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

Các Ứng dụng Web Lũy tiến tận dụng sức mạnh của [các service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) để làm phong phú nhiều khả năng xử lí ngoại tuyến và mang đến trải nghiệm nhất quán cho người dùng ở nhiều tín hiệu mạng khác nhau. Bằng cách lưu vào bộ nhớ đệm những tài nguyên bên trong trình duyệt, PWA có thể cung ứng dữ liệu, tài sản và những trang ngoại tuyến để người dùng duy trì nối kết và trạng thái cập nhật với chúng.

Hướng dẫn này sẽ chỉ bạn cách biến website AMP thành một PWA dễ cài đặt với nhiều chức năng ngoại tuyến bằng cách thêm vào một Web Manifest và một Service Worker được cung cấp bởi Service Worker AMP.

# Tải xuống và chạy đoạn mã khởi đầu

Tải xuống [đoạn mã khởi đầu ở đây](/static/files/tutorials/amptopwa.zip).

Sử dụng máy chủ web cục bộ để xem trước website.

[tip type="default"] **MẸO–** Đối với máy chủ web nhanh, hãy chạy dòng `python -m SimpleHTTPServer`. [/tip]

Bạn có thể xem được trang đích cho Lyrical Lightning, lễ hội Mobile Music Magic. Nó có một liên kết trên trang chủ để xem lịch diễn và tên sân khấu các ban nhạc sẽ trình diễn.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Người dùng của website chúng ta có thể có kết nối mạng bất ổn ở sự kiện lúc mà họ muốn truy cập lịch diễn. Do vậy đây là dịp tốt để biến nó thành một PWA vốn có thể cài đặt vào màn hình chính của người dùng và mang đến toàn bộ tính năng thiết yếu ngay cả khi ngoại tuyến.

# Tạo một Web App Manifest

[Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/) là một file JSON giản đơn cho trình duyệt biết về ứng dụng web của bạn và cách nó nên vận hành khi 'được cài đặt' trên thiết bị di động hay máy tính bàn của người dùng. Nhiều trình duyệt yêu cầu có một manifest để hiển thị [lời nhắc Thêm vào màn hình chính](https://developers.google.com/web/fundamentals/app-install-banners/).

Thêm một file có tiêu đề `manifest.json` vào kho lưu trữ của bạn với đoạn mã sau:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Thêm Service Worker AMP

Service worker là một đoạn mã mà trình duyệt chạy ngầm, tách biệt với một trang web, có chức năng mở rộng các tính năng của trình duyệt bằng cách lưu các yêu cầu vào bộ nhớ đệm nhằm cải thiện hiệu năng và mang đến chức năng xử lí ngoại tuyến. Xây dựng một service worker từ chỗ không có gì là điều khả dĩ nhưng tốn thời giờ. Những thư viện như Workbox là công cụ hữu ích, nhưng AMP còn đi thêm một bước nữa bằng cách cung ứng [Service Worker AMP](https://github.com/ampproject/amp-sw), trong đó AMP tự động hoá trực tiếp nhiều bước, bao gồm bước lưu bộ nhớ đệm đối với các Đoạn mã AMP, tài sản và tài liệu cũng như thực thi những phương cách vận hành tốt nhất thường thấy như [tải sẵn điều hướng](https://developers.google.com/web/updates/2017/02/navigation-preload).

Service Worker AMP tự động [lưu các kịch bản AMP](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) và [tài liệu vào bộ nhớ đệm](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) khi người dùng yêu cầu chúng, sau khi cài đặt nó. Ta sẽ bắt đầu bằng cách thêm vào Service Worker AMP cơ bản.

## Tạo tập tin service worker

Tạo một tập tin mang tên `sw.js` và thêm vào đoạn mã sau:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

Chỉ với hai dòng mã, đoạn này sẽ nhập Service Worker AMP vào Service Worker của bạn và khởi chạy nó.

## Tự động cài đặt service worker trên các trang AMP của bạn

Website AMP sử dụng thành phần [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) để cài đặt service worker ở dưới nền trình duyệt, trong khi người dùng đang tận hưởng phần nội dung.

Đặt thẻ đoạn mã bắt buộc ở đầu `index.html` và yếu tố `<amp-install-serviceworker>` bên trong `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Quan trọng–** Service worker cần được phục vụ từ thư mục gốc (`/sw.js`) để có thể lưu vào bộ nhớ đệm toàn bộ nội dung của website. [/tip]

`<amp-install-serviceworker>` cài đặt service worker bằng cách tạo một iframe và chạy tập tin `data-iframe-src`. Tạo tập tin `install-sw.html` và thêm vào mã sau:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

iframe đăng kí tập tin Service Worker AMP vào trong trình duyệt.

# Tuỳ chỉnh phần được lưu vào bộ nhớ đệm

Service Worker AMP đi kèm với những lợi ích tích hợp đồng thời cho phép các trường tuỳ chọn mà bạn có thể cấu hình nhằm tối ưu hoá trên cơ sở nhu cầu của ứng dụng.

Ứng dụng lễ hội âm nhạc của chúng ta sẽ lưu những tài sản hình ảnh vào bộ nhớ đệm, tìm nạp trước liên kết xếp hàng, và chỉ định một trang ngoại tuyến.

## Lưu tài sản vào bộ nhớ đệm

Bạn có thể cấu hình Service Worker AMP để [lưu tài sản vào bộ nhớ đệm](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching), chẳng hạn như các hình ảnh, video và phông chữ. Chúng ta sẽ dùng nó để lưu vào bộ nhớ đệm đối với hình ảnh nền và logo AMP. Mở tập tin `sw.js` và cập nhật mã bên dưới:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

Chúng ta đã chỉ định chiến lược lưu vào bộ nhớ đệm là [bộ nhớ đệm trước tiên](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). Nghĩa là ứng dụng sẽ tìm cách dùng hình ảnh từ bộ nhớ đệm trước tiên trước khi yêu cầu điều gì từ mạng. Cách này đặc biệt hữu dụng cho ứng dụng này do chúng ta sẽ không cập nhật ảnh nền hay logo AMP.

## Truy xuất sẵn các liên kết

Service Worker AMP truy xuất sẵn những liên kết vốn có thuộc tính `data-rel=prefetch`. Việc này cho phép người dùng xem các trang web khi ngoại tuyến cho dù họ chưa truy cập chúng. Chúng ta sẽ thêm thuộc tính này vào thẻ liên kết của chúng ta dành cho `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Hiển thị một trang ngoại tuyến

Để giải quyết những trường hợp bất ngờ hoặc những lần nhấp chuột vào liên kết dẫn đến những trang mà chúng ta không tìm nạp trước, ta sẽ thêm một trang ngoại tuyến để mang đến trải nghiệm nhất quán cho người dùng, vốn là điều "phản ánh đúng thương hiệu", ngược lại với việc hiển thị trang ngoại tuyến chung chung của trình duyệt . Tải xuống [`offline.html` ở đây](/static/files/tutorials/offline.zip) và cập nhật `sw.js` vào mã sau:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Thử nghiệm PWA

Bạn có thể kiểm tra rằng Service Worker AMP của mình đang lưu các tài sản cần thiết vào bộ nhớ đệm và cung ứng giải pháp ngoại tuyến lí tưởng qua [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

Ta sẽ thử nghiệm Lyrical Lyghtning bằng cách mở bảng điều khiển DevTools bằng tổ hợp phím `Ctrl + Shift + I` trên Windows hoặc `Cmd + Opt + I` trên Mac. Bạn cũng có thể nhấp chuột phải vào trang đó và chọn `inspect` từ menu. Sau đó chọn `Application` để xem phần đăng kí service worker .

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Nhấp vào hộp `offline` để chuyển sang chế độ ngoại tuyến. Nhấp vào liên kết `xem sắp xếp đầy đủ` và điều hướng đến `offline.html` để kiểm tra xem liệu chúng có được lưu đúng cách vào bộ nhớ đệm và có được truy xuất sẵn không.

[tip type="default"] **Mẹo –** Để có được phần phân tích thấu đáo cho các tính năng của một Ứng dụng Web Lũy tiến, hãy chạy [công cụ Lighthouse của Google](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) để tạo một bản báo cáo. [/tip]

# Chúc mừng!

Bạn đã tạo thành công một PWA bằng AMP! Trong phần hướng dẫn này, bạn đã học được cách:

- Tạo một [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)
- Cài đặt một Service Worker trong AMP bằng [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Tuỳ chỉnh [Service Worker AMP ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [Truy xuất sẵn các liên kết](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Tạo một trang ngoại tuyến

Đọc thêm về [Service Worker](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) và [những cân nhắc về UX ngoại tuyến](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Tìm hiểu cách [theo dõi sự tương tác bằng công cụ phân tích ](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html)và làm theo hướng dẫn về [cách cấu hình công cụ phân tích cơ bản cho trang AMP của bạn](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
