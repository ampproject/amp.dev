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
