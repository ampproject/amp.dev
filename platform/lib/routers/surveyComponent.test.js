const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');

const app = express();
const surveyRouter = require('./surveyComponent.js');

const SURVEY_ENDPOINT_URL = '/fez-survey-response';

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

const mockedSheet = jest.fn().mockReturnValue({
  addRow: () => {},
  saveUpdatedCells: () => {},
});

jest.mock('google-spreadsheet', () => {
  return {
    GoogleSpreadsheet: jest.fn().mockImplementation(() => {
      return {
        useServiceAccountAuth: () => {},
        loadInfo: () => {},
        sheetsByTitle: {},
        addSheet: mockedSheet,
      };
    }),
  };
});

jest.mock('@lib/utils/credentials', () => {
  return {get: () => ''};
});

app.use(surveyRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

test('Errors on a GET', (done) => {
  request(app).get(SURVEY_ENDPOINT_URL).expect(405).end(done);
});

test('Validates the POSTed object', async () => {
  await request(app)
    .post(SURVEY_ENDPOINT_URL)
    .set('Accept', 'application/json')
    .send({
      'bad': 'version',
    })
    .expect(422);

  await request(app)
    .post(SURVEY_ENDPOINT_URL)
    .set('Accept', 'application/json')
    .send({
      'bad': 'version',
    })
    .expect(422);

  await request(app)
    .post(SURVEY_ENDPOINT_URL)
    .set('Accept', 'application/json')
    .send(VALID_RESPONSE)
    .expect(200);
});

test('Submits the data to a backend', async () => {
  jest.clearAllMocks();

  expect(mockedSheet.mock.calls.length).toBe(0);

  await request(app)
    .post(SURVEY_ENDPOINT_URL)
    .set('Accept', 'application/json')
    .send(VALID_RESPONSE);

  expect(mockedSheet.mock.calls.length).toBe(1);
});
