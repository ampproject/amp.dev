---
layout: page
title: Experimental Components
order: 5
---

[AMP experimental components](https://github.com/ampproject/amphtml/tree/master/tools/experiments)
are released features not yet ready for wide use, so they are protected by an experimental status.

Developers and users can opt-in to using these features before they are fully released.
But they should be used with caution, as they may contain bugs or have unexpected side effects.

## Opt into the AMP Dev Channel

The AMP Dev Console Channel is a way to opt a browser into using a newer version of the AMP JS libraries.

To opt your browser into the AMP Dev Channel,
go to the [AMP experiments page](https://cdn.ampproject.org/experiments.html)
and activate the "AMP Dev Channel" experiment.

## Enable an experimental component

For content served from [https://cdn.ampproject.org](https://cdn.ampproject.org),
go to the [AMP experiments page](https://cdn.ampproject.org/experiments.html)
and enable (or disable) any experimental component by toggling them on (or off).

For content served from any other domain, experiments can be toggled in the devtools console when development mode is enabled using:

{% highlight javascript %}
AMP.toggleExperiment('experiment')
{% endhighlight %}

Any AMP file that includes experimental features will fail
[AMP validation](/docs/guides/validate.html).
Remove these experimental components for production-ready AMP documents.