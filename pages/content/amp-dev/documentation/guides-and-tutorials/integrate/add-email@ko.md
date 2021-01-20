---
"$title": 기존 이메일에 AMP 추가하기
"$order": '1'
author: CrystalOnScript
formats:
- email
---

이메일용 AMP 형식이 새로운 MIME 부분으로 임베드되었습니다. 이메일용 AMP를 지원하는 제공 업체로 이메일이 전송된 경우 이 형식이 표시되지만 그렇지 않더라도 염려 마세요! 이메일 제공 업체에서 HTML 또는 일반 텍스트 폴백을 표시할 테니까요. 이 가이드를 통해 이메일에 AMP를 포함하는 방법을 알아보세요.

# AMP MIME 부분 포함

이메일은 이메일 메시지 본문과 첨부 파일을 포함하는 [MIME 트리](https://en.wikipedia.org/wiki/MIME)로 구조화됩니다. 이메일에 AMP를 추가하려면 콘텐츠 유형이 `text/x-amp-html`인 새로운 MIME 부분을 추가해야 합니다.

AMP MIME 부분은 기존의 `text/html` 또는 `text/plain` 부분과 함께 `multipart/alternative` 노드에 중첩되어야 이메일 메시지가 모든 클라이언트에서 렌더링됩니다.

```html
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae--
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae
```

[tip type="important"] 일부 이메일 클라이언트에서는 마지막 MIME 부분만이 렌더링됩니다. 이메일 렌더링을 위해 `text/x-amp-html` MIME 부분을 `text/html` MIME 부분 앞에 배치하세요. [/tip]

# 수신자가 AMP 이메일을 전달하거나 답장을 보낼 경우

사용자가 AMP 이메일을 전달하거나 답장을 보낼 경우 MIME 트리의 `text/x-amp-html` 부분이 삭제됩니다. 그렇기에 MIME 유형을 지원하는 클라이언트로 AMP 이메일을 전송할 때에도 HTML 부분의 대체 콘텐츠를 제공하는 것이 중요합니다.
