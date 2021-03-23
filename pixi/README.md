# Page Experience Tool

## Setup

The Page Experience Tool relies on external APIs to provide its results. Some of them are rate limited or not publicly available at all. For the tool to work provide the following API keys as environment variables (`$ export AMP_DEV_API_KEY...=...`)

- [Google Safe Browsing API](https://developers.google.com/safe-browsing/v4): `AMP_DEV_API_KEY_SAFE_BROWSING`
- [Page Speed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started): `AMP_DEV_API_KEY_PAGE_SPEED_INSIGHTS`

## Development

To work on this tool run the following commands from the repository root (the parent folder of this directory).

Start Grow's development server with this command and wait for it to be finished.

```
gulp develop
```

Afterwards in a second terminal session start

```
npm run start:pixi
```

### Adding a new check

1. Implement the check in [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/main/packages/linter). Publish a new AMP Toolbox release.
2. Update the dependency version for the AMP Linter in the [amp.dev package.json](https://github.com/ampproject/amp.dev/blob/future/package.json#L60).
3. The result from the linter should be propagated now in the data object obtained in [AMP Linter Check](https://github.com/ampproject/amp.dev/blob/a6cd7e741d83ca5bb19f2a074c2a5d41b64906d6/pixi/backend/api.js#L86) and propagated [here](https://github.com/ampproject/amp.dev/blob/a6cd7e741d83ca5bb19f2a074c2a5d41b64906d6/pixi/src/checks/AmpLinterCheck.js#L108) and [here](https://github.com/ampproject/amp.dev/blob/a6cd7e741d83ca5bb19f2a074c2a5d41b64906d6/pixi/src/ui/PageExperience.js#L236-L249).
4. Recommendations, which surface from this data are retrieved in [here](https://github.com/ampproject/amp.dev/blob/a6cd7e741d83ca5bb19f2a074c2a5d41b64906d6/pixi/src/utils/checkAggregation/recommendations.js#L87) and correspond to the fields defined in [here](https://github.com/ampproject/amp.dev/blob/a6cd7e741d83ca5bb19f2a074c2a5d41b64906d6/pixi/src/utils/checkAggregation/recommendations.js#L19), so you have to add the key from the new property returned by the AMP linter, and the value of the `md` file annotated in [here](https://github.com/ampproject/amp.dev/tree/future/pages/content/pixi/recommendations)
5. Localization: the text which is rendered by Pixi for the recommendations will have to be added as the md file mentioned above and flagged for translation. The `@locale` suffix for these files is selected based on the language of the page that is surfacing them. The non-suffixed file is the one used by default (usually written in english)

## Using the Pixi API

Building the API:

```shell
cd pixi
npx rollup -c
```

Before using the CLI you need to configure a GCloud API key that allows access to the PageSpeedServices and Safe Browsing APIs:

```
export AMP_DEV_PIXI_APIS_KEY=YOUR_GCLOUD_API_KEY
```

Then you can use the Pixi API:

```js
const PageExperienceCli = require('./dist/Cli.js');
(async () => {
  const cli = new PageExperienceCli();
  const result = await cli.run('https://example.com');
  console.log(result);
})();
```

Which will give you:

```js
{
  lcp: '2.1 s',
  fid: '23 ms',
  cls: '0.01 ',
  labLcp: '5.6 s',
  tbt: '3060 ms',
  labCls: '0.00 ',
  safeBrowsing: 'pass',
  mobileFriendly: 'pass',
  url: 'https://axios.com',
  usedComponents: 'amp-accordion, amp-ad, amp-analytics, amp-bind, amp-list, amp-mustache, amp-form, amp-lightbox, amp-iframe, amp-jwplayer, amp-social-share',
  usesHttps: 'pass',
  recommendations: [
    { id: 'intrusive-interstitials' },
    { id: 'early-iframes', details: [Object] },
    { id: 'font-display', details: [Object] },
    { id: 'hero-images' },
    { id: 'viewport-disables-tap-delay' },
    {
      id: 'server-response-time',
      description: 'Keep the server response time for the main document short because all other requests depend on it. [Learn more](https://web.dev/time-to-first-byte/).',
      details: [Object]
    },
    {
      id: 'appropriately-sized-images',
      description: 'Serve images that are appropriately-sized to save cellular data and improve load time. [Learn more](https://web.dev/uses-responsive-images/).',
      details: [Object]
    },
    {
      id: 'next-gen-images',
      description: 'Image formats like JPEG 2000, JPEG XR, and WebP often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more](https://web.dev/uses-webp-images/).',
      details: [Object]
    },
    { id: 'resource-issues' },
    { id: 'upgrade-amp-optimizer' }
  ]
}
```
