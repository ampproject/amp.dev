---
$category@: dynamic-content
formats:
  - websites
teaser:
  text: 显示Poool付费专区。
---


<!---
Copyright 2020 The AMP HTML Authors.

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

基于 `amp-access` 的 `amp-access-poool`组件使用来自Poool's Dashboard配置的`bundleID`加载并显示付费专区。

有关更多详细信息，请参见 [poool.tech](https://poool.tech)。`amp-access-poool`基于并要求
[`amp-access`](https://amp.dev/documentation/components/amp-access)。

如果你熟悉Poool在AMP之外是如何工作的，那么在这里不能使用 `excerpt` 和 `hide` 模式。 这是由于AMP的特定行为。您可以使用 `amp-access` 提供的 `access` 变量锁定或解锁内容。查看下面的 `poool-widget` 部分。

`amp-access-poool` 组件不需要授权或pingback配置，因为它已预先配置为可与Poool一起使用。

有关模式的更多信息，请查看我们的 [SDK 文档](https://dev.poool.tech/doc/sdk#mode)。

### 配置

您必须在camelCase中的AMP中设置配置属性，而不是Poool传统上使用的下划线 (" \_ ") 符号。

例如：用 `customSegment="amp-custom-segment"` 实现 `poool("config", "custom_segment", "amp-custom-segment");`。

#### HTML sections

**设置poool-widget部分，其中包含未授予访问权限时的poool付费专区。**

`amp-access-poool` 组件需要3个不同的部分：

- 文章预览，在尚未授予访问权限时显示 (使用 `amp-access="NOT access"`)，并由Poool使用 `poool-access-preview` 属性标识。
- 文章内容，当访问权限被授予时显示 (使用 `amp-access="access"`)，被`amp-access-hide` 属性隐藏直到访问权限被授予， 通过Poool使用 `poool-access-content` 属性标识。
- Poool的Paywall容器，在尚未授予访问权限时显示 (使用 `amp-access="NOT error AND NOT access"`), 由Poool使用 `poool` id标识。

[sourcecode:html]
<section poool-access-preview amp-access="NOT access">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    ullamcorper turpis vel commodo scelerisque.
  </p>
</section>

<section poool-access-content amp-access="access" amp-access-hide>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    ullamcorper turpis vel commodo scelerisque.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    ullamcorper turpis vel commodo scelerisque.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    ullamcorper turpis vel commodo scelerisque.
  </p>
</section>

<section amp-access="NOT error AND NOT access" id="poool"></section>
[/sourcecode]

#### amp-access script - poool config

**示例：基本的付费专区配置（具有默认值）)**

配置与AMP Access类似，除了不需要授权，pingback或登录URL。

[sourcecode:html]
<script id="amp-access" type="application/json">
  {
    "vendor": "poool",
    "poool": {
      "bundleID": "Your app id provided by poool",
      "pageType": "premium",
      "itemID": "amp-example-article"
    }
  }
</script>
[/sourcecode]

**示例：在名为"amp-custom-segment"的自定义组/细分中为用户显示付费专区**

[sourcecode:html]
<script id="amp-access" type="application/json">
  {
    "vendor": "poool",
    "poool": {
      "bundleID": "Your app id provided by poool",
      "pageType": "premium",
      "debug": "true",
      "cookiesEnabled": "true",
      "itemID": "amp-example-article",
      "customSegment": "amp-custom-segment"
    }
  }
</script>
[/sourcecode]

有关配置变量的更多信息，请查看 [SDK 文档](https://dev.poool.tech/doc/sdk#configuration).

## 属性

### bundleID (必填)

你的 App ID (您可以在你的仪表盘上找到它).

### itemID (必填)

你的 **唯一** 文章 ID.

### pageType (必填)

用于告诉Poool当前用户已访问某个页面。
请参阅 [文档](https://dev.poool.tech/doc/sdk#page_view) 以获取更多信息。

### debug

启用/禁用调试模式。
请参阅 [文档](https://dev.poool.tech/doc/sdk#debug) 以获取更多信息。

### forceWidget

覆盖用户的当前小部件。
请参阅 [文档](https://dev.poool.tech/doc/sdk#force_widget) 以获取更多信息。

### loginButtonEnabled

启用/禁用付费专区的"login"按钮。
请参阅 [文档](https://dev.poool.tech/doc/sdk#login_button_enabled) 以获取更多信息。

### signatureEnabled

启用/禁用付费专区签名，在解锁文章后显示在文章内容下。
请参阅 [文档](https://dev.poool.tech/doc/sdk#signature_enabled) 以获取更多信息。

### videoClient

为视频小部件设置默认视频客户端 (vast, googima) 。
请参阅 [文档](https://dev.poool.tech/doc/sdk#video_client) 以获取更多信息。

### customSegment

使用自定义组/细分段代码覆盖本机细分。
请参阅 [文档](https://dev.poool.tech/doc/sdk#custom_segment) 以获取更多信息。

### cookiesEnabled

根据最新的GDPR要求，我们决定默认情况下在我们的付费专区中禁用Cookie。您将必须显式设置此属性以反映用户的同意。
请参阅 [文档](https://dev.poool.tech/doc/sdk#cookies_enabled) 以获取更多信息。

## Validation

请参阅 AMP 验证工具规范中的 [`amp-access-poool` 规则](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access-poool/validator-amp-access-poool.protoascii)。