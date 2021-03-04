---
'$title': 调试 AMP 缓存问题
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: 我的文档为何在 AMP 缓存中被损坏？
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## 我的文档为何在 AMP 缓存中被损坏？<a name="why-is-my-doc-broken-on-an-amp-cache"></a>

有效的 AMP 文档在 AMP 缓存中与其在来源中的显示和行为方式通常相同。但是，一些组件和服务器配置可能会导致出现问题。

如果某个特定文档在来源中的显示和行为正常，但在通过缓存（请参阅[如何将来源网址映射到 Google 的 AMP 缓存](https://developers.google.com/amp/cache/overview#amp-cache-url-format)）查看时出现问题，请尝试以下操作：

1. 打开浏览器的开发者/错误工具控制台，并解决显示的任何错误或警告。
2. 通过 [AMPBench](https://search.google.com/test/amp) 运行文档，并解决任何意外错误或警告。

如果完成这些步骤后仍有问题，请检查下表。

<table>
<table>
  <thead>
    <tr>
      <th width="30%">症状</th>
      <th width="30%">问题</th>
      <th width="40%">解决方案</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>网页字体不显示（使用后备字体）</td>
      <td>字体提供商未将 AMP 缓加入白名单。</td>
      <td>请与字体提供商联系，要求他们将<a href="amp-cors-requests.md#cors-security-in-amp">所有缓存</a>加入白名单。</td>
    </tr>
    <tr>
      <td>素材资源（例如字体和图片）不显示（<strong>仅显示 HTTP 来源</strong>）</td>
      <td>文档使用协议相对网址。</td>
      <td>切换为绝对网址（即 <code>http://www.site.com/doc/amp</code>，而非 <code>//www.site.com/doc/amp</code>）。</td>
    </tr>
    <tr>
      <td rowspan="2">素材资源（例如字体和图片）不显示</td>
      <td>提供素材资源时使用了错误的 MIME 类型。</td>
      <td>指定<a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">可接受的 MIME 类型</a>。</td>
    </tr>
    <tr>
      <td>AMP 缓存无法访问素材资源。</td>
      <td>确保 AMP 缓存可以访问您的素材资源，且未被 IP 地址或用户代理等阻止。（<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Google 抓取工具使用的用户代理列表</a>）。</td>
    </tr>
    <tr>
      <td>诸如 <code><amp-form></amp-form></code>、<code><amp-list></amp-list></code> 等动态元素的行为不符合预期。</td>
      <td>CORS 标头损坏或丢失。</td>
      <td>这些组件从 AMP 缓存向来源发出跨源请求。默认情况下，浏览器会阻塞这些请求。要允许这些请求，请发出将<a href="amp-cors-requests.md">所有缓存</a>加入白名单的 <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS 标头</a>。</td>
    </tr>
    <tr>
      <td>因法律下架通知而须移除的内容仍在提供。</td>
      <td>AMP 缓存尚未执行移除。</td>
      <td>遵循各个 AMP 缓存的指南以刷新内容。对于 Google AMP 缓存，请参阅<a href="https://developers.google.com/amp/cache/update-cache">更新 AMP 内容</a>。</td>
    </tr>
</tbody>
</table>

</table>
