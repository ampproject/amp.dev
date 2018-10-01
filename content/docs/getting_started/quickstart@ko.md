---
$title: 빠른 시작
---

[TOC]

{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

이 가이드는 AMP를 사용하기 위한 핵심 리소스를 제공합니다. 자세한 내용은 [AMP 문서](/ko/docs/) 또는 [YouTube 채널](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw)을 참조하세요. 

<hr>

## AMP 시작하기

AMP를 사용하려면 다음 세 단계를 따라가세요.

1.  [AMP 페이지 만들기](#create-your-amp-pages)
2.  [AMP 페이지 유효성 검사](#validate-and-test-amp-pages)
3.  [콘텐츠를 검색 가능하게 만들기](#make-your-content-discoverable)

## 매일 AMP 사용하기

AMP에서 제공하는 모든 리소스로 AMP의 추진력을 유지하세요.

<a class="button" href="#amp-day-to-day-resources">리소스 보기</a>

<hr>

### AMP 페이지 만들기

다음 [CMS 사용](#using-a-cms?), [처음부터 시작](#starting-from-scratch?), [기존 콘텐츠 변환](#converting-existing-content?) 섹션을 살펴보십시오.

#### CMS을 사용하고 계신가요?

AMP는 많은 타사 게시 플랫폼과의 통합을 지원합니다. AMP 페이지를 만드는 방법은 게시 플랫폼 문서를 참조하세요.

<div>
  {% for section in who.tech_companies.sections %}
    {% if section.title == 'CMS' %}
      <ul>
        {% for item in section.section_items %}
          <li class="item">
            {% if item.link %}
              <a href="{{item.link}}">{{item.title}}</a>
            {% else %}
              {{item.title}}
            {% endif %}
          </li>
        {% endfor %}
        </ul>
    {% endif %}
  {% endfor %}
</div>

#### 처음부터 새로 시작하나요?

AMP 페이지 또는 광고를 처음부터 새로 만들 경우 다음 리소스를 참조하세요.

*   [튜토리얼: 첫 번째 AMP 페이지 만들기](/ko/docs/tutorials/create.html)
*   [튜토리얼: 고급 AMP 기능 추가](/ko/docs/tutorials/add_advanced.html)
*   [AMP HTML 사양](/ko/docs/reference/spec.html#the-amp-html-format): *보일러플레이트, 필수 마크업, 허용되는 HTML 포함*
*   [AMP HTML 광고 포맷](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md): *AMP에서 성능 기준에 적합한 광고를 만드는 방법에 대한 설명*
*   [YouTube 동영상: AMP에서 허용되는 항목과 허용되지 않는 항목](https://youtu.be/Gv8A4CktajQ)
*   [AMP Start 템플릿](https://www.ampstart.com/): *미리 준비된 AMP 페이지 템플릿 제공*

#### 기존 콘텐츠를 변환하나요?

기존 HTML 페이지를 AMP HTML로 변환하려면 다음 리소스를 참조하세요.

*   [튜토리얼: HTML을 AMP로 변환](/ko/docs/tutorials/converting.html)
*   [YouTube 동영상: 기존 사이트에 AMP HTML 사용](https://youtu.be/OO9oKhs80aI)

### AMP 페이지 유효성 검사 및 테스트

콘텐츠를 게시하기 전에 AMP 페이지가 유효한지 확인하세요.  여기서 다음과 같은 리소스를 사용할 수 있습니다.

*   [AMP 페이지 유효성 검사](/ko/docs/guides/validate.html): *페이지 유효성 검사를 위한 유효성 검사 도구 목록과 안내 제공*
*   [YouTube 동영상: AMP 페이지 유효성 검사 및 디버그 방법](https://www.youtube.com/watch?v=npum8JsITQE&t=13s)
*   [AMP의 CORS 테스트](/ko/docs/guides/amp-cors-requests.html#testing-cors-in-amp)

### 콘텐츠를 검색 가능하게 만들기

사용자가 타사 플랫폼(예: Twitter, Google, Bing 등)에서 내 콘텐츠를 검색할 수 있는지 확인하세요. 다음은 몇 가지 유용한 리소스입니다.

*   [페이지를 검색 가능하게 만들기](/ko/docs/guides/discovery.html): *AMP 페이지를 연결하고 메타데이터를 사용하는 데 유용한 도움말*
*   [AMP 페이지에 대한 Google 검색 가이드라인](https://support.google.com/webmasters/answer/6340290)

<hr>

## AMP와 함께하는 일상에 도움이 되는 자료

다음은 AMP와 함께하는 일상에 도움이 될 만한 자료입니다.

*   [AMP 컴포넌트 목록](/ko/docs/reference/components.html)을 살펴보십시오. 각 컴포넌트의 레퍼런스에서는 AMP 페이지에서 컴포넌트를 통합하여 사용하는 방법에 대한 자세한 정보를 제공합니다.
*   예제와 데모가 필요한가요? [AMP By Example](https://ampbyexample.com/)을 방문하여 AMP 컴포넌트를 사용 가능한 플레이그라운드와 간단한 샘플을 제공합니다.
*   아이디어가 필요한가요?
    *   [AMP Start](https://www.ampstart.com/)에서 제공하는 스타일이 미리 지정된 템플릿과 컴포넌트를 활용하여 스타일이 지정된 AMP 사이트를 처음부터 새로 만들 수 있습니다.
    *   [Showcase](/learn/showcases/)에서 '현장에서' 주목해야 할 AMP 페이지를 강조 표시합니다.
*   도움이 필요한가요? [지원받기](/ko/support/developer/get_support.html) 리소스를 참조하세요.
*   다음을 통해 가장 최근의 AMP 뉴스로 최신 상태를 유지하세요.
    *   [블로그](https://amphtml.wordpress.com/) 구독
    *   [YouTube의 AMP 채널](https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw) 구독
    *   Twitter[@AMPhtml](https://twitter.com/amphtml) 팔로우
 
