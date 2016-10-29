---
$title: AMP 페이지 검증하기
$order: 5
---
[TOC]

AMP의 주요 강점은 단순히 페이지를 빠르게 만드는 게 아니라,
*검증된* 방법으로 페이지를 빠르게 하는 게 가능한 것입니다.

이 방법으로, 트위터, 인스타그램, 구글 검색같은 서드 파티에서
흥미로운 방법을 늘려 독자에게 AMP 페이지를 제공하는 걸 좋다고 느낄겁니다.

## 내 페이지가 유효한 AMP인 지 어떻게 확인하나요?

AMP 문서를 검증하기 위한 여러 방법이 있습니다.
이 방법들은 같은 결과를 도출하기 때문에, 개발 스타일에 가장 맞는 걸로 선택하면 됩니다.

AMP 검증과 더불어,
서드 파티 플랫폼에서 AMP 페이지를 [발견 가능한 지](/ko/docs/guides/discovery.html) 확인할 수 있습니다.

### 브라우저 개발자 콘솔

AMP 검증기는 AMP JS 라이브러리에 포함되어있어 모든 AMP 페이지에서 사용할 수 있습니다.
검증을 위해서는:

  1. 브라우저에서 AMP 페이지를 엽니다.
  1. URL에 "`#development=1`"을 넣습니다. 예를 들면, `http://localhost:8000/released.amp.html#development=1`.
  1. [크롬 개발자 도구](https://developers.google.com/web/tools/chrome-devtools/debug/console/)를 실행하고 검증 오류를 확인합니다.

개발자 콘솔 에러는 이렇게 보일 겁니다:

<amp-img src="/static/img/docs/validator_errors.png"
         width="713" height="243" layout="responsive"
         alt="크롬 개발자 도구의 AMP 검증기 오류 스크린샷">
</amp-img>

### 웹 인터페이스

AMP 검증기는 <a href="https://validator.ampproject.org/">validator.ampproject.org</a> 형태의 웹 인터페이스도 제공합니다.
이 인터페이스는 페이지의 HTML 소스에 인라인으로 에러를 보여줍니다.
이 인터페이스는 동적 에디터이며, HTML 소스의 변화에 따라 결과를 동적으로 재검증합니다.

<amp-img src="/static/img/docs/validator_web_ui.png"
         width="660" height="507" layout="responsive"
         alt="Screen grab of validator.ampproject.org with error examples.">
</amp-img>

### 브라우저 확장

AMP 검증기는 브라우저 확장을 이용해 브라우저의 툴바에 직접 넣어 접근할 수 있습니다.
페이지를 브라우징하면, 확장 도구는 자동으로 방문한 각 AMP 페이지를 검증하며,
색상별 아이콘으로 페이지의 검증을 표시해줍니다.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png"
               width="20" height="20" layout="fixed"
               alt="빨간 AMP 아이콘은 검증되지 않은 AMP 문서를 나타냅니다.">
      </amp-img>
    </td>
    <td>AMP 페이지에 에러가 있는 경우 아이콘은 빨간색으로 보이며 총 에러 수를 보여줍니다.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png"
               width="20" height="20" layout="fixed"
               alt="초록색 AMP 아이콘은 검증된 AMP 페이지를 보여줍니다.">
      </amp-img>
    </td>
    <td>AMP 페이지에 에러가 없는 경우, 아이콘은 초록색으로 보이며 경고가 존재한다면 총 경고 수를 보여줍니다.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png"
               width="20" height="20" layout="fixed"
               alt="푸른 AMP 아이콘을 클릭하면 다른 AMP HTML을 보여줍니다.">
      </amp-img>
    </td>
    <td>페이지가 AMP는 아니지만 페이지에서 AMP 버전이 사용가능하다고 가리키고 있을 때,
    아이콘은 링크 아이콘처럼 파란색으로 보이며, 확장도구 아이콘를 클릭하면 AMP 버전으로 이동합니다.</td>
  </tr>
</table>

AMP 검증기 확장도구는
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) 및
[Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/)에서 지원합니다.

### 커맨드 라인 도구

사용하기 전에 필수적으로 [시스템에 Node.js 및 패키지 매니저](https://docs.npmjs.com/getting-started/installing-node)를 설치해야 합니다.

[AMP HTML validator command line tool](https://www.npmjs.com/package/amphtml-validator)의 설치는, `npm install -g amphtml-validator`을 입력하면 됩니다.

AMP HTML 페이지를 검증해봅시다.

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

당연히도 이 페이지는 유효한 AMP HTML입니다. 유효하지 않은 페이지도 체크해봅시다:
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html).
`amphtml-validator` 커맨드를 실행하려면, 페이지의 URL이나 로컬 파일명을 제공해야 합니다.
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) 파일을 다운로드받고, 작동시켜봅시다:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

