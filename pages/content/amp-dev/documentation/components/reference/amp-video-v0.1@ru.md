---
$title: amp-video
$category@: media
teaser:
  text: Заменяет тег HTML5 video.
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



Замена тега HTML5 `video`, предназначенная только для добавления видео непосредственно на страницу с помощью кода HTML5.

<table>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>Примеры</strong></td>
    <td>См. на сайте AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">Пример amp-video</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">Оверлей для запуска воспроизведения по клику</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
      <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
    </tr>
  </table>

## Принципы работы <a name="behavior"></a>

Компонент `amp-video` по мере воспроизведения ролика выполняет отложенную загрузку видеоресурса, указанного в атрибуте `src`. Настройка компонента `amp-video` почти не отличается от настройки обычного элемента HTML5 `<video>`.

Компонент `amp-video` поддерживает в качестве дочерних HTML-узлы четырех уникальных типов:

* Теги `source`. Как и в случае с тегом HTML `<video>`, вы можете добавить дочерние теги `<source>` и указать в них несколько разных исходных медиафайлов.
* Теги `track`, используемые для показа субтитров. Если файл субтитров не размещен в том же источнике, что и ваша страница, необходимо включить в тег `<amp-video>` атрибут `crossorigin`.
* Изображение, которое будет показываться до начала воспроизведения ролика.
* Резервный контент на случай, если браузер пользователя не поддерживает видео HTML5. Максимум в один дочерний узел можно добавить атрибут `fallback`, при наличии которого контент этого узла и его дочерних элементов будет демонстрироваться в определенных браузерах вместо видео.

#### Пример <a name="example"></a>

[example preview="inline" playground="true" imports="amp-video"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  layout="responsive"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## Статистика <a name="analytics"></a>

Компонент `amp-video` по умолчанию поддерживает сбор статистики. [Подробнее…](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md)

## Атрибуты <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Требуется, если нет дочерних элементов <code>&lt;source&gt;</code>. URL должен начинаться с префикса https.</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>Изображение, которое будет демонстрироваться до начала воспроизведения ролика. По умолчанию отображается первый кадр.
      <br>
        Вы также можете добавить оверлей для запуска видео по клику. Более подробно об этом рассказывается <a href="#click-to-play-overlay">ниже</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>Если этот атрибут указан и браузер поддерживает автовоспроизведение, видео будет проигрываться автоматически при появлении в видимой области экрана. Ознакомьтесь с касающимися этой функции условиями, которые <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#autoplay">перечислены в спецификации видео для AMP</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controls</strong></td>
        <td>Примерно соответствует атрибуту <code>controls</code> в элементе HTML5 <code>video</code>. Если этот атрибут включен в код, то в браузере пользователю становятся доступны элементы управления воспроизведением.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controlsList</strong></td>
        <td>Не отличается от атрибута <a href="https://developer.mozilla.org/ru/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> элемента HTML5 video. Поддерживается только некоторыми браузерами. Подробная информация – на странице <a href="https://developer.mozilla.org/ru/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Для работы требуется расширение <code>amp-video-docking</code>.</strong> Если этот атрибут указан, то запущенное вручную видео, оказавшееся вне зоны видимости в результате прокрутки страницы, уменьшается и закрепляется в углу экрана или в заданном месте.
            Дополнительные сведения вы найдете в <a href="amp-video-docking.md">документации по расширению amp-video-docking</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop</strong></td>
          <td>При наличии этого атрибута ролик после окончания будет автоматически воспроизводиться с начала.</td>
        </tr>
        <tr>
          <td width="40%"><strong>crossorigin</strong></td>
          <td>Требуется, если ресурс элемента <code>track</code> не размещен в том же источнике, что и веб-документ.</td>
        </tr>
        <tr>
          <td width="40%"><strong>disableremoteplayback</strong></td>
          <td>Определяет, допускается ли воспроизведение видео из мультимедийного элемента в интерфейсе удаленных устройств, например с использованием элементов управления Chromecast или AirPlay.</td>
        </tr>
        <tr>
          <td width="40%"><strong>muted (поддержка прекращена)</strong></td>
          <td>Атрибут <code>muted</code> больше не поддерживается и ни на что не влияет. Отключение звука автоматически регулируется атрибутом <code>autoplay</code>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>noaudio</strong></td>
          <td>Указывает на отсутствие аудио в ролике. При наличии этого атрибута скрывается значок эквалайзера, показываемый в случаях, когда настроено автовоспроизведение видео.</td>
        </tr>
        <tr>
          <td width="40%"><strong>rotate-to-fullscreen</strong></td>
          <td>Если пользователь повернет устройство горизонтально, видео, находящееся в видимой области, начнет демонстрироваться в полноэкранном режиме. <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#rotate-to-fullscreen">Подробнее…</a></td>
        </tr>
        <tr>
          <td width="40%"><strong>универсальные атрибуты</strong></td>
          <td><a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">Атрибуты</a>, которые поддерживаются большинством компонентов AMP.</td>
        </tr>
      </table>

## Атрибуты Media Session API <a name="media-session-api-attributes"></a>

Компонент `amp-video` работает с применением [Media Session API](https://developers.google.com/web/updates/2017/02/media-session). Это позволяет разработчикам указывать дополнительную информацию о видеофайле, которая будет отображаться в центре уведомлений на устройстве пользователя (вместе с кнопками запуска и приостановки воспроизведения).

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>URL изображения в формате PNG, JPG или ICO, которое должно иллюстрировать видео. Если такого URL нет в этом атрибуте, вспомогательный класс Media Session API использует либо данные из определенного на сайте schema.org поля image, либо URL из метатега og:image, либо значок сайта.</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>Сведения о том, кто автор видео. Значение – строка.</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>Сведения о том, к какому альбому или какой коллекции относится видео. Значение – строка.</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>Название ролика в виде строки. Если оно не указано, вспомогательный класс Media Session API использует либо значение атрибута aria-label, либо заголовок страницы.</td>
  </tr>
</table>

Пример

В этом примере среди атрибутов есть и `poster`, и `artwork`. Изображение `poster` демонстрируется в проигрывателе, пока не запущено видео, а изображение `artwork` показывается в уведомлении с помощью MediaSession API.

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## Оверлей для запуска видео по клику <a name="click-to-play-overlay"></a>

Чтобы повысить удобство просмотра, в видеопроигрыватели на сайтах часто вставляют оверлеи, позволяющие запускать воспроизведение по клику.  Например, можно включить в такой оверлей собственный значок воспроизведения, на который будут нажимать пользователи, а также добавить название ролика, изображения-обложки разных размеров и т. д.  Поскольку компонент `amp-video` поддерживает стандартное AMP-действие `play`, внедрить функцию запуска видео по клику не составит труда.

Подробно разобранный пример оверлея вы найдете [на сайте AMP By Example](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/).

## Валидация <a name="validation"></a>

С [правилами для компонента amp-video](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) можно ознакомиться в спецификации валидатора AMP.
