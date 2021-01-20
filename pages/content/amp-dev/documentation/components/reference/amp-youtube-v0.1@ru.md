---
$title: amp-youtube
$category@: media
teaser:
  text: Показ видеоролика YouTube
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



Показывает видео, размещенное на [YouTube](https://www.youtube.com/).

<table>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Примеры</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">Аннотированный пример кода для amp-youtube</a></td>
  </tr>
</table>

## Пример <a name="example"></a>

Если использовать адаптивный макет (layout="responsive") и значения ширины и высоты, указанные в примере ниже, вы получите макет для видео с соотношением сторон 16:9.

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
  [/sourcecode]

  [sourcecode:html]
  <amp-youtube
      id="myLiveChannel"
      data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  [/sourcecode]

## Атрибуты <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>Если этот атрибут указан и браузер поддерживает автовоспроизведение:
      <ul>
        <li>звук будет автоматически отключен перед началом автовоспроизведения;
        </li>
        <li>когда при прокрутке страницы видео выходит из зоны видимости, оно приостанавливается;
        </li>
        <li>когда при прокрутке страницы видео попадает в зону видимости, воспроизведение возобновляется;
        </li>
        <li>когда пользователь нажимает на видео, звук включается;
        </li>
        <li>если пользователь взаимодействовал с видео (включал или выключал звук или воспроизведение и т. п.), то при прокручивании за пределы видимости и обратно состояние видеопроигрывателя сохраняется. Например, пользователь приостановил ролик и прокрутил страницу так, что видеопроигрыватель вышел из зоны видимости. Когда он снова вернется к видео, оно будет приостановлено.
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>Идентификатор видео YouTube. Он указывается в URL страницы, на которой размещен ролик YouTube.
          Например, в этом URL: https://www.youtube.com/watch?v=Z1q71gFeRqM строка <code>Z1q71gFeRqM</code> – идентификатор видео.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>Идентификатор канала YouTube, на котором проводится прямая трансляция. Например, в этом URL: https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q, строка <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code> – идентификатор канала. Если нужно указать URL прямой трансляции, а не ролика, используйте атрибут <code>data-live-channelid</code> вместо <code>data-videoid</code>. Для каналов не используются теги (placeholder) по умолчанию. Вы можете указать такой тег для видео, как это сделано во второй части примера выше.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td>Все атрибуты <code>data-param-*</code> добавляются в качестве параметров запроса в тег "iframe src", используемый в YouTube. Их можно использовать для передачи в плагины YouTube пользовательских параметров (которые определяют, например, показ элементов управления).
            Ключи и параметры должны указаны в кодировке URI, а ключи – в "верблюжьей" нотации:
            <ul>
            <li>например, "data-param-controls=1" следует обозначать как "&amp;controls=1".</li>
          </ul>
          Подробнее <a href="https://developers.google.com/youtube/player_parameters">о параметрах встраиваемого видеопроигрывателя YouTube</a>…
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Требуется расширение <code>amp-video-docking</code>.</strong> Если этот атрибут указан и воспроизведение ролика включено пользователем, то когда видео при прокрутке выходит из зоны видимости, оно уменьшается и закрепляется в углу экрана или в заданном месте.
          <a href="amp-video-docking.md">Подробнее…</a></td>
        </tr>
        <tr>
          <td width="40%"><strong>credentials (необязательно)</strong></td>
          <td>Определяет параметр <code>credentials</code> в соответствии с <a href="https://fetch.spec.whatwg.org/">Fetch API</a>.
            <ul>
              <li>Поддерживаемые значения: "omit", "include".</li>
              <li>Значение по умолчанию: "include".</li>
            </ul>
            Если вы хотите использовать <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">видеопроигрыватель YouTube в режиме повышенной конфиденциальности</a>, присвойте атрибуту значение <code>omit</code>.
            Обычно YouTube устанавливает файлы cookie при загрузке видеопроигрывателя. В режиме же повышенной конфиденциальности, эти файлы устанавливаются, когда пользователь нажимает на видео.</td>
          </tr>
          <tr>
            <td width="40%"><strong>common attributes</strong></td>
            <td>Этот элемент содержит <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">распространенные атрибуты</a>, расширенные до компонентов AMP.</td>
          </tr>
        </table>

## Проверка <a name="validation"></a>

О правилах для amp-youtube читайте в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube/validator-amp-youtube.protoascii).
