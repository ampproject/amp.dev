---
$title: amp-analytics
$category@: ads-analytics
teaser:
  text: 从 AMP 文档获取分析数据。
---


<!--
Copyright 2019 The AMP HTML Authors. All Rights Reserved.

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



从 AMP 文档获取分析数据。

<table>
  <tr>
    <td class="col-fourty"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-analytics/">amp-analytics 示例</a>。</td>
  </tr>
</table>


## 将分析数据发送到供应商还是内部？ <a name="sending-analytics-to-a-vendor-or-in-house"></a>

开始对您的网站使用 AMP 分析组件之前，您需要决定是要使用第三方分析工具来分析用户互动情况，还是使用您自己的内部解决方案。

[tip type="read-on"]
参阅[配置分析工具](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md)指南，全面了解 AMP 分析。
[/tip]

### 将数据发送到分析服务供应商 <a name="analytics-vendors"></a>

AMP 分析的设计宗旨是“一次衡量，多方报告”。如果您已在与一个或多个分析服务供应商合作，请查阅[分析服务供应商](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md)列表，看看他们是否已将自己的解决方案与 AMP 集成。

对于已集成 AMP 的分析服务供应商：

1. 在 `<amp-analytics>` 标记中，添加 `type` 属性，并将其值设为指定的[供应商](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md)。
1. 确定要捕获和跟踪哪些数据，并在配置数据中指定这些详细信息。有关如何捕获分析数据的说明，请参阅供应商的文档。

