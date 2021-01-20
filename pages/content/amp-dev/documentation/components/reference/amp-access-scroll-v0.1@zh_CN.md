---
$category@: dynamic-content
formats:
  - websites
teaser:
  text: 与Scroll成员身份集成。
---


<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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



## 用法

让[Scroll](https://scroll.com)网络中的站点识别Scroll成员，以便为他们提供无广告的直接获利的体验。

### 配置

在 `<head>` 中, 添加

[sourcecode:none]
<script id="amp-access" type="application/json">
{
  "vendor": "scroll",
  "namespace": "scroll"
}
</script>
[/sourcecode]

确保不要在名称空间行中添加尾随逗号，这会使它成为无效的JSON！

如果您已经在使用 `amp-access` 付费专区， 请按照[使用名称空间和providers数组](https://amp.dev/documentation/components/amp-access#multiple-access-providers)的`amp-access`文档中的步骤。

### 将每个广告设为条件

`amp-access` 向每个广告容器添加属性。

[sourcecode:none]
<div class="amp-ad-container" amp-access="NOT scroll.scroll">
  <amp-ad... >
</div>
[/sourcecode]

要了解更多信息，请访问 [https://developer.scroll.com/amp](https://developer.scroll.com/amp)。

## Validation

请参阅 AMP 验证工具规范中的 [`amp-access-scroll` rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access-scroll/validator-amp-access-scroll.protoascii)。