---
'$title': AMP 사이트를 PWA로 전환하기
$order: 10
description: PWA는 브라우저 내의 리소스를 캐싱하여 사용자에게 데이터, 애셋 및 오프라인 페이지를 제공하며 참여를 유도하고 정보를 전달합니다.
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

프로그레시브 웹 앱(PWA)는 [서비스 워커](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)를 활용하여 풍성한 오프라인 기능과 다양한 네트워크 강도에서 일관성 있는 사용자 경험을 선사합니다. PWA는 브라우저 내의 리소스를 캐싱하여 사용자에게 데이터, 애셋 및 오프라인 페이지를 제공하며 참여를 유도하고 정보를 전달합니다.

이번 튜토리얼에서는 웹 매니페스트 및 AMP 서비스 워커로 구동되는 서비스 워커를 추가하는 방식으로 AMP 사이트를 설치 가능하며 오프라인 기능을 갖춘 PWA로 전환하는 방법을 알려드립니다.

# 스타터 코드 다운로드 및 실행

[여기에서 스타터 코드](/static/files/tutorials/amptopwa.zip)를 다운로드합니다.

웹사이트 미리보기 시 로컬 웹 서버를 사용합니다.

[tip type="default"] **팁 –** 빠른 웹 서버를 위해 `python -m SimpleHTTPServer`를 사용하세요. [/tip]

이제 모바일 뮤직 매직 페스티벌인 Lyrical Lightning의 랜딩 페이지가 표시됩니다. 홈페이지의 링크 1개를 통해 일정 및 밴드 공연 무대를 확인할 수 있습니다.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

일정을 확인하려고 할 때 사이트 사용자의 네트워크 연결이 불안정할 수 있습니다. 그렇기에 사용자 홈 화면에 설치 가능하며 오프라인 시에도 모든 주요 기능을 제공하면 PWA로 이 사이트를 전환하면 좋을 것입니다.

# 웹 앱 매니페스트 생성

