---
$title: Creating the cover page
$order: 4
description: "To create a page, add the <amp-story-page> element as a child of amp-story. Assign a unique id to the page. For our first page, which is the cover page, let's assign a unique id of cover: ..."
author: bpaduch
---

A page within an AMP story is represented by the `<amp-story-page>` component. Within an [`amp-story`](../../../../documentation/components/reference/amp-story.md), you can have one or more `<amp-story-page>` components, containing each of the individual screens of a story. The first page you specify in the document order is the first page that displays in the story.

To create a page, **add** the `<amp-story-page>` element as a child of [`amp-story`](../../../../documentation/components/reference/amp-story.md). **Assign** a unique id to the page. For our first page, which is the cover page, let's assign a unique id of `cover`:

```html hl_lines="6 7"
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

Now we have the shell for our cover page. However, our story still isn't valid.  Within our page, we need to specify at least one **layer**.
{{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='cover page has two layers', align='right third' ) }}

## Layers in a page

Like layers in graphics, you can use layers in AMP story pages to create visual effects. Layers are stacked on top of one another, so, the first layer is the bottom layer and the next layer is on top of that, and so on.

Our cover page is actually comprised of two layers:

* **Layer 1**:  An image that serves as our backdrop
* **Layer 2**: The title and byline for the story

### Creating layer 1

Let's add our first layer to our cover page. The layer contains an image that fills the screen.

Create the layer by adding the `<amp-story-grid-layer>` element as a child of `<amp-story-page>`. As we want the image to fill the screen, specify the `template="fill"` attribute for the `amp-story-grid-layer`. Inside the layer, add an [`amp-img`](../../../../documentation/components/reference/amp-img.md) element for the `cover.jpg` file, and make sure it's responsive (i.e., `layout="responsive"`) with the image's dimensions of 720 x 1280 px.  Here's what our layer looks like:

```html hl_lines="2 3 4 5 6 7"
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img src="assets/cover.jpg"
        width="720" height="1280"
        layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

Let's see how the page displays.  Open the page in your browser: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

Here's what it should look like:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### Creating layer 2

So, we have our backdrop but now we need the second layer, which sits on top of the backdrop and contains our heading and byline.  To add our second layer, let's complete the same tasks we performed for layer 1, but instead of using the `fill` template, we'll use the **`vertical`** template. However, before we go any further, let's learn about templates and how we can arrange AMP and HTML elements in an `<amp-story-grid-layer>`.

#### Laying out elements with a template

The `<amp-story-grid-layer>` element lays out its children elements in a grid (based off the [CSS grid](https://www.w3.org/TR/css-grid-1/)).  To indicate how you want the children arranged, you need to specify one of the following layout templates:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Template: Fill</h5></td>
</tr>
<tr>
    <td width="65%">The <strong>fill</strong> template fills the screen with the first child element in the layer. Any other children in this layer aren't shown.

    The fill template works well for backgrounds, including images and videos.
   <code class="nopad"><pre>&lt;amp-story-grid-layer template="fill">
  &lt;amp-img src="dog.png"
      width="720" height="1280"
      layout="responsive">
  &lt;/amp-img>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Template: Vertical</h5></td>
</tr>
<tr>
    <td width="65%">The <strong>vertical</strong> template lays the children elements along the y-axis. The elements are aligned to the top of the screen, and take up the entire screen along the x-axis.

    The vertical template works well when you want to vertically stack elements one right after the other.

   <code class="nopad"><pre>&lt;amp-story-grid-layer template="vertical">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Template: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%">The <strong>horizontal</strong> template lays the children elements along the x-axis.  The elements are aligned to the start of the screen, and take up the entire screen along the y-axis.

    The horizontal template works well when you want to horizontally stack elements one right after the other.

    <code class="nopad"><pre>&lt;amp-story-grid-layer template="horizontal">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Template: Thirds</h5></td>
</tr>
<tr>
<td width="65%">
The <strong>thirds</strong> template divides the screen into three equally-sized rows, and allows you to slot content into each area.

You can also specify a named <code>grid-area</code> to indicate which third you want your content to be in&mdash;the <code>upper-third</code>, <code>middle-third</code>, or <code>lower-third</code>. Named grid areas are useful for changing the default behavior of where elements appear.  For example, if you have two elements in the layer, you can specify the first element to be in <code>grid-area="upper-third"</code> and the second element to be in the <code>grid-area="lower-third"</code>.

<code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">
  &lt;h1 grid-area="upper-third">element 1&lt;/h1>
  &lt;p grid-area="lower-third">element 2&lt;/p>
&lt;/amp-story-grid-layer>
</pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### Completing our cover page

Now that you understand layer templates, let's complete our second layer for the cover page.

For layer 2, we want the heading and byline to be at the top, and we want the elements to follow one after the other, so we'll specify the `vertical` template. Our second `amp-story-grid-layer` follows the first, like so:

```html hl_lines="4 5 6 7"
<amp-story-grid-layer>
 <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

Refresh your browser and review your work.  Our cover page is complete.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}
