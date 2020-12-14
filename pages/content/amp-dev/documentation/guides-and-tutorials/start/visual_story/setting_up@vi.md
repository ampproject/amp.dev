---
"$title": Setting up
"$order": '1'
description: Thiết lập môi trường phát triển của bạn. Bước 1. Tải về đoạn code. Tải đoạn code mẫu cho bài thực hành dưới dạng tập tin ZIP hoặc qua git...
author: bpaduch
---

## Yêu cầu trước khi tiến hành:

Trước khi bắt đầu bài thực hành này, bạn sẽ cần những điều sau:

- A basic knowledge of HTML, CSS, and JavaScript
- Kiến thức cơ bản về các khái niệm cốt lõi của AMP (xem bài thực hành ["Chuyển đổi HTML sang AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md?format=websites))
- Một trình duyệt tùy theo bạn chọn
- Một trình soạn văn bản tùy theo bạn chọn

## Set up your development environment

#### Bước 1. Tải về đoạn code

1. Tải về đoạn code cho hướng dẫn này, vốn được nén thành một tập tin zip, từ URL sau: <a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. Giải nén nội dung trong tập tin zip đó. Trong thư mục **amp-pets-story** là các tập tin hình ảnh, video, âm thanh và dữ liệu mà ta sẽ dùng để tạo câu chuyện.  Tập tin **pets.html** là điểm khởi đầu cho câu chuyện. Phiên bản hoàn chỉnh của câu chuyện có thể tìm thấy trong tập tin [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Step 2. Run the sample page

Để thử Câu chuyện web mẫu, ta cần truy cập những tập tin này từ một máy chủ web. Có nhiều cách để tạo một máy chủ web cục bộ tạm thời cho mục đích thử nghiệm. Đây là những phương án, hãy chọn một cái hợp với bạn nhất:

- [“Web Server for Chrome” Google Chrome app](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Một máy chủ HTTP Python cục bộ](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

After setting up your local web server, have a look at what our completed Web Story will look like by the end of this tutorial by accessing the following <a href="http://localhost:8000/pets-completed.html">URL</a>:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"] **QUAN TRỌNG –** Hãy chắc chắn là URL được phục vụ từ `localhost`, bằng không thì Câu chuyện web có thể không tải được đúng cách, và bạn có thể gặp phải những lỗi như `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.` ("source" phải bắt đầu bằng "https://" hoặc "//" hoặc là địa chỉ tương đối và được phục vụ từ https hoặc localhost)[/tip]

Click through the completed story and get a sense of what we'll be creating.
