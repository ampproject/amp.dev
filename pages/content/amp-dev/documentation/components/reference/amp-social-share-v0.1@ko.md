---
$title: amp-social-share
$category@: ads-analytics
formats:
  - websites
teaser:
  text: 공유 추적 기능을 개발 중입니다.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



소셜 공유 버튼을 표시합니다.


<table>
  <tr>
    <td class="col-fourty"><strong>필수 스크립트</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-social-share/">amp-social-share 예</a>를 참조하세요.</td>
  </tr>
</table>

## 개요 <a name="overview"></a>

`amp-social-share` 구성요소는 다양한 소셜 플랫폼 제공자의 소셜 공유 버튼을 표시합니다.

## 예 <a name="examples"></a>

**예: 기본 소셜 공유 버튼**

공유 버튼은 사전 구성된 일부 제공자의 기본 설정을 추측합니다. 공유 버튼에서 현재 문서의 표준 URL은 공유하려는 URL이며, 페이지 제목은 공유하려는 텍스트라고 가정합니다.

```html
<amp-social-share type="twitter"></amp-social-share>
```

**예: 매개변수 전달**

공유 엔드포인트로 매개변수를 전달하려면 공유 엔드포인트에 추가될 `data-param-<attribute>`를 지정하면 됩니다.
```html
<amp-social-share type="linkedin" width="60" height="44"
    data-param-text="Hello world"
    data-param-url="https://example.com/">
</amp-social-share>
```

Linkedin은 사전 구성된 제공자 중 하나이므로 `data-share-endpoint` 속성을 제공할 필요가 없습니다.

## 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type(필수)</strong></td>
    <td>제공자 유형을 선택합니다. 사전 구성된 제공자 및 구성되지 않은 제공자 모두에 필수입니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>타겟을 열 타겟을 지정합니다. iOS의 이메일/SMS에는 타겟이 <code>&#95;top</code>으로 설정되며, 이외의 모든 경우에 기본값은 <code>&#95;blank</code>입니다.
        이메일의 경우 이 재정의만을 사용하는 것이 좋습니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td>이 속성은 <strong>구성되지 않은 제공자에 필수</strong>입니다.
        <br>
          자주 사용되는 일부 제공자의 경우 사전 구성된 공유 엔드포인트가 있습니다. 자세한 내용은 <a href="#pre-configured-providers">사전 구성된 제공자</a> 섹션을 참조하세요. 구성되지 않은 제공자의 경우 공유 엔드포인트를 지정해야 합니다.</td>
        </tr>
        <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td><code>data-param-*</code> 접두사를 사용하는 모든 속성은 URL 매개변수로 전환되어 공유 엔드포인트로 전달됩니다.</td>
        </tr>
      </table>

## 사전 구성된 제공자 <a name="pre-configured-providers"></a>

`amp-social-share` 구성요소는 공유 엔드포인트와 일부 기본 매개변수를 알고 있는 [사전 구성된 일부 제공자](0.1/amp-social-share-config.js)를 제공합니다.

<table>
  <tr>
    <th class="col-twenty">제공자</th>
    <th class="col-twenty">유형</th>
    <th>매개변수</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">Web Share API</a>(OS 공유 대화상자 트리거)</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: 선택사항, 기본값: '현재 페이지 제목'</li>
        <li><code>data-mode</code>: 선택사항, <code>replace</code>로 설정하면 다른 모든 공유 옵션이 삭제됨</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>이메일</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>: 선택사항, 기본값: 현재 페이지 제목</li>
        <li><code>data-param-body</code>: 선택사항, 기본값: <code>rel=canonical</code> URL</li>
        <li><code>data-param-recipient</code>: 선택사항, 기본값: ''(빈 문자열)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>: <strong>필수</strong>, 기본값: 없음. 이 매개변수는 <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">Facebook 공유 대화상자</a>에 필수인 Facebook <code>app_id</code>입니다.</li>
        <li><code>data-param-href</code>: 선택사항, 기본값: <code>rel=canonical</code> URL</li>
        <li><code>data-param-quote</code>: 선택사항. 인용 또는 텍스트를 공유하는 데 사용할 수 있습니다.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: 선택사항, 기본값: <code>rel=canonical</code> URL</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>: 선택사항(설정하도록 권장됨), 기본값: 없음. Pinterest에서 공유되는 미디어의 URL입니다. 설정하지 않으면 Pinterest에서 최종 사용자에게 미디어 업로드를 요청합니다.</li>
        <li><code>data-param-url</code>: 선택사항, 기본값: <code>rel=canonical</code> URL</li>
        <li><code>data-param-description</code>: 선택사항, 기본값: 현재 페이지 제목</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Google+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: 선택사항, 기본값: <code>rel=canonical</code> URL</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: 선택사항, 기본값: <code>rel=canonical</code> URL</li>
        <li><code>data-param-text</code>: 선택사항, 기본값: 현재 페이지 제목</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: 선택사항, 기본값: <code>rel=canonical</code> URL</li>
        <li><code>data-param-text</code>: 선택사항, 기본값: 현재 페이지 제목</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Whatsapp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: 선택사항, 기본값: '현재 페이지 제목 - 현재 페이지 URL'</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: 선택사항, 기본값: <code>rel=canonical</code> URL</li>
        <li><code>data-param-text</code>: 선택사항, 기본값: 현재 페이지 제목</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SMS</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>: 선택사항, 기본값: <code>rel=title - rel=canonical</code> URL</li></ul>
      </td>
    </tr>
  </table>

## 구성되지 않은 제공자 <a name="non-configured-providers"></a>

사전 구성된 제공자 외에도 `amp-social-share` 구성요소에서 추가 속성을 지정하여 구성되지 않은 제공자를 사용할 수 있습니다.

**예: 구성되지 않은 제공자의 공유 버튼 만들기**

다음 예에서는 `data-share-endpoint` 속성을 Facebook Messenger 맞춤 프로토콜의 올바른 엔드포인트로 설정하여 Facebook Messenger를 통한 공유 버튼을 생성합니다.

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

이러한 제공자는 사전 구성되어 있지 않으므로 제공자에 적절한 버튼 이미지와 스타일을 생성해야 합니다.

## 스타일 <a name="styles"></a>

### 기본 스타일 <a name="default-styles"></a>

기본적으로 `amp-social-share`는 자주 사용되는 사전 구성된 제공자를 일부 포함합니다. 이러한 제공자의 버튼에는 제공자의 공식 색상과 로고로 스타일이 지정됩니다. 기본 너비는 60픽셀, 기본 높이는 44픽셀입니다.

[tip type="success"]
AMP 페이지에서 사용할 수 있으며 사전에 스타일이 지정된 반응형 공유 링크를 보려면 [AMP 시작](https://ampstart.com/components#links-and-sharing)을 방문하세요.
[/tip]

### 맞춤 스타일 <a name="custom-styles"></a>

가끔 나만의 스타일을 제공하고 싶을 수도 있습니다. 다음처럼 제공된 스타일을 간단히 재정의할 수 있습니다.
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## 대체 변수 <a name="variable-substitution"></a>

`<amp-social-share>` 요소에서 [전역 AMP 대체 변수](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md)를 사용할 수 있습니다. 아래 예에서 `TITLE`이 페이지 제목으로 대체되고 `CANONICAL_URL`이 문서의 표준 URL로 대체됩니다.

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사 도구 사양에서 [amp-social-share rules](https://github.com/ampproject/amphtml/blob/main/extensions/amp-social-share/validator-amp-social-share.protoascii)를 참조하세요.
