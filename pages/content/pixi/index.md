---
$title: AMP Page Experience Guide
staticText:
  inputBar:
    headline: Analyze your AMP page
    fieldPlaceholder: Enter valid URL
    fieldError: Please enter a valid URL
    button: Analyze
  shareDialog:
    headline: Copy & paste URL
  statusIntro:
    headline: Please wait a moment
    headline2: We are currently analyzing your page
    loadingCopy: ${finishedChecks} out of ${totalChecks} checks are completed
    buttonFixIt: Fix it now
    buttonShare: Share
    buttonInvestigate: Investigate
  coreWebVitals:
    headline: Core Web Vitals
    tabsAriaLabel: Field and lab data tabs
    fieldData: Field data
    labData: Lab data
    loadingSpeed: Loading speed
    interactivity: Interactivity
    visualStability: Visual stability
    pageLoads: Page loads
    thresholdMarker: 75th percentile
    resultLabels:
      score: Your score
      opportunity: Opportunity to improve
      action: Take action
  additionalChecks:
    headline: Additional checks
    safeBrowsing: Safe Browsing
    https: HTTPS
    mobileFriendliness: Mobile Friendliness
    intrusiveInterstitials: Intrusive Interstitials
    checkManually: Check manually
  status:
    analyzing: Analyzing
    calculating: Calculating
    failed: Failed
    passed: Passed
    none: None
    nothingToDo: Nothing to do
    fileAnIssue: File an issue with AMP
    recommendation: recommendation
    recommendations: recommendations
  recommendations:
    headline: Take action. Improve your AMP site
  tags:
    all: All
    lcp: LCP
    fid: FID
    cls: CLS
    https: HTTPS
    mobileFriendliness: Mobile-friendliness
    safeBrowsing: Safe browsing
    intrusiveInterstitials: Intrusive Interstitials
---

The AMP page experience guide is a tool that shows AMP developers how their AMP pages are performing against the Google Search page experience ranking signal, and provides actionable feedback on how they can improve.

If we aren't able to provide you with actionable insights please use the available prompts to [file an issue on GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue) so our team can help you understand how your AMP pages can be improved.

We use publicly available APIs such as [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Safe Browsing](https://developers.google.com/safe-browsing/v4/lookup-api), and [Mobile-friendliness Test](https://search.google.com/test/mobile-friendly).
