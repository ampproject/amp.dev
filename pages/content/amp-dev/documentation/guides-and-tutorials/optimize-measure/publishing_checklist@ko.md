---
$title: AMP 문서 발행 체크리스트
$order: 0
$path: /publishing_checklist/
---

웹페이지가 AMP의 모든 이점을 누리고 있는지 확인하려면 이 체크리스트를 따르십시오. AMP는 웹 상에서 건강하고 접근가능하게 제공해야 합니다.


# AMP 스펙 검증하기

AMP는 AMP 캐시에서 컨텐츠를 미리 로드하는 것으로 로드 시간을 줄이는 것 등의 수많은 이점이 있습니다. 그러나, 유효한 AMP로 확인된 문서만 이러한 이점을 얻을 수 있습니다. 만약 치명적인 AMP 오류가 있는 페이지를 게시한다면, 페이지는 AMP 캐시에 인덱싱되지 않거나 오류 페이지가 제공될 수 있습니다.

AMP 페이지 검증에 사용할 수 있는 툴에 대해 더 알아봅시다:



*   [AMP 페이지 검증하기](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
*   [AMP 유효성 검사기](https://validator.ampproject.org/)
*   [Google AMP 테스터](https://search.google.com/test/amp)
*   [AMP 도구모음](../../../documentation/tools.html?format=websites) 


# 캐시된 AMP 문서의 서버 액세스 권한 부여

유효한 AMP 페이지는 자동으로 AMP 캐시로 보관되며, 이는 큰 이점을 가집니다. 당신의 페이지는 자동으로 효율적이고 안전하게 프리로드 됩니다. 또한 컨텐츠가 사용자에 이득이 되도록 성능 최적화가 가능하게 됩니다. 그러나, AMP 캐시에서 제공되는 문서는 당신 소유와 일치하지 않는 도메인에서 제공됩니다. 이것은 동적인 AMP 컴포넌트를 사용할 때 CORS(Cross-Origin Resource Sharing) 이슈가 발생할 수 있습니다.
[`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) 또는 [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites)와 같은 이슈로, 당신의 사이트가 데이터 액세스하지 못할 수 있습니다. 이는 특정 컨텐츠나 전체가 로드되지 않을 수 있습니다. 모든 사용자에게 의도한 데로 페이지를 동작시키기 위해 모든 AMP 캐시로부터의 CORS 요청을 활성화 하는 것은 중요합니다.

서버 데이터에 액세스하는 것에 대해 더 알아봅시다:



*   [AMP 페이지가 캐시되는 방법](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
*   [AMP에서의 CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
*   [AMP CORS 라이브러리](https://www.npmjs.com/package/amp-toolbox-cors)


# 캐시된 페이지 테스트
AMP 캐시는 유효한 AMP 페이지를 저장하고 지속적으로 빠른 액세스를 제공합니다. 캐시는 문서 외에 이미지와 폰트를 저장합니다. 따라서 AMP 캐시를 통해 로드될때 AMP가 정상적으로 동작하는지 테스트하는 것은 중요합니다.


AMP 캐시에서 AMP 페이지를 로드할 때, 아래의 모든 사항을 포함하여 모든 외부 리소스가 성공적으로 로드되는지 [브라우저의 개발자 도구](https://developers.google.com/web/tools/chrome-devtools/)를 통해 확인하십시오. 

* 이미지
* 비디오
* amp-analytics endpoints
* amp-pixel endpoints
* 커스텀 폰트
* iframes

AMP 캐시에 대해 더 알아봅시다:

*   [Google AMP 캐시 사용하기](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
*   [Google의 AMP, Google AMP 캐시](https://developers.google.com/amp/cache/overview)]
*   [AMP 캐시 이슈 디버깅](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
*   [AMP 캐시 URL 포멧과 요청 핸들러](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# 검색가능한 canonical 설정하기

AMP만을 단독으로 혹은 쌍으로 된 AMP 접근을 사용하든, AMP 페이지는 사용자가 검색할 수 있어야 합니다. AMP가 아닌 페이지와 쌍으로 된 AMP 페이지는 <head> 태그 안에서 서로 링크할 필요가 있습니다. 만약 AMP 페이지 하나만을 사용하면, 그 스스로를 링크할 필요가 있습니다. 또한, [Schema.org](https://schema.org/) 메타데이터는 다른 사이트나 검색 엔진에서 컨텐츠를 공유하는데 필요한 유용한 정보를 추가합니다.

웹 로봇(웹 원더러, 크롤러, 스파이더로도 알려진)은 웹을 자동으로 탐색하는 프로그램입니다. 이것들은 검색엔진이 웹 컨텐츠를 색인하는 것을 돕는 것과 같이 많은 쓰임새가 있습니다. 사이트의 `robots.txt` 파일에 따라야 할 적절한 지침을 넣거나 적절한 헤더를 설정하십시오.

당신의 [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en) 파일에서 크롤러를 제외하지 마십시오.

```
User-agent: *
Disallow: /amp/                            <= 하지 마세요!
```

AMP HTML 파일에 로봇 `noindex` 메타 테그를 추가하지 마십시오.
```
<meta name="robots" content="noindex" />   <= 하지 마세요!
```

AMP 파일의 X-Robots-Tag HTTP 헤더에 `noindex`를 포함하지 마십시오.
```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= 하지 마세요!
(…)
```

당신의 페이지를 검색가능하게 만드는 방법을 배워봅시다:



*   [당신의 페이지를 검색가능하게 만들기](discovery.md?format=websites)
*   [Robots.txt](http://www.robotstxt.org/)
*   [로봇 메타 태그 및 X-Robots-Tag HTTP 헤더 사양](https://developers.google.com/search/reference/robots_meta_tag)
*   [AMP Indexing FAQs](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)


# 사용자 트래픽 및 이동 경로 측정하기

AMP를 당신의 웹사이트에 도입하는 것이 사용자에게 어떤 영향을 미치는지 테스트하는데 관심이 있다면, 올바로 측정하기 위한 테스트를 설정했는지 확인하십시오. 측정결과에서 분석이 AMP가 만들어내는 차이를 설명하지 못한다면 잘못된 결과(부정적인, 긍정적인 또는 관련된 결과)를 보여주는것일 수도 있습니다.

AMP를 위한 적절한 분석을 설명하는 것에 대해 더 알아봅시다:



*   [그래서 AMP 테스트가 제대로 동작하지 않습니다 - 이제 무엇을 해야죠?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
*   [캐시 vs. 논-캐시 분석](https://support.google.com/analytics/answer/6343176?hl=en#cache)
*   [AMP 캐시와 당신의 웹사이트 걸친 사용자 이동경로 측정하기](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)

 
