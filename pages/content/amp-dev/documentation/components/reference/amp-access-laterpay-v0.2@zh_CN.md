---
$title: amp-access-laterpay
$category@: dynamic-content
teaser:
  text: 可让发布商轻松集成 LaterPay 微支付平台。
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



可让发布商轻松集成 [LaterPay](https://www.laterpay.net) 微支付平台。`amp-access-laterpay` 基于 [AMP Access](amp-access.md)，而且必须使用该组件。

<table>
  <tr>
    <td class="col-fourty"><strong>必需的脚本</strong></td>
    <td>
      <small>请注意，您需要“amp-access-laterpay”、“amp-access”和“amp-analytics”的脚本。</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://cdn.ampproject.org/v0/amp-access-laterpay-0.2.js"></script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-access-laterpay/">amp-access-laterpay</a> 示例（带注释）。</td>
  </tr>
</table>


## 行为 <a name="behavior"></a>

[LaterPay](https://laterpay.net) 是一个微支付平台，用户只需点击两次即可购买任何在线内容，并立即获得访问权限，无需预先注册，也无需提供个人数据或付款。仅当用户在各网站的购物总额达到 5 美元或 5 欧元时，他们才需要付款。内容提供商可以销售单项商品或限时访问权限，以便用户按固定费率或按规定的时间访问内容。

如果您要通过 [Connector Script 集成](https://docs.laterpay.net/connector/)来集成 LaterPay，将无法在 AMP 网页上使用该集成。`amp-access-laterpay` 与 Connector Script 类似，可提供一组类似的功能，但只适用于 AMP 网页。

您也可以通过 LaterPay 销售内容，只需使用 `amp-access-laterpay` 作为唯一集成方法即可。

`amp-access-laterpay` 组件在内部使用 AMP Access 来提供与 AMP Access 类似的行为，但它进行了量身定制，可与 LaterPay 服务搭配使用。

如果您有自己的付费墙服务，并希望将其与 AMP Access 搭配使用，而且希望在同一网页上将其与 LaterPay 一起使用，那么[也可以这样做](#using-amp-access-laterpay-together-with-amp-access)。

`amp-access-laterpay` 组件不需要授权或 pingback 配置，因为它已预先配置为与 LaterPay 服务一起使用。该组件也不需要手动设置登录链接。

您可以在发布商的 LaterPay 帐号中配置不同的购买选项，该组件将检索相应配置并创建可用购买选项的列表。

您可以参阅有关如何配置 [LaterPay Connector](https://docs.laterpay.net/connector/configuration/)（LaterPay 的现有前端集成）的文档，了解如何配置购买选项。

可以根据发布商的偏好对生成的列表进行样式设置以及呈现该列表。

该组件还依赖于 [Access Content Markup](amp-access.md#access-content-markup) 来显示和隐藏内容。

## 配置 <a name="configuration"></a>

配置与 AMP Access 类似，但不需要授权、pingback 和登录链接。

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>

```

您可以在 `laterpay` 配置对象中设置以下值：

<table>
  <tr>
    <th class="col-fourty">属性</th>
    <th class="col-twenty">值</th>
    <th class="col-fourty">说明</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>CSS 选择器（<strong>必需</strong>）</td>
    <td>一种 CSS 选择器，用于确定网页中包含文章标题的元素。这将确保在购买文章时呈现的网页包含此标题，以便用户了解他们购买的内容。</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>以英文逗号分隔的标识符列表</td>
    <td>默认情况下，系统会使用文章的网址将文章与购买选项进行匹配，但您可以在 LaterPay Connector 界面中设置文章 ID，然后使用 <code>articleId</code> 属性将文章与购买选项相匹配，而不是指定购买选项的网址路径。
      <br>
        如果不能足够灵活地按照文章的网址来匹配购买选项，则有必要使用此属性。请参阅 <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">LaterPay Connector() 的配置页面</a>，了解展示了此属性的实用性的一些示例场景。</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>用于动态付款配置的 JWT 令牌</td>
        <td>通过此选项，您可以借助配置为可用付费内容指定已签名的 JSON 网络令牌。这意味着，您可以提供一种在网页中以编程方式生成的页内配置，而不是在 LaterPay 的 Connector 管理界面上手动指定配置。在为很多不同的文章配置“单次购买”时，这可能会特别有用。
          <br>
            如果您想详细了解如何创建此令牌以及可以在其中指定哪些内容，请参阅 LaterPay 的 <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">JWT Paid Content API</a> 文档中有关 Connector Script 集成的内容。
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>字符串</td>
          <td>指定适合相应语言区域的价格格式样式。</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>对象</td>
          <td>允许发布商对生成的购买选项列表中的文字进行自定义或本地化。如需了解详情，请参阅<a href="#localization">本地化</a>部分。</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>布尔值</td>
          <td>如果值为 true，则在授权流程成功后将网页滚动到顶部。如果对话框的显示位置位于网页上很靠下的地方，用户在返回该网页后可能对当前滚动位置感到困惑，那么此属性将非常有用。</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>字符串</td>
          <td>指定您是位于 <code>eu</code> 还是 <code>us</code> <a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">LaterPay 区域</a>。</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>布尔值</td>
          <td>仅在使用沙盒模式测试服务器配置时才需要此属性。此外，您还需要使用 AMP 的<a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">开发模式</a>。</td>
        </tr>
      </table>

## 使用 Access Content Markup 以及显示购买列表 <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

Access Content Markup 的使用方式应与 AMP Access 的使用方式相同。

当用户无权查看相应文章时，ID 为 `amp-access-laterpay-dialog` 的元素将呈现购买选项列表。该列表具有一些非常基本的样式，您可以对该列表进行自定义，使其显示在发布商的网页中时看起来更加和谐。

如果您要使用默认样式，请务必添加 `amp-access-laterpay` 类。

```html
<section amp-access="NOT error AND NOT access" amp-access-hide="">
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  Oops... Something broke.
</section>

<div amp-access="access" amp-access-hide="">
  <p>...article content...</p>
</div>

```

## 样式设置 <a name="styling"></a>

系统会对生成的标记中的一些元素应用多个类。可以通过 CSS 元素选择器明确引用未应用类的元素。

已存在一些基本布局 CSS，但建议发布商根据自己网页的外观和风格来设置其样式。

为对话框创建的结构如下所示：

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Optional, appears if header locale message is defined.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">Purchase option title</span>
              <p class="amp-access-laterpay-description">Purchase option description</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">0.15</span>
            <sup class="amp-access-laterpay-currency">USD</sup>
          </p>
        </li>
        <!-- ... 其他购买选项对应的更多列表项 ... -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">Buy Now</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="…">I already bought this</a>
      </p>
      <p class="amp-access-laterpay-footer">
        Optional, appears if footer locale message is defined.
      </p>
    </div>
    <p class="amp-access-laterpay-badge">Powered by <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
  </div>

```

## 本地化 <a name="localization"></a>

对话框中针对购买选项显示的文字将由发布商在 LaterPay Connector 界面中指定。

其余文字是扩展组件的一部分，可以通过如下配置选项进行更改和本地化：

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

以下消息键可以进行转换或自定义，但请注意，这些键应保留其原有含义和意图。

<table>
  <tr>
    <th class="col-fourty">键</th>
    <th class="col-fourty">说明</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>购买按钮中显示的文字，表示可以稍后付款的选项。</td>
    <td>“Buy Now, Pay Later”</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>购买按钮中显示的文字，表示必须在购买时付款的选项。</td>
    <td>“Buy Now”</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>在选择任何选项之前，购买按钮中显示的默认文字。</td>
    <td>“Buy Now”</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>如果用户曾经购买过相应文章，但丢失了 Cookie（或者是使用其他设备购买的），则可以使用该链接登录到 LaterPay 并检索其购买交易。</td>
    <td>“I already bought this”</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>标题文字（可选）。</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>页脚文字（可选）。</td>
    <td></td>
  </tr>
</table>

## 分析 <a name="analytics"></a>

由于 `amp-access-laterpay` 基于 `amp-access`，因此它支持 `amp-access` 发送的所有[分析事件](amp-access.md#integration-with-amp-analytics)。

如果您想通过更完整的示例来了解这在实践中会是什么样子，请参阅 [https://ampexample.laterpay.net/](https://ampexample.laterpay.net/) 中的示例，它们均配置为发送这些分析事件。

## 结合使用 AMP Access LaterPay 和 AMP Access <a name="using-amp-access-laterpay-together-with-amp-access"></a>

如果您已有订阅系统，且打算仅将 LaterPay 用于单个文章销售，则可以在同一网页中同时使用两种销售方法，即同时使用 AMP Access 和 AMP Access LaterPay。

首先，请参阅 [AMP Access](amp-access.md) 文档，了解如何使用现有的付费墙配置 AMP Access。

[多个提供商](amp-access.md#multiple-access-providers)部分介绍了如何使用命名空间设置多个提供商。

将该组件与 LaterPay 和现有的付费墙集成结合使用时，必要的配置大致如下所示：

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

内容访问标记最终可能如下所示：

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Login here to access your PublisherName subscription.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  Oops... Something broke.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...article content...</p>
</div>

```

如需查看更完整的示例，请访问 [https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html)

## 相关文档 <a name="related-documentation"></a>

* [AMP Access](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay：我们如何进行微支付](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay Connector](https://connectormwi.laterpay.net/docs/index.html) - 与 AMP Access LaterPay 类似，但适用于非 AMP 网页。

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-access-laterpay 规则](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii)。
