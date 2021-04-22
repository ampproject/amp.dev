---
$title: amp-ad
$category@: ads-analytics
teaser:
  text: 一种用于展示广告的容器。
---



一种用于展示广告的容器。`amp-embed` 是 `amp-ad` 标记的别名，以不同的标记名称提供后者的所有功能。在语义上更准确的情况下，请使用 `amp-embed`。AMP 文档仅支持通过 HTTPS 投放的广告/嵌入内容。

# <a name="amp-ad"></a> amp-ad / amp-embed


[tip type="note"]
`amp-ad`/`amp-embed` 的规范很可能会随着时间推移发生重大变化。当前的方法旨在规范格式，以便能够展示广告。
[/tip]


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
    <td class="col-fourty"><strong>说明</strong></td>
    <td>一种用于展示广告的容器。<code>amp-embed</code> 是 <code>amp-ad</code> 标记的别名，以不同的标记名称提供后者的所有功能。在语义上更准确的情况下，请使用 <code>amp-embed</code>。AMP 文档仅支持通过 HTTPS 投放的广告/嵌入内容。</td>
  </tr>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js">&lt;/script></code><br>注意：如果没有此脚本，amp-ad 也许仍可以工作，但我们强烈建议使用该脚本，以保证未来的兼容性。</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、intrinsic、nodisplay、responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-ad/">amp-ad 示例</a>。</td>
  </tr>
</table>

## 行为 <a name="behavior"></a>

与 AMP 文档中的所有其他资源一样，广告会随一个名为 `<amp-ad>` 的特殊自定义元素一起加载。AMP 文档中不得运行任何由广告网络提供的 JavaScript。不过，AMP runtime 会通过 iframe 沙盒将来自另一个来源的 iframe 加载为 AMP 文档，并且会在该 iframe 沙盒内执行相应广告网络的 JS。

