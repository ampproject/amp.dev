---
$title: Create your first AMP Email
$order: 0
description: 'Learn what makes AMP emails different by creating your first email.'
tutorial: true
formats:
  - email
author: CrystalOnScript
---

AMP for Email lets email senders use AMP in their email messages to support a whole host of new features. Emails written with AMP can contain interactive elements, like image carousels or accordions, content stays up-to-date in the message, and the ability for recipients to take action like responding to a form all without leaving their inbox.

AMP for Email is compatible with existing emails. The AMP version of the message is embedded into the email as a new MIME part, in addition to the HTML and plaintext, ensuring compatibility across all mail clients.

Tip: For a list of email platforms (ESPs), clients and providers that support AMP for Email, refer to [Supported Email Platforms](../../../support/faq/email-support.md) in the FAQ.

Follow this tutorial to build and send your first dynamic email powered by AMP. You can view the finished code [here](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).


# Start with the AMP email boilerplate

The AMP playground supports the AMP for Email format, allowing you to develop, test, and validate your AMP Emails. Open the [AMP Playground](https://playground.amp.dev/?runtime=amp4email) and make sure the format is set to `AMP for Email` in the top left corner. You should see the following code:


```html
<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <style amp-custom>
    h1 {
      margin: 1rem;
    }
  </style>
</head>
<body>
  <h1>Hello, I am an AMP EMAIL!</h1>
</body>
</html>
```

It contains all the required markup and the minimum code to be a valid AMP email. Also note the many other examples of valid email templates in the drop down list on the top right drop down menu.

Let's take a moment to call out some notable differences from classic HTML emails:

*   AMP emails must identify themselves as such by including `⚡4email`, or `amp4email`, in the html tag.
*   The `<head>` tag must also contain a `<script>` tag that loads the AMP runtime.
`<script async src="https://cdn.ampproject.org/v0.js"></script>`
*   A CSS boilerplate to initially hide the content until AMP is loaded.
` <style amp4email-boilerplate>body{visibility:hidden}</style>`

If you have worked with emails before, the idea of placing a script into an email may set off alarm bells in your head! Rest assured, email providers who support AMP emails enforce fierce security checks that only allow vetted AMP scripts to run in their clients. This enables dynamic and interactive features to run directly in the recipients mailboxes with no security vulnerabilities! Read more about the required markup for AMP Emails here.

[tip type="important"]
Only AMP scripts for [supported components](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) can be included in AMP Emails.
[/tip]

# Include an image

Most HTML tags that are used in emails can be used in AMP emails. However, some tags, such as the `<img>` tag are replaced with an AMP equivalent, [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

The `<amp-img>` tag requires the width and height of an image is defined and unlike `<img>`, `<amp-img>` has to be explicitly closed via `</amp-img>`.

```html
<amp-img src="https://link/to/img.jpg"
         alt="photo description"
         width="100"
         height="100">
</amp-img>
```

Additionally, GIF files are supported through [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

Since emails are not hosted on your server, URLs must use absolute paths in AMP emails and must be HTTPS.

[Placekitten](https://placekitten.com/) is a website that uses images of kittens as place holders. They allow you to choose the size of an image directly in the URL!

We can include an image in our first email by adding the code below.


```html
<body>
  <amp-img src="https://placekitten.com/800/400"
           alt="Welcome"
           width="800"
           height="400">
  </amp-img>
</body>
```



## Make it responsive

Emails are viewed across a variety of devices and screen sizes, and AMP comes with a built-in layout system! With the [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) system and media queries, implementing responsive emails is easy. To size our placed kitten image to the appropriate screens, add the `layout="responsive"` attribute to your `<amp-image>`.

[tip type="read-on"]
[Read more about how AMP works with layout and media queries](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).
[/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

Grow and shrink the browser window to watch the image resize! View the [list of supported layout specific components here](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).


# Modify presentation and layout

One image is fine, but what if we want to display more? AMP for Email supports layout elements, such as accordions and sidebars.
<!-- TODO: Set up link -->
<!-- [Read here for full list of supported layout elements](). -->

For this tutorial, we're going to use [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) to display photos of cats up for adoption.

Add the `amp-carousel` script to the head of your email.

```html
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
```

Then wrap our first image in the `<amp-carousel>` tags.

```html
<amp-carousel layout="responsive"
              width="800"
              height="400"
              type="slides">
        <amp-img layout="fill" src="https://placekitten.com/800/400"  alt="Welcome" height="400" width="800"></amp-img>
</amp-carousel>
```


You might notice that nothing has changed, and that's a good thing! Our carousel has been given the attribute `type=slides`, which means it will show one photo at a time. Since we've only placed one photo within the tags it doesn't give the user slider arrows.

Next, replace the place kitten image with our AMP cats up for adoption inside your `<amp-carousel>`.


```html
<amp-carousel id="carousel-with-preview"
    width="800"
    height="400"
    layout="responsive"
    type="slides"
    on="slideChange:AMP.setState({currentCat: event.index})">
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"  alt="photo courtesy of Unsplash"></amp-img>
  <amp-img layout="fill" src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"  alt="photo courtesy of Unsplash"></amp-img>
 </amp-carousel>
```


You should now be able to change photos by clicking the navigation arrows on the left or right hand sides of the carousel!


## Send with style

AMP allows for styling in the head of the document within the `<style amp-custom>` tag. Additionally, previously banned CSS classes and pseudo-classes are now usable. [Read the full list here](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Let's update `Hello, AMP4EMAIL world` to a real title.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

And then add some styling into the head.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```



# Add Dynamic Capabilities

Classically, emails only allow for static content. Through AMP, emails are opened to an entire new world of possibilities! Users can now respond to [forms](/content/amp-dev/documentation/components/reference/amp-form.md), get [content updated dynamically list](/content/amp-dev/documentation/components/reference/amp-list.md), and interact with content.

In this tutorial, we'll use [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) to display our adoptable cat's name and a description when the user is on that cat's slide. Start by including the `amp-bind` script in the head of your email.


```html
 <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```


Next, we'll declare an AMP bind variable "myState" as a JSON string inside an [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state) tag. Since we have four cat photos, we'll include state for all four.


```html
<body>
<amp-state id="myState">
  <script type="application/json">
    {
      "cats": [
         {
          "name": "Aakash",
          "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
        },
        {
          "name": "Filip",
          "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
        },
        {
          "name": "Julian",
          "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
        },
        {
          "name": "John",
          "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
        }
      ]
    }
  </script>
</amp-state>
```


[AMP actions and events](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) trigger different states. In our case, we want to update the state when the user clicks on the carousel navigation arrows. The amp-carousel fires a [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides) event, on which we will update the `currentCat` variable using `AMP.setState`.


```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel width="800"
              height="400"
              layout="responsive"
              type="slides"
              on="slideChange:AMP.setState({ currentCat: event.index} )">
  ...
</amp-carousel>
```


This code set the state of `currentCat` to match the cat photo at the carousel index. So if we are at slide `event.index=2`, the state will map to the item in index 2 of the array.

The only thing left is to display our cat's name and descriptions. Add the following code under the closing `amp-carousel` tag.


```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```


The `amp-bind` extension uses [expressions](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) and [bindings](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) to change content dynamically. The code example above uses the `[text]` binding to update the text within the `<span>` tag each time the state is changed by evaluating the `"myState.cats[currentCat].name"` expression.

[tip type="note"]
For performance and to avoid the risk of unexpected content jumping, amp-bind does not evaluate expressions on page load. This means that the visual elements should be given a default state and not rely amp-bind for initial render.
[/tip]

Don't forget to add our cat descriptions after the `</div>` tag!


```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```


Now, when you change the cat photo in the carousel, their name and description should update too!


# Send your AMP email

To learn how to send your email to your inbox, [read more about testing AMP emails](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

Congratulations! You've sent your first AMP email!

For next steps, [read more about AMP for Email fundamentals](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
