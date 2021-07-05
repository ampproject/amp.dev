---
'$title': Устранение проблем при работе с AMP-кешем
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: 'Почему мой документ «ломается» в AMP-кеше? '
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Почему мой документ «ломается» в AMP-кеше? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

Корректно сформированные документы AMP обычно отображаются и ведут себя в AMP-кеше так же, как и в исходном месте размещения. Однако существуют некоторые компоненты и конфигурации сервера, которые могут вызвать проблемы.

Если определенный документ отображается и ведет себя надлежащим образом в вашем источнике, но не при просмотре через кеш (см. [как сопоставить исходные URL-адреса с AMP-кешем Google](https://developers.google.com/amp/cache/overview#amp-cache-url-format)), попробуйте следующее:

1. Откройте в браузере консоль инструментов разработчика/отладки ошибок и устраните все возникающие ошибки или предупреждения.
2. Загрузите документ в [AMPBench](https://ampbench.appspot.com/) и устраните все непредвиденные ошибки или предупреждения.

Если после выполнения этих действий проблема не исчезнет, проверьте таблицу ниже.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">Симптом</th>
      <th width="30%">Проблема</th>
      <th width="40%">Решение</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Не отображаются веб-шрифты (используются резервные шрифты)</td>
      <td>AMP-кеш не включен в разрешенный список поставщика шрифтов.</td>
      <td>Свяжитесь с поставщиком шрифтов и попросите добавить <a href="amp-cors-requests.md#cors-security-in-amp">все кеши</a> в разрешенный список.</td>
    </tr>
    <tr>
      <td>
<strong>Только для источников HTTP:</strong> не отображаются ресурсы (например, шрифты и изображения)</td>
      <td>В документе используются протокольно относительные URL-адреса.</td>
      <td>Используйте абсолютные URL-адреса (то есть <code>http://www.site.com/doc/amp</code>, а не <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">Не отображаются ресурсы (например, шрифты и изображения)</td>
      <td>Ресурсы выдаются с неправильным типом MIME.</td>
      <td>Укажите <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">допустимый тип MIME</a>.</td>
    </tr>
    <tr>
      <td>AMP-кеш не может получить доступ к ресурсам.</td>
      <td>Убедитесь, что AMP-кеш может получить доступ к вашим ресурсам и что он не заблокирован по IP-адресу, пользовательскому агенту и т. п. (см. <a href="https://support.google.com/webmasters/answer/1061943?hl=en">Список пользовательских агентов, используемых поисковым роботом Google</a>).</td>
    </tr>
    <tr>
      <td>Динамические элементы, такие как <code>&lt;amp-form&gt;</code>, <code>&lt;amp-list&gt;</code>, демонстрируют некорректное поведение.</td>
      <td>Заголовки CORS повреждены или отсутствуют.</td>
      <td>Эти компоненты отправляют кроссдоменные запросы из AMP-кеша в ваш источник. По умолчанию браузеры блокируют такие запросы. Чтобы разрешить их, передавайте <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">заголовки CORS</a>, которые вносят <a href="amp-cors-requests.md">все кеши</a> в список разрешенных.</td>
    </tr>
    <tr>
      <td>Контент, который должен быть удален согласно правовому требованию, продолжает выдаваться.</td>
      <td>AMP-кеш еще не успел обновиться.</td>
      <td>Следуйте инструкциям по обновлению контента в конкретном AMP-кеше. Для Google AMP Cache см. <a href="https://developers.google.com/amp/cache/update-cache">Обновление AMP-контента</a>.</td>
    </tr>
</tbody>
</table>

</table>
