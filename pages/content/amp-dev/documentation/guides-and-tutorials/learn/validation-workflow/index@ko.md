---
$title: AMP 페이지 유효성 검사
---
[TOC]

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='동영상을 시청하여 다양한 유효성 검사 옵션을 확인해 보세요.']

AMP의 주요 강점은 페이지 속도를 향상할 뿐만 아니라 향상된 페이지 속도의 *유효성*을 검사할 수 있다는 것입니다. 따라서 Twitter, Instagram과 같은 타사나 Google 검색에서 부담 없이 더욱 흥미롭게 사용자에게 AMP 페이지를 게재할 수 있습니다.

## 내 페이지가 유효한 AMP인지 확인하는 방법

AMP 문서의 유효성을 검사하는 방법에는 여러 가지가 있습니다. 결과는
모두 동일하므로 내 개발 스타일에 맞는 방법을
사용하세요.

<<<<<<< HEAD
AMP 유효성을 검사할 뿐만 아니라 AMP 문서가 타사 플랫폼에서 [검색되는지]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}) 확인하고 싶을 수도 있습니다.
=======
AMP 유효성을 검사할 뿐만 아니라 AMP 문서가 타사 플랫폼에서 [검색되는지]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}) 확인하고 싶을 수도 있습니다.
>>>>>>> 3aeec0a67c667957f9f54faf118da91faf46313f

### 브라우저 개발용 콘솔

