---
"$title": Code soạn sẵn AMP
order: '9'
formats:
- websites
- stories
teaser:
  text: head > style[amp-boilerplate] và noscript > style[amp-boilerplate]
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

## `head > style[amp-boilerplate]` và `noscript > style[amp-boilerplate]` <a name="head--styleamp-boilerplate-and-noscript--styleamp-boilerplate"></a>

Các tài liệu AMP HTML phải chứa code soạn sẵn sau trong thẻ `head` (đầu đề) của họ. Việc xác thực hiện được thực hiện bằng biểu thức chính quy, vậy nên bạn nên giảm thiểu các biến thể. Hiện tại, các biến thể được cho phép là:

1. Chèn dấu cách trắng tùy ý ngay sau khi mở thẻ `style` (phong cách), và ngay trước khi nó đóng
2. Thay thế bất kỳ dấu cách nào trong đoạn code dưới đây với dấu cách trắng tùy ý.

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] Bạn có thể sử dụng [trình tạo code soạn sẵn](https://amp.dev/boilerplate) để nhanh chóng thiết lập một khung xương cơ bản cho trang AMP của mình. Nó cũng cung cấp các đoạn code cho cấu trúc dữ liệu, để tạo một PWA và nhiều hơn thế nữa! [/tip]
