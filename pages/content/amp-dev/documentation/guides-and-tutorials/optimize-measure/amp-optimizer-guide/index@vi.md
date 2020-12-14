---
"$title": Using an AMP Optimizer
"$order": '2'
"$hidden": 'true'
description: Bộ tối ưu hoá AMP là công cụ mang đến những tác vụ tối ưu hoá Bộ nhớ đệm AMP cho website của chính bạn. Dùng một Bộ tối ưu hoá AMP là chìa khoá để tạo một trải nghiệm trang web thật tuyệt và đáp ứng quy định Core Web Vitals (Chỉ số thiết yếu về web). Những hướng dẫn này sẽ giải thích cách vận dụng tốt nhất một Bộ tối ưu hoá AMP để tối ưu hoá những trang AMP của bạn.
formats:
- websites
- stories
author: sebastianbenz
---

Bộ tối ưu hoá AMP là công cụ mang đến những tác vụ tối ưu hoá Bộ nhớ đệm AMP cho website của chính bạn. Dùng một Bộ tối ưu hoá AMP là chìa khoá để tạo một [trải nghiệm trang web](https://developers.google.com/search/docs/guides/page-experience) thật tuyệt và đáp ứng quy định [Core Web Vitals (Chỉ số thiết yếu về web)](https://web.dev/vitals/). Nếu bạn muốn tìm hiểu thêm về cách vận hành của Bộ tối ưu hoá AMP, hãy xem [các chi tiết về Hướng dẫn tối ưu hoá AMP](explainer.md).

## Isn’t AMP already fast?

You may be thinking: wait – isn’t AMP supposed to be fast out-of-the-box? And you would be right: the AMP runtime is optimized for speed and all valid AMP pages load fast. However, there are additional performance optimizations you can implement on your server to help the browser load AMP pages even faster.

Ban đầu, bộ nhớ đệm AMP phục vụ phần lớn các trang AMP. Các bộ nhớ đệm này đã thực hiện tối ưu hóa bổ sung trên các trang để đảm bảo trải nghiệm người dùng mạnh mẽ. Tuy nhiên, theo thời gian, thêm nhiều bề mặt bắt đầu liên kết đến các trang AMP và các nhà phát triển bắt đầu xây dựng toàn bộ trang web bằng AMP. Đó là lí do tại sao nhóm AMP đã bắt đầu làm việc trên Bộ tối ưu hóa AMP để cho phép mọi người phân phát các trang AMP có Bộ nhớ đệm AMP giống như hiệu năng trên chính nguồn gốc của họ.

## Integrate an AMP Optimizer

There are three ways to use an AMP optimizer:

1. Use a site generator or CMS with a built-in optimizer integration.
2. Integrate an AMP Optimizer into your build-system or server.
3. Integrate an AMP Optimizer into your hosting environment.

### CMS & Site Generators

The best way to publish optimized AMP is using a site generator or CMS with built-in AMP Optimizer support. In this case, your AMP pages will be optimized automatically. Currently, the following site generators and CMSs integrate AMP Optimizer:

- [WordPress](https://wordpress.org/) via the [AMP WordPress Plugin](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) via the [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Custom Build or Server Integrations

Bạn còn có thể tự mình tích hợp một Bộ tối ưu hoá AMP. Có nhiều cách triển khai Bộ tối ưu hoá AMP mã nguồn mở:

- [Bộ tối ưu hoá AMP (Node.js)](node-amp-optimizer.md): một thư viện trên cơ sở Node.js để tạo AMP được tối ưu hoá. Xem thử hướng dẫn bắt đầu của chúng tôi tại đây trên amp.dev. Việc triển khai được duy trì bởi đội ngũ AMP.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): a Python port of the Node AMP Optimizer.

Có nhiều bản tích hợp khác nhau cho các trang được máy chủ của bạn render động và các website tĩnh:

1. **Thời gian xây dựng**: đối với các website tĩnh, tốt nhất nên tối ưu hoá các trang AMP như một phần của bản dựng. Phương cách này lí tưởng do việc tối ưu hoá các trang AMP không tác động đến hiệu năng phân phát. Xem thử [mẫu này đối với một Bộ tối ưu hoá AMP + tích hợp Gulp](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **Thời gian render**: nếu website có bản chất động hơn hoặc không thể áp dụng các biến đổi theo cách tĩnh, thì việc tối ưu hoá có thể thực hiện sau khi những tài liệu AMP được render ở máy chủ. Trong trường hợp đó, để bảo đảm thời gian phục vụ nhanh, tốt nhất nên lưu vào bộ nhớ đệm đối với những trang đã biến đổi, phục vụ cho những yêu cầu sau đó. Việc lưu vào bộ nhớ đệm có thể xảy ra ở cáp CDN, trên cơ sở hạ tầng nội bộ của website (ví dụ như Memcached), hoặc ngay trên chính máy chủ, nếu tập hợp các trang đủ nhỏ để vừa khớp vào bộ nhớ. Để tìm hiểu thêm về phương cách này, hãy xem thử [minh hoạ này về việc tích hợp Bộ tối ưu hoá AMP vào Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Hosting Provider Integrations

Một số nhà cung cấp máy chủ cho phép chạy logic tuỳ chỉnh khi triển khai hay phân phát một trang web. Đây có thể là phương án tuyệt vời để tích hợp Bộ tối ưu hoá AMP. Một số tích hợp mẫu:

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([coming soon](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image ([coming soon](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
