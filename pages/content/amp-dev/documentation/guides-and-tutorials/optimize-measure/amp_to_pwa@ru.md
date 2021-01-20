---
"$title": Превращение вашего AMP-сайта в PWA
"$order": '10'
description: Благодаря кешированию ресурсов в браузере, PWA может предоставлять данные, ассеты и страницы в режиме офлайн, чтобы не терять взаимодействия с пользователем.
tutorial: 'true'
formats:
- websites
author: CrystalOnScript
---

Прогрессивные веб-приложения используют [сервис-воркеров](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), чтобы обеспечивать широкие возможности работы в режиме офлайн и согласованный опыт взаимодействия при переменном качестве сетевого подключения. Благодаря кешированию ресурсов в браузере, PWA может предоставлять данные, ассеты и страницы в режиме офлайн, чтобы не терять взаимодействия с пользователем.

В этом руководстве вы узнаете, как превратить AMP-сайт в устанавливаемое PWA-приложение с возможностями работы в офлайне путем добавления веб-манифеста и сервис-воркера на базе AMP Service Worker.

# Скачайте и запустите стартовый код

Скачайте [стартовый код по этой ссылке](/static/files/tutorials/amptopwa.zip).

Используйте локальный веб-сервер для предварительного просмотра сайта.

[tip type="default"] **СОВЕТ.** Для быстрого создания веб-сервера запустите `python -m SimpleHTTPServer`. [/tip]

Вам должна быть доступна целевая страница Lyrical Lightning, фестиваля Mobile Music Magic. На главной странице размещена одна ссылка, по которой можно посмотреть расписание выступлений и распределение групп по сценам.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

У посетителей нашего мероприятия может быть нестабильное подключение к сети, при этом они, скорее всего, захотят просмотреть расписание выступлений. Это отличный повод преобразовать сайт в PWA-приложение, которое пользователь может установить на домашний экран, и которое обладает всей важнейшей функциональностью даже в режиме офлайн.

# Создавать <a>манифест веб-приложения</a>

