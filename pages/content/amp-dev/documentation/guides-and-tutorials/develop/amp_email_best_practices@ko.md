---
'$title': 이메일용 AMP 모범 사례
$order: 1
'$category': Develop
formats:
  - email
---

AMP를 사용해 이메일에서 몰입과 참여를 유도하는 흥미롭고 참신한 유형의 콘텐츠를 제작하세요! 이메일 설계 시 다음 모범 사례를 염두에 두면 성능과 플랫폼 안정성을 확보하고 사용자의 기대에 부합할 수 있습니다.

#속도

동적으로 콘텐츠를 가져오기 위해 [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email)를 사용할 경우 플레이스홀더를 포함하여 컴포넌트 구조의 완전성을 유지합니다. 요청된 데이터로 반환 후 플레이스홀더의 레이아웃이 문서와 최대한 유사하게 유지되어야 메시지 크기로 인해 레이아웃이 크게 변경 또는 변형되지 않습니다.

#사용성 및 접근성

- [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email) 사용 시에는 `controls` 속성이 설정되었는지 확인합니다. 해당 설정을 통해 스마트폰과 같은 터치스크린 기기 사용자가 캐러셀을 이동할 수 있습니다.
- [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email) 사용 시에는 모든 입력 유형이 iOS에서 지원되지 않는다는 점을 염두에 둡니다. 자세한 내용은 Safari HTML 참조에서 [지원되는 입력 값](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html)을 확인하세요.
- 다양한 앱과 브라우저에서 모든 [`autocomplete` 속성 값](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)이 지원되는 것은 아닙니다. 사용자에게 자동 완성이 지원되지 않는다고 가정하고 양식을 짧게 유지하세요.

#스타일링

- 이메일에서 [이메일용 AMP가 지원하는 CSS](../learn/email-spec/amp-email-css.md?format=email)만이 사용되어야 합니다.
- CSS 및 HTML 코드 어디서든 뷰포트 유닛(`vw`, `vh`, `vmin` 및`vmax`) 사용을 자제합니다. AMP 이메일은 iframe 내부에서 렌더링하므로 이메일 뷰포트는 브라우저 뷰포트와 일치하지 않습니다.
- 브라우저마다 기본 CSS 스타일링도 다르게 지원됩니다. 필요한 경우 스타일을 표준화하는 CSS 라이브러리를 사용합니다. 기본 스타일, 스타일 표준화 및 지원 라이브러리 목록과 관련한 자세한 정보는 [리부트, 재설정, 추론](https://css-tricks.com/reboot-resets-reasoning/)을 참조하세요.
- CSS의 바깥 여백 초과에 주의합니다. [AMP 레이아웃 제한](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241)으로 인해 렌더링되지 않을 수도 있습니다.

##모바일

[CSS 미디어 쿼리](style_and_layout/control_layout.md?format=email)를 사용해 기기를 확인하여 모든 화면 규격에서 메시지가 적절히 표시되게 합니다. 레이아웃이 올바르게 구성되고 컴포넌트가 예상대로 작동하는지 확인하려면 모바일 기기에서 메시지를 테스트해야 합니다.

#기타 사항

이메일용 AMP 사용 시 다음 팁과 요령을 기억하세요.

- 이메일용 AMP 플레이그라운드에서는 XHR 프록시가 지원되지 않지만 일부 이메일 공급 업체에서는 지원됩니다.
- 이메일 클라이언트의 호환 가능성을 최대로 보장하려면 이메일에서 AMP MIME 부분이 HTML MIME 부분보다 먼저 표시되어야 합니다.
- [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email)의 `src` 속성, [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email)의 [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr), [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email)용 `src` 또는 `<a>` 태그의 href 속성은 [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email)로 변형될 수 없습니다.
- 메시지의 HTML 버전으로 사용자를 가져오는 이벤트에서 또는 사용자가 메시지를 전달하는 경우, 메시지에 정적 HTML 버전이 포함되어야 합니다.
