const express = require('express');
const request = require('supertest');

// The languages used here have to be in the config.js
// We do not mock the config, since it is not likely to change
const VALID_LANGUAGE_SHORT = 'en';
const VALID_LANGUAGE_LONG = 'pt_br';
const PLATFORM_HOST = require('../config.js').hosts.platform.base;

const UNIT_TEST_REDIRECTS = `
/shortcut: /some/deep/link/
/${VALID_LANGUAGE_SHORT}/old/link: /new/link/target
`;

jest.mock('js-yaml');
const yaml = require('js-yaml');
const {load} = jest.requireActual('js-yaml');
const unitTestRedirects = load(UNIT_TEST_REDIRECTS);
yaml.load.mockReturnValue(unitTestRedirects);

const app = express();
const router = require('./redirects.js');
app.use(router);

test('redirect for shortcut in default language', (done) => {
  request(app)
    .get('/shortcut')
    .expect('Location', PLATFORM_HOST + '/some/deep/link/')
    .expect(302, done);
});

test('redirect for shortcut in specific short language', (done) => {
  request(app)
    .get(`/${VALID_LANGUAGE_SHORT}/shortcut`)
    .expect(
      'Location',
      `${PLATFORM_HOST}/${VALID_LANGUAGE_SHORT}/some/deep/link/`
    )
    .expect(302, done);
});

test('redirect for shortcut in specific long language', (done) => {
  request(app)
    .get(`/${VALID_LANGUAGE_LONG}/shortcut`)
    .expect(
      'Location',
      `${PLATFORM_HOST}/${VALID_LANGUAGE_LONG}/some/deep/link/`
    )
    .expect(302, done);
});

test('no redirect for shortcut in an unknown language', (done) => {
  request(app)
    .get('/xx/shortcut')
    .set('x-forwarded-proto', 'https')
    .expect(404, done);
});

test('redirect for shortcut in default language with param', (done) => {
  request(app)
    .get('/shortcut?format=website')
    .expect('Location', `${PLATFORM_HOST}/some/deep/link/?format=website`)
    .expect(302, done);
});

test('redirect for shortcut in specific short language with params', (done) => {
  request(app)
    .get(`/${VALID_LANGUAGE_SHORT}/shortcut?format=website&foo=bar`)
    .expect(
      'Location',
      `${PLATFORM_HOST}/${VALID_LANGUAGE_SHORT}/some/deep/link/?format=website&foo=bar`
    )
    .expect(302, done);
});

test('redirect for language specific link', (done) => {
  request(app)
    .get(`/${VALID_LANGUAGE_SHORT}/old/link`)
    .expect('Location', `${PLATFORM_HOST}/new/link/target`)
    .expect(302, done);
});

test('no redirect for language specific link in default language', (done) => {
  request(app)
    .get('/old/link')
    .set('x-forwarded-proto', 'https')
    .expect(404, done);
});

test('no redirect for language specific link in other language', (done) => {
  request(app)
    .get(`/${VALID_LANGUAGE_LONG}/old/link`)
    .set('x-forwarded-proto', 'https')
    .expect(404, done);
});