如果分析服务供应商未集成 AMP，请与其联系以寻求支持。另外，我们建议您在 AMP 项目中创建一个问题，以请求添加相应供应商。另请参阅[在 AMP HTML 中集成您的分析工具](../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md)。您也可以与供应商合作，以将数据发送到他们指定的网址。如需了解详情，请参阅下面的[在内部发送数据](#sending-data-in-house)部分。

*示例：将数据发送到第三方分析服务提供商*

在以下示例中，分析数据会发送到 Nielsen（已集成 AMP 的第三方分析服务提供商）。如需详细了解如何为 Nielsen 配置分析数据，请参阅 [Nielsen](https://engineeringportal.nielsen.com/docs/DCR_Static_Google_AMP_Cloud_API) 文档。

```html
<amp-analytics type="nielsen">
    <script type="application/json">
    {
      "vars": {
        "apid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "apv": "1.0",
        "apn": "My AMP Website",
        "section": "Entertainment",
        "segA": "Music",
        "segB": "News",
        "segC": "Google AMP"
      }
    }
    </script>
</amp-analytics>
```

### 将数据发送到内部 <a name="sending-data-in-house"></a>

如果您有自己的内部解决方案可用于衡量用户互动情况，那么您只需要一个网址，即可将 AMP 分析与该解决方案集成。您的数据将发送到该网址。您也可以将数据发送到多个网址。例如，您可以将网页浏览数据发送到一个网址，将社交互动数据发送到另一个网址。

[tip type="note"]
如果您的内部解决方案涉及使用未集成 AMP 的分析服务供应商，请与该供应商合作，以确定所需的配置信息。
[/tip]

要将数据发送到特定网址，请执行以下操作：

1. 确定要捕获和跟踪哪些数据，并[在配置数据中指定这些详细信息](#specifying-configuration-data)。
1. 在 [`requests`](#requests) 配置对象中，指定要跟踪哪种类型的请求（例如网页浏览、触发的特定事件）以及要将跟踪数据发送到哪个（哪些）网址。

[tip type="note"]
在处理分析请求的引荐来源网址标头中包含的 AMP 网址时，请剔除或忽略 `usqp` 参数。该参数供 Google 用于触发针对 Google AMP 缓存的实验。
[/tip]

*示例：将数据发送到网址*

下面是一个用于跟踪网页浏览情况的简单示例。每当相应网页可见时，触发器事件就会触发，并且会将网页浏览数据和随机 ID 一起发送到指定的网址。

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```

  [tip type="success"]
对于一些常见的跟踪用例（例如网页浏览、网页点击、滚动等），请参阅[分析：用例](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/use_cases.md)。
[/tip]

## 指定配置数据 <a name="specifying-configuration-data"></a>

在 `<amp-analytics>` 元素中，您可以指定一个 JSON 配置对象，并在其中详细指明要衡量哪些内容，以及要将分析数据发送到何处。

`<amp-analytics>` 的配置对象使用以下格式：

```javascript
{
  "requests": {
    request-name: request-value,
    ...
  },
  "vars": {
    var-name: var-value,
    ...
  },
  "extraUrlParams": {
    extraurlparam-name: extraurlparam-value,
    ...
  },
  "triggers": {
    trigger-name: trigger-object,
    ...
  },
  "transport": {
    "beacon": *boolean*,
    "xhrpost": *boolean*,
    "image": *boolean*,
  }
}
```

### 内嵌或远程配置 <a name="inline-or-remote-configuration"></a>

您可以通过内嵌方式指定配置数据，也可以在 `config` 属性中指定一个网址，以便远程提取配置数据。此外，您还可以使用 `type` 属性来选择热门分析服务供应商的内置配置。

如果使用来自多个此类来源的配置数据，则配置对象（变量、请求和触发器）将按以下原则合并在一起：

1. 远程配置优先于内嵌配置，并且
1. 内嵌配置优先于供应商配置。

#### 加载远程配置 <a name="loading-remote-configuration"></a>

要加载远程配置，请在 `<amp-analytics>` 元素中指定配置数据的 `config` 属性和网址。指定的网址应使用 HTTPS 架构。该网址可以包含 [AMP 网址变量](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)。要访问 Cookie，请参阅 [`data-credentials`](#data-credentials) 属性。响应必须遵循 [AMP CORS 安全指南](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)。

在以下示例中，我们指定了 `config` 属性，以便从指定网址加载配置数据。

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

#### 配置重写器 <a name="configuration-rewriter"></a>

“配置重写器”功能旨在方便分析服务提供商以动态方式重写由用户提供的配置。该功能与“远程配置”功能类似，但在向服务器发出的请求中，还会包括所有由用户提供的配置。该功能目前只能由分析服务供应商启用。

分析服务供应商可以使用服务器网址指定 configRewriter 属性。
```js
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
    },
    ...
}
```

运行时会向供应商提供的 configRewriter 端点发送一个包含内嵌配置的请求，该内嵌配置已与用户提供的远程配置合并。供应商会利用该数据服务器端构建并返回重写后的新配置。

然后，运行时会将用户提供的所有配置合并，以便按照从高到低的优先级顺序确定最终配置：

1. 重写后的配置
1. 内嵌配置
1. 供应商定义的配置

##### 变量组 <a name="variable-groups"></a>

通过“变量组”功能，分析服务提供商可以将一组预定义的变量组合在一起，以便用户轻松启用。然后，系统会解析这些变量，并将其发送到指定的 `configRewriter` 端点。

分析服务提供商需要在 `configRewriter` 配置内创建一个新的 `varGroups` 对象，以便启用该功能。这样一来，如果发布商希望启用任何由指定的分析服务提供商创建的 `varGroups`，则可以将其添加到自己的分析配置中。可以使用 [AMP HTML 替代指南](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)中列出的所有受支持的变量。重要提示：${varName} 变体将无法使用。**

例如，供应商的配置可能如下所示：
```js
// 这由供应商预定义。
export const VENDOR_ANALYTICS_CONFIG = {
    ...
    'configRewriter': {
      'url': 'https://www.vendor.com/amp-config-rewriter',
      'varGroups' : {
        'group1': {
          'referrer': 'DOCUMENT_REFERRER',
          'source': 'SOURCE_URL',
        'group2': {
          'title': 'TITLE',
        },
      },
    },
  },
    ...
}
```

您可以在提供商的 `<amp-analytics>` 配置中为指定的 `varGroups` 添加 `{enabled: true}`，借此指定启用哪些变量组。`enabled` 是保留关键字，不能用作变量名称。

在下面的示例中，`group1` 和 `group2` 均已启用。系统将忽略未明确启用的所有组。然后，运行时会解析所有这些已启用的变量，并将其合并到一个将发送到配置重写器网址的 `configRewriter.vars` 对象中。

```html
  /* 包含在发布商页面上 */
  <amp-analytics type="myVendor" id="myVendor" data-credentials="include">
    <script type="application/json">
    {
      "configRewriter": {
        "varGroups": {
          "group1": {
            "enabled": true
          },
          "group2": {
            "enabled": true
          }
        }
      }
    }
    </script>
  </amp-analytics>
```
  在本例中，请求正文将如下所示：
```json
  /* 已发送到配置重写器服务器。*/
  "configRewriter": {
    "vars": {
      "referrer": "https://www.example.com",
      "source": "https://www.amp.dev",
      "title": "Cool Amp Tips"
    }
  }
  ```

### 配置数据对象 <a name="configuration-data-objects"></a>

#### 请求 <a name="requests"></a>

`requests` 配置对象用于指定向分析平台传输数据时使用的网址，以及相应请求的批处理或报告行为。`request-name` 用于指定在发生特定事件（例如 `pageview`、`event` 等）时应发送的请求。`request-value` 包含一个 https 网址，该值可以包含可引用其他请求或变量的占位符令牌。`request-value` 也可以是包含可选请求配置的对象。

##### 请求配置 <a name="request-configs"></a>

使用对象定义请求时用到的属性如下：

- `baseUrl`：用于定义相应请求的网址（必需）。
- `reportWindow`：可选属性，用于指定停止报告请求的时间（以秒为单位）。具有以下设置的触发器会覆盖最大报告期限：`important: true`。

在本例中，所有请求均有效。

```javascript
"requests": {
  "base": "https://example.com/analytics?a=${account}&u=${canonicalUrl}&t=${title}",
  "pageview": {
    "baseUrl": "${base}&type=pageview"
  },
  "event": {
    "baseUrl": "${base}&type=event&eventId=${eventId}",
    "batchInterval": 5,
    "reportWindow" : 30
  }
}
```

有些分析服务提供商已经提供了可供您通过 `type` 属性使用的配置。如果您在使用某个分析服务提供商，则可能无需添加请求信息。请参阅供应商的文档，了解是否需要对请求进行配置以及如何配置。

##### 批处理配置 <a name="batching-configs"></a>

为了减少请求 ping 的数量，您可以在请求配置中指定批处理行为。使用相同请求的 `triggers` 中的所有 [`extraUrlParams`](#extra-url-params) 都会附加到相应请求的 `baseUrl`。

批处理属性如下：
- `batchInterval`：此属性用于指定对批处理队列中的请求 ping 进行刷新的时间间隔（以秒为单位）。`batchInterval` 可以是一个数字，也可以是一个数字数组（最小时间间隔为 200 毫秒）。请求将遵从数组中的每个值，然后在到达数组末尾时重复最后一个间隔值（或单个值）。

例如，以下配置每 2 秒发出一个请求 ping，其中一个示例请求 ping 如下所示：`https://example.com/analytics?rc=1&rc=2`。
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": 2,
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

以下配置会在 1 秒后发出第一个请求 ping，然后每隔 3 秒发出一个请求。第一个请求 ping 如下所示：`https://example.com/analytics?rc=1`，第二个请求 ping 如下所示：`https://example.com/analytics?rc=2&amp;rc=3&amp;rc=4`。
```javascript
"requests": {
  "timer": {
    "baseUrl": "https://example.com/analytics?",
    "batchInterval": [1, 3],
  }
}
"triggers": {
  "timer": {
    "on": "timer",
    "request" : "timer",
    "timerSpec": {
      "interval": 1
    },
    "extraUrlParams": {
      "rc": "${requestCount}"
    }
  }
}
```

#### 变量 <a name="vars"></a>

`amp-analytics` 组件定义了很多可在请求中使用的基本变量。[`amp-analytics` 变量指南](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md)中提供了所有此类变量的列表。此外，该组件还支持 [AMP HTML 替代指南](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)中列出的所有受支持的变量。

`vars` 配置对象可用于定义新的键值对，或用于覆盖可在 `request` 值中引用的现有变量。新变量通常用于指定发布商专用信息。可以使用数组指定应单独进行网址编码（保留英文逗号分隔符）的一系列值。

```javascript
"vars": {
  "account": "ABC123",
  "countryCode": "tr",
  "tags": ["Swift,Jonathan", "Gulliver's Travels"]
}
```

#### 额外的网址参数 <a name="extra-url-params"></a>

`extraUrlParams` 配置对象用于指定要包含在请求中的其他参数。默认情况下，额外的网址参数会通过常见的“&amp;foo=baz”惯例附加到请求网址的查询字符串中。

在以下示例中，会向请求附加 `&amp;a=1&amp;b=2&amp;c=3`：

```javascript
"extraUrlParams": {
  "a": "1",
  "b": "2",
  "c": "3"
}
```

如果启用了 `useBody` 且通过 `beacon` 或 `xhrpost` 传输方法发送请求，则可以通过请求正文（而非网址）发送 `extraUrlParams`。在这种情况下，参数不会进行网址编码或展平。如需了解更多详情，请参阅[使用正文发送额外的网址参数](#use-body-for-extra-url-params)。

`extraUrlParamsReplaceMap` 属性用于指定键和值的映射，该映射将作为 `String.replace()` 的参数，以预处理 `extraUrlParams` 配置中的键。例如，如果 `extraUrlParams` 配置定义了 `"page.title": "The title of my page"`，而 `extraUrlParamsReplaceMap` 定义了 `"page.": "_p_"`，则 `&_p_title=The%20title%20of%20my%20page%20` 将附加到请求中。

无需 `extraUrlParamsReplaceMap` 便可使用 `extraUrlParams`。如果未定义 `extraUrlParamsReplaceMap`，则不会发生字符串替换，且 `extraUrlParams` 中定义的字符串将按原样使用。

如果启用了 `useBody` 且通过 `beacon` 或 `xhrpost` 传输方法发送请求，则仅对 `extraUrlParams` 中的顶层键执行 `extraUrlParamsReplaceMap` 字符串替换。

#### 触发器 <a name="triggers"></a>

`triggers` 配置对象用于描述何时应发送分析请求。`triggers` 属性包含一个由触发器名称和触发器配置组成的键值对。触发器名称可以是由字母数字字符 (a-zA-Z0-9) 组成的任何字符串。如果存在同名触发器，来源配置优先级较低的触发器会被来源配置优先级较高的触发器覆盖。

* `on`：（必需）要监听的事件。有效值为 `render-start`、`ini-load`、`click`、`scroll`、`timer`、`visible`、`hidden`、`user-error`、[`access-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md) 和 [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)。
* `request`：（必需）要发送的请求的名称（如 `requests` 部分中所指定）。
* `vars`：一个对象，其中包含一些键值对，这些键值对用于覆盖在顶层配置中定义的 `vars`，或指定该触发器的专属变量。
* `important`：可以指定该设置，以处理支持批处理行为或报告期的请求。如果将 `important` 设为 `true`，则可以使用某些特定触发器来刷新批处理请求队列。在这种情况下，可以在不丢失重要触发器事件的情况下减少请求 ping 的数量。如果将 `important` 设为 `true`，还可以覆盖相应请求的 `reportWindow` 值，以便发出重要的请求 ping。
* `selector` 和 `selectionMethod`：可以为某些触发器（例如 `click` 和 `visible`）指定这些设置。如需了解详情，请参阅[元素选择器](#element-selector)。
* `scrollSpec`：（`on` 设为 `scroll` 时，必须提供该配置）该配置与 `scroll` 触发器结合使用。如需了解详情，请参阅下文。
* `timerSpec`：（`on` 设为 `timer` 时，必须提供该配置）该配置与 `timer` 触发器结合使用。如需了解详情，请参阅下文。
* `sampleSpec`：该对象用于定义在发送请求之前如何对请求进行抽样。该设置允许根据随机输入或平台支持的其他变量进行抽样。该对象包含相应配置，以指定用于生成哈希的输入和哈希必须满足的阈值。
    * `sampleOn`：系统会通过填充平台变量对该字符串模板进行扩展，然后再对其进行哈希处理，以生成一个供抽样逻辑（在下文中的阈值部分进行了介绍）使用的数字。
    * `threshold`：该配置用于过滤掉不符合特定条件的请求 - 对于发送到分析服务供应商的请求，以下逻辑应为 true `HASH(sampleOn) < threshold`。</li>
* `videoSpec`：（`on` 设为 `video-*` 时，需要使用该配置）该配置与 [`video-*`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md) 触发器结合使用。

例如，以下配置可用于根据随机输入从请求中抽取 50% 的样本，或者根据客户端 ID 按 1% 进行抽样。

```javascript
'triggers': {
  'sampledOnRandom': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${random}',
      'threshold': 50,
    },
  },
  'sampledOnClientId': {
    'on': 'visible',
    'request': 'request',
    'sampleSpec': {
      'sampleOn': '${clientId(cookieName)}',
      'threshold': 1,
    },
  },
},
```

##### 元素选择器 <a name="element-selector"></a>

有些触发器（例如 `click` 和 `visible`）允许使用选择器属性指定单个元素或元素集合。不同的触发器可以对所选元素应用不同的限制和解释，例如选择器是应用于所有匹配的元素还是第一个元素，或者可以匹配哪些元素：全部元素还是仅 AMP 元素。如需了解更多详情，请参阅每个相关触发器的文档。

选择器属性如下：

- `selector`：此属性用于通过 CSS/DOM 查询查找某个元素或元素集合。可以使用 `selectionMethod` 更改关于如何匹配元素的语义。此属性的值可以是以下值之一：
    - 有效的 CSS 选择器，例如 `#ad1` 或 `amp-ad`。
    - `:root` - 一个与文档根目录匹配的特殊选择器。
- `selectionMethod`：如果指定了此值，此属性可以为以下两个值之一：`scope` 或 `closest`。如果为 `scope`，则允许在 `amp-analytics` 标记的父元素内选择元素。如果为 `closest`，则会搜索与指定选择器相符且最靠近的 `amp-analytics` 标记父级。默认值为 `scope`。

##### 嵌入内容呈现开始触发器 <a name="embed-render-start-trigger"></a>

在 iframe 中嵌入其他文档（例如广告）的 AMP 元素可能会报告呈现开始事件 (`"on": "render-start"`)。一旦可以确认嵌入的文档已开始呈现，通常就会发出此事件。请参阅特定 AMP 元素的文档，了解它是否会发出此事件。

嵌入元素的触发器必须包含指向嵌入元素的 [`selector`](#element-selector)：
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request",
    "selector": "#embed1"
  }
}
```

文档本身也会发出呈现开始事件，并且该事件可以配置为：
```javascript
"triggers": {
  "renderStart": {
    "on": "render-start",
    "request": "request"
  }
}
```

##### 初始加载触发器 <a name="initial-load-trigger"></a>

AMP 元素或 AMP 文档的初始内容加载完毕时，初始加载事件 (`"on": "ini-load"`) 便会触发。

“初始加载”是通过与容器及其初始大小的关系定义的。更具体地说：

- 对于文档：第一视口中的所有元素。
- 对于嵌入元素：嵌入文档中在嵌入元素初始大小范围内的所有内容元素。
- 对于简单的 AMP 元素（例如 `amp-img`）：资源本身，例如图片或视频。

嵌入元素或 AMP 元素的触发器必须包含指向相应元素的 [`selector`](#element-selector)：
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request",
    "selector": "#embed1"
  }
}
```

文档本身也会发出初始加载事件，并且该事件可以配置为：
```javascript
"triggers": {
  "iniLoad": {
    "on": "ini-load",
    "request": "request"
  }
}
```

##### 页面和元素可见触发器 <a name="page-and-element-visibility-trigger"></a>

使用页面可见触发器 (`"on": "visible"`)，可以在页面变为可见状态时触发请求。可以使用 `visibilitySpec` 配置该触发器的触发条件。

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
  }
}
```

可以使用 [`selector`](#element-selector) 为任何 AMP 元素或文档根目录配置元素可见触发器。当指定的元素与可使用 `visibilitySpec` 自定义的可见性参数匹配时，该触发器便会触发。

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "elementview",
    "selector": "#ad1",
    "visibilitySpec": {/* 可选的可见性规范 */}
  }
}
```

