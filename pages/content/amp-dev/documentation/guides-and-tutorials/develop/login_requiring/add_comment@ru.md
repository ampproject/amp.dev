---
"$title": Добавление комментария
"$order": '2'
description: Теперь пользователь может добавить комментарий, используя библиотеку amp-form. Обратите внимание, что присутствие формы определяется состоянием компонента amp-access...
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

Теперь пользователь может добавить комментарий, используя библиотеку [`amp-form`](../../../../documentation/components/reference/amp-form.md). Обратите внимание, что присутствие формы определяется состоянием компонента [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

Мы задаем метод POST и действие XHR, так как в AMP не разрешены POST-запросы с действиями, отличными от XHR. Поскольку это лишь демонстрация, комментарии не сохраняются, а значит, добавить можно только один комментарий; при добавлении комментария сервер AMPByExample возвращает JSON, содержащий введенный текст и дополнительную информацию, такую как временная отметка, аватар и имя пользователя.

Вот пример JSON-ответа:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

Компонент формы просто отобразит эти значения на странице, используя шаблон [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md):

[sourcecode:html]
<div submit-success>
  <template type="amp-mustache">
    <div class="comment-user">
      <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
      <div class="card comment">
        <p><span class="user">{% raw %}{{User}}{% endraw %}</span><span class="date">{% raw %}{{Datetime}}{% endraw %}</span></p>
        <p>{% raw %}{{Text}}{% endraw %}</p>
      </div>
    </div>
  </template>
</div>
[/sourcecode]

В этом примере мы лишь проверяем, что комментарий не является пустым. Если комментарий пуст, мы возвращаем ошибку, которая приводит к выполнению следующего кода

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

В качестве завершающего штриха мы добавляем атрибут `required`, чтобы перед отправкой комментария выполнялась проверка на наличие текста:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

Теперь, если вы добавите комментарий и нажмете кнопку отправки, вы увидите что-то похожее на скриншот ниже:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>
