---
$title: AMP Server-side rendering
$order: 3
description: 'Sever-side rendering is an optimization technique for AMP pages improving page load times by up to 50%.'

formats:
  - websites
  - stories
author: sebastianbenz
---
Sever-side rendering is an optimization technique for AMP pages improving page load times up to 50%.

## Why is it faster?

In order to avoid content jumps, AMP requires websites to add the [AMP-boilerplate code](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) in the header.  The AMP-boilerplate hides the page content by setting the page body's opacity to 0.  Once AMP has been loaded, it is able to calculate the layout of the page. After that, AMP sets the body's opacity to 1 making the page content visible.

This way AMP is able to avoid content jumps during page load.  However, the downside of this approach is that the first render of the page doesn't happen until the AMP framework has been downloaded and executed.

To improve this, AMP pages can be rendered server-side. This means AMP layouts such as the `responsive` or `fixed-height` layout are rendered on the server before serving the page to the user agent. This way it becomes possible to remove the AMP-boilerplate **and** avoid content jumps during page load.

Important: AMP Caches already perform these optimizations. However, they're still important as AMP pages are not always served from an AMP Cache.

## How does it work?

The basic idea is to render the AMP layouts (`responsive`, `fixed-height`,....) server-side instead of client-side. Here is an example showing the differences between an AMP page and its server-side rendered version ([click for a large version](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

Let's take a closer look at the individual changes:

&#8291;**1. Document is marked as `transformed=self`:** server-side rendered AMP pages are still valid AMP pages. However, the AMP validator needs to know that the AMP page contains server-side rendered AMP markup. This is done by adding the `transformed=self` attribute to the `<html>` element.

```html
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self">
```

Note: **Note:** AMP caches use a different transformed flag, for example, the Google AMP caches adds `transformed=google;v=1`.

&#8291;**2. No AMP-boilerplate:** the [AMP-boilerplate code](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate) has been removed. This means that page content is no longer hidden initially and renders straight away. This greatly increases the perceived performance of an AMP page. However, it's not always possible to remove the AMP-boilerplate. For example, some AMP components, such as `amp-experiment` or `amp-dynamic-css-classes`, modify the page layout based on the user agent, which cannot be server-side rendered. In order to avoid content jumps, these need to be loaded before the page content can be displayed, which requires the AMP-boilerplate code to initially hide the content of the page.

```html
<̶s̶t̶y̶l̶e̶ ̶a̶m̶p̶-̶b̶o̶i̶l̶e̶r̶p̶l̶a̶t̶e̶>̶b̶o̶d̶y̶{̶-̶w̶e̶b̶k̶i̶t̶-̶a̶n̶i̶m̶a̶t̶i̶o̶n̶:̶-̶a̶m̶p̶-̶s̶t̶a̶r̶t̶ ̶8̶s̶ ̶s̶t̶e̶p̶s̶(̶1̶,̶e̶n̶d̶)̶ ̶0̶s̶ ̶1̶ ̶n̶o̶r̶m̶a̶l̶ ̶b̶o̶t̶h̶;̶-̶m̶o̶z̶-̶a̶n̶i̶m̶a̶t̶i̶o̶n̶:̶-̶a̶m̶p̶-̶s̶t̶a̶r̶t̶ ̶8̶s̶ ̶s̶t̶e̶p̶s̶(̶1̶,̶e̶n̶d̶)̶ ̶0̶s̶ ̶1̶ ̶n̶o̶r̶m̶a̶l̶ ̶b̶o̶t̶h̶;̶-̶m̶s̶-̶a̶n̶i̶m̶a̶t̶i̶o̶n̶:̶-̶a̶m̶p̶-̶s̶t̶a̶r̶t̶ ̶8̶s̶ ̶s̶t̶e̶p̶s̶(̶1̶,̶e̶n̶d̶)̶ ̶0̶s̶ ̶1̶ ̶n̶o̶r̶m̶a̶l̶ ̶b̶o̶t̶h̶;̶a̶n̶i̶m̶a̶t̶i̶o̶n̶:̶-̶a̶m̶p̶-̶s̶t̶a̶r̶t̶ ̶8̶s̶ ̶s̶t̶e̶p̶s̶(̶1̶,̶e̶n̶d̶)̶ ̶0̶s̶ ̶1̶ ̶n̶o̶r̶m̶a̶l̶ ̶b̶o̶t̶h̶}̶@̶-̶w̶e̶b̶k̶i̶t̶-̶k̶e̶y̶f̶r̶a̶m̶e̶s̶ ̶-̶a̶m̶p̶-̶s̶t̶a̶r̶t̶{̶f̶r̶o̶m̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶h̶i̶d̶d̶e̶n̶}̶t̶o̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶v̶i̶s̶i̶b̶l̶e̶}̶}̶@̶-̶m̶o̶z̶-̶k̶e̶y̶f̶r̶a̶m̶e̶s̶ ̶-̶a̶m̶p̶-̶s̶t̶a̶r̶t̶{̶f̶r̶o̶m̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶h̶i̶d̶d̶e̶n̶}̶t̶o̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶v̶i̶s̶i̶b̶l̶e̶}̶}̶@̶-̶m̶s̶-̶k̶e̶y̶f̶r̶a̶m̶e̶s̶ ̶-̶a̶m̶p̶-̶s̶t̶a̶r̶t̶{̶f̶r̶o̶m̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶h̶i̶d̶d̶e̶n̶}̶t̶o̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶v̶i̶s̶i̶b̶l̶e̶}̶}̶@̶-̶o̶-̶k̶e̶y̶f̶r̶a̶m̶e̶s̶ ̶-̶a̶m̶p̶-̶s̶t̶a̶r̶t̶{̶f̶r̶o̶m̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶h̶i̶d̶d̶e̶n̶}̶t̶o̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶v̶i̶s̶i̶b̶l̶e̶}̶}̶@̶k̶e̶y̶f̶r̶a̶m̶e̶s̶ ̶-̶a̶m̶p̶-̶s̶t̶a̶r̶t̶{̶f̶r̶o̶m̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶h̶i̶d̶d̶e̶n̶}̶t̶o̶{̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶:̶v̶i̶s̶i̶b̶l̶e̶}̶}̶<̶/̶s̶t̶y̶l̶e̶>̶<̶n̶o̶s̶c̶r̶i̶p̶t̶>̶<̶s̶t̶y̶l̶e̶ ̶a̶m̶p̶-̶b̶o̶i̶l̶e̶r̶p̶l̶a̶t̶e̶>̶b̶o̶d̶y̶{̶-̶w̶e̶b̶k̶i̶t̶-̶a̶n̶i̶m̶a̶t̶i̶o̶n̶:̶n̶o̶n̶e̶;̶-̶m̶o̶z̶-̶a̶n̶i̶m̶a̶t̶i̶o̶n̶:̶n̶o̶n̶e̶;̶-̶m̶s̶-̶a̶n̶i̶m̶a̶t̶i̶o̶n̶:̶n̶o̶n̶e̶;̶a̶n̶i̶m̶a̶t̶i̶o̶n̶:̶n̶o̶n̶e̶}̶<̶/̶s̶t̶y̶l̶e̶>̶<̶/̶n̶o̶s̶c̶r̶i̶p̶t̶>̶
```


&#8291;**3. AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the [AMP-runtime CSS styles](https://cdn.ampproject.org/v0.css): `<style amp-runtime>...</style>`. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in `i-amphtml-version="011905222334000"` differs from the current AMP version and will update the CSS with the latest version if not.

```html
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

&#8291;** 4. Server-side rendered AMP layouts: ** for each element using an AMP layout, the layout-specific markup gets injected.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Note: **Note:** not all AMP layouts currently support server-side rendering. For example, the intrinsic layout will still be rendered client-side and requires the AMP-boilerplate code to be present (see this [feature request](https://github.com/ampproject/amphtml/issues/17686) for the current status).

## How to server-side render AMP pages?

There are currently two Open Source implementations available, which can either be used directly, or as inspiration/reference for your own code.

- **[amp-toolbox-optimizer](https://www.npmjs.com/package/amp-toolbox-optimizer) (Node.js): ** An NodeJs library for producing optimized AMP. If your site is powered by [Express](https://expressjs.com/), you may also be interested in the [amp-toolbox-optimizer-express](https://www.npmjs.com/package/amp-toolbox-optimizer-express) middleware.

- ** [amppackager](https://github.com/ampproject/amppackager/tree/releases/transformer/) (Go): ** `transform` is a go command-line tool for producing Transformed AMP. (Install via `go get -u github.com/ampproject/amppackager/cmd/transform`.)

## See Also

*   [Optimize your hosted AMP pages](optimize_amp.md)
*   [How to make AMP even faster](https://blog.amp.dev/2018/10/08/how-to-make-amp-even-faster/)
