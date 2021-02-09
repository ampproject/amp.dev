---
'$title': 웹 스토리 제작 모범 사례
$order: 16
description: 웹 스토리는 독자가 콘텐츠에 몰입하도록 유도하는 탭 가능한 전면 경험입니다. 웹 스토리에 표시되는 광고는 일관성 있고 웹 스토리의 UX와 조화를 이루는 디자인으로 완성되어야 합니다.
formats:
  - ads
  - stories
---

웹 스토리는 독자가 콘텐츠에 몰입하도록 유도하는 탭 가능한 전면 경험입니다. 웹 스토리에 표시되는 광고는 일관성 있고 웹 스토리의 UX와 조화를 이루는 디자인으로 완성되어야 합니다. 이러한 디자인은 사용자 경험을 저해하거나 방해하지 않습니다. 이 가이드를 통해 웹 스토리에 적합한 광고를 제작하는 방식을 알아보세요.

## 웹 스토리 광고 원칙

배너 또는 박스와 같은 현재의 광고 형식은 웹 스토리 형식과 적절히 융합되지 않습니다. 기존의 광고는 느리고, 불편하며 스토리 경험과는 어울리지 않는 듯합니다.

웹 스토리 광고는 다음과 같은 원칙을 준수합니다.

- 유효한 AMPHTML 광고: 기존 [AMPHTML 광고](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md)와 동일한 기술적 사양을 준수합니다.
- 시각적 요소 중시: 편안하고 강렬한 컨텍스트 기반의 제안 상태.
- 네이티브: 광고 페이지의 크기는 광고 없는 스토리 페이지와 동일하게 유지합니다.
- 동일한 인터랙션 모델: 사용자는 광고 없는 스토리 페이지에서 하는 것처럼 다음 화면으로 넘어갈 수 있습니다.
- 빠른 속도: 광고는 절반만 로드된 상태로 사용자에게 표시되지 않습니다.

이러한 원칙과 일관성을 유지하기 위해 웹 스토리 런타임은 웹 스토리 중간의 광고 페이지를 배치할 적절한 위치를 결정합니다. [웹 스토리 광고](advertise_amp_stories.md)에서 광고를 배치하는 기술에 대해 자세히 읽어보세요.

## 웹 스토리 광고 예시

웹 스토리 광고는 AMPHTML 광고이지만 메타 태그 데이터가 필요하며 정의된 레이아웃 사양 및 필수 UI 요소를 충족합니다. 웹 스토리 광고에는 항상 행동 유도(CTA) 버튼이 포함되며 페이지 상단에는 텍스트 면책 조항이 광고 라벨로 표시됩니다.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Example of an AMP Story ad', caption='Example of an AMP Story ad', align='' ) }}

사용자 경험의 일관성을 유지하고자 웹 스토리 런타임은 광고 라벨 및 CTA 버튼 렌더링을 담당합니다.

[tip type="important"] **중요 – **웹 스토리 광고에서 클릭 가능한 요소는 CTA 버튼뿐이므로 광고 제작 시 이를 염두에 두세요. [/tip]

## 메타 태그 데이터

메타 태그 데이터는 웹 스토리 형식을 충족하는 광고를 지정하며 CTA 버튼 텍스트 열거형을 설정하고, 사용자가 버튼을 눌렀을 시 이동할 페이지와 해당 페이지의 유형을 지시합니다.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

