---
$title: AMP ページのキャッシュの仕組み
---

このドキュメントでは、AMP エコシステムにおける AMP キャッシュの役割と、AMP ページがキャッシュされる仕組みについて学習します。

## AMP キャッシュとは
AMP キャッシュは、有効な AMP ドキュメントを配信するための、プロキシベースのコンテンツ配信ネットワークです。AMP キャッシュは次のような目的で設計されています。

1.  有効な AMP ページのみを配信する。
2.  AMP ページが効率的、安全にプリロードされるようにする。
3.  コンテンツに対して、ユーザーにメリットのある追加のパフォーマンス最適化を行う。

AMP キャッシュについて詳しくは、下記の YouTube 動画やブログ記事「[AMP キャッシュが存在する理由](https://medium.com/@pbakaus/why-amp-caches-exist-cd7938da2456)」をご覧ください。

[video src='https://www.youtube.com/watch?v=n8n7fj60lds' caption='AMP キャッシュが存在する理由については、こちらの動画をご覧ください。']

## 使用できる AMP キャッシュの種類
現在、2 つの AMP キャッシュ プロバイダがあります。

- [Google AMP キャッシュ](https://developers.google.com/amp/cache/)
- [Bing AMP Cache](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)

AMP はオープン エコシステムであり、AMP プロジェクトでは AMP キャッシュの開発を積極的に奨励しています。AMP キャッシュの作成について詳しくは、[AMP キャッシュ ガイドライン](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)をご覧ください。

## AMP キャッシュの選択

サイト運営者が AMP キャッシュを選択することはありません。使用する AMP キャッシュ（ある場合）を選択するのは、実際には、コンテンツにリンクしている*プラットフォーム*です。

これは、サイト運営者がコンテンツ配信を担当する一般的なモデルとは逆の形です。しかし、このモデルでは、プラットフォームがユーザーに予測可能な読み込みのパフォーマンスを提供することができます。特に、プリレンダリングの段階で求められるセキュリティとプライバシーの不変性をプラットフォームが保証できるようになります。AMP キャッシュの作成に関する詳細なガイドラインについては、[AMP キャッシュ ガイドライン](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)をご覧ください。

## キャッシュのオプトアウト

キャッシュは AMP エコシステムの中心部分です。有効な AMP ドキュメントを公開すると、自動的にキャッシュ配信が有効になります。

ドキュメントをキャッシュしたくない場合は、HTML タグから `amp` 属性を削除する方法があります。これによってドキュメントは技術的に無効な AMP となりますが、ドキュメントの機能には影響を与えません。

## キャッシュされた AMP ページのリクエスト元

キャッシュされた AMP ページには、プラットフォーム（Google 検索、Google ニュース、Bing など）やモバイルアプリがアクセスします。モバイルアプリは、URL を介して（Google の [AMP URL API](https://developers.google.com/amp/cache/use-amp-url) をご覧ください）、または、プログレッシブ ウェブアプリのクロスオリジン XHR によって（[AMP を埋め込んでデータソースとして使用する](../../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)をご覧ください）、キャッシュされた AMP コンテンツにリンクすることができます。

<amp-img src="/static/img/docs/platforms_accessing_cache.png"
         width="1054" height="356" layout="responsive"
         alt="プラットフォームとモバイルアプリがキャッシュされた AMP ページにアクセスする">
</amp-img>

## AMP ページがキャッシュされる仕組み
AMP 形式を使用することで、コンテンツは AMP キャッシュによるキャッシュが可能な状態になります。AMP ページが AMP キャッシュに格納されるには、いくつかの方法があります。

* **プラットフォームによる検出**: プラットフォームが `<html ⚡>` タグや `<html amp>` タグを介して AMP コンテンツを検出し、そのコンテンツをキャッシュします。たとえば、Google 検索はコンテンツをクロールします。有効な AMP ページを特定した場合、そのコンテンツは Google AMP キャッシュに追加されます。

* **キャッシュ URL リクエスト**: プラットフォームは AMP キャッシュ URL の形式を使用して、AMP ページを明確にリクエストすることができます。AMP キャッシュはリバース プロキシとして機能するため、プラットフォームがページにアクセスすると、ページは自動的にキャッシュされることになります。
    - Google AMP キャッシュ URL の例: `https://foo-com.cdn.ampproject.org/c/s/foo.com/amp_document.html`

注: AMP キャッシュ URL はユーザーに表示される URL ではありません。つまり、通常、ユーザーがその URL を介してコンテンツをリクエストすることはありません。

* **サイト運営者による追加**: サイト運営者は AMP ページを明示的に AMP キャッシュに追加することができます。これは Google AMP キャッシュ（[Google AMP キャッシュ: AMP コンテンツの更新](https://developers.google.com/amp/cache/update-cache)をご覧ください）でのみ使用できる方法です。

## その他のリソース

* [AMP プロジェクトの AMP キャッシュ ガイドライン](https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md)
* [Google AMP キャッシュの概要](https://developers.google.com/amp/cache/overview)
* [[Bing AMP Cache Documentation](https://www.bing.com/webmaster/help/bing-amp-cache-bc1c884c)
