---
'$title': Node.js AMP Optimizer 가이드
$order: 2
description: 이 가이드에서는 AMP Optimizer의 Node.js 버전을 설정하고 사용하는 방법을 설명합니다.
formats:
  - websites
  - stories
author: sebastianbenz
---

이 가이드에서는 AMP Optimizer의 Node.js 버전을 설정하고 사용하는 방법을 설명합니다.

## 설정

다음을 사용하여 NPM을 통해 설치합니다.

```shell
npm install @ampproject/toolbox-optimizer
```

## 사용

AMP Optimizer API는 HTML 문자열을 입력하여 해당 HTML 문자열의 최적화된 버전을 반환합니다. 기본 사용 사례는 다음과 같습니다.

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### 빌드 타임으로 최적화된 AMP 생성

정적 사이트의 경우 사이트 빌드 시 빌드 타임으로 AMP 페이지를 최적화하는 것이 최선입니다. 빌드를 기반으로 해당 페이지를 [Gulp.js](https://gulpjs.com/)에 통합하는 예시를 확인해 보세요. 이 예시에는 사용자 지정 변환이 추가되어 src 폴더의 모든 HTML 파일을 최적화합니다.

```js
const {src, dest} = require('gulp');
const through2 = require('through2');

const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

function build(cb) {
  return src('src/*.html')
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          const optimizedHtml = await ampOptimizer.transformHtml(
            file.contents.toString()
          );
          file.contents = Buffer.from(optimizedHtml);
        }
        cb(null, file);
      })
    )
    .pipe(dest('dist/'));
}

exports.default = build;
```

### 렌더 타임

동적 페이지의 경우 서버에서 페이지를 렌더링해야 할 경우가 많습니다. 이런 경우에 페이지 렌더링 후 AMP Optimizer를 실행할 수 있습니다. [Express.js](https://expressjs.com/) 서버로의 샘플 통합을 확인하세요. AMP 최적화를 Express 라우터로 통합하는 한 가지 방식은 템플릿이 [렌더링된](https://expressjs.com/en/api.html#app.render) 후 콜백하는 것입니다.

```js
const express = require('express');
const router = express.Router();
const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

router.get('/', (req, res) => {
  const locals = {title: 'Express with AMP Optimizer'};
  res.render('index', locals, async (err, html) => {
    const optimizedHtml = await ampOptimizer.transformHtml(html);
    res.send(optimizedHtml);
  });
});

module.exports = router;
```

중요: 렌더링 지연을 방지하려면 서버에서 AMP Optimizer 사용 시 캐싱 또는 CDN을 설정합니다.

## 구성

AMP Optimizer는 대다수의 경우 적절히 작동하는 합리적인 기본 구성을 제공합니다. 하지만 특정 사용 사례에 따라 변환을 사용자 지정할 수도 있습니다. 가능한 모든 옵션의 전체 모곡은 [여기](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options)에서 확인하세요.

몇 가지 중요 옵션은 다음과 같습니다.

- `lts: true`는 AMP 런타임 및 컴포넌트의 [안정적인 장기 URL](https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md) 활성화 시 사용됩니다.
- `verbose: true`는 세부적인 디버그 출력 값에 사용됩니다. 특히 AMP 상용구를 삭제할 수 없는 이유를 식별하는 데 유용합니다.
- `imageOptimizer`: 주어진 이미지 src의 srcset URL을 계산하는 함수를 제공하여 자동 이미지 srcset 생성을 활성화합니다. 함수는 주어진 너비의 `src` 이미지 버전을 가리키는 URL을 반환해야 합니다. 이미지가 지원되지 않는 경우 거짓 같은(Falsy) 값을 반환해야 합니다. 다음 섹션에서 자세한 내용을 확인하세요.

### 이미지 최적화

AMP Optimizer는 `layout` 정의를 기반으로 주어진 `amp-img`의 `srcset` 값을 생성할 수 있습니다. 적절히 작동하려면 이미지의 `src`를 매핑하는 함수 및 크기가 변경된 `srcset` 소스 값의 `width`를 제공해야 합니다. 이미지 크기 변경은 AMP Optimizer를 통해 수행되지 않습니다. 따라서 빌드 타임으로(예: 정적 사이트) 또는 [thumbor](https://github.com/thumbor/thumbor) 등의 이미지 호스팅 서비스로 수행되어야 합니다.

다음은 `src`에 이미지 너비를 추가한 구현 예시입니다.

```js
const ampOptimizer = AmpOptimizer.create({
  // parameters are the amp-img `src` and the `width` of the to be generated srcset source value
  imageOptimizer: (src, width) => {
    // we cannot rename if the image does not have a file extension
    const index = src.lastIndexOf('.');
    if (index === -1) {
      // return null means we won't generate a srcset source value for this width
      return null;
    }
    const prefix = src.substring(0, index);
    const postfix = src.substring(index, src.length);
    return `${prefix}.${width}w${postfix}`;
  };
})
```

이 구현을 사용하여 AMP Optimizer는 다음 `amp-img` 선언을 변환합니다.

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                             image-2x.png 2x"
></amp-img>
```

변환된 코드는 다음과 같습니다.

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
  srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                               image-2x.png 2x"
></amp-img>
```

팁: `layout=responsive` 사용 시에는 최소 이미지 크기를 지정하는 데 `width` 및 `height` 속성을 사용합니다. 예를 들어 모바일에서 히어로 이미지를 풀 블리드로 표시하려면 `width=320`이 필요합니다.
