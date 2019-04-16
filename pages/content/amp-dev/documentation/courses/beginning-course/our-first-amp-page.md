---
$title: Our First AMP Page
$order: 3
---

## Starting Our Journey

It’s our team’s first day building out our Chico’s Cheese Bike site. So far, the site is a basic HTML page, with a header containing the title of our site, an image of one of our bikes, and some marketing text.

{{ image('/static/img/courses/beginner/image17.png', 824, 790,  align='center half', caption='Our basic HTML website') }}

In your Glitch project, open index.html and verify that the HTML looks like this:

[sourcecode:html]
{% raw %}<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Chico's Cheese Bicycles</title>
    <link
      rel="shortcut icon"
      href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214"
    />
  </head>
  <body>
    <header class="headerbar"><h2>Chico's Cheese Bicycles</h2></header>
    <main>
      <div class="main-content">
        <img
          src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746"
        />
        <div class="below-hero">
          <h2 class="main-heading">What we're about</h2>
          <p class="main-text">
            We sell the only ten-speed bicycles in the world made entirely of
            cheese. They get you where you need to go, and you never arrive
            hungry. Our bikes are 100% biodegradable. And with our new
            rodent-repelling varnish they last longer than ever!
          </p>
        </div>
      </div>
    </main>
  </body>
</html>
{% endraw %}[/sourcecode]

Our team has determined that using AMP will make it easier to build the site features we want, so it’s our job to turn this HTML page into a valid AMP page.

First, we need to indicate to the world that we’re trying to build an AMP site. To do this, we’ll add some decoration to our `<html>` tag. If the `<html>` tag contains a ⚡ symbol or the word `amp`, tools like the AMP Validator and the AMP cache will treat our site as an AMP site.

In your Glitch project, add the ⚡ symbol to the `<html>` tag, like this:

[sourcecode:html]
{% raw %}<html ⚡ lang="en">{% endraw %}[/sourcecode]

This symbol is essential. It indicates that we’re making an AMP site. Next, we’ll discuss how tools such as the AMP Validator can help us determine the changes we need to make the site valid.

## Validation and the AMP Cache

We have mentioned the concept of writing “valid AMP” a few times. Let’s discuss what that means and why it matters.

First and foremost, valid AMP is important because it’s good for your users. The rules of AMP represent best practices in performance, accessibility, and security. Therefore, validation errors are AMP’s way of telling you that there’s room to improve your site for your users!

Secondly, valid AMP is important due to the usefulness of the AMP cache. The cache is a powerful part of the AMP architecture. It is a content delivery network (CDN) designed to:

- Serve only valid AMP pages.

- Allow AMP pages to be efficiently and safely preloaded.

- Perform several performance optimizations on pages in the cache.

When users request your AMP site, they may be sent the site from an AMP cache server close to them. If your site is in the AMP cache, it can be effectively preloaded in the background when you’re using search engines like Google. If users select your site from the search results, it will appear within seconds even with a poor connection. Additionally, the AMP cache will perform automatic optimizations on your site, such as:

- Caching fonts.

- Caching and compressing images, and converting them to newer formats like WebP.

- Sanitizing AMP documents to prevent cross-site scripting attacks or other vulnerabilities.

- Fixing HTML issues that might result in inconsistent rendering in various browsers; i.e., closing all tags, lowercasing attribute names, or escaping text

As you build websites with AMP and work through the exercises in these trainings, check to make sure that your sites are valid. To track validation errors, we’ll use the AMP Validator that we installed in the [course introduction]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/course-introduction.md#setting-up-the-amp-validator', locale=doc.locale).url.path}}).

## Exercise 1: Using the AMP Validator

After you have installed the AMP Validator Chrome extension, the validator will automatically run on any open page that has the AMP symbol (⚡) in its `<html>` tag, like ours does now. Open your Glitch project and look at the icon for the AMP Validator extension. It should look similar to the red one below with the badge indicating that there are 7 validation errors.

{{ image('/static/img/courses/beginner/image6.png', 58, 58,  align='center third', caption='The AMP Validator Chrome extension showing AMP issues.') }}

