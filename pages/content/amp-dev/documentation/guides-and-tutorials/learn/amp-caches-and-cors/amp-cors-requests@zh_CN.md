---
$title: AMP与CORS
---

许多AMP组件以及功能需要使用CORS（Cross-Origin Resource Sharing, 跨站资源资源共享)来请求远程服务器来获取数据。关于CORS，可以阅读[W3 CORS Spec](https://www.w3.org/TR/cors/)了解更多。

## 为什么我的站点需要使用CORS?? <a id="why-do-i-need-cors-for-my-own-origin"></a>

你可能会对此感到困惑，为什么请求自己域名的资源需要使用CORS？让我们来好好研究一下。

AMP组件（例如amp-from，amp-list等等）在获取动态数据(例如JSON)时会发送一个CORS请求来请求服务器提供数据。如果你的AMP页面包含了这类的组件，你可能就需要处理CORS的请求来防止请求失败的问题了。

让我们来举个例子：

我们假设你有一个AMP页面，页面展示了一些带有价格的产品。为了更新页面上产品的价格，用户点击了页面上更新价格的按钮，这个按钮会触发amp-list组件去获取最新的JSON数据来更新页面上产品的价格。当然，请求的JSON数据是存放在你自身的域名服务器上的。

好，这个页面和JSON数据都是在我的域名服务器上存放的资源，我并没有看到有任何问题。

嗯，但是你可以思考一个问题，用户最后是怎么到达你的AMP页面的呢？如果他们访问的是AMP Cache上面缓存的AMP页面呢？这个说明了你的用户有可能不是直接到达你的AMP页面的，也有可能从其他缓存(Cache)服务器到达你的AMP页面。举个例子，Google Search在搜索结果中使用了Google AMP Cache服务器提供的AMP页面，这样能够保证渲染AMP页面的速度足够快，这些页面因为来自Google Cache服务器，相比你的域名，是两个完全不一样的域名。当你用户在AMP Cache服务器上缓存的AMP页面中点击了更新价格的按钮，AMP页面会发送一个请求到你的域名服务器去获取价格数据，但是这个时候AMP Cache服务器跟你的服务器因为是不同域名的，产生了跨域的请求。为了处理跨域(Cross-Origin)的请求，你需要处理CORS，否则，请求将会返回错误。

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript>
    <img alt="CORS and Cache" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" />
  </noscript>
</amp-img>

**好，那我该怎么做去处理这种情况？**

1.  对于那些需要通过请求获取数据的AMP页面，请确认你已经对这些需要缓存的页面进行了测试。*不要仅仅在自己的域名上面测试* (请查看下面的[在AMP中测试CORS](#testing-cors-in-amp)进行了解)
2.  根据下面的教程来处理CORS的请求和响应。


## 在CORS中使用cookie <a id="utilizing-cookies-for-cors-requests"></a>

有很多AMP组件例如amp-list在使用CORS请求的时候会自动设置[credentials mode](https://fetch.spec.whatwg.org/#concept-request-credentials-mode)或者允许开发者自行设置。下面的例子中[`amp-list`](https://amp.dev/documentation/components/amp-list)组件通过使用CORS请求来获取远程服务器的数据，同时在请求时也设置了
`credentials`属性。

*例子： 通过amp-list的请求中携带cookie以方便进行用户个性化内容定制*

[sourcecode:html]
<amp-list credentials="include"
    src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${% raw %}{{price}}{% endraw %}
  </template>
</amp-list>
[/sourcecode]

设置了credentials mode以后，服务器可以在CORS请求中设置cookie作为响应。（但受到[第三方cookie的限制](#third-party-cookie-restrictions)）


### 第三方cookie的限制 <a name="third-party-cookie-restrictions"></a>

浏览器中对于第三方cookie限制也适用于AMP中的设置了credentialed mode的CORS请求。这些限制是基于浏览器平台的，对于一些浏览器，服务器的返回响应只可以对用户之前已经访问过了自己的站点内容的情况下设置cookie，换句话说，就是用户必须要先浏览过开发者自身站点上的页面才可以在CORS的响应中设置cookie。基于这个，一些需要CORS才能提供的数据或者服务不能保证cookie一定能正确设置。

## 在AMP中的CORS安全性 <a name="cors-security-in-amp"></a>

为了验证和确保请求是来自你自己的页面，你必须做到：

1. [验证CORS请求](#verify-cors-requests)
2. [发送正确的响应](#send-cors-response-headers)

如果你是使用Node作为后端的语言，你可以使用[AMP CORS middleware](https://www.npmjs.com/package/amp-toolbox-cors)这个中间件来处理上述的要求，这个中间件是[AMP Toolbox](https://github.com/ampproject/amp-toolbox)的其中一部分。


### 验证CORS请求 <a id="verify-cors-requests"></a>

当你的服务器收到CORS请求的时候：

1. [验证CORS请求头的 <code>Origin</code> 字段值是不是在允许的域名范围内(你自己的域名加上AMP Cache服务器的域名)](#verify-cors-header)。
2. [如果没有Origin字段，检查`AMP-Same-Origin`字段来确认是不是来自同源域名](#allow-same-origin-requests)。
3. [如果是状态变更请求（即会修改你服务器数据库中的数据请求），例如POST请求，检查`__amp_source_origin`字段来确认是不是来自同源域名](#restrict-requests-to-source-origins)。


#### 1) 允许来自指定域名的请求 <a name="1-allow-requests-for-specific-cors-origins"></a>
<span id="verify-cors-header"></span>

负责处理CORS请求的服务器可以通过请求头中`Origin`字段值来判断请求是否是在允许域名范围内，一般来说，服务器应该只允许以下来源的请求: (1)自身的域名 (2)在 <https://cdn.ampproject.org/caches.json> 中'cachedDomain'字段中的服务器域名。

举个例子，服务器应该允许以下来源的请求：
  *  Google AMP Cache 子域名: `https://<publisher's domain>.cdn.ampproject.org` <br>(例如, `https://nytimes-com.cdn.ampproject.org`)
  *    *  Bing AMP Cache: `https://<publisher's domain>.bing-amp.com`

[tip type="read-on"]

想要了解AMP Cache服务器子域名的URL格式，通过以下资源进行了解:
- [Google AMP Cache Overview](https://developers.google.com/amp/cache/overview)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

[/tip]


#### 2) 允许同一来源(Same-Origin)的请求 <a id="2-allow-same-origin-requests"></a>
<span id="allow-same-origin-requests"></span>

如果请求时`Origin`字段在请求头中没有设置，那么AMP将会设置以下字段:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

这个通过AMP自定义的请求头将会在XHR请求时携带告诉服务器是来自同一域名来源（例如，来自非AMP Cache服务器的数据或者文档）。

#### 3) 限制请求的来源 <a name="3-restrict-requests-to-source-origins"></a>
<span id="restrict-requests-to-source-origins"></span>

在所有的请求中，AMP会将`"__amp_source_origin"`加入到URL的查询参数中，这个参数值会包含请求来源的地址。（例如，`"https://publisher1.com"`）

为了限制请求的来源，请检查`"__amp_source_origin"`参数是在你允许的请求来源范围内。

### 发送正确的响应 <a id="send-cors-response-headers"></a>

在验证了CORS请求以后，作为结果的HTTP响应应该包含以下响应头：

##### Access-Control-Allow-Origin: &lt;origin&gt; <a name="access-control-allow-origin-ltorigingt"></a>


这个响应头是<a href="https://www.w3.org/TR/cors/">W3 CORS Spec</a> 要求用来处理CORS响应的，可以允许请求的来源使用CORS请求头(例如，<code>"https://&lt;publisher's subdomain>.cdn.ampproject.org"</code>)
尽管在W3 CORS Spec的文档中允许返回<code>*</code>作为响应，但是为了提高安全性，你应该

* 如果在请求头中带有Origin的字段，你应该验证这个字段的值并且返回这个字段的值作为响应头。

### 处理状态变更的请求 <a id="processing-state-changing-requests"></a>

[tip type="important"]

在你处理请求之前，请先完成下面这些验证。这些验证可以帮助有效避免CSRF的攻击，同时可以避免处理不可信的请求。

[/tip]

在处理一些可能会改变你的服务器数据的请求时(例如用户去订阅或者取消你网站的内容的请求)，请做以下检查：

**如果设置了 `Origin` 请求头字段**:

1.  如果Origin字段值不满足以下任意一个域名，停止处理请求并且返回错误相应:
    - `<你的域名>.cdn.ampproject.org`
    - `<你的域名>.amp.bing-amp.com`
    - 你的域名

    这里如果使用`*`作为响应头的话代表的是通配符，意思是允许所有域名进行请求，而不是一个*号。

2.  也可以选择检查`__amp_source_origin`请求参数，如果请求参数的值不是你的域名，停止处理请求并且返回错误相应。
3.  如果两个请求符合验证的要求的话，那就可以正常处理请求了。

**如果没有设置 `Origin` 请求头字段**:

1.  验证请求中是否包含`AMP-Same-Origin: true`这个字段，如果没有包含这个字段，停止处理请求并且返回错误相应。
2.  如果有的话，那就可以正常处理请求了.

## 处理CORS请求以及响应的例子 <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

在实际情况中，会有两种CORS请求去请求你自身的服务器数据的场景：

1. 来自同源服务器域名的请求
2. 来自缓存服务器域名的请求（来自AMP Cache服务器）

让我们直接通过例子来学习这两个请求的场景吧！在我们的例子中，我们拥有一台域名为`example.com`的服务器，这个服务器上面存放这一份名为`article-amp.html`的AMP页面文件，这个页面中包含了用来获取JSON数据`data.json`的`amp-list`，这两个资源均存放在`example.com`的服务器中。我们现在想要通过我们的AMP页面来请求`data.json`，这些请求有可能会发生来自同源服务器域名的请求，也有可能发生在不同服务器域名的请求（例如来自AMP Cache服务器）。

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript>
    <img alt="CORS example" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" />
  </noscript>
</amp-img>

### 允许请求来源 <a name="allowed-origins"></a>

基于我们已经了解CORS和AMP的关系(通过上面的 [验证CORS请求](#verify-cors-requests))，我们将沿用`example.com`作为我们的例子，同时我们设置只允许来自以下域名的请求：

* `example.com` ---  你的域名
* `example-com.cdn.ampproject.org` --- Google AMP Cache服务器子域名
* `example.com.bing-amp.com`--- Bing's AMP Cache服务器子域名

### 验证请求后的正确响应 <a name="response-headers-for-allowed-requests"></a>

在验证了请求的来源是我们允许的域名后，我们服务器应该返回带有以下响应的响应头:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

当然，我们也可以根据自身的要求设置额外的CORS响应头。

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### 处理CORS的伪代码逻辑 <a name="pseudo-cors-logic"></a>

我们在处理CORS请求以及响应的时候，实际上可以简化成下面的伪代码逻辑：

[sourcecode:text]
IF CORS header present
   IF origin IN allowed-origins AND sourceOrigin = publisher
      allow request & send response
   ELSE
      deny request
ELSE
   IF "AMP-Same-Origin: true"
      allow request & send response
   ELSE
      deny request
[/sourcecode]

#### 处理CORS的示例代码 <a name="cors-sample-code"></a>

这里是一个我们处理CORS请求以及响应的JavaScript示例方法：

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
  var unauthorized = 'Unauthorized Request';
  var origin;
  var allowedOrigins = [
     "https://example.com",
     "https://example-com.cdn.ampproject.org",
     "https://example.com.bing-amp.com",
     "https://cdn.ampproject.org" ];
  var allowedSourceOrigin = "https://example.com";  //publisher's origin
  var sourceOrigin = req.query.__amp_source_origin;


  // If same origin
  if (req.headers['amp-same-origin'] == 'true') {
      origin = sourceOrigin;
  // If allowed CORS origin & allowed source origin
  } else if (allowedOrigins.indexOf(req.headers.origin) != -1 &&
      sourceOrigin == allowedSourceOrigin) {
      origin = req.headers.origin;
  } else {
      res.statusCode = 401;
      res.end(JSON.stringify({message: unauthorized}));
      throw unauthorized;
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

[tip type="note"]
需要示例代码可以查看[app.js](https://github.com/ampproject/amphtml/blob/main/build-system/app.js#L1199).
[/tip]

### 场景1:  来自同源服务器上的AMP页面的请求 <a name="scenario-1--get-request-from-amp-page-on-same-origin"></a>

在下面的图例中，`article-amp.html`页面请求了`data.json`，两者是来源于同一服务器。

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript>
    <img alt="CORS example" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" />
  </noscript>
</amp-img>

如果我们去查看这个请求，我们会看到：

[sourcecode:text]
Request URL: https://example.com/data.json?__amp_source_origin=https%3A%2F%2Fexample.com
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

可以看出，这个请求是来源于同一服务器域名的请求，虽然没有`Origin`的请求头，但是AMP帮我们添加了`AMP-Same-Origin: true`的请求头，同时我们也可以看到`__amp_source_origin`这个查询参数。通过验证后，我们可以允许这个来自我们自身服务器域名下的请求。

所以，我们应该在返回的响应中添加以下相应头:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### 场景2:  来自缓存（Cache）服务器页面的请求（例如AMP Cache服务器） <a name="scenario-2--get-request-from-cached-amp-page"></a>

在下图中，存放在Google AMP Cache服务器中的`article-amp.html`请求了`exmpale.com`域名下的`data.json`，这两者并不是来源于同一个域名。

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript>
    <img alt="CORS example" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" />
  </noscript>
</amp-img>

如果我们去查看这个请求，我们会发现：

[sourcecode:text]
Request URL: https://example.com/data.json?__amp_source_origin=https%3A%2F%2Fexample.com
origin: https://example-com.cdn.ampproject.org
Request Method: GET
[/sourcecode]

因为这个请求中包括了`Origin`请求头字段，我们可以验证它是否在允许的域名之内。同时在这个请求的URL中里面我们可以也可以通过`__amp_source_origin`这个查询参数验证。因为这个请求是来自我们允许的域名之内，所以我们可以处理这个请求了。

所以，我们应该在响应中填写下面的响应头:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## 在AMP中测试CORS <a name="testing-cors-in-amp"></a>

<span id="#testing-cors-in-amp"></span>

在你准备调试你的AMP页面时，请保证包含了以下的测试来验证你的AMP页面。

### 通过Cache URL来验证AMP页面 <a name="verify-the-page-via-the-cache-url"></a>


为了确保你在AMP Cache服务器上缓存的页面能正确打开以及渲染：

1.  通过浏览器打开AMP Cache服务器上可以访问到你的AMP页面的URL，你可以通过[tool on AMP By Example](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/)这个工具来确认你的AMP页面在AMP Cache服务器上的缓存URL。

    例如:
    * AMP.dev网站的AMP页面URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
    * AMP Cache中缓存的URL: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2.  打开你的浏览器的开发者工具来验证页面中没有任何报错或者错误提示，同时确保所有的资源正确加载。

### 验证你的服务器响应是否正确 <a name="verify-your-server-response-headers"></a>

你可以使用`curl`命令来验证你的服务器是否返回了正确的响应。在`curl`命令中，你可以添加请求的URL以及任何你想要添加的自定义请求头。

**语法**:  `curl <request-url> -H <custom-header> - I`

模拟AMP使用CORS请求，可以通过添加`__amp_source_origin=`查询参数在请求URL的后面，这样可以模仿AMP在请求时自动添加`__amp_source_origin=`的行为。

#### 测试来自同一域名的请求 <a name="test-request-from-same-origin"></a>

假如是来自同一域名的请求，AMP会增加自定义请求头`AMP-Same-Origin:true`。

使用curl命令去测试模拟`https://ampbyexample.com`请求`examples.json`文件(在同一个域名上)：

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json?__amp_source_origin=https%3A%2F%2Fampbyexample.com' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

在使用了命令后，下面展示返回了正确响应的响应头信息（注意：其他响应头信息没有在这里展示）

[sourcecode:text]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### 来自Cache服务器上的AMP页面的请求 <a name="test-request-from-cached-amp-page"></a>

在来源并不是同一个域名下的CORS请求(例如来源于AMP Cache服务器上的页面的请求)，`origin`请求头将会在添加到请求中。

使用curl命令去测试模拟来源Google AMP Cache服务器上的页面请求`examples.json`文件：

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json?__amp_source_origin=https%3A%2F%2Fampbyexample.com' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

在使用了命令后，下面展示返回了正确响应的响应头信息：

```text
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
