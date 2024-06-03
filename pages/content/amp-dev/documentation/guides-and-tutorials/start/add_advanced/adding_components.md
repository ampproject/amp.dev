---
$title: Adding extended AMP components
$order: 2
description: 'AMP’s component system allows you to quickly build efficient and responsive features into your articles with minimal effort. The AMP HTML library has three classifications for AMP components: ...'
---

AMP’s component system allows you to quickly build efficient and responsive features into your articles with minimal effort. The AMP HTML library has three classifications for AMP components:

- **built-in**: These are components that are included in the base AMP JavaScript library (specified in the `<head>` tag), such as [`amp-img`](../../../../documentation/components/reference/amp-img.md) and [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md).  These components can be used immediately in an AMP document.

- **extended**: These are extensions to the base library that must be explicitly included in the document as custom elements.  Custom elements require specific scripts that are added to the `<head>` section (e.g., `<script async custom-element="`[`amp-video`](../../../../documentation/components/reference/amp-video.md)`...`).

- **experimental**: These are components that are released but are not yet ready for wide use. Developers can choose to opt-in to use these features before they are fully released.  Learn more in [Experimental features](../../../../documentation/guides-and-tutorials/learn/experimental.md).

Our sample already uses a built-in component, [`amp-img`](../../../../documentation/components/reference/amp-img.md), and we explored how that component relates to the AMP layout system in the ["Convert your HTML to AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md) tutorial.  Now, let's add some commonly-used **extended** AMP components to our news article.

## Monetize with ads

Ads in AMP are constructed by using the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component. The [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component allows you to configure ads in several ways, such as the width, height and layout mode. However, many ad platforms require additional configuration, such as the account ID for the ad network, which ad should be served, or options for targeting the advertising. These options are easily specified in the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component by using HTML attributes.

Take a look at this example of a **DoubleClick** ad:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/image/static">
</amp-ad>
```

As you can see, this is a very simple configuration. Take note of the `type` attribute, which informs the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component of the ad platform that we want to use. In this case, we want to use the [DoubleClick](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md) platform, so we specified `doubleclick` as the value.

The `data-slot` attribute is more unique. In [`amp-ad`](../../../../documentation/components/reference/amp-ad.md), any attributes that start with  `data-` are vendor-specific attributes. This means that not all vendors will necessarily require this particular attribute, nor will they necessarily react if it is supplied. For example, compare the **DoubleClick** example from above with the following test ad from the [A9](https://github.com/ampproject/amphtml/blob/main/ads/a9.md) platform:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302">
</amp-ad>
```

Try **adding** both of the above examples into your article just after the `<header>` tag.

Remember, not all components are included in the core AMP library JavaScript file. We need to include an additional JavaScript request for the ad component.

**Add** the following script to the `<head>` tag:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

**Refresh** the page and you should see two test ads:

{{ image('/static/img/docs/tutorials/tut-advanced-ads.png', 376, 606, align='center half', caption='Test ads') }}

[tip type="important"]
**IMPORTANT –** You might have some errors in your developer console, such as `Mixed Content` or `XMLHttpRequest cannot load`. The former error is likely related to the A9 advertisement because not all the content it loads is secure. This is a notable requirement for all ads served on AMP.
[/tip]

The two [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)s below provide an example of the flexibility [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) provides for supporting ad platform features.  In this case we've configured (using DoubleClick's dashboard) two DoubleClick test ads to only show in certain countries--the first will show only in the UK and the second will show only in the US.  Try **adding** these two geotargeting ad configurations in the AMP document below the ads you added earlier:

```html
<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/uk">
  <div fallback>No ad appeared because you're not browsing from the UK!</div>
</amp-ad>

<amp-ad
  width="300"
  height="250"
  type="doubleclick"
  data-slot="/35096353/amptesting/geo/us">
  <div fallback>No ad appeared because you're not browsing from the US!</div>
</amp-ad>
```

**Refresh** the page and take a look. The following screenshot was captured from Canada, so neither ad loads:

{{ image('/static/img/docs/tutorials/tut-advanced-ad-geo.png', 375, 345, align='center half', caption='Test ads') }}

[tip type="note"]
**NOTE –**  You might notice that inside these [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) tags are additional `div` tags with an attribute named `fallback` on them. Can you guess what the `fallback` attribute denotes? It informs AMP’s loading system to only show the contents of that element when the parent element fails to load successfully. Learn more in [Placeholders & fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).
[/tip]

[tip type="read-on"]
**READ ON –** To see the latest supported ad networks, read the reference documentation for the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) component.
[/tip]

[tip type="note"]
**NOTE –**  No ad network-provided JavaScript is allowed to run inside the AMP document. Instead, the AMP runtime loads an iframe from a different origin (via an iframe sandbox) as the AMP document and executes the ad network’s JS inside that iframe sandbox.
[/tip]

