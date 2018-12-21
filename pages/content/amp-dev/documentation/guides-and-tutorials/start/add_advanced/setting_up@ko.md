---
$title: 설정
---

## 기본 요건

가이드를 **시작하기 전에** 다음이 필요합니다.

- HTML, CSS, 자바스크립트 기본 지식
- AMP의 핵심 개념에 관한 기본적인 이해(['HTML을 AMP로 변환하기']({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md', locale=doc.locale).url.path}}) 가이드 참조)
- 자바스크립트 콘솔을 검사할 수 있는 브라우저
- 원하는 텍스트 편집기

## 개발 환경 설정

### 1단계: 코드 다운로드

가이드에서 사용할 샘플 코드를 [ZIP 파일](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip)로 다운로드하거나 다음의 git를 통해 다운로드합니다.

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

필요한 경우 압축 파일을 풀고 컴퓨터에서 명령줄을 사용하여 프로젝트 디렉토리로 이동합니다.

```shell
cd accelerated-mobile-pages-advanced
```

프로젝트 디렉토리에서는 여러 가지 예제 리소스 파일과 시작용 [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) 페이지를 찾을 수 있습니다.

### 2단계: 샘플 페이지 실행

샘플 AMP 페이지를 테스트하려면 웹 서버에서 파일에 액세스해야 합니다. 테스트에 사용할 임시 로컬 웹 서버를 만드는 방법에는 여러 가지가 있습니다.  아래에 몇 가지 옵션이 소개되어 있습니다. 가장 적합한 옵션을 선택하세요.

- ['Chrome용 웹 서버' Chrome 앱](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [로컬 HTTP Python 서버](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

참고: 프로덕션 환경에서는 HTTPS를 사용하는 것이 좋습니다. HTTPS는 보안상의 장점 외에도 검색엔진 최적화 등의 여러 다른 장점이 있습니다. [Google 웹마스터 블로그 게시물](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html)에서 이 주제에 관해 자세히 읽어 볼 수 있습니다.

로컬 웹 서버를 설정하고 나면 브라우저에서 [이 URL](http://localhost:8000/article.amp.html)을 통해 샘플 도움말에 액세스하세요.

```text
http://localhost:8000/article.amp.html
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/review_code.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
