---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: 利用数据绑定和类似于 JS 的简单表达式，使元素因应用户操作或数据变更而变化。
---



通过数据绑定和表达式添加自定义互动方式。


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
    <td class="col-fourty"><strong>必需的脚本</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-bind" src="https://ampjs.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">入门级代码示例（带注释）</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">带链接的图片轮播界面示例（带注释）</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">电子商务产品页面示例（带注释）</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>教程</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">制作交互式 AMP 网页</a></td>
  </tr>
</table>

# 概述 <a name="overview"></a>

借助 `amp-bind` 组件，您可以通过数据绑定以及类似于 JS 的表达式，为 AMP 网页添加自定义的有状态互动方式。

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>观看此视频，简要了解 amp-bind。</figcaption></figure>

# 一个简单示例 <a name="a-simple-example"></a>

在下面的示例中，点按相应按钮可将 `<p>` 元素的文本从“Hello World”更改为“Hello amp-bind”。

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="ll callout('注意：</b><a class="type_note"]
为了确保性能并避免内容意外跳转，`amp-bind` 不会在网页加载时对表达式求值。这意味着，应该为视觉元素指定默认状态，而不是依赖 `amp-bind` 进行初始呈现。
[/tip]

### 运作方式 <a name="how-does-it-work"></a>

`amp-bind` 包含三个主要组件：

