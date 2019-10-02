---
$title: "Analytics: основы"
---

Ознакомьтесь с основами аналитики AMP.

## Что использовать: amp-pixel или amp-analytics? <a name="use-amp-pixel-or-amp-analytics"></a>

AMP предоставляет два компонента для удовлетворения потребностей в анализе и измерениях:
[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) и
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
Оба инструмента отправляют аналитические данные в определенный конечный пункт.

Если вам нужны такие функции, как простое
[отслеживание пикселя](https://en.wikipedia.org/wiki/Web_beacon#Implementation),
компонент [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) предоставит базовые возможности отслеживания количества просмотров страницы;
данные о просмотрах страницы будут отправляться на определенный URL-адрес.
Этот компонент может потребоваться в некоторых интегрированных системах с участием поставщиков услуг.
В этом случае для него будет указан точный конечный URL-адрес.

В большинстве аналитических решений используется [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
В [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) есть возможность отслеживать количество просмотров страницы.
Но вы также сможете отслеживать интерес пользователей к какому-либо виду содержимого страницы,
включая переходы по ссылкам и кнопкам.
Вы можете узнать, насколько далеко пользователь выполнил прокрутку страницы,
связан ли он с социальными сетями и многое другое
(см.
[Погружение в AMP Analytics](deep_dive_analytics.md)).

В процессе интеграции платформы AMP
поставщики предлагают предварительно заданные конфигурации [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
что упрощает получение данных и их передачу в инструменты отслеживания.
Ознакомьтесь с документацией о поставщиках аналитических данных в
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Вы можете использовать на своих страницах как компонент[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), так и [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):
[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) для простого отслеживания количества просмотров страницы,
а [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) – для всего остального.
Вы также можете добавить несколько экземпляров каждого тега.
Если вы работаете с несколькими поставщиками аналитических данных,
вам потребуется по одному тегу для каждого решения.
Следует помнить, что чем проще страницы AMP, тем лучше они для пользователей,
поэтому не используйте те теги, в которых нет необходимости.

## Создание простой конфигурации аналитики

Узнайте, как создать простую
конфигурацию [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) и
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Простая конфигурация [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)

Чтобы создать простую конфигурацию [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md),
вставьте в тело вашей страницы строку AMP, сходную по содержанию со следующей строкой:

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

В этом примере
данные о просмотрах страницы отправляются на определенный URL-адрес вместе со случайным числом.
Переменная `RANDOM` является одной из многих
[подстановочных переменных в платформе AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
Вы можете ознакомиться с дополнительной информацией о
[подстановке переменных](analytics_basics.md).

Компонент [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)
является встроенным,
поэтому вам не требуется объявлять включение, как это делается для
расширенных компонентов AMP, в том числе для [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
Однако вы должны вставить тег [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) как можно ближе к
началу раздела `<body>`.
Отслеживающий пиксель будет срабатывать только тогда, когда сам тег попадет в область просмотра.
Если тег [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) расположен в нижней части страницы,
он может не сработать.

### Простая конфигурация [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)

Чтобы создать простую конфигурацию
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
необходимо сначала включить следующую декларацию `custom-element`
в раздел `<head>` документа AMP (см. также
[Объявление включения компонента](../../../../documentation/components/index.html)):

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Следующий пример похож на [ример с `amp-pixel`](../../../../documentation/components/reference/amp-pixel.md).
При каждом просмотре страницы
возникает событие триггера и
данные запроса pageview отправляются на определенный URL-адрес вместе со случайным значением идентификатора:

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
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

В вышеприведенном примере мы определили запрос под названием pageview в виде `https://foo.com/pixel?RANDOM`. Как обсуждалось ранее, переменная RANDOM заменяется случайным числом, поэтому фактический запрос будет выглядеть как `https://foo.com/pixel?0.23479283687235653498734`.

Когда страница становится видимой
(что указывается использованием в триггере ключевого слова `visible`),
возникает событие и отправляется запрос `pageview`.
Атрибут триггера определяет условие отправки запроса pageview.
Ознакомьтесь с дополнительной информацией о [запросах и триггерах](deep_dive_analytics.md).

## Подстановка переменной <a name="variable-substitution"></a>

Оба компонента, [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) и
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
позволяют использовать все стандартные подстановки переменных в URL-адресе (см.
[Подстановки переменных в AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
В следующем примере
запрос просмотра страницы отправляется на URL-адрес
вместе с каноническим URL-адресом текущего документа AMP, его названием и
[идентификатором клиента](analytics_basics.md#user-identification):

```html
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
```

В силу своей простоты
тег [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) может включать только те переменные, значения которых определяются платформой
или могут быть получены из страницы AMP в процессе ее обработки.
В вышеприведенном примере
значения
`canonicalURL` и `clientId(site-user-id)` заполняются платформой.
Тег [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) может включать те же переменные, что и [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md),
а также переменные, однозначно определенные внутри конфигурации тега.

Для переменной, определяемой страницей или платформой, в строке запроса используется формат `${varName}`.

Тег [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) заменит шаблон своим фактическим значением
в момент построения аналитического запроса (см. также
[Переменные, поддерживаемые в amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

В следующем примере [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)
запрос просмотра страницы отправляется на URL-адрес
вместе с дополнительными данными, полученными из подстановок переменных,
значения которых либо предоставляются платформой,
либо определяются внутри
конфигурации [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }
}
</script>
</amp-analytics>
```

В примере выше переменные
`account` и `title` определяются в конфигурации
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
Переменные `canonicalUrl` и `clientId` не определены в конфигурации,
поэтому их значения подставляются платформой.

**Внимание!** Механизм подстановки переменной весьма гибок.
Вы можете иметь одни и те же переменные, определенные в разных местах,
а AMP выполнит синтаксический анализ этих значений по их приоритетности
(см. [Порядок подстановки переменных](deep_dive_analytics.md).

## Идентификация пользователей <a name="user-identification"></a>

Для хранения в браузере информации, связанной с пользователем, веб-сайты используют файлы cookie.
С помощью этих файлов можно узнать о предыдущих посещениях сайта пользователем.
Страницы AMP
могут предоставляться либо веб-сайтом издателя, либо кешем
(например, Google AMP Cache).
Веб-сайт издателя и кеш, скорее всего, принадлежат различным доменам.
В целях обеспечения безопасности
браузеры могут ограничить (и часто ограничивают) доступ к файлам cookie из других доменов
(см. также
[Отслеживание пользователей по источникам](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

По умолчанию
AMP предоставляет идентификатор клиента, когда страница открывается либо из исходного веб-сайта издателя, либо через кеш.
Идентификатор клиента, сгенерированный AMP, имеет значение `"amp-"`,
к которому добавлена случайная строка в кодировке `base64`, и сохраняется для пользователя при его последующих посещениях страницы.

AMP управляет чтением и записью идентификатора клиента во всех случаях.
Это, в частности, заметно, когда страница предоставляется
через кеш или показывается вне контекста просмотра
исходного сайта издателя.
В этом случае доступ к файлам cookie сайта издателя невозможен.

Если страница AMP предоставляется сайтом издателя,
то структуре идентификатора клиента, используемого AMP, можно сообщить о необходимости поиска и использования запасного файла cookie.

В этом случае аргумент
`cid-scope-cookie-fallback-name` переменной `clientId`
интерпретируется как имя файла cookie.
Формат этого аргумента может выглядеть, как
`CLIENT_ID(cid-scope-cookie-fallback-name)` или
`${clientId(cid-scope-cookie-fallback-name)}`.

Например:

```html
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
```

Если AMP обнаруживает установленное значение этого cookie,
подстановка идентификатора клиента возвращает это значение.
Если установленное значение этого cookie не найдено,
то AMP сгенерирует значение в виде `amp-` с добавленной случайной строкой в кодировке
base64.

Для получения дополнительной информации о подстановке идентификатора клиента
и способах добавления дополнительного идентификатора уведомления пользователя см. в документе
[Переменные, поддерживаемые `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
