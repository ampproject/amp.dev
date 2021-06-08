---
$category@: dynamic-content
formats:
  - websites
teaser:
  text: >-
    提供用于选择日期的小部件。日期选择器可以呈现为覆盖，相对于输入字段，或作为静态日历小部件。
---


<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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



## 行为

`amp-date-picker` 在一个页面上呈现一个日历，用户可以从中选择日期。

在本例中，我们显示了一个固定高度的静态日历，用户可以在其中选择一个日期：

[sourcecode:html]
<amp-date-picker layout="fixed-height" height="360"> </amp-date-picker>
[/sourcecode]

<amp-img alt="static single date picker" layout="fixed" src="https://github.com/ampproject/amphtml/raw/main/extensions/amp-date-picker/img/amp-date-picker-basic.png" width="329" height="365">
  <noscript>
    <img alt="static single date picker" src="https://github.com/ampproject/amphtml/raw/main/extensions/amp-date-picker/img/amp-date-picker-basic.png" width="329" height="365">
  </noscript>
</amp-img>

在此示例中，日历显示为特定表单字段的覆盖：

[sourcecode:html]
<form method="post" action-xhr="/form/echo-json/post" target="_blank">
  <amp-date-picker
    mode="overlay"
    layout="container"
    input-selector="[name=deliverydate]"
  >
    <label for="deliverydate">Deliver Date:</label>
    <input type="text" name="deliverydate" />
  </amp-date-picker>
</form>
[/sourcecode]

### 显示方式

`amp-date-picker` 将提供两种方式来呈现的日期选择器：静态（默认）或覆盖。

#### 静态模式

通过指定 `mode="static"`, `amp-date-picker` 将呈现一个静态日历视图。这是默认的显示模式;如果未指定模式，则呈现静态日历。

对于静态日期选择器，必须指定大小定义的布局，可以是： `fixed`、 `fixed-height`、 `responsive`、 `fill` 或 `flex-item`。

