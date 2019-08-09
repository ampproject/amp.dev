const express = require('express');
const request = require('supertest');
const googleSearch = require('@lib/utils/googleSearch.js');
const samples = require('@lib/common/samples.js');

jest.mock('@lib/utils/googleSearch.js');
jest.mock('@lib/common/samples.js');

samples.getComponentExampleMap.mockReturnValue({
  'amp-test-example': {
    exampleUrl: '/documentation/examples/components/amp-test-example/',
    playgroundUrl: 'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fcomponents%2Famp-test-example',
  },
});

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
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=en&page=1')
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
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=en&page=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components.length).toBe(0);
        expect(res.body.result.pages.length).toBe(10);
        expect(res.body.nextUrl).toBe('/search/do?q=query&page=2&locale=en');
        done();
      });
});

test('returns a first page with no component highlights and next link', (done) => {
  const searchResult = createSearchResult(0, 10, 11);
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=pt_BR&page=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components.length).toBe(0);
        expect(res.body.result.pages.length).toBe(10);
        expect(res.body.nextUrl).toBe('/search/do?q=query&page=2&locale=pt_BR');
        done();
      });
});

test('returns a second page with no component highlights and no next link', (done) => {
  const searchResult = createSearchResult(2, 6, 18);
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=en&page=2')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components.length).toBe(0);
        expect(res.body.result.pages.length).toBe(8);
        expect(res.body.nextUrl).toBe(undefined);
        done();
      });
});

test('title and description are correct', (done) => {
  const searchResult = createSearchResult(2, 2, 4);
  delete searchResult.items[0].pagemap.metatags[0]['twitter:title'];
  delete searchResult.items[1].pagemap.metatags[0]['twitter:description'];
  delete searchResult.items[2].pagemap.metatags[0]['twitter:title'];
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=en&page=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        // all items will use the title from the metatags if available
        // components always should have the meta description if available
        expect(res.body.result.components[0].title).toBe('long-title-0');
        expect(res.body.result.components[0].description).toBe('description-0');
        expect(res.body.result.components[1].title).toBe('short-title-1');
        expect(res.body.result.components[1].description).toBe('snipped-1');
        // pages always have the snipped as description
        expect(res.body.result.pages[0].title).toBe('long-title-2');
        expect(res.body.result.pages[0].description).toBe('snipped-2');
        expect(res.body.result.pages[1].title).toBe('short-title-3');
        expect(res.body.result.pages[1].description).toBe('snipped-3');
        done();
      });
});

test('amp.dev urls are converted to server relative', (done) => {
  const searchResult = createSearchResult(2, 3, 5);
  searchResult.items[2].link = 'https://blog.amp.dev/some/path';
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=en&page=1')
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
  searchResult.items[0].link = 'https://amp.dev/documentation/components/amp-test-example/';
  searchResult.items[1].link = 'https://amp.dev/documentation/components/amp-no-example/';
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=en&page=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components[0].url)
            .toBe('/documentation/components/amp-test-example/');
        expect(res.body.result.components[0].exampleUrl)
            .toBe('/documentation/examples/components/amp-test-example/');
        expect(res.body.result.components[0].playgroundUrl)
            .toBe('http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fcomponents%2Famp-test-example');
        expect(res.body.result.components[1].url)
            .toBe('/documentation/components/amp-no-example/');
        expect(res.body.result.components[1].exampleUrl).toBe(undefined);
        expect(res.body.result.components[1].playgroundUrl).toBe(undefined);
        done();
      });
});

test('components with example get example with locale and playground url without', (done) => {
  const searchResult = createSearchResult(2, 0, 2);
  searchResult.items[0].link = 'https://amp.dev/pt_br/documentation/components/amp-test-example/';
  searchResult.items[1].link = 'https://amp.dev/pt_br/documentation/components/amp-no-example/';
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
      .get('/search/do?q=query&locale=pt_BR&page=1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.result.components[0].url)
            .toBe('/pt_br/documentation/components/amp-test-example/');
        expect(res.body.result.components[0].exampleUrl)
            .toBe('/pt_br/documentation/examples/components/amp-test-example/');
        expect(res.body.result.components[0].playgroundUrl)
            .toBe('http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fcomponents%2Famp-test-example');
        expect(res.body.result.components[1].url)
            .toBe('/pt_br/documentation/components/amp-no-example/');
        expect(res.body.result.components[1].exampleUrl).toBe(undefined);
        expect(res.body.result.components[1].playgroundUrl).toBe(undefined);
        done();
      });
});

test('Invalid search', (done) => {
  googleSearch.search.mockImplementation(async () => {
    throw Error('Should not be called');
  });
  request(app)
      .get('/search/do')
      .expect(400, done);
});

test('exception handling', (done) => {
  googleSearch.search.mockImplementation(async () => {
    throw Error('Expected');
  });
  request(app)
      .get('/search/do?q=query&locale=pt_BR&page=1')
      .expect(500, done);
});


test('autosuggest should return an ordered list with components,' +
    ' build ins and some important included elements', (done) => {
  request(app)
      .get('/search/autosuggest')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        // build in components
        expect(res.body.items.indexOf('amp-img')).not.toBeLessThan(0);
        // important included elements
        expect(res.body.items.indexOf('amp-state')).not.toBeLessThan(0);
        expect(res.body.items.indexOf('amp-story-page')).not.toBeLessThan(0);
        // other components
        expect(res.body.items.indexOf('amp-bind')).not.toBeLessThan(0);
        expect(res.body.items.indexOf('amp-story')).not.toBeLessThan(0);
        expect(res.body.items.indexOf('amp-youtube')).not.toBeLessThan(0);
        // sort order
        expect(res.body.items.indexOf('amp-bind'))
            .toBeLessThan(res.body.items.indexOf('amp-img'));
        expect(res.body.items.indexOf('amp-img'))
            .toBeLessThan(res.body.items.indexOf('amp-state'));
        expect(res.body.items.indexOf('amp-state'))
            .toBeLessThan(res.body.items.indexOf('amp-story'));
        expect(res.body.items.indexOf('amp-story'))
            .toBeLessThan(res.body.items.indexOf('amp-story-page'));
        expect(res.body.items.indexOf('amp-story-page'))
            .toBeLessThan(res.body.items.indexOf('amp-youtube'));
        done();
      });
});
