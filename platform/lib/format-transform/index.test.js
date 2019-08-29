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

const {getInstance} = require('./index');

const PLATFORM_HOST = require('../config.js').hosts.platform.base;

describe('formatTransform', () => {
  let formatTransform = null;

  beforeEach(async (done) => {
    if (!formatTransform) {
      formatTransform = await getInstance();
    }
    done();
  });

  it('makes no changes when target is websites', () => {
    const input = '<html ⚡><head></head><body></body></html>';
    expect(formatTransform.transform(input, 'websites')).toBe(input);
  });

  it('changes html tag and cleans up head', () => {
    const input = s(`<!doctype html>
<html ⚡>
<head>
<link><meta><noscript></noscript>
<meta charset="utf-8">
<script async src="https://cdn.ampproject.org/v0.js"></script>
<style amp-boilerplate></style>
</head>
<body></body>
</html>`);
    const want = s(`<!doctype html>
<html ⚡4email>
<head>
<meta charset="utf-8">
<script async src="https://cdn.ampproject.org/v0.js"></script>
<style amp4email-boilerplate>body{visibility:hidden}</style>
</head>
<body></body>
</html>`);
    const output = s(formatTransform.transform(input, 'email'));
    expect(output).toBe(want);
  });

  it('makes URLs absolute', () => {
    const input = s(`<!doctype html><html ⚡><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script><style amp-boilerplate></style></head>
<body>
<a href="/something">Link</a>
<amp-img src="/something" width="1" height="1"></amp-img>
<form action-xhr="/something"></form>
</body>
</html>`);
    const want = s(`<!doctype html><html ⚡4email><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script><style amp4email-boilerplate>body{visibility:hidden}</style></head>
<body>
<a href="${PLATFORM_HOST}/something">Link</a>
<amp-img src="${PLATFORM_HOST}/something" width="1" height="1"></amp-img>
<form action-xhr="${PLATFORM_HOST}/something"></form>
</body>
</html>`);
    const output = s(formatTransform.transform(input, 'email'));
    expect(output).toBe(want);
  });

  it('removes @formats', () => {
    const input = s(`<html ⚡><head></head>
<!-- comment @formats(websites) -->
<body>
</body>
</html>`);
    const want = s(`<html ⚡><head></head>
<!-- comment  -->
<body>
</body>
</html>`);

    const output = s(formatTransform.transform(input, 'websites'));
    expect(output).toBe(want);
  });

  it('applies @formats filter', () => {
    const input = s(`<!doctype html><html ⚡><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><style amp-boilerplate></style></head>
<body>
<!-- comment @formats(websites) -->
<div>foo</div>
<!-- comment -->
<div>bar</div>
<!-- comment @formats(email) -->
<div>baz</div>
</body>
</html>`);
    const want = s(`<!doctype html><html ⚡4email><head><meta charset="utf-8"><script async src="https://cdn.ampproject.org/v0.js"></script><style amp4email-boilerplate>body{visibility:hidden}</style></head>
<body>
<!-- comment -->
<div>bar</div>
<!-- comment  -->
<div>baz</div>
</body>
</html>`);

    const output = s(formatTransform.transform(input, 'email'));
    expect(output).toBe(want);
  });

  it('returns null when result is not valid AMP', () => {
    const input = `<!doctype html><html ⚡><head></head><body></body></html>`;
    expect(formatTransform.transform(input, 'email')).toBe(null);
  });

  it('throws when format is not supported', () => {
    expect(() => {
      formatTransform.transform('<html ⚡></html>', 'foobar')
    }).toThrow();
  });
});

function s(str) {
  return str.replace(/\n/g, '').trim();
}
