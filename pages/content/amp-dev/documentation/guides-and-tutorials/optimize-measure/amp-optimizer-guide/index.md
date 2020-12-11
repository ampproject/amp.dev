---
$title: Using an AMP Optimizer
$order: 2
$hidden: true
description: 'AMP Optimizers are tools that bring AMP Cache optimizations to your own site. Using an AMP Optimizer is key to creating a great page experience and achieving Core Web Vitals compliance. This guides explains how to best use an AMP Optimizer to optimizer your AMP pages.'
formats:
  - websites
  - stories
author: sebastianbenz
---

AMP Optimizers are tools that bring AMP Cache optimizations to your own site. Using an AMP Optimizer is key to creating a great [page experience](https://developers.google.com/search/docs/guides/page-experience) and achieving [Core Web Vitals](https://web.dev/vitals/) compliance. If you want to learn more about how an AMP Optimizer works, checkout our [detailed AMP Optimizations Guide](explainer.md).

## Isn’t AMP already fast?

You may be thinking: wait – isn’t AMP supposed to be fast out-of-the-box? And you would be right: the AMP runtime is optimized for speed and all valid AMP pages load fast. However, there are additional performance optimizations you can implement on your server to help the browser load AMP pages even faster.

In the beginning, AMP caches served the majority of AMP pages. These caches performed additional optimizations on pages to guarantee a strong user experience. But, over time, more surfaces started linking to AMP pages and developers began building entire websites with AMP. That's why the AMP team has started working on AMP Optimizers to allow everyone to serve AMP pages with AMP Cache like performance on their own origin.

## Integrate an AMP Optimizer

There are three ways to use an AMP optimizer:

1. Use a site generator or CMS with a built-in optimizer integration.
2. Integrate an AMP Optimizer into your build-system or server.
3. Integrate an AMP Optimizer into your hosting environment.

### CMS & Site Generators

The best way to publish optimized AMP is using a site generator or CMS with built-in AMP Optimizer support. In this case, your AMP pages will be optimized automatically. Currently, the following site generators and CMSs integrate AMP Optimizer:

- [WordPress](https://wordpress.org/) via the [AMP WordPress Plugin](https://wordpress.org/plugins/amp/)
- [Next.js](https://nextjs.org/docs/api-reference/next/amp)
- [Eleventy](https://www.11ty.dev/) via the [eleventy-amp-plugin](https://blog.amp.dev/2020/07/28/introducing-the-eleventy-amp-plugin/)
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)

### Custom Build or Server Integrations

You can also integrate an AMP Optimizer yourself. There are multiple open source AMP Optimizer implementations available:

- [AMP Optimizer (Node.js)](node-amp-optimizer.md): a Node.js based library for producing optimized AMP. Check out the our getting started guide here on amp.dev.  The implementation is maintained by the AMP team.
- [AMP Toolbox for PHP](https://github.com/ampproject/amp-toolbox-php): a PHP based library for producing optimized AMP. The implementation is maintained by the AMP team.
- [amp-renderer (Python)](https://github.com/chasefinch/amp-renderer): a Python port of the Node AMP Optimizer.

There are different integrations for pages rendered dynamically by your server and static sites:

1. **Build-time**: for static sites, it’s best to optimize AMP pages as part of the build. This approach is ideal as optimizing AMP pages does not impact serving performance. Checkout [this sample for an AMP Optimizer + Gulp integration](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/gulp).
2. **Render-time**: if websites have a more dynamic nature or are not able to apply the transformations statically, optimization can be performed after AMP documents are rendered in the server. In that case, to ensure fast serving times, it's best to cache transformed pages for subsequent requests. Caching can take place on the CDN level, on the site's internal infrastructure (eg: Memcached), or even on the server itself, if the set of pages is small enough to fit into memory. To learn more about this approach, checkout [this demo integrating AMP Optimizer into Express.JS](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer/demo/express).

### Hosting Provider Integrations

Some hosting providers allow running custom logic when deploying or serving a webpage. This can be a great option to integrate AMP Optimizer. Example integrations are:

- [Netlify AMP Optimizer Plugin](https://github.com/martinbean/netlify-plugin-amp-server-side-rendering#amp-server-side-rendering-netlify-plugin)
- [Cloudflare Workers](https://workers.cloudflare.com/) ([coming soon](https://github.com/ampproject/amp-toolbox/issues/878))
- AMP Optimizer Docker Image ([coming soon](https://github.com/ampproject/amp-toolbox/issues/879))
- [Add yours?](https://github.com/ampproject/amp.dev/issues/new?assignees=&labels=Category%3A+Content%2C+Status%3A+Pending+Triage&template=content.md&title=)
