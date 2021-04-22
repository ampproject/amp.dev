---
'$title': AMP 캐시 URL 형식 및 요청 처리
$order: 9
toc: 'false'
formats:
  - websites
  - stories
  - ads
author: Gregable
contributors:
  - sebastianbenz
---

이번 문서에서는 AMP 캐시 URL 형식 및 요청 처리 방법을 알아볼 예정입니다.

## URL 형식

가능한 경우 Google AMP 캐시는 각 AMP 문서 도메인을 먼저 [IDN(퓨니코드)](https://en.wikipedia.org/wiki/Punycode)에서 UTF-8으로 변환하여 서브도메인을 생성합니다. 캐시는 모든 `-`(대시 1개)를 `--`(대시 2개)로 교체하며 모든 `.`(마침표)를 `-`(대시)로 교체합니다. 예를 들어 `pub.com`은 `pub-com.cdn.ampproject.org`로 매핑됩니다.

URL 계산기를 활용하여 URL을 AMP 캐시 버전으로 변환할 수 있습니다.

<div><amp-iframe title="AMP Cache tool" height="104" layout="fixed-height" sandbox="allow-scripts" src="/static/samples/files/amp-url-converter.html?url=https://amp.dev/index.amp.html">
  <div placeholder></div></amp-iframe></div>

[tip type="tip"] [AMP-Toolbox Cache URL](https://github.com/ampproject/amp-toolbox/tree/master/packages/cache-url) [Node.js](https://nodejs.org) 모듈을 사용하면 원본 URL을 AMP 캐시 URL 형식으로 변환할 수 있습니다. [/tip]

이 문서에서 설명할 내용은 다음과 같습니다.

- AMP 캐시의 URL 구조.
- AMP 캐시에 URL이 어떻게 표시될지 예측하는 방법.
- AMP 캐시 원본 헤더를 리버싱하여 기존 퍼블리셔 도메인을 확인하는 방법.

## 도메인 이름 프로토콜

모든 문서는 AMP 캐시의 https 프로토콜을 사용합니다.

## 도메인 이름 접미어

모든 AMP 캐시는 JSON 파일에 등록되어 있으며 [AMPHTML 저장소](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json)에서 온라인으로 확인할 수 있습니다. 이 파일의 캐시 레코드 예시는 다음과 같이 표시됩니다.

```json
{
  "id": "google",
  "name": "Google AMP Cache",
  "docs": "https://developers.google.com/amp/cache/",
  "cacheDomain": "cdn.ampproject.org",
  "updateCacheApiDomainSuffix": "cdn.ampproject.org",
  "thirdPartyFrameDomainSuffix": "ampproject.net"
},
```

AMP 캐시는 `cacheDomain`으로 지정된 레코드를 지원합니다 . 이 예시에서 도메인은 `cdn.ampproject.org`입니다.

이 문서는 `cdn.ampproject.org` URL을 예시로 사용하지만 일반적으로 다른 캐시는 유사한 URL 구조를 사용합니다.

## 도메인 이름 접두어

AMP 캐시는 `example-com.cdn.ampproject.org`와 같이 변경된 URL에서 문서를 제공합니다. 예시에서 기존 도메인 이름의 마침표로 구분된 컴포넌트인 `example.com`은 `example-com`으로 변경됩니다. 이 문서에서 `example-com`처럼 마침표가 없는 문자열은 "도메인 접두어"로 지칭합니다. 이러한 변환을 수행하는 알고리즘은 아래에서 확인할 수 있습니다.

[RFC 2818](https://tools.ietf.org/html/rfc2818#section-3.1)과 같은 https(TLS) 인증서의 제약으로 인해 `example.com.cdn.ampproject.org`처럼 여러 개의 마침표로 구분된 컴포넌트는 접두어에 사용되지 않습니다.

```
Names may contain the wildcard character * which is considered to match any single domain name component or component fragment. E.g., *.a.com matches foo.a.com but not bar.foo.a.com.
```

[RFC 2181](https://tools.ietf.org/html/rfc2181#section-11)에서 명시한 아래 내용과 같이 퍼블리셔 도메인 길이는 최대 255자로 구성될 수 있지만 각 도메인 접두어 길이는 63자로 제한됩니다.

```
The length of any one label is limited to between 1 and 63 octets.  A full domain name is limited to 255 octets (including the separators).
```

모든 퍼블리셔 도메인은 고유한 도메인 접두어에 매핑됩니다. 이를 수행하는 알고리즘은 매핑 결과를 인간이 읽을 수 있도록 구성하려 합니다. 하지만 매핑 시 퍼블리셔 도메인이 너무 긴 경우나 아래에 명시된 상황의 경우 보안 해싱을 다시 사용하게 됩니다.

### 기본 알고리즘

퍼블리셔 도메인을 도메인 접두어로 변환하는 기본 알고리즘은 다음과 같습니다.

1. 퓨니코드가 퍼블리셔 도메인을 디코딩. [RFC 3492](https://tools.ietf.org/html/rfc3492) 참조.
2. 1단계 출력 값의 "`-`"(하이픈) 부호를 "`--`"(하이픈 2개)로 대체.
3. 2단계 출력 값의 "`.`"(마침표) 부호를 "`..`"(마침표 2개)로 대체.
4. 3단계 출력 값의 세 번째와 네 번째 위치에 "`-`"(하이픈)이 포함된 경우 해당 출력 값에 접두어 "`0-`" 및 접미어 "`-0`"를 추가. 자세한 설명은 [#26205](https://github.com/ampproject/amphtml/issues/26205) 참조.
5. 퓨니코드가 3단계의 출력 값을 인코딩. [RFC 3492](https://tools.ietf.org/html/rfc3492) 참조.

기본 알고리즘의 몇 가지 예시:

<table>
  <tr>
   <td>
<strong>퍼블리셔 도메인</strong>
   </td>
   <td>
<strong>도메인 접두어</strong>
   </td>
  </tr>
  <tr>
   <td>
<code>example.com</code>
   </td>
   <td>
<code>example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo.example.com</code>
   </td>
   <td>
<code>foo-example-com</code>
   </td>
  </tr>
  <tr>
   <td>
<code>foo-example.com</code>
   </td>
   <td>
<code>foo--example-com</code>
   </td>
  </tr>
  <tr>
   <td> <code>xn--57hw060o.com</code> (⚡😊.com)</td>
   <td> <code>xn---com-p33b41770a</code> (⚡😊-com)</td>
  </tr>
  <tr>
   <td>
<code>en-us.example.com</code>
   </td>
   <td>
<code>0-en--us-example-com-0</code>
   </td>
  </tr>
</table>

기본 알고리즘 실행 후 도메인 접두어가 유효한 DNS 라벨이 아닌 경우에만 아래에 명시된 폴백 알고리즘을 실행합니다.

도메인 접두어가 63자 이상인 경우 유효한 DNS 라벨이 아닙니다.

### 폴백 알고리즘

퍼블리셔 도메인을 도메인 접두어로 변환하는 폴백 알고리즘은 다음과 같습니다.

1. SHA256를 사용해 퍼블리셔 도메인을 해싱.
2. Base32로 1단계의 출력 값을 이스케이핑.
3. 2단계 출력 시 항상 `=`(등호)인 마지막 문자 4개를 제거.

폴백 알고리즘은 다음과 같이 `-`(하이픈)이 없는 52자 문자열을 생성합니다: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`.

### 결합 알고리즘

결합 알고리즘은,

1. 기본 알고리즘 실행. 출력 값이 유효한 DNS 라벨인 경우 캐시 도메인 접미어를 추가하고 반환합니다(예: `example-com.cdn.ampproject.org`). 그렇지 않으면 2단계로 넘어갑니다.
2. 폴백 알고리즘 실행. 캐시 도메인 접미어를 추가하고 반환합니다(예: `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`).

## URL 경로

AMP 캐시의 URL 경로는 항상 하나 이상의 접두어(예: `/c`) 디렉토리로 구성됩니다. 그다음으로 퍼블리셔 URL이 http `s`인 경우에만 `/s`가 중간에 삽입되며 그 뒤엔 프로토콜 없이 퍼블리셔 문서의 URL이 붙습니다.

{{ image('/static/img/docs/guides/cache-url-path.jpg', 1688, 312, layout='intrinsic', alt='Image displaying cached URL formats') }}

`/c`와 같은 접두어 디렉토리는 AMP 캐시가 수행할 수 있는 다양한 지원 유형에 해당합니다. 아래는 일부 목록입니다.

- `/c` - <strong>C</strong>ontent(콘텐츠): 일부 인터페이스에 직접 연결될 수 있는 스탠드얼론 페이지로 제공되는 AMP 문서입니다.
- `/v` - <strong>V</strong>iewer(뷰어): 마찬가지로 AMP 문서이지만, 검색 결과 페이지 또는 기타 인터페이스에서 AMP 문서를 표시하는 프레임 환경인 [AMP 뷰어](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/#implementing-an-amp-viewer)에서 제공됩니다.
- `/wp` - <strong>W</strong>eb <strong>P</strong>ackage(웹 패키지): 웹 패키지 기술인 [Signed Exchange(서명된 교환)](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/)으로 제공되는 AMP 문서입니다. 이러한 URL은 퍼블리셔 원본으로의 리디렉션 기능을 제공합니다.
- `/cert` - <strong>Cert</strong>ificate(인증서): [Signed Exchange(서명된 교환)](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/)과 사용되는 공개 인증서입니다.
- `/i` - <strong>I</strong>mage(이미지): 일반적으로 문서 하위 리소스로 AMP 캐시가 제공하는 이미지입니다.
- `/ii` - <strong>I</strong>mage(이미지): AMP 캐시가 제공하는 이미지이지만 일반적으로 다른 캐시 구성 매개변수와 결합됩니다. 예를 들어 `/ii/w800`는 문서에서 요청하는 최대 너비를 표시합니다. 캐시는 브라우저 대역폭 절감을 위해 다양한 크기의 이미지를 생성할 수 있습니다.

또한 AMP 캐시는 퍼블리셔 문서 쿼리의 일부가 아닌 문서 URL에 특수 쿼리 매개변수를 추가할 수도 있습니다. 예를 들어 [`<amp-live-list>`](../../../components/reference/amp-live-list.md)는 매개변수 `amp_latest_update_time<`가 포함된 문서를 가져와 새로고침을 요청합니다. 문서 크롤링 시 이러한 매개변수가 원본으로 전달되지는 않지만 해당 요청을 AMP 캐시로 구성하기 위해 필요합니다.

## CORS 원본

많은 퍼블리셔는 AMP 문서의 CORS 요청을 사용하여 추가 데이터를 검색합니다. CORS 요청은 `Origin:` HTTP 헤더를 요청하는 문서의 원본을 지정하는 요청에 전송하는 방식으로 동작합니다. 상단에서 확인되는 바와 같이 원본 출처는 AMP 캐시와 원본 문서에서 각기 다릅니다. 퍼블리셔 URL에 제공된 AMP 캐시 URL 원본을 확인하는 알고리즘은 상단의 도메인 이름 섹션에서 찾을 수 있습니다. 한편 하단에서는 CORS `Origin:` 요청 헤더 해석에 필요한 리버스 알고리즘이 원본 퍼블리셔 도메인으로 지정되었습니다.

### AMP 캐시 원본을 퍼블리셔 도메인으로

AMP 캐시 원본 헤더는 다음 예시 중 하나처럼 표시됩니다.

- `https://www-example-com.cdn.ampproject.org`
- `https://v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq.cdn.ampproject.org`

먼저 프로토콜 접두어(`https://`) 및 AMP 캐시 도메인 접미어(예: `.cdn.ampproject.org`)를 제거합니다. 접미어는 [caches.json](https://github.com/ampproject/amphtml/blob/main/build-system/global-configs/caches.json)에 열거된 캐시 중 하나일 것입니다. 남은 문자열이 "도메인 접두어"입니다. 상단 예시 두 개의 경우 "도메인 접두어"는 다음과 같습니다.

- `www-example-com`
- `v2c4ucasgcskftbjt4c7phpkbqedcdcqo23tkamleapoa5o6fygq`

다음으로 "도메인 접두어"에 ‘`-`’(하이픈)이 한 개 이상 포함되었는지 확인합니다. 현재까지는 하이픈 한 개 이상이 포함되는 사례가 가장 일반적입니다. "도메인 접두어"에 ‘`-`’(하이픈)이 한 개 이상 포함되지 않을 경우 AMP 캐시 원본을 직접 리버싱할 수 없습니다. 대신 가능한 퍼블리셔 도메인 집합을 알고 있다면 이 문서 상단에 포함된 도메인 이름 알고리즘을 사용하여 AMP 캐시 원본 집합을 생성할 수 있습니다. 다음으로 고정된 집합에 대한 검사를 수행할 수 있습니다.

나머지 알고리즘은 “도메인 접두어”에 한 개 이상의 ‘`-`’(하이픈)이 포함되었다고 가정합니다.

1. 도메인 접두어가 `xn--`로 시작할 경우 퓨니코드는 “도메인 접두어”를 디코딩합니다. 예를 들어 `xn---com-p33b41770a`는 `⚡😊-com`로 변경됩니다. 퓨니코드에 관한 내용은 [RFC 3492](https://tools.ietf.org/html/rfc3492)를 참조하세요.
2. 도메인 접두어가 "`0-`"로 시작하여 "`-0`"로 종료될 경우 접두어인 "`0-`" 및 접미어인 "-0"를 모두 제거합니다.
3. 2단계의 문자 출력을 순서대로 반복하고 문자가 표시될 시 내보냅니다. "`-`"(하이픈)이 표시되면 다음 문자를 살펴봅니다. 다음 문자도 "`-`"(하이픈)인 경우 출력 값의 문자를 모두 건너뛰고 "`-`"(하이픈) 1개만을 내보냅니다. 다음 문자가 다른 문자인 경우 현재의 "`-`"(하이픈) 1개만을 건너뛰고 "`.`"(마침표)를 내보냅니다. 예를 들어 `a--b-example-com`은 `a-b.example.com`으로 변경됩니다.
4. 퓨니코드가 3단계의 출력 값을 인코딩합니다. 퓨니코드에 관한 내용은 [RFC 3492](https://tools.ietf.org/html/rfc3492)를 참조하세요.

4단계의 결과가 퍼블리셔 도메인이 됩니다. 프로토콜은 도메인 자체에서 지원되지 않지만 `http` 또는 `https`입니다. 포트는 항상 프로토콜의 기본입니다.

## 리디렉션 및 오류 처리

AMP 캐시에서 리디렉션 및 오류를 처리하는 몇 가지 예시를 아래에서 확인하세요.

**리디렉션**

AMP URL 확인 시 AMP 캐시는 리디렉션을 준수합니다. 예를 들어 URL은 다른 AMP URL로 리디렉션 됩니다.

```
$ curl -I https://amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html
HTTP/1.1 301 Moved Permanently
Content-Type: text/html; charset=utf-8
Location: https://amp.dev/index.amp.html
...
```

다음으로 AMP 캐시는 기존 URL의 확인된 리디렉션 콘텐츠를 반환합니다.

예시: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/redirect?url=https://amp.dev/index.amp.html).

중요: 서버에서 AMP 파일 위치를 이동한 경우 기존 위치에서 새 위치로 리디렉션 설정이 필요합니다.

**찾을 수 없음**

AMP 캐시에서 페이지를 찾을 수 없는 경우 오류 페이지를 표시하고 404 상태를 반환합니다.

예시: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/not-found)

**유효하지 않은 AMP**

페이지가 유효하지 않은 AMP일 경우 AMP 캐시는 정규 페이지로 리디렉션 됩니다.

예시: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/invalid-amp)

**서버 오류**

URL에서 5XX 서버 오류가 반환될 경우 AMP 캐시는 404 상태를 반환합니다.

예시: [https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error](https://amp-dev.cdn.ampproject.org/amp.dev/documentation/examples/api/server-error)
