---
$title: amp-list
$category@: dynamic-content
formats:
  - websites
  - email
  - stories
teaser:
  text:  동적으로 데이터를 다운로드하고 템플릿을 사용하여 목록 항목을 생성합니다.
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



CORS JSON 엔드포인트에서 동적으로 콘텐츠를 가져오고 제공된
템플릿을 사용하여 렌더링합니다.

<table>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-list/">amp-list example</a>을 참조하세요.</td>
  </tr>
</table>

## 사용 <a name="usage"></a>

`<amp-list>` 구성요소는 CORS JSON 엔드포인트에서 동적 콘텐츠를 가져옵니다. 엔드포인트의 응답에는 지정된 템플릿에서 렌더링되는 데이터가 포함되어 있습니다.

[tip type="important"]
엔드포인트에서 [AMP의 CORS 요청](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) 사양에 지정된 요구 사항을 구현해야 합니다.
[/tip]

다음 두 방법 중 하나로 템플릿을 지정할 수 있습니다.

* 기존 `template` 또는 `script` 요소의 ID를 참조하는 `template` 속성
* `amp-list` 요소 내에 직접 중첩된 `template` 또는 `script` 요소

템플릿에 관한 자세한 내용은 [AMP HTML 템플릿](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md)을 참조하세요.

*예: 동적 목록 표시*

다음 예에서는 URL과 제목을 포함하는 JSON 데이터를 검색하고 중첩된 [amp-mustache template](amp-mustache.md)의 콘텐츠를 렌더링합니다.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

다음은 사용한 JSON 파일입니다.

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
가져온 콘텐츠의 스타일을 지정하는 방법은 다음과 같습니다.

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
  }
