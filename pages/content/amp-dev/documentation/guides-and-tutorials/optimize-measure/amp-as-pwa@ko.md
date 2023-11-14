---
$title: AMP 페이지에 프로그레시브 웹 앱 기능 사용 설정
---

{{ image('/static/img/docs/pwamp_add_to_homescreen.png', 848, 1500, align='right third', caption='"홈 화면에 추가" 메시지를 트리거하는 AMPbyExample.') }}

대부분의 웹사이트에는 AMP 이외의 기능이 필요하지 않습니다. 예를 들어 [Examples](../../../documentation/examples/index.html)은 AMP이면서 프로그레시브 웹 앱이기도 합니다.

1. [웹 앱 매니페스트](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)가 있어서 '홈 화면에 추가' 배너가 표시됩니다.
1. [서비스 워커](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)가 있기 때문에 다른 기능은 물론 오프라인 액세스도 지원합니다.

AMP를 지원하는 플랫폼 사용자가 [Examples](../../../documentation/examples/index.html)에 방문한 다음 클릭을 통해 해당 사이트에서 계속 탐색하면, AMP 캐시에서 원본으로 이동하게 됩니다. 웹사이트에서는 계속해서 AMP 라이브러리를 사용합니다. 하지만 이제 원본에서 게시되기 때문에 서비스 워커 사용, 설치 메시지 표시 등의 기능을 사용할 수 있습니다.

주의사항: 서비스 워커는 AMP 캐시 버전의 페이지와 상호작용할 수 없습니다. 원본으로 이동할 때 서비스 워커를 사용하세요.

## 웹 앱 매니페스트 추가하기

AMP 페이지에 [웹 앱 매니페스트](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)를 추가하면 사용자가 기기 홈 화면에 사이트를 설치할 수 있습니다. AMP의 웹 앱 매니페스트는 일반 매니페스트와 동일합니다.

먼저 매니페스트를 만듭니다.

[sourcecode:json]
{
  "short_name": "ABE",
  "name": "AMPByExample",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-4x.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html?launcher=true"
}
[/sourcecode]

그런 다음 AMP 페이지의 `<head>`에서 매니페스트를 연결합니다.

[sourcecode:html]
<link rel="manifest" href="/manifest.json">
[/sourcecode]

팁: [WebFundamentals 웹 앱 매니페스트](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/)에 관해 자세히 알아보세요.

## 서비스 워커를 설치하여 오프라인 액세스 사용

서비스 워커는 페이지와 서버 사이에 위치하는 클라이언트측 프록시로서 멋진 오프라인 환경을 구축하고, 앱 셸 시나리오를 빠르게 로드하고, 푸시 알림을 전송하는 데 사용할 수 있습니다.

참고: 서비스 워커라는 개념을 처음 접하시는 분은 [WebFundamentals 소개](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)를 읽어보세요.

서비스 워커는 특정 페이지에 등록되어야 합니다. 그렇지 않으면 브라우저에서 서비스 워커를 찾거나 실행할 수 없습니다. 기본적으로 이 작업에는 [자바스크립트](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration)가 필요합니다. AMP 페이지에서는 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) 구성요소를 사용하여 동일한 작업을 처리할 수 있습니다.

우선 페이지의 `<head>`에 있는 스크립트를 통해 [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) 구성요소를 포함시킵니다.

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

그런 다음 `<body>` 안에 다음 항목을 추가합니다. 실제로 사용하는 서비스 워커를 가리키도록 수정하세요.

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

사용자가 원본에 있는 AMP 페이지(AMP 캐시에서 제공되는 최초 클릭과는 다름)로 이동하면 서비스 워커가 중심이 되어 [여러 가지 멋진 작업](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux)을 할 수 있게 됩니다.

## 서비스 워커를 통해 AMP 페이지 확장하기

위에 설명된 방법을 사용하면 AMP 웹사이트에 오프라인으로 액세스할 수 있을 뿐만 아니라 **AMP 페이지가 원본에서 제공되는 즉시** 페이지를 확장할 수 있습니다. 서비스 워커의 `fetch` 이벤트를 사용하여 응답을 수정하고 원하는 응답을 반환할 수 있기 때문입니다.

[sourcecode:js]
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })

        // 응답을 반환하기 전에 여기에서 수정하세요..
        ...

        return response || fetchPromise;
      })
    })
  );
});
[/sourcecode]

이 방법을 사용하면 AMP 페이지에서
[AMP 유효성 검사](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)를 통과하지 못하는 모든 추가 기능을 수정할 수 있습니다.

* 맞춤 JS를 필요로 하는 동적 기능
* 내 사이트에 맞춤설정되었거나 내 사이트에만 관련이 있는 구성요소
