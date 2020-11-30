---
formats:
  - websites
$title: Interactivity in AMP introduction
$order: 0
description: Read this guide to learn how to build interactivity in AMP.
$hidden: true
author: CrystalOnScript
---

These guides outline how to create interactive AMP pages. Interactivity is essential to the modern web. Building unique and delightful experiences engages users, keeping them on your site. AMP provides out-of-the box solutions to common interactivity needs while also affording highly customizable and flexible solutions.

Building interactive experiences may not feel traditional, and it's not! But that doesn’t mean it’s more difficult. Many interactive experiences are very easy to build with AMP once you’re introduced to concepts and understand the syntax.

There are several levels of interactivity in AMP. You can apply one, multiple, all, or none to an AMP page. Read the sections of this guide to learn how to build interactivity in AMP.

# Interactivity foundations

This guide outlines the built-in interactivity AMP provides. It explains how to easily implement common primitives, such as hiding and showing elements.

[example preview="inline" playground="true"]
```html
  <h1 id="hello">Hello World!</h1>
  <button on="tap:hello.hide">Hide</button>
  <button on="tap:hello.show">Show</button>
  <button on="tap:hello.toggleVisibility">Toggle</button>
```
[/example]

[Start here](foundations.md) to learn foundations that you can build and combine with other interactive possibilities.

# Ready-made interactivity with AMP components

One of AMP’s greatest strengths is its extensive library of ready-to-go components. Many of them are interactive elements that you can customize and combine to build unique experiences!

[example preview="top-frame" playground="true" orientation="portrait" imports="amp-sidebar, amp-accordion"]
```html
  <amp-sidebar id="sidebar" class="sample-sidebar" layout="nodisplay" side="right">
    <h3>Sidebar</h3>
    <amp-accordion id="my-accordion" disable-session-states>
      <section>
        <h2>Section 1</h2>
        <p>Content in section 1.</p>
      </section>
      <section>
        <h2>Section 2</h2>
        <div>Content in section 2.</div>
      </section>
      <section expanded>
        <h2>Section 3</h2>
        <amp-img src="/static/inline-examples/images/squirrel.jpg" width="320" height="256" alt="Photo of a squirrel"></amp-img>
      </section>
    </amp-accordion>
    <button on="tap:sidebar.close">Close sidebar</button>
    <button on="tap:sidebar.toggle">Toggle sidebar</button>
  </amp-sidebar>
  <button on="tap:sidebar.toggle">Toggle sidebar</button>
  <button on="tap:sidebar.open">Open sidebar</button>
```
[/example]

[This guide](ready_made.md) introduces the most common interactive components and outlines implementation patterns.

# Building personalized interactive experiences

While AMP provides solutions to common web widgets and interactivity, each website has its own needs. AMP embraces highly personalized experiences with three components: [`amp-selector`](../../../components/reference/amp-selector.md), [`amp-bind`](../../../components/reference/amp-bind.md), and [`amp-script`](../../../components/reference/amp-bind.md). These three components don't have a default UI. Instead, they're used to create selection-based interfaces and build dynamic pages that respond to user interaction.

[example preview="top-frame" playground="true" imports="amp-bind"]
```html
<head>
  <meta
    name="amp-script-src"
    content="sha384-qdYQLoj2SRKXBu33BwIoyRKorw0b0nQ8UPIoIMc9wL8KVLcKODSAK52yNGQNS_vN"
  />
  <style amp-custom>
    .clickedButton {
      border: 5px solid green;
    }
  </style>
</head>
<body>
<amp-script width="200" height="100" script="hello-world" [class]="scriptStyle">
  <button>Hello amp-script!</button>
</amp-script>
<script id="hello-world" type="text/plain" target="amp-script">
  const btn = document.querySelector('button');
  btn.addEventListener('click', () => {
    document.body.textContent = 'Hello World!';
    AMP.setState({ scriptStyle: "clickedButton" })
  });
</script>
</body>
```
[/example]

Use [this guide](personalized_experiences.md) as an introduction to the differences between the three, learn if and how to combine them with each other and use with page elements.

# Client-side rendering

This guide outlines client-side rendering possibilities in AMP. By default, AMP pages are server-side rendered. However, in certain cases it's necessary to dynamically render data on the client, such as a list of articles or items in a user’s shopping cart.

[tip type="read-on"]
Check out the [Client-side filtering](../../../examples/documentation/client-side_filtering.html) example.
[/tip]

Read [Client-side rendering](client_rendering.md) to get started with AMP components and concepts that enable rendering on the client-side.
