---
"$title": AMP Page Experience Guide
staticText:
  inputBar:
    headline: Analysiere deine AMP Seite
    fieldPlaceholder: URL eingeben
    button: Analysieren
  infoDialog:
    open: Kopiere und teile die URL
    close: Dialog schließen
  scrollToTop: Scroll to top
  shareDialog:
    headline: Core Web Vitals
    close: Feld- und Labdaten Reiter
    copyToClipboard: URL kopieren
    success: Erfolgreich
  statusIntro:
    headline: Bitte warte einen Moment
    headline2: Wir analysieren grade deine Seite
    loadingCopy: "${finishedChecks} von ${totalChecks} Checks sind fertig"
    buttonShare: Teilen
    buttonInvestigate: Intrusive Interstitials
  coreWebVitals:
    headline: Jetzt handeln. Verbessere deine AMP Seite
    tabsAriaLabel: Nächster Tipp
    fieldData: Felddaten
    labData: Labdaten
    fieldDataExplainer: This data updated daily for the rolling 28-day period.
    labDataExplainer: This data comes from synthetic tests and does not impact page experience.
    loadingSpeed: Ladezeit
    interactivity: Interaktivität
    visualStability: Visuelle Stabilität
    pageLoads: Seitenaufrufe
    thresholdMarker: 75 Prozent
    resultLabels:
      scorePercentile: Score at 75th percentile
      score: Score
      opportunity: Verbesserungspotenzial
      pagesPassing: Visits passing
      action: Jetzt handeln
  additionalChecks:
    headline: Weitere Checks
    safeBrowsing: Safe Browsing
    https: HTTPS
    mobileFriendliness: Mobile Friendliness
    intrusiveInterstitials: Intrusive Interstitials
    checkManually: Bitte manuell prüfen
  recommendations:
    headline: Take action. Improve your AMP site
    nextAdvice: Next advice
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
    nothingToDo: "No action needed! &#x1F389;"
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

Der AMP Page Experience Guide ist ein Werkzeug das Entwicklern zeigt wie ihre Seite beim Google Page Experience Ranking abschneidet und was sie tun können um das Ergebnis zu verbessern. Falls es uns nicht möglich ist verwertbare Erkenntnisse zu liefern, öffne bitte [ein Ticket auf GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue), damit unser Team dir helfen kann, deine AMP Seiten zu verbessern. Wir nutzen öffentlich verfügbare APIs wie [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Safe Browsing](https://developers.google.com/safe-browsing/v4/lookup-api), und [Mobile-friendliness Test](https://search.google.com/test/mobile-friendly).
