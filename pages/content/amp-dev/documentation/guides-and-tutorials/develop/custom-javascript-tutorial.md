---
$title: Add custom JavaScript to AMP pages
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

Download the [starter code here](https://github.com/CrystalOnScript/vanilla-js-amp-script/tree/master/starter_code). From your command line interface, cd into the folder and run `npm install` to download the dependencies. 


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


Note: Currently, the `src` attribute must point to an absolute URL.

The `src` attribute points to the filepath `http://localhost:8080/js/script.js`. Create a directory titled `js` and add the `script.js` file. 


# Inject custom script

Open the newly created `script.js` file and add `console.log("amp-script here")`. Reload the page an open the [DevTools console](https://developers.google.com/web/tools/chrome-devtools/) to verify it successfully logged "amp-script here". 

Important: amp-script is still in experimental mode. You will need to enable it inside the console by running `AMP.toggleExperiment('amp-script')` and confirming that it returns `true`. Read more about experimental components [here](https://amp.dev/documentation/guides-and-tutorials/learn/experimental?referrer=ampproject.org). 

If custom scripts from `amp-script` are imported correctly through the `amp-script` `src` attribute, their logic can be debugged in the console the same as JavaScript inside non-AMP pages. 


# Add logic

Now that we’ve confirmed out `script.js` file is being injected correctly, let’s add functionality!

The file referenced by `amp-script` works with JavaScript in the same way as any script file. The only difference is DOM manipulation. HTML elements inside of the `<amp-script>`  component tags are treated as a web documents, allowing developers to write JavaScript the same as non-AMP pages, minus [a few small caveats](https://amp.dev/documentation/guides-and-tutorials/develop/custom-javascript?format=websites#api-restrictions).


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

The script file will hold all of our password requirement logic. Passwords are checked by running them through a [regular expression](https://en.wikipedia.org/wiki/Regular_expression). We want to communicate to our users when each check has been met, so each requirement has its own RegEx. Declare the checks object by adding the code below to `script.js`:


```js
const passwordChecks = {
  items: [
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
    }]
}

```



## Create functionality

Here’s where we add the meat of our functionality, by creating a function! Declare one called `initCheckPassword` that takes a single argument. 


```js
function initCheckPassword(el) {

};
```


We’ll then see if the element we pass as our argument can pass the defined checks.


```js
function initCheckPassword(el) {
 const checkPassword = () => {
    let failed = false;
    let successTest = passwordChecks.items.filter((item) => {
      let passed = item.checkRegEx(el.value);
       // passed logic 
    });
};
```


[Mutations within the `amp-script` component ]({{g.doc('/content/amp-dev/documentation/components/amp-script.md', locale=doc.locale).url.path}}?format=websites#mutations-and-user-actions) are generally triggered by a user action. This allows for `amp-script` to register [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventListener). 

Our function will listen for two events, [`keyup`](https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event) for when a user types into the input box, and [`change`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) in case our user pastes their password.


```js
function initCheckPassword(el) {
 const checkPassword = () => {
    let failed = false;
    let successTest = passwordChecks.items.filter((item) => {
      let passed = item.checkRegEx(el.value);
       // passed logic 
    });
}; 
// is called when user types in input
el.addEventListener("keyup", checkPassword);
// is called if user pastes into input 
el.addEventListener("change", checkPassword);  
```


Inside the `checkPassword` function, we’ll call two more:



*   If the password passes a defined check, it will call `checkMet`, turning the font green. 
*   If the password failed a defined check, it will call `checkRemoved`, turning the font red.

```js
function initCheckPassword(el) {
  // removes invalid class and replaced with valid if check is met
  const checkMet = (listItem) => {
    listItem.classList.remove("invalid");
    listItem.classList.add("valid");
    return true
  };
  // removes valid class and replaced with valid if check is deleted
  const checkRemoved = (listItem) => {
    listItem.classList.remove("valid");
    listItem.classList.add("invalid");
    return false
  }
  // function goes over each check to see if its been met
  const checkPassword = () => {
    let failed = false;
    let successTest = passwordChecks.items.filter((item) => {
      let passed = item.checkRegEx(el.value);
      // calls checkMet or checkRemoved
      return passed ? checkMet(item.text) : checkRemoved(item.text);
    });
 }
    // is called when user types in input
    el.addEventListener("keyup", checkPassword);
    // is called if user pastes into input 
    el.addEventListener("change", checkPassword);
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


Refresh the page and type into the password input. The elements corresponding the check passed or failed should turn red or green accordingly. However, we don’t signal when all checks have been passed and don’t account for the length... yet.

<figure class="alignment-wrapper margin-">
  <amp-video layout="intrinsic" poster="/static/img/docs/guides/storiesbp/do-background-still.jpg" width="400" height="720" loop autoplay noaudio>
    <source src="/static/img/docs/tutorials/custom-javascript-tutorial/checkpassfail.mp4" type="video/mp4" />
  </amp-video>
</figure>


## Communicate success 

Now that we can signal to users what checks have been passed or failed, we can create a visual cue to let them know their password is complete. Add the following if statement to the `checkPassword` function:


```js
 const checkPassword = () => {
    let failed = false;
    let successTest = passwordChecks.items.filter((item) => {
      let passed = item.checkRegEx(el.value);
      // calls checkMet or checkRemoved
      return passed ? checkMet(item.text) : checkRemoved(item.text);
    });
    // if all four checks are met and password is 8 or more char
    // successTest.length will equal 4
    if (successTest.length == 4 && el.value.length >= 8) {
      // changes length check text color
      checkMet(lengthCheck);
      // enables submit button 
      submitButton.setAttribute("class", "");
    }
  };
```


Then add the following `unclick` class to the `<style amp-custom>` tag and assign it to the form submit button in `index.html`. 


```html
<style amp-custom>
  . . .
   unclick {
        pointer-events: none; 
        color: #a9a9a9;
      }
  . . . 
</style>
. . . 
<amp-script src="http://localhost:8080/js/script.js">
    <form method="post"
    action-xhr="/form"
    target="_top"
    class="card">
    . . .
        <button type="submit" id="submitButton" class="unclick"> Submit </button>
    . . . 
 </form>
</amp-script>
```


Our logic is now complete! The text turns green and the submit button is clickable when the checks and length are met. 


# Congratulations! 

You have successfully imported custom JavaScript into a valid AMP page and created functionality not possible with the `<amp-form>` component alone. 
