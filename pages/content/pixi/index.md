---
$title: AMP Page Experience Guide
staticText:
  inputBar:
    headline: Analyze your AMP page
    fieldPlaceholder: Enter URL
    button: Analyze
  infoDialog:
    open: Learn about
    close: Close
  scrollToTop: Scroll to top
  shareDialog:
    headline: Copy & paste URL
    close: Close navigation
    copyToClipboard: Copy to clipboard
    success: Success
  statusIntro:
    headline: Please wait a moment
    headline2: We are currently analyzing your page
    loadingCopy: ${finishedChecks} out of ${totalChecks} checks are completed
    buttonShare: Share
    buttonInvestigate: Investigate
  coreWebVitals:
    headline: Core Web Vitals
    tabsAriaLabel: Field and lab data tabs
    fieldData: Field data
    labData: Lab data
    fieldDataExplainer: This data updated daily for the rolling 28-day period.
    labDataExplainer: This data comes from synthetic tests and does not impact page experience.
    loadingSpeed: Loading speed
    interactivity: Interactivity
    visualStability: Visual stability
    pageLoads: Page loads
    thresholdMarker: 75th percentile
    resultLabels:
      scorePercentile: Score at 75th percentile
      score: Score
      opportunity: Opportunity to improve
      pagesPassing: Visits passing
      action: Take action
  additionalChecks:
    headline: Additional checks
    safeBrowsing: Safe Browsing
    https: HTTPS
    mobileFriendliness: Mobile Friendliness
    intrusiveInterstitials: Intrusive Interstitials
    checkManually: Check manually
  recommendations:
    headline: Take action. Improve your AMP site
    nextAdvice: "Next advice"
  tags:
    all: All
scriptText:
  inputBar:
    fieldError: Please enter a valid URL
  status:
    analyzing: Analyzing
    calculating: Calculating
    error: Analysis failed
    failed: Failed
    passed: Passed
    passedAddition: passed
    none: None
    nothingToDo: No action needed! &#x1F389;
    fileAnIssue: File an issue with AMP
    recommendation: recommendation
    recommendations: recommendations
  buttonFixIt: Fix it now
  buttonMakeImprovements: Make improvements
  detailsHeadlineImages: Images to consider
  detailsHeadlineOther: Affected resources
  thumbnail: Thumbnail
  categories:
    fast: Good
    average: Needs Improvement
    slow: Poor
  tags:
    lcp: LCP
    fid: FID and TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: Mobile-friendliness
    safeBrowsing: Safe browsing
    intrusiveInterstitials: Intrusive Interstitials
---

The AMP page experience guide is a tool that shows AMP developers how their AMP pages are performing against the Google Search page experience ranking signal, and provides actionable feedback on how they can improve. If we aren't able to provide you with actionable insights please use the available prompts to [file an issue on GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue) so our team can help you understand how your AMP pages can be improved. We use publicly available APIs such as [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Safe Browsing](https://developers.google.com/safe-browsing/v4/lookup-api), and [Mobile-friendliness Test](https://search.google.com/test/mobile-friendly).
