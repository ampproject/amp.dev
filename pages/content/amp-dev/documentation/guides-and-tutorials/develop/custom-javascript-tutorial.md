---
$title: Add custom JavaScript to AMP pages with amp-script
$order: 101
formats:
  - websites
tutorial: true
author: CrystalOnScript
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
---

AMP strives to provide solutions that get developers where they want to be quickly and hassle free. However, some types of functionality are too tailored to individual use cases or require custom JavaScript. The AMP library is expanding to accommodate these needs with [`<amp-script>`]({{g.doc('/content/amp-dev/documentation/components/amp-script.md', locale=doc.locale).url.path}}?format=websites). The `amp-script` component allows AMP developers to introduce custom JavaScript that expand page features and render as valid AMP.

This tutorial will build an element with `amp-script` that communicates password requirements to end users. 

Prerequisites:



*   Familiarity with JavaScript and AMP.
*   Node.js and npm installed. You can install [Node.js here](https://nodejs.org/en/) and [npm here](https://www.npmjs.com/get-npm).
*   A local code editor.


# Get started 

Use the following commands to download and install the starter code: 

```
$ git clone git@github.com:CrystalOnScript/vanilla-js-amp-script.git
$ cd starter-code
$ npm install
```
Or download the [starter code here](https://github.com/CrystalOnScript/vanilla-js-amp-script/tree/master/starter_code). 

## Test the app

Run `npm start` and open the browser window to `http://localhost:8080/`. Our base application is an [`<amp-form>`]({{g.doc('/content/amp-dev/documentation/components/amp-form.md', locale=doc.locale).url.path}}?format=websites) component that requires an email and password for user signups. It includes some basic styling and layout. 

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app', align='' ) }}

After selecting the password input element, the [AMP `on="tap:rules.show"` action]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md', locale=doc.locale).url.path}}?format=websites) is triggered. This reveals the [`<div id="rules" hidden>`]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md', locale=doc.locale).url.path}}?format=websites#*-(all-elements)) element, where our password requirements are listed. 

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image2.jpg', 500, 604, layout='intrinsic', alt='Image of basic amp script tutorial starter app with password requirements', align='' ) }}

