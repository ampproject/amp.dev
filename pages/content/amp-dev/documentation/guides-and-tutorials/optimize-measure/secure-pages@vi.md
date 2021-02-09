---
'$title': Bảo mật trước những tấn công của bên thứ ba
$order: 7
description: Thực hiện những biện pháp nhằm bảo vệ các trang AMP của bạn cùng người dùng để tránh những lỗ hổng bảo mật trên web
formats:
  - websites
author: CrystalOnScript
---

Thực hiện những biện pháp nhằm bảo vệ các trang AMP của bạn cùng người dùng để tránh những lỗ hổng bảo mật trên web. Một trong những đòn ác ý nhất là [cross-site scripting (chèn kịch bản vào website ngoài)](https://www.google.com/about/appsecurity/learning/xss/) (XSS). XSS là một lỗi bảo mật cho phép người tấn công chèn đoạn mã độc hại trên các trang HTML được hiển thị cho người dùng.

Bảo vệ trước những loại tấn công này bằng cách dùng đến [Chính sách bảo mật nội dung (CSP)](https://csp.withgoogle.com/docs/index.html). Bộ nhớ đệm AMP giống Bộ nhớ đệm Google AMP đã thêm CSP vào các trang của bạn! Tuy nhiên, các trang thiếu lớp bổ sung bảo vệ này khi người dùng tránh phiên bản được lưu bộ nhớ đệm, nếu bạn không thêm CSP của chính mình.

# Thực thi CSP của AMP

Thực thi một CSP bằng cách thêm vào siêu thẻ phù hợp vào đầu các trang. Bên dưới là CSP của AMP, chỉ cho phép các đoạn mã AMP được chèn vào trang của bạn:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[Bạn có thể xem ví dụ đầy đủ ở đây](https://github.com/ampproject/amphtml/blob/master/examples/csp.amp.html).

[tip type="read-on"] Tìm hiểu thêm về [việc bảo vệ trước những lỗ hổng bảo mật và CSP tại đây](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). [/tip]
