---
"$title": Помощник по созданию удобных AMP-страниц
staticText:
  inputBar:
    headline: Проанализируйте свою AMP-страницу
    fieldPlaceholder: Введите URL
    button: Анализировать
  infoDialog:
    open: Подробнее
    close: Закрыть
  scrollToTop: Вернуться к началу
  shareDialog:
    headline: Скопировать и вставить URL
    close: Закрыть навигацию
    copyToClipboard: Скопировать в буфер обмена
    success: Успешно
  statusIntro:
    headline: Пожалуйста, подождите...
    headline2: Идет анализ вашей страницы
    loadingCopy: 'Выполнено проверок: ${finishedChecks} из ${totalChecks}'
    buttonShare: Поделиться
    buttonInvestigate: Исследовать
  coreWebVitals:
    headline: Core Web Vitals
    tabsAriaLabel: Вкладки наблюдаемых и моделируемых данных
    fieldData: Наблюдаемые данные
    labData: Моделируемые данные
    fieldDataExplainer: Эти данные обновляются ежедневно в течение скользящего 28-дневного периода.
    labDataExplainer: "Это данные, полученные с помощью синтетических тестов; они не оказывают влияния на удобство страницы."
    loadingSpeed: Скорость загрузки
    interactivity: Интерактивность
    visualStability: Визуальная стабильность
    pageLoads: Загрузки страницы
    thresholdMarker: 75-й процентиль
    resultLabels:
      scorePercentile: Оценка на 75-м процентиле
      score: Оценка
      opportunity: Возможность улучшения
      pagesPassing: Прошедшие проверку посещения
      action: Выполнить действие
  additionalChecks:
    headline: Дополнительные проверки
    safeBrowsing: Безопасный просмотр
    https: HTTPS
    mobileFriendliness: Оптимизация под мобильные устройства
    intrusiveInterstitials: Навязчивая межстраничная реклама
    checkManually: Проверить вручную
  recommendations:
    headline: Действуйте! Сделайте свой AMP-сайт еще лучше
    nextAdvice: Следующий совет
  tags:
    all: Все
scriptText:
  inputBar:
    fieldError: Введите корректный URL
  status:
    analyzing: Анализ
    calculating: Вычисление
    error: Не удалось выполнить анализ
    failed: Сбой
    passed: Проверка пройдена
    passedAddition: проверка пройдена
    none: Нет
    nothingToDo: "Действий не требуется! &#x1F389;"
    fileAnIssue: Сообщить о проблеме в AMP
    recommendation: рекомендация
    recommendations: рекомендации
  buttonFixIt: Исправить сейчас
  buttonMakeImprovements: Внести улучшения
  detailsHeadlineImages: Учитываемые изображения
  detailsHeadlineOther: Проблемные ресурсы
  thumbnail: Миниатюра
  categories:
    fast: Хорошо
    average: Можно улучшить
    slow: Плохо
  tags:
    lcp: LCP
    fid: FID и TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: Оптимизация под мобильные устройства
    safeBrowsing: Безопасный просмотр
    intrusiveInterstitials: Навязчивая межстраничная реклама
---

Помощник по созданию удобных AMP-страниц позволяет AMP-разработчикам понять, как ранжируются их страницы в  рейтинге удобства страниц, который применяется в Поиске Google, и предоставляет рекомендации о том, как можно повысить их позицию в рейтинге. Если получить рекомендации автоматически не удалось, программа позволит вам [создать задачу на GitHub](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue), чтобы привлечь к рассмотрению вопроса нашу команду. Мы используем открытые API, такие как [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Safe Browsing](https://developers.google.com/safe-browsing/v4/lookup-api) и [Mobile-friendliness Test](https://search.google.com/test/mobile-friendly).
