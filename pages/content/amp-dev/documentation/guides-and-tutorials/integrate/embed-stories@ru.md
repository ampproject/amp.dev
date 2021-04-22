---
'$title': Встраивание историй в веб-страницы
$order: 3
description: Компонент AMP Story Player позволяет встраивать в веб-страницы истории, которые пользователи могут пролистывать касанием или кликом. Следуйте этому пошаговому руководству, чтобы узнать, как это делается.
formats:
  - websites
  - stories
---

Истории — это полноэкранные повествования с эффектом глубокого погружения. Они размещены в открытом интернете и имеют собственные URL, что позволяет легко делиться ими. Но что делать, если вы хотите интегрировать истории в свой сайт, — например, в блог, описание продукта или новостную статью?

Компонент AMP Story Player позволяет встраивать в веб-страницы истории, которые пользователи могут пролистывать касанием или кликом. Следуйте этому пошаговому руководству, чтобы узнать, как это делается.

# Показ историй на не-AMP странице

Вы можете встраивать AMP-истории в традиционные (не-AMP) страницы. Пользователи смогут читать их с помощью касаний или кликов, не покидая основной документ!

[example preview="top-frame" playground="false"]

```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```

[/example]

## Встраивание AMP Story Player

Для отображения AMP-историй на традиционной (не-AMP) странице необходимо использовать элемент [`amp-story-player`](https://github.com/ampproject/amphtml/blob/main/spec/amp-story-player.md).

### Импорт скриптов

Включите в элемент head вашего документа два обязательных скрипта:

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link
  href="https://cdn.ampproject.org/amp-story-player-v0.css"
  rel="stylesheet"
  type="text/css"
/>
```

Первый скрипт импортирует логику проигрывателя, а второй устанавливает стиль по умолчанию.

### Указание истории

Включите элемент `<amp-story-player>` в `body` документа. Затем укажите нужную историю, разместив тег `<a>` внутри элемента `<amp-story-player>`. Укажите в `href` место размещения истории. `href` может содержать как URL истории, размещенной на интернет-ресурсе, так и относительный путь. Поместите название истории в теги `<a>`.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a
    href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
  >
    Stories in AMP - Hello World
  </a>
</amp-story-player>
```

### Размер проигрывателя

Вы можете указать атрибуты `width`, `height` и другие стилистические параметры проигрывателя в виде встроенных стилей, как для любого другого элемента.

```html
<body>
  ...
  <amp-story-player style="width: 360px; height: 600px;">
    ...
  </amp-story-player>
  ...
</body>
```

Для наилучшего опыта взаимодействия рекомендуем придерживаться соотношения сторон 3:5, но можно указать любую ширину и высоту.

#### Респонсивный размер

Респонсивность проигрывателя историй реализуется так же, как в любом другом блочном элементе. Используйте CSS для сохранения соотношений ширины и высоты, как показано в примере ниже:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;"> ... </amp-story-player>
```

### Добавление обложки

Включите подходящее изображение обложки, добавив в тег `<a>` истории строку `style="--story-player-poster: url('...');"`, или с помощью CSS-переменной <code>--story-player-poster</code>. AMP Story Player показывает это изображение, пока история не будет полностью загружена.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes this story.
  </a>
</amp-story-player>
```

Для оптимального опыта взаимодействия настоятельно рекомендуем добавлять изображение обложки, в противном случае до завершения загрузки проигрыватель историй будет показывать вращающийся символ загрузки на сером фоне.

## Встраивание нескольких историй

Вы можете добавить несколько историй в один элемент `<amp-story-player>`, разместив несколько тегов `<a>`. Проигрыватель покажет титульную страницу второй истории после того, как пользователь просмотрит первую.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

Вы можете вставлять сколько угодно экземпляров `<amp-story-player>`. Они отображаются как отдельные проигрыватели.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img
      src="https://www.example.com/assets/cover1.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img
      src="https://www.example.com/assets/cover2.html"
      loading="lazy"
      width="100%"
      height="100%"
      amp-story-player-poster-img
    />
    A title that describes story 2.
  </a>
</amp-story-player>
```

# Показ историй на AMP-cтраницах

Чтобы использовать компонент `<amp-story-player>` на страницах AMP, прочтите документацию [AMP-версии amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories) .
