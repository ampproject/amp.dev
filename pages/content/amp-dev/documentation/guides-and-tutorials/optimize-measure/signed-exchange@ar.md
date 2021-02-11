---
'$title': خدمة AMP باستخدام التبادلات الموقّعة
$order: 4
formats:
  - websites
author: CrystalOnScript
---

توفر AMP مزايا سرعة تتجاوز التنسيق من خلال تقنيات مثل التخزين المؤقت والتحميل المُسبق. يمكن أن يكون لهذه المزايا [جوانب سلبية](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/) مثل عناوين URL الإضافية التي يتم عرضها عند التضمين داخل [عارض AMP](https://developers.google.com/search/docs/guides/about-amp). من خلال تقديم محتوى AMP باستخدام التبادلات الموقّعة، يمكنك استخدام ميزة "منصة الويب" الجديدة للتغلب على كل ذلك.

يتكون [التبادل الموقّع](https://developers.google.com/web/updates/2018/11/signed-exchanges) من مستند AMP صالح وعنوان URL الأصلي للمحتوى. هذه المعلومات محمية من خلال التوقيعات الرقمية التي تربط المستند بشكل آمن بعنوان URL الخاص بها. يتيح ذلك للمتصفحات عرض عنوان URL الأصلي بأمان في شريط URL بدلاً من اسم مضيف الجهاز الذي قام بتسليم وحدات البايت إلى المتصفح.

يتم تسليم محتوى AMP الموقّع _بالإضافة إلى_ (بدلاً من) محتوى AMP العادي.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='عنوان URL لعرض الصورة من عملية التبادل الموقعة', caption=' ', align='' ) }}

[tip type="note"] يتم دعم هذه الميزة حاليًا على Chrome، ولكن هناك خطط موضوعة للتنفيذ على متصفحات إضافية. [/tip]

# هل ستعمل التبادلات الموقّعة معي؟

لتنفيذ التبادلات الموقّعة، يجب أن تستوفي المتطلبات التالية:

- القدرة على تكوين عناوين HTTP التي تم إنشاؤها بواسطة الخادم الخاص بك والتحكم فيها. (معظم حلول الاستضافة المستندة إلى الويب البحتة مثل Blogger _غير_ متوافقة مع التبادلات الموقّعة.)
- القدرة على إنشاء تبادلات AMP موقّعة، مثل تشغيل خادم [`amppackager{/ code1}`](https://github.com/ampproject/amppackager/blob/master/README.md)، على أنه [Go binary](https://golang.org/doc/install)، أو داخل [Docker VM](https://docs.docker.com/machine/get-started/).
  - يجب تحديث أداة إنشاء الحِزم كل ستة أسابيع.
- القدرة على [التنوع](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) ugn رؤوس `Accept` و`AMP-Cache-Transform` على خوادم HTTP، وإرجاع محتوى مختلف لعنوان URL نفسه.
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

[tip type="read-on"] راجع [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (المستخدم بواسطة `amp.dev`) للحصول على مثال حول التغييرات بجانب الخادم التي ستحتاج إلى إجرائها لتوجيه الطلبات المطلوبة إلى `amppkg`. [/tip]

### الاختبار

تحقق من أن الموقع المرحلي الخاص بك يستجيب بمحتوى من نوع MIME بالقيمة `application/signed-exchange` عند تحديده بواسطة طلب HTTP. على سبيل المثال (استبدل `staging.example.com` بخادمك المرحلي):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

يجب أن يتضمن الإخراج هذا السطر:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"] يُعد `v="1..100"` في الطلب عنصرًا نائبًا. لا يتطابق مع هذه القيمة تمامًا؛ بدلاً من ذلك، [كما هو موضح في تعليمات تثبيت amppackager](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing)، تحقق من وجود الرأس `amp-cache-transform` فقط، وتجاهل القيمة. [/tip]

[tip type="important"] سلسلة الإصدار `v=b3` في الاستجابة هي الإصدار اعتبارًا من أغسطس 2019. سيتغير هذا الإصدار. [/tip]

يجب أن يكون الجزء الأكبر من الاستجابة هو صفحة AMP الخاصة بك (بنص عادي). يوجد رأس ثنائي صغير، وإذا كانت الصفحة أكبر من 16 كيلوبايت، يتم توزيع بضع وحدات بايت ثنائية في كل مكان.

يمكن استخدام أداة [`dump-signedexchange`](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) لفحص الاستجابة:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(لاحظ أن مفتاح التحويل `-verify` لن يعمل في هذه المرحلة لأن الشهادات المطلوبة ليست على خادم `https://example.com/`.)

تحقق من أن الاستجابة _دائمًا_ تتضمن رأس `Vary` مع القيمة `Accept,AMP-Cache-Transform` (بغض النظر عما إذا كان نوع MIME هو `text/html` أو `application/signed-exchange` أو أي شيء آخر):

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

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='اختبار Chrome بمساعدة ملحق ModHeader', caption=' ', align='' ) }}

