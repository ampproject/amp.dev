---
$title: amp-animation
$category@: presentation
teaser:
  text: Определяет и отображает анимацию.
---

<!--
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



Определяет и запускает анимацию.

<table>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code><script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/master/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>


## Обзор <a name="overview"></a>

В документах AMP анимация определяется и выполняется с помощью [Web Animations API](https://www.w3.org/TR/web-animations/).

## Формат <a name="format"></a>

Элемент `amp-animation` определяет такую анимацию как структуру JSON.

### Спецификация анимации верхнего уровня <a name="top-level-animation-specification"></a>

Объект верхнего уровня определяет общий процесс анимации, который состоит из произвольного числа ее компонентов, заданных как массив `animations`:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  // Timing properties
  ...
  "animations": [
    {
      // Animation 1
    },
    ...
    {
      // Animation N
    }
  ]
}
</script>
</amp-animation>
```

### Размещение в DOM <a name="placement-in-dom"></a>

`<amp-animation>` разрешено размещать как прямой дочерний элемент для `<body>`, если `trigger="visibility"`. Если `trigger` не указан и воспроизведение анимации контролируется программно через ее действия, ее можно разместить в любом месте DOM.

### Компонент анимации <a name="animation-component"></a>

Каждый компонент анимации является [эффектом ключевых кадров](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect) и состоит из:

– целевых элементов, на которые ссылается селектор;
– условий: запрос медиа и условие supports;
– временные свойства;
– ключевые кадры.

```text
{
  "selector": "#target-id",
  // Conditions
  // Variables
  // Timing properties
  // Subtargets
  ...
  "keyframes": []
}
```

### Условия <a name="conditions"></a>

Условия могут определять, включен ли этот компонент в финальную анимацию.

#### Запрос медиа <a name="media-query"></a>

Запрос медиа может быть задан с помощью свойства `media`. Оно может содержать любое выражение, разрешенное для [Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API, и соответствует правилу CSS `@media`.

Если для компонента анимации указано значение, он включается, только если запрос медиа соответствует текущей среде.

#### Условие supports <a name="supports-condition"></a>

Условие supports может быть определено с помощью свойства `supports`. Оно может содержать любое выражение, разрешенное для [Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) API, и соответствует правилу CSS `@supports`.

Если для компонента анимации указано значение, он включается, только если условие supports соответствует текущей среде.

### Оператор анимации `switch` <a name="animation-switch-statement"></a>

В некоторых случаях удобно объединять несколько [условных анимаций](#conditions) с необязательным значением по умолчанию в одну. Это можно сделать с помощью оператора анимации `switch`:

```
{
  // Optional selector, vars, timing
  ...
  "switch": [
    {
      "media": "(min-width: 320px)",
      "keyframes": {...},
    },
    {
      "supports": "offset-distance: 0",
      "keyframes": {...},
    },
    {
      // Optional default: no conditionals
    }
  ]
}
```

В анимации `switch` варианты оцениваются в заданном порядке. Выполняется первая анимация, которая соответствует [операторам условий](#conditions), а остальные игнорируются.

Например, следующий код запускает анимацию движения, если она поддерживается, и возвращается к свойству transform:
```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```

### Переменные <a name="variables"></a>

Компонент анимации может декларировать переменные CSS, которые будут использоваться для определения временных рамок и ключевых кадров, с помощью выражений `var()`. Выражения `var()` оцениваются по текущему целевому контексту. Переменные CSS, указанные в компонентах анимации, применяются к вложенным анимациям, целям анимации и, таким образом, переопределяют переменные CSS, используемые в конечных анимациях.

Пример:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "--delay": "0.5s",
  "--x": "100px",
  "animations": [
    {
      "selector": "#target1",
      "delay": "var(--delay)",
      "--x": "150px",
      "keyframes": {"transform": "translate(var(--x), var(--y, 0px)"}
    },
    ...
  ]
}
</script>
</amp-animation>
```

В этом примере

 `--delay` добавляется во вложенные анимации и применяется как задержка анимации `#target1`,
`--x` добавляется во вложенные анимации, но переопределяется анимацией `#target1` и позже используется для свойства `transform`,
а `--y` не указывается в `<amp-animation>` и поэтому запрашивается у элемента `#target1`. По умолчанию компонент имеет значение `0px`, если он не определен и в CSS.

