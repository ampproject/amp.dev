const express = require('express');
const request = require('supertest');
const googleSearch = require('@lib/utils/googleSearch.js');
const samples = require('@lib/common/samples.js');

jest.mock('@lib/utils/googleSearch.js');
jest.mock('@lib/common/samples.js');

samples.getComponentExampleMap.mockReturnValue({
  'amp-test-example': {
    exampleUrl: '/documentation/examples/components/amp-test-example/',
    playgroundUrl:
      'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fcomponents%2Famp-test-example',
  },
});

const app = express();
const router = require('./search.js');
app.use(router);

function createItem(index, isComponent) {
  const link = isComponent
    ? 'https://amp.dev/documentation/components/amp-comp-' + index + '/'
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

test('returns a first page with maximum 3 component highlights', (done) => {
  const searchResult = createSearchResult(5, 5, 10);
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
    .get('/search/do?q=query&locale=en&page=1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.result.components.length).toBe(3); // components limit!
      expect(res.body.result.pages.length).toBe(7);
      done();
    });
});

test('returns a first page with no component after max index', (done) => {
  const searchResult = createSearchResult(3, 7, 10);
  // for this test we want the components at the end:
  searchResult.items = searchResult.items.reverse();
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
    .get('/search/do?q=query&locale=en&page=1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.result.components.length).toBe(1); // 2 components where after the max index
      expect(res.body.result.pages.length).toBe(9);
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
      expect(res.body.nextUrl).toBe(
        'http://localhost:8080/search/do?q=query&locale=en&page=2'
      );
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
      expect(res.body.nextUrl).toBe(
        'http://localhost:8080/search/do?q=query&locale=pt_BR&page=2'
      );
      expect(res.body.prevUrl).toBe(undefined);
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
      expect(res.body.prevUrl).toBe(
        'http://localhost:8080/search/do?q=query&locale=en&page=1'
      );
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

test('Component title is reduced to component name', (done) => {
  const searchResult = createSearchResult(2, 0, 2);
  searchResult.items[0].pagemap.metatags[0]['twitter:title'] =
    'Documentation: Component: <amp-test>';
  searchResult.items[1].pagemap.metatags[0]['twitter:title'] =
    'Documentation amp-test:';
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
    .get('/search/do?q=query&locale=en&page=1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      // when the title contains a double point only text after it is used
      expect(res.body.result.components[0].title).toBe('<amp-test>');
      // when the double point is last, the title is not changed
      expect(res.body.result.components[1].title).toBe(
        'Documentation amp-test:'
      );
      done();
    });
});

test('Title and description are cleaned', (done) => {
  const searchResult = createSearchResult(1, 0, 1);
  searchResult.items[0].pagemap.metatags[0]['twitter:title'] =
    'test `img` [text](link';
  searchResult.items[0].pagemap.metatags[0]['twitter:description'] =
    "test `img` [text]({{g.doc('/doc/').url.path}}) 123";
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
    .get('/search/do?q=query&locale=en&page=1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      // when the title contains a double point only text after it is used
      expect(res.body.result.components[0].title).toBe("test 'img' text");
      // when the double point is last, the title is not changed
      expect(res.body.result.components[0].description).toBe(
        "test 'img' text 123"
      );
      done();
    });
});

test('components with example get example and playground urls', (done) => {
  const searchResult = createSearchResult(2, 0, 2);
  searchResult.items[0].link =
    'https://amp.dev/documentation/components/amp-test-example/';
  searchResult.items[1].link =
    'https://amp.dev/documentation/components/amp-no-example/';
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
    .get('/search/do?q=query&locale=en&page=1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.result.components[0].url).toBe(
        'https://amp.dev/documentation/components/amp-test-example/'
      );
      expect(res.body.result.components[0].exampleUrl).toBe(
        'http://localhost:8080/documentation/examples/components/amp-test-example/'
      );
      expect(res.body.result.components[0].playgroundUrl).toBe(
        'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fcomponents%2Famp-test-example'
      );
      expect(res.body.result.components[1].url).toBe(
        'https://amp.dev/documentation/components/amp-no-example/'
      );
      expect(res.body.result.components[1].exampleUrl).toBe(undefined);
      expect(res.body.result.components[1].playgroundUrl).toBe(undefined);
      done();
    });
});

test('components with example get example with locale and playground url without', (done) => {
  const searchResult = createSearchResult(2, 0, 2);
  searchResult.items[0].link =
    'https://amp.dev/pt_br/documentation/components/amp-test-example/';
  searchResult.items[1].link =
    'https://amp.dev/pt_br/documentation/components/amp-no-example/';
  googleSearch.search.mockResolvedValue(searchResult);

  request(app)
    .get('/search/do?q=query&locale=pt_BR&page=1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.result.components[0].url).toBe(
        'https://amp.dev/pt_br/documentation/components/amp-test-example/'
      );
      expect(res.body.result.components[0].exampleUrl).toBe(
        'http://localhost:8080/pt_br/documentation/examples/components/amp-test-example/'
      );
      expect(res.body.result.components[0].playgroundUrl).toBe(
        'http://localhost:8083/?url=http%3A%2F%2Flocalhost%3A8084%2Fdocumentation%2Fexamples%2Fcomponents%2Famp-test-example'
      );
      expect(res.body.result.components[1].url).toBe(
        'https://amp.dev/pt_br/documentation/components/amp-no-example/'
      );
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
    .expect(200)
    .then((res) => {
      expect(res.body.result).toBeUndefined();
      done();
    });
});

test('exception handling', (done) => {
  googleSearch.search.mockImplementation(async () => {
    throw Error('Expected');
  });
  request(app).get('/search/do?q=query&locale=pt_BR&page=1').expect(500, done);
});

test(
  'autosuggest should return an ordered list with components,' +
    ' build ins and some important included elements',
  (done) => {
    request(app)
      .get('/search/autosuggest')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        // We do not explicitly test for components from 'component-versions.json'
        // since we do not have it in our control here which component is listed there.
        // (and mocking is not easily done)

        // there must be more than the build in components and elements from AmpConstants.js
        expect(res.body.items.length).not.toBeLessThan(9);
        // build in components
        expect(res.body.items.indexOf('amp-layout')).not.toBeLessThan(0);
        expect(res.body.items.indexOf('amp-pixel')).not.toBeLessThan(0);
        // important included elements
        expect(res.body.items.indexOf('amp-state')).not.toBeLessThan(0);
        expect(res.body.items.indexOf('amp-list-load-more')).not.toBeLessThan(
          0
        );
        // sort order (components and elements mixed and ordered by name)
        expect(res.body.items.indexOf('amp-layout')).toBeLessThan(
          res.body.items.indexOf('amp-list-load-more')
        );
        expect(res.body.items.indexOf('amp-list-load-more')).toBeLessThan(
          res.body.items.indexOf('amp-pixel')
        );
        done();
      });
  }
);
