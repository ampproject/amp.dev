---
$title: Sử dụng phiên bản Mô-đun JavaScript của Thời gian chạy AMP
$order: 25
tags:
- lcp
- fid
---

Bạn cần tôn trọng người dùng và băng thông của họ. Việc sử dụng [Mô-đun JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) có thể tạo khác biệt tích cực to lớn về hiệu năng của trang cho các trình duyệt web hiện đại. Bạn có thể đăng ký tham gia phiên bản Mô-đun JavaScript của Thời gian chạy AMP cũng như các thành phần AMP bằng cách sử dụng cờ [`experimentEsm`](https://www.npmjs.com/package/@ampproject/toolbox-optimizer#experimentesm) với phiên bản mới nhất của [Bộ tối ưu AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/). Việc cập nhật bản triển khai của bạn sẽ chia các chương trình JavaScript thành nhiều mô-đun khác nhau, cho phép bạn chỉ nhập mô-đun cần thiết! Hãy lưu ý rằng bởi tính năng này đang được thử nghiệm (sẽ sớm được ra mắt chính thức!), việc sử dụng tính năng này có thể khiến trang AMP của bạn bị coi là không hợp lệ.
