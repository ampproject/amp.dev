---
'$title': Запуск анимации и переходов CSS
$order: 1
description: Запуск CSS-анимации на страницах зависит от добавления и удаления классов, выполняемых с помощью JavaScript. Вы можете добиться того же поведения на AMP-страницах, используя действие toggleClass...
formats:
  - websites
  - ads
---

CSS-анимация позволяет веб-элементам переходить от одной конфигурации стиля CSS к другой. Браузер может запускать определенные анимации при загрузке, но запускаемые событиями CSS-анимации [зависят от добавления и удаления классов](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP поддерживает оба типа анимации.

Используйте CSS, когда у вас есть небольшая циклическая анимация, которая не требует точной синхронизации по времени.

## Добавление CSS и ключевых кадров

Размещать код CSS в AMP-ресурсах можно следующими способами:

[filter formats="websites, stories"]

- В теге `<style amp-custom>`, расположенном внутри элемента head. Ограничение в 75 000 байт.
- В виде встроенных стилей. Каждый экземпляр встроенного стиля имеет ограничение в 1000 байт. Встроенные стили засчитываются в ограничение `<style amp-custom>` в 75 000 байт.
- В теге `<style amp-keyframes>`, расположенном внутри элемента head. Ограничение в 500 000 байт. Может содержать только свойства ключевых кадров.

[/filter]

[filter formats="ads"]

- В теге `<style amp-custom>`, расположенном внутри элемента head. Ограничение в 20 000 байт.
- В виде встроенных стилей. Каждый экземпляр встроенного стиля имеет ограничение в 1000 байт. Встроенные стили засчитываются в ограничение `<style amp-custom>` в 20 000 байт.
- В теге `<style amp-keyframes>`, расположенном внутри элемента head. Ограничение в 500 000 байт. Может содержать только свойства ключевых кадров.

[/filter]

[tip type="read-on"] Подробнее об использовании CSS в AMP-ресурсах читайте в статье [Стиль и компоновка](../style_and_layout/index.md). [/tip]

[filter formats="websites, stories"] Чтобы ваши страницы были простыми и быстрыми, AMP установил ограничение на CSS в составе тега `<amp style-custom>` в размере 75 000 байт. Хотя вы можете использовать этот тег для определения стилей анимации, ограничение в 500 000 байт внутри тега `<amp style-keyframes>` позволяет создавать более подробные анимации, которые не отнимут драгоценные ресурсы у стиля сайта. [/filter]

[filter formats="ads"] Чтобы ваша реклама оставалась легковесной и быстрой, AMP устанавливает ограничение на объем CSS в составе тега `<amp style-custom>` в размере 20 000 байт. Несмотря на то что вы можете использовать этот тег для добавления стилей анимации, рекомендуем использовать для этого тег `<amp style-keyframes>`, имеющий ограничение в 500 000 байт, — это позволит создавать более подробные анимации, которые не отнимут драгоценные ресурсы у стиля сайта. [/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## Добавление и удаление классов

Действие AMP `toggleClass` позволяет добавлять к определенным элементам классы или удалять их.

```js
elementName.toggleClass(class="className")
```

Вы можете переключать класс в том же элементе, с которым взаимодействует пользователь, например с анимированным меню гамбургеров.

```html
<div
  id="hamburger"
  tabindex="1"
  role="button"
  on="tap:hamburger.toggleClass(class='close')"
></div>
```

Действие `toggleClass` можно применять и к другим элементам, а также использовать для переключения между двумя классами, добавляя в него атрибут `force`.

```html
<button
  on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)"
>
  Disappear
</button>
<button
  on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)"
>
  Reappear
</button>
```

Если вам нужно удалить класс и запретить его повторное добавление, добавьте атрибут `force` со значением `false`. Если вам нужно добавить класс и запретить удаление, добавьте `force` со значением `true`.

## Анимация с помощью CSS и состояния

Используйте [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), чтобы добавлять и удалять любое количество CSS-классов с состояниями.

[example preview="top-frame" playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
  ></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px);
    }
    .right {
      transform: translatex(50px);
    }
    button {
      margin-top: 1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"></div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
</body>
```

[/example]

Чтобы добавить в класс несколько анимаций, сначала добавьте список CSS-классов в тег `<style amp-custom>` внутри элемента `head`:

```css
.visible {
  opacity: 1;
}
.invisible {
  opacity: 0;
}
.left {
  transform: translatex(-50px);
}
.right {
  transform: translatex(50px);
}
```

Затем соедините каждый класс с состоянием:

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

После чего свяжите элемент с классами:

```html
<div [class]="magicBox[animateBox].className"></div>
```

Изменение состояний выполняется связанным действием или событием AMP. В примере ниже состояние меняется в результате действий пользователя:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">Disappear</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">Reappear</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">Move Left</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">Move Right</button>
```

Используя [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) таким способом, явно выберите классом определенный класс. Вам не нужно будет инструктировать удалить другие классы.
