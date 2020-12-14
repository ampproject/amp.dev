---
"$title": Xác thực AMP HTML của bạn
"$order": '8'
description: Bất kì khi nào bạn tạo một trang AMP, bạn luôn có thể xác thực AMP HTML của bạn là đúng. Có một số phương pháp mà bạn có thể dùng để xác thực các trang AMP của mình ...
author: bpaduch
---

Bất kì khi nào bạn tạo một trang AMP, bạn luôn có thể xác thực HTML AMP của bạn là đúng. Có [một số phương pháp mà bạn có thể dùng để xác thực các trang AMP của mình](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md). Trong hướng dẫn này, ta sẽ bật Trình xác thực AMP bằng cách bật chế độ nhà phát triển. Để bật chế độ nhà phát triển, hãy thêm mã định danh phân đoạn sau vào URL của bạn và tải lại trang:

```text
#development=1
```

Ví dụ:

```text
http://localhost:8000/pets.html#development=1
```

Mở [Developer Console (Bảng điều khiển Nhà phát triển)](https://developer.chrome.com/devtools/docs/console) trong Chrome (hoặc trình duyệt ưa thích của bạn), và xác minh rằng không có lỗi AMP. Bạn có thể cần làm mới trình duyệt để thấy thông điệp xác thực. Nếu trang của bạn không có lỗi, bạn cần phải thấy dòng sau:

```text
 AMP validation successful.
```
