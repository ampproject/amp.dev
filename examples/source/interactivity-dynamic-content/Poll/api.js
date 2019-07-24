/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
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

const express = require('express');
const {Datastore} = require('@google-cloud/datastore');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');
const {setNoCache} = require('@lib/utils/cacheHelpers');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(cookieParser());

// eslint-disable-next-line max-len
const ALREADY_VOTED_MESSAGE = 'You have already answered this poll. If you want to run this sample again, use an incognito window.';
const THANKS_MESSAGE = 'Thanks for answering the poll!';
const POLL_COOKIE_NAME = 'POLL_TAKEN';
const EXPIRATION_DATE = 365*24*60*60*1000; // 365 days in ms
const POLL_QUESTIONS = ['Penguins', 'Ostriches', 'Kiwis', 'Wekas'];
const POLL_ENTITY_TYPE = 'Poll example';
const POLL_ENTITY_NAME = 'poll';
const CLIENTID_ENTITY_NAME = 'clientId';

// initialize datastore
const datastore = new Datastore();

examples.post('/submit-poll', upload.none(), async (request, response) => {
  setNoCache(response);

  const {answer, clientId} = request.body;
  if (!answer || !clientId) {
    const input = !answer ? 'answer' : 'clientId';
    response.status(400).send(`${input} has empty value`);
    return;
  }

  // calculate poll results and check if user has already voted.
  const pollResults = await calculatePollResults(answer, clientId, request, response);

  response.json(
      pollResults
  );
});

async function calculatePollResults(answer, clientId, request, response) {
  // get poll
  const pollKey = datastore.key([POLL_ENTITY_TYPE, POLL_ENTITY_NAME]);
  const pollEntity = await getFromDatastore(pollKey);
  const pollExistingAnswers = !!pollEntity ?
    pollEntity.results :
    new Array(POLL_QUESTIONS.length).fill(0);
  // check if user has already voted by cookie
  const cookie = request.cookies[POLL_COOKIE_NAME];
  if (cookie && cookie.clientId === clientId) {
    return createPollResult(pollExistingAnswers, ALREADY_VOTED_MESSAGE);
  }
  // check if user has already voted by clientId
  const clientIdKey = datastore.key([POLL_ENTITY_TYPE, CLIENTID_ENTITY_NAME]);
  const clientEntity = await getFromDatastore(clientIdKey);
  const existingClientIDs = !!clientEntity ? clientEntity.voters : [];
  if (existingClientIDs.includes(clientId)) {
    return createPollResult(pollExistingAnswers, ALREADY_VOTED_MESSAGE);
  }
  // set cookie and store clientId
  response.cookie(POLL_COOKIE_NAME, {clientId}, {expires: new Date(Date.now() + EXPIRATION_DATE)});
  existingClientIDs.push(clientId);
  try {
    await saveToDatastore(clientIdKey, {voters: existingClientIDs});
  } catch (error) {
    return createPollResult(pollExistingAnswers, error.message);
  }
  // increment vote by 1
  pollExistingAnswers[answer] += 1;
  // store results
  try {
    await saveToDatastore(pollKey, {results: pollExistingAnswers});
  } catch (error) {
    return createPollResult(pollExistingAnswers, error.message);
  }
  return createPollResult(pollExistingAnswers, THANKS_MESSAGE);
}

function createPollResult(pollResults, message) {
  // calculate total votes
  const totalVotes = pollResults.reduce((a, b) => {
    return a + b;
  });

  // calculate poll results
  const calculatedAnswers = pollResults.map((votes, i) => {
    const percentage = totalVotes > 0 ? Math.round(votes/totalVotes*100) : 0;
    return {
      'Votes': votes,
      'Percentage': new Array(percentage).fill(0), // fill array with corresponding amount of 0's to the percentage of answer
      'Answer': POLL_QUESTIONS[i],
    };
  });
  return {
    'PollEntryResults': calculatedAnswers,
    'Message': message,
  };
}

function getFromDatastore(key) {
  return new Promise((resolve, reject) => {
    datastore.get(key, (e, entity) => {
      if (e) {
        reject(e);
        return;
      }
      resolve(entity);
    });
  });
}

function saveToDatastore(key, data) {
  const entity = {
    key,
    data,
  };
  return new Promise((resolve, reject) => {
    datastore.save(entity, (e) => {
      if (e) {
        reject(e);
        return;
      }
      resolve();
    });
  });
}

module.exports = examples;
