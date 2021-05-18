---
'$title': AMP 캐시 이슈 디버그
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: 문서의 AMP 캐시 오류 발생 원인은?
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## 문서의 AMP 캐시 오류 발생 원인은? <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

일반적으로 AMP 문서는 AMP 캐시에서도 원본과 마찬가지로 표시되고 작동됩니다. 하지만 오류를 발생시킬 수 있는 일부 컴포넌트와 서버 구성이 존재합니다.

특정 문서가 원본에서는 예상대로 표시되고 작동하지만 캐시를 통해 볼 때([원본 URL을 Google AMP 캐시로 매핑하는 방법](https://developers.google.com/amp/cache/overview#amp-cache-url-format)) 오류가 발생한 경우 다음과 같은 조치를 취해보세요.

1. 브라우저의 개발자/오류 도구 콘솔을 열고 표시되는 모든 오류 및 경고를 해결합니다
2. [AMPBench](https://search.google.com/test/amp)를 사용해 문서를 실행하고 예기치 않은 모든 오류 또는 경고를 해결합니다.

이와 같은 조치를 취한 후에도 문제가 지속될 경우 아래 표를 확인해 주세요.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">증상</th>
      <th width="30%">이슈</th>
      <th width="40%">솔루션</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>웹 폰트가 표시되지 않음(폴백 폰트 사용)</td>
      <td>폰트 제공 업체가 AMP 캐시를 화이트리스트에 지정하지 않음.</td>
      <td>폰트 제공 업체에 문의하여 <a href="amp-cors-requests.md#cors-security-in-amp">모든 캐시</a>를 허용 목록에 추가하도록 요청.</td>
    </tr>
    <tr>
      <td>애셋(예: 폰트 및 이미지)가 표시되지 않음(<strong>HTTP 원본 전용</strong>)</td>
      <td>문서가 프로토콜 상대 URL을 사용함.</td>
      <td>절대 URL로 전환(<code>//www.site.com/doc/amp</code>이 아닌 <code>http://www.site.com/doc/amp</code> 사용).</td>
    </tr>
    <tr>
      <td rowspan="2">애셋(예: 폰트 및 이미지)가 표시되지 않음</td>
      <td>애셋이 잘못된 MIME 유형으로 지원됨.</td>
      <td> <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">허용 가능한 MIME 유형</a> 지정.</td>
    </tr>
    <tr>
      <td>AMP 캐시가 애셋에 액세스할 수 없음.</td>
      <td>AMP 캐시가 애셋에 액세스할 수 있으며 IP 주소 또는 사용자 에이전트가 캐시를 차단한 것은 아닌지 확인(<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Google 크롤러에서 사용하는 사용자 에이전트 목록</a>).</td>
    </tr>
    <tr>
      <td> <code><amp-form></amp-form></code>, <code><amp-list></amp-list></code> 등의 동적 요소가 예상대로 작동하지 않음.</td>
      <td>잘못되거나 누락된 CORS 헤더.</td>
      <td>이러한 컴포넌트는 AMP 캐시에서 원본으로 원본 간 요청을 전송. 기본적으로 브라우저는 이 요청을 차단하므로 요청을 허용하려면 <a href="amp-cors-requests.md">모든 캐시</a>를 허용 목록에 추가하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS 헤더</a>를 내보냄.</td>
    </tr>
    <tr>
      <td>법적 게시 중단 요청으로 삭제되어야 하는 콘텐츠가 제공되고 있음.</td>
      <td>AMP 캐시가 아직 삭제 조치를 적용하지 않음.</td>
      <td>각 AMP 캐시의 가이드라인을 준수하여 콘텐츠 새로고침 수행. Google AMP 캐시의 경우 <a href="https://developers.google.com/amp/cache/update-cache">AMP 콘텐츠 업데이트</a> 참조.</td>
    </tr>
</tbody>
</table>

</table>
