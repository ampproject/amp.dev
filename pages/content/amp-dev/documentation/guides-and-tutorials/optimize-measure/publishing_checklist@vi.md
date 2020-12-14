---
"$title": Danh mục kiểm tra cho việc phát hành AMP
"$order": '0'
description: Thiết kế web thích nghi xoay quanh việc lập những trang web linh động đáp ứng được các nhu cầu của người dùng - những trang hợp với kích cỡ và định hướng màn hình trên thiết bị người dùng. Bạn có thể đạt được...
formats:
- websites
author: CrystalOnScript
contributors:
- sebastianbenz
---

Làm theo danh mục kiểm tra này để mang đến trải nghiệm AMP đầy đủ nhất cho website của bạn!

# Ensure AMP Specification Validation

AMP comes with a ton of built in benefits, such as decreasing user wait time by preloading content from AMP Caches. To get these benefits, pages must be valid AMP documents. Pages published with errors reported by the AMP validator are not indexable by AMP Caches, and possibly served as error pages.

Không bao giờ phát hành một trang AMP không hợp lệ bằng cách dùng những công cụ này:

- [Xác thực các trang AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [Trình xác thực AMP ](https://validator.ampproject.org/)
- [Google AMP Tester](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [Các công cụ AMP](../../../documentation/tools.html?format=websites)

# Cấp quyền truy cập máy chủ cho các trang AMP có trong bộ nhớ đệm

Great news, valid AMP pages automatically opt into all existing AMP Caches! This means your users experience content that loads efficiently and safely. These types of optimizations are great, but come with a small catch. Some users will be served AMP pages from domains that do not match your own. This can cause pages to lose access to site data when using dynamic AMP components such as [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) or [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). These types of errors are Cross-Origin Resource Sharing, or CORS, issues. Work with safety, not against it, by enabling CORS Requests from all available [AMP Caches](https://cdn.ampproject.org/caches.json)! If you're using Node.js in your backend, you can use the [amp-cors middleware](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Tìm hiểu thêm về việc cấp quyền truy cập máy chủ:

- [Cách các Trang AMP được lưu vào bộ nhớ đệm ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS trong AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [AMP CORS Middleware](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) for Node.js

# Nội dung an toàn và có thể chia sẻ với trao đổi nội dung đã kí danh

Duy trì URL của tên miền và đơn giản hoá công cụ phân tích khi chia sẻ nội dung qua những trao đổi nội dung đã kí danh (SXG). Bằng việc phân phát các trang AMP với SXG, những chữ kí số sẽ bảo vệ thông tin của bạn bằng cách ràng buộc tài liệu với URL được khẳng định của nó. Hành vi này sẽ xem những phiên của người dùng và những cookie là bên thứ nhất, khép lại các khoảng hổng phân tích khả dĩ. Việc thực thi SXG sẽ phát nội dung AMP được kí danh bổ sung cho, chứ không phải thay thế, phần nội dung AMP thông thường.

Tìm hiểu thêm về việc thực thi những trao đổi nội dung được kí danh:

- [Phân phát AMP bằng những trao đổi nội dung được kí danh](signed-exchange.md?format=websites)
- [Trao đổi HTTP được kí danh](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [URL thật của AMP từ Cloudflare](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Trao đổi nội dung được kí danh để có những URL AMP tốt hơn và công cụ phân tích dễ dàng hơn (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Thử nghiệm những trang được lưu vào bộ nhớ đệm

AMP Caches store images, fonts, and page content to serve users your content as soon as they want it. This makes it important to test that your AMP pages look and work as expected when served from an AMP Cache.

Khi thêm các trang AMP vào Bộ nhớ đệm AMP, hãy kiểm tra với [các công cụ nhà phát triển của trình duyệt](https://developers.google.com/web/tools/chrome-devtools/) xem tất cả các tài nguyên bên ngoài có thể tải được không. Đây là danh sách cần ghi nhớ:

- hình ảnh
- video
- điểm cuối amp-analytics
- điểm cuối amp-pixel
- custom fonts
- iframe

Tìm hiểu thêm về bộ nhớ đệm AMP:

- [Dùng Bộ nhớ đệm AMP của Google](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP trên Google, Bộ nhớ đệm AMP của Google](https://developers.google.com/amp/cache/overview)
- [Gỡ lỗi về các vấn đề của Bộ nhớ đệm AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [Định dạng URL của Bộ nhớ đệm AMP và xử lí yêu cầu ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Ensure your AMP files are discoverable by search engines

Pages only build in AMP(AMP first) and pages with a AMP double(paired AMP) all need to ensure they are discoverable! All AMP pages required the `<link rel="canonical" href="$SOME_URL">` in their `<head>`. AMP first pages need to link to themselves and AMP pages paired to a non-AMP page will need to link link to each other.

Hãy bảo đảm siêu dữ liệu [Schema.org](https://schema.org/) thêm vào những thông tin hữu dụng! Những website khác và những công cụ tìm kiếm có thể cần cái này để chia sẻ nội dung của bạn.

Web Robot, Web Wanderer, Crawler hoặc Spider đều là tên dành cho các chương trình tìm kiếm nội dung. Chúng rảo khắp các web, giúp các công cụ tìm kiếm lập chỉ mục cho nội dung web sao cho những truy vấn cuả người dùng có thể làm nổi lên những kết quả chính xác! Bảo đảm là người tìm kiếm có thể tìm ra website của bạn bằng cách bao gồm những chỉ dẫn đúng đắn trong file, `robots.txt` và thiết lập những header phù hợp.

Do NOT exclude crawlers via your [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en) file.

```
User-agent: *
Disallow: /amp/                            <= don't!
```

Do NOT add a robots `noindex` meta tag to your AMP HTML files.

```
<meta name="robots" content="noindex" />   <= don't!
```

Do NOT include `noindex` as X-Robots-Tag HTTP header for your AMP files.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Learn how to make your pages discoverable:

- [Make your page discoverable ](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Robots meta tag and X-Robots-Tag HTTP header specifications](https://developers.google.com/search/reference/robots_meta_tag)
- [Hỏi đáp về lập chỉ mục AMP](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Measuring user traffic and journeys

Gathering correct metrics is essential to useful analytics. When testing how introducing AMP to your site impacts users, ensure you're measuring the correct things. False negatives, false positives, or irrelevant results may arise if analytics don't account for the differences AMP can create. Make sure you understand what to look for, and how to measure it!

Tìm hiểu về việc thiết lập công cụ phân tích đúng đắn cho AMP:

- [So your AMP test doesn't perform — now what?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Phân tích bộ nhớ đệm so với không có bộ nhớ đệm](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Measuring user journeys across the AMP Cache and your website](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Đo lường mức thành công: Những yếu tố mới trong công cụ phân tích & những thử nghiệm đối với AMP (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Trao đổi nội dung có kí danh cho URL AMP tốt hơn và công cụ phân tích dễ dàng hơn (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