에러 메시지의 포맷은 파일명, 라인, 컬럼, 메시지, 때로 AMP HTML 참조문서로의 링크로 구성됩니다.
Emacs를 포함한 (컴파일 명령과 편집 모드를 찾는) 몇몇 에디터에서는, 이 포맷을 해석한 후 원본 파일 내 에러로 이동하는 것도 가능합니다.

자신만의 AMP 페이지를만들기 위한 좋은 시작점으로
[minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html)를 고려하길 바랍니다:

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

커맨드 라인 도구는 색상을 변경하거나, JSON 출력을 나타내거나, 검증기 자바스크립트의 버전을 정해 동작(기본으로는 마지막으로 발행된 스크립트로 동작합니다)시키는 등
추가적인 기능을 지원합니다.

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## 내 페이지가 유효하지 않다면 무슨 일이 일어나나요?

AMP 검증기는 단순히 개발 편의를 위해 제공하는 게 아닙니다.
구글이나 트위터같은 플랫폼에서 검색 결과나 콘텐츠에 AMP 페이지를 가져올 때 사용합니다.
추가적으로, 그런 서비스들에서 페이지를 직접 서버에 요청하지 않고, Google AMP 캐시를 이용해서 가져갈 것입니다.
Google AMP 캐시는 페이지를 전 세계에서 접속 가능하게 하는 무료 캐시 서버이며, 로딩을 더 빠르게 합니다.

만약 AMP 검증기가 페이지에 문제가 있는 걸 찾으면,
서드 파티 웹사이트에서 발견 및 배포되지 않으며 Google AMP 캐시에서 표시되지 않습니다.
그러니 단순히 캐시의 속도 개선만 잃는 게 아니라, 페이지가 더 많은 장소에서 보여지지 않을 수 있다는 겁니다.
즉, 그런 상태가 되지 않게 해야합니다.

## 검증 오류는 어떻게 해결해야하나요?

대부분의 검증 오류는 찾아서 해겱하기 쉽습니다. 이 HTML 태그를 보면:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

위 예제는 AMP 검증기 에러를 만들어 내며, 서로 다른 도구에서 이렇게 보여줍니다:

 * 브라우저 개발자 콘솔
<amp-img src="/static/img/docs/validator_console_imgerror.png"
         width="696" height="30" layout="responsive"
         alt="AMP 에러: 'img' 태그는 'noscript' 태그의 자손요소로만 사용 가능합니다. 혹시 'amp-img' 태그를 사용하려 하셨나요? line 11, column 2">
</amp-img>

 * 웹 인터페이스
<amp-img src="/static/img/docs/validator_webui_imgerror.png"
         width="676" height="58" layout="responsive"
         alt="AMP 에러: 'img' 태그는 'noscript' 태그의 자손요소로만 사용 가능합니다. 혹시 'amp-img' 태그를 사용하려 하셨나요? line 11, column 2">
</amp-img>

* 브라우저 확장 도구
<amp-img src="/static/img/docs/validator_extension_imgerror.png"
         width="724" height="108" layout="responsive"
         alt="AMP 에러: 'img' 태그는 'noscript' 태그의 자손요소로만 사용 가능합니다. 혹시 'amp-img' 태그를 사용하려 하셨나요? line 11, column 2">
</amp-img>

각 도구에서 제공하는 정보의 구성은 다음과 같습니다:


  1. HTML 문서에서 에러가 발생한 장소 (라인 및 컬럼), 일부 인터페이스에서는 클릭 가능하며 에러가 발생한 장소를 하이라이트 해줍니다. 이 케이스에서는 Line 11, column 2에서 에러가 발생했습니다.
  1. 해당 에러에 관한 설명, 이 케이스에서는 `<amp-img>` 태그를 사용해야 할 때 `<img>` 태그를 사용하고 있음을 나타냅니다.
  1. 에러와 관련있는 문서의 링크. 이 케이스에서는 `<amp-img>` 태그 문서입니다. 모든 에러가 문서 링크를 생성하는 건 아닙니다.

꼼꼼히 스펙을 다시 읽자면,
우리가 `<amp-img>` 태그를 사용해야하는 상황에,
`<img>` 태그를 사용하고 있음을 깨달을 상황입니다.

잠재적 에러의 전체 목록의 이해를 위해서
[AMP Validation Errors guide](https://www.ampproject.org/docs/reference/validation_errors.html)를 읽어보시길 바랍니다.

만약 꼼꼼한 검토 후에도 여전히 해결이 되지 않았다면,
[문제에 대해 질문](http://stackoverflow.com/questions/tagged/amp-html)하면 우리가 도와주겠습니다.
