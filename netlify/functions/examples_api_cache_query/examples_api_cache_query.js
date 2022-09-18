const {STYLE} = require('../cache.js');

const handler = async (ev) => {
  const queryString = JSON.stringify(ev.queryStringParameters, null, 2);

  /* eslint-disable max-len */
  const body = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    ${STYLE}
    <link rel="canonical" href="${ev.rawUrl}">
    <title>AMP Cache Query Demo</title>
  </head>
  <body>
    <main>
      <h1>Hello World!</h1>
      <p>Query parameters:</p>
      <pre>${queryString}</pre>
      <small>This document has been generated at: <date>${new Date()}</date></small>
    </main>
  </body>
</html>
`;
  /* eslint-enable */

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body,
  };
};

module.exports = {handler};
