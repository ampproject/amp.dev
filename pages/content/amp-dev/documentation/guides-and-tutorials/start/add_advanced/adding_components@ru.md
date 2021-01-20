---
"$title": Добавление расширенных компонентов AMP
"$order": '2'
description: '"Система компонентов AMP позволяет быстро и с минимальными усилиями встраивать в статьи эффективные и отзывчивые функции. Библиотека AMP HTML классифицирует компоненты AMP по трем видам: ..."'
---

Система компонентов AMP позволяет быстро и с минимальными усилиями встраивать в статьи эффективные и отзывчивые функции. Библиотека AMP HTML классифицирует компоненты AMP по трем видам:

- **встроенные**: это компоненты, которые включены в базовую библиотеку JavaScript AMP (указываемую в `<head>`), например [`amp-img`](../../../../documentation/components/reference/amp-img.md) и [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Эти компоненты можно сразу же использовать в документе AMP.

- **расширенные**: это расширения базовой библиотеки, которые должны быть явно включены в документ как специальные элементы. Для специальных элементов требуются определенные скрипты, которые добавляются в раздел `<head>` (например, `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **экспериментальные**: это компоненты, которые выпущены, но еще не готовы к широкому использованию. Разработчики могут начать пользоваться этими функциями до того, как они будут выпущены официально. Дополнительные сведения см. в разделе [Экспериментальные функции](../../../../documentation/guides-and-tutorials/learn/experimental.md).

В нашем примере уже используется встроенный компонент [`amp-img`](../../../../documentation/components/reference/amp-img.md), и мы разобрали, как этот компонент связан с системой макетов AMP в уроке [Преобразование HTML в AMP](../../../../documentation/guides-and-tutorials/start/converting/index.md). Теперь давайте добавим в нашу новостную статью несколько часто применяемых **расширенных** AMP-компонентов.

## Монетизация с помощью рекламы

AMP-реклама создается с помощью компонента [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Компонент [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) позволяет настраивать свойства рекламы различными способами, например, указывая ширину, высоту и режим макета. Однако многие рекламные платформы требуют дополнительной настройки, такой как указание идентификатора учетной записи в рекламной сети, идентификатор рекламного объявления, или параметры таргетинга рекламы. Эти параметры легко указать в компоненте [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) с помощью атрибутов HTML.

Взгляните на образец рекламы из **DoubleClick** :

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

Как видите, это очень простая конфигурация. Обратите внимание на атрибут `type`, который сообщает компоненту [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) о том, какую рекламную платформу мы хотим использовать. В данном случае мы хотим использовать платформу [DoubleClick](https://github.com/ampproject/amphtml/blob/master/ads/google/doubleclick.md), поэтому в качестве значения мы указали `doubleclick`.

Атрибут `data-slot` более уникален. В [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) любые атрибуты, начинающиеся с `data-`, являются индивидуальными атрибутами поставщика. Это означает, что не всем поставщикам требуется этот конкретный атрибут, и не все будут реагировать на него. Например, сравните приведенный выше пример **DoubleClick** со следующей тестовой рекламой с платформы [A9](https://github.com/ampproject/amphtml/blob/master/ads/a9.md):

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

Попробуйте **добавить** оба приведенных выше примера в свою статью сразу после `<header>`.

Помните, что не все компоненты включены в JavaScript-файл главной библиотеки AMP. Нам придется добавить дополнительный запрос JavaScript для компонента рекламы.

**Добавьте** в тег `<head>` следующий скрипт:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

**Обновите** страницу, и вы увидите два тестовых рекламных объявления:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"] **ВАЖНО!** В вашей консоли разработчика могут отображаться ошибки, например, `Mixed Content` или `XMLHttpRequest cannot load`. Первая ошибка, вероятно, относится к рекламе A9, поскольку не весь загружаемый ей контент является безопасным. Безопасность контента является одним из основных требований для всей рекламы на платформе AMP. [/tip]

Два представленных ниже элемента [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) демонстрируют гибкость [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) в вопросе поддержки функций рекламных платформ. В нашем случае мы настроили (с помощью панели управления DoubleClick) два тестовых объявления DoubleClick для показа только в определенных странах — первое будет отображаться только в Великобритании, а второе — только в США. Попробуйте **добавить** обе конфигурации рекламы с геотаргетингом в документ AMP под объявлениями, которые вы добавили ранее:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Обновите** страницу и посмотрите, что получилось. Следующий скриншот сделан из Канады, поэтому ни одно объявление не загружается:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"] **ПРИМЕЧАНИЕ.** Вы могли заметить, что внутри тегов [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) есть дополнительные теги `div` с атрибутом `fallback`. Что обозначает атрибут `fallback`? Он дает системе загрузки AMP инструкцию показывать содержимое этого элемента только тогда, когда родительский элемент не удается загрузить. Дополнительные сведения см. в разделе [Заполнители и резервные элементы](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

[tip type="read-on"] **ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ.** Чтобы ознакомиться с актуальным списком поддерживаемых рекламных сетей, прочтите справочную документацию по компоненту [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). [/tip]

[tip type="note"] **ПРИМЕЧАНИЕ.** В документе AMP не разрешается запускать JavaScript, предоставляемый рекламной сетью. Вместо этого среда выполнения AMP загружает iframe из другого источника (через изолированную программную среду iframe) в качестве документа AMP и выполняет JavaScript-код рекламной сети внутри изолированной программной среды iframe. [/tip]

Теперь наш AMP-документ включает текст, изображение и встроенную рекламу, — ключевые ингредиенты, позволяющие рассказать историю и монетизировать ваш контент. Однако помимо изображений и текста современные сайты часто обладают дополнительной функциональностью.

Давайте сделаем наш AMP-документ более продвинутым, добавив в него встраивание контента, который обычно встречается в новостных статьях, например, такого как:

- Видео с YouTube
- Твиты
- Цитаты из статей

## Встраивание видео с YouTube

Попробуем встроить в документ видео с YouTube. **Добавьте** в свой AMP-документ следующий код сразу после `<header>` (над только что добавленными [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Обновите** страницу. Вместо видео вы увидите текст *«The video could not be loaded».*

Даже если ваш браузер может без проблем показывать видео с YouTube, вы все равно будете получать эту ошибку. Почему это происходит? На самом деле проблема не в сбое загрузки видео — проблема в сбое самого компонента.

Помните, что не все компоненты включены в JavaScript-файл главной библиотеки AMP. Нам нужно включить дополнительный JavaScript -запрос для подключения компонента YouTube.

[tip type="note"] **ПРИМЕЧАНИЕ.**  Если ваша консоль разработчика все еще открыта и в вашем URL есть строка `#development=1`, на этом этапе вы увидите ошибку AMP-валидатора, которая предложит добавить JavaScript-код [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) и отобразит ссылку на документацию, где сообщается, какой тег `script` нужно добавить. [/tip]

**Добавьте** в тег `<head>` следующий скрипт:

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**Обновите** страницу, и вы должны увидеть видео с YouTube:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

Как и в случае с другими элементами на странице, мы указали ширину (`width`) и высоту (`height`) видео, чтобы система макетов AMP могла рассчитать соотношение сторон. Кроме того, мы устанавливаем атрибуту `layout` значение `responsive`, поэтому видео заполняет ширину родительского элемента.

Чтобы узнать больше о встраивании видео с YouTube, прочтите документацию по компоненту [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md). Чтобы узнать больше о компонентах видео и мультимедиа, ознакомьтесь со [списком мультимедийных компонентов AMP](../../../../documentation/components/index.html#media).

[tip type="tip"] **СОВЕТ.** Используйте атрибут [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks), чтобы информировать пользователей в тех случаях, когда компонент не загружается или если компонент не поддерживается браузером. [/tip]

## Встраивание твита

Встраивание предварительно отформатированных твитов из Twitter часто используется в новостных статьях. Компонент [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) позволяет легко обеспечить эту функциональность.

Начните с добавления следующего JavaScript-запроса в `<head>` вашего документа:

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

Теперь **добавьте** в свою статью следующий код для встраивания твита:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

Атрибут `data-tweetid` — это еще один пример специального атрибута, используемого только конкретной платформой. В данном сценарии Twitter сопоставляет значение атрибута `data-tweetid` с определенным твитом.

**Обновите** страницу и взгляните на нее. Вы должны увидеть твит:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

Чтобы узнать больше о встраивании твитов с Twitter, прочтите документацию по компоненту [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

[tip type="tip"] **СОВЕТ.** AMP предоставляет дополнительные компоненты для встраивания контента из социальных сетей. Ознакомьтесь с новейшими [AMP-компонентами для работы с социальными сетями](../../../../documentation/components/index.html#social). [/tip]

## Выделение цитаты из статьи

Одной из распространенных особенностей новостных статей является выделение интересных фрагментов текста статьи. Например, цитата из определенного источника или важный факт может дублироваться более крупным шрифтом, чтобы привлечь внимание читателя.

Однако фрагменты текста различаются по длине, что может затруднить выбор оптимального соотношения размера шрифта и площади, которую цитата займет на странице.

Специально для подобных ситуаций AMP предлагает еще один компонент, — [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md). Компонент [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) позволяет определить элемент с фиксированной шириной и высотой, а также указать максимальный размер шрифта. Компонент самостоятельно вычисляет допустимый размер шрифта, чтобы **уместить** текст в рамках доступной ширины и высоты.

Давайте попробуем его в деле. Сначала **добавьте** библиотеку компонента в тег `<head>`:

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

Добавьте в свою страницу следующий код:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Обновите** страницу и посмотрите на результат.

Поэкспериментируйте дальше. Что произойдет, если цитата будет намного короче?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Или длиннее?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

В качестве последнего эксперимента с [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) попробуйте создать короткий фрагмент текста, например «Hello», с несоразмерно большой высотой (например, 400), а атрибуту max-font-size установите значение 42. Как будет выглядеть полученная страница? Будет ли текст центрирован по вертикали или высота тега [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) уменьшится до максимального размера шрифта? Прежде чем экспериментировать с кодом, попробуйте ответить на этот вопрос, основываясь на уже имеющемся у вас понимании системы макетов AMP.

Больше об [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) вы можете узнать из [живой демонстрации AMP by Example](../../../../documentation/examples/documentation/amp-fit-text.html).
