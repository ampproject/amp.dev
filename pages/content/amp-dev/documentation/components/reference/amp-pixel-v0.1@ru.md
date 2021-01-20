---
$title: amp-pixel
$category@: ads-analytics
teaser:
  text: Пиксель отслеживания, используемый для регистрации просмотров страниц
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




<table>
  <tr>
    <td class="col-fourty"><strong>Описание</strong></td>
    <td>Этот компонент может использоваться как стандартный пиксель отслеживания, позволяющий собирать информацию о просмотрах веб-страниц</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>fixed, nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td>См. пример <a href="https://ampbyexample.com/components/amp-pixel/">amp-pixel</a> на сайте AMP By Example.</td>
  </tr>
</table>

## Функционирование <a name="behavior"></a>

Компонент `amp-pixel` обрабатывается аналогично стандартному пикселю отслеживания `img`. Он использует единственный URL, но добавляет в него переменные, которые при выполнении запроса могут быть заменены в строке URL на данный компонент. Более подробные сведения вы найдете в разделе, который посвящен [заменам](#substitutions).

В примере ниже компонент `amp-pixel` направляет обычный запрос GET к выбранному URL и игнорирует ответ.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

[tip type="note"]
Игнорируйте параметр `usqp` при обработке URL для AMP в заголовке перехода, относящегося к запросу. Этот параметр используется Google для запуска экспериментов в Google AMP Cache.
[/tip]

## Атрибуты <a name="attributes"></a>

##### src (обязательно) <a name="src-required"></a>

Обычный URL удаленной конечной точки, который должен использовать протокол `https`.

##### referrerpolicy (необязательно) <a name="referrerpolicy-optional"></a>

Этот атрибут аналогичен атрибуту `referrerpolicy`, предназначенному для тега `<img>`, однако ему может присваиваться только значение `no-referrer`. Если в коде представлен элемент `referrerpolicy=no-referrer`, заголовок `referrer` будет удален из HTTP-запроса.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img (необязательно) <a name="allow-ssr-img-optional"></a>

Этот атрибут используется в креативах AMP4ADS и указывает, что при преобразовании, выполняемом после проверки кода AMP, элемент img может быть размещен внутри элемента amp-pixel. Благодаря этому запрос ping будет отправляться одновременно с извлечением или обработкой библиотеки AMP.
Обратите внимание, что при этом все макросы в составе URL не будут заменяться, поэтому применяйте их только в том случае, если они не содержатся внутри элемента src.

##### common attributes <a name="common-attributes"></a>

Этот элемент содержит [распространенные атрибуты](../../../documentation/guides-and-tutorials/learn/common_attributes.md), которые поддерживаются компонентами AMP.

## Замены <a name="substitutions"></a>

Компонент `amp-pixel` поддерживает все стандартные замены переменных AMP.
Более подробные сведения вы найдете в [руководстве по работе с заменами](https://github.com/ampproject/amphtml/blob/master/extensions/spec/amp-var-substitutions.md).

В примере ниже запрашивается URL вида `https://foo.com/pixel?0.8390278471201`. Значение элемента RANDOM генерируется случайным образом при каждом новом показе.

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## Поддержка стилей <a name="styling"></a>

К компоненту `amp-pixel` невозможно применять стили.

## Проверка <a name="validation"></a>

С правилами для компонента amp-pixel можно ознакомиться в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
