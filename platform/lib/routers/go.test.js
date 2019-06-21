const express = require('express');
const request = require('supertest');

const app = express();
const router = require('./go.js');
app.use(router);

test('redirects simple golink', (done) => {
  request(app)
      .get('/tools')
      .expect(302)
      .expect('Location', /\/documentation\/tools$/, done);
});

test('redirects regex golink', (done) => {
  request(app)
      .get('/c/amp-fit-text')
      .expect(302)
      .expect('Location', /\/documentation\/components\/amp-fit-text$/, done);
});

test('returns 404 on invalid golink', (done) => {
  request(app)
      .get('/invalid')
      .expect(404, done);
});
