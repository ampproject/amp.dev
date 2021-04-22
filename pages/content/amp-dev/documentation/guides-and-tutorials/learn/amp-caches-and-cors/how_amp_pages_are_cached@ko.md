---
'$title': How AMP pages are cached
$order: 0
description: 이 문서에서는 AMP 에코 시스템에서 AMP 캐시의 역할과 AMP 페이지가 캐시되는 방식에 대해 알아 봅니다.
formats:
  - websites
  - stories
  - ads
---

이 문서에서는 AMP 에코 시스템에서의 AMP 캐시의 역할과 AMP 페이지의 캐시 처리 방법에 대해 설명합니다.

## AMP 캐시란 무엇인가요?

AMP 캐시는 유효한 AMP 문서들을 제공하기 위한 프록시 기반 CDN(Content Delivery Network)입니다. AMP 캐시의 용도는 다음과 같습니다.

1. 오직 유효한 AMP 페이지만 제공
2. 효과적이고 안전하게 AMP 페이지들을 사전 로드하도록 허락
3. 유저에게 용이한 추가적인 성능 최적화를 콘텐츠에 수행

[tip type="note"] AMP 이메일 문서는 AMP 캐시에서 제외됩니다. [/tip]

아래의 유튜브 동영상 또는 [왜 AMP 캐시가 존재하는가](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456)를 통해 AMP 캐시에 대해 자세히 알아보십시오.

[video src='https://www.youtube.com/watch?v=Yllbfu3JE2Y' caption='AMP와 PWA 통합의 기초를 동영상으로 확인하세요.']

## 어떤 AMP 캐시가 이용가능한가요?

현재, 두 가지 AMP 캐시 공급업체가 있습니다.

- [Google AMP Cache](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP는 오픈 에코 시스템이며 AMP 프로젝트는 AMP 캐시의 개발을 활발히 촉진합니다. AMP 캐시 생성에 대한 자세한 설명은 [AMP 캐시 가이드라인](https://github.com/ampproject/amphtml/blob/main/spec/amp-cache-guidelines.md)를 참고하십시오.

## AMP 캐시를 선택하는 방법은 무엇입니까?

게시자가 AMP 캐시를 선택하는 것이 아니라, 당신의 콘텐츠와 링크된 실제 플랫폼이 사용할 캐시(있다면)를 선택합니다.

이는 콘텐츠 전송이 게시자의 책임인 일반적인 모델과 상반됩니다. 그러나 이 모델을 통해 플랫폼은 사용자에게 예측 가능한 로드 성능을 제공하고, 무엇보다도 AMP의 사전 렌더링 단계 중 요구되는 보안 및 개인 정보 침해를 보장할 수 있습니다. AMP 캐시 생성을 위한 엄격한 가이드라인에 대해서는 [AMP Cache Guidelines](https://github.com/ampproject/amphtml/blob/main/spec/amp-cache-guidelines.md)를 참조하십시오.

## 캐싱하지 않을 수 있습니까?

캐싱은 AMP 에코 시스템의 핵심 요소입니다. 유효한 AMP 문서를 발행하면 자동으로 캐시 제공에 자동으로 선택하게 됩니다.

당신의 문서가 캐시되지 않도록 하려면 HTML 태그에서 'amp'속성을 제거하는 방법이 있습니다. 이렇게 하면 문서의 기능에 영향을 미치지 않으면서 기술적으로 유효하지 않은 AMP가 됩니다.

## 캐시 된 AMP 페이지는 누가 요청합니까?

캐시 된 AMP 페이지는 플랫폼(예 : GoogleSearch, GoogleNews 및 Bing)및 모바일 앱들에 의해 액세스됩니다. 모바일 앱들은 URL이나 Progressive Web Apps의 cross-origin XHRs를 통해 캐시 된 AMP 콘텐츠에 링크할 수 있습니다. (Google의 [AMP URL API de Google](https://developers.google.com/amp/cache/use-amp-url)참고) (더욱 자세한 것은 "[Embed & use AMP as a data source](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)"를 참고하십시오).

<amp-img src="/static/img/docs/platforms_accessing_cache.png" width="1054" height="356" layout="responsive" alt="platforms and mobile apps access cached AMP pages"></amp-img>

## AMP 페이지는 어떻게 캐시 됩니까?

AMP 형식을 사용함으로써 콘텐츠가 AMP 캐시에 의해 캐시될 수 있게 합니다. AMP 페이지에 AMP 캐시를 추가할 수 있는 몇 가지 방법은 아래와 같습니다.

- **플랫폼 검색**: 플랫폼은 `<html ⚡>` 또는 `<html amp>` 태그를 통해 AMP 콘텐츠를 검색하여 그 콘텐츠를 캐시 합니다. 예를 들어 구글 검색은 콘텐츠 크롤링을 하며, 식별되고 유효한 AMP 페이지들의 경우 해당 콘텐츠가 구글 AMP 캐시에 추가됩니다.

- **캐시 URL 요청**: 플랫폼에서는 AMP 캐시 URL 형식을 사용하여 특별히 AMP 페이지를 요청할 수 있습니다. AMP 캐시는 역방향 프록시로 작동하므로 플랫폼이 페이지에 액세스할 경우 페이지가 자동으로 캐시됩니다.

  - Google AMP Cache URL 예시: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

참고 : AMP 캐시 URL은 사용자를 대상으로하는 URL이 아니며, 사용자는 일반적으로 이러한 URL을 통해 콘텐츠를 요청하지 않습니다.

- **게시자 추가**: 게시자들은 AMP 캐시에 AMP 페이지를 특별히 추가할 수 있습니다. 이 옵션은 오직 Google AMP 캐시에만 적용됩니다. ([Google AMP Cache: Update AMP Content](https://developers.google.com/amp/cache/update-cache) 참조).

## 추가 리소스

- [AMP Project's AMP Cache guidelines](https://github.com/ampproject/amphtml/blob/main/spec/amp-cache-guidelines.md)
- [Google AMP Cache overview](https://developers.google.com/amp/cache/overview)
- [Bing AMP Cache Documentation](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
