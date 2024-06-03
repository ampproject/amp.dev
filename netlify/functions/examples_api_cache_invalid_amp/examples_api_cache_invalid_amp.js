const {STYLE} = require('../cache.js');

const handler = async () => {
  const body = `<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Invalid AMP</title>
    ${STYLE}
  </head>
  <body>
    <main>
    <h1>This page is not valid AMP</h1>
    </main>
  </body>
</html>
`;

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Content-Type': 'text/html',
      'Cache-Control': 'max-age=365000000, immutable',
    },
    body,
  };
};

module.exports = {handler};