`<amp-ad>` 要求根据其布局类型需要遵从的[规则](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#tldr-summary-of-layout-requirements--behaviors)指定宽度值和高度值，并要求提供 `type` 参数，以便选择展示哪个广告网络。标记上的所有 `data-*` 属性会自动作为参数传递给最终呈现广告的代码。给定类型的广告网络所需的 `data-` 属性取决于广告网络，并且必须与广告网络一起记录。

#### 示例：展示一些广告 <a name="example-displaying-a-few-ads"></a>

[example preview="inline" playground="true" imports="amp-ad"]
```html
<amp-ad type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
    width="300"
    height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  </amp-ad>
  <amp-ad width="300"
    height="250"
    type="industrybrains"
    data-width="300"
    data-height="250"
    data-cid="19626-3798936394">
  </amp-ad>
  <amp-embed type="taboola"
    width="400"
    height="300"
    layout="responsive"
    data-publisher="amp-demo"
    data-mode="thumbnails-a"
    data-placement="Ads Example"
    data-article="auto">
  </amp-embed>
```
[/example]

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type（必需）</strong></td>
    <td>用于指定<a href="#supported-ad-networks">广告网络</a>的标识符。可以使用 <code>type</code> 属性选择要用于广告标记的模板。</td>
  </tr>
  <tr>
    <td width="40%"><strong>src（可选）</strong></td>
    <td>可以使用此属性为指定的广告网络加载一个脚本标记。对于要求在网页中插入一个（必须是一个）脚本标记的广告网络，可以使用此属性。<code>src</code> 值必须包含一个已针对指定的广告网络列入白名单的前缀，并且该值必须使用 <code>https</code> 协议。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>大多数广告网络都要求进一步配置，相应配置可以通过 HTML <code>data-</code> 属性传递到广告网络。参数名称需要进行一种标准的格式转化，以便从采用数据属性短划线格式转化为采用驼峰式大小写格式。例如，“data-foo-bar”会以“fooBar”的形式发送到广告以进行配置。如需了解可以使用哪些属性，请参阅<a href="#supported-ad-networks">广告网络</a>对应的文档。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-vars-foo-bar</strong></td>
    <td>以 <code>data-vars-</code> 开头的属性为保留属性，仅供 <a href="https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md#variables-as-data-attribute"><code>amp-analytics</code> 变量</a>使用。</td>
  </tr>
  <tr>
    <td width="40%"><strong>json（可选）</strong></td>
    <td>可以使用此属性将配置作为任意复杂的 JSON 对象传递给广告。该对象会按原样传递给广告，并且名称不会发生任何变化。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-consent-notification-id（可选）</strong></td>
    <td>如果提供了此属性，则需要使用给定的 HTML-id 确认 <a href="amp-user-notification.md">amp-user-notification</a>，直至用户的“AMP 客户端 ID”（类似于 Cookie）传递至广告。这意味着广告会延迟到用户确认通知之后才会呈现。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-loading-strategy（可选）</strong></td>
    <td>用于指示广告在与当前视口的距离不超过给定数量的视口时开始加载。如果没有 <code>data-loading-strategy</code> 属性，该数量会默认为 3。您可以指定介于 [0, 3] 范围内的浮点值（如果未指定该值，则该值会设为 1.25）。使用较小的值可获得较高的可见度（即增加广告加载后的可见几率），但展示次数（即加载广告的次数）可能会减少。如果指定了该属性但未指定值，则系统会指定一个浮点值，所指定的值将有助于提升可见度，并且不会对展示次数产生严重影响。请注意，指定 <code>prefer-viewability-over-views</code> 作为值还能够自动提升可见度。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-ad-container-id（可选）</strong></td>
    <td>在 AMP runtime 尝试收起容器组件时，将容器组件 ID 告知广告。该容器组件必须是作为广告父级的 <code>&lt;amp-layout&gt;</code> 组件。如果 <code>data-ad-container-id</code> 已指定，且 AMP runtime 找到了此类 <code>&lt;amp-layout&gt;</code> 容器组件，则在容器组件未填充广告期间，AMP runtime 将尝试收起容器组件（而不是广告组件）。存在广告指示器时，此功能非常有用。
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>常见属性</strong></td>
    <td>此元素包含扩展到 AMP 组件的<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">常见属性</a>。</td>
  </tr>
</table>

## 占位符 <a name="placeholder"></a>

`amp-ad` 可能支持包含 `placeholder` 属性的子元素。如果广告网络支持此元素，此元素会在广告可供查看之前一直显示。如需了解详情，请参阅[占位符和后备行为](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)。

```html
<amp-ad width=300 height=250
    type="foo">
    <div placeholder>Loading ...</div>
</amp-ad>
```

## 没有广告 <a name="no-ad-available"></a>

如果没有广告可投放到相应广告位，AMP 会尝试收起 `amp-ad` 元素（即，将其设为 `display: none`）。AMP 负责确定可以在不影响用户滚动位置的情况下执行此操作。如果广告位于当前视口中，则不会被收起，因为该操作会影响用户的滚动位置；不过，如果广告位于当前视口之外，则会被收起。

除非尝试收起失败。`amp-ad` 组件支持包含 `fallback` 属性的子元素。如果存在后备元素，则会显示自定义后备元素。否则，AMP 将应用默认的后备元素。

存在后备元素的示例：

```html
<amp-ad width=300 height=250 type="foo">
  <div fallback>No ad for you</div>
</amp-ad>
```

## 投放视频广告 <a name="serving-video-ads"></a>

有 3 种方式可通过视频广告在 AMP 中利用视频获利。

1. AMP 自动支持一些可通过广告获利的视频播放器，例如 BrightCove、DailyMotion 等。如需完整列表，请参阅[媒体](../../../documentation/components/index.html#media)组件。

1. 使用内置 IMA SDK 和 HTML5 视频播放器的 [amp-ima-video](amp-ima-video.md) 组件。
1. 如果使用的视频播放器在 AMP 中不受支持，则可以使用 [amp-iframe](https://ampbyexample.com/components/amp-iframe/) 提供自定义播放器。使用 `amp-iframe` 方法时，请注意以下事项：

    * 如果在第一个视口中加载播放器，请确保有一张海报。[详细信息](amp-iframe.md#iframe-with-placeholder)。
    * 必须通过 HTTPS 投放视频和海报。</li>

## 从自定义网域投放广告 <a name="running-ads-from-a-custom-domain"></a>

AMP 支持加载用于从自定义网域（例如您自己的网域）加载广告的引导 iframe。

要启用此功能，请将文件 [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html) 复制到您的网络服务器。然后，将以下元标记添加到您的 AMP 文件中：

```html
<meta name="amp-3p-iframe-src" content="https://assets.your-domain.com/path/to/remote.html">
```

  元标记的 `content` 属性是一个绝对网址，指向您网络服务器上的 remote.html 文件副本。此网址必须使用“https”架构。它所在的位置不能与 AMP 文件所在的位置属于同一来源。例如，如果您将 AMP 文件托管在 `www.example.com` 上，则此网址不能位于 `www.example.com` 上（但可以位于 `something-else.example.com` 上）。如需详细了解允许的 iframe 来源，请参阅[《iframe 来源政策》](https://github.com/ampproject/amphtml/blob/main/spec/amp-iframe-origin-policy.md)。

### 安全 <a name="security"></a>

先**验证传入的数据**，然后再将其传递给 `draw3p` 函数，以确保您的 iframe 仅执行预期的操作。对于允许自定义 JavaScript 注入的广告网络来说，尤为如此。

iframe 还应强制规定它们只能 iframe 到预期的来源。来源为：

* 您自己的来源
* 用于 AMP 缓存的 `https://cdn.ampproject.org`

对于 AMP 缓存，您还需要检查“源出处”（由 cdn.ampproject.org 提供的文档的来源）是否为您的来源之一。

可以使用 `draw3p` 的第 3 个参数强制规定来源，但必须额外使用 [allow-from](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) 指令，以便实现全面的浏览器支持。

### 优化传入广告配置 <a name="enhance-incoming-ad-configuration"></a>

是否进行此项优化完全由您自己决定：有时需要先优化广告请求，然后再向广告服务器发出广告请求。

如果您的广告网络支持[快速获取](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md#creating-an-amp-ad)，请使用[实时配置](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md) (RTC)。（例如，DoubleClick 和 AdSense 集成均支持快速获取和 RTC）

如果您的广告网络使用延迟获取，您可以将回调传递给 [remote.html](https://github.com/ampproject/amphtml/blob/main/3p/remote.html) 文件中的 `draw3p` 函数调用。该回调会接收传入配置作为第一个参数，然后接收另一个回调作为第二个参数（在下面的示例中，调用了 `done`）。必须使用更新后的配置调用该回调，广告呈现才会继续。

示例：

```JS
draw3p(function(config, done) {
  config.targeting = Math.random() > 0.5 ? 'sport' : 'fashion';
  // 并没有在此实际调用 setTimeout。这应当仅用作一个示例
  // 来说明可以调用 done 回调。
  setTimeout(function() {
    done(config);
  }, 100)
}, ['allowed-ad-type'], ['your-domain.com']);
```

## 样式设置 <a name="styling"></a>

`<amp-ad>` 元素本身可能不具备包含 CSS `position: fixed` 集（`amp-lightbox` 除外）的容器，或可能未位于此类容器中。这是因为全页展示的重叠式广告会影响用户体验。我们可能会考虑将来允许在能够使特定用户体验保持不变的 AMP 受控容器中使用类似的广告格式。

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-ad 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-ad/validator-amp-ad.protoascii)。

## 支持的广告网络 <a name="supported-ad-networks"></a>

* [A8](https://github.com/ampproject/amphtml/blob/main/ads/a8.md)
* [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md)
* [AccessTrade](https://github.com/ampproject/amphtml/blob/main/ads/accesstrade.md)
* [Adblade](https://github.com/ampproject/amphtml/blob/main/ads/adblade.md)
* [AdButler](https://github.com/ampproject/amphtml/blob/main/ads/adbutler.md)
* [Adform](https://github.com/ampproject/amphtml/blob/main/ads/adform.md)
* [Adfox](https://github.com/ampproject/amphtml/blob/main/ads/adfox.md)
* [Ad Generation](https://github.com/ampproject/amphtml/blob/main/ads/adgeneration.md)
* [Adhese](https://github.com/ampproject/amphtml/blob/main/ads/adhese.md)
* [Adincube](https://github.com/ampproject/amphtml/blob/main/ads/adincube.md)
* [ADITION](https://github.com/ampproject/amphtml/blob/main/ads/adition.md)
* [Adman](https://github.com/ampproject/amphtml/blob/main/ads/adman.md)
* [AdmanMedia](https://github.com/ampproject/amphtml/blob/main/ads/admanmedia.md)
* [Admixer](https://github.com/ampproject/amphtml/blob/main/ads/admixer.md)
* [AdOcean](https://github.com/ampproject/amphtml/blob/main/ads/adocean.md)
* [AdPicker](https://github.com/ampproject/amphtml/blob/main/ads/adpicker.md)
* [AdPlugg](https://github.com/ampproject/amphtml/blob/main/ads/adplugg.md)
* [Adpon](https://github.com/ampproject/amphtml/blob/main/ads/adpon.md)
* [AdReactor](https://github.com/ampproject/amphtml/blob/main/ads/adreactor.md)
* [AdSense](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [AdSensor](https://github.com/ampproject/amphtml/blob/main/ads/adsensor.md)
* [AdsNative](https://github.com/ampproject/amphtml/blob/main/ads/adsnative.md)
* [AdSpeed](https://github.com/ampproject/amphtml/blob/main/ads/adspeed.md)
* [AdSpirit](https://github.com/ampproject/amphtml/blob/main/ads/adspirit.md)
* [AdStir](https://github.com/ampproject/amphtml/blob/main/ads/adstir.md)
* [AdTech](https://github.com/ampproject/amphtml/blob/main/ads/adtech.md)
* [AdThrive](https://github.com/ampproject/amphtml/blob/main/ads/adthrive.md)
* [AdUnity](https://github.com/ampproject/amphtml/blob/main/ads/adunity.md)
* [Ad Up Technology](https://github.com/ampproject/amphtml/blob/main/ads/aduptech.md)
* [Adventive](https://github.com/ampproject/amphtml/blob/main/ads/adventive.md)
* [Adverline](https://github.com/ampproject/amphtml/blob/main/ads/adverline.md)
* [Adverticum](https://github.com/ampproject/amphtml/blob/main/ads/adverticum.md)
* [AdvertServe](https://github.com/ampproject/amphtml/blob/main/ads/advertserve.md)
* [Adyoulike](https://github.com/ampproject/amphtml/blob/main/ads/adyoulike.md)
* [Affiliate-B](https://github.com/ampproject/amphtml/blob/main/ads/affiliateb.md)
* [AJA](https://github.com/ampproject/amphtml/blob/main/ads/aja.md)
* [AMoAd](https://github.com/ampproject/amphtml/blob/main/ads/amoad.md)
* [AppNexus](https://github.com/ampproject/amphtml/blob/main/ads/appnexus.md)
* [AppVador](https://github.com/ampproject/amphtml/blob/main/ads/appvador.md)
* [Atomx](https://github.com/ampproject/amphtml/blob/main/ads/atomx.md)
* [百度](https://github.com/ampproject/amphtml/blob/main/ads/baidu.md)
* [BeOpinion](amp-beopinion.md)
* [Bidtellect](https://github.com/ampproject/amphtml/blob/main/ads/bidtellect.md)
* [brainy](https://github.com/ampproject/amphtml/blob/main/ads/brainy.md)
* [Broadstreet Ads](https://github.com/ampproject/amphtml/blob/main/ads/broadstreetads.md)
* [CA A.J.A. Infeed](https://github.com/ampproject/amphtml/blob/main/ads/caajainfeed.md)
* [CA-ProFit-X](https://github.com/ampproject/amphtml/blob/main/ads/caprofitx.md)
* [Cedato](https://github.com/ampproject/amphtml/blob/main/ads/cedato.md)
* [Chargeads](https://github.com/ampproject/amphtml/blob/main/ads/chargeads.md)
* [Colombia](https://github.com/ampproject/amphtml/blob/main/ads/colombia.md)
* [Connatix](https://github.com/ampproject/amphtml/blob/main/ads/connatix.md)
* [Content.ad](https://github.com/ampproject/amphtml/blob/main/ads/contentad.md)
* [Criteo](https://github.com/ampproject/amphtml/blob/main/ads/criteo.md)
* [CSA](https://github.com/ampproject/amphtml/blob/main/ads/google/csa.md)
* [CxenseDisplay](https://github.com/ampproject/amphtml/blob/main/ads/eas.md)
* [Dianomi](https://github.com/ampproject/amphtml/blob/main/ads/dianomi.md)
* [Directadvert](https://github.com/ampproject/amphtml/blob/main/ads/directadvert.md)
* [DistroScale](https://github.com/ampproject/amphtml/blob/main/ads/distroscale.md)
* [Dot and Media](https://github.com/ampproject/amphtml/blob/main/ads/dotandads.md)
* [Doubleclick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)
* [eADV](https://github.com/ampproject/amphtml/blob/main/ads/eadv.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [E-Planning](https://github.com/ampproject/amphtml/blob/main/ads/eplanning.md)
* [Ezoic](https://github.com/ampproject/amphtml/blob/main/ads/ezoic.md)
* [Felmat](https://github.com/ampproject/amphtml/blob/main/ads/felmat.md)
* [FlexOneELEPHANT](https://github.com/ampproject/amphtml/blob/main/ads/f1e.md)
* [FlexOneHARRIER](https://github.com/ampproject/amphtml/blob/main/ads/f1h.md)
* [Flite](https://github.com/ampproject/amphtml/blob/main/ads/flite.md)
* [fluct](https://github.com/ampproject/amphtml/blob/main/ads/fluct.md)
* [FreeWheel](https://github.com/ampproject/amphtml/blob/main/ads/freewheel.md)
* [Fusion](https://github.com/ampproject/amphtml/blob/main/ads/fusion.md)
* [GenieeSSP](https://github.com/ampproject/amphtml/blob/main/ads/genieessp.md)
* [Giraff](https://github.com/ampproject/amphtml/blob/main/ads/giraff.md)
* [GMOSSP](https://github.com/ampproject/amphtml/blob/main/ads/gmossp.md)
* [GumGum](https://github.com/ampproject/amphtml/blob/main/ads/gumgum.md)
* [Holder](https://github.com/ampproject/amphtml/blob/main/ads/holder.md)
* [I-Mobile](https://github.com/ampproject/amphtml/blob/main/ads/imobile.md)
* [Imonomy](https://github.com/ampproject/amphtml/blob/main/ads/imonomy.md)
* [iBillboard](https://github.com/ampproject/amphtml/blob/main/ads/ibillboard.md)
* [Imedia](https://github.com/ampproject/amphtml/blob/main/ads/imedia.md)
* [Improve Digital](https://github.com/ampproject/amphtml/blob/main/ads/improvedigital.md)
* [Index Exchange](https://github.com/ampproject/amphtml/blob/main/ads/ix.md)
* [Industrybrains](https://github.com/ampproject/amphtml/blob/main/ads/industrybrains.md)
* [InMobi](https://github.com/ampproject/amphtml/blob/main/ads/inmobi.md)
* [Innity](https://github.com/ampproject/amphtml/blob/main/ads/innity.md)
* [Kargo](https://github.com/ampproject/amphtml/blob/main/ads/kargo.md)
* [Kiosked](https://github.com/ampproject/amphtml/blob/main/ads/kiosked.md)
* [Kixer](https://github.com/ampproject/amphtml/blob/main/ads/kixer.md)
* [Kuadio](https://github.com/ampproject/amphtml/blob/main/ads/kuadio.md)
* [Ligatus](https://github.com/ampproject/amphtml/blob/main/ads/ligatus.md)
* [LockerDome](https://github.com/ampproject/amphtml/blob/main/ads/lockerdome.md)
* [LOKA](https://github.com/ampproject/amphtml/blob/main/ads/loka.md)
* [MADS](https://github.com/ampproject/amphtml/blob/main/ads/mads.md)
* [MANTIS](https://github.com/ampproject/amphtml/blob/main/ads/mantis.md)
* [Media.net](https://github.com/ampproject/amphtml/blob/main/ads/medianet.md)
* [MediaImpact](https://github.com/ampproject/amphtml/blob/main/ads/mediaimpact.md)
* [Mediavine](https://github.com/ampproject/amphtml/blob/main/ads/mediavine.md)
* [Medyanet](https://github.com/ampproject/amphtml/blob/main/ads/medyanet.md)
* [Meg](https://github.com/ampproject/amphtml/blob/main/ads/meg.md)
* [MicroAd](https://github.com/ampproject/amphtml/blob/main/ads/microad.md)
* [MixiMedia](https://github.com/ampproject/amphtml/blob/main/ads/miximedia.md)
* [Mixpo](https://github.com/ampproject/amphtml/blob/main/ads/mixpo.md)
* [Monetizer101](https://github.com/ampproject/amphtml/blob/main/ads/monetizer101.md)
* [mox](https://github.com/ampproject/amphtml/blob/main/ads/mox.md)
* [myTarget](https://github.com/ampproject/amphtml/blob/main/ads/mytarget.md)
* [myWidget](https://github.com/ampproject/amphtml/blob/main/ads/mywidget.md)
* [Nativo](https://github.com/ampproject/amphtml/blob/main/ads/nativo.md)
* [Navegg](https://github.com/ampproject/amphtml/blob/main/ads/navegg.md)
* [Nend](https://github.com/ampproject/amphtml/blob/main/ads/nend.md)
* [NETLETIX](https://github.com/ampproject/amphtml/blob/main/ads/netletix.md)
* [Noddus](https://github.com/ampproject/amphtml/blob/main/ads/noddus.md)
* [Nokta](https://github.com/ampproject/amphtml/blob/main/ads/nokta.md)
* [OneAD](https://github.com/ampproject/amphtml/blob/main/ads/onead.md)
* [OnNetwork](https://github.com/ampproject/amphtml/blob/main/ads/onnetwork.md)
* [Open AdStream (OAS)](https://github.com/ampproject/amphtml/blob/main/ads/openadstream.md)
* [OpenX](https://github.com/ampproject/amphtml/blob/main/ads/openx.md)
* [Pixels](https://github.com/ampproject/amphtml/blob/main/ads/pixels.md)
* [plista](https://github.com/ampproject/amphtml/blob/main/ads/plista.md)
* [polymorphicAds](https://github.com/ampproject/amphtml/blob/main/ads/polymorphicads.md)
* [popin](https://github.com/ampproject/amphtml/blob/main/ads/popin.md)
* [Pressboard](https://github.com/ampproject/amphtml/blob/main/ads/pressboard.md)
* [PromoteIQ](https://github.com/ampproject/amphtml/blob/main/ads/promoteiq.md)
* [PubGuru](https://github.com/ampproject/amphtml/blob/main/ads/pubguru.md)
* [PubMatic](https://github.com/ampproject/amphtml/blob/main/ads/pubmatic.md)
* [Pubmine](https://github.com/ampproject/amphtml/blob/main/ads/pubmine.md)
* [PulsePoint](https://github.com/ampproject/amphtml/blob/main/ads/pulsepoint.md)
* [Purch](https://github.com/ampproject/amphtml/blob/main/ads/purch.md)
* [Rambler&amp;Co](https://github.com/ampproject/amphtml/blob/main/ads/capirs.md)
* [RbInfoxSg](https://github.com/ampproject/amphtml/blob/main/ads/rbinfox.md)
* [Realclick](https://github.com/ampproject/amphtml/blob/main/ads/realclick.md)
* [recomAD](https://github.com/ampproject/amphtml/blob/main/ads/recomad.md)
* [Red for Publishers](https://github.com/ampproject/amphtml/blob/main/ads/rfp.md)
* [Relap](https://github.com/ampproject/amphtml/blob/main/ads/relap.md)
* [Revcontent](https://github.com/ampproject/amphtml/blob/main/ads/revcontent.md)
* [RevJet](https://github.com/ampproject/amphtml/blob/main/ads/revjet.md)
* [Rubicon Project](https://github.com/ampproject/amphtml/blob/main/ads/rubicon.md)
* [RUNative](https://github.com/ampproject/amphtml/blob/main/ads/runative.md)
* [SAS CI 360 Match](https://github.com/ampproject/amphtml/blob/main/ads/sas.md)
* [Sekindo](https://github.com/ampproject/amphtml/blob/main/ads/sekindo.md)
* [Sharethrough](https://github.com/ampproject/amphtml/blob/main/ads/sharethrough.md)
* [Sklik](https://github.com/ampproject/amphtml/blob/main/ads/sklik.md)
* [SlimCut Media](https://github.com/ampproject/amphtml/blob/main/ads/slimcutmedia.md)
* [Smart AdServer](https://github.com/ampproject/amphtml/blob/main/ads/smartadserver.md)
* [smartclip](https://github.com/ampproject/amphtml/blob/main/ads/smartclip.md)
* [sogou Ad](https://github.com/ampproject/amphtml/blob/main/ads/sogouad.md)
* [Sortable](https://github.com/ampproject/amphtml/blob/main/ads/sortable.md)
* [SOVRN](https://github.com/ampproject/amphtml/blob/main/ads/sovrn.md)
* [Speakol](https://github.com/ampproject/amphtml/blob/main/ads/speakol.md)
* [SpotX](https://github.com/ampproject/amphtml/blob/main/ads/spotx.md)
* [SunMedia](https://github.com/ampproject/amphtml/blob/main/ads/sunmedia.md)
* [Swoop](https://github.com/ampproject/amphtml/blob/main/ads/swoop.md)
* [TcsEmotion](https://github.com/ampproject/amphtml/blob/main/ads/tcsemotion.md)
* [Teads](https://github.com/ampproject/amphtml/blob/main/ads/teads.md)
* [torimochi](https://github.com/ampproject/amphtml/blob/main/ads/torimochi.md)
* [TripleLift](https://github.com/ampproject/amphtml/blob/main/ads/triplelift.md)
* [Trugaze](https://github.com/ampproject/amphtml/blob/main/ads/trugaze.md)
* [UZOU](https://github.com/ampproject/amphtml/blob/main/ads/uzou.md)
* [ValueCommerce](https://github.com/ampproject/amphtml/blob/main/ads/valuecommerce.md)
* [video intelligence](https://github.com/ampproject/amphtml/blob/main/ads/videointelligence.md)
* [Videonow](https://github.com/ampproject/amphtml/blob/main/ads/videonow.md)
* [Viralize](https://github.com/ampproject/amphtml/blob/main/ads/viralize.md)
* [UAS](https://github.com/ampproject/amphtml/blob/main/ads/uas.md)
* [ucfunnel](https://github.com/ampproject/amphtml/blob/main/ads/ucfunnel.md)
* [Unruly](https://github.com/ampproject/amphtml/blob/main/ads/unruly.md)
* [VMFive](https://github.com/ampproject/amphtml/blob/main/ads/vmfive.md)
* [Webediads](https://github.com/ampproject/amphtml/blob/main/ads/webediads.md)
* [Weborama](https://github.com/ampproject/amphtml/blob/main/ads/weborama.md)
* [Widespace](https://github.com/ampproject/amphtml/blob/main/ads/widespace.md)
* [Wisteria](https://github.com/ampproject/amphtml/blob/main/ads/wisteria.md)
* [WPMedia](https://github.com/ampproject/amphtml/blob/main/ads/wpmedia.md)
* [Xlift](https://github.com/ampproject/amphtml/blob/main/ads/xlift.md)
* [Yahoo](https://github.com/ampproject/amphtml/blob/main/ads/yahoo.md)
* [YahooJP](https://github.com/ampproject/amphtml/blob/main/ads/yahoojp.md)
* [Yandex](https://github.com/ampproject/amphtml/blob/main/ads/yandex.md)
* [Yengo](https://github.com/ampproject/amphtml/blob/main/ads/yengo.md)
* [Yieldbot](https://github.com/ampproject/amphtml/blob/main/ads/yieldbot.md)
* [Yieldmo](https://github.com/ampproject/amphtml/blob/main/ads/yieldmo.md)
* [Yieldone](https://github.com/ampproject/amphtml/blob/main/ads/yieldone.md)
* [Yieldpro](https://github.com/ampproject/amphtml/blob/main/ads/yieldpro.md)
* [Zedo](https://github.com/ampproject/amphtml/blob/main/ads/zedo.md)
* [Zucks](https://github.com/ampproject/amphtml/blob/main/ads/zucks.md)

## 支持的嵌入类型 <a name="supported-embed-types"></a>

* [24smi](https://github.com/ampproject/amphtml/blob/main/ads/24smi.md)
* [Bringhub](https://github.com/ampproject/amphtml/blob/main/ads/bringhub.md)
* [Dable](https://github.com/ampproject/amphtml/blob/main/ads/dable.md)
* [Engageya](https://github.com/ampproject/amphtml/blob/main/ads/engageya.md)
* [Epeex](https://github.com/ampproject/amphtml/blob/main/ads/epeex.md)
* [Insticator](https://github.com/ampproject/amphtml/blob/main/ads/insticator.md)
* [Jubna](https://github.com/ampproject/amphtml/blob/main/ads/jubna.md)
* [Outbrain](https://github.com/ampproject/amphtml/blob/main/ads/outbrain.md)
* [Postquare](https://github.com/ampproject/amphtml/blob/main/ads/postquare.md)
* [PubExchange](https://github.com/ampproject/amphtml/blob/main/ads/pubexchange.md)
* [Smi2](https://github.com/ampproject/amphtml/blob/main/ads/smi2.md)
* [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md)
* [Zen](https://github.com/ampproject/amphtml/blob/main/ads/zen.md)
* [ZergNet](https://github.com/ampproject/amphtml/blob/main/ads/zergnet.md)