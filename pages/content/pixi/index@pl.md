---
"$title": Narzędzie AMP Page Experience Guide
staticText:
  inputBar:
    headline: Przeanalizuj swoją stronę AMP
    fieldPlaceholder: Wprowadź adres URL
    button: Analizuj
  infoDialog:
    open: Dowiedz się więcej
    close: Zamknij
  scrollToTop: Przejdź do początku
  shareDialog:
    headline: Skopiuj i wklej adres URL
    close: Zamknij nawigację
    copyToClipboard: Skopiuj do schowka
    success: Sukces
  statusIntro:
    headline: Zaczekaj chwilę
    headline2: Obecnie analizujemy Twoją stronę
    loadingCopy: Ukończono ${finishedChecks} z ${totalChecks} kontroli
    buttonShare: Udostępnij
    buttonInvestigate: Zbadaj
  coreWebVitals:
    headline: Podstawowe wskaźniki Web Vitals
    tabsAriaLabel: Karty danych polowych i laboratoryjnych
    fieldData: Dane polowe
    labData: Dane laboratoryjne
    fieldDataExplainer: Dane te są aktualizowane codziennie w kroczącym okresie 28-dniowym.
    labDataExplainer: Dane te pochodzą z testów syntetycznych i nie mają wpływu na działanie strony.
    loadingSpeed: Szybkość ładowania
    interactivity: Interaktywność
    visualStability: Stabilność wizualna
    pageLoads: Załadowania stron
    thresholdMarker: 75. percentyl
    resultLabels:
      scorePercentile: Wynik w 75. percentylu
      score: Wynik
      opportunity: Możliwość poprawy
      pagesPassing: Odwiedziny zaliczające
      action: Podejmij działania
  additionalChecks:
    headline: Dodatkowe kontrole
    safeBrowsing: Bezpieczne przeglądanie
    https: HTTPS
    mobileFriendliness: Przyjazność mobilna
    intrusiveInterstitials: Natrętne reklamy pełnoekranowe
    checkManually: Sprawdź ręcznie
  recommendations:
    headline: Podejmij działania. Ulepsz swoją stronę AMP
    nextAdvice: Następna rada
  tags:
    all: Wszystkie
scriptText:
  inputBar:
    fieldError: Wprowadź prawidłowy adres URL
  status:
    analyzing: Analizowanie
    calculating: Obliczanie
    error: Analiza nie powiodła się
    failed: Niepowodzenie
    passed: Zaliczono
    passedAddition: zaliczono
    none: Brak
    nothingToDo: "Nie potrzeba żadnych działań! &#x1F389;"
    fileAnIssue: Zgłoś problem z AMP
    recommendation: zalecenie
    recommendations: zalecenia
  buttonFixIt: Napraw teraz
  buttonMakeImprovements: Wprowadź ulepszenia
  detailsHeadlineImages: Obrazy do rozważenia
  detailsHeadlineOther: Zasoby, których to dotyczy
  thumbnail: Miniatura
  categories:
    fast: Dobrze
    average: Wymaga poprawy
    slow: Źle
  tags:
    lcp: LCP
    fid: FID i TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: Przyjazność mobilna
    safeBrowsing: Bezpieczne przeglądanie
    intrusiveInterstitials: Natrętne reklamy pełnoekranowe
---

Narzędzie AMP Page Experience Guide pokazuje programistom AMP jak ich strony AMP radzą sobie z sygnałem czynników rankingowych Page Experience wyszukiwarki Google, a także dostarcza przydatnych informacji zwrotnych na temat tego, jak można je poprawić. Jeśli nie jesteśmy w stanie dostarczyć Ci użytecznych informacji, skorzystaj z dostępnych podpowiedzi, aby [zgłosić problem na GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue), a wówczas nasz zespół będzie w stanie pomóc Ci zrozumieć jak możesz poprawić swoje strony AMP. Używamy publicznie dostępnych interfejsów API, takich jak: [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=pl), <a>Safe Browsing</a> oraz <a>Mobile-frriendliness Test</a>.
