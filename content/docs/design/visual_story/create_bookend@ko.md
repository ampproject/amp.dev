---
$title: 북엔드 만들기
---

자, 이제 모든 페이지를 추가했습니다. 이번에는 스토리의 마지막 화면인 북엔드(bookend)를 살펴보겠습니다. 마지막 화면은 스토리를 마감하면서 SNS 공유 또는 연관된 스토리에 대한 링크를 제공합니다. 독자들이 여러분의 스토리를 공유하거나 다른 컨텐츠로 자연스럽게 이동할 수 있습니다.

북엔드 화면의 정보는 `<amp-story-bookend>` 컴포넌트에 명시된 JSON 파일로부터 옵니다. 이번 자습서를 위해 JSON 파일([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json))을 미리 만들어 두었습니다.

`<amp-story-bookend>` 태그는 `<amp-story>`안에서 가장 마지막에 두어야 할 태그입니다. 따라서 `<amp-story-bookend></amp-story-bookend>`를 `</amp-story>`태그 **앞에 넣습니다**. `amp-story-bookend` 태그의 `src` 속성은 `bookend.json`으로 설정하고 `layout="nodisplay"` 속성을 추가합니다:

```html hl_lines="2"
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

웹브라우저에서 새로고침을 하고 마지막 화면까지 오면 다음과 같은 화면이 보일 것입니다:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

JSON 파일을 살펴보겠습니다. 텍스트 에디터에서 [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) 파일을 열어보십시오.

북엔드 데이터 파일에는 `bookendVersion`을 반드시 입력해야 하는데 우리는 `v1.0`을 쓰겠습니다:

```json
"bookendVersion": "v1.0",
```

소셜 공유 버튼은 독자들이 여러분의 콘텐츠를 트위터와 페이스북 그리고 핀터레스트 등의 소셜 네트웍 플랫폼에 공유할 수 있도록 합니다. 소셜 네트웍의 목록은 shareProviders 객체에 넣습니다. 소셜 네트웍의 [type name](/ko/docs/reference/components/amp-social-share.html#pre-configured-providers)은 여기에서 확인하십시오.

이번 스토리 예제에는 페이스북과 트위터 그리고 이메일을 shareProviders에 넣겠습니다:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

북엔드 화면의 나머지는 연관 콘텐츠에 대한 것입니다. 연관 콘텐츠는 `components` 객체안에 나열합니다. 

컴포넌트의 type 속성으로 연관 콘텐츠와 링크를 어떤 방식으로 보여줄지 선택할 수 있습니다. 컴포넌트의 타입에는 어떤 것들이 있는지 살펴보겠습니다. 

<table>
<thead>
<tr>
  <th width="20%">타입</th>
  <th>설명</th>
</tr>
<tr>
  <td>heading</td>
  <td>다수의 연관 컨텐츠를 묶어서 하나의 그룹을 만들때 제목으로 씁니다.
<pre class="nopreline">
{
  "type": "heading",
  "text": "More to read"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>small</td>
  <td>연관 콘텐츠로 가는 링크를 걸 때 씁니다. 작은 이미지를 선택적으로 넣을 수 있습니다.
<pre class="nopreline">
{
  "type": "small",
  "title": "Learn about cats",
  "url": "https://wikipedia.org/wiki/Cat",
  "image": "assets/bookend_cats.jpg"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
  </figure>
</td>
</tr>
<tr>
  <td>landscape</td>
  <td>비디오 등 다양한 연관 콘텐츠로 가는 링크를 걸 때 씁니다. 이런 타입에 쓰이는 이미지는 상대적으로 크고 가로방향(landscape) 입니다.
<pre class="nopreline">
{
  "type": "landscape",
  "title": "Learn about border collies",
  "url": "https://wikipedia.org/wiki/Border_Collie",
  "image": "assets/bookend_dogs.jpg",
  "category": "Dogs"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>portrait</td>
  <td>연관 콘텐츠 또는 AMP 스토리로 가는 링크를 걸때 씁니다. 이런 타입에 쓰이는 이미지는 상대적으로 크고 세로방향(portrait)입니다.
<pre class="nopreline">
{
  "type": "portrait",
  "title": "Learn about macaws",
  "url": "https://wikipedia.org/wiki/Macaw",
  "image": "assets/bookend_birds.jpg",
  "category": "birds"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>cta-link</td>
  <td>버튼(예를 들어, read more, Subscribe 등) 형태의 액션 링크를 거는데 씁니다.
<pre class="nopreline">
{
  "type": "cta-link",
  "links": [
    {
      "text": "Learn more",
      "url": "https://www.ampproject.org/stories/"
    }
  ]
}
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
  </figure>
  </td>
</tr>
</thead>
<tbody>
</tbody>
</table>

북엔드 컴포넌트에 대해서 더 알고 싶으면 [amp-story](/ko/docs/reference/components/amp-story.html#bookend:-amp-story-bookend) 레퍼런스 문서를 참고하십시오. 

이제 거의 끝나갑니다. 지금까지 작성한 스토리를 공개(publish)하기 전에 AMP HTML 유효성 검사를 돌려보겠습니다.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/ko/docs/design/visual_story/animating_elements.html"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="/ko/docs/design/visual_story/validation.html"><span class="arrow-next">다음</span></a>
</div>