بعد طلب `https://example.com/` سيعرض الخادم تبادلاً موقّعًا، ولكن يجب أن يبدو ويتصرف كما كان من قبل. ستحتاج إلى التحقق من إرجاع التبادل الموقّع بشكل صحيح عبر [ وحدة تحكم DevTools](https://developers.google.com/web/tools/chrome-devtools/).

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='عرض ترويسة التبادل الموقّع في وحدة تحكم DevTools', caption=' ', align='' ) }}

ضمن علامة التبويب `Network` انقر على اسم مجالك وتحقق من ظهور `Signed HTTP exchange` ضمن `Preview`.

#### باستخدام ذاكرة Google AMP للتخزين المؤقت

تأكد من توافق التبادلات الموقّعة مع ذاكرة التخزين المؤقت من Google AMP. يتعلق هذا بإمكانية اكتشافها على محركات البحث مثل "بحث Google".

لاختبار التبادلات الموقّعة في ذاكرة Google AMP للتخزين المؤقت، افتح علامة تبويب الشبكة في DevTools، وقم بتمكين `Preserve log`، وانتقل إلى عنوان URL مثل `https://example-com.cdn.ampproject.org/wp/s/example.com/`.

ستقوم DevTools بعرض `200` باستخدام صف `signed-exchange` و`from signed-exchange`، إذا كان الطلب ناجحًا.

إذا لم ينجح، سيتم فقد صفوف التبادل الموقّع، أو سيتم تمييزها باللون الأحمر. كما قد يتوفر رأس `warning` الذي يقدّم معلومات إضافية.

## التبادلات الموقّعة في بحث Google

إذا تم توزيع صفحات AMP الخاصة بك بنجاح على أنها عمليات تبادل موقّعة، ستعرض نتائج البحث سهم البرق الخاص بصفحات AMP، كما كان من قبل، ولكن النقر على النتائج سيعرض `https://example.com` في شريط عنوان URL، بدلاً من عنوان URL يبدأ بـ `https://www.google.com/amp/….`. بالإضافة إلى ذلك، لن يظهر شريط `viewer`.

داخل وحدة تحكم DevTools، ضمن علامة التبويب `network` ستتمكّن من رؤية `signed-exchange` ضمن العمود `type`.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='دخل وحدة تحكم DevTools، أسفل علامة تبويب الشبكة، ستتمكن من رؤية التبادل الموقّع تحت عمود النوع.', caption=' ', align='' ) }}

# مزوّدو خدمة التبادل الموقّعة

فيما يلي قائمة بشبكات توصيل المحتوى (CDN) ومزوّدي الاستضافة الذين يقدمون دعمًا خارج الصندوق لعمليات التبادل الموقّعة. يُعد استخدام أحد هذه أسهل طريقة لبدء التبادلات الموقّعة:

- تعد [AMP Packager Google Cloud Click-to-Deploy Installer](https://console.cloud.google.com/marketplace/details/google/amp-packager?filter=solution-type:k8s) [AMP Packager](https://github.com/ampproject/amppackager#amp-packager) أداة لتحسين عناوين URL لصفحات AMP من خلال تقديم AMP باستخدام المبادلات الموقّعة. اقرأ المزيد في [مدونة AMP](https://blog.amp.dev/2020/11/23/amp-packager-is-now-available-on-google-cloud-marketplace/).
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/). [Cloudflare](https://www.cloudflare.com/) هي إحدى أكبر الشبكات في العالم. اليوم، تفتخر الشركات والمؤسسات غير الربحية والمدونون وأي شخص له وجود على الإنترنت بمواقع وتطبيقات أسرع وأكثر أمانًا بفضل Cloudflare.
