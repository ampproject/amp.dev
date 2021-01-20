---
$title: amp-iframe
$category@: layout
teaser:
  text: Показывает окно iframe.
---

<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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



Показывает окно iframe.


<table>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Примеры</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">Аннотированный пример кода для amp-iframe</a></td>
  </tr>
</table>

# Принципы работы <a name="behavior"></a>

Компонент `amp-iframe` имеет ряд существенных отличий от окон iframe vanilla, которые обеспечивают высокую безопасность компонента и позволяют не использовать файлы AMP, основанных на одном окно iframe. Эти отличия перечислены ниже.

* Компонент `amp-iframe` не может появляться близко к верхней части документа (исключением являются окна iframe, в которых используется элемент `placeholder` в соответствии с описанием [ниже](#iframe-with-placeholder)). Такое окно iframe должно быть удалено от верха документа по меньшей мере на 600 пикселей или не находиться в первых 75 % площади области просмотра при прокрутке вверх.
* Компоненты amp-iframe по умолчанию проверяются в тестовой среде. [Подробнее…](#sandbox)
* Компонент `amp-iframe` может запрашивать ресурсы только по протоколу HTTPS, атрибута `srcdoc`, а также из URI данных.
* Компонент `amp-iframe` может относится к тому же источнику, что и контейнер, только если в атрибуте `sandbox` для них включен элемент `allow-same-origin`. Дополнительные сведения о разрешенных источниках окон iframe доступны в [специальном документе](https://github.com/ampproject/amphtml/blob/master/spec/amp-iframe-origin-policy.md).

*Пример: встраивание Google Карт в компонент amp-iframe*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

Как выполняется показ:

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="ll callout('Совет.</b><a class="type_success"] Посмотрите примеры использования компонента `amp-iframe` на [специальном сайте](https://ampbyexample.com/components/amp-iframe/).
[/tip]

# Использование компонента amp-iframe для показа рекламы <a name="usage-of-amp-iframe-for-advertising"></a>

Основным назначением компонента `amp-iframe` **не может быть** показ рекламы. С помощью этого компонента можно`` показывать видеоролики, некоторых из которых имеют рекламный характер. Для соблюдения этого правила могут не обрабатываться соответствующие окна iframe.

В рекламных целях следует использовать компонент [`amp-ad`](amp-ad.md).

Это правило действует по следующим причинам:

* Компонент `amp-iframe` предусматривает проверку в тестовой среде, а такая среда также применяется к дочерним окнам iframe. Это может привести к некорректному отображению целевых страниц, даже если объявление показывается нормально.
* Компонент `amp-iframe` не может передавать сведения о конфигурации окну iframe.
* Компонент `amp-iframe` не содержит средств изменения размера, полностью контролируемых окном iframe.
* Для компонента `amp-iframe` могут быть недоступны данные по видимости окон iframe.

# Атрибуты <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Атрибут <code>src</code> отличается от стандартного окна iframe только тем, что к URL добавляется фрагмент <code>#amp=1</code>,
        чтобы указать в исходных документах, что они встроены на AMP-страницы. Этот фрагмент добавляется, только если в URL, указанном в атрибуте <code>src</code>, ещё нет фрагментов.</td>
    </tr>
    <tr>
      <td width="40%"><strong>srcdoc, frameborder, allowfullscreen, allowpaymentrequest, allowtransparency, referrerpolicy</strong></td>
      <td>Эти атрибуты работают так же, как в стандартных окнах iframe.
        <br>
          Если атрибут <code>frameborder</code> не задан, для него по умолчанию будет установлено значение <code>0</code>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
          <td>Для окон iframes, созданных с помощью компонента <code>amp-iframe</code>, всегда определен атрибут <code>sandbox</code>. По умолчанию значение не указывается. Это означает, что такие окна находятся в максимально корректной тестовой среде. Если задать значения атрибута <code>sandbox</code>, можно снизить уровень корректности тестовой среды того или иного окна iframe. Указывать можно любые значения, которые поддерживаются браузером. Например, значение <code>sandbox="allow-scripts"</code> позволит окну iframe выполнять код JavaScript, а значение <code>sandbox="allow-scripts allow-same-origin"</code> – выполнять код JavaScript, читать и записывать файлы cookie, а также создавать объекты XHR без технологии обмена ресурсами с запросом происхождения (Cross Origin Resource Sharing, CORS).
            <br><br>
              Если в окнах iframe использовать документ, не предназначенный для проверок в тестовой среде, вам может понадобиться добавить значение <code>allow-scripts allow-same-origin</code> к атрибуту <code>sandbox</code>, а также разрешить дополнительные возможности.
              <br><br>
                Учтите, что атрибут sandbox применяется ко всем окнам, открытым из iframe в тестовой среде, в частности к окнам, которые были созданы при помощи ссылки с элементом <code>target=_blank</code> (для этого необходимо добавить атрибут <code>allow-popups</code>). Если добавить значение <code>allow-popups-to-escape-sandbox</code> к атрибуту <code>sandbox</code>, созданные новые окна не будут предназначены для тестовой среды. В большинстве случаев вам будет необходимо именно это. В настоящий момент значение <code>allow-popups-to-escape-sandbox</code> поддерживается только в браузере Chrome.
                <br><br>
                  Дополнительные сведения об атрибуте sandbox доступны в <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox">специальной документации</a>.</td>
                </tr>
                <tr>
                  <td width="40%"><strong>common attributes</strong></td>
                  <td><a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">Атрибуты</a>, которые поддерживаются большинством компонентов AMP.</td>
                </tr>
              </table>

# Окно iframe с тегом <a name="iframe-with-placeholder"></a>

Компонент `amp-iframe` можно настроить так, чтобы он появлялся в верхней части документа, если для этого компонента ``добавлен элемент `placeholder`, как показано в примере ниже.

* Компонент `amp-iframe` должен содержать элемент с атрибутом `placeholder` (например, элемент `amp-img`) который будет обрабатываться как тег, пока окно iframe не будет готово к показу.
* О готовности окна iframe к показу сигнализирует его элемент `onload` или элемент `embed-ready` `postMessage`, который отправляется из документа окна iframe.

*Пример: окно iframe с тегом*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    src="https://foo.com/iframe">
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*Пример: запрос готовности встраивания окна iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# Изменение размера окна iframe <a name="iframe-resizing"></a>

Как для любого элемента AMP-страниц, для компонента `amp-iframe` необходимо определить статический макет. Однако для компонента `amp-iframe` можно изменить размер во время выполнения. Для этого должны быть соблюдены следующие условия:

1. Компонент `amp-iframe` должен быть определен с помощью атрибута `resizable`.
1. У компонента `amp-iframe` должен быть дочерний элемент `overflow`.
1. Компонент `amp-iframe` должен определять атрибут `allow-same-origin` для тестовой среды.
1. Запрос `embed-size`, который отправляется документом окна iframe, должен представлять собой сообщение в окне.
1. Высота запроса не должна быть меньше заданного порогового значения (100 пикселей). В противном случае запрос `embed-size` будет отклонен.

Учтите, что атрибут `resizable` устанавливает для элемента `scrolling` значение `no`.

*Пример: компонент `amp-iframe` с элементом `overflow`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*Пример: запрос на изменение размера окна iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

После получения сообщения библиотека AMP стремится как можно быстрее выполнить запрос, но учитывает различные факторы, связанные с интерфейсом и эффективностью, например место чтения и использование прокрутки. Если удовлетворить запрос не удается, компонент `amp-iframe` обеспечит показ элемента `overflow`. Нажатие на элемент `overflow` приведет к изменению размера компонента `amp-iframe`, так как для этого необходимо действие пользователя.

Скорость изменения размеров может зависеть от того, связано ли оно:

* с действием пользователя;
* с запросом для активного окна iframe;
* с запросом для окна iframe, находящегося под или над областью просмотра.

# Видимость окон iframe <a name="iframe-viewability"></a>

Окна iframes могут отправлять родительским элементам сообщение `send-intersections`, чтобы получать [данные об изменениях](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) стиля IntersectionObserver для совпадения этих окон с областью просмотра родительских элементов.

*Примечание. В приведенных ниже примерах считается, что скрипт содержится в созданном окне iframe, причем верхним окном является вариант `window.parent`. Если скрипт находится во вложенном окне iframe, вариант `window.parent` необходимо изменить на верхнее окно AMP-страницы.*

*Пример: запрос `send-intersections` в окне iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

Окно iframe может получать данные о совпадении с областью просмотра родительских элементов из сообщения `intersection`, полученного от этих элементов.

*Пример: запрос `send-intersections` в окне iframe*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

Сообщение intersection направляется от родительского элемента в окно iframe, если при прокрутке этого окна или изменении его размера оно входит в область просмотра или выходит из него либо является видимым частично.

# Отслеживание и анализ эффективности окон iframe <a name="trackinganalytics-iframes"></a>

Мы настоятельно рекомендуем в аналитических целях использовать компонент [`amp-analytics`](amp-analytics.md), так как он представляет собой комплексное и эффективное решение, которое можно настроить для самых разных поставщиков аналитических услуг.

На AMP-странице может быть только одно окно iframe, предназначенное для отслеживания и анализа. Для экономии ресурсов такие окна iframe удаляются из элемента DOM спустя 5 секунд после загрузки. Этого времени обычно достаточно для выполнения всех необходимых задач.

Предназначенными для отслеживания и анализа считаются окна iframe, которые не выполняют никакой функции, связанной непосредственно с пользователями, такой как обеспечение невидимости или малого размера.

# Рекомендация: использование имеющихся компонентов AMP-страниц поверх компонента amp-iframe <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

Компонент `amp-iframe` считается резервным объявлением, если необходимого результата на AMP-странице нельзя добиться другими средствами или если на ней нет подходящего [компонента AMP](../../../documentation/components/index.html). Это связано с тем, что существует ряд преимуществ использования компонента AMP, предназначенного для конкретного случая, например:

* Благодаря удобному управлению ресурсами обеспечивается их высокая эффективность.
* В некоторых случаях благодаря специальным компонентам могут появиться встроенные изображения тегов. В частности, это может обеспечить подходящее уменьшенное изображение перед загрузкой видео или облегчить написание кода для добавления тега вручную.
* Предусмотрена возможность изменения размеров. Иными словами, если контент окна iframe не имеет определенного размера, он может чаще показываться на странице в качестве ее исходного контента, а фрейма с функцией прокрутки.
* Могут быть встроены другие дополнительные функции, такие как автовоспроизведение для проигрывателей.

# Валидация <a name="validation"></a>

С [правилами для компонента amp-iframe](https://github.com/ampproject/amphtml/blob/master/extensions/amp-iframe/validator-amp-iframe.protoascii) можно ознакомиться в спецификации валидатора AMP.
