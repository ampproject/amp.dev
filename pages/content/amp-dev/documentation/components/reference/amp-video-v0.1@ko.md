---
$title: amp-video
$category@: media
teaser:
    text:  HTML5 동영상 태그를 대체합니다.
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



HTML5 `video` 태그의 대체 태그입니다. HTML5 동영상 파일 직접 삽입에만 사용합니다.

<table>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://ampjs.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>예</strong></td>
    <td>AMP By Example의 예:<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">amp-video 예</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">amp-video의 클릭하여 재생 오버레이</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
      <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
    </tr>
  </table>

## 동작 <a name="behavior"></a>

`amp-video` 구성요소에서는 런타임에서 결정한 시간에 `src` 속성으로 지정된 동영상 리소스를 로드합니다. 표준 HTML5 `<video>` 태그와 동일한 방식으로 `amp-video` 구성요소를 제어할 수 있습니다.

`amp-video` 구성요소에서는 하위 요소로 고유한 유형의 HTML 노드를 4개까지 허용합니다.

* `source` 태그: HTML `<video>` 태그에서와 같이 `<source>` 태그 하위 요소를 추가하여 재생할 여러 다른 소스 미디어 파일을 지정할 수 있습니다.
* `track` 태그: 동영상에서 자막을 사용하도록 설정합니다. 문서와 다른 원본에서 트랙을 호스팅하는 경우 `<amp-video>` 태그에 `crossorigin` 속성을 추가해야 합니다.
* 동영상이 시작하기 전의 자리표시자
* 브라우저에서 HTML5 동영상을 지원하지 않는 경우 대체: 하나 이상의 직속 하위 노드에 `fallback` 속성이 있을 수 있습니다. 이 노드와 하위 노드가 있으면 HTML5 동영상이 사용자의 브라우저에서 지원되지 않는 경우 해당 노드가 표시되는 콘텐츠를 구성합니다.

#### 예 <a name="example"></a>