Более подробная информация`` приведена в [разделе о выражениях `var()` и `calc()`](#var-and-calc-expressions).

###Свойства времени <a name="timing-properties"></a>

Анимация верхнего уровня и ее компоненты могут содержать свойства времени. Подробные сведения о них можно найти в разделе [AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties) спецификации по веб-анимации. В таблице ниже перечислены допустимые свойства.

<table>
  <tr>
    <th class="col-twenty">Свойство</th>
    <th class="col-twenty">Тип</th>
    <th class="col-twenty">По умолчанию</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>значение времени</td>
    <td>0</td>
    <td>Продолжительность анимации. Число в миллисекундах или значение времени CSS, например "2s".</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>значение времени</td>
    <td>0</td>
    <td>Задержка перед началом анимации. Число в миллисекундах или значение времени CSS, например "2s".</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>значение времени</td>
    <td>0</td>
    <td>Время между завершением анимации и моментом, как она считается завершенной. Число в миллисекундах или значение времени CSS, например "2s".</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>число,<br>или Infinity ("бесконечность"),<br>или 1 infinite</td>
    <td>1</td>
    <td>Количество повторений анимационного эффекта.</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>number/CSS</td>
    <td>0</td>
    <td>Смещение времени начала анимации.</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>строка</td>
    <td>linear ("линейно")</td>
    <td><a href="https://www.w3.org/TR/web-animations/#timing-function">Функция времени</a>, используемая для настройки динамики.</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>строка</td>
    <td>normal ("обычная") </td>
    <td>normal ("обычная"), reverse ("обратная"), alternate ("переменная") или alternate-reverse ("обратная переменная").</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>строка</td>
    <td>none ("нет")</td>
    <td>none ("нет"), forwards ("вперед"), backwards ("назад"), both ("вперед и назад") или auto ("автоматически").</td>
  </tr>
</table>

Для любого свойства времени допускается использовать числовые и строковые значения или значения CSS. Например, продолжительность (duration) можно задать как `1000`, `1s` или `1000ms`. Кроме того, разрешены `calc()`, `var()` и другие выражения CSS.

Пример свойств времени в JSON:
```text
{
  ...
  "duration": "1s",
  "delay": 100,
  "endDelay": "var(--end-delay, 10ms)",
  "easing": "ease-in",
  "fill": "both"
  ...
}
```

Компоненты анимации наследуют свойства времени, настроенные для анимации верхнего уровня.

### Subtargets <a name="subtargets"></a>

Везде, где можно указать `selector`, также доступен элемент `subtargets: []`. Он может переопределять свойства времени или переменные, определенные в анимации, для определенных подзадач, указанных в виде индекса или селектора CSS.

Пример:
```text
{
  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

В этом примере по умолчанию для всех целей, соответствующих .target, задана задержка 100 миллисекунд и значение 100 пикселей для --y. Однако задержка для первой цели (`index: 0`) переопределяется и становится равна 200 миллисекунд, а для лишних целей устанавливается значение 200 пикселей для --y.

Обратите внимание, что несколько элементов subtargets могут соответствовать одному элементу target.

### Ключевые кадры <a name="keyframes"></a>

Ключевые кадры можно указывать различными способами, описанными в [соответствующем разделе](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) спецификации по веб-анимации, или как строку, ссылающуюся на имя `@keyframes` в CSS.

Ниже приведены типичные примеры определения ключевых кадров.

В кратком объектном формате с указанием конечного значения задается итоговое состояние 100 %:
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

В кратком объектном формате с указанием начального и конечного значений задаются начальное и итоговое состояния 0 % и 100 %:

```text
{
  "keyframes": {
    "opacity": [1, 0],
  "transform": ["scale(1)", "scale(2)"]
}
}
```

В кратком объектном формате с указанием массива значений задается несколько значений для начального и итогового состояний, а также несколько смещений (с равными интервалами):
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
  "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
}
}
```

В форме массива определяются ключевые кадры. Смещения на 0 и 100 % назначаются автоматически и разделяются одинаковыми интервалами:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Форма массива также может включать смещение в явном виде:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

В форме массива может задаваться динамика:
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Другие форматы для ключевых кадров описаны в [спецификации по веб-анимации](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument).

Свойства могут принимать любые допустимые значения CSS, включая `calc()`, `var()` и другие выражения.

#### Ключевые кадры из CSS <a name="keyframes-from-css"></a>

Другой способ указать ключевые кадры – в таблице стилей документа (тег `<style>`) в виде правила CSS `@keyframes`. Пример:
```html
<style amp-custom>
  @keyframes keyframes1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<amp-animation layout="nodisplay">
<script type="application/json">
{
  "duration": "1s",
  "keyframes": "keyframes1"
}
</script>
</amp-animation>
```

Метод с `@keyframes` CSS по большей части сопоставим с встраиванием определения ключевых кадров JSON (см. [спецификацию по веб-анимации](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)). Однако есть некоторые особенности.

– Чтобы обеспечить поддержку широкого ряда платформ, могут потребоваться префиксы поставщиков, например `@-ms-keyframes {}` или `-moz-transform`. Префиксы поставщиков не нужны и не разрешены в формате JSON, но в CSS они могут быть необходимы.
– Для платформ, которые не поддерживают выражения `calc()` и `var()`, нельзя использовать полифилы `amp-animation`, если ключевые кадры указаны в CSS. Поэтому рекомендуется всегда задавать в CSS резервные значения.
– В CSS нельзя использовать расширения, такие как [`width()`, `height()`, `num()`, `rand()`, `index()` и `length()`](#css-extensions).

#### Допустимые свойства для ключевых кадров <a name="allow-listed-properties-for-keyframes"></a>

В ключевых кадрах можно использовать не все свойства CSS, а только такие, для которых современные браузеры способны быстро выполнять оптимизацию и анимацию. Список допустимых свойств, отвечающих требованиям к эффективности, растет. В настоящее время в него включены:
– [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity);
– [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform);
– [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility);
– [`offset-distance`](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance).

Обратите внимание, что использовать свойства CSS с префиксом поставщика нет необходимости, и они не поддерживаются.

### Сокращенные формы конфигурации анимации <a name="abbreviated-forms-of-animation-configuration"></a>

Если анимация включает только один элемент и достаточно одного ключевого кадра, конфигурацию можно сократить только до этого компонента. Пример:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "selector": "#target-id",
  "duration": "1s",
  "keyframes": {"opacity": 1}
}
</script>
</amp-animation>
```

Если анимация состоит из ряда компонентов, но не включает верхний уровень, она может быть сокращена до массива компонентов. Пример:

```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": 1000,
    "keyframes": {"opacity": 1}
  },
  {
    "selector": ".target-class",
    "duration": 600,
    "delay": 400,
    "keyframes": {"transform": "scale(2)"}
  }
]
</script>
</amp-animation>
```

### Композиция анимаций <a name="animation-composition"></a>

Анимации могут ссылаться друг на друга, таким образом объединяя несколько деклараций `amp-animation` в одну финальную анимацию. Этот метод в целом аналогичен встраиванию. Разделять анимации на разные элементы целесообразно, чтобы повторно использовать одну и ту же анимацию в другом месте или просто сделать каждую из них компактнее и легче в управлении.

Пример:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>

```