1. [状态](#state)：涵盖整个文档的可变 JSON 状态。在上面的示例中，在点按相应按钮之前，状态为空。在点按相应按钮之后，状态为 `{foo: 'amp-bind'}`。
2. [表达式](#expressions)：类似于 JavaScript 的表达式，可引用**状态**。上面的示例中包含单个表达式，即 `'Hello ' + foo`，该表达式用于将字符串字面量 `'Hello '` 和状态变量 `foo` 连接在一起。一个表达式中最多可以使用 100 个操作数。
3. [绑定](#bindings)：一些采用 `[property]` 形式的特殊属性，用于将元素的属性关联到**表达式**。上面的示例中包含单个绑定，即 `[text]`，该绑定用于在表达式的值每次发生更改时更新 `<p>` 元素的文本。

`amp-bind` 会特别注意确保在 AMP 网页上实现出色的速度、安全性和性能。

### 一个稍微复杂的示例 <a name="a-slightly-more-complex-example"></a>

```html
<!-- 将复杂的嵌套 JSON 数据存储在 <amp-state> 元素中。-->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">This is a dog.</p>

<!-- 也可以使用 [class] 添加或移除 CSS 类。 -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Each animal has a different background color.
</p>

<!-- 或通过 [src] 绑定更改图片的 src。-->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<button on="tap:AMP.setState({currentAnimal: 'cat'})">Set to Cat</button>
```

  按下相应按钮后：

  1. 系统会根据定义为 `'cat'` 的 `currentAnimal` 对**状态**进行更新。
  1. 系统会对依赖于 `currentAnimal` 的**表达式**进行求值：

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. 系统会对依赖于更改后的表达式的**绑定**进行更新：

    * 第一个 `<p>` 元素的文本将显示为“This is a cat.”
    * 第二个 `<p>` 元素的 `class` 属性将为“redBackground”。
    * `amp-img` 元素将显示一只猫的图片。</li>

  [tip type="ll callout('提示：</b><a class="type_success"]
如需查看此示例的带代码注释版本，请[观看**在线演示**](https://ampbyexample.com/components/amp-bind/)！
[/tip]

# 详细说明 <a name="details"></a>

# 状态 <a name="state"></a>

每个使用 `amp-bind` 的 AMP 文档都包含涵盖整个文档的可变 JSON 数据（即**状态**）。

# 通过 `amp-state` 对状态进行初始化 <a name="initializing-state-with-amp-state"></a>

可通过 `amp-state` 组件对 `amp-bind` 的状态进行初始化：

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>
```

[表达式](#expressions)可通过点语法引用状态变量。在此示例中，`myState.foo` 的求解结果为 `"bar"`。

* `<amp-state>` 元素的子级 JSON 不能超过 100KB。
* `<amp-state>` 元素还可以指定 CORS 网址，而不是子级 JSON 脚本。有关详情，请参阅[附录](#amp-state-specification)。

# 刷新状态 <a name="refreshing-state"></a>

此组件支持 `refresh` 操作，该操作可用于刷新状态内容。

```html
<amp-state id="amp-state" ...></amp-state>
<!-- 点击该按钮将刷新并重新获取 amp-state 中的 json。 -->
<button on="tap:amp-state.refresh"></button>
```

# 通过 `AMP.setState()` 更新状态 <a name="updating-state-with-ampsetstate"></a>

[`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) 操作可将对象字面量合并到状态中。例如，当用户按下方的按钮后，`AMP.setState()` 会将对象字面量与状态进行[深度合并](#deep-merge-with-ampsetstate)。

```html
<!-- 与 JavaScript 类似，您可以在
       对象字面量的值中引用现有变量。 -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

一般来说，嵌套对象的合并深度上限为 10。所有变量（包括由 `amp-state` 引入的变量）都可以被覆盖。

被特定事件触发后，`AMP.setState()` 还可以访问 `event` 属性的事件相关数据。

```html
<!-- 此 <input> 元素的“change”事件包含
     可通过“event.value”引用的“value”变量。 -->
<input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# 通过 `AMP.pushState()` 修改历史记录 <a name="modifying-history-with-amppushstate"></a>

[`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) 操作与 `AMP.setState()` 类似，只不过它还会将新条目推送到浏览记录堆栈。弹出此浏览记录条目（例如，通过执行返回操作）将会恢复由 `AMP.pushState()` 设置的变量的上一个值。

例如：
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* 点按相应按钮会将变量 `foo` 设为 123，并推送新的历史记录条目。
* 执行返回操作会将 `foo` 恢复到之前的值“bar”（相当于调用 `AMP.setState({foo: 'bar'})`）。

# 表达式 <a name="expressions"></a>

表达式与 JavaScript 类似，但两者存在一些重要区别。

# 与 JavaScript 的区别 <a name="differences-from-javascript"></a>

* 表达式只能访问所在文档的[状态](#state)。
* 表达式**无权**访问 `window` 或 `document` 等全局属性。
* 只能使用[列入白名单的函数](#allow-listed-functions)和运算符。
* 一般不允许使用自定义函数、类和循环。允许将箭头函数用作参数，如 `Array.prototype.map`。
* 未定义的变量和 array-index-out-of-bound 会返回 `null`，而不是 `undefined`，也不会引发错误。
* 为了确保性能，单个表达式中目前最多可以使用 50 个操作数。如果这无法满足您的使用需求，请[与我们联系](https://github.com/ampproject/amphtml/issues/new)。

如需查看完整的表达式语法和实现，请参阅 [bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expr-impl.jison) 和 [bind-expression.js](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expression.js)。

# 示例 <a name="examples"></a>

以下都是有效的表达式：

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# 列入白名单的函数 <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>对象类型</th>
    <th>函数</th>
    <th>示例</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Array</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code> (not-in-place)<br>
      <code>splice</code> (not-in-place)<br>
    </td>
    <td>
      <pre>// 返回 [1, 2, 3]。
          [3, 2, 1].sort()</pre>
        <pre>// 返回 [1, 3, 5]。
            [1, 2, 3].map((x, i) =&gt; x + i)</pre>
          <pre>// 返回 6。
              [1, 2, 3].reduce((x, y) =&gt; x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Number</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// 返回 3。
                (3.14).toFixed()</pre>
              <pre>// 返回“3.14”。
                  (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>String</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// 返回“abcdef”。
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Math</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// 返回 1。
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// 返回 ['a', 'b']。
                            keys({a: 1, b: 2})</pre>
                          <pre>// 返回 [1, 2]。
                              values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// 返回 'Hello%20world'。
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup>包含单个参数的箭头函数不能包含英文括号，例如，应使用 `x => x + 1`，而不是 `(x) =>; x + 1`。此外，`sort()` 和 `splice()` 会返回修改后的副本，而不是原地操作。

<sup>2</sup>静态函数没有命名空间，例如，应使用 `abs(-1)`，而不是 `Math.abs(-1)`。

# 通过 `amp-bind-macro` 定义宏 <a name="defining-macros-with-amp-bind-macro"></a>

您可以通过定义 `amp-bind-macro` 重复使用 `amp-bind` 表达式片段。借助 `amp-bind-macro` 元素，您可以定义一个采用零个或多个参数并引用当前状态的表达式。您可以像调用函数一样调用宏，只需从文档中的任意位置引用宏的 `id` 属性值即可。

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  The circle has an area of <span [text]="circleArea(myCircle.radius)">0</span>.
</div>

```

宏还可以调用在其之前定义的其他宏，<i></i>但无法以递归方式调用自身。

# 绑定 <a name="bindings"></a>

**绑定** 是一种采用 `[property]` 形式的特殊属性，用于将元素的属性关联到[表达式](#expressions)。您还可以通过 `data-amp-bind-property` 形式使用另一种与 XML 兼容的语法。

当**状态**发生变化时，系统会对表达式重新求值，并根据新的表达式结果更新绑定元素的属性。

`amp-bind` 支持对以下四种元素状态进行数据绑定：

<table>
  <tr>
    <th>类型</th>
    <th>属性</th>
    <th>详细说明</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>大多数文本元素都支持该类型。</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/class">CSS 类</a></td>
    <td><code>[class]</code></td>
    <td>表达式结果必须是以空格分隔的字符串。</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/hidden"><code>hidden</code> 属性</a></td>
    <td><code>[hidden]</code></td>
    <td>应为布尔表达式。</td>
  </tr>
  <tr>
    <td><a href="../../../documentation/components/index.html">AMP 元素</a>大小</td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>用于更改 AMP 元素的宽度和/或高度。</td>
  </tr>
  <tr>
    <td>特定于元素的属性</td>
    <td><a href="#element-specific-attributes">各种</a></td>
    <td></td>
  </tr>
</table>

关于绑定的注意事项：

* 为了安全起见，不允许绑定到 `innerHTML`。
* 对于不安全的值（如 `javascript:`），系统会对所有属性绑定进行净化处理。
* 系统会根据布尔表达式的结果切换布尔值属性。例如：`<amp-video [controls]="expr"...>`。当 `expr` 的求解结果为 `true` 时，`<amp-video>` 元素具有 `controls` 属性。当 `expr` 的求解结果为 `false` 时，系统会移除 `controls` 属性。
* 编写 XML（如 XHTML、JSX）或通过 DOM API 编写属性时，属性名称中的括号字符 `[` 和 `]` 可能会带来问题。在这些情况下，请使用替代语法 `data-amp-bind-x="foo"`，而不是 `[x]="foo"`。

# 特定于元素的属性 <a name="element-specific-attributes"></a>

仅允许绑定到以下组件和属性：

<table>
  <tr>
    <th>组件</th>
    <th>属性</th>
    <th>行为</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">更改显示的 Brightcove 视频。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>更改当前显示的幻灯片索引。<a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">查看示例</a>。</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      设置可选择的最早日期<br>
      设置可选择的最晚日期</td>
    </tr>
    <tr>
      <td><code>&lt;amp-google-document-embed&gt;</code></td>
      <td><code>[src]</code><br><code>[title]</code></td>
      <td>在更新后的网址上显示文档。<br>更改文档的标题。</td>
    </tr>
    <tr>
      <td><code>&lt;amp-iframe&gt;</code></td>
      <td><code>[src]</code></td>
      <td>更改 iframe 的来源网址。</td>
    </tr>
    <tr>
      <td><code>&lt;amp-img&gt;</code></td>
      <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
      <td>绑定到 <code>[src]</code> 时，请务必同时绑定到 <code>[srcset]</code>，以便绑定在缓存中正常发挥作用。<br>请参阅相应的 <a href="amp-img.md#attributes">amp-img 属性</a>。</td>
    </tr>
    <tr>
      <td><code>&lt;amp-lightbox&gt;</code></td>
      <td><code>[open]</code><sup>*</sup></td>
      <td>
        切换灯箱的显示。提示：在灯箱关闭时，使用 <code>on="lightboxClose: AMP.setState(...)"</code> 更新变量。
      </td>
    </tr>
    <tr>
      <td><code>&lt;amp-list&gt;</code></td>
      <td><code>[src]</code></td>
      <td>
        如果表达式为字符串，则从字符串网址获取并呈现 JSON。
        如果表达式为对象或数组，则呈现表达式数据。
      </td>
    </tr>
    <tr>
      <td><code>&lt;amp-selector&gt;</code></td>
      <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
      <td>更改当前所选的子元素，<br>这些元素由其 <code>option</code> 属性值标识。支持多个选择项对应的值列表（以英文逗号分隔）。<a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">查看示例</a>。</td>
    </tr>
    <tr>
      <td><code>&lt;amp-state&gt;</code></td>
      <td><code>[src]</code></td>
      <td>从新网址获取 JSON，并将其合并到现有状态。<em>请注意，以下更新将忽略 <code>&lt;amp-state&gt;</code> 元素，以防止出现循环。</em></td>
    </tr>
    <tr>
      <td><code>&lt;amp-video&gt;</code></td>
      <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
      <td>请参阅相应的 <a href="amp-video.md#attributes">amp-video 属性</a>。</td>
    </tr>
    <tr>
      <td><code>&lt;amp-youtube&gt;</code></td>
      <td><code>[data-videoid]</code></td>
      <td>更改显示的 YouTube 视频。</td>
    </tr>
    <tr>
      <td><code>&lt;a&gt;</code></td>
      <td><code>[href]</code></td>
      <td>更改链接。</td>
    </tr>
    <tr>
      <td><code>&lt;button&gt;</code></td>
      <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
      <td>请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#Attributes">button 属性</a>。</td>
    </tr>
    <tr>
      <td><code>&lt;details&gt;</code></td>
      <td><code>[open]</code></td>
      <td>请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/details#Attributes">details 属性</a>。</td>
    </tr>
    <tr>
      <td><code>&lt;fieldset&gt;</code></td>
      <td><code>[disabled]</code></td>
      <td>启用或停用字段集。</td>
    </tr>
    <tr>
      <td><code>&lt;image&gt;</code></td>
      <td><code>[xlink:href]</code><br>
        <td> 请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/image">image 属性</a>。</td>
      </tr>
      <tr>
        <td><code>&lt;input&gt;</code></td>
        <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
        <td>请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#Attributes">input 属性</a>。</td>
      </tr>
      <tr>
        <td><code>&lt;option&gt;</code></td>
        <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
        <td>请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/option#Attributes">option 属性</a>。</td>
      </tr>
      <tr>
        <td><code>&lt;optgroup&gt;</code></td>
        <td><code>[disabled]</code><br><code>[label]</code></td>
        <td>请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/optgroup#Attributes">optgroup 属性</a></td>
      </tr>
      <tr>
        <td><code>&lt;select&gt;</code></td>
        <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
        <td>请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select#Attributes">select 属性</a>。</td>
      </tr>
      <tr>
        <td><code>&lt;source&gt;</code></td>
        <td><code>[src]</code><br><code>[type]</code></td>
        <td>请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source#Attributes">source 属性</a>。</td>
      </tr>
      <tr>
        <td><code>&lt;track&gt;</code></td>
        <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
        <td>请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/track#Attributes">track 属性</a>。</td>
      </tr>
      <tr>
        <td><code>&lt;textarea&gt;</code></td>
        <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
        <td>请参阅相应的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea#Attributes">textarea 属性</a>。</td>
      </tr>
    </table>

    <sup>*</sup>表示可绑定的属性，而且没有不可绑定的对应项。

# 调试 <a name="debugging"></a>

在开发模式下进行测试（使用网址片段 `#development=1`），以便在开发过程中发现警告和错误，并可以使用特殊的调试函数。

# 警告 <a name="warnings"></a>

在开发模式下，如果绑定属性的默认值与相应表达式的初始结果不一致，`amp-bind` 会发出警告。这有助于防止出现因其他状态变量发生变化而导致的意外变化。例如：

```html
<!-- 该元素的默认类值 ('def') 与 [class] ('abc') 的表达式结果不一致，因此在开发模式下将发出警告。-->

<p class="def" [class]="'abc'"></p>

```

在开发模式下，当解除对未定义变量或属性的引用时，`amp-bind` 也会发出警告。这同样有助于防止出现因 `null` 表达式结果而导致的意外变化。例如：

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state></p>

<!-- amp-state#myAmpState 没有 `bar` 变量，因此在开发模式下将发出警告。-->
<p [text]="myAmpState.bar">Some placeholder text.</p>
```

# 错误 <a name="errors"></a>

使用 `amp-bind` 时，可能会遇到以下几种运行时错误。

<table>
  <tr>
    <th>类型</th>
    <th>消息</th>
    <th>建议</th>
  </tr>
  <tr>
    <td class="col-thirty">无效绑定</td>
    <td class="col-fourty"><em>不允许绑定到 &lt;P> 上的 [someBogusAttribute]。</em></td>
    <td class="col-thirty">仅使用<a href="#element-specific-attributes">列入白名单的绑定</a>。</td>
  </tr>
  <tr>
    <td>语法错误</td>
    <td><em>…中存在表达式编译错误</em></td>
    <td>确认表达式是否存在拼写错误。</td>
  </tr>
  <tr>
    <td>函数未列入白名单</td>
    <td><em>alert 不是受支持的函数。</em></td>
    <td>仅使用<a href="#allow-listed-functions">列入白名单的函数</a>。</td>
  </tr>
  <tr>
    <td>结果已经过净化处理</td>
    <td><em>对于 [href]，“javascript:alert(1)”不是有效的结果。</em></td>
    <td>避免使用加入黑名单的网址协议或表达式，否则会导致无法通过 AMP 验证工具的验证。</td>
  </tr>
  <tr>
    <td>CSP 违规</td>
    <td><em>被拒绝通过“blob:...”创建工作器，因为它违反了《内容安全政策》的以下指令…</em></td>
    <td>将 <code>default-src blob:</code> 添加到来源的《内容安全政策》。<code>amp-bind</code> 会将耗用资源较多的工作委派给<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">专门的网络工作器</a>，以确保实现良好的性能。</td>
  </tr>
</table>

# 调试状态 <a name="debugging-state"></a>

利用 `AMP.printState()` 将当前状态输出到控制台。

# 附录 <a name="appendix"></a>

# `<amp-state>` 规范 <a name="amp-state-specification"></a>

`amp-state` 元素可以包含子级 `<script>` 元素，**也可以** 包含 `src` 属性（其中包含指向远程 JSON 端点的 CORS 网址），但不能同时包含这两者。

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>

<amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# XHR 批处理 <a name="xhr-batching"></a>

AMP 会对向 JSON 端点发出的 XMLHttpRequest (XHR) 进行批处理，也就是说，您可以在 AMP 网页上将单个 JSON 数据请求用作多个使用方（如多个 `amp-state` 元素）的数据源。例如，如果您的 `amp-state` 元素向某个端点发出 XHR，那么在该 XHR 传输期间，向同一端点发送的所有后续 XHR 都不会触发，系统将只返回第一个 XHR 的结果。

# 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>远程端点的网址，该端点将返回 JSON，以便更新此 <code>amp-state</code>。这必须是 CORS HTTP 服务。
      <code>src</code> 属性支持所有标准网址变量替换。如需了解详情，请参阅<a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md">替换指南</a>。
          [tip type="important"]
        该端点必须符合 <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">AMP 中的 CORS 请求</a>规范中规定的要求。
        [/tip]</td>
    </tr>
    <tr>
      <td width="40%"><strong>credentials（可选）</strong></td>
      <td>将 <code>credentials</code> 选项定义为通过 <a href="https://fetch.spec.whatwg.org/">Fetch API</a> 指定的值。
        <ul>
          <li>支持的值：`omit`、`include`</li>
          <li>默认值：`omit`</li>
        </ul>
        要发送凭据，请传递 <code>include</code> 的值。如果此值已设置，响应必须遵循 <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">AMP CORS 安全指南</a>。</td>
      </tr>
    </table>

# 通过 `AMP.setState()` 进行深度合并 <a name="deep-merge-with-ampsetstate"></a>

调用 `AMP.setState()` 时，`amp-bind` 会将所提供的对象字面量与当前状态进行深度合并。除了以递归方式合并的嵌套对象之外，对象字面量的所有变量都会直接写入到状态。状态中的基元和数组始终会被对象字面量中的同名变量覆盖。

请参考以下示例：

```javascript
{
  <!-- 状态为空 -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

按下第一个按钮后，状态会更改为：

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

按下第二个按钮后，`amp-bind` 会以递归方式将对象字面量参数 `{employee: {age: 64}}` 合并到现有状态。

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

`employee.age` 已更新，但 `employee.name` 和 `employee.vehicle` 键未发生变化。

请注意，如果通过包含循环引用的对象字面量调用 `AMP.setState()`，`amp-bind` 会抛出错误。

# 移除变量 <a name="circular-references"></a>

在 `AMP.setState()` 中将现有状态变量的值设为 `null` 可移除该变量。从上一个示例中的状态开始，按下：

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

会将状态更改为：

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

同样，按下：

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

会将状态更改为：

```javascript
{
  <!-- 状态为空 -->
  }
```

# 表达式语法 <a name="expression-grammar"></a>

`amp-bind` 表达式的语法，与 BNF 语法类似：

```text
expr:
    operation
  | invocation
  | member_access
  | '(' expr ')'
  | variable
  | literal

operation:
    '!' expr
  | '-' expr
  | '+' expr
  | expr '+' expr
  | expr '-' expr
  | expr '*' expr
  | expr '/' expr
  | expr '%' expr
  | expr '&&' expr
  | expr '||' expr
  | expr '<=' expr
  | expr '<' expr
  | expr '>=' expr
  | expr '>' expr
  | expr '!=' expr
  | expr '==' expr
  | expr '?' expr ':' expr

invocation:
    expr '.' NAME args

args:
    '(' ')'
  | '(' array ')'
  ;

member_access:
    expr member
  ;

member:
    '.' NAME
  | '[' expr ']'

variable:
    NAME
  ;

literal:
    STRING
  | NUMBER
  | TRUE
  | FALSE
  | NULL
  | object_literal
  | array_literal

array_literal:
    '[' ']'
  | '[' array ']'

array:
    expr
  | array ',' expr

object_literal:
    '{' '}'
  | '{' object '}'

object:
    key_value
  | object ',' key_value

key_value:
  expr ':' expr
```
