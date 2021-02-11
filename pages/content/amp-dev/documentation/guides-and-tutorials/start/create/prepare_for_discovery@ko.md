---
'$title': 페이지 검색 및 배포 준비
$order: 4
description: 어떤 경우에는 비 AMP 버전과 AMP 버전을 모두 지원하는 페이지가 필요할 수 있습니다. 예를 들면 뉴스 기사 등이 이에 해당됩니다. 만약 Google 검색에서...
author: pbakaus
contributors:
  - bpaduch
---

어떤 경우에는 비 AMP 버전과 AMP 버전을 모두 지원하는 페이지가 필요할 수 있습니다. 예를 들면 뉴스 기사 등이 이에 해당됩니다. 만약 Google 검색에서 해당 페이지의 비 AMP 버전을 찾은 경우 _비 AMP 버전과 "페어링된" AMP 버전이 있는지 어떻게 알 수 있을까요?_

## `<link>`로 페이지 연결하기

AMP 페이지와 비 AMP 페이지를 서로 "페어링"하기 위해 AMP 페이지 정보를 비 AMP 페이지 `<head>`의 `<link>` 태그에 추가할 수 있습니다. 반대의 경우도 가능합니다.

아래 코드를 비 AMP 페이지에 추가합니다.

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

아래 코드는 AMP 페이지에 추가합니다.

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## 한 페이지만 있을 경우

한 페이지만 존재하며 해당 페이지가 AMP 페이지인 경우에도 표준 링크를 페이지에 추가해야 합니다. 이때 링크는 자체적으로 연결됩니다.

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **읽어보기 –** Google에서 AMP 페이지를 검색하는 방법은 [AMP 페이지를 위한 Google 검색 가이드라인](https://support.google.com/webmasters/answer/6340290)를 참고하세요. [/tip]
