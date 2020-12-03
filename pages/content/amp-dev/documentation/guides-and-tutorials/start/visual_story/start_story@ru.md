---
"$title": С чего начать историю
"$order": '3'
description: Веб-история представлена в виде компонента amp-story, который служит контейнером для всех входящих в историю страниц. Компонент amp-story также отвечает за...
author: bpaduch
---

Веб-история представлена в виде компонента [`amp-story`](../../../../documentation/components/reference/amp-story.md), который служит контейнером для всех входящих в историю страниц. Компонент [`amp-story`](../../../../documentation/components/reference/amp-story.md) также отвечает за создание оболочки пользовательского интерфейса, включающей обработку жестов и навигацию.

Компонент [`amp-story`](../../../../documentation/components/reference/amp-story.md) — это специальный компонент AMP, поэтому для работы с ним в документ AMP нужно добавить его скрипт.

**Откройте** файл `pets.html` в текстовом редакторе и **добавьте** следующий скрипт в раздел `<head>`:

```html
<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
</head>
```

**Добавьте** элемент `<amp-story>` в `<body>` вашего документа и укажите обязательный атрибут `standalone`:

```html
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

Чтобы мы получили корректно сформированную AMP-историю, элемент `<body>` должен иметь всего один дочерний элемент — компонент [`amp-story`](../../../../documentation/components/reference/amp-story.md); все остальные элементы содержатся внутри [`amp-story`](../../../../documentation/components/reference/amp-story.md).

## Добавление метаинформации

Чтобы истории можно было найти в Интернете, требуется указать определенные метаданные для предоставления миниатюрных деталей истории, например:

- Название истории, представляемое атрибутом `title` (например, «Домашние питомцы»).
- Имя издателя, представляемое атрибутом `publisher` (например, «Уроки по AMP»).
- Логотип издателя, представленный атрибутом `publisher-logo-src` . Это URL-адрес изображения логотипа в квадратном формате с соотношением сторон 1x1.
- Обложка истории, представленная атрибутом `poster-portrait-src`. Это URL-адрес обложки; само изображение должно быть в портретном формате с соотношением сторон 3x4.

Давайте добавим эти атрибуты в наш тег [`amp-story`](../../../../documentation/components/reference/amp-story.md):

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

Помимо этих обязательных атрибутов, вы можете применять другие атрибуты. Дополнительную информацию см. в разделе [атрибуты](../../../../documentation/components/reference/amp-story.md#attributes) в справочной документации [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **ПРИМЕЧАНИЕ.** Эти атрибуты метаданных дополняют, но не заменяют какие-либо структурированные данные (например, JSON-LD) на странице. Чтобы ваши веб-истории обнаруживались на всех платформах, вы должны добавить [структурированные данные](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) на все свои AMP-страницы, включая AMP-истории. [/tip]

На данный момент у нас есть оболочка истории без какого-либо контента. Давайте создадим его.
