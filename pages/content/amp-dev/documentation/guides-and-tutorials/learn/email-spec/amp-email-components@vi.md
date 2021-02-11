---
'$title': Các Thành phần được Hỗ trợ của AMP cho Email
$order: 3
formats:
  - email
teaser:
  text: 'Sau đây là danh sách các thành phần AMP hiện đang được hỗ trợ cho các email AMP. Các thành phần này được ghép nhóm thành các hạng mục sau:'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

Sau đây là danh sách các [thành phần AMP](https://amp.dev/documentation/components/?format=email) hiện đang được hỗ trợ cho các email AMP. Các thành phần này được ghép nhóm thành các hạng mục sau:

- [Nội dung Động](#dynamic-content)
- [Bố cục](#layout)
- [Nội dung Đa phương tiện](#media)

## Nội dung Động <a name="dynamic-content"></a>

| Yếu tố                                                                                                                                                                         | Mô tả                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`<amp-form>`](https://amp.dev/documentation/components/amp-form)                                                                                                              | Yếu tố biểu mẫu. Thuộc tính action-xhr phải được sử dụng thay cho thuộc tính hành động thông thường. Có thể được sử dụng kết hợp với `<template type="amp-mustache">` để render một hồi đáp. <br><br>**Lưu ý:** Không được phép [Chuyển hướng sau khi gửi đi](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission).           |
| [`<amp-selector>`](https://amp.dev/documentation/components/amp-selector)                                                                                                      | Một tiện ích lựa chọn nhiều mục để sử dụng trong một biểu mẫu.                                                                                                                                                                                                                                                                                              |
| [`amp-bind`](https://amp.dev/documentation/components/amp-bind) và [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Ngôn ngữ kịch bản đơn giản trong AMP cho phép thao túng một bộ máy trạng thái để tương tác giữa các yếu tố. Cũng có thể được sử dụng để bổ sung hành vi khi gặp một số sự kiện nhất định.<br><br>**Lưu ý:** Bạn không được phép gán cho `[href]` hay `[src]`. Bạn cũng không được phép sử dụng các hành động `AMP.print`, `AMP.navigateTo` và `AMP.goBack`. |
| [`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification)                                                                               | `<amp-state>` được sử dụng để định nghĩa cho trạng thái ban đầu, được sử dụng bởi `amp-bind`.<br><br>**Lưu ý**: Thuộc tính `src` hiện không được hỗ trợ.                                                                                                                                                                                                    |
| [`<amp-list>`](https://amp.dev/documentation/components/amp-list)                                                                                                              | Truy xuất dữ liệu JSON từ xa, sẽ được render bởi một [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**Lưu ý:** Việc gán cho thuộc tính `[src]` hiện không được cho phép. Việc bao gồm thông tin đăng nhập người dùng với `credentials="include"` cũng không được cho phép.                                               |
| [`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache)                                                                                      | Một đánh dấu khuôn mẫu Mustache để render kết quả của một lệnh gọi `amp-list`.                                                                                                                                                                                                                                                                              |

## Bố cục <a name="layout"></a>

| Yếu tố                                                                                                                    | Mô tả                                                                      |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [Thuộc tính layout (bố cục)](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | Hành vi bố cục được xác định bởi thuộc tính layout (bố cục).               |
| [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion)                                               | Một yếu tố UI xúc tiến việc hiển thị/ẩn các phần khác nhau.                |
| [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel)                                                 | Một thành phần UI băng chuyền.                                             |
| [`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text)                                                 | Một thành phần trợ giúp để nhét vừa văn bản trong một diện tích nhất định. |
| [`<amp-layout>`](https://amp.dev/documentation/components/amp-layout)                                                     | Một container có thể có các bố cục tương thích dựa trên tỷ lệ khung hình.  |
| [`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar)                                                   | Một thanh bên cho các mục đích điều hướng.                                 |
| [`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago)                                                   | Là một cách tiện lợi để render dấu thời gian.                              |

## Nội dung Đa phương tiện <a name="media"></a>

| Yếu tố                                                            | Mô tả                                                                                                 |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`<amp-img>`](https://amp.dev/documentation/components/amp-img)   | Một thành phần AMP thay thế `<img>`.<br><br>**Lưu ý:** Việc gán cho `[src]` hiện không được cho phép. |
| [`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Nhúng các tập tin GIF.<br><br>**Lưu ý:** Việc gán cho `[src]` hiện không được cho phép.               |
