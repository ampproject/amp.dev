---
$title: 검색 및 배포를 위해 페이지 준비
---

어떤 경우에는 동일 페이지의 비 AMP 버전과 AMP 버전을 모두 갖기를 원할 수도 있습니다(예: 뉴스 기사). 다음을 고려하세요. Google 검색에서 해당 페이지의 비 AMP 버전을 찾은 경우, *AMP 버전이 있는지 어떻게 알 수 있나요*?

## `<link>`로 페이지 링크하기

이 문제를 해결하기 위해 저희는 `<head>`에서 `<link>` 태그 형식으로 AMP 페이지에 대한 정보를 비 AMP 페이지에 추가하거나 그 반대로도 추가합니다.

다음을 비 AMP 페이지에 추가합니다.

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

또한 다음을 AMP 페이지에 추가합니다.

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## 페이지가 하나 밖에 없으면 어떻게 하나요?

페이지가 하나 밖에 없고 이 페이지가 AMP 페이지인 경우, 그래도 정식 링크를 페이지에 추가해야 합니다. 이 링크는 스스로를 가리킵니다.

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
