---
"$title": Integrate your analytics tool with AMP
order: '1'
formats:
- websites
- stories
teaser:
  text: Überblick
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## Überblick <a name="overview"></a>

If you operate a software-as-a-service tool for publishers to better understand their traffic and visitors, you may want to integrate your service into `amp-analytics`. This will enable your customers to view traffic patterns for their AMP HTML pages.

## Bevor du beginnst <a name="before-you-begin"></a>

Before you can add your analytics service to AMP HTML runtime, you may need to:

- Identify the kinds of [variables](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md) and [requests](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#requests) you'll need in an AMP HTML document for your analytics service.
- Determine if the batching plugin function is required to construct the final url if using requests with batching behavior.
- Identify the triggers that result in analytics requests being sent from a page that would be relevant for your service.
- Consider if and how you will [track users across](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md) first-party and third-party AMP contexts.
- Determine how your analytics dashboard handles AMP traffic.
- Identify any missing functionality in `amp-analytics`, and [file requests](https://github.com/ampproject/amphtml/issues/new) for needed features.
- AMP Analytics sends its variables to a preconfigured endpoint. If you do not already have an existing endpoint, review [this sample](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample) for an overview on how to build one.
    - For all transport types except `iframe`, variables are sent as query string parameters in a HTTPS request.
    - Für die Transportart `iframe` wird ein iframe erstellt und Variablen werden via `window.postMessage` an dieses gesendet. In diesem Fall muss die Nachricht keine URL sein. Diese Option steht nur MRC-akkreditierten Anbietern zur Verfügung.
- Consider how integration with `amp-analytics` may impact any policies (particularly your privacy policy) or agreements you may have.

## Adding your configuration to the AMP HTML runtime <a name="adding-your-configuration-to-the-amp-html-runtime"></a>

1. Create an [Intent-To-Implement issue](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../CONTRIBUTING.md#contributing-features) stating that you'll be adding your analytics service's configuration to AMP HTML's runtime. Be sure to include **cc @ampproject/wg-analytics** in your description.
2. Entwickle einen Patch, der Folgendes implementiert:
    1. A new configuration json file `${vendorName}.json` in the vendors [folder](https://github.com/ampproject/amphtml/tree/master/extensions/amp-analytics/0.1/vendors) including any options above and beyond the default, such as:
        1. `"vars": {}` für zusätzliche Standardvariablen.
        2. `"requests": {}` für Anforderungen, die dein Dienst verwenden wird.
        3. `"optout":` falls erforderlich. Wir haben derzeit kein umfangreiches Opt-out System. Bitte hilf uns, eines zu entwickeln, das für deine Zwecke gut funktioniert.
        4. `"warningMessage":` if needed. Displays warning information from the vendor (such as deprecation or migration) in the console.
    2. If you are using iframe transport, also add a new line to ANALYTICS_IFRAME_TRANSPORT_CONFIG in iframe-transport-vendors.js containing `"*vendor-name*": "*url*"`
    3. Ein Beispiel in der Referenz [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html).
    4. Einen Test in der Datei [extensions/amp-analytics/0.1/test/vendor-requests.json](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../extensions/amp-analytics/0.1/test/vendor-requests.json).
    5. Add your analytics service to the supported vendors list in the [extensions/amp-analytics/0.1/analytics-vendors-list.md](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/./analytics-vendors-list.md) file. Include the type, description, and link to your usage documentation.
3. Ein neues Batch Plugin, falls erforderlich. Anweisungen findest du unter [Batch Plugin hinzufügen](#add-batch-plugin).
4. Test the new example you put in [examples/analytics-vendors.amp.html](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../examples/analytics-vendors.amp.html) to ensure the hits from the example are working as expected. For example, the data needed is being collected and displayed in your analytics dashboard.
5. Submit a Pull Request with this patch, referencing the Intent-To-Implement issue.
6. Aktualisiere die Nutzungsdokumentation deines Dienstes und informiere deine Kunden.
7. It's highly recommended to maintain [an integration test outside AMP repo](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/../../3p/README.md#adding-proper-integration-tests).

## Tag Manager <a name="tag-managers"></a>

Tag management services have two options for integrating with AMP Analytics:

- **Endpoint approach:** Acting as the an additional endpoint for `amp-analytics`, and conducting marketing management in the backend.
- **Config approach:** Conducting tag management via a dynamically generated JSON config file unique to each publisher.

The endpoint approach is the same as the standard approach detailed in the previous section. The config approach consists of creating a unique configuration for amp-analytics that is specific to each publisher and includes all of their compatible analytics packages. A publisher would include the configuration using a syntax similar to this:

[sourcecode:html]
<amp-analytics
  config="https://my-awesome-tag-manager.example.com/user-id.json"
></amp-analytics>
[/sourcecode]

To take this approach, review the documentation for publishers' integration with AMP Analytics.

## Weitere Ressourcen <a name="further-resources"></a>

- Vertiefung: [Warum nicht einfach ein iframe verwenden?](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/why-not-iframe.md)
- Deep Dive: [Managing non-authenticated user state with AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)
- [Beispiel für amp-analytics](https://github.com/ampproject/amp-publisher-sample#amp-analytics-sample)
- Referenzdokumentation zu [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- Referenzdokumentation zu den [Variablen in amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)
