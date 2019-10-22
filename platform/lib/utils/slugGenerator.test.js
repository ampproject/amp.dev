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
const SlugGenerator = require('./slugGenerator.js');

test('Test anchor generation', () => {
  const slugGenerator = new SlugGenerator();
  expect(slugGenerator.generateSlug('')).toBe('');
  expect(slugGenerator.generateSlug('TestOne')).toBe('testone');
  expect(slugGenerator.generateSlug('test two two two two two')).toBe(
    'test-two-two-two-two-two'
  );
  expect(slugGenerator.generateSlug('test[{}](three)')).toBe('testthree');
  expect(slugGenerator.generateSlug('test four')).toBe('test-four');
  expect(slugGenerator.generateSlug('test four')).toBe('test-four-1');
  expect(slugGenerator.generateSlug('test four')).toBe('test-four-2');
  expect(slugGenerator.generateSlug('test four-1')).toBe('test-four-1-1');
  expect(slugGenerator.generateSlug('test-five-1')).toBe('test-five-1');
  expect(slugGenerator.generateSlug('test-five')).toBe('test-five');
  expect(slugGenerator.generateSlug('test-five')).toBe('test-five-2');
  expect(slugGenerator.generateSlug('übung  6')).toBe('übung--6');
  expect(slugGenerator.generateSlug(' test_7 ')).toBe('test_7');
});
