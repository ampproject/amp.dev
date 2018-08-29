---
$title: 페이지 추가
---

이제 AMP 스토리에 페이지를 추가하는 것은 어렵지 않을 것입니다. “The Joy of Pets” 이야기에 몇 페이지를 더 추가할텐데 특별히 어렵지는 않습니다. 아래의 설명을 바탕으로 **남은 페이지를 만들어보십시오**. 하다가 막혀도 걱정할 필요가 없습니다. 최종 완성본(<a href="https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>)을 보고 따라하면 됩니다.

{% call callout('팁', type='success') %}
페이지마다 고유한 “id” 속성을 추가하는 것을 잊지 마십시오. 예) `id=”page1”`
{% endcall %}

## 페이지 1: Cats

하나의 레이어에 이미지와 텍스트를 어떻게 배치하는지 보여줍니다.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>하나의 레이어를 사용합니다:
      <ul>
        <li><a href="/ko/docs/getting_started/visual_story/create_cover_page.html#vertical"><code>vertical</code></a> 템플릿을 사용합니다.</li>
        <li>3개의 요소를 사용합니다:
          <ul>
            <li>제목 <em>Cats</em>를 나타내기 위한 <code>&lt;h1></code> 요소</li>
            <li>반응형 <a href="/ko/docs/reference/components/amp-img">amp-img</a> (<code class="filename">cat.jpg</code>, 720 x 1280px)</li>
            <li>다음의 명언을 보여줄 <code>&lt;q></code> 요소: <em>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</em></li>
          </ul>
        </li>
      </ul></li></ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## 페이지 2: Dogs

두 개의 레이어를 두고 화면을 꽉 채우는 이미지와 그 위에 텍스트를 어떻게 배치하는지 보여줍니다.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>2개의 레이어를 사용합니다:
      <ul>
        <li><b>레이어 1</b>: <a href="/ko/docs/getting_started/visual_story/create_cover_page.html#fill"><code>fill</code></a> 템플릿을 사용하고, 반응형 전체 이미지 <a href="/ko/docs/reference/components/amp-img">amp-img</a> (<code class="filename">dog.jpg</code>, 720 x 1280px) 요소를 포함합니다.</li>
        <li><b>레이어 2</b>: <a href="/ko/docs/getting_started/visual_story/create_cover_page.html#thirds"><code>thirds</code></a> 템플릿을 사용하고 두 개의 요소를 사용합니다:
          <ul>
            <li>제목 <em>Dogs</em>를 나타내기 위한 <code>&lt;h1></code> 요소.</li>
            <li><code>&lt;p></code> 요소에 <a href="/ko/docs/getting_started/visual_story/create_cover_page.htm#thirds"><code>grid-area</code></a>를 <a href="/ko/docs/getting_started/visual_story/create_cover_page.html#thirds"><code>lower-third</code></a>로 지정하고 다음의 문구를 넣습니다: <em>Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf.</em></li>
          </ul>
        </li>
      </ul></li></ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## 페이지 3: Birds

화면을 꽉 채우는 이미지와 그 위에 텍스트를 배치하고 배경 음악을 어떻게 넣는지 보여줍니다.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>3개의 레이어를 사용합니다:
      <ul>
        <li><b>레이어 1</b>: <a href="/ko/docs/getting_started/visual_story/create_cover_page.html#fill"><code>fill</code></a> 템플릿을 사용하고, 반응형 전체 이미지 <a href="/ko/docs/reference/components/amp-img">amp-img</a> (<code class="filename">bird.jpg</code>, 720 x 1280px) 요소를 포함합니다.</li>
        <li><b>레이어 2</b>: <a href="/ko/docs/getting_started/visual_story/create_cover_page.html#vertical"><code>vertical</code></a> 템플릿을 쓰고 하나의 요소를 사용:
          <ul>
            <li>제목 <em>Birds</em>를 나타내기 위한 <code>&lt;h1></code></li>
          </ul>
        </li>
        <li><b>레이어 3</b>: <a href="/ko/docs/getting_started/visual_story/create_cover_page.html#vertical"><code>vertical</code></a> 템플릿을 쓰고 하나의 요소를 사용: 
          <ul>
            <li>다음의 인용구를 보여주는 <code>&lt;q></code> 요소: <em>A bird is three things: Feathers, flight and song, And feathers are the least of these.--Marjorie Allen Seiffert</em></li>
            <li>이번 레이어는 <code>class="bottom"</code>을 써서 화면의 아랫부분에 문구를 배치합니다.</li>
          </ul>
        </li>
      </ul></li>
      <li>페이지가 보여지는 동안 배경 음악을 재생합니다. 배경 음악을 사용하려면 <code>&lt;amp-story-page></code> 컴포넌트의 background-audio 속성을 설정하면 됩니다. 예를 들어, <code>background-audio="assets/bird-singing.mp3"</code></li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## 페이지 4: Rabbits

텍스트와 전체화면 동영상을 어떻게 배치하는지 보여줍니다.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>3개의 레이어를 사용합니다:
      <ul>
        <li><b>레이어 1</b>: <code>fill</code> 템플릿을 사용하고 반응형 <a href="/ko/docs/reference/components/amp-video">amp-video</a> (<code class="filename">rabbit.mp4</code>)를 포함합니다.
          <ul>
            <li><code>&lt;head></code> 섹션에 <a href="/ko/docs/reference/components/amp-video">amp-video</a> 컴포넌트를 제공하는 <strong>script를 꼭 추가해야 합니다</strong>.</li>
            <li><code>poster</code> 이미지 (<code class="filename">rabbit.jpg</code>)를 amp-video의 속성으로 <strong>꼭 넣습니다</strong>. AMP 스토리 유효성 검사를 통과하려면 반드시 설정해야 합니다.</li>
            <li>동영상이 자동재생되도록 <code>autoplay</code> 속성을 넣습니다. 이 속성은 AMP 스토리 유효성 검사를 위한 <strong>필수 사항</strong>입니다.</li>
            <li><code>loop</code> 속성을 설정하면 자동으로 반복 재생합니다.</li>
            <li>크기는 <code>width="720"</code> <code>height="1280"</code> 으로 넣고 <code>layout="responsive"</code>으로 설정합니다.</li>
          </ul></li>
        <li><b>레이어 2</b>: <code>vertical</code> 템플릿을 쓰고 하나의 요소를 사용:
          <ul>
            <li>제목 <em>Rabbits</em>을 나타내기 위한 <code>&lt;h1></code></li>
          </ul>
        </li>
        <li><b>레이어 3</b>: <code>vertical</code> 템플릿을 쓰고 하나의 요소를 사용:
          <ul>
            <li><code>&lt;p></code> 요소에 다음의 문구를 넣습니다: <em>Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful</em>.</li>
            <li>이번 레이어는 <code>bottom</code> CSS class를 써서 화면의 아랫부분에 문구를 놓습니다.</li>
          </ul>
        </li></ul></li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

“Joy of Pets”이야기는 거의 마무리 단계에 왔습니다. 이제는 마지막 페이지를 만들텐데 지금까지 나온 애완동물을 모두 보여주는 애니메이션을 넣을 계획입니다.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/ko/docs/getting_started/visual_story/create_cover_page.html"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="/ko/docs/getting_started/visual_story/animating_elements.html"><span class="arrow-next">다음</span></a>
</div>