В этом примере анимация anim2 выступает частью anim1, а anim2 включена без цели (`selector`). В таком случае включенная анимация должна ссылаться на свою собственную цель.

Другая форма позволяет указать во включенной анимации одну или несколько целей. Включенная анимация при этом выполняется для каждой подходящей цели. Пример:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

Здесь anim2 выполняется для каждой подходящей цели независимо от того, какому количеству элементов соответствует .target-class – одному, нескольким или ни одному.

Переменные и свойства времени, указанные в анимации вызова, также передаются во включенную анимацию.

### Выражения `var()` и `calc()` <a name="var-and-calc-expressions"></a>

`amp-animation` позволяет использовать выражения `var()` и `calc()` для значений времени и ключевых кадров.

Пример:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay)",
    "--y": "var(--other-y, 100px)",
    "keyframes": {"transform": "translate(calc(100vh + 20px), var(--y))"}
  }
]
</script>
</amp-animation>
```

И `var()`, и `calc()` применяются на платформах, где их поддержка изначально не предусмотрена. Свойства `var()` извлекаются из соответствующих целевых элементов. А свойство `var()`, к сожалению, использовать в качестве полифила нельзя. Поэтому если важна совместимость, настоятельно рекомендуется включать в выражения `var()` значения по умолчанию. Пример:
```html
  <amp-animation layout="nodisplay">
  <script type="application/json">
  [
    {
      "selector": ".target-class",
      "duration": "4s",
      "delay": "var(--delay, 100ms)",
    }
  ]
  </script>
  </amp-animation>
```

В компонентах анимации могут указываться собственные переменные в полях `--var-name`. Эти переменные добавляются во вложенные анимации и переопределяют переменные целевых элементов, указанных в таблице стилей (тег `<style>`). Выражения `var()` сначала пытаются обработать значения переменных, указанные в анимациях, а затем запрашивают целевые стили.

### Расширения CSS <a name="css-extensions"></a>

Компонент `amp-animation` предоставляет несколько расширений CSS для типичных задач, связанных с анимацией: `rand()`, `num()`, `width()` и `height()`. Эти функции могут использоваться везде, где `amp-animation` поддерживает значения CSS, в т. ч. со значениями времени и ключевых кадров.

#### Расширение CSS `index()` <a name="css-index-extension"></a>

Функция `index()` возвращает индекс текущего элемента цели (target) в эффекте анимации. Это наиболее актуально, когда к нескольким целям применяется один и тот же эффект анимации с помощью свойства `selector`. Первая цель, соответствующая селектору, будет иметь индекс `0`, вторая – `1` и т. д.

Помимо других возможностей, это свойство можно комбинировать с выражениями `calc()` и использовать для создания эффекта стаи птиц (staggering). Пример:
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
  }
```

#### Расширение CSS `length()` <a name="css-length-extension"></a>

