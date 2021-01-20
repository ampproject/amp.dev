---
$title: Примеры использования
---

В этом руководстве представлен набор стандартных примеров отслеживания заинтересованности пользователей:

Хотите добавить пример использования?
[Сообщите нам.](https://github.com/ampproject/docs/issues/new)

Вы также можете предложить свои примеры использования;
см. [Как помочь проекту](../../../../documentation/guides-and-tutorials/contribute/index.md).

## Отслеживание просмотров страницы

Узнайте, как отслеживать число просмотров страницы с помощью [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) и [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Использование amp-pixel

Отправка данных pageview на указанный URL-адрес с помощью
[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Использование amp-analytics – без поставщика услуг

Отправка данных pageview на указанный URL-адрес с помощью
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
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
```

### Использование amp-analytics совместно с googleanalytics

Отправка данных pageview в Google Analytics
(см. также [Отслеживание страницы в Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

```html
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
```

## Отслеживание нажатий на странице <a name="отслеживание-нажатий-на-странице"></a>

Узнайте, как отслеживать нажатия на странице с помощью
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
отправляя данные событий на указанный URL-адрес и в
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Отправка данных на указанный URL-адрес

Следующий пример использует атрибут `selector` для отправки события `click`
на указанный URL-адрес каждый раз, когда пользователь нажимает ссылку (`<a href>`):

```html
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
```

### Отправка данных в Google Analytics

Следующий пример использует атрибут `selector` триггера `trigger`
для отправки события `click` в Google Analytics при нажатии конкретного элемента
(см. также
[Отслеживание событий AMP в Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

```html
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
```

## Отслеживание прокрутки <a name="отслеживание-прокрутки"></a>

Вы можете отслеживать прокрутку страницы с помощью [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
Следующий пример использует атрибут `scrollspec` для отправки события `scroll`
на указанный URL-адрес, когда страница прокручивается по вертикали на 25%, 50% и 90%.
Событие также возникает при прокрутке страницы по горизонтали
на 90% от ее ширины:

```html
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
```

## Отслеживание взаимодействий в социальных сетях

Узнайте, как отслеживать взаимодействия в социальных сетях с помощью
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
отправляя данные событий на указанный URL-адрес и в
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Отправка данных на указанный URL-адрес

Следующий пример использует атрибут `selector` для отправки события `click`
на указанный URL-адрес каждый раз, когда пользователь нажимает ссылку Twitter (`#tweet-link`):

```html
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
```

### Отправка данных в Google Analytics

Следующий пример использует атрибут `selector` триггера `trigger`
для отправки события при нажатии кнопки конкретной социальной сети
(см. также
[Отслеживание взаимодействий в социальных сетях на странице AMP с помощью Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

```html
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
```
