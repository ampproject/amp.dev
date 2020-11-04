---
$title: Create a UI widget with custom JavaScript
$order: 101
formats:
  - websites
tutorial: true
author:
  - morsssss
  - CrystalOnScript

description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's performance.
---

In this tutorial, you'll learn how to use `<amp-script>`, a component that allows developers to write custom JavaScript in AMP. You'll use this to build a widget that checks the contents of a password input field, only allowing it to be submitted when certain requirements are met. AMP already provides this functionality with `<amp-form>`, but `<amp-script>` will empower you to create a custom experience.

## What you'll need

* A modern web browser
* Basic knowledge of HTML, CSS, and JavaScript
* Either:
    * a local webserver and a code editor like [SublimeText](https://www.sublimetext.com) or [VSCode](https://code.visualstudio.com/)
    * _or_ [CodePen](https://codepen.io/), [Glitch](https://glitch.com/) or a similar online playground

## Background

AMP aims to make websites faster and more stable for users. Excessive JavaScript can make a webpage slow. But sometimes you need to create functionality that AMP components don't provide. In such cases, you can use the [`<amp-script>`](../../../documentation/components/reference/amp-script.md) component to write custom JavaScript.

Let's get started!

# Getting started

To get the starter code, download or clone [this github repository](https://github.com/ampproject/samples/tree/master/amp-script-tutorial). Once you've done this, `cd` into the directory you've created. You'll see two directories: `starter_code` and `finished_code`. `finished_code` contains what you'll create during this tutorial. So let's not look at that yet. Instead, `cd` into `starter_code`. This contains a webpage that implements our form using [`<amp-form>`](../../../documentation/components/reference/amp-form.md) alone, without help from `<amp-script>`.

To do this exercise, you'll need to run a webserver on your computer. If you're already doing this, you'll be all set! If so, depending on your setup, you'll be able to access the starter webpage by typing into your browser a URL like `http://localhost/amp-script-tutorial/starter_code/index.html`.

Alternately, you can set up a quick local server using something like [serve](https://www.npmjs.com/package/serve), a [Node.js](https://nodejs.org/)-based static content server. If you haven't installed Node.js, download it [here](https://nodejs.org/). Once Node is installed, type `npx serve` on your command line. You can then access your website here:

`http://localhost:5000/`

You're also free to use an online playground like [Glitch](https://glitch.com/) or [CodePen](https://codepen.io/). <a href="itch](https://glitch.com/~grove-thankful-ragdoll" target="_blank">This </a> contains the same code as the github repository, and you can start there instead if you like!

Once you've done this, you'll see our starter webpage:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/starter-form.jpg', 600, 325, layout='intrinsic', alt='Web form with email and password inputs', align='center' ) }}

Open `starter_code/index.html` in your favorite code editor. Take a look at the HTML for this form. Notice that the password `<input>` contains this attribute:

```html
on="tap:rules.show; input-debounced:rules.show"
```

This tells AMP to show the rules `<div>` when the user taps or clicks on the password `<input>`, and also after they enter any character in there. We'd prefer to use the `focus` event, which would also cover the case where the user tabs into the input. At least at the time this tutorial is being written, AMP doesn't pass this event along, so we don't have this option. Don't worry. We're about to fix that with `<amp-script>`!

The password `<input>` contains another interesting attribute:

```html
pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-z\d]).{8,}$"
```

This regular expression combines a set of smaller regular expressions, each of which expresses one of our validation rules. AMP [won't let the form be submitted ](../../../documentation/components/reference/amp-form.md#verification) until the contents of the input match. If the user tries, they'll see a error message that provides few details:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/starter-form-error.jpg', 600, 442, layout='intrinsic', alt='Web form showing error message', align='center' ) }}

[tip type="note"]
Since the code we've provided you doesn't include a webservice that handles form submissions, submitting the form won't do anything useful. Of course, you're welcome to add this feature to your own code!
[/tip]

This experience is acceptable - but unfortunately AMP can't explain which of our verification rules failed. It can't know, since we had to squash the rules into a single regular expression.

Now, let's use `<amp-script>` to build a more user-friendly experience!

# Rebuilding it with &lt;amp-script&gt;

To use `<amp-script>`, we need to import its own JavaScript. Open `index.html` and add the following to the `<head>`.

```html
<head>
 ... 
  <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>
  ...
</head>

```

`<amp-script>` lets us write our own JavaScript inline or in an external file. In this exercise, we'll write enough code to merit a separate file. Create a new directory named `js`, and add to it a new file called `validate.js`.

`<amp-script>` allows your JavaScript to manipulate its DOM children - the elements the component encloses. It copies those DOM children into a virtual DOM, and it gives your code access to this virtual DOM. In this exercise, we want our JavaScript to control our `<form>` and its contents. So, we'll wrap the `<form>` in an `<amp-script>` component, like this:

```html
<amp-script src="js/validate.js" layout="fixed" sandbox="allow-forms" height="500" width="750">
  <form method="post" action-xhr="#" target="_top" class="card">
    ...
  </form>
</amp-script>
```

Our `<amp-script>` includes the attribute `sandbox="allow-forms"`. That tells AMP it's ok for the script to modify the content of the form.

Since AMP aims to guarantee a fast, visually stable user experience, it won't let our JavaScript make unrestricted changes to the DOM at any time. Your JavaScript can make more changes if the size of the `<amp-script>` component can't change. It also allows more substantial changes after a user interaction. You can find details in [the reference documentation](../../../documentation/components/reference/amp-script.md). For this tutorial, it suffices to know that we've specified a `layout` type that isn't `container`, and we've used HTML attributes to lock down the component's size. This means that any DOM manipulations are restricted to a certain area of the page.

If you're using the [AMP validator Chrome extension](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) you will now see an error message:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/relative-url-error.png', 600, 177, layout='intrinsic', alt='Error about relative URL', align='center' ) }}

[tip type="note"]
If you don't have this extension, append `#development=1` to your URL, and AMP will output validation errors to your Console.
[/tip]

What does this mean? If your `<amp-script>` loads its JavaScript from an external file, AMP requires you to specify an absolute URL. We could fix this by using `http://localhost/js/validate.js`. But AMP also requires the use of [HTTPS](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https). So we would still get a validation error, and setting up SSL on our local webserver is outside the scope of this tutorial. If you want to do it, you can follow the instructions in [this post](https://timonweb.com/posts/running-expressjs-server-over-https/).

Next, we can remove the`pattern` attribute and its regular expression from our form: we won't need it anymore!

We're also going to remove the `on` attribute that's currently used to tell AMP to show our password rules. As foreshadowed above, we're going to instead use `<amp-script>` to capture the browser's `focus` event.

```html
pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-z\d]).{8,}$" 
on="tap:rules.show; input-debounced:rules.show"
```

Now let's make sure our `<amp-script>` is working. Open the `validate.js` file you created and add a debug message:

```js
console.log("Hello, amp-script!");
```

Go to your browser, open the console, and reload the page. Make sure you see your message!

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/hello-amp-script.png', 600, 22, layout='intrinsic', alt='Hello amp-script message in Console', align='center' ) }}

## Where's my JavaScript?

`<amp-script>` runs your JavaScript in a Web Worker. Web Workers can't access the DOM directly, so `<amp-script>` gives the worker access to a virtual copy of the DOM, which it keeps in sync with the real DOM. `<amp-script>` provides emulations of many common DOM APIs, almost all of which you can use in your JavaScript in the usual way.

If at any point you need to debug your script, you can set breakpoints in JavaScript in a Web Worker in the same way you do with any JavaScript. You just need to know where to find it. 

In Chrome DevTools, open the "Sources" tab. At the bottom you will see a long hexadecimal string like the one shown below. Expand that, then expand the "no domain" area, and you'll see your script:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/script-in-sources.png', 303, 277, layout='intrinsic', alt='amp-script JavaScript in DevTools Sources panel', align='center' ) }}

