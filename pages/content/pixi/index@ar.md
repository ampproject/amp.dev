---
$title: دليل تجربة صفحة AMP
staticText:
  inputBar:
    headline: تحليل صفحة AMP الخاصة بك
    fieldPlaceholder: إدخال عنوان URL
    button: تحليل
  infoDialog:
    open: تعرف على
    close: إغلاق
  scrollToTop: التمرير إلى الأعلى
  shareDialog:
    headline: نسخ عنوان URL ولصقه
    close: إغلاق التنقل
    copyToClipboard: نسخ إلى الحافظة
    success: نجاح
  statusIntro:
    headline: يرجى الانتظار لحظة
    headline2: إننا نحلل صفحتك
    loadingCopy: تم اكتمال عملية التحقق من ${finishedChecks} من أصل ${totalChecks}
    buttonShare: مشاركة
    buttonInvestigate: الاستقصاء
  coreWebVitals:
    headline: عناصر الويب الحيوية الأساسية
    tabsAriaLabel: علامات تبويب البيانات الميدانية والمعملية
    fieldData: البيانات الميدانية
    labData: البيانات المعملية
    fieldDataExplainer: يتم تحديث هذه البيانات يوميًا لفترة 28 يومًا.
    labDataExplainer: تأتي هذه البيانات من الاختبارات التركيبية ولا تؤثر على تجربة الصفحة.
    loadingSpeed: سرعة التحميل
    interactivity: التفاعلية
    visualStability: الاستقرار المرئي
    pageLoads: تحميلات الصفحة
    thresholdMarker: النسب المئوية ضمن 75
    resultLabels:
      scorePercentile: الدرجة عند النسب المئوية ضمن 75
      score: الدرجة
      opportunity: فرصة للتحسين
      pagesPassing: نقل مؤشرات الصفحة
      action: اتخاذ إجراء
  additionalChecks:
    headline: عمليات فحص إضافية
    safeBrowsing: تصفح آمن
    https: HTTPS
    mobileFriendliness: التوافق مع الهاتف المحمول
    intrusiveInterstitials: صفحات بينية متدخلة
    checkManually: فحص يدوي
  recommendations:
    headline: اتخذ إجراءً، حسِّن من موقع AMP لديك
    nextAdvice: النصيحة التالية
  tags:
    all: الكل
scriptText:
  inputBar:
    fieldError: يرجى إدخال عنوان URL صالح
  status:
    analyzing: جارٍ التحليل
    calculating: جارٍ الحساب
    error: فشل التحليل
    failed: فشل
    passed: نجاح
    passedAddition: نجاح
    none: لا يوجد
    nothingToDo: لا يوجد إجراء مطلوب &#x1F389;
    fileAnIssue: الإبلاغ عن مشكلة في AMP
    recommendation: توصية
    recommendations: توصيات
  buttonFixIt: الإصلاح الآن
  buttonMakeImprovements: أجرِ تحسينات
  detailsHeadlineImages: صور يجب وضعها في الحسبان
  detailsHeadlineOther: الموارد المتأثرة
  thumbnail: الصورة المصغرة
  categories:
    fast: جيد
    average: تحتاج إلى تحسينات
    slow: سيئة
  tags:
    lcp: أكبر عرض للمحتوى
    fid: تأخر الإدخال الأول ووقت الحظر الإجمالي
    cls: تحول التخطيط التراكمي
    https: HTTPS
    mobileFriendliness: التوافق مع الهاتف المحمول
    safeBrowsing: تصفح آمن
    intrusiveInterstitials: صفحات بينية متدخلة
---

إن دليل تجربة صفحة AMP أداة توضح لمطوري AMP طريقة أداء صفحات AMP الخاصة بهم في ضوء إشارة تصنيف تجربة صفحة بحث Google، كما يوفر تعليقات عملية حول طريقة تحسينها. إذا لم نتمكن من تزويدك بإحصاءات قابلة للتنفيذ، فيرجى استخدام رسائل التوجيه المتاحة [للإبلاغ عن مشكلة على GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue) حتى يتمكن فريقنا من مساعدتك في فهم طريقة تحسين صفحات AMP الخاصة بك. وإننا نستخدم واجهات برمجة التطبيقات المتاحة للجمهور مثل [رؤى سرعة الصفحة](https://developers.google.com/speed/pagespeed/insights/?hl=ar) و[التصفح الآمن](https://developers.google.com/safe-browsing/v4/lookup-api?hl=ar) و[اختبار التوافق مع الهاتف المحمول](https://search.google.com/test/mobile-friendly?hl=ar).
