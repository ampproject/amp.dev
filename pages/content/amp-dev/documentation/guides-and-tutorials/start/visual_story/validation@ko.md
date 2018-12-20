---
$title: AMP HTML 확인하기
---

AMP 페이지를 만들 때는 항상 AMP HTML이 정확한지 확인해야 합니다. [AMP 페이지가 유효한지 확인하는 방법]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/index.md', locale=doc.locale).url.path}})에는 여러 가지가 있습니다.  이 가이드에서는 개발자 모드를 사용 설정하여 AMP 유효성 검사 도구를 사용해 보겠습니다.  개발자 모드를 사용하려면 다음의 프래그먼트 식별자를 URL에 추가하고 페이지를 새로고침하세요.

```text
#development=1
```

예:

```text
http://localhost:8000/pets.html#development=1
```

Chrome이나 선호하는 브라우저에서 [개발자 콘솔](https://developer.chrome.com/devtools/docs/console)을 열고 AMP 오류가 없는지 확인하세요. 유효성 검사 메시지를 보려면 브라우저를 새로고침해야 할 수도 있습니다. 페이지에 오류가 없으면 다음과 같은 메시지가 표시됩니다.

```text
AMP 유효성 검사에 성공했습니다.
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_bookend.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>

