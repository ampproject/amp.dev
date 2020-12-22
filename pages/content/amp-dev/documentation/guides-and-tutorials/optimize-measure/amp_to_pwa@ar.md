---
"$title": تحويل موقع AMP الخاص بك إلى تطبيق ويب تقدمي (PWA)
"$order": '10'
description: من خلال تخزين الموارد مؤقتًا داخل المتصفح، يصبح تطبيق الويب التقدمي (PWA) قادرًا على توفير البيانات والأصول والصفحات غير المتصلة بالإنترنت للمستخدم لإبقائهم مشاركين وعلى اطّلاع.
tutorial: 'true'
formats:
- websites
author: crystalonscript
---

تستفيد تطبيقات الويب التقدمية من قوة [عمال الخدمة](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) لتمكين قدرات ثرية في وضع عدم الاتصال وتجارب مستخدم متسقة عبر نقاط قوة مختلفة للشبكة. من خلال تخزين الموارد مؤقتًا داخل المتصفح، يصبح تطبيق الويب التقدمي (PWA) قادرًا على توفير البيانات والأصول والصفحات غير المتصلة بالإنترنت للمستخدم لإبقائهم مشاركين وعلى اطّلاع.

This tutorial will teach you how to turn an AMP site into an installable PWA with offline capabilities by adding a Web Manifest and a Service Worker powered by the AMP Service Worker.

# Download and run the starter code

Download the [starter code here](/static/files/tutorials/amptopwa.zip).

Use a local web server to preview the website.

[tip type="default"] **TIP –** For a quick web server, run `python -m SimpleHTTPServer`. [/tip]

You should be able to view the landing page for Lyrical Lyghtning, the Mobile Music Magic festival. It has one link on the homepage to view the schedule and which stage the bands are on.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Users of our site may have spotty network connectivity at the event when they'll likely want to access the schedule. This makes a great candidate to turn it into a PWA that can be installed to our user's home screen, and provides all critical functionality even when offline.

# Create a Web App Manifest

[بيان تطبيق الويب ](https://developers.google.com/web/fundamentals/web-app-manifest/)هو ملف JSON بسيط يخبر المتصفح عن تطبيق الويب الخاص بك وكيف يجب أن يتصرف عند "التثبيت" على جهاز الجوّال أو سطح المكتب للمستخدم. تتطلب العديد من المتصفحات وجود بيان لعرض [موجّه الإضافة إلى الشاشة الرئيسية](https://developers.google.com/web/fundamentals/app-install-banners/).

Add a file titled `manifest.json` to your repository with the following code:

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

# Add the AMP Service Worker

عامل الخدمة هو برنامج نصي يشغّله متصفحك في الخلفية، بشكل منفصل عن صفحة الويب، والذي يوسّع ميزات المتصفحات من خلال تخزين الطلبات مؤقتًا لتحسين الأداء وتوفير وظائف دون اتصال. يُعد إنشاء عامل خدمة من الصفر أمرًا ممكنًا ولكنه يستغرق وقتًا طويلاً. تساعد المكتبات مثل Workbox، ولكن AMP يخطو خطوة إلى الأمام من خلال تقديم [عامل خدمة AMP](https://github.com/ampproject/amp-sw)، حيث يقوم AMP بأتمتة الكثير من الخطوات مباشرةً، بما في ذلك التخزين المؤقت لنصوص AMP النصية وأصولها ومستنداتها بالإضافة إلى تنفيذ أفضل الممارسات الشائعة مثل [التحميل المُسبق للتنقل](https://developers.google.com/web/updates/2017/02/navigation-preload).

The AMP Service Worker automatically [caches AMP scripts](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) and [documents](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) as user requests them, after installing it. We'll start by adding the basic AMP Service Worker.

## Create the service worker file

Create a file called `sw.js` and add the following code:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

With just two lines of code, this imports the AMP Service Worker into your Service Worker and initializes it.

## Auto-install your service worker on your AMP pages

تستخدم مواقع AMP على الويب المكوِّن [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) لتثبيت عامل الخدمة في خلفية المتصفح، بينما يستمتع المستخدم بمحتواك.

Place the required script tag in the head of `index.html` and the `<amp-install-serviceworker>` element inside the `<body>`:

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

[tip type="important"] **Important –** The service worker should be served from the root directory (`/sw.js`) to be able to cache all the content of your site. [/tip]

The `<amp-install-serviceworker>` installs the service worker by creating an iframe and running the `data-iframe-src` file. Create the `install-sw.html` file and add the following code:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

يسجّل iframe ملف "عامل خدمة AMP" في المتصفح.

# Customize what is cached

The AMP Service Worker comes with built-in benefits while allowing optional fields that you can configure to optimize against your app's needs.

Our music festival app will cache our image assets, prefetch the line up link, and specify an offline page.

## Cache Assets

You can configure the AMP Service Worker to [cache assets](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching), such as images, videos and fonts. We'll use it to cache our background image and the AMP logo. Open the `sw.js` file and update it to the code below:

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

We've specified the caching strategy to be [cache first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). The means the app will try to serve images from cache first before requesting anything from the network. This is especially useful for this app since we won't be updating our background image or the AMP logo.

## Prefetch Links

The AMP Service Worker prefetches links that have the `data-rel=prefetch` attribute. This enables users to view pages offline even if they haven't visited them yet. We'll add the attribute to our link tag for `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Show an offline page

للتعامل مع الحالات غير المتوقعة أو النقرات على روابط لصفحات لم نقم بجلبها مُسبقًا، سنضيف صفحة غير متصلة بالإنترنت لتقديم تجربة مستخدم متسقة تكون "على العلامة التجارية"، بدلاً من عرض الصفحة العامة غير المتصلة بالإنترنت للمتصفح. قم بتنزيل [`offline.html` هنا](/static/files/tutorials/offline.zip) وتحديث `sw.js` إلى الرمز التالي:

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

# Test your PWA

You can test that your AMP Service Worker is caching necessary assets and providing an ideal offline solution through [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

We'll test Lyrical Lyghtning by opening the DevTools panel by hitting `Ctrl + Shift + I` on Windows or `Cmd + Opt + I` on Mac. You can also right click the page and select `inspect` from the menu. Then select `Application` to view your service worker registration.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Click the `offline` box to switch into offline mode. Click the `see full lineup` link and navigate to `offline.html` to check if they were properly cached and prefetched.

[tip type="default"] **Tip –** For a thorough analysis of a Progressive Web App's features, run [Google's Lighhouse tool](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) to generate a report. [/tip]

# Congratulations!

You have successfully created an PWA with AMP! In this tutorial you learned to:

- Create a [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)
- Install a Service Worker in AMP using [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Customize the [AMP Service Worker ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [Prefetch links ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Create an offline page

Read more about [Service Worker](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)s and [offline UX considerations](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Learn to t[rack engagement with analytics ](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html)and follow the tutorial on [how to configure basic analytics for your AMP pages](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
