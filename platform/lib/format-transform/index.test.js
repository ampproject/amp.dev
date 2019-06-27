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

  it('removes tags with unsupported attributes', () => {
    const input = `<html ⚡><head></head><body>
<div>This should stay</div>
<amp-img [src]="something"></amp-img>
<div>This should stay</div>
</body></html>`;
    const want = `<html ⚡4email><head></head><body>
<div>This should stay</div>

<div>This should stay</div>
</body></html>`;
    expect(formatTransform.transform(input, 'email')).toBe(want);
  });

  it('removes comments and headings', () => {
    const input = `<html ⚡><head></head><body>
<h1>This should stay</h1>
<h2>Test</h2>
<!-- Some explanation -->
<amp-img [src]="something"></amp-img>
<div>This should stay</div>
</body></html>`;
    const want = `<html ⚡4email><head></head><body>
<h1>This should stay</h1>
<div>This should stay</div>
</body></html>`;
    expect(formatTransform.transform(input, 'email')).toBe(want);
  });
});
