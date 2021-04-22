---
$title: amp-auto-ads
$category@: ads-analytics
teaser:
  text: 通过使用远程提供的配置文件，向 AMP 网页中动态投放广告。
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



通过使用远程提供的配置文件，向 AMP 网页中动态投放广告

<table>
  <tr>
    <td class="col-fourty"><strong>提供方式</strong></td>
    <td>实验性组件</td>
  </tr>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td>
    <code>
      &lt;script async custom-element="amp-auto-ads"
      src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">&lt;/script>
    </code>
      </td>
    </tr>
    <tr>
      <td class="col-fourty">
        <strong>
          <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a>
        </strong>
      </td>
      <td>无</td>
    </tr>
  </table>


## 行为

在获得足够多的有效展示位置（在配置中提供）后，`amp-auto-ads` 会尝试植入更多广告，同时遵守相应广告联盟指定的一系列限制。这些限制会限制以下内容：

* 可植入的广告总数
* 任意相邻广告之间应保持的最短距离

除此之外，广告只能植入到网页上不会导致不可接受的重排（取决于 attemptChangeSize）的位置中。

`<amp-auto-ads>` 标记应作为 `<body>` 的第一个子级放置。

广告联盟类型和任何其他信息（广告联盟要求提供）都应在此标记中指定。
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
  </amp-auto-ads>
```

## 支持的广告联盟 <a name="supported-ad-networks"></a>

* [AdSense](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [DoubleClick（实验性）](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)

## 属性

<table>
  <tr>
    <td width="40%"><strong>type（必需）</strong></td>
    <td>广告联盟的标识符。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>大多数广告联盟都需要进行进一步配置，可使用 HTML <code>data-</code> 属性传递到联盟。参数名称需进行标准数据属性短划线到驼峰式大小写转换。例如，“data-foo-bar”会作为“fooBar”发送到广告以进行配置。如需了解可以使用的属性，请参阅<a href="#supported-ad-networks">广告联盟</a>的文档。</td>
  </tr>
  <tr>
    <td width="40%"><strong>常见属性</strong></td>
    <td>此元素包含扩展到 AMP 组件的<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">常见属性</a>。</td>
  </tr>
</table>

## 配置规范

该配置定义 `<amp-auto-ads>` 可以在网页上的哪些位置放置广告。该配置可从位于 `ad-network-config.js` 中定义的网址中的第三方广告联盟获取。该配置应该是序列化 JSON 对象，与下文所述的 [`ConfigObj`](#configobj) 定义相符。

### 配置示例

下面的示例指定广告应紧跟着放在网页上第三个 `<DIV id='domId'>` 中的所有 `<P class='paragraph'>` 元素的后面。在以上任意位置展示的广告的类型应该是 BANNER，上外边距为 4 像素，下外边距为 10 像素。

```json
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#domId",
        "index": 2,
        "sub": {
          "selector": "P.paragraph",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}
