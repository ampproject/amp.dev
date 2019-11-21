---
$title: 서명된 교환을 통해 AMP 제공
$order: 0
$path: /signed-exchange/
---

AMP는 캐싱이나 프리로딩과 같은 기술로 포멧 이상의 속도를 제공합니다. 이러한 이점은 [AMP 뷰어](https://developers.google.com/search/docs/guides/about-amp)에서 보여질 때 별개의 URL이 보여지는 것 같은 [단점](https://blog.amp.dev/2017/02/06/whats-in-an-amp-url/)을 가질 수도 있습니다. 이 단점을 해결하기 위해, AMP 컨텐츠를 제공할때 서명하여 교환하는 것으로 새로운 웹 플랫폼 기능을 사용할 수 있습니다.

[서명하여 교환](https://developers.google.com/web/updates/2018/11/signed-exchanges)하는 것은 유효한 AMP 문서와 컨텐츠의 원래 URL로 구성됩니다. 이 정보는 디지털 서명에 의해 보호되며, 서명은 문서를 제출된 URL과 안전하게 연결합니다. 이것으로 브라우저는 안전하게 URL바에 데이터가 전달된 서버의 호스트네임 대신에 원래 URL을 보여주게 됩니다. 

서명된 AMP 컨텐츠는 정규 AMP 컨텐츠 _대신에_ 제공됩니다.

{{ image('/static/img/docs/guides/sxg/sxg.png', 411, 293, layout='responsive', alt='Image displaying URL from signed exchange', caption=' ', align='' ) }}

[tip type="note"]
    이 기능은 현재 크롬에서 지원되지만, 추가적인 브라우저에서도 계획중에 있습니다.
[/tip]

# 서명된 교환이 저에게 효과적일까요?

서명된 교환을 구현하려면, 다음 요구사항을 충족해야 합니다:

*   서버에 의해서 HTTP 헤더를 구성하고 제어하는 기능. (Blogger같은 대부분의 순수한 웹기반 호스팅 솔루션들은 서명된 교환과 _호환되지 않습니다._ )
*   AMP 서명된 교환을 생성하는 기능.
(예: [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md)를 실행하거나, [Go binary](https://golang.org/doc/install)를 실행하거나, [Docker VM](https://docs.docker.com/machine/get-started/) 내에서 실행하는 것과 같은 기능)
    *   패키저는 매 6주마다 업데이트되어야 합니다.
*   같은 URL에서 다른 컨텐츠를 반환하는 HTTP 서버의 [Vary](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Vary) 헤더의 기능. (예: `Vary: Accept`, `Vary: AMP-Cache-Transform`)
*   `amppackager`를 실행하는 시스템은 다음으로 나가는 네트워크 요청을 할 수 있어야 합니다:
    *   인증서를 발행하는 인증 기관
    *   서명할 AMP 문서를 호스팅하는 퍼블리셔 서버
    *   AMP의 현재 버전을 획득하기 위한 `cdn.ampproject.org`
*   동일한 데이터 센터에서 실행되는 `amppackager`의 모든 인스턴스 사이의 영구 공유 스토리지 파일 시스템

# 서명된 교환 구현

다음은 AMP 문서에서 서명된 교환을 지원하기 위해 제시된 구현 순서입니다.

## 지원되는 TLS 인증서 발급받기

서명된 교환을 생성하기 위해서는, `CanSignHttpExchanges` 확장이 포함된 TLS 인증서가 필요합니다.
2019년 4월, [DigiCert](https://www.digicert.com/)가 이 확장을 제공하는 유일한 공급자였습니다. ([추가 정보](https://docs.digicert.com/manage-certificates/certificate-profile-options/get-your-signed-http-exchange-certificate/)).

서명을 생성하기 위해서는, 인증 기관 (CA)은 인증서 서명 요청 (CSR)을 필요로 하며, `openssl`에 의해 생성될 수 있습니다. `ampbyexample.com`의 CSR 예제:

```sh
# 개인키를 생성 (필요한 경우)
$ openssl ecparam -out ampbyexample-packager.key -name prime256v1 -genkey
# CSR을 생성 (ampbyexample-packager.csr)
$ openssl req -new -key ampbyexample-packager.key -nodes -out ampbyexample-packager.csr -subj "/C=US/ST=California/L=Mountain View/O=Google LLC/CN=ampbyexample.com"
```
## 서명할 URL 결정하기

서명될 문서를 정의하는 URL 패턴을 만들어야 합니다. 오해의 소지가 있거나 잘못된 내용을 전송하지 않도록 개인정보와 같은 컨텐츠에 서명하지 않아야 합니다.

성능을 위해, 패키저는 입력으로 반드시 유효한 AMP 문서만 전달되어야 합니다. 필요한 경우, 일부 유효하지 않은 AMP 문서는 괜찮지만, 모든 트래픽을 패키저에 의해 전송하는 것은 피해야 합니다.

For performance purposes, the packager should only be passed valid AMP documents as input. Some invalid AMP documents are fine if needed, but you should avoid sending all traffic through the packager.

## 패키저를 스테이징 서버에 배포하기

프로덕션으로 마이그레이션 하기 전에 먼저 서명된 교환을 스테이징 서버에 설정하여 설정이 올바른지 확인해야 합니다.

우리는 서명된 교환을 생성하는데 [`amppackager`](https://github.com/ampproject/amppackager/blob/master/README.md)를 사용하는 것을 추천합니다. 하지만 이것이 당신의 운영 환경에 적합하지 않을 경우 커맨드라인 클라이언트를 사용하는 것 대신 [`transform`](https://github.com/ampproject/amppackager/blob/master/transformer/README.md)과 [`gen-signedexchange`](https://github.com/WICG/webpackage/tree/master/go/signedexchange)를 사용하고, 컨텐츠 처리와 인증서 관리를 직접 수행할 수도 있습니다.

다음 지침은 `amppackager`를 사용한 배포에 적용됩니다.

### 구성

[`amppackager`](https://github.com/ampproject/amppackager)의 config 파일 (`amppkg.toml`)은 **CertFile**과 **KeyFile**을 호출합니다.

**KeyFile**은 개인키 이며 (위 예제의 `ampbyexample-packager.key`), 다음 형식이어야 합니다. (주의: 당신의 개인키를 공유하지 말고, 실수로 공유하지 않도록 보호하십시오!)

```txt
-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINDgf1gprbdD6hM1ttmRC9+tOqJ+lNRtHwZahJIXfLADoAoGCCqGSM49
…
4j1NY29jVmAMQYrBYb+6heiv6ok+8c/zJQ==
-----END EC PRIVATE KEY-----
```

**CertFile** 은 공용 인증서입니다. DIgiCert가 인증서를 제공한 경우, DigiCert 와 `DigiCertCA.crt` 파일에서 제공한 각 인증서를 같이 연결하여 만들 수 있습니다.


```txt
-----BEGIN CERTIFICATE-----
MIIE0zCCBFmgAwIBAgIQCkEgeFknZluZtdcJnvdFCjAKBggqhkjOPQQDAjBMMQsw
CQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMSYwJAYDVQQDEx1EaWdp
Q2VydCBFQ0MgU2VjdXJlIFNlcnZlciBDQTAeFw0xODEwMzAwMDAwMDBaFw0xOTEx
MDYxMjAwMDBaMGIxCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJjYTEWMBQGA1UEBxMN
TW91bnRhaW4gVmlldzETMBEGA1UEChMKR29vZ2xlIExMQzEZMBcGA1UEAxMQYW1w
YnlleGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABAGu0CjzWa6i
…
PXLGRK8i0lr7Jv6ZKPY8tfaB/c5yK404QU4HNggmAiEAlnNjIerjJOLHb8CvVaUQ
nhhn0a35nHp1yvE651W14fMwCgYIKoZIzj0EAwIDaAAwZQIwI4/7dpqJQxkQwpP3
DAjVOFdjC6PDcUIRPll3bF0srrTUXSyZ8xkM4q/RhB51A0hVAjEAsUGNYBje9RIO
wf9qyV2iHB+9cBwgKfC0KvEcBugbgHShypM8hPhV9UMC3qTpdKPx
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIDrDCCApSgAwIBAgIQCssoukZe5TkIdnRw883GEjANBgkqhkiG9w0BAQwFADBh
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3
d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBD
QTAeFw0xMzAzMDgxMjAwMDBaFw0yMzAzMDgxMjAwMDBaMEwxCzAJBgNVBAYTAlVT
…
loB5hWp2Jp2VDCADjT7ueihlZGak2YPqmXTNbk19HOuNssWvFhtOyPNV6og4ETQd
Ea8/B6hPatJ0ES8q/HO3X8IVQwVs1n3aAr0im0/T+Xc=
-----END CERTIFICATE-----
```

### 설치
[당신의 사이트에 `amppackager`를 설정하려면 여기](https://github.com/ampproject/amppackager/blob/master/README.md)의 지침을 따르십시오.

[tip type="read-on"]
서버사이드 변경사항의 예제는 [`packager.js`](https://github.com/ampproject/docs/blob/future/platform/lib/routers/packager.js) (`amp.dev`에서 사용된) 를 보십시오. 특정 요청을 `amppkg`로 라우팅하려면 필요할 변경사항 입니다.
[/tip]

### 테스팅

HTTP 요청에 의해 특정된 경우 당신의 사이트가 컨텐츠의 MIME 타입 `application/signed-exchange`으로 응답하는지 확인하십시오.
예를 들면 (`staging.example.com`을 당신의 스테이징 서버 주소로 교체하세요):

```sh
$ curl -si -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ | less
```

출력에는 다음 라인이 포함되어야 합니다:

```txt
content-type: application/signed-exchange;v=b3
```

[tip type="important"]
응답의 `v="1..100"` 는 범위입니다. 정확한 값을 넣지 마십시오; 대신에, [위 amp패키저 설치 지침에 설명된 대로](https://github.com/ampproject/amppackager/blob/master/README.md#productionizing), `amp-cache-transform` 헤더의 존재만 확인하고, 값을 무시하십시오.
[/tip]

[tip type="important"]
응답의 `v=b3` 버전 스트링은 2019년 8월 버전입니다. 이 버전은 바뀔 것입니다.
[/tip]

응답의 대부분은 당신의 AMP 페이지(일반 텍스트)가 되어야 합니다. 바이너리 헤더는 작은 용량이고, 만약 페이지가 16kb보다 크다면, 몇 개의 이진 바이트가 뿌려집니다.

[`dump-signedexchange` 도구](https://github.com/WICG/webpackage/blob/master/go/signedexchange/README.md#installation) 를 사용하여 응답을 검사할 수 있습니다:

```sh
$ curl -s --output - -H 'amp-cache-transform: google;v="1..100"' -H 'accept: application/signed-exchange;v=b3;q=0.9,*/*;q=0.8' https://staging.example.com/ > example.sxg
$ dump-signedexchange -i example.sxg
format version: 1b3
```

(필요한 인증서가 `https://example.com/` 서버에 없기 때문에, `-verify` 스위치가 이 시점에는 동작하지 않음을 주의하십시오.)

응답이 *항상* `Vary` 헤더에 `Accept,AMP-Cache-Transform` 값을 포함하는지 확인하십시오. (MIME 타입이 `text/html`, `application/signed-exchange`, 혹은 다른 값인지에 관계없이):

```sh
$ curl -si https://staging.example.com/ | less
```

출력은 다음 줄을 포함해야 합니다:

```txt
vary: Accept,AMP-Cache-Transform
```

## 패키저를 프로덕션 환경에 배포하기

### 설치

프로덕션 환경에 맞게 위의 스테이징 배포 단계를 조정하십시오.

### 테스트

#### 커맨드라인 도구 사용하기

위와 동일한 테스트를 수행하십시오. `dump-signedexchange -verify` 은 마찬가지로 이제 성공해야 합니다.

#### 크롬 사용하기

당신은 또한 크롬에서 [ModHeader 확장프로그램](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en)의 도움을 받아 테스트할 수 있습니다. 크롬 웹스토어에서 설치하고 `요청 헤더`의 `amp-cache-transform` `값`을 `google`로 설정합니다.

{{ image('/static/img/docs/guides/sxg/sxg1.jpg', 1900, 666, layout='responsive', alt='ModHeader 확장프로그램을 사용하여 크롬 테스트', caption=' ', align='' ) }}

`https://example.com/` 요청을 한 이후에 서버는 서명된 교환을 전달할 것이나, 이전과 똑같이 정상적으로 보이고 동작해야 합니다. 당신은 [ DevTools 콘솔](https://developers.google.com/web/tools/chrome-devtools/)을 통해 서명된 교환이 올바른 결과를 주는지 확인해야 합니다.

{{ image('/static/img/docs/guides/sxg/sxg2.jpg', 3058, 1204, layout='responsive', alt='서명된 교환 헤더는 DevTools 콘솔 안에서 보여집니다', caption=' ', align='' ) }}

`Network` 탭 아래서, 당신의 도메인 이름을 클릭하고 `Signed HTTP exchange`가 `Preview` 아래 나타나는 것을 확인하십시오.

#### 구글 AMP 캐시와 함께 사용

서명된 교환이 구글 AMP 캐시와 호환되는지 확인하십시오. 이는 구글 검색과 같은 검색엔진에서 발견할 수 있는 가능성과 관련됩니다.
구글 AMP 캐시에서 서명된 교환을 테스트하려면, DevTools의 network 탭을 열고, `Preserve log`를 활성화 하고, `https://example-com.cdn.ampproject.org/wp/s/example.com/`와 같은 URL을 방문하십시오.

만일 요청이 성공적이라면, DevTools는 `signed-exchange` 줄, `from signed-exchange` 줄과 함께 `200`을 보여줄 것입니다.

만약 성공하지 못한다면, signed-exchange 줄은 없거나, 빨간색으로 강조표시 될 것입니다. 추가적인 정보를 제공하는 `warning` 헤더가 있을 수도 있습니다.

## 구글 검색에서의 서명된 교환

만약 당신의 AMP 페이지가 성공적으로 서명된 교환으로 배포된 경우, 검색 결과는 이전과 같이 AMP 번개 표시가 보일것이지만, 결과는 URL 바에 `https://www.google.com/amp/….`로 시작하는 URL 대신에 `https://example.com`를 보여줄 것입니다. 추가적으로, `viewer` 바는 나타나지 않을 것입니다.

DevTools 콘솔 안에서, `network` 탭 아래, 당신은 `type` 컬럼 아래 `signed-exchange`를 볼 수 있을 것입니다.

{{ image('/static/img/docs/guides/sxg/sxg3.jpg', 1366, 841, layout='responsive', alt='DevTools 콘솔 안에서, `network` 탭 아래, 당신은 `type` 컬럼 아래 `signed-exchange`를 볼 수 있을 것입니다.', caption=' ', align='' ) }}

# 서명된 교환 서비스 제공자

여기 서명된 교환에 대한 즉각적인 지원을 제공하는 CDN과 호스팅 제공업체 목록입니다. 이들 중 하나를 사용하는 것이 서명된 교환을 시작하는 가장 쉬운 방법입니다:

- [Cloudflare AMP 진짜 URL](https://www.cloudflare.com/website-optimization/amp-real-url/).
  [Cloudflare](https://www.cloudflare.com/) 은 세계에서 가장 큰 네트워크 중 하나입니다. 오늘날, 비즈니스, 비영리, 블로거 그리고 인터넷을 사용하는 누구라도 클라우드플레어 덕분에 더 빠르고 안전한 웹사이트와 앱을 자랑할 수 있습니다.
