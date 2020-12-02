---
"$title": Use AMP as a data source for your PWA
"$order": '1'
description: "If you've invested in AMP but haven't built a Progressive Web App yet, your AMP Pages can dramatically simplify your development of your Progressive Web App."
formats:
- websites
author: pbakaus
---

Если вы уже пользуетесь AMP, но еще не создали прогрессивное веб-приложение (PWA), ваши AMP-страницы могут значительно упростить его разработку. В этом руководстве вы узнаете, как использовать AMP в прогрессивном веб-приложении и задействовать существующие AMP-страницы в качестве источников данных.

## От JSON к AMP

PWA, в своем наиболее распространенном сценарии применения, — это одностраничное приложение, которое подключается к JSON API по Ajax. JSON API возвращает наборы данных для определения структуры навигации и собственно контент для наполнения статей.

Далее вы преобразуете необработанный контент в пригодный к использованию HTML и визуализируете его на клиенте. Поскольку этот процесс является ресурсоемким и часто сложным в сопровождении, можно пойти другим путем — задействовать в качестве источника контента уже существующие AMP-страницы. И, что особенно важно, AMP позволяет осуществить это всего несколькими строчками кода.

## Включение Shadow AMP в ваше прогрессивное веб-приложение

Первый шаг — включить в ваше прогрессивное веб-приложение специальную версию AMP, которую мы называем Shadow AMP. Да, это не ошибка — вы загружаете библиотеку AMP на странице верхнего уровня, но по факту она не будет контролировать контент верхнего уровня, а будет лишь «улучшать» те части страницы, которые вы выберете.

Добавьте Shadow AMP в шапку своей страницы, например так:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### Как узнать, что API Shadow AMP готов к использованию?

We recommend you load the Shadow AMP library with the `async` attribute in place. That means, however, that you need to use a certain approach to understand when the library is fully loaded and ready to be used.

The right signal to observe is the availability of the global `AMP` variable, and Shadow AMP uses a “[asynchronous function loading approach](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)” to help with that. Consider this code:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP is now available.
});
[/sourcecode]

Этот код будет работать, и обратные вызовы, добавленные таким образом в любом количестве, действительно будут срабатывать после завершения загрузки AMP; но почему?

Если перевести вышеуказанный код на более понятный язык, он дает следующие инструкции:

1. «Если элемента window.AMP не существует, создает на его месте пустой массив»
2. «Вставить в массив функцию обратного вызова, которая должна быть выполнена при готовности AMP»

It works because the Shadow AMP library, upon actual load, will realize there's already an array of callbacks under `window.AMP`, then process the entire queue. If you later execute the same function again, it will still work, as Shadow AMP replaces `window.AMP` with itself and a custom `push` method that simply fires the callback right away.

[tip type="tip"] **TIP –** To make the above code sample practical, we recommend that you wrap it into a Promise, then always use said Promise before working with the AMP API. Look at our [React demo code](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) for an example. [/tip]

## Создание навигации по вашему прогрессивному веб-приложению

Это еще один шаг, который нужно выполнить вручную. В конце концов, именно вам решать, как в вашей концепции навигации будут представлены ссылки на контент (списки, набор карточек или что-то еще).

Обычный сценарий выглядит так: вы загружаете некий JSON-файл, содержащий упорядоченные URL с определенными метаданными. Вы также получаете функцию обратного вызова, которая срабатывает, когда пользователь нажимает на одну из ссылок, и этот обратный вызов должен включать URL-адрес запрошенной AMP-страницы. Если все это уже присутствует, вы готовы к последнему этапу.

## Использование API Shadow AMP для встроенного рендеринга страницы

И наконец, чтобы отобразить контент после действия пользователя, пора загрузить нужный AMP-документ и передать управление Shadow AMP. Для начала создадим функцию загрузки страницы, например:

[sourcecode:javascript]
function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

[tip type="important"] **IMPORTANT –** To simplify the above code example, we skipped over error handling. You should always make sure to catch and handle errors gracefully. [/tip]

Now that we have our ready-to-use `Document` object, it's time to let AMP take over and render it. Get a reference to the DOM element that serves as container for the AMP document, then call `AMP.attachShadowDoc()`, like so:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
  // Let AMP take over and render the page
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] **TIP –** Before you actually hand the document over to AMP, it's the perfect time to remove page elements that make sense when displaying the AMP page standalone, but not in embedded mode: For example, footers and headers. [/tip]

На этом все! Ваша AMP-страница отображается как дочерний элемент вашего прогрессивного веб-приложения.

## Приберите за собой

Скорее всего, в рамках вашего прогрессивного веб-приложения пользователь будет переходить от одной AMP-страницы к другой. При уходе с ранее отрендеренной AMP-страницы обязательно уведомляйте об этом библиотеку AMP; это делается следующим образом:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

Так вы сообщаете AMP, что больше не используете этот документ, что дает возможность высвободить память и ресурсы процессора.

## Просмотр в действии

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

You can see the "AMP in PWA" pattern in action in the [React sample](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) we've built. It demonstrates smooth transitions during navigation and comes with a simple React component that wraps the above steps. It's the best of both worlds – flexible, custom JavaScript in the Progressive Web App, and AMP to drive the content.

- Grab the source code here: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- Use the React component standalone via npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- See it in action here: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (best on your phone or mobile emulation)

You can also see a sample of PWA and AMP using Polymer framework. The sample uses [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) to embed AMP pages.

- Grab the code here: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- See it in action here: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
