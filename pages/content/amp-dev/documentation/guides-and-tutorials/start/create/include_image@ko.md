---
"$title": 이미지 삽입하기
"$order": '2'
description: 대부분의 HTML 태그는 AMP HTML에서 바로 사용할 수 있지만<img> 같은 일부 태그는 기존과 동일하거나 더 향상된 사용자 지정 AMP HTML 태그로 대체됩니다
author: pbakaus
contributors:
- bpaduch
---

대부분의 HTML 태그는 AMP HTML에서 바로 사용할 수 있지만, `<img>` 같은 일부 태그는 기존과 동일하거나 더 향상된 사용자 지정 AMP HTML 태그로 대체됩니다(또한 문제가 있는 일부 태그는 사용이 금지됩니다. [AMP 사양에서 허용되는 HTML 태그](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)들을 살펴보세요.)

추가 마크업이 어떻게 표시되는지 보여주기 위해 이미지를 페이지에 삽입하는 데 필요한 코드를 준비했습니다.

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] **읽어보기 –**`<img>`와 같은 태그를 [`<amp-img>`](../../../../documentation/components/reference/amp-img.md)로 대체하는 이유와 지원되는 태그 개수를 알아보려면 [이미지 및 동영상 삽입](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)을 참조하세요. [/tip]
