# Page Experience Tool

## Setup

The Page Experience Tool relies on external APIs to provide it's results. Some of them are rate limited or not publicly available at all. For the tool to work provide the following API keys as environment variables (`$ export AMP_DEV_API_KEY...=...`)

- [Google Safe Browsing API](https://developers.google.com/safe-browsing/v4): `AMP_DEV_API_KEY_SAFE_BROWSING`
- [Page Speed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started): `AMP_DEV_API_KEY_PAGE_SPEED_INSIGHTS`

## Development

To work on this tool run the following commands from the repository root (the parent folder of this directory).

Start Grow's development server with this command and wait for it to be finished.

```
npm run develop
```

Afterwards in a second terminal session start

```
npm run start:pixi
```
