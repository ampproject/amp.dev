---
$title: amp-social-share
$category@: ads-analytics
teaser:
  text: Функция отслеживания публикаций ссылок на ваши страницы сейчас разрабатывается.
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



Кнопка, с помощью которой можно поделиться контентом.


<table>
  <tr>
    <td class="col-fourty"><strong>Скрипт</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td>См. пример <a href="https://ampbyexample.com/components/amp-social-share/">amp-social-share</a> на сайте AMP By Example.</td>
  </tr>
</table>

## Обзор <a name="overview"></a>

Компонент `amp-social-share` предназначен для показа кнопки, позволяющей делиться контентом на социальных платформах от разных поставщиков.

## Примеры <a name="examples"></a>

**Простая кнопка**

Некоторые настройки задаются автоматически, если кнопка связана с одним из нескольких поставщиков, для которых уже созданы стандартные конфигурации. По умолчанию в качестве публикуемого URL указывается канонический URL текущего документа, а в качестве публикуемого текста – заголовок страницы.

```html
<amp-social-share type="twitter"></amp-social-share>
```

**Передача параметров**

Если вы хотите, чтобы конечной точке передавались параметры, добавьте в код атрибут `data-param-<attribute>`.
```html
<amp-social-share type="linkedin" width="60" height="44"
    data-param-text="Hello world"
    data-param-url="https://example.com/">
</amp-social-share>
```

LinkedIn входит в число предварительно настроенных (стандартных) поставщиков, поэтому атрибут `data-share-endpoint` здесь не нужен.

## Атрибуты <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (обязательно)</strong></td>
    <td>С его помощью указывается тип социальной платформы, независимо от того, относится она к предварительно настроенным или нет.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>Определяет, где будет открываться целевой блок с контентом. По умолчанию задается значение <code>&#95;blank</code>, и только в случае с электронными письмами и SMS в iOS вместо него выбирается <code>&#95;top</code>.
        Обратите внимание, что переопределять это значение не рекомендуется, если дело не касается электронной почты.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td>Этот атрибут <strong>обязателен, если поставщик не входит в список стандартных</strong>.
        <br>
          У некоторых популярных социальных платформ есть уже заданные конечные точки для публикаций. Более подробную информацию вы найдете <a href="#pre-configured-providers">ниже</a>. Другие конечные точки необходимо указывать самостоятельно.</td>
        </tr>
        <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td>Все атрибуты с префиксом <code>data-param-*</code> преобразуются в параметры URL, которые передаются конечной точке.</td>
        </tr>
      </table>

## Стандартные поставщики <a name="pre-configured-providers"></a>

Компонент `amp-social-share` предполагает работу с [несколькими стандартными поставщиками](0.1/amp-social-share-config.js), для которых автоматически определяются конечные точки и некоторые параметры по умолчанию.

