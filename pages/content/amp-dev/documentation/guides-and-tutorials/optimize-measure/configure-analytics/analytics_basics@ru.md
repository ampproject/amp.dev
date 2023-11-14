---
'$title': 'Аналитика: основы'
$order: 0
description: 'AMP предлагает два компонента для реализации функций аналитики и измерения показателей: amp-pixel и amp-analytics. Оба компонента отправляют аналитические данные в определенную конечную точку.'
formats:
  - websites
  - stories
---

Это руководство описывает основы применения функций аналитики в рамках платформы AMP.

## Что использовать: amp-pixel или amp-analytics? <a name="use-amp-pixel-or-amp-analytics"></a>

AMP предлагает два компонента для реализации функций аналитики и измерения показателей: [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) и [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Оба компонента отправляют аналитические данные в определенную конечную точку.

Если вам нужна функциональность, сравнимая с простым [отслеживающим пикселем](https://en.wikipedia.org/wiki/Web_beacon#Implementation), компонент [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) обеспечит базовые возможности отслеживания количества просмотров страницы; данные о просмотрах страницы будут отправляться на заданный URL-адрес. Этот компонент может потребоваться для интеграции с некоторыми поставщиками услуг аналитики, и в этих случаях поставщик сообщает конкретный URL конечной точки для данного компонента.

В большинстве аналитических решений следует использовать [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). В [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) также есть возможность отслеживать количество просмотров страницы, однако вы также сможете отслеживать взаимодействие пользователей с любыми видами контента страницы, включая переходы по ссылкам и нажатия кнопок. [filter formats="websites"] Вы можете узнать, насколько далеко пользователь выполнил прокрутку страницы, использовал ли он функции социальных сетей и многое другое [/filter] [filter formats="stories"] Вы также можете фиксировать, далеко ли пользователь пролистал историю и взаимодействовал ли он с интерактивными элементами. [/filter]

[tip type="read-on"] Ознакомьтесь с [подробным описанием AMP Analytics](deep_dive_analytics.md).[/tip]

В рамках интеграции с платформой AMP поставщики предлагают готовые конфигурации [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), позволяющие вам легко регистрировать данные и передавать их в принадлежащие поставщику инструменты отслеживания. Для получения дополнительной информации обратитесь к документации поставщика из списка [Поставщики услуг аналитики](analytics-vendors.md).

На своих страницах вы можете использовать как [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), так и [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md): [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) для простого отслеживания просмотров страницы и [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) для всего остального. Вы также можете добавлять каждый тег по несколько раз. Если вы работаете сразу с несколькими поставщиками услуг аналитики, для каждого решения понадобится свой тег. Помните о том, что более простые AMP-страницы лучше воспринимаются пользователями, поэтому, если вам не нужны дополнительные теги, не используйте их.

## Создание простой конфигурации аналитики

В этом разделе дается описание того, как создать простую конфигурацию для [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) и [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Простая конфигурация [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)

Чтобы создать простую конфигурацию [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), вставьте внутрь тега body своей AMP-страницы подобный код:

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

В этом примере данные о просмотре страницы отправляются на определенный URL-адрес вместе со случайным числом. Переменная `RANDOM` — одна из множества [подстановочных переменных, предусмотренных платформой AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md). Подробнее о [подстановке переменных можно узнать по этой ссылке](analytics_basics.md#variable-substitution).

Компонент [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) является встроенным, поэтому вам не понадобится вручную подключать его, как расширенные компоненты AMP, в числе которых [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Старайтесь размещать тег [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) как можно ближе к началу вашего тега `<body>`. Пиксель отслеживания срабатывает только тогда, когда тег появляется в видимой области экрана. Если [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) будет расположен в нижней части страницы, он может не сработать.

### Простая конфигурация [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)

Чтобы создать простую конфигурацию [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), сначала следует включить объявление `custom-element` в `<head>` AMP-документа (также см. [Объявление о включении компонентов](../../../../documentation/components/index.html)):

```html
<script
  async
  custom-element="amp-analytics"
  src="https://ampjs.org/v0/amp-analytics-0.1.js"
></script>
```

Следующий пример похож на [пример `amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Каждый раз, когда страница становится видимой, срабатывает событие, внесенное в список триггеров, которое отправляет данные о просмотре страницы на определенный URL вместе со случайным идентификатором:

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://foo.com/pixel?RANDOM"
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

В приведенном выше примере мы определили запрос с названием «pageview» и значением `https://foo.com/pixel?RANDOM`. Как уже упоминалось ранее, RANDOM заменяется случайным числом, поэтому фактически запрос будет выглядеть примерно так: `https://foo.com/pixel?0.23479283687235653498734`.

Когда страница становится видимой (что указывается использованием в триггере ключевого слова <code>visible</code>), срабатывает событие и выполняется отправка запроса `pageview`. Атрибут triggers определяет условие отправки запроса pageview. Дополнительную информацию о [запросах и триггерах читайте в этой статье](../../../../documentation/components/reference/amp-analytics.md).

[filter format="stories"]

## Стандартная конфигурация AMP-историй <a name="variable-substitution"></a>

Типичный путь перемещения пользователя по сайту сильно отличается от пути перемещения по историям. На сайте, прежде чем щелкнуть ссылку на следующую страницу, пользователь может прочитать заголовок, прокрутить страницу вниз и ввести данные в форму. Истории занимают всю область просмотра, и пользователи не прокручивают, а пролистывают их с помощью касания.

{{ image('/static/img/docs/guides/analytics-pages.png', 660, 501, alt='Image of PWA' ) }}

Многие бы хотели фиксировать просмотр каждого включенного в историю элемента [`<amp-story-page>`](../../../../documentation/components/reference/amp-story-page.md) как новый просмотр страницы, поскольку контент каждого экрана существенно отличается от предыдущего. Однако в данном контексте страница — это всего лишь один из элементов истории; пользователю обычно нужно просмотреть много страниц, чтобы получить полное представление об истории. Таким образом, вопрос о том, как мы будем считать такие простые вещи, как просмотры страницы, имеет большое значение в рамках реализации наших аналитических функций.

{{ image('/static/img/docs/guides/analytics-setup-stories.png', 1037, 528, alt='Image of PWA' ) }}

AMP Analytics позволяет легко реализовать описываемое поведение с помощью любого поставщика услуг аналитики. Например, при использовании доступного в Google Analytics [глобального тега сайта](https://developers.google.com/gtagjs/) код будет выглядеть следующим образом:

```html
<amp-analytics type="gtag" data-credentials="include">
  <script type="application/json">
    {
      "vars": {
        "gtag_id": "YOUR_GOOGLE_ANALYTICS_ID",
        "config": {
          "YOUR_GOOGLE_ANALYTICS_ID": {
            "groups": "default"
          }
        }
      },
      "triggers": {
        "storyProgress": {
          "on": "story-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_progress",
            "event_category": "${title}",
            "event_label": "${storyPageId}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        },
        "storyEnd": {
          "on": "story-last-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_complete",
            "event_category": "${title}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Данный стандартный код можно использовать в качестве полноценной рабочей конфигурации для AMP-истории.

Если вы хотите выйти за рамки возможностей стандартной конфигурации, прочтите статью [Аналитика для ваших AMP-историй](https://blog.amp.dev/2019/08/28/analytics-for-your-amp-stories/?_gl=1*pw0bu5*_ga*MzM1MjQ0ODE5LjE1NjUwMzU1MTg), чтобы узнать о более сложных сценариях взаимодействия с Google Analytics.

[/filter]

## Подстановка переменных <a name="variable-substitution"></a>

В компонентах [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) и [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) допускаются все стандартные подстановки переменных в URL (см. [Подстановки переменных в AMP HTML](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)). В следующем примере запрос pageview отправляется на URL-адрес вместе с каноническим URL-адресом текущего AMP-документа, его заголовком и значением [Client ID](analytics_basics.md#user-identification):

```html
<amp-pixel
  src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"
></amp-pixel>
```

Ввиду простоты тега [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) он может включать только те переменные, которые определены платформой или те, которые среда выполнения AMP может извлечь из AMP-страницы. В приведенном выше примере платформа подставляет значения и для `canonicalURL`, и для `clientId(site-user-id)`. Тег [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) может включать те же переменные, что и [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), а также однозначно определенные переменные внутри конфигурации тега.

Для указания переменной страницы или платформы в строке запроса используйте формат `${varName}`. Тег [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) заменит данный шаблон на его фактическое значение во время создания аналитического запроса (также см. статью [Переменные, поддерживаемые в `amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)).

В следующем примере [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) запрос pageview отправляется по URL-адресу с дополнительными данными, получаемыми в результате подстановки переменных, некоторые из которых предоставляются платформой, а другие определены во встроенном виде в конфигурации [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}"
      },
      "vars": {
        "account": "ABC123"
      },
      "triggers": {
        "someEvent": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "My homepage"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

В приведенном выше примере переменные `account` и `title` определены в конфигурации [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Переменные `canonicalUrl` и `clientId` не определены в конфигурации, поэтому их значения заменяет платформа.

[tip type="important"] **ВАЖНО!** Механизм подстановки переменных достаточно гибок; вы можете определять одни и те же переменные в разных местах, и среда выполнения AMP будет подставлять значения, руководствуясь порядком их приоритетности (см. статью [Порядок подстановки переменных](deep_dive_analytics.md#variable-substitution-ordering)). [/tip]

## Идентификация пользователя <a name="user-identification"></a>

Сайты используют файлы cookie для хранения информации о пользователе в браузере. Файлы cookie могут использоваться, чтобы определять, что пользователь уже посещал сайт. В AMP страницы могут загружаться либо с сайта издателя, либо из кеша (например, Google AMP Cache). Сайт издателя и кеш могут иметь разные домены. Из соображений безопасности браузеры часто ограничивают доступ к файлам cookie с другого домена (также см. [Отслеживание пользователей из разных источников](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-managing-user-state.md)).

По умолчанию AMP управляет назначением идентификатора клиента независимо от того, осуществляется ли доступ к странице с оригинального сайта издателя или через кеш. Идентификатор клиента, сгенерированный AMP, имеет значение `"amp-"`, за которым следует случайная строка в кодировке `base64`; идентификатор остается неизменным для пользователя при его повторных визитах.

AMP управляет чтением и записью идентификатора клиента во всех случаях. Особенно стоит отметить процедуру работы с идентификатором в тех случаях, когда страница загружается из кеша или иным образом отображается вне контекста оригинального сайта издателя. В этой ситуации доступ к файлам cookie, установленным сайтом издателя, будет невозможен.

Когда AMP-страница загружается с сайта издателя, используемый AMP фреймворк идентификаторов клиента может получать информацию о резервном cookie, который следует найти и использовать. В этом случае установленный в переменной `clientId` аргумент `cid-scope-cookie-fallback-name` интерпретируется как имя cookie. Его формат может быть либо `CLIENT_ID(cid-scope-cookie-fallback-name)`, либо `${clientId(cid-scope-cookie-fallback-name)}`.

Например:

```html
<amp-pixel
  src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"
></amp-pixel>
```

Если AMP обнаружит, что этот файл cookie установлен, подстановка идентификатора клиента вернет значение файла cookie. Если AMP определит, что этот файл cookie не установлен, AMP сгенерирует значение в форме `amp-`, за которым следует случайная строка в кодировке base64.

Узнать больше о подстановке идентификатора клиента, в том числе о том, как добавить дополнительный идентификатор уведомления пользователя, можно в статье [Переменные, поддерживаемые в AMP Analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md).

Дальнейшую информацию по функциям аналитики можно получить в статьях [Погружение в AMP Analytics](deep_dive_analytics.md) и [Примеры использования](use_cases.md).
