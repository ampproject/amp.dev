---
$title: Setting up
$order: 0
$parent: /content/docs/tutorials/visual_story.md
---

## Prerequisites

Before starting this tutorial, you'll need the following:

- A basic knowledge of HTML, CSS, and JavaScript
- A basic understanding of AMP’s core concepts (see ["Convert your HTML to AMP"](/docs/tutorials/converting.html) tutorial)
- A browser of your choice
- A text editor of your choice

## Set up your development environment

#### Step 1. Download the code

1.  Download the code for the tutorial, which is compressed as a zip file from the following URL: <a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. Extract the contents of the zip file.  In the **amp-pets-story** directory are the images, video, audio, and data files that we'll use to create our story.  The **pets.html** file is our starting point for the story. The completed version of the story can be found in the [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html) file.


#### Step 2. Run the sample page

To test our sample story, we need to access the files from a web server. There are several ways to create a temporary local web server for the purposes of testing.  Here are some options, choose the one that works best for you:

- [“Web Server for Chrome” Google Chrome app](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [A local HTTP Python server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

After setting up your local web server, have a look at what our completed story will look like by the end of this tutorial by accessing the following <a href="http://localhost:8000/pets-completed.html">URL</a>:

```html
http://localhost:8000/pets-completed.html
```

{% call callout('Important', type='caution') %}
You may encounter a screen that states "<b>You must enable the amp-story experiment to view this content</b>". The amp-story component is currently [experimental](/docs/reference/experimental.html).  To view the story, you must click the **Enable** button to turn on the amp-story component for your domain, and then reload the page. Although not necessary for this tutorial, you might want to opt your browser into the AMP Dev Channel, which allows your browser to use a newer, experimental version of the AMP JS libraries.  You can learn more about the [AMP Dev Channel here](/docs/reference/experimental.html).
{% endcall %}

Click through the completed story and get a sense of what we'll be creating.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/docs/tutorials/visual_story.html"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="/docs/tutorials/visual_story/parts_of_story.html"><span class="arrow-next">Next</span></a>
</div>
