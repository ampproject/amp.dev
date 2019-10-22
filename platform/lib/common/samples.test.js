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
const samples = require('@lib/common/samples.js');

jest.mock(
  '../../../dist/static/samples/samples.json',
  () => ({
    'websites': {
      'categories': [
        {
          'name': 'Introduction',
          'examples': [
            {
              'title': 'No Component',
              'url':
                'http://localhost:8084/documentation/examples/introduction/amp-img',
            },
          ],
        },
        {
          'name': 'Components',
          'examples': [
            {
              'title': 'amp-3d-gltf',
              'url':
                'http://localhost:8084/documentation/examples/components/amp-3d-gltf',
            },
            {
              'title': 'amp-access-laterpay',
              'url':
                'http://localhost:8084/documentation/examples/components/amp-access-laterpay/',
            },
          ],
        },
      ],
    },
    'stories': {
      'title': 'stories',
      'name': 'stories',
      'categories': [
        {
          'name': 'Introduction',
          'examples': [
            {
              'title': 'Stories in AMP - Hello World',
              'url':
                'http://localhost:8084/documentation/examples/introduction/stories_in_amp',
            },
          ],
        },
      ],
    },
  }),
  {
    virtual: true,
  }
);

test('getExamplePreviewUrl', () => {
  const link = samples.getExamplePreviewUrl(
    'http://localhost:8080/documentation/examples/introduction/stories_in_amp/?format=websites'
  );
  expect(link).toBe(
    'http://localhost:8084/documentation/examples/introduction/stories_in_amp/'
  );
});

test('getPlaygroundUrlForPreviewLink', () => {
  const link = samples.getPlaygroundUrlForPreviewLink(
    'http://localhost:8084/documentation/examples/introduction/stories_in_amp/'
  );
  expect(link).toBe(
    'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fintroduction%2Fstories_in_amp%2F'
  );
});

test('getPlaygroundUrlForExampleLink', () => {
  const link = samples.getPlaygroundUrlForExampleLink(
    'http://localhost:8080/documentation/examples/introduction/stories_in_amp/?format=websites'
  );
  expect(link).toBe(
    'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fintroduction%2Fstories_in_amp%2F'
  );
});

test('getPlaygroundUrlForExampleLink with locale', () => {
  const link = samples.getPlaygroundUrlForExampleLink(
    'http://localhost:8080/pt_br/documentation/examples/introduction/stories_in_amp/?format=websites'
  );
  expect(link).toBe(
    'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fintroduction%2Fstories_in_amp%2F'
  );
});

test('getRelativeExampleUrlForPreviewLink', () => {
  let link = samples.getRelativeExampleUrlForPreviewLink(
    'http://localhost:8084/documentation/examples/introduction/stories_in_amp/',
    'websites'
  );
  expect(link).toBe(
    '/documentation/examples/introduction/stories_in_amp/?format=websites'
  );
  link = samples.getRelativeExampleUrlForPreviewLink(
    'http://localhost:8084/documentation/examples/introduction/stories_in_amp',
    'ads'
  );
  expect(link).toBe(
    '/documentation/examples/introduction/stories_in_amp/?format=ads'
  );
});

test('read the sample sitemap', () => {
  const sitemap = samples.readSampleSitemap();
  expect(typeof sitemap).toBe('object');
  expect(sitemap['websites'].categories.length).toBe(2);
  expect(sitemap['websites'].categories[0].examples[0].title).toBe(
    'No Component'
  );
});

test('getComponentExampleMap', () => {
  const examples = samples.getComponentExampleMap();
  expect(typeof examples).toBe('object');
  expect(examples['amp-3d-gltf'].exampleUrl).toBe(
    '/documentation/examples/components/amp-3d-gltf/?format=websites'
  );
  expect(examples['amp-3d-gltf'].playgroundUrl).toBe(
    'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fcomponents%2Famp-3d-gltf'
  );
  expect(examples['amp-access-laterpay'].exampleUrl).toBe(
    '/documentation/examples/components/amp-access-laterpay/?format=websites'
  );
  expect(examples['amp-access-laterpay'].playgroundUrl).toBe(
    'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fcomponents%2Famp-access-laterpay%2F'
  );
  expect(examples['amp-story'].exampleUrl).toBe(
    '/documentation/examples/introduction/stories_in_amp/?format=stories'
  );
  expect(examples['amp-story'].playgroundUrl).toBe(
    'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fintroduction%2Fstories_in_amp'
  );
  expect(examples['amp-img']).toBe(undefined);
});
