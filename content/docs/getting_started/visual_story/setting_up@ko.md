---
$title: 준비 작업
---

## 선행 작업

본 자습서를 진행하기 위해 필요한 사항은 다음과 같습니다:

- HTML, CSS 그리고 JavaScript에 대한 기본 지식
- AMP의 핵심 개념에 대한 기본적인 이해([“HTML을 AMP로 변환하기"](/ko/docs/fundamentals/converting.html) 자습서 참고)
- 현재 사용하는 웹브라우저
- 현재 사용하는 개발용 텍스트 에디터

## 개발 환경 준비하기

#### 1 단계. 자습서용 코드 다운받기

1. 다음 URL에서 본 자습서용 코드를 다운받습니다. zip으로 압축되어 있습니다: <a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. zip파일의 압축을 푸십시오. **amp-pets-story** 디렉토리에 이번에 만들 스토리에 대한 이미지, 비디오, 오디오 및 관련 데이터 파일이 들어있습니다. **pets.html**을 가지고 스토리를 만들어볼텐데, 완성된 스토리는 [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html)에 있으니 궁금하면 한번 열어보십시오.

#### 2단계. 예제 페이지를 돌려보기

예제로 만든 스토리를 테스트하려면 웹서버에 관련 파일을 올려놔야 합니다. 테스트를 위해서 임시로 로컬 웹서버를 운영할 수 있는 방법이 몇 개 있습니다. 여기 몇 가지 방법을 소개할텐데 마음에 드는 것을 선택하십시오:

- [“Web Server for Chrome” 구글 크롬 앱](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [로컬 HTTP 파이썬 서버](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

로컬 웹서버 설정을 완료했다면 완성될 스토리가 어떻게 보일지 한번 보십시오. <a href="http://localhost:8000/pets-completed.html">URL</a>은 다음과 같습니다:

```html
http://localhost:8000/pets-completed.html
```

{% call callout('중요', type='caution') %}
`localhost`에서 해당 페이지(위의 URL참고)를 제공하도록 해야 합니다. 그렇지 않으면 AMP 스토리가 제대로 동작하지 않을 수 있습니다. 예를 들어, 다음과 같은 에러가 날 수 있습니다: `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.`
{% endcall %}

이제 완성된 스토리가 어떻게 보이는지 클릭해보면서 감상해보십시오.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/ko/docs/design/visual_story.html"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="/ko/docs/design/visual_story/parts_of_story.html"><span class="arrow-next">다음</span></a>
</div>
