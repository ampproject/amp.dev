---
"$title": Tắt độ trễ khi chạm
"$order": '50'
tags:
- fid
---

Thiết lập chiều rộng màn hiển thị khớp với chiều rộng của thiết bị để tắt độ trễ khi chạm, điều này có thể tăng FID. Để xóa độ trễ khi chạm 300-350ms này, thay đổi khai báo màn hiển thị trong `<head>` của trang thành:

```
<meta name="viewport" content="width=device-width">
```

Việc này sẽ thiết lập chiều rộng màn hiển thị cho bằng thiết bị, và thường được coi là biện pháp thực hành tiên tiến nhất cho các website tối ưu cho di động. Bạn có thể [đọc thêm về việc tắt độ trễ khi chạm trên web.dev](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
