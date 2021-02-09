---
'$title': Реализация офлайн-доступа и повышение производительности
$order: 11
description: Сервис-воркер — это работающий на стороне клиента прокси, выступающий в качестве посредника между страницей и сервером. Он используется для реализации высококачественного офлайн-взаимодействия, создания оболочек приложений...
formats:
  - websites
author: CrystalOnScript
contributors:
  - pbakaus
---

[Сервис-воркеры](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) дают возможность обеспечивать насыщенное офлайн-взаимодействие с веб-приложением, а также его устойчивую работу вне зависимости от качества соединения. Благодаря кешированию ресурсов в браузере, веб-приложение может предоставлять данные, ассеты и страницы в режиме офлайн, чтобы не терять взаимодействия с пользователем.

Помните: сервис-воркер не может взаимодействовать с вашей страницей, полученной из AMP-кеша. Используйте его на последующих этапах, — когда пользователь перейдет на страницы, размещенные на вашем домене.

## Установка сервис-воркера

Сервис-воркер — это работающий на стороне клиента прокси, выступающий в качестве посредника между страницей и сервером. Он используется для реализации высококачественного офлайн-взаимодействия, создания оболочек приложений с быстрой загрузкой и отправки push-уведомлений.

[tip type="note"] **ПРИМЕЧАНИЕ.** Если вы раньше не встречали понятие «сервис-воркер», ознакомьтесь с [вводным материалом на WebFundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers). [/tip]

Страница должна зарегистрировать сервис-воркер, чтобы браузер смог найти или запустить его. Обычно для регистрации используется [код JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration), но на AMP-страницах для этой цели используется компонент [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md).

Для начала добавьте в раздел <code><head></code> вашей страницы тег script для загрузки компонента <a><code data-md-type="codespan">amp-install-serviceworker</code></a>:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

Затем добавьте следующую строку где угодно внутри тега `<body>` (измените, как необходимо, чтобы указать на ваш Service Worker):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Как только пользователь попадает на AMP-страницу на вашем домене (помните о том, что первой посещаемой пользователем страницей обычно является страница из AMP-кеша), сервис-воркер активизируется, позволяя вам делать [множество интересных вещей](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

## AMP Service Worker

Читатели этой статьи с большой долей вероятности занимаются созданием AMP-страниц. Команда AMP ставит удобство пользователей превыше всего и заботится о том, чтобы посещение сайтов было для них максимально комфортным. Чтобы согласованно достигать этих целей, команда AMP разработала сервис-воркер специально для AMP!

[tip type="default"] **СОВЕТ.** Пройдите обучение, чтобы узнать, как использовать [AMP Service Worker в своем приложении PWA](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md). [/tip]

### Установка сервис-воркера AMP

Установка AMP Service Worker выполняется всего за пару действий:

- Импортируйте код AMP Service Worker в свой файл сервис-воркера.

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
[/sourcecode]

- Установите сервис-воркер при помощи следующего кода.

[sourcecode:js]
AMP_SW.init();
[/sourcecode]

- И это все.

### Автоматическое кеширование

AMP Service Worker автоматически кеширует файлы скриптов и документов AMP. Кеширование файлов скриптов AMP делает их моментально доступными браузеру пользователя, что позволяет части функций работать в режиме офлайн и ускоряет загрузку страниц при неустойчивом соединении.

Если приложению требуется определенное поведение кеширования документов, AMP Service Worker позволяет его настроить. Например, можно указать список документов, которые должны всегда загружаться из сети. В примере ниже замените `Array<RegExp>` массивом регулярных выражений, определяющих URL-адреса документов, которые не следует кешировать.

[sourcecode:js]
AMP_SW.init(
documentCachingOptions: {
denyList?: Array<RegExp>;
}
);
[/sourcecode]

Подробнее о [настройке кеширования документов см. здесь](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching).

### Оптимизация AMP Service Worker

Для того чтобы использовать все возможности AMP Service Worker, настройте кеширование необходимых ассетов и предварительную загрузку ссылок при помощи опциональных полей.

Ассеты, составляющие основное содержание страницы (такие, как видео, важные изображения или скачиваемые PDF-файлы), следует кешировать, чтобы пользователь смог вновь открыть их, даже не имея доступа к сети.

[sourcecode:js]
AMP_SW.init(
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
);
[/sourcecode]

Вы можете настроить стратегию кеширования и создать список ссылок, исключенных из кеширования.

Содержимое ссылок на страницы, которые могут потребоваться вашим пользователям, можно загружать заранее для обеспечения доступа в режиме офлайн. Для этого к тегу ссылки нужно добавить атрибут `data-prefetch`.

[sourcecode:html]
<a href='....' data-rel='prefetch' />
[/sourcecode]

### Офлайн-работа

Добавьте специальную страницу, чтобы сообщать пользователям об отсутствии подключения к сети и рекомендовать им обновить сайт после восстановления подключения. AMP Service Worker может кешировать как саму страницу, так и ее ассеты.

[sourcecode:js]
AMP_SW.init({
offlinePageOptions: {
url: '/offline.html';
assets: ['/images/offline-header.jpg'];
}
})
[/sourcecode]

Страница отсутствующего подключения в идеале должна совпадать с остальными частями приложения по стилю пользовательского интерфейса, для того чтобы она воспринималась как часть сайта.

### Принудительное обновление

Команда AMP работает над реализацией функции принудительного обновления или удаления AMP Service Worker, которая позволит отключить сервис-воркер или изменить его код, если при его установке на устройства пользователей будет допущена ошибка.

Для того чтобы эффективно управлять сервис-воркером, следует понимать, как [стандартное HTTP-кеширование влияет на обновление его JavaScript-кода на стороне клиента](https://developers.google.com/web/updates/2018/06/fresher-sw). Корректная настройка директив HTTP-кеширования, возвращаемых сервером вместе с файлом сервис-воркера, позволит вам исправлять мелкие ошибки, внося соответствующие изменения в код сервис-воркера, размещенный на сервере. На случай, если сервис-воркер потребуется удалить, полезно иметь под рукой файл простого сервис-воркера, [не выполняющего никаких операций](https://en.wikipedia.org/wiki/NOP), например:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"] Подробнее об управлении установленными сервис-воркерами [читайте здесь](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776). [/tip]

## Написание собственного сервис-воркера

При помощи описанной выше методики можно обеспечивать офлайн-доступ к вашему AMP-сайту, а также дополнять содержимое страниц **сразу после их загрузки с сервера**, так как сервис-воркер может произвольно изменять содержимое ответа, используя событие `fetch`:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open('mysite').then(function(cache) {
return cache.match(event.request).then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})

        // Modify the response here before it goes out..
        ...

        return response || fetchPromise;
      })
    })

);
});
[/sourcecode]

Эта методика позволяет добавлять на AMP-страницу дополнительную функциональность, которая в ином случае не прошла бы [валидацию AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), например:

- Динамическая функциональность, для работы которой требуется пользовательский код JS.
- Модифицированные компоненты или компоненты, которые нужны только для вашего сайта.
