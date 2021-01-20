---
"$title": AMP 이메일 유효성 검사
"$order": '1'
author: CrystalOnScript
formats:
- email
---

AMP 이메일은 AMP JS 라이브러리를 통해 사용자에게 풍성하고 인터랙티브한 동적 경험을 선사합니다. 따라서 이메일 제공 업체는 메시지의 유효성이 검증될 것을 요청합니다. 유효한 AMP 마크업은 이메일이 안전하며 사용자 경험 기준을 능가한다는 점을 보장합니다.

# 이메일의 AMP 유효성을 어떻게 확인하나요?

AMP 이메일의 유효성을 검사하는 몇 가지 방식이 있습니다. 모든 방식은 동일한 결과를 내므로 개발 스타일과 가장 잘 맞는 방식을 선택하세요!

## 웹 기반 검사기

AMP [웹 기반 검사기](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL)는 이메일용 AMP 플랫폼을 지원합니다. AMP 이메일을 도구에 붙여넣기하여 웹 기반 유효성 검사기를 사용하면, 검사기의 모든 오류가 인라인으로 즉시 표시됩니다.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## 명령줄 검사기

[AMP HTML 검사기 명령줄 도구](https://www.npmjs.com/package/amphtml-validator)를 통해 AMP 이메일 파일의 유효성을 검사할 수 있습니다.

### 설치

1. 시스템에 [패키지 매니저 'npm'가 포함된 Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)가 있는지 확인합니다.
2. 다음 명령줄을 실행하여 AMP HTML 검사기 명령줄 도구를 설치합니다: `npm install -g amphtml-validator`.

### 사용

명령줄 도구를 설치하고 `<amphtml file>`을 AMP 이메일 콘텐츠가 포함된 파일로 교체한 후 다음 명령어를 실행합니다.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

이메일이 유효한 경우 명령줄 도구의 결과는 `PASS`로 표시됩니다. 유효하지 않은 경우 발견된 오류를 반환합니다.

## AMP Playground

또한 [AMP Playground](https://playground.amp.dev/?runtime=amp4email)를 활용하여 AMP 이메일의 유효성을 검사할 수 있습니다. 웹 기반 검사기와 마찬가지로 AMP 이메일을 도구에 붙여넣기하면 검사기의 모든 오류가 인라인으로 Playground에 즉시 표시됩니다.

### 전송된 이메일 유효성 검사

때때로 이 페이지에 소개된 도구를 통해 이메일 마크업의 유효성을 이미 검증했음에도 전송된 AMP 이메일이 유효하지 않은 경우가 있습니다. 이러한 문제가 발생하는 가장 일반적인 사유는 [ESP](https://amp.dev/support/faq/email-support/)가 이메일 마크업을 변경하여 전송을 위해 ESP로 보내진 이메일에 오류가 발생했기 때문입니다. 예를 들어, ESP가 SparkPost지만 HTTPS 추적 픽셀이 SparkPost로 구성되지 않은 경우 SparkPost에서 안전하지 않은 HTTPS 추적 픽셀을 이메일에 추가합니다. AMP 이메일은 HTTPS 이미지만을 허용하므로 AMP 이메일 오류가 발생하는 것입니다.

받은 편지함에 전송된 이메일의 AMP 유효성을 확인하려면 다음 단계를 시도하세요.

1. 이메일 클라이언트에서 [AMP 이메일을 `.eml` 파일로 다운로드](https://www.codetwo.com/kb/export-email-to-file)합니다.
2. [AMP Playground](https://playground.amp.dev/?runtime=amp4email)를 엽니다.
3. "이메일 가져오기"를 클릭하고 다운로드한 `.eml` 파일을 선택합니다.

Playground는 인라인 에디터로 다운로드한 AMP 이메일을 가져온 후 유효성 검증 오류를 표시합니다.

# 이메일이 유효하지 않은 경우엔 어떻게 하나요?

AMP 검사기는 개발 중에만 편리한 것이 아닙니다. AMP 이메일을 지원하는 이메일 제공 업체는 제공된 HTML 또는 일반 텍스트 MIME 유형으로 자동 폴백합니다. AMP 이메일은 검사기의 유효성 검증을 통과한 후에만 전송되어야 합니다.
