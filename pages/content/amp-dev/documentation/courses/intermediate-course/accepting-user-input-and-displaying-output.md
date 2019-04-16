---
$title: Accepting User Input and Displaying Output
$order: 3
---

## Building a Newsletter Subscription Form

Studies show that every dollar spent on email marketing corresponds to several dollars more in sales. In order to keep our brand in our customers’ minds, we want to send out a regular newsletter with information about our company and deals for discounted cheese bikes and accessories. To build up our mailing list, we have to add a newsletter subscription form. Our product manager wants the form to be as follows:

- The form should accept the user’s full name and email address.

- Both fields should be required.

- If the form submission fails, an error should be displayed to the user.

- If the form submission succeeds, a welcome message with the user’s name should be displayed.

In a non-AMP page, we might reach for a basic HTML form element to collect our users’ information. AMP provides an [`<amp-form>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) component, but this component actually uses the element name "form" as well. So, what’s the difference?

In this section, we’ll explore what a traditional website form is, how AMP forms differ from traditional forms, and how to handle the response from the server when submitting AMP forms.

## Introduction To Forms

[Forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form) are used to send data from a website to a server. They contain one or more inputs into which users can enter information. Form inputs include text fields, combo boxes, checkboxes, radio buttons, and buttons. Once a user submits a form, all of the data they entered is sent to the server for processing, and a new page is loaded from the server, causing a full page refresh.

These days, users expect more from web forms. They want to know immediately if they've entered invalid data (form validation and form verification). They want to submit form data without the entire page having to refresh. Additionally, users want to know when their form data was accepted by the server and when an error occurred. Traditionally, developers have had to reach for JavaScript, [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX), and other similar technologies in order to provide these features.

AMP forms extend the behavior of normal HTML forms by providing easier ways to perform form validation, form verification, form submission, success and error messages, and more. AMP forms also provide a set of events that allow developers to execute actions against other components when forms are submitted, valid, invalid, verified, etc. These events are useful for showing a loading spinner while submitting the form, or for showing popup messages for success and error messages.

AMP forms also provide additional possibilities on the inputs that make up the forms. For example, AMP adds `change` and `input-debounced` events to each input field to make it easier to track when users change information. AMP provides additional CSS hooks to make styling your forms easier. Lastly, AMP provides some polyfills that make sure your forms work well in all browsers.

AMP provides a great deal of versatility for building forms. It’s worth spending some time browsing the documentation for [`<amp-form>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) to absorb all of the various features that AMP provides.

## Exercise 3: Building the Subscription Form

First, let's add a heading for our new subscription form. Add the following snippet just below the [`<amp-youtube>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}) component:

[sourcecode:html]
{% raw %}<h2 class="main-heading">Subscribe to our Newsletter</h2>
{% endraw %}[/sourcecode]

