---
'$title': AMP 상용구 코드
$order: 9
formats:
  - websites
  - stories
teaser:
  text: ' head > style[amp-boilerplate] 및 noscript > style[amp-boilerplate]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

## <code>head > style[amp-boilerplate]</code> 및 <code>noscript > style[amp-boilerplate]</code> <a></a>

AMP HTML 문서는 `head` 태그에 다음 상용구를 포함해야 합니다. 현재 일반 표현식의 유효성 검증이 완료되었으니 변형은 최소한으로 유지해야 합니다. 현재 허용되는 변형은 다음과 같습니다.

1. `style` 태그가 열리고 닫힌 직후에 임의의 공백을 삽입하는 것.
2. 아래 코드 조각의 모든 공간을 임의의 공백으로 교체하는 것.

<!-- prettier-ignore-start -->

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

<!-- prettier-ignore-end -->

[tip] [상용구 생성기](https://amp.dev/boilerplate)를 사용하여 AMP 페이지의 기본 스켈레톤을 빠르게 설정할 수 있습니다. 또한 PWA 등을 제작하는 데 필요한 구조적 데이터의 코드 조각도 제공합니다! [/tip]
