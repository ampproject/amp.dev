---
"$title": 使用 Signed Exchange 提供 AMP
"$order": '4'
formats:
- 网站
author: CrystalOnScript
---

AMP 采用缓存和预加载等技术，除了格式之外，在速度方面也有诸多优势。这些优势也存在一些[缺点](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/)，例如，嵌入到 [AMP 查看工具](https://developers.google.com/search/docs/guides/about-amp)内部时，会显示多余的网址。如果使用 Signed Exchange 来提供 AMP 内容，便可使用新的网络平台功能来克服所有这些缺点。

[Signed Exchange](https://developers.google.com/web/updates/2018/11/signed-exchanges) 包含有效的 AMP 文档以及该内容的原始网址。此信息受数字签名保护，数字签名将文档与其声明的网址密切关联。这使得浏览器可以在网址栏中安全地显示原始网址，而不显示向浏览器传送字节的计算机的主机名。

*除了*（而不是取代）常规 AMP 内容外，还会传送签名的 AMP 内容。

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='显示 Signed Exchange 中的网址的图片', caption=' ', align='' ) }}

[tip type="note"] 此功能目前受 Chrome 支持，但计划在其他浏览器中实现。[/tip]

# Signed Exchange 是否适合我？

要实现 Signed Exchange，必须满足以下要求：

- 可以配置和控制服务器生成的 HTTP 标头（大部分纯基于网络的托管解决方案（例如 Blogger）都与 Signed Exchange *不*兼容。）
- 可以采用多种方式生成 AMP Signed Exchange，例如，通过运行 [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md)、作为 [Go 二进制文件](https://golang.org/doc/install)或者在 [Docker 虚拟机](https://docs.docker.com/machine/get-started/)中生成。
    - 该打包器需要每六个星期更新一次。
- 可以在 HTTP 边缘服务器上[改变](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) `Accept` 和 `AMP-Cache-Transform` 标头，从而对同一个网址返回不同的内容。
- 运行 `amppackager` 的系统必须能够向以下项发出出站网络请求：
    - 颁发证书的证书授权机构
    - 托管要签署的 AMP 文档的发布商服务器
    - 用于获取当前 AMP 版本的 `cdn.ampproject.org`
- 在同一数据中心运行的所有 `amppackager` 实例之间共享的永久存储文件系统。

# 实现 Signed Exchange

为了在 AMP 文档上支持 Signed Exchange，建议遵守以下实现顺序。

## 获取受支持的 TLS 证书

要生成 Signed Exchange，需要具有 `CanSignHttpExchanges` 扩展的 TLS 证书。自 2019 年 4 月起，[DigiCert](https://www.digicert.com/) 是此扩展的唯一发布商（[详细信息](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)）。

为了生成该证书，证书授权机构 (CA) 需要证书签署请求 (CSR)，该请求可由 `openssl` 生成。以下是 `ampbyexample.com` 的 CSR 示例：

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## 确定要签署的网址

您需要创建一种网址格式，用于确定应当签署哪些文档。至关重要的是，不应当签署个性化信息等私人内容，以免发送误导性内容或错误内容。

出于性能考虑，应当仅向打包器传递有效的 AMP 文档作为输入。必要时，某些无效的 AMP 文档也可以接受，但应当避免通过打包器发送所有流量。

## 将打包器部署到临时服务器

首先，应当在临时服务器上设置 Signed Exchange，用于在迁移到生产环境之前先确认设置正确。

我们建议使用 [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) 来生成 Signed Exchange。但是，如果该 Signed Exchange 不适合您的生产环境，您可以改用命令行客户端 [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) 和 [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange)，并自行处理内容协商和证书管理任务。

以下说明适用于使用 `amppackager` 进行部署。

### 配置

[`amppackager`](https://github.com/ampproject/amppackager) 的配置文件（`amppkg.toml`）需要 **CertFile** 和 **KeyFile**。

**KeyFile** 是私钥（上例中的 `ampbyexample-packager.key`），应当采用以下格式。（注：不要共享您自己的私钥，并防止无意共享！）

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

**CertFile** 是公钥证书。如果 DigiCert 提供了该证书，可以将 DigiCert 提供的来源特有的证书与 `DigiCertCA.crt` 文件连接在一起，从而创建该证书。

```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### 安装

按照[此处](https://github.com/ampproject/amppackager/blob/master/README.md)的说明来为网站安装 `amppackager`。

[tip type="read-on"] 请参阅 [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js)（由 `amp.dev` 使用），了解服务器端更改的示例，要想将所需请求转送到 `amppkg`，您需要进行这些服务器端更改。[/tip]

### 测试

验证您的临时网站使用 MIME 类型 `application/signed-exchange`（如果 HTTP 请求指定）内容做出响应。例如（将 `staging.example.com` 替换为您的临时服务器）：

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

输出必须包括以下行：

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] 请求中的 `v="1..100"` 为占位符。不要匹配这个确切值，而是[如 amppackager 安装说明中所述](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing)，检查是否只有 `amp-cache-transform` 标头，并忽略该值。[/tip]

[tip type="important"] 响应中的 `v=b3` 版本字符串是截至 2019 年 8 月的版本。此版本将会改变。[/tip]

大部分响应应当会在 AMP 网页上（以明文形式）呈现。有一个小的二进制标头，如果网页大于 16kb，表明分布了几个二进制字节。

可以使用 [`dump-signedexchange` 工具](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation)检查该响应：

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

（请注意，`-verify` 开关此时不起作用，因为 `https://example.com/` 服务器上没有所需的证书。）

验证该响应*始终*包含 `Vary` 标头和 `Accept,AMP-Cache-Transform` 值（而不管 MIME 类型是 `text/html`、`application/signed-exchange` 还是其他内容）：

```sh
$ curl -si https://staging.example.com/ | less
```

此输出必须包括以下行：

```txt
vary: Accept,AMP-Cache-Transform
```

## 将打包器部署到生产环境

### 安装

根据您的生产环境，调整上述临时部署步骤。

### 测试

#### 使用命令行工具

运行与上述相同的测试。`dump-signedexchange -verify` 现在应该也会成功。

#### 使用 Chrome

您也可以借助 [ModHeader 扩展程序](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en)在 Chrome 中进行测试。从 Chrome 网上应用店中安装该扩展程序，并使用 `google` 的 `Value` 将 `Request Headers` 配置为 `amp-cache-transform`。

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='使用 ModHeader 扩展程序测试 Chrome', caption=' ', align='' ) }}

