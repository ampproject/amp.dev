const express = require('express');
const request = require('supertest');
const linter = require('@ampproject/toolbox-linter');
const RateLimitedFetch = require('@lib/utils/rateLimitedFetch');

jest.mock('@ampproject/toolbox-linter');
jest.mock('@lib/utils/rateLimitedFetch');

let mockResponse = null;

RateLimitedFetch.mockImplementationOnce(() => {
  return {
    fetchHtmlResponse: () => mockResponse,
  };
});

const app = express();
const router = require('./api.js');
app.use(router);

test('returns linter result and page info with no components', (done) => {
  mockResponse = {
    url: 'https://www.test',
    redirected: false,
    text: () => '<html><head></head><body></body></html>',
  };
  linter.lint.mockResolvedValue({
    'isvalid': {
      status: 'FAIL',
    },
  });

  request(app)
    .get('/lint?url=https://www.test')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBe('ok');
      expect(res.body.https).toBe(true);
      expect(res.body.redirected).toBe(false);
      expect(res.body.url).toBe('https://www.test');
      expect(res.body.components).toEqual({});
      expect(res.body.data.isvalid.status).toBe('FAIL');
      done();
    });
});

test('returns linter result and redirected page with 1 component info', (done) => {
  mockResponse = {
    url: 'http://www.test',
    redirected: true,
    text: () =>
      '<html><head><script src="https://server/v0/amp-script-0.1.js"></script></head><body></body></html>',
  };
  linter.lint.mockResolvedValue({
    'isvalid': {
      status: 'PASS',
    },
  });

  request(app)
    .get('/lint?url=https://www.test/amp')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.status).toBe('ok');
      expect(res.body.https).toBe(false);
      expect(res.body.redirected).toBe(true);
      expect(res.body.url).toBe('http://www.test');
      expect(res.body.components).toEqual({'amp-script': '0.1'});
      expect(res.body.data.isvalid.status).toBe('PASS');
      done();
    });
});