[사용 가능한 CTA 버튼 텍스트 옵션](#call-to-action-button-text-enum)에서 amp-cta-type 태그를 선택하시길 권장합니다. 필요한 경우 AMP에서 사전 정의된 옵션을 자동으로 현지화합니다.

사용자 지정 텍스트는 허용되지만 현지화는 자체적으로 구현하셔야 합니다.

## Call to action button text enum <a name="call-to-action-button-text-enum"></a>

행동 유도(CTA) 버튼은 사전 구성된 옵션 집합에서 구성할 수 있습니다.

- `APPLY_NOW`: "지금 신청하기"
- `BOOK_NOW`: "예약하기"
- `BUY_TICKETS`: "티켓 구입하기"
- `DOWNLOAD`: "다운로드"
- `EXPLORE`: "지금 둘러보기"
- `GET_NOW`: "지금 받기"
- `INSTALL`: "지금 설치하기"
- `LISTEN`: "지금 듣기"
- `MORE`: "더 보기"
- `OPEN_APP`: "앱 열기"
- `ORDER_NOW`: "지금 주문하기"
- `PLAY`: "플레이"
- `READ`: "지금 읽기"
- `SHOP`: "지금 쇼핑하기"
- `SHOWTIMES`: "쇼타임"
- `SIGN_UP`: "가입하기"
- `SUBSCRIBE`: "지금 구독하기"
- `USE_APP`: "앱 사용하기"
- `VIEW`: "보기"
- `WATCH`: "시청하기"
- `WATCH_EPISODE`: "에피소드 시청하기"

[tip type="note"] **NOTE –** Deep links to apps are not supported, but links to the App Store page or the Google Play Store page are supported using http/https. The CTA button text enum is specified in the ad response payload. [/tip]

If support is needed for a new CTA button text enum, please open a [GitHub issue](https://github.com/ampproject/amphtml/issues/new).

## 광고 랜딩 페이지

웹 스토리 광고 랜딩 페이지의 3가지 옵션 중 하나를 지정할 수 있습니다.

- `STORY`: 랜딩 페이지가 [후원 스토리](story_ads_best_practices.md#sponsored-story)입니다.
- `AMP`: 랜딩 페이지가 유효한 AMP 페이지입니다.
- `NONAMP`: 기타 유형의 웹페이지입니다.

## 레이아웃

웹 스토리는 가로형이며 전체 화면으로 제공됩니다. 일관적인 사용자 경험을 위해 스토리 광고는 이 형식과 일치해야 합니다.

## 오버레이 크기

광고 라벨은 광고의 전체 너비에 어두운 그라데이션 바를 오버레이하며 상단에서 46px 하단으로 확장됩니다.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstration of ad overlay', caption='The ad overlay sits at the top', align='' ) }}

CTA 하단으로부터 32px 지점에 위치하며 가로 중앙에 있습니다. 크기는 120px x 36px입니다.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstration of the CTA Button', caption='The CTA Button sits near the bottom', align='' ) }}

## 이미지 및 동영상

AMP 스토리 광고에 포함되는 이미지 및 동영상은 4:3 표준 전체 화면이어야 합니다. 동영상을 포함한 광고는 [포스터](../../../documentation/components/reference/amp-video.md#poster)를 사용해야 하며, 포스터 이미지에 권장되는 크기는 720p(720w x 1280h)입니다.

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### 이미지

배경 이미지는 전체 화면으로 확장될 수 있습니다. 다음 CSS는 동영상 및 이미지를 자르고 중앙에 배치하는 좋은 방법입니다.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### 동영상

#### `<source>` vs `src` 지정

[`amp-video`](../../../documentation/components/reference/amp-video.md) 소스 지정 시.

예제: 여러 소스 파일 지정

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### 동영상 크기 및 길이

최적의 성능을 위해 4MB를 초과하지 않는 동영상 제공을 목표로 하는 것이 좋습니다. 파일 크기가 작을수록 다운로드 속도가 빨라지므로 크기를 최대한 작게 유지하세요.

#### 동영상 형식

단일한 동영상 형식만을 제공할 수 있다면 **MP4**를 제공합니다. 하지만 가능하다면 **HLS** 동영상을 사용하고 HLS 동영상이 지원되지 않는 브라우저의 폴백으로 MP4를 지정합니다. HLS는 사용자의 네트워크 연결에 가장 적합하게 동영상 품질이 변경되는 적응형 비트 속도 스트리밍을 수행합니다.

[tip type="note"] **참고 – ** HLS 동영상은 데스크톱 브라우저용 Chrome에서 지원되지 않습니다(에뮬레이션을 통해서도 지원 불가). 그러므로 페이지로 전송되는 모든 데스크톱 트래픽을 위한 MP4 폴백이 필요합니다. HLS 동영상을 디버그하려면 USB 디버깅을 통해 실제 모바일 기기를 사용해야 합니다.[/tip]

#### 동영상 해상도

웹 스토리 동영상은 항상 수직(즉, 세로 방향)으로 제공되며 필요한 가로세로비는 16:9입니다. 동영상 스트리밍 유형에 따라 다음과 같은 권장 해상도를 사용하세요.

<table>
  <thead>
    <tr>
     <th>동영상 스트리밍 유형</th>
     <th>해상도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>비적응형</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>적응형</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **참고–** 가로세로비가 16:9와 다른 모바일 기기에서는 뷰포트에 맞추기 위해 동영상이 가로 또는 세로로 잘릴 수 있습니다. [/tip]

#### 동영상 코덱

1. MP4: `H.264` 사용.
2. WEBM: `VP9` 사용.
3. HLS 또는 DASH: `H.264` 사용.

#### 동영상 품질

##### 트랜스코딩 최적화

동영상을 인코딩하고 인코딩 중 동영상 품질을 조정하는 데 활용 가능한 다양한 도구가 있습니다. 아래에서 일부 예시를 확인하세요.

<table>
  <thead>
    <tr>
     <th>도구</th>
     <th>참고 사항</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>권장 최적화:       <ul>         <li>MP4: <code>-crf 23</code> 사용.</li>         <li>WEBM:  <code>-b:v 1M</code> 사용.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>권장 최적화:       <ul>         <li>MP4: <code>-crf 23</code> 사용.</li>         <li>WEBM:  <code>-b:v 1M</code> 사용.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>플레이리스트를 포함한 HLS 형식도 출력 가능한 인코더.</td>
    </tr>
  </tbody>
</table>

##### HLS 세그먼트 크기

HLS 세그먼트 크기가 일반적으로 10초를 초과하지 않도록 유의합니다.

## Animation

스토리에서 애니메이션 사용 시 "표시"되는 것의 개념과 같은 몇 가지 사항에 주의해야 합니다. 예를 들어 "3 패널" 데스크톱 뷰에서는 페이지에 광고가 표시되지만 중앙 초점에서 벗어날 수 있습니다. 페이지가 주요 초점으로 바뀔 경우 애니메이션이 시작되는 효과를 원한다면 문제가 될 수 있습니다.

이러한 상황을 지원하고자 AMP는 모든 지원 컨텍스트에서 초점이 될 경우 광고 본문에 `amp-story-visible`라는 특수 속성을 추가합니다. 해당 시그널에 기반하여 애니메이션을 시작하는 것이 권장됩니다.

예제: 페이지가 중심에 위치할 때 애니메이션이 시작되고, 사용자가 스토리의 다른 페이지를 클릭하고 돌아오면 재시작됩니다.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## 후원 스토리 <a name="sponsored-story"></a>

후원 스토리는 웹에서 URL로 존재하며 AMP 스토리 광고의 행동 유도 버튼에서 후원 스토리로의 사용자 트래픽을 창출합니다. 후원 스토리는 AMP 스토리지만 몰입도가 높고 확장 간으한 광고 경험을 중점으로 구성됩니다.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='CTA button directs to a Sponsored Story', caption='CTA button directs to a Sponsored Story', align='' ) }}

[여기에서 웹 스토리](../start/create_successful_stories.md) 제작에 대해 자세히 알아보세요.
