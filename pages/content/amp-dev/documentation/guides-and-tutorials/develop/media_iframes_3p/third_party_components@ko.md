---
$title: Include third-party content
$order: 9
description: '페이지에서 써드 파티 컴포넌트를 가져오는 법에 대해서 다룹니다 ...'
formats:
    - websites
components:
  - iframe
  - facebook
author: Meggin
contributors:
  - pbakaus
  - bpaduch
---

페이지에서 써드 파티 컴포넌트를 가져오는 법에 대해서 다룹니다.

## 트윗 가져오기

페이지에 트위터 트윗을 가져올 때 [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) 요소를 사용합니다.

트위터를 페이지에 추가하고자 할 때, `<head>` 요소 안에 아래 스크립트를 먼저 가져와야 합니다.

[sourcecode:html]
<script async custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

현재 트윗은 자동으로 제공된 사이즈에 비례하여 크기가 조정되지만, 원하는 크기에 미치지 않을 수도 있습니다. 수동으로 width와 height를 제공하여 조정하거나, 스크린 width에 기반한 해상도를 선택하는 media 속성을 사용할 수 있습니다.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

도움말: [AMP By Example],[`amp-twitter`](../../../../documentation/examples/documentation/amp-twitter.html).url.path}}) 예시를 확인하세요.

## 인스타그램 가져오기

페이지에 인스타그램을 가져올 때 [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) 요소를 사용합니다.

인스타그램을 페이지에 추가하고자 할 때, `<head>` 요소 안에 아래 스크립트를 먼저 가져와야 합니다.

[sourcecode:html]
<script async custom-element="amp-instagram"
  src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

인스타그램 사진 URL을 찾기 위해 인스타그램 data-shortcode를 추가해야합니다. 예를 들어, `https://instagram.com/p/fBwFP`에서 `fBwFP`가  data-shortcode 입니다. 또한 인스타그램은 반응형 레이아웃을 위한 고정 해상도를 사용하기 때문에, width와 height 값은 전역으로 사용해야합니다.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

도움말: [AMP By Example],[`amp-instagram`](../../../../documentation/examples/documentation/amp-instagram.html).url.path}}) 예시를 확인하세요.

## 페이스북 포스트나 비디오 보여주기

페이지에서 페이스북 포스트나 비디오를 보여줄 때는 [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) 요소를 사용합니다.

아래 스크립트를 `<head>` 안에 추가해야합니다:

[sourcecode:html]
<script async custom-element="amp-facebook"
  src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### 예시 - 포스트 가져오기

출처:

```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```

시사: <amp-facebook width="486" height="657" layout="responsive" data-href="https://www.facebook.com/zuck/posts/10102593740125791"> </amp-facebook>

##### 예시 - 비디오 가져오기

출처:

```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```

시사: <amp-facebook width="476" height="316" layout="responsive" data-embed-as="video" data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"> </amp-facebook>

도움말: [AMP By Example],[`amp-facebook`](../../../../documentation/examples/documentation/amp-facebook.html).url.path}}) 예시를 확인하세요.

## 유튜브 비디오 가져오기

페이지에 유튜브 비디오를 가져올 때는 [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 요소를 사용합니다

아래 스크립트를 `<head>` 안에 추가해야합니다:

[sourcecode:html]
<script async custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

유튜브 `data-videoid` 속성은 유튜브 비디오 페이지 URL을 찾게 해줍니다. 예를 들어, https://www.youtube.com/watch?v=Z1q71gFeRqM 에서 Z1q71gFeRqM가 video id입니다.

16:9 해상도 비디오의 정확한 레이아웃을 위해 `layout="responsive"`를 사용하길 바랍니다:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

도움말: [AMP By Example],[`amp-youtube`](../../../../documentation/examples/documentation/amp-youtube.html).url.path}}) 예시를 확인하세요.

## 광고 보여주기

페이지에서 광고를 보여줄 때는 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 요소를 사용합니다. HTTPS로 제공한 광고만 지원합니다.

AMP 문서 내에서 자바스크립트로 제공하는 광고 네트워크는 허용하지 않습니다. 대신해 AMP 런타임은 다른 오리진(iframe sandbox)으로부터 iframe을 불러오며 해당 iframe sandbox 내에서 광고 네트워크 JS를 실행합니다.

광고에 반드시 width, height, 광고 네트워크 타입을 정의해야합니다. `type` 식별자는 광고 네트워크의 템플릿입니다. 다른 광고 타입은 다른 `data-*` 속성을 필요로 합니다.

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

만약 광고 네트워크가 지원한다면, `placeholder`를 넣어서 광고가 불가한 경우에 보여줄 수 있습니다:

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

AMP는 광범위한 광고 네트워크를 지원합니다. [reference for a full list](../../../../documentation/components/reference/amp-ad.md#supported-ad-networks)를 참고하시길 바랍니다.

읽어보기: [AMP에 광고 게재](../../../../documentation/guides-and-tutorials/develop/monetization/index.md) 가이드에서 광고에 관해 자세히 알아보세요.
