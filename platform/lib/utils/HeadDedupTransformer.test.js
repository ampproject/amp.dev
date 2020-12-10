const AmpOptimizer = require('@ampproject/toolbox-optimizer');

const HeadDedupTransformer = require('./HeadDedupTransformer.js');

test('removes duplicate canonical link and viewport', async () => {
  expect(
    await transform(
      `<html><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="canonical" href="self1.html">
  <meta name="viewport" content="width=device-width">
  <link rel="canonical" href="self2.html">
</head>
<body>
</body></html>`
    )
  ).toEqual(
    `<html><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <link rel="canonical" href="self1.html">
  
  
</head>
<body>
</body></html>`
  );
});

async function transform(string) {
  const optimizer = AmpOptimizer.create({
    transformations: [HeadDedupTransformer],
  });
  return optimizer.transformHtml(string);
}