Clicking on the icon for the AMP Validator opens a pop-up that lists the validation errors for the current page and gives some possible solutions to our issues.

{{ image('/static/img/courses/beginner/image22.png', 1548, 1170, align='center', caption='The issues displayed in the AMP Validator Chrome Extension.') }}

For the entry about the `<img>` tag:

`The tag <img> may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?`

Click the “Debug” link at the end of the entry. The Debug link takes you directly to the line of code on your page that contains the listed error. This helps you find the errors that occur in your files, and helps provide the context necessary to understand how to fix the errors.
And don’t worry: This message might seem unclear now, but it’s an easy fix. We need to use the AMP component `<amp-img>` instead of the HTML tag `<img>`. In the [Thinking in Components]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/thinking-in-components.md', locale=doc.locale).url.path}}) section of this course, we will explore why this error appears, what `<amp-img>` is, and how to fix it.

{{ image('/static/img/courses/beginner/image16.png', 1999, 798, align='center', caption='AMP debugger showing an error inline.') }}

For any other validation error entries, click the link labeled “Learn more.” This link takes you directly from the error description to the corresponding AMP documentation that will assist you in fixing the issue.

{{ image('/static/img/courses/beginner/image21.webp', 1024, 684, align='center', caption='AMP documentation reached via the “Learn more” link in the AMP Validator.') }}

[tip type="read-on"]
**Note**: Can’t figure out how to correct an error based on the Debug and Learn More options in the AMP Validator extension? Read the full listing of validation errors and suggested corrective actions [here]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md', locale=doc.locale).url.path}}).
[/tip]

The next step is to fix these validation errors. To do that, we need to learn a little more about the required elements of an AMP page. We need to do more than add a thunderbolt to our HTML to create a valid AMP page.

## The Anatomy of an AMP Page

Every AMP page starts with the same basic template. Then, we customize and build the page out from there. This starter template is sometimes called the AMP boilerplate. The boilerplate is a combination of tags that set up the AMP runtime and help AMP pages run smoothly.

In this section, we’re going to explain a little bit about each part of the AMP boilerplate. However, you don’t need to remember to add these tags on every page you make with AMP. You can simply start your future AMP pages with [this]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/basic_markup.md', locale=doc.locale).url.path}}) boilerplate.

The following tags are required in AMP pages. Valid AMP pages must:

- Start with the `<!doctype html>` doctype.

- Contain both `<head>` and `<body>` tags.

- Contain a `<meta charset="utf-8">` tag as the first child of their `<head>` tag.

- Contain a `<meta name="viewport" content="width=device-width,minimum-scale=1">` tag inside their `<head>` tag. **Note**: It's also recommended to include `initial-scale=1`.

The following rules are specifically for setting up the AMP runtime. Valid AMP pages must also:

- Contain a top-level `<html ⚡>` tag. The lightning bolt symbol indicates that this is an AMP site. **Note**: `<html amp>` is accepted as well.

- Contain a `<script async src="https://cdn.ampproject.org/v0.js"></script>` tag inside their `<head>` tag. This loads the AMP JavaScript library. **Note**: As a
  best practice, you should include the script as early as possible in the `<head>`.

- Contain a `<link rel="canonical" href="$SOME_URL">` tag inside their `<head>`. This points to the regular HTML version of your site if it exists, or points to itself if no non-AMP version of the site exists. **Note**: You should replace `$SOME_URL` in the `href` attribute above with the actual URL of your page.

- Contain the AMP-style boilerplate code in their `<head>` tag. This CSS hides the content on the page until the AMP library has finished loading. The
  AMP-style boilerplate is the following snippet:

[sourcecode:html]
{% raw %}
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
{% endraw %}[/sourcecode]

[tip type="note"]
**Note**: The AMP boilerplate code must be copied and pasted as-is. The code is minified above, but it also works if you are using an auto-formatter on your code, such as Prettier. Make sure not to change the order of text inside of the tags above or change the values. If you want to know more about what these tags in the AMP boilerplate mean and why they are important, you can read about them in the [appendix]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/appendix.md', locale=doc.locale).url.path}}).
[/tip]

