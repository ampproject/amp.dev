---
$title: amp-addthis
$category@: social
teaser:
  text: 显示嵌入的 AddThis 网站工具。
---


<!--
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



显示嵌入的 [AddThis](https://www.addthis.com) 网站工具。

<table>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://ampjs.org/v0/amp-addthis-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
  </tr>
</table>


## 为什么使用 AddThis？ <a name="why-addthis"></a>

`amp-addthis` 组件可提供美观、简洁的分享按钮，让网站访问者可以轻松地将内容分享到 200 多个社交渠道，包括 Messenger、WhatsApp、Facebook、Twitter 和 Pinterest 等。

AddThis 受到超过 1500 万个网站（拥有超过 20 亿唯一身份用户）的信赖，能够以 60 多种语言在全球范围内分享内容。

## 分享按钮 <a name="share-buttons"></a>

### 悬浮 <a name="floating"></a>

此类按钮放置在网页的侧面、顶部或底部，随着读者滚动网页而移动。这是一种很好的方式，既能促进分享，又不会造成太多干扰。

示例：
```html
<!--
  此示例使用占位符 pubId。
  在 https://www.addthis.com/dashboard 上创建帐号后，请将 pubId 值替换为您自己的值。
-->
<amp-addthis
  width="320"
  height="92"
  layout="responsive"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="957l"
  data-widget-type="floating">
</amp-addthis>
```

### 内嵌 <a name="inline"></a>

将分享按钮集成到您的内容中，以便实现无缝分享体验。

示例：
```html
<!--
  此示例使用占位符 pubId。
  在 https://www.addthis.com/dashboard 上创建帐号后，请将 pubId 值替换为您自己的值。
-->
<amp-addthis
  width="320"
  height="92"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="mv93"
  ata-widget-type="inline">
</amp-addthis>
```

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>用户登录后，<a href="https://addthis.com/dashboard">AddThis 信息中心</a>的网址中包含的 AddThis 发布商 ID。例如，在网址 <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code> 中， <code>ra-5c191331410932ff</code> 为发布商 ID。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>要显示的工具对应的 AddThis 微件 ID。同样，也可在 <a href="https://addthis.com/dashboard">AddThis 信息中心</a>找到该 ID。您可以通过以下方式找到特定工具的微件 ID：在 AddThis 信息中心打开特定工具，然后复制网址的最后一部分。例如，在网址 <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code> 中， <code>957l</code> 为微件 ID。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>该属性用于描述微件类型。
      <ul>
        <li>悬浮：<code>data-widget-type="floating"</code></li>
        <li>内嵌：<code>data-widget-type="inline"</code></li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-title</strong></td>
      <td>可选。如果该属性已设置，则在发生分享时，AddThis 工具将尝试分享这个标题。如果该属性未设置，系统将使用 <code>amp-addthis</code> 标记所在文档的标题。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-url</strong></td>
      <td>可选。如果该属性已设置，则在发生分享时，AddThis 工具将尝试分享这个网址。如果该属性未设置，系统将使用 <code>amp-addthis</code> 标记所在文档的 <code>location.href</code> 属性。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-media</strong></td>
      <td>可选。如果该属性已设置，则在发生分享时，这是 AddThis 工具将尝试分享的媒体（如图片或视频）所在的网址。如果该属性未设置，则保留未定义状态。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-description</strong></td>
      <td>可选。如果该属性已设置，则在发生分享时，这是 AddThis 工具将尝试分享的网页的说明。如果该属性未设置，则保留未定义状态。</td>
    </tr>
  </table>

## 实现文档 <a name="implementation-documentation"></a>

1. 如果您还没有 AddThis 帐号，则需要前往 [https://www.addthis.com/register](https://www.addthis.com/register) 创建一个。创建 AddThis 帐号完全免费。在创建帐号后，您可以访问我们的整套网站工具，还可以获取深度分析报告，从而更好地了解您网站的社交流量情况。
1. 转到[信息中心](https://addthis.com/dashboard)，然后自定义您的分享按钮（AMP 目前仅支持悬浮和内嵌分享按钮）。
1. 根据喜好自定义分享按钮，然后点击“激活工具”。这会将您重定向到我们的“获取代码”页面。
1. 最后但同样重要的一点，复制内嵌代码，并将其粘贴到网页正文部分中您希望显示分享按钮的位置。对于悬浮分享按钮，您可以将此代码放置在正文的任意位置，因为它会自动显示在屏幕的左侧或右侧，具体取决于您在该工具的设置部分所指定的位置。

这样就大功告成了！您应该会在网页上看到分享按钮！

如需了解分步说明，请观看我们的 [YouTube 视频](https://www.youtube.com/watch?v=BSkuAB4er2o)：
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-addthis 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-addthis/validator-amp-addthis.protoascii)。

## 隐私权政策 <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

AddThis 工具和 AddThis 工具栏会从最终用户与发布商网站互动或工具栏用户与 AddThis 工具栏互动时所用的设备收集信息（下称“AddThis 数据”）。

AddThis 数据可能包含以下内容：

* 互联网协议 (IP) 地址、移动广告 ID (MAID)（可让移动应用开发者识别谁在使用他们的移动应用）、移动应用 ID、浏览器类型、浏览器语言、操作系统类型，以及最终用户访问发布商网站或工具栏的日期和时间
* 使用工具栏的用户；
* 在发布商网站上的行为，例如最终用户在发布商网站上逗留了多长时间、最终用户在发布商网站上分享内容的行为，以及最终用户在发布商网站上滚动网页的行为；
* 最终用户用于查找和导航到发布商网站的引荐网址和网页搜索；
* 使用 AddThis 工具栏搜索功能时输入的关键字，以及工具栏用户是否以及何时下载、安装或卸载 AddThis 工具栏；
* 最终用户使用 AddThis 工具的频率信息，以及工具栏用户使用 AddThis 工具栏的频率信息；
* 根据最终用户和工具栏用户的 IP 地址推断出的地理位置数据。

在适用法律要求的范围内，AddThis 数据将被视为个人信息。根据《AddThis 服务条款》，发布商必须从最终用户处征得所有必要的同意和授权；在向 Oracle 提供从最终用户处收集的 AddThis 数据时，必须提供所有必要的通知。

## 支持 <a name="support"></a>

如果您对于在 AMP 上实现 AddThis 有任何疑问或需要任何帮助，请在[此处](https://www.addthis.com/support/)提交工单或发送电子邮件至 [help@addthis.com](mailto%3ahelp@addthis.com)，与我们优秀的支持团队联系。
