---
"$title": Guía sobre la experiencia en las páginas de AMP
staticText:
  inputBar:
    headline: Analice su Página AMP
    fieldPlaceholder: Ingrese la URL
    button: Analizar
  infoDialog:
    open: Obtener más información
    close: Cerrar
  scrollToTop: Desplácese hacia arriba
  shareDialog:
    headline: Copiar y pegar la URL
    close: Cerrar la navegación
    copyToClipboard: Copiar al portapapeles
    success: Éxito
  statusIntro:
    headline: Espere un momento
    headline2: Actualmente estamos analizando su página
    loadingCopy: "${finishedChecks} revisiones que se completaron por ${totalChecks}"
    buttonShare: Compartir
    buttonInvestigate: Investigar
  coreWebVitals:
    headline: Core Web Vitals
    tabsAriaLabel: Fichas con datos de campo y de laboratorio
    fieldData: Datos de campo
    labData: Datos de laboratorio
    fieldDataExplainer: Estos datos se actualizan diariamente para el periodo renovable de 28 días.
    labDataExplainer: Estos datos provienen de pruebas sintéticas y no influyen de ninguna manera en la experiencia con la página.
    loadingSpeed: Velocidad de carga
    interactivity: Interactividad
    visualStability: Estabilidad visual
    pageLoads: Cargas de la página
    thresholdMarker: Percentil 75
    resultLabels:
      scorePercentile: Puntuación en el percentil 75
      score: Puntuación
      opportunity: Posibilidad de mejorar
      pagesPassing: visitas de una página web
      action: Tomar medidas
  additionalChecks:
    headline: Controles adicionales
    
    https: HTTPS
    mobileFriendliness: Optimización para el uso con los dispositivos móviles
    intrusiveInterstitials: Intersticiales intrusivos
    checkManually: Revisar manualmente
  recommendations:
    headline: Tome medidas. Mejore su sitio de AMP
    nextAdvice: Siguiente consejo
  tags:
    all: Todos
scriptText:
  inputBar:
    fieldError: Introduzca una URL válida
  status:
    analyzing: Analizando
    calculating: Calculando
    error: El análisis falló
    failed: Falló
    passed: Exitoso
    passedAddition: exitoso
    none: Ninguno
    nothingToDo: "¡No se necesita ninguna acción! & # x1F389;"
    fileAnIssue: Reportar un problema con AMP
    recommendation: recomendación
    recommendations: recomendaciones
  buttonFixIt: Solucionarlo ahora
  buttonMakeImprovements: Hacer mejoras
  detailsHeadlineImages: Imágenes para tomar en cuenta
  detailsHeadlineOther: Recursos asignados
  thumbnail: Vista en miniatura
  categories:
    fast: Buena
    average: Necesita mejorar
    slow: Deficiente
  tags:
    lcp: LCP
    fid: FID y TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: Optimización para el uso con dispositivos móviles
    
    intrusiveInterstitials: Intersticiales intrusivos
---

La Guía sobre la experiencia en las Páginas AMP es una herramienta que muestra a los desarrolladores de AMP como se comportan sus Páginas AMP con respecto a la experiencia de la página con Google Search, y les proporciona comentarios prácticos sobre cómo pueden mejorarla. Si no podemos proporcionarle información práctica, utilice las indicaciones disponibles para [reportar un problema en GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue) para que nuestro equipo pueda ayudarle a comprender como mejorar sus Páginas AMP. Utilizamos API públicas como [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Navegación segura](https://developers.google.com/safe-browsing/v4/lookup-api) y [Pruebas de optimización para móviles](https://search.google.com/test/mobile-friendly).
