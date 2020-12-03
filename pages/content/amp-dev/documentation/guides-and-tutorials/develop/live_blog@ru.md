---
"$title": Создание живого блога
"$order": '102'
description: Живые блоги — это веб-страницы, которые часто обновляются в ходе текущих событий, таких как спортивные мероприятия или выборы. С помощью AMP вы можете создать живой блог, используя...
tutorial: 'true'
formats:
- websites
author: kul3r4
contributors:
- bpaduch
---

Прямые текстовые трансляции — это веб-страницы, которые часто обновляются в ходе текущих событий, таких как спортивные мероприятия или выборы. С помощью AMP вы можете создать прямую текстовую трансляцию, используя компонент [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md).

Этот урок содержит краткий обзор компонента [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) и рассказывает о некоторых подробностях реализации прямых текстовых трансляций, таких как создание [постраничной навигации](#pagination) и [диплинков](#deeplinking). Чтобы проиллюстрировать процесс создания прямой текстовой трансляции в AMP, мы воспользуемся [примером прямой текстовой трансляции](live_blog.md) из обучающего курса AMP By Example.

[tip type="tip"] **СОВЕТ.** Чтобы обеспечить интеграцию с функциональностью сторонних платформ, добавьте в разметку страницы метаданные [LiveBlogPosting](http://schema.org/LiveBlogPosting). [/tip]

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## Overview of `amp-live-list`

Компонент [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) периодически проверяет документ на сервере на наличие нового контента, обновляя страницу в браузере пользователя по мере поступления новых записей. Соответственно, при появлении в прямой трансляции новой записи CMS должна обновлять документ, добавляя запись как в тело страницы, так и в раздел [метаданных](../../../documentation/examples/documentation/Live_Blog.html#metadata).

Вот как может выглядеть исходный код трансляции:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
</amp-live-list>
```

Let's look at this code:

Each [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component requires a unique id as there could be more than one on a page.  In this example, we specified `my-live-list` as the unique id.

Атрибут `data-poll-interval` указывает, как часто должна проводиться проверка наличия обновлений; если документ на сервере обновлен, обновление будет доступно пользователю на момент следующей проверки.

Когда в документе на сервере появляется новая запись, элемент `<button update on="tap:my-live-list.update">` отображает кнопку «You have updates», при нажатии на которую на странице будут показаны новые записи.

Live blogs can grow and make the page too long. You can use the `data-max-items-per-page` attribute to specify how many items can be added to the live blog. If the number of items after an update exceeds `data-max-items-per-page`, the oldest updates exceeding this number are removed. For example, if the page currently has 9 items and `data-max-items-per-page` is set to 10, and 3 new items arrive in the latest update, the two oldest items are removed from the page with the latest update.

All blog posts in the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) must be children of `<div items></div>`. By referring to each post as an item, every item must have a unique `id` and a `data-sort-time`.

## Implementation details

Теперь, когда вы познакомились с компонентом [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), давайте разберемся, как создать более сложную прямую текстовую трансляцию. Читайте дальше, чтобы узнать, как реализовать постраничную навигацию и как работают диплинки.

### Постраничная навигация <a name="pagination"></a>

Длинные трансляции могут использовать постраничную навигацию для повышения производительности, ограничивая количество записей трансляции, отображаемых на странице. Чтобы установить постраничную навигацию, добавьте в компонент [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) элемент `<div pagination></div>` и вставьте необходимую для навигации разметку (такую, как номер страницы или ссылки на следующую и предыдущую страницы).

После добавления постраничной навигации простой код, который мы использовали ранее, приобретает следующий вид:

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>Next</li>
      </ul>
     </nav>
   </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

It’s your responsibility to populate the navigation items correctly by updating the hosted page. For example, in the [live blog sample](live_blog.md) we render the page via a server-side template and we use a query parameter to specify what the first blog item of the page should be. We limit the size of the page to 5 items, so if the server has generated more than 5 items, a user landing on the main page will see the "Next" element in the navigation area. Refer to [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) for details.

After the size of blog posts has exceeded the maximum number of items specified by `data-max-items-per-page`, the older blog items are displayed in the “Next” pages, for example on page 2. Given that the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) polls the server at intervals to see if there is any change in the items, there's no need to poll the server if the user isn't on the first page.

You can add the disabled attribute to  the hosted page to prevent the polling mechanism. In the live blog sample, we perform this behavior in  a server-side template; when the requested page is not the first one, we add the disabled attribute to the [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) component.

### Deeplinking <a name="deeplinking"></a>

When you publish a blog post, it’s important to be able to deep link to the post to enable features like sharing. With [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md), deep linking is possible by simply using the `id` of the blog item. For example, [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3) allows you to navigate directly to the blog post with the `post3` id.

В [примере прямой текстовой трансляции](live_blog.md) из обучающего курса AMP By Example для генерации свежего контента используется cookie-файл, поэтому, если вы зайдете на страницу в первый раз, запись с идентификатором «post3» может быть недоступна — в этом случае вы будете перенаправлены к первой записи.

## Ресурсы

Для получения дополнительной информации вы можете ознакомиться со следующими ресурсами:

- справочная документация по компоненту [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [Пример текстовой трансляции из AMP By Example](live_blog.md)
