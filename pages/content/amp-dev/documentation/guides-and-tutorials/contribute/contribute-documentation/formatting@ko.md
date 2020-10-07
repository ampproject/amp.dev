---
$title: 서식 지정 가이드 & 튜토리얼
$order: 3
description: amp.dev 파일 서식 지정 요구 사항
author: CrystalOnScript
---

가이드 및 튜토리얼은 [마크다운](https://www.markdownguide.org/)에 추가 프론트매터 및 숏코드 서식 지정과 함께 제시되어 있습니다.

## 문서 위치

amp.dev 콘텐츠는 [amp.dev](https://github.com/ampproject/amp.dev) 및 [AMPHTML](https://github.com/ampproject/amphtml)의 저장소 두 곳에서 가져옵니다. 컴포넌트의 모든 참조 문서는 AMPHTML의 'builtins' 또는 'extensions'에 포함되어 있습니다.

- [기본 제공 컴포넌트 ](https://github.com/ampproject/amphtml/tree/master/builtins)
- [컴포넌트](https://github.com/ampproject/amphtml/tree/master/extensions)
- [코스](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
- [예제](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
- [가이드 & 튜토리얼](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

AMPHTML에서 amp.dev로 가져온 기타 여러 문서들이 있습니다. 해당 문서는 다음 [파일에서 제공됩니다](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json). amp.dev 저장소에서 문서를 업데이트하지 마세요. 변경 사항이 후속 빌드에 덮어쓰기 될 수 있습니다!

## 프론트매터

프론트매터는 각 가이드 및 튜토리얼의 최상단에 위치합니다.

예제:

```yaml
$title: Include Custom JavaScript in AMP Pages
$order: 7
formats:
  - websites
author: CrystalOnScript
contributors:
  - fstanis
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
```

<table>
  <tr>
   <td>
    <code>$title</code>
   </td>
   <td>콘텐츠 목차에 표시되는 문서의 제목입니다. "AMP" 및 기타 고유 명사를 제외한 첫 번째 단어의 첫 번째 문자는 대문자로 처리합니다. `and`라는 단어 대신 앰퍼샌드 `&` 기호를 사용합니다.</td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>문서의 콘텐츠 목차가 표시되는 위치를 정의합니다. 올바른 위치에 표시되게 하려면 다른 문서의 `$order`를 편집해야 할 수도 있습니다.</td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>문서와 관련된 AMP 경험을 나열합니다. 문서가 AMP 웹사이트 및 AMP 스토리와 관련되었으나 AMP 광고 또는 AMP 이메일과는 관련이 없을 시 Frontmatter는 다음과 같이 작성됩니다:     ```yaml         formats:           - websites           - stories     ```</td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>작성자는 여러분입니다! GitHub 사용자 이름을 사용하세요.</td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>문서 기여자 목록이 나열됩니다. 이 필드는 선택 사항입니다.</td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>가이드 또는 튜토리얼에 대한 간략한 설명을 작성합니다. 검색 엔진 최적화에 도움이  되므로, 여러분의 작업을 필요한 사람이 발견할 수 있습니다!</td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>웹사이트에서 프론트매터 옆에 튜토리얼 아이콘을 추가하려면 `tutorial: true`를 추가합니다. 튜토리얼은 콘텐츠 목차의 섹션 하단에 있습니다.</td>
  </tr>
</table>

# 숏코드

숏코드 목록 및 활용 사례는 [GitHub의 documentation.md](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes)에서 확인하실 수 있습니다.

## 이미지

amp.dev는 AMP로 작성되었습니다! 그렇기에 이미지는 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 기준에 부합합니다. 빌드 프로세스에서 이미지를 `amp-img` 형식으로 변환하는 데 다음 구문이 활용되었습니다.

<div class="ap-m-code-snippet">
<pre>{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app') }}</pre>
</div>

## 섹션 필터링

일부 문서는 여러 AMP 형식과 연관되었을 수 있지만 이러한 형식에는 다른 것들과 연관성 없는 추가 설명 또는 정보가 필요할 수도 있습니다. 다음 숏코드로 섹션을 래핑하여 필터링할 수 있습니다.

<div class="ap-m-code-snippet">
<pre>&lsqb;filter formats="websites"]<br>This is only visible for [websites](?format=websites).<br>&lsqb;/filter]</pre>
</div>

[filter formats="websites"] [웹사이트](?format=websites)에만 표시됩니다. [/filter]

[filter formats="websites, email"] [웹사이트](?format=websites) & [이메일](?format=email)에만 표시됩니다. [/filter]

[filter formats="stories"] [스토리](?format=stories)에만 표시됩니다. [/filter]




## 팁

다음 숏코드에 텍스트를 래핑하여 팁과 콜아웃을 추가할 수 있습니다.

<div class="ap-m-code-snippet">
<pre>&lsqb;tip type="default"]<br>Default tip<br>&lsqb;/tip]</pre>
</div>

[tip type="important"] 중요 [/tip]

[tip type="note"] 참고 [/tip]

[tip type="read-on"] 읽을거리 [/tip]




## 코드 조각

백틱(`) 기호 3개 사이에 코드 조각을 배치하고 첫 번째 백틱 세트 끝부분에서 언어를 지정합니다.

<div class="ap-m-code-snippet">
<pre>```html<br>  // code sample<br>```</pre>
</div>

```css
  // code sample
```

```js
  // code sample
```





[`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) 템플릿을 활용하면 자주 그렇듯 코드에 중괄호가 두 개 포함된 경우 코드 부분을 래핑해야 합니다.

<div class="ap-m-code-snippet">
<pre>```html<br>{% raw	%}<br>  // code with double curly braces<br>{% endraw	%}<br>```</pre>
</div>

### 목록의 코드 조각

Python 마크다운에는 일부 제한이 있습니다. 목록에 코드 조각을 포함할 시 다음 구문을 활용하세요.

<div class="ap-m-code-snippet">
<pre>1. First:<br>    &lsqb;sourcecode:html]<br>      <br>        <p>Indented content.</p><br>      <br>    &lsqb;/sourcecode]<br>  2. Second<br>  3. Third</pre>
</div>

## 코드 샘플 미리보기

코드 샘플에 미리보기 또는 [AMP Playground](https://playground.amp.dev/) 버전 링크를 포함할 수 있습니다.

<div class="ap-m-code-snippet">
  <pre>  &lsqb;example preview="default: none|inline|top-frame"<br>          playground="default: true|false"<br>          imports="{custom-element-10},{custom-element-21},..."           template="{custom-template2}"]   ```html     // code sample   ```   &lsqb;/example]   {/custom-template2}{/custom-element-21}{/custom-element-10}</pre>
</div>

참고: 미리보기는 Playground에서 열었을 때 선택한 최근 형식으로 자동 변환됩니다🤯!

`preview` 속성을 활용하여 미리보기 생성 방식을 정의합니다.

- **none**: 미리보기가 생성되지 않습니다.

- **inline**: 예제 미리보기가 소스 코드 상단에 표시됩니다. 인라인 미리보기는 코드에 `head` 요소가 포함되지 않은 경우 일반 웹사이트 예제에서만 제공됩니다. 스타일 지정이나 기타 `head` 요소가 필요하지 않은 작은 예제에서만 이 옵션을 선택하세요(가져오기는 `imports` 속성으로 지정되므로 해당되지 않습니다).

- **top-frame**: 예제 미리보기가 iframe 내부에서 소스 코드 상단에 표시됩니다. 방향은`portrait` 및 `landscape` 모드 중 선택할 수 있으며, 추가 속성을 지정하여 방향을 사전 선택할 수도 있습니다.

- **orientation**: `default: landscape|portrait`

사용자 지정 요소가 필요한 경우 쉼표로 구분되고 콜론과 버전이 뒤에 표시되는 컴포넌트 이름의 목록처럼 `imports` 속성으로 지정합니다. 코드에서 [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites)가 사용된다면 `template` 속성에서 대신 종속성을 지정합니다.

리소스 링크가 포함된 이메일 콘텐츠의 경우 소스에 <code>{{server_for_email}}</code> 플레이스홀더를 사용합니다.

### 인라인 샘플

간단한 인라인 샘플 임베드입니다. 인라인 스타일로 CSS를 정의할 수 있습니다.

<div class="ap-m-code-snippet">
<pre>  [example preview="inline" playground="true"]<br>    ```html<br>    <div style="background: red; width: 200px; height: 200px;">Hello World</div><br>    ```<br>  [/example]<br>  [/example]</pre>
</div>

다음과 같이 표시되어야 합니다:

[example preview="inline" playground="true"]

```html
<div style="background: red; width: 200px; height: 200px;">Hello World</div>
```

[/example]

주의: 인라인 샘플은 페이지에 바로 임베드 되므로 컴포넌트가 해당 페이지에 이미 사용된 경우 충돌이 발생할 수 있습니다(예: `amp-consent`).

### 탑프레임 미리보기

헤더 요소를 제정하거나 `<style amp-custom>` 내부에서 전역 스타일을 정의해야 할 경우 탑프레임 미리보기를 사용하세요.

중요: AMP 보일러플레이트 코드는 AMP 형식에 따라 자동으로 추가되므로 헤더에 추가하지 않습니다. 헤더에는 샘플로 필요한 요소만을 추가합니다!

<div class="ap-m-code-snippet">
<pre>  [example preview="top-frame"<br>         playground="true"]<br>    ```html<br>    <head><br>      <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script><br>      <style amp-custom><br>        body {<br>          background: red;<br>        }<br>      </style><br>    </head><br>    <body><br>      <h1>Hello AMP</h1><br>      <amp-youtube width="480"<br>        height="270"<br>        layout="responsive"<br>        data-videoid="lBTCB7yLs8Y"><br>      </amp-youtube><br>    </body><br>    ```<br>  [/example]</pre>
</div>

다음과 같이 표시되어야 합니다:

[example preview="top-frame" playground="true"]

```html
<head>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <style amp-custom>
    body {
      background: red;
    }
  </style>
</head>
<body>
  <h1>Hello AMP</h1>
  <amp-youtube width="480"
    height="270"
    layout="responsive"
    data-videoid="lBTCB7yLs8Y">
  </amp-youtube>
</body>
```

[/example]

### AMP 스토리

AMP 스토리 미리보기 시 `preview="top-frame"`과 `orientation="portrait"`을 함께 사용합니다.

<div class="ap-m-code-snippet">
<pre>  [example preview="top-frame"<br>         orientation="portrait"<br>         playground="true"]<br>    ```html<br>    <head><br>      <script async custom-element="amp-story"<br>          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script><br>      <style amp-custom><br>        body {<br>          font-family: 'Roboto', sans-serif;<br>        }<br>        amp-story-page {<br>          background: white;<br>        }<br>      </style><br>    </head><br>    <body><br>      <amp-story standalone><br>        <amp-story-page id="cover"><br>          <amp-story-grid-layer template="vertical"><br>            <h1>Hello World</h1><br>            <p>This is the cover page of this story.</p><br>          </amp-story-grid-layer><br>        </amp-story-page><br>        <amp-story-page id="page-1"><br>          <amp-story-grid-layer template="vertical"><br>            <h1>First Page</h1><br>            <p>This is the first page of this story.</p><br>          </amp-story-grid-layer><br>        </amp-story-page><br>      </amp-story><br>    </body><br>    ```<br>  [/example]</pre>
</div>

다음과 같이 표시되어야 합니다:

[example preview="top-frame" orientation="portrait" playground="true"]

```html
  <head>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <style amp-custom>
      body {
        font-family: 'Roboto', sans-serif;
      }
      amp-story-page {
        background: white;
      }
    </style>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="cover">
        <amp-story-grid-layer template="vertical">
          <h1>Hello World</h1>
          <p>This is the cover page of this story.</p>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-1">
        <amp-story-grid-layer template="vertical">
          <h1>First Page</h1>
          <p>This is the first page of this story.</p>
        </amp-story-grid-layer>
      </amp-story-page>
    </amp-story>
  </body>
```

[/example]

### AMP 이메일의 절대 URL

AMP 이메일에 엔드포인트 URL이 임베드 될 경우 <code>{{server_for_email}}</code>를 활용하여 절대 경로로 지정하는 방법을 참조하세요.

<div class="ap-m-code-snippet">
<pre>  [example preview="top-frame" playground="true"]<br>    ```html<br>    <div class="resp-img">       <amp-img alt="flowers" src="%7B%7Bserver_for_email%7D%7D/static/inline-examples/images/flowers.jpg" layout="responsive" width="640" height="427"></amp-img>     </div><br>    ```<br>  [/example]</pre>
</div>

다음과 같이 표시되어야 합니다:

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"></amp-img>
</div>
```

[/example]

### 이스케이핑 mustache 템플릿

원격 엔드포인트를 사용한 `top-frame` 샘플입니다. <code>{% raw %}</code> 및<code>{% endraw %}</code>을 활용하여 Mustache 템플릿을 이스케이핑 처리해야 합니다.

<div class="ap-m-code-snippet">
  <pre>[example preview="top-frame"<br>        playground="true"<br>        imports="amp-list:0.1"<br>        template="amp-mustache:0.2"]<br>    ```html<br>    <amp-list width="auto" height="100" layout="fixed-height"<br>      src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json"><br>      <template type="amp-mustache">{% raw %}<br>        <div class="url-entry"><br>          <a href="{{url}}">{{title}}</a><br>        </div><br>      {% endraw %}<br>      </template><br>    </amp-list><br>    ```<br>[/example]</pre>
</div>

다음과 같이 표시되어야 합니다:

[example preview="top-frame" playground="true" imports="amp-list:0.1" template="amp-mustache:0.2"]

```html
<amp-list width="auto" height="100" layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
    {% endraw %}
  </template>
</amp-list>
```

[/example]

## 링크

표준 마크다운 링크 구문으로 다른 페이지로 연결할 수 있습니다.

```md
 [link](../../../courses/beginning-course/index.md)
```

amp.dev에 다른 페이지를 연결할 경우 참조는 대상 파일에 상대 파일 경로가 됩니다.

### 앵커

문서에서 앵커를 사용해 특정 섹션으로 연결합니다.

```md
[link to example section](#example-section)
```

앵커가 없는 섹션으로 연결하기 전 `<a name="#anchor-name></a>`를 사용해 앵커 대상을 생성합니다. 섹션 헤드라인의 끝부분이 적합합니다.

```html
## Example section <a name="example-section"></a>
```

앵커에는 문자, 숫자, 대시 및 밑줄 기호만 사용되어야 합니다. 헤드라인과 일치하거나 섹션을 설명하는 앵커 이름을 영어로 짧게 작성합니다. 또한 앵커 이름이 문서 안에 하나만 있도록 지정합니다.

페이지를 번역한 경우 앵커 이름은 변경되지 않고 영어로 남아 있어야 합니다.

다른 페이지의 링크에 사용할 앵커를 생성하면 모든 번역에 동일한 앵커를 생성해야 합니다.

### AMP 형식 필터

AMP 웹사이트나 AMP 스토리와 같은 AMP 형식으로 컴포넌트 문서, 가이드 및 튜토리얼, 예제를 필터링할 수 있습니다. 이러한 페이지를 링크로 연결할 경우, 링크에 형식 매개변수를 추가하여 대상에서 지원되는 형식을 명시적으로 지정해야 합니다.

```md
 [link](../../learn/amp-actions-and-events.md?format=websites)
```

페이지에 사용된 **모든** 형식이 대상에서 지원된다고 확신할 경우에만 매개변수를 생략할 수 있습니다.

### 컴포넌트 참조

링크에서 버전 부분이 생략될 경우 컴포넌트 참조 문서 링크는 자동으로 최신 버전을 지정합니다. 버전을 명시적으로 지정하고 싶을 경우 전체 이름을 지정하세요.

```md
 [latest version](../../../components/reference/amp-carousel.md?format=websites)
 [explicit version](../../../components/reference/amp-carousel-v0.2.md?format=websites)
```

## 문서 구조

### 제목, 헤딩 및 하위 헤딩

제목, 헤딩 및 하위 헤딩에서 사용된 첫 번째 단어의 첫 번째 문자는 대문자로 표기하고 그 다음은 소문자로 작성합니다. 예상 값에는 AMP 및 고유 명사가 포함됩니다. 헤딩 제목에는 `Introduction`을 사용하지 않으며 문서 제목 다음에는 서문을 입력합니다.

### 문서 이름 지정

문서 이름은 대시 이름 지정 규칙에 따라 지정합니다.

<table>
  <tr>
   <td>
<strong>Do</strong>
   </td>
   <td>
<strong>Don’t</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md</td>
   <td>hello_world_tutorial.md</td>
  </tr>
  <tr>
   <td>website-fundamentals.md</td>
   <td>websiteFundamentals.md</td>
  </tr>
  <tr>
   <td>actions-and-events.md</td>
   <td>actionsandevents.md</td>
  </tr>
</table>