[웹 앱 매니페스트](https://developers.google.com/web/fundamentals/web-app-manifest/)는 웹 앱에 대한 정보를 브라우저에 전달하고 사용자의 모바일 기기 또는 데스크톱에 '설치'될 시 어떻게 작동해야 하는지를 알려주는 간단한 JSON 파일입니다. 여러 브라우저에서 [홈 화면에 추가 프롬프트](https://developers.google.com/web/fundamentals/app-install-banners/)를 표시하는 데 매니페스트를 필요로 합니다.

다음 코드를 사용해 저장소에 이름이 `manifest.json`인 파일을 추가합니다.

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# AMP 서비스 워커 추가

서비스 워커는 브라우저가 백그라운드에서 웹 페이지와 별도로 실행하는 스크립트로, 성능 개선 요청을 캐싱하고 오프라인 기능을 제공하여 브라우저의 기능을 확장합니다. 완전히 처음부터 서비스 워커를 제작하는 것도 가능하지만 시간이 많이 소요됩니다. Workbox와 같은 라이브러리도 유용할 수 있지만 AMP는 [AMP 서비스 워커](https://github.com/ampproject/amp-sw)를 제공하여 한 걸음 더 나아가 여러 단계를 직접 자동화합니다. 그 사례로는 AMP 스크립트, 애셋, 문서의 캐싱 및 [내비게이션 사전 로드](https://developers.google.com/web/updates/2017/02/navigation-preload)와 같은 일반적인 모범 사례의 구현 등이 있습니다.

AMP 서비스 워커는 설치 후 사용자가 [AMP 스크립트](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) 및 [문서](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching)를 요청할 때 자동으로 캐싱을 수행합니다. 그럼 이제 기본 AMP 서비스 워커를 추가하는 것부터 시작해보겠습니다.

## 서비스 워커 파일 생성

`sw.js`라는 이름의 파일을 생성하고 다음 코드를 추가합니다.

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

단 2줄의 코드만으로 AMP 서비스 워커를 내 서비스 워커로 가져와 시작할 수 있습니다.

## AMP 페이지에 서비스 워커 자동 설치

AMP 웹사이트는 [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) 컴포넌트를 사용하여 사용자가 콘텐츠를 이용하는 동안에도 브라우저 백그라운드에 서비스 워커를 설치할 수 있습니다.

`index.html`의 헤드에 필수 스크립트 태그를 추가하고 `<body>` 내에 `<amp-install-serviceworker>` 요소를 배치합니다.

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **중요–** 사이트의 모든 콘텐츠를 캐싱하려면 서비스 워커가 루트 디렉토리(`/sw.js`)에서 제공되어야 합니다. [/tip]

`<amp-install-serviceworker>`는 iframe을 생성하고 `data-iframe-src` 파일을 실행하여 서비스 워커를 설치합니다. `install-sw.html` 파일을 생성한 후 다음 코드를 추가하세요.

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

iframe이 브라우저에 AMP 서비스 워커 파일을 등록합니다.

# 캐시할 항목 맞춤 설정

AMP 서비스 워커는 기본 기능 및 앱의 니즈에 맞춰 최적화할 수 있는 선택 필드를 함께 제공합니다.

뮤직 페스티벌 앱은 이미지 애셋을 캐싱하고 라인업 링크를 미리 가져오고 오프라인 페이지를 지정합니다.

## 애셋 캐싱

AMP 서비스 워커에서 이미지, 동영상 글꼴과 같은 [애셋을 캐싱](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching)하도록 구성할 수 있습니다. 저희는 배경 이미지 및 AMP 로고를 캐싱하는 데 사용해보겠습니다. `sw.js` 파일을 열고 아래 코드에 업데이트하세요.

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

캐싱 전략을 [캐시 우선](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)으로 지정했습니다. 따라서 앱은 네트워크의 항목을 요청하기 전 우선 캐시로부터 이미지를 제공할 것입니다. 배경 이미지나 AMP 로고를 업데이트하지 않으므로 이 앱에 특히 유용한 전략입니다.

## 링크 미리 가져오기

AMP 서비스 워커는 `data-rel=prefetch` 속성이 포함된 링크를 미리 가져옵니다. 따라서 사용자는 방문한 적이 없는 페이지도 오프라인에서 볼 수 있습니다. 이 속성을 `lineup.html` 링크 태그에 포함하겠습니다.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# 오프라인 페이지 표시

예기치 못한 상황이나 미리 가져오지 않은 페이지 링크 클릭에 대처하여, 일반 브라우저 오프라인 페이지를 표시하는 대신 "브랜드" 일관성을 유지한 사용자 경험을 선사하는 오프라인 페이지를 추가하겠습니다. [여기에서 `offline.html`](/static/files/tutorials/offline.zip)을 다운로드하고 `sw.js`를 다음 코드로 업데이트합니다.

[sourcecode:js]
importScripts('https://cdn.ampproject.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# PWA 테스트

[Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps)를 활용하여 AMP 서비스 워커가 필수 애셋을 캐싱하고 적절한 오프라인 솔루션을 제공하는지 테스트할 수 있습니다.

`Ctrl + Shift + I`(Windows) 또는 `Cmd + Opt + I`(Mac) 키를 눌러 DevTools를 열고 Lyrical Lyghtning를 테스트합니다. 또는 페이지를 마우스 오른쪽 버튼으로 클릭하여 메뉴의 `inspect`를 선택할 수도 있습니다. 다음으로 `Application`를 선택하여 서비스 워커 등록을 확인합니다.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

`offline` 박스를 누르면 오프라인 모드로 전환됩니다. `전체 라인업 표시` 링크를 클릭하고 `offline.html`으로 이동하여 캐싱 및 미리 가져오기가 적절히 수행되었는지 확인할 수 있습니다.

[tip type="default"] **팁 –** 프로그레시브 웹 앱의 기능을 완벽히 분석하려면 [Google Lighhouse 도구](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool)를 실행하여 보고서를 생성합니다. [/tip]

# 축하합니다!

AMP를 사용한 PWA 생성을 성공적으로 완료하셨습니다! 이번 튜토리얼에서 학습한 내용은 다음과 같습니다.

- [웹 앱 매니페스트](https://developers.google.com/web/fundamentals/web-app-manifest/) 생성
- [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)를 사용하여 AMP에 서비스 워커 설치
- [AMP 서비스 워커](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) 맞춤 설정
- [링크 미리 가져오기 ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- 오프라인 페이지 생성

[서비스 워커](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html) 및 [오프라인 UX 고려 사항](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux)에 대해 자세히 읽어보세요. [분석을 통해 참여를 유도하는 방법](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html)을 학습하고 [AMP 페이지에 기본 분석을 설정하는 방법](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html)에 대한 튜토리얼도 살펴보세요.