# Adding our JavaScript

Now that we know that our `<amp-script>` is working, let's write some JavaScript!

The first thing we want to do is grab the DOM elements we'll be working with and stash those in globals. Our code will use the password input, the submit button, and the area that shows the password rules. Add these three declarations to `validate.js`:

```js
const passwordBox = document.getElementById("passwordBox");
const submitButton = document.getElementById("submitButton");
const rulesArea = document.getElementById("rules");
```

Notice that we're able to use regular DOM API methods like `getElementById()`. Although our code runs in a worker, and workers lack direct access to the DOM, `<amp-script>` provides a virtual copy of the DOM and emulates some common APIs, listed [here](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md). These APIs give us enough tools to cover most use cases. But it's important to note that only a subset of the DOM API is supported. Otherwise, the JavaScript included with `<amp-script>` would be enormous, negating AMP's performance benefits!

We need to add these id's to two of the elements. Open up `index.html`, locate the password `<input>` and the submit `<button>`, and add the id's. Add a `disabled` attribute to the submit `<button>` as well, to keep the user from clicking it until we want them to.

```html
<input type=password 
       id="passwordBox"

...

<button type="submit" id="submitButton" tabindex="3" disabled>Submit</button> 
```

Reload the page. You can verify that these globals were set correctly by checking in the Console, just as you could with non-worker JavaScript:

{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/global-set.png', 563, 38, layout='intrinsic', alt='Console message showing submitButton is set', align='center' ) }}

We'll also add id's to each `<li>` in `<div id="rules">`. Each of these contains an individual rule whose color we'll want to control. And we'll remove each instance of `class="invalid"`. Our new JavaScript will add that when it's needed!

```html
<ul>
  <li id="lower">Lowercase letter</li>
  <li id="upper">Capital letter</li>
  <li id="digit">Digit</li>
  <li id="special">Special character (@$!%*?&)</li>
  <li id="eight">At least 8 characters long</li>
</ul> 
```

## Implementing our password checks in JavaScript

Next, we'll unpack the regular expressions from our `pattern` attribute. Each regex represented one of our rules. Let's add an object map to the bottom of `validate.js` that associates each rule with the criterion it checks.

```js
const checkRegexes = {
  lower: /[a-z]/,
  upper: /[A-Z]/,
  digit: /\d/,
  special: /[^a-zA-Z\d]/i,
  eight: /.{8}/
};
```

With those globals set, we're ready to write the logic that checks the password and adjusts the UI accordingly. We'll put our logic inside a function called `initCheckPassword` that takes a single argument - the DOM element of the password `<input>`. This approach conveniently stashes the DOM element in a closure.

```js
function initCheckPassword(element) {

}
```

Next, let's populate `initCheckPassword` with the functions and event listener assignments we'll need. First of all, add a small function that turns an individual rule `<li>` green if the rule passes - and another that turns it red when it fails.

```js
function initCheckPassword(el) {
  const checkPass = (el) => {
    el.classList.remove("invalid");
    el.classList.add("valid");
  };

  const checkFail = (el) => {
    el.classList.remove("valid");
    el.classList.add("invalid");
  };
};
```

Let's make those `valid` and `invalid` classes actually turn text green or red. Go back to `index.html`, and add these two rules to the `<style amp-custom>` tag:

```css
li.valid {
  color: #2d7b1f;
} 

li.invalid {
  color:#c11136;
}
```

Now we're ready to add the logic that checks the contents of the password `<input>` against our rules. Add a new function called `checkPassword()` to `initCheckPassword()`, right before the closing brace:

```js
const checkPassword = () => {
  const password = element.value;
  let failed = false;

  for (const check in checkRegexes) {
    let li = document.getElementById(check);

    if (password.match(checkRegexes[check])) {
      checkPass(li);
    } else {
      checkFail(li);
      failed = true;
    }
  }

  if (!failed) {
    submitButton.removeAttribute("disabled");
  }
};
```

This function does the following:

1. Grabs the contents of the password `<input>`.
1. Creates a flag called `failed`, initialized to `false`.
1. Iterates through each of our regexes and tests each against the password:
    * If the password fails a test, call `checkFail()` to turn the corresponding rule red. Also, set `failed` to `true`.
    * If the password passes a test, call `checkPass()` to turn the corresponding rule green.
1. Finally, if no rule failed, the password is valid, and we enable the Submit button.

All we need now are a couple of event listeners. Remember how we were unable to use the `focus` event in AMP? In `<amp-script>`, we can. Whenever the password `<input>` receives the `focus` event, we'll display the rules. And whenever the user presses a key in that input, we'll call `checkPassword()`.

Add these two event listeners to the bottom of `initCheckPassword()`, directly before the closing brace:

```js
element.addEventListener("focus", () => rulesArea.removeAttribute("hidden"));
element.addEventListener("keyup", checkPassword);
```

Finally, at the very end of `validate.js`, add a line that initializes `initCheckPassword` with the password `<input>` DOM element:

```js
initCheckPassword(passwordBox);
```

Our logic is now complete! When the password matches all our criteria, all of the rules will be green, and our submit button will be enabled. You should now be able to have an interaction like this:

<figure class="alignment-wrapper margin-">
  <amp-video width="762" height="564" layout="responsive" autoplay loop noaudio>
    <source src="/static/img/docs/tutorials/custom-javascript-tutorial/finished-project.mp4" type="video/mp4">
    <source src="/static/img/docs/tutorials/custom-javascript-tutorial/finished-project.webm" type="video/webm">
  </amp-video>
</figure>
If you get stuck, you can always refer to the working code in the `finished_code` directory.

# Congratulations! 

You've learned how to use `<amp-script>` to write your own JavaScript in AMP. You've succeeded in enhancing the `<amp-form>` component with your own custom logic and UI features! Feel free to add more functionality to your new page! And, to learn more about `<amp-script>`, check out [the reference documentation](../../../documentation/components/reference/amp-script.md).