[Манифест веб-приложения](https://developers.google.com/web/fundamentals/web-app-manifest/) — это простой JSON-файл, который информирует браузер о вашем веб-приложении и сообщает, каким поведением оно должно обладать при «установке» его на мобильный телефон или компьютер пользователя. Во многих браузерах наличие манифеста является обязательным условием для отображения [диалогового окна «Добавить на главный экран»](https://developers.google.com/web/fundamentals/app-install-banners/).

Добавьте в репозиторий файл `manifest.json`, содержащий следующий код:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Добавьте сервис-воркер AMP

Сервис-воркер — это скрипт, выполняемый браузером отдельно от страницы в фоновом режиме, который расширяет возможности браузера, кешируя запросы для повышения производительности и обеспечения автономной работы. Создать сервис-воркер с нуля возможно, но это потребует много времени. Библиотеки, такие как Workbox, упрощают этот процесс, но AMP идет еще дальше, предлагая готовый [AMP Service Worker](https://github.com/ampproject/amp-sw), в котором AMP непосредственно автоматизирует множество шагов, включая кеширование скриптов, ресурсов и документов AMP, а также реализует распространенные передовые практики, такие как [предзагрузка при навигации](https://developers.google.com/web/updates/2017/02/navigation-preload).

После установки AMP Service Worker автоматически кеширует [AMP-скрипты](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) и [документы](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) по мере того, как пользователь запрашивает их. Начнем с добавления базового AMP Service Worker.

## Создайте файл сервис-воркера

Создайте файл с именем `sw.js` и добавьте в него следующий код:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

С помощью всего двух строк кода он импортирует AMP Service Worker в ваш сервис-воркер и инициализирует его.

## Добавьте автоматическую установку сервис-воркера на свои AMP-страницы

AMP-сайты используют компонент [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) для установки сервис-воркера в фоновом режиме браузера, пока пользователь знакомится с вашим контентом.

Поместите требуемый тег скрипта в `index.html` и элемент `<amp-install-serviceworker>` внутрь тега `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Важно**. Сервис-воркер должен выдаваться из корневого каталога (`/sw.js`), чтобы иметь возможность кешировать все содержимое вашего сайта. [/tip]

`<amp-install-serviceworker>` устанавливает сервис-воркер, создавая iframe и запуская файл `data-iframe-src`. Создайте файл `install-sw.html` и добавьте в него следующий код:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

Элемент iframe регистрирует файл AMP Service Worker в браузере.

# Укажите, что будет кешироваться

AMP Service Worker обеспечивает множество оптимизаций по умолчанию, но также содержит дополнительные поля, которые можно использовать для тонкой настройки в соответствии с потребностями вашего приложения.

Наше приложение для музыкальных фестивалей будет кешировать графические ассеты, выполнять предзагрузку ссылки на расписание выступлений, а также содержать страницу для отсутствующего подключения.

## Кеширование ассетов

Вы можете использовать AMP Service Worker для [кеширования ассетов](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching), таких как изображения, видео и шрифты. Мы будем использовать его для кеширования нашего фонового изображения и логотипа AMP. Откройте файл `sw.js` и обновите его следующим образом:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

Мы указали, что нужно использовать стратегию кеширования [cache first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). Это означает, что приложение сначала попытается обработать изображения из кеша, прежде чем запрашивать что-либо из сети. Это особенно полезно для данного приложения, так как мы не собираемся обновлять фоновое изображение или логотип AMP.

## <a>Выполнять предварительную загрузку содержимого ссылок</a>

AMP Service Worker предварительно загружает содержимое ссылок, у которых установлен атрибут `data-rel=prefetch`. Это позволяет пользователям просматривать страницы в режиме офлайн, даже если они еще не посещали их. Мы добавим атрибут в тег ссылки на `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Покажите страницу отсутствующего подключения

На случай непредвиденных ситуаций (в том числе, когда пользователь нажимает на ссылки на страницы, которые не были предварительно загружены), мы добавим страницу отсутствующего подключения. Такая страница позволит сохранить согласованное оформление сайта, поскольку заменит собой стандартную страницу отсутствующего подключения, предусмотренную браузером. Скачайте файл [`offline.html` по этой ссылке](/static/files/tutorials/offline.zip) и обновите `sw.js` следующим образом:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Протестируйте свое PWA

Удостовериться, что ваш AMP Service Worker действительно кеширует нужные ассеты и предоставляет идеальное решение для автономной работы, можно с помощью [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

Чтобы протестировать приложение Lyrical Lightning, откройте панель DevTools (нажмите `Ctrl + Shift + I` в Windows или `Cmd + Opt + I` на Mac). Вы также можете щелкнуть правой кнопкой на странице и выбрать `Inspect` в меню. Затем выберите `Application`, чтобы просмотреть регистрационные данные вашего сервис-воркера.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Установите флажок `offline`, чтобы переключиться в режим офлайн. Нажмите на ссылку `see full lineup` и перейдите на страницу `offline.html`, чтобы удостовериться, что кеширование и предварительная загрузка этой страницы были выполнены корректно.

[tip type="default"] **Совет.** Для тщательного анализа возможностей прогрессивного веб-приложения запустите [инструмент Google Lighhouse](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool), чтобы создать отчет. [/tip]

# Поздравляем!

Вы успешно создали приложение PWA с применением AMP! В этом уроке вы научились:

- Создавать [манифест веб-приложения](https://developers.google.com/web/fundamentals/web-app-manifest/)
- Устанавливать сервис-воркер в AMP с помощью [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Настраивать [AMP Service Worker](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [Выполнять предварительную загрузку содержимого ссылок](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Создавать страницу отсутствующего подключения

Узнайте больше о [сервис-воркерах](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) и [создании опыта взаимодействия в режиме офлайн](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Научитесь [отслеживать вовлечение с помощью средств аналитики](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html) и пройдите обучение [настройке базовой аналитики для ваших AMP-страниц](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
