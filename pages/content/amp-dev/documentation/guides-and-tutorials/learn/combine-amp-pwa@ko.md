---
'$title': AMP와 PWA 통합하기
$order: 7
description: 프로그레시브 웹 앱과 AMP 페이지는 서로 원활하게 연동됩니다. 사실 이 둘은 여러 가지 방식으로 서로를 보완해 줄 때가 많습니다. 다음 도움말을...
formats:
  - websites
components:
  - youtube
author: pbakaus
---

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='AMP와 PWA 통합의 기초를 동영상으로 확인하세요.']

프로그레시브 웹 앱과 AMP 페이지는 서로 원활하게 연동됩니다. 사실 이 둘은 여러 가지 방식으로 서로를 보완해 줄 때가 많습니다. 다음 도움말을 확인해 보세요.

1. AMP 페이지에서 [PWA 기능 사용 설정](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md)
2. 사용자가 AMP에서 PWA로 [빠르고 자연스럽게 이동](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md)하도록 연결하기
3. AMP 기능을 활용한 [PWA 간소화](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)

[tip type="note"]

웹 기초에서 [프로그레시브 웹 앱](https://developers.google.com/web/progressive-web-apps/)에 대해 자세히 알아보세요.

[/tip]

## PWA 기능을 갖춘 AMP 페이지

AMP 페이지가 AMP 캐시가 아닌 원본(사이트 도메인)에서 게시되는 한, AMP 페이지에서 자체적으로 여러 PWA 기능을 활용할 수 있습니다. 즉, Google 또는 Bing과 같은 플랫폼 내에서 AMP 페이지를 사용하는 동안에는 PWA 기능이 작동하지 않지만, 향후 사용자 여정에서는 작동하는 것입니다. 또한 사용자가 직접 AMP 페이지로 이동하는 경우에도 작동합니다.

[tip type="read-on"] <strong>읽어보기 –</strong>AMP 페이지에서 [PWA 기능을 사용 설정](../../../documentation/guides-and-tutorials/optimize-measure/amp-as-pwa.md)하는 방법을 자세히 알아보세요. [/tip]

## PWA로 이동하는 진입점으로 AMP 활용

AMP만의 차별화된 장점은 **거의 즉각적인 전송**입니다. 이 특징 덕분에 AMP는 사이트에서 사용자의 첫 상호작용으로 적합합니다. *프로그레시브 웹 앱*을 사용하면 훨씬 많은 **상호작용과 참여 유도 기능**을 제공할 수 있지만, 사이트의 서비스 워커(애셋, 앱 셸 포함)가 다음에 로드할 항목만을 빠르게 전송하므로 프로그레시브 웹 앱의 첫 로드 자체는 지연됩니다.

따라서 AMP 페이지를 사이트의 진입점으로 만든 다음, 향후 사용자 여정을 위해 보이지 않는 곳에서 PWA를 준비시킨 후 전환하는 것이 좋습니다.

[tip type="read-on"] <strong>읽어보기 –</strong> [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)를 통해 [AMP를 PWA에 연결](../../../documentation/guides-and-tutorials/integrate/amp-to-pwa.md)하는 방법을 자세히 알아보세요. [/tip]

## PWA의 데이터 소스로 AMP 사용

AMP 페이지의 핵심적 특징 중 하나는 쉽고 안전하게 삽입할 수 있다는 점입니다. 이러한 이유로 점차 더 많은 플랫폼에서 AMP 페이지를 적극적으로 배포 및 게시하고 있습니다.

프로그레시브 웹 앱을 개발하는 경우 같은 이점을 활용할 수 있으며, **AMP 페이지를 PWA의 데이터 소스로 재사용**하여 백엔드 및 클라이언트의 복잡성을 크게 줄일 수 있습니다.

[tip type="read-on"] <strong>읽어보기 –</strong> [PWA 내에서 AMP 페이지를 사용](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)하는 방법을 자세히 알아보세요. [/tip]
