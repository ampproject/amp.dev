---
$title: Погружение в AMP Analytics
---

Это руководство подробно описывает использование
[компонента `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
разбирая пример конфигурации [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) на следующие основные блоки:

Далее в руководстве используется нижеприведенный пример конфигурации,
который отслеживает просмотры страницы и переходы пользователя по ссылкам,
а затем отправляет аналитические данные стороннему поставщику –
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
```

**Примечание.** Вышеприведенный пример кода предназначен для учебных целей и не может использоваться в реальной ситуации. Если вы работаете с поставщиками аналитических услуг, то использование этого примера вряд ли имеет смысл, поскольку его сложные моменты устраняются применением конфигураций поставщика. Примеры конфигураций вы можете найти в документации вашего поставщика аналитических услуг.

## Куда отправлять аналитические данные: атрибут type

AMP поддерживает два стандартных шаблона сбора данных:

* Передача данных в конечный пункт издателя страницы для внутренних аналитических систем.
* Передача данных в конечный пункт поставщика услуг для взаимодействия с его решением
(например, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

Чтобы отправлять данные поставщику аналитических услуг,
добавьте атрибут `type` в тег [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) и установите для него значение
соответствующего поставщика, как определено в
[спецификации amp-analytics](../../../../documentation/components/reference/amp-analytics.md).

Например, тег `<amp-analytics type="googleanalytics">` отправляет данные стороннему поставщику
аналитических услуг, Google Analytics.
Чтобы отправлять данные в конечный пункт издателя,
достаточно просто не указывать атрибут `type`;
аналитические данные будут отправляться в конечные пункты, определенные для каждого
[запроса](deep_dive_analytics.md).

Быстрым способом начала работы с
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) является применение конфигураций поставщиков аналитических услуг.
Для дальнейших указаний по их использованию следует обратиться к документации и справочным ресурсам вашего поставщика.

Как упоминалось ранее,
список поставщиков, уже интегрировавших свои решения с AMP, а также ссылки
на их документацию можно найти в
[спецификации `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Если вы являетесь поставщиком аналитических услуг,
ознакомьтесь с возможностью [интеграцией собственной конфигурации аналитики в AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Загрузка удаленной конфигурации: атрибут config

Ваша страница AMP не обязательно должна содержать всю конфигурацию
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
Вместо этого вы можете полностью или частично загружать конфигурации с удаленного URL-адреса.

Это позволяет вам выполнять такие действия как, например, изменение конфигурации
для конкретных запросов.
Если вы, как издатель, можете управлять удаленным файлом,
то у вас есть возможность выполнять на сервере все действия, необходимые для создания конфигурационных данных.

Первым шагом для загрузки удаленных конфигураций является
добавление атрибута config в тег [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

Следующим шагом является создание контента в формате JSON на удаленном URL-адресе.
В этом простом примере
конфигурация, которая содержится в объекте JSON, представляет собой лишь значение переменной для учетной записи аналитической системы.

Пример содержимого в `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

Последним шагом является передача содержимого удаленного файла
в соответствующее место конфигурации [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
В обоих запросах `pageview` и `event` для значения переменной
`account` здесь автоматически устанавливается
значение учетной записи в удаленном URL-адресе (`"account": "UA-XXXXX-Y"`):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

**Внимание!** AMP не проверяет многократное использование одной и той же переменной.
Значения заполняются, следуя порядку приоритетности подстановки переменных,
и максимальный приоритет имеют значения из удаленных URL-адресов
(см. [Порядок подстановки переменных](deep_dive_analytics.md).

## Запросы, триггеры и транспорты <a name="requests-triggers--transports"></a>

Атрибут `requests` определяет данные, подлежащие отправке
(например, `pageviews`, `events`),
и место, куда они должны быть отправлены (URL-адреса для передачи данных).

Атрибут `triggers` описывает момент отправки аналитических данных,
например, при просмотре страницы пользователем или при его переходе по ссылке.

Атрибут `transport` указывает, каким образом должен быть отправлен запрос,
или точнее говоря, протокол передачи.

Далее эти параметры конфигурации рассматриваются более подробно.
(Вы можете также ознакомиться с ними в
[справочной документации по `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Какие данные должны быть отправлены: атрибут requests <a name="what-data-gets-sent-requests-attribute"></a>

Для указания, какой запрос должен быть отправлен в ответ на конкретное событие, в конфигурации триггера используется параметр `request-name`.

Параметр `request-value` представляет собой URL-адрес в формате `https`.
Эти значения могут содержать теги,
которые будут ссылаться на другие запросы или переменные.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Некоторые поставщики аналитических услуг (включая Google Analytics)
уже предоставляют конфигурации,
которые можно использовать с помощью атрибута `type`.
В случае использования поставщика аналитических услуг
добавление информации атрибута `requests` может не понадобиться.
Чтобы узнать, как настраивать атрибут
`requests` и нужно ли это делать, обратитесь к документации поставщика услуг.

#### Добавление URL-адреса в запрос: дополнительные параметры URL

Атрибут [extraUrlParams](../../../../documentation/components/reference/amp-analytics.md#extra-url-params)
указывает дополнительные параметры, которые должны быть добавлены к строке URL-адреса запроса с использованием обычного обозначения "&foo=baz".

В примере [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) в запрос добавляется дополнительный параметр <code>cd1</code>,
для которого устанавливается значение "AMP":

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### Когда отправлять данные: атрибут triggers

Атрибут `triggers` описывает момент отправки аналитического запроса.
Он содержит пару "ключ-значение", которая состоит из имени триггера и его конфигурации.
Имя триггера может быть представлено любой строкой, состоящей из буквенно-цифровых символов
(a-zA-Z0-9).

Например,
следующий элемент [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) настроен на отправку запроса в
`https://example.com/analytics` при первой загрузке документа
и при каждом нажатии тега `a`:

```js
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
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
```

AMP поддерживает следующие конфигурации триггеров.

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Конфигурация триггера</th>
      <th data-th="Description">Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (обязательный параметр)</td>
      <td data-th="Description">Отслеживаемое событие. Допустимые значения: <code>click</code>, <code>scroll</code>, <code>timer</code> и <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (обязательный параметр)</td>
      <td data-th="Description">Имя отправляемого запроса (как указано в атрибуте <a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">requests</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Объект, содержащий пары "ключ-значение", которые используются для переопределения переменных <code>vars</code>, определенных в конфигурации верхнего уровня, или для указания уникальных переменных <code>vars</code> этого триггера (см. также <a href="deep_dive_analytics.md#variable-substitution-ordering">Порядок подстановки переменных</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (требуется, если для <code>on</code> установлено значение <code>click</code>)</td>
      <td data-th="Description">Селектор CSS, использующийся для уточнения отслеживаемых элементов. Для отслеживания всех элементов используйте значение <code>*</code>. Эта конфигурация используется совместно с триггером <code>click</code>. Узнайте, как использовать селектор для <a href="use_cases.md#отслеживание-нажатий-на-странице">отслеживания нажатий на странице</a> и <a href="use_cases.md#отслеживание-нажатий-на-странице">взаимодействий в социальных сетях</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (требуется, если для <code>on</code> установлено значение <code>scroll</code>)</td>
      <td data-th="Description">Управляет условиями возникновения события <code>scroll</code> при прокрутке страницы. Этот объект может содержать свойства <code>verticalBoundaries</code> и <code>horizontalBoundaries</code>. Для возникновения события <code>scroll</code> требуется как минимум одно из этих свойств. Значения обоих свойств должны быть представлены массивами чисел, отражающих границы, на которых генерируется событие прокрутки. См. пример <a href="use_cases.md#отслеживание-прокрутки">отслеживания прокрутки</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (требуется, если для <code>on</code> установлено значение <code>timer</code>)</td>
      <td data-th="Description">Определяет момент возникновения события <code>timer</code>. Таймер сработает сразу после истечения указанного интервала времени. Эта конфигурация используется совместно с триггером <code>timer</code>.</td>
    </tr>
  </tbody>
</table>

**Внимание!** Триггеры из конфигурации с низким приоритетом переопределяются
одноименными триггерами из конфигурации с более высоким приоритетом
(см. [Порядок подстановки переменных](deep_dive_analytics.md#variable-substitution-ordering)).

### Способ отправки данных: атрибут transport

Атрибут `transport` определяет способ отправки запроса.
По умолчанию разрешены три следующих метода.

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Метод транспорта</th>
      <th data-th="Description">Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Указывает, что для передачи запроса может использоваться метод <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a>. Будет отправлен запрос <code>POST</code> с учетными данными и пустым телом запроса.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Указывает, что для передачи запроса может использоваться <code>XMLHttpRequest</code>. Будет отправлен запрос <code>POST</code> с учетными данными и пустым телом запроса.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Указывает, что запрос может быть передан путем генерации тега <code>Image</code>. Будет отправлен запрос <code>GET</code>.</td>
    </tr>
  </tbody>
</table>

Для запроса должен использоваться только один метод,
который включен, разрешен, доступен и имеет максимальный приоритет.

Порядок предпочтения: `beacon` > `xhrpost` > `image`.
Если метод не поддерживается пользовательским агентом клиента,
используется следующий включенный метод в порядке предпочтения.

Атрибут `transport` следует включать в конфигурацию только тогда, когда вы хотите
ограничить варианты транспорта,
в противном случае передача запросов может быть нарушена.

В следующем примере для методов
`beacon` и `xhrpost` установлено значение false,
поэтому они не будут использоваться, хотя их приоритет выше, чем у `image`.
Если пользовательский агент клиента поддерживает метод `image`,
то он будет использоваться, в противном случае запросы не будут отправляться.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Порядок подстановки переменных <a name="variable-substitution-ordering"></a>

AMP заполняет значения переменных в следующем порядке предпочтения.

1. Удаленные конфигурации (через `config`).
2. Значения `vars`, вставленные в триггер внутри атрибута `triggers`.
3. Значения `vars` на верхнем уровне, вставленные внутри тега [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
4. Значения, предоставленные платформой.

В этом примере имеется удаленная конфигурация,
переменные, определенные на верхнем уровне, в триггерах и на уровне платформы:

```html
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
```

Если одна и та же переменная `var` определена в нескольких местах,
ее значение устанавливается один раз в порядке предпочтения.
Таким образом, если в примере выше удаленная конфигурация определяет для `account` значение UA-XXXXX-Y,
значения переменных будут выглядеть следующим образом:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Значение</th>
      <th data-th="Defined By" class="col-thirty">Определяет</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Платформа</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Триггер</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Удаленная конфигурация</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Триггер</td>
    </tr>
  </tbody>
</table>
