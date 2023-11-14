---
'$title': AMP 릴리스 일정
$order: 10
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: '- 릴리스 채널'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/release-schedule.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

- [릴리스 채널 ](#release-channels)
  - [야간 빌드](#nightly)
  - [주간 ](#weekly)
    - [베타 및 실험 버전 채널 ](#experimental-and-beta-channels)
  - [장기 안정(LTS) ](#long-term-stable-lts)
- [릴리스에 변경 사항 포함 여부 확인 ](#determining-if-your-change-is-in-a-release)
- [릴리스 주기](#release-cadence)
  - [상세 일정 ](#detailed-schedule)
  - [릴리스 프리즈](#release-freezes)

AMP 신규 릴리스는 매주 화요일 AMP 페이지에 푸시됩니다. **AMP 변경 사항이 amphtml 저장소에 병합된 후 모든 사용자에게 공개되기까지 일반적으로 약 1-2주가 소요됩니다.**

## 릴리스 채널 <a name="release-channels"></a>

AMP 런타임 및 확장자는 다양한 *릴리스 채널*을 통해 제공됩니다. 각 채널은 개발자 및 AMP HTML 프로젝트 자체 목적에 따라 유용할 것입니다. [릴리스 주기 섹션](#release-cadence)에서 [`ampproject/amphtml`](https://github.com/ampproject/amphtml) 저장소의 코드가 릴리스 빌드로 공개되는 방식과 시기를 자세히 알아보세요.

다음 릴리스 채널에 PR이 포함되었는지 확인하려면 GitHub 라벨인 <em>PR 사용: 카나리아</em>, <em>PR 사용: 프로덕션</em>, 또는<em>PR 사용: LTS</em>를 살펴보세요(자세한 내용은 <a>릴리스에 변경 사항 포함 여부 확인</a> 참조).

### 야간 빌드 <a name="nightly"></a>

**야간 빌드** 릴리스 채널은 (이름과 같이) 평일 밤 매일 업데이트됩니다. 이 프로세스는 자동으로 이루어지며 제공된 야간 빌드에 버그나 기타 이슈가 없다느 보장은 없습니다. 매일 밤 자정(태평양 표준시) 이후 그날의 마지막 "초록색" 커밋이 릴리스 컷오프 지점으로 선택됩니다. 초록색 빌드는 해당 빌드에서 모든 자동 테스트가 통과되었다는 의미입니다.

야간 빌드 릴리스가 제공하는 메커니즘을 통해 트래픽량이 많은 _주간_ 릴리스 채널에 이슈가 도달하기 전 빠르게 감지하고 해결할 수 있습니다. 또한 새로 추가된 이슈로 인해 영향받는 사용자 수도 줄어듭니다.

지난 며칠간 병합된 풀 리퀘스트를 테스트하려면 **야간 빌드** 채널 옵션을 선택할 수 있습니다. 자세한 내용은 [DEVELOPING.md]의 [옵트인 섹션](https://github.com/ampproject/amphtml/blob/main/docs/developing.md#opting-in-to-pre-release-channels)을 참조하세요.

### 주간 <a name="weekly"></a>

_주간_ 릴리스 채널은 주요한 "상시 업데이트" 릴리스 채널로 간주됩니다. 매주 이전 주의 **베타** 릴리스는 **안정** 릴리스 채널로 이동하고 이전 주의 마지막 **야간 빌드** 릴리스는 **실험 버전** 및 **베타** 릴리스 채널로 이동합니다([상세 일정](#detailed-schedule) 참조).

릴리스 빌드 생성에 사용되는 빌드 구성에는 _카나리아_ 구성 및 _프로덕션_ 구성이라는 두 가지 집합이 포함됩니다. **실험 버전** 및 **베타** 릴리스 채널은 동일한 커밋을 기반으로 빌드됩니다. 하지만 **실험 버전** 채널은 _카나리아_ 구성을 사용하고 **베타** 채널은 _프로덕션_ 구성을 사용합니다. _카나리아_ 구성을 사용하면 _프로덕션_ 구성에서는 사용이 해제된 컴포넌트 및 기능이 지원됩니다. [실험 페이지](https://ampjs.org/experiments.html)를 통해 **실험 버전** 또는 **베타** 채널 옵션을 선택할 수 있습니다.

**안정** 릴리스 채널은 _프로덕션_ 구성으로 빌드되며 대부분 AMP 트래픽에 제공됩니다. **베타** 릴리스 채널도 _프로덕션_ 구성으로 빌드되므로 다음 주에 **안정**으로 변경될 정확한 빌드를 표시합니다(또한 최종 이슈 수정 시 체리픽을 사용할 수도 있음. [코드 기여](https://github.com/ampproject/amphtml/blob/main/docs/contributing-code.md#Cherry-picks) 참조)

#### 베타 및 실험 버전 채널 <a name="beta-and-experimental-channels"></a>

_베타_ 및 *실험 버전 채널*은 다음 AMP 안정 릴리스의 사전 릴리스 후보입니다. 매주 화요일([릴리스 프리즈](#release-freezes) 주간 제외), 지난 주의 **야간 빌드**가 개발자 옵트인 채널인 **베타** 및 **실험 버전**으로 이동합니다. 이후 하루 동안 해당 채널에 추가된 기능이나 성능 저하가 없는지 검증을 완료하고 수요일에 릴리스를 약간의 트래픽에 공개합니다. 동일한 릴리스가 다음 주 화요일에 **안정** 채널로 이동합니다.

이 채널 옵션을 선택할 수 있습니다. 자세한 내용은 [DEVELOPING.md]의 [옵트인 섹션](https://github.com/ampproject/amphtml/blob/main/docs/developing.md#opting-in-to-pre-release-channels)을 참조하세요.

_베타 채널_ 옵션 선택이 적합한 경우:

- 곧 릴리스 예정인 AMP 런타임 버전을 테스트하고 사용해보려는 경우
- 사이트와 AMP 다음 버전의 호환성을 확인하기 위해 품질 보증(QA) 수행 시

*실험 버전 채널*이 적합한 경우:

- 일부 사용자에게 지원되지 않는 신규 기능을 테스트하고 사용해보려는 경우
- 사이트와 아직 개발 중인 AMP 기능의 호환성을 확인하기 위해 품질 보증(QA) 수행 시

*실험 버전 채널*은 **안정성이 다소 떨어질 수 있으며** 일부 사용자에게 지원되지 않는 기능이 포함될 수 있습니다.

### 장기 안정(LTS) <a name="long-term-stable-lts"></a>

**LTS** 릴리스 채널은 1달 간격으로 이전의 **안정** 빌드를 제공합니다. 매월 두 번째 월요일에 현재 **안정** 릴리스가 **LTS**로 이동합니다. 이 채널은 모든 AMP 퍼블리셔에게 권장되지는 않으며, 특정 웹 페이지를 **LTS** 채널로 선택하여 웹사이트 QA 수행 주기의 빈도를 줄이려는 퍼블리셔에게 적합합니다(<a href="https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md" data-md-type="link">**LTS** 읽어보기</a> 참조).

해당 월의 두번째 월요일이 휴일인 경우에는 LTS 채널로 이동이 [릴리스 프리즈](#release-freezes) 종료 이후 수행됩니다.

중요: **LTS** 릴리스 채널을 사용하는 퍼블리셔는 새로 도입된 기능을 사용할 수 없습니다. 그 이유는 **LTS** 릴리스의 더 긴 주기로 인해 [`ampproject/amphtml`](https://github.com/ampproject/amphtml)의 `HEAD`보다 최대 7주 늦어질 수 있기 때문입니다. 선택한 릴리스 주기에 변경 사항이 반영될지 확인하려면 [릴리스에 변경 사항 포함 여부 확인](#determining-if-your-change-is-in-a-release) 섹션을 참조하세요.

## 릴리스에 변경 사항 포함 여부 확인 <a name="determining-if-your-change-is-in-a-release"></a>

[_Type: Release_ GitHub 이슈는](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) 최근 및 이전 릴리스 상태를 추적하는 데 사용됩니다. 초기 컷부터 **실험 버전**/**베타** 채널을 통한 테스팅, **안정** 및 **LTS** 채널을 통한 최종 릴리스까지 상태를 추적할 수 있습니다. 릴리스 관련 공지는 [AMP Slack #release 채널](https://amphtml.slack.com/messages/C4NVAR0H3/)에서 제공됩니다([Slack 가입하기](https://bit.ly/amp-slack-signup)).

다음 중 한 가지 방법을 사용하여 해당 빌드에 어떤 변경 사항이 포함되었는지 확인할 수 있습니다.

- 각 릴리스 빌드의 [_Type: Release_ GitHub 이슈](https://github.com/ampproject/amphtml/labels/Type%3A%20Release)는 특정 해당 릴리스의 변경 사항이 열거된 [릴리스 페이지](https://github.com/ampproject/amphtml/releases) 링크를 포함합니다.
- PR이 _주간_ 또는 **LTS** 빌드까지 이동한 경우 [_PR 사용: 베타/실험 버전_](https://github.com/ampproject/amphtml/issues?q=label%3A%22PR+use%3A+In+Beta+%2F+Experimental%22), [_PR 사용: 안정_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20Production%22) 및 [_PR 사용: LTS_](https://github.com/ampproject/amphtml/issues?utf8=%E2%9C%93&q=label%3A%22PR%20use%3A%20In%20LTS%22) 라벨이 PR에 추가됩니다. 빌드 생성 시점과 라벨 추가 시점 간 지연이 발생할 수 있습니다.

## 릴리스 주기<a name="release-cadence"></a>

릴리스 주기에는 각별한 주의를 기울이고자 합니다.

AMP 새 버전을 푸시하여 모두에게 공개하는 빈도를 결정하는 데 있어 고려해야 할 요소는 다음과 같습니다.

- AMP로 제작된 수백만 개의 사이트/수십억 개의 페이지 안정성
- 새 버전을 푸시할 때 발생할 수 있는 캐시 버스팅
- 새 기능을 빠르게 완성하려는 열망

이와 같은 모든 요소를 고려하여 푸시 주기는 1-2주로 결정되었습니다. 지금까지는 합리적인 타협점이었다고 생각되지만 향후 지속적으로 모든 사항을 점검하고 변경할 수도 있습니다.

### 상세 일정 <a name="detailed-schedule"></a>

복합적인 상황으로 인해 지연이 발생할 수 있지만 최대한 이 일정을 고수하고자 합니다. 모든 릴리스의 최신 상태는 [_Type: Release_ GitHub 이슈](https://github.com/ampproject/amphtml/labels/Type%3A%20Release) 및 [AMP Slack #release 채널](https://amphtml.slack.com/messages/C4NVAR0H3/)에서 추적할 수 있습니다([Slack 가입하기](https://bit.ly/amp-slack-signup)).

- 화요일 [오전 11시(태평양 표준시 기준)](https://www.google.com/search?q=11am+pacific+in+current+time+zone): <a>모든 테스트를 통과한 최신 마스터 빌드</a>에서 신규 **실험 버전** 및 <strong>베타</strong> 릴리스 빌드가 생성되어 [AMP 실험 버전 채널](#amp-experimental-and-beta-channels) 또는 [AMP 베타 채널](#amp-experimental-and-beta-channels) 옵션을 선택한 사용자에게 각각 푸시됩니다.
- 수요일: _실험 버전 채널_ 및 _베타 채널_ 사용자의 버그 리포트를 확인하고 아무 문제가 없을 시 **베타**를 1%의 AMP 페이지로 푸시합니다.
- 목요일-월요일: _실험 버전 채널_ 및 _베타 채널_ 사용자와 **실험 버전**/**베타** 빌드가 포함된 1% 페이지의 오류 발생률을 지속적으로 모니터링합니다.
- 다음 주 화요일: **베타** 빌드가 **안정**으로 완전히 이동합니다(즉, 모든 AMP 페이지에서 해당 빌드를 사용합니다).

### 릴리스 프리즈<a name="release-freezes"></a>

릴리스 프리즈라고 알려진 기간에는 AMP 프로덕션 릴리스를 건너뛰게 됩니다.

N번째 주에 릴리스 1주간의 릴리스 프리즈가 발표된 경우:

- 이전 주의 릴리스 빌드는 **실험 버전**/**베타** 상태로 한 주를 더 기다립니다. 즉 N-1번째 주의 릴리스 컷은 평소처럼 N번째 주의 **안정** 상태로 푸시되지 않는 것입니다. 그 대신 N+1번째 주에 **안정** 상태로 푸시됩니다.
- 프리즈 주간(N번째 주)에 신규 릴리스는 _없습니다_.
- N+1번째 주에는 기존 일정이 재개됩니다. 즉, **실험 버전**/**베타**는 N+1번째 주에 포함되어 N+2주에는 **안정** 상태로 이동합니다.
- N-1번째 주에 **안정** 릴리스로 이동한 버전은 N번째 주중에 **LTS**로 이동할 예정이었으나 이제 N+1번째 주 월요일에 **LTS**로 이동합니다.
- **야간 빌드** 릴리스는 자동화되어 있으므로 여전히 생성되어 이동합니다.

릴리스 프리즈 발생 원인은 다음과 같습니다.

- AMP 릴리스를 **안정** 상태로 푸시하고 모니터링할 인원이 충분하지 않은 경우. 현재 AMP 릴리스를 수행하는 담당자의 대다수는 미국에 거주하므로 릴리스 프리즈는 다음과 같은 미국의 주요 휴일에 발생합니다: 독립기념일(7월 4일), 추수감사절(11월 4번째 목요일), 크리스마스(12월 25일) 및 새해전야/새해 첫날(12월 31일/1월 1일).
- [기술 결정 위원회(TSC)](https://github.com/ampproject/meta-tsc)나 릴리스 수행 담당자가 결정한 바에 따른 보안 또는 사생활 침해 문제 등이 발생한 긴급 상황.
- TSC에서 결정한 바에 따라 각별히 중요하다고 간주되는 코드베이스 안정성 문제가 발생한 경우.

긴급 상황을 제외한 모든 경우에 릴리스 프리즈는 적어도 한 달 전에 발표됩니다.

추가 공지가 없는 한 릴리스 프리즈는 코드 프리즈를 의미하지 않습니다. 릴리스 프리즈 기간에도 코드를 계속 작성, 검토 및 병합할 수 있습니다.
