---
'$title': AMP for Email ベストプラクティス
$order: 1
'$category': Develop
formats:
  - email
---

AMP を使用すると、没入感を与える魅力的で刺激的な新しい種類のコンテンツをメールで実現することができます！メールをデザインする際は、すべてのプラットフォームで性能と信頼性に優れたメールを提供し、ユーザーの期待に応えられるよう、以下のベストプラクティスを考慮してください。

#Speed

コンテンツを動的にフェッチする [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) を使用する際は、コンポーネントの構造の整合性を保てるようにプレースホルダーを含めます。このプレースホルダーは、リクエストされたデータが返された後のドキュメントに、レイアウトの観点で可能な限り類似したものである必要があります。こうすることで、メッセージのサイズによってレイアウトが著しく変化しないようにすることができます。

#Usability and accessibility

- [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email) を使用する際は、`controls` 属性を必ず設定してください。この属性により、スマートフォンなどのタッチ画面デバイスを使用するユーザーがカルーセルを操作できるようになります。
- [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email) を使用する際は、iOS ではすべての入力型がサポートされているわけでないことに留意してください。詳細については、Safari HTML Reference の「[Supported Input Values](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html)」を参照してください。
- アプリやブラウザによっては、すべての [`autocomplete` 属性値](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)がサポートされているわけではありません。ユーザーはオートコンプリート機能を使えないものだと仮定した上で、フォームを短めに維持してください。

#Styling

- メールに、[AMP for Email 対応 CSS](../learn/email-spec/amp-email-css.md?format=email) のみを使用するようにしてください。
- ビューポートユニット（`vw`、`vh`、`vmin`、および `vmax`）を CSS や HTML で使用しないようにしてください。AMP メールは iframe 内でレンダリングされるため、メールのビューポートはブラウザのビューポートと一致しません。
- 各ブラウザにはそれぞれのデフォルトの CSS スタイルがあります。必要であれば、スタイルを正規化する CSS ライブライを使用してください。デフォルトのスタイル、スタイルの正規化、および利用できるライブラリのリストについては、[Reboot, Resets, and Reasoning](https://css-tricks.com/reboot-resets-reasoning/) を参照してください。
- CSS のマージンのオーバーフローに注意してください。これらは、[AMP レイアウトの制限](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241)によりレンダリングされない可能性があります。

##Mobile

デバイスを識別する [CSS メディアクエリ](style_and_layout/control_layout.md?format=email)を使用して、すべての画面サイズでメッセージの見栄えが良いかを確認してください。レイアウトが正しく、コンポーネントが期待通りに動作することを確認するには、モバイルデバイスでメッセージをテストする必要があります。

#Other Gotchas

AMP for Email で作業する場合は、以下のヒントとコツに留意してください。

- AMP for Email playground は XHR をプロキシしませんが、一部のメールプロバイダーはプロキシします。
- メールクライアント全体で最大限の互換性を得られるようにするには、AMP MIME パートがメール内の HTML MIME パートの前にある必要があります。
- [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) の `src` 属性、[`amp-form`](../../../documentation/components/reference/amp-form.md?format=email) の [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr)、[`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email) の`src`、または `<a>` タグの href 属性は、[`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email) で変化させることはできません。
- ユーザーが HTML バージョンのメッセージにリダイレクトされたり、ユーザーがメッセージを転送したりする場合に備え、メッセージに静的 HTML バージョンを含める必要があります。
