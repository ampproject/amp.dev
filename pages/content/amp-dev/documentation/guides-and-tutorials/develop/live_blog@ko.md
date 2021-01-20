---
"$title": 라이브 블로그 만들기
"$order": '102'
description: '라이브 블로그는 스포츠 행사나 선거 같은 이벤트가 진행되는 동안 수시로 업데이트되는 웹페이지입니다. AMP에서는 '
tutorial: 'true'
formats:
- 웹사이트
author: kul3r4
contributors:
- bpaduch
---

라이브 블로그는 스포츠 행사나 선거 같은 이벤트가 진행되는 동안 수시로 업데이트되는 웹페이지입니다. AMP에서는 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 구성요소를 사용하여 라이브 블로그를 구현할 수 있습니다.

이 가이드에서는 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 구성요소를 간단히 설명하고 [페이지 매기기](#pagination) 및 [딥 링크](#deeplinking)와 같은 몇 가지 라이브 블로그용 구현 세부정보에 중점을 둡니다. AMP By Example의 [라이브 블로그 샘플](live_blog.md)을 사용하여 AMP에서 라이브 블로그를 구현하는 방법을 설명합니다.

블로그가 제3자 플랫폼 기능과 통합될 수 있도록 [LiveBlogPosting](http://schema.org/LiveBlogPosting) 메타데이터 마크업을 사용하세요.

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample.png', 700, 1441, align='right third') }}

## amp-live-list 개요

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 구성요소는 새 콘텐츠의 호스트 문서를 주기적으로 폴링하고, 새 항목을 사용할 수 있게 되면 사용자의 브라우저를 업데이트합니다. 즉, 새 블로그 게시물을 추가해야 할 때마다 CMS로 호스트 문서를 업데이트하여 페이지 본문과 [메타데이터](../../../documentation/examples/documentation/Live_Blog.html#metadata) 섹션에 업데이트를 포함해야 합니다.

블로그의 초기 코드는 다음과 같습니다.

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">업데이트가 있습니다</button>
  <div items></div>
</amp-live-list>
```

초기 코드를 살펴보겠습니다.

각 [ ` amp-live-list {/ code1} {/ a0} 구성 요소에는 한 페이지에 둘 이상의 ID가있을 수 있으므로 고유 한 ID가 필요합니다. 이 예에서는 ` my-live-list {/ code2}를 고유 ID로 지정했습니다.``](../../../documentation/components/reference/amp-live-list.md)

` data-poll-interval {/ code0} 속성은 폴링 빈도를 지정합니다. 호스트 문서가 업데이트되면 다음 시간 간격 후에 사용자가 업데이트를 사용할 수 있어야합니다.`

호스트 문서에 새로운 항목이 추가될 때마다 `<button update on="tap:my-live-list.update">` 요소가 '업데이트가 있습니다' 버튼을 표시하고, 이 버튼을 클릭하면 최신 게시물이 표시되는 페이지가 실행됩니다.

라이브 블로그가 성장해 감에 따라 페이지 길이가 너무 길어질 수 있습니다. `data-max-items-per-page` 속성을 사용하여 라이브 블로그에 추가될 수 있는 항목의 수를 지정하세요. 업데이트 이후 항목 수가 `data-max-items-per-page`를 초과하면 항목 수를 초과하는 가장 오래된 업데이트 순으로 삭제됩니다. 예를 들어 페이지에 있는 항목이 9개이고 `data-max-items-per-page`가 10으로 설정되어 있는데 새 항목 3개가 최신 업데이트에 추가되면 최신 업데이트가 있는 페이지에서 가장 오래된 항목 2개가 삭제됩니다.

[`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)  모든 블로그 게시물은 `<div items></div>`의 하위 항목이어야 합니다. 각 게시물을 항목으로 참조하면 모든 항목에는 고유 `id`와 `data-sort-time`이 있어야 합니다.

## 구현 세부정보

이제 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 구성요소에 익숙해졌으므로 더 복잡한 라이브 블로그를 구현하는 방법을 알아보겠습니다. 페이지 매기기 구현 방법 및 딥 링크 작동 방식을 읽어 보세요.

### 페이지 매기기 <a name="pagination"></a>

긴 블로그는 페이지 매기기를 사용하여 페이지에 표시할 블로그 항목의 수를 제한함으로써 성능을 개선할 수 있습니다. 페이지 매기기를 구현하려면 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 구성요소에 `<div pagination></div>`를 추가한 다음 페이지 매기기에 필요한 마크업(예: 페이지 번호, 다음 및 이전 페이지 링크)을 삽입합니다.

페이지 매기기를 사용하면 앞에서 사용했던 단순한 코드가 다음과 같이 변합니다.

```html
<amp-live-list id="my-live-list"
    data-poll-interval="15000"
    data-max-items-per-page="5">
  <button update on="tap:my-live-list.update">업데이트가 있습니다</button>
  <div items></div>
  <div pagination>
    <nav>
      <ul>
        <li>1</li>
        <li>다음</li>
      </ul>
     </nav>
   </div>
</amp-live-list>
```

{{ image('/static/img/docs/tutorials/amp-live-list-ampbyexample_pg2.png', 700, 1441, align='right third') }}

호스팅된 페이지를 업데이트하여 탐색 항목을 올바르게 게재해야 합니다. 예를 들어 [라이브 블로그 샘플],[`amp-live-list`](live_blog.md).url.path}})을 참조하세요.

블로그 게시물의 크기가 `data-max-items-per-page`로 지정한 최대 항목 수를 초과했다면 오래된 블로그 항목은 2페이지와 같이 '다음' 페이지에 표시됩니다. [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)가 주기적으로 서버를 폴링하여 항목이 변경되지 않았는지 확인하므로 사용자가 첫 번째 페이지에 있지 않으면 서버를 폴링하지 않아도 됩니다.

호스팅된 페이지에 사용 중지된 속성을 추가하여 폴링 메커니즘을 방지할 수 있습니다. 라이브 블로그 샘플에서는 서버 측 템플릿으로 속성 추가 동작을 실행했습니다. 요청된 페이지가 첫 번째 페이지가 아니면 [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 구성요소에 사용 중지됨 속성을 추가합니다.

### 딥 링크 <a name="deeplinking"></a>

블로그 게시물을 게시하면 게시물로 딥 링크를 실행하여 공유 같은 기능을 사용할 수 있어야 합니다. [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)를 사용하면 블로그 항목의 `id`를 사용하여 딥 링크를 실행할 수 있습니다. 예를 들어 [https://amp.dev/documentation/examples/news-publishing/live_blog/preview/index.html#post3](../../../documentation/examples/previews/Live_Blog.html#post3)를 통해 ID가 `post3`인 블로그 게시물로 바로 이동할 수 있습니다.

AMP By Example에서는 [라이브 블로그 샘플](https://www.ampbyexample.com/samples_templates/live_blog/)에서 쿠키를 사용하여 새 콘텐츠를 생성하므로 페이지에 처음 방문한 경우 ID가 'post3'인 게시물은 사용하지 못할 수 있으며, 이 경우 첫 번째 게시물로 리디렉션됩니다.

## 리소스

다음 리소스에서 자세히 알아보세요.

- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md) 참조 문서
- [`amp-live-list`](../../../documentation/components/reference/amp-live-list.md)
- [AMP BY Example's Live blog sample](live_blog.md)
