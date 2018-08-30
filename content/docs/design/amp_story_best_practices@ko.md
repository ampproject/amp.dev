---
$title: AMP 스토리 제작 우수 사례
---

[TOC]

이 가이드에서는 [AMP story](/docs/reference/components/amp-story.html)를 제작할 때 반드시 해야하는 권장 사례를 제공합니다.

{{ youtube('2WjFBnCj2ew', 480, 270, caption='Watch our video on creating delightful AMP story experiences.') }}


## 배경색

AMP 스토리 페이지에 반드시 배경색을 정의해야합니다. 
배경색을 가지면 나쁜 네트워크 환경으로 인해 이미지나 비디오 에셋을 다운로드받지 못하더라도 좋은 대체 유저 경험을 제공할 수 있습니다.

*   배경색은 페이지의 배경 에셋에서 가장 많이 사용하는 색상을 나타내야합니다.
*   이미지 혹은 페이지 자체에서 자연스러운 전환을 허용하는 색상을 골라야합니다.
    *   이미지 혹은 비디오에서 많이 사용하는 색상을 고를 수 있습니다.
    *   스토리 내의 모든 페이지에서 고유한 테마 색상을 고를 수 있습니다.
*   배경색은 폰트 색상과 달라야 이미지가 로드되기 전에 텍스트를 읽을 수 있습니다.

## 텍스트

### 가독성 보장하기

페이지의 텍스트 오버레이를 읽을 수 있는 지 확인해야합니다.

* 폰트 색상은 배경 이미지나 배경색과 대조되는 색상을 선택하십시오.
* 이미지와 텍스트 사이에 그라디언트 오버레이를 추가하여 텍스트와 이미지를 대조하십시오.

### 한 눈에 볼 수 있는 텍스트

AMP 스토리가 더 나은 시각적인 경험을 제공하도록 설계되었으므로 페이지 내의 텍스트 크기를 한 눈에 볼 수 있는 크기의 덩어리로 제한해야합니다. (즉 1-2 문장 이하로 작성해야합니다.)
페이지 내의 텍스트가 적절하다고 생각되면 목표와 읽기 흐름을 신중하게 고려하시길 바랍니다.

## 비디오

### 포스터 속성 정의하기

`poster` 는 비디오가 다운되기 전까지 UI 내에 보여줄 이미지입니다. 포스터는 보통 비디오의 첫번때 프레임을 사용하지만 어떤 이미지여도 상관 없습니다.
그러나 비디오에 대해 나타내면서 자연스러운 전환을 허용하는 이미지를 선택하는 게 좋습니다. 만약 첫번째 프레임을 골랐다면 비어있는 임시 프레임이 아닌 지 확인하시길 바랍니다.

포스터 이미지의 권장 수치는 720p 입니다 (720w x 1280h).

*예제: 포스터 정의하기*

```html
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

### `<source>` vs `src` 정의하기

[amp-video](/docs/reference/components/amp-video.html) 의 소스를 정의할 때, `src` 속성을 대신하는 자식요소인 `<source>`를 사용할 수 있습니다. `<source>` 요소를 사용하면 비디오의 타입을 정의할 수 있으며 더 많은 비디오 소스를 정의할 수도 있습니다. `<source>` 요소에서 `"type"` 속성을 이용해 MIME 타입을 정의할 수 있습니다. HLS 비디오에서는 반드시 MIME 타입을 `application/x-mpegurl` 혹은 `application/vnd.apple.mpegurl` 로 정의해야합니다. 다른 비디오에서는, `video/` MIME 접두사와 비디오 포맷으로 정의할 수 있습니다. (예를 들어, "`video/mp4`")

*예제: 여러개의 소스 파일 정의하기*

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### 비디오의 사이즈와 길이

*  최적의 성능을 위해서 4 MB를 넘지 않는 비디오를 제공해야합니다.
*  긴 비디오는 여러개의 페이지로 나누는 것을 고려해봐야합니다.
*  커버 페이지에서는 특히 큰 비디오를 피하십시오.

### 비디오 포맷

만약 하나의 비디오 포맷만 제공할 수 있다면 **MP4** 로 제공하십시오. 하지만 가능하다면 **HLS** 비디오와 HLS 비디오를 아직 지원하지 않는 브라우저를 위한 대체제로 MP4를 정의하시길 바랍니다. HLS는 사용자의 네트워크 연결에 가장 적합한 비디오 품질을 제공할 수 있는 가변 비트레이트 스트리밍 (adaptive bitrate streaming)을 수행합니다.

{% call callout('노트', type='note') %}
HLS 비디오 포맷은 (에뮬레이션을 통하지 않고) Chrome for Desktop 브라우저에서 지원하지 않으므로 페이지의 데스크탑 트래픽에는 MP4를 대체로 정의해야합니다. HLS 비디오를 디버깅하려면 USB-디버깅을 통한 실제 모바일 기기를 사용해야합니다.
{% endcall %}

### 비디오 해상도

AMP 스토리 비디오는 항상 세로이며 (즉 포트레이트 뷰), 예상 종횡비는 16:9 입니다. 비디오 스트리밍 타입에 따라 권장 해상도를 사용하세요.

<table>
  <thead>
    <tr>
     <th>비디오 스트리밍 타입</th>
     <th>해상도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>비적응형 (Non-adaptive)</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>적응형 (Adaptive)</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>


{% call callout('노트', type='note') %}
종횡비가 16:9 가 아닌 모바일 기기인 경우 비디오를 뷰포트에 맞게 가로 혹은 세로로 자를 수 있습니다.
{% endcall %}


### 비디오 코덱

1.  MP4에서는 `H.264`를 사용합니다.
1.  WEBM에서는 `VP9`을 사용합니다.
1.  HLS나 DASH에서는 `H.264`를 사용합니다.


### 비디오 품질

#### 트랜스코딩 최적화 (Transcoding optimizations)

인코딩 중에 비디오 인코딩 및 비디오 품질 조정에 사용할 수 있는 다양한 도구가 있습니다.

<table>
  <thead>
    <tr>
     <th>도구</th>
     <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a>
     </td>
     <td>권장하는 최적화 방식:
      <ul>
        <li>MP4에서는 <code>-crf 23</code>를 사용합니다.</li>
        <li>WEBM에서는 <code>-b:v 1M</code>을 사용합니다.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a>
     </td>
     <td>권장하는 최적화 방식:
      <ul>
        <li>MP4에서는 <code>-crf 23</code>를 사용합니다.</li>
        <li>WEBM에서는 <code>-b:v 1M</code>을 사용합니다.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>재생 목록을 포함한 HLS 포맷도 출력 가능한 엔코더입니다.
     </td>
    </tr>
  </tbody>
</table>

#### HLS 세그먼트 크기

HLS 세그먼트의 크기가 보통 10초 이하인 지 확인하세요.

### 동영상 종료 후 다음 페이지로 이동하기

동영상 재생이 끝난 후 한 페이지에서 다른 페이지로 자동으로 넘어가려면 `<amp-story-page>`의 `auto-advance-after` 속성 값을 예상되는 동영상의 길이가 아닌 동영상의 id로 정의해야합니다. 다음 예에서,

```html
<amp-story-page auto-advance-after="9s">
```

가 아닌

```html
<amp-story-page auto-advance-after="myvideo">
```

를 사용하시길 바랍니다.

이는 비디오가 페이지에서 표시되는 시간과 정확히 같은 시간에 재생되지 않거나 주어진 길이가 올바르지 않아 예상 시간과 실제 시간이 다를 수 있기 때문입니다. 이로인해 비디오가 반복되어 유저에게 혼란을 줄 수 있습니다.