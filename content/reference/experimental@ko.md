---
$title: 실험 기능
$order: 5
---

[AMP 실험 구성요소](https://github.com/ampproject/amphtml/tree/master/tools/experiments) 는 출시는 되었으나 아직 널리 사
용될 준비가 되지 않은 기능이기 때문에 실험 상태로 표시됩니다.

개발자 및 사용자는 실험 기능이 정식으로 출시되기 전에 사용해 볼 수 있습니다. 하지만 버그가 있거나 예상치 못한 부작용이 발생할 수 있으므로 신중하게 
사용해야 합니다.

## AMP 개발자 채널 선택

AMP 개발자 채널을 사용하면 브라우저에서 AMP JS 라이브러리의 새로운 버전을 사용해 볼 수 있습니다.

AMP 개발자 채널 버전 **은 안전성이 떨어질 수 있으며,** 일부 사용자만 사용할 수 있는 기능이 포함되어 있을 수도 있습니다. 새로운 버전의 AMP를 테스트하거나, 버그를 신고하거나, 아직 모든 사용자가 사용할 수 없는 새로운 기능이 필요한 문서를 작성하고자 하는 경우 이 옵션을 선택하세요.

개발자 채널을 선택하면 다음과 같은 이점을 활용할 수 있습니다.

- 아직 모든 사용자가 사용할 수 없는 새로운 기능을 테스트
- QA 에서 사용하여 사이트가 다음 버전의 AMP 와 호환되는지 확인

AMP 개발자 채널 버전에서만 발생하는 문제를 발견한 경우 [문제를 신고](https://github.com/ampproject/amphtml/issues/new) 하고 발견한 문제를 설명해 주세요. 이때 문제가 발생한 페이지의 URL 을 반드시 포함해 주시기 바랍니다.

브라우저에서 AMP 개발자 채널을 사용하도록 선택하려면 [AMP 실험 페이지](https://cdn.ampproject.org/experiments.html) 로 이동하여 "AMP Dev Channel" 실험을 활성화하세요. AMP 와 관련하여 중요한 변경사항이 있을 때 알림을 받으려면 [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce) 메일링 리스트를 구독하시기 바랍니다.

## 실험 구성요소 사용 설정

[https://cdn.ampproject.org](https://cdn.ampproject.org) 에서 게재되는 콘텐츠의 경우, [AMP 실험 페이지](https://cdn.ampproject.org/experiments.html) 로 이동하여 실험 구성요소를 사용 설정하거나 사용 중지하여 활성화/비활성화하세요. AMP 실험 구성요소를 사용하도록 설정하면 브라우저에 쿠키가 설정되며, Google AMP 캐시를 통해 게재되는 모든 AMP 페이지에서 실험이 사용 설정됩니다.

다른 도메인에서 게재되는 콘텐츠의 경우, 개발 모드가 사용 설정되어 있을 때 DevTools Console 에서 다음을 사용하여 실험 사용 여부를 설정할 수 있습니다.

[sourcecode:js]
AMP.toggleExperiment('experiment')
[/sourcecode]


실험 기능이 포함된 모든 AMP 파일은 
[AMP 유효성 검사](/ko/docs/guides/validate.html) 를 통과하지 못합니다. 
따라서 프로덕션 채널을 통해 출시할 준비가 되어 있는 AMP 문서에서는 실험 구성요소를 삭제해야 합니다.
