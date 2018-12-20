---
$title: AMP 스토리 만들기 관련 권장사항
---

[TOC]

이 가이드는 [AMP 스토리](/ko/docs/reference/components/amp-story.html)를 만들 때 구현해야 하는 권장사항을 제공합니다.


## 배경 색상  

AMP 스토리 페이지의 배경 색상을 지정해야 합니다. 배경 색상을 지정하면 네트워크 연결 상태가 좋지 않아 사용자가 이미지나 동영상 애셋을 다운로드하지 못할 때도 만족스러운 대체 사용자 환경을 제공할 수 있습니다.

*   배경 색상은 페이지의 배경 애셋을 대표하는 색상이어야 합니다.
*   이미지나 페이지 자체의 색상과 자연스럽게 연결되는 색상을 선택합니다. 다음 중 하나를 선택할 수 있습니다.
    *   이미지/동영상을 대표하는 주 색상
    *   스토리의 모든 페이지에 적용할 일관된 테마 색상 
*   이미지가 로드되기 전에도 텍스트를 읽을 수 있도록 배경 색상은 글꼴 색상과 달라야 합니다.

## 텍스트 

### 가독성 보장

페이지에 오버레이되는 텍스트를 쉽게 읽을 수 있어야 합니다.

* 배경 이미지 및 배경 색상과 대조되는 글꼴 색상을 선택합니다.
* 텍스트와 이미지가 대조되도록 이미지와 텍스트 사이에 그라데이션 오버레이를 추가합니다.

### 최소한의 텍스트   

AMP 스토리는 보다 시각적인 경험을 제공하는 것이 목적이므로 페이지에서 텍스트가 차지하는 공간은 최소한으로 제한해야 합니다(1~2문장 이하). 페이지에 더 많은 텍스트가 필요하다고 생각된다면 페이지의 목적과 읽을 때의 흐름을 신중하게 따져 보세요.

## 동영상  

### 포스터 속성 지정 

`포스터`는 동영상이 다운로드될 때까지 UI에 표시되는 이미지입니다. 포스터는 일반적으로 동영상의 첫 프레임인데, 어떤 이미지든 사용할 수 있습니다.  하지만 동영상을 상징적으로 나타내면서도 부드러운 전환이 가능한 이미지를 선택해야 합니다. 첫 프레임을 선택하는 경우 빈 임시 프레임이 아닌지 확인해야 합니다. 

포스터 이미지의 권장 크기는 720p(너비: 720 x 높이: 1280)입니다.

*예: 포스터 지정하기*

```html
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

### `<source>` 지정하기 vs `src` 

[amp-video](/ko/docs/reference/components/amp-video.html)의 출처를 지정할 때 `src` 속성 대신 `<source>` 하위 요소를 사용하세요. `<source>` 요소를 사용하면 동영상 유형을 지정하고 더 많은 동영상 출처를 추가할 수 있습니다. `<source>` 요소에는 `"type"` 속성을 통해 MIME 유형을 지정하세요. HLS 동영상의 경우 `application/x-mpegurl` 또는 `application/vnd.apple.mpegurl` MIME 유형 중 하나를 지정해야 합니다. 다른 모든 동영상은 `video/` MIME 접두어와 동영상 형식(예: "`video/mp4`")을 지정하세요.

*예: 여러 소스 파일 지정하기*

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### 동영상 크기/ 길이

*  최적의 성능을 위해 제공되는 동영상은 4MB를 넘지 않도록 해야 합니다.
*   동영상이 길다면 여러 페이지에 동영상을 나눠 올려 보세요.
*   커버 페이지에는 특히 큰 동영상을 사용하지 않도록 하세요.

### 동영상 형식

하나의 동영상 형식만 제공하는 경우에는 **MP4**를 제공하세요.  하지만 가능한 경우 **HLS** 동영상을 사용하고 아직 HLS 동영상을 지원하지 않는 브라우저에서 이를 대체할 MP4 파일을 지정하세요. HLS는 적응형 비트 전송률 스트리밍을 실행하여 사용자의 네트워크 연결에 가장 적합하도록 동영상 품질을 변경합니다.

[tip type="note"]

HLS 동영상 형식은 (에뮬레이션을 통해서라도) 데스크톱 브라우저용 Chrome에서 지원되지 않으므로 페이지 데스크톱 트래픽을 위해 이를 대체할 MP4 파일을 지정해야 합니다. HLS 동영상을 디버깅하려면 USB 디버깅을 통해 실제 휴대기기를 사용해야 합니다.

[/tip]

### 동영상 해상도

AMP 스토리 동영상은 항상 수직(세로 모드)이고 예상 가로 세로 비율은 16:9입니다. 권장 동영상 스트리밍에 따른 유형 해상도를 사용하세요. 

<table>
  <thead>
    <tr>
     <th>Video streaming type</th>
     <th>Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non-adaptive</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptive</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>


[tip type="note"]

16:9 가로 세로 비율과 다른 휴대기기는 동영상이 표시 영역에 맞도록 가로 또는 세로로 잘립니다.

[/tip]


### 동영상 코덱

1.  MP4는 `H.264`를 사용합니다.
1.  WEBM은 `VP9`를 사용합니다.
1.  HLS 또는 DASH는 `H.264`를 사용합니다.


### 동영상 품질

#### 트랜스코딩 최적화

동영상을 인코딩하고 인코딩 중에 동영상 품질을 조정하는 데 사용할 수 있는 다양한 도구가 있습니다.  그중 몇 가지는 다음과 같습니다.

<table>
  <thead>
    <tr>
     <th>Tool</th>
     <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>An encoder that can also output the HLS format including the playlist.
     </td>
    </tr>
  </tbody>
</table>

#### HLS 세그먼트 크기

HLS 세그먼트는 보통 길이가 10초 이하가 되도록 크기를 조절하세요.

### 동영상 종료 후 다음 페이지로 이동

동영상 재생이 종료된 후 한 페이지에서 다른 페이지로 자동으로 이동하려는 경우 `<amp-story-page>`의 `auto-advance-after` 속성값은 동영상의 예상 길이가 아니라 동영상 ID로 설정해야 합니다. 즉, 다음과 같이 설정합니다.

```html
<amp-story-page auto-advance-after="myvideo">
```

다음은 잘못된 설정입니다.

```html
<amp-story-page auto-advance-after="9s">
```

왜냐하면 동영상이 페이지가 표시되는 동시에 정확히 재생을 시작하지 않거나 주어진 시간이 정확하지 않아 예상 길이와 실제 길이가 다를 수 있기 때문입니다. 이렇게 되면 동영상이 반복 재생되어 사용자에게 혼란을 줄 수 있습니다.
 