AMP 유효성 검사 도구는 AMP JS 라이브러리에 번들로 제공되므로 모든 AMP 페이지에서 바로 사용할 수 있습니다. 유효성 검사 방법은 다음과 같습니다.

  1. 브라우저에서 AMP 페이지를 엽니다.
  1. URL에 "`#development=1`"을 추가합니다(예: `http://localhost:8000/released.amp.html#development=1`).
  1. [Chrome DevTools Console](https://developers.google.com/web/tools/chrome-devtools/debug/console/)을 열고 유효성 검사 오류가 있는지 확인합니다.

개발용 콘솔 오류는 다음과 같이 표시됩니다.

<amp-img src="/static/img/docs/validator_errors.png"
         width="713" height="243" layout="responsive"
         alt="Chrome Developer Console의 AMP 유효성 검사 도구 오류 화면">
</amp-img>

### 웹 인터페이스

AMP 유효성 검사 도구는
<a href="https://validator.ampproject.org/">validator.ampproject.org</a>에서 웹 인터페이스로 사용할 수 있습니다. 이
인터페이스는 페이지의 HTML 소스와 함께 본문에 있는 오류를 표시합니다.
이 인터페이스는 양방향 편집기이며 양방향 유효성 재검사에서 HTML 소스의 변경사항이
반영됩니다.

<amp-img src="/static/img/docs/validator_web_ui.png"
         width="660" height="507" layout="responsive"
         alt="validator.ampproject.org 오류 화면의 예">
</amp-img>

### 브라우저 확장 프로그램

AMP 유효성 검사 도구는 브라우저 확장 프로그램을 통해 브라우저 툴바에서 바로
액세스할 수 있습니다. 이 확장 프로그램은 사용자가 탐색하면서 방문한 모든 AMP 페이지의 유효성을
자동으로 검사하고 색상 아이콘으로 페이지의 유효성을 시각적으로
표시합니다.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png"
               width="20" height="20" layout="fixed"
               alt="유효하지 않은 AMP 문서를 나타내는 빨간색 AMP 아이콘입니다.">
      </amp-img>
    </td>
    <td>AMP 페이지 내에 오류가 있는 경우 확장 프로그램의 아이콘이
      빨간색으로 표시되며 발생한 오류의 수를 표시합니다.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png"
               width="20" height="20" layout="fixed"
               alt="유효한 AMP 문서를 나타내는 녹색 AMP 아이콘입니다.">
      </amp-img>
    </td>
    <td>AMP 페이지 내에 오류가 없는 경우 확장 프로그램 아이콘이
      녹색으로 표시되며 경고가 있다면 경고의 수를 표시합니다.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png"
               width="20" height="20" layout="fixed"
               alt="클릭할 때 AMP HTML 버전을 표시하는 파란색 AMP 아이콘입니다.">
      </amp-img>
    </td>
    <td>AMP는 아니지만 AMP 버전이 있는 페이지인 경우
      링크 아이콘과 함께 아이콘이 파란색으로 표시되며
      확장 프로그램을 클릭하면 AMP 버전으로 브라우저가 리디렉션됩니다.
    </td>
  </tr>
</table>


유효성 검사 도구 확장 프로그램은 [Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) 및 [Opera](https://addons.opera.com/ko/extensions/details/amp-validator/)에서 사용할 수 있습니다.

### CI용 NPM 패키지

[amphtml-validator](https://www.npmjs.com/package/amphtml-validator) 또는 [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator)(gulp 플러그인) 등의 AMP 유효성 검사 도구 NPM 패키지를 사용하여 AMP 유효성 검사를 빌드 및 테스트 파이프라인의 일부로 통합할 수 있습니다.  예를 들어, AMP 유효성 검사 도구 NPM 패키지로 통합 테스트를 진행하거나, 해당 패키지를 프로덕션 단계의 AMP 페이지의 유효성을 검사하는 예약된 작업에 응용할 수 있습니다.


##### 예: AMP HTML 파일 유효성 검사

이 예에서는 [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) NPM 패키지를 사용하여 AMP HTML 파일의 유효성을 검사합니다.  유효성 검사 상태는 콘솔로 전달됩니다.

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  ((result.status === 'PASS') ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
  }
});
```

#####예: AMP HTML 유효성 검사에 gulp 작업 사용

이 예에서는 모든 AMP HTML 파일의 유효성을 검사하는 gulp 작업을 사용합니다.  AMP 유효성 평가 오류가 있는 경우 작업이 종료되며 오류 코드(1)가 표시됩니다.

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html'
};

gulp.task('amphtml:validate', () => {
  return gulp.src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {
});
```

### 명령줄 도구

[AMP HTML 유효성 검사 도구 명령줄 도구](https://www.npmjs.com/package/amphtml-validator)를 사용하여 AMP HTML 파일의 유효성을 검사할 수 있습니다.

시작하기:

1.  시스템에 [Node.js와 패키지 관리자
'npm'](https://docs.npmjs.com/getting-started/installing-node)이 있는지 확인합니다.
2.  `npm install -g amphtml-validator` 명령을 실행하여 [AMP HTML 유효성 검사 도구 명령줄 도구](https://www.npmjs.com/package/amphtml-validator)를 설치합니다.

이제 실제 AMP HTML 페이지의 유효성 검사를 해보겠습니다.

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

당연히 이 페이지는 유효한 AMP HTML입니다. 그러므로 유효하지 않은 페이지에서 실행해 보겠습니다.
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). `amphtml-validator` 명령을 실행하려면 페이지의 URL 또는 로컬 파일 이름을 제공할 수 있습니다. [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html)을 다운로드하여 파일에 저장하고 다음을 실행합니다.

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (https://www.ampproject.org/ko/docs/reference/components/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (https://www.ampproject.org/ko/docs/reference/components/amp-ad.html)
...
[/sourcecode]

오류 메시지의 형식은 파일 이름, 행, 열, 메시지로 구성되어 있으며 종종
AMP HTML 참조 링크가 뒤에 이어집니다. Emacs(컴파일 명령어와 편집 모드가 있음)를
포함한 일부 편집기는 이 형식을 해석할 수 있으며
원래 파일에서 오류로 이동할 수 있게 해줍니다.

나만의 AMP 페이지를 만들려면 먼저 [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html)로 시작해 보세요.

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

명령줄 도구는 색상 사용 해제, JSON 출력 인쇄, 특정 버전의
유효성 검사 도구 자바스크립트 실행(기본적으로 가장 최근에 게시된
스크립트를 실행함) 등의 추가 기능을 제공합니다.

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  옵션:

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

## 페이지가 유효하지 않으면 어떻게 되나요?

AMP 유효성 검사 도구는 개발하는 동안 편의를 제공하기 위한 목적만 있는 것은 아닙니다. Twitter 또는 Google과 같은 플랫폼에서 내 AMP 페이지를 플랫폼의 콘텐츠 또는 검색결과에 통합하는 데에도 사용됩니다. 일반적으로 내 서버에 직접 페이지를 요청하는 대신 페이지를 캐시하고 전 세계에서 이용할 수 있도록 하여 페이지 로드 속도를 한층 더 향상시키는 무료 서비스 Google AMP 캐시를 활용합니다.

AMP 유효성 검사 서비스에서 페이지의 오류를 감지한 경우 타사 웹사이트에서 발견하고 배포하지 못하며 Google AMP 캐시에 표시되지 않습니다. 따라서 캐시의 속도상의 장점을 잃게 될뿐 아니라 페이지가 여러 위치에서 표시되지 않을 수 있습니다. 이런 상황이 발생하지 않도록 해야 합니다.

## 유효성 오류는 어떻게 해결하나요?

대부분의 유효성 오류는 쉽게 해결할 수 있습니다. 이 HTML 태그를 살펴봅시다.

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

이 AMP 유효성 오류의 원인은 아래의 여러 도구에 표시됩니다.

* 브라우저 개발용 콘솔
<amp-img src="/static/img/docs/validator_console_imgerror.png"
         width="696" height="30" layout="responsive"
         alt="AMP 오류: 'img' 태그는 'noscript' 태그의 하위 요소만으로 표시될 수
         있습니다. 'amp-img'를 의미하셨나요? 행 11, 열 2">
</amp-img>

* 웹 인터페이스
<amp-img src="/static/img/docs/validator_webui_imgerror.png"
         width="676" height="58" layout="responsive"
         alt="AMP 오류: 'img' 태그는 'noscript' 태그의 하위 요소만으로 표시될 수
         있습니다. 'amp-img'를 의미하셨나요? 행 11, 열 2">
</amp-img>

* 브라우저 확장 프로그램
<amp-img src="/static/img/docs/validator_extension_imgerror.png"
         width="724" height="108" layout="responsive"
         alt="AMP 오류: 'img' 태그는 'noscript' 태그의 하위 요소만으로 표시될 수
         있습니다. 'amp-img'를 의미하셨나요? 행 11, 열 2">
</amp-img>

각 도구는 여러 정보를 제공합니다.


  1. HTML 문서에서 오류가 발생한 위치(행과 열):
     일부 인터페이스에서는 이 위치를 클릭하여 강조표시할 수 있습니다. 이 경우
     문제는 행 11, 열 2에서 발생했습니다.
  1. 해당 오류를 설명하는 텍스트 행: 이 경우 텍스트는
     `<amp-img>` 태그를 사용해야 하는데 `<img>` 태그를 사용 중임을 나타냅니다.
  1. 오류 관련 문서에 대한 링크: 이 경우
     `<amp-img>` 태그에 대한 문서입니다. 일부 오류는 문서 링크를
     생성하지 않습니다.

[spec]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md', locale=doc.locale).url.path}})을 신중히 다시 읽으면 `<amp-img>` 태그를 사용해야 하는데 `<img>` 태그를 사용 중임을 알 수 있습니다.

발생할 수 있는 오류의 전체 목록에 대해 자세히 알아보려면
[AMP 유효성 오류 가이드]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md', locale=doc.locale).url.path}})를 참조하세요.
신중한 평가 후에도 문제가 해결되지 않는 경우
[문의해 주시면](http://stackoverflow.com/questions/tagged/amp-html) 도움을
드리겠습니다.



