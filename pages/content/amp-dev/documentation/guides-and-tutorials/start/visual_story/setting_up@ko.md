---
'$title': Setting up
$order: 1
description: 개발 환경 설정 1단계. 코드 다운로드. 튜토리얼에서 사용할 샘플 코드를 ZIP 파일로 다운로드하거나 다음의 git를 통해 다운로드합니다...
author: bpaduch
---

## 사전 준비

이 가이드를 시작하기에 앞서 다음이 필요합니다.

- HTML, CSS, 자바스크립트 기본 지식
- AMP의 핵심 개념에 관한 기본적인 이해(['HTML을 AMP로 변환하기'](../../../../documentation/guides-and-tutorials/start/converting/index.md) 가이드 참조)
- 원하는 브라우저
- 원하는 텍스트 에디터

## 개발 환경 준비하기

#### 1단계: 코드 다운로드

1. 다음 URL에서 zip 파일로 압축되어 있는 튜토리얼용 코드를 다운로드합니다. <a href="/static/files/tutorials/amp-pets-story.zip">/static/files/tutorials/amp-pets-story.zip</a>

2. zip 파일의 압축을 풉니다. **amp-pets-story** 디렉토리에 스토리를 만들 때 사용할 이미지, 동영상, 오디오, 데이터 파일이 있습니다. **pets.html** 파일로 스토리 작성을 시작해 보겠습니다. 완성된 버전의 스토리는 [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html) 파일에서 확인할 수 있습니다.

#### 2단계: 예제 페이지 실행

예제 스토리를 테스트하려면 웹 서버에서 파일에 액세스해야 합니다. 테스트에 사용할 임시 로컬 웹 서버를 만드는 방법에는 여러 가지가 있습니다. 아래에 몇 가지 옵션이 소개되어 있습니다. 가장 적합한 옵션을 선택하십시오.

- ['Chrome용 웹 서버' Chrome 앱](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [로컬 HTTP Python 서버](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

로컬 웹 서버를 설정한 뒤 다음 <a href="http://localhost:8000/pets-completed.html">URL</a>에서 이 튜토리얼을 끝내면 어떤 스토리가 완성되는지 확인해 보십시오.

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"]URL이 `localhost`에서 제공되는지 확인하십시오. 그렇지 않으면 AMP 스토리가 제대로 동작하지 않을 수 있으며 `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.`라는 오류가 표시될 수 있습니다.[/tip]

완성된 스토리를 클릭해 보면서 어떤 스토리를 만들게 될지 파악해 보십시오.
