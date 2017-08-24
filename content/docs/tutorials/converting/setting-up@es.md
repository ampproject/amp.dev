---
$title: Configuración
$order: 0
$parent: /content/docs/tutorials/converting.md
---

## Requisitos Previos

**Antes de comenzar** este tutorial, necesitarás lo siguiente:

- Conocimientos básicos sobre HTML, CSS, y JavaScript
- Un navegador web de tu elección en el que puedas inspeccionar la cónsola JavaScript
- Un editor de texto de tu elección

## Configure su entorno de desarrollo

### Step 1. Download the code

Download the sample code for the tutorial either as a [ZIP file](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip) or via git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

Unzip the archive file (if necessary) and navigate to the directory via the command line on your computer. The directory contains several example resources files and the starting article.html page.

```shell
cd accelerated-mobile-pages-foundations
```

### Step 2. Run the sample page

To test our sample page we need to access the files from a web server. There are several ways to create a temporary local web server for the purposes of testing.  Here are some options, choose the one that works best for you:

- [“Web Server for Chrome” Google Chrome app](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [A local HTTP Python server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

{% call callout('Nota', type='note') %}
It is strongly recommended that you use HTTPS in production environments. HTTPS has several benefits beyond just security including SEO. You can read more about this topic in this [Google Webmaster blog post](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).
{% endcall %}

After setting up your local web server, access the sample article in your browser at [this URL](http://localhost:8000/article.html):

```text
http://localhost:8000/article.html
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/converting.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/converting/building-page.html"><span class="arrow-next">Próximo</span></a>
</div>
