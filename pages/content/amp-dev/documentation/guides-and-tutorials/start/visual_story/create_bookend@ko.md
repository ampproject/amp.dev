---
'$title': Creating the bookend
$order: 7
description: "모든 페이지를 추가했으므로 이제 스토리의 마지막 화면인 '북엔드'에 대해 살펴보겠습니다.  마지막 화면에서는 스토리를 마무리하고, 사용자가 ..."
author: bpaduch
---

모든 페이지를 추가했으므로 이제 스토리의 마지막 화면인 '북엔드'에 대해 살펴보겠습니다. 마지막 화면에서는 스토리를 마무리하고, 사용자가 스토리를 공유하거나 게시자 사이트의 다른 콘텐츠를 자세히 살펴볼 수 있도록 소셜 공유 기능 또는 관련 링크를 제공합니다.

북엔드 화면의 정보는 `<amp-story-bookend>` 태그에 지정된 JSON 파일에서 가져옵니다. 이 가이드에서는 북엔드 데이터가 포함된 JSON 파일([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json))이 이미 만들어져 있습니다.

`<amp-story-bookend>` 태그는 [`amp-story`](../../../../documentation/components/reference/amp-story.md)의 마지막 태그여야 합니다. 따라서 종료 `</amp-story>` 태그 바로 앞에 `<amp-story-bookend></amp-story-bookend>`를 **추가**합니다. `amp-story-bookend` 태그에서 `src` 속성을 `bookend.json` 파일로 지정하고 `layout="nodisplay"`를 설정합니다.

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

브라우저에서 새로고침을 하고 마지막 화면으로 이동하면 북엔드가 다음과 같이 표시됩니다.

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='북엔드' ) }}

JSON 파일에 대해 살펴보겠습니다. 텍스트 에디터에서 [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) 파일을 엽니다.

모든 북엔드 화면에는 `bookendVersion`(이 가이드의 경우 `v1.0`)이 필요합니다.

```json
"bookendVersion": "v1.0",
```

독자들이 여러분의 콘텐츠를 소셜 공유 버튼을 사용하여 트위터와 페이스북 그리고 핀터레스트 등의 소셜 네트워크 플랫폼에 공유할 수 있습니다. shareProviders 객체에서 소셜 공유 제공업체를 지정하고, 각 소셜 플랫폼에 대한 [타입명](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers)을 포함하는 배열을 만듭니다.

이 가이드에서는 Facebook, Twitter 및 공유 제공업체의 이메일을 선택했습니다.

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='북엔드 소셜 공유' ) }}

북엔드 화면의 나머지는 관련 콘텐츠를 위한 부분입니다. 모든 관련 콘텐츠는 `components` 개체에 포함되어 있습니다.

관련 콘텐츠와 링크를 표시하는 데 사용할 수 있는 다양한 구성 요소가 있습니다. 각 구성 요소는 타입 속성으로 지정됩니다. 사용 가능한 구성 요소에 대해 살펴보겠습니다.

<table>
<thead><tr>
  <th width="20%">Type</th>
  <th>Description</th>
</tr></thead>
<tbody>
  <tr>
    <td>heading</td>
    <td>자료를 그룹화할 제목을 지정할 수 있습니다.   <pre class="nopreline">
  {
    "type": "heading",
    "text": "More to read"
  },
  </pre>     <br>     <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
    </figure></td>
  </tr>
  <tr>
    <td>small</td>
    <td>연결된 작은 이미지를 포함하는 옵션을 사용하여 관련 자료에 연결할 수 있습니다.   <pre class="nopreline">
  {
    "type": "small",
    "title": "Learn about cats",
    "url": "https://wikipedia.org/wiki/Cat",
    "image": "assets/bookend_cats.jpg"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>landscape</td>
    <td>동영상 같은 다른 콘텐츠나 자료에 연결할 수 있습니다. 가로 모드 타입에 연결된 이미지는 가로로 더 큰 형식으로 되어 있습니다.   <pre class="nopreline">
  {
    "type": "landscape",
    "title": "Learn about border collies",
    "url": "https://wikipedia.org/wiki/Border_Collie",
    "image": "assets/bookend_dogs.jpg",
    "category": "Dogs"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>portrait</td>
    <td>스토리 또는 다른 콘텐츠에 연결할 수 있습니다.  세로 모드 타입에 연결된 이미지는 세로로 더 큰 형식으로 되어 있습니다.   <pre class="nopreline">
  {
    "type": "portrait",
    "title": "Learn about macaws",
    "url": "https://wikipedia.org/wiki/Macaw",
    "image": "assets/bookend_birds.jpg",
    "category": "birds"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>cta-link</td>
    <td>버튼으로 표시되는 클릭 유도문안 링크를 지정할 수 있습니다(예: 자세히 알아보기, 구독).   <pre class="nopreline">
  {
    "type": "cta-link",
    "links": [
      {
        "text": "Learn more",
        "url": "https://amp.dev/about/stories.html"
      }
    ]
  }
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
    </figure></pre>
</td>
  </tr>
</tbody>
</table>

북엔드 구성 요소에 대한 더 자세한 내용이 있습니다. [`amp-story`](../../../../documentation/components/reference/amp-story.md) 참조 문서를 확인하세요.

스토리가 거의 완성되었습니다. 콘텐츠를 게시하기 전에 AMP HTML이 유효한지 확인하세요.
