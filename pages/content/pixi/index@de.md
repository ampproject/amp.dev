---
$title: AMP Page Experience Guide
staticText:
  inputBar:
    headline: Analysiere deine AMP Seite
    fieldPlaceholder: Gib eine gültige URL ein
    fieldError: Bitte gebe eine gültige URL ein
    button: Analysieren
  shareDialog:
    headline: Copy & paste URL
  statusIntro:
    headline: Bitte warte einen Moment
    headline2: Wir analysieren grade deine Seite
    loadingCopy: ${finishedChecks} von ${totalChecks} Checks sind fertig
    buttonFixIt: Jetzt beheben
    buttonShare: Teilen
  coreWebVitals:
    headline: Core Web Vitals
    tabsAriaLabel: Feld- und Labdaten Reiter
    fieldData: Felddaten
    labData: Labdaten
    loadingSpeed: Ladezeit
    interactivity: Interaktivität
    visualStability: Visuelle Stabilität
    pageLoads: Seitenaufrufe
    thresholdMarker: 75 Prozent
    resultLabels:
      score: Dein Wert
      opportunity: Verbesserungspotenzial
      action: Jetzt handeln
  additionalChecks:
    headline: Weitere Checks
    safeBrowsing: Safe Browsing
    https: HTTPS
    mobileFriendliness: Mobile Friendliness
    intrusiveInterstitials: Intrusive Interstitials
    checkManually: Bitte manuell prüfen
  status:
    analyzing: Analysiere
    calculating: Berechne
    failed: Nicht bestanden
    passed: Bestanden
    none: Keins
    nothingToDo: Nichts zu tun
    fileAnIssue: Melde ein Problem bei AMP
    recommendation: Empfehlung
    recommendations: Empfehlungen
  recommendations:
    headline: Jetzt handeln. Verbessere deine AMP Seite
  tags:
    all: Alle
    lcp: LCP
    fid: FID
    cls: CLS
    https: HTTPS
    mobileFriendliness: Mobile-friendliness
    safeBrowsing: Safe browsing
    intrusiveInterstitials: Intrusive Interstitials
---

Der AMP Page Experience Guide ist ein Werkzeug das Entwicklern zeigt
wie ihre Seite beim Google Page Experience Ranking abschneidet und
was sie tun können um das Ergebnis zu verbessern.
 
Falls es uns nicht möglich ist verwertbare Erkenntnisse zu liefern,
nutze bitte die Möglichkeit 
[ein Ticket auf Github anzulegen](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue),
damit unser Team dir helfen kann, zu verstehen, wie deine AMP Seiten
verbessert werden können.

Wir nutzen öffentlich verfügbare APIs wie
[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/),
[Safe Browsing](https://developers.google.com/safe-browsing/v4/lookup-api),
und [Mobile-friendliness Test](https://search.google.com/test/mobile-friendly).
