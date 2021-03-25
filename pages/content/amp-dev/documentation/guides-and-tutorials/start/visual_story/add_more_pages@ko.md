---
'$title': Adding more pages
$order: 5
description: "이전 페이지에서는 AMP 스토리에 페이지를 추가하는 방법을 익혔습니다. '애완동물이 주는 기쁨' 스토리에 다음 페이지를 추가하는 것도 지금까지 배운 방법과 아주 비슷합니다."
author: bpaduch
---

이전 페이지에서는 AMP 스토리에 페이지를 추가하는 방법을 익혔습니다. '애완동물이 주는 기쁨' 스토리에 다음 페이지를 추가하는 것도 지금까지 배운 방법과 아주 비슷합니다. 아래에 제공된 정보에 따라 학습한 내용을 활용하여 **남은 페이지를 만들어 보세요**. 잘 모르는 내용이 있으면 완성된(<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) 코드를 살펴보세요.

[tip type="tip"] 각 페이지에는 고유 'id' 속성(예: `id="page1"`)이 필요합니다. [/tip]

## 1페이지: 고양이

단일 레이어에 이미지와 텍스트를 표시하는 방법을 보여줍니다.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>레이어 1개 포함:       <ul>         <li> <a href="create_cover_page.md#vertical"><code>vertical</code></a> 템플릿을 구현합니다.</li>         <li>요소 3개 포함:           <ul>             <li>제목이 <em>고양이</em> </li>인 <code><h1></code> 요소             <li>반응형 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>(<code class="filename">cat.jpg</code>, 720 x 1280px)</li>             <li>다음 인용문의 <code><q></code> 요소: <em>개는 사람이 부르면 옵니다. 고양이는 뭔가 할 말이 있으면 사람에게 옵니다. --Mary Bly</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='1페이지 - 고양이' ) }}</td>
  </tr>
</table>

## 2페이지: 개

텍스트를 정렬하고 두 개의 레이어가있는 화면 채우기 이미지를 표시하는 방법을 보여줍니다.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>레이어 2개 포함:       <ul>         <li> <b>레이어 1</b>: <a href="create_cover_page.md#fill"><code>fill</code></a> 템플릿을 구현하고 반응형 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>(<code class="filename">dog.jpg</code>, 720 x 1280px)</li>를 포함합니다.         <li> <b>레이어 2</b>:  <a href="create_cover_page.md#thirds"><code>thirds</code></a> 템플릿을 구현하고 요소 2개를 포함합니다.           <ul>             <li>제목이 <em>개</em> </li>인 <code><h1></code> 요소             <li> <a href="create_cover_page.md#thirds"><code>lower-third</code></a>를 차지하는 <a href="create_cover_page.md#thirds"><code>grid-area</code></a>를 지정하고 다음 텍스트를 포함하는 <code><p></code> 요소: <em>개는 처음으로 길들여진 동물이라고 합니다. 약 10,000년 동안 사람들과 함께 지내왔습니다. 몇몇 과학자들은 애완동물이든 야생동물이든 모든 개가 작은 남아시아 늑대라는 공통 조상을 공유한다고 주장합니다.</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='2페이지 - 개' ) }}</td>
  </tr>
</table>

## 3페이지: 새

단일 레이어에 이미지와 텍스트를 추가하는 방법을 보여줍니다.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>레이어 3개 포함:       <ul>         <li> <b>레이어 1</b>: <a href="create_cover_page.md#fill"><code>fill</code></a> 템플릿을 구현하고 반응형 <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>(<code class="filename">bird.jpg</code>, 720 x 1280px)</li>를 포함합니다.         <li> <b>레이어 2</b>:  <a href="create_cover_page.md#vertical"><code>vertical</code></a> 템플릿을 구현하고 요소 한 개를 포함합니다.           <ul>             <li>제목이 <em>새</em> </li>인 <code><h1></code> 요소           </ul>         </li>         <li> <b>레이어 3</b>:  <a href="create_cover_page.md#vertical"><code>vertical</code></a> 템플릿을 구현하고 요소 한 개를 포함합니다.           <ul>             <li>다음 인용문의 <code><q></code> 요소: <em>새는 깃털이 있고 날 수 있고 노래할 수 있습니다. 그중에 가장 중요하지 않은 것은 깃털입니다. --Marjorie Allen Seiffert</em> </li>             <li>세 번째 레이어가 <code>class="bottom"</code>을 지정하여 하위 요소를 화면 하단에 정렬합니다.</li>           </ul>         </li>       </ul>
</li>
      <li>페이지가 표시되는 동안 백그라운드에서 오디오 파일을 재생합니다. 전체 스토리나 페이지 한 개의 백그라운드에서 오디오를 재생할 수 있습니다.  페이지의 오디오를 재생하려면 <code>background-audio="assets/bird-singing.mp3"</code> 속성을 <code><amp-story-page></code> 요소에 추가합니다.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='3페이지 - 새' ) }}</td>
  </tr>
</table>

## 4페이지 - 토끼

텍스트를 정렬하고 페이지에 화면을 채우는 동영상을 표시하는 방법을 보여줍니다.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>레이어 3개 포함:       <ul>         <li> <b>레이어 1</b>: <code>fill</code> 템플릿을 구현하고 반응형 <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>(<code class="filename">rabbit.mp4</code>)를 포함합니다.           <ul>             <li>동영상이 표시되도록 <code></code> 섹션에 <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> 구성요소의 <strong>필수 스크립트</strong>를 추가합니다.</li>             <li> <code>poster</code> 이미지(<code class="filename">rabbit.jpg</code>)를 지정합니다. 이 속성은 유효한 AMP 스토리를 위해 <strong>필요</strong>합니다.</li>             <li> <code>autoplay</code> 속성으로 동영상이 자동 재생되도록 설정합니다. 이 속성은 유효한 AMP 스토리를 위해 <strong>필요</strong>합니다.</li>             <li> <code>loop</code> 속성으로 동영상이 자동 루프백되도록 설정합니다.</li>             <li>크기를 <code>width="720"</code> <code>height="1280"</code>, <code>layout="responsive"</code>로 설정합니다.</li>           </ul> </li>         <li> <b>레이어 2</b>:  <code>vertical</code> 템플릿을 구현하고 요소 한 개를 포함합니다.           <ul>             <li>제목이 <em>토끼</em> </li>인 <code><h1></code> 요소           </ul>         </li>         <li> <b>레이어 3</b>:  <code>vertical</code> 템플릿을 구현하고 요소 한 개를 포함합니다.           <ul>             <li>다음 텍스트를 포함하는 <code><p></code> 요소: <em>토끼는 간단한 음성 명령을 배울 수 있어 이름을 부르면 다가오고 호기심이 많으며 장난기가 많습니다</em>.</li>             <li>레이어에 <code>bottom</code> CSS 클래스를 적용하여 하위 요소를 화면 하단에 정렬합니다.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='4페이지 - 토끼' ) }}</td>
  </tr>
</table>

'애완동물이 주는 기쁨' 스토리가 거의 완성되었습니다. 마지막 페이지에서는 애니메이션을 사용하여 모든 애완동물을 한곳에 모을 것입니다.
