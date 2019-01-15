# Maintenance
This document holds all the information that is relevant to maintain and contribute the content for each if its packages.

## Documents

### Frontmatter
The documents inside the *pages* package are Grow documents that use the [built-in fields](http://grow.io/docs/documents/#built-in-fields) and some additional ones that are used to categorize them:

```yaml
- formats [default: websites,ads,email,stories]:
  - websites
  - ads
  - email
  - stories
- status [default: production]:
  - experimental
  - canary
  - production
- validAmp [default: true]
  - true
  - false
- draft [default: true]
  - true
  - false
- tags [default: '']
  - ads-analytics
  - dynamic-content
  - layout
  - media
  - presentation
  - social
  - personalization
```

### Format filtering
By the categorization via the `formats` list in the frontmatter the user is able to filter the documentation by one of the formats. The filtered variants of each page get generated during build time but you are also able to create custom filtered ones by duplicating the document you want to filter it and append the format it is going to be filtered by. So for example a filtered version of `index@es.md` becomes `index.ads.md`.

If the document has a specific path that is not getting inherited from the `_blueprint.yaml` also make sure to set a matching path. Same example: `index.md` has `$path: /category.html` then `index.ads.md` needs to have `$path: /category.ads.html`. Otherwise the build process is not able to match the base and the filtered variant. To not have double navigation items make sure to also give `$hidden: true` to the filtered variant.

### Shortcodes
The project enables various shortcodes to extend the basic functionality of markdown.

**Tip**
```md
[tip type="default|important|note|read-on"]
# Headline
Text.
[/tip]
```

The `type=default` can be omitted.

**Video**
```md
[video src="https://www.youtube.com/watch?v=npum8JsITQE" caption="This is the caption text."]
```

The video ID (`npum8JsITQE` in the above example) will be extracted automatically.

**Stage**
```md
<section class="ad--stage ad--container-fluid">
[stage format="websites|stories|ads|emails"]
## What is AMP?
# Amp is a web component framework for easily creating user first

[Get Started](/content/amp-dev/documentation/guides-and-tutorials/index.md)
[/stage]
</section>
```

The Link is optional and will create a button inside the stage.

**Teaser grid**
```md
[teaser-grid]
[](/content/shared/fill-ins/success-story.md)
[](/content/shared/fill-ins/success-story-2.md)
[](/content/shared/fill-ins/success-story.md)

[All success stories](#)
[/teaser-grid]
```

A list of links that will expand to a row of cards that link to the document.
