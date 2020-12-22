---
"$title": خدمة AMP باستخدام التبادلات الموقّعة
"$order": '4'
formats:
- websites
author: CrystalOnScript
---

توفر AMP مزايا سرعة تتجاوز التنسيق من خلال تقنيات مثل التخزين المؤقت والتحميل المُسبق. يمكن أن يكون لهذه المزايا [جوانب سلبية](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/) مثل عناوين URL الإضافية التي يتم عرضها عند التضمين داخل [عارض AMP](https://developers.google.com/search/docs/guides/about-amp). من خلال تقديم محتوى AMP باستخدام التبادلات الموقّعة، يمكنك استخدام ميزة "منصة الويب" الجديدة للتغلب على كل ذلك.

A [signed exchange](https://developers.google.com/web/updates/2018/11/signed-exchanges) is made up of a valid AMP document and the original URL of the content. This information is protected by digital signatures that securely tie the document to its claimed URL. This enables browsers to safely display the original URL in the URL bar instead of the hostname of the machine that delivered the bytes to the browser.

يتم تسليم محتوى AMP الموقّع *بالإضافة إلى* (بدلاً من) محتوى AMP العادي.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"] This feature is currently supported on Chrome, but implementation is planned for additional browsers. [/tip]

# هل ستعمل التبادلات الموقّعة معي؟

لتنفيذ التبادلات الموقّعة، يجب أن تستوفي المتطلبات التالية:

- القدرة على تكوين عناوين HTTP التي تم إنشاؤها بواسطة الخادم الخاص بك والتحكم فيها. (معظم حلول الاستضافة المستندة إلى الويب البحتة مثل Blogger *غير* متوافقة مع التبادلات الموقّعة.)
- The ability to generate AMP signed exchanges, such as by running [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md), as a [Go binary](https://golang.org/doc/install), or within a [Docker VM](https://docs.docker.com/machine/get-started/).
    - يجب تحديث أداة إنشاء الحِزم كل ستة أسابيع.
- The ability to [Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) on `Accept` and `AMP-Cache-Transform` headers on edge HTTP servers, returning different content for the same URL.
- يحتاج النظام الذي يقوم بتشغيل `amppackager` إلى أن يكون قادرًا على إرسال طلبات الشبكة الصادرة من أجل:
    - المرجع المصدّق الذي يصدر شهادتك
    - خادم الناشر الذي يستضيف مستندات AMP للتوقيع
    - `cdn.ampproject.org` للحصول على الإصدار الحالي من AMP
- نظام ملفات تخزين مشترك دائم بين جميع مثيلات `amppackager` التي يتم تشغيلها في مركز البيانات نفسه.

# تنفيذ التبادلات الموقّعة

يوجد أدناه ترتيب التنفيذ المقترح لدعم التبادلات الموقّعة على مستندات AMP الخاصة بك.

## الحصول على شهادة TLS معتمدة

لإنتاج تبادلات موقّعة، تحتاج إلى شهادة TLS مع الامتداد `CanSignHttpExchanges`. اعتبارًا من أبريل 2019، [DigiCert](https://www.digicert.com/) هو المزود الوحيد لهذا الامتداد ([مزيد من المعلومات](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

لإنشاء الشهادة، سيطلب المرجع المصدّق (CA) طلب توقيع الشهادة (CSR)، والذي يمكن إنشاؤه بواسطة `openssl`. مثال CSR لصالح `ampbyexample.com`:

```sh
# generate private key (if necessary)

$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# generate CSR (the file ampbyexample-packager.csr)

$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```

## تحديد عناوين URL التي سيتم توقيعها

ستحتاج إلى إنشاء نمط عنوان URL الذي يحدّد المستندات التي يجب توقيعها. من الأهمية عدم توقيع محتوى خاص، مثل المعلومات الشخصية، لتجنب إرسال محتوى مضلل أو غير صحيح.

لأغراض تتعلق بالأداء، يجب أن يتم تمرير مستندات AMP الصالحة فقط إلى أداة إنشاء الحِزم كمدخل. بعض مستندات AMP غير الصالحة جيدة إذا لزم الأمر، ولكن يجب تجنب إرسال كل حركة مرور عبر أداة إنشاء الحِزم.

## نشر أداة إنشاء الحِزم إلى خادم مرحلي

يجب عليك أولاً إعداد التبادلات الموقّعة على خادم مرحلي للتحقق من صحة الإعداد قبل الترحيل إلى الإنتاج.

نُوصي باستخدام [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md) لإنشاء التبادلات الموقّعة. ومع ذلك، إذا لم يكن هذا مناسبًا لبيئة الإنتاج، يمكنك بدلاً من ذلك استخدام عملاء سطر الأوامر [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md) و[`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange)، وتولي مهام التفاوض بشأن المحتوى وإدارة الشهادات بنفسك.

تنطبق الإرشادات التالية على عمليات النشر التي تستخدم `amppackager`.

### التكوين

ملف تكوين [`amppackager`](https://github.com/ampproject/amppackager) (`amppkg.toml`) يستدعي **CertFile** و**KeyFile**.

**KeyFile** هو المفتاح الخاص (`ampbyexample-packager.key` في المثال أعلاه)، ويجب أن يكون بالتنسيق التالي. (ملاحظة: لا تشارك مفتاحك الخاص، وقم بحمايته من المشاركة غير المقصودة!)

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

**CertFile** هي الشهادة العامة. إذا قدّمت DigiCert الشهادة، فيمكن إنشاء ذلك من خلال الجمع بين الشهادة الخاصة بالشهادة الأصل المُقدّمة من DigiCert وملف `DigiCertCA.crt` معًا.

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

### التثبيت

اتّبع الإرشادات [هنا لإعداد `amppackager` لموقعك](https://github.com/ampproject/amppackager/blob/master/README.md).

[tip type="read-on"] See [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (used by `amp.dev`) for an example of the server-side changes you will need to make to route the required requests to `amppkg`. [/tip]

### الاختبار

Verify that your staging site responds with content of MIME type `application/signed-exchange` when specified by the HTTP request. For example (replace `staging.example.com` with your staging server):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

The output must include this line:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] يُعد `v="1..100"` في الطلب عنصرًا نائبًا. لا يتطابق مع هذه القيمة تمامًا؛ بدلاً من ذلك، [كما هو موضح في تعليمات تثبيت amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing)، تحقق من وجود الرأس `amp-cache-transform` فقط، وتجاهل القيمة. [/tip]

[tip type="important"] سلسلة الإصدار `v=b3` في الاستجابة هي الإصدار اعتبارًا من أغسطس 2019. سيتغير هذا الإصدار. [/tip]

The bulk of the response should be your AMP page (in plaintext). There's a small binary header, and, if the page is >16kb, a few binary bytes sprinkled throughout.

يمكن استخدام أداة [`dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) لفحص الاستجابة:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(لاحظ أن مفتاح التحويل `-verify` لن يعمل في هذه المرحلة لأن الشهادات المطلوبة ليست على خادم `https://example.com/`.)

Verify that the response *always* include the `Vary` header with the value `Accept,AMP-Cache-Transform` (irrespective of whether the MIME type is `text/html`, `application/signed-exchange`, or something else):

```sh
$ curl -si https://staging.example.com/ | less
```

يجب أن يتضمن هذا المخرج هذا السطر:

```txt
vary: Accept,AMP-Cache-Transform
```

## نشر أداة إنشاء الحِزم في الإنتاج

### التثبيت

اضبط خطوات نشر المراحل أعلاه بما يتناسب مع بيئة الإنتاج الخاصة بك.

### الاختبار

#### باستخدام أدوات سطر الأوامر

قم بإجراء الاختبارات المذكورة نفسها أعلاه. `dump-signedexchange -verify` يجب أن تنجح الآن كذلك.

#### باستخدام Chrome

يمكنك أيضًا الاختبار في Chrome بمساعدة [ModHeader extension](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en). يمكنك تثبيته من متجر Chrome على الويب وتكوين `Request Headers` في `amp-cache-transform` باستخدام `Value` من `google`.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='Testing Chrome with the help of the ModHeader extension', caption=' ', align='' ) }}

بعد طلب `https://example.com/` سيعرض الخادم تبادلاً موقّعًا، ولكن يجب أن يبدو ويتصرف كما كان من قبل. ستحتاج إلى التحقق من إرجاع التبادل الموقّع بشكل صحيح عبر [ وحدة تحكم DevTools](https://developers.google.com/web/tools/chrome-devtools/).

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='Signed exchange header displayed in the DevTools console', caption=' ', align='' ) }}

