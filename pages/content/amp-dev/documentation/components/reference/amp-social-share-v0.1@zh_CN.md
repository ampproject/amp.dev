---
$title: amp-social-share
$category@: ads-analytics
teaser:
  text: 分享跟踪功能正在开发中。
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



显示社交分享按钮。


<table>
  <tr>
    <td class="col-fourty"><strong>必需脚本</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://ampjs.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>container、fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-social-share/">amp-social-share 示例</a>。</td>
  </tr>
</table>

## 概览 <a name="overview"></a>

`amp-social-share` 组件会显示一个针对各种社交平台提供商的社交分享按钮。

## 示例 <a name="examples"></a>

**示例：基本社交分享按钮**

分享按钮会针对某些预配置的提供商为您猜测部分默认设置。它假定当前文档规范网址是您要分享的网址，并且网页标题是您要分享的文本。

```html
<amp-social-share type =“twitter”></amp-social-share>
```

**示例：传递参数**

当您需要将参数传递给分享端点时，可以指定要附加到分享端点的 `data-param-
<attribute>`。
```html
<amp-social-share type="linkedin" width="60" height="44"
  data-param-text="Hello world"
  data-param-url="https://example.com/">
</amp-social-share>
```

LinkedIn 是预配置的提供商之一，因此您无需提供 `data-share-endpoint` 属性。

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type（必需）</strong></td>
    <td>选择提供商类型。该属性对预配置的提供商和未配置的提供商而言都是必需的。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>指定要在其中打开目标的目标。对于 iOS 上的电子邮件/短信，默认目标设置为 <code>&#95;top</code>，其他所有情况的默认值均为 <code>&#95;blank</code>。
        请注意，我们建议仅针对电子邮件使用此替换值。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td>此属性是<strong>未配置提供商的必需项</strong>。
        <br>
          一些热门提供商具有预配置的分享端点。如需了解详情，请参阅<a href="#pre-configured-providers">预配置的提供商</a>部分。对于未配置的提供商，您需要指定分享端点。</td>
        </tr>
        <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td>所有带 <code>data-param-*</code> 前缀的属性都会变成网址参数并传递到分享端点。</td>
        </tr>
      </table>

## 预配置的提供商 <a name="pre-configured-providers"></a>

`amp-social-share` 组件提供了[一些预配置的提供商](0.1/amp-social-share-config.js)，这些提供商知道其分享端点及部分默认参数。

<table>
  <tr>
    <th class="col-twenty">提供商</th>
    <th class="col-twenty">类型</th>
    <th>参数</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">Web Share API</a>（触发操作系统分享对话框）</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>：可选项，默认为“当前网页标题”</li>
        <li><code>data-mode</code>：可选项；如果设为 <code>replace</code>，则会移除所有其他分享选项。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>电子邮件</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>：可选项，默认为“当前网页标题”</li>
        <li><code>data-param-body</code>：可选项，默认为“<code>rel=canonical</code> 网址”</li>
        <li><code>data-param-recipient</code>：可选项，默认为 ''（空字符串）</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>：<strong>必需项</strong>，默认为“无”。此参数是 Facebook <code>app_id</code>，它是 <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">Facebook 分享对话框</a>所必需的。</li>
        <li><code>data-param-href</code>：可选项，默认为“<code>rel=canonical</code> 网址”</li>
        <li><code>data-param-quote</code>：可选项，可用于分享引文或文本。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>：可选项，默认为“<code>rel=canonical</code> 网址”</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>：可选项（但强烈建议设置该选项），默认为“无”。要在 Pinterest 上分享的媒体的网址。如果未设置，则最终用户需要通过 Pinterest 上传媒体。</li>
        <li><code>data-param-url</code>：可选项，默认为“<code>rel=canonical</code> 网址”</li>
        <li><code>data-param-description</code>：可选项，默认为“当前网页标题”</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Google+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>：可选项，默认为“<code>rel=canonical</code> 网址”</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>：可选项，默认为“<code>rel=canonical</code> 网址”</li>
        <li><code>data-param-text</code>：可选项，默认为“当前网页标题”</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>：可选项，默认为“<code>rel=canonical</code> 网址”</li>
        <li><code>data-param-text</code>：可选项，默认为“当前网页标题”</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>WhatsApp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>：可选项，默认为“当前网页标题 - 当前网页网址”</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>：可选项，默认为“<code>rel=canonical</code> 网址”</li>
        <li><code>data-param-text</code>：可选项，默认为“当前网页标题”</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>短信</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>：可选项，默认为“<code>rel=title - rel=canonical</code> 网址”</li></ul>
      </td>
    </tr>
  </table>

## 未配置的提供商 <a name="non-configured-providers"></a>

除了预配置的提供商之外，您还可以通过在 `amp-social-share` 组件中指定其他属性来使用未配置的提供商。

**示例：为未配置的提供商创建分享按钮**

下面的示例通过将 `data-share-endpoint` 属性设为 Facebook Messenger 自定义协议的正确端点，通过 Facebook Messenger 创建分享按钮。

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

由于这些提供商未预先配置，因此您需要为提供商创建相应的按钮图片和样式。

## 样式 <a name="styles"></a>

### 默认样式 <a name="default-styles"></a>

默认情况下，`amp-social-share` 包含一些热门的预配置提供商。这些提供商的按钮样式与提供商的官方颜色和徽标样式一致。默认宽度为 60 像素，默认高度为 44 像素。

[tip type="ll callout('提示：</b><a class="type_success"]
如需了解您可以在 AMP 网页中使用的已预设样式的自适应分享链接，请访问 [AMP Start](https://ampstart.com/components#links-and-sharing)。
[/tip]

### 自定义样式 <a name="custom-styles"></a>

有时，您可能希望使用您自己的样式。您可以通过下述方式将默认样式替换为您的自定义样式：
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## 变量替换 <a name="variable-substitution"></a>

您可以在 `<amp-social-share>` 元素中使用[全局 AMP 变量替换](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)。在下面的示例中，`TITLE` 替换为网页标题，`CANONICAL_URL` 替换为文档的规范网址。

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-social-share 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-social-share/validator-amp-social-share.protoascii)。