[example preview="inline" playground="true" imports="amp-video"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  layout="responsive"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## 분석 <a name="analytics"></a>

`amp-video`에서는 바로 사용할 수 있는 분석을 지원합니다. 자세한 정보는 [동영상 분석](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)을 참조하세요.

## 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td><code>&lt;source&gt;</code> 하위가 없는 경우 필요합니다. HTTPS여야 합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>동영상 재생을 시작하기 전에 표시할 프레임의 이미지입니다. 기본적으로
        첫 번째 프레임이 표시됩니다.
        <br>
        또는 클릭하여 재생 오버레이를 표시할 수 있습니다. 세부정보는 아래 <a href="#click-to-play-overlay">클릭하여 재생 오버레이</a> 섹션을 참조하세요.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>이 속성이 표시되지 않고 브라우저에서 자동 재생을 지원하는 경우 동영상이 표시되는 즉시 자동으로
            재생됩니다. 구성요소를 재생하기 위해 처리 완료되어야 하는 조건이 몇 가지 있습니다.
            <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#autoplay">이 조건은 AMP 사양의 동영상에서 간략하게 설명</a>합니다.</td>
        </tr>
        <tr>
          <td width="40%"><strong>controls</strong></td>
          <td>이 속성은 HTML5 <code>video</code>의 <code>controls</code> 속성과 비슷합니다. 이 속성이 표시되면 브라우저에서 사용자가 동영상 재생을 제어할 수 있는 컨트롤을 제공합니다.</td>
        </tr>
        <tr>
          <td width="40%"><strong>controlsList</strong></td>
          <td>HTML5 동영상 요소의 <a href="https://developer.mozilla.org/ko-KR/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> 속성과 같습니다. 특정 브라우저에서만 지원됩니다. 세부정보는 <a href="https://developer.mozilla.org/ko-KR/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/ko-KR/docs/Web/API/HTMLMediaElement/controlsList</a>를 참조하세요.</td>
        </tr>
        <tr>
          <td width="40%"><strong>dock</strong></td>
          <td><strong><code>amp-video-docking</code> 확장 프로그램이 필요합니다.</strong> 이 속성이 있고 동영상을 수동으로 재생하는 경우 사용자가 동영상 구성요소의 시각적 영역 밖으로 스크롤하면 동영상이 '최소화'되고 모서리 또는 요소에 고정됩니다.
              자세한 내용은 <a href="amp-video-docking.md">도킹 확장 프로그램 자체에 관한 문서</a>를 참조하세요.</td>
          </tr>
          <tr>
            <td width="40%"><strong>loop</strong></td>
            <td>동영상이 끝에 도달하면 시작 부분으로 돌아와 자동으로 연속 재생합니다(있는 경우).</td>
          </tr>
          <tr>
            <td width="40%"><strong>crossorigin</strong></td>
            <td><code>track</code> 리소스가 문서와 다른 원본에서 호스팅되는 경우 필요합니다.</td>
          </tr>
          <tr>
            <td width="40%"><strong>disableremoteplayback</strong></td>
            <td>미디어 요소에 Chromecast 또는 AirPlay와 같은 원격 재생 UI가 있을 수 있는지 결정합니다.</td>
          </tr>
          <tr>
            <td width="40%"><strong>muted(지원 중단됨)</strong></td>
            <td><code>muted</code> 속성은 지원이 중단되었으므로 더 이상 적용되지 않습니다. <code>autoplay</code> 속성에서 음소거 동작을 자동으로 제어합니다.</td>
          </tr>
          <tr>
            <td width="40%"><strong>noaudio</strong></td>
            <td>동영상에 오디오가 없는 것으로 주석 처리합니다. 그러면 동영상이 자동재생될 때 표시되는
                이퀄라이저 아이콘을 숨깁니다.</td>
            </tr>
            <tr>
              <td width="40%"><strong>rotate-to-fullscreen</strong></td>
              <td>동영상이 표시되고 사용자가 기기를 가로 모드로 회전하면 동영상이 전체 화면으로 표시됩니다. 자세한 내용은 <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#rotate-to-fullscreen">AMP 사양의 동영상</a>을 참조하세요.</td>
            </tr>
            <tr>
              <td width="40%"><strong>공통 속성</strong></td>
              <td>이 요소에는 AMP 구성요소로 확장된 <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">공통 속성</a>이 포함됩니다.</td>
            </tr>
          </table>

## Media Session API 속성 <a name="media-session-api-attributes"></a>

`amp-video` 구성요소에서는 개발자가 동영상 파일에 관한 자세한 정보를 지정하는 데 사용할 수 있는 [Media Session API](https://developers.google.com/web/updates/2017/02/media-session)를 구현합니다. 동영상에 관한 추가 정보는 사용자 기기의 알림 센터에 표시됩니다(재생/일시중지 컨트롤과 함께).

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>동영상의 아트워크로 제공되는 PNG/JPG/ICO 이미지의 URL을 지정합니다. `artwork`가 표시되지 않으면 Media Session API 도우미에서 `schema.org` 정의의 `image` 필드, `og:image` 또는 웹사이트의 `favicon`을 사용합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>동영상 파일의 저자를 나타내며 문자열로 지정합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>동영상의 출처인 앨범/컬렉션을 나타내며 문자열로 지정합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>동영상의 이름/제목을 나타내며 문자열로 지정합니다. 표시되지 않는 경우 Media Session API 도우미에서 `aria-label` 속성을 사용하거나 페이지 제목으로 대체합니다.</td>
  </tr>
</table>

예:

이 예에는 `poster`와 `artwork` 속성이 둘 다 포함되어 있습니다. `poster`는 동영상 재생 전의 자리표시자 이미지로 제공되는 반면 `artwork`는 MediaSession API를 통해 알림에 표시되는 이미지입니다.

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## 클릭하여 재생 오버레이 <a name="click-to-play-overlay"></a>

클릭하여 재생 오버레이는 웹에서 실행되는 동영상 플레이어에 대한 일반적인 UX 기능입니다.  예를 들어 사용자가 클릭할 맞춤 재생 아이콘을 표시할 뿐 아니라 동영상 제목, 다른 크기의 포스터 이미지 등을 포함할 수 있습니다.  `amp-video` 구성요소에서는 표준 `play` AMP 작업을 지원하므로 클릭하여 재생을 쉽게 구현할 수 있습니다.

자세한 예는 AMP By Example에 있는 [amp-video의 클릭하여 재생 오버레이](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/)를 참조하세요.

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양의 [amp-video 규칙](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)을 참조하세요.
