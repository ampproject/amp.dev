---
$title: Setting up
$order: 0
description: "Before starting this tutorial, you'll need the following: - A basic knowledge of HTML, CSS, and JavaScript - A basic understanding of AMP’s core concepts see ..."
$parent: /content/docs/fundamentals/add_advanced.md
---

## Prerequisites

**Before starting** this tutorial, you'll need the following:

- A basic knowledge of HTML, CSS, and JavaScript
- A basic understanding of AMP’s core concepts (see ["Convert your HTML to AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md) tutorial)
- A browser of your choice that can inspect the JavaScript console
- A text editor of your choice

## Set up your development environment

### Step 1. Download the code

Download the sample code for the tutorial either as a [ZIP file](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) or via git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

Unzip the archive file (if necessary) and navigate to the project directory through the command line on your computer:

```shell
cd accelerated-mobile-pages-advanced
```

The project directory contains several example resources files and the starting [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) page.

### Step 2. Run the sample page

To test the sample AMP page, we need to access the files from a web server. There are several ways to create a temporary local web server for the purposes of testing.  Here are some options, choose the one that works best for you:

- [“Web Server for Chrome” Google Chrome app](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [A local HTTP Python server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"]
**NOTE –** It is strongly recommended that you use HTTPS in production environments. HTTPS has several benefits beyond just security including SEO. You can read more about this topic in this [Google Webmaster blog post](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).
[/tip]

After setting up your local web server, access the sample article in your browser at [this URL](http://localhost:8000/article.amp.html):

```text
http://localhost:8000/article.amp.html
```
