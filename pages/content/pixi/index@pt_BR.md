---
"$title": Guia de Experiência da Página AMP
staticText:
  inputBar:
    headline: Analise sua página AMP
    fieldPlaceholder: Digite uma URL
    button: Analisar
  infoDialog:
    open: Sobre
    close: Fechar
  scrollToTop: Rolar para o topo
  shareDialog:
    headline: Copiar e colar URL
    close: Encerrar navegação
    copyToClipboard: Copia para área de transferência
    success: Sucesso
  statusIntro:
    headline: Por favor aguarde
    headline2: Estamos analisando sua página
    loadingCopy: "${finishedChecks} de ${totalChecks} verificações foram concluídas"
    buttonShare: Compartilhar
    buttonInvestigate: Investigar
  coreWebVitals:
    headline: Principais métricas da web
    tabsAriaLabel: Abas de dados de campo e laboratório
    fieldData: Dados de campo
    labData: Dados de laboratório
    fieldDataExplainer: Esses dados foram atualizados diariamente durante o período de 28 dias consecutivos.
    labDataExplainer: Esses dados vêm de testes sintéticos e não impactam a experiência da página.
    loadingSpeed: Velocidade de carga
    interactivity: Interatividade
    visualStability: Estabilidade visual
    pageLoads: Cargas de página
    thresholdMarker: 75º percentil
    resultLabels:
      scorePercentile: Pontuação no 75º percentil
      score: Pontuação
      opportunity: Oportunidade de melhorar
      pagesPassing: Visitas passando
      action: Tomar atitude
  additionalChecks:
    headline: Verificações adicionais
    safeBrowsing: Navegação segura
    https: HTTPS
    mobileFriendliness: Usabilidade em dispositivos móveis
    intrusiveInterstitials: Intersticiais intrusivos
    checkManually: Verificar manualmente
  recommendations:
    headline: Tome uma atitude. Melhore seu site AMP
    nextAdvice: Próxima sugestão
  tags:
    all: Tudo
scriptText:
  inputBar:
    fieldError: Por favor digite uma URL válida
  status:
    analyzing: Analizando
    calculating: Calculando
    error: Análise falhou
    failed: Falhou
    passed: Passou
    passedAddition: passou
    none: Nenhuma
    nothingToDo: "Nenhuma ação necessária! &#x1F389;"
    fileAnIssue: Registrar um issue com o AMP
    recommendation: recomendação
    recommendations: recomendações
  buttonFixIt: Conserte agora
  buttonMakeImprovements: Faça melhorias
  detailsHeadlineImages: Imagens a considerar
  detailsHeadlineOther: Recursos afetados
  thumbnail: Thumbnail
  categories:
    fast: Boa
    average: Precisa Melhorar
    slow: Ruim
  tags:
    lcp: LCP
    fid: FID e TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: Usabilidade em dispositivos móveis
    safeBrowsing: Navegação segura
    intrusiveInterstitials: Intersticiais intrusivos
---

O guia de experiência da página AMP é uma ferramenta que mostra aos desenvolvedores AMP o desempenho de suas páginas AMP em relação ao sinal de classificação de experiência na página da Busca do Google, fornecendo um feedback prático sobre como elas podem ser melhoradas. Se não for possível fornecer insights prátiocos, use os prompts disponíveis para [registrar um issue no GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue) para que nossa equipe possa ajudá-lo a entender como suas páginas AMP podem ser melhoradas. Usamos APIs disponíveis publicamente, tais como [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=pt_BR), [Safe Browsing](https://developers.google.com/safe-browsing/v4/lookup-api?hl=pt_BR), and [Mobile-friendliness Test](https://search.google.com/test/mobile-friendly?hl=pt_BR).
