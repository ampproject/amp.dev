const URL = require('url').URL;
const express = require('express');
const request = require('supertest');
const config = require('@lib/config');

const app = express();
const router = require('./growPages.js').growPages;
app.use(router);

// eslint-disable-next-line new-cap
const next = express.Router();
next.get('/*', async (req, res) => {
  res.send('next');
});

app.use(next);

function url(path) {
  return new URL(path, config.hosts.platform.base).toString();
}

test('URL with / at the end is not redirected', (done) => {
  request(app).get('/nonexisting/').expect(200, 'next').end(done);
});

test('URL without extension gets trailing slash', (done) => {
  request(app)
    .get('/nonexisting/file')
    .expect(301)
    .expect('Location', url('/nonexisting/file/'))
    .end(done);
});

test('URL with .html extension gets .html removed and trailing slash added', (done) => {
  request(app)
    .get('/nonexisting/file.html')
    .expect(301)
    .expect('Location', url('/nonexisting/file/'))
    .end(done);
});

test('URL with .amp.html extension gets .amp.html removed and trailing slash added', (done) => {
  request(app)
    .get('/nonexisting/file.amp.html')
    .expect(301)
    .expect('Location', url('/nonexisting/file/'))
    .end(done);
});

test('URL with .js extension is not rewritten', (done) => {
  request(app).get('/nonexisting/file.js').expect(200, 'next').end(done);
});
