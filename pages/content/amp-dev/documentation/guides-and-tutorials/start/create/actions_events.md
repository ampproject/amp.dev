---
$title: Actions and events
$order: 5
description: 'AMP embraces interactive user experiences.'
author: crystalonscript
---

AMP embraces interactive user experiences. But, for performance and user experience enhancements, it’s just done a bit differently than non-AMP pages.

AMP uses the `on` attribute to install event handlers on elements. Like attributes, some events and actions are available to common elements while others are special to certain components. For our first page, we’ll register a basic event, a user’s click, then respond with a popular action, hide.

Add a button to your page, and give it the `on` attribute:

```html
<button on="">
    Goodbye AMPHTML World!
</button>
```

The first thing we’ll define in the `on` attribute’s value is the event we’re listening for. For a user’s click via mouse on desktop or mobile touch, AMP uses the event value `tap`.

```html
<button on="tap">
```

Then, we add a colon character, then define the `id` of the target we want our action to have an effect on. We’ll hide our `<h1>` element, so let's add “hello” after the colon character.

```html
<button on="tap:hello">
```

Finally, we add a period, then define the action. In this case, it’s `hide`.

```html
<button on="tap:hello.hide">
```

Now, if we click our button the `<h1>` element is hidden! 

## Interactivity options

Read [Actions and events](https://amp.dev/documentation/guides-and-tutorials/learn/amp-actions-and-events/?format=websites) and our [Interactivity guide](https://amp.dev/documentation/guides-and-tutorials/develop/interactivity_guide/?format=websites) for more details on the types of interactions available in AMP and how to implement them. Additionally, AMP embraces custom JavaScript through the [amp-script](https://amp.dev/documentation/components/amp-script/?format=websites) component. Read the [Use custom JavaScript in AMP pages](https://amp.dev/documentation/guides-and-tutorials/develop/custom-javascript/?format=websites) guide and follow the [Create a UI widget with custom JavaScript](https://amp.dev/documentation/guides-and-tutorials/develop/custom-javascript-tutorial/?format=websites) to get started.
