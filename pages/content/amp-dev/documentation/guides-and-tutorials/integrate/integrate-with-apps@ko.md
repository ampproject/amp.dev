---
$title: 앱과 AMP 통합
---

이 가이드는 AMP 페이지를 통합하고 연결하려는 모바일 및 웹 앱 개발자를 위해 작성되었습니다. AMP 버전의 공유 URL을 로드하여 더 빠른 사용자 환경을 제공하는 모바일 채팅 앱을 예로 들어 보겠습니다.

## 링크를 AMP로 변환

AMP를 사용하면 기본 앱 또는 모바일 웹 앱 내에서 외부 웹사이트를
거의 즉각적으로 렌더링할 수 있습니다. 콘텐츠의 URL을 상응하는
AMP URL(있는 경우)로 대치하고, 원래 버전 대신 AMP 버전을
열면 됩니다. 이때
[Google AMP URL API](https://developers.google.com/amp/cache/use-amp-url)와 같은 도구를 사용하면
도움이 됩니다.

예를 들어, 다음 메시지에서 모든 URL을 상응하는 AMP 버전(있는 경우)으로 교체하여
AMP 버전을 게재하도록 변환할 수 있습니다. 로드 시간을
줄이고 유효한 AMP가 게재되도록 하려면 AMP 캐시에
저장된 AMP 페이지에 연결해야 합니다.

원본 메시지

```text
This is a message with links to an <a href="http://www.example.org/a">
article with AMP version</a> and an <a href="http://www.example.org/b"> article without AMP version</a>.
```

변환된 메시지:

```text
This is a message with links to an <a href="https://www-example-org.cdn.ampproject.org/c/www.example.org/a">
article with AMP version</a> and an <a href="www.example.org/b"> article without AMP version</a>.
```

[tip type="success"]
앱의 환경설정을 통해 AMP 버전 대신 비 AMP 버전을 볼 수 있는
옵션을 제공하는 것도 고려해 보세요.
[/tip]

### 링크 변환 방법

프로그래밍 방식으로 링크를 변환하는 방법에는 세 가지가 있습니다.

1.  **서버측 저장시(권장)**: 서버측에 URL을 저장할 때 Google AMP URL API를 통해
    AMP URL을 가져오고 AMP URL과 함께 서버에 저장합니다. 공유하는 데
    원본 URL이 필요할 수 있으므로 두 URL을 모두 클라이언트에 전달합니다.
    클라이언트측 네트워크 요청이 감소되므로 권장하는 방식입니다.
    AMP 형식을 채택하는 웹사이트가 늘어나고 있으므로 이 접근법을 따를 경우
    AMP 버전 링크를 주기적으로(예: 매일) 검사해야 합니다.
1.  **서버에서 제공시(경우에 따라 사용 가능)**: 콘텐츠를 클라이언트에 전달하기 이전에
    Google AMP URL API를 통해 AMP URL을 가져옵니다. 위에서 언급한 대로
    공유하는 데 원본 URL이 필요할 수 있으므로 두 URL(AMP 및 비 AMP)을 모두
    클라이언트에 전달합니다. 이 방법은 확산성(fan-out)이 낮은 서비스(예를 들어, 문서의
    저장 빈도보다 읽기 빈도가 높을 경우 읽을 때 마다 매번 API를 호출하므로 비효율적임)에
    적합합니다.
1.  **클라이언트측(서버측을 이용할 수 없는 경우)**: 클라이언트에서
    Google AMP URL API를 통해 AMP URL을 가져옵니다. 서버측 URL 변환이 불가능한 경우(예:
    엔드 투 엔드 암호화를 사용하는 메시지 앱)에는
    이 접근법을 사용하십시오. 콘텐츠가 제공되는 즉시 사용자 상호작용이 이루어지기 전에
    URL 변환을 실행해야 합니다.

[tip type="important"]
사용자 상호작용의 결과로 Google AMP API를 통해 AMP URL을
요청하지 마세요. 그러면 네트워크에 추가적인 요청이 발생하므로
앱 성능이 저하됩니다. 대신에 위에서 설명한 세 가지 접근법 중 하나를
사용하세요.
[/tip]

#### Google AMP URL API

Google에서 제공하는 AMP URL API를 사용하면
주어진 URL 목록([공식 문서](https://developers.google.com/amp/cache/use-amp-url)/
[데모]({{g.doc('/content/amp-dev/documentation/examples/documentation/Using_the_AMP_URL_API.html', locale=doc.locale).url.path}}))과 일치하는 AMP HTML URL을 가져올 수 있습니다. 여기서 URL은
표준 버전이 아니어도 됩니다. AMP 버전이 있는 경우 원래 AMP URL과
Google AMP 캐시에 있는 캐시된 AMP 페이지 URL이 응답에
포함됩니다.

예를 들어, 아래와 같은 URL 목록이 주어질 경우:

```json
{"urls": [
  "https://www.example.org/article-with-amp-version",
  "http://www.example.com/no-amp-version.html"
]}
```

응답 본문에 JSON 형식의 AMP URL 매핑이 포함됩니다.

```json
{
  "ampUrls": [
    {
      "originalUrl": "https://www.example.org/article-with-amp-version",
      "ampUrl": "https://www.example.org/article-with-amp-version/amp",
      "cdnAmpUrl": "https://www-example-org.cdn.ampproject.org/c/s/www.example.org/article-with-amp-version"
    }
  ],
  "urlErrors": [
    {
      "errorCode": "NO_AMP_URL",
      "errorMessage": "AMP URL not found.",
      "originalUrl": "http://www.example.com/no-amp-version.html"
    }
  ]
}
```

[tip type="note"]
Google이 아닌 타사 AMP 캐시에 있는 AMP 페이지의 URL은 AMP URL API를 통해
가져올 수 없습니다. 하지만 반환되는 AMP URL(ampURL)에서 캐시된 URL을
쉽게 추출할 수 있습니다.
[/tip]

## AMP 캐시 사용

[AMP 캐시]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/index.md', locale=doc.locale).url.path}})는
유효한 AMP 문서를 전송하기 위한 프록시 기반의 콘텐츠 전송 네트워크(CDN)입니다.
AMP 캐시는 다음과 같은 목적으로 설계되었습니다.

* 유효한 AMP 페이지만 게재
* AMP 페이지가 효율적이고 안전하게 미리 로드되도록 지원
* 콘텐츠를 대상으로 사용자에게 유용한 추가 성능 최적화 실행

현재 두 가지 AMP 캐시 제공업체가 있습니다.

* [Google AMP 캐시](https://developers.google.com/amp/cache/)
* [Cloudflare AMP 캐시](https://amp.cloudflare.com/)

다음 두 가지 옵션 중 하나를 사용하여 앱에 AMP 파일을 표시할 수 있습니다.

1.  게시자가 호스팅하는 버전
1.  AMP 캐시에 호스팅되는 버전

다음 이유로 인해 AMP 캐시를 사용하는 것이 좋습니다.

*   더 빠른 로드 시간과 짧은 지연 시간으로 사용자 환경이 향상됩니다(1초 미만의 빠른
    로드 시간)
*   클라이언트 종속 아티팩트를 추가적으로 캐시(예: 클라이언트의
    표시 영역 크기에 따라 같은 이미지의 다른 버전을 캐시)하므로
    성능 및 대역폭 면에서 유리합니다.
*   원본 AMP 파일이 더 이상 유효한 AMP가 아닌 경우 사용자 환경을
    저해할 수 있습니다. 이 경우 AMP 캐시가 유효한 AMP 파일의 최종 버전을
    게재합니다.
*   정직하지 않은 게시자는 AMP 캐시 크롤러와 사용자를 대상으로
    서로 다른 두 가지 문서를 게재할 수 있습니다. AMP 캐시를 사용하면
    항상 캐시와 동일한 AMP 파일이 사용자에게 표시됩니다.

[tip type="important"]
AMP 캐시를 통해 AMP 페이지를 게재하는 경우에는 AMP의 원본을 명시하여
사용자가 표준 URL을 공유할 수 있는 뷰어 환경을
제공하세요. 자세한 내용은 다음 두 섹션을 참조하시기 바랍니다.
[/tip]

## AMP 뷰어 구현

AMP 런타임은 AMP 런타임과 뷰어 간에 메시지를 주고받을 수 있는
프로토콜을 갖춘 Viewer API를 제공합니다. 이 API를 사용하면
AMP 문서 사전 렌더링, 스와이프하여 기사 간 이동, AMP 런타임 도구를
제어할 수 있습니다. AMP Viewer API에 관한 자세한 내용은
[AMP 페이지에서 AMP 뷰어 연결](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md)
가이드를 참조하세요. [웹](https://github.com/ampproject/amp-viewer/blob/master/mobile-web/README.md)
및 [iOS](https://github.com/ampproject/amp-viewer/tree/master/ios)용 뷰어 구현 방식은
[GitHub](https://github.com/ampproject/amp-viewer)에서 확인할 수 있습니다. Android용
뷰어는 아직 제공되지 않습니다. Stack Overflow에 게시된 [이 답변](https://stackoverflow.com/questions/44856759/does-we-need-to-change-anything-in-usual-webpage-loader-for-loading-an-amp-acce/44869038#44869038)에서
AMP 페이지를 표시하기 위한 WebView를 설정하는 가장 좋은 방법을 참조하세요.

다음은 AMP 뷰어를 구현할 때 일반적으로 권장되는 사항입니다.

*   AMP 캐시에서 AMP 페이지 게재(1초 미만의 빠른 로드 시간)
*   기사의 게시자 원본 표시(예: 접을 수 있는 헤더에 표시)
*   공유 작업 제공(아래 '[AMP 콘텐츠 공유]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/integrate/integrate-with-apps.md', locale=doc.locale).url.path}}#sharing-amp-content)'
    섹션 참조)
*   WebView 기반 뷰어에서 타사 쿠키 활성화
*   플랫폼/앱에 대한 리퍼러 설정

### AMP 콘텐츠 공유

플랫폼의 AMP 뷰어 내에서 AMP 문서를 공유할 경우 플랫폼에서
표준 URL을 공유해야 합니다(기술적으로 가능한 경우). 예를 들어,
플랫폼에 공유 버튼이 있다면 이 버튼을 누르면 표준 URL을 공유할 수 있어야 합니다.

사용자에게 제공할 문서 버전을 플랫폼에서 선택하도록 하는 것이
AMP 프로젝트의 철학입니다. 따라서
다른 플랫폼과 공유할 때는 AMP 버전이 아닌 표준 버전을
공유한 다음 대상 플랫폼에서 적절한 형식을 선택하게 하는 것이
가장 좋습니다.
