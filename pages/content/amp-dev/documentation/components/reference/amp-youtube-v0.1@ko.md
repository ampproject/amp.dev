---
$title: amp-youtube
$category@: media
teaser:
    text: YouTube 동영상을 표시합니다.
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



[YouTube](https://www.youtube.com/) 동영상을 표시합니다.

<table>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>예</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">amp-youtube의 주석이 포함된 코드 예</a></td>
  </tr>
</table>


## 예 <a name="example"></a>

반응형 레이아웃에서 예에 표시된 너비와 높이를 사용하면 가로세로 비율이 16:9인 동영상에 맞는 올바른 레이아웃이 생성되어야 합니다.

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
  [/sourcecode]

  [sourcecode:html]
  <amp-youtube
      id="myLiveChannel"
      data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  [/sourcecode]

## 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>이 속성이 있으면 브라우저에서 자동 재생을 지원합니다.
      <ul>
        <li>자동 재생이 시작되기 전에 동영상이 자동으로 음소거됩니다.
        </li>
        <li>동영상이 보이지 않게 스크롤하면 동영상이 일시중단됩니다.
        </li>
        <li>동영상이 보이게 스크롤하면 동영상이 다시 재생됩니다.
        </li>
        <li>사용자가 동영상을 탭하면 동영상의 음소거가 해제됩니다.
        </li>
        <li>사용자가 동영상과 상호작용하고(예: 음소거/음소거 해제, 일시중지/일시중지 해제) 동영상이 보이게 스크롤하거나 보이지 않게 스크롤하면 동영상이 사용자가 남겨 둔 상태 그대로 남아 있습니다. 예를 들어 사용자가 동영상을 일시중지한 다음 동영상이 보이지 않게 스크롤했다가 동영상으로 되돌아오면, 동영상은 여전히 일시중지한 상태로 남아 있습니다.
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>모든 YouTube 동영상 페이지 URL에 있는 YouTube 동영상 ID입니다.
          예를 들어 https://www.youtube.com/watch?v=Z1q71gFeRqM이라는 URL에서 <code>Z1q71gFeRqM</code>이 동영상 ID입니다.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>안정된 실시간 스트림 URL을 제공하는 YouTube 채널 ID입니다. 예를 들어 https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q라는 URL에서는 <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code>가 채널 ID입니다. 동영상이 아니라 실시간 스트림에 사용할 안정된 URL을 삽입하도록 <code>data-videoid</code>가 아닌 <code>data-live-channelid</code>를 제공할 수 있습니다. 채널에는 기본 자리표시자가 포함되어 있지 않습니다. 위의 예제 2에서 사용하는 동영상의 자리표시자를 제공할 수 있습니다.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td><code>data-param-*</code> 속성은 쿼리 매개변수로 YouTube iframe src에 추가됩니다. 컨트롤 표시 여부와 같은 맞춤 값을 YouTube 플러그인에 전달하는 데 사용할 수 있습니다.
            키와 값은 URI로 인코딩됩니다. 키는 대소문자를 구분합니다.
            <ul>
            <li>`data-param-controls=1` becomes `&amp;controls=1`</li>
          </ul>
          YouTube의 추가 매개변수 옵션은 <a href="https://developers.google.com/youtube/player_parameters">YouTube 내장 플레이어 매개변수</a>를 참조하세요.
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong><code>amp-video-docking</code> 확장 프로그램이 필요합니다.</strong> 이 속성이 있고 동영상을 수동으로 재생하는 경우 사용자가 동영상 구성요소의 시각적 영역 밖으로 스크롤하면 동영상이 '최소화'되고 모서리 또는 요소에 고정됩니다.
            자세한 내용은 <a href="amp-video-docking.md">도킹 확장 프로그램 자체에 관한 문서</a>를 참조하세요.</td>
        </tr>
        <tr>
          <td width="40%"><strong>credentials(선택사항)</strong></td>
          <td><code>Fetch API</code>에 지정된 대로 <a href="https://fetch.spec.whatwg.org/">credentials</a> 옵션을 정의합니다.
            <ul>
              <li>지원되는 값: `omit`, `include`</li>
              <li>기본값: `include`</li>
            </ul>
            <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">개인정보 보호 강화 모드에서 YouTube 플레이어</a>를 사용하려는 경우 <code>omit</code> 값을 전달합니다.
                일반적으로 플레이어를 로드할 때 YouTube에서 쿠키를 설정합니다. 개인정보 보호 강화 모드에서 사용자가 플레이어를 클릭하면 쿠키가 설정됩니다.</td>
            </tr>
            <tr>
              <td width="40%"><strong>공통 속성</strong></td>
              <td>이 요소에는 AMP 구성요소로 확장된 <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">공통 속성</a>이 포함되어 있습니다.</td>
            </tr>
          </table>

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양에서 [amp-youtube 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-youtube/validator-amp-youtube.protoascii)을 참조하세요.
