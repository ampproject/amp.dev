---
$title: 찾기 쉽고 배포할 수 있는 페이지 준비하기
---

어떤 경우에는 AMP가 아닌 버전과 AMP 버전을 둘 다 지원하는 페이지를 원할 수 있습니다. 예를 들면 뉴스 아티클 같은 게 있겠네요. 만약 Google 검색에서 해당 페이지의 AMP가 아닌 버전을 찾은 경우, *AMP가 아닌 버전과 "이어져 있는" AMP 버전이 있는 지 어떻게 알 수 있을까요?*

## `<link>`로 페이지 연결하기

AMP 페이지와 AMP가 아닌 페이지를 서로 "이어주기" 위해서, AMP 페이지에 대한 정보를 AMP가 아닌 페이지 `<head>` 의 `<link>` 태그에 추가할 수 있습니다. 반대의 경우도 가능합니다.

아래 코드를 AMP가 아닌 페이지에 추가합니다.

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

아래 코드는 AMP 페이지에 추가합니다.

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## 페이지가 하나의 버전만 가지고 있다면 어떻게 해야하나요?

페이지가 하나의 버전만 가지고 해당 페이지가 AMP 페이지여도 canonical 링크를 반드시 페이지에 추가해야합니다. 이 때 이 링크는 스스로를 가리키게 할 수 있습니다.

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"]
**읽어보기 –** Google이 어떻게 AMP 페이지를 찾는 지에 대해서는 [Google 검색 가이드라인 AMP](https://support.google.com/webmasters/answer/6340290)를 참고해보시길 바랍니다.
[/tip]
