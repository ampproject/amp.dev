---
$title: AMP HTML 유효성 검사
---

AMP 페이지를 작성하고 나면 꼭 AMP HTML 유효성 검사를 하십시오. [유효성 검사를 하는 방법에는 여러가지가 있습니다](/ko/docs/fundamentals/validate.html). 이번 튜토리얼에서는 개발자 모드를 켜서 AMP 유효성 검사기(AMP Validator)를 사용해보겠습니다. 다음의 프래그먼트를 URL에 추가하고 새로고침을 하면 개발자 모드가 켜집니다.

```text
#development=1
```

예를 들면 다음과 같습니다.  

```text
http://localhost:8000/pets.html#development=1 
```

크롬 웹브라우저(또는 다른 브라우저)의 [개발자용 콘솔](https://developer.chrome.com/devtools/docs/console)을 열어서 AMP 관련 에러가 없는지 확인하십시오. 유효성 관련 메시지를 보려면 새로고침을 해야합니다. AMP 페이지에 에러가 없으면 다음의 메시지가 보일 것입니다.

```text
 AMP validation successful.
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="/ko/docs/design/visual_story/create_bookend.html"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="/ko/docs/design/visual_story/congratulations.html"><span class="arrow-next">다음</span></a>
</div>
