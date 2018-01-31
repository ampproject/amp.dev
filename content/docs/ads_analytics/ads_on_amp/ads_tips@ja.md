---
$title: AMP ページの広告に関するヒント
$order: 1
---

###  配置とコントロール:<br /> 広告のプレースメントを最適化する

- **AMP ページに別個の広告ユニットを作成** して、ターゲティング、レポート作成、コントロールを行う
- **AMP ページに非 AMP ページと同じ数の広告を配置** して、ページごとの収益を最大限に増やす
- **1 つ目の広告を 1 つ目のビューポートのすぐ下に配置** して (「スクロールしなければ見えない位置」にして)、ユーザー エクスペリエンスを最適化する
-  高度な CSS やメディアクエリを使用する場合を除き、**広告ユニットをページの中央に配置する** ことで、最適なモバイルウェブ エクスペリエンスをユーザーに提供する
- **さまざまなサイズの広告リクエストを AMP の広告枠で有効にする<a href="https://github.com/ampproject/amphtml/tree/master/ads#support-for-multi-size-ad-requests">ことにより</a>**、広告オークションを促進して収益を増やす

###  需要と料金設定:<br /> 広告について適切な料金を定める

- **AMP ページの広告ユニットをあらゆる販売チャネルで販売** して（直接および間接の販売チャネルを含む）、AMP ページの広告枠に対する競合を最大限に増やす
- **AMP ページの広告枠の料金設定** を非 AMP ページの広告枠と同様にして、掲載結果を監視し、その結果に応じて料金設定を調整する
- **AMP ページの広告枠に対して広告の需要チャネルをすべて競い合わせ**、競合をさらに促進する

###  広告のタイプ:<br /> 最適なタイプの広告を配信する

- **重いクリエイティブを使用しない** (<a href="http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf">IAB のガイドライン</a>を参考にする）
- **インタースティシャルを使用しない** ようにし、広告の読み込み時にコンテンツのリフローを引き起こす他の広告フォーマットも避ける
- **視認性を最適化** するために次のパラメータを設定する<br />
   <em>data-loading-strategy = prefer-viewability-over-views</em>
- **動画コンテンツに広告を配置** ([サポートされているプレーヤー](https://www.ampproject.org/docs/reference/components#media) または[「amp-iframe」](https://ampbyexample.com/components/amp-iframe/)を使用) して、あらゆるタイプのコンテンツで収益を得られるようにする
- **ネイティブ広告を導入** し、さまざまなサイズの広告リクエストを使ってディスプレイ広告と競い合わせて、需要をさらに増やすとともに、サイトで最適なユーザー エクスペリエンスを実現させる

###  新たな工夫:<br /> 最もユーザーを引き付ける広告プロダクトを提供する

- **AMP の補助的なページに広告を導入** して、収益を増やす
   - [AMP の画像カルーセルに広告を追加する](https://github.com/jasti/amp-ads-testing/blob/master/dfp-amp-testing/amp_tests/amp-carousel-demo.html)
   - [AMP のライトボックスに広告を追加する](https://github.com/jasti/amp-ads-testing/blob/master/dfp-amp-testing/amp_tests/amp-lightbox-demo.html)
- **直接販売の広告に新しいフォーマットを取り入れ** て、インパクトの強い革新的な広告プロダクトを販売できるようにする
   - [追尾広告](https://ampbyexample.com/components/amp-sticky-ad/)
   - [フライング カーペット](https://ampbyexample.com/components/amp-fx-flying-carpet/)
