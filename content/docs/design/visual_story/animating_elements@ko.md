---
$title: 에니메이션 적용하기
---

페이지안의 요소에 애니메이션을 적용하여 AMP 스토리를 더 멋지게 만들수 있습니다.
예를 들면, 왼쪽에서 제목이 날아온다든지 페이지로 떨어지는 동작이라든지
페이드인(fade-in) 효과 등을 넣을 수 있습니다. AMP 스토리 프레임웍에서는 다음과 같이
미리 정의된 애니메이션을 제공합니다:

<table>
<thead>
<tr>
  <th width="50%">애니메이션 프리셋</th>
  <th width="25%">기본 지속 시간(ms)</th>
  <th width="25%">기본 지연 시간(ms)</th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

어떤 요소에 애니메이션을 적용하려면, 위의 애니메이션 프리셋 중에서 선택하여
<code>animate-in="<em>&lt;animation preset></em>"</code> 속성을 넣습니다.
예를 들어, 어떤 구절을 페이지에 떨어뜨리는 애니메이션을 넣으려면
`animate-in="drop"` 속성을 텍스트 요소에 사용합니다.

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

{% call callout('재미를 위해', type='success') %}
`animate-in="<animation preset>"` 속성으로 다른 요소에도 여러가지 효과를
적용해보십시오.
{% endcall %}

## 애니메이션 타이밍

애니메이션 프리셋은 몇 가지 타이밍 변수에 대해서 기본값을 갖고 있습니다: 

* **delay**: 애니메이션 시작전에 얼마만큼 지체할지에 대한 변수. 예를 들어, .3s는
  해당 페이지로 전환 후 0.3초 이후에 애니메이션을 시작한다는 뜻입니다. 0s는
  애니메이션을 바로 시작한다는 뜻입니다.
* **duration**: 애니메이션이 얼마나 계속되는지에 대한 변수. 예를 들어, fade-in
  애니메이션을 시작부터 끝까지 500ms 정도 걸립니다.

`animate-in-delay`와 `animate-in-duration` 속성으로 delay와 duration을 조정할 수
있습니다. 다음 예는 `my-element`가 0.3초 이후에 페이지의 왼쪽에서부터 날아와서
0.5초안에 애니메이션이 끝나는 코드입니다.

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </div>
</amp-story-page>
```

## 마지막 페이지를 애니메이션으로 장식하기

이번에 작성할 페이지는 두 개의 레이어로 구성됩니다. 첫 번째 레이어는 동물 사진의
콜라쥬고 두 번째 레이어는 배너 텍스트를 보여줍니다. 다음의 코드를 이전 스토리
페이지 뒤에 넣습니다:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img src="assets/cat.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/dog.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/bird.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/rabbit.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

웹브라우저에서 AMP 스토리를 새로고침하십시오. 방금 만든 마지막 페이지가 잘
보이는지 확인합니다. 이런식으로 보입니까:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

이 정도만으로도 괜찮지만 모두 정적입니다. 이제 살아 움직이는 페이지를
만들어보겠습니다. 우선 “whoosh in” 효과로 페이지의 초기에 배너 텍스트가
오른쪽에서부터 흘러들어오도록 하겠습니다. <p> 요소의 속성에
`animate-in="whoosh-in-right"`을 추가합니다.

```html hl_lines="2"
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

스토리 페이지를 새로고침하여 배너가 흘러들어오는지 확인하십시오. 다음으로 이미지
모두에 fade in 효과를 줍니다. 각 `amp-img` 요소에 `animate-in="fade-in"` 속성을
추가합니다. 코드는 다음과 같습니다:

```html hl_lines="4 9 14 19"
<amp-img src="assets/cat.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/dog.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/bird.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/rabbit.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
```

자, 새로고침을 하고 해당 페이지로 이동하면 이미지가 fade in 하는 것을 볼 수 있을
것입니다. 그런데 모든 이미지가 똑같이 fade in을 하기 때문에 썩 그럴듯한 효과는
아닙니다. 각 애니메이션의 타이밍을 조정해서 좀 더 보기좋게 만들 수 있습니다.

텍스터 배너가 끝나는 얼추 0.4초 지점까지 첫번째 이미지의 애니메이션을 delay
하겠습니다. 다른 이미지는 0.2초씩 순서대로 나오도록 하겠습니다. amp-img 요소에
`animate-in-delay=""` 속성을 설정하면 됩니다.

```html hl_lines="5 11 17 23"
<amp-img src="assets/cat.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in" 
    animate-in-delay="0.4s">
</amp-img>
<amp-img src="assets/dog.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in" 
    animate-in-delay="0.6s">
</amp-img>
<amp-img src="assets/bird.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay=".8s">
</amp-img>
<amp-img src="assets/rabbit.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="1s">
</amp-img>

```

새로고침하고 다시 해당 페이지로 넘겨보십시오. 다음과 같은 그럴듯한 애니메이션이
만들어졌습니까?

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

이제 여러개의 효과를 섞거나 잇는 등 다양한 방법으로 애니메이션을 만들수 있게
되었습니다. 본 자습서는 기본적인 것만 다루어봤는데,
[AMP 스토리 레퍼런스 문서](/ko/docs/reference/components/amp-story.html#animations)에
더 자세한 내용이 있으니 참고하십시오.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/ko/docs/design/visual_story/add_more_pages.html"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="/ko/docs/design/visual_story/create_bookend.html"><span class="arrow-next">다음</span></a>
</div>
