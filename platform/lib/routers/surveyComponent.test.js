const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');

const app = express();
const router = require('./surveyComponent.js');

const VALID_RESPONSE = {
  'survey': 'string',
  'questions': [
    {
      'text': 'string',
      'answer': 'string',
    },
  ],
  'url': 'https://example.com',
  'shownAt': '2021-01-13T00:42:48.077Z',
};

function _test() {
  const env = process.env;
  const notSetUp =
    !env.GOOGLE_PRIVATE_KEY ||
    !env.SURVEY_RESPONSE_SHEET_ID ||
    !env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  return notSetUp ? test : test.skip;
}

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

test('Errors on a GET', (done) => {
  request(app).get('/fez-survey-response').expect(405).end(done);
});

_test('Validates the POSTed object', (done) => {
  request(app)
    .post('/fez-survey-response')
    .set('Accept', 'application/json')
    .send({
      'bad': 'version',
    })
    .expect(422)
    .then(() => {
      request(app)
        .post('/fez-survey-response')
        .set('Accept', 'application/json')
        .send({
          'bad': 'version',
        })
        .expect(422)
        .then(() => {
          // TODO: this needs to be mocked so that we aren't
          // actually hitting the API
          request(app)
            .post('/fez-survey-response')
            .set('Accept', 'application/json')
            .send(VALID_RESPONSE)
            .expect(200)
            .end(done);
        });
    });
});

// TODO make this actually function
_test('Submits the data to a backend', (done) => {
  request(app)
    .post('/fez-survey-response')
    .set('Accept', 'application/json')
    .send(VALID_RESPONSE)
    .then(/* do... something */)
    .end(done);
});
