---
'$title': 웹 스토리 기술 세부 사항
$order: 1
description: 웹 스토리 기술 세부 사항
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

이 가이드는 AMP로 웹 스토리를 성공적으로 제작하기 위해 알고 있어야 할 모든 기술 세부 사항 및 모범 사례를 설명합니다.

## AMP 유효성

기술적으로 웹 스토리는 AMP로 제작된 단일 웹 페이지이며 AMP 사양을 준수해야 합니다.

- `<!doctype html>` doctype으로 시작해야 합니다.
- 최상위 태그인 `<html ⚡>` 또는 `<html amp>` 태그를 포함합니다.
- `<head>` 및 `<body>` 태그를 포함합니다.
- `<head>` 태그의 첫 번째 하위 요소로 `<meta charset="utf-8">` 태그를 포함합니다.
- `<head>` 태그에 `<script async src="https://cdn.ampproject.org/v0.js"></script>` 태그를 포함합니다. 모범 사례로서 `<head>`의 스크립트는 가능한 초기에 포함되어야 합니다.
- `<head>` 태그에 ` <link rel="canonical" href="page/url">` 태그를 포함하며 href를 사용해 웹 스토리 URL를 지정합니다.
- `<head>` 태그에 `<meta name="viewport" content="width=device-width">` 태그를 포함합니다. 또한 initial-scale=1도 사용하는 것이 좋습니다.
- `<head>` 태그에 [AMP 상용구](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) 코드를 포함합니다.

AMP 웹 페이지 및 AMP로 작성된 웹 스토리의 차이점은 [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories) 컴포넌트입니다. 이 컴포넌트는 문서 `<body>`의 유일한 하위 요소이며 `standalone` 속성을 포함해야 합니다. 모든 웹 스토리 페이지, 레이어 및 요소는 `<amp-story>` 태그에 정의됩니다.

```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
    ></script>
    <style amp-custom>
      ...;
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="assets/cover.jpg"
    >
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="assets/cover.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="assets/cat.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

[첫 웹 스토리 제작 튜토리얼](../start/visual_story/?format=stories)을 따르고 [amp-story 참조 문서를 읽어](../../components/reference/amp-story/?format=stories) 자세한 내용을 알아보세요.

## 최적의 성능 및 사용자 경험

사용자는 네트워크 연결이 부족한 지역이나 오래된 기기에서 웹 스토리를 볼 수도 있습니다. 다음의 모범 사례를 준수하여 쾌적한 사용자 경험을 제공하세요.

### 배경 색상

각 웹 스토리 페이지의 배경 색상을 지정합니다. 배경 색상이 있으면 사용자 여건으로 이미지 또는 동영상 애셋을 다운로드할 수 없는 경우 적절한 폴백 옵션이 제공됩니다. 페이지에 지정된 배경 애셋의 주요 색상을 대표하는 색이나 모든 스토리 페이지의 컬러 테마와 일관된 색상을 선택하세요. 가독성을 위해 배경 색상과 텍스트 색상은 다르게 구성하는 것이 좋습니다.

웹 스토리 문서 헤드의 `<style amp-custom>` 태그 또는 [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories) 컴포넌트 인라인으로 페이지 배경 색상을 정의합니다.

### 겹치는 요소

시스템 헤더는 음소거 및 공유 아이콘과 같은 제어 기능이 포함되며 배경 이미지 및 동영상보다 높은 z-index에 표시됩니다. 해당 아이콘으로 인해 가려진 필수 정보가 없는지 확인합니다.

### 가로세로비

웹 스토리 애셋의 가로세로비는 9:16으로 디자인합니다. 브라우저와 기기에 따라 페이지 높이와 너비가 달라지므로 필수 콘텐츠를 페이지 가장자리에 가깝게 배치하지 않습니다.

### 포스터 이미지

포스터 이미지는 동영상 다운로드 중 사용자에게 표시됩니다. 원활한 전환을 위해 포스터 이미지는 동영상을 대표할 수 있어야 합니다. amp-video 요소에 `poster` 속성을 추가하고 이미지 위치를 더해 포스트 이미지를 지정하세요.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## 동영상

모든 동영상은 [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories) 컴포넌트를 통해 추가되어야 합니다.

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### 해상도 및 품질

다음의 권장 최적화 옵션에 따라 동영상을 인코딩하여 품질을 조정할 수 있습니다.

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

HLS 세그먼트의 경우 지속 시간을 10초 이하로 유지하는 것이 좋습니다.

### 형식 및 크기

최적의 성능을 위해 동영상 크기는 4MB 미만으로 유지합니다. 크기가 큰 동영상은 여러 페이지로 분할하여 제공할 수도 있습니다.

하나의 동영상 형식만 제공할 수 있는 경우 MP4 형식을 제공합니다. 가능하다면 HLS 동영상을 사용하고 브라우저 호환성 폴백 옵션으로 MP4 형식을 지정합니다. 다음 동영상 코덱을 사용하세요.

<table>
  <tr>
   <td>MP4, HLS 및 DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### <source> vs src 지정</source>

`<amp-video>` 컴포넌트에서 `<source>` 하위 요소를 사용하여 `src` 속성에 동영상 소스를 지정합니다. `<source>` 요소를 사용하면 동영상 유형을 지정하고 백업 동영상 소스를 추가할 수 있습니다. MIME 유형을 지정하려면 `type` 속성을 사용해야 합니다. HLS 동영상의 경우 `application/x-mpegurl` 또는 `application/vnd.apple.mpegurl`을 사용합니다. 모든 기타 동영상 유형에는 `video/` MIME 접두어를 사용하고 `”video/mp4”` 등의 동영상 형식을 따릅니다.

```html
<amp-video
  id="video-page1"
  autoplay
  loop
  layout="fill"
  poster="https://example.com/media/poster.jpg"
>
  <source
    src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl"
  />
  <source src="https://amp-example.com/media/movie.mp4" type="video/mp4" />
</amp-video>
```

### 동영상 다음 자동 진행

amp-story-page로 공개되는 [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) 속성은 사용자가 탭하지 않아도 스토리 페이지를 진행할지 여부와 그 시점을 지정합니다. 동영상 다음에 스토리를 진행하려면 동영상 ID에 해당 속성을 추가하세요.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## 데스크톱 경험

웹 스토리 형식은 [선택적 데스크톱 경험](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in)을 지원합니다. 따라서 데스크톱 경험이 몰입형 전체 블리드 모드로 변경되며 세로형 패널 3개가 제공되는 기본 경험을 대체합니다. 모바일 사용자는 기기를 가로로 들어도 스토리를 볼 수 있습니다.

`<amp-story>` 컴포넌트에 `supports-landscape` 속성을 추가하여 데스크톱 지원 옵션을 선택할 수 있습니다.

```html
<amp-story
  standalone
  supports-landscape
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
</amp-story>
```
