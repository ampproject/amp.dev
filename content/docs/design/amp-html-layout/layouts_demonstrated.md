---
$title: Demonstrating AMP layouts
$order: 5
components:
    - selector
---

This page demonstrates the different [layouts in AMP](https://www.ampproject.org/docs/design/amp-html-layout#layout), and how they work when a screen is resized.
 
<div class="main-layouts">

  <!-- fill -->
  <div class="layout-item">
    <h3>fill</h3>
     <div class="description">With a <code>fill</code> layout, the element takes the space available to it—both width and height. In other words, the layout and size of a fill element matches its parent.</div>
    <div class="fixed-container">
      <div class="parent">
        <div class="wrapper">
            <amp-img layout="fill" src="/static/img/docs/layouts/blue.jpg"></amp-img>
        </div>
      </div>
    </div>
  </div>

 <!-- fixed -->
      <div class="layout-item">
        <h3>fixed</h3> 
        <div class="description">With a <code>fixed</code> layout, the element retains its fixed dimensions based on the element's width and height attributes (no responsiveness).</div>
        <div class="fixed-container">
          <div class="parent">
            <div class="wrapper">
              <amp-img layout="fixed"
                src="/static/img/docs/layouts/blue.jpg"
                width="200" height="150">
              </amp-img>
            </div>
          </div>
        </div>
      </div>

      <!-- fixed-height -->
      <div class="layout-item">
        <h3>fixed-height</h3>
        <div class="description">With a <code>fixed-height</code> layout, the element takes the space available to it but keeps the height unchanged. This layout works well for elements that need to position content horizontally (e.g., <code>amp-carousel</code>).</div>
        <div class="fixed-container">
          <div class="parent">
            <div class="wrapper">
              <amp-img layout="fixed-height"
                src="/static/img/docs/layouts/blue.jpg" height="150">
              </amp-img>
            </div>
          </div>
        </div>
      </div>

      <!-- flex-item -->
      <div class="layout-item">
        <h3>flex-item</h3> 
        <div class="description">With a <code>fixed-height</code> layout, the element and other elements in its parent take the parent container's remaining space when the parent is a flexible container (i.e., display: <code>flex</code>).</div>
        <div class="fixed-container">
          <div class="parent">
            <div class="wrapper">
              <div class="flex-container">
                <amp-img src="/static/img/docs/layouts/blue.jpg" layout="flex-item"></amp-img>
                <amp-img src="/static/img/docs/layouts/red.jpg" layout="flex-item"></amp-img>
                <amp-img src="/static/img/docs/layouts/green.jpg" layout="flex-item"></amp-img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- responsive -->
      <div class="layout-item">
        <h3>responsive</h3>
        <div class="description">With a <code>responsive</code> layout, the element takes the space available to it and resizes its height automatically to the aspect ratio specified by the element's width and height attributes.</div>
        <div class="fixed-container">
          <div class="parent">
            <div class="wrapper">
              <amp-img layout="responsive"
                src="/static/img/docs/layouts/blue.jpg"
                width="200" height="150">
              </amp-img>
            </div>
          </div>
        </div>
      </div>

      <!-- intrinsic-->
      <div class="layout-item">
        <h3>intrinsic</h3> 
        <div class="description">With an <code>intrinsic</code> layout, the element takes the space available to and resizes its height automatically to the aspect ratio given by the width and height attributes <em>until</em> it reaches the element's natural size or reaches a CSS constraint.</div>
        <div class="fixed-container">
          <div class="parent">
            <div class="wrapper">
              <amp-img layout="intrinsic"
                src="/static/img/docs/layouts/blue.jpg"
                width="250" height="150">
              </amp-img>
            </div>
          </div>
        </div>
      </div>

      <!-- container -->
      <div class="layout-item">
        <h3>container</h3> 
        <div class="description">With a <code>container</code> layout, the element lets its children define its size, much like a normal HTML <code>div</code> tag. The element is assumed to not have specific layout itself but only acts as a container.</div>
        <div class="fixed-container">
          <div class="parent">
            <div class="wrapper">
              <amp-selector layout="container">
                  <amp-img src="/static/img/docs/layouts/green.jpg" width="80" height="80" option="a"></amp-img>
                  <amp-img src="/static/img/docs/layouts/red.jpg" width="80" height="80" option="b"></amp-img>
                  <amp-img src="/static/img/docs/layouts/yellow.jpg" width="80" height="80" option="c"></amp-img>
              </amp-selector>
            </div>
          </div>
        </div>
      </div>

      <!-- nodisplay -->
      <div class="layout-item">
        <h3>nodisplay</h3>
        <div class="description">With a <code>nodisplay</code> layout, the element doesn't displayed. The element takes up zero space on the screen as if its display style was <code>none</code>.</div>
        <div class="fixed-container">
          <div class="parent">
            <div class="wrapper">
              <amp-img layout="nodisplay"
                src="/static/img/docs/layouts/blue.jpg"
                width="200" height="150">
              </amp-img>
            </div>
          </div>
        </div>
      </div>

</div>