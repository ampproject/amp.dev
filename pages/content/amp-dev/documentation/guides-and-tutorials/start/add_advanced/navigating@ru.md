---
'$title': Навигация по вашему сайту
$order: 5
description: У большинства мобильных сайтов есть меню навигации по сайту. Такие меню могут быть реализованы различными способами. В этом уроке мы попробуем следующие примеры для...
---

У большинства мобильных сайтов есть меню навигации по сайту. Такие меню могут быть реализованы различными способами. В этом руководстве мы опробуем следующие способы навигации для AMP-страниц:

- Обратная ссылка на вашу домашнюю страницу — самый простой вариант.
- Боковая панель навигации, созданная с помощью компонента [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

## Обратная ссылка на домашнюю страницу

Самый простой способ предоставить вашим пользователям доступ к стандартным возможностям навигации вашего сайта — просто перенаправить их обратно на вашу домашнюю страницу!

Попробуйте **заменить** `<header>` следующей версией, содержащей ссылку:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img
      class="home-button"
      src="icons/home.png"
      width="36"
      height="36"
    ></amp-img>
  </a>
  <div class="site-name">News Site</div>
</header>
```

После чего **добавьте** в свой встроенный CSS следующие правила стиля:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

Теперь **обновите** страницу. В левом верхнем углу страницы должна отобразиться ссылка, ведущая на `homepage.html`. Если вы нажмете на значок «Домой», вы обнаружите, что он никуда не ведет, так как у нас нет файла `homepage.html`.

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='Home icon navigation') }}

Эту ссылку можно заменить URL-адресом домашней страницы вашего сайта, чтобы пользователи могли переходить к другим частям вашего сайта посредством уже существующих на нем навигационных функций.

Это простейший подход, использующий существующую навигацию по вашему сайту. Далее мы рассмотрим более популярный способ создания навигации.

## Навигация с помощью боковой панели

Одним из распространенных методов навигации является добавление значка меню, при нажатии на который сбоку страницы открывается набор навигационных ссылок. В AMP мы можем создать такую навигацию с помощью компонента [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

Сначала мы должны **добавить** JavaScript-код компонента [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) в тег `<head>`:

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://ampjs.org/v0/amp-sidebar-0.1.js"
></script>
```

Далее мы хотим отобразить значок меню. При нажатии на значок откроется боковая панель. Чтобы отобразить значок [«гамбургер»](https://en.wikipedia.org/wiki/Hamburger_button) вместо значка «домой», **замените** `<header>` следующим кодом:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

В вышеуказанном коде мы включаем/выключаем отображение (`toggle`) боковой панели с помощью атрибута [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) на элементе [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md), который обозначен идентификатором `sidebar1`. Давайте добавим боковую панель.

Сразу после `</header>` **добавьте** следующий HTML-код:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div
    role="button"
    aria-label="close sidebar"
    on="tap:sidebar1.toggle"
    tabindex="0"
    class="close-sidebar"
  >
    ✕
  </div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

Наша боковая панель будет скрыта, но когда пользователь коснется значка «гамбургер», меню появится в левой части экрана. Чтобы закрыть меню, пользователь может коснуться значка X.

Наконец, **добавьте** во встроенный CSS следующие правила стиля:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom: 10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

Давайте полюбуемся нашей боковой панелью. **Обновите** и перезагрузите AMP-страницу. Вы должны увидеть что-то вроде следующего:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='Sidebar menu navigation') }}

Страница выглядит отлично! Добавим еще один штрих — пользовательский шрифт.
