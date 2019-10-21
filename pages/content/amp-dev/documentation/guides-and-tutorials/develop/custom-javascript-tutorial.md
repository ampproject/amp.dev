---
$title: Build custom UI with amp-script
$order: 101
formats:
  - websites
tutorial: true
author: CrystalOnScript
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's performance.
---

AMP strives to provide solutions that get developers where they want to be quickly and hassle free. However, some types of functionality are too tailored to individual use cases or require custom JavaScript. The AMP framework is expanding to accommodate these needs with [`<amp-script>`](../../../documentation/components/reference/amp-script.md?format=websites). The `amp-script` component allows AMP developers to introduce custom JavaScript that expand page features and render as valid AMP.

This tutorial will help you build an element with `amp-script` that communicates password requirements to end users.

Prerequisites:

*   Familiarity with JavaScript and AMP.
*   Node.js and npm installed. You can install [Node.js here](https://nodejs.org/en/) and [npm here](https://www.npmjs.com/get-npm).
*   A local code editor.

# Get started

Use the following commands to download and install the starter code:

```
$ git clone https://github.com/CrystalOnScript/vanilla-js-amp-script.git
$ cd vanilla-js-amp-script/starter_code
$ npm install
```
Or download the [starter code here](https://github.com/CrystalOnScript/vanilla-js-amp-script/tree/master/starter_code).

## Test the app

Run `npm start` and open the browser window to `http://localhost:8080/`. Our base application is an [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) component that requires an email and password for user signups. It includes some basic styling and layout.

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app', align='' ) }}

After selecting the password input element, the [AMP `on="tap:rules.show"` action](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md?format=websites) is triggered. This reveals the [`<div id="rules" hidden>`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md?format=websites#-all-elements)) element, where our password requirements are listed.

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image2.jpg', 500, 604, layout='intrinsic', alt='Image of basic amp script tutorial starter app with password requirements', align='' ) }}

Play around with different passwords! If you press the submit button before all requirements are met `<amp-form>`’s [`pattern`](/content/amp-dev/documentation/components/reference/amp-form.md?format=websites#verification) attribute will throw an error.

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image3.jpg', 500, 605, layout='intrinsic', alt='Image of basic amp script tutorial starter app with unhelpful error', align='' ) }}

Frustratingly, it will not explain what is missing. The tool tip only states that the required pattern was not met. With the introduction of `<amp-script>` we can build out additional functionality that evaluate the user’s input and communicate what is missing!

# Import `amp-script`

Like nearly all AMP components, `<amp-script>` requires a script tag. Open `index.html` and add the `amp-script` script tag to the head of the document.

```html
<head>
 ...
<script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>
  ...
</head>
```

The `amp-script` component must be wrapped around the elements it wishes to mutate and interact with. `amp-script` is unable to mutate or interact with anything that is not a direct child of it.

Our functionality relays and changes the DOM of our `form`. Place the `<form>` element inside the `<amp-script>` component.

```html
<amp-script src="http://localhost:8080/js/script.js">
    <form method="post"
    action-xhr="/form"
    target="_top"
    class="card">
        . . .
    </form>
</amp-script>
```

The `src` attribute points to the filepath `http://localhost:8080/js/script.js`. Create a directory titled `js` in the `public` directory and add the `script.js` file.


# Inject custom script

Open the newly created `script.js` file and add `console.log("amp-script here")`. Reload the page and open the [DevTools console](https://developers.google.com/web/tools/chrome-devtools/) to verify it successfully logged "amp-script here".

Imported script logic from the `amp-script` `src` attribute is debugged in the console, same as JavaScript inside non-AMP pages.

# Add logic

Now that we’ve confirmed our `script.js` file is being injected correctly, let’s add functionality!

HTML elements within the `<amp-script>` tag are now accessible via standard DOM methods from within `script.js`, minus [a few small caveats](custom-javascript.md?format=websites#api-restrictions).

## Declare elements

Our password checker needs to capture the password input box, declare it on `script.js`.

```js
const passwordBox = document.getElementById("passwordBox");
```

Like non-AMP pages, we can test if it was captured correctly by logging elements into the console.

## Set checks

The script file will hold all of our password requirement logic by using [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) to check that passwords pass validation requirements. We want to communicate to our users when each check has been met, so each requirement has its own RegEx. Declare the checks object by adding the code below to `script.js`:

```js
const passwordChecks = [
  {
    test: (password) => (password.search(/[a-z]/) >= 0),
    elementId: "lowercase"
  },
  {
    test: (password) => (password.search(/[A-Z]/) >= 0),
    elementId: "capital"
  },
  {
    test: (password) => (password.search(/[0-9]/) >= 0),
    elementId: "number"
  },
  {
    test: (password) => (password.search(/[^a-z0-9]/i) >= 0),
    elementId: "special"
  },
  {
    test: (password) => (password.length >= 8),
    elementId: "eight"
  }
]

```

## Create functionality

Here is where we add our functionality, by creating a function! We'll declare one called `initCheckPassword` that takes a single argument. The argument will be the value our user enters into the password input. We’ll run it through our checks above and change our defined password rules text green or red, depending on if it has been met or not.

```js
function initCheckPassword(element) {

};
```

We’ll then see if the element we pass as our argument can pass the defined checks.

```js
function initCheckPassword(element) {
 const checkPassword = () => {
    passwordChecks.forEach((item) => {
      let passed = item.test(element.value);
       // passed/fail logic
    });
  };
};
```

User actions can trigger [mutations within the `amp-script` component ](../../../documentation/components/reference/amp-script.md?format=websites#mutations-and-user-actions), allowing `amp-script` to register [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventListener).

Our function will listen for two events, [`keyup`](https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event) for when a user types into the input box, and [`change`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) in case our user pastes their password.

```js
function initCheckPassword(element) {
 const checkPassword = () => {
    passwordChecks.forEach((item) => {
      let passed = item.test(element.value);
       // passed/fail logic
    });
    // is called when user types in input
  element.addEventListener("keyup", checkPassword);
  // is called if user pastes into input
  element.addEventListener("change", checkPassword);
  };
};
```

Inside the `checkPassword` function, we’ll toggle a class that changes our text to green if the check is passed.

```js
function initCheckPassword(element) {
  const checkPassword = () => {
    passwordChecks.forEach((item) => {
      let passed = item.test(element.value);
      // captures element
      let checkText = document.getElementById(item.elementId)
       // passed/fail logic
       checkText.classList.toggle('pass', passed)
    });
  }
    // is called when user types in input
    element.addEventListener("keyup", checkPassword);
    // is called if user pastes into input
    element.addEventListener("change", checkPassword);
};
```

For this to work, we will need to add a `check` class to all the items and define both `check` and `pass` within the `<style amp-custom>` tag in the page head.


```html
<ul>
  <li id="lowercase" class="check">Lowercase letter</li>
  <li id="capital" class="check">Capital letter</li>
  <li id="number" class="check">Number</li>
  <li id="special" class="check">Special character (@$!%*?&)</li>
  <li id="eight" class="check">At least 8 characters long</li>
</ul>
```

```css
.check {
  color:#c11136;
}
.check.pass {
  color: #2d7b1f;
}
```

Ensure you call to `initCheckPassword` in `script.js` and pass it `passwordBox` as an argument to setup the event handlers.
Our logic is now complete!

```js
initCheckPassword(passwordBox);
```

Refresh the page and type into the password input. The elements corresponding to whether the check passed or failed should turn red or green accordingly!

<figure class="alignment-wrapper margin-">
  <amp-video layout="responsive" poster="/static/img/docs/guides/storiesbp/do-background-still.jpg" width="400" height="720" loop autoplay noaudio>
    <source src="/static/img/docs/tutorials/custom-javascript-tutorial/checkpassfail.mp4" type="video/mp4" />
  </amp-video>
</figure>

# Congratulations!

You have successfully imported custom JavaScript into a valid AMP page and created functionality not possible with the `<amp-form>` component alone.
