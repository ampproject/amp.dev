---
$title: AMP HTML の検証
---

AMP ページを作成する際には、AMP HTML が正しいことを必ず検証してください。[AMP ページを検証するにはいくつかの方法]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/index.md', locale=doc.locale).url.path}})があります。このチュートリアルでは、デベロッパー モードをオンにして AMP 検証ツールを有効にします。デベロッパー モードをオンにするには、URL に次のフラグメント識別子を追加してページを再読み込みします。

```text
#development=1
```

例:

```text
http://localhost:8000/pets.html#development=1
```

Chrome（または任意のブラウザ）で [デベロッパー コンソール](https://developer.chrome.com/devtools/docs/console)を開いて、AMP エラーがないことを確認します。検証メッセージを表示するには、ブラウザの更新が必要となる場合があります。ページにエラーがない場合は、次のメッセージが表示されます。

```text
AMP の検証に成功しました。
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/create_bookend.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>

