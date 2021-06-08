---
'$title': AMP 样板代码
$order: 9
formats:
  - websites
  - stories
teaser:
  text: ' head > style[amp-boilerplate] 和 noscript > style[amp-boilerplate]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md.
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

## `head > style[amp-boilerplate]` 和 `noscript > style[amp-boilerplate]` <a name="head--styleamp-boilerplate-and-noscript--styleamp-boilerplate"></a>

AMP HTML 文档的 `head` 标记中必须包含以下样板。目前，需要通过正则表达式执行验证，因此，必须确保变更尽可能少。目前允许的变更包括：

1. 在 `style` 标记内部紧邻开头和结尾处插入任意空白字符
2. 将以下代码段中的任何空格替换为任意空白字符。

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] 您可以使用[样板生成器](https://amp.dev/boilerplate)为 AMP 网页快速设置基本框架。它还提供了结构化数据的代码段，用于创建 PWA 等！[/tip]