```

## 동작 <a name="behavior"></a>

AMP 캐시에서 문서를 제공하는 경우에도 항상 클라이언트에서 요청합니다. 현재 표시 영역에서 요소가 얼마나 멀리 떨어져 있는지에 따라 일반 AMP 규칙을 사용하여 로드를
트리거합니다.

로드 후에 `<amp-list>`에 추가 공간이 필요한 경우 일반 AMP 흐름을 사용하여 높이를 업데이트하도록 AMP 런타임에
요청합니다. AMP 런타임에서 새로운 높이에 대한 요청을 처리할 수 없으면
사용 가능한 경우 `overflow` 요소를 표시합니다. 그러나 문서 하단에
일반적으로 `<amp-list>` 요소를 게재하면 AMP 런타임에서 크기를 조정할 수 있음을 거의 항상
보장합니다.

기본적으로 `<amp-list>`는 `list` ARIA 역할을 목록 요소에 추가하고 `listitem` 역할을 템플릿을 통해 렌더링한
항목 요소에 추가합니다.

### XHR 배치 <a name="xhr-batching"></a>

AMP에서 XMLHttpRequests(XHRs)를 JSON 엔드포인트에 배치합니다. 즉, AMP 페이지에서 여러 소비자(예: 여러 `<amp-list>` 요소)의 데이터 소스로 단일 JSON 데이터 요청을 사용할 수 있습니다.  예를 들어 `<amp-list>`에서 엔드포인트에 대해 XHR을 작업하는 경우 XHR이 진행되는 동안 동일한 엔드포인트에 대한 모든 후속 XHR이 트리거되지 않고, 대신 첫 번째 XHR의 결과를 반환합니다.

`<amp-list>`에서 [`items`](#items-optional) 속성을 사용하여 JSON 응답의 하위 세트를 렌더링할 수 있으므로, 여러 `<amp-list>` 요소에서 서로 다른 콘텐츠를 렌더링하지만 단일 XHR을 공유할 수 있습니다.

### 오버플로 지정 <a name="specifying-an-overflow"></a>

선택적으로 `<amp-list>` 요소에는 `overflow` 속성이 있는 요소를 포함할 수 있습니다. AMP 런타임에서 요청한 대로 `<amp-list>` 요소의 크기를 조정할 수 없으면 이 요소가 표시됩니다.

*예: 목록에 추가 공간이 필요한 경우 오버플로 표시*

다음 예에서는 이미지와 제목의 목록을 표시합니다. `<amp-list>` 콘텐츠에 사용 가능한 것보다 많은 공간이 필요하면 AMP 런타임에서 오버플로 요소를 표시합니다.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

다음은 `overflow`의 CSS입니다.

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### 자리표시자 및 대체 <a name="placeholder-and-fallback"></a>

선택적으로 `<amp-list>`에서는 자리표시자 및/또는 대체를 지원합니다.

* *자리표시자*는 `placeholder` 속성을 사용하는 하위 요소입니다. 이 요소는 `<amp-list>`가 성공적으로 로드될 때까지 표시됩니다. 대체도 제공되는 경우 `<amp-list>`를 로드하지 못하면 자리표시자를 숨깁니다.
* *대체*는 `fallback` 속성을 사용하는 하위 요소입니다. `<amp-list>`를 로드하지 못하면 이 요소가 표시됩니다.

[자리표시자 및 대체](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)에 관해 자세히 알아보세요. 하위 요소는 자리표시자와 대체 중 하나여야 합니다.

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### 데이터 새로고침 <a name="refreshing-data"></a>

`<amp-list>` 요소에서는 다른 요소가 `on="tap:..."` 속성에서 참조할 수 있는 `refresh` 작업을 공개합니다.

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### 동적 크기 조정 <a name="dynamic-resizing"></a>

##### 실험: amp-list-resizable-children <a name="attributes"></a>

사용자 상호작용에서 크기를 조정하는 데 `<amp-list>`가 필요한 경우도 있습니다. 예를 들어 `<amp-list>`에 사용자가 탭할 수 있는 amp-accordion이 포함되는 경우, 바인드된 CSS 클래스 때문에 `<amp-list>`의 콘텐츠 크기가 변경되거나 바인드된 `[src]` 속성 때문에 `<amp-list>` 내부의 항목 수가 변경되는 경우입니다. 이 작업을 트리거할 때 amp 목록을 `layout="CONTAINER"`로 변경하여 `changeToLayoutContainer` 작업에서 이 문제를 처리합니다. 다음 예제를 참조하세요.

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

이 작업은 `amp-list-resizable-children`에서 실험적으로 사용할 수 있습니다.

## 속성 <a name="src-required"></a>

##### src(필수) <a name="credentials-optional"></a>

이 `<amp-list>`에서 렌더링할 JSON을 반환하는 원격 엔드포인트의 URL입니다. CORS HTTP 서비스여야 하며 URL의 프로토콜은 HTTPS여야 합니다.

[tip type="important"]
엔드포인트에서 [AMP의 CORS 요청](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) 사양에 지정된 요구 사항을 구현해야 합니다.
[/tip]

`[src]` 속성이 있으면 `src`를 생략할 수 있습니다. [`amp-bind`](amp-bind.md) 작업 중에 페이지 로드가 아니라 사용자 제스처의 결과로 콘텐츠를 렌더링할 때 유용합니다.

##### credentials(선택사항) <a name="items-optional"></a>

[Fetch API](https://fetch.spec.whatwg.org/)에 지정된 대로 `credentials` 옵션을 정의합니다.

* 지원되는 값: `omit`, `include`
* 기본값: `omit`

사용자 인증 정보를 보내려면 `include`의 값을 전달하세요. 이 값이 설정된 경우 응답이 [AMP CORS 보안 지침](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)을 따라야 합니다.

다음은 목록에 맞춤설정된 콘텐츠를 표시하기 위해 사용자 인증 정보를 비롯한 사양을 지정하는 예입니다.

```html
{% raw %}
<amp-list credentials="include"
          src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items(선택사항) <a name="max-items-optional"></a>

응답에서 렌더링할 배열을 찾는 표현식을 정의합니다. 이 표현식은 JSON 응답의 필드를 통해 이동하는 점으로 표시됩니다.
기본 `<amp-list>`는 배열되고 `single-item` 속성은 객체에서 데이터를 로드하는 데 사용할 수 있습니다.

* 기본값은 `'items'`입니다. 예상 응답: `{items: [...]}`.
* 응답 자체가 원하는 배열이면 `'.'` 값을 사용합니다. 예상 응답: `[...]`.
* 중첩 이동이 허용됩니다(예: `'field1.field2'`). 예상 응답: `{field1: {field2: [...]}}`.

`items="items"`가 지정되면(즉, 기본값) 응답은 `'items'`라는 배열 속성이 포함된 JSON 객체여야 합니다.
```text
{
  "items": [...]
}
```

#### max-items(선택사항) <a name="single-item-optional"></a>

