---
$title: AMP Page Experience Guide
staticText:
  inputBar:
    headline: Analysiere deine AMP Seite
    fieldPlaceholder: URL eingeben
    button: Analysieren
  shareDialog:
    headline: Kopiere und teile die URL
    close: Dialog schließen
    copyToClipboard: URL kopieren
    success: Erfolgreich
  statusIntro:
    headline: Bitte warte einen Moment
    headline2: Wir analysieren grade deine Seite
    loadingCopy: ${finishedChecks} von ${totalChecks} Checks sind fertig
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
    
    https: HTTPS
    mobileFriendliness: Mobile Friendliness
    intrusiveInterstitials: Intrusive Interstitials
    checkManually: Bitte manuell prüfen
  recommendations:
    headline: Jetzt handeln. Verbessere deine AMP Seite
    nextAdvice: Nächster Tipp
  tags:
    all: Alle
scriptText:
  inputBar:
    fieldError: Bitte gebe eine gültige URL ein
  status:
    analyzing: Analysiere
    calculating: Berechne
    error: Analyse fehlgeschlagen
    failed: Nicht bestanden
    passed: Bestanden
    passedAddition: bestanden
    none: Keins
    nothingToDo: Nichts zu tun &#x1F389;
    fileAnIssue: Melde ein Problem bei AMP
    recommendation: Empfehlung
    recommendations: Empfehlungen
  buttonFixIt: Jetzt verbessern
  buttonMakeImprovements: Jetzt verbessern
  detailsHeadlineImages: In Frage kommende Bilder
  detailsHeadlineOther: Betroffene Ressourcen
  thumbnail: Thumbnail
  categories:
    fast: Schnell
    average: Verbesserungswürdig
    slow: Schlecht
  tags:
    lcp: LCP
    fid: FID und TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: Mobile-friendliness
    
    intrusiveInterstitials: Intrusive Interstitials
---

Der AMP Page Experience Guide ist ein Werkzeug das Entwicklern zeigt
wie ihre Seite beim Google Page Experience Ranking abschneidet und
was sie tun können um das Ergebnis zu verbessern.

Falls es uns nicht möglich ist verwertbare Erkenntnisse zu liefern,
öffne bitte
[ein Ticket auf GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue),
damit unser Team dir helfen kann, deine AMP Seiten
zu verbessern.

Wir nutzen öffentlich verfügbare APIs wie
[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?dl=de),
und [Mobile-friendliness Test](https://search.google.com/test/mobile-friendly?hl=de).
