---
$title: AMP 페이지 유효성 검사
---
[TOC]

AMP의 주요 강점은 페이지 속도가 단순히 빨라지는 것이 아니라,*유효성을 검사* 할 수 있는 방식으로 빨라진다는 것입니다. 이렇게 하면 Twitter, Instagram 과 같은 타사 또는 Google 검색에서 점점 더 흥미로운 방식으로 독자에게 AMP 페이지를 게시하는 것에 자부심을 가질 수 있습니다.

## 페이지가 유효한 AMP인지 검사하는 방법

여러 가지 방법으로 AMP 문서의 유효성을 검사할 수 있습니다. 어떤 방법을 사용해도 결과는 같으므로 내 개발 스타일에 가장 잘 맞는 방법을 사용하면 됩니다.

AMP 유효성 외에도 타사 플랫폼에서 내 AMP 문서가 [검색 가능](/ko/docs/guides/discovery.html) 한지 확인할 수도 있습니다.

### 브라우저 개발자 콘솔

AMP 유효성 검사기는 AMP JS 라이브러리와 번들로 제공되므로 모든 AMP 페이지에서 바로 사용할 수 있습니다. 유효성을 검사하려면 다음 단계를 따르세요.

1. 브라우저에서 AMP 페이지를 엽니다.
1. URL 에 "`#development=1`" 을 추가합니다. 예: `http://localhost:8000/released.amp.html#development=1`
1.  Open the [Chrome DevTools Console](https://developers.google.com/web/tools/chrome-devtools/debug/console/) 을 열고 유효성 검사 오류를 확인합니다.

개발자 콘솔 오류의 형식은 대개 다음과 같습니다.

<amp-img src="/static/img/docs/validator_errors.png"
width="713" height="243" layout="responsive"
alt="Screen grab of AMP Validator errors in chrome developer console">
</amp-img>

### 웹 인터페이스

AMP 유효성 검사기는 <a href="https://validator.ampproject.org/">validator.ampproject.org</a> 에서 웹 인터페이스로 사용할 수 있습니다. 이 인터페이스는 본문 및 페이지의 HTML 소스에 나타나는 오류를 표시합니다. 이 인터페이스는 양방향 편집기입니다. HTML 소스를 변경하면 양방향 재검사가 이루어집니다.

<amp-img src="/static/img/docs/validator_web_ui.png"
    width="660" height="507" layout="responsive"
    alt="Screen grab of validator.ampproject.org with error examples.">
</amp-img>

### 브라우저 확장 프로그램

AMP 유효성 검사기는 브라우저 확장 프로그램을 사용하여 브라우저 툴바에서 바로 액세스할 수 있습니다. 페이지를 탐색하면 방문한 각 AMP 페이지를 자동으로 확인하여 색상 아이콘으로 페이지의 유효성을 시각적으로 나타냅니다.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png"
               width="20" height="20" layout="fixed"
               alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>
    AMP 페이지에 오류가 있을 경우 확장 프로그램의 아이콘이 빨간색으로 표시되며 발생한 오류의 수가 나타납니다.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png"
               width="20" height="20" layout="fixed"
               alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>
    AMP 페이지에 오류가 없으면 아이콘은 녹색으로 표시되며, 경고가 있다면 경고의 수가 나타납니다.</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png"
               width="20" height="20" layout="fixed"
               alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>
    AMP 페이지는 아니지만 AMP 버전을 사용할 수 있는 페이지로 나타나는 경우, 링크 아이콘과 함께 아이콘이 파란색으로 표시됩니다. 확장 프로그램을 클릭하면 브라우저가 AMP 버전으로 리디렉션됩니다.</td>
  </tr>
</table>


[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) 및 [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/) 용 AMP 유효성 검사기 확장 프로그램

### CI용 NPM 패키지

작성 및 테스트 파이프라인에서 AMP 유효성 검사기 NPM 패키지 [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) 또는 [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (Gulp 플러그인)를 통해 AMP 유효성 검사를 통합할 수 있습니다. 예를 들어 AMP 유효성 검사기 NPM 패키지를 통합 테스트나 일정 작업에 사용하여 프로덕션 AMP 페이지의 유효성을 검사할 수 있습니다.

##### 예: AMP HTML 파일 유효성 검사하기

다음 예는 [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) NPM 패키지를 사용하여 AMP HTML 파일의 유효성을 검사합니다. 유효성 검사 상태는 콘솔로 전달됩니다.

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

##### 예: Gulp 작업을 사용하여 AMP HTML 유효성 검사

다음 예는 Gulp 작업으로 모든 AMP HTML 파일의 유효성을 검사합니다. AMP 유효성 검사 오류가 있는 경우 작업이 오류 코드 (1) 과 함께 종료됩니다.

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html'

};gulp.task('amphtml:validate', () => {
  return gulp.src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {
});
```

### 명령줄 도구

[AMP HTML 유효성 검사기 명령줄 도구](https://www.npmjs.com/package/amphtml-validator) 를 사용하여 AMP HTML 의 유효성을 검사할 수 있습니다.

시작하기:

1.  시스템에 [Node.js 와 패키지 관리자 'npm'](https://docs.npmjs.com/getting-started/installing-node) 이 있는지 확인합니다.
2.   다음 명령어를 실행하여 [AMP HTML 유효성 검사기 명령줄 도구](https://www.npmjs.com/package/amphtml-validator) 를 설치합니다. `npm install -g amphtml-validator`

실제 AMP HTML 페이지의 유효성 검사를 실행해보겠습니다.

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]


당연한 결과지만 이 페이지는 유효한 AMP HTML 입니다. 그럼 유효하지 않은 페이지 [(several_errors.html)](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) 를 확인해보겠습니다. `amphtml-validator` 명령어를 실행하려면 페이지의 URL 이나 로컬 파일 이름을 입력해야 합니다. 파일에 [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) 을 다운로드하고 저장한 후 다음을 실행합니다.

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

오류 메시지 형식은 파일 이름, 줄, 열, 메시지로 구성되어 있으며 그다음 AMP HTML 참조 링크가 따라오는 경우가 많습니다. Emacs (컴파일 명령어 및 컴파일 모드 확인) 등 일부 편집기는 이 형식을 해석하여 사용자를 원래 파일의 오류로 이동시킬 수 있습니다.

나만의 AMP 페이지를 만들 때 좋은 출발점은 [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html) 을 고려하는 것입니다.

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

명령줄 도구는 색상 전환, JSON 출력 인쇄, 특정 버전의 유효성 검사기 자바스크립트 실행(기본적으로 가장 최근에 공개된 스크립트를 실행) 등의 추가 기능을 제공합니다.

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

## 페이지가 유효하지 않은 경우

AMP 유효성 검사기는 단순히 개발 과정에서 편의를 제공할 뿐 아니라, Twitter, Google 등 AMP 페이지를 자사 콘텐츠 및 검색결과에 통합하는 플랫폼에서도 사용할 수 있습니다. 더욱이, 이 같은 플랫폼은 보통 서버에서 직접 페이지를 요청하지 않고 페이지를 캐시하고 전 세계에 공급하는 무료 서비스인 Google AMP 캐시를 사용하므로 더 빠르게 로드됩니다.

AMP 유효성 검사 서비스가 페이지에서 오류를 감지한 경우, 타사에서 페이지를 검색하거나 배포하지 못하며 Google AMP 캐시에도 표시되지 않습니다. 이렇게 되면 캐시의 속도적 이점을 누리지 못할 뿐 아니라 페이지가 여러 곳에서 표시되지 않을 수 있습니다. 이런 유감스러운 상황이 발생하지 않도록 해야 합니다.

## 유효성 검사 오류 수정 방법

대부분의 유효성 검사 오류는 쉽게 처리하고 해결할 수 있습니다. 아래 HTML 태그를 한번 생각해 보세요.

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

이 AMP 유효성 검사 오류를 만드는 원인은 아래의 여러 도구에서 다음과 같이 표시됩니다.

* 브라우저 개발자 콘솔
<amp-img src="/static/img/docs/validator_console_imgerror.png"
    width="696" height="30" layout="responsive"
    alt="AMP error: The tag 'img' may only appear as a descendant of tag
    'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>

* 웹 인터페이스
<amp-img src="/static/img/docs/validator_webui_imgerror.png"
    width="676" height="58" layout="responsive"
    alt="AMP error: The tag 'img' may only appear as a descendant of tag
    'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>

* 브라우저 확장 프로그램
<amp-img src="/static/img/docs/validator_extension_imgerror.png"
    width="724" height="108" layout="responsive"
    alt="AMP error: The tag 'img' may only appear as a descendant of tag
    'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>

각 도구는 여러 정보를 제공합니다.

1. HTML 페이지에서 오류가 발생한 위치(줄 및 열). 해당 위치를 강조표시하기 위해 일부 인터페이스에서 클릭 가능. 이 경우 문제가 발생한 위치는 11 줄 2 열입니다.
1.  오류를 설명하는 텍스트 줄. 이 경우 텍스트는 현재 `<img>` 태그가 사용되고 있음을 나타냅니다 (원래 사용해야 하는 태그는 `<amp-img>`).
1.  오류 관련 문서의 링크. 이 경우 `<amp-img>` 태그 관련 문서. 모든 오류에서 문서 링크가 생성되는 것은 아닙니다.

[사양](/ko/docs/reference/spec.html) 을 다시 자세히 검토해보니, `<img>` 태그가 사용되고 있음을 알 수 있습니다(원래 사용해야 하는 태그는 `<amp-img>`).

발생 가능한 오류의 전체 목록을 더 잘 파악하려면 [AMP 유효성 검사 오류 가이드](https://www.ampproject.org/ko/docs/reference/validation_errors.html) 를 참조하세요. 면밀히 평가한 후에도 문제가 해결되지 않는 경우 [질문해주시면](http://stackoverflow.com/questions/tagged/amp-html) 도와드리겠습니다.