请注意，该选择器只能用于指定单个元素，而不能指定集合。元素可以是 [AMP 扩展元素](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-tag-addendum.md#amp-specific-tags)，也可以是文档根目录。

在跟踪元素可见性之前，元素可见触发器会等待通过 `visibilitySpec` 中的 `waitFor` 属性指定的信号。如果未指定 `waitFor`，则会等待元素的 [`ini-load`](#initial-load-trigger) 信号。如需了解更多详情，请参阅 `waitFor` 文档。如果指定了 `reportWhen`，该触发器会在发送事件之前等待该信号。这非常有用，比如可以在页面关闭时发送分析事件。

##### 错误触发器 <a name="error-trigger"></a>

当发生与页面作者或发布页面时所用的软件有关的错误时，便会触发用户错误事件 (`"on": "user-error"`)。这包括但不限于 AMP 组件配置错误、广告配置错误或失败的断言。开发者控制台中也会报告用户错误。

```javascript
"triggers": {
  "userError": {
    "on": "user-error",
     "request": "error"
  }
}
```
[tip type="note"]
有一个[已知问题](https://github.com/ampproject/amphtml/issues/10891)是，它仍报告来自 A4A iframe 嵌入的错误，但该错误与页面无关。
[/tip]

**<a id="visibility-spec"></a>可见性规范**

`visibilitySpec` 是一组条件和属性，可应用于 `visible` 或 `hidden` 触发器，以便在它们触发时进行更改。如果指定了多个属性，则它们必须全部为 true，才能触发请求。`visibilitySpec` 支持的配置属性如下：

- `waitFor`：此属性用于指示可见性触发器在跟踪可见性之前是否应等待特定信号。支持的值为 `none`、`ini-load` 和 `render-start`。如果 `waitFor` 未定义，则在指定了选择器时，它会默认为 [`ini-load`](#initial-load-trigger)，否则为 `none`。
- `reportWhen`：此属性用于指示可见性触发器在发送触发器之前是否应等待特定信号。唯一受支持的值为 `documentExit`。在同一个 visibilitySpec 中，不能同时使用 `reportWhen` 和 `repeat`。请注意，如果指定了 `reportWhen`，则报告将在信号发出时发送，即使当时或之前未达到可见性要求也是如此。系统将根据此 `visibilitySpec` 中的可见性要求填充所有相关变量（`totalVisibleTime` 等）。
- `continuousTimeMin` 和 `continuousTimeMax`：这些属性用于指示当元素（任何部分）位于视口内的持续时间介于指定的最小时长和最大时长之间时，应触发请求。时间以毫秒表示。如果未指定 `continuousTimeMin`，则它会默认为 0。
- `totalTimeMin` 和 `totalTimeMax`：这些属性用于指示当元素（任何部分）位于视口内的持续时间介于指定的最小时长和最大时长之间时，应触发请求。时间以毫秒表示。如果未指定 `totalTimeMin`，则它会默认为 0。
- `visiblePercentageMin` 和 `visiblePercentageMax`：这些属性用于指示当元素在视口中可见的部分所占的比例介于指定的最小百分比和最大百分比之间时，应触发请求。介于 0 到 100 之间的百分比值有效。请注意，上限 (`visiblePercentageMax`) 包含在内，下限 (`visiblePercentageMin`) 不包含在内，除非这两个边界值都设为 0 或都设为 100。如果这两个边界值都设为 0，触发器会在元素不可见时触发。如果这两个边界值都设为 100，触发器会在元素完全可见时触发。当这些属性与其他时间相关属性一起定义时，则只统计满足这些属性的时间。`visiblePercentageMin` 和 `visiblePercentageMax` 的默认值分别为 0 和 100。
- `repeat`：如果此属性设为 `true`，则每次满足 `visibilitySpec` 条件时，触发器都会触发。在下面的示例中，如果元素滚动到 51% 位于视图中，然后是 49%，之后又恢复到 51%，则触发器会触发两次。不够，如果 `repeat` 为 `false`，则触发器触发一次。`repeat` 的默认值为 `false`。在同一个 visibilitySpec 中，不能同时使用 `reportWhen` 和 `repeat`。

```javascript
visibilitySpec: {
  visiblePercentageMin: 50,
  repeat: true,
  }
```

`visiblePercentageThresholds` 可用作创建多个 `visibilitySpec` 实例（仅 `visiblePercentageMin` 和 `visiblePercentageMax` 有所不同）的便捷方式。例如，以下内容具有同等的效果：

```javascript
// 两个满足 visibilitySpecs 的触发器，仅在 visiblePercentageMin 和 visiblePercentageMax 中有所不同：
"triggers": {
  "pageView_30_to_40": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 30,
      "visiblePercentageMax": 40,
      "continuousTimeMin": 1000,
    }
  }

  "pageView_40_to_50": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageMin": 40,
      "visiblePercentageMax": 50,
      "continuousTimeMin": 1000,
    }
  }
}

// 一个触发器，相当于上述两个触发器：
"triggers": {
  "pageView": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "visiblePercentageThresholds": [[30, 40], [40, 50]],
      "continuousTimeMin": 1000,
    }
  }
}
```

除上述条件外，`visibilitySpec` 还会启用[此处](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#visibility-variables)记录的特定变量。

```javascript
"triggers": {
  "defaultPageview": {
    "on": "visible",
    "request": "pageview",
    "selector": "#ad1",
    "visibilitySpec": {
      "waitFor": "ini-load",
      "reportWhen": "documentExit",
      "visiblePercentageMin": 20,
      "totalTimeMin": 500,
      "continuousTimeMin": 200
    }
  }
}
```

除了作为触发器的一部分提供的变量外，您还可以为变量指定附加值/替换值（作为[数据属性](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute)）。如果使用了这些数据属性，它们必须是作为 [`selector`](#element-selector) 指定的元素的一部分。

##### 点击触发器 <a name="click-trigger"></a>

使用点击触发器 (`"on": "click"`)，可以在用户点击指定元素时触发请求。可以使用 [`selector`](#element-selector) 控制哪些元素会导致触发该请求。该触发器将针对与指定的选择器匹配的所有元素进行触发。

```javascript
"vars": {
  "id1": "#socialButtonId",
  "id2": ".shareButtonClass"
},
"triggers": {
  "anchorClicks": {
    "on": "click",
    "selector": "a, ${id1}, ${id2}",
    "request": "event",
    "vars": {
      "eventId": 128
    }
  }
}
```

除了作为触发器的一部分提供的变量外，您还可以为变量指定附加值/替换值（作为[数据属性](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute)）。如果使用了这些数据属性，它们必须是作为 `selector` 指定的元素的一部分。

##### 滚动触发器 <a name="scroll-trigger"></a>

使用滚动触发器 (`"on": "scroll"`)，可以在用户滚动页面时在特定条件下触发请求。该触发器提供了一些[特殊变量](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#interaction)，用于指示发送请求的触发边界。可以使用 `scrollSpec` 控制请求何时触发：
- `scrollSpec`：该对象可以包含 `verticalBoundaries` 和 `horizontalBoundaries`，而且必须至少包含这两个属性中的一个，才能触发滚动事件。这两个属性的值都应是包含边界（达到相应边界时，才会生成滚动事件）的数字数组。例如，在以下代码段中，当页面垂直滚动 25%、50% 和 90% 时，将会触发滚动事件。此外，当页面水平滚动至滚动宽度的 90% 时，也会触发该事件。为了使页面保持高效，滚动边界会四舍五入为最接近的 `5` 倍数。

```javascript
"triggers": {
  "scrollPings": {
    "on": "scroll",
    "scrollSpec": {
      "verticalBoundaries": [25, 50, 90],
      "horizontalBoundaries": [90]
    },
    "request": "event"
  }
}
```

##### 计时器触发器 <a name="timer-trigger"></a>

使用计时器触发器 (`"on": "timer"`)，可以按一定的时间间隔触发请求。可以使用 `timerSpec` 控制请求何时触发：

- `timerSpec`：`timer` 类型的触发器的规范。除非指定了 `startSpec`，否则计时器会立即触发（默认情况；可以取消设置），之后会按照指定的时间间隔触发。
    - `interval`：计时器的时间间隔长度，以秒为单位。
    - `maxTimerLength`：将触发计时器的最长持续时间，以秒为单位。达到 `maxTimerLength` 时，将触发其他请求。默认值为 2 个小时。如果存在 `stopSpec`，但未指定 maxTimerLength，则默认值为无穷大。
    - `immediate`：是否立即触发计时器。这是一个布尔值，默认为 true

```javascript
"triggers": {
  "pageTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 10,
      "maxTimerLength": 600
    },
    "request": "pagetime"
  }
}
```

要配置用于计算用户事件使用时间的计时器，请使用以下属性：

- `startSpec`：计时器启动时触发的规范。可以使用 `on` 和 `selector` 的值跟踪特定事件。若配置包含 `startSpec`，但不包含 `stopSpec`，则只有在达到 `maxTimerLength` 时，才会停止。
- `stopSpec` 计时器停止时触发的规范。若配置包含 `stopSpec`，但不包含 `startSpec`，则会立即启动，只有在遇到指定事件时才会停止。

```javascript
"triggers": {
  "videoPlayTimer": {
    "on": "timer",
    "timerSpec": {
      "interval": 5,
      "startSpec": {
        "on": "video-play",
        "selector": "amp-video"
      },
      "stopSpec": {
        "on": "video-pause",
        "selector": "amp-video"
      }
    },
    "request": "videoRequest"
  }
}
```

如需详细了解如何创建嵌套计时器触发器，请参阅[触发器](#triggers)规范。请注意，不允许使用计时器触发器来启动或停止计时器。

##### 隐藏触发器 <a name="hidden-trigger"></a>

使用隐藏触发器 (`"on": "hidden"`)，可以在页面隐藏时触发请求。

```javascript
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
  }
}
```

可以添加 [`visibilitySpec`](#visibility-spec)，以便只有在满足可见性持续时间条件时，才触发请求。
```json
"triggers": {
  "defaultPageview": {
    "on": "hidden",
    "request": "pagehide",
    "visibilitySpec": {
      "selector": "#anim-id",
      "visiblePercentageMin": 20,
      "totalTimeMin": 3000,
    }
  }
}
```
以上配置意味着：

<blockquote>
当页面隐藏时，如果元素 #anim-id 可见（占视口面积 20% 以上）总时长超过 3 秒，则触发请求。
</blockquote>

##### 访问触发器 <a name="access-triggers"></a>

AMP 访问系统会针对访问流程中的不同状态发出大量事件。如需详细了解访问触发器 (`"on": "access-*"`)，请参阅 [AMP 访问和分析](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md)。

#### 视频分析触发器 <a name="video-analytics-triggers"></a>

视频分析提供了多个触发器 (`"on": "video-*"`)，供发布商用于跟踪视频生命周期内发生的不同事件。如需了解更多详情，请参阅 [AMP 视频分析](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)。

#### 传输 <a name="transport"></a>

`transport` 配置对象用于指定如何发送请求。该值是一个对象，其中包含用于指示哪些传输方法可接受的字段。

* `beacon`：用于指示可以使用 [`navigator.sendBeacon`](https://developer.mozilla.org/zh-cn/docs/Web/API/Navigator/sendBeacon) 传输请求。该方法会发送带有凭据的 POST 请求。除非 `useBody` 为 true，否则请求在发送时正文为空。如需详细了解 `useBody`，请参阅[使用正文发送额外的网址参数](#use-body-for-extra-url-params)。
* `xhrpost`：用于指示可以使用 `XMLHttpRequest` 传输请求。该方法会发送带有凭据的 POST 请求。除非 `useBody` 为 true，否则请求在发送时正文为空。如需详细了解 `useBody`，请参阅[使用正文发送额外的网址参数](#use-body-for-extra-url-params)。
* `image`：用于指示可通过生成 `Image` 标记来发送请求。该方法会发送一个 GET 请求。要防止出现由于响应为空或请求失败而导致的控制台警告，请设置 `"image": {"suppressWarnings": true}`。

经 MRC 认证的供应商可以使用第四种传输机制，即“iframe 传输”，具体方法是向 iframe-transport-vendors.js 添加网址字符串。这意味着应创建一个 iframe，并将其 `src` 属性设为此网址。这样一来，请求就会通过 `window.postMessage()` 发送到该 iframe。在这种情况下，请求不必是完整的网址。`iframe` 只能在 `iframe-transport-vendors.js` 中指定，而不能内嵌在 `amp-analytics` 标记中，也不能通过远程配置指定。此外，供应商帧可以发送响应，以供 amp-ad-exit 使用。请参阅 [analytics-iframe-transport-remote-frame.html](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html) 和 [fake_amp_ad_with_iframe_transport.html](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html)：前一个文件用于发送 {'collected-data': 'abc'} 的响应 JSON 对象，后一个文件则使用该对象将最终网址中的 'abc' 替换为 'bar_'。

如果启用了上述中的多种传输方法，则优先顺序为 `iframe` &gt; `beacon` &gt; `xhrpost` &gt; `image`。系统只会使用一种传输方法，即允许使用、可用且优先级最高的传输方法。如果客户端的用户代理不支持某种方法，系统会使用已启用且优先级次高的方法。默认情况下，上述全部四种方法均处于启用状态。

在以下示例中，`iframe` 网址未指定，`beacon` 和 `xhrpost` 设为了 `false`，因此，虽然这两种方法的优先级均高于 `image`，但系统不会使用它们。默认情况下，`image` 会被设为 `true`，但在此示例中对其进行了明确声明。如果客户端的用户代理支持 `image` 方法，系统便会使用该方法；否则，不会发送任何请求。

```javascript
"transport": {
  "beacon": false,
  "xhrpost": false,
  "image": true
}
```

如需了解详情，请参阅[这个关于实现 iframe 传输客户端 API 的示例](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport-remote-frame.html)以及[这个包含该 iframe 的示例页面](https://github.com/ampproject/amphtml/blob/main/examples/analytics-iframe-transport.amp.html)。该示例会加载一个包含 `amp-analytics` 标记的[虚假广告](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad-network-fake-impl/0.1/data/fake_amp_ad_with_iframe_transport.html)。请注意，虚假广告内容包含一些必须遵循的额外配置说明。

##### 使用正文发送额外的网址参数 <a name="use-body-for-extra-url-params"></a>

`useBody` 配置选项用于指示是否在 POST 请求正文中包含 `extraUrlParams`（而不是作为经过网址编码的查询参数包含在网址中）。

`useBody` 仅适用于 `beacon` 和 `xhrpost` 传输方法。如果 `useBody` 为 true 且与这些传输方法中的任何一种结合使用，`extraUrlParams` 会在 POST 请求正文中发送。否则，请求在发送时正文为空，并且 `extraUrlParams` 会作为网址参数包含在内。

通过 `useBody`，您可以在 `extraUrlParams` 添加嵌套对象。不过，如果请求回退到不支持 `useBody` 的其他传输选项（例如 `image`），那么这些嵌套对象会被作为 `[object Object]` 字符串化到网址中。

```javascript
"transport": {
  "beacon": true,
  "xhrpost": true,
  "useBody": true,
  "image": false
}
```

##### 引荐来源网址政策 <a name="referrer-policy"></a>

您可以在 `transport` 配置中将引荐来源网址政策指定为 `referrerPolicy` 字段。目前仅支持 `no-referrer`。引荐来源网址政策仅适用于 `image` 传输。如果指定了 `referrerPolicy: no-referrer`，则 `beacon` 和 `xhrpost` 传输会被替换为 `false`。

```javascript
transport: {
  beacon: false,
  xhrpost: false,
  image: true,
  referrerPolicy: "no-referrer"
  }
```

#### 链接器 <a name="linkers"></a>

`linkers` 功能用于启用跨网域 ID 同步。`amp-analytics` 将使用[配置对象](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md#format)来创建“链接器字符串”，该字符串将作为网址参数附加到网页上的指定外发链接。当用户点击其中一个链接时，目标网页会读取网址参数中的链接器字符串，以执行 ID 同步。这通常用于跨 AMP 代理网域和发布商网域加入到用户会话中。

如需详细了解如何设置链接器配置，请参阅[链接器 ID 转发](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-forwarding.md)

如果您需要提取此参数，可以参阅[链接器 ID 接收](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md)，了解如何创建此参数。

#### Cookie <a name="cookies"></a>

`cookies` 功能支持通过从文档网址提取 [`QUERY_PARAM`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md#query-parameter) 和 [`LINKER_PARAM`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#linker-param) 信息的方式将 Cookie 写入原始网域。它可以与 `linkers` 功能配合使用，以便将 ID 从 AMP 代理网域同步到发布商网域中的 AMP 网页。

如需详细了解如何设置 `cookies` 配置，请参阅[接收 AMP 网页上的链接器参数](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/linker-id-receiving.md#receiving-linker-params-on-amp-pages)

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-analytics 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/validator-amp-analytics.protoascii)。

### `<amp-analytics>` 的有效属性 <a name="valid-attributes-for-"></a>

以下是 `amp-analytics` 组件的有效属性：

**type**

用于指定供应商的类型。有关详情，请参阅[分析服务供应商](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics-vendors.md)列表。

示例：

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json"></amp-analytics>
```

**config**

这是一个可选属性，可用于从指定的远程网址加载配置。指定的网址应使用 HTTPS 架构。另请参阅下面的 `data-include-credentials` 属性。该网址可以包含 [AMP 网址变量](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)。响应必须遵循 [AMP CORS 安全指南](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)。

示例：

```html
<amp-analytics config="https://example.com/analytics.config.json"></amp-analytics>
```

**data-credentials**<a name="data-credentials"></a>

如果设为 `include`，则系统可以因应通过 `config` 属性指定的请求读取和写入 Cookie。这是一个可选属性。

**data-consent-notification-id**

如果提供了此属性，除非用户确认（接受）包含给定 HTML 元素 ID 的 [amp-user-notification](amp-user-notification.md)，否则页面不会处理分析请求。这是一个可选属性。

## AMP 组件分析 <a name="analytics-for-amp-components"></a>

AMP 组件开发者可以使用 AMP 分析实现数据收集。有关详情，请参阅[实现 AMP 组件分析](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-components-analytics.md)
