---
"$title": AMP HTML 유효성 검사
"$order": '8'
description: 웹 스토리는 AMP로 제작되었으므로 항상 AMP HTML의 유효성을 검사해야 합니다. AMP 페이지의 유효성을 검사하는 몇 가지 방법이 있습니다...
author: bpaduch
---

웹 스토리는 AMP로 제작되었으므로 항상 AMP HTML의 유효성을 검사해야 합니다. [AMP 페이지의 유효성을 검사하는 몇 가지 방법](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)이 있습니다. 이 튜토리얼에서는 개발자 모드를 사용 설정하여 AMP 검사기를 사용할 예정입니다. 개발자 모드를 사용하려면 다음의 프래그먼트 식별자를 URL에 추가하고 페이지를 새로고침하세요.

```text
#development=1
```

예:

```text
http://localhost:8000/pets.html#development=1
```

Chrome이나 선호하는 브라우저에서 [개발자 콘솔](https://developer.chrome.com/devtools/docs/console)을 열고 AMP 오류가 없는지 확인합니다. 유효성 검사 메시지를 표시하려면 브라우저를 새로고침해야 할 수도 있습니다. 페이지에 오류가 없으면 다음과 같은 메시지가 표시됩니다.

```text
AMP validation successful.
```
