---
$title: Enable experimental features
$order: 3
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

[tip type="important"]
There is a risk that some experiments will never ship as features on the AMP Project.
[/tip]

{% set experimental_components = g.docs('/content/amp-dev/documentation/components/reference')|selectattr('experimental')|list %}
{% if experimental_components|length %}
The following is a list of components that are currently in experimental status and are ready to be tested by developers for first user feedback:

<ul>
{% for component in experimental_components %}
  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li>
{% endfor %}
</ul>
{% endif %}

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

For content served from `https://*.cdn.ampproject.org`,
go to `/experiments.html` on a Google AMP Cache subdomain and enable (or disable) any experimental component by toggling them on (or off).

For example, to enable experiments on cached AMP pages whose source origin is `www.example.com`, go to `www-example-com.cdn.ampproject.org/experiments.html`.

Experiment opt-ins are saved to `localStorage` and only enables the experiment on AMP pages served from the current domain.

#### Served from other domains

For content served from non-CDN domains, experiments can be toggled in the devtools console using:

```js
AMP.toggleExperiment('experiment')
```

Any AMP file that includes experimental features will fail
[AMP validation](validation-workflow/validate_amp.md).
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

By doing so, the specified experiments will be enabled for all visitors of the document. However, not all experiments allow document-level opt-in. For a full list of allowlisted experiments, see the `allow-doc-opt-in` attribute in the project's [`prod-config.json`](https://github.com/ampproject/amphtml/blob/master/build-system/global-configs/prod-config.json) file. Note that document opt-in can be overridden by user opt-out.

## Origin trials

[Origin trials](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md) enable developers to use an experimental feature in production and provide essential feedback.

Traditionally, a feature in experimental mode can be used in development, but cannot be pushed to production. With Origin trials, interested developers can opt-in to a test an experimental feature in production, with the following expectations:

- The test is for a limited time.
- The feature will likely undergo some changes after origin trials.

Origin trials present an opportunity to implement and benefit from a new feature before it’s fully live. The feature will live on the developer's site, rather than guarded by an experiment, and feedback can directly influence the direction of the feature.

{% set trial_components = g.docs('/content/amp-dev/documentation/components/reference')|selectattr('origin_trial')|list %}
{% if trial_components|length %}
Components in the following list can currently be tested via an origin trial:

<ul>
{% for component in trial_components %}
  <li><a href="{{ component.url.path }}">{{ component.title }}</a></li>
{% endfor %}
</ul>
{% endif %}

### Enable an origin trial

Include the following `<meta>` tag within the `<head>` tag on each page that uses the origin trial experiment:

```html
<meta name="amp-experiment-token" content="{copy your token here}">
```

Note: `"amp-experiment-token"` is the literal string, `"amp-experiment-token"`. Not the token itself (which goes into the content attribute), or the name of the experiment.
