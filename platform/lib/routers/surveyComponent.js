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
const {GoogleSpreadsheet} = require('google-spreadsheet');
const Doc = new GoogleSpreadsheet(process.env.SURVEY_RESPONSE_SHEET_ID);
const surveyEndpoint = '/fezSurveyResponse';

function validateRequest(req, res, next) {
  if (req.method !== 'POST') {
    return res.sendStatus(405);
  }

  const schema = Joi.object({
    survey: Joi.string().required().min(1),
    questions: Joi.array()
      .required()
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
      .min(1),
    url: Joi.string().uri().required(),
    shownAt: Joi.string().isoDate().required(),
    originalText: Joi.string().optional(),
  });

  const options = {
    abortEarly: false,
    stripUnknown: true,
  };

  const {error, value} = schema.validate(req.body, options);

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

async function getDoc() {
  if (Doc._rawProperties === null) {
    await Doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await Doc.loadInfo();
  }

  return Doc;
}

async function uploadAnswer(req, res) {
  try {
    const survey = req.body;
    const doc = await getDoc();
    let sheet = doc.sheetsByTitle[survey.survey];

    if (!sheet) {
      sheet = await doc.addSheet({
        title: survey.survey,
        headerValues: [
          survey.questions.map((q) => q.originalText || q.text),
          'url',
          'shown at',
        ].flat(),
      });
    }

    const row = {
      'url': survey.url,
      'shown at': survey.shownAt,
    };

    survey.questions.forEach((q) => {
      const text = q.originalText || q.text;
      const answer = Array.isArray(q.answer) ? q.answer.join('\n') : q.answer;
      row[text] = answer;
    });

    await sheet.addRow(row);
    await sheet.saveUpdatedCells();
    log.complete(`saved response for ${survey.survey}`);

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
