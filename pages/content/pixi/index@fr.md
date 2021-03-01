---
"$title": "Guide d'expérience de page AMP"
staticText:
  inputBar:
    headline: Analyser votre page AMP
    fieldPlaceholder: "Saisir l'URL"
    button: Analyser
  infoDialog:
    open: En savoir plus
    close: Fermer
  scrollToTop: Défiler vers le haut
  shareDialog:
    headline: "Copier et coller l'URL"
    close: Fermer la navigation
    copyToClipboard: Copier dans le presse-papier
    success: Réussi
  statusIntro:
    headline: Veuillez patienter
    headline2: Nous analysons actuellement votre page
    loadingCopy: "${finishedChecks} vérifications terminées sur ${totalChecks}"
    buttonShare: Partager
    buttonInvestigate: Enquêter
  coreWebVitals:
    headline: Core Web Vitals
    tabsAriaLabel: Onglets de données de terrain et de laboratoire
    fieldData: Données de terrain
    labData: Données de laboratoire
    fieldDataExplainer: Ces données sont mises à jour quotidiennement pour la période glissante de 28 jours.
    labDataExplainer: "Ces données proviennent de tests synthétiques et n'ont aucun impact sur la page."
    loadingSpeed: Vitesse de chargement
    interactivity: Interactivité
    visualStability: Stabilité visuelle
    pageLoads: Chargement de la page
    thresholdMarker: 75e centile
    resultLabels:
      scorePercentile: Score au 75e centile
      score: Score
      opportunity: "Possibilité d'amélioration"
      pagesPassing: Défilement des visites
      action: "Passer à l'action"
  additionalChecks:
    headline: Contrôles supplémentaires
    safeBrowsing: Navigation sécurisée
    https: HTTPS
    mobileFriendliness: Convivialité mobile
    intrusiveInterstitials: Interstitiels intrusifs
    checkManually: Vérifier manuellement
  recommendations:
    headline: "Passez à l'action. Améliorez votre site AMP"
    nextAdvice: Conseil suivant
  tags:
    all: Tout
scriptText:
  inputBar:
    fieldError: Veuillez saisir une URL valide
  status:
    analyzing: Analyse en cours
    calculating: Calcul en cours
    error: "L'analyse a échoué"
    failed: Échoué
    passed: Réussi
    passedAddition: réussi
    none: Aucune
    nothingToDo: "Pas d'action requise! &#x1F389;"
    fileAnIssue: Signaler un problème avec AMP
    recommendation: recommandation
    recommendations: recommandations
  buttonFixIt: Réparer maintenant
  buttonMakeImprovements: Apporter des améliorations
  detailsHeadlineImages: Images à considérer
  detailsHeadlineOther: Ressources affectées
  thumbnail: Vignette
  categories:
    fast: Bon
    average: Amélioration nécessaire
    slow: Faible
  tags:
    lcp: LCP
    fid: FID et TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: Convivialité mobile
    safeBrowsing: Navigation sécurisée
    intrusiveInterstitials: Interstitiels intrusifs
---

Le guide d'expérience de page AMP est un outil qui montre aux développeurs AMP les performances de leurs pages AMP par rapport au signal de classement de l'expérience de page de recherche Google, et fournit des commentaires exploitables sur la façon dont ils peuvent améliorer leur page. Si nous ne sommes pas en mesure de vous fournir des informations exploitables, veuillez utiliser les invites disponibles pour [signaler un problème sur GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue) afin que notre équipe puisse vous aider à comprendre comment vos pages AMP peuvent être améliorées. Nous utilisons des API publiques telles que [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=fr) , [la navigation sécurisée](https://developers.google.com/safe-browsing/v4/lookup-api?hl=fr) et le [test de convivialité mobile](https://search.google.com/test/mobile-friendly?hl=fr).