렌더링할 항목 배열의 최대 길이를 지정하는 정수 값입니다.
반환된 값이 `max-items`를 초과하면 `items` 배열이 `max-items` 항목에서 잘립니다.

#### single-item(선택사항) <a name="reset-on-refresh-optional"></a>

`<amp-list>`에서 반환된 결과를 단일 요소 배열인 것처럼 처리하게 합니다. 객체 응답은 배열로 래핑되므로
`{items: {...}}`가 `{items: [{...}]}`인 것처럼 동작합니다.

#### reset-on-refresh(선택사항) <a name="binding-optional"></a>

`amp-bind` 또는 `refresh()` 작업을 통해 목록의 소스를 새로고칠 때 로드되는 표시기와 자리표시자를 다시 표시합니다.

기본적으로 네트워크 가져오기를 일으키는 새로고침만 트리거합니다. 새로고침을 모두 재설정하려면 `reset-on-refresh="always"`를 사용합니다,

#### [is-layout-container] (실험, 선택사항) <a name="is-layout-container-optional"></a>

기본적으로 항상 false여야 하는 바인드 가능 속성입니다. `bind`를 통해 true로 설정하면 `<amp-list>`의 레이아웃을 `CONTAINER`의 레이아웃으로 변경합니다. 이 속성은 amp-list의 동적 크기 조정을 처리하는 데 유용합니다. `<amp-list>`에서 `CONTAINER` 레이아웃을 지원하지 않는 이유와 같은 이유로 이 속성은 기본적으로 true가 될 수 없습니다. 잠재적으로 첫 번째 로드 시 콘텐츠가 점핑됩니다. 이 속성은 `amp-list-resizable-children`에서 실험적으로 사용 가능합니다. 또는 `changeToLayoutContainer` 작업도 사용할 수 있습니다.

#### binding(선택사항) <a name="common-attributes"></a>

`<amp-list>`를 사용하며 `amp-bind`도 사용하는 페이지의 경우 렌더링된 하위 요소의 바인딩 평가(예: `[text]`)에서 렌더링 차단 여부를 제어합니다.

더 빠른 성능을 위해 `binding="no"` 또는 `binding="refresh"`를 사용하는 것이 좋습니다.

* `binding="no"`: 렌더링을 차단하지 않습니다**(가장 빠름)**.
* `binding="refresh"`: 초기 로드 시 렌더링을 차단하지 않습니다**(더 빠름)**.
* `binding="always"`: 렌더링을 항상 차단합니다**(느림)**.

`binding` 속성이 제공되지 않으면 기본값은 `always`입니다.

## 실험: 추가 로드 및 무한 스크롤(amp-list-load-more) <a name="load-more-and-infinite-scroll"></a>

