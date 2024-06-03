---
'$title': Как настроить базовую аналитику для AMP-страниц
$order: 100
description: Для интеграции сайтов с платформами аналитики обычно используются встраиваемые фрагменты кода JavaScript и вызовы функций, которые отправляют в систему аналитики данные о происходящих событиях.
tutorial: 'true'
formats:
  - websites
  - stories
  - ads
---

Для интеграции сайтов с платформами аналитики обычно используются встраиваемые фрагменты кода JavaScript и вызовы функций, которые отправляют в систему аналитики данные о происходящих событиях. AMP позволяет воспроизвести это поведение при работе с определенными партнерами по аналитике и предоставляет гибкий, основанный на JSON синтаксис конфигурации для его настройки.

[tip] **СОВЕТ.** Если вы используете в качестве поставщика услуг аналитики Google Analytics, научитесь работать с компонентом [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md). [/tip]

## Для контекста: аналитика на традиционных (не-AMP) страницах

Ниже приведен пример традиционной JavaScript-реализации отслеживания с помощью Google Analytics. Мы перепишем его в формате JSON для [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md), но сначала давайте взглянем на традиционный подход:

```html
<script>
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    '//www.google-analytics.com/analytics.js',
    'ga'
  );

  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
</script>
```

Представленный код JavaScript очень прост: он отправляет уведомление для регистрации события pageview.

## Шаг 1: включение скрипта `amp-analytics`

Чтобы воспроизвести эту функциональность в AMP, необходимо сначала **включить** библиотеку компонента [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) в тег `<head>` нашего документа:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
></script>
```

## Шаг 2: добавление кода конфигурации

Затем давайте **добавим** компонент [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) в конец тега `body`:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Подобно коду JavaScript в первом примере, данный фрагмент кода [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) отправит в Google Analytics уведомление о просмотре страницы.

Чтобы реализовать это, мы установили атрибуту `type` значение `googleanalytics`, а затем при помощи JSON создали триггер под названием «default pageview». Триггер будет срабатывать, как только страница становится видимой (благодаря параметру `"on": "visible"`), и при его срабатывании в Google Analytics будет отправляться запрос `pageview` с переменными, указанными в `vars`.

Код JSON, используемый для настройки компонента [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md), имеет очень гибкий формат и позволяет описывать типы отправляемых аналитических данных и условия их отправки. Полное описание формата см. в документации к компоненту [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md).

## Шаг 3: добавление других триггеров

Теперь дополним пример выше, **добавив** другой триггер под названием `"click on #header trigger"`:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        },
        "click on #header trigger": {
          "on": "click",
          "selector": "#header",
          "request": "event",
          "vars": {
            "eventCategory": "examples",
            "eventAction": "clicked-header"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Как вы можете догадаться по названию нового триггера, он будет срабатывать при нажатии на элемент с идентификатором `"header"` (это поведение задано свойствами `"on": "click"` и `"selector": "#header"`). При срабатывании этого триггера мы отправляем провайдеру аналитики запрос `event`, указав в нем пару необходимых переменных.

Если вы хотите настроить интеграцию со своей собственной платформой отслеживания, вы также можете использовать компонент [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md), указав индивидуальные URL-адреса конечных точек для отправки данных отслеживания. Подробнее см. в документации к компоненту [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **ПРИМЕЧАНИЕ.** `“UA-YYYY-Y”` — это образец идентификатора аккаунта Google Analytics; если вы будете встраивать программный код, приведенный выше, на свой сайт, необходимо использовать реальный идентификатор отслеживания, присвоенный вашему сайту в Google Analytics. [/tip]

[tip type="tip"] **СОВЕТ.** Если вам нужна более простая система отслеживания, советуем обратить внимание на [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md). [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md) — это облегченное по сравнению с [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) решение и подойдет тем, кому нужно просто отслеживать просмотры страниц, так как оно предназначено лишь для решения задач, традиционно выполняемых отслеживающим пикселем. Дополнительные сведения см. в руководстве [Аналитика: основы](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
