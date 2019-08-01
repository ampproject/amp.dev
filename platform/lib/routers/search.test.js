const express = require('express');
const request = require('supertest');

const googleSearch = require('@lib/utils/googleSearch.js');
jest.mock('@lib/utils/googleSearch.js');

const app = express();
const router = require('./search.js');
app.use(router);


function createItem(index, isComponent) {
  const link = isComponent ? 'https://amp.dev/documentation/components/amp-comp-' + index + '/'
    : 'https://amp.dev/documentation/examples/amp-comp-' + index + '/';
  return {
    title: 'long-title-' + index,
    link: link,
    snippet: 'snipped-' + index,
    pagemap: {
      metatags: [
        {
          'twitter:description': 'description-' + index,
          'twitter:title': 'short-title-' + index,
        },
      ],
    },
  };
}

function createSearchResult(numComponents, numPages, totalResults) {
  const items = [];
  let i = 0;
  for (; i < numComponents; i++) {
    items.push(createItem(i, true));
  }
  for (; i < numComponents + numPages; i++) {
    items.push(createItem(i, false));
  }
  return {
    searchInformation: {
      totalResults: totalResults.toString(),
    },
    items: items,
  };
}

test('returns a first page with component highlights and no next link', (done) => {
  const searchResult = createSearchResult(2, 8, 10);
  googleSearch.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=pt_BR&page=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components.length).toBe(2);
        expect(res.body.result.pages.length).toBe(8);
        expect(res.body.nextUrl).toBe(undefined);
        done();
      });
});

test('returns a first page with no component highlights and next link', (done) => {
  const searchResult = createSearchResult(0, 10, 11);
  googleSearch.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=pt_BR&page=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components.length).toBe(0);
        expect(res.body.result.pages.length).toBe(10);
        expect(res.body.nextUrl).toBe('/search/do?q=query&locale=pt_BR&page=2');
        done();
      });
});

test('returns a second page with no component highlights and no next link', (done) => {
  const searchResult = createSearchResult(2, 6, 18);
  googleSearch.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=pt_BR&page=2')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components.length).toBe(0);
        expect(res.body.result.pages.length).toBe(8);
        expect(res.body.nextUrl).toBe(undefined);
        done();
      });
});

test('amp.dev urls are converted to server relative', (done) => {
  const searchResult = createSearchResult(2, 3, 5);
  searchResult.items[2].link = 'https://blog.amp.dev/some/path';
  googleSearch.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=pt_BR&page=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components[0].url).toBe('/documentation/components/amp-comp-0/');
        expect(res.body.result.components[1].url).toBe('/documentation/components/amp-comp-1/');
        expect(res.body.result.pages[0].url).toBe('https://blog.amp.dev/some/path');
        expect(res.body.result.pages[1].url).toBe('/documentation/examples/amp-comp-3/');
        done();
      });
});

test('components with example get example and playground urls', (done) => {
  const searchResult = createSearchResult(2, 0, 2);
  searchResult.items[0].link = 'https://amp.dev/documentation/components/amp-accordion/';
  searchResult.items[1].link = 'https://amp.dev/documentation/components/amp-non-existing/';
  googleSearch.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=pt_BR&page=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components[0].url).toBe('/documentation/components/amp-accordion/');
        expect(res.body.result.components[0].exampleUrl)
            .toContain('/documentation/examples/components/amp-accordion/');
        expect(res.body.result.components[0].playgroundUrl).toMatch(
            // eslint-disable-next-line max-len
            /^https?:\/\/[^/]+\/.*?url=https?%3A%2F%2F.*%2Fdocumentation%2Fexamples%2Fcomponents%2Famp-accordion/);
        expect(res.body.result.components[1].url)
            .toBe('/documentation/components/amp-non-existing/');
        expect(res.body.result.components[1].exampleUrl).toBe(undefined);
        expect(res.body.result.components[1].playgroundUrl).toBe(undefined);
        done();
      });
});

test('exception handling', (done) => {
  googleSearch.mockImplementation(async () => {
    throw Error('Expected');
  });

  request(app)
      .get('/search/do?q=query&locale=pt_BR&page=1')
      .expect(500, done);
});
