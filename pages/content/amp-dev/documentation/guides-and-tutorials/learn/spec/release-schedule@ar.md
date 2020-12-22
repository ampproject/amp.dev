---
"$title": جدولة إصدار AMP
order: '10'
formats:
- websites
- email
- stories
- ads
teaser:
  text: "- قنوات الإصدار"
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/contributing/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [Release Channels](#release-channels)
    - [Nightly](#nightly)
    - [Weekly](#weekly)
        - [Experimental and Beta channels](#experimental-and-beta-channels)
    - [Long-Term Stable (lts)](#long-term-stable-lts)
- [Determining if your change is in a release](#determining-if-your-change-is-in-a-release)
- [Release Cadence](#release-cadence)
    - [Detailed schedule](#detailed-schedule)
    - [Release Freezes](#release-freezes)

A new release of AMP is pushed to all AMP pages every week on Tuesday. **Once a change in AMP is merged into the master branch of the amphtml repository, it will typically take 1-2 weeks for the change to be live for all users.**

## قنوات الإصدار <a name="release-channels"></a>

يتم توفير وقت تشغيل AMP والملحقات من خلال مجموعة متنوعة من *قنوات الإصدار* المختلفة. إذ تخدم كل قناة غرضًا للمطورين ولمشروع AMP HTML نفسه. راجع [قسم وتيرة الإصدار](#release-cadence) للحصول على مزيد من التصنيف التفصيلي حول كيف ومتى يدخل الرمز من المستودع [`ampproject/amphtml`](https://github.com/ampproject/amphtml) في بناءات الإصدارات.

ولتحديد ما إذا كان قد تم تضمين طلب سحب في أي من قنوات الإصدار التالية، ابحث عن علامات GitHub المميزة *استخدام طلب سحب: في Canary*، أو *استخدام طلب السحب: في Production*، أو *استخدم طلب السحب: في LTS* (راجع قسم [تحديد ما إذا كان التغيير الخاص بك في إصدار](#determining-if-your-change-is-in-a-release) للحصول على مزيد من التفاصيل).

### كل ليلة<a name="nightly"></a>

يتم تحديث قناة الإصدار **كل ليلة** (كما يشير اسمها) كل ليلة من أيام الأسبوع. فهذه العملية تلقائية، وليس هناك ما يضمن خلو أي إصدار معين من إصدارات كل ليلة من الأخطاء أو المشكلات الأخرى. وكل ليلة بعد منتصف الليل (توقيت زمني لمنطقة المحيط الهادي)، يتم تحديد الالتزام "الأخضر" الأخير من اليوم ليكون نقطة توقف الإصدار. ويشير التصميم الأخضر إلى أن جميع الاختبارات الآلية قد اجتيزت في هذا الإصدار.

ويوفر إصدار كل ليلة آلية لاكتشاف المشكلات وحلها بسرعة وقبل أن تصل إلى قنوات الإصدار الأكثر زيارة *أسبوعيًا*. كما أنه يعمل على تقليل عدد المستخدمين المتأثرين بالمشكلات التي تم إدخالها حديثًا.

ومن الممكن الاشتراك في القناة **كل ليلة**، لاختبار طلبات السحب التي تم دمجها في الأيام القليلة الماضية. راجع [قسم الاختيار](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) في [DEVELOPING.md] للحصول على مزيد من التفاصيل.

### أسبوعيًا <a name="weekly"></a>

تُعد قنوات الإصدار *الأسبوعية* بمثابة قنوات الإصدار "الدائمة" الأساسية. إذ يتم كل أسبوع ترقية الإصدار **الأولي** من الأسبوع السابق إلى قناة الإصدار **المستقرة**، ويتم ترقية الإصدار **الأخير** من الأسبوع السابق إلى قنوات الإصدار **التجريبية{/ strong4} و**الأولية** (راجع [الجدولة التفصيلية](#detailed-schedule)).**

وهناك مجموعتان من تكوينات البناء المستخدمة في إنشاء بناءات الإصدار: تكوين *canary* و*production*. ويتم إنشاء قنوات الإصدار **التجريبية** و**الأولية** من الالتزام نفسه. مع ذلك، تستخدم القناة **التجريبية** تكوين *canary* بينما تستخدم القناة **&nbsp;الأولية** تكوين *production*. إذ يتيح تكوين *canary* المكونات والميزات التجريبية التي يمكن إيقاف تشغيلها في *production*. ومن الممكن الاشتراك في القنوات **التجريبية** أو **الأولية** عبر [صفحة التجارب](https://cdn.ampproject.org/experiments.html).

فيما يتم إنشاء قناة الإصدار **المستقرة** بتكوين*production* وعرضها على معظم زيارات AMP. ونظرًا لأن قناة الإصدار **الأولية** قد تم بناؤها أيضًا بتكوين *production*، فإنها تمثل البنية الدقيقة التي ستصبح **مستقرة** في الأسبوع التالي (مع إمكانية انتقاء المواد لإصلاح مشكلات اللحظة الأخيرة؛ راجع [رمز المساهمة](https://github.com/ampproject/amphtml/blob/master/contributing/contributing-code.md#Cherry-picks)).

#### القنوات الأولية والتجريبية <a name="beta-and-experimental-channels"></a>

يمثل كل من *القناة الأولية* و*التجريبية* قناتين مرشحتين للإصدار المسبق للإصدار المستقر التالي من AMP. فكل يوم ثلاثاء (باستثناء الأسابيع التي يوجد فيها [عمليات تجميد للإصدار](#release-freezes))، يتم ترقية إصدار **كل ليلة** الخاص بالأسبوع الماضي إلى قنوات تمكين مطوري البرامج لـ **الإصدار الأولي** و**التجريبي**. وبعد فترة يوم واحد حيث نتحقق من عدم إدخال أي ميزة أو تراجع في الأداء في هذه القنوات، فإننا نروج لهذا الإصدار يوم الأربعاء لجزء صغير من الزيارات. ويتم بعد ذلك ترقية هذا الإصدار نفسه إلى القناة **المستقرة** يوم الثلاثاء من الأسبوع التالي.

ومن الممكن الاشتراك في هذه القنوات. راجع [قسم التمكين](https://github.com/ampproject/amphtml/blob/master/contributing/DEVELOPING.md#opting-in-to-pre-release-channels) في [DEVELOPING.md] للحصول على مزيد من التفاصيل.

إذ يهدف الاشتراك في *القناة الأولية* إلى:

- اختبار إصدار وقت تشغيل AMP الذي سيتم إصداره قريبًا وتشغيله
- استخدام ضمان الجودة (QA) لضمان توافق موقعك مع الإصدار التالي من AMP

فيما تهدف *القناة التجريبية* إلى:

- اختبار ميزات جديدة غير متوفرة بعد لجميع المستخدمين وتشغيلها
- استخدام ضمان الجودة (QA) لضمان توافق موقعك مع الميزات القادمة من AMP التي لا تزال قيد التطوير

وقد تكون *القناة التجريبية* **أقل استقرارًا** وقد تحتوي على ميزات غير متوفرة حتى الآن لجميع المستخدمين.

### الاستقرار طويل المدى <a name="long-term-stable-lts"></a>

توفر قناة الإصدار **الاستقرار طويل المدى** إصدارًا **مستقرًا** سابقًا لفواصل زمنية مدتها شهر واحد. وفي ثاني يوم إثنين من كل شهر، يتم ترقية الإصدار **المستقر** الحالي إلى **استقرار طويل المدى**. وهذه القناة غير مستحسنة لجميع ناشري AMP. كما يتم توفيرها بحيث يمكن للناشرين الذين يرغبون في إجراء دورة ضمان الجودة على مواقع الويب لديهم في كثير من الأحيان القيام بذلك عن طريق اختيار صفحات ويب معينة في القناة **استقرار طويل المدى** (راجع <a href="https://github.com/ampproject/amphtml/blob/master/contributing/lts-release.md" data-md-type="link">قراءة تعليمات **الاستقرار طويل المدى**</a>).

If the second Monday of the month falls on a holiday, the promotion will be performed after the end of the [release freeze](#release-freezes).

مهم: يجب على الناشرين الذين يستخدمون قناة الإصدار **الاستقرار طويل المدى** عدم استخدام الميزات المقدمة حديثًا. ونظرًا للدورة الأطول، قد يتأخر إصدار **الاستقرار طويل المدى** بمقدار سبعة أسابيع عن`HEAD` الخاص بـ  [`ampproject/amphtml`](https://github.com/ampproject/amphtml). راجع قسم [تحديد ما إذا كان التغيير الخاص بك في إصدار](#determining-if-your-change-is-in-a-release) للتحقق مما إذا كان التغيير سيكون جاهزًا في دورة الإصدار التي اخترتها.

## تحديد ما إذا كان التغيير الخاص بك ضمن إصدار أم لا <a name="determining-if-your-change-is-in-a-release"></a>

[*Type: Release* GitHub issues](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) are used to track the status of current and past releases; from the initial cut, to testing via **experimental**/**beta** channels, to eventual release via the **stable** and **lts** channels. Announcements about releases are made on the [AMP Slack #release channel](https://amphtml.slack.com/messages/C4NVAR0H3/) ([sign up for Slack](https://bit.ly/amp-slack-signup)).

يمكنك تحديد التغييرات في بناء معين باستخدام أحد الخيارات التالية:

- [*النوع: إصدار* مشكلات GitHub](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) لكل بنية إصدار ستشمل ارتباطًا [بصفحة الإصدار](https://github.com/ampproject/amphtml/releases) المحددة التي تدرج التغييرات المضمنة في الإصدار.
- يتم إضافة العلامات المميزة [*استخدام طلب السحب: في الأولية/التجريبية*](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22)، [*استخدام طلب السحب: في المستقرة*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22)، [*استخدام طلب السحب: في الاستقرار طويل المدى*](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) إلى طلبات السحب عندما يصلون إلى إصدار *أسبوعي* أو **استقرار طويل المدى**. وقد يكون هناك تأخير بين وقت إنشاء الإصدار ووقت إضافة العلامة المميزة.

## وتيرة الإصدار <a name="release-cadence"></a>

وإننا نتوخى الحذر عن قصد مع وتيرة الإصدار لدينا.

فعند تحديد عدد المرات التي يجب أن نطرح فيها إصدارات جديدة من AMP للجميع، يتعين علينا تقييم العديد من العوامل بما في ذلك:

- الاستقرار لملايين المواقع/مليارات الصفحات التي تم إنشاؤها باستخدام AMP
- cache-busting that might happen when we push a new version
- الرغبة في الحصول على ميزات جديدة بسرعة

وبعد النظر في كل هذه العوامل، نصل إلى دورة الإطلاق من أسبوع إلى أسبوعين. ووجدنا حتى الآن أن هذا حل وسط معقول، لكننا سنواصل تقييم كل هذه العوامل وقد نجري عليها تغييرات في المستقبل.

### جدولة مفصلة <a name="detailed-schedule"></a>

إننا نحاول الالتزام بهذا الجدول قدر الإمكان، على الرغم من أن التعقيدات قد تسبب في عمليات تأخير. فيما يمكنك تتبع آخر حالة حول أي إصدار في [*النوع: إصدار* مشكلات GitHub](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) و[قناة #إصدار AMP Slack](https://amphtml.slack.com/messages/C4NVAR0H3/) ([التسجيل في Slack](https://bit.ly/amp-slack-signup)).

- Tuesday @ [11am Pacific](https://www.google.com/search?q=11am+pacific+in+current+time+zone): new **experimental** and **beta** release builds are created from the [latest master build that passes all of our tests](https://travis-ci.com/ampproject/amphtml/branches) and are pushed to users who opted into the [AMP Experimental Channel](#amp-experimental-and-beta-channels) or [AMP Beta Channel](#amp-experimental-and-beta-channels), respectively.
- الأربعاء: نتحقق من تقارير الأخطاء لمستخدمي *القناة التجريبية* و*القناة الأولية* وإذا بدا كل شيء على ما يرام، فإننا نطلق **الإصدار الأولي** إلى 1٪ من صفحات AMP
- من الخميس إلى الإثنين: نواصل مراقبة معدلات الخطأ وتقارير الأخطاء لمستخدمي *القناة التجريبية* و*القناة الأولية* و1٪ من الصفحات باستخدام البنائين **التجريبي**/**الأولي**
- الثلاثاء من الأسبوع التالي: يتم ترقية الإصدار **الأولي** بالكامل إلى **مستقر** (أي ستستخدم جميع صفحات AMP هذا الإصدار الآن)

### عمليات تجميد الإصدار <a name="release-freezes"></a>

هناك مناسبات نتخطى فيها إصدار AMP إلى الإنتاج، والمعروفة باسم تجميد الإصدار.

إذا تم الإعلان عن تجميد الإصدار لمدة أسبوع واحد إلى الأسبوع س:

- يظل إصدار الأسبوع السابق في **التجريبية**/**الأولية** لمدة أسبوع إضافي، بمعنى أن تخفيض الإصدار في الأسبوع س-1 لم يتم إطلاقه إلى **مستقر** في الأسبوع س كما هو الحال عادة. بدلاً من ذلك، سيتم إطلاقه إلى **مستقر** في الأسبوع س + 1.
- *لا{/ em0} يتم إنتاج بناء الإصدار الجديد في أسبوع التجميد (الأسبوع س).*
- سيتم استئناف الجدول العادي في الأسبوع س + 1، على سبيل المثال، يتم وقف **التجريبي**/**الأولي** في الأسبوع س + 1 ويتم ترقيته إلى **مستقر** في الأسبوع س +2.
- وإذا تمت جدولة الإصدار **مستقر** الذي تم الترويج له خلال الأسبوع س-1 في الأصل ليتم ترقيته إلى **الاستقرار طويل المدى** خلال الأسبوع س، فسيتم ترقيته الآن إلى **الاستقرار طويل المدى** يوم الإثنين من الأسبوع س + 1.
- وما تزال إصدارات **كل ليلة** يتم إنشاؤها والترويج لها، حيث إنها مؤتمتة بالكامل.

قد يحدث تجميد الإصدار بسبب:

- Times when there are not enough people available to push the AMP release to **stable** and monitor it. Currently, most of the people performing AMP releases are based in the United States, so this will usually be the weeks of the major US holidays of Independence Day (July 4), Thanksgiving (fourth Thursday in November), Christmas (25 December), and New Year's Eve/Day (December 31/January 1).
- حالة طارئة، مثل مشكلة تتعلق بالأمان أو الخصوصية على النحو الذي تحدده [لجنة التوجيه الفني (TSC)](https://github.com/ampproject/meta-tsc) أو الأشخاص الذين يقومون بتنفيذ الإصدار.
- Other situations when the stability of the codebase is deemed to be particularly important as determined by the TSC.

In all cases, except emergencies, the release freezes will be announced at least one month in advance.

لاحظ أنه ما لم يتم الإعلان عن خلاف ذلك، فإن تجميد الإصدار لا يعني تجميد الرمز. إذ ما يزال من الممكن كتابة التعليمات البرمجية ومراجعتها ودمجها أثناء تجميد الإصدار.