## CSS and AMP

CSS customizes the look of your websites. You will almost always add custom styles to your AMP pages. Still, be aware that AMP places some restrictions on the use of CSS:

- Styles may only live in the head of the document inside a `<style amp-custom>` tag, or as inline `style` attributes where needed. This limitation prevents loading an external stylesheet, but it also saves a network request, enables caching, and improves performance.

- An AMP page may only have one`<style amp-custom>` tag (decorated style tag).

- The page can include no more than 50K of CSS.

- The `!important` rule is restricted.

- For more disallowed or restricted CSS rules, check the documentation
  [here]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md', locale=doc.locale).url.path}}).

To practice adding custom styles to your AMP page, add the following `<style amp-custom>` tag to your page in the `<head>` and see what happens. Once you’re finished, you can remove the styles from your page.

[sourcecode:html]
{% raw %}<style amp-custom>
    body {
        font-family: sans-serif;
        line-height: 1.5rem;
        padding: 20px;
    }
    p, h2 {
        border: 1px dotted red;
    }
</style>

{% endraw %}[/sourcecode]

{{ image('/static/img/courses/beginner/image10.png', 738, 1290, align='center third', caption='Custom CSS affecting our page.') }}

## Exercise 2: Converting the rest of our HTML Page

Now it’s time to correct the validation errors on our site that we discovered in the previous exercise. To do this, we have to add the missing parts of the AMP boilerplate template to our basic HTML site.

For this and all future exercises, we’re going to apply what we’ve learned to implement real code changes to our site in Glitch. We’ll give you some hints along the way. At the end of each exercise, we’ll provide the full solution. Try to complete the exercises yourself, but if you’re stuck or need hints, feel free to copy code from the solution sections.

Additionally, at the start and end of each of these courses, we’ll provide a Glitch template that includes all of the code we’ve completed to that point. If you ever lose your current Glitch page or want to start from our solutions, you can copy code from those Glitch examples, or simply remix those examples and move forward from there.

Using the [documentation]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/basic_markup.md', locale=doc.locale).url.path}}) for the AMP boilerplate and the comments above, update your Glitch project so that only the `<img>` tag validation error persists. Additionally, to help us build Chico’s Cheese Bikes site, we’ve provided some CSS to use throughout the trainings. If you open [this](https://pastebin.com/vNws2bA1) page, the `<style amp-custom>` tag is there with the styles you need. You should copy these styles to the project you’ve been working with.

### Solution

The solution can be found in [this](https://glitch.com/~hungry-modem) Glitch example. The portion of the page containing the changes should look like this:

[sourcecode:html]
{% raw %}<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <title>Chico's Cheese Bicycles</title>
  <link rel="shortcut icon" href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214">
  <meta name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1">
  <link rel="canonical" href="https://hungry-modem.glitch.me/">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <style amp-custom>
    ... styles elided due to length ...
  </style>
</head>
{% endraw %}[/sourcecode]

## A Valid AMP Page...Almost

If you completed all the exercises above, congratulations! Your page is almost a valid AMP page. If you open your page and the Chrome DevTools (`Command+Option+I` on Mac or `Control+Shift+I` on Windows/Linux) and select the **Console** tab, you should see this message in the console, indicating that the AMP library was successfully loaded:

```
Powered by AMP ⚡ HTML
```

Next, if you open the AMP Validator extension, it shows that we’re down to the last error:

```
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
```

This is an important error to understand. Some HTML tags are not allowed in AMP documents. In some cases, AMP requires you to use an alternative. We call these custom, non-standard HTML tags “components,” and we’ll discuss them at greater length later in the next section of this training.

[tip type="note"]

**Note**: You can start your future AMP pages using the HTML [here]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/basic_markup.md', locale=doc.locale).url.path}}) as a starting point. This HTML includes the AMP boilerplate from above. It contains all the required tags and elements we’ve covered so far. Alternatively, you can customize your starting point with additional features using the boilerplate generation tool [here](https://amp.dev/boilerplate).

[/tip]