Play around with different passwords! If you press the submit button before all requirements are met `<amp-form>`’s [`patten`](https://amp.dev/documentation/components/amp-form?format=websites#verification) attribute will throw an error.

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image3.jpg', 500, 605, layout='intrinsic', alt='Image of basic amp script tutorial starter app with unhelpful error', align='' ) }}

Frustratingly, it will not explain what is missing. The tool tip only states the required pattern was not met. With the introduction of `<amp-script>` we can build out additional functionality that evaluate the user’s input and communicate what is missing! 


# Import `amp-script`

Like nearly all AMP components, `<amp-script>` requires a script tag. Open `index.html` and add the `amp-script` script tag to the head of the document.


```html
<head>
 ... 
  <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
  ...
</head>

```


The `amp-script` tags must be wrapped around the elements it wishes to mutate and interact with. `amp-script` is unable to mutate or interact with anything that is not a direct child of it.

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

[tip type="note"]
**Note**: Currently, the `src` attribute must point to an absolute URL.
[/tip]

The `src` attribute points to the filepath `http://localhost:8080/js/script.js`. Create a directory titled `js` and add the `script.js` file. 


# Inject custom script

Open the newly created `script.js` file and add `console.log("amp-script here")`. Reload the page and open the [DevTools console](https://developers.google.com/web/tools/chrome-devtools/) to verify it successfully logged "amp-script here". 

[tip type="important"]
**Important**: amp-script is still in experimental mode. You will need to enable it inside the console by running `AMP.toggleExperiment('amp-script')` and confirming that it returns `true`. Read more about experimental components [here](https://amp.dev/documentation/guides-and-tutorials/learn/experimental?referrer=ampproject.org). 
[/tip]

Imported script logic from the `amp-script` `src` attribute is debugged in the console, same as JavaScript inside non-AMP pages.


# Add logic

Now that we’ve confirmed our `script.js` file is being injected correctly, let’s add functionality!

HTML elements inside of the `<amp-script>` component tags are treated as web documents, allowing developers to write JavaScript the same as non-AMP pages, minus [a few small caveats](https://amp.dev/documentation/guides-and-tutorials/develop/custom-javascript?format=websites#api-restrictions).


## Declare elements

Our password checker wants to interact with each of our password requirements. Inside `script.js` we’ll declare them. 


```js
const passwordBox = document.getElementById("passwordBox");
const lowerCheck = document.getElementById("lowercase");
const upperCheck = document.getElementById("capital");
const numberCheck = document.getElementById("number");
const specialCheck = document.getElementById("special");
const lengthCheck = document.getElementById("eight");
const submitButton = document.getElementById("submitButton");
```


Like non-AMP pages, we can test if they were captured correctly by logging elements into the console. 


## Set checks

The script file will hold all of our password requirement logic by using [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) to check that passwords pass validation requirements. We want to communicate to our users when each check has been met, so each requirement has its own RegEx. Declare the checks object by adding the code below to `script.js`:


```js
const passwordChecks = [
  {
    checkRegEx: (password) => (password.search(/[a-z]/) >= 0),
    text: lowerCheck
  },
  {
    checkRegEx: (password) => (password.search(/[A-Z]/) >= 0),
    text: upperCheck
  },
  {
    checkRegEx: (password) => (password.search(/[0-9]/) >= 0),
    text: numberCheck
  },
  {
    checkRegEx: (password) => (password.search(/[^a-z0-9]/i) >= 0),
    text: specialCheck
  },
  {
    checkRegEx: (password) => (password.length >= 8),
    text: lengthCheck
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
      let passed = item.checkRegEx(element.value);
       // passed logic 
    });
};
```

User actions can trigger [mutations within the `amp-script` component ]({{g.doc('/content/amp-dev/documentation/components/amp-script.md', locale=doc.locale).url.path}}?format=websites#mutations-and-user-actions), allowing `amp-script` to register [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventListener). 

Our function will listen for two events, [`keyup`](https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event) for when a user types into the input box, and [`change`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) in case our user pastes their password.


```js
function initCheckPassword(element) {
 const checkPassword = () => {
    passwordChecks.forEach((item) => {
      let passed = item.checkRegEx(element.value);
       // passed logic 
    });
}; 
// is called when user types in input
element.addEventListener("keyup", checkPassword);
// is called if user pastes into input 
element.addEventListener("change", checkPassword);  
```


Inside the `checkPassword` function, we’ll call two more:



*   If the password passes a defined check, it will call `checkMet`, turning the font green. 
*   If the password failed a defined check, it will call `checkRemoved`, turning the font red.

```js
function initCheckPassword(element) {
  // removes invalid class and replaced with valid if check is met
  const checkMet = (listItem) => {
    listItem.classList.remove("checkFail");
    listItem.classList.add("checkPass");
  };
  // removes valid class and replaced with valid if check is deleted
  const checkRemoved = (listItem) => {
    listItem.classList.remove("checkPass");
    listItem.classList.add("checkFail");
  }
  // function goes over each check to see if its been met
  const checkPassword = () => {
    let successTest = passwordChecks.forEach((item) => {
      let passed = item.checkRegEx(element.value);
      // calls checkMet or checkRemoved
        passed ? checkMet(item.text) : checkRemoved(item.text);
    });
 }
    // is called when user types in input
    element.addEventListener("keyup", checkPassword);
    // is called if user pastes into input 
    element.addEventListener("change", checkPassword);
};
```



Both of our check functions add and remove classes from the password requirement list items within the `rules` div. The `checkFailed` class will make our text red and the `checkPassed` will change it to green. 

Just like non-AMP pages, once the `amp-script` logic adds or removes a class it will be reflected in the DOM. These classes are treated the same as all other CSS that don't work with `amp-script`. 

For this to work, we will need to add the `checkFail` class to all the items and define both `checkPass` and `checkFailed` within the `<style amp-custom>` tag in the page head. 


```html
<ul>
    <li id="lowercase" class="checkFail">Lowercase letter</li>
    <li id="capital" class="checkFail">Capital letter</li>
    <li id="number" class="checkFail">Number</li>
    <li id="special" class="checkFail">Special character (@$!%*?&)</li>
    <li id="eight" class="checkFail">At least 8 characters long</li>
</ul> 
```



```css
.checkPass {
    color: #2d7b1f;
} 
.checkFail {
    color:#c11136;
}
```


Refresh the page and type into the password input. The elements corresponding the check passed or failed should turn red or green accordingly!

<figure class="alignment-wrapper margin-">
  <amp-video layout="intrinsic" poster="/static/img/docs/guides/storiesbp/do-background-still.jpg" width="400" height="720" loop autoplay noaudio>
    <source src="/static/img/docs/tutorials/custom-javascript-tutorial/checkpassfail.mp4" type="video/mp4" />
  </amp-video>
</figure>

Our logic is now complete!


# Congratulations! 

You have successfully imported custom JavaScript into a valid AMP page and created functionality not possible with the `<amp-form>` component alone. 
