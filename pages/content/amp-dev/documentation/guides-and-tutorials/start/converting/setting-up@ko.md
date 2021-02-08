---
'$title': Setting up
$order: 0
description: 개발 환경 설정 1단계. 코드 다운로드. 튜토리얼에서 사용할 샘플 코드를 ZIP 파일로 다운로드하거나 다음의 git를 통해 다운로드합니다...
'$parent': '/documentation/guides-and-tutorials/start/converting/setting-up.md'
---

## 기본 요건

이 튜토리얼을 **시작하기 전** 필요한 사항은 다음과 같습니다.

- HTML, CSS, JavaScript 기본 지식
- JavaScript 콘솔을 검사할 수 있는 브라우저
- 선호하는 텍스트 편집기

## 개발 환경 설정

### 1단계: 코드 다운로드

튜토리얼에서 사용할 샘플 코드를 [ZIP 파일](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip)로 다운로드하거나 다음의 git을 통해 다운로드합니다.

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

필요한 경우 압축 파일을 풀고 컴퓨터에서 명령줄을 사용하여 프로젝트 디렉토리로 이동합니다.

```shell
cd accelerated-mobile-pages-foundations
```

프로젝트 디렉토리에서는 여러 예제 리소스 파일 및 시작용 [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) 페이지를 찾을 수 있습니다.

### 2단계: 샘플 페이지 실행

샘플 페이지를 테스트하려면 웹 서버에서 파일에 액세스해야 합니다. 테스트에 사용할 임시 로컬 웹 서버를 만드는 여러 방식이 있습니다. 아래에 소개된 몇 가지 옵션 중 가장 적합한 옵션을 선택하세요.

- [Google Chrome 앱 "Web Server for Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [로컬 HTTP Python 서버](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] <strong>참고 –</strong> 프로덕션 환경에서는 HTTPS를 사용하는 것이 좋습니다. HTTPS는 보안상의 장점 외에도 검색엔진 최적화(SEO)를 비롯한 여러 다른 장점을 갖습니다. <a class="" href="https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html">Google Webmaster 블로그 게시물</a>에서 이 주제에 관한 자세한 내용을 확인할 수 있습니다. [/tip]

로컬 웹 서버를 설정한 후 브라우저에서 [이 URL](http://localhost:8000/article.html)을 통해 샘플 도움말에 액세스하세요.

```text
http://localhost:8000/article.html
```
