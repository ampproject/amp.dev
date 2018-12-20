---
$title: 미리보기 및 유효성 검사
---

다른 정적 HTML 사이트를 미리 보는 것처럼 AMP 페이지를 미리 봅니다. 빌드 단계나 사전 처리가 필요 없습니다. 다음 중 하나를 수행하세요.

  - **파일 시스템에서 브라우저에서 직접 엽니다.** (어떤 요소는 XMLHttpRequests 실패로 인해 작동이 안될 수도 있습니다.)
  - **Apache 2 또는 Nginx와 같은 로컬 웹 서버를 사용합니다.**
    *(팁: 빠른 웹 서버를 위해 `python -m SimpleHTTPServer`를 실행합니다.)*

그런 다음, AMP 페이지가 **실제로 유효한 AMP인지** 확인합니다. 그렇지 않으면 Google 검색과 같은 타사 플랫폼에서 검색되고 배포되지 않습니다. 유효성 검사를 하려면:

  1. 브라우저에서 페이지를 엽니다.
  1. "`#development=1`"을 URL에 추가합니다(예: `http://localhost:8000/released.amp.html#development=1`).
  1. [Chrome DevTools 콘솔](https://developers.google.com/web/tools/chrome-devtools/debug/console/)을 열고 유효성 검사 오류를 확인합니다.

[유효성 검사에 대해 알아보고]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validate.md', locale=doc.locale).url.path}}), 오류가 발생할 경우 수행할 작업에 대해 알아보세요.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/presentation_layout.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/prepare_for_discovery.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
