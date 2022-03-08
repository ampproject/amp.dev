---
"$title": AMP ページのエクスペリエンスガイド
staticText:
  inputBar:
    headline: AMP ページの解析
    fieldPlaceholder: URL を入力
    button: 解析
  infoDialog:
    open: 調査内容
    close: 閉じる
  scrollToTop: 上へスクロール
  shareDialog:
    headline: URL をコピー＆ペースト
    close: ナビゲーションを閉じる
    copyToClipboard: クリップボードにコピー
    success: 成功
  statusIntro:
    headline: しばらくお待ちください
    headline2: ページを解析中です
    loadingCopy: "${finishedChecks} / ${totalChecks} 個のチェックを完了"
    buttonShare: シェア
    buttonInvestigate: 調査
  coreWebVitals:
    headline: コアウェブバイタル
    tabsAriaLabel: フィールドとラボのデータタブ
    fieldData: フィールドデータ
    labData: ラボデータ
    fieldDataExplainer: このデータは 28 日のローリング期間中、毎日更新されました。
    labDataExplainer: このデータは合成テストから得るものであり、ページのエクスペリエンスには影響しません。
    loadingSpeed: 読み込み速度
    interactivity: インタラクティビティ
    visualStability: 視覚的安定性
    pageLoads: ページの読み込み
    thresholdMarker: 75 パーセンタイル
    resultLabels:
      scorePercentile: 75 パーセンタイルのスコア
      score: スコア
      opportunity: 改善できる項目
      pagesPassing: 通過訪問数
      action: 対応策
  additionalChecks:
    headline: その他のチェック
    
    https: HTTPS
    mobileFriendliness: モバイルフレンドリー
    intrusiveInterstitials: 侵入型インタースティシャル
    checkManually: 手動チェック
  recommendations:
    headline: 対応策を試してください。AMP サイトを改善できます
    nextAdvice: 次のアドバイス
  tags:
    all: すべて
scriptText:
  inputBar:
    fieldError: 有効な URL を入力してください
  status:
    analyzing: 解析中
    calculating: 計算中
    error: 解析フィールド
    failed: 不合格
    passed: 合格
    passedAddition: 合格
    none: なし
    nothingToDo: "対応は不要です！&#x1F389;"
    fileAnIssue: AMP の課題を提出
    recommendation: 推奨事項
    recommendations: 推奨事項
  buttonFixIt: 今すぐ修正
  buttonMakeImprovements: 改善する
  detailsHeadlineImages: 検討すべき画像
  detailsHeadlineOther: 影響のあるリソース
  thumbnail: サムネイル
  categories:
    fast: 良好
    average: 要改善
    slow: 不良
  tags:
    lcp: LCP
    fid: FID および TBT
    cls: CLS
    https: HTTPS
    mobileFriendliness: モバイル対応
    
    intrusiveInterstitials: 侵入型インタースティシャル
---

AMP ページのエクスペリエンスガイドは、AMP 開発者が Google 検索ページのエクスペリエンスランキングシグナルに対する AMP ページのパフォーマンスを計測できるツールです。フィードバックとして、解析結果に基づく対応策が提示されます。対応策が推奨されない場合は、表示されるプロンプトに従って [GitHub に課題を提出](https://github.com/ampproject/amphtml/issues/new?assignees=&labels=Type:+Page+experience&template=page-experience.md&title=Page+experience+issue)してください。AMP ページの改善方法について、チームがご相談を承ります。使用する API は、[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=ja)、[Mobile-friendliness Test](https://search.google.com/test/mobile-friendly?hl=ja) など、一般公開されている API です。
