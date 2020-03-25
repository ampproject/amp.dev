const express = require('express');
const request = require('supertest');

jest.mock('node-fetch');
const fetch = require('node-fetch');
const {Response} = jest.requireActual('node-fetch');

const app = express();
const router = require('./runtimeLog.js');
app.use(router);

let response;
let status;

beforeEach(() => {
  jest.setMock(
    'node-fetch',
    jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: status === 200,
        status: status,
        json: () => {
          return Promise.resolve(response);
        },
      });
    })
  );
});

test('returns 400 on invalid version', (done) => {
  request(app).get('/?version=abc&id=123').expect(400, done);
});

test('returns 400 on invalid id', (done) => {
  request(app).get('/?version=011905140117570&id=abc').expect(400, done);
});

test('returns 404 for unresolved message', (done) => {
  fetch.mockReturnValue(Promise.resolve(new Response('', {status: 404})));
  request(app).get('/?v=011905140117570&id=99999999').expect(404, done);
});

test('shows message', (done) => {
  fetch.mockReturnValue(
    Promise.resolve(
      new Response(
        JSON.stringify({
          1234: {
            message: 'hello %s',
          },
        }),
        {status: 200}
      )
    )
  );
  request(app)
    .get('/?v=011905140117570&id=1234&s[]=world')
    .expect(/hello world/, done);
});
