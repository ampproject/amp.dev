---
$title: AMP와 프로그레시브 웹 앱 결합하기
$order: 9
$category: Develop
toc: true
components:
    - youtube
---
[TOC]

{{ youtube('M_ZCgbEGyHY', 480, 270, caption='듣는 걸 더 좋아한다면, CDS 2016에서 발표한 영상에서 비슷한 개요를 제공합니다.') }}

프로그레시브 웹 앱과 AMP는 함께 잘 동작합니다.
사실, 여러 경우 PWA와 AMP는 서로 한가지 방법 또는 다른 방법으로 상호 보완적입니다.
다음과 같은 방법을 배워봅시다.

1. AMP 페이지에서 [PWA 기능을 사용 가능하게](/ko/docs/guides/pwa-amp/amp-as-pwa) 합니다.
1. AMP에서 PWA를 통해 [강렬하고 매우 빠른 사용자 흐름](/ko/docs/guides/pwa-amp/amp-to-pwa)을 만듭니다.
1. AMP의 힘을 빌어 [PWA를 단순화](/ko/docs/guides/pwa-amp/amp-in-pwa)합니다.

{% call callout('프로그레시브 웹 앱?', type='note') %}
Web Fundamentals에서 [프로그레시브 웹 앱](https://developers.google.com/web/progressive-web-apps/)에 대한 더 자세한 내용을 살펴볼 수 있습니다.
{% endcall %}

## PWA 기능을 사용한 AMP 페이지

AMP 페이지는 AMP 캐시가 아닌 오리진(사이트의 도메인)에서 제공되는 한 가능한 한 많은 PWA 기능을 자체적으로 사용합니다.
이 말은 PWA 기능들이 Google이나 Bing같은 플랫폼에서 AMP 페이지를 사용할 때 시작되지 않지만,
앞으로의 흐름이나 사용자가 직접 AMP 페이지로 이동하는 경우에 활용됩니다.

{% call callout('함께 읽기', type='read') %}
AMP 페이지에서 [PWA 기능을 사용 가능하게](/ko/docs/guides/pwa-amp/amp-as-pwa) 하는 법을 살펴보세요.
{% endcall %}

## PWA의 진입점으로써 AMP

AMP만의 장점은 사이트에 대한 사용자 최초 인터랙션에 가장 적합한 특징인 거의 즉각적인 전달입니다.
*프로그레시브 웹 앱*을 사용하면 훨씬 **더 많은 인터렉션 및 참여 활성화 기능**을 사용 가능하게 하지만,
최초 로딩 시에는 사이트의 서비스 워커, 즉 애셋 및 앱 셸이 이후 로딩에서 전달을 가속한다는 사실에 의해 방해받습니다.

좋은 전략은 사이트의 진입점을 AMP 페이지로 만든 다음,
PWA를 점차 활성화하고 이어지는 흐름에서 이로 전환하는 것입니다.

{% call callout('함께 읽기', type='read') %}
`amp-install-serviceworker`를 통해 [AMP에 PWA를 연결하는 법](/ko/docs/guides/pwa-amp/amp-to-pwa)을 살펴보세요.
{% endcall %}

## PWA의 데이터 소스로써 AMP

AMP 페이지의 핵심 기능 중 하나는 안전하고 쉽게 삽입할 수 있다는 점입니다.
따라서 점점 더 많은 플랫폼에서 배포하고 제공하는 것을 수월히 합니다.

만약 프로그레시브 웹 앱을 만들고 있다면, **AMP 페이지를 PWA를 위한 데이터 소스로써 다시 사용하여** 동일한 이점을 얻고 백엔드 및 클라이언트 복잡성을 크게 줄일 수 있습니다.

{% call callout('함께 읽기', type='read') %}
[PWA에서 AMP를 소비하는 법](/ko/docs/guides/pwa-amp/amp-in-pwa)을 살펴보세요.
{% endcall %}
