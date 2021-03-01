---
'$title': Validating your AMP HTML
$order: 8
description: AMP ページを作成するたびに、AMP HTML が正しいことを必ず検証しましょう。［AMP ページの検証にはいくつかの方法を使用できます ...
author: bpaduch
---

ウェブストーリーは AMP で構築されているため、AMP HTML が正しいことを必ず検証しましょう。[AMP ページの検証にはいくつかの方法を使用できます](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)。このチュートリアルでは、開発者モードをオンにして AMP Validator を有効にします。開発者モードをオンにするには、次のフラグメント識別子を URL を追加してページを再読み込みします。

```text
#development=1
```

例:

```text
http://localhost:8000/pets.html#development=1
```

Chrome（または任意のブラウザ）で [開発者コンソール](https://developer.chrome.com/devtools/docs/console)を開いて、AMP エラーがないことを確認します。検証メッセージを表示するには、ブラウザの更新が必要となる場合があります。ページにエラーがない場合は、次のメッセージが表示されます。

```text
 AMP validation successful.
```
