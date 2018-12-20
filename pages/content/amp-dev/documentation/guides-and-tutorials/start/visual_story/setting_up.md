---
$title: Setting up
$order: 1
$parent: /content/amp-dev/documentation/guides-and-tutorials/start/visual_story/index.md
---

## Prerequisites

Before starting this tutorial, you'll need the following:

- A basic knowledge of HTML, CSS, and JavaScript
- A basic understanding of AMP’s core concepts (see ["Convert your HTML to AMP"]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md', locale=doc.locale).url.path}}) tutorial)
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

Important: Make sure the URL serves from `localhost` otherwise the AMP story might not load correctly, and you may encounter errors like `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.`

Click through the completed story and get a sense of what we'll be creating.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/parts_of_story.md', locale=doc.locale).url.path}}"><span class="arrow-next">Next</span></a>
</div>
