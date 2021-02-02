/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Joi = require('joi');
const express = require('express');
const log = require('@lib/utils/log')('Survey Component Response');
const credentials = require('@lib/utils/credentials');
const {GoogleSpreadsheet} = require('google-spreadsheet');
const surveyEndpoint = '/fez-survey-response';
let Doc = undefined;
let SURVEY_RESPONSE_SHEET_ID;
let GOOGLE_SERVICE_ACCOUNT_EMAIL;
let GOOGLE_PRIVATE_KEY;

const schema = Joi.object({
  survey: Joi.string().required().min(1),
  questions: Joi.when('dismissed', {
    is: false,
    then: Joi.array()
      .items(
        Joi.object({
          text: Joi.string().min(1).required(),
          answer: Joi.alternatives()
            .try(
              Joi.string().min(1).max(200),
              Joi.array().items(Joi.string().min(1).max(200)),
              null
            )
            .required(),
        })
      )
      .required()
      .min(1),
  }),
  dismissed: Joi.boolean().optional(),
  url: Joi.string().uri().required(),
  shownAt: Joi.string().isoDate().required(),
  originalText: Joi.string().optional(),
});

const schemaOptions = {
  abortEarly: false,
  stripUnknown: true,
};

function validateRequest(req, res, next) {
  if (req.method !== 'POST') {
    return res.sendStatus(405);
  }

  const {error, value} = schema.validate(req.body, schemaOptions);

  if (error) {
    res
      .status(422)
      .send(
        `Validation error: ${error.details.map((x) => x.message).join(', ')}`
      );
  } else {
    req.body = value;
    next();
  }
}

async function getOrCreateSpreadsheet() {
  if (Doc === undefined) {
    SURVEY_RESPONSE_SHEET_ID = await credentials.get(
      'SURVEY_RESPONSE_SHEET_ID'
    );
    GOOGLE_SERVICE_ACCOUNT_EMAIL = await credentials.get(
      'GOOGLE_SERVICE_ACCOUNT_EMAIL'
    );
    GOOGLE_PRIVATE_KEY = await credentials.get('GOOGLE_PRIVATE_KEY');

    Doc = new GoogleSpreadsheet(SURVEY_RESPONSE_SHEET_ID);

    await Doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    });

    await Doc.loadInfo();
  }

  return Doc;
}

async function getOrCreateSheet(surveyName) {
  const doc = await getOrCreateSpreadsheet();
  let sheet = doc.sheetsByTitle[surveyName];

  if (!sheet) {
    sheet = await doc.addSheet({
      title: survey.survey,
      headerValues: [
        survey.questions.map((q) => q.originalText || q.text),
        'dismissed',
        'url',
        'shown at',
      ].flat(),
    });
  }

  return sheet;
}

function addSurveyResponse(survey) {
  const row = {
    'dismissed': !!survey.dismissed,
    'url': survey.url,
    'shown at': survey.shownAt,
  };

  survey.questions.forEach((q) => {
    const text = q.originalText || q.text;
    const answer = Array.isArray(q.answer) ? q.answer.join('\n') : q.answer;
    row[text] = answer;
  });

  return row;
}

async function uploadAnswer(req, res) {
  try {
    const surveyResponse = req.body;
    const surveySheet = getOrCreateSheet(surveyResponse.survey);
    const row = addSurveyResponse(surveyResponse);

    await surveySheet.addRow(row);
    await surveySheet.saveUpdatedCells();
    log.complete(`saved response for ${surveyResponse.survey}`);

    res.sendStatus(200);
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
}

// eslint-disable-next-line new-cap
const surveyResponseRouter = express.Router();

surveyResponseRouter.use(surveyEndpoint, express.json());

surveyResponseRouter.all(surveyEndpoint, validateRequest, uploadAnswer);

module.exports = surveyResponseRouter;