<table>
  <tr>
    <th class="col-twenty">Поставщик</th>
    <th class="col-twenty">Тип</th>
    <th>Параметры</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">Web Share API</a> (открывает диалоговое окно выбора приложений в ОС)</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: необязательный, по умолчанию присваивается значение "Заголовок текущей страницы".</li>
        <li><code>data-mode</code>: необязательный. Если задано значение <code>replace</code>, скрываются все варианты отправки контента, кроме системного.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Электронная почта</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>: необязательный, по умолчанию присваивается значение "Заголовок текущей страницы".</li>
        <li><code>data-param-body</code>: необязательный, по умолчанию в качестве значения указывается URL из элемента с атрибутом <code>rel=canonical</code>.</li>
        <li><code>data-param-recipient</code>: необязательный, значение по умолчанию – пустая строка ("").</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>: <strong>обязательный</strong>, по умолчанию присваивается значение none. В параметре <code>app_id</code> нужно указать идентификатор приложения Facebook, необходимый для работы с <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">диалогом Facebook "Поделиться"</a>.</li>
        <li><code>data-param-href</code>: необязательный, по умолчанию в качестве значения задается URL из элемента с атрибутом <code>rel=canonical</code>.</li>
        <li><code>data-param-quote</code>: необязательный. С его помощью можно поделиться цитатой или отрывком текста.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: необязательный, в качестве значения по умолчанию вставляется URL из элемента с атрибутом <code>rel=canonical</code>.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>: необязательный, но настоятельно рекомендуется его указывать. По умолчанию присваивается значение none. Нужно включить URL медиафайла, который будет опубликован в Pinterest. Если не задать этот параметр, конечному пользователю будет предложено загрузить медиафайл.</li>
        <li><code>data-param-url</code>: необязательный, в качестве значения по умолчанию вставляется URL из элемента с атрибутом <code>rel=canonical</code>.</li>
        <li><code>data-param-description</code>: необязательный, по умолчанию присваивается значение "Заголовок текущей страницы".</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Google+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: необязательный, в качестве значения по умолчанию вставляется URL из элемента с атрибутом <code>rel=canonical</code>.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: необязательный, в качестве значения по умолчанию вставляется URL из элемента с атрибутом <code>rel=canonical</code>.</li>
        <li><code>data-param-text</code>: необязательный, по умолчанию присваивается значение "Заголовок текущей страницы".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Твиттер</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: необязательный, в качестве значения по умолчанию вставляется URL из элемента с атрибутом <code>rel=canonical</code>.</li>
        <li><code>data-param-text</code>: необязательный, по умолчанию присваивается значение "Заголовок текущей страницы".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>WhatsApp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: необязательный, по умолчанию присваивается значение "Заголовок текущей страницы – URL текущей страницы".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: необязательный, в качестве значения по умолчанию вставляется URL из элемента с атрибутом <code>rel=canonical</code>.</li>
        <li><code>data-param-text</code>: необязательный, по умолчанию присваивается значение "Заголовок текущей страницы".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SMS</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>: необязательный. В качестве значения по умолчанию вставляются следующие данные: <code>rel=title – rel=canonical</code> URL.</li></ul>
      </td>
    </tr>
  </table>

## Поставщики без стандартных конфигураций <a name="non-configured-providers"></a>

Вы можете использовать не только стандартных, но и других поставщиков, указав в компоненте `amp-social-share` дополнительные атрибуты.

**Пример кнопки, связанной с не настроенным предварительно поставщиком**

В этом примере представлен код, с помощью которого создается кнопка для отправки контента через Facebook Messenger. Нужная конечная точка для специального протокола Facebook Messenger задана в атрибуте `data-share-endpoint`.

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

Создать подходящие стили и изображение кнопки предстоит вам, поскольку стандартных не существует.

## Стили <a name="styles"></a>

### Стили по умолчанию <a name="default-styles"></a>

Компонент `amp-social-share` изначально поддерживает несколько социальных платформ с предварительно заданными настройками. Кнопки для публикаций на этих платформах оформляются с помощью логотипа поставщика и окрашиваются в его фирменный цвет. Ширина по умолчанию – 60px, высота по умолчанию – 44px.

[tip type="ll callout('Совет.</b><a class="type_success"]
На сайте [AMP Start](https://ampstart.com/components#links-and-sharing) вы найдете уже оформленные адаптивные ссылки для отправки контента. Можете добавлять их на свои AMP-страницы.
[/tip]

### Собственные стили <a name="custom-styles"></a>

Иногда вам может понадобиться применить собственный стиль. В таких случаях достаточно просто переопределить стандартные стили, например так:
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## Замена переменных значениями <a name="variable-substitution"></a>

Вы можете указывать в элементе `<amp-social-share>` переменные [в соответствии с общими правилами, регулирующими их использование с AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md). В примере ниже переменная `TITLE` заменяется заголовком страницы, а `CANONICAL_URL` – каноническим URL документа.

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## Валидация <a name="validation"></a>

С [правилами для компонента amp-social-share](https://github.com/ampproject/amphtml/blob/master/extensions/amp-social-share/validator-amp-social-share.protoascii) можно ознакомиться в спецификации валидатора AMP.
,false,true