请求 `https://example.com/` 后，您的服务器将传送 Signed Exchange，但其外观和行为应当与以前一样。您需要检查以确认 Signed Exchange 通过 [DevTools 控制台](https://developers.google.com/web/tools/chrome-devtools/)正常返回。

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='DevTools 控制台中显示的 Signed Exchange 标头', caption=' ', align='' ) }}

在 `Network` 标签下，点击域名，并确认 `Signed HTTP exchange` 显示在 `Preview` 下方。

#### 使用 Google AMP 缓存

确认 Signed Exchange 与 Google AMP 缓存兼容。这关系到是否可以在 Google 搜索等搜索引擎中发现它们。

要在 Google AMP 缓存中测试 Signed Exchange，请在 DevTools 中打开 Network 标签页，启用 `Preserve log`，然后访问 `https://example-com.cdn.ampproject.org/wp/s/example.com/` 等网址。

如果请求成功，DevTools 将在 `signed-exchange` 行中显示 `200`，并显示 `from signed-exchange` 行。

如果请求不成功，将缺少 signed-exchange 行，或者它们将被突出显示为红色。此外，可能还会显示 `warning` 标头，其中包含其他信息。

## Google 搜索中的 Signed Exchange

如果您的 AMP 网页已成功作为 Signed Exchange 分发，它们的搜索结果将显示 AMP 闪电图标，这与以前相同，但点按这些结果将会在网址栏中显示 `https://example.com`，而不是以 `https://www.google.com/amp/….` 开头的网址。此外，`viewer` 栏也不会显示。

在 DevTools 控制台的 `network` 标签页下，可以看到 `signed-exchange` 显示在 `type` 列下方。

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='在 DevTools 控制台的 network 标签页下，可以看到 signed-exchange 显示在 type 列下方。', caption=' ', align='' ) }}

# Signed Exchange 服务发布商

下面列出了为 Signed Exchange 提供开箱即用支持的 CDN 和托管发布商。要想开始使用 Signed Exchange，最简单的方法是从中选择一个发布商：

- [AMP Packager Google Cloud 点击即部署安装程序](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) 工具使用 Signed Exchange 为 AMP 提供支持，以此改进 AMP 网址。有关更多信息，请参阅 [AMP 博客](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/)。
- [Cloudflare AMP 真实网址](https://www.cloudflare.com/website-optimization/amp-real-url/)。[Cloudflare](https://www.cloudflare.com/) 是全球最大的网络之一。得益于 Cloudflare，企业、非盈利组织、博主以及任何使用互联网的人如今可以畅享更快、更安全的网站和应用。