Функция `length()` возвращает количество элементов цели в эффекте анимации. Актуально в сочетании с `index()`:

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### Расширение CSS `rand()` <a name="css-rand-extension"></a>

Функция `rand()` возвращает случайное значение CSS. У нее есть две формы.

Форма без аргументов просто возвращает случайное число от 0 до 1.
```
{
  "delay": "calc(10s * rand())"
  }
```

Во второй форме для функции задаются два аргумента, и она возвращает случайное значение между ними.
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### Расширения CSS `width()` и `height()` <a name="css-width-and-height-extensions"></a>

Расширения `width()` и `height()` возвращают ширину и высоту анимированного или заданного селектором элемента. Значение возвращается в пикселях, например `100px`.

Поддерживаются следующие формы:
– `width()` и `height()` (ширина и высота анимированного элемента).

– `width('.selector')` и `height('.selector')` (ширина и высота элемента, заданного селектором). Подходит любой селектор CSS, например `width('#container &gt; li')`.

– `width(closest('.selector'))` и `height(closest('.selector'))` (ширина и высота элемента, заданного ближайшим селектором).

Расширения `width()` и `height()` особенно полезны при трансформациях. `left`, `top` и подобные им свойства CSS, которые могут использовать значения `%` для выражения размера анимации пропорционально размеру контейнера. Однако свойство `transform` интерпретирует значения `%` по-другому – как процент от выбранного элемента. Таким образом, `width()` и `height()` могут использоваться для выражения трансформации относительно элементов контейнера и т. п.

Эти функции можно комбинировать с `calc()`, `var()` и другими выражениями CSS. Пример:
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### Расширение CSS `num()` <a name="css-num-extension"></a>

Функция `num()` возвращает значение CSS в числовой форме. Пример:

– `num(11px)` возвращает `11`;
– `num(110ms)` возвращает `110` и т. д.

Например, следующее выражение рассчитывает задержку в секундах, пропорциональную ширине элемента:
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### Анимация SVG <a name="svg-animations"></a>

SVG – отличный инструмент, и мы очень рекомендуем использовать его для анимаций.

Для работы анимации SVG нужны те же свойства CSS, которые [разрешены для ключевых кадров](#allow-listed-properties-for-keyframes), с некоторыми особенностями:

* Элементы SVG для браузеров Internet Explorer и Edge [не поддерживают свойства CSS `transform`](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/). Анимация `transform` сама является полифилом. Однако первоначальное состояние, определенное в таблице стилей, не применяется. Если оно имеет значение для этих браузеров, рекомендуется дублировать его через [атрибут SVG `transform`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform).
* В то время как свойство CSS `transform` является полифилом для Internet Explorer и Edge, задействовать в качестве полифила `transform-origin` невозможно. Таким образом, если требуется совместимость с Internet Explorer или Edge, рекомендуется использовать по умолчанию только `transform-origin`.
* В большинстве браузеров в настоящее время возникают проблемы с интерпретацией свойства CSS `transform-origin` (подробнее: [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300), [Safari](https://bugs.webkit.org/show_bug.cgi?id=174285), [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340)). Большая часть подобных проблем обычно устраняется после реализации [свойства CSS `transform-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box). В ситуации, когда имеет значение свойство `transform-origin`, рекомендуется также включить нужный файл CSS `transform-box` для обеспечения совместимости в будущем.

## Запуск анимации <a name="triggering-animation"></a>

Анимация может быть инициирована с помощью атрибута `trigger` или действия `on`.

### Атрибут `trigger` <a name="trigger-attribute"></a>

В настоящее время `visibility` – единственное возможное значение атрибута `trigger`. ``Оно срабатывает, когда виден текущий документ или встроенный элемент (в области просмотра).

Пример:
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

### Запуск с помощью действия `on` <a name="triggering-via-on-action"></a>

Пример:

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## Действия `on` <a name="on-actions"></a>

Элемент `amp-animation` экспортирует следующие действия:

* `start`. Запускает анимацию, если она ещё не запущена. Свойства и переменные времени могут быть указаны в качестве аргументов действия, например `anim1.start(delay=-100, --scale=2)`.
* `restart`. Запускает анимацию или перезапускает уже запущенную. Свойства и переменные времени могут быть указаны в качестве аргументов действия, например `anim1.start(delay=-100, --scale=2)`.
* `pause`. Приостанавливает запущенную анимацию.
* `resume`. Запускает приостановленную анимацию.
* `togglePause`. Приостанавливает и снова запускает анимацию.
* `seekTo`. Приостанавливает анимацию и переходит к временной отметке, указанной аргументом `time` в миллисекундах или аргументом `percent` в виде процентной точки на шкале времени.
* `reverse`. Запускает анимацию в обратном порядке.
* `finish`. Завершает анимацию.
* `cancel`. Отменяет воспроизведение анимации.
