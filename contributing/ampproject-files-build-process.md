# AMPProject.org files & build process 

This document provides information on how the site is built, the purpose of certain files, and other important information if you're working with the ampproject.org site.

**Contents**

* [TL;DR;](#tldr)
* [Repository content](#repository-content)
  + [Imported docs from AMPHTML repo](#imported-docs-from-amphtml-repo)
* [Build process](#build-process)
  + [Branches](#branches)
  + [Continuous build](#continuous-build)
  + [Gulp preprocess tasks](#gulp-preprocess-tasks)
* [Localization](#localization)
* [Hosting](#hosting)

## TL;DR;

*   Content in Github repository: https://github.com/ampproject/docs 
    *   Administrators:[@bpaduch](https://github.com/bpaduch), [@pbakaus](https://github.com/pbakaus)
*   Site is built using [Grow SDK](https://grow.io/) -- a static site generator, generating HTML files from Markdown files
*   Git branches: production and master
*   CI Build: [Travis](https://travis-ci.org/ampproject/docs) nightly production build
*   Hosted on [Firebase](https://firebase.google.com/docs/hosting/)


## Repository content

The contents for the ampproject.org site can be found in the [ampproject/docs GitHub repo](https://github.com/ampproject/docs).  We use mostly Markdown, HTML, and .yaml files for the docs you see on the site. The files in the [docs repo](https://github.com/ampproject/docs) are organized per [Grow's recommended directory structure](http://grow.io/docs/directory-structure/).


```bash
├──  /assets                         # Visual assets  
├──  /content                        # All the content for the site
|    ├──  /docs                      # Content for "Docs" section
|         ├──  /_blueprint.yaml      # Blueprint for collection
|         └──   /....md              # Content document
|    ├──  /includes                  # Dynamic content to include in pages
|    ├──  /latest                    # Content for "Latest" section
|    ├──  /learn                     # Content for"About" section
|    ├──  /pages                     # HTML templates for one-off pages (home page, 404)
|    └──  /reference                 # Content for"Reference" section
|    └──  /support                   # Content for"Support" section
|
├──  /contributing                   # Github details on contributing
├──  /examples                       # Source code for embedded samples
├──  /pwa                            # PWA implementation for site
├──  /scripts                        # Scripts for automated tasks
|    ├──  component_categories.json  # Associate amp components with category
|    ├──  import_docs.js             # Imports docs from AMPHTML repo
|    ├──  import_docs.json           # Specific docs to import
|    ├──  update_blog_links.js       # Gets blogs WP and formats for site
|    ├──  update_platforms_page.js   # Updates platforms page with latest
|    └──  update_tweets.js           # Updates tweets section of site
├──  /translations                   # Extracted message cat. for localization
├──  /tutorial_source                # Source code for tutorials
└──  /views                          # Front-end template views
```


Most of the files for the ampproject.org site can be found in the docs repo, **but** we also import docs from the [amphtml](https://github.com/ampproject/amphtml) repo (these are the docs you see in the [Reference](https://ampproject-staging.firebaseapp.com/docs/reference/components) section, for example, amp-img).  More details about importing below.

### Imported docs from AMPHTML repo

A number of docs original source are located in the AMPHTML repo that we import into the build process (via [import_docs.js](https://github.com/ampproject/docs/blob/master/scripts/import_docs.js)) so that they appear on the ampproject.org site. These docs include:

*   **Reference docs**: The corresponding `amp-<name>.md` file in [`extensions/amp-<name>`](https://github.com/ampproject/amphtml/tree/master/extensions) (for example, [`amp-list.md`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/amp-list.md) in [extensions/amp-list](https://github.com/ampproject/amphtml/tree/master/extensions/amp-list)). Also, from built-in extensions from [builtins](https://github.com/ampproject/amphtml/tree/master/builtins) directory.
    *   **Note**: for an extension to be imported to the docs site, the extension must be included in the [component_categories.json](https://github.com/ampproject/docs/blob/master/scripts/component_categories.json) file.  Also, list it on the main [components](https://www.ampproject.org/docs/reference/components) page (file: [components.md](https://github.com/ampproject/docs/blob/master/content/reference/components.md)).
*   **Specifications and ads docs**:  These are listed in the [import_docs.json](https://github.com/ampproject/docs/blob/master/scripts/import_docs.json) (for example, [AMP HTML Specification](https://www.ampproject.org/docs/fundamentals/spec)).

> Why do we import instead of having the canonical file in the docs repo? Keeping the doc with source code is good for findability, smoother PRs, and incentive for developers to maintain docs.


## Build process

To build the site, we use [Grow](https://grow.io/), which generates HTML files from the markdown files and stores them in the "build" directory.  As part of the build, we use a [gulp](https://github.com/ampproject/docs/blob/master/gulpfile.js) preprocessor to run additional tasks, like formatting markup, cleaning up markup, importing docs from amphtml repo (details in the [Gulp preprocess tasks](#gulp-preprocess-tasks) section.


**Instructions for building locally**: [how-to-build-the-site](https://github.com/ampproject/docs#how-to-build-the-site)


### Branches

There are two main branches that we use to build and maintain the ampproject.org site: 


```text
------------- Production   <--  reflects what's running on www.ampproject.org 
    \
     \------- Master       <-- where code changes are made, and pull requests are made
```

### Continuous build

The ampproject.org site has a CI build process that runs on [Travis CI](https://travis-ci.org/ampproject/docs).  Requirements are defined in [.travis.yml](https://github.com/ampproject/docs/blob/master/.travis.yml)**.**


*   Every commit merged into Master kicks off a build of the Master branch.  If the build passes, the changes are reflected on the [staging](https://ampproject-staging.firebaseapp.com/) site.
*   [@bpaduch](https://github.com/bpaduch) and [@pbakaus](https://github.com/pbakaus) manually merge commits from Master into the Production branch, which kicks off a Production build.  If the build passes, the changes are live on [www.ampproject.org](http://www.ampproject.org).
*   Each night there's a Production build based off the Production branch.


### Gulp preprocess tasks

The following gulp tasks are performed in a build (details are in [gulpfile.js](https://github.com/ampproject/docs/blob/master/gulpfile.js)):

*   **build-examples**: Build the [embedded samples](https://github.com/ampproject/docs/blob/master/contributing/adding-embedded-samples-in-docs.md) that you see in the docs.
*   **import-docs**: Run [`import_docs.js`](https://github.com/ampproject/docs/blob/master/scripts/import_docs.js) to import docs from AMPHTML repo.
*   **optimize-images**: Create SVG sprite.
*   **update-blog-links**: Run [`update_blog_links.js`](https://github.com/ampproject/docs/blob/master/scripts/update_blog_links.js) to import and format blogs.
*   **update-tweets**: Run [`update_tweets.js`](https://github.com/ampproject/docs/blob/master/scripts/update_tweets.js) to import latest tweets
*   **update-platforms-page**: Run [`update_platforms_page.js`](https://github.com/ampproject/docs/blob/master/scripts/update_platforms_page.js) to get the latest [supported platforms](https://www.ampproject.org/support/faqs/supported-platforms).
*   **generate-asset-manifest**: Generate asset manifest for PWA.
*   **sass**: Create SASS from CSS resources.


## Localization

As part of the Grow syntax and build process, we provide localized version of the site.

*   Localization for [these locales](https://github.com/ampproject/docs/blob/master/podspec.yaml#L6)
*   Translated content appears in:
    *   [Translation strings](https://grow.io/docs/translations/#translatable-items) extracted in [message catalogs](https://github.com/ampproject/docs/tree/master/translations)
    *   Separate files ending in `@<locale>.md`  (for example, [`create@es.md`](https://github.com/ampproject/docs/blob/master/content/docs/getting_started/create%40es.md))


## Hosting

The ampproject.org site is hosted on [Firebase](https://firebase.google.com/docs/hosting/).