Under the `Network` tab, click on your domain name and check that `Signed HTTP exchange` appears under `Preview`.

#### With the Google AMP Cache

تأكد من توافق التبادلات الموقّعة مع ذاكرة التخزين المؤقت من Google AMP. يتعلق هذا بإمكانية اكتشافها على محركات البحث مثل "بحث Google".

To test signed exchanges in the Google AMP cache, open the network tab in DevTools, enable `Preserve log`, and visit a URL such as `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

DevTools will show a `200` with a `signed-exchange` row, and a `from signed-exchange` row, if the request was successful.

إذا لم ينجح، سيتم فقد صفوف التبادل الموقّع، أو سيتم تمييزها باللون الأحمر. كما قد يتوفر رأس `warning` الذي يقدّم معلومات إضافية.

## التبادلات الموقّعة في بحث Google

If your AMP pages were successfully distributed as signed exchanges, their search results will display the AMP lightning bolt, same as before, but tapping on the results will show `https://example.com` in the URL bar, instead of a URL beginning with `https://www.google.com/amp/….`. Additionally, the `viewer` bar will not appear.

Within the DevTools console, under the `network` tab, you will be able to see `signed-exchange` under the `type` column.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='Within the DevTools console, under the network tab, you will be able to see signed-exchange under the type column.', caption=' ', align='' ) }}

# مزوّدو خدمة التبادل الموقّعة

فيما يلي قائمة بشبكات توصيل المحتوى (CDN) ومزوّدي الاستضافة الذين يقدمون دعمًا خارج الصندوق لعمليات التبادل الموقّعة. يُعد استخدام أحد هذه أسهل طريقة لبدء التبادلات الموقّعة:

- [AMP Packager Google Cloud Click-to-Deploy Installer](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) is a tool to improve AMP URLs by serving AMP using Signed Exchanges. Read more in [AMP Blog](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) هي إحدى أكبر الشبكات في العالم. اليوم، تفتخر الشركات والمؤسسات غير الربحية والمدونون وأي شخص له وجود على الإنترنت بمواقع وتطبيقات أسرع وأكثر أمانًا بفضل Cloudflare.
