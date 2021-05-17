---
'$title': AMP 缓存的网址格式和请求处理
$order: 9
toc: 'false'
formats:
  - websites
  - stories
  - ads
author: Gregable
contributors:
  - sebastianbenz
---

本文档介绍 AMP 缓存的网址格式，并阐述 AMP 缓存如何处理请求。

## 网址格式

Google AMP 缓存首先会将每个 AMP 文档的域名从 [IDN (punycode)](https://en.wikipedia.org/wiki/Punycode) 转换为 UTF-8，尽可能为其创建一个子域名。缓存会将每个 `-`（短划线）替换为 `--`（2 个短划线），并将每个 `.`（点）替换为 `-`（短划线）。例如，`pub.com` 将映射到 `pub-com.cdn.ampproject.org`。

您可以使用此网址计算器将网址转换为 AMP 缓存版本：

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] 使用 [AMP-Toolbox 缓存网址](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) [Node.js](https://nodejs.org) 模块可以将来源的网址转换为 AMP 缓存网址格式。[/tip]

本文档介绍以下内容：

- AMP 缓存中的网址结构。
- 如何预测网址在 AMP 缓存中的显示。
- 如何反推 AMP 缓存来源标头以确定其发布商域名。

## 域名协议

所有文档在 AMP 缓存中均使用 https 协议。

## 域名后缀

所有 AMP 缓存均在 JSON 文件中注册，该文件为在线文件，位于 [AMPHTML 仓库](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json)中。此文件中的缓存记录示例如下所示：

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

AMP 缓存在 `cacheDomain` 指定的域名上提供记录。在本例中，域名为 `cdn.ampproject.org`。

本文档使用含有 `cdn.ampproject.org` 的网址为例，但其他缓存通常使用类似的网址结构。

## 域名前缀

AMP 缓存在更改的网址（例如 `example-com.cdn.ampproject.org`）上提供文档。在示例中，原始域名中第一个含点的组件 `example.com` 变为 `example-com`。本文档将这个不含点的字符串 `example-com` 称为“域名前缀”。有关执行此转换的算法，请参阅下文。

由于 https (TLS) 证书的限制 [RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1)，在此前缀中不使用多个含点的组件，例如，`example.com.cdn.ampproject.org`：

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

根据 [RFC 2181](https://tools.ietf.org/html/rfc2181#section-11)，发布商域名的长度最多包含 255 个字符，而每个域名前缀最多可以包含 63 个字符，具体内容如下：

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

所有发布商域名均映射到唯一的域名前缀。用于实现此操作的算法会尝试让该映射可供用户理解。但是，如果发布商域名过长并且情况如下所述，则该映射将恢复为使用安全哈希：

### 基本算法

用于将发布商域名转换为域名前缀的基本算法如下所述：

1. 对发布商域名进行 punycode 解码。请参阅 [RFC 3492](https://tools.ietf.org/html/rfc3492)。
2. 将第 1 步输出结果中的所有“`-`”（连字符）字符替换为“`--`”（两个连字符）。
3. 将第 2 步输出结果中的所有“`.`”（点）字符替换为“`-`”（连字符）。
4. 在第 3 步的输出结果中，如果位置 3 和位置 4 处均包含“`-`”（连字符），则将“`0-`”前缀添加到第 3 步的输出结果，同时添加后缀“`-0`”。有关背景知识，请参阅 [#26205](https://github.com/ampproject/amphtml/issues/26205)。
5. 对第 3 步的输出结果进行 punycode 编码。请参阅 [RFC 3492](https://tools.ietf.org/html/rfc3492)。

以下是基本算法的几个示例：

<table>
  <tr>
   <td>
<strong>发布商域名</strong>
   </td>
   <td>
<strong>域名前缀</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

运行基本算法后，仅且仅当域名前缀不是有效的 DNS 标签时，我们才会运行下面所述的后备算法。

如果域名前缀的长度超过 63 个字符，则该域名前缀不是有效的 DNS 标签。

### 后备算法

用于将发布商域名转换为域名前缀的后备算法如下所述：

1. 使用 SHA256 对发布商域名进行哈希处理。
2. 对第 1 步的输出结果进行 Base32 转义处理。
3. 移除第 2 步输出结果中的最后 4 个字符，这些字符始终为 `=`（等号）字符。

后备算法将生成由 52 个字符构成的字符串（不含 `-`（连字符） ），例如：`v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`。

### 组合算法

组合算法如下所述：

1. 运行基本算法。如果输出结果是有效的 DNS 标签，则附加缓存域名后缀并返回结果，例如 `example-com.cdn.ampproject.org`。否则，继续执行第 2 步。
2. 运行后备算法。附加缓存域名后缀并返回结果，例如：`v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`。

## 网址路径

AMP 缓存的网址“路径”结构为：一个或多个前缀目录（例如 `/c`），后跟 `/s` 中缀（仅当发布商网址为 http `s` 时），再跟发布商文档的网址，无协议。

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='图片显示的是缓存的网址格式') }}

`/c` 等前缀目录对应于 AMP 缓存可能执行的不同投放类型。不同的 AMP 缓存可能支持不同的投放类型，以下仅列出了部分前缀目录：

- `/c` - <strong>C</strong>ontent（内容）：作为独立网页提供的 AMP 文档，在某些界面中，可能直接与该网页关联。
- `/v` - <strong>V</strong>iewer（查看工具）：也是 AMP 文档，但在 [AMP 查看工具](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer)中提供，该查看工具属于框架环境，用于在搜索结果页或其他界面的语境下显示 AMP 文档。
- `/wp` - <strong>W</strong>eb <strong>P</strong>ackage（网络软件包）：作为 [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/)（一种网络软件包技术）提供的 AMP 文档。这些网址用于重定向到发布商自己的来源。
- `/cert` - <strong>Cert</strong>ificate（证书）：与 [Signed Exchange](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) 结合使用的公钥证书。
- `/i` - <strong>I</strong>mage（图片）：AMP 缓存提供的图片，通常用作文档子资源。
- `/ii` - <strong>I</strong>mage（图片）：也是 AMP 缓存提供的图片，但通常可与其他缓存配置参数（例如 `/ii/w800`，用于指示文档请求的最大宽度）组合。此时，缓存可以使用不同的比例生成图片，以便为浏览器节省带宽。

此外，AMP 缓存可以选择将特殊查询参数附加到文档网址，这些参数不是发布商文档查询的组成部分。例如，[`<amp-live-list>`](../../../components/reference/amp-live-list.md) 使用参数 `amp_latest_update_time<` 提取文档，从而发出刷新请求。如果抓取文档，这些参数不会传递到来源，但是会完全显示出来，以便配置对 AMP 缓存的请求。

## CORS 来源

许多发布商使用其 AMP 文档中的 CORS 请求来检索其他数据。CORS 请求的作用是在请求中发送 `Origin:` HTTP 标头，该标头指定发出请求的文档的来源。如上所述，文档的来源在 AMP 缓存和原始文档中有所不同。在上文的域名部分，我们介绍了在给定发布商网址的情况下用于确定 AMP 缓存网址来源的算法。我们将在下文介绍逆向算法，用于通过 CORS `Origin:` 请求标头破译出原始发布商域名。

### 从 AMP 缓存来源反推发布商域名

AMP 缓存来源标头值类似于以下示例之一：

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

首先，移除协议前缀 (`https://`) 和 AMP 缓存域名后缀（例如，`.cdn.ampproject.org`）。后缀可能来自 [caches.json](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json) 中列出的任何一个缓存。其余字符串为“域名前缀”。在上述两个示例中，“域名前缀”如下所示：

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

然后，检查“域名前缀”是否包含至少一个“`-`”（连字符）。迄今为止，最常见的情况是包含一个或多个连字符。如果“域名前缀”未包含至少一个“`-`”（连字符），则无法直接反推 AMP 缓存来源。如果您知道一组可能的发布商域名，可以使用本文档前文所述的域名算法创建一组 AMP 缓存来源。然后，根据这组固定来源进行验证。

算法的其余部分假定“域名前缀”至少包含一个“`-`”（连字符）。

1. 如果域名前缀以 `xn--` 开头，则对“域名前缀”进行 punycode 解码。例如，`xn---com-p33b41770a` 变为 `⚡😊-com`。有关 punycode，请参阅 [RFC 3492](https://tools.ietf.org/html/rfc3492)。
2. 如果域名前缀以“`0-`”开头并以“`-0`”结尾，则去掉“`0-`”前缀和“-0”后缀。
3. 按顺序反复查看第 2 步中输出的字符，记下遇到的字符。如果遇到“`-`”（连字符），则看一眼后面的字符。如果后面的字符也是“`-`”（连字符），则去掉输入中的这两个字符，而记一个“`-`”（连字符）。如果后面的字符是任何其他字符，则仅去掉当前的一个“`-`”（连字符），而记一个“`.`”（点）。例如，`a--b-example-com` 变为 `a-b.example.com`。
4. 对第 3 步的结果进行 punycode 编码。有关 punycode，请参阅 [RFC 3492](https://tools.ietf.org/html/rfc3492)。

在第 4 步中得到的结果就是发布商域名。协议无法从域名本身获取，它要么是 `http`，要么是 `https`。端口始终是协议的默认端口。

## 重定向和错误处理

以下示例说明了 AMP 缓存如何处理重定向和错误：

**重定向**

AMP 缓存在解析 AMP 网址时会追踪重定向。例如，如果网址重定向到其他 AMP 网址：

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

那么，AMP 缓存将返回原始网址的已解析重定向内容。

示例：[https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html)。

重要提示：如果在服务器上移动 AMP 文件的位置，请确保设置一个从旧位置指向新位置的重定向。

**找不到**

如果在 AMP 缓存中找不到某个网页，将显示一个错误页面并返回状态代码 404。

示例：[https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**无效 AMP**

如果网页是无效 AMP，AMP 缓存将重定向到规范网页。

示例：[https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**服务器错误**

如果网址返回服务器错误 5XX，AMP 缓存将返回状态代码 404。

示例：[https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
