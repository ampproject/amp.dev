/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const express = require('express');
const URL = require('url').URL;
const {setImmutable, setMaxAge} = require('@lib/utils/cacheHelpers');

const STYLE = `
    <style amp-custom>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, 
                   sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    main {
      padding: 1rem;
      max-width: 700px;
      margin: 0 auto;
    }
    main * + * {
        margin-top: 1rem;
    }
    pre {
      padding: 1rem;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      background: #f2f2f2;
    }
    </style>
`;

// eslint-disable-next-line new-cap
const examples = express.Router();

examples.use((request, response, next) => {
  let maxAge = parseInt(request.query.maxage, 10);
  if (isNaN(maxAge)) {
    maxAge = 0;
  }
  setMaxAge(response, maxAge);
  return next();
});

examples.get('/query', (request, response) => {
  const queryString = JSON.stringify(request.query, null, 2);
  /* eslint-disable max-len */
  response.send(`<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    ${STYLE}
    <link rel="canonical" href="${request.originalUrl}">
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
`);
  /* eslint-enable max-len */
});

examples.get('/invalid-amp', (request, response) => {
  setImmutable(response);
  response.send(`<!doctype html>
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
`);
});

examples.get('/not-found', (request, response) => {
  setImmutable(response);
  response.status(404).send('404 - Not found');
});

examples.get('/redirect', (request, response) => {
  setImmutable(response);
  if (!request.query.url) {
    response
      .status()
      .send('No url specified via <code>?url=https://example.com</code>');
    return;
  }
  try {
    new URL(request.url);
  } catch (err) {
    response.status().send('Invalid url specified');
    return;
  }
  res.redirect(301, request.query.url);
});

examples.get('/server-error', (request, response) => {
  setImmutable(response);
  response.status(500).send('500 - Internal Server Error');
});

module.exports = examples;
