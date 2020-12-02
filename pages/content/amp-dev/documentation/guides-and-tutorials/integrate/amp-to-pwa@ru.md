---
"$title": Предварительная загрузка PWA с AMP-страниц
"$order": '1'
description: Одна из рекомендуемых стратегий состоит в том, чтобы реализовать точку входа на ваш сайт в виде AMP-страницы, после чего выполнить фоновую предзагрузку PWA и переключиться на...
formats:
- websites
author: pbakaus
---

Одна из грамотных стратегий заключается в том, чтобы реализовать **точку входа на ваш сайт в виде AMP-страницы**, после чего **выполнить фоновую предзагрузку PWA** и переключиться на него для дальнейшего взаимодействия с пользователем:

- All content “leaf” pages (those that have specific content, not overview pages) are published as AMPs for that nearly instant loading experience.
- Такие AMP-страницы используют специальный элемент [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) для предзаполнения кеша и предзагрузки оболочки PWA в то время, пока пользователь просматривает уже загруженный контент.
- When the user clicks another link on your website (for example, the call to action at the bottom for a more app-like experience), the service worker intercepts the request, takes over the page and loads the PWA shell instead.

Read on to learn why, and how to use this development pattern.

## Improve the user journey by connecting to a PWA

### AMP for initial user acquisition

AMP — идеальное решение для так называемых **оконечных (leaf) страниц**. Это контентные страницы, которые ваши пользователи органически находят с помощью поисковых систем, полученных от друзей ссылок, а также ссылок с других сайтов. Благодаря [специализированному механизму предварительного рендеринга](../../../about/how-amp-works.html) AMP-страницы загружаются невероятно быстро, что выражается в значительном снижении доли отключающихся пользователей (новейшее [исследование DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) показывает, что **более чем 53% всех пользователей отключаются через 3 секунды ожидания**).

### PWA for rich interactivity and engagement

Прогрессивные веб-приложения, с другой стороны, обеспечивают гораздо большую интерактивность и вовлечение, но не имеют *свойств мгновенной первой загрузки*, присущих AMP-страницам. В их основе лежит технология Service Worker, представляющая собой клиентский прокси, который позволяет кешировать все виды ресурсов для ваших страниц, однако Service Worker активируется только *после* первой загрузки.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='The pros and cons of AMP vs. PWA.') }}

## Предзагрузка вашего PWA с помощью `amp-install-serviceworker`

AMP has the ability to install the Service Worker of your Progressive Web App from within an AMP page – yes, even if that AMP page is served from an AMP Cache! If done correctly, a link that leads to your PWA (from one of your AMP pages) will feel almost instant, similar to the first hop to the AMP page.

[tip type="tip"] **СОВЕТ.** Если вы еще не знакомы с Service Worker, рекомендуем [курс Джейка Арчибальда на Udacity](https://www.udacity.com/course/offline-web-applications--ud899). [/tip]

Сначала установите Service Worker на все свои AMP-страницы с помощью [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), прежде всего включив компонент посредством его скрипта в тег `<head>` вашей страницы:

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

Ultimately, in the service worker’s installation step, cache any resources that the PWA will need:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

[tip type="tip"] **СОВЕТ.** Существуют более простые способы работы с Service Worker. Попробуйте [вспомогательные библиотеки Service Worker](https://github.com/GoogleChrome/sw-helpers). [/tip]

## Make all links on an AMP Page navigate to the PWA

Скорее всего, большинство ссылок на ваших AMP-страницах ведут на другие страницы с контентом. Есть две стратегии, позволяющие гарантировать, что последующие щелчки по ссылкам приведут к «модернизации» среды до прогрессивного веб-приложения, — в [зависимости от того, как вы используете AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. If you pair your canonical pages with AMP pages

В этом сценарии у вас есть канонический (не-AMP) сайт и вы создаете AMP-страницы, которые связаны ссылками с каноническими страницами. В настоящее время это наиболее распространенный способ использования AMP, и это означает, что ссылки на ваших AMP-страницах, скорее всего, будут вести на каноническую версию вашего сайта. **Хорошие новости: если ваш канонический сайт — это ваше PWA, ничего делать больше не нужно**.

### 2. If your canonical site is AMP

В этом случае ваши канонические страницы — *это и есть* ваши AMP-страницы: вы создаете весь свой сайт с помощью AMP и просто используете AMP в качестве библиотеки (любопытный факт: сайт, на котором вы читаете этот материал, создан именно таким способом). **В этом случае большинство ссылок на ваших AMP-страницах будут вести на другие AMP-страницы.**

Теперь вы можете развернуть PWA по отдельному пути (например, `your-domain.com/pwa`) и использовать уже запущенный Service Worker для **перехвата навигации браузера при каждом нажатии на ссылку на AMP-странице**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

What’s especially interesting about this technique is that you are now using progressive enhancement to go from AMP to PWA. However, this also means that, as is, browsers that don’t yet support service workers will jump from AMP to AMP and will never actually navigate to the PWA.

AMP решает эту проблему с помощью [подстановки URL оболочки](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). Добавляя в тег [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) шаблон URL для резервного варианта действий, вы даете AMP следующую инструкцию: если поддержка Service Worker не обнаружена, заменять все совпадающие ссылки на данной странице ссылками, ведущими на унаследованные URL оболочки:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

With these attributes in place, all subsequent clicks on an AMP will go to your PWA, regardless of any service worker.

[tip type="read-on"] **ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ.** Вы сделали уже так много — почему бы не использовать существующие AMP-страницы для создания своего PWA? [Подробнее здесь](amp-in-pwa.md). [/tip]
