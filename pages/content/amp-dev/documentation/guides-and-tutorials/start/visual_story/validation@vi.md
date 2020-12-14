---
"$title": Validating your AMP HTML
"$order": '8'
description: Whenever you create an AMP page, you should always validate that your AMP HTML is correct. There are [several methods that you can use to validate your AMP pages ...
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

Open the [Developer Console](https://developer.chrome.com/devtools/docs/console) in Chrome (or your preferred browser), and verify there are no AMP errors. You might need to refresh your browser to see validation messages. If your page is free of errors, you should see the message:

```text
 AMP validation successful.
```
