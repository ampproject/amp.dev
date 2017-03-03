---
$title: Примеры использования
toc: true
---
[TOC]


В этом руководстве представлен набор стандартных примеров отслеживания заинтересованности пользователей:

Хотите добавить пример использования?
[Сообщите нам.](https://github.com/ampproject/docs/issues/new)

Вы также можете предложить свои примеры использования;
см. [Как помочь проекту](https://www.ampproject.org/docs/support/contribute.html).

## Отслеживание просмотров страницы

Узнайте, как отслеживать число просмотров страницы с помощью `amp-pixel` и `amp-analytics`.

### Использование amp-pixel

Отправка данных pageview на указанный URL-адрес с помощью
[amp-pixel](/docs/reference/amp-pixel.html):

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
[/sourcecode]

### Использование amp-analytics – без поставщика услуг

Отправка данных pageview на указанный URL-адрес с помощью
[amp-analytics](/docs/reference/extended/amp-analytics.html):

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

### Использование amp-analytics совместно с googleanalytics

Отправка данных pageview в Google Analytics
(см. также [Отслеживание страницы в Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  },
  "triggers": {
    "trackPageview": {  // Trigger names can be any string. trackPageview is not a required name.
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

## Отслеживание нажатий на странице

Узнайте, как отслеживать нажатия на странице с помощью
[amp-analytics](/docs/reference/extended/amp-analytics.html),
отправляя данные событий на указанный URL-адрес и в
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Отправка данных на указанный URL-адрес

Следующий пример использует атрибут `selector` для отправки события `click`
на указанный URL-адрес каждый раз, когда пользователь нажимает ссылку (`<a href>`):

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

### Отправка данных в Google Analytics

Следующий пример использует атрибут `selector` триггера `trigger`
для отправки события `click` в Google Analytics при нажатии конкретного элемента
(см. также
[Отслеживание событий AMP в Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics3">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  },
  "triggers": {
    "trackClickOnHeader" : {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "ui-components",
        "eventAction": "header-click"
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

## Отслеживание прокрутки

Вы можете отслеживать прокрутку страницы с помощью [amp-analytics](/docs/reference/extended/amp-analytics.html).
Следующий пример использует атрибут `scrollspec` для отправки события `scroll`
на указанный URL-адрес, когда страница прокручивается по вертикали на 25%, 50% и 90%.
Событие также возникает при прокрутке страницы по горизонтали
на 90% от ее ширины:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "scrollPings": {
      "on": "scroll",
      "scrollSpec": {
        "verticalBoundaries": [25, 50, 90],
        "horizontalBoundaries": [90]
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

## Отслеживание взаимодействий в социальных сетях

Узнайте, как отслеживать взаимодействия в социальных сетях с помощью
[amp-analytics](/docs/reference/extended/amp-analytics.html),
отправляя данные событий на указанный URL-адрес и в
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Отправка данных на указанный URL-адрес

Следующий пример использует атрибут `selector` для отправки события `click`
на указанный URL-адрес каждый раз, когда пользователь нажимает ссылку Twitter (`#tweet-link`):

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "triggers": {
    "trackClickOnTwitterLink": {
      "on": "click",
      "selector": "#tweet-link",
      "request": "event",
      "vars": {
        "eventId": "43",
        "eventLabel": "clicked on a tweet link"
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

### Отправка данных в Google Analytics

Следующий пример использует атрибут `selector` триггера `trigger`
для отправки события при нажатии кнопки конкретной социальной сети
(см. также
[Отслеживание взаимодействий в социальных сетях на странице AMP с помощью Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics4">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y" // Replace with your property ID.
  },
  "triggers": {
    "trackClickOnTwitterLink" : {
      "on": "click",
      "selector": "#tweet-link",
      "request": "social",
      "vars": {
          "socialNetwork": "twitter",
          "socialAction": "tweet",
          "socialTarget": "https://www.examplepetstore.com"
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]
