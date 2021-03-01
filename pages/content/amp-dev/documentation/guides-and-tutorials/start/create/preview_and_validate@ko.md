---
'$title': Preview and validate
$order: 5
description: 다른 정적 HTML 사이트를 프리뷰하는 것처럼 AMP 페이지도 비슷하게 프리뷰할 수 있습니다. 어떤 빌드 단계나 전처리 단계를 요구하지 않습니다. 다음 중 하나를 선택...
author: pbakaus
contributors:
  - bpaduch
---

## 프리뷰

다른 정적 HTML 사이트를 프리뷰하는 것처럼 AMP 페이지도 비슷하게 프리뷰할 수 있습니다. 어떤 빌드 단계나 전처리 단계를 요구하지 않습니다. 다음 중 하나를 선택하세요.

- **파일 시스템을 통해 브라우저에서 페이지를 직접 엽니다** (어떤 요소는 XMLHttpRequests 실패로 인해 작동이 안될 수도 있습니다.)
- **Apache 2 또는 Nginx 같은 로컬 웹 서버를 사용합니다.**. _(팁: 빠른 웹 서버 사용을 위해 `python -m SimpleHTTPServer`를 실행합니다.)_

## 유효성 검사

그리고나서, AMP 페이지가 **실제로 유효한 AMP인지** 확인합니다. AMP가 유효하지 않다면 Google 검색같은 타사 플랫폼에서 검색되거나 배포되지 않습니다. 유효성 검사는 다음 단계로 진행합니다.

1. 브라우저에서 페이지를 엽니다.
2. "`#development=1`"을 URL에 추가합니다(예: `http://localhost:8000/released.amp.html#development=1`).
3. [Chrome DevTools 콘솔](https://developers.google.com/web/tools/chrome-devtools/debug/console/)을 열고 유효성 검사 오류를 확인합니다.

[tip type="read-on"] **읽어보기 –** [유효성 검사에 대해 알아보고](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), 오류가 발생했을 때 무엇을 해야하는 지 알아보세요. [/tip]