`<amp-list>`의 페이지로 나누기 및 무한 스크롤의 구현으로 `amp-list-load-more` 실험을 소개했습니다. [실험 페이지](https://cdn.ampproject.org/experiments.html)에서 'amp-list-load-more' 실험을 켜고 `load-more` 속성을 `<amp-list>`로 추가하여 이 기능을 사용 설정할 수 있습니다. 이 기능은 현재 원본 평가판에 있으며 최종 API는 변경될 수 있습니다.

#### 샘플 사용 <a name="sample-usage"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

작동 예를 보려면 [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html) 및 [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html)을 참조하세요.

### 속성 <a name="attributes-1"></a>

#### load-more(필수) <a name="load-more-mandatory"></a>

이 속성에서는 'auto' 또는 'manual'을 허용합니다. 이 속성의 값을 'manual'로 설정하면 `<amp-list>`의 끝에 'load-more' 버튼이 표시됩니다. 이 속성의 값을 'auto'로 설정하면 무한 스크롤 효과를 위해 `<amp-list>`에서 세 개의 표시 영역 아래 자동으로 추가 요소를 로드합니다.

#### load-more-bookmark(선택사항) <a name="load-more-bookmark-optional"></a>

이 속성을 통해서는 로드할 다음 항목의 url을 제공하는 필드 이름을 반환된 데이터에 지정합니다. 이 속성이 지정되지 않은 경우 `<amp-list>`에는 다음으로 로드할 url에 해당하는 `load-more-src` 필드가 있는 json 페이로드가 있어야 합니다. 이 필드의 이름을 다르게 지정하는 경우 `load-more-bookmark` 필드를 통해 해당 필드의 이름을 지정할 수 있습니다.예를 들어 다음 샘플 페이로드에서 `load-more-bookmark="next"`를 지정합니다.

```
{ "items": [...], "next": "https://url.to.load" }
```

### load-more 요소 맞춤설정 <a name="customizing-load-more-elements"></a>

`load-more` 속성을 사용하는 `<amp-list>`에는 load-more 버튼, 로더, load-failed 요소 및 선택적으로 목록의 끝을 표시하는 end-cap과 같은 UI 요소가 포함되어 있습니다. 이 요소는 `<amp-list-load-more>` 요소를 다음과 같은 속성이 있는 `<amp-list>`의 하위 요소로 제공하여 맞춤설정할 수 있습니다.

#### load-more-button <a name="load-more-button"></a>

로드할 추가 요소가 있으면 목록의 끝에 표시되는(수동 load-more의 경우) `load-more-button` 속성을 사용하는 `<amp-list-load-more>` 요소입니다. 이 요소를 클릭하면 `load-more-src` 필드 또는 `load-more-bookmark` 속성에 해당하는 반환된 데이터의 필드에 포함된 url에서 추가 요소를 로드하는 가져오기를 트리거합니다. 이 요소는 `load-more-button` 속성이 있는 하위 요소에 `<amp-list>`를 제공하여 맞춤설정할 수 있습니다.

##### 예: <a name="example"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
```
  `amp-mustache`를 통해 템플릿으로 작성될 수 있습니다.

##### 예: <a name="example-1"></a>

```html
{% raw %}<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="load-more-loading"></a>

이 요소는 목록의 끝에 도달하지만 콘텐츠를 여전히 로드 중이거나 사용자가 `load-more-button` 요소를 클릭한 결과(`<amp-list>`의 새 하위 요소를 여전히 로드 중) 표시되는 로더입니다. 이 요소는 `load-more-loading` 속성이 있는 하위 요소에 `<amp-list>`를 제공하여 맞춤설정할 수 있습니다. 예를 들어 다음과 같습니다.
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-failed"></a>

로드에 실패하는 경우 `<amp-list>`의 하단에 표시될 `load-more-clickable` 속성이 있는 버튼을 포함하는 `load-more-failed` 속성이 있는 `<amp-list-load-more>` 요소입니다. 이 요소를 클릭하면 실패한 url의 새로고침을 트리거합니다. 이 요소는 `load-more-failed` 속성이 있는 하위 요소에 `<amp-list>`를 제공하여 맞춤설정할 수 있습니다. 예를 들어 다음과 같습니다.

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

위의 예에서 전체 `load-more-failed` 요소를 클릭할 수 있습니다. 그러나 이 요소의 일반적인 패턴은 클릭 가능한 '새로고침' 버튼을 포함하는 일반적인 클릭 불가능 '로드 실패' 요소입니다. 이를 처리하기 위해 `load-more-clickable` 요소를 포함하는 버튼이 있는 일반적으로 클릭 불가능한 요소를 사용할 수 있습니다. 예를 들어 다음과 같습니다.

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-end"></a>

이 요소는 기본적으로 제공되지 않지만, `load-more-end` 속성을 포함하는 `<amp-list-load-more>` 요소가 하위 요소로 `<amp-list>`에 연결된 경우 추가 항목이 없으면 `<amp-list>`의 하단에 표시됩니다.  이 요소는 `amp-mustache`를 통해 템플릿으로 작성될 수 있습니다. 예를 들어 다음과 같습니다.

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### 공통 속성 <a name="substitutions"></a>

이 요소에는 AMP 구성요소로 확장된 [공통 속성](../../../documentation/guides-and-tutorials/learn/common_attributes.md)이 포함됩니다.

## 대체 <a name="validation"></a>

`<amp-list>`를 사용하면 모든 표준 URL 변수를 대체할 수 있습니다.
자세한 정보는 [대체 가이드](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)를 참조하세요.

예를 들어 다음과 같습니다.
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
</code>에서는
<code>https://foo.com/list.json?0.8390278471201</code>과 같은 사이트에 요청할 수 있습니다. 여기서는 노출할 때마다 RANDOM 값이 무작위로 생성됩니다.</p>

<h2>유효성 검사</h2>

<p>AMP 유효성 검사기 사양의 <a href="https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/validator-amp-list.protoascii">amp-list rules</a>를 참조하세요.</p>
