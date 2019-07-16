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

const formatTransform = require('./index');

describe('formatTransform', () => {
  it('changes html tag and cleans up head', () => {
    const input = '<html ⚡><head><link><meta><noscript></noscript></head><body></body></html>';
    const want = '<html ⚡4email><head></head><body></body></html>';
    expect(formatTransform.transform(input, 'email')).toBe(want);
  });

  it('makes URLs absolute', () => {
    const input = `<html ⚡><head></head><body>
<a href="/something">Link</a>
<amp-img src="/something"></amp-img>
<form action-xhr="/something"></form>
</body></html>`;
    const want = `<html ⚡4email><head></head><body>
<a href="http://localhost:8080/something">Link</a>
<amp-img src="http://localhost:8080/something"></amp-img>
<form action-xhr="http://localhost:8080/something"></form>
</body></html>`;
    expect(formatTransform.transform(input, 'email')).toBe(want);
  });

  it('replaces boilerplate', () => {
    const input = `<html ⚡4email><head>
<style amp-boilerplate></style>
</head><body></body></html>`;
    const want = `<html ⚡4email><head>
<style amp4email-boilerplate>body{visibility:hidden}</style>
</head><body></body></html>`;
    expect(formatTransform.transform(input, 'email')).toBe(want);
  });
});
