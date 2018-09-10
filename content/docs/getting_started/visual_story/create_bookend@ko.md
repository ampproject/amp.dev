---
$title: 북엔드 만들기
$order: 6
---

모든 페이지를 추가했으므로 이제 스토리의 마지막 화면인 '북엔드'에 대해 살펴보겠습니다.  마지막 화면에서는 스토리를 마무리하고, 사용자가 스토리를 공유하거나 게시자 사이트의 다른 콘텐츠를 자세히 살펴볼 수 있도록 소셜 공유 기능 또는 관련 링크를 제공합니다.

북엔드 화면의 정보는 `<amp-story-bookend>` 태그에 지정된 JSON 파일에서 가져옵니다. 이 가이드에서는 북엔드 데이터가 포함된 JSON 파일([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json))이 이미 만들어져 있습니다.

`<amp-story-bookend>` 태그는 `amp-story`의 마지막 태그여야 합니다. 따라서 종료 `</amp-story>` 태그 바로 앞에 `<amp-story-bookend></amp-story-bookend>`를 **추가**합니다.  `amp-story-bookend` 태그에서 `src` 속성을 `bookend.json` 파일로 지정하고 `layout="nodisplay"`를 설정합니다.

```html hl_lines="2"
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

브라우저를 새로 고치고 마지막 화면으로 이동하면 북엔드가 다음과 같이 표시됩니다.

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='북엔드' ) }}

JSON 파일에 대해 살펴보겠습니다.  텍스트 편집기에서 [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) 파일을 엽니다.

모든 북엔드 화면에는 `bookendVersion`(이 가이드의 경우 `v1.0`)이 필요합니다.

```json
"bookendVersion": "v1.0",
```

리더는 소셜 공유 버튼을 사용하여 Twitter, Facebook, Pinterest 등 소셜 플랫폼을 통해 콘텐츠를 공유할 수 있습니다. shareProviders 개체에서 소셜 공유 제공업체를 지정하고, 각 소셜 플랫폼에 대한 [유형 이름](/ko/docs/reference/components/amp-social-share.html#pre-configured-providers)을 포함하는 배열을 만듭니다.

이 가이드에서는 Facebook, Twitter 및 공유 제공업체의 이메일을 선택했습니다.

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='북엔드 소셜 공유' ) }}

북엔드 화면의 나머지는 관련 콘텐츠를 위한 부분입니다.  모든 관련 콘텐츠는 `components` 개체에 포함되어 있습니다. 

관련 콘텐츠와 링크를 표시하는 데 사용할 수 있는 다양한 구성 요소가 있습니다. 각 구성 요소는 유형 속성으로 지정됩니다. 사용 가능한 구성 요소에 대해 살펴보겠습니다.

<table>
<thead>
<tr>
  <th width="20%">유형</th>
  <th>설명</th>
</tr>
<tr>
  <td>제목</td>
  <td>자료를 그룹화할 제목을 지정할 수 있습니다.
<pre class="nopreline">
{
  "type": "heading",
  "text": "More to read"
},
</pre>
  <br>
  <figure class="alignment-wrapper half">
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="북엔드 제목"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>작게</td>
  <td>연결된 작은 이미지를 포함하는 옵션을 사용하여 관련 자료에 연결할 수 있습니다.
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
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="북엔드 작은 자료"></amp-img>
  </figure>
</td>
</tr>
<tr>
  <td>가로 모드</td>
  <td>동영상 같은 다른 콘텐츠나 자료에 연결할 수 있습니다. 가로 모드 유형에 연결된 이미지는 가로로 더 큰 형식으로 되어 있습니다.
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
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="북엔드 가로 모드 자료"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>세로 모드</td>
  <td>스토리 또는 다른 콘텐츠에 연결할 수 있습니다.  세로 모드 유형에 연결된 이미지는 세로로 더 큰 형식으로 되어 있습니다.
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
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="북엔드 세로 모드 자료"></amp-img>
  </figure>
  </td>
</tr>
<tr>
  <td>cta-link</td>
  <td>버튼으로 표시되는 클릭 유도문안 링크를 지정할 수 있습니다(예: 자세히 알아보기, 구독).
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
    <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="북엔드 cta"></amp-img>
  </figure>
  </td>
</tr>
</thead>
<tbody>
</tbody>
</table>

북엔드 구성 요소에 대한 더 자세한 내용이 있습니다. [amp-story](/ko/docs/reference/components/amp-story.html#bookend:-amp-story-bookend) 참조 문서를 확인하세요.

스토리가 거의 완성되었습니다.  콘텐츠를 게시하기 전에 AMP HTML이 유효한지 확인하세요.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/ko/docs/getting_started/visual_story/animating_elements.html"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="/ko/docs/getting_started/visual_story/validation.html"><span class="arrow-next">다음</span></a>
</div>
 
