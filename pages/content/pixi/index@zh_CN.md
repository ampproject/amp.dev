---
"$title": AMP 网页体验指南
staticText:
  inputBar:
    headline: 分析您的 AMP 网页
    fieldPlaceholder: 输入网址
    button: 分析
  infoDialog:
    open: 了解
    close: 关闭
  scrollToTop: 滚动到顶部
  shareDialog:
    headline: 复制并粘贴网址
    close: 关闭导航
    copyToClipboard: 复制到剪贴板
    success: 成功
  statusIntro:
    headline: 请稍候
    headline2: 我们正在分析您的网页
    loadingCopy: 已完成 ${finishedChecks} 项检查，共 ${totalChecks} 项
    buttonShare: 共享
    buttonInvestigate: 调查
  coreWebVitals:
    headline: 核心网页指标
    tabsAriaLabel: 实测数据和实验室数据标签
    fieldData: 实测数据
    labData: 实验室数据
    fieldDataExplainer: 此数据每天更新，28 天为一个循环周期。
    labDataExplainer: 此数据来自综合测试，不会影响网页体验。
    loadingSpeed: 加载速度
    interactivity: 互动
    visualStability: 视觉稳定性
    pageLoads: 网页加载
    thresholdMarker: 第 75 百分位
    resultLabels:
      scorePercentile: 第 75 百分位的得分
      score: 得分
      opportunity: 改进机会
      pagesPassing: 访问通过
      action: 采取操作
  additionalChecks:
    headline: 其他检查
    safeBrowsing: 安全浏览
    https: HTTPS
    mobileFriendliness: 移动设备适合性
    intrusiveInterstitials: 侵扰性插页式广告
    checkManually: 手动检查
  recommendations:
    headline: 采取操作。改进您的 AMP 网站
    nextAdvice: 下一条建议
  tags:
    all: 全部
scriptText:
  inputBar:
    fieldError: 请输入有效网址
  status:
    analyzing: 正在分析
    calculating: 正在计算
    error: 分析失败
    failed: 失败
    passed: 通过
    passedAddition: 通过
    none: 无
    nothingToDo: "无需任何操作！&#x1F389;"
    fileAnIssue: 提交 AMP 问题
    recommendation: 建议
    recommendations: 建议
  buttonFixIt: 立即修复
  buttonMakeImprovements: 进行改进
  detailsHeadlineImages: 要考虑的图片
  detailsHeadlineOther: 受影响的资源
  thumbnail: 缩略图
  categories:
    fast: 良好
    average: 需要改进
    slow: 速度慢
  tags:
    lcp: LCP
    fid: FID 和 TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: 移动设备适合性
    safeBrowsing: 安全浏览
    intrusiveInterstitials: 侵扰性插页式广告
---

AMP 网页体验指南作为一种工具，可以让 AMP 开发者了解，根据 Google 搜索页面体验排名信号其 AMP 网页的表现情况，并且可以就网页的改进方式提供切实可行的反馈。如果我们无法为您提供切实可行的见解，请使用相应的提示[在 GitHub 上提交议题](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue)，以便我们的团队可以帮助您了解如何改进您的 AMP 网页。我们使用公开的 API，例如 [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=zh_CN)、[安全浏览](https://developers.google.com/safe-browsing/v4/lookup-api?hl=zh_CN)和[移动设备适合性测试](https://search.google.com/test/mobile-friendly?hl=zh_CN)。
