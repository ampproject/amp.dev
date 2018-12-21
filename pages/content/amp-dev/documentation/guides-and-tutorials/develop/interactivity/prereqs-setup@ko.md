---
$title: 설정
---

[TOC]

## 기본 요건

이 가이드를 시작하기에 앞서 다음이 필요합니다.

- HTML, CSS, 자바스크립트 기본 지식
- 원하는 브라우저
- 원하는 텍스트 편집기
- 기기에 설치된 [Node.js 및 NPM](https://docs.npmjs.com/getting-started/installing-node)

## 개발 환경 설정

### 1단계: 코드 다운로드

가이드의 시작 코드를 [ZIP 파일](https://github.com/googlecodelabs/advanced-interactivity-in-amp/archive/master.zip)로 다운로드하거나 다음의 git를 통해 다운로드합니다.

```shell
git clone https://github.com/googlecodelabs/advanced-interactivity-in-amp.git
```

### 2단계: 종속성 설치

필요한 경우 압축 파일을 풀고 디렉토리로 이동합니다. `npm install`을 실행하여 종속성을 설치합니다.

```shell
cd advanced-interactivity-in-amp
npm install
```


## 3단계: 개발 서버 실행

다음과 같이 node.js로 개발 서버를 시작합니다.

```shell
node app.js
```

그런 다음 웹브라우저에서 <a href="http://localhost:3000">http://localhost:3000</a>으로 이동하여 AMP 페이지가 실행되는지 확인합니다.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/get-familiar.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
