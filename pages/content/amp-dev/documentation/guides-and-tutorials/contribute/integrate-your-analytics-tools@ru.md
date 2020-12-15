---
"$title": Интеграция вашего инструмента аналитики с AMP
order: '1'
formats:
- websites
- stories
teaser:
  text: Обзор
toc: 'true'
---

##  Обзор

Если вы — владелец инструмента SaaS («программное обеспечение как услуга»), позволяющего издателям лучше анализировать свой трафик и посетителей, вы можете интегрировать свой сервис в `amp-analytics`. Такая интеграция позволит вашим клиентам изучать характер трафика на своих страницах AMP HTML.

## Прежде чем начать <a name="before-you-begin"></a>

Прежде чем вы сможете добавить свой аналитический сервис в среду выполнения AMP HTML, вам может потребоваться выполнить следующее:

- Определите типы [переменных](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) и [запросов,](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#requests) которые понадобятся вашей службе аналитики в документе AMP HTML.
- Определите триггеры, которые будут инициировать отправку со страницы необходимых вашему сервису аналитических запросов.
- Подумайте, будете ли вы [отслеживать пользователей при переходе между собственным](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md) и сторонними контекстами AMP, и если да, то каким образом.
- Определите, как ваша панель аналитики будет обрабатывать AMP-трафик.
- Выявите все недостающие функции в `amp-analytics` и [отправьте запросы](https://github.com/ampproject/amphtml/issues/new) на добавление необходимых функций.
- AMP Analytics отправляет свои переменные в предварительно настроенную конечную точку. Если у вас еще нет существующей конечной точки, просмотрите [этот пример](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample), чтобы узнать, как создать ее.
    - Для всех типов транспортировки, кроме `iframe`, переменные отправляются в виде параметров строки HTTPS-запроса.
    - Для типа транспортировки `iframe` создается элемент iframe создается и переменные направляются в него с помощью метода `window.postMessage`. В этом случае сообщение не обязательно должно быть URL-адресом. Эта опция доступна только поставщикам, аккредитованным MRC.
- Подумайте, как интеграция с `amp-analytics` может повлиять на ваши политики (в частности, политику конфиденциальности) или соглашения.

## Добавление вашей конфигурации в среду выполнения AMP HTML <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Создайте [задачу Intent-To-Implement](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features), в которой говорится, что вы добавите конфигурацию своего аналитического сервиса в среду выполнения AMP HTML. Не забудьте включить в описание строку **cc @ ampproject / wg-analytics**.
2. Разработайте патч, который реализует следующее:
    1. Новый конфигурационный JSON-файл `${vendorName}.json` в [папке](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) поставщиков, включая все опции, выходящие за стандартную конфигурацию, например:
        1. `"vars": {}` для дополнительных переменных по умолчанию.
        2. `"requests": {}` для запросов, которые будет использовать ваш сервис.
        3. `"optout":` при необходимости. В настоящее время у нас нет универсальной системы отписки, поэтому свяжитесь с нами, чтобы помочь нам разработать ту, которая подойдет вам.
        4. `"warningMessage":` при необходимости. Отображает предупреждающую информацию от поставщика (например, об устаревании или миграции) в консоли.
    2. Если вы используете транспортировку в iframe, добавьте также новую строку в раздел ANALYTICS_IFRAME_TRANSPORT_CONFIG файла iframe-transport-vendors.js, содержащую `"*vendor-name*": "*url*"`
    3. Пример в справочном файле [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
    4. Тест в файле [extensions/amp-analytics/0.1/test/vendor-requests.json](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
    5. Добавьте свой аналитический сервис в список поддерживаемых поставщиков в файле [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./analytics-vendors-list.md). Укажите его тип, описание и ссылку на документацию по использованию.
3. Протестируйте новый пример, который вы поместили в [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html), чтобы убедиться, что обращения из примера работают должным образом — например, что необходимые данные собираются и отображаются на инструментальной панели вашего аналитического сервиса.
4. Отправьте пул-реквест с этим патчем, указав ссылку на задачу Intent-To-Implement.
5. Обновите документацию по использованию вашего сервиса и проинформируйте своих клиентов.
6. Настоятельно рекомендуется [проводить интеграционный тест вне репозитория AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Менеджеры тегов <a name="tag-managers"></a>

У сервисов управления тегами есть два варианта интеграции с AMP Analytics:

- **Подход с использованием конечной точки:** реализуется в виде дополнительной конечная точки для `amp-analytics`, управление маркетингом осуществляется в бэкенде.
- **Подход с использованием конфигурации:** управление тегами осуществляется с помощью динамически генерируемого файла конфигурации JSON, уникального для каждого издателя.

Подход с использованием конечной точки идентичен стандартному подходу, описанному в предыдущем разделе. Подход с использованием конфигурации состоит из создания уникальной конфигурации для amp-analytics, которая является индивидуальной для каждого издателя и включает все совместимые с ним пакеты аналитики. Издатель включит конфигурацию, используя синтаксис, подобный следующему:

[sourcecode:html]
<amp-analytics
  config="https://my-awesome-tag-manager.example.com/user-id.json"
></amp-analytics>
[/sourcecode]

Чтобы воспользоваться этим подходом, ознакомьтесь с документацией по интеграции издателей с AMP Analytics.

## Дополнительные ресурсы <a name="further-resources"></a>

- Детальный разбор: [почему бы просто не использовать iframe?](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/why-not-iframe.md)
- Детальный разбор: [управление неаутентифицированным состоянием пользователя с помощью AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)
- [Пример использования amp-analytics](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- Справочная документация по [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- Справочная документация по [переменным amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)
