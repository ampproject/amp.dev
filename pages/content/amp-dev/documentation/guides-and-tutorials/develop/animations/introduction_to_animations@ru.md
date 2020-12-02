---
"$title": Введение в сложные анимации
"$order": '2'
description: "AMP предлагает несколько компонентов, предназначенных специально для анимации, — это позволяет использовать анимацию, которая не может управляться добавлением и удалением классов. В работе с анимацией эти компоненты применяют принципы AMP:..."
formats:
- websites
- ads
author: CrystalOnScript
---

AMP предлагает несколько компонентов, предназначенных специально для анимации, — это позволяет использовать анимацию, которая не может управляться [добавлением и удалением классов](triggering_css_animations.md). В работе с анимацией эти компоненты применяют принципы AMP: они быстрые, эффективные и с фокусом на пользователя. AMP ограничивает разрешенные свойства CSS внутри ключевых кадров, но предоставляет такие преимущества, как детальное управление, плавная (бесшовная) анимация и кросс-браузерная совместимость, без дополнительных действий.

Используйте компонент amp-animation, если вам нужен жесткий контроль над воспроизведением, а также точная синхронизация нескольких анимируемых элементов.

## Создание базовой AMP-анимации

Компонент [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) позволяет использовать [API веб-анимации](https://www.w3.org/TR/web-animations/) в AMP.

Базовый [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) — это объект JSON, состоящий из следующих ключевых частей:

- Элемент, который анимируется компонентом, или `selector`.
- [Свойства воспроизведения](../../../../documentation/components/reference/amp-animation.md#timing-properties)
- [Ключевые кадры](../../../../documentation/components/reference/amp-animation.md#keyframes)
- [Триггер](../../../../documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Selector

Подобно CSS, компонент [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) связывает свойства анимации с элементом, объявляя имя тега, класс или идентификатор элемента в поле `"selector"`. Компонент анимирует все элементы с объявленным типом тега или именем класса. Если важно анимировать только один элемент, используйте атрибут id.

### Cвойства воспроизведения

[Свойства воспроизведения](../../../../documentation/components/reference/amp-animation.md#timing-properties) определяют, сколько времени длится анимация, сколько раз она воспроизводится и в каком направлении выполняются ключевые кадры.

Эти свойства не являются обязательными, но анимация может не работать при отсутствии свойств, относящихся к продолжительности и режиму отображения, таких как `duration` и `fill`.

### <a>Ключевые кадры</a>

Хотя CSS позволяет переходить из одного состояния в другое с помощью переходов, для реализации [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) вы должны объявить свойства анимации как ключевые кадры (аналогично [CSS-анимации](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)). Чтобы обеспечить плавное воспроизведение и совместимость с различными браузерами, [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) позволяет использовать в ключевых кадрах только [ограниченный набор свойств](../../../../documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) — а именно, свойств, которые задействуют аппаратное ускорение графического процессора, не вызывают обновление макета и могут анимироваться в [потоке композитора](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). Это предотвращает возникновение конфликтов анимации с AMP и [процессом рендеринга](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) браузера.

[tip type="note"] Ключевые кадры либо определяются непосредственно в [`amp-animation`](../../../../documentation/components/reference/amp-animation.md), либо извлекаются из [`<amp style-keyframe>`](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#keyframes-stylesheet) посредством ссылок — при условии, что они соблюдают ограничения, установленные для свойств. Подробнее [о ключевых кадрах в компоненте `amp-animation` читайте здесь](../../../../documentation/components/reference/amp-animation.md#keyframes). [/tip]

### <a>Триггер</a>

Триггер запускает анимацию. Расширение [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) запускается либо когда элемент `<body>` становится видимым на странице, либо при подключении его к [действию или событию AMP](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).

Запуск при отображении элемента `<body>` полезен, если вы хотите запускать анимацию сразу же после загрузки страницы (если анимация располагается в изначально видимой области страницы). Чтобы запускать анимации таким образом, добавьте в компонент атрибут `trigger="visibility"`.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Чтобы подключить анимации к действию или событию, назначьте <code>id</code> компоненту <a><code data-md-type="codespan">amp-animation</code></a> и свяжите этот `id` с нужным триггером события — например, с нажатием кнопки.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Создание сложных анимаций

Создание анимации в [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) позволяет осуществлять детальный контроль, выходящий за рамки запуска и остановки анимации: приостанавливать, воспроизводить в обратную сторону и «перескакивать» к определенной точке. Вы можете даже создавать последовательность из нескольких анимаций и анимировать элементы один за другим.

### Подцели

Элементы одного тега или класса могут определять свои свойства воспроизведения, тем самым переопределяя значения переменных, определенных в анимации верхнего уровня.

[example preview="top-frame" playground="true" imports="amp-animation"]
```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [{"transform": "translateX(0px)"}, {"transform": "translateX(50%)"}],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">
   start
  </button>
</body>
```
[/example]

### Последовательности анимаций

Несколько анимаций можно соединять вместе, формируя длинную последовательность. Путем записи анимаций в массив `animations` внутри компонента [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) вы можете создавать согласованные со временем воспроизведения эффекты, такие как эффекты наложения на видео.

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>

```

Данный код воспроизводит каждую анимацию в течение 3 секунд в последовательном порядке.

Для создания больших анимаций расположенные внутри массива `animations` анимации могут ссылаться на другие компоненты [`amp-animation`](../../../../documentation/components/reference/amp-animation.md).

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### Анимация неизвестного количества элементов

Используя [выражения `var()` и `calc()`](../../../../documentation/components/reference/amp-animation.md) вместе с [расширениями CSS](../../../../documentation/components/reference/amp-animation.md#css-extensions), вы можете создавать сложные и синхронизированные анимации, работающие с любым количеством элементов. Это позволяет легко и плавно анимировать динамические и созданные пользователем данные.

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
            {"transform": "translate3d(0px, 0px, 0px)"},
            {"transform": "translate3d(50%, 0px, 100px)"},
            {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
            {"transform": "translate3d(50%, 0px, -100px)"},
            {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex=none role="animation">
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg" layout="fill"></amp-img>
  </div>
</body>
```
[/example]

- Объявляет переменную `--duration` и присваивает ей значение «две секунды».
- Назначает `duration` значение переменной `--duration`.
- Вычисляет задержку, применяемую ко всем элементам, соответствующим стилю `.card` селектора.
    1. Расширение [`length()`](../../../../documentation/components/reference/amp-animation.md#css-length()-extension) вычисляет, сколько элементов `.card` было выбрано
    2. После этого length вычитает <a>index()</a> каждого элемента <code>.card</code>
    3. Полученное значение умножается на `--duration`
    4. Окончательная сумма задается как значение задержки данного элемента в секундах
- Анимация применяется к каждому элементу индивидуально, так что карты перемешиваются одна за другой, а не все одновременно.

Откройте анимацию в песочнице AMP и добавьте дополнительные элементы [`amp-img`](../../../../documentation/components/reference/amp-img), чтобы протестировать это поведение.

### Как обеспечить лучший вид

Для индивидуальной настройки анимаций в них можно включать специальные [`условия`](../../../../documentation/components/reference/amp-animation.md#conditions). Адаптируйте анимацию к любому размеру экрана с помощью [условия `media`](../../../../documentation/components/reference/amp-animation.md#media-query) и поддерживайте обратную совместимость с браузерами, включая [условия `supports`](../../../../documentation/components/reference/amp-animation.md#supports-condition) в оператор [`switch`](../../../../documentation/components/reference/amp-animation.md#animation-switch-statement).

[example preview="top-frame" playground="true"]
```html
<head>
 <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
</head>
<body>
<amp-animation id="mediaAnimation" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "1s",
      "iterations": "4",
      "fill": "both",
      "direction": "alternate",
      "animations": [
        {
          "media": "(min-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(50vw)"
          }
        },
        {
          "media": "(min-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-50vw)"
          }
        }
      ]
    }
  </script>
</amp-animation>
    
  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```
[/example]
