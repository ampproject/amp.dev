---
'$title': AMP 이메일의 구조 및 렌더링
$order: 2
formats:
  - email
teaser:
  text: '이메일은 '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/email/amp-email-structure.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

이메일은 MIME 트리로 구조화되어 있습니다. MIME 트리는 메시지 본문과 해당 이메일의 모든 첨부 파일을 포함합니다.

이메일에 AMP를 임베딩하려면 콘텐츠 유형이 `text/x-amp-html`인 새 MIME 부분을 `multipart/alternative`의 하위 요소로 추가합니다. 해당 부분은 기존의 `text/html` 또는 `text/plain` 부분과 함께 사용되어야 하며 이를 통해 이메일 메시지가 모든 클라이언트에서 작동할 수 있습니다.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="AMP for Email MIME 부품 다이어그램" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

`multipart/alternative` 서브타입과 관련한 자세한 정보는 [RFC 1521, 섹션 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3)을 참조하세요.

## 추가 정보 <a name="additional-information"></a>

`text/x-amp-html` 부분은 `multipart/alternative` 노드에 중첩되어 있어야 합니다. 이메일에서 `multipart/alternative` 노드 내의 `text/x-amp-html` 부분은 한 개를 초과할 수 없습니다.

`multipart/alternative`에는 `text/x-amp-html` 외에 최소 1개 이상의 비 AMP 노드 (`text/plain` 또는 `text/html`)가 포함되어야 합니다. 이 내용은 이메일 클라이언트가 AMP를 지원하지 않거나 이메일 제공업체 설정을 통해 옵트아웃을 선택한 사용자에게 표시됩니다.

참고: 일부 이메일 클라이언트[[1]](https://openradar.appspot.com/radar?id=6054696888303616)에서는 마지막 MIME 부분만이 렌더링됩니다. 그러므로 `text/x-amp-html` MIME 부분을 <code>text/html</code> MIME 부분 <em>앞에</em> 배치하는 것이 좋습니다.

### 답장/전달 시맨틱 <a name="replyingforwarding-semantics"></a>

사용자가 AMP 이메일 메시지에 답장하거나 해당 이메일을 전달할 경우 이메일 클라이언트는 MIME 트리의 `text/x-amp-html` 부분을 제거합니다.

### 만료 <a name="expiry"></a>

이메일 클라이언트는 일정 기간이 지난 후(예: 30일) 이메일의 AMP 부분 표시를 중단할 수 있습니다. 이런 경우 이메일에는 `text/html` 또는 `text/plain` 부분이 표시됩니다.

## 예시 <a name="example"></a>

<!-- prettier-ignore-start -->

[sourcecode:html] From:  Person A [persona@example.com](mailto:persona@example.com) To: Person B [personb@example.com](mailto:personb@example.com) Subject: An AMP email! Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>

    <meta charset="utf-8">   <style amp4email-boilerplate="">body{visibility:hidden}</style>   <script async="" src="https://cdn.ampproject.org/v0.js"></script>   Hello World in AMP!   --001a114634ac3555ae05525685ae Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span> --001a114634ac3555ae05525685ae-- [/sourcecode]

<!-- prettier-ignore-end -->
