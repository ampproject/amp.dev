---
$title: Enable experimental features
$order: 5
description: 'AMP experimental components are released features not yet ready for wide use, so they are protected by an experimental status.'
formats:
  - websites
  - stories
  - ads
---

[AMP experimental components](https://github.com/ampproject/amphtml/tree/master/tools/experiments)
are released features not yet ready for wide use, so they are protected by an **experimental** status.

Developers and users can opt-in to using these features before they are fully released.
But they should be used with caution, as they may contain bugs or have unexpected side effects.

## Opt into the AMP Dev Channel

The AMP Dev Channel is a way to opt a browser into using a newer version of the AMP JS libraries.

The AMP Dev Channel release **may be less stable** and it may contain features not available to all users. Opt into this option if you'd like to help test new versions of AMP, report bugs or build documents that require a new feature that is not yet available to everyone.

Opting into Dev Channel is great to:

- test and play with new features not yet available to all users.
- use in quality assurance (QA) to ensure that your site is compatible with the next version of AMP.

If you find an issue that appears to only occur in the Dev Channel version of AMP, [file an issue](https://github.com/ampproject/amphtml/issues/new) with a description of the problem. Always include a URL to a page that reproduces the issue.

To opt your browser into the AMP Dev Channel, go to [the AMP experiments page](https://cdn.ampproject.org/experiments.html) and activate the "AMP Dev Channel" experiment. To get notified about important/breaking changes about AMP, subscribe to the [amphtml-announce](https://groups.google.com/forum/#!forum/amphtml-announce) mailing list.

## Enable an experimental component

#### Served from cdn.ampproject.org

For content served from [https://cdn.ampproject.org](https://cdn.ampproject.org),
go to the [AMP experiments page](https://cdn.ampproject.org/experiments.html)
and enable (or disable) any experimental component by toggling them on (or off). Opting in will set a cookie on your browser that will enable the experiment on all AMP pages served through the Google AMP Cache.

#### Served from other domains

For content served from any other domain, experiments can be toggled in the devtools console when development mode is enabled using:

```js
AMP.toggleExperiment('experiment')
```

Any AMP file that includes experimental features will fail
[AMP validation]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md', locale=doc.locale).url.path}}).
Remove these experimental components for production-ready AMP documents.

## Enable an experiment for a particular document

Document can choose to opt in a certain experiments. To do that, place a meta tag of the `amp-experiments-opt-in` name in the head of the HTML document before your AMP script (`https://cdn.ampproject.org/v0.js`). Its content value is a comma-separated string of experiment IDs to opt in.

```html
<head>
  ...
  <meta name="amp-experiments-opt-in" content="experiment-a,experiment-b">
  <!-- The meta tag needs to be placed before the AMP runtime script.-->
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  ...
</head>
```

By doing so, the specified experiments will be enabled for all visitors of the document. However, not all experiments allow document-level opt-in. For a full list of whitelisted experiments, see the `allow-doc-opt-in` attribute in the project's [`prod-config.json`](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/prod-config.json) file. Note that document opt-in can be overridden by user opt-out.

## Origin trials

[Origin trials](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md) enable developers to use an experimental feature in production and provide essential feedback.

Traditionally, a feature in experimental mode can be used in development, but cannot be pushed to production. With Origin trials, interested developers can opt-in to a test an experimental feature in production, with the following expectations:

- The test is for a limited time.
- The feature will likely undergo some changes after origin trials.

[tip type="important"]
There is a risk that some experiments will never ship as features on the AMP Project.
[/tip]

Origin trials present an opportunity to impliment and benifit from a new feature before it’s fully live. The feature will live on the develop's site, rather than guarded by an experiment, and feedback can directly influence the direction of the feature.

### Enable an origin trial

Include the following `<meta>` tag within the `<head>` tag on each page that uses the origin trial experiment: 
  
```html
<meta name="amp-experiment-token" content="{copy your token here}"> 
```

[tip type="note"]
NOTE: `"amp-experiment-token"` is the literal string, `"amp-experiment-token"`. Not the token itself (which goes into the content attribute), or the name of the experiment.
[/tip]
