---
'$title': Создание первого AMP-письма
$order: 0
description: Создайте свое первое письмо, чтобы узнать, что делает AMP-письма особенными.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

Формат «AMP для писем» позволяет отправителям электронной почты использовать AMP в своих сообщениях электронной почты, обеспечивая поддержку целого ряда новых функций. Электронные письма, созданные с помощью AMP, могут содержать интерактивные элементы (такие как кольцевые галереи изображений или аккордеоны), а также обновлять включенный в сообщение контент; получатели таких писем могут выполнять определенные действия, например отвечать на форму, не покидая своего почтового ящика.

Формат «AMP для писем» совместим с существующими электронными письмами. AMP-версия сообщения встраивается в электронное письмо как новый MIME-блок, дополняющий блоки HTML и plaintext, что обеспечивает совместимость со всеми почтовыми клиентами.

Совет: со списком платформ электронной почты (ESP), клиентов и поставщиков, поддерживающих AMP для писем, можно ознакомиться в разделе [Поддерживаемые платформы электронной почты](../../../support/faq/email-support.md) на странице часто задаваемых вопросов.

Пройдите этот урок, чтобы создать и отправить свое первое динамическое электронное письмо, основанное на технологии AMP. Посмотреть его готовый код можно [здесь](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).

# Начните с шаблонного кода AMP для писем

