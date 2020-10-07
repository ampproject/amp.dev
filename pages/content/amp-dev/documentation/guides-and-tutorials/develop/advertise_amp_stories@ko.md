---
$title: 웹 스토리 광고
$order: 3
description: 웹 스토리는 독자가 콘텐츠에 몰입하도록 유도하는 탭 가능한 전면 경험입니다. AMP 스토리 광고를 활용한 광고는 원활하고 주의를 분산시키지 않는...
author: CrystalOnScript
---

웹 스토리는 독자가 콘텐츠에 몰입하도록 유도하는 탭 가능한 전면 경험입니다. AMP 스토리 광고를 활용한 광고는 사용자의 경험에 원활하고 주의를 분산시키지 않는 통합을 지원합니다. 따라서 사용자 참여도 및 플랫폼 만족도를 높일 수 있습니다.

##AMP 웹 페이지와는 다른 광고 배치. AMP 웹 페이지에서는 광고의 개수 및 위치가 여러 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 컴포넌트의 배치에 따라 지정됩니다. 웹 스토리에는 광고 개수 및 배치를 결정하는 데 단일 [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 컴포넌트만이 사용됩니다.

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 확장자는 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 컴포넌트를 감싸는 래퍼입니다. 해당 컴포넌트는 사용자가 스토리 콘텐츠를 소비하는 동안 동적으로 하나 이상의 광고를 삽입합니다. 최상의 사용자 경험을 제공하려면:

1. 광고는 웹 스토리 런타임으로 사전 렌더링된 후 삽입되어야 합니다. 빈 광고나 로드되지 않은 광고가 사용자에게 표시되지 않습니다.

2. 콘텐츠 비율을 조정하여 광고 밀도를 최적화하고 과포화를 방지합니다. [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 확장자는 사용자의 진행 상황에 따라 광고를 삽입할 시점과 위치를 결정합니다.

AMP 런타임은 광고를 최대한 빨리 호출하고 첫 두 페이지 이후 첫 번째 광고를 배치합니다. 마지막 페이지에 광고가 배치될 일은 없습니다.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img>
</amp-anim>

[tip type="note"] **참고 –** AMP 스토리 길이가 길수록 더 많은 광고 배치 기회가 창출됩니다. 광고 알고리즘의 정확한 배치는 시간이 흐르며 계속 최적화됩니다.[/tip]

##사용자 인터랙션. 사용자는 화면의 오른쪽 2/3 지점을 탭하여 일반 스토리 페이지와 동일한 방식으로 지난 광고를 지나칠 수 있습니다.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='Image showing the area users can tap to skip an ad', caption='Users can progress past ads by tapping the right two thirds of the screen.', align='' ) }}

사용자는 시스템 렌더링된 [행동 유도](story_ads_best_practices.md#call-to-action-button-text-enum) 버튼을 탭하여 광고와 바로 상호작용할 수 있습니다. 해당 버튼은 모든 AMP 스토리 광고의 하단 1/3 지점에 표시됩니다. 사용자가 버튼을 탭하면 광고 제작자가 구성한 다음 위치 중 한 곳으로 이동할 수 있습니다.

- AMP 웹 페이지
- 비 AMP 웹 페이지
- App Store 또는 Google Play Store
- [후원 스토리](story_ads_best_practices.md#sponsored-story)

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Image showing that usersare redirected to an ad landing destination, but can return to the story.', caption='Users are redirected to an ad landing destination, but can return to the story.', align='' ) }}

##구성. 웹 스토리는 페이지에서 바로 [`amp-ad`](../../../documentation/components/reference/amp-ad.md)를 지원하지 않습니다. 대신 [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 확장자를 통해 모든 광고를 불러와 표시합니다. [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 컴포넌트는 [`amp-story`](../../../documentation/components/reference/amp-story.md)의 직접 하위 요소로 배치되어야 합니다.

[sourcecode:html] <script type="application/json"> { "ad-attributes": { // ad server configuration } } </script> ... [/sourcecode]

일반적인 [`amp-ad`](../../../documentation/components/reference/amp-ad.md)와는 달리 AMP 스토리가 완전히 렌더링된 후에만 표시되므로 `<fallback>` 또는 `<placeholder>`가 필요하지 않습니다.

##광고 서버 지원 통합. AMP 스토리에 광고를 포함하는 가장 간편한 방법은 지원되는 광고 서버의 광고를 제공하는 것입니다.

현재 AMP 스토리 광고를 지원하는 광고 서버:

- [Google Ad Manager(구 DoubleClick)](advertise_amp_stories.md#google-ad-manager)

스토리 광고를 제공하는 데 관심이 있는 광고 서버 기업은 [GitHub 이슈](https://github.com/ampproject/amphtml/issues/new)를 입력하여 문의해 주세요. AMP 팀에서 연락드리겠습니다!

또한 퍼블리셔는 자체 광고 서버를 설정하여 맞춤 광고를 배치할 수 있습니다. [자세한 프로세스는 이곳에서 확인하실 수 있습니다](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

## Google Ad Manager <a name="google-ad-manager"></a>

광고 서버 정보는 AMP 스토리 도입부의 [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 컴포넌트 내부에 기재되어 있습니다.

광고를 불러오고 표시하는 방식을 설정하는 [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) 컴포넌트 내부에 JSON 구성 객체를 지정해야 합니다. Google Ad Manager로 광고를 제공하려면 다음 필드는 필수입니다.

- `"type"`은 `"doubleclick"`으로 지정되어야 합니다.
- `"data-slot"`는 광고 유닛과 페어로 제공되어야 합니다.

[sourcecode:html] <script type="application/json"> { "ad-attributes": { "type": "doubleclick", "data-slot": "/30497360/a4a/amp_story_dfp_example" } } </script> ... [/sourcecode]

키-값 페어는 스토리를 위해 생성된 [`amp-ad`](../../../documentation/components/reference/amp-ad.md) 요소에 복제됩니다. `targeting`과 같이 요소에 필요한 추가 정보는 `additional_data`에 추가될 수 있습니다.

[sourcecode:html] <script type="application/json"> { "ad-attributes": { "type": "doubleclick", "data-slot": "/30497360/a4a/amp_story_dfp_example", "additional_data": "additional_data_information" } } </script> ... [/sourcecode]

[tip type="note"] Google Ad Manager 광고 업로드와 관련한 정보는 [AMP 스토리의 맞춤 광고 소재 트래피킹](https://support.google.com/admanager/answer/9038178)을 읽고 [AMP 스토리 광고 제작 모범 사례](story_ads_best_practices.md)도 확인해 보세요. [/tip]