```

### 对象定义

#### ConfigObj <a name="configobj"></a>

要在配置对象中指定的字段：

<table>
  <tr>
    <th class="col-thirty">字段名称</th>
    <th class="col-thirty">类型</th>
    <th class="col-fourty">说明</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Array<!PlacementObj></td>
    <td><strong>必填</strong>字段，用于指示网页上可植入广告的可能展示位置。</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>可选字段，用于指定从属性名称到属性值的映射，以应用于使用此配置注入的所有 <code>&lt;amp-ad&gt;</code> 元素。<em></em>仅支持以下属性名称：
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-&ast;（即任何数据属性）</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
      可选字段，用于指定在网页上放置广告时应施加的限制。<em></em>如果未指定，则 <code>amp-auto-ads</code> 会尝试使用在 [ad-network-config.js](0.1/ad-network-config.js) 中指定的默认限制。
    </td>
  </tr>
</table>

#### PlacementObj

要在 `placements` 配置对象中指定的字段：

<table>
  <tr>
    <th class="col-thirty">字段名称</th>
    <th class="col-thirty">类型</th>
    <th class="col-fourty">说明</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td><strong>必填</strong>字段，用于提供在展示位置锚定到的网页上查找元素所使用的信息。
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td><strong>必填</strong>字段，用于指示展示位置相对于其锚定元素的位置。</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td><strong>必填</strong>字段，用于指示展示位置类型。</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>可选字段，用于指示应该应用于在此展示位置植入的广告的任意样式。<em></em>
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>可选字段，表示从属性名称到属性值的映射，以应用于使用此展示位置注入的所有 <code>&lt;amp-ad&gt;</code> 元素。<em></em>此处指定的属性会替换在父 <code>ConfigObj</code> 上也指定的具有相同名称的任意属性。仅支持以下属性名称：
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-&ast;（即任何数据属性）</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

要在 `anchor` 配置对象中指定的字段：

<table>
  <tr>
    <th class="col-thirty">字段名称</th>
    <th class="col-thirty">类型</th>
    <th class="col-fourty">说明</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>string</td>
    <td><strong>必填</strong>字段，用于定义 CSS 选择器，以在这种锚定定义级别选择元素。
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>number</td>
    <td>可选字段，用于指定这种锚定定义级别应限定到的索引（选择器选择的元素的索引）。<em></em>默认情况下，该值设置为 0（如果 <code>all</code> 字段为 false）。</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>boolean</td>
    <td>如果已指定 <code>index</code> 字段，则忽略此字段。如果已设置为 <code>true</code>，则表示应包含选择器所选的全部元素；否则请设置为 <code>false</code>。
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>number</td>
    <td>可选字段，用于指定元素要包含的 textContent 属性的长度下限。<em></em>默认值为 0。</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td>可选字段，用于指定在这种锚定定义级别选择的所有元素内选择元素的递归 <code>AnchorObj</code>。<em></em>
    </td>
  </tr>
</table>

#### PlacementStyleObj <a name="placementstyleobj"></a>

要在 `style` 配置对象中指定的字段：

<table>
  <tr>
    <th class="col-twenty">字段名称</th>
    <th class="col-twenty">类型</th>
    <th class="col-fourty">说明</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>number</td>
    <td>可选字段，用于指定在此位置植入广告应留出的上外边距（以像素为单位）。<em></em>默认值为 0。
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>number</td>
    <td>可选字段，用于指定在此位置植入广告应留出的下外边距（以像素为单位）。<em></em>默认值为 0。
    </td>
  </tr>
</table>

#### RelativePositionEnum <a name="relativepositionenum"></a>

`placements` 配置对象中 `pos` 字段的枚举值：

<table>
  <tr>
    <th class="col-fourty">名称</th>
    <th class="col-twenty">值</th>
    <th class="col-fourty">说明</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>广告应作为同级植入锚定广告的紧前方。</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>广告应作为锚定广告的第一个子级植入。</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>广告应作为锚定广告的最后一个子级植入。</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>广告应作为同级植入锚定广告的紧后面。</td>
  </tr>
</table>

#### PlacementTypeEnum <a name="placementtypeenum"></a>

`placements` 配置对象中 `type` 字段的枚举值：

<table>
  <tr>
    <th class="col-fourty">名称</th>
    <th class="col-twenty">值</th>
    <th class="col-fourty">说明</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>展示位置，用于描述横幅广告的位置。</td>
  </tr>
</table>

#### AdConstraintsObj

要在 `adConstraints` 配置对象中指定的字段：

<table>
  <tr>
    <th class="col-twenty">字段名称</th>
    <th class="col-twenty">类型</th>
    <th class="col-fourty">说明</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>string</td>
    <td>
      <strong>必填</strong>字段，用于指示广告植入时与网页上已有的任意广告（手动放置的广告或之前由 amp-auto-ads 放置的广告）之间的距离下限。
          值以带有单位前缀的数字表示。例如，“10px”表示 10 像素，“0.5vp”表示视口高度的一半。负值无效。支持的单位包括：
          <ul>
          <li>px - 像素</li>
          <li>vp - 视口高度的倍数</li>
        </ul>
        此值仅适用于以下情况：当网页上已有广告的数量少于在 subsequentMinSpacing 字段中指定的任何 <code>adCount</code> 匹配器值时。
      </td>
    </tr>
    <tr>
      <td><code>subsequentMinSpacing</code></td>
      <td>Array&lt;!SubsequentMinSpacingObj&gt;</td>
      <td>
        可选字段，用于指定根据植入时网页上已有广告的数量，应该应用的广告间距。<em></em>
      </td>
    </tr>
    <tr>
      <td><code>maxAdCount</code></td>
      <td>number</td>
      <td>
        <strong>必填</strong>字段，用于指定使用 <code>amp-auto-ads</code> 在网页上放置的广告的数量上限。手动放置的广告和由 <code>amp-auto-ads</code> 放置的广告均计入此总数。
            例如，如果此字段已设置为 5，并且网页上已有 3 个手动放置的广告，那么由 <code>amp-auto-ads</code> 放置的额外广告数量上限为 2。
          </td>
      </tr>
    </table>

#### SubsequentMinSpacingObj

要在 `subsequentMinSpacing` 配置对象中指定的字段。`subsequentMinSpacing` 条目可用于根据网页上已有广告的数量更改任何其他广告之间所需的间距。例如，请考虑以下情形：

* 网页上已有 2 个广告
* subsequentMinSpacing 字段为：
<code>
  [
    {adCount: 3, spacing: "500px"},
    {adCount: 5, spacing: "1000px"},
  ]
</code>

网页上一开始有 2 个广告，所以没有映射匹配。
因此，最短间距默认为 `AdConstraints` 对象中的 initialMinSpacing。
`amp-auto-ads` 会尝试以递归方式放置广告，直到没有可用的展示位置（在不打破 `adContraints` 的情况下）。
`amp-auto-ads` 放置第一个广告后，网页上现在有 3 个广告，因为 `subsequentMinSpacing` 中存在与 3 个（或更多）广告对应的映射，所以间距下限现在为 500 像素。
这条规则适用于 5 个广告，因此在网页上出现 5 个广告之前，它一直适用。如果要植入第 6 个广告，则需要清除其他广告，留出至少 1000 像素的距离。

<table>
  <tr>
    <th class="col-twenty">字段名称</th>
    <th class="col-twenty">类型</th>
    <th class="col-fourty">说明</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>number</td>
    <td>
      <strong>必填</strong>字段。
          应用此规则所需的网页上已有广告的数量下限（假设没有其他更匹配的规则）。如需详细了解相关说明，请参阅上述说明。
        </td>
    </tr>
    <tr>
      <td><code>spacing</code></td>
      <td>string</td>
      <td>
        <strong>必填</strong>字段，用于指定此规则匹配（根据 <code>adCount</code>）时要应用的广告间距下限。
            值以带有单位前缀的数字表示。例如，“10px”表示 10 像素，“0.5vp”表示视口高度的一半。负值无效。支持的单位包括：
            <ul>
            <li>px - 像素</li>
            <li>vp - 视口高度的倍数</li>
          </ul>
        </td>
      </tr>
    </table>

## 验证

请参阅 AMP 验证工具规范中的 [amp-auto-ads 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii)。
