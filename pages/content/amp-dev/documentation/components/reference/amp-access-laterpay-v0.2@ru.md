---
$title: amp-access-laterpay
$category@: dynamic-content
teaser:
  text: Позволяет издателям легко обеспечивать интеграцию с платформой для микроплатежей LaterPay
---

<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



Позволяет издателям легко обеспечивать интеграцию с платформой для микроплатежей [LaterPay](https://www.laterpay.net). Для работы с `amp-access-laterpay` необходимо использовать [amp-access](amp-access.md).

<table>
  <tr>
    <td class="col-fourty"><strong>Скрипты</strong></td>
    <td>
      <small>Обратите внимание, что вам понадобятся скрипты для amp-access-laterpay, amp-access и amp-analytics.</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://cdn.ampproject.org/v0/amp-access-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://cdn.ampproject.org/v0/amp-access-laterpay-0.2.js"></script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>Примеры</strong></td>
    <td>См. пример <a href="https://ampbyexample.com/components/amp-access-laterpay/">amp-access-laterpay</a> на сайте AMP By Example.</td>
  </tr>
</table>


## Действия <a name="behavior"></a>

[LaterPay](https://laterpay.net) – это платформа для микроплатежей, которая позволяет пользователям покупать онлайн-контент всего в два клика. При этом они сразу получают доступ к оплаченным данным – без предварительной регистрации и отправки личной или платежной информации. Оплата осуществляется только после того, как сумма покупки достигла 5 долл. США или евро на разных сайтах. Поставщики контента могут продавать отдельные элементы или повременный доступ к контенту (ограниченный или постоянный).

Если интеграция с LaterPay осуществлялась с помощью [Connector Script](https://docs.laterpay.net/connector/), вы не сможете использовать ее на AMP-страницах. Решение `amp-access-laterpay` аналогично Connector Script по функциональности, но предназначено специально для AMP-страниц.

Чтобы продавать контент через LaterPay, достаточно использовать `amp-access-laterpay` в качестве единственного метода интеграции.

Компонент `amp-access-laterpay` использует решение AMP Access, чтобы обеспечить аналогичное поведение при работе с сервисом LaterPay.

Если у вас есть собственный сервис платного доступа и вы хотите использовать его совместно с AMP Access и LaterPay на одной и той же странице, [это можно настроить](#using-amp-access-laterpay-together-with-amp-access).

Компонент `amp-access-laterpay` не требует авторизации или конфигурации автоматического уведомления, поскольку он уже настроен для работы с LaterPay. Также не требуется настраивать вручную ссылки для входа.

Разные варианты покупки можно настроить в издательском аккаунте LaterPay. Компонент будет запрашивать конфигурации и создавать список вариантов.

Ознакомьтесь с [документацией по настройке LaterPay Connector](https://docs.laterpay.net/connector/configuration/), инструмента для интеграции с пользовательским интерфейсом.

Список, который создается компонентом, можно стилизовать, чтобы он выглядел так, как нужно издателю.

При работе компонента также применяется [разметка контента для доступа](amp-access.md#access-content-markup). Она позволяет скрывать и показывать контент.

## Конфигурация <a name="configuration"></a>

Конфигурация похожа на ту, что используется для AMP Access, но не требует авторизации, автоматического уведомления и ссылок для входа.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>

```

Значения, которые можно настроить в объекте конфигурации `laterpay`, перечислены ниже.

<table>
  <tr>
    <th class="col-fourty">Свойство</th>
    <th class="col-twenty">Значение</th>
    <th class="col-fourty">Описание</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>Селектор CSS <strong>(обязательно)</strong></td>
    <td>Селектор CSS, который определяет элемент на странице, содержащий заголовок статьи. Это гарантирует, что на страница с предложением купить статью есть ее название и пользователь знает, что покупает.</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>Список идентификаторов, разделенный запятыми</td>
    <td>По умолчанию для сопоставления статьи с вариантом покупки используется ее URL. Однако вместо пути URL вы можете настроить идентификатор статьи в интерфейсе LaterPay Connector, а затем воспользоваться свойством <code>articleId</code>, чтобы выполнить сопоставление.
      <br>
        Это необходимо в тех случаях, когда вам требуется более гибкое сопоставление варианта покупки с URL. Ознакомьтесь со статьей <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">о конфигурации LaterPay Connector</a>. Там приведены примеры и сценарии использования.</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>Токен JWT для настройки динамического платежа</td>
        <td>Этот параметр позволяет указать подписанный веб-токен JSON с конфигурацией для доступного платного контента. Таким образом вы можете предоставить внутристраничную конфигурацию, сгенерированную программно на ваших страницах, а не указывать ее вручную в интерфейсе LaterPay Connector. Это может быть особенно полезно при настройке отдельных покупок для множества разных статей.
          <br>
            О том, как создать токен и какой контент можно в нем указывать, читайте в документации по <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">JWT Paid Content API</a> для скрипта Connector Script.
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>string</td>
          <td>Определяет стиль форматирования цены, соответствующий региональным настройкам.</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>object</td>
          <td>Позволяет издателю настраивать или локализовать текст, присутствующий в сгенерированном списке вариантов покупки. Более подробные сведения приведены в разделе <a href="#localization">Локализация</a>.</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>boolean</td>
          <td>При значении true прокручивает страницу вверх, если авторизация прошла успешно. Это полезно, если диалог был показан в нижней части страницы и пользователь может запутаться с прокруткой после возврата на страницу.</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>string</td>
          <td>Регион для LaterPay: <code>eu</code> или <code>us</code><a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html"></a>.</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>boolean</td>
          <td>Требуется только в том случае, если вы используете тестовую среду для проверки конфигурации сервера. Вам также необходимо применить <a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">режим разработчика</a> AMP.</td>
        </tr>
      </table>

## Разметка контента для доступа и список вариантов покупки <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

Разметка контента для доступа здесь используется так же, как и в случае с AMP Access.

Элемент с идентификатором `amp-access-laterpay-dialog` обрабатывает список вариантов, если у пользователя нет доступа к статье. Этот список имеет несколько базовых стилей и его можно настроить так, чтобы он лучше смотрелся на странице издателя.

Если вас устраивает стиль по умолчанию, убедитесь, что вы применяете класс `amp-access-laterpay`.

```html
<section amp-access="NOT error AND NOT access" amp-access-hide="">
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  Произошла ошибка.
</section>

<div amp-access="access" amp-access-hide="">
  <p>...Контент статьи...</p>
</div>

```

## Стилизация <a name="styling"></a>

К некоторым элементам сгенерированной разметки применяется несколько классов. На элементы без классов можно однозначно ссылаться через селекторы элементов CSS.

У нас есть базовые шаблоны CSS, но мы рекомендуем издателям стилизовать списки так, чтобы они естественно смотрелись на страницах.

Структура диалога выглядит так:

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Необязательно. Отображается, если в верхнем колонтитуле задано сообщение для локализации.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">Название покупки</span>
              <p class="amp-access-laterpay-description">Описание покупки</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">100</span>
            <sup class="amp-access-laterpay-currency">РУБ</sup>
          </p>
        </li>
        <!-- ...Список других вариантов... -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">Купить</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="…">Уже есть</a>
      </p>
      <p class="amp-access-laterpay-footer">
        Необязательно. Отображается, если в нижнем колонтитуле задано сообщение для локализации.
      </p>
    </div>
    <p class="amp-access-laterpay-badge">Технологии <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
  </div>

```

## Локализация <a name="localization"></a>

Текст, который отображается в диалоговом окне с вариантами покупки, указывается издателем в интерфейсе LaterPay Connector.

Оставшийся текст является частью расширенного компонента. Его можно изменить и локализовать с помощью параметров конфигурации следующим образом:

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

Ниже перечислены ключи, которые можно перевести или настроить. Учитывайте, что текст в любом случае должен сохранять исходный смысл.

<table>
  <tr>
    <th class="col-fourty">Ключ</th>
    <th class="col-fourty">Описание</th>
    <th>Значение по умолчанию</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>Текст кнопки для совершения покупки. Показывается для вариантов, когда можно заплатить позже.</td>
    <td>'Buy Now, Pay Later'</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>Текст кнопки для совершения покупки. Показывается для вариантов с немедленной оплатой.</td>
    <td>'Buy Now'</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>Текст кнопки, который отображается, пока ни один вариант не выбран.</td>
    <td>'Buy Now'</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>Если пользователь ранее приобрел статью, но файлы cookie не сохранились или он вошел с другого устройства, эта ссылка пригодится для входа в LaterPay и доступа к оплаченному контенту.</td>
    <td>'I already bought this'</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>Необязательный текст верхнего колонтитула.</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>Необязательный текст нижнего колонтитула.</td>
    <td></td>
  </tr>
</table>

## Аналитика <a name="analytics"></a>

Поскольку в основе `amp-access-laterpay` лежит `amp-access`, этот компонент поддерживает все [события аналитики](amp-access.md#integration-with-amp-analytics), которые отправляет `amp-access`.

Подробные практические примеры можно найти на сайте [https://ampexample.laterpay.net/](https://ampexample.laterpay.net/). Все они настроены так, чтобы отправлять эти события.

## Совместное использование AMP Access LaterPay и AMP Access <a name="using-amp-access-laterpay-together-with-amp-access"></a>

Если у вас есть собственная система подписки и вы собираетесь использовать LaterPay только для продажи отдельных статей, можно сочетать AMP Access LaterPay и AMP Access на одной странице.

Для начала ознакомьтесь с [документацией по AMP Access](amp-access.md) и узнайте, как настроить этот компонент для работы с вашим платным доступом.

В разделе о [нескольких поставщиках](amp-access.md#multiple-access-providers) объясняется, как настроить несколько поставщиков, используя пространства имен.

В сочетании с LaterPay и существующей системой платного доступа конфигурация будет выглядеть примерно так:

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
      },
      "namespace": "laterpay"
    },
    {
      "authorization":
          "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
          "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
          "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
      "namespace": "publishername"
    }
  ]
</script>

```

Разметка контента может выглядеть так:

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Войдите, чтобы воспользоваться подпиской на PublisherName.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  Произошла ошибка.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...Контент статьи...</p>
</div>

```

Более подробный пример можно найти по ссылке: [https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html).

## Статьи по теме <a name="related-documentation"></a>

* [AMP Access](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay: как мы работаем с микроплатежами](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay Connector](https://connectormwi.laterpay.net/docs/index.html) – решение, похожее на AMP Access LaterPay, но созданное для обычных страниц без AMP.

## Проверка <a name="validation"></a>

О правилах для amp-access-laterpay читайте в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii).