当 `static` 中amp-date-picker以 `<form>`呈现时，如果没有 [指定输入 `*input-selector`](#input-selector), amp-date-picker 会创建隐藏的输入元素 (e.g., `<input type="hidden" …`)。 amp-date-picker 将元素命名为 `date` 或 `start-date` 和 `end-date` ；如果表单中已经使用了这些名称， 则 amp-date-picker 将尝试使用  `<amp-date-picker>` 的 `id` 为输入字段命名。

本示例演示了如何在表单中使用静态日期选择器，用户可以在其中选择日历中的日期范围。 由于 `*input-selector` 在amp-date-picker中没有定义属性，因此会自动生成隐藏的输入字段。

[sourcecode:html]
<form method="post" action-xhr="/form-post" target="_blank">
  <fieldset>
    <label>
      <span>Your name</span>
      <input type="text" name="name" id="name" required />
    </label>
    <label for="date">Your date</label>
    <amp-date-picker
      type="range"
      mode="static"
      id="date"
      layout="fixed-height"
      height="360"
    >
      <!-- automatically generates hidden input fields:
    <input type="hidden" name="start-date">
    <input type="hidden" name="end-date"> -->
    </amp-date-picker>
    <input type="submit" value="Subscribe" />
  </fieldset>
  <div submit-success>
    <template type="amp-mustache">
      Success! Thanks {% raw %}{{name}}{% endraw %} for choosing {% raw %}{{start-date}}{% endraw %} and {% raw %}{{end-date}}{% endraw %}.
    </template>
  </div>
</form>
[/sourcecode]

#### 叠加模式

通过指定 `mode="overlay"`，当用户单击，聚焦或按下与amp-date-picker连接的输入字段中的向下箭头时，将显示日历。日历叠加层相对于 `<amp-date-picker>` 标签定位自身。

对于一个叠加日期选择器，你必须指定 `layout="container"` 并包含它将呈现的输入字段。

这个例子演示了在用户可以选择日期的表单中使用重叠日期选择器。日期选择器通过 `input-selector` 属性连接到一个特定的输入字段。

[sourcecode:html]
<form method="post" action-xhr="/form-post" target="_blank">
  <input type="text" name="name" placeholder="Your Name" required />
  <amp-date-picker
    type="single"
    mode="overlay"
    layout="container"
    input-selector="[name=date]"
  >
    <input type="text" name="date" placeholder="Your Date" />
  </amp-date-picker>
  <input type="submit" value="Subscribe" />
  <div submit-success>
    <template type="amp-mustache">
      Success! Thanks {% raw %}{{name}}{% endraw %} for choosing {% raw %}{{date}}{% endraw %}.
    </template>
  </div>
</form>
[/sourcecode]

在触摸设备上，`amp-date-picker` 处于叠加模式会自动将
`readonly` 属性添加 到其 `<input>` 元素。
这样可以防止意外打开设备的屏幕键盘。要选择退出此行为，请将 `touch-keyboard-editable` 属性添加到
`<amp-date-picker>` 元素。

<!-- TODO(cvializ): talk about why type="tel" is on the inputs -->

### 选择类型

`amp-date-picker` 将提供两种类型的日期选择：

- `single`: 在日期选择器中选择一个日期。
- `range`: 在日期选择器中选择一个日期范围。

#### `type="single"`

通过指定 `type="single"`，日期选择器将附加到单个输入，用户可以选择一个日期。这是默认选择类型。

[sourcecode:html]
<amp-date-picker type="single" layout="fixed-height" height="360">
</amp-date-picker>
[/sourcecode]

<amp-img alt="static single date picker" layout="fixed" src="https://github.com/ampproject/amphtml/raw/main/extensions/amp-date-picker/img/amp-date-picker-single-static.png" width="336" height="370">
  <noscript>
    <img alt="static single date picker" src="https://github.com/ampproject/amphtml/raw/main/extensions/amp-date-picker/img/amp-date-picker-single-static.png" width="336" height="370">
  </noscript>
</amp-img>

#### `type="range"`

通过指定 `type="range"`，日期选择器将附加到两个输入，并且用户可以选择带有开始日期和结束日期的日期范围。

[sourcecode:html]
<amp-date-picker type="range" layout="fixed-height" height="360">
</amp-date-picker>
[/sourcecode]

<amp-img alt="static single date picker" layout="fixed" src="https://github.com/ampproject/amphtml/raw/main/extensions/amp-date-picker/img/amp-date-picker-range-static.png" width="332" height="373">
  <noscript>
    <img alt="static single date picker" src="https://github.com/ampproject/amphtml/raw/main/extensions/amp-date-picker/img/amp-date-picker-range-static.png"  width="332" height="373">
  </noscript>
</amp-img>

### 日期格式

`amp-date-picker`属性接受ISO 8601和RFC 5545 RRULE格式的日期。

[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 将日期格式设置为 `YYYY-MM-DD`
并且是电子系统之间共享日期的标准。
例如， ISO 8601 将日期 February 28 2018 格式化为 `2018-02-28`.

[RFC 5545 Recurrence Rules (RRULEs)](https://icalendar.org/iCalendar-RFC-5545/3-3-10-recurrence-rule.html)
标准化了用于指定重复日期的格式。
例如， RFC 5545 将 Halloween 设置为 `RRULE:FREQ=YEARLY;BYMONTH=10;BYMONTHDAY=31`。
也可以使用更复杂的日期，例如美国感恩节假期，即每年的11月的第四个星期四： `RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=+4TH`。该API不便于记忆，但可以在线使用各种 [RRULE 生成器](https://jakubroztocil.github.io/rrule) 。

## 属性

### mode

指定如何呈现日期选择器。允许的值为：

- **`static`** (默认): 日期选择器呈现为交互式日历视图。
- **`overlay`**: 日期选择器日历视图不会呈现，直到用户交互在'`<amp-date-picker>`中嵌套必需的输入字段。

### type

指定日期选择器的选择类型。允许的值为：

- **`single`** (默认): 用户可以选择一个日期。
- **`range`**: 用户可以选择一个日期。

### input-selector <a name="input-selector"></a>

用于单个日期选择器输入的查询选择器。如果省略此选项，则日期选择器会自动生成一个隐藏的输入字段，并为其指定名称 `date` 或 `${id}-date` 使用日期选择器的ID。如果这些冲突中的任何一个与表单中的现有元素冲突，都会发出错误。

当`amp-date-picker`加载时，输入元素的值用于显示初始选择的日期。

通过[`src` attribute](#src)指定 `date` 属性来设置动态的初始日期。

[sourcecode:html]
<amp-date-picker
  type="single"
  mode="overlay"
  layout="container"
  input-selector="[name=deliverydate]"
>
  <input type="text" name="deliverydate" placeholder="Delivery Date" />
</amp-date-picker>
[/sourcecode]

### start-input-selector

日期范围选择器的开始日期输入的查询选择器。如果省略此选项，则日期选择器会自动生成一个隐藏的输入字段，并为其指定名称 `start-date` 或 `${id}-start-date` 使用日期选择器的ID。如果这些冲突中的任何一个与表单中的现有元素冲突，都会发出错误。

当 `amp-date-picker` 加载时，输入元素的值用于显示初始选择开始日期。

通过[`src` attribute](#src) 指定 `startDate` 属性来设置
动态地初始结束日期。

[sourcecode:html]
<input id="a2" />
<input id="b2" />
<amp-date-picker
  type="range"
  start-input-selector="#a2"
  end-input-selector="#b2"
  layout="fixed-height"
  height="360"
>
</amp-date-picker>
[/sourcecode]

### end-input-selector

日期范围选择器的结束日期输入的查询选择器。如果省略此选项，则日期选择器会自动生成一个隐藏的输入字段，并为其指定名称 `end-date` 或 `${id}-end-date` 使用日期选择器的ID。如果这些冲突中的任何一个与表单中的现有元素冲突，都会发出错误。

当 `amp-date-picker` 加载时，输入元素的值用于显示初始选择的结束日期。

通过[`src` attribute](#src)指定 `endDate` 属性来设置动态地初始结束日期。

[sourcecode:html]
<input id="a2" />
<input id="b2" />
<amp-date-picker
  type="range"
  start-input-selector="#a2"
  end-input-selector="#b2"
  layout="fixed-height"
  height="360"
>
</amp-date-picker>
[/sourcecode]

### min

用户可以选择的最早日期。必须将其格式化为ISO 8601日期。如果没有 `min` 属性，则当前日期为最短日期。

`min`可以在用户使用手势后更新该属性[`amp-bind`](https://amp.dev/documentation/components/amp-bind)。

### max

用户可以选择的最晚日期。必须将其格式化为ISO 8601日期。如果没有 `max` 属性，则日期选择器将没有最大日期。

`max` 可以在用户使用手势后更新该属性[`amp-bind`](https://amp.dev/documentation/components/amp-bind)。

### month-format

用于在日历视图中显示月份的格式。默认格式为：`"MMMM YYYY"`。

### format

用于在输入框中显示和解析日期的格式。默认格式为：`"YYYY-MM-DD"`。

### week-day-format

用于在日历视图中显示星期几的格式。如果不存在 `week-day-format`，则工作日将显示为工作日的第一个字符。

[sourcecode:html]
<amp-date-picker
  type="single"
  mode="overlay"
  layout="container"
  format="MM/DD/YYYY"
  week-day-format="ddd"
  input-selector="[name=date]"
>
  <input type="text" name="date" placeholder="Your Date" />
</amp-date-picker>
[/sourcecode]

### locale

用于呈现日历视图的语言环境。默认语言环境为 `"en"`。

### maximum-nights

在日期范围内，用户选择的住宿天数不得超过。默认值为`"0"`。
`"0"` 值允许用户选择无限数量的夜晚。

### minimum-nights

用户必须在日期范围内选择的夜晚数。默认值为`"1"`。
`"0"` 值允许用户为开始日期和结束日期选择相同的日期。

### number-of-months

在日历视图中一次显示的月份数。默认值为 `"1"`。

### first-day-of-week

指定为一周的第一天的日期（0-6）。默认值为 `"0"`（星期日）。

### blocked

以空格分隔的ISO 8601日期或RFC 5545 RRULE重复日期列表，以防止用户在日历上进行选择。

### highlighted

以空格分隔的ISO 8601日期或RFC 5545 RRULE重复日期列表以特殊样式显示，以突出显示以引起用户的注意。默认样式是日期上的蓝点。

### day-size

`px` 日历视图表中日期单元格的大小。默认值为 `39`。

[sourcecode:css]
.amp-date-picker-resize-bug .DayPicker_transitionContainer {
  min-height: 354px; /* 354px is the default. You must update it. */
}
[/sourcecode]

### allow-blocked-end-date

如果存在，则此属性允许用户在其选择的开始日期之后的第一个阻止日期选择结束日期。
默认情况下，此属性不存在。

### allow-blocked-ranges

如果存在，则此属性允许用户选择一个包含阻止日期的范围。
默认情况下，此属性不存在。

### src <a name="src"></a>

如果存在，`amp-date-picker`会请求JSON数据来动态填充某些属性，以及匹配日期列表和模板`id`来呈现日历中的日期。

如果你的日历数据是为用户定制的，或者经常更新，这些值应该在`src`JSON响应中指定，而不是在 `amp-date-picker` 元素中使用相应的属性。

下表列出了可以在JSON数据中指定的属性:

<table>
<tr>
<th width="30%"><code>src</code><br>property</th>
<th>Description</th>
</tr>
<tr>
<td><code>blocked</code></td>
<td>一个由ISO 8601单日期或RFC 5545重复日期组成的数组，在日历视图中作为阻塞呈现。用户无法选择这些日期。</td>
</tr>
<tr>
<td><code>date</code></td>
<td>指定最初选择的日期。在 <code>type="range"</code> 的日期选择器中，这是无效的。为了防止覆盖用户的输入，如果用户已经选择了一个日期，那么这个值将不起作用。</td>
</tr>
<tr>
<td><code>endDate</code></td>
<td>指定最初选择的结束日期。在一个日期选择器中 <code>type="single"</code> ，这是没有效果的。为了防止覆盖用户的输入，如果用户已经选择了结束日期，则此值将不起作用。</td>
</tr>
<tr>
<td><code>highlighted</code></td>
<td>一个由ISO 8601单日期或RFC 5545重复日期组成的数组，在日历视图中高亮显示。</td>
</tr>
<tr>
<td><code>startDate</code></td>
<td>用 <code>type="range"</code>指定日期选择器最初选择的开始日期。在一个日期选择器中 <code>type="single"</code>，这是没有效果的。为了防止覆盖用户的输入，如果用户已经选择了开始日期，那么这个值将不会起作用。</td>
</tr>
<tr>
<td><code>templates</code></td>
<td>模板属性是一个数组 <a href=#template-definition-objects>"模板定义对象"</a>。 这些对象有一个 <code>id</code> 属性和一个 <code>dates</code> 属性。</td>
</tr>
</tbody>
</table>

`src` 可以在用户使用手势后更新该属性 [`amp-bind`](https://github.com/ampproject/amphtml/blob/main/extensions/amp-date-picker/../amp-bind/amp-bind.md)。

#### 模板定义对象

该`dates`属性是ISO 8601单日期或RFC 5545 RRULE重复日期的数组。该`id`属性指定`id`日期选择器可用于在日历视图中呈现指定日期的模板的。

[sourcecode:json]
{
  "id": "my-template-id",
  "dates": [
    "2018-01-02",
    "FREQ=WEEKLY;DTSTART=20180101T000000Z;COUNT=52;WKST=SU;BYDAY=TU"
  ]
}
[/sourcecode]

如果在模板定义对象中未指定`dates`属性，则将使用具有给定`id`的模板作为默认模板，以呈现任何没有明确指定模板的日期。

[sourcecode:json]
{"id": "my-default-template-id"}
[/sourcecode]

_示例：通过 `src` 属性指定属性_

[sourcecode:json]
{
  "blocked": ["2018-02-14"],
  "highlighted": ["2018-02-15"],
  "templates": [
    {
      "id": "my-template-id",
      "dates": ["2018-01-01"]
    },
    {
      "id": "my-second-template-id",
      "dates": [
        "2018-01-02",
        "FREQ=WEEKLY;DTSTART=20180101T000000Z;COUNT=52;WKST=SU;BYDAY=TU"
      ]
    },
    {
      "id": "my-default-template-id"
    }
  ],
  "startDate": "2018-01-01",
  "endDate": "2018-02-02",
  "date": "2018-02-03"
}
[/sourcecode]

_示例：使用 `src` 属性进行标记_

[sourcecode:html]
<amp-date-picker
  src="https://www.example.com/date-data.json"
  layout="fixed-height"
  height="360"
>
  <template type="amp-mustache" date-template id="my-template-id">⚡️</template>
  <template type="amp-mustache" date-template id="my-second-template-id"
    >🌮</template
  >
  <template type="amp-mustache" date-template id="my-default-template-id"
    >{% raw %}{{D}}{% endraw %}</template
  >
</amp-date-picker>
[/sourcecode]

### 全屏

渲染选择器以填充可用的空间，例如在全屏灯箱中。这与效果最佳 `layout="fill"`。

[sourcecode:html]
<input on="tap:lightbox.open" placeholder="Start" id="start" />
<input on="tap:lightbox.open" placeholder="End" id="end" />
<button on="tap:dp.clear">Clear</button>
<amp-lightbox id="lightbox" layout="nodisplay">
  <amp-date-picker
    id="date-picker"
    layout="fill"
    fullscreen
    type="range"
    number-of-months="12"
    start-input-selector="#start"
    end-input-selector="#end"
    on="
      activate: lightbox.open;
      deactivate: lightbox.close"
  ></amp-date-picker>
</amp-lightbox>
[/sourcecode]

<amp-img alt="static single date picker" layout="fixed" src="https://github.com/ampproject/amphtml/raw/main/extensions/amp-date-picker/img/amp-date-picker-lightbox-fullscreen.png" width="320" height="571">
  <noscript>
    <img alt="static single date picker" src="https://github.com/ampproject/amphtml/raw/main/extensions/amp-date-picker/img/amp-date-picker-lightbox-fullscreen.png" width="320" height="571">
  </noscript>
</amp-img>

### open-after-select

如果存在，则在用户选择一个或多个日期后，使日期选择器覆盖图保持打开状态。默认情况下，此属性不存在。

### open-after-clear

如果存在，则在用户清除日期后将日期选择器保持打开状态。默认情况下，此属性不存在。

### hide-keyboard-shortcuts-panel

如果存在，则隐藏选择器底部的键盘快捷方式面板。默认情况下，此属性不存在。

### 常见属性

该元素包括扩展到AMP组件的 [常见属性](https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes) 。

## 动作

这些动作可由其他组件使用该 `on` 属性触发。例如 `on="tap: date-picker.setDate(date=state.value)"`

阅读有关 [AMP Actions and Events](https://www.ampproject.org/docs/interaction_dynamic/amp-actions-and-events)更多信息。

### clear

`clear` 操作清除单个日期选择器中的一个或多个日期值或具有指定`id`的日期范围选择器，例如 `date-picker`。

[sourcecode:html]
<button on="tap: date-picker.clear">Clear</button>
[/sourcecode]

### setDate

该 `setDate` 操作将 `date` 参数的值分配给具有指定值的单个日期选择器 `id`，例如`date-picker`。

[sourcecode:html]
<button on="tap: date-picker.setDate(date='2018-01-01')">
  Set to Jan 1, 2018
</button>
[/sourcecode]

### setDates

`setDate` 操作将`start`和`end`参数的值赋给具有指定`id`的日期范围选择器，例如`date-picker`。

[sourcecode:html]
<button on="tap: date-picker.setDates(start='2018-01-01', end='2018-01-07')">
  Set to Jan 1, 2018 through Jan 7, 2018
</button>
[/sourcecode]

### today

`today` 操作指定当前日期的值，加上 `offset` 参数，并将其添加到具有指定`id`的单个日期选择器，例如`date-picker`。`offset`参数值可以是任何整数。

[sourcecode:html]
<button on="tap: date-picker.today">Today</button>
<button on="tap: date-picker.today(offset=1)">Tomorrow</button>
<button on="tap: date-picker.today(offset=-1)">Yesterday</button>
[/sourcecode]

### startToday

`startToday` 操作指定当前日期的值，再加上`offset`参数，将其添加到具有指定`id`的日期范围选择器，例如`date-picker`。`offset`参数值可以是任何整数。

[sourcecode:html]
<button on="tap: date-picker.startToday">Today</button>
<button on="tap: date-picker.startToday(offset=1)">Tomorrow</button>
<button on="tap: date-picker.startToday(offset=-1)">Yesterday</button>
[/sourcecode]

`startToday`操作可以与`endToday`操作结合使用选择具有偏移的范围。

[sourcecode:html]
<button
  on="tap:date-picker.startToday(offset=7), date-picker.endToday(offset=14)"
>
  Next week
</button>
[/sourcecode]

### endToday

`endToday` 操作指定当前日期的值，再加上`offset`参数，将其添加到具有指定`id`的日期范围选择器，例如`date-picker`。`offset`参数值可以是任何整数。

[sourcecode:html]
<button on="tap: date-picker.endToday">Today</button>
<button on="tap: date-picker.endToday(offset=1)">Tomorrow</button>
<button on="tap: date-picker.endToday(offset=-1)">Yesterday</button>
[/sourcecode]

`endToday`操作可以与`startToday`操作结合使用选择具有偏移的范围。

[sourcecode:html]
<button
  on="tap:date-picker.startToday(offset=7), date-picker.endToday(offset=14)"
>
  Next week
</button>
[/sourcecode]

## Events

这些事件可能会触发使用`on`属性对其他AMP组件执行的操作。例如`on="activate: my-lightbox.open"`

阅读有关[AMP Actions and Events](https://amp.dev/documentation/guides-and-tutorials/learn/amp-actions-and-events)更多信息。

### activate

`activate`当用户开始与日历视图进行交互时，即打开叠加层时，日期选择器将触发事件。

### deactivate

`deactivate`当用户结束与日历视图的交互时，即当叠加层关闭时，日期选择器将触发事件。

### select

`select` 当用户选择日期或日期范围时，日期选择器将触发事件。选择日期范围时，同时选择结束日期和开始日期时将发出事件。
该 `select` 事件包含以下属性。

对于单个日期选择器：

<table>
<tr>
<th width="30%">属性</th>
<th>描述</th>
</tr>
<tr>
<td><code>date</code></td>
<td>选择的日期。</td>
</tr>
<tr>
<td><code>id</code></td>
<td>应用于此日期的第一个<a href="#templates">日期模板</a>的<code>id</code>属性。</td>
</tr>
</table>

[sourcecode:html]
<amp-date-picker
  type="single"
  on="select: AMP.setState({date: event.date, templateSelected: event.id})"
  …
>
  <!-- … -->
</amp-date-picker>
[/sourcecode]

For a date range picker:

<table>
<tr>
<th width="30%">属性</th>
<th>描述</th>
</tr>
<tr>
<td><code>dates</code></td>
<td>所选日期的数组。 数组中的每个对象包含了来自单个日期选择器 <code>change</code> 事件对象的 <code>date</code> 和 <code>id</code> 属性。</td>
</tr>
<tr>
<td><code>start</code></td>
<td>日期范围 (<code>event.dates[0]</code>) 中第一个日期的快捷方式。
</tr>
<tr>
<td><code>end</code></td>
<td>日期范围 (<code>event.dates[event.dates.length - 1]</code>) 中最后一个日期的快捷方式。
</tr>
</table>

[sourcecode:html]
<amp-date-picker
  type="range"
  on="select: AMP.setState({dates: event.dates, firstTemplate: event.start.id})"
  …
>
  <!-- … -->
</amp-date-picker>
[/sourcecode]

## Styling

### Templates <a name="templates"></a>

`amp-date-picker` 提供一种标记API，以呈现某些日期的模板以及日历视图下方的其他信息区域。

#### date-template

`amp-date-picker` 使用HTML标记中指定的模板来呈现日期。这些模板只能用于不需要经常更新的日期，例如假期。要在日历日中呈现特殊信息（例如销售天数，金额或其他必须经常更改的信息），请考虑 [使用 `src` 属性](#src)。
使用 `src` 可以防止AMP文档混乱显示过期信息。

一个 `date-template` 必须有一个 `dates` 或 `default` 属性。

- **dates**: ISO 8601单日期或RFC 5545 RRULE重复日期的空格分隔列表。模板内容将针对与属性中的日期匹配的日期进行渲染。
- **default**: 如果存在 `default` 属性，则模板内容将针对与现有模板不匹配的所有日期呈现。

日期选择器提供胡子变量以在模板中呈现。这些变量是ISO 8601格式的字符串值如 `DD`，`D`，`X`，等。

`date-template`可能包含任何有效的AMP内容，并且仅在日历视图首次呈现后才呈现。

[sourcecode:html]
<amp-date-picker layout="fixed-height" height="360">
  <!-- Render the "party" emoji on New Years Day 2018 -->
  <template type="amp-mustache" date-template dates="2018-01-01">🎉</template>
  <!-- Render the "taco" emoji every Tuesday for 52 weeks starting 2018-01-01 -->
  <template
    type="amp-mustache"
    date-template
    dates="FREQ=WEEKLY;DTSTART=20180101T000000Z;COUNT=52;WKST=SU;BYDAY=TU"
    >🌮</template
  >
  <!-- Render an image -->
  <template type="amp-mustache" date-template dates="2018-01-02">
    <amp-img layout="fixed-height" height="39" src="./example.jpg"></amp-img>
  </template>
  <!-- Renders dates in the two-digit day format -->
  <template type="amp-mustache" date-template default>{% raw %}{{DD}}{% endraw %}</template>
</amp-date-picker>
[/sourcecode]

#### info-template

`info-template` 包含要在下面的信息区域中呈现的标记日历视图。`info-template` 可以包含任何有效的AMP内容，并且仅在日历视图首次呈现后呈现。

[sourcecode:html]
<amp-date-picker layout="fixed-height" height="360">
  <template type="amp-mustache" info-template>
    Warning: Tacos are only available on Tuesday
  </template>
</amp-date-picker>
[/sourcecode]

<!-- ## TODO(cvializ): document styling -->

<!-- ## TODO(cvializ): document tooltips -->

## Validation

请参阅 AMP 验证工具规范中的 [amp-date-picker rules](https://github.com/ampproject/amphtml/blob/main/extensions/amp-date-picker/validator-amp-date-picker.protoascii)。
