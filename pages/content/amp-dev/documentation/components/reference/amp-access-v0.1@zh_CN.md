---
$title: amp-access
$category@: dynamic-content
teaser:
  text: 提供 AMP 付费墙和订阅支持。
---



借助 AMP Access（即“AMP 付费墙和订阅支持”），发布商可以根据读者的订阅状态、查看次数和其他因素来控制读者可以访问哪些内容以及施加哪些限制。

# amp-access <a name="amp-access"></a>



<!--
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

<table>
  <tr>
    <td><strong>提供方式</strong></td>
    <td>稳定</td>
  </tr><tr>
  <td class="col-fourty"><strong>必需的脚本</strong></td>
  <td>
    <div>
      <code>&lt;script async custom-element="amp-access" src="https://ampjs.org/v0/amp-access-0.1.js">&lt;/script></code>
    </div>
  </td>
</tr>
<tr>
  <td class="col-fourty"><strong>示例</strong></td>
  <td><a href="https://ampbyexample.com/components/amp-access/">amp-access 代码示例（带注释）</a></td>
</tr>
</table>

## 与 `amp-subscriptions` 的关系 <a name="relationship-to-amp-subscriptions"></a>

[`amp-subscriptions`](amp-subscriptions.md) 扩展提供与 `amp-access` 类似的功能。不过，它支持更专业的访问付费墙协议。以下是一些值得注意的显著差异：

1. `amp-subscriptions` 授权响应与 amp-access 授权类似，但它经过了严格定义和标准化处理。
1. `amp-subscriptions` 扩展允许为网页配置多项服务，以参与访问/付费墙决策。系统会同时执行这些服务，并根据返回肯定响应的服务设置它们的优先级。
1. AMP 查看工具可以根据与发布商签订的作为访问证明的独立协议，向 `amp-subscriptions` 提供已签署的授权响应。
1. 在 `amp-subscriptions` 中，内容标记已经过标准化处理，可以让应用和抓取工具轻松检测优质内容部分。

建议在新的发布商和付费墙提供商实现中使用 `amp-subscriptions`，因为它提供标记标准化、多提供商支持和改进的查看工具支持。

## 解决方案 <a name="solution"></a>

通过采用建议的解决方案，发布商可以控制以下决策和流程：

- 创建和维护用户
- 控制计量供给（允许免费查看一定次数）
- 负责登录流程
- 负责对用户进行身份验证
- 负责访问规则和授权
- 根据每个文档灵活地控制访问参数

解决方案包括以下组件：