Using the documentation for [`<amp-form>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}), add a form below your new header that matches the following specifications:

The form should:

- Contain text inputs for the user's name and email.

- Contain a button labeled "Subscribe" (an `<input>` of type submit).

- Post form responses to `/submit-form`. **NOTE**: The server we provide in the Glitch template is programmed to listen at this endpoint. The server runs on the same base URL as your website. So, if your website is at `https://hungry-modem.glitch.me/`, then the server listens for form submissions at `https://hungry-modem.glitch.me/submit-form` (or `/submit-form` as a relative URL).

- Both input fields should be required.

Recommended style guidelines:

- Give the `<form>` element a `main-form` class.

- Wrap the name input in a `<div>` with an `input` class.

- Wrap the email input in a `<div>` with an `input` class.

- Give the button a `btn` class.

Optional style guidelines (puts the form inside a card; see screenshot below):

- Wrap the form in a `<div>` with a `subscribe-card` class.

- Wrap the `subscribe-card` `<div>` in another `<div>` with a `subscribe-card-container` class.

[tip type="read-on"]
**Note**: The server that is needed to handle our POST request is outside the scope of this course. Use the one already provided in your Glitch template (server.js) so that your form can submit the data like a typical form.[/tip]

Once you have finished, your page should look like this:

{{ image('/static/img/courses/intermediate/image3.webp', 375, 667, align='center third', caption='The subscription form') }}

### Solution

[sourcecode:html]
{% raw %}<h2 class="main-heading">Subscribe to our Newsletter</h2>
<div class="subscribe-card-container">
    <div class="subscribe-card">
        <form method="post" action-xhr="/submit-form" target="_top" class="main-form">
            <div class="input">
                <input type="text" name="name" id="form-name" required>
                <label for="form-name">Name:</label>
            </div>
            <div class="input">
                <input type="email" name="email" id="form-email" required>
                <label for="form-email">Email:</label>
            </div>
            <input type="submit" value="Subscribe" class="btn">
        </form>
    </div>
</div>
{% endraw %}[/sourcecode]

Remember to include the `<amp-form>` script in the `<head>`:

[sourcecode:html]
{% raw %}<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
{% endraw %}[/sourcecode]

## Using Templates To Give Feedback

At this point, our subscription form submits the user’s name and email, but the user has no idea whether their information was accepted or whether the server experienced an error. We want to give the users some visual feedback about what happened after they submitted the form!

`<amp-form>` provides `submit-success` and `submit-error` attributes. These can be placed on elements such as `<div>` tags that are direct children of the `<form>` element. When a form is submitted and the server responds successfully, contents in elements tagged with `submit-success` are displayed. Similarly, when a form is submitted and the server returns an error, contents in elements tagged with `submit-error` are displayed.

The contents of elements tagged with `submit-success` and `submit-error` are treated differently by AMP than the contents of other components we’ve seen and used so far. That is because these elements contain templates. Templates are a way to convert dynamic data (usually generated from a server) into pieces of HTML that get inserted into the page.

The most common type of template used in AMP pages is [`<amp-mustache>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-mustache.md', locale=doc.locale).url.path}}). This is based on the Mustache.js syntax. You can think of mustache templates as "Mad Libs" for websites. Mad Libs are stories in which certain words are missing and have to be supplied by the reader. For example, given the phrase "there are many `{adjective}` ways to pick a `{noun}` to read," a reader could choose the words "useful" and "magazine" and turn the phrase into "there are many useful ways to pick a magazine to read." (Usually, the results are a lot goofier, but we’ll try to keep it professional here.)

Similarly, mustache templates describe HTML content in which sections are missing and need to be filled in with information from a server. The templates are written in HTML, and the missing sections are identified by `{% raw %}{{ }}{% endraw %}` mustache braces. When data arrives from the server and the template is evaluated by AMP, the mustache variables are replaced with information from the server. The resultant HTML is displayed on the screen in the place where the template was defined.

For example, when given the following data:

[sourcecode:json]
{
    "name": "Bob",
    "job": "builder"
}
[/sourcecode]

And the following template:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
    <p>{{name}} is an excellent {{job}}!</p>
</template>
{% endraw %}[/sourcecode]

The following HTML is generated:

[sourcecode:html]
{% raw %}<p>Bob is an excellent builder!</p>
{% endraw %}[/sourcecode]

Mustache variables can replace more than just text. You can use mustache variables in the values of attributes as well. This is useful in defining the URL of an image. For example, when given the following data:

[sourcecode:json]
{
    "description": "Picture of a tiger",
    "url": "tiger.jpg",
    "width": 200,
    "height": 200
}
[/sourcecode]

And the following template:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
    <amp-img alt="{{description}}"
        src="images/{{url}}"
        width="{{width}}"
        height="{{height}}"
        layout="responsive">
    </amp-img>
</template>
{% endraw %}[/sourcecode]

The results will look like this:

[sourcecode:html]
{% raw %}<amp-img alt="Picture of a tiger"
  src="images/tiger.jpg"
  width="200"
  height="200"
  layout="responsive">
</amp-img>
{% endraw %}[/sourcecode]

[tip type="read-on"]
**Note**: Mustache templates have a wide range of other capabilities. You can iterate over a collection of values to display things like lists or tables of data. You can show content only if a particular variable is defined (or only if it’s not defined). You can also display unescaped HTML content. To learn more, read the [`<amp-mustache>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-mustache.md', locale=doc.locale).url.path}}) documentation![/tip]

## Exercise 4: Confirming Newsletter Subscriptions

Now it’s time to add success and error handling to our subscription form as well. Use the [`<amp-mustache>`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-mustache.md', locale=doc.locale).url.path}}) and [Success/Error Response Rendering]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}#success/error-response-rendering) documentation to add success and error messages to your subscription form that meet the following requirements:

* The success message should thank the user by name for subscribing. **HINT**: The property from the server response to use in the template is `{% raw %}{{{% endraw %}name}}`.

* The error message should simply tell the user there was an error submitting their response

Recommended style guidelines:

* Wrap both messages in a paragraph element with the class `form-submit-response`

Once you have finished, the result should look like this:

{{ image('/static/img/courses/intermediate/image8.png', 310, 549, align='center third', caption='Successful subscription message') }}

### Solution

[sourcecode:html]
{% raw %}<div class="subscribe-card-container">
    <div class="subscribe-card">
        <form method="post" class="main-form" action-xhr="/submit-form" target="_top">
            <div class="input">
                <input type="text" name="name" id="form-name" required>
                <label for="form-name">Name:</label>
            </div>
            <div class="input">
                <input type="email" name="email" id="form-email" required>
                <label for="form-email">Email:</label>
            </div>
            <input type="submit" value="Subscribe" class="btn">
            <div submit-success>
                <template type="amp-mustache">
                    <p class="form-submit-response">
                        Success! Thanks {{name}} for subscribing!
                    </p>
                </template>
            </div>
            <div submit-error>
                <template type="amp-mustache">
                    <p class="form-submit-response">
                        Oops! Sorry, there was an error.
                    </p>
                </template>
            </div>
        </form>
    </div>
</div>
{% endraw %}[/sourcecode]

Remember to include the `<amp-mustache>` library in the `<head>`:

[sourcecode:html]
{% raw %}<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
{% endraw %}[/sourcecode]
