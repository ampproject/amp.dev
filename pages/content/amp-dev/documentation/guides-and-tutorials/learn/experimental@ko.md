---
$title: 실험 기능
---

[AMP 실험 구성요소](https://github.com/ampproject/amphtml/tree/main/tools/experiments)는
이미 출시된 기능이지만 폭넓게 사용되기에는 아직 부족한 점이 있어 **실험** 상태로 보호됩니다.

개발자와 사용자는 AMP 실험 구성요소가 완전히 출시되기 전에 실험 기능을 사용하겠다고 선택할 수 있습니다.
하지만 버그가 있거나 예기치 못한 부작용이 발생할 수 있기 때문에 사용 시 주의를 요합니다.

## AMP 개발자 채널 선택

AMP 개발자 채널은 브라우저에서 새로운 버전의 AMP JS 라이브러리를 사용하도록 선택하는 방법입니다.

AMP 개발자 채널은 **덜 안정적**이고 일부 사용자에게만 제공되는 기능이 포함될 수 있는 버전을 출시합니다. 새 AMP 버전의 테스트를 돕거나 버그를 신고하거나 아직 일부 사용자에게만 제공되는 새 기능이 필요한 문서를 만들려면 이 옵션을 선택하세요.

개발자 채널 선택은 다음 경우에 유용합니다.

- 일부 사용자에게만 제공되는 새 기능을 테스트하고 사용합니다.
- 품질보증(QA)을 통해 사이트가 새 AMP 버전과 호환되는지를 확인합니다.

개발자 채널 버전의 AMP에서만 발생하는 문제를 찾으면 [문제를 신고](https://github.com/ampproject/amphtml/issues/new)하고 문제에 관한 설명을 첨부해 주세요. 항상 문제를 재현하는 페이지의 URL을 포함하세요.

브라우저에서 AMP 개발자 채널을 사용하도록 선택하려면 [AMP 실험 페이지](https://ampjs.org/experiments.html)로 이동한 다음 'AMP 개발자 채널' 실험을 활성화합니다. AMP와 관련된 중요/최신 변경사항에 관해 알림을 받으려면 [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce) 메일링 리스트를 구독하세요.

## 실험 구성요소 사용

#### cdn.ampproject.org에서 게재

[https://cdn.ampproject.org](https://cdn.ampproject.org)에서 게재된 콘텐츠는 
[AMP 실험 페이지](https://ampjs.org/experiments.html)로 이동하여
실험 구성요소를 사용 또는 사용 안함으로 전환하여 사용 또는 사용 중지하시기 바랍니다. 실험 구성요소를 선택하면 브라우저에 Google AMP Cache를 통해 게재되는 모든 AMP 페이지에서 실험을 사용하도록 설정하는 쿠키가 설정됩니다.

#### 다른 도메인에서 게재

다른 도메인에서 게재되는 콘텐츠의 경우 다음을 통해 개발 모드를 사용 설정하는 경우 Devtools 콘솔에서 실험을 전환할 수 있습니다.

```js
AMP.toggleExperiment('experiment')
```

실험 기능이 있는 모든 AMP 파일은
[AMP 유효성 검사](validation-workflow/validate_amp.md)를 통과하지 못합니다.
프로덕션 채널을 통해 출시할 준비가 된 AMP 문서에서는 실험 구성요소를 삭제하세요.

## 특정 문서에 실험 사용

문서는 특정 실험을 선택할 수 있습니다. 선택하려면 AMP 스크립트 앞의 HTML 문서 헤드에 `amp-experiments-opt-in` 이름의 메타태그를 넣기만 하면 됩니다(`https://ampjs.org/v0.js`). 콘텐츠 값은 쉼표로 구분되는 선택할 실험 ID 문자열입니다.

```html
<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b">
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://ampjs.org/v0.js"></script>
  ...
</head>
```

이렇게 하면 모든 문서 방문자에게 지정된 실험이 사용 설정됩니다. 하지만 일부 실험은 문서 수준 선택을 허용하지 않습니다. 허용된 실험의 전체 목록은 프로젝트의 `prod-config.json` 파일에서 `allow-doc-opt-in` 속성을 참조하세요. 문서 선택은 사용자가 선택 해제하면 무시될 수 있습니다.
 