Our AMP document now includes text, an image, and an advertisement embedded on the page, which are all key ingredients to telling a story and monetizing your content. However, modern websites often include more functionality than simply pictures and text.

Let’s take our AMP document to the next level and add more advanced web functionality that is commonly found on news articles, like:

- YouTube videos
- Tweets
- Article quotes

##  Embed a YouTube video
Let’s try embedding a YouTube video into the document. **Add** the following code just after the `<header>` in your AMP document (above the [`amp-ad`](../../../../documentation/components/reference/amp-ad.md)s you just added):

```html
<amp-youtube
  data-videoid="npum8JsITQE"
  layout="responsive"
  width="480"
  height="270">
  <div fallback>
    <p>The video could not be loaded.</p>
  </div>
</amp-youtube>
```

**Refresh** the page. Instead of the video you'll see this text: *“The video could not be loaded.”*

Even if your browser can show YouTube videos without issue, you will still receive this error. Why? The video hasn’t actually failed to load, rather the component itself failed.

Remember, not all components are included in the core AMP library JavaScript file. We need to include an additional JavaScript request for the YouTube component.

[tip type="note"]
**NOTE –**  If you still have your developer console open and `#development=1` in your URL, you'll see an AMP validator error at this point reminding you to add the [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) JavaScript and a link to documentation that will tell you the `script` tag to add.
[/tip]

**Add** the following script to the `<head>` tag:

```html
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
```

**Refresh** the page and you should see the YouTube video:

{{ image('/static/img/docs/tutorials/tut-advanced-youtube.png', 412, 618, align='center half', caption='Embedded Youtube video') }}

As with the other elements on the page, we specified the `width` and `height` of the video so that the AMP layout system can calculate the aspect ratio. Also, we set the `layout` to `responsive`, so the video fills the width of its parent element.

To learn more about embedding YouTube videos, read the [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) component documentation. For even more video and media components, check out the [list of media AMP components](../../../../documentation/components/index.html#media).

[tip type="tip"]
**TIP –**  Use the [`fallback`](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md#fallbacks) attribute to inform users if a component fails to load or if the component is unsupported in their browser.
[/tip]

## Display a Tweet
Embedding preformatted tweets from Twitter is a common feature in news articles. The [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) component can provide this functionality with ease.

Start by adding the following JavaScript request to the `<head>` tag of your document:

```html
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
```

Now, in your article **add** this code to embed the Tweet:

```html
<amp-twitter
  width="486"
  height="657"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```

The `data-tweetid` attribute is another example of a custom attribute required by a particular platform. In this case, Twitter correlates the value of the `data-tweetid` attribute to a particular Tweet.

**Refresh** your browser and take a look at the page. You should see the Tweet appear:

{{ image('/static/img/docs/tutorials/tut-advanced-twitter.png', 412, 613, align='center half', caption='Embedded Tweet') }}

To learn more about embedding Twitter Tweets, read the [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) component documentation.

[tip type="tip"]
**TIP –** AMP provides even more components for embedding content from social networks. See the latest [social AMP components](../../../../documentation/components/index.html#social).
[/tip]

## Highlight an article quote

A common feature in news articles is to highlight particularly engaging snippets of text from the article. For example, a quotation from a particular source or an important fact might be repeated in a larger font to attract the reader's attention.

However, not all snippets of text are necessarily the same length of characters, which can make it difficult to balance a larger font size with the amount of space the text consumes on the page.

AMP provides another component specifically designed for this type of situation, it's called the [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) component. The [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) component allows you to define a fixed width and height element, and a maximum font size. The component intelligently scales the font size to **fit** the text within the available width and height.

Let’s give it a try. First, **add** the component’s library to the `<head>` tag:

```html
<script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
```

Add the following to your page:

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Big, bold article quote goes here.
</amp-fit-text>
```

**Refresh** the page and look at the result!

Now, experiment further. What happens if the quotation is much shorter?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
  Hello!
</amp-fit-text>
```

Or, what if the quotation is longer?

```html
<amp-fit-text width="400" height="75" layout="responsive" max-font-size="42">
   And the Raven, never flitting, still is sitting, still is sitting. On the pallid bust of Pallas just above my chamber door; And his eyes have all the seeming of a demon’s that is dreaming, And the lamp-light o’er him streaming throws his shadow on the floor; And my soul from out that shadow that lies floating on the floor. Shall be lifted—nevermore!
</amp-fit-text>
```

As a last experiment with [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md), try creating a short piece of text,  such as "Hello" with a much larger height (for example, a value of 400), and maintaining the max-font-size attribute value of 42. What would the resulting page look like? Is the text centered vertically? Or, does the height of the [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) tag shrink to fit the max font size? With what you already know about AMP’s layout system, try to answer the question before playing with the code!

You can learn more about [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) from [AMP by Example's live demo](../../../../documentation/examples/documentation/amp-fit-text.html).
