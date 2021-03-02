---
'$title': Danh mục kiểm tra cho việc phát hành AMP
$order: 0
description: Thiết kế web thích nghi xoay quanh việc lập những trang web linh động đáp ứng được các nhu cầu của người dùng - những trang hợp với kích cỡ và định hướng màn hình trên thiết bị người dùng. Bạn có thể đạt được...
formats:
  - websites
author: CrystalOnScript
contributors:
  - sebastianbenz
---

Làm theo danh mục kiểm tra này để mang đến trải nghiệm AMP đầy đủ nhất cho website của bạn!

# Đảm bảo việc Xác thực Thông số AMP

AMP đi kèm nhiều lợi ích tích hợp, chẳng hạn giảm thời gian chờ của người dùng bằng cách tải trước nội dung từ Bộ nhớ đệm AMP. Để có được những lợi ích này, các trang cần phải là tài liệu AMP hợp lệ. Các trang được phát hành có lỗi nằm trong báo cáo của trình xác thực AMP sẽ không được Bộ nhớ đệm AMP lập chỉ mục, và có thể được phục vụ ở dạng trang lỗi.

Không bao giờ phát hành một trang AMP không hợp lệ bằng cách dùng những công cụ này:

- [Xác thực các trang AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [Trình xác thực AMP ](https://validator.ampproject.org/)
- [Google AMP Tester](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [Các công cụ AMP](../../../documentation/tools.html?format=websites)

# Cấp quyền truy cập máy chủ cho các trang AMP có trong bộ nhớ đệm

Tin tốt đây, những trang AMP hợp lệ tự động được đưa vào tất cả những Bộ nhớ đệm AMP hiện có! Điều này nghĩa là người dùng trải nghiệm được nội dung được tải hiệu quả và an toàn. Những loại tối ưu hoá này thì tuyệt, nhưng đi kèm một rắc rối nhỏ. Một số người dùng sẽ được phân phát các trang AMP từ tên miền không khớp với tên miền của chính bạn. Điều này có thể khiến các trang mất quyền truy cập dữ liệu website khi dùng các thành phần AMP động chẳng hạn như [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) hay [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). Những lỗi loại này là vấn đề Chia sẻ tài nguyên giữa các nguồn gốc, hay CORS. Làm việc kèm theo sự an toàn, chứ không phải chống lại nó, bằng cách bật Yêu cầu CORS từ tất cả [Bộ nhớ đệm AMP](https://cdn.ampproject.org/caches.json) khả dụng! Nếu bạn đang dùng Node.js ở phần backend, bạn có thể dùng [phần mềm trung gian amp-cors](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Tìm hiểu thêm về việc cấp quyền truy cập máy chủ:

- [Cách các Trang AMP được lưu vào bộ nhớ đệm ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS trong AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [Phần mềm trung gian AMP CORS](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) cho Node.js

# Nội dung an toàn và có thể chia sẻ với trao đổi nội dung đã kí danh

Duy trì URL của tên miền và đơn giản hoá công cụ phân tích khi chia sẻ nội dung qua những trao đổi nội dung đã kí danh (SXG). Bằng việc phân phát các trang AMP với SXG, những chữ kí số sẽ bảo vệ thông tin của bạn bằng cách ràng buộc tài liệu với URL được khẳng định của nó. Hành vi này sẽ xem những phiên của người dùng và những cookie là bên thứ nhất, khép lại các khoảng hổng phân tích khả dĩ. Việc thực thi SXG sẽ phát nội dung AMP được kí danh bổ sung cho, chứ không phải thay thế, phần nội dung AMP thông thường.

Tìm hiểu thêm về việc thực thi những trao đổi nội dung được kí danh:

- [Phân phát AMP bằng những trao đổi nội dung được kí danh](signed-exchange.md?format=websites)
- [Trao đổi HTTP được kí danh](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [URL thật của AMP từ Cloudflare](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Trao đổi nội dung được kí danh để có những URL AMP tốt hơn và công cụ phân tích dễ dàng hơn (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Thử nghiệm những trang được lưu vào bộ nhớ đệm

Bộ nhớ đệm AMP lưu trữ hình ảnh, phông chữ và nội dung trang để phân phát cho người dùng nội dung của bạn ngay khi họ muốn. Cho nên điều quan trọng là kiểm tra xem các trang AMP có diện mạo và cách vận hành như mong đợi không khi được phân phát từ một Bộ nhớ đệm AMP.

Khi thêm các trang AMP vào Bộ nhớ đệm AMP, hãy kiểm tra với [các công cụ nhà phát triển của trình duyệt](https://developers.google.com/web/tools/chrome-devtools/) xem tất cả các tài nguyên bên ngoài có thể tải được không. Đây là danh sách cần ghi nhớ:

- hình ảnh
- video
- điểm cuối amp-analytics
- điểm cuối amp-pixel
- phông chữ tùy chỉnh
- iframe

Tìm hiểu thêm về bộ nhớ đệm AMP:

- [Dùng Bộ nhớ đệm AMP của Google](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP trên Google, Bộ nhớ đệm AMP của Google](https://developers.google.com/amp/cache/overview)
- [Gỡ lỗi về các vấn đề của Bộ nhớ đệm AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [Định dạng URL của Bộ nhớ đệm AMP và xử lí yêu cầu ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Quảng bá những tập tin AMP của bạn cho các công cụ tìm kiếm

Những trang chỉ dựng bằng AMP (AMP trước tiên) và những trang có một bản sao AMP (AMP kèm theo), tất thảy đều cần bảo đảm rằng chúng có thể được khám phá! Tất cả các trang AMP đều cần `<link rel="canonical" href="$SOME_URL">` trong `<head>`. Những trang AMP trước tiên cần liên kết đến chính bản thân chúng và những trang AMP cặp đôi với một trang không phải AMP sẽ cần liên kết lẫn nhau.

Hãy bảo đảm siêu dữ liệu [Schema.org](https://schema.org/) thêm vào những thông tin hữu dụng! Những website khác và những công cụ tìm kiếm có thể cần cái này để chia sẻ nội dung của bạn.

Web Robot, Web Wanderer, Crawler hoặc Spider đều là tên dành cho các chương trình tìm kiếm nội dung. Chúng rảo khắp các web, giúp các công cụ tìm kiếm lập chỉ mục cho nội dung web sao cho những truy vấn cuả người dùng có thể làm nổi lên những kết quả chính xác! Bảo đảm là người tìm kiếm có thể tìm ra website của bạn bằng cách bao gồm những chỉ dẫn đúng đắn trong file, `robots.txt` và thiết lập những header phù hợp.

KHÔNG loại trừ crawler qua tập tin [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en).

```
User-agent: *
Disallow: /amp/                            <= don't!
```

KHÔNG thêm thẻ siêu dữ liệu `noindex` của robot vào các tập tin AMP HTML.

```
<meta name="robots" content="noindex" />   <= don't!
```

KHÔNG bao gồm `noindex` ở dạng header HTTP X-Robots-Tag cho những tập tin AMP của bạn.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Tìm hiểu cách để quảng bá các trang của bạn:

- [Quảng bá các trang của bạn](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Thông số cho thẻ siêu dữ liệu robots và header HTTP X-Robots-Tag](https://developers.google.com/search/reference/robots_meta_tag)
- [Hỏi đáp về lập chỉ mục AMP](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Đo lường lưu lượng và hành trình của người dùng

Tập hợp số liệu thống kê chính xác là điều thiết yếu cho công cụ phân tích hữu dụng. Khi kiểm tra xem việc đưa AMP vào website giúp tác động người dùng ra sao, hãy bảo đảm bạn đo lường đúng các yếu tố. Thông tin tiêu cực giả hiệu, tích cực giả hiệu hay những kết quả không thích đáng có thể phát sinh nếu công cụ phân tích không tính đến những khác biệt mà AMP có thể tạo ra. Bảo đảm là bạn hiểu điều cần tìm và cách đo đạc điều đó!

Tìm hiểu về việc thiết lập công cụ phân tích đúng đắn cho AMP:

- [Vậy là bạn không qua bài kiểm tra AMP - giờ thì sao?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Phân tích bộ nhớ đệm so với không có bộ nhớ đệm](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Đo lường hành trình của người dùng khắp Bộ nhớ đệm AMP và website của bạn](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Đo lường mức thành công: Những yếu tố mới trong công cụ phân tích & những thử nghiệm đối với AMP (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Trao đổi nội dung có kí danh cho URL AMP tốt hơn và công cụ phân tích dễ dàng hơn (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
