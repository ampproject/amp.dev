---
$title: 라이브 블로그 만들기
---

[TOC]

라이브 블로그는 슈퍼 볼같이, 진행 중인 이벤트에서 자주 업데이트 되는 웹사이트입니다.

LiveBlogPosting 마크업을 이용한 `amp-live-list` 컴포넌트를 통해 AMP로 라이브 블로그를 구현할 수 있습니다.
스타팅 포인트로 할만한 샘플 구현을 보고싶다면, [ampbyexample.com](https://www.ampbyexample.com)의[live blog sample](https://www.ampbyexample.com/samples_templates/live_blog/)를 살펴보길 바랍니다. 

이 튜토리얼은 `amp-live-list` 컴포넌트에 대한 간략한 개요와 라이브 블로그 샘플을 예제로 페이지네이션이나 딥링크와 같은 몇가지 상세한 구현 사항들을 살펴보는데 중점을 둡니다.

## Amp-live-list 개요

`amp-live-list` 컴포넌트는 정기적으로 호스트 문서를 폴링하여 업데이트 된 콘텐츠를 확인하고 사용 가능한 새 아이템이 있다면 유저의 브라우저를 업데이트합니다.
즉, 새 블로그 포스트를 추가할 때마다, CMS에서 본문 및 메타데이터 섹션을 업데이트하여 호스트 문서를 업데이트해야합니다.

다음은 기본적인 블로그의 모습입니다:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates!</button>
  <div items></div>
</amp-live-list>
[/sourcecode]

`data-poll-interval` 속성으로 폴링 발생 빈도를 정할 수 있습니다; 만약 호스트 문서가 업데이트되면 다음 시간 인터벌 후에 사용자가 업데이트된 걸 사용할 수 있어야합니다.
호스트 문서에 새 아이템이 추가될 때마다, `<button update on="tap:my-live-list.update">` 요소가 버튼으로 보이고, 버튼을 클릭하면 최신 포스트를 보여주는 트리거가 페이지에 걸립니다.

라이브 블로그가 페이지를 너무 길게 만든다면, `data-max-items-per-page` 속성으로 라이브 블로그 페이지에 얼마나 많은 아이템을 가져올 지 정할 수 있습니다.
만약 아이템의 갯수가 `data-max-items-per-page`를 넘어선다면, 숫자를 초과하는 가장 오래된 업데이트가 삭제됩니다.
예를 들어, 현재 페이지에 9개 아이템이 있고, `data-max-items-per-page`가 10개로 세트되었을 때, 3개의 새로운 아이템이 추가되었다면, 최신 업데이트와 함께 페이지에서 2개의 가장 오래된 아이템은 삭제됩니다.

`amp-live-list`는 포스트가 `<div items></div>` 태그의 자식이어야합니다. 각 게시물을 아이템으로 참조하면, 각 아이템에 유니크한 `id`와 `data-sort-time`을 가지고 있어야합니다.

## 라이브 블로그의 세부 구현

이제 `amp-live-list` 컴포넌트에 익숙해졌으니, 더 복잡한 라이브 블로그를 구현하는 방법을 알아봅시다. 여기서는 페이지네이션을 어떻게 구현할 지, 딥링크가 어떻게 동작하는 지 배울 수 있습니다.

## 페이지네이션

긴 블로그에서 성능을 향상시키기 위해 페이지에 표시할 블로그 아이템의 수를 제한하고 페이지네이션을 사용할 수 있습니다.
페이지네이션을 구현하려면, `<div pagination></div>` 요소를 `amp-live-list` 컴포넌트에 넣고, 페이지네이션을 위해 필요한 아무 마크업이나 넣으면 됩니다. (페이지 넘버나, 이전 or 다음 페이지로 가는 링크같은 것들)

페이지네이션을 사용할 때, 위에서 본 간단한 코드를 사용해보겠습니다:

[sourcecode:html]
<amp-live-list id="my-live-list" data-poll-interval="15000" data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">You have updates!</button>
  <div items></div>
  <div pagination>
  	<nav>
      <ul>
        <li>1</li>
        <li>Next</li>
      </ul>
    </nav>
   </div>
</amp-live-list>
[/sourcecode]

호스팅 페이지를 업데이트 하여 네비게이션 아이템을 채우는 건 당신의 몫입니다.
예를 들어, [live blog sample](https://www.ampbyexample.com/samples_templates/live_blog/)에서는 서버사이드 템플릿을 이용해 페이지를 렌더링하고, 쿼리 파라미터를 이용하여 페이지의 첫번째 블로그 아이템을 지정했습니다.
우리는 페이지를 5개 아이템으로 제한하였고, 서버가 5개 이상의 아이템을 생성하는 경우, 유저가 기본페이지에 도착하면 네비게이션 영역에 Next 요소가 보입니다.

<amp-img src="/static/img/liveblog-pagination.png" alt="Live blog pagination" height="526" width="300"></amp-img>

블로그 포스트의 사이즈가 `data-max-items-per-page`로 정의한 최대 갯수를 넘은 경우.
더 오래된 블로그 아이템은 2번째 페이지 같은 "Next" 페이지에서 보여집니다.
`amp-live-list`는 주기적으로 서버를 폴링하여 아이템에 변경이 있는 지 확인하므로, 사용자가 첫번째 페이지에 있지 않다면 서버를 폴링할 필요가 없습니다.

폴링 메커니즘을 방지하기 위해 호스트 페이지에 disabled 속성을 추가할 수 있습니다.
라이브 블로그 샘플에서는 서버사이드 플랫폼에서 이 동작을 수행합니다.
요청한 페이지가 첫번쨰 페이지가 아닌 경우, `amp-live-list` 컴포넌트에 disabled 속성을 추가합니다.

## 딥링크

블로그 포스트를 발행할 때, 공유 같은 기능을 사용하려면 포스트에 딥 링크할 수 있어야합니다.
`amp-live-list`를 사용하면 블로그 아이템의 id를 이용하여 간단하게 딥링크할 수 있습니다.
예를 들어, [https://ampbyexample.com/samples_templates/live_blog/preview/#post3](https://ampbyexample.com/samples_templates/live_blog/preview/#post3)는 "post3" id를 가진 블로그 포스트로 연결하여 바로 그 포스트로 이동합니다.

[라이브 블로그 샘플](https://www.ampbyexample.com/samples_templates/live_blog/)에서는 쿠키를 기반으로 한 테크닉을 사용하여 새로운 콘텐츠를 생성합니다. (자세한 내용은 라이브 블로그 샘플 섹션의 추가 정보 참고)
페이지에 최초로 방문했을 때, "post3"란 id를 가진 포스트를 사용할 수 없으면 첫번째 게시물로 리디렉트합니다.
