---
$title: ページを追加する
---

ここまでで、AMP ストーリーにページを追加する方法を説明しました。同じようにして「ペットとの楽しい時間」のストーリーに続きのページを追加してみましょう。これまでに学んだ内容を思い出しながら、以下の手順に沿って**残りのページを作成してみてください**。途中でわからなくなったら、完成版のコード（<a href="https://github.com/ampproject/amp.dev/blob/legacy-master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>）を参考にしてください。

[tip type="success"]

各ページには、`id="page1"` などの形式で固有の「id」属性を設定する必要があります。

[/tip]

## ページ 1: 猫

1 つのレイヤに画像とテキストを表示する方法を説明します。

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>次の 1 つのレイヤを含めます。
      <ul>
        <li><a href="create_cover_page.md#vertical"><code>vertical</code></a> テンプレートを実装します。</li>
        <li>次の 3 つの要素を含めます。
          <ul>
            <li><code>&lt;h1></code> 要素に「Cats」というタイトルを含めます。</li>
            <li>レスポンシブな <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>（<code class="filename">cat.jpg</code>、720 x 1280 px）を指定します。</li>
            <li><code>&lt;q></code> 要素に<em>「Dogs come when they're called. Cats take a message and get back to you. --Mary Bly」という引用文を含めます。</em></li>
          </ul>
        </li>
      </ul></li></ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='ページ 1 - 猫' ) }}</td>
  </tr>
</table>

## ページ 2: 犬

テキストを画像を 2 つのレイヤに分けて、テキストの配置場所を調整し、画像をページの画面全体に表示する方法を説明します。

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>次の 2 つのレイヤを含めます。
      <ul>
        <li><b>レイヤ 1</b>: <a href="create_cover_page.md#fill"><code>fill</code></a> テンプレートを実装し、レスポンシブな <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>（<code class="filename">dog.jpg</code>、720 x 1280 px）を指定します。</li>
        <li><b>レイヤ 2</b>: <a href="create_cover_page.md#thirds"><code>thirds</code></a> テンプレートを実装し、次の 2 つの要素を含めます。
          <ul>
            <li><code>&lt;h1></code> 要素に「Dogs」というタイトルを含めます。</li>
            <li><code>&lt;p></code> 要素で、<a href="create_cover_page.md#thirds"><code>grid-area</code></a>を<a href="create_cover_page.md#thirds"><code>lower-third</code></a>に指定してコンテンツを表示するエリアを設定します。またこの要素に、表示するコンテンツ<em>「Dogs were probably the first tame animals. They have accompanied humans for some 10,000 years. Some scientists assert that all dogs, domestic and wild, share a common ancestor in the small South Asian wolf」というテキストを含めます。</em></li>
          </ul>
        </li>
      </ul></li></ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## ページ 3: 鳥

テキストのレイアウトを調整し、画像をページの画面全体に表示し、ページに BGM を追加する方法を説明します。

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>次の 3 つのレイヤを含めます。
      <ul>
        <li><b>レイヤ 1</b>: <a href="create_cover_page.md#fill"><code>fill</code></a> テンプレートを実装し、レスポンシブな <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>（<code class="filename">bird.jpg</code>、720 x 1280 px）を指定します。</li>
        <li><b>レイヤ 2</b>: <a href="create_cover_page.md#vertical"><code>vertical</code></a> テンプレートを実装し、次の 1 つの要素を含めます。
          <ul>
            <li><code>&lt;h1></code> 要素に「Birds」というタイトルを含めます。</li>
          </ul>
        </li>
        <li><b>レイヤ 3</b>: <a href="create_cover_page.md#vertical"><code>vertical</code></a> テンプレートを実装し、次の 1 つの要素を含めます。
          <ul>
            <li><code>&lt;q></code> 要素に<em>「A bird is three things: Feathers, flight and song, And feathers are the least of these.--Marjorie Allen Seiffert」という引用文を含めます。</em></li>
            <li>この第 3 のレイヤで、<code>class="bottom"</code> を指定して、子要素を画面の下部に配置します。</li>
          </ul>
        </li>
      </ul></li>
      <li>ページが表示されている間、バックグラウンドで音声ファイルを再生します。バックグラウンドでの音声の再生は、ストーリー全体で行うことも、1 つのページだけで行うこともできます。ここではこのページでのみ音声を再生するため、<code>background-audio="assets/bird-singing.mp3"</code> 属性をこのページの <code>&lt;amp-story-page></code> 要素に追加します。</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='ページ 3 - 鳥' ) }}</td>
  </tr>
</table>

## ページ 4: ウサギ

テキストの配置場所を調整し、動画をページの画面全体に表示する方法を説明します。

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>次の 3 つのレイヤを含めます。
      <ul>
        <li><b>レイヤ 1</b>: <code>fill</code> テンプレートを実装し、レスポンシブな <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>（<code class="filename">rabbit.mp4</code>）を指定します。
          <ul>
            <li>動画を表示するには、<a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> コンポーネントを使用するために<strong>必要なスクリプト</strong>を <code>&lt;head></code> セクションに追加する必要があります。</li>
            <li><code>poster</code> 画像（<code class="filename">rabbit.jpg</code>）を指定します。この属性は、有効な AMP ストーリーに<strong>必須</strong>です。</li>
            <li>動画が自動再生されるよう、<code>autoplay</code> 属性を指定します。この属性は、有効な AMP ストーリーに<strong>必須</strong>です。</li>
            <li>動画が自動的にループ再生されるよう、<code>loop</code> 属性を指定します。</li>
            <li>サイズを <code>width="720"</code>、<code>height="1280"</code>、レイアウトを <code>layout="responsive"</code> に設定します。</li>
          </ul></li>
        <li><b>レイヤ 2</b>: <code>vertical</code> テンプレートを実装し、次の 1 つの要素を含めます。
          <ul>
            <li><code>&lt;h1></code> 要素に<em>「Rabbits」</em>というタイトルを含めます。</li>
          </ul>
        </li>
        <li><b>レイヤ 3</b>: <code>vertical</code> テンプレートを実装し、次の 1 つの要素を含めます。
          <ul>
            <li><code>&lt;p></code> 要素に<em>「Rabbits can learn to follow simple voice commands and come when called by name, and are curious and playful」というテキストを含めます。</em></li>
            <li><code>bottom</code> CSS クラスをレイヤに適用して、子要素を画面の下部に配置します。</li>
          </ul>
        </li></ul></li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='ページ 4 - ウサギ' ) }}</td>
  </tr>
</table>

これで、「ペットとの楽しい時間」ストーリーはほぼ完成に近づきました。最後のページでは、アニメーション機能を使用してすべてのペットを一堂に表示させてみましょう。
