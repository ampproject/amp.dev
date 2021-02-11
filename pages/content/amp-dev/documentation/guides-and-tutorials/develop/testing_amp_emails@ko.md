---
'$title': AMP 이메일 테스트
$order: 2
'$category': Develop
description: AMP 이메일을 대량 발송하기 전 테스트하여 우수한 사용자 경험을 확인합니다.
formats:
  - email
author: fstanis
---

AMP 이메일을 대량 발송하기 전 테스트하여 우수한 사용자 경험을 확인합니다.

## 테스트 체크리스트

1. AMP 이메일의 HTML/일반 텍스트 버전을 포함합니다. AMP를 지원하지 않는 이메일 클라이언트는 이러한 버전을 폴백으로 표시합니다.
2. [AMP 이메일 유효성 검사](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md)에 요약된 절차를 따라 AMP 유효성을 확인합니다.
3. [이메일용 AMP에서 지원되는 CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md)를 검토하여 사용 중인 CSS가 모든 이메일 클라이언트에서 지원되는지 확인합니다.
4. [AMP Playground](https://playground.amp.dev/?runtime=amp4email)에서 이메일을 열어 형식과 같은 모든 동적 기능이 적절히 작동하는지 확인합니다.

## 이메일 클라이언트 전용 테스트

AMP를 지원하는 이메일 클라이언트는 추가 가이드라인 및 요구 사항이 포함될 수 있는 개발자 문서도 함께 제공합니다.

### Gmail

Gmail 문서는 [Gmail의 AMP 이메일 테스트](https://developers.google.com/gmail/ampemail/testing-dynamic-email)에서 테스트 가이드라인을 열거합니다.

Gmail 사용자는 [Gmail의 이메일용 AMP Playground](https://amp.gmail.dev/playground/)를 활용하여 자신에게 테스트 이메일을 발송할 수 있습니다.

### Mail.ru

[Mail.ru AMP 이메일](https://postmaster.mail.ru/amp)은 Mail.ru 계정에서 테스트를 활성화하는 방법을 제공합니다.

Mail.ru 사용자는 [Mail.ru AMP Playground](https://postmaster.mail.ru/amp/playground.html)를 활용하여 자신에게 테스트 이메일을 발송할 수 있습니다.
