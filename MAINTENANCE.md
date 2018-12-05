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
[stage color="dark-blue|light-blue|orange|purple|green"]
## What is AMP?
# Amp is a web component framework for easily creating user first

[Get Started](/content/amp-dev/documentation/guides-and-tutorials/index.md)
[/stage]
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