Песочница AMP поддерживает формат AMP для писем, что позволяет вам разрабатывать, тестировать и проверять свои AMP-письма. Откройте [Песочницу AMP](https://playground.amp.dev/?runtime=amp4email) и убедитесь, что в верхнем левом углу выбран формат `AMP for Email`. Вы должны увидеть следующий код:

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

Он содержит всю необходимую разметку и минимальный объем требуемого кода для корректно сформированного AMP-письма. Также обратите внимание на другие образцы корректно сформированных писем, представленные в раскрывающемся списке в правом верхнем раскрывающемся меню.

Давайте рассмотрим ряд заметных отличий AMP-писем от классических электронных писем в формате HTML:

- AMP-письма должны обозначать свой формат путем включения в тег html строки `⚡4email` или `amp4email`.
- Тег `<head>` также должен содержать `<script>`, загружающий среду выполнения AMP. `<script async src="https://cdn.ampproject.org/v0.js"></script>`
- В AMP-письме должен присутствовать шаблонный код CSS, скрывающий содержимое письма до загрузки AMP. `<style amp4email-boilerplate>body{visibility:hidden}</style>`

Если вы раньше работали с электронной почтой, мысль о размещении скрипта в электронном письме может вызвать у вас тревогу. Не волнуйтесь — провайдеры электронной почты, которые поддерживают AMP-письма, применяют строгие проверки безопасности, которые позволяют запускать на их клиентах только проверенные скрипты AMP. Это позволяет динамическим и интерактивным функциям запускаться непосредственно в почтовых ящиках получателей без каких-либо уязвимостей безопасности. Подробнее о необходимой разметке для AMP-писем можно узнать здесь.

[tip type="important"] В AMP-письма можно включать только скрипты AMP, относящиеся к [совместимым компонентам](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md). [/tip]

# Добавьте изображение

В AMP-письмах можно использовать большинство HTML-тегов, которые используются в электронных письмах, однако некоторые теги, такие как `<img>`, заменяются эквивалентным AMP-тегом [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

Тег `<amp-img>` требует, чтобы ширина и высота изображения были определены, и, в отличие от `<img>`, `<amp-img>` требует наличия закрывающего тега `</amp-img>`.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

Файлы GIF поддерживаются с помощью компонента [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

Поскольку электронные письма не размещаются на вашем сервере, URL-адреса в AMP-письмах должны использовать абсолютные пути, а также протокол HTTPS.

[Placekitten](https://placekitten.com/) — сайт, с которого можно загружать изображения котят в качестве элементов-заполнителей. Вы можете даже выбирать размеры изображения непосредственно через URL!

Чтобы включить изображение в наше первое электронное письмо, добавьте в него приведенный ниже код.

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## Сделайте его адаптивным

Электронные письма просматриваются на разных устройствах и экранах разных размеров, однако благодаря встроенной в AMP системе макетов это не проблема! Компонент [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) и медиа-запросы позволяют с легкостью делать электронные письма адаптивными. Чтобы добавленное нами изображение котенка подстраивалось под размер экрана, добавьте в элемент `<amp-image>` атрибут `layout="responsive"`.

[tip type="read-on"] [Подробнее о том, как AMP работает с макетом и медиа-запросами](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Увеличивайте и уменьшайте окно браузера, чтобы наблюдать за тем, как меняется размер изображения! Список поддерживаемых компонентов для конкретных макетов можно посмотреть [здесь](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Адаптируйте способ отображения и макет

На тот случай, если одного изображения недостаточно, AMP для писем поддерживает такие элементы макета, как аккордеоны и боковые панели.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

В этом уроке мы воспользуемся элементом [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md), чтобы отобразить фотографии кошек, которые ищут хозяев.

Добавьте скрипт `amp-carousel` в элемент head сообщения электронной почты.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

Затем оберните наше первое изображение в теги `<amp-carousel>`.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

Вы могли заметить, что ничего не изменилось, и это хорошо! У нашей кольцевой галереи есть атрибут `type=slides`, что означает, что она будет показывать по одной фотографии за раз. Поскольку мы поместили в теги только одну фотографию, пользователь не увидит стрелок прокрутки галереи.

Заменим изображение котенка внутри элемента `<amp-carousel>` на фотографии наших бездомных кошек.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

Теперь у вас должна быть возможность менять фотографии, нажимая на стрелки навигации с левой и правой сторон кольцевой галереи.

## Будьте стильными

AMP позволяет стилизовать заголовок документа с помощью `<style amp-custom>`. Кроме того, теперь можно использовать ранее запрещенные классы и псевдоклассы CSS. Их [полный список приведен здесь](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Давайте обновим `Hello, AMP4EMAIL world` и сделаем из него настоящее название.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

А затем добавим в head немного стиля.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Добавьте динамические возможности

Обычно в электронных письмах допускается только статический контент. Благодаря AMP для электронных писем открывается совершенно новый мир возможностей! Теперь пользователи могут отвечать на [формы](/content/amp-dev/documentation/components/reference/amp-form.md), [динамически обновлять содержимое списков](/content/amp-dev/documentation/components/reference/amp-list.md) и взаимодействовать с контентом.

В этом уроке мы будем использовать [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) для отображения имени кошки и информации о ней, когда пользователь просматривает слайд с этой кошкой. Начните с включения скрипта `amp-bind` в элемент head сообщения электронной почты.

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

Далее мы объявим переменную amp-bind «myState», представив ее в виде строки JSON внутри тега [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). Поскольку у нас есть четыре фотографии кошек, мы укажем состояние для всех четырех.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[Предусмотренные в AMP действия и события](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) используются для инициирования различных состояний. В нашем случае мы хотим обновлять состояние, когда пользователь нажимает на стрелки навигации по кольцевой галерее. Галерея инициирует событие [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides), при обнаружении которого мы обновим переменную `currentCat` с помощью `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

В данном коде состояние `currentCat` сопоставляется с фотографией кошки по текущему индексу кольцевой галереи. Таким образом, если отображается слайд `event.index=2`, состояние будет сопоставлено с элементом, находящимся по индексу массива 2.

Осталось показать имя нашей кошки и информацию о ней. Добавьте следующий код под закрывающим тегом `amp-carousel`.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

Расширение `amp-bind` использует [выражения](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) и [привязки](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) для динамического изменения контента. В приведенном выше примере код использует привязку `[text]` для обновления текста в теге `<span>` при каждой смене состояния путем вычисления выражения `"myState.cats[currentCat].name"`.

[tip type="note"] Для повышения производительности и во избежание неожиданных «скачков» контента amp-bind не оценивает выражения при загрузке страницы. Это означает, что визуальным элементам должно быть присвоено состояние по умолчанию и они не должны использовать amp-bind для изначального рендеринга. [/tip]

Не забудьте добавить информацию о наших кошках после `</div>`!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Теперь, когда вы перелистываете фото кошек в кольцевой галерее, их имена и информация о них также должны меняться.

# Отправьте AMP-письмо

Чтобы узнать, как отправить письмо на свой почтовый ящик, [ознакомьтесь с дополнительными материалами о тестировании AMP-писем.](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Поздравляем — вы отправили свое первое AMP-письмо!

Следующие шаги можно узнать в нашем руководстве [Основы AMP для писем](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
