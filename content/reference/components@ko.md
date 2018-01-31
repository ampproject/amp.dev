---
$title: 구성요소 / 태그
$order: 0
---
AMP HTML 라이브러리에서 제공하는 구성요소는 다음과 같이 분류됩니다.

- **기본 제공**: 기본 라이브러리에 포함된 `amp-img` 및 `amp-pixel` 등의 구성요소입니다.
- **[확장](https://github.com/ampproject/amphtml/blob/master/extensions/README.md)**: 기본 라이브러리의 확장 프로그램이며, 맞춤 요소로 문서에 분명히 포함되어야 합니다(예: `<script async custom-element="amp-audio"...`).
- **[실험용](experimental.html)**: 이미 출시되었지만 아직 일반적으로 사용할 수 없는 구성요소입니다.

다음은 구성요소를 카테고리별로 분류한 것입니다.

- [광고 및 애널리틱스](#광고-및-애널리틱스)
- [동적 콘텐츠](#동적-콘텐츠)
- [레이아웃](#레이아웃)
- [미디어](#미디어)
- [프레젠테이션](#프레젠테이션)
- [소셜](#소셜)

### 광고 및 애널리틱스

| 구성요소 | 설명 |
| --------- | ----------- |
| [`amp-ad`](components/amp-ad.html) | 광고를 표시하는 컨테이너입니다. |
| [`amp-ad-exit`](components/amp-ad-exit.html) | A4A(AMP for Ads)에 구성 가능한 광고 이탈 동작을 제공합니다.|
| [`amp-analytics`](components/amp-analytics.html) | AMP 문서에서 애널리틱스 데이터를 캡처합니다. |
| [`amp-auto-ads`](components/amp-auto-ads.html) | 원격으로 게재되는 구성 파일을 사용하여 AMP 페이지에 동적으로 광고를 삽입합니다. |
| [`amp-call-tracking`](components/amp-call-tracking.html) |  통화 추적이 가능하도록 하이퍼링크의 전화번호를 동적으로 교체합니다. |
| [`amp-experiment`](components/amp-experiment.html) | AMP 문서에서 사용자 환경 실험을 실시할 때 사용할 수 있습니다. |
| [`amp-pixel`](components/amp-pixel.html) | 페이지 조회수를 계산하는 추적 픽셀입니다. |
| [`amp-sticky-ad`](components/amp-sticky-ad.html) | 페이지 하단에 광고 콘텐츠를 표시하고 고정할 수 있습니다.|

### 동적 콘텐츠

| 구성요소 | 설명 |
| --------- | ----------- |
| [`amp-access-laterpay`](components/amp-access-laterpay.html) | 게시자가 소액결제 플랫폼인 [LaterPay](https://www.laterpay.net/)와 손쉽게 통합할 수 있습니다.
| [`amp-access`](components/amp-access.html) | AMP 페이월 및 구독 지원을 제공합니다.  |
| [`amp-bind`](components/amp-bind.html) | 사용자 작업 또는 데이터 변경에 따라 데이터 바인딩 및 JS와 같은 단순한 표현식을 통해 요소가 변경되도록 허용합니다. |
| [`amp-form`](components/amp-form.html) | 양식 지원을 제공합니다. |
| [`amp-gist`](components/amp-gist.html) | [GitHub Gist](https://gist.github.com/)를 표시합니다. |
| [`amp-install-serviceworker`](components/amp-install-serviceworker.html) | ServiceWorker를 설치합니다. |
| [`amp-list`](components/amp-list.html) | 동적으로 데이터를 다운로드하고 템플릿을 사용하여 목록 항목을 생성합니다. |
| [`amp-live-list`](components/amp-live-list.html) | 콘텐츠를 실시간으로 표시하고 업데이트할 수 있습니다. |
| [`amp-mustache`](components/amp-mustache.html) | [`Mustache.js`](https://github.com/janl/mustache.js/) 템플릿의 렌더링을 허용합니다. |
| [`amp-selector`](components/amp-selector.html) |  사용자가 선택할 수 있는 옵션 메뉴를 표시하는 컨트롤을 나타냅니다. |
| [`amp-user-notification`](components/amp-user-notification.html) | 닫을 수 있는 알림을 사용자에게 표시합니다. |
| [`amp-web-push`](components/amp-web-push.html) | 사용자가 [웹 푸시 알림]https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/)을 수신할 수 있습니다. |

### 레이아웃

| 구성요소 | 설명 |
| --------- | ----------- |
| [`amp-accordion`](components/amp-accordion.html) | 조회하는 사용자가 콘텐츠의 윤곽을 한눈에 파악하고 원하는 섹션으로 이동할 수 있습니다. |
| [`amp-app-banner`](components/amp-app-banner.html) | 앱 설치를 위한 클릭 유도문안을 보여주는 교차 플랫폼 고정 위치 배너의 래퍼 및 간단한 UI입니다. |
| [`amp-carousel`](components/amp-carousel.html) | 가로축을 따라 여러 개의 유사한 콘텐츠를 표시합니다. |
| [`amp-fx-flying-carpet`](components/amp-fx-flying-carpet.html) | 전체 표시 영역을 차지하지 않고도 전체화면 광고를 표시할 수 있도록 고유한 전체화면 스크롤 컨테이너에 하위요소를 래핑합니다. |
| [`amp-fx-parallax`](components/amp-fx-parallax.html) |  특정 요소에 3D 효과를 줄 수 있는 속성입니다. |
| [`amp-iframe`](components/amp-iframe.html) | iframe을 표시합니다. |
| [`amp-lightbox`](components/amp-lightbox.html) | '라이트박스' 또는 이와 유사한 환경을 허용합니다. |
| [`amp-position-observer`](components/amp-position-observer.html) | 사용자가 스크롤할 때 표시 영역에 있는 요소의 위치를 모니터링하고 다른 구성요소와 함께 사용할 수 있는 이벤트를 표시합니다. |
| [`amp-sidebar`](components/amp-sidebar.html) | 탐색, 링크, 버튼, 메뉴 등 임시 액세스용 메타 콘텐츠를 표시할 수 있습니다. |


### 미디어

| 구성요소 | 설명 |
| --------- | ----------- |
| [`amp-3q-player`](components/amp-3q-player.html) | [3Q SDN.](https://www.3qsdn.com) 동영상을 삽입합니다. |
| [`amp-anim`](components/amp-anim.html) |애니메이션 이미지(일반적으로 GIF)를 관리합니다. |
| [`amp-apester-media`](components/amp-apester-media.html) | [Apester](https://apester.com/) 스마트 단위를 표시합니다. |
| [`amp-audio`](components/amp-audio.html) | HTML5 `audio` 태그를 대체합니다. |
| [`amp-brid-player`](components/amp-brid-player.html) | [Brid.tv](https://www.brid.tv/) 플레이어를 표시합니다. |
| [`amp-brightcove`](components/amp-brightcove.html) | Brightcove [Video Cloud](https://www.brightcove.com/online-video-platform) 또는 [Perform](https://www.brightcove.com/perform) 플레이어를 표시합니다. |
| [`amp-dailymotion`](components/amp-dailymotion.html) | [Dailymotion](https://www.dailymotion.com) 동영상을 표시합니다. |
| [`amp-google-vrview-image`](components/amp-google-vrview-image) | VR 이미지를 표시합니다. |
| [`amp-hulu`](components/amp-hulu.html) | 간단하게 삽입된 [Hulu](http://www.hulu.com/) 동영상을 표시합니다. |
| [`amp-ima-video`](components/amp-ima-video.html) | [IMA SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/)와 통합된 스트림 내 광고용 동영상 플레이어를 삽입합니다. |
| [`amp-image-lightbox`](components/amp-image-lightbox.html) | '이미지 라이트박스' 또는 이와 유사한 환경을 허용합니다. |
| [`amp-img`](components/amp-img.html)  | HTML5 `img` 태그를 대체합니다. |
| [`amp-imgur`](components/amp-imgur.html)  | [Imgur](http://imgur.com/) 게시물을 표시합니다. |
| [`amp-izlesene`](components/amp-izlesene.html)  | [Izlesene](https://www.izlesene.com/) 동영상을 표시합니다. |
| [`amp-jwplayer`](components/amp-jwplayer.html) | 클라우드에 호스팅된 [JW Player](https://www.jwplayer.com/)를 표시합니다. |
| [`amp-kaltura-player`](components/amp-kaltura-player.html) | [Kaltura's Video Platform](https://corp.kaltura.com/)에 사용된 Kaltura Player를 표시합니다. |
| [`amp-nexxtv-player`](components/amp-nexxtv-player.html) | nexxOMNIA 플랫폼의 미디어 스트림을 표시합니다. |
| [`amp-o2-player`](components/amp-o2-player.html) | [AOL O2Player](http://on.aol.com/)를 표시합니다. |
| [`amp-ooyala-player`](components/amp-ooyala-player.html) |  [Ooyala](https://www.ooyala.com/) 동영상을 표시합니다. |
| [`amp-playbuzz`](components/amp-playbuzz.html) |  [Playbuzz](http://www.playbuzz.com/) 콘텐츠(예: 목록, 설문조사 등)를 표시합니다. |
| [`amp-reach-player`](components/amp-reach-player.html) | [Beachfront Reach](https://beachfrontreach.com/) 동영상 플레이어를 표시합니다. |
| [`amp-soundcloud`](components/amp-soundcloud.html) | [Soundcloud](https://soundcloud.com/) 클립을 표시합니다. |
| [`amp-springboard-player`](components/amp-springboard-player.html) | [Springboard Platform](http://publishers.springboardplatform.com/users/login) 동영상 플레이어를 표시합니다. |
| [`amp-video`](components/amp-video.html) | HTML5 `동영상` 태그를 대체합니다. |
| [`amp-vimeo`](components/amp-vimeo.html) | [Vimeo](https://vimeo.com/) 동영상을 표시합니다. |
| [`amp-youtube`](components/amp-youtube.html) | [YouTube](https://www.youtube.com/) 동영상을 표시합니다. |

### 프레젠테이션

| 구성요소 | 설명 |
| --------- | ----------- |
| [`amp-animation`](components/amp-animation.html) | 애니메이션을 정의하고 표시합니다. |
| [`amp-dynamic-css-classes`](components/amp-dynamic-css-classes.html) | 여러 동적 CSS 클래스 이름을 HTML 요소에 추가합니다. |
| [`amp-fit-text`](components/amp-fit-text.html) | 글꼴 크기를 주어진 공간 내에 있는 콘텐츠에 맞도록 늘이거나 줄입니다. |
| [`amp-font`](components/amp-font.html) | 맞춤 글꼴 로드를 트리거하고 모니터링합니다. |
| [`amp-timeago`](components/amp-timeago.html) | '***시간 전***(예: 3시간 전)'으로 날짜의 서식을 지정하여 불명확한 타임스탬프를 제공합니다. |
| [`amp-viz-vega`](components/amp-viz-vega.html) | [Vega](https://vega.github.io/vega/) 시각화 문법을 사용하여 제작한 시각화를 표시합니다.|


### 소셜

| 구성요소 | 설명 |
| --------- | ----------- |
| [`amp-facebook-comments`](components/amp-facebook-comments.html) | Facebook 댓글 플러그인을 삽입합니다. |
| [`amp-facebook-like`](components/amp-facebook-like.html) | Facebook 좋아요 버튼 플러그인을 삽입합니다. |
| [`amp-facebook`](components/amp-facebook.html) | Facebook 게시물 또는 동영상을 표시합니다. |
| [`amp-gfycat`](components/amp-gfycat.html) | [Gfycat](https://gfycat.com) 동영상 GIF를 표시합니다. |
| [`amp-instagram`](components/amp-instagram.html) | Instagram 퍼가기를 표시합니다. |
| [`amp-pinterest`](components/amp-pinterest.html) | Pinterest 위젯 또는 Pin It 버튼을 표시합니다. |
| [`amp-reddit`](components/amp-reddit.html) |  Reddit 댓글 또는 게시물 퍼가기를 표시합니다. |
| [`amp-social-share`](components/amp-social-share.html) | 소셜 공유 버튼을 표시합니다. |
| [`amp-twitter`](components/amp-twitter.html) | Twitter 트윗을 표시합니다. |
| [`amp-vine`](components/amp-vine.html) | Vine으로 간단하게 퍼가기를 표시합니다. |
