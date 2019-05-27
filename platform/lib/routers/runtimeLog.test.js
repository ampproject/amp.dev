const express = require('express');
const request = require('supertest');
const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);

const app = express();
const router = require('./runtimeLog.js');
app.use(router);

beforeEach(() => {
  fetch.resetMocks();
});

test('returns 400 on invalid version', (done) => {
  request(app)
      .get('/?version=abc&id=123')
      .expect(400, done);
});

test('returns 400 on invalid id', (done) => {
  request(app)
      .get('/?version=011905140117570&id=abc')
      .expect(400, done);
});

test('returns 404 for unresolved message', (done) => {
  fetch.mockResponse('{}', {
    status: 404,
  });
  request(app)
      .get('/?v=011905140117570&id=99999999')
      .expect(404, done);
});

test('shows message', (done) => {
  fetch.mockResponse(JSON.stringify({
    1234: {
      message: 'hello world',
    },
  }));
  request(app)
      .get('/?v=011905140117570&id=1234')
      .expect(/hello world/, done);
});


