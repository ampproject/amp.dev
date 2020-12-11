---
$title: AMP 페이지 환경 가이드
staticText:
  inputBar:
    headline: AMP 페이지 분석
    fieldPlaceholder: URL 입력
    button: 분석
  infoDialog:
    open: 알아보기
    close: 닫기
  scrollToTop: 상단으로 스크롤
  shareDialog:
    headline: URL 복사 & 붙여넣기
    close: 탐색 닫기
    copyToClipboard: 클립보드에 복사
    success: 성공
  statusIntro:
    headline: 잠시 기다려주세요
    headline2: 현재 페이지를 분석 중입니다
    loadingCopy: 총 ${totalChecks}개 중 ${finishedChecks}개의 검사가 완료되었습니다
    buttonShare: 공유
    buttonInvestigate: 검사
  coreWebVitals:
    headline: 핵심 웹 Vitals
    tabsAriaLabel: 필드 및 실험 데이터 탭
    fieldData: 필드 데이터
    labData: 실험 데이터
    fieldDataExplainer: 이 데이터는 연속 28일 동안 매일 업데이트됩니다.
    labDataExplainer: 이 데이터는 합성 시험의 값이며 페이지 경험에 영향을 미치지 않습니다.
    loadingSpeed: 로딩 속도
    interactivity: 상호작용
    visualStability: 시각적 안정성
    pageLoads: 페이지 로드
    thresholdMarker: 75번째 백분위수
    resultLabels:
      scorePercentile: 75번째 백분위수에 해당
      score: 점수
      opportunity: 개선 기회
      pagesPassing: 페이지 전달
      action: 조치 취하기
  additionalChecks:
    headline: 추가 검사
    safeBrowsing: Safe Browsing
    https: HTTPS
    mobileFriendliness: 모바일 친화성
    intrusiveInterstitials: 틈입형 광고
    checkManually: 수동 검사
  recommendations:
    headline: 조치 취하기. AMP 사이트 개선.
    nextAdvice: 다음 팁
  tags:
    all: 모두
scriptText:
  inputBar:
    fieldError: 유효한 URL을 입력하십시오
  status:
    analyzing: 분석 중
    calculating: 계산 중
    error: 분석 실패
    failed: 실패
    passed: 통과
    passedAddition: 통과
    none: 없음
    nothingToDo: 필요한 조치가 없습니다! &#x1F389;
    fileAnIssue: AMP로 이슈 보고하기
    recommendation: 추천
    recommendations: 추천
  buttonFixIt: 지금 수정
  buttonMakeImprovements: 개선
  detailsHeadlineImages: 고려할 이미지
  detailsHeadlineOther: 영향을 미치는 리소스
  thumbnail: 썸네일
  categories:
    fast: 적합
    average: 개선 필요
    slow: 부적합
  tags:
    lcp: LCP
    fid: FID 및 TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: 모바일 친화성
    safeBrowsing: Safe Browsing
    intrusiveInterstitials: 틈입형 광고
---

AMP 환경 가이드는 Google 검색 페이지 환경의 순위 결정 시그널에 있어 AMP 페이지가 작동하는 방식을 AMP 개발자에게 알려주며 개선 방식에 대한 실행 가능한 피드백을 제공하는 도구입니다. 실행 가능한 인사이트를 제공할 수 없는 경우 기타 프롬프트를 활용하여 [GitHub 이슈로 보고](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue)해 주세요. 저희 팀에서 확인 후 AMP 페이지 개선 방식을 이해하는 데 도움을 드립니다. 공개적으로 제공되는 [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=ko), [Safe Browsing](https://search.google.com/test/mobile-friendly?hl=ko) 및 [모바일 친화성 테스트](https://search.google.com/test/mobile-friendly?hl=ko) 등의 API가 사용됩니다.