1. [**AMP 读者 ID**](#amp-reader-id)：由 AMP 生态系统提供，这是 AMP 所看到的读者专属标识符。
1. [**Access Content Markup**](#access-content-markup)：由发布商创建，用于确定文档的哪些部分在哪些情况下可见。
1. [**授权端点**](#authorization-endpoint)：由发布商提供，其返回的响应用于说明读者可以使用文档的哪一部分。
1. [**Pingback 端点**](#pingback-endpoint)：由发布商提供，用于发送文档的“查看”次数。
1. [**登录链接和登录页面**](#login-page-and-login-link)：允许发布商对读者进行身份验证，以及将其身份与 AMP 读者 ID 相关联。

Google AMP 缓存可将文档返回给读者，同时使用 Access Content Markup 遮挡文档的某些部分。AMP runtime 会调用授权端点，并使用响应来隐藏或显示由 Access Content Markup 定义的不同部分。向读者显示文档后，AMP runtime 会调用 Pingback 端点；发布商可以使用该端点更新倒数计量供给（已用的免费查看次数）。

借助该解决方案，发布商还可以在 AMP 文档中放置一个用于启动登录/订阅页面的登录链接；发布商可以在该页面上对读者进行身份验证，以及将读者在其系统中的身份与 AMP 读者 ID 相关联。

此解决方案的基本形式是：将完整的（但经过遮挡）文档发送给读者，并根据授权响应直接显示/隐藏受限制的部分。不过，该解决方案还提供“server”选项，设置该选项后，即可在传递初始文档时排除受限制的部分，并且仅在确认授权后才下载这些部分。

要支持 AMP Access，发布商必须实现上述组件。Access Content Markup 和授权端点是必需组件，而 Pingback 端点和登录页面是可选组件。

### AMP 读者 ID <a name="amp-reader-id"></a>

为了提供访问服务和用例方面的帮助，AMP Access 引入了“读者 ID”的概念。**

读者 ID 是由 AMP 生态系统创建的匿名专属 ID。对于每个读者/发布商对，该 ID 都是独一无二的；对于两个不同的发布商而言，同一个读者的标识方式不同。这是一种不可逆的 ID。读者 ID 包含在所有 AMP/发布商通信中，具有非常高的熵。发布商可以使用读者 ID 来识别读者，以及将其映射到自己的身份系统中。

读者 ID 是在用户设备上构建的，旨在确保其长期存在。不过，它遵循常规的浏览器存储规则，包括针对无痕式窗口的规则。读者 ID 的预期生命周期将一直延续，除非两次使用之间的间隔超过 1 年，或者用户清除 Cookie。读者 ID 目前无法在设备之间共享。

读者 ID 的构建方式与[此处](https://docs.google.com/document/d/1f7z3X2GM_ASb3ZCI_7tngglxwS6WoWi1EB3aKzdf6vo/edit#heading=h.hb9q0wpwwhuf)所述的用于构建 ExternalCID 的机制类似。例如，读者 ID 可以为 `amp-OFsqR4pPKynymPyMmplPNMvxSTsNQob3TnK-oE3nwVT0clORaZ1rkeEz8xej-vV6`。

### AMP Access 和 Cookie <a name="amp-access-and-cookies"></a>

发布商可以使用自己的身份验证 Cookie 或依赖读者 ID，也可以使用两者的组合。

### Access Content Markup <a name="access-content-markup"></a>

Access Content Markup 根据授权端点返回的授权响应来确定显示或隐藏哪些部分。它通过特殊标记属性进行描述。

### 授权端点 <a name="authorization-endpoint"></a>

授权端点是一个由发布商提供并由 AMP runtime 或 Google AMP 缓存调用的端点。它是存储了凭据的 CORS GET 端点。此端点返回的访问参数可供内容标记用于隐藏或显示文档的不同部分。

### Pingback 端点 <a name="pingback-endpoint"></a>

Pingback 是一个由发布商提供并由 AMP Runtime 或 Google AMP 缓存调用的端点。它是存储了凭据的 CORS POST 端点。当读者开始查看文档时，AMP runtime 会自动调用此端点。在读者成功完成登录流程后，系统也会调用此端点。Pingback 的主要目标之一是让发布商更新计量供给信息。

Pingback 是可选组件。将 `noPingback` 配置属性设置为 `true` 即可停用该组件。

### 登录页面和登录链接 <a name="login-page-and-login-link"></a>

登录页面由发布商实现和提供，并由 AMP runtime 调用。它通常显示为浏览器对话框。

当读者点按登录链接时，登录页面就会被触发；登录链接可由发布商放置在文档中的任何位置。

## 规范 v0.1 <a name="specification-v01"></a>

### 配置 <a name="configuration"></a>

在 AMP 文档中，所有端点均配置为文档标头中的 JSON 对象：

```html

<script id="amp-access" type="application/json">
  {
    "property": value,
    ...
    }
</script>

```

此配置中定义了以下属性：

<table>
  <tr>
    <th>属性</th>
    <th>值</th>
    <th>说明</th>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorization</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>授权端点的 HTTPS 网址。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>pingback</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>Pingback 端点的 HTTPS 网址。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>noPingback</code></td>
    <td>true/false</td>
    <td>如果值为 true，则停用 pingback。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>login</code></td>
    <td class="col-twenty"><code>&lt;URL&gt;</code> 或 <br><code>&lt;Map[string, URL]&gt;</code></td>
    <td>登录页面的 HTTPS 网址或不同类型登录页面的一组网址。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationFallbackResponse</code></td>
    <td><code>&lt;object&gt;</code></td>
    <td>当授权响应失败时，用于替代授权响应的 JSON 对象。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationTimeout</code></td>
    <td><code>&lt;number&gt;</code></td>
    <td>在授权请求被视为失败后发生的超时（以毫秒为单位）。默认值为 3000。大于 3000 的值仅允许在开发环境中使用。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>type</code></td>
    <td>“client”或“server”</td>
    <td>默认值为“client”。“server”选项正处于设计讨论阶段，这些文档将在准备就绪后进行更新。</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>namespace</code></td>
    <td>字符串</td>
    <td>默认值为空。如果指定了多个访问提供商，则必须提供命名空间。</td>
  </tr>
</table>

**`<URL>`** 值使用替换变量指定 HTTPS 网址。替换变量将在下面的[访问网址变量](#access-url-variables)部分中进行详细介绍。

下面是一个 AMP Access 配置示例：

```html

<script id="amp-access" type="application/json">
{
  "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
  "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
  "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
  "authorizationFallbackResponse": {"error": true}
}
</script>

```

#### 多个访问提供商 <a name="multiple-access-providers"></a>

可以通过使用数组（而非单个对象）并为每个条目提供 `namespace` 来指定多个访问提供商。

```html

<script id="amp-access" type="application/json">
[
  {
    "property": value,
    ...
    "namespace": value
  },
  ...
]
</script>
```

### 访问网址变量 <a name="access-url-variables"></a>

在为各种端点配置网址时，发布商可以使用替换变量。[AMP 变量规范](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)中定义了所有此类变量。此外，该规范还添加了一些特定于访问权限的变量，如 `READER_ID` 和 `AUTHDATA`。部分相关程度最高的变量如下表所示：

<table>
  <tr>
    <th>变量</th>
    <th>说明</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>READER_ID</code></td>
    <td>AMP 读者 ID。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AUTHDATA(field)</code></td>
    <td>授权响应中的字段的值。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RETURN_URL</code></td>
    <td>AMP runtime 指定的返回网址（登录对话框将返回到的网址）的占位符。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>SOURCE_URL</code></td>
    <td>此 AMP 文档的来源网址。如果该文档是通过 CDN 提供的，则 AMPDOC_URL 将是 CDN 网址，而 SOURCE_URL 将是原始来源网址。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AMPDOC_URL</code></td>
    <td>此 AMP 文档的网址。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>CANONICAL_URL</code></td>
    <td>此 AMP 文档的规范网址。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>DOCUMENT_REFERRER</code></td>
    <td>引荐来源网址。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>VIEWER</code></td>
    <td>AMP 查看工具的网址。</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RANDOM</code></td>
    <td>随机数字，有助于避免发生浏览器缓存。</td>
  </tr>
</table>

下面是一个使用读者 ID、规范网址、引荐来源信息和随机 cachebuster 扩展的网址示例：
```text
https://pub.com/access?
  rid=READER_ID
  &url=CANONICAL_URL
  &ref=DOCUMENT_REFERRER
  &_=RANDOM
```

AUTHDATA 变量可用于 Pingback 和登录网址。它允许将授权响应中的任何字段作为网址参数进行传递，例如 `AUTHDATA(isSubscriber)`。该变量也允许使用嵌套表达式，例如 `AUTHDATA(other.isSubscriber)`。如果使用命名空间，则可以将命名空间附加到字段前面，例如 `AUTHDATA(anamespace.afield)`。

### Access Content Markup <a name="access-content-markup-1"></a>

Access Content Markup 用于描述显示或隐藏哪些部分。它由 `amp-access` 和 `amp-access-hide` 这两个 AMP 属性组成，可放置在任何 HTML 元素上。

`amp-access` 属性提供的表达式可根据授权端点返回的授权响应生成 true 或 false 值。结果值将指示相应元素及其内容是否可见。

`amp-access` 值是以类似 SQL 的语言定义的布尔值表达式。[附录 A](#appendix-a-amp-access-expression-grammar) 中定义了相应语法，其定义如下：
```html

<div amp-access="expression">…</div>
```
属性和值是指授权端点返回的授权响应的属性和值。这提供了一个支持不同访问情形的灵活系统。如果使用命名空间，则只需将命名空间添加到属性名称前面即可，例如 `anamespace.aproperty`。

`amp-access-hide` 属性可用于在收到授权响应之前以乐观的方式隐藏元素（授权响应可以显示该元素）。它包含“默认不可见”这一语义。之后由授权返回的授权响应可以撤消此默认设置，使相应部分显示出来。如果省略 `amp-access-hide` 属性，则默认显示/包含该部分。`amp-access-hide` 属性只能与 `amp-access` 属性一起使用。
```html
<div amp-access="expression" amp-access-hide>...</div>
```

如果授权请求失败，则不对 `amp-access` 表达式进行求值，并且某个部分是显示还是隐藏取决于文档最初提供的 `amp-access-hide` 属性是否存在。

我们可以根据需要扩展 `amp-access-*` 属性集，以支持不同的混淆和呈现需求。

如果授权请求失败且文档中未指定“authorizationFallbackResponse”响应，则不对 `amp-access` 表达式进行求值，并且某个部分是显示还是隐藏取决于文档最初提供的 `amp-access-hide` 属性是否存在。

下面的示例展示了如何根据订阅状态确定是显示登录链接还是完整内容：
```html
<header>
  Title of the document
</header>
<div>
  First snippet in the document.
</div>

<div amp-access="NOT subscriber" amp-access-hide>
  <a on="tap:amp-access.login">Become a subscriber now!</a>
</div>

<div amp-access="subscriber">
  Full content.
</div>

```
在本示例中：
- subscriber 是授权端点返回的授权响应中的布尔值字段。**此部分默认隐藏，这是可选的。**
- 此示例选择以乐观的方式显示完整内容。

下面的示例向读者展示了关于计量供给状态的免责声明：

```html
{% raw %}
<section amp-access="views <= maxViews">
  <template amp-access-template type="amp-mustache">
    You are reading article {{views}} out of {{maxViews}}.
  </template>
</section>
{% endraw %}
```

下面的示例向付费订阅者显示了额外内容：
```html
<section amp-access="subscriptonType = 'premium'">
  Shhh… No one but you can read this content.
</section>
```

### 授权端点 <a name="authorization-endpoint-1"></a>

授权是通过 [AMP Access 配置](#configuration)部分中的 `authorization` 属性进行配置的。它是存储了凭据的 CORS GET 端点。如需了解如何确保此请求的安全，请参阅 [CORS 网域安全性](#cors-origin-security)。

授权可以采用[访问网址变量](#access-url-variables)部分中定义的任何参数。例如，它可以传递 AMP 读者 ID 和文档网址。除了网址参数之外，发布商还可以使用通过 HTTP 协议自然传递的任何信息，例如读者的 IP 地址。授权必须包含 `READER_ID`。

此端点生成授权响应，该响应可以在内容标记表达式中用于显示/隐藏不同部分的内容。

请求格式如下所示：
```text
https://publisher.com/amp-access.json?
rid=READER_ID
&url=SOURCE_URL
```
该响应是一个自由格式的 JSON 对象：它可以包含任何属性和值，只存在很少的限制。限制如下：
- 属性名必须符合 `amp-access` 表达式语法（请参阅[附录 A](#appendix-a-amp-access-expression-grammar)）指定的限制。这通常意味着属性名称不能包含空格、短划线和其他不符合“amp-access”规范的字符。
- 属性值只能是以下类型之一：字符串、数值、布尔值。
- 值也可以嵌套为具有相同类型值的对象：字符串、数值、布尔值。
- 序列化授权响应的总大小不能超过 500 个字节。
- 请确保响应中不包含任何个人身份信息 (PII) 或个人数据。

下面列出了一小部分针对可从授权端点返回的属性的可能参考提示：
- 计量供给信息：允许的最大查看次数和当前查看次数。
- 读者是处于已登录还是已订阅状态。
- 更详细的订阅类型：基本、付费
- 地理位置：国家/地区、区域、自定义发布区域

在下面的响应示例中，读者不是订阅者，按照计量供给每月最多可查看 10 篇文章，目前已经看了 6 篇：
```json
{
  "maxViews": 10,
  "currentViews": 6,
  "subscriber": false
}
```
在下面的响应示例中，读者已登录，订阅类型为“付费”：
```json
{
  "loggedIn": true,
  "subscriptionType": "premium"
}
```
此 RPC 可以在预呈现阶段调用，因此不应该用于计量供给倒数，因为读者可能永远不会真正看到文档。

另一项重要考虑因素是，在某些情况下，AMP runtime 可能需要在每次展示文档时多次调用授权端点。如果 AMP runtime 认为读者的访问参数发生了显著变化（例如在登录流程成功之后），就会发生这种情况。

AMP runtime 和扩展可能会将授权响应用于 3 种不同的用途：

1. 对 `amp-access` 表达式进行求值时。
2. 对 `<template>` 模板进行求值（如 `amp-mustache`）时。
3. 使用 `AUTHDATA(field)` 向 pingback 和登录网址提供其他变量时。

授权端点由 AMP runtime 作为存储了凭据的 CORS 端点进行调用。因此，它必须实现 CORS 协议。它应使用 CORS 网域和来源网域来限制对此服务的访问，如 [CORS 网域安全性](#cors-origin-security)中所述。此端点可以根据需要使用发布商 Cookie。例如，它可以关联读者 ID 与发布商自己的用户身份之间的绑定。AMP 本身并不需要知道这一点（而且也不希望知道）。如需了解更多详情，请参阅 [AMP 读者 ID](#amp-reader-id) 以及 [AMP Access 和 Cookie](#amp-access-and-cookies) 文档。

AMP runtime（更确切地说是“浏览器”）会在调用授权端点时观察缓存响应标头。因此，已缓存的响应可以重复使用。这种做法不一定符合需要。如果不合需要，发布商可以使用适当的缓存控件标头和/或 `RANDOM` 变量来替换端点网址。

如果授权请求失败，AMP runtime 将回退到“authorizationFallbackResponse”（如果配置中已指定）。在这种情况下，授权流程将照常使用“authorizationFallbackResponse”属性的值替代授权响应。如果未指定“authorizationFallbackResponse”，则授权流程将会失败，在这种情况下，系统不会对 `amp-access` 表达式进行求值，而某个部分是显示还是隐藏取决于文档最初提供的 `amp-access-hide` 属性是否存在。

授权请求将自动超时，并会在 3 秒后失败。

AMP runtime 在授权流程中使用以下 CSS 类：

1. 当授权流程开始时，在文档根目录中设置 `amp-access-loading` CSS 类；当授权流程完成或失败时，移除该类。
2. 当授权流程失败时，在文档根目录中设置 `amp-access-error` CSS 类。

在“server”选项中，授权端点由 Google AMP 缓存作为简单的 HTTPS 端点进行调用。**这意味着，在这种情况下无法提供发布商 Cookie。**

### Pingback 端点 <a name="pingback-endpoint-1"></a>

Pingback 是通过 [AMP Access 配置](#configuration)部分中的 `pingback` 属性进行配置的。它是存储了凭据的 CORS POST 端点。如需了解如何确保此请求的安全，请参阅 [CORS 网域安全性](#cors-origin-security)。

Pingback 网址是可选的。使用 `"noPingback": true` 即可将其停用。

Pingback 网址可以采用[访问网址变量](#access-url-variables)部分中定义的任何参数。例如，它可以传递 AMP 读者 ID 和文档网址，但必须包含 `READER_ID`。

Pingback 不生成响应 - 任何响应都将被 AMP runtime 忽略。

在读者开始查看文档以及读者成功完成登录流程后，系统会调用 Pingback 端点。

发布商可以选择使用 Pingback 执行以下操作：
- 对网页的免费查看次数进行倒数
- 将 AMP 读者 ID 与发布商的身份进行匹配，因为作为存储了凭据的 CORS 端点，Pingback 可能包含发布商 Cookie

请求格式如下所示：
```text
https://publisher.com/amp-pingback?
rid=READER_ID
&url=SOURCE_URL
```

### 登录页面 <a name="login-page"></a>

登录页面的网址通过 [AMP Access 配置](#configuration)部分中的 `login` 属性进行配置。

配置可以指定单个登录网址，也可以指定由登录类型键控的多个登录网址的映射。单个登录网址的示例如下：
```json
{
  "login": "https://publisher.com/amp-login.html?rid={READER_ID}"
  }
```

多个登录网址的示例如下：
```json
{
  "login": {
    "signin": "https://publisher.com/signin.html?rid={READER_ID}",
    "signup": "https://publisher.com/signup.html?rid={READER_ID}"
    }
  }
```

该网址可以采用[访问网址变量](#access-url-variables)部分中定义的任何参数。例如，它可以传递 AMP 读者 ID 和文档网址。`RETURN_URL` 查询替换可用于指定返回网址的查询参数，例如 `?ret=RETURN_URL`。必须提供返回网址，如果未指定 `RETURN_URL` 替换，则系统会自动注入默认查询参数名称“return”。

除了可以正常用作[浏览器对话框](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)之外，登录页面就只是一个普通网页，不存在任何特殊限制。如需了解更多详情，请参阅[登录流程](#login-flow)部分。

请求格式如下所示：
```text
https://publisher.com/amp-login.html?
rid=READER_ID
&url=SOURCE_URL
&return=RETURN_URL
```
请注意，如果未指定 `RETURN_URL` 替换，AMP runtime 会自动添加“return”网址参数。登录页面完成其操作后，必须采用以下格式重定向回指定的“返回网址”：
```text
RETURN_URL#success=true|false
```
请注意网址哈希参数“success”的用法。该参数的值为“true”或“false”，具体取决于登录成功与否。理想情况下，登录页面会尽可能在成功或失败时发送信号。

如果页面返回 `success=true` 信号，AMP runtime 将重复调用授权端点和 Pingback 端点，以更新文档的状态，并使用新的访问配置文件报告“查看”事件。

#### 登录链接 <a name="login-link"></a>

发布商可以选择将登录链接放置在文档内容中的任何位置。

您可以通过 [AMP Access 配置](#configuration)部分中的“login”属性配置一个或多个登录网址。

登录链接可以在任何允许使用“on”属性的 HTML 元素上进行声明。通常，这将是锚或按钮元素。配置单个登录网址时，格式为：
```html
<a on="tap:amp-access.login">Login or subscribe</a>
```

配置多个登录网址时，格式为 `tap:amp-access.login-{type}`。示例：
```html
<a on="tap:amp-access.login-signup">Subscribe</a>
```

使用命名空间时，格式为 `tap:amp-access.login-{namespace}` 或 `tap:amp-access.login-{namespace}-{type}`。

AMP 不区分登录和订阅。发布商可以使用多个登录网址/链接或在发布商端配置这种区别。

## 与 amp-analytics 集成** <a name="integration-with-amp-analytics"></a>

[amp-access-analytics.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) 中介绍了与 amp-analytics 的集成。**

## CORS 网域安全性 <a name="cors-origin-security"></a>

授权端点和 Pingback 端点属于 CORS 端点，它们必须实现 [AMP CORS 安全规范](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)中所述的安全协议。

## 计量供给 <a name="metering"></a>

计量供给是一种机制，在这种机制下，读者可以在一段时间内免费查看一定数量的文档的付费内容。达到某个配额后，系统就会向读者显示付费墙，而读者会看到部分内容，还有追加销售宣传用语和注册/登录链接。例如，计量供给可以定义为“读者每月可以免费阅读 10 篇文章”。

AMP Access 提供了以下用于实现计量供给访问的工具：

1. READER_ID 应该用于存储计量供给信息。由于发布商不能始终依赖于在第三方环境中设置 Cookie，因此这些数据应存储在服务器端。
2. “阅读次数”只能在 Pingback 端点中更新。
3. 只有非重复文档才计入配额。也就是说，刷新同一个文档十次只会计为一次查看。为此，授权和 Pingback 端点可以注入 `SOURCE_URL` 或类似的网址变量。请参阅[访问网址变量](#access-url-variables)。

## 首次点击免费 <a name="first-click-free"></a>

[此处](https://support.google.com/news/publisher/answer/40543)描述了 Google 的首次点击免费（即 FCF）政策，最近更新在[此处](https://googlewebmastercentral.blogspot.com/2015/09/first-click-free-update.html)有更详细的介绍。

要实现 FCF，发布商必须做到以下两点：(1) 能够确定每次查看的引荐服务；(2) 能够计算每个读者每天的查看次数。

AMP Access 规范涵盖了这两个步骤。您可以使用[访问网址变量](#access-url-variables)中所述的 `DOCUMENT_REFERRER` 网址替换将引荐来源网址注入授权网址和 Pingback 网址中。查看计数可以在服务器端使用 Pingback 端点来完成。这与[计量供给](#metering)中介绍的计量供给实现非常类似。

## 登录流程 <a name="login-flow"></a>

AMP 将登录对话框作为第一方窗口、弹出式窗口或标签页启动。AMP 查看工具应尽可能尝试在浏览器环境中启动登录对话框，以便能够利用顶级浏览器 API。

当读者激活登录链接后，AMP runtime 将启动登录流程，具体步骤如下：

1. AMP runtime 或查看工具针对指定的登录网址打开登录对话框（第一方窗口）。该网址包含额外的“返回网址”网址查询参数 (`&amp;return=RETURN_URL`)。一些其他参数也可以扩展到网址中，例如读者 ID。如需了解更多详情，请参阅[登录页面](#login-page)部分。
2. 发布商显示自由格式的登录页面。
3. 读者按照登录步骤操作，例如输入用户名/密码或使用社交登录。
4. 读者提交登录信息。发布商完成身份验证，设置 Cookie，最后将读者重定向到先前请求的“返回网址”。重定向包含网址哈希参数 `success`，其值可以是 `true`，也可以是 `false`。
5. 登录对话框会重定向到“返回网址”。
6. AMP runtime 对文档进行重新授权。

只有第 2-5 步需要发布商进行处理：发布商只需提供自己的登录页面，并确保在登录完成后重定向正确无误。除了可以正常用作对话框之外，登录页面不存在任何特殊限制。

像往常一样，读者 ID 应该包含在对登录页面的调用中，并且可以由发布商用于身份映射。作为第一方窗口，发布商还将收到其 Cookie 并能够进行设置。如果发现读者已经在发布商端登录，则建议发布商立即使用 `success=true` 响应重定向回“返回网址”。

## AMP 词汇表 <a name="amp-glossary"></a>

* **AMP 文档** - 采用 AMP 格式且由 AMP 验证工具验证的 HTML 文档。AMP 文档可由 Google AMP 缓存进行缓存。
* **AMP 验证工具** - 对 HTML 文档执行静态分析并根据文档是否符合 AMP 格式返回成功或失败结果的计算机程序。
* **AMP runtime** - 执行 AMP 文档的 JavaScript 运行时。
* **Google AMP 缓存** - AMP 文档的代理缓存。
* **AMP 查看工具** - 显示/嵌入 AMP 文档的网络应用或原生应用。
* **Publisher.com** - AMP 发布商的网站。
* **CORS 端点** - 跨网域 HTTPS 端点。如需了解详情，请参阅 [https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)。如需了解如何确保此类请求的安全，请参阅 [CORS 网域安全性](#cors-origin-security)。
* **读者** - 查看 AMP 文档的实际用户。
* **AMP 预呈现** - AMP 查看工具可以利用预呈现功能，先呈现隐藏的文档，然后再将其显示出来。这可以大大提升性能。但务必要考虑到这个事实：文档预呈现并不构成查看，因为读者实际可能永远不会看到文档。

## 修订 <a name="revisions"></a>

* 2016 年 9 月 2 日：新增了“noPingback”配置属性和可选的 pingback。
* 2016 年 3 月 3 日：允许在登录后重新发送 pingback (v0.5)。
* 2016 年 2 月 19 日：更正了相关示例，以从网址变量替换中移除 `{}`。
* 2016 年 2 月 15 日：[配置](#configuration)和[授权端点](#authorization-endpoint)现在允许在授权失败时使用“authorizationFallbackResponse”属性。
* 2016 年 2 月 11 日：在[授权端点](#authorization-endpoint)中新增了授权请求超时。
* 2016 年 2 月 11 日：现在允许使用嵌套字段引用，例如 `object.field`。
* 2016 年 2 月 9 日：新增了[首次点击免费](#first-click-free)和[计量供给](#metering)部分。
* 2016 年 2 月 3 日：在 [CORS 网域安全性](#cors-origin-security)部分增加了针对“来源网域”安全性的规范。
* 2016 年 2 月 1 日：可以使用 RETURN_URL URL 替换对登录页面的“return”查询参数进行自定义。

## 附录 A：“amp-access”表达式语法 <a name="appendix-a-amp-access-expression-grammar"></a>

[access-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/0.1/access-expr-impl.jison) 文件中提供了最新的 BNF 语法。

下面摘录了此语法的主要内容：
```javascript
search_condition:
  search_condition OR search_condition
  | search_condition AND search_condition
  | NOT search_condition
  | '(' search_condition ')'
  | predicate

predicate:
  comparison_predicate | truthy_predicate

comparison_predicate:
    scalar_exp '=' scalar_exp
    | scalar_exp '!=' scalar_exp
    | scalar_exp '<' scalar_exp
    | scalar_exp '<=' scalar_exp
    | scalar_exp '&gt;' scalar_exp
    | scalar_exp '&gt;=' scalar_exp

truthy_predicate: scalar_exp

scalar_exp: literal | field_ref

field_ref: field_ref '.' field_name | field_name

literal: STRING | NUMERIC | TRUE | FALSE | NULL
```

请注意，`amp-access` 表达式由 AMP runtime 和 Google AMP 缓存进行求值。这并不属于发布商需要实现的规范。本文中提供的相关内容仅供参考。

## 详细讨论 <a name="detailed-discussion"></a>

本部分将详细介绍 amp-access 规范的设计依据，并阐明设计选择。即将推出，敬请期待！

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-access 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/validator-amp-access.protoascii)。
