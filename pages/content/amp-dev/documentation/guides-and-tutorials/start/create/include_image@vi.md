---
'$title': Bao gồm một ảnh
$order: 2
description: Hầu hết các thẻ HTML đều có thể được sử dụng trực tiếp trong AMP HTML, nhưng một số thẻ nhất định, ví dụ như thẻ <img>, sẽ được thay bằng thẻ AMP HTML tùy chỉnh tương đương, hoặc được tăng cường một chút
author: pbakaus
contributors:
  - bpaduch
---

Hầu hết các thẻ HTML đều có thể được sử dụng trực tiếp trong AMP HTML, nhưng một số thẻ nhất định, ví dụ như thẻ `<img>`, sẽ được thay bằng thẻ AMP HTML tùy chỉnh tương đương, hoặc được tăng cường một chút (và một số thẻ rắc rối sẽ bị cấm hoàn toàn, xem [Các thẻ HTML trong thông số](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#html-tags)).

Để minh họa cho các đánh dấu bổ sung, đây là đoạn mã cần thiết để nhúng một ảnh vào trang:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] **ĐỌC TIẾP –** Để biết vì sao chúng tôi thay các thẻ như `<img>` bằng [`<amp-img>`](../../../../documentation/components/reference/amp-img.md), và có bao nhiêu thẻ, hãy truy cập [Bao gồm Ảnh & Video](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md). [/tip]
