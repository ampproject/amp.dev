const express = require('express');
const request = require('supertest');

// We want to unit test the prod mode
// and the filteredPages module needs some settings and methods
jest.setMock('@lib/config', {
  isDevMode: () => {
    return false;
  },
  getHost: () => {
    return 'http://localhost';
  },
  hosts: {
    preview: 'preview',
  },
});

const app = express();
const router = require('./pages.js');
app.use(router);

// We use non existing urls so the static handler used by page.js will call our next router
// The next router remembers the request, so we can then test the url rewriting

let lastRequest = undefined;

// eslint-disable-next-line new-cap
const next = express.Router();
next.get('/*', async (req, res) => {
  lastRequest = req;
  res.send('next');
});

app.use(next);

beforeEach(() => {
  lastRequest = undefined;
});

test('Url without extension is rewritten to .html at the end', (done) => {
  request(app)
      .get('/nonexisting/file')
      .expect(200, 'next')
      .expect(() => {
        expect(lastRequest.url).toBe('/nonexisting/file.html');
      })
      .end(done);
});

test('Url with html extension is not rewritten to extra .html at the end', (done) => {
  request(app)
      .get('/nonexisting/file.html')
      .expect(200, 'next')
      .expect(() => {
        expect(lastRequest.url).toBe('/nonexisting/file.html');
      })
      .end(done);
});

test('Url with xml extension is not rewritten to .html at the end', (done) => {
  request(app)
      .get('/nonexisting/file.xml')
      .expect(200, 'next')
      .expect(() => {
        expect(lastRequest.url).toBe('/nonexisting/file.xml');
      })
      .end(done);
});

test('Url with / at the end is rewritten to index.html at the end', (done) => {
  request(app)
      .get('/nonexisting/')
      .expect(200, 'next')
      .expect(() => {
        expect(lastRequest.url).toBe('/nonexisting/index.html');
      })
      .end(done);
});

test('Url with format website is not rewritten', (done) => {
  request(app)
      .get('/nonexisting/file.html?format=website')
      .expect(200, 'next')
      .expect(() => {
        expect(lastRequest.url).toBe('/nonexisting/file.html');
      })
      .end(done);
});


test('Url with format ads is rewritten', (done) => {
  request(app)
      .get('/nonexisting/file.html?format=ads')
      .expect(200, 'next')
      .expect(() => {
        expect(lastRequest.url).toBe('/nonexisting/file.ads.html');
      })
      .end(done);
});

test('Url with format ads is rewritten', (done) => {
  request(app)
      .get('/nonexisting/file.html?format=stories')
      .expect(200, 'next')
      .expect(() => {
        expect(lastRequest.url).toBe('/nonexisting/file.stories.html');
      })
      .end(done);
});

test('Url with format email is rewritten', (done) => {
  request(app)
      .get('/nonexisting/file.html?format=email')
      .expect(200, 'next')
      .expect(() => {
        expect(lastRequest.url).toBe('/nonexisting/file.email.html');
      })
      .end(done);
});

test('Url with format unknown is not rewritten', (done) => {
  request(app)
      .get('/nonexisting/file.html?format=unknown')
      .expect(200, 'next')
      .expect(() => {
        expect(lastRequest.url).toBe('/nonexisting/file.html');
      })
      .end(done);
});

test('redirect index.amp.html to folder', (done) => {
  request(app)
      .get('/someurl/index.amp.html')
      .expect('Location', '/someurl/')
      .expect(302, done);
});

test('redirect file.amp.html to file without amp.html', (done) => {
  request(app)
      .get('/someurl/file.amp.html')
      .expect('Location', '/someurl/file')
      .expect(302, done);
});
