const express = require('express');
const request = require('supertest');

const GO_LINKS_YAML = `
/email: /about/email
/websites: /about/websites
^/c/amp-([a-z-]+)$:
  url: /documentation/components/amp-$1
  useRegex: true
`;

jest.mock('js-yaml');
const yaml = require('js-yaml');
const {load} = jest.requireActual('js-yaml');
const goLinks = load(GO_LINKS_YAML);
yaml.load.mockReturnValue(goLinks);

const app = express();
const router = require('./go.js');
app.use(router);

test('redirects simple golink', (done) => {
  request(app)
    .get('/email')
    .expect(302)
    .expect('Location', /\/about\/email$/, done);
});

test('redirects regex golink', (done) => {
  request(app)
    .get('/c/amp-fit-text')
    .expect(302)
    .expect('Location', /\/documentation\/components\/amp-fit-text$/, done);
});

test('returns 404 on invalid golink', (done) => {
  request(app).get('/invalid').expect(404, done);
});

test('strips trailing slashes from the url', (done) => {
  request(app)
    .get('/email/')
    .expect(302)
    .expect('Location', /email$/, done);
});
